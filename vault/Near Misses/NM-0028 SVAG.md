---
near_miss: "NM-0028"
symbol: "SVAG"
contract: "0x90ddec6B40A538D4B3456106Fc6745886c85995e"
detected_at: "2026-11-24T23:57:14-05:00"
failed_check: "F4"
failed_detail: "buys/sells 104/48=2.17 (need >=2.3)"
margin_diff: -0.133
margin_diff_pct: -5.78
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 73.132
max_drawdown_pct: -13.669
chg_30m_pct: -11.201
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.494
hypothetical_outcome: "LOSS"
smart_wallet_count: 40
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0028 SVAG

Coin: [[SVAG-90dd995e]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 104/48=2.17 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +122% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.46 (need >=0.82)
- [[Rule F3]] PASS: liq $33,130 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 104/48=2.17 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.8 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [tax 0.0/0.0%, hp n/r]

## 30-minute tracking
status done, max gain 73.132%, max drawdown -13.669%, 30m change -11.201%, first touch SL, hypothetical exit STOP -11.494% → LOSS
