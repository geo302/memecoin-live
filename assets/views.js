// TRADES (+ exit-type breakdown), FEED, RULES and RUN 1 views.
import { price, priceFull, usd, usdSigned, pct, cls, esc, ts, tm, dt, dur, isNum, num, big, md } from './fmt.js';
import { makeTable, toCSV, download } from './table.js';

const EXIT_ORDER = ['TP', 'BREAKEVEN', 'F6_TIME', 'STOP', 'LIQUIDITY', 'TRAIL', 'DISCRETIONARY', 'RESET', 'OTHER'];
const EXIT_COL = { TP: '#00d26a', BREAKEVEN: '#ffd400', F6_TIME: '#9aa3b5', STOP: '#ff3b3b', LIQUIDITY: '#38d9f5', TRAIL: '#8b5cf6', DISCRETIONARY: '#6b7590', RESET: '#444c5e', OTHER: '#333' };
const EXIT_LABEL = { TP: 'TP +20% full sell', BREAKEVEN: 'breakeven (armed at +10%)', F6_TIME: 'F6 8-min time stop', STOP: '-10% stop' };

const checksSq = checks => !checks ? '<span class="dim">—</span>' : ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'].map(f => {
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
    { k: 'checks', label: 'F1-F6', v: r => r.checks ? Object.values(r.checks).filter(c => c && c.pass).length : -1, f: r => checksSq(r.checks), csv: r => r.checks ? Object.entries(r.checks).map(([k, c]) => k + (c && c.pass ? ':P' : ':F')).join(' ') : '' },
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
  el.innerHTML = `<div class="hdr">CLOSED TRADES · RUN <span id="t-run">2</span><span class="sp"></span><span class="dim" style="color:#000">click a row to expand</span></div>
    ${tradeFilters('t')}<div id="t-table"></div>
    <div class="hdr blue">EXIT-TYPE BREAKDOWN · EXIT TRIAL <span id="t-trial" style="font-weight:400"></span></div>
    <div class="bd"><div><div id="t-bd2"></div><div class="hdr" style="background:#333;color:#ffb000">RUN 1 COMPARISON (older rules: trail, +25% TP, $5 sizes)</div><div id="t-bd1"><div class="empty">loading run 1…</div></div></div>
    <div><div class="donut" id="t-donut"></div><div class="pad dim" id="t-gap"></div></div></div>`;
  const $ = s => el.querySelector(s);
  let dn = null;
  const rows = () => ((ctx.d && ctx.d.trades && ctx.d.trades.trades) || []).map(t => ({ ...t, run: t.run ?? 2 }));
  const render = wireTradeTable(el, 't', $('#t-table'), rows, ctx, () => `rio-run${ctx.run ?? 2}-trades.csv`);
  async function run1() {
    try {
      const a = await ctx.loadArchive();
      const b = computeBreakdown(a.trades.trades);
      $('#t-bd1').innerHTML = bdTable(Object.keys(b).length ? b : a.summary.exit_type_breakdown, 'RUN 1');
    } catch (e) { $('#t-bd1').innerHTML = `<div class="empty">run 1 archive unavailable (${esc(e.message)})</div>`; }
  }
  let r1 = false, vis = false;
  return {
    update(d) {
      render();
      $('#t-run').textContent = ctx.run ?? 2;
      const s = d.status || {};
      let b = s.exit_type_breakdown && Object.keys(s.exit_type_breakdown).length ? s.exit_type_breakdown : computeBreakdown(rows());
      $('#t-bd2').innerHTML = bdTable(b, 'RUN ' + (ctx.run ?? 2));
      $('#t-trial').textContent = s.exit_trial ? `${s.exit_trial.id || ''} · ${s.exit_trial.note || ''}` : '';
      $('#t-gap').innerHTML = `avg stop gap (STOP/BREAKEVEN prints below trigger): <b class="${cls(s.avg_stop_gap_pct)}">${pct(s.avg_stop_gap_pct)}</b>`;
      if (vis) dn = donut($('#t-donut'), b, dn); else this._b = b;
    },
    visible(v) {
      vis = v;
      if (v) { if (!r1) { r1 = true; run1(); } requestAnimationFrame(() => { dn = donut($('#t-donut'), this._b || computeBreakdown(rows()), dn); dn && dn.resize(); }); }
    },
  };
}

