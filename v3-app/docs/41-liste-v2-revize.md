# 41 · Liste V2 revizesi

Bu belge iki tur talimatı kapsar: ilk revize (10 madde) ve EK (canlı web kaynaklı düzeltmeler). Ölçümler `docs/liste-v2/qa.json`, görüntüler `docs/screenshots/liste-v2/` altındadır.

## 1. Web → mobil eşleme tablosu

Kaynak: canlı https://dadagastro.com/tarifler (9 Ekim 2026, 390 ve 1440 genişlikte açıldı, filtre formunun HTML'i ve sıralama menüsü okundu). Laravel deposu yalnız bayrak dosyası için kullanıldı. `public/flags/*.svg` dosyalarının SHA'sı canlıdaki `/varliklar/flags/*.svg` ile aynı çıktı (tr, jp, nz örneklendi).

| Web öğesi | Web'de nasıl | Mobilde (liste-v2) nasıl |
|---|---|---|
| Üst alan | Breadcrumb, "TARİF DİZİNİ" etiketi, "Bütün tarifler, tek dizinde" başlığı, açıklama, "Popüler:" çipleri, 3 sayaç (6.112 Denenmiş tarif / 34 Kategori / 50 Dünya mutfağı) | V3 kararıyla web pazarlama metni taşınmaz. Banner'da başlık "Tarifler" ve kaynak 3 sayaç var (liste-1 yapısı). Popüler çiplerin işlevini kategori şeridi karşılıyor. |
| Sayaçlar | Üç sütun, değer üstte, etiket altta | liste-1 yapısı geri geldi: tek satır "**6.112** Denenmiş tarif". Üç sayaç banner genişliğine yayılıyor, ayraçlar aralarda ortalı. |
| Arama (`q`) | Gizli alan; arama header'dan açılıyor | Panelin üstünde arama kutusu (kaynak placeholder) ve temizle düğmesi |
| Kategori (`kategori[]`, 34 seçenek) | Akordeon. Satırda onay kutusu + kare fotoğraf (`cn-thumb`) + ad + sayı. İlk 8 görünür, "26 seçenek daha" | (a) Arama altındaki **Kategoriler** sekmesi: fotoğraflı yatay şerit, tekli seçim. (b) Filtre sheet'inde Kategori bölümü: onay kutusu + fotoğraf + ad + sayı, 8 + "26 seçenek daha" |
| Mutfak (`mutfak[]`, 50 seçenek) | Başlık ikonu `fa-earth-americas`. Satırda bayrak (`/varliklar/flags/xx.svg`) + ad + sayı. 8 + "42 seçenek daha". Balkan'da bayrak yok, `fa-earth-americas` var | (a) **Dünya Mutfakları** sekmesi: bayraklı yatay şerit. (b) Sheet'te Mutfak bölümü: aynı bayraklar ve sayılar. Bayrağı olmayan Balkan'da nötr `fa-globe`. |
| Yemek Modu (`yemek_modu[]`, 20) | Başlık ikonu `fa-kitchen-set`. 8 + "12 seçenek daha" | Sheet bölümü, aynı sıra, ikon, sayı ve "12 seçenek daha" |
| Öğün (`ogun[]`, 8) | `fa-utensils`, 8 seçenek | Sheet bölümü |
| Süre (`sure[]`, 6) | `fa-clock` | Sheet bölümü |
| Zorluk (`zorluk[]`, 5) | `fa-gauge-simple` | Sheet bölümü |
| Beslenme / Tip (`beslenme[]`, 21) | `fa-heart-pulse`. Her satırda kendi FA ikonu (vegan `seedling`, vejetaryen `leaf` vb.). 8 + "13 seçenek daha" | Sheet bölümü, satır ikonları webdekiyle aynı |
| İçerik Türü (`icerik_turu[]`, 3) | İkonsuz başlık | Sheet bölümü |
| Bütçe (`butce[]`, 3) | İkonsuz başlık | Sheet bölümü |
| Grup başlığı sayacı | `fct-dot` grupta seçili sayıyı gösteriyor | Sheet bölüm başlığında seçili sayı rozeti |
| Akordeon | Webde bütün gruplar açık | Mobilde tek açık akordeon (AGENTS kuralı); ilk açılışta ilk grup açık |
| Tümünü Temizle | Sheet altındaki bağlantı | Sheet başlığında "Temizle"; alt çubukta "Temizle" + "N tarifi göster" |
| Filtrele düğmesi | Dolgu primary, `fa-sliders`, "Filtrele" + sayı | Araç çubuğunda belirgin "Filtrele" düğmesi ve sayı rozeti |
| Sıralama | Ayrı açılır menü "Sıralama: Önerilen": Önerilen (`wand-magic-sparkles`), En Yeni (`calendar-plus`), En Çok Puanlanan (`star`), En Hızlı (`bolt`) | Ayrı "Sıralama: Önerilen" düğmesi. Aynı dört seçenek ve ikonlarla ortak sheet'te açılıyor. Filtre sheet'inden çıkarıldı. |
| Tema & pişirme tipi | Sabit yatay şerit. Kartta fotoğraf + ad + "N tarif". "Tümü 6112 tarif" etkin. Alt açıklama: "Bir alt dala in — seçim facet'lerle birlikte daraltır" | Sabit yatay şerit (açılır-kapanır yapı kaldırıldı). Webdeki fotoğraflar, adlar ve sayılar kullanılıyor; seçim gerçek filtre olarak uygulanıyor. |
| Sonuç sayısı | "6.112 tarif bulundu" | Araç çubuğunun altında, canlı güncellenen "N tarif bulundu" |
| Kart | Yatay `r-card`: görsel üstünde kategori çipi ve beslenme rozetleri, kalp kaydet, başlık (alt başlık dahil), süre / zorluk / porsiyon / ₺, yazar, puan, görüntülenme | Talimatla sadeleşti: görsel üstünde süre + puan, kalın kategori, en çok 2 satır başlık, yazar avatarı + adı, kaydet. Zorluk, porsiyon, ₺, açıklama ve görüntülenme kartta yok; detay sayfasında duruyor. |
| Kaydet | `fa-regular fa-heart`, giriş kapısı | AGENTS gereği tek kaydet bileşeni: `fa-solid fa-bookmark`, 32px görünür / 44px hedef. Giriş kapısı ortak sheet'te. |
| Sayfalama | « ‹ 1 2 3 … 204 › ». Sayfa başına yaklaşık 30 tarif | Yerel veri 32 tarif, sayfa başına 9 → 1–4 numaralı sayfalar (44px) |
| "Ne pişireceğine karar veremedin mi?" | Liste üstünde blok | Talimatla kaldırıldı |
| Footer, çerez bandı | Var | AGENTS gereği yok |

## 2. Adresler

- Liste V2: http://127.0.0.1:8765/v3-app/liste-v2.html
- Karşılaştırma galerisi (liste-1 ile V2 yan yana, 390×844): http://127.0.0.1:8765/v3-app/liste-sayfa-v2.html
- Öne çıkan kart adayları (uzun başlıkla üç kurgu): http://127.0.0.1:8765/v3-app/liste-v2-hero-adaylari.html
- Aday görünümü: `liste-v2.html?hero=overlay|panel|glass`. Varsayılan `panel`.

## 3. Ne yapıldı

### İlk revize (10 madde)
1. **Banner → panel boşluğu:** Sayaç bloğunun alt kenarıyla panel arasındaki boşluk liste-1'de 24px, V2'de 20px; yazı ile panel arası 28px'ten 22px'e indi. Değerler `--panel-overlap` ve `--space-20` token'larından geliyor. Sabit banner ve üstüne kayan panel davranışı aynen duruyor (liste-six n=1 aktarımı).
2. **Kategoriler / Dünya Mutfakları sekmesi:** liste-5'ten aktarıldı ve arama kutusunun hemen altında. Altında işaretli yatay şerit var: kategoride kaynak fotoğrafı, mutfakta bayrak. Seçim gerçek filtre uyguluyor; sonuç sayısı ve banner güncelleniyor.
3. **Hero (banner içi):** Başlık, sayaçlar ve panel içeriği aynı 20px gutter hizasında. Arkada tek sürekli overlay var: kaynak koyu renk, smoothstep eğrisi, 49 durak; komşu duraklar arası en büyük fark %6,9, bant yok. Öne çıkan kart için bkz. bölüm 4.
4. **Kartlar sadeleşti:** Görselde süre + puan (puan verisi yoksa yıldız da yok), kalın kategori, en çok 2 satır başlık + "…", 20px avatar + tek satır yazar adı. Açıklama, zorluk, porsiyon, ₺ ve görüntülenme kaldırıldı. İç ritim 12/4/12, ızgara aralığı 24/12.
5. **Satır görünümü:** Görsel kare (120px, `div` + background cover). Bilgi sırası kartla aynı. Ayraç yalnız iki satır arasında. Geçiş düğmesi 44px ve gerçekten çalışıyor (`?gorunum=liste` adreste tutuluyor).
6. **Filtrele / Sırala:** Webdeki gibi iki ayrı, belirgin 44px düğme: dolgu "Filtrele" + sayı rozeti, çerçeveli "Önerilen ⌄". Rozetin yeri boşken de ayrılı, bu yüzden düğme genişlemiyor.
7. **"Ne pişireceğine karar veremedin mi?"** bloğu kaldırıldı.
8. **Logo ve ışık:** Sol üstten primary ışık var. `hero-light.css` olduğu gibi bağlandı ve `--home-light-*` token'ları kullanıldı (%25, 0→%65, screen); dosya değişmedi. Logonun arkasındaki **en açık piksele** göre kontrast: üstte 6,1–6,3, 24px kaydırmada 5,9–6,0, solid header'da 5,2 (Chromium + WebKit, 360/390/430). liste-1'de üst durumda 1,1 ölçülüyor.
9. **App bar ve çekmece:** Çekmecenin üstünde resmi renkli logo var. Etkin satır doğru: "Tarifler" grubu açık, "Tüm Tarifler" ya da seçili kategori etkin. Alt satırlar girintili. Ayraç yalnız satırlar arasında. Alt menü ana sayfa V3 ile aynı (Püf Noktaları / lightbulb).
10. **Polish:** Bütün boşluklar token'dan. Bütün kontroller ≥44px (ölçülen küçük hedef: 0). Boş durum, yükleniyor iskeleti (aynı DOM, `aria-busy` + `inert`) ve sayfa sonu tasarlandı. Kabuk sayfa sonuna ikinci kez boşluk eklemiyor. Son satırda yetim kart yok: ızgarada tek sayılı sayfada ilk tarif öne çıkıyor, kalanlar çift.

