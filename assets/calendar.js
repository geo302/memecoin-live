// CALENDAR: black P&L calendar (green / red days) + Day Breakdown + @whatscoinbase Trophy Room flex-card generator.
// Days are bucketed by the ET date of each closed trade's exit_time. Reads ctx data only; never writes anything.
// Trophy cards are drawn on a <canvas> (what you see is exactly what downloads). Spec: CLAUDE_PROMPT.md "CALENDAR".
import { usd, usdSigned, pct, cls, esc, isNum, dur, tm, TZ } from './fmt.js';
import { openTradeReplay } from './replay.js';
import { seedFrom, preloadArtLayer, drawAnimeBackdrop } from './backdrop.js';

const BACKDROPS = [
  { id: 'auto', name: 'Auto · coin' },
  { id: 'win-emerald', name: 'Emerald', src: 'assets/trophy/win-emerald.webp' },
  { id: 'trophy-gold', name: 'Gold', src: 'assets/trophy/trophy-gold.webp' },
  { id: 'galaxy-void', name: 'Void', src: 'assets/trophy/galaxy-void.webp' },
  { id: 'battle-crimson', name: 'Crimson', src: 'assets/trophy/battle-crimson.webp' },
  { id: 'none', name: 'Stars' },
];
const LS = 'whatscoinbase.trophy.v1';
const W = 1200, H = 675;
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const etDay = iso => { const t = typeof iso === 'number' ? iso : Date.parse(iso); return isNaN(t) ? null : dayFmt.format(t); };
const longDay = key => { const [y, m, d] = key.split('-').map(Number); const dt = new Date(Date.UTC(y, m - 1, d, 12)); return dt.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }); };
const shortDay = key => { const [y, m, d] = key.split('-').map(Number); return `${MONTHS[m - 1].toUpperCase()} ${d}, ${y}`; };
const money = v => isNum(v) ? (v < 0 ? '-' : '+') + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
const shortMoney = v => { if (!isNum(v)) return '—'; const a = Math.abs(v), s = v < 0 ? '-' : '+'; return a >= 10000 ? `${s}$${(a / 1000).toFixed(1)}k` : `${s}$${a.toFixed(2)}`; };

function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }

// DEMO only: synthetic history days (clearly labelled) so ?demo=1 shows a full month of green and red days.
function demoHistory(archive, now) {
  const R = rng(2026);
  const syms = ((archive && archive.trades && archive.trades.trades) || []).map(t => t.symbol).filter(Boolean);
  const pool = syms.length ? syms : ['NOVA', 'ORBIT', 'LUNA', 'ASTRO', 'COMET', 'PULSAR', 'QUASAR', 'VEGA'];
  const out = []; let id = 9000;
  for (let back = 26; back >= 1; back--) {
    if (R() < 0.42) continue;
    const day0 = now - back * 86400e3;
    const n = 1 + Math.floor(R() * 5);
    const bias = R() < 0.68 ? 1 : -1;
    for (let i = 0; i < n; i++) {
      const roll = R(); let type, p;
      if (roll < (bias > 0 ? 0.5 : 0.22)) { type = 'TP'; p = 19 + R() * 11; }
      else if (roll < (bias > 0 ? 0.7 : 0.6)) { type = 'STOP'; p = -(9 + R() * 4); }
      else if (roll < 0.85) { type = 'BREAKEVEN'; p = -3 + R() * 4; }
      else { type = 'F6_TIME'; p = -4 + R() * 6; }
      const entry = day0 - 6 * 3600e3 + R() * 12 * 3600e3, hold = 90 + R() * 900;
      const liq = 26000 + R() * 34000, usdIn = Math.min(50, liq * 0.01 / 10);
      out.push({ run: 2, id: id++, status: 'closed', _demo: true, symbol: pool[Math.floor(R() * pool.length)], name: 'DEMO',
        entry_time: new Date(entry).toISOString(), exit_time: new Date(entry + hold * 1000).toISOString(), hold_seconds: hold,
        usd_in: usdIn, usd_out: usdIn * (1 + p / 100), pnl_usd: usdIn * p / 100, pnl_pct: p, result: p > 0 ? 'Win' : 'Loss',
        exit_type: type, exit_reason: `DEMO ${type} exit (synthetic history day)`, entry_score: 14 + R() * 4, entry_m5_pct: 50 + R() * 110,
        liquidity_at_entry: liq, dexscreener_url: null });
    }
  }
  return out;
}

