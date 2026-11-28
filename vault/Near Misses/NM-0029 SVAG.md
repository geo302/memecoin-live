---
near_miss: "NM-0029"
symbol: "SVAG"
contract: "0x175aBCf568C0eD13AcC8139E9e16aF0De0133ba4"
detected_at: "2026-11-25T02:44:58-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.72 (need >=0.82)"
margin_diff: -0.103
margin_diff_pct: -12.56
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 110.775
max_drawdown_pct: 0.0
chg_30m_pct: 50.266
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 20.733
hypothetical_outcome: "WIN"
smart_wallet_count: 25
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0029 SVAG

Coin: [[SVAG-175a3ba4]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.72 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +147% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.72 (need >=0.82)
- [[Rule F3]] PASS: liq $35,680 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 50/14=3.57 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 16.86 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 110.775%, max drawdown 0.0%, 30m change 50.266%, first touch TP, hypothetical exit TP 20.733% → WIN
