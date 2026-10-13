# 48 — Yeni tasarım 3. sürüm: önizleme sayfasının yayını

11 Ekim 2026. Beyar'ın açık "canlıya al" izniyle; yayın izni yalnız `yayin/yeni-tasarim-v3/` içindi. `yayin/` altındaki diğer klasörler (`yeni-tasarim`, `yeni-tasarim-v2`, `ana-sayfa-alternatifleri`, `secenekler`, `secenekler-v2`, kök sayfalar) değişmedi. `tokens.css`, `app.css`, `AGENTS.md`'ye dokunulmadı; `v3-app/` izlenmeyen olarak kaldı, stage edilmedi. Force push yapılmadı. **Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## 1 · Kopya

`python3 v3-app/verification/yeni-tasarim-v3/build.py` (docs/43, 45, 46 yöntemi; `yeni-tasarim-v2/build.py` uyarlaması) → [build.json](../verification/yeni-tasarim-v3/build.json): **190 dosya, 8.0 MB**.
- `v3-app/onizleme-v3.html` → `yayin/yeni-tasarim-v3/index.html`. Yalnız başlık değişti: `<title>` ve görünür başlık "DadaGastro Mobil Uygulama — Yeni Tasarım". Üç telefon yan yana (390×844, parametresiz), "Tam ekran aç"; dar ekranda üç sekme; çerçeveler sırayla yüklenir.
- Üç ekran (`ana-v3`, `liste-v2`, `detay-v2`) ve bütün bağımlılıklar (CSS/JS, `assets/media`, kategori görselleri, 49 bayrak, marka, Gilroy, Font Awesome) bağımlılık taramasıyla klasörün içinde. Yollar göreli; klasör dışına ve `v3-app`'e yol referansı yok (betik assert'leri), canlı dadagastro.com görsel adresleri hariç.
- Yayında olmayan hedefler (önceki yayınlarla aynı `yayin-baglantilar.js`): arama → liste, Tabaktan Tarif → "Yakında", eski sayfa adları → üç ekran. docs/47 gereği taşınan parametreler yalnız işlevsel olanlar (`kategori`, `sirala`, `malzeme`, `mutfak`, `q`, `sayfa`, `gorunum`, `giris`); tasarım seçenek parametreleri yok.
- `noindex,nofollow` + Cache-Control meta (bütün sayfalar); CSS/JS/varlık ve iframe adreslerinde içerik SHA-256 ilk 12 hane `?v=`; klasöre özel `robots.txt` (`Disallow: /dadagastro-mobil/yeni-tasarim-v3/`).
- Font Awesome CSS'inin listelediği ama projede hiç olmayan yedek yazı tipleri (`.ttf`, regular, v4) kopyalanmadı: tarayıcı var olan woff2'yi yükler (önceki yayınlarla aynı).

## 2 · Yerel kontrol (yayından önce)

