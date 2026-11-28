---
trade: 3
run: 2
symbol: "REALM"
name: "Realm Venice"
contract: "0xB99aaeEb6aE82325fa17EE83D90a95aE84602229"
pair: "0x62421d869034b359dd5af56f533761ec5793e737c2ece30e3e8f84859e5ef1c6"
result: "loss"
pnl_usd: -19.709577
pnl_pct: -5.632434
exit_type: "BREAKEVEN"
exit_reason: "Breakeven stop hit (price 6.072e-05 <= stop 6.497e-05 = entry +2%, armed 13:02:09)"
entry_time: "2026-11-23T13:00:29-05:00"
exit_time: "2026-11-23T13:03:12.241646-05:00"
entry_price: 6.4e-05
exit_price: 6e-05
usd_in: 349.93
hold_time: "2m 43s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 34993.16
peak_price: 7.3e-05
max_drawdown_pct: -16.4442
checks_source: "live entry checks"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "PASS"
check_b: "PASS"
check_WP: "PASS"
f7_status: "PASS"
f7_reasons: []
smart_wallet_count: 0
smart_wallets: []
f7_gp_buy_tax_pct: null
f7_gp_sell_tax_pct: null
f7_top10_excl_lp_burn_pct: null
f7_lp_locked_or_burned_pct: null
f7_owner_renounced: false
f7_gp_is_honeypot: null
tags: ["trade", "run2", "loss", "exit/breakeven"]
---
# R2-T3 REALM

Coin: [[REALM-b99a2229]]  ·  Exit: [[Exit BREAKEVEN]]  ·  Run: [[Trades Run 2]]

**Result:** LOSS -5.63% ($-19.7096)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +159% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 0.97 (need >=0.82)
- [[Rule F3]] **PASS**: liq $34,993 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 85/40=2.12 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]
- [[Rule b]] **PASS**: score 14.22 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 0 → [[Smart Wallets]]

**F7 detail:** F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## Why I entered
winner_pattern: 1h +805% 5m +159%, 1h buys/sells 85/40, vol1h/liq 0.97, score 14.22; smart wallets 0 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size 5% equity; honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +159% (need +50..+185); F2 PASS vol1h/liq 0.97 (need >=0.82); F3 PASS liq $34,993 (need >=$26k); F4 PASS buys/sells 85/40=2.12 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders] | re-quote 6.307e-05 (+0.0% vs scout)

## Exit
Breakeven stop hit (price 6.072e-05 <= stop 6.497e-05 = entry +2%, armed 13:02:09)

## Mistake
Loss -5.6% ($-19.71): Breakeven stop hit (price 6.072e-05 <= stop 6.497e-05 = entry +2%, armed 13:02:09). stop gap: market 6.072e-05 was 6.5% below the stop 6.497e-05; filled -5.6% vs planned -10%. Entry facts: entry score 14.22, liq $34,993; 5m +159% / 1h +805%; vol1h/liq 0.97; 1h buys/sells 85/40; held 2m 43s.

## Lesson
stop gapped: on these pools the real loss is the next printed price, not -10%; size for the gap.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Breakeven stop]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x62421d869034b359dd5af56f533761ec5793e737c2ece30e3e8f84859e5ef1c6
