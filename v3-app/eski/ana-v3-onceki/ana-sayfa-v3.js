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
  // Source dark colour; a single smooth curve tied to both text groups.
  // Smoothstep has zero slope at its ends, so the clear food window has no seam.
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function sceneCurve() {
    const h = banner.clientHeight, rect = banner.getBoundingClientRect();
    const searchBottom = banner.querySelector('.six-search').getBoundingClientRect().bottom - rect.top;
    const copyTop = banner.querySelector('.x-scene-copy').getBoundingClientRect().top - rect.top;
    const space = parseFloat(getComputedStyle(banner).getPropertyValue('--space-48'));
    const clearAt = searchBottom + space * 2;
    const dimAt = copyTop - space * 3;
    const stops = Array.from({length:81}, (_, i) => {
      const y = h * i / 80;
      const upper = .86 * (1 - smooth((y - searchBottom * .4) / (clearAt - searchBottom * .4)));
      const lower = smooth((y - dimAt) / (h - dimAt));
      const alpha = Math.max(upper, lower);
      return `color-mix(in srgb,var(--overlay) ${(alpha * 100).toFixed(3)}%,transparent) ${(i * 100 / 80).toFixed(2)}%`;
    });
    banner.style.setProperty('--v3-scene-curve', `linear-gradient(180deg,${stops.join(',')})`);
    // The source's farthest-corner ellipse in its old box has sqrt(2) radii.
    // Explicit radii retain that light falloff without clipping the layer at the box edge.
    banner.style.setProperty('--v3-light-x', `${banner.clientWidth * Math.SQRT2}px`);
    banner.style.setProperty('--v3-light-y', `calc(var(--home-light-height) * ${Math.SQRT2})`);
  }
  // Preserve x6's opening scene; a cover photograph never shrinks off its container.
  X_SCROLL = () => {
    const y = Math.min(scrollY, 400);
    banner.style.setProperty('--scene-collapse', `${motion.matches ? 0 : Math.min(y * .24, 96)}px`);
    banner.querySelector('.x-scene-photo').style.transform = 'none';
    sceneCurve();
  };
  new ResizeObserver(sceneCurve).observe(banner);
  document.fonts.ready.then(sceneCurve);
  sceneCurve();

  const categories = q('.six-categories');
  categories.querySelector('h2').textContent = 'Kategoriler';
  function categoryPhotos() {
    categories.querySelectorAll('.six-category').forEach((a, i) => {
      const image = a.querySelector('.photo'), src = V3_CATEGORY_MEDIA[WEB.categories[i]?.image];
      if (image && src) image.style.backgroundImage = `url('${src}')`;
    });
  }
  categoryPhotos();
  const categoryToggle = categories.querySelector('[data-six-category-toggle]');
  categoryToggle.addEventListener('click', () => {
    categories.querySelector('h2').textContent = categoryToggle.getAttribute('aria-pressed') === 'true' ? 'Dünya Mutfakları' : 'Kategoriler';
    if (categoryToggle.getAttribute('aria-pressed') === 'false') categoryPhotos();
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
  const latest = [...DATA.recipes].sort((a, b) => recipeDate(b) - recipeDate(a)).slice(0, 3);
  const recipes = SET_SECTIONS.block;
  recipes.dataset.recipeLayout = 'v3-selection';
  recipes.innerHTML = `<div class="section-heading-row six-heading"><h2>En son eklenen tarifler</h2><a class="six-see" href="liste.html?sirala=en_yeni" aria-label="En son eklenen tariflerin tümü">Tümü ${fa('arrow-right')}</a></div><div class="collection-body">${latest.map(recipeCard).join('')}</div>`;
  recipes.dataset.order = latest.map(r => r.slug).join(',');

  const chefs = SET_SECTIONS.chefs;
  chefs.querySelector('.six-chef-intro').remove();
  const chefRail = chefs.querySelector('.a-chef-strip');
  chefRail.classList.add('v3-chef-grid');
  chefRail.innerHTML = [WEB.chefs.slice(0, 3), WEB.chefs.slice(3)].map((page, pageIndex) => `<div class="v3-chef-page">${page.map((c, index) => `<article class="a-chef-item"><button class="a-chef-person" data-a-chef="${pageIndex * 3 + index}" aria-label="${esc(c.name)} profili"><span class="a-chef-avatar" aria-hidden="true">${esc(c.name[0])}</span><span class="v3-chef-identity"><strong>${esc(c.name)}</strong><span class="a-chef-count">${esc(c.count)}</span></span></button><button class="a-chef-follow" data-a-chef-follow="${pageIndex * 3 + index}" aria-label="${esc(c.name)} takip et">${fa('plus')} Takip et</button></article>`).join('')}</div>`).join('');
  const kitchen = X.kitchen;
  kitchen.querySelector('h2').textContent = 'Elinde ne var?';
  kitchen.querySelector('.kitchen-heading').insertAdjacentHTML('beforeend', `<span class="v3-tool-symbol" aria-hidden="true">${fa('basket-shopping')}</span>`);
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
  community.style.setProperty('--invitation-photo', `url('${DATA.recipes[7].image}')`);
  community.insertAdjacentHTML('afterbegin', `<span class="v3-invite-symbol" aria-hidden="true">${fa('utensils')}</span>`);
  q('.six-content').replaceChildren(kitchen, categories, recipes, chefs, community);

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
