---
trade: 6
run: 2
symbol: "Circel"
name: "Circel"
contract: "0xb200000000000000000000E5A88b9015e6254C01"
pair: "0x30be677798d16b08b0e0a292a7688a0a056991fc17a79b77f6e2ed812b797889"
result: "win"
pnl_usd: 120.141051
pnl_pct: 23.48615
exit_type: "TP"
exit_reason: "Take-profit hit (price 2.890e-04 >= target 2.780e-04)"
entry_time: "2026-11-24T16:09:44-05:00"
exit_time: "2026-11-24T16:11:53.296621-05:00"
entry_price: 0.000232
exit_price: 0.000286
usd_in: 511.54
hold_time: "2m 09s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 55320.63
peak_price: 0.000289
max_drawdown_pct: -7.98208
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
smart_wallet_count: 42
smart_wallets: ["0xb5127ef12f7d7256dffe712ddf1bedf132e9e260", "0x771f4011d146f1954df453c23f2bb18f9d3e9d3d", "0x7d1ad285fecfc02ea47c177558ff59d7ced7c2e1", "0x8584d135e6b3c071d2c10652a7d9d7ec0da7da3a", "0xa48ff7d80162f42a9e9bb86293522f3dd043c47b", "0xf1ef1f2c514c4e2b4cb1d4fff8e54095bd41c80d", "0x892a8e06d2578866ec79b29e7d59b255db185356", "0xa59ab6dbee4c8d746d88be51cabc2f3a4b846fa1", "0xafd4a02f11e3e951b48b7df978083069a07baa73", "0x0019d8d3772380234d6c727ea144475d0de3b4d5", "0x70776345ae8e652d713d49b7615322d09da942be", "0xcd143cb73e09434888ccd2301e251b9b38906639", "0xf4a8cba56c56c273ac52076101ddf76939dbf155", "0xf38ed1198a417a9a6343b2be6ce2ed5039313f34", "0x3f5238903a94d75fa2b0803ed5c750f4af8bb09e", "0xb0ff834a42365b4f03790ec326d026f504fa559c", "0xfdfdce11469405d0d112104a12ad299d34fb44cb", "0x0560d95b64be3e46f73476bf550a575ae459ce4f", "0x05334779b6efb0daf10784d0eb213403bf9cd7d4", "0x8ce70ef84672ff035570a151cada00201580391f", "0x038009e6a06cf543c21414e805f92ee471eeb461", "0x82db1b856ea155f88d7b45f9420a4bd1258c09c4", "0x3692e326f88c0aa95f06116d46fa1e545af3d098", "0xef7b1b9b58323d3aaca11279bfeab544a2897303", "0x8463f853a49e6a77bfd4ee05ebdf3eff850a49ce", "0xbeaa587d2933c56937f284ee3008db6463bd0117", "0x29e523b9f0bd8dd9e4f874c8919abc00f9e28558", "0xda4e945e8666ecc398d2af14739bd477dc64a8c5", "0x1d2f5cfee72b4f6206bdc02514d90e0fff7dc9ef", "0x96e682919da72437a38269bfbcc5fad5206df4f3", "0x839733af1c40c32094410bd854ba4be5b842d522", "0x885880163617f013900524e5a670f063faabd115", "0x913dc13579458485a45f1e6d03f6c465086741f1", "0xbcc49258783f19ee18d2fc742ac73616030b1429", "0xfdf5360fb810f0478aba60afcc6bb3c5503f11cb", "0xb0b63ad73f4bcbea9dbe3ec1a8e6c63131f1e797", "0xb7f7ba93849663561e61a0980c48777242e9ccbf", "0x24bbd76febd147094312e67bca91f72655a935ca", "0x4d3108095a6d277ecafbbf38403742d860db83f8", "0x186f0e26339d7ff29fa2a79323b8fc7c9cace11f", "0x95c7082a31a282a759c96c81801fa2fc28e781d5", "0x3a003ebace8f7ce6c67aa08634a00b744e40f908"]
f7_gp_buy_tax_pct: null
f7_gp_sell_tax_pct: null
f7_top10_excl_lp_burn_pct: null
f7_lp_locked_or_burned_pct: null
f7_owner_renounced: false
f7_gp_is_honeypot: null
tags: ["trade", "run2", "win", "exit/tp"]
---
# R2-T6 Circel

Coin: [[Circel-b2004c01]]  ·  Exit: [[Exit TP]]  ·  Run: [[Trades Run 2]]

**Result:** WIN +23.49% ($+120.1411)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +111% (need +50..+150)
- [[Rule F2]] **PASS**: vol1h/liq 1.89 (need >=0.82)
- [[Rule F3]] **PASS**: liq $55,321 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 508/115=4.42 (need >=2.3)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]
- [[Rule F8]] **PASS**: F8 PASS recheck 26s: price 0.0002249->0.0002294 (+2.0%, need >=-5%), liq $55,321->$55,909 (+1.1%, need >=-5%), 5m +116% (need +50..+150), buys/sells 513/115=4.46 (need >=2.3)
- [[Rule b]] **PASS**: score 19.73 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 42 → [[Smart Wallets]]

**F7 detail:** F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]

## Why I entered
winner_pattern: 1h +303% 5m +111%, 1h buys/sells 508/115, vol1h/liq 1.89, score 19.73; smart wallets 42 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size $511.54 (1% of $55,321 liq = $553.21, cap 5% eq $511.54, 95% cash $9,719.19; binding: cap 5% eq; full size (age 1.9h >= 1h)); honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +111% (need +50..+150); F2 PASS vol1h/liq 1.89 (need >=0.82); F3 PASS liq $55,321 (need >=$26k); F4 PASS buys/sells 508/115=4.42 (need >=2.3); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS NO_DATA: safety not verified (not blocking; missing: sellability not confirmed (GoPlus is_honeypot/cannot_sell_all not reported as 0; honeypot.is unavailable), is_mintable not reported, is_blacklisted not reported, transfer_pausable not reported, owner_change_balance not reported) [hp n/r]; F8 PASS recheck 26s: price 0.0002249->0.0002294 (+2.0%, need >=-5%), liq $55,321->$55,909 (+1.1%, need >=-5%), 5m +116% (need +50..+150), buys/sells 513/115=4.46 (need >=2.3)

## Exit
Take-profit hit (price 2.890e-04 >= target 2.780e-04)

## Mistake
None (win +23.5%, $+120.14): Take-profit hit (price 2.890e-04 >= target 2.780e-04). TP hit, peak +24.7%

## Lesson
What worked: entry score 19.73, liq $55,321; 5m +111% / 1h +303%; vol1h/liq 1.89; 1h buys/sells 508/115; held 2m 09s; TP hit, peak +24.7%. Count this profile as a pattern win; do not treat an upside gap above +25% as the expected payoff.

Lesson topics: [[Lesson - What worked (wins)]], [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x30be677798d16b08b0e0a292a7688a0a056991fc17a79b77f6e2ed812b797889
