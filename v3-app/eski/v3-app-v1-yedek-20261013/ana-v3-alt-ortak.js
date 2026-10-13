/* Ana sayfa alternatifleri — üçünün paylaştığı yardımcılar. ana-v3.js sayfayı kurduktan sonra çalışır;
   ana-v3.html, ana-v3.js/css ve ortak bileşenler değişmez. */
window.V3Alt = (() => {
  const q = (s, r = document) => r.querySelector(s);
  const SECTIONS = {finder: '.v3-finder', videos: '.v3-videos', cats: '.v3-cats', latest: '.collection-block', chefs: '.v3-chefs', community: '.six-community'};
  // Fixed module order (never per person). Background bands follow position automatically.
  function order(ids) {
    const content = q('.v3-content');
    content.replaceChildren(...ids.map(k => q(':scope>' + SECTIONS[k], content)));
  }
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  // One continuous hero veil from the source dark (--overlay): a short top shade for the header icons and,
  // from the first text line, a long smooth rise (80% reached 24px above the text, canon). No band.
  function heroVeil(banner, firstText, {top = .56, topTo = 0, max = .8, ramp = 96, end = .9, steps = 41} = {}) {
    const box = banner.getBoundingClientRect(), h = box.height;
    if (!h || !firstText) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-header')) || 68;
    const topEnd = topTo || header + 48, t = firstText.getBoundingClientRect().top - box.top;
    const solid = Math.max(0, t - 24), start = Math.max(0, solid - ramp);
    const stops = Array.from({length: steps}, (_, i) => {
      const y = h * i / (steps - 1);
      const upper = top * (1 - ease(y / topEnd));
      const lower = y <= start ? 0 : y <= solid ? max * ease((y - start) / (solid - start || 1)) : max + (end - max) * ease((y - solid) / Math.max(1, h - solid));
      return `color-mix(in srgb,var(--overlay) ${(Math.max(upper, lower) * 100).toFixed(2)}%,transparent) ${(100 * i / (steps - 1)).toFixed(2)}%`;
    });
    banner.style.setProperty('--alt-veil', `linear-gradient(180deg,${stops.join(',')})`);
  }
  function watch(banner, fn) {
    new ResizeObserver(fn).observe(banner);
    addEventListener('scroll', fn, {passive: true});
    document.fonts.ready.then(fn);
    fn();
  }
  // The same recipe card as ana-v3.js (copied transformation, not a new card): photo, time/rating, bold
  // category, two-line title, author; no subtitle, difficulty/servings/cost or views.
  const page = location.pathname.split('/').pop();
  function recipeCard(r) {
    const t = document.createElement('template');
    t.innerHTML = card(r);
    const el = t.content.firstElementChild;
    el.querySelectorAll('.card-subtitle,.card-secondary,.card-badges,.card-views').forEach(n => n.remove());
    el.querySelectorAll('.card-visual,.card-copy').forEach(a => { a.href = `detay-c.html?tarif=${encodeURIComponent(r.slug)}&donus=${page}`; });
    const link = q('.card-author-row', el), author = document.createElement('p');
    author.className = 'card-author-row';
    author.innerHTML = `<span class="avatar avatar-card" aria-hidden="true">${esc(r.author.slice(0, 1).toLocaleUpperCase('tr'))}</span><span class="v3-author-name" title="${esc(r.author)}"><span class="v3-sr">Tarifi ekleyen: </span>${esc(r.author)}</span>`;
    link.replaceWith(author);
    return el.outerHTML;
  }
  // Latest recipes by real date (same rule as ana-v3.js), n of them.
  function latest(n) {
    const body = q('.collection-block .collection-body');
    const list = DATA.recipes.filter(r => r.author && r.author.trim()).sort((a, b) => recipeDate(b) - recipeDate(a)).slice(0, n);
    body.innerHTML = list.map(recipeCard).join('');
    q('.collection-block').dataset.order = list.map(r => r.slug).join(',');
    hydratePhotos(body); applyTypeRoles(body);
    return list;
  }
  return {q, order, heroVeil, watch, ease, recipeCard, latest};
})();
