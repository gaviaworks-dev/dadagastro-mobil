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

## Bileşen cilalama — son kurallar

Sonraki çelişen kullanıcı talimatı yine önceliklidir. Bu sürüm öncesi v4 arşivi korunur. Bileşenler yalnız tam ekranla onaylanmaz: önce/sonra 3× kırpım `docs/screenshots/polish` altında, yakın inceleme ve ikinci düzeltme yapılır. 3× yalnız kanıt görüntüsünün büyütmesidir; yemek görseli URL boyutuna retina çarpanı uygulanmaz.

- Tek sekme ailesi: `.segmented`; arama sekmeleri, Mutfağa Giriş/Püf Noktaları ve liste/grid. Eşit bölmeler, 44px hedef, 4px iç boşluk, 12px aktif kontrol köşesi, 16px dış köşe; koyu tema aynı yapı.
- Tek avatar: tarif kartlarında **20px**, şef/yorum satırlarında **40px**; aynı nötr zemin ve domates koyu harf. Tam daire, küçülmez; isimle 8px. Kart harfi mevcut 10px, şef harfi 18px tipografi basamağı.
- Kart kaydet eylemi: **32px görünür / 44px hedef / 14px FA solid ikon**; kenarlıksız koyu yarı saydam zemin ve blur yalnız görünür yüzeyde. Görselin sağ ve üst kenarından **8px**. Kaydedildiğinde primary ikon. Header kaydet eylemi ayrı 40/44px sözleşmesini korur.
- Tarifler yalnız üç tanımlı ortak varyanttan oluşur: dikey kart (`card`), yatay liste (aynı `card`), büyük öne çıkan (`editorialHero`). Benzer Tarifler, Günün Tarifi, öne çıkan carousel ve liste bunlara bağlanır; özel Benzer Tarifler kart CSS’i üretilmez. Mevcut olmayan önizleme/öneri bölümü eklenmez.
- Dikey kart zeminsiz ve gölgesiz; yalnız 4:5 fotoğraf 24px radius ile kırpılır. Metin yatay iç boşluğu 4px. Kategori tek satır, başlık sabit iki satır yüksekliği + ellipsis, `|` sonrası alt başlık sabit tek satır; boşsa yuvası korunur. Bilgi alanı silinmez.
- Süre/puan fotoğrafın alt solunda cam meta kapsülünde. İkincil meta zorluk/porsiyon/maliyet; görüntülenme şef satırında yalnız bir yerde. Metayla ikon arasında 4px, meta öğeleri arasında 8px. Puan yıldızı vurgu; diğer ikonlar ilgili metin rengi.
- Grid sütun boşluğu 12px, satır boşluğu 20px. İç ritim 8 / 4 / 4 / 8 / 8. Eşit yükseklik, şef satırı altta. İskelet aynı DOM/ölçüler, inert ve aria-busy; gerçek yerleşimden ayrı gri kutular yok.
- Yatay keşif carousel’i aynı kartı 230px genişlikte kullanır: bir tam + sonraki kartın bir bölümü görünür; 12px aralık, ilk kart gutter20, scroll-snap ve eşit yükseklik. Detay CTA’sı için altta yeterli içerik payı bırakılır.
- Alt menü beş eşit sütun; yatay iç padding12, alt dış boşluk gutter20 + safe-area; aktif çizginin kart alt kenarına uzaklığı en az8px. Orta düğme aynı radius ailesi ve gölgeyi kullanır.
- Özet şeridi ikon+etiket/değer/not düzenli üç sütun; en çok88px. Malzeme notu ayrı soluk satır; satır eylemleri14px nötr ikon, hedef44px. Giriş/alışveriş/alternatif/ölçü işlevleri korunur.
- İç içe köşede iç radius = dış radius − padding: segment16/4/12, arama kartı24/8/16, porsiyon paneli24/12/12. Fotoğrafın kendi kırpımı24px; bağımsız yüzen eylemler kontrol radius12px.
- Tarayıcı scrollbar’ı header yanında şerit oluşturmaz; kaydırma işlevi korunur. Bölüm başlığı/eylem aynı satır; uzun başlıklarda mevcut18px basamak kullanılabilir.
- Her bileşen değişikliğinden sonra önceki header eşiği ve arama paneli testleri yeniden çalıştırılır. Ölçüm dışında başarı iddiası kurulmaz.

## Fotoğraf üstü okunurluk

