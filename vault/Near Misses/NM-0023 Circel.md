---
near_miss: "NM-0023"
symbol: "Circel"
contract: "0xb200000000000000000000E5A88b9015e6254C01"
detected_at: "2026-11-24T14:25:16-05:00"
failed_check: "F3"
failed_detail: "liq $16,542 (need >=$26,000; filter (c) >=$20,000 FAIL)"
margin_diff: -9458
margin_diff_pct: -36.38
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 80.381
max_drawdown_pct: -39.574
chg_30m_pct: 80.381
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -14.434
hypothetical_outcome: "LOSS"
smart_wallet_count: 42
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0023 Circel

Coin: [[Circel-b2004c01]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $16,542 (need >=$26,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +57.53% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.26 (need >=0.82)
- [[Rule F3]] FAIL: liq $16,542 (need >=$26,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 166/45=3.69 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.63 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 80.381%, max drawdown -39.574%, 30m change 80.381%, first touch SL, hypothetical exit STOP -14.434% → LOSS
