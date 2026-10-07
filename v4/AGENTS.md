# DadaGastro mobil prototip — kalıcı çalışma kuralları

Her turda çalışmaya başlamadan ÖNCE bu dosyayı oku. Son kullanıcı talimatı önceki çelişen talimatı geçersiz kılar. Kullanıcı izin vermeden git add, commit, push, merge veya deploy yapma.

## Yetki ve kaynaklar

- Çalışma alanı bu projedir. Laravel `/Users/gaviaworks/Developer/Backend Projects/dadagastro` ve marka `/Users/gaviaworks/Desktop/DadaMentor - Marka` SALT OKUNUR. Dosyalarını, veritabanını, ayarlarını değiştirme. Gereken marka/font dosyalarını yalnız bu projeye kopyala.
- Düz HTML, CSS, az vanilla JS; framework yok. Flutter'da uygulanabilecek tasarım. Canlı siteye veri yazma. Statik prototipte üye eylemlerinin önizleme olduğunu açıkça belirt; gerçek işlem yapılmış gibi gösterme.
- Kaynaklar: https://dadagastro.com ve Laravel blade/CSS/JS/controller dosyaları. Canlı ile repo farklıysa raporla. Emin değilsen uydurma, açık soru yaz.
- Önceki sürümler silinmez: v1, v2, v3 yedekleri korunur. Yeni çalışma kökte yapılır.

## İçerik ve işlev

- Web ile AYNI modüller, isimler, gerçek veri ve bütün işlevler; uydurma modül, slogan, sayaç, özellik yok. Sadeleştirmek için özellik budama yok. Koşullu bilgi yalnız kaynağında veri varsa gösterilir.
- Mobil kompozisyon özgündür: webi küçültme. Fotoğraf öncelikli, bölüm ritmi çeşitli; aynı marka ama uygulama karakteri. Düzen/sıra/boyut/etkileşim kalıbı serbest, içerik ve işlev değil.
- Üç ekran: Ana Sayfa, Tarif Listesi, Tarif Detay. Mevcut işlevler korunur. Diğer ekran hedefleri href=""; bu tur o ekranları inşa etme.
- Web footer'ı, çerez bandı, Görüş Bildir sekmesi, uygulama indirme tanıtımı yok.
- Parite ve web karşılıkları docs/07 ve docs/08'de izlenir; eksikleri açıkça belirt, tamamlandı deme.

## Marka, renk, biçim

- Resmi logo dosyasını kullan; asla yazıyla yeniden üretme, yeniden renklendirme veya oranını bozma. Koyu/görsel ve primary header üzerinde resmi beyaz varyant. Logo dosyalarını değiştirme. Marka renk çelişkisini raporla.
- Gilroy ve domates marka renkleri değişmez. Krem/bej YOK; beyaz, token nötr gri, koyu zemin veya çok açık domates türevi. Krem tokenları aktif CSS'te kullanılmaz. Arşiv yedekleri değişmez.
- Radius tek ölçek: kontrol 12px, kart/görsel/sheet 24px; yalnız avatar 50%. Chip radius'u = buton = input = sekme kontrol radius'u. Elle radius yazma, token kullan.
- Kart radius'u, görsel radius'u, gölge ve kenarlık tür başına tek token. Kart kaydet eylemleri aynı konum/boyut/stil.
- Avatar tek bileşen: 28/40/56px ölçeği; eşit width/height/min-width/min-height, aspect-ratio 1, flex-shrink 0. Baş harfli avatar zemini nötr, harfi domates koyu. Fotoğraf background-image/cover/center. Daire yalnız avatar.
- Yüzen/header ikon butonu kontrol radius'lu kare: 44px dokunma alanı, 40px görünür; header hedefleri arası 8px. Görsel üstünde yarı saydam koyu zemin + blur; solid header'da zeminsiz beyaz ikon. Detay: geri solda, kaydet/paylaş/daha fazla sağda; logo yok; scroll'da tarif adı ortada. Kart kaydet eylemleri korunur.

