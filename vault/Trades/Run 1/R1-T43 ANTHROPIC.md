---
trade: 43
run: 1
symbol: "ANTHROPIC"
name: "ANTHROPIC"
contract: "0x225D3F945848ab6f4f163c8805dc2793580A36F8"
pair: "0x764019569786ff7FEf423C99cF77238511BA271f"
result: "loss"
pnl_usd: -0.007686
pnl_pct: -0.768581
exit_type: "LIQUIDITY"
exit_reason: "Liquidity collapse (liquidity $1 below $5,000 floor)"
entry_time: "2026-11-19T08:29:04-05:00"
exit_time: "2026-11-19T08:34:30.417511-05:00"
entry_price: 2e-06
exit_price: 2e-06
usd_in: 1.0
hold_time: "5m 26s"
setup: "fresh_launch|tight"
liquidity_at_entry: 15125.1
peak_price: 2e-06
max_drawdown_pct: -0.622942
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "FAIL"
check_F2: "FAIL"
check_F3: "FAIL"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "N/A"
check_b: "FAIL"
check_c: "FAIL"
tags: ["trade", "run1", "loss", "exit/liquidity"]
---
# R1-T43 ANTHROPIC

Coin: [[ANTHROPIC-225d36f8]]  ·  Exit: [[Exit LIQUIDITY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -0.77% ($-0.0077)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +1.44%
- [[Rule F2]] **FAIL**: vol1h/liq 0.1
- [[Rule F3]] **FAIL**: liq $15,125
- [[Rule F4]] **PASS**: buys/sells 46/6=7.67
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 9.15
- [[Rule c]] **FAIL**: liq $15,125


## Why I entered
fresh_launch: 1h +43.53% 5m +1.44%, 1h buys/sells 46/6, vol1h/liq 0.10, score 9.15; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Liquidity collapse (liquidity $1 below $5,000 floor)

## Mistake
Bought a fresh_launch on +43% 1h with liq only $15.1k (just above the $15k thin-liq line) and vol1h/liq 0.10. The LP was pulled 5 min later (liquidity reported at $1). The watcher logged the exit at the last quote (-0.8%), but in a real wallet an LP pull means the tokens are close to worthless, so the true result would have been close to -100%

## Lesson
Liquidity just above $15k with low volume is the same rug risk as just below: widen the thin-liq penalty band to liq<$25k for fresh_launch with vol1h/liq<0.5 (round.py updated). Treat liquidity-collapse exits as effective total losses when judging setups. Bankroll #1

Lesson topics: [[Lesson - Rugs and liquidity pulls]], [[Lesson - Operations and tooling]]

DexScreener: https://dexscreener.com/base/0x764019569786ff7fef423c99cf77238511ba271f
