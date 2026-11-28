---
near_miss: "NM-0048"
symbol: "BULL"
contract: "0xB20000000000000000000093162f1c73D0166908"
detected_at: "2026-11-26T13:29:57-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.30 (need >=0.82)"
margin_diff: -0.52
margin_diff_pct: -63.41
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 94.422
max_drawdown_pct: 0.0
chg_30m_pct: 94.422
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 52.303
hypothetical_outcome: "WIN"
smart_wallet_count: null
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0048 BULL

Coin: [[BULL-b2006908]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.30 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +104% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.30 (need >=0.82)
- [[Rule F3]] PASS: liq $32,016 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 25/10=2.50 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.3 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 94.422%, max drawdown 0.0%, 30m change 94.422%, first touch TP, hypothetical exit TP 52.303% → WIN
