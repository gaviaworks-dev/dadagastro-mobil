/* Ana sayfa V3 — built on a byte copy of ana-x6 (V2 "Açılan sahne").
   Shared sources (home-base, six-*, set2-*, set15-*, a-chefs) stay untouched; this file only
   recomposes the page they render. Data: DATA.recipes, WEB.videos, WEB.chefs, WEB.categories. */
(() => {
  const q = (s, r = document) => r.querySelector(s), all = (s, r = document) => [...r.querySelectorAll(s)];
  const page = location.pathname.split('/').pop() || 'ana-v3.html';
  const {banner, fa, kitchen} = X;
  const detail = r => `detay-c.html?tarif=${encodeURIComponent(r.slug)}&donus=${page}`;
  const norm = s => s.toLocaleLowerCase('tr-TR');
  const media = url => window.SIX_MEDIA?.map?.[url] || url;
  const withAuthor = r => Boolean(r.author && r.author.trim());

  /* ---------- Hero: x6 scene; ana-1 title + global search replace the scene label ---------- */
  // Hero photo (docs/40): Jiao Yan Karides — brighter and more appetizing than x6's levrek; the
  // suggestion line under the photo names the same recipe and its real time.
  const heroRecipe = DATA.recipes.find(r => r.slug.startsWith('jiao-yan-karides')) || DATA.recipes[16];
  q('.x-scene-photo', banner).innerHTML = X.image(heroRecipe);
  q('.x-recipe', banner).outerHTML = X.recipe(heroRecipe, 'Bugün deneyebilirsin');
  banner.querySelector('.x-scene-label').remove();
  banner.querySelector('.x-heading').remove(); // its "Ne pişirsem?" moves to the top title
  banner.insertAdjacentHTML('beforeend', `<div class="purpose-title v3-hero-top"><div class="six-hero-group"><div class="purpose-copy"><h1 class="x-first">Ne pişirsem?</h1></div><a class="six-search a-global-search" href="arama.html?donus=${page}" aria-label="Genel aramayı aç">${fa('magnifying-glass')}<span>Tarif, şef, video ara</span></a></div></div>`);
  banner.querySelector('.x-scene-copy').classList.add('six-hero-group');
  X_DOCK.remove(); // the hero search replaces x6's second, sticky search
  // x6's shade was drawn for a small top label on its own dark chip. The title now sits there, so the
  // top of the same single shade follows the title/search geometry; x6's lower stops stay as they were.
  // Same source colour (--x-shade = overlay 86%), one gradient, smoothstep ends: no band.
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function sceneShade() {
    const h = banner.clientHeight, top = banner.getBoundingClientRect().top;
    if (!h) return;
    const title = q('.v3-hero-top h1', banner).getBoundingClientRect(), search = q('.v3-hero-top .six-search', banner).getBoundingClientRect();
    const space = parseFloat(getComputedStyle(banner).getPropertyValue('--space-48')) || 48;
    const holdTo = title.bottom - top + space / 4, clearAt = search.bottom - top + space * 2, max = .86;
    // x6 lower part, unchanged: transparent at 45%, x-shade (86%) at 75%, overlay (100%) at 100%.
    const lower = y => { const f = y / h; return f <= .45 ? 0 : f <= .75 ? max * (f - .45) / .3 : max + (1 - max) * (f - .75) / .25; };
    const stops = Array.from({length: 41}, (_, i) => {
      const y = h * i / 40, upper = y <= holdTo ? max : max * (1 - smooth((y - holdTo) / (clearAt - holdTo)));
      return `color-mix(in srgb,var(--overlay) ${(Math.max(upper, lower(y)) * 100).toFixed(2)}%,transparent) ${(i * 2.5).toFixed(1)}%`;
    });
    banner.style.setProperty('--v3-scene-shade', `linear-gradient(180deg,${stops.join(',')})`);
  }
  new ResizeObserver(sceneShade).observe(banner);
  document.fonts.ready.then(sceneShade);
  sceneShade();
  // Header search icon appears as soon as the hero search has gone under the header.
  const sceneScroll = X_SCROLL, heroSearch = q('.v3-hero-top .six-hero-group', banner);
  X_SCROLL = () => {
    sceneScroll();
    sceneShade();
    const icon = q('.a-header-search');
    if (icon) icon.hidden = heroSearch.style.visibility !== 'hidden';
  };

  /* ---------- Shared recipe card: time/rating on photo, bold category, 2-line title, author ---------- */
  function recipeCard(r) {
    const t = document.createElement('template');
    t.innerHTML = card(r);
    const el = t.content.firstElementChild;
    el.querySelectorAll('.card-subtitle,.card-secondary,.card-badges,.card-views').forEach(n => n.remove());
    el.querySelectorAll('.card-visual,.card-copy').forEach(a => { a.href = detail(r); });
    // Author line is information, not a link: no chef profile screen exists in this prototype.
    const link = q('.card-author-row', el), author = document.createElement('p');
    author.className = 'card-author-row';
    author.innerHTML = `<span class="avatar avatar-card" aria-hidden="true">${esc(r.author.slice(0, 1).toLocaleUpperCase('tr'))}</span><span class="v3-author-name" title="${esc(r.author)}"><span class="v3-sr">Tarifi ekleyen: </span>${esc(r.author)}</span>`;
    link.replaceWith(author);
    return el.outerHTML;
  }

  // Text sits on the photo: the source dark (--overlay) rises from 0 to 80% over 48px and is full
  // 24px above the first line (canon), then 90% at the bottom. Re-measured after every render.
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function cardVeils(root = document) {
    for (const el of all('.v3-content .recipe-card, .v3-content .v3-video', root)) {
      const video = el.matches('.v3-video'), photo = q(video ? '.v3-video-cover' : '.card-media', el), text = q(video ? '.v3-video-text' : '.card-category', el);
      const box = photo.getBoundingClientRect();
      if (!text || !box.height) continue;
      const end = Math.max(0, text.getBoundingClientRect().top - box.top - 24), start = Math.max(0, end - 48);
      const stops = Array.from({length: 9}, (_, i) => `color-mix(in srgb,var(--overlay) ${(ease(i / 8) * 80).toFixed(1)}%,transparent) ${(start + (end - start) * i / 8).toFixed(1)}px`);
      photo.style.setProperty('--v3-veil', `linear-gradient(180deg,transparent 0,${stops.join(',')},color-mix(in srgb,var(--overlay) 90%,transparent) 100%)`);
    }
  }

  /* ---------- 1. Tarif bul: Elinde ne var (anlık) + Dolapta Ne Var (kayıtlı dolap) ---------- */
  const finder = kitchen;
  finder.classList.add('v3-finder');
  finder.dataset.tab = 'now';
  const nowParts = all(':scope>:not(.kitchen-heading)', finder);
  q('.kitchen-heading', finder).outerHTML = `<div class="section-heading-row six-heading"><h2>Tarif bul — elindekiyle</h2></div><div class="segmented v3-tabs" role="tablist" aria-label="Malzemeden tarif bul"><button role="tab" id="v3-tab-now" aria-controls="v3-panel-now" aria-selected="true" data-v3-tab="now">${fa('hand-pointer')}<span>Elinde ne var</span></button><button role="tab" id="v3-tab-pantry" aria-controls="v3-panel-pantry" aria-selected="false" tabindex="-1" data-v3-tab="pantry">${fa('box-archive')}<span>Dolapta Ne Var</span></button></div>`;
  const nowPanel = document.createElement('div');
  nowPanel.className = 'v3-panel';
  nowPanel.id = 'v3-panel-now';
  nowPanel.setAttribute('role', 'tabpanel');
  nowPanel.setAttribute('aria-labelledby', 'v3-tab-now');
  nowPanel.append(...nowParts);
  q('.kitchen-suggestion', nowPanel).textContent = 'Şu an elindeki malzemeleri seç; seçim kaydedilmez.';
  const pantryPanel = document.createElement('div');
  pantryPanel.className = 'v3-panel';
  pantryPanel.id = 'v3-panel-pantry';
  pantryPanel.hidden = true;
  pantryPanel.setAttribute('role', 'tabpanel');
  pantryPanel.setAttribute('aria-labelledby', 'v3-tab-pantry');
  finder.append(nowPanel, pantryPanel);
  // The section is the full-bleed band; the tool itself is a card on it (surface from the band's position).
  const finderCard = document.createElement('div');
  finderCard.className = 'v3-surface v3-finder-card';
  finderCard.append(...finder.children);
  finder.append(finderCard);

  // Elinde ne var results use the same card as every other recipe surface.
  const previews = q('[data-set-preview]', nowPanel);
  function cardPreviews() {
    for (const a of all('.kitchen-mini', previews)) {
      const r = DATA.recipes.find(x => x.slug === new URL(a.href).searchParams.get('tarif'));
      if (r && withAuthor(r)) a.replaceWith(document.createRange().createContextualFragment(recipeCard(r)));
      else a.remove();
    }
    hydratePhotos(previews);
    applyTypeRoles(previews);
    cardVeils(previews);
  }
  new MutationObserver(() => { if (q('.kitchen-mini', previews)) cardPreviews(); }).observe(previews, {childList: true});
  cardPreviews();

  // Dolapta Ne Var: a saved pantry (have / exclude). Preview only: stored on this device.
  const STORE = 'dadagastro-v3-dolap';
  const CANDIDATES = ['Tavuk', 'Patates', 'Yumurta', 'Soğan', 'Sarımsak', 'Domates', 'Peynir', 'Yoğurt', 'Limon', 'Pirinç', 'Un', 'Süt', 'Tereyağı', 'Zeytinyağı', 'Kıyma', 'Karides', 'Fasulye', 'Mercimek', 'Bulgur', 'Lahana', 'Ayva', 'Ceviz', 'Badem', 'Maydanoz', 'Nane', 'Biber', 'Şeker'];
  const uses = n => DATA.recipes.filter(r => r.ingredients.some(i => norm(i.name).includes(norm(n)))).length;
  const pool = CANDIDATES.map(n => ({n, c: uses(n)})).filter(x => x.c > 0).sort((a, b) => b.c - a.c || a.n.localeCompare(b.n, 'tr'));
  let pantry = {have: [], exclude: []};
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (saved && Array.isArray(saved.have) && Array.isArray(saved.exclude)) pantry = saved;
  } catch { /* storage unavailable: session-only */ }
  const savePantry = () => { try { localStorage.setItem(STORE, JSON.stringify(pantry)); } catch { /* session-only */ } };
  const hasIng = (r, n) => r.ingredients.some(i => norm(i.name).includes(norm(n)));
  function pantryMatches() {
    if (!pantry.have.length) return [];
    return DATA.recipes
      .filter(withAuthor)
      .filter(r => !pantry.exclude.some(n => hasIng(r, n)))
      .map(r => ({r, hit: pantry.have.filter(n => hasIng(r, n)).length}))
      .filter(x => x.hit > 0)
      .sort((a, b) => b.hit - a.hit || recipeDate(b.r) - recipeDate(a.r))
      .map(x => x.r);
  }
  const chip = (n, list) => `<button class="chip v3-saved-chip" data-v3-pantry-remove="${esc(n)}" data-list="${list}" aria-label="${esc(n)} — ${list === 'have' ? 'dolaptan çıkar' : 'hariç tutmayı kaldır'}"><span>${esc(n)}</span>${fa('xmark')}</button>`;
  function renderPantry() {
    const found = pantryMatches();
    const quick = ['Tavuk', 'Patates', 'Yumurta'].filter(n => !pantry.have.includes(n));
    pantryPanel.innerHTML = `<p class="kitchen-suggestion">Dolabındakileri bir kez kaydet; öneriler dolabına göre gelsin.</p>
      <div class="v3-pantry-group"><div class="v3-pantry-head">${fa('basket-shopping')}<span>Dolaptakiler</span><output>${pantry.have.length}</output></div><div class="v3-pantry-chips">${pantry.have.map(n => chip(n, 'have')).join('')}${quick.map(n => `<button class="chip v3-add-chip" data-v3-pantry-add="${n}">${fa('plus')}<span>${n}</span></button>`).join('')}</div></div>
      <div class="v3-pantry-group"><div class="v3-pantry-head">${fa('ban')}<span>Hariç tuttuklarım</span><output>${pantry.exclude.length}</output></div><div class="v3-pantry-chips">${pantry.exclude.length ? pantry.exclude.map(n => chip(n, 'exclude')).join('') : '<span class="v3-pantry-empty">Sevmediğin ya da tüketmediğin malzemeleri ekle.</span>'}</div></div>
      <button class="button secondary v3-pantry-edit" data-v3-pantry-edit>${fa('pen')}<span>Dolabımı düzenle</span></button>
      ${pantry.have.length ? `<div class="kitchen-result-head"><output aria-live="polite">Dolabındakilerle ${found.length} tarif</output></div>${found.length ? `<div class="kitchen-previews">${found.slice(0, 6).map(recipeCard).join('')}</div>` : '<div class="kitchen-empty"><strong>Bu dolapla tarif bulunamadı.</strong><span>Bir malzeme ekle ya da hariç tuttuklarını azalt.</span></div>'}` : ''}
      <p class="v3-preview-note">${fa('circle-info')}<span>Önizleme: dolabın yalnız bu cihazda saklanır, hesaba kaydedilmez.</span></p>`;
    hydratePhotos(pantryPanel);
    applyTypeRoles(pantryPanel);
    cardVeils(pantryPanel);
    syncPhotoReadability();
  }
  function pantrySheet(list = 'have') {
    const draw = () => `<div class="segmented v3-tabs" role="tablist" aria-label="Dolap listesi">${[['have', 'Dolaptakiler'], ['exclude', 'Hariç tuttuklarım']].map(([k, t]) => `<button role="tab" aria-selected="${k === list}" data-v3-sheet-list="${k}">${t}</button>`).join('')}</div><p class="v3-sheet-note">Bu önizlemede mevcut tariflerin malzemeleri seçilebilir; sayı, malzemeyi içeren yerel tarif sayısıdır.</p><div class="v3-pool">${pool.map(({n, c}) => `<button class="chip" data-v3-pool="${esc(n)}" aria-pressed="${pantry[list].includes(n)}"><span>${esc(n)}</span><small>${c}</small></button>`).join('')}</div><div class="sheet-actions"><button class="button" data-sheet-close>Bitti</button></div>`;
    sheet('Dolapta Ne Var', `<div class="v3-pantry-sheet">${draw()}</div>`);
    const box = q('.v3-pantry-sheet');
    box.addEventListener('click', e => {
      const tab = e.target.closest('[data-v3-sheet-list]');
      if (tab) { list = tab.dataset.v3SheetList; box.innerHTML = draw(); applyTypeRoles(box); return; }
      const item = e.target.closest('[data-v3-pool]');
      if (!item) return;
      const n = item.dataset.v3Pool, other = list === 'have' ? 'exclude' : 'have';
      pantry[list] = pantry[list].includes(n) ? pantry[list].filter(x => x !== n) : [...pantry[list], n];
      pantry[other] = pantry[other].filter(x => x !== n);
      savePantry();
      item.setAttribute('aria-pressed', pantry[list].includes(n));
      renderPantry();
    });
    applyTypeRoles(box);
  }
  function selectTab(name, focus = false) {
    finder.dataset.tab = name;
    all('[data-v3-tab]', finder).forEach(b => {
      const on = b.dataset.v3Tab === name;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    nowPanel.hidden = name !== 'now';
    pantryPanel.hidden = name !== 'pantry';
    syncPhotoReadability();
  }
  finder.addEventListener('click', e => {
    const tab = e.target.closest('[data-v3-tab]');
    if (tab) return selectTab(tab.dataset.v3Tab);
    const add = e.target.closest('[data-v3-pantry-add]');
    if (add) {
      pantry.have = [...pantry.have, add.dataset.v3PantryAdd];
      pantry.exclude = pantry.exclude.filter(x => x !== add.dataset.v3PantryAdd);
      savePantry(); renderPantry(); toast('Dolabına eklendi (önizleme).'); return;
    }
    const rm = e.target.closest('[data-v3-pantry-remove]');
    if (rm) {
      pantry[rm.dataset.list] = pantry[rm.dataset.list].filter(x => x !== rm.dataset.v3PantryRemove);
      savePantry(); renderPantry(); return;
    }
    if (e.target.closest('[data-v3-pantry-edit]')) pantrySheet();
  });
  q('.v3-tabs', finder).addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    selectTab(finder.dataset.tab === 'now' ? 'pantry' : 'now', true);
  });
  renderPantry();
  // The site's other Dolapta Ne Var entry points open this saved pantry, not V2's session widget.
  function openPantry() {
    if (siteDrawer.open) q('[data-drawer-close]', siteDrawer)?.click();
    if (genericDialog.open) genericDialog.close();
    selectTab('pantry');
    finder.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'start'});
  }
  window.addEventListener('click', e => {
    if (!e.target.closest('[data-six-fridge],[data-v3-open-pantry]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openPantry();
  }, true);

  /* ---------- 2. Video Mutfağı: picture-led cards from the recipe-card family (no playable source) ---------- */
  // Title + views sit inside the cover on the same text-geometry veil as recipe cards; duration uses the
  // shared photo-meta capsule (top-left, like a recipe's time); one play mark top-right, same size everywhere.
  const videos = SET_SECTIONS.videos;
  videos.className = 'six-module six-videos v3-videos';
  videos.removeAttribute('data-video-layout');
  const video = (v, i, lead = false) => `<button class="six-video-card v3-video${lead ? ' v3-video-lead' : ''}" data-six-video="${i}" aria-label="${esc(v.title)} videosunu aç, ${esc(v.time)}"><span class="v3-video-cover"><span class="photo" style="background-image:url('${esc(media(v.image))}')"></span><span class="v3-video-shade"></span><span class="photo-meta v3-video-time"><span>${fa('clock')} ${esc(v.time)}</span></span><span class="v3-play" aria-hidden="true">${fa('play')}</span><span class="v3-video-text"><strong>${esc(v.title)}</strong><span>${fa('eye')} ${esc(v.views)} izlenme</span></span></span></button>`;
  videos.innerHTML = `<div class="section-heading-row six-heading"><h2>Video Mutfağı</h2><a class="six-see" href="" data-six-videos aria-label="Video Mutfağı — tüm videolar">Tümü ${fa('arrow-right')}</a></div>${video(WEB.videos[0], 0, true)}<div class="v3-video-rail" aria-label="Diğer videolar">${WEB.videos.slice(1).map((v, i) => video(v, i + 1)).join('')}</div>`;

  /* ---------- 4. En son eklenen tarifler: one lead + two ---------- */
  const latest = DATA.recipes.filter(withAuthor).sort((a, b) => recipeDate(b) - recipeDate(a)).slice(0, 3);
  const recipes = SET_SECTIONS.block;
  recipes.dataset.recipeLayout = 'v3-latest';
  recipes.dataset.order = latest.map(r => r.slug).join(',');
  recipes.innerHTML = `<div class="section-heading-row six-heading"><h2>En son eklenen tarifler</h2><a class="six-see" href="liste.html?sirala=en_yeni" aria-label="En son eklenen tariflerin tümü">Tümü ${fa('arrow-right')}</a></div><div class="collection-body">${latest.map(recipeCard).join('')}</div>`;

  /* ---------- 5. Şefler: web "Şefler & Yazarlar · Tarifin ustaları" card structure ---------- */
  const chefs = SET_SECTIONS.chefs;
  chefs.className = 'six-module six-chefs a-chefs v3-chefs';
  chefs.innerHTML = `<div class="section-heading-row six-heading"><div><span class="eyebrow">${fa('utensils')} Şefler &amp; Yazarlar</span><h2>Tarifin ustaları</h2></div><a class="six-see" href="arama.html?tur=sef&amp;donus=${page}" aria-label="Tüm şefler">Tümü ${fa('arrow-right')}</a></div><div class="v3-chef-row" aria-label="Şefler" tabindex="0">${WEB.chefs.map((c, i) => `<article class="v3-chef-card"><button class="v3-chef-person" data-a-chef="${i}" aria-label="${esc(c.name)} profili, ${esc(c.count)}"><span class="v3-chef-av" aria-hidden="true">${esc(c.name.slice(0, 1).toLocaleUpperCase('tr'))}</span><b>${esc(c.name)}</b><span class="v3-chef-count">${esc(c.count)}</span></button><button class="v3-chef-follow" data-a-chef-follow="${i}" aria-label="${esc(c.name)} takip et">${fa('plus')} Takip Et</button></article>`).join('')}<button class="v3-chef-cta" data-a-chef-join>${fa('circle-plus')}<b>Sen de Şef Ol</b><span>Tarifini paylaş, rozetini kazan</span></button></div>`;

  /* ---------- 3. Kategoriler & Dünya Mutfakları: six photo gates / sixteen flagged cuisines, full lists in a sheet ---------- */
  // Web source: gastro/partials/catstrip.blade.php — title "Kategoriler & Dünya Mutfakları", card = photo + name + "N tarif".
  const categories = q('.six-categories');
  categories.classList.add('v3-cats');
  const countOf = s => Number(String(s).replace(/[^\d]/g, '')) || 0;
  // Cuisine flags: the same set and map as liste-v2.js (web /varliklar/flags/xx.svg -> assets/flags; Laravel
  // public/flags, same SHA). The one cuisine without a country (Balkan) gets a neutral solid globe in the same frame.
  const FLAG = {turk: 'tr', italyan: 'it', fransiz: 'fr', ispanyol: 'es', portekiz: 'pt', alman: 'de', avusturya: 'at', ingiliz: 'gb', irlanda: 'ie', yunan: 'gr', rus: 'ru', ukrayna: 'ua', gurcu: 'ge', azerbaycan: 'az', ermeni: 'am', kazak: 'kz', ozbek: 'uz', iran: 'ir', irak: 'iq', suriye: 'sy', lubnan: 'lb', urdun: 'jo', 'suudi-arabistan': 'sa', misir: 'eg', fas: 'ma', tunus: 'tn', etiyopya: 'et', 'guney-afrika': 'za', hint: 'in', pakistan: 'pk', cin: 'cn', japon: 'jp', kore: 'kr', tayland: 'th', vietnam: 'vn', malezya: 'my', endonezya: 'id', filipin: 'ph', amerikan: 'us', kanada: 'ca', meksika: 'mx', brezilya: 'br', arjantin: 'ar', peru: 'pe', kolombiya: 'co', kuba: 'cu', jamaika: 'jm', avustralya: 'au', 'yeni-zelanda': 'nz'};
  const cuisines = (PARITY.list.groups.find(g => g.key === 'mutfak')?.options || []).map(o => {
    const m = o.label.match(/^(.*?)\s+([\d.,]+)\s*$/), code = FLAG[o.value.replace(/-mutfagi$/, '')];
    return {name: m ? m[1] : o.label, count: m ? `${m[2]} tarif` : '', n: m ? countOf(m[2]) : 0, href: `liste.html?mutfak%5B%5D=${encodeURIComponent(o.value)}`, flag: code ? `assets/flags/${code}.svg` : ''};
  }).sort((a, b) => b.n - a.n);
  const flagFrame = c => `<span class="v3-flag-frame">${c.flag ? `<img src="${c.flag}" alt="" width="48" height="48" loading="lazy">` : fa('earth-europe')}</span>`;
  const cats = WEB.categories.map(c => ({name: c.name, count: c.count, n: countOf(c.count), href: `liste.html?kategori=${encodeURIComponent(c.name)}`, image: window.V3_KATEGORI_MEDIA?.[c.image] || ''}));
  const lead = [...cats].filter(c => c.image).sort((a, b) => b.n - a.n).slice(0, 6);
  let catMode = 'cat';
  // Categories: unveiled photo carrying the count in the shared photo-meta capsule; full name below.
  const tile = c => `<a class="v3-cat-tile" href="${c.href}"><span class="v3-cat-media"><span class="photo" style="background-image:url('${esc(c.image)}')"></span><span class="photo-meta v3-cat-count"><span>${fa('book-open')} ${esc(c.count)}</span></span></span><b class="v3-cat-name">${esc(c.name)}</b></a>`;
  // Cuisines: one compact item everywhere — equal flag frame, centred name (max two lines), count in the meta role.
  const cuisineItem = c => `<a class="v3-cuisine" href="${c.href}">${flagFrame(c)}<span class="v3-cuisine-text"><b>${esc(c.name)}</b><span>${esc(c.count)}</span></span></a>`;
  function renderCategories() {
    const total = catMode === 'cat' ? cats.length : cuisines.length;
    // Both panels share one grid cell, so the section keeps the taller panel's height: no jump on switching.
    all('[data-v3-panel]', categories).forEach(panel => { const on = panel.dataset.v3Panel === catMode; panel.classList.toggle('is-active', on); panel.toggleAttribute('inert', !on); panel.setAttribute('aria-hidden', !on); });
    q('[data-v3-cat-all]', categories).setAttribute('aria-label', `${catMode === 'cat' ? 'Tüm kategoriler' : 'Tüm dünya mutfakları'} (${total})`);
    all('[data-v3-cat]', categories).forEach(b => { const on = b.dataset.v3Cat === catMode; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
  }
  function categorySheet() {
    const list = catMode === 'cat' ? cats : cuisines;
    sheet(catMode === 'cat' ? 'Kategoriler' : 'Dünya Mutfakları', `<div class="v3-cat-list">${list.map(c => `<a class="v3-cat-row" href="${c.href}">${catMode === 'cat' ? (c.image ? `<span class="photo" style="background-image:url('${esc(c.image)}')"></span>` : `<span class="v3-cat-symbol">${fa('bowl-food')}</span>`) : flagFrame(c)}<span class="v3-cat-text"><b>${esc(c.name)}</b><span>${esc(c.count)}</span></span>${fa('chevron-right')}</a>`).join('')}</div>`);
    applyTypeRoles(q('.v3-cat-list'));
  }
  categories.innerHTML = `<div class="section-heading-row six-heading"><h2>Kategoriler &amp; Dünya Mutfakları</h2><a class="six-see" href="" data-v3-cat-all>Tümü ${fa('arrow-right')}</a></div><div class="segmented v3-tabs" role="tablist" aria-label="Kategori türü"><button role="tab" id="v3-cat-tab" aria-controls="v3-cat-panel" data-v3-cat="cat" aria-selected="true">${fa('bowl-food')}<span>Kategoriler</span></button><button role="tab" id="v3-cuisine-tab" aria-controls="v3-cuisine-panel" data-v3-cat="cuisine" aria-selected="false" tabindex="-1">${fa('earth-europe')}<span>Dünya Mutfakları</span></button></div><div class="v3-cat-stage"><div class="v3-cat-grid" id="v3-cat-panel" role="tabpanel" aria-labelledby="v3-cat-tab" data-v3-panel="cat">${lead.map(tile).join('')}</div><div class="v3-cuisine-grid" id="v3-cuisine-panel" role="tabpanel" aria-labelledby="v3-cuisine-tab" data-v3-panel="cuisine">${cuisines.slice(0, 16).map(cuisineItem).join('')}</div></div>`;
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

  /* ---------- 6. Tarifini paylaş: x6 keeps the web source copy and light surface ---------- */
  const community = q('.six-community');
  q('.eyebrow', community).innerHTML = `${fa('users')} Topluluğa Katıl`;
  q('[data-six-share]', community).innerHTML = `${fa('circle-plus')} Tarifini Paylaş`;

  /* ---------- Order (fixed; reasons in docs/40) ---------- */
  const content = q('.six-content');
  content.classList.replace('six-content', 'v3-content'); // shared forced .six-content child rules stop here
  content.replaceChildren(finder, videos, categories, recipes, chefs, community);

  // The lead latest card takes the canonical featured title role.
  const baseTypeRoles = applyTypeRoles;
  applyTypeRoles = function (root = document) {
    baseTypeRoles(root);
    all('.v3-content .collection-block .recipe-card:first-child h3').forEach(h => { h.dataset.typeRole = 'featured'; });
  };

  /* ---------- Side menu: shared component (ortak-menu.js); this page answers its in-page rows ---------- */
  const showCategories = mode => {
    catMode = mode;
    renderCategories();
    categories.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'start'});
  };
  window.OrtakMenu?.configure({
    active: 'home',
    links: {home: page, recipes: 'liste.html', categories: 'liste.html', cuisines: 'liste.html', plate: `tabaktan-tarif.html?donus=${page}`},
    actions: {
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
  document.fonts.ready.then(() => cardVeils());
  syncPhotoReadability();
  syncHeader();
  // Menu rows from the other screens land here with an anchor: open the matching module.
  const fromMenu = {'#dolap': () => openPantry(), '#ne-pisirsem': () => q('.bottom-nav [data-photo-entry]')?.click(), '#puf': () => q('.bottom-nav [data-six-tips]')?.click()}[location.hash];
  if (fromMenu) addEventListener('load', () => setTimeout(fromMenu, 300));
  window.HOME_V3_READY = true;
})();
