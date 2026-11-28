---
trade: 40
run: 1
symbol: "UDO F"
name: "UDOF"
contract: "0x1b33DaA152943fCc5161f8287d548DC066a98195"
pair: "0x3183783526b086b4f8f140807f2354b940ed193f204a55d8f299f6886e8d5d41"
result: "loss"
pnl_usd: -0.016934
pnl_pct: -1.693423
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: fresh_launch test within 1% of entry and never above entry (peak = entry) after 45 min. Sold at market 0.001714 -1%"
entry_time: "2026-11-19T08:19:25-05:00"
exit_time: "2026-11-19T09:04:33.277264-05:00"
entry_price: 0.001726
exit_price: 0.001697
usd_in: 1.0
hold_time: "45m 08s"
setup: "fresh_launch|tight"
liquidity_at_entry: 2564103.79
peak_price: 0.001726
max_drawdown_pct: -1.279771
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
# R1-T40 UDOF

Coin: [[UDOF-1b338195]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.69% ($-0.0169)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.04%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $2,564,104
- [[Rule F4]] **FAIL**: buys/sells 24/13=1.85
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.77
- [[Rule c]] **PASS**: liq $2,564,104


## Why I entered
fresh_launch: 1h +0.52% 5m +0.04%, 1h buys/sells 24/13, vol1h/liq 0.01, score 1.77; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: fresh_launch test within 1% of entry and never above entry (peak = entry) after 45 min. Sold at market 0.001714 -1%

## Mistake
Static-pool fresh_launch (liq ~$2.6M) never moved; capital sat idle for 45 min.

## Lesson
Bankroll 1: huge-liquidity fresh launches with low 1h volume relative to liquidity are dead money; the -20 static-pool score penalty should keep filtering these.

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x3183783526b086b4f8f140807f2354b940ed193f204a55d8f299f6886e8d5d41
