---
near_miss: "NM-0044"
symbol: "JESSE"
contract: "0xb200000000000000000000b35393A98c96BFea45"
detected_at: "2026-11-26T12:35:09-05:00"
failed_check: "F4"
failed_detail: "buys/sells 217/136=1.60 (need >=2.3)"
margin_diff: -0.704
margin_diff_pct: -30.61
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 222.615
max_drawdown_pct: 0.0
chg_30m_pct: 20.911
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 40.914
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0044 JESSE

Coin: [[JESSE-b200ea45]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 217/136=1.60 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +112% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.24 (need >=0.82)
- [[Rule F3]] PASS: liq $39,474 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 217/136=1.60 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.43 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 222.615%, max drawdown 0.0%, 30m change 20.911%, first touch TP, hypothetical exit TP 40.914% → WIN
