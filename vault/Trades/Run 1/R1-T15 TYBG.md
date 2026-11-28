---
trade: 15
run: 1
symbol: "TYBG"
name: "Base God"
contract: "0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE"
pair: "0xF65BB528cED09008603509c3fDa43e1cCfdDF935"
result: "loss"
pnl_usd: -0.005935
pnl_pct: -0.105037
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 4.688e-06 -1%"
entry_time: "2026-11-19T00:19:37-05:00"
exit_time: "2026-11-19T07:25:43.870937-05:00"
entry_price: 5e-06
exit_price: 5e-06
usd_in: 5.65
hold_time: "7h 06m 06s"
setup: "weak_drift|wide"
liquidity_at_entry: 113662.33
peak_price: 5e-06
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
# R1-T15 TYBG

Coin: [[TYBG-0d9738de]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -0.11% ($-0.0059)  ·  setup `weak_drift|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $113,662
- [[Rule F4]] **PASS**: buys/sells 5/1=5.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.13
- [[Rule c]] **PASS**: liq $113,662


## Why I entered
weak_drift: 1h +1.26% 5m +0%, 1h buys/sells 5/1, vol1h/liq 0.00, score 2.13; wide plan SL -15% TP +35% trail 12%; size 7% equity

## Exit
Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 4.688e-06 -1%

## Mistake
Dead money: the position sat within about 3% of entry for hours and tied up a slot.

## Lesson
Bankroll #1. 45-min flat time stop applied at the first run after the outage. Large/mid-liq tokens overnight barely move; size these small or skip them at night.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xf65bb528ced09008603509c3fda43e1ccfddf935
