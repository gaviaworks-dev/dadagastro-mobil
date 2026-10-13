# 36 — İki aile, on beş ana sayfa

8 Ekim 2026. Yalnız `v3-app`. Kök, Laravel, marka, liste, detay, `yayin` ve canlı salt okunur. Git add/commit/push yapılmadı. Önceki onaylı altı kaynak `eski/set1-alti-onayli` içinde korunur. `ana-a` ve `ana-1` aynı referanstır; ana-a bağlantısı çalışmaya devam eder.

## Kaynak-transfer: primary ışık

Kök `tarif-detay.html` → `app.css:292,324` → `.detail-shade`: primary tokenının %25 saydam türevi, radyal %0 başlangıç / %65 sönüm, `screen, normal` karışımı. Koyu taban `--overlay`; mevcut geometrik overlay eğrisi korunur. Önceki ana ışık %16 idi; `hero-light.css` ortak değişkeni %25'e çıkarıldı. Yön istenen sol üst; yükseklik header + üç 48px spacing tokenıyla sınırlı. Böylece primary tabağa kadar yayılmaz. SET 2'nin açık başlangıçlarında aynı primary vurgusu header ve görselli ayırıcıda; yeni bir koyu hero zorlanmadı.

Kaynak yoğunluğu aynı; fotoğraf ve koyu taban farklı olduğu için algılanan parlaklık piksel piksel aynı değildir. Fotoğraflı bölüm ayırıcılarında aynı primary25/radial65/screen ve kaynak koyu overlay kullanılır. Tarif detay ekranı yalnız okundu. Kanıt: `../verification/set15/detail-source.json`, `light-comparison.png`.

## Araştırma yöntemi ve sınırı

Önceki 16 uygulamanın 80 yayıncı mağaza görseli tekrar karşılaştırıldı (`references-35/manifest.json`, contact0–3). Bu tur 8 uygulamadan 40 yeni görsel indirildi (`references-36/manifest.json`, contact0–1). Bunlar yayıncı tanıtım kareleridir; giriş yapılmış gerçek oturum kaydı değildir. Görselde bulunmayan kaydırma/kişiselleştirme davranışları varsayılmadı. Aşağıda “uyarlama” bizim tasarım kararıdır. Ödül sayfaları değerlendirme gerekçesi için kullanıldı; her referansın ödüllü olduğu iddia edilmez.

**Erişim sınırı:** Yummly Play kaydı 404; yummly.com KitchenAid tarif kataloğuna yönleniyor. Güncel Yummly ana ekranı incelenmiş sayılmadı. iF sayfası tam açılışta403; arama özeti erişilebilir. Awwwards PDF tam açılışta zaman aşımı; yalnız Mobile Excellence ölçütleri doğrulanabildi. Bunlardan doğrulanmamış ekran kalıbı üretilmedi.

## Uygulama → somut kalıp → uygulandığı yer

