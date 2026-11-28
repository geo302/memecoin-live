---
near_miss: "NM-0040"
symbol: "XTASK"
contract: "0xf7D8bCf8292250aADB19A42D09Df4bA7893e11a8"
detected_at: "2026-11-26T11:11:25-05:00"
failed_check: "F4"
failed_detail: "buys/sells 89/53=1.68 (need >=2.3)"
margin_diff: -0.621
margin_diff_pct: -27.0
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 291.324
max_drawdown_pct: -29.405
chg_30m_pct: 260.465
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -26.244
hypothetical_outcome: "LOSS"
smart_wallet_count: 38
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0040 XTASK

Coin: [[XTASK-f7d811a8]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 89/53=1.68 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +87.53% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.23 (need >=0.82)
- [[Rule F3]] PASS: liq $34,960 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 89/53=1.68 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.59 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 291.324%, max drawdown -29.405%, 30m change 260.465%, first touch SL, hypothetical exit STOP -26.244% → LOSS
