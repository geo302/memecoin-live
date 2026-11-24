// BOARD: Bloomberg-terminal price board (open positions, recent exits, scanner, ticker tape).
import { price, priceFull, usd, usdSigned, pct, big, num, cls, esc, dur, ts, tm, dt, isNum, ago } from './fmt.js';
import { makeTable } from './table.js';

const sqs = checks => ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'].map(f => {
  const c = checks && checks[f];
  return `<span class="sq ${!c ? 'n' : c.pass ? 'p' : 'f'}" title="${f}: ${c ? esc((c.pass ? 'PASS ' : 'FAIL ') + (c.detail || '')) : 'n/a'}"></span>`;
}).join('');

export function initBoard(el, ctx) {
  el.classList.add('board');
  el.innerHTML = `
    <div class="tape" id="tape"><div class="tape-in" id="tape-in">loading scan…</div></div>
    <div class="hdr">OPEN POSITIONS <span class="cnt" id="b-open-n"></span><span class="sp"></span><span id="b-upd" class="nowrap"></span></div>
    <div id="b-open"></div>
    <div class="hdr red">RECENT EXITS <span class="dim" style="color:#fecaca">last 10 closed</span></div>
    <div id="b-exits"></div>
    <div class="hdr">SCANNER <span class="cnt" id="b-scan-n"></span><span class="sp"></span><span id="b-scan-t"></span></div>
    <div class="filters">
      <label><input type="checkbox" id="f-gate"> gate passes only</label>
      <label><input type="checkbox" id="f-hard" checked> hide hard-filtered</label>
      <label>search <input type="search" id="f-q" placeholder="symbol / name"></label>
      <span class="dim" id="f-src"></span>
    </div>
    <div id="b-scan"></div>`;
  const $ = s => el.querySelector(s);
  const F = { gate: false, hard: true, q: '' };
  let lastOpen = [];

  const countdown = p => {
    const dl = ts(p.f6_deadline); if (dl === null) return '—';
    if (isNum(p.peak_pct) && isNum(p.f6_min_peak_pct) && p.peak_pct >= p.f6_min_peak_pct) return '<span class="up">MET</span>';
    const s = Math.round((dl - Date.now()) / 1000);
    return s > 0 ? `<span class="yel" data-cd="${dl}">${dur(s)}</span>` : '<span class="dn">DUE</span>';
  };
  const held = p => `<span data-held="${ts(p.entry_time) ?? ''}">${dur(isNum(p.held_seconds) ? p.held_seconds : (Date.now() - ts(p.entry_time)) / 1000)}</span>`;

  const openT = makeTable($('#b-open'), {
    flash: true, sort: 'id', desc: true, onRow: r => ctx.openTrade(r),
    empty: '',
    columns: [
      { k: 'symbol', label: 'SYMBOL', f: r => `<span class="dot open"></span><b class="yel">${esc(r.symbol)}</b>`, flash: false },
      { k: 'id', label: '#', r: 1, flash: false },
      { k: 'entry_price', label: 'ENTRY', r: 1, f: r => price(r.entry_price), title: r => priceFull(r.entry_price), flash: false },
      { k: 'current_price', label: 'LAST', r: 1, f: r => price(r.current_price), title: r => priceFull(r.current_price) },
      { k: 'unrealized_pnl_usd', label: 'P&L $', r: 1, f: r => `<span class="${cls(r.unrealized_pnl_usd)}">${usdSigned(r.unrealized_pnl_usd)}</span>` },
      { k: 'unrealized_pnl_pct', label: 'P&L %', r: 1, f: r => `<span class="${cls(r.unrealized_pnl_pct)}">${pct(r.unrealized_pnl_pct)}</span>` },
      { k: 'distance_to_stop_pct', label: 'TO STOP', r: 1, f: r => `<span class="dn">${pct(r.distance_to_stop_pct)}</span>` },
      { k: 'distance_to_tp_pct', label: 'TO TP', r: 1, f: r => `<span class="up">${pct(r.distance_to_tp_pct)}</span>` },
      { k: 'stop_loss_price', label: 'STOP', r: 1, f: r => r.breakeven_armed_at ? `<span class="yel" title="breakeven armed ${dt(r.breakeven_armed_at)} ET">BE ${price(r.stop_loss_price)}</span>` : price(r.stop_loss_price) },
      { k: 'take_profit_price', label: 'TP', r: 1, f: r => price(r.take_profit_price), flash: false },
      { k: 'f6_deadline', label: 'F6', r: 1, f: countdown, v: r => ts(r.f6_deadline), flash: false, tip: 'F6: must touch +10% within 8 min or it is sold' },
      { k: 'liquidity_usd', label: 'LIQ', r: 1, f: r => big(r.liquidity_usd) },
      { k: 'held_seconds', label: 'HELD', r: 1, f: held, flash: false },
    ],
  });

  const exitT = makeTable($('#b-exits'), {
    sort: 'exit_time', desc: true, onRow: r => ctx.openTrade(r), key: r => r.id,
    empty: 'No closed trades yet in this run.',
    columns: [
      { k: 'symbol', label: 'SYMBOL', f: r => `<span class="dot ${r.pnl_usd > 0 ? 'win' : 'loss'}"></span>${esc(r.symbol)}` },
      { k: 'id', label: '#', r: 1 },
      { k: 'exit_time', label: 'EXIT ET', v: r => ts(r.exit_time), f: r => tm(r.exit_time) },
      { k: 'exit_type', label: 'TYPE', f: r => `<span class="tag ${esc(r.exit_type)}">${esc(r.exit_type || '—')}</span>` },
      { k: 'entry_price', label: 'ENTRY', r: 1, f: r => price(r.entry_price) },
      { k: 'exit_price', label: 'EXIT', r: 1, f: r => price(r.exit_price) },
      { k: 'pnl_usd', label: 'P&L $', r: 1, f: r => `<span class="${cls(r.pnl_usd)}">${usdSigned(r.pnl_usd)}</span>` },
      { k: 'pnl_pct', label: 'P&L %', r: 1, f: r => `<span class="${cls(r.pnl_pct)}">${pct(r.pnl_pct)}</span>` },
      { k: 'exit_gap_vs_trigger_pct', label: 'GAP', r: 1, f: r => `<span class="${cls(r.exit_gap_vs_trigger_pct)}">${pct(r.exit_gap_vs_trigger_pct)}</span>` },
      { k: 'hold_seconds', label: 'HOLD', r: 1, f: r => dur(r.hold_seconds) },
    ],
  });

  const scanT = makeTable($('#b-scan'), {
    flash: true, sort: 'score', desc: true, key: r => (r.pair_address || r.address || r.symbol),
    onRow: r => { if (r.trade_ids && r.trade_ids.length) { const t = ctx.allTrades().find(x => x.id === r.trade_ids[r.trade_ids.length - 1]); if (t) ctx.openTrade(t); } },
    rowClass: r => (r.checks_all_pass ? 'hl' : '') + (r.trade_ids && r.trade_ids.length ? ' traded' : ''),
    empty: 'No scanner rows in the latest scan.',
    columns: [
      { k: 'symbol', label: 'SYMBOL', f: r => `${r.trade_ids && r.trade_ids.length ? '<span class="dot open" title="traded"></span>' : ''}<b class="${r.decision === 'Buy' ? 'yel' : ''}">${esc(r.symbol)}</b>`, title: r => r.name, flash: false },
      { k: 'price', label: 'PRICE', r: 1, f: r => price(r.price), title: r => priceFull(r.price) },
      { k: 'chg_5m', label: '5M', r: 1, f: r => `<span class="${cls(r.chg_5m)}">${pct(r.chg_5m)}</span>` },
      { k: 'chg_1h', label: '1H', r: 1, f: r => `<span class="${cls(r.chg_1h)}">${pct(r.chg_1h)}</span>` },
      { k: 'chg_6h', label: '6H', r: 1, f: r => `<span class="${cls(r.chg_6h)}">${pct(r.chg_6h)}</span>` },
      { k: 'chg_24h', label: '24H', r: 1, f: r => `<span class="${cls(r.chg_24h)}">${pct(r.chg_24h)}</span>` },
      { k: 'mc', label: 'MC', r: 1, f: r => big(r.mc) },
      { k: 'liq', label: 'LIQ', r: 1, f: r => big(r.liq) },
      { k: 'vol_1h', label: 'VOL 1H', r: 1, f: r => big(r.vol_1h) },
      { k: 'vol1h_liq', label: 'V/L', r: 1, f: r => num(r.vol1h_liq, 2) },
      { k: 'buys_1h', label: 'B/S 1H', r: 1, f: r => `<span class="${(r.buys_1h || 0) >= 2 * (r.sells_1h || 0) && r.buys_1h ? 'up' : ''}">${r.buys_1h ?? '—'}/${r.sells_1h ?? '—'}</span>` },
      { k: 'age_h', label: 'AGE', r: 1, f: r => !isNum(r.age_h) ? '—' : r.age_h < 48 ? r.age_h.toFixed(1) + 'h' : Math.round(r.age_h / 24) + 'd' },
      { k: 'score', label: 'SCORE', r: 1, f: r => `<span class="${isNum(r.score) && r.score >= 12 ? 'yel' : ''}">${num(r.score, 2)}</span>` },
      { k: 'setup', label: 'SETUP', f: r => esc(r.setup || (r.hard_filtered ? 'filtered' : '—')), flash: false },
      { k: 'checks', label: 'F1-F6', v: r => r.checks ? Object.values(r.checks).filter(c => c && c.pass).length : -1, f: r => sqs(r.checks), flash: false },
      { k: 'decision', label: 'DECISION', f: r => `<span class="${r.decision === 'Buy' ? 'up' : 'dim'}">${esc(r.decision || '—')}</span>`, title: r => r.reason, flash: false },
      { k: 'reason', label: 'REASON', f: r => `<span class="dim">${esc((r.reason || '').slice(0, 70))}${(r.reason || '').length > 70 ? '…' : ''}</span>`, title: r => r.reason, flash: false },
    ],
  });

  function renderScan() {
    const s = ctx.d && ctx.d.scout; const rows = (s && s.rows) || [];
    const q = F.q.toLowerCase();
    const shown = rows.filter(r => (!F.gate || r.checks_all_pass) && (!F.hard || !r.hard_filtered) &&
      (!q || (r.symbol || '').toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q)));
    scanT.update(shown);
    $('#b-scan-n').textContent = `${shown.length}/${rows.length}`;
  }
  $('#f-gate').addEventListener('change', e => { F.gate = e.target.checked; renderScan(); });
  $('#f-hard').addEventListener('change', e => { F.hard = e.target.checked; renderScan(); });
  $('#f-q').addEventListener('input', e => { F.q = e.target.value.trim(); renderScan(); });

  return {
    update(d) {
      const pos = (d.positions && d.positions.positions) || [];
      lastOpen = pos;
      openT.update(pos);
      if (!pos.length) {
        const s = d.status || {}, sc = d.scout || {};
        $('#b-open').innerHTML = `<div class="empty"><b>No open positions${(d.trades && d.trades.trades || []).length ? '' : ` · no trades yet in run ${d.meta && d.meta.run_number || 2} - scanner is running`}</b>
          latest scan ${tm(sc.scan_time)} ET · ${sc.count ?? (sc.rows || []).length} coins · ${sc.buys ?? 0} buys · ${s.scanner_rounds_last_10min ?? '—'} scans in last 10 min</div>`;
      }
      $('#b-open-n').textContent = pos.length || '';
      $('#b-upd').innerHTML = `updated <span data-ago="${esc((d.positions && d.positions.updated) || '')}"></span>`;
      const closed = ((d.trades && d.trades.trades) || []).slice().sort((a, b) => (ts(b.exit_time) || 0) - (ts(a.exit_time) || 0)).slice(0, 10);
      exitT.update(closed, false);
      const s = d.scout || {};
      $('#b-scan-t').textContent = `scan ${tm(s.scan_time)} ET`;
      $('#f-src').textContent = s.sources ? Object.entries(s.sources).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(' · ') : '';
      renderScan();
      // ticker tape: top movers (by |1h| among non-hard-filtered), traded/gate rows first
      const movers = (s.rows || []).filter(r => !r.hard_filtered && isNum(r.chg_1h)).sort((a, b) => Math.abs(b.chg_1h) - Math.abs(a.chg_1h)).slice(0, 24);
      $('#tape-in').innerHTML = movers.length ? movers.map(r => `<span><b>${esc(r.symbol)}</b> ${price(r.price)} <span class="${cls(r.chg_1h)}">${pct(r.chg_1h)} 1h</span> <span class="${cls(r.chg_5m)}">${pct(r.chg_5m)} 5m</span> <span class="dim">liq ${big(r.liq)}</span></span>`).join('') : '<span class="dim">no movers in the latest scan</span>';
    },
    tick(now) {
      el.querySelectorAll('[data-cd]').forEach(x => { const s = Math.round((+x.dataset.cd - now) / 1000); x.textContent = s > 0 ? dur(s) : 'DUE'; if (s <= 0) x.className = 'dn'; });
      el.querySelectorAll('[data-held]').forEach(x => { if (x.dataset.held) x.textContent = dur((now - +x.dataset.held) / 1000); });
    },
  };
}
