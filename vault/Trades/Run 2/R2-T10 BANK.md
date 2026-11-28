---
trade: 10
run: 2
symbol: "BANK"
name: "BankCoin"
contract: "0xB200000000000000000000761b5cE65F6d80569C"
pair: "0xb6a121f5796e09b70fd6d8092c843e00ef1a71e2969f1bbcccf61219dc9edb09"
result: "win"
pnl_usd: 161.673101
pnl_pct: 62.499266
exit_type: "TP"
exit_reason: "Take-profit hit (price 1.593e-04 >= target 1.165e-04)"
entry_time: "2026-11-26T17:17:41-05:00"
exit_time: "2026-11-26T17:23:01.900418-05:00"
entry_price: 9.7e-05
exit_price: 0.000158
usd_in: 258.68
hold_time: "5m 20s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 55306.24
peak_price: 0.000159
max_drawdown_pct: -8.635572
checks_source: "live entry checks"
check_F1: "PASS"
check_F2: "PASS"
check_F3: "PASS"
check_F4: "PASS"
check_F5: "PASS"
check_F7: "PASS"
check_F8: "PASS"
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
tags: ["trade", "run2", "win", "exit/tp"]
---
# R2-T10 BANK

Coin: [[BANK-b200569c]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +62.50% ($+161.6731)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +105% (need +50..+150)
- [[Rule F2]] **PASS**: vol1h/liq 1.06 (need >=0.82)
- [[Rule F3]] **PASS**: liq $55,306 (need >=$30,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 97/42=2.31 (need >=2.3)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]
- [[Rule F8]] **PASS**: F8 PASS recheck 26s [fresh dexscreener pairs, cf MISS, try 1]: price 9.486e-05->9.609e-05 (+1.3%, need >=-5%), liq $55,306->$55,715 (+0.7%, need >=-5%), 5m +108% (need +50..+150), buys/sells 99/42=2.36 (need >=2.3)
- [[Rule b]] **PASS**: score 14.68 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 0 → [[Smart Wallets]]

**F7 detail:** F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## Why I entered
winner_pattern: 1h +644% 5m +105%, 1h buys/sells 97/42, vol1h/liq 1.06, score 14.68; smart wallets 0 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size $258.68 (1% of $55,306 liq = $553.06, cap 5% eq $517.35, 95% cash $9,829.68; binding: cap 5% eq; x0.5 young pool <1h (age 5m) from $517.35); honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +105% (need +50..+150); F2 PASS vol1h/liq 1.06 (need >=0.82); F3 PASS liq $55,306 (need >=$30k); F4 PASS buys/sells 97/42=2.31 (need >=2.3); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]; F8 PASS recheck 26s [fresh dexscreener pairs, cf MISS, try 1]: price 9.486e-05->9.609e-05 (+1.3%, need >=-5%), liq $55,306->$55,715 (+0.7%, need >=-5%), 5m +108% (need +50..+150), buys/sells 99/42=2.36 (need >=2.3)

## Exit
Take-profit hit (price 1.593e-04 >= target 1.165e-04)

## Mistake
None (win +62.5%, $+161.67): Take-profit hit (price 1.593e-04 >= target 1.165e-04). TP filled at market +64.1% vs +25% target (price jumped between checks)

## Lesson
What worked: entry score 14.68, liq $55,306; 5m +105% / 1h +644%; vol1h/liq 1.06; 1h buys/sells 97/42; held 5m 20s; TP filled at market +64.1% vs +25% target (price jumped between checks). Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xb6a121f5796e09b70fd6d8092c843e00ef1a71e2969f1bbcccf61219dc9edb09
