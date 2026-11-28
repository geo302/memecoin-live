---
near_miss: "NM-0027"
symbol: "CASHY"
contract: "0xbF1BC7711cC0b47499407A815F2ECe883e22cb07"
detected_at: "2026-11-24T19:18:45-05:00"
failed_check: "F4"
failed_detail: "buys/sells 81/40=2.02 (need >=2.3)"
margin_diff: -0.275
margin_diff_pct: -11.96
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 62.121
max_drawdown_pct: -20.769
chg_30m_pct: 10.624
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 19.927
hypothetical_outcome: "WIN"
smart_wallet_count: 48
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0027 CASHY

Coin: [[CASHY-bf1bcb07]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 81/40=2.02 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +77.46% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.84 (need >=0.82)
- [[Rule F3]] PASS: liq $39,994 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 81/40=2.02 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.89 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [tax 0.0/0.0%, hp no; not reported (non-blocking): holders]

## 30-minute tracking
status done, max gain 62.121%, max drawdown -20.769%, 30m change 10.624%, first touch TP, hypothetical exit TP 19.927% → WIN
