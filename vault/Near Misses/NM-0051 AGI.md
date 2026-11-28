---
near_miss: "NM-0051"
symbol: "AGI"
contract: "0x8158F4889Eb6dDa80162ce966910cC0FDfD84149"
detected_at: "2026-11-26T15:17:03-05:00"
failed_check: "F4"
failed_detail: "buys/sells 311/271=1.15 (need >=2.3)"
margin_diff: -1.152
margin_diff_pct: -50.09
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 3.552
max_drawdown_pct: -98.968
chg_30m_pct: -98.968
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.363
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0051 AGI

Coin: [[AGI-81584149]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 311/271=1.15 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +72.11% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.61 (need >=0.82)
- [[Rule F3]] PASS: liq $31,950 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 311/271=1.15 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.9 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 3.552%, max drawdown -98.968%, 30m change -98.968%, first touch SL, hypothetical exit STOP -11.363% → LOSS
