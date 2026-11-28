---
near_miss: "NM-0019"
symbol: "SVAG"
contract: "0xb200000000000000000000210ff96BDff80a1501"
detected_at: "2026-11-24T09:21:52-05:00"
failed_check: "F1"
failed_detail: "5m +21.15% (need +50..+185)"
margin_diff: -28.85
margin_diff_pct: -57.7
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 76.225
max_drawdown_pct: -67.366
chg_30m_pct: -62.464
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 26.757
hypothetical_outcome: "WIN"
smart_wallet_count: null
tags: ["near-miss", "failed/F1", "win"]
---
# Near miss NM-0019 SVAG

Coin: [[SVAG-b2001501]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +21.15% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +21.15% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.59 (need >=0.82)
- [[Rule F3]] PASS: liq $54,762 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 411/104=3.95 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 18.49 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 76.225%, max drawdown -67.366%, 30m change -62.464%, first touch TP, hypothetical exit TP 26.757% → WIN
