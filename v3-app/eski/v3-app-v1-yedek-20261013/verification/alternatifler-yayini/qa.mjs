// Ana sayfa seçenekleri yayını doğrulaması (yerel ya da canlı). Proje kökünden:
//   node v3-app/verification/alternatifler-yayini/qa.mjs http://127.0.0.1:8765/yayin/ana-sayfa-alternatifleri/ yerel
//   node v3-app/verification/alternatifler-yayini/qa.mjs https://gaviaworks-dev.github.io/dadagastro-mobil/ana-sayfa-alternatifleri/ canli
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../set3/http-queue.mjs';

const [base, tag = 'yerel'] = process.argv.slice(2);
const dir = `v3-app/docs/screenshots/alternatifler-yayini/${tag}`;
fs.mkdirSync(dir, {recursive: true});
const PAGES = ['ana-v3.html', 'ana-v3-alt1.html', 'ana-v3-alt2.html', 'ana-v3-alt3.html'];
const OLD = /(^|\/)(detay-c|tarif-detay|liste|tarifler|arama|index|tabaktan-tarif|ana-sayfa-v3|ana-x\d|ana-\d)\.html/;
const CODE = /\b(v2|v3|V2|V3|SET\s?\d|alt\d|liste-v2|detay-v2|ana-v3|ana-x\d|ana-y\d|ana-\d|x6)\b/;
const local = base.startsWith('http://127.0.0.1');
const out = {base, tarih: new Date().toISOString(), sonuc: [], sayfalar: []};

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const [vw, vh] of [[1440, 1000], [390, 844]]) {
    const ctx = await browser.newContext({viewport: {width: vw, height: vh}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    ctx.on('requestfailed', r => bad.push('failed ' + r.url() + ' ' + (r.failure()?.errorText || '')));
    await p.goto(base, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2000);
    const row = {engine, vw, baslik: await p.title(), metin: await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim())};
    assert.equal(row.baslik, 'DadaGastro Mobil Uygulama — Ana Sayfa Seçenekleri');
    assert(!CODE.test(row.metin), row.metin);
    assert.equal(await p.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
    if (vw === 1440) {
      const phones = await p.evaluate(() => [...document.querySelectorAll('.as-screen')].map(s => { const r = s.querySelector('.as-phone').getBoundingClientRect(); return {h2: s.querySelector('h2').textContent, w: Math.round(r.width), top: Math.round(r.top), open: s.querySelector('.as-open').textContent.trim()}; }));
      assert.deepEqual(phones.map(x => x.h2), ['1.', '2.', '3.', '4.']); assert(phones.every(x => x.w === phones[0].w && x.top === phones[0].top && x.open === 'Tam ekran aç'), JSON.stringify(phones));
      row.cerceveler = phones;
    } else {
      assert.deepEqual(await p.locator('[data-as-tab]').allInnerTexts(), ['1.', '2.', '3.', '4.']);
      assert.equal(await p.locator('.as-screen:visible').count(), 1);
      await p.locator('[data-as-tab="3"]').click(); await p.waitForTimeout(1500); assert(await p.locator('#as-3').isVisible());
      await p.locator('[data-as-tab="1"]').click(); await p.waitForTimeout(800);
    }
    await p.screenshot({path: `${dir}/${engine}-${vw}.png`, fullPage: vw === 1440});
    // Inside a frame: scroll, open and close the menu.
    const f = p.frameLocator('#as-1 iframe');
    await f.locator('body').evaluate(() => scrollTo({top: 600, behavior: 'instant'}));
    await f.locator('[data-site-menu]').first().click(); await p.waitForTimeout(500);
    assert.equal(await f.locator('dialog.om[open]').count(), 1);
    if (engine === 'chromium') await p.screenshot({path: `${dir}/${engine}-${vw}-menu.png`});
    await f.locator('.om-close').click(); await p.waitForTimeout(400);
    row.hatalar = errors; row.ag = bad;
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    out.sonuc.push(row);
    await ctx.close();
  }

  // Each home page: cards → ../yeni-tasarim/ detail, "Tümü" → list; no old pages; no code in visible text.
  for (const pg of PAGES) {
    const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await p.goto(base + pg, {waitUntil: 'networkidle'});
    await p.locator('[data-site-menu]').first().click(); await p.waitForTimeout(400);
    const s = await p.evaluate(OLDsrc => { const OLD = new RegExp(OLDsrc), hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
      return {old: hrefs.filter(h => OLD.test(h.split('?')[0]) && !h.startsWith('../yeni-tasarim/')), text: document.body.innerText.replace(/\s+/g, ' '),
        kart: document.querySelector('.collection-block .recipe-card .card-copy').getAttribute('href'), tumu: document.querySelector('.collection-block .six-see').getAttribute('href'),
        sefler: document.querySelector('.v3-chefs .six-see').getAttribute('href'), kategori: document.querySelector('.v3-cat-tile').getAttribute('href'), oneri: document.querySelector('.x-recipe')?.getAttribute('href')}; }, OLD.source);
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    assert.deepEqual(s.old, [], pg + ' ' + JSON.stringify(s.old)); assert(!CODE.test(s.text), pg + ': ' + (s.text.match(CODE) || [])[0]);
    assert(s.kart.startsWith('../yeni-tasarim/detay-v2.html?tarif=') && s.oneri.startsWith('../yeni-tasarim/detay-v2.html?tarif='), JSON.stringify(s));
    assert(s.tumu.startsWith('../yeni-tasarim/liste-v2.html') && s.sefler.startsWith('../yeni-tasarim/liste-v2.html') && s.kategori.startsWith('../yeni-tasarim/liste-v2.html'), JSON.stringify(s));
    // Follow a card to the published detail, then "Tümü" to the published list.
    await p.locator('.collection-block .recipe-card .card-copy').first().click(); await p.waitForLoadState('networkidle');
    assert(/\/yeni-tasarim\/detay-v2\.html\?tarif=/.test(p.url()), p.url()); assert((await p.locator('h1').first().innerText()).length > 0);
    const detail = p.url();
    await p.goto(base + pg, {waitUntil: 'networkidle'});
    await p.locator('.collection-block .six-see').click(); await p.waitForLoadState('networkidle');
    assert(/\/yeni-tasarim\/liste-v2\.html/.test(p.url()), p.url()); assert.equal(await p.locator('h1').first().innerText(), 'Tarifler');
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    if (engine === 'chromium') out.sayfalar.push({sayfa: pg, kart: s.kart, tumu: s.tumu, sefler: s.sefler, kategori: s.kategori, detay_acildi: detail.split('/').slice(-2).join('/'), liste_acildi: p.url().split('/').slice(-2).join('/')});
    await ctx.close();
  }
  await browser.close();
}
fs.writeFileSync(`v3-app/verification/alternatifler-yayini/qa-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ok: true, metin: out.sonuc[0].metin, gorunumler: out.sonuc.map(r => `${r.engine} ${r.vw}`), sayfalar: out.sayfalar}));
