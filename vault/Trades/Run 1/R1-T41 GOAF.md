---
trade: 41
run: 1
symbol: "GOAF"
name: "Global Oil Asset Fund"
contract: "0x08965f33bAe7d488B124D5835c7999107Bd07251"
pair: "0x580350f2fddabedefa543d5472b3920d2df132ad047be83e1a7b5fe1347f913a"
result: "loss"
pnl_usd: -0.020343
pnl_pct: -2.034323
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: GOAF has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 0.00181 -1%"
entry_time: "2026-11-19T08:23:02-05:00"
exit_time: "2026-11-19T08:28:54.056942-05:00"
entry_price: 0.001829
exit_price: 0.001792
usd_in: 1.0
hold_time: "5m 52s"
setup: "fresh_launch|mid"
liquidity_at_entry: 2717990.28
peak_price: 0.001829
max_drawdown_pct: -1.04477
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T41 GOAF

Coin: [[GOAF-08967251]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.03% ($-0.0203)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.24%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $2,717,990
- [[Rule F4]] **FAIL**: buys/sells 27/15=1.80
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.59
- [[Rule c]] **PASS**: liq $2,717,990


## Why I entered
fresh_launch: 1h +0.35% 5m -0.24%, 1h buys/sells 27/15, vol1h/liq 0.01, score 1.59; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: momentum dead: GOAF has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 0.00181 -1%

## Mistake
Took a test slot in a near-zero-volume pool (vol1h/liq about 0.00-0.01) that never moved; it then blocked higher-scoring entries

## Lesson
Applied the 07:57 momentum-dead rule: dead-flat positions are exited when the cap blocks a better entry. Low-score (~2) static fresh_launch tests are poor use of slots. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x580350f2fddabedefa543d5472b3920d2df132ad047be83e1a7b5fe1347f913a
