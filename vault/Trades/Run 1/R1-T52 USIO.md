---
trade: 52
run: 1
symbol: "USIO"
name: "United States Oil Index"
contract: "0x3de6f5E00EFe61aD69ad285dcB1B160C9490f603"
pair: "0xe810f3498cc863210cfa80a87ed20a2c3562a287466a57e0426021c8c9efb07d"
result: "loss"
pnl_usd: -0.027147
pnl_pct: -2.714734
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 0.001192 -1%"
entry_time: "2026-11-19T09:31:27-05:00"
exit_time: "2026-11-19T10:18:32.035357-05:00"
entry_price: 0.001213
exit_price: 0.00118
usd_in: 1.0
hold_time: "47m 05s"
setup: "fresh_launch|wide"
liquidity_at_entry: 1801762.1
peak_price: 0.001213
max_drawdown_pct: -1.814495
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
# R1-T52 USIO

Coin: [[USIO-3de6f603]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.71% ($-0.0271)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.07%
- [[Rule F2]] **FAIL**: vol1h/liq 0.02
- [[Rule F3]] **PASS**: liq $1,801,762
- [[Rule F4]] **PASS**: buys/sells 6/1=6.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.04
- [[Rule c]] **PASS**: liq $1,801,762


## Why I entered
fresh_launch: 1h +0.07% 5m +0.07%, 1h buys/sells 6/1, vol1h/liq 0.02, score 5.04; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (non-runner test, ~46 min held, price drifting -1% to -2%, no momentum). Sold at market 0.001192 -1%

## Mistake
Entered a slow, high-liquidity 'oil index' fresh_launch on a $1 test; it never moved in 45 minutes

## Lesson
Bankroll #1: deep-liquidity (>$1M) fresh launches with no 1h momentum tend to sit flat; tests should favor coins with live 1h volume/liq flow

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xe810f3498cc863210cfa80a87ed20a2c3562a287466a57e0426021c8c9efb07d
