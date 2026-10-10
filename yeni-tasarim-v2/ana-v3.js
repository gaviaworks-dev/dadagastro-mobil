/* Ana sayfa V3 — built on a byte copy of ana-x6 (V2 "Açılan sahne").
   Shared sources (home-base, six-*, set2-*, set15-*, a-chefs) stay untouched; this file only
   recomposes the page they render. Data: DATA.recipes, WEB.videos, WEB.chefs, WEB.categories.
   Revize 10 Ekim (docs/40 · "Revize R1–R4"): hero slider, öne çıkan slider, tek Dolapta Ne Var, yeni sıra.
   docs/46 birleştirme: ortak bölüm başlığı (ortak-baslik.css), ortak küçük kart + ikişerli slider (DGCard.tile/pairs),
   bütün liste bağlantıları liste-v2'ye, header solid rengi --dg-header-solid (ortak-menu.css). */
(() => {
  const q = (s, r = document) => r.querySelector(s), all = (s, r = document) => [...r.querySelectorAll(s)];
  const page = location.pathname.split('/').pop() || 'ana-v3.html';
  const {banner, fa} = X;
  const LIST = 'liste-v2.html';
  /* Görsel yolları (docs/46): ortak veride adım/benzer tarif görsellerinin bir kısmı göreli '/varliklar/…' (yerelde 404).
     Detaydaki yöntemin aynısı (detay-v2-tarifler.js): veri belleğe alınırken canlı köke çevrilir; ortak dosya değişmez. */
  {const abs = v => typeof v === 'string' && v.startsWith('/varliklar/') ? 'https://dadagastro.com' + v : v;
   const walk = o => { if (Array.isArray(o)) o.forEach((v, i) => { o[i] = abs(v); if (v && typeof v === 'object') walk(v); }); else if (o && typeof o === 'object') for (const k of Object.keys(o)) { o[k] = abs(o[k]); if (o[k] && typeof o[k] === 'object') walk(o[k]); } };
   if (typeof PARITY !== 'undefined') walk(PARITY.recipes); DATA.recipes.forEach(walk);}
  /* Gezinme (docs/46): ortak kaynakların eski hedefleri (liste.html, tarifler.html, detay-c.html, index.html) yeni ekranlara. */
  function adaptLinks(scope = document) {
    for (const a of scope.querySelectorAll('a[href]')) {
      const h = a.getAttribute('href');
      if (/^(?:liste|tarifler)\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace(/^(?:liste|tarifler)\.html/, LIST));
      else if (/^(?:detay-c|tarif-detay)\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace(/^(?:detay-c|tarif-detay)\.html/, 'detay-v2.html'));
      else if (/^index\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace('index.html', page));
    }
  }
  adaptLinks();
  new MutationObserver(rs => rs.forEach(r => r.addedNodes.forEach(n => { if (n.nodeType === 1) adaptLinks(n.parentNode || n); }))).observe(document.body, {childList: true, subtree: true});
  // Ortak bölüm başlığı (ortak-baslik.css): başlık + sağda "Tümü →". Üst etiket yok (docs/46).
  const head = (title, link = '', id = '') => `<div class="section-heading-row dg-head"><h2${id ? ` id="${id}"` : ''}>${title}</h2>${link}</div>`;
  const seeAll = (attrs, label) => `<a class="dg-head__link section-heading-action" ${attrs} aria-label="${label}">Tümü ${fa('arrow-right')}</a>`;
  // Every recipe link on the page (hero, featured, small cards, Dolapta Ne Var results) opens the new detail screen.
  const detail = r => `detay-v2.html?tarif=${encodeURIComponent(r.slug)}&donus=${page}`;
  const norm = s => s.toLocaleLowerCase('tr-TR');
  const media = url => window.SIX_MEDIA?.map?.[url] || url;
  const withAuthor = r => Boolean(r.author && r.author.trim());
  // Recipe author: no photo exists in the data, so the shared initial circle (photo would be background-image cover).
  // One avatar component with the list (ortak-kart.js DGCard.avatar): photo as cover if any, else the initial.
  DGCard.configure({href: r => detail(r)});
  const authorInner = r => `${DGCard.avatar(r.author, r.authorPhoto)}<span class="v3-author-name" title="${esc(r.author)}"><span class="v3-sr">Tarifi ekleyen: </span>${esc(r.author)}</span>`;
  const authorRow = (r, cls) => `<span class="${cls}">${authorInner(r)}</span>`;

  /* ---------- Slider indicator: ?gosterge=a (dots, active long + primary) | b ("2 / 5" counter) ----------
     Same option names and parameter as the list's featured slider (ortak-kart.js); read from the first
     navigation URL too, in case a shared script rewrites the address. */
  const firstUrl = (() => { try { return new URL(performance.getEntriesByType('navigation')[0]?.name || location.href); } catch { return new URL(location.href); } })();
  const GOSTERGE = [firstUrl.searchParams, new URLSearchParams(location.search)].some(p => p.get('gosterge') === 'b') ? 'b' : 'a';
  document.documentElement.dataset.v3Gosterge = GOSTERGE;
  const pagerMarkup = n => GOSTERGE === 'b'
    ? `<span class="v3-pager-count"><span><span data-v3-current>1</span> / ${n}</span></span>`
    : `<span class="v3-pager-dots">${Array.from({length: n}, (_, i) => `<i${i ? '' : ' class="is-on"'}></i>`).join('')}</span>`;

  /* One slider engine for the hero and the featured card: native scroll + snap (swipe), keyboard arrows,
     indicator follows the scroll. Hero only: auto-advance every AUTO_MS, a cloned first slide makes the
     5 → 1 step a forward slide (then an invisible jump back), stops for good on touch / swipe / wheel /
     key / focus, pauses while the hero is off screen or the tab is hidden, never runs with reduced motion. */
  const AUTO_MS = 6000;
  function wireSlider({box, track, pager, count, loop = false, auto = 0}) {
    const step = () => track.clientWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
    const pos = () => Math.round(track.scrollLeft / step());
    let index = -1, timer = 0, stopped = !auto, visible = true, settle = 0;
    const show = i => {
      if (i === index) return;
      index = i;
      all('.v3-pager-dots i', pager).forEach((d, n) => d.classList.toggle('is-on', n === i));
      const c = q('[data-v3-current]', pager); if (c) c.textContent = i + 1;
      box.dataset.index = i;
    };
    const go = i => track.scrollTo({left: i * step(), behavior: motion.matches ? 'auto' : 'smooth'});
    track.addEventListener('scroll', () => {
      const p = pos();
      show(loop ? p % count : Math.min(p, count - 1));
      clearTimeout(settle);
      // Landed on the clone of slide 1: same picture, jump back to the real one without motion.
      settle = setTimeout(() => { if (loop && pos() >= count) track.scrollLeft = (pos() - count) * step(); }, 160);
    }, {passive: true});
    track.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      e.preventDefault();
      go(Math.max(0, pos() + (e.key === 'ArrowRight' ? 1 : -1)));
    });
    const run = () => {
      clearInterval(timer); timer = 0;
      if (!stopped && visible && !document.hidden && !motion.matches) timer = setInterval(() => go(pos() + 1), auto);
      box.dataset.auto = timer ? 'on' : 'off';
    };
    const stop = () => { if (stopped) return; stopped = true; run(); };
    if (auto) {
      for (const type of ['pointerdown', 'touchstart', 'wheel', 'keydown', 'focusin']) box.addEventListener(type, stop, {passive: true});
      new IntersectionObserver(([e]) => { visible = e.intersectionRatio >= .5; run(); }, {threshold: [0, .5, 1]}).observe(box);
      document.addEventListener('visibilitychange', run);
      motion.addEventListener?.('change', () => { if (motion.matches) stop(); });
    }
    show(0);
    run();
    return {go, stop, get index() { return index; }, get auto() { return Boolean(timer); }};
  }
  window.V3_SLIDERS = {};

  /* ---------- Hero: fixed "Ne pişirsem?" + search; photo and suggestion slide underneath (R1) ---------- */
  // Five real recipes with strong, full-frame photos (all 1600px sources, shown down-scaled), five different
  // categories, a short and a long title. None of them repeats in the latest-recipes block.
  const HERO = ['jiao-yan-karides', 'tavuk-curry', 'duduklude-balkan-usulu-lahana', 'tepsi-kadayifi', 'arroz-con-pato'];
  const heroRecipes = HERO.map(s => DATA.recipes.find(r => r.slug.startsWith(s))).filter(r => r && withAuthor(r));
  const heroInfo = r => `<a class="x-recipe v3-hero-recipe" href="${detail(r)}"><span class="v3-hero-copy"><small>Bugün deneyebilirsin · ${r.minutes} dk</small><strong>${esc(X.short(r))}</strong>${authorRow(r, 'v3-hero-author')}</span><span class="x-arrow" aria-hidden="true">${fa('arrow-up-right-from-square')}</span></a>`;
  const heroSlide = (r, i, clone = false) => `<div class="v3-hero-slide"${clone ? ' data-clone aria-hidden="true" inert' : ` role="group" aria-roledescription="slide" aria-label="${i + 1} / ${heroRecipes.length}"`} data-slug="${esc(r.slug)}"><div class="x-photo v3-hero-photo" style="background-image:url('${esc(r.image)}')"${clone ? '' : ` role="img" aria-label="${esc(X.short(r))}"`}></div><div class="x-scene-shade"></div><div class="v3-hero-info six-hero-group">${heroInfo(r)}</div></div>`;
  for (const s of ['.x-scene-photo', '.x-scene-shade', '.x-scene-copy', '.x-scene-label', '.x-heading']) q(s, banner)?.remove();
  banner.insertAdjacentHTML('afterbegin', `<div class="v3-hero-track" role="region" aria-roledescription="carousel" aria-label="Bugün deneyebileceğin tarifler, yatay kaydır" tabindex="0">${heroRecipes.map((r, i) => heroSlide(r, i)).join('')}${heroSlide(heroRecipes[0], 0, true)}</div>`);
  banner.insertAdjacentHTML('beforeend', `<div class="purpose-title v3-hero-top"><div class="six-hero-group"><div class="purpose-copy"><h1 class="x-first">Ne pişirsem?</h1></div><a class="six-search a-global-search" href="arama.html?donus=${page}" aria-label="Genel aramayı aç">${fa('magnifying-glass')}<span>Tarif, şef, video ara</span></a></div></div><div class="v3-pager v3-hero-pager six-hero-group" aria-hidden="true">${pagerMarkup(heroRecipes.length)}</div>`);
  X_DOCK.remove(); // the hero search replaces x6's second, sticky search
  const heroTrack = q('.v3-hero-track', banner);
  V3_SLIDERS.hero = wireSlider({box: banner, track: heroTrack, pager: q('.v3-hero-pager', banner), count: heroRecipes.length, loop: true, auto: AUTO_MS});

  // One shade for every slide (each slide carries an identical copy, so a swipe shows no seam). Upper part
  // follows the title/search geometry; lower part reaches the x6 dark (--x-shade, 86%) 24px above the highest
  // suggestion text of all five slides (long titles included), then the source overlay at the bottom.
  // Same source colour, one gradient, smoothstep ends: no band.
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function sceneShade() {
    const h = banner.clientHeight, top = banner.getBoundingClientRect().top;
    if (!h) return;
    const title = q('.v3-hero-top h1', banner).getBoundingClientRect(), search = q('.v3-hero-top .six-search', banner).getBoundingClientRect();
    const space = parseFloat(getComputedStyle(banner).getPropertyValue('--space-48')) || 48;
    const textTop = Math.min(...all('.v3-hero-slide:not([data-clone]) .v3-hero-copy', banner).map(c => c.getBoundingClientRect().top - top));
    const holdTo = title.bottom - top + space / 4, clearAt = search.bottom - top + space * 2, max = .86;
    const darkAt = Math.min(h * .75, textTop - space / 2), fadeFrom = Math.min(h * .45, darkAt - space * 2);
    const lower = y => y <= darkAt ? max * smooth((y - fadeFrom) / (darkAt - fadeFrom)) : max + (1 - max) * (y - darkAt) / (h - darkAt);
    const stops = Array.from({length: 41}, (_, i) => {
      const y = h * i / 40, upper = y <= holdTo ? max : max * (1 - smooth((y - holdTo) / (clearAt - holdTo)));
      return `color-mix(in srgb,var(--overlay) ${(Math.max(upper, lower(y)) * 100).toFixed(2)}%,transparent) ${(i * 2.5).toFixed(1)}%`;
    });
    banner.style.setProperty('--v3-scene-shade', `linear-gradient(180deg,${stops.join(',')})`);
  }
  new ResizeObserver(sceneShade).observe(banner);
  document.fonts.ready.then(sceneShade);
  sceneShade();
  // x6's opening scene, applied to every slide photo; header search icon once the hero search is under the header.
  const heroSearch = q('.v3-hero-top .six-hero-group', banner);
  X_SCROLL = () => {
    const y = Math.min(scrollY, 400), reduced = motion.matches;
    banner.style.setProperty('--scene-collapse', `${reduced ? 0 : Math.min(y * .24, 96)}px`);
    const t = reduced ? 'none' : `translateY(${y * .12}px) scale(${1 - y * .00018})`;
    all('.v3-hero-photo', banner).forEach(p => { p.style.transform = t; });
    sceneShade();
    const icon = q('.a-header-search');
    if (icon) icon.hidden = heroSearch.style.visibility !== 'hidden';
  };

  // In-page jumps (menu rows, #anchors): the section's top lands right under the sticky header. The hero shrinks
  // while the page scrolls (x6 opening scene, --scene-collapse), so the target is corrected by the collapse it will have.
  function toSection(el, instant = false) {
    const header = q('.topbar').getBoundingClientRect().height;
    const now = parseFloat(banner.style.getPropertyValue('--scene-collapse')) || 0;
    const raw = el.getBoundingClientRect().top + scrollY - header;
    const final = motion.matches ? 0 : Math.min(Math.min(Math.max(raw - 96, 0), 400) * .24, 96);
    scrollTo({top: Math.max(0, raw - (final - now)), behavior: motion.matches || instant ? 'auto' : 'smooth'});
    // Arriving with an anchor: jump without motion, then settle once the scroll-driven hero collapse has applied.
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => {
      const off = el.getBoundingClientRect().top - q('.topbar').getBoundingClientRect().bottom;
      if (Math.abs(off) > .5) scrollTo({top: scrollY + off, behavior: 'auto'});
    }));
  }
  window.V3_TO_SECTION = toSection;

  // Text sits on the photo: the source dark (--overlay) rises from 0 to 80% over 48px and is full
  // 24px above the first line (canon), then 90% at the bottom. Re-measured after every render.
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  // Recipe tiles (DGCard.tile) use the same curve in ortak-kart.js (DGCard.veils); videos and featured cards here.
  function cardVeils(root = document) {
    DGCard.veils(root);
    for (const el of all('.v3-content .v3-video', root)) {
      const photo = q('.v3-video-cover', el), text = q('.v3-video-text', el);
      const box = photo.getBoundingClientRect();
      if (!text || !box.height) continue;
      const end = Math.max(0, text.getBoundingClientRect().top - box.top - 24), start = Math.max(0, end - 48);
      const stops = Array.from({length: 9}, (_, i) => `color-mix(in srgb,var(--overlay) ${(ease(i / 8) * 80).toFixed(1)}%,transparent) ${(start + (end - start) * i / 8).toFixed(1)}px`);
      photo.style.setProperty('--v3-veil', `linear-gradient(180deg,transparent 0,${stops.join(',')},color-mix(in srgb,var(--overlay) 90%,transparent) 100%)`);
    }
    // Featured cards (ortak-kart.js .dg-feature): the same curve, measured from the info block.
    for (const box of all('.v3-content .dg-feature__media', root)) {
      const info = q('.dg-feature__info', box), h = box.getBoundingClientRect().height;
      if (!info || !h) continue;
      const end = Math.max(0, info.getBoundingClientRect().top - box.getBoundingClientRect().top - 24), start = Math.max(0, end - 48);
      const stops = Array.from({length: 9}, (_, i) => `color-mix(in srgb,var(--overlay) ${(ease(i / 8) * 80).toFixed(1)}%,transparent) ${(start + (end - start) * i / 8).toFixed(1)}px`);
      box.style.setProperty('--dg-veil', `linear-gradient(180deg,transparent 0,${stops.join(',')},color-mix(in srgb,var(--overlay) 90%,transparent) 100%)`);
    }
  }

  /* ---------- 1. En son eklenen tarifler: featured slider + small cards two by two (R2.1, EK A1) ----------
     Real dates (recipeDate, newest first, source order on ties). Hero recipes are excluded first; the three newest
     go to the slider (the list's DGCard.slider, manual), the next eight to the pair slider: nothing repeats.
     Pair slider (docs/46): the shared DGCard.pairs (same component as the detail's similar recipes): exactly two cards
     on screen, page-by-page snap, no half card, no page indicator. */
  const FEATURED = 3, PAIRS = 8;
  const latest = DATA.recipes.filter(withAuthor).filter(r => !heroRecipes.includes(r)).sort((a, b) => recipeDate(b) - recipeDate(a));
  const featured = latest.slice(0, FEATURED), pairs = latest.slice(FEATURED, FEATURED + PAIRS);
  const recipes = SET_SECTIONS.block;
  recipes.dataset.recipeLayout = 'v3-latest';
  recipes.dataset.order = [...featured, ...pairs].map(r => r.slug).join(',');
  recipes.innerHTML = `${head('En son eklenen tarifler', seeAll(`href="${LIST}?sirala=en_yeni"`, 'En son eklenen tariflerin tümü'))}<div class="v3-latest">${DGCard.slider(featured)}${DGCard.pairs(pairs, 'Diğer yeni tarifler')}</div>`;
  // Slides beside the first are off screen horizontally: load their photos now so a swipe never shows an empty card.
  all('.dg-slider [data-photo-src]', recipes).forEach(el => { el.dataset.lazyBound = '1'; el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; });
  DGCard.wireSliders(recipes);
  DGCard.wirePairs(recipes);

  /* ---------- 2. Kategoriler / Dünya Mutfakları: two one-row strips of equal height (R2.2) ----------
     Both items share one media height token (--v3-strip-media) and one text block (name in two reserved lines;
     the count sits inside the media), so the two panels are the same height by construction; no panel height is assigned. */
  const categories = q('.six-categories');
  categories.classList.add('v3-cats');
  const countOf = s => Number(String(s).replace(/[^\d]/g, '')) || 0;
  // Cuisine flags: the same set and map as liste-v2.js (web /varliklar/flags/xx.svg -> assets/flags; Laravel
  // public/flags, same SHA). The one cuisine without a country (Balkan) gets a neutral solid globe in the same frame.
  const FLAG = {turk: 'tr', italyan: 'it', fransiz: 'fr', ispanyol: 'es', portekiz: 'pt', alman: 'de', avusturya: 'at', ingiliz: 'gb', irlanda: 'ie', yunan: 'gr', rus: 'ru', ukrayna: 'ua', gurcu: 'ge', azerbaycan: 'az', ermeni: 'am', kazak: 'kz', ozbek: 'uz', iran: 'ir', irak: 'iq', suriye: 'sy', lubnan: 'lb', urdun: 'jo', 'suudi-arabistan': 'sa', misir: 'eg', fas: 'ma', tunus: 'tn', etiyopya: 'et', 'guney-afrika': 'za', hint: 'in', pakistan: 'pk', cin: 'cn', japon: 'jp', kore: 'kr', tayland: 'th', vietnam: 'vn', malezya: 'my', endonezya: 'id', filipin: 'ph', amerikan: 'us', kanada: 'ca', meksika: 'mx', brezilya: 'br', arjantin: 'ar', peru: 'pe', kolombiya: 'co', kuba: 'cu', jamaika: 'jm', avustralya: 'au', 'yeni-zelanda': 'nz'};
  const cuisines = (PARITY.list.groups.find(g => g.key === 'mutfak')?.options || []).map(o => {
    const m = o.label.match(/^(.*?)\s+([\d.,]+)\s*$/), code = FLAG[o.value.replace(/-mutfagi$/, '')];
    return {name: m ? m[1] : o.label, count: m ? `${m[2]} tarif` : '', n: m ? countOf(m[2]) : 0, href: `${LIST}?mutfak%5B%5D=${encodeURIComponent(o.value)}`, flag: code ? `assets/flags/${code}.svg` : ''};
  }).sort((a, b) => b.n - a.n);
  // List screen family (liste-v2 dg-mark): 4:3 flag with a hairline ring; categories as a cropped square photo.
  const flagMark = c => c.flag ? `<img class="v3-flag" src="${c.flag}" alt="" width="40" height="30" loading="lazy">` : `<span class="v3-flag v3-flag-none">${fa('earth-europe')}</span>`;
  const flagFrame = c => `<span class="v3-flag-frame">${flagMark(c)}</span>`;
  const cats = WEB.categories.map(c => ({name: c.name, count: c.count, n: countOf(c.count), href: `${LIST}?kategori=${encodeURIComponent(c.name)}`, image: window.V3_KATEGORI_MEDIA?.[c.image] || ''}));
  const lead = [...cats].filter(c => c.image).sort((a, b) => b.n - a.n).slice(0, 12);
  let catMode = 'cat';
  // Count inside the media (photo capsule / under the flag); below it only the name, in two reserved lines.
  const stripText = c => `<span class="v3-strip-text"><b>${esc(c.name)}</b></span>`;
  const tile = c => `<a class="v3-strip-item v3-cat-card" href="${c.href}"><span class="v3-strip-media v3-cat-media"><span class="photo" style="background-image:url('${esc(c.image)}')"></span><span class="photo-meta v3-cat-count"><span>${fa('book-open')} ${esc(c.count)}</span></span></span>${stripText(c)}</a>`;
  const cuisineItem = c => `<a class="v3-strip-item v3-cuisine" href="${c.href}"><span class="v3-strip-media v3-cuisine-media">${flagMark(c)}<span class="v3-cuisine-count">${esc(c.count)}</span></span>${stripText(c)}</a>`;
  function renderCategories() {
    const total = catMode === 'cat' ? cats.length : cuisines.length;
    // Both panels share one grid cell and are the same height: switching never moves the page.
    all('[data-v3-panel]', categories).forEach(panel => { const on = panel.dataset.v3Panel === catMode; panel.classList.toggle('is-active', on); panel.toggleAttribute('inert', !on); panel.setAttribute('aria-hidden', !on); });
    q('[data-v3-cat-all]', categories).setAttribute('aria-label', `${catMode === 'cat' ? 'Tüm kategoriler' : 'Tüm dünya mutfakları'} (${total})`);
    all('[data-v3-cat]', categories).forEach(b => { const on = b.dataset.v3Cat === catMode; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
  }
  function categorySheet() {
    const list = catMode === 'cat' ? cats : cuisines;
    sheet(catMode === 'cat' ? 'Kategoriler' : 'Dünya Mutfakları', `<div class="v3-cat-list">${list.map(c => `<a class="v3-cat-row" href="${c.href}">${catMode === 'cat' ? (c.image ? `<span class="photo" style="background-image:url('${esc(c.image)}')"></span>` : `<span class="v3-cat-symbol">${fa('bowl-food')}</span>`) : flagFrame(c)}<span class="v3-cat-text"><b>${esc(c.name)}</b><span>${esc(c.count)}</span></span>${fa('chevron-right')}</a>`).join('')}</div>`);
    applyTypeRoles(q('.v3-cat-list'));
  }
  categories.innerHTML = `${head('Kategoriler &amp; Dünya Mutfakları', seeAll('href="" data-v3-cat-all', 'Tüm kategoriler'))}<div class="segmented v3-tabs" role="tablist" aria-label="Kategori türü"><button role="tab" id="v3-cat-tab" aria-controls="v3-cat-panel" data-v3-cat="cat" aria-selected="true">${fa('bowl-food')}<span>Kategoriler</span></button><button role="tab" id="v3-cuisine-tab" aria-controls="v3-cuisine-panel" data-v3-cat="cuisine" aria-selected="false" tabindex="-1">${fa('earth-europe')}<span>Dünya Mutfakları</span></button></div><div class="v3-cat-stage"><div class="v3-strip v3-cat-strip" id="v3-cat-panel" role="tabpanel" aria-labelledby="v3-cat-tab" data-v3-panel="cat">${lead.map(tile).join('')}</div><div class="v3-strip v3-cuisine-strip" id="v3-cuisine-panel" role="tabpanel" aria-labelledby="v3-cuisine-tab" data-v3-panel="cuisine">${cuisines.slice(0, 16).map(cuisineItem).join('')}</div></div>`;
  categories.addEventListener('click', e => {
    const mode = e.target.closest('[data-v3-cat]');
    if (mode) { catMode = mode.dataset.v3Cat; renderCategories(); }
    if (e.target.closest('[data-v3-cat-all]')) { e.preventDefault(); categorySheet(); }
  });
  q('.v3-tabs', categories).addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    catMode = catMode === 'cat' ? 'cuisine' : 'cat';
    renderCategories();
    q(`[data-v3-cat="${catMode}"]`, categories).focus();
  });

  /* ---------- 3. Dolapta Ne Var? — one flow (R4) ----------
     Live dadagastro.com/dolapta-ne-var (10 Ekim, read only): ingredient box ("Elindeki malzeme — örn. yumurta,
     tavuk, peynir…"), 8 groups / 185 ingredients, "Elinde N malzeme", "Tümünü temizle", results "N tarif bulundu ·
     elindeki N malzemeyle", recipes missing one or two ingredients included. Mobile (EK A2): type/add with an
     include/exclude switch, popular chips, two chip strips (Dolaptakiler / Hariç tuttuklarım), "N tarif bul". Suggestions = the live catalogue below; matching runs on the prototype's 32 real
     recipes (no backend pool is implied: every suggestion shows its local recipe count). In-page state, as live. */
  const CATALOG = [['Sebzeler', 'carrot', 'Bezelye|Biber|Brokoli|Domates|Enginar|Havuç|Ispanak|Kabak|Karnabahar|Kereviz|Lahana|Mantar|Mısır|Pancar|Patates|Patlıcan|Pırasa|Salatalık|Sarımsak|Soğan|Turp'], ['Meyveler', 'apple-whole', 'Ananas|Armut|Avokado|Elma|Erik|Greyfurt|Hindistan Cevizi|Karpuz|Kavun|Kayısı|Kiraz|Limon|Mandalina|Mango|Muz|Nar|Portakal|Vişne|Çilek|Üzüm|İncir|Şeftali'], ['Kırmızı Et', 'bacon', 'Antrikot|Biftek|Bonfile|Ciğer|Dana Eti|Kaburga|Kavurma|Keçi Eti|Kontrfile|Koyun Eti|Kuzu Eti|Kuşbaşı|Kıyma|Pastırma|Pirzola|Sakatat|Sucuk|İncik'], ['Tavuk ve Kümes Ürünleri', 'drumstick-bite', 'Bütün Tavuk|Bıldırcın Eti|Bıldırcın Yumurtası|Hindi Eti|Hindi Göğsü|Kaz Eti|Tavuk But|Tavuk Ciğeri|Tavuk Göğsü|Tavuk Kanat|Tavuk Pirzola|Tavuk Yumurtası|Ördek Eti'], ['Balık ve Deniz Ürünleri', 'fish', 'Ahtapot|Alabalık|Barbun|Deniz Tarağı|Hamsi|Istakoz|Kalamar|Kalkan|Karides|Levrek|Lüfer|Mezgit|Midye|Palamut|Sardalya|Somon|Ton Balığı|Uskumru|Yengeç|Çipura|İstavrit'], ['Süt Ürünleri', 'cheese', 'Ayran|Beyaz Peynir|Bitkisel Süt Alternatifleri|Cheddar|Kaymak|Kaşar Peyniri|Kefir|Krema|Labne|Lor Peyniri|Mozzarella|Parmesan|Süt|Süzme Yoğurt|Tereyağı|Tulum Peyniri|Yoğurt|Çökelek'], ['Tahıllar ve Bakliyatlar', 'wheat-awn', 'Antep Fıstığı|Arpa|Ay Çekirdeği|Badem|Bakla|Barbunya|Bulgur|Buğday|Börülce|Ceviz|Chia Tohumu|Erişte|Fındık|Kabak Çekirdeği|Kaju|Karabuğday|Keten Tohumu|Kinoa|Kuru Fasulye|Kuskus|Makarna|Maş Fasulyesi|Mercimek|Nohut|Noodle|Pirinç|Soya Fasulyesi|Susam|Un|Yer Fıstığı|Yulaf|Çavdar|İrmik|Şehriye'], ['Baharatlar, Otlar ve Soslar', 'mortar-pestle', 'Acı Sos|Bal|Barbekü Sos|Biber Salçası|Biberiye|Dereotu|Domates Salçası|Fesleğen|Frenk Soğanı|Hardal|Karabiber|Kekik|Ketçap|Kimyon|Kişniş|Köri|Kırmızı Toz Biber|Maydanoz|Mayonez|Muskat|Nane|Nar Ekşisi|Pekmez|Pesto Sos|Pul Biber|Roka|Safran|Sirke|Soya Sosu|Sumak|Tahin|Tarçın|Taze Kekik|Taze Nane|Taze Soğan|Tuz|Yenibahar|Zerdeçal']];
  const SPICES = 'Baharatlar, Otlar ve Soslar';
  const words = s => norm(s).split(/[^a-zçğıöşü]+/).filter(Boolean);
  // Word level, Turkish-suffix tolerant: "Un" ~ "buğday unu", "Tavuk Göğsü" ~ "tavuk göğsü kuşbaşı"; "biber" ≠ "karabiber".
  const wordHit = (w, v) => v.startsWith(w) || (w.length > 4 && w.startsWith(v) && w.length - v.length <= 2);
  const uses = (r, name) => { const want = words(name); return r.ingredients.some(i => { const have = words(i.name); return want.every(w => have.some(v => wordHit(w, v))); }); };
  const pool = CATALOG.flatMap(([group, icon, list]) => list.split('|').map(name => ({name, group, icon, n: DATA.recipes.filter(r => uses(r, name)).length})));
  // Popular = most used in the real recipe set; seasonings (salt, pepper…) are left to typing.
  const POPULAR = pool.filter(x => x.n && x.group !== SPICES).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name, 'tr')).slice(0, 8);
  // State: every added ingredient is either in the pantry (have) or excluded (ex). In-page state, as live.
  const items = [];
  let mode = 'have', searched = false, active = -1, options = [];
  const LABEL = {have: 'Dolaptakiler', ex: 'Hariç tuttuklarım'};
  const dolap = document.createElement('section');
  dolap.className = 'six-module v3-dolap';
  dolap.id = 'dolap';
  dolap.setAttribute('aria-labelledby', 'v3-dolap-title');
  const group = k => `<div class="v3-dolap-group" data-v3-dolap-group="${k}"><div class="v3-dolap-label">${fa(k === 'have' ? 'circle-check' : 'ban')}<span>${LABEL[k]}</span><output data-v3-dolap-n="${k}">0</output></div><div class="v3-dolap-picks" data-v3-dolap-rail="${k}" aria-label="${LABEL[k]}" aria-live="polite"></div></div>`;
  dolap.innerHTML = `${head('Dolapta Ne Var?', '', 'v3-dolap-title')}
    <div class="v3-surface v3-dolap-card">
      <p class="v3-dolap-lead">Dolabındaki malzemeleri işaretle — sana yapabileceğin tarifleri anında listeleyelim.</p>
      <div class="v3-dolap-box">
        <div class="v3-dolap-field input-frame">${fa('basket-shopping')}<input id="v3-dolap-input" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="v3-dolap-options" autocomplete="off" enterkeyhint="done" placeholder="Malzeme yaz, ör. domates" aria-label="Malzeme yaz ve ekle" aria-describedby="v3-dolap-mode-hint"><button type="button" class="v3-dolap-clear" data-v3-dolap-clear aria-label="Yazılanı temizle">${fa('xmark')}</button></div>
        <ul class="v3-dolap-options" id="v3-dolap-options" role="listbox" aria-label="Malzeme önerileri" hidden></ul>
      </div>
      <div class="segmented v3-tabs v3-dolap-mode" role="group" aria-label="Eklediğin malzeme" id="v3-dolap-mode-hint"><button type="button" data-v3-dolap-mode="have" aria-pressed="true">${fa('basket-shopping')}<span>Dolaba ekle</span></button><button type="button" data-v3-dolap-mode="ex" aria-pressed="false">${fa('ban')}<span>Hariç tut</span></button></div>
      <div class="v3-dolap-popular"><div class="v3-dolap-label"><span>Popüler malzemeler</span></div><div class="v3-dolap-chips">${POPULAR.map(x => `<button type="button" class="chip v3-dolap-chip" data-v3-dolap-pop="${esc(x.name)}" data-state="none" aria-pressed="false">${fa('plus')}${fa('check')}${fa('minus')}<span>${esc(x.name)}</span></button>`).join('')}</div></div>
      <div class="v3-dolap-picked" aria-label="Seçimin"><div class="v3-dolap-row"><div class="v3-dolap-label v3-dolap-title"><span>Seçimin</span></div><button type="button" class="v3-dolap-reset" data-v3-dolap-reset>Tümünü temizle</button></div>${group('have')}${group('ex')}</div>
      <button type="button" class="button v3-dolap-find" data-v3-dolap-find>${fa('magnifying-glass')}<span data-v3-dolap-find-label>Tarif bul</span></button>
      <div class="v3-dolap-results" data-v3-dolap-results hidden><output class="v3-dolap-count" aria-live="polite"></output><div class="v3-dolap-results-body"></div></div>
      <a class="six-see v3-dolap-more" href="${LIST}" data-v3-dolap-more>Daha fazla süzgeç ${fa('arrow-right')}</a>
    </div>`;
  const input = q('#v3-dolap-input', dolap), list = q('#v3-dolap-options', dolap), results = q('[data-v3-dolap-results]', dolap);
  const field = q('.v3-dolap-field', dolap);
  const of = k => items.filter(x => x.mode === k).map(x => x.name);
  const find = name => items.find(x => norm(x.name) === norm(name));
  // Pantry ingredients rank recipes (most matches first, so one or two missing still show, as live); any excluded
  // ingredient removes a recipe. Only exclusions: every recipe without them.
  function matchesOf() {
    const have = of('have'), ex = of('ex');
    if (!have.length && !ex.length) return [];
    return DATA.recipes.filter(withAuthor)
      .filter(r => !ex.some(n => uses(r, n)))
      .map(r => ({r, hit: have.filter(n => uses(r, n)).length}))
      .filter(x => !have.length || x.hit > 0)
      .sort((a, b) => b.hit - a.hit || recipeDate(b.r) - recipeDate(a.r))
      .map(x => x.r);
  }
  const pickChip = x => `<span class="v3-pick is-${x.mode}"><button type="button" class="v3-pick-main" data-v3-pick-toggle="${esc(x.name)}" aria-label="${esc(x.name)}: ${x.mode === 'have' ? 'dolapta. Hariç tutmak için dokun' : 'hariç. Dolaba almak için dokun'}">${fa(x.mode === 'have' ? 'check' : 'minus')}<span>${esc(x.name)}</span></button><button type="button" class="v3-pick-x" data-v3-pick-remove="${esc(x.name)}" aria-label="${esc(x.name)} — kaldır">${fa('xmark')}</button></span>`;
  const EMPTY = {have: 'Henüz malzeme eklemedin.', ex: 'Sevmediğin ya da tüketmediğin malzemeler.'};
  function renderPicked(focusName = '') {
    for (const k of ['have', 'ex']) {
      const rail = q(`[data-v3-dolap-rail="${k}"]`, dolap), names = items.filter(x => x.mode === k);
      rail.innerHTML = names.length ? names.map(pickChip).join('') : `<span class="v3-dolap-empty">${EMPTY[k]}</span>`;
      q(`[data-v3-dolap-n="${k}"]`, dolap).textContent = names.length;
      // Show the chip just added or moved: the strip scrolls, the module does not grow.
      const target = focusName && [...rail.querySelectorAll('[data-v3-pick-toggle]')].find(b => b.dataset.v3PickToggle === focusName);
      if (target) rail.scrollLeft = target.parentElement.offsetLeft - rail.offsetLeft - (rail.clientWidth - target.parentElement.offsetWidth);
    }
    all('[data-v3-dolap-pop]', dolap).forEach(b => { const x = find(b.dataset.v3DolapPop), st = x ? x.mode : 'none'; b.dataset.state = st; b.setAttribute('aria-pressed', String(Boolean(x))); b.setAttribute('aria-label', `${b.dataset.v3DolapPop}${x ? (x.mode === 'have' ? ', dolapta — çıkar' : ', hariç — çıkar') : ''}`); });
    q('[data-v3-dolap-reset]', dolap).style.visibility = items.length ? '' : 'hidden';
    const found = matchesOf();
    q('[data-v3-dolap-find-label]', dolap).textContent = items.length ? `${found.length} tarif bul` : 'Tarif bul';
    const have = of('have');
    q('[data-v3-dolap-more]', dolap).setAttribute('href', have.length ? `${LIST}?malzeme=${encodeURIComponent(have.join(','))}` : LIST);
    if (searched) renderResults(found);
  }
  // Results keep one height (the card strip's) whether cards or the empty message show: no jump.
  function renderResults(found = matchesOf()) {
    results.hidden = false;
    const have = of('have').length, ex = of('ex').length;
    q('.v3-dolap-count', results).textContent = items.length ? `${found.length} tarif bulundu · elindeki ${have} malzemeyle${ex ? ` · ${ex} hariç` : ''}` : 'Dolabın boş görünüyor';
    q('.v3-dolap-results-body', results).innerHTML = !items.length
      ? '<div class="kitchen-empty"><strong>Birkaç malzeme ekle.</strong><span>Onlarla pişirebileceğin denenmiş tarifleri getirelim.</span></div>'
      : found.length ? `<div class="v3-dolap-rail" aria-label="Dolabındakilerle tarifler">${found.slice(0, 6).map(DGCard.tile).join('')}</div>` : '<div class="kitchen-empty"><strong>Bu seçimle tarif bulunamadı.</strong><span>Bir hariç tutmayı kaldır ya da başka bir malzeme ekle.</span></div>';
    hydratePhotos(results);
    applyTypeRoles(results);
    DGCard.veils(results);
    syncPhotoReadability();
  }
  const add = (name, as = mode) => {
    const clean = name.trim().replace(/\s+/g, ' ');
    if (!clean) return;
    const known = pool.find(x => norm(x.name) === norm(clean))?.name || clean;
    const x = find(known);
    if (x) x.mode = as; else items.push({name: known, mode: as});
    renderPicked(known);
  };
  const remove = name => { items.splice(items.findIndex(x => x.name === name), 1); renderPicked(); };
  function suggest() {
    const text = input.value.trim(), t = norm(text);
    field.dataset.filled = String(Boolean(input.value));
    if (!t) { closeList(); return; }
    const starts = x => words(x.name).some(w => w.startsWith(t)) || norm(x.name).startsWith(t);
    const found = pool.filter(x => !find(x.name) && norm(x.name).includes(t)).sort((a, b) => starts(b) - starts(a) || b.n - a.n || a.name.localeCompare(b.name, 'tr')).slice(0, 6);
    const exact = pool.some(x => norm(x.name) === t);
    const free = exact ? [] : [{name: text.charAt(0).toLocaleUpperCase('tr') + text.slice(1), free: true, n: DATA.recipes.filter(r => uses(r, text)).length}];
    options = [...found, ...free];
    const verb = mode === 'have' ? 'ekle' : 'hariç tut';
    list.innerHTML = options.map((x, i) => `<li role="option" id="v3-dolap-opt-${i}" class="v3-dolap-option" data-v3-dolap-opt="${i}" aria-selected="false">${fa(x.free ? (mode === 'have' ? 'plus' : 'minus') : x.icon)}<span>${x.free ? `“${esc(x.name)}” ${verb}` : esc(x.name)}</span><small>${x.n} tarif</small></li>`).join('');
    list.hidden = !options.length;
    input.setAttribute('aria-expanded', String(!list.hidden));
    setActive(-1);
  }
  function setActive(i) {
    active = i;
    all('[role=option]', list).forEach((o, n) => o.setAttribute('aria-selected', String(n === i)));
    if (i >= 0) { input.setAttribute('aria-activedescendant', `v3-dolap-opt-${i}`); q(`#v3-dolap-opt-${i}`, list)?.scrollIntoView({block: 'nearest'}); }
    else input.removeAttribute('aria-activedescendant');
  }
  function closeList() { list.hidden = true; list.innerHTML = ''; options = []; input.setAttribute('aria-expanded', 'false'); setActive(-1); }
  const choose = i => { const x = options[i]; if (!x) return; add(x.name); input.value = ''; field.dataset.filled = 'false'; closeList(); input.focus(); };
  const setMode = k => { mode = k; all('[data-v3-dolap-mode]', dolap).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v3DolapMode === k))); if (input.value) suggest(); };
  input.addEventListener('input', suggest);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' && options.length) { e.preventDefault(); setActive((active + 1) % options.length); }
    else if (e.key === 'ArrowUp' && options.length) { e.preventDefault(); setActive((active - 1 + options.length) % options.length); }
    // Enter: the highlighted row; else the catalogue name that starts with the text; else the text itself.
    else if (e.key === 'Enter') { e.preventDefault(); if (options.length) choose(active >= 0 ? active : Math.max(0, options.findIndex(x => x.free || norm(x.name).startsWith(norm(input.value.trim()))))); }
    else if (e.key === 'Escape' && !list.hidden) { e.preventDefault(); closeList(); }
  });
  list.addEventListener('pointerdown', e => e.preventDefault()); // keep the keyboard open while choosing
  dolap.addEventListener('click', e => {
    const opt = e.target.closest('[data-v3-dolap-opt]');
    if (opt) return choose(Number(opt.dataset.v3DolapOpt));
    if (e.target.closest('[data-v3-dolap-clear]')) { input.value = ''; field.dataset.filled = 'false'; closeList(); input.focus(); return; }
    const m = e.target.closest('[data-v3-dolap-mode]');
    if (m) return setMode(m.dataset.v3DolapMode);
    const pop = e.target.closest('[data-v3-dolap-pop]');
    if (pop) { const n = pop.dataset.v3DolapPop; find(n) ? remove(find(n).name) : add(n); return; }
    const tg = e.target.closest('[data-v3-pick-toggle]');
    if (tg) { const x = find(tg.dataset.v3PickToggle); x.mode = x.mode === 'have' ? 'ex' : 'have'; renderPicked(x.name); q(`[data-v3-pick-toggle="${CSS.escape(x.name)}"]`, dolap)?.focus(); return; }
    const rm = e.target.closest('[data-v3-pick-remove]');
    if (rm) { remove(rm.dataset.v3PickRemove); input.focus(); return; }
    if (e.target.closest('[data-v3-dolap-reset]')) { items.length = 0; renderPicked(); input.focus(); return; }
    if (e.target.closest('[data-v3-dolap-find]')) {
      if (!items.length) { toast('Önce en az bir malzeme ekle.'); input.focus(); return; }
      searched = true;
      renderResults();
      results.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'nearest'});
    }
  });
  document.addEventListener('pointerdown', e => { if (!list.hidden && !e.target.closest('.v3-dolap-box')) closeList(); });
  renderPicked();
  // Every Dolapta Ne Var entry point (drawer, centre panel, #dolap from other screens) lands on this module.
  function openPantry() {
    if (siteDrawer.open) q('[data-drawer-close]', siteDrawer)?.click();
    if (genericDialog.open) genericDialog.close();
    toSection(dolap);
  }
  window.addEventListener('click', e => {
    if (!e.target.closest('[data-six-fridge],[data-v3-open-pantry]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openPantry();
  }, true);

  /* ---------- 4. Video tarifler: Video Mutfağı design kept (no author: the video data has none) ---------- */
  // Title + views sit inside the cover on the same text-geometry veil as recipe cards. Duration (top-left) and play
  // (top-right) are one pair in the recipe cards' glass: the list's .dg-meta badge and a play mark sized like .dg-save.
  const videos = SET_SECTIONS.videos;
  videos.className = 'six-module six-videos v3-videos';
  videos.id = 'video'; // menu "Videolar" from every screen lands here (ana-v3.html#video)
  videos.removeAttribute('data-video-layout');
  const video = (v, i, lead = false) => `<button class="six-video-card v3-video${lead ? ' v3-video-lead' : ''}" data-six-video="${i}" aria-label="${esc(v.title)} videosunu aç, ${esc(v.time)}"><span class="v3-video-cover"><span class="photo" style="background-image:url('${esc(media(v.image))}')"></span><span class="v3-video-shade"></span><span class="dg-meta v3-video-time"><span>${esc(v.time)}</span></span><span class="dg-play" aria-hidden="true">${fa('play')}</span><span class="v3-video-text"><strong>${esc(v.title)}</strong><span>${fa('eye')} ${esc(v.views)} izlenme</span></span></span></button>`;
  videos.innerHTML = `${head('Video Mutfağı', seeAll('href="" data-six-videos', 'Video Mutfağı — tüm videolar'))}${video(WEB.videos[0], 0, true)}<div class="v3-video-rail" aria-label="Diğer videolar">${WEB.videos.slice(1).map((v, i) => video(v, i + 1)).join('')}</div>`;

  /* ---------- 5. Şefler: web "Şefler & Yazarlar · Tarifin ustaları" card structure ---------- */
  const chefs = SET_SECTIONS.chefs;
  chefs.className = 'six-module six-chefs a-chefs v3-chefs';
  chefs.innerHTML = `${head('Şefler &amp; Yazarlar', seeAll(`href="${LIST}"`, 'Tüm tarifler'))}<div class="v3-chef-row" aria-label="Şefler" tabindex="0">${WEB.chefs.map((c, i) => `<article class="v3-chef-card"><button class="v3-chef-person" data-a-chef="${i}" aria-label="${esc(c.name)} profili, ${esc(c.count)}"><span class="v3-chef-av" aria-hidden="true">${esc(c.name.slice(0, 1).toLocaleUpperCase('tr'))}</span><b>${esc(c.name)}</b><span class="v3-chef-count">${esc(c.count)}</span></button><button class="v3-chef-follow" data-a-chef-follow="${i}" aria-label="${esc(c.name)} takip et">${fa('plus')} Takip Et</button></article>`).join('')}<button class="v3-chef-cta" data-a-chef-join>${fa('circle-plus')}<b>Sen de Şef Ol</b><span>Tarifini paylaş, rozetini kazan</span></button></div>`;

  /* ---------- 6. Topluluğa Katıl: x6 keeps the web source copy and light surface (unchanged) ---------- */
  const community = q('.six-community');
  q('.eyebrow', community).innerHTML = `${fa('users')} Topluluğa Katıl`;
  q('[data-six-share]', community).innerHTML = `${fa('circle-plus')} Tarifini Paylaş`;

  /* ---------- Order (fixed; reasons in docs/40 · Revize R2) ---------- */
  const content = q('.six-content');
  content.classList.replace('six-content', 'v3-content'); // shared forced .six-content child rules stop here
  content.replaceChildren(recipes, categories, dolap, videos, chefs, community);

  // The featured slides take the canonical featured title role.
  const baseTypeRoles = applyTypeRoles;
  applyTypeRoles = function (root = document) {
    baseTypeRoles(root);
    all('.v3-content .dg-feature h3').forEach(h => { h.dataset.typeRole = 'featured'; });
  };

  /* ---------- Side menu: shared component (ortak-menu.js); this page answers its in-page rows ---------- */
  const showCategories = mode => {
    catMode = mode;
    renderCategories();
    toSection(categories);
  };
  // "Videolar" is the current row while the video section holds the upper third of the screen under the header.
  const inVideos = () => {
    const header = q('.topbar').getBoundingClientRect().bottom, line = header + (innerHeight - header) / 3, r = videos.getBoundingClientRect();
    return r.top <= line && r.bottom > line;
  };
  window.OrtakMenu?.configure({
    active: () => (inVideos() ? 'videos' : 'home'),
    links: {home: page, recipes: LIST, categories: LIST, cuisines: LIST, videos: `${page}#video`, plate: `tabaktan-tarif.html?donus=${page}`},
    actions: {
      videos: () => toSection(videos),
      ask: () => q('.bottom-nav [data-photo-entry]').click(),
      pantry: () => openPantry(),
      tips: () => q('.bottom-nav [data-six-tips]').click(),
      categories: () => showCategories('cat'),
      cuisines: () => showCategories('cuisine')
    }
  });

  renderCategories();
  hydratePhotos(document);
  applyTypeRoles(document);
  applyProse(document);
  cardVeils();
  new ResizeObserver(() => cardVeils()).observe(content);
  document.fonts.ready.then(() => { cardVeils(); sceneShade(); });
  syncPhotoReadability();
  syncHeader();
  // Menu rows from the other screens land here with an anchor: open the matching module.
  const fromMenu = {'#video': () => toSection(videos, true), '#dolap': () => openPantry(), '#ne-pisirsem': () => q('.bottom-nav [data-photo-entry]')?.click(), '#puf': () => q('.bottom-nav [data-six-tips]')?.click()}[location.hash];
  if (fromMenu) addEventListener('load', () => setTimeout(fromMenu, 300));
  window.HOME_V3_READY = true;
})();
