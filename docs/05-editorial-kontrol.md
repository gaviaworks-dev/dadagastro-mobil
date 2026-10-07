# Editoryal v2 — 7 Ekim 2026

v1 dosyaları, fontlar ve belgeler `v1/` altına kopyalandı. Kopyalama sonrası kaynak dosyalarla byte karşılaştırması geçti. `tokens.css` değiştirilmedi; v1 ile birebir. Laravel deposunda yazma yapılmadı; git add/commit/push yok.

## Ekran başına iki tur

- Ana Sayfa: `v2-home-pass1.png` incelendi. Eleştiri: hero metni ve mini dolap fazla düzenli/kutu gibi. İkinci tur: tarif alt başlığı, gerçek değerlendirme/görüntülenme sayısı, daha karakterli malzeme seçimi. Son görüntü `v2-home-final.png`; mini dolap `v2-home-pantry-final.png`.
- Tarif Listesi: `v2-list-pass1.png`, `v2-list-grid-pass1.png` incelendi. Eleştiri: meta yazısı küçük, alt satırlar fazla çizgili. İkinci tur: daha okunaklı meta ve başlık, ayracın kaldırılması, daha sakin kart altı. Son görüntüler `v2-list-final.png`, `v2-list-grid-final.png`.
- Tarif Detay: `v2-detail-pass1.png`, `v2-detail-body-pass1.png` incelendi. Eleştiri: üst kadrajda boşluk fazla, sheet başlangıcı ilk ekranda görünmüyor. İkinci tur: yakın kadraj, daha yüksek sheet, belirgin tamamlanan malzeme. Son görüntüler `v2-detail-final.png`, `v2-detail-ingredients-final.png`, `v2-detail-steps-final.png`.
- Üç ekran birlikte: `v2-onizleme-final.png`.

## Gerçek tarayıcı kontrolleri

Chromium: üç ekranın 390px ve 320px genişliklerinde yatay taşma yok. Önizlemedeki üç iframe 390×844. JS çalışma hatası 0. `node --check app.js` geçti.

Carousel kontrolü, mini dolap → malzeme filtreli liste, filtre/list-grid durumunun korunması, boş sonuçtan temizleme ile dokuz tarife dönüş, kaydetmenin yeniden yüklemede korunması, sheet Escape ve dört yükleme iskeleti doğrulandı.

Detayda alt menü yok. Porsiyon 4→6, tavuk 500→750 g; malzeme ilerlemesi 1/9 ve tümü hazır doğrulandı. Zamanlayıcı 08:00→07:59, duraklat ve sıfırla geçti. Paylaşım gerçek tarif URL'sini panoya kopyalıyor. Scroll ile başlık üst bara geçiyor. Reduced-motion açıkken parallax transform ve giriş animasyonları yok.

Sosyal veri: Tavuk Curry için 172, canlı sitede görüntülenme sayısıdır; “kişi denedi” şeklinde yeniden etiketlenmedi. Maliyet göstergeleri kaynak kartların gerçek rc-on değerlerinden alındı. Kaydet cihazda tutulur; canlıya veri yazılmaz. Zamanlayıcı bu açık sayfaya aittir, uygulama kapalıyken işletim sistemi alarmı olduğu iddia edilmez.
