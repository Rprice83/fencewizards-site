// Tiny HTML helpers for the page builder.

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Inline text markup used in page content:
 *   [link text](/path/)   → <a>
 *   **bold**              → <strong>
 *   *accent*              → <em> (renders red in headings)
 *   --                    → en dash, ---  → em dash
 * Everything else is escaped.
 */
export function md(text) {
  let s = esc(text);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const ext = /^https?:\/\//.test(href);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/---/g, '&mdash;').replace(/--/g, '&ndash;');
  return s;
}

// Strip inline markup for plain-text uses (meta tags, JSON-LD)
export const plain = text => String(text ?? '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?([^*]+)\*\*?/g, '$1').replace(/---/g, '—').replace(/--/g, '–');

export const paras = list => (Array.isArray(list) ? list : [list]).filter(Boolean).map(p => `<p>${md(p)}</p>`).join('\n');

export const attr = (name, value) => (value == null || value === false ? '' : ` ${name}="${esc(value)}"`);
