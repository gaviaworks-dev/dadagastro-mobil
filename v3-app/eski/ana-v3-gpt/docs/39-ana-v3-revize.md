# Ana sayfa V3 — yeniden tasarım

9 Ekim 2026. Önceki V3 reddedildi; kaynakları ve kanıtları `../eski/ana-v3-reddedilen-20261009/` içinde korunur. Önceki ölçümler yeni tasarımın kanıtı değildir. Yalnız v3-app; git/yayın yok.

## Kod öncesi sayfa kurgusu

Temel ana-x6'nın fotoğrafı, açılan sahnesi, primary ışığı ve hilal birleşimi; başlık/arama ana-1'den. Görsel hedef: fotoğraf → küçük karar aracı → görsel keşif → güçlü yemek seçkisi → insan → katkı. Aynı başlık+şerit kalıbını alt alta tekrar etmiyoruz.

| Sıra | Bölüm ve biçim | Neden burada? |
|---|---|---|
| 1 | Hero: kaynak fotoğrafı, Ne pişirsem? ve genel arama; alt bölümde seçili gerçek yemek | İlk saniyede soru ile iştah açan somut cevabı birlikte verir. |
| 2 | Elinde ne var?: nötr kart içinde malzeme seçimleri, seçim yapıldığında canlı tarif sonucu | Hero'nun sorusunu keşfe dalmadan hemen kullanıcının elindekileri seçebildiği bir eyleme dönüştürür. |
| 3 | Kategoriler: kısa görselli yatay keşif bandı | Malzeme seçmek istemeyen kullanıcıya fotoğraflarla başka bir giriş sunar. |
| 4 | En son eklenen tarifler: bir büyük tarif ve altında iki sütun küçük kartlar | Küçük kategori bandından sonra fotoğrafın ağırlığını büyütür ve kaydırmadan birkaç yeni tarifi karşılaştırılabilir kılar. |
| 5 | Şefler: nötr zeminde iki sütun kimlik kartları, 40px avatar ve küçük takip eylemi | Yemeklerin ardından gerçek üreticileri görünür kılar ve fotoğraf yoğunluğuna bir okuma arası verir. |
| 6 | Tarifini paylaş: fotoğraflı, kaynak koyu overlay'li davet kartı ve tek primary eylem | Tariflerden ve şeflerden ilham alan kullanıcıyı kendi katkısını yapmaya davet ederek akışı kapatır. |

## Tasarım dili

Renk/font/radius/spacing sistemi yenilenmez: Gilroy, tomato/ink/paper/bg/nötr tokenları; kontrol12/kart24, gutter20, iç boşluk16 ve bölüm32–40. Hero'nun ışığı kaynak %25/screen/65 sönümle kalır. Tarif kartları ortak card() ailesinden sadeleşir: fotoğraf üzerinde süre ve mevcutsa puan; kalın kategori; en çok iki satırlı başlık. Açıklama ve ek meta yok. Büyük/küçük kompozisyon aynı kart anatomisini korur.

Şefler WEB.chefs gerçek isim/sayıları; fotoğraf yoksa nötr baş harf. Yeni bölüm veya stok yüz yok. Malzeme eşleşmesi mevcut gerçek yerel veriyi kullanır; başlangıçta rastgele sonuçları öne sürmek yerine seçim çağrısı görünür, seçimde gerçek sonuçlar açılır.

## Uygulama ve iki eleştiri turu

Kod öncesindeki kurgu korundu; şeflerin sunumu görsel incelemede değişti. Nihai biçim iki sütun değil, nötr bölüm içinde üçer kişilik beyaz yüzeylerdir; sonraki yüzeyin başlangıcı yana kaydırmayı gösterir. İlk yüzeyde Şahnur Ilıcalı, Göktürk Dizdar ve Şahnur Sezek görünür.

### Tur 1 — listenin uzunluğunu ve tekrarını kırma

İlk tam sayfa incelemesinde malzeme aracının seçimsiz sonuçları gereksiz yer kaplıyor, altı büyük şef kartı yemeklerden fazla ağırlık taşıyor, beş yeni tarif akışı uzatıyordu. Malzeme aracı seçim öncesinde 591px yerine 217px; şef bölümü 731px yerine 354px oldu. Tarif seçkisi bir büyük + iki küçük karta indirildi; Tümü bağlantısı en yeni sıralamasına gider. Malzeme seçilince kaynak sonuçlar aynı tarif kartıyla açılır.

- [Önce](screenshots/home-v3-redesign/round-1-before-390-full.png)
- [Sonra](screenshots/home-v3-redesign/round-1-after-390-full.png)

### Tur 2 — ilk ekran, fotoğraf kalitesi ve hiyerarşi

İkinci incelemede ilk etkileşim çok aşağıdaydı; kategori fotoğrafları 48px kaynaktan büyütüldüğü için yumuşaktı; öne çıkan tarif küçüklerle aynı ağırlıktaydı; kapanış fotoğrafı aşırı koyuydu. Hero 72dvh yerine 64dvh oldu, ilk malzeme satırı ilk ekrana yaklaştı. Aynı gerçek kategori fotoğrafları 96px render ölçüsüne göre yerelleştirildi. Büyük kart kanonik featured 20/700 rolüne geçti; CTA fotoğrafı görünür hale geldi; şeflerde sonraki yüzeye görsel ipucu verildi. Shared data-role kuralı nedeniyle featured rolünün özgüllüğü ayrıca düzeltildi; nihai QA görüntüsü bu düzeltmeyi içerir.

