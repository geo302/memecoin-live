// TRADES (+ exit-type breakdown), FEED, RULES and RIO 2 (no 25s wait) views.
import { price, priceFull, usd, usdSigned, pct, cls, esc, ts, tm, dt, dur, isNum, num, big, md } from './fmt.js?v=b27rio2';
import { makeTable, toCSV, download } from './table.js?v=b27rio2';
import { f7tag } from './board.js?v=b27rio2';
import { loadExtra } from './data.js?v=b27rio2';

const EXIT_ORDER = ['TP', 'BREAKEVEN', 'F6_TIME', 'STOP', 'LIQUIDITY', 'TRAIL', 'DISCRETIONARY', 'RESET', 'OTHER'];
const EXIT_COL = { TP: '#22c55e', BREAKEVEN: '#f4f6fb', F6_TIME: '#9aa3b5', STOP: '#ef4444', LIQUIDITY: '#a5b4fc', TRAIL: '#8b5cf6', DISCRETIONARY: '#6b7590', RESET: '#444c5e', OTHER: '#333' };
const EXIT_LABEL = { TP: 'TP +20% full sell', BREAKEVEN: 'breakeven (armed at +10%)', F6_TIME: 'F6 8-min time stop', STOP: '-10% stop' };

const checksSq = checks => !checks ? '<span class="dim">—</span>' : ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', ...(checks.F7 ? ['F7'] : [])].map(f => {
  const c = checks[f]; return `<span class="sq ${!c ? 'n' : c.pass ? 'p' : 'f'}" title="${f} ${c ? esc((c.pass ? 'PASS ' : 'FAIL ') + (c.detail || '')) : 'n/a'}"></span>`;
}).join('');

export function tradeColumns() {
  return [
    { k: 'id', label: '#', r: 1, f: r => `<span class="dot ${r.pnl_usd > 0 ? 'win' : 'loss'}"></span>${r.id}`, csv: r => r.id },
    { k: 'symbol', label: 'SYMBOL', f: r => `<b>${esc(r.symbol)}</b>`, csv: r => r.symbol },
    { k: 'entry_time', label: 'ENTRY ET', v: r => ts(r.entry_time), f: r => dt(r.entry_time), csv: r => dt(r.entry_time) },
    { k: 'exit_time', label: 'EXIT ET', v: r => ts(r.exit_time), f: r => tm(r.exit_time), csv: r => dt(r.exit_time) },
    { k: 'entry_price', label: 'ENTRY PX', r: 1, f: r => price(r.entry_price), title: r => priceFull(r.entry_price), csv: r => priceFull(r.entry_price) },
    { k: 'exit_price', label: 'EXIT PX', r: 1, f: r => price(r.exit_price), title: r => priceFull(r.exit_price), csv: r => priceFull(r.exit_price) },
    { k: 'usd_in', label: '$ IN', r: 1, f: r => usd(r.usd_in), csv: r => r.usd_in },
    { k: 'usd_out', label: '$ OUT', r: 1, f: r => usd(r.usd_out), csv: r => r.usd_out },
    { k: 'pnl_usd', label: 'P&L $', r: 1, f: r => `<span class="${cls(r.pnl_usd)}">${usdSigned(r.pnl_usd, r.run === 1 ? 3 : 2)}</span>`, csv: r => r.pnl_usd },
    { k: 'pnl_pct', label: 'P&L %', r: 1, f: r => `<span class="${cls(r.pnl_pct)}">${pct(r.pnl_pct)}</span>`, csv: r => r.pnl_pct },
    { k: 'hold_seconds', label: 'HOLD', r: 1, f: r => dur(r.hold_seconds), csv: r => r.hold_seconds },
    { k: 'exit_type', label: 'EXIT', f: r => `<span class="tag ${esc(r.exit_type)}">${esc(r.exit_type || '—')}</span>`, csv: r => r.exit_type },
    { k: 'exit_gap_vs_trigger_pct', label: 'GAP vs TRIG', r: 1, f: r => `<span class="${cls(r.exit_gap_vs_trigger_pct)}">${pct(r.exit_gap_vs_trigger_pct)}</span>`, csv: r => r.exit_gap_vs_trigger_pct },
    { k: 'entry_score', label: 'SCORE', r: 1, f: r => num(r.entry_score, 1), csv: r => r.entry_score },
    { k: 'liquidity_at_entry', label: 'LIQ', r: 1, f: r => big(r.liquidity_at_entry), csv: r => r.liquidity_at_entry },
    { k: 'checks', label: 'CHECKS', v: r => r.checks ? Object.values(r.checks).filter(c => c && c.pass).length : -1, f: r => checksSq(r.checks), csv: r => r.checks ? Object.entries(r.checks).map(([k, c]) => k + (c && c.pass ? ':P' : ':F')).join(' ') : '' },
    { k: 'f7_status', label: 'F7', f: r => f7tag(r.f7_status, r.f7_text), csv: r => r.f7_status, tip: 'F7 contract safety at entry' },
    { k: 'smart_wallet_count', label: 'SW', r: 1, f: r => isNum(r.smart_wallet_count) ? String(r.smart_wallet_count) : '<span class="dim">—</span>', csv: r => r.smart_wallet_count, tip: 'smart wallets (log only)' },
    { k: 'mistake', label: 'MISTAKE', f: r => `<span class="dim">${esc((r.mistake || '').slice(0, 50))}${(r.mistake || '').length > 50 ? '…' : ''}</span>`, title: r => r.mistake, csv: r => r.mistake },
    { k: 'lesson', label: 'LESSON', f: r => `<span class="dim">${esc((r.lesson || '').slice(0, 50))}${(r.lesson || '').length > 50 ? '…' : ''}</span>`, title: r => r.lesson, csv: r => r.lesson },
  ];
}
export function expandTrade(r) {
  const chk = r.checks ? Object.entries(r.checks).map(([k, c]) => `<div class="chk ${c && c.pass ? 'p' : 'f'}"><b>${k}</b><span>${esc(c && c.detail || '')}</span></div>`).join('') : '';
  return `<div><span class="k">exit reason:</span> ${esc(r.exit_reason || '—')}</div>
    ${r.thesis ? `<div style="margin-top:4px"><span class="k">thesis:</span> ${esc(r.thesis)}</div>` : ''}
    <div style="margin-top:4px" class="dn"><span class="k">mistake:</span> ${esc(r.mistake || '—')}</div>
    <div style="margin-top:4px" class="cyan"><span class="k">lesson:</span> ${esc(r.lesson || '—')}</div>
    ${chk ? `<div style="margin-top:4px">${chk}</div>` : ''}
    ${r.f7_status ? `<div style="margin-top:4px"><span class="k">F7:</span> ${f7tag(r.f7_status, r.f7_text)} <span class="dim">${esc(r.f7_text || '')}</span>${(r.f7_reasons || []).length ? `<div class="dn">reasons: ${r.f7_reasons.map(esc).join(' · ')}</div>` : ''}</div>` : ''}
    ${isNum(r.smart_wallet_count) ? `<div style="margin-top:4px"><span class="k">smart wallets:</span> ${r.smart_wallet_count} <span class="dim">(log only, never gates a trade)</span></div>` : ''}
    <div style="margin-top:4px">${r.dexscreener_url ? `<a href="${esc(r.dexscreener_url)}" target="_blank" rel="noopener">DexScreener ↗</a> · ` : ''}<a href="#" data-open="${r.run || 2}:${r.id}">full detail ›</a></div>`;
}

