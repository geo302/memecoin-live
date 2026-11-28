---
trade: 51
run: 1
symbol: "REPPO"
name: "REPPO"
contract: "0xFf8104251E7761163faC3211eF5583FB3F8583d6"
pair: "0xFf8104251E7761163faC3211eF5583FB3F8583d6:bpool"
result: "loss"
pnl_usd: -0.038559
pnl_pct: -3.855895
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop / momentum dead: trend_continuation test down ~3%, peak only +0.5% in 47 min. Sold at market 0.006561 -1%"
entry_time: "2026-11-19T09:17:30-05:00"
exit_time: "2026-11-19T10:05:06.378787-05:00"
entry_price: 0.006756
exit_price: 0.006495
usd_in: 1.0
hold_time: "47m 36s"
setup: "trend_continuation|mid"
liquidity_at_entry: 391763.8
peak_price: 0.006789
max_drawdown_pct: -3.358374
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
# R1-T51 REPPO

Coin: [[REPPO-ff8183d6]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -3.86% ($-0.0386)  ·  setup `trend_continuation|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $391,764
- [[Rule F4]] **PASS**: buys/sells 12/5=2.40
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.18
- [[Rule c]] **PASS**: liq $391,764


## Why I entered
trend_continuation: 1h +3.74% 5m +0%, 1h buys/sells 12/5, vol1h/liq 0.01, score 3.18; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop / momentum dead: trend_continuation test down ~3%, peak only +0.5% in 47 min. Sold at market 0.006561 -1%

## Mistake
Trend_continuation test with vol1h/liq 0.01 and 5m 0% at entry (dead-pool-like); drifted down. Bankroll 1.

## Lesson
Bankroll 1: trend_continuation on near-zero volume is a slippage bleed; the dead-pool filter now covers most of these.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xff8104251e7761163fac3211ef5583fb3f8583d6:bpool
