import { loadAll, nextDelay, fileUrl, loadArchive, apiInfo, STALE_MS, SOURCES } from './data.js?v=d681b70b';
import { makeDemo } from './demo.js?v=d681b70b';
import { usd, usdSigned, pct, cls, ts, ago, tm, esc, isNum } from './fmt.js?v=d681b70b';
import { initMap } from './map.js?v=d681b70b';
import { initBoard } from './board.js?v=d681b70b';
import { initCharts } from './charts.js?v=d681b70b';
import { initTrades, initFeed, initRules, initRun1 } from './views.js?v=d681b70b';
import { openTrade, closePanel } from './detail.js?v=d681b70b';
import { initCalendar } from './calendar.js?v=d681b70b';
import { initWhatIf } from './whatif.js?v=d681b70b';

const qs = new URLSearchParams(location.search);
const DEMO = qs.get('demo') === '1';
// ?demo=1&speed=2 -> a new canned run-1 trade arrives every 6 s / speed (min 1 s)
const SPEED = Math.max(0.1, Math.min(20, parseFloat(qs.get('speed')) || 1));
const DEMO_STEP_MS = Math.max(1000, 6000 / SPEED);
const demoState = { n: 1, real: null, timer: null };

export const ctx = {
  d: null, run: null, archive: null, demo: DEMO,
  fileUrl, loadArchive: async () => (ctx.archive ||= await loadArchive()),
  openTrade: (t) => openTrade(t, ctx),
  priceFor: (t) => (t && t.run !== 1 && ctx.d && ctx.d.prices && (ctx.d.prices.trades || []).find(p => p.id === t.id)) || null,
  allTrades: () => {
    const d = ctx.d || {};
    const open = (d.positions && d.positions.positions) || [];
    const closed = (d.trades && d.trades.trades) || [];
    return [...open, ...closed];
  },
  showTab: (t) => showTab(t),
};

const $ = id => document.getElementById(id);
const views = {};
const TABS = ['map', 'board', 'charts', 'trades', 'feed', 'rules', 'run1', 'calendar', 'whatif', 'all'];
let tab = null;

function showTab(t) {
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

// ---------- header ----------
function kpi(l, v, s = '', c = '', big = false) {
  return `<div class="kpi ${big ? 'big' : ''}"><div class="l">${l}</div><div class="v ${c}">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;
}
function renderHeader() {
  const d = ctx.d, s = d.status || {}, m = d.meta || {};
  const start = s.starting_capital_usd ?? m.starting_capital_usd ?? 1000;
  const bt = s.best_trade, wt = s.worst_trade;
  const tlink = t => t ? `<a href="#" data-trade="${t.id}">#${t.id} ${esc(t.symbol)}</a>` : '—';
  const tsub = t => t ? `<span class="${cls(t.pnl_usd)}">${usdSigned(t.pnl_usd)} ${pct(t.pnl_pct)}</span>` : '';
  const xl = fileUrl('journal.xlsx');
  $('kpis').innerHTML = [
    kpi('Equity · ' + (DEMO ? 'DEMO' : ('run ' + (s.run_number ?? m.run_number ?? '?'))), usd(s.equity_usd), 'start ' + usd(start, 0), cls((s.equity_usd ?? start) - start), true),
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
  $('kpis').querySelectorAll('a[data-trade]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = ctx.allTrades().find(x => x.id === +a.dataset.trade); if (t) ctx.openTrade(t);
  }));
}

function renderSrc(now) {
  const d = ctx.d; if (!d) return;
  const m = d.meta || {}, s = d.status || {};
  const key = d.source === SOURCES.LIVE ? 'LIVE' : d.source === SOURCES.SHA ? 'SHA' : d.source === SOURCES.DEMO ? 'DEMO' : 'CACHE';
  const api = apiInfo();
  $('srcline').innerHTML = [
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
  if (DEMO) out.push(`<div class="b-demo">DEMO MODE · canned run-1 trades arriving one every ${(DEMO_STEP_MS / 1000).toFixed(1)} s (trade ${demoState.n}) · synthetic prices · not real data · <a href="${location.pathname}">switch to real data</a></div>`);
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
    const first = !ctx.d;
    if (d.changed || first) {
      const run = (d.meta && d.meta.run_number) ?? (d.status && d.status.run_number);
      const runChanged = ctx.run !== null && run !== ctx.run;
      ctx.d = d; ctx.run = run;
      if (runChanged) Object.values(views).forEach(v => v.reset && v.reset());
      renderHeader();
      for (const v of Object.values(views)) { try { v.update(d, { first, runChanged }); } catch (e) { console.error(e); } }
    } else {
      ctx.d = { ...ctx.d, fetchedAt: d.fetchedAt, error: d.error };
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
  demoState.n = demoState.n >= total ? 1 : demoState.n + 1; // loop back to trade 1 after the last one
  const d = demoData(), runChanged = demoState.n === 1;
  ctx.d = d;
  if (runChanged) Object.values(views).forEach(v => v.reset && v.reset());
  renderHeader();
  for (const v of Object.values(views)) { try { v.update(d, { first: false, runChanged }); } catch (e) { console.error(e); } }
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
views.map = initMap($('v-map'), ctx);
views.board = initBoard($('v-board'), ctx);
views.charts = initCharts($('v-charts'), ctx);
views.trades = initTrades($('v-trades'), ctx);
views.feed = initFeed($('v-feed'), ctx);
views.rules = initRules($('v-rules'), ctx);
views.run1 = initRun1($('v-run1'), ctx);
views.calendar = initCalendar($('v-calendar'), ctx);
views.whatif = initWhatIf($('v-whatif'), ctx);
showTab(location.hash.slice(1) || 'map');
poll();
