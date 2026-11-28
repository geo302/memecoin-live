---
near_miss: "NM-0054"
symbol: "SAOF OIL"
contract: "0x86f74270ebac7AaC5126E6D4B0206d4b73188110"
detected_at: "2026-11-27T04:00:00-05:00"
failed_check: "F8"
failed_detail: "F8 FAIL recheck 25s [fresh dexscreener pairs, cf MISS, try 1]: price 6.056e-07->3.887e-07 (-35.8%, need >=-5%), liq $37,138->$28,032 (-24.5%, need >=-5%), 5m +32.97% (need +50..+150), buys/sells 64/26=2.46 (need >=2.3) | failed: price -35.8% < -5% vs scout, liq -24.5% < -5% vs scout, 5m now +32.97% outside +50..+150"
margin_diff: -30.82
margin_diff_pct: null
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 416.182
max_drawdown_pct: -35.816
chg_30m_pct: 416.182
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -37.087
hypothetical_outcome: "LOSS"
smart_wallet_count: 24
tags: ["near-miss", "failed/F8", "loss"]
---
# Near miss NM-0054 SAOFOIL

Coin: [[SAOFOIL-86f78110]]  ·  Failed only: [[Rule F8]]  ·  [[Near Misses]]

Never traded. Failed **F8**: F8 FAIL recheck 25s [fresh dexscreener pairs, cf MISS, try 1]: price 6.056e-07->3.887e-07 (-35.8%, need >=-5%), liq $37,138->$28,032 (-24.5%, need >=-5%), 5m +32.97% (need +50..+150), buys/sells 64/26=2.46 (need >=2.3) | failed: price -35.8% < -5% vs scout, liq -24.5% < -5% vs scout, 5m now +32.97% outside +50..+150

## All checks
- [[Rule F1]] PASS: 5m +107% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 0.90 (need >=0.82)
- [[Rule F3]] PASS: liq $37,138 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 60/22=2.73 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 15.36 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS contract safety ok, sell confirmed by GoPlus [hp no; not reported (non-blocking): GoPlus taxes, holders]
- [[Rule F8]] FAIL: F8 FAIL recheck 25s [fresh dexscreener pairs, cf MISS, try 1]: price 6.056e-07->3.887e-07 (-35.8%, need >=-5%), liq $37,138->$28,032 (-24.5%, need >=-5%), 5m +32.97% (need +50..+150), buys/sells 64/26=2.46 (need >=2.3) | failed: price -35.8% < -5% vs scout, liq -24.5% < -5% vs scout, 5m now +32.97% outside +50..+150

## 30-minute tracking
status done, max gain 416.182%, max drawdown -35.816%, 30m change 416.182%, first touch SL, hypothetical exit STOP -37.087% → LOSS
