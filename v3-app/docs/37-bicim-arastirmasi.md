# SET 3 — Biçim araştırması ve üretim planı

8 Ekim 2026. Yalnız v3-app. SET 1 ve SET 2 kaynakları donduruldu. Araştırma ekranları references-37 altında. Aşağıdaki biçimler kaynakların birebir kopyaları değil, DadaGastro için tasarım çıkarımlarıdır.

## Önceki 18 fikir
1 Sinematik seçim: tam fotoğraf, soru ve malzemeden cevap.
2 Öğününe göre: kısa karşılama ve öğün bağlamı.
3 Fikir destesi: yatay öneri kartları.
4 Açılan sofra: küçülen kapak.
5 Malzemeden sofraya: hero içinde malzeme seçimi.
6 Bugünün mutfağı: editoryal başlık ve fotoğraf penceresi.
7 Vaktine göre: süreye göre karar.
8 Bir mutfak seç: dünya mutfağı seçimi.
9 İki fikir arasında: iki tarif arasında karar.
X1 Kapak sineması: yatay tam boy kapaklar.
X2 Tarif destesi: üst üste çevrilen kartlar.
X3 Sofranın iki yanı: dikey çapraz bölünme.
X4 İştah haritası: beş fotoğraflı kolaj.
X5 Birlikte pişirelim: pişirme videosu kapağı.
X6 Açılan sahne: küçülen fotoğraf ve yapışkan arama.
X7 Öğünün sahnesi: öğünle birlikte değişen sahne.
X8 Mutfak pusulası: dairesel fotoğraf etrafında mutfak seçimi.
X9 Sofra sayısı: eğik fotoğraflı dergi kapağı.

