---
trade: 17
run: 1
symbol: "GOV"
name: "Gov Maxxing"
contract: "0x79448b3607CbC63d78e0e87F9767baA61352CCe2"
pair: "0x002b4cecaac7beef6b3e0e5d17dd265f5b8fed28a6b87a4d43ca09282a80eaba"
result: "loss"
pnl_usd: -0.080792
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 4.306e-05 -1%"
entry_time: "2026-11-19T00:36:47-05:00"
exit_time: "2026-11-19T07:25:43.870937-05:00"
entry_price: 4.3e-05
exit_price: 4.3e-05
usd_in: 4.08
hold_time: "6h 48m 56s"
setup: "fresh_launch|mid"
liquidity_at_entry: 37679.91
peak_price: 4.3e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T17 GOV

Coin: [[GOV-7944cce2]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0808)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +16.86%
- [[Rule F2]] **PASS**: vol1h/liq 0.92
- [[Rule F3]] **PASS**: liq $37,680
- [[Rule F4]] **FAIL**: buys/sells 76/45=1.69
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 12.51
- [[Rule c]] **PASS**: liq $37,680


## Why I entered
fresh_launch: 1h +139% 5m +16.86%, 1h buys/sells 76/45, vol1h/liq 0.92, score 12.51; mid plan SL -10% TP +20% trail 8%; size 5% equity

## Exit
Discretionary exit: 45-min flat time stop (held about 7h, mostly across a watcher outage; move under 3% either way). Sold at market 4.306e-05 -1%

## Mistake
Dead money: the position sat within about 3% of entry for hours and tied up a slot.

## Lesson
Bankroll #1. 45-min flat time stop applied at the first run after the outage. Large/mid-liq tokens overnight barely move; size these small or skip them at night.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x002b4cecaac7beef6b3e0e5d17dd265f5b8fed28a6b87a4d43ca09282a80eaba
