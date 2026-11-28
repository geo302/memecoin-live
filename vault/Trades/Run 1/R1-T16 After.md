---
trade: 16
run: 1
symbol: "After"
name: "After GTA 6"
contract: "0x96d2EB1dB64ada959358a4640103C1De8B583b07"
pair: "0x57e18559c301a72781955826b2db3f2f32adaa61ac15f628bc170a321cbd96c4"
result: "win"
pnl_usd: 1.050846
pnl_pct: 26.140457
exit_type: "TP"
exit_reason: "Take-profit hit (price 4.701e-07 >= target 4.058e-07)"
entry_time: "2026-11-19T00:30:25-05:00"
exit_time: "2026-11-19T00:31:43.271518-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 4.02
hold_time: "1m 18s"
setup: "fresh_launch|tight"
liquidity_at_entry: 33304.42
peak_price: 0.0
max_drawdown_pct: -3.256905
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T16 After

Coin: [[After-96d23b07]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +26.14% ($+1.0508)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +19.63%
- [[Rule F2]] **FAIL**: vol1h/liq 0.72
- [[Rule F3]] **PASS**: liq $33,304
- [[Rule F4]] **PASS**: buys/sells 42/21=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 13.63
- [[Rule c]] **PASS**: liq $33,304


## Why I entered
fresh_launch: 1h +103% 5m +19.63%, 1h buys/sells 42/21, vol1h/liq 0.72, score 13.63; tight plan SL -6% TP +10% trail 5%; size 5% equity

## Exit
Take-profit hit (price 4.701e-07 >= target 4.058e-07)

## Mistake
None on entry. Possibly left upside on the table with a fixed take-profit instead of trailing once it ran.

## Lesson
Bankroll #1. First win: fresh_launch with real momentum (1h +103%, 5m +19.6%, 42/21 buys/sells, vol1h/liq 0.72) hit its tight-plan TP in minutes. High vol/liq plus strong 5m momentum is the first setup with a positive sample (1/1). Next time test a trailing stop after TP instead of a full exit.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0x57e18559c301a72781955826b2db3f2f32adaa61ac15f628bc170a321cbd96c4
