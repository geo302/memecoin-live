---
rule: "Rule F8"
linked: 7
failed: 1
tags: ["rule"]
---
# Rule F8

Entry gate F8 (added 2026-11-24 after SVAG #5): after a candidate passes everything, wait ~25s from the scout quote and re-quote; skip if price is > 5% below the scout price, liquidity is > 5% below the scout liquidity, or the fresh 5m change (F1) / 1h buys/sells (F4) now fail. Since 2026-11-24 (SEAL #7) the re-quote is a cache-busted fetch of the exact pair; if it is byte-identical to the scout (price + liquidity + txns) after one retry, or the fetch fails, F8 fails as stale.

[[Rules]]

Linked notes: 7 (1 failed or near-miss)

- [[R2-T6 Circel]] PASS
- [[R2-T7 SEAL]] PASS
- [[R2-T8 ROSTRUM]] PASS
- [[R2-T9 JESSE]] PASS
- [[R2-T10 BANK]] PASS
- [[R2-T11 SAOFOIL]] PASS
- [[NM-0054 SAOFOIL]] NEAR-MISS FAIL
