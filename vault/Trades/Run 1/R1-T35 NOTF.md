---
trade: 35
run: 1
symbol: "NOTF"
name: "NOTF"
contract: "0x32f82CbEae4e3d545496ca3DE6C98b95516521Ae"
pair: "0x866da41a2f5a4c16b4ae629a3d141174d49f5cd16e57715463d53c9a75a7a864"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: static-pool fresh_launch (liq $1.8M) never traded above entry in 46 min. Sold at market 0.001211 -1%"
entry_time: "2026-11-19T08:09:59-05:00"
exit_time: "2026-11-19T08:56:36.871768-05:00"
entry_price: 0.001223
exit_price: 0.001199
usd_in: 1.0
hold_time: "46m 37s"
setup: "fresh_launch|mid"
liquidity_at_entry: 1818038.78
peak_price: 0.001223
max_drawdown_pct: -1.317134
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
# R1-T35 NOTF

Coin: [[NOTF-32f821ae]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.1%
- [[Rule F2]] **FAIL**: vol1h/liq 0.26
- [[Rule F3]] **PASS**: liq $1,818,039
- [[Rule F4]] **PASS**: buys/sells 18/9=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.37
- [[Rule c]] **PASS**: liq $1,818,039


## Why I entered
fresh_launch: 1h +0.94% 5m +0.1%, 1h buys/sells 18/9, vol1h/liq 0.26, score 2.37; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: static-pool fresh_launch (liq $1.8M) never traded above entry in 46 min. Sold at market 0.001211 -1%

## Mistake
Entered a static multi-$M-liquidity fresh_launch pool that never moves; capital idle 46 min

## Lesson
Bankroll #1. Static-pool fresh launches (liq>1M, ~0 volume) are now -20 scored; this one predates enough evidence. Keep avoiding them.

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x866da41a2f5a4c16b4ae629a3d141174d49f5cd16e57715463d53c9a75a7a864
