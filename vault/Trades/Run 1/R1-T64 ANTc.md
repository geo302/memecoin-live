---
trade: 64
run: 1
symbol: "ANTc"
name: "Anthropic, PBC"
contract: "0xb20000000000000000000016e38FD364d271Ba28"
pair: "0x599C4225FE90214795a0be228D20d7680f8CED15"
result: "loss"
pnl_usd: -0.04166
pnl_pct: -4.16598
exit_type: "LIQUIDITY"
exit_reason: "Liquidity collapse (liquidity $5,165 down >50% from entry $403,438)"
entry_time: "2026-11-19T12:22:46-05:00"
exit_time: "2026-11-19T12:23:27.605024-05:00"
entry_price: 110.5142
exit_price: 105.9102
usd_in: 1.0
hold_time: "0m 41s"
setup: "momentum_breakout|mid"
liquidity_at_entry: 403437.68
peak_price: 110.5142
max_drawdown_pct: -3.19796
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/liquidity"]
---
# R1-T64 ANTc

Coin: [[ANTc-b200ba28]]  ·  Exit: [[Exit LIQUIDITY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -4.17% ($-0.0417)  ·  setup `momentum_breakout|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.22%
- [[Rule F2]] **FAIL**: vol1h/liq 0.03
- [[Rule F3]] **PASS**: liq $403,438
- [[Rule F4]] **PASS**: buys/sells 54/23=2.35
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.7
- [[Rule c]] **PASS**: liq $403,438


## Why I entered
momentum_breakout: 1h +9.23% 5m +0.22%, 1h buys/sells 54/23, vol1h/liq 0.03, score 3.7; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Liquidity collapse (liquidity $5,165 down >50% from entry $403,438)

## Mistake
Bought a thin (liq ~$10-17k) tokenized-asset style token (ANTc, ~$110/unit) on a weak momentum_breakout signal (vol1h/liq 0.03); liquidity was pulled within a minute.

## Lesson
Liquidity collapse at #64 one minute after entry: for momentum tests, avoid tokens with liquidity under ~$20k and very low vol/liq, and treat high-priced 'c'-suffix tokenized assets as non-meme, low-edge. Bankroll #1.

Lesson topics: [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x599c4225fe90214795a0be228d20d7680f8ced15
