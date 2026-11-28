---
near_miss: "NM-0018"
symbol: "SVAG"
contract: "0x037EED48b22e417323BA0528007a3b7Ca6f69545"
detected_at: "2026-11-24T08:51:48-05:00"
failed_check: "F4"
failed_detail: "buys/sells 406/252=1.61 (need >=2)"
margin_diff: -0.389
margin_diff_pct: -19.45
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 52.087
max_drawdown_pct: -14.612
chg_30m_pct: 13.35
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -11.259
hypothetical_outcome: "LOSS"
smart_wallet_count: 18
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0018 SVAG

Coin: [[SVAG-037e9545]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 406/252=1.61 (need >=2)

## All checks
- [[Rule F1]] PASS: 5m +59.4% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 3.43 (need >=0.82)
- [[Rule F3]] PASS: liq $71,642 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 406/252=1.61 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.22 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 52.087%, max drawdown -14.612%, 30m change 13.35%, first touch SL, hypothetical exit STOP -11.259% → LOSS
