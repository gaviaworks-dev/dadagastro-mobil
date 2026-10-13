// Ana sayfa V3 (ana-x6 tabanlı) doğrulaması. Çalıştır: node v3-app/docs/home-v3-x6-tur5-qa.mjs (proje kökünden; 8765 sunucusu açık).
// Test sırasında yapılan DOM değişiklikleri (uzun ad/başlık) yalnız test tarayıcısındadır; kaynak veri değişmez.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {stableLocal} from '../verification/set3/http-queue.mjs';
import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:8765/v3-app/';
const dir = 'v3-app/docs/screenshots/home-v3-x6-tur5';
fs.mkdirSync(dir, {recursive: true});
const ORDER = ['Tarif bul — elindekiyle', 'Video Mutfağı', 'Kategoriler & Dünya Mutfakları', 'En son eklenen tarifler', 'Tarifin ustaları', 'Senin de bir tarifin var'];
const results = {tarih: new Date().toISOString(), sira: ORDER, kart: 'A · kaplama', video: 'tur 5 · kalın başlık + %78 izlenme', tumu: 'başlık sağında Tümü', hero: 'Jiao Yan Karides', gorunumler: []};
const jump = async (p, y) => { await p.evaluate(y => scrollTo({top: y, behavior: 'instant'}), y); await p.waitForTimeout(90); };
const load = async (p, url) => { await p.goto(url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForFunction(() => window.HOME_V3_READY); };
async function hydrateAll(p) {
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) await jump(p, y);
  await p.waitForLoadState('networkidle');
  await jump(p, 0); await p.waitForTimeout(500);
}
// Contrast of an element's text against the worst background pixel behind its glyph box (text made
// transparent first): the lightest pixel for light text, the darkest for dark text. No averaging.
async function contrastBehind(p, selector) {
  await p.evaluate(s => document.querySelector(s).scrollIntoView({block: 'center'}), selector); await p.waitForTimeout(250);
  const box = await p.evaluate(s => { const e = document.querySelector(s); const c = getComputedStyle(e).color; e.dataset.qaText = c; e.style.setProperty('color', 'transparent', 'important'); e.querySelectorAll('*').forEach(k => k.style.setProperty('color', 'transparent', 'important')); const range = document.createRange(); range.selectNodeContents(e); const t = range.getBoundingClientRect(), o = e.getBoundingClientRect(); const x = Math.max(t.left, o.left), y = Math.max(t.top, o.top), r = Math.min(t.right, o.right), btm = Math.min(t.bottom, o.bottom); return {x, y, width: r - x, height: btm - y, color: c}; }, selector);
  const png = await p.screenshot({clip: {x: box.x, y: box.y, width: box.width, height: box.height}});
  await p.evaluate(s => { const e = document.querySelector(s); e.style.removeProperty('color'); e.querySelectorAll('*').forEach(c => c.style.removeProperty('color')); }, selector);
  // Worst case over every background pixel; semi-transparent text is composited over each pixel first.
  return p.evaluate(async ([src, color]) => {
    const lin = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    const L = (r, g, b) => .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
    const nums = color.match(/[\d.]+/g).map(Number);
    let [tr, tg, tb] = nums, ta = 1;
    if (color.startsWith('color(')) { [tr, tg, tb] = nums.slice(0, 3).map(v => v * 255); ta = nums.length > 3 ? nums[3] : 1; }
    else if (nums.length > 3) ta = nums[3];
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data; let worst = 99;
    for (let i = 0; i < d.length; i += 4) {
      const br = d[i], bg = d[i + 1], bb = d[i + 2];
      const lt = L(ta * tr + (1 - ta) * br, ta * tg + (1 - ta) * bg, ta * tb + (1 - ta) * bb), lb = L(br, bg, bb);
      worst = Math.min(worst, (Math.max(lt, lb) + .05) / (Math.min(lt, lb) + .05));
    }
    return Number(worst.toFixed(2));
  }, ['data:image/png;base64,' + png.toString('base64'), box.color]);
}

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const width of [360, 390, 430]) {
    const ctx = await browser.newContext({viewport: {width, height: 844}});
    const p = await ctx.newPage(); await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message));
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await load(p, base + 'ana-v3.html');
    const row = {engine, width};

    // Structure, cards, authors, targets, avatars.
    const s = await p.evaluate(() => {
      const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const cards = [...document.querySelectorAll('.recipe-card')].filter(vis);
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        order: [...document.querySelectorAll('.v3-content>section')].map(e => e.querySelector('h2').textContent.trim()),
        cards: cards.length,
        authors: cards.map(c => { const n = c.querySelector('.v3-author-name'), a = c.querySelector('.card-author-row .avatar'); const cs = n && getComputedStyle(n); const slug = new URL(c.querySelector('.card-copy').href).searchParams.get('tarif'); const real = DATA.recipes.find(r => r.slug === slug)?.author; return {ok: !!n && vis(n) && n.textContent.replace('Tarifi ekleyen: ', '').trim() === real, oneLine: !!n && n.getBoundingClientRect().height <= parseFloat(cs.lineHeight) * 1.5, avatar: a ? [a.offsetWidth, a.offsetHeight] : null, inside: !!n && n.getBoundingClientRect().right <= c.getBoundingClientRect().right + .5}; }),
        unwanted: document.querySelectorAll('.recipe-card :is(.card-subtitle,.card-secondary,.card-badges,.card-views)').length,
        clamp: cards.map(c => { const h = c.querySelector('h3'), cs = getComputedStyle(h); return h.getBoundingClientRect().height <= parseFloat(cs.lineHeight) * 2 + 1; }),
        catBold: cards.map(c => Number(getComputedStyle(c.querySelector('.card-category')).fontWeight)),
        chefAvatars: [...document.querySelectorAll('.v3-chef-av')].map(e => [e.offsetWidth, e.offsetHeight]),
        small: [...document.querySelectorAll('main a,main button')].filter(e => vis(e) && !e.closest('.bottom-nav,.topbar') && (e.getBoundingClientRect().height < 44 || e.getBoundingClientRect().width < 44)).map(e => e.className + ':' + e.textContent.trim().slice(0, 30)),
        gutter: Math.round(document.querySelector('.v3-finder').getBoundingClientRect().left),
        videos: document.querySelectorAll('.v3-videos .v3-video').length,
        heroTop: document.querySelector('.v3-hero-top h1').getBoundingClientRect().top
      };
    });
    assert.equal(s.overflow, false); assert.deepEqual(s.order, ORDER);
    assert(s.cards >= 3); assert(s.authors.every(a => a.ok && a.oneLine && a.inside), JSON.stringify(s.authors));
    assert(s.authors.every(a => a.avatar[0] === 20 && a.avatar[1] === 20)); assert.equal(s.unwanted, 0);
    assert(s.clamp.every(Boolean)); assert(s.catBold.every(w => w >= 700));
    assert(s.chefAvatars.length === 6 && s.chefAvatars.every(([w, h]) => w === 96 && h === 96));
    assert.deepEqual(s.small, []); assert.equal(s.gutter, 20); assert.equal(s.videos, 6);
    Object.assign(row, {kartlar: s.cards, yazarlar_ok: true, sef_avatar: '96×96', kart_avatar: '20×20', bolum_sirasi_ok: true});

    // Header: 0–400 / 20 px, alpha and collisions; header search appears once the hero search hides.
    const scroll = [];
    for (let y = 0; y <= 400; y += 20) {
      await jump(p, y);
      scroll.push(await p.evaluate(() => {
        const h = document.querySelector('.topbar').getBoundingClientRect();
        const groups = [...document.querySelectorAll('.six-hero-group')];
        const searchHidden = getComputedStyle(document.querySelector('.v3-hero-top .six-hero-group')).visibility === 'hidden';
        return {y: Math.round(scrollY), alpha: Number(document.querySelector('.topbar').dataset.alpha), collision: groups.some(g => getComputedStyle(g).visibility !== 'hidden' && g.getBoundingClientRect().top < h.bottom), searchHidden, headerSearch: !document.querySelector('.a-header-search').hidden};
      }));
    }
    assert(scroll.every(r => !r.collision)); assert(scroll.every(r => r.searchHidden === r.headerSearch));
    assert.equal(scroll[0].alpha, 0); assert(scroll.at(-1).alpha === 1);
    row.header = {ilk_tam_opak_y: scroll.find(r => r.alpha >= 1).y, cakisma: 0, arama_ikonu_tutarli: true};
    if (engine === 'chromium' && width === 390) {
      for (const y of [0, 60, 120, 300]) { await jump(p, y); await p.screenshot({path: `${dir}/scroll-${y}-390.png`}); }
      results.header390 = scroll;
    }
    await jump(p, 0);

    // Contrast: white text over the photo, lightest background pixel.
    if (engine === 'chromium') {
      await p.evaluate(() => document.querySelector('.collection-block').scrollIntoView({block: 'center'})); await p.waitForTimeout(600);
      const kart = {};
      for (const i of [1, 2, 3]) {
        kart[`kart${i}_baslik`] = await contrastBehind(p, `.collection-block .recipe-card:nth-child(${i}) h3`);
        kart[`kart${i}_kategori`] = await contrastBehind(p, `.collection-block .recipe-card:nth-child(${i}) .card-category`);
        kart[`kart${i}_yazar`] = await contrastBehind(p, `.collection-block .recipe-card:nth-child(${i}) .v3-author-name`);
        kart[`kart${i}_sure`] = await contrastBehind(p, `.collection-block .recipe-card:nth-child(${i}) .photo-meta>span`);
      }
      row.kart_kontrast = kart; assert(Object.values(kart).every(v => v >= 4.5), JSON.stringify(kart));
      await jump(p, 0); await p.waitForTimeout(300);
    }
    if (engine === 'chromium') {
      await p.evaluate(() => document.querySelector('.v3-videos').scrollIntoView({block: 'start'})); await p.evaluate(() => scrollBy(0, -80)); await p.waitForTimeout(700);
      const v = {baslik: await contrastBehind(p, '.v3-videos .six-heading h2'), tumu: await contrastBehind(p, '.v3-videos .six-see'), buyuk_kart_baslik: await contrastBehind(p, '.v3-video-lead .v3-video-text strong'), buyuk_kart_izlenme: await contrastBehind(p, '.v3-video-lead .v3-video-text>span'), buyuk_kart_sure: await contrastBehind(p, '.v3-video-lead .v3-video-time>span')};
      for (const i of [1, 2, 3, 4, 5]) { v[`kucuk${i}_baslik`] = await contrastBehind(p, `.v3-video-rail .v3-video:nth-child(${i}) .v3-video-text strong`); v[`kucuk${i}_izlenme`] = await contrastBehind(p, `.v3-video-rail .v3-video:nth-child(${i}) .v3-video-text>span`); v[`kucuk${i}_sure`] = await contrastBehind(p, `.v3-video-rail .v3-video:nth-child(${i}) .v3-video-time>span`); }
      row.video_kontrast = v;
      assert(Object.entries(v).every(([k, x]) => x >= (/baslik/.test(k) ? 3 : 4.5)), JSON.stringify(v));
      row.tumu = await p.evaluate(() => [...document.querySelectorAll('.v3-content .six-see')].map(e => { const c = getComputedStyle(e); return [e.closest('section').querySelector('h2').textContent.trim(), c.color, c.fontSize, Math.round(e.getBoundingClientRect().height)].join(' | '); }));
      assert.equal(row.tumu.length, 4); assert.equal(new Set(row.tumu.map(t => t.split(' | ').slice(1).join())).size, 1, JSON.stringify(row.tumu));
      row.gorsel_olcek = await p.evaluate(async () => {
        const size = async u => { const i = new Image(); i.src = u; await i.decode(); return [i.naturalWidth, i.naturalHeight]; };
        const url = el => getComputedStyle(el).backgroundImage.match(/url\("([^"]+)"\)/g).pop().slice(5, -2);
        const cover = (W, H, w, h) => Number(Math.max(W / w, H / h).toFixed(3));
        const out = {};
        for (const [n, el] of [['buyuk_video', document.querySelector('.v3-video-lead .photo')], ...[...document.querySelectorAll('.v3-video-rail .photo')].map((e, i) => [`kucuk_video_${i + 1}`, e])]) { const b = el.getBoundingClientRect(), [w, h] = await size(url(el)); out[n] = {kaynak: `${w}×${h}`, alan: `${Math.round(b.width)}×${Math.round(b.height)}`, olcek: cover(b.width, b.height, w, h)}; }
        const hero = document.querySelector('.x-scene-photo .x-photo'), [hw, hh] = await size(url(hero)); out.hero = {kaynak: `${hw}×${hh}`, alan_dinlenme: `${innerWidth}×${Math.round(Math.min(Math.max(.72 * innerHeight, 560), 640))}`, olcek: cover(innerWidth, Math.min(Math.max(.72 * innerHeight, 560), 640), hw, hh)};
        return out;
      });
      assert(Object.values(row.gorsel_olcek).every(o => o.olcek <= 1), JSON.stringify(row.gorsel_olcek));
      row.video_geometri = await p.evaluate(() => {
        const cards = [...document.querySelectorAll('.v3-video')], rail = document.querySelector('.v3-video-rail'), small = cards.slice(1);
        const r = e => e.getBoundingClientRect();
        rail.scrollLeft = rail.scrollWidth; const last = r(small.at(-1)), rr = r(rail);
        const res = {izlenme_icerde: cards.every(c => { const s = r(c.querySelector('.v3-video-text>span')), cov = r(c.querySelector('.v3-video-cover')); return s.bottom <= cov.bottom + .5 && s.height <= parseFloat(getComputedStyle(c.querySelector('.v3-video-text>span')).lineHeight) * 1.5; }), baslik_2_satir: cards.every(c => { const t = c.querySelector('.v3-video-text strong'); return r(t).height <= parseFloat(getComputedStyle(t).lineHeight) * 2 + 1; }), kucuk_esit: new Set(small.map(c => `${Math.round(r(c).width)}×${Math.round(r(c).height)}`)).size === 1, oynat_ayni: new Set(cards.map(c => { const pl = r(c.querySelector('.v3-play')), cv = r(c.querySelector('.v3-video-cover')); return `${Math.round(pl.width)},${Math.round(cv.right - pl.right)},${Math.round(pl.top - cv.top)}`; })).size === 1, oynat_metinle_cakismaz: cards.every(c => r(c.querySelector('.v3-play')).bottom <= r(c.querySelector('.v3-video-text')).top), sure_ayni_konum: new Set(cards.map(c => { const t = r(c.querySelector('.v3-video-time')), cv = r(c.querySelector('.v3-video-cover')); return `${Math.round(t.left - cv.left)},${Math.round(t.top - cv.top)},${Math.round(t.height)}`; })).size === 1, son_kart_sag_bosluk: Math.round(rr.right - last.right), gorunen_kart: Number((rr.width / (r(small[0]).width + 12)).toFixed(2))};
        rail.scrollLeft = 0; return res;
      });
      const g = row.video_geometri; assert(g.izlenme_icerde && g.baslik_2_satir && g.kucuk_esit && g.oynat_ayni && g.oynat_metinle_cakismaz && g.sure_ayni_konum && g.son_kart_sag_bosluk === 20, JSON.stringify(g));
      await jump(p, 0); await p.waitForTimeout(300);
    }
    if (engine === 'chromium') row.kontrast = {baslik: await contrastBehind(p, '.v3-hero-top h1'), bugun: await contrastBehind(p, '.x-recipe small'), tarif_adi: await contrastBehind(p, '.x-recipe strong'), ipucu: await contrastBehind(p, '.x-scene-hint')};

    // Menu: official colour logo first.
    await p.locator('[data-site-menu]').click(); await p.waitForTimeout(350);
    const drawer = await p.evaluate(() => { const d = document.querySelector('dialog.om[open]'); const first = d.querySelector('.om-logo img'); return {src: first?.getAttribute('src'), loaded: first?.complete && first.naturalWidth > 0, firstInDialog: d.querySelector('img') === first}; });
    assert.equal(drawer.src, 'assets/marka/dadagastro-renkli.svg'); assert(drawer.loaded && drawer.firstInDialog);
    if (engine === 'chromium' && width === 390) await p.screenshot({path: `${dir}/menu-390.png`});
    await p.locator('dialog.om[open] .om-row', {hasText: 'Dolapta Ne Var?'}).click(); await p.waitForTimeout(700);
    assert.equal(await p.evaluate(() => [document.querySelector('dialog[open]') === null, document.querySelector('.v3-finder').dataset.tab].join()), 'true,pantry');
    row.menu = 'logo + Dolapta Ne Var satırı → kayıtlı dolap sekmesi';

    // Pantry: add, persist across reload, results carry authors; then clear.
    await p.locator('[data-v3-pantry-add="Tavuk"]').click(); await p.waitForTimeout(150);
    await load(p, base + 'ana-v3.html');
    await p.evaluate(() => document.querySelector('[data-v3-tab=pantry]').click());
    const pantry = await p.evaluate(() => ({have: [...document.querySelectorAll('[data-v3-pantry-remove][data-list=have]')].map(b => b.dataset.v3PantryRemove), cards: [...document.querySelectorAll('#v3-panel-pantry .recipe-card')].map(c => c.querySelector('.v3-author-name')?.textContent.trim())}));
    assert.deepEqual(pantry.have, ['Tavuk']); assert(pantry.cards.length > 0 && pantry.cards.every(Boolean));
    if (engine === 'chromium' && width === 390) { await p.locator('.v3-finder').scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.locator('.v3-finder').screenshot({path: `${dir}/dolap-390.png`}); }
    await p.evaluate(() => localStorage.removeItem('dadagastro-v3-dolap'));
    row.dolap = `kalıcı (yeniden yükleme sonrası), ${pantry.cards.length} sonuç kartı, hepsinde yazar`;

    // Elinde ne var: instant results carry authors.
    await load(p, base + 'ana-v3.html');
    await p.locator('[data-set-ingredient="Patates"]').click(); await p.waitForTimeout(200);
    const now = await p.evaluate(() => [...document.querySelectorAll('#v3-panel-now .recipe-card')].map(c => c.querySelector('.v3-author-name')?.textContent.trim()));
    assert(now.length > 0 && now.every(Boolean)); row.elinde = `${now.length} sonuç, hepsinde yazar`;
    await p.locator('[data-set-reset]').click();

    // Categories + video honesty.
    assert.equal(await p.locator('.v3-cat-tile').count(), 6);
    await p.locator('[data-v3-cat-all]').click(); await p.waitForTimeout(300); assert.equal(await p.locator('dialog[open] .v3-cat-row').count(), 34);
    await p.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));
    await p.locator('[data-v3-cat="cuisine"]').click(); assert.equal(await p.locator('.v3-cat-tile').count(), 6);
    await p.waitForFunction(() => [...document.querySelectorAll('.v3-cat-tile img')].every(i => i.complete && i.naturalWidth > 0), null, {timeout: 10000});
    const flags = await p.evaluate(() => [...document.querySelectorAll('.v3-cat-tile')].map(t => { const img = t.querySelector('img'); return img ? img.complete && img.naturalWidth > 0 && /assets\/flags\/[a-z]{2}\.svg$/.test(img.getAttribute('src')) : !!t.querySelector('.icon'); }));
    assert(flags.every(Boolean), JSON.stringify(flags));
    await p.locator('[data-v3-cat-all]').click(); await p.waitForTimeout(300); assert.equal(await p.locator('dialog[open] .v3-cat-row').count(), 50);
    assert.equal(await p.locator('dialog[open] .v3-cat-row img.v3-flag').count(), 49); assert.equal(await p.locator('dialog[open] .v3-cat-row .v3-flag--none').count(), 1);
    await p.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));
    const catTiles = await p.evaluate(() => [...document.querySelectorAll('.v3-cat-tile')].map(t => t.getBoundingClientRect().height >= 44));
    assert(catTiles.every(Boolean)); await p.locator('[data-v3-cat="cat"]').click();
    await p.locator('.v3-video-lead').click(); await p.waitForTimeout(300);
    assert(await p.evaluate(() => document.querySelector('dialog[open]')?.textContent.includes('Video kaynağı henüz eklenmedi')));
    await p.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));

    // Long author name and long title (test browser only).
    const long = await p.evaluate(() => {
      const c = document.querySelector('.collection-block .recipe-card:nth-child(2)'), n = c.querySelector('.v3-author-name'), h = c.querySelector('h3');
      n.lastChild.textContent = 'Şahnur Poyrazoğlu Bakırcıoğlu Yıldırımoğulları'; h.textContent = 'Sagdana Suudi Arabistan Hicaz Usulü Kakuleli Sagu İncili Süt Tatlısı ve Uzun Başlık';
      const vt = document.querySelector('.v3-video-rail .v3-video:nth-child(2) .v3-video-text strong'); vt.textContent = 'Meal Prep: 1 Saatte Haftalık Sebze Hazırlığı ve Saklama Kapları Rehberi';
      const chef = document.querySelector('.v3-chef-person b'); chef.textContent = 'Şahnur Poyrazoğlu Bakırcıoğlu Yıldırımoğulları';
      const ns = getComputedStyle(n), hs = getComputedStyle(h), cs = getComputedStyle(chef);
      const vs = getComputedStyle(vt), vv = vt.parentElement.querySelector('span'); return {videoTwoLines: vt.getBoundingClientRect().height <= parseFloat(vs.lineHeight) * 2 + 1 && vt.scrollHeight > vt.clientHeight, videoViewsVisible: vv.getBoundingClientRect().bottom <= vt.closest('.v3-video-cover').getBoundingClientRect().bottom + .5, authorEllipsis: n.scrollWidth > n.clientWidth && ns.textOverflow === 'ellipsis', authorOneLine: n.getBoundingClientRect().height <= parseFloat(ns.lineHeight) * 1.5, titleTwoLines: h.getBoundingClientRect().height <= parseFloat(hs.lineHeight) * 2 + 1 && h.scrollHeight > h.clientHeight, chefTwoLines: chef.getBoundingClientRect().height <= parseFloat(cs.lineHeight) * 2 + 1};
    });
    assert(long.videoTwoLines && long.videoViewsVisible && long.authorEllipsis && long.authorOneLine && long.titleTwoLines && long.chefTwoLines, JSON.stringify(long));
    if (engine === 'chromium' && width === 390) {
      await p.evaluate(() => document.querySelector('.collection-block .recipe-card:nth-child(2)').scrollIntoView({block: 'center'})); await p.waitForTimeout(500);
      await p.locator('.collection-block .recipe-card:nth-child(2)').screenshot({path: `${dir}/uzun-ad-kart-390.png`});
      await p.evaluate(() => document.querySelector('.v3-chef-card').scrollIntoView({block: 'center'})); await p.waitForTimeout(400);
      await p.locator('.v3-chef-card').first().screenshot({path: `${dir}/uzun-ad-sef-390.png`});
      await p.evaluate(() => document.querySelector('.v3-videos').scrollIntoView({block: 'center'})); await p.waitForTimeout(400); await p.locator('.v3-videos').screenshot({path: `${dir}/uzun-baslik-video-390.png`});
    }
    row.uzun_ad = long;
    if (engine === 'chromium' && width === 390) {
      await load(p, base + 'ana-v3.html'); await hydrateAll(p);
      const big = await browser.newContext({viewport: {width, height: 844}, deviceScaleFactor: 3}), q3 = await big.newPage(); await stableLocal(q3);
      await load(q3, base + 'ana-v3.html'); await hydrateAll(q3); await q3.evaluate(() => { document.querySelector('.bottom-nav').style.visibility = 'hidden'; });
      for (const [n, sel] of [['sonra-video-3x', '.v3-videos'], ['sonra-kategoriler-3x', '.v3-cats'], ['sonra-tarif-karti-3x', '.collection-block']]) { await q3.evaluate(s => document.querySelector(s).scrollIntoView({block: 'start'}), sel); await q3.evaluate(() => scrollBy(0, -80)); await q3.waitForTimeout(500); await q3.locator(sel).screenshot({path: `${dir}/${n}.png`}); }
      await big.close();
    }

    // Reduced motion: header steps without intermediate alpha.
    await p.emulateMedia({reducedMotion: 'reduce'}); await load(p, base + 'ana-v3.html');
    const rm = [];
    for (const y of [0, 20, 40, 60, 120]) { await jump(p, y); rm.push(await p.evaluate(() => Number(document.querySelector('.topbar').dataset.alpha))); }
    assert(rm.every(a => a === 0 || a === 1)); row.reduced_motion = rm;
    await p.emulateMedia({reducedMotion: 'no-preference'});

    // Full page (lazy-load hydrated by scrolling).
    await load(p, base + 'ana-v3.html'); await hydrateAll(p);
    await p.screenshot({path: `${dir}/${engine}-${width}-full.png`, fullPage: true});
    row.hatalar = errors; row.http = bad;
    assert.deepEqual(errors, []); assert.deepEqual(bad, []);
    results.gorunumler.push(row);
    await ctx.close();
  }
  await browser.close();
}