## Yeni kaynak → bulgu → uygulama
- [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout): hizalama ve kapsayıcılar bilgi ilişkisini anlatır; kontrol ve içerik katmanları ayrılır. Y1/Y5/Y9: maskeler yalnız görseli ve yüzeyi keser; arama ve dokunma hedefleri kesilmez. Sayfa JS ile tarayıcıda okunabildi.
- [Apple HIG Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): detent ve tutamaç, alttaki bağlam korunurken ek içeriği açar. Y3: modal olmayan, klavye ve sürükleme ile açılan içerik yüzeyi. Ana sayfanın tamamını modal dialog içine hapsetmiyoruz. Resmî örnek görüntüleri kaydedildi.
- [Material 3 Shape](https://m3.material.io/styles/shape/overview-principles): biçimler kendiliğinden anlam taşımaz; fotoğraf çerçevesi ve durum değişimi için sınırlı kullanıldığında ilişki kurar. Y2/Y4/Y6/Y7: geometri ana eyleme yöneltir, buton ve kart radius ölçeği değişmez. Metin tarayıcıda okundu; hareketli üst tanıtım grafiğinin tüm durumları incelenmiş sayılmadı.
- [Material 3 Motion](https://m3.material.io/styles/motion/overview): katman hareketi durum ve derinliği anlatmalı. Y3/Y8: yüzey açılır/küçülür; sürekli dekoratif animasyon yok. Reduced-motion anlık durum geçişi.
- [Tide Guide, Behind the Design](https://developer.apple.com/news/?id=4r9b23wx) ve [2026 geliştirici gösterimi](https://developer.apple.com/videos/play/meet-with-apple/257/): dalga/ölçek geometrisi kullanıcı hareketini bilgiye bağlar; standart kontroller korunur. Y4: dalga görselden malzeme alanına geçişi yönlendirir. Gelgit işlevi veya verisi kopyalanmaz. Makale ve video transkripti okundu; uygulamanın tüm etkileşimleri denenmedi.
- [Headspace, Behind the Design](https://developer.apple.com/news/?id=fkfnhq8u): Explore ve Start your day ekranları doğrudan incelendi; yuvarlak karakter dili, konu grupları ve gün içi akış tekrar eden görsel aile kuruyor. Y1/Y2: geniş yaylar bölüm yüzeylerinde tekrarlanır. Marka kremi/illüstrasyonu taşınmaz.
- [Red Dot Nibbly 2025](https://www.red-dot.org/project/nibbly-85204): ödül sayfası ve gerçek ürün ekranları tarayıcıyla görüldü. Büyük yemek önerisi, küçük alternatiflerle aynı yüzey ailesini paylaşıyor; malzeme kararını somut fotoğrafa bağlıyor. Y8: yüzen büyük öneriden küçük seçeneklere geçiş. AI, uydurma kişisel geçmiş veya etki sayacı eklenmez.
- [Koto / Yazio](https://koto.com/projects/yazio): ürün ve marka ekibinin aynı hareket/karakter dilini uygulama boyunca sürdürmesi. Y9: kemer, hero ve video/fotoğraf çerçevesinde tekrar eder. Bu sayfanın metni okundu; tüm uygulama akışının görsel denetimi yapılmadı.
- [Apple Design Awards 2024](https://developer.apple.com/design/awards/2024/): Crouton'un tarif/gıda düzenleme etkileşimi, biçimin işlevi örtmemesi için referans. Y6 eylem odağı. [2025](https://developer.apple.com/design/awards/2025/): CapWords nesneyi fotoğraftan ayrıştırarak içerik kimliği kuruyor; Y8 çerçeveleme çıkarımı. [2026](https://developer.apple.com/design/awards/): Moonlitt etkileşim, Tide Guide görsel tasarım kazananları. Y7'nin dairesel yüzey fikri bu taramadan destek alıyor; ödül kaydı tek başına ana ekran geometri kanıtı değildir.
- [Google Play Best of 2025](https://blog.google/products-and-platforms/platforms/google-play/best-apps-games-2025/): Focus Friend ana işi belirgin tutma açısından değerlendirildi. Belirli bir hero biçimi bu ödül metnine atfedilmedi.
- [Webby / Headspace](https://winners.webbyawards.com/2023/apps-dapps-and-software/app-features/best-visual-design-function/256532/headspace): görsel tasarım ödül kaydı; güncel ekran kanıtı olarak Apple makalesinin görüntüleri kullanıldı.

## Erişim ve kanıt sınırları
Mobbin giriş arkasındaki ekranlar görülmedi. iF “A Taste for Waste” 403; Awwwards mobil yıllık sayfası araçta açılamadı. Dribbble'daki MetaLab/Headspace çalışması yayınlanmış masaüstü pazarlama sitesi: mobil uygulama örneği sayılmadı. Bulunan Behance yemek projelerinde yayınlanmış uygulama doğrulanamadı; konseptler ürün kanıtı yapılmadı. Erişilemeyen kaynaktan biçim detayı uydurulmadı.

## Kod öncesi dokuz biçim
| Kod / ad | Fikir ve başrol gerekçesi | Kroki | Sayfaya işleyiş | Kaydırma | Dayanak |
|---|---|---|---|---|---|
| Y1 Sofra kubbesi | Büyük beyaz kemer malzemelere davet eder; başrol yemek kararının fotoğraftan seçime geçişidir. | Fotoğrafın altına geniş, merkezde yükselen beyaz yay; yayın üstü primary. | Malzeme yüzeyi, video ayırıcısı ve bölüm başlangıçları kemer. | Yay mesafesi azalır, başlık header altında gizlenir. | HIG katman, Headspace |
| Y2 Sofranın yayı | Tabak tek büyük yayın içinde durur; başrol iştahı malzemeyle somut tarife çevirmektir. | Hero tam genişlikte aşağı bombeli elipsle sonlanır. | Video tabanı ve tarif rafının girişinde geniş yay. | Yay derinliği azalır. | M3 Shape, Headspace |
| Y3 Sofrayı aç | Fotoğrafın önündeki tutamaç malzemeleri açar; başrol kullanıcının pişirme kararına kendi temposunda girmesidir. | Tam ekran kapak, alttan çekilen beyaz yüzey. | İçerik bölüm kapakları katmanlı; tarifler büyük raf. | Sürükle veya düğmeyle içerik açılır, kapak kısalır. | HIG Sheets, M3 Motion |
| Y4 Dalga sofrası | Asimetrik dalga gözü fotoğraftan seçime taşır; başrol elindeki malzemelerle yemek bulmaktır. | İki farklı yükseklikte organik dalga, primary ikinci yüzey. | Videolar ve kategori ayırıcısında dalga. | Dalga sakin biçimde sığlaşır. | Tide Guide, M3 Shape |
| Y5 Keskin karar | Çapraz yüzey “bir sonraki adım” yönünü verir; başrol yemek kararını aşağıdaki sonuçlara taşımaktır. | Hero altı solda yüksek, sağda alçak tek diyagonal; primary şerit. | Bölüm başlarında diyagonal görsel katman. | Kesim açısı hafif azalır. | HIG Layout, M3 Shape |
| Y6 Kararın merkezi | Alt oyuk Ne Pişirsem eylemini kucaklar; başrol doğrudan tarif bulma yöntemidir. | Hero alt ortasında yuvarlak oyuk, içinde kare kontrol radius'lu eylem. | Bölüm ayırıcıları merkezde küçük oyuk; tarifler sıralı. | Eylem normal akışta kalır, header üstten devralır. | Crouton, M3 Shape |
| Y7 Bir tabak fikir | Hero'nun tüm yüzeyi tabak gibi daireseldir; başrol sofraya gelecek yemeği seçmektir. | Büyük yarım daire yüzey, içinde tabak ve dış güvenli alanda arama. | Video fotoğrafında yay, küçük bölüm işaretlerinde yarım daire. | Daire yüzeyi sığlaşır, kontrol alanı kesilmez. | Moonlitt taraması, M3 Shape |
| Y8 Masadaki kart | Kenarlardan ayrılan fotoğraf kartı seçilebilir bir yemek fikri gibi durur; başrol fikri malzemelerle sınamaktır. | Dört köşesi yuvarlak bağımsız hero, arkada primary ışıklı fotoğraf yüzeyi. | Tarif/şef bölümleri açık zeminde katmanlı; video görselli ayırıcı. | Fotoğraf kartı hafif yerleşir; azaltılmış harekette sabit. | Nibbly, CapWords, M3 Motion |
| Y9 Mutfağa pencere | Kemerli pencere yemeği çerçeveler; başrol içeri bakıp pişireceğin fikri bulmaktır. | Yukarıda geniş kemer, düz alt taban; arama pencerenin altında. | Video kapakları ve ayırıcı fotoğrafları kemerli. | Pencere yüksekliği azalır, başlık normal gizlenir. | Koto/Yazio marka tutarlılığı, HIG |

Y7, X8'in dairesel fotoğraf düğmesi değildir: hero yüzeyinin kendisi dairedir. Y8, X2'nin çevrilen kart destesi değildir: sabit yüzen yüzey ve sayfa boyunca katman ilişkisi. Y3, X6'nın scroll kapağı değildir: açık/kapalı durumu ve sürüklenebilir içerik yüzeyi vardır. Biçim farkı bu işlevsel ayrımlarla korunacak.

## Görsel eleştiri ve iyileştirme
Y1: geniş kubbe ilk bakışta okunuyor; ilk denemede içerik kemerin uçlarını örtüyordu, bindirme kaldırıldı. Y2: tek büyük yay, köşe yuvarlağından açıkça farklı; uzun tarif adı 360'ta iki satır. Y3: tam ekran yüzey ve tutamaç, açıldığında 844→584px kapak; tarayıcı scroll anchoring sıçraması önlendi, açık durumdaki öneriye koyu okunurluk yüzeyi eklendi. Y4: iki dalga katmanı ve asimetrik bölüm ayırıcısı; SVG kapalı yolunun kenar çizgisi ayrılarak ince sızıntı giderildi. Y5: diyagonal yüzey net; başlık çizgisi logo bölgesinden çıkarıldı. Y6: çentik gerçek Tarif bul panelini açıyor; üç yöntem korunuyor. Y7: hero'nun kendisi yarım daire; ilk öneri satırı daralan eğrinin dışında kalıyordu, güvenli iç alana alındı. Y8: kenarlardan ayrılmış kart ve aşağıda katmanlı yüzeyler, onaylı kart radius ailesiyle uyumlu. Y9: kemer hem hero hem video kapaklarında; arama kesim dışında güvenli alanda.

360/390/430 tam boy ve ilk ekranlar, 0–400px/20px header ölçümleri: verification/set3. 27 ekran, 567 header örneği; ölçülen genişliklerde taşma/JS hatası/ham değer yok. Dokuz WebKit 390 denemesi ve reduced-motion alfa kontrolü yapıldı. Yerel Python sunucusuna toplu isteklerde ara sıra bağlantı sıfırlanması oldu; yüklenmeyen CSS görülen çekim yeniden alındı, galeri doğrulamasında istek yoğunluğu sınırlandı. Bu bulgu ürünün veri veya CSS hatası olarak gizlenmedi.

Web ile ortak kalan veri, logo, renk, tarif kartı ve eylemler. Sayfa footer/pazarlama kompozisyonu aktarılmadı. Biçimlerin çoğu fotoğraf üstündeki aynı soru/arama işlevini korur; ayrım hero silueti, içerik birleşimi ve alt bölüm yüzeyleridir. Fotoğrafların kendi sıcak tonları vardır; yeni kahverengi renk token'ı üretilmedi.

## Üç set arasında önerilen ilk beş
1. Ana-1: onaylı, karar aracı ve yemek fotoğrafı en dengeli başlangıç.
2. X7: öğün seçiminin fotoğraf ve öneriye birlikte yansıması gerçek bir uygulama nedeni sağlıyor.
3. Y8: yüzen kart en bitmiş ve taşınabilir yeni biçim; mevcut liste/detay kart ailesiyle güçlü bağ.
4. Y1: geniş kubbe, seçim alanına en doğal ve belirgin geçiş.
5. X2: dokunma/kaydırma ile değişen deste, karar vermeyi somut ve karakterli kılıyor.
SET3 içi sıra: Y8, Y1, Y4, Y2, Y9, Y6, Y3, Y5, Y7. Y3 etkileyici ama ilk seçim için ek açma hareketi var; Y7 fotoğrafı güçlü çerçeveliyor fakat dairesel yüzey daha fazla dikey alan istiyor.
