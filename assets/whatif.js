// 9) WHAT-IF LAB — completely separate from Rio's live book, vault, and counts.
// Finds real Base big-movers (DexScreener / GeckoTerminal) and plays a clearly
// labelled WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE replay.
// Read-only. On CORS / rate-limit errors, falls back to built-in sample series.

import { openReplay, modelFromWhatIf } from './replay.js?v=d681b70b';
import { usd, usdSigned, pct, cls, esc, isNum } from './fmt.js?v=d681b70b';

const BANNER = 'SEPARATE WHAT-IF LAB · DOES NOT AFFECT RIO\'S LIVE BOOK OR STATS';
const STAMP = 'WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE';
const SIZES = [500, 1000, 5000];

const GT = 'https://api.geckoterminal.com/api/v2';
const DS = 'https://api.dexscreener.com';

// Built-in fallback (synthetic but realistic Base-style runners) used only when public APIs fail.
const SAMPLE = [
  {
    id: 'sample-voidpulse',
    symbol: 'VOIDPULSE', name: 'Voidpulse (sample)',
    address: '0x0000000000000000000000000000000000000001',
    pair: '0x0000000000000000000000000000000000000002',
    network: 'base', source: 'SAMPLE FALLBACK',
    change: 127.4, changeLabel: '1h',
    price: 0.0000842, liq: 41200, vol: 186000,
    series: makeRun(0.0000371, 0.0000842, 90, 42),
  },
  {
    id: 'sample-tektite',
    symbol: 'TEKTITE', name: 'Tektite (sample)',
    address: '0x0000000000000000000000000000000000000003',
    pair: '0x0000000000000000000000000000000000000004',
    network: 'base', source: 'SAMPLE FALLBACK',
    change: 89.6, changeLabel: '1h',
    price: 0.000215, liq: 33800, vol: 94000,
    series: makeRun(0.0001135, 0.000215, 80, 19),
  },
  {
    id: 'sample-apastron',
    symbol: 'APASTRON', name: 'Apastron (sample)',
    address: '0x0000000000000000000000000000000000000005',
    pair: '0x0000000000000000000000000000000000000006',
    network: 'base', source: 'SAMPLE FALLBACK',
    change: 204.1, changeLabel: '6h',
    price: 0.00000618, liq: 55100, vol: 310000,
    series: makeRun(0.00000204, 0.00000618, 120, 7),
  },
  {
    id: 'sample-cambist',
    symbol: 'CAMBIST', name: 'Cambist (sample)',
    address: '0x0000000000000000000000000000000000000007',
    pair: '0x0000000000000000000000000000000000000008',
    network: 'base', source: 'SAMPLE FALLBACK',
    change: 61.2, changeLabel: '1h',
    price: 0.00146, liq: 72000, vol: 155000,
    series: makeRun(0.000905, 0.00146, 70, 11),
  },
];

function makeRun(start, end, n, seed) {
  // Deterministic jagged path from start → end with a mid dip and late spike.
  let s = seed >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const t0 = Date.UTC(2026, 10, 22, 16, 0, 0);
  const out = [];
  let px = start;
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    const target = start + (end - start) * (u * u); // accelerate late
    const wobble = (rnd() - 0.45) * start * 0.08;
    const dip = (u > 0.2 && u < 0.35) ? -start * 0.12 : 0;
    px = Math.max(start * 0.6, px * 0.55 + (target + wobble + dip) * 0.45);
    out.push({ t: t0 + i * 60e3, price: px });
  }
  out[0].price = start;
  out[out.length - 1].price = end;
  out[0].event = 'ENTRY';
  out[out.length - 1].event = 'EXIT';
  return out;
}

async function getJSON(url, timeout = 8000) {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), timeout);
  try {
    const r = await fetch(url, { signal: c.signal, headers: { Accept: 'application/json' }, cache: 'no-store' });
    if (!r.ok) throw new Error(r.status + ' ' + url);
    return await r.json();
  } finally { clearTimeout(id); }
}

