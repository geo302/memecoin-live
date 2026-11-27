// Trade detail side panel (opened from map nodes, tables, board rows).
import { price, priceFull, usd, usdSigned, pct, cls, dt, dur, esc, isNum, tradeState, dot, ts, num, big } from './fmt.js?v=b27rio2';
import { openTradeReplay } from './replay.js?v=b27rio2';

let mini = null;
const $ = id => document.getElementById(id);

export function closePanel() {
  $('panel').classList.remove('on'); $('panel').setAttribute('aria-hidden', 'true');
  if (mini) { mini.dispose(); mini = null; }
}

const kv = (k, v, c = '') => `<span class="k">${k}</span><span class="v ${c}">${v}</span>`;

export function openTrade(t, ctx) {
  const st = tradeState(t), open = t.status === 'open';
  const pnlU = open ? t.unrealized_pnl_usd : t.pnl_usd, pnlP = open ? t.unrealized_pnl_pct : t.pnl_pct;
  const hold = open ? (isNum(t.held_seconds) ? t.held_seconds : (Date.now() - ts(t.entry_time)) / 1000) : t.hold_seconds;
  const checks = t.checks ? ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'].map(f => {
    const c = t.checks[f];
    if (!c) return `<div class="chk n"><b>${f}</b><span class="dim">n/a</span></div>`;
    return `<div class="chk ${c.pass ? 'p' : 'f'}"><b>${f}</b><span>${c.pass ? 'PASS' : 'FAIL'} · ${esc(c.detail || '')}</span></div>`;
  }).join('') : '<div class="dim">No gate checks recorded for this trade.</div>';
  const pr = ctx.priceFor(t);
  $('panel-body').innerHTML = `<div class="pd">
    <h2>${dot(st)}${esc(t.symbol || '?')} <span class="dim">#${t.id}${t.book === 'rio2' || t.book === 'Rio 2' ? ' · Rio 2' : t.book === 'rio1' || t.book === 'Rio 1' ? ' · Rio 1' : ''}</span></h2>
    <div class="dim">${esc(t.name || '')} · ${esc(t.setup || '')} · ${esc(t.source || '')}</div>
    <div style="margin:6px 0;font-size:16px" class="${cls(pnlU)}">${usdSigned(pnlU)} <span style="font-size:13px">${pct(pnlP)}</span> ${open ? '<span class="yel" style="font-size:11px">OPEN · unrealized</span>' : `<span class="tag ${esc(t.exit_type)}">${esc(t.exit_type || '')}</span>`}</div>
    <div style="margin:8px 0 10px"><button class="btn pri" id="pd-replay">▶ REPLAY</button> <span class="dim">PAPER TRADING · SIMULATED</span></div>
    <h3>EXECUTION</h3>
    <div class="kv">
      ${kv('entry', dt(t.entry_time))}${kv(open ? 'last chk' : 'exit', dt(open ? t.last_checked : t.exit_time))}
      ${kv('entry px', `<span title="${priceFull(t.entry_price)}">${price(t.entry_price)}</span>`)}${kv(open ? 'last px' : 'exit px', `<span title="${priceFull(open ? t.current_price : t.exit_price)}">${price(open ? t.current_price : t.exit_price)}</span>`)}
      ${kv('$ in', usd(t.usd_in))}${kv(open ? 'value' : '$ out', usd(open ? t.current_value_usd : t.usd_out))}
      ${kv('hold', dur(hold))}${kv('stop', price(t.stop_loss_price) + (t.breakeven_armed_at ? ' <span class="yel">BE</span>' : ''))}
      ${kv('TP', price(t.take_profit_price))}${kv('BE arm', price(t.breakeven_arm_price))}
      ${kv('slip in', pct(t.entry_slippage_pct))}${kv('slip out', pct(t.exit_slippage_pct))}
      ${kv('trigger', price(t.exit_trigger_price))}${kv('gap vs trig', pct(t.exit_gap_vs_trigger_pct), cls(t.exit_gap_vs_trigger_pct))}
      ${kv('peak', pct(t.peak_pct))}${kv('max DD', pct(t.max_drawdown_pct), 'dn')}
      ${kv('F6 deadline', dt(t.f6_deadline))}${kv('BE armed', dt(t.breakeven_armed_at))}
    </div>
    ${!open && t.exit_reason ? `<div class="txt" style="margin-top:6px">${esc(t.exit_reason)}</div>` : ''}
    <h3>AT ENTRY</h3>
    <div class="kv">
      ${kv('score', num(t.entry_score, 2))}${kv('liquidity', big(t.liquidity_at_entry))}
      ${kv('5m chg', pct(t.entry_m5_pct), cls(t.entry_m5_pct))}${kv('1h chg', pct(t.entry_h1_pct, 0), cls(t.entry_h1_pct))}
      ${kv('vol1h/liq', num(t.entry_vol1h_liq, 2))}${kv('buys/sells', `${t.entry_buys_1h ?? '—'}/${t.entry_sells_1h ?? '—'}`)}
      ${kv('mc', big(t.mc_at_entry))}${kv('age', isNum(t.entry_age_h) ? t.entry_age_h.toFixed(1) + 'h' : '—')}
    </div>
    <h3>GATE CHECKS F1-F6</h3>${checks}
    <h3>PRICE</h3>${pr && pr.points && pr.points.length ? '<div class="mini" id="mini"></div>' : '<div class="dim">No tick history for this trade.</div>'}
    ${t.thesis ? `<h3>THESIS</h3><div class="txt">${esc(t.thesis)}</div>` : ''}
    ${t.mistake ? `<h3>MISTAKE</h3><div class="txt dn">${esc(t.mistake)}</div>` : ''}
    ${t.lesson ? `<h3>LESSON</h3><div class="txt cyan">${esc(t.lesson)}</div>` : ''}
    <h3>LINKS</h3>
    ${t.dexscreener_url ? `<a href="${esc(t.dexscreener_url)}" target="_blank" rel="noopener">DexScreener ↗</a> · ` : ''}<span class="dim" style="word-break:break-all">${esc(t.address || '')}</span>
    ${t.run !== 1 ? ` · <a href="#" id="pd-chart">open in CHARTS</a>` : ''}
  </div>`;
  $('panel').classList.add('on'); $('panel').setAttribute('aria-hidden', 'false');
  const pc = $('pd-chart');
  if (pc) pc.addEventListener('click', e => { e.preventDefault(); ctx.selectChart && ctx.selectChart(t.id); ctx.showTab('charts'); closePanel(); });
  const rb = $('pd-replay');
  if (rb) rb.addEventListener('click', () => openTradeReplay(t, ctx));
  if (mini) { mini.dispose(); mini = null; }
  if (pr && pr.points && pr.points.length && window.echarts) {
    mini = echarts.init($('mini'), null, { renderer: 'canvas' });
    const P = pr.points.map(p => [ts(p.t), p.price]);
    const S = pr.points.map(p => [ts(p.t), p.stop]);
    mini.setOption({
      animation: false, backgroundColor: 'transparent', grid: { left: 8, right: 60, top: 8, bottom: 20 },
      xAxis: { type: 'time', axisLabel: { color: '#7d8799', fontSize: 9, formatter: v => new Date(v).toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit' }) }, axisLine: { lineStyle: { color: '#1e2430' } }, splitLine: { show: false } },
      yAxis: { type: 'value', scale: true, position: 'right', axisLabel: { color: '#7d8799', fontSize: 9, formatter: v => price(v, 3) }, splitLine: { lineStyle: { color: '#11151d' } } },
      series: [
        { type: 'line', data: P, showSymbol: false, lineStyle: { color: '#a5b4fc', width: 1.3 }, markLine: { silent: true, symbol: 'none', precision: 14, data: [
          { yAxis: t.entry_price, lineStyle: { color: '#fff', type: 'dashed' }, label: { show: false } },
          isNum(t.take_profit_price) ? { yAxis: t.take_profit_price, lineStyle: { color: '#22c55e' }, label: { show: false } } : null].filter(Boolean) } },
        { type: 'line', step: 'end', data: S, showSymbol: false, lineStyle: { color: '#ef4444', width: 1 } },
      ],
    });
  }
}
