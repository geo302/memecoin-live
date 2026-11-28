---
trade: 65
run: 1
symbol: "IPO"
name: "Infinite Profit Opportunity"
contract: "0xb200000000000000000000B64bC46c7E0cC66a01"
pair: "0xff28cb103334e2bf0edb0b816eeb4351118f1fbd63322bc12b58e3a591eaf84b"
result: "win"
pnl_usd: 0.52266
pnl_pct: 52.265964
exit_type: "TP"
exit_reason: "Take-profit hit (price 2.021e-05 >= target 1.774e-05)"
entry_time: "2026-11-19T12:40:14-05:00"
exit_time: "2026-11-19T12:41:46.790758-05:00"
entry_price: 1.3e-05
exit_price: 2e-05
usd_in: 1.0
hold_time: "1m 32s"
setup: "fresh_launch|wide"
liquidity_at_entry: 10425.63
peak_price: 2e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T65 IPO

Coin: [[IPO-b2006a01]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +52.27% ($+0.5227)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **PASS**: 5m +119.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.39
- [[Rule F3]] **FAIL**: liq $10,426
- [[Rule F4]] **PASS**: buys/sells 79/19=4.16
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.7
- [[Rule c]] **FAIL**: liq $10,426


## Why I entered
fresh_launch: 1h +119% 5m +119%, 1h buys/sells 79/19, vol1h/liq 1.39, score 5.7; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Take-profit hit (price 2.021e-05 >= target 1.774e-05)

## Mistake
None on entry or exit; take-profit filled about 90s after entry. Fixed TP may have capped a bigger move, but size was only a $1 test.

## Lesson
Fresh launch IPO hit +52% in about 1.5 min. Fresh launches with an instant burst can pay off fast. Watch whether the post-exit price kept running; if fresh_launch winners keep overshooting the TP, try a trailing exit instead of a fixed TP. Bankroll #1.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0xff28cb103334e2bf0edb0b816eeb4351118f1fbd63322bc12b58e3a591eaf84b
