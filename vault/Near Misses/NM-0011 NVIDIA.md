---
near_miss: "NM-0011"
symbol: "NVIDIA"
contract: "0x2f75C159FB5367dD687137431aFC50a40d979B07"
detected_at: "2026-11-23T21:04:30-05:00"
failed_check: "F4"
failed_detail: "buys/sells 79/51=1.55 (need >=2)"
margin_diff: -0.451
margin_diff_pct: -22.55
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 11.26
max_drawdown_pct: -29.412
chg_30m_pct: -4.786
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -30.81
hypothetical_outcome: "LOSS"
smart_wallet_count: 42
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0011 NVIDIA

Coin: [[NVIDIA-2f759b07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 79/51=1.55 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +70.58% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 0.83 (need >=0.82)
- [[Rule F3]] PASS: liq $45,462 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 79/51=1.55 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 12.93 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [tax 0.0/0.0%, hp no; not reported: holders]

## 30-minute tracking
status done, max gain 11.26%, max drawdown -29.412%, 30m change -4.786%, first touch SL, hypothetical exit STOP -30.81% → LOSS
