---
trade: 45
run: 1
symbol: "worth"
name: "one life, its worth an attempt"
contract: "0xB200000000000000000000585fd80C20af698f01"
pair: "0x6cf637a82362d304dfa56a6387fc8f909ec0008ec520ee5fb999506d9b1f3514"
result: "loss"
pnl_usd: -0.134106
pnl_pct: -13.410622
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (12.0% below peak 1.265e-04; price 1.106e-04)"
entry_time: "2026-11-19T08:49:44-05:00"
exit_time: "2026-11-19T09:15:56.170218-05:00"
entry_price: 0.000126
exit_price: 0.000109
usd_in: 1.0
hold_time: "26m 12s"
setup: "momentum_breakout|wide"
liquidity_at_entry: 40929.03
peak_price: 0.000126
max_drawdown_pct: -12.535982
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T45 worth

Coin: [[worth-b2008f01]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -13.41% ($-0.1341)  ·  setup `momentum_breakout|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.06
- [[Rule F3]] **PASS**: liq $40,929
- [[Rule F4]] **PASS**: buys/sells 44/14=3.14
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 4.91
- [[Rule c]] **PASS**: liq $40,929


## Why I entered
momentum_breakout: 1h +5.67% 5m +0%, 1h buys/sells 44/14, vol1h/liq 0.06, score 4.91; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Trailing stop hit (12.0% below peak 1.265e-04; price 1.106e-04)

## Mistake
Momentum_breakout test entered with 5m change 0% and vol1h/liq only 0.06; price never traded above entry (peak = entry) and the 12% trail measured from entry acted as a -12% stop. Bankroll 1.

## Lesson
Bankroll 1: a breakout with flat 5m and low volume/liquidity is not a breakout; require 5m > 0 and vol1h/liq >= 0.2 before calling it momentum_breakout. Wide trail from entry = full-size stop loss.

Lesson topics: [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0x6cf637a82362d304dfa56a6387fc8f909ec0008ec520ee5fb999506d9b1f3514
