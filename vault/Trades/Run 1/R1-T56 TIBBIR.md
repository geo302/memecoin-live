---
trade: 56
run: 1
symbol: "TIBBIR"
name: "Ribbita by Virtuals"
contract: "0xA4A2E2ca3fBfE21aed83471D28b6f65A233C6e00"
pair: "0x0c3b466104545efa096b8f944c1e524E1d0D4888"
result: "loss"
pnl_usd: -0.027374
pnl_pct: -2.737373
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: Discretionary exit: 45-minute flat time stop (non-runner weak_drift test, ~46 min held, price flat around -2%, no momentum). Sold at market -1%. Sold at market 0.1413 -1%"
entry_time: "2026-11-19T10:35:17-05:00"
exit_time: "2026-11-19T11:19:50.414407-05:00"
entry_price: 0.143824
exit_price: 0.139887
usd_in: 1.0
hold_time: "44m 33s"
setup: "weak_drift|tight"
liquidity_at_entry: 2036642.79
peak_price: 0.143824
max_drawdown_pct: -2.172099
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
# R1-T56 TIBBIR

Coin: [[TIBBIR-a4a26e00]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.74% ($-0.0274)  ·  setup `weak_drift|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.56%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $2,036,643
- [[Rule F4]] **PASS**: buys/sells 18/4=4.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.68
- [[Rule c]] **PASS**: liq $2,036,643


## Why I entered
weak_drift: 1h -1.78% 5m -0.56%, 1h buys/sells 18/4, vol1h/liq 0.00, score 3.68; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: Discretionary exit: 45-minute flat time stop (non-runner weak_drift test, ~46 min held, price flat around -2%, no momentum). Sold at market -1%. Sold at market 0.1413 -1%

## Mistake
Bought a large-cap drifting coin (1h -1.78%, vol1h/liq 0.00) with no catalyst; it never moved off entry

## Lesson
Bankroll #1: weak_drift tests on deep, slow pools (vol1h/liq ~0) just bleed fees; skip weak_drift tests unless vol1h/liq >= 0.1 and 1h is positive

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x0c3b466104545efa096b8f944c1e524e1d0d4888
