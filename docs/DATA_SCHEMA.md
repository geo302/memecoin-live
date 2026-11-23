# Data schema: memecoin-live (PAPER trading only)

Everything here is **simulated (paper) trading** of Base-chain meme coins by Rio, Geovanie's trading bot. There is no wallet, no real money and no keys in this data.

- **Run 2** started 2026-11-22 23:23:52 ET with a fresh **$1,000** paper account, trade ids from #0, under the six-factor entry gate and the exit trial (TP +20% full sell, stop to breakeven at +10%, F6 8-minute time stop, -10% stop).
- **Run 1** (2026-11-18 to 2026-11-22, 101 trades, older rules) is archived read-only under `archive/run1/`.
- All times are ISO 8601 in **America/New_York** with an explicit offset, e.g. `2026-11-22T23:44:12-05:00`. Money is USD. `*_pct` fields are percent points (`20.0` = +20%). Prices are USD per token and can be tiny, e.g. `3.6562e-05`, so format them with `toPrecision`.
- Any field can be `null` when unknown. Treat unknown fields as optional; new fields may be added (the `schema_version` in `meta.json` changes only for breaking changes).

## Where the data lives

| Source | URL | Freshness | Limits |
|---|---|---|---|
| **A. Latest commit by SHA (recommended)** | 1) `GET https://api.github.com/repos/geo302/memecoin-live/commits/live-data` with header `Accept: application/vnd.github.sha` returns the SHA as plain text. 2) `GET https://raw.githubusercontent.com/geo302/memecoin-live/<sha>/data/status.json` | 30-90 s | API: 60 requests/hour per visitor IP unauthenticated, response cached 60 s. Poll the SHA every 60-75 s; send `If-None-Match` with the last `ETag` (304s do not count). Raw-by-SHA files are unlimited and never stale. |
| **B. Branch raw (fallback)** | `https://raw.githubusercontent.com/geo302/memecoin-live/live-data/data/status.json` | up to 5 min | CDN cache `max-age=300`; query strings do **not** bust it. |
| **C. live_url (optional)** | `meta.json -> live_url` + `/data/status.json` | ~3 s | Read-only server on Rio's box behind a public tunnel. **Currently `null`**: the box's network blocks the Cloudflare tunnel. If it ever becomes non-null, poll it every 5-15 s and fall back to A/B on any error. It serves only the files listed below (GET, CORS `*`, `no-store`). |

All sources send `Access-Control-Allow-Origin: *`.

The `live-data` branch is **one force-pushed commit**, rewritten about every 30 s by the publisher (only when the data changed, plus a heartbeat every 5 min). Never commit to it, never base work on it. The dashboard code lives on `main`.

Files on `live-data`:

```
data/meta.json        data/status.json      data/positions.json   data/trades.json
data/equity.json      data/scout.json       data/prices.json      data/feed.json
data/rules.json       journal.xlsx          archive/run1/summary.json   archive/run1/trades.json
README.md
```

Source cadence on the box: the position watcher re-prices open trades about every 3 s; the scanner finishes a full scan about every 12-15 s; the publisher rebuilds these files every 3 s and pushes to GitHub every ~30 s; `journal.xlsx` is refreshed at most every 10 min.

---

## data/meta.json

| Field | Type | Example | Meaning |
|---|---|---|---|
| schema_version | int | `1` | Bumped only on breaking changes. |
| paper_trading | bool | `true` | Always true. |
| run_number | int | `2` | Current run. |
| run_start | ISO | `"2026-11-22T23:23:52-05:00"` | Run start. |
| starting_capital_usd | number | `1000.0` | Starting paper capital. |
| last_update | ISO | `"2026-11-22T23:45:01-05:00"` | When these files were built. Use for the stale warning (stale if older than ~2 min on source A, ~6 min on source B). |
| live_url | string\|null | `null` | Base URL of the live server (source C). |
| github_fallback_base | string | `"https://raw.githubusercontent.com/geo302/memecoin-live/live-data"` | Source B base. |
| latest_sha_api | string | `"https://api.github.com/repos/geo302/memecoin-live/commits/live-data"` | Source A step 1. |
| raw_by_sha_template | string | `"https://raw.githubusercontent.com/geo302/memecoin-live/{sha}/{path}"` | Source A step 2. |
| files | string[] | `["data/meta.json", ...]` | Every published path. |
| publisher | object | `{"build_every_s":3,"push_every_s":30,"last_push":"2026-11-22T23:45:00-05:00","last_push_seconds":2.7,"pushes_since_start":12,"avg_push_interval_s":30.4,"last_error":null}` | Publisher health. |
| timezone | string | `"America/New_York"` | |

