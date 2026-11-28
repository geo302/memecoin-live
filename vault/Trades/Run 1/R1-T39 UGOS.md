---
trade: 39
run: 1
symbol: "UGOS"
name: "Global Oil Supply United (UGOS)"
contract: "0x0201ff4cD1E08FdA2F22e79691327c4D1064bd09"
pair: "0xd3da91905d43307d177fbff7bf0220c40f569ce7d0605d292aa8185016ce7ed7"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: UGOS has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 8.955e-05 -1%"
entry_time: "2026-11-19T08:19:25-05:00"
exit_time: "2026-11-19T08:28:54.056942-05:00"
entry_price: 9e-05
exit_price: 8.9e-05
usd_in: 1.0
hold_time: "9m 29s"
setup: "fresh_launch|wide"
liquidity_at_entry: 88662.39
peak_price: 9e-05
max_drawdown_pct: -0.990099
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
# R1-T39 UGOS

Coin: [[UGOS-0201bd09]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $88,662
- [[Rule F4]] **PASS**: buys/sells 7/2=3.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.01
- [[Rule c]] **PASS**: liq $88,662


## Why I entered
fresh_launch: 1h +0.13% 5m +0%, 1h buys/sells 7/2, vol1h/liq 0.00, score 2.01; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: momentum dead: UGOS has not moved beyond the entry slippage (static/near-zero-volume pool) and the 9-position cap blocked Basecat (score 76) and ANTHROPIC (score 9) this round. Sold at market 8.955e-05 -1%

## Mistake
Took a test slot in a near-zero-volume pool (vol1h/liq about 0.00-0.01) that never moved; it then blocked higher-scoring entries

## Lesson
Applied the 07:57 momentum-dead rule: dead-flat positions are exited when the cap blocks a better entry. Low-score (~2) static fresh_launch tests are poor use of slots. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xd3da91905d43307d177fbff7bf0220c40f569ce7d0605d292aa8185016ce7ed7
