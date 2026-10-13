# 55 — Çalışma kılavuzu (compact'e dayanıklı)

Bu dosyayı okuyan bir ajan, başka bağlam olmadan bir sayfa grubunu yapabilmelidir. İlerleme: `docs/56-ilerleme.md`.
Kurallar sırası: kullanıcının son talimatı > bu dosya > `AGENTS.md`. **Git (add/commit/push) ve yayın YOK. Kullanıcıya soru sorma.**

## 1. Kök ve kaynaklar

- **Tasarım kökü (kanon):** `v3-app/ana-v3.html`, `liste-v2.html`, `detay-v2.html` (yayındaki `gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim-v3/` ile aynı; docs/55 §9). Bunlar tasarımın kendisidir; **değiştirilmez** (yalnız `ortak/` bağlantı katmanı bağlı).
- **İçerik/özellik kaynağı:** canlı https://dadagastro.com (yalnız GET; POST/giriş yok). Backend: `~/Developer/Revenge Projects/DadaMentor/DadaGastro` (SALT OKUNUR). Eski `~/Developer/Backend Projects/dadagastro` emekli.
- Kanon değerleri: docs/50. Bileşenler: docs/51. Sayfa envanteri/haller/veri sözleşmesi: docs/52. Plan: docs/53. Mobil desenler: docs/54.
- **Kapsam dışı:** Mutfak Sırları ve alt sayfaları, reklam alanları, Koleksiyon/Sezon/Günün Menüsü/Derleme/Sponsorlar (Beyar kararı 10). Menüde Mutfak Sırları satırları “Yakında” der.

## 2. Ortak katman (tek kök — değiştirme, kullan)

| Dosya | Ne | Kim değiştirir |
|---|---|---|
| `ortak/tokens.json` | **Tek değer kaynağı** (renk, tipografi rolleri, boşluk, radius, gölge, hareket, ölçü, ikon sözlüğü, alt menü sırası, köprü) | Yalnız yönetici |
| `ortak/uret/uret.mjs` | Üretici → `ortak/dg-tokens.css` (`--dg-*`), `ortak/dg-kopru.css` (eski adlar → `--dg-*`), `ortak/dg-tokens.js` (`DGTOKENS`: nav, icons, motion), `ortak/flutter/dg_tokens.g.dart` | Yalnız yönetici |
| `ortak/dg-bilesen.css` | Bileşen kütüphanesi (`.dgu-*`) | Yalnız yönetici (yeni bileşen: §2a) |
| `ortak/dg-ui.js` | Uygulama çekirdeği (`DG`) | Yalnız yönetici (yeni yardımcı: §2a) |
| `ortak/dg-baglanti.js` | Kök ekranları uygulamaya bağlar (alt menü, arama, giriş kapısı, alışveriş listesi, menü hedefleri) | Yalnız yönetici |
| `ortak/dg-duzeltme.css` | Kök ekran çelişki düzeltmeleri (detay değeri esas) | Yalnız yönetici |
| `ortak/veri/veri.js` | `DGVERI` gerçek veri (üreten: `ortak/uret/veri-cikar.mjs`) | Yalnız yönetici |
| `ortak/veri/icerik.js` | `DGICERIK` canlı metinler: yasal (26), sayfa (hakkimizda, kunye, pro, iletisim), puf (6) (üreten: `ortak/uret/icerik-cek.mjs`) | Yasal grubu ajanı çekiciyi genişletebilir |
| `ortak/veri/sayfalar.js` | `DGSAYFALAR` bütün sayfalar listesi (galeri + iskelet üretici + denetim) | Grup ajanı yalnız kendi grubunun `hazir: true` bayrağını ve kendi `haller` satırlarını |
| `ortak/uret/sayfalar.mjs` | `uygulama/*.html` iskeletlerini üretir (çalıştır, değiştirme) | Yalnız yönetici |
| `ortak/sayfalar/<js>.js` (+ isteğe bağlı `<js>.css`) | **Grubun sayfa çizim dosyası** — ajanın asıl işi | Grup ajanı |

### 2a. Yeni bileşen kuralı (Beyar, 12 Ekim)

> “Component gereksinimi çıkarsa ortak bileşenlere ekle, önce kanona uydur sonra kullan.” · “Ortak katmana (ortak/ altındaki dosyalar) yalnız ANA ajan yazar. Alt ajan yeni bileşen ihtiyacı görürse kendisi eklemez; sana bildirir, sen kanona uydurup ortağa eklersin, alt ajan oradan kullanır.”

