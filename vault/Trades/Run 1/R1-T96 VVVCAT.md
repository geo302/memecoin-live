---
trade: 96
run: 1
symbol: "VVVCAT"
name: "Private Cat"
contract: "0xB200000000000000000000895275cF88f3d7Be44"
pair: "0xe5a08637779b423406740db77b0014d394791e4fda2aefe6783fd416d5a2bd5d"
result: "win"
pnl_usd: 1.02128
pnl_pct: 27.306956
exit_type: "TP"
exit_reason: "Take-profit hit (price 3.108e-04 >= target 3.021e-04)"
entry_time: "2026-11-22T13:34:26-05:00"
exit_time: "2026-11-22T13:35:37.200697-05:00"
entry_price: 0.000242
exit_price: 0.000308
usd_in: 3.74
hold_time: "1m 11s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 74167.09
peak_price: 0.000311
max_drawdown_pct: 0.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T96 VVVCAT

Coin: [[VVVCAT-b200be44]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +27.31% ($+1.0213)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +185.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.28
- [[Rule F3]] **PASS**: liq $74,167
- [[Rule F4]] **PASS**: buys/sells 130/43=3.02
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 16.32
- [[Rule c]] **PASS**: liq $74,167


## Why I entered
winner_pattern: 1h +3253% 5m +185%, 1h buys/sells 130/43, vol1h/liq 1.28, score 16.32; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Take-profit hit (price 3.108e-04 >= target 3.021e-04)

## Mistake
None (win +27.3%, +$1.02). TP hit in 1m11s; the first price over target was 3.108e-04 (+28.6%). Never below entry.

## Lesson
What worked: highest score of the 11 closed winner_pattern trades (16.32) and the deepest pool (liq $74.2k), 5m +185% / 1h +3253%, 1h buys/sells 130/43, vol1h/liq 1.28. Deep liquidity + top score = cleanest TP. Note the ticker VVVCAT exists on at least 2 contracts: #95 (0xb200...8502, bought 10 min earlier, still open, price unchanged at 5.250e-05 on every tick since) and this one (0xB200...Be44). Same ticker does not mean same coin.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Re-entry and copycat tickers]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xe5a08637779b423406740db77b0014d394791e4fda2aefe6783fd416d5a2bd5d
