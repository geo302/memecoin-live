---
near_miss: "NM-0057"
symbol: "HEIMDALL"
contract: "0xd099F1D27e347EF9E8BcEFec604DD7d1F317b897"
detected_at: "2026-11-27T13:35:46-05:00"
failed_check: "F2"
failed_detail: "vol1h/liq 0.26 (need >=0.82)"
margin_diff: -0.559
margin_diff_pct: -68.17
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 14.95
max_drawdown_pct: 0.0
chg_30m_pct: 14.95
tp_before_sl: false
hypothetical_exit: "TIME_30M"
hypothetical_pnl_pct: 12.674
hypothetical_outcome: "WIN"
smart_wallet_count: null
tags: ["near-miss", "failed/F2", "win"]
---
# Near miss NM-0057 HEIMDALL

Coin: [[HEIMDALL-d099b897]]  ·  Failed only: [[Rule F2]]  ·  [[Near Misses]]

Never traded. Failed **F2**: vol1h/liq 0.26 (need >=0.82)

## All checks
- [[Rule F1]] PASS: 5m +122% (need +50..+150)
- [[Rule F2]] FAIL: vol1h/liq 0.26 (need >=0.82)
- [[Rule F3]] PASS: liq $33,002 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 26/3=8.67 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 19.26 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]

## 30-minute tracking
status done, max gain 14.95%, max drawdown 0.0%, 30m change 14.95%, first touch neither, hypothetical exit TIME_30M 12.674% → WIN
