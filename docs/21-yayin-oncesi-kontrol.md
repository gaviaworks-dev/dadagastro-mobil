# Yayın öncesi kontrol

- 360, 390, 430: Ana Sayfa → Tarifler → tarif kartı → detay → Pişirme Modu → geri → Ana Sayfa, ayrıca filtre sheet’i.
- Paket testinde yatay taşma, JavaScript hatası, başarısız ağ isteği, HTTP hata yanıtı, yüklenmeyen görsel: 0. Gilroy yüklenmiş.
- Sticky panel 400/800px scroll’da: üst radius 0px, header ile aralık 0px, opak beyaz. Banner üzerindeyken 24px radius korunur.
- Detay alt çubuğu opak beyaz; alt safe-area boşluğunu beyaz kapatma; sayfa sonunda 96px + safe-area içerik payı. Üç genişlikte Pişirme Modu görünüm alanını kaplar.
- 129 bölüm başlığı ölçümü: kesişim 0; 320/360/375/390/430 ve önizleme iframe’i. Görünen metin/ikon taraması üç ekran + sonuç/taslak boyunca 700px adımlarla: kesişim 0 (kırpılan, kapalı ve fixed arkasında kalan metinler görünür metin sayılmadı).
- Hero en düşük kontrast: Ana 5,06:1; liste 10,97:1; detay 13,35:1 (390/430, en açık arka plan pikseli).
- Yayın paketinde Tabaktan Tarif dosyası/işleyicisi/bağlantısı yok. Orta menü kapsam dışı olduğundan Yakında bildirir.
- Paket üretiminde aynı görselin göreli ve mutlak URL’lerinin değiştirilme sırası hatası bulundu; uzun URL önce değiştirilerek düzeltildi. Paket tekrar test edildi.

Kanıt: `paket-qa.json`, `heading-matrix.json`, `collision-audit.json`, `hero-kontrast.json`; ekranlar `screenshots/yayin-kontrol/paket-*.png`.

## Yayına alınmayan açık konular

Tabaktan Tarif yalnız yerel/main tasarım simülasyonu. Kamera/AI/Pro kotası/özel kayıt/onay backend’i yok. Parite tablosunda gerçek örnekle doğrulanamayan iki koşullu alan (adım görseli/video ve ürün verili alışveriş eşleşmesi) ZAYIF olarak duruyor; doğrulanmış gibi sunulmadı. Kimlik gerektiren eylemler yerel prototip davranışıdır.
