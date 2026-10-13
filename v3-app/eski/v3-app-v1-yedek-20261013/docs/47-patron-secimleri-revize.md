# 47 — Patron seçimleri + revize (P0–P6)

11 Ekim 2026. Yalnız yerel; git ve yayın yok. Yazılan dosyalar: `ana-v3.*`, `liste-v2.*`, `detay-v2.*`, `ortak-kart.*`, yeni `onizleme-v3.html`, `docs/47/` ve bu rapor. `ortak-menu.*` ve `ortak-baslik.css` değişmedi (gerek olmadı). `tokens.css`, `app.css`, `AGENTS.md` ve `yayin/` değişmedi (SHA-256 önce/sonra aynı: `docs/47/korunan-once.sha`, `docs/47/yayin-once.sha`). Değişen dosyaların bu tur öncesi kopyası: `docs/47/once/` (+ `SHA256SUMS`). Üç ekranın `?v=` önbellek kırıcıları yenilendi (`docs/liste-v2/cache-bust.mjs`).

## P0 · Seçimler sabitlendi, alternatifler kaldırıldı

| Ekran | Sabit tasarım (tek ve varsayılan) | Kaldırılan |
|---|---|---|
| Ana sayfa | Gösterge noktalar (etkin uzun, primary), kart köşesi 16, rozet a ailesi | `?gosterge` okuma kodu, "2 / 5" sayaç işaretlemesi ve `.v3-pager-count` CSS'i, `data-v3-gosterge` |
| Liste | Sıralama yalnız ikon (44×44), gösterge noktalar, kart köşesi 16 | `?siralama=b` (ikon + kısa ad) dalı, `SORT_SHORT`, `lv2-sort-button--a/--b`, `data-siralama`, " bulundu"yu gizleyen kural |
| Detay | Şef kartı 2 = eski `?yazar=b` | a, c, d şablonları, `AUTHOR_VARIANT`, `data-dv2-yazar`; CSS'te `.dv2-chef-a/-c/-d`, `.dv2-x-head/-split/-follow-*/-sub-*`, `.dv2-chef-copy/-stats`, `.dv2-stat` |
| Ortak kart | Köşe 16 tek token | `?radius/?rozet/?gosterge` okuma, `<html data-dg-*>`, `[data-dg-radius=b]`, `[data-dg-rozet=b]`, cam token'ları (`--dg-pair-bg/-line/-filter/-fallback`, `--dg-glass-dark`, `--dg-pair-r`, `--dg-pager-r`), `.dg-pager-count`, `DGCard.options` |

- Eski linkler: parametreler yok sayılır. `detay-v2.html?yazar=c&radius=b`, `…?yazar=d&radius=b&rozet=b&gosterge=b&siralama=b&not=a`, `liste-v2.html?siralama=b&gosterge=b&radius=b&rozet=b`, `ana-v3.html?gosterge=b&radius=b&rozet=b&yazar=b` iki motorda × üç genişlikte hatasız ve sabit tasarımla açıldı (24/24).
- Kaldırılan parametreler yeni bağlantılara taşınmaz: ekranlar arası taşıma (`DGCard.carry`) artık yalnız `?giris`; detayın benzer tarif bağlantıları eski parametreleri düşürür; liste adresi yeniden yazılırken yalnız `giris` korunur.
- İşlevsel parametreler aynen çalışır: `?tarif`, `?sekme`, `?giris`, `donus`, `?gorunum`, `?sirala`, `?kategori`, `?mutfak[]`, `?malzeme`.

## P1 · Detay: şef kartı ve bilgi kutuları Besin Değerleri'nin altında

