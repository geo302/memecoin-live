# Prompt for Claude Code: build the memecoin-live dashboard

Copy everything below the line into Claude Code, run from a clone of https://github.com/geo302/memecoin-live (branch `main`).

---

You are building a live dashboard for my **paper (simulated) Base meme coin trading bot** ("Rio"). Work in this repo, `geo302/memecoin-live`, on the `main` branch. It must be a **static site** (no backend, no build server required at runtime) deployed on **GitHub Pages from `main` / root**. The site URL will be https://geo302.github.io/memecoin-live/ (Settings > Pages > Deploy from a branch: `main`, `/ (root)`). If Pages is not enabled yet, enable it with `gh api -X POST repos/geo302/memecoin-live/pages -f 'source[branch]=main' -f 'source[path]=/'` if you have admin rights, otherwise tell me to turn it on in Settings > Pages.

## Read these first
1. `docs/DATA_SCHEMA.md`: every data file and field, with examples. Treat it as the contract. Fields can be `null`; new fields may appear.
2. `design/1-coin-node-map.png`, `design/2-price-board.png`, `design/3-live-charts.png`: the look I want. Open and study all three before writing code.
3. `README.md`.

## Hard rules
- **Never modify, commit to, rebase, or delete the `live-data` branch, and never create or edit a `data/` folder on `main`.** The bot force-pushes `live-data` every ~30 s. The dashboard only reads it.
- Do not change or remove `docs/DATA_SCHEMA.md`, `design/` or `CLAUDE_PROMPT.md`. You may replace the placeholder `index.html`.
- No secrets, tokens, analytics or trackers. Everything is public, paper-only data. Label the site clearly "PAPER TRADING - simulated, no real money".
- Plain static files: `index.html` + `assets/` (JS/CSS). Vanilla JS modules are fine. Vendor any libraries into `assets/vendor/` (pinned versions) or load them from a pinned CDN URL. Suggested: Apache ECharts or Lightweight Charts (TradingView) for charts, d3-force (or ECharts graph with force layout) for the node map. No framework build step unless you commit the built output and Pages serves it from root.
- Add an empty `.nojekyll` (already present; keep it).

