---
trade: 50
run: 1
symbol: "RST"
name: "RST"
contract: "0x50C41d81dbc1749d0D82c4F3e199aB6eeA392970"
pair: "0x866c0b534b1df836970f08fbe920eaa0bbbbfa047f7ffd653433136269913b27"
result: "loss"
pnl_usd: -0.016214
pnl_pct: -1.62137
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: fresh_launch test never traded above entry (peak = entry) in 47 min. Sold at market 1.645e-06 -1%"
entry_time: "2026-11-19T09:17:30-05:00"
exit_time: "2026-11-19T10:05:06.378787-05:00"
entry_price: 2e-06
exit_price: 2e-06
usd_in: 1.0
hold_time: "47m 36s"
setup: "fresh_launch|tight"
liquidity_at_entry: 146158.14
peak_price: 2e-06
max_drawdown_pct: -1.533778
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
# R1-T50 RST

Coin: [[RST-50c42970]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.62% ($-0.0162)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +6.89%
- [[Rule F2]] **FAIL**: vol1h/liq 0.31
- [[Rule F3]] **PASS**: liq $146,158
- [[Rule F4]] **PASS**: buys/sells 6/2=3.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.72
- [[Rule c]] **PASS**: liq $146,158


## Why I entered
fresh_launch: 1h +6.89% 5m +6.89%, 1h buys/sells 6/2, vol1h/liq 0.31, score 3.72; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: fresh_launch test never traded above entry (peak = entry) in 47 min. Sold at market 1.645e-06 -1%

## Mistake
Fresh_launch test with only 6/2 buys and +6.9% 1h at entry; never moved, lost the round-trip slippage. Bankroll 1.

## Lesson
Bankroll 1: thin-flow tests (under ~10 buys/h) do not move; require at least 10 1h buys for any test.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x866c0b534b1df836970f08fbe920eaa0bbbbfa047f7ffd653433136269913b27
