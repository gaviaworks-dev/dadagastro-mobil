// Prototip verisini kök ekranların gerçek veri kümelerinden (DATA, WEB, PARITY, V3_KATEGORI_MEDIA, FLAG, canlı dolap kataloğu)
// tek dosyaya çıkarır: ortak/veri/veri.js (window.DGVERI). Uydurma veri eklemez. Çalıştır: node v3-app/ortak/uret/veri-cikar.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const b = await chromium.launch(); const p = await b.newPage(); await stableLocal(p);
await p.goto('http://127.0.0.1:8765/v3-app/ana-v3.html', {waitUntil: 'networkidle'});
const flagSrc = fs.readFileSync(path.join(V3, 'liste-v2.js'), 'utf8').match(/FLAG\s*=\s*(\{[^}]+\})/)[1];
const data = await p.evaluate(flagSrc => {
  const FLAG = Function('return ' + flagSrc)();
  const num = s => Number(String(s).replace(/\D/g, '')) || 0;
  const slug = s => s.toLocaleLowerCase('tr').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const media = window.V3_KATEGORI_MEDIA || {};
  const groups = PARITY.list.groups.map(g => ({key: g.key, label: g.label, options: g.options.map(o => { const m = o.label.match(/^(.*?)\s+([\d.]+)$/); return {value: o.value, label: m ? m[1] : o.label, count: m ? num(m[2]) : null}; })}));
  const kategoriler = WEB.categories.map(c => ({slug: slug(c.name), ad: c.name, sayi: num(c.count), gorsel: media[c.image] || c.image}));
  const mutfakGrup = groups.find(g => g.key === 'mutfak');
  const mutfaklar = (mutfakGrup?.options || []).map(o => { const k = o.value.replace(/-mutfagi$/, ''); return {slug: o.value, ad: o.label, sayi: o.count, bayrak: FLAG[k] ? `assets/flags/${FLAG[k]}.svg` : null}; });
  const sefMap = new Map();
  const tarifler = DATA.recipes.map(r => {
    const P = PARITY.recipes[r.slug] || {};
    const info = (P.chef?.info || '').split('\n').map(s => s.trim()).filter(Boolean);
    const meta = Object.fromEntries((P.chef?.meta || []).map(s => { const m = s.match(/^(\D+)([\d.]+)$/); return m ? [m[1], num(m[2])] : [s, null]; }));
    const yil = (info.find(s => /beri üye/.test(s)) || '').match(/\d{4}/)?.[0] || null;
    if (r.author && !sefMap.has(r.author)) sefMap.set(r.author, {kullanici: slug(r.author).replace(/-/g, '.'), ad: r.author, unvan: info[1] && !/beri üye/.test(info[1]) ? info[1] : null, tarif: meta.Tarif ?? null, takipci: meta['Takipçi'] ?? null, uyelikYili: yil});
    const [kisa, alt] = r.title.split('|').map(s => s.trim());
    return {slug: r.slug, baslik: r.title, kisa, alt: alt || null, gorsel: r.image, kategori: r.category, dakika: r.minutes, goruntulenme: r.views || 0, yazar: r.author || null, puan: r.rating ? Number(String(r.rating).replace(',', '.')) : null, puanSayisi: r.ratingCount || 0, zorluk: r.difficulty, porsiyon: r.servings, birim: r.unit, maliyet: r.cost, aciklama: r.description,
      malzemeler: (r.ingredients || []).map(i => typeof i === 'string' ? {ad: i} : {ad: i.name || i.ad || i.text || '', miktar: i.amount || i.miktar || '', birim: i.unit || '', grup: i.group || ''}),
      ozellikler: r.web?.features || [], tarih: P.dates?.[0] || null, besin: !!(P.nutrition && Object.keys(P.nutrition).length)};
  });
  for (const c of WEB.chefs) { const k = c.name; const e = sefMap.get(k) || {kullanici: slug(k).replace(/-/g, '.'), ad: k}; e.tarif = num(c.count) || e.tarif; e.oneCikan = true; sefMap.set(k, e); }
  return {kaynak: DATA.captured || null, istatistik: PARITY.list.stats, temalar: PARITY.list.themes.map(t => ({ad: t.label, sayi: num(t.count)})), populer: PARITY.list.popular.map(x => x.label), facetler: groups,
    tarifler, kategoriler, mutfaklar, sefler: [...sefMap.values()], videolar: WEB.videos.map(v => ({baslik: v.title, gorsel: v.image, sure: v.time, izlenme: v.views})),
    puflar: (HOME_MEDIA.tips || []).map(t => ({baslik: t.title, gorsel: t.image, okunma: num(t.reads), slug: (t.url || '').split('/').pop()})), gununTarifi: DATA.daySlug || null};
}, flagSrc);
await b.close();
const katalog = JSON.parse(fs.readFileSync(path.join(V3, 'docs/screenshots/ana-v3/dolap-katalog-canli.json'), 'utf8'));
data.dolapKatalog = katalog.gruplar.map(g => ({grup: g.grup, malzemeler: g.malzemeler}));
data.uretildi = 'ortak/uret/veri-cikar.mjs';
const out = '/* Üretildi: ortak/uret/veri-cikar.mjs — kök ekranların gerçek veri kümelerinden. Elle değiştirmeyin. */\nwindow.DGVERI=' + JSON.stringify(data) + ';\n';
fs.writeFileSync(path.join(V3, 'ortak/veri/veri.js'), out);
console.log('tarif', data.tarifler.length, 'kategori', data.kategoriler.length, 'mutfak', data.mutfaklar.length, 'şef', data.sefler.length, 'video', data.videolar.length, 'püf', data.puflar.length, 'katalog', data.dolapKatalog.length, (out.length / 1024).toFixed(0) + ' KB');
console.log(JSON.stringify(data.tarifler[0]).slice(0, 600)); console.log(JSON.stringify(data.sefler.slice(0, 3)));
