---
trade: 36
run: 1
symbol: "URPS"
name: "US POWER RESERVE⚡️"
contract: "0x20A4FA973CB2c310529922CBc58dbb2006697eDa"
pair: "0xa7ae54411d27892dbc5995c973f9dac1c77d12a35cd6c4a6a86db4a9eddc0e93"
result: "loss"
pnl_usd: -0.023699
pnl_pct: -2.369939
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: URPS has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 0.001503 -1%"
entry_time: "2026-11-19T08:09:59-05:00"
exit_time: "2026-11-19T08:28:54.056942-05:00"
entry_price: 0.001524
exit_price: 0.001488
usd_in: 1.0
hold_time: "18m 55s"
setup: "fresh_launch|wide"
liquidity_at_entry: 2264917.04
peak_price: 0.001524
max_drawdown_pct: -1.383777
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T36 URPS

Coin: [[URPS-20a47eda]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.37% ($-0.0237)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.17%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $2,264,917
- [[Rule F4]] **PASS**: buys/sells 18/9=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.13
- [[Rule c]] **PASS**: liq $2,264,917


## Why I entered
fresh_launch: 1h +0.72% 5m +0.17%, 1h buys/sells 18/9, vol1h/liq 0.01, score 2.13; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: momentum dead: URPS has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 0.001503 -1%

## Mistake
Took a test slot in a near-zero-volume pool (vol1h/liq about 0.00-0.01) that never moved; it then blocked higher-scoring entries

## Lesson
Applied the 07:57 momentum-dead rule: dead-flat positions are exited when the cap blocks a better entry. Low-score (~2) static fresh_launch tests are poor use of slots. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xa7ae54411d27892dbc5995c973f9dac1c77d12a35cd6c4a6a86db4a9eddc0e93
