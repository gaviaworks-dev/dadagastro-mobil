# 53 — Yayılım planı ve tek kök mimarisi

12 Ekim 2026 · Faz 1 önerisi. Hiçbir madde uygulanmadı; her faz Beyar'ın onayıyla başlar.

**Sıra (Beyar kararı):**
1. Bütün sayfalar ve halleri önce HTML prototipte tamamlanır.
2. Patron onayı alınır.
3. Flutter geliştirmesine ancak bundan sonra geçilir.

Bu aşamada Flutter hazırlığı yalnız doküman ve `ortak/tokens.json` olarak kalır.

Git add/commit/push ve yayın bu planın hiçbir adımında izinsiz yapılmaz. Yayın, Beyar'ın o yayına özel açık izniyle GitHub Pages'te ayrı bir alt adrese çıkar.

Bağlı dokümanlar: docs/50 (kanon), docs/51 (bileşenler), docs/52 (sayfa envanteri, durum matrisi, veri sözleşmesi, canlıda 404 veren sayfalar), docs/54 (mobile özgü desenler).

---

## 1. Tek kök: önerilen mimari

### 1.1 Kök nerede, hangi biçimde?

```
v3-app/ortak/                       ← tek kök (tasarım sistemi)
  tokens.json                       ← TEK DEĞER KAYNAĞI (elle düzenlenen tek dosya)
  bilesenler/<ad>.json              ← bileşen sözleşmesi: anatomi, parametre, durum, token bağları
  hareket.json                      ← süre, eğri, keyframe tanımları (tokens.json'ın motion bölümü buraya ayrılabilir)
  uret/                             ← üreticiler (Node, bağımlılıksız)
    css.mjs   → ortak/dg-tokens.css         (üretilen; elle değişmez)
    dart.mjs  → flutter/lib/tema/dg_tokens.g.dart (Flutter fazında)
    doc.mjs   → docs/50 tabloları + katalog verisi
  css/  katman sırası: @layer dg.reset, dg.tokens, dg.base, dg.bilesen, dg.sayfa
    dg-base.css, dg-bilesen-*.css   ← bileşen CSS'i yalnız var(--dg-*) okur
  js/   dg-*.js                     ← bileşen render + davranış (vanilla, DGCard gibi)
  veri/                             ← prototip verisi; alan adları önerilen API sözleşmesiyle aynı (docs/52 §veri)
  denetim/                          ← kanon-lint, stil denetimi, bağlantı denetimi, görsel fark
  katalog.html                      ← bileşen kataloğu (her bileşen × her durum, canlı)
```

**İlkeler**
- Değer yalnız `tokens.json`'da yazılır.
  - Sayfa CSS'i ve bileşen CSS'i literal renk, px, font-size, radius, gölge ya da süre içermez; yalnız `var(--dg-…)` okur.
  - İstisnalar `denetim/izin.json`'da gerekçesiyle durur: 1px kenarlık, 2px odak halkası, hesaplanan geometri.
- Bileşen davranışı tek JS dosyasında yaşar. Sayfa yalnız veri verir, kendi kartını, sheet'ini ya da header'ını yazmaz.
- Overlay eğrisi gibi hesaplı görünümler tek fonksiyondadır (`DGCard.gradient/veils` bugün de böyle). Değer yine token'dan okunur.

### 1.2 HTML ve Flutter kökten nasıl türer?

**Üretim; elle eşleme değil.**
- `tokens.json` → üretici → CSS custom properties (`--dg-*`) ve Dart sabitleri.
  - Dart tarafı: `DgTokens extends ThemeExtension`, `ThemeData`/`ColorScheme`/`TextTheme`, `DgSpacing`, `DgRadius`, `DgMotion`, `DgIcons` eşlemesi.
  - Renk karışımları (`color-mix`) üreticide önceden hesaplanır. Böylece iki taraf aynı hex'i kullanır.
- Tipografide satır yüksekliği çarpan olarak saklanır.
  - CSS `line-height: 1.25`.
  - Flutter `TextStyle(height: 1.25, leadingDistribution: TextLeadingDistribution.even)`, `TextHeightBehavior` ortak ayarla.
  - Tracking em → `letterSpacing = em × size`.
