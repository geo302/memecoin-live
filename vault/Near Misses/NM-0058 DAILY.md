---
near_miss: "NM-0058"
symbol: "DAILY"
contract: "0x5eC98E5a4e663414dA01bBD03D351c374183CCcC"
detected_at: "2026-11-27T15:11:38-05:00"
failed_check: "F3"
failed_detail: "liq $23,359 (need >=$30,000; filter (c) >=$20,000 ok)"
margin_diff: -6641
margin_diff_pct: -22.14
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 1.295
max_drawdown_pct: -34.671
chg_30m_pct: -13.949
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.449
hypothetical_outcome: "LOSS"
smart_wallet_count: 10
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0058 DAILY

Coin: [[DAILY-5ec9cccc]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $23,359 (need >=$30,000; filter (c) >=$20,000 ok)

## All checks
- [[Rule F1]] PASS: 5m +92.68% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.84 (need >=0.82)
- [[Rule F3]] FAIL: liq $23,359 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 101/40=2.52 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.89 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 1.295%, max drawdown -34.671%, 30m change -13.949%, first touch SL, hypothetical exit STOP -11.449% → LOSS
