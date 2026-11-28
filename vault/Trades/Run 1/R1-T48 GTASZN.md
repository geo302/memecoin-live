---
trade: 48
run: 1
symbol: "GTASZN"
name: "GTA Season"
contract: "0x0D21FcB3b0d8a8D4e7754fAdaEb4fd48c28983C3"
pair: "0x434ef21c1091c5aa680c55f3ee23c8de2594d9ad53931389d9344c72912fe62a"
result: "win"
pnl_usd: 0.006164
pnl_pct: 0.616353
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: fresh_launch test 48 min old, back within 2% of entry after peaking only +3.4%. Sold at market 2.015e-05 -1%"
entry_time: "2026-11-19T09:11:26-05:00"
exit_time: "2026-11-19T09:59:43.892376-05:00"
entry_price: 2e-05
exit_price: 2e-05
usd_in: 1.0
hold_time: "48m 17s"
setup: "fresh_launch|wide"
liquidity_at_entry: 35780.66
peak_price: 2.1e-05
max_drawdown_pct: -1.707317
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/discretionary"]
---
# R1-T48 GTASZN

Coin: [[GTASZN-0d2183c3]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +0.62% ($+0.0062)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.07%
- [[Rule F2]] **FAIL**: vol1h/liq 0.05
- [[Rule F3]] **PASS**: liq $35,781
- [[Rule F4]] **PASS**: buys/sells 22/7=3.14
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.16
- [[Rule c]] **PASS**: liq $35,781


## Why I entered
fresh_launch: 1h +18.4% 5m -0.07%, 1h buys/sells 22/7, vol1h/liq 0.05, score 6.16; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: fresh_launch test 48 min old, back within 2% of entry after peaking only +3.4%. Sold at market 2.015e-05 -1%

## Mistake
No real mistake: small win, but capital sat ~48 min for a <1% net gain on a coin whose move stalled right after entry. Bankroll 1.

## Lesson
Bankroll 1: fresh_launch tests that do not move +5% within ~15 min rarely do later; the 45-min time stop is correct and could be shortened for tests.

Lesson topics: [[Lesson - What worked (wins)]]

DexScreener: https://dexscreener.com/base/0x434ef21c1091c5aa680c55f3ee23c8de2594d9ad53931389d9344c72912fe62a
