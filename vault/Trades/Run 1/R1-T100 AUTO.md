---
trade: 100
run: 1
symbol: "AUTO"
name: "Automato"
contract: "0xdC566327Fd06E4520Ff68D19d9ea2a484B4f453c"
pair: "0x6ea4c221289b193b31b60d4f5946147f9c24f9eb1826201c2b8da41ad77a17f0"
result: "loss"
pnl_usd: -0.700445
pnl_pct: -18.67852
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 6.258e-05 <= stop 6.857e-05)"
entry_time: "2026-11-22T22:44:10-05:00"
exit_time: "2026-11-22T22:48:39.352249-05:00"
entry_price: 7.6e-05
exit_price: 6.2e-05
usd_in: 3.75
hold_time: "4m 29s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 58363.33
peak_price: 7.6e-05
max_drawdown_pct: -17.857091
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
# R1-T100 AUTO

Coin: [[AUTO-dc56453c]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -18.68% ($-0.7004)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +26.25%
- [[Rule F2]] **FAIL**: vol1h/liq 0.68
- [[Rule F3]] **PASS**: liq $58,363
- [[Rule F4]] **PASS**: buys/sells 209/75=2.79
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 15.25
- [[Rule c]] **PASS**: liq $58,363


## Why I entered
winner_pattern: 1h +255% 5m +26.25%, 1h buys/sells 209/75, vol1h/liq 0.68, score 15.25; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Stop-loss hit (price 6.258e-05 <= stop 6.857e-05)

## Mistake
Loss -18.7% (-$0.70). The setup passed every filter (score 15.25, liq $58.4k, 1h +255%, 1h buys/sells 209/75) but 5m was only +26.25%, the weakest 5m of all 11 winner_pattern trades (the 4 winners had 5m +50% to +185%), and vol1h/liq was 0.68. Operational failure on top: this scout round ran 22:44:01-22:48:21 (261s, normal is 35-45s) and held the ledger lock while saving the 10.3 MB journal (Scout Log is about 79k rows). The watcher was blocked, its heartbeat went stale (236s) and the supervisor killed and restarted it at 22:47:56-22:48:01. The buy used the ~22:44 quote but only reached the ledger at 22:48:18. The first watcher check was NO-PRICE; at 22:48:39 the price was 6.258e-05, already -17.9% and 8.7% below the stop. The stop was effectively unwatched for about 4.5 minutes.

## Lesson
Two lessons. (1) Exits must never wait on the journal: the xlsx save inside the ledger lock blocks the watcher; the Scout Log should move out of the workbook (CSV) and the entry price should be re-quoted right before the buy is written. Not changed tonight, flagged for approval. (2) 5m +26% after a +255% hour may be fading momentum, but #92 won at 5m +50% and this is n=1, so it is not coded. Watch 5m < +30% entries as a separate bucket.

Lesson topics: [[Lesson - Operations and tooling]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x6ea4c221289b193b31b60d4f5946147f9c24f9eb1826201c2b8da41ad77a17f0
