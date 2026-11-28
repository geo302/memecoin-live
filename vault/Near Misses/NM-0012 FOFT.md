---
near_miss: "NM-0012"
symbol: "FOFT"
contract: "0x8C88b34d33d655b1C33242E5f8af64Fed0961C9a"
detected_at: "2026-11-24T02:26:41-05:00"
failed_check: "F1"
failed_detail: "5m +324% (need +50..+185)"
margin_diff: 139.0
margin_diff_pct: 75.14
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 640.607
max_drawdown_pct: 0.0
chg_30m_pct: 498.664
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 48.025
hypothetical_outcome: "WIN"
smart_wallet_count: 40
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0012 FOFT

Coin: [[FOFT-8c881c9a]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +324% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +324% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.11 (need >=0.82)
- [[Rule F3]] PASS: liq $26,441 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 60/17=3.53 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 17.17 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 640.607%, max drawdown 0.0%, 30m change 498.664%, first touch TP, hypothetical exit TP 48.025% → WIN
