---
tags: ["moc"]
---
# Rules

[[00 Index]]

- [[Rule F1]] Entry gate F1: 5m price change between +50% and +150% (Nov 22 winner study; max 185 -> 150 on 2026-11-24 after SVAG #5).
- [[Rule F2]] Entry gate F2: 1h volume / liquidity >= 0.82.
- [[Rule F3]] Entry gate F3: liquidity >= $30,000 (contains filter (c) >= $20k; $26k -> $30k on 2026-11-24 after SEAL #7; a $40k + F9 version is lab shadow E11).
- [[Rule F4]] Entry gate F4: 1h buys/sells >= 2.3 (2.0 -> 2.3 on 2026-11-24 after SVAG #5).
- [[Rule F5]] Entry gate F5: no take-profit win on the same ticker OR contract in the last 6h (contains filter (a) 2h).
- [[Rule F6]] Exit rule F6: sell if the price has not touched +10% within 8 minutes of entry.
- [[Rule F7]] Entry gate F7 (added 2026-11-23): contract safety via GoPlus (+ honeypot.is). Blocks honeypot / cannot sell, buy or sell tax > 10%, owner can mint / pause / blacklist / change balances (unless renounced), hidden owner, self-destruct, top-10 holders excl. LP/pool/burn > 40%. API error or token not indexed = UNKNOWN = blocked (fail closed). LP lock/burn % is logged as info only, not a gate (the LP block was dropped 2026-11-23 07:40 ET by user decision). Missing data does NOT block on Rio (F7 PASS NO_DATA). A strict version (sellability confirmed + mint/blacklist/pause/change-balance flags reported, else blocked) ran live 2026-11-24 10:53-12:0x ET after SVAG #5 and was then moved by user decision to the Experiments Lab as shadow experiment E10 (log only).
- [[Rule F8]] Entry gate F8 (added 2026-11-24 after SVAG #5): after a candidate passes everything, wait ~25s from the scout quote and re-quote; skip if price is > 5% below the scout price, liquidity is > 5% below the scout liquidity, or the fresh 5m change (F1) / 1h buys/sells (F4) now fail. Since 2026-11-24 (SEAL #7) the re-quote is a cache-busted fetch of the exact pair; if it is byte-identical to the scout (price + liquidity + txns) after one retry, or the fetch fails, F8 fails as stale.
- [[Rule Size]] Size: min(1% pool liquidity, 5% equity, 95% cash); x0.5 for pools under 1h old or of unknown age (2026-11-24, SVAG #5); skip if < $10.
- [[Rule a]] Filter (a): no same ticker or contract within 2h after a take-profit win (lessons #93, #98).
- [[Rule b]] Filter (b): winner_pattern score >= 12 (lesson #99).
- [[Rule c]] Filter (c): liquidity >= $20,000 (lesson #99).
- [[Rule WP]] winner_pattern profile: fresh < 6h, 1h >= +100%, vol1h/liq >= 0.6, buys >= 2x sells, 1h buys >= 25, liq >= $10k, 5m > 0.
- [[Rule Exit TP]] Take-profit +20%, full sell, no runners (run 2 trial exit_trial_v1).
- [[Rule Exit Breakeven]] Once +10% is touched the stop moves to entry +2% (fees).
- [[Rule Exit Stop]] -10% hard stop; liquidity collapse exits kept.

## Live rule list (ledger.json)
- ENTRY setup: Only winner_pattern: fresh <6h, 1h >= +100%, vol1h/liq >= 0.6, buys >= 2x sells, buys >= 25, liq >= $10k, 5m > 0 (USER Nov 20 02:25)
- ENTRY (a): No same symbol OR address entry for 2h after a take-profit win (lessons #93, #98)
- ENTRY (b): winner_pattern score >= 12 (lesson #99)
- ENTRY (c): winner_pattern liquidity >= $20,000 (lesson #99)
- GATE F1: 5m change between +50% and +150% inclusive (Nov 22 winner study; max +185% -> +150% on 2026-11-24, USER, after SVAG #5 bought at 5m +170%)
- GATE F2: vol1h/liq >= 0.82 (Nov 22 winner study)
- GATE F3: liquidity >= $30,000 (Nov 22 winner study $26k; 2026-11-24 after SEAL #7 entered at $26,208: $40k briefly, then tuned to $30k; the $40k + F9 version is lab shadow E11)
- GATE F4: 1h buys/sells >= 2.3 (Nov 22 winner study 2.0; raised to 2.3 on 2026-11-24, USER, after SVAG #5 entered at exactly 2.00)
- GATE F5: No take-profit win on the same ticker OR address in the last 6h (Nov 22 winner study)
- GATE F7 (added 2026-11-23 00:51 ET, user-approved; LP part dropped 2026-11-23 07:4x ET by USER): contract safety via GoPlus token_security (Base 8453) + honeypot.is. BLOCK if honeypot/cannot sell, buy or sell tax > 10%, owner can mint/pause/blacklist/change balances (unless ownership renounced), hidden owner, self-destruct, or top-10 holders excl. LP/pool/burn > 40%. GoPlus error/timeout/token not indexed = F7 UNKNOWN = BLOCK. MISSING FIELDS DO NOT BLOCK: shown as 'F7 PASS NO_DATA' (the strict NO_DATA block ran live 2026-11-24 10:53-12:0x ET after SVAG #5 and was moved by the USER to the Experiments Lab as shadow E10, log only). LP lock/burn % is info only. Cached 10 min per contract (NO_DATA and errors re-checked after 60s); max 20 GoPlus calls/min, 8 new per round.
- GATE F8 (2026-11-24, USER, after SVAG #5 dumped -29% 19s after entry): recheck. A candidate that passes every other check waits until 25s after the scout quote, then is re-quoted (DexScreener). SKIP if price < scout price -5%, liquidity < scout liquidity -5%, or the fresh 5m change fails F1 (+50..+150%) or 1h buys/sells fails F4 (>= 2.3). Logged as F8 PASS/FAIL with values in the gate string; F8 FAIL is logged as a near miss. Up-moves do not block (entry = re-quote +1%). Runs inside round.py, so watcher.py keeps managing open positions while it waits; no ledger lock is held during the wait. | 2026-11-24 (SEAL #7) FIX: the re-quote is a cache-busted fetch of the exact scouted pair (DexScreener pairs endpoint + nonce + no-cache headers; tokens/v1 fallback). If price + liquidity + 5m/1h txns are byte-identical to the scout after one retry 6s later, or the fetch fails, F8 FAILS as stale. GeckoTerminal pool data is logged as a cross-check only.
- EXIT F6: Time stop: sell at market if the price has not touched +10% within 8 min of entry
- EXIT TP: Take-profit +20%, full sell, no runners, no trailing stop
- EXIT breakeven: Once the price touches +10%, stop moves to entry +2% (fees)
- EXIT stop: -10% stop-loss; liquidity collapse exits kept (< $5k or -50% from entry)
- BUY re-quote: replaced 2026-11-24 by GATE F8 (25s recheck); entry = F8 re-quote +1%
- SIZE (2026-11-23 23:4x ET, USER): 1% of pool liquidity per entry, capped at 5% of equity (and 95% of cash); skip if < $10 (e.g. $35k pool -> $350; $200k pool -> 5% cap ~$502 on $10k). Max 3 new per round, max 6 open winner_pattern positions | 2026-11-24 USER (SVAG #5 gap): pools younger than 1h (or unknown age) get HALF size = 0.5 * min(1% liq, 5% equity, 95% cash); skip if < $10 | 2026-11-24 ~20:2x ET: half size for pools < 1h or unknown age remains in force (it was replaced by gate F9 for a few minutes after SEAL #7, then restored when F9 was removed).
- HALT: If equity <= $5,000 (half the $10,000 bankroll): no new positions; status.json halted=true with reason
- OPS: Continuous scanning (next round 10s after the previous ends, so a full scan about every 12-15s; GeckoTerminal responses cached 20s to stay under ~30 req/min; 60s backoff after an HTTP 429); watcher checks every ~3s; supervisor restarts watcher if heartbeat > 20s stale; scout holds the ledger lock only for the booking write
- SAFETY: Honeypot/high-tax block, one-sided flow rug filters, same-symbol-after-loss 2h block, same-contract-after-loss no re-entry (carried from run 1)
- LOG near-misses (2026-11-23): coins failing exactly ONE of F1-F5, F7, F8, (b), WP (2026-11-24: F8 FAIL included; F7 NO_DATA is a PASS, not a failed check) are recorded in near_misses.json/csv with the failed check and margin, tracked 30 min by sidecar.py (max gain, max drawdown, 30m change, TP+20% vs -10% first touch, our exit rules simulated). NEVER traded.
- LOG smart wallets (2026-11-23): buyer wallets of candidates/trades from GeckoTerminal pool trades, scored over time in smart_wallets.json (hit = coin later >= +50% above the wallet's buy; known-good = >= 2 hits and >= 40% hit rate). LOG ONLY: never blocks or allows a trade.
