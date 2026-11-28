---
trade: 67
run: 1
symbol: "GI"
name: "GIANT"
contract: "0x803F4BDA39E5F445C3237Ec64Afd6B23Dcf7BE01"
pair: "0xb90fce6f03240096e0c81b4e2b1ca99bc4bf692810f84d5492b6bfc6897b212a"
result: "loss"
pnl_usd: -0.142406
pnl_pct: -14.240573
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 1.357e-05 <= stop 1.410e-05)"
entry_time: "2026-11-19T13:35:14-05:00"
exit_time: "2026-11-19T13:35:34.023774-05:00"
entry_price: 1.6e-05
exit_price: 1.3e-05
usd_in: 1.0
hold_time: "0m 20s"
setup: "fresh_launch|mid"
liquidity_at_entry: 12676.8
peak_price: 1.6e-05
max_drawdown_pct: -13.374316
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "FAIL"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T67 GI

Coin: [[GI-803fbe01]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -14.24% ($-0.1424)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **PASS**: 5m +56.43%
- [[Rule F2]] **PASS**: vol1h/liq 1.04
- [[Rule F3]] **FAIL**: liq $12,677
- [[Rule F4]] **FAIL**: buys/sells 129/80=1.61
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 0.26
- [[Rule c]] **FAIL**: liq $12,677


## Why I entered
fresh_launch: 1h +209% 5m +56.43%, 1h buys/sells 129/80, vol1h/liq 1.04, score 0.26; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Stop-loss hit (price 1.357e-05 <= stop 1.410e-05)

## Mistake
Entered a $1 fresh_launch test on GIANT right after a vertical candle (5m +56%, 1h +209%) in a thin pool ($12.7k liquidity), with a barely positive score (0.26). Price dropped about 13% within 20 seconds; the -10% stop filled at -14.2%.

## Lesson
In thin pools (<$15k liq), buying a 5m candle above +50% means buying the top. Data check: non-after_style tests with 5m >+30% are 9 trades, 5W/4L, -$0.26, so this is not yet enough to justify a hard rule; watch it. Stops in thin pools slip about 4 pts past their level. Bankroll #1.

Lesson topics: [[Lesson - Thin or one-sided flow]], [[Lesson - Chasing pumps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xb90fce6f03240096e0c81b4e2b1ca99bc4bf692810f84d5492b6bfc6897b212a
