// 46 · Ana sayfa ve listenin kullanabileceği bütün görsel adreslerini toplar ve her birini sayfanın kendi
// çözümlemesiyle (göreli yol = yerel sunucu) yükleyip 4xx/yüklenemeyenleri listeler.
// Proje kökünden: node v3-app/docs/46/gorsel-tara.mjs <etiket>
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';

const tag = process.argv[2] || 'once';
const B = 'http://127.0.0.1:8765/v3-app/';
const browser = await chromium.launch();
const out = {tarih: new Date().toISOString(), sayfalar: {}};
for (const pg of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']) {
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
  const p = await ctx.newPage(); await stableLocal(p);
  await p.goto(B + pg, {waitUntil: 'networkidle'});
  const urls = await p.evaluate(() => {
    const set = new Map();
    const add = (u, where) => { if (!u || typeof u !== 'string') return; if (!/\.(webp|avif|jpe?g|png|svg)(\?|$)/i.test(u)) return; if (!set.has(u)) set.set(u, where); };
    const walk = (o, where, depth = 0) => { if (!o || depth > 6) return; if (typeof o === 'string') return add(o, where); if (Array.isArray(o)) return o.forEach(x => walk(x, where, depth + 1)); if (typeof o === 'object') for (const k of Object.keys(o)) walk(o[k], where + '.' + k, depth + 1); };
    for (const name of ['DATA', 'WEB', 'PARITY', 'SIX_MEDIA', 'V3_KATEGORI_MEDIA', 'DV2_SIMILAR']) { let v = null; try { v = (0, eval)(`typeof ${name} !== 'undefined' ? ${name} : null`); } catch {} if (v) walk(v, name); }
    // Exact URLs the page will request: data-photo-src (already absolutised) and inline background images.
    for (const el of document.querySelectorAll('[data-photo-src]')) add(el.dataset.photoSrc, 'dom:data-photo-src');
    for (const el of document.querySelectorAll('[style*="background-image"]')) { const m = el.getAttribute('style').match(/url\(['"]?([^'")]+)/); if (m) add(m[1], 'dom:style'); }
    for (const el of document.querySelectorAll('img[src]')) add(el.getAttribute('src'), 'dom:img');
    return [...set.entries()];
  });
  // Resolve as the browser would, from this page; check each.
  const res = [];
  for (const [u, where] of urls) {
    const abs = new URL(u, B + pg).href;
    let status = 0;
    try { const r = await ctx.request.get(abs, {timeout: 20000, maxRedirects: 3}); status = r.status(); } catch (e) { status = -1; }
    res.push({u, abs, where, status, relative: u.startsWith('/')});
  }
  out.sayfalar[pg] = {toplam: res.length, goreli: res.filter(x => x.relative).length, hatali: res.filter(x => x.status !== 200)};
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`v3-app/docs/46/gorsel-${tag}.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out.sayfalar)) console.log(k, 'toplam', v.toplam, 'göreli', v.goreli, 'hatalı', v.hatali.length, JSON.stringify(v.hatali.slice(0, 12).map(x => [x.status, x.where, x.u])));