## data/status.json (header KPIs)

| Field | Type | Example | Meaning |
|---|---|---|---|
| paper_trading | bool | `true` | |
| run_number, run_start | | `2`, ISO | |
| starting_capital_usd | number | `1000.0` | |
| equity_usd | number | `1012.37` | cash + market value of open positions. |
| cash_usd | number | `962.37` | |
| open_positions_value_usd | number | `50.0` | |
| total_pnl_usd / total_return_pct | number | `12.37` / `1.237` | vs starting capital. |
| realized_pnl_usd / unrealized_pnl_usd | number | `10.1` / `2.27` | |
| closed_trades / open_trades | int | `7` / `1` | |
| wins / losses | int | `4` / `3` | A win is `pnl_usd > 0`. |
| win_rate_pct | number\|null | `57.14` | |
| avg_win_pct / avg_loss_pct | number\|null | `19.1` / `-9.4` | |
| best_trade / worst_trade | object\|null | `{"id":3,"symbol":"VDINO","pnl_usd":9.5,"pnl_pct":19.0}` | |
| exit_type_breakdown | object | `{"TP":{"count":3,"wins":3,"pnl_usd":28.4,"avg_pnl_pct":18.9,"avg_gap_vs_trigger_pct":0.7}, "BREAKEVEN":{...}, "STOP":{...}, "F6_TIME":{...}}` | Per exit type (see `exit_type` below). For judging the TP +20% / breakeven +10% trial. |
| avg_stop_gap_pct | number\|null | `-6.2` | Average % by which STOP/BREAKEVEN exits printed below their trigger (gap slippage). |
| halted / halt_reason / halt_equity_usd | bool / string\|null / number | `false` / `null` / `500.0` | New entries stop at or below $500 equity. |
| exit_trial | object | `{"id":"exit_trial_v1","start":"...","note":"..."}` | The running exit-rule trial. |
| watcher_last_update | ISO | | Last position-watcher cycle (~3 s cadence). |
| price_fetch_ok | bool | `true` | Watcher could price positions. |
| watcher_note | string\|null | | |
| scanner_last_round | ISO | | Last completed scan. |
| scanner_last_round_seconds | number | `2.4` | Duration of the last scan. |
| scanner_rounds_last_10min | int | `44` | Scans completed in the last 10 min. |
| scanner_rate_limit_429s_last_round | string | `"{}"` | HTTP 429s by host in the last scan. |
| ledger_last_run | ISO | | Last ledger write by the scanner. |
| last_update | ISO | | Build time. |

## Trade object (used by positions.json, trades.json, archive/run1/trades.json)

Common fields:

