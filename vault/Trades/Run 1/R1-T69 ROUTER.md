---
trade: 69
run: 1
symbol: "ROUTER"
name: "Rerouter"
contract: "0x32F0DA8D9E73a654fd1fcF82fDF720940452b259"
pair: "0x3a78747063b684f99a5f94015453ac31b6fc05a1cecf021ffa394bad00179132"
result: "win"
pnl_usd: 0.429552
pnl_pct: 42.955246
exit_type: "TP"
exit_reason: "Take-profit hit (price 5.526e-05 >= target 5.166e-05)"
entry_time: "2026-11-19T14:31:14-05:00"
exit_time: "2026-11-19T14:34:07.650926-05:00"
entry_price: 3.8e-05
exit_price: 5.5e-05
usd_in: 1.0
hold_time: "2m 53s"
setup: "fresh_launch|wide"
liquidity_at_entry: 27856.98
peak_price: 5.5e-05
max_drawdown_pct: -10.005252
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
# R1-T69 ROUTER

Coin: [[ROUTER-32f0b259]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +42.96% ($+0.4296)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **PASS**: 5m +65.81%
- [[Rule F2]] **PASS**: vol1h/liq 0.97
- [[Rule F3]] **PASS**: liq $27,857
- [[Rule F4]] **PASS**: buys/sells 65/32=2.03
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 14.03
- [[Rule c]] **PASS**: liq $27,857


## Why I entered
fresh_launch: 1h +324% 5m +65.81%, 1h buys/sells 65/32, vol1h/liq 0.97, score 14.03; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Take-profit hit (price 5.526e-05 >= target 5.166e-05)

## Mistake
None major. Entered a 5m +66% candle as a $1 test (outside after_style's 5m cap); fixed +35% take-profit capped the upside, which was fine for a test. Bankroll #1.

## Lesson
Second ROUTER win today (#68 +10%, #69 +43%): fresh launches with 1h vol/liq near 1x and buys about 2x sells keep paying even on hot 5m candles. If 2-3 more 'hot 5m' tests win, consider loosening after_style's 5m cap from +30%. Bankroll #1.

Lesson topics: [[Lesson - What worked (wins)]]

DexScreener: https://dexscreener.com/base/0x3a78747063b684f99a5f94015453ac31b6fc05a1cecf021ffa394bad00179132
