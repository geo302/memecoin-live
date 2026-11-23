// Data loading with the required fallback chain:
//   1) meta.live_url (LIVE)  2) latest live-data commit by SHA (GITHUB SHA)  3) live-data branch raw (GITHUB CACHE)
// The dashboard only READS the live-data branch. It never writes anything.

const REPO = 'geo302/memecoin-live';
const API_SHA = `https://api.github.com/repos/${REPO}/commits/live-data`;
const RAW = `https://raw.githubusercontent.com/${REPO}`;
export const FILES = ['meta', 'status', 'positions', 'trades', 'equity', 'scout', 'prices', 'feed', 'rules'];

export const SOURCES = { LIVE: 'LIVE', SHA: 'GITHUB SHA', CACHE: 'GITHUB CACHE', DEMO: 'DEMO' };
export const STALE_MS = { LIVE: 120e3, 'GITHUB SHA': 180e3, 'GITHUB CACHE': 360e3, DEMO: Infinity };

const st = {
  sha: null, etag: null, data: null,
  rateRemaining: null, rateReset: 0, apiBlockedUntil: 0,
  liveUrl: null, liveOk: false, liveFailedAt: 0,
  source: null, lastError: null,
};

function withTimeout(ms) {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(id) };
}

async function getJSON(url, { timeout = 15000, noStore = false } = {}) {
  const t = withTimeout(timeout);
  try {
    const r = await fetch(url, { signal: t.signal, cache: noStore ? 'no-store' : 'default' });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return await r.json();
  } finally { t.done(); }
}

// Fetch every data file from a base URL. meta is required; the rest may fail individually (-> null).
async function fetchAll(base, opts) {
  const res = await Promise.allSettled(FILES.map(f => getJSON(`${base}/data/${f}.json`, opts)));
  const out = {};
  FILES.forEach((f, i) => { out[f] = res[i].status === 'fulfilled' ? res[i].value : null; });
  if (!out.meta) throw new Error('meta.json unavailable from ' + base);
  return out;
}

function readRate(r) {
  const rem = r.headers.get('X-RateLimit-Remaining');
  const reset = r.headers.get('X-RateLimit-Reset');
  if (rem !== null) st.rateRemaining = +rem;
  if (reset !== null) st.rateReset = +reset * 1000;
}

// Step 2a: latest SHA (conditional request; 304 = unchanged, not counted against the limit)
async function latestSha() {
  const headers = { Accept: 'application/vnd.github.sha' };
  if (st.etag) headers['If-None-Match'] = st.etag;
  const t = withTimeout(10000);
  let r;
  try { r = await fetch(API_SHA, { headers, cache: 'no-store', signal: t.signal }); } finally { t.done(); }
  readRate(r);
  if (r.status === 304) return st.sha;
  if (r.status === 403 || r.status === 429) {
    st.apiBlockedUntil = Math.max(st.rateReset || 0, Date.now() + 60e3);
    throw new Error('GitHub API rate limited (' + r.status + ')');
  }
  if (!r.ok) throw new Error('SHA API ' + r.status);
  const sha = (await r.text()).trim();
  if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error('bad SHA response');
  st.etag = r.headers.get('ETag') || null;
  if (st.rateRemaining !== null && st.rateRemaining < 5) st.apiBlockedUntil = st.rateReset || Date.now() + 15 * 60e3;
  return sha;
}

function pack(changed) {
  return { ...st.data, source: st.source, sha: st.sha, fetchedAt: Date.now(), changed, error: st.lastError };
}

function noteLiveUrl() {
  const u = st.data && st.data.meta && st.data.meta.live_url;
  st.liveUrl = typeof u === 'string' && u.trim() ? u.trim().replace(/\/+$/, '') : null;
  if (!st.liveUrl) st.liveOk = false;
}

/** Load all data files. Returns {meta,status,...,source,sha,fetchedAt,changed,error}. */
export async function loadAll() {
  st.lastError = null;
  const now = Date.now();

  // 1) live_url
  if (st.liveUrl && (st.liveOk || now - st.liveFailedAt >= 60e3)) {
    try {
      st.data = await fetchAll(st.liveUrl, { timeout: 5000, noStore: true });
      st.liveOk = true; st.source = SOURCES.LIVE; noteLiveUrl();
      return pack(true);
    } catch (e) {
      st.liveOk = false; st.liveFailedAt = Date.now(); st.lastError = 'live_url failed: ' + e.message;
    }
  }

  // 2) latest commit by SHA (only every ~75 s; caller controls cadence when not on LIVE)
  if (Date.now() >= st.apiBlockedUntil) {
    try {
      const sha = await latestSha();
      if (sha && sha === st.sha && st.data && st.source === SOURCES.SHA) {
        return pack(false); // nothing changed
      }
      const data = await fetchAll(`${RAW}/${sha}`);
      st.data = data; st.sha = sha; st.source = SOURCES.SHA; noteLiveUrl();
      return pack(true);
    } catch (e) {
      st.lastError = (st.lastError ? st.lastError + '; ' : '') + e.message;
    }
  }

  // 3) branch fallback (CDN cached up to 5 min)
  try {
    st.data = await fetchAll(`${RAW}/live-data`);
    st.source = SOURCES.CACHE; noteLiveUrl();
    return pack(true);
  } catch (e) {
    st.lastError = (st.lastError ? st.lastError + '; ' : '') + e.message;
    if (st.data) return pack(false);
    throw new Error(st.lastError);
  }
}

/** ms until the next poll should run. */
export function nextDelay() {
  if (st.source === SOURCES.LIVE && st.liveOk) return 10e3;
  if (st.liveUrl && Date.now() - st.liveFailedAt >= 60e3) return 15e3; // time to retry live soon
  return 75e3;
}

/** Base URL for a file path on the active source (journal.xlsx, archive/...). */
export function fileUrl(path) {
  if (st.source === SOURCES.LIVE && st.liveUrl) return `${st.liveUrl}/${path}`;
  if (st.sha) return `${RAW}/${st.sha}/${path}`;
  return `${RAW}/live-data/${path}`;
}

export function apiInfo() {
  return { remaining: st.rateRemaining, reset: st.rateReset, blockedUntil: st.apiBlockedUntil, liveUrl: st.liveUrl, liveOk: st.liveOk };
}

const archiveCache = {};
/** Lazy-load the run-1 archive (summary + trades). */
export async function loadArchive() {
  if (archiveCache.p) return archiveCache.p;
  const tryBases = [];
  if (st.source === SOURCES.LIVE && st.liveUrl) tryBases.push(st.liveUrl);
  if (st.sha) tryBases.push(`${RAW}/${st.sha}`);
  tryBases.push(`${RAW}/live-data`);
  archiveCache.p = (async () => {
    let lastErr;
    for (const b of tryBases) {
      try {
        const [summary, trades] = await Promise.all([
          getJSON(`${b}/archive/run1/summary.json`), getJSON(`${b}/archive/run1/trades.json`)]);
        return { summary, trades };
      } catch (e) { lastErr = e; }
    }
    archiveCache.p = null;
    throw lastErr;
  })();
  return archiveCache.p;
}