1. Tekrar kullanılabilir bir parça gerekiyorsa (seçim kartı, bayrak seçimi, istatistik şeridi…) **sayfaya özel CSS ile yazılmaz** ve **alt ajan ortak dosyaya yazmaz**. Alt ajan yöneticiye (SendMessage / rapor) ad, amaç ve kullanan sayfaları bildirir; bağımlı olmayan işlere devam eder.
2. Yönetici bileşeni kanona uydurur (yalnız token; seçim kutusu 22px radius 4, `.choice-mark .fa-check`; seçili = tint zemin + tomato-deep kenar; dokunma ≥44; odak görünür; kontrast ≥4.5:1; daire yalnız avatar), `ortak/dg-bilesen.css` (`.dgu-<ad>`) + gerekiyorsa `DG.<ad>()` olarak ekler, kataloğa (`ortak/sayfalar/temel.js`) ve `docs/51`'e (Flutter karşılığıyla) yazar, API'yi alt ajana bildirir.
3. Alt ajan bileşeni yalnız bu API ile kullanır. Var olan bileşen işini görüyorsa yenisi istenmez; aynı kavramın ikinci biçimi yok.
4. Alt ajanın yazabildiği `ortak/` dosyaları yalnız kendi `ortak/sayfalar/<js>.js|.css` dosyaları ve `ortak/veri/sayfalar.js`'teki kendi grup satırlarıdır.

### 2b. Giriş gerektiren sayfalar (Beyar, 12 Ekim)

> “Giriş gerektiren her sayfanın iki hâli olsun: misafir (giriş duvarı) ve giriş yapılmış, gerçek veriyle dolu hâl. Galeride ikisi yan yana görünsün.”

Giriş gerektiren her sayfa: `?oturum=misafir` → giriş duvarı (`DG.girisDuvari`, giriş/kayıt `?donus=` ile geri döner) ve `?oturum=uye&ornek=1` → gerçek veriden (DGVERI tarifleri, şefleri…) kurulmuş dolu hal, cihaza yazılmaz. Ekranda “Örnek görünüm” kutusu yok (§2c); açıklama galeri satırında. `ortak/veri/sayfalar.js` satırında `ikili: ['oturum=misafir', 'oturum=uye&ornek=1']` alanı verilir; galeri bu sayfaları iki çerçeve yan yana gösterir.

### 2c. Ekranda iç not yok (Beyar, 12 Ekim)

> “Patronun göreceği ekranlarda ‘Örnek görünüm: … cihaza kaydedilmez’ gibi iç not kutuları olmasın; bunları kaldır, gerekiyorsa yalnız galeri açıklamasına yaz.”

Prototipin kendisini anlatan hiçbir kutu/şerit/etiket ekranda çizilmez (“Örnek görünüm”, “Önizleme”, “cihaza kaydedilmez”, “veri yok”, “simülasyon”). Gerekli açıklama `ortak/veri/sayfalar.js` satırındaki `aciklama` alanına tek cümle yazılır; galeri çerçevenin altında gösterir. Canlıda da olan kullanıcı mesajları (boş durum, hata) ve eylem sonrası snackbar kalır; snackbar “önizleme/prototip” demez. Verisi olmayan bölüm çizilmez (not kutusu yerine). Bu kural AGENTS.md'deki “önizleme olduğunu açıkça belirt” maddesinin yerine geçer.

### 2d. Form alanı paritesi (Beyar, 12 Ekim)

> “Webdeki hiçbir özellik atlanmayacak… her sayfa yapılmadan önce canlıdaki karşılığı alan alan okunacak.”

Her sayfa yazılmadan önce canlıdaki karşılığı (dadagastro.com, yalnız GET; backend deposu salt okunur) alan alan okunur. Her alan, seçici, ipucu/yer tutucu metni, zorunluluk yıldızı, karakter sayacı, doğrulama mesajı ve onay kutusu (KVKK, üyelik sözleşmesi, ileti izni…) mobilde birebir bulunur. Telefon alanı ortak `DG.telefon` bileşenidir (bayraklı ülke kodu seçici + numara; varsayılan ve liste webden). Karşılaştırma docs/52 §10'da sayfa sayfa “web alanı → mobil karşılığı” tablosudur.

### 2e. Banner birleşimi: yalnız iki kalıp (Beyar, 12 Ekim)

> “Banner/kapak görselinden beyaz alana KESKİN geçiş hiçbir sayfada olmayacak.”

1. **Gülücük** (hero birleşimi) — ana-v3 hero alt kenarı birebir: alt köşeler `--radius-card` (24) + altında `0 4px 0 var(--tomato)` çizgi + 4 alt boşluk (kaynak `six-heroes.css:69`). Profil/şef kapakları, hero'lu sayfalar. Avatar kavisin üstüne oturur.
2. **Kubbe** (liste birleşimi) — liste-v2 birebir: banner (320) ve sayaç sabit (sticky), üst köşeleri `--radius-sheet` (24) beyaz panel 24 bindirerek kaydırınca üstüne gelir; panel yapışınca köşeler düzleşir. Banner'lı bütün liste sayfaları.
**Genel (Beyar ek):** kural yalnız fotoğraflı banner için değil, HER koyu / primary / gradyan / görselli üst alan için geçerlidir (ör. Pro alanı, koyu bölüm başı). Böyle bir alandan beyaz içeriğe geçilen her yerde beyaz panel üstten radius'lu (kubbe) olur ve üst alanın üzerine biner; hero tipi alanlarda gülücük kullanılır. Düz, keskin yatay geçiş hiçbir ekranda yok.
Başka birleşim (düz kesik, alt gölge, ayrı gradyan) yazılmaz. Web: kubbe = `tur: 'banner'` (`.dgu-banner` + `.dgu-panel`) ya da koyu üst alan için `.dgu-kubbe-ust` + `.dgu-kubbe-panel`; gülücük = `.dgu-gulucuk` (profil başı `DG.profilBas` hazır). Kullanım tablosu: §2f.

