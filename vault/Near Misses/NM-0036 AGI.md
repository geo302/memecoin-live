---
near_miss: "NM-0036"
symbol: "AGI"
contract: "0x76a58B43f79c47B416567b847475f11a0d7CA601"
detected_at: "2026-11-25T20:25:54-05:00"
failed_check: "F4"
failed_detail: "buys/sells 537/353=1.52 (need >=2.3)"
margin_diff: -0.779
margin_diff_pct: -33.87
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 168.43
max_drawdown_pct: -29.11
chg_30m_pct: 168.43
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -17.593
hypothetical_outcome: "LOSS"
smart_wallet_count: 28
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0036 AGI

Coin: [[AGI-76a5a601]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 537/353=1.52 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +82.37% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.84 (need >=0.82)
- [[Rule F3]] PASS: liq $36,260 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 537/353=1.52 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.88 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 168.43%, max drawdown -29.11%, 30m change 168.43%, first touch SL, hypothetical exit STOP -17.593% → LOSS
