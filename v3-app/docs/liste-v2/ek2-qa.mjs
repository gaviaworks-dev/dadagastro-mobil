// EK 2 ölçüm ve kanıt betiği (R1b–R7). Çalıştır (v3-app içinden): node docs/liste-v2/ek2-qa.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {luminanceRange, cssLuminance, ratio} from './contrast-lib.mjs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/ek2';
for (const d of [OUT, `${OUT}/secenek`, `${OUT}/karsilastirma`]) fs.mkdirSync(d, {recursive: true});
const before = JSON.parse(fs.readFileSync('docs/liste-v2/search-filter-before.json', 'utf8'));
const PHASE = process.argv[2] || 'all';
const prev = fs.existsSync('docs/liste-v2/ek2-qa.json') ? JSON.parse(fs.readFileSync('docs/liste-v2/ek2-qa.json', 'utf8')) : {};
const out = {options: [], r1b: {}, r2: {}, r4: [], r6: {}, r7: {}, sticky: [], ...prev, generated: new Date().toISOString()};
const save = () => fs.writeFileSync('docs/liste-v2/ek2-qa.json', JSON.stringify(out, null, 1));
// Testlerde ortak html{scroll-behavior:smooth} kuralı programatik kaydırmayı geciktirir; ölçüm için anlık kaydırma.
const instant = page => page.addStyleTag({content: 'html{scroll-behavior:auto!important}'});
async function open(browser, url, width, scale = 1) {
  const page = await browser.newPage({viewport: {width, height: 844}, deviceScaleFactor: scale});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(BASE + url);
  await page.waitForFunction(() => window.LIST_V2_READY, null, {timeout: 8000});
  await page.evaluate(() => document.fonts.ready);
  await instant(page);
  await page.waitForTimeout(700);
  return {page, errors};
}
async function loadPhotos(page) {
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(1200);
}
const frames = page => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

// Görünüm ölçümü (tarayıcı içinde).
const probe = () => {
  const r = e => e.getBoundingClientRect();
  const cards = [...document.querySelectorAll('#results .dg-card,#results .dg-feature')];
  const pairs = cards.map(c => { const m = c.querySelector('.dg-meta'), s = c.querySelector('.dg-save'), media = c.querySelector('.dg-card__media,.dg-feature__media'), sb = getComputedStyle(s, '::before'); const inset = parseFloat(sb.top); const mr = r(m), sr = r(s), md = r(media); return {kind: c.classList.contains('dg-feature') ? 'feature' : c.classList.contains('dg-card--row') ? 'row' : 'card', metaH: Math.round(mr.height), saveH: Math.round(sr.height - 2 * inset), metaTop: Math.round(mr.top - md.top), saveTop: Math.round(sr.top + inset - md.top), metaLeft: Math.round(mr.left - md.left), saveRight: Math.round(md.right - (sr.right - inset)), gap: Math.round((sr.left + inset) - mr.right), metaR: getComputedStyle(m).borderTopLeftRadius, saveR: sb.borderTopLeftRadius, mediaR: getComputedStyle(media).borderTopLeftRadius, saveBg: sb.backgroundColor, metaBg: getComputedStyle(m).backgroundColor}; });
  const avatars = [...document.querySelectorAll('#results .dg-avatar')].map(a => ({text: a.textContent, bg: getComputedStyle(a).backgroundColor, w: Math.round(r(a).width), h: Math.round(r(a).height), radius: getComputedStyle(a).borderTopLeftRadius, icon: !!a.querySelector('i')}));
  const targets = [...document.querySelectorAll('#openFilters,.lv2-sort-button,.view-toggle button,.lv2-scope button,.dg-chip,.dg-page,.dg-save')].filter(e => e.getClientRects().length).map(e => [Math.round(r(e).width), Math.round(r(e).height)]);
  const q = s => document.querySelector(s);
  const radius = Object.fromEntries([['kart', '.lv2-grid .dg-card__media'], ['oneCikan', '.dg-feature__media'], ['satirKaresi', '.dg-card--row .dg-card__media'], ['dugme', '.dg-page'], ['input', '.list-tools .search-box'], ['aramaIciDugme', '#openFilters'], ['chip', '.lv2-rail .dg-chip'], ['chipIsaret', '.lv2-rail .dg-mark'], ['segmentDis', '.lv2-scope'], ['segmentIc', '.lv2-scope button'], ['siralamaGrubu', '.lv2-sort-group'], ['panel', '.list-tools'], ['rozet', '.dg-meta'], ['avatar', '.dg-avatar'], ['sayiRozeti', '#filterBadge'], ['bayrak', '.dg-mark--flag img']].map(([k, s]) => { const e = q(s); return [k, e ? getComputedStyle(e).borderTopLeftRadius : null]; }));
  radius.kaydetKaresi = q('.dg-save') ? getComputedStyle(q('.dg-save'), '::before').borderTopLeftRadius : null;
  return {pairs, avatars, targets, smallTargets: targets.filter(([w, h]) => w < 44 || h < 44).length, radius, outline: document.querySelectorAll('.fa-regular').length, overflowX: document.documentElement.scrollWidth > innerWidth, options: {...document.documentElement.dataset}};
};

