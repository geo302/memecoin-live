// Obsidian Galaxy trade replay modal + canvas player.
// Used by Calendar / Trophy Room / Trade Detail (paper trades) and the What-If Lab.
// Paper replays are stamped PAPER TRADING · SIMULATED.
// What-If replays are stamped WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE.
// Reads only; never writes to Rio's ledger, vault, or counts.

const HANDLE = '@whatscoinbase';
const BADGE_PAPER = 'PAPER TRADING · SIMULATED';
const BADGE_WHATIF = 'WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE';
const CURVE_SEC = 10;   // seconds to draw the curve at 1x
const HOLD_SEC = 2;     // hold the exit banner at the end
const TOTAL_SEC = CURVE_SEC + HOLD_SEC;

let modal, cv, ctx2d, state = null, raf = 0, rec = null;

const $ = id => document.getElementById(id);

function isNum(v) { return typeof v === 'number' && Number.isFinite(v); }
function ts(iso) { const t = typeof iso === 'number' ? iso : Date.parse(iso); return Number.isFinite(t) ? t : null; }

function px(p) {
  if (!isNum(p)) return '—';
  const a = Math.abs(p), sign = p < 0 ? '-' : '';
  if (a >= 1) return sign + '$' + a.toLocaleString('en-US', { maximumFractionDigits: a >= 1000 ? 2 : 4 });
  if (a >= 0.001) return sign + '$' + a.toPrecision(5).replace(/0+$/, '').replace(/\.$/, '');
  const d = Math.min(12, Math.max(6, Math.ceil(-Math.log10(a)) + 3));
  return sign + '$' + a.toFixed(d).replace(/0+$/, '').replace(/\.$/, '');
}

function money(v) {
  if (!isNum(v)) return '—';
  const s = v < 0 ? '-' : v > 0 ? '+' : '';
  return s + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function pct(v) {
  if (!isNum(v)) return '—';
  return (v > 0 ? '+' : '') + v.toFixed(2) + '%';
}

function seedRand(seed) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
}

// Build a playback model from a Rio trade (+ optional prices.points) or a what-if series.
export function modelFromTrade(t, points, mode = 'paper') {
  const open = t && t.status === 'open';
  const entry = t.entry_price;
  const usdIn = t.usd_in;
  let pts = Array.isArray(points) && points.length ? points.map(p => ({
    t: ts(p.t), price: p.price, stop: p.stop, tp: p.tp, event: p.event || null,
  })).filter(p => isNum(p.t) && isNum(p.price)) : [];
  let reconstructed = false;
  if (pts.length < 2) {
    reconstructed = true;
    const t0 = ts(t.entry_time) || Date.now();
    const t1 = ts(open ? (t.last_checked || Date.now()) : t.exit_time) || (t0 + 60e3);
    const p0 = entry;
    const p1 = open ? (t.current_price ?? entry) : (t.exit_price ?? entry);
    pts = [
      { t: t0, price: p0, stop: t.initial_stop_price ?? t.stop_loss_price, tp: t.take_profit_price, event: 'ENTRY' },
      { t: t1, price: p1, stop: t.stop_loss_price, tp: t.take_profit_price, event: open ? null : 'EXIT' },
    ];
  }
  const officialPct = open ? t.unrealized_pnl_pct : t.pnl_pct;
  const officialUsd = open ? t.unrealized_pnl_usd : t.pnl_usd;
  return {
    mode,
    symbol: String(t.symbol || '???').toUpperCase(),
    name: t.name || '',
    id: t.id,
    usdIn,
    entry,
    exitPrice: open ? t.current_price : t.exit_price,
    exitType: open ? 'OPEN' : (t.exit_type || 'EXIT'),
    officialPct: isNum(officialPct) ? officialPct : null,
    officialUsd: isNum(officialUsd) ? officialUsd : null,
    tp: t.take_profit_price,
    beArm: t.breakeven_arm_price,
    beArmedAt: ts(t.breakeven_armed_at),
    initialStop: t.initial_stop_price ?? t.original_stop_loss_price ?? (pts[0] && pts[0].stop),
    points: pts,
    reconstructed,
    open,
  };
}

