# 42 · Tarif detay v2 revizesi

Tarih: 9 Ekim 2026. Temel: `detay-1.html` (onaylı referans, canlı tarif detayının mobil karşılığı) — dokunulmadı.
Paralel çalışma kuralı uygulandı: `ana-v3*`, `ana-sayfa-v3*`, `liste-v2*`, `liste-sayfa-v2*`, `AGENTS.md`, `tokens.css`, `app.css`,
`ld-source.js` ve diğer ortak dosyalar, kök dosyalar ve `yayin/` yalnız okundu. Git işlemi ve yayın yapılmadı. Yerel sunucu yeniden başlatılmadı.

## Yerel adresler

| Ne | Adres |
|---|---|
| Detay v2 (Tavuk Curry) | http://127.0.0.1:8765/v3-app/detay-v2.html |
| Karşılaştırma galerisi (detay-v2 ↔ detay-1, 390×844) | http://127.0.0.1:8765/v3-app/detay-sayfa-v2.html |
| Uzun başlık (2 satır + "…") | detay-v2.html?tarif=iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis |
| Alternatif malzeme + alerjen + besin değerleri + yorum | detay-v2.html?tarif=sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi |
| Çok yorumlu (5 yorum, yanıt, dağılım) | detay-v2.html?tarif=kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas |
| Mısır koçanı jölesi (alternatifler, adım görselleri, puansız yorumlar) | detay-v2.html?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole |
| Sekme doğrudan | `&sekme=hazirlanis` · `&sekme=yorumlar` (ya da `#adimlar` / `#yorumlar`) |

## Değişen / yeni dosyalar (hepsi detay-v2'ye özel)

| Dosya | Ne |
|---|---|
| `v3-app/detay-v2.html` | detay-1 kopyası; kendi CSS/JS'i, `data-choice="v2"` (bağlantılar `liste-v2.html` / `detay-v2.html`'e gider) |
| `v3-app/detay-v2.js` | Bileşim katmanı: kaynak düğümleri taşır, işleyicileri korur; değişen bloklar aynı veriden yeniden çizilir |
| `v3-app/detay-v2.css` | Yalnız bu ekran; değerler token'dan |
| `v3-app/detay-v2-aciklama.js` | 32 tarifin web açıklama tam metni (canlıdan salt okuma; prototipteki `description` webin meta özetiydi) |
| `v3-app/detay-v2-tarifler.js` | Mısır koçanı jölesi + benzer tarifleri (4 reçel/jöle), prototip şemasında; runtime "tarif" parametresini okumadan hemen önce belleğe eklenir |
| `v3-app/detay-sayfa-v2.html` | Karşılaştırma galerisi |
| `v3-app/docs/42-detay-v2-revize.md` | Bu rapor |
| `v3-app/docs/detay-v2-qa.mjs` (+ `detay-v2-qa.json`) | Chromium + WebKit, 360/390/430 doğrulaması |
| `v3-app/docs/detay-v2-contrast.mjs` (+ `.json`) | Başlık bloğu kontrastı (en açık arka plan pikseli) |
| `v3-app/docs/detay-v2-scroll-compare.mjs` (+ `.json`) | liste-v2 ↔ detay-v2 kaydırma, header altı 4 px piksel taraması |
| `v3-app/docs/detay-v2-extract.mjs` | Canlı tarif sayfasından prototip şemasına çıkarım |
| `v3-app/docs/detay-v2-live-capture.mjs` | Canlı sayfa bölüm kırpımları (karşılaştırma) |
| `v3-app/docs/screenshots/detay-v2/` | Görüntüler; `once/` ilk tur, `kaydirma/` kaydırma, `canli/` canlı web kırpımları |

## Web parite tablosu (canlı sayfa sırası)

Kaynak: https://dadagastro.com/tarif/sebzeli-tavuk-sote-tavada-pratik, Tavuk Curry ve Mısır Koçanı Jölesi canlı sayfaları (390 genişlikte DOM dökümü + kırpım, `canli/`). Laravel blade dosyaları yardımcı kaynak; çelişkide canlı esas alındı.

| # | Web bölümü (canlıdaki adı/yeri) | Webde nasıl | Mobilde nerede / nasıl | Durum |
|---|---|---|---|---|
| 1 | Yapışkan eylem çubuğu `.rd-actbar` | Tarif adı, Ben de Yaptım (sayı), Eline Sağlık (sayı), Yorumlar, Kaydet, Paylaş | Alt çubuk: Ben de Yaptım / Eline Sağlık / Yorumlar sayaçlı + Pişirmeye Başla; Kaydet ve Paylaş header'da | ✓ |
| 2 | Breadcrumb | Ana sayfa › Tarifler › Kategori › Tarif | Geri düğmesi (liste-v2) + başlık bloğundaki kategori etiketi kategori listesine gider | Mobil karşılığı |
| 3 | Sahne `.rd-stage` | Kapak (galeri grubu), kategori çipi, rozetler (Editör Onaylı / Diyetisyen), başlık, yıldız + puan + "N değerlendirme", görüntülenme (mobil webde gizli), "N kişi bu tarifi yaptı" (mobil webde gizli), kaydet, video | Sabit kapak (dokununca galeri), kategori, başlık ≤2 satır, alt başlık 1 satır, kapsüller: puan · değerlendirme (→ Yorumlar), maliyet, görüntülenme; rozet verisi varsa kapsül; video verisi varsa "..." menüsünde | ✓ (rozet/video verisi örnek tariflerde yok) |
| 4 | Künye `.kc-card` | Porsiyon · Hazırlık + Pişirme (20 dk + 35 dk) · Zorluk · Pişirme Derecesi (varsa) | Özet şeridi tek satır: Toplam süre · Zorluk · Porsiyon (porsiyon adımlayıcıyla canlı). Hazırlık / Pişirme / Pişirme derecesi "Tarif bilgileri" akordeonunda | ✓ (kullanıcı kararıyla süre ayrımı akordeona) |
| 5 | Künye çipleri `.kc-chips` | Mutfak çipi (bayrak) + "ÖZELLİKLER": beslenme etiketleri (Glutensiz, Vegan, Laktozsuz…) + bütçe | Özet şeridinin altında yatay çip şeridi: bayraklı mutfak + "ÖZELLİKLER" etiketi + web ikonlu beslenme çipleri + bütçe; her çip liste filtresine gider | ✓ (önceki "alerjen kutusu" hatası düzeltildi) |
| 6 | Yazar satırı `.art-hmeta` | Avatar, ad, unvan, yayın tarihi, son güncelleme | Şef satırı: avatar, ad, "unvan · N tarif · N takipçi"; tarihler "Tarif bilgileri"nde | ✓ |
| 7 | Açıklama `.rd-sub` | Tam metin | Tam metin (detay-v2-aciklama.js); 3 satır + fade, "Devamını oku / Daha az göster" | ✓ |
| 8 | Malzemeler başlığı | "Malzemeler · N malzeme · X kişilik için" | Sekme "Malzemeler N"; porsiyon kutusu "Porsiyon · N malzeme" + adımlayıcı (kişi sayısı yalnız burada) | ✓ |
| 9 | Porsiyon `.serv-step` | − X kişilik PORSİYON + | Kontrol radius'lu kutu, − / X kişilik / + | ✓ |
| 10 | Malzeme listesi `.ing-list` | Gruplar (BÜYÜK HARF başlık), satır: seçim kutusu, miktar (primary, solda, sabit sütun), ad + not, sepet, varsa değiştir | Aynı: gruplar büyük harf, miktar primary ve sabit sütunda, ad sağda, sepet + (varsa) shuffle; işaretli satır gri + çizgi; ölçü ⓘ → "Ölçü karşılığı" sheet | ✓ |
| 11 | Alternatif `.ing-pop` | "Yerine ne kullanabilirim?" + ad kalın — açıklama | Shuffle → sheet "Yerine ne kullanabilirim?", liste; mobil önizlemedeki "Bununla değiştir / Orijinale dön" korunur | ✓ |
| 12 | Sponsor satırı | "Sponsorlu Öneri · marka" | Kaynak runtime satırı korunur (veride yok) | ✓ (veri yok) |
| 13 | `.ing-foot` | Tümünü Listeye Ekle (birincil) + "Miktarlar porsiyona göre otomatik güncellenir" | Aynı; birincil düğme | ✓ |
| 14 | Alternatif Tarifler `.alt-block` | İlgili tarif bağlantıları | Malzemeler sekmesi sonu (veri varsa) | ✓ (veride yok) |
| 15 | Şef kartı `.side-chef` | Avatar, ad, unvan rozeti (ör. MUTFAK MERAKLISI), "YYYY'dan beri üye", Takip Et, Tarif / Takipçi, (plan varsa) Abone Ol | Tek şef satırı (ikinci kopya kaldırıldı): unvan · tarif · takipçi; Takip et (ikincil küçük) + Abone ol (üçüncül metin eylemi) | ✓ |
| 16 | Beceriler `.rs-skills` | "Bu tarifte gereken beceriler" çipleri | Hazırlanış sekmesi başı (veri varsa) | ✓ (veride yok) |
| 17 | Adım Adım başlığı | Üst etiket + "Nasıl yapılır?" + A− / A+ + yazdır + (varsa) sesli tarif | Aynı başlık + A− / A+; yazdır "..." menüsünde "Tarifi yazdır / PDF"; ses verisi varsa oynatıcı | ✓ |
| 18 | Pişirme Moduna Geç | Büyük CTA | Alt çubuk "Pişirmeye Başla" → yeni tam ekran pişirme modu | ✓ |
| 19 | Adım kartı `.step-card` | Görsel(ler) üstte, numara rozeti (dokununca tamamlandı), başlık + süre rozeti, metin | Aynı sıra: görsel üstte (oranlı, cover), rozet (dokun → tamamla/geri al), başlık + süre rozeti (dokun → zamanlayıcı), metin; ilerleme çubuğu | ✓ |
| 20 | Hatırlatma `.remind-box` (+ Editör Notu) | Başlık + metin; alerjen yalnız "Alerjen: …" cümlesi olarak içinde | Sekmelerin üstündeki bilgi kartı şeridi: "Alerjen" kartı (yalnız cümle varsa) + "Hatırlatma" kartı (kalan metin) + editör notu verisi varsa | ✓ |
| 21 | Besin Değerleri `.nut-card` | 8 değer, makro çubuğu, "Değerler tahminidir" | Bilgi kartı (kalori + makrolar) → aynı içerikle sheet | ✓ |
| 22 | Etiketler + paylaş `.tagshare` | #etiketler, paylaşım düğmeleri | Etiketler kullanıcı kararıyla kaldırıldı; paylaşım header'daki Paylaş sheet'inde (6 kanal + kopyala) | Bilinçli fark |
| 23 | Ben de Yaptım duvarı | Fotoğraflar + yükle | Hazırlanış sonu (veri varsa) | ✓ (veride yok) |
| 24 | Yorumlar özeti `.rev-summary` | Ortalama, yıldız, N değerlendirme, %N tavsiye, **"N kişi yorum yazmadan puan verdi"**, 5→1 dağılım | Aynı; "yorum yazmadan puan verdi" satırı eklendi | ✓ |
| 25 | Yorum formu / giriş kutusu | Misafire "Yorum yapmak için giriş yap" kutusu; üyeye yıldız + metin + foto formu | "Tarifi değerlendir" → misafire giriş sheet'i; üyeye yıldız + yorum + foto sheet'i | ✓ |
| 26 | Yorum filtresi `.rev-filter` | Tümü, Fotoğraflı, 5 yıldız, 4 yıldız, 3 ve altı, **Puansız** (sayılı) | Aynı, sayılarla; "Puansız" eklendi | ✓ |
| 27 | Yorum kartları | Avatar, ad (profil), unvan, yıldız, tarih, metin, foto, Beğen, Yanıtla, Bildir, Tarif Sahibi yanıtı | Aynı; puansız yorumda yıldız yok | ✓ |
| 28 | Benzer Tarifler `.simrec` | Üst etiket + "Bunları da seveceksin" + açıklama + 4 kart | "Benzer Tarifler" + Tamamını Gör + ana sayfa ile aynı standart kart | ✓ (pazarlama alt başlığı v3 kuralıyla taşınmadı) |
| 29 | DadaStore rayı | Seed; boşsa gizli | Veri yok | Veri yok |
| 30 | Pişirme modu `.cookmode` | Başlık, Adım n/N + çubuk, numara + süre, metin, adım görselleri, noktalar, zamanlayıcı (3× bip, alarm), bitince otomatik geç, önceki/sonraki, bitiş ekranı, ok tuşları/Escape | Hepsi + kaydırma ile geçiş, ekran açık tutma (Wake Lock), adım metninde geçen malzemeler, bitişte Ben de Yaptım | ✓ |

Detayda gösterilmeyenler (canlıda da yok): öğün, yemek modu, pişirme yöntemi, süre aralığı — yalnız liste filtrelerinde. Uydurulmadı.

## Yapılanlar (madde madde)