### EK düzeltmeler
1. **Sayaçlar liste-1'e döndü:** "**6.112** Denenmiş tarif" tek satır, 13px, değer GilroyBd, başlık→sayaç 8px; bunlar liste-1 ile ölçülerek eşlendi. Üç sayaç banner genişliğine eşit aralıkla yayıldı, ayraçlar tam ortada (sapma 0px). İlk ve son sayaç 20px gutter'a oturuyor; 360'ta da öyle. Panel boşluğu liste-1'den bir adım az (24 → 20).
2. **Dünya Mutfaklarında bayrak:** Webdeki 49 bayrak SVG'si (`/varliklar/flags`) `assets/flags/` altına kopyalandı (MIT lisans dosyasıyla). Bayrak 20px, adın solunda; çip yüksekliği kategori çipiyle aynı (44). Bayrağı olmayan Balkan Mutfağı'nda nötr `fa-globe` var. Sheet'teki Mutfak bölümünde aynı bayraklar ve sayılar kullanılıyor.
3. **Tema & pişirme tipi baştan:** Açılır-kapanır yapı ve ayraçları kalktı. Webdeki karşılığı (sabit yatay `.subcat` şeridi) aktarıldı: fotoğraf + ad + tarif sayısı. Seçim gerçek filtre uyguluyor. Tema, kategori, sıralama ve görünüm etkileşimlerinde araç çubuğu, şerit ve durum satırının konumu ve boyutu ölçüldü: kayma 0px.
4. **Filtre sheet'i baştan:** Bölümler webdeki sırada: Kategori, Mutfak, Yemek Modu, Öğün, Süre, Zorluk, Beslenme / Tip, İçerik Türü, Bütçe. Her bölümde başlık, webdeki başlık ikonu, seçenekler, sayılar ve işaretler (33 kategori fotoğrafı, 49 bayrak, 21 beslenme ikonu) var. "N seçenek daha" kendi bölümünün sonunda: 26 / 42 / 12 / 13.
   - Ayraç yalnız bölümler arasında; ilk bölümün üstünde ve son bölümün altında yok.
   - Tek açık akordeon, 250ms ızgara-satırı geçişiyle.
   - Seçimler sheet'in üstünde tek tek kaldırılabilen çip olarak görünüyor.
   - Seçili sayı başlıkta, bölüm başlığında ve "N tarifi göster" düğmesinde canlı. "Temizle" taslağı sıfırlıyor.
   - İç kaydırma çalışıyor, alt eylem çubuğu sheet'in dibinde sabit.
   - Sıralama, webdeki dört seçenek ve ikonlarıyla ayrı sheet'te.
5. **Öne çıkan kart baştan:** Bkz. bölüm 4.
6. **Tarif kartı baştan:** Ortaklaşmaya hazır `dg-card` bileşeni kuruldu. Kaydet tek stil (`dg-save`): bütün kartlarda 32 görünür / 44 hedef, görselin sağ ve üst kenarından 8px; ölçüldü. Kart ve satır aynı aileden.
7. **Genel:** Ayraç kuralı satırlarda, sheet'te, sıralama listesinde ve çekmecede ölçüldü. Boşluk ölçeği token'dan. Kayma 0px. Dokunma alanları ≥44px. Yetim kart yok.

## 4. Öne çıkan kart: aday karşılaştırması

Üç aday, ana sayfa V3 öne çıkan kartıyla aynı aileden kuruldu: 4:3 fotoğraf, sol üstte süre + puan rozeti, sağ üstte tek stil kaydet, kalın kategori, öne çıkan rolde (20/700) en çok 2 satır başlık, yazar. Kısa (Sagdana) ve uzun (İran Usulü Baharatlı Acılı Balık Kebabı) başlıkla yan yana: `docs/screenshots/liste-v2/adaylar/karsilastirma-360|390|430.png`.

| Aday | Güçlü yan | Zayıf yan |
|---|---|---|
| A · Overlay (ana sayfa gibi) | Ana sayfayla birebir kurgu | Uzun başlıkta overlay fotoğrafın yarısını karartıyor; yemek sönük |
| **B · Hizalı bindirme panel (seçilen)** | Fotoğraf hiç kararmıyor. Metin beyaz zeminde. Panel görsele `--panel-overlap` (24) kadar biniyor, yatay kenarları görselle aynı hizada, radius 24, hafif gölge (`--sh-sm`). Yazar ince ayraçla ayrılıyor | Ana sayfadakinden farklı: metin görselin altında |
| C · Cam bilgi kutusu | Kompakt | Koyu cam kutu ağır; uzun başlıkta yemeği örtüyor |

**Gerekçe:** B'de fotoğraf iştah açıcı kalıyor ve metin her fotoğrafta aynı okunurlukta. Kart yüksekliği başlık uzunluğundan bağımsız: kısa ve uzun başlıkta 360'ta 361px, 390'da 384px, 430'da 414px. Kısa başlıkta boş satır kalmıyor; kategori + başlık iki satırlık yuvada dikey ortalanıyor. Önceki panel `adaylar/once-ilk-panel.png`'de; o sürümde binme 48px'ti, panel içeride duruyordu, kısa başlık boş görünüyordu.

## 5. Sekme / çip kararı

Arama altında **tek** yapı var: Kategoriler / Dünya Mutfakları sekmesi + işaretli şerit. liste-1'in "Tümü / Atıştırmalık…" çip satırı kaldırıldı, çünkü aynı kategori seçimini iki kez gösteriyordu. Sayfadaki "etkin filtre çipleri" satırı da kaldırıldı: seçimler filtre sheet'inde çip olarak görünüyor, Filtrele düğmesinde sayıları rozetle duruyor. Böylece seçim yapınca içerik aşağı itilmiyor.

## 6. Kart incelemesi

- **liste-1 kartı:** 7 bilgi parçası; açıklama, zorluk, porsiyon, ₺ ve görüntülenme kalabalık yapıyor.
- **liste-5:** Aynı kart, yatay rafta.
- **Canlı web `r-card`:** Yatay; görsel üstünde kategori çipi ve beslenme rozetleri, kalp kaydet, süre / zorluk / porsiyon / ₺ satırı, yazar, puan, görüntülenme.
- **Ana sayfa V3:** Görsel üstü metin.

V2 kartı, liste-1'in zeminsiz 4:5 kartını temel aldı ve talimattaki bilgi setine indirdi. Kırpımlar: `kirpim/v2-kart.png`, `kirpim/v2-satir.png`, `kirpim/liste-1-kart.png`, `kirpim/ana-v3-kart.png`, `web/canli-kart.png`.

## 7. Eleştiri turları (liste-1 ve canlı web ile yan yana)

**Tur 1 (liste-1):**
- Kart bilgisi 7'den 4'e indi.
- Yazar her kartta okunuyor (12/12 matris satırında görünür, tek satır, `ellipsis`).
- Filtrele ve sıralama ayrı, belirgin, 44px.
- Banner'da logo kontrastı 1,1'den 6,2'ye çıktı.
- Düzeltilen: kart görselindeki ağır koyu gölge kaldırıldı (rozet kendi koyu zemininde okunuyor); kısa banner'da overlay rampası 96px'e indi.

**Tur 2 (canlı web):**
- Sıralama, web mobildeki gibi yalnız geçerli değeri gösteriyor ("Sıralama:" erişilebilir adda kalıyor).
- Sheet başlığına webdeki `fa-sliders` eklendi.
- Tema şeridi webdeki gibi sabit.

**Tur 3 (hero, EK talimat):** 3 aday kuruldu, B seçildi ve kısa başlık için iyileştirildi.