| Uygulama / kaynak | Açılış, arama, içerik/kişi/video ve gezinme gözlemi | DadaGastro uyarlaması |
|---|---|---|
| [NYT Cooking](https://play.google.com/store/apps/details?id=com.nytimes.cooking&hl=en) | Fotoğraf ve kısa tarif bilgisi; tanıtımda ayrı tarif videosu rafı. Tarif, yazar ve kaydet eylemi birlikte. Oturuma özel ana ekran doğrulanmadı. | 1: fotoğraflı cevap; 9: iki tarifi karşılaştırma. Şefin adı kartın gerçek verisinden gelir. |
| [Samsung Food](https://play.google.com/store/apps/details?id=com.foodient.whisk&hl=en) | Plan/For you/Queue sekmeleri; gün/öğün başlıkları altında küçük tarif satırları. Büyük hero zorunlu değil. | 2: gerçek öğün filtreleri; 8: niyete göre daraltma; X6: kısa dizin. Sahte kayıtlı geçmiş yok. |
| [Tasty](https://play.google.com/store/apps/details?id=com.buzzfeed.tasty&hl=en) | Discover'da arama üstte, tek büyük fotoğraf ve Trending küçük rafı. Tarif videosu ayrı, büyük oynat göstergesi. | X5: açılan yemek kapakları + güçlü video; genel arama her başlangıçta bulunur. |
| [Kitchen Stories](https://pages.kitchenstories.com/en/about) / [mağaza](https://play.google.com/store/apps/details?id=com.ajnsnewmedia.kitchenstories&hl=en) | Video temelli içerik; görülen tarif gridinde fotoğraf, küçük meta ve yazar aynı kartta. Arama/filtre tarif keşfiyle ilişkili. | 1,3,6: kart dili korunarak farklı raf/grid/kapak; kişi rafı ayrı. |
| [Mob](https://play.google.com/store/apps/details?id=com.mobkitchen.mob&hl=en) | Discover araması ve küçük konu kapıları; kişiselleştirilmiş tarif feed'i tanıtımında yuvarlak yaratıcılar ve büyük tarif. | X2: tek tek büyük tarif akışı; 6: tipografik kapak. Gerçek kişiselleştirme iddiası yok, seçim kullanıcıdan gelir. |
| [Yummly](https://www.yummly.com/) | Güncel kaynak KitchenAid kataloğuna yönleniyor; süre/zorluk/mutfak filtreleri var, bu bir Yummly mobil ana ekran kanıtı değil. | Yeni bir Yummly kalıbı atfedilmedi. Eksik araştırma erişimi açıkça kaydedildi. |
| [Cookpad](https://play.google.com/store/apps/details?id=com.mufumbo.android.recipe.search&hl=en) | Arama ilk sırada; küçük fotoğraflı kategori/son görüntülenen raflar; malzeme ve öğün filtresi. Tarif listesinde yazar görünür. | 5: malzeme başlangıcı; X1: kapaksız arama masası. “Son görüntülenen” veri olmadan kopyalanmadı. |
| [Pestle](https://apps.apple.com/us/app/id1574776971) | Cookbook geniş yatay görsel satırları, plan ekranı günlere ayrılmış. Tarif içindeki eylemler yakın. | 4: kapaktan işe geçiş; X6: numaralı kısa defter, takvim özelliği eklenmedi. |
| [Crouton](https://developer.apple.com/news/?id=9x75y43e) | Apple'ın tasarım yazısı: pişirirken yalnız mevcut adım, ölçü ve malzeme; mağazada günlere bölünmüş küçük plan satırları. | 5 ve X6: seçim, sonuç ve eylemi yakın tutma. Yeni plan verisi ya da takvim uydurma yok. |
| [SideChef](https://www.sidechef.com/download/) / [mağaza](https://play.google.com/store/apps/details?id=com.sidechef.sidechef&hl=en) | Daily Inspiration tek güçlü tarif; ayrı malzemeyle arama görselinde küçük malzeme seçicileri; rehberli pişirme ve filtre resmî açıklamada. | 7: süre kısıtıyla başlama; X1: arama + malzeme masası. Kamera ana ekrana taşınmadı. |
| [HelloFresh](https://www.hellofresh.com/about/app) / [mağaza](https://play.google.com/store/apps/details?id=com.hellofresh.androidapp&hl=en) | Yemek seçme/kutu bağlamı, tarif kitabında küçük grid; süre kazandırma ve planlama mesajı. Mağaza ilk karesi ürün tanıtımı, ana ekran değil. | 7: ayrılan süreyi somut tarifle ilişkilendirme; X3: iki yemek yolu. Teslimat/kutu özelliği alınmadı. |
| [Too Good To Go](https://www.toogoodtogo.com/en-us/how-does-the-app-work) | Discover kişiselleştirilmiş akış, bugün/yarın teslim bağlamı; Map görünümünde üst arama + filtre; favoriler ayrı sekme. | X1: arama önce; X4: niyet seçimi üstte. Harita/konum, fiyat ve sahte öneri geçmişi yok. |
| [Spotify](https://newsroom.spotify.com/2022-08-09/spotifys-new-home-feeds-make-discovering-your-new-favorites-easy/) | Üst içerik türü filtreleri; küçük ikili kısayol gridleriyle geniş albüm rafları farklı ritimde. Müzik/podcast akışları ayrılır. | X4: sekmeli başlangıç; X2: odaklı akış; 8: iki sıra raf. Dinleme davranışı/algoritması taklit edilmedi. |
| [Netflix](https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en) | Home tür chip'leri + güçlü kapak, aşağıda farklı boy raflar; klip akışında ayrı dikey video. | X5: açılan dikey hikâyeler, 4: dikey video rafı. Otomatik oynatma veya sahte izleme geçmişi yok. |
| [Airbnb](https://news.airbnb.com/product-releases/airbnb-2025-summer-release) | Üst arama + Homes/Experiences/Services niyet sekmeleri; yatay kart rafı ve küçük kişili deneyim kartları. | X4: ihtiyaç sekmeleri; 8: mutfak niyeti. Yer/tarih alanı kopyalanmadı. |
| [Pinterest](https://play.google.com/store/apps/details?id=com.pinterest&hl=en) | Eşit olmayan görsel boylarıyla yoğun keşif; tek bir pazarlama hero'suna ihtiyaç duymayan görsel akış. | 9: şaşırtmalı iki sütun; X3: iki fotoğrafla iki yol. Sonsuz akış yerine sonlu, okunur modüller. |
| [Duolingo](https://play.google.com/store/apps/details?id=com.duolingo&hl=en) | Gösterilen ders ekranında tek açık eylem, ilerleme ve görsel seçenekler; kurs listesi ayrı. Bu kareler ana yol ekranını bütünüyle göstermiyor. | X6: numaralı karar sırası. Oyun puanı, seri veya sahte ilerleme yok. |
| [Headspace](https://play.google.com/store/apps/details?id=com.getsomeheadspace.android&hl=en) | Meditate/Sleep/Breathe gibi amaca göre kapılar; ihtiyaç başlığı altında öne çıkan içerik + küçük raf; süre seçimi içerikle yakın. | 2: öğün bağlamı; 7:süre; X4:ihtiyaçtan başlama. Sağlık iddiası yok. |
| [Apple Music](https://apps.apple.com/us/app/id1108187390) | Home: büyük Top Picks kartları, küçük Recently Played ızgarası; içerik boyutu önceliği anlatır. Sanatçı/yayın kimliği yakın. | 3: büyük fikir kartları + tarif grid'i; 8: çift raf. Kaydırma snap'i bizim uyarlamamız. |
| [Apple TV](https://apps.apple.com/us/app/id1174078549) | Büyük görsel ve birincil oynat; altında küçük Continue Watching rafı. Kapak ile raf arasında hiyerarşi net. | 4: açılan kapak; X5: kapakların hemen arkasında video. Devam kaydı uydurulmadı. |
| [YouTube](https://support.google.com/youtube/answer/16089387?hl=en-GB) / [mağaza](https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en) | Home önerileri ile Shorts dikey akışı farklı; kapak/süre, başlık, kanal kimliği. Öneri geçmişe bağlı; rastgele “sana özel” denmez. | X2: bir fikir bir kart; videoda güçlü kapak + süre/izlenme. Üye geçmişi olmadığı için kişisel öneri etiketi yok. |
| [Uber Eats](https://play.google.com/store/apps/details?id=com.ubercab.eats&hl=en) | Kategoriler küçük görsel kapılar; arama ve görev bağlamı önce, geniş hizmet yüzeyleri daha sonra. | X1: kompakt kategori panosu; X4: niyet kapıları. Sipariş/teslimat özelliği eklenmedi. |
| [Getir](https://play.google.com/store/apps/details?id=com.getir&hl=en) | Küçük kategori gridleri, üstte bağlam ve arama; kampanya ile ürün alanı ayrılmış. | X1: küçük görsel kategoriler, iki satır yatay kaydırma. Kampanya/sayaç yok. |
| [Yemeksepeti](https://play.google.com/store/apps/details?id=com.inovel.app.yemeksepeti&hl=en) | Arama üstte; kategori ikonları dar şerit; kartlı içerik alt sırada. Promosyon görseli ana işlevden ayrı. | X1/X4: aramanın kaybolmadığı kısa başlangıç. İndirim ve teslimat mesajları alınmadı. |

## Ödül araştırması

- **Apple Design Awards:** [Crouton, 2024 Interaction](https://www.apple.com/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/): işin yakınındaki küçük araçlar, az bağlam değişimi → 5/X6. Yukarıdaki Apple geliştirici röportajı davranış gerekçesini destekler.
- **Google Play Best of:** [2025 resmî seçki](https://play.google.com/store/apps/editorial?hl=en_US&id=mc_games_apps_cmp_bestof2025_fcp), Focus Friend'in mağaza ekranı (`references-35`): tek görünür iş, açık geri bildirim → X1. Dekorasyon/oyun mekanizması aktarılmadı.
- **Webby:** [sweetgreen app, Food & Drink 2021](https://winners.webbyawards.com/2021/apps-software/general-apps/food-drink/167973/sweetgreen-app): ödül kaydı doğrulandı; bu sayfa güncel ana ekran etkileşimini göstermediği için belirli raf davranışı buna atfedilmedi.
- **Red Dot:** [SmartChef, 2025 Junior Award](https://www.red-dot.org/project/smartchef-84926): video fikrini malzeme listesine dönüştüren kısa iş akışı. İlham→eylem yakınlığı X2/X5'e düşünsel destek; alışveriş/AI özelliği eklenmedi.
- **iF:** [A Taste for Waste](https://ifdesign.com/en/winner-ranking/project/a-taste-for-waste/349342): yiyecek israfını azaltan platform amacı özet kaynaktan doğrulanıyor; ekran ayrıntısı403 nedeniyle incelenemedi. Özgül görsel kalıp atfedilmedi.
- **Awwwards Mobile Excellence:** [resmî performans yayını](https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf): mobil kullanılabilirlik ve performans çerçevesi; uygulama ana ekranı ödülüyle karıştırılmadı. Lazy fotoğraf, reduced-motion ve gerçek iframe genişliği tüm alternatiflerde test konusu.

## Mevcut altı ve boş kalan yönler

Mevcut:1 sinematik karar,2 öğün,3 fikir destesi,4 küçülen kapak,5 malzemeden başlama,6 editoryal kapak. Eksik kalan karar eksenleri süre, mutfak ve iki seçenekli karşılaştırmaydı. Bu nedenle7/8/9 seçildi; yalnız renk/boşluk farkı yapılmadı.

## Sabit sözleşme

Gerçek tarif/kategori/video/şef verisi ve eylemleri; Gilroy, FA solid, shared card/editorialHero/sheet/nav. Logo her header'da kalır. Kamera yalnız orta Ne Pişirsem panelinde. Genel arama `arama.html`; malzeme seçimi ayrı. Üstte header arama ikonu yok, hero/başlangıç geçince var. SET1 blok sırası korunur. SET2 modülleri eksiltmeden sıralarını değiştirir. Her sayfada yalnız **bir** fotoğraflı bölüm ayırıcı vardır (Şefler veya Videolar); öteki açık zemindedir. Düz koyu şef bloğu yok.

Şefler kaynağı aynı altı kayıttır: Şahnur Ilıcalı171, Göktürk Dizdar171, Şahnur Sezek171, Canan Yücel140, Emel Aksu137, Ece Özdenak97. Fotoğrafları doğrulanamadığından baş harf avatarları korunur. Zemin görseli kaynak Video Mutfağı'nın mutfak ortamıdır; fotoğraftaki kişilerin listelenen şefler olduğu iddia edilmez. Üye eylemleri mevcut önizleme/giriş geri bildirimidir.

## SET 2 akış gerekçeleri

X1: kapaksız arama → malzeme → küçük kategori panosu → tarifler → dolap → video → şef → topluluk; karar aracı ilk ekrandadır.
X2: kısa soru/arama → tarif akışı → malzeme → video → kategori → şef → dolap → topluluk; önce somut seçenek görmek isteyen kullanıcı içindir.
X3: soru/arama → iki görsel yol → malzeme → tarifler → şef → kategori → video → dolap → topluluk; karar yolu önce, kanıt/ustalar sonra.
X4: soru/arama → hızlı/malzeme/ilham sekmeleri → kategori → tarif akordeonu → dolap → şef → video → topluluk; araç seçimi üstte, tüm diğer modüller akışta kalır.
X5: soru/arama → dokunarak açılan yemek hikâyeleri → video → malzeme → kategori → tarifler → şef → dolap → topluluk; görerek karar verme ağırlığı.
X6: kısa arama başlığı ve öneri → numaralı malzeme/dolap/tarif/kategori/video/şef/topluluk; plan verisi uydurmadan defter düzeni.

## Öz eleştiri ve iyileştirme turu

- Başlık kapsayıcısındaki padding ilk ölçümü yanıltıyordu: yeni açılışlarda geometri gerçek etiket/metne taşındı.
- SET2'de taşınan bloklar grid min-content genişliğini büyütüyordu: ana sütun `minmax(0,1fr)`, çocuklar `min-width:0` oldu. Sadece overflow gizleyerek örtülmedi.
- Dar tarif satırlarında süre/puan kesiliyordu: ortak metalar alt alta alındı, fotoğraf4:5 yapıldı.
- X1 kategori panosu34 öğeyle gereksiz uzuyordu: iki satır kaydırmalı pano yapıldı.
- İlk full-page çekimlerde lazy fotoğraflar henüz yüklenmemişti: çekimden önce gerçek sayfa kaydırıldı ve üst konum anlık sıfırlandı.
- Web ile aynı kalanlar gerçek içerik, marka ve bileşenlerdir; kampanya hero'su, sayaç bandı, footer ve pazarlama blokları alınmadı.


## On beş fikir ve başrol gerekçesi

- **1 · Sinematik seçim:** Bu alternatifin fikri fotoğraflı öneriyi malzemelerinle şekillendir, ne pişireceğine karar ver; başrol ne pişireceğine karar vermektir, çünkü malzeme seçiminin cevabı fotoğraf ve tarif olarak görünür.
- **2 · Öğününe göre:** Bu alternatifin fikri günün öğününden başla; kısa bir öneri listesini elindekilerle daralt; başrol ne pişireceğine karar vermektir, çünkü öğün bağlamı seçenekleri anlamlı biçimde daraltır.
- **3 · Fikir destesi:** Bu alternatifin fikri yemek fikirlerini kaydırarak karşılaştır, malzemelerinle seçimini netleştir; başrol ne pişireceğine karar vermektir, çünkü az sayıdaki gerçek fikir arasında elle karşılaştırma sağlar.
- **4 · Açılan sofra:** Bu alternatifin fikri geniş kapak kaydırdıkça küçülür; seçim tahtasına ve kısa tarif listesine yer açar; başrol ne pişireceğine karar vermektir, çünkü kapak geri çekildikçe karar aracı daha çok yer bulur.
- **5 · Malzemeden sofraya:** Bu alternatifin fikri malzemeni kapakta seç; öneri, görsel ve tarif rafı kararını desteklesin; başrol ne pişireceğine karar vermektir, çünkü eldeki malzeme doğrudan somut tarif önerisine dönüşür.
- **6 · Bugünün mutfağı:** Bu alternatifin fikri bir yemek sorusuyla açılan kapağı, tarif hikâyeleri ve kısa bir dizinle keşfet; başrol ne pişireceğine karar vermektir, çünkü soru ile yemek fotoğrafı ayrı hiyerarşide kalır.
- **7 · Vaktine göre:** Bu alternatifin fikri önce ayırabildiğin süreyi seç; malzemelerinle pişirebileceğin yemekleri daralt; başrol ne pişireceğine karar vermektir, çünkü kullanıcının ayırabildiği süre gerçek sonuçları belirler.
- **8 · Bir mutfak seç:** Bu alternatifin fikri canının çektiği mutfaktan başla; elindekilerle sofrana uygun bir tarif bul; başrol ne pişireceğine karar vermektir, çünkü mutfak tercihi somut tariflere daralır.
- **9 · İki fikir arasında:** Bu alternatifin fikri i̇ki gerçek tarifi yan yana tart; süre ve malzemeyle kararını ver; başrol ne pişireceğine karar vermektir, çünkü iki seçeneğin fotoğrafı ve süresi karar yükünü azaltır.
- **X1 · Mutfak masası:** Bu alternatifin fikri kapaksız açılışta arama ve malzemeler doğrudan işin başına geçer; başrol ne pişireceğine karar vermektir, çünkü büyük kapak bekletmeden arama ve malzeme aracına ulaşılır.
- **X2 · Sofra akışı:** Bu alternatifin fikri tek tek yemek fikirlerini gör; her fikri malzemelerinle sınayarak ilerle; başrol ne pişireceğine karar vermektir, çünkü her tarif pişirilecek yemek için somut bir adaydır.
- **X3 · İki yoldan bir sofra:** Bu alternatifin fikri balık ya da bakliyattan başlayan iki görsel yol, kararını gerçek tariflere bağlar; başrol ne pişireceğine karar vermektir, çünkü iki malzeme ailesi karşılaştırmayı kolaylaştırır.
- **X4 · İhtiyacına göre:** Bu alternatifin fikri hızlı, malzemeyle veya ilhamla başla; aynı mutfağa üç farklı yoldan ulaş; başrol ne pişireceğine karar vermektir, çünkü kullanıcının ihtiyacına göre başlangıç yolu değişir.
- **X5 · Açılan hikâyeler:** Bu alternatifin fikri kısa yemek kapaklarını aç; gördüğün fikri pişirebileceğin tarife dönüştür; başrol ne pişireceğine karar vermektir, çünkü kapak açmak tarife ulaşan kısa bir keşif eylemidir.
- **X6 · Sofra defteri:** Bu alternatifin fikri malzeme, tarif ve mutfak ilhamını numaralı bir defter akışında buluştur; başrol ne pişireceğine karar vermektir, çünkü numaralı akış karar adımlarını okunur hale getirir.

## Bölüm karşılaştırması

| Ekran | Tarifler | Şefler | Videolar | İlham |
|---|---|---|---|---|
| 1 · Sinematik seçim | Geniş fotoğraflı yatay kart rafı | Fotoğraflı mutfak zemini + şef şeridi | Büyük video + küçük grid · açık zemin | NYT Cooking · Kitchen Stories |
| 2 · Öğününe göre | Tek büyük tarif + üç küçük satır | Açık zemin + şef şeridi | Geniş yatay sinema rafı · fotoğraflı ayırıcı | Samsung Food · Headspace |
| 3 · Fikir destesi | İki sütun tarif ızgarası | Fotoğraflı mutfak zemini + şef şeridi | Büyük ilk kapak + kısa video satırları · açık zemin | Apple Music · Airbnb |
| 4 · Açılan sofra | Süreye göre numaralı beşli | Açık zemin + şef şeridi | Dikey video kapak rafı · fotoğraflı ayırıcı | Apple TV · Pestle |
| 5 · Malzemeden sofraya | Tümü / 30 dk / Kahvaltı rafı | Fotoğraflı mutfak zemini + şef şeridi | İkili video grid + geniş son kart · açık zemin | Cookpad · Crouton |
| 6 · Bugünün mutfağı | Dikey editoryal kapaklar | Açık zemin + şef şeridi | Büyük video + oynatma listesi · fotoğraflı ayırıcı | Mob · Kitchen Stories |
| 7 · Vaktine göre | Süre etiketli tarif çizgisi | Açık zemin + şef şeridi | Büyük ilk kapak + kısa video satırları · fotoğraflı ayırıcı | SideChef · HelloFresh |
| 8 · Bir mutfak seç | İki satır yatay raf | Fotoğraflı mutfak zemini + şef şeridi | İkili video grid + geniş son kart · açık zemin | Airbnb · Samsung Food |
| 9 · İki fikir arasında | Şaşırtmalı ikili kartlar | Açık zemin + şef şeridi | Büyük video + küçük grid · fotoğraflı ayırıcı | Pinterest · NYT Cooking |
| X1 · Mutfak masası | Tam genişlik ilk kart + küçük grid | Açık zemin + şef şeridi | Geniş yatay sinema rafı · fotoğraflı ayırıcı | Cookpad · SideChef · Getir |
| X2 · Sofra akışı | Tam genişlik ardışık kartlar | Fotoğraflı mutfak zemini + şef şeridi | Büyük ilk kapak + kısa video satırları · açık zemin | YouTube · Mob · Spotify |
| X3 · İki yoldan bir sofra | Sağ/sol dönüşümlü görselli satırlar | Açık zemin + şef şeridi | İkili video grid + geniş son kart · fotoğraflı ayırıcı | Pinterest · HelloFresh |
| X4 · İhtiyacına göre | Açılır tarif seçkisi | Fotoğraflı mutfak zemini + şef şeridi | Dikey video kapak rafı · açık zemin | Airbnb · Headspace · Spotify |
| X5 · Açılan hikâyeler | Büyük kapak + ikili kapak galerisi | Açık zemin + şef şeridi | Büyük video + oynatma listesi · fotoğraflı ayırıcı | Netflix · Apple TV · Tasty |
| X6 · Sofra defteri | Fotoğraflı kısa tarif dizini | Fotoğraflı mutfak zemini + şef şeridi | Büyük video + küçük grid · açık zemin | Crouton · Pestle · Duolingo |

## Tercih sıralaması

**SET1: 2 → 1 → 7 → 3 → 8 → 9 → 6 → 5 → 4.** 2 günlük kullanıma hızlı giriyor ve büyük tarif + küçük liste dengeli. 1 en güvenli, onaylı görsel referans. 7 süre ihtiyacını net çözüyor. 3 karşılaştırması rahat;8 daha keşif odaklı;9 iki seçenekle karar yükünü azaltıyor. 6 daha editoryal,5 kapakta daha yoğun,4 uzun kapak nedeniyle karar aracını daha geç gösteriyor.

**SET2: X1 → X4 → X3 → X6 → X2 → X5.** X1 uygulamanın işine en hızlı başlayan yapı. X4 farklı ihtiyaçları aynı başlangıçta topluyor; malzeme aracı bir sekme geride. X3 az seçenekle anlaşılır; X6 düzenli fakat defter ritmi daha uzun. X2 görsel keşif için güçlü ama karar aracı aşağıda; X5 etkileyici kapaklar sunuyor fakat yemek seçmek için ek dokunuş istiyor.

**Önerim:** onaylı ailenin en dengeli adayı2, yapısal olarak daha uygulama odaklı adayX1. Bir sonraki seçim turunda1/2/X1/X4 dörtlüsünü karşılaştırmak anlamlı. Bu tur liste/detay uyarlaması veya yayın yapılmadı.

### Son görsel düzeltmeler

7–9'un fotoğraf katmanı sıfır yükseklik alıyordu: mutlak konum ve tam yükseklik açıkça verildi. 7'de parlak yumurta fotoğrafı üstündeki süre açıklaması kaynak koyu overlay ile kendi okunur yüzeyine alındı. Satırlı video düzeninde ilk kapak büyütüldü. Şefler3/X2 zemininde Şahnur Ilıcalı'nın İran Usulü Baharatlı Acılı Balık Kebabı,5/X4'te Emel Aksu'nun Karabuğday Kaplamalı Levrek fotoğrafı;1/8/X6'da kaynak mutfak ortamı kullanılır. Fotoğrafın üzerindeki gerçek şef şeridi aynı kalır.

Video veri setinde oynatılabilir kaynak URL bulunmadığı için videoya dokunma, mevcut video bilgi/geri dönüş panelini açar; gerçek video oynatma doğrulanmış sayılmaz. Yeni bir video veya URL uydurulmadı.

## 360 / 390 / 430 görsel değerlendirmesi

Her satırın üç tam boy görüntüsü `verification/set15/review-<id>-full.png` içinde yan yanadır; tekil görüntüler `<id>-<genişlik>-full.png`.

| Ekran | Görsel değerlendirme ve kalan tercih farkı |
|---|---|
| 1 | Onaylı fotoğraf/arama hiyerarşisi korunuyor; yatay tarif kartı ile video grid'i farklı ritimde. Şef mutfak zemini anlamlı. 360'ta kategori başlığı kontrollü iki satır. |
| 2 | Kısa selam ve küçük yemek penceresi,1'in tam fotoğrafından ayrışıyor. Büyük tarif + küçük satırlar dengeli; video fotoğraflı ayırıcı, şefler ferah. |
| 3 | Kaydırılan somut fikir destesi, alttaki iki sütun tariflerden ayrılıyor. Video ilk kapağı küçük kalıyordu, büyütüldü. Şef zemini gerçek şefin tarifine bağlandı. |
| 4 | Büyük kapak ve seçim tahtası farklı; numaralı tarif satırları hızlı taranıyor. Kapak yüzünden malzeme eylemi daha aşağıda, bu bilinçli ama sıralamada zayıf taraf. |
| 5 | Malzeme ilk ekranda; genel aramayla ayrı bağlamda. Sekmeli tarif rafı ve ikili video grid'i korunuyor. İlk ekran diğerlerine göre yoğun; bu nedenle ilk öneri değil. |
| 6 | Editoryal fotoğraf penceresi + kısa malzeme dizini, dikey tarif kapaklarıyla tutarlı. Şefler açık, video fotoğraflı; iki ağır koyu blok yok. |
| 7 | Sıfır yükseklikli arka plan düzeltildi; yemek görünür. Parlak fotoğraf üstündeki süre metnine koyu kaynak yüzey eklendi. Süre çizgisi, numaralı4'ten etkileşim ve etiketlerle ayrılıyor. |
| 8 | Mutfak seçimi arama ile öneri arasındaki somut adım; iki satırlı raf yeni ritim kuruyor.6 ile fotoğraf penceresi akraba ama seçim düğmeleri ve çift raf kompozisyonu farklı. |
| 9 | İki fikir yan yana, yeni çift eylemi açık; tariflerin şaşırtmalı grid'i aynı karar fikrini sürdürür. Uzun adlar360'ta üç satırla dengeli; kartlar eşit yükseklikte. |
| X1 | Kapaksız başlangıç en doğrudan araç; küçük öneri yalnız destek. Kategori panosu uzun liste olmaktan çıkarıldı. Tarifler geniş ilk kart + grid, video görselli ayırıcı. |
| X2 | Kapak yerine soru ve büyük tarif akışı. Tarifler ilk ekranda başlıyor; malzeme aracı daha aşağıda, üst kısayol erişimi koruyor. İlk video kapağı güçlendirildi. |
| X3 | İki görsel karar yolu,1 ailesinden tamamen farklı bir başlangıç. Sağa/sola dönüşen tarif satırları bu ikili fikri taşır. Sütun taşması gerçek grid ölçüsüyle giderildi. |
| X4 | Üç başlangıç sekmesi çalışıyor, kalan modüller ortak akışta. Tarif akordeonu uzun rafları kısaltıyor. Malzeme sekmesi bir dokunuş geride; keşif ve işlev dengesi güçlü. |
| X5 | Dokunularak açılan hikâyeler ve hemen gelen video, görüntüyle karar veren kullanıcıya uygun. Tarif kapak galerisi, normal feed'den ayrılıyor. Ek dokunuş ve daha geç malzeme erişimi tercih maliyeti. |
| X6 | Numaralı defter ve küçük öneri, büyük hero kullanmadan belirgin karakter kuruyor. Tarif dizini ve bölüm ayraçları sade; bütün modüller kaldığı için toplam sayfa yine uzun. |

**Ortak değerlendirme:** liste/detay ile aynı Gilroy, kart, fotoğraf meta, save, radius, overlay, sheet ve navigation ailesi kullanılıyor. Webden taşınan bir pazarlama kompozisyonu yok. Şef isimleri ve sayıları aynı gerçek kaynak; “sana özel” gibi doğrulanmamış geçmiş iddiaları yok. SET1'de sıra sabit, SET2'de yukarıda gerekçelendirilen sıralar var.

## Doğrulama kanıtı

- `verification/set15/final-qa.json`: 15 × 3 =45 ekran; normal harekette945 header ölçümü, görünür kesişim0; sayfa/sütun taşması0, JavaScript hatası0, görsel kaynak hatası0. Her sayfada tek fotoğraflı bölüm ayırıcı.
- `verification/set15/qa.json`: reduced-motion taraması ve15 ekranda gerçek malzeme seçimi; üstte header arama gizli, scroll sonrası görünür.
- `verification/set15/interactions.json`: süre seçimi3 sonuç → liste3 sonuç; mutfak/kategori seçimi ve temizleme; tarif/başlangıç sekmeleri; tek açık tarif akordeonu; hikâye sheet'i; drawer araması/kapanışı; arama ekranına gerçek gezinme. WebKit390'da15 ekran ayrıca açıldı.
- `verification/set15/gallery.json`:15 frame, iç viewport390×844, başlangıç scroll0. `gallery-1440.png` patron sunumunun tam boy görüntüsü.
- `verification/set15/protected-after.json`: korunan146 dosyada değişiklik0. Ana-a ve ana-1 aynı.
- Full-page screenshot tekniği fixed alt menüyü844px viewport konumunda gösterir; uzun görüntüde barın ortalarda görünmesi sayfanın iç akışında menü olduğu anlamına gelmez. Tekil `*-top.png` ilk ekranı, galeri ise gerçek kaydırılabilir telefonu gösterir.

A ışığının önce/sonra piksel karşılaştırması:360/390/430 genişliklerin üçünde de tabak bölgesinde(y240–440) değişen piksel0; üst ışık bölgesinde değişim var. Kanıt:`verification/set15/light-pixels.json`.
