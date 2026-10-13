// Metin kanonu denetimi (docs/55 §2g): bütün sayfalarda metin taşıyan öğelerin hesaplanmış text-align değeri justify olmalı.
// Sağa hizalı sayı sütunları (right/end) ayrı listelenir. Kullanım (proje kökünden): node v3-app/ortak/denetim/metin.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const hedef = new Set(['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html']);
for (const g of G) for (const s of g.sayfalar) { if (/acilis|index|sifirla/.test(s.dosya)) continue; hedef.add(s.dosya); if (s.ikili) s.ikili.forEach(q => hedef.add(s.dosya + (s.dosya.includes('?') ? '&' : '?') + q)); }
const EXC = 'h1,h2,h3,h4,h5,h6,dt,th,legend,label,summary,strong,b,[class*=title],[class*=baslik]:not(.dgu-baslik):not([class*=baslik-]),[class*=__name],[class*=-name],.t-page,.t-section,.t-sub,.t-card,.t-featured,.t-display,.t-label,.t-sheet,.t-stat,.dgu-btn,.button,.dgu-chip,.dg-chip,.chip,.dgu-hbtn,.icon-button,.dgu-sef-ol,.dgu-kanal-metin small,.dgu-rozet-ad,.dgu-bayrak-metin b,.dgu-mod-ad span,.dgu-bolum-bas,.dgu-stats>span';
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 390, height: 844}});
let toplam = 0; const ozet = {};
for (const u of hedef) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u, {waitUntil: 'networkidle', timeout: 20000}); await p.waitForTimeout(300); } catch { await p.close(); continue; }
  const r = await p.evaluate(EXC => {
    const bad = {}, sag = {};
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const t = w.currentNode; if (!t.textContent.trim()) continue; const el = t.parentElement; if (!el || el.closest('script,style,svg,[hidden],[inert]')) continue; if (!el.getClientRects().length) continue;
      // dg-metin.css istisnası (başlık/ad/etiket/düğme/çip): bilerek start/center — uyumlu sayılır.
      if (el.closest(EXC)) continue;
      const ta = getComputedStyle(el).textAlign; const k = el.tagName.toLowerCase() + (el.classList[0] ? '.' + el.classList[0] : '');
      if (ta === 'justify') continue; if (ta === 'right' || ta === 'end') { sag[k] = (sag[k] || 0) + 1; continue; } bad[k + ' (' + ta + ')'] = (bad[k + ' (' + ta + ')'] || 0) + 1; }
    return {bad, sag};
  }, EXC);
  const n = Object.keys(r.bad).length; toplam += n; if (n) ozet[u] = r.bad;
  await p.close();
}
await b.close();
console.log(JSON.stringify(ozet, null, 1)); console.log('justify olmayan seçici sayısı:', toplam);
