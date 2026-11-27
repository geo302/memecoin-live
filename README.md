# memecoin-live

Live dashboard data for **Rio's PAPER (simulated) Base meme coin trading**, run by Geovanie Joseph-Velasquez's assistant bot.

**Paper trading only.** No wallet, no real money, no keys. Nothing here is financial advice.

- `main`: the dashboard (static site on GitHub Pages), design references in `design/`, field docs in `docs/DATA_SCHEMA.md`, build brief in `CLAUDE_PROMPT.md`.
- `live-data`: machine-written data, one force-pushed commit refreshed about every 30 seconds. Do not edit.

Rio 1 is the live $10,000 paper book (started 2026-11-22 23:23 ET as run 2). Rio 2 is an isolated comparison book with the same rules except it skips the 25-second F8 wait. The old $100 Run 1 book is archived off the live dashboard.

## Dashboard

Live at https://geo302.github.io/memecoin-live/ (GitHub Pages, `main` / root). Plain static files: `index.html` + `assets/` (vanilla JS modules, ECharts 5.5.1 vendored in `assets/vendor/`). No build step, no trackers, no secrets.

- Tabs: MAP · BOARD · CHARTS · TRADES · FEED · RULES · RIO 2 · CALENDAR · WHAT-IF · ALL. Keys `1`-`9` / `0` switch tabs, `Esc` closes the detail panel.
- Data source chain (see `assets/data.js`): `meta.live_url` → latest `live-data` commit by SHA (API polled every 75 s with ETag) → `live-data` branch raw. The active source and SHA are shown under the header.
- `?demo=1` replays run-1 coins as synthetic run-2 data so every panel can be checked while run 2 has no trades. It is labeled DEMO in the UI.
