// DEMO mode (?demo=1): synthesizes live-book-shaped data from the archived book so every
// panel can be exercised while the real run 2 has no trades. Clearly labeled in the UI.
// Nothing here is real trading data.

function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
const iso = t => { // ISO in ET-ish fixed -05:00 offset (display converts to ET anyway)
  const d = new Date(t - 5 * 3600e3);
  return d.toISOString().replace(/\.\d+Z$/, '-05:00');
};

// n = how many demo trades have "arrived" so far (starts at 1 and grows; the newest one is the live open position).
export function makeDemo(real, archive, n = 34) {
  const R = rng(42);
  const now = Date.now();
  const all = (archive.trades.trades || []).slice().sort((a, b) => a.id - b.id);
  const src = all.slice(0, Math.max(1, Math.min(n, all.length)));
  const N = src.length;
  const start = now - (N * 7 + 20) * 60e3;
  const trades = [], positions = [], prices = [], feed = [];
  let cash = 1000, realized = 0;
  const steps = [{ t: iso(start), equity_realized: 1000, trade_id: null }];
  const eqPts = [];
  const types = ['TP', 'STOP', 'BREAKEVEN', 'F6_TIME', 'F6_TIME', 'STOP', 'TP', 'BREAKEVEN'];

  src.forEach((o, i) => {
    const open = i === N - 1;
    const entryT = open ? now - 3.2 * 60e3 : start + i * 7 * 60e3;
    const e = o.entry_price || 1e-5;
    const usdIn = 50, tokens = usdIn / e;
    const tp = e * 1.2, stop0 = e * 0.9, armP = e * 1.1, beStop = e * 1.02;
    const f6dl = entryT + 8 * 60e3;
    const type = open ? null : types[Math.floor(R() * types.length)];
    // build a path
    const pts = []; let p = e * 0.995, stop = stop0, armedAt = null, exitT = null, exitMkt = null;
    const steps_n = open ? Math.floor((now - entryT) / 3000) : 40 + Math.floor(R() * 120);
    const drift = type === 'TP' ? 0.006 : type === 'STOP' ? -0.004 : type === 'BREAKEVEN' ? 0.003 : type === 'F6_TIME' ? 0.0005 : (i === N - 1 ? 0.004 : 0.001);
    let peak = p;
    for (let k = 0; k <= steps_n; k++) {
      const t = entryT + k * 3000;
      if (k > 0) {
        let d = drift + (R() - 0.5) * 0.03;
        if (type === 'BREAKEVEN' && armedAt) d = -0.006 + (R() - 0.5) * 0.02;
        p = Math.max(p * (1 + d), e * 0.3);
      }
      if (type === 'F6_TIME' && p > e * 1.08) p = e * 1.06;
      if (open && p > tp * 0.985) p = tp * (0.95 + R() * 0.03);
      peak = Math.max(peak, p);
      let ev = k === 0 ? 'ENTRY' : null;
      if (!armedAt && p >= armP) { armedAt = t; stop = beStop; ev = 'BREAKEVEN_ARMED'; }
      const liq = (o.liquidity_at_entry || 30000) * (1 + (R() - 0.5) * 0.05 + (p / e - 1) * 0.3);
      let hit = null;
      if (!open) {
        if (p >= tp) hit = 'TP';
        else if (p <= stop) hit = armedAt ? 'BREAKEVEN' : 'STOP';
        else if (t >= f6dl && peak < armP) hit = 'F6_TIME';
        else if (k === steps_n) hit = type;
      }
      if (hit) { ev = 'EXIT'; exitT = t; exitMkt = hit === 'TP' ? Math.max(p, tp * (1 + R() * 0.01)) : hit === 'STOP' ? Math.min(p, stop0 * (1 - R() * 0.08)) : p; }
      const mark = hit ? exitMkt * 0.99 : p;
      const pnlUsd = tokens * mark - usdIn;
      pts.push({ t: iso(t), price: hit ? exitMkt : p, stop, tp, pnl_pct: pnlUsd / usdIn * 100, pnl_usd: pnlUsd, liq, event: ev, _x: hit });
      if (hit) break;
    }
    const last = pts[pts.length - 1];
    const exitType = open ? null : (last._x || type);
    const base = {
      ...o, run: 2, id: i, exit_rules: 'exit_trial_v1', usd_in: usdIn, tokens,
      entry_time: iso(entryT), entry_price: e, initial_stop_price: stop0, stop_loss_price: stop, take_profit_price: tp,
      breakeven_arm_pct: 10, breakeven_stop_pct: 2, breakeven_arm_price: armP, breakeven_armed_at: armedAt ? iso(armedAt) : null,
      f6_minutes: 8, f6_min_peak_pct: 10, f6_deadline: iso(f6dl), peak_price: peak, peak_pct: (peak / e - 1) * 100,
      entry_score: o.entry_score ?? +(12 + R() * 6).toFixed(1), entry_m5_pct: o.entry_m5_pct ?? +(50 + R() * 120).toFixed(1),
      entry_h1_pct: o.entry_h1_pct ?? +(100 + R() * 400).toFixed(0), entry_vol1h_liq: o.entry_vol1h_liq ?? +(0.82 + R()).toFixed(2),
      entry_buys_1h: o.entry_buys_1h ?? 60 + Math.floor(R() * 80), entry_sells_1h: o.entry_sells_1h ?? 20 + Math.floor(R() * 20),
      checks: {
        F1: { pass: true, detail: '5m +' + (50 + R() * 100).toFixed(1) + '% (need +50..+185)' },
        F2: { pass: true, detail: 'vol1h/liq ' + (0.82 + R()).toFixed(2) + ' (need >=0.82)' },
        F3: { pass: true, detail: 'liq $' + Math.round(o.liquidity_at_entry || 30000).toLocaleString() + ' (need >=$26k)' },
        F4: { pass: true, detail: 'buys/sells ' + (2 + R() * 2).toFixed(2) + ' (need >=2.0)' },
        F5: { pass: true, detail: 'fresh (no TP on ticker/address <6h)' },
        F6: { pass: true, detail: 'exit rule: +10% within 8m or sell' },
        F7: { pass: true, status: 'PASS', detail: 'DEMO: contract safety not checked (synthetic)' },
      }, checks_all_pass: true,
      f7_status: 'PASS', f7_text: 'DEMO data: F7 not actually checked', f7_reasons: [], smart_wallet_count: Math.floor(R() * 30),
    };
    prices.push({ id: i, symbol: o.symbol, name: o.name, address: o.address, status: open ? 'open' : 'closed', dexscreener_url: o.dexscreener_url,
      entry_time: base.entry_time, entry_price: e, exit_time: exitT ? iso(exitT) : null, exit_price: open ? null : exitMkt * 0.99, exit_type: exitType,
      usd_in: usdIn, tokens, initial_stop_price: stop0, stop_loss_price: stop, take_profit_price: tp, breakeven_arm_price: armP,
      breakeven_armed_at: base.breakeven_armed_at, f6_deadline: base.f6_deadline,
      result: open ? null : (last.pnl_usd > 0 ? 'Win' : 'Loss'), pnl_usd: open ? null : last.pnl_usd, pnl_pct: open ? null : last.pnl_pct,
      points: pts.map(({ _x, ...q }) => q) });
    feed.push({ t: base.entry_time, type: 'BUY', text: `#${i} ${o.symbol} $${e.toPrecision(4)} size $50.00 GATE ALL PASS` });
    if (armedAt) feed.push({ t: iso(armedAt), type: 'BREAKEVEN', text: `#${i} ${o.symbol} +10% touched, stop -> entry +2%` });
    if (open) {
      const cur = last.price, val = tokens * cur;
      cash -= usdIn;
      positions.push({ ...base, status: 'open', current_price: cur, current_value_usd: val, unrealized_pnl_usd: val - usdIn,
        unrealized_pnl_pct: (val / usdIn - 1) * 100, distance_to_stop_pct: (stop / cur - 1) * 100, distance_to_tp_pct: (tp / cur - 1) * 100,
        liquidity_usd: last.liq, last_checked: iso(now - 2000), held_seconds: Math.round((now - entryT) / 1000),
        exit_time: undefined, exit_price: undefined, pnl_usd: undefined, pnl_pct: undefined, result: undefined, exit_type: undefined });
    } else {
      const xp = exitMkt * 0.99, out = tokens * xp, pnl = out - usdIn;
      realized += pnl; cash += pnl;
      const trig = exitType === 'TP' ? tp : exitType === 'STOP' ? stop0 : exitType === 'BREAKEVEN' ? beStop : null;
      trades.push({ ...base, status: 'closed', exit_time: iso(exitT), exit_price: xp, market_price_at_exit: exitMkt, usd_out: out,
        pnl_usd: pnl, pnl_pct: pnl / usdIn * 100, result: pnl > 0 ? 'Win' : 'Loss', hold_seconds: Math.round((exitT - entryT) / 1000),
        hold_time: null, exit_type: exitType, exit_reason: `DEMO ${exitType} exit`, entry_slippage_pct: 1, exit_slippage_pct: -1,
        exit_trigger_price: trig, exit_gap_vs_trigger_pct: trig ? (exitMkt / trig - 1) * 100 : null });
      steps.push({ t: iso(exitT), equity_realized: 1000 + realized, trade_id: i, pnl_usd: pnl });
      feed.push({ t: iso(exitT), type: 'EXIT', text: `#${i} ${o.symbol} ${exitType} P&L ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${(pnl / usdIn * 100).toFixed(1)}%)` });
      if (o.lesson) feed.push({ t: iso(exitT + 1000), type: 'LESSON', text: `#${i} ${o.lesson}` });
    }
  });
  // equity mark-to-market points every minute
  for (let t = start; t <= now; t += 60e3) {
    const r = steps.filter(s => Date.parse(s.t) <= t).pop().equity_realized;
    let openVal = 0, n = 0;
    prices.forEach(pr => {
      const et = Date.parse(pr.entry_time), xt = pr.exit_time ? Date.parse(pr.exit_time) : Infinity;
      if (et <= t && t < xt) { const pt = pr.points.filter(q => Date.parse(q.t) <= t).pop(); if (pt) { openVal += pt.pnl_usd; n++; } }
    });
    eqPts.push({ t: iso(t), equity: r + openVal, cash: null, open_value: null, realized_pnl: r - 1000, n_open: n });
  }
  const wins = trades.filter(t => t.pnl_usd > 0), losses = trades.filter(t => t.pnl_usd <= 0);
  const unreal = positions.reduce((a, p) => a + p.unrealized_pnl_usd, 0);
  const openVal = positions.reduce((a, p) => a + p.current_value_usd, 0);
  const etb = {};
  trades.forEach(t => {
    const b = etb[t.exit_type] ||= { count: 0, wins: 0, pnl_usd: 0, _p: 0, _g: [], };
    b.count++; if (t.pnl_usd > 0) b.wins++; b.pnl_usd += t.pnl_usd; b._p += t.pnl_pct; if (t.exit_gap_vs_trigger_pct !== null) b._g.push(t.exit_gap_vs_trigger_pct);
  });
  for (const b of Object.values(etb)) { b.avg_pnl_pct = b._p / b.count; b.avg_gap_vs_trigger_pct = b._g.length ? b._g.reduce((a, c) => a + c, 0) / b._g.length : null; delete b._p; delete b._g; }
  const by = [...trades].sort((a, b) => b.pnl_usd - a.pnl_usd);
  const brief = t => t && { id: t.id, symbol: t.symbol, pnl_usd: t.pnl_usd, pnl_pct: t.pnl_pct };
  const nowIso = iso(now - 4000);
  const avg = arr => arr.length ? arr.reduce((x, t) => x + t.pnl_pct, 0) / arr.length : null;
  const status = { ...real.status, run_number: 2, starting_capital_usd: 1000, halt_equity_usd: 500, halted: false, halt_reason: null,
    avg_win_pct: avg(wins), avg_loss_pct: avg(losses), equity_usd: 1000 + realized + unreal, cash_usd: cash, open_positions_value_usd: openVal,
    total_pnl_usd: realized + unreal, total_return_pct: (realized + unreal) / 10, realized_pnl_usd: realized, unrealized_pnl_usd: unreal,
    closed_trades: trades.length, open_trades: positions.length, wins: wins.length, losses: losses.length,
    win_rate_pct: trades.length ? wins.length / trades.length * 100 : null, best_trade: brief(by[0]), worst_trade: brief(by[by.length - 1]),
    exit_type_breakdown: etb, avg_stop_gap_pct: -4.1, last_update: nowIso, watcher_last_update: nowIso, scanner_last_round: nowIso };
  const scout = real.scout ? { ...real.scout, rows: real.scout.rows.map((r, k) => k === 3 ? { ...r, trade_ids: [N - 1] } : r) } : real.scout;
  const realFeed = (real.feed && real.feed.lines) || [];
  return {
    ...real,
    meta: { ...real.meta, last_update: nowIso, starting_capital_usd: 1000 },
    status, scout,
    positions: { run: 2, updated: nowIso, count: positions.length, positions },
    trades: { run: 2, updated: nowIso, count: trades.length, trades },
    prices: { run: 2, updated: nowIso, trades: prices },
    equity: { run: 2, starting_capital_usd: 1000, points: eqPts, realized_steps: steps },
    feed: { updated: nowIso, lines: [...realFeed, ...feed].sort((a, b) => Date.parse(a.t) - Date.parse(b.t)) },
  };
}