export function modelFromWhatIf({ symbol, name, usdIn, entry, points, exitPrice, officialPct, officialUsd }) {
  const pts = (points || []).map(p => ({
    t: ts(p.t) ?? p.t, price: p.price, stop: p.stop ?? null, tp: p.tp ?? null, event: p.event || null,
  })).filter(p => isNum(p.t) && isNum(p.price));
  return {
    mode: 'whatif',
    symbol: String(symbol || 'TOKEN').toUpperCase(),
    name: name || '',
    id: null,
    usdIn, entry, exitPrice: exitPrice ?? (pts.length ? pts[pts.length - 1].price : entry),
    exitType: 'WHAT-IF',
    officialPct, officialUsd,
    tp: entry && isNum(entry) ? entry * 1.2 : null,
    beArm: entry && isNum(entry) ? entry * 1.1 : null,
    beArmedAt: null,
    initialStop: entry && isNum(entry) ? entry * 0.9 : null,
    points: pts,
    reconstructed: false,
    open: false,
    refLevels: true, // show hypothetical +20% / -10% as reference only
  };
}

function sample(model, u) {
  // u in [0, 1] along the curve (0 = first tick, 1 = last tick)
  const pts = model.points;
  if (!pts.length) return null;
  if (u <= 0) return { ...pts[0], i: 0, u: 0 };
  if (u >= 1) return { ...pts[pts.length - 1], i: pts.length - 1, u: 1 };
  const t0 = pts[0].t, t1 = pts[pts.length - 1].t;
  const t = t0 + (t1 - t0) * u;
  let i = 0;
  while (i < pts.length - 2 && pts[i + 1].t < t) i++;
  const a = pts[i], b = pts[i + 1];
  const span = Math.max(1, b.t - a.t);
  const f = Math.min(1, Math.max(0, (t - a.t) / span));
  // smoothstep for cinematic motion between flat 3s polls
  const s = f * f * (3 - 2 * f);
  const lerp = (x, y) => isNum(x) && isNum(y) ? x + (y - x) * s : (isNum(y) ? y : x);
  let event = null;
  if (f < 0.02) event = a.event;
  if (f > 0.98) event = b.event;
  return {
    t, i, u,
    price: lerp(a.price, b.price),
    stop: f < 1 ? a.stop : b.stop, // step-after stop
    tp: lerp(a.tp, b.tp) ?? model.tp,
    event,
  };
}

function pnlAt(model, price, atEnd) {
  if (atEnd && isNum(model.officialUsd) && isNum(model.officialPct)) {
    return { usd: model.officialUsd, pct: model.officialPct, price: model.exitPrice ?? price };
  }
  if (!isNum(price) || !isNum(model.entry) || !model.entry) return { usd: 0, pct: 0, price };
  const p = (price / model.entry - 1) * 100;
  const usd = isNum(model.usdIn) ? model.usdIn * p / 100 : 0;
  return { usd, pct: p, price };
}

function beArmed(model, smp) {
  if (model.beArmedAt && smp.t >= model.beArmedAt) return true;
  if (smp.event === 'BREAKEVEN_ARMED') return true;
  // stop has stepped up to ~entry * 1.02
  if (isNum(smp.stop) && isNum(model.entry) && smp.stop >= model.entry * 1.015) return true;
  return false;
}