## 8. Ölçüm özeti (`docs/liste-v2/qa.json`)

| Kontrol | Sonuç |
|---|---|
| 12 matris satırı (Chromium + WebKit × 360/390/430 × kart/satır) | JS hatası 0, yatay taşma 0, ham `null/undefined` 0, 44px altı hedef 0, kategori GilroyBd, başlık ≤2 satır, yasak meta 0, ızgara çift |
| Header alfa (0/20/40/60 px) | 0 / 0,42 / 0,81 / 1. Panel 240px'te header altına oturuyor (top 68, radius 0) |
| Banner metin kontrastı (en açık piksel) | 10,3–10,5 |
| Etkileşim kayması (tema, kategori, sıralama, görünüm) | 0px |
| Akordeon | Yukarıdaki bölümün kapanmasını kaydırma karşılayabiliyorsa açılan başlık hiç kıpırdamıyor. Karşılayamıyorsa (liste başı ya da sonu) kalan fark 250ms içinde yumuşak kayıyor. Ölçülen: liste başında 408px kapanış, kare başına en fazla 37,6px; liste sonunda karşılanamayan 51px |
| Sheet | Alt çubuk dibe sıfır boşlukla oturuyor, iç kaydırma var, çip kaldırma + uygula + temizle çalışıyor |

Görüntüler `docs/screenshots/liste-v2/` altında:
- `chromium|webkit-390-grid|liste-tam.png`
- `*-360|390|430-ust.png`
- `durum-*.png` (kategori, dünya mutfakları, seçili mutfak, sıfır sonuç, menü, yükleniyor, header 0/60/120/300, satır)
- `sheet/1-5`
- `tema-once|sonra.png`
- `kirpim/` (3×)
- `adaylar/`
- `galeri-*.png`
- `web/` (canlı referans)

## 9. Açık konular / çelişkiler (karar bekliyor)

1. **Solid header rengi:** AGENTS "solid primary #E14827" diyor. Beyaz logonun #E14827 üzerindeki kontrastı 4,07, talimattaki 4,5 eşiğinin altında. V2'de solid header `--tomato-dark` (#C43D20, 5,2:1); tek token: `--lv2-header-solid`. Ana sayfa V3 #E14827 kullanıyor, ekranlar arasında fark var. Karar sizde.
2. **Sayaç → panel boşluğu:** AGENTS "en az 24px" diyor, talimat "liste-1'den bir adım az" diyor. Son talimat uygulandı: kutu 20px, yazı 22px.
3. **Izgara satır aralığı:** AGENTS 20px diyor, V2'de 24px (talimat: "kalabalık bitsin").
4. **Kategori rengi:** "Primary" istendi. 11px metinde #E14827 beyaz zeminde 4,5'i geçmiyor, bu yüzden `--tomato-deep` kullanıldı. Overlay/cam adaylarında `--hero-accent` kullanılıyor.
5. **Tema seçimlerinde yerel veri:** Yerel 32 tarifin facet verisinde bazı temalar karşılık bulmuyor (ör. Günlük Pratik → 0 tarif). Çipteki sayı webdeki toplam. Boş durum çalışıyor ama veri sınırı raporlanıyor.
6. **Balkan Mutfağı:** Webde `fa-earth-americas` var. Talimat "nötr dünya ikonu" dediği için `fa-globe` kullanıldı.
7. **Tarif bağlantıları:** Ana sayfa V3 ile aynı hedef olan `detay-c.html`'e gidiyor. Paralel çalışmada `detay-v2.html` oluştu; hedefin değişmesi gerekiyorsa tek sabit: `DETAIL`.
8. **Akordeon:** Liste başında/sonunda kapanan bölümün tamamı kaydırmayla karşılanamıyor; kalan fark yumuşak kayıyor (fiziksel sınır).

## 10. Değişen / eklenen dosyalar (yalnız v3-app)

- `liste-v2.html`, `liste-v2.css`, `liste-v2.js` (yeni; liste-1 değişmedi)
- `liste-sayfa-v2.html` (karşılaştırma galerisi), `liste-v2-hero-adaylari.html` (aday galerisi)
- `assets/flags/*.svg` (49 dosya) + `assets/flags/LICENSE` (Laravel `public/flags`tan salt okunur kopya)
- `docs/41-liste-v2-revize.md`
- `docs/liste-v2/` (`liste-v2-qa.mjs`, `hero-compare.mjs`, `contrast-lib.mjs`, `logo-probe.mjs`, `qa.json`, `hero-compare.json`, `qa-log.txt`)
- `docs/screenshots/liste-v2/`

Dokunulmayanlar: ortak CSS/JS (`tokens.css`, `app.css`, `ld-source.js`, `hero-light.css`, `liste-six.*`), `ana-v3*` ve `ana-sayfa-v3*`, `AGENTS.md`, `docs/39` ve `docs/40`, kök ve `yayin`. Sunucu yeniden başlatılmadı. Git veya yayın işlemi yapılmadı.

## 11. EK 3 · Öne çıkan kart: görsel üstü metin (bölüm 4'teki seçimin yerini alır)

Bindirme panel (B) beğenilmedi. A (görsel üstü metin) temel alındı ve **ana sayfa V3 öne çıkan kartıyla aynı aileye** çekildi. Aile `ana-v3.css` "A · kaplama" ve `ana-v3.js` `cardVeils` okunarak belirlendi.

- **Görsel ve overlay:** 4:3 görsel. Tek sürekli gradient: kaynak koyu renk (`--overlay`), kategorinin 24px üstünde %80'e 48px'lik smoothstep ile çıkıyor, metin boyunca %90'a iniyor. Eğri metnin gerçek konumundan ölçülüyor; uzun başlıkta yukarı uzuyor. 49 durak, bant yok.
- **Görsel üstü öğeler:** Sol üstte süre + puan rozeti, sağ üstte kaydet (kart ailesindeki konum korundu; kaydet kararı ortak bileşen turuna bırakıldı).
- **Metin:** Kalın kategori (GilroyBd, beyaz; ana sayfadaki gibi), öne çıkan rolde en çok 2 satır başlık + "…", avatar + tek satır yazar. Kategori → başlık 4px, başlık → yazar 8px, kenarlardan 16px; hepsi ana sayfa ile aynı.
- **Kart yüksekliği:** Başlık uzunluğundan bağımsız. 360'ta 240px, 390'da 263px, 430'da 293px; kısa (Sagdana), uzun (İran Usulü Baharatlı Acılı Balık Kebabı) ve varsayılan (Tavuk Curry) başlıkta aynı.
- **Kontrast** (metin gizlenerek, arkasındaki **en açık piksel**; Chromium + WebKit, 360/390/430, üç başlık):
  - Kategori: 8,97–10,71
  - Başlık: 9,55–13,87
  - Yazar: 11,39–15,05
  - Rozet: 8,72–16,43
  - Hepsi ≥4,5.
- **Kanıt:**
  - `docs/liste-v2/hero-overlay-qa.json`
  - `docs/screenshots/liste-v2/hero-overlay/once-sonra-360|390|430.png`: önce = bindirme panel, sonra = görsel üstü metin; kısa ve uzun başlık.
- **Adaylar:** `?hero=panel|glass` karşılaştırma için duruyor. Aday galerisinde A seçili olarak işaretli.

Header rengi, kategori rengi, kaydet düğmesi ve detay bağlantısı kararları talimat gereği **bekletiliyor**; ortak bileşen turunda ele alınacak.

## 12. R1 · Filtre arama kutusunun içinde, sıralama sonuç satırında

Referans yemek.com uygulaması: filtre ikonu arama kutusunun sağ iç kenarında.

**Arama kutusu.** Kutunun içindeki sıra: arama ikonu · yazı alanı · temizle (yalnız yazı varken) · filtre.
- Filtre düğmesi `fa-solid fa-sliders`, 44×44 dokunma alanı, kontrol radius'u. Mevcut filtre sheet'ini açıyor; sheet'in davranışı değişmedi.
- Aktif filtre varsa ikon primary oluyor ve sağ üstte sayaç rozeti çıkıyor. Filtre yoksa rozet `display:none`.
- Yazının sağ kenarı temizle/filtre düğmesinin solunda kalıyor; ölçüldü.
- Placeholder "Tarif ara (ör. mercimek çorbası)". Sığmazsa "Tarif ara" kullanılıyor (ölçülerek seçilir). 360/390/430'un hepsinde uzun hâl sığdı.
- Sheet kapanınca odak filtre düğmesine dönüyor; kutunun primary halkası artık yalnız yazı alanı odaktayken çiziliyor.

**Sonuç satırı.** "Filtrele / Önerilen" satırı kaldırıldı. Sıralama, görünüm düğmelerinin solunda, aynı yükseklikte (52px) bir kontrol grubunda; dokununca mevcut sıralama sheet'i açılıyor.
- **?siralama=a** (varsayılan): yalnız ikon (`arrow-down-wide-short`, 44×44). Varsayılan dışı sıralamada primary. `aria-label` = "Sıralama: <seçili ad>".
- **?siralama=b**: ikon + kısa ad (Önerilen · En yeni · En çok puan · En hızlı). Ad taşarsa `ellipsis`; ölçümde hiç kesilmedi.
  - **360px takası:** B'de etiketli düğmeye yer açmak için sonuç sayısı görselde "N tarif" yazıyor. " bulundu" görsel olarak gizli; ekran okuyucu tam metni okuyor. A'da tam metin görünür.
