---
near_miss: "NM-0006"
symbol: "Lucia"
contract: "0x7B67D63bDCA34fDed70e3Cb6Ef08af7e87073f95"
detected_at: "2026-11-23T11:08:54-05:00"
failed_check: "F1"
failed_detail: "5m +218% (need +50..+185)"
margin_diff: 33.0
margin_diff_pct: 17.84
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 367.332
max_drawdown_pct: -0.879
chg_30m_pct: 306.985
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 82.416
hypothetical_outcome: "WIN"
smart_wallet_count: 14
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0006 Lucia

Coin: [[Lucia-7b673f95]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +218% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +218% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.23 (need >=0.82)
- [[Rule F3]] PASS: liq $34,012 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 52/13=4.00 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 18.23 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## 30-minute tracking
status done, max gain 367.332%, max drawdown -0.879%, 30m change 306.985%, first touch TP, hypothetical exit TP 82.416% → WIN