export function computeBreakdown(trades) {
  const out = {};
  for (const t of trades || []) {
    const k = t.exit_type || 'OTHER';
    const b = out[k] ||= { count: 0, wins: 0, pnl_usd: 0, _p: [], _g: [] };
    b.count++; if ((t.pnl_usd || 0) > 0) b.wins++; b.pnl_usd += t.pnl_usd || 0;
    if (isNum(t.pnl_pct)) b._p.push(t.pnl_pct); if (isNum(t.exit_gap_vs_trigger_pct)) b._g.push(t.exit_gap_vs_trigger_pct);
  }
  for (const b of Object.values(out)) {
    b.avg_pnl_pct = b._p.length ? b._p.reduce((a, c) => a + c, 0) / b._p.length : null;
    b.avg_gap_vs_trigger_pct = b._g.length ? b._g.reduce((a, c) => a + c, 0) / b._g.length : null;
    delete b._p; delete b._g;
  }
  return out;
}

function bdTable(b, title) {
  const keys = Object.keys(b || {}).sort((x, y) => (EXIT_ORDER.indexOf(x) + 99) % 99 - (EXIT_ORDER.indexOf(y) + 99) % 99);
  if (!keys.length) return `<div class="empty">${title}: no closed trades yet</div>`;
  const tot = keys.reduce((a, k) => a + (b[k].count || 0), 0);
  return `<table class="t"><thead><tr><th>${title}</th><th class="r">COUNT</th><th class="r">SHARE</th><th class="r">WIN %</th><th class="r">TOTAL P&L</th><th class="r">AVG P&L %</th><th class="r">AVG $</th><th class="r">AVG GAP</th></tr></thead><tbody>${keys.map(k => {
    const x = b[k], wr = isNum(x.wins) && x.count ? x.wins / x.count * 100 : null;
    return `<tr><td><span class="tag ${k}">${k}</span> <span class="dim">${EXIT_LABEL[k] || ''}</span></td><td class="r">${x.count ?? '—'}</td><td class="r">${tot ? (x.count / tot * 100).toFixed(0) + '%' : '—'}</td><td class="r">${isNum(wr) ? wr.toFixed(0) + '%' : '—'}</td><td class="r ${cls(x.pnl_usd)}">${usdSigned(x.pnl_usd, 2)}</td><td class="r ${cls(x.avg_pnl_pct)}">${pct(x.avg_pnl_pct)}</td><td class="r ${cls(x.pnl_usd)}">${x.count ? usdSigned(x.pnl_usd / x.count, 3) : '—'}</td><td class="r ${cls(x.avg_gap_vs_trigger_pct)}">${pct(x.avg_gap_vs_trigger_pct)}</td></tr>`;
  }).join('')}</tbody></table>`;
}
function donut(node, b, prev) {
  if (!window.echarts) return prev;
  const c = prev || echarts.init(node);
  const data = Object.entries(b || {}).map(([k, v]) => ({ name: k, value: v.count, itemStyle: { color: EXIT_COL[k] || '#555' } }));
  c.setOption({ animation: false, backgroundColor: 'transparent', tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [{ type: 'pie', showEmptyCircle: false, radius: ['48%', '75%'], data, label: { color: '#d7dde8', fontSize: 10, formatter: '{b}\n{c}' }, itemStyle: { borderColor: '#000', borderWidth: 2 } }],
    graphic: data.length ? [] : [{ type: 'text', left: 'center', top: 'middle', style: { text: 'no exits yet', fill: '#7d8799', font: '12px monospace' } }] }, { notMerge: true });
  return c;
}

