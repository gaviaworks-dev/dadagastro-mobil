// Stilsiz sınıf taraması (Beyar, 12 Ekim; docs/55 §2j): sayfada HTML'de kullanılan ama yüklenen hiçbir CSS kuralında geçmeyen sınıflar.
// Her grup bitince çalıştırılır; sonuç 0 olmadan grup “bitti” sayılmaz. Bilerek stilsiz kanca sınıfları (JS/test) KANCA listesindedir.
// Kullanım (proje kökünden): node v3-app/ortak/denetim/stilsiz.mjs [--ayrinti]   → ortak/denetim/stilsiz-rapor.json
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
// Yalnız davranış kancası olan, görünüm taşımayan sınıflar (stil gerektirmez): JS seçicileri ve erişilebilirlik işaretleri.
const KANCA = /^(js-|is-|has-|no-|photo$|dgu$|dg-veil-bottom$|dgu-app$|on$|active$|secili$)/;
const hedef = new Set(['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html']);
for (const g of G) for (const s of g.sayfalar) { if (/index|sifirla/.test(s.dosya)) continue; hedef.add(s.dosya); if (s.ikili) s.ikili.forEach(q => hedef.add(s.dosya + (s.dosya.includes('?') ? '&' : '?') + q)); for (const [, q] of s.haller) hedef.add(s.dosya + (s.dosya.includes('?') ? '&' : '?') + q); }
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 390, height: 844}});
const rapor = {}; const tum = new Map(); const kok = new Map();
// Kök ekranlar (docs/55 §2h: birebir korunur) runtime işaretlemesini taşır: ayrı listelenir, uygulama hedefine (0) sayılmaz.
const KOK = /^(ana-v3|liste-v2|detay-v2|tabaktan-tarif|tabaktan-taslak)\.html/; const JSK = new Map();
// Sınıf JS'te seçici olarak kullanılıyor mu (".ad", closest('.ad'), classList.…('ad'), class="… ad …" şablonda + seçici)
const kancaJs = (c, js) => { const e = c.replace(/[-]/g, '\\-'); return new RegExp(`\\.${e}(?![\\w-])`).test(js) || new RegExp(`classList\\.(?:add|remove|toggle|contains)\\([^)]*['"]${e}['"]`).test(js); };
for (const u of hedef) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u + (u.includes('?') ? '&' : '?') + 'kal=1', {waitUntil: 'networkidle', timeout: 20000}); await p.waitForTimeout(300); } catch { await p.close(); continue; }
  const r = await p.evaluate(() => {
    const css = new Set(), parca = new Set();
    const topla = rules => { for (const r of rules) { if (r.selectorText) { for (const m of r.selectorText.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) css.add(m[1]); for (const m of r.selectorText.matchAll(/\[class\*="?([\w-]+)"?\]/g)) parca.add(m[1]); } if (r.cssRules) topla(r.cssRules); } };
    for (const sh of document.styleSheets) { try { topla(sh.cssRules); } catch { /* çapraz köken */ } }
    const kul = new Set(); document.querySelectorAll('[class]').forEach(e => e.classList.forEach(c => kul.add(c)));
    return [...kul].filter(c => !css.has(c) && ![...parca].some(x => c.includes(x)));
  });
  // Davranış kancası: sayfanın yüklediği JS kaynaklarında seçici ya da sınıf adı olarak geçen sınıf stil gerektirmez.
  const jsler = await p.evaluate(() => [...document.scripts].map(s => s.src).filter(Boolean));
  let js = ''; for (const s of jsler) { if (!JSK.has(s)) { try { JSK.set(s, await (await fetch(s)).text()); } catch { JSK.set(s, ''); } } js += JSK.get(s); }
  const kancaMi = c => new RegExp(`[.'"\\s]${c.replace(/[-]/g, '\\-')}(?![\\w-])`).test(js) && /closest|querySelector|classList|matches/.test(js);
  const k = r.filter(c => !KANCA.test(c) && !kancaJs(c, js));
  if (k.length) { rapor[u] = k; const hed = KOK.test(u) ? kok : tum; k.forEach(c => hed.set(c, (hed.get(c) || new Set()).add(u.split('?')[0]))); }
  await p.close();
}
await b.close();
const liste = [...tum].map(([c, s]) => ({sinif: c, sayfa: [...s]})).sort((a, b) => a.sinif.localeCompare(b.sinif));
const kokListe = [...kok].map(([c, s]) => ({sinif: c, sayfa: [...s]}));
fs.writeFileSync(path.join(HERE, 'stilsiz-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), sayi: liste.length, liste, kokSayi: kokListe.length, kokListe, sayfaBasi: rapor}, null, 1));
if (process.argv.includes('--ayrinti')) for (const x of liste) console.log(x.sinif.padEnd(32), x.sayfa.slice(0, 4).join(', ') + (x.sayfa.length > 4 ? ` +${x.sayfa.length - 4}` : ''));
console.log('stilsiz sınıf (uygulama):', liste.length, '· kök ekran runtime sınıfı (ayrı, korunur):', kokListe.length);
