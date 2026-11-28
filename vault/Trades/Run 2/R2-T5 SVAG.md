---
trade: 5
run: 2
symbol: "SVAG"
name: "Sovereign Agent"
contract: "0x037EED48b22e417323BA0528007a3b7Ca6f69545"
pair: "0x04593cade24eccc16e5370975935522876bd085aca6d39c80fc050ec2911c4ea"
result: "loss"
pnl_usd: -153.571587
pnl_pct: -29.577933
exit_type: "STOP"
exit_reason: "Stop-loss hit (price 9.347e-05 <= stop 1.183e-04)"
entry_time: "2026-11-24T08:25:48-05:00"
exit_time: "2026-11-24T08:26:07.422504-05:00"
entry_price: 0.000131
exit_price: 9.3e-05
usd_in: 519.21
hold_time: "0m 19s"
setup: "winner_pattern|pattern"
liquidity_at_entry: 55396.23
peak_price: 0.000131
max_drawdown_pct: -28.866599
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
smart_wallet_count: 18
smart_wallets: ["0xf504d52e00cacf997482955971246c67cb8ab2dc", "0x06540a2c50d7db60b5cc1e62431661bbb047c817", "0xd202aa1c878e5e4b722831c5892655fe20514205", "0x592dfe8347151b7c2852b3d2a2adab6ed3132fa2", "0xba6ca46248ccf860bbd60eff9c9c2bd1ecf1e9bb", "0x64d1fca797c1706e1563b4f0f5c0a8c591dada3a", "0x5f2d6d62cc7c075eba67f3511cf9ddf2e7fa71f7", "0x06d7d1f36190db2f98c0adbe0e3cadc986429227", "0x0cbae825ed1673bea739fb66e5f15562fdaba375", "0xec850eaa37b06377742a4bd7aa83b243f71b2e8e", "0x49aebadb01534a5000cfcb5a43010479bfad881a", "0x16c8605bd94cd1e523997ec5516e431052f395f7", "0xcd9801c801dbe5b5b4c5d459ca09008ed88a1788", "0xee90934f860332a66622006452fb9ae211cedd7f", "0x7ae6fe4af15b68ba8d851066d176af5fdbca4180", "0x22a536d6fd20c58e17f47af3163b1560530a996c", "0xc0bbb49ee88afc4b1e6b98ab282a059670889d01", "0xe59bf8b99b410d7c1e23e28c0052c020014f2b6b"]
f7_gp_buy_tax_pct: null
f7_gp_sell_tax_pct: null
f7_top10_excl_lp_burn_pct: null
f7_lp_locked_or_burned_pct: null
f7_owner_renounced: false
f7_gp_is_honeypot: null
tags: ["trade", "run2", "loss", "exit/stop"]
---
# R2-T5 SVAG

Coin: [[SVAG-037e9545]]  ·  Exit: [[Exit STOP]]  ·  Run: [[Trades Run 2]]

**Result:** LOSS -29.58% ($-153.5716)  ·  setup `winner_pattern|pattern`

## Entry checks

- [[Rule F1]] **PASS**: 5m +170% (need +50..+185)
- [[Rule F2]] **PASS**: vol1h/liq 1.16 (need >=0.82)
- [[Rule F3]] **PASS**: liq $55,396 (need >=$26,000; filter (c) >=$20,000 ok)
- [[Rule F4]] **PASS**: buys/sells 130/65=2.00 (need >=2)
- [[Rule F5]] **PASS**: fresh (no TP on ticker/address <6h)
- [[Rule F7]] **PASS**: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]
- [[Rule b]] **PASS**: score 14.16 (need >=12)
- [[Rule WP]] **PASS**: winner_pattern ok
- [[Rule F6]] exit rule (8 min / +10%)

**Smart wallets at entry (log only):** 18 → [[Smart Wallets]]

**F7 detail:** F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## Why I entered
winner_pattern: 1h +1541% 5m +170%, 1h buys/sells 130/65, vol1h/liq 1.16, score 14.16; smart wallets 18 (log only); pattern plan SL -10% TP +20% full sell, no trail, breakeven +2% after +10%, F6 sell if no +10% in 8m (exit_trial_v1); size $519.21 (1% of $55,396 liq = $553.96, cap 5% eq $519.21, 95% cash $9,865.08; binding: cap 5% eq); honeypot: not indexed (HTTP 404 pair not found) | GATE ALL PASS: F1 PASS 5m +170% (need +50..+185); F2 PASS vol1h/liq 1.16 (need >=0.82); F3 PASS liq $55,396 (need >=$26k); F4 PASS buys/sells 130/65=2.00 (need >=2.0); F5 PASS fresh (no TP on ticker/address <6h); F6 PASS exit rule: +10% within 8m or sell; F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r] | re-quote 0.0001301 (+0.0% vs scout)

## Exit
Stop-loss hit (price 9.347e-05 <= stop 1.183e-04)

## Mistake
Loss -29.6% ($-153.57): Stop-loss hit (price 9.347e-05 <= stop 1.183e-04). stop gap: market 9.347e-05 was 21.0% below the stop 0.0001183; filled -29.6% vs planned -10%. Entry facts: entry score 14.16, liq $55,396; 5m +170% / 1h +1541%; vol1h/liq 1.16; 1h buys/sells 130/65; held 0m 19s.

## Lesson
stop gapped: on these pools the real loss is the next printed price, not -10%; size for the gap.

Lesson topics: [[Lesson - Stop gaps]], [[Lesson - Score and liquidity minimums]]

DexScreener: https://dexscreener.com/base/0x04593cade24eccc16e5370975935522876bd085aca6d39c80fc050ec2911c4ea
