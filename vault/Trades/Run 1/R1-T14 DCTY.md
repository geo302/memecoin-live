---
trade: 14
run: 1
symbol: "DCTY"
name: "DacityCoin - DCTY"
contract: "0x2C092E83001A1c8A6c648C17DEbae99ea97F9709"
pair: "0x846d169504f4ec40bc7e3884b746d0def252fe2acc0c891b975f397f4fc7711a"
result: "win"
pnl_usd: 0.053497
pnl_pct: 1.327466
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 2.512e-04 -1%"
entry_time: "2026-11-19T00:19:37-05:00"
exit_time: "2026-11-19T07:25:43.870937-05:00"
entry_price: 0.000245
exit_price: 0.000249
usd_in: 4.03
hold_time: "7h 06m 06s"
setup: "fresh_launch|mid"
liquidity_at_entry: 240629.72
peak_price: 0.000251
max_drawdown_pct: -1.030844
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/discretionary"]
---
# R1-T14 DCTY

Coin: [[DCTY-2c099709]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +1.33% ($+0.0535)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.13%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $240,630
- [[Rule F4]] **PASS**: buys/sells 22/2=11.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 20.04
- [[Rule c]] **PASS**: liq $240,630


## Why I entered
fresh_launch: 1h +0.08% 5m +0.13%, 1h buys/sells 22/2, vol1h/liq 0.00, score 20.04; mid plan SL -10% TP +20% trail 8%; size 5% equity

## Exit
Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 2.512e-04 -1%

## Mistake
Dead money: the position sat within about 3% of entry for hours and tied up a slot.

## Lesson
Bankroll #1. 45-min flat time stop applied at the first run after the outage. Large/mid-liq tokens overnight barely move; size these small or skip them at night.

Lesson topics: [[Lesson - What worked (wins)]]

DexScreener: https://dexscreener.com/base/0x846d169504f4ec40bc7e3884b746d0def252fe2acc0c891b975f397f4fc7711a
