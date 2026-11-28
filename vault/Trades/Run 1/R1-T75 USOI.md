---
trade: 75
run: 1
symbol: "USOI"
name: "US OIL INDEX[USOI]☀️"
contract: "0x213878821Fa368Eaef69E56C1c6e6Cb26703FF57"
pair: "0xb3fd30844440f369394cf8d1059f2d7fb87a92b970e4417da8df8198400a574b"
result: "loss"
pnl_usd: -0.019802
pnl_pct: -1.980198
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after about 50 min). Sold at market 1.551e-04 -1%"
entry_time: "2026-11-19T16:51:33-05:00"
exit_time: "2026-11-19T17:41:35.700917-05:00"
entry_price: 0.000157
exit_price: 0.000154
usd_in: 1.0
hold_time: "50m 02s"
setup: "fresh_launch|wide"
liquidity_at_entry: 153592.81
peak_price: 0.000157
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
# R1-T75 USOI

Coin: [[USOI-2138ff57]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -1.98% ($-0.0198)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +2.12%
- [[Rule F2]] **FAIL**: vol1h/liq 0.0
- [[Rule F3]] **PASS**: liq $153,593
- [[Rule F4]] **PASS**: buys/sells 14/4=3.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 5.9
- [[Rule c]] **PASS**: liq $153,593


## Why I entered
fresh_launch: 1h +3.66% 5m +2.12%, 1h buys/sells 14/4, vol1h/liq 0.00, score 5.9; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Discretionary exit: 45-minute flat time stop (fresh_launch $1 test, price within 3% of entry after about 50 min). Sold at market 1.551e-04 -1%

## Mistake
Bought a quiet fresh launch (USIO/USOI, look-alike tickers launched at the same time) that never moved. The price sat at -1% for 50 minutes, so the only cost was slippage.

## Lesson
Twin look-alike launches (USIO/USOI/UISO) with frozen prices are dead pools. Skip fresh_launch tests whose price hasnt printed a new value in the last 5m. Bankroll #1.

Lesson topics: [[Lesson - Dead or static pools]], [[Lesson - Frozen prices]]

DexScreener: https://dexscreener.com/base/0xb3fd30844440f369394cf8d1059f2d7fb87a92b970e4417da8df8198400a574b
