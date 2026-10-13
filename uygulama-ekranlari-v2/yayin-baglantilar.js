/* Yayın kopyası: kök ekranların "index.html" (ana sayfa) bağlantıları ana-v3.html'e gider; yayında kök index galeridir. */
(() => {
  // Ana Sayfa (logo, alt menü, yan menü) → ana-v3; kök runtime'ın eski adları yayındaki karşılıklarına.
  const ESKI = {'index.html': 'ana-v3.html', 'ana-1.html': 'ana-v3.html', 'liste.html': 'liste-v2.html', 'detay-c.html': 'detay-v2.html', 'arama.html': 'uygulama/arama.html'};
  const map = h => { const m = /^(?:\.\/)?([a-z0-9-]+\.html)([?#].*)?$/.exec(h || ''); return m && ESKI[m[1]] ? ESKI[m[1]] + (m[2] || '') : null; };
  const fix = r => r.querySelectorAll?.('a[href]').forEach(a => { const n = map(a.getAttribute('href')); if (n) a.setAttribute('href', n); });
  fix(document);
  new MutationObserver(l => { for (const m of l) for (const n of m.addedNodes) if (n.nodeType === 1) { fix(n); if (n.matches?.('a[href]')) fix(n.parentNode || document); } }).observe(document.documentElement, {childList: true, subtree: true});
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n) a.setAttribute('href', n); } }, true);
})();
