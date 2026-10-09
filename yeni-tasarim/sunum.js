/* Dar ekranda üç sekme, tek ekran. */
(() => {
  const tabs = [...document.querySelectorAll('[data-sn-tab]')];
  const pick = (i, focus) => tabs.forEach(t => { const on = t.dataset.snTab === String(i); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on); const f = document.querySelector('#' + t.getAttribute('aria-controls') + ' iframe'); if (on && f) f.loading = 'eager'; if (on && focus) t.focus(); });
  tabs.forEach(t => t.addEventListener('click', () => pick(t.dataset.snTab)));
  document.querySelector('.sn-tabs').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); pick(((i + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3) + 1, true); });
})();