function bucket(trades, base) {
  // trades of ONE run -> Map(dayKey -> day) with start-of-day equity for that run
  const closed = trades.filter(t => t.status !== 'open' && isNum(t.pnl_usd) && etDay(t.exit_time || t.entry_time));
  closed.sort((a, b) => Date.parse(a.exit_time || a.entry_time) - Date.parse(b.exit_time || b.entry_time));
  const days = new Map();
  for (const t of closed) {
    const k = etDay(t.exit_time || t.entry_time);
    let d = days.get(k); if (!d) { d = { key: k, trades: [], pnl: 0, inv: 0, pos: 0, w: 0, l: 0, base: 0 }; days.set(k, d); }
    d.trades.push(t); d.pnl += t.pnl_usd; d.inv += t.usd_in || 0; d.pos += isNum(t.usd_out) ? t.usd_out : (t.usd_in || 0) + t.pnl_usd;
    if (t.pnl_usd > 0) d.w++; else d.l++;
  }
  let eq = base;
  for (const k of [...days.keys()].sort()) { const d = days.get(k); d.base = eq; eq += d.pnl; }
  return days;
}
function merge(a, b) {
  const out = new Map();
  for (const m of [a, b]) for (const [k, d] of m) {
    const o = out.get(k);
    if (!o) out.set(k, { ...d, trades: [...d.trades] });
    else { o.trades.push(...d.trades); o.pnl += d.pnl; o.inv += d.inv; o.pos += d.pos; o.w += d.w; o.l += d.l; o.base += d.base; }
  }
  for (const d of out.values()) d.trades.sort((x, y) => Date.parse(x.exit_time || x.entry_time) - Date.parse(y.exit_time || y.entry_time));
  return out;
}

