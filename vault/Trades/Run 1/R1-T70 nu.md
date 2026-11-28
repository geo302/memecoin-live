---
trade: 70
run: 1
symbol: "\\nu"
name: "\\nu"
contract: "0xB200000000000000000000429b32B7575C774A01"
pair: "0xbb5b0abedf78ee8002cfd45d48c060aa0ba111eb3b62a2554e950505d6b88d64"
result: "win"
pnl_usd: 0.289393
pnl_pct: 28.939284
exit_type: "TP"
exit_reason: "Take-profit hit (price 1.789e-05 >= target 1.511e-05)"
entry_time: "2026-11-19T14:45:58-05:00"
exit_time: "2026-11-19T14:46:31.620098-05:00"
entry_price: 1.4e-05
exit_price: 1.8e-05
usd_in: 1.0
hold_time: "0m 33s"
setup: "fresh_launch|tight"
liquidity_at_entry: 10735.57
peak_price: 1.8e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T70 nu

Coin: [[nu-b2004a01]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +28.94% ($+0.2894)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **PASS**: 5m +81.68%
- [[Rule F2]] **PASS**: vol1h/liq 1.13
- [[Rule F3]] **FAIL**: liq $10,736
- [[Rule F4]] **PASS**: buys/sells 79/24=3.29
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.72
- [[Rule c]] **FAIL**: liq $10,736


## Why I entered
fresh_launch: 1h +130% 5m +81.68%, 1h buys/sells 79/24, vol1h/liq 1.13, score 3.72; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Take-profit hit (price 1.789e-05 >= target 1.511e-05)

## Mistake
None. A $1 tight-stop fresh_launch test hit its +10% target in 33s, and the price gapped past the target so the fill came at +29%. The tight variant's small target left upside on the table, but that is acceptable for a test. Bankroll #1.

## Lesson
Third fresh_launch win in a row this afternoon (#68 +10%, #69 +43%, #70 +29%). Fresh launches with real flow are working right now; keep testing them at $1 and track whether a wider or trailing exit would have earned more. Bankroll #1.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0xbb5b0abedf78ee8002cfd45d48c060aa0ba111eb3b62a2554e950505d6b88d64