- Ortak, metin konumundan hesaplanan koyu gradient: ilk metinden en az24px yukarıda %80 koyu bölgede tam opaklığa ulaşır; yukarıya48px içinde yumuşar. Header için ayrı kısa koyu gradient. Renk aynı marka koyu tokenının saydam türevi; logo dosyası değişmez.
- Fotoğraf üstü küçük metin en az13px (`--type-photo-meta`), medium ve beyaz; meta ikonları12–14px. Büyük başlık en az3:1, küçük metin en az4.5:1 kontrast. En açık arka plan pikseli ölçülür, ortalama kullanılmaz.
- Ana hero, liste/kategori banner’ı, detay, büyük kart, grid görsel metası ve video aynı kuralı kullanır; metin veya görsel değiştiğinde konum yeniden ölçülür.
- En az beş farklı fotoğrafla arka plan parlaklığı/kontrast tablosu ve 3× kırpım kanıtı saklanır. Justify problemi izin verilen font/genişlik ayarlarıyla çözülemezse metni veya justify kuralını değiştirme; karar bekliyor olarak raporla.

## Yayın öncesi son sözleşme (önceki çelişen kuralları geçersiz kılar)
- Overlay ve koyu zemin renkleri webdeki hero CSS’inden birebir alınır (kaynak-transfer); yeni ton üretilmez. Marka rengi overlay’de değil vurgularda kullanılır. Kaynak: resources/css/portal.css:948,957–970. Primary karıştırılarak üretilen kahverengi kaldırılır. Ana hero kaynak gradientlerini kullanır; diğer fotoğraflarda kaynak koyu renkleri ve alt bölge geometrisi korunur. Header’a özel katman ve sayaç bandı yok.
- Üç ekran tek `.content-panel`: hero/banner üzerine 24px bindirme, üst köşeler sheet24, ilk içerik üst boşluğu16; en alt hero metni ile panel arasında en az24px.
- Alt menü64px; yatay dış16, alt8+safe-area, iç8. Beş eşit sütun, min44 hedef; ikon22 (orta20), etiket10/500, aralık4. Orta düğme48, en çok14px taşma. Aktif gösterge üstte16×2. Detay CTA52, yazı14, ikon18, aynı dış boşluk16/8. Sayfa sonu80+safe-area.
- Sekme kontrol radius12; dış arama kart24/padding12/iç12. Porsiyon kart24/padding12/sayaç12. Yalnız avatar ve tarif görselinin küçük meta kapsülü tam yuvarlak; seçim kutusu özel küçük kademe4, radyo dairesi izinli.
- Filtre akordeonunda en fazla bir grup açık; ilk açılışta ilk grup. Seçim sayıları kapalı başlıkta; ortak22px seçim kutusu, primary seçili+FA solid onay,44px satır.
- Bu tur için tek seferlik git izni: düzeltmelerden sonra main üzerinde tek kaynak commit’i ve yalnız yayin içeriğinin gh-pages gönderimi. Hedef yalnız gaviaworks-dev/dadagastro-mobil. Bu yayın tamamlanınca yeniden git add/commit/push yasağı geçerli; her güncellemede ayrıca izin gerekir.
- Yayın yalnız yayin/: üç ekran, yerel CSS/JS/font/logo/görseller, noindex/nofollow ve robots. Geliştirici önizlemesi/arşivler/docs yayına girmez. Kapsam dışı gezinme Yakında bildirir.

