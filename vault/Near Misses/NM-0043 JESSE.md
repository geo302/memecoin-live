---
near_miss: "NM-0043"
symbol: "JESSE"
contract: "0x8614393Efd9C3e73F76991eBD9eFd37eF4B71001"
detected_at: "2026-11-26T12:31:30-05:00"
failed_check: "F4"
failed_detail: "buys/sells 414/326=1.27 (need >=2.3)"
margin_diff: -1.03
margin_diff_pct: -44.78
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 0.0
max_drawdown_pct: -91.969
chg_30m_pct: -90.643
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -32.212
hypothetical_outcome: "LOSS"
smart_wallet_count: 17
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0043 JESSE

Coin: [[JESSE-86141001]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 414/326=1.27 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +84.78% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.96 (need >=0.82)
- [[Rule F3]] PASS: liq $30,003 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 414/326=1.27 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.5 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 0.0%, max drawdown -91.969%, 30m change -90.643%, first touch SL, hypothetical exit STOP -32.212% → LOSS
