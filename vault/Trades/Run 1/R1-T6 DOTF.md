---
trade: 6
run: 1
symbol: "DOTF"
name: "Digital Oil Trust Fund"
contract: "0x2DcEfe8C11825bC185Ba65F8A1a0019cc31fA8a0"
pair: "0x865226e538dab244a85f3ccf283df9bae08ec046fb694fefadc873d85571c34b"
result: "loss"
pnl_usd: -0.086208
pnl_pct: -2.047705
exit_type: "DISCRETIONARY"
exit_reason: "Discretionary exit: momentum dead (time stop): '...F' multi-million-liq token flat ~48 min, confirming the static-pool suspicion. Sold at market 0.002902 -1%"
entry_time: "2026-11-18T23:41:30-05:00"
exit_time: "2026-11-19T00:29:51.629962-05:00"
entry_price: 0.002933
exit_price: 0.002873
usd_in: 4.21
hold_time: "48m 21s"
setup: "fresh_launch|wide"
liquidity_at_entry: 4356878.69
peak_price: 0.002933
max_drawdown_pct: -1.228759
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
# R1-T6 DOTF

Coin: [[DOTF-2dcea8a0]]  ·  Exit: [[Exit DISCRETIONARY]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -2.05% ($-0.0862)  ·  setup `fresh_launch|wide`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +0.17%
- [[Rule F2]] **FAIL**: vol1h/liq 0.01
- [[Rule F3]] **PASS**: liq $4,356,879
- [[Rule F4]] **PASS**: buys/sells 8/3=2.67
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **FAIL**: score 3.41
- [[Rule c]] **PASS**: liq $4,356,879


## Why I entered
fresh_launch: 1h +0.22% 5m +0.17%, 1h buys/sells 8/3, vol1h/liq 0.01, score 3.41; wide plan SL -15% TP +35% trail 12%; size 5% equity

## Exit
Discretionary exit: momentum dead (time stop): '...F' multi-million-liq token flat ~48 min, confirming the static-pool suspicion. Sold at market 0.002902 -1%

## Mistake
Tested a suspected static/fake-liquidity '...F' token; it did not move.

## Lesson
Bankroll #1. Time stop: Base tokens that sit within ~1-2% of entry for 45 min are dead money; the 1% exit fee is cheaper than tying up slots. Rule: exit any position flat (|move|<3%) after 45 min. Test result: '...F' tickers with huge liq do not move; skip them.

Lesson topics: [[Lesson - Dead or static pools]]

DexScreener: https://dexscreener.com/base/0x865226e538dab244a85f3ccf283df9bae08ec046fb694fefadc873d85571c34b
