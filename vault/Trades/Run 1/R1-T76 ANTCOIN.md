---
trade: 76
run: 1
symbol: "ANTCOIN"
name: "ANTHROPIC AI COIN"
contract: "0x9d1154a027302b9Cf8B218Aa8d1ecdA676dfe2d3"
pair: "0xf43e4b78eaf6b127527a49494d8bc1bf3bcd25814eb1e041de836ea662df075d"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after ~47 min). Sold at market -1%. Sold at market 2.554e-04 -1%"
entry_time: "2026-11-19T17:10:44-05:00"
exit_time: "2026-11-19T17:57:00.461037-05:00"
entry_price: 0.000258
exit_price: 0.000253
usd_in: 1.0
hold_time: "46m 16s"
setup: "fresh_launch|tight"
liquidity_at_entry: 252936.72
peak_price: 0.000258
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
# R1-T76 ANTCOIN

Coin: [[ANTCOIN-9d11e2d3]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $252,937
- [[Rule F4]] **PASS**: buys/sells 15/4=3.75
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.84
- [[Rule c]] **PASS**: liq $252,937


## Why I entered
fresh_launch: 1h +3.39% 5m +0%, 1h buys/sells 15/4, vol1h/liq 0.00, score 5.84; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after ~47 min). Sold at market -1%. Sold at market 2.554e-04 -1%

## Mistake
Entered a fresh_launch test with no follow-through; capital idle ~47 min

## Lesson
fresh_launch tests without strong 1h momentum keep going flat; cost is just fees. Keep them at $1 and prefer after_style.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xf43e4b78eaf6b127527a49494d8bc1bf3bcd25814eb1e041de836ea662df075d
