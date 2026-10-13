# 40 — Ana sayfa V3: ana-x6 tabanı, modül sırası ve kararlar

9 Ekim 2026. Yalnız `v3-app`; kök, `yayin`, canlı, Laravel ve marka klasörü değişmedi. Git/yayın yok. Paralel çalışan liste ajanının dosyalarına (`liste-v2*`, `liste-sayfa-v2*`, docs/41) dokunulmadı.

## Taban ve yedekler

- Yeni `ana-v3.html`, `ana-x6.html` dosyasının (V2 galerisinin 4. tasarımı, “Açılan sahne”) byte kopyasıdır. Kopyaya eklenenler: başlık metni, `home-v3` gövde sınıfı ve üç bağlantı (`ana-v3.css`, `home-v3-category-media.js`, `ana-v3.js`). ana-x6 ve V2 dosyaları değişmedi.
- Önceki V3 (GPT/Codex sürümü) iki yerde saklanır. `eski/ana-v3-onceki/` Adım 1 temizliğinden önceki byte kopyadır. `eski/ana-v3-gpt/` Adım 1 CSS temizliği sonrası hâlidir; görsel olarak birebir aynıdır, kanıt [home-v3-css-cleanup.json](home-v3-css-cleanup.json). Her iki klasörde `onizleme.html` ve `SHA256SUMS` vardır.
- Eski `ana-sayfa-v3.css/js` dosyaları `v3-app` kökünde temizlenmiş hâliyle duruyor; yeni sayfa bunları yüklemiyor.

> **10 Ekim — bu tablo geçersiz.** Geçerli sıra en alttaki “Revize 10 Ekim (R1–R4)” bölümündedir. Patronun “Video Mutfağı ilk iki modülden biri” kuralı iptal edildi.

## Uygulanan sıra (sabit; tur 2 — Kategoriler üst yarıya alındı) — GEÇERSİZ, bkz. Revize 10 Ekim

