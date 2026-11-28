---
trade: 80
run: 1
symbol: "GI"
name: "GIANT"
contract: "0x7361f72Ed815760cA7e0A1f4888DeCB6a2E0a68C"
pair: "0x889316c819a68151bda1f14367c3f6bf9c367ec2c5f9ebc40e2209fb0450305a"
result: "win"
pnl_usd: 0.315004
pnl_pct: 31.500427
exit_type: "TP"
exit_reason: "Take-profit hit (price 7.981e-05 >= target 7.210e-05)"
entry_time: "2026-11-19T19:55:36-05:00"
exit_time: "2026-11-19T20:00:18.334482-05:00"
entry_price: 6e-05
exit_price: 7.9e-05
usd_in: 1.0
hold_time: "4m 42s"
setup: "fresh_launch|mid"
liquidity_at_entry: 36907.86
peak_price: 8e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T80 GI

Coin: [[GI-7361a68c]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +31.50% ($+0.3150)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +7.68%
- [[Rule F2]] **PASS**: vol1h/liq 1.1
- [[Rule F3]] **PASS**: liq $36,908
- [[Rule F4]] **PASS**: buys/sells 93/43=2.16
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 11.35
- [[Rule c]] **PASS**: liq $36,908


## Why I entered
fresh_launch: 1h +564% 5m +7.68%, 1h buys/sells 93/43, vol1h/liq 1.10, score 11.35; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Take-profit hit (price 7.981e-05 >= target 7.210e-05)

## Mistake
No real mistake; fixed +20% take-profit (mid plan) capped a coin still printing new highs at exit (exit at the peak 7.981e-05)

## Lesson
Bankroll #1: fresh_launch with strong flow (vol1h/liq 1.10, buys 2.2x sells, 5m +7.7% not vertical, liq $37k) worked: +31.5% in under 5 min. Such flow-heavy fresh launches over $25k liq should get the trail plan (no fixed TP) so winners can run.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Trailing stops]], [[Lesson - Chasing pumps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x889316c819a68151bda1f14367c3f6bf9c367ec2c5f9ebc40e2209fb0450305a
