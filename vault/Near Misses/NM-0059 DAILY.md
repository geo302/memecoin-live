---
near_miss: "NM-0059"
symbol: "DAILY"
contract: "0xb2000000000000000000009453c54E6d73bD9EFf"
detected_at: "2026-11-27T15:18:45-05:00"
failed_check: "F1"
failed_detail: "5m +564% (need +50..+150)"
margin_diff: 414.0
margin_diff_pct: 276.0
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 378.44
max_drawdown_pct: -10.073
chg_30m_pct: 68.903
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.854
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F1", "loss"]
---
# Near miss NM-0059 DAILY

Coin: [[DAILY-b2009eff]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +564% (need +50..+150)

## All checks
- [[Rule F1]] FAIL: 5m +564% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.91 (need >=0.82)
- [[Rule F3]] PASS: liq $35,056 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 34/14=2.43 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.76 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 378.44%, max drawdown -10.073%, 30m change 68.903%, first touch SL, hypothetical exit STOP -11.854% → LOSS
