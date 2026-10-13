# 50 — Kanon (tek kaynak)

12 Ekim 2026 · Faz 1 araştırma. Kaynak: üç kök ekran `ana-v3.html`, `liste-v2.html`, `detay-v2.html` ve yükledikleri CSS/JS. Bu turda tasarım ve kod dosyası değişmedi; yalnız rapor yazıldı (+ istenen `ortak/tokens.json`). Git ve yayın işlemi yapılmadı.

**Yöntem.** Değerler önce dosyalardan okundu (`tokens.css`, `ortak-kart.css/js`, `ortak-menu.css/js`, `ortak-baslik.css`, `hero-light.css`, sayfa CSS'leri). Ardından Chromium 390×844'te 15 durumun hesaplanan stilleri ölçüldü:
- ana sayfa, menü açık, orta panel;
- liste, filtre sheet'i, sıralama sheet'i, boş sonuç, yükleniyor;
- detayda Malzemeler / Hazırlanış / Yorumlar, Paylaş sheet'i, pişirme modu;
- misafirin Kaydet ve Ben de Yaptım eylemleri.

Bu durumlarda 2.088 metin öğesi, 1.000+ ikon, radius, gölge, boşluk ve dokunma hedefi tarandı; JS hatası 0. Ham çıktı Faz 2'ye kadar scratchpad'dedir: `kanon-audit.json`, `probe.json`. Ölçüm betiği Faz 2'de `ortak/denetim/` altına taşınacak (bkz. docs/53).

> Okuma kuralı: **Kanon** sütunu bundan sonra tek geçerli değerdir. **Ölçülen** sütunu üç ekranda bugün gerçekte çizilen değerdir. Farklıysa satır “Tutarsızlıklar” bölümüne de girer.

---

## 1. Renk

### 1.1 Marka ve nötr paleti (tokens.css'te tanımlı, ekranlarda ölçüldü)

| Token | Değer | Rol | Ölçüldüğü yer |
|---|---|---|---|
| `--tomato` | #E14827 | Primary dolgu, etkin gösterge, kaydedildi ikonu, orta düğme | fab, slider noktası, sayfalama, Tümünü Listeye Ekle |
| `--tomato-dark` | #C43D20 | Birincil düğme zemini, etkin sekme/alt menü metni | `.button`, Pişirmeye Başla, alt menü etkin, segment etkin |
| `--tomato-deep` | #A8331A | Küçük metinde primary (≥4,5:1): kart kategorisi, “Tümü →”, avatar harfi | 244 metin |
| `--tomato-tint` | #FBE9E3 | Etkin satır/chip zemini, ikon kutusu, Pro rozeti | menü etkin satır, chip, action-card ikon |
| `--dg-header-solid` | #DC3D17 | Solid header (canlı site + logo rengi, PANTONE 173 C) | üç ekranda solid header |
| `--ink` = `--overlay` = `--slate` | #211E16 | Ana metin, koyu overlay tabanı, hero zemini | 494 metin + bütün overlay'ler |
| `--slate-2` | #56514A | İkincil metin, pasif ikon | 604 metin |
| `--muted` | #6F6F6F | Sönük metin (yer tutucu, not) | 66 metin |
| `--line` | #ECECEC | Kenarlık, ayraç, iskelet, avatar zemini, segment zemini | 411 zemin |
| `--bg` | #F9F9F9 | Bölüm zemini (alterne), bilgi kartı, sheet ikon kutusu | 472 zemin |
| `--paper` | #FFFFFF | Panel, kart, sheet, alt menü | 451 zemin |
| `--green` | #3BB77E | Makro: yağ | besin çubuğu |
| `--yellow` | #FAC045 | Makro: karbonhidrat; puan yıldızı | besin, yıldız |
| `--hero-accent` | rgb(232,127,102) | Koyu zeminde primary vurgu (canlı `.hero-v h1 .accent`) | yalnız overlay/cam adaylarında |
| `--choice-border-color` | color-mix(muted 55%, paper) ≈ #B0B0B0 | Seçim kutusu kenarı | filtre, malzeme |

**Kanon:** Krem/bej yoktur. Kahverengi karışım yoktur; overlay yalnız `--overlay` (#211E16) ile kurulur. Marka rengi overlay'de kullanılmaz; vurgu ve primary ışıkta kullanılır.

### 1.2 Overlay ve primary ışık (tek tanım: `ortak-kart.css` + `ortak-kart.js`)

| Öğe | Kanon değeri | Kaynak |
|---|---|---|
| Overlay rengi | `--overlay` #211E16 | tokens.css; Laravel portal.css:948,957–961 |
| Eğri | smootherstep s(t)=6t⁵−15t⁴+10t³; uçlarda eğim ve eğrilik sıfır | `DGCard.edgeTop/edgeBottom/gradient` |
| Kart üst geçişi | Kenarda %35 (`--dg-veil-top-a`). max(%32, 64px) boyunca 1−s(t) ile sıfıra iner (9 durak). | `--dg-top-veil` |
| Kart alt geçişi | İlk metin satırının 40px üstünde 0 (`--dg-veil-lead`). Satırın 32px altında %60 (`--dg-veil-tail`, `--dg-veil-end-a`), sonra sabit. 4px'te bir durak. | `DGCard.veils` |
| Metin gölgesi | `0 1px 2px` overlay %50 + `0 0 8px` overlay %45 (`--dg-photo-shadow`) | kartlar, video, iki hero, detay hapları |
| İkon halesi | `0 0 8px` overlay %35 + `0 1px 2px` %50 (`--dg-icon-halo`); kaydedilmiş ikonda 2px beyaz kontur | kaydet, oynat |
| Primary ışık | tomato %25, radyal 0→%65, `screen` karışım, **sol üst** (0% 0%), yükseklik header + 3×48 | `hero-light.css` (`--home-light-*`); liste ve detay aynı değerleri kendi kodunda kullanır |
| Hero alt hilali | `box-shadow: 0 4px 0 var(--tomato)` + alt köşeler 24 | ana sayfa hero'su |
| Sheet scrim | overlay %55 (`--sheet-scrim`) | dialog::backdrop |

> Açık karar (docs/47 · EK 3): kartlarda %35 / %60 tavanıyla, açık fotoğrafta küçük metin 4,5:1'i sağlamıyor (en kötü ≈2,2:1). Kanon bugünkü değeri yazıyor; karar Beyar'da.

---

## 2. Tipografi

Font dosyaları yalnız şunlardır: `Gilroy` (Medium 500), `GilroyBd` ve `GilroyXB` (aynı ExtraBold dosyası, 700/800), `GilroyLt` (Light; kök ekranlarda kullanılmıyor). Semibold yoktur, sahte font üretilmez. Kalın metin ailesi her zaman `GilroyBd`'dir.

| Rol | Font / boyut / ağırlık / satır / tracking | Kanon kullanım | Ölçülen kullanım (390) |
|---|---|---|---|
| display | GilroyBd 32 / 700 / 1.08 / −0.035em | Yalnız iki hero başlığı | “Ne pişirsem?”, detay tarif adı ✓ |
| page | GilroyBd 24 / 700 / 1.15 / −0.025em | Sayfa banner başlığı, tam ekran mod başlığı | “Tarifler”, pişirme modu başlığı ✓ |
| section | GilroyBd 20 / 700 / 1.2 / −0.02em | Bölüm başlığı (`.dg-head h2`), boş durum başlığı | 69 öğe ✓ |
| featured | GilroyBd 20 / 700 / 1.2 / −0.02em | Öne çıkan kart başlığı, büyük kart, şef kartı adı | dg-feature ✓; hero slayt başlığı **20/700/1.12, tracking yok** ✗ |
| sheet | Gilroy 18 / 500 / 1.25 / −0.015em | Sheet başlığı | 4 sheet ✓ |
| subheading | Gilroy 16 / 500 / 1.3 / −0.01em | Akordeon başlığı, action-card başlığı, adım başlığı | ✓ |
| card | Gilroy 16 / 500 / 1.25 / −0.015em | Tarif kartı başlığı (en çok 2 satır + “…”) | 76 öğe ✓; video kartı başlığı **16/700/1.25** ✗; şef kartı adı **16/700/1.25, tracking yok** ✗ |
| body | Gilroy 15 / 500 / 1.5 / 0 | Paragraf, menü satırı, liste satırı | ✓ (ayrıca **1.4 / 1.55** varyantları ✗) |
| button | Gilroy 15 / 500 / 1.2 / 0 | Düğme etiketi | `.button` ✓; detay “Takip et” **GilroyBd 15/700** ✗ |
| meta | Gilroy 13 / 500 / 1.4 / 0 | Yazar, sayaç, chip etiketi, “Tümü →” | 699 öğe; satır **1.2 / 1.4 / 1.5 / 1.55** dört farklı ✗ |
| photo-meta | GilroyBd 13 / 700 / 1 | Görsel üstü süre / görüntülenme | `dg-meta` ✓ |
| label | Gilroy 11 / 500 / 1.3 / +0.06em, BÜYÜK HARF | Üst etiket (eyebrow), “ÖZELLİKLER”, bilgi kartı başlığı | ✓ |
| card-category | GilroyBd 11 / 700 / 1.3 | Tarif kartı kategorisi (Beyar kararı: kalın) | liste **tracking yok, lh 1.3**; ana/detay tile **+0.06em, lh 1.4** ✗ |
| nav | Gilroy 10 / 500 / 1.2 | Alt menü etiketi | ✓ |
| stat | GilroyBd 18 / 700 / 1.25 | Özet şeridi ve şef sayaç değeri | detay `dd` (rol token'ı yok) ✗ |
| numeral-xl | GilroyBd 48 / 700 / 1 (= display × 1,5) | Pişirme modu zamanlayıcısı | ✓ (rol token'ı yok) |

Ölçülen boyut dağılımı: 10 · 11 · 13 · 15 · 16 · 18 · 20 · 24 · 32 · 48. **12 ve 14 hiç yok**; ölçek temiz. Sorun boyutta değil; satır yüksekliği, tracking ve kalın/ince seçiminde.

**Kurallar**
- Aynı rol her yerde aynı dört değeri (boyut, ağırlık, satır, tracking) taşır. Satır yüksekliği yalnız rol token'ından gelir.
- Bölüm başlığı en çok 2 dengeli satır; eylem (“Tümü →”) küçülmez, ilk satırın taban çizgisinde durur (`.dg-head`).
- Paragraf: en az 4 render satırı olan gövde metni iki yana yaslıdır (`text-align-last:left`, `hyphens:auto`, `lang=tr`); 3 satır ve altı sola yaslıdır. Pişirme modu adım metni her zaman sola yaslıdır.
- ~~Başlık ve etiket justify edilmez~~ (13 Ekim'de iptal): **Bütün metinler justify, istisna yok; boşluk heceleme ve aralık ayarıyla çözülür.** Kaynaktaki `strong/b` korunur.

---

## 3. Spacing

| Token | Değer | Kanon rolü |
|---|---|---|
| `--space-4` | 4 | İkon↔metin (küçük), kategori→başlık, etiket→başlık |
| `--space-8` | 8 | İkon↔metin (varsayılan `--icon-text-gap`), chip aralığı, başlık→yazar, header hedefleri arası |
| `--space-12` | 12 | Kart aralığı (sütun), başlık↔eylem, sheet ikili düğme aralığı |
| `--space-16` | 16 | Kart iç boşluğu, başlık→içerik (`.dg-head` alt), panel ilk içerik üstü |
| `--space-20` | 20 | **Gutter**; ızgara satır aralığı |
| `--space-24` | 24 | Panel bindirmesi (`--panel-overlap`), banner metni→panel en az |
| `--space-32` | 32 | Bölüm arası (ana sayfa bölüm iç boşluğu üst/alt 32) |
| `--space-40` | 40 | Uzun bölüm arası, boş durum üstü |
| `--space-48` | 48 | Header alfa geçiş uzunluğu, iri bloklar |

- Ara değer yasak. Ölçümde ölçek dışı değerler: `icon-button` padding 1/6px (tarayıcı varsayılanı; görünür etkisi yok, sıfırlanmalı), `choice-shell` 0,25px, `ingredient-actions` −10,75px (dikey ortalama telafisi), alt boşluk hesapları 88/101/104 (bar + safe-area türetmesi; kural gereği kabul).
- **Bitişiklik yok:** komşu iki bileşen arasında en az 8px. Yatay şeritte ilk öğe gutter'da başlar, yalnız sağa taşar (`scroll-padding-left: gutter`).
- Geometri spacing değildir: dokunma 44, kontrol yüksekliği 44/52, avatar ölçüleri ayrı token'dır.

---

## 4. Radius

| Token | Değer | Nerede (kanon) | Ölçülen sapma |
|---|---|---|---|
| `--radius-control` | 12 | Düğme, chip, input/arama, sekme düğmesi, ikon düğmesi, kaydet hedefi, bilgi kartı, action-card ikon kutusu, sheet tutma çubuğu | ✓ 676 öğe |
| `--radius-segment` | 16 (= 12 + 4) | Segment dış kabı (iç boşluk 4) | ana ✓ 16; **detay sekmeleri 12** ✗; liste sıralama grubu 16 ✓ |
| `--dg-card-r` | 16 | **Tarif/video kartı görseli** (dg-card, dg-feature, dg-tile, satır, video kapağı), slider şeridi | ✓ (docs/47 patron seçimi) |
| `--radius-card` | 24 | Yüzey kartı (şef kartı, dolap kartı, action-card, menü kullanıcı alanı), alt menü, alt çubuk | ✓; **kategori görseli 24** (fotoğraf kartı ama 16 değil) ✗ |
| `--radius-sheet` | 24 (yalnız üst köşeler) | Sheet, içerik paneli; yapışınca 0 | ✓ |
| `--radius-choice` | 4 | Seçim kutusu, bayrak, sayı rozeti | ✓ |
| `calc(--radius-choice/2)` | 2 | Slider noktası | ✓ |
| `--radius-avatar` | 50% | **Yalnız avatar** | ✓ |
| iç içe | iç = dış − iç boşluk | Segment 16/4/12, dolap seçim paneli 24−16 = 8 | dolap paneli 8 ✓ |

**Tam yuvarlak** yalnız avatardadır. Hap (pill) biçimli chip yoktur. `--radius-pill` tanımlı ama kanonda kullanılmaz.

> Karar gerekiyor: “Kart” iki radius taşıyor. Tarif kartları 16 (patron seçimi), yüzey kartları 24. Ya bu iki rol bilinçli olarak ayrı tutulur (önerim: `--radius-media` 16, `--radius-surface` 24), ya da tek değere inilir.

---

## 5. Gölge

| Token | Değer | Kanon kullanım | Ölçülen |
|---|---|---|---|
| `--sh-sm` | 0 1px 2px ink/.04, 0 2px 6px ink/.05 | Etkin segment düğmesi, arama kutusu, birincil CTA | v3 sekmeleri, arama, Pişirmeye Başla, şef avatarı (96) |
| `--sh-md` | 0 6px 22px ink/.09 | Yüzen katman: alt menü, orta düğme, detay alt çubuğu | ✓ |
| `--sh-lg` | 0 18px 50px ink/.16 | Sheet, toast | ✓ |
| avatar halkası | 0 0 0 2px paper, 0 0 0 4px tomato | Yalnız detay şef kartı 56px avatarı | ✓ |
| hilal | 0 4px 0 tomato | Ana hero alt kenarı | ✓ |

Kartlar gölgesizdir (tarif kartı zeminsiz; yüzey kartı 1px `--line` kenarlık).

---

## 6. Hareket

| Token (önerilen ad) | Değer | Kullanım |
|---|---|---|
| `--ease` | cubic-bezier(.22,.61,.36,1) | Bütün geçişler |
| `--dur-fast` | 150ms | Header altında metin gizleme (opaklık) |
| `--dur-quick` | 180ms | Panel yapışınca radius 24→0, action-card basma |
| `--transition-fast` | 200ms | Hover/focus/renk, akordeon (`grid-template-rows`) |
| `--dg-duration` / sheet / drawer | 250ms | Sheet girişi (`sheet-enter`), çekmece (`drawer-in`), slider göstergesi, tema bölümü aç/kapa |
| skeleton | 1s ease-in-out infinite alternate (`skeleton-breathe`, opaklık .65) | İskelet |
| save-pop | 450ms | Kaydet geri bildirimi |
| reveal-up | 450 / 600ms | İçerik girişi |
| toast | 2.800ms görünür | Snackbar |
| hero otomatik geçiş | 6 sn; dokunma/kaydırma/klavye/odakta kalıcı durur, ekran dışında bekler | Ana hero slider |
| Tabaktan Tarif | `plate-scan` 1150ms, `viewfinder-pulse` 1800ms, `analysis-type` 650ms steps(25) | docs/52'de aynen korunur |
| pişirme alarmı | `cm2-alarm` .5s × 3 | Zamanlayıcı bitişi |

`prefers-reduced-motion`'da bütün geçişler anlıktır; otomatik geçiş çalışmaz; header alfası yalnız 0/1 olur.

---

## 7. Dokunma alanı ve kontrol ölçüleri

| Ölçü | Değer | Kural |
|---|---|---|
| `--touch-target` | 44 | Her etkileşimli öğe ≥44×44. Görünür öğe küçükse görünmez genişletme (`::after`) kullanılır. |
| Kontrol yüksekliği | 44 (chip, segment düğmesi, sayfalama, küçük düğme) / 52 (sheet ve CTA düğmesi, arama kutusu 50–52) | İki basamak; 48 yalnız menü satırı ve akordeon başlığı |
| Header ikon düğmesi | 44 hedef / 40 görünür; aralık 8 | |
| Kart kaydet | 32 görünür / 44 hedef / 14px ikon; görselin üst ve sağından 8 | |
| Avatar | 20 (kart) · 40 (yorum, menü) · 56 (şef kartı) | Ana sayfa şef kartı 96 kanon dışı (açık karar) |

Ölçümde 44'ün altında kalan gerçek hedefler:
- detay malzeme miktar düğmesi (47×23);
- detay hero kategori bağlantısı (101×14);
- liste kart metin bağlantısı (182×38);
- paylaş URL alanı (177×23, salt okunur input).

Diğer küçük görünen öğelerin (“Tümü →”, zamanlayıcı çipi, puan kapsülü, “Devamını oku”) görünmez 44px alanı var. Seçim kutusu (22) kendi 44px satırının içindedir.

---

## 8. Kalıplar

### 8.1 Header (üç ekran)
- **Yapı:** fixed, 68px + safe-area, yatay padding 20, öğeler arası 8.
  - Ana: resmi beyaz logo (64×40) solda; sağda bildirim + menü. Arama ikonu yalnız hero araması gizlenince gelir.
  - Liste: logo · bildirim · menü.
  - Detay: geri solda; sağda kaydet · paylaş · daha fazla · menü. Logo yoktur; kaydırınca tarif adı ortada tek satır “…”.
- **Şeffaf → solid:** Üstte zemin şeffaftır; header arkasında yalnız fotoğraf vardır. Eşik, hero/banner'daki ilk metnin header'a uzaklığıdır: `alfa = scrollY / min(48, ilkMetin − header − 8)`. Yukarı dönünce tersine işler; reduced-motion'da 0/1.
  - Solid renk `--dg-header-solid` #DC3D17; beyaz logo ve ikon.
  - Detayda solid olma, panelin yapışmasıyla aynı anda biter.
- **Sol üst ışık:** Header üstte de aynı primary radyal ışığı taşır (`radial-gradient(at 0 0, tomato/.25, transparent 65%)`).
- **İkon düğmesi:** Fotoğraf üstünde yarı saydam koyu zemin + blur(18px); solid header'da zeminsiz beyaz ikon.
- **Menü:** Header'ın menü düğmesi sağdan açılan ortak çekmeceyi açar (`OrtakMenu`).

### 8.2 Sayfa üst banner kalıbı (liste; detayda kapak olarak aynı mekanizma)
1. **Sabit banner:** `position:sticky; top:0`, liste 320px, detay 434px.
   - Gerçek fotoğraf, `background-size:cover`.
   - Tek sürekli overlay (smoothstep, 49 durak) + sol üst ışık.
2. **Metin bloğu:** gutter hizasında.
   - Liste: başlık (page rolü) + tek satır sayaçlar (“**6.112** Denenmiş tarif │ **34** Kategori │ **50** Dünya mutfağı”); meta rolü, değer GilroyBd, ayraçlar ortalı.
   - Detay: üst etiket (kategori, BÜYÜK HARF) → display başlık (en çok 2 satır) → alt başlık (1 satır) → meta hapları (puan · değerlendirme · maliyet · görüntülenme).
3. **Kayan içerik paneli** (`.content-panel`): banner'a 24px biner; üst köşeler 24; ilk içerik üstte 16. Banner'ın en alt metni ile panel arasında en az 24 olur (listede bilinçli 20; docs/41 açık konusu).
4. **Yapışan panel başı:** panelin ilk çocuğu sticky `top: header`.
   - Liste: arama + kapsam sekmesi + kategori şeridi.
   - Detay: Malzemeler/Hazırlanış/Yorumlar sekme çubuğu.
   - Yapışınca köşe 24→0 (180ms) ve 1px alt çizgi; header'a boşluksuz oturur. Katman sırası header > panel > kart.
5. **Gizleme:** Header'ın altına yaklaşan metin bloğu (ana hero başlığı+arama, liste tema başlığı/şeridi) yarım satır bırakmadan bütün olarak gizlenir (150ms opaklık).

### 8.3 Bölüm zeminleri ve ayraçlar
- Ana sayfa hero'dan sonraki bölümler kenardan kenaradır. Konumla alterne eder (`:nth-child(odd/even)`): gri `--bg` → beyaz `--paper` → … Aralarında boşluk ve ayraç yoktur.
- Kart yüzeyi bölümden türetilir: gri bölümde beyaz kart, beyaz bölümde ince kenarlıklı beyaz kart.
- Liste ve detay tek beyaz panel üzerindedir; bölüm ayrımı boşlukla yapılır (32).
- **Ayraç yalnız iki öğenin arasında:** ilk öğenin üstünde ve son öğenin altında çizgi olmaz. Menü satırları, filtre bölümleri, sıralama listesi, malzeme satırları ve yorum kartları bu kurala bağlıdır.

### 8.4 Alt menü ve orta düğme
- **Yerleşim:** Opak beyaz dock (104px, safe-area dahil) içinde yüzen bar.
  - Bar: 64 yükseklik, yatay dış 16, alt 8 + safe-area, iç 8, radius 24, `--sh-md`, blur 24.
  - Beş eşit sütun: Ana Sayfa (house) · Tarifler (bowl-food) · **Ne Pişirsem** (orta) · Püf Noktaları (lightbulb) · Profil (user).
- **Öğeler:** ikon 22, etiket nav rolü, ikon–etiket arası 4. Etkin öğe `--tomato-dark` metin + üstte 16×2 gösterge.
- **Orta düğme:** 48 kare, kontrol radius'u, primary dolgu, ikon 20, en çok 14px taşma. Misafir, üye ve Pro için her zaman “Ne Pişirsem”dir. **Tarif bul** sheet'ini açar: Ne Pişirsem / Dolapta Ne Var / Tabaktan Tarif (Pro).
- **Detay:** Alt menü yoktur. Aynı görsel ailede **alt eylem çubuğu** vardır.
  - Solda Ben de Yaptım · Eline Sağlık · Yorumlar (ikon + sayaç); sağda **Pişirmeye Başla** (52, `--tomato-dark`).
  - Opak yüzey safe-area ve köşeleri de örter.
- **Sayfa sonu boşluğu:** 80 + safe-area. İçeriği bar hesaplar; kabuk ikinci kez eklemez.

### 8.5 Kabuk
- Akışkan genişlik 320–430; masaüstünde tek sınır `--app-max: 480px`.
- Header, dock, CTA, toast ve sheet aynı kabuk genişliğini kullanır. Doğrulama genişlikleri 360 / 390 / 430.

---

## 9. İkon sözlüğü (yalnız Font Awesome Free 6.5.2 Solid; sosyal/paylaş kanalı Brands)

Ölçek: `--icon-sm` 14 (satır içi, kart, chip), `--icon-md` 18 (header, menü satırı, sheet), `--icon-lg` 22 (alt menü, boş durum). Görsel üstü meta 13 (metin boyutunda). İkon + metin arası 8, sıkı yerde 4. Durum renkle değişir; outline (`fa-regular`) yok.

| Kavram | Kanon ikonu | Bugün başka yerde kullanılan | Not |
|---|---|---|---|
| Ana Sayfa | `house` | — | |
| Tarifler | `bowl-food` | menüde `book-open` | **Tutarsız** |
| Kategori | `layer-group` | ana sekmede `bowl-food` | **Tutarsız** (bowl-food = Tarifler) |
| Dünya mutfağı | `earth-europe` | liste facet'inde `earth-americas` (webden), Balkan için `globe` | **Tutarsız**; `globe` = dil |
| Ne Pişirsem | `wand-magic-sparkles` | menüde `utensils` | **Tutarsız**; “Önerilen” sıralaması da wand kullanıyor (çakışma) |
| Dolapta Ne Var | `basket-shopping` | — | |
| Püf Noktaları | `lightbulb` | — | |
| Tabaktan Tarif | `camera` | — | |
| Pro | `crown` | — | |
| Video | `circle-play` | kart oynat işareti `play` | Oynat işareti eylemdir; ayrı kalabilir (öneri) |
| Şef / yazar | `user-tie` (öneri; FA Free'de şef şapkası yok) | şef satırında ikon yok; menüde Şef Panelim `user-tie` | Karar |
| Profil / hesap | `user` | — | |
| Takip et / Takip ediliyor | `user-plus` / `user-check` | ana şef kartında metin “+ Takip Et” (ikon yok) | **Tutarsız** |
| Abone ol | `bell` | — | Bildirimle aynı ikon |
| Bildirimler | `bell` | — | |
| Hatırlatma (bilgi kartı) | `bell` (Beyar örneği; canlı tarif detayındaki Hatırlatma kutusu da `fa-bell`) | — | **Çakışma**: header bildirimi ve “Abone ol” da `bell`. Canlıda da aynı. Karar: kabul mü, ayrışma mı? |
| Alerjen | `hand-dots` | — | |
| Özellik (beslenme etiketi) | etiketin kendi ikonu (vegan `seedling`, vejetaryen `leaf`, glutensiz `wheat-awn-circle-exclamation` …); grup başlığı ikonsuz | `seedling` ayrıca Mutfak Ansiklopedisi ve “Yüksek Lifli” | **Çakışma** |
| Editör notu | `pen-nib` | — | Veride yok, kod yolu hazır |
| Süre (toplam) | `clock` | — | Kartta 13, satırda 14, özet şeridinde 18: **boyut tutarsız** |
| Hazırlık / Pişirme süresi | `hourglass-half` / `fire-burner` | `fire-burner` ayrıca Pişirmeye Başla CTA | Çakışma (kabul edilebilir: pişirme) |
| Puan | `star` (`--yellow`) | boyutlar 11/13/14/18 | Boyut tutarsız |
| Görüntülenme | `eye` | — | |
| Kaydet | `bookmark` (kart 14, header 18) | web `fa-regular fa-heart` | Bilinçli fark |
| Paylaş | `share-nodes` | — | |
| Daha fazla | `ellipsis` | — | |
| Menü | `bars` | — | |
| Kapat | `xmark` | — | |
| Geri | `arrow-left` | — | |
| Tümünü gör | `arrow-right` (14) | şef kartı/sonraki adım `chevron-right` | Gezinme oku = arrow; satır sonu = chevron |
| Akordeon | `chevron-down` | — | |
| Arama | `magnifying-glass` | 14 / 15 / 18 üç boyut | **Boyut tutarsız** |
| Filtre | `sliders` | — | |
| Sıralama | `arrow-down-wide-short` | — | |
| Sıralama seçenekleri | Önerilen `wand-magic-sparkles`, En Yeni `calendar-plus`, En Çok Puanlanan `star`, En Hızlı `bolt` | — | Web birebir |
| Kart / satır görünümü | `table-cells-large` / `list` | — | |
| Porsiyon | `utensils` (çatal-bıçak) | ayrıca Ne Pişirsem (menü), Sofra Düzeni, Öğün facet'i, “Tümü”, Ana Yemek | **Çok anlamlı** |
| Zorluk | `gauge-simple` | — | |
| Maliyet / bütçe | `wallet` | detay hapında “₺₺₺” metni | |
| Kalori | `fire-flame-curved` | — | |
| Alışveriş listesine ekle | `cart-plus` | — | |
| Alternatif malzeme | `shuffle` | — | |
| Ölçü karşılığı | `circle-info` | “Tahmini değerler” notu da aynı ikon | |
| Ben de Yaptım | `fire-burner`? — ölçümde **`comment-dots`/`hands-clapping` yanında** ayrı ikon | Doğrulanacak | |
| Eline Sağlık | `hands-clapping` | — | |
| Yorumlar | `comment-dots` | “Görüş Bildir” de aynı ikon | Çakışma |
| Tavsiye | `thumbs-up` | — | |
| Pişirme modu adım tamamla | numara rozeti; ipucu `hand-pointer` | — | |
| Ekran açık tut | `sun` | — | |
| Zamanlayıcı sıfırla | `rotate-left` | — | |
| Kopyala / bağlantı | `copy` / `link` | — | |
| Dil | `globe` | Balkan mutfağı yedeği de `globe` | Çakışma |
| Ekle / Hariç tut / Dolapta | `plus` / `ban` / `circle-check` | — | |
| Onay (seçim kutusu) | `check` (12) | — | |
| Topluluk | `users` | — | |
| Tarif paylaş / ekle | `circle-plus` | — | |
| Rozet / unvan | `award` (detay) · `medal` (Rozetlerim) · `leaf` (menüde kademe) | — | **Tutarsız** |
| Sosyal | brands: instagram, facebook (menü `facebook`, paylaş `facebook-f`), x-twitter, whatsapp, telegram, pinterest-p; e-posta solid `envelope` | — | facebook / facebook-f ikiliği |

Yeni ekranlar için ayrılan ikonlar (çakışmasız öneri; Faz 2'de sözlüğe yazılacak):
- Çevrimdışı `wifi` + uyarı, hata `triangle-exclamation`, bakım `screwdriver-wrench`, güncelleme `arrows-rotate`;
- sil `trash-can`, çıkış `right-from-bracket`, gizlilik `shield-halved`, şifre `key`;
- tercih/ayar `sliders` (filtre ile çakışır → ayarlar için `gear` önerisi), alışveriş listesi `cart-shopping`, geçmiş `clock-rotate-left`.

---

## 10. Tutarsızlıklar (ölçülmüş; çözüm önerisiyle)

| # | Konu | Bugün | Öneri |
|---|---|---|---|
| T1 | Primary dolgu üç ton | Header #DC3D17; `.button`/Pişirmeye Başla/etkin sekme #C43D20; Tümünü Listeye Ekle, sayfalama, orta düğme, slider #E14827 | Rol bazlı tek eşleme: `primary-fill` (düğme, orta düğme, sayfa) tek değer; header ayrı token. **Karar: hangi değer?** (docs/42 R0: canlı #DC3D17 / #BA3413, repo #E14827 / #C43D20) |
| T2 | Kart radius'u 16 / 24 / 12 | Tarif ve video kartı 16; şef/dolap/action-card/kategori görseli 24; bilgi kartı 12 | `radius-media` 16 (bütün fotoğraf kartları, kategori görseli dahil), `radius-surface` 24, bilgi kartı = surface |
| T3 | Segment ailesi | Ana: dış 16, iç boşluk 0, 44 yükseklik, yazı 13 GilroyBd. Detay: dış 12, iç 4, 52 yükseklik, yazı 15 GilroyBd. Liste sıralama grubu: dış 16, iç 4, 52. | Tek `DgSegmented`: dış 16 / iç 4 / düğme 12 / 44 hedef / yazı meta-bold |
| T4 | Düğme yüksekliği 44 / 48 / 52 | Ana “Tarif bul” 44, boş durum 48, sheet/CTA 52 | İki basamak: `sm` 44, `lg` 52 |
| T5 | Takip et | Ana: beyaz çerçeveli, “+ Takip Et”, 13px. Detay: tonlu, `user-plus`, “Takip et”, 15/700. | Tek `DgFollowButton`; etiket web birebir (“Takip Et”) |
| T6 | Avatar ölçüsü ve harfi | 20 (13/700), 40 (16 GilroyBd), 56 (24/700), **96 (32/500)** | 20/40/56; ana şef kartı 96 → 56 kararı (docs/40 açık konu 1) |
| T7 | Kart kategorisi | Liste: 11/700, tracking yok, lh 1.3. Tile: 11/700, +0.06em, lh 1.4. | Tek `card-category` rolü |
| T8 | Hero slayt / video / şef adı başlıkları | 20/700/1.12; 16/700; 16/700 rol dışı | featured / card / featured rolleri |
| T9 | Meta satır yüksekliği dört değer | 1.2 · 1.4 · 1.5 · 1.55 | Yalnız rol token'ı |
| T10 | `GilroyBd` + `font-weight:500` | 38+26+10 öğede bildirilen ağırlık 500, dosya 700 | Kalınlık yalnız rol token'ı ile; aile + ağırlık birlikte |
| T11 | İkon çakışmaları | Tarifler, Kategori, Mutfak, Ne Pişirsem, Porsiyon (utensils), Hatırlatma/Bildirim (bell), seedling, globe, comment-dots | §9 sözlüğüne bağlanır; açık kararlar sorularda |
| T12 | İkon boyutları | Arama 14/15/18, saat 13/14/18, yıldız 11/13/14/18 | Bağlama göre üç basamak; görsel üstü meta 13 tek istisna |
| T13 | `.fab` sınıf adı | Orta düğme `.fab`, Font Awesome'ın Brands kısaltma sınıfıyla çakışıyor (computed font-family “Font Awesome 6 Brands”) | Yeniden adlandır (`.dg-fab`) |
| T14 | Toast konumu | `app.css`'te beş üst üste `.toast` kuralı (165/170/160/bottom-space+16) | Tek tanım |
| T15 | Katman borcu | `app.css` 1.592 kural, 515 literal px, 210 `!important`; ana sayfa 16 CSS/JS dosyası yüklüyor (six-, set2-, set15-, a-) | docs/53 taşıma planı |
| T16 | 44 altı hedef | Miktar (47×23), detay kategori bağlantısı (101×14), liste kart metni (38 yükseklik), paylaş URL alanı | Görünmez 44 alanı |
| T17 | Header başlangıç durumu | Ana ve liste: logo + bildirim + menü. Detay: kaydet/paylaş/daha fazla/menü. Ana sayfa arama ikonu koşullu. | Bilinçli; `DgAppBar` varyantları (home / page / detail) |
| T18 | Banner→panel boşluğu | Liste 20 (talimat), kanon en az 24 | Karar (docs/41 açık konu 2) |
| T19 | Izgara satır aralığı | Liste 24 (talimat), AGENTS 20 | Karar (docs/41 açık konu 3) |
| T20 | Detay alt eylemleri | Ben de Yaptım ikonu ölçümde ayrı yakalanamadı | Faz 2'de doğrulanacak |

---

## 11. Marka

**Kaynak:** `/Users/gaviaworks/Desktop/DadaMentor - Marka` (salt okunur; 12 Ekim'de incelendi, hiçbir dosya değişmedi). Klasörde 5 dosya var:
- `DadaMentor-Logos.ai`: sRGB, şeffaf, alt markaların yatay logoları + PANTONE metin etiketleri;
- `logo-kare.ai`: 10 sayfa, 150 mm kare, CMYK FOGRA39; dikey logolar, dolu zemin;
- bir dadamentor JPG'si, bir tanıtım videosu, bir devir notu.

**Yazılı marka kılavuzu yok.** Güvenli alan, minimum boyut, yasaklı kullanım ve zemin kuralı hiçbir dosyada geçmiyor. Font dosyası da yok; yalnız `.ai` içinde gömülü Gilroy-Regular/Bold alt kümeleri var.

### 11.1 Logo varyantları ve kullanım yeri

| Varyant | Resmi kaynak | Projede | Kullanım yeri (kanon) |
|---|---|---|---|
| Dikey renkli | logo-kare.ai s.1 (CMYK → #DD3D19) | `assets/marka/dadagastro-renkli.svg` (yollar s.1 ile birebir) | Sağ çekmece başı (64px), açık zeminli boş durum/sonuç ekranı, onboarding açık zemin, giriş/kayıt üstü |
| Dikey beyaz | logo-kare.ai s.5'ten zemin çıkarılmış (yollar birebir) | `assets/marka/dadagastro-beyaz.svg` | Header (şeffaf ve solid), koyu fotoğraf/hero üstü, splash (primary zemin üstünde) |
| Kırmızı kare + beyaz logo | logo-kare.ai s.5 | `assets/marka/dadagastro-amblem.svg` (pdftocairo çıktısıyla bayt bayt aynı) | Yayın sürecinde apple-touch-icon olarak veriliyor; **ikon olarak uygun değil** (aşağıda) |
| Yatay renkli (G1 canlı font / G2 dış hat) | DadaMentor-Logos.ai | **Projede yok** | Kullanılmıyor; gerekirse Logos.ai'den SVG dışa aktarımı gerekir (karar) |
| Yatay/dikey beyaz şeffaf (resmi dosya) | **Yok** | — | — |
| Monogram / sembol / favicon / uygulama ikonu / adaptive katmanlar | **Yok** | — | — |
| `apple-touch-icon.png` | Hiçbir kaynakla eşleşmiyor | 540×540 **logosuz** düz #DD3D19 kare, referansı yok | Kullanılmamalı |

Kural:
- Logo her zaman resmi dosyadan, oranı korunarak kullanılır; yazıyla yeniden üretilmez, yeniden renklendirilmez.
- Renkli logo açık zemine, beyaz logo koyu zemine ya da primary zemine konur.
- Logo dosyaları değiştirilmez.

### 11.2 Renk eşleşmesi

| Marka değeri (kaynak) | Token | Durum |
|---|---|---|
| #DC3D17: Logos.ai “gastro”, dosyadaki tam değer 220/61/23, “PANTONE 173 C” etiketinin yanında | `--dg-header-solid` | **Birebir** |
| #DD3D19: logo-kare.ai CMYK'nın ekran karşılığı | Logo SVG dolguları | Kaynakla tutarlı; #DC3D17'den farkı gözle görülmez (ΔE 0,66) |
| — | `--tomato` #E14827 | **Markada karşılığı yok** (ΔE 5,4, görünür fark). Laravel repo ile aynı, canlı site build'inde #DC3D17 |
| — | `--tomato-dark` #C43D20, `--tomato-deep` #A8331A | Kaynaksız türetim (kontrast için gerekli) |
| %10 kademe #FCECE8 (opaklıkla üretilmiş, adlandırılmış değil) | `--tomato-tint` #FBE9E3 | ≈ %12 kademe; kademelerden biri değil |
| Etiketler saf #000 | `--ink` #211E16 | Kaynaksız (Laravel tokens.css'ten) |
| Diğer alt markalar: mentor #FFCD00, gourmet #742982, fit #0093D0, diet #009A44, campus #003C71, store #9A6900 | — | DadaGastro arayüzünde kullanılmaz |

**Not:** “#DC3D17 = PANTONE 173 C” eşleşmesi yalnız dosyadaki yan yana yerleşime dayanıyor. Pantone'un yayımladığı 173 C sRGB değeri (#D14124) klasörden doğrulanamadı.

Kontrast, beyaz metin karşısında:

| Renk | Kontrast |
|---|---|
| #DC3D17 | 4,45:1 |
| #E14827 | 4,07:1 |
| #C43D20 | 5,20:1 |

İlk ikisi küçük metin eşiğinin (4,5:1) altında kalıyor, ikon ve büyük metin için yeterli.

### 11.3 Marka tutarsızlıkları

| # | Tutarsızlık | Etkisi |
|---|---|---|
| M1 | Arayüzde iki domates var: header #DC3D17 (marka), geri kalan primary #E14827 (markada yok). | Ana sayfada solid header ile orta düğme aynı ekranda yan yana görünüyor. **T1 ile birlikte karar.** |
| M2 | Logo SVG'leri RGB master'dan değil, CMYK baskı dosyasından türemiş (#DD3D19). | Pratikte fark yok; kaynak zinciri not edildi. |
| M3 | `dadagastro-amblem.svg` sağda ~1pt, altta ~0,8pt şeffaf şerit taşıyor; logo yatayda ~8,7pt sola kayık (kaynaktaki gibi). | Uygulama ikonu ya da favicon olarak kullanılırsa kenarda ince çizgi oluşur. |
| M4 | `apple-touch-icon.png` logosuz düz kırmızı kare (540px). | Ana ekrana eklenirse yanlış görünür. |
| M5 | Projede yatay logo yok; yalnız dikey. | Header'da dikey logo 64×40 kullanılıyor (mevcut ve onaylı). |

### 11.4 Splash ve uygulama ikonu: eksikler

Marka klasöründe doğrudan kullanılabilir varlık **yok**. Logo uydurulmadı. Eksikler:

1. **Uygulama ikonu (iOS 1024², Android adaptive 108dp ön plan + arka plan, Android 13 monokrom):**
   - Resmi bir monogram ya da sembol yok. En küçük birim tam “dada gastro” yazısı.
   - logo-kare.ai s.5 kare zemin sunuyor, ama yalnız CMYK .ai.
   - Zemin sayfayı tam örtmüyor, logo merkezde değil.
   - Logo genişliği tuvalin %67'si; Android'in %61'lik güvenli dairesini aşar.
   - **Gereken:** marka sahibinden onaylı ikon tasarımı (monogram ya da yerleşim) ve sRGB/PNG dışa aktarımı.
2. **Splash:**
   - Şeffaf zeminli beyaz logonun resmi dosyası yok.
   - Projedeki `dadagastro-beyaz.svg`, s.5'ten zemin çıkarılarak türetilmiş; yollar birebir, yeniden çizim değil.
   - Splash için bu dosya + `--dg-header-solid` zemin teknik olarak kullanılabilir. **Onay gerekir.**
3. **Favicon (16/32px) ve PWA manifest ikonları (192/512, maskable):** Monogram olmadan küçük ölçekte okunur bir işaret yok.
4. **Lisanslı Gilroy font dosyaları:** Klasörde yok. Projedeki `assets/fonts` kaynağı ve lisansı Flutter dağıtımı için doğrulanmalı.

Bu turda `v3-app/assets/marka` altına **dosya kopyalanmadı**. Kopyalanacak hazır dosya yok; gerekenler `.ai` içinden dışa aktarım ister. Dışa aktarım marka sahibinin onayıyla Faz 2'de yapılır.

---

## 12. Makine okunur kanon

`v3-app/ortak/tokens.json`: renk, tipografi rolleri, spacing, radius, gölge, hareket, ölçüler, overlay parametreleri ve ikon sözlüğü. Yapı Flutter `ThemeData` + `ThemeExtension<DgTokens>` ile CSS custom property'ye birebir çevrilecek şekildedir (bkz. docs/53 §1). Dosyada **karar bekleyen** değerler `"status": "karar"` ile işaretlidir.

---

## 13. Faz 1 kararları ve çözülen tutarsızlıklar (12 Ekim, Beyar)

**Kök:** yayındaki `yeni-tasarim-v3` (= yerel `ana-v3`, `liste-v2`, `detay-v2`). Karşılaştırma: dosya farkları yalnız yayın sürecinin eklemeleri; görüntü farkı WebKit 0, Chromium ≤2/255 kanal (gürültü). Kanon bu ekranlardan okunur; yeniden tasarlanmaz.

**Primary (karar 1):** canlı dadagastro.com header/logo rengi.

| Rol | Değer | Canlı token |
|---|---|---|
| primary (`--tomato`) | #DC3D17 | `--tomato` |
| koyu (`--tomato-dark`) | #BA3413 | `--tomato-dark` (canlı `.btn-primary`, orta düğme, etkin alt menü) |
| derin (`--tomato-deep`) | #9C2B10 | `--tomato-deep` |
| açık (`--tomato-tint`) | #FBE6E1 | `--tomato-tint` |

#E14827 kanondan çıktı. Canlıda #E14827 yalnız masaüstü marka geçiş rozetinde (`.bs-gastro`) ve bir pişirme sayacı yorum notunda geçiyor.

**Uygulama:**
- Değerler `ortak/tokens.json` → `ortak/dg-tokens.css`; eski adlar `ortak/dg-kopru.css` ile bağlı. Orta düğme dahil bütün kullanımlar token'dan.
- Kök ekranlar: `tokens.css` → `dg-tokens.css` → `dg-kopru.css` → … → `dg-duzeltme.css`.

| # | Durum | Çözüm |
|---|---|---|
| T1 / M1 | **çözüldü** | Tek primary ailesi (yukarıda) |
| T2 | **çözüldü (karar 3)** | Fotoğraflı kart 16, yüzey 24, kontrol ve bilgi kartı 12 (`radius.media/surface/control/infoCard`) |
| T3 | **çözüldü (detay değeri)** | Segment: dış 12, iç 4, düğme 44, GilroyBd 15/700, zemin `--line` (D2) |
| T4 | **çözüldü** | Birincil düğme 52 (D6) |
| T5 | **çözüldü** | Takip et = detay düğmesi (tint + tomato-deep kalın) (D7) |
| T6 | **çözüldü (karar 3)** | Avatar ölçeği 20 · 40 · 56 · 96 |
| T7 | **çözüldü** | Kart kategorisi: 11/700, +0.06em, satır 1.4 (D3) |
| T8 | **çözüldü** | Hero slayt ve şef adı öne çıkan rol satırı/tracking; video başlığı kart rolü (D4) |
| T9 | **çözüldü** | Meta satır yüksekliği 1.4 (D5) |
| T10 | açık (görünmez) | GilroyBd + 500 bildirimi; yeni bileşenlerde 700 |
| T11 | **çözüldü (karar 5)** | İkon sözlüğü `tokens.json icons`; bildirim = hatırlatma = abone ol = çan |
| T12 | yeni bileşenlerde çözüldü | İkon ölçeği 14/18/22 + görsel üstü 13 |
| T13 | açık (kod) | Kök runtime `.fab` adı; yeni bileşen `.dgu-fab` |
| T14 | yeni bileşenlerde çözüldü | Tek snackbar (`.dgu-snack`); kök runtime toast değişmedi |
| T15 | sürüyor | Katman borcu (app.css); yeni sayfalar app.css yüklemez |
| T16 | açık | Kök ekranda 44 altı birkaç hedef (miktar, kategori bağlantısı) |
| T17 | bilinçli | Header varyantları (home/page/alt/banner) |
| T18 / T19 | bilinçli (önceki talimat) | Liste banner→panel 20, ızgara satır 24 |
| T20 | açık | Detay Ben de Yaptım ikonu doğrulanacak |
| D8 | **uygulandı (karar 12)** | İki yana yaslama kalktı, her yer sola yaslı |
| D9 | **uygulandı (karar 12)** | Pişirme modu adım metni 24/700 |
| M3–M5 | yer tutucu (karar 7) | Uygulama ikonu `uygulama/ikon/ikon-yer-tutucu.svg` (logosuz düz primary kare), “marka sahibinden bekleniyor”; splash mevcut beyaz SVG |

Alt menü (karar 8, patron teyidi bekliyor): Ana Sayfa · Tarifler · Ne Pişirsem · **Kaydettiklerim** · Profil. Sıra `tokens.json nav` içinde; kök ekranlara `ortak/dg-baglanti.js` uygular.


## Metin hizası — güncel karar (Beyar, 12 Ekim 2026)

Faz 1 küçük kararı “iki yana yaslama mobilde kalkar” **geri alındı**. Kural: her metin iki yana yaslıdır (`text-align:justify`, `hyphens:auto`, `lang="tr"`); sola dayalı blokta son satır sola, ortalı blokta son satır ortada. **Metin justify, ortak katmandan gelir; sayfada ezilmez** (`ortak/dg-metin.css`; kök ekranlarda D8 tersine çevrildi). Paragraflarda kaynaktaki bold vurgular korunur; vurgusuz düz paragraf bırakılmaz. Flutter: `TextAlign.justify` + son satır için `textAlign` ayrımı (`DgJustifiedText`), Türkçe heceleme yok (açık risk, docs/53).

## Dikey yığın (Beyar, 12 Ekim 2026)

Başlık → açıklama 8 · açıklama → düğme / etkileşimli öğe (alan, çip, kart) en az 20 · tam genişlik düğmeler arası 12 · bölümler arası 32. Tek kural `ortak/dg-bilesen.css` “Dikey yığın kuralı”; sayfada margin yazılmaz. Denetim `ortak/denetim/yakinlik.mjs` (12 Ekim: 70 → 0). Flutter: `DgGap` sabitleri (`SizedBox(height: DgSpace.s20)` metin–eylem, `s12` düğmeler, `s32` bölümler).


## Metin — istisnasız justify (Beyar, 13 Ekim)

**Bütün metinler justify, istisna yok; boşluk heceleme ve aralık ayarıyla çözülür.** Başlık, ad, etiket, düğme, çip ve sayı alanı dahil `text-align:justify`; hiza yalnız `text-align-last` ile (başa / ortaya / sona). `lang="tr"` her sayfada. Türkçe heceleme: tarayıcılarda Türkçe `hyphens:auto` sözlüğü olmadığı ölçüldüğünden `ortak/dg-metin.js` Türkçe hece kurallarıyla yumuşak tire ekler (iki ünlü arası: 0 ünsüz → ünlüler arası, 1 → ünsüzden önce, 2 → ünsüzler arası, 3+ → son ünsüzden önce; sözcük başı/sonu en az 2 harf, 5 harften kısa sözcük bölünmez). Dar sütunda kalan boşluk genişlik, yazı rolü (kanon içinde) ya da metni kısaltarak çözülür. Flutter: `Text(textAlign: TextAlign.justify)` + `hyphenator` paketiyle Türkçe heceleme (aynı kurallar). **Görsel justify (13 Ekim revize eki):** 2+ satırlı her blokta son satır dışındaki her satır bloğun iki kenarına dayanır; kutu genişliği metne göre daraltılmaz (daraltılmış blok sütunun sağ kenarına ulaşmaz, ekranda sola dayalı görünür — önceki “genişlik ayarı” bu yüzden kaldırıldı). 20px ve üstü başlıklar (bölüm, sayfa, hero) hecelenmez, tireli başlık okunmaz. Denetim hesaplanan değere değil ekrandaki satırlara bakar (`ortak/denetim/metin.mjs`).

### Büyük başlık boşluğu — karar (a) (Beyar, 13 Ekim V4)
Büyük başlıklarda (20px+) justify kalır, metin değişmez. Heceleme (6/3/3) ve dizgi seçimi (heceli/hecesiz, sözcük aralığı ≥ −0,08em, harf aralığı ≥ −0,01em) sonrasında sözcük arası açıklığı 0,35em'i aşan başlıkta yazı boyutu **1px adımlarla en çok 2px** küçültülür — yalnız o başlıkta, tek ortak yardımcı: `ortak/dg-metin.js` `baslikAyar()` (genişlik değişince yeniden ölçer). 2px de yetmezse boyut değişmez, başlık `DGMetin.acik` listesine düşer ve raporlanır.
**Flutter notu:** `DgJustifiedHeading` — `TextPainter` ile `textAlign: justify` satırlarını ölç; açıklık > 0,35em ise `fontSize − 1`, sonra `− 2` dene (aynı rol, aynı ağırlık); yine aşıyorsa rol boyutunda bırak. Türkçe heceleme `hyphenator` (6/3/3). Hero şef adı: `maxLines: 1, overflow: TextOverflow.ellipsis`; satır genişliği = içerik genişliği − sayfa göstergesi genişliği − 12.