### İlk brif
1. **Sabit üst + kayan panel** — liste-1/liste-v2 kaynak-transferi: kapak `position:sticky; top:0`, panel `margin-top:-overlap`, panelin ilk çocuğu (16px kapak) header altına yapışır; yapışınca radius 180ms'de 0. Yapışma anında header solid ve tarif adı header'da tek satır "…". Ayrıntı: "Kaydırma" bölümü.
2. **Özet** — "20 dk + 35 dk" sıkışık gösterim kalktı; son revizeyle tek satır Toplam süre · Zorluk · Porsiyon (hücreler tek satır, 360'ta ölçüldü). Hazırlık/Pişirme ayrımı "Tarif bilgileri"nde.
3. **Şef** — tek yerde, kompakt satır (bkz. "Şef satırı durumları"); ikinci şef bloğu ve "Tarif bilgileri"ndeki şef cümlesi kaldırıldı.
4. **Sekmeler** — Malzemeler · Hazırlanış · Yorumlar (`.segmented`, sayılı, yapışkan, ok tuşlarıyla gezinme, `#adimlar`/`#yorumlar` derin bağlantı).
5. **Porsiyon** — siyah blok kalktı; açık zemin, kontrol radius'u, − / X kişilik / +.
6. **Malzemeler** — ortak seçim kutusu (22px, 44px satır hedefi), alternatifler shuffle + sheet, sepet her satırda, Tümünü Listeye Ekle birincil.
7. **Adımlar** — üstü çizme yok; numaradan tamamlama, ilerleme, ayraçlar içeriğe değmiyor (QA ≥8px).
8. **Alerjen** — webde ayrı bölüm yok; alerjen Hatırlatma metnindeki "Alerjen: …" cümlesidir. Bu cümle varsa ayrı "Alerjen" kartı; yoksa gösterilmez. Beslenme etiketleri (Glutensiz vb.) alerjen değildir; "ÖZELLİKLER" şeridinde.
9. **Hatırlatma** — bilgi kartı; "Önemli:/Dikkat:" etiketleri kalın, tam metin sheet'te.
10. **Değerlendirmeler** — ortalama + yıldız + dağılım + tavsiye + sessiz puan satırı, kartlar (40px avatar, ad, unvan · tarih, yıldız, metin, eylemler, yanıt), boş durum, "Tarifi değerlendir" (misafir → giriş; üye → yıldız + yorum + foto sheet'i).
11. **Benzer tarifler** — ana sayfa V3 ile aynı standart kart (süre + puan görselde, kategori kalın, başlık ≤2 satır, yazar avatar + ad; açıklama/meta yok).
12. **Paylaş** — Facebook, X, WhatsApp, Telegram, Pinterest (Font Awesome **brands — istisna**), E-posta (solid zarf; web de solid kullanır); 3×2 ızgara; tek satır kopyalama alanı (taşan URL "…"), Kopyala → "Kopyalandı" + toast.
13. **Polish** — ayraçlar yalnız öğeler arasında, token boşlukları, tipografi rolleri korunarak.
14. **Parite** — yukarıdaki tablo.

### Ek revizeler
- Kaydırma liste-1/liste-v2 ile aynı; tekrar eden Ben de Yaptım/Eline Sağlık içerik kopyası ve etiketler kaldırıldı; şef satırı sadeleşti; "Tarif bilgileri" akordeonu liste-v2 `.theme-expander` dilinde (radius yok, üst/alt tek ince ayraç).
- Paragraflar iki yana yaslı (≥2 satır; tek satır sola, `hyphens:auto`, `lang="tr"`). Dar sütunda boşluk açılmasın diye adım metni rozet sütunundan çıkarılıp tam genişliğe alındı (justify kaldırılmadı).
- Başlık bloğu yeniden: kategori · başlık ≤2 satır "…" · alt başlık 1 satır "…" · tek sıra meta kapsülleri (kontrol radius'u, yarı saydam koyu zemin, ince kenarlık).
- Özet ve şef ayrıştı: özet kutusuz bilgi şeridi, şef kutusuz kişi satırı.
- Pişirme modu baştan (bkz. tablo #30).
- Açıklama "Devamını oku": tam metin, 3 satır + fade, 250ms yükseklik geçişi; sekmeler zıplamıyor (ölçüm: 488 → 511 → 524 → 533 px).
- Radius taraması (bkz. aşağı).
- Web paritesi: ÖZELLİKLER şeridi, bilgi kartı şeridi, porsiyon tekrarı kaldırıldı, numaradan adım tamamlama, sessiz puan satırı, Puansız filtresi, yazdır etiketi, mısır koçanı verisi.

## Şef satırı durumları

Hiyerarşi kararı: **Takip et ikincil** (küçük, kenarlıklı, 32px görünür / 44px hedef — canlıdaki küçük "Takip Et"); **Abone ol üçüncül** metin eylemi ("Abone ol · Üretici Üyeliği"). Webde "Abone Ol" yalnız yayında planı olan şefte basılır; prototip verisinde hiçbir şefin planı yok, bu yüzden düğme **yer tutucu**: dokununca Üretici Üyeliği açıklaması (web metinleri: "üyelere özel tarif ve püfler", "Pro Aboneliği'nden ayrıdır", "aylık, istediğin an iptal") ve "plan verisi yok" notu; fiyat/avantaj uydurulmadı. Misafirde iki eylem de giriş kapısına gider.

Görüntüler (3×): `sef-1-misafir.png`, `sef-2-misafir-giris-kapisi.png`, `sef-3-uye-takip-yok-abone-degil.png`, `sef-4-uye-takipte.png`, `sef-5-abonelik-sheet.png`, `sef-6-uye-takipte-abone.png`, `sef-7-uye-abone-takip-yok.png`.

## Kaydırma (liste-v2 / liste-1 kaynak-transferi)

- Mekanizma: liste-v2 `lv2-panel` + sticky `.list-tools` → detayda panel + sticky `.dv2-panel-cap`; yapışma koşulu aynı (`panelTop <= headerHeight + .5`), radius geçişi aynı (180ms, 24 → 0).
- Overlay: liste-v2 `paintBanner` eğrisi (tek sürekli 49 duraklı smoothstep; header boyunca .76 üst kol, metnin 24px üstünde .8 alt kol) + kaynak detay ışığı (sağ üst %25, 0→65%, screen).
- Eşik: liste-v2 formülü `scrollY / min(48, eşik)`; eşik detayın sabit alanından (panelin header'a değdiği kaydırma). Sonuç: header'ın solid olması, tarif adının header'a gelmesi ve panelin yapışması aynı anda biter. Bu, listeden **bilinçli tek fark**tır (listede header ilk 48px'te dolar).
- Ölçüm (390, Chromium + WebKit, `detay-v2-scroll-compare.json`): 0 / 40px kala / tam yapışma / +200 konumlarında yapışma anı, radius, panel genişliği (390) ve header altı 4 px şerit iki sayfada aynı; yapışma anından itibaren header altında **0 koyu piksel**. Bulunan iki sızıntı düzeltildi: kesirli kapak yüksekliği (337,6 px → `round(down,…,1px)`) ve panelin 24px köşesinin 16px kapağın altında kalan 8px'i (yapışınca panel köşesi de 0).
- Görüntüler: `kaydirma/{chromium,webkit}-{liste-v2,detay-v2}-{0,40-kala,yapisma,yapisma+200}.png` ve `…-header-alti-4px.png`.

## Kontrast (başlık bloğu)

Metin gizlenip her metin kutusundaki **en açık** arka plan pikseli ölçüldü (`detay-v2-contrast.json`): 5 farklı fotoğrafta kategori, başlık, alt başlık ve kapsüller (bkz. "Doğrulama sonuçları").

## Radius taraması (kontrolde kontrol, kartta kart)

| Öğe | Önce | Sonra |
|---|---|---|
| Porsiyon kutusu | kart 24 | kontrol 12 (iç − / + / değer kontrolü de 12) |
| Sekme kapsülü | segment 16 | kontrol 12; içteki aktif sekme 12 − 4 = 8 (iç radius = dış − iç boşluk kuralı) |
| Bilgi kartları (Alerjen/Hatırlatma/Besin) | kart 24 | kontrol 12 |
| Puan özeti kutusu | kart 24 | kontrol 12 |
| Yorum boş durumu | kart 24 | kontrol 12 |
| Paylaş kanal kutucukları | kart 24 | kontrol 12 |
| Pişirme modu zamanlayıcı kutusu, bitiş ikonu | kart 24 | kontrol 12 |
| Başlık bloğu meta kapsülleri | tam yuvarlak | kontrol 12 |
| Kart radius'u kalanlar | — | panel/sheet (24, sheet kuralı), standart tarif kartı görseli, adım görseli, pişirme modu adım görseli |
| Tam yuvarlak kalanlar | — | avatarlar; tarif kartı görselindeki süre + puan rozeti (kaynak ortak kart) |

## Tutarlılık turu (ana-v3 / liste-v2 ile)

| Bileşen | Detay v2 | Ana sayfa V3 / Liste v2 | Not |
|---|---|---|---|
| Standart tarif kartı | ana-v3 `recipeCard` kuralları birebir (4:5, kalın kategori, 2 satır, yazar) | Liste v2 kendi `dg-card`'ını kullanıyor; kategori 11px tomato-deep | Ana sayfa ile aynı; liste-v2'deki kategori boyutu ana sayfadan farklı (bizim değil, raporlanır) |
| Segment (sekme) | `.segmented`, zemin `--line`, kontrol radius | ana-v3 `.v3-tabs` zemin `--line`, radius-segment 16 | Kullanıcının son radius talimatıyla detayda 12; ana-v3'te 16 kaldı (fark) |
| Akordeon | liste-v2 `.theme-expander` dili | aynı | Aynı |
| Çip | 44px, kontrol radius, 12px yatay, 8px aralık | ana-v3 havuz çipleri aynı ölçü | Aynı |
| Header solid rengi | `--tomato` (#E14827, AGENTS kuralı) | liste-v2 `--lv2-header-solid: --tomato-dark` | **Fark** — AGENTS "solid primary #E14827" diyor; liste-v2 farklı. Karar bekliyor. |
| Avatar zemini | 40px şef/yorum ve 20px kart: `--line` | ortak `.avatar` kuralı `--bg` (!important) | Detayda görünürlük için `--line`; ortak kural düzeltilirse tek değere iner |
| Bölüm boşlukları | panelde 16/24/32/40 tokenları | aynı ölçek | — |

## Bilinçli kararlar ve sapmalar

- **Bilgi kartı şeridi yeri**: webde Hatırlatma ve Besin Değerleri adımlardan sonra; mobilde sekmelerin üstünde (alerjen ve hatırlatma pişirme/alışverişten önce görülsün, iki sekmeden de erişilsin). ~1,2 kart görünür, eşit yükseklik, kart → sheet.
- **Pişirme modu adım malzemeleri**: veride adım-malzeme eşlemesi yok; "Bu adımda geçen malzemeler" adım metninde adı geçen malzemelerden türetilir (uydurma değil, metin eşleşmesi).
- **Zamanlayıcı rakamı** `calc(display × 1,5)` = 48px (uzaktan okunurluk; token'dan türetildi, elle sayı yok).
- **Ekran açık tutma**: Wake Lock destekleniyorsa istenir; durum kısa metinle bildirilir ("Ekran açık kalır" / "Ekran kilidi açık tutulamadı").
- **İlk ekran**: AGENTS'taki eski "844'te ilk malzeme görünür" kuralı, kullanıcının eklediği özellik şeridi + şef + açıklama + bilgi kartları nedeniyle karşılanmıyor; sekmeler ve bilgi kartları ilk kaydırmada görünüyor.
- **İki yana yaslama**: AGENTS "≥4 satır" diyor; kullanıcının son talimatıyla detayda "≥2 satır".
- **Paylaş ikonları**: tek fa-brands istisnası bu sheet'tedir.

## Açık sorular / eksik kalanlar

- **Sebzeli Tavuk Sote** prototip veri setinde yok; parite tablosu bu sayfadan çıkarıldı ama tarif mobilde açılmaz (istenirse `detay-v2-extract.mjs` ile eklenir).
- **Abonelik planı verisi** hiçbir şefte yok → Abone ol yer tutucu.
- **Header solid rengi** liste-v2 ile AGENTS arasında çelişkili (yukarıda).
- Rozet (Editör Onaylı/Diyetisyen), video, ses, beceriler, foto duvarı, sponsor, alternatif tarifler: kod yolları korunuyor ama örnek tariflerde veri yok — doğrulanmış sayılmadı.

## Eleştiri turları (detay-1 ile yan yana)

1. Tur: adım rozeti numarası köşede → ortalandı; yorum avatarı zemini görünmüyor → `--line`; yanıt kutusunda dar sütun boşlukları → girinti azaltıldı; paylaş kopyalama alanı ortak `.input-frame` içine bağlandı; marka ikon fontu düzeltildi.
2. Tur: meta kapsüllerinin zemini kayboluyordu → yarı saydam koyu + ince kenarlık; kısaltılmış açıklamada yaslama → fade'li tam metin bileşeni; adım başlığı ile metin arasında fazladan boşluk (kaynak row-gap) → 0; pişirme modunda alt alan kalabalık → ekran notu üst satıra.
3. Tur (parite): miktar sütunu sabit genişlik, adım görseli kartın en üstünde, sepet ikonları aynı x'te, alternatif sheet'inde eylem ayrı satırda.

## Doğrulama sonuçları

- `detay-v2-qa.mjs` (Chromium + WebKit × 360/390/430; 4 kaydırma aşaması, sekmeler, şef durumları, paylaş/değerlendir/alternatif sheet'leri, pişirme modu, uzun başlık, mısır koçanı paritesi, liste-1 karşılaştırması, reduced-motion): **Tüm kontroller geçti** (`detay-v2-qa.json`).
- `detay-v2-scroll-compare.mjs` (son koşu): Chromium ve WebKit'te liste-v2 ve detay-v2 için yapışma anında ve +200px'te header altındaki ilk 4 px şeritte **0 koyu piksel**, yapışık kapak radius'u 0px (`detay-v2-scroll-compare.json`).
- `detay-v2-contrast.mjs` (son koşu, liste-v2 eğrisi + kontrol radius'lu kapsüller): 5 fotoğraf × 6 metin = 30 ölçüm, en düşük **6,58:1**, başarısız 0 (`detay-v2-contrast.json`).
- Galeri görüntüsü `galeri.png`, açıklama kapalı/açık ve hap yakın çekimi `aciklama-{kapali,acik,haplar}.png` yeniden üretildi.

## Ek: Kaydırma — liste-v2 ile birebir (9 Ekim, öncelikli tur)

Önceki "geçti" sonuçları yetersizdi: piksel ölçümü yalnız header altını tarıyordu; iki aşamalı yapışmayı, parallax ölçeğini ve hash kaymasını yakalamadı. Bu turda önce iki sayfa kod + tarayıcıda hesaplanan değerlerle analiz edildi, sonra liste yapısı taşındı.

### Analiz (aktarım öncesi)

| Başlık | liste-v2 (referans) | detay-v2 (önce) | Fark |
|---|---|---|---|
| Kaydırma elemanı | `html` (window) | `html` (window) | yok |
| html | `scroll-behavior:smooth`, `scroll-padding-top:48px` (ortak app.css) | aynı | yok (ama hash'te etkili, aşağıda) |
| Sabit katman | `.list-banner` sticky top 0, z 0, 320px, overflow hidden; transform yok | `.detail-hero` sticky top 0, z 0, 337px; **fotoğrafta `scale(1.14)` + `will-change:transform`** (runtime parallax), 24px radius | fotoğraf büyütülmüş katman |
| Başlık bloğu | absolute, z 1, ilk metin header'ın 153px altında | absolute, z auto, ilk metin header'ın 89px altında (blok 131px) | overlay penceresi açılmıyor |
| Panel | `.lv2-panel` relative, z 2, −24, radius 24, min-height `100dvh − header` | `.detail-main` relative, z 2, −24, radius 24, min-height yok | min-height |
| Yapışan öğe | **panelin ilk çocuğu** `.list-tools` (194px, arama + çipler), sticky top header, z 30, 180ms radius, yapışınca 0 + 1px alt çizgi | **16px boş kapak** + içerikte 16px aşağıda ikinci yapışan sekme çubuğu | iki aşamalı, kopuk birleşme (içerik header altındaki beyaz şeridin altından kayıyor) |
| Yapışma eşiği | `panelTop ≤ headerHeight + .5` | aynı | yok |
| Header alfa | `scrollY / min(48, ilkMetin − header − 8)` → ~48px'te solid | yapışmaya senkron (son 48px) | farklı mantık |
| Overlay | `paintBanner` eğrisi + sol üst ışık (hero-light: %25, 0→65%, header+144, screen) | aynı eğri + **sağ üst ışık, tam yükseklik** | renk kayması, çamur |
| Hash | — | `#adimlar` → tarayıcı yüklemede 0→783 **smooth** kaydırıyor (~300 ms), başlık sekme çubuğunun 64px altına; sekme değişiminde adrese hash yazılıyordu (yenilemede her seferinde) | yükleme sonrası kayma |
| safe-area / dvh | header `calc(68px + safe-top)`, panel `100dvh − header`, içerik altı `bottom-space + safe-bottom` | header aynı; dock boşluğu safe-bottom içeriyor; panel min-height yok | min-height eklendi |
| overflow kırpma / ataların transform'u | yok | yok (hero ataları temiz) | yok |

### Taşınanlar (liste-v2.js "Panel" + "Header" blokları, liste-v2.css 17–28)

- DOM: `.detail-main` = `.lv2-panel`; **sekme çubuğu panelin ilk çocuğu** (= `.list-tools`), geri kalan her şey `.dv2-content` (= `.list-content`). 16px kapak kaldırıldı; tek yapışan öğe var.
- CSS değerleri birebir: panel `relative / z 2 / −overlap / radius sheet / min-height calc(100dvh − header)`; yapışan öğe `sticky / top header / z 30 / padding 16 gutter / transition border-radius 180ms / yapışınca radius 0 + 1px alt çizgi`; içerik `relative / paper / padding-top 16`.
- JS birebir: `syncHeader` — eşik = ilk metin (kategori etiketi) − header − 8, `alfa = scrollY / min(48, eşik)`, yapışma `panelTop ≤ header + .5`; `--lv2-tools-h` karşılığı `--dv2-tabs-h` (ResizeObserver) ve `scroll-margin-top: header + çubuk + 16`.
- Sabit katman: fotoğraf transform'u ve radius'u kaldırıldı (`transform:none`), katman kaymaz/büyümez.
- Overlay: `paintBanner` eğrisi (zaten aynıydı) + liste ışığı (sol üst, %25, 0→65%, header+3×48, screen); sağ üst detay ışığı kaldırıldı. Sabit alan yüksekliği liste geometrisinden: ilk metin header'ın 3×48+8 px altında olacak şekilde başlık bloğundan hesaplanır (Tavuk Curry 399px). Böylece eğri listedeki gibi ortada fotoğraf penceresi açıyor (liste en düşük %36, detay %42); üst header bölgesi %76, metin bölgesi %80→%90, tek sürekli gradient, `#211E16` tabanlı.
- Detaya özel tek uyarlama: başlık header'a yapışma anında gelir (listede başlık yok).
- Hash: sekme durumu adreste `?sekme=` ile tutulur, hash yazılmaz. Gelen `#adimlar/#yorumlar` runtime'dan önce yakalanır (tarayıcının smooth çapa kaydırması engellenir), sekme açılır ve bölüm sekme çubuğunun hemen altına **anında** yerleşir (Chromium/WebKit: tek adım 0 → 889, başlık çubuğun 8px altında).

### Görsel kanıt (Chromium, 390)

Göreli konumlar her sayfanın kendi yapışma noktasına göre (liste 228, detay 307):

| Kare | Liste | Detay | Aralık (sticky−header) | Radius | Header altı koyu piksel |
|---|---|---|---|---|---|
| 0 | y0 alfa 0 | y0 alfa 0 | 228 / 307 | 24 / 24 | fotoğraf |
| yapışmadan 100 önce | alfa 1 | alfa 1 | 100 / 100 | 24 / 24 | fotoğraf |
| yapışma −1 | alfa 1 | alfa 1 | 1 / 1 | 24 / 24 | 484 / 486 (1px fotoğraf satırı, iki sayfada aynı) |
| yapışma anı | yapışık | yapışık | 0 / 0 | 0 / 0 | 0 / 0 |
| yapışma +1, +200, +600 | yapışık | yapışık | 0 / 0 | 0 / 0 | 0 / 0 |
| üste dönüş | serbest | serbest | 228 / 307 | 24 / 24 | fotoğraf |

Fotoğraf her karede `top 0`, `transform none` (iki sayfa).

- Yan yana kareler (sol liste, sağ detay): `screenshots/detay-v2/kaydirma/yanyana-hashsiz-01-baslangic.png` … `-08-uste-donus.png`
- Hash'li durum (sağ: `detay-v2.html#adimlar`): `screenshots/detay-v2/kaydirma/yanyana-hashli-01…08.png`, yükleme sonucu `hashli-yukleme-chromium.png`, `hashli-yukleme-webkit.png`
- Header altı şerit, yapışma −1/0/+1/+200, 3× büyütme: `screenshots/detay-v2/kaydirma/header-alti-serit-3x.png`
- Videolar (tekerlekle baştan aşağı ve geri): `screenshots/detay-v2/kaydirma/video/liste-v2-kaydirma.webm`, `…/detay-v2-kaydirma.webm`
- Ölçümler: `docs/detay-v2-scroll-frames.json`; betik `docs/detay-v2-scroll-frames.mjs`
- Önceki (kapaklı) yapının kareleri karşılaştırma için: `screenshots/detay-v2/kaydirma/once-kapakli/`

### Kalan bilinçli fark

- Header solid rengi: liste `--tomato-dark`, detay `--tomato` (AGENTS #E14827). Renk işi talimat gereği bu turdan sonraya bırakıldı. Önceki "renk" ekinin metni bana ulaşmadı (yalnız "ek" geldi); içerik gelince uygulanacak.
- Hash açılışında sayfa bölüme konumlanır (derin bağlantı); bu, tek adımda ve animasyonsuz.

**Görsellerin klasörü:** `/Users/gaviaworks/Developer/Projects/dadagastro-mobil-prototip/v3-app/docs/screenshots/detay-v2/kaydirma/`

### Doğrulama (bu tur, aktarım sonrası)

- Yan yana kareler: 8 konum × 2 durum (hash'siz / `#adimlar`), her karede yapışma anı, aralık, radius, genişlik ve fotoğraf konumu liste ile aynı (`detay-v2-scroll-frames.json`).
- Hash'li yükleme: Chromium ve WebKit'te tek adım (0 → 889), animasyon yok; başlık sekme çubuğunun 8px altında.
- Kontrast (yeni overlay): 5 fotoğraf × 6 metin, en düşük 6,58:1 (kapsül), kategori ≥ 8,87:1, başlık ≥ 9,11:1; başarısız yok.
- Tam QA (Chromium + WebKit, 360/390/430): tüm kontroller geçti.

---

## Ek: 10 Ekim revizeleri (R0–R4)

Yazılan dosyalar yalnız: `detay-v2.js`, `detay-v2.css`, `docs/42-detay-v2-revize.md`, `docs/detay-v2-qa.mjs`, `docs/detay-v2-scroll-compare.mjs`, `docs/detay-v2-scroll-frames.mjs`, yeni `docs/detay-v2-tabs.mjs` (+ `.json`), `docs/screenshots/detay-v2/{r1,r2,r3,r4,muadil,canli}/`. Liste, ana sayfa, ortak dosyalar, tokens.css, app.css, AGENTS.md, Laravel ve marka klasörü yalnız okundu. Git/yayın yok. Sunucu yeniden başlatılmadı.

### R0 · Header rengi — yalnız ölçüm, değişiklik yok

| Kaynak | Ölçülen | Not |
|---|---|---|
| Canlı tarif header'ı (`header.kabuk-basi`, 390 ve 1280) | **#FFFFFF** (beyaz; kaydırınca da beyaz). Ana sayfa/liste: üstte şeffaf, kaydırınca beyaz | Canlıda primary renkli header **yok** |
| Canlı `--tomato` (tokens-n1Tp8NEY.css + `kanon/markalar/gastro.css`) | **#DC3D17** — dosyada "DadaGastro PANTONE 173 C (#DC3D17)" | `.btn-login`, `.cook-cta`, `.ct-btn` zemini bu |
| Canlı `--tomato-dark` | **#BA3413** | `.btn.btn-primary` (Tümünü Listeye Ekle, Takip Et, Sonraki Adım) zemini bu |
| Canlı `--tomato-deep` / `--tomato-tint` | #9C2B10 / #FBE6E1 | — |
| Marka: `DadaMentor-Logos.ai` (RGB) DadaGastro logosu dolgusu | **#DC3D17** (pdftoppm render, piksel sayımı) | PANTONE 173 C etiketli satır |
| Marka: `logo-kare.ai` sayfa 5 (kırmızı kare, beyaz logo) zemini | **#DD3D19** (CMYK dosya; çevrim tahmini, ±1–2 birim) | — |
| Prototip `tokens.css` `--tomato` / `--tomato-dark` | #E14827 / #C43D20 | Laravel repo `resources/css/tokens.css:72-73` ve `portal.css:23-24` de aynı |

Beyaz ikon/metin ile kontrast (WCAG): #E14827 **4,07:1** · #DC3D17 **4,45:1** · #DD3D19 4,42:1 · #C43D20 **5,20:1** · #BA3413 **5,85:1** · #9C2B10 7,59:1.

Değerlendirme (karar Beyar'ın):
- **Canlı ile repo farklı**: canlı build #DC3D17/#BA3413 (logo rengiyle aynı), Laravel repo ve prototip #E14827/#C43D20. Prototipteki `--tomato` hiçbir canlı ya da marka değerine denk gelmiyor.
- Logo zemini = canlı `--tomato` (#DC3D17). Beyaz ikon için 4,45:1 → 3:1 grafik eşiğini geçer, 4,5:1 küçük metin eşiğinin hemen altında.
- Listenin kullandığı `--tomato-dark` (#C43D20) 5,20:1; canlı karşılığı #BA3413 (5,85:1). Detayın kullandığı `--tomato` (#E14827) 4,07:1.

### R1 · Gerçek sekme yapısı

Yerleşim (panel `.detail-main` içinde): `.dv2-head` [özet şeridi · mutfak + özellikler · yazar · açıklama · bilgi kutuları] → `.dv2-tabs-anchor` (0 px, çubuğun normal akıştaki yeri) → `.dv2-tabs-bar` (sticky, top = header, 0 px boşluk) → `.dv2-content` [Malzemeler / Hazırlanış / Yorumlar panelleri · tarif bilgileri akordeonu · Benzer Tarifler]. Sekme görünümü (segment, sayaç rozetleri) değişmedi.

Davranış:
- Sekmeye dokununca yalnız panel değişir; çapa kaydırması kaldırıldı.
- Çubuk yapışık değilse kaydırma konumu aynen korunur (önce/sonra aynı scrollY; tarayıcı kaydırma çapası da sabitlenir).
- Çubuk yapışıksa sayfa anında (animasyonsuz) çapaya alınır: yeni panel çubuğun hemen altından başlar.
- `.dv2-content` en az `100dvh − header − çubuk` yüksekliğinde. Kısa sekmede (Tavuk Curry, Yorumlar 0) alt çökmez, yapışık konum korunur. Toplam sayfa yüksekliği sekmenin içeriğine göre değişir (2694 / 2604 / 2337 px), ama görünen konum sıçramaz.
- Panel yapışması önceki gibi: panel header'a değince köşe 24 → 0 (180 ms), header solid, tarif adı header'da. Değişen tek şey yapışan öğe: panel içeriği artık header'ın altından kayıyor, sekme çubuğu kendi sırası gelince yapışıyor.
- `?sekme=hazirlanis|yorumlar`: sekmeyi açar, kaydırmaz (y=0). `#adimlar` / `#yorumlar`: sekmeyi açar ve çubuğu header'a oturtur; tek adım 0 → 941, ara kare yok. Adres `?sekme=` ile tutulur.
- Puan kapsülü ve alt çubuktaki Yorumlar kısayolu Yorumlar sekmesini açar ve çubuğu header'a oturtur.
- Pişirmeye Başla / pişirme modu çalışıyor.
- ARIA: `tablist` / `tab` (`aria-selected`, `aria-controls`, roving tabindex) / `tabpanel`. ←/→/Home/End ile geçiş yapılır; yapışık değilken kaydırma değişmez.

Ölçümler (`docs/detay-v2-tabs.json`, Chromium + WebKit × 360/390/430, **tümü geçti**):

| Durum (Chromium 390) | Önce → sonra scrollY | Not |
|---|---|---|
| Serbest: Hazırlanış / Yorumlar / Malzemeler | 641 → 641 · 641 → 641 · 641 → 641 | çubuk serbest kaldı |
| Yapışık (+700): Hazırlanış / Yorumlar / Malzemeler | 1641 → 941 · 1641 → 941 · 1493 → 941 | çapa 941; çubuk–header 0 px; panel üstü = çubuk altı (±1 px alt-piksel); tıklamadan sonraki 6 kare (240 ms) hep 941 |
| Yorumlar sekmesi sayfa sonu | belge 2337 ≥ çapa + 844 | son blok ile alt çubuk arası 119 px; alt çubuk ekranda |
| `#adimlar` / `#yorumlar` açılışı | 0 → 941 (tek adım) | doğru sekme seçili |
| 360 / 430 | çapa 960 / 941 | aynı sonuç; WebKit'te çapa 942 |

Kaydırma ve yapışma — liste ile yan yana (yeniden ölçüldü):
- `detay-v2-scroll-compare.json`, Chromium + WebKit: yapışma anında ve sonrasındaki sweep'te (+0…+6) header altındaki 4 px şeritte **0 koyu piksel**. −1 px'te 486 (liste 429), 1 px'lik fotoğraf satırı, önceki turla aynı. Sekme yapışmasında (`sekme-yapisma`, +200, +600) çubuk–header aralığı 0 px.
- +200 / +600'de detayda görülen 3–13 koyu piksel sızıntı değil: header altından kayan içerik metni (elementFromPoint: `.dv2-chef-badge`).
- Yan yana kareler yeniden üretildi: `screenshots/detay-v2/kaydirma/yanyana-hashsiz-01…08.png`, `yanyana-hashli-01…08.png`, `header-alti-serit-3x.png`, videolar.
- **Raporlanacak fark (bizim değil):** liste-v2 panelinin başlangıç köşesi artık 12 px (önceki turda 24). Liste ajanının paralel değişikliği olmalı. Detay 24 px kaldı.

### R2 · Yazar vurgusu (`?yazar=a|b`, varsayılan a)

Muadil notları (390×844 görüntüler `screenshots/detay-v2/muadil/`):
- **Cookpad:** iki kademe. Fotoğraf üstünde 40 px avatar + ad + @kullanıcı; adımlar sonunda ortalı 56 px avatar + ad + tam genişlik Follow. Kart yok. (cookpad.com/tr erişilemedi, /eng kullanıldı.)
- **NYT Cooking:** başlık altında yalnız "By Ad" (altı çizili bağlantı) + güncelleme tarihi. Avatar ve takip yok.
- **Tasty:** açıklama altında ad + ekip + tarih, satır içi. Avatar ve takip yok.
- **Kitchen Stories:** başlık altında 54 px fotoğraf + ad + tarih. Takip yok.
- **yemek.com:** giriş metninden sonra beyaz kart (hafif gölge). 48 px fotoğraf, ad + onay rozeti, "ŞEF" etiketi, 2 satır bio, sağ üstte kompakt "Takip et".
- **Nefis Yemek Tarifleri:** tam genişlik bant. 60 px avatar, ad, @kullanıcı, "38 Takipçi", sağda kırmızı "Takip Et".
- **Canlı DadaGastro:**
  - Başlık altında `.art-hmeta`: 42 px baş harf avatar, ad, unvan, tarihler; `/sefler/tarik.kaptan` bağlantısı.
  - Malzemelerin altında `.side-chef`: 54 px avatar, **"MUTFAK MERAKLISI"** rozeti (zeminsiz, büyük harf, domates, fa-award), "2026'dan beri üye", "+ Takip Et" (#BA3413), Tarif 3 / Takipçi 13. **Abone Ol canlıda yok** (yalnız planı olan şefte basılıyor).
  - Canlı avatar zemini krem (#EFE5D3). Krem kuralı gereği prototipte nötr `--line` kullanıldı.
- Çıkarım: yaygın kalıp tek birincil eylem (Takip et) ve kompakt sayaçlar. Ad ile avatar dokunma hedefi; profil sinyali çoğunlukla bağlantının kendisi. Ok ikonu uygulamada daha anlaşılır.

Seçenekler (aynı gerçek veri: baş harf, ad, unvan rozeti, tarif · takipçi · üyelik yılı; Takip et ana eylem, Abone ol minimal):
- **a · Kimlik kartı:** ince çizgili beyaz kart (kart radius'u). Üstte 56 px avatar · rozet · ad · sayılar · sağda ok (tüm satır profil hedefi). Altta ayraçla eylem satırı: geniş tonlu "Takip et" + metin "Abone ol".
- **b · İmza satırı:** kutusuz. "TARİFİN YAZARI" etiketi, domates halkalı 56 px avatar, ad + ok, rozet; Takip et sağda kompakt. Altta sayılar ve metin "Abone ol".
- Ortak kararlar:
  - Rozet canlı `.sc-badge` dilinde: zeminsiz, büyük harf, fa-award.
  - Takip et tonlu (tomato-tint zemin, tomato-deep metin): Pişirmeye Başla / Tümünü Listeye Ekle ile yarışmasın diye dolu primary değil. Takipteyken beyaz + çizgi + onay.
  - Yazar sayfada bir kez geçiyor; özet şeridinin kutusuz ızgarasından farklı kalıpta.
  - Profil sayfası yok: dokununca "… profili yakında" bildirimi, sahte sayfa açılmaz.
  - Abone ol önceki yer tutucu sheet'i açar (plan verisi yok notuyla).
- Ölçüm: avatar 56 × 56 (w/h/min aynı, daire); Takip et ve Abone ol hedefi 44 px, kimlik satırı 56–80 px. Küçük metin kontrastı en düşük a **5,02:1**, b **4,77:1** (13 px; ≥4,5).

### R3 · Hatırlatma kutusu (`?not=a|b`, varsayılan a)

Alerjen · Hatırlatma · Besin Değerleri şeridindeki tüm kartlar aynı kalıbı kullanır. İkon başlık satırında yalın FA solid; ikon karosu kaldırıldı, yazardan sakin kalsın diye.
- **a · Çerçeveli sakin kart:** beyaz zemin, ince çizgi, kontrol radius'u; başlık gövde kalın, metin meta.
- **b · Not şeridi:** nötr zemin; solda içeride kalan düz 2 px domates çizgi; başlık küçük büyük harf etiket (tomato-deep), metin mürekkep rengi.
- "Devamını oku" ve 4 satır + "…" korunuyor.
- **Düzeltilen hata:** ortak `.prose` kart metnini 15 px'e büyütüyordu; satır kırpması bozuluyor, 4. satır yarım görünüp "Devamını oku" altında kalıyordu (önceki turdan beri). Kart metni meta rolüne sabitlendi.

### R4 · Alternatif malzeme ("Yerine ne kullanabilirim?")

**Beklenmedik bulgu:** shuffle düğmesi ve sheet önceki turda zaten vardı (parite #11). Ancak yalnız alternatifli tariflerde göründüğü için varsayılan Tavuk Curry'de görünmüyordu. Bu turda veri doğrulandı ve sheet içeriği istenen yapıya getirildi.
- **Veri kaynağı (Laravel, salt okuma):**
  - Tablo `recipe_ingredient_substitutes` (`database/migrations/2026_07_13_100004_create_ingredient_tables.php:47-53`); alanlar `recipe_ingredient_id`, `text` (tr/en JSON), `position`.
  - **Ayrı ad / miktar / oran / açıklama alanı yok.** Tek metin, kural olarak "ad — açıklama".
  - Görüntü `resources/views/tarifler/_ingredients-panel.blade.php:113` (fa-shuffle `.ing-swap`) ve `:138-144` (`.ing-pop`, `<b>ad</b> <small>— açıklama</small>`). Webde oran hiç basılmıyor.
  - İki tarif de repo seed'lerinde yok; kaynak canlı.
- **Canlı:**
  - Sebzeli Tavuk Sote: 11 malzemenin hiçbirinde alternatif yok (prototip veri setinde de bu tarif yok).
  - Mısır Koçanı Jölesi, her biri tek alternatif:
    - limon suyu → **sitrik asit** — "60 ml limon suyu yerine 4 g, 1 yemek kaşığı suda eritilerek; asitlik aynı kalır ama limon kokusu gelmez"
    - toz pektin → **elma kabuğu ve çekirdek evi** — "8 ekşi elmanınki (yaklaşık 400 g) tülbente bağlanıp …"
    - toz şeker → **esmer şeker** — "jöle bal renginden koyu kehribara döner …"
  - Prototip verisi canlıyla **birebir aynı**.
  - Görüntüler: `canli/alternatif-canli-misir.png`, `canli/alternatif-canli-sote-yok.png`.
- **Alternatifli prototip tarifleri:** `ld-source` PARITY'de 23 tarif (patates-mucveri, sagdana, pasteis-de-feijao, tarte-de-amendoa, guvecte-ayvali-tavuk, ordek-dolmasi, tuzsuz-bebek-tavuk-suyu, arroz-con-pato, asam-pedas, jiao-yan-karides, mercimekli-yaprak-sarma, lor-dolmasi, moin-moin, waakye, enfrijoladas, semizotlu-yumurta, masabeeb, irimsik, mamounia, kiev-pastasi, tamriyeh, tepsi-kadayifi, muska-tatlisi). `detay-v2-tarifler.js`'te 4 tarif (mısır koçanı, şadok kabuğu reçeli, mürver çiçeği jölesi, japon ayvası jölesi). Yalnız mısır koçanı canlıyla karşılaştırıldı.
- **Mobil:**
  - Yalnız alternatifi olan satırda FA solid `shuffle` düğmesi var: 44 × 44, sepetin sağında, çakışma yok (sepet 294–338, shuffle 338–382).
  - Sheet ortak `dialog.sheet` kalıbında (tutma çubuğu, kapat, backdrop): başlık "Yerine ne kullanabilirim?"; "Tarifteki malzeme" kutusunda porsiyona göre güncel miktar + ad; alternatif adı; açıklama tam genişlikte.
  - **Oran satırı yalnız açıklamada açıkça geçiyorsa:** limon suyu için "Oran: 60 ml limon suyu → 4 g sitrik asit" (ok FA ikon). Pektin ve şeker için oran yok, uydurulmadı. Porsiyon değiştiyse "(tarifin asıl porsiyonu)" notu eklenir.
  - Mobil önizlemedeki "Bununla değiştir / Orijinal malzemeye dön" korunuyor. Bu işlev webde yok, önizleme.
- Alternatifsiz tarifte değişiklik yok (Tavuk Curry): `[data-swap]` 0, `dv2-has-swaps` sınıfı yok, her satırın eylem sütunu 44 px (önceki gibi tek sepet). Ölçü (i) düğmeleri aynı.

### Doğrulama (son koşu, tümü bu değişikliklerden sonra)

- `docs/detay-v2-tabs.mjs` (R1–R4, Chromium + WebKit × 360/390/430): **Tüm kontroller geçti**. Kapsam: sıra, ARIA, serbest/yapışık geçiş, klavye, derin bağlantılar, Yorumlar sayfa sonu, pişirme modu, 44 px hedefler, küçük metin ≥4,5:1, avatar ölçüsü, profil bildirimi, shuffle hedef/çakışma, sheet içeriği, alternatifsiz tarif. Konsol hatası ve 4xx yanıtı **yok**; yatay taşma yok.
- `docs/detay-v2-qa.mjs` (önceki tam QA; yapışık köşe artık panelde ölçülüyor, yazar kartı a'ya izin veriyor): **Tüm kontroller geçti**.
- `docs/detay-v2-scroll-compare.mjs` ve `docs/detay-v2-scroll-frames.mjs`: yukarıdaki R1 kaydırma bölümü. `docs/detay-v2-contrast.mjs`: başlık bloğu 30 ölçüm, hepsi geçti.

### Ekran görüntüleri (`v3-app/docs/screenshots/detay-v2/`)

- R1:
  - Üç sekme: `r1/uc-sekme-yapisik.png`, `r1/uc-sekme-serbest.png`
  - Tek tek: `r1/{chromium,webkit}-390-sekme-{malzemeler,hazirlanis,yorumlar}-{yapisik,serbest}.png`
  - İlk ekran: `r1/*-390-ilk-ekran.png`
  - Hash açılışı: `r1/*-390-hash-{hazirlanis,yorumlar}.png`
  - Yorumlar sayfa sonu: `r1/*-390-yorumlar-sayfa-sonu.png`
  - Kaydırma: `kaydirma/yanyana-*.png`
- R2:
  - Yan yana: **`r2/yazar-a-b-yanyana.png`** (sayfa bağlamında), `r2/yazar-a-b-yakin.png`
  - Tek tek: `r2/{chromium,webkit}-{360,390,430}-yazar-{a,b}.png`
- R3: yan yana **`r3/not-a-b-yanyana.png`**; tek tek `r3/{chromium,webkit}-{360,390,430}-not-{a,b}.png`
- R4: **`r4/alternatif-yanyana.png`** (kapalı · açık · alternatifsiz); `r4/*-390-alternatif-{kapali,acik-1,acik-2,acik-3}.png`, `r4/*-390-alternatifsiz-curry.png`
- Muadiller ve canlı: `muadil/*.png`, `canli/alternatif-canli-*.png`

### Açık konular

- Header rengi kararı (R0 tablosu): canlı #DC3D17 / #BA3413, repo ve prototip #E14827 / #C43D20.
- Alternatif "oran" alanı veride yok. Oran yalnız metinde açıkça geçtiğinde gösteriliyor; ayrı bir oran isteniyorsa veri modelinde alan gerekir.
- Liste panelinin başlangıç köşesi 12 px, detay 24 px. Liste tarafındaki değişiklik eşleşince yeniden ölçülmeli.

Yerel bağlantılar:
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a&not=a · http://127.0.0.1:8765/v3-app/detay-v2.html?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole

---

## Ek: R2 düzeltmesi — `?yazar=b` baştan (10 Ekim)

`?yazar=a` değişmedi (karşılaştırma için). Yalnız `detay-v2.js` (b şablonu) ve `detay-v2.css` (b kuralları) değişti.

**Kurgu: "Tarifin sahibi" kartı**
- Zemin: çok açık domates tonlu kart (primary %5 + %12 ince çizgi), kart radius'u, 16 px iç boşluk. Krem yok; kahverengi yok.
- Kimlik:
  - Sönük üst etiket "TARİFİN SAHİBİ" (etiket rolü).
  - 56 px baş harf avatar (`--avatar-lg`, nötr zemin, domates koyu harf). Avatarın çevresinde 2 px beyaz + 2 px primary halka; görünür çap 64 px.
  - Ad öne çıkan kart başlığı ölçeğinde (20/700), en çok 2 satır + "…".
  - Altında canlıdaki gibi zeminsiz, büyük harf, primary unvan rozeti (fa-award).
  - Sağda ok.
- Sayaçlar: eşit sütunlu beyaz kutucuklar (ikon + değer 18/700 + etiket 13). Veride şef düzeyinde yalnız **Tarif** ve **Takipçi** var; Eline Sağlık/beğeni şef verisinde yok, gösterilmedi. Üçüncü sütun gerçek **üyelik yılı** ("2026'dan beri üye" satırından). Sütun sayısı veriye göre değişir; veri eksikse 2 ya da 1 sütun olur.
- Profil bağlantısı: kimlik ve sayaçlar tek profil bağlantısı. Profil sayfası yok, dokununca "… profili yakında" bildirimi.
- Eylemler: **Takip et** dolu `--tomato-dark` (geniş). **Abone ol** beyaz zemin + ince çizgi, ikincil. Takipteyken Takip et beyaz + çizgi + onay; yükseklik değişmez (ölçüldü, zıplama yok).
- Biyografi yalnız veride varsa, en çok 2 satır. 37 şefin hiçbirinde biyografi ve fotoğraf yok; tüm testler fotoğrafsız durumda.

**Takip et / Pişirmeye Başla dengesi (gerekçe)**
- Takip et koyu ton (`--tomato-dark`). Ölçek ve yerleşimle ikincil kalıyor:
  - 44 px yüksek, kartın içinde, yanında beyaz Abone ol var.
  - Pişirmeye Başla 52 px, ikonlu, ekranın altında sabit.
- Bir tarifte iki dolu domates düğme aynı anda görünebiliyor; ama biri sayfa içi kişi eylemi, diğeri sabit ana eylem. Hiyerarşiyi boyut ve yer kuruyor.
- Muadiller (Nefis, Cookpad) ve canlı `.side-chef` "+ Takip Et" de dolu düğme kullanıyor. Önceki tonlu Takip et "yeterince belirgin değil" geri bildirimini aldığı için dolu seçildi.

**Ölçüm** (`docs/detay-v2-tabs.mjs`, Chromium + WebKit × 360/390/430; tümü geçti)
- Küçük metin kontrastı en düşük 4,77:1. Ayrıntı: etiket 7,36, rozet 4,87, sayaç etiketi 7,86, Takip et 5,20.
- Takip et ve Abone ol hedefleri 44 px; kimlik bağlantısı 145 px yüksek.
- Uzun ad:
  - En uzun gerçek ad "Şahnur Poyrazoğlu" 360'ta tek satır.
  - Yapay stres ("Ayşegül Nilüfer Karamustafaoğlu-Büyükyıldırım" + "Kıdemli Kısım Şefi Yardımcısı", yalnız test DOM'unda): 2 satır + "…"; çakışma 0, kart dışına taşma 0.
- Kaydırma/yapışma yeniden ölçüldü, bozulma yok: panel yapışmasında köşe 0, header altında 0 koyu piksel; sekme yapışmasında aralık 0. Tam QA da geçti.

**Görüntüler** (`v3-app/docs/screenshots/detay-v2/r2/`)
- Eski b · yeni b · a yan yana (390): **`yazar-eskib-yenib-a-yanyana.png`**
- Uzun ad ve stres: `yazar-b-uzun-ad.png`; tek tek `{chromium,webkit}-{360,390,430}-yazar-b-{uzun-ad,stres}.png`
- Yeni b tek tek: `{chromium,webkit}-{360,390,430}-yazar-b.png`, `*-390-yazar-b-baglam.png`
- Eski b'nin kaydı: `eski-chromium-390-yazar-b{,-baglam}.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=b&not=b
http://127.0.0.1:8765/v3-app/detay-v2.html?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole&yazar=b&not=b

---

## Ek: Bilgi kutuları ve Besin Değerleri — web paritesi (10 Ekim)

Değişen dosyalar: `detay-v2.js`, `detay-v2.css`, `detay-v2-tarifler.js`. `docs/detay-v2-extract.mjs` artık birleştirme modunda: mevcut tarifleri korur, verilen slug'ları ekler. Yeni betik `docs/detay-v2-bilgi.mjs` (+ `.json`). QA beklentisi güncellendi.

### Canlı DOM ve Laravel incelemesi (390, salt okuma)

| Tarif | Webde `.note-duo` | Alerjen | `.nut-card` |
|---|---|---|---|
| Shami Kebap | Hatırlatma (remind-box) | Ayrı blok **yok**: Hatırlatma metninin sonundaki cümle — "Alerjen: Malzeme listesine göre yumurta içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin." | 391 kcal · 31 g protein · 25 g karbonhidrat · 19 g yağ · 5 g lif · 5 g şeker · 722 mg sodyum · 4 g doymuş yağ; Protein %31 · Karbonhidrat %25 · Yağ %43; "Değerler tahminidir" |
| Mısır Koçanı Jölesi | Hatırlatma | Yok | 52 kcal · 0 g · 12.9 g · 0 g · 0 g · 12.6 g · 1 mg · 0 g; %0 / %100 / %0 |
| Tavuk Curry | Hatırlatma (Önemli: … Dikkat: …) | Yok | **Yok** (canlıda besin kartı basılmıyor) |

Laravel kaynağı:
- `resources/views/tarifler/_notes.blade.php`: `.note-duo` = Hatırlatma (`remind_text`, "sistem otomatiği") + Editör Notu (`editor_note`, fa-pen-nib), bu sırayla. Biri yoksa tek sütun. Alerjen için ayrı alan yok.
- `resources/views/tarifler/_nutrition.blade.php`: 8 alan sabit sırayla. Makro yüzdesi `macro_percentages`. Not "Değerler tahminidir", diyetisyen onaylıysa "· Diyetisyen onaylı hesaplama". Nutrition satırı yoksa bölüm gizli.

**Webdeki sıra (Shami, rd-main):** Malzemeler → Adımlar → Hatırlatma → **Besin Değerleri** → Etiketler/Paylaş → Yorumlar → Benzer ("Bunları da seveceksin").
Mobilde Besin, istenen yerde: sekmelerin altında, Tarif bilgileri ve Benzer Tarifler'den önce. Webde Yorumlar'dan önce, adımlardan sonra geliyor. Fark bilinçli; **karar Beyar'ın**.

**Repo ile canlı farkı:** Laravel `database/data/ic-recipes/d5-06.json` içindeki Shami Kebap eski ya da başka bir sürüm:
- 10 malzeme, alternatif yok
- Hatırlatma "Harcı ezerken mercimek tanelerini … Alerjen: yumurta içerir."

Canlı esas alındı: 18 malzeme, 5 alternatif. Ayrıca canlı değerleri "12.9 g" (nokta) gösteriyor; repo blade'i virgüllü biçimliyor ("12,9"). Mobil canlıdaki metni aynen kullanıyor.

### 1) Yatay bilgi şeridi

- Şeritte yalnız not/uyarı kartları var, web sırasıyla: **Hatırlatma → Alerjen → Editör Notu** (veride Editör Notu olan tarif yok; kod yolu hazır, fa-pen-nib).
- Alerjen kartı:
  - Ayrı başlık "Alerjen", FA solid `hand-dots` (alerji ikonu).
  - Gerçek alerjenler etiket olarak (Shami: **Yumurta**; Sagdana: "süt ve süt ürünleri", "sert kabuklu yemiş").
  - Altında webdeki cümle aynen: "Malzeme listesine göre **yumurta** içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."
  - Etiketler yalnız bu cümleden ayrıştırılıyor.
- Beslenme özellikleri (Glutensiz, Vegan…) alerjen kartına girmez; üstteki ÖZELLİKLER çiplerinde kalır (testte denetlendi).
- Alerjen cümlesi yoksa kart çizilmez (Mısır, Curry).
- Tek kart kalınca (Mısır, Curry) şerit kaydırmasız, kart tam genişlik (`is-single`; ölçüldü).
- Besin Değerleri kartı şeritten çıktı. Kaynak nutrition `details` gizli kalıyor.

### 2) Besin Değerleri bölümü

- Yer: `.dv2-tail` içinde ilk bölüm. Bütün sekmelerde ortak; Tarif bilgileri ve Benzer Tarifler'den önce.
- İçerik:
  - Webdeki 8 alan eksiksiz ve aynı değerle: 2 sütunlu ızgarada, etiket üstte, değer altta. Kalori ilk hücre, açık domates vurgulu.
  - Tek yatay makro oranı çubuğu; renkler web ile aynı token'lar: protein `--tomato`, karbonhidrat `--yellow`, yağ `--green`.
  - Lejantta yüzdeler.
  - Not: "Değerler tahminidir. Porsiyon sayısını değiştirsen de değerler 1 porsiyon içindir."
- Veride olmayan hücre çizilmez. Veride hiç besin yoksa bölüm yok (Curry).
- Porsiyon + ile değiştirildi; değerler aynı kaldı (ölçüldü).
- Tasarım: ince çizgili beyaz kart, kart radius'u, hücreler kontrol radius'lu nötr zemin, FA solid ikonlar. 360'ta hiçbir etiket kesilmiyor (önce "Karbonhidr…" kesiliyordu; etiket üste alındı).

### 3) Shami Kebap

- `detay-v2.html?tarif=shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte` açılıyor; veri canlıdan (`detay-v2-extract.mjs`, salt okuma).
- İçerik: 18 malzeme, 6 adım, Hatırlatma + Alerjen, 8 besin alanı, şef Toprak Ekşioğlu (Komi, Tarif 7, Takipçi 15).
- **5 alternatif çalışıyor:**
  - yağsız dana kuşbaşı → kuzu kuşbaşı
  - chana dal → sarı mercimek
  - taze zencefil → hazır zencefil-sarımsak ezmesi
  - kuru kırmızı biber → pul biber
  - taze kişniş → maydanoz
- Benzer Tarifler kartları görünsün diye canlıdaki 4 benzer tarif de eklendi: Tire Köfte, Pırasa Köftesi, Yeni Dünya Kebabı, Kağıtta Köfte. Önceki 5 ek tarif korundu; toplam 10.

### Doğrulama

- `docs/detay-v2-bilgi.mjs` (Chromium + WebKit × 360/390/430 × 3 tarif): **Tüm kontroller geçti**. Kontrol edilenler:
  - Şerit sırası canlıyla aynı; Besin şeritte değil.
  - Alerjen ikonu ve metni; diyet özelliği yok.
  - Tek kart tam genişlik.
  - Besin 8 alan ve makro canlıyla birebir; not; konum.
  - Hücre kırpması yok, hücre ≥44 px; porsiyonla değer değişmiyor.
  - Shami alternatif sheet'i açılıyor.
  - Yatay taşma, konsol hatası ve 4xx yok.
- `docs/detay-v2-tabs.mjs` (R1–R4 + yazar b): geçti. `docs/detay-v2-qa.mjs`: geçti.
- Kaydırma (`scroll-compare`, `scroll-frames`) yeniden ölçüldü, bozulma yok:
  - Panel yapışmasında köşe 0, header altında 0 koyu piksel (sweep +0…+6).
  - Sekme yapışmasında, +200 ve +600'de aralık 0.

### Ekran görüntüleri (`v3-app/docs/screenshots/detay-v2/bilgi/`)

- Mobil ↔ web yan yana (390): **`yanyana-shami.png`**, **`yanyana-misir.png`**, **`yanyana-curry.png`**
- Mobil kırpımlar: `{chromium,webkit}-390-{shami,misir,curry}-{serit,besin,baglam}.png`, `*-390-shami-alerjen.png`
- Shami alternatif sheet'i: `*-390-shami-alternatif.png`
- Canlı kırpımlar: `canli-{shami,misir,curry}-{not,besin}.png` (Curry'de besin yok)

http://127.0.0.1:8765/v3-app/detay-v2.html?tarif=shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte&yazar=b&not=b
http://127.0.0.1:8765/v3-app/detay-v2.html?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole&yazar=b&not=b

---

## Ek: Varsayılan tarif Shami Kebap + önbellek kırıcı (10 Ekim)

- **Varsayılan tarif:** `detay-v2.html` parametresiz açılınca Shami Kebap açılıyor; alternatif malzeme, alerjen ve tam besin değerleri bu tarifte bir arada.
  - Yöntem: `detay-v2-tarifler.js` (ve onu üreten `docs/detay-v2-extract.mjs`) yalnız sayfanın kendi adresinde `tarif` yoksa `DV2_DEFAULT_RECIPE` döndürüyor.
  - Ortak `ld-source.js` değişmedi. Adres yeniden yazılmıyor; link `detay-v2.html?yazar=a&not=a` olarak kalıyor.
- **Alternatif malzeme tasarım seçeneği değil, özellik:** A ve B'de (parametresiz de) Shami'nin 5 alternatifi çalışıyor. Shuffle düğmesi 44 × 44; sheet "Yerine ne kullanabilirim?".
- **Bozulmayanlar:**
  - `?tarif=tavuk-curry-hindistan-cevizli-hint-usulu` Curry'yi açıyor (alternatif ve alerjen yok, webdeki gibi).
  - Galeri `detay-sayfa-v2.html`: detay-v2 iframe'i referans detay-1 ile aynı tarifi (Curry) göstersin diye `&tarif=tavuk-curry…` eklendi. "Tek başına aç" bağlantısı varsayılanı (Shami) açıyor.
  - Liste/ana sayfa bağlantıları: liste-v2 ve ana-v3 şu an **`detay-c.html?tarif=…&donus=…`** adresine bağlanıyor (bizim dosyamız değil, değiştirilmedi). Aynı sorgu `detay-v2.html`'de doğru tarifi açıyor (6 bağlantı test edildi).
- **Önbellek kırıcı:** `detay-v2.html`'deki 12 yerel CSS/JS bağlantısı `?v=<SHA-256 ilk 10 hane>` aldı. Her CSS/JS değişikliğinden sonra `node v3-app/docs/detay-v2-cachebust.mjs` ile yenilenir.
- **Testler:** Curry'ye özgü beklentiler artık açık `?tarif=` ile: `detay-v2-qa.mjs` CURRY, `detay-v2-tabs.mjs` alternatifsiz tarif kontrolü.

**Doğrulama**
- `docs/detay-v2-varsayilan.mjs` (Chromium + WebKit × 360/390/430): **tümü geçti**. Kapsam:
  - parametresiz / A / B → Shami: 5 shuffle, Hatırlatma + Alerjen, Besin bölümü
  - adres değişmiyor; `?v=` tüm yerel kaynaklarda
  - sheet içeriği; `?tarif=` ile Curry
  - galeri her iki iframe'de Curry; liste/ana sayfa sorguları doğru tarif
  - konsol hatası ve 4xx yok
- Regresyon: `detay-v2-tabs.mjs`, `detay-v2-qa.mjs`, `detay-v2-bilgi.mjs` geçti. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px aralık.
- Görüntüler (`screenshots/detay-v2/varsayilan/`): **`a-b-alternatif-yanyana.png`**, `{chromium,webkit}-390-{a,b}-alternatif-acik.png`, `galeri.png`.

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a&not=a
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=b&not=b

---

## Ek: Şef/yazar kartı — üç yeni tasarım (?yazar=b|c|d, 10 Ekim)

Bu ek, önceki "yazar b'yi baştan tasarla" ve "yazar c" eklerinin yerine geçti. `?yazar=a` değişmedi (referans). Eski b kaldırıldı; eski görüntüleri `r2/eski-*` olarak duruyor. Değişen dosyalar: `detay-v2.js` (şablonlar), `detay-v2.css`, `docs/detay-v2-tabs.mjs`, `detay-v2.html` (`?v=` yenilendi).

### Araştırma notları

Önceki tur (390, canlı):
- **Cookpad:** başlık altında satır içi kimlik + adımlar sonunda ortalı kart ve tam genişlik Follow. → İki kademe; sayfa içinde tek eylem.
- **NYT Cooking:** yalnız "By Ad" bağlantısı. → Profil sinyali bağlantının kendisi; takip yok.
- **Tasty:** ad + ekip + tarih, satır içi. → Hafif byline.
- **Kitchen Stories:** 54 px fotoğraf + ad + tarih. → Büyük avatar güven veriyor.
- **yemek.com:** beyaz kart, 48 px avatar, onay rozeti, "ŞEF" etiketi, kompakt "Takip et". → Unvan etiketi + kompakt eylem.
- **Nefis:** bant içinde 60 px avatar, @kullanıcı, takipçi sayısı, kırmızı "Takip Et". → Sayı + etiket.

Bu tur:
- **Allrecipes** (canlı): "Submitted by Ad" + yeşil onaylı "Tested by Allrecipes Test Kitchen". → Güven sinyali yalnız gerçek veri varsa, ayrı satır.
- **SideChef** (canlı): 56 px avatar, bağlantılı ad, uzun biyografi; takip yok. → Kart profile gider; biyografi en çok 2 satır.
- **YouTube** (canlı mobil web): avatar + kanal + koyu "Subscribe" hapı + ikon eylemler. → Tek birincil eylem; bildirim ikincil ikon.
- **Instagram** (canlı, kısmi giriş duvarı): halkalı avatar, ad + tik, sayaçlar, iki eşit düğme. → Sayaç sütunları, kalın rakam + etiket; halka ilgi çeker.
- **Substack / Medium** (canlı): küçük avatar + ad satırı; Medium'da "Written by" kutusu ve çerçeveli Follow. → Çerçeveli takip, sakin kutu.
- **Spotify** (canlı): ortalı büyük avatar, aylık dinleyici, çerçeveli Follow. Ana eylem (oynat) çok daha baskın. → Takip bilerek ikincil.
- **Mobbin / Dribbble:** Mobbin giriş istiyor, notlar ürün bilgisinden; Dribbble canlı. Tekrar eden 4 kalıp:
  - (a) başlık üstünde satır içi byline
  - (b) kompakt kimlik satırı + sağda takip hapı
  - (c) ortalı yığın kart: avatar, ad, 3 sayaç, iki düğme
  - (d) kapaklı profil başlığı, avatar kapağa biner
- Görüntüler: `screenshots/detay-v2/muadil/` (allrecipes, sidechef, youtube, instagram, substack, medium, spotify, dribbble-*; önceki turun cookpad, nyt, tasty, kitchenstories, yemek, nefis, canli-*).

### İlkeler

1. **Önce kimlik:** 56 px avatar + 20/700 ad; kimlik ilk bakışta okunur. Ad en çok 2 satır + "…".
2. **Tek birincil eylem, dozunda:** Takip et kartın tek güçlü eylemi, Abone ol ikincil (zil ya da nötr/metin). Sabit ve 52 px olan Pişirmeye Başla'dan küçük ve sayfa içi.
3. **Güven sinyali = gerçek sayı + etiket:** Tarif, Takipçi, üyelik yılı. Veride olmayan (Eline Sağlık toplamı, ortalama puan, onay) gösterilmez. Unvan, canlıdaki zeminsiz büyük harf rozet.
4. **Bütün kart profile gider:** kartı kaplayan bağlantı + ok; düğmeler üstte ayrı 44 px hedef. Profil sayfası yok, "yakında" bildirimi.
5. **Durum değişimi zıplatmaz:** "Takip et" ↔ "Takip ediliyor" (fa-user-check) aynı ızgara hücresinde üst üste. Düğme genişliği büyük etikete sabit, kart yüksekliği değişmez.

### Tasarımlar ve gerekçe

| | Kurgu | Dayandığı referans / ilke | Eylem dengesi |
|---|---|---|---|
| **b · Kapaklı profil kartı** | İnce çizgili kart; üstte 56 px açık domates kapak bandı, avatar beyaz halkayla banda biner. Sağda zil (Abone ol) + kompakt Takip et. Altta ad (20/700) + ok, rozet, satır içi sayılar | Dribbble (d) kapaklı profil, X/Spotify başlığı; ilke 1, 4 | Takip et dolu `--tomato-dark` ama kompakt (yalnız kendi genişliği); Abone ol 44 px zil ikonu |
| **c · İstatistik odaklı kart** | İnce çizgili beyaz kart; avatar (primary halka) + yanında 3 eşit sayaç sütunu (rakam 18/700 üstte, etiket altta, ince ayraç). Altında ad + ok ve rozet; en altta iki eşit düğme | Instagram profil başlığı, Dribbble (c); ilke 3 | Takip et tonlu (açık domates zemin), Abone ol beyaz + çizgi, normal ağırlık; ikisi de 44 px |
| **d · Ortalı tanıtım kartı** | Çizgisiz nötr zemin kart; ortalı halkalı avatar, ad + ok, rozet, satır içi sayılar; tam genişlik çerçeveli Takip et, altında metin Abone ol | Medium "Written by", Cookpad tarif sonu kartı, Spotify; ilke 2 | Takip et `--tomato-dark` çerçeve (dolu değil); Abone ol metin eylemi |

- Ortak kurallar: Gilroy, FA solid, kart radius'u, spacing token'ları, kahverengi yok. Krem yerine nötr `--line` avatar zemini; canlıdaki krem kural gereği taşınmadı.
- Bilinen ödünleşim: araştırmaya göre ortalı büyük yığın (d) daha çok profil ekranına özgü ve tarif detayında en uzun kart (390'da 285 px). b ve c 187–200 px.
- Misafir: Takip et / Abone ol giriş kapısını açar (webdeki gibi). Durum değişimi üye önizlemesinde doğrulandı.
- Uygulama notu: ortak bir `:active` basma efekti bağlantıya `transform` verip kaplayan katmanı küçültüyordu (kart kenarına dokunma profil açmıyordu). b/c/d'de bağlantının transform'u kapatıldı ve kartın düğme dışındaki her dokunuşu profil sayıldı.

### Ölçüm (`docs/detay-v2-tabs.mjs`, Chromium + WebKit × 360/390/430; tümü geçti)

- Küçük metin kontrastı b / c / d en düşük **4,94:1**.
- Avatar 56 × 56 (w/h/min aynı). Takip et / Abone ol hedefleri 44 px.
- Uzun ad:
  - En uzun gerçek ad "Şahnur Poyrazoğlu" üçünde de tek satır.
  - Yapay stres ("Ayşegül Nilüfer Karamustafaoğlu-Büyükyıldırım" + uzun unvan) 2 satır + "…"; çakışma ve taşma 0.
- Fotoğrafsız: veride hiçbir şefin fotoğrafı yok; tüm testler baş harf durumunda.
- "Takip ediliyor" (üye önizlemesi, 390): b 187,5 px / 152,3 px, c 200,3 px / 154 px, d 285,5 px / 318 px (kart yüksekliği / düğme genişliği). Önce ve sonra aynı, **zıplama yok**.
- Kartın boş köşesine dokunma → "… profili yakında" bildirimi; Takip et dokunuşu profili tetiklemiyor.
- Regresyon: `detay-v2-qa.mjs`, `detay-v2-varsayilan.mjs` geçti. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.

### Görüntüler (`v3-app/docs/screenshots/detay-v2/r2/`)

- **a · b · c · d yan yana (390): `yazar-a-b-c-d-yanyana.png`**
- "Takip ediliyor" durumları: `yazar-bcd-takipte.png`; 360 stres: `yazar-bcd-stres-360.png`
- Tek tek: `{chromium,webkit}-{360,390,430}-yazar-{b,c,d}{,-uzun-ad,-stres}.png`, `*-390-yazar-{b,c,d}-{baglam,takipte}.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=b
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=c
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=d

---

## Ek: Bütün yerel tariflerde alternatif malzeme ve alerjen — gerçek veri (10 Ekim)

Alternatif malzeme (shuffle + "Yerine ne kullanabilirim?" sheet'i) ve Alerjen kartı **tasarım seçeneği değil**: `yazar` ve `not` parametrelerinden bağımsız. Verisi olan her tarifte görünür, olmayanda görünmez (webdeki gibi).

**Yöntem**
- `docs/detay-v2-veri-topla.mjs` (salt okuma), detay-v2'nin kullandığı **42 tarifin** hepsi için (32 ortak `ld-source` + 10 `detay-v2-tarifler.js`):
  - prototip verisi
  - canlı `https://dadagastro.com/tarif/{slug}` sayfası (42/42 HTTP 200): malzeme satırı başına `.ing-pop` alternatifleri ve `.note-duo` Hatırlatma/Editör Notu metni
  - Laravel `database/data/ic-recipes/*.json` (121 dosya; alternatif alanı `ingredients[].substitutes`, alerjen `remind_text` içindeki "Alerjen:" cümlesi)
- Sonuç `docs/detay-v2-veri.json`.
- **Bulgu: prototip verisi canlıyla zaten birebir aynı.** 42 tarifte alternatif metinleri, hangi satırda olduğu, alerjen cümleleri ve Hatırlatma metinleri aynı (metin düzeyinde 0 fark). Bu yüzden veri dosyasına yama gerekmedi; uydurma ekleme yapılmadı.
- **Laravel:** 8 tarif başlıkla eşleşti (Yunan Karides Sote, Düdüklüde Lahana Sarması, Kırmızı Fasulye Yahnisi, İran Usulü Balık Kebabı, Karabuğday Kaplamalı Levrek, Chelsea Bun, Frijoles Refritos, Jamaika Reçeli). Bunlarda repo sürümünde de alternatif yok.
  - **Repo ile canlı farkı:** İran Usulü Balık Kebabı'nda repo `remind_text` alerjen cümlesi içermiyor, canlıda "Malzeme listesine göre balık içerir…" var.
  - Shami Kebap repo kaydı da eski (önceki ek). Canlı esas alındı.

**Bu turdaki düzeltmeler (`detay-v2.js`)**
- Alerjen etiketi ayrıştırması: yalnız parantez dışındaki virgülden bölünüyor. "Süt ve süt ürünleri", "Gluten (un)", "Süt ve süt ürünleri (süt, tereyağı)" tek kategori kalıyor (önce " ve "den bölünüyordu). "yalnızca" öneki etiketten atılıyor (Sardalya: **Balık**).
- Alerjen metni webdeki "Alerjen:" sonrasıdır ve kart başlığı zaten "Alerjen" olduğundan küçük harfle başlıyordu. Yalnız gösterimde ilk harf büyütülüyor; metin değişmedi.
- Alerjen cümlesi sonraki "Önemli:/Dikkat:" cümlesinde biter; sonrası Hatırlatma kartında kalır (Sardalya: "Dikkat: ızgara teli…" Hatırlatma'da).
- Bilinçli sınır: Patates Mücveri gibi bazı tariflerde yumurta, un, peynir var ama canlıda alerjen cümlesi yok. Alerjen kartı gösterilmedi, malzemeden alerjen türetilmedi.

**Tablo** (42 tarif; 32 alternatifli, 13 alerjenli, 6'sında ikisi birden, 3'ünde hiçbiri)

| # | Tarif | Alternatif (canlı → mobil) | Alerjen (canlı → mobil) |
|---|---|---|---|
| 1 | Tavuk Curry | yok → yok | yok → kart yok |
| 2 | Yunan Usulü Limonlu Karides Sote | yok → yok | **var** → kart |
| 3 | Düdüklüde Balkan Usulü Lahana Sarması | yok → yok | yok → kart yok |
| 4 | Kırmızı Fasulye Yahnisi | yok → yok | **var** → kart |
| 5 | Patates Mücveri | **var** (4 malzeme) → 4 | yok → kart yok |
| 6 | Sagdana | **var** (4 malzeme) → 4 | **var** → kart |
| 7 | Pastéis de Feijão | **var** (3 malzeme) → 3 | yok → kart yok |
| 8 | Tarte de Amêndoa | **var** (3 malzeme) → 3 | yok → kart yok |
| 9 | Sardalya Izgara | yok → yok | **var** → kart |
| 10 | Güveçte Ayvalı Tavuk | **var** (6 malzeme) → 6 | **var** → kart |
| 11 | Ördek Dolması | **var** (6 malzeme) → 6 | yok → kart yok |
| 12 | Tuzsuz Bebek Tavuk Suyu | **var** (4 malzeme) → 4 | yok → kart yok |
| 13 | Arroz con Pato | **var** (2 malzeme) → 2 | yok → kart yok |
| 14 | Asam Pedas | **var** (10 malzeme) → 10 | yok → kart yok |
| 15 | Jiao Yan Karides | **var** (5 malzeme) → 5 | yok → kart yok |
| 16 | İran Usulü Baharatlı Acılı Balık Kebabı | yok → yok | **var** → kart |
| 17 | Karabuğday Kaplamalı Levrek | yok → yok | **var** → kart |
| 18 | Mercimekli Yaprak Sarma | **var** (7 malzeme) → 7 | **var** → kart |
| 19 | Lor Dolması | **var** (4 malzeme) → 4 | **var** → kart |
| 20 | Chelsea Bun | yok → yok | **var** → kart |
| 21 | Moin Moin | **var** (4 malzeme) → 4 | yok → kart yok |
| 22 | Waakye | **var** (2 malzeme) → 2 | yok → kart yok |
| 23 | Enfrijoladas | **var** (6 malzeme) → 6 | yok → kart yok |
| 24 | Frijoles Refritos | yok → yok | **var** → kart |
| 25 | Semizotlu Yumurta | **var** (3 malzeme) → 3 | yok → kart yok |
| 26 | Masabeeb | **var** (4 malzeme) → 4 | yok → kart yok |
| 27 | İrimşik | **var** (2 malzeme) → 2 | **var** → kart |
| 28 | Mamounia | **var** (4 malzeme) → 4 | yok → kart yok |
| 29 | Kiev Pastası | **var** (3 malzeme) → 3 | yok → kart yok |
| 30 | Tamriyeh | **var** (3 malzeme) → 3 | yok → kart yok |
| 31 | Tepsi Kadayıfı | **var** (3 malzeme) → 3 | yok → kart yok |
| 32 | Muska Tatlısı | **var** (4 malzeme) → 4 | yok → kart yok |
| 33 | Mısır Koçanı Jölesi | **var** (3 malzeme) → 3 | yok → kart yok |
| 34 | Şadok Kabuğu Reçeli | **var** (2 malzeme) → 2 | yok → kart yok |
| 35 | Mürver Çiçeği Jölesi | **var** (3 malzeme) → 3 | yok → kart yok |
| 36 | Japon Ayvası Jölesi | **var** (1 malzeme) → 1 | yok → kart yok |
| 37 | Jamaika Usulü Ananas Zencefil Reçeli | yok → yok | yok → kart yok |
| 38 | Shami Kebap | **var** (5 malzeme) → 5 | **var** → kart |
| 39 | Tire Köfte | **var** (4 malzeme) → 4 | yok → kart yok |
| 40 | Pırasa Köftesi | **var** (3 malzeme) → 3 | yok → kart yok |
| 41 | Yeni Dünya Kebabı | **var** (3 malzeme) → 3 | yok → kart yok |
| 42 | Kağıtta Köfte | **var** (4 malzeme) → 4 | yok → kart yok |

**Otomatik doğrulama:** `docs/detay-v2-veri-dogrula.mjs` — **tümü geçti**. Kapsam:
- Her tarif `detay-v2.html?tarif=…` ile açıldı. Alternatifli satırlar canlıdaki satırlarla birebir (konum dahil). Alerjen kartı canlı cümleyle aynı.
- Alternatifli her tarifte ilk sheet açıldı ve canlıdaki ilk alternatif adını gösterdi.
- Varsayılan Shami'de 10 parametre bileşimi (parametresiz, `yazar=a|b|c|d`, `not=a|b` ve karışık), Chromium + WebKit: 5 shuffle + Hatırlatma + Alerjen her birinde var.
- Konsol hatası yok.
- Regresyon: `detay-v2-bilgi`, `-tabs`, `-varsayilan`, `-qa` geçti; kaydırma sorunsuz.

**Görüntüler (390)** `v3-app/docs/screenshots/detay-v2/veri/`:
- **`uc-ornek-yanyana.png`**: Güveçte Ayvalı Tavuk (alternatif + alerjen), Sardalya Izgara (yalnız alerjen), Patates Mücveri (yalnız alternatif). Her biri için şerit, alerjen kartı ve malzeme listesi.
- Tek tek: `chromium-390-{guvecte,sardalya,patates-mucveri}.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=b
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=c

---

## Ek: Bilgi kartı tek tasarım — eski ?not=b (Beyar kararı, 10 Ekim)

- Şeritteki bütün bilgi kartları (Hatırlatma · Alerjen · varsa Editör Notu) artık tek tasarımla, varsayılan olarak çiziliyor: nötr zemin, solda içeride kalan ince domates şerit, büyük harf etiket başlık, FA solid ikon.
- `?not` parametresi kaldırıldı (`detay-v2.js` artık okumuyor). A kuralları CSS'ten silindi; B kuralları koşulsuz (`body.dv2 …`).
- Eski linkler: `?not=a` ve `?not=b` hata vermeden aynı tasarımı gösteriyor.
- `?yazar=a|b|c|d` bu karardan etkilenmiyor.
- İçerik kuralları aynen kaldı: 4 satır + "…", "Devamını oku" → sheet, alerjen etiketleri yalnız "Alerjen:" cümlesinden, beslenme özellikleri çiplerde. Tek kart tam genişlik.

**Doğrulama:** `docs/detay-v2-not.mjs` (Chromium + WebKit × 360/390/430): **tümü geçti**.
- 9 bağlantı bileşiminde tasarım imzası aynı: zemin, kenarlık 0, şerit, büyük harf başlık. Bileşimler: `yazar=a`, `yazar=a&not=a`, `yazar=a&not=b`, `not=a`, `yazar=b&not=a`, `yazar=c`, `yazar=d&not=b` ve Mısır ile iki bileşim.
- Yazar seçeneği her bağlantıda doğru.
- Konsol hatası yok.
- Regresyon: `detay-v2-tabs` (R3 kırpımı artık `r3/*-bilgi-karti.png`), `-bilgi`, `-qa`, `-veri-dogrula` geçti; kaydırma sorunsuz.

**Görüntüler (390, ?yazar=a)** `v3-app/docs/screenshots/detay-v2/r3/`:
- **`bilgi-karti-tek-tasarim.png`**: Shami (Hatırlatma → Alerjen) ve Mısır (tek kart)
- Tek tek: `chromium-390-yazar-a-shami-serit.png`, `chromium-390-yazar-a-shami-serit-alerjen.png`, `chromium-390-yazar-a-misir-serit.png`
- Eski `r3/*-not-{a,b}.png` ve `not-a-b-yanyana.png` arşiv olarak duruyor.

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a&tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole

---

## Ek: ?yazar=b yeniden — A'nın zengin sürümü (10 Ekim)

Beyar önceki b'yi (kapaklı profil kartı) beğenmedi. `?yazar=a`, `c`, `d` değişmedi; yalnız b yeniden yapıldı (`detay-v2.js` b şablonu, `detay-v2.css` b kuralları). Deneysel kurgu yok: A'nın iskeleti, daha zengin ve belirgin.

**Yapı** (beyaz kart, ince `--line` çizgi, kart radius'u; satırlar arası eşit 16 px ritim, iç boşluk 16 px)
1. **Üst satır:** 56 px baş harf avatar, 2 px beyaz + 2 px primary ince halka. Ad öne çıkan kart başlığı (20/700), tek satır, uzunsa "…". Altında zeminsiz, büyük harf, primary, etiket ölçeğinde unvan rozeti (fa-award). Sağda profile giden ok.
2. **Orta satır:** Tarif · Takipçi · Üyelik (yıl) üç eşit sütun. Rakam 18/700 mürekkep, etiket meta (13) `--slate-2`, aralarında ince dikey ayraç. Üçüncü sinyal gerçek üyelik yılı; Eline Sağlık ya da puan şef verisinde yok, gösterilmedi.
3. **Alt satır:** Takip et açık primary zemin (`--tomato-tint` + `--tomato-deep` kalın), geniş. Yanında kompakt Abone ol (beyaz, ince çizgi, zil + metin). İkisi de 44 px.

- Takip et → **"Takip ediliyor"** (fa-user-check, onaylı kişi ikonu) + beyaz/çizgi. İki etiket aynı hücrede üst üste; genişlik ve yükseklik değişmiyor (390'da kart 206,7 px, düğme 188,4 px; önce ve sonra aynı).
- Bütün kart profile gider (kaplayan bağlantı + ok); "… profili yakında" bildirimi.
- Pişirmeye Başla dengesi: Takip et dolu değil, açık zemin; 44 px ve kartın içinde. Sabit, dolu ve 52 px olan Pişirmeye Başla ile yarışmıyor.

**Kontrol** (`docs/detay-v2-tabs.mjs`, Chromium + WebKit × 360/390/430; **tümü geçti**)
- Kontrast en düşük 4,94:1. Hedefler 44 px. Avatar 56 × 56. Fotoğrafsız (verideki tüm şefler).
- Stres testi (yapay uzun ad "Ayşegül Nilüfer Karamustafaoğlu-Büyükyıldırım" + uzun unvan + **12.450 / 128.300** sayıları): ad 1 satır + "…"; sayaç, rozet ve düğme metinlerinde kesilme 0, çakışma 0, taşma 0.
- `sekme=hazirlanis` ve `sekme=yorumlar`: kartın boyutu, stili ve iç öğe konumları Malzemeler ile birebir aynı.
- Regresyon: `detay-v2-qa`, `-varsayilan`, `-veri-dogrula`, `-not`, `-bilgi` geçti. Kaydırma sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.

**Görüntüler** (`v3-app/docs/screenshots/detay-v2/r2/`)
- **a · b · c · d yan yana (390): `v3-app/docs/screenshots/detay-v2/r2/yazar-a-b-c-d-yanyana.png`**
- b "Takip ediliyor": `chromium-390-yazar-b-takipte.png` (b · c · d birlikte: `yazar-bcd-takipte.png`)
- 360 stres (uzun ad + büyük sayılar): `chromium-360-yazar-b-stres.png`, `yazar-bcd-stres-360.png`
- Tek tek: `{chromium,webkit}-{360,390,430}-yazar-b{,-uzun-ad,-stres}.png`, `*-390-yazar-b-baglam.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=b
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=c
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=d

---

## Ek: Besin Değerleri — kompakt (10 Ekim)

Değişen dosyalar: `detay-v2.js` (bölüm şablonu + şerit göstergesi), `detay-v2.css` (eski ızgara kuralları kaldırıldı), `detay-v2.html` (`?v=` yenilendi). Yeni betik `docs/detay-v2-besin.mjs` (`once` / `sonra` ölçümü); `docs/detay-v2-bilgi.mjs` yeni yapıya güncellendi.

**Yerleşim** (dış çerçeveli kart kaldırıldı; kutular sayfadaki bilgi kartlarıyla aynı kalıp: nötr zemin, kontrol radius'u)
1. **Kalori**: tek öne çıkan kutu (açık domates zemin). FA solid alev ikonu, "391 kcal" (24/700), sağda "Kalori".
2. **Protein · Karbonhidrat · Yağ** tek satırda, üç eşit sütun, ince ayraçlı. Her sütunda renk işareti + ad, değer + yüzde ("31 g %31"). Renk işareti ve yüzde makro çubuğunun lejantı.
3. **Makro oranı çubuğu**: 4 px, renkler aynı token'lar (`--tomato`, `--yellow`, `--green`).
4. **Lif · Şeker · Sodyum · Doymuş Yağ**: yarım genişlik kutular, yatay snap'li şerit.
   - Kutu genişliği (alan − 8) / 2, ekranda tam 2 kutu, yarım kesik kutu yok.
   - Snap iki kutuda bir sayfa; kaydırınca kalan 2 kutu tam oturuyor.
   - Şerit 44 px+ dokunma alanı, klavyeyle odaklanabilir (`role=group`, açıklayıcı `aria-label`).
5. **Not** tek satır: "Tahmini değerler · 1 porsiyon" (veri "Değerler tahminidir" ise). Sağında şerit konum göstergesi (2 kısa çizgi, kaydırmayla güncellenir); şeridin kaydırılabilir olduğunu belli ediyor.

- Veride olmayan hücre çizilmez; P/K/Y'den biri yoksa sütun sayısı azalır.
- Porsiyon değişse de değerler sabit; ölçüldü.
- Başlıktaki "1 porsiyon" ifadesi nota taşındı (tekrar olmasın diye).

**Yükseklik** (`.dv2-nutrition`, önce → sonra; Shami ve Mısır aynı)

| Genişlik | Chromium | WebKit |
|---|---|---|
| 360 | 542,9 → **239,0 px** (−%56) | 543,0 → **239,1 px** |
| 390 | 498,2 → **239,0 px** (−%52) | 498,3 → **239,1 px** |
| 430 | 498,2 → **239,0 px** (−%52) | 498,3 → **239,1 px** |

**Kontrol**
- `docs/detay-v2-besin.mjs sonra` (Chromium + WebKit × 360/390/430 × Shami, Mısır): **tümü geçti**.
  - Şeritte tam görünen kutu 2/4, yarım kutu 0.
  - Kaydırınca da 2 tam kutu (Sodyum, Doymuş Yağ), yarım 0.
  - Not 1 satır. Hiçbir metin kesilmiyor (360'ta "Karbonhidrat" dahil). Yatay taşma ve konsol hatası yok.
- `docs/detay-v2-bilgi.mjs`: 8 alan canlıyla birebir ve aynı sırada; makro yüzdeleri canlıyla aynı; konum sekmelerin altında, Tarif bilgileri ve Benzer'den önce.
- `docs/detay-v2-tabs`, `-qa`, `-varsayilan`, `-veri-dogrula`, `-not`: geçti.

**Görüntüler** (`v3-app/docs/screenshots/detay-v2/besin/`)
- Önce / sonra / şerit kaydırılmış yan yana (390): **`once-sonra-shami.png`**, **`once-sonra-misir.png`**
- Tek tek: `once-{chromium,webkit}-390-{shami,misir}.png`, `sonra-{chromium,webkit}-390-{shami,misir}{,-kaydirilmis}.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a&sekme=hazirlanis
- Kaydırma (`scroll-compare`, `scroll-frames`) yeniden ölçüldü, bozulma yok: panel yapışmasında header altında 0 koyu piksel, sekme yapışmasında 0 px aralık.

---

## Ek: Besin alt satırı + varsayılan tarif Türk mutfağı (10 Ekim)

### 1) Besin Değerleri alt satırı

- Lif · Şeker · Sodyum · Doymuş Yağ şeridi ve sayfa göstergesi **kaldırıldı**.
- Dört değer artık tek satırda eşit sütunlar. Hemen üstteki Protein · Karbonhidrat · Yağ satırıyla **aynı kalıp**: üstte etiket (meta), altta kalın rakam + birim, sütunlar arasında ince dikey ayraç, kutu zemini yok.
- Rakamlar tek satır ve bütün sütunlarda aynı taban çizgisinde (alta hizalı). Dar ekranda etiket iki satıra inebiliyor; sütun yükseklikleri eşit kalıyor.
- Sütun sayısı veriye göre (`--dv2-n`); eksik değer varsa kalan sütunlar eşit yayılıyor.
- Ortak sütun aralığı 8 → 4 px (ayraç sonrası 8 px iç boşluk aynı). "Doymuş Yağ" tek satırda 74 px; 390'daki alan 73 px'ten 76 px'e çıktı ve tek satıra sığdı. 360'ta alan 68 px, etiket iki satır.
- Not en altta tek satır: "Tahmini değerler · 1 porsiyon".

**Yükseklik** (`.dv2-nutrition`; Shami, Mısır, Mercimekli Yaprak Sarma aynı)

| Genişlik | Önceki tur (şerit) | Bu tur (4 sütun) |
|---|---|---|
| 360 | 239,0 px | **252,6 px** (Chromium) · 252,9 px (WebKit); "Doymuş Yağ" iki satır (+18 px) |
| 390 | 239,0 px | **234,4 px** · 234,7 px |
| 430 | 239,0 px | **234,4 px** · 234,7 px |

İlk hâle (390'da 498 px, 360'ta 543 px) göre: 390/430'da −%53, 360'ta −%53.

### 2) Varsayılan tarif: Mercimekli Yaprak Sarma (Adıyaman usulü, Türk Mutfağı)

Önceki rapordaki "hem alternatif hem alerjen" altı tariften başlandı. Sagdana (Suudi Arabistan), İrimşik (Kazak) ve Shami (Pakistan) Türk değil. Kalan üç Türk tarifi şartların hepsini gerçek veride karşılıyor:

| Tarif | Alternatif | Alerjen | Besin | Kapak | Adım (fotoğraflı) | Yazar |
|---|---|---|---|---|---|---|
| Güveçte Ayvalı Tavuk | 6 | süt ve süt ürünleri | 8/8 + makro | 1600×1074 | 7 (0) | Cem Aydan · Kıdemli Yamak · 37 tarif · 14 takipçi |
| **Mercimekli Yaprak Sarma** | **7** | buğday (gluten) | 8/8 + makro | 1600×1074 | 5 (**4**) | Mert Taşlı · Aşçı Yamağı · 22 tarif · 12 takipçi |
| Lor Dolması | 4 | süt ve süt ürünleri, yumurta | 8/8 + makro | 1600×1074 | 5 (2) | Dağhan Fahri · Komi · 14 tarif · 16 takipçi |

**Seçim gerekçesi:**
- En çok alternatif malzeme (7): alternatif özelliği varsayılan açılışta en iyi bu tarifte görülüyor.
- 5 adımın 4'ünde adım fotoğrafı var; Hazırlanış ve pişirme modu tam görünüyor.
- Kapak fotoğrafında yemek net. Güveçte'de tabak büyük ölçüde header bölgesinde kalıyor.
- Bilinen eksik: bu tarifte yorum yok (canlıda da). Yorumlar sekmesi boş durum gösteriyor; değerlendirme 1.

Uygulama: `detay-v2-tarifler.js` (ve onu üreten `docs/detay-v2-extract.mjs`) `DV2_DEFAULT_RECIPE` = `mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli`. Shami Kebap `?tarif=shami-kebap-…` ile açılıyor (5 alternatif, alerjen; test edildi). Galeri ve liste/ana sayfa bağlantıları değişmedi.

### Kontrol
- `docs/detay-v2-besin.mjs sonra` (Chromium + WebKit × 360/390/430 × Mercimekli, Shami, Mısır). Kontrol edilenler:
  - alt satır sütunları veriyle aynı, eşit yükseklik, tek taban çizgisi, rakamlar 1 satır, zemin yok, ayraçlar var
  - not 1 satır
  - kesilen metin yok, yatay taşma yok, konsol hatası yok
- `docs/detay-v2-varsayilan.mjs`: parametresiz, `?yazar=a&not=a` ve `?yazar=b&not=b` → Mercimekli; shuffle sayısı veriyle aynı (7); Hatırlatma + Alerjen; Besin bölümü; ilk alternatif sheet'i ("sarı mercimek"). `?tarif=shami` ve `?tarif=curry` doğru; galeri ve liste bağlantıları doğru.
- Diğerleri: `-veri-dogrula` (parametre bağımsızlığı yeni varsayılana göre), `-tabs`, `-qa`, `-not`, `-bilgi`; kaydırma (`scroll-compare`, `scroll-frames`).

### Görüntüler
- Varsayılan + Mısır (390): **`screenshots/detay-v2/varsayilan/varsayilan-misir-yanyana.png`**; içinde bilgi şeridi, Alerjen kartı, besin bölümü, alternatif sheet'i. Tek tek: `varsayilan/{varsayilan,misir}-{serit,serit-alerjen,besin,alternatif-sheet}.png`
- Besin önce/sonra: önceki tur `besin/once2-*-390-{shami,misir}.png` → bu tur `besin/sonra-*-390-{varsayilan,shami,misir}.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a&sekme=hazirlanis
http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a

**Regresyonda bulunan ve düzeltilen hata (görsel yolları)**
- Yeni varsayılan tarifin adım görselleri `http://127.0.0.1:8765/varliklar/…adim1.webp` olarak isteniyor ve **404** veriyordu.
- Neden: ortak `ld-source.js` verisinde 68 adım/galeri görseli göreli `/varliklar/…` yolunda; yerel sunucuda yok. Shami/Curry'de adım görseli olmadığı için daha önce görünmüyordu.
- Düzeltme: `detay-v2-tarifler.js` (ve `docs/detay-v2-extract.mjs` şablonu) tarifler belleğe eklenirken PARITY ve DATA içindeki `/varliklar/…` yollarını canlı köke (`https://dadagastro.com/varliklar/…`, 200 / image/webp doğrulandı) çeviriyor. Ortak dosya değişmedi.
- Sonuç: göreli yol 0. Adım fotoğrafları görünür alana gelince canlıdan yükleniyor; 4xx yok.
- Aynı göreli yollar galeri dizilerinde de var; kuyruktaki "galeri boş açılıyor" hatasıyla ilgisi orada ayrıca incelenecek.
- `docs/detay-v2-bilgi.mjs` makro seçicisi yeni alt satırı (aynı sınıf) dışarıda tutacak şekilde düzeltildi.
- Son koşu (yol düzeltmesinden sonra): `detay-v2-tabs`, `-bilgi`, `-varsayilan`, `-besin sonra`, `-veri-dogrula`, `-qa`, `-not` **tümü geçti**. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.

---

## Ek: Tam ekran galeri boş açılıyordu — düzeltme (10 Ekim)

**Neden**
- Hero'ya dokununca ortak `ld-source.js` `openGallery`, kapak için `recipeInfo(recipe).gallery` dizisini kullanıyor. Görseli `<div class="gallery-image photo">` üzerinde CSS `background-image` olarak çiziyor.
- Mercimekli Yaprak Sarma dahil birçok tarifte bu dizideki kapak yolu göreli: `/varliklar/media/yayilim/t-…-kapak.webp`. Yerel sunucuda (127.0.0.1:8765) bu yol **404** veriyor. CSS arka planı yüklenemeyince hata da olay da yok; sonuç sayaç + oklar + boş gri alan.
- Shami gibi mutlak yollu tariflerde sorun görünmüyordu.
- Lazy-load / `data-src` kaynaklı değil (kaynak galeri tembel yüklemiyor).
- Ortak veride toplam 68 göreli adım/galeri yolu vardı.

**Düzeltme** (yalnız `detay-v2.js`, `detay-v2.css`, `detay-v2-tarifler.js`; ortak dosyalar değişmedi)
1. **Yol:** bir önceki işte eklenen veri katmanı düzeltmesi (`/varliklar/…` → `https://dadagastro.com/varliklar/…`) galeri dizilerini de kapsıyor. Göreli yol 0.
2. **Yeni galeri (detay-v2):** kaynak galeri tetikleyicileri (kapak, adım, yorum, foto duvarı) yakalanıp detay-v2 galerisi açılıyor.
   - İçerik: kapak (hero) + tarif galerisi + bütün adım görselleri tek dizide, yinelenenler atılıyor. Adım görseline dokununca galeri o görselden açılıyor. Alt yazı "Kapak" ya da "1. adım · Yaprakları hazırla".
   - Görünüm: `<img>` + `object-fit: contain`, ekrana sığıyor (üst/alt güvenli alan payıyla); koyu marka zemini (`--overlay`).
   - Tek görselde sayaç ve ileri/geri okları **gizli**, yalnız Kapat (sağda). Birden fazla görselde swipe (scroll-snap) + oklar (uçlarda pasif) + sayaç + ←/→ tuşları.
   - Kapatma: Kapat düğmesi, Esc, aşağı sürükleme (96 px eşik; altında geri yaylanır). Yerel görsel sürüklemesi `pointercancel` üretip sürüklemeyi bozuyordu; `draggable=false` + `user-select:none` + işaretçi yakalama ile çözüldü.
   - Arka plan kilitli (html/body `overflow:hidden`; tekerlek denemesinde sayfa kaymadı). Kapanınca sayfa aynı konumda (600 → 600).
   - Görsel yüklenemezse boş gri kutu yerine "Görsel yüklenemedi" + FA solid görsel ikonu.
   - Yakındaki görseller önceden, uzaktakiler kaydırınca yükleniyor (`data-src`).

**Kontrol** (`docs/detay-v2-galeri.mjs`, Chromium + WebKit, 390): **tümü geçti**
- Varsayılan (5 görsel), Mısır (3), Shami (1). Kontrol edilenler:
  - açılışta görsel yüklü, `naturalWidth` 1600, `object-fit: contain`, ekrana sığıyor, koyu zemin
  - çoklu görselde sayaç "1 / N" ve oklar; tek görselde ikisi de gizli
  - ileri düğmesi, swipe ve ok tuşu
  - Esc, aşağı sürükleme ve Kapat; kilit; konum korunuyor
- Hata durumu: kapak isteği engellendi → "Görsel yüklenemedi" görünüyor.
- Konsol hatası ve 4xx yok.
- **Bütün yerel tarifler (42):** kapağa dokunuldu, ilk görsel yüklendi (`naturalWidth > 0`). 18 tarifte birden fazla görsel (adım görselleriyle).

| # | Tarif | Galerideki görsel | İlk görsel naturalWidth | Sonuç |
|---|---|---|---|---|
| 1 | Tavuk Curry | 1 | 1600 px | yüklendi |
| 2 | Yunan Usulü Limonlu Karides Sote | 1 | 1600 px | yüklendi |
| 3 | Düdüklüde Balkan Usulü Lahana Sarması | 1 | 1600 px | yüklendi |
| 4 | Kırmızı Fasulye Yahnisi | 1 | 1600 px | yüklendi |
| 5 | Patates Mücveri | 1 | 1600 px | yüklendi |
| 6 | Sagdana | 1 | 1600 px | yüklendi |
| 7 | Pastéis de Feijão | 1 | 1600 px | yüklendi |
| 8 | Tarte de Amêndoa | 1 | 1600 px | yüklendi |
| 9 | Sardalya Izgara | 1 | 1600 px | yüklendi |
| 10 | Güveçte Ayvalı Tavuk | 1 | 1600 px | yüklendi |
| 11 | Ördek Dolması | 1 | 1600 px | yüklendi |
| 12 | Tuzsuz Bebek Tavuk Suyu | 1 | 1600 px | yüklendi |
| 13 | Arroz con Pato | 1 | 1600 px | yüklendi |
| 14 | Asam Pedas | 1 | 1600 px | yüklendi |
| 15 | Jiao Yan Karides | 6 | 1600 px | yüklendi |
| 16 | İran Usulü Baharatlı Acılı Balık Kebabı | 1 | 1600 px | yüklendi |
| 17 | Karabuğday Kaplamalı Levrek | 1 | 1600 px | yüklendi |
| 18 | Mercimekli Yaprak Sarma | 5 | 1600 px | yüklendi |
| 19 | Lor Dolması | 3 | 1600 px | yüklendi |
| 20 | Chelsea Bun | 1 | 1600 px | yüklendi |
| 21 | Moin Moin | 3 | 1600 px | yüklendi |
| 22 | Waakye | 3 | 1600 px | yüklendi |
| 23 | Enfrijoladas | 2 | 1600 px | yüklendi |
| 24 | Frijoles Refritos | 1 | 1600 px | yüklendi |
| 25 | Semizotlu Yumurta | 1 | 1600 px | yüklendi |
| 26 | Masabeeb | 1 | 1600 px | yüklendi |
| 27 | İrimşik | 1 | 1600 px | yüklendi |
| 28 | Mamounia | 5 | 1600 px | yüklendi |
| 29 | Kiev Pastası | 1 | 1600 px | yüklendi |
| 30 | Tamriyeh | 7 | 1600 px | yüklendi |
| 31 | Tepsi Kadayıfı | 5 | 1600 px | yüklendi |
| 32 | Muska Tatlısı | 3 | 1600 px | yüklendi |
| 33 | Mısır Koçanı Jölesi | 3 | 1600 px | yüklendi |
| 34 | Şadok Kabuğu Reçeli | 3 | 1600 px | yüklendi |
| 35 | Mürver Çiçeği Jölesi | 3 | 1600 px | yüklendi |
| 36 | Japon Ayvası Jölesi | 3 | 1600 px | yüklendi |
| 37 | Jamaika Usulü Ananas Zencefil Reçeli | 1 | 1600 px | yüklendi |
| 38 | Shami Kebap | 1 | 1600 px | yüklendi |
| 39 | Tire Köfte | 3 | 1600 px | yüklendi |
| 40 | Pırasa Köftesi | 2 | 1600 px | yüklendi |
| 41 | Yeni Dünya Kebabı | 3 | 1600 px | yüklendi |
| 42 | Kağıtta Köfte | 3 | 1600 px | yüklendi |

**Görüntüler** (`v3-app/docs/screenshots/detay-v2/galeri/`)
- **`galeri-yanyana.png`**: Mercimekli kapak (1/5), Mercimekli adım görseli (2/5), Mısır (1/3), Shami (tek görsel, yalnız Kapat)
- Tek tek: `{chromium,webkit}-390-{varsayilan,misir,shami}-acik.png`, `*-390-varsayilan-adim-gorseli.png`, hata durumu `*-390-hata-durumu.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
- Regresyon (galeriden sonra): `detay-v2-tabs`, `-qa`, `-varsayilan`, `-bilgi` geçti. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.

---

## Ek: Benzer Tarifler — bütün tariflerde (10 Ekim)

**Neden görünmüyordu**
- Veri eksikliği. Ortak `ld-source.js` verisinde 23 tarifin (Güveçte Ayvalı Tavuk'tan Muska Tatlısı'na; Mercimekli Yaprak Sarma dahil) `similar` dizisi **boş**.
- Detay-v2 benzer kartlarını bu diziden ve yerel `DATA.recipes` eşleşmesinden kuruyor; liste boş olunca render koşulu (`similarRecipes.length`) sağlanmıyor, bölüm hiç çizilmiyor.
- Görsel yolu ya da render hatası değil. "Tarif bilgileri"nin altı bu yüzden boştu.

**Veri (gerçek, canlıdan)**
- `docs/detay-v2-benzer-topla.mjs`: yerel 42 tarifin canlı sayfasındaki `.simrec` ("Benzer Tarifler · Bunları da seveceksin") listesi toplandı. Her tarifte 4 benzer tarif var. Sonuç `docs/detay-v2-benzer.json`.
- Bu listelerde yerelde olmayan **20 tarif** canlıdan (`docs/detay-v2-extract.mjs`, birleştirme modu) tam tarif olarak eklendi: malzeme, alternatif, adım, görsel, gerçek yazar. Kartlar açılabilir tariflere gidiyor.
  - Eklenenler: Hühnerfrikassee, Arpa Şehriyeli Sebze Çorbası, Köz Patlıcan ve Yoğurt Ezmesi, Firik Lapası, Izgara Mısır Püresi, Saleeg, Arpa Şehriyeli Pilav, Grechka po-Kupecheski, Kuşkonmazlı Makademya Pilavı, Airfryer'da Hamsili Ekmek, Börülce Yemeği, Sumaklı Yumurta, Nohutlu Baharatlı Yumurta Güveci, Suudi Usulü Düdüklüde Yumurtalı Çerise, Huevos Rellenos, Agedashi Tofu, Pancarlı Kek, Vişneli Islak Kek, Znoud el Sit, Kastera Kek.
  - Bu 20 tarifin kendi benzer listelerinde eksik tarif kalmadı (ikinci tur 0).
- Canlı listeler `detay-v2-tarifler.js` içinde `DV2_SIMILAR` olarak duruyor ve tarifler belleğe eklenirken uygulanıyor. Ortak veri değişmedi.
- **Bulunan ve düzeltilen yan hata:** çıkarım betiğinin "mevcut ek tarifleri oku" ifadesi, dosyaya sonradan eklenen varsayılan tarif bloğu yüzünden eşleşmiyordu. Bu yüzden ilk çalıştırmada önceki 10 ek tarif (Mısır, Shami vb.) düştü. Yedekten birleştirildi (30 ek tarif), ifade düzeltildi. Betik artık `DV2_SIMILAR` bloğunu da koruyor.

**Tasarım**
- Başlık webdeki gibi: üstte küçük etiket "BENZER TARİFLER" (büyük harf, domates koyu), altında "Bunları da seveceksin", sağda "Tümü →" (liste-v2'ye; canlıda "Tamamını Gör" → /tarifler). "Tümü" başlığın son satırıyla taban çizgisinde, 44 px hedefli.
- Kartlar ana sayfa "En son eklenen tarifler" küçük kartıyla **aynı kalıp**. `ana-v3.js` `recipeCard` + `ana-v3.css` `v3-pairs` kaynak-transferi; ortak `ortak-kart.css`/`ortak-kart.js` değiştirilmeden detay-v2'ye bağlandı:
  - 2:3 fotoğraf; süre + puan kapsülü ve kaydet
  - fotoğraf üstünde kalın kategori, 2 satır başlık, yazar (baş harf + ad)
  - metin geometrisine göre koyu örtü (`--dv2-veil`)
- İkişerli slider: tam 2 kart, yarım kart yok, sayfa sayfa snap (`scroll-snap-stop: always`), altta sayfa göstergesi (`?gosterge=b` ile sayaç), ←/→ tuşları. Canlıdaki listeye göre 4 kart / 2 sayfa. Kod 8'e kadar destekliyor.
- Bağlantılar `detay-v2.html?…&tarif=<slug>`: mevcut parametrelerin hepsi (yazar, radius, rozet, gosterge…) korunuyor; `sekme` atılıyor, yeni tarif Malzemeler'den açılıyor.
- Bölüm sekmelerden bağımsız; ortak kuyruğun en sonunda (Besin Değerleri → Tarif bilgileri → Benzer Tarifler), üç sekmede de aynı.

**Doğrulama** (`docs/detay-v2-benzer.mjs`): **tümü geçti**
- Bütün **62 yerel tarif** (42 + 20 yeni; Chromium 390, `?yazar=b&radius=b&rozet=b&sekme=hazirlanis` ile). Kontrol edilenler:
  - bölüm var, ≥4 kart, kartlar yerel tarife gidiyor
  - kart sırası canlı listeyle birebir
  - kart görsellerinin hepsi `naturalWidth > 0`
  - parametreler korunuyor, `sekme` yok
  - başlık metinleri doğru; bölüm kuyruğun sonunda
- Sekme bağımsızlığı (malzemeler / hazırlanış / yorumlar). Kart tıklaması doğru tarifi `yazar=c`, `radius=b` korunarak açıyor.
- Slider (Chromium + WebKit × 360/390/430 × Mercimekli, Shami, Mısır):
  - tam görünen kart 2, yarım 0, gösterge 1/2
  - 2. sayfada 2 tam kart, gösterge 2/2
  - yarım sayfa kaydırma bırakılınca snap ile oturuyor (yarım 0)
  - konsol hatası ve 4xx yok

| # | Tarif | Bölüm | Kart | Görseller yüklendi | Benzer tarifler (yazar) |
|---|---|---|---|---|---|
| 1 | Bunları da seveceksin | var | 4 | 4/4 | guvecte ayvali (Cem Aydan), ordek dolmasi (İrem Egeli), tuzsuz bebek (Ege Bakırcıoğlu), arroz con (Burcu Yıldırım) |
| 2 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), jiao yan (Burcu Akyüz), iran usulu (Şahnur Ilıcalı), karabugday kaplamali (Emel Aksu) |
| 3 | Bunları da seveceksin | var | 4 | 4/4 | mercimekli yaprak (Mert Taşlı), ordek dolmasi (İrem Egeli), lor dolmasi (Dağhan Fahri), chelsea bun (Göktürk Dizdar) |
| 4 | Bunları da seveceksin | var | 4 | 4/4 | moin moin (Atakan Atan), waakye gana (Hüseyin Koç), enfrijoladas meksika (Erhan Yıldırım), frijoles refritos (Aşkın Akay) |
| 5 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), masabeeb suudi (Esma Çevik), irimsik kazak (İrem Akgül), mamounia halep (Barlas Egeli) |
| 6 | Bunları da seveceksin | var | 4 | 4/4 | kiev pastasi (İlker Bozkurt), tamriyeh sam (Ece Ekici), tepsi kadayifi (Ahmet Örge), muska tatlisi (Ece Örge) |
| 7 | Bunları da seveceksin | var | 4 | 4/4 | sagdana suudi (Şahnur Poyrazoğlu), kiev pastasi (İlker Bozkurt), tamriyeh sam (Ece Ekici), tepsi kadayifi (Ahmet Örge) |
| 8 | Bunları da seveceksin | var | 4 | 4/4 | sagdana suudi (Şahnur Poyrazoğlu), kiev pastasi (İlker Bozkurt), tamriyeh sam (Ece Ekici), tepsi kadayifi (Ahmet Örge) |
| 9 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), jiao yan (Burcu Akyüz), iran usulu (Şahnur Ilıcalı), karabugday kaplamali (Emel Aksu) |
| 10 | Bunları da seveceksin | var | 4 | 4/4 | ordek dolmasi (İrem Egeli), tuzsuz bebek (Ege Bakırcıoğlu), arroz con (Burcu Yıldırım), huhnerfrikassee alman (Fatma Aktürk) |
| 11 | Bunları da seveceksin | var | 4 | 4/4 | mercimekli yaprak (Mert Taşlı), lor dolmasi (Dağhan Fahri), chelsea bun (Göktürk Dizdar), duduklude balkan (Şahnur Ilıcalı) |
| 12 | Bunları da seveceksin | var | 4 | 4/4 | arpa sehriyeli (Ece Örge), koz patlican (Belgin Aksoy), firik lapasi (Aysun Aydın), izgara misir (Fatma Aktürk) |
| 13 | Bunları da seveceksin | var | 4 | 4/4 | saleeg suudi (Rüzgar Korol), arpa sehriyeli (Derin Sezek), grecka po (Rüya Pekkan), kuskonmazli makademya (Bekir Tekin) |
| 14 | Bunları da seveceksin | var | 4 | 4/4 | jiao yan (Burcu Akyüz), iran usulu (Şahnur Ilıcalı), karabugday kaplamali (Emel Aksu), airfryerda hamsili (Canan Yücel) |
| 15 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), iran usulu (Şahnur Ilıcalı), karabugday kaplamali (Emel Aksu), airfryerda hamsili (Canan Yücel) |
| 16 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), jiao yan (Burcu Akyüz), karabugday kaplamali (Emel Aksu), airfryerda hamsili (Canan Yücel) |
| 17 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), jiao yan (Burcu Akyüz), iran usulu (Şahnur Ilıcalı), airfryerda hamsili (Canan Yücel) |
| 18 | Bunları da seveceksin | var | 4 | 4/4 | ordek dolmasi (İrem Egeli), lor dolmasi (Dağhan Fahri), chelsea bun (Göktürk Dizdar), duduklude balkan (Şahnur Ilıcalı) |
| 19 | Bunları da seveceksin | var | 4 | 4/4 | mercimekli yaprak (Mert Taşlı), ordek dolmasi (İrem Egeli), chelsea bun (Göktürk Dizdar), duduklude balkan (Şahnur Ilıcalı) |
| 20 | Bunları da seveceksin | var | 4 | 4/4 | mercimekli yaprak (Mert Taşlı), ordek dolmasi (İrem Egeli), lor dolmasi (Dağhan Fahri), duduklude balkan (Şahnur Ilıcalı) |
| 21 | Bunları da seveceksin | var | 4 | 4/4 | waakye gana (Hüseyin Koç), enfrijoladas meksika (Erhan Yıldırım), frijoles refritos (Aşkın Akay), bogrulce yemegi (Ebru Bolatlı) |
| 22 | Bunları da seveceksin | var | 4 | 4/4 | moin moin (Atakan Atan), enfrijoladas meksika (Erhan Yıldırım), frijoles refritos (Aşkın Akay), bogrulce yemegi (Ebru Bolatlı) |
| 23 | Bunları da seveceksin | var | 4 | 4/4 | moin moin (Atakan Atan), waakye gana (Hüseyin Koç), frijoles refritos (Aşkın Akay), bogrulce yemegi (Ebru Bolatlı) |
| 24 | Bunları da seveceksin | var | 4 | 4/4 | moin moin (Atakan Atan), waakye gana (Hüseyin Koç), enfrijoladas meksika (Erhan Yıldırım), bogrulce yemegi (Ebru Bolatlı) |
| 25 | Bunları da seveceksin | var | 4 | 4/4 | sumakli yumurta (Şahnur Sezek), nohutlu baharatli (Belgin Aksoy), suudi usulu (Ayşe Şahinkaya), huevos rellenos (Ece Yetkiner) |
| 26 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), irimsik kazak (İrem Akgül), mamounia halep (Barlas Egeli), agedashi tofu (Ece Özdenak) |
| 27 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), masabeeb suudi (Esma Çevik), mamounia halep (Barlas Egeli), agedashi tofu (Ece Özdenak) |
| 28 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), masabeeb suudi (Esma Çevik), irimsik kazak (İrem Akgül), agedashi tofu (Ece Özdenak) |
| 29 | Bunları da seveceksin | var | 4 | 4/4 | pancarli kek (Şahnur Mertoğlu), visneli islak (Şahnur Sezek), znoud el (Göktürk Dizdar), kastera kek (Şahnur Ilıcalı) |
| 30 | Bunları da seveceksin | var | 4 | 4/4 | sagdana suudi (Şahnur Poyrazoğlu), kiev pastasi (İlker Bozkurt), tepsi kadayifi (Ahmet Örge), muska tatlisi (Ece Örge) |
| 31 | Bunları da seveceksin | var | 4 | 4/4 | sagdana suudi (Şahnur Poyrazoğlu), kiev pastasi (İlker Bozkurt), tamriyeh sam (Ece Ekici), muska tatlisi (Ece Örge) |
| 32 | Bunları da seveceksin | var | 4 | 4/4 | sagdana suudi (Şahnur Poyrazoğlu), kiev pastasi (İlker Bozkurt), tamriyeh sam (Ece Ekici), tepsi kadayifi (Ahmet Örge) |
| 33 | Bunları da seveceksin | var | 4 | 4/4 | sadok kabugu (Ömer Polat), murver cicegi (Ayşe Şahinkaya), japon ayvasi (İrem Pektemek), jamaika usulu (Emine Demirtaş) |
| 34 | Bunları da seveceksin | var | 4 | 4/4 | misir kocani (Tarık Kaptan), murver cicegi (Ayşe Şahinkaya), japon ayvasi (İrem Pektemek), jamaika usulu (Emine Demirtaş) |
| 35 | Bunları da seveceksin | var | 4 | 4/4 | misir kocani (Tarık Kaptan), sadok kabugu (Ömer Polat), japon ayvasi (İrem Pektemek), jamaika usulu (Emine Demirtaş) |
| 36 | Bunları da seveceksin | var | 4 | 4/4 | misir kocani (Tarık Kaptan), sadok kabugu (Ömer Polat), murver cicegi (Ayşe Şahinkaya), jamaika usulu (Emine Demirtaş) |
| 37 | Bunları da seveceksin | var | 4 | 4/4 | misir kocani (Tarık Kaptan), sadok kabugu (Ömer Polat), murver cicegi (Ayşe Şahinkaya), japon ayvasi (İrem Pektemek) |
| 38 | Bunları da seveceksin | var | 4 | 4/4 | tire kofte (Ceren Tosun), pirasa koftesi (Esma Çevik), yeni dunya (Radostina Ivanova), kagitta kofte (Ceren Tosun) |
| 39 | Bunları da seveceksin | var | 4 | 4/4 | shami kebap (Toprak Ekşioğlu), pirasa koftesi (Esma Çevik), yeni dunya (Radostina Ivanova), kagitta kofte (Ceren Tosun) |
| 40 | Bunları da seveceksin | var | 4 | 4/4 | shami kebap (Toprak Ekşioğlu), tire kofte (Ceren Tosun), yeni dunya (Radostina Ivanova), kagitta kofte (Ceren Tosun) |
| 41 | Bunları da seveceksin | var | 4 | 4/4 | shami kebap (Toprak Ekşioğlu), tire kofte (Ceren Tosun), pirasa koftesi (Esma Çevik), kagitta kofte (Ceren Tosun) |
| 42 | Bunları da seveceksin | var | 4 | 4/4 | shami kebap (Toprak Ekşioğlu), tire kofte (Ceren Tosun), pirasa koftesi (Esma Çevik), yeni dunya (Radostina Ivanova) |
| 43 | Bunları da seveceksin | var | 4 | 4/4 | guvecte ayvali (Cem Aydan), ordek dolmasi (İrem Egeli), tuzsuz bebek (Ege Bakırcıoğlu), arroz con (Burcu Yıldırım) |
| 44 | Bunları da seveceksin | var | 4 | 4/4 | tuzsuz bebek (Ege Bakırcıoğlu), koz patlican (Belgin Aksoy), firik lapasi (Aysun Aydın), izgara misir (Fatma Aktürk) |
| 45 | Bunları da seveceksin | var | 4 | 4/4 | tuzsuz bebek (Ege Bakırcıoğlu), arpa sehriyeli (Ece Örge), firik lapasi (Aysun Aydın), izgara misir (Fatma Aktürk) |
| 46 | Bunları da seveceksin | var | 4 | 4/4 | tuzsuz bebek (Ege Bakırcıoğlu), arpa sehriyeli (Ece Örge), koz patlican (Belgin Aksoy), izgara misir (Fatma Aktürk) |
| 47 | Bunları da seveceksin | var | 4 | 4/4 | tuzsuz bebek (Ege Bakırcıoğlu), arpa sehriyeli (Ece Örge), koz patlican (Belgin Aksoy), firik lapasi (Aysun Aydın) |
| 48 | Bunları da seveceksin | var | 4 | 4/4 | arroz con (Burcu Yıldırım), arpa sehriyeli (Derin Sezek), grecka po (Rüya Pekkan), kuskonmazli makademya (Bekir Tekin) |
| 49 | Bunları da seveceksin | var | 4 | 4/4 | saleeg suudi (Rüzgar Korol), arroz con (Burcu Yıldırım), grecka po (Rüya Pekkan), kuskonmazli makademya (Bekir Tekin) |
| 50 | Bunları da seveceksin | var | 4 | 4/4 | saleeg suudi (Rüzgar Korol), arroz con (Burcu Yıldırım), arpa sehriyeli (Derin Sezek), kuskonmazli makademya (Bekir Tekin) |
| 51 | Bunları da seveceksin | var | 4 | 4/4 | saleeg suudi (Rüzgar Korol), arroz con (Burcu Yıldırım), arpa sehriyeli (Derin Sezek), grecka po (Rüya Pekkan) |
| 52 | Bunları da seveceksin | var | 4 | 4/4 | asam pedas (Ece Sarıoğlu), jiao yan (Burcu Akyüz), iran usulu (Şahnur Ilıcalı), karabugday kaplamali (Emel Aksu) |
| 53 | Bunları da seveceksin | var | 4 | 4/4 | moin moin (Atakan Atan), waakye gana (Hüseyin Koç), enfrijoladas meksika (Erhan Yıldırım), frijoles refritos (Aşkın Akay) |
| 54 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), nohutlu baharatli (Belgin Aksoy), suudi usulu (Ayşe Şahinkaya), huevos rellenos (Ece Yetkiner) |
| 55 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), sumakli yumurta (Şahnur Sezek), suudi usulu (Ayşe Şahinkaya), huevos rellenos (Ece Yetkiner) |
| 56 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), sumakli yumurta (Şahnur Sezek), nohutlu baharatli (Belgin Aksoy), huevos rellenos (Ece Yetkiner) |
| 57 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), sumakli yumurta (Şahnur Sezek), nohutlu baharatli (Belgin Aksoy), suudi usulu (Ayşe Şahinkaya) |
| 58 | Bunları da seveceksin | var | 4 | 4/4 | semizotlu yumurta (Esra Yıldırım), masabeeb suudi (Esma Çevik), irimsik kazak (İrem Akgül), mamounia halep (Barlas Egeli) |
| 59 | Bunları da seveceksin | var | 4 | 4/4 | kiev pastasi (İlker Bozkurt), visneli islak (Şahnur Sezek), znoud el (Göktürk Dizdar), kastera kek (Şahnur Ilıcalı) |
| 60 | Bunları da seveceksin | var | 4 | 4/4 | kiev pastasi (İlker Bozkurt), pancarli kek (Şahnur Mertoğlu), znoud el (Göktürk Dizdar), kastera kek (Şahnur Ilıcalı) |
| 61 | Bunları da seveceksin | var | 4 | 4/4 | kiev pastasi (İlker Bozkurt), pancarli kek (Şahnur Mertoğlu), visneli islak (Şahnur Sezek), kastera kek (Şahnur Ilıcalı) |
| 62 | Bunları da seveceksin | var | 4 | 4/4 | kiev pastasi (İlker Bozkurt), pancarli kek (Şahnur Mertoğlu), visneli islak (Şahnur Sezek), znoud el (Göktürk Dizdar) |

**Görüntüler** (`v3-app/docs/screenshots/detay-v2/benzer/`)
- **`benzer-yanyana.png`**: Mercimekli, Shami, Mısır (390)
- Tek tek: `{chromium,webkit}-390-{varsayilan,shami,misir}.png`, 2. sayfa `*-390-*-sayfa2.png`

http://127.0.0.1:8765/v3-app/detay-v2.html?yazar=a
- Regresyon: `detay-v2-tabs`, `-qa` (benzer kart kontrolü yeni ikili kalıba güncellendi: `dg-meta`), `-bilgi`, `-varsayilan`, `-veri-dogrula`, `-not`, `-galeri` (artık 62 tarif), `-besin sonra` geçti. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.

---

## Ek: Benzer tarifler düzeltmesi — gösterge, tutarlılık, avatar (10 Ekim)

**1) Sayfa göstergesi kaldırıldı**
- Benzer tariflerde gösterge yok (işaretleme, CSS ve kaydırma dinleyicisi silindi).
- İkişerli slider aynen: tam 2 kart, yarım kart 0, sayfa sayfa snap, ←/→ tuşları.
- Göstergenin bıraktığı 12 px aralık da kalktı (`.dv2-pairs` artık aralıksız). Bölüm kartların altında bitiyor; sayfa sonu boşluğu kuyruktaki ayrı işte ele alınacak.

**2) Shami'deki "eski görünüm"**
- Kod taraması: detay-v2'de tek benzer tarifler bileşeni var (`.dv2-similar`). Eski bileşen kodda yok: `dv2-rail`, "Benzer Tarifler · Tamamını Gör" başlığı ve 4:5 ray kartı önceki turda silindi. Kaynak `ld-source` `.similar-section`'ı her açılışta kaldırılıyor.
- Verilen adres (`?yazar=a&sekme=hazirlanis&tarif=shami-…`) ve `?tarif=…&donus=liste-v2.html` yerelde yeni bileşenle çiziliyor (DOM: `dv2-similar` 1, `similar-section` 0, "Tamamını Gör" 0).
- **En olası neden: tarayıcı önbelleği.** `detay-v2.html`'in kendisi önbellek kırıcısızdı. Önbellekteki eski HTML eski `?v=` özetiyle eski `detay-v2.js`'i yüklüyor ve eski bileşeni gösteriyordu.
- Düzeltme: `detay-v2.html`'e `Cache-Control: no-cache, no-store, must-revalidate`, `Pragma: no-cache`, `Expires: 0` meta etiketleri eklendi; JS/CSS `?v=` yenilendi. Açık sekmede bir kez sert yenileme (⌘⇧R) gerekebilir. Not: meta etiketleri destekleyicidir, sunucu HTTP başlıklarının yerine geçmez.

**3) Avatar baş harfi ("İrem Egeli")**
- DOM taraması: kartlardaki harf `DGCard.avatar` ile `toLocaleUpperCase('tr')` → **"İ" (U+0130, büyük noktalı I)**. Yazı tipi 13 px GilroyBd (`tokens.css`: Gilroy-ExtraBold.otf), listedeki `.dg-avatar` kuralıyla birebir. 62 tarifin bütün kartlarında harf = adın ilk harfinin Türkçe büyük hâli, yazı tipi GilroyBd, 13 px; testte doğrulandı.
- Yakından ölçüm: avatardaki "İ"nin gövdesi büyük harf yüksekliğinde (≈8–9 px; küçük "i" ≈6,5 px olurdu). Glif doğru, Gilroy ExtraBold'un "İ"sidir. Küçük harf gibi algılanması Türkçe büyük İ'nin noktalı biçiminden; ayrıca önbellekteki eski sürüm de etkili olabilir.
- Kanıt: `avatar-irem-detay-4x.png` (detay), `avatar-liste-4x.png` (listede "Ş"), `gilroy-I-glifleri.png` (80 px'te GilroyBd / GilroyXB / Gilroy: İ · I · i). Hepsi `screenshots/detay-v2/benzer/` altında.
- Karar Beyar'ın: istenirse bu durumda noktasız "I" ile değiştirmek mümkün, ama Türkçe yazım kuralına aykırı olur. Şimdilik doğru Türkçe biçim korundu.

**Doğrulama** (`docs/detay-v2-benzer.mjs` güncellendi): **tümü geçti**
- 62 tarifin hepsinde DOM taraması. Kontrol edilenler:
  - tek `.dv2-similar`
  - yeni başlık (etiket + "Bunları da seveceksin" + "Tümü") ve `.dv2-pairs-track`
  - eski bileşen 0, gösterge 0, "Tamamını Gör" 0
  - ≥4 kart, görseller `naturalWidth > 0`, canlı sıra, parametreler, avatar kuralı
- Slider (Chromium + WebKit × 360/390/430): tam 2 kart, yarım 0, gösterge 0, sayfa 2 ve snap doğru.
  - Mercimekli varsayılan adresle; Shami `sekme=hazirlanis` ile; Mısır `donus=liste-v2.html` ile açıldı.
- Görüntüler: **`screenshots/detay-v2/benzer/benzer-yanyana.png`**, tek tek `{chromium,webkit}-390-{varsayilan,shami,misir}{,-sayfa2}.png`
- Regresyon: `detay-v2-tabs`, `-qa`, `-bilgi`, `-varsayilan`, `-galeri` geçti; kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz.

---

## Ek: Sayfa sonu boşluğu (10 Ekim)

**Boşluğu ne büyütüyordu** (390, en alta kaydırılmış; son kart ile alt çubuğun üstü arası **119 px**)
- `.dv2-content` alt iç boşluğu **100 px** (`--dv2-dock-space` = 52 + 8 + 8 + 32 + safe-area).
- Ortak kabuk `app.css` `.detail-shell` alt iç boşluğu **96 px** (`48 × 2 + safe-area`). Alt çubuk için ikinci kez yer ayırıyordu.
- Toplam 196 px'in 77 px'ini sabit alt çubuk kaplıyor; kalan 119 px boştu.
- Gösterge önceki işte kaldırılmıştı.
- `.dv2-content` `min-height` (ekran − header − sekme çubuğu) uzun sayfalarda boşluk üretmiyordu. Kısa sekmede (Yorumlar 0) yapışık konumun korunması için gerekli; padding bu yüksekliğe dahil olduğu için kaldı.

**Düzeltme** (yalnız `detay-v2.css`, `detay-v2.js`)
- `body.dv2 .detail-shell { padding-bottom: 0 }`: ortak kabuk boşluğu yalnız bu ekranda sıfırlandı (`app.css` değişmedi).
- `.dv2-content` alt boşluğu = `--dv2-dock-reach` + `--space-24`.
  - `--dv2-dock-reach`: alt çubuğun ekrandan kapladığı alan (yükseklik + alt kenar + safe-area). JS ölçüyor: açılışta, yeniden boyutlamada, yazı tipleri yüklenince ve çubuk boyut değiştirince.
  - Uygulama hatası: sabit konumlu çubukta `offsetParent` her zaman `null` olduğundan ölçüm ilk denemede atlanmış, 100 px'lik yedek değer kullanılmıştı (boşluk 47 px). Görünürlük `getClientRects()` ile denetleniyor.
- Kural bütün sekmelerde ve tariflerde aynı; son bölüm ne olursa olsun (bugün Benzer Tarifler).

**Ölçüm** (`docs/detay-v2-sayfasonu.mjs`; son bölümün alt kenarı → alt çubuğun üst kenarı): **tümü geçti**
- 62 tarif × 3 sekme (186 ölçüm, Chromium 390): hepsi **24 px** (23,5–24,5; alt-piksel yuvarlama).
- Chromium + WebKit × 360/390/430:

| | 360 | 390 | 430 |
|---|---|---|---|
| Mercimekli · Malzemeler | 24,1 / 24,1 | 23,8 / 23,8 | 24,0 / 24,0 |
| Mercimekli · Yorumlar (0) | 24,2 / 24,1 | 23,9 / 23,8 | 24,0 / 24,0 |
| Shami | 23,8 / 23,7 | 23,6 / 23,6 | 23,9 / 23,9 |

(Chromium / WebKit, px. Önce 119 px.)

- Görüntüler (`v3-app/docs/screenshots/detay-v2/sayfasonu/`): **`sayfasonu-yanyana.png`**, tek tek `{chromium,webkit}-390-{mercimekli-malzemeler,mercimekli-yorumlar,shami}.png`
- Regresyon: `detay-v2-tabs` (kısa sekmede yapışık konum dahil), `-qa`, `-bilgi`, `-varsayilan`, `-benzer` geçti. Kaydırma (`scroll-compare`, `scroll-frames`) sorunsuz: panel yapışmasında 0 koyu piksel, sekme yapışmasında 0 px.
