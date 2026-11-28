---
near_miss: "NM-0021"
symbol: "STOXCREDIT"
contract: "0xB200000000000000000000eaD017C8f9CC712201"
detected_at: "2026-11-24T10:14:41-05:00"
failed_check: "F3"
failed_detail: "liq $10,434 (need >=$26,000; filter (c) >=$20,000 FAIL)"
margin_diff: -15566
margin_diff_pct: -59.87
f7_status: "PASS"
tracking_status: "done"
max_gain_pct: 146.043
max_drawdown_pct: -70.16
chg_30m_pct: -70.16
tp_before_sl: true
hypothetical_exit: "TP"
hypothetical_pnl_pct: 25.098
hypothetical_outcome: "WIN"
smart_wallet_count: 0
tags: ["near-miss", "failed/F3", "win"]
---
# Near miss NM-0021 STOXCREDIT

Coin: [[STOXCREDIT-b2002201]]  ·  Failed only: [[Rule F3]]  ·  [[Near Misses]]

Never traded. Failed **F3**: liq $10,434 (need >=$26,000; filter (c) >=$20,000 FAIL)

## All checks
- [[Rule F1]] PASS: 5m +94.11% (need +50..+185)
- [[Rule F2]] PASS: vol1h/liq 1.13 (need >=0.82)
- [[Rule F3]] FAIL: liq $10,434 (need >=$26,000; filter (c) >=$20,000 FAIL)
- [[Rule F4]] PASS: buys/sells 93/20=4.65 (need >=2)
- [[Rule F5]] PASS: fresh (no TP on ticker/address <6h)
- [[Rule b]] PASS: score 12.43 (need >=12)
- [[Rule WP]] PASS: winner_pattern ok
- [[Rule F7]] PASS: F7 PASS NO_DATA: safety not verified (not blocking; not reported: sellability (no GoPlus honeypot field, honeypot.is unavailable), GoPlus taxes, is_mintable, transfer_pausable, is_blacklisted, owner_change_balance, holders) [hp n/r]

## 30-minute tracking
status done, max gain 146.043%, max drawdown -70.16%, 30m change -70.16%, first touch TP, hypothetical exit TP 25.098% → WIN
