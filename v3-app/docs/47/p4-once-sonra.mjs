// 47 · P4 önce/sonra: ana sayfa (öne çıkan, küçük kart, video), liste (ızgara açık/koyu fotoğraf, satır), detay benzer tarif.
// "Önce" = bu tur öncesi dosyalar (docs/47/once). 3× kırpım, tek görselde yan yana. Proje kökünden çalıştırılır.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const HERE = new URL('.', import.meta.url).pathname, OUT = new URL('../screenshots/patron-secimleri/p4/', import.meta.url).pathname;
fs.mkdirSync(OUT, {recursive: true});
const ONCE = ['ana-v3.html', 'ana-v3.js', 'ana-v3.css', 'liste-v2.html', 'liste-v2.js', 'liste-v2.css', 'detay-v2.html', 'detay-v2.js', 'detay-v2.css', 'ortak-kart.css', 'ortak-kart.js'];
const SHOTS = [
  ['ana-v3.html', '.v3-latest .dg-feature__media', 'Ana sayfa · öne çıkan (açık fotoğraf)'],
  ['ana-v3.html', '.v3-latest .dg-pairs .dg-tile__media', 'Ana sayfa · küçük kart'],
  ['ana-v3.html', '.v3-videos .v3-video-lead .v3-video-cover', 'Ana sayfa · video'],
  ['liste-v2.html?sayfa=2', {text: 'Karabuğday', sel: '.lv2-grid .dg-card', media: '.dg-card__media'}, 'Liste · ızgara (açık fotoğraf)'],
  ['liste-v2.html', {text: 'Enfrijoladas', sel: '.lv2-grid .dg-card', media: '.dg-card__media'}, 'Liste · ızgara (koyu fotoğraf)'],
  ['liste-v2.html?gorunum=liste', '.lv2-rows .dg-card', 'Liste · satır'],
  ['detay-v2.html', '.dv2-similar .dg-tile__media', 'Detay · benzer tarif'],
];
const b = await chromium.launch(); const files = [];
for (const once of [true, false]) for (const [i, [url, target, label]] of SHOTS.entries()) {
  const p = await b.newPage({viewport: {width: 390, height: 844}, deviceScaleFactor: 3}); await stableLocal(p);
  if (once) await p.route(/\/v3-app\/(ana-v3|liste-v2|detay-v2|ortak-kart)\.(html|js|css)(\?.*)?$/, async r => { const f = new URL(r.request().url()).pathname.split('/').pop(); await r.fulfill({body: fs.readFileSync(HERE + 'once/' + f), contentType: f.endsWith('.css') ? 'text/css' : f.endsWith('.js') ? 'text/javascript' : 'text/html'}); });
  await p.goto('http://127.0.0.1:8765/v3-app/' + url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
  let loc;
  if (typeof target === 'string') loc = p.locator(target).first();
  else { for (let pg = 1; pg <= 4; pg++) { const c = p.locator(target.sel, {hasText: target.text}); if (await c.count()) { loc = c.first().locator(target.media); break; } await p.evaluate(pg => document.querySelector(`[data-page-number="${pg + 1}"]`)?.click(), pg); await p.waitForTimeout(1200); } }
  await loc.evaluate(e => e.scrollIntoView({block: 'center', behavior: 'instant'})); await p.waitForTimeout(900);
  const f = `${OUT}${once ? 'once' : 'sonra'}-${i}.png`; await loc.screenshot({path: f}); files.push({once, i, label, f});
  await p.close();
}
// Pano: satır = yüzey, sütun = önce / sonra.
const img = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
const rows = SHOTS.map((s, i) => `<tr><th>${s[2]}</th>${[true, false].map(o => `<td><img src="${img(files.find(x => x.once === o && x.i === i).f)}"></td>`).join('')}</tr>`).join('');
const p = await b.newPage({viewport: {width: 1400, height: 900}});
await p.setContent(`<style>body{margin:0;padding:32px;font:15px/1.4 system-ui;background:#F9F9F9;color:#211E16}table{border-collapse:separate;border-spacing:24px 16px}th{text-align:left;font-weight:700;width:220px;vertical-align:middle}thead th{text-align:center}td img{display:block;width:420px;height:auto;max-height:520px;object-fit:contain;object-position:left top}</style><table><thead><tr><th></th><th>Önce (koyu cam rozet + kaydet karesi)</th><th>Sonra (üstte yumuşak koyu geçiş, zeminsiz)</th></tr></thead><tbody>${rows}</tbody></table>`);
await p.screenshot({path: OUT + '../p4-once-sonra.png', fullPage: true});
await b.close(); console.log('ok', files.length);
