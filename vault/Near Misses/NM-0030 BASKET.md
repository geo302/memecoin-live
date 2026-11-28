---
near_miss: "NM-0030"
symbol: "BASKET"
contract: "0xc9458a0361ee793216aA9c8258955DBcCBF72B07"
detected_at: "2026-11-25T05:56:47-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.49 (need >=0.82)"
margin_diff: -0.332
margin_diff_pct: -40.49
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 116.373
max_drawdown_pct: 0.0
chg_30m_pct: 48.139
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 23.176
hypothetical_outcome: "WIN"
smart_wallet_count: 11
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0030 BASKET

Coin: [[BASKET-c9452b07]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.49 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +117% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.49 (need >=0.82)
- [[Rule F3]] PASS: liq $32,161 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 35/15=2.33 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.16 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 116.373%, max drawdown 0.0%, 30m change 48.139%, first touch TP, hypothetical exit TP 23.176% → WIN
