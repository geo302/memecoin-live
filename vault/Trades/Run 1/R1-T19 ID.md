---
trade: 19
run: 1
symbol: "ID"
name: "ClankID"
contract: "0xD072072048da26acEeF6EAD42F0bB7eD05CEcccC"
pair: "0xf7a3da00c409733f7b5ff438e599b4ed6e6d2c9bd77098c6afc84d018f2a1ad9"
result: "loss"
pnl_usd: -1.133473
pnl_pct: -27.84946
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 3.768e-05 <= stop 4.860e-05)"
entry_time: "2026-11-19T00:43:23-05:00"
exit_time: "2026-11-19T07:23:57.911765-05:00"
entry_price: 5.2e-05
exit_price: 3.7e-05
usd_in: 4.07
hold_time: "6h 40m 34s"
setup: "momentum_breakout|tight"
liquidity_at_entry: 24739.08
peak_price: 5.2e-05
max_drawdown_pct: -28.077877
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T19 ID

Coin: [[ID-d072cccc]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -27.85% ($-1.1335)  ·  setup `momentum_breakout|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +7.06%
- [[Rule F2]] **FAIL**: vol1h/liq 0.05
- [[Rule F3]] **FAIL**: liq $24,739
- [[Rule F4]] **FAIL**: buys/sells 10/7=1.43
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.46
- [[Rule c]] **PASS**: liq $24,739


## Why I entered
momentum_breakout: 1h +7.91% 5m +7.06%, 1h buys/sells 10/7, vol1h/liq 0.05, score 3.46; tight plan SL -6% TP +10% trail 5%; size 5% equity

## Exit
Stop-loss hit (price 3.768e-05 <= stop 4.860e-05)

## Mistake
Held a thin-liq ($25k) momentum_breakout into a 6h20m watcher outage (box offline ~01:06-07:23 ET); the -6% stop could not fire and the exit filled at -27.8%.

## Lesson
Bankroll #1. A stop only protects while the watcher runs; thin-liq (<$30k) positions need a hard max-hold. momentum_breakout on $25k liq: 0/1 so far.

Lesson topics: [[Lesson - Operations and tooling]]

DexScreener: https://dexscreener.com/base/0xf7a3da00c409733f7b5ff438e599b4ed6e6d2c9bd77098c6afc84d018f2a1ad9
