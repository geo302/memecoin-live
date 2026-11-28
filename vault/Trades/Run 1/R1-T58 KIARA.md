---
trade: 58
run: 1
symbol: "KIARA"
name: "Kiara"
contract: "0xb200000000000000000000A8D5f755fd141b1401"
pair: "0x5530434bf9232398ce47b06d3664ecb6a64ad5364ce2443abc05d2a8edecc96e"
result: "loss"
pnl_usd: -0.272869
pnl_pct: -27.286917
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 1.247e-05 <= stop 1.494e-05)"
entry_time: "2026-11-19T11:03:31-05:00"
exit_time: "2026-11-19T11:03:38.018757-05:00"
entry_price: 1.7e-05
exit_price: 1.2e-05
usd_in: 1.0
hold_time: "0m 07s"
setup: "fresh_launch|trail"
liquidity_at_entry: 12405.85
peak_price: 1.7e-05
max_drawdown_pct: -26.552441
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T58 KIARA

Coin: [[KIARA-b2001401]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -27.29% ($-0.2729)  ·  setup `fresh_launch|trail`

## Entry checks

- [[Rule F1]] **PASS**: 5m +103.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.25
- [[Rule F3]] **FAIL**: liq $12,406
- [[Rule F4]] **PASS**: buys/sells 67/7=9.57
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 7.25
- [[Rule c]] **FAIL**: liq $12,406


## Why I entered
fresh_launch: 1h +103% 5m +103%, 1h buys/sells 67/7, vol1h/liq 1.25, score 7.25; trail plan SL -12% TP +300% trail 15%; size 1% equity

## Exit
Stop-loss hit (price 1.247e-05 <= stop 1.494e-05)

## Mistake
Chased a vertical candle: bought KIARA when its whole 1h move (+103%) came in the last 5m; it dumped through the -12% stop within 7 seconds and filled at -27% (gap through stop); at 11:07 ET price 3.989e-06 liq $3,989, 1h -51.87% 5m -76.27%

## Lesson
Bankroll #1: the new trail variant (lesson #57) must not fire on vertical candles; a 5m move equal to the 1h move means the entry is the top tick. 11:07 rule: trail variant needs 5m change <= +30% (same as after_style); otherwise a normal tight/mid/wide test plan.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Trailing stops]], [[Lesson - Chasing pumps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x5530434bf9232398ce47b06d3664ecb6a64ad5364ce2443abc05d2a8edecc96e
