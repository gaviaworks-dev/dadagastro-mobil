# 36 — İki aile, on sekiz ana sayfa

8 Ekim 2026. SET1 (ana-1…9) korunur. Reddedilen altı SET2 `../eski/set2-reddedilen` içinde arşivlendi; yeni SET2 ana-x1…9 olarak kuruldu. Yalnız v3-app. Liste, detay, kök, yayin ve canlı değiştirilmedi. Git add/commit/push yok.

## Ret ve yeni tasarım kararı

Eski X ekranları aynı beyaz başlık/arama başlangıcına dayanıyordu. `../verification/set15/x1-390-top.png` ve arşivlenen akış kodunda bu açık. Yeni sette her hero 844px ekranın yarısından büyük; dokuz ayrı siluet/etkileşim vardır. Kodlamadan önceki plan `../verification/set2-nine/plan.md`.

## Primary ve sabitler

SET1'in `hero-light.css` değişkenleri aynen kullanılır: primary %25, radyal0→65, screen; sol üstte kaynak koyu tabanın üstünde. Kaynak kök app.css detail-shade292/324 önceki turda doğrulanmıştı; bu tur kök değiştirilmedi. Üstte transparan header, logo/bildirim/burger; ilk metin geometrisine göre ilk48px içinde solid primary. Genel arama arama.html, malzeme araması ayrı. Kamera orta panelde. Gilroy, FA solid, kart, nav, radius ve spacing aileleri ortak.

## Araştırma yöntemi ve sınırı

Önceki 16 uygulamanın 80 yayıncı mağaza görseli tekrar karşılaştırıldı (`references-35/manifest.json`, contact0–3). Bu tur 8 uygulamadan 40 yeni görsel indirildi (`references-36/manifest.json`, contact0–1). Bunlar yayıncı tanıtım kareleridir; giriş yapılmış gerçek oturum kaydı değildir. Görselde bulunmayan kaydırma/kişiselleştirme davranışları varsayılmadı. Aşağıda “uyarlama” bizim tasarım kararıdır. Ödül sayfaları değerlendirme gerekçesi için kullanıldı; her referansın ödüllü olduğu iddia edilmez.

**Erişim sınırı:** Yummly Play kaydı 404; yummly.com KitchenAid tarif kataloğuna yönleniyor. Güncel Yummly ana ekranı incelenmiş sayılmadı. iF sayfası tam açılışta403; arama özeti erişilebilir. Awwwards PDF tam açılışta zaman aşımı; yalnız Mobile Excellence ölçütleri doğrulanabildi. Bunlardan doğrulanmamış ekran kalıbı üretilmedi.

## Uygulama → somut kalıp → uygulandığı yer

