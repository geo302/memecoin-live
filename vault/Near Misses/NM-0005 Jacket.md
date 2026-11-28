---
near_miss: "NM-0005"
symbol: "Jacket"
contract: "0x9Ed50A01461850a474B52E2CF20B373B9CDdeb74"
detected_at: "2026-11-23T10:29:17-05:00"
failed_check: "F5"
failed_detail: "TP win #1 on same ticker/address <6h (filter (a) <2h FAIL)"
margin_diff: null
margin_diff_pct: null
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 459.094
max_drawdown_pct: -7.713
chg_30m_pct: 351.074
tp_before_sl: true
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: -4.275
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F5", "loss"]
---
# Near miss NM-0005 Jacket

Coin: [[Jacket-9ed5eb74]]  ·  Failed only: [[Rule F5]]  ·  [[Near Misses]]

Never traded. Failed **F5**: TP win #1 on same ticker/address <6h (filter (a) <2h FAIL)

## All checks
- [[Rule F1]] PASS: 5m +50.95% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 0.93 (need >=0.82)
- [[Rule F3]] PASS: liq $39,502 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 70/25=2.80 (need >=2)
- [[Rule F5]] FAIL: TP win #1 on same ticker/address <6h (filter (a) <2h FAIL)
- [[Rule b]] PASS: score 15.53 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## 30-minute tracking
status done, max gain 459.094%, max drawdown -7.713%, 30m change 351.074%, first touch TP, hypothetical exit BREAKEVEN -4.275% → LOSS