`node v3-app/verification/yeni-tasarim-v3/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim-v3/ yerel` → [qa-yerel.json](../verification/yeni-tasarim-v3/qa-yerel.json). Chromium + WebKit, 1440 ve 390, hepsi geçti:
- Ağda 404 / başarısız istek yok (görseller ve iframe'ler dahil), konsol hatası yok.
- Başlık, açıklama, `noindex`; üç iframe 390×844, içerik 390 genişlikte; 1440'ta yan yana, 390'da üç sekme ("Ana Sayfa / Tarif Listesi / Tarif Detay"), seçilen ekran tek; yatay taşma yok.
- Çerçeve içinde: menü açılıp kapanıyor; hero slider, öne çıkan slider (gösterge 2. noktaya geçiyor) ve ikişerli slider kayıyor; detayda galeri açılıyor (görsel yüklü).
- Gezinme (iki motor, 6'şar adım): ana sayfa kartı → detay, liste kartı → detay, benzer tarif → detay, detay Tümü → liste, ana sayfa Tümü → liste, ardından liste kartı → detay. Sayfa önizlemede kalıyor; adreslerde eski seçenek parametresi yok.
- Görünür metinde iç kod yok (önizleme sayfası ve her ekran menü açıkken; dosya adları, sürüm adları, seçenek parametreleri, "Seçenek"). Eski sayfa bağlantısı yok. Eski link `detay-v2.html?yazar=c&radius=b` yayında da hatasız.
- Sayfalar ve `robots.txt` 200.

Yerel görüntüler: `v3-app/docs/screenshots/yeni-tasarim-v3/yerel/`.

## 3 · Yayın

Öncesinde: stage alanı boştu; `yayin/` altında yalnız yeni klasör vardı; diğer 1.151 yayın dosyasının SHA-256 özeti değişmemiş (`before.json`). Gizli anahtar taraması temiz (eşleşmeler Mutfak Sırları `secrets` kimliği, `secret-*` CSS sınıfları ve Font Awesome).

**Commit öncesi `git diff --cached --name-only`**: 190 dosya, hepsi `yayin/yeni-tasarim-v3/` altında; başka dosya yok (çalışma ağacındaki diğer değişiklikler stage dışında kaldı). Liste aşağıda ve `v3-app/verification/yeni-tasarim-v3/staged.txt`.

| | Commit | Ebeveyn | Not |
|---|---|---|---|
| main | `938a47bf98fe5d0f75da71a6260b28f1ed690d57` | `0d282e193129529c038511fe92a165186996c412` | yalnız 190 eklenen `yayin/yeni-tasarim-v3/` dosyası |
| gh-pages | `873659d937a70e63e4f11499831477a6b0d6fcb8` | `c1a57e15d082ebca4ec57f92bc470c6f1bdd5be4` | ağaç `a9c293b9da9680205ccc63d4d2840b3484a7440a` = main'deki `yayin/`; fark yalnız 190 eklenen `yeni-tasarim-v3/` dosyası |

İkisi de force olmadan, fast-forward gönderildi (`0d282e1..938a47b`, `c1a57e1..873659d`). Pages dağıtımı başarılı: run 38135485898 (`v3-app/verification/yeni-tasarim-v3/pages.log`).

**Canlı kontrol** (`qa.mjs … canli` → [qa-canli.json](../verification/yeni-tasarim-v3/qa-canli.json)): 2. adımın bütün kontrolleri canlıda Chromium + WebKit, 1440 ve 390'da geçti (404 yok, konsol hatası yok, üç iframe, menü, üç slider, galeri, 12 gezinme adımı, iç kod yok, sayfalar ve robots 200).
- Not: canlıdaki ilk koşu, kontrol betiğindeki bir yarış yüzünden zaman aşımına uğradı (sıralı yüklemede son çerçeve kısa süre `about:blank` iken bekleme başlıyordu). Sayfanın kendisi dört görünümde 2,4–3,6 sn'de hatasız hazırdı. Betik çerçevenin gerçek adrese geçmesini bekleyecek şekilde düzeltildi; canlı ve yerel kontroller yeniden çalıştırıldı, ikisi de geçti. Yayın dosyalarında değişiklik gerekmedi.

**Eski yayınlar** ([eski-yayinlar.json](../verification/yeni-tasarim-v3/eski-yayinlar.json)): kök, `yeni-tasarim/`, `ana-sayfa-alternatifleri/`, `yeni-tasarim-v2/` canlıda hatasız ve 404'süz açılıyor (3 / 4 / 10 iframe); denetlenen canlı dosyalar depodaki kopyayla birebir aynı; git'te bu klasörlerde fark yok. Not: ilk yayın (`yeni-tasarim/`) ile bu yayının sayfa başlığı aynı ("DadaGastro Mobil Uygulama — Yeni Tasarım"); talimattaki başlık bu.

## 4 · Canlı ekran görüntüleri (`v3-app/docs/screenshots/yeni-tasarim-v3/canli/`)

- Masaüstü: `chromium-1440.png`, `webkit-1440.png`; menü açık: `chromium-1440-menu.png`, `webkit-1440-menu.png`
- Telefon, üç sekme: `chromium-390-1|2|3.png`, `webkit-390-1|2|3.png`; menü açık: `chromium-390-menu.png`, `webkit-390-menu.png`
- Ekranlar tek başına (390): `{chromium,webkit}-ekran-{ana-v3,liste-v2,detay-v2,detay-v2-param}.png`
- Eski yayınlar: `eski-kok.png`, `eski-yeni-tasarim.png`, `eski-ana-sayfa-alternatifleri.png`, `eski-yeni-tasarim-v2.png`

## 5 · Stage listesi (190 dosya)

```
yayin/yeni-tasarim-v3/a-chefs.css
yayin/yeni-tasarim-v3/a-chefs.js
yayin/yeni-tasarim-v3/a-discovery.css
yayin/yeni-tasarim-v3/ana-v3.css
yayin/yeni-tasarim-v3/ana-v3.html
yayin/yeni-tasarim-v3/ana-v3.js
yayin/yeni-tasarim-v3/app.css
yayin/yeni-tasarim-v3/assets/bolumler/mutfak-sirlari.webp
yayin/yeni-tasarim-v3/assets/bolumler/pro-planlama.jpg
yayin/yeni-tasarim-v3/assets/flags/LICENSE
yayin/yeni-tasarim-v3/assets/flags/am.svg
yayin/yeni-tasarim-v3/assets/flags/ar.svg
yayin/yeni-tasarim-v3/assets/flags/at.svg
yayin/yeni-tasarim-v3/assets/flags/au.svg
yayin/yeni-tasarim-v3/assets/flags/az.svg
yayin/yeni-tasarim-v3/assets/flags/br.svg
yayin/yeni-tasarim-v3/assets/flags/ca.svg
yayin/yeni-tasarim-v3/assets/flags/cn.svg
yayin/yeni-tasarim-v3/assets/flags/co.svg
yayin/yeni-tasarim-v3/assets/flags/cu.svg
yayin/yeni-tasarim-v3/assets/flags/de.svg
yayin/yeni-tasarim-v3/assets/flags/eg.svg
yayin/yeni-tasarim-v3/assets/flags/es.svg
yayin/yeni-tasarim-v3/assets/flags/et.svg
yayin/yeni-tasarim-v3/assets/flags/fr.svg
yayin/yeni-tasarim-v3/assets/flags/gb.svg
yayin/yeni-tasarim-v3/assets/flags/ge.svg
yayin/yeni-tasarim-v3/assets/flags/gr.svg
yayin/yeni-tasarim-v3/assets/flags/id.svg
yayin/yeni-tasarim-v3/assets/flags/ie.svg
yayin/yeni-tasarim-v3/assets/flags/in.svg
yayin/yeni-tasarim-v3/assets/flags/iq.svg
yayin/yeni-tasarim-v3/assets/flags/ir.svg
yayin/yeni-tasarim-v3/assets/flags/it.svg
yayin/yeni-tasarim-v3/assets/flags/jm.svg
yayin/yeni-tasarim-v3/assets/flags/jo.svg
yayin/yeni-tasarim-v3/assets/flags/jp.svg
yayin/yeni-tasarim-v3/assets/flags/kr.svg
yayin/yeni-tasarim-v3/assets/flags/kz.svg
yayin/yeni-tasarim-v3/assets/flags/lb.svg
yayin/yeni-tasarim-v3/assets/flags/ma.svg
yayin/yeni-tasarim-v3/assets/flags/mx.svg
yayin/yeni-tasarim-v3/assets/flags/my.svg
yayin/yeni-tasarim-v3/assets/flags/nz.svg
yayin/yeni-tasarim-v3/assets/flags/pe.svg
yayin/yeni-tasarim-v3/assets/flags/ph.svg
yayin/yeni-tasarim-v3/assets/flags/pk.svg
yayin/yeni-tasarim-v3/assets/flags/pt.svg
yayin/yeni-tasarim-v3/assets/flags/ru.svg
yayin/yeni-tasarim-v3/assets/flags/sa.svg
yayin/yeni-tasarim-v3/assets/flags/sy.svg
yayin/yeni-tasarim-v3/assets/flags/th.svg
yayin/yeni-tasarim-v3/assets/flags/tn.svg
yayin/yeni-tasarim-v3/assets/flags/tr.svg
yayin/yeni-tasarim-v3/assets/flags/ua.svg
yayin/yeni-tasarim-v3/assets/flags/us.svg
yayin/yeni-tasarim-v3/assets/flags/uz.svg
yayin/yeni-tasarim-v3/assets/flags/vn.svg
yayin/yeni-tasarim-v3/assets/flags/za.svg
yayin/yeni-tasarim-v3/assets/fontawesome/css/all.min.css
yayin/yeni-tasarim-v3/assets/fontawesome/webfonts/fa-brands-400.woff2
yayin/yeni-tasarim-v3/assets/fontawesome/webfonts/fa-solid-900.woff2
yayin/yeni-tasarim-v3/assets/fonts/Gilroy-ExtraBold.otf
yayin/yeni-tasarim-v3/assets/fonts/Gilroy-Light.otf
yayin/yeni-tasarim-v3/assets/fonts/Gilroy-Medium.ttf
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-0.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-1.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-10.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-11.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-12.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-13.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-14.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-15.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-16.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-17.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-18.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-2.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-3.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-4.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-5.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-6.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-7.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-8.webp
yayin/yeni-tasarim-v3/assets/home-v3/kategori/kategori-9.webp
yayin/yeni-tasarim-v3/assets/marka/apple-touch-icon.png
yayin/yeni-tasarim-v3/assets/marka/dadagastro-amblem.svg
yayin/yeni-tasarim-v3/assets/marka/dadagastro-beyaz.svg
yayin/yeni-tasarim-v3/assets/marka/dadagastro-renkli.svg
yayin/yeni-tasarim-v3/assets/media/02a17618ce3eff18712f.webp
yayin/yeni-tasarim-v3/assets/media/11ddf89ac8ee9eba4a3e.webp
yayin/yeni-tasarim-v3/assets/media/12fb9dd8f45df0981314.webp
yayin/yeni-tasarim-v3/assets/media/19b6f8567ce0b6729e2f.webp
yayin/yeni-tasarim-v3/assets/media/1c4d04dbb6ed3e998b81.webp
yayin/yeni-tasarim-v3/assets/media/1d801e3a3e473bbdb6f2.webp
yayin/yeni-tasarim-v3/assets/media/351af65503c6210161c9.webp
yayin/yeni-tasarim-v3/assets/media/359317b2f0b0ffe4b5c8.webp
yayin/yeni-tasarim-v3/assets/media/3945975b2568e95beae6.webp
yayin/yeni-tasarim-v3/assets/media/3a272ac11fce7e46710c.webp
yayin/yeni-tasarim-v3/assets/media/421b9077b5dc37414bb5.webp
yayin/yeni-tasarim-v3/assets/media/435b15d290f445f219e8.webp
yayin/yeni-tasarim-v3/assets/media/4674366e2bd9b4fe9021.webp
yayin/yeni-tasarim-v3/assets/media/47527b662d4474261055.webp
yayin/yeni-tasarim-v3/assets/media/48e4350bc69dd627d680.webp
yayin/yeni-tasarim-v3/assets/media/4e6803b296341097b2de.webp
yayin/yeni-tasarim-v3/assets/media/58e609d7e9d91b1bbddc.webp
yayin/yeni-tasarim-v3/assets/media/66242c1d8a4c9947c49e.webp
yayin/yeni-tasarim-v3/assets/media/68a715cb7fe110db76dd.webp
yayin/yeni-tasarim-v3/assets/media/68a80875c862ebfaa533.webp
yayin/yeni-tasarim-v3/assets/media/74804f5ff7ee7f8dcb5d.webp
yayin/yeni-tasarim-v3/assets/media/7b0b7f92e7370c7da46f.webp
yayin/yeni-tasarim-v3/assets/media/7f26acce6c174b1a9986.webp
yayin/yeni-tasarim-v3/assets/media/998b9a80b30fbd69d249.webp
yayin/yeni-tasarim-v3/assets/media/9f84aed604309b60d45f.webp
yayin/yeni-tasarim-v3/assets/media/a4934d027b5982188735.webp
yayin/yeni-tasarim-v3/assets/media/a7c08852130f4904dd11.webp
yayin/yeni-tasarim-v3/assets/media/afeae45d26e58b22b7af.webp
yayin/yeni-tasarim-v3/assets/media/b5dd58b238265660c718.webp
yayin/yeni-tasarim-v3/assets/media/bdefe54acbede935824f.webp
yayin/yeni-tasarim-v3/assets/media/d145ce5fb7afe0e1eeeb.webp
yayin/yeni-tasarim-v3/assets/media/dfc7c04502f4a89a93a8.webp
yayin/yeni-tasarim-v3/assets/media/ec7594a47498e121f9f0.webp
yayin/yeni-tasarim-v3/assets/media/ef324f5edd5569fae982.webp
yayin/yeni-tasarim-v3/assets/media/f3076cccd34c0805539b.webp
yayin/yeni-tasarim-v3/assets/media/f551a71ef07d7b2cb668.webp
yayin/yeni-tasarim-v3/assets/media/f5d28e5bd90a319af6cc.webp
yayin/yeni-tasarim-v3/assets/media/fc12f85e29b823724c77.webp
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1432139555190-58524dae6a55.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1455619452474-d2be8b1e70cd.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1473093295043-cdd812d0e601.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1474979266404-7eaacbcd87c5.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1476718406336-bb5a9690ee2a.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1505253716362-afaea1d3d1af.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1509440159596-0249088772ff.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1515543904379-3d757afe72e4.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1516684732162-798a0062be99.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1533089860892-a7c6f0a88666.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1540420773420-3366772f4999.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1541529086526-db283c563270.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1544145945-f90425340c7e.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1547592180-85f173990554.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1559737558-2f5a35f4523b.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1563245372-f21724e3856d.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1565299624946-b28f40a0ae38.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1565958011703-44f9829ba187.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/category-photo-1604909052743-94e838986d24.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/video-photo-1466978913421-dad2ebd01d17.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/video-photo-1518977956812-cd3dbadaaf31.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/video-photo-1519996529931-28324d5a630e.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/video-photo-1525351484163-7529414344d8.avif.avif
yayin/yeni-tasarim-v3/assets/six-media/video-photo-1556910103-1c02745aae4d.avif.avif
yayin/yeni-tasarim-v3/detay-v2-aciklama.js
yayin/yeni-tasarim-v3/detay-v2-tarifler.js
yayin/yeni-tasarim-v3/detay-v2.css
yayin/yeni-tasarim-v3/detay-v2.html
yayin/yeni-tasarim-v3/detay-v2.js
yayin/yeni-tasarim-v3/discovery-data.js
yayin/yeni-tasarim-v3/hero-light.css
yayin/yeni-tasarim-v3/home-base.js
yayin/yeni-tasarim-v3/home-media.js
yayin/yeni-tasarim-v3/home-v3-kategori-media.js
yayin/yeni-tasarim-v3/index.html
yayin/yeni-tasarim-v3/ld-links.js
yayin/yeni-tasarim-v3/ld-source.js
yayin/yeni-tasarim-v3/liste-v2.css
yayin/yeni-tasarim-v3/liste-v2.html
yayin/yeni-tasarim-v3/liste-v2.js
yayin/yeni-tasarim-v3/ortak-baslik.css
yayin/yeni-tasarim-v3/ortak-kart.css
yayin/yeni-tasarim-v3/ortak-kart.js
yayin/yeni-tasarim-v3/ortak-menu.css
yayin/yeni-tasarim-v3/ortak-menu.js
yayin/yeni-tasarim-v3/robots.txt
yayin/yeni-tasarim-v3/set15-data.js
yayin/yeni-tasarim-v3/set15-home.css
yayin/yeni-tasarim-v3/set15-sections.css
yayin/yeni-tasarim-v3/set15-sections.js
yayin/yeni-tasarim-v3/set2-common.js
yayin/yeni-tasarim-v3/set2-core.js
yayin/yeni-tasarim-v3/set2-data.js
yayin/yeni-tasarim-v3/set2-finish.js
yayin/yeni-tasarim-v3/set2-heroes.css
yayin/yeni-tasarim-v3/set2-x6.js
yayin/yeni-tasarim-v3/six-gallery-start.js
yayin/yeni-tasarim-v3/six-heroes.css
yayin/yeni-tasarim-v3/six-heroes.js
yayin/yeni-tasarim-v3/six-home.css
yayin/yeni-tasarim-v3/six-home.js
yayin/yeni-tasarim-v3/six-media.js
yayin/yeni-tasarim-v3/tokens.css
yayin/yeni-tasarim-v3/yayin-baglantilar.js
```

Bu yayından sonra git ve yayın yasağı yeniden geçerli.

https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim-v3/
