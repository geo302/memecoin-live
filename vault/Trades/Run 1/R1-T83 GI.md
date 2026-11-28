---
trade: 83
run: 1
symbol: "GI"
name: "GIANT"
contract: "0x803F4BDA39E5F445C3237Ec64Afd6B23Dcf7BE01"
pair: "0xb90fce6f03240096e0c81b4e2b1ca99bc4bf692810f84d5492b6bfc6897b212a"
result: "loss"
pnl_usd: -0.097025
pnl_pct: -9.702475
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (8.0% below peak 2.607e-05; price 2.210e-05)"
entry_time: "2026-11-19T21:16:34-05:00"
exit_time: "2026-11-19T21:33:35.433313-05:00"
entry_price: 2.4e-05
exit_price: 2.2e-05
usd_in: 1.0
hold_time: "17m 01s"
setup: "trend_continuation|mid"
liquidity_at_entry: 17001.97
peak_price: 2.6e-05
max_drawdown_pct: -15.228232
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "FAIL"
check_F4: "FAIL"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T83 GI

Coin: [[GI-803fbe01]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -9.70% ($-0.0970)  ·  setup `trend_continuation|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -14.63%
- [[Rule F2]] **PASS**: vol1h/liq 1.36
- [[Rule F3]] **FAIL**: liq $17,002
- [[Rule F4]] **FAIL**: buys/sells 298/195=1.53
- [[Rule F5]] **FAIL**: TP win #80 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score -0.12
- [[Rule c]] **FAIL**: liq $17,002


## Why I entered
trend_continuation: 1h +41.26% 5m -14.63%, 1h buys/sells 298/195, vol1h/liq 1.36, score -0.12; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Trailing stop hit (8.0% below peak 2.607e-05; price 2.210e-05)

## Mistake
Re-entered GI as a trend_continuation test while 5m was -14.6% (fading after a pump) on thin ~$17k liquidity; gained +7.6% then a single ~15% candle gapped straight through the 8% trailing stop (2.567e-05 -> 2.210e-05 within ~1 minute), so the trail could not lock in the gain

## Lesson
Bankroll #1: on sub-$20k-liquidity coins, price can drop 15% between watcher ticks, so an 8% trail behaves like a ~15% stop; avoid trend_continuation tests when 5m is already sharply negative (< -10%) and liquidity is under $20k; a coin's second pump (GI #80 won +31.5%) is weaker than its first

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Trailing stops]], [[Lesson - Operations and tooling]]

DexScreener: https://dexscreener.com/base/0xb90fce6f03240096e0c81b4e2b1ca99bc4bf692810f84d5492b6bfc6897b212a
