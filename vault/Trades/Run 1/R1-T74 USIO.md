---
trade: 74
run: 1
symbol: "USIO"
name: "US INDEX OIL-USIO☀️"
contract: "0x45c3247876C8dc0984db05c062c45655DD26bDd9"
pair: "0x031e4d1e9e887a926704c2abd365871a1aedb1c2f760580dab63b3a063a0ffde"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after about 50 min). Sold at market 1.548e-04 -1%"
entry_time: "2026-11-19T16:51:33-05:00"
exit_time: "2026-11-19T17:41:35.700917-05:00"
entry_price: 0.000156
exit_price: 0.000153
usd_in: 1.0
hold_time: "50m 02s"
setup: "fresh_launch|mid"
liquidity_at_entry: 153338.23
peak_price: 0.000156
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
# R1-T74 USIO

Coin: [[USIO-45c3bdd9]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +2.13%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $153,338
- [[Rule F4]] **PASS**: buys/sells 15/4=3.75
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 6.38
- [[Rule c]] **PASS**: liq $153,338


## Why I entered
fresh_launch: 1h +3.49% 5m +2.13%, 1h buys/sells 15/4, vol1h/liq 0.00, score 6.38; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after about 50 min). Sold at market 1.548e-04 -1%

## Mistake
Bought a quiet fresh launch (USIO/USOI, look-alike tickers launched at the same time) that never moved. The price sat at -1% for 50 minutes, so the only cost was slippage.

## Lesson
Twin look-alike launches (USIO/USOI/UISO) with frozen prices are dead pools. Skip fresh_launch tests whose price hasnt printed a new value in the last 5m. Bankroll #1.

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Frozen prices]]

DexScreener: https://dexscreener.com/base/0x031e4d1e9e887a926704c2abd365871a1aedb1c2f760580dab63b3a063a0ffde