- Ortak sayfalama kodu `.result-bar`'a kaydırdığı için sonuç satırı bu sınıfı taşıyor.
- Ortak `syncQuery` adresi yeniden yazarken `siralama` ve `hero` parametrelerini koruyor.

**Ölçüm** (`docs/liste-v2/search-filter-qa.mjs` → `search-filter-qa.json`; önce: `search-filter-before.json`; Chromium + WebKit × 360/390/430 × A/B):
- **Kazanılan dikey alan: 48px.** Tema şeridi altı → sonuçların başlangıcı 140 → 92px. Kaldırılan satır 44px + aralığı.
- **Zıplama yok:** arama kutusu (50), panel (194), sonuç satırı ve kontrol grubu (52) yükseklikleri filtre yok / sıralama değişti / 2 filtre / yazı var durumlarında aynı.
- Dokunma alanları ≥44; `fa-regular` 0; yatay taşma 0; JS hatası 0.
- **Yapışma eşiği değişmedi** (yapışma koduna dokunulmadı): WebKit 228 → 228px.
  - Chromium'da ölçüm 246–255 arasında oynuyor (önce 250–251). Scroll olayının kare zamanlamasından; geometrik eşik iki motorda da panel üstü = header altı (68px).
  - Yapışık hâlde panel 68px'te, köşe 0.

**Görüntüler** (`docs/screenshots/liste-v2/arama-filtre/`):
- `{a|b}-filtre-yok-{360|390|430}-{chromium|webkit}.png`
- `{a|b}-iki-filtre-…`, `{a|b}-yazi-var-…`
- Yapışık hâl: `{a|b}-yapisik-…`
- Önce: `once-390.png`

## 13. EK 2 · R1b–R7 (seçenekler tek linkte)

Tek link, parametreli: `liste-v2.html?siralama=a&gosterge=a&radius=a&rozet=a`. Her parametrede varsayılan `a`.
- **Yeni ortak dosyalar** (şimdilik yalnız liste bağlı):
  - `ortak-kart.css`: radius token'ları, kart / öne çıkan / satır, metrik rozeti + kaydet çifti, avatar, slider.
  - `ortak-kart.js`: `DGCard.card | feature | slider | avatar | meta | wireSliders`; seçenek parametrelerini `<html data-dg-*>` üzerine yazar.
- **Dokunulmayanlar:** ana sayfa ve detay dosyaları, `ortak-menu.*`, `tokens.css`, `app.css`, `AGENTS.md`.
- **Seçenekler neden ilk gezinme adresinden okunuyor:** ortak `ld-source.js` ilk çizimde adresi yeniden yazıp bilinmeyen parametreleri siliyor. `liste-v2.js` de sonradan `siralama`, `gosterge`, `radius` ve `rozet` parametrelerini adrese geri ekliyor.

### R1b · Tema & pişirme tipi: yalnız anlamlı ve sonucu > 0 olan öğeler

> **D1 ile değişti (bölüm 16):** Dünya Mutfakları sekmesinde bölüm tamamen gizli. Aşağıdaki tablonun mutfak sütunları artık geçerli değil.

**Canlı site** (dadagastro.com/tarifler, 10 Ekim 2026, `.subcat` bağlantıları):
- Şeritte her seçimde aynı 9 öğe var, sayılar seçime göre değişiyor.
- Tema bağlantısı mevcut kategori/mutfak seçimini koruyup yalnız tema facet'ini (`yemek_modu` / `beslenme`) ekliyor.
- "Tümü" bağlantısı (`/tarifler?q=`) bütün seçimi sıfırlıyor.
- Kategori sayfasında (`/tarifler/kategori/tatli`) şerit hiç yok.
- "Temel Pişirme" ve "Tüyo" bu şeritte değil. "Temel Pişirme" yerel veride yalnız Mutfağa Giriş ders başlığı ("Temel Pişirme Yöntemleri") olarak geçiyor, "Tüyo" hiç yok. Liste-v2 şeridine hiç girmemişler.
- Sorunun karşılığı şu: mevcut seçimde 0 sonuç veren temalar görünüyordu ve tema seçimi kategori/mutfağı siliyordu.

| Tema | Canlı · Genel | Canlı · Türk | Canlı · İtalyan | Canlı · Tatlı |
|---|---:|---:|---:|---:|
| Tümü | 6.112 | 6.112 (seçimi sıfırlar) | 6.112 | 6.112 |
| Günlük Pratik | 810 | 501 | 26 | 18 |
| Glutensiz | 1.997 | 1.064 | 29 | 68 |
| Tek Tencere | 372 | 190 | 5 | 1 |
| Fırın Yemekleri | 636 | 426 | 25 | 76 |
| Airfryer Tarifleri | 327 | 105 | 3 | 6 |
| Diyabete Uygun | 244 | 75 | 2 | 4 |
| Kalp Dostu | 249 | 88 | 1 | 4 |
| Düşük Kalorili | 319 | 163 | 2 | 6 |

**Kural (mobil):**
- Bir tema, mevcut kategori/mutfak + kendi facet'iyle **yerel sonuç > 0** ise görünür; çipteki sayı o sonuçtur.
- Tema seçimi kategori/mutfağı korur (canlıdaki gibi).
- "Tümü" yalnız en az bir tema görünürken çıkar ve "seçim içinde tema yok" anlamına gelir. Bu canlıdan bilinçli fark: canlıda Tümü bütün seçimi sıfırlıyor, mobilde kategori/mutfak seçimi şeridin kendi "Tümü"sünde zaten var.
- Hiçbir tema kalmazsa bölüm (`section[hidden]`) tamamen gizlenir.

Yerel veri (32 tarif), ✓ = şeritte görünür:

| Tema | Genel | Kat. Tatlı | Kat. Balık | Kat. Tavuk | Mutfak Türk | Mutfak İtalyan | Mutfak Portekiz | Mutfak Meksika |
|---|---|---|---|---|---|---|---|---|
| Tümü | 32 ✓ | 6 ✓ | 6 ✓ | 2 ✓ | 11 ✓ | 0 | 2 ✓ | 2 ✓ |
| Günlük Pratik | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Glutensiz | 11 ✓ | 1 ✓ | 3 ✓ | 1 ✓ | 2 ✓ | 0 | 0 | 1 ✓ |
| Tek Tencere | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Fırın Yemekleri | 2 ✓ | 2 ✓ | 0 | 0 | 0 | 0 | 2 ✓ | 0 |
| Airfryer Tarifleri | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Diyabete Uygun | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Kalp Dostu | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Düşük Kalorili | 2 ✓ | 0 | 2 ✓ | 0 | 1 ✓ | 0 | 0 | 0 |

İtalyan mutfağında yerelde tarif yok: bölüm gizli, boş durum görünüyor. Görüntüler: `ek2/r1b-dunya-mutfaklari-{genel|turk|italyan}.png`.

### R2 · Öne çıkan slider

- **Adet: 5 önerilir.** Kaydırmalı vitrinlerde ilk 3–5 öğeden sonra etkileşim hızla düşer; 5 noktalı gösterge de tek bakışta sayılabiliyor.
  - Sonuç 5 ya da azsa hepsi gösterilir.
  - 1 sonuçta slider ve gösterge yok, tek öne çıkan kart.
  - Sonuç sayısı **çift** ve 6'dan büyükse 4: slider'dan sonraki kartlar ızgarada ikişerli dizildiği için son satırda yetim kart kalmaz. Örnek: 32 sonuç → 4 slayt + 28 kart (8 / 8 / 8 / 4); 7 sonuç → 5 + 2.
- **Sayfalama:** sayfa 1 = slider + 8 kart; sonraki sayfalar 8'er kart (hep çift).
- **Davranış:** yatay kaydırma, `scroll-snap` (mandatory + stop always), klavyede ← / →, `aria-roledescription="carousel"/"slide"`.
  - Ölçüm: 0,7 slayt kaydırınca snap bir sonraki slayta oturuyor (362px adım).
  - Gösterge güncelleniyor: noktalar `0100`, sayaç "2 / 4".
- **Gösterge kartın içinde, sağ altta.**
  - `?gosterge=a`: noktalar; etkin nokta 24px uzun ve primary. Tam yuvarlak yalnız avatarda olabildiği için noktalar XS/2 köşeli.
  - `?gosterge=b`: "2 / 5" sayacı, metrik rozetiyle aynı aile.
  - Yazar satırı göstergenin altına girmesin diye pay bırakılıyor; ölçümde çakışma yok.
