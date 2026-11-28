---
trade: 62
run: 1
symbol: "aeon"
name: "aeon"
contract: "0xB8627a1Af5f9939dF1dc17F3D3562F0E18f41a63"
pair: "0xb1a54d57ffb81a45b77d15172880a5629e11b044114a18ad12c97d6dcbfa271b"
result: "loss"
pnl_usd: -0.016851
pnl_pct: -1.685106
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner fresh_launch|wide $1 test, ~48 min held, about -1% and flat, no momentum). Sold at market -1%.. Sold at market 3.998e-07 -1%"
entry_time: "2026-11-19T11:39:15-05:00"
exit_time: "2026-11-19T12:27:50.794056-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 1.0
hold_time: "48m 35s"
setup: "fresh_launch|wide"
liquidity_at_entry: 35352.54
peak_price: 0.0
max_drawdown_pct: -2.281748
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T62 aeon

Coin: [[aeon-b8621a63]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.69% ($-0.0169)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.21%
- [[Rule F2]] **FAIL**: vol1h/liq 0.25
- [[Rule F3]] **PASS**: liq $35,353
- [[Rule F4]] **PASS**: buys/sells 11/3=3.67
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.68
- [[Rule c]] **PASS**: liq $35,353


## Why I entered
fresh_launch: 1h +0.41% 5m +0.21%, 1h buys/sells 11/3, vol1h/liq 0.25, score 5.68; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner fresh_launch|wide $1 test, ~48 min held, about -1% and flat, no momentum). Sold at market -1%.. Sold at market 3.998e-07 -1%

## Mistake
Fresh launch never moved; dead capital for 48 min.

## Lesson
Same as #60: fresh-launch tests that are flat after 15-20 min should be cut by the time stop; no edge seen in fresh_launch so far. Bankroll #1.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xb1a54d57ffb81a45b77d15172880a5629e11b044114a18ad12c97d6dcbfa271b
