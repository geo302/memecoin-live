---
near_miss: "NM-0033"
symbol: "ROSTRUM"
contract: "0xB200000000000000000000C6c52211Df918B5d01"
detected_at: "2026-11-25T16:28:09-05:00"
failed_check: "F3"
failed_detail: "liq $26,804 (need >=$30,000; filter (c) >=$20,000 ok)"
margin_diff: -3196
margin_diff_pct: -10.65
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 233.108
max_drawdown_pct: -4.162
chg_30m_pct: 182.355
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 20.191
hypothetical_outcome: "WIN"
smart_wallet_count: 70
tags: ["near-miss", "failed/F3", "win"]
---
# Near miss NM-0033 ROSTRUM

Coin: [[ROSTRUM-b2005d01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $26,804 (need >=$30,000; filter (c) >=$20,000 ok)

## All checks
- [[Rule F1]] PASS: 5m +80.01% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.53 (need >=0.82)
- [[Rule F3]] FAIL: liq $26,804 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 182/34=5.35 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 20.53 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 233.108%, max drawdown -4.162%, 30m change 182.355%, first touch TP, hypothetical exit TP 20.191% → WIN