- **Otomatik geçiş: önerilmiyor, yok.** Gerekçeler:
  - Kullanıcı okurken kart kayıyor; otomatik dönen vitrinler göz ardı ediliyor (banner körlüğü).
  - Hareketli içerik için durdurma denetimi gerekiyor (WCAG 2.2.2).
  - Kaydırma ve snap zaten keşfi sağlıyor.
  - İstenirse tasarım: dokununca durur, `prefers-reduced-motion`'da kapalı.
- **Kart yüksekliği:** bütün slaytlarda aynı (390: 263px); 4:3 oran sabit.
  - Uzun ve kısa başlıkta denendi: Balık kategorisi 2 / 1 / 1 / 1 satır, genel 1 / 2 / 2 / 1 satır; yükseklik değişmedi.
- **Görüntüler:**
  - `ek2/r2-genel-1|2.png`, `ek2/r2-balik-1|2.png` (noktalar)
  - `ek2/r2-balik-sayac-1|2.png` (sayaç)
  - `ek2/r2-tek.png` (tek sonuç)


### R3 · Radius: aynı "sertlik" (EK 2 önerisi; **EK 3 ile değişti**: kontroller eski değerlerine döndü, `?radius` yalnız kartları etkiliyor; bkz. bölüm 14)

**Kural.** Aynı radius değeri küçük öğede daha yuvarlak görünür. Bu yüzden radius kısa kenarla doğru orantılı değil, karekökü oranında büyür: **r ≈ c × √(kısa kenar)**. Değerler spacing token'larının yarım adımlarına oturtuldu; elle piksel yok.
- **a (köşeli):** c ≈ 0,7
- **b (orta):** c ≈ 1,0

Token'lar `ortak-kart.css` içinde: `--dg-r-xs|s|m|l|xl`, ayrıca türetilmiş `--dg-r-seg`, `--dg-r-in-control`, `--dg-r-in-chip`.
- İç içe kuralı: iç = dış − iç boşluk; sonuç sıfırın altına düşerse 0.
- Tam yuvarlak yalnız avatar (`--radius-avatar`).
- `tokens.css` değişmedi.

| Öğe | Kısa kenar (390) | Token | a | b | c (a / b) |
|---|---:|---|---:|---:|---|
| Kart (ızgara görseli) | 169 (360: 154, 430: 189) | `--dg-r-l` | 8 | 12 | 0,62 / 0,92 |
| Öne çıkan kart ve slider | 263 (360: 240, 430: 293) | `--dg-r-xl` | 12 | 16 | 0,74 / 0,99 |
| Satır kartı (kare görsel) | 152 | `--dg-r-l` | 8 | 12 | 0,65 / 0,97 |
| Düğme (sayfalama, boş durum, sheet) | 44–52 | `--dg-r-m` | 6 | 8 | 0,90 / 1,21 |
| Input (arama kutusu) | 50 | `--dg-r-m` | 6 | 8 | 0,85 / 1,13 |
| Arama içindeki filtre düğmesi | 44 (kutunun 4px içinde) | `--dg-r-in-control` = M − 4 | 2 | 4 | iç içe |
| Chip | 44 | `--dg-r-m` | 6 | 8 | 0,90 / 1,21 |
| Chip içindeki işaret (fotoğraf/ikon) | 28 (çipin 8px içinde) | `--dg-r-in-chip` = M − 8 | 0 | 0 | iç içe |
| Segment (dış: kapsam, görünüm, sıralama grubu) | 52 | `--dg-r-seg` = M + 4 | 10 | 12 | iç içe |
| Segment düğmesi | 44 | `--dg-r-m` | 6 | 8 | 0,90 / 1,21 |
| Sheet ve beyaz panel (üst köşeler) | ≥ 360 | `--dg-r-xl` | 12 | 16 | üst sınır |
| Kaydet karesi | 32 | `--dg-r-s` | 4 | 6 | 0,71 / 1,06 |
| Metrik rozeti | 32 (yükseklik) | `--dg-r-s` | 4 | 6 | 0,71 / 1,06 |
| Sayı rozeti (filtre / sheet) | 16–20 | `--dg-r-xs` | 2 | 4 | 0,50 / 1,00 |
| Slider gösterge noktası, "2 / 5" sayacı | 8 / 20 | `--dg-r-xs` | 2 | 4 | |
| Bayrak | 15 | `--dg-r-xs` | 2 | 4 | |
| Avatar | 20 | `--radius-avatar` | 50% | 50% | tam yuvarlak |

Ölçüt "tarif kartıyla düğme aynı sertlikte" için c değerleri:
- **b'de** kart 0,92 ve düğme 1,21. Düğme biraz daha yumuşak ama aynı ailede.
- **a'da** kart 0,62 ve düğme 0,90. Genel olarak belirgin biçimde daha köşeli.

Ekran dışında kalanlar: header düğmeleri, alt menü ve sağ menü ortak bileşen (ortak-menu / app.css). Bu tur yalnız liste bileşenlerine uygulandı; ortak bileşenlerin bağlanması Beyar'ın kararından sonra.

### R5 · Ortaklık listesi (yalnız okundu, değiştirilmedi)

`ana-v3.html` bağlıları: `ana-v3.css`, `ana-v3.js` (+ `six-*`, `set*`, `home-*`, `a-*` ve `ortak-menu.*`). `detay-v2.html` bağlıları: `detay-v2.css`, `detay-v2.js`, `detay-v2-tarifler.js`, `detay-v2-aciklama.js`, `ld-source.js`, `ortak-menu.*`. Kart işaretlemesi iki ekranda da ortak `ld-source.js` `card()` + `.recipe-card` sınıflarından gelir. Kaydet ve rozet varsayılan stilleri `app.css`'tedir (`.recipe-card .save`, `.save:before`, `.photo-meta`).

**Ana sayfa (`ana-v3.*`)**

