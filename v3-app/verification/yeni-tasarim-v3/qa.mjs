// Yeni tasarım 3. sürüm yayını doğrulaması (yerel ya da canlı), docs/48. Proje kökünden:
//   node v3-app/verification/yeni-tasarim-v3/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim-v3/ yerel
//   node v3-app/verification/yeni-tasarim-v3/qa.mjs https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim-v3/ canli
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../set3/http-queue.mjs';

const [base, tag = 'yerel'] = process.argv.slice(2);
const dir = `v3-app/docs/screenshots/yeni-tasarim-v3/${tag}`;
fs.mkdirSync(dir, {recursive: true});
const TITLE = 'DadaGastro Mobil Uygulama — Yeni Tasarım';
const LEAD = 'Üç ekran yan yana. Ekranların içinde kaydırabilir, kartlardan tarife, “Tümü”den listeye geçebilir, menüyü açabilirsiniz.';
const OLD = /(^|\/)(detay-c|tarif-detay|liste|tarifler|arama|index|tabaktan-tarif|ana-sayfa-v3|ana-x\d|ana-\d|liste-\d|detay-\d|onizleme-v3)\.html/;
const CODE = /\b(v2|v3|V2|V3|SET\s?\d|liste-v2|detay-v2|ana-v3|onizleme|ana-x\d|ana-y\d|ana-\d|x6|yazar=\w|radius=\w|rozet=\w|gosterge=\w|siralama=\w|Seçenek)\b|\.html|\?v=/;
const READY = {'ana-v3.html': 'HOME_V3_READY', 'liste-v2.html': 'LIST_V2_READY', 'detay-v2.html': 'DV2_READY'};
const out = {base, tarih: new Date().toISOString(), sonuc: [], gezinme: []};
const local = base.startsWith('http://127.0.0.1');
const wait = ms => new Promise(r => setTimeout(r, ms));
async function frameReady(frame) {
  // Sıralı yüklemede çerçeve kısa süre about:blank kalır: gerçek ekran adresine geçmesi beklenir.
  for (let i = 0; i < 300 && !/\.html/.test(frame.url()); i++) await wait(100);
  await frame.waitForFunction(() => document.readyState === 'complete', null, {timeout: 60000});
  const file = new URL(frame.url()).pathname.split('/').pop();
  await frame.waitForFunction(k => window[k] === true, READY[file], {timeout: 60000});
  await frame.evaluate(() => document.fonts.ready);
  return file;
}
const frames = p => p.frames().filter(f => f.parentFrame() === p.mainFrame());
async function allFramesLoaded(p) { await p.waitForFunction(() => [...document.querySelectorAll('iframe')].every(f => f.getAttribute('src')), null, {timeout: 90000}); for (const fr of frames(p)) await frameReady(fr); }

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const [vw, vh] of [[1440, 1000], [390, 844]]) {
    const ctx = await browser.newContext({viewport: {width: vw, height: vh}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    ctx.on('page', pg => pg.on('pageerror', e => errors.push(e.message)));
    p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    ctx.on('requestfailed', r => { if (!/favicon/.test(r.url())) bad.push('failed ' + r.url() + ' ' + (r.failure()?.errorText || '')); });
    await p.goto(base, {waitUntil: 'load'}); await allFramesLoaded(p); await p.waitForLoadState('networkidle');
    const row = {engine, vw};
    row.baslik = await p.title();
    assert.equal(row.baslik, TITLE);
    assert.equal(await p.locator('.pv-head h1').innerText(), TITLE);
    assert.equal(await p.locator('.pv-head p').innerText(), LEAD);
    assert.equal(await p.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
    row.metin = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    assert(!CODE.test(row.metin), 'iç kod: ' + (row.metin.match(CODE) || [])[0]);
    const phones = await p.evaluate(() => [...document.querySelectorAll('.pv-screen')].map(s => { const ph = s.querySelector('.pv-phone'), r = ph.getBoundingClientRect(), f = s.querySelector('iframe'); return {cap: s.querySelector('figcaption').textContent, visible: getComputedStyle(s).visibility === 'visible', w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: Math.round(r.top), iw: f.offsetWidth, ih: f.offsetHeight, open: s.querySelector('.pv-open').textContent.trim()}; }));
    assert.deepEqual(phones.map(x => x.cap), ['1. Ana Sayfa', '2. Tarif Listesi', '3. Tarif Detay']);
    assert(phones.every(x => x.iw === 390 && x.ih === 844 && x.open === 'Tam ekran aç'), JSON.stringify(phones));
    for (const fr of frames(p)) assert.equal(await fr.evaluate(() => innerWidth), 390);
    assert.equal(frames(p).length, 3);
    assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma');
    if (vw === 1440) {
      assert(phones.every(x => x.visible && x.top === phones[0].top && Math.abs(x.h / x.w - 844 / 390) < 0.01), 'yan yana değil ' + JSON.stringify(phones));
      assert.equal(await p.locator('.pv-tabs').evaluate(e => getComputedStyle(e).display), 'none');
      await p.screenshot({path: `${dir}/${engine}-1440.png`});
    } else {
      assert.deepEqual(await p.locator('[data-pv-tab]').allInnerTexts(), ['Ana Sayfa', 'Tarif Listesi', 'Tarif Detay']);
      row.sekmeler = [];
      for (const [i, id] of ['pv-s1', 'pv-s2', 'pv-s3'].entries()) {
        await p.locator(`[data-pv-tab="${id}"]`).click(); await wait(400);
        const vis = await p.evaluate(() => [...document.querySelectorAll('.pv-screen')].filter(s => getComputedStyle(s).visibility === 'visible').map(s => s.id));
        assert.deepEqual(vis, [id]); row.sekmeler.push(vis[0]);
        await p.screenshot({path: `${dir}/${engine}-390-${i + 1}.png`});
      }
      await p.locator('[data-pv-tab="pv-s1"]').click(); await wait(300);
    }
    // Inside the frames: menu opens and closes, pair slider moves, featured slider moves, gallery opens.
    const fl = n => p.frameLocator(`#pv-s${n} iframe`);
    if (vw === 390) await p.locator('[data-pv-tab="pv-s1"]').click();
    await fl(1).locator('[data-site-menu]').first().click(); await wait(500);
    assert.equal(await fl(1).locator('dialog.om[open]').count(), 1);
    await p.screenshot({path: `${dir}/${engine}-${vw}-menu.png`});
    await fl(1).locator('.om-close').click(); await wait(400);
    assert.equal(await fl(1).locator('dialog.om[open]').count(), 0);
    const pairs = await fl(1).locator('.dg-pairs__track').evaluate(async t => { t.scrollIntoView({block: 'center'}); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); await new Promise(r => setTimeout(r, 900)); return t.scrollLeft; });
    assert(pairs > 100, 'ikili slider kaymadı ' + pairs);
    const feat = await fl(1).locator('.v3-latest .dg-slider__track').evaluate(async t => { t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); await new Promise(r => setTimeout(r, 900)); return {left: t.scrollLeft, on: [...t.closest('.dg-slider').querySelectorAll('.dg-pager-dots i')].findIndex(i => i.classList.contains('is-on'))}; });
    assert(feat.left > 100 && feat.on === 1, 'öne çıkan slider ' + JSON.stringify(feat));
    const hero = await fl(1).locator('.v3-hero-track').evaluate(async t => { scrollTo(0, 0); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); await new Promise(r => setTimeout(r, 900)); return t.scrollLeft; });
    assert(hero > 100, 'hero slider ' + hero);
    if (vw === 390) { await p.locator('[data-pv-tab="pv-s3"]').click(); await wait(300); }
    await fl(3).locator('[data-gallery]').first().click(); await wait(900);
    const gal = await fl(3).locator('dialog.dv2-lb').evaluate(d => ({open: d.open, nw: d.querySelector('img')?.naturalWidth || 0, count: d.querySelector('.dv2-lb-count')?.textContent}));
    assert(gal.open && gal.nw > 0, 'galeri ' + JSON.stringify(gal));
    await fl(3).locator('[data-lb-close]').click(); await wait(400);
    row.cerceve_ici = {menu: 'açıldı/kapandı', ikili_slider: pairs, one_cikan: feat, hero, galeri: gal};
    row.hatalar = [...new Set(errors)]; row.ag = [...new Set(bad)];
    assert.deepEqual(row.hatalar, [], JSON.stringify(row.hatalar)); assert.deepEqual(row.ag, [], JSON.stringify(row.ag));
    out.sonuc.push(row);
    await ctx.close();
  }
  // Navigation inside the phones (desktop page): home card → detail, home "Tümü" → list, list card → detail,
  // similar recipe → detail, detail "Tümü" → list. The page itself stays on the preview.
  {
    const ctx = await browser.newContext({viewport: {width: 1440, height: 1000}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    const fresh = async () => { await p.goto(base, {waitUntil: 'load'}); await allFramesLoaded(p); };
    const step = async (i, sel, expect, label) => {
      const fr = frames(p)[i]; await frameReady(fr);
      const href = await fr.evaluate(sel => { const a = document.querySelector(sel); a.scrollIntoView({block: 'center', behavior: 'instant'}); return a.getAttribute('href'); }, sel);
      await Promise.all([fr.waitForNavigation({waitUntil: 'load'}), fr.evaluate(sel => document.querySelector(sel).click(), sel)]);
      const file = await frameReady(fr);
      assert.equal(file, expect, label); assert(p.url().startsWith(base), 'sayfa önizlemede kalmalı');
      assert(!/[?&](yazar|radius|rozet|gosterge|siralama)=/.test(fr.url()), 'eski seçenek parametresi ' + fr.url());
      out.gezinme.push({engine, adim: label, href, adres: fr.url().split('/').pop()});
    };
    await fresh();
    await step(0, '.v3-latest .dg-pairs .dg-card__text', 'detay-v2.html', 'ana sayfa kart → detay');
    await step(1, '.lv2-results .dg-card__text', 'detay-v2.html', 'liste kartı → detay');
    await step(2, '.dv2-similar .dg-card__text', 'detay-v2.html', 'benzer tarif → detay');
    await step(2, '.dv2-similar .dg-head__link', 'liste-v2.html', 'detay Tümü → liste');
    await fresh();
    await step(0, '.v3-content>section:first-child .dg-head__link', 'liste-v2.html', 'ana sayfa Tümü → liste');
    await step(0, '.lv2-results .dg-card__text', 'detay-v2.html', 'liste kartı → detay (gezinmeden sonra)');
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    await ctx.close();
  }
  // Each screen alone: no unpublished pages (menus open too), no code in visible text.
  {
    const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    for (const file of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'detay-v2.html?giris=1', 'detay-v2.html?yazar=c&radius=b']) {
      await p.goto(base + file, {waitUntil: 'networkidle'});
      await p.locator('[data-site-menu]').first().click(); await wait(400);
      const s = await p.evaluate(src => { const OLD = new RegExp(src); const hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')); return {old: hrefs.filter(h => OLD.test(h.split('?')[0])), text: document.body.innerText.replace(/\s+/g, ' ')}; }, OLD.source);
      assert.deepEqual(s.old, [], file + ' ' + JSON.stringify(s.old));
      assert(!CODE.test(s.text), file + ': ' + (s.text.match(CODE) || [])[0]);
      await p.keyboard.press('Escape'); await wait(300);
      await p.screenshot({path: `${dir}/${engine}-ekran-${file.split('?')[0].replace('.html', '')}${file.includes('?') ? '-param' : ''}.png`});
    }
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    await ctx.close();
  }
  await browser.close();
}
const http = {};
for (const f of ['', 'ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'robots.txt']) { const r = await fetch(base + f); http[f || 'index'] = r.status; assert.equal(r.status, 200, f); }
out.http = http;
fs.writeFileSync(`v3-app/verification/yeni-tasarim-v3/qa-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ok: true, http, gorunumler: out.sonuc.map(r => `${r.engine} ${r.vw}`), gezinme: out.gezinme.length}));
