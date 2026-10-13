// Yeni tasarım yayını doğrulaması (yerel ya da canlı). Proje kökünden:
//   node v3-app/verification/yeni-tasarim/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim/ yerel
//   node v3-app/verification/yeni-tasarim/qa.mjs https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim/ canli
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../set3/http-queue.mjs';

const [base, tag = 'yerel'] = process.argv.slice(2);
const dir = `v3-app/docs/screenshots/yeni-tasarim/${tag}`;
fs.mkdirSync(dir, {recursive: true});
const OLD = /(^|\/)(detay-c|tarif-detay|liste|tarifler|arama|index|tabaktan-tarif|ana-sayfa-v3|ana-x\d|ana-\d)\.html/;
const CODE = /\b(v2|v3|V2|V3|SET\s?\d|liste-v2|detay-v2|ana-v3|ana-x\d|ana-y\d|ana-\d|x6)\b/;
const out = {base, tarih: new Date().toISOString(), sonuc: []};
const local = base.startsWith('http://127.0.0.1');

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const [vw, vh] of [[1440, 1000], [390, 844]]) {
    const ctx = await browser.newContext({viewport: {width: vw, height: vh}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    ctx.on('requestfailed', r => { if (!/favicon/.test(r.url())) bad.push('failed ' + r.url() + ' ' + (r.failure()?.errorText || '')); });
    await p.goto(base, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
    const row = {engine, vw};
    row.baslik = await p.title();
    row.metin = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    assert.equal(row.baslik, 'DadaGastro Mobil Uygulama — Yeni Tasarım');
    assert(!CODE.test(row.metin), row.metin);
    assert.equal(await p.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
    if (vw === 1440) {
      // Three phones side by side, 390×844 each, headings in order.
      const phones = await p.evaluate(() => [...document.querySelectorAll('.sn-screen')].map(s => { const r = s.querySelector('.sn-phone').getBoundingClientRect(); return {h2: s.querySelector('h2').textContent, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), visible: r.width > 0}; }));
      assert.deepEqual(phones.map(x => x.h2), ['1. Ana Sayfa', '2. Tarif Listesi', '3. Tarif Detay']);
      assert(phones.every(x => x.w === 390 && x.h === 844 && x.top === phones[0].top), JSON.stringify(phones));
      row.cerceveler = phones;
      await p.waitForTimeout(1500);
    } else {
      // Narrow: three tabs, one screen.
      assert.deepEqual(await p.locator('[data-sn-tab]').allInnerTexts(), ['1. Ana Sayfa', '2. Tarif Listesi', '3. Tarif Detay']);
      assert.equal(await p.locator('.sn-screen:visible').count(), 1);
      await p.locator('[data-sn-tab="2"]').click(); await p.waitForTimeout(1500);
      assert.equal(await p.locator('#sn-ekran-2').isVisible(), true);
      await p.locator('[data-sn-tab="1"]').click(); await p.waitForTimeout(800);
    }
    await p.screenshot({path: `${dir}/${engine}-${vw}.png`, fullPage: vw === 1440});
    // Inside the frames: scroll, open the menu, switch a tab.
    const f1 = p.frameLocator('#sn-ekran-1 iframe');
    await f1.locator('[data-site-menu]').first().click(); await p.waitForTimeout(500);
    assert.equal(await f1.locator('dialog.om[open]').count(), 1);
    if (engine === 'chromium') await p.screenshot({path: `${dir}/${engine}-${vw}-menu.png`});
    await f1.locator('.om-close').click(); await p.waitForTimeout(400);
    await f1.locator('[data-v3-cat="cuisine"]').click(); assert.equal(await f1.locator('[data-v3-cat="cuisine"]').getAttribute('aria-selected'), 'true');
    row.cerceve_ici = 'menü açıldı/kapandı, Dünya Mutfakları sekmesi çalıştı';
    row.hatalar = errors; row.ag = bad;
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    out.sonuc.push(row);
    await ctx.close();
  }

  // Each screen on its own: links between the three, no old pages, no code in visible text (menus included).
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
  const p = await ctx.newPage(); if (local) await stableLocal(p);
  const errors = [], bad = [];
  p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  const scanPage = async name => {
    await p.locator('[data-site-menu]').first().click(); await p.waitForTimeout(400);
    const s = await p.evaluate(OLDsrc => { const OLD = new RegExp(OLDsrc); const hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')); return {old: hrefs.filter(h => OLD.test(h.split('?')[0])), text: document.body.innerText.replace(/\s+/g, ' ')}; }, OLD.source);
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    assert.deepEqual(s.old, [], name + ' ' + JSON.stringify(s.old)); assert(!CODE.test(s.text), name + ': ' + (s.text.match(CODE) || [])[0]);
  };
  await p.goto(base + 'ana-v3.html', {waitUntil: 'networkidle'}); await scanPage('ana sayfa');
  const homeLinks = await p.evaluate(() => ({kart: document.querySelector('.collection-block .recipe-card .card-copy').getAttribute('href'), tumu: document.querySelector('.collection-block .six-see').getAttribute('href'), kategori: document.querySelector('.v3-cat-tile').getAttribute('href')}));
  assert(homeLinks.kart.startsWith('liste-v2.html') && homeLinks.tumu.startsWith('liste-v2.html') && homeLinks.kategori.startsWith('liste-v2.html'), JSON.stringify(homeLinks));
  await p.locator('.collection-block .recipe-card .card-copy').first().click(); await p.waitForLoadState('networkidle');
  assert(p.url().includes('liste-v2.html')); await scanPage('liste');
  const listCard = await p.evaluate(() => document.querySelector('a[href*="detay-v2.html"]')?.getAttribute('href'));
  assert(listCard, 'listede detay bağlantısı yok');
  await p.locator(`a[href="${listCard}"]`).first().click(); await p.waitForLoadState('networkidle');
  assert(p.url().includes('detay-v2.html')); await scanPage('detay');
  out.baglantilar = {ana_sayfa: homeLinks, liste_karti: listCard, detay: p.url().split('/').pop()};
  assert.deepEqual(errors, []); assert.deepEqual(bad, []);
  await ctx.close();
  await browser.close();
}
fs.writeFileSync(`v3-app/verification/yeni-tasarim/qa-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ok: true, sayfa_metni: out.sonuc[0].metin, baglantilar: out.baglantilar, gorunumler: out.sonuc.map(r => `${r.engine} ${r.vw}`)}));
