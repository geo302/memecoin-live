---
near_miss: "NM-0042"
symbol: "BULL"
contract: "0x56ADed664F675eC815E3AF81D63f0f0e05A8E09c"
detected_at: "2026-11-26T12:25:16-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.78 (need >=0.82)"
margin_diff: -0.037
margin_diff_pct: -4.51
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 83.221
max_drawdown_pct: -21.409
chg_30m_pct: 83.221
tp_before_sl: false
hypothetical_exit: "BREAKEVEN"
hypothetical_pnl_pct: -12.857
hypothetical_outcome: "LOSS"
smart_wallet_count: 4
tags: ["near-miss", "failed/F2", "loss"]
---
# Near miss NM-0042 BULL

Coin: [[BULL-56ade09c]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.78 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +106% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.78 (need >=0.82)
- [[Rule F3]] PASS: liq $53,265 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 94/40=2.35 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 14.48 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 83.221%, max drawdown -21.409%, 30m change 83.221%, first touch SL, hypothetical exit BREAKEVEN -12.857% → LOSS
