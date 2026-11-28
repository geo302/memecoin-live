---
trade: 2
run: 1
symbol: "LAPTOP"
name: "LAPTOP"
contract: "0x247F38373533ef8D5bD0b34fb1329b92210aA4B3"
pair: "0x9EDEd3224De83C89BeDDCaE77d869b6242aA53a5"
result: "loss"
pnl_usd: -6.999626
pnl_pct: -99.994664
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 8.656e-11 <= stop 1.445e-06)"
entry_time: "2026-11-18T23:33:21-05:00"
exit_time: "2026-11-18T23:40:38.613166-05:00"
entry_price: 2e-06
exit_price: 0.0
usd_in: 7.0
hold_time: "7m 17s"
setup: "fresh_launch|mid"
liquidity_at_entry: 14961.34
peak_price: 2e-06
max_drawdown_pct: -99.994789
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
# R1-T2 LAPTOP

Coin: [[LAPTOP-247fa4b3]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -99.99% ($-6.9996)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +6.56%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **FAIL**: liq $14,961
- [[Rule F4]] **PASS**: buys/sells 38/6=6.33
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 16.59
- [[Rule c]] **FAIL**: liq $14,961


## Why I entered
fresh_launch: 1h +41.79% 5m +6.56%, 1h buys/sells 38/6, vol1h/liq 0.10, score 16.59; mid plan SL -10% TP +20% trail 8%; size 7% equity

## Exit
Stop-loss hit (price 8.656e-11 <= stop 1.445e-06)

## Mistake
Same pattern as #1: ~15-min-old fresh launch, $15k liq, mc $8.9k, entered on 1h +42% with 38/6 buys/sells; liquidity pulled after 7m, -100%.

## Lesson
Bankroll #1. 2 of 3 fresh_launch trades were full LP rugs within 10 min. Strong early buy/sell ratio is NOT a safety signal on micro-launches (likely deployer/bundled buys). Size fresh launches at 2%, and test older tokens (6h+) and higher liquidity instead.

Lesson topics: [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x9eded3224de83c89beddcae77d869b6242aa53a5
