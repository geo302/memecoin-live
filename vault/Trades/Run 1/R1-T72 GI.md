---
trade: 72
run: 1
symbol: "GI"
name: "GIANT"
contract: "0xDc91a1FE0Bc8Eb0C6e0B51121026DbCaF0F7C65a"
pair: "0xfb9fd472351bc38fcfaf33f1b9872520f54ec9bd20dacd41e1c6ae9eebb0994c"
result: "loss"
pnl_usd: -0.136011
pnl_pct: -13.601102
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (12.0% below peak 3.031e-05; price 2.565e-05)"
entry_time: "2026-11-19T16:29:33-05:00"
exit_time: "2026-11-19T16:30:49.597643-05:00"
entry_price: 2.9e-05
exit_price: 2.5e-05
usd_in: 1.0
hold_time: "1m 16s"
setup: "fresh_launch|wide"
liquidity_at_entry: 23194.29
peak_price: 3e-05
max_drawdown_pct: -15.374464
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T72 GI

Coin: [[GI-dc91c65a]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -13.60% ($-0.1360)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **PASS**: 5m +110.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.79
- [[Rule F3]] **FAIL**: liq $23,194
- [[Rule F4]] **PASS**: buys/sells 38/18=2.11
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 8.01
- [[Rule c]] **PASS**: liq $23,194


## Why I entered
fresh_launch: 1h +188% 5m +110%, 1h buys/sells 38/18, vol1h/liq 0.79, score 8.01; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Trailing stop hit (12.0% below peak 3.031e-05; price 2.565e-05)

## Mistake
Chased a vertical candle: bought GI 5 minutes after launch with 5m already +110% (1h +188%). It peaked only +3% (3.031e-05) and then dumped. The 12% trail was hit and filled at -13.6% after the price gapped between ticks. Bankroll #1.

## Lesson
Fresh_launch tests with 5m above +50% are chasing the candle. Apply the same 5m cap as after_style (5m at most +30%) to fresh_launch tests too; a scoring bonus for a huge 5m move is a trap. Bankroll #1.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Trailing stops]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0xfb9fd472351bc38fcfaf33f1b9872520f54ec9bd20dacd41e1c6ae9eebb0994c
