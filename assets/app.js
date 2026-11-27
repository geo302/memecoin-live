import { loadAll, nextDelay, fileUrl, loadArchive, apiInfo, STALE_MS, SOURCES } from './data.js?v=b27rio2';
import { makeDemo } from './demo.js?v=b27rio2';
import { usd, usdSigned, pct, cls, ts, ago, tm, esc, isNum } from './fmt.js?v=b27rio2';
import { initMap } from './map.js?v=b27rio2';
import { initBoard } from './board.js?v=b27rio2';
import { initCharts } from './charts.js?v=b27rio2';
import { initTrades, initFeed, initRules, initRio2 } from './views.js?v=b27rio2';
import { openTrade, closePanel } from './detail.js?v=b27rio2';
import { initCalendar } from './calendar.js?v=b27rio2';
import { initWhatIf } from './whatif.js?v=b27rio2';

const qs = new URLSearchParams(location.search);
const DEMO = qs.get('demo') === '1';
const SPEED = Math.max(0.1, Math.min(20, parseFloat(qs.get('speed')) || 1));
const DEMO_STEP_MS = Math.max(1000, 6000 / SPEED);
const demoState = { n: 1, real: null, timer: null };

function readBook() {
  const q = new URLSearchParams(location.search).get('book');
  if (q === 'rio2' || q === 'rio1') return q;
  try { const s = localStorage.getItem('rioBook'); if (s === 'rio2' || s === 'rio1') return s; } catch (e) {}
  return 'rio1';
}

export const ctx = {
  d: null, raw: null, run: null, archive: null, demo: DEMO, book: readBook(),
  fileUrl, loadArchive: async () => (ctx.archive ||= await loadArchive()),
  openTrade: (t) => openTrade(t, ctx),
  priceFor: (t) => (t && ctx.d && ctx.d.prices && (ctx.d.prices.trades || []).find(p => p.id === t.id)) || null,
  allTrades: () => {
    const d = ctx.d || {};
    const open = (d.positions && d.positions.positions) || [];
    const closed = (d.trades && d.trades.trades) || [];
    return [...open, ...closed].map(t => ({ ...t, book: t.book || ctx.book || 'rio1' }));
  },
  bookTrades: (book) => {
    const raw = ctx.raw || {};
    if (book === 'rio2') {
      const r = raw.rio2 || {};
      return [...(r.positions || []), ...(r.trades || [])].map(t => ({ ...t, book: 'rio2' }));
    }
    const open = (raw.positions && raw.positions.positions) || [];
    const closed = (raw.trades && raw.trades.trades) || [];
    return [...open, ...closed].map(t => ({ ...t, book: 'rio1' }));
  },
  setBook: (b) => setBook(b),
  showTab: (t) => showTab(t),
};

const $ = id => document.getElementById(id);
const views = {};
const TABS = ['map', 'board', 'charts', 'trades', 'feed', 'rules', 'rio2', 'calendar', 'whatif', 'all'];
let tab = null;

function showTab(t) {
  if (t === 'run1') t = 'rio2';
  if (!TABS.includes(t)) t = 'map';
  tab = t;
  document.body.classList.toggle('all', t === 'all');
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('on', t === 'all' || v.dataset.view === t));
  if (location.hash !== '#' + t) history.replaceState(null, '', location.search + '#' + t);
  for (const [k, v] of Object.entries(views)) v.visible && v.visible(t === 'all' || t === k);
}

