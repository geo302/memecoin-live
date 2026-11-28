---
trade: 87
run: 1
symbol: "DCTY"
name: "DacityCoin"
contract: "0x67f30131512aE8244d64B4432dba7c29b226d03f"
pair: "0x158Fe1fF3C8e8d7dB63b07c2Ff0d1a2f2580B67C"
result: "loss"
pnl_usd: -0.018691
pnl_pct: -1.869148
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (12.0% below peak 3.055e-08; price 2.651e-08)"
entry_time: "2026-11-20T00:32:19-05:00"
exit_time: "2026-11-20T00:40:48.608126-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 1.0
hold_time: "8m 29s"
setup: "fresh_launch|wide"
liquidity_at_entry: 33157.88
peak_price: 0.0
max_drawdown_pct: -13.224223
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T87 DCTY

Coin: [[DCTY-67f3d03f]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.87% ($-0.0187)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +17.63%
- [[Rule F2]] **FAIL**: vol1h/liq 0.3
- [[Rule F3]] **PASS**: liq $33,158
- [[Rule F4]] **PASS**: buys/sells 14/5=2.80
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 14.31
- [[Rule c]] **PASS**: liq $33,158


## Why I entered
fresh_launch: 1h +144% 5m +17.63%, 1h buys/sells 14/5, vol1h/liq 0.30, score 14.31; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Trailing stop hit (12.0% below peak 3.055e-08; price 2.651e-08)

## Mistake
Entered a pre-winner_pattern fresh launch; trailing stop clipped after a -13% drawdown and a thin peak.

## Lesson
Bankroll #1. Tiny scratch loss; trail worked as designed. Only winner_pattern entries now.

Lesson topics: [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0x158fe1ff3c8e8d7db63b07c2ff0d1a2f2580b67c
