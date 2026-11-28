---
trade: 73
run: 1
symbol: "BSTONK"
name: "BaseStonk"
contract: "0x0F61Edbfe6Cd86024C0f210c0695B08df55fdfc9"
pair: "0xc9786476d2492eb8ddb2ebf8b4b69e227e1f31397c790d877541ab0ed5cf5ee2"
result: "loss"
pnl_usd: -0.021144
pnl_pct: -2.11438
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (dip_bounce test, price within 3% of entry after 46 min). Sold at market 4.377e-04 -1%"
entry_time: "2026-11-19T16:29:33-05:00"
exit_time: "2026-11-19T17:15:55.656115-05:00"
entry_price: 0.000443
exit_price: 0.000433
usd_in: 1.0
hold_time: "46m 22s"
setup: "dip_bounce|tight"
liquidity_at_entry: 56714.71
peak_price: 0.000444
max_drawdown_pct: -1.35257
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
# R1-T73 BSTONK

Coin: [[BSTONK-0f61dfc9]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.11% ($-0.0211)  ·  setup `dip_bounce|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.16%
- [[Rule F2]] **FAIL**: vol1h/liq 0.04
- [[Rule F3]] **PASS**: liq $56,715
- [[Rule F4]] **PASS**: buys/sells 28/4=7.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 7.07
- [[Rule c]] **PASS**: liq $56,715


## Why I entered
dip_bounce: 1h -10.12% 5m +0.16%, 1h buys/sells 28/4, vol1h/liq 0.04, score 7.07; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (dip_bounce test, price within 3% of entry after 46 min). Sold at market 4.377e-04 -1%

## Mistake
The dip_bounce test never bounced. BSTONK stayed flat for 46 minutes on a 57k pool, so the $1 only paid slippage on the way in and out.

## Lesson
dip_bounce tests on slow pools with no 5m momentum just drift. The 45-minute flat time stop is the right exit, and future dip_bounce tests should require a positive 5m move at entry. Bankroll #1.

Lesson topics: [[Lesson - Profile variance]]

DexScreener: https://dexscreener.com/base/0xc9786476d2492eb8ddb2ebf8b4b69e227e1f31397c790d877541ab0ed5cf5ee2
