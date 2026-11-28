---
trade: 91
run: 1
symbol: "XDP"
name: "Doppler"
contract: "0xd0f3b2ba576756E13D26e2E6E6589751AdA3052A"
pair: "0xb54c912d7312c761ae633af7899e4cb55b3c49b001bc0792411db48989d83724"
result: "loss"
pnl_usd: -0.072673
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (XDP ~-1% after 79 min, peak only +0%, no momentum, 5m flat). Sold at market 3.001e-07 -1%"
entry_time: "2026-11-20T05:18:05-05:00"
exit_time: "2026-11-20T06:37:22.088780-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 3.67
hold_time: "1h 19m 17s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 23677.06
peak_price: 0.0
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T91 XDP

Coin: [[XDP-d0f3052a]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0727)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +243.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.76
- [[Rule F3]] **FAIL**: liq $23,677
- [[Rule F4]] **PASS**: buys/sells 32/16=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 13.76
- [[Rule c]] **PASS**: liq $23,677


## Why I entered
winner_pattern: 1h +243% 5m +243%, 1h buys/sells 32/16, vol1h/liq 0.76, score 13.76; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Discretionary exit: 45-minute flat time stop (XDP ~-1% after 79 min, peak only +0%, no momentum, 5m flat). Sold at market 3.001e-07 -1%

## Mistake
5m==1h single-candle move, no follow-through; flat 79 min.

## Lesson
Exit at 45-min flat time stop.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xb54c912d7312c761ae633af7899e4cb55b3c49b001bc0792411db48989d83724
