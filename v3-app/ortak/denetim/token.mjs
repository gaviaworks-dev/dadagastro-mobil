// Ortak bileşen / token denetimi (Beyar düzeltmesi, 13 Ekim: “her şey ortak bileşen + token; sayfaya özel stil yasak — kalıcı denetim”).
// Kapsam: yeni modül dosyaları (varsayılan: ortak/sayfalar/dolaptan.*, dolabim.*; --dosya=a,b ile genişletilir).
//  CSS: (1) token dışı renk — #hex, rgb()/rgba()/hsl() ya da adlı renk (white/black/…); var(--x) ve color-mix(… var(--x) …) serbest.
//       (2) px/em/rem değer — boşluk (margin/padding/gap/inset/top/right/bottom/left), yazı (font-size/line-height/letter-spacing), radius,
//           gölge; yalnız var(--…), calc(var(--…) …), 0 ve 1px/2px çizgi (var(--border-width) tercih) serbest.
//       (3) font — font-family/font-weight literal (GilroyBd dışında aile, sayısal ağırlık); var(--…) serbest.
//       (4) sayfaya özel görsel stil — sayfa CSS'i yalnız YERLEŞİM yazar (display, grid/flex, gap/padding/margin token'la, konum, boyut, sıra,
//           görünürlük). color, background, border(-radius), box-shadow, font, text-shadow, opacity, filter gibi GÖRSEL özellik = ihlal
//           (görsel stil ortak bileşenden gelir).
//  JS: (5) satır içi style="…" içinde token dışı renk/px (background-image url ve --değişken atamaları serbest).
// Kullanım (proje kökünden): node v3-app/ortak/denetim/token.mjs [--dosya=ortak/sayfalar/x.css,…]  → ortak/denetim/token-rapor.json
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const arg = process.argv.find(a => a.startsWith('--dosya='))?.slice(8).split(',').filter(Boolean);
const DOSYA = arg || ['ortak/sayfalar/dolaptan.css', 'ortak/sayfalar/dolabim.css', 'ortak/sayfalar/dolaptan.js', 'ortak/sayfalar/dolabim.js'];
const GORSEL = /^(color|background(-color|-image)?|border(-(top|right|bottom|left))?(-color|-style|-width)?|border-radius|box-shadow|outline(-color)?|font(-family|-size|-weight|-style)?|line-height|letter-spacing|text-shadow|text-decoration(-color)?|opacity|filter|backdrop-filter|-webkit-backdrop-filter|fill|stroke|accent-color|caret-color)$/;
const BOSLUK = /^(margin|padding|gap|row-gap|column-gap|inset|top|right|bottom|left|margin-(top|right|bottom|left|inline|block)(-start|-end)?|padding-(top|right|bottom|left|inline|block)(-start|-end)?|font-size|line-height|letter-spacing|border-radius|box-shadow)$/;
const RENK = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\b(white|black|red|gray|grey|transparent)\b/i;
const OLCU = /(?<![\w-])-?\d*\.?\d+(px|em|rem)\b/;
const temizle = v => v.replace(/var\(--[\w-]+(,[^()]*(\([^()]*\))?[^()]*)?\)/g, 'VAR');   // var(--x[, fallback]) → VAR
const ihlal = [];
for (const f of DOSYA) {
  const p = path.join(V3, f); if (!fs.existsSync(p)) continue;
  const metin = fs.readFileSync(p, 'utf8');
  if (f.endsWith('.css')) {
    const css = metin.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '));
    const re = /([^{}]+)\{([^{}]*)\}/g; let m;
    while ((m = re.exec(css))) {
      const sec = m[1].trim(), satir = css.slice(0, m.index).split('\n').length + m[1].split('\n').length - 1;
      if (sec.startsWith('@')) continue;
      for (const d of m[2].split(';')) {
        const i = d.indexOf(':'); if (i < 0) continue;
        const ozel = d.slice(0, i).trim().toLowerCase(), deger = d.slice(i + 1).trim(); if (!ozel || ozel.startsWith('--')) continue;
        const t = temizle(deger);
        if (GORSEL.test(ozel) && !/^(transparent|none|0|inherit|currentColor)$/i.test(deger)) ihlal.push({dosya: f, satir, tur: 'sayfaya özel görsel stil', secici: sec.slice(0, 80), deger: `${ozel}:${deger}`.slice(0, 120)});
        else if (RENK.test(t) && !/^transparent$/i.test(deger)) ihlal.push({dosya: f, satir, tur: 'token dışı renk', secici: sec.slice(0, 80), deger: `${ozel}:${deger}`.slice(0, 120)});
        if (BOSLUK.test(ozel) && OLCU.test(t.replace(/\b[12]px\b(?=\s+(solid|dashed))/g, ''))) ihlal.push({dosya: f, satir, tur: 'token dışı ölçü (px/em)', secici: sec.slice(0, 80), deger: `${ozel}:${deger}`.slice(0, 120)});
        if (/^font-(family|weight)$/.test(ozel) && !/^(VAR|GilroyBd,\s*VAR|inherit)$/.test(t.trim())) ihlal.push({dosya: f, satir, tur: 'token dışı font', secici: sec.slice(0, 80), deger: `${ozel}:${deger}`.slice(0, 120)});
      }
    }
  } else {
    const re = /style="([^"]*)"/g; let m;
    while ((m = re.exec(metin))) {
      const satir = metin.slice(0, m.index).split('\n').length;
      for (const d of m[1].split(';')) { const i = d.indexOf(':'); if (i < 0) continue; const ozel = d.slice(0, i).trim(), deger = d.slice(i + 1).trim();
        if (!ozel || ozel.startsWith('--') || ozel.startsWith('${') || /^background-image$/.test(ozel)) continue;
        const t = temizle(deger); if (RENK.test(t) || OLCU.test(t)) ihlal.push({dosya: f, satir, tur: 'satır içi token dışı değer', secici: 'style=""', deger: `${ozel}:${deger}`.slice(0, 120)}); }
    }
  }
}
fs.writeFileSync(path.join(HERE, 'token-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), dosya: DOSYA, ihlal}, null, 1));
const say = {}; ihlal.forEach(x => { say[x.tur] = (say[x.tur] || 0) + 1; });
console.log(`token/ortak bileşen denetimi · ${DOSYA.length} dosya · ihlal: ${ihlal.length}`, JSON.stringify(say));
for (const x of ihlal.slice(0, 60)) console.log(`  ${x.dosya}:${x.satir}  [${x.tur}]  ${x.secici}  →  ${x.deger}`);
process.exitCode = ihlal.length ? 1 : 0;
