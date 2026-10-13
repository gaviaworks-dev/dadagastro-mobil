# A birleşimi — 7 Ekim 2026

Eski hali bulundu ve birleşim geometrisi birebir geri alındı.
Kaynak: `../../archive/six-before-purpose-revision/six-heroes.css`, satır 16 ve 27.
Görsel kaynak: proje `docs/screenshots/v3-gallery-fix/a-390.png` (salt okunur incelendi).

Arşivde hero görselinin alt köşeleri kart tokenı 24px; beyaz devam düz, normal akışta ve üst içerik boşluğu 20px. Aynı kurallar yalnız `.hero-a` kapsamına uygulandı. Güncel hero yükseklikleri, görseller, metinler, araç ve Şefler korunuyor. A'nın üç yükseklik varyasyonu aynı kuralları alır. Galerinin yalnız A iframe adresleri yenilendi.

## Kontrol

- A, A uzun, A orta, A kısa × 360/390/430: 12 önce ve 12 sonra ekran görüntüsü.
- Tümünde banner altı = beyaz panel üstü; panel radius 0, hero alt radius 24px, içerik boşluğu 20px, üst sınır çizgisi 0.
- Yatay taşma 0. İlk scroll 0.
- Her A ekranında 0–400px / 20px kaydırmada görünür hero metni–header çakışması 0.
- Birleşimlerin tüm genişliklerde yakın görüntüsü `joins-all-widths.png`; kaydırma görünümü `scroll-widths.png`; ikisi de görsel olarak incelendi. Kırık kenar, beyaz/koyu sızıntı, kavisin altına giren içerik görülmedi.
- 1440px tam galeri görüntüsü incelendi. Dokuz iframe 390×844, scroll 0; alt menüler görünür.
- B–F kaynakları değiştirilmedi. Önce/sonra birleşim ölçümleri eşit. B/D/E/F PNG dosyaları birebir aynı; C PNG dosyası byte düzeyinde farklı, iki görüntü ayrıca incelendi, görünür düzen değişikliği yok.
- Kanıt `before.json` ve `after.json`. Bu kontrol Chromium'da yapıldı.

Yalnız v3-app yazıldı. Git add/commit/push yapılmadı.
