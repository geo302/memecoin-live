---
near_miss: "NM-0031"
symbol: "SVAG"
contract: "0x2B4e4aF7A6B9ecB7eC0fcADc81bB99B1B02cB9BA"
detected_at: "2026-11-25T07:48:33-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.78 (need >=0.82)"
margin_diff: -0.041
margin_diff_pct: -5.0
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 72.318
max_drawdown_pct: 0.0
chg_30m_pct: 55.127
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 27.498
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0031 SVAG

Coin: [[SVAG-2b4eb9ba]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.78 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +104% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.78 (need >=0.82)
- [[Rule F3]] PASS: liq $30,856 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 74/29=2.55 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.88 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [tax 0.0/0.0%, LP locked 0% (info only, not a gate), hp no; not reported (non-blocking): holders]

## 30-minute tracking
status done, max gain 72.318%, max drawdown 0.0%, 30m change 55.127%, first touch TP, hypothetical exit TP 27.498% → WIN