function tradeFilters(prefix) {
  return `<div class="filters">
    <label>result <select id="${prefix}-res"><option value="">all</option><option>Win</option><option>Loss</option></select></label>
    <label>exit <select id="${prefix}-ex"><option value="">all</option></select></label>
    <label>symbol <input type="search" id="${prefix}-q" placeholder="symbol"></label>
    <span class="cnt" id="${prefix}-n"></span><span style="flex:1"></span>
    <button class="chip" id="${prefix}-csv">⬇ CSV</button></div>`;
}
function wireTradeTable(root, prefix, tableEl, getRows, ctx, fileName) {
  const F = { res: '', ex: '', q: '' };
  const cols = tradeColumns();
  const T = makeTable(tableEl, { columns: cols, sort: 'id', desc: true, key: r => `${r.run || 2}:${r.id}`, expand: expandTrade, empty: 'No closed trades yet.' });
  const $ = s => root.querySelector(s);
  const filtered = () => getRows().filter(r => (!F.res || (F.res === 'Win' ? r.pnl_usd > 0 : !(r.pnl_usd > 0))) && (!F.ex || r.exit_type === F.ex) && (!F.q || (r.symbol || '').toLowerCase().includes(F.q.toLowerCase())));
  function render() {
    const all = getRows();
    const exs = [...new Set(all.map(r => r.exit_type).filter(Boolean))];
    const sel = $(`#${prefix}-ex`); const cur = sel.value;
    const html = '<option value="">all</option>' + exs.map(e => `<option>${esc(e)}</option>`).join('');
    if (sel.innerHTML !== html) { sel.innerHTML = html; sel.value = exs.includes(cur) ? cur : ''; }
    const rows = filtered();
    T.update(rows, false);
    $(`#${prefix}-n`).textContent = `${rows.length}/${all.length} trades`;
  }
  $(`#${prefix}-res`).addEventListener('change', e => { F.res = e.target.value; render(); });
  $(`#${prefix}-ex`).addEventListener('change', e => { F.ex = e.target.value; render(); });
  $(`#${prefix}-q`).addEventListener('input', e => { F.q = e.target.value.trim(); render(); });
  $(`#${prefix}-csv`).addEventListener('click', () => download(fileName(), toCSV(cols, T.rows().filter(r => filtered().includes(r)))));
  tableEl.addEventListener('click', e => {
    const a = e.target.closest('a[data-open]'); if (!a) return; e.preventDefault();
    const [run, id] = a.dataset.open.split(':').map(Number);
    const r = getRows().find(x => (x.run || 2) === run && x.id === id); if (r) ctx.openTrade(r);
  });
  return render;
}

