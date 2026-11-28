---
near_miss: "NM-0055"
symbol: "RHINODINOS"
contract: "0xB200000000000000000000EB652560647eDFee01"
detected_at: "2026-11-27T07:43:03-05:00"
failed_check: "F3"
failed_detail: "liq $15,394 (need >=$30,000; filter (c) >=$20,000 FAIL)"
margin_diff: -14606
margin_diff_pct: -48.69
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 0.0
max_drawdown_pct: -81.145
chg_30m_pct: -81.145
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -81.519
hypothetical_outcome: "LOSS"
smart_wallet_count: 55
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0055 RHINODINOS

Coin: [[RHINODINOS-b200ee01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $15,394 (need >=$30,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +76.54% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.11 (need >=0.82)
- [[Rule F3]] FAIL: liq $15,394 (need >=$30,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 139/14=9.93 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 17.11 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 0.0%, max drawdown -81.145%, 30m change -81.145%, first touch SL, hypothetical exit STOP -81.519% → LOSS
