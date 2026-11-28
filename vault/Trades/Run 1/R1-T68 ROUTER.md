---
trade: 68
run: 1
symbol: "ROUTER"
name: "Rerouter"
contract: "0x13ea1CBD6FE70bbD40A817EBa940133fdb21cCCC"
pair: "0xef3964bd737de5e7c28d8a62a84157a211449dfa963ee48f2c9b53d74280f631"
result: "win"
pnl_usd: 0.103359
pnl_pct: 10.335933
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (15.0% below peak 7.141e-05; price 5.850e-05)"
entry_time: "2026-11-19T14:08:50-05:00"
exit_time: "2026-11-19T14:10:57.141836-05:00"
entry_price: 5.2e-05
exit_price: 5.8e-05
usd_in: 1.0
hold_time: "2m 07s"
setup: "fresh_launch|trail"
liquidity_at_entry: 24741.04
peak_price: 7.1e-05
max_drawdown_pct: -18.0787
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/trail"]
---
# R1-T68 ROUTER

Coin: [[ROUTER-13eacccc]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +10.34% ($+0.1034)  ·  setup `fresh_launch|trail`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +24.74%
- [[Rule F2]] **FAIL**: vol1h/liq 0.69
- [[Rule F3]] **FAIL**: liq $24,741
- [[Rule F4]] **PASS**: buys/sells 85/28=3.04
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 9.76
- [[Rule c]] **PASS**: liq $24,741


## Why I entered
fresh_launch: 1h +754% 5m +24.74%, 1h buys/sells 85/28, vol1h/liq 0.69, score 9.76; trail plan SL -12% TP +300% trail 15%; size 1% equity

## Exit
Trailing stop hit (15.0% below peak 7.141e-05; price 5.850e-05)

## Mistake
None major. The 15% trail locked in +10.3%, but the peak was +36% above entry, so most of the move was given back.

## Lesson
The fresh_launch|trail plan (15% trail, far target) worked on a clean climber. A 15% trail gives back a lot on a fast spike; consider tightening the trail to about 10% once a test is up more than 30%. Small sample, no rule change yet. Bankroll #1.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0xef3964bd737de5e7c28d8a62a84157a211449dfa963ee48f2c9b53d74280f631