## Son tarama ve ortak sheet (yayın öncesi)
- Koyu tema bölümlerinin başlık/açıklama/eylem metinleri açık tema rengini miras almaz; açık metin kullanılır. Alt menü rgba(255,255,255,.92) + blur, pasifler mevcut nötr koyu gri; renk kontrastı ölçülür.
- Seçim kutusunda yalnız `.choice-mark .fa-check` çizilir (12px); input appearance:none, pseudo tik yok; primary düz dolgu. İşaretli malzemede gradient/opacity yok; ad ve miktar okunur nötr gri+çizgi.
- Malzeme satırı sabit miktar/bilgi/sepet sütunları; miktar tek satır, sağ hizalı; bilgi4px aralık; alternatif eylemi adın altında, sepet hizasını değiştirmez.
- Tüm alttan açılan paneller native dialog.sheet ailesi: üst radius24, beyaz; padding üst12/yatay20/alt16+safe-area; tutma çubuğu; kart başlığı18, kapat40 görünür/44hedef; buton52, eşit ikili sütun+12gap. Scrim overlay50%, max85dvh, içscroll, sabit eylemler. Backdrop ve tutma çubuğunu aşağı sürükleme kapanır;250ms ortak hareket, reduced-motion anlık. Besin değerleri aynı sheet ile açılır.
- Puan verisi yoksa yıldız ve ham “Puan yok” metni gösterilmez; süre bilgisi kalır. Kaynak verisi değişmez.
- Bu tur son ek izin: main üzerinde ikinci ve son commit yalnız tarama düzeltmeleri/v5 kanıtları ve güncel yayın; ardından yayin yeniden üretilip gh-pages gönderilir. Bundan sonra her commit/yayın ayrı izin gerektirir.
- Son onaylı ışıma istisnası: koyu web tabanı üstünde primary radyal ışık; ana sağ-alt35%, liste sol35%, detay sağ-üst25%, screen karışım. Fotoğraf ana hero boyunca cover;320px sabit fotoğraf katmanı kullanılmaz. Metin kontrastı4.5:1 korunacak şekilde kaynak koyu renklerin mobil durakları ayarlanabilir.

## Akışkan mobil kabuk ve pişirme modu (son kural)
- Tasarım 390'a sabit değildir; 320–430px arasında akışkandır. Her değişiklik en az 360, 390 ve 430 genişlikte doğrulanır. Masaüstü sınırı tek `--app-max:480px`; uygulama ve fixed katmanlar aynı kabuğu kullanır. Önizleme çerçevesindeki 390×844 yalnız geliştirici test görünümüdür.
- Header, nav dock, CTA, toast ve sheet kabuğa göre genişler; yüzen bileşenin iç kenar boşluğu token'dan gelir. Tam ekran mod 100dvh ve opak zemindir; safe-area üst/alt korunur, arka sayfa kaymaz.
- Header metin geometrisine göre solid olur; metin üst kenarı header'a yaklaşınca tamamı gizlenir, yarım satır bırakılmaz. Yukarı dönünce geri görünür. Gerçek tarayıcı scroll ve font yüklenmesi sonrası geometri yeniden ölçülür.
- Justify önceki genel kuralı geçersiz kılar: yalnız en az dört render satırlı gövde paragrafı iki yana yaslıdır. Üç satır ve altı sola yaslıdır. Pişirme Modu adım metni her zaman sola yaslıdır; ekran genişliği değişince satırlar yeniden ölçülür.
- Pişirme Modu: üst tarif/çıkış ve ilerleme; ortada okunur adım; zamanlayıcı metnin hemen altında; adım seçimi ve önceki/sonraki altta. Uzun adım kendi alanında kayar. Dokunma ile açılışta kalıcı odak halkası yok; klavye focus-visible korunur.
- Bu düzeltmeye özel tek main commit ve yayin→gh-pages izni vardır. Fotoğraftan Tarif yerel taslağı bu commit'e ve yayına girmez. Sonraki commit/yayın ayrıca izin gerektirir.

## Çalışma düzeni
- Görevler geliş sırasıyla, birer birer tamamlanır; sonraki görev mevcut işin arasına sokulmaz. Başlarken tek satır “şimdi şuna başlıyorum”, bitince “bitti” ve kısa rapor. Sıra belirsizse kullanıcıya sorulur. Tekrarlanan aynı talimat bir kez uygulanır.
- Akışkan cihaz düzeltmesinden sonraki yeni işler ayrı kuyruktur: yumuşak overlay eğrisi, koyu bölümlerin web kaynaklı fotoğrafları, görünür/çalışır özellik paritesi. Kuyruktaki talimat uygulanmadan tamamlanmış sayılmaz. Fotoğraftan Tarif yerel çalışması korunur, yayına dahil edilmez.

## Otonom tur — overlay
Overlay geçişi uzun ve yumuşak eğrilidir; en az 8 durak, sert sınır yok. Kaynak koyu renk, tek ortak eğri; metin geometrisi durak mesafesini belirler. Ham fotoğrafın doku farkı ile overlay bandı ayrı ölçülür. Bu tur Git/yayin işlemi yok; kararlar docs/16-otonom-kararlar.md'ye yazılır, beş iş sırayla tamamlanır.

