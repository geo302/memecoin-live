// Formatting helpers. All times shown in America/New_York ("ET").
export const TZ = 'America/New_York';

const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const sub = n => String(n).split('').map(d => SUBS[+d]).join('');

export const isNum = v => typeof v === 'number' && isFinite(v);

export function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Tiny prices: 3.6562e-05 -> 0.0₄36562 (subscript-zero notation)
export function price(p, sig = 5) {
  if (!isNum(p)) return '—';
  if (p === 0) return '0';
  const a = Math.abs(p), s = p < 0 ? '-' : '';
  if (a >= 1000) return s + a.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (a >= 1) return s + a.toLocaleString('en-US', { maximumFractionDigits: 4 });
  if (a >= 0.001) return s + a.toPrecision(sig).replace(/0+$/, '').replace(/\.$/, '');
  const [mant, ex] = a.toExponential(sig - 1).split('e');
  const zeros = -parseInt(ex, 10) - 1;
  const digits = mant.replace('.', '').replace(/0+$/, '') || '0';
  return `${s}0.0${sub(zeros)}${digits}`;
}

// Plain full-decimal price, e.g. 0.000036562 (for tooltips / CSV)
export function priceFull(p) {
  if (!isNum(p)) return '';
  if (Math.abs(p) >= 1) return String(+p.toPrecision(8));
  const z = Math.max(0, Math.floor(-Math.log10(Math.abs(p))));
  return p.toFixed(Math.min(20, z + 6));
}

export function usd(v, dp = 2) {
  if (!isNum(v)) return '—';
  const s = v < 0 ? '-' : '';
  return s + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}
export function usdSigned(v, dp = 2) {
  if (!isNum(v)) return '—';
  return (v > 0 ? '+' : '') + usd(v, dp);
}
export function big(v) { // $1.69M
  if (!isNum(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1e9) return '$' + (v / 1e9).toFixed(2) + 'B';
  if (a >= 1e6) return '$' + (v / 1e6).toFixed(2) + 'M';
  if (a >= 1e3) return '$' + (v / 1e3).toFixed(1) + 'k';
  return '$' + v.toFixed(0);
}
export function pct(v, dp = 1, signed = true) {
  if (!isNum(v)) return '—';
  return (signed && v > 0 ? '+' : '') + v.toFixed(dp) + '%';
}
export function num(v, dp = 2) {
  if (!isNum(v)) return '—';
  return v.toLocaleString('en-US', { maximumFractionDigits: dp });
}
export const cls = v => !isNum(v) || v === 0 ? '' : v > 0 ? 'up' : 'dn';

export function ts(iso) { const t = Date.parse(iso); return isNaN(t) ? null : t; }

const dtf = new Intl.DateTimeFormat('en-US', { timeZone: TZ, month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const tf = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
export function dt(iso) { const t = typeof iso === 'number' ? iso : ts(iso); return t === null ? '—' : dtf.format(t).replace(',', ''); }
export function tm(iso) { const t = typeof iso === 'number' ? iso : ts(iso); return t === null ? '—' : tf.format(t); }

export function dur(sec) {
  if (!isNum(sec)) return '—';
  sec = Math.max(0, Math.round(sec));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  if (h) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}
export function ago(iso, now = Date.now()) {
  const t = typeof iso === 'number' ? iso : ts(iso);
  if (t === null) return '—';
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return s + 's ago';
  if (s < 3600) return Math.floor(s / 60) + 'm ' + (s % 60) + 's ago';
  return Math.floor(s / 3600) + 'h ' + Math.floor(s % 3600 / 60) + 'm ago';
}

export const dot = r => `<span class="dot ${r}"></span>`;
export function tradeState(t) {
  if (!t) return 'open';
  if (t.status === 'open') return 'open';
  if (t.result === 'Win' || (isNum(t.pnl_usd) && t.pnl_usd > 0)) return 'win';
  return 'loss';
}

export function h(tag, attrs = {}, html = '') {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v; else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else if (v !== null && v !== undefined) el.setAttribute(k, v);
  }
  if (html) el.innerHTML = html;
  return el;
}

// Minimal, safe markdown -> HTML (headings, bold, inline code, lists, paragraphs)
export function md(src) {
  if (!src) return '';
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const out = []; let list = false;
  for (const line of String(src).split('\n')) {
    const m = line.match(/^(#{1,4})\s+(.*)/), li = line.match(/^\s*[-*]\s+(.*)/);
    if (!li && list) { out.push('</ul>'); list = false; }
    if (m) out.push(`<h${m[1].length + 2}>${inline(m[2])}</h${m[1].length + 2}>`);
    else if (li) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(li[1])}</li>`); }
    else if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push('</ul>');
  return out.join('');
}
