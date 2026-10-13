// Liste V2 ölçüm ve kanıt betiği. Çalıştır (v3-app içinden): node docs/liste-v2/liste-v2-qa.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {brightest} from './contrast-lib.mjs';
const BASE = 'http://127.0.0.1:8765/v3-app/', SHOTS = 'docs/screenshots/liste-v2';
for (const d of [SHOTS, `${SHOTS}/kirpim`, `${SHOTS}/sheet`, `${SHOTS}/adaylar`]) fs.mkdirSync(d, {recursive: true});
const out = {generated: new Date().toISOString(), matrix: [], states: {}, functional: {}, stability: {}, sheet: {}, compare: {}};

async function open(browser, url, width, scale = 1) {
  const page = await browser.newPage({viewport: {width, height: 844}, deviceScaleFactor: scale});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(BASE + url);
  await page.waitForFunction(() => window.LIST_V2_READY || window.LD_READY || window.HOME_V3_READY, null, {timeout: 8000}).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  return {page, errors};
}
async function loadPhotos(page) {
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); } scrollTo(0, 0); });
  await page.waitForTimeout(1500);
}
const rectOf = (page, sel) => page.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return {x: r.x, y: r.y, width: r.width, height: r.height}; }, sel);

// Sayfa ölçümleri (tarayıcı içinde).
const inspect = () => {
  const rect = e => e.getBoundingClientRect(), lineH = e => parseFloat(getComputedStyle(e).lineHeight);
  const anySave = document.querySelector('.dg-save'), inset = anySave ? parseFloat(getComputedStyle(anySave, '::before').top) || 0 : 0;
  const results = document.querySelector('#results');
  const cards = [...results.querySelectorAll('.dg-card,.dg-feature')].map(c => {
    const author = c.querySelector('.dg-author'), name = c.querySelector('.dg-author__name'), h3 = c.querySelector('.dg-card__title'), cat = c.querySelector('.dg-card__category'), media = c.querySelector('.dg-card__media,.dg-feature__media'), meta = c.querySelector('.dg-meta'), save = c.querySelector('.dg-save');
    const ar = rect(author), cr = rect(c), mr = rect(media), pr = rect(meta), sr = rect(save);
    return {
      kind: c.className, title: h3.textContent,
      authorVisible: ar.width > 0 && ar.height > 0 && ar.left >= cr.left - .5 && ar.right <= cr.right + .5,
      authorName: name.textContent, authorSingleLine: Math.round(rect(name).height) <= Math.ceil(lineH(name)), authorEllipsis: getComputedStyle(name).textOverflow,
      avatar: [Math.round(rect(c.querySelector('.dg-avatar')).width), Math.round(rect(c.querySelector('.dg-avatar')).height)],
      titleLines: Math.round(rect(h3).height / lineH(h3)), titleClamp: getComputedStyle(h3).webkitLineClamp,
      categoryFont: getComputedStyle(cat).fontFamily.split(',')[0].replace(/"/g, ''),
      forbidden: c.querySelectorAll('.card-secondary,.card-subtitle,.card-detail-meta,.card-views,.card-badges,p,.cost').length,
      media: [Math.round(mr.width), Math.round(mr.height)],
      metaInside: pr.left >= mr.left + 7.5 && pr.right <= mr.right - 7.5 && pr.bottom <= mr.bottom - 7.5 && pr.top >= mr.top + 7.5,
      metaOverflow: meta.scrollWidth > meta.clientWidth + 1,
      save: {hit: [Math.round(sr.width), Math.round(sr.height)], fromRight: Math.round(mr.right - (sr.right - inset)), fromTop: Math.round((sr.top + inset) - mr.top)}
    };
  });
  const grid = results.querySelector('.lv2-grid'), feature = results.querySelector('.dg-feature');
  const targets = [...document.querySelectorAll('.topbar .icon-button,#openFilters,.lv2-sort-button,.view-toggle button,.lv2-scope button,.dg-chip,.dg-page,.dg-save,.nav-item,.search-box')].filter(e => e.getClientRects().length).map(e => { const r = rect(e); return {cls: e.className, w: Math.round(r.width), h: Math.round(r.height)}; });
  const banner = document.querySelector('.lv2-banner'), panel = document.querySelector('.lv2-panel'), stats = banner.querySelector('.dg-stats');
  const range = e => { const r = document.createRange(); r.selectNodeContents(e); const rs = [...r.getClientRects()]; return {left: Math.min(...rs.map(x => x.left)), right: Math.max(...rs.map(x => x.right)), bottom: Math.max(...rs.map(x => x.bottom))}; };
  const items = stats ? [...stats.querySelectorAll('.dg-stats__item')] : [], seps = stats ? [...stats.querySelectorAll('.dg-stats__sep')] : [];
  const sepBalance = seps.map((s, i) => { const l = rect(items[i]).right, r = rect(items[i + 1]).left, c = rect(s).left + rect(s).width / 2; return Math.round(((c - l) - (r - c)) * 10) / 10; });
  const veil = s => { const m = [...(s || '').matchAll(/(\d+(?:\.\d+)?)%,transparent\)/g)].map(x => Number(x[1])); return {stops: m.length, maxStep: m.length ? +Math.max(...m.slice(1).map((v, i) => Math.abs(v - m[i]))).toFixed(2) : null}; };
  const edge = list => list.length ? {firstTop: getComputedStyle(list[0]).borderTopWidth, lastBottom: getComputedStyle(list[list.length - 1]).borderBottomWidth} : null;
  return {
    overflowX: document.documentElement.scrollWidth > innerWidth,
    rawText: /\b(null|undefined|NaN)\b/.test(document.body.innerText),
    cards, gridCount: grid ? grid.children.length : 0, gridEven: grid ? grid.children.length % 2 === 0 : true, feature: !!feature,
    smallTargets: targets.filter(t => t.w < 44 || t.h < 44), targetCount: targets.length,
    banner: {
      veil: veil(banner.style.getPropertyValue('--lv2-veil')),
      gutter: Math.round(rect(banner.querySelector('h1')).left), statsLeft: items[0] ? Math.round(range(items[0]).left) : null, statsRight: items.length ? Math.round(innerWidth - range(items[items.length - 1]).right) : null,
      searchLeft: Math.round(rect(document.querySelector('.search-box')).left), sepBalance,
      statFont: items[0] ? getComputedStyle(items[0]).fontSize : null,
      copyToPanel: Math.round((rect(panel).top - rect(banner.querySelector('.list-banner-copy')).bottom) * 10) / 10,
      textToPanel: items.length ? Math.round((rect(panel).top - Math.max(...items.map(e => range(e).bottom))) * 10) / 10 : null
    },
    rowsEdge: edge([...results.querySelectorAll('.dg-card--row')]),
    count: document.querySelector('#resultCount').textContent, badge: document.querySelector('#filterBadge').textContent,
    removed: {fridge: !!document.querySelector('.list-fridge-link'), themeExpander: !!document.querySelector('.theme-expander'), oldChips: document.querySelectorAll('[data-category]').length, activeFacets: !!document.querySelector('#activeFacets')},
    rhythm: (() => { const s = rect(document.querySelector('.search-box')), t = rect(document.querySelector('.lv2-scope')), r = rect(document.querySelector('.lv2-rail')); return {searchToScope: Math.round(t.top - s.bottom), scopeToRail: Math.round(r.top - t.bottom)}; })()
  };
};

