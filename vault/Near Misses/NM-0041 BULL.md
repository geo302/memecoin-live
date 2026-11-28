---
near_miss: "NM-0041"
symbol: "BULL"
contract: "0xbdE3eEa1a7E8C9F9c5f588e3E8d8094c57871b01"
detected_at: "2026-11-26T12:24:22-05:00"
failed_check: "F4"
failed_detail: "buys/sells 852/653=1.30 (need >=2.3)"
margin_diff: -0.995
margin_diff_pct: -43.26
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 39.613
max_drawdown_pct: -68.39
chg_30m_pct: -48.697
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 19.464
hypothetical_outcome: "WIN"
smart_wallet_count: 15
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0041 BULL

Coin: [[BULL-bde31b01]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 852/653=1.30 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +132% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 4.27 (need >=0.82)
- [[Rule F3]] PASS: liq $34,542 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 852/653=1.30 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.61 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 39.613%, max drawdown -68.39%, 30m change -48.697%, first touch TP, hypothetical exit TP 19.464% → WIN
