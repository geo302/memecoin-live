---
trade: 10
run: 1
symbol: "NOTF"
name: "NOTF"
contract: "0x0204F3Ac7bcd8750A32876b9884E3f2CD5152beF"
pair: "0xf55f768bfcfe3a5970fecf30e5b4ea7b305add23e16f2e4512abc19809161ed5"
result: "loss"
pnl_usd: -0.086456
pnl_pct: -2.093373
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.009516 -1%"
entry_time: "2026-11-19T00:01:10-05:00"
exit_time: "2026-11-19T00:52:39.022414-05:00"
entry_price: 0.009622
exit_price: 0.009421
usd_in: 4.13
hold_time: "51m 29s"
setup: "fresh_launch|tight"
liquidity_at_entry: 14291006.48
peak_price: 0.009622
max_drawdown_pct: -1.208343
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
# R1-T10 NOTF

Coin: [[NOTF-02042bef]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.09% ($-0.0865)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.04%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $14,291,006
- [[Rule F4]] **FAIL**: buys/sells 25/13=1.92
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.86
- [[Rule c]] **PASS**: liq $14,291,006


## Why I entered
fresh_launch: 1h +0.21% 5m -0.04%, 1h buys/sells 25/13, vol1h/liq 0.00, score 1.86; tight plan SL -6% TP +10% trail 5%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.009516 -1%

## Mistake
Entered a multi-million-liq token (NOTF, about $14M liq) that is too deep to scalp; it never moved more than about 1%.

## Lesson
Bankroll #1. Applied the 45-min flat time stop (|move|<3%). Deep-liquidity tokens (>$1M liq) barely move in an hour, so they are poor scalping candidates: probe size only.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xf55f768bfcfe3a5970fecf30e5b4ea7b305add23e16f2e4512abc19809161ed5
