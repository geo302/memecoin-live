---
near_miss: "NM-0016"
symbol: "SVAG"
contract: "0x037EED48b22e417323BA0528007a3b7Ca6f69545"
detected_at: "2026-11-24T08:21:25-05:00"
failed_check: "F1"
failed_detail: "5m +405% (need +50..+185)"
margin_diff: 220.0
margin_diff_pct: 118.92
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 467.216
max_drawdown_pct: 0.0
chg_30m_pct: 339.78
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 51.781
hypothetical_outcome: "WIN"
smart_wallet_count: 16
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0016 SVAG

Coin: [[SVAG-037e9545]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +405% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +405% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.24 (need >=0.82)
- [[Rule F3]] PASS: liq $27,309 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 61/26=2.35 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.93 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 467.216%, max drawdown 0.0%, 30m change 339.78%, first touch TP, hypothetical exit TP 51.781% → WIN
