---
trade: 61
run: 1
symbol: "CATMARIO"
name: "CatMario"
contract: "0xB200000000000000000000e68ad31A48a2c27301"
pair: "0x0a5c102b9897d9106e19352835ddd45ef6bf7bf8525b07ff46658390c5dd190d"
result: "win"
pnl_usd: 0.663503
pnl_pct: 66.350295
exit_type: "TP"
exit_reason: "Take-profit hit (price 2.583e-05 >= target 1.845e-05)"
entry_time: "2026-11-19T11:39:15-05:00"
exit_time: "2026-11-19T11:39:20.415694-05:00"
entry_price: 1.5e-05
exit_price: 2.6e-05
usd_in: 1.0
hold_time: "0m 05s"
setup: "fresh_launch|mid"
liquidity_at_entry: 11659.34
peak_price: 2.6e-05
max_drawdown_pct: 0.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T61 CATMARIO

Coin: [[CATMARIO-b2007301]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +66.35% ($+0.6635)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **PASS**: 5m +157.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.72
- [[Rule F3]] **FAIL**: liq $11,659
- [[Rule F4]] **PASS**: buys/sells 29/4=7.25
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.72
- [[Rule c]] **FAIL**: liq $11,659


## Why I entered
fresh_launch: 1h +157% 5m +157%, 1h buys/sells 29/4, vol1h/liq 0.72, score 6.72; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Take-profit hit (price 2.583e-05 >= target 1.845e-05)

## Mistake
Fill quality, not a loss: the +66% came from one 4-second price jump (1.522e-05 -> 2.583e-05) on a ~$11.7k-liquidity pool, so in a real wallet that fill is unlikely; the fixed +20% TP capped nothing here because the jump gapped past it

## Lesson
Bankroll #1: vertical-candle fresh launches (5m = 1h) are now 2W/1L (#57 AX1 +21.8%, #58 KIARA -27.3%, #61 CATMARIO +66.4%) but every one moved in seconds on thin pools; keep them as $1 tests only and treat the paper P&L as optimistic

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Thin or one-sided flow]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0x0a5c102b9897d9106e19352835ddd45ef6bf7bf8525b07ff46658390c5dd190d
