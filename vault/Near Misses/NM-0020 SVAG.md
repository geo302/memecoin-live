---
near_miss: "NM-0020"
symbol: "SVAG"
contract: "0xb200000000000000000000210ff96BDff80a1501"
detected_at: "2026-11-24T09:52:42-05:00"
failed_check: "F1"
failed_detail: "5m +13.69% (need +50..+185)"
margin_diff: -36.31
margin_diff_pct: -72.62
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 5.006
max_drawdown_pct: -73.54
chg_30m_pct: -54.857
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -36.598
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F1", "loss"]
---
# Near miss NM-0020 SVAG

Coin: [[SVAG-b2001501]]  ·  Failed only: [[Rule F1]]  ·  [[Near Misses]]

Never traded. Failed **F1**: 5m +13.69% (need +50..+185)

## All checks
- [[Rule F1]] FAIL: 5m +13.69% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 4.83 (need >=0.82)
- [[Rule F3]] PASS: liq $31,717 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 589/173=3.40 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 17.23 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 5.006%, max drawdown -73.54%, 30m change -54.857%, first touch SL, hypothetical exit STOP -36.598% → LOSS
