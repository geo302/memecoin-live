---
near_miss: "NM-0056"
symbol: "HEIMDALL"
contract: "0xcc3c0d31Fb0d90035102826CC19E9A564E37bB11"
detected_at: "2026-11-27T13:27:53-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.42 (need >=0.82)"
margin_diff: -0.396
margin_diff_pct: -48.29
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 0.0
max_drawdown_pct: -54.46
chg_30m_pct: -41.409
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -55.362
hypothetical_outcome: "LOSS"
smart_wallet_count: null
tags: ["near-miss", "failed/F2", "loss"]
---
# Near miss NM-0056 HEIMDALL

Coin: [[HEIMDALL-cc3cbb11]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.42 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +137% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.42 (need >=0.82)
- [[Rule F3]] PASS: liq $34,631 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 26/11=2.36 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.15 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## 30-minute tracking
status done, max gain 0.0%, max drawdown -54.46%, 30m change -41.409%, first touch SL, hypothetical exit STOP -55.362% → LOSS
