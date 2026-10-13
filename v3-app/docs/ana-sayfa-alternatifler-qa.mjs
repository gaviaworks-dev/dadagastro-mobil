// Ana sayfa alternatifleri doğrulaması. Proje kökünden: node v3-app/docs/ana-sayfa-alternatifler-qa.mjs (8765 açık).
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../verification/set3/http-queue.mjs';

const base = 'http://127.0.0.1:8765/v3-app/';
const dir = 'v3-app/docs/screenshots/ana-sayfa-alternatifler';
fs.mkdirSync(dir, {recursive: true});
const PAGES = {
  'ana-v3-alt1.html': {order: ['Video Mutfağı', 'Tarif bul — elindekiyle', 'Kategoriler & Dünya Mutfakları', 'En son eklenen tarifler', 'Tarifin ustaları', 'Senin de bir tarifin var'], hero: {baslik: '.alt1 .v3-hero-top h1', oneri: '.alt1-pick .x-recipe strong', oneri_kucuk: '.alt1-pick .x-recipe small'}},
  'ana-v3-alt2.html': {order: ['Kategoriler & Dünya Mutfakları', 'Video Mutfağı', 'Tarif bul — elindekiyle', 'En son eklenen tarifler', 'Tarifin ustaları', 'Senin de bir tarifin var'], hero: {baslik: '.alt2 .v3-hero-top h1', oneri: '.alt2-card .x-recipe strong', oneri_kucuk: '.alt2-card .x-recipe small'}},
  'ana-v3-alt3.html': {order: ['Video Mutfağı', 'En son eklenen tarifler', 'Kategoriler & Dünya Mutfakları', 'Tarif bul — elindekiyle', 'Tarifin ustaları', 'Senin de bir tarifin var'], hero: {baslik: '.alt3-decision h1', oneri: '.alt3-pick strong', oneri_kucuk: '.alt3-pick small'}}
};
const results = {tarih: new Date().toISOString(), sayfalar: {}};

