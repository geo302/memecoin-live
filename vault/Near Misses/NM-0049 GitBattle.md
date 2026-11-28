---
near_miss: "NM-0049"
symbol: "GitBattle"
contract: "0xb200000000000000000000C1eaA83ABFAc274701"
detected_at: "2026-11-26T14:38:05-05:00"
failed_check: "F3"
failed_detail: "liq $14,263 (need >=$30,000; filter (c) >=$20,000 FAIL)"
margin_diff: -15737
margin_diff_pct: -52.46
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 102.899
max_drawdown_pct: -80.44
chg_30m_pct: -80.44
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 24.206
hypothetical_outcome: "WIN"
smart_wallet_count: 19
tags: ["near-miss", "failed/F3", "win"]
---
# Near miss NM-0049 GitBattle

Coin: [[GitBattle-b2004701]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $14,263 (need >=$30,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +148% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.92 (need >=0.82)
- [[Rule F3]] FAIL: liq $14,263 (need >=$30,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 87/17=5.12 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 12.92 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 102.899%, max drawdown -80.44%, 30m change -80.44%, first touch TP, hypothetical exit TP 24.206% → WIN
