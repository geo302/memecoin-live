// MAP: Obsidian-style force-directed graph of every coin entered, rendered on canvas.
// Updated in place on each poll (positions persist; only colors/sizes/new nodes change).
import { esc, tradeState, ago } from './fmt.js';

const COL = { win: '#00d26a', loss: '#ff3b3b', open: '#ffd400' };
const HUB = { exit: '#8b5cf6', setup: '#9ca3af', src: '#6b7280', live: '#ffd400' };

export function initMap(el, ctx) {
  el.innerHTML = `<div class="mapwrap" id="mapwrap">
    <canvas id="mapcv"></canvas>
    <div class="mapui">
      <input type="search" id="mapq" placeholder="search symbol…" aria-label="Search symbol">
      <label><input type="checkbox" id="mapr1"> run-1 trades</label>
      <label><input type="checkbox" id="maphub" checked> hubs</label>
      <button id="mapfit">FIT</button>
      <span id="mapcount" class="dim"></span>
    </div>
    <div class="legend">
      <div><span class="dot win"></span>won <span class="dot loss" style="margin-left:8px"></span>lost <span class="dot open" style="margin-left:8px"></span>live/open</div>
      <div><span class="hub"></span>exit type <span class="hub g" style="margin-left:8px"></span>setup / source</div>
      <div>size = |P&L $| · edges: same coin, next trade, hubs</div>
      <div class="dim">drag · scroll/pinch zoom · click a coin</div>
    </div>
    <div class="mapempty" id="mapempty"></div>
  </div>`;
  const cv = el.querySelector('#mapcv'), g = cv.getContext('2d');
  const wrap = el.querySelector('#mapwrap');
  const S = {
    nodes: new Map(), edges: [], alpha: 1, cam: { s: 1, x: 0, y: 0 }, w: 0, h: 0, dpr: 1,
    visible: false, q: '', hover: null, sel: null, run1: false, hubs: true, fitted: false, raf: 0, dirty: true,
  };

  // ---------- data -> graph ----------
  function trades() {
    const r2 = ctx.allTrades().map(t => ({ ...t, run: t.run ?? 2 }));
    const r1 = S.run1 && ctx.archive ? ctx.archive.trades.trades.map(t => ({ ...t, run: 1 })) : [];
    return [...r2, ...r1];
  }
  function build() {
    const list = trades();
    const keep = new Set(); const edges = [];
    const maxAbs = Math.max(1e-9, ...list.map(t => Math.abs((t.status === 'open' ? t.unrealized_pnl_usd : t.pnl_usd) || 0) / (t.run === 1 ? 1 : 1)));
    const old = S.nodes; let added = 0;
    const node = (key, init) => {
      keep.add(key);
      let n = old.get(key);
      if (!n) { n = { key, x: (Math.random() - .5) * 200, y: (Math.random() - .5) * 200, vx: 0, vy: 0, ...init }; old.set(key, n); added++; }
      else Object.assign(n, init);
      return n;
    };
    const hub = (type, label) => S.hubs ? node(`h:${type}:${label}`, { kind: 'hub', type, label, r: type === 'exit' ? 6 : 5, color: HUB[type], deg: 0 }) : null;
    // run-1 trades are scaled against their own max (smaller $ sizes)
    const max1 = Math.max(1e-9, ...list.filter(t => t.run === 1).map(t => Math.abs(t.pnl_usd || 0)));
    const max2 = Math.max(1e-9, ...list.filter(t => t.run !== 1).map(t => Math.abs((t.status === 'open' ? t.unrealized_pnl_usd : t.pnl_usd) || 0)));
    void maxAbs;
    const byRun = {};
    for (const t of list) {
      const st = tradeState(t);
      const p = Math.abs((st === 'open' ? t.unrealized_pnl_usd : t.pnl_usd) || 0);
      const r = 3 + 9 * Math.sqrt(p / (t.run === 1 ? max1 : max2));
      const n = node(`t:${t.run}:${t.id}`, { kind: 'trade', t, st, r: st === 'open' ? Math.max(r, 6) : r, run: t.run, label: t.symbol || '?' });
      (byRun[t.run] ||= []).push(n);
      if (S.hubs) {
        const ex = st === 'open' ? hub('live', 'LIVE') : hub('exit', t.exit_type || 'OTHER');
        const sp = hub('setup', String(t.setup || 'unknown').split('|')[0]);
        const so = hub('src', t.source || 'unknown');
        if (ex) { edges.push([n, ex, 34, 0.05]); ex.deg++; }
        if (sp) { edges.push([n, sp, 80, 0.012]); sp.deg++; }
        if (so) { edges.push([n, so, 90, 0.01]); so.deg++; }
      }
    }
    for (const arr of Object.values(byRun)) {
      arr.sort((a, b) => a.t.id - b.t.id);
      for (let i = 1; i < arr.length; i++) edges.push([arr[i - 1], arr[i], 46, 0.02]); // consecutive in time
      const byCoin = {};
      for (const n of arr) {
        const k = (n.t.address || '').toLowerCase() || n.t.symbol; const k2 = (n.t.symbol || '').toUpperCase();
        (byCoin['a' + k] ||= []).push(n); if (k2) (byCoin['s' + k2] ||= []).push(n);
      }
      for (const g2 of Object.values(byCoin)) for (let i = 1; i < g2.length; i++) edges.push([g2[i - 1], g2[i], 22, 0.08]); // copycats / same coin
    }
    for (const k of [...old.keys()]) if (!keep.has(k)) old.delete(k);
    // hubs grow with degree
    for (const n of old.values()) if (n.kind === 'hub') n.r = 4 + Math.min(10, Math.sqrt(n.deg) * 1.6);
    // new nodes spawn next to a neighbour
    for (const [a, b] of edges) {
      if (a.vx === 0 && a.vy === 0 && !a._placed && b._placed) { a.x = b.x + (Math.random() - .5) * 40; a.y = b.y + (Math.random() - .5) * 40; }
    }
    for (const n of old.values()) n._placed = true;
    S.edges = edges;
    if (added) S.alpha = Math.max(S.alpha, added > 10 ? 1 : 0.5);
    const tradesN = [...old.values()].filter(n => n.kind === 'trade').length;
    el.querySelector('#mapcount').textContent = `${tradesN} trades`;
    const empty = el.querySelector('#mapempty');
    if (!tradesN) {
      const s = ctx.d && ctx.d.scout, st = ctx.d && ctx.d.status;
      empty.innerHTML = `<div class="empty"><b>No trades yet in run ${ctx.run ?? 2} - scanner is running</b>
        last scan ${s ? `${s.count ?? (s.rows || []).length} coins · ${s.buys ?? 0} buys` : '—'} · ${st ? `${st.scanner_rounds_last_10min ?? '—'} scans in 10 min · last ${ago(st.scanner_last_round)}` : ''}<br><br>
        <span class="dim">tick "run-1 trades" to see the 101 archived run-1 coins</span></div>`;
    } else empty.innerHTML = '';
    S.dirty = true; kick();
  }

  // ---------- physics ----------
  function step() {
    const N = [...S.nodes.values()], a = S.alpha;
    for (let i = 0; i < N.length; i++) {
      const p = N[i];
      for (let j = i + 1; j < N.length; j++) {
        const q = N[j];
        let dx = q.x - p.x, dy = q.y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = Math.random() - .5; dy = Math.random() - .5; d2 = 1; }
        if (d2 > 160000) continue;
        const f = (p.kind === 'hub' || q.kind === 'hub' ? 900 : 380) / d2 * a;
        const d = Math.sqrt(d2), fx = dx / d * f, fy = dy / d * f;
        p.vx -= fx; p.vy -= fy; q.vx += fx; q.vy += fy;
      }
    }
    for (const [p, q, L, k] of S.edges) {
      const dx = q.x - p.x, dy = q.y - p.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - L) * k * a, fx = dx / d * f, fy = dy / d * f;
      p.vx += fx; p.vy += fy; q.vx -= fx; q.vy -= fy;
    }
    for (const n of N) {
      n.vx -= n.x * 0.004 * a; n.vy -= n.y * 0.004 * a;
      if (n === S.drag) { n.vx = n.vy = 0; continue; }
      n.vx *= 0.82; n.vy *= 0.82;
      n.x += Math.max(-30, Math.min(30, n.vx)); n.y += Math.max(-30, Math.min(30, n.vy));
    }
    S.alpha = Math.max(0, S.alpha * 0.985 - 0.0005);
  }

  // ---------- camera ----------
  function resize() {
    const r = wrap.getBoundingClientRect();
    S.dpr = Math.min(2, window.devicePixelRatio || 1);
    S.w = r.width; S.h = r.height;
    cv.width = Math.max(1, r.width * S.dpr); cv.height = Math.max(1, r.height * S.dpr);
    S.dirty = true;
  }
  function fit() {
    const N = [...S.nodes.values()]; if (!N.length || !S.w) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const n of N) { x0 = Math.min(x0, n.x); y0 = Math.min(y0, n.y); x1 = Math.max(x1, n.x); y1 = Math.max(y1, n.y); }
    const s = Math.min(2.2, Math.min(S.w / (x1 - x0 + 120), S.h / (y1 - y0 + 120)));
    S.cam.s = s; S.cam.x = S.w / 2 - (x0 + x1) / 2 * s; S.cam.y = S.h / 2 - (y0 + y1) / 2 * s; S.dirty = true;
  }
  const toWorld = (sx, sy) => [(sx - S.cam.x) / S.cam.s, (sy - S.cam.y) / S.cam.s];
  function hit(sx, sy) {
    const [x, y] = toWorld(sx, sy); let best = null, bd = Infinity;
    for (const n of S.nodes.values()) {
      const d = Math.hypot(n.x - x, n.y - y), rr = n.r + 6 / S.cam.s;
      if (d < rr && d < bd) { bd = d; best = n; }
    }
    return best;
  }

  // ---------- render ----------
  function matches(n) {
    if (!S.q) return true;
    const q = S.q.toUpperCase();
    return n.kind === 'trade' ? (n.label || '').toUpperCase().includes(q) || String(n.t.id) === S.q.replace('#', '') : String(n.label).toUpperCase().includes(q);
  }
  function draw(now) {
    const { s, x: cx, y: cy } = S.cam;
    g.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
    g.fillStyle = '#000'; g.fillRect(0, 0, S.w, S.h);
    g.setTransform(S.dpr * s, 0, 0, S.dpr * s, S.dpr * cx, S.dpr * cy);
    const focus = S.hover || S.sel;
    const nb = new Set();
    if (focus) { nb.add(focus); for (const [p, q] of S.edges) { if (p === focus) nb.add(q); if (q === focus) nb.add(p); } }
    // edges
    g.lineWidth = 0.6 / s;
    for (const [p, q] of S.edges) {
      const on = focus && (p === focus || q === focus);
      const dim = (S.q && !(matches(p) || matches(q))) || (focus && !on);
      g.strokeStyle = on ? 'rgba(255,212,0,.55)' : dim ? 'rgba(120,130,150,.06)' : (p.run === 1 || q.run === 1) ? 'rgba(120,130,150,.12)' : 'rgba(150,160,180,.22)';
      g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(q.x, q.y); g.stroke();
    }
    // nodes
    const pulse = 0.5 + 0.5 * Math.sin(now / 300);
    const showLabels = s > 0.55;
    g.textBaseline = 'middle';
    for (const n of S.nodes.values()) {
      const m = matches(n), dim = (S.q && !m) || (focus && !nb.has(n));
      let alpha = dim ? 0.15 : n.run === 1 ? 0.5 : 1;
      const col = n.kind === 'hub' ? n.color : COL[n.st];
      g.globalAlpha = alpha;
      if (n.kind === 'trade' && n.st === 'open') {
        g.beginPath(); g.arc(n.x, n.y, n.r + 3 + pulse * 5, 0, 7); g.fillStyle = `rgba(255,212,0,${0.12 + 0.18 * (1 - pulse)})`; g.fill();
      }
      g.shadowColor = col; g.shadowBlur = dim ? 0 : (n.kind === 'hub' ? 14 : 8) * s * S.dpr;
      g.beginPath(); g.arc(n.x, n.y, n.r, 0, 7);
      g.fillStyle = n.kind === 'trade' && n.run === 1 ? shade(col) : col; g.fill();
      g.shadowBlur = 0;
      if (S.q && m && n.kind === 'trade') { g.strokeStyle = '#fff'; g.lineWidth = 1.5 / s; g.stroke(); }
      if (showLabels || nb.has(n) || (S.q && m)) {
        const fs = Math.max(9, Math.min(13, 10 / Math.sqrt(s))) / s * (s > 1.6 ? 1 : 1);
        g.font = `${n.kind === 'hub' ? 600 : 400} ${fs}px IBM Plex Mono, Menlo, monospace`;
        const ly = n.y + n.r + fs * 0.9;
        if (n.kind === 'hub') {
          g.fillStyle = n.color; g.textAlign = 'center'; g.fillText(String(n.label).toUpperCase(), n.x, ly);
        } else {
          const name = n.label, id = `#${n.t.id}${n.run === 1 ? '·r1' : ''}`;
          const wN = g.measureText(name).width, wI = g.measureText('  ' + id).width, dR = fs * 0.32;
          const total = dR * 2 + fs * 0.4 + wN + wI; let x = n.x - total / 2;
          g.beginPath(); g.arc(x + dR, ly, dR, 0, 7); g.fillStyle = COL[n.st]; g.fill(); x += dR * 2 + fs * 0.4;
          g.textAlign = 'left'; g.fillStyle = '#c9ced8'; g.fillText(name, x, ly); x += wN;
          g.fillStyle = '#7d8799'; g.fillText('  ' + id, x, ly);
        }
      }
    }
    g.globalAlpha = 1;
  }
  const shade = c => c === COL.win ? '#1f7a4a' : c === COL.loss ? '#8a2b2b' : '#8a7a20';

  function frame(now) {
    S.raf = 0;
    if (!S.visible) return;
    const hasOpen = [...S.nodes.values()].some(n => n.st === 'open');
    if (S.alpha > 0.003) { step(); step(); S.dirty = true; if (!S.fitted && S.alpha < 0.25) { fit(); S.fitted = true; } }
    if (S.dirty || hasOpen) { draw(now); S.dirty = false; }
    if (S.alpha > 0.003 || hasOpen || S.drag) kick();
  }
  function kick() { if (!S.raf && S.visible) S.raf = requestAnimationFrame(frame); }

  // ---------- interaction ----------
  const ptrs = new Map(); let down = null, pinch = null;
  cv.addEventListener('pointerdown', e => {
    cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: S.cam.s }; S.drag = null; return; }
    const n = hit(e.offsetX, e.offsetY);
    down = { x: e.offsetX, y: e.offsetY, cx: S.cam.x, cy: S.cam.y, n, moved: false };
    if (n) { S.drag = n; S.alpha = Math.max(S.alpha, 0.25); }
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
      if (down.n) { const [x, y] = toWorld(e.offsetX, e.offsetY); down.n.x = x; down.n.y = y; S.alpha = Math.max(S.alpha, 0.15); }
      else { S.cam.x = down.cx + dx; S.cam.y = down.cy + dy; }
      S.dirty = true; kick(); return;
    }
    const n = hit(e.offsetX, e.offsetY);
    if (n !== S.hover) { S.hover = n; cv.style.cursor = n ? 'pointer' : 'grab'; S.dirty = true; kick(); }
  });
  const up = e => {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = null;
    if (down && !down.moved) {
      const n = down.n;
      if (n && n.kind === 'trade') { S.sel = n; ctx.openTrade(n.t); }
      else if (n) S.sel = S.sel === n ? null : n;
      else S.sel = null;
    }
    down = null; S.drag = null; cv.classList.remove('drag'); S.dirty = true; kick();
  };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', () => { if (!down) { S.hover = null; S.dirty = true; kick(); } });
  function zoomAt(sx, sy, f) {
    const ns = Math.max(0.15, Math.min(6, S.cam.s * f)); f = ns / S.cam.s;
    S.cam.x = sx - (sx - S.cam.x) * f; S.cam.y = sy - (sy - S.cam.y) * f; S.cam.s = ns; S.dirty = true; kick();
  }
  cv.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.offsetX, e.offsetY, Math.exp(-e.deltaY * 0.0015)); }, { passive: false });

  el.querySelector('#mapq').addEventListener('input', e => {
    S.q = e.target.value.trim(); S.dirty = true;
    const m = [...S.nodes.values()].find(n => n.kind === 'trade' && S.q && matches(n));
    if (m) { S.cam.x = S.w / 2 - m.x * S.cam.s; S.cam.y = S.h / 2 - m.y * S.cam.s; }
    kick();
  });
  el.querySelector('#mapr1').addEventListener('change', async e => {
    S.run1 = e.target.checked;
    if (S.run1) { try { await ctx.loadArchive(); } catch (err) { console.error(err); } }
    S.fitted = false; S.alpha = 1; build();
  });
  el.querySelector('#maphub').addEventListener('change', e => { S.hubs = e.target.checked; S.alpha = 0.8; build(); });
  el.querySelector('#mapfit').addEventListener('click', fit);
  new ResizeObserver(() => { resize(); kick(); }).observe(wrap);

  return {
    update() { build(); },
    reset() { S.nodes.clear(); S.edges = []; S.fitted = false; S.alpha = 1; },
    visible(v) { S.visible = v; if (v) { resize(); S.dirty = true; kick(); } },
  };
}
