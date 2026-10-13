# 57 · Yeni modüller — Dolaptan Tarife ve Dolabım (Beyar V4, 13 Ekim 2026)

Kaynak: Beyar “V4 revize + iki yeni modül”. Kural: yalnız tasarım (git/yayın yok); ortak katman + kanon + token; gerçek veri (DGVERI);
örnek veriler dolu ve gerçekçi; ekranda iç not yok; justify istisnasız. Webde karşılık taraması (Laravel, salt okunur, 13 Ekim):
`dolabım / dolaptan / son kullanma` için web özelliği **yok** (yalnız şablon yorumlarında “envanter” sözcüğü) → çakışma yok.

Ad, ikon ve hedef **tek sabit**: `ortak/tokens.json → modules` (DGTOKENS.modules): `fridgeToRecipe` = “Dolaptan Tarife”
(`camera-retro`, Pro), `myFridge` = “Dolabım” (`boxes-stacked`). Arayüzde “envanter” sözcüğü geçmez.

Ne Pişirsem (orta düğme) paneli: 2×2 parçalı kutu (`DG.parcali(…, {kutu: 'izgara'})`, kökte dg-baglanti.js aynı işaretleme):
Dolapta Ne Var · Dolaptan Tarife (Pro) · Tabaktan Tarif (Pro) · Dolabım — ikon üstte, başlık altta, açıklama yok.
Not: önceki panelin “Ne Pişirsem” sihirbazı satırı panelden çıktı (Beyar listesi dört kutu); sihirbaza yan menüden ve
`ne-pisirsem.html` bağlantılarından ulaşılır.

---

## 1. Dolaptan Tarife (`uygulama/dolaptan-tarife.html`, js `dolaptan`)

**Fark (tanıtımda tek cümle):** “Dolapta Ne Var elle seçtiğin malzemelerle sitedeki mevcut tarifleri bulur; Dolaptan Tarife dolabının
fotoğrafından sana özel YENİ bir tarif üretir.”

**İskelet:** Tabaktan Tarif ile aynı (tanıtım sheet'i: yan yana 3 gri kutu `DG.parcali(…, {kutu: 'yatay'})` Çek · Tanı · Tarifin hazır →
Dolaptan'da “Çek · Düzelt · Tarifin hazır”; Pro'ya geç + Şimdilik değil yan yana; deneme hakkı notu + tam genişlik düğme; misafirde
giriş kapısı parçalı liste). İki seçenekli içerik geçişleri tarif detayındaki segment bileşeni (`DG.seg`, gri zemin + seçili beyaz kart + sayı rozeti). Sonuç tarif detayı detay-v2 dili
(Tabaktan taslağı gibi: `tabaktan-taslak.html` yaklaşımı — kök detay-v2 + AI etiketi + tahmini ölçü notu).

**Akış:** tanıtım → çek/yükle → tanıma (düzelt) → tercih → üretiliyor → sonuç (+ alternatifler) → kaydet/paylaş · geçmiş.

