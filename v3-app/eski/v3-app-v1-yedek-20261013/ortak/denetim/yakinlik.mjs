// Metin–etkileşim yakınlık denetimi (Beyar, 12 Ekim; docs/55 §2l): açıklama metninin (p, yardım, meta) hemen altında duran etkileşimli
// öğe (düğme, bağlantı düğmesi, giriş alanı, çip, kart) arasındaki dikey boşluk kuraldan (16px) küçükse ihlaldir. Aynı bileşenin içi
// (düğme içindeki metin, alan etiketi → alan, kart içi) sayılmaz. Kullanım (proje kökünden): node v3-app/ortak/denetim/yakinlik.mjs [--ayrinti]
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const KURAL = 16;
const hedef = new Set();
for (const g of G) for (const s of g.sayfalar) { if (s.kok || /index|sifirla/.test(s.dosya)) continue; const ek = q => hedef.add(s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '')); if (s.ikili) s.ikili.forEach(ek); else ek(''); for (const [, q] of s.haller.slice(0, 4)) ek(q); }
const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 390, height: 844}});
const rapor = {}; let toplam = 0;
for (const u of hedef) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u + (u.includes('?') ? '&' : '?') + 'kal=1', {waitUntil: 'networkidle', timeout: 20000}); await p.waitForTimeout(250); } catch { await p.close(); continue; }
  const r = await p.evaluate(KURAL => {
    const ETK = 'button, a.dgu-btn, a.button, input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select, .dgu-girdi, .dgu-chip, .dgu-kart, .dgu-eylem, .dg-card, .dg-tile, .dg-feature, .dgu-secim-kart, .dgu-mod, .dgu-bayrak-oge, .dgu-seg, .dgu-ikili, .dgu-serit';
    const METIN = 'p:not(.t-label):not(.t-sub):not(.t-section), .dgu-yardim, small.t-meta, .t-meta:not(.t-label)';
    const gorunur = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
    const metinler = [...document.querySelectorAll(METIN)].filter(e => gorunur(e) && e.textContent.trim().length > 12 && !e.closest('button, a, label, .dgu-alan, .review, .reply, .dgu-yrm-giris, .dgu-kart, .dg-card, .dg-tile, .dg-feature, .dgu-eylem, .dgu-secim-kart, dialog:not([open]), [inert], .dgu-header, .dgu-nav, .dgu-bar, .dgu-snack'));
    const etkler = [...document.querySelectorAll(ETK)].filter(e => gorunur(e) && !e.closest('.dgu-header, .dgu-nav, .dgu-bar, .dgu-snack, dialog:not([open]), [inert]'));
    const ihlal = [];
    for (const m of metinler) {
      const a = m.getBoundingClientRect();
      // metnin hemen altındaki ilk etkileşimli öğe (yatay örtüşen, üstü metnin altında)
      let en = null, ara = 1e9;
      for (const e of etkler) { if (m.contains(e) || e.contains(m)) continue; const r = e.getBoundingClientRect(); if (r.top < a.bottom - 1 || r.right < a.left + 4 || r.left > a.right - 4) continue; const d = r.top - a.bottom; if (d < ara) { ara = d; en = e; } }
      if (!en) continue;
      // arada başka bir metin bloğu varsa en yakın komşu o metindir (sıradaki ölçümde)
      if (ara >= 0 && ara < KURAL - 0.5) ihlal.push({metin: m.textContent.trim().slice(0, 48), ogeler: (en.className || en.tagName).toString().slice(0, 40), bosluk: Math.round(ara)});
    }
    return ihlal;
  }, KURAL);
  if (r.length) { rapor[u] = r; toplam += r.length; }
  await p.close();
}
await b.close();
fs.writeFileSync(path.join(HERE, 'yakinlik-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), kural: KURAL, toplam, rapor}, null, 1));
if (process.argv.includes('--ayrinti')) for (const [u, l] of Object.entries(rapor)) for (const x of l) console.log(u.padEnd(48), String(x.bosluk).padStart(3) + 'px', '|', x.metin, '→', x.ogeler);
console.log('metin–etkileşim yakınlık ihlali:', toplam, '· sayfa:', Object.keys(rapor).length);
