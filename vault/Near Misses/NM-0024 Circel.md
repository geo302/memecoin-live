---
near_miss: "NM-0024"
symbol: "Circel"
contract: "0xb200000000000000000000E5A88b9015e6254C01"
detected_at: "2026-11-24T14:55:31-05:00"
failed_check: "F3"
failed_detail: "liq $24,512 (need >=$26,000; filter (c) >=$20,000 ok)"
margin_diff: -1488
margin_diff_pct: -5.72
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 60.757
max_drawdown_pct: 0.0
chg_30m_pct: 20.568
tp_before_sl: true
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: 0.5
hypothetical_outcome: "WIN"
smart_wallet_count: 42
tags: ["near-miss", "failed/F3", "win"]
---
# Near miss NM-0024 Circel

Coin: [[Circel-b2004c01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $24,512 (need >=$26,000; filter (c) >=$20,000 ok)

## All checks
- [[Rule F1]] PASS: 5m +69.29% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.85 (need >=0.82)
- [[Rule F3]] FAIL: liq $24,512 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 513/161=3.19 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 18.23 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 60.757%, max drawdown 0.0%, 30m change 20.568%, first touch TP, hypothetical exit BREAKEVEN 0.5% → WIN
