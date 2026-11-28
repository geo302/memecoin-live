---
trade: 79
run: 1
symbol: "OFDC"
name: "OIL $ GAS SEVELOPMENT COMPANY"
contract: "0x2FD6F94F2Db4119E0EA53De04052cA2d6b8d0d1c"
pair: "0xb8afdeef29a1b5f8834f74f18b660bb746c6737dc0c1bac7fd3ee23ce68cbfdf"
result: "loss"
pnl_usd: -0.012641
pnl_pct: -1.264072
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (open 47m, -0.3%, 1h flow only ~10 buys/5 sells on $1.6M liquidity, no momentum). Sold at market 0.001103 -1%"
entry_time: "2026-11-19T19:49:11-05:00"
exit_time: "2026-11-19T20:36:42.503822-05:00"
entry_price: 0.001106
exit_price: 0.001092
usd_in: 1.0
hold_time: "47m 31s"
setup: "fresh_launch|tight"
liquidity_at_entry: 1644055.21
peak_price: 0.001106
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
# R1-T79 OFDC

Coin: [[OFDC-2fd60d1c]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.26% ($-0.0126)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m -0.06%
- [[Rule F2]] **FAIL**: vol1h/liq 0.03
- [[Rule F3]] **PASS**: liq $1,644,055
- [[Rule F4]] **PASS**: buys/sells 10/5=2.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 2.03
- [[Rule c]] **PASS**: liq $1,644,055


## Why I entered
fresh_launch: 1h +0.06% 5m -0.06%, 1h buys/sells 10/5, vol1h/liq 0.03, score 2.03; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (open 47m, -0.3%, 1h flow only ~10 buys/5 sells on $1.6M liquidity, no momentum). Sold at market 0.001103 -1%

## Mistake
Bought a dead pool: 1h +0.06%, vol1h/liq 0.03. It is exactly the dead pool profile the 09:35 rule flags (19 such tests went 2W/17L), and it scraped past the filter. Capital sat idle for 47 min.

## Lesson
Bankroll #1: the near-zero-move fresh launches (OFDC, USOR OIL: huge liquidity, 1h about 0%) never move inside 45 min. Tighten the dead-pool filter so 1h under +1% with vol1h/liq under 0.05 is always a pass.

Lesson topics: [[Lesson - Dead or static pools]]

DexScreener: https://dexscreener.com/base/0xb8afdeef29a1b5f8834f74f18b660bb746c6737dc0c1bac7fd3ee23ce68cbfdf
