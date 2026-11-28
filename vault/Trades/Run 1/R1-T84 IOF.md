---
trade: 84
run: 1
symbol: "IOF"
name: "IOF🔥"
contract: "0xDadFb82511D3754cD9980f9438a874a2990A1BDA"
pair: "0x75ac82d1d168242fda3bfef75a8326970ca1e91af35996e1cb4c0b05d47a08ef"
result: "loss"
pnl_usd: -0.854954
pnl_pct: -85.495433
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 1.718e-07 <= stop 9.967e-07)"
entry_time: "2026-11-19T21:33:42-05:00"
exit_time: "2026-11-19T21:50:24.068340-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.0
hold_time: "16m 42s"
setup: "fresh_launch|wide"
liquidity_at_entry: 107346.27
peak_price: 1e-06
max_drawdown_pct: -85.348922
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T84 IOF

Coin: [[IOF-dadf1bda]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -85.50% ($-0.8550)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.01%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **PASS**: liq $107,346
- [[Rule F4]] **PASS**: buys/sells 12/2=6.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 8.21
- [[Rule c]] **PASS**: liq $107,346


## Why I entered
fresh_launch: 1h +1.08% 5m -0.01%, 1h buys/sells 12/2, vol1h/liq 0.10, score 8.21; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Stop-loss hit (price 1.718e-07 <= stop 9.967e-07)

## Mistake
Bought a 16-minute-old fresh_launch whose $107k liquidity was far out of proportion to its trading (only 12 buys / 2 sells in 1h, vol1h/liq 0.10, honeypot.is not indexed). The liquidity was pulled in one 12-second tick ($117k -> $17k) and price fell 85%, so the -15% stop filled at -85.5%

## Lesson
Bankroll #1: big liquidity with almost no trading on a brand-new token is a dev-seeded pool that can be pulled at any time, and stops can't protect against it. New round.py rule: pass on fresh_launch when 1h txns < 25 and vol1h/liq < 0.2. Similar trades (#4,#5,#33,#39,#50,#55,#59,#74-76) were mostly -2% flat; #42 Basecat and #84 IOF went to ~0

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Honeypots and taxes]]

DexScreener: https://dexscreener.com/base/0x75ac82d1d168242fda3bfef75a8326970ca1e91af35996e1cb4c0b05d47a08ef
