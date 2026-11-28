---
near_miss: "NM-0009"
symbol: "HAJ"
contract: "0x1F6dCE8488Db35650480b210D6C5498bEeAa4bee"
detected_at: "2026-11-23T20:10:18-05:00"
failed_check: "F4"
failed_detail: "buys/sells 225/212=1.06 (need >=2)"
margin_diff: -0.939
margin_diff_pct: -46.95
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 44.653
max_drawdown_pct: -50.473
chg_30m_pct: -30.897
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 38.207
hypothetical_outcome: "WIN"
smart_wallet_count: 5
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0009 HAJ

Coin: [[HAJ-1f6d4bee]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 225/212=1.06 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +61.07% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.68 (need >=0.82)
- [[Rule F3]] PASS: liq $45,757 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 225/212=1.06 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 12.8 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## 30-minute tracking
status done, max gain 44.653%, max drawdown -50.473%, 30m change -30.897%, first touch TP, hypothetical exit TP 38.207% → WIN
