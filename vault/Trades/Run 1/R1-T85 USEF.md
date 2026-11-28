---
trade: 85
run: 1
symbol: "USEF"
name: "United States Energy Fund"
contract: "0x8807725032F6000d94aE7048C8893D1AEA75A5ac"
pair: "0x26ee4d25fd61c5df3d0524151f78db85a297bef529e627c40b9296f7c6529884"
result: "loss"
pnl_usd: -0.020467
pnl_pct: -2.046652
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within ~1% of entry after ~46 min). Sold at market -1%. Sold at market 1.474e-06 -1%"
entry_time: "2026-11-19T22:19:23-05:00"
exit_time: "2026-11-19T23:05:27.941024-05:00"
entry_price: 1e-06
exit_price: 1e-06
usd_in: 1.0
hold_time: "46m 04s"
setup: "fresh_launch|tight"
liquidity_at_entry: 132784.65
peak_price: 1e-06
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T85 USEF

Coin: [[USEF-8807a5ac]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.05% ($-0.0205)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.44%
- [[Rule F2]] **FAIL**: vol1h/liq 0.26
- [[Rule F3]] **PASS**: liq $132,785
- [[Rule F4]] **PASS**: buys/sells 14/4=3.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.61
- [[Rule c]] **PASS**: liq $132,785


## Why I entered
fresh_launch: 1h +12.37% 5m +0.44%, 1h buys/sells 14/4, vol1h/liq 0.26, score 6.61; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within ~1% of entry after ~46 min). Sold at market -1%. Sold at market 1.474e-06 -1%

## Mistake
Entered a fresh_launch with weak flow (vol1h/liq 0.26, 1h +12%) that never moved; capital tied up for 46 min.

## Lesson
Bankroll #1. Low-flow fresh_launch tests (vol1h/liq < 0.3) keep going flat; consider requiring vol1h/liq >= 0.3 for fresh_launch tests.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x26ee4d25fd61c5df3d0524151f78db85a297bef529e627c40b9296f7c6529884