## Tipografi ve ikon

- Yalnız yerel Font Awesome Free 6.5.2 (Laravel ile aynı). Arayüz ikonları yalnız fa-solid; sosyal marka gerektiğinde fa-brands. Inline SVG, emoji, unicode ok/yıldızla ikon üretme. Logo SVG dosyaları bu ikon yasağının konusu değildir.
- İkon boyutları 14/18/22px tokenları; aynı anlam aynı ikon. İkon + metin arası ortak boşluk, erişilebilir adlar ve en az 44px hedef. Kaydet durumu renk ile değişir; outline/regular yok.
- Tipografi tek ölçek: display 54px (ana hero), detay display 34px, bölüm 22px, kart 18px, gövde 14px, meta 12px, etiket 10px. Gilroy 500/700/800 mevcut aileleri. Elle font-size yok. Dev başlık yalnız iki hero'da.
- Bölüm başlıkları 20–22px, sıkı satır arası ve hafif negatif tracking; mümkünse tek satır, uzunsa text-wrap:balance. Yalnız webdeki üst etiket. Tamamını Gör küçük metin + FA ok, taban çizgisi hizalı.
- Tarif kart başlığı en fazla 2 satır + ellipsis; `|` sonrası alt başlık ayrı küçük satır. Kategori ad alanı ve tarif sayısı satırı eşit yükseklik.
- Paragraf için tek ortak `.prose` kuralı: justify, text-align-last:left, hyphens:auto, html lang=tr. Başlık, etiket, meta, tek satır, buton, malzeme/sayı alanlarına justify uygulama. Çirkin kelime boşluğunu font/genişlikle düzelt, justify'ı kaldırma.
- Kaynaktaki strong/b korunur. Metni değiştirmeden birkaç anlamlı vurgu: malzeme, miktar, süre, sıcaklık, ayırt edici ifade. Tekrarlanan sıradan kelimeleri ve anlamsız pazarlama vurgularını kalınlaştırma. Bold mevcut Gilroy; primary renge boyama.

## Spacing, navigasyon ve header

- Tek spacing ölçeği: 4,8,12,16,20,24,32,40,48px (+ sıfır). Bütün margin/padding/gap bu tokenlardan; ara değer yok.
- Gutter 20px: ana metin/bölüm başlığı/kart ve carousel ilk öğesinin dış hizası ortak. Carousel yalnız sağa taşar; scroll-padding-left gutter. İç kart padding'i 16px. Ana hizaları ölç; iç kart padding'i ile karıştırma.
- İlişkili öğeler yakın: etiket→başlık 4–8, başlık→içerik 12–16, kart arası 12–16; bölüm arası 32–40. İlişkisiz komşular arasında en az 8px. Metin/görsel kesişimi yok. Bilinçli overlay metni örtmez.
- Header her üç ekranda sticky/fixed ve safe-area dahil. Görselde şeffaf; ilk metin/kontrol header altına gelmeden solid primary #E14827 + beyaz logo/ikon; yukarı dönünce şeffaf. Scroll ile ilk en fazla 48px boyunca opaklaşır; reduced-motion kademesiz. Eşik görselin sonundan alınmaz. CSS özgüllüğü ve iframe scroll kontrolü; ölçmeden çalışıyor deme.
- Ana/liste header'ında kayıtlılar kısayolu YOK. Profil içinden Mutfak Defterim erişimi. Detay ve kartlardaki tarif kaydet butonu KALIR.
- Alt menü: Ana Sayfa · Tarifler · Ne Pişirsem · Mutfak Sırları · Profil. Eşit beş sütun; etiketler tek satır/aynı taban çizgisi. Aktif primary + ince gösterge, kaba pembe kutu yok. Orta buton dengeli yükseltilmiş, ortak radius ve gölge. Cam bar, gutter kenarları ve safe-area. İçerik alt boşluğu = bar yüksekliği + safe-area. Detayda alt menü yok, aynı görsel ailede Pişirmeye Başla CTA var.
- Liste banner'ı yeniden kullanılabilir parametreli bileşen: başlık/alt satır/görsel. Genel veya kategori gerçek fotoğrafı/sayıları; yaklaşık 200–220px, koyu gradient. Başlık Tarifler; slogan yok. Arama üst kenarı ile banner metninin altı arasında >=16px temiz boşluk. İlk ekranda tarif kartı başı görünür. Boş/yükleniyor durumunda banner kalır. Sticky arama/chip header'ı örtmez.
- Detay özet şeridi tek satır üç değer, <=88px; 844px ilk ekranda hero, başlık, özet ve ilk malzeme görünür.

