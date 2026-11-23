# memecoin-live

Live dashboard data for **Rio's PAPER (simulated) Base meme coin trading**, run by Geovanie Joseph-Velasquez's assistant bot.

**Paper trading only.** No wallet, no real money, no keys. Nothing here is financial advice.

- `main`: the dashboard (static site on GitHub Pages), design references in `design/`, field docs in `docs/DATA_SCHEMA.md`, build brief in `CLAUDE_PROMPT.md`.
- `live-data`: machine-written data, one force-pushed commit refreshed about every 30 seconds. Do not edit.

Run 2 started 2026-11-22 23:23 ET with a fresh $1,000 paper account. Run 1 (Nov 18 to Nov 22) is archived under `archive/run1/` on `live-data`.

## Dashboard

Live at https://geo302.github.io/memecoin-live/ (GitHub Pages, `main` / root). Plain static files: `index.html` + `assets/` (vanilla JS modules, ECharts 5.5.1 vendored in `assets/vendor/`). No build step, no trackers, no secrets.

- Tabs: MAP (coin node graph) · BOARD (price board) · CHARTS · TRADES · FEED · RULES · RUN 1 · ALL (one scrolling page). Keys `1`-`8` switch tabs, `Esc` closes the detail panel.
- Data source chain (see `assets/data.js`): `meta.live_url` → latest `live-data` commit by SHA (API polled every 75 s with ETag) → `live-data` branch raw. The active source and SHA are shown under the header.
- `?demo=1` replays run-1 coins as synthetic run-2 data so every panel can be checked while run 2 has no trades. It is labeled DEMO in the UI.