export function initCalendar(el, ctx) {
  const st = { run: 'r2', month: null, sel: null, card: 'day', bg: 'auto', custom: null, customName: '', sig: '', arch: null, archErr: null, loadingArch: false, tainted: false };
  try { const s = JSON.parse(localStorage.getItem(LS) || '{}'); if (s.bg) st.bg = s.bg; if (s.custom) { st.custom = s.custom; st.customName = s.customName || 'custom'; } } catch (e) { /* ignore */ }
  const save = () => { try { localStorage.setItem(LS, JSON.stringify({ bg: st.bg, custom: st.custom && st.custom.length < 2.5e6 ? st.custom : null, customName: st.customName })); } catch (e) { /* quota */ } };
  const imgCache = {};

  el.innerHTML = `<div class="hdr"><span>CALENDAR · DAILY P&amp;L</span><span class="dim" style="font-weight:400">paper trading · days by exit time (ET)</span><span class="sp"></span>
      <span class="seg" id="cal-run"><button data-run="r2">RUN 2 LIVE</button><button data-run="r1">RUN 1 ARCHIVE</button><button data-run="all">ALL</button></span></div>
    <div class="cal-wrap">
      <div class="cal-left">
        <div class="cal-nav"><button id="cal-prev" aria-label="Previous month">‹</button><div id="cal-title" class="cal-title"></div><button id="cal-next" aria-label="Next month">›</button><button id="cal-today" class="ghost">LATEST</button></div>
        <div id="cal-sum" class="cal-sum"></div>
        <div class="cal-grid" id="cal-grid"></div>
        <div class="cal-legend dim"><span class="sw g"></span>green day <span class="sw r"></span>red day <span class="sw e"></span>no closed trades · % = day P&amp;L ÷ capital deployed that day · acct = ÷ start-of-day equity</div>
      </div>
      <div class="cal-right" id="cal-right"></div>
    </div>`;
  const $ = s => el.querySelector(s);

  function sources() {
    const d = ctx.d || {};
    let r2 = ((d.trades && d.trades.trades) || []).map(t => ({ ...t, run: t.run ?? 2 }));
    if (ctx.demo) r2 = [...demoHistory(st.arch || ctx.archive, Date.now()), ...r2];
    const base2 = (d.status && d.status.starting_capital_usd) ?? (d.meta && d.meta.starting_capital_usd) ?? (d.equity && d.equity.starting_capital_usd) ?? (ctx.demo ? 1000 : 10000);
    const a = st.arch || ctx.archive;
    const r1 = a ? ((a.trades && a.trades.trades) || []).map(t => ({ ...t, run: 1 })) : [];
    const base1 = (a && a.summary && a.summary.starting_active_bankroll_usd) || 100;
    return { r2, base2, r1, base1 };
  }
  function days() {
    const s = sources();
    const d2 = bucket(s.r2, s.base2);
    if (st.run === 'r2') return d2;
    const d1 = bucket(s.r1, s.base1);
    return st.run === 'r1' ? d1 : merge(d2, d1);
  }
  async function ensureArch() {
    if (st.arch || st.loadingArch) return;
    st.loadingArch = true;
    try { st.arch = await ctx.loadArchive(); st.archErr = null; } catch (e) { st.archErr = e.message; }
    st.loadingArch = false; render(true);
  }

  // ---------------- calendar ----------------
  function render(force = false) {
    if ((st.run !== 'r2' || ctx.demo) && !st.arch && !st.loadingArch && !st.archErr) ensureArch();
    const D = days();
    const keys = [...D.keys()].sort();
    const latest = keys[keys.length - 1] || etDay(Date.now());
    if (!st.month) st.month = latest.slice(0, 7);
    if (!st.sel || (!D.has(st.sel) && keys.length && force !== 'keep')) st.sel = D.has(st.sel) ? st.sel : latest;
    el.querySelectorAll('#cal-run button').forEach(b => b.classList.toggle('on', b.dataset.run === st.run));
    const [Y, M] = st.month.split('-').map(Number);
    $('#cal-title').innerHTML = `${MONTHS[M - 1]} ${Y}`;
    // month summary
    const md = keys.filter(k => k.startsWith(st.month)).map(k => D.get(k));
    const mp = md.reduce((a, d) => a + d.pnl, 0), mInv = md.reduce((a, d) => a + d.inv, 0);
    const mBase = md.length ? md[0].base : null;
    const gw = md.filter(d => d.pnl > 0).length, rl = md.filter(d => d.pnl < 0).length;
    const tw = md.reduce((a, d) => a + d.w, 0), tl = md.reduce((a, d) => a + d.l, 0);
    const best = md.slice().sort((a, b) => b.pnl - a.pnl)[0];
    const sumItem = (l, v, c = '', s = '') => `<div class="cs"><div class="l">${l}</div><div class="v ${c}">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;
    $('#cal-sum').innerHTML = [
      sumItem('Month P&L', money(md.length ? mp : null), cls(mp), md.length ? `${pct(mBase ? mp / mBase * 100 : null, 2)} of equity` : 'no closed trades'),
      sumItem('Return on deployed', pct(mInv ? mp / mInv * 100 : null, 2), cls(mp), mInv ? usd(mInv) + ' deployed' : ''),
      sumItem('Green · red days', `<span class="up">${gw}</span> <span class="dim">·</span> <span class="dn">${rl}</span>`, '', `${md.length} trading day${md.length === 1 ? '' : 's'}`),
      sumItem('Win rate', tw + tl ? (tw / (tw + tl) * 100).toFixed(1) + '%' : '—', '', `<span class="up">${tw}W</span> / <span class="dn">${tl}L</span>`),
      sumItem('Best day', best ? money(best.pnl) : '—', best ? cls(best.pnl) : '', best ? shortDay(best.key) : ''),
    ].join('') + (st.run !== 'r2' && !st.arch ? `<div class="cs wide dim">${st.archErr ? 'run 1 archive unavailable: ' + esc(st.archErr) : 'loading run 1 archive…'}</div>` : '')
      + (ctx.demo ? '<div class="cs wide"><span class="tagd">DEMO</span> <span class="dim">earlier days are synthetic sample data</span></div>' : '');
    // grid
    const first = new Date(Date.UTC(Y, M - 1, 1)).getUTCDay();
    const nDays = new Date(Date.UTC(Y, M, 0)).getUTCDate();
    const today = etDay(Date.now());
    let html = DOW.map(d => `<div class="cal-dow">${d}</div>`).join('');
    for (let i = 0; i < first; i++) html += '<div class="cal-cell blank"></div>';
    for (let dn = 1; dn <= nDays; dn++) {
      const k = `${Y}-${String(M).padStart(2, '0')}-${String(dn).padStart(2, '0')}`, d = D.get(k);
      const c = d ? (d.pnl > 0 ? 'g' : d.pnl < 0 ? 'r' : 'z') : 'e';
      const dep = d && d.inv ? d.pnl / d.inv * 100 : null, acct = d && d.base ? d.pnl / d.base * 100 : null;
      html += `<button class="cal-cell ${c}${k === st.sel ? ' sel' : ''}${k === today ? ' today' : ''}" data-day="${k}" ${d ? '' : 'tabindex="-1"'} aria-label="${k}${d ? ' ' + money(d.pnl) : ''}">
        <span class="dn">${dn}</span>
        ${d ? `<span class="pl">${shortMoney(d.pnl)}</span><span class="pp">${pct(dep, 1)}</span><span class="pa">${pct(acct, 2)} acct</span><span class="pill">${d.trades.length} trade${d.trades.length === 1 ? '' : 's'}<b> · ${d.w}W ${d.l}L</b></span>` : ''}
      </button>`;
    }
    $('#cal-grid').innerHTML = html;
    const sig = st.sel + '|' + st.run + '|' + (D.get(st.sel) ? D.get(st.sel).trades.map(t => t.id + ':' + t.pnl_usd).join(',') : '');
    if (force || sig !== st.sig) { st.sig = sig; renderDay(D.get(st.sel) || null, st.sel); }
  }

  // ---------------- day breakdown + trophy room ----------------
  function renderDay(d, key) {
    const R = $('#cal-right');
    if (!d) {
      R.innerHTML = `<div class="glass pad"><div class="empty"><b>${key ? esc(longDay(key)) : 'No day selected'}</b>No closed trades on this day.<br><span class="dim">Pick a green or red day to open its Trophy Room.</span></div></div>`;
      return;
    }
    if (st.card !== 'day' && !d.trades.some(t => cardKey(t) === st.card)) st.card = 'day';
    const dep = d.inv ? d.pnl / d.inv * 100 : null, acct = d.base ? d.pnl / d.base * 100 : null;
    R.innerHTML = `<div class="glass">
      <div class="day-h"><div><div class="day-t">${esc(longDay(key))}</div><div class="dim">${d.trades.length} closed trade${d.trades.length === 1 ? '' : 's'} · ${d.w}W ${d.l}L · ${usd(d.inv)} deployed</div></div>
        <div class="r"><div class="day-p ${cls(d.pnl)}">${money(d.pnl)}</div><div class="${cls(d.pnl)}">${pct(dep, 2)} <span class="dim">deployed</span> · ${pct(acct, 2)} <span class="dim">acct</span></div></div></div>
      <div class="tr-h"><span>🏆 TROPHY ROOM</span><span class="dim">@whatscoinbase flex card</span></div>
      <div class="tr-pick" id="tr-pick">
        <button data-card="day" class="${st.card === 'day' ? 'on' : ''}">DAY CARD</button>
        ${d.trades.map(t => `<button data-card="${cardKey(t)}" class="${st.card === cardKey(t) ? 'on' : ''} ${t.pnl_usd > 0 ? 'w' : 'l'}">${esc(t.symbol || '?')}</button>`).join('')}
      </div>
      <div class="tr-canvas"><canvas id="tr-cv" width="${W}" height="${H}"></canvas></div>
      <div class="tr-bgs" id="tr-bgs">${BACKDROPS.map(b => `<button data-bg="${b.id}" class="${st.bg === b.id ? 'on' : ''}" title="${b.name}">${b.src ? `<img src="${b.src}" alt="" loading="lazy">` : `<span class="ph ${b.id}">${b.id === 'auto' ? 'AUTO' : '✦'}</span>`}<em>${b.name}</em></button>`).join('')}
        <button data-bg="custom" class="${st.bg === 'custom' ? 'on' : ''}" title="Your image" ${st.custom ? '' : 'style="display:none"'}>${st.custom ? `<img src="${esc(st.custom)}" alt="" referrerpolicy="no-referrer">` : ''}<em>Custom</em></button></div>
      <div class="tr-act">
        <label class="btn">⬆ UPLOAD IMAGE<input type="file" id="tr-file" accept="image/*" hidden></label>
        <input type="url" id="tr-url" placeholder="…or paste an image URL" aria-label="Image URL">
        <button class="btn" id="tr-urlgo">USE URL</button>
        <span class="sp"></span>
        <button class="btn" id="tr-replay"${st.card === 'day' ? ' disabled title="Pick a trade card to replay"' : ''}>▶ REPLAY</button>
        <button class="btn pri" id="tr-dl">⬇ DOWNLOAD PNG</button>
      </div>
      <div class="tr-msg dim" id="tr-msg"></div>
      <div class="tr-h"><span>TRADES · ${esc(shortDay(key))}</span><span class="dim">click a symbol for full detail</span></div>
      <div class="tw"><table class="t day-t"><thead><tr><th>Symbol</th><th>Entry → Exit ET</th><th class="r">Hold</th><th class="r">In</th><th class="r">Out</th><th class="r">P&amp;L</th><th class="r">%</th><th>Exit</th><th class="r">Score</th><th class="r">5m</th><th class="r">Liq</th><th></th><th></th><th></th></tr></thead><tbody>
        ${d.trades.map(t => `<tr>
          <td><a href="#" data-open="${cardKey(t)}">${esc(t.symbol || '?')}</a> <span class="dim">#${t.id}${t.run === 1 ? ' r1' : ''}</span></td>
          <td class="nowrap">${tm(t.entry_time)} → ${tm(t.exit_time)}</td>
          <td class="r">${dur(t.hold_seconds)}</td><td class="r">${usd(t.usd_in)}</td><td class="r">${usd(t.usd_out)}</td>
          <td class="r ${cls(t.pnl_usd)}">${usdSigned(t.pnl_usd)}</td><td class="r ${cls(t.pnl_pct)}">${pct(t.pnl_pct, 2)}</td>
          <td title="${esc(t.exit_reason || '')}"><span class="tag ${esc(t.exit_type || 'OTHER')}">${esc(t.exit_type || '—')}</span></td>
          <td class="r">${isNum(t.entry_score) ? t.entry_score.toFixed(2) : '—'}</td><td class="r">${pct(t.entry_m5_pct, 1)}</td>
          <td class="r">${isNum(t.liquidity_at_entry) ? '$' + (t.liquidity_at_entry / 1000).toFixed(1) + 'k' : '—'}</td>
          <td>${t.dexscreener_url ? `<a href="${esc(t.dexscreener_url)}" target="_blank" rel="noopener">DEX ↗</a>` : '<span class="dim">—</span>'}</td>
          <td><button class="btn sm" data-replay="${cardKey(t)}">▶ REPLAY</button></td>
          <td><button class="btn sm" data-card="${cardKey(t)}">🏆 CARD</button></td></tr>
          ${t.exit_reason ? `<tr class="why"><td colspan="14">${esc(t.exit_reason)}</td></tr>` : ''}`).join('')}
      </tbody></table></div>
    </div>`;
    wireDay(d, key);
    drawCard(d, key);
  }
  const cardKey = t => `${t.run}-${t.id}`;

  function wireDay(d, key) {
    const R = $('#cal-right');
    R.querySelectorAll('[data-card]').forEach(b => b.addEventListener('click', () => {
      st.card = b.dataset.card;
      R.querySelectorAll('#tr-pick button').forEach(x => x.classList.toggle('on', x.dataset.card === st.card));
      drawCard(d, key);
      if (b.closest('table')) R.querySelector('.tr-canvas').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
    R.querySelectorAll('a[data-open]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault(); const t = d.trades.find(x => cardKey(x) === a.dataset.open); if (t) ctx.openTrade(t);
    }));
    R.querySelectorAll('#tr-bgs button').forEach(b => b.addEventListener('click', () => {
      st.bg = b.dataset.bg; save();
      R.querySelectorAll('#tr-bgs button').forEach(x => x.classList.toggle('on', x === b));
      drawCard(d, key);
    }));
    R.querySelector('#tr-file').addEventListener('change', e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => { setCustom(rd.result, f.name, d, key); };
      rd.readAsDataURL(f);
    });
    const go = () => { const u = R.querySelector('#tr-url').value.trim(); if (/^https?:\/\//i.test(u) || /^data:image\//i.test(u)) setCustom(u, u, d, key); else msg('Paste a full image link starting with https://'); };
    R.querySelector('#tr-urlgo').addEventListener('click', go);
    R.querySelector('#tr-url').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    R.querySelector('#tr-dl').addEventListener('click', () => download(d, key));
    const replayOf = key => {
      const t = d.trades.find(x => cardKey(x) === key);
      if (t) openTradeReplay(t, ctx);
    };
    R.querySelectorAll('[data-replay]').forEach(b => b.addEventListener('click', ev => {
      ev.stopPropagation();
      replayOf(b.dataset.replay);
    }));
    const rb = R.querySelector('#tr-replay');
    if (rb) rb.addEventListener('click', () => { if (st.card && st.card !== 'day') replayOf(st.card); });
  }
  function msg(t, bad = false) { const m = $('#tr-msg'); if (m) { m.textContent = t; m.classList.toggle('dn', bad); } }
  function setCustom(src, name, d, key) {
    st.custom = src; st.customName = name; st.bg = 'custom'; delete imgCache.custom; save();
    renderDay(d, key); msg('Custom image applied ✓');
  }

  // image loading with graceful CORS fallback: direct (CORS) -> images.weserv.nl proxy (CORS) -> display-only (no download)
  function loadImg(src, cors) {
    return new Promise((res, rej) => {
      const im = new Image();
      if (cors) im.crossOrigin = 'anonymous';
      im.referrerPolicy = 'no-referrer';
      im.onload = () => res(im); im.onerror = () => rej(new Error('load failed'));
      im.src = src;
    });
  }
  async function getBg(id) {
    if (imgCache[id]) return imgCache[id];
    let p;
    if (id === 'custom') {
      const src = st.custom; if (!src) return null;
      if (src.startsWith('data:')) p = loadImg(src, false).then(im => ({ im, tainted: false }));
      else p = loadImg(src, true).then(im => ({ im, tainted: false }))
        .catch(() => loadImg('https://images.weserv.nl/?url=' + encodeURIComponent(src.replace(/^https?:\/\//, '')) + '&output=png', true).then(im => ({ im, tainted: false })))
        .catch(() => loadImg(src, false).then(im => ({ im, tainted: true })));
    } else {
      const b = BACKDROPS.find(x => x.id === id); if (!b || !b.src) return null;
      p = loadImg(b.src, false).then(im => ({ im, tainted: false }));
    }
    imgCache[id] = p.catch(e => { delete imgCache[id]; throw e; });
    return imgCache[id];
  }

  function cardData(d, key) {
    if (st.card === 'day') {
      const dep = d.inv ? d.pnl / d.inv * 100 : null, acct = d.base ? d.pnl / d.base * 100 : null;
      return { kind: 'day', title: shortDay(key), sub: `DAY TROPHY · ${d.trades.length} TRADE${d.trades.length === 1 ? '' : 'S'}`, pnl: d.pnl,
        rows: [['PNL', pct(dep, 2), cls(dep)], ['Account', pct(acct, 2), cls(acct)], ['Invested', usd(d.inv)], ['Position', usd(d.pos)], ['Record', `${d.w}W · ${d.l}L`]],
        foot: longDay(key), slug: key, win: d.pnl > 0, demo: d.trades.some(t => t._demo),
        symbol: (d.trades[0] && d.trades[0].symbol) || key, address: 'DAY-' + key };
    }
    const t = d.trades.find(x => cardKey(x) === st.card) || d.trades[0];
    return { kind: 'trade', title: String(t.symbol || '?').toUpperCase(), sub: `TRADE #${t.id}${t.run === 1 ? ' · RUN 1' : ''} · ${t.exit_type || 'EXIT'} · ${dur(t.hold_seconds)}`, pnl: t.pnl_usd,
      rows: [['PNL', pct(t.pnl_pct, 2), cls(t.pnl_pct)], ['Invested', usd(t.usd_in)], ['Position', usd(t.usd_out)]],
      foot: `${shortDay(key)} · ${tm(t.entry_time)} → ${tm(t.exit_time)} ET`, slug: String(t.symbol || 'trade').toLowerCase().replace(/[^a-z0-9]+/g, '') || 'trade', win: t.pnl_usd > 0, demo: !!t._demo,
      symbol: t.symbol, address: t.address || '' };
  }
  let drawSeq = 0;
  async function drawCard(d, key) {
    const cv = $('#tr-cv'); if (!cv) return;
    const seq = ++drawSeq;
    const c = cardData(d, key);
    let id = st.bg;
    let bg = null, artIm = null;
    if (id === 'auto') {
      // Per-coin (or per-day) procedural anime galaxy, optionally blended with one of the 4 webps.
      try { artIm = await preloadArtLayer(seedFrom(c.symbol, c.address)); } catch (e) { artIm = null; }
    } else {
      try { bg = await getBg(id); } catch (e) { if (id === 'custom') msg('Could not load that image. Try another link, or save it and use Upload.', true); }
    }
    if (seq !== drawSeq) return;
    st.tainted = !!(bg && bg.tainted);
    if (st.tainted) msg('Image shown, but that site blocks downloads. Save the picture to your device and use Upload to download this card.', true);
    paint(cv.getContext('2d'), c, bg && bg.im, { auto: id === 'auto', artIm });
  }

  function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function paint(g, c, im, opt = {}) {
    const SANS = 'Inter, "SF Pro Display", "Segoe UI", system-ui, -apple-system, sans-serif';
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
    g.fillStyle = '#030407'; g.fillRect(0, 0, W, H);
    if (opt.auto) {
      // Unique, stable per-coin (or per-day) anime galaxy; optional webp art as a right-side layer.
      drawAnimeBackdrop(g, W, H, seedFrom(c.symbol, c.address), { artIm: opt.artIm || null, artAlpha: 0.38 });
    } else if (im) { // cover-fit, anchored right (art keeps the character on the right)
      const s = Math.max(W / im.width, H / im.height), iw = im.width * s, ih = im.height * s;
      g.drawImage(im, W - iw, (H - ih) / 2, iw, ih);
      const lg0 = g.createLinearGradient(0, 0, W * 0.72, 0);
      lg0.addColorStop(0, 'rgba(3,4,7,.9)'); lg0.addColorStop(0.55, 'rgba(3,4,7,.55)'); lg0.addColorStop(1, 'rgba(3,4,7,0)');
      g.fillStyle = lg0; g.fillRect(0, 0, W, H);
      const vg0 = g.createLinearGradient(0, H * 0.6, 0, H); vg0.addColorStop(0, 'rgba(0,0,0,0)'); vg0.addColorStop(1, 'rgba(0,0,0,.55)');
      g.fillStyle = vg0; g.fillRect(0, 0, W, H);
    } else { // procedural starfield (Stars preset)
      const R = rng(11); const ng = g.createRadialGradient(W * 0.75, H * 0.4, 0, W * 0.75, H * 0.4, W * 0.6);
      ng.addColorStop(0, 'rgba(180,190,220,.22)'); ng.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ng; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 420; i++) { g.globalAlpha = 0.2 + R() * 0.8; g.fillStyle = '#fff'; const z = R() < 0.08 ? 2 : 1; g.fillRect(R() * W, R() * H, z, z); }
      g.globalAlpha = 1; g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1.5;
      for (let k = 1; k < 6; k++) { g.beginPath(); g.ellipse(W * 0.76, H * 0.5, 70 * k, 26 * k, -0.25, 0, Math.PI * 2); g.stroke(); }
      const lg = g.createLinearGradient(0, 0, W * 0.72, 0);
      lg.addColorStop(0, 'rgba(3,4,7,.9)'); lg.addColorStop(0.55, 'rgba(3,4,7,.55)'); lg.addColorStop(1, 'rgba(3,4,7,0)');
      g.fillStyle = lg; g.fillRect(0, 0, W, H);
      const vg = g.createLinearGradient(0, H * 0.6, 0, H); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)');
      g.fillStyle = vg; g.fillRect(0, 0, W, H);
    }
    const X = 64;
    // logo: orbit mark
    g.save(); g.translate(X + 22, 70);
    g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 2.5; g.beginPath(); g.ellipse(0, 0, 24, 9, -0.45, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#fff'; g.shadowColor = '#fff'; g.shadowBlur = 14; g.beginPath(); g.arc(0, 0, 7, 0, 7); g.fill(); g.restore();
    g.fillStyle = 'rgba(244,246,251,.7)'; g.font = `600 17px ${SANS}`; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillText('RIO  ·  WHATSCOINBASE', X + 62, 71);
    // title + subtitle
    g.textBaseline = 'alphabetic';
    let fs = 64; g.font = `800 ${fs}px ${SANS}`;
    while (g.measureText(c.title).width > 620 && fs > 34) { fs -= 2; g.font = `800 ${fs}px ${SANS}`; }
    g.fillStyle = '#fff'; g.shadowColor = 'rgba(0,0,0,.6)'; g.shadowBlur = 10; g.fillText(c.title, X, 178); g.shadowBlur = 0;
    g.fillStyle = 'rgba(203,213,225,.75)'; g.font = `600 17px ${SANS}`; g.fillText(c.sub, X + 2, 210);
    // big PnL banner
    const txt = money(c.pnl);
    g.font = `800 84px ${SANS}`;
    const bw = Math.max(340, g.measureText(txt).width + 64), by = 236, bh = 112;
    const col = c.pnl > 0 ? ['#34d399', '#16a34a'] : c.pnl < 0 ? ['#f87171', '#dc2626'] : ['#e2e8f0', '#94a3b8'];
    const bgd = g.createLinearGradient(X, by, X + bw, by + bh); bgd.addColorStop(0, col[0]); bgd.addColorStop(1, col[1]);
    g.shadowColor = col[0]; g.shadowBlur = 36; rrect(g, X, by, bw, bh, 10); g.fillStyle = bgd; g.fill(); g.shadowBlur = 0;
    g.fillStyle = '#05060a'; g.textBaseline = 'middle'; g.fillText(txt, X + 32, by + bh / 2 + 4);
    // stat rows
    g.textBaseline = 'alphabetic';
    const many = c.rows.length > 3, rfs = many ? 25 : 28, colX = X + 250;
    let y = by + bh + (many ? 46 : 62);
    for (const [l, v, k] of c.rows) {
      g.font = `500 ${rfs}px ${SANS}`; g.fillStyle = 'rgba(244,246,251,.86)'; g.fillText(l, X, y);
      g.font = `700 ${rfs}px ${SANS}`; g.fillStyle = k === 'up' ? '#34d399' : k === 'dn' ? '#f87171' : '#f4f6fb'; g.fillText(v, colX, y);
      y += many ? 34 : 46;
    }
    // tag: avatar + @whatscoinbase
    const ay = H - 70, ax = X + 30;
    g.save();
    const ag = g.createLinearGradient(ax - 30, ay - 30, ax + 30, ay + 30); ag.addColorStop(0, '#1e293b'); ag.addColorStop(1, '#020305');
    g.beginPath(); g.arc(ax, ay, 30, 0, 7); g.fillStyle = ag; g.fill();
    g.strokeStyle = c.pnl >= 0 ? 'rgba(52,211,153,.9)' : 'rgba(248,113,113,.9)'; g.lineWidth = 2.5; g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(ax, ay, 22, 8, -0.5, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#fff'; g.font = `800 19px ${SANS}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('WC', ax, ay + 1);
    g.restore();
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillStyle = '#fff'; g.font = `800 28px ${SANS}`; g.fillText('@whatscoinbase', ax + 46, ay + 4);
    g.fillStyle = 'rgba(203,213,225,.6)'; g.font = `600 14px ${SANS}`; g.fillText('WHATSCOINBASE  ·  PAPER TRADING' + (c.demo ? '  ·  DEMO DATA' : ''), ax + 48, ay + 28);
    g.textAlign = 'right'; g.fillStyle = 'rgba(203,213,225,.55)'; g.font = `500 14px ${SANS}`; g.fillText(c.foot, W - 36, H - 30);
    g.textAlign = 'left';
    // hairline frame
    g.strokeStyle = 'rgba(255,255,255,.1)'; g.lineWidth = 2; rrect(g, 1, 1, W - 2, H - 2, 18); g.stroke();
  }
  function download(d, key) {
    const cv = $('#tr-cv'); if (!cv) return;
    const c = cardData(d, key);
    const name = `whatscoinbase-${c.slug}-pnl.png`;
    try {
      cv.toBlob(b => {
        if (!b) { msg('Download failed, try again.', true); return; }
        const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name;
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        msg('Saved ' + name + ' ✓');
      }, 'image/png');
    } catch (e) {
      msg('That image\'s site blocks downloads. Save the picture to your device and use Upload instead.', true);
    }
  }

  // ---------------- wiring ----------------
  el.querySelector('#cal-run').addEventListener('click', e => {
    const b = e.target.closest('button[data-run]'); if (!b) return;
    st.run = b.dataset.run; st.month = null; st.sel = null; st.card = 'day'; render(true);
  });
  const shift = n => { let [y, m] = st.month.split('-').map(Number); m += n; if (m < 1) { m = 12; y--; } if (m > 12) { m = 1; y++; } st.month = `${y}-${String(m).padStart(2, '0')}`; render('keep'); };
  $('#cal-prev').addEventListener('click', () => shift(-1));
  $('#cal-next').addEventListener('click', () => shift(1));
  $('#cal-today').addEventListener('click', () => { st.month = null; st.sel = null; st.card = 'day'; render(true); });
  $('#cal-grid').addEventListener('click', e => {
    const b = e.target.closest('.cal-cell[data-day]'); if (!b) return;
    st.sel = b.dataset.day; st.card = 'day';
    render('keep');
    if (matchMedia('(max-width:1100px)').matches) $('#cal-right').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  let shown = false;
  return {
    update() { if (shown) render(); },
    reset() { st.month = null; st.sel = null; st.sig = ''; },
    visible(v) { if (v) { shown = true; render(); } },
  };
}
