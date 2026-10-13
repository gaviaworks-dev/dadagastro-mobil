# 57 — Açılış, karşılama, tercihler: üç alternatif

12 Ekim 2026 · G7 yeniden yapım. Önceki splash (düz primary + logo) ve karşılama (hero + beyaz kart listesi) kabul edilmedi.
Kod: `ortak/sayfalar/acilis.js` + `acilis.css`. Galeri grubu “Açılış ve tanıtım” (`ortak/veri/sayfalar.js`). Git/yayın yok.

## 1. Referans araştırması (kısa)

Erişim: WebSearch özetleri + ScreensDesign Tasty sayfası (WebFetch). Uygulamaların kendisi açılmadı, ekran kaydı izlenmedi; aşağıdaki ayrıntıların hiçbiri kare kare doğrulanmadı.

| Uygulama | Bulgu (kaynak niteliği) | Alınan ilke |
|---|---|---|
| Headspace | Onboarding iki parça: önce deneyim ve süre sorusu, sonra “seni ne getirdi”; ilk ekran fayda kartları + Atla/İleri (Appcues, Lazyweb özeti). Splash animasyonu **bulunamadı**. | İlk ekran faydayı gösterir; her ekranda Atla. |
| Duolingo | Kayıt ilk dersten sonraya ertelenmiş; açılıştan derse ~4 dokunuş (Appcues, UX Planet). %20 DAU iddiası doğrulanamadı. | Değer önce, hesap sonra: karşılamada “Giriş yap” yalnız küçük bağlantı. |
| Spotify | “Taste onboarding”: en az 5 sanatçı seçtirir, ana ekranı buna göre kurar (Spotify Newsroom). | Görselli seçim ızgarası (bizde: bayrak, kategori fotoğrafı). |
| Kitchen Stories | Kişisel akış diyet ve mutfak seçimine dayanıyor; erken kayıt sürtünme olarak eleştirilmiş (kitchenstories.com, ScreensDesign). | Diyet + mutfak adımları; kayıt zorunlu değil. |
| Tasty | 5 onboarding adımı; 00:27'de zorunlu kayıt “sürtünme” (ScreensDesign). İlk 5 sn görseli sayfada **anlatılmıyor**. | Zorunlu kayıt yok. |
| NYT Cooking | Tercih soruları kaynakta **bulunamadı**; hesap ödemeden sonra (ScreensDesign). | — |
| Airbnb | Uygulama açılış animasyonu **doğrulanamadı**; Lottie Airbnb'nin kütüphanesi. | Marka anı kısa, logo değişmeden. |