function chgOf(p) {
  const c = p.priceChange || {};
  const h1 = num(c.h1 ?? c.m60);
  const h6 = num(c.h6);
  const h24 = num(c.h24);
  // pick the largest positive window, remember which
  const opts = [['1h', h1], ['6h', h6], ['24h', h24]].filter(x => isNum(x[1]));
  if (!opts.length) return { change: null, label: '—' };
  opts.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  return { change: opts[0][1], label: opts[0][0] };
}
function num(v) { const n = +v; return Number.isFinite(n) ? n : null; }

async function fetchGecko() {
  const urls = [
    `${GT}/networks/base/trending_pools?include=base_token,quote_token&page=1`,
    `${GT}/networks/base/new_pools?include=base_token,quote_token&page=1`,
  ];
  const rows = [];
  for (const u of urls) {
    try {
      const j = await getJSON(u);
      const inc = {};
      for (const x of (j.included || [])) inc[x.id] = x;
      for (const p of (j.data || [])) {
        const a = p.attributes || {};
        const rel = (p.relationships && p.relationships.base_token && p.relationships.base_token.data) || {};
        const tok = inc[rel.id] || {};
        const ta = tok.attributes || {};
        const ch1 = num(a.price_change_percentage && a.price_change_percentage.h1);
        const ch6 = num(a.price_change_percentage && a.price_change_percentage.h6);
        const ch24 = num(a.price_change_percentage && a.price_change_percentage.h24);
        const window = [['1h', ch1], ['6h', ch6], ['24h', ch24]].filter(x => isNum(x[1]));
        window.sort((x, y) => y[1] - x[1]);
        const best = window[0] || ['1h', null];
        rows.push({
          id: 'gt-' + (p.id || a.address),
          symbol: (ta.symbol || a.name || '???').toUpperCase(),
          name: ta.name || a.name || '',
          address: ta.address || '',
          pair: a.address || (p.id || '').split('_').pop(),
          network: 'base',
          source: 'GeckoTerminal',
          change: best[1], changeLabel: best[0],
          price: num(a.base_token_price_usd),
          liq: num(a.reserve_in_usd),
          vol: num(a.volume_usd && (a.volume_usd.h1 || a.volume_usd.h24)),
          series: null,
        });
      }
    } catch (e) { /* try next */ }
  }
  return rows;
}

async function fetchDex() {
  const rows = [];
  // token-boosts often includes hot Base pairs and allows CORS
  const tries = [
    `${DS}/token-boosts/top/v1`,
    `${DS}/token-boosts/latest/v1`,
    `${DS}/latest/dex/search?q=base`,
  ];
  for (const u of tries) {
    try {
      const j = await getJSON(u);
      const list = Array.isArray(j) ? j : (j.pairs || j.tokens || []);
      for (const item of list) {
        // boosts payload is {chainId, tokenAddress, ...} — follow up later if no pair data
        if (item.chainId && item.tokenAddress && !item.priceUsd && item.chainId !== 'base' && item.chainId !== '8453') continue;
        if (item.chainId && item.chainId !== 'base' && item.chainId !== '8453' && item.chainId !== 8453) continue;
        if (item.priceUsd || item.pairAddress) {
          if (item.chainId && item.chainId !== 'base' && String(item.chainId) !== '8453') continue;
          const ch = chgOf(item);
          rows.push({
            id: 'ds-' + (item.pairAddress || item.tokenAddress),
            symbol: String((item.baseToken && item.baseToken.symbol) || item.symbol || '???').toUpperCase(),
            name: (item.baseToken && item.baseToken.name) || item.name || '',
            address: (item.baseToken && item.baseToken.address) || item.tokenAddress || '',
            pair: item.pairAddress || item.pair || '',
            network: 'base',
            source: 'DexScreener',
            change: ch.change, changeLabel: ch.label,
            price: num(item.priceUsd),
            liq: num(item.liquidity && (item.liquidity.usd || item.liquidity)),
            vol: num(item.volume && (item.volume.h1 || item.volume.h24)),
            series: null,
          });
        }
      }
    } catch (e) { /* try next */ }
  }
  return rows;
}