function ensureModal() {
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'replay-modal';
  modal.className = 'rp-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="rp-box" role="dialog" aria-modal="true" aria-labelledby="rp-title">
      <div class="rp-hd">
        <h3 id="rp-title">REPLAY</h3>
        <div class="seg" id="rp-aspect">
          <button data-ar="9:16">9:16 Vertical</button>
          <button data-ar="16:9" class="on">16:9 Landscape</button>
        </div>
        <button class="rp-x" id="rp-x" aria-label="Close">✕</button>
      </div>
      <div class="rp-stage" id="rp-stage"><canvas id="rp-cv"></canvas></div>
      <div class="rp-ctrl">
        <button class="btn pri" id="rp-play">▶ PLAY</button>
        <button class="btn" id="rp-restart">↺ RESTART</button>
        <div class="seg" id="rp-speed">
          <button data-spd="1" class="on">1x</button>
          <button data-spd="2">2x</button>
          <button data-spd="4">4x</button>
        </div>
        <span class="sp"></span>
        <button class="btn" id="rp-dl">⬇ EXPORT VIDEO (.webm)</button>
      </div>
      <div class="rp-note dim" id="rp-note"></div>
    </div>`;
  document.body.appendChild(modal);
  cv = $('rp-cv');
  ctx2d = cv.getContext('2d');
  $('rp-x').addEventListener('click', closeReplay);
  modal.addEventListener('click', e => { if (e.target === modal) closeReplay(); });
  $('rp-aspect').addEventListener('click', e => {
    const b = e.target.closest('button[data-ar]'); if (!b || !state) return;
    state.ar = b.dataset.ar;
    $('rp-aspect').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    sizeCanvas();
    paint();
  });
  $('rp-speed').addEventListener('click', e => {
    const b = e.target.closest('button[data-spd]'); if (!b || !state) return;
    state.speed = +b.dataset.spd;
    $('rp-speed').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  });
  $('rp-play').addEventListener('click', togglePlay);
  $('rp-restart').addEventListener('click', () => { restart(); play(); });
  $('rp-dl').addEventListener('click', exportWebm);
  window.addEventListener('resize', () => { if (state && modal.classList.contains('on')) { sizeCanvas(); paint(); } });
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('on')) return;
    if (e.key === 'Escape') { e.stopPropagation(); closeReplay(); }
    if (e.key === ' ' && !e.target.matches('input,textarea,button')) { e.preventDefault(); togglePlay(); }
  });
  return modal;
}

function sizeCanvas() {
  if (!state) return;
  const stage = $('rp-stage');
  const vert = state.ar === '9:16';
  const aw = vert ? 9 : 16, ah = vert ? 16 : 9;
  const maxW = stage.clientWidth || 800;
  const maxH = Math.min(window.innerHeight * 0.68, vert ? 820 : 560);
  let w = maxW, h = w * ah / aw;
  if (h > maxH) { h = maxH; w = h * aw / ah; }
  stage.style.setProperty('--rp-w', w + 'px');
  stage.style.setProperty('--rp-h', h + 'px');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rw = vert ? 720 : 1280, rh = vert ? 1280 : 720;
  // render at a crisp fixed design size, CSS scales it
  cv.width = rw * dpr;
  cv.height = rh * dpr;
  cv.style.width = w + 'px';
  cv.style.height = h + 'px';
  ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  state.rw = rw; state.rh = rh;
}

function togglePlay() { if (!state) return; if (state.playing) pause(); else play(); }
function play() {
  if (!state) return;
  if (state.clock >= TOTAL_SEC) state.clock = 0;
  state.playing = true;
  state.lastTs = performance.now();
  $('rp-play').textContent = '⏸ PAUSE';
  loop();
}
function pause() {
  if (!state) return;
  state.playing = false;
  $('rp-play').textContent = '▶ PLAY';
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}
function restart() {
  if (!state) return;
  state.clock = 0;
  pause();
  paint();
}

function loop() {
  if (!state || !state.playing) return;
  const now = performance.now();
  const dt = Math.min(0.08, (now - state.lastTs) / 1000);
  state.lastTs = now;
  state.clock += dt * (state.speed || 1);
  if (state.clock >= TOTAL_SEC) {
    state.clock = TOTAL_SEC;
    paint();
    pause();
    if (state.onEnded) state.onEnded();
    return;
  }
  paint();
  raf = requestAnimationFrame(loop);
}

function paint() {
  if (!state || !ctx2d) return;
  drawFrame(ctx2d, state.model, state.clock, state.rw, state.rh);
}

export function drawFrame(g, model, clock, W, H) {
  const vert = H > W;
  const uCurve = Math.min(1, clock / CURVE_SEC);
  const atEnd = clock >= CURVE_SEC;
  const smp = sample(model, uCurve);
  const live = pnlAt(model, smp ? smp.price : model.entry, atEnd);
  const armed = smp ? beArmed(model, smp) : false;
  const win = live.pct > 0, loss = live.pct < 0;
  const col = win ? '#34d399' : loss ? '#f87171' : '#f4f6fb';
  const badge = model.mode === 'whatif' ? 'WHAT-IF BACKTEST' : BADGE_PAPER;
  const stamp = model.mode === 'whatif' ? BADGE_WHATIF : BADGE_PAPER;

  // background (do not reset the caller's DPR transform)
  g.fillStyle = '#030407';
  g.fillRect(0, 0, W, H);
  // nebula
  const ng = g.createRadialGradient(W * 0.72, H * 0.18, 0, W * 0.72, H * 0.18, W * 0.55);
  ng.addColorStop(0, 'rgba(148,163,184,0.11)'); ng.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = ng; g.fillRect(0, 0, W, H);
  const ng2 = g.createRadialGradient(W * 0.18, H * 0.85, 0, W * 0.18, H * 0.85, W * 0.5);
  ng2.addColorStop(0, 'rgba(165,180,252,0.07)'); ng2.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = ng2; g.fillRect(0, 0, W, H);

  // starfield
  const R = seedRand(77);
  for (let i = 0; i < 140; i++) {
    const x = R() * W, y = R() * H, z = R() < 0.1 ? 1.6 : 0.8;
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(clock * 2 + i));
    g.globalAlpha = tw * (0.25 + R() * 0.75);
    g.fillStyle = '#fff';
    g.fillRect(x, y, z, z);
  }
  g.globalAlpha = 1;

  const pad = vert ? 48 : 44;
  const SANS = 'Inter, "SF Pro Display", "Segoe UI", system-ui, sans-serif';
  const MONO = '"IBM Plex Mono", "JetBrains Mono", Menlo, Consolas, monospace';

  // ---- header ----
  // orbit mark
  const ox = pad + 16, oy = vert ? 44 : 36;
  g.save();
  g.translate(ox, oy);
  g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 1.6;
  g.beginPath(); g.ellipse(0, 0, 16, 6, -0.45, 0, Math.PI * 2); g.stroke();
  g.fillStyle = '#fff'; g.shadowColor = '#fff'; g.shadowBlur = 10;
  g.beginPath(); g.arc(0, 0, 4.2, 0, Math.PI * 2); g.fill();
  g.restore();
  g.fillStyle = '#fff';
  g.font = `800 ${vert ? 22 : 20}px ${SANS}`;
  g.textBaseline = 'middle'; g.textAlign = 'left';
  g.fillText(HANDLE, pad + 40, oy);
  // badge
  g.textAlign = 'right';
  const bw = vert ? W - pad : W - pad;
  g.font = `700 ${vert ? 11 : 12}px ${SANS}`;
  const badgeTxt = badge;
  const tw = g.measureText(badgeTxt).width;
  const bh = vert ? 28 : 26;
  const bx = W - pad - tw - 20;
  const by = oy - bh / 2;
  g.fillStyle = model.mode === 'whatif' ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.05)';
  g.strokeStyle = model.mode === 'whatif' ? 'rgba(251,191,36,0.55)' : 'rgba(255,255,255,0.28)';
  g.lineWidth = 1;
  round(g, bx, by, tw + 20, bh, 999); g.fill(); g.stroke();
  g.fillStyle = model.mode === 'whatif' ? '#fde68a' : '#e2e8f0';
  g.textAlign = 'center';
  g.fillText(badgeTxt, bx + (tw + 20) / 2, oy + 1);

  // ticker + meta
  const ty = vert ? 110 : 86;
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillStyle = '#fff';
  g.font = `800 ${vert ? 56 : 42}px ${SANS}`;
  g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 8;
  g.fillText(model.symbol, pad, ty);
  g.shadowBlur = 0;
  const idBit = model.id == null ? '' : `  #${model.id}`;
  const sizeBit = isNum(model.usdIn) ? `  ·  SIZE ${money(model.usdIn).replace('+', '')}` : '';
  g.fillStyle = 'rgba(203,213,225,0.8)';
  g.font = `600 ${vert ? 16 : 15}px ${SANS}`;
  const sub = (model.name ? model.name + ' · ' : '') + (model.mode === 'whatif' ? 'WHAT-IF ENTRY' : 'PAPER TRADE') + idBit + sizeBit;
  g.fillText(sub, pad, ty + (vert ? 28 : 24));

  // ---- chart box ----
  const top = vert ? 168 : 128;
  const bottomReserve = vert ? (atEnd ? 360 : 280) : (atEnd ? 150 : 110);
  const chartX = pad;
  const chartY = top;
  const chartW = vert ? (W - pad * 2) : Math.floor(W * 0.62) - pad;
  const chartH = H - top - bottomReserve - (vert ? 8 : 0);
  // panel
  g.fillStyle = 'rgba(8,10,16,0.72)';
  g.strokeStyle = 'rgba(255,255,255,0.10)';
  g.lineWidth = 1;
  round(g, chartX, chartY, chartW, chartH, 14); g.fill(); g.stroke();

  const iL = chartX + 16, iR = chartX + chartW - 64, iT = chartY + 36, iB = chartY + chartH - 28;
  // grid
  g.strokeStyle = 'rgba(255,255,255,0.05)';
  g.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = iT + (iB - iT) * i / 4;
    g.beginPath(); g.moveTo(iL, y); g.lineTo(iR, y); g.stroke();
  }

  // price scale from visible prefix of points
  const prefix = [];
  const pts = model.points;
  const t0 = pts[0].t, t1 = pts[pts.length - 1].t;
  const tNow = t0 + (t1 - t0) * uCurve;
  for (const p of pts) { if (p.t <= tNow + 1) prefix.push(p); }
  if (smp) prefix.push(smp);
  const prices = prefix.map(p => p.price).filter(isNum);
  if (isNum(model.entry)) prices.push(model.entry);
  if (isNum(model.tp)) prices.push(model.tp);
  if (isNum(model.initialStop)) prices.push(model.initialStop);
  // include stop of prefix
  prefix.forEach(p => { if (isNum(p.stop)) prices.push(p.stop); });
  let lo = Math.min(...prices), hi = Math.max(...prices);
  const padP = (hi - lo) * 0.16 || (lo * 0.08) || 1e-12;
  lo -= padP; hi += padP;
  const xOf = t => iL + (iR - iL) * ((t - t0) / Math.max(1, t1 - t0));
  const yOf = p => iB - (iB - iT) * ((p - lo) / (hi - lo));

  // level lines
  const levels = [];
  if (isNum(model.entry)) levels.push({ y: model.entry, c: 'rgba(255,255,255,0.7)', dash: [6, 5], label: 'ENTRY  ' + px(model.entry) });
  if (isNum(model.tp)) levels.push({ y: model.tp, c: 'rgba(52,211,153,0.7)', dash: [6, 5], label: (model.refLevels ? 'REF TP +20%  ' : 'TP  ') + px(model.tp) });
  const stopNow = smp && isNum(smp.stop) ? smp.stop : model.initialStop;
  if (isNum(stopNow)) {
    levels.push({
      y: stopNow,
      c: armed ? 'rgba(52,211,153,0.85)' : 'rgba(248,113,113,0.8)',
      dash: armed ? [2, 0] : [5, 4],
      label: armed ? 'BE +2% ARMED  ' + px(stopNow) : (model.refLevels ? 'REF SL −10%  ' : 'STOP  ') + px(stopNow),
    });
  }
  for (const lv of levels) {
    const y = yOf(lv.y);
    if (y < iT - 2 || y > iB + 2) continue;
    g.save();
    g.strokeStyle = lv.c; g.lineWidth = 1.2; g.setLineDash(lv.dash);
    g.beginPath(); g.moveTo(iL, y); g.lineTo(iR, y); g.stroke();
    g.setLineDash([]);
    g.font = `600 10px ${SANS}`;
    g.fillStyle = lv.c; g.textAlign = 'right'; g.textBaseline = 'bottom';
    g.fillText(lv.label, iR, y - 2);
    g.restore();
  }

  // stop step line (up to now)
  if (prefix.length) {
    g.save();
    g.strokeStyle = armed ? 'rgba(148,163,184,0.9)' : 'rgba(248,113,113,0.75)';
    g.lineWidth = 1.4;
    g.beginPath();
    let started = false, lastX = 0, lastY = 0;
    for (let i = 0; i < prefix.length; i++) {
      const p = prefix[i];
      if (!isNum(p.stop)) continue;
      const x = xOf(Math.min(p.t, tNow)), y = yOf(p.stop);
      if (!started) { g.moveTo(x, y); started = true; }
      else { g.lineTo(x, lastY); g.lineTo(x, y); } // step
      lastX = x; lastY = y;
    }
    if (started) { g.lineTo(xOf(tNow), lastY); g.stroke(); }
    g.restore();
  }

  // price path
  if (prefix.length) {
    const path = [];
    // densify with sample for smoothness at head
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].t > tNow) break;
      path.push([xOf(pts[i].t), yOf(pts[i].price)]);
    }
    const head = [xOf(tNow), yOf(live.price ?? smp.price)];
    if (!path.length || path[path.length - 1][0] !== head[0]) path.push(head);

    // glow
    g.save();
    g.strokeStyle = col; g.globalAlpha = 0.22; g.lineWidth = 8; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath(); path.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke();
    g.globalAlpha = 1; g.lineWidth = 2.2; g.shadowColor = col; g.shadowBlur = 12;
    g.beginPath(); path.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke();
    g.restore();

    // head dot
    const [hx, hy] = head;
    g.save();
    g.fillStyle = '#fff'; g.shadowColor = col; g.shadowBlur = 16;
    g.beginPath(); g.arc(hx, hy, 5, 0, Math.PI * 2); g.fill();
    g.restore();
    g.strokeStyle = col; g.lineWidth = 2;
    g.beginPath(); g.arc(hx, hy, 8, 0, Math.PI * 2); g.stroke();
  }

  // ENTRY flash
  const flash = clock < 1.6 ? (clock < 0.2 ? clock / 0.2 : clock > 1.2 ? 1 - (clock - 1.2) / 0.4 : 1) : 0;
  if (flash > 0) {
    const cx = chartX + chartW / 2, cy = chartY + 28 + 22;
    g.save();
    g.globalAlpha = flash;
    const txt = 'ENTERED  @  ' + px(model.entry);
    g.font = `800 ${vert ? 22 : 20}px ${SANS}`;
    const ww = g.measureText(txt).width + 36, hh = 36;
    g.fillStyle = 'rgba(255,255,255,0.12)';
    g.strokeStyle = 'rgba(255,255,255,0.7)';
    g.shadowColor = '#fff'; g.shadowBlur = 18;
    round(g, cx - ww / 2, cy - hh / 2, ww, hh, 8); g.fill(); g.stroke();
    g.shadowBlur = 0;
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, cx, cy + 1);
    g.restore();
  }

  // ---- PnL readout ----
  const pnlX = vert ? pad : (chartX + chartW + 28);
  const pnlY = vert ? (chartY + chartH + 28) : top;
  const pnlW = vert ? (W - pad * 2) : (W - pad - pnlX);
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillStyle = 'rgba(148,163,184,0.85)';
  g.font = `700 11px ${SANS}`;
  g.fillText(model.mode === 'whatif' ? 'HYPOTHETICAL P&L' : 'LIVE P&L', pnlX, pnlY + 4);
  g.fillStyle = col;
  g.shadowColor = col; g.shadowBlur = 18;
  g.font = `800 ${vert ? 64 : 58}px ${SANS}`;
  g.fillText(money(live.usd), pnlX, pnlY + (vert ? 68 : 62));
  g.font = `800 ${vert ? 40 : 36}px ${SANS}`;
  g.fillText(pct(live.pct), pnlX, pnlY + (vert ? 118 : 108));
  g.shadowBlur = 0;
  g.fillStyle = 'rgba(203,213,225,0.75)';
  g.font = `600 ${vert ? 15 : 14}px ${MONO}`;
  const pxNow = px(live.price ?? (smp && smp.price));
  g.fillText('PX  ' + pxNow, pnlX, pnlY + (vert ? 148 : 140));
  if (isNum(model.entry)) {
    g.fillText('IN  ' + px(model.entry), pnlX, pnlY + (vert ? 170 : 162));
  }
  if (armed) {
    g.fillStyle = '#86efac';
    g.font = `800 13px ${SANS}`;
    g.fillText('BE +2% ARMED', pnlX, pnlY + (vert ? 196 : 188));
  }

  // persistent honesty stamp (always visible, including during the move)
  g.fillStyle = model.mode === 'whatif' ? 'rgba(253,230,138,0.92)' : 'rgba(203,213,225,0.62)';
  g.font = `700 ${vert ? 11 : 11}px ${SANS}`;
  g.textAlign = 'center';
  g.fillText(stamp, W / 2, atEnd ? (vert ? H - 22 : H - 18) : (vert ? H - 28 : H - 22));

  // reconstructed note
  if (model.reconstructed) {
    g.fillStyle = 'rgba(203,213,225,0.55)';
    g.font = `600 11px ${SANS}`;
    g.textAlign = 'left';
    g.fillText('No tick series — path reconstructed from entry and exit prices.', pad, vert ? H - 44 : H - 36);
  }

  // exit banner (held at end)
  if (atEnd) {
    const holdT = Math.min(1, (clock - CURVE_SEC) / 0.35);
    const kind = model.mode === 'whatif' ? 'WHAT-IF CLOSE' : String(model.exitType || 'EXIT').replace(/_/g, ' ');
    const label = model.mode === 'whatif'
      ? `${kind}  ·  ${pct(live.pct)}  ·  ${money(live.usd)}`
      : `${kind} HIT  ·  ${pct(live.pct)}  ·  ${money(live.usd)}`;
    // For paper, "OPEN" shouldn't say HIT
    const label2 = model.open ? `STILL OPEN  ·  ${pct(live.pct)}  ·  ${money(live.usd)}  ·  UNREALIZED`
      : (model.mode === 'whatif'
        ? `WHAT-IF CLOSE  ·  ${pct(live.pct)}  ·  ${money(live.usd)}`
        : `${(kind === 'TP' || kind === 'STOP') ? kind + ' HIT' : kind}  ·  ${pct(live.pct)}  ·  ${money(live.usd)}`);
    const txt = label2;
    g.save();
    g.globalAlpha = holdT;
    g.font = `800 ${vert ? 22 : 20}px ${SANS}`;
    const ww = Math.min(W - pad * 2, g.measureText(txt).width + 48);
    const hh = vert ? 56 : 50;
    const bx2 = (W - ww) / 2;
    const by2 = vert ? (H - 86) : (H - 72);
    const bgd = g.createLinearGradient(bx2, by2, bx2 + ww, by2 + hh);
    if (win) { bgd.addColorStop(0, '#34d399'); bgd.addColorStop(1, '#16a34a'); }
    else if (loss) { bgd.addColorStop(0, '#f87171'); bgd.addColorStop(1, '#dc2626'); }
    else { bgd.addColorStop(0, '#e2e8f0'); bgd.addColorStop(1, '#94a3b8'); }
    g.shadowColor = col; g.shadowBlur = 28;
    g.fillStyle = bgd;
    round(g, bx2, by2, ww, hh, 10); g.fill();
    g.shadowBlur = 0;
    g.fillStyle = '#05060a';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, W / 2, by2 + hh / 2 + 1);
    g.restore();
  }
}

