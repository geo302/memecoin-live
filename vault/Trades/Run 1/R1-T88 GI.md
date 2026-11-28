---
trade: 88
run: 1
symbol: "GI"
name: "GIANT"
contract: "0x84cBE2EB2ac9Ac69965c42446341128be6eEe70e"
pair: "0x691a2207dac4b2db46982367597739a42e7321f24681a06d91b1bee9e8cd448e"
result: "win"
pnl_usd: 0.155463
pnl_pct: 15.546344
exit_type: "TP"
exit_reason: "Take-profit hit (price 8.610e-05 >= target 8.115e-05)"
entry_time: "2026-11-20T00:48:32-05:00"
exit_time: "2026-11-20T00:50:22.498058-05:00"
entry_price: 7.4e-05
exit_price: 8.5e-05
usd_in: 1.0
hold_time: "1m 50s"
setup: "fresh_launch|tight"
liquidity_at_entry: 38092.49
peak_price: 8.6e-05
max_drawdown_pct: -3.009879
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T88 GI

Coin: [[GI-84cbe70e]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +15.55% ($+0.1555)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +29.22%
- [[Rule F2]] **PASS**: vol1h/liq 1.07
- [[Rule F3]] **PASS**: liq $38,092
- [[Rule F4]] **FAIL**: buys/sells 93/48=1.94
- [[Rule F5]] **FAIL**: TP win #80 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 13.94
- [[Rule c]] **PASS**: liq $38,092


## Why I entered
fresh_launch: 1h +957% 5m +29.22%, 1h buys/sells 93/48, vol1h/liq 1.07, score 13.94; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Take-profit hit (price 8.610e-05 >= target 8.115e-05)

## Mistake
None - take-profit hit for +15.5% (net of 1% fees).

## Lesson
Bankroll #1. Fast TP in 1m50s; momentum pops reward tight targets.

Lesson topics: [[Lesson - What worked (wins)]]

DexScreener: https://dexscreener.com/base/0x691a2207dac4b2db46982367597739a42e7321f24681a06d91b1bee9e8cd448e
