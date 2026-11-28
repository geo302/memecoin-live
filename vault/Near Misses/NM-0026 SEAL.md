---
near_miss: "NM-0026"
symbol: "SEAL"
contract: "0xB2000000000000000000002204bc24696bD62a01"
detected_at: "2026-11-24T18:23:32-05:00"
failed_check: "F3"
failed_detail: "liq $16,203 (need >=$26,000; filter (c) >=$20,000 FAIL)"
margin_diff: -9797
margin_diff_pct: -37.68
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 171.6
max_drawdown_pct: -15.033
chg_30m_pct: 65.595
tp_before_sl: false
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: -7.487
hypothetical_outcome: "LOSS"
smart_wallet_count: 34
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0026 SEAL

Coin: [[SEAL-b2002a01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $16,203 (need >=$26,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +86.15% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.97 (need >=0.82)
- [[Rule F3]] FAIL: liq $16,203 (need >=$26,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 116/28=4.14 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.25 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 171.6%, max drawdown -15.033%, 30m change 65.595%, first touch SL, hypothetical exit BREAKEVEN -7.487% → LOSS
