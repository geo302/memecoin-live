---
trade: 32
run: 1
symbol: ".AI"
name: "Agent ID"
contract: "0x81b45Ba75A2B288fCE4D881d1669436Bc07431D0"
pair: "0x520f66045F5c5ff75C60aDAE20C4FC05a9429e5E"
result: "loss"
pnl_usd: -0.999915
pnl_pct: -99.991491
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 9.836e-11 <= stop 1.030e-06)"
entry_time: "2026-11-19T07:57:18-05:00"
exit_time: "2026-11-19T08:00:56.326314-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.0
hold_time: "3m 38s"
setup: "fresh_launch|mid"
liquidity_at_entry: 11525.06
peak_price: 1e-06
max_drawdown_pct: -99.991721
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "PASS"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T32 AI

Coin: [[AI-81b431d0]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -99.99% ($-0.9999)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +16.05%
- [[Rule F2]] **FAIL**: vol1h/liq 0.05
- [[Rule F3]] **FAIL**: liq $11,525
- [[Rule F4]] **PASS**: buys/sells 21/2=10.50
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 12.2
- [[Rule c]] **FAIL**: liq $11,525


## Why I entered
fresh_launch: 1h +21.37% 5m +16.05%, 1h buys/sells 21/2, vol1h/liq 0.05, score 12.2; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Stop-loss hit (price 9.836e-11 <= stop 1.030e-06)

## Mistake
Bought a fresh_launch with only $11.5k liquidity, vol1h/liq 0.05 and a 21/2 buy count right after a +16% 5m candle: the exact thin-liq, low-volume fresh-launch pattern of lesson #21. The -4 penalty was too small (score 12.2 still cleared). Rugged to ~0 in 3.5 min; stop could not fill

## Lesson
Thin-liq fresh launches are now 0/8 and all rug. round.py penalty raised from -4 to -20 (effectively a hard skip) for fresh_launch with liq<$15k and vol1h/liq<0.5. Stops do not protect against rugs, so sizing ($1) is the only defense. Bankroll #1

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x520f66045f5c5ff75c60adae20c4fc05a9429e5e
