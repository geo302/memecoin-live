---
near_miss: "NM-0037"
symbol: "AGI"
contract: "0xe060cB1be2C7D3C0C69a5a00C44935306739d7D8"
detected_at: "2026-11-25T20:27:40-05:00"
failed_check: "F4"
failed_detail: "buys/sells 82/46=1.78 (need >=2.3)"
margin_diff: -0.517
margin_diff_pct: -22.48
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 247.931
max_drawdown_pct: 0.0
chg_30m_pct: 247.931
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 44.313
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F4", "win"]
---
# Near miss NM-0037 AGI

Coin: [[AGI-e060d7d8]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 82/46=1.78 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +107% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.05 (need >=0.82)
- [[Rule F3]] PASS: liq $30,017 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 82/46=1.78 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 13.61 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 247.931%, max drawdown 0.0%, 30m change 247.931%, first touch TP, hypothetical exit TP 44.313% → WIN
