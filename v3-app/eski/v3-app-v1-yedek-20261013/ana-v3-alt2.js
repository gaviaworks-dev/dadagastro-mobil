/* Ana sayfa · 2. alternatif — "Masadaki kart". Hero: koyu, bulanık fotoğraf zemini üstünde soru ve arama;
   yemek, hero'nun alt kenarından taşan yüzen bir kartta. Modüller ızgara dilinde.
   Sıra (docs/40 · B "Önce kapılar", video kuralına uyarlanmış): Kategoriler → Video → Tarif bul → En son → Şefler → Paylaş. */
(() => {
  const {q, order, heroVeil, watch, latest} = V3Alt;
  const banner = q('.x-hero');
  let recipe;
  const r = DATA.recipes.find(x => x.slug.startsWith('semizotlu-yumurta')) || DATA.recipes[0];
  // The sharp dish sits on a card; the full-bleed layer behind is the same photo, blurred and veiled.
  q('.x-scene-copy', banner).remove();
  q('.x-scene-photo', banner).innerHTML = X.image(r); // blurred backdrop = the same dish as the card
  q('.v3-hero-top', banner).insertAdjacentHTML('afterend', `<div class="alt2-card"><div class="alt2-card-photo" style="background-image:url('${r.image}')" role="img" aria-label="${esc(shortTitle(r))}"></div><div class="alt2-card-shade"></div><div class="alt2-card-copy"></div></div>`);
  const cardEl = q('.alt2-card', banner), copy = q('.alt2-card-copy', cardEl);
  copy.innerHTML = X.recipe(r, 'Bugün deneyebilirsin');
  recipe = q('.x-recipe', copy);
  const shade = () => heroVeil(cardEl, recipe, {top: 0});
  watch(cardEl, shade);

  // Grid language: four videos under the lead, four latest recipes in two columns.
  const baseRoles = applyTypeRoles;
  applyTypeRoles = function (root = document) {
    baseRoles(root);
    document.querySelectorAll('.collection-block .recipe-card h3[data-type-role=featured]').forEach(h => { h.dataset.typeRole = 'card'; });
  };
  latest(4);
  // Three-column gates: nine real categories (3×3) and twelve cuisines (4×3), so both tabs end close together.
  const count = v => Number(String(v).replace(/[^\d]/g, '')) || 0;
  const gates = WEB.categories.map(c => ({...c, image: window.V3_KATEGORI_MEDIA?.[c.image] || ''})).filter(c => c.image).sort((a, b) => count(b.count) - count(a.count)).slice(0, 9);
  q('[data-v3-panel=cat]').innerHTML = gates.map(c => `<a class="v3-cat-tile" href="liste.html?kategori=${encodeURIComponent(c.name)}"><span class="v3-cat-media"><span class="photo" style="background-image:url('${esc(c.image)}')"></span><span class="photo-meta v3-cat-count"><span><i class="icon fa-solid fa-book-open" aria-hidden="true"></i> ${esc(c.count)}</span></span></span><b class="v3-cat-name">${esc(c.name)}</b></a>`).join('');
  order(['cats', 'videos', 'finder', 'latest', 'chefs', 'community']);
  applyTypeRoles(document);
  window.ALT2_READY = true;
})();