async function lookupAddress(addr) {
  const a = addr.trim();
  const tries = [
    `${DS}/latest/dex/tokens/${a}`,
    `${DS}/latest/dex/pairs/base/${a}`,
  ];
  for (const u of tries) {
    try {
      const j = await getJSON(u);
      const pairs = j.pairs || (j.pair ? [j.pair] : []);
      const basePairs = pairs.filter(p => (p.chainId === 'base' || p.chainId === 8453 || String(p.chainId) === '8453'));
      const p = (basePairs[0] || pairs[0]);
      if (!p) continue;
      const ch = chgOf(p);
      return {
        id: 'ds-' + (p.pairAddress || a),
        symbol: String((p.baseToken && p.baseToken.symbol) || 'TOKEN').toUpperCase(),
        name: (p.baseToken && p.baseToken.name) || '',
        address: (p.baseToken && p.baseToken.address) || a,
        pair: p.pairAddress || a,
        network: p.chainId || 'base',
        source: 'DexScreener',
        change: ch.change, changeLabel: ch.label,
        price: num(p.priceUsd),
        liq: num(p.liquidity && p.liquidity.usd),
        vol: num(p.volume && (p.volume.h1 || p.volume.h24)),
        series: null,
      };
    } catch (e) { /* next */ }
  }
  // GeckoTerminal pool lookup
  try {
    const j = await getJSON(`${GT}/networks/base/pools/${a}?include=base_token`);
    const p = j.data, aattr = (p && p.attributes) || {};
    const tok = ((j.included || [])[0] || {}).attributes || {};
    const ch1 = num(aattr.price_change_percentage && aattr.price_change_percentage.h1);
    return {
      id: 'gt-' + a,
      symbol: String(tok.symbol || 'TOKEN').toUpperCase(),
      name: tok.name || '',
      address: tok.address || '',
      pair: aattr.address || a,
      network: 'base', source: 'GeckoTerminal',
      change: ch1, changeLabel: '1h',
      price: num(aattr.base_token_price_usd),
      liq: num(aattr.reserve_in_usd),
      vol: num(aattr.volume_usd && aattr.volume_usd.h1),
      series: null,
    };
  } catch (e) { return null; }
}

async function fetchOhlcv(row) {
  if (row.series && row.series.length) return row.series;
  const isAddr = a => typeof a === 'string' && /^0x[0-9a-fA-F]{40}$/.test(a);
  const candidates = [];
  const add = a => { if (isAddr(a) && !candidates.includes(a.toLowerCase())) candidates.push(a.toLowerCase()); };
  add(row.pair);
  // Some listings store a token address in `pair`, or only have a token address — resolve pools.
  if (isAddr(row.address) || candidates.length === 0) {
    const tok = isAddr(row.address) ? row.address : row.pair;
    if (isAddr(tok)) {
      try {
        const j = await getJSON(`${GT}/networks/base/tokens/${tok}/pools?page=1`);
        for (const p of (j.data || []).slice(0, 4)) {
          add((p.attributes || {}).address || (p.id || '').split('_').pop());
        }
      } catch (e) { /* keep whatever candidates we have */ }
    }
  }
  if (!candidates.length) return null;
  async function ohlcv(pool) {
    for (const [tf, agg] of [['minute', 1], ['minute', 5], ['hour', 1]]) {
      try {
        const j = await getJSON(`${GT}/networks/base/pools/${pool}/ohlcv/${tf}?aggregate=${agg}&limit=1000&currency=usd`);
        const list = (((j.data || {}).attributes) || {}).ohlcv_list || [];
        if (!list.length) continue;
        const series = list.map(c => ({ t: (c[0] < 1e12 ? c[0] * 1000 : c[0]), price: +c[4] }))
          .filter(p => isNum(p.t) && isNum(p.price))
          .sort((a, b) => a.t - b.t);
        if (series.length >= 4) return series;
      } catch (e) { /* next tf */ }
    }
    return null;
  }
  for (const pool of candidates) {
    const s = await ohlcv(pool);
    if (s) { row.pair = pool; return s; }
  }
  return null;
}

