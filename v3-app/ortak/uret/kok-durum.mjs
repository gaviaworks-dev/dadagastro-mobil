// Kök ekran hâlleri için ortak bileşen anlık görüntüsü (Beyar V4 madde F, kapsam): kök ekranlar (ana-v3, liste-v2, detay-v2) dg-ui.js
// yüklemez; yükleniyor / hata / çevrimdışı / liste sonu / yükleme hatası işaretlemesi uygulamadaki ortak bileşenlerin (DG.hata,
// DG.iskelet, DG liste hâlleri) ÇIKTISIDIR — kopya işaretleme yazılmaz. Bağlantılar köke göre düzeltilir. dg-baglanti.js bunu kullanır,
// stil @scope (.dgk-durum) ile uygulama bileşen stillerinden gelir. Kullanım (proje kökünden, yerel sunucu açıkken):
//   node v3-app/ortak/uret/kok-durum.mjs  → ortak/veri/kok-durum.js   (ortak bileşen değişince yeniden çalıştırılır)
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 390, height: 844}});
await p.goto('http://127.0.0.1:8765/v3-app/uygulama/bilesenler.html', {waitUntil: 'networkidle'});
const R = await p.evaluate(() => {
  const ic = (n) => DG.ic(n);
  return {
    hata: DG.hata('sunucu', true),
    baglanti: DG.hata('baglanti-yok', true),
    serit: `<div class="dgu-cevrimdisi" role="status">${ic(DG.I('offline'))}<span>Çevrimdışısın · kayıtlı içerik gösteriliyor</span></div>`,
    iskeletDetay: DG.iskelet(3, 'detay'),
    iskeletKart: DG.iskelet(4, 'kart'),
    altYukleniyor: '<div class="dgu-alt-yukleniyor" role="status" aria-label="Daha fazla yükleniyor"><i></i><i></i><i></i></div>',
    listeSon: `<p class="dgu-liste-son" role="status">${ic('circle-check')}<span>Hepsi bu kadar — {n} sonuç gösterildi</span></p>`,
    listeHata: `<div class="dgu-liste-hata" role="alert">${ic(DG.I('error'))}<span>Daha fazlası yüklenemedi</span>${DG.btn('Tekrar dene', {tur: 'metin', ikon: 'rotate-right', attrs: 'data-liste-tekrar'})}</div>`,
    yenile: `<div class="dgu-yenile is-gorunur is-donuyor" role="status" aria-label="Yenileniyor" style="--dgu-cek:64px">${ic('rotate-right')}</div>`
  };
});
await b.close();
// Bağlantılar: uygulama sayfası (uygulama/) göreli yollar → kök göreli.
const kok = h => h.replace(/href="(?!https?:|#|mailto:)(\.\.\/)?([^"]*)"/g, (m, ust, yol) => `href="${ust ? '' : 'uygulama/'}${yol}"`);
for (const k of Object.keys(R)) R[k] = kok(R[k]);
fs.writeFileSync(path.join(V3, 'ortak/veri/kok-durum.js'), `/* Üretildi: ortak/uret/kok-durum.mjs — uygulama ortak bileşenlerinin (DG.hata, DG.iskelet, liste hâlleri) çıktısı; kök ekran hâlleri için.\n   Elle değiştirmeyin. */\nwindow.DGKOKDURUM = ${JSON.stringify(R)};\n`);
console.log('kok-durum:', Object.keys(R).join(', '));