// 1 · Motor × genişlik matrisi
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const width of [360, 390, 430]) {
    for (const view of ['grid', 'liste']) {
      const {page, errors} = await open(browser, 'liste-v2.html' + (view === 'liste' ? '?gorunum=liste' : ''), width);
      await loadPhotos(page);
      const row = {engine: engineName, width, view, ...(await page.evaluate(inspect))};
      if (view === 'grid') {
        row.header = [];
        for (let y = 0; y <= 400; y += 20) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(60); row.header.push([y, await page.evaluate(() => [Number(document.querySelector('.topbar').dataset.alpha), document.querySelector('.list-tools').classList.contains('is-stuck'), Math.round(document.querySelector('.list-tools').getBoundingClientRect().top)])]); }
        row.logo = [];
        for (const y of [0, 24, 48, 120]) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(200); const m = await brightest(page, await rectOf(page, '.brand-logo img'), '.brand-logo img'); row.logo.push(+m.contrastWhite.toFixed(2)); }
        await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(200);
        row.bannerTextContrast = +(await brightest(page, await rectOf(page, '.lv2-banner .list-banner-copy'), '.lv2-banner .list-banner-copy')).contrastWhite.toFixed(2);
        await page.screenshot({path: `${SHOTS}/${engineName}-${width}-ust.png`});
      }
      if (width === 390) { await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(200); await page.screenshot({path: `${SHOTS}/${engineName}-390-${view}-tam.png`, fullPage: true}); }
      row.errors = errors;
      out.matrix.push(row);
      await page.close();
    }
  }
  await browser.close();
}

