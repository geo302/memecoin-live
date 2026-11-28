---
trade: 1
run: 1
symbol: "CHUBBY"
name: "Chubby"
contract: "0x8aBd3de00aA088132962d41d62dCb9c7Dad1F1D6"
pair: "0x0063fC039Fe5947f9e1B52abbD5D108BacA8D9FE"
result: "loss"
pnl_usd: -7.0
pnl_pct: -99.999999
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 1.414e-14 <= stop 1.158e-06)"
entry_time: "2026-11-18T23:33:21-05:00"
exit_time: "2026-11-18T23:36:35.172395-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 7.0
hold_time: "3m 14s"
setup: "fresh_launch|tight"
liquidity_at_entry: 11926.56
peak_price: 1e-06
max_drawdown_pct: -99.999999
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T1 CHUBBY

Coin: [[CHUBBY-8abdf1d6]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-7.0000)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +5.25%
- [[Rule F2]] **FAIL**: vol1h/liq 0.08
- [[Rule F3]] **FAIL**: liq $11,927
- [[Rule F4]] **PASS**: buys/sells 47/5=9.40
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 21.32
- [[Rule c]] **FAIL**: liq $11,927


## Why I entered
fresh_launch: 1h +31.27% 5m +5.25%, 1h buys/sells 47/5, vol1h/liq 0.08, score 21.32; tight plan SL -6% TP +10% trail 5%; size 7% equity

## Exit
Stop-loss hit (price 1.414e-14 <= stop 1.158e-06)

## Mistake
Bought a ~10-min-old fresh launch ($11.9k liq, mc $6.8k) from GeckoTerminal new pools on 1h buy pressure; liquidity was pulled (rug) 3m after entry, price -100%. Tight -6% stop was useless against an LP pull.

## Lesson
Bankroll #1. Fresh launches under ~$20k liquidity are rug-prone: an LP pull jumps straight past any stop. Rule: fresh_launch + liq < $25k => max 2% equity and score penalty; prefer setups with >$25k liq and >6h age for bigger sizes.

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x0063fc039fe5947f9e1b52abbd5d108baca8d9fe
