/* Dört telefon yan yana sığsın diye dış çerçeve ölçeklenir (iç görünüm 390×844 kalır); dar ekranda sekmeler. */
(() => {
  const root = document.documentElement, wide = matchMedia('(min-width:1101px)');
  function fit() {
    if (!wide.matches) { root.style.removeProperty('--as-scale'); return; }
    const gap = parseFloat(getComputedStyle(document.querySelector('.as-screens')).columnGap) || 32;
    const pad = 48, scale = Math.min(1, (innerWidth - pad - 3 * gap) / (4 * 390));
    root.style.setProperty('--as-scale', scale.toFixed(4));
  }
  addEventListener('resize', fit); wide.addEventListener('change', fit); fit();
  const tabs = [...document.querySelectorAll('[data-as-tab]')];
  const pick = (i, focus) => tabs.forEach(t => { const on = t.dataset.asTab === String(i); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on); if (on && focus) t.focus(); });
  tabs.forEach(t => t.addEventListener('click', () => pick(t.dataset.asTab)));
  document.querySelector('.as-tabs').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); pick(((i + (e.key === 'ArrowRight' ? 1 : -1) + 4) % 4) + 1, true); });
})();
