---
trade: 44
run: 1
symbol: "doginme"
name: "doginme"
contract: "0x6921B130D297cc43754afba22e5EAc0FBf8Db75b"
pair: "0xADE9BcD4b968EE26Bed102dd43A55f6A8c2416df"
result: "loss"
pnl_usd: -0.042877
pnl_pct: -4.287727
exit_type: "TRAIL"
exit_reason: "Trailing stop hit (8.0% below peak 7.299e-05; price 6.678e-05)"
entry_time: "2026-11-19T08:47:19-05:00"
exit_time: "2026-11-19T09:00:56.184354-05:00"
entry_price: 6.9e-05
exit_price: 6.6e-05
usd_in: 1.0
hold_time: "13m 37s"
setup: "momentum_breakout|mid"
liquidity_at_entry: 1000909.91
peak_price: 7.3e-05
max_drawdown_pct: -8.508015
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "FAIL"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/trail"]
---
# R1-T44 doginme

Coin: [[doginme-6921b75b]]  ·  Exit: [[Exit TRAIL]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -4.29% ($-0.0429)  ·  setup `momentum_breakout|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +2.53%
- [[Rule F2]] **FAIL**: vol1h/liq 0.02
- [[Rule F3]] **PASS**: liq $1,000,910
- [[Rule F4]] **FAIL**: buys/sells 65/39=1.67
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.26
- [[Rule c]] **PASS**: liq $1,000,910


## Why I entered
momentum_breakout: 1h +12.73% 5m +2.53%, 1h buys/sells 65/39, vol1h/liq 0.02, score 3.26; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Trailing stop hit (8.0% below peak 7.299e-05; price 6.678e-05)

## Mistake
Momentum_breakout test with vol1h/liq only 0.02; small pop to +5.7% then the 8% trail took it out at a loss. Bankroll 1.

## Lesson
Bankroll 1: low volume relative to liquidity breakouts fade; require vol1h/liq >= 0.2 for momentum_breakout tests.

Lesson topics: [[Lesson - Trailing stops]]

DexScreener: https://dexscreener.com/base/0xade9bcd4b968ee26bed102dd43a55f6a8c2416df