function round(g, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
}

export function openReplay(modelOrOpts) {
  ensureModal();
  // A real model has a symbol/entry of its own. An opts bag has {trade, points, mode, ar}.
  const isModel = !!(modelOrOpts && modelOrOpts.mode && Array.isArray(modelOrOpts.points) && (modelOrOpts.symbol || modelOrOpts.entry));
  const model = isModel ? modelOrOpts : modelFromTrade(modelOrOpts.trade, modelOrOpts.points, modelOrOpts.mode || 'paper');
  state = { model, ar: modelOrOpts.ar || '16:9', speed: 1, clock: 0, playing: false, lastTs: 0, rw: 1280, rh: 720, onEnded: null };
  modal.classList.add('on');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('rp-open');
  $('rp-title').textContent = (model.mode === 'whatif' ? 'WHAT-IF REPLAY  ·  ' : 'REPLAY  ·  ') + model.symbol;
  $('rp-aspect').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.ar === state.ar));
  $('rp-speed').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.spd === '1'));
  const note = [];
  if (model.reconstructed) note.push('No 3-second tick series was logged for this trade, so the path is reconstructed from the entry and exit prices.');
  if (model.mode === 'whatif') note.push('WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE · this does not affect Rio’s live book or stats.');
  else note.push('PAPER TRADING · SIMULATED · no real money.');
  $('rp-note').textContent = note.join('  ');
  sizeCanvas();
  restart();
  play();
}

