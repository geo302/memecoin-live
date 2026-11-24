# Prompt for Claude Code: build the memecoin-live dashboard

Copy everything below the line into Claude Code, run from a clone of https://github.com/geo302/memecoin-live (branch `main`).

---

You are building a live dashboard for my **paper (simulated) Base meme coin trading bot** ("Rio"), branded publicly as **`@whatscoinbase`**. Work in this repo, `geo302/memecoin-live`, on the `main` branch. It must be a **static site** (no backend, no build server required at runtime) deployed on **GitHub Pages from `main` / root**. The site URL will be https://geo302.github.io/memecoin-live/ (Settings > Pages > Deploy from a branch: `main`, `/ (root)`). If Pages is not enabled yet, enable it with `gh api -X POST repos/geo302/memecoin-live/pages -f 'source[branch]=main' -f 'source[path]=/'` if you have admin rights, otherwise tell me to turn it on in Settings > Pages.

## Read these first
1. `docs/DATA_SCHEMA.md`: every data file and field, with examples. Treat it as the contract. Fields can be `null`; new fields may appear.
2. `design/galaxy_vault_ref.png` and `design/trophy_card_ref.png`: the current Obsidian Galaxy look. Also study `design/1-coin-node-map.png`, `design/2-price-board.png`, `design/3-live-charts.png` as the older structural references (do **not** bring back their bright-orange / navy terminal styling).
3. `README.md`.

## Hard rules
- **Never modify, commit to, rebase, or delete the `live-data` branch, and never create or edit a `data/` folder on `main`.** The bot force-pushes `live-data` every ~30 s. The dashboard only reads it.
- Do not change or remove `docs/DATA_SCHEMA.md` or `design/`. Keep this prompt in sync when the dashboard surface changes; do not delete it. You may replace the placeholder `index.html`.
- No secrets, tokens, analytics or trackers. Everything is public, paper-only data. Label the site clearly "PAPER TRADING - simulated, no real money".
- Public brand is **`@whatscoinbase`**. Do not put a personal name or any previous personal handle or monogram anywhere in the dashboard UI, card labels, replay videos, or this prompt. The GitHub repo path `geo302/memecoin-live` in data-loading URLs and docs stays as-is because that is the actual repo URL. Card / replay mark: orbit monogram **`WC`**, handle **`@whatscoinbase`**, line **`RIO · WHATSCOINBASE`** or **`WHATSCOINBASE`**, plus a clear **`PAPER TRADING`** label. Trophy PNG filename prefix: `whatscoinbase-<day-or-ticker>-pnl.png`.
- Honesty labels are mandatory:
  - Rio's real paper-trade cards and replays must clearly display **`PAPER TRADING · SIMULATED`**.
  - What-If Lab big-mover replays must clearly display **`WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE`** (never disguised as a real executed trade).
- The What-If Lab is 100% separate and read-only — it never writes to Rio's ledger, vault, or counts, and must show a banner: **`SEPARATE WHAT-IF LAB · DOES NOT AFFECT RIO'S LIVE BOOK OR STATS`**.
- Plain static files: `index.html` + `assets/` (JS/CSS). Vanilla JS modules are fine. Vendor any libraries into `assets/vendor/` (pinned versions) or load them from a pinned CDN URL. Suggested: Apache ECharts or Lightweight Charts (TradingView) for charts, d3-force (or ECharts graph with force layout) for the node map. No framework build step unless you commit the built output and Pages serves it from root.
- Add an empty `.nojekyll` (already present; keep it).

## Data loading (must implement exactly this fallback chain)
Write `assets/data.js` exposing `loadAll()` that returns all files plus `{source, sha, fetchedAt}`:
1. **live_url (fastest, optional):** after the first successful load, read `meta.live_url`. If it is a non-null string, fetch `${live_url}/data/<file>.json` with `cache:'no-store'` and a 5 s timeout. Poll every **5-15 s** (default 10 s) while it works. On any error, fall back to step 2 and retry live_url every 60 s. (It is currently `null` because the bot's network blocks the tunnel, so steps 2-3 are the normal path. Keep the code anyway.)
2. **Latest commit by SHA (normal path):** `GET https://api.github.com/repos/geo302/memecoin-live/commits/live-data` with header `Accept: application/vnd.github.sha` returns the SHA as plain text. Then fetch files from `https://raw.githubusercontent.com/geo302/memecoin-live/<sha>/<path>` (never stale). Poll the SHA every **75 s** (the API allows only 60 unauthenticated requests per hour per visitor and caches 60 s). Send `If-None-Match` with the previous `ETag`; a 304 means nothing changed and does not count against the limit. Read `X-RateLimit-Remaining` / `X-RateLimit-Reset`; if remaining < 5 or you get 403/429, stop calling the API until the reset time and use step 3. Only re-download files when the SHA changed.
3. **Branch fallback:** `https://raw.githubusercontent.com/geo302/memecoin-live/live-data/<path>` (CDN-cached up to 5 min; query strings do not bust it).

