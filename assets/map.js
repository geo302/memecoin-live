// MAP: orbital galaxy of every coin entered (Obsidian-vault-as-a-galaxy look, see design/galaxy_vault_ref.png).
// A glowing RIO core sits at the centre; each trade is a star on a slowly rotating (Keplerian) orbit.
// Run-2 trades fill the inner orbits (oldest innermost), archived run-1 trades fill the outer orbits.
// Green / red halos = won / lost, pulsing white = live/open. Rendered on canvas; positions are stable across polls.
import { tradeState, ago, usdSigned, pct } from './fmt.js?v=d681b70b';

const COL = { win: '#22c55e', loss: '#ef4444', open: '#f4f6fb' };
const RGB = { win: '34,197,94', loss: '239,68,68', open: '244,246,251' };
const R0 = 92, DR = 44, GOLD = 2.399963;
const ringR = k => R0 + k * DR;
const ringCap = k => Math.max(6, Math.floor(2 * Math.PI * ringR(k) / 30));
const omega = r => 0.000026 * Math.pow(R0 / r, 1.5); // rad per ms
const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
function gauss(R) { return (R() + R() + R() - 1.5) / 1.5; }

export function initMap(el, ctx) {
  el.innerHTML = `<div class="mapwrap" id="mapwrap">
    <canvas id="mapcv"></canvas>
    <div class="mapui">
      <input type="search" id="mapq" placeholder="search symbol…" aria-label="Search symbol">
      <label><input type="checkbox" id="mapr1"> run-1 trades</label>
      <label><input type="checkbox" id="maphub" checked> links</label>
      <button id="maptilt" title="Toggle tilted / top-down view">TILT</button>
      <button id="mapfit">FIT</button>
      <span id="mapcount" class="dim"></span>
    </div>
    <div class="legend">
      <div><span class="dot win"></span>won <span class="dot loss" style="margin-left:8px"></span>lost <span class="dot open" style="margin-left:8px"></span>live/open</div>
      <div><span class="hub"></span>RIO core <span class="hub g" style="margin-left:8px"></span>orbit · inner = run 2 · outer = run 1</div>
      <div>star size = |P&L $| · links: same coin</div>
      <div class="dim">drag to pan · scroll/pinch zoom · click a star</div>
    </div>
    <div class="mapempty" id="mapempty"></div>
  </div>`;
  const cv = el.querySelector('#mapcv'), g = cv.getContext('2d');
  const wrap = el.querySelector('#mapwrap');
  const S = {
    nodes: new Map(), links: [], rings: 1, cam: { s: 1, x: 0, y: 0 }, w: 0, h: 0, dpr: 1, tilt: 0.46,
    visible: false, q: '', hover: null, sel: null, run1: false, links_on: true, fitted: false, raf: 0, last: 0, force: true, t0: performance.now(),
  };

  // ---------- static galaxy dust (deterministic) ----------
  const dust = [], bg = [];
  { const R = rng(7);
    for (let i = 0; i < 3400; i++) {
      const band = R() < 0.72; const k = Math.floor(R() * 9);
      const r = band ? ringR(k) + gauss(R) * 16 : 40 + Math.pow(R(), 0.8) * ringR(9);
      dust.push({ r: Math.max(30, r), a: R() * Math.PI * 2, b: 0.16 + Math.pow(R(), 3) * 0.8, z: R() < 0.06 ? 1.5 : 0.8 });
    }
    for (let i = 0; i < 220; i++) bg.push({ x: R(), y: R(), b: 0.15 + R() * 0.5, z: R() < 0.1 ? 1.3 : 0.7, tw: R() * 6.28 });
  }

  // ---------- data -> orbital layout ----------
  function trades() {
    const r2 = ctx.allTrades().map(t => ({ ...t, run: t.run ?? 2 }));
    const r1 = S.run1 && ctx.archive ? ctx.archive.trades.trades.map(t => ({ ...t, run: 1 })) : [];
    return [...r2, ...r1];
  }
  function build() {
    const list = trades();
    const keep = new Set(), old = S.nodes;
    const max1 = Math.max(1e-9, ...list.filter(t => t.run === 1).map(t => Math.abs(t.pnl_usd || 0)));
    const max2 = Math.max(1e-9, ...list.filter(t => t.run !== 1).map(t => Math.abs((t.status === 'open' ? t.unrealized_pnl_usd : t.pnl_usd) || 0)));
    const byTime = (a, b) => (Date.parse(a.entry_time) || 0) - (Date.parse(b.entry_time) || 0) || a.id - b.id;
    const t2 = list.filter(t => t.run !== 1).sort(byTime), t1 = list.filter(t => t.run === 1).sort(byTime);
    let ring = 0, inRing = 0;
    const place = arr => arr.forEach(t => {
      if (inRing >= ringCap(ring)) { ring++; inRing = 0; }
      const st = tradeState(t);
      const p = Math.abs((st === 'open' ? t.unrealized_pnl_usd : t.pnl_usd) || 0);
      const r = 2.6 + 6.5 * Math.sqrt(p / (t.run === 1 ? max1 : max2));
      const key = `t:${t.run}:${t.id}`; keep.add(key);
      const n = old.get(key) || { key };
      Object.assign(n, { kind: 'trade', t, st, run: t.run, label: t.symbol || '?', r: st === 'open' ? Math.max(r, 5.5) : r,
        ring, R: ringR(ring), a0: inRing * GOLD + ring * 0.9 });
      old.set(key, n); inRing++;
    });
    place(t2);
    if (t1.length) { if (inRing) { ring++; inRing = 0; } ring++; place(t1); } // one empty orbit separates the runs
    for (const k of [...old.keys()]) if (!keep.has(k)) old.delete(k);
    S.rings = ring + 1;
    const links = [], by = {}, seen = new Set();
    for (const n of old.values()) {
      const a = (n.t.address || '').toLowerCase(), sy = (n.t.symbol || '').toUpperCase();
      if (a) (by[n.run + 'a' + a] ||= []).push(n);
      if (sy) (by[n.run + 's' + sy] ||= []).push(n);
    }
    for (const grp of Object.values(by)) for (let i = 1; i < grp.length; i++) {
      const k = grp[i - 1].key + '|' + grp[i].key; if (!seen.has(k)) { seen.add(k); links.push([grp[i - 1], grp[i]]); }
    }
    S.links = links;
    const tradesN = old.size;
    el.querySelector('#mapcount').textContent = `${tradesN} trades · ${S.rings} orbit${S.rings === 1 ? '' : 's'}`;
    const empty = el.querySelector('#mapempty');
    if (!tradesN) {
      const s = ctx.d && ctx.d.scout, st = ctx.d && ctx.d.status;
      empty.innerHTML = `<div class="empty"><b>No trades yet in run ${ctx.run ?? 2} - scanner is running</b>
        last scan ${s ? `${s.count ?? (s.rows || []).length} coins · ${s.buys ?? 0} buys` : '—'} · ${st ? `${st.scanner_rounds_last_10min ?? '—'} scans in 10 min · last ${ago(st.scanner_last_round)}` : ''}<br><br>
        <span class="dim">tick "run-1 trades" to see the 101 archived run-1 coins</span></div>`;
    } else empty.innerHTML = '';
    if (!S.fitted && S.w) { fit(); S.fitted = true; }
    kick();
  }

  // ---------- camera ----------
  function resize() {
    const r = wrap.getBoundingClientRect();
    S.dpr = Math.min(2, window.devicePixelRatio || 1);
    S.w = r.width; S.h = r.height;
    cv.width = Math.max(1, r.width * S.dpr); cv.height = Math.max(1, r.height * S.dpr);
  }
  function fit() {
    if (!S.w) return;
    const maxR = ringR(Math.max(S.rings, 3)) + 30;
    S.cam.s = Math.max(0.12, Math.min(3, Math.min(S.w / (2 * maxR), S.h / (2 * maxR * Math.max(S.tilt, 0.55))) * 0.95));
    S.cam.x = S.w / 2; S.cam.y = S.h / 2;
  }
  const simT = now => REDUCED ? 0 : now - S.t0;
  const proj = (r, a) => [S.cam.x + Math.cos(a) * r * S.cam.s, S.cam.y + Math.sin(a) * r * S.cam.s * S.tilt];
  function hit(sx, sy) {
    let best = null, bd = Infinity;
    for (const n of S.nodes.values()) {
      if (n.sx === undefined) continue;
      const d = Math.hypot(n.sx - sx, n.sy - sy), rr = Math.max(n.r * S.cam.s, 3) + 7;
      if (d < rr && d < bd) { bd = d; best = n; }
    }
    return best;
  }

  // ---------- render ----------
  function matches(n) {
    if (!S.q) return true;
    const q = S.q.toUpperCase();
    return (n.label || '').toUpperCase().includes(q) || String(n.t.id) === S.q.replace('#', '');
  }
  function draw(now) {
    const T = simT(now), s = S.cam.s, dpr = S.dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#030407'; g.fillRect(0, 0, S.w, S.h);
    const neb = g.createRadialGradient(S.cam.x, S.cam.y, 0, S.cam.x, S.cam.y, Math.max(60, ringR(6) * s));
    neb.addColorStop(0, 'rgba(220,226,240,.10)'); neb.addColorStop(0.35, 'rgba(148,163,184,.05)'); neb.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = neb; g.fillRect(0, 0, S.w, S.h);
    g.fillStyle = '#e6ebf7';
    for (const b of bg) { g.globalAlpha = b.b * (0.75 + 0.25 * Math.sin(T / 900 + b.tw)); g.fillRect(b.x * S.w, b.y * S.h, b.z, b.z); }
    g.globalAlpha = 1;
    const rings = Math.max(S.rings, 3) + 2;
    g.lineWidth = 1;
    for (let k = 0; k < rings; k++) {
      const r = ringR(k) * s;
      g.strokeStyle = `rgba(230,236,248,${k < S.rings ? 0.13 : 0.05})`;
      g.beginPath(); g.ellipse(S.cam.x, S.cam.y, r, r * S.tilt, 0, 0, Math.PI * 2); g.stroke();
    }
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = '#dfe6f5';
    for (const d of dust) {
      const [x, y] = proj(d.r, d.a + omega(d.r) * T);
      if (x < -2 || y < -2 || x > S.w + 2 || y > S.h + 2) continue;
      g.globalAlpha = d.b; g.fillRect(x, y, d.z, d.z);
    }
    g.globalAlpha = 1;
    const N = [...S.nodes.values()];
    for (const n of N) { n.ang = n.a0 + omega(n.R) * T; [n.sx, n.sy] = proj(n.R, n.ang); n.back = Math.sin(n.ang) < 0; }
    const focus = S.hover || S.sel;
    const nb = new Set(); if (focus) { nb.add(focus); for (const [p, q] of S.links) { if (p === focus) nb.add(q); if (q === focus) nb.add(p); } }
    if (S.links_on) {
      g.lineWidth = 1;
      for (const [p, q] of S.links) {
        const on = focus && (p === focus || q === focus);
        g.strokeStyle = on ? 'rgba(244,246,251,.55)' : 'rgba(200,210,235,.12)';
        g.beginPath(); g.moveTo(p.sx, p.sy); g.lineTo(q.sx, q.sy); g.stroke();
      }
    }
    const drawCore = () => {
      const cr = Math.max(6, 14 * s);
      const cg = g.createRadialGradient(S.cam.x, S.cam.y, 0, S.cam.x, S.cam.y, cr * 4);
      cg.addColorStop(0, 'rgba(255,255,255,.95)'); cg.addColorStop(0.18, 'rgba(235,240,250,.55)'); cg.addColorStop(0.5, 'rgba(160,175,205,.12)'); cg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = cg; g.beginPath(); g.arc(S.cam.x, S.cam.y, cr * 4, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(S.cam.x, S.cam.y, cr * 0.45, 0, 7); g.fill();
      g.globalCompositeOperation = 'source-over';
      g.font = `600 ${Math.max(9, Math.min(13, 11 * Math.sqrt(s)))}px Inter, system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'top';
      g.fillStyle = 'rgba(244,246,251,.85)'; g.fillText('R I O', S.cam.x, S.cam.y + cr * 0.9);
      g.globalCompositeOperation = 'lighter';
    };
    const pulse = 0.5 + 0.5 * Math.sin(now / 320);
    const showLabels = s > 0.9 || N.length <= 24;
    N.sort((a, b) => a.sy - b.sy);
    let coreDone = false;
    for (const n of N) {
      if (!coreDone && n.sy >= S.cam.y) { drawCore(); coreDone = true; }
      const m = matches(n), dim = (S.q && !m) || (focus && !nb.has(n));
      const alpha = (dim ? 0.18 : n.run === 1 ? 0.6 : 1) * (n.back ? 0.72 : 1);
      const rgb = RGB[n.st], pr = Math.max(n.r * s, 2.2);
      g.lineWidth = Math.max(1, pr * 0.55);
      for (let i = 0; i < 10; i++) {
        const [x1, y1] = proj(n.R, n.ang - i * 0.035), [x2, y2] = proj(n.R, n.ang - (i + 1) * 0.035);
        g.strokeStyle = `rgba(${rgb},${alpha * 0.32 * (1 - i / 10)})`;
        g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
      }
      const hr = pr * (n.st === 'open' ? 4 + pulse * 2 : 3.4) * (n === focus ? 1.4 : 1);
      const hg = g.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, hr);
      hg.addColorStop(0, `rgba(${rgb},${0.55 * alpha})`); hg.addColorStop(0.4, `rgba(${rgb},${0.16 * alpha})`); hg.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = hg; g.beginPath(); g.arc(n.sx, n.sy, hr, 0, 7); g.fill();
      g.globalAlpha = alpha;
      g.fillStyle = COL[n.st]; g.beginPath(); g.arc(n.sx, n.sy, pr, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(n.sx, n.sy, pr * 0.42, 0, 7); g.fill();
      g.globalAlpha = 1;
      if ((S.q && m) || n === S.sel) { g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 1.2; g.beginPath(); g.arc(n.sx, n.sy, pr + 4, 0, 7); g.stroke(); }
      if ((showLabels && !dim) || nb.has(n) || (S.q && m)) {
        g.globalCompositeOperation = 'source-over';
        g.font = `500 ${n === focus ? 12 : 10.5}px IBM Plex Mono, Menlo, monospace`; g.textAlign = 'center'; g.textBaseline = 'top';
        const ly = n.sy + pr + 5;
        g.globalAlpha = Math.max(alpha, dim ? 0.3 : 0.85);
        g.fillStyle = '#e8ecf4'; g.fillText(n.label, n.sx, ly);
        if (n === focus) {
          const open = n.st === 'open';
          g.fillStyle = COL[n.st]; g.fillText(`${usdSigned(open ? n.t.unrealized_pnl_usd : n.t.pnl_usd)} ${pct(open ? n.t.unrealized_pnl_pct : n.t.pnl_pct)} · #${n.t.id}${n.run === 1 ? ' r1' : ''}`, n.sx, ly + 14);
        }
        g.globalAlpha = 1; g.globalCompositeOperation = 'lighter';
      }
    }
    if (!coreDone) drawCore();
    g.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    S.raf = 0;
    if (!S.visible) return;
    if (S.force || now - S.last >= 33) { draw(now); S.last = now; S.force = false; }
    if (!REDUCED || [...S.nodes.values()].some(n => n.st === 'open')) S.raf = requestAnimationFrame(frame);
  }
  function kick() { S.force = true; if (!S.raf && S.visible) S.raf = requestAnimationFrame(frame); }

  // ---------- interaction ----------
  const ptrs = new Map(); let down = null, pinch = null;
  cv.addEventListener('pointerdown', e => {
    cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: S.cam.s }; down = null; return; }
    down = { x: e.offsetX, y: e.offsetY, cx: S.cam.x, cy: S.cam.y, n: hit(e.offsetX, e.offsetY), moved: false };
    cv.classList.add('drag'); kick();
  });
  cv.addEventListener('pointermove', e => {
    if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
    if (pinch && ptrs.size === 2) {
      const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      zoomAt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, pinch.s * d / pinch.d / S.cam.s); return;
    }
    if (down) {
      const dx = e.offsetX - down.x, dy = e.offsetY - down.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) down.moved = true;
      if (down.moved) { S.cam.x = down.cx + dx; S.cam.y = down.cy + dy; }
      kick(); return;
    }
    const n = hit(e.offsetX, e.offsetY);
    if (n !== S.hover) { S.hover = n; cv.style.cursor = n ? 'pointer' : 'grab'; kick(); }
  });
  const up = e => {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = null;
    if (down && !down.moved) { const n = down.n; if (n) { S.sel = n; ctx.openTrade(n.t); } else S.sel = null; }
    down = null; cv.classList.remove('drag'); kick();
  };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', () => { if (!down) { S.hover = null; kick(); } });
  function zoomAt(sx, sy, f) {
    const ns = Math.max(0.1, Math.min(6, S.cam.s * f)); f = ns / S.cam.s;
    S.cam.x = sx - (sx - S.cam.x) * f; S.cam.y = sy - (sy - S.cam.y) * f; S.cam.s = ns; kick();
  }
  cv.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.offsetX, e.offsetY, Math.exp(-e.deltaY * 0.0015)); }, { passive: false });

  el.querySelector('#mapq').addEventListener('input', e => {
    S.q = e.target.value.trim();
    const m = [...S.nodes.values()].find(n => S.q && matches(n));
    if (m && m.sx !== undefined) { S.cam.x += S.w / 2 - m.sx; S.cam.y += S.h / 2 - m.sy; }
    kick();
  });
  el.querySelector('#mapr1').addEventListener('change', async e => {
    S.run1 = e.target.checked;
    if (S.run1) { try { await ctx.loadArchive(); } catch (err) { console.error(err); } }
    S.fitted = false; build();
  });
  el.querySelector('#maphub').addEventListener('change', e => { S.links_on = e.target.checked; kick(); });
  el.querySelector('#maptilt').addEventListener('click', () => { S.tilt = S.tilt < 0.9 ? 1 : 0.46; fit(); kick(); });
  el.querySelector('#mapfit').addEventListener('click', () => { fit(); kick(); });
  new ResizeObserver(() => { resize(); if (!S.fitted && S.nodes.size) { fit(); S.fitted = true; } kick(); }).observe(wrap);

  return {
    update() { build(); },
    reset() { S.nodes.clear(); S.links = []; S.fitted = false; },
    visible(v) { S.visible = v; if (v) { resize(); if (!S.fitted) { fit(); S.fitted = !!S.nodes.size; } kick(); } },
  };
}
