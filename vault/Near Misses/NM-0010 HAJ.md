---
near_miss: "NM-0010"
symbol: "HAJ"
contract: "0x1F6dCE8488Db35650480b210D6C5498bEeAa4bee"
detected_at: "2026-11-23T20:54:28-05:00"
failed_check: "F4"
failed_detail: "buys/sells 798/719=1.11 (need >=2)"
margin_diff: -0.89
margin_diff_pct: -44.5
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 31.66
max_drawdown_pct: -51.689
chg_30m_pct: -51.689
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.819
hypothetical_outcome: "LOSS"
smart_wallet_count: 5
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0010 HAJ

Coin: [[HAJ-1f6d4bee]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 798/719=1.11 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +71.41% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 5.41 (need >=0.82)
- [[Rule F3]] PASS: liq $49,330 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 798/719=1.11 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.22 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [tax 0.0/0.0%, LP locked 0% (info only, not a gate), hp no; not reported: holders]

## 30-minute tracking
status done, max gain 31.66%, max drawdown -51.689%, 30m change -51.689%, first touch SL, hypothetical exit STOP -11.819% → LOSS
