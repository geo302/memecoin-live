---
near_miss: "NM-0046"
symbol: "JESSE"
contract: "0xb200000000000000000000E88F296f96a42C5201"
detected_at: "2026-11-26T12:58:17-05:00"
failed_check: "F3"
failed_detail: "liq $24,280 (need >=$30,000; filter (c) >=$20,000 ok)"
margin_diff: -5720
margin_diff_pct: -19.07
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 0.0
max_drawdown_pct: -91.929
chg_30m_pct: -91.929
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -92.089
hypothetical_outcome: "LOSS"
smart_wallet_count: 3
tags: ["near-miss", "failed/F3", "loss"]
---
# Near miss NM-0046 JESSE

Coin: [[JESSE-b2005201]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $24,280 (need >=$30,000; filter (c) >=$20,000 ok)

## All checks
- [[Rule F1]] PASS: 5m +144% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.19 (need >=0.82)
- [[Rule F3]] FAIL: liq $24,280 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 207/36=5.75 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 20.19 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 0.0%, max drawdown -91.929%, 30m change -91.929%, first touch SL, hypothetical exit STOP -92.089% → LOSS
