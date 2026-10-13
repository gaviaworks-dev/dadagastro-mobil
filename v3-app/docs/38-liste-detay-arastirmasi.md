# Liste ve detay — altışar alternatif

8 Ekim 2026. Ana sayfa setleri donduruldu. Kök HTML/CSS/JS ve canlı GitHub Pages ekranları salt okunur incelendi. Kök app.css ile v3-app/app.css ve token dosyaları SHA-256 olarak aynı. Kök/canlı ilk ekranlar verification/list-detail-six altında; görülen kompozisyon aynı, canlıdaki demo üyeliği ile yereldeki misafir kapısı davranış farkı korunur.

## Korunacak nitelikler
- Fotoğraf gerçek ve baskın; metin, fotoğrafın altına doğru uzayan 10 duraklı kaynak koyu eğride okunur. app.css:323–327; detay sağ üst primary %25, screen karışım, %65 sönüm. Yeni kahverengi overlay tonu üretilmez.
- Beyaz panel 24px bindirme, sheet radius24, gutter20; fotoğraf–panel ve metin–kontrol mesafeleri korunur. Liste1'de yalnız arka banner sabit, panel onun üstünden akar. Flutter: SliverAppBar + üstüne binen içerik/sliver yüzeyi.
- Gilroy rol ölçeği; liste başlığı24, detay başlığı32, bölüm20, kart16, meta13. Aynı FA solid ikonlar,44px hedefler.
- Tarif kartında fotoğraf, süre/puan cam kapsülü, sağ üst kaydet, kategori/ad/alt başlık, zorluk-porsiyon-maliyet ve şef/görüntülenme. Kompozisyon değişse de veriler eksilmez.
- Liste arama/temizle/focus halkası; kategori; 150 kaynak filtre seçeneği; sıralama; seçili filtreler; sonuç sayısı; görünüm değiştir; sayfalama; boş durumdan çıkış.
- Detayda üçlü özet; şef/takip/açıklama; porsiyon ölçekleme; hazır malzeme ilerlemesi; alternatif ve ölçü sheet'leri; tekil/toplu alışveriş eylemi.
- Adım numarası/işaretleme, yazı boyutu, zamanlayıcı ve tam ekran pişirme modu; kaynak notları; yorum/puan; etiket; şef; benzer tarifler.
- Alt etkileşim çubuğunda Ben de Yaptım, Eline Sağlık, Yorumlar ve Pişirmeye Başla; kaydet/paylaş/daha fazla header'da. Misafir/üye eylemleri yerel önizleme; sunucuya işlem yapılmaz.
- Kaynağında olmayan besin, fırın sıcaklığı, adım medyası veya yorum üretilmez. docs/08'in koşullu kayıtları parite tablosunda açıkça belirtilir.

