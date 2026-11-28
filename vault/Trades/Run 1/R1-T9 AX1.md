---
trade: 9
run: 1
symbol: "AX1"
name: "AX1"
contract: "0x0947FB7076BFa307796F8fd533055f6016C6cccC"
pair: "0x28752b1c1be27a1d5947dc880dd7d969de945f7a7718d6f3747776dfd536ea76"
result: "loss"
pnl_usd: -0.142944
pnl_pct: -3.46111
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.009322 -1%"
entry_time: "2026-11-19T00:01:10-05:00"
exit_time: "2026-11-19T00:52:39.022414-05:00"
entry_price: 0.00956
exit_price: 0.009229
usd_in: 4.13
hold_time: "51m 29s"
setup: "momentum_breakout|wide"
liquidity_at_entry: 385599.94
peak_price: 0.00956
max_drawdown_pct: -2.538273
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T9 AX1

Coin: [[AX1-0947cccc]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -3.46% ($-0.1429)  ·  setup `momentum_breakout|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.62%
- [[Rule F2]] **FAIL**: vol1h/liq 0.03
- [[Rule F3]] **PASS**: liq $385,600
- [[Rule F4]] **FAIL**: buys/sells 16/9=1.78
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.81
- [[Rule c]] **PASS**: liq $385,600


## Why I entered
momentum_breakout: 1h +10.72% 5m +0.62%, 1h buys/sells 16/9, vol1h/liq 0.03, score 2.81; wide plan SL -15% TP +35% trail 12%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.009322 -1%

## Mistake
Entered a token that never got follow-through; the slot was tied up for 51 min.

## Lesson
Bankroll #1. Applied the 45-min flat time stop (|move|<3%). Deep-liquidity tokens (>$1M liq) barely move in an hour, so they are poor scalping candidates: probe size only.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x28752b1c1be27a1d5947dc880dd7d969de945f7a7718d6f3747776dfd536ea76