| # | Modül | Neden burada |
|---|---|---|
| 0 | Hero: “Ne pişirsem?” + genel arama; altta öneri tarifi | Kullanıcı ya aklındakini aramak ya da “bugün ne pişirsem?” kararını vermek için gelir; iki giriş de ilk saniyede görünür. Hero sabittir. |
| 1 | Tarif bul — elindekiyle (Elinde ne var / Dolapta Ne Var) | Hero'daki sorunun en kısa cevabı: elindeki malzemeden sonuca. Kitchen Stories ve Cookpad malzemeyle aramayı ana işe bağlıyor; Samsung Food, SideChef ve Crouton seçimi sonucun yanında tutuyor (docs/35–36). |
| 2 | Video Mutfağı | Malzeme seçmeyen kullanıcı için en güçlü ilham. Tasty, YouTube ve Kitchen Stories videoyu büyük kapak + kısa rafla öne alıyor. Patron şartı: ilk iki modülden biri. |
| 3 | Kategoriler & Dünya Mutfakları | Keşfin giriş kapısı. Hâlâ karar vermemiş kullanıcıya “ne tür bir şey?” sorusuyla altı büyük fotoğraflı kapı açar. Uber Eats, Getir ve Yemeksepeti kategorileri görev bağlamının hemen ardından, üstte tutuyor; Airbnb kısa niyet seçimini içerikten önce veriyor (docs/36). Sayfanın üst yarısındadır (390'da başlangıcı ≈ %44). |
| 4 | En son eklenen tarifler | Kapılardan sonra doğrudan pişirilebilir yeni içerik (NYT Cooking'in yeni/öne çıkan dizini). Tarifi ekleyen kişinin adı kartlarda ilk kez büyük biçimde görünür. |
| 5 | Şefler (Tarifin ustaları) | Kartlarda adlarını görülen kişileri hemen ardından topluluk yüzü olarak gösterir (Mob, Cookpad). |
| 6 | Tarifini paylaş | Ustaları gördükten sonra katkıya davet eder; sayfayı tek bir net eylemle kapatır (web'deki “Şefler → Topluluk” kapanışı). |

Ritim: koyu fotoğraf (hero) → açık çalışma kartı → koyu fotoğraflı video bandı → beyaz fotoğraflı kapılar (karartılmamış) → fotoğraf üstü metinli tarif kartları → gri şef bandı → ince çizgiyle ayrılmış kapanış. Yatay raflar (video, şef) yan yana gelmez.

## İki alternatif sıra (uygulanmadı)

| Sıra | A · “İzle, sonra seç” | B · “Önce kapılar” |
|---|---|---|
| 1 | Video Mutfağı | Tarif bul |
| 2 | Tarif bul | Kategoriler & Dünya Mutfakları |
| 3 | Kategoriler & Dünya Mutfakları | Video Mutfağı |
| 4 | En son eklenen tarifler | En son eklenen tarifler |
| 5 | Şefler | Şefler |
| 6 | Tarifini paylaş | Tarifini paylaş |
| Gerekçe | Tasty, YouTube ve Kitchen Stories gibi video öncelikli akış; ilham kararın önüne geçer. | Cookpad, Uber Eats ve Getir gibi önce kısa kapılar, sonra içerik. Görev odaklı ve hızlı. |
| Bedeli | Hero fotoğrafının hemen ardından ikinci büyük görsel blok gelir; “Ne pişirsem?” sorusunun cevabı (malzeme aracı) aşağı iner. | Video üçüncü sıraya düşer (patron şartı: ilk iki); iki seçim aracı arka arkaya gelir. |

## Kararlar

**Elinde ne var + Dolapta Ne Var tek modülde iki sekme.** Ayrı iki modül aynı ekranda iki malzeme aracı gibi duruyordu. Tek modülde fark sekme adı ve açıklamayla net:
- **Elinde ne var:** anlık seçim, kaydedilmez (“Şu an elindeki malzemeleri seç; seçim kaydedilmez.”). x6'nın 8 malzemesi, gerçek yerel eşleşme, Temizle ve “Tarifleri gör” listeye taşıma korunur.
- **Dolapta Ne Var:** kayıtlı dolap. Web kaynağındaki iki ana liste (`tarif-bulucu/index.blade.php`: Dolaptakiler / Hariç tuttuklarım) var. Hızlı ekleme V2'deki gibi Tavuk/Patates/Yumurta; “Dolabımı düzenle” ortak sheet'i açar. Öneriler, dolaptaki malzemelerden en çoğunu içeren ve hariç tutulanları içermeyen tariflerdir (en çok 6 kart). Kayıt yalnız bu cihazda tutulan bir önizlemedir ve sayfada bu açıkça yazar.
- Sheet'teki malzeme adayları sabit bir listeden gelir; yalnız 32 yerel tarifte en az bir eşleşmesi olanlar gösterilir ve yanında tarif sayısı yazar. Backend malzeme havuzu varmış gibi gösterilmez.
- Orta menü panelindeki ve çekmecedeki tüm “Dolapta Ne Var” girişleri bu sekmeyi açar.

**Video Mutfağı.** Gerçek veri: prototipteki `WEB.videos` (6 kayıt: başlık, kapak, süre, izlenme). Oynatma URL'si yok. Bu yüzden dürüst kapak + oynat işareti + süre gösteriliyor; dokununca “Video kaynağı henüz eklenmedi” bilgi sheet'i açılıyor (x6'nın mevcut davranışı). Sahte oynatıcı yok. Web video kartında şef adı ve bölüm etiketi var (`home.blade.php:391–416`), ama prototip video verisinde bu alanlar yok; uydurulmadı. Fotoğraflı koyu bant x6'nın kendi değişkenleri: `--section-veil` (overlay %88), `--section-glow` (primary ışık), video kapağı.

**Tarif kartı (tur 2: baştan, “A · kaplama”).** Önce mevcut kartlar tarandı: 27 ana sayfa alternatifinin tarif bölümleri (`ana-1…9`, `ana-x1…x9`, `ana-y1…y9`) dört kalıpta toplanıyor: zeminsiz dikey kart, fotoğraf üstü editoryal kart (`editorialHero`: x2/x8/x9/y1), yatay satır (numbered/small-list: ana-4, x6, y6) ve mozaik. Aynı veriyle ve aynı DOM üzerinde üç aday kuruldu ve yan yana karşılaştırıldı ([kart-adaylari-A-B-C.png](screenshots/home-v3-x6-tur2/kart-adaylari-A-B-C.png)):
- **A · kaplama:** metin fotoğrafın üstünde (editorialHero ailesi, sadeleşmiş). **Seçildi:** en iştah açıcı ve en uygulama hissi veren aday; kategori, başlık ve yazar beyaz avatarla fotoğraf üstünde ilk bakışta okunuyor; kart kısa, büyük kart güçlü.
- **B · zeminli kart:** web tarif kartı gibi kenarlıklı yüzey, yazar altta çizgiyle ayrı. Okunaklı ama ağır ve uzun; zeminsiz kart kanonundan da uzaklaşıyor.
- **C · yatay satır:** derli toplu ama fotoğraf 120px'e küçüldüğü için iştah açmıyor; liste ekranına daha uygun.

Uygulanan A: süre + varsa puan sol üstte ortak cam kapsülde, kaydet sağ üstte; altta kalın (700) kategori, en çok 2 satır başlık + “…”, 20px beyaz baş harfli avatar + ad (tek satır, “…”). Açıklama, alt başlık, zorluk/porsiyon/maliyet ve görüntülenme yok. Koyu geçiş her kartta metnin konumundan hesaplanıyor (`cardVeils`): kaynak koyu renk (`--overlay`), ilk metinden 24px yukarıda %80, yukarı doğru 48px içinde 9 duraklı smoothstep, altta %90 (kanondaki “Fotoğraf üstü okunurluk”). İlk denemede geçiş 96px ve küçük kartlar 4:5'ti; yemek karanlıkta kaldı. Geçiş kanondaki 48px'e indi, yan yana iki küçük kart 2:3'e uzadı (iç boşluk 12px), büyük kart 4:3 kaldı; dolap/malzeme şeridi kartları 4:5. Kart metin bağlantısı 44px hedefli. Aynı kart, ana sayfadaki bütün tarif yüzeylerinde (en son eklenenler, Elinde ne var ve Dolapta Ne Var sonuçları) kullanılıyor. Veri `DATA.recipes[].author`; 32 tarifin hepsinde yazar var; kod yazarı olmayan tarifi seçkilere almaz.

**Şef kartları.** Web kaynağından aktarıldı: `home.blade.php:576–617` ve `portal.css:1241–1329, 1845–1847, 2009`. Yapı aynı: yuvarlak avatar (beyaz halka + gölge), kalın ad (en çok 2 satır, sabit yükseklik), “171 tarif”, “+ Takip Et”, sonda kesik çizgili “Sen de Şef Ol · Tarifini paylaş, rozetini kazan”. Mobilde 146px genişlikte yatay şerit. Gerçek veri: Şahnur Ilıcalı, Göktürk Dizdar, Şahnur Sezek, Canan Yücel, Emel Aksu, Ece Özdenak ve kaynaktaki tarif sayıları. Kanona uyarlananlar:
- Krem zemin → nötr `--bg`.
- 16px köşe → kart 24px; düğme 8px → kontrol 12px ve 44px hedef.
- Yazılar rol token'larına bağlandı.

**Onay gereken sapma:** avatar web'deki gibi 96px. Kanondaki 28/40/56 avatar ölçeğinin dışında; “kart yapısının aynısı” talimatı nedeniyle böyle bırakıldı. Takip ve “Sen de Şef Ol” mevcut misafir giriş/önizleme sheet'lerine gider; gerçek işlem yapılmaz.

**Hero.** x6 sahnesi korundu: tek fotoğraf, açılan/küçülen sahne, primary ışık, hilal, “Bugün deneyebilirsin”, “Malzemelerine doğru kaydır”. Değişenler:
- “Sofrana bir başlangıç” etiketinin yerine ana-1'deki başlık + arama aynı yapı ve konumla geldi.
- x6'nın alttaki “Elindekilerle başlayalım / Ne pişirsem?” başlığı (yinelenen başlık) ve yapışkan ikinci arama (yinelenen arama) kaldırıldı.
- Header arama ikonu, hero araması gizlendiği anda gelir.

**Overlay'de tek bilinçli değişiklik.** x6'nın üst koyuluğu küçük etiket için çizilmişti; etiket zaten kendi koyu cam zeminindeydi ve %25 yükseklikte sönüyordu. Başlık oraya gelince beyaz metnin arkasındaki en açık piksele karşı kontrast **1.46:1** ölçüldü (360/390). Aynı tek gradient'in üst kısmı artık başlık ve arama geometrisinden hesaplanıyor: aynı `--x-shade` rengi (overlay %86), 41 durak, smoothstep uçlar. x6'nın alt durakları (%45 şeffaf, %75 `--x-shade`, %100 overlay) aynen kaldı. Sonuç: başlık **9.09–9.20:1**, yemek bölgesi açık.

**Header eşiği.** Başlık header'ın yalnız ~22px altında olduğu için (ana-1 ile aynı yapı) header ~14px kaydırmada tam opak oluyor; ölçümde ilk tam opak örnek 20px'te. Eşik kuralı (ilk metin header'a ulaşmadan opak) karşılanıyor, ama 48px'lik yumuşak geçiş bu geometride kısa kalıyor.

**Kategoriler (tur 2: baştan).** Tarama sonucu: 27 ana sayfa alternatifinin hepsinde aynı bileşen var (küçük küçük resimli hap şerit, ikon düğmeyle mutfak geçişi); `liste-5`'te belirgin bir Kategoriler / Dünya Mutfakları `.segmented` sekmesi ve metin chip'leri var, görsel yok. Temel alınacak iyi bir kategori görseli olmadığı için web kaynağından (`gastro/partials/catstrip.blade.php`: başlık “Kategoriler & Dünya Mutfakları”, kart = görsel + ad + “N tarif”) ve docs/36'daki kategori kapıları gözleminden (Uber Eats, Getir, Yemeksepeti: küçük görsel kapılar; Kitchen Stories: düzenli görsel grid) yeni bir kurgu kuruldu. Üç deneme yan yana: [kategori-adaylari.png](screenshots/home-v3-x6-tur2/kategori-adaylari.png).
- (1) Ad ve sayı fotoğraf üstünde: kanondaki koyu geçiş kısa kutuyu tümüyle kararttı, iştah kayboldu.
- (2) Ad altta, sayı yanda: uzun ad kesildi (“Balık ve Deniz…”).
- (3) **Seçilen:** karartılmamış 3:2 fotoğraf, tarif sayısı fotoğraf üstünde tarif kartlarındaki ortak cam kapsülde, tam ad altta (en çok 2 satır). Geçiş liste-5'teki gibi tam genişlik `.segmented`, ikonlu. 2×3 ızgarada tarif sayısı en yüksek altı kategori; “Tüm kategoriler (34)” / “Tüm dünya mutfakları (50)” ortak sheet'te görselli satır listesi açar. Dünya Mutfakları'nda web'de görsel yok: aynı ölçüde nötr zemin + FA dünya ikonu; görsel uydurulmadı.

Görseller: önceki yerel kopyalar 96×64 (`home-v3`) ve 48×32 (`six-media`) idi, büyük kutuya yetmiyordu. Canlıdaki 19 özgün görsel (400px genişlik) yalnız okunarak indirildi; ızgara hücresinin en geniş render ölçüsüne (480px kabukta 214px) göre 216×144 WebP olarak `assets/home-v3/kategori/` altına üretildi (19 dosya, 208 KB). Kaynak/çıktı ölçüleri [home-v3-kategori-kaynaklari.json](home-v3-kategori-kaynaklari.json), eşleme `home-v3-kategori-media.js`. Eski `home-v3-category-media.js` dosyasına dokunulmadı (yedeklerin önizlemeleri onu kullanıyor).

**Tarifini paylaş.** Web kaynak metni ve açık zemin: “Topluluğa Katıl / Senin de bir tarifin var / Tariflerini paylaş, denendikçe puan topla, mutfak defterini herkesle buluştur. / Tarifini Paylaş”. Fotoğraf yok. Web'deki “DadaGastro uygulamasıyla her şey cebinde” cümlesi, kanondaki “uygulama indirme tanıtımı yok” kuralı gereği alınmadı. Kapanışı ayırmak için üstte ince çizgi var.

**Çekmece.** En üstte resmi renkli logo (`assets/marka/dadagastro-renkli.svg`, 120px), altında “Merhaba”. “Ne Pişirsem?” Tarif bul panelini, “Dolapta Ne Var?” kayıtlı dolap sekmesini, “Püf Noktaları” püf sheet'ini açar.

## Bağlantılar

Önceki raporumdaki 404 iddiası yanlıştı. `six-home.js` içindeki `connect()` çalışma anında `index.html` → sayfanın kendisi, `tarifler.html` → `liste.html` olarak yeniden yazıyor. Ölçülen hedeflerin hepsi 200 döndü (`ana-v3.html`, `arama.html`, `detay-c.html`, `liste.html`).

| Bağlantı | Hedef |
|---|---|
| Header logosu, çekmece logosu, Ana Sayfa | `ana-v3.html` |
| Hero araması, header arama ikonu, çekmece araması | `arama.html?donus=ana-v3.html` |
| En son eklenenler · Tümü | `liste.html?sirala=en_yeni` (liste `en_yeni` sıralamasını destekliyor) |
| Şefler · Tümü | `arama.html?tur=sef&donus=ana-v3.html` (arama şef sekmesini açıyor) |
| Video Mutfağı · Tümü | Ekranda tüm videoları gösteren sheet. Prototipte video sayfası **yok**. |
| Kart / kategori / mutfak | `detay-c.html?tarif=…`, `liste.html?kategori=…`, `liste.html?mutfak[]=…` |
| Çekmece: Ne Pişirsem? / Dolapta Ne Var? / Püf Noktaları | Sayfadaki karşılıkları (yukarıda) |
| Çekmece: Mutfağa Giriş, Mutfak Ansiklopedisi, Sözlük, Ölçü Birimleri, Sofra Düzeni, Görüş Bildir | Prototipte karşılığı **yok** → kanondaki “Yakında” bildirimi |

## Ölçüm ve iki eleştiri turu

**Tur 1** (tam boy ve 3× kırpımlar):
- Baş harfli kart avatarı beyaz zeminde kayboluyordu → ortak avatar bileşeninin `--line` zeminine bağlandı.
- Öne çıkan kartta tek satırlık başlıktan sonra boş satır ve 44px'lik eski bağlantı yüksekliği vardı → büyük kartta ayrılmış ikinci satır kaldırıldı, yazar satırı bilgi satırına çevrildi (başlık→yazar 8px).
- Dolap sheet'inin “Bitti” düğmesi yarım genişlikteydi → tam genişlik.
- Hero başlığı açık kaselerin üstünde okunmuyordu (1.46:1) → overlay'in üst kısmı geometriye bağlandı (9.1:1).

**Tur 2:**
- Sayfa sonu Kategoriler ile aynı beyaz yüzeyde dağılıyordu → kapanışa ince çizgi.
- Çekmecede “Merhaba” logonun yanına sıkışıyordu → logo kendi satırında, 120px.
- Uzun şef adı kırpımını alt menü örtüyordu → kanıt yeniden alındı.

**Son kontrol** ([home-v3-x6-qa.json](home-v3-x6-qa.json), tekrar çalıştırmak için proje kökünden `node v3-app/docs/home-v3-x6-qa.mjs`): Chromium + WebKit, 360/390/430; 6 görünüm.
- Bölüm sırası doğrulandı.
- Yatay taşma, JS hatası ve HTTP ≥400 yanıtı yok.
- Ana içerikteki bütün bağlantı ve düğmeler en az 44px.
- Her görünür tarif kartında gerçek yazar adı tek satırda ve kartın içinde; kart avatarı 20×20, şef avatarı 96×96, kategori ağırlığı ≥700, başlık en çok 2 satır, gutter 20.
- Header 0–400px / 20px adımla ölçüldü: çakışma 0; arama ikonu, hero araması gizlendiği anla tutarlı. Reduced-motion'da alfa yalnız 0/1.
- Menü logosu yükleniyor; çekmeceden Dolapta Ne Var açılıyor.
- Dolap yeniden yüklemeden sonra kalıcı ve sonuç kartlarında yazar var; Elinde ne var sonuçlarında da yazar var.
- Kategoriler 34'e açılıyor, mutfak geçişi çalışıyor, video sheet'i dürüst metni gösteriyor.
- Uzun ad testi (yalnız test tarayıcısında; veri değişmez): kart yazarı “…” ile tek satır, uzun başlık 2 satır + “…”, şef adı en çok 2 satır.

Görüntüler `screenshots/home-v3-x6/`:
- Tam boy: `chromium|webkit-360|390|430-full.png`
- Header: `scroll-0|60|120|300-390.png`
- Diğer: `menu-390.png`, `dolap-390.png`, `uzun-ad-kart-390.png`, `uzun-ad-sef-390.png`
- Hero yan yana: `hero-x6-v3-390.png`
- Galeri: `galeri-1440.png`, `galeri-390.png` ([galeri ölçümü](home-v3-x6-gallery-qa.json): iki iframe 390×844, scroll 0)

Tam boy görüntüler tarayıcının fullPage çıktısıdır; sabit alt menü ilk viewport konumunda görünür.

Ölçüm yalnız adı geçen durumlar içindir; bütün fotoğraf ve durumlar için kontrast ya da parite garantisi değildir.

## Tur 2 ölçümü

[home-v3-x6-tur2-qa.json](home-v3-x6-tur2-qa.json) (proje kökünden `node v3-app/docs/home-v3-x6-tur2-qa.mjs`): Chromium + WebKit, 360/390/430, 6 görünüm. Tur 1 kontrollerinin hepsi yeni sırayla tekrarlandı; ek olarak 6 kategori kapısı, 34/50 satırlık sheet'ler, kapıların ≥44px hedefi ve fotoğraf üstü kart metinlerinin kontrastı ölçüldü. Kontrast, metin alanının (görünür kutuyla kesişen metin aralığı) arkasındaki en açık piksele göre:

| Genişlik | Büyük kart başlık / kategori / yazar | 2. kart | 3. kart |
|---|---|---|---|
| 360 | 10.80 / 9.92 / 12.84 | 10.50 / 10.14 / 14.57 | 14.70 / 13.37 / 15.21 |
| 390 | 12.43 / 11.90 / 12.66 | 10.50 / 9.69 / 14.52 | 14.85 / 13.37 / 15.02 |
| 430 | 12.25 / 11.90 / 12.65 | 10.68 / 9.56 / 14.33 | 15.39 / 14.04 / 15.01 |

Önce/sonra: [390 tam boy](screenshots/home-v3-x6-tur2/once-sonra-390-full.png), [kategoriler](screenshots/home-v3-x6-tur2/once-sonra-kategoriler.png), [tarif kartı](screenshots/home-v3-x6-tur2/once-sonra-tarif-karti.png); 3× yakın çekimler `sonra-kategoriler-3x.png`, `sonra-tarif-karti-3x.png`. Ölçüm yalnız bu verilerle ve bu durumlar içindir.

## Tur 3 — Video Mutfağı ve hero görseli

**Sorun (önce).** Video bandının arka planı 400×300'lük video karesiydi (`six-media`), yaklaşık 390×700'lük banda ~2.3 kat büyütülüp bulanıklaşıyordu. Üstüne düz %88 koyu katman vardı; başlık ve izlenme yazıları doğrudan bu çamurlu zeminin üstündeydi; büyük kart zeminle karışıyordu.

**Üç aday** ([video-adaylari-mevcut-V1-V2-V3.png](screenshots/home-v3-x6-tur3/video-adaylari-mevcut-V1-V2-V3.png)):
- **V1 · koyu görselli zemin + beyaz iç kartlar.** **Seçildi:** net arka plan, kart sınırları belirgin, başlık ve izlenme kendi beyaz zemininde; bölüm hâlâ öne çıkıyor.
- **V2 · açık zemin + görselli kartlar.** Çok okunaklı ama modül öne çıkmıyor; açık araç kartının ardından sıradan kalıyor.
- **V3 · tam genişlik öne çıkan video.** Video kapakları yalnız 400×266; 390×488'e büyütülünce bulanıklaşıyor. Görsel kuralı gereği elendi.

**Uygulanan V1.**
- Arka plan: gerçek veri setinden Sardalya Izgara fotoğrafı (`assets/media/ec7594a47498e121f9f0.webp`, **1600×1073**). Koyu ve rustik tonu bantta çamurlaşmıyor. Banda küçültülerek oturuyor (ölçek 360: 0.605, 390: 0.621, 430: 0.642; 1'in altı = büyütme yok).
- Overlay, tarif detay ailesinden (`app.css` `.detail-shade`): sağ üstte %25 primary radyal ışık (0→65%, screen) + #211E16'dan tek, 9 duraklı yumuşak gradient. Başlık arkasında %90, kartların arkasında %60'a iner, altta %82. Bant yok, ayrı koyu katman yok.
- Kartlar: beyaz yüzey, kart köşesi 24px, kapak 16:9. Başlık ve izlenme kartın içinde. Oynat düğmesi kontrol köşeli kare, süre rozeti koyu; ikisi de tüm kartlarda aynı. Sağdaki kart kesik kalarak kaydırılabildiğini gösteriyor.
- Video kapakları 400×266; büyük kartta 320–390px'e küçülüyor (ölçek 0.80–0.98), büyütülmüyor.

**Hero görseli.** Levrek fotoğrafı soluk ve tekdüzeydi. Gerçek veri setinden üç aday yan yana denendi ([hero-adaylari-16-14-24-17.png](screenshots/home-v3-x6-tur3/hero-adaylari-16-14-24-17.png)): **14 Jiao Yan Karides**, 24 Semizotlu Yumurta, 17 Mercimekli Yaprak Sarma. Patates Mücveri, En son eklenenler'in büyük kartıyla çakıştığı için aday dışı bırakıldı.

**Seçilen: Jiao Yan Karides** (`assets/media/02a17618ce3eff18712f.webp`, 1600×1074).
- En renkli ve iştah açıcı tabak; turuncu-kırmızı tonu marka domatesiyle uyumlu.
- Konu (karidesler), başlık ile aramanın altındaki açık pencerede bütün okunuyor.
- Öneri satırı aynı tarifle eşleşiyor: “Bugün deneyebilirsin · 40 dk · Jiao Yan Karides”.
- Sınır: portre hero'da (390×608) 1600×1074 fotoğrafın ancak ~%43'ü görünür; tabağın kenarları her adayda kırpılır. Fotoğraf küçültülerek oturur (608px yükseklikte ölçek 0.566), büyütme yok.
- Overlay eğrisi, primary ışık ve hilal değişmedi.

**Kontrast** ([home-v3-x6-tur3-qa.json](home-v3-x6-tur3-qa.json); `node v3-app/docs/home-v3-x6-tur3-qa.mjs`). Açık metinde en açık, koyu metinde en koyu arka plan pikseline göre ölçüldü.

| Genişlik | Hero başlık | Video başlığı | Tümü | Kart başlığı | İzlenme | Süre rozeti |
|---|---:|---:|---:|---:|---:|---:|
| 360 | 10.43 | 12.60 | 10.42 | 16.64 | 7.86 | 16.64 |
| 390 | 10.42 | 13.22 | 10.84 | 16.64 | 7.86 | 16.64 |
| 430 | 10.27 | 13.83 | 11.02 | 16.64 | 7.86 | 16.64 |

Chromium + WebKit, 360/390/430 genişlikte tur 1–2 kontrollerinin hepsi yeniden geçti (sıra, taşma, ≥44px hedefler, yazar adları, header 0–400px, menü, dolap, kategoriler, uzun ad, reduced-motion, HTTP/JS hatası yok). Yerel Python sunucusu yük altında bağlantı düşürdüğü için QA, önceki turlardaki `verification/set3/http-queue.mjs` kuyruğunu kullanıyor (aynı anda en çok 3 istek + yeniden deneme).

Görüntüler `screenshots/home-v3-x6-tur3/`: `once-sonra-video.png`, `once-video-3x.png`, `sonra-video-3x.png`, `once-sonra-hero.png`, `chromium|webkit-360|390|430-full.png`.

## Tur 4 — Video kartları (tarif kartı ailesine geçiş)

**Sorun (tur 3).** Koyu zeminin üstündeki kalın beyaz kutular ağırdı. İki satırlık küçük başlıkta izlenme satırı kesiliyordu, sağdaki kart kenara yapışıyordu, başlıklar büyüktü, zemin görseli kartların arkasında anlamsız kalıyordu.

**İki aday** ([video-adaylari-acik-koyu.png](screenshots/home-v3-x6-tur4/video-adaylari-acik-koyu.png)). Kartlar ikisinde de aynı: kapak içi metin + metin konumundan hesaplanan koyu geçiş. Fark zeminde.
- **Açık zemin.** **Seçildi:** kartlar fotoğraf olarak net ayrışıyor, tarif kartlarıyla aynı aile. Web kaynağındaki `.vids-sec` de açık zemin (krem; kanonda nötr `--bg`).
- **Sade koyu zemin** (#211E16 + %25 primary ışık). Kartların koyu alt geçişi zemine karışıyor, kart kenarları kayboluyor; zemin kartlarla yarışıyor.

**Uygulanan.**
- Zemin: tam genişlik nötr `--bg` bant, fotoğraf yok. Başlık satırı 32px üst boşlukla, header'ın altına sıkışmıyor.
- Kart: kenarlık ve kutu yok; 24px köşeli kapak. Başlık ve izlenme kapağın altında, tarif kartlarındaki koyu geçişin (`cardVeils`: ilk metinden 24px yukarıda %80, 48px yumuşama, altta %90) üstünde.
- Rozetler: süre sol üstte tarif kartıyla aynı cam kapsülde; oynat sağ üstte 44px kontrol köşeli kare. İkisi de her kartta aynı boyut ve konumda, metinle çakışmıyor.
- Tipografi: küçük kartta başlık kart rolünde (16/500), büyük kartta öne çıkan rolünde (20/700); en çok 2 satır + “…”. İzlenme meta rolünde (13).
- Oranlar: büyük kart 3:2, küçükler 230×230 kare. İkisi de kaynak karelerin (400×266, 400×300, 266×400, 400×712) büyütülmeden sığdığı oranlar: ölçek 0.575–0.977.
- Raf: 12px aralık, son kart sağda 20px gutter ile bitiyor. İlk ekranda 1.49 / 1.61 / 1.78 kart görünüyor (360/390/430).
- Cam kapsül: sayfa genelinde %56 yerine %72 kaynak koyu. %56'da süre rozeti açık kapakta 3.89:1 ölçülmüştü. Tarif, video ve kategori kapsülleri aynı.

**Kontrast** ([home-v3-x6-tur4-qa.json](home-v3-x6-tur4-qa.json); `node v3-app/docs/home-v3-x6-tur4-qa.mjs`). Açık metinde en açık, koyu metinde en koyu arka plan pikseline göre; küçük kart değerleri beş kartın en düşüğü.

| Genişlik | “Video Mutfağı” | Tümü | Kart başlığı (en düşük) | İzlenme (en düşük) | Süre rozeti (en düşük) | Görünen kart |
|---|---:|---:|---:|---:|---:|---:|
| 360 | 15.81 | 6.33 | 9.74 | 11.27 | 6.58 | 1.49 |
| 390 | 15.81 | 6.33 | 9.75 | 11.27 | 6.58 | 1.61 |
| 430 | 15.81 | 6.33 | 9.75 | 11.27 | 6.58 | 1.78 |

Uzun başlık testi (yalnız test tarayıcısında): küçük kartta başlık 2 satır + “…”, izlenme satırı görünür ve kapağın içinde ([uzun-baslik-video-390.png](screenshots/home-v3-x6-tur4/uzun-baslik-video-390.png)).

Önce/sonra: [360/390/430](screenshots/home-v3-x6-tur4/once-sonra-video-360-390-430.png), 3× `once-video-390-3x.png`, `sonra-video-390-3x.png`. Tur 1–3 kontrollerinin hepsi Chromium + WebKit, 360/390/430'da yeniden geçti.

## Yan menü (burger) — ortak bileşen

**Sorun (önce).** Logo aşırı büyüktü, “Merhaba” logonun altına yapışıktı; ikon ve yazılar iriydi; Tarifler açılınca 14 kategori ikonlarıyla yığılıyordu; Mutfak Sırları açılınca içerik yoktu; dil yalnız TR/EN segmentiydi ([önce/sonra](screenshots/ortak-menu/once-sonra-menu-390.png)).

**Kurulum.** Bileşen ayrı dosyalarda: `ortak-menu.css`, `ortak-menu.js`. Şimdilik yalnız `ana-v3.html` bağlı; liste ve detay dosyalarına bu turda bağlanmadı.
- Header'daki menü düğmesi değişmedi: global `openSiteDrawer()` bileşene devredildi.
- Sayfa entegrasyonu `OrtakMenu.configure({active, links, actions})` ile. Eylem tanımlıysa sayfa işi üstlenir; yoksa bağlantıya gidilir; bağlantı yoksa kanondaki “Yakında” bildirilir.
- Ana sayfada Ne Pişirsem? → Tarif bul paneli; Dolapta Ne Var? → kayıtlı dolap sekmesi; Püf Noktaları → püf sheet'i; Kategoriler / Dünya Mutfakları → kategori modülünün ilgili sekmesi. Tabaktan Tarif → `tabaktan-tarif.html?donus=ana-v3.html`.

**Görünüm.**
- Çekmece: sağdan açılır, %86 / en çok 360px, düz sol kenar, 250ms (reduced-motion'da anlık). Esc, kapat düğmesi ve backdrop kapatır.
- Üst alan: header ölçeğinde (64px) resmi renkli logo + 44px kapat.
- Kullanıcı alanı iki durumlu:
  - Misafir: “Merhaba” + kısa açıklama + Giriş Yap (birincil) / Üye Ol (ikincil). İkisi de sitenin mevcut giriş kapısını açar.
  - Üye (`?giris=1`): baş harfli avatar + “Örnek Üye” + gerçek kademe adı “Mutfak Meraklısı” (Laravel `CommunityTierSeeder`, 2. kademe) + Profilim; kısayollar Kaydettiklerim, Tariflerim, Bildirimler; “Önizleme: örnek üye görünümü, gerçek oturum yok” notu.
- Satırlar: 48px, 24px ikon sütunu + 12px boşluk, ikon 18px, yazı gövde rolü (15/500).
- Aktif sayfa: domates koyu yazı/ikon + çok açık domates zemin (kontrast 5.67:1).
- Ayırıcı yalnız öğelerin arasında. Alt menüler tek açık akordeon; yükseklik `grid-template-rows 0fr→1fr` ile zıplamadan açılır; kapalı alt menü `inert`.
- Dil: kaydırılan alanın sonunda tek satır “Dil: Türkçe”. Açılan listede Türkçe, English, Español, Русский, Deutsch. Seçim cihazda saklanır ve “çeviri bu prototipte yok” bildirilir.
- En altta sade sosyal ikonlar (canlı sitedeki Instagram, Facebook, X adresleri) ve Hakkımızda · Gizlilik Politikası (prototipte sayfa yok → Yakında).

**Canlı site eşlemesi** (dadagastro.com mobil çekmece, 9 Ekim 2026'da yalnız okunarak):

| Canlı çekmece (sıra, ikon, adres) | Prototip menü | Not |
|---|---|---|
| — | Ana Sayfa (`house`) | Canlıda logo ana sayfaya gider; prototipte aktif sayfa göstergesi için satır olarak eklendi. |
| Tarifler (`book-open`, /tarifler) + alt: Tüm Tarifler + 14 kategori (Sebze, Kırmızı Et, Meze, Atıştırmalık, Kahvaltılık, Balık ve Deniz Ürünleri, Çorba, Tavuk ve Hindi, Pilav, Tatlı, Sandviç Burger ve Dürüm, Meyve Tarifleri, İçecek, Köfte ve Kebap) | Tarifler → Tüm Tarifler, Kategoriler, Dünya Mutfakları | Talimat gereği kategoriler menüde liste olarak açılmaz; “Kategoriler” kategori ekranına (ana sayfada kategori modülüne, diğer sayfalarda `liste.html`) gider. Dünya Mutfakları canlı çekmecede yok, kategori modülünün sekmesi. |
| Ne Pişirsem? (`utensils`, /bugun-ne-pisirsem) | Ne Pişirsem? (`utensils`) | Aynı ad ve ikon. |
| Dolapta Ne Var? (`basket-shopping`, /dolapta-ne-var) | Dolapta Ne Var? (`basket-shopping`) | Aynı. |
| Püf Noktaları (`lightbulb`, /puf-noktalari) | Püf Noktaları (`lightbulb`) | Aynı. |
| — | Tabaktan Tarif (`camera`) + Pro rozeti | Onaylı mobil ekstra (AGENTS “Onaylı mobil ekstralar”); orta düğme panelindeki seçenekle aynı hedef. |
| Mutfak Sırları (`mortar-pestle`, /mutfak-sirlari) + alt: Mutfağa Giriş (`graduation-cap`), Mutfak Ansiklopedisi (`seedling`), Sözlük (`book-open`), Ölçü Birimleri (`scale-balanced`), Sofra Düzeni (`utensils`) | Aynı ad, sıra ve ikonlar | Prototipte bu sayfalar yok → Yakında. |
| Üye bloğu: Modüllerim (Mutfak Defterim, Menülerim, Topluluğum, Şef Panelim) · Gelişimim (Rozetlerim) · Hesabım (Paketlerim, Ödemelerim, Hesap Ayarları, Çözüm Merkezi) · Oturum (Çıkış) | Üye önizlemesinde “Hesabım” akordeonu: aynı 9 satır + Çıkış | Çıkış önizlemede `?giris` parametresini kaldırır. |
| Alt: Giriş Yap / üye: avatar, Bildirimler, Çıkış | Üst kullanıcı alanı (misafir / üye) | Talimat gereği üste taşındı; üye kısayolları Kaydettiklerim, Tariflerim, Bildirimler. Kaydettiklerim canlıdaki Mutfak Defterim'e, Tariflerim Şef Panelim'e karşılık gelir; adlar talimattan. |
| Dil: TR / EN | Dil: TR, EN, ES, RU, DE | Çok dil planı; prototipte yalnız tercih saklanır. |
| Görüş Bildir (sitede yüzen sekme, `comment-dots`) | Görüş Bildir (`comment-dots`) | Talimat gereği menü satırı. |
| Altbilgi: Instagram, Facebook, X; Hakkımızda, İletişim, Kullanım Koşulları, Gizlilik Politikası, Çerez, KVKK | Instagram, Facebook, X; Hakkımızda, Gizlilik Politikası | Talimat gereği yalnız iki yasal bağlantı; diğerleri altbilgi kapsamında. |

**İki eleştiri turu.**
- Tur 1: sosyal ikonlar boş kutu görünüyordu (ortak `.icon` kuralı yazı tipini Solid'e sabitliyor) → marka ikonları kendi sınıfıyla. Dil listesi sabit alt alandan yukarı açılıp menü satırlarını kesiyordu → dil, sosyal ve yasal alan kaydırılan alanın sonuna taşındı, açılınca görünür alana kayıyor. “Gizlilik Politikası” iki satıra bölünüyordu → yasal bağlantılar ayrı satırda, tek satır.
- Tur 2: dört durum ve 360/430 yeniden görüntülendi; ölçüler programatik doğrulandı.

**Doğrulama** ([ortak-menu-qa.json](ortak-menu-qa.json); `node v3-app/docs/ortak-menu-qa.mjs`): Chromium + WebKit, 360/390/430.
- Sıra ve etiketler; satır 48px, ikon 18px, yazı 15px, logo 64px; çekmece 310/335/360px.
- Ayırıcı sayısı = öğe − 1; ≥44px hedefler; tek açık grup; kapalı alt menü `inert`.
- Esc ve backdrop ile kapanma; beş dil ve kaydedilen seçim.
- Sayfa eylemleri; üye görünümü (9 satır + Hesabım'da 10 satır, 3 kısayol); JS hatası yok.
- Ana sayfa QA'sı (tur 4 betiği) yeni menü seçicileriyle yeniden geçti.

Görüntüler `screenshots/ortak-menu/`: misafir, üye, üye-Hesabım açık, Tarifler açık, Mutfak Sırları açık, dil açık (her biri 360/390/430); pano `menu-durumlari-390.png`.

## Tur 5 — Dünya Mutfakları bayrakları, ortak “Tümü” kalıbı, video metin hiyerarşisi

**Dünya Mutfakları.** Kutular yalnız gri zemin + genel dünya ikonuydu. Bayrak seti ve eşlemesi liste-v2 ile aynı kaynak: `liste-v2.js` `FLAG` (web `/varliklar/flags/xx.svg`, Laravel `public/flags` ile aynı SHA) → `assets/flags/*.svg`; liste-v2 dosyalarına dokunulmadı. Emoji yok.
- 50 mutfaktan 49'unun bayrağı var; ülkesi olmayan bölgesel mutfakta nötr FA solid dünya ikonu.
- Yerel veri setinde o mutfaktan gerçek tarif olan kutularda (ilk altıda Türk ve Hint) tarif fotoğrafı + sayı rozeti, adın yanında 20px bayrak (Kategoriler kutularıyla aynı dil).
- Fotoğrafı olmayanlarda bayrak (48px) ortada, sayı rozeti köşede; kutu boş durmuyor.
- Tüm mutfaklar sheet'inde her satırda bayrak.
- [Önce/sonra](screenshots/home-v3-x6-tur5/once-sonra-dunya-mutfaklari-390.png), [sheet](screenshots/home-v3-x6-tur5/dunya-mutfaklari-sheet-390.png).

**“Tümünü gör” kalıbı.** İki aday ([tumu-adaylari-A-B.png](screenshots/home-v3-x6-tur5/tumu-adaylari-A-B.png)):
- **A · başlığın sağında “Tümü →”.** **Seçildi:** diğer bölümlerle aynı kalıp, raflarda da çalışıyor ve altı gerçek kapının hiçbirini harcamıyor.
- **B · son hücrede “+N daha”.** Izgaradan bir kategoriyi çıkarıyor; raflarda (Videolar, Şefler) uygulanamıyor; Şefler şeridinin sonunda zaten “Sen de Şef Ol” kartı var.

Uygulanan: tam genişlik çerçeveli düğme kaldırıldı. Video Mutfağı, Kategoriler & Dünya Mutfakları, En son eklenen tarifler ve Şefler'de tek stil: domates koyu, meta 13px, ok ikonu, 44px hedef. QA dördünün aynı renk, ölçü ve yükseklikte olduğunu doğruluyor. Kategoriler ve Dünya Mutfakları aynı modülü ve tek bağlantıyı paylaşır; bağlantı açık sekmenin tam listesini (34 / 50) sheet'te açar.

**Video metin hiyerarşisi.** Başlık kart rolünde kalın (GilroyBd 700, öne çıkan kartta öne çıkan rolü 20/700), en çok 2 satır + “…”. İzlenme meta rolünde (13px), beyazın %78'i, başlıktan bir ölçek adımı (8px) ayrık; ikon dikeyde ortalı. Metin bloğu sabit iç boşlukla altta (küçük 12px, büyük 16px), koyu geçiş metin konumundan hesaplanıyor. [Önce/sonra](screenshots/home-v3-x6-tur5/once-sonra-video-390.png).

**Kontrast** ([home-v3-x6-tur5-qa.json](home-v3-x6-tur5-qa.json); `node v3-app/docs/home-v3-x6-tur5-qa.mjs`). Ölçüm bu turda daha katı: yarı saydam metin her arka plan pikselinin üstüne birleştirilip en kötü piksel alınıyor.

| Genişlik | Video kart başlığı (en düşük) | İzlenme (en düşük) | Süre rozeti (en düşük) | “Tümü” |
|---|---:|---:|---:|---:|
| 360 | 9.7 | 7.63 | 6.58 | 6.33 |
| 390 | 9.7 | 7.63 | 6.58 | 6.33 |
| 430 | 9.71 | 7.63 | 6.58 | 6.33 |

Chromium + WebKit, 360/390/430'da önceki turların bütün kontrolleri ve menü QA'sı yeniden geçti.

## Tur 6 — Dünya Mutfakları 4 sütun ve sıralı bölüm zeminleri

**Dünya Mutfakları.** Tüm öğeler tek yapıda: 48×48 kontrol köşeli bayrak çerçevesi (daire yalnız avatarlarda), altında ortalı ad (en çok 2 satır), hemen altında meta rolünde tarif sayısı. Ad ile sayı arası 4px; hücreler üstten hizalı; boşluklar token ölçeğinde. 360/390/430'da 4 sütun. Dokunma durumu: açık domates zemin + bayrakta domates halka; odakta 2px halka; öğe en az 74×130px. Fotoğraflı ve boş büyük kartlar kalktı.

Bayraklar `assets/flags` (liste-v2'nin kullandığı, canlıyla aynı 49 SVG; yalnız okunup kullanıldı). Bayrağı olmayan tek mutfak **Balkan Mutfağı**: aynı çerçevede nötr FA solid dünya ikonu. Sıra gerçek tarif sayısına göre. İlk 16'nın hepsi bayraklı; Balkan yalnız tam listede (sheet). “Tümü →” iki sekmede aynı yerde: bölüm başlığının sağında, açık sekmenin tam listesini açar.

**Bölüm zeminleri.** Hero'dan sonraki bölümler konuma bağlı `:nth-child(odd/even)` kuralıyla alterne ediyor: 1. açık gri (`--bg`) → 2. beyaz (`--paper`) → 3. gri → 4. beyaz → 5. gri → 6. beyaz. Bölümler kenardan kenara; aralarında boşluk ve ayraç çizgisi yok; Topluluğa Katıl üstündeki çizgi kaldırıldı.

Kart yüzeyi bölümden okunuyor (`--v3-surface`, `--v3-surface-line`): gri bölümde beyaz kart, beyaz bölümde hafif kenarlıklı beyaz kart. Bu yüzden sıra değişse de doğru kalır. Uygulanan yerler: Tarif bul aracı (artık bandın üstünde bir kart) ve şef kartları. Fotoğraf kartlarının (video, tarif, kategori) kendi görseli olduğu için kenarlık eklenmedi.

Not: kanondaki açık gri `--bg` (#F9F9F9) beyaza çok yakın; ayrım bilerek ince. Daha belirgin istenirse yeni bir ton gerekir, ortak token dosyasına dokunulmadı.

QA: [home-v3-x6-tur6-qa.json](home-v3-x6-tur6-qa.json) (`node v3-app/docs/home-v3-x6-tur6-qa.mjs`). Chromium + WebKit, 360/390/430: zemin sırası, tam genişlik, bölümler arası 0px, ayraç yok, 16 öğe / 4 sütun / eşit çerçeve / 2 satır ad, sheet'te 49 bayrak + 1 ikon. Önceki turların bütün kontrolleri ve menü QA'sı yeniden geçti.

## Tur 7 — iki sekmenin panel yüksekliği (DURULDU, karar bekliyor)

Talimat: Dünya Mutfakları 4×4 = 16 öğe; iki panelin yüksekliği birebir aynı; sabit piksel yüksekliği atanmayacak; önce öğe sayısı ve satır aralığı token ölçeğinde ayarlanacak; fark kapanmazsa durulup iki yükseklik raporlanacak.

**Ölçülen yükseklikler** ([home-v3-x6-tur7-sekme-yukseklik.json](home-v3-x6-tur7-sekme-yukseklik.json)). Kategoriler 6 öğe / 3 satır; Dünya Mutfakları 16 öğe / 4 satır. “Tümü →” iki sekmede de panelin dışında, başlık satırında.

| Motor | Genişlik | Kategoriler paneli | Dünya Mutfakları paneli | Fark | Bölüm (Kategoriler → Mutfaklar) | Sonraki bölüm top farkı |
|---|---:|---:|---:|---:|---|---:|
| chromium | 360 | 451.97 | 570.25 | 118.28 | 764.17 → 764.17 | 0 |
| chromium | 390 | 481.97 | 570.25 | 88.28 | 754.25 → 754.25 | 0 |
| chromium | 430 | 502 | 570.25 | 68.25 | 754.25 → 754.25 | 0 |
| webkit | 360 | 451.97 | 570.25 | 118.28 | 764.95 → 764.95 | 0 |
| webkit | 390 | 481.97 | 570.25 | 88.28 | 754.25 → 754.25 | 0 |
| webkit | 430 | 502 | 570.25 | 68.25 | 754.25 → 754.25 | 0 |

**Token ölçeğinde denenenler** (Dünya Mutfakları paneli, Chromium; Kategoriler 360: 451.97 / 390: 481.97 / 430: 502.00):

| Deneme | Mutfak paneli (her genişlikte) |
|---|---:|
| Mevcut: satır aralığı 16, hücre iç boşluğu 8, bayrak 48 | 570.25 |
| Satır aralığı 8 | 546.25 |
| + hücre iç boşluğu 4 | 514.25 |
| Satır aralığı 4, iç boşluk 4, bayrak→ad 4 | 486.25 |
| + iç boşluk 0, bayrak 40 | 422.25 |
| Satır aralığı 0, bayrak 32 | 378.25 |

**Neden kapanmıyor.**
- Kategoriler paneli genişlikle değişiyor: 3:2 fotoğraflar sütun genişliğiyle büyüyor, uzun adlar genişliğe göre 1–2 satır arasında kayıyor (360→430: +50px).
- Dünya Mutfakları paneli sabit ölçülü bayraklar yüzünden her genişlikte aynı.
- Tek bir token ayarı üç farklı hedefi tutturamaz. Metin satır yükseklikleri kesirli olduğu için (…25 / …97) tek bir genişlikte bile birebir eşitlik yakalanmıyor; en yakın 390'da 486.25'e karşı 481.97 (4.28px).
- Talimat gereği sabit yükseklik atanmadı ve durup raporlandı.

**Şu anki davranış.** Tur 6'da iki panel aynı ızgara hücresinde üst üste duruyor. Bölüm yüksekliği büyük olanınki; sekme değişince bölüm farkı ve altındaki bölümün top farkı iki motorda, üç genişlikte **0px**. Yani sayfa zıplamıyor. Panellerin kendi yükseklikleri ise eşit değil: şu an Kategoriler sekmesinin altında 68–118px boşluk kalıyor.

**Karar için seçenekler** (uygulanmadı):
1. Dünya Mutfakları bayrak çerçevesini sütun genişliğine bağlamak (akışkan kare). Panel genişlikle büyür ama birebir eşitlik yine kesirli metin yüzünden garanti değil.
2. Kategoriler'i 2×4 = 8 kapıya çıkarmak. 360'ta yaklaşık 600px; bu kez Kategoriler uzun kalır.
3. Mevcut üst üste panel çözümünü korumak (zıplama yok) ve boşluğu kabul etmek.

Ekran görüntüleri `screenshots/home-v3-x6-tur7/`:
- Her motor ve genişlik için `chromium|webkit-360|390|430-kategoriler.png` ve `-dunya-mutfaklari.png`.
- Yan yana: `iki-sekme-chromium-390.png`, `iki-sekme-webkit-390.png`.
- Çekimde ekranın altındaki sabit beyaz menü kabı (`.nav-dock`) gizlendi; ilk çekimde 4. satırı örtüp kesik gibi gösteriyordu, ızgara eksiksiz.

## Açık konular

1. Şef avatarı 96px: kanon ölçeği (28/40/56) dışında. Onay ya da 56px'e indirme kararı gerekli.
2. Dolapta Ne Var'ın web'deki dört hariç tutma modu (Sevmiyorum / Tüketmiyorum / Alerjim Var / Hassasiyetim Var) ana sayfada tek “Hariç tuttuklarım” listesi olarak var. Tam dolap ekranı bu turun kapsamında değil.
3. V2 widget'ındaki “Tarifleri bul → liste” geçişi dolap sekmesinde yok: liste tüm malzemeleri içeren tarifleri arıyor, dolap ise “herhangi biri” mantığıyla çalışıyor; iki sonuç tutarsız olurdu. Elinde ne var sekmesinde liste geçişi var.
4. Web'de dolap kalıcı kaydı bulunamadı (`tarif-bulucu` sayfa içi durum). “Kayıtlı dolap” prototipte cihaz içi önizlemedir; gerçek ürün için backend kaydı gerekir.
5. Video verisinde şef ve bölüm alanları yok; oynatma kaynağı yok.

## Dosyalar

- Yeni: `ana-v3.html` (ana-x6 kopyası), `ana-v3.css`, `ana-v3.js`
- Güncellenen: `ana-sayfa-v3.html` (galeri)
- Kanıt: `docs/home-v3-x6-qa.mjs|json`, `docs/home-v3-x6-gallery-qa.json`, `docs/home-v3-css-cleanup.json`, `docs/screenshots/home-v3-x6/`
- Yedekler: `eski/ana-v3-onceki/`, `eski/ana-v3-gpt/`, `eski/ana-v3-x6-tur1/` (tur 2 öncesi), `eski/ana-v3-x6-tur2/` (tur 3 öncesi)
- Tur 3: `docs/home-v3-x6-tur3-qa.mjs|json`, `docs/screenshots/home-v3-x6-tur3/`; yedek `eski/ana-v3-x6-tur3/` (tur 4 öncesi)
- Tur 4: `docs/home-v3-x6-tur4-qa.mjs|json`, `docs/screenshots/home-v3-x6-tur4/`
- Yan menü: `ortak-menu.css`, `ortak-menu.js` (yalnız ana-v3.html bağlı), `docs/ortak-menu-qa.mjs|json`, `docs/screenshots/ortak-menu/`
- Tur 5: `docs/home-v3-x6-tur5-qa.mjs|json`, `docs/screenshots/home-v3-x6-tur5/`; yedek `eski/ana-v3-x6-tur4/` (tur 5 öncesi, menü dahil)
- Tur 6–7: `docs/home-v3-x6-tur6-qa.mjs|json`, `docs/home-v3-x6-tur7-sekme-yukseklik.json`, `docs/screenshots/home-v3-x6-tur7/`; yedek `eski/ana-v3-x6-tur5/` (tur 6 öncesi)
- Tur 2: `home-v3-kategori-media.js`, `assets/home-v3/kategori/` (19 WebP), `docs/home-v3-kategori-kaynaklari.json`, `docs/home-v3-x6-tur2-qa.mjs|json`, `docs/screenshots/home-v3-x6-tur2/`
- Not eklenen raporlar: docs/35, docs/39 (ışık değeri)
- Proje kökünde: `AGENTS.md` (V3 kararları)

`ana-v3.css`'te `!important` yok. Bileşen ölçüleri tek yerde adlandırılmış token: `--v3-result-card`, `--v3-chef-card`, `--v3-chef-avatar`, `--v3-chef-ring`, `--v3-cta-dash`, `--v3-drawer-logo`. Ortak dosyalarda (`tokens.css`, `app.css`) değişiklik gerekmedi.

## Revize 10 Ekim (R1–R4)

10 Ekim 2026. Yalnız `ana-v3.html`'e ait `ana-v3.js` / `ana-v3.css` ve bu rapor değişti (`ana-v3.html` aynı kaldı). Liste/detay, `ortak-kart`, `ortak-menu`, `tokens.css`, `app.css`, `AGENTS.md`, alternatifler ve `yayin/` değişmedi (SHA-256 kontrolü: değişiklik yok). Git ve yayın yok. Önceki hâlin byte kopyası: `docs/screenshots/ana-v3/yedek-once/` (+ `SHA256SUMS`), önce görüntüsü `docs/screenshots/ana-v3/once/`.

### Yeni sıra (R2)

**Eski “Video Mutfağı ilk iki modülden biri” kuralı İPTAL.** Yukarıdaki tur 2 tablosu ve iki alternatif sıra yalnız geçmiş kayıttır.

| # | Modül | Zemin |
|---|---|---|
| 0 | Hero: sabit “Ne pişirsem?” + genel arama; altta 5 slaytlık tarif önerisi | fotoğraf |
| 1 | En son eklenen tarifler: öne çıkan slider + iki kart | gri (`--bg`) |
| 2 | Kategoriler / Dünya Mutfakları (sekmeli) | beyaz |
| 3 | Dolapta Ne Var? (birleşik modül) | gri |
| 4 | Video tarifler (Video Mutfağı tasarımı aynen) | beyaz |
| 5 | Şefler · Tarifin ustaları (aynen) | gri |
| 6 | Topluluğa Katıl · Senin de bir tarifin var (dokunulmadı) | beyaz |

Zeminler konuma bağlı mevcut `:nth-child(odd/even)` kuralıyla sıralı alterne eder; bölümler arası boşluk 0, ayraç yok. DOM'dan doğrulandı.

### R1 · Hero slider

- **Sabit kalanlar:** “Ne pişirsem?”, “Tarif, şef, video ara”, header, primary ışık, hilal (alt 24px köşe + 4px domates gölge), x6 açılan sahnesi (kaydırmada fotoğraf ölçeği ve hero küçülmesi artık her slayt fotoğrafına uygulanıyor).
- **Kayanlar:** fotoğraf + “Bugün deneyebilirsin · süre”, tarif adı (en çok 2 satır), yazar avatarı + adı, tarife git düğmesi. Doğal kaydırma + snap (swipe), odaklanınca ok tuşları.
- **5 tarif** (gerçek veri, 1600px kaynaklar küçültülerek; beş farklı kategori, kısa ve uzun ad): Jiao Yan Karides (Burcu Akyüz), Tavuk Curry (Doruk Solmaz), Düdüklüde Balkan Usulü Lahana Sarması (Şahnur Ilıcalı, uzun ad = 2 satır), Tepsi Kadayıfı (Ahmet Örge), Arroz con Pato (Burcu Yıldırım). Hiçbiri aşağıdaki En son eklenenler'de yok.
- **Otomatik geçiş: 6 sn.** İlk dokunuş, kaydırma (swipe/tekerlek), klavye ya da odakta kalıcı olarak durur. Hero ekranın yarısından fazlası görünmüyorken veya sekme gizliyken bekler. `prefers-reduced-motion`'da hiç çalışmaz. 5'ten sonra 1'in kopyasına ileri kayar, ardından görünmez biçimde gerçek 1'e döner: geri sarma hızlı kaydırması yok.
- **Overlay:** her slayt aynı tek gradient'i taşır (dikey; yatay farkı olmadığı için kaydırmada dikiş/bant yok). Üst kısım başlık/arama geometrisinden (değişmedi). Alt kısım beş slaytın en yüksek öneri metninin 24px yukarısında x6 koyuluğuna (%86) smoothstep ile ulaşır, en altta kaynak overlay. Kaynak renk `--overlay`, yeni ton yok.
- **Gösterge** hero'nun içinde, önerinin altında, eski “Malzemelerine doğru kaydır” ipucunun yerinde (o ipucu yeni sırada yanlış yönlendireceği için kaldırıldı). `?gosterge=a`: 8px noktalar, etkin nokta 24px ve primary. `?gosterge=b`: “2 / 5” sayaç, sayfanın %72 koyu kapsül ailesi. Parametre adı ve seçenekler liste ekranının `ortak-kart.js` göstergesiyle aynı (ilk gezinme adresinden de okunuyor). Gösterge etkileşimsiz; slaytlar “n / 5” etiketli.
- Ölçüm: hero yüksekliği beş slaytta aynı (607.67px; her genişlikte). Başlık satırları 1/1/2/1/1. Test tarayıcısında çok uzun başlık verildi: yükseklik değişmedi, 2 satır + “…”.

### R2.1 · Öne çıkan kart slider'ı

- **Adet: 3.** Gerekçe: elle kaydırılan içerik slider'ında ilk kare en çok görülür, sonrakiler hızla düşer (NN/g, Baymard: en çok 5, az kare daha çok görülür). Üstte zaten 5 slaytlık hero var; ikinci slider kısa kalınca gösterge yazar satırını sıkıştırmıyor ve kullanıcı setin sonuna kolayca ulaşıyor. Altındaki iki kart seçkiyi sürdürüyor.
- **Otomatik geçiş: yok.** Hero ile aynı ekranda iki hareketli alan olmaması, WCAG 2.2.2 yükünün tek bir yerde tutulması ve okunacak kart metninin kullanıcının elinde kalması için. Hero zaten ekrandan çıkınca bekliyor.
- Kart yapısı aynı (4:3, görsel üstü kategori/başlık/yazar, süre + puan, kaydet). Gösterge kartın içinde sağ altta, yazar satırı hizasında; metin göstergenin genişliği + 12px kadar pay bırakıyor. Üç slaytın yüksekliği aynı (360: 240 / 390: 262.5 / 430: 292.5px).
- Veri: hero tarifleri dışarıda bırakılıp gerçek tarihe göre (`recipeDate`, yeni → eski; eşitlikte kaynak sırası) ilk 3 slider'a (Patates Mücveri, Sagdana, Pastéis de Feijão), sonraki 2 alttaki kartlara (Tarte de Amêndoa, Semizotlu Yumurta). Tekrar yok (DOM'dan doğrulandı).
- Not: talimatta “kare kartlar” denen alttaki iki kart mevcut tasarımda 2:3 oranında; “olduğu gibi kalsın” gereği oran değiştirilmedi. İçerikleri tekrar yasağı nedeniyle sonraki iki yeni tarife kaydı.

### R2.2 · Kategoriler / Dünya Mutfakları

- **Kategoriler:** tek satır yatay şerit, 112px kare fotoğraf (kaynak 216×144, büyütme yok), sayı fotoğraf üstünde ortak koyu kapsülde, ad altta. En çok tarifi olan 12 kategori; “Tümü →” 34'lük sheet.
- **Dünya Mutfakları:** tek satır yatay şerit, ekranda tam 4 öğe (beşincisi sağ boşlukta görünür). Öğe: aynı 112px yüksekliğinde açık kutu içinde liste ekranının bayrak dili (4:3 bayrak, ince çizgi halka) ve altında tarif sayısı; ad kutunun altında. İlk 16 mutfak; “Tümü →” 50'lik sheet.
- **Eşit yükseklik kurgu gereği:** iki şerit tek medya yüksekliği token'ını (`--v3-strip-media` = 48×2+16) ve aynı metin bloğunu (ad için ayrılmış iki satır, meta rolü) kullanıyor; panel yüksekliği atanmadı. Ölçüm: iki panel her motor ve genişlikte **164.390625px / 164.390625px, fark 0**. Sekme değişince bölüm yüksekliği ve sonraki bölümün top değeri değişmiyor (ör. 390: 1516.06 → 1516.06). Tur 7'deki açık konu kapandı.
- Görülen bedel: tek satırlık kategori adlarının altında ikinci ad satırı boş kalır (ayrılmış yuva).

### R3 · Yazar

Hero slaytları, öne çıkan slaytlar, alttaki kartlar ve Dolapta Ne Var sonuç kartlarında 20px avatar + ad. Veride yazar fotoğrafı yok: baş harf dairesi; fotoğraf alanı gelirse aynı avatar `background-image` + cover ile gösterir. Video kartlarında yazar yok. DOM taraması: 5 kart + 6 slayt (5 + döngü kopyası), eksik 0, yazar adları veriyle birebir, video kartında yazar 0; Dolap sonuç kartlarının hepsinde yazar.

### R4 · Birleşik “Dolapta Ne Var?”

Canlı inceleme (https://dadagastro.com/dolapta-ne-var, 10 Ekim, yalnız okuma): “Elindeki malzeme — örn. yumurta, tavuk, peynir…” kutusu listeyi süzer; 8 grup / 185 malzeme; “Elinde N malzeme”, “Tümünü temizle”; Dolaptakiler / Hariç Tuttuklarım sekmeleri; Besin değeri ve Vakit & zorluk süzgeçleri; sonuç “N tarif bulundu · elindeki N malzemeyle”, eksik bir-iki malzemeli tarifler de gösterilir; ayrı sonuç sayfası. Popüler malzeme listesi canlıda yok. Katalog kaydı: [dolap-katalog-canli.json](screenshots/ana-v3/dolap-katalog-canli.json).

Mobil kurgu, tek akış (sekme yok):
1. Kaynak açıklama cümlesi.
2. Yazma/ekleme alanı (canlı placeholder; ortak `.input-frame` odak halkası; temizle düğmesi yalnız metin varken). Yazınca canlı katalogdan öneriler (grup ikonu + bu prototipteki tarif sayısı) ve en sonda ““…” ekle” serbest metin satırı. Enter: işaretli satır, yoksa yazılanla başlayan katalog adı, yoksa yazılan metin. Ok tuşları/Esc, combobox ARIA.
3. Eklenenler çip olarak (“Elinde N malzeme” + “Tümünü temizle”), çipe dokununca çıkar.
4. Popüler malzemeler: canlı katalogdan, prototipin 32 gerçek tarifinde en çok geçen 8 malzeme (baharat/sos grubu hariç): Soğan, Biber, Limon, Tereyağı, Un, Sarımsak, Süt, Ceviz. Dokununca ekle/çıkar (artı → onay).
5. “Tarif bul”: en çok malzemeyle eşleşen önce (eksik malzemeliler de), en çok 6 kart, aynı tarif kartı; ilk aramadan sonra çip değiştikçe güncellenir. Malzeme yoksa bildirim + alana odak.

Eşleşme kelime düzeyinde ve Türkçe ek toleranslı (“Un” ↔ “buğday unu”, “biber” ≠ “karabiber”). Katalogda yalnız “Tavuk Yumurtası” var; yerel veride “yumurta” geçtiği için katalog adı 0 tarif gösterir, “yumurta” serbest metin olarak eklenince eşleşir. Seçim sayfa içi durumdur (canlıda da kalıcı kayıt yok); eski cihaz içi “kayıtlı dolap” önizlemesi kaldırıldı. Ana sayfada yer almayanlar: Hariç Tuttuklarım (4 mod), Besin değeri, Vakit & zorluk, ayrı sonuç sayfası — canlıda tam Dolapta Ne Var sayfasında; prototipte o ekran yok. Çekmece, orta “Ne Pişirsem” paneli ve diğer ekranlardan `#dolap` girişleri bu modüle iner (bölüm üstü header altına tam oturur: 68/68px).

### Kontroller

[ana-v3-revize-qa.json](screenshots/ana-v3/ana-v3-revize-qa.json) — proje kökünden `node v3-app/docs/screenshots/ana-v3/ana-v3-revize-qa.mjs`. Chromium + WebKit × 360/390/430 = 6 görünüm, hepsi geçti (34–35 kontrol):
- Bölüm sırası, gri/beyaz alterne, boşluk 0, yatay taşma yok, outline/regular ikon yok, hilal korunuyor.
- Hero: otomatik geçiş açık ve 6 sn'de ilerliyor; dokununca duruyor (6+ sn beklemede ilerlemiyor); 390'da yatay tekerlekle duruyor; reduced-motion'da kapalı; 5 → 1 ileri döngü.
- Slayt yükseklikleri sabit; gösterge hero/kart içinde, metne değmiyor.
- Kontrast (metin ve gölgesi şeffaf yapılıp metin kutusundaki en açık piksele göre; en düşük değerler): hero başlık 10.27, “Bugün deneyebilirsin” 12.79, tarif adı 12.97, yazar 14.31; öne çıkan kategori 9.69, başlık 10.15, yazar 11.18; sayaç (b) hero 16.46, öne çıkan 15.55. Her slayt ayrı ölçüldü.
- Sekme geçişi 0px; Dolapta Ne Var akışı; ≥44px hedefler; header 0–400/20px şeffaf → solid, hero metni header altına girmiyor; ortak sağ menü açılıyor (logo, satırlar) ve Dolapta Ne Var satırı modüle iniyor.
- Konsol hatası yok, ağda 404 yok.
- Statik tarama: `!important` yok. Elle piksel yalnız kanondaki 2px odak/etkin halkası, sayfadaki mevcut `blur(12px)` cam kalıbı ve `--v3-pager-room` başlangıç değeri (0px).

### Ekran görüntüleri (`docs/screenshots/ana-v3/`)

- **Gösterge a/b yan yana (hero + öne çıkan kart):** `gosterge-a-b-karsilastirma.png`
- Tam sayfa: `chromium|webkit-360|390|430-tam.png`; ilk ekran: `…-ilk.png`
- Sekmeler: `…-kategoriler.png`, `…-dunya-mutfaklari.png`; Dolapta Ne Var sonuç: `…-dolap-sonuc.png`
- Önce: `once/chromium-390-ilk.png`, `once/chromium-390-tam.png`

Tam sayfa görüntüleri tarayıcının fullPage çıktısıdır; sabit alt menü gizlendi. Ölçümler adı geçen durumlar içindir.

### Açık konular

1. Alttaki iki kart 2:3 (talimatta “kare”); oran değiştirilmedi.
2. ~~Dolap placeholder'ı dar ekranda kesiliyor.~~ Çözüldü: kısa placeholder (aşağıda).
3. Liste ajanının `ortak-kart.js` sayacında da aynı işaretleme (`<span>1</span> / 5` doğrudan inline-flex içinde) boşluğu yutabilir; burada iç sarmalayıcıyla çözüldü. Ortak bileşene alınırken bakılmalı.
4. Şef avatarı 96px (önceki açık konu) sürüyor.
5. **Çözüldü (aşağıda “Kararlar 10 Ekim”):** ~~Beklenmedik bulgu (DURULDU):~~ yereldeki `ana-v3-alt1/2/3.html` kendi dosyalarının yanında `ana-v3.js` ve `ana-v3.css`'i de yüklüyor (`ana-v3-alt-ortak.js` eski `.v3-finder` bölümünü ve eski hero öğelerini arıyor). Bu revizeden sonra üçü de yerelde JS hatası veriyor (alt1: `Cannot set properties of null (setting 'innerHTML')`, alt2/alt3: `Cannot read properties of null (reading 'remove')`) ve bölümleri yeni sırayla görünüyor. Yayındaki `yayin/ana-sayfa-alternatifleri/` kendi kopyalarını taşıdığı için etkilenmedi (yayin SHA-256 değişmedi). Alternatif dosyalarına dokunma yasağı nedeniyle düzeltilmedi. Önceki `ana-v3.js/css` kopyası `docs/screenshots/ana-v3/yedek-once/` içinde.

## Kararlar 10 Ekim — alternatif tabanı, kısa placeholder, Videolar menüsü

Git ve yayın yok; `yayin/` değişmedi (SHA-256 aynı). Liste/detay dosyalarına, `tokens.css`, `app.css`, `AGENTS.md`'ye dokunulmadı.

### 1 · Alternatifler eski tabana bağlandı

- `v3-app/ana-v3-alt-ortak.js` zaten vardı (üç alternatifin ortak yardımcısı); istenen adla kopyalamak onun üzerine yazacaktı. Onayla ad **`ana-v3-alt-taban.js` / `ana-v3-alt-taban.css`** oldu.
- Kaynak: revize öncesi byte kopya (`docs/screenshots/ana-v3/yedek-once/`, SHA-256 doğrulandı). Alternatifler dosyayı docs'tan değil, `v3-app/` içindeki bu kopyadan yükler.
- `ana-v3-alt1/2/3.html`: yalnız iki satır değişti: `ana-v3.css` → `ana-v3-alt-taban.css` ve `ana-v3.js` → `ana-v3-alt-taban.js`. İçerik, tasarım ve sıra aynı.
- Doğrulama ([alternatifler-taban-qa.json](screenshots/ana-v3/alternatifler-taban-qa.json); `node v3-app/docs/screenshots/ana-v3/alternatifler-taban-qa.mjs`). Chromium + WebKit, 390:
  - üçünde konsol hatası 0, 404 yok;
  - bölüm sırası ve sayfa yüksekliği yayındaki dokunulmamış kopyayla aynı;
  - ilk ekran yayındaki kopyayla piksel piksel aynı.
- Karşılaştırma sayfası (`ana-sayfa-alternatifler.html`) iki motorda hatasız, dört çerçeve de yükleniyor. Not: 1. çerçeve `ana-v3.html`'in kendisi olduğu için artık revize edilmiş ana sayfayı gösterir. Ortak menü alternatiflerde de güncel (Videolar satırı dahil).

### 2 · Dolapta Ne Var yazma alanı

Placeholder “Malzeme yaz, ör. domates”. Kutunun içinde ölçüldü: metin 179px; sığacağı alan 360'ta 248px, 390'da 278px, 430'da 318px (Chromium + WebKit). Açıklama cümlesi zaten alanın üstünde ayrı satır. Canlı placeholder (“Elindeki malzeme — örn. yumurta, tavuk, peynir…”) bu nedenle kullanılmıyor.

### 3 · Ortak menü: Videolar

- Canlı (10 Ekim, yalnız okuma): dadagastro.com mobil çekmecesinde ve masaüstü menüsünde video öğesi yok. Video yalnız ana sayfada “Video Mutfağı” bölümü olarak var (`/video-mutfagi`, menüye bağlı değil). Kural gereği ad **Videolar**, yeri **Tarifler grubunun hemen altı**, ikon **`fa-solid fa-circle-play`** (18px, diğer satırlarla aynı ikon ve metin hizası, 48px satır).
- Hedef: ayrı video sayfası açılmadı. `ortak-menu.js`'e varsayılan hedef eklendi: `videos: 'ana-v3.html#video'`. Sayfa kendi bağlantısını vermezse bu kullanılır. Liste ve detay dosyalarına dokunmadan oradan da çalışıyor.
- Ana sayfada Video Mutfağı bölümü `id="video"`. Menüden tıklanınca sayfa içinde kayar. Başka ekrandan `#video` ile gelince hareketsiz atlar, hero küçülmesinden sonra bir kez hizalanır. Bölüm üstü header'ın tam altına oturur: Chromium 0px, WebKit 1px.
- Etkin işaret: video bölümü header altındaki görünür alanın üst üçte birlik çizgisini tutarken “Videolar”, aksi hâlde “Ana Sayfa”. Liste ve detaydan gelindiğinde de etkin.
- Misafir ve üye (`?giris=1`) iki durumda da görünüyor. `ortak-menu.css`'e değişiklik gerekmedi.

Kontrol ([ortak-menu-videolar-qa.json](screenshots/ana-v3/ortak-menu-videolar-qa.json); `node v3-app/docs/screenshots/ana-v3/ortak-menu-videolar-qa.mjs`). Önceki ortak menü testinin kopyası; satır sırası Videolar'la ve Dolapta Ne Var kontrolü birleşik modülle güncellendi. Chromium + WebKit, 360/390/430:
- sıra/etiketler, 48px satır, 18px ikon, 15px metin, 64px logo;
- ayırıcı = öğe − 1, ≥44px hedef, tek açık akordeon, dil, Esc/backdrop kapanması;
- sayfa eylemleri: Dolapta Ne Var ve Videolar bölümleri header altına iniyor; Videolar etkin oluyor; üye görünümü; JS hatası yok.
- Ek olarak 390'da ana sayfa, liste-v2 ve detay-v2 × misafir/üye (iki motor):
  - Videolar, Tarifler'in hemen altında; href `ana-v3.html#video`;
  - liste ve detaydan tıklama `ana-v3.html#video`'ya gidiyor, “Video Mutfağı” header altında açılıyor, menüde Videolar etkin;
  - konsol hatası ve 404 yok.

Ekran görüntüleri:
- **Üç ekran × misafir/üye, menü açık, 390:** `screenshots/ana-v3/menu/menu-uc-ekran-misafir-uye-390.png`
- Ana sayfa menü durumları: `screenshots/ana-v3/menu/`

Ana sayfa revize QA'sı (`ana-v3-revize-qa.mjs`) bu değişikliklerden sonra yeniden çalıştı. Chromium + WebKit × 360/390/430, hepsi geçti; placeholder sığma ölçümü de eklendi.

## EK 10 Ekim — A1 şerit, A2 Dolapta Ne Var (web kalitesi), A3 ortak kart

Yalnız `ana-v3.html` (bağlantılar), `ana-v3.js`, `ana-v3.css` ve docs. `ortak-kart.css/js`, liste/detay, `tokens.css`, `app.css`, `AGENTS.md`, `yayin/` değişmedi. Git ve yayın yok. EK öncesi `ana-v3.js/css` kopyası: `docs/screenshots/ana-v3/ek-once/`.

### A1 · Küçük kart şeridi (sonraki EK ile değişti)

8 kartlık tek satır şerit, sağda ipucu, sonda “Tümü” kartı, 2:3 aynı kart, snap. Tekrar yok. Ölçüldü ve geçti, ancak bir sonraki EK'teki “ikişerli slider, yarım kart ipucu yok” kararı bu maddenin yerine geçti: aşağıdaki “EK 10 Ekim (2)” bölümü.

### A2 · Dolapta Ne Var? — web kalitesinde

Canlıda (10 Ekim, yalnız okuma) “Dolaptakiler” ve “Hariç Tuttuklarım” iki ana sekme; seçim şeridinde iki grup: “Dolaptakiler” (`circle-check`) ve “Hariç tuttuklarım” (`ban`). Mobil kurgu tek kartta, yukarıdan aşağı:
1. Kaynak açıklama cümlesi.
2. Yazma alanı (“Malzeme yaz, ör. domates”; canlı katalog önerileri + serbest metin satırı).
3. **Dolaba ekle / Hariç tut** seçimi: ortak `.segmented`, 44px. Yazılan ve popülerden seçilen malzeme bu seçime göre bir gruba girer. Serbest metin satırı da buna göre “… ekle” / “… hariç tut” der.
4. **Popüler malzemeler:** 8 çip. Durum yalnız tek ikon yuvasını ve rengi değiştirir: + / onay / eksi. Genişlik değişmez.
5. **Seçimin** paneli: kart içinde iç yüzey; iç radius = kart − iç boşluk. Başlıkta “Tümünü temizle”. İçinde iki grup, ikon + ad + sayı:
   - Dolaptakiler: çip primary tonlu (açık domates zemin, domates koyu kenar/yazı, onay ikonu).
   - Hariç tuttuklarım: çip nötr (beyaz zemin, çizgi kenar, koyu yazı, gri **eksi** ikonu). Metin üstü çizili değil (`text-decoration: none` ölçüldü).
   - Her çip iki hedeften oluşur: ada dokununca dahil ↔ hariç değişir, sağdaki **x** kaldırır (44px, kendi erişilebilir adı var).
6. **“N tarif bul”**: canlı sonuç sayısı (ör. “17 tarif bul”); seçim yokken “Tarif bul”.
7. Sonuçlar: “N tarif bulundu · elindeki N malzemeyle · N hariç”. Eşleşmesi çok olan önce; hariç tutulan malzemeyi içeren tarif yok. En çok 6 kart, aynı tarif kartı (yazar, rozet, kaydet).
8. **“Daha fazla süzgeç →”**: `liste.html?malzeme=<dahil malzemeler>`. Liste bu parametreyi işliyor; listedeki Filtrele sayfasında süre/zorluk var. Vakit & zorluk ve Besin değeri ana sayfaya taşınmadı; sahte sayfa yok.

Boş durum: iki grupta kısa yönlendirme (“Henüz malzeme eklemedin.” / “Sevmediğin ya da tüketmediğin malzemeler.”). Sonuç alanında “Birkaç malzeme ekle…”.

**Zıplama yok:** her grup tek çip yüksekliğinde yatay şerittir, alt satıra kaymaz. Eklenen ya da taşınan çip görünür alana kaydırılır. Sonuç gövdesi, kartlar da mesaj da gösterilse kart şeridinin yüksekliğini korur. Ölçüm (iki motor, üç genişlik): boş → 3 dahil + 2 hariç → dahil↔hariç → kaldır adımlarında kart yüksekliği ve alttaki bölümün konumu değişmedi (ör. 390: 771.19 → 771.19px). 360'ta uzun ad “Bitkisel Süt Alternatifleri” tek satır, çip 218px, şerit 286px.

### A3 · Ortak kart (liste ile aynı)

- `ortak-kart.css` ve `ortak-kart.js` ana sayfaya bağlandı; içerikleri değişmedi.
- Ana sayfadaki bütün tarif kartlarında listedeki **`dg-meta` süre/puan rozeti** ve **`dg-save` kaydet** var: öne çıkan slider, küçük kartlar, Dolapta Ne Var sonuçları. Hero hariç. Tek bileşen, iki durum; kaydedilince ikon primary. Ölçüm: her kartta rozet 32px yükseklik, 8px kenar; kaydet 44px hedef / 32px görünür, 8px kenar; rozet ve kaydet zemini aynı.
- **Öne çıkan slider** doğrudan `DGCard.slider` + `DGCard.wireSliders` (listedekiyle aynı DOM). Overlay ana sayfanın metin geometrisi eğrisiyle `--dg-veil` olarak hesaplanıyor.
- Avatar her yerde `DGCard.avatar` (hero dahil).
- Küçük kartlar talimat gereği kendi oranında (2:3, görsel üstü metin). Rozet ve kaydet aynı; kart anatomisi listedekinden (metin altta) farklı.
- `?radius=a|b` (16/20px), `?rozet=a|b` ve `?gosterge=a|b` listedeki gibi `<html data-dg-*>` üzerinden çalışıyor; varsayılan a. Radius tarif ve video kartlarına uygulanıyor; kategori görselleri ve kontroller kanondaki değerde.
- **Video kartları:** süre rozeti `dg-meta` (ikonsuz, tarif rozetiyle aynı), oynat 32px görünür / 44px hedef, aynı cam (`--dg-pair-*`), ikisi de 8px kenarda, bir çift. İzlenme altta, yazar yok.
- İki uyarlama (`ana-v3.css`'te, ortak dosyalara dokunulmadan):
  - app.css'teki `.recipe-card .save::before` ortak `.dg-save::before`'dan daha özgül; ana sayfa tarif kartlarında aynı ortak token'lara geri bağlandı. Ölçüm öncesi kaydet camı %56, rozet %64'tü; şimdi ikisi de %64.
  - `dg-feature` metin bağlantısı tek satırlık başlıkta 42px kalıyordu; ana sayfada 44px alt sınır verildi. **Listede de aynı 42px durumu var; liste ajanına bildirilmeli.**
- `ortak-kart.js` sayacındaki `<span>1</span> / 3` inline-flex içinde boşluğu yutuyor (“1/ 3” görünür); ana sayfanın öne çıkan slider'ında da artık o bileşen kullanıldığı için aynı görünüm var. Ortak dosyada düzeltilmeli; bu turda dokunulmadı.

**Kontrast** (metin ve gölgesi şeffaf yapılıp en açık piksele göre; en düşük değerler):

| | Chromium | WebKit |
|---|---:|---:|
| Küçük kart kategori / yazar / rozet | 9.40 / 11.52 / 9.93 | 9.31 / 11.52 / 8.57 |
| Öne çıkan kategori / yazar / rozet | 9.84 / 11.35 / 7.09 | 9.84 / 11.22 / 5.32 |
| Video süre / izlenme / başlık | 6.38 / 7.65 / 9.70 | 5.04 / 7.98 / 9.59 |

WebKit'te cam rozet daha açık işleniyor; en düşük 5.04 ile 4.5:1'in üstünde.

### Önbellek

`ana-v3.html`'deki bütün yerel CSS/JS bağlantıları içerik SHA-256'sının ilk 8 hanesiyle `?v=` alıyor. Betik: `docs/screenshots/ana-v3/onbellek-v.py` (v3-app içinden çalıştırılır; her değişiklikten sonra yeniden).

### Kontroller

[ana-v3-revize-qa.json](screenshots/ana-v3/ana-v3-revize-qa.json): Chromium + WebKit × 360/390/430, hepsi geçti (47–49 kontrol). Önceki kontrollerin hepsi yeniden geçti (sıra, zemin, kategori sekmesi 0px, hero, header, menü, 404/konsol). Ek olarak A1 şerit, A2 akışı/zıplama/renk-ikon ayrımı/uzun ad/“N tarif bul” = sonuç, A3 rozet-kaydet-video ölçüleri ve `?radius=b&rozet=b&gosterge=b`. Menü testi ve alternatifler testi yeniden geçti.

Görseller (`docs/screenshots/ana-v3/`):
- **Ana sayfa ↔ liste kartları, 390:** `a3-ana-liste-kartlar-390.png`
- **Video önce/sonra:** `a3-video-once-sonra-390.png` (betik: `ek-a3-gorseller.mjs`)
- Dolapta Ne Var: `…-dolap-bos.png`, `…-dolap-3-dahil-2-haric.png` (her motor/genişlik)
- Tam sayfa ve ilk ekran: `…-tam.png`, `…-ilk.png`

## EK 10 Ekim (2) — A1 ikili slider, A1b detay-v2 bağlantıları, A1c avatar

Önceki A1 (8 kartlık şerit + yarım kart ipucu) bu maddeyle değişti. Yalnız `ana-v3.js`, `ana-v3.css`, `ana-v3.html` (`?v=` yenilendi) ve docs değişti. Liste/detay, `ortak-kart`, `tokens.css`, `app.css`, `AGENTS.md`, `yayin/` değişmedi. Git ve yayın yok. Bu EK öncesi kopyalar: `docs/screenshots/ana-v3/ek-once/` (A2/A3 öncesi); ara kopya scratch'te.

### A1 · Küçük kartlar ikişerli slider

- Referans: yayındaki `yeni-tasarim/ana-v3.html` 2'li kartları. Ölçüm (yayın = yerel): 360 → 154×231, 390 → 169×253.5, 430 → 189×283.5px; oran 2:3. İçerik aynı: süre/puan, kategori, en çok 2 satır başlık, yazar avatarı + adı. Görsel farklar önceki EK'ten gelir: listedeki ortak rozet/kaydet, `?radius=a` ile 16px kart köşesi (yayında 24), ortak avatar.
- **Tam 2 kart:** şerit içerik genişliğinde (iki yanda 20px gutter) ve orada kırpılır. Kart genişliği (içerik − 12) / 2. Ölçüm, iki motor × üç genişlik: ilk iki kartın görünen genişliği tam kart genişliği, **3. ve sonraki kartların görünen genişliği 0px**, 3. kart şerit kenarından 12px dışarıda başlar. Kenarda yarım kart ipucu yok.
- **Sayfa sayfa snap:** `scroll-snap-type: x mandatory`; her sayfanın ilk kartında `scroll-snap-align: start` + `scroll-snap-stop: always`. Davranış ölçümü: 0.2 sayfalık kaydırma 0. sayfaya geri döner, 0.7 sayfalık kaydırma tam 1. sayfaya oturur. Son sayfada da ekranda tam 2 kart, yarım kart 0. Gösterge sayfayı izler. Klavye: odakta ok tuşları bir sayfa.
- **8 kart / 4 sayfa**, gerçek tarihe göre. Hero ve öne çıkan slider tarifleri dışarıda; tekrar yok (DOM'dan doğrulandı).
- **Gösterge** şeridin altında ortada, aynı `?gosterge=a/b` kalıbı: a noktalar (etkin uzun ve primary, diğerleri nötr gri), b “1 / 4” sayaç. Sonraki sayfanın varlığı göstergeden anlaşılır.
- Başlıktaki “Tümü →” duruyor; şerit sonundaki “Tümü” kartı kaldırıldı (ikili sayfalamada yarım sayfa bırakıyordu).

### A1b · Bağlantılar

Ana sayfadaki bütün tarif bağlantıları `detay-v2.html?tarif=<slug>&donus=ana-v3.html`: hero (döngü kopyası dahil 6), öne çıkan (3 × 2), ikili kartlar (8 × 2), Dolapta Ne Var sonuçları. DOM taraması: 28 / 28 bağlantı detay-v2, `detay-c` ya da başka hedef 0. Dolap sonuç kartlarının hepsi de detay-v2. **Karşılığı olmayan tarif yok:** yerel veri setindeki 32 tarifin her biri detay-v2'de açıldı, başlık eşleşti, JS hatası yok.

### A1c · Avatar baş harfi

Ana sayfadaki bütün avatarlar artık `DGCard.avatar` (A3). Baş harf `toLocaleUpperCase('tr')`, 13px, GilroyBd (mevcut en kalın dosya, ExtraBold), avatar 20×20. Doğrulama: 17 avatarın hepsi 20×20 / 13px; “İrem Akşit” → “İ” (noktalı büyük İ).

### Kontroller

[ana-v3-revize-qa.json](screenshots/ana-v3/ana-v3-revize-qa.json): Chromium + WebKit × 360/390/430, hepsi geçti (52–54 kontrol). Önceki R1–R4, A2, A3, menü ve kategori sekmesi kontrolleri yeniden geçti; konsol hatası ve 404 yok. Menü testi ve alternatifler testi yeniden geçti.

Görseller (`docs/screenshots/ana-v3/`):
- **Yayın ↔ yerel ikili kart, 360/390/430:** `ek2-ikili-yayin-yerel.png` (ölçüm `ek2-ikili-olcum.json`, betik `ek2-ikili-karsilastirma.mjs`)
- Ana sayfa ↔ liste kartları (güncel): `a3-ana-liste-kartlar-390.png`
- Tam sayfa ve ilk ekran: `chromium|webkit-360|390|430-tam.png`, `…-ilk.png`