// 1 · Seçenek görüntüleri ve ölçümleri: varsayılan (hepsi a) + her parametrenin b hâli.
if (PHASE !== 'p2') { out.options = []; out.sticky = []; out.r6 = {};
const CONFIGS = [['a', ''], ['siralama-b', 'siralama=b'], ['gosterge-b', 'gosterge=b'], ['radius-b', 'radius=b'], ['rozet-b', 'rozet=b']];
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const [name, query] of CONFIGS) for (const w of [360, 390, 430]) {
    const {page, errors} = await open(browser, 'liste-v2.html' + (query ? '?' + query : ''), w);
    await loadPhotos(page);
    const row = {engine: engineName, config: name, w, errors, ...(await page.evaluate(probe))};
    const shot = async (view, fn) => { await page.evaluate(fn); await frames(page); await page.waitForTimeout(350); await page.screenshot({path: `${OUT}/secenek/${name}-${view}-${w}-${engineName}.png`}); };
    await shot('ust', () => scrollTo(0, 0));
    await shot('slider', () => { const s = document.querySelector('.dg-slider'); scrollTo(0, s.getBoundingClientRect().top + scrollY - 280); });
    await shot('izgara', () => { const g = document.querySelector('.lv2-grid'); scrollTo(0, g.getBoundingClientRect().top + scrollY - 280); });
    await page.click('[data-view="liste"]'); await page.waitForTimeout(500); await loadPhotos(page);
    row.rows = await page.evaluate(probe);
    await shot('satir', () => { const g = document.querySelector('.lv2-rows'); scrollTo(0, g.getBoundingClientRect().top + scrollY - 280); });
    out.options.push(row);
    await page.close();
  }
  // Yapışma önce/sonra (yalnız varsayılan): eşik ve panel yüksekliği.
  for (const w of [360, 390, 430]) {
    const {page} = await open(browser, 'liste-v2.html', w);
    let stuckAt = null;
    for (let y = 180; y <= 320; y++) { await page.evaluate(y => scrollTo(0, y), y); await frames(page); if (await page.evaluate(() => document.querySelector('.list-tools').classList.contains('is-stuck'))) { stuckAt = y; break; } }
    const b = before.find(x => x.engine === engineName && x.w === w);
    out.sticky.push({engine: engineName, w, stuckBefore: b.stuckAt, stuckAfter: stuckAt, toolsBefore: b.toolsH, toolsAfter: await page.evaluate(() => Math.round(document.querySelector('.list-tools').getBoundingClientRect().height)), stuckTop: await page.evaluate(() => Math.round(document.querySelector('.list-tools').getBoundingClientRect().top))});
    // R6: kaydırma boyunca şerit ile ilk görünen metin satırı arası.
    if (w === 390) {
      const trace = [];
      for (let y = 0; y <= 520; y += 4) { await page.evaluate(y => scrollTo(0, y), y); await frames(page); trace.push(await page.evaluate(y => { const t = document.querySelector('.list-tools').getBoundingClientRect(), rail = document.querySelector('.lv2-rail').getBoundingClientRect(); const vis = [...document.querySelectorAll('.lv2-themes__title,.lv2-theme-rail,.lv2-status')].filter(e => !e.classList.contains('lv2-occluded') && !e.closest('[hidden]')).map(e => e.getBoundingClientRect()).filter(b => b.bottom > t.bottom); return {y, toolsToFirst: vis.length ? Math.round(Math.min(...vis.map(b => b.top)) - t.bottom) : null, railToFirst: vis.length ? Math.round(Math.min(...vis.map(b => b.top)) - rail.bottom) : null, cut: vis.some(b => b.top < t.bottom)}; }, y)); }
      out.r6[engineName] = {minToolsToFirst: Math.min(...trace.filter(t => t.toolsToFirst !== null).map(t => t.toolsToFirst)), minRailToFirst: Math.min(...trace.filter(t => t.railToFirst !== null).map(t => t.railToFirst)), anyCut: trace.some(t => t.cut), samples: trace.filter((_, i) => i % 10 === 0)};
    }
    await page.close();
  }
  await browser.close();
}
save();
}

