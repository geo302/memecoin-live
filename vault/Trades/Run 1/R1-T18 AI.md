---
trade: 18
run: 1
symbol: ".AI"
name: "Agent ID"
contract: "0x4cF7Ed212F0f3f0820D9BDc79C554847Cc52C3cf"
pair: "0x7c7fFEc52a075C56Ca12EEd627964F2A0083F273"
result: "loss"
pnl_usd: -0.999975
pnl_pct: -99.997481
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 3.289e-11 <= stop 1.099e-06)"
entry_time: "2026-11-19T00:43:23-05:00"
exit_time: "2026-11-19T00:44:00.914564-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.0
hold_time: "0m 37s"
setup: "fresh_launch|wide"
liquidity_at_entry: 12224.82
peak_price: 1e-06
max_drawdown_pct: -99.997456
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
# R1-T18 AI

Coin: [[AI-4cf7c3cf]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.0000)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +1.41%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **FAIL**: liq $12,225
- [[Rule F4]] **PASS**: buys/sells 60/5=12.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 16.85
- [[Rule c]] **FAIL**: liq $12,225


## Why I entered
fresh_launch: 1h +33.92% 5m +1.41%, 1h buys/sells 60/5, vol1h/liq 0.10, score 16.85; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Stop-loss hit (price 3.289e-11 <= stop 1.099e-06)

## Mistake
Bought a 14-min-old fresh launch with only $12.2k liquidity and low vol1h/liq 0.10, against the 00:36 Playbook note to prefer vol1h/liq >= 0.5. Liquidity was pulled 37s after entry (price -100%).

## Lesson
Bankroll #1. Fresh launches with liq < ~$15k and vol1h/liq < 0.3 are now 0/6 (all rugs or near-rugs). Rule: they get at most a token $1 probe, and preferably skip unless vol1h/liq >= 0.5. Sizing this one at 1% held the loss to $1.

Lesson topics: [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x7c7ffec52a075c56ca12eed627964f2a0083f273
