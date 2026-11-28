---
trade: 55
run: 1
symbol: "VTC6⚡️"
name: "VTC6⚡️"
contract: "0xFE6Fa24c11a588F6299093b31420F3e99Ee0bE86"
pair: "0x5a72c716f51f422c5a34c1299f7b408a6fb751b4ae110a74255fb84eb8e0af58"
result: "loss"
pnl_usd: -0.020531
pnl_pct: -2.053129
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner test, ~45 min held, price flat around -1%, no momentum). Sold at market 1.343e-06 -1%"
entry_time: "2026-11-19T10:23:33-05:00"
exit_time: "2026-11-19T11:07:37.404572-05:00"
entry_price: 1e-06
exit_price: 1e-06
usd_in: 1.0
hold_time: "44m 04s"
setup: "fresh_launch|wide"
liquidity_at_entry: 122797.44
peak_price: 1e-06
max_drawdown_pct: -1.72678
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
# R1-T55 VTC6

Coin: [[VTC6-fe6fbe86]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.05% ($-0.0205)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.39%
- [[Rule F2]] **FAIL**: vol1h/liq 0.12
- [[Rule F3]] **PASS**: liq $122,797
- [[Rule F4]] **PASS**: buys/sells 11/3=3.67
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.26
- [[Rule c]] **PASS**: liq $122,797


## Why I entered
fresh_launch: 1h -0.95% 5m -0.39%, 1h buys/sells 11/3, vol1h/liq 0.12, score 5.26; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner test, ~45 min held, price flat around -1%, no momentum). Sold at market 1.343e-06 -1%

## Mistake
Bought a fading fresh launch (1h -0.95%, 5m -0.39%) on thin flow (11/3 buys/sells); it never moved

## Lesson
Bankroll #1: fresh_launch tests with a negative 1h and only ~14 trades/hour go nowhere; require positive 1h momentum for fresh_launch tests

Lesson topics: [[Lesson - Thin or one-sided flow]]

DexScreener: https://dexscreener.com/base/0x5a72c716f51f422c5a34c1299f7b408a6fb751b4ae110a74255fb84eb8e0af58
