# Üç ekran ve navigasyon

Son talimatla uygulama kapsamı: Ana Sayfa, Tarif Listesi, Tarif Detay. 390px mobil prototip; Flutter implementasyonu değil. Aynı renk/font ailesi; masaüstü web blokları daha kısa mobil akışa uyarlanır.

## Ortak kabuk

Kaynaklar: `resources/views/layouts/app.blade.php`, `partials/header.blade.php`, `partials/mobile-drawer.blade.php`, `partials/bottom-nav.blade.php`; `resources/css/portal.css`, `tokens.css`, `kart.css`.

Web alt menüsü: Ana Sayfa · Tarifler · Ne Pişirsem · Kaydettiklerim · Profil. Kullanıcının mobil adı: **Defterim**. Webde oturumsuz son iki öğe girişe gider. Prototipte kapsam dışı hedeflerin href değeri boş; JS sayfa yenilemesini önler. Aktif ekran ve geri dönüş belirgin; kategori ve arama sorgusu URL'de tutulur. Safe-area ve en az 44px hedefler ortak.

```text
Ana Sayfa ─ arama / kategori / tümünü gör → Tarif Listesi
    └ günün tarifi / öne çıkan tarif → Tarif Detay
Tarif Listesi ─ kart → Tarif Detay ─ geri → önceki liste/sorgu
    └ filtre + sıralama → aynı ekranın bottom sheet'i
Tarif Detay ─ Pişirmeye Başla → aynı ekrandaki adımlara odaklan
Alt menü: Ana Sayfa | Tarifler | Ne Pişirsem | Defterim | Profil
```

### Ana Sayfa

Amaç: tarif keşfine hızlı başlangıç. Bloklar: üst marka/arama, “Ne pişirsem / Dolapta ne var” girişleri, yatay kategori şeridi, günün tarifi, öne çıkanlar, püf kartları, şefler.

Karşılık: `resources/views/home.blade.php`, `resources/views/gastro/partials/hero.blade.php`, `resources/views/tarifler/_card.blade.php`, `resources/views/puf/_card.blade.php`; CSS `resources/css/portal.css`, `kart.css`.

Webde büyük hero, istatistikler ve geniş keşif bölümleri var. Mobil öneri: kısa açılış, gerçek yemek görselini erken gösteren günün tarifi kartı, parmakla kayan kategori ve kart rayları. Püf/şef bağlantıları kapsam dışı.

Durumlar: boş bölümde uydurma tarif yok, bölüm gizlenir veya açıklama; yüklenirken kart iskeleti; hata halinde bölüm bazında tekrar dene. Statik prototip gerçek içerik anlık görüntüsü kullanır; API yüklemesi iddiası yok.

### Tarif Listesi

Amaç: arama/kategori/süre/zorlukla tarifi daraltmak. Bloklar: sticky arama, yatay kategori chip'leri, sonuç adedi, filtre/sıralama düğmesi, fotoğraf-süre-zorluk-puan-kaydet içeren kartlar.

Karşılık: `resources/views/tarifler/index.blade.php`, `kategori.blade.php`, `_facet-panel.blade.php`, `_facet-row.blade.php`, `_result-bar.blade.php`, `_card.blade.php`, `_empty.blade.php`, `_pagination.blade.php`; CSS `public/reference/tarif-liste/tarif-liste.css`.

Web mobilde zaten tek sütun yatay mini kart ve sheet kullanır; bu dil korunur. Prototipte tek sheet içinde filtre ve sıralama, uygulama/temizleme; arama sonucu anlık görüntü kümesiyle sınırlı. Web tüm havuz sayısı yerel sonuç sayısı olarak gösterilmez.

Durumlar: yükleniyor iskeleti; sıfır sonuçta arama/filtre temizleme CTA'sı; API aşamasında bağlantı hatası ve tekrar deneme. `?durum=yukleniyor` statik yüklenme inceleme durumudur; eşleşmeyen arama boş durumu üretir.

### Tarif Detay

Amaç: tarifi değerlendirmek, hazırlamak ve adımlarını takip etmek. Bloklar: büyük hero, kategori, tam başlık, şef ve gerçek puan, süre-zorluk-porsiyon, porsiyon ölçekleyici, işaretlenebilir malzeme satırları, adımlar ve yorumlar, sticky Pişirmeye Başla.

Karşılık: `resources/views/tarifler/show.blade.php`, `_gallery-hero.blade.php`, `_ingredients-panel.blade.php`, `_steps.blade.php`, `_reviews.blade.php`, `_actbar.blade.php`; CSS `public/reference/tarif-detay/tarif-detay.css`; ölçekleme `resources/js/ui.js:358`.

Webde iki kolonlu içerik/malzeme yapısı, galeri, action bar ve tam ekran overlay bulunur. Dar ekranda tek akış ve sticky eylem kullanır; web `.rd-actbar.show` olduğunda alt menüyü gizler. Bu prototipte kullanıcının ortak 5'li menü talebi korunarak CTA menünün üzerinde ayrı yerde durur; içerikte ikisi için alt boşluk ayrılır. Pişirmeye Başla aynı detayın adımlarına kaydırır; ayrı ekran açmaz.

Ölçekleme: kaynaktaki `0.5× / 1× / 1.5×` modeli korunur; sayısal miktarlar çarpılır, metin miktarları korunur. Ölçek, tarifin gerçek başlangıç porsiyonuna bağlıdır. Malzeme işaretleri yalnız yerel prototip durumudur.

Durumlar: görsel yoksa marka zemininde açıklama; yorum yoksa gerçek boş durum; bulunamayan tarifte listeye dön; yükleme/hata canlı API aşamasında ayrı durumlar. Kaydet yalnız cihazdaki demo durumunu değiştirir, hesaba yazmaz.

## Sonra

Pişirme Modu, Dolapta Ne Var, Ne Pişirsem, Püf Noktaları akışı/detayı, Mutfak Defterim, Alışveriş Listesi, Giriş/Kayıt, Bildirimler ve Profil/Ayarlar: **sonra**.

## v2

Video Mutfağı, menü planlayıcı, şef paneli, tarif ekleme, Mutfağa Giriş, Ansiklopedi, Sözlük, Pro/ödeme.
