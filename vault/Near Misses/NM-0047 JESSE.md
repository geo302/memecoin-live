---
near_miss: "NM-0047"
symbol: "JESSE"
contract: "0xB200000000000000000000F59ae8FE606ec55a01"
detected_at: "2026-11-26T13:05:26-05:00"
failed_check: "F3"
failed_detail: "liq $23,260 (need >=$30,000; filter (c) >=$20,000 ok)"
margin_diff: -6740
margin_diff_pct: -22.47
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 872.751
max_drawdown_pct: 0.0
chg_30m_pct: 732.18
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 45.207
hypothetical_outcome: "WIN"
smart_wallet_count: 75
tags: ["near-miss", "failed/F3", "win"]
---
# Near miss NM-0047 JESSE

Coin: [[JESSE-b2005a01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $23,260 (need >=$30,000; filter (c) >=$20,000 ok)

## All checks
- [[Rule F1]] PASS: 5m +50.98% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.40 (need >=0.82)
- [[Rule F3]] FAIL: liq $23,260 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 299/123=2.43 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 16.27 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 872.751%, max drawdown 0.0%, 30m change 732.18%, first touch TP, hypothetical exit TP 45.207% → WIN
