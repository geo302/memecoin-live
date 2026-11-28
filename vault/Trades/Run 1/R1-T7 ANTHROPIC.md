---
trade: 7
run: 1
symbol: "ANTHROPIC"
name: "ANTHROPIC"
contract: "0x071CBcA9312c1AFb0FDF2B619FAb5F5e25758eFE"
pair: "0x95BE09028d845cA51E7f9152EbfBb78744c8e4E1"
result: "loss"
pnl_usd: -1.68
pnl_pct: -100.0
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 5.002e-15 <= stop 1.152e-06)"
entry_time: "2026-11-18T23:51:02-05:00"
exit_time: "2026-11-18T23:54:46.291288-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.68
hold_time: "3m 44s"
setup: "fresh_launch|tight"
liquidity_at_entry: 11910.56
peak_price: 1e-06
max_drawdown_pct: -100.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T7 ANTHROPIC

Coin: [[ANTHROPIC-071c8efe]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.6800)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +5.33%
- [[Rule F2]] **FAIL**: vol1h/liq 0.11
- [[Rule F3]] **FAIL**: liq $11,911
- [[Rule F4]] **PASS**: buys/sells 47/5=9.40
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 12.29
- [[Rule c]] **FAIL**: liq $11,911


## Why I entered
fresh_launch: 1h +30.46% 5m +5.33%, 1h buys/sells 47/5, vol1h/liq 0.11, score 12.29; tight plan SL -6% TP +10% trail 5%; size 2% equity

## Exit
Stop-loss hit (price 5.002e-15 <= stop 1.152e-06)

## Mistake
Bought a ~minutes-old fresh launch (ANTHROPIC, $11.9k liq) at 2% size; LP pulled ~4.5 min after entry, -100%. Third fresh_launch LP rug out of 4 such trades.

## Lesson
Bankroll #1. Fresh launches with liq < $25k: 3/4 rugged within 10 min (CHUBBY, LAPTOP, ANTHROPIC). The 2% size cap limited damage to $1.68. New rule: max ONE such micro-launch per round, and the score system now favours tokens 6h+ old with liq >= $25k.

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x95be09028d845ca51e7f9152ebfbb78744c8e4e1