| Field | Type | Example | Meaning |
|---|---|---|---|
| run | int | `2` | |
| id | int | `0` | Trade number within the run (run 2 starts at #0). |
| status | `"open"`\|`"closed"` | `"closed"` | |
| name / symbol | string | `"Venice Dino"` / `"VDINO"` | Same ticker can be a different coin (copycats); key on `address`. |
| address | string | `"0xfc00...19cD"` | Token contract (Base). |
| pair_address | string | | Pool address. |
| dexscreener_url | string | `"https://dexscreener.com/base/0x6f64..."` | Chart link. |
| setup | string | `"winner_pattern|pattern"` | Strategy tag. |
| source | string | `"GeckoTerminal new pools"` | Where the scanner found it. |
| exit_rules | string\|null | `"exit_trial_v1"` | |
| entry_time | ISO | `"2026-11-22T18:54:37-05:00"` | |
| entry_price | number | `7.29927e-05` | Fill price incl. 1% simulated slippage+fees. |
| market_price_at_entry | number | `7.227e-05` | Market quote used. |
| scout_price / requote_move_pct / entry_quote_time | number / number / ISO | | Scanner quote, % move on the pre-buy re-quote, quote time. |
| usd_in / tokens | number | `50.0` / `685000.1` | Paper dollars in, tokens bought. |
| mc_at_entry / liquidity_at_entry | number | `72275` / `46997.36` | |
| entry_score | number | `14.3` | Scanner score at entry. |
| entry_m5_pct / entry_h1_pct | number | `126.0` / `458.0` | 5-minute / 1-hour price change at entry. |
| entry_vol1h_liq | number | `1.06` | 1h volume / liquidity. |
| entry_buys_1h / entry_sells_1h / entry_buy_sell_ratio | int / int / number | `106` / `50` / `2.12` | |
| entry_age_h | number | `0.6` | Pool age in hours. |
| checks | object\|null | `{"F1":{"pass":true,"detail":"5m +75.6% (need +50..+185)"},"F2":{...},...,"F6":{...}}` | The six entry checks, parsed from the bot's gate string. `null` for run 1. |
| checks_all_pass | bool\|null | `true` | |
| initial_stop_price | number | `6.569e-05` | Original -10% stop. |
| stop_loss_price | number | `7.445e-05` | Current stop (moves to breakeven = entry +2% once armed). |
| take_profit_price | number | `8.759e-05` | +20% target (run 1: +25%). |
| breakeven_arm_pct / breakeven_stop_pct / breakeven_arm_price | number | `10` / `2` / `8.03e-05` | Price that arms breakeven. |
| breakeven_armed_at | ISO\|null | | When the stop moved to breakeven. |
| f6_minutes / f6_min_peak_pct / f6_deadline | number / number / ISO | `8` / `10` / ISO | F6: sold if peak has not reached +10% by the deadline. |
| peak_price / low_price / peak_pct / max_drawdown_pct | number | | Extremes seen while held (`max_drawdown_pct` is from peak). |
| frozen_price_flag | bool | `false` | Price never changed: possibly untradeable. |
| thesis | string | `"winner_pattern: 1h +458% 5m +126% ... GATE ALL PASS: F1 PASS ..."` | Why it was bought. |
| raw | object | | Every original ledger field, unmodified. |

Open-only (positions.json):

| Field | Type | Meaning |
|---|---|---|
| current_price / current_value_usd | number | Latest mark. |
| unrealized_pnl_usd / unrealized_pnl_pct | number | Before exit slippage. |
| distance_to_stop_pct / distance_to_tp_pct | number | % from current price to stop (negative) and to target (positive). |
| liquidity_usd | number | Latest pool liquidity. |
| last_checked / last_price_change_at | ISO | |
| held_seconds | int | |

Closed-only (trades.json):

| Field | Type | Example | Meaning |
|---|---|---|---|
| exit_time | ISO | | |
| exit_price | number | `4.67577e-05` | Fill after 1% slippage. |
| market_price_at_exit | number | `4.723e-05` | Price that triggered the exit. |
| usd_out / pnl_usd / pnl_pct | number | `2.52` / `-1.42` / `-35.9` | |
| result | `"Win"`\|`"Loss"` | | |
| hold_time / hold_seconds | string / int | `"0m 50s"` / `50` | |
| exit_type | string | `"STOP"` | `TP` take-profit, `BREAKEVEN` breakeven stop, `STOP` -10% stop, `F6_TIME` 8-min time stop, `LIQUIDITY` liquidity collapse, `TRAIL` trailing stop (run 1), `RESET` run-1 reset close, `DISCRETIONARY` manual (run 1), `OTHER`. |
| exit_reason | string | `"Stop-loss hit (price 4.723e-05 <= stop 6.569e-05)"` | |
| entry_slippage_pct / exit_slippage_pct | number | `1.0` / `-1.0` | Simulated fee/slippage. |
| exit_trigger_price | number\|null | | Stop or target level that fired. |
| exit_gap_vs_trigger_pct | number\|null | `-28.1` | How far the exit print was beyond the trigger (gap risk). |
| reset_close | bool | | |
| mistake / lesson / lesson_source | string | | Written for every closed trade. |

### data/positions.json
`{"run":2,"updated":ISO,"count":1,"positions":[<open trade>]}`

### data/trades.json
`{"run":2,"updated":ISO,"count":7,"trades":[<closed trade>, ...]}` (oldest first).

## data/equity.json

```json
{"run":2,"starting_capital_usd":1000.0,
 "points":[{"t":"2026-11-22T23:38:27-05:00","equity":1000.0,"cash":1000.0,"open_value":0.0,"realized_pnl":0.0,"n_open":0}],
 "realized_steps":[{"t":"2026-11-22T23:23:52-05:00","equity_realized":1000.0,"trade_id":null},
                   {"t":"2026-11-23T00:10:05-05:00","equity_realized":1009.5,"trade_id":0,"pnl_usd":9.5}]}
```
`points` is the live mark-to-market curve (sampled when equity changes, at most every 10 s, and at least every 60 s). `realized_steps` steps only at each close.

## data/prices.json (charts of every coin entered)

```json
{"run":2,"updated":ISO,"trades":[
 {"id":0,"symbol":"VDINO","name":"Venice Dino","address":"0x...","status":"closed","dexscreener_url":"...",
  "entry_time":ISO,"entry_price":3.6562e-05,"exit_time":ISO,"exit_price":6.55e-05,"exit_type":"TP",
  "usd_in":50.0,"tokens":1367540.1,"initial_stop_price":3.29e-05,"stop_loss_price":3.73e-05,"take_profit_price":4.39e-05,
  "breakeven_arm_price":4.02e-05,"breakeven_armed_at":ISO,"f6_deadline":ISO,"result":"Win","pnl_usd":9.5,"pnl_pct":19.0,
  "points":[{"t":ISO,"price":3.62e-05,"stop":3.29e-05,"tp":4.39e-05,"pnl_pct":0.0,"pnl_usd":0.0,"liq":29800,"event":"ENTRY"},
            {"t":ISO,"price":4.05e-05,"stop":3.73e-05,"tp":4.39e-05,"pnl_pct":10.8,"pnl_usd":5.4,"liq":31000,"event":"BREAKEVEN_ARMED"},
            {"t":ISO,"price":4.41e-05,"stop":3.73e-05,"tp":4.39e-05,"pnl_pct":19.0,"pnl_usd":9.5,"liq":31500,"event":"EXIT"}]}]}
```
One point per watcher price check (~3 s) while open; `stop` shows the stop moving to breakeven. `event` is `ENTRY`, `BREAKEVEN_ARMED`, `EXIT` or `null`. Up to 5,000 points per trade (older points thinned). The `pnl_*` on the EXIT point is the booked P&L after slippage.

## data/scout.json (price board: latest scan)

```json
{"scan_time":ISO,"sources":{"GeckoTerminal new pools":40,"GeckoTerminal trending":40,"DexScreener search":69},
 "count":111,"buys":0,"rows":[ <row> ]}
```

Row fields: `symbol`, `name`, `address`, `pair_address`, `dexscreener_url`, `source`, `price`, `mc` (market cap), `fdv`, `liq` (liquidity USD), `vol_24h`, `vol_1h`, `vol1h_liq`, `chg_5m`, `chg_1h`, `chg_6h`, `chg_24h` (percent), `buys_5m`, `sells_5m`, `buys_1h`, `sells_1h`, `buys_24h`, `sells_24h`, `buy_sell_ratio_1h`, `age_h` (null = unknown/old), `honeypot` (`"not checked"`, `"ok"`, ...), `hard_filtered` (true = excluded before scoring, e.g. major/stable coin), `setup` (`winner_pattern`, `weak_drift`, ...), `score`, `fdv_liq`, `checks` (F1-F6 like the trade object; absent for hard-filtered rows), `checks_all_pass`, `decision` (`"Buy"`/`"Pass"`), `reason` (full text), `trade_ids` (run-2 trade ids on this contract).

Example row:
```json
{"symbol":"NVDAc","name":"NVIDIA Corporation","address":"0xb200...108C","price":133.91,"mc":8813514,"liq":1694850.17,
 "vol_1h":1031188.45,"vol1h_liq":0.608,"chg_5m":-0.05,"chg_1h":-0.68,"chg_24h":3.25,"buys_1h":351,"sells_1h":411,
 "buy_sell_ratio_1h":0.85,"setup":"weak_drift","score":-2.76,
 "checks":{"F1":{"pass":false,"detail":"5m -0.05% (need +50..+185)"},"F3":{"pass":true,"detail":"liq $1,694,850 (need >=$26k)"}},
 "checks_all_pass":false,"decision":"Pass","reason":"Pass: winner_pattern unmet: ...","trade_ids":[]}
```

## data/feed.json (live log)

`{"updated":ISO,"count":300,"lines":[{"t":ISO,"type":"SCOUT","text":"LAPTOP $1.175e-06 mc $6,584 liq $12,607 5m +9.04% ... -> Pass: ..."}]}`

The latest ~300 lines, oldest first. `type` is the first word: `SCOUT`, `BUY`, `EXIT`, `BREAKEVEN`, `LESSON`, `WATCHER`, ... (`RAW` if unparsed).

## data/rules.json

`entry_gates` (F1-F6 with `rule` text and thresholds), `exits` (`take_profit_pct` 20, `stop_loss_pct` -10, `breakeven_arm_pct` 10, `breakeven_stop_pct` 2, `f6_minutes` 8, `f6_min_peak_pct` 10, `liquidity_exit`), `extra_entry_filters` (`min_score`, `min_liquidity_usd`, `reentry_block_after_tp_h`, `requote_max_move_pct`), `sizing`, `halt`, `exit_trial`, `live_rules_text` (the bot's full rule list as written), `assumptions`.

## journal.xlsx
The bot's full Excel journal for run 2 (trades, mistakes and lessons). Link it as a download.

## archive/run1/summary.json and archive/run1/trades.json (read-only)
`summary.json`: `start`, `end`, `starting_active_bankroll_usd` (100), `reserve_usd` (900), `final_equity_usd`, `realized_pnl_usd`, `closed_trades` (101), `wins`, `losses`, `win_rate_pct`, `winner_pattern` {trades, wins, pnl_usd}, `best_trade`, `worst_trade`, `exit_type_breakdown`, `realized_steps` (equity curve by close), `readme_markdown` (the human-written run summary), `note`.
`trades.json`: `{"run":1,"count":101,"trades":[<closed trade>]}`. Run 1 has no `checks`, no breakeven/F6 fields and no per-tick price history.

## New data (added 2026-11-23): F7 contract safety, near misses, smart wallets, Obsidian vault

All of it is on the `live-data` branch and refreshed with every push (about every 30s). It is still PAPER trading only.

### F7 fields (contract safety, a hard entry gate)
F7 checks GoPlus `token_security` on Base (chain 8453) plus the honeypot.is sell simulation. It fails on any of: honeypot or cannot sell, buy or sell tax > 10%, owner can mint/pause/blacklist/change balances (unless renounced), hidden owner, self-destruct, or top-10 holders excluding LP/pool/burn > 40%. LP lock/burn (`lp_locked_or_burned_pct`, `lp_holders`, `lp_lock_note`) is logged as info only, not a gate (dropped 2026-11-23 07:40 ET). An API error, a timeout or an unindexed token gives `UNKNOWN`, which blocks the buy (fail closed).
- `data/scout.json` rows:
  - `f7_status`: `PASS` | `FAIL` | `UNKNOWN` | `SKIP`. `SKIP` means not checked, because F7 only runs when every other check passes or exactly one fails.
  - `f7_text`: a one-line summary.
  - `f7_fields`: every field fetched, or null when skipped.
  - `checks`: now has `F1`-`F5`, `F6`, `F7`, `b` and `WP`, each `{pass, status, detail, value, threshold, diff, diff_pct}`.
  - `failed_checks`: list of failed check ids.
  - `n_failed_checks`, `near_miss_id`.
  - `smart_wallet_count`, `smart_wallets`.
- `data/positions.json` / `data/trades.json` (run 2) trade records add:
  - `f7_status`, `f7_text`, `f7_reasons`, `f7_checked_at`
  - `f7_fields` (taxes, owner flags, `top10_excl_lp_burn_pct`, `lp_locked_or_burned_pct`, `holders_top`, `lp_holders`, `dex`, honeypot.is results, `not_reported`, ...)
  - `entry_checks` (per-check results at entry)
  - `smart_wallet_count`, `smart_wallets`
- `data/status.json` adds `f7_last_round` (`{t, text}` of the last scout round's F7 summary), `near_misses_total`, `near_misses_tracking`, `near_misses_done`, `smart_wallets_known_good` and `smart_wallets_coins_tracked`.
- `data/rules.json`: `entry_gates` now includes `F7` (`max_tax_pct` 10, `max_top10_pct` 40, `min_lp_locked_pct` null, `lp_lock` "info only, not a gate", `fail_closed` true). New `near_misses` and `smart_wallets` blocks.
- `data/feed.json` line types: `F7` (per-round summary), `NEARMISS` (new near miss / 30-minute result), `SMARTWALLET` (known-good wallets bought a tracked coin; log only).

### data/near_misses.json
A near miss is a scouted coin that failed exactly ONE entry check: F1-F5, F7, `b` (score >= 12) or `WP` (winner_pattern age/1h/buys). Filter (c) sits inside F3 and filter (a) inside F5. Near misses are never traded.
```
{"updated":ISO,"paper_only":true,"never_traded":true,"definition":"...",
 "summary":{"total":N,"tracking":N,"done":N},
 "stats_by_failed_check":[{"check":"F2","name":"...","count":N,"tracking":N,"done":N,"hyp_wins":N,"hyp_win_rate_pct":x,
                           "tp_before_sl":N,"tp_before_sl_rate_pct":x,"avg_hyp_pnl_pct":x,"avg_max_gain_pct":x,"avg_max_drawdown_pct":x,"avg_chg_30m_pct":x}],
 "count":N,
 "items":[{"id":"NM-0001","detected_at":ISO,"symbol":"..","name":"..","address":"0x..","pair_address":"..","dexscreener_url":"..",
           "failed_check":"F7","failed_check_name":"..","failed_detail":"..","margin":{"value":x,"threshold":x,"diff":x,"diff_pct":x},
           "checks":{"F1":{"pass":true,"detail":".."},...},"f7":{"status":"FAIL","text":"..","reasons":[..],"fields":{..}},
           "smart_wallet_count":n|null,"snapshot":{"price":x,"liq":x,"mc":x,"m5":x,"h1":x,"vol1h_liq":x,"buys_1h":n,"sells_1h":n,"age_h":x,"score":x,...},
           "seen_count":n,"last_seen":ISO,
           "tracking":{"status":"tracking|done","start_price":x,"hyp_entry_price":x,"tp_price":x,"sl_price":x,"last_price":x,
                       "max_gain_pct":x,"max_drawdown_pct":x,"chg_30m_pct":x|null,"first_touch":"TP|SL|neither|null","tp_before_sl":bool|null,
                       "sim":{"exit":"TP|STOP|BREAKEVEN|F6_TIME|TIME_30M","exit_sec":s,"exit_price":x,"pnl_pct":x,"win":bool},
                       "hypothetical_outcome":"WIN|LOSS","points":[[sec,price],...]}}]}
```
- The hypothetical entry is the detection price +1%.
- `sim` applies our live exit rules to the polled prices (about every 15s): TP +20% full, breakeven entry+2% after +10%, -10% stop, F6 at 8 min, 1% exit fee.
- The same data is in `near_misses.csv` in the bot folder and in the journal's `Near Misses` sheet.

### data/smart_wallets.json (LOG ONLY)
Never used to block or allow a trade.
```
{"updated":ISO,"log_only":true,"params":{"hit_rule":"..","known_good_rule":"..",...},
 "stats":{"coins_tracked":N,"wallets_scored":N,"wallets_with_hits":N,"known_good":N,"flags":N},
 "wallets_top":[{"wallet":"0x..","n_coins":n,"hits":n,"hit_rate":x,"known_good":bool,"last_buy":ISO,"coins":[{"address","symbol","hit","max_gain_pct"}]}],
 "coins":{"0x<token>":{"symbol":"..","pair":"..","why":[..],"buyers_tracked":n,"smart_wallet_count":n,"smart_wallets":[..],
                       "early_buyers":[{"wallet","t","price","usd","max_gain_pct"}],"max_price":x,"last_price":x,"updated":ISO}},
 "flags":[{"t":ISO,"address":"0x..","symbol":"..","wallets":[..],"why":[..]}]}
```
- Buyers come from GeckoTerminal pool trades (buys >= $20).
- A hit means the coin later traded >= +50% above that wallet's buy.
- Known-good means >= 2 hits and a >= 40% hit rate, counted on the wallet's other coins.

### Obsidian vault: `vault/` folder and `vault.zip`
- The vault has one note per trade (run 2 and the run 1 archive) with YAML frontmatter: trade, run, symbol, contract, result, pnl, exit_type, `check_F1`..`check_F7`/`check_b`/`check_c`, F7 fields and smart_wallet_count.
- There are also coin notes, `Exit <type>` notes, `Lesson - <topic>` notes, `Rule F1`..`Rule F7`/`Rule a|b|c|WP` notes, `NM-xxxx` near-miss notes, `Smart Wallets` and MOC notes, plus a `00 Index` home.
- Download `vault.zip`, unzip it, and open the `memecoin-vault` folder in Obsidian. `.obsidian/graph.json` colors the graph: green = win, red = loss, yellow = open, blue = near miss.
