// CHARTS: Bloomberg-style live multi-panel charts per coin, equity curve, P&L per trade, small multiples.
import { price, priceFull, usd, usdSigned, pct, cls, esc, ts, tm, dt, isNum, dur } from './fmt.js?v=b27rio2';

const ET = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false });
const ETs = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const ETd = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'short', day: '2-digit' });
const axT = v => ET.format(v);
const AX = { axisLine: { lineStyle: { color: '#1e2430' } }, axisLabel: { color: '#7d8799', fontSize: 10 }, splitLine: { lineStyle: { color: '#11151d' } } };
const TT = { trigger: 'axis', backgroundColor: 'rgba(6,8,13,.94)', borderColor: '#94a3b8', textStyle: { color: '#d7dde8', fontSize: 11, fontFamily: 'IBM Plex Mono, Menlo, monospace' }, axisPointer: { type: 'cross', lineStyle: { color: '#555' }, crossStyle: { color: '#555' }, label: { backgroundColor: '#94a3b8', color: '#000' } } };

function boll(vals, n = 20, k = 2) {
  const up = [], mid = [], lo = [];
  for (let i = 0; i < vals.length; i++) {
    if (i < n - 1) { up.push(null); mid.push(null); lo.push(null); continue; }
    let s = 0; for (let j = i - n + 1; j <= i; j++) s += vals[j]; const m = s / n;
    let v = 0; for (let j = i - n + 1; j <= i; j++) v += (vals[j] - m) ** 2; const sd = Math.sqrt(v / n);
    up.push(m + k * sd); mid.push(m); lo.push(m - k * sd);
  }
  return { up, mid, lo };
}

