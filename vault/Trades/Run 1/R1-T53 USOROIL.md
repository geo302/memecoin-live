---
trade: 53
run: 1
symbol: "USOR OIL"
name: "U.S. Oil Reserve (USOR)"
contract: "0x07e57F45ED65084Bc29F3Cc6317FFf77ee88fFcc"
pair: "0x40145e76b5951402029b2e2a2a4ed9444bfdd5ee694d1a414804a57a451679bc"
result: "loss"
pnl_usd: -0.027095
pnl_pct: -2.709496
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 8.938e-04 -1%"
entry_time: "2026-11-19T09:31:27-05:00"
exit_time: "2026-11-19T10:18:32.035357-05:00"
entry_price: 0.00091
exit_price: 0.000885
usd_in: 1.0
hold_time: "47m 05s"
setup: "fresh_launch|tight"
liquidity_at_entry: 1350955.75
peak_price: 0.00091
max_drawdown_pct: -1.770743
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
# R1-T53 USOROIL

Coin: [[USOROIL-07e5ffcc]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.71% ($-0.0271)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.02%
- [[Rule F2]] **FAIL**: vol1h/liq 0.02
- [[Rule F3]] **PASS**: liq $1,350,956
- [[Rule F4]] **PASS**: buys/sells 5/1=5.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.02
- [[Rule c]] **PASS**: liq $1,350,956


## Why I entered
fresh_launch: 1h +0.07% 5m -0.02%, 1h buys/sells 5/1, vol1h/liq 0.02, score 5.02; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 8.938e-04 -1%

## Mistake
Entered a slow, high-liquidity 'oil index' fresh_launch on a $1 test; it never moved in 45 minutes

## Lesson
Bankroll #1: deep-liquidity (>$1M) fresh launches with no 1h momentum tend to sit flat; tests should favor coins with live 1h volume/liq flow

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x40145e76b5951402029b2e2a2a4ed9444bfdd5ee694d1a414804a57a451679bc
