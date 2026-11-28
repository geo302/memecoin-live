---
near_miss: "NM-0035"
symbol: "ROSTRUM"
contract: "0xB200000000000000000000C6c52211Df918B5d01"
detected_at: "2026-11-25T17:43:19-05:00"
failed_check: "WP"
failed_detail: "winner_pattern unmet: 1h -8.27% < +100%"
margin_diff: null
margin_diff_pct: null
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 4.417
max_drawdown_pct: -88.146
chg_30m_pct: -88.146
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -15.537
hypothetical_outcome: "LOSS"
smart_wallet_count: 70
tags: ["near-miss", "failed/WP", "loss"]
---
# Near miss NM-0035 ROSTRUM

Coin: [[ROSTRUM-b2005d01]]  ·  Failed only: [[Rule WP]]  ·  [[Near Misses]]

Never traded. Failed **WP**: winner_pattern unmet: 1h -8.27% < +100%

## All checks
- [[Rule F1]] PASS: 5m +53.95% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.88 (need >=0.82)
- [[Rule F3]] PASS: liq $43,050 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 1629/132=12.34 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.05 (need >=12)
- [[Rule WP]] FAIL: winner_pattern unmet: 1h -8.27% < +100%
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [tax 0.0/0.0%, LP locked 0% (info only, not a gate), hp n/r]

## 30-minute tracking
status done, max gain 4.417%, max drawdown -88.146%, 30m change -88.146%, first touch SL, hypothetical exit STOP -15.537% → LOSS
