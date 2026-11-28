---
trade: 46
run: 1
symbol: "ADM"
name: "Voice of the Gods by Virtuals"
contract: "0x55fF51DA774b8ce0ed1ABAeD1CB76236bc6b2f16"
pair: "0x039F7c7E22c1C3Bba5e871029ca72d5DDeAd295B"
result: "loss"
pnl_usd: -0.014894
pnl_pct: -1.489417
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop: weak_drift test never traded above entry (peak = entry) in 47 min, still within 1% of entry. Sold at market 3.613e-04 -1%"
entry_time: "2026-11-19T09:02:51-05:00"
exit_time: "2026-11-19T09:49:39.751576-05:00"
entry_price: 0.000363
exit_price: 0.000358
usd_in: 1.0
hold_time: "46m 48s"
setup: "weak_drift|tight"
liquidity_at_entry: 95055.13
peak_price: 0.000363
max_drawdown_pct: -0.990099
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
# R1-T46 ADM

Coin: [[ADM-55ff2f16]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.49% ($-0.0149)  ·  setup `weak_drift|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -2.08%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $95,055
- [[Rule F4]] **PASS**: buys/sells 6/1=6.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 1.35
- [[Rule c]] **PASS**: liq $95,055


## Why I entered
weak_drift: 1h -1.31% 5m -2.08%, 1h buys/sells 6/1, vol1h/liq 0.01, score 1.35; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop: weak_drift test never traded above entry (peak = entry) in 47 min, still within 1% of entry. Sold at market 3.613e-04 -1%

## Mistake
Weak_drift test with no momentum; capital idle 47 min and lost the round-trip slippage. Bankroll 1.

## Lesson
Bankroll 1: weak_drift remains a slippage bleed; the 09:35 dead-pool filter should block most of these going forward.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0x039f7c7e22c1c3bba5e871029ca72d5ddead295b
