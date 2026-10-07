# Son görsel tarama

390×844; üç sayfa844px kaydırma adımlarıyla, ayrıca grid/liste, kategori, odak, filtre, boş/yükleniyor, sayfalama, misafir/üye ve açılan paneller. Önce/sonra29'ar durum ekranı `screenshots/son-tarama`; sheet ve seçim kutusu3× kanıtları `screenshots/polish`. v5 değişiklik öncesi yedektir.

| Bulgu | Ekran | Scroll konumu | Önce | Sonra | Durum |
|---|---|---:|---|---|---|
| Topluluk metni görünmüyor | Ana | 4220/son | Koyu üstüne koyu | Beyaz başlık/açıklama | düzeltildi |
| Pro metni/eylemi düşük kontrast | Ana | 3000–3376 | Koyu miras renk | Koyu tema açık metin | düzeltildi |
| Alt menü kirli/şeffaf | Ana/liste | tümü | %55 beyaz | %92 beyaz + koyu gri pasif | düzeltildi |
| Kaydet arama panelinin üstüne çıkıyor | Liste | 2532 | Panelz2/savez4 | Sticky panelz30, kart isolation | düzeltildi |
| Ham Puan yok | Ortak kart | 1688 | Yıldız+ham metin | Puansız tarifte yalnız süre | düzeltildi |
| Uydurma şef bölüm başlığı | Ana | 3376 | Tarifin ustaları | Şefler & Yazarlar | düzeltildi |
| Şef sayaç metni bitişik | Detay | 2532 | Tarif7/Takipçi7 | Tarif 7/Takipçi 7 | düzeltildi |
| Çift tik | Detay/filtre | 844/sheet | CSS::after✓ + FAcheck | Tek FAcheck12px | düzeltildi |
| İşaretli satır pembe ve soluk | Detay | 844 | Gradient+opacity.65 | Düz zemin, okunur çizili ad/miktar | düzeltildi |
| Miktar/bilgi kırılıyor | Detay | 844 | max-width94/60% mirası | Sabit sütun, nowrap, ikon4px | düzeltildi |
| Alternatif sepet hizasını bozuyor | Detay/Patates | malzemeler | Aynı eylem kolonunda üst üste | Alternatif ad altında, sepet sabit | düzeltildi |
| Giriş/eylem paneli düz köşe | Detay | sheet | radiusyok | sheet24 | düzeltildi |
| Panel geometri farkları | Tümü | sheet | Çeşitli boşluk/buton | 12/20/16; buton52; max85dvh | düzeltildi |
| Backdrop/scroll/drag farkları | Tümü | sheet | Parçalı davranış | Ortak backdrop, scrolllock, handle drag | düzeltildi |
| Ham dosya seçici | Üye yorum | sheet | İngilizce native düğme | Mevcut Fotoğraf Ekle etiketi tek kontrol | düzeltildi |
| Küçük metin kontrast sınırı | Avatar/chip/adım | çeşitli | 4.07–4.43 | Mevcut açık zemin/koyu marka tokenları | düzeltildi |
| Paylaş input/CTA bitişik | Detay | sheet | Ara yok | 12px ara | düzeltildi |
| Hero justify kelime aralığı | Ana | 0 | Bazı satırlar geniş | Talimat gereği metin/justify korunuyor | karar bekliyor |
| Primary header küçük beyaz yazı kontrastı | Detay | 300 | Primary+beyaz4.07:1 | Marka rengi ve beyaz header talimatı korunuyor;4.5hedefiyle çelişiyor | karar bekliyor |

**17 düzeltildi, 2 karar bekliyor.** Sayılar bulgu türüdür; aynı düzeltmenin etkilediği her öğe ayrı sayılmadı.

## Sheet envanteri ve ölçüm
Filtre/sıralama; giriş gerekli; alternatif malzeme; besin değerleri; paylaş; tarif işlemleri; ölçü karşılığı; menü; profil; değerlendirme/yorum; yanıt; yorum bildir/sil; e-posta doğrulama; videolu anlatım mevcut ortak sheet render'ını kullanır. Bildirimler kapsam dışı: Yakında, yeni panel eklenmedi. Porsiyon sayaç olarak yerinde kalır; yeni ekran eklenmedi.

Yedi gerçek açılış üzerinden ölçüm: `../docs/sheet-son-olcumler.json`. Hepsinde radius24, padding12/20/16, beyaz, overlay50%scrim; birincil/ikincil buton52. Kapat hedef44; kontrol yüzeyi hedef içinde. Maksimum85dvh. Backdrop kapanma7/7. Alternatif veri Curry'de yok; Patates Mücveri ile gerçek veri üzerinden test edildi.

## Kontrast ve doğrulama sınırı
`metin-kontrast.json`: fotoğraf dışındaki görünür yaprak metinlerin hesaplanan ata zeminleriyle ölçümü; son taramada hedef altı0. Fotoğraf üstü alanlar ayrıca piksel tabanlı `../polish/kontrast-sonuclari.json` ile5görselde kontrol edildi. Bu otomatik hesap maske/blur ve örtüşen karmaşık tüm piksellerin eksiksiz WCAG sertifikası değildir; ekranlar ayrıca gözle incelendi. Primaryheader küçük beyaz başlık özel çelişkisi yukarıda açık bırakıldı.

Header126normal/reduced örneğinde şeffaf-metinkesişimi0; arama paneli24px açıklık ve16/12/16iç ritim korunur. Sayfa geçişi/geri, boş temizleme, filtre tek açık grup/seçim, paylaş/daha fazla, misafir giriş ve üye kaydet/takip/yorum durumları test edildi. Uydurma alternatif veri eklenmedi; mevcut statik veri ve işlevler korunur.

## Yayın öncesi son ışıma eki
Ana fotoğrafın yarıda bitme nedeni `:after` katmanındaki320px sabit yükseklikti. Fotoğraf ve overlay%100hero yüksekliğine taşındı; header–sayaç arasında tek kesintisiz coverfotoğraf var. Primary ışık ana sağ-alt35%, liste sol35%, detay sağ-üst25%; screen karışım. Bunlar son açık kullanıcı talimatıyla kaynak gradient duraklarına getirilen mobil düzenlemedir. Koyu taban kaynak#211E16; üretilmiş primary/kahverengi taban yok. İlk denemede vurgu başlığı3.76:1 çıktığından alt koyu geçiş yeniden ayarlandı; son kontrast dosyası esastır.
