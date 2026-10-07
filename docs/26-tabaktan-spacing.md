# Tabaktan Tarif spacing denetimi

360/390/430 × 14 durum = 42 tam boy görüntü. Chromium ve WebKit üzerinde yayın paketinde kamera → analiz → sonuç → gerçek tarif → geri → taslak → düzenle → kaydet → yayınlama → incelemede akışı ayrıca geçti (6 akış, konsol/HTTP/taşma hatası yok).

## Kök neden ve düzeltmeler

| Bulgu | Önce | Sonra |
|---|---|---|
| Kart + eşleşme satırı | Kart height:100% ile ebeveyni aşıyor | Ortak kart, doğal yükseklik ve flex kapsayıcı |
| Meta–şef |38,5px fazladan margin|0px margin +8px footer iç padding|
| Bölüm geçişi | Taşan kart 32px aralığı kaplıyor | Kart kapsayıcıda, gerçek bölüm aralığı32px |
| Başlık | Tipografi rolüyle yükseklik hesabı farklı | Rol satır yüksekliğinden iki satır40px; alt başlık4px sonra |
| Chip→buton / buton→not |16px /0px|16px /12px|
| Kaynak notu |15px gövde|13px meta, nötr soluk|
| Alt boşluk |104px kabuk +96px içerik =200px|Tek hesap93px:69px çubuk +8px alt kenar +16px; safe-area ayrıca|
| Canlı geliştirici notu |Görünür|Yalnız yerelde|
| Görüntülenme0 |Gösteriliyor|Gizli; pozitif gerçek değerler korunur|
| Hata ekranı |Görsel ve boş durum kartı bitişik|32px bölüm aralığı; ikinci gereksiz kart yüzeyi kaldırıldı|
| Düzenle fotoğraf→alan |Bitişik|16px|

## Ölçümler

| Genişlik | Kart yüksekliği önce → sonra | Bölüm | Chip→buton | Buton→not | Alt boşluk |
|360|399.80 → 365.47px|32px|16px|12px|93px|
|390|418.55 → 384.22px|32px|16px|12px|93px|
|430|443.55 → 409.22px|32px|16px|12px|93px|

## Durum matrisi

| Durum | Genişlik | Ölçülen komşu boşluklar | Taşma / JS hatası |
|---|---|---|---|
|kamera|360|16px|0 / 0|
|analiz|360|12px, 16px|0 / 0|
|sonuc|360|12px, 16px, 32px|0 / 0|
|taslak|360|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|duzenle|360|16px, 32px|0 / 0|
|eslesme-yok|360|12px|0 / 0|
|bulanik|360|12px|0 / 0|
|izin|360|12px|0 / 0|
|baglanti|360|12px|0 / 0|
|misafir|360|12px, 16px|0 / 0|
|deneme|360|16px|0 / 0|
|limit|360|16px|0 / 0|
|yayinlama|360|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|incelemede|360|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|kamera|390|16px|0 / 0|
|analiz|390|12px, 16px|0 / 0|
|sonuc|390|12px, 16px, 32px|0 / 0|
|taslak|390|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|duzenle|390|16px, 32px|0 / 0|
|eslesme-yok|390|12px|0 / 0|
|bulanik|390|12px|0 / 0|
|izin|390|12px|0 / 0|
|baglanti|390|12px|0 / 0|
|misafir|390|12px, 16px|0 / 0|
|deneme|390|16px|0 / 0|
|limit|390|16px|0 / 0|
|yayinlama|390|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|incelemede|390|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|kamera|430|16px|0 / 0|
|analiz|430|12px, 16px|0 / 0|
|sonuc|430|12px, 16px, 32px|0 / 0|
|taslak|430|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|duzenle|430|16px, 32px|0 / 0|
|eslesme-yok|430|12px|0 / 0|
|bulanik|430|12px|0 / 0|
|izin|430|12px|0 / 0|
|baglanti|430|12px|0 / 0|
|misafir|430|12px, 16px|0 / 0|
|deneme|430|16px|0 / 0|
|limit|430|16px|0 / 0|
|yayinlama|430|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|
|incelemede|430|İlgili akışta bu seçicilerden komşu blok yok|0 / 0|

Ölçümler gerçek komşu, aynı ebeveynli bloklarda yapılır; arada miktar/birim gridi bulunan iki form etiketi boşluk ölçümü olarak sayılmaz. İncelenen komşu akış kutularında negatif ya da8px altı ilişkisiz aralık yok. İç içe kapsayıcılar ve bilinçli fixed katmanlar kesişim hatası sayılmaz. Yeni margin/padding/gap değerleri mevcut spacing tokenlarından gelir; dinamik alt boşluk bileşen boyutlarının toplamıdır.

## Ortak bileşenler ve görsel inceleme

Kartlar card()/editorialHero(), chip .chip, buton .button, başlık prepareSectionHeadings(), alt çubuk .cook-bar, sheet ortak sheet() üzerinden kalır. Yeni kart/buton/sheet ailesi oluşturulmadı; recipe-match yalnız eşleşme açıklaması ile ortak kartı düzenler.

Tam boy önce/sonra: `screenshots/polish/spacing/{before,final}-{durum}-{360,390,430}.png`. Üç genişlikte temas tablaları ve sonuç/düzenle/taslak/hata tam boyları gözle incelendi. İlk turda görülen bitişik hata kartı ve form fotoğraf düğmesi ikinci turda düzeltildi. Yakın plan: `before-grid-clean-3x.png`, `final-grid-clean-3x.png`, `before-ingredients-3x.png`, `final-ingredients-3x.png` (aynı klasör). Sabit header/CTA yalnız bileşen kırpımlarında görünmez yapıldı; normal ekran görüntülerinde korunur.
