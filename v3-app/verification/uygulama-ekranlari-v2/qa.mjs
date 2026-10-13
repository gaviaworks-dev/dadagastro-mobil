// Yayın kopyası denetimi (yerel): galerideki bütün ekranlar × haller — 404 / başarısız istek, JS hatası, klasör dışına ya da
// olmayan dosyaya giden bağlantı; “Ana Sayfa” bağlantılarının (logo, alt menü, yan menü, giriş sonrası) tıklandığında gittiği
// gerçek hedef (yayın eşlemesi dahil) ana-v3.html olmalı, galeri (index.html) olmamalı.
// Kullanım (proje kökünden): node v3-app/verification/uygulama-ekranlari-v2/qa.mjs [taban]   (varsayılan yerel kopya)
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), YAYIN = path.resolve(HERE, '../../../yayin/uygulama-ekranlari-v2');
const TABAN = process.argv[2] || 'http://127.0.0.1:8765/yayin/uygulama-ekranlari-v2/';
const G = createRequire(import.meta.url)(path.join(YAYIN, 'ortak/veri/sayfalar.js'));
const U = new Set(['', 'uygulama/index.html']);
for (const g of G) for (const s of g.sayfalar) { const a = q => U.add(s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '')); a(''); (s.ikili || []).forEach(a); s.haller.forEach(([, q]) => a(q)); }
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 390, height: 844}});
const sorun = [], ana = {}; let say = 0;
const var_ = new Map(); const dosyaVar = async u => { const k = u.split('#')[0].split('?')[0]; if (!var_.has(k)) { try { var_.set(k, (await ctx.request.get(k)).status() < 400); } catch { var_.set(k, false); } } return var_.get(k); };
for (const u of U) {
  const p = await ctx.newPage(); const js = [], ag = [];
  p.on('pageerror', e => js.push(e.message)); p.on('response', r => { if (r.status() >= 400) ag.push(r.status() + ' ' + r.url()); }); p.on('requestfailed', r => { const n = r.failure()?.errorText || ''; if (!/google|facebook|youtube|vimeo/.test(r.url()) && !/ERR_ABORTED/.test(n)) ag.push('failed ' + n + ' ' + r.url()); });   // sayfa kapanırken iptal edilen istek hata değildir
  try { await p.goto(TABAN + u, {waitUntil: 'networkidle', timeout: 30000}); await p.waitForTimeout(400); } catch (e) { sorun.push([u, 'açılmadı']); await p.close(); continue; }
  say++;
  const linkler = await p.evaluate(() => [...document.querySelectorAll('a[href]')].filter(a => !a.closest('[inert],[hidden]')).map(a => ({h: a.getAttribute('href'), tam: a.href, ad: (a.getAttribute('aria-label') || a.textContent).trim().replace(/\s+/g, ' ').slice(0, 30)})));
  for (const l of linkler) {
    if (!l.tam.startsWith('http://127.0.0.1') && !l.tam.startsWith(TABAN)) continue;
    if (!l.tam.startsWith(TABAN)) sorun.push([u, 'klasör dışı: ' + l.ad + ' → ' + l.h]);
    else if (!(await dosyaVar(l.tam))) sorun.push([u, 'olmayan: ' + l.ad + ' → ' + l.h]);
  }
  // Ana Sayfa bağlantıları: tıklama anındaki son hedef (sayfa ve yayın eşlemeleri çalıştıktan sonra).
  const hedefler = await p.evaluate(() => new Promise(res => { const out = [];
    const adaylar = [...document.querySelectorAll('a')].filter(a => /^(Ana Sayfa|DadaGastro ana sayfa|Ana sayfa)$/i.test((a.getAttribute('aria-label') || a.textContent || '').trim()) && !a.closest('[inert]'));
    const yakala = e => { const a = e.target.closest('a'); if (a) { out.push(a.href); e.preventDefault(); e.stopImmediatePropagation(); } };
    addEventListener('click', yakala, true); // yayın eşlemesinden sonra kaydolur → onun ardından çalışır
    adaylar.forEach(a => a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true})));
    removeEventListener('click', yakala, true); res(out); }));
  for (const h of hedefler) { const k = h.replace(TABAN, ''); ana[k] = (ana[k] || 0) + 1; if (!/(^|\/)ana-v3\.html/.test(h)) sorun.push([u, 'Ana Sayfa → ' + k]); }
  if (js.length) sorun.push([u, 'JS: ' + js.join(' | ').slice(0, 200)]);
  if (ag.length) sorun.push([u, 'ağ: ' + [...new Set(ag)].slice(0, 4).join(' | ')]);
  await p.close();
}
// Yan menü (çekmece) satırları: bir kök ekran ve bir uygulama ekranında menü açılır, “Ana Sayfa” satırının hedefi.
for (const u of ['ana-v3.html', 'detay-v2.html', 'uygulama/profil.html', 'tabaktan-taslak.html']) {
  const p = await ctx.newPage(); await p.goto(TABAN + u, {waitUntil: 'networkidle'}); await p.waitForTimeout(300);
  const m = p.locator('[aria-label="Menü"]').first(); if (await m.count()) { await m.click(); await p.waitForTimeout(500); }
  const h = await p.evaluate(() => [...document.querySelectorAll('dialog[open] a, .site-drawer a, .om a')].filter(a => /Ana Sayfa/i.test(a.textContent)).map(a => a.href));
  for (const x of h) { const k = 'çekmece ' + x.replace(TABAN, ''); ana[k] = (ana[k] || 0) + 1; if (!/ana-v3\.html/.test(x)) sorun.push([u, 'çekmece Ana Sayfa → ' + x]); }
  await p.close();
}
await b.close();
fs.writeFileSync(path.join(HERE, 'qa-yerel.json'), JSON.stringify({sayfa: say, anaSayfaHedefleri: ana, sorun}, null, 1));
console.log('sayfa', say, '· sorun', sorun.length); console.log('Ana Sayfa hedefleri', ana); for (const s of sorun.slice(0, 40)) console.log(' ', s.join(' :: '));
