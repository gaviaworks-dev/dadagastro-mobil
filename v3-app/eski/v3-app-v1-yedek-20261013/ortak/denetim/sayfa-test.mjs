// Sayfa duman testi: JS/konsol hatası, HTTP ≥400, yatay taşma; ekran görüntüsü (390×844).
// Kullanım (proje kökünden): node v3-app/ortak/denetim/sayfa-test.mjs <çıktı-klasörü> <v3-app'e göre adres> [adres …]
//   TAM=1 → tam sayfa görüntü. Örnek: node v3-app/ortak/denetim/sayfa-test.mjs /tmp/x uygulama/giris.html "uygulama/giris.html?durum=hata-form"
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const [out, ...urls] = process.argv.slice(2);
fs.mkdirSync(out, {recursive: true});
const b = await chromium.launch(); let kotu = 0;
for (const u of urls) {
  const c = await b.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 1});
  const p = await c.newPage(); await stableLocal(p);
  const errs = []; p.on('pageerror', e => errs.push('JS ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('konsol ' + m.text()); }); p.on('response', r => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
  await p.goto('http://127.0.0.1:8765/v3-app/' + u, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const ow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const name = u.replace(/[^a-z0-9]+/gi, '_').slice(0, 70);
  await p.screenshot({path: `${out}/${name}.png`, fullPage: process.env.TAM === '1'});
  if (errs.length || ow > 0) kotu++;
  console.log(u, errs.length ? 'HATA: ' + errs.join(' | ') : 'ok', ow > 0 ? 'TAŞMA ' + ow + 'px' : '', '→', `${out}/${name}.png`);
  await c.close();
}
await b.close(); process.exit(kotu ? 1 : 0);
