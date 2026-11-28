---
trade: 21
run: 1
symbol: "CHUBBY"
name: "Chubby"
contract: "0xFD1F7F3Cd20950B53176f640a9C7Cc7e423a98A6"
pair: "0x487243E403d6d82d3cd46C40CDa58014a3383A74"
result: "loss"
pnl_usd: -1.0
pnl_pct: -99.999999
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 6.513e-15 <= stop 1.019e-06)"
entry_time: "2026-11-19T07:25:57-05:00"
exit_time: "2026-11-19T07:33:32.304488-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.0
hold_time: "7m 35s"
setup: "fresh_launch|wide"
liquidity_at_entry: 11792.99
peak_price: 1e-06
max_drawdown_pct: -99.999999
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T21 CHUBBY

Coin: [[CHUBBY-fd1f98a6]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.0000)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +16.98%
- [[Rule F2]] **FAIL**: vol1h/liq 0.06
- [[Rule F3]] **FAIL**: liq $11,793
- [[Rule F4]] **PASS**: buys/sells 30/1=30.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 56.02
- [[Rule c]] **FAIL**: liq $11,793


## Why I entered
fresh_launch: 1h +27.14% 5m +16.98%, 1h buys/sells 30/1, vol1h/liq 0.06, score 56.02; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Stop-loss hit (price 6.513e-15 <= stop 1.019e-06)

## Mistake
Bought a $1 test in a thin fresh launch (liq $11.8k, mc $6.6k, vol1h/liq low) - the exact template that had already rugged 6/6 (incl. an earlier CHUBBY copy, #1). LP was pulled ~7.5 min in; price went to ~0.

## Lesson
Thin-liq (<$15k) low-volume fresh launches are 0/7, every one -100%; stops cannot help against an LP pull. round.py now scores them -4 more so the 2 test slots go to other setups. Bankroll #1.

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x487243e403d6d82d3cd46c40cda58014a3383a74