// Worst background pixel behind the glyph box (text hidden), semi-transparent text composited per pixel.
async function contrast(p, selector) {
  await p.evaluate(s => document.querySelector(s).scrollIntoView({block: 'center'}), selector); await p.waitForTimeout(250);
  const box = await p.evaluate(s => { const e = document.querySelector(s); const c = getComputedStyle(e).color; e.style.setProperty('color', 'transparent', 'important'); e.querySelectorAll('*').forEach(k => k.style.setProperty('color', 'transparent', 'important')); const r = document.createRange(); r.selectNodeContents(e); const t = r.getBoundingClientRect(), o = e.getBoundingClientRect(); const x = Math.max(t.left, o.left), y = Math.max(t.top, o.top); return {x, y, width: Math.min(t.right, o.right) - x, height: Math.min(t.bottom, o.bottom) - y, color: c, size: parseFloat(getComputedStyle(e).fontSize), weight: Number(getComputedStyle(e).fontWeight)}; }, selector);
  const png = await p.screenshot({clip: {x: box.x, y: box.y, width: box.width, height: box.height}});
  await p.evaluate(s => { const e = document.querySelector(s); e.style.removeProperty('color'); e.querySelectorAll('*').forEach(c => c.style.removeProperty('color')); }, selector);
  const ratio = await p.evaluate(async ([src, color]) => {
    const lin = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }, L = (r, g, b) => .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
    const n = color.match(/[\d.]+/g).map(Number); let [tr, tg, tb] = n, ta = n.length > 3 ? n[3] : 1;
    if (color.startsWith('color(')) [tr, tg, tb] = n.slice(0, 3).map(v => v * 255);
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data; let worst = 99;
    for (let i = 0; i < d.length; i += 4) { const lt = L(ta * tr + (1 - ta) * d[i], ta * tg + (1 - ta) * d[i + 1], ta * tb + (1 - ta) * d[i + 2]), lb = L(d[i], d[i + 1], d[i + 2]); worst = Math.min(worst, (Math.max(lt, lb) + .05) / (Math.min(lt, lb) + .05)); }
    return Number(worst.toFixed(2));
  }, ['data:image/png;base64,' + png.toString('base64'), box.color]);
  return {ratio, large: box.size >= 24 || (box.size >= 18.66 && box.weight >= 700)};
}

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const [page, spec] of Object.entries(PAGES)) {
    for (const width of [360, 390, 430]) {
      const ctx = await browser.newContext({viewport: {width, height: 844}});
      const p = await ctx.newPage(); await stableLocal(p);
      const errors = [], bad = [];
      p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
      await p.goto(base + page, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
      await p.waitForFunction(() => window.HOME_V3_READY && (window.ALT1_READY || window.ALT2_READY || window.ALT3_READY));
      const row = {engine, width};
      const s = await p.evaluate(() => {
        const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
        const bands = [...document.querySelectorAll('.v3-content>section')].map(x => getComputedStyle(x).backgroundColor);
        return {
          order: [...document.querySelectorAll('.v3-content>section')].map(x => x.querySelector('h2').textContent.trim()), bands,
          overflow: document.documentElement.scrollWidth > innerWidth,
          small: [...document.querySelectorAll('main a,main button')].filter(e => vis(e) && !e.closest('.bottom-nav,.topbar,[inert],[hidden]') && (e.getBoundingClientRect().height < 44 || e.getBoundingClientRect().width < 44)).map(e => e.className + ':' + e.textContent.trim().slice(0, 24)),
          authors: [...document.querySelectorAll('.recipe-card')].filter(vis).every(c => { const n = c.querySelector('.v3-author-name'); const slug = new URL(c.querySelector('.card-copy').href).searchParams.get('tarif'); return n && n.textContent.replace('Tarifi ekleyen: ', '').trim() === DATA.recipes.find(r => r.slug === slug)?.author; }),
          cards: [...document.querySelectorAll('.recipe-card')].filter(vis).length,
          outline: document.querySelectorAll('.fa-regular,.far,.fa-light,.fa-thin').length,
          veil: getComputedStyle(document.querySelector('.x-hero .x-scene-shade') || document.body).backgroundImage.slice(0, 30)
        };
      });
      assert.deepEqual(s.order, spec.order); assert.equal(s.overflow, false); assert.deepEqual(s.small, [], JSON.stringify(s.small));
      assert(s.authors && s.cards >= 3, 'yazar'); assert.equal(s.outline, 0);
      s.bands.forEach((b, i) => assert.equal(b, i % 2 ? 'rgb(255, 255, 255)' : 'rgb(249, 249, 249)'));
      Object.assign(row, {kartlar: s.cards, sira_ok: true, zeminler_ok: true});
      // Hero veil: one continuous gradient; no band = the darkness never jumps faster than 2% per CSS pixel.
      row.overlay = await p.evaluate(() => { const el = document.querySelector('.alt2-card-shade') || document.querySelector('.x-scene-shade'), h = el.getBoundingClientRect().height, v = getComputedStyle(el).backgroundImage;
        const st = [...v.matchAll(/\/ ([\d.]+)\) ([\d.]+)%/g)].map(m => [Number(m[1]) * 100, Number(m[2])]); let m = 0;
        for (let i = 1; i < st.length; i++) { const dy = (st[i][1] - st[i - 1][1]) * h / 100; if (dy > 0) m = Math.max(m, Math.abs(st[i][0] - st[i - 1][0]) / dy); }
        return {duraklar: st.length, en_dik_egim_yuzde_px: Number(m.toFixed(3))}; });
      assert(row.overlay.duraklar >= 9 && row.overlay.en_dik_egim_yuzde_px <= 2, JSON.stringify(row.overlay));
      // Header: transparent → solid within the first scroll; hero text never under the header.
      const hdr = [];
      for (let y = 0; y <= 400; y += 20) {
        await p.evaluate(y => scrollTo({top: y, behavior: 'instant'}), y); await p.waitForTimeout(70);
        hdr.push(await p.evaluate(() => { const h = document.querySelector('.topbar').getBoundingClientRect(); return {alpha: Number(document.querySelector('.topbar').dataset.alpha), hit: [...document.querySelectorAll('.six-hero-group')].some(g => getComputedStyle(g).visibility !== 'hidden' && g.getBoundingClientRect().height > 0 && g.getBoundingClientRect().top < h.bottom)}; }));
      }
      assert.equal(hdr[0].alpha, 0); assert.equal(hdr.at(-1).alpha, 1); assert(hdr.every(h => !h.hit), 'header çakışması');
      row.header = {ilk_tam_opak_y: hdr.findIndex(h => h.alpha >= 1) * 20, cakisma: 0};
      await p.evaluate(() => scrollTo({top: 0, behavior: 'instant'})); await p.waitForTimeout(300);
      if (engine === 'chromium') {
        row.kontrast = {};
        for (const [k, sel] of Object.entries(spec.hero)) { const c = await contrast(p, sel); row.kontrast[k] = c.ratio; assert(c.ratio >= (c.large ? 3 : 4.5), `${k} ${c.ratio}`); }
        await p.evaluate(() => scrollTo({top: 0, behavior: 'instant'})); await p.waitForTimeout(300);
      }
      // Category tabs: section height and the next section's position do not change.
      const tab = await p.evaluate(async () => {
        const sec = document.querySelector('.v3-cats'), next = sec.nextElementSibling, m = () => [sec.getBoundingClientRect().height, next ? next.getBoundingClientRect().top + scrollY : 0];
        const a = m(); document.querySelector('[data-v3-cat="cuisine"]').click(); await new Promise(r => setTimeout(r, 120)); const b = m(); document.querySelector('[data-v3-cat="cat"]').click();
        return {fark: Number((b[0] - a[0]).toFixed(2)), sonraki: Number((b[1] - a[1]).toFixed(2))};
      });
      assert.equal(tab.fark, 0); assert.equal(tab.sonraki, 0); row.kategori_sekme = tab;
      // Menu opens (shared component).
      await p.locator('[data-site-menu]').click(); await p.waitForTimeout(400); assert.equal(await p.locator('dialog.om[open]').count(), 1); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
      // Screenshots: first screen and full page (lazy images hydrated by scrolling).
      await p.screenshot({path: `${dir}/${page.replace('.html', '')}-${engine}-${width}-ilk.png`});
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 400) { await p.evaluate(y => scrollTo({top: y, behavior: 'instant'}), y); await p.waitForTimeout(60); }
      await p.waitForLoadState('networkidle'); await p.evaluate(() => scrollTo({top: 0, behavior: 'instant'})); await p.waitForTimeout(500);
      await p.screenshot({path: `${dir}/${page.replace('.html', '')}-${engine}-${width}-tam.png`, fullPage: true});
      assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
      (results.sayfalar[page] ||= []).push(row);
      await ctx.close();
    }
  }
  await browser.close();
}

