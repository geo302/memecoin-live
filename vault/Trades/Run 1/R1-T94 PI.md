---
trade: 94
run: 1
symbol: "PI"
name: "Private Inu"
contract: "0x8De21c85709073A48A36F42eb9DBeAe673D6AF2F"
pair: "0xaa2285ea725679821580e6d687fdb45e394d8aec2baedc8446bd2def13629abe"
result: "win"
pnl_usd: 1.441852
pnl_pct: 39.287507
exit_type: "TP"
exit_reason: "Take-profit hit (price 5.802e-05 >= target 5.155e-05)"
entry_time: "2026-11-21T22:57:38-05:00"
exit_time: "2026-11-21T23:05:08.897242-05:00"
entry_price: 4.1e-05
exit_price: 5.7e-05
usd_in: 3.67
hold_time: "7m 30s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 26324.75
peak_price: 5.8e-05
max_drawdown_pct: 0.0
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
# R1-T94 PI

Coin: [[PI-8de2af2f]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +39.29% ($+1.4419)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +114.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.72
- [[Rule F3]] **PASS**: liq $26,325
- [[Rule F4]] **PASS**: buys/sells 90/42=2.14
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.01
- [[Rule c]] **PASS**: liq $26,325


## Why I entered
winner_pattern: 1h +516% 5m +114%, 1h buys/sells 90/42, vol1h/liq 1.72, score 15.01; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Take-profit hit (price 5.802e-05 >= target 5.155e-05)

## Mistake
None (win +39.3%, +$1.44). TP +25% target hit 7m30s after entry; the first price over target was 5.802e-05, +40.7% over entry, so the fill beat the target. Price never traded below entry (max drawdown 0%).

## Lesson
What worked: first trade ever on this contract, score 15.01, liq $26.3k, 5m +114% / 1h +516%, vol1h/liq 1.72 (the heaviest trading vs pool of all 11 winner_pattern trades), 1h buys/sells 90/42. Heavy real volume vs the pool on a never-traded contract is the profile working as designed. The +14% beyond target was a favourable jump between checks, not something to plan on.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xaa2285ea725679821580e6d687fdb45e394d8aec2baedc8446bd2def13629abe