export function initCharts(el, ctx) {
  el.innerHTML = `
    <div class="toolbar">
      <b>COIN</b> <select id="c-sel" aria-label="Coin"></select>
      <span id="c-tf">
        <button data-tf="all" class="on">ALL</button><button data-tf="15">15m</button><button data-tf="5">5m</button><button data-tf="1">1m</button>
      </span>
      <button id="c-bb" class="on" title="Bollinger bands (20)">BOLL 20</button>
      <span style="flex:1"></span>
      <button id="c-view">GRID VIEW</button>
    </div>
    <div class="chartgrid">
      <div class="cpanel" id="c-left">
        <div class="ttl"><span id="c-title">—</span><span class="dim" id="c-sub"></span></div>
        <div class="readout" id="c-ro"></div>
        <div class="ch-main" id="c-main"></div>
        <div class="smalls" id="c-smalls" style="display:none"></div>
      </div>
      <div>
        <div class="cpanel"><div class="ttl">EQUITY CURVE <span class="dim">mark-to-market · realized steps · $ start baseline</span></div><div class="ch-eq" id="c-eq"></div></div>
        <div class="cpanel"><div class="ttl">P&L PER TRADE</div><div class="ch-bar" id="c-bar"></div></div>
      </div>
    </div>`;
  const $ = s => el.querySelector(s);
  const S = { sel: null, tf: 'all', bb: true, grid: false, visible: false, main: null, eq: null, bar: null, smalls: [], lastSel: null };
  ctx.selectChart = id => { S.sel = id; S.grid = false; syncView(); renderMain(true); };

  const inst = (k, node) => S[k] || (S[k] = echarts.init(node, null, { renderer: 'canvas' }));
  const list = () => {
    const tr = (ctx.d && ctx.d.prices && ctx.d.prices.trades) || [];
    return [...tr].sort((a, b) => ((b.status === 'open') - (a.status === 'open')) || (b.id - a.id));
  };

  function fillSelect() {
    const L = list(), sel = $('#c-sel');
    const html = L.length ? L.map(p => `<option value="${p.id}">${p.status === 'open' ? '● OPEN ' : p.result === 'Win' ? '▲ ' : '▼ '}${esc(p.symbol)} #${p.id}${p.exit_type ? ' · ' + esc(p.exit_type) : ''}</option>`).join('') : '<option value="">no coins entered yet</option>';
    if (sel.innerHTML !== html) sel.innerHTML = html;
    if (S.sel === null || !L.find(p => p.id === S.sel)) S.sel = L.length ? L[0].id : null;
    if (S.sel !== null) sel.value = String(S.sel);
  }

  function readout(pr) {
    const ro = $('#c-ro'); if (!pr) { ro.innerHTML = ''; return; }
    const last = pr.points && pr.points[pr.points.length - 1];
    const open = pr.status === 'open';
    const pu = open ? last && last.pnl_usd : pr.pnl_usd, pp = open ? last && last.pnl_pct : pr.pnl_pct;
    const c = open ? 'yel' : cls(pu);
    ro.innerHTML = `<div class="${c}">${usdSigned(pu)} ${pct(pp)}</div><div class="dim" style="font-size:10px;font-weight:400">${open ? 'OPEN · live' : esc(pr.exit_type || 'CLOSED')} · last ${price(last && last.price)}</div>`;
  }

  function mainOption(pr) {
    const P = pr.points || [];
    const T = P.map(p => ts(p.t));
    const px = P.map(p => p.price);
    const data = (arr) => arr.map((v, i) => [T[i], v]);
    const series = [];
    const bb = S.bb && px.length >= 20 ? boll(px) : null;
    series.push({ name: 'price', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: data(px), showSymbol: false, lineStyle: { color: '#e8f6ff', width: 1.4 }, z: 5,
      markLine: { silent: true, symbol: 'none', animation: false, precision: 14, data: [
        { yAxis: pr.entry_price, lineStyle: { color: '#ffffff', type: 'dashed', width: 1 }, label: { formatter: 'ENTRY ' + price(pr.entry_price), color: '#fff', position: 'insideStartTop', fontSize: 10 } },
        isNum(pr.take_profit_price) ? { yAxis: pr.take_profit_price, lineStyle: { color: '#22c55e', width: 1 }, label: { formatter: 'TP ' + price(pr.take_profit_price), color: '#22c55e', position: 'insideStartTop', fontSize: 10 } } : null,
        isNum(pr.breakeven_arm_price) ? { yAxis: pr.breakeven_arm_price, lineStyle: { color: '#f4f6fb', type: 'dotted', width: 1 }, label: { formatter: 'BE ARM +10%', color: '#f4f6fb', position: 'insideStartTop', fontSize: 10 } } : null,
      ].filter(Boolean) },
      markPoint: { animation: false, data: [
        ts(pr.entry_time) ? { coord: [ts(pr.entry_time), pr.entry_price], symbol: 'triangle', symbolSize: 12, itemStyle: { color: '#22c55e' }, label: { show: false } } : null,
        pr.exit_time ? { coord: [ts(pr.exit_time), pr.exit_price], symbol: 'triangle', symbolRotate: 180, symbolSize: 13, itemStyle: { color: pr.pnl_usd > 0 ? '#22c55e' : '#ef4444' },
          label: { show: true, position: 'top', color: '#fff', fontSize: 10, backgroundColor: '#000', padding: [1, 3], formatter: `${pr.exit_type || 'EXIT'} ${usdSigned(pr.pnl_usd)}` } } : null,
        ts(pr.breakeven_armed_at) ? { coord: [ts(pr.breakeven_armed_at), stopAt(P, ts(pr.breakeven_armed_at)) ?? pr.stop_loss_price], symbol: 'roundRect', symbolSize: [22, 14], itemStyle: { color: '#f4f6fb' }, label: { show: true, formatter: 'BE', color: '#000', fontSize: 9, fontWeight: 700 } } : null,
      ].filter(Boolean) } });
    series.push({ name: 'stop', type: 'line', step: 'end', xAxisIndex: 0, yAxisIndex: 0, data: P.map((p, i) => [T[i], p.stop]), showSymbol: false, lineStyle: { color: '#ef4444', width: 1.6 }, z: 7,
      markLine: ts(pr.f6_deadline) ? { silent: true, symbol: 'none', animation: false, data: [{ xAxis: ts(pr.f6_deadline), lineStyle: { color: '#888', width: 1 }, label: { formatter: 'F6 8m', color: '#aaa', fontSize: 10, position: 'end' } }] } : undefined });
    series.push({ name: 'TP', type: 'line', step: 'end', xAxisIndex: 0, yAxisIndex: 0, data: P.map((p, i) => [T[i], isNum(p.tp) ? p.tp : pr.take_profit_price]), showSymbol: false, lineStyle: { color: '#22c55e', width: 1 }, z: 3 });
    if (bb) {
      series.push({ name: 'BB up', type: 'line', data: data(bb.up), showSymbol: false, lineStyle: { color: '#c4b5fd', width: 0.8 }, z: 2 });
      series.push({ name: 'BB mid', type: 'line', data: data(bb.mid), showSymbol: false, lineStyle: { color: '#777', width: 0.8 }, z: 2 });
      series.push({ name: 'BB low', type: 'line', data: data(bb.lo), showSymbol: false, lineStyle: { color: '#22c55e', width: 0.8 }, z: 2 });
    }
    const pos = P.map((p, i) => [T[i], isNum(p.pnl_pct) ? Math.max(0, p.pnl_pct) : null]);
    const neg = P.map((p, i) => [T[i], isNum(p.pnl_pct) ? Math.min(0, p.pnl_pct) : null]);
    series.push({ name: 'P&L % +', type: 'line', xAxisIndex: 1, yAxisIndex: 1, data: pos, showSymbol: false, lineStyle: { width: 1, color: '#22c55e' }, areaStyle: { color: 'rgba(34,197,94,.25)' },
      markLine: { silent: true, symbol: 'none', data: [{ yAxis: 0, lineStyle: { color: '#444' }, label: { show: false } }] } });
    series.push({ name: 'P&L % -', type: 'line', xAxisIndex: 1, yAxisIndex: 1, data: neg, showSymbol: false, lineStyle: { width: 1, color: '#ef4444' }, areaStyle: { color: 'rgba(239,68,68,.25)' } });
    series.push({ name: 'liq', type: 'line', xAxisIndex: 2, yAxisIndex: 2, data: P.map((p, i) => [T[i], p.liq]), showSymbol: false, lineStyle: { color: '#cbd5e1', width: 1 } });
    const g = (top, height) => ({ left: 8, right: 72, top, height });
    const xa = (i, show) => ({ type: 'time', gridIndex: i, ...AX, splitLine: { show: false }, axisLabel: { ...AX.axisLabel, show, formatter: axT }, axisPointer: { label: { formatter: o => ETs.format(o.value) } } });
    const ya = (i, fmt, name) => ({ type: 'value', gridIndex: i, scale: true, position: 'right', ...AX, name, nameTextStyle: { color: '#cbd5e1', fontSize: 10, align: 'right' }, axisLabel: { ...AX.axisLabel, formatter: fmt }, axisPointer: { label: { formatter: o => fmt(o.value) } } });
    return {
      animation: false, backgroundColor: 'transparent',
      grid: [g('4%', '56%'), g('66%', '13%'), g('83%', '9%')],
      xAxis: [xa(0, false), xa(1, false), xa(2, true)],
      yAxis: [ya(0, v => price(v, 4), ''), ya(1, v => v.toFixed(0) + '%', 'P&L%'), ya(2, v => '$' + (v / 1000).toFixed(0) + 'k', 'LIQ')],
      axisPointer: { link: [{ xAxisIndex: 'all' }] },
      tooltip: { ...TT, formatter: ps => {
        const i = ps[0] && ps[0].dataIndex, p = P[i]; if (!p) return '';
        return `${dt(p.t)} ET<br>price <b>${priceFull(p.price)}</b><br>stop <span style="color:#ef4444">${price(p.stop)}</span> · tp <span style="color:#22c55e">${price(p.tp)}</span><br>P&L ${usdSigned(p.pnl_usd)} ${pct(p.pnl_pct)}<br>liq ${usd(p.liq, 0)}${p.event ? `<br><b style="color:#f4f6fb">${p.event}</b>` : ''}`;
      } },
      dataZoom: [{ type: 'inside', xAxisIndex: [0, 1, 2], filterMode: 'none' }],
      series,
    };
  }
  const stopAt = (P, t) => { let s = null; for (const p of P) { if (ts(p.t) <= t) s = p.stop; else break; } return s; };

  function applyTf(pr) {
    if (!S.main || !pr || !pr.points || !pr.points.length) return;
    if (S.tf === 'all') { S.main.dispatchAction({ type: 'dataZoom', start: 0, end: 100 }); return; }
    const w = +S.tf * 60e3, e = ts(pr.entry_time) || ts(pr.points[0].t);
    S.main.dispatchAction({ type: 'dataZoom', startValue: e - w * 0.2, endValue: e + w });
  }

  function renderMain(force) {
    const L = list(); fillSelect();
    const pr = L.find(p => p.id === S.sel);
    const node = $('#c-main');
    if (!pr) {
      if (S.main) { S.main.dispose(); S.main = null; }
      const s = ctx.d && ctx.d.status || {};
      const book = (ctx.book === 'rio2') ? 'Rio 2' : 'Rio 1';
      node.innerHTML = `<div class="empty"><b>No coins entered yet in ${book} — scanner is running</b>${s.scanner_rounds_last_10min ?? '—'} scans in the last 10 min · last scan ${tm(s.scanner_last_round)} ET<br><span class="dim">Charts appear here the moment this book enters a coin.</span></div>`;
      $('#c-title').textContent = '—'; $('#c-sub').textContent = ''; readout(null); return;
    }
    if (!S.main) node.innerHTML = '';
    const ch = inst('main', node);
    const same = S.lastSel === pr.id && !force;
    const opt = mainOption(pr);
    if (same) { delete opt.dataZoom; ch.setOption(opt, { notMerge: false, lazyUpdate: true }); }
    else { ch.setOption(opt, { notMerge: true }); S.lastSel = pr.id; applyTf(pr); }
    $('#c-title').innerHTML = `<b class="yel">${esc(pr.symbol)}</b> #${pr.id} <span class="dim">${esc(pr.name || '')}</span>`;
    $('#c-sub').innerHTML = `entry ${tm(pr.entry_time)} ET${pr.exit_time ? ' · exit ' + tm(pr.exit_time) + ' ET' : ''} · ${(pr.points || []).length} ticks${pr.dexscreener_url ? ` · <a href="${esc(pr.dexscreener_url)}" target="_blank" rel="noopener">DexScreener ↗</a>` : ''}`;
    readout(pr);
  }

  function renderSmalls() {
    const box = $('#c-smalls');
    S.smalls.forEach(c => c.dispose()); S.smalls = [];
    const L = list();
    if (!L.length) { box.innerHTML = '<div class="empty"><b>No coins entered yet</b></div>'; return; }
    box.innerHTML = L.map(p => {
      const last = p.points && p.points[p.points.length - 1];
      const pu = p.status === 'open' ? last && last.pnl_usd : p.pnl_usd, pp = p.status === 'open' ? last && last.pnl_pct : p.pnl_pct;
      return `<div class="small" data-id="${p.id}"><div class="st"><span><span class="dot ${p.status === 'open' ? 'open' : p.result === 'Win' ? 'win' : 'loss'}"></span><b>${esc(p.symbol)}</b> <span class="dim">#${p.id}</span></span><span class="${p.status === 'open' ? 'yel' : cls(pu)}">${usdSigned(pu)} ${pct(pp)}</span></div><div class="sc"></div></div>`;
    }).join('');
    box.querySelectorAll('.small').forEach(div => {
      const p = L.find(x => x.id === +div.dataset.id);
      div.addEventListener('click', () => ctx.selectChart(p.id));
      const c = echarts.init(div.querySelector('.sc'), null, { renderer: 'canvas' });
      const col = p.status === 'open' ? '#f4f6fb' : p.result === 'Win' ? '#22c55e' : '#ef4444';
      c.setOption({ animation: false, grid: { left: 2, right: 2, top: 4, bottom: 4 }, xAxis: { type: 'time', show: false }, yAxis: { type: 'value', scale: true, show: false },
        series: [{ type: 'line', data: (p.points || []).map(q => [ts(q.t), q.price]), showSymbol: false, lineStyle: { color: col, width: 1.2 },
          markLine: { silent: true, symbol: 'none', precision: 14, data: [{ yAxis: p.entry_price, lineStyle: { color: '#fff', type: 'dashed', width: 0.6 }, label: { show: false } },
            isNum(p.take_profit_price) ? { yAxis: p.take_profit_price, lineStyle: { color: '#22c55e', width: 0.6 }, label: { show: false } } : null].filter(Boolean) } },
        { type: 'line', step: 'end', data: (p.points || []).map(q => [ts(q.t), q.stop]), showSymbol: false, lineStyle: { color: '#ef4444', width: 0.6 } }] });
      S.smalls.push(c);
    });
  }

  function renderEquity() {
    const d = ctx.d || {}, e = d.equity || {};
    const start = e.starting_capital_usd ?? (d.meta && d.meta.starting_capital_usd) ?? 1000;
    const pts = (e.points || []).map(p => [ts(p.t), p.equity]).filter(p => p[0] !== null);
    const steps = (e.realized_steps || []).map(p => [ts(p.t), p.equity_realized, p]).filter(p => p[0] !== null);
    if (steps.length && pts.length) steps.push([pts[pts.length - 1][0], steps[steps.length - 1][1], null]);
    const ch = inst('eq', $('#c-eq'));
    ch.setOption({
      animation: false, backgroundColor: 'transparent', legend: { top: 2, right: 70, textStyle: { color: '#7d8799', fontSize: 10 }, itemHeight: 6 },
      grid: { left: 8, right: 72, top: 26, bottom: 34 },
      xAxis: { type: 'time', ...AX, splitLine: { show: false }, axisLabel: { ...AX.axisLabel, formatter: v => ET.format(v) + '\n' + ETd.format(v) } },
      yAxis: { type: 'value', scale: true, position: 'right', ...AX, axisLabel: { ...AX.axisLabel, formatter: v => '$' + v.toFixed(0) } },
      tooltip: { ...TT, valueFormatter: v => usd(v) },
      series: [
        { name: 'equity (MTM)', type: 'line', data: pts, showSymbol: false, lineStyle: { color: '#a5b4fc', width: 1.3 }, areaStyle: { color: 'rgba(165,180,252,.06)' },
          markLine: { silent: true, symbol: 'none', data: [{ yAxis: start, lineStyle: { color: '#94a3b8', type: 'dashed' }, label: { formatter: usd(start, 0), color: '#94a3b8', fontSize: 10 } }] } },
        { name: 'realized', type: 'line', step: 'end', data: steps.map(s => [s[0], s[1]]), showSymbol: false, lineStyle: { color: '#f4f6fb', width: 1.2 } },
        { name: 'closes', type: 'scatter', data: steps.filter(s => s[2] && s[2].trade_id !== null && s[2].trade_id !== undefined).map(s => ({ value: [s[0], s[1]], itemStyle: { color: (s[2].pnl_usd || 0) > 0 ? '#22c55e' : '#ef4444' }, name: '#' + s[2].trade_id })), symbolSize: 6,
          tooltip: { trigger: 'item', formatter: o => `${o.name} · ${usd(o.value[1])}` } },
      ],
    }, { notMerge: true });
    const closed = ((d.trades && d.trades.trades) || []).slice().sort((a, b) => a.id - b.id);
    const bar = inst('bar', $('#c-bar'));
    bar.setOption({
      animation: false, backgroundColor: 'transparent', grid: { left: 8, right: 72, top: 10, bottom: 22 },
      xAxis: { type: 'category', data: closed.map(t => '#' + t.id), ...AX, axisLabel: { ...AX.axisLabel, fontSize: 9 } },
      yAxis: { type: 'value', position: 'right', ...AX, axisLabel: { ...AX.axisLabel, formatter: v => '$' + v } },
      tooltip: { ...TT, axisPointer: { type: 'shadow' }, formatter: ps => { const t = closed[ps[0].dataIndex]; return t ? `#${t.id} ${esc(t.symbol)} · ${esc(t.exit_type || '')}<br>${usdSigned(t.pnl_usd)} ${pct(t.pnl_pct)}` : ''; } },
      series: [{ type: 'bar', data: closed.map(t => ({ value: t.pnl_usd, itemStyle: { color: t.pnl_usd > 0 ? '#22c55e' : '#ef4444' } })), barMaxWidth: 14 }],
      graphic: closed.length ? [] : [{ type: 'text', left: 'center', top: 'middle', style: { text: 'no closed trades yet', fill: '#7d8799', font: '12px monospace' } }],
    }, { notMerge: true });
    bar.off('click'); bar.on('click', p => { const t = closed[p.dataIndex]; if (t) ctx.openTrade(t); });
  }

  function syncView() {
    $('#c-view').textContent = S.grid ? 'SINGLE VIEW' : 'GRID VIEW';
    $('#c-view').classList.toggle('on', S.grid);
    $('#c-main').style.display = S.grid ? 'none' : '';
    $('#c-ro').style.display = S.grid ? 'none' : '';
    $('#c-smalls').style.display = S.grid ? '' : 'none';
    if (S.grid) renderSmalls(); else if (S.main) S.main.resize();
  }

  $('#c-sel').addEventListener('change', e => { S.sel = e.target.value === '' ? null : +e.target.value; renderMain(true); });
  $('#c-tf').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    S.tf = b.dataset.tf; $('#c-tf').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    applyTf(list().find(p => p.id === S.sel));
  });
  $('#c-bb').addEventListener('click', e => { S.bb = !S.bb; e.target.classList.toggle('on', S.bb); renderMain(true); });
  $('#c-view').addEventListener('click', () => { S.grid = !S.grid; syncView(); });
  window.addEventListener('resize', () => { if (S.visible) [S.main, S.eq, S.bar, ...S.smalls].forEach(c => c && c.resize()); });

  let pending = false;
  function renderAll() { if (!S.visible) { pending = true; return; } pending = false; renderMain(false); renderEquity(); if (S.grid) renderSmalls(); }

  return {
    update() { renderAll(); },
    reset() { S.sel = null; S.lastSel = null; if (S.main) { S.main.dispose(); S.main = null; } },
    visible(v) {
      S.visible = v;
      if (v) { if (pending || !S.eq) renderAll(); requestAnimationFrame(() => [S.main, S.eq, S.bar, ...S.smalls].forEach(c => c && c.resize())); }
    },
    tick() {},
  };
}
