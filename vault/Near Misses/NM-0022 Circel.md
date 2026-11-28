---
near_miss: "NM-0022"
symbol: "Circel"
contract: "0xB200000000000000000000E8B1d601f62f563401"
detected_at: "2026-11-24T13:42:10-05:00"
failed_check: "F3"
failed_detail: "liq $15,680 (need >=$26,000; filter (c) >=$20,000 FAIL)"
margin_diff: -10320
margin_diff_pct: -39.69
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 7.884
max_drawdown_pct: -83.444
chg_30m_pct: -83.378
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -83.771
hypothetical_outcome: "LOSS"
smart_wallet_count: 15
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0022 Circel

Coin: [[Circel-b2003401]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $15,680 (need >=$26,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +110% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.17 (need >=0.82)
- [[Rule F3]] FAIL: liq $15,680 (need >=$26,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 100/24=4.17 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.5 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 7.884%, max drawdown -83.444%, 30m change -83.378%, first touch SL, hypothetical exit STOP -83.771% → LOSS
