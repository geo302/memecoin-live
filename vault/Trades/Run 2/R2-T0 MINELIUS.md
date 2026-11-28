---
trade: 0
run: 2
symbol: "MINELIUS"
name: "Minelius"
contract: "0x3FC9D4CA2F25d4c47D7Ece7Af203988375A80Ba6"
pair: "0x04c93cc84d7b8af3aa0925428ff822a5090d11402e781fc6b84be582c015b0b9"
result: "win"
pnl_usd: 86.778814
pnl_pct: 27.71335
exit_type: "TP"
exit_reason: "Take-profit hit (price 4.929e-07 >= target 4.585e-07)"
entry_time: "2026-11-23T06:01:34-05:00"
exit_time: "2026-11-23T06:02:46.729551-05:00"
entry_price: 0.0
exit_price: 0.0
usd_in: 313.13
hold_time: "1m 12s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 31313.31
peak_price: 0.0
max_drawdown_pct: -5.753462
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
# R2-T0 MINELIUS

Coin: [[MINELIUS-3fc90ba6]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +27.71% ($+86.7788)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +52.81% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 1.51 (need >=0.82)
- [[Rule F3]] **PASS**: liq $31,313 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 62/25=2.48 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders, LP lock (no lp_holders)]
- [[Rule b]] **PASS**: score 15.47 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 0 → [[Smart Wallets]]

**F7 detail:** F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders, LP lock (no lp_holders)]

## Why I entered
winner_pattern: 1h +192% 5m +52.81%, 1h buys/sells 62/25, vol1h/liq 1.51, score 15.47; smart wallets 0 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size 5% equity; honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +52.81% (need +50..+185); F2 PASS vol1h/liq 1.51 (need >=0.82); F3 PASS liq $31,313 (need >=$26k); F4 PASS buys/sells 62/25=2.48 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders, LP lock (no lp_holders)] | re-quote 3.783e-07 (+0.0% vs scout)

## Exit
Take-profit hit (price 4.929e-07 >= target 4.585e-07)

## Mistake
None (win +27.7%, $+86.78): Take-profit hit (price 4.929e-07 >= target 4.585e-07). TP hit, peak +29.0%

## Lesson
What worked: entry score 15.47, liq $31,313; 5m +52.81% / 1h +192%; vol1h/liq 1.51; 1h buys/sells 62/25; held 1m 12s; TP hit, peak +29.0%. Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x04c93cc84d7b8af3aa0925428ff822a5090d11402e781fc6b84be582c015b0b9