### 2f. Banner birleşimi kullanım tablosu (12 Ekim taraması)

| Sayfa | Üst alan | Kalıp |
|---|---|---|
| `ana-v3.html` | Hero (fotoğraf sahnesi) | Gülücük — kaynak (`six-heroes.css:69`) |
| `liste-v2.html` | Liste banner'ı + sayaç | Kubbe — kaynak (`liste-v2.css` 1 · Sayfa düzeni) |
| `detay-v2.html`, `tabaktan-tarif.html?durum=taslak` | Tarif fotoğrafı | Kubbe (kök `.content-panel` 24 bindirme) |
| `uygulama/videolar.html` | Video Mutfağı banner'ı + sayaç | Kubbe (`tur: 'banner'`) |
| `uygulama/puf-noktalari.html` | Püf Noktaları banner'ı + sayaç | Kubbe (`tur: 'banner'`) |
| `uygulama/puf.html` | Püf noktası fotoğrafı | Kubbe (`tur: 'banner'`) |
| `uygulama/profil.html` | Profil kapağı (header arkasına uzanır) | Gülücük (`DG.profilBas`), avatar kavisin ortasında |
| `uygulama/sef.html` | Şef kapağı | Gülücük (`DG.profilBas`) |
| `uygulama/profil-duzenle.html` | Kapak seçici önizlemesi | Gülücük, avatar kavisin ortasında |
| `uygulama/pro.html` | Koyu Pro alanı | Gülücük (header arkasına uzanır) |
| `uygulama/video.html` | Oynatıcı | Gülücük |
| `uygulama/tercihler.html`, `tercihler-2.html` | Fotoğraf şeridi | Kubbe (beyaz panel radius 24 ile biner) |
| `uygulama/karsilama-3.html` | Açılış sahnesi | Gülücük (alt kavis) |
| `acilis*`, `karsilama.html`, `karsilama-2.html`, `tercihler-3.html`, Tabaktan kamera | Tam ekran koyu | Beyaza geçiş yok |
| G5 (arama, ayarlar…), G6 (yasal, sistem) | Ajan raporuyla eklenecek | — |

### 2g. Metin iki yana yaslı — ortak kural (Beyar, 12 Ekim; önceki “sola yaslı” kararı geri alındı)

> “Her yazı, her metin justify olacak. Bu sayfa sayfa yapılmayacak, ortak katmanda tek kural olarak kurulacak.”

**Metin justify, ortak katmandan gelir; sayfada ezilmez.** Taban `ortak/dg-metin.css` (bütün sayfalarda en son): `text-align:justify; text-align-last:left; hyphens:auto`, `html lang="tr"`. Ortalı blokta (boş durum, karşılama) yalnız `text-align:justify; text-align-last:center` yazılır; sayfa CSS'inde `text-align:left|center|start` yazılmaz (sayı sütunlarının `right` hizası serbest). Paragraflarda kaynaktaki bold vurgular korunur; vurgusuz düz paragraf bırakılmaz (malzeme, miktar, süre, sıcaklık, ayırt edici ifade kalın). Denetim: `node v3-app/ortak/denetim/metin.mjs` → 0.

### 2h. Kök ekran koruması (Beyar, 12 Ekim — kalıcı)

> “Kök ekranlar yalnız onaylı kararlar kadar değişebilir (primary rengi, alt menü 4. öğe = Kaydettiklerim, justify); bunun dışında birebir referans gibi olacak.”

