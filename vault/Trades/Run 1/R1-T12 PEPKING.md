---
trade: 12
run: 1
symbol: "PEPKING"
name: "PepeKing"
contract: "0x0547bf628F337669B3265a4Cc2f33584Aa63aFC8"
pair: "0x40DB2D993AE471A43A61dd97C72c0801C39FFEE4"
result: "win"
pnl_usd: 0.044048
pnl_pct: 1.090302
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: copycat relaunch of PEPKING (#8 rugged 8 min earlier), $15k liq, and a sizing bug put it at 5% instead of 1%. Sold at market 1.712e-06 -1%"
entry_time: "2026-11-19T00:11:28-05:00"
exit_time: "2026-11-19T00:12:27.691584-05:00"
entry_price: 2e-06
exit_price: 2e-06
usd_in: 4.04
hold_time: "0m 59s"
setup: "fresh_launch|wide"
liquidity_at_entry: 15291.96
peak_price: 2e-06
max_drawdown_pct: -0.512943
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "FAIL"
tags: ["trade", "run1", "win", "exit/discretionary"]
---
# R1-T12 PEPKING

Coin: [[PEPKING-0547afc8]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +1.09% ($+0.0440)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +10.18%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **FAIL**: liq $15,292
- [[Rule F4]] **PASS**: buys/sells 45/4=11.25
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 18.92
- [[Rule c]] **FAIL**: liq $15,292


## Why I entered
fresh_launch: 1h +47.69% 5m +10.18%, 1h buys/sells 45/4, vol1h/liq 0.10, score 18.92; wide plan SL -15% TP +35% trail 12%; size 5% equity

## Exit
Discretionary exit: copycat relaunch of PEPKING (#8 rugged 8 min earlier), $15k liq, and a sizing bug put it at 5% instead of 1%. Sold at market 1.712e-06 -1%

## Mistake
Entry broke two rules: (1) a stats override in round.py raised micro fresh_launch size from 1% to 5%; (2) no cooldown on a symbol that had just rugged under a different contract.

## Lesson
Bankroll #1. Fixed: the micro-launch size cap now applies after the stats override, and a 2h cooldown blocks any symbol that just closed at a loss. Copycat relaunches of just-rugged names are a scam pattern.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Re-entry and copycat tickers]], [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x40db2d993ae471a43a61dd97c72c0801c39ffee4