document.getElementById('tabs').addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if (b) showTab(b.dataset.tab); });
window.addEventListener('hashchange', () => showTab(location.hash.slice(1)));
document.addEventListener('keydown', e => {
  if (e.target.matches('input,select,textarea') || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Escape') closePanel();
  if (e.key === '0') showTab('all');
  const n = +e.key; if (n >= 1 && n <= 9) showTab(TABS[n - 1]);
});
$('panel-x').addEventListener('click', closePanel);
const booksw = $('booksw');
if (booksw) booksw.addEventListener('click', e => {
  const b = e.target.closest('button[data-book]'); if (b) setBook(b.dataset.book);
});

function viewForBook(raw, book) {
  if (!raw) return raw;
  if (book !== 'rio2') {
    return {
      ...raw,
      _book: 'rio1',
      meta: { ...(raw.meta || {}), book_label: (raw.meta && raw.meta.book_label) || 'Rio 1', book_id: 'rio1', display_run_name: 'Rio 1' },
      status: { ...(raw.status || {}), book_label: (raw.status && raw.status.book_label) || 'Rio 1', book_id: 'rio1', display_run_name: 'Rio 1' },
    };
  }
  const r = raw.rio2 || {};
  const start = r.starting_capital_usd ?? 10000;
  const status = {
    paper_trading: true,
    book_label: 'Rio 2',
    book_id: 'rio2',
    display_run_name: 'Rio 2 (No 25s Wait)',
    run_number: r.run_number,
    run_start: r.run_start,
    starting_capital_usd: start,
    equity_usd: r.equity_usd ?? start,
    cash_usd: r.cash_usd ?? start,
    open_positions_value_usd: r.open_positions_value_usd ?? 0,
    total_pnl_usd: r.total_pnl_usd ?? 0,
    total_return_pct: r.total_return_pct ?? 0,
    realized_pnl_usd: r.realized_pnl_usd ?? 0,
    unrealized_pnl_usd: r.unrealized_pnl_usd ?? 0,
    closed_trades: r.closed_trades ?? (r.trades || []).length,
    open_trades: r.open_trades ?? (r.positions || []).length,
    wins: r.wins ?? 0,
    losses: r.losses ?? 0,
    win_rate_pct: r.win_rate_pct,
    avg_win_pct: r.avg_win_pct,
    avg_loss_pct: r.avg_loss_pct,
    best_trade: r.best_trade,
    worst_trade: r.worst_trade,
    exit_type_breakdown: r.exit_type_breakdown || {},
    halted: r.halted,
    halt_reason: r.halt_reason,
    halt_equity_usd: r.halt_equity_usd,
    exit_trial: r.exit_trial,
    watcher_last_update: r.watcher_last_update,
    price_fetch_ok: r.price_fetch_ok,
    scanner_last_round: raw.status && raw.status.scanner_last_round,
    scanner_rounds_last_10min: raw.status && raw.status.scanner_rounds_last_10min,
    scanner_last_round_seconds: raw.status && raw.status.scanner_last_round_seconds,
    last_update: r.last_update,
  };
  return {
    ...raw,
    _book: 'rio2',
    status,
    meta: { ...(raw.meta || {}), book_label: 'Rio 2', book_id: 'rio2', display_run_name: 'Rio 2 (No 25s Wait)', starting_capital_usd: start },
    positions: { run: r.run_number, count: (r.positions || []).length, positions: r.positions || [] },
    trades: { run: r.run_number, count: (r.trades || []).length, trades: r.trades || [] },
    equity: r.equity || { starting_capital_usd: start, points: [], realized_steps: [] },
    prices: r.prices || { trades: [] },
    feed: { updated: r.last_update, count: (r.feed || []).length, lines: r.feed || [] },
    rules: r.rules || raw.rules,
    rio2: raw.rio2,
  };
}

function applyBook(raw, opts = {}) {
  ctx.raw = raw;
  ctx.d = viewForBook(raw, ctx.book);
  document.body.dataset.book = ctx.book;
  renderSwitcher();
  renderHeader();
  for (const v of Object.values(views)) {
    try { v.update(ctx.d, opts); } catch (e) { console.error(e); }
  }
}

function setBook(book) {
  if (book !== 'rio1' && book !== 'rio2') book = 'rio1';
  const changed = ctx.book !== book;
  ctx.book = book;
  try { localStorage.setItem('rioBook', book); } catch (e) {}
  const usp = new URLSearchParams(location.search);
  if (book === 'rio2') usp.set('book', 'rio2'); else usp.delete('book');
  // keep demo/speed if present
  const q = usp.toString();
  history.replaceState(null, '', (q ? '?' + q : '') + (location.hash || ''));
  document.body.dataset.book = book;
  renderSwitcher();
  if (ctx.raw) applyBook(ctx.raw, { first: false, bookChanged: changed, runChanged: false });
  renderSrc(Date.now()); renderBanners(Date.now());
}

function renderSwitcher() {
  document.querySelectorAll('#booksw button').forEach(b => b.classList.toggle('on', b.dataset.book === ctx.book));
}

// ---------- header ----------
function kpi(l, v, s = '', c = '', big = false, attrs = '') {
  const hasClass = /\bclass=/.test(attrs);
  const clsName = hasClass ? '' : `kpi${big ? ' big' : ''}`;
  const attr = hasClass ? attrs : (`class="${clsName}"` + (attrs ? ' ' + attrs : ''));
  return `<div ${attr}><div class="l">${l}</div><div class="v ${c}">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;
}
function renderHeader() {
  const d = ctx.d, s = d.status || {}, m = d.meta || {}, raw = ctx.raw || d;
  const start = s.starting_capital_usd ?? m.starting_capital_usd ?? 10000;
  const bt = s.best_trade, wt = s.worst_trade;
  const tlink = t => t ? `<a href="#" data-trade="${t.id}">#${t.id} ${esc(t.symbol)}</a>` : '—';
  const tsub = t => t ? `<span class="${cls(t.pnl_usd)}">${usdSigned(t.pnl_usd)} ${pct(t.pnl_pct)}</span>` : '';
  const xl = fileUrl('journal.xlsx');
  const r1s = raw.status || {};
  const r2s = raw.rio2 || r1s.rio2_summary || {};
  const r1eq = r1s.equity_usd, r1start = r1s.starting_capital_usd ?? 10000;
  const r2eq = r2s.equity_usd ?? 10000, r2start = r2s.starting_capital_usd ?? 10000;
  const active = ctx.book === 'rio2' ? 'rio2' : 'rio1';
  $('kpis').innerHTML = [
    kpi('Equity · Rio 1', usd(r1eq), 'start ' + usd(r1start, 0) + (active === 'rio1' ? ' · active' : ' · click to view'), cls((r1eq ?? r1start) - r1start), true,
      `data-book="rio1" class="kpi big${active === 'rio1' ? ' on' : ''}"`),
    kpi('Rio 2 · no 25s wait', usd(r2eq), `${r2s.closed_trades ?? 0} closed · ${r2s.open_trades ?? 0} open` + (isNum(r2s.win_rate_pct) ? ` · ${r2s.win_rate_pct.toFixed(1)}%` : '') + (active === 'rio2' ? ' · active' : ' · click to view'), cls((r2eq ?? r2start) - r2start), true,
      `data-book="rio2" class="kpi big${active === 'rio2' ? ' on' : ''}"`),
    kpi('Total P&L', usdSigned(s.total_pnl_usd), pct(s.total_return_pct, 2), cls(s.total_pnl_usd), true),
    kpi('Cash', usd(s.cash_usd), 'open value ' + usd(s.open_positions_value_usd)),
    kpi('Realized · unreal.', usdSigned(s.realized_pnl_usd), 'unrealized ' + usdSigned(s.unrealized_pnl_usd), cls(s.realized_pnl_usd)),
    kpi('Win rate', isNum(s.win_rate_pct) ? s.win_rate_pct.toFixed(1) + '%' : '—', `<span class="up">${s.wins ?? 0}W</span> / <span class="dn">${s.losses ?? 0}L</span>`),
    kpi('Closed · open', `${s.closed_trades ?? 0} · <span class="yel">${s.open_trades ?? 0}</span>`, 'avg W ' + pct(s.avg_win_pct) + ' · L ' + pct(s.avg_loss_pct)),
    kpi('Best trade', tlink(bt), tsub(bt)),
    kpi('Worst trade', tlink(wt), tsub(wt)),
    kpi('Scanner', `${s.scanner_rounds_last_10min ?? '—'} <span class="dim">/10m</span>`, 'last <span data-ago="' + esc(s.scanner_last_round || '') + '"></span>'),
    kpi('Halt level', usd(s.halt_equity_usd, 0), s.halted ? '<span class="dn">HALTED</span>' : 'running', s.halted ? 'dn' : ''),
    kpi('Journal · vault', `<span class="links"><a class="xl" href="${esc(xl)}" download>⬇ EXCEL</a><a class="xl" href="${esc(fileUrl('vault.zip'))}" download title="Obsidian vault">⬇ VAULT</a></span>`, 'journal.xlsx · vault.zip'),
  ].join('');
  // kpi() already embeds class in attrs for switcher cards; strip duplicate class from wrapper if both set
  $('kpis').querySelectorAll('a[data-trade]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = ctx.allTrades().find(x => x.id === +a.dataset.trade); if (t) ctx.openTrade(t);
  }));
  $('kpis').querySelectorAll('[data-book]').forEach(el => el.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    setBook(el.dataset.book);
  }));
}

