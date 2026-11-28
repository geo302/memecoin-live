---
near_miss: "NM-0014"
symbol: "ANSEM"
contract: "0x42f1e55Fa90a748a5d65425a0c94670a59f61B07"
detected_at: "2026-11-24T06:44:57-05:00"
failed_check: "F4"
failed_detail: "buys/sells 206/131=1.57 (need >=2)"
margin_diff: -0.427
margin_diff_pct: -21.35
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 60.95
max_drawdown_pct: -14.385
chg_30m_pct: 46.634
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.119
hypothetical_outcome: "LOSS"
smart_wallet_count: 80
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0014 ANSEM

Coin: [[ANSEM-42f11b07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 206/131=1.57 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +52.15% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.87 (need >=0.82)
- [[Rule F3]] PASS: liq $45,509 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 206/131=1.57 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.01 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: GoPlus taxes, holders) [hp no]

## 30-minute tracking
status done, max gain 60.95%, max drawdown -14.385%, 30m change 46.634%, first touch SL, hypothetical exit STOP -11.119% → LOSS