## Data loading (must implement exactly this fallback chain)
Write `assets/data.js` exposing `loadAll()` that returns all files plus `{source, sha, fetchedAt}`:
1. **live_url (fastest, optional):** after the first successful load, read `meta.live_url`. If it is a non-null string, fetch `${live_url}/data/<file>.json` with `cache:'no-store'` and a 5 s timeout. Poll every **5-15 s** (default 10 s) while it works. On any error, fall back to step 2 and retry live_url every 60 s. (It is currently `null` because the bot's network blocks the tunnel, so steps 2-3 are the normal path. Keep the code anyway.)
2. **Latest commit by SHA (normal path):** `GET https://api.github.com/repos/geo302/memecoin-live/commits/live-data` with header `Accept: application/vnd.github.sha` returns the SHA as plain text. Then fetch files from `https://raw.githubusercontent.com/geo302/memecoin-live/<sha>/<path>` (never stale). Poll the SHA every **75 s** (the API allows only 60 unauthenticated requests per hour per visitor and caches 60 s). Send `If-None-Match` with the previous `ETag`; a 304 means nothing changed and does not count against the limit. Read `X-RateLimit-Remaining` / `X-RateLimit-Reset`; if remaining < 5 or you get 403/429, stop calling the API until the reset time and use step 3. Only re-download files when the SHA changed.
3. **Branch fallback:** `https://raw.githubusercontent.com/geo302/memecoin-live/live-data/<path>` (CDN-cached up to 5 min; query strings do not bust it).
- Files: `data/meta.json`, `status.json`, `positions.json`, `trades.json`, `equity.json`, `scout.json`, `prices.json`, `feed.json`, `rules.json`, plus `journal.xlsx`, `archive/run1/summary.json`, `archive/run1/trades.json` (archive loaded lazily when its tab opens).
- Between data refreshes, keep the UI ticking: "updated Xs ago" counters, open-position hold timers, and the F6 8-minute countdown.
- **Stale warning:** show a red STALE banner when `meta.last_update` is older than 2 min (3 min on the SHA path, 6 min on branch fallback), or if `status.watcher_last_update` is older than 2 min. Always show which source is active (LIVE / GITHUB SHA / GITHUB CACHE) and the SHA's first 7 characters.
- Never crash on missing fields, empty arrays (run 2 may have zero trades) or `null`s. Show friendly empty states ("No trades yet in run 2 - scanner is running", with the latest scan stats).
- Prices are tiny (`3.6562e-05`): format with significant digits, e.g. `0.0000365620` or subscript-zero notation `0.0₄3656`. Money as `$1,012.37`. All times shown in **America/New_York** with an "ET" label.

## Layout and design
Overall: black background (#000 / #05070d), monospace UI font (e.g. "IBM Plex Mono", "JetBrains Mono", Menlo), dense terminal feel. Top bar like a Bloomberg terminal: orange (#ff8c00 / #fb8b1e) bar with black text and function-key style tabs. Green #00d26a = up/win, red #ff3b3b = down/loss, yellow #ffd400 = live/open/highlight, amber #ffb000 labels. Thin 1px grid lines (#1a2233). Tabs (also usable as one long scrolling page on mobile): **MAP · BOARD · CHARTS · TRADES · FEED · RULES · RUN 1**.

### Header KPIs (always visible)
From `status.json`: equity vs $1,000 start, total P&L $ and % (green/red), cash, open position value, realized / unrealized P&L, win rate (W/L counts), closed and open trade counts, best and worst trade, halted flag (big red banner if `halted`), scanner health (`scanner_last_round`, `scanner_rounds_last_10min`), last updated + data source + STALE banner, and an **Excel download** button linking to `journal.xlsx` (from live_url if active, else raw-by-SHA URL).

### 1) MAP: Obsidian-style force-directed node map of EVERY coin entered (match `design/1-coin-node-map.png`)
- Pure black canvas, a dark force-directed graph with small circular nodes, thin grey edges, soft glow, pan/zoom/drag, nodes gently settling like Obsidian's graph view. Render with canvas/WebGL so it stays smooth.
- One node per trade in `positions.json` + `trades.json` (run 2). Toggle to include run-1 trades (from `archive/run1/trades.json`) in dimmer colors.
- Label each node with the coin **name/symbol**, a **colored dot next to the name** (red = lost, yellow = live/open, green = won), and the **trade # to the right of the name**, e.g. `● VDINO  #3`. Labels in light grey like the reference. Node size scales with |P&L $| (minimum size for open trades); open trades pulse yellow.
- Edges: link trades on the same ticker or contract (copycats) and consecutive trades in time; add small hub nodes for exit types (TP, BREAKEVEN, STOP, F6_TIME) and for setup/source so clusters form, like the purple/grey hubs in the reference.
- **Click a node** to open a side panel with the full trade detail: entry/exit times and prices, $ in/out, P&L $/%, hold time, exit type + reason, slippage and `exit_gap_vs_trigger_pct`, score, liquidity, 5m/1h change, vol/liq, buys/sells, all six checks F1-F6 as pass/fail chips with their detail text, thesis, mistake, lesson, a mini price chart from `prices.json`, and a DexScreener link.
- Legend and a search box (type a symbol to highlight it).

### 2) BOARD: Bloomberg-terminal price board (match `design/2-price-board.png`)
- Navy/black background, orange and red section header bars, yellow highlights, dense multi-column grids in small monospace text, numbers right-aligned, up green / down red, flashing cell background for ~1 s when a value changes between refreshes.
- Sections: **OPEN POSITIONS** (from positions.json: symbol, #, entry, last, P&L $/%, distance to stop and to TP, stop (shows BE when armed), TP, F6 countdown, liq, held), **RECENT EXITS** (last 10 closed), and **SCANNER** (all rows from `scout.json`: symbol, price, chg 5m/1h/6h/24h, mc, liq, vol 1h, vol1h/liq, buys/sells 1h, age, score, setup, F1-F6 as six tiny green/red squares, decision, with full reason on hover/tap). Sortable columns; filters: "gate passes only", "hide hard-filtered", text search. Rows with `trade_ids` link to that trade.
- A ticker tape strip across the top scrolling the top movers from the scan.

### 3) CHARTS: Bloomberg-style live multi-panel charts (match `design/3-live-charts.png`)
- Black background, orange toolbar with a coin selector (every coin entered, newest first, open ones on top with a yellow dot), timeframe buttons (ALL, 15m, 5m, 1m around entry), and a small-multiples grid view showing every entered coin at once.
- Main panel per coin from `prices.json`: price line (white/cyan), **horizontal lines** for entry (white dashed), **stop-loss** (red; draw it as a step line from the `stop` field of each point so you can see it move up to **breakeven** when armed, with a "BE" marker at `breakeven_armed_at`), **take-profit** (green), the breakeven arm level (+10%, yellow dotted) and the F6 deadline (vertical grey line). **Entry and exit markers** (triangles), exit labeled with `exit_type` and P&L. A live P&L readout in the corner (yellow while open, green/red when closed). Optional Bollinger bands (20-point) on the price line like the reference.
- Lower panels: unrealized P&L % over time (green above 0, red below) and pool liquidity (`liq`).
- **Equity curve** panel: `equity.json.points` (mark-to-market) plus `realized_steps` as a step line, with a $1,000 baseline and markers at each trade close. Also a P&L-per-trade bar chart (green/red).
- Open positions update on every refresh without resetting zoom.

### Other sections
- **TRADES:** closed trades table (sortable, filterable by result/exit type/symbol): #, symbol, entry/exit time, entry/exit price, $ in/out, P&L $/%, hold, exit type, gap vs trigger, score, liq, checks; expandable rows with thesis, **mistake** and **lesson** text. CSV export of the table.
- **Exit-type breakdown for the trial** (TP +20% full sell / breakeven at +10% / F6 8-min / -10% stop): from `status.exit_type_breakdown`: count, win rate, total and average P&L per exit type, average stop gap, plus a donut chart. Show a side-by-side comparison with run 1 (`archive/run1/summary.json.exit_type_breakdown`).
- **FEED:** `feed.json` lines in a terminal-style log, newest at the top, colored by type (BUY green, EXIT white/red, BREAKEVEN yellow, LESSON cyan, SCOUT dim grey), with type filter chips and auto-scroll toggle.
- **RULES:** `rules.json`: the six entry gates F1-F6 with thresholds, exits, extra filters, sizing, halt level, exit trial note, and the full `live_rules_text` list.
- **RUN 1:** read-only archive view: summary KPIs, realized equity curve from `realized_steps`, exit-type breakdown, the trades table with mistakes/lessons, and `readme_markdown` rendered as text.

## Quality bar
- Mobile-friendly: on narrow screens tabs become a horizontal scroll bar, tables scroll horizontally with a sticky first column, charts stack, the node map stays touch-pannable.
- Fast: first paint under 2 s on mobile; don't re-render the node map from scratch on every poll (update node colors/sizes in place).
- Accessible contrast for text on black; numbers in tabular monospace.
- Handle `run_number` changing (a new run): reset charts and map.

## Deliverables
1. Replace `index.html` and add `assets/`. Commit to `main` with clear messages and push.
2. Confirm GitHub Pages serves it at https://geo302.github.io/memecoin-live/ (Settings > Pages: source `main`, `/ (root)`; enable it first if needed). Wait for the Pages build to finish and open the URL.
3. Test against the real data: it currently has run 2 with possibly zero trades, so also test with `archive/run1/trades.json` loaded into the map/table to check the full UI with 101 trades.
4. Tell me the URL and anything that didn't work. Do not touch `live-data` or any `data/` files.