## Kaynak → kalıp → uygulama
- [Paprika resmî iOS kılavuzu](https://www.paprikaapp.com/help/ios/): fotoğraflı grid ve küçük görselli liste geçişi, kategori içinde arama, görünür sıralama. L2 grid, L4 liste. Detayda miktar ölçeği, adım zamanlayıcısı ve tamamlanan öğeyi işaretleme; D5 hazırlık odağı. Paprika3 kılavuzu, güncel beta arayüzü diye sunulmadı.
- [Crouton](https://crouton.app/) ve [Apple Design Awards2024](https://developer.apple.com/design/awards/2024/): güçlü bilgi hiyerarşisi; adım içinden çoklu zamanlayıcı, porsiyon/ölçü dönüştürme. D2 hızlı bölüm erişimi, D6 çalışma akışı. Resmî ürün görseli references-38/crouton.png; eller serbest göz kırpma özelliği eklenmedi.
- [Pestle](https://pestlechef.app/): rehberli pişirme, malzemeyi porsiyona ölçekleme, tarif koleksiyonu. D3 içerik sekmeleri, D4 adım kartları. Ürün ölçekleme görselinin doğrudan indirilmesi403 döndürdü; metinde açıklanan işlev esas alındı, görsel ayrıntısı atfedilmedi. SharePlay ve import gibi kapsam dışı özellikler taşınmadı.
- [Samsung Food yardım](https://support.samsungfood.com/hc/en-us/articles/18365507924372-Getting-Started-with-Samsung-Food-Save-Search-and-Share-Recipes): arama yanında kapsam filtreleri ve Apply; mutfak/öğün/diyet/süre ayrımı. L5 kategori–mutfak geçişi; L6 hızlı daraltma. Kaynak Recipe Box'a özel olduğunu söylüyor; DadaGastro'da kendi gerçek tarif havuzuna uygulanıyor.
- [Kitchen Stories alışveriş listesi](https://www.kitchenstories.com/en/stories/the-shopping-list-is-back): tariften malzemeleri topluca listeye aktarma, tarif bazında veya birleşik görünüm. D5'te alışveriş eylemi hazırlık akışının içinde görünür. [Kaydetme rehberi](https://www.kitchenstories.com/en/stories/faq-how-to-save-recipes): tarif keşfi ve kişisel koleksiyon ayrımı; L3 büyük görselde kaydet konumu tutarlı. DadaGastro'nun bookmark ikonu korunur.
- [NYT Cooking yayıncı App Store kaydı](https://apps.apple.com/us/app/nyt-cooking-quick-tasty-meals/id911422904): yemek fotoğrafı, değerlendirme/notlar, filtre paneli ve Cook Mode. L3 kapak akışı, L6 farklı ölçekli grid. Uygulamanın ücretli oturum içi bütün ekranları görülmedi; yayıncı görselleri ve açıklaması esas alındı.
- [SideChef](https://www.sidechef.com/download/): adım adım yönlendirme ve fotoğraf/video ile pişirme. D4'te adımlar sırayla; kaynakta olmayan adım fotoğrafı eklenmez.
- [Apple WWDC26 — Design intuitive search experiences](https://developer.apple.com/videos/play/wwdc2026/292/): aramanın konumu kapsamını anlatır; büyüteç, sabit placeholder ve metin varken temizle korunur. L1–L6 yalnız tarif araması, ana sayfanın genel aramasıyla karışmaz. Metin transkripti incelendi.
- [Apple HIG Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): kademeli ek araçlar, tek sheet ve anlaşılır kapatma. Tüm filtre/ölçü/alternatif panelleri mevcut ortak native dialog ailesini kullanır.
- [Material3 bottom sheets](https://m3.material.io/components/bottom-sheets/guidelines): web aracı JS sayfasını metne dönüştüremedi; bu sayfanın özel ayrıntıları görülmüş gibi kullanılmadı. Ortak sheet davranışı mevcut doğrulanmış bileşenden gelir.

## Kod öncesi fikirler
| Ekran | Ad | Fikir | Ayrışan eksen |
|---|---|---|---|
| L1 | Sabit kapak | Beğenilen tasarımda banner arkada durur, beyaz tarif paneli üstüne çıkar. | Referans + katman hareketi |
| L2 | Görsel katalog | Kompakt kapaktan sonra görselli kategori şeridi ve eşit iki sütun. | Kategori seçimi + saf grid |
| L3 | Büyük iştah | Her tarif büyük bir fotoğraf kapağı olarak akar; kaydet ve kısa bilgiler elde kalır. | Tek sütun büyük kart |
| L4 | Hızlı karşılaştır | Kısa üst alan ve görselli satırlar süre, puan ve şefi hızla karşılaştırır. | Liste satırı + kategori seçici |
| L5 | Mutfak rafları | Kategori veya dünya mutfağıyla daralt; tarifleri iki sıralı yatay rafta keşfet. | Kapsam geçişi + raf |
| L6 | Seçki ızgarası | Büyük ve ikili kartların değişen ritmi, filtrelenebilir bir görsel katalog kurar. | Karma grid + hızlı süre seçimi |
| D1 | Referans | Tavuk Curry'nin beğenilen kapak, panel ve tek akış düzeni aynen kalır. | Değişmeyen referans |
| D2 | Tarif rehberi | Kısa kapak, beyaz başlık ve yapışkan bölüm kısayollarıyla doğrudan gereken yere git. | Başlık panelde + bölüm gezinmesi |
| D3 | Kapaktan mutfağa | Büyük kapaktan sonra Malzemeler/Yapılış/Hakkında sekmeleriyle tek işe odaklan. | Uzun kapak + gerçek içerik sekmeleri |
| D4 | Adım kartları | Bölünmüş kapak ve sırayla ilerlenen adımlar, hazırlıktan pişirmeye eşlik eder. | Bölünmüş kapak + adım carousel |
| D5 | Hazırlık masası | Yüzen fotoğraf kartından malzeme kontrolüne ve alışverişe geç. | Kart kapak + hazırlık yüzeyi |
| D6 | Pişirme defteri | Kompakt görsel özette tarifi tanı, önce adımları gör; malzemelere tek dokunuşla dön. | Kompakt kapak + adımlar önce |

L1'de kaynak ilk öne çıkan kart korunur; altında çift satır için sayfada1+8 kart gösterilir. Filtre sonucu tek son öğe kalırsa tam satıra yayılır; tarif atılmaz veya kopyalanmaz. Diğer gridlerde sayfa8 kart. Her ekranda aynı gerçek32 tariflik yerel veri kullanılır; banner'daki6.112 web toplamı ile yerel sonuç sayısı birbirine karıştırılmaz.

## Doğrulanan özellik paritesi

V: Tavuk Curry ekranında mevcut; ilgili eylem tarayıcıda sınandı (statik bilgi satırları kaynak DOM/veri ile karşılaştırıldı).
K: Tavuk Curry kaynağında yok; ortak özellik korunuyor ve gerçek Sagdana verisiyle altı alternatifte sınandı.
K0: Tavuk Curry verisinde yok; kaynak koşullu dalı korunuyor, bu tur o içerikle çalıştırılmadı. Başarı diye sayılmaz.
Z: docs/08'de zaten ZAYIF olan, örnek veri bulunmayan dal; gerçek içerikle doğrulanmadı.
Üye eylemleri yerel önizlemedir. Sunucu kaydı, gerçek yorum gönderimi veya sosyal paylaşım yapılmadı.

| docs/08 özelliği | D1 | D2 | D3 | D4 | D5 | D6 |
|---|---|---|---|---|---|---|
| Malzeme grupları | V | V | V | V | V | V |
| Malzeme adı ve notu | V | V | V | V | V | V |
| Miktar ve birim | V | V | V | V | V | V |
| Porsiyon ölçekleme | V | V | V | V | V | V |
| Ölçü karşılığı | V | V | V | V | V | V |
| Malzeme işaretleme | V | V | V | V | V | V |
| Alternatif göstergesi | K | K | K | K | K | K |
| Alternatif kaynak notları | K | K | K | K | K | K |
| Tek tek alışveriş listesine ekle | V | V | V | V | V | V |
| Toplu alışveriş listesine ekle | V | V | V | V | V | V |
| Alternatifle değiştir | K | K | K | K | K | K |
| Değişikliği geri al | K | K | K | K | K | K |
| Bilinen alternatif miktarını ölçekle | K | K | K | K | K | K |
| Hazırlık ve pişirme süresi | V | V | V | V | V | V |
| Zorluk ve porsiyon | V | V | V | V | V | V |
| Fırın sıcaklığı (veri varsa) | K0 | K0 | K0 | K0 | K0 | K0 |
| Mutfak ve diyet | V | V | V | V | V | V |
| Maliyet | V | V | V | V | V | V |
| Kategori bağlantısı | V | V | V | V | V | V |
| Püf noktası | K0 | K0 | K0 | K0 | K0 | K0 |
| Hatırlatma | V | V | V | V | V | V |
| Porsiyon başına besin değerleri | K | K | K | K | K | K |
| Sekiz besin alanı | K | K | K | K | K | K |
| Makro oranları | K | K | K | K | K | K |
| Tahmin açıklaması | K | K | K | K | K | K |
| Fotoğraf galerisi | V | V | V | V | V | V |
| Açıklama aç/kapa | V | V | V | V | V | V |
| Adım metinleri | V | V | V | V | V | V |
| Adım işaretleme | V | V | V | V | V | V |
| Adım zamanlayıcısı | V | V | V | V | V | V |
| Pişirme modu | V | V | V | V | V | V |
| Yazı boyutu | V | V | V | V | V | V |
| Benzer tarifler | V | V | V | V | V | V |
| Şef kartı | V | V | V | V | V | V |
| Şefi takip et | V | V | V | V | V | V |
| Puan ver | V | V | V | V | V | V |
| Yorum yaz | V | V | V | V | V | V |
| Yoruma fotoğraf ekle | V | V | V | V | V | V |
| Puan filtreleri | K | K | K | K | K | K |
| Yorum beğen | K | K | K | K | K | K |
| Yorum yanıtla | K | K | K | K | K | K |
| Yorum bildir | K | K | K | K | K | K |
| Kendi yorumunu düzenle | K | K | K | K | K | K |
| Kendi yorumunu sil | K | K | K | K | K | K |
| Etiketler | V | V | V | V | V | V |
| Paylaşım kanalları | V | V | V | V | V | V |
| Bağlantıyı kopyala | V | V | V | V | V | V |
| Tarifi kaydet | V | V | V | V | V | V |
| Misafir giriş kapısı | V | V | V | V | V | V |
| Yazdır | V | V | V | V | V | V |
| Ben de Yaptım sayacı ve görünür kısayol | V | V | V | V | V | V |
| Eline Sağlık sayacı ve görünür kısayol | V | V | V | V | V | V |
| Yorumlar alt kısayolu | V | V | V | V | V | V |
| Adım fotoğrafı / video | Z | Z | Z | Z | Z | Z |
| Koşullu mağaza ürünleri | Z | Z | Z | Z | Z | Z |

Tavuk Curry: 9 malzeme, 4 adım, 55 dakika, 4 kişilik; porsiyon artırınca6 kişi ve ilk malzeme750g. Kaynaktaki Hatırlatma bölümü korunur; ayrıca Püf Noktası başlıklı metin uydurulmaz. Besin tablosu, alternatif malzemeler ve mevcut yorum satırları bu tarifte yok. Sagdana'da gerçek alternatif120g→180g ölçeklendi, geri alma çalıştı;8 besin alanı, makrolar, tahmin açıklaması, yorum filtresi/yanıt/bildirim ve sahip düzenle/sil yerel durumları doğrulandı. Her altı galeri ekranı yine Tavuk Curry açar.

D3: Malzemeler, Yapılış, Hakkında panelleri aynı kaynak düğümlerini taşır; saklanan bilgi silinmez. Yorumlar, şef ve benzer tarifler sekmelerin altında ortaktır. Klavyede sağ/sol/Home/End çalışır. D4:4 adımlı yatay rafta önceki/sonraki ve kaydırma; her adımın kendi zamanlayıcısı ve tamamla eylemi korunur. Tam ekran pişirme modu ayrıca erişilebilir.

## Tarayıcı kanıtı ve sınırlar
- `verification/list-detail-six/qa.json`:12 ekran ×360/390/430 =36 tam boy görüntü;756 header ölçümü (0–400px/20). JS hatası ve yatay sayfa taşması yok; ham null/undefined/NaN görünmedi. L5'in yatay rafında viewport dışında kalan görseller lazy-load olduğu için ilk ölçümde boş görülebilir; görünen kartlar ve kaydırma ayrı sınandı.
- `interactions.json`: arama/temizle/boş durum, kategori,150 filtre seçeneği, sıralama, görünüm, son sayfa; detay açıklama/porsiyon/malzeme/ölçü/alışveriş/timer/pişirme/galeri/paylaş/yazdır/kaydet/takip/yorum formu. İlk L5 mutfak kontrolünde test seçicisi yanlış yazılmıştı; `supplemental.json` doğru görünür düğme ile tekrar: Türk Mutfağı11 sonuç, temizlenince32.
- `supplemental.json`: altı listede süre sırası gerçekten artan;12 ekranda WebKit390 genişlik ve JS kontrolü; alternatif içi bağlantılar eski dosyalara kaçmıyor. Reduced-motion kaynakta metin eşiğinde tek adımda solid olur; normal harekette48px içinde kademeli. `final-interactions.json`: detayların600px reduced-motion alfa1, gerçek tarayıcı panosuna tarif URL'si kopyalandı, yorum fotoğrafı seçme/çıkarma yerel formda çalıştı.
- `conditional.json`:6 detayda gerçek Sagdana ile koşullu özellikler. Sosyal kanallar yalnız görünürlük/bağlantı kontrolü; dışarı gönderim yapılmadı. Yazdır testinde sistem yazdırması yakalandı, kağıt çıktısı üretilmedi.
- Liste1: banner top0 ve başlık koordinatı0/120/300/600 kaydırmada sabit. Panel yukarı ilerliyor;300px'de sticky araçların üstü68px header altıyla aynı, radius0; başlangıç24px.360/390/430 ölçüldü. Flutter karşılığı SliverAppBar ve üstüne binen içerik/sliver yüzeyi.
- Sayfalar tam ve aynı gerçek32 tarifle çalışır. L1 sayfada1 büyük+8 küçük; son sayfa1+4. Diğerleri8 kart; tek filtre sonucu oluşursa kart tam satıra yayılır. Kart eksiltilmez/çoğaltılmaz. L5 yatay iki sıralı raf kendi içinde kayar.
- `gallery.json`: iki galeride12 iframe390×844 ve scroll0.1440px3 sütun,1000px2,600px1; taşma yok.1440 tam boy galeri görüntüleri görüldü.
- `protected-result.json`: başlangıç dosyalarından yalnız eski iki galeri yönlendirmesi ve ana galeriye istenen iki bağlantı değişti. Ana sayfa27 kaynakları, kök, yayin, Laravel değişmedi. Git add/commit/push yok. Önceden kirli olan kök/docs dosyaları korunur.
- Kontrast için yeni bütün piksel/renk kombinasyonlarına kapsamlı başarı iddiası yok; kaynak renk ve overlay ailesi korunup verilen genişliklerde görüntüler incelendi.

## Görüntüye bakarak ikinci tur
- L1: referans korunuyor; sabit kapak üstünde panelin köşesi yapışınca düzleşti.9 kartın1+8 kompozisyonu yetim satırı giderdi.
- L2:360'da kategori fotoğrafı ve yazısı aynı44px dokunma ailesinde; iki kart ilk ekranda görülebiliyor. En dengeli keşif yoğunluğu.
- L3: fotoğraf güçlü, fakat sekiz tarif için daha çok dikey kaydırma gerekiyor; kart başlığı büyük fotoğrafa göre güçlendirildi.
- L4:120px fotoğraflı satırda süre/puan tek dikey meta ve metin alanı ayrıldı;360'da uzun başlıklar iki satırda kesiliyor, meta korunuyor.
- L5: ilk rafın bir sonraki kolonu görünür; tek dikey akış isteyenler için görünüm düğmesi var. Boş filtre nesnesi sonrasında mutfak seçeneklerinin güvenli çalışması düzeltildi.
- L6: büyük+ikili ritim korunuyor; son tek kart tam genişlikte. Süre seçiminin boş filtre durumu düzeltildi.
- D1: referans görseli aynen; kaynak dar ekranda gövde metni satır sayısına göre justify davranışını koruyor.
- D2: fotoğraf iştah açıcı ve bütün, başlık beyaz zeminde net. Taşınan puan/maliyet metninin beyaz rengi ve text-shadow'u düzeltildi.
- D3: kapak ve tek işe odaklanan içerik sekmeleri ayrışıyor; varsayılan tam boy görüntü yalnız Malzemeler'i gösterir. Diğer iki durum da ayrı görüntülendi.
- D4: ilk denemede kapak referansa fazla benziyordu; başlık sol üstte iki satıra, fotoğraf sağdaki sahneye taşındı. Uzun alt başlık360'da sarılıyor. Adım kartları sırayla okunuyor.
- D5: porsiyon eksi/artı ikonları açık zeminde soluk kalmıştı, primary koyu renk düzeltildi. Fotoğraf kartı ile açık hazırlık yüzeyi aynı kart ailesinde.
- D6: ilk denemede üstteki yazı yüzünden yemek kararıyordu; başlık beyaz panele, üçlü özet fotoğrafın altına taşındı. Adımlar ilk içerik oldu; malzemelere yapışkan kısayol var.
- D2/4/5/6 özel maske katmanlarında kaynak detay primary ışığı (%25 /65 sönüm/screen) tekrar eklendi; son görüntüler yenilendi.

## Öneri ve sıralama
Liste: **L2 > L1 > L6 > L4 > L3 > L5**. L2 fotoğraf, sonuç yoğunluğu ve kategori erişimini dengeler; L1 onaylı referansın en düşük değişiklikli devamıdır. L6 daha editoryal, L4 karşılaştırma odaklı; L3 uzun akış, L5 yatay iki sıra nedeniyle daha fazla keşif hareketi ister.

Detay: **D2 > D1 > D6 > D5 > D3 > D4**. D2 tabağı net bırakıp başlığı ve bölüm erişimini rahatlatır. D1 kanıtlanmış referanstır. D6 pişirmeye geçmek isteyen için, D5 hazırlık ve alışveriş için iyi; D3 sekmeli odağı, D4 adım rafı ise daha belirgin bir etkileşim tercihi gerektirir.

Önerilen çift: **Liste2 + Detay2**. Nihai seçimi kullanıcı yapar; kök/canlıya yerleştirme bu turda yapılmadı.

## Sunum dosyaları
- [Liste galerisi](../liste-alti.html) · [Detay galerisi](../detay-alti.html)
- [Liste: canlı + altı ilk ekran](../verification/list-detail-six/liste-reference-six.png)
- [Detay: canlı + altı ilk ekran](../verification/list-detail-six/detay-reference-six.png)
- [Liste altı ekran](../verification/list-detail-six/liste-six-strip.png) · [Detay altı ekran](../verification/list-detail-six/detay-six-strip.png)
- `review-liste-N.png` ve `review-detay-N.png`:her alternatifin360/390/430 tam boy görüntüsü yan yana.
- Eski iki galeri `eski/liste-detay-onceki/` içinde; eski URL'ler yeni galeriye yönlenir.


## SET 2 yapı kalıpları — 8 Ekim 2026
Yayın işi tamamlandıktan sonra başlandı. SET 1 dosyaları ve canlı paket donduruldu. Yalnız v3-app; bu tur git/yayın yok.

### SET 1 envanteri
L1 sabit kapak; L2 görsel katalog; L3 büyük iştah; L4 hızlı karşılaştır; L5 mutfak rafları; L6 seçki ızgarası. D1 referans; D2 tarif rehberi; D3 kapaktan mutfağa; D4 adım kartları; D5 hazırlık masası; D6 pişirme defteri.

### Kaynak, alınan yapı ve sınır
- [Pestle](https://pestlechef.app/): rehberli pişirme ve porsiyon/ölçü ölçekleme açıklamaları yeniden okundu. DX1 adım odağı, DX4 hazırlık kontrolü. SharePlay ve veri içe aktarma kapsam dışı; eklenmedi.
- [SideChef resmî SSS](https://www.sidechef.com/faq/): mutfak, süre ve malzemeyle filtreleme; porsiyondan alışveriş listesine geçiş. LX5 mutfak sahnesi, LX6 canlı araç, DX3 bölünmüş çalışma alanı. Alışveriş yerel önizleme olarak kalır.
- [Pinterest rehberi](https://help.pinterest.com/en/guide/all-about-pinterest): görsel keşif, arama ve panolarda toplama. LX3 değişken fotoğraf oranları, LX2 seçilenleri alt rafta toplama. Kart destesi hareketi bizim yorumumuz; Pinterest'te görüldüğü iddia edilmez.
- [Material carousel araştırması](https://m3.material.io/blog/material-3-carousel-research-design): arama özeti erişilebilir; tam metin JS nedeniyle okunamadı. LX4 yatay raflar ve LX2 destede görünen devam sinyali tasarım çıkarımıdır.
- [Apple HIG Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views): JS gerektirdiğinden tam metin erişilemedi; platforma özel iddia yok. LX1/DX2 scroll-snap sahneleri yerel yorum, reduced-motion anlık.
- docs/38'in önceki Paprika, Crouton, NYT Cooking ve Kitchen Stories kaynakları ortak bileşen ve parite tabanı olarak korunur. DX5 editoryal uzun okuma, DX6 kapak + yönlendirilmiş adımlar bizim kompozisyon kararımızdır.

### Kod öncesi on iki fikir
| Ekran | Ad | Fikir ve yapı |
|---|---|---|
| LX1 | Lezzet akışı | Tam yüksek tarif kapaklarını yukarı kaydır; arama ve filtreler yüzen araçlarda kalır. |
| LX2 | Seçim destesi | Kartı geç veya kaydet; seçtiklerin alttaki rafta birikir. |
| LX3 | Görsel pano | Değişken fotoğraf oranlarıyla iki sütun masonry; yüzen filtreyle panoyu daralt. |
| LX4 | Kategori sahneleri | Dikeyde kategoriler, her sahnede yatay tarifler; tek kategoriyi seçerek odaklan. |
| LX5 | Mutfak rotası | Görsel mutfak atlasında ülkeyi seç; gerçek mutfak etiketleriyle sonuçlar birlikte değişsin. |
| LX6 | Karar masası | Süre, zorluk ve malzeme sınırlarını değiştir; görselli karşılaştırma satırları canlı daralsın. |
| DX1 | Ocak başı | İlk ekranda adım ve zamanlayıcı; malzemeleri alttan panelde aç. |
| DX2 | Tarif hikâyesi | Kapak, malzemeler ve her adım dikey tam ekran bölümleri oluşturur. |
| DX3 | İki alan | Fotoğraf üstte sabit kalır; tarif alttaki bağımsız çalışma alanında kayar. |
| DX4 | Hazır oldukça | Malzemeler ve adımlar tek kontrol listesi; ortak ilerleme hazır olma durumunu gösterir. |
| DX5 | Şefin sayfası | Gerçek şef bilgisi ve kaynak notlarını öne alan editoryal tarif okuması. |
| DX6 | İzlemeden de pişir | Video sahnesi düzeninde gerçek kapak; video yokken dürüstçe adımlı pişirmeye geçiş. |

Renk/font/radius için yeni sistem yok: mevcut Gilroy rol tokenları, domates, kaynak koyu overlay ve %25 screen primary ışık; kontrol12/kart24. Yapısal imzalar: LX1 ekran, LX2 deste, LX3 kolon, LX4 çapraz akış, LX5 coğrafi seçim, LX6 araç; DX1 aktif adım, DX2 bölüm sahneleri, DX3 iki ayrı scroll alanı, DX4 ilerleme, DX5 kaynak notları, DX6 kalıcı medya alanı.
Tavuk Curry'de adım fotoğrafı/video yok; DX3 adım seçimini üstteki etikette gösterir, aynı fotoğrafı başka adım fotoğrafı gibi sunmaz. DX6 zaman damgası üretmez; kapaktaki eylem “Adımlarla pişir”dir.


### SET 2 parite tablosu
V: Tavuk Curry üzerinde kaynak DOM ve ilgili eylem tarayıcıda doğrulandı. K: başka gerçek tarifle koşullu özellik doğrulandı. K0: veri yok, başarı iddiası yok. Z: docs/08'de zaten zayıf olan veri dalı; uydurulmadı. Boş hücre yok.
Püf içeriği kaynakta “Hatırlatma” başlığını taşır; aynı metin korunur, yeni bir “Püf Noktası” metni/başlığı yazılmadı. Üyelik, alışveriş, yorum ve takip yerel prototip durumudur; canlı veri yazılmadı.

| docs/08 özelliği | DX1 | DX2 | DX3 | DX4 | DX5 | DX6 |
|---|---|---|---|---|---|---|
| Malzeme grupları | V | V | V | V | V | V |
| Malzeme adı ve notu | V | V | V | V | V | V |
| Miktar ve birim | V | V | V | V | V | V |
| Porsiyon ölçekleme | V | V | V | V | V | V |
| Ölçü karşılığı | V | V | V | V | V | V |
| Malzeme işaretleme | V | V | V | V | V | V |
| Alternatif göstergesi | K | K | K | K | K | K |
| Alternatif kaynak notları | K | K | K | K | K | K |
| Tek tek alışveriş listesine ekle | V | V | V | V | V | V |
| Toplu alışveriş listesine ekle | V | V | V | V | V | V |
| Alternatifle değiştir | K | K | K | K | K | K |
| Değişikliği geri al | K | K | K | K | K | K |
| Bilinen alternatif miktarını ölçekle | K | K | K | K | K | K |
| Hazırlık ve pişirme süresi | V | V | V | V | V | V |
| Zorluk ve porsiyon | V | V | V | V | V | V |
| Fırın sıcaklığı (Pasteis, 220°C) | K | K | K | K | K | K |
| Mutfak ve diyet | V | V | V | V | V | V |
| Maliyet | V | V | V | V | V | V |
| Kategori bağlantısı | V | V | V | V | V | V |
| Püf içeriği: kaynak Hatırlatma metni | V | V | V | V | V | V |
| Hatırlatma | V | V | V | V | V | V |
| Porsiyon başına besin değerleri | K | K | K | K | K | K |
| Sekiz besin alanı | K | K | K | K | K | K |
| Makro oranları | K | K | K | K | K | K |
| Tahmin açıklaması | K | K | K | K | K | K |
| Fotoğraf galerisi | V | V | V | V | V | V |
| Açıklama aç/kapa | V | V | V | V | V | V |
| Adım metinleri | V | V | V | V | V | V |
| Adım işaretleme | V | V | V | V | V | V |
| Adım zamanlayıcısı | V | V | V | V | V | V |
| Pişirme modu | V | V | V | V | V | V |
| Yazı boyutu | V | V | V | V | V | V |
| Benzer tarifler | V | V | V | V | V | V |
| Şef kartı | V | V | V | V | V | V |
| Şefi takip et | V | V | V | V | V | V |
| Puan ver | V | V | V | V | V | V |
| Yorum yaz | V | V | V | V | V | V |
| Yoruma fotoğraf ekle | V | V | V | V | V | V |
| Puan filtreleri | K | K | K | K | K | K |
| Yorum beğen | K | K | K | K | K | K |
| Yorum yanıtla | K | K | K | K | K | K |
| Yorum bildir | K | K | K | K | K | K |
| Kendi yorumunu düzenle | K | K | K | K | K | K |
| Kendi yorumunu sil | K | K | K | K | K | K |
| Etiketler | V | V | V | V | V | V |
| Paylaşım kanalları | V | V | V | V | V | V |
| Bağlantıyı kopyala | V | V | V | V | V | V |
| Tarifi kaydet | V | V | V | V | V | V |
| Misafir giriş kapısı | V | V | V | V | V | V |
| Yazdır | V | V | V | V | V | V |
| Ben de Yaptım sayacı ve görünür kısayol | V | V | V | V | V | V |
| Eline Sağlık sayacı ve görünür kısayol | V | V | V | V | V | V |
| Yorumlar alt kısayolu | V | V | V | V | V | V |
| Adım fotoğrafı / büyütme (Jiao Yan) | K | K | K | K | K | K |
| Video (bu gerçek tariflerde yok) | K0 | K0 | K0 | K0 | K0 | K0 |
| Koşullu mağaza ürünleri | Z | Z | Z | Z | Z | Z |

### SET 2 doğrulama ve ikinci tur eleştiri
- 12 ekran × 360/390/430 = 36 ilk ekran ve tam sayfa görüntüsü: `verification/list-detail-set2/capture-all-360,390,430.json`. Yatay taşma, JS hatası ve ham null/undefined/NaN görülmedi. Chromium; ayrıca12 ekran WebKit390 kontrolü temiz.
- 12 temel etkileşim senaryosu (`interactions.json`): arama, temizle, boş durum, kategori,150 filtre seçeneği, sıralama; detay9 malzeme/4 adım,6 porsiyon/750g, ölçü, alışveriş, işaretleme, timer, pişirme, galeri,6 paylaşım kanalı, yazdır, kaydet/takip/yorum formu. Sosyal mesaj gönderilmedi; yazdır çağrısı yakalandı.
- Sagdana (`conditional.json`): alternatif120g→180g, geri alma, tekil sepet,8 besin alanı, yorum filtre/beğen/yanıt/bildir/düzenle/sil; altı detayda geçti.
- Gerçek Jiao Yan Karides (`media-conditions.json`): adım fotoğrafı büyütme,1600px kaynak görsel decode başarılı;6/6. SET 2 galeri girişinde göreli `/varliklar/` yolu kaynak siteye tamamlandı. SET 1 kodu değiştirilmedi. Pasteis de Feijao:220°C kaynak fırın bilgisi6/6.
- Yapısal testler (`structures.json`): LX2 geç hareketi ve1 kaydın alt rafta belirmesi; LX3 üç farklı fotoğraf yüksekliği; LX4 yatay raf ve kategori seçimi; LX5 Türk Mutfağı11 sonuç; LX6 60dk/orta/12malzeme sınırlarında15 gerçek eşleşme. Bütün altı liste en hızlı sıralamada artan süre döndürüyor.
- DX1 adım2/4 ve9 malzemeli panel; DX2 dört676px adım sahnesi; DX3 belge scroll0 iken iç panel1500px, fotoğraf354px→253px; DX4 malzeme+adım ortak ilerleme; DX5 gerçek Doruk Solmaz bilgisi ve içindekiler; DX6 sticky medya top0 ve dürüst Adımlarla pişir eylemi çalıştı.
- DX3 tam boy sayfa görüntüsü sabit iki alanı gösterir. İç panelin tamamı `split-panel-0...` ardışık gerçek ekran görüntülerinde ayrıca belgelenir; bunlar tek uzun sayfaymış gibi sunulmaz. DX1 diğer adımlar ve malzeme sheet'i ayrı durum kanıtlarıdır.
- Galeriler:12+12 iframe390×844, scroll0.1440px3 sütun,1000px2,600px1; JS hatası/taşma yok. SET 1 ekran dosyalarına dokunulmadı, yalnız iki galeriye SET 2 eklendi.
- LX1: görsel baskın ve gerçek tam ekran keşif; uzun32sahne kaydırma maliyeti bilinçli. Sonunda açık bitiş ve başa dön var. Koyu sonuç sayacı beyaza düzeltildi. Boş durumda header kontrastı korundu.
- LX2: ilk denemede düğmeler dock altında kalmıştı; deste320px'e çekildi ve eylemler ilk ekrana alındı. Arkadaki kartlar inert; kaydetme üye kapısını atlamaz.
- LX3: kaynak grid yerine değişken fotoğraf oranlı, kolonları dengelenen masonry. Okuma sırası kolon akışıdır; eşit satır taklidi yapılmaz. Tek sonuç tam genişliğe yayılır. Filtre düğmesi dock üstünde.
- LX4: ilk denemedeki yinelenen giriş banner'ı kaldırıldı; doğrudan kategori sahnesi ve yatay tarifler açılıyor. Açık düğmedeki beyaz yazı primary koyuya düzeltildi.
- LX5: küre dekoru navigasyon ikonu değil, mutfak seçiminin görsel bağlamıdır; coğrafi koordinat haritası iddiası yok. Ülkeler kaynak mutfak etiketleri; yalnız veriyle eşleşenler gösterilir.
- LX6: üst görsel ve kaydırıcılar kısaltıldı; ilk sonuç ilk ekranda görünür. Filtreler ayrı form sayfası değil, sonuçların hemen üstündeki karar aracıdır.
- DX1: bir adımın net odağı ile timer/sonraki/malzeme paneli. Giriş bölümündeki gereksiz sınır ve küçük adım numarası güçlendirildi; diğer bütün tarif bilgileri aşağıda.
- DX2: yalnız büyük hero değil; malzemeler ve her adım ayrı sahne. Uzun okumayı sevmeyen için fazla kaydırma ister, ikinci plandaki seçenek.
- DX3: eski content-panel bindirmesi kaldırıldı, üstteki durum etiketi açığa çıktı; alt alan bağımsız. Adım fotoğrafı kaynakta varsa değişir, Tavuk Curry'de aynı kapak kullanılır ve adım fotoğrafı olduğu iddia edilmez.
- DX4: kontrol listesi ilk içerik; hazırlık ve pişirme tek ilerlemede. Porsiyon ve işaretleme birbirinden bağımsız çalışır.
- DX5: önce şef/kaynak notları, sonra içindekiler ve tarif. Uydurma şef hikâyesi yok; kısa gerçek profil bilgisi kullanıldı.
- DX6: beyaz panele taşınan puan/metin renkleri düzeltildi. Kaynakta video olmadığı açık; uydurma süre, zaman damgası veya oynatıcı yok. Eylem gerçek adımlı pişirme modunu açıyor.
- İlk ekranlar canlı referans ve SET 1/2 ile yan yana incelendi. İki satırlı kart, kaynak logo/ikon/renk ve dock ortak; düzen ve hareket farklı. Yeni tüm piksel kombinasyonlarında kapsamlı kontrast başarısı iddiası yok.

### İki set birlikte sıralama
Liste: **LX4 > L2 > LX6 > L1 > LX2 > LX3 > L6 > LX5 > L4 > LX1 > L3 > L5**.
LX4 güçlü görsel kategoriyi gerçek yatay keşifle birleştiriyor; L2 en dengeli alışılmış katalog. LX6 karar sürecini kısaltıyor. LX2 seçim yapmak için etkili ama desteyi öğrenmek gerekiyor. LX3 görsel yoğun, LX5 dünya mutfağı niyetinde iyi; LX1 tek tarif odağı karşılaştırmayı yavaşlatıyor.
Detay: **DX4 > D2 > DX1 > D1 > DX3 > D6 > DX5 > D5 > DX2 > D3 > DX6 > D4**.
DX4 pişirme işini görünür ilerlemeye çeviriyor; D2 en dengeli genel kullanım. DX1 ocağın başında en iyi odak. DX3 iki scroll bölgesi nedeniyle biraz öğrenme ister. DX5 okumayı, DX2 hikâye gezinmesini sevenler için; DX6 gerçek video verisi olmadan medya fikrinin potansiyelini tam kullanamıyor.
Önerim: keşif için **Liste X4**, pişirme için **Detay X4**; daha alışılmış akış isteyen için SET 1 Liste2/Detay2 hâlâ güçlü.

### SET 2 sunumu
- [Liste galerisi](../liste-alti.html) · [Detay galerisi](../detay-alti.html)
- [Liste SET 2 ilk ekranlar](../verification/list-detail-set2/liste-six-strip.png)
- [Detay SET 2 ilk ekranlar](../verification/list-detail-set2/detay-six-strip.png)
- [Liste canlı/SET 1 karşılaştırma](../verification/list-detail-set2/liste-reference-six.png) · [Detay canlı/SET 1 karşılaştırma](../verification/list-detail-set2/detay-reference-six.png)
- Bu yeni SET 2 yereldir. Önce tamamlanan yayında27 ana sayfa ve SET 1'den6 liste/6 detay vardır; SET 2 o yayına dahil değildir.

### Karar masası kontrol revizyonu
Ham kaydırıcılar kaldırıldı. Beyaz 202px kontrol alanında süre chipleri, üçlü zorluk segmenti ve malzeme aralıkları var; tek kriterin seçenekleri açılıyor. Başlangıç nötr. 360/390/430: yatay taşma ve JS hatası yok, görünür hedefler en az44px. 1 saat / Kolay / 6–10 malzeme =7 gerçek tarif; 15dk altı / Zor / 6–10 =0 ve kriterleri gevşet açıklaması; temizle =32. Önceki kaydırıcı ölçümleri bu revizyonla geçersizdir. Kanıt: verification/karar-masasi/qa.json.
