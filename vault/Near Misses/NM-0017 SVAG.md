---
near_miss: "NM-0017"
symbol: "SVAG"
contract: "0x515b919EB5BCA69c109C5BaF7343Ce2f00A0595f"
detected_at: "2026-11-24T08:36:18-05:00"
failed_check: "F1"
failed_detail: "5m +401% (need +50..+185)"
margin_diff: 216.0
margin_diff_pct: 116.76
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 279.633
max_drawdown_pct: -4.493
chg_30m_pct: 222.565
tp_before_sl: true
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: -0.019
hypothetical_outcome: "LOSS"
smart_wallet_count: 33
tags: ["near-miss", "failed/F1", "loss"]
---
# Near miss NM-0017 SVAG

Coin: [[SVAG-515b595f]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +401% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +401% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 0.92 (need >=0.82)
- [[Rule F3]] PASS: liq $40,829 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 81/30=2.70 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.32 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 279.633%, max drawdown -4.493%, 30m change 222.565%, first touch TP, hypothetical exit BREAKEVEN -0.019% → LOSS
