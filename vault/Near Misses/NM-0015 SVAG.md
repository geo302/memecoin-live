---
near_miss: "NM-0015"
symbol: "SVAG"
contract: "0xb200000000000000000000c6BFaaf26aAd50f901"
detected_at: "2026-11-24T08:05:00-05:00"
failed_check: "F4"
failed_detail: "buys/sells 587/451=1.30 (need >=2)"
margin_diff: -0.698
margin_diff_pct: -34.9
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 18.506
max_drawdown_pct: -68.983
chg_30m_pct: -39.641
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -14.929
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0015 SVAG

Coin: [[SVAG-b200f901]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 587/451=1.30 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +59.75% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 2.75 (need >=0.82)
- [[Rule F3]] PASS: liq $34,800 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 587/451=1.30 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.35 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 18.506%, max drawdown -68.983%, 30m change -39.641%, first touch SL, hypothetical exit STOP -14.929% → LOSS