- **Bileşenler üretilmez, iki kez yazılır.** Ama tek sözleşmeye (`bilesenler/<ad>.json`) bağlıdır: widget adı, parametreler, durumlar, ölçüler, token bağları. HTML bileşeni ve Flutter widget'ı bu sözleşmeden yazılır. Eşitlik testle kanıtlanır (§1.5).
- İkonlar `tokens.json` → `icons` sözlüğünden.
  - HTML: Font Awesome 6.5.2 solid sınıfı.
  - Flutter: `font_awesome_flutter` aynı sürüm ailesi, `FaIcon(FontAwesomeIcons.x)`.
  - Kavram adı (`time`, `rating`…) iki tarafta aynıdır; sayfa ikon adı değil kavram adı ister.

### 1.3 Bileşenler ve animasyonlar tek yerden

- Her bileşenin tek HTML render fonksiyonu vardır (`DG.card()`, `DG.sheet()`, `DG.header()`…) ve tek CSS dosyası. Sayfalar bunları çağırır.
- Animasyon:
  - Süre ve eğri `motion` token'ı.
  - Keyframe tanımı `ortak/css/dg-hareket.css` içinde tek kez.
  - Flutter karşılığı `DgMotion` (`Duration`, `Cubic(.22,.61,.36,1)`).
  - Reduced-motion tek bayrak: CSS `@media`, Flutter `MediaQuery.disableAnimations`.
- Sayfa geçişi tek kural: itme sağdan, sheet alttan, 250ms, `--ease`.
  - HTML'de sayfa giriş animasyonu (`dg-sayfa-gir`).
  - Flutter'da `DgPageRoute`.
  - Web'e özgü View Transitions kullanılmaz.

### 1.4 Kök ekranlar görünüm değişmeden nasıl taşınır?

“Strangler” (sarmalayarak değiştirme), adım adım ve **her adımda piksel kanıtıyla**:

