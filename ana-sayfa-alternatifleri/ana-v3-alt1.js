/* Ana sayfa · 1. alternatif — "Kapak şeridi". Hero: kaydırılabilir üç gerçek tarif kapağı; soru, arama ve
   öneri hero'nun altında; hero, üstüne binen yuvarlak köşeli içerikle biter. Modüller yatay şerit dilinde.
   Sıra (docs/40 · A "İzle, sonra seç"): Video → Tarif bul → Kategoriler → En son → Şefler → Paylaş. */
(() => {
  const {q, order, heroVeil, watch} = V3Alt;
  const banner = q('.x-hero'), group = q('.v3-hero-top .six-hero-group', banner);
  const covers = ['jiao-yan-karides', 'sardalya-izgara', 'mercimekli-yaprak-sarma'].map(s => DATA.recipes.find(r => r.slug.startsWith(s))).filter(Boolean);
  let index = 0;

  // Covers: one track, three real photographs; the suggestion line follows the visible cover.
  q('.x-scene-photo', banner).innerHTML = `<div class="alt1-track">${covers.map(r => X.image(r)).join('')}</div>`;
  const track = q('.alt1-track', banner);
  q('.x-scene-copy', banner).remove(); // its recipe line moves into the bottom stack; the scroll hint is not needed
  const title = q('.purpose-copy', group);
  title.insertAdjacentHTML('beforebegin', '<div class="alt1-pick"></div>');
  title.insertAdjacentHTML('beforeend', `<div class="alt1-dots" role="group" aria-label="Kapak seç">${covers.map((r, i) => `<button type="button" data-alt1-dot="${i}" aria-label="${i + 1}. kapak: ${esc(shortTitle(r))}" aria-pressed="${i === 0}"><span></span></button>`).join('')}</div>`);
  const pick = q('.alt1-pick', group);
  function show(i) {
    index = (i + covers.length) % covers.length;
    track.style.transform = `translateX(${-100 * index}%)`;
    pick.innerHTML = X.recipe(covers[index], 'Bugün deneyebilirsin');
    document.querySelectorAll('[data-alt1-dot]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.alt1Dot) === index));
    applyTypeRoles(pick);
    shade();
  }
  banner.addEventListener('click', e => { const d = e.target.closest('[data-alt1-dot]'); if (d) show(Number(d.dataset.alt1Dot)); });
  let x0 = null;
  q('.x-scene-photo', banner).addEventListener('pointerdown', e => { x0 = e.clientX; });
  addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1)); });

  const shade = () => heroVeil(banner, pick);
  watch(banner, shade);

  // Modules as horizontal rails: every video equal, latest recipes and categories side by side.
  const rail = q('.v3-video-rail'), lead = q('.v3-video-lead');
  lead.classList.remove('v3-video-lead');
  rail.prepend(lead);
  // The latest lead keeps the card role here (all cards in the rail are equal).
  const baseRoles = applyTypeRoles;
  applyTypeRoles = function (root = document) {
    baseRoles(root);
    document.querySelectorAll('.collection-block .recipe-card h3[data-type-role=featured]').forEach(h => { h.dataset.typeRole = 'card'; });
  };
  V3Alt.latest(6); // six real latest recipes fill the rail
  order(['videos', 'finder', 'cats', 'latest', 'chefs', 'community']);
  show(0);
  applyTypeRoles(document);
  window.ALT1_READY = true;
})();
