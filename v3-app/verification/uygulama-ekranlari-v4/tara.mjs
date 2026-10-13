// Yayın bağımlılık taraması (galeri yayını, 12 Ekim): galerideki bütün ekranlar × halleri gezilir; v3-app altından istenen
// bütün dosyalar listelenir (build.py bunu statik taramayla birleştirir). Kullanım (proje kökünden):
//   node v3-app/verification/uygulama-ekranlari-v4/tara.mjs  → istekler.json
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const U = new Set(['ekranlar-v4.html', 'uygulama/index.html', 'uygulama/acilis.html']);
for (const g of G) for (const s of g.sayfalar) { const a = q => U.add(s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '')); a(''); (s.ikili || []).forEach(a); s.haller.forEach(([, q]) => a(q)); }
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 390, height: 844}});
const istek = new Set(), hata = [];
ctx.on('request', r => { const u = new URL(r.url()); if (u.host === '127.0.0.1:8765' && u.pathname.startsWith('/v3-app/')) istek.add(decodeURIComponent(u.pathname.slice(8))); });
ctx.on('response', r => { if (r.status() >= 400 && r.url().includes('127.0.0.1:8765')) hata.push(r.status() + ' ' + r.url()); });
for (const u of U) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u, {waitUntil: 'networkidle', timeout: 30000}); await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } }); await p.waitForTimeout(300); } catch (e) { hata.push('açılmadı ' + u); }
  await p.close();
}
await b.close();
fs.writeFileSync(path.join(HERE, 'istekler.json'), JSON.stringify({sayfa: U.size, dosya: [...istek].sort(), hata}, null, 1));
console.log('sayfa', U.size, 'dosya', istek.size, 'hata', hata.length, hata.slice(0, 10));
