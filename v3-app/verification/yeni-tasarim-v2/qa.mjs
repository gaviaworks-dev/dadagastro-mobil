// Yeni tasarım 2. sürüm yayını doğrulaması (yerel ya da canlı), docs/46. Proje kökünden:
//   node v3-app/verification/yeni-tasarim-v2/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim-v2/ yerel
//   node v3-app/verification/yeni-tasarim-v2/qa.mjs https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim-v2/ canli
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../set3/http-queue.mjs';

const [base, tag = 'yerel'] = process.argv.slice(2);
const dir = `v3-app/docs/screenshots/yeni-tasarim-v2/${tag}`;
fs.mkdirSync(dir, {recursive: true});
const TITLE = 'DadaGastro Mobil Uygulama — Yeni Tasarım (2. sürüm)';
const LEAD = 'İki seçenek alt alta. Ekranların içinde kaydırabilir, menüyü açabilir, sekmelere dokunabilirsiniz.';
const OLD = /(^|\/)(detay-c|tarif-detay|liste|tarifler|arama|index|tabaktan-tarif|ana-sayfa-v3|ana-x\d|ana-\d|liste-\d|detay-\d)\.html/;
const CODE = /\b(v2|v3|V2|V3|SET\s?\d|liste-v2|detay-v2|ana-v3|ana-x\d|ana-y\d|ana-\d|x6|yazar=\w|radius=\w|rozet=\w|gosterge=\w|siralama=\w)\b/;
const READY = {'ana-v3.html': 'HOME_V3_READY', 'liste-v2.html': 'LIST_V2_READY', 'detay-v2.html': 'DV2_READY'};
const out = {base, tarih: new Date().toISOString(), sonuc: [], gezinme: []};
const local = base.startsWith('http://127.0.0.1');
const params = u => Object.fromEntries(new URL(u).searchParams);
const wait = ms => new Promise(r => setTimeout(r, ms));