// ---------------- FEED ----------------
export function initFeed(el, ctx) {
  el.innerHTML = `<div class="toolbar"><b>LIVE LOG</b> <span class="chips" id="fd-chips"></span><span style="flex:1"></span>
    <label style="display:flex;gap:4px;align-items:center;font-weight:700"><input type="checkbox" id="fd-auto" checked> auto-scroll</label><span id="fd-n"></span></div>
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
  return { update(d) { lines = (d.feed && d.feed.lines) || []; render(); } };
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
      el.innerHTML = `<div class="hdr">ENTRY GATES · ALL SIX MUST PASS</div>
        <div class="cards">${(r.entry_gates || []).map(g => card(`<span class="tag" style="background:#ffd400">${esc(g.id)}</span> ${esc(g.rule || '')}`,
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
        </div>
        <div class="hdr">LIVE RULES (as written by the bot)</div>
        <ol class="rules">${(r.live_rules_text || []).map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        ${r.assumptions ? `<div class="hdr">ASSUMPTIONS</div><div class="pad">${Array.isArray(r.assumptions) ? `<ul>${r.assumptions.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : `<pre class="txt">${esc(typeof r.assumptions === 'string' ? r.assumptions : JSON.stringify(r.assumptions, null, 2))}</pre>`}</div>` : ''}
        <div class="pad dim">${esc(r.source_note || '')} · updated ${dt(r.updated)} ET</div>`;
    },
  };
}

// ---------------- RUN 1 ----------------
export function initRun1(el, ctx) {
  el.innerHTML = '<div class="empty"><b>Run 1 archive</b>loading…</div>';
  let loaded = false, chart = null, dn = null;
  async function load() {
    loaded = true;
    let a;
    try { a = await ctx.loadArchive(); } catch (e) { loaded = false; el.innerHTML = `<div class="empty"><b>Run 1 archive unavailable</b>${esc(e.message)}</div>`; return; }
    const s = a.summary || {}, trades = (a.trades.trades || []).map(t => ({ ...t, run: 1 }));
    const card = (l, v, c = '') => `<div class="card"><div class="amb" style="font-size:10px">${l}</div><div class="big ${c}">${v}</div></div>`;
    el.innerHTML = `<div class="hdr" style="background:#555;color:#fff">RUN 1 · READ-ONLY ARCHIVE · ${dt(s.start)} → ${dt(s.end)} ET</div>
      <div class="cards">
        ${card('Final equity (active)', usd(s.final_equity_usd), cls((s.final_equity_usd || 0) - (s.starting_active_bankroll_usd || 100)))}
        ${card('Realized P&L', usdSigned(s.realized_pnl_usd, 2), cls(s.realized_pnl_usd))}
        ${card('Closed trades', s.closed_trades ?? trades.length)}
        ${card('Win rate', `${isNum(s.win_rate_pct) ? s.win_rate_pct.toFixed(1) + '%' : '—'} <span class="dim" style="font-size:12px">${s.wins ?? '?'}W/${s.losses ?? '?'}L</span>`)}
        ${card('Bankroll', `${usd(s.starting_active_bankroll_usd, 0)} <span class="dim" style="font-size:12px">+ ${usd(s.reserve_usd, 0)} reserve</span>`)}
        ${card('winner_pattern', s.winner_pattern ? `${s.winner_pattern.trades} tr · ${s.winner_pattern.wins}W · <span class="${cls(s.winner_pattern.pnl_usd)}">${usdSigned(s.winner_pattern.pnl_usd, 2)}</span>` : '—')}
        ${card('Best', s.best_trade ? `#${s.best_trade.id} ${esc(s.best_trade.symbol)} <span class="up">${pct(s.best_trade.pnl_pct)}</span>` : '—')}
        ${card('Worst', s.worst_trade ? `#${s.worst_trade.id} ${esc(s.worst_trade.symbol)} <span class="dn">${pct(s.worst_trade.pnl_pct)}</span>` : '—')}
      </div>
      ${s.note ? `<div class="pad dim">${esc(s.note)}</div>` : ''}
      <div class="chartgrid"><div class="cpanel"><div class="ttl">REALIZED EQUITY (active bankroll)</div><div class="ch-eq" id="r1-eq"></div></div>
      <div class="cpanel"><div class="ttl">EXIT TYPES</div><div class="donut" id="r1-dn"></div></div></div>
      <div id="r1-bd"></div>
      <div class="hdr">RUN 1 TRADES · ${trades.length}</div>${tradeFilters('r1')}<div id="r1-table"></div>
      <div class="hdr">RUN 1 README</div><div class="mdx">${md(s.readme_markdown)}</div>`;
    const b = computeBreakdown(trades);
    el.querySelector('#r1-bd').innerHTML = bdTable(Object.keys(b).length ? b : s.exit_type_breakdown, 'RUN 1');
    wireTradeTable(el, 'r1', el.querySelector('#r1-table'), () => trades, ctx, () => 'rio-run1-trades.csv')();
    const steps = (s.realized_steps || []).map(p => [ts(p.t), p.equity_realized, p]);
    chart = echarts.init(el.querySelector('#r1-eq'));
    chart.setOption({ animation: false, backgroundColor: '#000', grid: { left: 8, right: 60, top: 14, bottom: 24 },
      xAxis: { type: 'time', axisLabel: { color: '#7d8799', fontSize: 10, formatter: v => new Date(v).toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: '2-digit' }) }, axisLine: { lineStyle: { color: '#26324a' } } },
      yAxis: { type: 'value', scale: true, position: 'right', axisLabel: { color: '#7d8799', fontSize: 10, formatter: v => '$' + v }, splitLine: { lineStyle: { color: '#1a2233' } } },
      tooltip: { trigger: 'axis', backgroundColor: '#000', borderColor: '#fb8b1e', textStyle: { color: '#ddd', fontSize: 11 }, formatter: ps => { const p = steps[ps[0].dataIndex]; return p ? `${dt(p[0])} ET<br>${usd(p[1], 3)}${p[2].trade_id !== null && p[2].trade_id !== undefined ? `<br>#${p[2].trade_id} ${usdSigned(p[2].pnl_usd, 3)}` : ''}` : ''; } },
      series: [{ type: 'line', step: 'end', data: steps.map(p => [p[0], p[1]]), showSymbol: false, lineStyle: { color: '#ffd400', width: 1.2 },
        markLine: { silent: true, symbol: 'none', data: [{ yAxis: s.starting_active_bankroll_usd || 100, lineStyle: { color: '#fb8b1e', type: 'dashed' }, label: { color: '#fb8b1e', fontSize: 10 } }] } }] });
    dn = donut(el.querySelector('#r1-dn'), Object.keys(b).length ? b : s.exit_type_breakdown, null);
  }
  return {
    update() {},
    visible(v) { if (v && !loaded) load(); if (v) requestAnimationFrame(() => { chart && chart.resize(); dn && dn.resize(); }); },
  };
}
