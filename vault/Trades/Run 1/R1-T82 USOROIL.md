---
trade: 82
run: 1
symbol: "USOR OIL"
name: "U.S. Oil Reserve (USOR)"
contract: "0x15E7f14B7D41140cb567c723D8310fFf0f624355"
pair: "0x7d7d35c6e17d7e1ffb8266d6520c9d2c4928fbb7c4337a054ec90184460f13dc"
result: "loss"
pnl_usd: -0.015231
pnl_pct: -1.523128
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner test, ~-0.5% after 47m, no momentum). Sold at market 9.049e-04 -1%"
entry_time: "2026-11-19T20:01:35-05:00"
exit_time: "2026-11-19T20:48:29.543385-05:00"
entry_price: 0.00091
exit_price: 0.000896
usd_in: 1.0
hold_time: "46m 54s"
setup: "fresh_launch|tight"
liquidity_at_entry: 1351337.21
peak_price: 0.00091
max_drawdown_pct: -1.067047
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T82 USOROIL

Coin: [[USOROIL-15e74355]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.52% ($-0.0152)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.26%
- [[Rule F2]] **FAIL**: vol1h/liq 0.02
- [[Rule F3]] **PASS**: liq $1,351,337
- [[Rule F4]] **FAIL**: buys/sells 16/9=1.78
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.67
- [[Rule c]] **PASS**: liq $1,351,337


## Why I entered
fresh_launch: 1h +0.25% 5m +0.26%, 1h buys/sells 16/9, vol1h/liq 0.02, score 1.67; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner test, ~-0.5% after 47m, no momentum). Sold at market 9.049e-04 -1%

## Mistake
Entered a fresh_launch with near-zero momentum (1h +0.25%, vol1h/liq 0.02); capital sat idle for 47 minutes

## Lesson
Bankroll #1: fresh_launch tests with vol1h/liq under ~0.1 and 1h change under +5% go nowhere; require real volume relative to liquidity before even a $1 test

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x7d7d35c6e17d7e1ffb8266d6520c9d2c4928fbb7c4337a054ec90184460f13dc