// Hero side by side: ana-x6 / new V3, 390×844.
{
  const b = await chromium.launch(), p = await b.newPage({viewport: {width: 390, height: 844}}); await stableLocal(p);
  const shots = [];
  for (const page of ['ana-x6.html', 'ana-v3.html']) { await p.goto(base + page, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); shots.push((await p.screenshot()).toString('base64')); }
  const png = await p.evaluate(async ([a, c]) => {
    const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
    const [x, y] = await Promise.all([load(a), load(c)]);
    const cv = document.createElement('canvas'); cv.width = x.width * 2 + 24; cv.height = x.height + 48; const g = cv.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#211E16'; g.font = '600 18px system-ui';
    g.fillText('ana-x6 (V2 · 4. tasarım)', 8, 30); g.fillText('Yeni V3', x.width + 32, 30);
    g.drawImage(x, 0, 48); g.drawImage(y, x.width + 24, 48);
    return cv.toDataURL('image/png').split(',')[1];
  }, shots);
  fs.writeFileSync(`${dir}/hero-x6-v3-390.png`, Buffer.from(png, 'base64'));
  await b.close();
}

fs.writeFileSync('v3-app/docs/home-v3-x6-tur5-qa.json', JSON.stringify(results, null, 1));
console.log(JSON.stringify(results.gorunumler.filter(r => r.engine === 'chromium').map(r => ({w: r.width, video: r.video_kontrast, tumu: r.tumu})), null, 0));
