---
trade: 97
run: 1
symbol: "VDINO"
name: "Venice Dino"
contract: "0xB6A25bAaf52EFb2DB221E31d51B247d1B74B42A6"
pair: "0x3cc83ebff036722aba0dc076b28e55a2b532e8db67729c577566215e6221f794"
result: "win"
pnl_usd: 3.004665
pnl_pct: 79.278759
exit_type: "TP"
exit_reason: "Take-profit hit (price 6.621e-05 >= target 4.570e-05)"
entry_time: "2026-11-22T18:39:33-05:00"
exit_time: "2026-11-22T18:40:27.033533-05:00"
entry_price: 3.7e-05
exit_price: 6.6e-05
usd_in: 3.79
hold_time: "0m 54s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 29754.41
peak_price: 6.6e-05
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
# R1-T97 VDINO

Coin: [[VDINO-b6a242a6]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +79.28% ($+3.0047)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +75.61%
- [[Rule F2]] **PASS**: vol1h/liq 0.82
- [[Rule F3]] **PASS**: liq $29,754
- [[Rule F4]] **PASS**: buys/sells 74/36=2.06
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 13.93
- [[Rule c]] **PASS**: liq $29,754


## Why I entered
winner_pattern: 1h +190% 5m +75.61%, 1h buys/sells 74/36, vol1h/liq 0.82, score 13.93; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Take-profit hit (price 6.621e-05 >= target 4.570e-05)

## Mistake
None (win +79.3%, +$3.00). TP hit 54s after entry; the first price over target was 6.621e-05, +81.1% over entry, because the price jumped past the +25% target between two watcher checks.

## Lesson
What worked: first trade on this contract (0xB6A2...42A6), score 13.93, liq $29.8k, 5m +75.6% / 1h +190%, vol1h/liq 0.82, 1h buys/sells 74/36. The extra ~56 points beyond the +25% target was luck of an upside jump (the same jumps hit us on the downside: #98/#99). Do not size or expect future trades off +79%; the planned win is +25% minus 1% slip.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Operations and tooling]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x3cc83ebff036722aba0dc076b28e55a2b532e8db67729c577566215e6221f794