function dedupe(rows) {
  const seen = new Set(), out = [];
  for (const r of rows) {
    const k = (r.pair || r.address || r.symbol).toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}

export function initWhatIf(el) {
  const st = {
    rows: [], source: '', err: '', filter: 80, size: 1000, customSize: '',
    sel: null, series: null, entryIdx: 0, loading: false, loadingSeries: false,
    shown: false,
  };

  el.innerHTML = `
    <div class="hdr">9) WHAT-IF LAB<span class="sp"></span><span class="dim">hypothetical backtests only</span></div>
    <div class="wi-banner">${esc(BANNER)}</div>
    <div class="wi-stamp">${esc(STAMP)}</div>
    <div class="wi-wrap">
      <div class="wi-left glass">
        <div class="tr-h"><span>BASE BIG MOVERS</span><span class="dim" id="wi-src">loading…</span></div>
        <div class="toolbar">
          <span class="dim">min move</span>
          <div class="seg" id="wi-filt">
            <button data-f="50">+50%</button>
            <button data-f="80" class="on">+80%+</button>
            <button data-f="0">ALL</button>
          </div>
          <button class="btn sm" id="wi-refresh">↻ REFRESH</button>
        </div>
        <div class="toolbar">
          <input type="text" id="wi-addr" placeholder="Paste a Base token or pair address (0x…)" spellcheck="false" style="flex:1;min-width:180px">
          <button class="btn" id="wi-go">LOOK UP</button>
        </div>
        <div class="tw" id="wi-table"><div class="empty">Fetching public Base movers…</div></div>
      </div>
      <div class="wi-right glass" id="wi-right">
        <div class="empty"><b>Pick a mover</b>Choose a token on the left — or paste any Base address — then set a hypothetical entry and size.</div>
      </div>
    </div>`;

  const $ = id => { const s = id.startsWith('#') ? id : '#' + id; return el.querySelector(s) || document.getElementById(s.slice(1)); };

  function filtered() {
    const min = st.filter;
    return st.rows.filter(r => min <= 0 || (isNum(r.change) && r.change >= min));
  }

  function renderTable() {
    const rows = filtered();
    const box = $('#wi-table');
    if (!rows.length) {
      box.innerHTML = `<div class="empty"><b>No movers at this filter</b>${esc(st.err || 'Try ALL, or paste a token address.')}</div>`;
      return;
    }
    box.innerHTML = `<table class="t"><thead><tr><th>SYMBOL</th><th class="r">MOVE</th><th class="r">PRICE</th><th class="r">LIQ</th><th>SOURCE</th></tr></thead><tbody>${rows.map(r => `
      <tr class="link ${st.sel && st.sel.id === r.id ? 'on' : ''}" data-id="${esc(r.id)}">
        <td><b>${esc(r.symbol)}</b> <span class="dim">${esc((r.name || '').slice(0, 28))}</span></td>
        <td class="r ${cls(r.change)}">${isNum(r.change) ? pct(r.change, 1) : '—'} <span class="dim">${esc(r.changeLabel || '')}</span></td>
        <td class="r">${isNum(r.price) ? (r.price >= 0.001 ? '$' + r.price.toPrecision(5) : '$' + r.price.toExponential(3)) : '—'}</td>
        <td class="r">${isNum(r.liq) ? (r.liq >= 1000 ? '$' + (r.liq / 1000).toFixed(1) + 'k' : usd(r.liq, 0)) : '—'}</td>
        <td class="dim">${esc(r.source)}</td>
      </tr>`).join('')}</tbody></table>`;
    box.querySelectorAll('tr[data-id]').forEach(tr => tr.addEventListener('click', () => {
      const r = st.rows.find(x => x.id === tr.dataset.id);
      if (r) select(r);
    }));
  }

  function sizeVal() {
    const c = parseFloat(st.customSize);
    return Number.isFinite(c) && c > 0 ? c : st.size;
  }

  function renderRight() {
    const box = $('#wi-right');
    const r = st.sel;
    if (!r) {
      box.innerHTML = `<div class="empty"><b>Pick a mover</b>Choose a token on the left — or paste any Base address — then set a hypothetical entry and size.</div>`;
      return;
    }
    const series = st.series || [];
    const entryIdx = Math.max(0, Math.min((series.length ? series.length - 2 : 0), st.entryIdx));
    const entryPx = series[entryIdx] ? series[entryIdx].price : r.price;
    const lastPx = series.length ? series[series.length - 1].price : r.price;
    const size = sizeVal();
    const hypPct = series.length && isNum(entryPx) && entryPx && isNum(lastPx)
      ? (lastPx / entryPx - 1) * 100
      : (isNum(r.change) ? r.change : 0);
    const hypUsd = size * hypPct / 100;
    box.innerHTML = `
      <div class="tr-h"><span>${esc(r.symbol)} · WHAT-IF</span><span class="dim">${esc(r.source)}</span></div>
      <div class="wi-meta">
        <div class="cs"><div class="l">Token</div><div class="v">${esc(r.symbol)}</div><div class="s">${esc(r.name || '')}</div></div>
        <div class="cs"><div class="l">Observed move</div><div class="v ${cls(r.change)}">${isNum(r.change) ? pct(r.change, 1) : '—'}</div><div class="s">${esc(r.changeLabel || '')}</div></div>
        <div class="cs"><div class="l">What-if size</div><div class="v" id="wi-size-v">${usd(size, 0)}</div><div class="s">hypothetical</div></div>
        <div class="cs"><div class="l">What-if P&amp;L</div><div class="v ${cls(hypUsd)}" id="wi-pnl-v">${usdSigned(hypUsd)}</div><div class="s" id="wi-pnl-s">${pct(hypPct, 2)} if held to last tick</div></div>
      </div>
      <div class="wi-stamp tight">${esc(STAMP)}</div>
      <div class="toolbar">
        <span class="dim">hypothetical size</span>
        <div class="seg" id="wi-size">${SIZES.map(s => `<button data-sz="${s}" class="${st.size === s && !st.customSize ? 'on' : ''}">$${s.toLocaleString()}</button>`).join('')}</div>
        <input type="number" id="wi-custom" min="1" step="50" placeholder="custom $" value="${esc(st.customSize)}" style="width:110px">
      </div>
      <div class="toolbar">
        <span class="dim">hypothetical entry</span>
        <input type="range" id="wi-entry" min="0" max="${Math.max(0, series.length - 2)}" value="${entryIdx}" ${series.length ? '' : 'disabled'}>
        <span id="wi-entry-lab" class="yel">${series.length ? 'tick ' + (entryIdx + 1) + ' / ' + series.length + '  @  ' + (isNum(entryPx) ? entryPx.toPrecision(6) : '—') : 'no series yet'}</span>
        <span class="dim">default = start of the run · drag the chart or the slider</span>
      </div>
      ${st.loadingSeries ? '<div class="empty">Loading real candle history…</div>' : ''}
      ${!st.loadingSeries && !series.length ? '<div class="empty">No candle history for this pair. You can still estimate P&amp;L from the reported move, but a replay needs price ticks.</div>' : ''}
      <div class="wi-preview"><canvas id="wi-mini" width="640" height="200"></canvas></div>
      <div class="tr-act">
        <button class="btn pri" id="wi-play16" ${series.length ? '' : 'disabled'}>▶ REPLAY 16:9</button>
        <button class="btn pri" id="wi-play9" ${series.length ? '' : 'disabled'}>▶ REPLAY 9:16</button>
      </div>
      <div class="tr-msg dim">Replays are clearly stamped ${esc(STAMP)}. Nothing here is written to Rio's book.</div>`;

    const mini = box.querySelector('#wi-mini');
    if (mini && series.length) paintMini(mini, series, entryIdx);

    box.querySelector('#wi-size').addEventListener('click', e => {
      const b = e.target.closest('button[data-sz]'); if (!b) return;
      st.size = +b.dataset.sz; st.customSize = '';
      renderRight();
    });
    const onCustom = e => { st.customSize = e.target.value.trim(); renderRight(); };
    box.querySelector('#wi-custom').addEventListener('change', onCustom);
    box.querySelector('#wi-custom').addEventListener('keydown', e => { if (e.key === 'Enter') onCustom(e); });
    const rng = box.querySelector('#wi-entry');
    const applyEntry = (idx, rerender) => {
      st.entryIdx = Math.max(0, Math.min(Math.max(0, series.length - 2), idx));
      const lab = box.querySelector('#wi-entry-lab');
      const px = series[st.entryIdx] && series[st.entryIdx].price;
      const lastPx = series.length ? series[series.length - 1].price : null;
      const sizeNow = sizeVal();
      const hypPct = isNum(px) && px && isNum(lastPx) ? (lastPx / px - 1) * 100 : 0;
      const hypUsd = sizeNow * hypPct / 100;
      if (lab) lab.textContent = 'tick ' + (st.entryIdx + 1) + ' / ' + series.length + '  @  ' + (isNum(px) ? px.toPrecision(6) : '—');
      const pv = box.querySelector('#wi-pnl-v'), ps = box.querySelector('#wi-pnl-s');
      if (pv) { pv.textContent = usdSigned(hypUsd); pv.className = 'v ' + cls(hypUsd); }
      if (ps) ps.textContent = pct(hypPct, 2) + ' if held to last tick';
      if (rng) rng.value = st.entryIdx;
      if (mini) paintMini(mini, series, st.entryIdx);
      if (rerender) renderRight();
    };
    rng.addEventListener('input', () => applyEntry(+rng.value, false));
    rng.addEventListener('change', () => applyEntry(+rng.value, true));
    const play = ar => startReplay(r, series, st.entryIdx, sizeVal(), ar);
    box.querySelector('#wi-play16').addEventListener('click', () => play('16:9'));
    box.querySelector('#wi-play9').addEventListener('click', () => play('9:16'));
    if (mini && series.length) {
      const idxFromEvent = ev => {
        const rect = mini.getBoundingClientRect();
        const x = ((ev.touches && ev.touches[0] ? ev.touches[0].clientX : ev.clientX) - rect.left) / rect.width;
        return Math.round(Math.max(0, Math.min(1, x)) * Math.max(0, series.length - 2));
      };
      let drag = false;
      mini.style.cursor = 'crosshair';
      mini.addEventListener('pointerdown', ev => { drag = true; try { mini.setPointerCapture(ev.pointerId); } catch (e) {} applyEntry(idxFromEvent(ev), false); ev.preventDefault(); });
      mini.addEventListener('pointermove', ev => { if (drag) applyEntry(idxFromEvent(ev), false); });
      const end = ev => { if (!drag) return; drag = false; applyEntry(idxFromEvent(ev), true); };
      mini.addEventListener('pointerup', end);
      mini.addEventListener('pointercancel', () => { drag = false; });
    }
  }

  function paintMini(cv, series, entryIdx) {
    const g = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#05060a'; g.fillRect(0, 0, W, H);
    const padL = 8, padR = 8, padT = 10, padB = 10;
    const prices = series.map(p => p.price);
    let lo = Math.min(...prices), hi = Math.max(...prices);
    const p = (hi - lo) * 0.1 || lo * 0.05;
    lo -= p; hi += p;
    const xOf = i => padL + (W - padL - padR) * i / Math.max(1, series.length - 1);
    const yOf = v => padT + (H - padT - padB) * (1 - (v - lo) / (hi - lo));
    // entry line
    const ep = series[entryIdx].price;
    g.strokeStyle = 'rgba(255,255,255,0.4)'; g.setLineDash([4, 4]); g.lineWidth = 1;
    g.beginPath(); g.moveTo(xOf(entryIdx), padT); g.lineTo(xOf(entryIdx), H - padB); g.stroke();
    g.beginPath(); g.moveTo(padL, yOf(ep)); g.lineTo(W - padR, yOf(ep)); g.stroke();
    g.setLineDash([]);
    const last = series[series.length - 1].price;
    const up = last >= ep;
    g.strokeStyle = up ? '#34d399' : '#f87171'; g.lineWidth = 1.8;
    g.beginPath();
    series.forEach((pt, i) => i ? g.lineTo(xOf(i), yOf(pt.price)) : g.moveTo(xOf(i), yOf(pt.price)));
    g.stroke();
    // dim the pre-entry path overlay
    g.fillStyle = 'rgba(3,4,7,0.45)';
    g.fillRect(0, 0, xOf(entryIdx), H);
  }

  function startReplay(r, series, entryIdx, size, ar) {
    const slice = series.slice(entryIdx).map((p, i) => ({
      t: p.t, price: p.price, event: i === 0 ? 'ENTRY' : (i === series.slice(entryIdx).length - 1 ? 'EXIT' : null),
    }));
    if (slice.length < 2) return;
    const entry = slice[0].price;
    const exit = slice[slice.length - 1].price;
    const officialPct = (exit / entry - 1) * 100;
    const officialUsd = size * officialPct / 100;
    const model = modelFromWhatIf({
      symbol: r.symbol, name: r.name, address: r.address || r.pair || '',
      usdIn: size, entry, points: slice,
      exitPrice: exit, officialPct, officialUsd,
    });
    openReplay(Object.assign(model, { ar }));
  }

  async function select(r) {
    st.sel = r; st.series = r.series || null; st.entryIdx = 0; st.loadingSeries = !st.series;
    renderTable(); renderRight();
    if (st.series && st.series.length) return;
    st.loadingSeries = true; renderRight();
    try {
      const s = await fetchOhlcv(r);
      if (s && s.length) {
        r.series = s;
        // default entry: earliest tick, or the low of the first third (a "bought the dip" what-if) — keep earliest, user can slide
        st.series = s; st.entryIdx = 0;
      } else {
        st.series = r.series || null;
      }
    } catch (e) {
      st.series = r.series || null;
    } finally {
      st.loadingSeries = false;
      renderRight();
    }
  }

  async function loadMovers() {
    st.loading = true; st.err = '';
    $('#wi-src').textContent = 'loading…';
    let rows = [], notes = [];
    try {
      const gt = await fetchGecko();
      if (gt.length) { rows = rows.concat(gt); notes.push('GeckoTerminal'); }
    } catch (e) { notes.push('GeckoTerminal failed'); }
    try {
      const ds = await fetchDex();
      if (ds.length) { rows = rows.concat(ds); notes.push('DexScreener'); }
    } catch (e) { notes.push('DexScreener failed'); }
    rows = dedupe(rows).filter(r => r.symbol);
    if (!rows.length) {
      rows = SAMPLE.map(s => ({ ...s, series: s.series.slice() }));
      st.err = 'Public APIs were blocked or empty (CORS / rate limit). Showing built-in sample runners so the lab still works.';
      notes = ['SAMPLE FALLBACK'];
    }
    // Keep samples available at the bottom when live data is present, clearly marked, so the lab is never empty of replayable series.
    if (notes[0] !== 'SAMPLE FALLBACK') {
      // don't mix samples into the live list — only as fallback
    }
    st.rows = rows;
    st.source = notes.join(' + ');
    st.loading = false;
    $('#wi-src').textContent = st.source + (st.err ? ' · fallback' : '') + ' · ' + rows.length + ' tokens';
    renderTable();
  }

  $('#wi-filt').addEventListener('click', e => {
    const b = e.target.closest('button[data-f]'); if (!b) return;
    st.filter = +b.dataset.f;
    $('#wi-filt').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    renderTable();
  });
  $('#wi-refresh').addEventListener('click', () => loadMovers());
  const go = async () => {
    const v = $('#wi-addr').value.trim();
    if (!/^0x[0-9a-fA-F]{40}$/.test(v)) { $('#wi-src').textContent = 'Paste a 0x… address (40 hex chars).'; return; }
    $('#wi-src').textContent = 'looking up…';
    const row = await lookupAddress(v);
    if (!row) { $('#wi-src').textContent = 'No Base pair found for that address.'; return; }
    const existing = st.rows.find(x => (x.pair || '').toLowerCase() === (row.pair || '').toLowerCase() || x.id === row.id);
    if (existing) { select(existing); $('#wi-src').textContent = 'loaded ' + existing.symbol; return; }
    st.rows.unshift(row);
    renderTable();
    select(row);
  };
  $('#wi-go').addEventListener('click', go);
  $('#wi-addr').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });

  let loaded = false;
  return {
    update() {},
    reset() {},
    visible(v) { st.shown = v; if (v && !loaded) { loaded = true; loadMovers(); } },
  };
}
