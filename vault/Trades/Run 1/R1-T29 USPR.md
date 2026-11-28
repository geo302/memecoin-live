---
trade: 29
run: 1
symbol: "USPR"
name: "USPR🔥"
contract: "0xA26d37e98189b7F4AB84027Ff2da1496AB284231"
pair: "0x2d23c783b2d7f2ab931cb79f6f7dac389da57cfcbb3ddec92d7e9eafe97b6a6e"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.003845 -1%"
entry_time: "2026-11-19T07:32:17-05:00"
exit_time: "2026-11-19T07:57:03.146622-05:00"
entry_price: 0.003883
exit_price: 0.003807
usd_in: 1.0
hold_time: "24m 46s"
setup: "fresh_launch|mid"
liquidity_at_entry: 3806587.56
peak_price: 0.003883
max_drawdown_pct: -0.990099
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
# R1-T29 USPR

Coin: [[USPR-a26d4231]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.04%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $3,806,588
- [[Rule F4]] **PASS**: buys/sells 17/2=8.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.02
- [[Rule c]] **PASS**: liq $3,806,588


## Why I entered
fresh_launch: 1h +0.05% 5m +0.04%, 1h buys/sells 17/2, vol1h/liq 0.00, score 15.02; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.003845 -1%

## Mistake
Entered a static-pool fresh_launch (huge liquidity, almost no 1h volume relative to liquidity), the 17/2 buy signature that lesson #21 and the 07:43 rule now penalize. Capital sat idle and the open slot blocked better tests

## Lesson
Skip fresh_launch pools with liq>1M and vol1h/liq<0.01 (round.py -20 score since 07:43). Exit dead-flat positions once they block the position cap, even before 45 min. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x2d23c783b2d7f2ab931cb79f6f7dac389da57cfcbb3ddec92d7e9eafe97b6a6e
