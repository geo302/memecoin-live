---
trade: 59
run: 1
symbol: "USAR"
name: "United States Asset Reserve"
contract: "0xcA1E551fed64537339AC502a044d1EbAF1A3403C"
pair: "0xa74aed9816b25dabf2c76f124f0b7dd54de64a28ecd9a5863fb098b3d81ce7e1"
result: "loss"
pnl_usd: -0.029185
pnl_pct: -2.918451
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: Discretionary exit: 45-minute flat time stop (non-runner fresh_launch test, ~46 min held, slow drift to about -2%, no momentum). Sold at market -1%. Sold at market 1.759e-06 -1%"
entry_time: "2026-11-19T11:23:59-05:00"
exit_time: "2026-11-19T12:10:36.616098-05:00"
entry_price: 2e-06
exit_price: 2e-06
usd_in: 1.0
hold_time: "46m 37s"
setup: "fresh_launch|wide"
liquidity_at_entry: 156192.32
peak_price: 2e-06
max_drawdown_pct: -2.160824
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
# R1-T59 USAR

Coin: [[USAR-ca1e403c]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.92% ($-0.0292)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.03%
- [[Rule F2]] **FAIL**: vol1h/liq 0.15
- [[Rule F3]] **PASS**: liq $156,192
- [[Rule F4]] **PASS**: buys/sells 12/3=4.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.15
- [[Rule c]] **PASS**: liq $156,192


## Why I entered
fresh_launch: 1h -0.09% 5m +0.03%, 1h buys/sells 12/3, vol1h/liq 0.15, score 6.15; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: Discretionary exit: 45-minute flat time stop (non-runner fresh_launch test, ~46 min held, slow drift to about -2%, no momentum). Sold at market -1%. Sold at market 1.759e-06 -1%

## Mistake
Bought a flat fresh launch (1h -0.09%, 5m +0.03%, 12/3 buys/sells) that broke the 11:07 lesson #55; round.py did not enforce that rule yet

## Lesson
Bankroll #1: confirms lesson #55 again; flat fresh launches just bleed fees. round.py now hard-passes fresh_launch with 1h <= 0 (11:25 change)

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xa74aed9816b25dabf2c76f124f0b7dd54de64a28ecd9a5863fb098b3d81ce7e1