function renderSrc(now) {
  const d = ctx.d; if (!d) return;
  const m = d.meta || {}, s = d.status || {};
  const key = d.source === SOURCES.LIVE ? 'LIVE' : d.source === SOURCES.SHA ? 'SHA' : d.source === SOURCES.DEMO ? 'DEMO' : 'CACHE';
  const api = apiInfo();
  const book = ctx.book === 'rio2' ? 'RIO 2' : 'RIO 1';
  $('srcline').innerHTML = [
    `<span>BOOK <b class="yel">${book}</b></span>`,
    `<span>SOURCE <span class="src ${key}">${esc(d.source)}</span></span>`,
    `<span>SHA <b class="yel">${d.sha ? d.sha.slice(0, 7) : '—'}</b></span>`,
    `<span>data built <b data-ago="${esc(m.last_update || '')}"></b> (${tm(m.last_update)} ET)</span>`,
    `<span>watcher <span data-ago="${esc(s.watcher_last_update || '')}"></span>${s.price_fetch_ok === false ? ' <span class="dn">PRICE FETCH FAIL</span>' : ''}</span>`,
    `<span>fetched <span data-ago="${d.fetchedAt}"></span></span>`,
    api.remaining !== null ? `<span>API left ${api.remaining}</span>` : '',
    `<span>next poll <span id="nextpoll"></span></span>`,
  ].join('');
  tickAgo(now);
}