// 2 · Durumlar, kararlılık (zıplama) ve sheet (Chromium 390)
const browser = await chromium.launch();
{
  const state = async (name, url, action, full = false) => {
    const {page, errors} = await open(browser, url, 390);
    if (action) { await page.evaluate(action); await page.waitForTimeout(900); }
    const d = await page.evaluate(inspect);
    if (full) await loadPhotos(page);
    await page.screenshot({path: `${SHOTS}/durum-${name}.png`, fullPage: full});
    out.states[name] = {errors, count: d.count, badge: d.badge, cards: d.cards.length, gridEven: d.gridEven, feature: d.feature, overflowX: d.overflowX, bannerTitle: await page.evaluate(() => document.querySelector('.lv2-banner h1').textContent), bannerStats: await page.evaluate(() => document.querySelector('.dg-stats')?.innerText.replace(/\s+/g, ' ') || '')};
    return page;
  };
  let p = await state('kategori', 'liste-v2.html', () => document.querySelector('[data-lv2-facet][data-value="balik-ve-deniz-urunleri"]').click());
  out.states.kategori.logoContrast = +(await brightest(p, await rectOf(p, '.brand-logo img'), '.brand-logo img')).contrastWhite.toFixed(2);
  await p.close();
  p = await state('dunya-mutfaklari', 'liste-v2.html', () => document.querySelector('[data-ld-scope="mutfak"]').click());
  out.functional.flags = await p.evaluate(() => ({chips: document.querySelectorAll('.lv2-rail .dg-chip').length, flags: document.querySelectorAll('.lv2-rail .dg-mark--flag img').length, globe: document.querySelectorAll('.lv2-rail .dg-mark .fa-globe').length, chipHeights: [...new Set([...document.querySelectorAll('.lv2-rail .dg-chip')].map(c => Math.round(c.getBoundingClientRect().height)))], loaded: [...document.querySelectorAll('.lv2-rail img')].slice(0, 10).every(i => i.complete && i.naturalWidth > 0)}));
  await p.evaluate(() => document.querySelector('[data-lv2-facet][data-value="turk-mutfagi"]').click()); await p.waitForTimeout(700);
  await p.screenshot({path: `${SHOTS}/durum-dunya-mutfaklari-secili.png`});
  out.states.mutfakSecili = await p.evaluate(() => ({count: document.querySelector('#resultCount').textContent, title: document.querySelector('.lv2-banner h1').textContent, stats: document.querySelector('.dg-stats')?.innerText}));
  await p.close();
  p = await state('sifir-sonuc', 'liste-v2.html?q=zzzz', null, true);
  out.functional.empty = await p.evaluate(() => ({empty: !!document.querySelector('.lv2-empty'), banner: !!document.querySelector('.lv2-banner')}));
  await p.evaluate(() => document.querySelector('[data-clear]').click()); await p.waitForTimeout(400);
  out.functional.clearRestores = await p.evaluate(() => document.querySelector('#resultCount').textContent);
  await p.close();
  p = await state('menu-acik', 'liste-v2.html', () => document.querySelector('[data-site-menu]').click());
  // Sağ menü: ortak-menu.css/js (dialog.om). Header düğmesiyle açılır, etkin satır liste durumunu izler,
  // kapat düğmesi ve Escape ile kapanır; kategori seçiliyken "Kategoriler" satırı etkin olur.
  const menuState = () => p.evaluate(() => { const d = document.querySelector('dialog.om'); return d ? {open: d.open, shown: d.classList.contains('is-in'), logo: d.querySelector('.om-logo img')?.getAttribute('src'), active: [...d.querySelectorAll('.om-row.is-active')].map(r => r.dataset.omId), recipesOpen: !!d.querySelector('.om-group.is-open [data-om-id="all"]'), closeSize: (() => { const r = d.querySelector('.om-close')?.getBoundingClientRect(); return r ? [Math.round(r.width), Math.round(r.height)] : null; })(), locked: document.documentElement.classList.contains('om-locked')} : null; });
  const drawer = {opened: await menuState()};
  await p.click('.om-close'); await p.waitForTimeout(400);
  drawer.afterClose = await menuState();
  await p.click('[data-site-menu]'); await p.waitForTimeout(400);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  drawer.afterEscape = await menuState();
  await p.evaluate(() => document.querySelector('[data-lv2-facet][data-value="tatli"]').click()); await p.waitForTimeout(500);
  await p.click('[data-site-menu]'); await p.waitForTimeout(400);
  drawer.withCategory = await menuState();
  out.functional.drawer = drawer;
  await p.close();
  p = await state('yukleniyor', 'liste-v2.html?durum=yukleniyor');
  out.functional.loading = await p.evaluate(() => ({busy: document.querySelector('#results').getAttribute('aria-busy'), inert: document.querySelector('#results').inert, skeleton: document.querySelectorAll('#results .dg-card,#results .dg-feature').length}));
  await p.close();
  for (const y of [0, 60, 120, 300]) { p = await state(`header-${y}`, 'liste-v2.html', new Function(`scrollTo(0,${y})`)); await p.close(); }
  p = await state('satir-gorunumu', 'liste-v2.html?gorunum=liste', null, true); await p.close();

  // Zıplama testi: etkileşimden önce/sonra sabit kalması gereken öğelerin ekran konumu (top, yükseklik, genişlik).
  const {page: s} = await open(browser, 'liste-v2.html', 390);
  const pos = () => s.evaluate(() => Object.fromEntries([['search', '.list-tools .search-box'], ['themes', '.lv2-theme-rail'], ['status', '.lv2-status'], ['rail', '.lv2-rail'], ['filter', '#openFilters'], ['sort', '.lv2-sort-group']].map(([k, sel]) => { const r = document.querySelector(sel).getBoundingClientRect(); return [k, [r.top, r.height, r.width]]; })));
  await s.evaluate(() => scrollTo(0, 200)); await s.waitForTimeout(300);
  const steps = [['tema', () => document.querySelector('.lv2-theme-rail .dg-chip:nth-child(2)').click()], ['tema-tumu', () => document.querySelector('.lv2-theme-rail .dg-chip:first-child').click()], ['kategori', () => document.querySelector('[data-lv2-facet][data-value="tatli"]').click()], ['kategori-tumu', () => document.querySelector('[data-lv2-facet][data-value=""]').click()], ['siralama', () => { document.querySelector('.lv2-sort-button').click(); document.querySelector('[data-lv2-sort="en_cok_puanlanan"]').click(); }], ['gorunum', () => document.querySelector('[data-view="liste"]').click()], ['gorunum-geri', () => document.querySelector('[data-view="grid"]').click()]];
  for (const [name, fn] of steps) {
    const before = await pos();
    if (name === 'tema') await s.screenshot({path: `${SHOTS}/tema-once.png`});
    await s.evaluate(fn); await s.waitForTimeout(500);
    const after = await pos();
    if (name === 'tema') await s.screenshot({path: `${SHOTS}/tema-sonra.png`});
    out.stability[name] = {maxShift: +Math.max(...Object.keys(before).flatMap(k => before[k].map((v, i) => Math.abs(after[k][i] - v)))).toFixed(1), detail: Object.fromEntries(Object.keys(before).map(k => [k, before[k].map((v, i) => +(after[k][i] - v).toFixed(1))])), count: await s.evaluate(() => document.querySelector('#resultCount').textContent), themeActive: await s.evaluate(() => document.querySelector('.lv2-theme-rail [aria-pressed=true] .dg-chip__label')?.textContent || null), sort: await s.evaluate(() => document.querySelector('.lv2-sort-button').getAttribute('aria-label'))};
  }
  await s.close();

  // 3 · Filtre sheet'i
  const {page: f} = await open(browser, 'liste-v2.html', 390);
  await f.click('#openFilters'); await f.waitForTimeout(500);
  out.sheet.structure = await f.evaluate(() => [...document.querySelectorAll('#lv2Filters .dg-facet')].map(s => ({key: s.dataset.facet, label: s.querySelector('.dg-facet__label').textContent, icon: s.querySelector('.dg-facet__icon i')?.className.replace('icon fa-solid ', '') || null, options: s.querySelectorAll('.dg-option').length, visible: s.querySelectorAll('.dg-option:not([hidden])').length, more: s.querySelector('.dg-more')?.textContent.trim() || null, flags: s.querySelectorAll('.dg-mark--flag img').length, photos: s.querySelectorAll('.dg-mark__photo').length, icons: s.querySelectorAll('.dg-option .dg-mark .icon').length, counts: s.querySelectorAll('.dg-option__count').length})));
  out.sheet.dividers = await f.evaluate(() => { const g = [...document.querySelectorAll('#lv2Filters .dg-facet')]; return {firstTop: getComputedStyle(g[0]).borderTopWidth, lastBottom: getComputedStyle(g[g.length - 1]).borderBottomWidth, between: getComputedStyle(g[1]).borderTopWidth, optionBorders: [...document.querySelectorAll('#lv2Filters .dg-option')].filter(o => getComputedStyle(o).borderTopWidth !== '0px' || getComputedStyle(o).borderBottomWidth !== '0px').length}; });
  await f.screenshot({path: `${SHOTS}/sheet/1-ilk-acilis.png`});
  await f.click('#facet-head-kategori'); await f.waitForTimeout(450);
  out.sheet.allClosed = await f.evaluate(() => document.querySelectorAll('#lv2Filters .dg-facet.is-open').length);
  await f.screenshot({path: `${SHOTS}/sheet/2-kapali-bolumler.png`});
  await f.click('#facet-head-kategori'); await f.waitForTimeout(450);
  await f.evaluate(() => { document.querySelector('#lv2Filters input[value="tatli"]').click(); document.querySelector('#lv2Filters input[value="balik-ve-deniz-urunleri"]').click(); });
  await f.waitForTimeout(200);
  // Akordeon zıplaması: Kategori açıkken Mutfak'ı aç; Mutfak başlığı ekranda yerinde kalmalı.
  const headBefore = await f.evaluate(() => document.querySelector('#facet-head-mutfak').getBoundingClientRect().top);
  const trace = await f.evaluate(async () => { const h = document.querySelector('#facet-head-mutfak'); const t = []; h.click(); const start = performance.now(); while (performance.now() - start < 420) { await new Promise(r => requestAnimationFrame(r)); t.push(Math.round(h.getBoundingClientRect().top * 10) / 10); } return t; });
  out.sheet.accordion = {fromTop: {before: Math.round(headBefore * 10) / 10, after: trace[trace.length - 1], maxFrameStep: +Math.max(...trace.slice(1).map((t, i) => Math.abs(t - trace[i])), Math.abs(trace[0] - headBefore)).toFixed(1), frames: trace.length}, open: await f.evaluate(() => [...document.querySelectorAll('#lv2Filters .dg-facet.is-open')].map(s => s.dataset.facet))};
  // Kaydırılmış durumda (kullanıcı Kategori listesini geçip Yemek Modu'na dokunur): başlık yerinde kalmalı.
  await f.evaluate(() => { const s = document.querySelector('#lv2FilterForm'); s.scrollTop = document.querySelector('#facet-head-beslenme').closest('.dg-facet').offsetTop - 60; });
  await f.waitForTimeout(200);
  const ymBefore = await f.evaluate(() => document.querySelector('#facet-head-beslenme').getBoundingClientRect().top);
  const ymTrace = await f.evaluate(async () => { const h = document.querySelector('#facet-head-beslenme'); const t = []; h.click(); const start = performance.now(); while (performance.now() - start < 420) { await new Promise(r => requestAnimationFrame(r)); t.push(Math.round(h.getBoundingClientRect().top * 10) / 10); } return t; });
  out.sheet.accordion.scrolled = {before: Math.round(ymBefore * 10) / 10, maxDrift: +Math.max(...ymTrace.map(t => Math.abs(t - ymBefore))).toFixed(1), frames: ymTrace.length};
  await f.click('#facet-head-mutfak'); await f.waitForTimeout(450);
  await f.evaluate(() => document.querySelector('#lv2Filters input[value="turk-mutfagi"]').click()); await f.waitForTimeout(200);
  out.sheet.selection = await f.evaluate(() => ({title: document.querySelector('#lv2FilterTitle').textContent.trim(), chips: [...document.querySelectorAll('#lv2Filters .dg-sheet__chips .dg-chip')].map(c => c.textContent.trim()), groupCounts: [...document.querySelectorAll('#lv2Filters .dg-facet')].map(s => s.dataset.facet + ':' + s.querySelector('[data-group-count]').textContent).filter(x => !x.endsWith(':')), apply: document.querySelector('[data-filter-apply]').textContent}));
  await f.screenshot({path: `${SHOTS}/sheet/3-secim-yapilmis.png`});
  await f.evaluate(() => { const s = document.querySelector('#lv2FilterForm'); s.scrollTop = s.scrollHeight; }); await f.waitForTimeout(300);
  out.sheet.bottom = await f.evaluate(() => { const d = document.querySelector('#lv2Filters').getBoundingClientRect(), foot = document.querySelector('.dg-sheet__foot').getBoundingClientRect(), s = document.querySelector('#lv2FilterForm'); return {footFlush: Math.round(d.bottom - foot.bottom), scrolls: s.scrollHeight > s.clientHeight, sheetHeight: Math.round(d.height), viewport: innerHeight}; });
  await f.screenshot({path: `${SHOTS}/sheet/4-en-alt.png`});
  await f.evaluate(() => document.querySelector('[data-unpick="kategori"][data-value="tatli"]').click()); await f.waitForTimeout(200);
  out.sheet.unpick = await f.evaluate(() => [document.querySelectorAll('#lv2Filters .dg-sheet__chips .dg-chip').length, document.querySelector('#lv2Filters input[value="tatli"]').checked, document.querySelector('[data-filter-apply]').textContent]);
  await f.evaluate(() => document.querySelector('[data-filter-apply]').click()); await f.waitForTimeout(500);
  out.sheet.applied = await f.evaluate(() => ({closed: !document.querySelector('#lv2Filters').open, count: document.querySelector('#resultCount').textContent, badge: document.querySelector('#filterBadge').textContent, banner: document.querySelector('.lv2-banner h1').textContent}));
  await f.click('#openFilters'); await f.waitForTimeout(400);
  await f.evaluate(() => document.querySelector('[data-filter-reset]').click()); await f.waitForTimeout(200);
  out.sheet.reset = await f.evaluate(() => ({checked: document.querySelectorAll('#lv2FilterForm input:checked').length, apply: document.querySelector('[data-filter-apply]').textContent, hint: !!document.querySelector('.dg-sheet__hint')}));
  await f.keyboard.press('Escape'); await f.waitForTimeout(400);
  await f.click('.lv2-sort-button'); await f.waitForTimeout(400);
  out.sheet.sort = await f.evaluate(() => [...document.querySelectorAll('.dg-choice')].map(c => c.textContent.trim() + (c.getAttribute('aria-checked') === 'true' ? ' ✓' : '') + ' ' + c.querySelector('.dg-choice__icon i').className.replace('icon fa-solid ', '')));
  await f.screenshot({path: `${SHOTS}/sheet/5-siralama.png`});
  await f.close();

  // 4 · Yakın çekim (3×, yalnız kanıt büyütmesi): banner, kart, satır, öne çıkan adaylar.
  for (const [name, url] of [['liste-1', 'liste-1.html'], ['v2', 'liste-v2.html']]) {
    const {page: c} = await open(browser, url, 390, 3);
    await c.screenshot({path: `${SHOTS}/kirpim/${name}-banner.png`, clip: {x: 0, y: 0, width: 390, height: 320}});
    await c.close();
  }
  for (const [name, url, sel] of [['kirpim/v2-kart', 'liste-v2.html', '.lv2-grid>.dg-card'], ['kirpim/v2-satir', 'liste-v2.html?gorunum=liste', '.dg-card--row:nth-child(2)'], ['kirpim/liste-1-kart', 'liste-1.html', '.results-grid>.recipe-card'], ['kirpim/ana-v3-kart', 'ana-v3.html', '.collection-body>.recipe-card:nth-child(2)'], ['kirpim/v2-one-cikan', 'liste-v2.html', '.dg-feature']]) {
    const {page: c} = await open(browser, url, 390, 3);
    await c.addStyleTag({content: '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}'});
    await loadPhotos(c);
    await c.evaluate(sel => document.querySelector(sel)?.scrollIntoView({block: 'center'}), sel); await c.waitForTimeout(900);
    if (await c.locator(sel).count()) await c.locator(sel).first().screenshot({path: `${SHOTS}/${name}.png`});
    await c.close();
  }

  // 5 · Liste-1 karşılaştırma ve galeriler
  const {page: l1} = await open(browser, 'liste-1.html', 390);
  out.compare.liste1 = await l1.evaluate(() => { const panel = document.querySelector('.ld-list-panel').getBoundingClientRect(), s = document.querySelector('.list-stat-line'), spans = [...s.children], r = document.createRange(); r.selectNodeContents(s); const rs = [...r.getClientRects()]; const rr = document.createRange(); rr.selectNodeContents(spans[0]); return {copyToPanel: Math.round((panel.top - document.querySelector('.list-banner-copy').getBoundingClientRect().bottom) * 10) / 10, textToPanel: Math.round((panel.top - Math.max(...rs.map(x => x.bottom))) * 10) / 10, statsTextLeft: Math.round(rr.getBoundingClientRect().left), titleLeft: Math.round(document.querySelector('.list-banner h1').getBoundingClientRect().left), statFont: getComputedStyle(spans[0]).fontSize, valueFont: getComputedStyle(s.querySelector('b')).fontFamily, h1ToStats: Math.round(s.getBoundingClientRect().top - document.querySelector('.list-banner h1').getBoundingClientRect().bottom)}; });
  out.compare.liste1.logo0 = +(await brightest(l1, await rectOf(l1, '.brand-logo img'), '.brand-logo img')).contrastWhite.toFixed(2);
  await l1.close();
  const {page: v2} = await open(browser, 'liste-v2.html', 390);
  out.compare.v2 = await v2.evaluate(() => { const s = document.querySelector('.dg-stats'); return {h1ToStats: Math.round(s.getBoundingClientRect().top - document.querySelector('.lv2-banner h1').getBoundingClientRect().bottom), valueFont: getComputedStyle(s.querySelector('b')).fontFamily, statFont: getComputedStyle(s.querySelector('.dg-stats__item')).fontSize}; });
  await v2.close();
  for (const [name, url, w] of [['galeri-yan-yana', 'liste-sayfa-v2.html', 1000], ['galeri-hero-adaylari', 'liste-v2-hero-adaylari.html', 1300]]) {
    const g = await browser.newPage({viewport: {width: w, height: 1100}});
    await g.goto(BASE + url); await g.waitForTimeout(4500);
    await g.screenshot({path: `${SHOTS}/${name}.png`});
    await g.close();
  }
}
await browser.close();
fs.writeFileSync('docs/liste-v2/qa.json', JSON.stringify(out, null, 1));
console.table(out.matrix.map(r => ({e: r.engine, w: r.width, v: r.view, err: r.errors.length, ovf: r.overflowX, raw: r.rawText, cards: r.cards.length, author: r.cards.every(c => c.authorVisible && c.authorName && c.authorSingleLine), titleMax: Math.max(...r.cards.map(c => c.titleLines)), forb: r.cards.reduce((a, c) => a + c.forbidden, 0), bold: r.cards.every(c => c.categoryFont === 'GilroyBd'), even: r.gridEven, feat: r.feature, small: r.smallTargets.length, metaIn: r.cards.every(c => c.metaInside), metaOvf: r.cards.filter(c => c.metaOverflow).length, saves: [...new Set(r.cards.map(c => c.save.hit.join('x') + '@' + c.save.fromRight + ',' + c.save.fromTop))].join(' '), gap: r.banner.copyToPanel + '/' + r.banner.textToPanel, align: [r.banner.gutter, r.banner.statsLeft, r.banner.searchLeft, r.banner.statsRight].join('/'), sep: r.banner.sepBalance.join('/'), logo: r.logo?.join('/'), btxt: r.bannerTextContrast, rows: r.view === 'liste' ? r.cards.every(c => c.media[0] === c.media[1]) + ' ' + JSON.stringify(r.rowsEdge) : '-'})));
console.log(JSON.stringify({states: out.states, functional: out.functional, stability: out.stability, sheet: out.sheet, compare: out.compare}, null, 1));
