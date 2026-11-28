---
trade: 101
run: 1
symbol: "VDINO"
name: "Venice Dino"
contract: "0x78A45c0F4Da213CD6274dc44A9D1c751A6E40962"
pair: "0x0c26a469b4aac41a321869dda4c141cd23a8acfc5a23f45026ef68319987a64b"
result: "loss"
pnl_usd: -0.223576
pnl_pct: -6.010108
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (8.0% below peak 1.838e-04; price 1.516e-04)"
entry_time: "2026-11-22T22:59:11-05:00"
exit_time: "2026-11-22T23:03:25.577014-05:00"
entry_price: 0.00016
exit_price: 0.00015
usd_in: 3.72
hold_time: "4m 14s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 77730.34
peak_price: 0.000184
max_drawdown_pct: -17.519042
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T101 VDINO

Coin: [[VDINO-78a40962]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -6.01% ($-0.2236)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +40.72%
- [[Rule F2]] **PASS**: vol1h/liq 1.01
- [[Rule F3]] **PASS**: liq $77,730
- [[Rule F4]] **PASS**: buys/sells 134/44=3.05
- [[Rule F5]] **FAIL**: TP win #97 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 16.1
- [[Rule c]] **PASS**: liq $77,730


## Why I entered
winner_pattern: 1h +1120% 5m +40.72%, 1h buys/sells 134/44, vol1h/liq 1.01, score 16.1; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Trailing stop hit (8.0% below peak 1.838e-04; price 1.516e-04)

## Mistake
Loss -6.0% (-$0.22). A third 'Venice Dino' contract tonight (0x78A4...0962), bought 4h19m after #97's TP and 4h04m after #98's loss, so neither the 2h loss block nor the new 2h TP block applied. Setup was strong (score 16.1, liq $77.7k, 5m +40.7% / 1h +1120%, 1h buys/sells 134/44). It peaked at +15.1%, just enough to arm the 8% trail (it arms at +15%). The next price was 1.516e-04, 17.5% below the peak, so the trail sold at -5.1% before slip and -6.0% after the 1% slip. Held 4m14s.

## Lesson
An 8% trail that arms at +15% does not lock in profit when the price moves about 17% between checks: a trade that showed +15% still closed red. Candidate fix, not coded (needs a decision and testing): once the peak reaches +15%, move the stop to breakeven or +5%. Also, VDINO spawned 3 contracts in about 4h20m (1W/2L): repeated tickers are a copycat signal, so watch whether a 4h+ symbol cooldown would help.

Lesson topics: [[Lesson - Re-entry and copycat tickers]], [[Lesson - Trailing stops]], [[Lesson - Breakeven stop]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x0c26a469b4aac41a321869dda4c141cd23a8acfc5a23f45026ef68319987a64b
