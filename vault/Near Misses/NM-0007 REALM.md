---
near_miss: "NM-0007"
symbol: "REALM"
contract: "0xB99aaeEb6aE82325fa17EE83D90a95aE84602229"
detected_at: "2026-11-23T12:58:52-05:00"
failed_check: "F1"
failed_detail: "5m +379% (need +50..+185)"
margin_diff: 194.0
margin_diff_pct: 104.86
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 30.819
max_drawdown_pct: -14.527
chg_30m_pct: 10.387
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 28.229
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0007 REALM

Coin: [[REALM-b99a2229]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +379% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +379% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.01 (need >=0.82)
- [[Rule F3]] PASS: liq $32,383 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 82/40=2.05 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.11 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## 30-minute tracking
status done, max gain 30.819%, max drawdown -14.527%, 30m change 10.387%, first touch TP, hypothetical exit TP 28.229% → WIN
