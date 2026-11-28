---
trade: 1
run: 2
symbol: "Jacket"
name: "The Jacket Stays On"
contract: "0x9Ed50A01461850a474B52E2CF20B373B9CDdeb74"
pair: "0x46543041b4ba2389c430733881dd1bf4990045c531fe3ed9db394afb64ba4794"
result: "win"
pnl_usd: 79.183568
pnl_pct: 25.536496
exit_type: "TP"
exit_reason: "Take-profit hit (price 4.658e-05 >= target 4.408e-05)"
entry_time: "2026-11-23T10:27:26-05:00"
exit_time: "2026-11-23T10:27:50.496351-05:00"
entry_price: 3.7e-05
exit_price: 4.6e-05
usd_in: 310.08
hold_time: "0m 24s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 31008.27
peak_price: 4.7e-05
max_drawdown_pct: -0.037295
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
tags: ["trade", "run2", "win", "exit/tp"]
---
# R2-T1 Jacket

Coin: [[Jacket-9ed5eb74]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +25.54% ($+79.1836)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +174% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 1.00 (need >=0.82)
- [[Rule F3]] **PASS**: liq $31,008 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 49/14=3.50 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]
- [[Rule b]] **PASS**: score 17.0 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 0 → [[Smart Wallets]]

**F7 detail:** F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## Why I entered
winner_pattern: 1h +174% 5m +174%, 1h buys/sells 49/14, vol1h/liq 1.00, score 17.0; smart wallets 0 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size 5% equity; honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +174% (need +50..+185); F2 PASS vol1h/liq 1.00 (need >=0.82); F3 PASS liq $31,008 (need >=$26k); F4 PASS buys/sells 49/14=3.50 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders] | re-quote 3.637e-05 (-1.0% vs scout)

## Exit
Take-profit hit (price 4.658e-05 >= target 4.408e-05)

## Mistake
None (win +25.5%, $+79.18): Take-profit hit (price 4.658e-05 >= target 4.408e-05). TP hit, peak +26.8%

## Lesson
What worked: entry score 17.0, liq $31,008; 5m +174% / 1h +174%; vol1h/liq 1.0; 1h buys/sells 49/14; held 0m 24s; TP hit, peak +26.8%. Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x46543041b4ba2389c430733881dd1bf4990045c531fe3ed9db394afb64ba4794
