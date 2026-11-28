---
near_miss: "NM-0034"
symbol: "ROSTRUM"
contract: "0xB200000000000000000000C6c52211Df918B5d01"
detected_at: "2026-11-25T16:58:22-05:00"
failed_check: "F1"
failed_detail: "5m -3.12% (need +50..+150)"
margin_diff: -53.12
margin_diff_pct: -106.24
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 61.534
max_drawdown_pct: -32.92
chg_30m_pct: -27.67
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.117
hypothetical_outcome: "LOSS"
smart_wallet_count: 70
tags: ["near-miss", "failed/F1", "loss"]
---
# Near miss NM-0034 ROSTRUM

Coin: [[ROSTRUM-b2005d01]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m -3.12% (need +50..+150)

## All checks
- [[Rule F1]] FAIL: 5m -3.12% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.18 (need >=0.82)
- [[Rule F3]] PASS: liq $48,118 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 557/106=5.25 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.4 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [tax 0.0/0.0%, LP locked 0% (info only, not a gate), hp n/r]

## 30-minute tracking
status done, max gain 61.534%, max drawdown -32.92%, 30m change -27.67%, first touch SL, hypothetical exit STOP -11.117% → LOSS
