---
trade: 34
run: 1
symbol: "ABX"
name: "Alpha Base Index"
contract: "0xeBcda5b80f62DD4DD2A96357b42BB6Facbf30267"
pair: "0xE207FAb5839CA5bCc0d930761755cC7d82C1f19c"
result: "loss"
pnl_usd: -0.009073
pnl_pct: -0.907344
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: weak_drift test still within 0.1% of entry after 45 min. Sold at market 0.001016 -1%"
entry_time: "2026-11-19T08:05:01-05:00"
exit_time: "2026-11-19T08:49:33.445400-05:00"
entry_price: 0.001015
exit_price: 0.001006
usd_in: 1.0
hold_time: "44m 32s"
setup: "weak_drift|tight"
liquidity_at_entry: 70128.93
peak_price: 0.001016
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
# R1-T34 ABX

Coin: [[ABX-ebcd0267]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -0.91% ($-0.0091)  ·  setup `weak_drift|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.83%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $70,129
- [[Rule F4]] **PASS**: buys/sells 5/0=5.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.42
- [[Rule c]] **PASS**: liq $70,129


## Why I entered
weak_drift: 1h +2.07% 5m +0.83%, 1h buys/sells 5/0, vol1h/liq 0.01, score 2.42; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: weak_drift test still within 0.1% of entry after 45 min. Sold at market 0.001016 -1%

## Mistake
weak_drift test in a quiet pool never moved; capital tied up 45 min for nothing

## Lesson
Bankroll #1. weak_drift tests keep going flat (DRB, ABX); deprioritize weak_drift entirely unless vol1h/liq >= 0.3

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xe207fab5839ca5bcc0d930761755cc7d82c1f19c
