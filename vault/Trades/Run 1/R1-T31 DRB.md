---
trade: 31
run: 1
symbol: "DRB"
name: "DebtReliefBot"
contract: "0x3ec2156D4c0A9CBdAB4a016633b7BcF6a8d68Ea2"
pair: "0x5116773e18A9C7bB03EBB961b38678E45E238923"
result: "loss"
pnl_usd: -0.014008
pnl_pct: -1.400759
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: weak_drift test never traded above entry (peak = entry) in 49 min. Sold at market 8.338e-05 -1%"
entry_time: "2026-11-19T07:57:18-05:00"
exit_time: "2026-11-19T08:47:08.978026-05:00"
entry_price: 8.4e-05
exit_price: 8.3e-05
usd_in: 1.0
hold_time: "49m 50s"
setup: "weak_drift|tight"
liquidity_at_entry: 831380.6
peak_price: 8.4e-05
max_drawdown_pct: -0.990099
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/discretionary"]
---
# R1-T31 DRB

Coin: [[DRB-3ec28ea2]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.40% ($-0.0140)  ·  setup `weak_drift|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.39%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $831,381
- [[Rule F4]] **PASS**: buys/sells 25/2=12.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 20.08
- [[Rule c]] **PASS**: liq $831,381


## Why I entered
weak_drift: 1h -0.16% 5m +0.39%, 1h buys/sells 25/2, vol1h/liq 0.00, score 20.08; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: weak_drift test never traded above entry (peak = entry) in 49 min. Sold at market 8.338e-05 -1%

## Mistake
weak_drift entry on a ratio-inflated score (25/2 buys with vol1h/liq 0.00) in a large, quiet pool; no catalyst to move it

## Lesson
weak_drift tests in near-zero-volume pools go nowhere; the buy/sell ratio cap (08:29) now keeps them from scoring high. Bankroll #1

Lesson topics: [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x5116773e18a9c7bb03ebb961b38678e45e238923