async function frameReady(frame) {
  const file = new URL(frame.url()).pathname.split('/').pop();
  await frame.waitForFunction(k => window[k] === true, READY[file], {timeout: 30000});
  await frame.evaluate(() => document.fonts.ready);
  return file;
}

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
    await p.goto(base, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
    const row = {engine, vw};
    row.baslik = await p.title();
    assert.equal(row.baslik, TITLE);
    assert.equal(await p.locator('.sn-head h1').innerText(), TITLE);
    assert.equal(await p.locator('.sn-head p').innerText(), LEAD);
    assert.equal(await p.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
    row.metin = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    assert(!CODE.test(row.metin), 'iç kod: ' + (row.metin.match(CODE) || [])[0]);
    if (vw === 1440) {
      // Load every frame (lazy ones scroll into view), then measure.
      for (const f of await p.locator('iframe').all()) { await f.scrollIntoViewIfNeeded(); await wait(300); }
      await p.evaluate(() => scrollTo(0, 0));
      const groups = await p.evaluate(() => [...document.querySelectorAll('.sn-group')].map(g => ({h2: g.querySelector('h2').textContent, caps: [...g.querySelectorAll('figcaption')].map(c => c.textContent), phones: [...g.querySelectorAll('.sn-phone')].map(ph => { const r = ph.getBoundingClientRect(), f = ph.querySelector('iframe'); return {w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: Math.round(r.top + scrollY), iw: f.offsetWidth, ih: f.offsetHeight}; }), open: [...g.querySelectorAll('.sn-open')].map(a => a.textContent.trim())})));
      assert.deepEqual(groups.map(g => g.h2), ['Seçenek 1', 'Seçenek 2', 'Tarif detay: şef kartı seçenekleri']);
      assert.deepEqual(groups[0].caps, ['1. Ana Sayfa', '2. Tarif Listesi', '3. Tarif Detay']);
      assert.deepEqual(groups[1].caps, ['1. Ana Sayfa', '2. Tarif Listesi', '3. Tarif Detay']);
      assert.deepEqual(groups[2].caps, ['Şef kartı 1', 'Şef kartı 2', 'Şef kartı 3', 'Şef kartı 4']);
      for (const g of groups) {
        assert(g.phones.every(x => x.iw === 390 && x.ih === 844 && x.top === g.phones[0].top), JSON.stringify(g.phones));
        assert(g.phones.every(x => Math.abs(x.h / x.w - 844 / 390) < 0.01), 'oran ' + JSON.stringify(g.phones));
        assert(g.open.every(t => t === 'Tam ekran aç'));
      }
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma (1440)');
      assert(groups[2].phones.every(x => x.w < 390), 'şef kartı satırı ölçeklenmedi');
      row.gruplar = groups;
      // Inside each frame: the page is 390 wide and ready.
      row.cerceveler = [];
      for (const fr of p.frames().filter(f => f !== p.mainFrame())) {
        const file = await frameReady(fr);
        const w = await fr.evaluate(() => innerWidth);
        assert.equal(w, 390, file);
        row.cerceveler.push({file, q: params(fr.url()), w});
      }
      assert.equal(row.cerceveler.length, 10);
      await p.screenshot({path: `${dir}/${engine}-1440.png`, fullPage: true});
    } else {
      // Narrow: three tabs, the chosen tab's screens stacked.
      assert.deepEqual(await p.locator('[data-sn-tab]').allInnerTexts(), ['Seçenek 1', 'Seçenek 2', 'Şef kartları']);
      row.sekmeler = [];
      for (const [id, n] of [['sn-g1', 3], ['sn-g2', 3], ['sn-g3', 4]]) {
        await p.locator(`[data-sn-tab="${id}"]`).click(); await wait(400);
        const vis = await p.evaluate(id => [...document.querySelectorAll(`#${id} .sn-phone`)].map(ph => { const r = ph.getBoundingClientRect(); return {x: Math.round(r.left), top: Math.round(r.top + scrollY), w: Math.round(r.width)}; }), id);
        const hidden = await p.evaluate(id => [...document.querySelectorAll('.sn-group')].filter(g => g.id !== id && g.offsetParent).length, id);
        assert.equal(vis.length, n); assert.equal(hidden, 0);
        assert(vis.every((v, i) => i === 0 || v.top > vis[i - 1].top), 'alt alta değil ' + JSON.stringify(vis));
        assert(vis.every(v => v.x >= 0 && v.x + v.w <= 390), 'taşma ' + JSON.stringify(vis));
        row.sekmeler.push({id, ekran: n, konum: vis});
        for (const f of await p.locator(`#${id} iframe`).all()) { await f.scrollIntoViewIfNeeded(); await wait(250); }
      }
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma');
      await p.locator('[data-sn-tab="sn-g1"]').click(); await p.evaluate(() => scrollTo(0, 0)); await wait(800);
      for (const fr of p.frames().filter(f => f !== p.mainFrame())) await frameReady(fr);
      await p.screenshot({path: `${dir}/${engine}-390.png`});
    }
    // Inside a frame: menu opens and closes; slider moves; gallery opens.
    const g1 = n => p.frameLocator(`#sn-g1 .sn-screen:nth-child(${n}) iframe`);
    await p.locator('#sn-g1 .sn-screen:nth-child(1) iframe').scrollIntoViewIfNeeded();
    await g1(1).locator('[data-site-menu]').first().click(); await wait(500);
    assert.equal(await g1(1).locator('dialog.om[open]').count(), 1);
    await p.screenshot({path: `${dir}/${engine}-${vw}-menu.png`});
    await g1(1).locator('.om-close').click(); await wait(400);
    assert.equal(await g1(1).locator('dialog.om[open]').count(), 0);
    const pairsMoved = await g1(1).locator('.dg-pairs__track').evaluate(async t => { t.scrollIntoView({block: 'center'}); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true})); await new Promise(r => setTimeout(r, 900)); return t.scrollLeft; });
    assert(pairsMoved > 100, 'ikili slider kaymadı ' + pairsMoved);
    await p.locator('#sn-g1 .sn-screen:nth-child(3) iframe').scrollIntoViewIfNeeded();
    await g1(3).locator('[data-gallery]').first().click(); await wait(800);
    const gal = await g1(3).locator('dialog.dv2-lb').evaluate(d => ({open: d.open, nw: d.querySelector('img')?.naturalWidth || 0}));
    assert(gal.open && gal.nw > 0, 'galeri ' + JSON.stringify(gal));
    await g1(3).locator('[data-lb-close]').click(); await wait(400);
    row.cerceve_ici = {menu: 'açıldı/kapandı', ikili_slider_scrollLeft: pairsMoved, galeri: gal};
    row.hatalar = [...new Set(errors)]; row.ag = [...new Set(bad)];
    assert.deepEqual(row.hatalar, [], JSON.stringify(row.hatalar)); assert.deepEqual(row.ag, [], JSON.stringify(row.ag));
    out.sonuc.push(row);
    await ctx.close();
  }

  // Navigation inside the phones keeps the row's options (Seçenek 2 = every option b).
  {
    const ctx = await browser.newContext({viewport: {width: 1440, height: 1000}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await p.goto(base, {waitUntil: 'networkidle'});
    const frameOf = n => p.frames().find(f => f.parentFrame() === p.mainFrame() && f.name() === '' && f === p.frames().filter(x => x.parentFrame() === p.mainFrame())[n]);
    const B = ['gosterge', 'radius', 'rozet', 'siralama', 'yazar'];
    const step = async (n, click, expectFile, label) => {
      const el = p.locator(`.sn-group:nth-of-type(${n[0]}) .sn-screen:nth-child(${n[1]}) iframe`);
      await el.scrollIntoViewIfNeeded();
      const fr = await (await el.elementHandle()).contentFrame();
      await frameReady(fr);
      // The preview frame pins itself to the top until the viewer interacts (six-gallery-start.js): signal an interaction first.
      await fr.evaluate(sel => { dispatchEvent(new WheelEvent('wheel')); const a = document.querySelector(sel); a.scrollIntoView({block: 'center', behavior: 'instant'}); }, click);
      await wait(300);
      console.error('adım', engine, n.join('/'), label);
      await Promise.all([fr.waitForNavigation({waitUntil: 'load'}), fr.click(click)]);
      const file = await frameReady(fr);
      const q = params(fr.url());
      assert.equal(file, expectFile, label);
      const want = n[0] === 2 ? 'b' : 'a';
      for (const k of B) assert.equal(q[k], want, `${label}: ${k}=${q[k]}`);
      const state = await fr.evaluate(() => ({radius: document.documentElement.dataset.dgRadius, rozet: document.documentElement.dataset.dgRozet, gosterge: document.documentElement.dataset.dgGosterge, siralama: document.body.dataset.siralama || null, yazar: document.body.dataset.dv2Yazar || null}));
      assert.equal(state.radius, want); assert.equal(state.rozet, want); assert.equal(state.gosterge, want);
      if (file === 'liste-v2.html') assert.equal(state.siralama, want);
      if (file === 'detay-v2.html') assert.equal(state.yazar, want);
      out.gezinme.push({engine, satir: n[0], ekran: n[1], adim: label, adres: fr.url().split('/').pop(), durum: state});
      return fr;
    };
    for (const row of [1, 2]) {
      await step([row, 1], '.dg-pairs .dg-card__text', 'detay-v2.html', 'ana sayfa kart → detay');
      await step([row, 2], '.lv2-results .dg-card__text', 'detay-v2.html', 'liste kartı → detay');
      const fr = await step([row, 3], '.dv2-similar .dg-card__text', 'detay-v2.html', 'benzer tarif → detay');
      await fr.evaluate(() => { dispatchEvent(new WheelEvent('wheel')); document.querySelector('.dv2-similar .dg-head__link').scrollIntoView({block: 'center', behavior: 'instant'}); }); await wait(300);
      await Promise.all([fr.waitForNavigation({waitUntil: 'load'}), fr.click('.dv2-similar .dg-head__link')]);
      assert.equal(await frameReady(fr), 'liste-v2.html', 'detay Tümü → liste');
      for (const k of B) assert.equal(params(fr.url())[k], row === 2 ? 'b' : 'a', 'detay Tümü ' + k);
      out.gezinme.push({engine, satir: row, adim: 'detay Tümü → liste', adres: fr.url().split('/').pop()});
    }
    // Home "Tümü" → list, from a fresh page (frames above have navigated away).
    await p.reload({waitUntil: 'networkidle'});
    for (const row of [1, 2]) await step([row, 1], '.v3-content>section:first-child .dg-head__link', 'liste-v2.html', 'ana sayfa Tümü → liste');
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    await ctx.close();
  }

  // Each screen alone: no old pages (menus open too), no code in visible text.
  {
    const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
    const p = await ctx.newPage(); if (local) await stableLocal(p);
    const errors = [], bad = [];
    p.on('pageerror', e => errors.push(e.message)); ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    for (const file of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'detay-v2.html?giris=1&yazar=b']) {
      await p.goto(base + file, {waitUntil: 'networkidle'});
      await p.locator('[data-site-menu]').first().click(); await wait(400);
      const s = await p.evaluate(src => { const OLD = new RegExp(src); const hrefs = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')); return {old: hrefs.filter(h => OLD.test(h.split('?')[0])), text: document.body.innerText.replace(/\s+/g, ' ')}; }, OLD.source);
      assert.deepEqual(s.old, [], file + ' ' + JSON.stringify(s.old));
      assert(!CODE.test(s.text), file + ': ' + (s.text.match(CODE) || [])[0]);
      await p.keyboard.press('Escape'); await wait(300);
    }
    assert.deepEqual(errors, [], JSON.stringify(errors)); assert.deepEqual(bad, [], JSON.stringify(bad));
    await ctx.close();
  }
  await browser.close();
}
// robots + pages respond
const http = {};
for (const f of ['', 'ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'robots.txt']) { const r = await fetch(base + f); http[f || 'index'] = r.status; assert.equal(r.status, 200, f); }
out.http = http;
fs.writeFileSync(`v3-app/verification/yeni-tasarim-v2/qa-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ok: true, http, gorunumler: out.sonuc.map(r => `${r.engine} ${r.vw}`), gezinme: out.gezinme.length}));
