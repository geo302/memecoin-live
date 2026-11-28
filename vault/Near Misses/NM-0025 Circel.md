---
near_miss: "NM-0025"
symbol: "Circel"
contract: "0xb200000000000000000000E5A88b9015e6254C01"
detected_at: "2026-11-24T16:11:56-05:00"
failed_check: "F7"
failed_detail: "F7 UNKNOWN GoPlus URLError: <urlopen error _ssl.c:1012: The handshake operation timed out> (fail closed)"
margin_diff: null
margin_diff_pct: null
f7_status: "UNKNOWN"
tracking_status: "done"
max_gain_pct: 5.622
max_drawdown_pct: -96.346
chg_30m_pct: -87.02
tp_before_sl: false
hypothetical_exit: "STOP"
hypothetical_pnl_pct: -21.761
hypothetical_outcome: "LOSS"
smart_wallet_count: 42
tags: ["near-miss", "failed/F7", "loss"]
---
# Near miss NM-0025 Circel

Coin: [[Circel-b2004c01]]  ·  Failed only: [[Rule F7]]  ·  [[Near Misses]]

Never traded. Failed **F7**: F7 UNKNOWN GoPlus URLError: <urlopen error _ssl.c:1012: The handshake operation timed out> (fail closed)

## All checks
- [[Rule F1]] PASS: 5m +103% (need +50..+150)
- [[Rule F2]] PASS: vol1h/liq 1.77 (need >=0.82)
- [[Rule F3]] PASS: liq $61,871 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] PASS: buys/sells 535/119=4.50 (need >=2.3)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 19.76 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] UNKNOWN: F7 UNKNOWN GoPlus URLError: <urlopen error _ssl.c:1012: The handshake operation timed out> (fail closed)

## 30-minute tracking
status done, max gain 5.622%, max drawdown -96.346%, 30m change -87.02%, first touch SL, hypothetical exit STOP -21.761% → LOSS
