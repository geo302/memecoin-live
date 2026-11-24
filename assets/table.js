// Generic sortable table with sticky first column, optional row flash on change and expandable rows.
import { esc } from './fmt.js?v=d681b70b';

export function makeTable(el, { columns, key = r => r.id, sort = null, desc = true, onRow = null, expand = null, rowClass = null, flash = false, empty = '' }) {
  const S = { sort, desc, rows: [], prev: new Map(), open: new Set() };
  el.classList.add('tw');
  el.addEventListener('click', e => {
    const th = e.target.closest('th[data-k]');
    if (th) {
      const k = th.dataset.k;
      if (S.sort === k) S.desc = !S.desc; else { S.sort = k; S.desc = true; }
      render(false); return;
    }
    if (e.target.closest('a')) return;
    const tr = e.target.closest('tr[data-key]');
    if (!tr) return;
    const k = tr.dataset.key;
    if (expand) { S.open.has(k) ? S.open.delete(k) : S.open.add(k); render(false); }
    if (onRow) { const r = S.rows.find(x => String(key(x)) === k); if (r) onRow(r); }
  });

  function sorted() {
    const rows = [...S.rows];
    if (!S.sort) return rows;
    const col = columns.find(c => c.k === S.sort);
    if (!col) return rows;
    const val = col.v || (r => r[col.k]);
    rows.sort((a, b) => {
      let x = val(a), y = val(b);
      const xn = x === null || x === undefined || (typeof x === 'number' && !isFinite(x));
      const yn = y === null || y === undefined || (typeof y === 'number' && !isFinite(y));
      if (xn && yn) return 0; if (xn) return 1; if (yn) return -1;
      if (typeof x === 'string') { x = x.toLowerCase(); y = String(y).toLowerCase(); }
      return (x < y ? -1 : x > y ? 1 : 0) * (S.desc ? -1 : 1);
    });
    return rows;
  }

  function render(doFlash) {
    if (!S.rows.length) { el.innerHTML = empty ? `<div class="empty">${empty}</div>` : ''; return; }
    const head = '<tr>' + columns.map(c => `<th data-k="${c.k}" class="${c.r ? 'r' : ''} ${S.sort === c.k ? 'sorted' + (S.desc ? '' : ' asc') : ''}" ${c.tip ? `title="${esc(c.tip)}"` : ''}>${c.label}</th>`).join('') + '</tr>';
    const next = new Map();
    const body = sorted().map(r => {
      const k = String(key(r));
      const tds = columns.map(c => {
        const html = c.f ? c.f(r) : esc(r[c.k] ?? '—');
        let fl = '';
        if (flash && doFlash && c.flash !== false) {
          const old = S.prev.get(k + '|' + c.k);
          if (old && old.html !== html) {
            const nv = c.v ? c.v(r) : r[c.k];
            fl = typeof nv === 'number' && typeof old.v === 'number' ? (nv >= old.v ? 'flash-up' : 'flash-dn') : 'flash-up';
          }
        }
        if (flash) next.set(k + '|' + c.k, { html, v: c.v ? c.v(r) : r[c.k] });
        const title = c.title ? c.title(r) : '';
        return `<td class="${c.r ? 'r' : ''} ${c.cls ? c.cls(r) : ''} ${fl}" ${title ? `title="${esc(title)}"` : ''}>${html}</td>`;
      }).join('');
      const rc = (rowClass ? rowClass(r) : '') + (onRow || expand ? ' link' : '');
      let out = `<tr data-key="${esc(k)}" class="${rc}">${tds}</tr>`;
      if (expand && S.open.has(k)) out += `<tr class="exp"><td colspan="${columns.length}">${expand(r)}</td></tr>`;
      return out;
    }).join('');
    if (flash) S.prev = next;
    const sl = el.scrollLeft, stp = el.scrollTop;
    el.innerHTML = `<table class="t"><thead>${head}</thead><tbody>${body}</tbody></table>`;
    el.scrollLeft = sl; el.scrollTop = stp;
  }

  return {
    update(rows, doFlash = true) { S.rows = rows || []; render(doFlash); },
    rows: () => sorted(),
  };
}

export function toCSV(columns, rows) {
  const q = v => { const s = v === null || v === undefined ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [columns.map(c => q(c.label)).join(','), ...rows.map(r => columns.map(c => q(c.csv ? c.csv(r) : r[c.k])).join(','))].join('\n');
}

export function download(name, text, type = 'text/csv') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