export function closeReplay() {
  pause();
  if (rec && rec.state === 'recording') { try { rec.stop(); } catch (e) {} }
  rec = null;
  if (modal) { modal.classList.remove('on'); modal.setAttribute('aria-hidden', 'true'); }
  document.body.classList.remove('rp-open');
  state = null;
}

export function openTradeReplay(t, ctx, ar) {
  const pr = ctx && ctx.priceFor ? ctx.priceFor(t) : null;
  const points = pr && pr.points ? pr.points : (t.points || null);
  openReplay({ trade: t, points, mode: 'paper', ar: ar || '16:9' });
}

async function exportWebm() {
  if (!state || !cv) return;
  const btn = $('rp-dl');
  if (btn.dataset.busy) return;
  const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m));
  if (!mime) { $('rp-note').textContent = 'This browser cannot export WebM. Try Chrome or Edge.'; return; }
  btn.dataset.busy = '1';
  const prev = btn.textContent;
  btn.textContent = '● RECORDING…';
  const wasAr = state.ar, wasSpd = state.speed, wasClock = state.clock;
  // record at 1x from the start
  state.speed = 1;
  restart();
  sizeCanvas();
  const stream = cv.captureStream(30);
  const chunks = [];
  rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6_000_000 });
  rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  const done = new Promise(res => { rec.onstop = res; rec.onerror = res; });
  rec.start(200);
  state.onEnded = () => { try { if (rec && rec.state === 'recording') rec.stop(); } catch (e) {} };
  play();
  // safety timeout (TOTAL + 3s)
  const safety = setTimeout(() => { try { if (rec && rec.state === 'recording') rec.stop(); } catch (e) {} }, (TOTAL_SEC + 3) * 1000);
  await done;
  clearTimeout(safety);
  state.onEnded = null;
  rec = null;
  btn.textContent = prev;
  delete btn.dataset.busy;
  state.speed = wasSpd;
  $('rp-speed').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.spd === wasSpd));
  if (!chunks.length) { $('rp-note').textContent = 'Export failed — try again.'; return; }
  const blob = new Blob(chunks, { type: 'video/webm' });
  const a = document.createElement('a');
  const slug = String(state.model.symbol || 'trade').toLowerCase().replace(/[^a-z0-9]+/g, '') || 'trade';
  const tag = state.model.mode === 'whatif' ? 'whatif' : 'paper';
  const ar = state.ar === '9:16' ? '9x16' : '16x9';
  a.href = URL.createObjectURL(blob);
  a.download = `whatscoinbase-${slug}-${tag}-${ar}.webm`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  $('rp-note').textContent = 'Saved ' + a.download + '  ·  ' + (state.model.mode === 'whatif' ? BADGE_WHATIF : BADGE_PAPER);
}
