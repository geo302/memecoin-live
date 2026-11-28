---
trade: 3
run: 1
symbol: "SOUP"
name: "SOUP"
contract: "0xa056697665976F594dF33171F04dd1e53535cCCc"
pair: "0x3e3fcc684c9cbac45db1c1de8322ea20510423bc868e93f362250dce654bb038"
result: "loss"
pnl_usd: -1.723126
pnl_pct: -34.462518
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 9.267e-06 <= stop 1.190e-05)"
entry_time: "2026-11-18T23:33:21-05:00"
exit_time: "2026-11-18T23:33:59.189023-05:00"
entry_price: 1.4e-05
exit_price: 9e-06
usd_in: 5.0
hold_time: "0m 38s"
setup: "fresh_launch|wide"
liquidity_at_entry: 10946.83
peak_price: 1.4e-05
max_drawdown_pct: -33.800523
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
# R1-T3 SOUP

Coin: [[SOUP-a056cccc]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -34.46% ($-1.7231)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +49.14%
- [[Rule F2]] **FAIL**: vol1h/liq 0.54
- [[Rule F3]] **FAIL**: liq $10,947
- [[Rule F4]] **PASS**: buys/sells 62/20=3.10
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.74
- [[Rule c]] **FAIL**: liq $10,947


## Why I entered
fresh_launch: 1h +238% 5m +49.14%, 1h buys/sells 62/20, vol1h/liq 0.54, score 15.74; wide plan SL -15% TP +35% trail 12%; size 5% equity

## Exit
Stop-loss hit (price 9.267e-06 <= stop 1.190e-05)

## Mistake
Bought a 6-minute-old token right after a +238% 1h / +49% 5m candle, unindexed by honeypot.is, on $11k liquidity. Price gapped -34% in one 12s tick, straight through the -15% stop.

## Lesson
Chasing a vertical launch candle on thin liquidity: stop-losses don't protect against gaps. Penalize 5m change > +25% and liq < $15k when the token is unindexed; size those at 3-5% max.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Honeypots and taxes]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0x3e3fcc684c9cbac45db1c1de8322ea20510423bc868e93f362250dce654bb038
