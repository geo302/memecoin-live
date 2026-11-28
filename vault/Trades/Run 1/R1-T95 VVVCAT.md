---
trade: 95
run: 1
symbol: "VVVCAT"
name: "Private Cat"
contract: "0xb2000000000000000000006E8253620E0f588502"
pair: "0x937ec6bc34180d69eebeeca62d172c30aeb66c3b138f2a18b503575f60c30a26"
result: "loss"
pnl_usd: -0.074059
pnl_pct: -1.980198
exit_type: "RESET"
exit_reason: "RESET CLOSE (run 1 archived 2026-11-22 23:2x ET by user order): booked at last recorded price 5.25e-05 minus 1% slip, last checked 2026-11-22 23:20:56. FLAG: price unchanged at 5.250e-05 since 13:25:16 ET (entry 13:24) - possibly untradeable frozen price; real exit may not have been possible."
entry_time: "2026-11-22T13:24:24-05:00"
exit_time: "2026-11-22T23:22:02.093076-05:00"
entry_price: 5.3e-05
exit_price: 5.2e-05
usd_in: 3.74
hold_time: "9h 57m 38s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 27718.58
peak_price: 5.3e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/reset"]
---
# R1-T95 VVVCAT

Coin: [[VVVCAT-b2008502]]  ·  Exit: [[Exit RESET]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0741)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +394.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.59
- [[Rule F3]] **PASS**: liq $27,719
- [[Rule F4]] **PASS**: buys/sells 74/22=3.36
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 17.32
- [[Rule c]] **PASS**: liq $27,719


## Why I entered
winner_pattern: 1h +394% 5m +394%, 1h buys/sells 74/22, vol1h/liq 1.59, score 17.32; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
RESET CLOSE (run 1 archived 2026-11-22 23:2x ET by user order): booked at last recorded price 5.25e-05 minus 1% slip, last checked 2026-11-22 23:20:56. FLAG: price unchanged at 5.250e-05 since 13:25:16 ET (entry 13:24) - possibly untradeable frozen price; real exit may not have been possible.

## Mistake
Loss -2.0% ($-0.07): RESET CLOSE (run 1 archived 2026-11-22 23:2x ET by user order): booked at last recorded price 5.25e-05 minus 1% slip, last checked 2026-11-22 23:20:56. FLAG: price unchanged at 5.250e-05 since 13:25:16 ET (entry 13:24) - possibly untradeable frozen price; real exit may not have been possible.. no rule flag tripped. Entry facts: entry score 17.32, liq $27,719; 5m +394.0% / 1h +394.0%; vol1h/liq 1.59; 1h buys/sells 74/22; held 9h 57m 38s.

## Lesson
passed every filter; record as profile variance and re-check the profile after 10 more trades.

Lesson topics: [[Lesson - Frozen prices]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x937ec6bc34180d69eebeeca62d172c30aeb66c3b138f2a18b503575f60c30a26
