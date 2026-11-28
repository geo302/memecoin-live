---
near_miss: "NM-0053"
symbol: "Snowball"
contract: "0x9519780AEE18901F8a3f2DdBCE4391B288cCaB07"
detected_at: "2026-11-26T17:27:03-05:00"
failed_check: "F4"
failed_detail: "buys/sells 103/55=1.87 (need >=2.3)"
margin_diff: -0.427
margin_diff_pct: -18.57
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 297.574
max_drawdown_pct: -4.344
chg_30m_pct: 296.472
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 29.382
hypothetical_outcome: "WIN"
smart_wallet_count: 54
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0053 Snowball

Coin: [[Snowball-9519ab07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 103/55=1.87 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +52.36% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.90 (need >=0.82)
- [[Rule F3]] PASS: liq $38,529 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 103/55=1.87 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.65 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 297.574%, max drawdown -4.344%, 30m change 296.472%, first touch TP, hypothetical exit TP 29.382% → WIN
