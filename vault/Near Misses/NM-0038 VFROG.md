---
near_miss: "NM-0038"
symbol: "VFROG"
contract: "0xEf0F1A4C41a6Ec50126626B33Cc9F265acb1FfEA"
detected_at: "2026-11-25T21:13:43-05:00"
failed_check: "F4"
failed_detail: "buys/sells 95/44=2.16 (need >=2.3)"
margin_diff: -0.141
margin_diff_pct: -6.13
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 316.882
max_drawdown_pct: -1.261
chg_30m_pct: 316.882
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 19.24
hypothetical_outcome: "WIN"
smart_wallet_count: 23
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0038 VFROG

Coin: [[VFROG-ef0fffea]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 95/44=2.16 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +110% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.96 (need >=0.82)
- [[Rule F3]] PASS: liq $45,606 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 95/44=2.16 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.28 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 316.882%, max drawdown -1.261%, 30m change 316.882%, first touch TP, hypothetical exit TP 19.24% → WIN
