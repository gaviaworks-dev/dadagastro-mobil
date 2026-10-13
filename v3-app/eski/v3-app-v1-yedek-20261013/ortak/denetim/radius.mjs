// Radius denetimi (Beyar, 12 Ekim; docs/55 §2j) — YALNIZ RAPOR. Ortak katman (ortak/*.css, tokens) dışındaki sayfa CSS'leri ile
// HTML/JS'teki satır içi stillerde token yerine elle yazılmış border-radius değerlerini listeler; her birine karşılık gelen token'ı yazar.
// Kullanım (proje kökünden): node v3-app/ortak/denetim/radius.mjs   → ortak/denetim/radius-rapor.json + .md
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
// Etkin uygulama: kök ekranların yüklediği CSS'ler + grup sayfa CSS'leri; JS/HTML satır içi stiller.
const kokHtml = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html'];
const css = new Set();
for (const h of kokHtml) for (const m of fs.readFileSync(path.join(V3, h), 'utf8').matchAll(/href="([^"?]+\.css)/g)) if (!/^ortak\/|fontawesome|^tokens\.css$/.test(m[1])) css.add(m[1]);
for (const f of fs.readdirSync(path.join(V3, 'ortak/sayfalar'))) if (f.endsWith('.css')) css.add('ortak/sayfalar/' + f);
const js = [...kokHtml, ...fs.readdirSync(path.join(V3, 'ortak/sayfalar')).filter(f => f.endsWith('.js')).map(f => 'ortak/sayfalar/' + f), 'ana-v3.js', 'liste-v2.js', 'detay-v2.js', 'ortak-kart.js', 'ortak-menu.js'];
const TOKEN = {'0': '--dg-radius-none (0)', '0px': '--dg-radius-none (0)', '2px': '--dg-radius-dot (2)', '4px': '--radius-choice (4)', '6px': '--dg-radius-badge-sm (6, 20–24 rozet)', '8px': '--dg-radius-chip-sm (8, 32–36 çip)', '12px': '--radius-control (12)', '16px': '--dg-radius-media (16, fotoğraflı kart)', '24px': '--radius-card / --radius-sheet (24)', '50%': '--radius-avatar (50%, yalnız avatar)', '999px': 'kanon dışı (hap) → --radius-control (12) ya da küçük kademe', '9999px': 'kanon dışı (hap) → --radius-control (12) ya da küçük kademe', '100px': 'kanon dışı (hap) → --radius-control (12)'};
const oner = v => TOKEN[v] || (v.includes('var(') ? null : `kanon dışı (${v}) → en yakın: ${[[2, '--dg-radius-dot'], [4, '--radius-choice'], [6, '--dg-radius-badge-sm'], [8, '--dg-radius-chip-sm'], [12, '--radius-control'], [16, '--dg-radius-media'], [24, '--radius-card']].sort((a, b) => Math.abs(a[0] - parseFloat(v)) - Math.abs(b[0] - parseFloat(v)))[0][1]}`);
const bul = [];
const tara = (dosya, metin, tur) => metin.split('\n').forEach((l, i) => {
  for (const m of l.matchAll(/border-(?:top-left-|top-right-|bottom-left-|bottom-right-)?radius\s*:\s*([^;}"'`]+)/g)) {
    const deger = m[1].replace(/!important/, '').trim();
    // var(...) çıkarılınca kalan sayısal değer (px, %, çıplak sayı ≠ 0) elle yazılmıştır; calc(var(a) − var(b)) gibi token türevleri uyumludur.
    let kalan = deger; while (/var\([^()]*(\([^()]*\))*[^()]*\)/.test(kalan)) kalan = kalan.replace(/var\([^()]*(\([^()]*\))*[^()]*\)/g, '');
    const elle = [...kalan.matchAll(/(-?\d*\.?\d+)(px|%|rem|em)?/g)].map(m => m[0]).filter(v => !/^0(px)?$/.test(v) && !/^-?\d*\.?\d+$/.test(v.replace(/(px|%|rem|em)$/, '')) || /(px|%|rem|em)$/.test(v)).filter(v => !/^0(px|%)?$/.test(v));
    if (!elle.length) continue;
    bul.push({dosya, satir: i + 1, tur, deger, oneri: [...new Set(elle.map(oner).filter(Boolean))].join(' · ')});
  }
});
for (const f of css) { const p = path.join(V3, f); if (fs.existsSync(p)) tara(f, fs.readFileSync(p, 'utf8'), 'css'); }
for (const f of js) { const p = path.join(V3, f); if (!fs.existsSync(p)) continue; const t = fs.readFileSync(p, 'utf8'); const satirlar = t.split('\n').map(l => /style=|\.style\.|cssText/.test(l) ? l : '').join('\n'); tara(f, satirlar, 'satır içi'); }
fs.writeFileSync(path.join(HERE, 'radius-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), sayi: bul.length, bul}, null, 1));
const md = ['# Radius denetimi — elle yazılmış border-radius (yalnız rapor)', '', `Tarih: ${new Date().toISOString().slice(0, 10)} · toplam **${bul.length}** (CSS: ${bul.filter(b => b.tur === 'css').length}, satır içi: ${bul.filter(b => b.tur !== 'css').length})`, '', '| Dosya:satır | Tür | Yazılan | Karşılık gelen token |', '|---|---|---|---|', ...bul.map(b => `| \`${b.dosya}:${b.satir}\` | ${b.tur} | \`${b.deger}\` | ${b.oneri} |`)];
fs.writeFileSync(path.join(HERE, 'radius-rapor.md'), md.join('\n') + '\n');
const ozet = {}; for (const b of bul) ozet[b.dosya] = (ozet[b.dosya] || 0) + 1;
console.log(JSON.stringify(ozet, null, 1)); console.log('elle radius:', bul.length);
