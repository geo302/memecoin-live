---
near_miss: "NM-0003"
symbol: "VVVCAT"
contract: "0x36dc406DEEAE039170BaE5F9850E7eD21B465CD7"
detected_at: "2026-11-23T05:34:20-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.79 (need >=0.82)"
margin_diff: -0.033
margin_diff_pct: -4.02
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 0.0
max_drawdown_pct: 0.0
chg_30m_pct: 0.0
tp_before_sl: false
hypothetical_exit: "F6_TIME"
hypothetical_pnl_pct: -1.98
hypothetical_outcome: "LOSS"
smart_wallet_count: 0
tags: ["near-miss", "failed/F2", "loss"]
---
# Near miss NM-0003 VVVCAT

Coin: [[VVVCAT-36dc5cd7]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.79 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +172% (need +50..+185)
- [[Rule F2]] FAIL: vol1h/liq 0.79 (need >=0.82)
- [[Rule F3]] PASS: liq $27,975 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 44/21=2.10 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.98 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders, LP lock (no lp_holders)]

## 30-minute tracking
status done, max gain 0.0%, max drawdown 0.0%, 30m change 0.0%, first touch neither, hypothetical exit F6_TIME -1.98% → LOSS
