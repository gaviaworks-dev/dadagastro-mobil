/* Ana sayfa · 3. alternatif — "Tarif defteri". Hero: düz kenarla biten fotoğraf penceresi; soru, arama ve
   öneri, fotoğrafın altına binen beyaz bir karar kartında. Modüller "öne çıkan + liste" dilinde.
   Sıra (C "İçerik önce"): Video → En son → Kategoriler → Tarif bul → Şefler → Paylaş. */
(() => {
  const {q, order, heroVeil, watch, latest, recipeCard} = V3Alt;
  const banner = q('.x-hero'), group = q('.v3-hero-top .six-hero-group', banner);
  const r = DATA.recipes.find(x => x.slug.startsWith('mercimekli-yaprak-sarma')) || DATA.recipes[0];
  q('.x-scene-copy', banner).remove();
  q('.x-scene-photo', banner).innerHTML = X.image(r);
  // The decision card: question + search on paper, the suggestion line below them.
  const cardEl = document.createElement('div');
  cardEl.className = 'alt3-decision';
  cardEl.append(group);
  cardEl.insertAdjacentHTML('beforeend', X.recipe(r, 'Bugün deneyebilirsin'));
  q('.x-recipe', cardEl).classList.add('alt3-pick');
  q('.six-hero').append(cardEl);
  // ana-v3.js still measures its own hero title/search for the shade; leave it an empty, hidden geometry stub.
  q('.v3-hero-top', banner).innerHTML = '<h1 hidden></h1><span class="six-search" hidden></span>';
  q('.v3-hero-top', banner).hidden = true;
  // The header still needs a first-text geometry: the card's title is that text now.
  q('h1', cardEl).classList.add('x-first');
  const shade = () => heroVeil(banner, cardEl, {top: .56, max: .3, end: .45, ramp: 96});
  watch(banner, shade);

  // Featured + list: the lead video stays large, the rest become rows; latest = one lead + rows.
  q('.v3-video-rail').classList.add('alt3-rows');
  // Rows show title + views beside the picture (same data as the card overlay).
  document.querySelectorAll('.alt3-rows>.v3-video').forEach(v => { const t = q('.v3-video-text', v); v.insertAdjacentHTML('beforeend', `<span class="alt3-row-copy">${t.innerHTML}</span>`); });
  const list = latest(5);
  const body = q('.collection-block .collection-body');
  body.classList.add('alt3-latest');
  // Chef cards keep their component; the strip becomes a vertical list of rows.
  q('.v3-chef-row').classList.add('alt3-chef-list');
  order(['videos', 'latest', 'cats', 'finder', 'chefs', 'community']);
  applyTypeRoles(document);
  window.ALT3_READY = true;
})();
