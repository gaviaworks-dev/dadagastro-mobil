# Yayın öncesi son kontrol

## Ortak panel ve alt menü

| Ekran | Üst radius | Bindirme | Üst iç boşluk | Alt kontrol |
|---|---:|---:|---:|---|
| Ana Sayfa | 24px | 24px | 16px | 64px bar |
| Tarif Listesi | 24px | 24px | 16px | 64px bar |
| Tarif Detay | 24px | 24px | 16px | 52px CTA |

Alt menü önce86px, sonra64px; dış yan16px, alt8px, 358px genişlik. İkon22px (ortadaki20px), etiket10px; orta buton48px. iOS49pt referans kırpımı yalnız karşılaştırmadır; iOS sistem arayüzü kopyalanmamıştır. Hero706.89px; Kategoriler başlığının altı745.28px: 844px ilk ekranda görünür. Liste banner son metni-panel arası24px, arama iç aralıkları16/12/16px. Header her üç ekranda scroll0 alfa0, scroll300 rgb(225,72,39).

## Overlay kaynak aktarımı

Salt okunur kaynak `resources/css/portal.css:948,957–970`; ana sayfa gradient üçlüsü tokens.css --web-hero-overlay içine aynen aktarılmıştır. Yeni üretilen primary karışımı kaldırıldı; koyu zemin #211E16. Detay/liste/kartlar kaynak rgba(20,18,12,.20/.72) renklerini mevcut alt bölge geometrisinde kullanır; böylece detayın temiz üst fotoğrafı korunur. Bu alanların durak konumları mobil geometriye bağlıdır, weble aynı kompozisyon olduğu iddia edilmez.

Canlı-kaynak farkı: canlı radial turuncu220,61,23; yerel kaynak225,72,39. Canlı başlık vurgusu rgb(232,127,102), kaynak #ff7a5c. İstenen görünüm için başlıkta canlı vurgu kullanıldı; marka ana tokenı değişmedi. Hesaplanan stiller `screenshots/polish/web-hero-stilleri.json` içinde.

## Önce/sonra kanıtı

| Madde | Durum | Kırpım (screenshots/polish altında) |
|---|---|---|
| 1.1 Sekmeler | Yapıldı | arama-sekme-once/sonra-3x.png; bilgi-sekme-once/sonra-3x.png |
| 1.2 Avatar | Yapıldı | kart-avatar-once/sonra-3x.png |
| 1.3 Kaydet | Yapıldı | kaydet-kart-once/sonra-3x.png |
| 1.4 Kart | Yapıldı | grid-kart-once/sonra-3x.png |
| 1.5 Alt menü | Yapıldı; son ölçü64px | alt-menu-yayin-oncesi/yayin-sonrasi-3x.png |
| 1.6 Detay | Yapıldı | ozet-once/sonra-3x.png; porsiyon-once/sonra-3x.png |
| 1.7 Genel | Kısmen: justify kararı açık | bolum-baslik-once/sonra-3x.png; hero-paragraf-once/sonra-3x.png |
| 2 Ortak kart ailesi | Yapıldı | kart-dort-varyant-once/sonra-3x.png; benzer-tarifler-once/sonra-3x.png |

Başlıklardaki satır yükseklikleri eşitlendi, Benzer Tarifler ortak card render'ına bağlandı. Fotoğrafı olmayan ek tarif verileri webdeki benzer tarif fotoğrafıyla eşleştirildi. Filtre150seçenek/9grup korunur; tek açık akordeon ve ortak seçim kutusu uygulanır. Önce/sonra dosyaları tarihsel aşamalardır; son yayın görüntüleri `*-yayin-son-390.png`.

## Açık karar
Hero paragrafında zorunlu justify bazı satırlarda geniş kelime aralığı üretiyor. Metin ve justify talimatı değiştirilmedi. Bu, yayın gezinmesine engel değildir; ölçülmeyen tüm olası durumlar için tam parite iddiası yoktur.

## Yayın paketi
Yalnız üç ekran, CSS/JS, yerel151görsel ve font/marka kaynakları, robots.txt. Kapsam dışı gezinme Yakında. Kaynak ve yedekler main; gh-pages kökü yalnız yayin içeriği. Kaynak commit öncesi dosya listesi ve gizli dosya/büyük dosya taraması yapılır. Canlı sonuçlar yayın sonrası ayrıca raporlanır.

Son test: 126 header örneğinde şeffafken metin/kontrol çakışması0; reduced-motion ara alfa0. Yerel yayın uygulama içi gidiş/geri başarılı; dış kaynak isteği0, JS/HTTP hatası0. Beş görsel kontrast sonuçları screenshots/polish/kontrast-sonuclari.json dosyasında.
