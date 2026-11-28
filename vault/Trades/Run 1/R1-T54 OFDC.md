---
trade: 54
run: 1
symbol: "OFDC"
name: "OIL $ GAS SEVELOPMENT COMPANY"
contract: "0x0352D5021eA597AfE21AcfE33eb8aF5a406A3c13"
pair: "0x44b269d226308c9e2d29bb006dbf07c740014a5c5250ef8c4da86571f019d2a5"
result: "loss"
pnl_usd: -0.027836
pnl_pct: -2.783639
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 0.001089 -1%"
entry_time: "2026-11-19T09:35:08-05:00"
exit_time: "2026-11-19T10:18:32.035357-05:00"
entry_price: 0.001109
exit_price: 0.001078
usd_in: 1.0
hold_time: "43m 24s"
setup: "fresh_launch|mid"
liquidity_at_entry: 1647205.12
peak_price: 0.001109
max_drawdown_pct: -1.801656
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
# R1-T54 OFDC

Coin: [[OFDC-03523c13]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.78% ($-0.0278)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.03%
- [[Rule F2]] **FAIL**: vol1h/liq 0.04
- [[Rule F3]] **PASS**: liq $1,647,205
- [[Rule F4]] **PASS**: buys/sells 8/4=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.04
- [[Rule c]] **PASS**: liq $1,647,205


## Why I entered
fresh_launch: 1h +0.1% 5m -0.03%, 1h buys/sells 8/4, vol1h/liq 0.04, score 2.04; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 0.001089 -1%

## Mistake
Entered a slow, high-liquidity 'oil index' fresh_launch on a $1 test; it never moved in 45 minutes

## Lesson
Bankroll #1: deep-liquidity (>$1M) fresh launches with no 1h momentum tend to sit flat; tests should favor coins with live 1h volume/liq flow

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x44b269d226308c9e2d29bb006dbf07c740014a5c5250ef8c4da86571f019d2a5
