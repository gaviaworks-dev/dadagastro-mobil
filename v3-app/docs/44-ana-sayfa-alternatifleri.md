# 44 — Ana sayfa alternatifleri (mevcut + 3)

9 Ekim 2026. Yalnız `v3-app`; yayın izni yok, git işlemi yapılmadı. `ana-v3.html`/`.js`/`.css`, `ortak-menu.*`, liste ve detay dosyaları, `tokens.css`, `app.css`, `AGENTS.md` ve `yayin/` değişmedi.

**Karşılaştırma sayfası:** http://127.0.0.1:8765/v3-app/ana-sayfa-alternatifler.html
- Masaüstünde dört telefon yan yana: dış çerçeve sığması için ölçeklenir, içerideki görünüm gerçek 390×844 kalır.
- Dar ekranda (≤1100px) “1. 2. 3. 4.” sekmeleri, tek ekran.
- Çerçevelerin içi kaydırılabilir, menü açılır. Başlıklar yalnız düz numara.

## Nasıl kuruldu

Her alternatif `ana-v3.html`'in kopyası üzerine kendi CSS/JS dosyasını ekler; ortak bileşenler aynen kullanılır:
- header (şeffaf → solid, metin geometrisine göre), ortak sağ menü, alt menü;
- tarif, video ve şef kartları (yazar avatarı + ad zorunlu);
- segment/sekme, chip, düğme, “Tümü →” kalıbı;
- gri/beyaz sıralı bölüm zeminleri;
- gerçek veri (`DATA.recipes`, `WEB.videos`, `WEB.chefs`, kategoriler, bayraklar).

Modül seti dördünde aynı. Ortak yardımcı `ana-v3-alt-ortak.js`:
- sıra uygulama;
- metin konumundan hesaplanan tek, sürekli hero koyu geçişi;
- ana-v3 ile birebir aynı tarif kartı dönüşümü;
- gerçek tarihe göre son tarifler.

| Dosya | Fikir |
|---|---|
| `ana-v3.html` (1, mevcut) | Fotoğraf hero, başlık + arama üstte, hilalle biter. |
| `ana-v3-alt1.html` + `ana-v3-alt1.css/js` (2) | Kapak şeridi |
| `ana-v3-alt2.html` + `ana-v3-alt2.css/js` (3) | Masadaki kart |
| `ana-v3-alt3.html` + `ana-v3-alt3.css/js` (4) | Tarif defteri |

## 2 · Kapak şeridi

**Fikir.** Ana sayfa bir dergi kapağı gibi açılır: üç gerçek tarif kapağı (Jiao Yan Karides, Sardalya Izgara, Mercimekli Yaprak Sarma) kaydırılarak ya da noktalarla değişir; öneri satırı görünen kapağa uyar. Aşağıda her şey yatay şerit dilinde akar.

**Hero.** Tam boy fotoğraf. Öneri, “Ne pişirsem?”, kapak noktaları ve arama alt kısımda bir yığın. Hero hilal yerine üstüne binen 24px köşeli içerik yüzeyiyle biter.

**Sunum.**
- Video: eşit 3:2 kapaklı tek şerit, büyük kart yok.
- Kategoriler ve Dünya Mutfakları: şerit.
- En son eklenenler: 6 gerçek son tarif, eşit kart şeridi.
- Şefler: şerit.

**Sıra (docs/40 · A “İzle, sonra seç”):** Video → Tarif bul → Kategoriler → En son → Şefler → Paylaş. Kapak ve video şeridi ilhamı öne koyuyor; karar aracı ikinci sırada (Tasty, YouTube, Kitchen Stories).

## 3 · Masadaki kart

**Fikir.** Yemek, masaya konmuş bir kart gibi yüzer: hero'nun koyu zemini aynı yemeğin bulanık fotoğrafı, net yemek ise alt kenardan taşan yuvarlak kartta. Sayfa ızgara dilinde, düzenli ve taranabilir.

**Hero.** Başlık + arama üstte, koyu bant (kaynak koyu + %25 primary ışık). Öneri tarifi Semizotlu Yumurta 4:3 kartta, kartın kendi metin geçişiyle. Hero, kartın bölüm zeminine taşmasıyla biter.

**Sunum.**
- Kategoriler: 3×3 = 9 gerçek kategori; Dünya Mutfakları 4×3 = 12 bayrak.
- Video: büyük kart + 2 sütun 4 kare.
- En son eklenenler: 2 sütun 4 eşit kart.
- Şefler: 2 sütun ızgara + “Sen de Şef Ol”.

**Sıra (docs/40 · B “Önce kapılar”, video kuralına uyarlandı):** Kategoriler → Video → Tarif bul → En son → Şefler → Paylaş. docs/40'taki B sırasında video üçüncüydü; “video ilk iki modülden biri” kuralı için Tarif bul ile yer değiştirdi. Kısa görsel kapılar önce (Uber Eats, Getir, Yemeksepeti), ardından içerik.

## 4 · Tarif defteri

