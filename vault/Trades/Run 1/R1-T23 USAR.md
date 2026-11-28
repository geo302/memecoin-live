---
trade: 23
run: 1
symbol: "USAR"
name: "USAR🔥"
contract: "0xD30e9cdb657A2eB0F15C27ce716d7EC890e49783"
pair: "0x2fde797b2ab3e8b05a581042ada5cba23da755403b973dbf15d2aa9c86e8cbb9"
result: "loss"
pnl_usd: -0.077426
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.003559 -1%"
entry_time: "2026-11-19T07:25:57-05:00"
exit_time: "2026-11-19T07:57:03.146622-05:00"
entry_price: 0.003595
exit_price: 0.003523
usd_in: 3.91
hold_time: "31m 06s"
setup: "fresh_launch|mid"
liquidity_at_entry: 3524389.17
peak_price: 0.003595
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
# R1-T23 USAR

Coin: [[USAR-d30e9783]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0774)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.31%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $3,524,389
- [[Rule F4]] **PASS**: buys/sells 17/2=8.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.11
- [[Rule c]] **PASS**: liq $3,524,389


## Why I entered
fresh_launch: 1h +0.32% 5m +0.31%, 1h buys/sells 17/2, vol1h/liq 0.00, score 15.11; mid plan SL -10% TP +20% trail 8%; size 5% equity

## Exit
Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.003559 -1%

## Mistake
Entered a static-pool fresh_launch (huge liquidity, almost no 1h volume relative to liquidity), the 17/2 buy signature that lesson #21 and the 07:43 rule now penalize. Capital sat idle and the open slot blocked better tests

## Lesson
Skip fresh_launch pools with liq>1M and vol1h/liq<0.01 (round.py -20 score since 07:43). Exit dead-flat positions once they block the position cap, even before 45 min. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x2fde797b2ab3e8b05a581042ada5cba23da755403b973dbf15d2aa9c86e8cbb9