function renderBanners(now) {
  const d = ctx.d; if (!d) return;
  const m = d.meta || {}, s = d.status || {};
  const out = [];
  if (DEMO) out.push(`<div class="b-demo">DEMO MODE · canned demo trades arriving one every ${(DEMO_STEP_MS / 1000).toFixed(1)} s (trade ${demoState.n}) · synthetic prices · not real data · <a href="${location.pathname}">switch to real data</a></div>`);
  if (s.halted) out.push(`<div class="b-halt">■ HALTED · ${esc(s.halt_reason || 'equity at or below halt level')} · no new entries</div>`);
  const thr = STALE_MS[d.source] ?? 360e3;
  const mt = ts(m.last_update), wt = ts(s.watcher_last_update);
  const stale = [];
  if (mt !== null && now - mt > thr) stale.push(`data built ${ago(mt, now)} (limit ${thr / 60e3} min on ${d.source})`);
  if (!DEMO && wt !== null && now - wt > 120e3) stale.push(`position watcher last ran ${ago(wt, now)}`);
  if (stale.length) out.push(`<div class="b-stale">⚠ STALE DATA · ${stale.join(' · ')}</div>`);
  if (d.error && !DEMO) out.push(`<div class="b-err">fetch note: ${esc(d.error)}</div>`);
  const html = out.join('');
  if ($('banners').innerHTML !== html) $('banners').innerHTML = html;
}

