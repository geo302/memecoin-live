---
trade: 66
run: 1
symbol: "IPO"
name: "Infinite Profit Opportunity"
contract: "0xb20000000000000000000098E23EB734545097CA"
pair: "0xb5afeeef33d766dea29defc794c2e7c5165baff49b6c366de534a51451d2ae44"
result: "loss"
pnl_usd: -0.391859
pnl_pct: -39.185945
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 1.543e-04 <= stop 2.361e-04)"
entry_time: "2026-11-19T12:55:43-05:00"
exit_time: "2026-11-19T12:59:26.034828-05:00"
entry_price: 0.000251
exit_price: 0.000153
usd_in: 1.0
hold_time: "3m 43s"
setup: "fresh_launch|tight"
liquidity_at_entry: 115158.8
peak_price: 0.000258
max_drawdown_pct: -40.124175
checks_source: "retrospective (run 1 had no F-gates)"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "FAIL"
check_F7: "N/A"
check_b: "PASS"
check_c: "PASS"
tags: ["trade", "run1", "loss", "exit/stop"]
---
# R1-T66 IPO

Coin: [[IPO-b20097ca]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -39.19% ($-0.3919)  ·  setup `fresh_launch|tight`

## Entry checks

- [[Rule F1]] **PASS**: 5m +172.0%
- [[Rule F2]] **PASS**: vol1h/liq 0.99
- [[Rule F3]] **PASS**: liq $115,159
- [[Rule F4]] **PASS**: buys/sells 171/66=2.59
- [[Rule F5]] **FAIL**: TP win #65 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.17
- [[Rule c]] **PASS**: liq $115,159


## Why I entered
fresh_launch: 1h +1291% 5m +172%, 1h buys/sells 171/66, vol1h/liq 0.99, score 15.17; tight plan SL -6% TP +10% trail 5%; size 1% equity

## Exit
Stop-loss hit (price 1.543e-04 <= stop 2.361e-04)

## Mistake
Bought a second, copycat 'IPO' contract (0xb200...97CA) about 14 min after the first IPO (#65) pumped. Price dumped about 38% between 12-second watcher checks, so the stop at -6% filled at about -39%.

## Lesson
Copycat tickers launched right after a winning same-name coin are dump risks; stops can gap far past their level in a fresh pool. Avoid same-symbol copycat contracts right after a pump, or size them as the smallest test. Bankroll #1.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Re-entry and copycat tickers]], [[Lesson - Operations and tooling]]

DexScreener: https://dexscreener.com/base/0xb5afeeef33d766dea29defc794c2e7c5165baff49b6c366de534a51451d2ae44
