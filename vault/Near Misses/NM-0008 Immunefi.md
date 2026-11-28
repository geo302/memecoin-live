---
near_miss: "NM-0008"
symbol: "Immunefi"
contract: "0xce4d7F0cfaA085d733e05fB5190942Ae9459Bb07"
detected_at: "2026-11-23T19:24:40-05:00"
failed_check: "F4"
failed_detail: "buys/sells 111/73=1.52 (need >=2)"
margin_diff: -0.479
margin_diff_pct: -23.95
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 49.192
max_drawdown_pct: -22.267
chg_30m_pct: 26.712
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -17.844
hypothetical_outcome: "LOSS"
smart_wallet_count: 42
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0008 Immunefi

Coin: [[Immunefi-ce4dbb07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 111/73=1.52 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +64.14% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 0.83 (need >=0.82)
- [[Rule F3]] PASS: liq $39,604 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 111/73=1.52 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 12.87 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp no; not reported: GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 49.192%, max drawdown -22.267%, 30m change 26.712%, first touch SL, hypothetical exit STOP -17.844% → LOSS
