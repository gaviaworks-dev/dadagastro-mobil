/* Yayın kopyası bağlantıları: üç ekran birbirine bağlı; yayında olmayan sayfalara bağlantı kalmaz. */
(() => {
  const page = location.pathname.split('/').pop() || 'ana-v3.html', home = page === 'ana-v3.html';
  const keep = (q, names) => { const p = new URLSearchParams(q), o = new URLSearchParams(); for (const [k, v] of p) if (names.some(n => k === n || k.startsWith(n + '['))) o.append(k, v); const s = o.toString(); return s ? '?' + s : ''; };
  function map(h) {
    if (!h || /^(https?:|mailto:|tel:|#|data:|javascript:)/.test(h)) return null;
    const [path, query = ''] = h.split('#')[0].split('?'), hash = h.includes('#') ? '#' + h.split('#')[1] : '';
    if (/^(detay-c|tarif-detay|detay-v2)\.html$/.test(path)) return home ? 'liste-v2.html' : 'detay-v2.html' + keep(query, ['tarif']) + hash;
    if (/^(liste|tarifler|liste-v2)\.html$/.test(path)) return path === 'liste-v2.html' ? null : 'liste-v2.html' + keep(query, ['kategori', 'sirala', 'malzeme', 'mutfak', 'q', 'sayfa']) + hash;
    if (path === 'arama.html') return 'liste-v2.html';
    if (path === 'index.html') return 'ana-v3.html' + hash;
    if (path === 'tabaktan-tarif.html') return '';
    return null;
  }
  function fix(root) {
    root.querySelectorAll?.('a[href],form[action]').forEach(el => {
      const attr = el.tagName === 'FORM' ? 'action' : 'href', h = el.getAttribute(attr), n = map(h);
      if (n !== null && n !== h) el.setAttribute(attr, n);
    });
  }
  fix(document);
  new MutationObserver(list => { for (const m of list) for (const n of m.addedNodes) if (n.nodeType === 1) { fix(n); if (n.matches?.('a[href],form[action]')) fix(n.parentNode || document); } }).observe(document.documentElement, {childList: true, subtree: true});
  // Menu rows and links whose target changes at click time.
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n !== null) a.setAttribute('href', n); } }, true);
})();
