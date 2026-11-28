---
trade: 4
run: 2
symbol: "FOFT"
name: "FEDERAL OIL TRUST FUND (FOTF OIL)"
contract: "0x8C88b34d33d655b1C33242E5f8af64Fed0961C9a"
pair: "0xa450561b8f3cd1e39a1ada89db391fc440db8d86653ae7a51fca91c0ea97250f"
result: "win"
pnl_usd: 124.992753
pnl_pct: 36.014739
exit_type: "TP"
exit_reason: "Take-profit hit (price 7.625e-05 >= target 6.660e-05)"
entry_time: "2026-11-24T02:30:51-05:00"
exit_time: "2026-11-24T02:31:27.789690-05:00"
entry_price: 5.5e-05
exit_price: 7.5e-05
usd_in: 347.06
hold_time: "0m 36s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 34705.91
peak_price: 7.6e-05
max_drawdown_pct: -5.963117
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
smart_wallet_count: 40
smart_wallets: ["0x5db5e3ce6f11ca8a64d12a8049bde35b42a66720", "0xb3310aa7157efba7028d44456cdffde90645a28c", "0xdd23d42c13485e29a5936ce2624fd01649114a6a", "0x3be898e54e76edc34b9d4eaf4775402432b4f29b", "0x7c4541193a4928d14eb37e645adee082bce84ab9", "0x9fbd0eaa6d023d74a065554641ee0fd2bd230f4f", "0xf8e5dd597ffdc9f82b10d816303a34b73d31f749", "0xf9d139d486a062e40e9571fe34d44837d5a7db58", "0x8149c8b1216edcf28bab1605b9395a536bd368e6", "0x4998c81cc878920a5580376e8761dd7892be57b3", "0x619f77517ce3c9b12c419860a99059a1a34fb086", "0x729279fc00ec750c819dfb6abc92151e0fff30c2", "0x59bcba18930c6445b35dc0715130a5f59dc26f9f", "0x216bb161c63c1a179b54d13ac323e9942c835300", "0x82e8ab7363fb870e7269af88a8bd10ab5a8677cd", "0x8da79c8c7488a59f193954ca9b26675fe6614e56", "0xba3ac3468a8dafcaafd321922adbc86237024756", "0x5370a0db324e8abe9c28ff52437dafe3da43e956", "0x898dd1139511b4ee749e30b4c93325eca27d5bdc", "0xbe18a432d9be27020e4b0a29797133a023090252", "0xec1716d403f5e332848cd6579a5a3888fc732f78", "0xbf1cd418f777fda90e6de42cde58939afb124cac", "0x871f9317797d027c8c8b68a12aa33dbe7da70ee2", "0xd81516914464d5cee1b5ee4b008e3f47be38ecad", "0x3b6745892645f13aa0610dc122c79d3eb5de9786", "0xc23ca1e9798532c1b1e3459b950f1c2a9c25ca80", "0xea40703e3b8927d71a8ee5218531ee637820657e", "0xfba17b0bb3a2c01ae76278926d6f9787f72e7268", "0x3b37a54b5e1dd8f70ea4a438875b0c9f7f4bd2ce", "0x3be365f3d76189093c7cf61f5be1a683c39b4d32", "0x6b46b72d8a6b970105a02fe69d3c6eb086342310", "0x6eb125b12bb4020c9dcac767ca2af6f179c44a91", "0x9589b74a13c7c749cc4241a3165a3f10e4002d02", "0xb1cc49bfc9c9662fcd0e7f176aeb68ae519622e2", "0x4ec329a8fe2b7d3c34dfb84861e9b63edb972fc6", "0xcc0a4cd4888c628d302a7bbdd6be409dd39f384a", "0x525653e4500e07ca9dc7154dbeff704513e2e96d", "0x07fac8d7ff0da3e0be6f7624b837295bcc760040", "0xbb888ec75496e09957e9179a4a19dd4ac13bb133", "0x936d67ae010d83dceb33591760dfc626525466a8"]
f7_gp_buy_tax_pct: null
f7_gp_sell_tax_pct: null
f7_top10_excl_lp_burn_pct: null
f7_lp_locked_or_burned_pct: null
f7_owner_renounced: false
f7_gp_is_honeypot: null
tags: ["trade", "run2", "win", "exit/tp"]
---
# R2-T4 FOFT

Coin: [[FOFT-8c881c9a]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +36.01% ($+124.9928)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +56.28% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 1.43 (need >=0.82)
- [[Rule F3]] **PASS**: liq $34,706 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 95/41=2.32 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]
- [[Rule b]] **PASS**: score 15.07 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 40 → [[Smart Wallets]]

**F7 detail:** F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## Why I entered
winner_pattern: 1h +548% 5m +56.28%, 1h buys/sells 95/41, vol1h/liq 1.43, score 15.07; smart wallets 40 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size $347.06 (1% of $34,706 liq = $347.06, cap 5% eq $512.97, 95% cash $9,746.34; binding: 1% liq); honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +56.28% (need +50..+185); F2 PASS vol1h/liq 1.43 (need >=0.82); F3 PASS liq $34,706 (need >=$26k); F4 PASS buys/sells 95/41=2.32 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r] | re-quote 5.495e-05 (+0.0% vs scout)

## Exit
Take-profit hit (price 7.625e-05 >= target 6.660e-05)

## Mistake
None (win +36.0%, $+124.99): Take-profit hit (price 7.625e-05 >= target 6.660e-05). TP filled at market +37.4% vs +25% target (price jumped between checks)

## Lesson
What worked: entry score 15.07, liq $34,706; 5m +56.28% / 1h +548%; vol1h/liq 1.43; 1h buys/sells 95/41; held 0m 36s; TP filled at market +37.4% vs +25% target (price jumped between checks). Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0xa450561b8f3cd1e39a1ada89db391fc440db8d86653ae7a51fca91c0ea97250f
