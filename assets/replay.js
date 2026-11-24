// Obsidian Galaxy trade replay modal + canvas player.
// Used by Calendar / Trophy Room / Trade Detail (paper trades) and the What-If Lab.
// Paper replays are stamped PAPER TRADING · SIMULATED.
// What-If frames/exports carry a small corner HYPOTHETICAL tag (never "DEMO").
// Reads only; never writes to Rio's ledger, vault, or counts.
// Price data is the real series; interpolation, camera, glow and particles are presentation only.

import { seedFrom, preloadArtLayer, drawAnimeBackdrop } from './backdrop.js';

const HANDLE = '@whatscoinbase';
const BADGE_PAPER = 'PAPER TRADING · SIMULATED';
const TAG_HYPOTHETICAL = 'HYPOTHETICAL';
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

function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
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
    address: t.address || '',
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

export function modelFromWhatIf({ symbol, name, address, usdIn, entry, points, exitPrice, officialPct, officialUsd }) {
  const pts = (points || []).map(p => ({
    t: ts(p.t) ?? p.t, price: p.price, stop: p.stop ?? null, tp: p.tp ?? null, event: p.event || null,
  })).filter(p => isNum(p.t) && isNum(p.price));
  return {
    mode: 'whatif',
    symbol: String(symbol || 'TOKEN').toUpperCase(),
    name: name || '',
    address: address || '',
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

function priceAt(pts, i) {
  if (i < 0) return pts[0].price;
  if (i >= pts.length) return pts[pts.length - 1].price;
  return pts[i].price;
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
  const p0 = priceAt(pts, i - 1), p1 = a.price, p2 = b.price, p3 = priceAt(pts, i + 2);
  // Catmull-Rom for extra in-between frames, then clamp to the two real ticks so we never invent a high or low.
  const raw = catmull(p0, p1, p2, p3, f);
  const loP = Math.min(p1, p2), hiP = Math.max(p1, p2);
  const price = isNum(raw) ? Math.min(hiP, Math.max(loP, raw)) : raw;
  const lerp = (x, y) => isNum(x) && isNum(y) ? x + (y - x) * f : (isNum(y) ? y : x);
  let event = null;
  if (f < 0.02) event = a.event;
  if (f > 0.98) event = b.event;
  return {
    t, i, u,
    price: isNum(price) ? price : lerp(a.price, b.price),
    stop: f < 1 ? a.stop : b.stop,
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
  if (isNum(smp.stop) && isNum(model.entry) && smp.stop >= model.entry * 1.015) return true;
  return false;
}

// Tight y-window around recent prices (presentation only). Deterministic in u.
function targetY(model, u) {
  const pts = model.points;
  if (!pts.length) return { lo: 0, hi: 1 };
  const t0 = pts[0].t, t1 = pts[pts.length - 1].t;
  const span = Math.max(1, t1 - t0);
  const tNow = t0 + span * Math.min(1, Math.max(0, u));
  const win = Math.max(span * 0.32, span * 0.18);
  const tStart = Math.max(t0, tNow - win);
  const prices = [];
  for (const p of pts) {
    if (p.t >= tStart - 1 && p.t <= tNow + 1 && isNum(p.price)) prices.push(p.price);
  }
  const head = sample(model, u);
  if (head && isNum(head.price)) prices.push(head.price);
  if (isNum(model.entry) && t0 >= tStart && t0 <= tNow) prices.push(model.entry);
  if (!prices.length) prices.push(isNum(model.entry) ? model.entry : 1);
  let lo = Math.min(...prices), hi = Math.max(...prices);
  if (lo === hi) {
    const pad = Math.abs(lo) * 0.06 || 1e-12;
    return { lo: lo - pad, hi: hi + pad };
  }
  const pad = (hi - lo) * 0.07;
  return { lo: lo - pad, hi: hi + pad };
}

function cameraY(model, u) {
  // Exponential-style smooth over a short lookback so the camera eases, still a pure function of u.
  let lo = 0, hi = 0, w = 0;
  for (let k = 0; k < 8; k++) {
    const uk = Math.max(0, u - k * 0.014);
    const c = targetY(model, uk);
    const wk = Math.exp(-k * 0.5);
    lo += c.lo * wk; hi += c.hi * wk; w += wk;
  }
  return { lo: lo / w, hi: hi / w };
}

function cameraX(model, u) {
  // Follow the head: keep it in the right third, with a trailing window of history.
  const uR = Math.min(1, Math.max(u + 0.06, 0.28));
  const minSpan = 0.42;
  let uL = Math.max(0, uR - Math.max(minSpan, 0.62 - u * 0.12));
  if (u < 0.22) { uL = 0; }
  if (uR - uL < minSpan) uL = Math.max(0, uR - minSpan);
  return { uL, uR };
}

function jumpAt(model, u) {
  const a = sample(model, Math.max(0, u - 0.018));
  const b = sample(model, u);
  if (!a || !b || !isNum(a.price) || !isNum(b.price) || !a.price) return 0;
  return Math.abs(b.price - a.price) / Math.abs(a.price);
}

function shakeAt(model, clock, u) {
  // Peak jump over a short recent window, decaying — deterministic from clock/u.
  let peak = 0, age = 1;
  for (let k = 0; k < 10; k++) {
    const uk = Math.max(0, u - k * 0.006);
    const j = jumpAt(model, uk);
    if (j > peak) { peak = j; age = k * 0.006 * CURVE_SEC; }
  }
  const mag = Math.min(9, Math.max(0, (peak - 0.012) * 160)) * Math.exp(-age * 4);
  if (mag < 0.15) return { x: 0, y: 0, mag: 0 };
  return { x: Math.sin(clock * 63.1) * mag, y: Math.cos(clock * 51.7) * mag, mag };
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
  const prevLive = pnlAt(model, (sample(model, Math.max(0, uCurve - 0.02)) || smp || {}).price, false);
  const armed = smp ? beArmed(model, smp) : false;
  const win = live.pct > 0, loss = live.pct < 0;
  const col = win ? '#34d399' : loss ? '#f87171' : '#f4f6fb';
  const seed = seedFrom(model.symbol, model.address);
  const sh = atEnd ? { x: 0, y: 0, mag: 0 } : shakeAt(model, clock, uCurve);

  drawAnimeBackdrop(g, W, H, seed, { clock, artIm: model.artIm || null, artAlpha: 0.30 });

  const pad = vert ? 48 : 44;
  const SANS = 'Inter, "SF Pro Display", "Segoe UI", system-ui, sans-serif';
  const MONO = '"IBM Plex Mono", "JetBrains Mono", Menlo, Consolas, monospace';

  // ---- header ----
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

  if (model.mode !== 'whatif') {
    // Paper badge (top-right) — keep the honesty label on Rio replays
    g.textAlign = 'right';
    g.font = `700 ${vert ? 11 : 12}px ${SANS}`;
    const badgeTxt = BADGE_PAPER;
    const tw = g.measureText(badgeTxt).width;
    const bh = vert ? 28 : 26;
    const bx = W - pad - tw - 20;
    const by = oy - bh / 2;
    g.fillStyle = 'rgba(255,255,255,0.05)';
    g.strokeStyle = 'rgba(255,255,255,0.28)';
    g.lineWidth = 1;
    round(g, bx, by, tw + 20, bh, 999); g.fill(); g.stroke();
    g.fillStyle = '#e2e8f0';
    g.textAlign = 'center';
    g.fillText(badgeTxt, bx + (tw + 20) / 2, oy + 1);
  }

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

  g.save();
  g.translate(sh.x, sh.y);

  g.fillStyle = 'rgba(8,10,16,0.72)';
  g.strokeStyle = 'rgba(255,255,255,0.10)';
  g.lineWidth = 1;
  round(g, chartX, chartY, chartW, chartH, 14); g.fill(); g.stroke();

  const iL = chartX + 16, iR = chartX + chartW - 64, iT = chartY + 36, iB = chartY + chartH - 28;
  g.strokeStyle = 'rgba(255,255,255,0.05)';
  g.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = iT + (iB - iT) * i / 4;
    g.beginPath(); g.moveTo(iL, y); g.lineTo(iR, y); g.stroke();
  }

  const pts = model.points;
  const t0 = pts[0].t, t1 = pts[pts.length - 1].t;
  const spanT = Math.max(1, t1 - t0);
  const tNow = t0 + spanT * uCurve;
  const camX = cameraX(model, uCurve);
  const tL = t0 + spanT * camX.uL;
  const tR = t0 + spanT * camX.uR;
  const cam = cameraY(model, uCurve);
  let lo = cam.lo, hi = cam.hi;
  const xOf = t => iL + (iR - iL) * ((t - tL) / Math.max(1, tR - tL));
  const yOf = p => iB - (iB - iT) * ((p - lo) / (hi - lo || 1));

  // level lines (only if they fall in the tight camera)
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

  // Densified path (catmull-rom between real ticks) up to now, clipped to the camera x-window
  const path = [];
  const steps = Math.max(80, Math.min(220, pts.length * 8));
  let lastHi = -Infinity;
  const highs = [];
  for (let s = 0; s <= steps; s++) {
    const u = (s / steps) * uCurve;
    const sm = sample(model, u);
    if (!sm) continue;
    if (sm.t < tL - spanT * 0.02) continue;
    if (sm.t > tNow + 1) break;
    const pt = { u, t: sm.t, price: sm.price, x: xOf(Math.min(sm.t, tNow)), y: yOf(sm.price) };
    path.push(pt);
    if (isNum(sm.price) && sm.price > lastHi * 1.0015) {
      if (lastHi > -Infinity) highs.push(pt);
      lastHi = Math.max(lastHi, sm.price);
    } else if (isNum(sm.price) && sm.price > lastHi) {
      lastHi = sm.price;
    }
  }
  if (smp) {
    const head = { u: uCurve, t: tNow, price: live.price ?? smp.price, x: xOf(tNow), y: yOf(live.price ?? smp.price) };
    if (!path.length || Math.abs(path[path.length - 1].x - head.x) > 0.5) path.push(head);
  }

  // stop step line (up to now)
  if (pts.length) {
    g.save();
    g.strokeStyle = armed ? 'rgba(148,163,184,0.9)' : 'rgba(248,113,113,0.75)';
    g.lineWidth = 1.4;
    g.beginPath();
    let started = false, lastX = 0, lastY = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (!isNum(p.stop) || p.t > tNow + 1) continue;
      if (p.t < tL - 1 && !(pts[i + 1] && pts[i + 1].t >= tL)) continue;
      const x = xOf(Math.min(Math.max(p.t, tL), tNow)), y = yOf(p.stop);
      if (y < iT - 8 || y > iB + 8) { lastX = x; lastY = y; continue; }
      if (!started) { g.moveTo(x, y); started = true; }
      else { g.lineTo(x, lastY); g.lineTo(x, y); }
      lastX = x; lastY = y;
    }
    if (started) { g.lineTo(xOf(tNow), lastY); g.stroke(); }
    g.restore();
  }

  if (path.length) {
    // Clip the line to the panel
    g.save();
    round(g, chartX, chartY, chartW, chartH, 14); g.clip();

    // Wide outer glow
    g.strokeStyle = col; g.globalAlpha = 0.16; g.lineWidth = 16; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath(); path.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)); g.stroke();
    // Mid glow
    g.globalAlpha = 0.32; g.lineWidth = 8;
    g.beginPath(); path.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)); g.stroke();
    // Sharp line with bloom
    g.globalAlpha = 1; g.lineWidth = 2.4; g.shadowColor = col; g.shadowBlur = 16;
    g.beginPath(); path.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)); g.stroke();
    g.shadowBlur = 0;

    // Comet trail near the head (last ~12% of the visible path)
    const nTail = Math.max(8, Math.floor(path.length * 0.14));
    const tail = path.slice(-nTail);
    if (tail.length > 1) {
      g.lineCap = 'round';
      for (let i = 1; i < tail.length; i++) {
        const a = i / tail.length;
        g.strokeStyle = col;
        g.globalAlpha = 0.15 + a * 0.55;
        g.lineWidth = 2 + a * 5;
        g.beginPath(); g.moveTo(tail[i - 1].x, tail[i - 1].y); g.lineTo(tail[i].x, tail[i].y); g.stroke();
      }
      g.globalAlpha = 1;
    }

    const head = path[path.length - 1];
    const hx = head.x, hy = head.y;

    // Sparkle / particle bursts at new highs (still alive)
    for (const h of highs) {
      const age = (uCurve - h.u) * CURVE_SEC;
      if (age < 0 || age > 0.85) continue;
      const life = 1 - age / 0.85;
      const burstSeed = (Math.round(h.t) ^ seed ^ 0x45d9f3b) >>> 0;
      let rs = burstSeed;
      const rnd = () => { rs = (rs * 1664525 + 1013904223) >>> 0; return rs / 4294967296; };
      const n = 8 + Math.floor(rnd() * 6);
      for (let k = 0; k < n; k++) {
        const ang = rnd() * Math.PI * 2;
        const dist = (8 + rnd() * 26) * (1 - life * 0.25) * (0.35 + (1 - life));
        const x = h.x + Math.cos(ang) * dist;
        const y = h.y + Math.sin(ang) * dist - age * 10;
        g.globalAlpha = life * (0.5 + rnd() * 0.5);
        g.fillStyle = k % 3 === 0 ? '#fff' : col;
        g.beginPath(); g.arc(x, y, 1.2 + rnd() * 1.8 * life, 0, Math.PI * 2); g.fill();
        if (k % 4 === 0) {
          const L = 3 + life * 5;
          g.strokeStyle = '#fff'; g.lineWidth = 1;
          g.beginPath(); g.moveTo(x - L, y); g.lineTo(x + L, y); g.stroke();
          g.beginPath(); g.moveTo(x, y - L * 0.7); g.lineTo(x, y + L * 0.7); g.stroke();
        }
      }
      // flash ring
      g.globalAlpha = life * 0.55;
      g.strokeStyle = '#fff';
      g.lineWidth = 1.5;
      g.beginPath(); g.arc(h.x, h.y, 6 + (1 - life) * 18, 0, Math.PI * 2); g.stroke();
      g.globalAlpha = 1;
    }

    // head dot
    g.save();
    g.fillStyle = '#fff'; g.shadowColor = col; g.shadowBlur = 22;
    g.beginPath(); g.arc(hx, hy, 6, 0, Math.PI * 2); g.fill();
    g.restore();
    g.strokeStyle = col; g.lineWidth = 2.2;
    g.beginPath(); g.arc(hx, hy, 10, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 0.35;
    g.beginPath(); g.arc(hx, hy, 16, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 1;

    g.restore(); // clip
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

  g.restore(); // shake

  // ---- PnL readout (pops on jumps) ----
  const pnlX = vert ? pad : (chartX + chartW + 28);
  const pnlY = vert ? (chartY + chartH + 28) : top;
  const dUsd = isNum(live.usd) && isNum(prevLive.usd) ? Math.abs(live.usd - prevLive.usd) : 0;
  const pop = 1 + Math.min(0.22, dUsd / Math.max(18, Math.abs(model.usdIn || 1000) * 0.025));
  g.save();
  g.translate(pnlX, pnlY);
  g.fillStyle = 'rgba(148,163,184,0.85)';
  g.font = `700 11px ${SANS}`;
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillText(model.mode === 'whatif' ? 'LIVE P&L' : 'LIVE P&L', 0, 4);
  g.translate(0, vert ? 68 : 62);
  g.scale(pop, pop);
  g.fillStyle = col;
  g.shadowColor = col; g.shadowBlur = 18 + (pop - 1) * 40;
  g.font = `800 ${vert ? 64 : 58}px ${SANS}`;
  g.fillText(money(live.usd), 0, 0);
  g.font = `800 ${vert ? 40 : 36}px ${SANS}`;
  g.fillText(pct(live.pct), 0, vert ? 50 : 46);
  g.restore();

  g.fillStyle = 'rgba(203,213,225,0.75)';
  g.font = `600 ${vert ? 15 : 14}px ${MONO}`;
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
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

  // Honesty stamps
  if (model.mode === 'whatif') {
    // Small, legible, theme-matched corner tag — not a large banner, never "DEMO"
    g.save();
    g.font = `700 ${vert ? 11 : 10}px ${SANS}`;
    const tag = TAG_HYPOTHETICAL;
    const tw = g.measureText(tag).width;
    const tagW = tw + 16, tagH = vert ? 20 : 18;
    const tx = W - pad - tagW;
    const ty2 = H - (vert ? 36 : 28) - tagH;
    g.fillStyle = 'rgba(226,232,240,0.08)';
    g.strokeStyle = 'rgba(226,232,240,0.38)';
    g.lineWidth = 1;
    round(g, tx, ty2, tagW, tagH, 999); g.fill(); g.stroke();
    g.fillStyle = 'rgba(226,232,240,0.86)';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(tag, tx + tagW / 2, ty2 + tagH / 2 + 0.5);
    g.restore();
  } else {
    g.fillStyle = 'rgba(203,213,225,0.62)';
    g.font = `700 11px ${SANS}`;
    g.textAlign = 'center';
    g.fillText(BADGE_PAPER, W / 2, atEnd ? (vert ? H - 22 : H - 18) : (vert ? H - 28 : H - 22));
  }

  if (model.reconstructed) {
    g.fillStyle = 'rgba(203,213,225,0.55)';
    g.font = `600 11px ${SANS}`;
    g.textAlign = 'left';
    g.fillText('No tick series — path reconstructed from entry and exit prices.', pad, vert ? H - 44 : H - 36);
  }

  // exit banner (held at end)
  if (atEnd) {
    const holdT = Math.min(1, (clock - CURVE_SEC) / 0.35);
    const kind = String(model.exitType || 'EXIT').replace(/_/g, ' ');
    const label2 = model.open
      ? `STILL OPEN  ·  ${pct(live.pct)}  ·  ${money(live.usd)}  ·  UNREALIZED`
      : (model.mode === 'whatif'
        ? `${pct(live.pct)}  ·  ${money(live.usd)}`
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
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
}

export function openReplay(modelOrOpts) {
  ensureModal();
  const isModel = !!(modelOrOpts && modelOrOpts.mode && Array.isArray(modelOrOpts.points) && (modelOrOpts.symbol || modelOrOpts.entry));
  const model = isModel ? modelOrOpts : modelFromTrade(modelOrOpts.trade, modelOrOpts.points, modelOrOpts.mode || 'paper');
  if (modelOrOpts && modelOrOpts.trade && !model.address) model.address = modelOrOpts.trade.address || '';
  state = { model, ar: modelOrOpts.ar || '16:9', speed: 1, clock: 0, playing: false, lastTs: 0, rw: 1280, rh: 720, onEnded: null };
  modal.classList.add('on');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('rp-open');
  $('rp-title').textContent = (model.mode === 'whatif' ? 'WHAT-IF REPLAY  ·  ' : 'REPLAY  ·  ') + model.symbol;
  $('rp-aspect').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.ar === state.ar));
  $('rp-speed').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.spd === '1'));
  const note = [];
  if (model.reconstructed) note.push('No 3-second tick series was logged for this trade, so the path is reconstructed from the entry and exit prices.');
  if (model.mode === 'whatif') note.push('Hypothetical backtest of real price data · not an actual trade · does not affect Rio’s live book or stats.');
  else note.push('PAPER TRADING · SIMULATED · no real money.');
  $('rp-note').textContent = note.join('  ');
  sizeCanvas();
  restart();
  play();
  const opened = state;
  preloadArtLayer(seedFrom(model.symbol, model.address)).then(im => {
    if (im && state === opened) { model.artIm = im; if (!state.playing) paint(); }
  });
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
  const wasSpd = state.speed;
  // Wait briefly for the per-coin art layer so the export matches the live preview
  if (!state.model.artIm) {
    try { state.model.artIm = await Promise.race([preloadArtLayer(seedFrom(state.model.symbol, state.model.address)), new Promise(r => setTimeout(() => r(null), 600))]); } catch (e) {}
  }
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
  $('rp-note').textContent = 'Saved ' + a.download + '  ·  ' + (state.model.mode === 'whatif' ? 'HYPOTHETICAL backtest of real prices' : BADGE_PAPER);
}
