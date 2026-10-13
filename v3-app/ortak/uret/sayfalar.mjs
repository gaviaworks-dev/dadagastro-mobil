// Uygulama sayfalarının HTML iskeletlerini ortak/veri/sayfalar.js listesinden üretir (v3-app/uygulama/*.html).
// Her iskelet aynı kabuk: token + köprü + bileşen CSS'i, veri, çekirdek (dg-ui), ortak kart ve menü, sayfanın çizim dosyası.
// Ayrıca: uygulama/index.html (açılış yönlendiricisi), sifirla.html, manifest; v3-app kökünde eski runtime hedefleri için
// yönlendirme dosyaları (index.html, tarifler.html, tarif-detay.html). Yerel CSS/JS bağlantıları ?v=<SHA-256 ilk 10> alır.
// Çalıştır: node v3-app/ortak/uret/sayfalar.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const GRUPLAR = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const v = f => crypto.createHash('sha256').update(fs.readFileSync(path.join(V3, f))).digest('hex').slice(0, 10);
const ref = f => `../${f}?v=${v(f)}`;
// Açılış zemini: splash'ın koyu tabanı (tokens.json overlay.base) — yönlendirme anında primary parlaması olmasın.
const TJ = JSON.parse(fs.readFileSync(path.join(V3, 'ortak/tokens.json'), 'utf8'));
const KOYU = TJ.overlay.base;
const CSS = ['tokens.css', 'ortak/dg-tokens.css', 'ortak/dg-kopru.css', 'assets/fontawesome/css/all.min.css', 'ortak-kart.css', 'ortak-baslik.css', 'ortak-menu.css', 'ortak/dg-kontrol.css', 'ortak/dg-bilesen.css', 'ortak/dg-sahne.css', 'ortak/dg-not.css', 'ortak/dg-parcali.css', 'ortak/dg-sef-karti.css', 'ortak/dg-sayac.css', 'ortak/dg-takvim.css', 'ortak/dg-bayrak.css', 'ortak/dg-yorum.css', 'ortak/dg-hareket.css'];
const ICERIK = new Set(['yasal', 'icerik', 'ayarlar', 'acilis']);
const head = (baslik, ek = '') => `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#DC3D17"><meta name="robots" content="noindex,nofollow"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><title>${baslik} · DadaGastro</title><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="../assets/marka/dadagastro-renkli.svg"><link rel="apple-touch-icon" href="ikon/ikon-yer-tutucu.svg">${ek}`;
let n = 0;
fs.mkdirSync(path.join(V3, 'uygulama'), {recursive: true});
for (const g of GRUPLAR) for (const s of g.sayfalar) {
  // Sorgu parametreli satırlar (ör. puf.html?gorunum=…) aynı sayfanın görünümleridir: dosyayı temel satır üretir.
  if (s.kok || !s.dosya.startsWith('uygulama/') || s.dosya.includes('?')) continue;
  const js = ['ortak/dg-tokens.js', 'ortak/veri/veri.js', 'ortak/veri/ulkeler.js', 'ortak/veri/rozetler.js', 'ortak/veri/ornek-uye.js', 'ortak/veri/ornek-sef.js', 'ortak/veri/modlar.js', ...(ICERIK.has(s.js) ? ['ortak/veri/icerik.js'] : []), 'ortak/dg-sef-karti.js', 'ortak/dg-ui.js', 'ortak/dg-takvim.js', 'ortak/dg-metin.js', 'ortak-kart.js', 'ortak-menu.js', ...(['dolap', 'dolabim', 'dolaptan'].includes(s.js) ? ['ortak/dg-dolap.js'] : []), ...(s.js === 'dolabim' ? ['ortak/dg-dolabim.js'] : []), `ortak/sayfalar/${s.js}.js`];
  const eksik = js.filter(f => !fs.existsSync(path.join(V3, f)));
  if (eksik.length) { console.log('atlandı (henüz çizilmedi):', s.id, eksik.join(', ')); continue; }
  const grupCss = [...(['dolap', 'dolabim', 'dolaptan'].includes(s.js) ? ['ortak/dg-dolap.css'] : []), ...(fs.existsSync(path.join(V3, `ortak/sayfalar/${s.js}.css`)) ? [`ortak/sayfalar/${s.js}.css`] : [])];
  const html = head(s.ad, [...CSS, ...grupCss, 'ortak/dg-metin.css'].map(f => `<link rel="stylesheet" href="${ref(f)}">`).join('')) + `</head>\n<body class="dgu" data-sayfa="${s.id}"><div id="dgu"></div>${js.map(f => `<script src="${ref(f)}"></script>`).join('')}<script>DG.baslat()</script></body></html>\n`;
  fs.writeFileSync(path.join(V3, s.dosya), html); n++;
}
// Açılış yönlendiricisi: ilk açılışta açılış ekranı → karşılama; sonra doğrudan ana sayfa.
fs.writeFileSync(path.join(V3, 'uygulama/index.html'), head('Uygulama') + `<style>html,body{margin:0;background:${KOYU}}</style><script>try{location.replace(localStorage.getItem('dg-ilk')==='"tamam"'?'../ana-v3.html':'acilis.html')}catch(e){location.replace('acilis.html')}</script></head><body></body></html>\n`);
// Prototipi baştan başlat: yalnız bu prototipin anahtarları silinir.
fs.writeFileSync(path.join(V3, 'uygulama/sifirla.html'), head('Prototipi sıfırla') + `<script>try{Object.keys(localStorage).filter(k=>k.startsWith('dg-')||k.startsWith('dadagastro-')).forEach(k=>localStorage.removeItem(k));sessionStorage.clear()}catch(e){}location.replace('index.html')</script></head><body></body></html>\n`);
// Ana ekrana eklenebilir manifest. Uygulama ikonu marka sahibinden bekleniyor: yer tutucu (logosuz düz primary kare).
fs.writeFileSync(path.join(V3, 'uygulama/manifest.webmanifest'), JSON.stringify({name: 'DadaGastro', short_name: 'DadaGastro', lang: 'tr', start_url: 'index.html', scope: '../', display: 'standalone', orientation: 'portrait', background_color: KOYU, theme_color: '#DC3D17', icons: [{src: 'ikon/ikon-yer-tutucu.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable'}], description: 'DadaGastro mobil uygulama prototipi (uygulama ikonu marka sahibinden bekleniyor)'}, null, 1) + '\n');
fs.mkdirSync(path.join(V3, 'uygulama/ikon'), {recursive: true});
fs.writeFileSync(path.join(V3, 'uygulama/ikon/ikon-yer-tutucu.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Yer tutucu: uygulama ikonu ve monogram marka sahibinden bekleniyor (docs/50 §11.4). Logo içermez. --><rect width="512" height="512" fill="#DC3D17"/></svg>\n');
// Eski runtime hedefleri (Tabaktan Tarif ve kök runtime): v3-app kökünde yoktu, 404 veriyordu → v3 karşılıklarına yönlendir.
const yon = (dosya, hedef, aciklama) => fs.writeFileSync(path.join(V3, dosya), `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Yönlendiriliyor · DadaGastro</title><!-- ${aciklama} --><script>location.replace('${hedef}'+location.search+location.hash)</script></head><body></body></html>\n`);
yon('index.html', 'uygulama/index.html', 'Uygulama girişi; eski runtime "index.html" hedefleri buraya gelir (docs/52 §4).');
yon('tarifler.html', 'liste-v2.html', 'Eski runtime tarif listesi hedefi → liste-v2 (sorgu korunur).');
yon('tarif-detay.html', 'detay-v2.html', 'Eski runtime tarif detayı hedefi → detay-v2 (sorgu korunur).');
// Kök ekranlar ve V2 galerisi aynı önbellek damgasını alır (13 Ekim revize eki: eski dg-metin önbellekten gelip justify bozuluyordu).
// dg-baglanti.js'in sonradan yüklediği ortak dosyaların (dg-metin, şef kartı + verisi) birleşik özeti önce dg-baglanti'ye yazılır, sonra kök HTML'lerdeki bütün yerel CSS/JS ?v= ile damgalanır.
{
  const bp = path.join(V3, 'ortak/dg-baglanti.js'), b = fs.readFileSync(bp, 'utf8'), yeni = b.replace(/const METIN_V = '[^']*';/, `const METIN_V = '${crypto.createHash('sha256').update(['ortak/dg-metin.js', 'ortak/dg-sef-karti.js', 'ortak/dg-sef-karti.css', 'ortak/dg-sayac.css', 'ortak/veri/ornek-sef.js', 'ortak/veri/veri.js', 'ortak/dg-kontrol.css', 'ortak/dg-dolap.css', 'ortak/dg-dolap.js', 'ortak/dg-tokens.css', 'ortak/dg-kopru.css', 'ortak/dg-bilesen.css', 'ortak/dg-hareket.css', 'ortak/dg-sahne.css', 'ortak/dg-not.css', 'ortak/dg-parcali.css', 'ortak/veri/kok-durum.js', 'ortak/dg-dolabim.js'].map(f => fs.readFileSync(path.join(V3, f))).join('')).digest('hex').slice(0, 10)}';`);
  if (yeni !== b) fs.writeFileSync(bp, yeni);
  for (const sayfa of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html', 'tabaktan-taslak.html', 'ekranlar-v2.html', 'ekranlar-v4.html']) {
    const sp = path.join(V3, sayfa); if (!fs.existsSync(sp)) continue;
    const h = fs.readFileSync(sp, 'utf8'), d = h.replace(/(<(?:link|script)\b[^>]*?\b(?:href|src)=")([^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")/g, (all, bas, dosya, son) => /^[a-z]+:|^\/\//i.test(dosya) || !fs.existsSync(path.join(V3, dosya)) ? all : `${bas}${dosya}?v=${v(dosya)}${son}`);
    if (d !== h) fs.writeFileSync(sp, d);
  }
}
console.log('sayfa iskeleti:', n);