Koyuluğun başlangıcı sabit değil, metin bloğunun konumuna göre ayarlanır; metnin tamamı koyu bölgede kalır. Ana hero metin başlangıcından48px önce %64 koyuluğa ulaşır; detay/liste alt metin eğrisi bundan bağımsız korunur.

Koyu bölümler webde arka plan fotoğrafı varsa düz renk değildir: aynı arka plan fotoğrafı + kaynak koyu overlay kullanılır. Webde beyaz olan Topluluğa Katıl bölümüne fotoğraf uydurulmaz; beyaz kaynak görünümü korunur.

Özellik paritesi “var” demekle sağlanmaz: özellik görünür, anlaşılır ve çalışır olmalı. Her ekran değişikliğinden sonra parite tablosu yeniden doğrulanır. Koşullu verisiz dallar doğrulanmış sayılmaz.

Banner'a binen panel sticky olduğunda üst köşeleri düzleşir, opak olur ve header'a boşluksuz oturur. Yapışma normal akıştaki ankraj konumundan hesaplanır; header > panel > kart katman sırası korunur.

Chip radius'u = buton radius'u (kontrol radius'u). Hap biçimli chip yok. Ortak chip yüksekliği44px, yatay padding12px, aralık8px; rol küçük gövde/meta. Dolapta Ne Var widget'ı kaynak başlık/açıklama ve mevcut malzeme verisiyle çalışır; backend malzeme havuzu varmış gibi gösterilmez.

Tarif Detay alt çubuğu: solda etkileşim ikonları (Ben de Yaptım, Eline Sağlık, Yorumlar), sağda Pişirmeye Başla. Gövde ve pişirme kapanışındaki eylemler aynı yerel durumu paylaşır; misafir giriş kapısına gider. Kaydet/Paylaş header'da kalır.

Ana menü sağdan açılan çekmecedir (drawer), alttan sheet değil. Her menü satırında FA solid ikon, sabit24px ikon sütunu ve12px metin boşluğu bulunur. Çekmece %86/en çok360px, düz sol kenar,48px satır, tek açık akordeon; kaynak canlı mobil menü sırası korunur.

## Tipografi kanonu (önceki büyük başlık ölçeğinin yerine)
Her metin rolü için size/weight/line-height/tracking tokenları vardır. Display32/700 yalnız iki hero; sayfa24/700; bölüm20/700; sheet18/500; alt/grup/adım16/500; kart16/500 (öne çıkan20/700); gövde15/500; meta13/500; etiket11/500; buton15/500; alt menü10/500. Kaynakta yalnız Medium ve ExtraBold dosyaları mevcut olduğundan semibold hedefi yeni sahte font üretilmeden Medium ile karşılanır. Üst başlık alt başlıktan küçük olamaz. FA900 ikon ağırlığı metin ölçeğinin dışındadır.

## Onaylı mobil ekstralar
Tabaktan Tarif (Pro): fotoğraftan benzer denenmiş tarifler + kullanıcıya özel yapay zekâ taslağı. Taslak her zaman etiketli ve özeldir; puan/yorum yok, denenmiş tariflerle karışmaz. Kaynak gerçek tarif yalnız örnek AI çıktısıdır. Yayın editör onayına gider; prototipte tüm kamera/AI/giriş/kota/kayıt/onay işlemleri simülasyondur. Pro kapısı, deneme hakkı ve misafir durumu ortak sheet; fiyat/süre uydurulmaz. `tabaktan-tarif.html` ve bu özellik yayın klasörüne eklenmez; kullanıcının son izniyle yalnız main kaynak commit’ine alınır. Aynı detay/kart/alan bileşenleri kullanılır.

## Bölüm başlığı satırı
Bölüm başlığı satırında eylem küçülmez, başlık kırılır; çakışma olmaz. Ortak `.section-heading-row` kullanılır: başlık min-width:0, en fazla iki dengeli satır; eylem tek satır, arada en az12px. Eylem ilk başlık satırının taban çizgisindedir. 360px altında yalnız erişilebilir adlı ok gösterilebilir. 320/360/375/390/430 ve önizleme iframe'inde doğrulanır.

## Bu yayın güncellemesinin sınırı
Kullanıcının 7 Ekim izni: main’de üç ekran düzeltmeleri ve Tabaktan Tarif taslağı iki ayrı commit; yalnız üç ekranın yayin/ içeriği gh-pages. Tabaktan Tarif yayına girmez. Bu iki commit ve yayın sonrasında yeniden git/yayın yasağı geçerlidir.