| Tür | Dosya | Seçici / işlev |
|---|---|---|
| Tarif kartı | ana-v3.js | `recipeCard(r)` (satır 55): `card(r)` → yazar satırı yeniden yazılıyor; `cardVeils()` (73) → `--v3-veil` |
| | ana-v3.js | En son eklenenler: `.collection-block .collection-body` (241); öne çıkan ilk kart `featured` rolü (308) |
| | ana-v3.js | Dolapta Ne Var önizlemesi `.kitchen-previews` (114) |
| | ana-v3.css | `.home-v3 .recipe-card`, `.card-media` (4:5), `.card-visual`, `.card-photo`, `.card-image-shade`, `.card-body`, `.card-copy`, `.card-category`, `.card-copy h3`, `.card-footer`, `.card-author-row` |
| | ana-v3.css | `.collection-body>.recipe-card:first-child` (4:3, öne çıkan); `:not(:first-child) .card-media` (2:3); `.v3-finder .kitchen-previews>.recipe-card` |
| Rozet | ana-v3.css | `.home-v3 .photo-meta` (overlay %72); `.home-v3 .recipe-card .photo-meta` (sol üst 12) |
| | ana-v3.js | Video kartları ve kategori karoları da `photo-meta` kapsülünü kullanıyor (229, 264) |
| Kaydet | app.css | `.recipe-card .save` (ana-v3'te özel kural yok) |
| Avatar | ana-v3.js / ana-v3.css | `.card-author-row .avatar` (`--radius-avatar`); şefler `.v3-chef-av` |
| Radius | ana-v3.css | `--radius-card`: `.v3-surface`, `.v3-video-cover`, `.v3-video:focus-visible`, `.v3-chef-card`, `.v3-chef-cta`, `.v3-cat-media` |
| | ana-v3.css | `--radius-control`: `.v3-pantry-head output`, `.v3-pantry-chips .chip`, `.v3-pool .chip`, `.v3-play`, `.v3-chef-follow`, `.v3-cuisine`, `.v3-flag-frame`, `.v3-cat-symbol`, `.v3-cat-row>.photo` |
| | ana-v3.css | `--radius-segment`: `.v3-tabs` |
| Alternatif dosyalar | ana-v3-alt-ortak.js | `recipeCard(r)` (37); ayrıca `ana-v3-alt1|2|3.*` |

**Detay (`detay-v2.*`)**

| Tür | Dosya | Seçici / işlev |
|---|---|---|
| Benzer tarifler kartı | detay-v2.js | `recipeCard(item)` (270): `card(item)` + yazar satırı (274); bölüm `.dv2-similar` (281) |
| | detay-v2.css | `.dv2-rail`, `.dv2-rail>.recipe-card`, `.dv2-rail .recipe-card .card-media`, `.card-visual`, `.card-photo`, `.card-body`, `.card-copy`, `.card-category`, `.card-copy h3`, `.card-footer`, `.card-author-row`, `.dv2-card-author` |
| Rozet | app.css | `.photo-meta` (detayda özel kural yok) |
| Kaydet | app.css | `.recipe-card .save` (detayda özel kural yok); header kaydet ayrı sözleşme |
| Avatar | detay-v2.js / detay-v2.css | `.dv2-avatar` (40, şef ve yorum), `.dv2-rail .card-author-row .avatar` (20); zemin `--line`, harf `--tomato-deep` |
| Radius | detay-v2.css | `--radius-control`: `.dv2-chef-id`, `.dv2-follow`, `.dv2-sub-*`, `.dv2-tabs.segmented`, `.dv2-box-icon`, porsiyon paneli ve stepper, `.ingredient-actions .icon-button`, `.shopping-all`, `.step-index`, `.timer-chip`, `.dv2-rating`, yorum filtre çipleri, `.review-photo`, `.review-actions button`, `.reply`, `.star-picker label`, `.review-form textarea`, `.upload-label`, paylaş öğeleri, `.cm2-*` (pişirme modu), `.dv2-feature`, `.dv2-info-card` |
| | detay-v2.css | `--radius-card`: `.cm2-figure`, `.step-photo` |
| | detay-v2.css | `--radius-sheet`: `.detail-main`, `.dv2-tabs-bar` |
| | detay-v2.css | Ayrıca `--radius-choice` (malzeme seçimi), `calc(var(--radius-control) / 6)` (`.dv2-flag`), `calc(var(--radius-control) - var(--space-4))` (`.dv2-tabs>button`) |

**Sağ menü:** Üç ekranda da `ortak-menu.css/js` (`dialog.om`) bağlı. Listede regresyonla doğrulandı:
- Header düğmesiyle açılıyor; logo resmi renkli.
- Etkin satır doğru: genel listede "Tüm Tarifler", kategori seçiliyken "Kategoriler"; Tarifler grubu açık.
- Kapat düğmesi (44×44) ve Escape kapatıyor, sayfa kilidi (`om-locked`) kalkıyor.

### R4 · Metrik rozeti + kaydet karesi (tek kalıp)

- **Konum ve ölçü:** rozet sol üstte, kaydet sağ üstte. İkisi de 32px yükseklikte (`--save-visible`), aynı radius sertliğinde (S), görselin üst ve yan kenarından 8px; ikisi arasında en az 8px. 720 çift ölçüldü, sapma yok.
- **Aynı kalıp:** normal kart, öne çıkan kart (slider) ve satır kartı.
  - 360px'te ızgara kartı 154px. Çiftin sığması için saat ikonu kaldırıldı ("dk" birimi süreyi anlatıyor; puanda yıldız duruyor). "215 dk ★ 5,0" 94px tutuyor, sığıyor.
  - Satır karesi 152px'e çıktı (token: 3×48+8), çift aynı satırda sığsın diye.
- **Seçenekler:**
  - `?rozet=a`: açık cam (beyaz %92 + bulanıklık), nötr koyu metin (`black` %87). Kontrast en az **13,48**.
  - `?rozet=b`: nötr koyu cam (siyah %56 + bulanıklık), beyaz metin. Kontrast en az **5,1**.
  - Kontrast 12 farklı fotoğrafta ölçüldü; a'da en koyu, b'de en açık arka plan pikseline göre (köşe dışı pikseller hariç). Hepsi ≥ 4,5.
  - Kahverengi ton (`--overlay` / `--ink`) rozette ve kaydet karesinde kullanılmadı. FA solid ve Gilroy.
- **Kaydet tek bileşen, iki durum:** zemin aynı kalıyor, yalnız ikon değişiyor; kaydedilince primary (`--tomato`).
  - **Kısıt:** "boş ↔ dolu" ikon farkı Font Awesome'da yalnız `fa-regular` (outline) ile mümkün; kanon outline'ı yasaklıyor. İki durumda da `fa-solid fa-bookmark` var, durum renkle ayrılıyor. Outline'a izin verilirse tek satırlık değişiklik.

### R6 · Şerit ile "Tema & pişirme tipi" arası

- **Sorun:** panel yapışınca başlık beyaz panelin altına kayarken yarıya kesilip şeridin ayraç çizgisine değiyordu.
- **Çözüm:** tema başlığı, tema şeridi ve sonuç satırı yapışık panelin alt kenarına 16px'ten fazla yaklaşınca bütünüyle gizleniyor (`lv2-occluded`, 150ms opaklık; azaltılmış harekette anlık). Yarım satır kalmıyor.
- **Ölçüm** (Chromium + WebKit, 390, 0–520px 4px adım): panel kenarı → ilk görünen metin en az **16px**, şerit → ilk görünen metin en az **32px**, kesik satır yok.

### R7 · Avatar

- Fotoğraf varsa kapak (`background-image`); yoksa detaydaki gibi baş harf dairesi (nötr `--line` zemin, `--tomato-deep`, GilroyBd, TR büyük harf).
- Bütün kart türlerinde aynı `dg-avatar` bileşeni kullanılıyor. Yerel ve canlı veride yazar fotoğrafı yok; hepsi baş harf.
- Eski "i ikonu" görüntüsü: öne çıkan kartta avatar beyaz zeminde ince harfti, "İ" ⓘ'ye benziyordu. Artık detay ailesinde (gri zemin, kalın harf). Ölçüm: ikon öğesi 0; 20×20.

### Yapışma ve kaydırma (önce / sonra)

| Motor | Genişlik | Yapışma eşiği önce → sonra | Panel yüksekliği | Yapışık panel üstü |
|---|---:|---:|---:|---:|
| WebKit | 360 / 390 / 430 | 228 → 228 | 194 → 194 | 68 |
| Chromium | 360 / 390 / 430 | 250–251 → 228 | 194 → 194 | 68 |

Chromium'daki "önce" değeri, ölçüm betiğinde ortak `html{scroll-behavior:smooth}` yüzünden `scrollTo` yumuşak kaydığı için şişkin çıkmıştı. Bu turda ölçüm anlık kaydırmayla yapıldı; geometrik eşik iki motorda da 228 (panel üstü = header altı). Yapışma kodu değişmedi.

### Ölçüm özeti (`docs/liste-v2/ek2-qa.mjs` → `ek2-qa.json`)

- 5 seçenek yapılandırması × 3 genişlik × 2 motor = 30 satır.
  - JS hatası 0, yatay taşma 0, 44px altı hedef 0 (ızgara ve satır görünümü), `fa-regular` 0.
  - Radius computed değerleri bölüm R3 tablosundaki token'larla aynı.
- Genel regresyon (`liste-v2-qa.mjs`): 12/12 satır temiz, etkileşim kayması 0px.
  - Sağ menü (ortak-menu) açılıyor ve kapanıyor; kategori seçiliyken "Kategoriler" etkin.
- Arama/filtre ölçümü (`search-filter-qa.mjs`): 12/12 kararlı, taşma yok.

### Ekran görüntüleri (`docs/screenshots/liste-v2/ek2/`)

- `secenek/{a|siralama-b|gosterge-b|radius-b|rozet-b}-{ust|slider|izgara|satir}-{360|390|430}-{chromium|webkit}.png` (120 görüntü)
- `karsilastirma/radius-a-b.png`, `karsilastirma/rozet-a-b.png`: a/b tek görselde yan yana.
- `r1b-dunya-mutfaklari-{genel|turk|italyan}.png`
- `r2-*.png`, `r7-one-cikan-avatar.png`

**Arşiv notu:** `liste-v2-hero-adaylari.html` artık kayıtlı aday görüntülerini gösteriyor; canlı sayfada yalnız seçilen kurgu var. `hero-compare.mjs` ve `hero-overlay-qa.mjs` eski `?hero=` parametresine bağlı olduğu için tarihsel.

## 14. EK 3 · Kart radius'u, kontrollerin geri dönüşü, avatar baş harfi

### Kontroller bu turdan önceki radius'a döndü (`?radius` onları etkilemiyor)

EK 2'deki R3 ölçeği kaldırıldı. Kontroller yine kanondaki `--radius-control` (12), `--radius-segment` (16), `--radius-sheet` (24), `--radius-choice` (4) değerlerinden ve ortak `app.css` kurallarından radius alıyor.

**Ölçüm:** computed `border-radius`, `docs/liste-v2/ek3-qa.mjs` → `ek3-qa.json`. Chromium + WebKit, `?radius=a` ve `?radius=b` dört durumda da aynı değerler çıktı.

"Önce" sütunu, aynı ortak kuralları kullanan ve bu turlarda değişmeyen liste-1 / liste-5 sayfalarının computed değerleri ile EK 2 öncesi kaynaktaki token'lardır.

| Kontrol | Önce | Şimdi (a ve b) |
|---|---:|---:|
| Sekme kapsayıcı (Kategoriler / Dünya Mutfakları) | 12 (liste-5 `.ld-scope`) | 12 |
| Sekme düğmesi | 12 (liste-5) | 12 |
| Kategori çipi, tema çipi | 12 (liste-1 `.chip`; önceki kaynak `--radius-control`) | 12 |
| Çip içi işaret | 4 (önceki kaynak: 12 − 8) | 4 |
| Arama kutusu | 12 (liste-1) | 12 |
| Arama içindeki filtre düğmesi | 12 (önceki kaynak `--radius-control`) | 12 |
| Sıralama grubu | 16 (önceki kaynak `--radius-segment`) | 16 |
| Sıralama düğmesi | 12 | 12 |
| Görünüm kapsayıcı / düğmesi | 12 / 12 (liste-1) | 12 / 12 |
| Sayfalama | 12 (liste-1) | 12 |
| Sayı rozeti | 4 (`--radius-choice`) | 4 |
| Panel üst köşe | 24 (liste-1) | 24 |
| Sheet üst köşe | 24 (liste-1 `dialog#filters`) | 24 |
| Sheet düğmesi | 12 (liste-1) | 12 |
| Sheet kapat | 12 | 12 |
| Seçim kutusu | 4 | 4 |
| Boş durum düğmesi | 12 | 12 |

### Yalnız tarif kartları: a = 16, b = 20

Token'lar `ortak-kart.css` içinde:
- Kart: `--dg-card-r` (a: `var(--space-16)`, b: `var(--space-20)`).
- Rozet ve kaydet karesi: `--dg-pair-r` = max(6, kart − kenar boşluğu 8).
- Slider sayacı: `--dg-pager-r` = max(6, kart − 16).
- Alt sınır 6 = `calc(var(--space-4) * 1.5)`.

| Öğe | a | b |
|---|---:|---:|
| Normal kart görseli | 16 | 20 |
| Öne çıkan kart ve slider şeridi | 16 | 20 |
| Satır kartı kare görseli | 16 | 20 |
| Süre/puan rozeti (kart, öne çıkan, satır) | 8 | 12 |
| Kaydet karesi (kart, öne çıkan, satır) | 8 | 12 |
| Slider sayacı ("2 / 5") | 6 | 6 |
| Slider noktası | 2 | 2 |
| Avatar | 50% | 50% |

Değerler Chromium ve WebKit'te ölçüldü ve tabloyla aynı.

Karşılaştırma görseli: `docs/screenshots/liste-v2/ek3/karsilastirma-once-a-b.png`.
- Sütunlar: önce (kart 24, iç öğe 12) / a / b.
- Satırlar: kart ızgarası / öne çıkan (slider) / satır görünümü.
- "Önce" sütunu, eski radius'un mevcut kart üzerinde CSS ile canlandırılması.

### Avatar baş harfi ("İ")

Baş harf `ortak-kart.js` `avatar()` içinde `toLocaleUpperCase('tr')` ile üretiliyor. Liste CSS'inde ve ortak-kart CSS'inde `text-transform` yok (computed `none`).
- **Ölçüm:** 50 avatarın 50'si doğru. Kart, satır, öne çıkan ve slider denetlendi; sayfa 1–4 ve Tatlı kategorisi tarandı.
- **İ ile başlayan yazarlar** (İrem Akşit, İrem Egeli, İrem Akgül, İlker Bozkurt) kart, satır ve slider'da U+0130 (büyük İ) olarak çiziliyor.

**Görsel not:** Gilroy, büyük "İ"yi tam boy gövde + nokta olarak çiziyor (80px karşılaştırma: "İ I i"). 20px avatardaki 11px harfte bu, küçük "i"ye benzer görünebiliyor; karakter ise doğru büyük harf (`ek3/avatar-I-4x.png`). Daha belirgin olması istenirse yalnız avatar harfi bir tipografi basamağı büyütülebilir. Bu bir tasarım kararı olduğu için uygulanmadı.

> **D3 ile uygulandı (bölüm 16):** harf 13px (meta basamağı), GilroyBd.

### Regresyon

- Genel (`liste-v2-qa.mjs`): 12/12 temiz, kayma 0px, sağ menü doğru.
- Arama/filtre (`search-filter-qa.mjs`): 12/12 kararlı.
- JS hatası 0.

## 15. EK 4 · Süre/puan rozeti a: yumuşak koyu cam

- **`?rozet=a` (yeni):** yarı saydam koyu cam.
  - Zemin: kaynak koyu `--overlay` (#211E16) %64, `backdrop-filter: blur(16px) brightness(.85) saturate(.8)`. Beyaz metin; yıldız `--yellow` (tam doygun); 1px, %16 yarı saydam beyaz iç kenar.
  - **Opaklık neden %64:** filtre hiç uygulanmasa da (WebKit ölçümünde `backdrop-filter` karartması görüntüye yansımıyor) beyaz metnin düz beyaz fotoğraf bölgesinde ≥ 4,5:1 kalması için gereken en düşük değer. %52 + karartma ile Chromium 5,5'i geçiyordu, WebKit'te 3,46'ya düşüyordu; bu yüzden filtreye güvenilmedi.
  - Bulanıklık ve karartma yalnız görünümü yumuşatıyor. Doygunluğun düşürülmesi (`saturate(.8)`), fotoğrafın sıcak tonunun cama kahverengi olarak yansımasını azaltıyor.
  - **Kalan ton notu:** #211E16 sıcak bir siyah; açık bej fotoğrafta hafif sıcaklık sezilebilir. Tamamen nötr isteniyorsa b (saf siyah tabanlı) aynı yapıda.
- **Kaydet karesi aynı malzeme:** aynı zemin, filtre, kenar, 32px yükseklik ve kart radius'undan türeyen aynı radius (a 8 / b 12). Kaydedilmiş hâlde zemin aynı kalıyor (`rgba(…, .64)` → aynı), yalnız ikon `--tomato` oluyor (`aria-pressed=true`).
  - İkon boş/dolu ayrımı için outline (`fa-regular`) kanonda yasak; iki durumda `fa-solid fa-bookmark` var, durum renkle ayrılıyor.
- **`backdrop-filter` desteklenmezse** (`@supports not`), cam yerine aynı tonda opak zemin kullanılıyor: a `color-mix(--overlay %88, beyaz)` → beyaz metin kontrastı **11,53**; b → **12,63**.
- **`?rozet=b`** olduğu gibi kaldı (siyah %56 + blur). Yalnız aynı yedek zemin kuralı eklendi; görünüm değişmedi.
- **Kalıp:** normal kart, öne çıkan kart (slider), satır kartı ve slider sayacı aynı token'ları (`--dg-pair-*`) kullanıyor.

**Kontrast** (`docs/liste-v2/ek4-qa.mjs` → `ek4-qa.json`; metin gizlenerek arkasındaki **en açık piksele** göre; köşe dışı pikseller hariç):

| Durum | Chromium (en az) | WebKit (en az) |
|---|---:|---:|
| a · kart ızgarası + slider (12 rozet) | 6,45 | 5,02 |
| a · satır görünümü + slider (12) | 6,47 | 5,02 |
| a · açık zeminli fotoğraflar (Tatlı, 6) | 6,41 | 5,02 |
| b · kart ızgarası + slider (12) | 5,25 | 4,95 |

Bütün ölçümler ≥ 4,5. En zor örnek, açık mutfak arka planlı "15 dk ★ 4,5" (en açık piksel L = 0,25).

**Görüntüler** (`docs/screenshots/liste-v2/ek4/`):
- `karsilastirma-eski-yeni-b.png`: 390, açık zeminli kart (Sagdana) ve koyu zeminli öne çıkan kart (Tavuk Curry) × a eski düz beyaz / a yeni yumuşak cam / b.
- `kaydedildi-a.png`

**Regresyon:** genel 12/12 temiz, etkileşim kayması 0px.

## 16. D1–D3 · Tema şeridi, panel köşesi, avatar baş harfi

### D1 · Tema & pişirme tipi

**Canlı tema listesinin tamamı:**
- Kaynaklar: dadagastro.com/tarifler, 10 Ekim 2026; `.subcat` bağlantıları, genel + Türk + İtalyan + Tatlı seçimleri.
- Laravel karşılığı: `RecipeController::buildThemeStrip()`. Şerit yalnız `in_theme_strip=true` olan Yemek Modu / Beslenme taksonomilerinden kuruluyor. `TaxonomySeeder::THEME_STRIP` tam bu 8 öğeyi işaretliyor.

"Temel Pişirme", "Tüyo" ya da başka bir içerik/bilgi türü tema canlıda da depoda da yok:
- "Tüyo" hiçbir tarifler sayfasında geçmiyor.
- "Temel Pişirme" yalnız Mutfağa Giriş ders başlığı.

Bu yüzden yerel veriye tema eklenmedi.

| Tema | Tür | Facet | Canlı · Genel | Türk | İtalyan | Tatlı |
|---|---|---|---:|---:|---:|---:|
| Günlük Pratik | yemek modu (kullanım) | `yemek_modu` | 810 | 501 | 26 | 18 |
| Tek Tencere | pişirme tipi | `yemek_modu` | 372 | 190 | 5 | 1 |
| Fırın Yemekleri | pişirme tipi | `yemek_modu` | 636 | 426 | 25 | 76 |
| Airfryer Tarifleri | pişirme tipi | `yemek_modu` | 327 | 105 | 3 | 6 |
| Glutensiz | beslenme | `beslenme` | 1.997 | 1.064 | 29 | 68 |
| Diyabete Uygun | beslenme | `beslenme` | 244 | 75 | 2 | 4 |
| Kalp Dostu | beslenme | `beslenme` | 249 | 88 | 1 | 4 |
| Düşük Kalorili | beslenme | `beslenme` | 319 | 163 | 2 | 6 |
| İçerik / bilgi türü | **yok** | — | — | — | — | — |

Filtredeki "İçerik Türü" (`icerik_turu`: video / sesli / fotoğraflı) şeritte değil.

**Canlı ile repo farkı (raporlanıyor):**
- Repo: şerit sayıları aktif seçime bakmıyor, "Tümü" filtreli sayıyı gösteriyor.
- Canlı: tema sayıları seçime göre değişiyor, "Tümü" her seçimde 6.112.

**Kural (tek ve varsayılan; `?tema` parametresi yok):**
- **Dünya Mutfakları sekmesi:** "Tema & pişirme tipi" bölümü tamamen gizli; Tümü dahil her mutfak seçiminde.
  - Bölüm kapalıyken `inert`; klavye ve ekran okuyucu içine girmiyor.
  - Önceden seçilmiş bir tema filtresi kalkmıyor; Filtrele rozetinde ve filtre sheet'inde görünüyor.
- **Kategoriler sekmesi:** şeritte canlıdaki 8 tema. Seçili kategoride yerel sonucu 0 olanlar gizli, çipteki sayı yerel sonuç. Hiç tema kalmazsa bölüm gizli.
- "Anlamsız eşleşme" tablosu kurulmadı.

**Görünenler** (yerel veri, 32 tarif; Chromium ve WebKit × 360/390/430'da aynı):

| Sekme · seçim | Görünen temalar |
|---|---|
| Kategoriler · Tümü | Tümü 32 · Glutensiz 11 · Fırın Yemekleri 2 · Düşük Kalorili 2 |
| Kategoriler · Tatlı | Tümü 6 · Glutensiz 1 · Fırın Yemekleri 2 |
| Kategoriler · Balık ve Deniz Ürünleri | Tümü 6 · Glutensiz 3 · Düşük Kalorili 2 |
| Dünya Mutfakları · Tümü | bölüm gizli |
| Dünya Mutfakları · Türk | bölüm gizli |
| Dünya Mutfakları · Meksika | bölüm gizli |

Yerelde 0 olduğu için hiçbir seçimde görünmeyenler: Günlük Pratik, Tek Tencere, Airfryer Tarifleri, Diyabete Uygun, Kalp Dostu.

**Geçiş ve zıplama:**
- Bölüm yükseklikle birlikte 250ms'de açılıp kapanıyor (`grid-template-rows` 1fr ↔ 0fr + opaklık).
- Kapalıyken şerit → sonuç satırı 40px; bu, şerit → tema başlığıyla aynı ritim. Toplam yükseklik farkı 104px.
- Sekmeler (dokunulan hedef) hiç kıpırdamıyor.
- **Panel yapışıksa:** aşağıdaki içerik kaydırmayla aynı karede telafi ediliyor, konum korunuyor. Panel yapışma eşiğinin altına indirilmiyor.
- **Liste başında:** kaydırma payı yok, fark yumuşak kayıyor.
- Azaltılmış harekette geçiş anlık.

Ölçüm (`docs/liste-v2/d-qa.mjs` → `d-qa.json`; Chromium + WebKit × 360/390/430; Kategoriler → Dünya Mutfakları → Kategoriler; kare kare):

| Durum | Sekmelerin hareketi | Sonuç satırı son kayma | Kare başına en büyük adım |
|---|---:|---:|---:|
| Yapışık panel | 0px | **0px** (kaydırma ±104 ile telafi) | 0,6–1,4px |
| Liste başı | 0px | ±104px, 250ms yumuşak | Chromium 9,5–19, WebKit 17,6–19,9 |

- Yatay taşma 0. Tema şeridi kendi içinde kayıyor, ilk çip 20px gutter'da.
- İlk denemede grid sütunu içeriğe göre genişleyip sayfayı taşırıyordu; `minmax(0,1fr)` ile düzeltildi ve yeniden ölçüldü.
- Adreste mutfak seçiliyken (`?mutfak[]=turk-mutfagi`) sayfa "Dünya Mutfakları" sekmesinde ve bölüm kapalı açılıyor. Animasyon yok.

### D2 · Panel köşesi

- Panelin kendi token'ı var: `--lv2-panel-r: var(--radius-sheet)` (24). `.lv2-panel` ve `.list-tools` bunu kullanıyor; yapışınca `.is-stuck` ile 0.
- `?radius` yalnız tarif kartlarını değiştiriyor: kart 16 / 20, panel her iki durumda 24.

**Ölçüm** (Chromium + WebKit × 360/390/430 × `radius=a|b`):

| | a | b |
|---|---|---|
| Yapışmadan önce | 24 / 24 | 24 / 24 |
| Yapışık | 0 / 0 | 0 / 0 |
| Detay `.detail-main` | 24 | 24 |

**Önbellek kırıcı:** `liste-v2.html`'deki 12 yerel CSS/JS bağlantısının hepsi `?v=<SHA-256 ilk 10 hane>` alıyor. `ortak-kart.css/js`, `ortak-menu.*`, `tokens`, `app`, `hero-light`, `ld-source`, `six-gallery-start` ve Font Awesome dahil.
- Özetleri `docs/liste-v2/cache-bust.mjs` üretiyor.
- Bu tur sırasında başka bir ajan `ortak-menu.js`'i değiştirdi; betik yeniden çalıştırılıp özet güncellendi.
- Paylaşılan dosyalar değiştikçe betik yeniden çalıştırılmalı.
- 12 yanıt 200; 4xx/5xx yok.
- Önceki 12px görüntüsü EK 2'deki R3 değeriydi; büyük olasılıkla tarayıcı önbelleğinden geliyordu.

### D3 · Avatar baş harfi

- Harf etiket basamağından (11) bir üst basamak olan meta basamağına (`--role-meta-size`, 13) çıktı.
- Font: GilroyBd 700. Bu, mevcut en kalın dosya (Gilroy-ExtraBold); `document.fonts.check` ile yüklü olduğu doğrulandı.
- Avatar ölçüsü değişmedi: bütün avatarlar 20×20.
- Denetlenenler: ızgara kartı, satır kartı, öne çıkan slider, tekli öne çıkan kart (Chromium + WebKit × 360/390/430).
- Harfler TR büyük harf; "İ" U+0130 olarak çiziliyor.

### Regresyon

- `liste-v2-qa.mjs`: 12/12 temiz.
  - JS hatası 0, taşma 0, 44px altı hedef 0.
  - Etkileşim kayması (tema, kategori, sıralama, görünüm): 0px.
  - Sağ menü açılıp kapanıyor.
- `search-filter-qa.mjs`: 12/12 kararlı.
  - Tema şeridi → sonuçlar 92px, değişmedi.
  - Yapışma eşiği WebKit'te 228, değişmedi. Chromium'da 247–253 aralığı bölüm 12'de açıklanan yumuşak kaydırma ölçüm gürültüsü.
  - Yapışık panel 68px'te, köşe 0.
- Konsol hatası 0, 404 yok.
  - Bir ölçüm turunda 4 bayrak SVG'si `ERR_CONNECTION_RESET` verdi. Paralel yük altındaki tek iş parçacıklı `http.server`'dan; dosyalar mevcut ve 200 dönüyor. Sonraki turlarda tekrarlanmadı. Sunucu yeniden başlatılmadı.

### Ekran görüntüleri (`docs/screenshots/liste-v2/d/`)

- `tema-karsilastirma-chromium.png`, `tema-karsilastirma-webkit.png`: Kategoriler (Tümü / Tatlı / Balık) ve Dünya Mutfakları (Tümü / Türk / Meksika) tek görselde yan yana.
- `tema-{kategori-tumu|kategori-tatli|kategori-balik|mutfak-tumu|mutfak-turk|mutfak-meksika}-{chromium|webkit}.png`: 390, tek tek.
- `panel-kose-once-yapisma-{chromium|webkit}.png`, `panel-kose-yapisik-{chromium|webkit}.png`
- `avatar-once-sonra.png`: kart / satır / slider × önce (11) / sonra (13), 4×; tek tek `avatar-*-once|sonra.png`.

**Dosyalar:**
- Değişen: `liste-v2.js`, `liste-v2.css`, `liste-v2.html`, `ortak-kart.css`.
- Eklenen: `docs/liste-v2/d-qa.mjs`, `d-qa.json`, `cache-bust.mjs`.
- Önceki hâl: `docs/liste-v2/d-once/`.

## Yerel link ve seçenekler

http://127.0.0.1:8765/v3-app/liste-v2.html?siralama=a&gosterge=a&radius=a&rozet=a

| Parametre | a (varsayılan) | b |
|---|---|---|
| `siralama` | Sonuç satırında yalnız ikonlu sıralama düğmesi | İkon + kısa ad ("Önerilen", "En yeni"…); sonuç sayısı görselde "N tarif" |
| `gosterge` | Slider noktaları (etkin nokta uzun, primary) | "2 / 5" sayacı |
| `radius` | Tarif kartı 16 (rozet/kaydet 8) | Tarif kartı 20 (rozet/kaydet 12) |
| `rozet` | Yumuşak koyu cam (#211E16 %64 + bulanıklık) | Nötr koyu cam (siyah %56 + bulanıklık) |

Tema & pişirme tipi için parametre yok: Dünya Mutfakları sekmesinde bölüm gizli, Kategoriler'de sonucu 0 olan temalar gizli (bölüm 16).