## Görsel, erişilebilirlik ve doğrulama

- Yemek/kategori/diğer içerik görselleri div + background-image + cover + center; kare gereken gerçekten kare. Logo img olabilir, oran korunur. CSS render genişliğine göre; 2x retina çarpanı yok. Lazy-load + yer tutucu zemin.
- Metin kontrastı >=4.5:1; min44 hedef, görünür focus, aria-label, reduced-motion. Hareket 150–250ms ve ortak easing. Her eyleme geri bildirim; toast. Aramada temizleme ve sonuç sayısı. Sheet: tutma çubuğu, backdrop ile kapanma, iç scroll. Boş/hata: açıklama + çıkış. Skeleton gerçek yerleşimi izler.
- 390×844 ve dar ekranda yatay taşma yok. Ekran, boş/yükleniyor, sheet, alternatif, yorum ve tam boy home kontrolleri. Her ekranda screenshot, öz eleştiri ve en az bir iyileştirme turu.
- Header üst/scroll computed renkleri, avatar w/h, radius/font/spacing türleri, gutter, komşu boşluklar ve çakışmalar programatik ölçülür. Bilinçli overlay ile hata ayırt edilir. Kanıt docs altında. Ölçülmemiş/tüm olası durumlar için kesin başarı iddiası kurma.

## En son header eşiği kuralı (önceki görsel-sonu eşiğini geçersiz kılar)

Şeffaf header'ın arkasında yalnız fotoğraf olabilir. Eşik hero/banner'daki İLK metnin (ana sayfa etiketi, liste başlığı, detay kategori etiketi) konumundan hesaplanır. Bu metin header alt sınırına ulaşmadan primary tam opak olur; sabit hero yüksekliğiyle eşik kurulmaz. İlk yaklaşık 48px scroll içinde alfa 0→1, yukarıda tersine; reduced-motion'da kademesiz. 0–400px / 20px adımlarla gerçek alfa ve metin-kesişim ölçülür. Ana sayfanın 0/60/120/300px görüntüleri saklanır.

## Liste arama paneli ve odak (son talimat)

- Banner’ın en alt metni ile beyaz panel üstü arasında en az 24px temiz boşluk. Panel içinde üst→arama 16px, arama→chip 12px, chip→panel sonu 16px; spacing tokenları kullanılır. Üst köşeler detay sheet’iyle aynı kart/sheet radius tokenına bağlıdır.
- Metin input/textarea/select odağı dış alan kapsayıcısında focus-within ile primary 2px halka; iç input border/outline üretmez. Arama ikonu, input ve temizle aynı çerçevede. Checkbox/radio kendi erişilebilir odak göstergesini korur.
- Placeholder web kaynaklıdır, focus/blur ile değişmez; yalnız webdeki arama modu değişirse ilgili mod metnine geçer. Temizle boş inputta display:none, alan ayırmaz; metin girilince görünür ve klavye ile erişilebilir olur.
- Liste normal/odaklı ekran görüntüsü ve gerçek banner-panel/iç aralık/odak çerçevesi ölçümü kaydedilir.