Load every file listed in the schema (`meta.json`, `status.json`, `positions.json`, `trades.json`, `equity.json`, `scout.json`, `prices.json`, `feed.json`, `rules.json`, `near_misses.json`) on each poll. `smart_wallets.json` (~0.8 MB, log only) is loaded lazily via `loadExtra('smart_wallets')` when TRADES opens, cached per SHA. If a non-meta file 404s, keep the rest and treat that file as empty. Show a small "source" chip (LIVE / GITHUB SHA / GITHUB CACHE) and the SHA, plus "last updated" from `meta.last_update` / `status.watcher_last_update`. If data is older than 2 min (LIVE), 3 min (SHA) or 6 min (CACHE), show a **STALE DATA** banner. If `status.halted`, show a red HALTED banner with `halt_reason`.

**Demo mode:** `?demo=1` (optional `?speed=`; a new trade every 6 s ÷ speed, min 1 s, looping back to trade 1; demo uses its own $1,000 basis). Load `archive/run1/trades.json` as a canned feed: start from trade 1, drop a new "live" trade every few seconds, with simulated prices and a growing equity curve, clearly labelled DEMO so it is never mistaken for real data. Keep this even when live data is available.

## Look: Obsidian Galaxy on EVERY tab
- Void-black space canvas (`#000` / `#030407`) with a subtle starfield and soft monochrome nebula depth, thin hairline silver-white borders, frosted obsidian glass panels, clean typography (Inter / IBM Plex Mono), and **zero bright-orange / yellow AI-robotic terminal styling**.
- Accent is luminous silver-white. Reserve crisp emerald green and crimson red **strictly** for wins, losses, and P&L. Pulsing white for live open positions.
- Widen the top-bar Equity KPI pill so 5-figure `$10,000+` and `$100,000+` balances never clip or truncate.
- Keyboard: keys `1`–`9` switch tabs in order; `0` opens `≡ ALL`.

## The 10 tabs
Numbered `1)`–`9)` plus `0) ≡ ALL` (every section as one scrolling page).

### 1) MAP: orbital galaxy of EVERY coin entered (match `design/galaxy_vault_ref.png`)
- **Current implementation (`assets/map.js`):** a glowing white **RIO core** in the centre; concentric silver-white orbital rings on a tilted disk (TILT button toggles top-down); thousands of faint galaxy-dust particles concentrated along the rings; each trade is a luminous star on an orbit with a short fading orbital trail and a green (won) / red (lost) / pulsing white (open) halo. Orbits rotate slowly (Keplerian, inner faster; respects prefers-reduced-motion). Run-2 trades fill inner orbits (oldest innermost), run-1 trades (toggle) fill outer orbits after one empty orbit. Star size = |P&L $|. Same-coin links toggle. Hover = label + P&L; click = trade detail side panel. Drag pan, wheel/pinch zoom, FIT, search. The bullets below are the original spec; keep their data/detail requirements.
- One node per trade in `positions.json` + `trades.json` (run 2). Toggle to include run-1 trades (from `archive/run1/trades.json`) in dimmer colors.
- **Click a node** to open a side panel with the full trade detail: entry/exit times and prices, $ in/out, P&L $/%, hold time, exit type + reason, slippage and `exit_gap_vs_trigger_pct`, score, liquidity, 5m/1h change, vol/liq, buys/sells, all six checks F1-F6 as pass/fail chips with their detail text, thesis, mistake, lesson, a mini price chart from `prices.json`, a **▶ REPLAY** button, and a DexScreener link.
- Legend and a search box (type a symbol to highlight it).

