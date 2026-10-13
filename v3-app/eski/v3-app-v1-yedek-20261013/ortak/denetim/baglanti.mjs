// Bağlantı denetimi (docs/53 §1.5 kapı 4): ortak/veri/sayfalar.js'teki bütün sayfalar × halleri gezilir.
// Rapor: ölü bağlantı (boş href, "#", 404 dönen yerel dosya), işleyicisi görünmeyen düğme adayı, JS hatası. Yayın öncesi 0 olmalı.
// Kullanım (proje kökünden): node v3-app/ortak/denetim/baglanti.mjs [--haller]   → ortak/denetim/baglanti-rapor.json
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const ROOT = 'http://127.0.0.1:8765/v3-app/';
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const haller = process.argv.includes('--haller');
const hedefler = [];
for (const g of G) for (const s of g.sayfalar) { hedefler.push(s.dosya); if (haller) for (const [, q] of s.haller) hedefler.push(s.dosya + (s.dosya.includes('?') ? '&' : '?') + q); }
const b = await chromium.launch();
const ctx = await b.newContext({viewport: {width: 390, height: 844}});
const varMi = new Map();
async function dosyaVar(u) {
  const p = new URL(u); p.search = ''; p.hash = '';
  const k = p.href; if (varMi.has(k)) return varMi.get(k);
  let ok = false; try { const r = await ctx.request.get(k); ok = r.status() < 400; } catch { ok = false; }
  varMi.set(k, ok); return ok;
}
const rapor = [];
for (const h of hedefler) {
  const p = await ctx.newPage(); await stableLocal(p);
  const js = []; p.on('pageerror', e => js.push(e.message));
  try { await p.goto(ROOT + h, {waitUntil: 'networkidle', timeout: 30000}); await p.waitForTimeout(400); } catch (e) { rapor.push({sayfa: h, hata: 'açılmadı: ' + e.message.split('\n')[0]}); await p.close(); continue; }
  if (/acilis\.html|index\.html|sifirla/.test(h)) { await p.close(); continue; }
  const veri = await p.evaluate(() => {
    const ac = el => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const linkler = [...document.querySelectorAll('a')].filter(a => !a.closest('[inert],[hidden]')).map(a => ({href: a.getAttribute('href'), tam: a.href, ad: ac(a)}));
    const dugmeler = [...document.querySelectorAll('button')].filter(x => !x.closest('[inert],[hidden],dialog:not([open])') && x.getBoundingClientRect().width)
      .filter(x => !x.type || x.type === 'button').filter(x => ![...x.attributes].some(a => a.name.startsWith('data-') || ['aria-controls', 'aria-pressed', 'aria-selected', 'aria-expanded', 'onclick', 'form'].includes(a.name)) && !x.closest('[data-seg],[role=tablist],[role=radiogroup],.om,form,[data-k],[data-tekrar]')).map(x => ac(x));
    return {linkler, dugmeler};
  });
  const olu = [];
  for (const l of veri.linkler) {
    if (l.href === null || l.href === '' || l.href === '#') { olu.push(l.ad + ' → (boş)'); continue; }
    if (/^(mailto|tel|javascript):|^#./.test(l.href)) continue;
    if (!l.tam.startsWith('http://127.0.0.1')) continue;
    if (!(await dosyaVar(l.tam))) olu.push(l.ad + ' → ' + l.href);
  }
  rapor.push({sayfa: h, oluBaglanti: [...new Set(olu)], baglanmamisDugmeAdayi: [...new Set(veri.dugmeler)], js});
  await p.close();
}
await b.close();
const toplam = rapor.reduce((a, r) => a + (r.oluBaglanti?.length || 0) + (r.js?.length || 0) + (r.hata ? 1 : 0), 0);
fs.writeFileSync(path.join(HERE, 'baglanti-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), sayfa: hedefler.length, sorun: toplam, rapor}, null, 1));
for (const r of rapor) if (r.hata || r.oluBaglanti?.length || r.js?.length || r.baglanmamisDugmeAdayi?.length) console.log(r.sayfa, JSON.stringify({olu: r.oluBaglanti, dugme: r.baglanmamisDugmeAdayi, js: r.js, hata: r.hata}));
console.log('sayfa:', hedefler.length, '· ölü bağlantı + JS hatası:', toplam);
