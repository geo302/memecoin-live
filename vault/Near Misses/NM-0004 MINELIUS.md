---
near_miss: "NM-0004"
symbol: "MINELIUS"
contract: "0x3FC9D4CA2F25d4c47D7Ece7Af203988375A80Ba6"
detected_at: "2026-11-23T06:02:53-05:00"
failed_check: "F5"
failed_detail: "TP win #0 on same ticker/address <6h (filter (a) <2h FAIL)"
margin_diff: null
margin_diff_pct: null
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 170.237
max_drawdown_pct: -14.81
chg_30m_pct: 119.923
tp_before_sl: false
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: -16.497
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F5", "loss"]
---
# Near miss NM-0004 MINELIUS

Coin: [[MINELIUS-3fc90ba6]]  ·  Failed only: [[Rule F5]]  ·  [[Near Misses]]

Never traded. Failed **F5**: TP win #0 on same ticker/address <6h (filter (a) <2h FAIL)

## All checks
- [[Rule F1]] PASS: 5m +58.31% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.35 (need >=0.82)
- [[Rule F3]] PASS: liq $37,577 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 72/27=2.67 (need >=2)
- [[Rule F5]] FAIL: TP win #0 on same ticker/address <6h (filter (a) <2h FAIL)
- [[Rule b]] PASS: score 15.68 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders, LP lock (no lp_holders)]

## 30-minute tracking
status done, max gain 170.237%, max drawdown -14.81%, 30m change 119.923%, first touch SL, hypothetical exit BREAKEVEN -16.497% → LOSS
