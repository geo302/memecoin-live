---
trade: 27
run: 1
symbol: "EXEN"
name: "EXEN🔥"
contract: "0x255838823530E7acAa1B2FD55390927720E378d0"
pair: "0x9dd50f3145856fdfd8bbed768fade9e8085d04c242eeafbed6cc194cf07f80e1"
result: "win"
pnl_usd: 0.054369
pnl_pct: 5.4369
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: static-pool fresh_launch (liq $2.7M), price stuck at 0.002772 since 07:29; the +6.5% was one tick and never followed through. Sold at market 0.002772 -1%"
entry_time: "2026-11-19T07:28:32-05:00"
exit_time: "2026-11-19T08:13:28.185351-05:00"
entry_price: 0.002603
exit_price: 0.002744
usd_in: 1.0
hold_time: "44m 56s"
setup: "fresh_launch|wide"
liquidity_at_entry: 2551576.38
peak_price: 0.002772
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
tags: ["trade", "run1", "win", "exit/discretionary"]
---
# R1-T27 EXEN

Coin: [[EXEN-255878d0]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +5.44% ($+0.0544)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.03%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $2,551,576
- [[Rule F4]] **PASS**: buys/sells 17/2=8.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 14.99
- [[Rule c]] **PASS**: liq $2,551,576


## Why I entered
fresh_launch: 1h -0.03% 5m -0.03%, 1h buys/sells 17/2, vol1h/liq 0.00, score 14.99; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: static-pool fresh_launch (liq $2.7M), price stuck at 0.002772 since 07:29; the +6.5% was one tick and never followed through. Sold at market 0.002772 -1%

## Mistake
Static-pool fresh_launch entry (multi-$M liquidity, near-zero volume, 17/2 buy signature). The paper gain was a single tick with no volume behind it

## Lesson
Static-pool template is now penalized -20 in round.py. A one-tick gain in a zero-volume pool is not momentum; take it at the time stop. Bankroll #1

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Dead or static pools]]

DexScreener: https://dexscreener.com/base/0x9dd50f3145856fdfd8bbed768fade9e8085d04c242eeafbed6cc194cf07f80e1