// ---------------- TRADES ----------------
export function initTrades(el, ctx) {
  el.innerHTML = `<div class="hdr">CLOSED TRADES · <span id="t-run-lab">RIO 1</span><span class="sp"></span><span class="dim">click a row to expand · PAPER / SIMULATED</span></div>
    ${tradeFilters('t')}<div id="t-table"></div>
    <div class="hdr blue">EXIT-TYPE BREAKDOWN · EXIT TRIAL <span id="t-trial" style="font-weight:400"></span></div>
    <div class="bd"><div><div id="t-bd2"></div><div class="hdr sub" id="t-cmp-lab">OTHER BOOK</div><div id="t-bd1"><div class="empty">waiting for the other book…</div></div></div>
    <div><div class="donut" id="t-donut"></div><div class="pad dim" id="t-gap"></div></div></div>
    <div class="hdr">NEAR MISSES · failed exactly one check · never traded · hypothetical outcomes <span class="sp"></span><span id="nm-sum" style="font-weight:400"></span></div>
    <div id="nm-stats"></div>
    <div class="filters"><label>failed check <select id="nm-chk"><option value="">all</option></select></label><span class="cnt" id="nm-n"></span></div>
    <div id="nm-items"></div>
    <div class="hdr">SMART WALLETS · LOG ONLY · never used to block or allow a trade<span class="sp"></span><span id="sw-sum" style="font-weight:400"></span></div>
    <div id="sw"><div class="empty">opens with this tab…</div></div>`;
  const $ = s => el.querySelector(s);
  let dn = null;
  const rows = () => ((ctx.d && ctx.d.trades && ctx.d.trades.trades) || []).map(t => ({ ...t, run: t.run ?? 2 }));
  const render = wireTradeTable(el, 't', $('#t-table'), rows, ctx, () => `${ctx.book === 'rio2' ? 'rio2' : 'rio1'}-trades.csv`);
  let nmFilter = '';
  const nmStatsT = makeTable($('#nm-stats'), { key: r => r.check, sort: 'count', desc: true, empty: 'No near misses recorded yet.', columns: [
    { k: 'check', label: 'CHECK', f: r => `<b>${esc(r.check)}</b> <span class="dim">${esc(r.name || '')}</span>` },
    { k: 'count', label: 'COUNT', r: 1 }, { k: 'tracking', label: 'TRACKING', r: 1 }, { k: 'done', label: 'DONE', r: 1 },
    { k: 'hyp_win_rate_pct', label: 'HYP WIN %', r: 1, f: r => `${isNum(r.hyp_win_rate_pct) ? r.hyp_win_rate_pct.toFixed(0) + '%' : '—'} <span class="dim">${r.hyp_wins ?? 0}W</span>` },
    { k: 'tp_before_sl_rate_pct', label: 'TP BEFORE SL', r: 1, f: r => `${isNum(r.tp_before_sl_rate_pct) ? r.tp_before_sl_rate_pct.toFixed(0) + '%' : '—'} <span class="dim">${r.tp_before_sl ?? 0}</span>` },
    { k: 'avg_hyp_pnl_pct', label: 'AVG HYP P&L', r: 1, f: r => `<span class="${cls(r.avg_hyp_pnl_pct)}">${pct(r.avg_hyp_pnl_pct)}</span>` },
    { k: 'avg_max_gain_pct', label: 'AVG MAX GAIN', r: 1, f: r => `<span class="up">${pct(r.avg_max_gain_pct, 0)}</span>` },
    { k: 'avg_max_drawdown_pct', label: 'AVG MAX DD', r: 1, f: r => `<span class="dn">${pct(r.avg_max_drawdown_pct)}</span>` },
    { k: 'avg_chg_30m_pct', label: 'AVG 30M', r: 1, f: r => `<span class="${cls(r.avg_chg_30m_pct)}">${pct(r.avg_chg_30m_pct, 0)}</span>` },
  ] });
  const nmT = makeTable($('#nm-items'), { key: r => r.id, sort: 'detected_at', desc: true, empty: 'No near misses for this filter.',
    expand: r => `<div><span class="k">failed:</span> ${esc(r.failed_check_name || r.failed_check)} · ${esc(r.failed_detail || '')}</div>
      ${r.f7 ? `<div style="margin-top:4px"><span class="k">F7:</span> ${f7tag(r.f7.status, r.f7.text)} <span class="dim">${esc(r.f7.text || '')}</span></div>` : ''}
      ${r.checks ? `<div style="margin-top:4px">${Object.entries(r.checks).map(([k, c]) => `<div class="chk ${c && c.pass ? 'p' : 'f'}"><b>${esc(k)}</b><span>${esc(c && c.detail || '')}</span></div>`).join('')}</div>` : ''}
      <div style="margin-top:4px" class="dim">HYPOTHETICAL only: entry = detection price +1%, live exit rules simulated on ~15 s polls. Never traded.${r.dexscreener_url ? ` · <a href="${esc(r.dexscreener_url)}" target="_blank" rel="noopener">DexScreener ↗</a>` : ''}</div>`,
    columns: [
      { k: 'id', label: 'ID', f: r => `<span class="nm">◆</span> ${esc(r.id)}` },
      { k: 'symbol', label: 'SYMBOL', f: r => `<b>${esc(r.symbol)}</b>`, title: r => r.name },
      { k: 'detected_at', label: 'DETECTED ET', v: r => ts(r.detected_at), f: r => dt(r.detected_at) },
      { k: 'failed_check', label: 'FAILED', f: r => `<span class="tag STOP">${esc(r.failed_check)}</span>`, title: r => r.failed_detail },
      { k: 'margin', label: 'MISSED BY', r: 1, v: r => r.margin && r.margin.diff_pct, f: r => r.margin && isNum(r.margin.diff_pct) ? pct(r.margin.diff_pct) : '<span class="dim">—</span>', title: r => r.margin ? `value ${r.margin.value} vs threshold ${r.margin.threshold}` : '' },
      { k: 'status', label: 'STATUS', v: r => r.tracking && r.tracking.status, f: r => r.tracking && r.tracking.status === 'tracking' ? '<span class="yel">tracking</span>' : `<span class="dim">${esc(r.tracking && r.tracking.status || '—')}</span>` },
      { k: 'outcome', label: 'HYP OUTCOME', v: r => r.tracking && r.tracking.hypothetical_outcome, f: r => { const o = r.tracking && r.tracking.hypothetical_outcome; return o ? `<span class="${o === 'WIN' ? 'up' : 'dn'}">${o}</span>` : '<span class="dim">—</span>'; } },
      { k: 'sim', label: 'SIM EXIT', v: r => r.tracking && r.tracking.sim && r.tracking.sim.exit, f: r => { const x = r.tracking && r.tracking.sim; return x ? `<span class="tag ${esc(x.exit)}">${esc(x.exit)}</span> <span class="${cls(x.pnl_pct)}">${pct(x.pnl_pct)}</span>` : '<span class="dim">—</span>'; } },
      { k: 'max_gain', label: 'MAX GAIN', r: 1, v: r => r.tracking && r.tracking.max_gain_pct, f: r => `<span class="up">${pct(r.tracking && r.tracking.max_gain_pct, 0)}</span>` },
      { k: 'max_dd', label: 'MAX DD', r: 1, v: r => r.tracking && r.tracking.max_drawdown_pct, f: r => `<span class="dn">${pct(r.tracking && r.tracking.max_drawdown_pct)}</span>` },
      { k: 'chg30', label: '30M', r: 1, v: r => r.tracking && r.tracking.chg_30m_pct, f: r => { const v = r.tracking && r.tracking.chg_30m_pct; return `<span class="${cls(v)}">${pct(v, 0)}</span>`; } },
      { k: 'smart_wallet_count', label: 'SW', r: 1, f: r => isNum(r.smart_wallet_count) ? String(r.smart_wallet_count) : '<span class="dim">—</span>' },
    ] });
  function renderNM() {
    const nm = (ctx.d && ctx.d.near_misses) || {};
    const items = nm.items || [], sum = nm.summary || {};
    $('#nm-sum').textContent = `${sum.total ?? items.length} total · ${sum.tracking ?? 0} tracking · ${sum.done ?? 0} done`;
    nmStatsT.update(nm.stats_by_failed_check || [], false);
    const chks = [...new Set(items.map(i => i.failed_check).filter(Boolean))].sort();
    const sel = $('#nm-chk'), html = '<option value="">all</option>' + chks.map(c => `<option>${esc(c)}</option>`).join('');
    if (sel.innerHTML !== html) { sel.innerHTML = html; sel.value = chks.includes(nmFilter) ? nmFilter : ''; }
    const shown = items.filter(i => !nmFilter || i.failed_check === nmFilter);
    nmT.update(shown, false);
    $('#nm-n').textContent = `${shown.length}/${items.length}`;
  }
  $('#nm-chk').addEventListener('change', e => { nmFilter = e.target.value; renderNM(); });
  let swBusy = false;
  async function renderSW() {
    const s = (ctx.d && ctx.d.status) || {};
    $('#sw-sum').textContent = `${s.smart_wallets_known_good ?? '—'} known-good · ${s.smart_wallets_coins_tracked ?? '—'} coins tracked`;
    if (swBusy || ctx.demo && !ctx.d) return; swBusy = true;
    try {
      const w = await loadExtra('smart_wallets');
      const st = w.stats || {}, top = (w.wallets_top || []).slice(0, 15), flags = (w.flags || []).slice(-8).reverse();
      const short = a => a ? a.slice(0, 6) + '…' + a.slice(-4) : '';
      $('#sw').innerHTML = `<div class="cards">${[['coins tracked', st.coins_tracked], ['wallets scored', st.wallets_scored], ['with hits', st.wallets_with_hits], ['known good', st.known_good], ['flags', st.flags]].map(([l, v]) => `<div class="card"><div class="amb" style="font-size:10px">${l}</div><div class="big">${v ?? '—'}</div></div>`).join('')}</div>
        <div class="pad dim">${esc((w.params && (w.params.hit_rule || '')) || 'hit = coin later traded >= +50% above the wallet buy')} · ${esc((w.params && w.params.known_good_rule) || 'known-good = >= 2 hits and >= 40% hit rate')}</div>
        <div class="bd"><div class="tw"><table class="t"><thead><tr><th>TOP WALLET</th><th class="r">COINS</th><th class="r">HITS</th><th class="r">HIT RATE</th><th>KNOWN GOOD</th><th>LAST BUY ET</th></tr></thead><tbody>${top.map(x => `<tr><td title="${esc(x.wallet)}">${esc(short(x.wallet))}</td><td class="r">${x.n_coins ?? '—'}</td><td class="r">${x.hits ?? '—'}</td><td class="r">${isNum(x.hit_rate) ? (x.hit_rate * 100).toFixed(0) + '%' : '—'}</td><td>${x.known_good ? '<span class="up">yes</span>' : '<span class="dim">no</span>'}</td><td>${dt(x.last_buy)}</td></tr>`).join('')}</tbody></table></div>
        <div class="tw"><table class="t"><thead><tr><th>RECENT FLAG ET</th><th>COIN</th><th class="r">WALLETS</th></tr></thead><tbody>${flags.map(f => `<tr><td>${dt(f.t)}</td><td title="${esc((f.why || []).join(' · '))}"><b>${esc(f.symbol)}</b></td><td class="r">${(f.wallets || []).length}</td></tr>`).join('') || '<tr><td colspan="3" class="dim">no flags yet</td></tr>'}</tbody></table></div></div>`;
    } catch (e) { $('#sw').innerHTML = `<div class="empty">smart_wallets.json unavailable (${esc(e.message)})</div>`; }
    finally { swBusy = false; }
  }
  function otherCmp(d) {
    const raw = ctx.raw || d || {};
    const otherIs2 = ctx.book !== 'rio2';
    const r = otherIs2 ? (raw.rio2 || {}) : {
      trades: (raw.trades && raw.trades.trades) || [],
      equity_usd: raw.status && raw.status.equity_usd,
      exit_type_breakdown: raw.status && raw.status.exit_type_breakdown,
    };
    const label = otherIs2 ? 'RIO 2' : 'RIO 1';
    const lab = $('#t-cmp-lab');
    if (lab) lab.textContent = `${label} COMPARISON` + (otherIs2 ? ' (same rules, no 25s F8 wait)' : ' (25s F8 recheck)');
    const trades = r.trades || [];
    const b = (r.exit_type_breakdown && Object.keys(r.exit_type_breakdown).length) ? r.exit_type_breakdown : computeBreakdown(trades);
    if (!trades.length && !Object.keys(b).length) {
      $('#t-bd1').innerHTML = `<div class="empty">${label} has no closed trades yet · equity ${usd(r.equity_usd ?? 10000, 2)}</div>`;
      return;
    }
    $('#t-bd1').innerHTML = bdTable(b, label);
  }
  let vis = false;
  return {
    update(d) {
      render();
      $('#t-run-lab').textContent = ctx.demo ? 'DEMO' : ((d.meta && (d.meta.book_label || d.meta.display_run_name)) || 'RIO 1');
      const s = d.status || {};
      let b = s.exit_type_breakdown && Object.keys(s.exit_type_breakdown).length ? s.exit_type_breakdown : computeBreakdown(rows());
      $('#t-bd2').innerHTML = bdTable(b, ctx.demo ? 'DEMO' : ((d.meta && (d.meta.book_label || d.meta.display_run_name)) || 'RIO 1'));
      otherCmp(d);
      $('#t-trial').textContent = s.exit_trial ? `${s.exit_trial.id || ''} · ${s.exit_trial.note || ''}` : '';
      renderNM(); if (vis) renderSW();
      $('#t-gap').innerHTML = `avg stop gap (STOP/BREAKEVEN prints below trigger): <b class="${cls(s.avg_stop_gap_pct)}">${pct(s.avg_stop_gap_pct)}</b>`;
      if (vis) dn = donut($('#t-donut'), b, dn); else this._b = b;
    },
    visible(v) {
      vis = v;
      if (v) { renderSW(); otherCmp(ctx.d); requestAnimationFrame(() => { dn = donut($('#t-donut'), this._b || computeBreakdown(rows()), dn); dn && dn.resize(); }); }
    },
  };
}

