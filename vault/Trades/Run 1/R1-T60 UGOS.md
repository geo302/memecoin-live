---
trade: 60
run: 1
symbol: "UGOS"
name: "United Global Oil Supply"
contract: "0xDC71433728589f8396229350ba581Ea9c4E47238"
pair: "0xbe1d7f9dba8f1ea2415f36ec23909de1b1f6f214d949df77540d01a2d8c56b30"
result: "loss"
pnl_usd: -0.028668
pnl_pct: -2.866809
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner fresh_launch|tight $1 test, ~48 min held, drifting about -2%, no momentum). Sold at market -1%.. Sold at market 3.944e-07 -1%"
entry_time: "2026-11-19T11:34:30-05:00"
exit_time: "2026-11-19T12:22:20.584589-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 1.0
hold_time: "47m 50s"
setup: "fresh_launch|tight"
liquidity_at_entry: 35294.27
peak_price: 0.0
max_drawdown_pct: -2.084681
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
# R1-T60 UGOS

Coin: [[UGOS-dc717238]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.87% ($-0.0287)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.12%
- [[Rule F2]] **FAIL**: vol1h/liq 0.25
- [[Rule F3]] **PASS**: liq $35,294
- [[Rule F4]] **PASS**: buys/sells 10/3=3.33
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 4.96
- [[Rule c]] **PASS**: liq $35,294


## Why I entered
fresh_launch: 1h +0.06% 5m +0.12%, 1h buys/sells 10/3, vol1h/liq 0.25, score 4.96; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner fresh_launch|tight $1 test, ~48 min held, drifting about -2%, no momentum). Sold at market -1%.. Sold at market 3.944e-07 -1%

## Mistake
Fresh launch with no follow-through; tied up a test slot for 45+ min for a small loss.

## Lesson
Fresh-launch tests without early momentum in the first 15 min rarely recover; time stop works as a cheap cap. Bankroll #1.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xbe1d7f9dba8f1ea2415f36ec23909de1b1f6f214d949df77540d01a2d8c56b30
