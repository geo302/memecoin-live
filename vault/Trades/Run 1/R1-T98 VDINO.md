---
trade: 98
run: 1
symbol: "VDINO"
name: "Venice Dino"
contract: "0xfc009F3F4DEeEDAE2E7B761812e7b089464319cD"
pair: "0x6f645004733a599d1ce6b264fadc5b32a4612358116b7e3e6925b97f5ddd353c"
result: "loss"
pnl_usd: -1.416113
pnl_pct: -35.94195
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 4.723e-05 <= stop 6.569e-05)"
entry_time: "2026-11-22T18:54:37-05:00"
exit_time: "2026-11-22T18:55:27.627624-05:00"
entry_price: 7.3e-05
exit_price: 4.7e-05
usd_in: 3.94
hold_time: "0m 50s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 46997.36
peak_price: 7.3e-05
max_drawdown_pct: -35.294899
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
# R1-T98 VDINO

Coin: [[VDINO-fc0019cd]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -35.94% ($-1.4161)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +126.0%
- [[Rule F2]] **PASS**: vol1h/liq 1.06
- [[Rule F3]] **PASS**: liq $46,997
- [[Rule F4]] **PASS**: buys/sells 106/50=2.12
- [[Rule F5]] **FAIL**: TP win #97 <6h
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 14.3
- [[Rule c]] **PASS**: liq $46,997


## Why I entered
winner_pattern: 1h +458% 5m +126%, 1h buys/sells 106/50, vol1h/liq 1.06, score 14.3; pattern plan SL -10% TP +25% trail 8% (arms after +15%); size 5% equity; honeypot: not indexed (404)

## Exit
Stop-loss hit (price 4.723e-05 <= stop 6.569e-05)

## Mistake
Loss -35.9% (-$1.42). Bought a second 'Venice Dino' 14 min after #97's TP. It was a DIFFERENT contract (0xfc00...19cD vs #97's 0xB6A2...42A6): a same-name relaunch/copycat, entered at mc $72.3k vs #97's $36.2k (2.0x; entry 7.30e-05 vs 3.66e-05). It passed every filter (score 14.3, liq $47.0k, 5m +126% / 1h +458%, vol1h/liq 1.06, 1h buys/sells 106/50). The watcher's first check after the buy returned NO-PRICE; the next price was 4.723e-05, 28.1% below the 6.569e-05 stop, held 50s. Liquidity fell $47.0k -> $35.7k. Root mistake: the re-entry rules matched on contract address only, so a copycat with the same ticker looked like a fresh coin, and the #93 lesson from Nov 20 ('avoid same-symbol re-entry within a few hours after a TP') was written down but never coded.

## Lesson
Chasing the ticker right after a take-profit is buying the hype that the win created, often on a copycat contract. Rule (a) now coded in round.py: no re-entry on the same symbol OR address for 2h after a take-profit win, no exceptions. Wider lesson: a lesson that is only logged does nothing; every lesson needs a coded rule or an explicit decision not to code it.

Lesson topics: [[Lesson - Re-entry and copycat tickers]], [[Lesson - Rugs and liquidity pulls]], [[Lesson - Chasing pumps]], [[Lesson - Operations and tooling]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x6f645004733a599d1ce6b264fadc5b32a4612358116b7e3e6925b97f5ddd353c
