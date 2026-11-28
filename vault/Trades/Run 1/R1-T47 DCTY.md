---
trade: 47
run: 1
symbol: "DCTY"
name: "DacityCoin"
contract: "0x00a448Efe8a02F47366439954E9CFC9a81591200"
pair: "0xb27df6807ba76c2e702f8e53369f408b964bb0c86f4e53828cba60528cdd97da"
result: "win"
pnl_usd: 0.410316
pnl_pct: 41.031629
exit_type: "TP"
exit_reason: "Take-profit hit (price 8.253e-05 >= target 6.952e-05)"
entry_time: "2026-11-19T09:11:26-05:00"
exit_time: "2026-11-19T09:12:08.274676-05:00"
entry_price: 5.8e-05
exit_price: 8.2e-05
usd_in: 1.0
hold_time: "0m 42s"
setup: "fresh_launch|mid"
liquidity_at_entry: 42258.05
peak_price: 8.3e-05
max_drawdown_pct: 0.0
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "win", "exit/tp"]
---
# R1-T47 DCTY

Coin: [[DCTY-00a41200]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 1]]

**Result:** WIN +41.03% ($+0.4103)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **PASS**: 5m +182.0%
- [[Rule F2]] **PASS**: vol1h/liq 0.93
- [[Rule F3]] **PASS**: liq $42,258
- [[Rule F4]] **PASS**: buys/sells 56/22=2.55
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.02
- [[Rule c]] **PASS**: liq $42,258


## Why I entered
fresh_launch: 1h +317% 5m +182%, 1h buys/sells 56/22, vol1h/liq 0.93, score 15.02; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Take-profit hit (price 8.253e-05 >= target 6.952e-05)

## Mistake
No real mistake (win +41%), but the entry was a vertical candle (5m +182%) that the focus rules would normally avoid, and the +20% fixed take-profit was gapped through to +41% in 42s, so the fill was luck. Bankroll 1.

## Lesson
Bankroll 1: fresh_launch with vol1h/liq ~0.9 and buys 56/22 ran hard; this is close to after_style except the 5m spike. Keep it a $1 test; one lucky gap fill is not an edge.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0xb27df6807ba76c2e702f8e53369f408b964bb0c86f4e53828cba60528cdd97da