- Onaylı ana sayfa: **`v3-app/ana-v3.html`** (yayındaki `yeni-tasarim-v3/` ana sayfası). Ana sayfaya giden her bağlantı (logo, alt menü “Ana Sayfa”, açılış “Başla/Atla”, giriş/kayıt sonrası, eski `index.html` hedefleri) yalnız buraya gider; eski/alternatif ana sayfa dosyalarına bağlantı yok.
- **Ortak katmanda (`ortak/` altındaki her dosya, kök CSS'lere dokunan her değişiklik) yapılan her değişiklikten sonra:** `node v3-app/ortak/denetim/referans.mjs <ad> --karsi once` çalıştırılır. Stil anlık görüntülerinde konum/ölçü/font farkı **0** olmalı; piksel farkı yalnız onaylı kararlardan (primary tonu, 4. menü öğesi, justify paragraf) gelebilir. Kök ekranı bozan değişiklik “bitti” sayılmaz, geri alınır.
- `dg-duzeltme.css` D2–D7 bu kuralla geri alındı (eski/dg-duzeltme-D2-D7-20261012.css). Alt menü 4. öğesi kökte `dg-baglanti.js` ile her yeniden yazımda Kaydettiklerim'e bağlanır.

### 2i. Boş satır yasağı ve küçük köşe (Beyar, 12 Ekim)

> “Tek küçük öğenin bir satırı kaplayıp sağının boş kaldığı yerler olmayacak.”

- Tek küçük öğe (tek çip, tek kısa düğme, tek sayaç) kendi satırını kaplamaz: başlık satırına, yatay kaydırmalı çip şeridine ya da komşu öğenin yanına alınır. Örnek: liste seçici çipler + “+ Yeni liste” aynı şeritte; seçili listenin adı ve menüsü başlıkla aynı satırda.
- Küçük çip ve rozet köşesi yüksekliğe oranla ana düğme sertliğinde (48/12): 32–36 çip → `--dg-radius-chip-sm` (8), 20–24 rozet → `--dg-radius-badge-sm` (6). 44'lük çip, düğme, alan, kart, sekme, sheet köşeleri değişmez.
- Durum gösteren her yer `DG.durumRozet(kod)` kullanır (Taslak, İncelemede, Onay bekliyor, Yayında, Reddedildi…; tonlar `color.status`).

### 2j. Stilsiz sınıf ve radius denetimi (Beyar, 12 Ekim — kalıcı)

- `node v3-app/ortak/denetim/stilsiz.mjs [--ayrinti]`: sayfada kullanılan ama hiçbir yüklenen CSS kuralında geçmeyen sınıflar (JS kancaları ve kök ekran runtime sınıfları ayrı tutulur). **Her grup bitince çalıştırılır; uygulama sayfalarında sonuç 0 olmadan grup “bitti” sayılmaz.** Stilsiz sınıf ya ortak bileşene bağlanır, ya eksik bileşen ortak katmana eklenir (yönetici), ya da işlevsizse işaretlemeden kaldırılır.
- `node v3-app/ortak/denetim/radius.mjs`: ortak katman dışındaki CSS ve satır içi stillerde token yerine elle yazılmış `border-radius` (rapor; değişiklik yönetici kararıyla).

### 2k. Akordiyon sınırı (Beyar, 12 Ekim)

> “Akordiyon yalnız uzun, bilgi/ayar türü sayfalarda (Rozetlerim aileleri, Ayarlar, SSS, yasal metinler, yardım) kullanılır. Onboarding, tercihler, form adımları, içerik ve keşif sayfalarında kullanılmaz.”

`DG.akordiyon` yalnız bu sayfa türlerinde. Bağlı olanlar (12 Ekim): Rozetlerim (rozet aileleri), Çözüm Merkezi SSS konuları, Ayarlar › Bildirim, Güvenlik, Dil ve Bölge, yasal metinler (yasal grubu raporuyla). Tercihler 2'deki akordiyon kaldırıldı (yeniden tasarım). Dolapta Ne Var süzgeç grupları ve liste filtre sheet'i (kök) akordiyon değil, sheet içi süzgeç gruplarıdır.

### 2l. Dikey yığın kuralı (Beyar, 12 Ekim)

> “Açıklama metni düğmeye yapışık … Ortak katmanda dikey boşluk (stack) kuralı tanımla, token'lardan … Sayfada margin elle yazılmasın.”

Başlık → açıklama 8 · açıklama → düğme / etkileşimli öğe en az **20** (kapsayıcı boşluğu dahil) · tam genişlik düğmeler arası 12 · bölümler arası 32 (`.dgu-bolum`). Kural `ortak/dg-bilesen.css` “Dikey yığın kuralı” bloğundadır; içerik blokları `.dgu-yigin` / `-12` / `-8` ile dizilir, sayfada margin yazılmaz. Denetim: `node v3-app/ortak/denetim/yakinlik.mjs [--ayrinti]` (metin → etkileşim < 16 ihlal; bileşen içi hariç) → 0.

### 2m. Web = içerik ve özellik kaynağı; görünüm = mobil + kanon (Beyar, 12 Ekim)

> “Web, İÇERİK ve ÖZELLİK kaynağıdır; görünüm değil. Webdeki her özellik ve bilgi birebir olacak, hiçbiri atlanmayacak; ama yerleşim mobile uygun ve tamamen bizim kanonumuzla tasarlanacak … Web düzeni kopyalanmayacak (örn. webdeki soldaki dikey paylaş sütunu mobilde sheet olur).”

Her özellik/bilgi canlıdan alan alan alınır (§2d); yerleşim, bileşen, tipografi rolü, köşe, boşluk, ikon ve justify yalnız kanondan. Eski tasarım referansları (ör. dadamutfak-view puf-noktasi-detay-v1) yalnız açıkça söylenen parça için (orada: blok listesi yapısı) kullanılır.

Uygulama (K21): **yazar satırı** `DG.yazarSatir` (avatar 40 · ad + kademe rozeti · tek meta satırı “4 Ağu 2026 · Güncellendi 12 Eyl · 2 dk okuma” · sağda Takip Et; sığmazsa rozet adın altına iner; okuma süresi metinden hesaplanır) — yazarı ve tarihi olan içerik detayları; videolarda canlı yazar/tarih verisi olmadığından çizilmez, tarif detayı kök ekrandır (kendi şef kartı). **İçerik bloğu** bloklar arası çizgi yok, numara rozeti + boşluk; varyasyonlar ve içerik türleri püf detayının galeri durum çipleridir (`puf.html?gorunum=liste|duz|gorsel|tam`); canlıda blok görseli olan püf olmadığından görselli blok ilk blokta püfün kendi kapak fotoğrafıyla. **Paylaş sheet'i** `DG.paylas` = kök detay-v2 paylaş ızgarası (Facebook, X, WhatsApp, Telegram, Pinterest, E-posta + Kopyala). **Kayan alt eylem çubuğu** `s.kayanBar` / `DG.eylemCubugu` (küçük görsel + başlık; Kaydet, Faydalı Buldum, Yorumlar → yorum bölümü, Paylaş → sheet): panel header'a gelince belirir, başa dönünce gizlenir; tarif detayında kök alt çubuk zaten var, videoda karşılığı yok. **Banner header'ı** kök ana-v3 gibi: şeffafken arama ikonu yok, solid olunca gelir. Galeri en başta **Ana ekranlar**: ana-v3, liste-v2, detay-v2 — diğer bütün ekranlarla aynı telefon çerçevesi, başlık, “Tek başına aç” ve durum çipleri; sunum sayfası galeride ayrı öğe değildir (Beyar, 12 Ekim).

### 2p. Galeride yalnız gerçek sayfalar; ekranda yalnız gerçek içerik (Beyar, 12 Ekim)

> “Galeride yalnız uygulamada gerçekten var olan sayfalar olur; bileşen/varyasyon göstermek için ayrı sahte sayfa açılmaz (bileşen vitrini yalnız bilesenler.html'de).”
> “Uygulama ekranında yalnız gerçek içerik olur … Varyasyonun adı yalnız galerideki durum çipinde yazar. Bu kural bütün ekranlar için geçerli: ekranda iç açıklama, demo etiketi ya da yer tutucu metin kalmasın.”

Bir ekranın farklı hâli (içerik türü, boş, yükleniyor, üye…) aynı sayfanın adres parametresidir ve galeride **durum çipi** olarak görünür. Ana ekranlar diğerleriyle aynı telefon çerçevesindedir; sunum kartı yoktur. Kaldırılanlar (12 Ekim): `icerik-bloklari.html` (→ püf detayı çipleri), `hareket.html` + galeri “Hareket ve durumlar” grubu (→ bileşen kataloğunun bölümü), galeri sunum kartı. Temizlenen ekran içi notlar: Tabaktan “Örnek fotoğraf · Simülasyon”, “Kamera ve tanıma bu prototipte simüle edilir.”, “Giriş bu prototipte yerel üye önizlemesidir.”; Ayarlar/Profil “Örnek Üye” yedeği (→ örnek üyenin adı); Menüyü pişir “Örnek menü” (→ örnek üyenin menü adı); Tercihler “Seçimlerin bu cihazda saklanır”; Üyelik Sözleşmesi'nin canlıdaki yer tutucu cümlesi (→ “henüz yayımlanmadı” boş durumu). Açıklama gerekiyorsa yalnız galeri satırına yazılır.

### 2n. Tarif gösteren her ekran detay-v2'den türer (Beyar, 12 Ekim)

> “Uygulamada tarif gösteren her ekran (taslak, önizleme, Pro, misafir) detay-v2'nin ortak bileşenlerinden türer; ayrı tarif sayfası tasarlanmaz.”

Tabaktan Tarif taslağı, tarif ekleme önizlemesi, Pro/misafir görünümleri: hero, başlık, sayaçlar, sekmeler, malzemeler (porsiyon), adımlar, kubbe panel detay-v2 ile birebir. Farklar yalnız ortak bileşenle: durum rozeti + bilgi notu, alt sabit eylem alanı, yayın sonrası alanların (yorum, puan, takip) gizlenmesi.

Uygulama: **Tabaktan taslağı = `tabaktan-taslak.html`** — `detay-v2.html`'in birebir kopyası + iki betik: `ortak/sayfalar/tabaktan-taslak-veri.js` (kaynak tarifi bellekte taslağa çevirir: kapak = `?foto=`, yorum/galeri/benzer/tarih boş) ve `ortak/sayfalar/tabaktan-taslak.js` (Taslak rozeti, yapay zekâ notu, alt çubuk Düzenle · Yeniden çek · Kaydet → Editöre gönder → Tariflerim; puan, görüntülenme, Yorumlar sekmesi, şef kartı, benzerler, paylaş/kaydet gizli). Kayıt `dg-tariflerim`'e tarif-ekle biçiminde yazılır; Düzenle `uygulama/tarif-ekle.html?taslak=tabaktan-<slug>` (kapak dahil). Tabaktan sonucundaki “Senin tarifin” sekmesi bu sayfayı açar; geri “Benzer tarifler”e döner. detay-v2 değişirse taslak da değişir.

Tarif kartı: kök ekranlarla aynı **`ortak-kart.js` (DGCard)**; `DG.kart(t, 'card'|'tile'|'feature'|'row')` ile çağrılır. Kendi tarif kartını yazma.

### 2o. Hata, boş ve kenar durumları = ortak durum sahnesi (Beyar, 12 Ekim)

> “tanınamadı/bulanık/yemek yok/oluşturulamadı/çevrimdışı: fotoğraf merkezde tarama çerçevesi + durum görseli, güvence notu; başlık+açıklama bold; hiyerarşik eylemler; ‘Adını yaz’ arama; alt alan öneriler ya da 3 ipucu; header başlığı solda.”

Tek kalıp `ortak/dg-sahne.css` (+ `DG.durumSahne(o)`; `DG.hata(tur, true)` bunu kullanır). **Koyu** sahne: overlay zemin + primary ışık, ortada kullanıcının fotoğrafı tarama köşeleriyle (izin yoksa boş çerçeve), durum işareti, varsa güvence notu; beyaz panel kubbeyle biner. **Açık** sahne (sayfa içi hata): ikon rozeti + metin + eylem tek grup, dikeyde ortalı. Panel: başlık (sayfa rolü) + kısa açıklama (anahtar ifadeler bold), tek ana eylem + ikinciller (12 arayla), gerekiyorsa “Yemeğin adını yaz” satır içi arama, altta ya 3 ikonlu ipucu ya da yatay öneri şeridi; alt boş kalmaz. Kısa ortalı açıklamada justify boşluğu **ifadeyle** çözülür (tek satıra sığan ya da iki satırı dolduran cümle). Tabaktan Tarif (runtime) aynı CSS'i yükler, düğmeleri kendi `.button` ailesinden.

## 3. Sayfa iskeleti (otomatik)

`node v3-app/ortak/uret/sayfalar.mjs` her `uygulama/<dosya>.html` için aynı kabuğu üretir: tokens.css → dg-tokens.css → dg-kopru.css → Font Awesome → ortak-kart.css → ortak-baslik.css → ortak-menu.css → dg-bilesen.css → dg-sahne.css (→ varsa `ortak/sayfalar/<js>.css`); scriptler: dg-tokens.js, veri.js (+ icerik.js: yasal/icerik/ayarlar grupları), dg-ui.js, ortak-kart.js, ortak-menu.js, `ortak/sayfalar/<js>.js`, `DG.baslat()`. `<body class="dgu" data-sayfa="<id>">`. Çizim dosyası yoksa sayfa atlanır. **HTML'i elle yazma; iskeleti üret.**

## 4. Sayfa yazma sözleşmesi

```js
DG.sayfa('<id>', ctx => ({
  tur: 'sekme' | 'alt' | 'banner' | 'tam',   // sekme: logo+ara+zil+menü · alt: geri+başlık+menü · banner: fotoğraflı başlık · tam: header yok
  baslik: 'Sayfa adı',                         // belge başlığı + alt header başlığı (baslikHeader ile değiştirilebilir)
  banner: {baslik, alt, gorsel, sayaclar: [[değer, etiket]]},  // tur:'banner' için (gorsel v3-app'e göre yol)
  nav: 'home'|'recipes'|'saved'|'profile'|'find',  // alt menü göster + etkin öğe; yoksa alt menü yok
  bar: '<düğmeler>',                           // alttaki yüzen eylem çubuğu (detay ailesi)
  headerEylem: '<a class="dgu-hbtn">…</a>',     // alt header'da menüden önce ek ikon
  html: '…',                                   // içerik
  iskelet: DG.iskelet(4) | false,              // ?durum=yukleniyor gösterimi (varsayılan 4 kart)
  offlineIcerik: true|false,                   // ?durum=baglanti-yok: şerit + içerik (true) ya da tam sayfa hata
  menuAktif: '<ortak-menu id>',                // çekmecede etkin satır (home, recipes, videos, ask, pantry, tips, plate…)
  sonra(root, ctx) { /* olay bağlama */ }
}));
```
`ctx`: `{id, qs, durum, uye, pro, rol, veri: DGVERI, store}`. Kabuk genel halleri kendisi çizer: `?durum=hata`, `zaman-asimi`, `yukleniyor`, `baglanti-yok`. Sayfa kendi hallerini (`bos`, `hata-form`, `tamam`…) `ctx.durum` ile çizer. Galeri test parametreleri: `?oturum=misafir|uye|pro` (kalıcı değil).

**DG yardımcıları:** `ic(ad)` FA solid ikon · `I(kavram)` ikon sözlüğü (DGTOKENS.icons; ör. `I('save')`) · `esc` · `btn(metin,{tur:'ikincil'|'tonlu'|'metin', boy:'sm', href, ikon, attrs, tam})` · `bas(başlık,{href, metin})` bölüm başlığı + “Tümü →” · `seg(ad,[[k,metin,sayı]],seçili)` · `alan({ad,etiket,tur,yer,ikon,deger,hata,yardim,oto,zorunlu,cok})` · `secim(ad,metin,{tur:'radio',secili})` · `anahtar(ad,açık,aria)` · `satir({ikon,baslik,alt,href,sinif:'is-yikici'})` · `durum({ikon,baslik,metin,eylem,tam})` · `hata(tur,tam)` · `iskelet(n,'kart'|'satir')` · `onizleme(metin)` · `avatar(ad,20|40|56|96)` · `kart(t,tur)` · `bildir(mesaj,{eylem:{ad,href|fn}})` (eylemli 4000ms) · `sheet({baslik,govde,ayak})` · `onay({baslik,metin,evet})`→Promise · `kapi(tur,bekleyen)` giriş kapısı (tur: kaydet, takip, alkis, yaptim, menu, menuAc, liste, yorum, tarifEkle, puf) · `proKapi()` · `tarifBul()` · `kaydetDegis(slug)` · `tumunuListeyeEkle(slug)` · `geri()` · `tarifLink(slug)` · `listeLink({'kategori[]':slug})` · `sefLink(s)` · `tarif(slug)` · `sef(kullanici|ad)` · `sayi(n)` · `store.get/set(k)` (localStorage `dg-<k>`) · `kayitli.al()/yaz()` (kök runtime ile ortak kayıt listesi).

**Veri `DGVERI`:** `tarifler[]` {slug, baslik, kisa, alt, gorsel, kategori, dakika, goruntulenme, yazar, puan, puanSayisi, zorluk, porsiyon, birim, maliyet, aciklama, malzemeler[{ad,miktar,birim,grup}], ozellikler[], tarih, besin} · `kategoriler[]` {slug, ad, sayi, gorsel} · `mutfaklar[]` {slug, ad, sayi, bayrak} · `sefler[]` {kullanici, ad, unvan, tarif, takipci, uyelikYili, oneCikan} · `videolar[]` {baslik, gorsel, sure, izlenme} · `puflar[]` {baslik, gorsel, okunma, slug} · `facetler[]` (9 grup) · `temalar[]` · `istatistik[]` · `populer[]` · `dolapKatalog[]` {grup, malzemeler[]}. **Uydurma veri yok.** Verisi olmayan alan çizilmez; örnek hal gerekiyorsa açıkça “Örnek görünüm” etiketli olur.

**Yerel durum anahtarları:** `dg-oturum` {rol}, `dg-ilk`, `dg-alisveris` [{id,ad,miktar,tarif,isaretli}], `dg-takip` [kullanici], `dg-tercih`, `dg-dolap`, `dg-arama` [son aramalar], `dg-tariflerim`, `dg-menuler`; kayıtlı tarifler `dadagastro-prototype-saved` (kök runtime ile ortak). Giriş: `giris.html` başarıda `dg-oturum={rol:'uye'}` yazar, `?eylem=` (kaydet:slug · takip:kullanici · liste:slug) varsa `DG.eylemiTamamla` ile tamamlar ve `?donus=` adresine döner (`uygulama/…` ise aynı klasör, değilse `../`).

## 5. Bağlantılar (ölü link yok)

Uygulama sayfaları `v3-app/uygulama/` içindedir. Aynı klasöre düz ad (`profil.html`), kök ekranlara `../ana-v3.html`, `../liste-v2.html?…`, `../detay-v2.html?tarif=<slug>&donus=uygulama/<sayfa>` (`DG.tarifLink`), Tabaktan `../tabaktan-tarif.html?donus=…`. Kategori → `../liste-v2.html?kategori[]=<slug>` (`DG.listeLink`), mutfak → `mutfak[]`. **`href=""`, `#` ya da var olmayan dosya yasak.** Henüz yapılmamış bir sayfaya bağlantı verilebilir (dosya adı docs/56'da); grup bitince var olacak. Kapsam dışı hedef → `DG.bildir('Yakında')`.

## 6. Verilen kararlar (Beyar)

1. Primary = canlı header/logo rengi `#DC3D17`; koyu `#BA3413` (birincil düğme), derin `#9C2B10` (küçük metin), açık `#FBE6E1`. #E14827 kanondan çıktı.
2. Radius: fotoğraflı tarif/video kartı 16, yüzey kartı 24, kontrol ve bilgi kartı 12, sheet üst 24, seçim kutusu 4, daire yalnız avatar (+ radyo). Avatar ölçeği 20 · 40 · 56 · 96 (şef kartı 96).
3. Çelişkilerde detay ekranı değeri esas (sekme: dış 12/iç 4/düğme 44/GilroyBd 15).
4. İkonlar yalnız FA Free 6 Solid (sosyal: Brands); bildirim = hatırlatma = abone ol = çan. Kavram → ikon: `DGTOKENS.icons`.
5. Açılış: tek ekran karşılama + isteğe bağlı, atlanabilir tercihler. Splash: mevcut resmi beyaz SVG. Uygulama ikonu/monogram: yer tutucu, “marka sahibinden bekleniyor”.
6. Alt menü: Ana Sayfa · Tarifler · Ne Pişirsem (orta, Tarif bul paneli) · **Kaydettiklerim** · Profil (patron teyidi bekliyor; sıra `tokens.json` nav). Püf Noktaları yan menüde ve ana sayfada.
7. Liste yükleme: otomatik sonsuz kaydırma + iskelet kart; hata → “Tekrar dene”.
8. Alışveriş Listesi ayrı ekran (P1); detaydaki tek malzeme ve “Tümünü Listeye Ekle” buraya bağlı (dg-baglanti.js).
9. Tabaktan Tarif: mevcut akış aynen, yeni kanonla; “altta değişen öneriler” eklenmez; Kapat/Tarife git/Şimdilik değil gerçek hedeflere (v3-app kökünde `index.html`, `tarifler.html`, `tarif-detay.html` yönlendirmeleri var).
10. Fotoğraf üstü metinde alttan scrim zorunlu; “Geri al”lı snackbar 4000ms; pişirme modu adım yazısı 24/700; **metin iki yana yaslı (§2g; eski “sola yaslı” kararı geri alındı)**; Pro satışı yalnız paywall ekranı (ödeme akışı yok).
11. Mimari: tek kök + kendi üreticimiz (Seçenek A). Flutter'a şimdi geçilmez.

## 7. Kalite kuralları

- Tek kanon: aynı rol aynı font/boyut (`.t-page/.t-section/.t-featured/.t-sheet/.t-sub/.t-card/.t-body/.t-meta/.t-label/.t-stat`), aynı kavram aynı ikon, aynı bileşen her yerde aynı.
- **Elle değer yok:** satır içi `style` yalnız `background-image:url(...)` için. Renk/px/radius/gölge/süre literal yazma; gerekiyorsa `ortak/sayfalar/<js>.css` içinde token (`var(--…)`) ile.
- Spacing ölçeği 4/8/12/16/20/24/32/40/48; bitişik bileşen yok (en az 8); gutter 20; kart iç boşluğu 16.
- Alan verimli: tek öğe için koca satır yok; ayraç yalnız iki öğenin arasında (`.dgu-satirlar`).
- Dokunma ≥44; görünür odak; erişilebilir ad; reduced-motion.
- Metinler Türkçe ve canlıdaki metinlerle aynı; canlıda metin yoksa sade, uydurma iddia içermeyen ifade.
- Hiçbir web özelliği eksilmez (docs/52 satırı); verisiz dal “doğrulanmadı”.
- Önizleme işlemleri (kayıt, gönderim, ödeme) gerçek değildir; `DG.onizleme(...)` ya da bildirimde “Önizleme” denir.

## 8. Bir grubu yapma adımları (alt ajan)

1. docs/55 (bu dosya) ve docs/56'yı oku; docs/52'de grubunun satırlarını oku (özellikler, haller, canlı metinler).
2. `ortak/veri/sayfalar.js`'te grubunun sayfalarını ve `js` dosya adını bul. Gerekirse kendi grubunun `haller` satırlarını düzelt.
3. `ortak/sayfalar/<js>.js` yaz (gerekirse `<js>.css`). Örnek: `ortak/sayfalar/temel.js` (bileşen kataloğu), `acilis.js`.
4. `node v3-app/ortak/uret/sayfalar.mjs` (proje kökünden).
5. Test: `node v3-app/ortak/denetim/sayfa-test.mjs /private/tmp/<ad> uygulama/<sayfa>.html "uygulama/<sayfa>.html?<hal>" …` → her adres `ok`, taşma yok. Görüntülere bak (Read), en az bir düzeltme turu.
6. Bütün bağlantıların gerçek dosyaya gittiğini kontrol et.
7. `ortak/veri/sayfalar.js`'te grubuna `hazir: true` ekle; docs/56'da kendi satırlarını “bitti” yap (yalnız kendi satırların; tek tek Edit ile).
8. Ortak dosyalarda eksik/hata görürsen düzeltme; raporunda yöneticiye bildir.

## 9. Yerel sunucu ve adresler

`python3 -m http.server 8765 --bind 127.0.0.1` (proje kökünden; açık değilse arka planda başlat). Galeri: http://127.0.0.1:8765/v3-app/ekranlar.html (iç sürüm `ekranlar-ic.html`). Bileşen kataloğu: http://127.0.0.1:8765/v3-app/uygulama/bilesenler.html. Uygulama girişi: `uygulama/index.html`; sıfırlama: `uygulama/sifirla.html`.
Kök–yayın karşılaştırması (12 Ekim): yayındaki 48 dosya yerel `yayin/yeni-tasarim-v3` ile birebir; v3-app ile farklar yalnız yayın süreci eklemeleri (`?v=`, bağlantı yeniden yazımı, yayin-baglantilar.js); görüntü farkı WebKit 0, Chromium en çok 2/255 kanal (gürültü). Referans: `ortak/denetim/referans/` (`referans.mjs`).