**Fikir.** Sakin, okunur bir defter: fotoğraf düz bir pencerede durur, karar beyaz bir kartta verilir. Modüller “öne çıkan + liste” dilinde; her bölümde bir büyük öğe ve altında satırlar.

**Hero.** Düz kenarla biten fotoğraf penceresi (Mercimekli Yaprak Sarma; hilal ve köşe yok). Fotoğrafa binen beyaz karar kartında koyu “Ne pişirsem?”, arama ve ince çizgiyle ayrılmış öneri satırı. Header'ın ilk metni bu kartın başlığı.

**Sunum.**
- Video: büyük kart + resim solda / başlık + izlenme sağda 5 satır.
- En son eklenenler: büyük kart + aynı kartın 4 satır hâli.
- Kategoriler: mevcut 2×3 kapılar.
- Şefler: 56px avatarlı satır listesi + satır hâlinde “Sen de Şef Ol”.

**Sıra (C “İçerik önce”, bu tur türetildi):** Video → En son → Kategoriler → Tarif bul → Şefler → Paylaş. docs/40'ta yalnız iki alternatif sıra vardı; üçüncü alternatif için içerik önce gelen yeni bir sıra kuruldu (Netflix/YouTube akışı: önce izlenecek ve pişirilecek içerik, araç sonra).

## Kontroller

[ana-sayfa-alternatifler-qa.json](ana-sayfa-alternatifler-qa.json) (`node v3-app/docs/ana-sayfa-alternatifler-qa.mjs`). Üç alternatif × 360/390/430 × Chromium + WebKit = 18 görünüm, hepsi geçti:
- Bölüm sırası; gri/beyaz zemin sırası; yatay taşma yok; JS ve konsol hatası yok, ağda 404 yok.
- Ana içerikte ≥44px dokunma alanı; her görünür tarif kartında gerçek yazar adı; outline/regular ikon yok.
- Header 0–400px / 20px adım: başta şeffaf, sonda solid; hero metni header altına girmiyor.
- Kategori sekmesi geçişinde bölüm ve sonraki bölüm farkı 0px; menü açılıyor.
- Overlay: tek gradient (41 durak); koyuluk hiçbir yerde px başına %2'den hızlı artmıyor, bant yok. En dik eğim: 2 → 1.24, 3 → 1.25, 4 → 0.72 (%/px).

Hero kontrastı (Chromium; metin arkasındaki en kötü piksel, yarı saydam metin birleştirilerek):

| | Başlık | Öneri tarif adı | Öneri küçük metin |
|---|---:|---:|---:|
| 2 · 360 / 390 / 430 | 11.16 / 11.17 / 11.17 | 9.69 / 9.36 / 9.36 | 9.47 / 9.43 / 9.43 |
| 3 · 360 / 390 / 430 | 9.55 / 9.65 / 9.81 | 13.12 / 12.93 / 12.93 | 10.50 / 11.82 / 11.87 |
| 4 · 360 / 390 / 430 | 16.64 (beyaz kart) | 16.64 | 7.86 |

Statik tarama (yorumlar hariç):
- `!important` yok.
- Elle piksel yalnız adlandırılmış bileşen token'larında. İstisnalar: kanondaki 2px odak halkası ve karşılaştırma sayfasının iki medya sorgusu (medya sorgusunda değişken kullanılamaz).

Karşılaştırma sayfası: Chromium + WebKit, 1440 ve 390'da hata yok, taşma yok, görünür metinde iç kod yok. 1440'ta dört çerçeve 324px'e ölçekleniyor; 390'da sekmeler.

## Ekran görüntüleri

`v3-app/docs/screenshots/ana-sayfa-alternatifler/`:
- Her alternatif, motor ve genişlik için `ana-v3-altN-chromium|webkit-360|390|430-ilk.png` (ilk ekran) ve `…-tam.png` (tam boy).
- **Yan yana ilk ekran (dört tasarım):** `dort-tasarim-ilk-ekran-390.png`
- Yan yana tam boy: `dort-tasarim-tam-390.png`
- Karşılaştırma sayfası: `karsilastirma-chromium|webkit-1440|390.png`

## Notlar

- Hero fotoğrafları gerçek veriden ve farklı: 1 ve 2 Jiao Yan Karides (2'de şeridin ilk kapağı), 3 Semizotlu Yumurta, 4 Mercimekli Yaprak Sarma. Hepsi 1600px kaynak, küçültülerek kullanılıyor.
- 3'te Kategoriler (3×3) ile Dünya Mutfakları (4×3) panellerinin kendi yükseklikleri arasında 39–85px fark var. Paneller üst üste durduğu için bölüm zıplamıyor (0px); kısa sekmenin altında boşluk kalıyor (docs/40 Tur 7'deki konu).
- 3 ile mevcut ana sayfanın üst kısmı benzer başlıyor (başlık + arama üstte). Ayrım fotoğrafın tam boy yerine yüzen kartta olmasında ve sayfanın ızgara dilinde.
