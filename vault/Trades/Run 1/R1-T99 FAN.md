---
trade: 99
run: 1
symbol: "FAN"
name: "Fan ID"
contract: "0xaecfb2601427A1D64837ec548F03b1847732cCcC"
pair: "0x51bd68d276965b678d6d45a38eb7ae85e03014cd15161fa1807b905ece726d8f"
result: "loss"
pnl_usd: -2.361143
pnl_pct: -61.01144
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 6.754e-06 <= stop 1.543e-05)"
entry_time: "2026-11-22T18:59:37-05:00"
exit_time: "2026-11-22T19:00:16.794239-05:00"
entry_price: 1.7e-05
exit_price: 7e-06
usd_in: 3.87
hold_time: "0m 39s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 12616.89
peak_price: 1.7e-05
max_drawdown_pct: -60.617617
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T99 FAN

Coin: [[FAN-aecfcccc]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -61.01% ($-2.3611)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +235.0%
- [[Rule F2]] **FAIL**: vol1h/liq 0.64
- [[Rule F3]] **FAIL**: liq $12,617
- [[Rule F4]] **PASS**: buys/sells 77/22=3.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 9.64
- [[Rule c]] **FAIL**: liq $12,617


## Why I entered
winner_pattern: 1h +299% 5m +235%, 1h buys/sells 77/22, vol1h/liq 0.64, score 9.64; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Stop-loss hit (price 6.754e-06 <= stop 1.543e-05)

## Mistake
Loss -61.0% (-$2.36). Weakest setup of all 11 winner_pattern trades: score 9.64 (all others 13.76-16.32), liq $12.6k (all others $23.7k+), vol1h/liq 0.64 (lowest, barely over the 0.6 minimum), and 5m +235% of the 1h +299% came in the last 5 minutes (a single vertical candle). First watcher check after the buy was NO-PRICE; the next price was 6.754e-06, 56.2% below the 1.543e-05 stop, held 39s. Liquidity fell from $12.6k to $6.4k (-49%) during the hold, so sellers or the LP were draining the pool.

## Lesson
A $12k pool can lose 60% to one seller and a -10% stop is no protection. Rules (b) min score 12 and (c) min liquidity $20k are now coded in round.py for winner_pattern; the backtest shows both block only #99 (+$2.36) and no winner. A single 5m candle that is most of the 1h move is the top tick (same as #91 XDP, #58 KIARA).

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Chasing pumps]], [[Lesson - Operations and tooling]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x51bd68d276965b678d6d45a38eb7ae85e03014cd15161fa1807b905ece726d8f
