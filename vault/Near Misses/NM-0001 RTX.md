---
near_miss: "NM-0001"
symbol: "RTX"
contract: "0x0FB288F46AEdb9477a9720d4421fab7096896B07"
detected_at: "2026-11-23T04:42:08-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.35 (need >=0.82)"
margin_diff: -0.473
margin_diff_pct: -57.68
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 48.823
max_drawdown_pct: -5.008
chg_30m_pct: 28.462
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 20.338
hypothetical_outcome: "WIN"
smart_wallet_count: null
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0001 RTX

Coin: [[RTX-0fb26b07]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.35 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +108% (need +50..+185)
- [[Rule F2]] FAIL: vol1h/liq 0.35 (need >=0.82)
- [[Rule F3]] PASS: liq $33,168 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 38/18=2.11 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.57 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp no; not reported: GoPlus taxes, holders, LP lock (no lp_holders)]

## 30-minute tracking
status done, max gain 48.823%, max drawdown -5.008%, 30m change 28.462%, first touch TP, hypothetical exit TP 20.338% → WIN