Yeni sıra (DOM'dan doğrulandı, 6/6): çubuğun üstü `özet · mutfak/özellikler · açıklama`; altı `sekme içeriği → Besin Değerleri → şef kartı → Hatırlatma/Alerjen şeridi → Tarif bilgileri → Benzer Tarifler`. Bölüm aralığı ortak kuyruktaki 32px; şerit kenardan kenara kaymaya devam ediyor.

Sekme yapışması ve geçiş kaydırması (`docs/47/qa.json`, `measures.*.P1once/P1sonra`; önce = yedek dosyalara yönlendirilerek):

| | Çapa (yapışma yeri, scrollY) | Serbest geçiş (önce → sonra) | Yapışık geçiş (+700 → çapa) | Çubuk–header | Panel–çubuk |
|---|---:|---|---|---:|---:|
| Chromium 360 önce / sonra | 1024 / 598 | 724→724 / 297→297 | 1724→1024 / 1297→598 | 0 / 0 | −0,28 / −0,88 |
| Chromium 390 önce / sonra | 1024 / 598 | 724→724 / 297→297 | 1724→1024 / 1297→598 | 0 / 0 | −0,28 / −0,88 |
| Chromium 430 önce / sonra | 971 / 563 | 671→671 / 262→262 | 1671→971 / 1262→563 | 0 / 0 | −0,47 / −0,88 |
| WebKit 390 önce / sonra | 1025 / 598 | 724→724 / 297→297 | 1724→1025 / 1297→598 | 0 / 0 | −0,55 / −0,02 |

Üç sekmenin (Hazırlanış, Yorumlar, Malzemeler) hepsinde aynı; iki motor × üç genişlik, 54/54. Davranış değişmedi; sekme çubuğu yalnız şef kartı ve şerit aşağı indiği için ~426px daha erken yapışıyor (alt-piksel fark ≤ 1px).

## P2 · Ana sayfa: dışa açılan "tarife git" düğmesi kalktı

- DOM taraması: ana sayfada kalan tek kullanım hero'ydu (5 slayt + döngü kopyası = 6 düğme). Diğer kartlarda, Ne Pişirsem panelinde ve Dolapta Ne Var sonuçlarında yoktu; şimdi her yerde 0.
- Slaydın tamamı tarife gider: fotoğrafı kaplayan, yalnız işaretçi için bağlantı (`tabindex=-1`, `aria-hidden`); erişilebilir ad metin bağlantısında aynen (içeriği: "Bugün deneyebilirsin · N dk", tarif adı, "Tarifi ekleyen: …"). Fotoğraf ortasına dokunma = tarif bağlantısı; başlık ve arama kendi hedefleri olarak üstte kalır (6/6).
- Boşluk: bilgi bağlantısı artık hero bilgi alanının tam genişliğinde (sağ kenar farkı 0px); sola hizalı metin yerinde.

## P3 · Dünya Mutfakları: çıplak bayrak + küçük sayı

- Ana sayfa: kutu, iç çerçeve ve zemin kalktı; bayrak 64px genişlik, 4:3, köşesi kontrol ölçeğinde (`--radius-choice`, 4px). Altında ad (en çok 2 satır), hemen altında sayı: etiket ölçeği 11px, sönük `--slate-2`, adla arası 4px. Tümü sheet'indeki bayrak yuvasının zemini de kalktı.
- Eşit yükseklik: Dünya öğesi Kategoriler öğesinin doğal yüksekliğine aynı token'lardan eşitlendi (medya + 8 + iki ad satırı); bayrak yuvası kalan alanı alır. Paneller 164.390625 / 164.390625px, sekme değişince bölüm yüksekliği ve sonraki bölümün konumu **0px** fark (iki motor × üç genişlik). İlk denemede 1/64px (alt-piksel yuvarlama) fark ölçüldü, bu kurguyla kapandı.
- Liste: Dünya Mutfakları çiplerindeki bayrağın ince çerçevesi ve yuva zemini kalktı. Liste şeridinde tarif sayısı zaten yok (yalnız ad); küçültülecek metin olmadığı için değişmedi. Kategoriler / Dünya şeritleri 44 / 44px (0px).
- Not: beyaz zeminli bayraklar (Japonya, Kore, Kanada…) çerçevesiz beyaz yüzeyde kenarını kaybeder; ilk 16'da yok, tam listede ve liste şeridinde var. İstenirse 1px kenar tek satırla geri gelir.

## P4 · Görsel üstü rozetler: koyu kutu yerine üstte yumuşak geçiş

> **Sonraki EK ile güncellendi** (aşağıda “EK 1 + EK 2”): üst geçiş daraldı, alt geçiş metin konumuna bağlandı, yıldız/puan kalktı. Bu bölüm P4 anının kaydıdır.

Tek bileşen `ortak-kart.css`: `.dg-card__media`, `.dg-feature__media`, `.dg-tile__media` ve video kapağı (`.dg-veil-top`) `::after` ile aynı üst geçişi alır. Süre/puan (`.dg-meta`) ve kaydet/oynat zeminsiz, beyaz, çok hafif gölge (`--photo-text-shadow`). Kaydet 44×44 dokunma alanı; kaydedilince ikon primary (#E14827), zemin yok. Konum ve ölçü önceki gibi (8px kenar, 32px satır).

Eğri: kaynak koyu `--overlay` (#211E16), kahverengi karışım yok. Süre/puan satırı (8 + 32px) boyunca kenar opaklığında sabit, sonra f(t) = (1 − t²)² ile sıfıra (iki uçta eğim sıfır, 9 durak, bant yok). Yükseklik görselin %33'ü, kısa görselde (satır kartı) en az satır + 48px.

**Kenar opaklığı %45 değil %64** (beklenmedik bulgu değil, talimattaki "bir kademe artır" kuralı): %45'te 75 tekil ölçümün 47'si 4,5:1'in altında kaldı (en düşük 2,81). %60 düz beyaz pikselde 4,45'e düşer. %64'te hepsi geçer.

Kontrast (metin ve gölgesi saydam, metin kutusunun arkasındaki **en açık** piksele göre; 32 tarifin tamamı liste 4 sayfa ızgara + satır, öne çıkan slider'lar, ana sayfa küçük kartlar ve videolar, detayda 3 tarifin benzerleri; 199 ölçüm, 75 tekil):

| Yüzey | Açık fotoğraf (en kötü) Chromium / WebKit | Koyu fotoğraf (en iyi örnek) |
|---|---:|---:|
| Ana · öne çıkan | 6,34 / 6,33 | — |
| Ana · küçük kart | 5,31 / 5,32 | — |
| Ana · video | 5,02 / 5,02 | — |
| Liste · öne çıkan | — | 13,89 / 13,75 (Tavuk Curry) |
| Liste · ızgara | 5,02 / 5,02 (Sagdana; neredeyse beyaz zemin) | — |
| Liste · satır | 5,02 / 5,02 | — |
| Detay · benzer | 5,83 / 5,91 | — |
| **Tümü** | **en düşük 5,02, 4,5 altı 0** (iki motor) | |

Ham veri: `docs/47/kontrast-{chromium,webkit}-css.json`, deneme `kontrast-chromium-.45.json`, `-.64.json`; betik `docs/47/kontrast.mjs`. En kötü değer 5,02 = beyaz fotoğraf pikselinin %64 geçiş altındaki hâli; yani bu kart ailesinde hangi fotoğraf gelirse gelsin süre/puan ≥ 4,5:1.

Önce/sonra (390, 3×): `docs/screenshots/patron-secimleri/p4-once-sonra.png` — ana öne çıkan, ana küçük kart, video, liste ızgara açık (Karabuğday Levrek) ve koyu (Enfrijoladas), liste satır, detay benzer. Tek tek: `p4/once-*.png`, `p4/sonra-*.png`.

Dokunulmayanlar: kategori kartındaki "N tarif" kapsülü ve detay hero'sundaki puan/maliyet/görüntülenme hapları (talimattaki listede değildi).

## P5 · Küçük ortak düzeltmeler

- "1/ 3" sayacı: P0 ile sayaç gösterimi tamamen kalktı (seçilen gösterge noktalar); hatalı işaretleme kodda yok. Görünür metinde `\d/ \d` 0.
- Öne çıkan kart bağlantısı: `ortak-kart.css`'te `.dg-feature .dg-card__text{min-height:44px}`; listede 42,3 → 44, ana sayfadaki yerel düzeltme kaldırıldı (18/18 ≥ 44).
- app.css `.recipe-card .save::before`: `ortak-kart.css`'te `.recipe-card .save.dg-save::before{content:none}` (0,3,1 > 0,2,1); kaydet seçicileri `.save.dg-save` olarak güçlendi, kayıtlı renk de `.recipe-card` içinde primary. Ana sayfadaki eski yerel nötrleyici silindi. (Şu an üç ekranda `.recipe-card` içinde kaydet yok: 0; kural önlem.)

## P6 · Yerel önizleme

`onizleme-v3.html`: masaüstünde üç telefon yan yana ("1. Ana Sayfa · 2. Tarif Listesi · 3. Tarif Detay"), her biri 390×844 parametresiz iframe, altlarında "Tam ekran aç". Seçenek satırı yok. Dar ekranda (≤900px) üç sekme, seçilen ekran tek.
- Çerçeveler sırayla yüklenir: yerel Python sunucusu üç ekranın aynı anda istediği ~150 dosyada bağlantı düşürüp (`ERR_CONNECTION_RESET`) ana sayfa betiklerinden birini yükleyemedi; sıralı yüklemeyle tekrar etmedi.
- Bulunan ve düzeltilen hata: gizli çerçevede liste ekranı `offsetParent` null hatası veriyordu (`liste-v2.js` ölçümü artık görünür olunca yapılır); pasif sekmeler yerleşimde kalıp görünmez.
- Kontrol (iki motor, 1440 ve 390): çerçeveler 390×844 ve parametresiz, taşma yok, hata yok, iç kod yok; çerçeve içinde ana sayfa kartı → detay, ana sayfa Tümü → liste, liste kartı → detay, benzer tarif → detay (sayfa önizlemede kalıyor).

## Kontrol özeti

`docs/47/qa.mjs` → `docs/47/qa.json`: Chromium + WebKit × 360/390/430, **54 kontrol türü, 474 ölçüm, hepsi geçti**. Ek olarak: konsol hatası ve 4xx yok (üç ekran, eski linkler, önizleme); yatay taşma yok; `fa-regular` 0; görünür metinde iç kod 0. Sağ menü: satırlar, sıra ve etiketler üç ekranda birebir aynı; bilinçli fark ana sayfada Ne Pişirsem / Dolapta Ne Var / Püf Noktaları'nın sayfa içi eylem olması (diğer ekranlarda `ana-v3.html#…`), docs/46'daki karar. Yeni CSS'te elle piksel yok (odak/etkin halkalar `calc(var(--border-width) * 2)`).

Not: ölçüm betikleri, yerel sunucunun bağlantı kuyruğu için önceki turların `verification/set3/http-queue.mjs` kuyruğunu kullanır.

## Ekran görüntüleri (`v3-app/docs/screenshots/patron-secimleri/`)

- Tam sayfa: `tam/{chromium,webkit}-{360,390,430}-{ana-v3,liste-v2,detay-v2}.png` (18)
- P4 önce/sonra: `p4-once-sonra.png`, `p4/`
- Önizleme: `onizleme-{chromium,webkit}-{1440,390}.png`

## EK 1 + EK 2 · Kart bilgisi, iki kenarlı geçiş, orta temiz

> **Geçiş değerleri EK 3 ile değişti** (aşağıda): %62 / %64–70 yerine üstte %35, altta %60 + yumuşak gölge. Bu bölüm EK 2 anının kaydıdır.

İki EK kuyruğa alındı ve ana iş bittikten sonra sırayla uygulandı; EK 2'nin geçiş kuralı EK 1'in 4. maddesinin yerine geçti. EK öncesi kopya: `docs/47/ek-once/`. Git ve yayın yok; `tokens.css`, `app.css`, `AGENTS.md`, `yayin/` yine değişmedi.

**Kart görsel üstü bilgisi** (`ortak-kart.js` / `.css`; ana sayfa, liste, öne çıkan slider, Dolapta Ne Var sonuçları, detay benzer tarifler aynı bileşen):
- Yıldız ve puan kartlardan kalktı (detay sayfasındaki puan duruyor). Görsel üstünde yalnız süre (`fa-clock` + "55 dk") ve görüntülenme (`fa-eye` + sayı); GilroyBd 700, 13px, beyaz, ikonlar metin renginde ve satırda ortalı, ikisi arasında 12px.
- Görüntülenme gerçek veri: `views` (prototip verisi, canlı tarif sayfasından alınmış görüntülenme). 32 yerel tarifin 31'inde var; 0 ya da boşsa (Sardalya'da veri yok; birçok tarifte 0) çizilmez, uydurma sayı yok. Kısaltma: 950 → "950", 1.234 → "1,2 B", 3.400.000 → "3,4 Mn". Yerel verideki en büyük değer 172 olduğu için kartlarda kısaltma şu an görünmüyor; videolarda kaynak zaten "1,2 Mn", "524 B".
- Videolar: süre aynı kalın stil + saat ikonu; izlenme (`fa-eye` + "1,2 Mn izlenme") kalın, beyaz (önce %78 beyaz, ince).
- Detay hero hapları: zemin, kenar ve bulanıklık yok; ikon + kalın metin doğrudan geçişin üstünde, aralık 16px. Puan ve maliyet hapı duruyor (hero kart değil).
- Ana sayfa kategori kartları: fotoğraf üstündeki kutulu "345 tarif" etiketi kalktı; sayı adın altında, Dünya Mutfakları ile aynı küçük ve sönük satır. İki sekme yine aynı yapı (medya + 8 + metin bloğu) ile eşit yükseklikte (QA 0px).

**Geçiş kuralı** (tek tanım: `ortak-kart.css` token'ları + `ortak-kart.js` `DGCard.veils/veilCurve/textTop`; kartlar, video kapakları ve iki hero bunu okur):

| | Hedef (EK 2) | Uygulanan | Not |
|---|---|---|---|
| Üst geçiş yeri | Yalnız süre/görüntülenme/kaydet arkası | Metin satırı boyunca sabit (8 + 24px), sonra 16px'te (1 − t²)² ile 0 | 9 durak, iki uçta eğim sıfır |
| Üst yükseklik | ≤ %25 | max(%25, 48px) | Satır kartında (152px kare) 48px = %31,6; diğer kartlarda ≤ %25 |
| Üst opaklık | ≤ ~%40 | **%62** | %40'ta açık fotoğrafta en çok 2,46:1 (beyaz piksel sınırı); %60 → 4,49; 4,5 için gereken en düşük kademe %62 (“son çare” maddesi) |
| Alt başlangıç | Metnin ≤ ~24px üstü | Gerçek ilk metin satırının **16px** üstü | Önce kapsayıcının iç boşluğundan ölçülüyordu (12–16px yukarı kayma); düzeltildi |
| Alt opaklık | En altta ≤ ~%70 | Metinde %64 → en altta %70 | %60'ta en düşük 4,41 |
| Orta | Temiz | İki geçiş arası overlay yok | Bant ölçümü aşağıda |
| Renk/eğri | #211E16, tek sürekli | `--overlay`, smoothstep, bant yok | Kahverengi karışım yok |

Hero'lar aynı mantıkta: ana sayfa üstte başlık bölgesi (%45, büyük başlık ≥ 3:1) arama kutusunun altında sıfır, altta ortak eğri; detay üstte yalnız header boyunca %40 ve 16px'te sıfır, altta ortak eğri. Okunurluk için önce kalınlık ve mevcut çok hafif gölge (`--photo-text-shadow`) kullanıldı; kontrast ölçümünde gölge sayılmadı.

**Otomatik kontrol** (`docs/47/ek-olcum.mjs` → `ek-olcum-{chromium,webkit}-sonra.json`). Bütün yerel tarifler × bütün görsel üstü kart türleri: kartlar gerçek bileşenle ve gerçek fotoğraflarla sayfanın kendi bağlamında çizildi (ana sayfa 32 × 3 tür, liste 32 × 3 tür, detay 62 benzer kartı); video (6), ana hero (5 slayt) ve detay hero (62 tarif) gerçek hâliyle. Motor başına 327 görsel, 1.365 metin. (a) Görselin %45–55 bandının ortalama parlaklığı, geçişler kapalı (orijinal) hâle göre. (b) Metin ve gölgesi saydam, kutusunun arkasındaki en açık piksele karşı beyaz; küçük metin ≥ 4,5, büyük başlık ≥ 3.

| Tür | Kart | Üst metin en düşük (Chr / WK) | Alt metin en düşük (Chr / WK) | Geçmeyen | Orta bant düşüş en çok / ort. (Chr) | > %10 |
|---|---:|---|---|---:|---|---:|
| Ana · küçük kart (2:3) | 32 | 4,74 / 4,70 | 5,23 / 5,08 | 0 | %0 / %0 | 0 |
| Ana · öne çıkan (4:3) | 32 | 4,67 / 4,67 | 5,02 / 4,81 | 0 | %2,8 / %0,2 | 0 |
| Ana · Dolapta Ne Var sonucu (4:5) | 32 | 4,74 / 4,68 | 5,09 / 5,02 | 0 | %0 / %0 | 0 |
| Ana · video | 6 | 4,67 / 4,67 | 5,02 / 4,88 | 0 | %0 / %0 | 0 |
| Ana · hero slider | 5 | 3,36 / 3,31 (büyük başlık, ≥ 3) | 6,50 / 6,58 | 0 | %0 / %0 | 0 |
| Liste · ızgara (4:5) | 32 | 4,74 / 4,69 | — (metin görselin altında) | 0 | %0 / %0 | 0 |
| Liste · satır (kare) | 32 | 4,67 / 4,67 | — | 0 | %0 / %0 | 0 |
| Liste · öne çıkan (4:3) | 32 | 4,67 / 4,67 | 5,02 / 4,81 | 0 | %2,8 / %0,2 | 0 |
| Detay · benzer (2:3) | 62 | 4,67 / 4,67 | 5,09 / 4,86 | 0 | %0 / %0 | 0 |
| Detay · hero | 62 | — | 5,02 / 4,74 | 0 | %0 / %0 | 0 |

Ara ölçümlerde geçmeyenler bulundu ve düzeltildi: %40 üst geçişte 277 metin (tüm türlerde açık fotoğraflar), detay ve ana hero'da geçiş değişkeninin yanlış öğeden okunması (gradient hiç çizilmiyordu), 2:3 kartlarda ve videoda orta bant %10–18 (alt geçiş iç boşluklu kapsayıcıdan başlıyordu). Son hâlde iki motorda geçmeyen 0, bant aşımı 0.

Açık ve koyu fotoğraf örnekleri: açık = Karabuğday Levrek, Tarte de Amêndoa, Ördek Dolması, Mercimekli Yaprak Sarma (hero); koyu = Enfrijoladas, Semizotlu Yumurta, Tavuk Curry, Sardalya (hero). En düşük değerler hep açık fotoğrafların neredeyse beyaz bölgelerinde.

**Önce/sonra** (390, 2×; önce = EK öncesi hâl): `docs/screenshots/patron-secimleri/ek-once-sonra-chromium.png`, `ek-once-sonra-webkit.png` — ana hero, öne çıkan (açık), küçük kart (açık/koyu), kategori kartları, video, Dolapta Ne Var sonucu, liste öne çıkan (koyu), ızgara (açık/koyu), satır, detay benzer, detay hero (açık/koyu). Tek tek: `ek/`.

**Regresyon** (`docs/47/qa.mjs`, Chromium + WebKit × 360/390/430): 58 kontrol türü, 570 ölçüm, hepsi geçti. Ek kontroller: kartlarda yıldız/puan 0; süre/görüntülenme GilroyBd 700, saat + göz ikonu; görüntülenme biçimi (0 ve yok çizilmez); kategori kartında kutulu etiket 0. P0–P6 kontrolleri (eski linkler, sekme yapışması, eşit yükseklik, önizleme gezinmesi, menü, hata/404 yok) yeniden geçti; 18 tam sayfa görüntüsü güncellendi.

**Karar bekleyen / bilinmesi gerekenler**
1. Üst geçiş %62: EK 2'deki “en üstte en fazla ~%40” ile “küçük metin ≥ 4,5:1 (en açık piksel)” açık fotoğraflarda birlikte sağlanamıyor (beyaz piksel üstünde %40 → en çok ~2,5:1). Talimattaki “overlay'i büyütmek son çare” maddesiyle yalnız süre/görüntülenme satırının arkasında (ilk 32px) %62'ye çıkıldı; satırın altında 16px'te sıfırlanıyor. %40 istenirse tek token (`--dg-veil-top-a`); o zaman açık fotoğraflı kartların çoğu 4,5'in altında kalır.
2. Satır görünümü kartında üst geçiş görselin %31,6'sı (152px karede satır + rampa 48px); %25'e sığdırmak rampayı 0'a indirir (sert kenar).
3. Detay hero'daki maliyet hapında (“₺₺₺”) seçili olmayan simgeler kasıtlı olarak sönük (%45 beyaz); ölçek göstergesi, anlamı erişilebilir adda.

## EK 3 · Yumuşak geçiş, daha açık tepe, kaydet halesi

EK 3 öncesi kopya: `docs/47/ek3-once/`. Git ve yayın yok; `tokens.css`, `app.css`, `AGENTS.md`, `yayin/` değişmedi.

**Geçiş — tek tanım** (`ortak-kart.css` token'ları + `ortak-kart.js` `DGCard.edgeTop / edgeBottom / gradient / veils`; kartlar, video kapakları, ana sayfa hero'su, detay hero'su ve benzer tarifler aynı eğriyi kullanır):
- Eğri smootherstep s(t) = 6t⁵ − 15t⁴ + 10t³: iki uçta eğim ve eğrilik sıfır, koyuluk fark edilmeden başlar ve biter. Üst geçiş CSS'te 9 durak; alt geçiş ve hero'lar 4px'te bir durak (doğrusal iki durak yok).
- Üst: kenarda **%35**, görselin %32'si (en az 64px) boyunca 1 − s(t) ile sıfır. Önce: %62 sabit satır + 16px'te sıfır.
- Alt: ilk metin satırının **40px** üstünde 0, satırın 32px altında **%60**, sonra sabit. Önce: 16px'te %64, altta %70. Başlangıç mesafesi uzadı (16 → 40px + 32px). 48px denendi; 4:3 kartta orta bant %11'e çıktığı için 40px.
- Ana sayfa hero'su: üstte header + başlık arkasında %35, arama kutusunun altında sıfır; detay hero'su: üstte header + 48px; altta aynı alt eğri.
- Metin gölgesi (`--dg-photo-shadow`): `0 1px 2px` %50 + `0 0 8px` %45, #211E16 tabanlı, yumuşak; kartlar, video, iki hero ve detay hapları. Geçiş koyulaştırılmadı.

**Kaydet ikonu:** iki durumda aynı hale (`--dg-icon-halo`: 8px bulanık #211E16 %35 + 0 1px 2px %50; kutu, çerçeve, sert daire yok). Kaydedilmiş hâlde turuncu (#E14827, renk aynı) ikonun çevresinde ince beyaz kontur (`-webkit-text-stroke` 2px, `paint-order: stroke fill` → dışta görünen 1px). Konum, ölçü ve 44px alan değişmedi; durum değişince zıplama yok. Oynat ikonu aynı haleyi alır.
- **Seçim: B (hale + beyaz kontur).** Gerekçe: A'da (yalnız hale) turuncu ikonun çevresindeki pikseller fotoğrafa göre değişiyor. Turuncuya yakın yemek tonlarında (kızarmış yüzey, domates, ahşap) ikonun 0,5–2 css px çevresinde turuncuyla neredeyse aynı parlaklıkta piksel kalıyor; en kötü kontrast **1,0:1**, iki motorda bütün kart türlerinde. B'de turuncunun komşusu her fotoğrafta beyaz: **4,07:1** (≥ 3:1 grafik eşiği), konturun dışında hale fotoğrafı yumuşatıyor.

**Ölçüm** (`docs/47/ek3-olcum.mjs` → `ek3-olcum-{chromium,webkit}.json`): bütün yerel tarifler × bütün görsel üstü kart türleri + 6 video + ana hero (5) + detay hero (62); motor başına 323 görsel, 1.365 metin, 2× çözünürlük. İki kontrast ölçüsü:
- **Katı:** metin ve gölgesi saydam, metin kutusundaki en açık piksel (önceki turların ve kanonun yöntemi).
- **Gölgeli:** gölge görünür, glifin 0,5–1,5 css px çevresindeki en açık piksel (gölgenin katkısı).

| Tür (Chromium / WebKit) | Üst katı | Üst gölgeli | Alt katı | Alt gölgeli | Orta bant düşüş en çok | Kaydet A / B |
|---|---|---|---|---|---|---|
| Ana · küçük kart (2:3) | 1,75 / 1,75 | 1,99 / 1,94 | 2,27 / 2,28 | 2,73 / 2,70 | %3,3 / %3,4 | 1,0 / 4,07 |
| Ana · öne çıkan (4:3) | 1,72 / 1,73 | 2,02 / 1,99 | 2,19 / 2,21 | 2,38 / 2,44 | %7,1 / %7,2 | 1,0 / 4,07 |
| Ana · Dolapta Ne Var (4:5) | 1,82 / 1,82 | 2,15 / 2,05 | 2,31 / 2,31 | 2,75 / 2,62 | %0,1 / %0,1 | 1,0 / 4,07 |
| Ana · video | 1,60 / 1,65 | 1,89 / 1,87 | 2,19 / 2,12 | 2,77 / 2,62 | %3,0 / %3,2 | — |
| Ana · hero slider | 1,45 / 1,45 (büyük, ≥ 3) | 2,75 / 2,62 | 3,64 / 3,59 | 4,42 / 4,31 | %0 / %0 | — |
| Liste · ızgara (4:5) | 1,54 / 1,56 | 1,94 / 1,86 | — | — | %0 / %0 | 1,0 / 4,07 |
| Liste · satır (kare) | 1,49 / 1,53 | 2,01 / 1,88 | — | — | %0 / %0 | 1,0 / 4,07 |
| Liste · öne çıkan (4:3) | 1,72 / 1,74 | 2,02 / 1,99 | 2,23 / 2,17 | 2,38 / 2,38 | %7,5 / %6,8 | 1,0 / 4,07 |
| Detay · benzer (2:3) | 1,75 / 1,76 | 2,01 / 1,96 | 2,31 / 2,19 | 2,44 / 2,63 | %3,9 / %3,5 | 1,0 / 4,07 |
| Detay · hero | — | — | 2,24 / 2,22 | 2,38 / 2,30 | %0 / %0 | — |

Değerler her türün **en kötü** kartıdır (açık fotoğraflar: Tarte de Amêndoa, Karabuğday Levrek, Sagdana, Mercimekli Yaprak Sarma hero'su). Koyu fotoğraflarda (Semizotlu Yumurta, Tavuk Curry, Enfrijoladas, Sardalya) değerler 4,5'in üstünde.

- Orta bant: bütün kartlarda en çok %7,5; %10'u aşan **0**.
- Kontrast (4,5; büyük başlık 3): gölgeli ölçüde Chromium 1.365 metinden **477**, WebKit **487** metin geçmiyor (en az bir metni geçmeyen kart 282 / 285). Katı ölçüde 664 / 667.

**Karar gerekiyor: %35 / %60 tavanı ile küçük metinde 4,5:1 birlikte sağlanamıyor.** Beyaz piksel üstünde %35 koyu geçişle beyaz metin en çok ~2,2:1, %60'ta ~4,0:1 olur; gölge bunu ancak 0,3–0,8 artırıyor. Denenen gölgeler (overlay sabit, 4 tarif × bütün türler): talimattaki `0 1px 2px %50` → üst 1,76 / alt 2,49; + `0 0 8px %45` (uygulanan) → 1,89 / 2,66; 3 katmanlı güçlü hale → 2,03 / 2,66. Bu kez tavanlar aşılmadı, çünkü talimat “overlay'i koyulaştırma” diyor. Seçenekler:
1. Bu hâli kabul etmek (görünüm öncelikli; açık fotoğraflarda küçük metin 4,5:1'in altında).
2. Yalnız metin satırlarının arkasında geçişi yükseltmek (EK 2'deki gibi üst %62, alt %64: 4,5:1 geçer, kart üst/alt kenarı daha koyu).
3. Süre/görüntülenmeyi görselin altına (kart gövdesine) almak; yalnız kartın altında metni olan liste ızgara/satır için uygulanabilir.

Değerler tek token'dır (`--dg-veil-top-a`, `--dg-veil-end-a`, `--dg-photo-shadow`).

**Yakın çekim** (390, 3×; önce / sonra; kaydedilmemiş / kaydedilmiş A / B; açık Tarte de Amêndoa, koyu Semizotlu Yumurta): `docs/screenshots/patron-secimleri/ek3-yakin-chromium.png`, `ek3-yakin-webkit.png`; tek tek `ek3/`.

**Regresyon** (`docs/47/qa.mjs`, iki motor × 360/390/430): 58 kontrol türü, 570 ölçüm. Bir koşuda Chromium 390'da ana sayfanın kaynak hero görseli (`dadagastro.com/…/hero/….webp`) yüklenirken `ERR_ABORTED` ile iptal edildi: x6 sahnesi o görseli DOM'dan kaldırıyor. 404 ya da konsol hatası değil; aynı sayfa üç kez yeniden açıldığında 0 hata. Diğer 569 ölçüm geçti.

http://127.0.0.1:8765/v3-app/onizleme-v3.html
http://127.0.0.1:8765/v3-app/ana-v3.html
http://127.0.0.1:8765/v3-app/liste-v2.html
http://127.0.0.1:8765/v3-app/detay-v2.html
