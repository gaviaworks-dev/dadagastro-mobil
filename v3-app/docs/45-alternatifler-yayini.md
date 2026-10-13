# 45 — Ana sayfa seçenekleri yayını

9 Ekim 2026. Beyar'ın açık “canlıya al” izniyle; izin yalnız `yayin/ana-sayfa-alternatifleri/` içindi. `yayin/yeni-tasarim/` ve diğer yayın klasörleri, kök prototip, `v3-app` kaynakları, `tokens.css`, `app.css` ve `AGENTS.md` değişmedi. Bu yayından sonra git/yayın yasağı yeniden geçerli.

## Kopya

`v3-app/verification/alternatifler-yayini/build.py` (docs/43'teki `yeni-tasarim` derlemesinin aynı yöntemi):
- Kaynak: `ana-sayfa-alternatifler.html` → `index.html`, dört ana sayfa (`ana-v3`, `-alt1`, `-alt2`, `-alt3`) ve bütün bağımlılıkları (CSS/JS, ortak menü, görseller, bayraklar, marka, fontlar).
- Göreli yollar; klasör dışına tek izinli referans, yayındaki `../yeni-tasarim/liste-v2.html` ve `../yeni-tasarim/detay-v2.html`.
- Her sayfada noindex + `Cache-Control` meta; içerik SHA-256 ilk 12 karakteriyle `?v=` damgası (iframe adresleri dahil); klasöre özel `robots.txt`.
- 189 dosya, 6.9 MB. Font Awesome CSS'inin andığı ama projede hiç olmayan yedek fontlar kopyalanmadı; ağda 404 yok.
- Sayfa başlığı “DadaGastro Mobil Uygulama — Ana Sayfa Seçenekleri”, açıklama “Dört ana sayfa seçeneği. Ekranların içinde kaydırabilir, menüyü açabilirsiniz.”, başlıklar “1. 2. 3. 4.”, her çerçevenin altında “Tam ekran aç”.
- Masaüstünde dört telefon yan yana (dış çerçeve ölçeklenir, içi 390×844), telefonda sekmeler.

**Yalnız yayın kopyasında bağlantılar** (`yayin-baglantilar.js` + iki kodlu yönlendirme; `v3-app` değişmedi):
- Tarif kartları ve hero önerisi → `../yeni-tasarim/detay-v2.html?tarif=…`
- “Tümü” (son tarifler, şefler), kategori, mutfak, malzeme ve arama → `../yeni-tasarim/liste-v2.html` (ilgili filtreyle).
- Yayında olmayan Tabaktan Tarif → “Yakında”. Eski sayfalara bağlantı kalmadı; menüler açıkken de tarandı.

## Yerel kontrol

`node v3-app/verification/alternatifler-yayini/qa.mjs http://127.0.0.1:8765/yayin/ana-sayfa-alternatifleri/ yerel` → [qa-yerel.json](../verification/alternatifler-yayini/qa-yerel.json). Chromium + WebKit, 1440 ve 390:
- 404 ve konsol hatası yok; görünür metinde iç kod yok (v2, v3, alt1, SET, ana-x vb.).
- Çerçevelerin içi kayıyor, menü açılıp kapanıyor.
- Dört ana sayfanın her birinde kart → yeni-tasarim detayı, “Tümü” → yeni-tasarim listesi tıklanarak açıldı.
- Ekran görüntüleri `v3-app/docs/screenshots/alternatifler-yayini/yerel/`.

## Yayın

Öncesinde diğer 770 yayın dosyasının özetleri değişmemiş olarak doğrulandı; stage alanı boştu. Yalnız `yayin/ana-sayfa-alternatifleri/` stage edildi. Gizli anahtar taraması temiz: tek eşleşme Font Awesome'un `fa-mask-ventilator` sınıfı.

- **main:** `879dd8411e12a08bc89c552634404c167b20d22d` (önceki `19e101f`)
- **gh-pages:** `98ac7aeeae9a12bdbdc1b07ea8d8b44fad5e4f3b` — ebeveyn `d467042ed6aa5874e0379829bda56316867d4047` (yeni-tasarim yayını), ağaç `3e693674ed24aa88c5410bcdf6c81eef07403733` = main'deki `yayin/`; fark yalnız 189 eklenen `ana-sayfa-alternatifleri/` dosyası.
- İkisi de force olmadan, fast-forward gönderildi. Pages dağıtımı başarılı (run 37980930063).

**Canlı kontrol** ([qa-canli.json](../verification/alternatifler-yayini/qa-canli.json)): sayfa, dört ana sayfa ve robots.txt 200. Yerel kontrollerin hepsi canlıda da geçti: 404 yok, hata yok, dört ekran yükleniyor, menü açılıyor, kartlar ve “Tümü” canlıdaki yeni-tasarim detay ve listesine gidiyor.

**Canlı ekran görüntüleri:** `v3-app/docs/screenshots/alternatifler-yayini/canli/`
- masaüstü: `chromium-1440.png`, `webkit-1440.png`, `chromium-1440-menu.png`
- telefon: `chromium-390.png`, `webkit-390.png`, `chromium-390-menu.png`

**Commit öncesi `git diff --cached --name-only` çıktısı** (189 dosya, hepsi `yayin/ana-sayfa-alternatifleri/` altında):

```
yayin/ana-sayfa-alternatifleri/a-chefs.css
yayin/ana-sayfa-alternatifleri/a-chefs.js
yayin/ana-sayfa-alternatifleri/a-discovery.css
yayin/ana-sayfa-alternatifleri/ana-sayfa-alternatifler.css
yayin/ana-sayfa-alternatifleri/ana-sayfa-alternatifler.js
yayin/ana-sayfa-alternatifleri/ana-v3-alt-ortak.js
yayin/ana-sayfa-alternatifleri/ana-v3-alt1.css
yayin/ana-sayfa-alternatifleri/ana-v3-alt1.html
yayin/ana-sayfa-alternatifleri/ana-v3-alt1.js
yayin/ana-sayfa-alternatifleri/ana-v3-alt2.css
yayin/ana-sayfa-alternatifleri/ana-v3-alt2.html
yayin/ana-sayfa-alternatifleri/ana-v3-alt2.js
yayin/ana-sayfa-alternatifleri/ana-v3-alt3.css
yayin/ana-sayfa-alternatifleri/ana-v3-alt3.html
yayin/ana-sayfa-alternatifleri/ana-v3-alt3.js
yayin/ana-sayfa-alternatifleri/ana-v3.css
yayin/ana-sayfa-alternatifleri/ana-v3.html
yayin/ana-sayfa-alternatifleri/ana-v3.js
yayin/ana-sayfa-alternatifleri/app.css
yayin/ana-sayfa-alternatifleri/assets/bolumler/mutfak-sirlari.webp
yayin/ana-sayfa-alternatifleri/assets/bolumler/pro-planlama.jpg
yayin/ana-sayfa-alternatifleri/assets/flags/LICENSE
yayin/ana-sayfa-alternatifleri/assets/flags/am.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ar.svg
yayin/ana-sayfa-alternatifleri/assets/flags/at.svg
yayin/ana-sayfa-alternatifleri/assets/flags/au.svg
yayin/ana-sayfa-alternatifleri/assets/flags/az.svg
yayin/ana-sayfa-alternatifleri/assets/flags/br.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ca.svg
yayin/ana-sayfa-alternatifleri/assets/flags/cn.svg
yayin/ana-sayfa-alternatifleri/assets/flags/co.svg
yayin/ana-sayfa-alternatifleri/assets/flags/cu.svg
yayin/ana-sayfa-alternatifleri/assets/flags/de.svg
yayin/ana-sayfa-alternatifleri/assets/flags/eg.svg
yayin/ana-sayfa-alternatifleri/assets/flags/es.svg
yayin/ana-sayfa-alternatifleri/assets/flags/et.svg
yayin/ana-sayfa-alternatifleri/assets/flags/fr.svg
yayin/ana-sayfa-alternatifleri/assets/flags/gb.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ge.svg
yayin/ana-sayfa-alternatifleri/assets/flags/gr.svg
yayin/ana-sayfa-alternatifleri/assets/flags/id.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ie.svg
yayin/ana-sayfa-alternatifleri/assets/flags/in.svg
yayin/ana-sayfa-alternatifleri/assets/flags/iq.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ir.svg
yayin/ana-sayfa-alternatifleri/assets/flags/it.svg
yayin/ana-sayfa-alternatifleri/assets/flags/jm.svg
yayin/ana-sayfa-alternatifleri/assets/flags/jo.svg
yayin/ana-sayfa-alternatifleri/assets/flags/jp.svg
yayin/ana-sayfa-alternatifleri/assets/flags/kr.svg
yayin/ana-sayfa-alternatifleri/assets/flags/kz.svg
yayin/ana-sayfa-alternatifleri/assets/flags/lb.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ma.svg
yayin/ana-sayfa-alternatifleri/assets/flags/mx.svg
yayin/ana-sayfa-alternatifleri/assets/flags/my.svg
yayin/ana-sayfa-alternatifleri/assets/flags/nz.svg
yayin/ana-sayfa-alternatifleri/assets/flags/pe.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ph.svg
yayin/ana-sayfa-alternatifleri/assets/flags/pk.svg
yayin/ana-sayfa-alternatifleri/assets/flags/pt.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ru.svg
yayin/ana-sayfa-alternatifleri/assets/flags/sa.svg
yayin/ana-sayfa-alternatifleri/assets/flags/sy.svg
yayin/ana-sayfa-alternatifleri/assets/flags/th.svg
yayin/ana-sayfa-alternatifleri/assets/flags/tn.svg
yayin/ana-sayfa-alternatifleri/assets/flags/tr.svg
yayin/ana-sayfa-alternatifleri/assets/flags/ua.svg
yayin/ana-sayfa-alternatifleri/assets/flags/us.svg
yayin/ana-sayfa-alternatifleri/assets/flags/uz.svg
yayin/ana-sayfa-alternatifleri/assets/flags/vn.svg
yayin/ana-sayfa-alternatifleri/assets/flags/za.svg
yayin/ana-sayfa-alternatifleri/assets/fontawesome/css/all.min.css
yayin/ana-sayfa-alternatifleri/assets/fontawesome/webfonts/fa-brands-400.woff2
yayin/ana-sayfa-alternatifleri/assets/fontawesome/webfonts/fa-solid-900.woff2
yayin/ana-sayfa-alternatifleri/assets/fonts/Gilroy-ExtraBold.otf
yayin/ana-sayfa-alternatifleri/assets/fonts/Gilroy-Light.otf
yayin/ana-sayfa-alternatifleri/assets/fonts/Gilroy-Medium.ttf
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-0.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-1.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-10.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-11.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-12.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-13.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-14.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-15.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-16.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-17.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-18.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-2.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-3.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-4.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-5.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-6.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-7.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-8.webp
yayin/ana-sayfa-alternatifleri/assets/home-v3/kategori/kategori-9.webp
yayin/ana-sayfa-alternatifleri/assets/marka/apple-touch-icon.png
yayin/ana-sayfa-alternatifleri/assets/marka/dadagastro-amblem.svg
yayin/ana-sayfa-alternatifleri/assets/marka/dadagastro-beyaz.svg
yayin/ana-sayfa-alternatifleri/assets/marka/dadagastro-renkli.svg
yayin/ana-sayfa-alternatifleri/assets/media/02a17618ce3eff18712f.webp
yayin/ana-sayfa-alternatifleri/assets/media/11ddf89ac8ee9eba4a3e.webp
yayin/ana-sayfa-alternatifleri/assets/media/12fb9dd8f45df0981314.webp
yayin/ana-sayfa-alternatifleri/assets/media/19b6f8567ce0b6729e2f.webp
yayin/ana-sayfa-alternatifleri/assets/media/1c4d04dbb6ed3e998b81.webp
yayin/ana-sayfa-alternatifleri/assets/media/1d801e3a3e473bbdb6f2.webp
yayin/ana-sayfa-alternatifleri/assets/media/351af65503c6210161c9.webp
yayin/ana-sayfa-alternatifleri/assets/media/359317b2f0b0ffe4b5c8.webp
yayin/ana-sayfa-alternatifleri/assets/media/3945975b2568e95beae6.webp
yayin/ana-sayfa-alternatifleri/assets/media/3a272ac11fce7e46710c.webp
yayin/ana-sayfa-alternatifleri/assets/media/421b9077b5dc37414bb5.webp
yayin/ana-sayfa-alternatifleri/assets/media/435b15d290f445f219e8.webp
yayin/ana-sayfa-alternatifleri/assets/media/4674366e2bd9b4fe9021.webp
yayin/ana-sayfa-alternatifleri/assets/media/47527b662d4474261055.webp
yayin/ana-sayfa-alternatifleri/assets/media/48e4350bc69dd627d680.webp
yayin/ana-sayfa-alternatifleri/assets/media/4e6803b296341097b2de.webp
yayin/ana-sayfa-alternatifleri/assets/media/58e609d7e9d91b1bbddc.webp
yayin/ana-sayfa-alternatifleri/assets/media/66242c1d8a4c9947c49e.webp
yayin/ana-sayfa-alternatifleri/assets/media/68a715cb7fe110db76dd.webp
yayin/ana-sayfa-alternatifleri/assets/media/68a80875c862ebfaa533.webp
yayin/ana-sayfa-alternatifleri/assets/media/74804f5ff7ee7f8dcb5d.webp
yayin/ana-sayfa-alternatifleri/assets/media/7b0b7f92e7370c7da46f.webp
yayin/ana-sayfa-alternatifleri/assets/media/7f26acce6c174b1a9986.webp
yayin/ana-sayfa-alternatifleri/assets/media/998b9a80b30fbd69d249.webp
yayin/ana-sayfa-alternatifleri/assets/media/9f84aed604309b60d45f.webp
yayin/ana-sayfa-alternatifleri/assets/media/a4934d027b5982188735.webp
yayin/ana-sayfa-alternatifleri/assets/media/a7c08852130f4904dd11.webp
yayin/ana-sayfa-alternatifleri/assets/media/afeae45d26e58b22b7af.webp
yayin/ana-sayfa-alternatifleri/assets/media/b5dd58b238265660c718.webp
yayin/ana-sayfa-alternatifleri/assets/media/bdefe54acbede935824f.webp
yayin/ana-sayfa-alternatifleri/assets/media/d145ce5fb7afe0e1eeeb.webp
yayin/ana-sayfa-alternatifleri/assets/media/dfc7c04502f4a89a93a8.webp
yayin/ana-sayfa-alternatifleri/assets/media/ec7594a47498e121f9f0.webp
yayin/ana-sayfa-alternatifleri/assets/media/ef324f5edd5569fae982.webp
yayin/ana-sayfa-alternatifleri/assets/media/f3076cccd34c0805539b.webp
yayin/ana-sayfa-alternatifleri/assets/media/f551a71ef07d7b2cb668.webp
yayin/ana-sayfa-alternatifleri/assets/media/f5d28e5bd90a319af6cc.webp
yayin/ana-sayfa-alternatifleri/assets/media/fc12f85e29b823724c77.webp
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1432139555190-58524dae6a55.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1455619452474-d2be8b1e70cd.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1473093295043-cdd812d0e601.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1474979266404-7eaacbcd87c5.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1476718406336-bb5a9690ee2a.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1505253716362-afaea1d3d1af.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1509440159596-0249088772ff.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1515543904379-3d757afe72e4.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1516684732162-798a0062be99.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1533089860892-a7c6f0a88666.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1540420773420-3366772f4999.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1541529086526-db283c563270.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1544145945-f90425340c7e.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1547592180-85f173990554.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1559737558-2f5a35f4523b.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1563245372-f21724e3856d.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1565299624946-b28f40a0ae38.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1565958011703-44f9829ba187.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/category-photo-1604909052743-94e838986d24.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/video-photo-1466978913421-dad2ebd01d17.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/video-photo-1518977956812-cd3dbadaaf31.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/video-photo-1519996529931-28324d5a630e.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/video-photo-1525351484163-7529414344d8.avif.avif
yayin/ana-sayfa-alternatifleri/assets/six-media/video-photo-1556910103-1c02745aae4d.avif.avif
yayin/ana-sayfa-alternatifleri/discovery-data.js
yayin/ana-sayfa-alternatifleri/hero-light.css
yayin/ana-sayfa-alternatifleri/home-base.js
yayin/ana-sayfa-alternatifleri/home-media.js
yayin/ana-sayfa-alternatifleri/home-v3-kategori-media.js
yayin/ana-sayfa-alternatifleri/index.html
yayin/ana-sayfa-alternatifleri/ortak-menu.css
yayin/ana-sayfa-alternatifleri/ortak-menu.js
yayin/ana-sayfa-alternatifleri/robots.txt
yayin/ana-sayfa-alternatifleri/set15-data.js
yayin/ana-sayfa-alternatifleri/set15-home.css
yayin/ana-sayfa-alternatifleri/set15-sections.css
yayin/ana-sayfa-alternatifleri/set15-sections.js
yayin/ana-sayfa-alternatifleri/set2-common.js
yayin/ana-sayfa-alternatifleri/set2-core.js
yayin/ana-sayfa-alternatifleri/set2-data.js
yayin/ana-sayfa-alternatifleri/set2-finish.js
yayin/ana-sayfa-alternatifleri/set2-heroes.css
yayin/ana-sayfa-alternatifleri/set2-x6.js
yayin/ana-sayfa-alternatifleri/six-gallery-start.js
yayin/ana-sayfa-alternatifleri/six-heroes.css
yayin/ana-sayfa-alternatifleri/six-heroes.js
yayin/ana-sayfa-alternatifleri/six-home.css
yayin/ana-sayfa-alternatifleri/six-home.js
yayin/ana-sayfa-alternatifleri/six-media.js
yayin/ana-sayfa-alternatifleri/tokens.css
yayin/ana-sayfa-alternatifleri/yayin-baglantilar.js
```

Canlı adres: https://gaviaworks-dev.github.io/dadagastro-mobil/ana-sayfa-alternatifleri/
