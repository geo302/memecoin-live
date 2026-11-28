---
trade: 86
run: 1
symbol: "VELVET"
name: "Velvet"
contract: "0xbF927b841994731C573BDF09ceB0c6B0Aa887cDd"
pair: "0x6b0F53cbD9272D8117e9535FE25371dedF39a1bE"
result: "loss"
pnl_usd: -0.035467
pnl_pct: -3.546725
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner $1 test, ~-1% after 45m, no momentum). Sold at market 0.06896 -1%"
entry_time: "2026-11-19T22:34:19-05:00"
exit_time: "2026-11-19T23:20:09.276588-05:00"
entry_price: 0.070781
exit_price: 0.06827
usd_in: 1.0
hold_time: "45m 50s"
setup: "momentum_breakout|mid"
liquidity_at_entry: 1112757.57
peak_price: 0.070781
max_drawdown_pct: -2.628962
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
# R1-T86 VELVET

Coin: [[VELVET-bf927cdd]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -3.55% ($-0.0355)  ·  setup `momentum_breakout|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +1.37%
- [[Rule F2]] **FAIL**: vol1h/liq 0.05
- [[Rule F3]] **PASS**: liq $1,112,758
- [[Rule F4]] **FAIL**: buys/sells 690/681=1.01
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.15
- [[Rule c]] **PASS**: liq $1,112,758


## Why I entered
momentum_breakout: 1h +7.33% 5m +1.37%, 1h buys/sells 690/681, vol1h/liq 0.05, score 1.15; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner $1 test, ~-1% after 45m, no momentum). Sold at market 0.06896 -1%

## Mistake
Entered a large-liquidity, slow-moving coin as a scalp test; no momentum to scalp

## Lesson
Bankroll #1: high-liquidity ($1M+) coins with small 1h moves rarely move enough in 45m to beat the 2% round-trip cost; prefer after_style momentum

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x6b0f53cbd9272d8117e9535fe25371dedf39a1be
