/* Liste V2: liste-1'den türetildi. Ortak kaynaklar (ld-source.js, app.css, tokens.css, hero-light.css)
   yalnız okunur; bütün değişiklikler bu dosya ve liste-v2.css içindedir.
   Bileşenler (dg-*) ana sayfa ve detayla ortaklaşacak biçimde sayfadan bağımsız kuruldu:
   dg-card · dg-feature · dg-chip · dg-mark · dg-stats · dg-sheet · dg-facet · dg-option · dg-choice. */
(() => {
  if (page !== 'tarifler') return;
  const q = (s, r = document) => r.querySelector(s), all = (s, r = document) => [...r.querySelectorAll(s)];
  const fa = name => `<i class="icon fa-solid fa-${name}" aria-hidden="true"></i>`;
  const SELF = 'liste-v2.html', HOME = 'ana-v3.html', DETAIL = 'detay-c.html', PAGE_SIZE = 9;
  const css = getComputedStyle(document.documentElement);
  const token = name => parseFloat(css.getPropertyValue(name)) || 0;
  const reduced = () => motion.matches;

  /* ---------- Kaynak verisi (canlı dadagastro.com/tarifler, 9 Ekim 2026) ---------- */
  // Grup başlık ikonları: webdeki .fct-head-ico. Kategori, İçerik Türü ve Bütçe webde ikonsuz; ikon sütunu boş kalır, etiketler hizalı.
  const GROUP_ICON = {mutfak: 'earth-americas', yemek_modu: 'kitchen-set', ogun: 'utensils', sure: 'clock', zorluk: 'gauge-simple', beslenme: 'heart-pulse'};
  // Mutfak bayrakları: webdeki /varliklar/flags/xx.svg (Laravel public/flags ile aynı SHA) → assets/flags.
  const FLAG = {turk: 'tr', italyan: 'it', fransiz: 'fr', ispanyol: 'es', portekiz: 'pt', alman: 'de', avusturya: 'at', ingiliz: 'gb', irlanda: 'ie', yunan: 'gr', rus: 'ru', ukrayna: 'ua', gurcu: 'ge', azerbaycan: 'az', ermeni: 'am', kazak: 'kz', ozbek: 'uz', iran: 'ir', irak: 'iq', suriye: 'sy', lubnan: 'lb', urdun: 'jo', 'suudi-arabistan': 'sa', misir: 'eg', fas: 'ma', tunus: 'tn', etiyopya: 'et', 'guney-afrika': 'za', hint: 'in', pakistan: 'pk', cin: 'cn', japon: 'jp', kore: 'kr', tayland: 'th', vietnam: 'vn', malezya: 'my', endonezya: 'id', filipin: 'ph', amerikan: 'us', kanada: 'ca', meksika: 'mx', brezilya: 'br', arjantin: 'ar', peru: 'pe', kolombiya: 'co', kuba: 'cu', jamaika: 'jm', avustralya: 'au', 'yeni-zelanda': 'nz'};
  // Beslenme satır ikonları: webdeki .fct-ico.
  const DIET_ICON = {vegan: 'seedling', vejetaryen: 'leaf', glutensiz: 'wheat-awn-circle-exclamation', 'protein-agirlikli': 'drumstick-bite', 'az-yagli': 'droplet', glutenli: 'wheat-awn', laktozsuz: 'glass-water', 'sut-icermez': 'mug-saucer', 'yumurta-icermez': 'egg', 'seker-ilavesiz': 'cube', 'yuksek-lifli': 'carrot', 'tam-tahilli': 'bowl-rice', acili: 'pepper-hot', baharatli: 'mortar-pestle', 'diyabete-uygun': 'heart-pulse', 'kalp-dostu': 'heart', 'dusuk-kalorili': 'scale-balanced', pesketaryen: 'circle', 'kuruyemis-icermez': 'circle', 'dusuk-karbonhidratli': 'circle', ketojenik: 'circle'};
  // Tema & pişirme tipi görselleri: webdeki .subcat arka planları (ad ve sayı PARITY.list.themes'ten).
  const THEME_IMAGE = {'Tümü': '/varliklar/_dis/images.unsplash.com/photo-1604908176997-125f25cc6f3d.avif', 'Günlük Pratik': '/varliklar/media/1237.webp', 'Glutensiz': '/varliklar/_dis/images.unsplash.com/photo-1490645935967-10de6ba17061.avif', 'Tek Tencere': '/varliklar/_dis/images.unsplash.com/photo-1547592166-23ac45744acd.avif', 'Fırın Yemekleri': '/varliklar/_dis/images.unsplash.com/photo-1473093295043-cdd812d0e601.avif', 'Airfryer Tarifleri': '/varliklar/media/1233.webp', 'Diyabete Uygun': '/varliklar/_dis/images.unsplash.com/photo-1512621776951-a57141f2eefd.avif', 'Kalp Dostu': '/varliklar/_dis/images.unsplash.com/photo-1498837167922-ddd27525d352.avif', 'Düşük Kalorili': '/varliklar/_dis/images.unsplash.com/photo-1467003909585-2f8a72700288.avif'};
  // Sıralama: webdeki .sort-menu sırası ve ikonları.
  const SORTS = [['onerilen', 'Önerilen', 'wand-magic-sparkles'], ['en_yeni', 'En Yeni', 'calendar-plus'], ['en_cok_puanlanan', 'En Çok Puanlanan', 'star'], ['en_hizli', 'En Hızlı', 'bolt']];
  const sortLabel = () => (SORTS.find(s => s[0] === (sort === 'puan' ? 'en_cok_puanlanan' : sort)) || SORTS[0])[1];

  /* ---------- Gezinme: liste-1'in ld-links.js uyarlaması; hedefler V3 ekranları ---------- */
  function adaptLinks(scope = document) {
    for (const a of scope.querySelectorAll('a[href]')) {
      const h = a.getAttribute('href');
      if (/^tarifler\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace('tarifler.html', SELF));
      else if (/^tarif-detay\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace('tarif-detay.html', DETAIL));
      else if (/^index\.html(?:[?#]|$)/.test(h)) a.setAttribute('href', h.replace('index.html', HOME));
    }
    for (const f of scope.querySelectorAll('form[action="tarifler.html"]')) f.action = SELF;
  }
  adaptLinks();
  new MutationObserver(rs => rs.forEach(r => r.addedNodes.forEach(n => { if (n.nodeType === 1) adaptLinks(n); }))).observe(document.body, {childList: true, subtree: true});
  const recipeHref = r => link(r).replace(/^tarif-detay\.html/, DETAIL);

  /* ---------- Filtre durumu yardımcıları ---------- */
  const groupOf = key => PARITY.list.groups.find(g => g.key === key);
  const plain = label => label.replace(/\s+[\d.]+$/, '');
  const countOf = label => label.match(/[\d.]+$/)?.[0] || '';
  const total = facets => Object.values(facets).flat().length;
  const clone = facets => Object.fromEntries(Object.entries(facets).map(([k, v]) => [k, [...v]]));
  if (category) {
    const option = groupOf('kategori').options.find(o => plain(o.label) === category);
    if (option) { facetState.kategori = [option.value]; category = ''; }
  }

  /* ---------- dg-mark: seçenek işareti (kategori fotoğrafı / bayrak / ikon) ---------- */
  function mark(key, value) {
    if (key === 'kategori') {
      const image = WEB.categories.find(c => c.name === facetLabel('kategori', value))?.image;
      return image ? `<span class="dg-mark"><span class="photo dg-mark__photo" data-photo-src="${esc(absoluteMedia(image))}" aria-hidden="true"></span></span>` : `<span class="dg-mark">${fa('utensils')}</span>`;
    }
    if (key === 'mutfak') {
      const code = FLAG[value.replace(/-mutfagi$/, '')];
      return `<span class="dg-mark dg-mark--flag">${code ? `<img src="assets/flags/${code}.svg" alt="" width="20" height="15">` : fa('globe')}</span>`;
    }
    if (key === 'beslenme' && DIET_ICON[value]) return `<span class="dg-mark">${fa(DIET_ICON[value])}</span>`;
    return '';
  }

  /* ---------- Panel: sabit banner üstüne binen beyaz panel (liste-six.js n=1 aktarımı) ---------- */
  const tools = q('.list-tools'), content = q('.list-content'), panel = document.createElement('div');
  panel.className = 'lv2-panel';
  tools.before(panel);
  panel.append(tools, content);

  /* ---------- Arama altı: Kategoriler / Dünya Mutfakları (liste-5 aktarımı) + dg-chip şeridi ---------- */
  let scope = (facetState.mutfak || []).length && !(facetState.kategori || []).length ? 'mutfak' : 'kategori';
  const oldRail = q('.chips', tools);
  oldRail.insertAdjacentHTML('beforebegin', `<div class="segmented ld-scope lv2-scope" role="group" aria-label="Tarif kapsamı"><button type="button" data-ld-scope="kategori">Kategoriler</button><button type="button" data-ld-scope="mutfak">Dünya Mutfakları</button></div>`);
  const rail = document.createElement('div');
  rail.className = 'dg-chip-rail lv2-rail';
  rail.setAttribute('role', 'group');
  oldRail.replaceWith(rail);
  const chip = ({attrs, on, markup, label, count = ''}) => `<button type="button" class="dg-chip" ${attrs} aria-pressed="${on}">${markup}<span class="dg-chip__label">${esc(label)}</span>${count ? `<span class="dg-chip__count">${esc(count)}</span>` : ''}</button>`;
  function drawRail() {
    const selected = facetState[scope] || [];
    all('[data-ld-scope]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ldScope === scope));
    rail.setAttribute('aria-label', scope === 'kategori' ? 'Kategoriler' : 'Dünya Mutfakları');
    rail.innerHTML = chip({attrs: `data-lv2-facet="${scope}" data-value=""`, on: !selected.length, markup: `<span class="dg-mark">${fa(scope === 'kategori' ? 'utensils' : 'globe')}</span>`, label: 'Tümü'}) +
      groupOf(scope).options.map(o => chip({attrs: `data-lv2-facet="${scope}" data-value="${esc(o.value)}"`, on: selected.includes(o.value), markup: mark(scope, o.value), label: plain(o.label)})).join('');
    hydratePhotos(rail);
    const active = q('[aria-pressed=true]', rail), pad = token('--gutter');
    if (active && (active.offsetLeft < rail.scrollLeft || active.offsetLeft + active.offsetWidth > rail.scrollLeft + rail.clientWidth)) rail.scrollLeft = active.offsetLeft - pad;
  }

  /* ---------- İçerik: tema şeridi (sabit), araç çubuğu, sonuç ---------- */
  const filterButton = document.createElement('button'), toggle = q('.view-toggle'), count = q('#resultCount');
  q('#openFilters').remove();
  q('#filters').remove();
  filterButton.type = 'button';
  filterButton.id = 'openFilters';
  filterButton.className = 'dg-button dg-button--primary lv2-filter';
  filterButton.setAttribute('aria-haspopup', 'dialog');
  filterButton.innerHTML = `${fa('sliders')}<span>Filtrele</span><span id="filterBadge" class="dg-badge dg-badge--light"></span>`;
  toggle.querySelector('[data-view=grid]').setAttribute('aria-label', 'Kart görünümü');
  toggle.querySelector('[data-view=liste]').setAttribute('aria-label', 'Satır görünümü');
  const sortButton = document.createElement('button');
  sortButton.type = 'button';
  sortButton.className = 'dg-button dg-button--outline lv2-sort';
  sortButton.setAttribute('aria-haspopup', 'dialog');
  const themes = document.createElement('section');
  themes.className = 'lv2-themes';
  themes.setAttribute('aria-labelledby', 'lv2ThemeTitle');
  themes.innerHTML = `<h2 class="lv2-themes__title" id="lv2ThemeTitle">Tema &amp; pişirme tipi</h2><div class="dg-chip-rail lv2-theme-rail" role="group" aria-label="Tema ve pişirme tipi"></div>`;
  const bar = q('.result-bar');
  bar.className = 'result-bar lv2-toolbar';
  bar.replaceChildren(filterButton, sortButton);
  const status = document.createElement('div');
  status.className = 'lv2-status';
  status.append(count, toggle);
  q('.theme-expander').replaceWith(themes);
  themes.after(bar);
  bar.after(status);
  q('#activeFacets').remove(); // Seçimler filtre sheet'inde çip; sayfada ayrı satır yok (kayma ve tekrar yok).
  q('.list-fridge-link')?.remove(); // "Ne pişireceğine karar veremedin mi?" bu sürümde yok.

  const themeFacets = t => { const out = {}; for (const [k, v] of new URL(t.href).searchParams) if (k.includes('[')) (out[k.split('[')[0]] ??= []).push(v); return out; };
  const sameFacets = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].every(k => JSON.stringify([...(a[k] || [])].sort()) === JSON.stringify([...(b[k] || [])].sort()));
  function drawThemes() {
    const box = q('.lv2-theme-rail');
    box.innerHTML = PARITY.list.themes.map((t, i) => {
      const image = THEME_IMAGE[t.label];
      return chip({attrs: `data-theme="${i}"`, on: sameFacets(themeFacets(t), facetState) && !category, markup: image ? `<span class="dg-mark"><span class="photo dg-mark__photo" data-photo-src="${esc(absoluteMedia(image))}" aria-hidden="true"></span></span>` : '', label: t.label, count: t.count.replace(/^(\d)(\d{3}) /, '$1.$2 ')});
    }).join('');
    hydratePhotos(box);
  }

  /* ---------- Banner: başlık + kaynak sayaçlar (liste-1 yapısı) ---------- */
  const GENERAL_IMAGE = 'https://dadagastro.com/varliklar/storage/pagedef/tarifler/hero/lHsbux1DtK4qGj3Uk2I2ccvNZXjepXHfQvr1ieQO.webp';
  function chosen() {
    const k = facetState.kategori || [], m = facetState.mutfak || [];
    const fromCategory = name => { const c = WEB.categories.find(c => c.name === name); return {name, count: c?.count, image: c?.image}; };
    if (category) return fromCategory(category);
    if (k.length === 1) return fromCategory(facetLabel('kategori', k[0]));
    if (m.length === 1 && !k.length) { const o = groupOf('mutfak').options.find(o => o.value === m[0]); return o ? {name: plain(o.label), count: countOf(o.label) + ' tarif'} : null; }
    return null;
  }
  const stats = list => `<div class="dg-stats ${list.length === 1 ? 'dg-stats--single' : ''}">${list.map(([v, l]) => `<span class="dg-stats__item"><b>${esc(v)}</b> ${esc(l)}</span>`).join('<span class="dg-stats__sep" aria-hidden="true"></span>')}</div>`;
  listBanner = function () {
    const c = chosen();
    const list = c ? (c.count && parseInt(c.count) ? [[c.count.split(' ')[0], 'tarif']] : []) : PARITY.list.stats.map(s => [s.value, s.label]);
    return `<section class="list-banner lv2-banner" style="background-image:url('${esc(c?.image || GENERAL_IMAGE)}')"><div class="list-banner-copy"><h1>${esc(c?.name || 'Tarifler')}</h1>${list.length ? stats(list) : ''}</div></section>`;
  };
  let bannerKey = '';
  updateListBanner = function () {
    const key = JSON.stringify(chosen());
    if (key === bannerKey && q('.lv2-banner')) return;
    bannerKey = key;
    q('.list-banner').outerHTML = listBanner();
    applyTypeRoles(q('.list-banner'));
    measure(); paintBanner(); syncHeader();
  };

  /* ---------- Tek sürekli overlay: kaynak koyu renk, smoothstep (uçlarda eğim sıfır, bant yok) ---------- */
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  const gradient = (h, alpha) => `linear-gradient(180deg,${Array.from({length: 49}, (_, i) => `color-mix(in srgb,var(--overlay) ${(alpha(h * i / 48) * 100).toFixed(2)}%,transparent) ${(i * 100 / 48).toFixed(3)}%`).join(',')})`;
  // Metnin 24px üstünde `full` koyuluk; yukarıda rampa, metin bloğu boyunca `end`e.
  function textCurve(h, textTop, ramp, full = .8, end = .9) {
    const at = Math.max(0, textTop - token('--space-24')), start = Math.max(0, at - ramp);
    return y => y <= at ? full * smooth((y - start) / Math.max(1, at - start)) : full + (end - full) * smooth((y - at) / Math.max(1, h - at));
  }
  function paintBanner() {
    const banner = q('.lv2-banner'), title = banner && q('h1', banner), header = q('.topbar');
    if (!banner || !title) return;
    const h = banner.offsetHeight, textTop = title.offsetTop + title.offsetParent.offsetTop;
    const lower = textCurve(h, textTop, token('--space-48') * 2);
    // Header/logo arkası aynı eğrinin üst kolu: header boyunca sabit, sonra 96px'te yumuşar (ayrı header katmanı yok).
    const H = header.offsetHeight, upper = y => .76 * (1 - smooth((y - H) / (token('--space-48') * 2)));
    banner.style.setProperty('--lv2-veil', gradient(h, y => 1 - (1 - upper(y)) * (1 - lower(y))));
  }
  function paintFeatures() {
    // Overlay (ana sayfa V3 ailesi, ana-v3.js cardVeils): kategorinin 24px üstünde %80'e 48px'lik smoothstep
    // ile çıkar, metin boyunca %90'a iner. Metnin gerçek konumundan ölçülür; uzun başlıkta eğri yukarı uzar.
    for (const box of all('.dg-feature--overlay .dg-feature__media')) {
      const copy = q('.dg-feature__info', box);
      if (copy) box.style.setProperty('--dg-veil', gradient(box.offsetHeight, textCurve(box.offsetHeight, copy.offsetTop, token('--space-48'))));
    }
  }

  /* ---------- dg-card: ortak tarif kartı (dikey ve satır aynı aile) ---------- */
  const author = r => `<a href="" class="dg-author"><span class="avatar dg-author__avatar">${esc(r.author[0])}</span><span class="dg-author__name" title="${esc(r.author)}">${esc(r.author)}</span></a>`;
  const text = r => `<a class="dg-card__text" href="${recipeHref(r)}"><span class="dg-card__category" title="${esc(r.category)}">${esc(r.category)}</span><h3 class="dg-card__title" title="${esc(r.title)}">${esc(shortTitle(r))}</h3></a>`;
  const media = (r, cls) => `<a class="${cls}" href="${recipeHref(r)}" aria-label="${esc(shortTitle(r))}" tabindex="-1">${photo(r.image, 'dg-photo')}<span class="dg-meta">${photoMeta(r)}</span></a>`;
  const saveOf = r => saveButton(r, 'dg-save');
  card = function (r, variant = '') {
    return `<article class="dg-card ${variant ? 'dg-card--' + variant : ''}">${media(r, 'dg-card__media')}${saveOf(r)}<div class="dg-card__body">${text(r)}${author(r)}</div></article>`;
  };
  /* Öne çıkan kart (dg-feature): ana sayfa V3 öne çıkan kartıyla aynı aile — 4:3 fotoğraf, sol üstte
     süre/puan rozeti, sağ üstte tek stil kaydet, kalın kategori, öne çıkan rolde en çok 2 satır başlık, yazar.
     Seçilen: overlay = ana sayfa V3 gibi görsel üstü metin (tek sürekli gradient). Karşılaştırma için
     panel = görsele binen bilgi kartı, glass = cam bilgi kutusu; ?hero=overlay|panel|glass. */
  const HEROES = ['overlay', 'panel', 'glass'];
  const HERO = HEROES.includes(params.get('hero')) ? params.get('hero') : 'overlay';
  function feature(r) {
    const info = `<div class="dg-feature__info">${text(r)}${author(r)}</div>`;
    if (HERO === 'panel') return `<article class="dg-feature dg-feature--panel"><div class="dg-feature__media">${media(r, 'dg-feature__visual')}${saveOf(r)}</div>${info}</article>`;
    return `<article class="dg-feature dg-feature--${HERO}"><div class="dg-feature__media">${media(r, 'dg-feature__visual')}${HERO === 'overlay' ? '<span class="dg-feature__veil" aria-hidden="true"></span>' : ''}${saveOf(r)}${info}</div></article>`;
  }
  // Izgarada ikili sıra yetim bırakmaz: tek sayılı sayfada ilk tarif öne çıkar.
  function layout(rs) {
    if (listView === 'liste') return `<div class="lv2-rows">${rs.map(r => card(r, 'row')).join('')}</div>`;
    const lead = rs.length % 2 === 1;
    return (lead ? feature(rs[0]) : '') + (rs.length > (lead ? 1 : 0) ? `<div class="lv2-grid">${rs.slice(lead ? 1 : 0).map(r => card(r)).join('')}</div>` : '');
  }
  function ordered() {
    const rs = filteredRecipes();
    if (sort === 'en_hizli') rs.sort((a, b) => a.minutes - b.minutes);
    if (sort === 'en_cok_puanlanan' || sort === 'puan') rs.sort((a, b) => Number(b.rating) - Number(a.rating));
    if (sort === 'en_yeni') rs.sort((a, b) => recipeDate(b) - recipeDate(a));
    return rs;
  }
  renderResults = function () {
    const found = ordered(), n = found.length, pages = Math.ceil(n / PAGE_SIZE);
    resultPage = Math.max(1, Math.min(resultPage, pages || 1));
    const rs = found.slice((resultPage - 1) * PAGE_SIZE, resultPage * PAGE_SIZE), results = q('#results');
    count.innerHTML = `<b>${n} tarif</b> bulundu`;
    sortButton.innerHTML = `${fa('arrow-down-wide-short')}<span class="lv2-sort__label"><span class="lv2-sort__prefix">Sıralama: </span><b>${esc(sortLabel())}</b></span>${fa('chevron-down')}`;
    sortButton.setAttribute('aria-label', `Sıralama: ${sortLabel()}`);
    results.inert = false; results.removeAttribute('aria-busy');
    results.className = 'recipe-list lv2-results ' + (listView === 'liste' ? 'is-list' : 'is-grid');
    results.innerHTML = rs.length ? layout(rs) : `<div class="lv2-empty"><span class="lv2-empty__mark">${fa('magnifying-glass')}</span><h2>Tarif bulunamadı</h2><p>Bu arama ve filtrelere uygun tarif yok. Seçimlerini temizleyip yeniden keşfet.</p><button class="button" data-clear>Tümünü Temizle</button></div>`;
    q('#pantryFilter').innerHTML = pantryIngredients.length ? `<button class="pantry-filter" data-clear-pantry>${icon('fridge')} ${esc(pantryIngredients.join(' + '))} ${icon('close')}</button>` : '';
    all('[data-view]').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === listView));
    const k = total(facetState);
    q('#filterBadge').textContent = k || '';
    filterButton.setAttribute('aria-label', k ? `Filtrele, ${k} filtre etkin` : 'Filtrele');
    q('#pagination').innerHTML = pages > 1 ? Array.from({length: pages}, (_, i) => `<button data-page-number="${i + 1}" class="dg-page" aria-label="Sayfa ${i + 1}" ${resultPage === i + 1 ? 'aria-current="page"' : ''}>${i + 1}</button>`).join('') : '';
    drawRail(); drawThemes();
    syncQuery();
    prepareInputFrames();
    queueMicrotask(() => { applyProse(results); hydratePhotos(results); updateListBanner(); paintFeatures(); });
  };
  loading = function () {
    const results = q('#results');
    count.textContent = 'Tarifler yükleniyor';
    if (!q('.dg-card,.dg-feature', results)) { results.className = 'recipe-list lv2-results ' + (listView === 'liste' ? 'is-list' : 'is-grid'); results.innerHTML = layout(DATA.recipes.slice(0, PAGE_SIZE)); }
    results.classList.add('is-loading'); results.setAttribute('aria-busy', 'true'); results.inert = true;
  };
  const baseTypeRoles = applyTypeRoles;
  applyTypeRoles = function (root = document) {
    baseTypeRoles(root);
    for (const h of all('.dg-card__title')) { const role = h.closest('.dg-feature') ? 'featured' : 'card'; if (h.dataset.typeRole !== role) h.dataset.typeRole = role; }
    for (const h of all('.dg-sheet__title')) if (h.dataset.typeRole !== 'sheet') h.dataset.typeRole = 'sheet';
    for (const h of all(".dg-facet__head")) if (h.dataset.typeRole !== 'subheading') h.dataset.typeRole = 'subheading';
  };

  /* ---------- dg-sheet: ortak alttan açılan panel yaşam döngüsü ---------- */
  function sheetLifecycle(dialog) {
    let startY = null;
    dialog.addEventListener('click', e => { if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientY < r.top || e.clientX < r.left || e.clientX > r.right) dialog.close(); });
    dialog.addEventListener('pointerdown', e => { if (e.target.closest('.handle,.dg-sheet__head')) startY = e.clientY; });
    dialog.addEventListener('pointerup', e => { if (startY !== null && e.clientY - startY > 60) dialog.close(); startY = null; });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  }

  /* ---------- Filtre sheet'i (web sırası, tek açık akordeon, taslak + canlı sayı) ---------- */
  const filters = document.createElement('dialog');
  filters.className = 'sheet dg-sheet lv2-filter-sheet';
  filters.id = 'lv2Filters';
  filters.setAttribute('aria-labelledby', 'lv2FilterTitle');
  const VISIBLE = 8;
  filters.innerHTML = `<div class="handle" aria-hidden="true"></div>
    <div class="sheet-head dg-sheet__head"><h2 class="dg-sheet__title" id="lv2FilterTitle">${fa('sliders')}<span>Filtreler</span> <span class="dg-badge" data-sheet-total></span></h2><button type="button" class="icon-button dg-sheet__close" data-filter-close aria-label="Filtreleri kapat">${icon('close')}</button></div>
    <div class="dg-sheet__chips dg-chip-rail" aria-live="polite"></div>
    <form class="dg-sheet__scroll" id="lv2FilterForm">${PARITY.list.groups.map(g => `<section class="dg-facet" data-facet="${g.key}">
      <h3 class="dg-facet__heading"><button type="button" class="dg-facet__head" aria-expanded="false" aria-controls="facet-${g.key}" id="facet-head-${g.key}"><span class="dg-facet__icon">${GROUP_ICON[g.key] ? fa(GROUP_ICON[g.key]) : ''}</span><span class="dg-facet__label">${esc(g.label)}</span><span class="dg-badge" data-group-count></span>${fa('chevron-down')}</button></h3>
      <div class="dg-facet__body" id="facet-${g.key}" role="region" aria-labelledby="facet-head-${g.key}" inert><div class="dg-facet__inner">
        ${g.options.map((o, i) => `<label class="dg-option" ${i >= VISIBLE ? 'data-extra hidden' : ''}><input type="checkbox" name="${g.key}" value="${esc(o.value)}">${mark(g.key, o.value)}<span class="dg-option__label">${esc(plain(o.label))}</span><span class="dg-option__count">${esc(countOf(o.label))}</span></label>`).join('')}
        ${g.options.length > VISIBLE ? `<button type="button" class="dg-more" data-more="${g.options.length - VISIBLE} seçenek daha" aria-expanded="false">${g.options.length - VISIBLE} seçenek daha ${fa('chevron-down')}</button>` : ''}
      </div></div></section>`).join('')}</form>
    <div class="dg-sheet__foot"><button type="button" class="button secondary" data-filter-reset>Temizle</button><button type="button" class="button" data-filter-apply>Tarifleri göster</button></div>`;
  document.body.append(filters);
  prepareChoices(filters);
  hydratePhotos(filters);
  const form = q('#lv2FilterForm', filters);
  form.addEventListener('submit', e => e.preventDefault());
  let draft = {};
  const readDraft = () => { const d = {}; for (const i of all('input:checked', form)) (d[i.name] ??= []).push(i.value); return d; };
  function syncDraft() {
    draft = readDraft();
    const n = total(draft);
    q('[data-sheet-total]', filters).textContent = n || '';
    for (const s of all('.dg-facet', filters)) q('[data-group-count]', s).textContent = (draft[s.dataset.facet] || []).length || '';
    const chips = q('.dg-sheet__chips', filters);
    chips.innerHTML = n ? Object.entries(draft).flatMap(([k, vs]) => vs.map(v => `<button type="button" class="dg-chip dg-chip--removable" data-unpick="${esc(k)}" data-value="${esc(v)}" aria-label="${esc(facetLabel(k, v))} filtresini kaldır">${mark(k, v)}<span class="dg-chip__label">${esc(facetLabel(k, v))}</span>${fa('xmark')}</button>`)).join('') : '<span class="dg-sheet__hint">Seçtiğin filtreler burada görünür.</span>';
    hydratePhotos(chips);
    q('[data-filter-apply]', filters).textContent = `${filteredRecipes(draft, '', '', '').length} tarifi göster`;
  }
  form.addEventListener('change', syncDraft);
  // Akordeon: tek açık. Açılan başlık ekranda yerinde kalır; yukarıdaki bölüm kapanırken kaydırma telafi edilir.
  function setOpen(section, open) {
    const head = q('.dg-facet__head', section);
    head.setAttribute('aria-expanded', open); section.classList.toggle('is-open', open); q('.dg-facet__body', section).inert = !open;
  }
  function toggleFacet(section) {
    const head = q('.dg-facet__head', section), opening = head.getAttribute('aria-expanded') !== 'true', anchor = head.getBoundingClientRect().top;
    const sections = all('.dg-facet', filters), index = sections.indexOf(section);
    // Yukarıda kapanacak bölümün yüksekliği kaydırmayla karşılanabiliyorsa o bölüm anında kapanır ve
    // aynı karede telafi edilir: açılan başlık hiç kıpırdamaz. Karşılanamıyorsa (liste başında) yumuşak kayar.
    const above = sections.slice(0, index).filter(s => s.classList.contains('is-open'));
    const shrink = above.reduce((sum, s) => sum + q('.dg-facet__body', s).offsetHeight, 0);
    const instant = opening && shrink > 0 && form.scrollTop >= shrink;
    if (instant) above.forEach(s => q('.dg-facet__body', s).style.transition = 'none');
    for (const s of sections) setOpen(s, s === section ? opening : false);
    const keep = () => { form.scrollTop += head.getBoundingClientRect().top - anchor; };
    if (instant) { keep(); requestAnimationFrame(() => above.forEach(s => q('.dg-facet__body', s).style.transition = '')); return; }
    if (reduced()) { keep(); return; }
    const until = performance.now() + 320;
    const frame = () => { keep(); if (performance.now() < until) requestAnimationFrame(frame); };
    requestAnimationFrame(frame);
  }
  filters.addEventListener('click', e => {
    const head = e.target.closest('.dg-facet__head'), more = e.target.closest('.dg-more'), unpick = e.target.closest('[data-unpick]');
    if (head) toggleFacet(head.closest('.dg-facet'));
    if (more) { const open = more.getAttribute('aria-expanded') !== 'true'; more.setAttribute('aria-expanded', open); all('[data-extra]', more.parentElement).forEach(o => o.hidden = !open); more.innerHTML = `${open ? 'Daha az göster' : more.dataset.more} ${fa(open ? 'chevron-up' : 'chevron-down')}`; }
    if (unpick) { const input = all('input', form).find(i => i.name === unpick.dataset.unpick && i.value === unpick.dataset.value); if (input) { input.checked = false; syncDraft(); } }
    if (e.target.closest('[data-filter-reset]')) { all('input:checked', form).forEach(i => i.checked = false); syncDraft(); }
    if (e.target.closest('[data-filter-apply]')) { facetState = clone(draft); category = difficulty = duration = ''; resultPage = 1; renderResults(); filters.close(); }
    if (e.target.closest('[data-filter-close]')) filters.close();
  });
  sheetLifecycle(filters);
  filterButton.addEventListener('click', () => {
    for (const i of all('input', form)) i.checked = (facetState[i.name] || []).includes(i.value);
    // İlk bölüm açık; seçimi olan bölüm varsa o açılır. "N seçenek daha" kapalı başlar.
    const first = all('.dg-facet', filters).find(s => (facetState[s.dataset.facet] || []).length) || q('.dg-facet', filters);
    for (const s of all('.dg-facet', filters)) setOpen(s, s === first);
    syncDraft();
    form.scrollTop = 0;
    filters.showModal();
    document.body.style.overflow = 'hidden';
    applyTypeRoles(filters);
  });

  /* ---------- Sıralama sheet'i (webdeki ayrı menü; aynı dg-sheet ailesi) ---------- */
  const sorter = document.createElement('dialog');
  sorter.className = 'sheet dg-sheet lv2-sort-sheet';
  sorter.setAttribute('aria-labelledby', 'lv2SortTitle');
  document.body.append(sorter);
  sheetLifecycle(sorter);
  sortButton.addEventListener('click', () => {
    const current = sort === 'puan' ? 'en_cok_puanlanan' : sort;
    sorter.innerHTML = `<div class="handle" aria-hidden="true"></div><div class="sheet-head dg-sheet__head"><h2 class="dg-sheet__title" id="lv2SortTitle">Sıralama</h2><button type="button" class="icon-button dg-sheet__close" data-sort-close aria-label="Sıralamayı kapat">${icon('close')}</button></div><div class="dg-choice-list" role="radiogroup" aria-label="Sıralama">${SORTS.map(([v, l, i]) => `<button type="button" class="dg-choice" role="radio" aria-checked="${current === v}" data-lv2-sort="${v}"><span class="dg-choice__icon">${fa(i)}</span><span class="dg-choice__label">${l}</span>${fa('check')}</button>`).join('')}</div>`;
    sorter.showModal();
    document.body.style.overflow = 'hidden';
    applyTypeRoles(sorter);
  });
  sorter.addEventListener('click', e => {
    const s = e.target.closest('[data-lv2-sort]');
    if (s) { sort = s.dataset.lv2Sort; resultPage = 1; renderResults(); sorter.close(); }
    if (e.target.closest('[data-sort-close]')) sorter.close();
  });

  /* ---------- Şerit seçimleri ---------- */
  document.addEventListener('click', e => {
    const s = e.target.closest('[data-ld-scope]'), t = e.target.closest('[data-lv2-facet]');
    if (s) { scope = s.dataset.ldScope; rail.scrollLeft = 0; drawRail(); }
    if (t) { facetState[t.dataset.lv2Facet] = t.dataset.value ? [t.dataset.value] : []; category = ''; resultPage = 1; renderResults(); }
  });

  /* ---------- Header: metin geometrisinden eşik (liste-six.js n=1 aktarımı) ---------- */
  const old = syncHeader;
  removeEventListener('scroll', old); removeEventListener('resize', old);
  document.removeEventListener('scroll', old, true); motion.removeEventListener('change', old);
  visualViewport?.removeEventListener('scroll', old);
  headerGeometryObserver.disconnect();
  let titleTop = 0;
  function measure() { const title = q('.list-banner h1'); if (title) titleTop = title.offsetTop + title.offsetParent.offsetTop; }
  syncHeader = function () {
    const h = q('.topbar');
    if (!h) return;
    const height = h.getBoundingClientRect().height, threshold = Math.max(1, titleTop - height - token('--space-8')), fade = Math.min(token('--space-48'), threshold);
    const a = reduced() ? Number(scrollY >= fade) : Math.min(1, Math.max(0, scrollY / fade));
    h.style.setProperty('background-color', `color-mix(in srgb,var(--lv2-header-solid) ${(a * 100).toFixed(1)}%,transparent)`, 'important');
    h.dataset.alpha = a.toFixed(3); h.dataset.threshold = fade.toFixed(2);
    h.classList.toggle('is-solid', a === 1);
    tools.classList.toggle('is-stuck', panel.getBoundingClientRect().top <= height + .5);
    const meta = q('meta[name="theme-color"]');
    if (meta) meta.content = a === 1 ? getComputedStyle(document.body).getPropertyValue('--lv2-header-solid').trim() : css.getPropertyValue('--ink').trim();
  };
  addEventListener('scroll', syncHeader, {passive: true});
  motion.addEventListener('change', syncHeader);
  new ResizeObserver(() => document.body.style.setProperty('--lv2-tools-h', tools.offsetHeight + 'px')).observe(tools);
  addEventListener('resize', () => { measure(); paintBanner(); paintFeatures(); syncHeader(); });

  /* ---------- Alt menü (ana sayfa V3 ile aynı) ve çekmece ---------- */
  const navItems = all('.bottom-nav .nav-item');
  navItems[3].innerHTML = `${fa('lightbulb')}<span>Püf Noktaları</span>`;
  navItems[3].setAttribute('href', '');
  // Side menu: the shared component (ortak-menu.css/js), identical on all three screens.
  // The current row follows the list state: a category, a cuisine or all recipes.
  addEventListener('DOMContentLoaded', () => window.OrtakMenu?.configure({
    active: () => (category || (facetState.kategori || []).length ? 'categories' : (facetState.mutfak || []).length ? 'cuisines' : 'all'),
    links: {home: HOME, recipes: 'liste-v2.html', categories: 'liste-v2.html', cuisines: 'liste-v2.html', ask: 'ana-v3.html#ne-pisirsem', pantry: 'ana-v3.html#dolap', tips: 'ana-v3.html#puf', plate: 'tabaktan-tarif.html?donus=liste-v2.html'},
    actions: {ask: () => { const b = q('.bottom-nav [data-photo-entry]'); if (!b) return false; b.click(); }}
  }));

  measure();
  // ?durum=yukleniyor kaynakta olduğu gibi iskelette kalır; iskelet gerçek yerleşimle aynı DOM'dur.
  if (params.get('durum') === 'yukleniyor') { q('#results').replaceChildren(); loading(); drawRail(); drawThemes(); updateListBanner(); } else renderResults();
  paintBanner();
  syncHeader();
  document.fonts.ready.then(() => { measure(); paintBanner(); paintFeatures(); syncHeader(); });
  // Aday karşılaştırması: ?aday=1 öne çıkan kartı görünüme getirir (yalnız galeri).
  if (params.get('aday')) addEventListener('load', () => setTimeout(() => { q('.dg-feature')?.scrollIntoView({block: 'center', behavior: 'instant'}); }, 400));
  window.LIST_V2_READY = true;
})();
