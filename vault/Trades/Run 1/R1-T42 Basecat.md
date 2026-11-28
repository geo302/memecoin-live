---
trade: 42
run: 1
symbol: "Basecat"
name: "Basecat"
contract: "0x42DB3F3b1fC59CFfb9B1170c3cB35bD3EC77dC11"
pair: "0xa18E2De6B01Bc983Cb6b434Fac2841E2effFb140"
result: "loss"
pnl_usd: -1.0
pnl_pct: -99.999999
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 7.701e-14 <= stop 8.757e-06)"
entry_time: "2026-11-19T08:29:04-05:00"
exit_time: "2026-11-19T08:48:08.145864-05:00"
entry_price: 1e-05
exit_price: 0.0
usd_in: 1.0
hold_time: "19m 04s"
setup: "fresh_launch|wide"
liquidity_at_entry: 159770.47
peak_price: 1.3e-05
max_drawdown_pct: -99.999999
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T42 Basecat

Coin: [[Basecat-42dbdc11]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.0000)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +6.53%
- [[Rule F2]] **FAIL**: vol1h/liq 0.05
- [[Rule F3]] **PASS**: liq $159,770
- [[Rule F4]] **PASS**: buys/sells 37/1=37.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 76.02
- [[Rule c]] **PASS**: liq $159,770


## Why I entered
fresh_launch: 1h +23.36% 5m +6.53%, 1h buys/sells 37/1, vol1h/liq 0.05, score 76.02; wide plan SL -15% TP +35% trail 12%; size 1% equity

## Exit
Stop-loss hit (price 7.701e-14 <= stop 8.757e-06)

## Mistake
Bought a 22-minute-old fresh_launch with 37 buys vs 1 sell in 1h and vol1h/liq only 0.05: one-sided flow is the honeypot/rug signature, and the pool was drained to $0 within 19 minutes (stop could not fill).

## Lesson
Bankroll #1. Near-zero sells on a fresh launch is a red flag, not bullish demand. Rule added 08:50: score -30 when 1h sells <=2 and buys >=15.

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Honeypots and taxes]], [[Lesson - Thin or one-sided flow]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xa18e2de6b01bc983cb6b434fac2841e2efffb140