function tickAgo(now) {
  document.querySelectorAll('[data-ago]').forEach(el => {
    const v = el.dataset.ago; if (!v) { el.textContent = '—'; return; }
    el.textContent = ago(/^\d+$/.test(v) ? +v : v, now);
  });
  const np = $('nextpoll'); if (np) np.textContent = nextAt ? Math.max(0, Math.round((nextAt - now) / 1000)) + 's' : '…';
}

// ---------- polling ----------
let timer = null, nextAt = 0, busy = false;
async function poll() {
  if (busy) return; busy = true;
  clearTimeout(timer);
  try {
    let d = await loadAll();
    if (DEMO) { demoState.real = d; await ctx.loadArchive(); d = demoData(); }
    const first = !ctx.raw;
    if (d.changed || first) {
      const run = (d.meta && d.meta.run_number) ?? (d.status && d.status.run_number);
      const runChanged = ctx.run !== null && run !== ctx.run;
      ctx.run = run;
      if (runChanged) Object.values(views).forEach(v => v.reset && v.reset());
      applyBook(d, { first, runChanged });
    } else if (ctx.raw) {
      ctx.raw = { ...ctx.raw, fetchedAt: d.fetchedAt, error: d.error };
      if (ctx.d) ctx.d = { ...ctx.d, fetchedAt: d.fetchedAt, error: d.error };
    }
    renderSrc(Date.now()); renderBanners(Date.now());
  } catch (e) {
    console.error(e);
    if (!ctx.d) $('banners').innerHTML = `<div class="b-stale">Could not load data from any source: ${esc(e.message)}. Retrying…</div>`;
  } finally {
    busy = false;
    const delay = nextDelay();
    nextAt = Date.now() + delay;
    timer = setTimeout(poll, delay);
  }
}
function demoData() {
  const d = demoState.real;
  return { ...makeDemo(d, ctx.archive, demoState.n), source: SOURCES.DEMO, sha: d.sha, fetchedAt: Date.now(), changed: true, error: null };
}
function demoStep() {
  if (!demoState.real || !ctx.archive) return;
  const total = (ctx.archive.trades.trades || []).length;
  demoState.n = demoState.n >= total ? 1 : demoState.n + 1;
  const d = demoData(), runChanged = demoState.n === 1;
  if (runChanged) Object.values(views).forEach(v => v.reset && v.reset());
  applyBook(d, { first: false, runChanged });
  renderSrc(Date.now()); renderBanners(Date.now());
}
if (DEMO) demoState.timer = setInterval(demoStep, DEMO_STEP_MS);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && ctx.d && Date.now() - (ctx.d.fetchedAt || 0) > 75e3) poll();
});

setInterval(() => {
  const now = Date.now();
  $('clock').textContent = tm(now);
  tickAgo(now);
  if (ctx.d) { renderBanners(now); for (const v of Object.values(views)) v.tick && v.tick(now); }
}, 1000);

// ---------- boot ----------
document.body.dataset.book = ctx.book;
renderSwitcher();
views.map = initMap($('v-map'), ctx);
views.board = initBoard($('v-board'), ctx);
views.charts = initCharts($('v-charts'), ctx);
views.trades = initTrades($('v-trades'), ctx);
views.feed = initFeed($('v-feed'), ctx);
views.rules = initRules($('v-rules'), ctx);
views.rio2 = initRio2($('v-rio2'), ctx);
views.calendar = initCalendar($('v-calendar'), ctx);
views.whatif = initWhatIf($('v-whatif'), ctx);
showTab(location.hash.slice(1) || 'map');
poll();
