---
trade: 49
run: 1
symbol: "DCTY"
name: "DacityCoin"
contract: "0x00a448Efe8a02F47366439954E9CFC9a81591200"
pair: "0xb27df6807ba76c2e702f8e53369f408b964bb0c86f4e53828cba60528cdd97da"
result: "loss"
pnl_usd: -1.081619
pnl_pct: -14.636246
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 5.949e-05 <= stop 6.071e-05)"
entry_time: "2026-11-19T09:17:30-05:00"
exit_time: "2026-11-19T09:19:56.177430-05:00"
entry_price: 6.9e-05
exit_price: 5.9e-05
usd_in: 7.39
hold_time: "2m 26s"
setup: "after_style|runner"
liquidity_at_entry: 47350.29
peak_price: 7.6e-05
max_drawdown_pct: -21.795714
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T49 DCTY

Coin: [[DCTY-00a41200]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -14.64% ($-1.0816)  ·  setup `after_style|runner`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +26.31%
- [[Rule F2]] **PASS**: vol1h/liq 1.73
- [[Rule F3]] **PASS**: liq $47,350
- [[Rule F4]] **PASS**: buys/sells 105/52=2.02
- [[Rule F5]] **FAIL**: TP win #47 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 26.77
- [[Rule c]] **PASS**: liq $47,350


## Why I entered
after_style: 1h +397% 5m +26.31%, 1h buys/sells 105/52, vol1h/liq 1.73, score 26.77; runner plan SL -12% TP +300% trail 15%; size 10% equity

## Exit
Stop-loss hit (price 5.949e-05 <= stop 6.071e-05)

## Mistake
after_style re-entry on DCTY 5 min after the #47 test spiked +41%; the coin had already run +397% in 1h and was 16% below its 9:12 peak, so I bought a fading second leg. Stop at -12% gapped to -14.6% after slippage in 2.5 min. Bankroll 1.

## Lesson
Bankroll 1: after_style re-entry needs price back near or above the prior peak (no buying a lower high after a spike), and skip after_style when 1h change is above ~+300% (overextended). Treat stops on $40-50k liquidity coins as about -15% real loss when sizing.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Re-entry and copycat tickers]], [[Lesson - Chasing pumps]]

DexScreener: https://dexscreener.com/base/0xb27df6807ba76c2e702f8e53369f408b964bb0c86f4e53828cba60528cdd97da