| Ekran / hâl | `?durum=` | İçerik |
|---|---|---|
| Tanıtım (üye, Pro değil) | `uye` | fark cümlesi + 3 kutu + Pro'ya geç / Şimdilik değil |
| Ücretsiz deneme | `deneme` | “N ücretsiz deneme hakkın kaldı.” + tam genişlik “… 1'ini kullan” + ikili |
| Misafir | `misafir` | giriş kapısı (Giriş Yap / Üye Ol / Şimdilik değil parçalı liste) |
| Çek / yükle | `kamera` | kamera vizörü, galeriden seç, birden çok foto (küçük resim şeridi, sil), devam |
| Kamera izni reddedildi | `izin` | izin istemi ortak bileşeni + galeriden yükle çıkışı |
| Tanıma | `tanima` | algılanan malzemeler düzenlenebilir çipler (sil, ekle, miktar); düşük güven işaretli (“emin değiliz”) |
| Tercih | `tercih` | porsiyon (sayaç), süre, beslenme tercihi (çip), hariç tutulanlar (Dolapta Ne Var hariç türleri) |
| Üretiliyor | `uretiliyor` | yükleniyor (ortak hareket/iskelet), adım metni |
| Sonuç | `sonuc` | segment “Senin tarifin / Alternatifler”; tarif detay dili; alternatif tarifler (DGVERI gerçek tarifleri, ortak kart) |
| Kaydet / paylaş | `sonuc&kayit=1` | Kaydet → yerel taslak (Tariflerim'e), Paylaş → ortak paylaş sheet'i |
| Geçmiş | `gecmis` | önceki üretimler listesi (dolu örnek); boş hâli `gecmis&bos=1` |
| Bulanık foto | `bulanik` | durum sahnesi + yeniden çek |
| Malzeme bulunamadı | `bulunamadi` | durum sahnesi + elle ekle / yeniden çek |
| Çok az malzeme | `az` | en az 3 malzeme uyarısı + ekle |
| Çevrimdışı | `baglanti` | ortak çevrimdışı sahnesi |
| Kota / Pro sınırı | `limit` | günlük sınır / Pro kapısı |

**Örnek veri:** fotoğraf olarak gerçek dolap/tezgâh görseli yok → mevcut gerçek malzeme görselleri (assets/malzeme, canlı siteden)
küçük resim olarak; tanınan malzemeler DGVERI.dolapKatalog'dan; üretilen tarif DGVERI'deki gerçek bir tarifin içeriğinden örnek AI
çıktısı (Tabaktan'daki gibi), “Yapay zekâ ile oluşturuldu” ve tahmini ölçü notu görünür.

## 2. Dolabım (`uygulama/dolabim.html`, js `dolabim`)

**Kurgu:** Aldığın ürünleri dolabına kaydet; son kullanma tarihi (SKT), açıldıysa açılış tarihi ve açıldıktan sonraki raf ömrü,
miktar, yer (Buzdolabı / Dondurucu / Kiler). “Sütün tüketilmesi için 2 gün kaldı” uyarısı; süresi yaklaşanlarla tarif önerisi.

**Durum (tek kaynak, localStorage `dg-dolabim`):** `{urunler: [{id, ad, katalog (dolapKatalog adı), miktar, birim, yer: 'buzdolabi'|'dondurucu'|'kiler',
skt: 'YYYY-MM-DD', acildi: bool, acilis: 'YYYY-MM-DD'|null, acikRaf (gün)|null, not}], gecmis: [{ad, sonuc: 'tuketildi'|'atildi', tarih}],
bildirim: {gun: 2, saat: '09:00', acik: true}}`. Kalan gün = min(SKT, açılış + açık raf ömrü) − bugün. Örnek doluluk `?ornek=1`
(gerçekçi: süt, yoğurt, beyaz peynir, tavuk göğsü, kıyma, ıspanak, domates, yumurta, tereyağı, dondurulmuş bezelye…; görseller
assets/malzeme — canlı sitenin gerçek malzeme görselleri).

**Veri modeli — iki takip türü (Beyar, 13 Ekim; Flutter ve API için):** “Taze ürünün paket SKT'si olmaz.”

| Alan | Tür | Paketli (`takip: 'paket'`) | Taze (`takip: 'taze'`) |
|---|---|---|---|
| `takip` | enum `paket` \| `taze` | zorunlu (eski kayıtta yoksa `paket`) | zorunlu |
| `skt` | date | zorunlu | `null` |
| `acildi`, `acilis` (date), `acikRaf` (gün) | bool / date / int | açıldıysa | `false` / `null` |
| `eklenme` | date | — (`null`) | zorunlu, en geç bugün |
| `tazelik` | int (gün, 1–30) | — (`null`) | zorunlu; “eklendiği günden önerilen tüketim süresi” |

- **Son gün:** paketli = min(`skt`, `acilis` + `acikRaf`); taze = `eklenme` + `tazelik`. Kalan gün = son gün − bugün (yerel gün, saat yok).
- **Etiket:** paketli “X gün kaldı” / “Bugün” / “X gün geçti”; taze “X gün içinde tüket” / “Bugün tüket” / “Tazeliği geçti”. Ton: yaklaşıyor ≤ bildirim günü uyarı, 0 bugün, < 0 geçti, fazlası başarı.
- **Tür önerisi (`takipOner`):** katalog grubu Sebzeler / Meyveler / Kırmızı Et / Tavuk ve Kümes / Balık ve Deniz Ürünleri ile taze otlar → `taze`; önerilen süre yeşillik 3, sebze/meyve 5 (dayanıklı kök/narenciye 14), kırmızı et 3, kümes 2, balık 1 gün. Yumurta, sucuk, pastırma, kavurma ve diğer gruplar → `paket`. Öneri varsayılandır; kullanıcı türü ve süreyi değiştirir (ör. paketli tavuk göğsü = paket + SKT).
- **Sıralama:** süresi geçmemişler kalan güne göre (en acil önce), süresi geçenler sonda; tarihsizler en sonda. Ana sayfa “Yakında bitecekler”, liste, takvim noktaları, “Bunları değerlendir” ve hatırlatmalar aynı kuralı kullanır (`DGDolabim.sirala`).
- **API önerisi:** `POST/PATCH /dolabim/urunler` gövdesi yukarıdaki alanlar; sunucu `son_gun` ve `kalan_gun`u hesaplayıp döndürebilir; bildirim işi `son_gun − bildirim.gun` gününde `bildirim.saat`te tetiklenir. Flutter: `enum DolapTakip { paket, taze }`, `DolapUrun.sonGun` getter'ı aynı formülle; tarih alanları DgDateField, tazelik DgStepper.

**Durum renkleri (kanon token):** taze = başarı/nötr, yaklaşıyor (≤ bildirim günü) = uyarı tonu, bugün = primary, geçti = koyu domates —
yalnız tokens.json renkleri.

| Ekran / hâl | parametre | İçerik |
|---|---|---|
| Liste | `ornek=1` | kalan güne göre sıralı; yer sekmeleri (Tümü/Buzdolabı/Dondurucu/Kiler); arama; durum rozeti; aylık özet (tüketilen/atılan) |
| Boş | — | durum sahnesi + Ürün ekle |
| Misafir | `oturum=misafir` | giriş iste (ortak giriş duvarı) |
| Ürün ekle | `ekle=1` | katalogdan ara (dolapKatalog), barkod okut, Dolaptan Tarife fotoğrafından toplu ekle; SKT, miktar, yer |
| Barkod / kamera izni reddedildi | `ekle=1&izin=red` | izin istemi ortak bileşeni |
| Ürün detay / düzenle | `urun=<id>` | SKT, açıldı + tarihi, açık raf ömrü, miktar, yer, not; Tüketildi / Atıldı / Alışveriş listesine ekle |
| Bunları değerlendir | `degerlendir=1` | süresi yaklaşanlar + DGVERI eşleşen tarifler; “Dolapta Ne Var'da bunlarla ara” (`dolapta-ne-var.html?malzeme=a,b`) |
| Bildirim ayarları | `bildirim=1` | kaç gün kala, saat; aç/kapa |
| Örnek bildirimler | `bildirim=1&ornek=1` | bildirim kartları (“Sütün tüketilmesi için 2 gün kaldı”) |
| Çevrimdışı | `durum=baglanti-yok` | ortak çevrimdışı sahnesi (yerel liste görünür) |

**Bağlantılar:** Alışveriş listesi modülü var (`uygulama/alisveris-listesi.html`, yerel `dg-alisveris`) → “Alışveriş listesine ekle”
oraya yazar. Ana sayfa: “Yakında bitecekler” bloğu yalnız Dolabım'da ürün varsa (kalan ≤ 3 gün olan ilk ürünler; yoksa blok yok) —
dg-baglanti.js ile kökte (ana sayfa bloğu ortak; Dolabım verisinden). Ürün yoksa blok hiç çizilmez.

## 3. Ortak takvim — Flutter `table_calendar` eşlemesi (Beyar V4 EK 6, 13 Ekim)

Web/prototip: `window.DGTakvim` (ortak/dg-takvim.js + .css; galeri `uygulama/bilesenler.html` “Takvim”). Flutter'da tek widget `DgCalendar`
(table_calendar üstünde), tema yalnız tokens.json'dan; ekrana özel takvim ya da `showDatePicker` yok.

| DGTakvim | table_calendar | Not |
|---|---|---|
| `gorunum: 'ay' \| 'hafta'`, `gorunumSec` (ortak segment) | `calendarFormat: CalendarFormat.month / .week`; `availableCalendarFormats` boş, format değişimi DgSegment ile | Format düğmesi gizli (`formatButtonVisible: false`). |
| `odak`, ok düğmeleri (`data-tk-git`) | `focusedDay`, `onPageChanged` | Başlık: `headerStyle` + `titleTextFormatter` → “Ekim 2026” / “12–18 Ekim 2026”. |
| Başlığa dokun → ay/yıl paneli | `onHeaderTapped` → 3×4 ay ızgarası (DgChip ailesi) | |
| `secili`, `mod: 'tek'` | `selectedDayPredicate`, `onDaySelected` | |
| `mod: 'aralik'`, `aralik: [bas, son]` | `rangeSelectionMode: RangeSelectionMode.toggledOn`, `rangeStartDay`, `rangeEndDay`, `onRangeSelected` | Bant `tomato-tint`, uçlar `tomato-deep`. |
| `noktalar: {iso: [ton…]}` (en çok 3) | `eventLoader` + `calendarBuilders.markerBuilder` | Nokta = seçim kutusu küçük kademesi; tonlar durum rozeti token'ları. |
| `min`, `max`, `kapali` | `firstDay`, `lastDay`, `enabledDayPredicate` | Devre dışı gün üstü çizili soluk. |
| `bugun` | `currentDay` | Bugün: 2px primary iç halka. |
| `gecis: false`, `baslik` | `headerVisible` özel başlık, `availableGestures: AvailableGestures.none` | Haftalık menü şablonu. |
| Türkçe, Pazartesi | `locale: 'tr_TR'`, `startingDayOfWeek: StartingDayOfWeek.monday` | `daysOfWeekStyle` etiket rolü, büyük harf. |
| `DGTakvim.sec(o)` | `DgSheet` içinde `DgCalendar` + hızlı çipler (`DgChip`) + `DgButtonPair` (Vazgeç / Seç) | Hızlı çip bugünden sayar (3 gün, 1 hafta, 1 ay; geçmiş için negatif), aralık her zaman sıralı. |
| `DGTakvim.alan(o)` | `DgDateField` (DgInput görünümü, `readOnly`, `onTap` → sheet) | Değer “15 Ekim 2026, Perşembe”; hata/yardım ortak alan dili. |

Hücre 44 dokunma hedefi, seçili/bugün kontrol radius'u (12); boşluk ve yazı rolleri tokens.json.
Kullanım yerleri: Dolabım SKT + açılış tarihi + Takvim görünümü, profil düzenle doğum tarihi (devre dışı), haftalık menü (sabit hafta),
bildirimler tarih aralığı süzgeci.