### 2) BOARD: dense live price board (Obsidian Galaxy styling; `design/2-price-board.png` is the older layout reference only)
- Sections: **OPEN POSITIONS** (from positions.json: symbol, #, entry, last, P&L $/%, distance to stop and to TP, stop (shows BE when armed), TP, F6 countdown, liq, held), **RECENT EXITS** (last 10 closed), and **SCANNER** (all rows from `scout.json`: symbol, price, chg 5m/1h/6h/24h, mc, liq, vol 1h, vol1h/liq, buys/sells 1h, age, score, setup, F1-F6 as six tiny green/red squares, decision, with full reason on hover/tap). Sortable columns; filters: "gate passes only", "hide hard-filtered", text search. Rows with `trade_ids` link to that trade.
- A ticker tape strip across the top scrolling the top movers from the scan.
- BOARD also shows an F7 column (PASS/FAIL/UNKNOWN/SKIP), a near-miss marker (`◆ NM-xxxx`, else the number of failed checks) and the smart-wallet count (SW) on scanner rows and open positions.

### 3) CHARTS: live multi-panel charts (Obsidian Galaxy styling; `design/3-live-charts.png` is the older layout reference only)
- Coin selector (every coin entered, newest first, open ones on top with a white/yellow dot), timeframe buttons (ALL, 15m, 5m, 1m around entry), and a small-multiples grid view showing every entered coin at once.
- Main panel per coin from `prices.json`: price line, **horizontal lines** for entry (white dashed), **stop-loss** (red; draw it as a step line from the `stop` field of each point so you can see it move up to **breakeven** when armed, with a "BE" marker at `breakeven_armed_at`), **take-profit** (green), the breakeven arm level (+10%, dotted) and the F6 deadline (vertical grey line). **Entry and exit markers** (triangles), exit labeled with `exit_type` and P&L. A live P&L readout in the corner (white while open, green/red when closed). Optional Bollinger bands (20-point) on the price line.
- Lower panels: unrealized P&L % over time (green above 0, red below) and pool liquidity (`liq`).
- **Equity curve** panel: `equity.json.points` (mark-to-market) plus `realized_steps` as a step line, with the run's starting-capital baseline and markers at each trade close. Also a P&L-per-trade bar chart (green/red).
- Open positions update on every refresh without resetting zoom.

### Other sections
- **4) TRADES:** closed trades table (sortable, filterable by result/exit type/symbol): #, symbol, entry/exit time, entry/exit price, $ in/out, P&L $/%, hold, exit type, gap vs trigger, score, liq, checks; expandable rows with thesis, **mistake** and **lesson** text. CSV export of the table. Each trade's F7 status/reasons and smart_wallet_count, and the near-miss stats per failed check from `near_misses.json` plus a filterable near-miss list (hypothetical outcome, sim exit, max gain/DD, 30m) and a SMART WALLETS · LOG ONLY panel (stats, top wallets, recent flags).
- **Exit-type breakdown for the trial** (TP +20% full sell / breakeven at +10% / F6 8-min / -10% stop): from `status.exit_type_breakdown`: count, win rate, total and average P&L per exit type, average stop gap, plus a donut chart. Show a side-by-side comparison with run 1 (`archive/run1/summary.json.exit_type_breakdown`).
- **5) FEED:** `feed.json` lines in a terminal-style log, newest at the top, colored by type (BUY green, EXIT white/red, BREAKEVEN white/yellow, LESSON cyan, SCOUT dim grey, plus `F7`, `NEARMISS` and `SMARTWALLET` line types), with type filter chips and auto-scroll toggle. A `vault.zip` download link (also next to the Excel button in the header).
- **6) RULES:** `rules.json`: the six entry gates F1-F6 with thresholds, exits, extra filters, sizing, halt level, exit trial note, and the full `live_rules_text` list.
- **7) RUN 1:** read-only archive view: summary KPIs, realized equity curve from `realized_steps`, exit-type breakdown, the trades table with mistakes/lessons, and `readme_markdown` rendered as text.

