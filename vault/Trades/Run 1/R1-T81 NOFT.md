---
trade: 81
run: 1
symbol: "NOFT"
name: "NOFT 🔥"
contract: "0x8DB9aC573E6633451D9789f9f5623f83Cd527772"
pair: "0x8056663f37824eD2dEe6aC39d7cfCf10e84b96Ee"
result: "win"
pnl_usd: 0.201465
pnl_pct: 20.146547
exit_type: "LIQUIDITY"
exit_reason: "Liquidity collapse (liquidity $3 below $5,000 floor)"
entry_time: "2026-11-19T19:55:36-05:00"
exit_time: "2026-11-19T20:20:15.876216-05:00"
entry_price: 5e-06
exit_price: 6e-06
usd_in: 1.0
hold_time: "24m 39s"
setup: "fresh_launch|wide"
liquidity_at_entry: 57376.5
peak_price: 6e-06
max_drawdown_pct: 0.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/liquidity"]
---
# R1-T81 NOFT

Coin: [[NOFT-8db97772]]  ·  Exit: [[Exit LIQUIDITY]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +20.15% ($+0.2015)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +5.14%
- [[Rule F2]] **FAIL**: vol1h/liq 0.04
- [[Rule F3]] **PASS**: liq $57,376
- [[Rule F4]] **PASS**: buys/sells 13/1=13.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 11.25
- [[Rule c]] **PASS**: liq $57,376


## Why I entered
fresh_launch: 1h +19.21% 5m +5.14%, 1h buys/sells 13/1, vol1h/liq 0.04, score 11.25; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Liquidity collapse (liquidity $3 below $5,000 floor)

## Mistake
Bought a pool with 13 buys / 1 sell in 1h (one-sided flow) on a $57k-liq launch with tiny volume (vol1h/liq 0.04). The dev pulled the LP at about 20:20 ET (DexScreener liquidity $2.96, 0.0008 WETH left). The paper exit at the last quoted price booked +20.1%, but a real holder could not have sold: realistic result about -100% (-$1.00).

## Lesson
Bankroll #1: a near-zero sell count (34 buys / 1 sell) is a rug tell even when liquidity looks fine. Treat 1h sells <= 2 with buys >= 10x sells like 'zero sells' (skip, or at most a $1 test), and read liquidity-collapse paper wins as about -100% when judging the edge.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Rugs and liquidity pulls]], [[Lesson - Thin or one-sided flow]]

DexScreener: https://dexscreener.com/base/0x8056663f37824ed2dee6ac39d7cfcf10e84b96ee
