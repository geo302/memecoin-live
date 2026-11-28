---
trade: 24
run: 1
symbol: "USRP"
name: "USRP🔥"
contract: "0xE8Dc5369Ea93b8c3515098aDE2a14a30DDA2391F"
pair: "0xe20cc73cda78482c6adba821a86a2cbd367f11f8b4e5e739c4a50f04b11b60c9"
result: "loss"
pnl_usd: -0.077426
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.004612 -1%"
entry_time: "2026-11-19T07:25:57-05:00"
exit_time: "2026-11-19T07:57:03.146622-05:00"
entry_price: 0.004658
exit_price: 0.004566
usd_in: 3.91
hold_time: "31m 06s"
setup: "fresh_launch|wide"
liquidity_at_entry: 4566842.49
peak_price: 0.004658
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
# R1-T24 USRP

Coin: [[USRP-e8dc391f]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0774)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.23%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $4,566,842
- [[Rule F4]] **PASS**: buys/sells 17/2=8.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.08
- [[Rule c]] **PASS**: liq $4,566,842


## Why I entered
fresh_launch: 1h +0.23% 5m +0.23%, 1h buys/sells 17/2, vol1h/liq 0.00, score 15.08; wide plan SL -15% TP +35% trail 12%; size 5% equity

## Exit
Discretionary exit: momentum dead: static-pool fresh_launch (liq $2.3M-4.7M), price has not moved since entry; freeing a slot because the 9-position cap blocked new tests this round. Sold at market 0.004612 -1%

## Mistake
Entered a static-pool fresh_launch (huge liquidity, almost no 1h volume relative to liquidity), the 17/2 buy signature that lesson #21 and the 07:43 rule now penalize. Capital sat idle and the open slot blocked better tests

## Lesson
Skip fresh_launch pools with liq>1M and vol1h/liq<0.01 (round.py -20 score since 07:43). Exit dead-flat positions once they block the position cap, even before 45 min. Bankroll #1

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xe20cc73cda78482c6adba821a86a2cbd367f11f8b4e5e739c4a50f04b11b60c9