### 8) CALENDAR + `@whatscoinbase` Trophy Room + Trade Replay (`assets/calendar.js`, `assets/replay.js`; card reference `design/trophy_card_ref.png`)
- **Black P&L calendar:** month selector (`‹ Nov 2026 ›` + LATEST), run toggle (RUN 2 LIVE / RUN 1 ARCHIVE / ALL), monthly summary (month P&L $ and % of start-of-month equity, return on deployed capital, green vs red days, trade win rate, best day). 7-column Sun–Sat obsidian grid. A day = closed trades bucketed by the **ET date of `exit_time`**. Days with trades glow **green** (P&L > 0) or **red** (< 0) and show date, day P&L $, day % on capital deployed (Σpnl ÷ Σusd_in), % of start-of-day account equity, and a pill `4 trades · 3W 1L`. Empty days stay dark slate. Today's date is a white pill.
- **Day Breakdown** (right column on desktop, below on mobile; defaults to the latest trading day): header with long date, P&L, deployed %, acct %; full trade list (symbol → detail panel, entry → exit ET, hold, $ in, $ out, P&L $/%, exit tag + reason, score, 5m %, liq, DexScreener link, **▶ REPLAY** and 🏆 CARD buttons).
- **Trophy Room card** (1200×675 `<canvas>`, what you see is what downloads): chips switch between the **DAY CARD** (date title, big green/red `+$259.31` banner, PNL deployed %, Account %, Invested, Position, Record W·L) and each **trade card** (ticker, `+$86.78` banner, PNL %, Invested `usd_in`, Position `usd_out`). Bottom-left: geometric orbit **`WC`** monogram + **`@whatscoinbase`** + `WHATSCOINBASE · PAPER TRADING` (always keep the paper label). Orbit logo + `RIO · WHATSCOINBASE` top-left. When a trade card is selected, a **▶ REPLAY** button plays that trade.
- **Backdrops** in `assets/trophy/` (original AI-generated dark anime art, no copyrighted characters, character on the right third so text sits on the dark left): `win-emerald.webp`, `trophy-gold.webp`, `galaxy-void.webp`, `battle-crimson.webp`, plus procedural "Stars". **Auto** = gold for green days, emerald for winning trades, crimson for losses. **Custom image:** UPLOAD (local file → data URL) or paste an image URL. URL loading: try CORS → `images.weserv.nl` CORS proxy → display-only (canvas tainted; show a message telling the user to save + upload to download). Choice is saved in `localStorage` (`whatscoinbase.trophy.v1`).
- **⬇ DOWNLOAD PNG** → `whatscoinbase-<day-or-ticker>-pnl.png` via `canvas.toBlob`.
- `?demo=1`: adds clearly labelled synthetic history days (green + red) so the month looks full; the card footer says DEMO DATA.

