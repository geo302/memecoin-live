---
near_miss: "NM-0002"
symbol: "AUTO"
contract: "0xfF04145e8b503D6621915a8ce454c610b525Cb07"
detected_at: "2026-11-23T05:13:25-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.79 (need >=0.82)"
margin_diff: -0.028
margin_diff_pct: -3.41
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 43.014
max_drawdown_pct: -18.284
chg_30m_pct: 27.69
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -12.754
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F2", "loss"]
---
# Near miss NM-0002 AUTO

Coin: [[AUTO-ff04cb07]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.79 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +57.95% (need +50..+185)
- [[Rule F2]] FAIL: vol1h/liq 0.79 (need >=0.82)
- [[Rule F3]] PASS: liq $39,895 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 112/56=2.00 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.79 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp no; not reported: GoPlus taxes, holders, LP lock (no lp_holders)]

## 30-minute tracking
status done, max gain 43.014%, max drawdown -18.284%, 30m change 27.69%, first touch SL, hypothetical exit STOP -12.754% → LOSS
