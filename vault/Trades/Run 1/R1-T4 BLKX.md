---
trade: 4
run: 1
symbol: "BLKX"
name: "BlackX"
contract: "0x9984DbA7b7Ea6375Ca80A941896e7E0189f677EA"
pair: "0xe39efd8448fbff8f00601631f371a479fb47182e493747a2956dbd3b5d7fade6"
result: "loss"
pnl_usd: -0.072401
pnl_pct: -1.719738
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): flat within ~1% for ~48 min. Sold at market 1.132e-06 -1%"
entry_time: "2026-11-18T23:41:30-05:00"
exit_time: "2026-11-19T00:29:51.629962-05:00"
entry_price: 1e-06
exit_price: 1e-06
usd_in: 4.21
hold_time: "48m 21s"
setup: "fresh_launch|tight"
liquidity_at_entry: 105069.04
peak_price: 1e-06
max_drawdown_pct: -1.077796
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T4 BLKX

Coin: [[BLKX-998477ea]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.72% ($-0.0724)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.15%
- [[Rule F2]] **FAIL**: vol1h/liq 0.09
- [[Rule F3]] **PASS**: liq $105,069
- [[Rule F4]] **PASS**: buys/sells 10/1=10.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 18.29
- [[Rule c]] **PASS**: liq $105,069


## Why I entered
fresh_launch: 1h +1.61% 5m +0.15%, 1h buys/sells 10/1, vol1h/liq 0.09, score 18.29; tight plan SL -6% TP +10% trail 5%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): flat within ~1% for ~48 min. Sold at market 1.132e-06 -1%

## Mistake
Entered a fresh_launch that never moved; capital sat idle ~48 min.

## Lesson
Bankroll #1. Time stop: Base tokens that sit within ~1-2% of entry for 45 min are dead money; the 1% exit fee is cheaper than tying up slots. Rule: exit any position flat (|move|<3%) after 45 min.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xe39efd8448fbff8f00601631f371a479fb47182e493747a2956dbd3b5d7fade6
