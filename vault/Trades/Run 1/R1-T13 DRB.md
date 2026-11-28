---
trade: 13
run: 1
symbol: "DRB"
name: "DebtReliefBot"
contract: "0x3ec2156D4c0A9CBdAB4a016633b7BcF6a8d68Ea2"
pair: "0x5116773e18A9C7bB03EBB961b38678E45E238923"
result: "loss"
pnl_usd: -0.128506
pnl_pct: -2.274446
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): within ~1.3% of entry for ~46 min. Sold at market 8.303e-05 -1%"
entry_time: "2026-11-19T00:12:57-05:00"
exit_time: "2026-11-19T00:59:00.358702-05:00"
entry_price: 8.4e-05
exit_price: 8.2e-05
usd_in: 5.65
hold_time: "46m 03s"
setup: "weak_drift|tight"
liquidity_at_entry: 832361.28
peak_price: 8.4e-05
max_drawdown_pct: -1.358652
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
# R1-T13 DRB

Coin: [[DRB-3ec28ea2]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.27% ($-0.1285)  ·  setup `weak_drift|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.18%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $832,361
- [[Rule F4]] **PASS**: buys/sells 22/4=5.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.06
- [[Rule c]] **PASS**: liq $832,361


## Why I entered
weak_drift: 1h +0.11% 5m +0.18%, 1h buys/sells 22/4, vol1h/liq 0.00, score 6.06; tight plan SL -6% TP +10% trail 5%; size 7% equity

## Exit
Discretionary exit: momentum dead (time stop): within ~1.3% of entry for ~46 min. Sold at market 8.303e-05 -1%

## Mistake
Entered DRB (about $831k liq, weak_drift) with no catalyst; it sat flat for 46 min.

## Lesson
Bankroll #1. 45-min flat time stop applied. weak_drift setups on large-liq tokens have not moved in any trade so far; probe size only, or skip.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x5116773e18a9c7bb03ebb961b38678e45e238923
