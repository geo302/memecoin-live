---
trade: 5
run: 1
symbol: "VICE VI"
name: "VTCC"
contract: "0xd2c88B2Dd72718B1824f1fD8c9C1bA2Bbd87f75a"
pair: "0x31dde3af0c3beb4e2d4fafaa7a76c4a7da61a5cb3e798fd4688da631c0f554e7"
result: "loss"
pnl_usd: -0.064878
pnl_pct: -1.541041
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): flat within ~1% for ~48 min. Sold at market 1.121e-06 -1%"
entry_time: "2026-11-18T23:41:30-05:00"
exit_time: "2026-11-19T00:29:51.629962-05:00"
entry_price: 1e-06
exit_price: 1e-06
usd_in: 4.21
hold_time: "48m 21s"
setup: "fresh_launch|mid"
liquidity_at_entry: 103959.21
peak_price: 1e-06
max_drawdown_pct: -1.078818
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
# R1-T5 VICEVI

Coin: [[VICEVI-d2c8f75a]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.54% ($-0.0649)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.19%
- [[Rule F2]] **FAIL**: vol1h/liq 0.09
- [[Rule F3]] **PASS**: liq $103,959
- [[Rule F4]] **PASS**: buys/sells 7/1=7.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 9.16
- [[Rule c]] **PASS**: liq $103,959


## Why I entered
fresh_launch: 1h +0.28% 5m +0.19%, 1h buys/sells 7/1, vol1h/liq 0.09, score 9.16; mid plan SL -10% TP +20% trail 8%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): flat within ~1% for ~48 min. Sold at market 1.121e-06 -1%

## Mistake
Same as #4: entered alongside BLKX; zero follow-through.

## Lesson
Bankroll #1. Time stop: Base tokens that sit within ~1-2% of entry for 45 min are dead money; the 1% exit fee is cheaper than tying up slots. Rule: exit any position flat (|move|<3%) after 45 min.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x31dde3af0c3beb4e2d4fafaa7a76c4a7da61a5cb3e798fd4688da631c0f554e7
