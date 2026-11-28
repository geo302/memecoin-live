---
trade: 38
run: 1
symbol: "DOT"
name: "Dot"
contract: "0x23A2847d772803f9EFC64B4277b782b06296FE51"
pair: "0x5f547579519beaa158cddd3543604029165f66e86a00c373d0ee90c38784921b"
result: "loss"
pnl_usd: -0.04435
pnl_pct: -4.434985
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: trend_continuation test never traded above entry (peak = entry) in 49+ min and is down ~3.5%. Sold at market 0.005567 -1%"
entry_time: "2026-11-19T08:13:38-05:00"
exit_time: "2026-11-19T09:03:25.637546-05:00"
entry_price: 0.005767
exit_price: 0.005511
usd_in: 1.0
hold_time: "49m 47s"
setup: "trend_continuation|mid"
liquidity_at_entry: 374708.06
peak_price: 0.005767
max_drawdown_pct: -4.041893
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
# R1-T38 DOT

Coin: [[DOT-23a2fe51]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -4.43% ($-0.0443)  ·  setup `trend_continuation|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +1.69%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $374,708
- [[Rule F4]] **PASS**: buys/sells 4/1=4.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.54
- [[Rule c]] **PASS**: liq $374,708


## Why I entered
trend_continuation: 1h +1.14% 5m +1.69%, 1h buys/sells 4/1, vol1h/liq 0.01, score 3.54; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: momentum dead: trend_continuation test never traded above entry (peak = entry) in 49+ min and is down ~3.5%. Sold at market 0.005567 -1%

## Mistake
Entered a trend_continuation test after the move had already stalled; it never printed a higher price than my fill.

## Lesson
Bankroll 1: trend_continuation tests that are not above entry within ~45 min get cut; no need to wait for the -10% stop.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x5f547579519beaa158cddd3543604029165f66e86a00c373d0ee90c38784921b
