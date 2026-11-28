---
trade: 77
run: 1
symbol: "Anthropic"
name: "Anthropic"
contract: "0xBc6066cCD5a9b3E23688b49A64De55f8396b26fB"
pair: "0x17894F1B9A4E137a7a773AA31406976F5c4084CE"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: Discretionary exit: 45-minute flat time stop (momentum_breakout $1 test, price within 3% of entry after ~45 min). Sold at market -1%. Sold at market 1.020e-04 -1%"
entry_time: "2026-11-19T17:22:22-05:00"
exit_time: "2026-11-19T18:07:26.872694-05:00"
entry_price: 0.000103
exit_price: 0.000101
usd_in: 1.0
hold_time: "45m 04s"
setup: "momentum_breakout|mid"
liquidity_at_entry: 10272845.78
peak_price: 0.000103
max_drawdown_pct: -0.990099
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
# R1-T77 Anthropic

Coin: [[Anthropic-bc6026fb]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `momentum_breakout|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $10,272,846
- [[Rule F4]] **FAIL**: buys/sells 604/587=1.03
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 4.91
- [[Rule c]] **PASS**: liq $10,272,846


## Why I entered
momentum_breakout: 1h +48.51% 5m +0%, 1h buys/sells 604/587, vol1h/liq 0.00, score 4.91; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: Discretionary exit: 45-minute flat time stop (momentum_breakout $1 test, price within 3% of entry after ~45 min). Sold at market -1%. Sold at market 1.020e-04 -1%

## Mistake
Bought a momentum test on a huge-liquidity ($10M) pool that had no real momentum; price never moved

## Lesson
Big-liquidity pools barely move in 45 min; for scalping, $1 momentum tests should require a real 1h/5m move, not just a high score.

Lesson topics: [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x17894f1b9a4e137a7a773aa31406976f5c4084ce
