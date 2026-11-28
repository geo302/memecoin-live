---
trade: 71
run: 1
symbol: "ROUTER"
name: "Rerouter"
contract: "0x13ea1CBD6FE70bbD40A817EBa940133fdb21cCCC"
pair: "0xef3964bd737de5e7c28d8a62a84157a211449dfa963ee48f2c9b53d74280f631"
result: "loss"
pnl_usd: -0.06095
pnl_pct: -6.094953
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (8.0% below peak 8.925e-05; price 7.417e-05)"
entry_time: "2026-11-19T15:26:24-05:00"
exit_time: "2026-11-19T15:30:51.662812-05:00"
entry_price: 7.8e-05
exit_price: 7.3e-05
usd_in: 1.0
hold_time: "4m 27s"
setup: "fresh_launch|mid"
liquidity_at_entry: 31005.38
peak_price: 8.9e-05
max_drawdown_pct: -16.896359
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T71 ROUTER

Coin: [[ROUTER-13eacccc]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -6.09% ($-0.0609)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +11.26%
- [[Rule F2]] **PASS**: vol1h/liq 1.69
- [[Rule F3]] **PASS**: liq $31,005
- [[Rule F4]] **FAIL**: buys/sells 263/192=1.37
- [[Rule F5]] **FAIL**: TP win #69 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 11.24
- [[Rule c]] **PASS**: liq $31,005


## Why I entered
fresh_launch: 1h +115% 5m +11.26%, 1h buys/sells 263/192, vol1h/liq 1.69, score 11.24; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Trailing stop hit (8.0% below peak 8.925e-05; price 7.417e-05)

## Mistake
Gave back a +14% open gain. ROUTER peaked at 8.925e-05 within about 4 minutes, but the next price the watcher saw was already 17% below the peak (7.417e-05), so the 8% trailing stop filled well past its 8.21e-05 level and the trade closed at -6.1%. No breakeven stop was in place after a +10% move. Bankroll #1.

## Lesson
On fast fresh_launch pools (vol1h/liq >1.5), drops of 15% or more between 12-second ticks are common, so a trailing stop can't be trusted to lock in gains. Idea to test (not adopted yet): once a test position is up 10% or more, raise the stop to breakeven. Track whether fresh_launch|mid trades that peak at +10% or more keep finishing as losses. Bankroll #1.

Lesson topics: [[Lesson - Trailing stops]], [[Lesson - Breakeven stop]], [[Lesson - Operations and tooling]]

DexScreener: https://dexscreener.com/base/0xef3964bd737de5e7c28d8a62a84157a211449dfa963ee48f2c9b53d74280f631