// ---------------- FEED ----------------
export function initFeed(el, ctx) {
  el.innerHTML = `<div class="toolbar"><b>LIVE LOG</b> <span class="chips" id="fd-chips"></span><span style="flex:1"></span>
    <label style="display:flex;gap:4px;align-items:center;font-weight:700"><input type="checkbox" id="fd-auto" checked> auto-scroll</label><span id="fd-n"></span>
    <a class="chip" id="fd-vault" href="#" download title="Obsidian vault: one note per trade, coin, rule, near miss">⬇ vault.zip</a></div>
    <div class="feed" id="fd"></div>`;
  const $ = s => el.querySelector(s);
  const off = new Set(); let lines = [];
  const isLoss = l => l.type === 'EXIT' && (/P&L\s*-|-\$|\bLoss\b|\(-\d/.test(l.text));
  function render() {
    const types = [...new Set(lines.map(l => l.type || 'RAW'))].sort();
    $('#fd-chips').innerHTML = types.map(t => `<button data-t="${esc(t)}" class="${off.has(t) ? '' : 'on'}">${esc(t)} ${lines.filter(l => (l.type || 'RAW') === t).length}</button>`).join('');
    const shown = lines.filter(l => !off.has(l.type || 'RAW')).slice().reverse();
    const box = $('#fd'), keep = box.scrollTop;
    box.innerHTML = shown.length ? shown.map(l => `<div class="fl ${esc(l.type || 'RAW')} ${isLoss(l) ? 'loss' : ''}"><span class="ft">${tm(l.t)}</span> <b>${esc(l.type || '')}</b> ${esc(l.text || '')}</div>`).join('') : '<div class="empty">No log lines.</div>';
    box.scrollTop = $('#fd-auto').checked ? 0 : keep;
    $('#fd-n').textContent = `${shown.length} lines`;
  }
  $('#fd-chips').addEventListener('click', e => { const b = e.target.closest('button[data-t]'); if (!b) return; const t = b.dataset.t; off.has(t) ? off.delete(t) : off.add(t); render(); });
  return { update(d) { lines = (d.feed && d.feed.lines) || []; $('#fd-vault').href = ctx.fileUrl('vault.zip'); render(); } };
}

// ---------------- RULES ----------------
export function initRules(el, ctx) {
  return {
    update(d) {
      const r = d.rules;
      if (!r) { el.innerHTML = '<div class="empty"><b>rules.json not available</b></div>'; return; }
      const x = r.exits || {}, f = r.extra_entry_filters || {}, s = r.sizing || {}, h = r.halt || {}, tr = r.exit_trial || {};
      const card = (t, body) => `<div class="card"><h4>${t}</h4>${body}</div>`;
      const row = (k, v) => `<div><span class="amb">${k}</span> ${v}</div>`;
      el.innerHTML = `<div class="hdr">ENTRY GATES · ALL MUST PASS (F6 is the 8-min exit rule)</div>
        <div class="cards">${(r.entry_gates || []).map(g => card(`<span class="tag" style="background:#f4f6fb">${esc(g.id)}</span> ${esc(g.rule || '')}`,
          Object.entries(g).filter(([k]) => !['id', 'rule'].includes(k)).map(([k, v]) => row(k, esc(typeof v === 'number' ? v.toLocaleString() : v))).join(''))).join('')}</div>
        <div class="hdr red">EXITS · ${esc(tr.id || '')}</div>
        <div class="cards">
          ${card('Take profit', `<div class="big up">+${x.take_profit_pct ?? '—'}%</div>${esc(x.take_profit_note || '')}`)}
          ${card('Stop loss', `<div class="big dn">${x.stop_loss_pct ?? '—'}%</div>liquidity exit: ${esc(x.liquidity_exit || '—')}`)}
          ${card('Breakeven', `<div class="big yel">arm +${x.breakeven_arm_pct ?? '—'}% → stop +${x.breakeven_stop_pct ?? '—'}%</div>${esc(x.breakeven_note || '')}`)}
          ${card('F6 time stop', `<div class="big">${x.f6_minutes ?? '—'} min</div>must touch +${x.f6_min_peak_pct ?? '—'}% or sell at market`)}
        </div>
        <div class="hdr">FILTERS · SIZING · HALT · TRIAL</div>
        <div class="cards">
          ${card('Extra entry filters', Object.entries(f).map(([k, v]) => row(k, esc(v))).join(''))}
          ${card('Sizing', Object.entries(s).map(([k, v]) => row(k, esc(v ?? '—'))).join(''))}
          ${card('Halt', row('halt equity', usd(h.halt_equity_usd, 0)) + `<div class="dim">${esc(h.note || '')}</div>`)}
          ${card('Exit trial', row('id', esc(tr.id || '—')) + row('start', dt(tr.start) + ' ET') + `<div class="dim">${esc(tr.note || '')}</div>`)}
          ${r.near_misses ? card('Near misses (never traded)', Object.entries(r.near_misses).map(([k, v]) => row(k, esc(typeof v === 'object' && v !== null ? JSON.stringify(v) : v))).join('')) : ''}
          ${r.smart_wallets ? card('Smart wallets (log only)', Object.entries(r.smart_wallets).map(([k, v]) => row(k, esc(typeof v === 'object' && v !== null ? JSON.stringify(v) : v))).join('')) : ''}
        </div>
        <div class="hdr">LIVE RULES (as written by the bot)</div>
        <ol class="rules">${(r.live_rules_text || []).map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        ${r.assumptions ? `<div class="hdr">ASSUMPTIONS</div><div class="pad">${Array.isArray(r.assumptions) ? `<ul>${r.assumptions.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : `<pre class="txt">${esc(typeof r.assumptions === 'string' ? r.assumptions : JSON.stringify(r.assumptions, null, 2))}</pre>`}</div>` : ''}
        <div class="pad dim">${esc(r.source_note || '')} · updated ${dt(r.updated)} ET</div>`;
    },
  };
}

// ---------------- COMPARE (Rio 1 vs Rio 2 head-to-head) ----------------
export function initRio2(el, ctx) {
  let dn1 = null, dn2 = null;
  const $ = s => el.querySelector(s);
  const card = (l, v, c = '') => `<div class="card"><div class="amb" style="font-size:10px">${l}</div><div class="big ${c}">${v}</div></div>`;
  function render(d) {
    const raw = ctx.raw || d || {};
    const s1 = raw.status || {};
    const r2 = raw.rio2 || {};
    const a = {
      label: 'RIO 1', start: s1.starting_capital_usd ?? 10000,
      equity: s1.equity_usd, pnl: s1.total_pnl_usd, cash: s1.cash_usd,
      closed: s1.closed_trades ?? 0, open: s1.open_trades ?? 0,
      wins: s1.wins ?? 0, losses: s1.losses ?? 0, wr: s1.win_rate_pct,
      best: s1.best_trade, worst: s1.worst_trade,
      brk: s1.exit_type_breakdown || {},
      trades: (raw.trades && raw.trades.trades) || [],
      positions: (raw.positions && raw.positions.positions) || [],
      note: '25s F8 recheck + 10% spike cap',
    };
    const b = {
      label: 'RIO 2', start: r2.starting_capital_usd ?? 10000,
      equity: r2.equity_usd, pnl: r2.total_pnl_usd, cash: r2.cash_usd,
      closed: r2.closed_trades ?? 0, open: r2.open_trades ?? 0,
      wins: r2.wins ?? 0, losses: r2.losses ?? 0, wr: r2.win_rate_pct,
      best: r2.best_trade, worst: r2.worst_trade,
      brk: r2.exit_type_breakdown || {},
      trades: r2.trades || [],
      positions: r2.positions || [],
      note: '0s F8 wait · instant entry at scout +1%',
    };
    const block = (x) => `<div>
      <div class="hdr sub">${x.label} · ${esc(x.note)}</div>
      <div class="cards">
        ${card('Equity', usd(x.equity ?? x.start), cls((x.equity ?? x.start) - x.start))}
        ${card('P&L', usdSigned(x.pnl), cls(x.pnl))}
        ${card('Cash', usd(x.cash ?? x.start))}
        ${card('Closed · open', `${x.closed} · <span class="yel">${x.open}</span>`)}
        ${card('Win rate', `${isNum(x.wr) ? x.wr.toFixed(1) + '%' : '—'} <span class="dim" style="font-size:12px">${x.wins}W/${x.losses}L</span>`)}
        ${card('Best', x.best ? `#${x.best.id} ${esc(x.best.symbol)} <span class="up">${pct(x.best.pnl_pct)}</span>` : '—')}
        ${card('Worst', x.worst ? `#${x.worst.id} ${esc(x.worst.symbol)} <span class="dn">${pct(x.worst.pnl_pct)}</span>` : '—')}
      </div>
    </div>`;
    el.innerHTML = `<div class="hdr">RIO 1 vs RIO 2 · PAPER TRADING / SIMULATED<span class="sp"></span><span class="dim">use the RIO 1 / RIO 2 switch in the top bar to flip Map, Charts, Trades, Feed, Rules, and Calendar</span></div>
      <div class="pad dim">Same F1–F7, sizing, and exits. Only difference: Rio 2 skips the 25-second F8 wait and enters at the scout price +1%.</div>
      <div class="bd">${block(a)}${block(b)}</div>
      <div class="chartgrid">
        <div class="cpanel"><div class="ttl">RIO 1 EXIT TYPES</div><div class="donut" id="vs-dn1"></div><div id="vs-bd1"></div></div>
        <div class="cpanel"><div class="ttl">RIO 2 EXIT TYPES</div><div class="donut" id="vs-dn2"></div><div id="vs-bd2"></div></div>
      </div>
      <div class="hdr">RIO 1 CLOSED TRADES · ${a.trades.length}</div>${tradeFilters('vs1')}<div id="vs1-table"></div>
      <div class="hdr">RIO 2 CLOSED TRADES · ${b.trades.length}</div>${tradeFilters('vs2')}<div id="vs2-table"></div>`;
    const brk1 = Object.keys(a.brk).length ? a.brk : computeBreakdown(a.trades);
    const brk2 = Object.keys(b.brk).length ? b.brk : computeBreakdown(b.trades);
    $('#vs-bd1').innerHTML = Object.keys(brk1).length ? bdTable(brk1, 'RIO 1') : '<div class="empty">No closed Rio 1 trades in this breakdown yet.</div>';
    $('#vs-bd2').innerHTML = Object.keys(brk2).length ? bdTable(brk2, 'RIO 2') : '<div class="empty">No closed Rio 2 trades yet — it will enter the next time a coin passes F1–F7, without waiting 25s.</div>';
    if (Object.keys(brk1).length) dn1 = donut($('#vs-dn1'), brk1, dn1); else $('#vs-dn1').innerHTML = '<div class="empty dim">n/a</div>';
    if (Object.keys(brk2).length) dn2 = donut($('#vs-dn2'), brk2, dn2); else $('#vs-dn2').innerHTML = '<div class="empty dim">n/a</div>';
    const t1 = a.trades.map(t => ({ ...t, book: 'rio1' }));
    const t2 = b.trades.map(t => ({ ...t, book: 'rio2' }));
    wireTradeTable(el, 'vs1', $('#vs1-table'), () => t1, ctx, () => 'rio1-trades.csv')();
    wireTradeTable(el, 'vs2', $('#vs2-table'), () => t2, ctx, () => 'rio2-trades.csv')();
  }
  return {
    update(d) { render(d); },
    visible(v) { if (v) requestAnimationFrame(() => { dn1 && dn1.resize(); dn2 && dn2.resize(); }); },
  };
}
