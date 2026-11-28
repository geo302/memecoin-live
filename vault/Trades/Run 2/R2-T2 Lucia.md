---
trade: 2
run: 2
symbol: "Lucia"
name: "Lucia"
contract: "0x7B67D63bDCA34fDed70e3Cb6Ef08af7e87073f95"
pair: "0xb549bf8f8f82b14ccb6e11eb6d0640d0435c05d700d3ef0e3f0bbc588d44d26a"
result: "win"
pnl_usd: 113.053665
pnl_pct: 22.241524
exit_type: "TP"
exit_reason: "Take-profit hit (price 1.079e-04 >= target 1.049e-04)"
entry_time: "2026-11-23T11:10:43-05:00"
exit_time: "2026-11-23T11:13:18.648686-05:00"
entry_price: 8.7e-05
exit_price: 0.000107
usd_in: 508.3
hold_time: "2m 35s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 54622.59
peak_price: 0.000108
max_drawdown_pct: -13.956941
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
smart_wallet_count: 14
smart_wallets: ["0xdd23d42c13485e29a5936ce2624fd01649114a6a", "0x3be898e54e76edc34b9d4eaf4775402432b4f29b", "0x7c4541193a4928d14eb37e645adee082bce84ab9", "0xf8e5dd597ffdc9f82b10d816303a34b73d31f749", "0x8149c8b1216edcf28bab1605b9395a536bd368e6", "0x59bcba18930c6445b35dc0715130a5f59dc26f9f", "0xbf1cd418f777fda90e6de42cde58939afb124cac", "0x871f9317797d027c8c8b68a12aa33dbe7da70ee2", "0xd81516914464d5cee1b5ee4b008e3f47be38ecad", "0xedde75c7ac9753ea80b08fd55c9299e11948b65c", "0x15cdd8eaf24aadf288b770fa2efff2044f26a3a3", "0xb1cc49bfc9c9662fcd0e7f176aeb68ae519622e2", "0x4ec329a8fe2b7d3c34dfb84861e9b63edb972fc6", "0xbf90627163c6892600a86c7e959644dd51d84158"]
f7_gp_buy_tax_pct: null
f7_gp_sell_tax_pct: null
f7_top10_excl_lp_burn_pct: null
f7_lp_locked_or_burned_pct: null
f7_owner_renounced: false
f7_gp_is_honeypot: null
tags: ["trade", "run2", "win", "exit/tp"]
---
# R2-T2 Lucia

Coin: [[Lucia-7b673f95]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +22.24% ($+113.0537)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +181% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 1.07 (need >=0.82)
- [[Rule F3]] **PASS**: liq $54,623 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 74/20=3.70 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]
- [[Rule b]] **PASS**: score 17.47 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 14 → [[Smart Wallets]]

**F7 detail:** F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders]

## Why I entered
winner_pattern: 1h +553% 5m +181%, 1h buys/sells 74/20, vol1h/liq 1.07, score 17.47; smart wallets 14 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size 5% equity; honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +181% (need +50..+185); F2 PASS vol1h/liq 1.07 (need >=0.82); F3 PASS liq $54,623 (need >=$26k); F4 PASS buys/sells 74/20=3.70 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS contract safety ok [hp n/r; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders] | re-quote 8.652e-05 (+0.0% vs scout)

## Exit
Take-profit hit (price 1.079e-04 >= target 1.049e-04)

## Mistake
None (win +22.2%, $+113.05): Take-profit hit (price 1.079e-04 >= target 1.049e-04). TP hit, peak +23.5%

## Lesson
What worked: entry score 17.47, liq $54,623; 5m +181% / 1h +553%; vol1h/liq 1.07; 1h buys/sells 74/20; held 2m 35s; TP hit, peak +23.5%. Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xb549bf8f8f82b14ccb6e11eb6d0640d0435c05d700d3ef0e3f0bbc588d44d26a
