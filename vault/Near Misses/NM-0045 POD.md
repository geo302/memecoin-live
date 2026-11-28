---
near_miss: "NM-0045"
symbol: "POD"
contract: "0x56a92c2453578897C0682c2D46488DC217e57D4e"
detected_at: "2026-11-26T12:35:38-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.10 (need >=0.82)"
margin_diff: -0.724
margin_diff_pct: -88.29
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 38.801
max_drawdown_pct: -6.309
chg_30m_pct: 1.174
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 20.489
hypothetical_outcome: "WIN"
smart_wallet_count: null
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0045 POD

Coin: [[POD-56a97d4e]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.10 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +129% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.10 (need >=0.82)
- [[Rule F3]] PASS: liq $56,132 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 46/4=11.50 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 19.1 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 38.801%, max drawdown -6.309%, 30m change 1.174%, first touch TP, hypothetical exit TP 20.489% → WIN
