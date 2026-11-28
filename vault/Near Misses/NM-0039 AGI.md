---
near_miss: "NM-0039"
symbol: "AGI"
contract: "0x00EE1090248C2c3aF4b4fAd74b4D55E5014C6f86"
detected_at: "2026-11-26T01:12:42-05:00"
failed_check: "F4"
failed_detail: "buys/sells 178/100=1.78 (need >=2.3)"
margin_diff: -0.52
margin_diff_pct: -22.61
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 160.752
max_drawdown_pct: -16.415
chg_30m_pct: 108.991
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -18.07
hypothetical_outcome: "LOSS"
smart_wallet_count: 20
tags: ["near-miss", "failed/F4", "loss"]
---
# Near miss NM-0039 AGI

Coin: [[AGI-00ee6f86]]  ·  Failed only: [[Rule F4]]  ·  [[Near Misses]]

Never traded. Failed **F4**: buys/sells 178/100=1.78 (need >=2.3)

## All checks
- [[Rule F1]] PASS: 5m +69.72% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 2.09 (need >=0.82)
- [[Rule F3]] PASS: liq $53,567 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] FAIL: buys/sells 178/100=1.78 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.65 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 160.752%, max drawdown -16.415%, 30m change 108.991%, first touch SL, hypothetical exit STOP -18.07% → LOSS
