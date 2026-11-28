---
trade: 20
run: 1
symbol: "SPCX"
name: "SpaceX"
contract: "0xCB9fa5758FD5a0a4E15f969093bA61519Ab5D012"
pair: "0x47A15A0A945dc4d67eBac67a9EB441354aAbb68C"
result: "loss"
pnl_usd: -1.0
pnl_pct: -100.0
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 5.061e-15 <= stop 9.199e-07)"
entry_time: "2026-11-19T00:48:12-05:00"
exit_time: "2026-11-19T00:59:47.157895-05:00"
entry_price: 1e-06
exit_price: 0.0
usd_in: 1.0
hold_time: "11m 35s"
setup: "fresh_launch|mid"
liquidity_at_entry: 10873.17
peak_price: 1e-06
max_drawdown_pct: -100.0
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
# R1-T20 SPCX

Coin: [[SPCX-cb9fd012]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 1]]

**Result:** LOSS -100.00% ($-1.0000)  ·  setup `fresh_launch|mid`

## Entry checks

- [[Rule F1]] **FAIL**: 5m +8.84%
- [[Rule F2]] **FAIL**: vol1h/liq 0.02
- [[Rule F3]] **FAIL**: liq $10,873
- [[Rule F4]] **PASS**: buys/sells 10/1=10.00
- [[Rule F5]] **PASS**: fresh
- [[Rule F7]] **N/A**: F7 did not exist in run 1
- [[Rule b]] **PASS**: score 12.12
- [[Rule c]] **FAIL**: liq $10,873


## Why I entered
fresh_launch: 1h +8.84% 5m +8.84%, 1h buys/sells 10/1, vol1h/liq 0.02, score 12.12; mid plan SL -10% TP +20% trail 8%; size 1% equity

## Exit
Stop-loss hit (price 5.061e-15 <= stop 9.199e-07)

## Mistake
Probed a $10.9k-liq fresh_launch (1h buys/sells 10/1, vol1h/liq 0.02); it rugged to ~0 in 11 min, so the stop was useless.

## Lesson
Bankroll #1. 7th thin-liq low-volume fresh_launch rug. The $1 probe size limited the damage to $1. Rule kept: liq <$15k with vol1h/liq <0.5 is a $1 probe at most.

Lesson topics: [[Lesson - Rugs and liquidity pulls]]

DexScreener: https://dexscreener.com/base/0x47a15a0a945dc4d67ebac67a9eb441354aabb68c
