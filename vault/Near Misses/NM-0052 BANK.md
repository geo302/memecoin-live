---
near_miss: "NM-0052"
symbol: "BANK"
contract: "0xB200000000000000000000761b5cE65F6d80569C"
detected_at: "2026-11-26T17:15:18-05:00"
failed_check: "F1"
failed_detail: "5m +347% (need +50..+150)"
margin_diff: 197.0
margin_diff_pct: 131.33
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 343.136
max_drawdown_pct: 0.0
chg_30m_pct: 136.421
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 37.424
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0052 BANK

Coin: [[BANK-b200569c]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +347% (need +50..+150)

## All checks
- [[Rule F1]] FAIL: 5m +347% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.07 (need >=0.82)
- [[Rule F3]] PASS: liq $40,118 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 63/24=2.62 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.32 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 343.136%, max drawdown 0.0%, 30m change 136.421%, first touch TP, hypothetical exit TP 37.424% → WIN
