---
trade: 63
run: 1
symbol: "CATMARIO"
name: "CatMario"
contract: "0xB200000000000000000000e68ad31A48a2c27301"
pair: "0x0a5c102b9897d9106e19352835ddd45ef6bf7bf8525b07ff46658390c5dd190d"
result: "win"
pnl_usd: 0.45468
pnl_pct: 45.467964
exit_type: "TP"
exit_reason: "Take-profit hit (price 1.318e-04 >= target 9.867e-05)"
entry_time: "2026-11-19T12:10:51-05:00"
exit_time: "2026-11-19T12:11:39.602349-05:00"
entry_price: 9e-05
exit_price: 0.00013
usd_in: 1.0
hold_time: "0m 48s"
setup: "fresh_launch|tight"
liquidity_at_entry: 33662.28
peak_price: 0.000132
max_drawdown_pct: 0.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T63 CATMARIO

Coin: [[CATMARIO-b2007301]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +45.47% ($+0.4547)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **PASS**: 5m +164.0%
- [[Rule F2]] **PASS**: vol1h/liq 2.43
- [[Rule F3]] **PASS**: liq $33,662
- [[Rule F4]] **PASS**: buys/sells 369/81=4.56
- [[Rule F5]] **FAIL**: TP win #61 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 20.54
- [[Rule c]] **PASS**: liq $33,662


## Why I entered
fresh_launch: 1h +1397% 5m +164%, 1h buys/sells 369/81, vol1h/liq 2.43, score 20.54; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Take-profit hit (price 1.318e-04 >= target 9.867e-05)

## Mistake
Fill quality, not a loss: the TP (+10%, tight plan) was gapped in one tick to 1.318e-04 (+47%) 48s after entry; real fills on a ~$42k pool moving that fast would likely be worse. Tight TP would have capped a real exit had the price stepped up gradually

## Lesson
Bankroll #1: CATMARIO re-entry after a +66% win worked again (+45.5%) with 1h +1397%, b/s 369/81, vol1h/liq 2.43. Vertical-candle fresh launches now 3W/1L, net +$1.06; strongest flow ones (b/s >= 3x, vol1h/liq >= 1) keep running past fixed TPs, so they deserve trail-only exits even when 5m > 30% if liq >= $25k (candidate rule, needs 5+ samples)

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Re-entry and copycat tickers]], [[Lesson - Trailing stops]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0x0a5c102b9897d9106e19352835ddd45ef6bf7bf8525b07ff46658390c5dd190d
