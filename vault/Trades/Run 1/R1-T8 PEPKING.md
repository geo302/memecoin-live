---
trade: 8
run: 1
symbol: "PEPKING"
name: "PepeKing"
contract: "0x76ACFF92453480024d005b22134e973c7E79916c"
pair: "0x165457beB62438530Fdb18f1541b6c34ad46F498"
result: "loss"
pnl_usd: -1.679928
pnl_pct: -99.995698
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 6.688e-11 <= stop 1.385e-06)"
entry_time: "2026-11-18T23:51:02-05:00"
exit_time: "2026-11-19T00:04:15.590256-05:00"
entry_price: 2e-06
exit_price: 0.0
usd_in: 1.68
hold_time: "13m 13s"
setup: "fresh_launch|mid"
liquidity_at_entry: 14665.78
peak_price: 2e-06
max_drawdown_pct: -99.995993
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T8 PEPKING

Coin: [[PEPKING-76ac916c]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.6799)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +8.61%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **FAIL**: liq $14,666
- [[Rule F4]] **PASS**: buys/sells 32/6=5.33
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.48
- [[Rule c]] **FAIL**: liq $14,666


## Why I entered
fresh_launch: 1h +35.62% 5m +8.61%, 1h buys/sells 32/6, vol1h/liq 0.10, score 5.48; mid plan SL -10% TP +20% trail 8%; size 2% equity

## Exit
Stop-loss hit (price 6.688e-11 <= stop 1.385e-06)

## Mistake
Bought a fresh launch (PEPKING, $14.7k liq) at 2% size. It peaked +8.4% and I had no partial take-profit; LP pulled 13 min after entry, -100%.

## Lesson
Bankroll #1. 4 of 4 fresh launches under $25k liquidity have now been full LP rugs within 15 min (#1, #2, #7, #8), and #3 gapped -34%. Stops never trigger in time. Size these at 1% from now on (still 1 per round, to keep the sample going) and put real size into older or deeper-liquidity setups.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x165457beb62438530fdb18f1541b6c34ad46f498