- [Önce](screenshots/home-v3-redesign/round-2-before-390-full.png)
- [Sonra](screenshots/home-v3-redesign/round-2-after-390-full.png)
- [Nihai 390 tam sayfa](screenshots/home-v3-redesign/chromium-390-full.png)

## Son ek — hero overlay düzeltmesi

Kaynaklar: ana-1'in `six-heroes.css` içindeki uzun `.purpose-veil` eğrisi; ana-x6'nın `set2-x6.js` / `set2-heroes.css` içindeki tek tam boy `.x-scene-photo` yapısı; `hero-light.css` içindeki detay kaynaklı %25 primary, screen karışımı ve %65 sönüm. Koyu renk mevcut `--overlay` (#211E16); yeni renk türetilmedi, koyu renge primary karıştırılmadı. Kaynak dosyaların hiçbiri değiştirilmedi.

Ana-1'deki eski `.purpose-backdrop:before` fotoğraf tekrarı son kullanıcı talimatına aykırı olduğu için V3'e taşınmadı. V3'te yalnız bir cover fotoğraf vardır; mask, gri/saturation filtresi veya arama arkasına konmuş ayrı zemin yoktur. Kaynak rafın düz kenarı ham fotoğrafta da bulunuyordu: [ham kaynak kadrajı](screenshots/home-v3-overlay/raw-photo-2x.png). Tek fotoğraf %18 yakınlaştırılıp alt merkezden kadrajlandı; rafın alt kenarı arama alanının arkasına geldi.

Koyu katman artık hero'nun tamamında tek linear-gradient: arama altı ve öneri üstünün ölçülen geometrisinden üretilen 81 duraklı smoothstep eğrisi. Üst ve alt uçların türevleri sıfıra yaklaşır; yemek çevresinde açık pencere oluşur. Yeniden boyutlanma/font yüklenmesi/kaydırma sonrası geometri yenilenir. Açılan sahne korunur; fotoğraf artık kaydırmada küçülerek kabuğundan ayrılmaz.

Primary ışık aynı kaynak yoğunluğunda kaldı; kısa kutuda kesilen katman yerine tam boy katmanda, kaynak elipsinin eşdeğer yarıçaplarıyla söner. Tek koyu gradient ve primary ışık dışında ek koyu bant yoktur.

> **Not (9 Ekim, Ana sayfa V3 kararları):** “Kaynak %25” = canlı tarif detayındaki yoğunluk (kök `app.css:292/324` `.detail-shade`). docs/35'teki %16/%24 denemeleri ve AGENTS.md'deki eski “ana sağ-alt35%” bu değere bağlanır; tek token `hero-light.css` → `--home-light-strength`.

- [Düzeltme öncesi 390 hero, 2×](screenshots/home-v3-overlay/ana-v3-before-2x.png)
- [360: ana-1 / V3, 2×](screenshots/home-v3-overlay/compare-360-2x.png)
- [390: ana-1 / V3, 2×](screenshots/home-v3-overlay/compare-390-2x.png)
- [430: ana-1 / V3, 2×](screenshots/home-v3-overlay/compare-430-2x.png)

Üç genişliğin 2× görüntüleri gözle incelendi: arama altında kesilen overlay bandı görülmedi, yemeğin doğal rengi korundu. Raf/masa/fotoğraf dokusu ile gradient'i ayırmak için ayrıca düz beyaz fotoğraf üzerinde sadece katmanlar ölçüldü: merkez sütunda yarım CSS piksel başına en büyük RGB kanal değişimi 3/255; fotoğraf dokusu bu ölçüme dahil değildir. Bu ölçüm bütün ekranların olası renk bandı garantisi değildir.

| Genişlik | Logo | Hero başlığı | Bugün deneyebilirsin | Tarif adı |
|---|---:|---:|---:|---:|
| 360 | 8.15:1 | 8.43:1 | 8.59:1 | 9.73:1 |
| 390 | 8.19:1 | 8.43:1 | 7.99:1 | 12.20:1 |
| 430 | 8.36:1 | 8.43:1 | 7.89:1 | 12.20:1 |

Kontrast tablosu ilgili öğelerin kutularındaki en açık arka plan pikseline karşı beyazın ölçümüdür; metinler geçici olarak gizlenerek arka plan yakalandı. Ölçüm: [overlay QA](home-v3-overlay-qa.json), tekrar çalıştırma: `node v3-app/docs/home-v3-overlay-qa.mjs`.

## Gerçek veri, korunmuş işlevler ve çıkarılanlar

- En son eklenen tarifler: mevcut 32 tariflik yerel veri kümesi, `recipeInfo(r).dates[0]` → `recipeDate()` azalan sıra; aynı tarihte kaynak sırası korunur, ilk üç gösterilir. Canlı kataloğun bugün en yeni üç tarifi olduğu iddia edilmez.
- Kategoriler WEB.categories verisi; kaynak URL/kopya eşlemesi [kategori kaynakları](home-v3-category-sources.json). 19 fotoğraf 96px kaynak ölçüsüyle yerel; ekran kanıtının 2×/3× olması görsel indirme boyutunu artırmaz.
- Şefler WEB.chefs: Şahnur Ilıcalı, Göktürk Dizdar, Şahnur Sezek, Canan Yücel, Emel Aksu, Ece Özdenak; sayılar kaynaktan. Doğrulanmış portre yok: 40px nötr baş harf avatarı. Takip ve paylaşım mevcut misafir giriş kapısına gider; gerçek hesap işlemi yapılmaz.
- Malzeme seçimi, gerçek yerel eşleşme, seçimi temizleme ve sonuçları listeye taşıma korunur. Sonuç kartları da yeni tarif kartıyla aynıdır.
- Menü logosu mevcut `assets/marka/dadagastro-renkli.svg`; dosyaya dokunulmadı. Header mevcut resmi beyaz varyantı kullanır.
- Çıkarılan bölümler: Videolar, Dolapta Ne Var. Ayrıca hero etiketi, yönlendirme ipucu ve yinelenen sticky arama dock'u kaldırıldı. Modüllerin diğer mevcut erişim yolları silinmedi.
- Tarif kartlarından açıklama/alt başlık, ek meta, rozet ve şef alt satırı çıkarıldı. Süre + varsa puan, kalın kategori, iki satır + ellipsis ve kaydet korundu.

## Son kontrol ve kanıtlar

Overlay düzeltmesinden sonra Chromium ve WebKit'te 360/390/430 yeniden çalıştı: 6 görünüm, 126 gerçek scroll örneği (0–400/20), yatay taşma ve JS/HTTP hatası yok; ölçülen ana eylemler en az44px; avatarlar40×40; iki satır kuralı ve bölüm sırası doğrulandı. Hero grupları header'a değmeden gizlenir, yukarı dönünce görünür; reduced-motion durumu kontrol edildi.

- [Tarayıcı ölçümleri](home-v3-redesign-qa.json), [galeri ve uzun başlık ölçümü](home-v3-redesign-gallery-qa.json)
- [360 tam sayfa](screenshots/home-v3-redesign/chromium-360-full.png), [390 tam sayfa](screenshots/home-v3-redesign/chromium-390-full.png), [430 tam sayfa](screenshots/home-v3-redesign/chromium-430-full.png)
- [Menü açık](screenshots/home-v3-redesign/menu-390.png), [uzun başlık 3×](screenshots/home-v3-redesign/long-title-3x.png)
- Uzun başlık testi aynı tarifin gerçek tam kaynak başlığını yalnız test tarayıcısına yerleştirir; kaynak veri değiştirilmez. Görünür iki satıra karşı daha uzun scrollHeight doğrulanır.
- [Galeri 1440](screenshots/home-v3-redesign/gallery-1440.png) / [390](screenshots/home-v3-redesign/gallery-390.png): ana çerçeve390×844; yanında V2 dördüncü seçenek küçültülmüş çerçeve; ikisinde de iç viewport390×844, ilk scroll0.
- Header 0/60/120/300 görüntüleri ve bileşen 3× kırpımları `screenshots/home-v3-redesign` / `screenshots/polish/home-v3-redesign` altında.

Tam sayfa görüntüleri tarayıcının ham fullPage çıktısıdır; fixed alt menü ilk viewport konumunda görünür. Ekran görüntülerinden öğe silinmedi. Ölçüm bu sayfanın adı geçen durumları içindir; tüm uygulama paritesi veya canlı tamamlanma iddiası değildir.

## Dosyalar ve sınır

Uygulama: `ana-v3.html`, `ana-sayfa-v3.js`, `ana-sayfa-v3.css`, `home-v3-category-media.js`; sunum: `ana-sayfa-v3.html`, `ana-v3-gallery.css`; yeni medya: `assets/home-v3/category-0.avif`…`category-18.avif`.

Arşiv: `eski/ana-v3-reddedilen-20261009/` (eski kaynakların byte kopyası, eski kanıtlar ve göreli yolları çözen `onizleme.html`). Dokümantasyon/kanıt: bu docs/39, `home-v3-category-sources.json`, `home-v3-redesign-*`, `home-v3-overlay-*` ve ilgili screenshot klasörleri.

Başlangıç SHA-256 listesinde kök/yayin/V2/ortak kaynaklar ve arşivi kapsayan 5545 dosyada değişiklik sıfır: [koruma kontrolü](home-v3-redesign-protected-after.json). Çalışma yalnız v3-app içindedir. Git add/commit/push, yayın veya canlı işlem yapılmadı.

Sunucu zaten çalışıyordu; yeniden başlatılmadı. Yerel adresler:
- http://127.0.0.1:8765/v3-app/ana-v3.html
- http://127.0.0.1:8765/v3-app/ana-sayfa-v3.html

Yerel çalışma tamamlandı; burada duruldu.
