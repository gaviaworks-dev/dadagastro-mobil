// Buton etiketi tek satır denetimi (Beyar değişmez kuralı, 13 Ekim): bütün ekranlar × hâllerde görünen her düğmenin (.dgu-btn, .button,
// .dgd-cta, sheet/eylem çubuğu düğmeleri) etiketi TEK SATIR olmalı; iki satıra kırılan = ihlal, “…” ile kesilen = uyarı (metin kısaltılmalı).
// Açık sheet'ler için galeri hâlleri yeterli değilse sayfadaki sheet açan düğmeler ayrıca denenmez (yalnız görünen düğmeler).
// Kullanım (proje kökünden): node v3-app/ortak/denetim/dugme.mjs [--haller] [--sayfa=a,b] [--genislik=360]  → ortak/denetim/dugme-rapor.json
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const haller = process.argv.includes('--haller'), W = +(process.argv.find(a => a.startsWith('--genislik='))?.split('=')[1] || 390);
const hedef = new Set(['ana-v3.html', 'liste-v2.html', 'detay-v2.html']);
for (const g of G) for (const s of g.sayfalar) { if (/(^|\/)index\.html|sifirla/.test(s.dosya)) continue; const a = q => hedef.add(s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '')); a(''); (s.ikili || []).forEach(a); if (haller) s.haller.forEach(([, q]) => a(q)); }
{ const f = process.argv.find(a => a.startsWith('--sayfa='))?.slice(8).split(',').filter(Boolean); if (f?.length) for (const u of [...hedef]) if (!f.some(x => u.includes(x))) hedef.delete(u); }
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: W, height: 844}});
const ihlal = [], uyari = [];
for (const u of hedef) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u + (u.includes('?') ? '&' : '?') + 'kal=1', {waitUntil: 'networkidle', timeout: 20000}); await p.waitForTimeout(400); } catch { await p.close(); continue; }
  const r = await p.evaluate(() => {
    const out = {kirik: [], kesik: []};
    for (const d of document.querySelectorAll('.dgu-btn, .button, .dgd-cta, .sheet-actions button, .sheet-actions a')) {
      if (!d.getClientRects().length || d.closest('[hidden],[inert],dialog:not([open])')) continue;
      const cs = getComputedStyle(d); if (cs.visibility === 'hidden') continue;
      const metin = d.innerText.replace(/­/g, '').replace(/\s+/g, ' ').trim(); if (!metin) continue;
      // Yalnız metin parçaları (ikon hariç); satır = dikeyde çakışmayan metin kutuları.
      const kutu = []; const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const t = w.currentNode; if (!t.nodeValue.trim() || t.parentElement.closest('.icon, i, svg')) continue; const rg = document.createRange(); rg.selectNodeContents(t); kutu.push(...[...rg.getClientRects()].filter(q => q.width > 1)); }
      const sat = []; for (const q of kutu.sort((a, b) => a.top - b.top)) { const s = sat.find(x => q.top < x.bottom - 2 && q.bottom > x.top + 2); if (s) { s.top = Math.min(s.top, q.top); s.bottom = Math.max(s.bottom, q.bottom); } else sat.push({top: q.top, bottom: q.bottom}); }
      const lab = d.querySelector('span') || d; 
      if (sat.length > 1) out.kirik.push(metin.slice(0, 50));
      else if (lab.scrollWidth > lab.clientWidth + 1) out.kesik.push(metin.slice(0, 50));
    }
    return out;
  });
  r.kirik.forEach(m => ihlal.push({sayfa: u, metin: m})); r.kesik.forEach(m => uyari.push({sayfa: u, metin: m}));
  await p.close();
}
await b.close();
fs.writeFileSync(path.join(HERE, 'dugme-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), genislik: W, sayfa: hedef.size, ihlal, uyari}, null, 1));
const tek = L => [...new Map(L.map(x => [x.metin, x])).values()];
console.log(`düğme tek satır · ${hedef.size} sayfa×hâl · ${W}px · iki satıra kırılan: ${ihlal.length} (benzersiz ${tek(ihlal).length}) · “…” ile kesilen (uyarı): ${uyari.length} (benzersiz ${tek(uyari).length})`);
for (const x of tek(ihlal).slice(0, 30)) console.log(`  [kırık] ${x.sayfa}  “${x.metin}”`);
for (const x of tek(uyari).slice(0, 30)) console.log(`  [kesik] ${x.sayfa}  “${x.metin}”`);
process.exitCode = ihlal.length ? 1 : 0;
