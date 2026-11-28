---
trade: 89
run: 1
symbol: "GI"
name: "GIANT"
contract: "0x8Bb44a4Acc94888194D3b94F91fDeb1618CD88CF"
pair: "0x093a3f8a8994a0d285dca8e87d3d2eca78554e45deeb94b31134c9ada98a234f"
result: "loss"
pnl_usd: -0.18623
pnl_pct: -18.622957
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 3.633e-05 <= stop 3.978e-05)"
entry_time: "2026-11-20T01:20:03-05:00"
exit_time: "2026-11-20T01:25:29.165441-05:00"
entry_price: 4.4e-05
exit_price: 3.6e-05
usd_in: 1.0
hold_time: "5m 26s"
setup: "fresh_launch|mid"
liquidity_at_entry: 27952.24
peak_price: 4.4e-05
max_drawdown_pct: -17.800967
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T89 GI

Coin: [[GI-8bb488cf]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -18.62% ($-0.1862)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +4.11%
- [[Rule F2]] **PASS**: vol1h/liq 1.39
- [[Rule F3]] **PASS**: liq $27,952
- [[Rule F4]] **FAIL**: buys/sells 84/48=1.75
- [[Rule F5]] **FAIL**: TP win #88 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 9.92
- [[Rule c]] **PASS**: liq $27,952


## Why I entered
fresh_launch: 1h +437% 5m +4.11%, 1h buys/sells 84/48, vol1h/liq 1.39, score 9.92; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Stop-loss hit (price 3.633e-05 <= stop 3.978e-05)

## Mistake
Bought at the local high; price never exceeded entry and fell -18.6% through the stop (slippage past -10%).

## Lesson
Bankroll #1. Entries at peak of a pump fade fast; stop gaps exceed -10% on thin liquidity, so size small.

Lesson topics: [[Lesson - Stop gaps]]

DexScreener: https://dexscreener.com/base/0x093a3f8a8994a0d285dca8e87d3d2eca78554e45deeb94b31134c9ada98a234f
