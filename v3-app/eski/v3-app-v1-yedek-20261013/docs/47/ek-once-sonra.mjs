// 47 · EK önce/sonra (390, 2×): önce = EK öncesi (docs/47/ek-once: rozetsiz ama geniş/koyu geçiş, yıldız/puan),
// sonra = güncel. Açık ve koyu fotoğraflı kartlar. Kullanım (proje kökünden): node v3-app/docs/47/ek-once-sonra.mjs chromium|webkit
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const eng = process.argv[2] || 'chromium', HERE = new URL('.', import.meta.url).pathname;
const OUT = new URL('../screenshots/patron-secimleri/ek/', import.meta.url).pathname; fs.mkdirSync(OUT, {recursive: true});
const ONCE = fs.readdirSync(HERE + 'ek-once');
const S = [
  ['ana-v3.html', '.x-hero', 'Ana · hero slider'],
  ['ana-v3.html', '.v3-latest .dg-feature__media', 'Ana · öne çıkan (açık)'],
  ['ana-v3.html', '.v3-latest .dg-pairs__item:nth-child(2) .dg-tile__media', 'Ana · küçük kart (koyu)'],
  ['ana-v3.html', '.v3-latest .dg-pairs__item:nth-child(1) .dg-tile__media', 'Ana · küçük kart (açık)'],
  ['ana-v3.html', '.v3-cat-strip', 'Ana · kategori kartları'],
  ['ana-v3.html', '.v3-videos .v3-video-lead .v3-video-cover', 'Ana · video'],
  ['ana-v3.html', 'DOLAP', 'Ana · Dolapta Ne Var sonucu'],
  ['liste-v2.html', '.dg-slider .dg-feature__media', 'Liste · öne çıkan (koyu)'],
  ['liste-v2.html?sayfa=2', {text: 'Karabuğday', sel: '.lv2-grid .dg-card', media: '.dg-card__media'}, 'Liste · ızgara (açık)'],
  ['liste-v2.html', {text: 'Enfrijoladas', sel: '.lv2-grid .dg-card', media: '.dg-card__media'}, 'Liste · ızgara (koyu)'],
  ['liste-v2.html?gorunum=liste', '.lv2-rows .dg-card', 'Liste · satır'],
  ['detay-v2.html', '.dv2-similar .dg-pairs__item:nth-child(1) .dg-tile__media', 'Detay · benzer (açık)'],
  ['detay-v2.html', '.detail-hero', 'Detay · hero (açık)'],
  ['detay-v2.html?tarif=sardalya-izgara-limon-kekikli', '.detail-hero', 'Detay · hero (koyu)'],
];
const b = await (eng === 'webkit' ? webkit : chromium).launch(); const files = {};
for (const once of [true, false]) for (const [i, [url, target, label]] of S.entries()) {
  const p = await b.newPage({viewport: {width: 390, height: 844}, deviceScaleFactor: 2}); await stableLocal(p);
  if (once) await p.route(/\/v3-app\/(ana-v3|liste-v2|detay-v2|ortak-kart)\.(js|css)(\?.*)?$/, async r => { const f = new URL(r.request().url()).pathname.split('/').pop(); if (!ONCE.includes(f)) return r.fallback(); await r.fulfill({body: fs.readFileSync(HERE + 'ek-once/' + f), contentType: f.endsWith('.css') ? 'text/css' : 'text/javascript'}); });
  await p.goto('http://127.0.0.1:8765/v3-app/' + url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  let loc;
  if (target === 'DOLAP') { await p.evaluate(() => { document.querySelector('[data-v3-dolap-pop]').click(); document.querySelector('[data-v3-dolap-find]').click(); }); await p.waitForTimeout(800); loc = p.locator('.v3-dolap-rail .dg-tile__media').first(); }
  else if (typeof target === 'string') loc = p.locator(target).first();
  else { for (let pg = 1; pg <= 4; pg++) { const c = p.locator(target.sel, {hasText: target.text}); if (await c.count()) { loc = c.first().locator(target.media); break; } await p.evaluate(pg => document.querySelector(`[data-page-number="${pg + 1}"]`)?.click(), pg); await p.waitForTimeout(1200); } }
  if (!/hero/.test(label)) { await loc.evaluate(e => e.scrollIntoView({block: 'center', behavior: 'instant'})); await p.waitForTimeout(900); }
  else { await p.evaluate(() => { scrollTo({top: 0, behavior: 'instant'}); document.querySelector('.v3-hero-track')?.dispatchEvent(new Event('pointerdown')); }); await p.waitForTimeout(600); }
  const f = `${OUT}${eng}-${once ? 'once' : 'sonra'}-${String(i).padStart(2, '0')}.png`; await loc.screenshot({path: f}); (files[i] ??= {})[once ? 'once' : 'sonra'] = f;
  await p.close();
}
const img = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
const rows = S.map((s, i) => `<tr><th>${s[2]}</th><td><img src="${img(files[i].once)}"></td><td><img src="${img(files[i].sonra)}"></td></tr>`).join('');
const p = await b.newPage({viewport: {width: 1300, height: 900}});
await p.setContent(`<style>body{margin:0;padding:32px;font:15px/1.4 system-ui;background:#F9F9F9;color:#211E16}h1{font-size:20px;margin:0 0 8px}table{border-collapse:separate;border-spacing:24px 16px}th{text-align:left;width:200px;vertical-align:middle}thead th{text-align:center}td img{display:block;width:420px;height:auto}</style><h1>EK önce / sonra · ${eng} · 390</h1><table><thead><tr><th></th><th>Önce (geniş koyu geçiş, yıldız/puan, kutulu etiket)</th><th>Sonra (üst ve alt kenar, orta temiz; süre + görüntülenme kalın)</th></tr></thead><tbody>${rows}</tbody></table>`);
await p.screenshot({path: `${OUT}../ek-once-sonra-${eng}.png`, fullPage: true});
await b.close(); console.log('ok', eng);