// Static scan: no hand-written px outside named custom properties; no outline/regular icons.
const scan = {};
for (const f of ['ana-v3-alt1.css', 'ana-v3-alt2.css', 'ana-v3-alt3.css', 'ana-v3-alt-ortak.js', 'ana-v3-alt1.js', 'ana-v3-alt2.js', 'ana-v3-alt3.js', 'ana-sayfa-alternatifler.css']) {
  const src = fs.readFileSync('v3-app/' + f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const px = [];
  for (const line of src.split('\n')) for (const m of line.matchAll(/(--[\w-]+\s*:[^;{}]*)?\b(\d+(?:\.\d+)?)px/g)) if (!m[1] && m[2] !== '0') px.push(line.trim().slice(0, 80));
  scan[f] = {px_disi: [...new Set(px)], outline: (src.match(/fa-regular|fa-light|fa-thin|\bfar\b/g) || []).length, important: (src.match(/!important/g) || []).length};
}
results.statik = scan;
fs.writeFileSync('v3-app/docs/ana-sayfa-alternatifler-qa.json', JSON.stringify(results, null, 1));
console.log(JSON.stringify({kontrast: Object.fromEntries(Object.entries(results.sayfalar).map(([k, v]) => [k, v.filter(r => r.kontrast).map(r => [r.width, r.kontrast])])), overlay: Object.fromEntries(Object.entries(results.sayfalar).map(([k, v]) => [k, v.map(r => r.overlay.en_dik_egim_yuzde_px)])), statik: scan}));
