---
trade: 11
run: 1
symbol: "GOAF"
name: "Global Oil Asset Fund"
contract: "0x1F2EE87182991215e371BF4e1e6d5FC818988eFa"
pair: "0x3881e4ce3ddd8d689401cc4502b1d8244eb7a3afc7a22dd0005957bd00061f2b"
result: "loss"
pnl_usd: -0.090738
pnl_pct: -2.197056
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.001804 -1%"
entry_time: "2026-11-19T00:01:10-05:00"
exit_time: "2026-11-19T00:52:39.022414-05:00"
entry_price: 0.001826
exit_price: 0.001786
usd_in: 4.13
hold_time: "51m 29s"
setup: "fresh_launch|mid"
liquidity_at_entry: 2712521.77
peak_price: 0.001826
max_drawdown_pct: -1.26391
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
# R1-T11 GOAF

Coin: [[GOAF-1f2e8efa]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.20% ($-0.0907)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.01%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $2,712,522
- [[Rule F4]] **FAIL**: buys/sells 24/14=1.71
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.46
- [[Rule c]] **PASS**: liq $2,712,522


## Why I entered
fresh_launch: 1h +0.22% 5m -0.01%, 1h buys/sells 24/14, vol1h/liq 0.01, score 1.46; mid plan SL -10% TP +20% trail 8%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): within ~3% of entry for ~51 min. Sold at market 0.001804 -1%

## Mistake
Entered a token that never got follow-through; the slot was tied up for 51 min.

## Lesson
Bankroll #1. Applied the 45-min flat time stop (|move|<3%). Deep-liquidity tokens (>$1M liq) barely move in an hour, so they are poor scalping candidates: probe size only.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x3881e4ce3ddd8d689401cc4502b1d8244eb7a3afc7a22dd0005957bd00061f2b