// 2 · Chromium 390: R1b, R2, R4 kontrast, R7, karşılaştırma görselleri
if (PHASE !== 'p1') {
out.r4 = [];
const browser = await chromium.launch();
{
  // R1b: seçim → görünen tema öğeleri (yerel sonuç sayısı) ve bölüm görünürlüğü.
  const {page: p} = await open(browser, 'liste-v2.html', 390);
  const selections = [['Genel', {}], ['Kategori · Tatlı', {kategori: ['tatli']}], ['Kategori · Balık ve Deniz Ürünleri', {kategori: ['balik-ve-deniz-urunleri']}], ['Kategori · Tavuk ve Hindi', {kategori: ['tavuk-ve-hindi']}], ['Mutfak · Türk', {mutfak: ['turk-mutfagi']}], ['Mutfak · İtalyan', {mutfak: ['italyan-mutfagi']}], ['Mutfak · Portekiz', {mutfak: ['portekiz-mutfagi']}], ['Mutfak · Meksika', {mutfak: ['meksika-mutfagi']}]];
  for (const [label, facets] of selections) {
    out.r1b[label] = await p.evaluate(f => { facetState = f; category = ''; resultPage = 1; renderResults(); const sec = document.querySelector('.lv2-themes'); return {hidden: sec.hidden, results: document.querySelector('#resultCount').textContent, items: [...document.querySelectorAll('.lv2-theme-rail .dg-chip')].map(c => c.querySelector('.dg-chip__label').textContent + ' ' + c.querySelector('.dg-chip__count').textContent), all: PARITY.list.themes.map(t => { const tf = {}; for (const [k, v] of new URL(t.href).searchParams) if (k.includes('[')) (tf[k.split('[')[0]] ??= []).push(v); return [t.label, filteredRecipes({...f, ...tf}, '', '', '').length]; })}; }, facets);
  }
  // Dünya Mutfakları sekmesi açık, seçim yok / Türk seçili görüntüsü.
  await p.evaluate(() => { facetState = {}; renderResults(); document.querySelector('[data-ld-scope="mutfak"]').click(); });
  await p.waitForTimeout(400); await p.screenshot({path: `${OUT}/r1b-dunya-mutfaklari-genel.png`});
  await p.evaluate(() => document.querySelector('[data-lv2-facet="mutfak"][data-value="turk-mutfagi"]').click());
  await p.waitForTimeout(600); await p.screenshot({path: `${OUT}/r1b-dunya-mutfaklari-turk.png`});
  await p.evaluate(() => document.querySelector('[data-lv2-facet="mutfak"][data-value="italyan-mutfagi"]').click());
  await p.waitForTimeout(600); await p.screenshot({path: `${OUT}/r1b-dunya-mutfaklari-italyan.png`});
  await p.close();

  // R2: slider davranışı — sayı, gösterge, snap, sabit yükseklik; uzun/kısa başlık.
  for (const [label, url] of [['genel', 'liste-v2.html'], ['balik', 'liste-v2.html?kategori[]=balik-ve-deniz-urunleri'], ['balik-sayac', 'liste-v2.html?kategori[]=balik-ve-deniz-urunleri&gosterge=b'], ['tek', 'liste-v2.html?q=Sagdana']]) {
    const {page: s, errors} = await open(browser, url, 390);
    const info = await s.evaluate(() => { const sl = document.querySelector('.dg-slider'); const slides = [...document.querySelectorAll('.dg-slide')]; return {results: document.querySelector('#resultCount').textContent, slider: !!sl, count: slides.length, pager: !!document.querySelector('.dg-slider__pager'), heights: [...new Set(slides.map(x => Math.round(x.getBoundingClientRect().height)))], titles: slides.map(x => x.querySelector('.dg-card__title').textContent), lines: slides.map(x => { const t = x.querySelector('.dg-card__title'); return Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight)); }), autoplay: false, featureOnly: !sl && !!document.querySelector('#results>.dg-feature')}; });
    if (info.slider) {
      await s.evaluate(() => document.querySelector('.dg-slider').scrollIntoView({block: 'center'}));
      await s.waitForTimeout(300);
      await s.screenshot({path: `${OUT}/r2-${label}-1.png`});
      // Parmakla kaydırma benzetimi: yarım slayt kaydır → snap en yakın slayta oturtur.
      const snap = await s.evaluate(async () => { const t = document.querySelector('.dg-slider__track'), step = t.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap); t.scrollTo({left: step * .7, behavior: 'instant'}); await new Promise(r => setTimeout(r, 900)); return {step: Math.round(step), left: Math.round(t.scrollLeft), snapped: Math.abs(t.scrollLeft - step) < 2}; });
      await s.waitForTimeout(300);
      const pager = await s.evaluate(() => ({dots: [...document.querySelectorAll('.dg-pager-dots i')].map(i => i.classList.contains('is-on') ? 1 : 0).join(''), counter: document.querySelector('.dg-pager-count')?.textContent || null, index: document.querySelector('.dg-slider').dataset.index}));
      await s.screenshot({path: `${OUT}/r2-${label}-2.png`});
      // Gösterge kartın içinde mi, yazar satırıyla çakışıyor mu?
      const geo = await s.evaluate(() => { const sl = document.querySelector('.dg-slider').getBoundingClientRect(), pg = document.querySelector('.dg-slider__pager').getBoundingClientRect(), au = document.querySelectorAll('.dg-slide')[1].querySelector('.dg-author').getBoundingClientRect(); return {inside: pg.left >= sl.left && pg.right <= sl.right && pg.top >= sl.top && pg.bottom <= sl.bottom, overlapAuthor: !(au.right <= pg.left || au.left >= pg.right || au.bottom <= pg.top || au.top >= pg.bottom)}; });
      Object.assign(info, {snap, pager, geo});
    } else {
      await s.evaluate(() => document.querySelector('#results').scrollIntoView({block: 'start'})); await s.waitForTimeout(300);
      await s.screenshot({path: `${OUT}/r2-${label}.png`});
    }
    info.errors = errors;
    out.r2[label] = info;
    await s.close();
  }

  // R4: rozet ve kaydet — her fotoğrafta metin kontrastı (a: en koyu, b: en açık arka plan pikseline göre).
  for (const rozet of ['a', 'b']) {
    const {page: c} = await open(browser, `liste-v2.html?rozet=${rozet}`, 390, 2);
    await loadPhotos(c);
    const n = await c.evaluate(() => document.querySelectorAll('#results .dg-meta').length);
    for (let i = 0; i < n; i++) {
      // Slider'daki rozet: önce kendi slaytına kaydır (yatay), sonra dikeyde ortala.
    await c.evaluate(i => { const m = document.querySelectorAll('#results .dg-meta')[i], slide = m.closest('.dg-slide'); if (slide) slide.parentElement.scrollTo({left: slide.offsetLeft - slide.parentElement.offsetLeft, behavior: 'instant'}); m.scrollIntoView({block: 'center', inline: 'nearest'}); }, i);
      await c.waitForTimeout(250);
      await c.evaluate(i => document.querySelectorAll('#results .dg-meta').forEach((m, k) => m.toggleAttribute('data-probe', k === i)), i);
      // Köşe radius'u + kenar çizgisi kadar içeriden kırp: yuvarlak köşelerin dışındaki fotoğraf pikselleri rozet zemini değildir.
      const rect = await c.evaluate(() => { const m = document.querySelector('[data-probe]'), r = m.getBoundingClientRect(), k = parseFloat(getComputedStyle(m).borderTopLeftRadius) + 2; return {x: r.x + k, y: r.y + k, width: r.width - 2 * k, height: r.height - 2 * k}; });
      const fg = await c.evaluate(() => getComputedStyle(document.querySelector('[data-probe]')).color);
      const range = await luminanceRange(c, rect, '[data-probe]>span');
      const Lt = cssLuminance(fg);
      out.r4.push({rozet, i, text: await c.evaluate(() => document.querySelector('[data-probe]').textContent), contrastWorst: +Math.min(ratio(Lt, range.minL), ratio(Lt, range.maxL)).toFixed(2)});
    }
    await c.close();
  }
  // R7: avatar — baş harf (TR büyük), nötr zemin, ikon değil; öne çıkan kartta da aynı.
  {
    const {page: a} = await open(browser, 'liste-v2.html?kategori[]=tatli', 390);
    out.r7 = await a.evaluate(() => [...document.querySelectorAll('.dg-avatar')].map(v => ({in: v.closest('.dg-feature') ? 'feature' : v.closest('.dg-card--row') ? 'row' : 'card', text: v.textContent, author: v.parentElement.querySelector('.dg-author__name')?.textContent.replace('Tarifi ekleyen: ', ''), bg: getComputedStyle(v).backgroundColor, color: getComputedStyle(v).color, font: getComputedStyle(v).fontFamily.split(',')[0], icon: !!v.querySelector('i'), size: Math.round(v.getBoundingClientRect().width) + 'x' + Math.round(v.getBoundingClientRect().height), radius: getComputedStyle(v).borderTopLeftRadius})));
    await a.evaluate(() => document.querySelector('.dg-feature').scrollIntoView({block: 'center'})); await a.waitForTimeout(300);
    await a.locator('.dg-feature').first().screenshot({path: `${OUT}/r7-one-cikan-avatar.png`});
    await a.close();
  }
  // Karşılaştırma: radius a/b ve rozet a/b, aynı kırpım tek görselde yan yana.
  const crop = async (query, file) => {
    const {page: c} = await open(browser, 'liste-v2.html' + query, 390, 2);
    // Kırpımda panel akışta: R6 gizlemesi kapatılır ki tema satırı da görünsün.
    await c.addStyleTag({content: '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}.lv2-occluded{opacity:1!important}'});
    await loadPhotos(c);
    await c.evaluate(() => scrollTo(0, document.querySelector('.list-tools').getBoundingClientRect().top + scrollY));
    await c.waitForTimeout(500);
    await c.screenshot({path: `${OUT}/karsilastirma/${file}.png`, clip: {x: 0, y: 0, width: 390, height: 844}});
    await c.close();
  };
  for (const v of ['a', 'b']) { await crop(`?radius=${v}`, `radius-${v}`); await crop(`?rozet=${v}`, `rozet-${v}`); }
  for (const [name, left, right, title] of [['radius', 'radius-a', 'radius-b', 'Radius · a (köşeli) | b (orta)'], ['rozet', 'rozet-a', 'rozet-b', 'Metrik rozeti + kaydet · a (açık cam) | b (koyu nötr cam)']]) {
    const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#F9F9F9;font:16px/1.3 system-ui;color:#111}h1{font-size:18px;margin:0 0 12px}.g{display:grid;grid-template-columns:repeat(2,390px);gap:24px}b{display:block;margin:0 0 8px}img{width:390px;display:block;border:1px solid #ddd}</style><h1>${title}</h1><div class="g"><div><b>a</b><img src="${left}.png"></div><div><b>b</b><img src="${right}.png"></div></div>`;
    fs.writeFileSync(`${OUT}/karsilastirma/${name}.html`, html);
    const g = await browser.newPage({viewport: {width: 2 * 390 + 24 + 48, height: 600}});
    await g.goto(`${BASE}${OUT}/karsilastirma/${name}.html`); await g.waitForTimeout(700);
    await g.screenshot({path: `${OUT}/karsilastirma/${name}-a-b.png`, fullPage: true});
    await g.close();
  }
}
await browser.close();
save();
}
// Özet
for (const o of out.options) {
  const P = o.pairs, R = o.rows.pairs;
  console.log([o.engine, o.config, o.w, 'err', o.errors.length, 'ovf', o.overflowX || o.rows.overflowX, 'small', o.smallTargets + '/' + o.rows.smallTargets, 'outline', o.outline,
    'pairH', [...new Set([...P, ...R].map(p => p.metaH + '=' + p.saveH))].join(','), 'top', [...new Set([...P, ...R].map(p => p.metaTop + '/' + p.saveTop))].join(','), 'side', [...new Set([...P, ...R].map(p => p.metaLeft + '/' + p.saveRight))].join(','), 'minGap', Math.min(...[...P, ...R].map(p => p.gap)),
    'r', JSON.stringify(o.radius)].join(' '));
}
console.log('sticky', JSON.stringify(out.sticky));
console.log('r6', JSON.stringify({chromium: {...out.r6.chromium, samples: undefined}, webkit: {...out.r6.webkit, samples: undefined}}));
console.log('r2', JSON.stringify(out.r2));
console.log('r4', JSON.stringify(['a', 'b'].map(v => [v, Math.min(...out.r4.filter(x => x.rozet === v).map(x => x.contrastWorst)), out.r4.filter(x => x.rozet === v).length])));
console.log('r7', JSON.stringify([...new Set(out.r7.map(a => a.in + ':' + a.text + ':' + a.bg + ':' + a.font + ':' + a.icon + ':' + a.size))]));
console.log('r1b', JSON.stringify(Object.fromEntries(Object.entries(out.r1b).map(([k, v]) => [k, {hidden: v.hidden, items: v.items}]))));