0. **Dondur.**
   - Üç ekranın bugünkü hâli: Chromium + WebKit × 360/390/430 × ana durumlar (sheet açık, yapışık, menü, boş, yükleniyor). Tam sayfa + ilk ekran görüntüsü + hesaplanan stil anlık görüntüsü (docs/50'deki ölçüm betiğinin genişletilmişi).
   - Bu set “referans”tır. Kaynak dosyaların byte kopyası `eski/kok-ekranlar-20261012/` altına alınır.
1. **Token köprüsü.**
   - `dg-tokens.css` üretilir; değerler bugünkülerle **aynıdır**.
   - Eski adlar (`--tomato`, `--space-16`, `--role-*`) yeni adlara alias olur (`--tomato: var(--dg-color-tomato)`).
   - Görsel fark 0 olmalı.
2. **Bileşen bileşen taşıma.** Sıra: header → alt menü/dock → sheet → kart ailesi (zaten ortak) → bölüm başlığı → chip/segment/düğme → banner+panel → menü (zaten ortak).
   - Her bileşen için sayfa-özel kurallar silinir, ortak bileşen bağlanır.
   - Referansla piksel farkı (eşik 0; yalnız alt-piksel kenar yumuşatması için belgelenmiş tolerans) ve stil anlık görüntüsü karşılaştırılır.
   - Fark varsa adım geri alınır ya da fark gerekçesiyle raporlanır.
3. **Katman temizliği.**
   - `app.css` (1.592 kural, 210 `!important`) ve ana sayfanın 16 dosyalık six/set yığını `@layer` sırasına alınır.
   - Kullanılmayan kurallar, ölçülen kapsama ile (Chromium CSS coverage, bütün durumlar) ayıklanır.
   - Arşiv sayfaları bu dosyaları paylaştığı için önce kopya alınır.
4. **Kararlı farklar.** docs/50 §10'daki tutarsızlıklar (T1–T20) ancak Beyar karar verdikten sonra, ayrı ve **görünür** bir adımda düzeltilir. Önce/sonra 3× kırpımla sunulur.

Kök ekranların yeni yeri `v3-app/uygulama/` altındadır (bkz. §3). Bugünkü `ana-v3.html`, `liste-v2.html`, `detay-v2.html` referans olarak değişmeden kalır.

### 1.5 Kökten sapma nasıl denetlenir?

Dört kapı; her teslimden önce sıfır ihlal:

1. **Statik lint** (`denetim/kanon-lint.mjs`):
   - Sayfa ve bileşen CSS'inde literal renk/px/font-size/radius/gölge/süre yok.
   - `!important` yok; `fa-regular` yok; emoji/inline SVG ikon yok.
   - Bilinmeyen `--dg-*` adı yok.
   - İzin listesi dışı her bulgu hata.
2. **Hesaplanan stil denetimi** (`denetim/stil.mjs`, docs/50'de kullanılan yöntem). Her sayfa × her durum × 360/390/430 × Chromium + WebKit. Kurallar:
   - her metin (boyut, ağırlık, satır, tracking) bir rol dörtlüsüne eşit;
   - radius ∈ {0, 2, 4, 12, 16, 24, 50%}; boşluk ∈ ölçek; gölge ∈ 3 token;
   - ikon sınıfı sözlükte, boyut ∈ {13, 14, 18, 20, 22};
   - etkileşimli hedef ≥44; yatay taşma 0; küçük metin kontrastı ≥4,5;
   - bitişik bileşen yok (komşu kutular arası ≥8).
3. **Görsel fark** (`denetim/gorsel.mjs`): referans görüntülere karşı piksel karşılaştırması. Kasıtlı değişiklik referansı ancak onayla günceller.
4. **Bağlantı denetimi** (`denetim/baglanti.mjs`):
   - Bütün sayfaları ve durumlarını gezer.
   - Her `a[href]`, `button`, `[role=button]`, `[data-*]` eylemini tıklar.
   - Sonuç: ölü bağlantı (#, boş href, 404), işleyicisi olmayan düğme, “Yakında” dışı hata, konsol hatası, geri tuşunun gittiği yer.
   - Yayın öncesi **0** olmalı.

Flutter fazında aynı kurallar golden test (390×844, aynı veri) ve HTML ↔ Flutter görüntü karşılaştırması olarak devam eder.

### 1.6 Seçenekler ve önerim

| Seçenek | Nasıl | Artı | Eksi |
|---|---|---|---|
| **A · JSON kök + kendi üreticimiz** (önerim) | `tokens.json` → küçük Node üreticileri → CSS + Dart; bileşen sözleşmesi JSON; iki taraf elle yazılır, denetim/golden testle eşitlenir | Bağımlılık yok; düz HTML/CSS/JS kuralına uyar; değer tek yerde; Flutter'a temiz geçiş | Bileşenler iki kez yazılır; eşitlik testle korunmak zorunda |
| B · Style Dictionary (DTCG biçimi) | Aynı yapı, üretici olarak hazır araç | Endüstri standardı biçim; çok platform | npm bağımlılığı ve yapılandırma; prototipte gereksiz ağırlık. A'nın dosyası DTCG'ye yakın tutulursa sonra geçiş kolay |
| C · Flutter Web'i prototip yapmak | HTML prototip bırakılır, prototip Flutter Web derlemesi olur | Tek kod, birebir eşitlik garantisi | AGENTS kuralına (düz HTML/CSS/JS) ve “önce HTML, sonra Flutter” sırasına aykırı; prototip hızını düşürür; web derlemesi ağır, metin seçimi ve erişilebilirlik zayıf |

**Önerim A.** `tokens.json` alan adları DTCG'ye (`$value`, `$type`) yakın tutulur. Böylece gerekirse B'ye geçiş yalnız üretici değişikliğidir.

### 1.7 Riskler

- **Font ölçüleri:** Gilroy'un tarayıcı ve Flutter satır kutusu farklı hesaplanabilir. Gereken: `TextHeightBehavior` + `leadingDistribution` ortak ayarı ve bir ölçüm sayfası (aynı metin, iki motor, piksel karşılaştırması).
- **Lisans:** Lisanslı Gilroy dosyaları marka klasöründe yok (docs/50 §11). Uygulama içine gömme lisansı doğrulanmalı.
- **Justify + tireleme:** Flutter'da Türkçe tireleme yoktur. “≥4 satır justify” kuralı Flutter'da kelime boşluklarını açabilir. Ya kural mobilde sola yaslamaya döner, ya da ölçümle sınırlanır. Karar gerekir.
- **Blur maliyeti:** `backdrop-filter` (alt menü, panel başı, header düğmeleri) Android'de pahalı. Flutter'da `BackdropFilter` sayısı sınırlanmalı. Gerekirse opak eşdeğer (zaten `@supports not` yedekleri var).
- **Yapışan panel ve kaydırma fiziği:** CSS `sticky` ile `SliverPersistentHeader` eşdeğer, ama iOS esneme (bounce) ve Android kaydırma farklıdır. Eşik formülleri `ScrollController.offset` ile aynı yazılır.
- **Hesaplı overlay:** Metin konumundan eğri, Flutter'da `TextPainter` ile ilk satır ölçümü ister (yapılabilir, maliyetli). Kart başına bir kez hesaplanıp önbelleğe alınır.
- **İki uygulama:** Eşitlik testleri yazılmazsa zamanla kayma olur. Denetim kapıları zorunlu tutulmalı.
- **Ortak dosyaların arşivlerle paylaşımı:** `app.css`, `ld-source.js` ve `six-*` alternatif ve yayın kopyalarınca da kullanılıyor. Taşıma kopya üzerinde yapılmalı; aksi hâlde eski galeriler bozulur (docs/40'ta yaşandı).
- **Backend:**
  - Verilen repoda API v1'de tarif/içerik/etkileşim uçları yok (13 Temmuz modül reset'i).
  - Canlı site bu repodan değil, 12 Eylül sonrası başka bir kod tabanından yayında görünüyor (docs/52 §9). Aday: `Revenge Projects/DadaMentor/DadaGastro`; açılmadı, doğrulanmadı.
  - Flutter fazından önce hangi backend'e bağlanılacağı netleşmeli ve API envanteri o kaynakla yeniden çıkarılmalı.
- **Marka varlıkları:** Uygulama ikonu, monogram ve splash logosunun resmi dosyası yok. Splash/manifest ikonu bu nedenle bekler.

---

## 2. Yol haritası (fazlar)

| Faz | İçerik | Çıktı | Kapı |
|---|---|---|---|
| **1** (bu) | Araştırma: kanon, bileşenler, sayfalar, plan | docs/50–53, `ortak/tokens.json` | Beyar onayı + açık kararlar |
| **2** | Ortak katman | `ortak/` (üretici, CSS katmanları, bileşen JS, katalog, denetim betikleri); kök ekranlar ortak katmana bağlı, **görsel fark 0** | Denetim 4 kapı yeşil; katalog onayı |
| **2b** | Kararlı tutarsızlık düzeltmeleri (T1–T20) | Önce/sonra kırpımları | Beyar onayı |
| **3** | Uygulama kabuğu ve gezinme | `uygulama/` iskeleti, oturum durumu, yönlendirici, sayfa geçişi, geri davranışı, sıfırlama, manifest, iki galeri iskeleti, bağlantı denetimi | Uçtan uca: splash → ana → liste → detay → geri |
| **4** | Sayfa grupları G1–G7 (§4) | Her grup: sayfalar + bütün halleri + galeri kartları | Grup kontrol listesi + 4 kapı |
| **5** | Bütünleştirme | Tam galeri, tam bağlantı denetimi (0), cihaz matrisi, parite tablosu (docs/52) | Patron sunumu |
| **6** | Yayın (izinle) | GitHub Pages alt adresi (ör. `…/uygulama/`); `noindex`; yalnız yayın klasörü | **Beyar'ın açık yayın izni** |
| **7** | Flutter (patron onayından sonra) | `tokens.json` → Dart; widget kütüphanesi; golden testler; API entegrasyonu (backend planıyla) | Ayrı plan |

---

## 3. Uygulama kabuğu, tıklanabilir prototip ve galeri (Faz 3)

### 3.1 Dosya düzeni

```
v3-app/uygulama/
  index.html            → açılış yönlendiricisi: ilk açılışta açılış ekranı, sonra ana sayfa
  acilis.html           → splash
  tanitim.html          → onboarding (tanıtım + tercihler + izinler)
  ana.html, tarifler.html, tarif.html     → kök ekranların ortak katmana bağlı hâli
  <grup sayfaları>.html → §4 (düz adlar, Türkçe, tire ile)
  sifirla.html          → prototip durumunu sıfırla (ilk açılışa dön, oturumu kapat)
  manifest.webmanifest, ikon/*  → ana ekrana ekleme (ikon varlığı marka onayına bağlı)
v3-app/ekranlar.html        → patron galerisi
v3-app/ekranlar-ic.html     → iç sürüm (aynı galeri + hazır/yapılıyor durumu)
```

### 3.2 Tıklanabilir prototip kuralları

- **Giriş noktası:**
  - İlk açılışta açılış ekranı → tanıtım → ana sayfa.
  - Sonraki açılışlarda doğrudan ana sayfa.
  - Profil > Ayarlar'da ve `sifirla.html`'de “Prototipi baştan başlat”.
- **Oturum durumu** (yalnız `localStorage`, yalnız prototip):
  - `misafir | uye | pro`; ilk açılış bayrağı; kaydedilenler, takip edilenler, dolap, alışveriş listesi, bildirim okundu bilgisi.
  - Adres parametreleri (`?oturum=uye`, `?durum=bos`) galeri ve test için aynı durumu zorlar.
- **Giriş kapısı:**
  - Misafir, giriş gerektiren eyleme dokununca ortak giriş kapısı sheet'i açılır.
  - “Giriş Yap” → giriş sayfası (`donus` + bekleyen eylem adreste).
  - Giriş başarılı olunca kaldığı yere döner ve eylemi tamamlar (ör. kaydet). Snackbar ile bildirilir.
- **Bağlantılar:**
  - Bütün gezinme gerçek göreli `href`'tir.
  - Alt menü, orta düğme paneli, çekmece, header eylemleri, kartlar, “Tümü”, geri, sekmeler, arama, bildirimler, profil ve ayarlar birbirine bağlıdır.
  - Kapsam dışı hedef (Mutfak Sırları) yalnız “Yakında” bildirir; ölü bağlantı yoktur.
- **Geri davranışı:**
  - Geri düğmesi `history.back()`. Geçmiş yoksa `donus` parametresi, o da yoksa ekranın mantıksal üstü (detay → liste → ana).
  - Kaydırma konumu geri dönüşte korunur. Sheet açıkken geri tuşu önce sheet'i kapatır.
- **Telefon:**
  - `viewport-fit=cover` + safe-area, `100dvh`, `display: standalone` manifest.
  - Masaüstünde 390 genişlikte ortalanır (`--app-max` 480 kuralıyla uyumlu çerçeve).
- **Sayfa geçişi:** kanondaki 250ms itme; reduced-motion'da anlık.

### 3.3 Galeri (`ekranlar.html`)

- **Akış grupları:** Açılış & Tanıtım · Hesap · Ana Sayfa · Tarifler · Ne Pişirsem · Dolapta Ne Var · Tabaktan Tarif · Videolar · Püf Noktaları · Şefler · Arama · Bildirimler · Profil & Ayarlar · Yasal & Kurumsal · Sistem & Hata.
- **Kart:**
  - Her sayfa 390×844 canlı çerçevede; altında sade adı ve “Tek başına aç”.
  - Aynı kartta küçük seçiciyle halleri: Misafir / Üye / Pro · Dolu / Boş / Yükleniyor / Hata / Bağlantı yok …
  - Çerçeveler sırayla yüklenir (yerel sunucu yükü, docs/47 P6).
- **Metin kuralı:** Patron sürümünde iç kod, dosya adı, parametre ya da teknik etiket görünmez; yalnız sade Türkçe.
- **İç sürüm** (`ekranlar-ic.html`): aynı galeri + “hazır / yapılıyor / bekliyor” rozeti + denetim sonuçlarının özeti. Yayına girmez.

---

## 4. Sayfa grupları (Faz 4)

Sayfa kimlikleri ve ayrıntıları docs/52'dedir. Her grup kök ekranlardan türer ve docs/51 bileşenlerini kullanır. Dosya adları `v3-app/uygulama/` altındadır.

| Grup | Sayfalar (dosya) | Türediği kök | Bağımlılık | Paralel çalışabilir mi? |
|---|---|---|---|---|
| **G1 · Hesap ve giriş** | `giris.html` (giriş/kayıt/şifremi unuttum sekmeleri), `sifre-yenile.html`, `eposta-dogrula.html`, `iki-adim.html`, `profil.html` (kendi profil = şef profili sahip görünümü), `profil-duzenle.html`, `kaydettiklerim.html` (+ koleksiyonlar), `tariflerim.html`, `tarif-ekle.html` (4 adım; düzenle aynı sayfa), `alisveris-listesi.html` (+ geçmiş), `rozetlerim.html`, `menulerim.html`, `haftalik-menu.html` (Pro), `pro.html` (planlar + üyeliğim) | Liste (banner + panel), detay (form/sheet), ana (kartlar) | Faz 3 (oturum, giriş kapısı) | G2 ile paralel |
| **G2 · Tarif bulma** | `ne-pisirsem.html` (4 adım sihirbaz + sonuç + Yemek Modu: Sıfırdan Kur, Hazır Menüler, menü düzenle), `menuyu-pisir.html`, `dolapta-ne-var.html` (Dolaptakiler / Hariç tuttuklarım 4 mod / filtreler / sonuç), `tabaktan-tarif.html` (**kökten taşınır, kanona uyarlanır**) | Ana (Dolapta modülü), liste (sonuç ızgarası), detay (pişirme modu) | Faz 3 | G1 ile paralel |
| **G3 · Tarif türevleri** | `kategori.html`, `dunya-mutfagi.html`, `tema.html` (liste ön ayarlı banner varyantları). Repo'da olup canlıda 404 veren `koleksiyon`, `gunun-menusu`, `sezon`, `derleme` yalnız Beyar kararıyla eklenir (docs/52 §9) | Liste | Faz 2 | G1/G2 ile paralel |
| **G4 · İçerik ve topluluk** | `videolar.html` (Video Mutfağı), `video.html` (oynatıcı/detay), `video-seri.html`, `seriler.html`, `puf-noktalari.html`, `puf.html` (detay), `puf-ekle.html`, `sefler.html`, `sef.html` (profil), `onur-listesi.html` (`liderlik` canlıda 404 → karar) | Liste, detay, ana (video kartı, şef kartı) | G1 (profil kalıbı) | Videolar ve Püf kendi içinde paralel |
| **G5 · Arama, bildirimler, ayarlar** | `arama.html` (öneri, sonuç sekmeleri, boş, son aramalar), `bildirimler.html`, `ayarlar.html` (Hesap ve Ayarlar 7 bölüm + uygulama ayarları: dil, bildirim tercihleri, birimler, gizlilik, güvenlik, hesap dondur/sil), `destek.html` (+ talep) | Liste (arama paneli), detay (akordeon) | G1 | G4 ile paralel |
| **G6 · Yasal, kurumsal, sistem** | `yasal.html` (dizin), `yasal-metin.html` (tek şablon, canlıdaki 26 metin), `hakkimizda.html`, `iletisim.html`, `kunye.html` (SSS canlıda ayrı sayfa değil; Çözüm Merkezi ve Pro içinde → karar), hata/sistem: `bulunamadi.html` (404), `yetki-yok.html` (403), `oturum-doldu.html` (419), `hata.html` (500), `bakim.html`, `baglanti-yok.html`, `guncelleme.html` | Detay (metin), boş durum bileşeni | Faz 2 | Herkesle paralel |
| **G7 · Açılış, tanıtım, tercihler** | `acilis.html`, `tanitim.html` (tanıtım kartları + diyet, alerjen, mutfak, seviye + bildirim/kamera izinleri), ilk açılış akışı | Ana hero dili, segment/chip, izin bileşeni | Marka varlığı kararı (splash) | G6 ile paralel |

Beyar'ın önerdiği sıra (1 kullanıcı → 2 tarif bulma → 3 video/püf/şef → 4 arama/bildirim/ayar → 5 yasal/hata/sistem → 6 açılış/tanıtım) korunmuştur. Önerdiğim iki değişiklik:
1. **G3 tarif türevleri** ayrı ve erken bir gruptur. Bunlar liste kökünün neredeyse birebir türevidir ve “Tümü” bağlantılarının ölü kalmaması için gereklidir.
2. **G7 açılış**, tıklanabilir prototipin giriş noktası olduğu için iskeleti Faz 3'te kurulur, içeriği sonda tamamlanır.

### 4.1 Her grubun kontrol listesi

- [ ] Web'deki bütün özellikler (docs/52 satırı) görünür, anlaşılır ve çalışır. Verisiz dal “doğrulanmadı” olarak işaretli.
- [ ] Durum matrisindeki her hal çizildi ve galeride seçilebilir (misafir/üye/Pro, dolu/boş/yükleniyor/kısmi/uzun, hata/bağlantı yok/izin reddi/oturum doldu, giriş kapısı, onay, snackbar, form hatası).
- [ ] Yalnız ortak bileşenler kullanıldı; sayfa CSS'i yalnız yerleşim içeriyor (grid/sıra). Lint 0.
- [ ] Stil denetimi 0: rol dörtlüleri, radius, boşluk, ikon sözlüğü, 44px, taşma, kontrast, bitişiklik.
- [ ] Bağlantı denetimi 0: ölü bağlantı ve bağlanmamış düğme yok; geri tuşu doğru.
- [ ] 360/390/430 × Chromium + WebKit görüntüleri; önce/sonra ve 3× bileşen kırpımları; en az bir eleştiri ve düzeltme turu.
- [ ] Gerçek veri: uydurma isim, sayı ya da görsel yok. Örnek durum açıkça “örnek” etiketli.
- [ ] Alan verimi: tek öğe için koca satır yok, gereksiz ayraç yok, ayraç yalnız arada.
- [ ] Kök ekran referans görüntüleri değişmedi (regresyon).
- [ ] docs/52 parite ve veri sözleşmesi satırları güncel.

---

## 5. Kalite kuralları (bütün planın parçası)

1. **Tek kanon:** Aynı rol aynı font/boyut. Aynı kavram aynı solid ikon. Aynı bileşen her yerde aynı. Sayfa kendi değerini tanımlamaz.
2. **Spacing:**
   - Hiçbir bileşen alt alta ya da yan yana bitişik değildir.
   - Bütün boşluklar token ölçeğindendir (4/8/12/16/20/24/32/40/48).
3. **Alan verimi:** Tek öğe için koca satır ya da sütun yoktur. Gereksiz satır, sütun ve ayraç yoktur; ayraç yalnız öğeler arasındadır.
4. **Parite:** Hiçbir web özelliği eksilmez (Mutfak Sırları ve reklam alanları bu tur hariç).
5. **Gerçek veri:** Uydurma içerik yoktur. Verisi olmayan alan çizilmez. Simülasyon açıkça belirtilir.
6. **Flutter uygulanabilirliği:**
   - Prototipte yalnız Flutter'da birebir kurulabilecek çözümler kullanılır.
   - Web'e özgü numaralar (`:has()` ile görünüm mantığı, `clip-path` maskeleri, View Transitions, `text-wrap` bağımlılığı, `hover`'a bağlı işlev) kullanılmaz.
7. **Ölçmeden başarı iddiası yok:** Her tamamlandı beyanı denetim çıktısına bağlanır.

---

## 6. Beyar'ın kararını bekleyenler (plan bunlara bağlı)

docs/50 §10 ve §11'deki T1–T20 / M1–M5. En kritikleri:
- primary renk değeri;
- kart radius'u (16/24);
- avatar 96;
- hatırlatma/bildirim ikonu;
- splash ve uygulama ikonu varlığı;
- sayfalama mı sonsuz kaydırma mı;
- Flutter'da justify.

Bunlara ek olarak docs/52 “Eklenmesini önerdiklerim” listesi.
