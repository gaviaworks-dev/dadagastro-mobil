/* Isolated home revision. The V2 entry points and shared sources stay unchanged. */
(() => {
  const q = selector => document.querySelector(selector);
  const back = 'ana-v3.html';
  const {banner, fa} = X;
  banner.querySelector('.x-scene-label').remove();
  banner.querySelector('.x-heading').remove();
  banner.querySelector('.x-scene-hint').remove();
  // Same title and global-search markup as ana-1, on the x6 photograph/scene.
  banner.insertAdjacentHTML('beforeend', `<div class="purpose-title"><div class="six-hero-group"><div class="purpose-copy"><h1 class="x-first">Ne pişirsem?</h1></div><a class="six-search a-global-search" href="arama.html?donus=${back}" aria-label="Genel aramayı aç">${fa('magnifying-glass')}<span>Tarif, şef, video ara</span></a></div></div>`);
  banner.querySelector('.x-scene-copy').classList.add('six-hero-group');
  X_DOCK.remove();
  // Preserve x6's shrinking photograph without the duplicate search dock.
  X_SCROLL = () => {
    const y = Math.min(scrollY, 400);
    banner.style.setProperty('--scene-collapse', `${motion.matches ? 0 : Math.min(y * .24, 96)}px`);
    banner.querySelector('.x-scene-photo').style.transform = motion.matches ? 'none' : `translateY(${y * .12}px) scale(${1 - y * .00018})`;
  };

  const categories = q('.six-categories');
  categories.querySelector('h2').textContent = 'Kategoriler';
  const categoryToggle = categories.querySelector('[data-six-category-toggle]');
  categoryToggle.addEventListener('click', () => {
    categories.querySelector('h2').textContent = categoryToggle.getAttribute('aria-pressed') === 'true' ? 'Dünya Mutfakları' : 'Kategoriler';
  });

  // Reuse ana-1's recipe-card component; remove only the requested information.
  function recipeCard(r) {
    const template = document.createElement('template');
    template.innerHTML = card(r);
    const el = template.content.firstElementChild;
    el.querySelectorAll('.card-subtitle,.card-secondary,.card-badges,.card-footer').forEach(node => node.remove());
    el.querySelectorAll('a[href]').forEach(a => {
      a.href = `detay-c.html?tarif=${encodeURIComponent(r.slug)}&donus=${back}`;
    });
    return el.outerHTML;
  }
  const latest = [...DATA.recipes].sort((a, b) => recipeDate(b) - recipeDate(a)).slice(0, 6);
  const recipes = SET_SECTIONS.block;
  recipes.dataset.recipeLayout = 'covers';
  recipes.innerHTML = `<div class="section-heading-row six-heading"><h2>En son eklenen tarifler</h2><a class="six-see" href="liste.html?sirala=en_yeni" aria-label="En son eklenen tariflerin tümü">Tümü ${fa('arrow-right')}</a></div><div class="collection-body">${latest.map(recipeCard).join('')}</div>`;
  recipes.dataset.order = latest.map(r => r.slug).join(',');

  const chefs = SET_SECTIONS.chefs;
  const kitchen = X.kitchen;
  kitchen.querySelector('h2').textContent = 'Elinde ne var?';
  const previews = kitchen.querySelector('[data-set-preview]');
  function simplifyPreviews() {
    for (const a of previews.querySelectorAll('.kitchen-mini')) {
      const slug = new URL(a.href).searchParams.get('tarif');
      const r = DATA.recipes.find(recipe => recipe.slug === slug);
      if (r) a.replaceWith(document.createRange().createContextualFragment(recipeCard(r)));
    }
    hydratePhotos(previews);
  }
  new MutationObserver(() => {
    if (previews.querySelector('.kitchen-mini')) simplifyPreviews();
  }).observe(previews, {childList: true});
  simplifyPreviews();

  const community = q('.six-community');
  community.querySelector('.eyebrow').remove();
  community.querySelector('h2').textContent = 'Tarifini paylaş';
  community.querySelector('p').textContent = 'Tarifini DadaGastro topluluğuyla paylaş.';
  community.querySelector('button').innerHTML = `${fa('plus')} Tarif ekle`;
  q('.six-content').replaceChildren(categories, recipes, chefs, kitchen, community);

  const originalDrawer = openSiteDrawer;
  openSiteDrawer = function () {
    originalDrawer();
    const identity = q('.drawer-top > div');
    identity.replaceChildren();
    identity.insertAdjacentHTML('beforeend', `<a href="${back}" class="v3-drawer-logo" aria-label="DadaGastro ana sayfa"><img src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro"></a>`);
  };
  hydratePhotos(document);
  applyTypeRoles(document);
  syncPhotoReadability();
  syncHeader();
  motion.addEventListener('change', syncHeader);
  window.HOME_V3_READY = true;
})();
