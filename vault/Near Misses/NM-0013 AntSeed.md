---
near_miss: "NM-0013"
symbol: "AntSeed"
contract: "0x3b8aD1a93fd3C2059cdF09FE4eb3FBFf6788fB07"
detected_at: "2026-11-24T03:11:39-05:00"
failed_check: "F4"
failed_detail: "buys/sells 114/71=1.61 (need >=2)"
margin_diff: -0.394
margin_diff_pct: -19.7
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 70.438
max_drawdown_pct: -22.109
chg_30m_pct: 48.758
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -16.634
hypothetical_outcome: "LOSS"
smart_wallet_count: 57
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0013 AntSeed

Coin: [[AntSeed-3b8afb07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 114/71=1.61 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +50.1% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.04 (need >=0.82)
- [[Rule F3]] PASS: liq $37,839 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 114/71=1.61 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.25 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: GoPlus taxes, holders) [hp no]

## 30-minute tracking
status done, max gain 70.438%, max drawdown -22.109%, 30m change 48.758%, first touch SL, hypothetical exit STOP -16.634% → LOSS