| Uygulama / kaynak | Açılış, arama, içerik/kişi/video ve gezinme gözlemi | DadaGastro uyarlaması |
|---|---|---|
| [NYT Cooking](https://play.google.com/store/apps/details?id=com.nytimes.cooking&hl=en) | Fotoğraf ve kısa tarif bilgisi; tanıtımda ayrı tarif videosu rafı. Tarif, yazar ve kaydet eylemi birlikte. Oturuma özel ana ekran doğrulanmadı. | SET1: 1/9; yeni X9: fotoğraf + kısa editoryal hiyerarşi. |
| [Samsung Food](https://play.google.com/store/apps/details?id=com.foodient.whisk&hl=en) | Plan/For you/Queue sekmeleri; gün/öğün başlıkları altında küçük tarif satırları. Büyük hero zorunlu değil. | SET1: 2/8; X7: öğün bağlamı; X8: kullanıcı seçimi. |
| [Tasty](https://play.google.com/store/apps/details?id=com.buzzfeed.tasty&hl=en) | Discover'da arama üstte, tek büyük fotoğraf ve Trending küçük rafı. Tarif videosu ayrı, büyük oynat göstergesi. | X5: pişirme bağlamındaki büyük video kapağı. |
| [Kitchen Stories](https://pages.kitchenstories.com/en/about) / [mağaza](https://play.google.com/store/apps/details?id=com.ajnsnewmedia.kitchenstories&hl=en) | Video temelli içerik; görülen tarif gridinde fotoğraf, küçük meta ve yazar aynı kartta. Arama/filtre tarif keşfiyle ilişkili. | SET1: 1/3/6; X5: görsel öğrenme ve ayrı video rafı. |
| [Mob](https://play.google.com/store/apps/details?id=com.mobkitchen.mob&hl=en) | Discover araması ve küçük konu kapıları; kişiselleştirilmiş tarif feed'i tanıtımında yuvarlak yaratıcılar ve büyük tarif. | SET1: 6; X9: editoryal tipografi ve fotoğraf. |
| [Yummly](https://www.yummly.com/) | Güncel kaynak KitchenAid kataloğuna yönleniyor; süre/zorluk/mutfak filtreleri var, bu bir Yummly mobil ana ekran kanıtı değil. | Yeni bir Yummly kalıbı atfedilmedi. Eksik araştırma erişimi açıkça kaydedildi. |
| [Cookpad](https://play.google.com/store/apps/details?id=com.mufumbo.android.recipe.search&hl=en) | Arama ilk sırada; küçük fotoğraflı kategori/son görüntülenen raflar; malzeme ve öğün filtresi. Tarif listesinde yazar görünür. | SET1: 5; tüm yeni X: bağımsız malzeme aracı. |
| [Pestle](https://apps.apple.com/us/app/id1574776971) | Cookbook geniş yatay görsel satırları, plan ekranı günlere ayrılmış. Tarif içindeki eylemler yakın. | SET1: 4; X6: kapaktan işe geçiş. |
| [Crouton](https://developer.apple.com/news/?id=9x75y43e) | Apple'ın tasarım yazısı: pişirirken yalnız mevcut adım, ölçü ve malzeme; mağazada günlere bölünmüş küçük plan satırları. | SET1: 5; yeni X: seçim/sonuç/eylem yakınlığı. |
| [SideChef](https://www.sidechef.com/download/) / [mağaza](https://play.google.com/store/apps/details?id=com.sidechef.sidechef&hl=en) | Daily Inspiration tek güçlü tarif; ayrı malzemeyle arama görselinde küçük malzeme seçicileri; rehberli pişirme ve filtre resmî açıklamada. | SET1: 7; X3: somut yemek fikrinden malzemeye geçiş. |
| [HelloFresh](https://www.hellofresh.com/about/app) / [mağaza](https://play.google.com/store/apps/details?id=com.hellofresh.androidapp&hl=en) | Yemek seçme/kutu bağlamı, tarif kitabında küçük grid; süre kazandırma ve planlama mesajı. Mağaza ilk karesi ürün tanıtımı, ana ekran değil. | SET1: 7; X3: görsel karar; bölünmüş hero bizim uyarlamamız. |
| [Too Good To Go](https://www.toogoodtogo.com/en-us/how-does-the-app-work) | Discover kişiselleştirilmiş akış, bugün/yarın teslim bağlamı; Map görünümünde üst arama + filtre; favoriler ayrı sekme. | Niyetin içerik seçimini yönlendirmesi; X7/X8. Harita veya alışveriş özelliği alınmadı. |
| [Spotify](https://newsroom.spotify.com/2022-08-09/spotifys-new-home-feeds-make-discovering-your-new-favorites-easy/) | Üst içerik türü filtreleri; küçük ikili kısayol gridleriyle geniş albüm rafları farklı ritimde. Müzik/podcast akışları ayrılır. | X6: büyük sahneden içerik rafına geçiş. Küçülme/paralaks bizim uyarlamamız; mağaza karesinden davranış kanıtı çıkarılmadı. |
| [Netflix](https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en) | Home tür chip'leri + güçlü kapak, aşağıda farklı boy raflar; klip akışında ayrı dikey video. | X1: güçlü kapak ve raf ilişkisi. Yatay kapak geçişi özgün uyarlama. |
| [Airbnb](https://news.airbnb.com/product-releases/airbnb-2025-summer-release) | Üst arama + Homes/Experiences/Services niyet sekmeleri; yatay kart rafı ve küçük kişili deneyim kartları. | SET1: 8; X4: görsel keşif; X8: niyet seçimi. Dönen dairesel pencere bizim yorumumuz. |
| [Pinterest](https://play.google.com/store/apps/details?id=com.pinterest&hl=en) | Eşit olmayan görsel boylarıyla yoğun keşif; tek bir pazarlama hero'suna ihtiyaç duymayan görsel akış. | X4: farklı boy fotoğraflarla kolaj; X2: kapak karşılaştırması. |
| [Duolingo](https://play.google.com/store/apps/details?id=com.duolingo&hl=en) | Gösterilen ders ekranında tek açık eylem, ilerleme ve görsel seçenekler; kurs listesi ayrı. Bu kareler ana yol ekranını bütünüyle göstermiyor. | Tek belirgin eylem ilkesi; yeni bir oyun/ilerleme özelliği alınmadı. |
| [Headspace](https://play.google.com/store/apps/details?id=com.getsomeheadspace.android&hl=en) | Meditate/Sleep/Breathe gibi amaca göre kapılar; ihtiyaç başlığı altında öne çıkan içerik + küçük raf; süre seçimi içerikle yakın. | SET1: 2; X7: ihtiyaca/ana göre başlangıç. |
| [Apple Music](https://apps.apple.com/us/app/id1108187390) | Home: büyük Top Picks kartları, küçük Recently Played ızgarası; içerik boyutu önceliği anlatır. Sanatçı/yayın kimliği yakın. | X2: kapak nesnesinin odağı; üst üste deste bizim uyarlamamız. X6: geniş görsel sahne. |
| [Apple TV](https://apps.apple.com/us/app/id1174078549) | Büyük görsel ve birincil oynat; altında küçük Continue Watching rafı. Kapak ile raf arasında hiyerarşi net. | X1: güçlü kapak, sayfa göstergesi ve raf. |
| [YouTube](https://support.google.com/youtube/answer/16089387?hl=en-GB) / [mağaza](https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en) | Home önerileri ile Shorts dikey akışı farklı; kapak/süre, başlık, kanal kimliği. Öneri geçmişe bağlı; rastgele “sana özel” denmez. | Video kapağı/başlık/süre yakınlığı; X5. |
| [Uber Eats](https://play.google.com/store/apps/details?id=com.ubercab.eats&hl=en) | Kategoriler küçük görsel kapılar; arama ve görev bağlamı önce, geniş hizmet yüzeyleri daha sonra. | Kompakt kategori erişimi; yeni X setinin kategori şeritleri. |
| [Getir](https://play.google.com/store/apps/details?id=com.getir&hl=en) | Küçük kategori gridleri, üstte bağlam ve arama; kampanya ile ürün alanı ayrılmış. | Kompakt kategori erişimi; teslimat/konum özelliği eklenmedi. |
| [Yemeksepeti](https://play.google.com/store/apps/details?id=com.inovel.app.yemeksepeti&hl=en) | Arama üstte; kategori ikonları dar şerit; kartlı içerik alt sırada. Promosyon görseli ana işlevden ayrı. | Kompakt kategori erişimi; yeni X setinin şeritleri. |

## Ödül araştırması

- **Apple Design Awards:** [Crouton, 2024 Interaction](https://www.apple.com/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/): işin yakınındaki küçük araçlar, az bağlam değişimi → 5/X6. Yukarıdaki Apple geliştirici röportajı davranış gerekçesini destekler.
- **Google Play Best of:** [2025 resmî seçki](https://play.google.com/store/apps/editorial?hl=en_US&id=mc_games_apps_cmp_bestof2025_fcp), Focus Friend'in mağaza ekranı (`references-35`): tek görünür iş, açık geri bildirim → X1. Dekorasyon/oyun mekanizması aktarılmadı.
- **Webby:** [sweetgreen app, Food & Drink 2021](https://winners.webbyawards.com/2021/apps-software/general-apps/food-drink/167973/sweetgreen-app): ödül kaydı doğrulandı; bu sayfa güncel ana ekran etkileşimini göstermediği için belirli raf davranışı buna atfedilmedi.
- **Red Dot:** [SmartChef, 2025 Junior Award](https://www.red-dot.org/project/smartchef-84926): video fikrini malzeme listesine dönüştüren kısa iş akışı. İlham→eylem yakınlığı X5'e düşünsel destek; alışveriş/AI özelliği eklenmedi.
- **iF:** [A Taste for Waste](https://ifdesign.com/en/winner-ranking/project/a-taste-for-waste/349342): yiyecek israfını azaltan platform amacı özet kaynaktan doğrulanıyor; ekran ayrıntısı403 nedeniyle incelenemedi. Özgül görsel kalıp atfedilmedi.
- **Awwwards Mobile Excellence:** [resmî performans yayını](https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf): mobil kullanılabilirlik ve performans çerçevesi; uygulama ana ekranı ödülüyle karıştırılmadı. Lazy fotoğraf, reduced-motion ve gerçek iframe genişliği tüm alternatiflerde test konusu.


## Dokuz fikir ve başrol

- **X1 · Kapak sineması:** Bu alternatifin fikri yemek kapaklarını yana kaydır, sofrana bir fikir seç. Başrol ne pişireceğine karar vermektir, çünkü kapaklar aynı pişirme sorusunun değişen gerçek cevaplarıdır. Hero kalıbı: Yatay tam boy kapaklar. İlham: Netflix · Apple TV.
- **X2 · Tarif destesi:** Bu alternatifin fikri üst üste duran yemek fikirlerini çevirerek ne pişireceğine karar ver. Başrol ne pişireceğine karar vermektir, çünkü eldeki seçenekleri birer birer karşılaştırmak karar yükünü azaltır. Hero kalıbı: Derinlikli kart destesi. İlham: Apple Music · Pinterest.
- **X3 · Sofranın iki yanı:** Bu alternatifin fikri bir tarafta yemek sorusu, diğer tarafta iştah açan cevabı seç. Başrol ne pişireceğine karar vermektir, çünkü fotoğraf bir yemek cevabı, malzeme eylemi bu cevabı sınama yoludur. Hero kalıbı: Çapraz bölünmüş hero. İlham: HelloFresh · SideChef.
- **X4 · İştah haritası:** Bu alternatifin fikri fotoğraf kolajından canının çektiğini bul, elindekilerle daralt. Başrol ne pişireceğine karar vermektir, çünkü kullanıcı önce iştahını uyandıran yemeği seçebilir. Hero kalıbı: Beş fotoğraflı mozaik. İlham: Pinterest · Airbnb.
- **X5 · Birlikte pişirelim:** Bu alternatifin fikri pişirme fikrini görerek seç; malzemelerden mutfağa geç. Başrol ne pişireceğine karar vermektir, çünkü video önerisi kahvaltıda ne pişirileceğine hizmet eder. Hero kalıbı: Video kapağı ve pişirme bağlamı. İlham: Tasty · Kitchen Stories.
- **X6 · Açılan sahne:** Bu alternatifin fikri büyük yemek sahnesinden kaydırarak malzemelerine ve tariflere geç. Başrol ne pişireceğine karar vermektir, çünkü sahne geri çekildikçe arama ve malzeme aracı öne gelir. Hero kalıbı: Küçülen sahne ve yapışkan arama. İlham: Spotify · Apple Music.
- **X7 · Öğünün sahnesi:** Bu alternatifin fikri öğününü değiştir, fotoğraf ve öneriler aynı anda sofrana uyarlansın. Başrol ne pişireceğine karar vermektir, çünkü öğün seçimi hem fotoğrafı hem gerçek önerileri değiştirir. Hero kalıbı: Öğüne göre değişen sahne. İlham: Samsung Food · Headspace.
- **X8 · Mutfak pusulası:** Bu alternatifin fikri bir mutfağa yönel, merkezdeki yemek fotoğrafıyla pişireceğin fikri bul. Başrol ne pişireceğine karar vermektir, çünkü mutfak tercihi fotoğrafı ve tarif rafını birlikte daraltır. Hero kalıbı: Dönen merkez ve mutfak seçimi. İlham: Airbnb · Samsung Food.
- **X9 · Sofra sayısı:** Bu alternatifin fikri bir dergi kapağını keşfeder gibi bugünün yemek fikrini aç. Başrol ne pişireceğine karar vermektir, çünkü tatlı yapma niyeti belirli bir tarif fikrine bağlanır. Hero kalıbı: Asimetrik editoryal kapak. İlham: Mob · NYT Cooking.

## Bölüm kompozisyonları

| Alternatif | Tarifler | Şefler | Videolar |
|---|---|---|---|
| X1 | Büyük yatay fotoğraf rafı | Mutfak fotoğraflı şerit | Büyük video + kısa liste |
| X2 | Tek büyük tarif + kısa liste | Açık şerit | Görselli sinema rafı |
| X3 | Şaşırtmalı ikili grid | Fotoğraflı şerit | İkili video panosu |
| X4 | Bir büyük + dört küçük mozaik | Açık şerit | Görselli dikey kapak rafı |
| X5 | Tümü / 30dk / Kahvaltı rafı | Fotoğraflı şerit | Öne çıkan video + küçük grid |
| X6 | Pişirme süresine göre numaralı liste | Açık şerit | Görselli video listesi |
| X7 | Öğüne göre büyük öneri + ikili kartlar | Fotoğraflı şerit | Büyük video + kısa liste |
| X8 | Seçilen mutfağın tek büyük tarifi veya grid | Açık şerit | Görselli ikili video panosu |
| X9 | Dikey editoryal kapaklar | Fotoğraflı şerit | Dikey video rafı |

Her sayfada malzeme, kategori/dünya mutfakları, tarif, dolap, video, şef, topluluk vardır. Sıra kullanıcı niyetine göre farklıdır. Şefler aynı altı gerçek isim/sayıdır; fotoğraf doğrulanmadığı için baş harfli avatar korunur. Fotoğraf zeminindeki kişiler bu şefler diye sunulmaz.

## Veri ve video sınırı

Video kaynağında oynatılabilir URL yok. X5 gerçek web kapağı + oynat göstergesi + gerçek süreyle kuruldu; dokununca video bilgi paneli kaynak bulunmadığını açıklar. Sessiz döngü/oynatıcı taklidi yapılmadı. Bazı tariflerin yerel facet bilgisi yok; seçilen gerçek öneri korunur, rafın diğer üyeleri yalnız doğrulanmış facetlerden gelir. Boş sonuç uydurma tariflerle doldurulmaz.

## Öz eleştiri ve düzeltmeler

- Her X ayrı bitirildi; 390 ilk ekranına bakılıp sonraki kalıba geçildi.
- X1 başlık kapsayıcısının padding'i yanlış header gizlemesi yapıyordu; gerçek metin grubu ölçülüyor.
- X6'nın küçük etiketi açık fotoğrafta zayıftı; kaynak koyu cam zemini eklendi, arama sonrası boşluk azaltıldı.
- X8 fotoğrafı ilk denemede öneri/tercih satırını sıkıştırıyordu; çap260px sınırına alındı.
- X3/X4 önizleme genişlikleri grid sütununu aşıyordu; gerçek yatay şeride dönüştürüldü.
- X7/X8 eksik facet yüzünden seçili öneriyi kaybediyordu; seçilen gerçek tarif rafta korunuyor. X7 az kayıtla boş ikinci sütun bırakmayan büyük+ikili kompozisyona geçti.
- Dokuz ilk ekran tek görüntüde karşılaştırıldı: deste, çapraz, kolaj, video, alt başlıklı sahne, öğün, dairesel pencere ve editoryal kapak ayırt ediliyor. X1 tam görsel yüzey bakımından SET1'e en yakın olanıdır; farkı kapak değişimi/etiket/sayfa göstergesidir.
- Web ile aynı kalanlar marka ve veridir; web sayaçları/pazarlama şeritleri/footer yok.

## Tercih sıram

**X7 > X2 > X3 > X4 > X1 > X9 > X8 > X6 > X5.** X7 amaç ve iştahı birlikte en net kuruyor; X2 seçim hareketi ve fotoğraf odağıyla uygulama hissi veriyor; X3 en ayırt edici marka silueti. X4 keşifte güçlü fakat daha yoğun. X1 sinematik ve anlaşılır, SET1'e daha yakın. X9 şık ama tatlı odağı dar. X8 belirgin, yerel mutfak verisi sınırlı. X6 etkileyici ama kaydırma davranışı daha karmaşık. X5 gerçek video kaynağı olmadan son sırada.

## Kanıtlar

`../verification/set2-nine/`: dokuz ilk ekran (`first-nine-grid.png`, `first-nine-strip.png`), 27 tam boy görüntü, üç genişlikli dokuz inceleme panosu, qa.json, interactions.json, gallery-1440.png/gallery.json. Tam boy görüntülerde fixed alt menü ilk844px konumunda görünür; bu uzun ekran yakalamanın doğal davranışıdır. Normal viewport kontrolleri ayrıca saklanır.