### Trade Replay (`assets/replay.js`)
A **▶ REPLAY** button on every trade in the Calendar Day Breakdown, the Trophy Room, and the Trade Detail panel opens a sleek dark Obsidian Galaxy Replay modal with an HTML5 `<canvas>` player:
- Aspect-ratio toggle: **9:16 (Vertical)** and **16:9 (Landscape)**.
- Play / Pause / Restart + Speed (`1x`, `2x`, `4x`) + **⬇ EXPORT VIDEO (.webm)** via `canvas.captureStream(30)` + `MediaRecorder`.
- Uses the trade's real 3-second ticks from `prices.json` (gracefully reconstructs a path from entry/exit prices if a run-1 trade has no tick series, and says so).
- Visual choreography (Obsidian Galaxy, crisp and realistic): void-black space with a subtle starfield; `@whatscoinbase` + orbit icon top-left; **`PAPER TRADING · SIMULATED`** badge top-right and as a persistent footer stamp; ticker + entry size & price header; entry flash (`ENTERED @ $0.0000…`) at t=0; live animated price line drawing tick-by-tick with a glowing head dot, entry dashed line, dynamic stop-loss step line (turns silver/green `BE +2% ARMED` when +10% hits), and TP (+20%) dashed line; big live `$ P&L` and `% P&L` counters ticking in sync with the actual price movement (emerald when >0, crimson when <0); final exit callout banner (e.g. `TP HIT · +27.71% · +$86.78`) held cleanly at the end.
- Dollar P&L must be computed from the trade's official `usd_in` (tick `pnl_usd` may be on an old size scale). At the exit, snap the banner to the official `pnl_usd` / `pnl_pct`.

### 9) WHAT-IF LAB (`assets/whatif.js`) — completely separate from Rio's book
- Tab label `9) WHAT-IF`; `≡ ALL` is `0)`.
- Explicit banner: **`SEPARATE WHAT-IF LAB · DOES NOT AFFECT RIO'S LIVE BOOK OR STATS`**.
- Fetches real Base big-mover tokens client-side from public DexScreener / GeckoTerminal APIs, with a graceful built-in sample fallback if the browser hits a CORS or rate-limit error.
- The user can filter for big runners (+50%, +80%+), pick any mover (or paste any Base token/pair address), choose a hypothetical entry point and a hypothetical size (e.g. $500 / $1,000 / $5,000), and play / export a **9:16 or 16:9 What-If Backtest Replay** of its real candle / price movement.
- Every What-If replay and readout is stamped **`WHAT-IF BACKTEST · HYPOTHETICAL · NOT AN ACTUAL TRADE`**. Nothing in this lab is written to Rio's ledger, vault, or counts.

## Quality bar
- Mobile-friendly: on narrow screens tabs become a horizontal scroll bar, tables scroll horizontally with a sticky first column, charts stack, the node map stays touch-pannable.
- Fast: first paint under 2 s on mobile; don't re-render the node map from scratch on every poll (update node colors/sizes in place).
- Accessible contrast for text on black; numbers in tabular monospace.
- Handle `run_number` changing (a new run): reset charts and map.
- Zero console errors in Chromium across every tab, including CALENDAR, the REPLAY modal, and WHAT-IF.

## Deliverables
1. Replace `index.html` and add `assets/`. Commit to `main` with clear messages and push.
2. Confirm GitHub Pages serves it at https://geo302.github.io/memecoin-live/ (Settings > Pages: source `main`, `/ (root)`; enable it first if needed). Wait for the Pages build to finish and open the URL.
3. Test against the real data: it currently has run 2 with possibly zero trades, so also test with `archive/run1/trades.json` loaded into the map/table to check the full UI with 101 trades.
4. Tell me the URL and anything that didn't work. Do not touch `live-data` or any `data/` files.

---
**New data available (2026-11-23):**
- `data/near_misses.json`
- `data/smart_wallets.json`
- F7 contract-safety fields (`f7_status`, `f7_text`, `f7_fields`, `checks.F7`) on scout rows and trades
- `vault.zip` / `vault/` (the Obsidian vault)

Field details are in `docs/DATA_SCHEMA.md` under "New data". Keep those fields wired into FEED, BOARD, and TRADES as already specified above, plus a `vault.zip` download link.
