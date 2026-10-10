/* Telefon ölçeği: satırdaki telefonlar sığacak kadar küçülür (en çok 1); içerik 390 genişlikte kalır.
   Dar ekranda üç sekme; seçilen sekmenin ekranları alt alta. */
(() => {
  const narrow = matchMedia('(max-width:900px)');
  function fit() {
    for (const row of document.querySelectorAll('.sn-row')) {
      const n = narrow.matches ? 1 : Number(row.dataset.cols) || 1, gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      // The group's content box (not the row: its children could widen it before the first fit).
      const g = row.parentElement, cs = getComputedStyle(g), room = g.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      row.style.setProperty('--sn-s', Math.min(1, (room - gap * (n - 1)) / (n * 390)).toFixed(4));
    }
  }
  const tabs = [...document.querySelectorAll('[data-sn-tab]')];
  const pick = (id, focus) => { tabs.forEach(t => { const on = t.dataset.snTab === id; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on); if (on && focus) t.focus(); }); fit(); };
  tabs.forEach(t => t.addEventListener('click', () => pick(t.dataset.snTab)));
  document.querySelector('.sn-tabs').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); pick(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].dataset.snTab, true); });
  addEventListener('resize', fit); addEventListener('load', fit); narrow.addEventListener?.('change', fit);
  // Re-fit whenever the page's width settles or changes (WebKit can lay out after the first call).
  new ResizeObserver(fit).observe(document.querySelector('.sn-groups')); fit();
})();