Kaynaklar: [Appcues · Headspace](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence), [Lazyweb · Headspace](https://lazyweb.com/canvas/flows/headspace/onboarding), [Appcues · Duolingo](https://goodux.appcues.com/blog/duolingo-user-onboarding), [Spotify Newsroom · taste onboarding](https://newsroom.spotify.com/tag/taste-onboarding/), [Kitchen Stories · For You](https://kitchenstories.com/en/stories/the-for-you-feed-in-kitchen-stories-plus), [ScreensDesign · Tasty](https://screensdesign.com/showcase/tasty-recipes-cooking-videos), [ScreensDesign · NYT Cooking](https://screensdesign.com/showcase/nyt-cooking-recipes-tips).

Not: docs/54 §1 “ayrı splash yok” önerisiydi; kullanıcı sinematik splash istedi. Süre 2,25 sn (reveal × 5), dokununca hemen geçer, reduced-motion'da 450 ms ve hareketsiz.

## 2. Ortak dil (üç alternatifte aynı)

- Gerçek görseller: `DGVERI.tarifler[].gorsel`, `puflar[].gorsel`, `kategoriler[].gorsel`, `assets/flags`. Uydurma görsel yok.
- Koyu taban `--overlay`; smootherstep perde JS'te metin konumundan (üst %35 → 0; metin üstü 48px'te %64; altında %86; karo kartlarında kanon %40/32 kuralı, tavan %72). 4px'te bir durak.
- Sol üst primary ışık: tomato %25, radyal 0→%65, screen, yükseklik header + 3×48 (hero-light.css değerleri).
- Hilal: 4px primary (Açılış 1–2'de ilerleme çizgisi; Açılış/Karşılama 3'te hero alt kenarı + köşe 24).
- Resmi beyaz logo (`assets/marka/dadagastro-beyaz.svg`), header konumunda 64 genişlik; splash'ta 144.
- Metinler gerçek özelliklerden: “Tarif bul” panelindeki canlı açıklamalar, menü metni “Püf noktaları ve rehber yazıları”, sayaçlar `DGVERI.istatistik`, Dolapta Ne Var “9 grupta N malzeme” `dolapKatalog`'dan, fotoğraftaki tarif adı · yazarı.
- Hareket yalnız token katları (`--dg-motion-*`, `--ease`); `@view-transition` kullanılmadı (headless Chromium'da yeni sayfa çizimi durdu; ölçüldü). Süreklilik: splash son karesi = karşılamanın ilk karesi.
- Galeri çerçevesinde açılış sabit kalır (son kare); `?kal=1` aynısı. Tek başına açıldığında ve uygulama akışında geçiş çalışır.

## 3. Alternatifler

| | Açılış | Karşılama | Tercihler |
|---|---|---|---|
| **1 · Sahne** (`acilis` · `karsilama` · `tercihler`; uygulama girişi bunu kullanır) | Koyu perde kalkar; iki gerçek fotoğraf yavaş yakınlaşarak birbirine geçer; ışık açılır; logo belirir; hilal dolar. | Tam ekran hikâye: beş modül sırayla (6 sn), üstte 5 ilerleme çubuğu, sol/sağ yarı dokunuş geri/ileri, basılı tut = dur, duraklat düğmesi. | 4 adım. Kısa fotoğraflı başlık bandı (header + 120) + üstüne binen beyaz panel; altta “Bu adımı atla / Devam”. |
| **2 · Kolaj** (`acilis-2` …) | Eğik üç sütunda gerçek tarif fotoğrafları ters yönde akar; çıkışta kolaj düzleşip dağılır. | Koyu zeminde “Hoş geldin” + sayaçlar + beş fotoğraflı modül karosu (bento; Tarifler büyük). | Tek sayfa: kolaj başlık + tek açık akordeon (kapalı başlıkta seçim özeti) + “Kaydet ve başla”. |
| **3 · Perde** (`acilis-3` …) | Koyu ekranda logo; sahne ortadan açılır (hero biçimi), logo header yerine kayar. | Ana sayfa hero'su gibi üst sahne; altta koyu zeminde 5 modül seçicisi (alt menü göstergesi dili); fotoğraf + metin birlikte değişir. | Koyu, soru başına bir ekran; aynı seçim bileşenleri koyu çeşidiyle. |

Tercih adımları (üçünde aynı veri): **Mutfak** = `DGVERI.mutfaklar` (50, ortak `DG.bayrakSecim`, ilk 12 + “N mutfak daha”) · **Beslenme** = web onboarding kümesi (8; “Kısıtlamam Yok” tekil; Beslenme/Tip'te birebir karşılığı olanlarda tarif sayısı) + **Uzak durduklarım** (10 alerjen chip + “Bu liste tıbbi tavsiye değildir.”) · **Beceri** = zorluk kümesi (5, tek seçim, ölçek çubukları + tarif sayısı) · **Kategoriler** = görseli olan 33 kategori, fotoğraflı karo. Kayıt `DG.store('tercih')`; bitince `ilk = tamam` → `../ana-v3.html` (ilk değilse `ayarlar.html`).

Bilinçli farklar: webdeki 4. onboarding adımı **Bildirimler** buraya alınmadı (izin istemi bağlamsal; tercih Ayarlar › Bildirim tercihlerinde, G5). Alerjen adımı Beslenme adımının içinde.

## 4. Doğrulama (12 Ekim)

- `sayfa-test.mjs` 23 adres (her alternatifin her adımı/hali + izinler) 390×844: hepsi ok, JS hatası 0, taşma 0; 360×740 ve 430×932'de aynı.
- Tam akış (sıfırla → açılış → karşılama → Tercihlerimi seç → seçim → Devam … → ana sayfa) üç alternatifte geçti; `dg-tercih` yazıldı, `dg-ilk = "tamam"`; ikinci açılışta `index.html` → `ana-v3.html`.
- Galeri çerçevesinde Açılış 2: 3,5 sn sonra adres değişmedi.
- Animasyon kareleri 0/400/1200/2400 ms incelendi; reduced-motion'da açılış 483 ms'de geçer.
- 360×740'ta her adımda başlık, açıklama ve en az 6 seçenek ilk ekranda; alt çubuk seçenekleri örtmez.
