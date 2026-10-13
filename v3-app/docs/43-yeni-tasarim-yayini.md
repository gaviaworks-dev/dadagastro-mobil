# 43 — Yeni tasarım yayını: üç ekran yan yana + ortak sağ menü

9 Ekim 2026. Beyar'ın açık “canlıya çıkar” izniyle; izin yalnız `yayin/yeni-tasarim/` içindi. Kök prototip dosyalarına, diğer `yayin/` klasörlerine, `tokens.css`, `app.css` ve `AGENTS.md`'ye dokunulmadı. `v3-app/` izlenmeyen olarak kaldı. Bu yayından sonra git/yayın yasağı yeniden geçerli.

## A · Sağ menü üç ekranda birebir aynı

**Kaynak:** ana sayfadaki ortak bileşen (`v3-app/ortak-menu.css`, `v3-app/ortak-menu.js`). Üç ekran da aynı iki dosyayı ve aynı HTML yapısını kullanıyor; ekrana özel kopya ya da override yok.

**Kaldırılanlar (tarif listesi):**
- `liste-v2.js` içindeki kendi çekmece özelleştirmesi: `openSiteDrawer` sarmalayıcısı, ayrı logo, eski çekmecede aktif satır işaretleme.
- `liste-v2.css` içindeki 7 çekmece kuralı (`.lv2-drawer-logo`, `.site-drawer .drawer-row` ailesi) ve `--lv2-drawer-logo` değişkeni.

**Eklenenler / ortaklaşanlar:**
- `liste-v2.html` ve `detay-v2.html` ortak menü CSS/JS dosyalarını yüklüyor. Menü betiği sayfa betiğinden önce yükleniyor.
- Her ekran yalnız kendi bağlamını veriyor: `OrtakMenu.configure`.
  - Aktif satır: ana sayfada “Ana Sayfa”; listede “Tüm Tarifler”, bir kategori ya da mutfak seçiliyse o satır; detayda yok.
  - Bağlantılar ve sayfa içi eylemler.
- Tarif detay header'ı: en sağa aynı `icon-button` burger eklendi. Kaydet, paylaş ve “diğer işlemler” bir adım sola kaydı, hiçbiri kaldırılmadı.
- Burger üç ekranda aynı yerde ve ölçüde: x 326, y 12, 44×44.
- Ana sayfa, diğer ekranlardaki menüden gelen `#ne-pisirsem`, `#dolap` ve `#puf` adreslerini kendi modüllerine açıyor.

**Ortak bileşende iki düzeltme (`ortak-menu.js`):**
1. Giriş durumu (`?giris=1`) ilk gezinme adresinden de okunuyor. Tarif listesinin çalışma zamanı açılışta adresi yeniden yazdığı için listede üye görünümü kayboluyordu.
2. Aktif satır bir işlev olabiliyor (listede seçili kategori ya da mutfağı izler). `openSiteDrawer` devri, bütün betikler çalıştıktan sonra yeniden yapılıyor.

**Doğrulama:** Chromium + WebKit, 390. Üç ekran × misafir/üye × iki motor = 12 durumda 18 özellik birebir aynı:
- Görünüm: genişlik 335, yükseklik, sağ kenar 0, logo 64, menü/alt menü/dil etiketleri, satır 48, yazı ve ikon ölçüleri, renkler.
- Davranış: kullanıcı alanı, zemin, 250ms animasyon, backdrop, kapat 44×44, dil satırı, marka ikonları, yalnız solid/brands ikon.
- Kapanma: Esc, dışarı dokunma ve X üç ekranda da kapatıyor; açık başka diyalog yok; hata yok.

Tek bilinçli fark aktif satır; menü bulunulan sayfayı gösteriyor.

**Yan yana menü görselleri:**
- `v3-app/docs/screenshots/yeni-tasarim/menu-uc-ekran-390.png` (misafir)
- `v3-app/docs/screenshots/yeni-tasarim/menu-uc-ekran-390-uye.png` (üye)

## B · Patron sayfası

`yayin/yeni-tasarim/index.html`:
- Başlık “DadaGastro Mobil Uygulama — Yeni Tasarım”, tek satır açıklama.
- Masaüstünde 390×844 üç telefon çerçevesi yan yana, üstlerinde “1. Ana Sayfa”, “2. Tarif Listesi”, “3. Tarif Detay”, altlarında “Tam ekran aç”.
- Dar ekranda (≤1320px) üç sekme ve tek ekran; telefonda tam genişlik.
- Gilroy, açık nötr zemin, Font Awesome solid; başka metin yok.

**Derleme:** `v3-app/verification/yeni-tasarim/build.py`, önceki yayının (secenekler-v2) yöntemiyle.
- Bağımlılık taraması; şablonla üretilen yollar için `assets/flags` ve `assets/marka` tümüyle kopyalandı.
- Bütün yollar göreli, klasör dışına referans yok.
- Her sayfada noindex + `Cache-Control` meta; CSS/JS/varlık ve iframe adreslerinde içerik SHA-256'sının ilk 12 karakteriyle `?v=` damgası; klasöre özel `robots.txt`.
- Toplam 189 dosya, 7.6 MB. Font Awesome CSS'inin yedek olarak andığı ama projede hiç bulunmayan `.ttf`, regular ve v4 fontları kopyalanmadı; tarayıcı mevcut woff2'leri kullanıyor, ağda 404 yok.

**Yalnız yayın kopyasında bağlantılar** (`yayin-baglantilar.js` + beş kodlu yönlendirme; `v3-app`'teki bağlantılar değişmedi):
- Ana sayfa: tarif kartları, “Bugün deneyebilirsin”, “Tümü”, kategori/mutfak/malzeme bağlantıları ve arama → yayındaki tarif listesi (`liste-v2.html`, ilgili filtre parametresiyle).
- Tarif listesi: kartlar → yayındaki tarif detayı (`detay-v2.html?tarif=…`).
- Tarif detay: geri ve benzer tarifler → yayındaki liste/detay.
- Yayında olmayan Tabaktan Tarif → “Yakında”. Eski sayfalara (`detay-c`, `liste`, `tarifler`, `tarif-detay`, `arama`, `index`) bağlantı kalmadı; QA menüler açıkken de taradı.

Not: tarif detayı her tarifi `?tarif=` ile açabiliyor. Talimat gereği ana sayfa kartları listeye gidiyor; istenirse doğrudan detaya bağlanabilir.

## C · Yerel kontrol

`node v3-app/verification/yeni-tasarim/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim/ yerel` → [qa-yerel.json](../verification/yeni-tasarim/qa-yerel.json). Chromium + WebKit, 1440 ve 390:
- 404 ve konsol hatası yok (iframe'ler dahil).
- Görünür metinde iç kod yok (v2, v3, SET, ana-x vb.); üç ekranda menü açıkken de tarandı.
- Çerçeve içinde menü açılıp kapanıyor, sekme çalışıyor.
- Bağlantı zinciri ana sayfa → liste → detay doğrulandı.

Görüntüler: `v3-app/docs/screenshots/yeni-tasarim/yerel/` (`chromium|webkit-1440.png`, `-390.png`, `chromium-*-menu.png`).

## D · Yayın

Prosedür önceki yayınlarla aynı (AGENTS.md “Yayın önbelleği”, docs/12, `v3-app/verification/v2-release`):
1. main'de yalnız `yayin/yeni-tasarim/` stage edildi ve commit edildi.
2. gh-pages için ağacı main'deki `yayin/` ile aynı, ebeveyni önceki gh-pages olan devam commit'i üretildi.
3. İkisi de force olmadan, fast-forward gönderildi.

Öncesinde diğer 581 yayın dosyasının özetleri değişmemiş olarak doğrulandı. Stage alanı commit öncesi boştu. Gizli anahtar taraması temiz: eşleşmelerin hepsi Mutfak Sırları'nın `secret-*` CSS sınıfları.

- **main:** `19e101f290d4a1b64d4f4fa4af091a345b0f0871` (önceki `84c270b`)
- **gh-pages:** `d467042ed6aa5874e0379829bda56316867d4047` — ebeveyn `99d97998334a6e016dbc2d6d902ef7e39b60313a`, ağaç `664bee21271a0db19109a1cd590ccadcbfc5108a` = main'deki `yayin/` ağacı; fark yalnız 189 eklenen `yeni-tasarim/` dosyası.
- Pages dağıtımı başarılı (run 37976035080, `v3-app/verification/yeni-tasarim/pages.log`).

**Canlı kontrol** (`qa.mjs … canli` → [qa-canli.json](../verification/yeni-tasarim/qa-canli.json)): sayfa, üç ekran ve robots.txt 200; Chromium + WebKit, 1440 ve 390'da yerel kontrollerin hepsi canlıda geçti. 404 yok, konsol hatası yok, menü açılıyor, sekmeler çalışıyor, bağlantılar doğru.

**Canlı ekran görüntüleri:** `v3-app/docs/screenshots/yeni-tasarim/canli/`
- masaüstü: `chromium-1440.png`, `webkit-1440.png`, `chromium-1440-menu.png`
- telefon: `chromium-390.png`, `webkit-390.png`, `chromium-390-menu.png`

**Commit öncesi `git diff --cached --name-only` çıktısı** (189 dosya, hepsi `yayin/yeni-tasarim/` altında):

```
yayin/yeni-tasarim/a-chefs.css
yayin/yeni-tasarim/a-chefs.js
yayin/yeni-tasarim/a-discovery.css
yayin/yeni-tasarim/ana-v3.css
yayin/yeni-tasarim/ana-v3.html
yayin/yeni-tasarim/ana-v3.js
yayin/yeni-tasarim/app.css
yayin/yeni-tasarim/assets/bolumler/mutfak-sirlari.webp
yayin/yeni-tasarim/assets/bolumler/pro-planlama.jpg
yayin/yeni-tasarim/assets/flags/LICENSE
yayin/yeni-tasarim/assets/flags/am.svg
yayin/yeni-tasarim/assets/flags/ar.svg
yayin/yeni-tasarim/assets/flags/at.svg
yayin/yeni-tasarim/assets/flags/au.svg
yayin/yeni-tasarim/assets/flags/az.svg
yayin/yeni-tasarim/assets/flags/br.svg
yayin/yeni-tasarim/assets/flags/ca.svg
yayin/yeni-tasarim/assets/flags/cn.svg
yayin/yeni-tasarim/assets/flags/co.svg
yayin/yeni-tasarim/assets/flags/cu.svg
yayin/yeni-tasarim/assets/flags/de.svg
yayin/yeni-tasarim/assets/flags/eg.svg
yayin/yeni-tasarim/assets/flags/es.svg
yayin/yeni-tasarim/assets/flags/et.svg
yayin/yeni-tasarim/assets/flags/fr.svg
yayin/yeni-tasarim/assets/flags/gb.svg
yayin/yeni-tasarim/assets/flags/ge.svg
yayin/yeni-tasarim/assets/flags/gr.svg
yayin/yeni-tasarim/assets/flags/id.svg
yayin/yeni-tasarim/assets/flags/ie.svg
yayin/yeni-tasarim/assets/flags/in.svg
yayin/yeni-tasarim/assets/flags/iq.svg
yayin/yeni-tasarim/assets/flags/ir.svg
yayin/yeni-tasarim/assets/flags/it.svg
yayin/yeni-tasarim/assets/flags/jm.svg
yayin/yeni-tasarim/assets/flags/jo.svg
yayin/yeni-tasarim/assets/flags/jp.svg
yayin/yeni-tasarim/assets/flags/kr.svg
yayin/yeni-tasarim/assets/flags/kz.svg
yayin/yeni-tasarim/assets/flags/lb.svg
yayin/yeni-tasarim/assets/flags/ma.svg
yayin/yeni-tasarim/assets/flags/mx.svg
yayin/yeni-tasarim/assets/flags/my.svg
yayin/yeni-tasarim/assets/flags/nz.svg
yayin/yeni-tasarim/assets/flags/pe.svg
yayin/yeni-tasarim/assets/flags/ph.svg
yayin/yeni-tasarim/assets/flags/pk.svg
yayin/yeni-tasarim/assets/flags/pt.svg
yayin/yeni-tasarim/assets/flags/ru.svg
yayin/yeni-tasarim/assets/flags/sa.svg
yayin/yeni-tasarim/assets/flags/sy.svg
yayin/yeni-tasarim/assets/flags/th.svg
yayin/yeni-tasarim/assets/flags/tn.svg
yayin/yeni-tasarim/assets/flags/tr.svg
yayin/yeni-tasarim/assets/flags/ua.svg
yayin/yeni-tasarim/assets/flags/us.svg
yayin/yeni-tasarim/assets/flags/uz.svg
yayin/yeni-tasarim/assets/flags/vn.svg
yayin/yeni-tasarim/assets/flags/za.svg
yayin/yeni-tasarim/assets/fontawesome/css/all.min.css
yayin/yeni-tasarim/assets/fontawesome/webfonts/fa-brands-400.woff2
yayin/yeni-tasarim/assets/fontawesome/webfonts/fa-solid-900.woff2
yayin/yeni-tasarim/assets/fonts/Gilroy-ExtraBold.otf
yayin/yeni-tasarim/assets/fonts/Gilroy-Light.otf
yayin/yeni-tasarim/assets/fonts/Gilroy-Medium.ttf
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-0.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-1.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-10.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-11.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-12.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-13.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-14.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-15.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-16.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-17.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-18.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-2.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-3.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-4.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-5.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-6.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-7.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-8.webp
yayin/yeni-tasarim/assets/home-v3/kategori/kategori-9.webp
yayin/yeni-tasarim/assets/marka/apple-touch-icon.png
yayin/yeni-tasarim/assets/marka/dadagastro-amblem.svg
yayin/yeni-tasarim/assets/marka/dadagastro-beyaz.svg
yayin/yeni-tasarim/assets/marka/dadagastro-renkli.svg
yayin/yeni-tasarim/assets/media/02a17618ce3eff18712f.webp
yayin/yeni-tasarim/assets/media/11ddf89ac8ee9eba4a3e.webp
yayin/yeni-tasarim/assets/media/12fb9dd8f45df0981314.webp
yayin/yeni-tasarim/assets/media/19b6f8567ce0b6729e2f.webp
yayin/yeni-tasarim/assets/media/1c4d04dbb6ed3e998b81.webp
yayin/yeni-tasarim/assets/media/1d801e3a3e473bbdb6f2.webp
yayin/yeni-tasarim/assets/media/351af65503c6210161c9.webp
yayin/yeni-tasarim/assets/media/359317b2f0b0ffe4b5c8.webp
yayin/yeni-tasarim/assets/media/3945975b2568e95beae6.webp
yayin/yeni-tasarim/assets/media/3a272ac11fce7e46710c.webp
yayin/yeni-tasarim/assets/media/421b9077b5dc37414bb5.webp
yayin/yeni-tasarim/assets/media/435b15d290f445f219e8.webp
yayin/yeni-tasarim/assets/media/4674366e2bd9b4fe9021.webp
yayin/yeni-tasarim/assets/media/47527b662d4474261055.webp
yayin/yeni-tasarim/assets/media/48e4350bc69dd627d680.webp
yayin/yeni-tasarim/assets/media/4e6803b296341097b2de.webp
yayin/yeni-tasarim/assets/media/58e609d7e9d91b1bbddc.webp
yayin/yeni-tasarim/assets/media/66242c1d8a4c9947c49e.webp
yayin/yeni-tasarim/assets/media/68a715cb7fe110db76dd.webp
yayin/yeni-tasarim/assets/media/68a80875c862ebfaa533.webp
yayin/yeni-tasarim/assets/media/74804f5ff7ee7f8dcb5d.webp
yayin/yeni-tasarim/assets/media/7b0b7f92e7370c7da46f.webp
yayin/yeni-tasarim/assets/media/7f26acce6c174b1a9986.webp
yayin/yeni-tasarim/assets/media/998b9a80b30fbd69d249.webp
yayin/yeni-tasarim/assets/media/9f84aed604309b60d45f.webp
yayin/yeni-tasarim/assets/media/a4934d027b5982188735.webp
yayin/yeni-tasarim/assets/media/a7c08852130f4904dd11.webp
yayin/yeni-tasarim/assets/media/afeae45d26e58b22b7af.webp
yayin/yeni-tasarim/assets/media/b5dd58b238265660c718.webp
yayin/yeni-tasarim/assets/media/bdefe54acbede935824f.webp
yayin/yeni-tasarim/assets/media/d145ce5fb7afe0e1eeeb.webp
yayin/yeni-tasarim/assets/media/dfc7c04502f4a89a93a8.webp
yayin/yeni-tasarim/assets/media/ec7594a47498e121f9f0.webp
yayin/yeni-tasarim/assets/media/ef324f5edd5569fae982.webp
yayin/yeni-tasarim/assets/media/f3076cccd34c0805539b.webp
yayin/yeni-tasarim/assets/media/f551a71ef07d7b2cb668.webp
yayin/yeni-tasarim/assets/media/f5d28e5bd90a319af6cc.webp
yayin/yeni-tasarim/assets/media/fc12f85e29b823724c77.webp
yayin/yeni-tasarim/assets/six-media/category-photo-1432139555190-58524dae6a55.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1455619452474-d2be8b1e70cd.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1473093295043-cdd812d0e601.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1474979266404-7eaacbcd87c5.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1476718406336-bb5a9690ee2a.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1505253716362-afaea1d3d1af.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1509440159596-0249088772ff.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1515543904379-3d757afe72e4.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1516684732162-798a0062be99.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1533089860892-a7c6f0a88666.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1540420773420-3366772f4999.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1541529086526-db283c563270.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1544145945-f90425340c7e.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1547592180-85f173990554.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1559737558-2f5a35f4523b.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1563245372-f21724e3856d.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1565299624946-b28f40a0ae38.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1565958011703-44f9829ba187.avif.avif
yayin/yeni-tasarim/assets/six-media/category-photo-1604909052743-94e838986d24.avif.avif
yayin/yeni-tasarim/assets/six-media/video-photo-1466978913421-dad2ebd01d17.avif.avif
yayin/yeni-tasarim/assets/six-media/video-photo-1518977956812-cd3dbadaaf31.avif.avif
yayin/yeni-tasarim/assets/six-media/video-photo-1519996529931-28324d5a630e.avif.avif
yayin/yeni-tasarim/assets/six-media/video-photo-1525351484163-7529414344d8.avif.avif
yayin/yeni-tasarim/assets/six-media/video-photo-1556910103-1c02745aae4d.avif.avif
yayin/yeni-tasarim/detay-v2-aciklama.js
yayin/yeni-tasarim/detay-v2-tarifler.js
yayin/yeni-tasarim/detay-v2.css
yayin/yeni-tasarim/detay-v2.html
yayin/yeni-tasarim/detay-v2.js
yayin/yeni-tasarim/discovery-data.js
yayin/yeni-tasarim/hero-light.css
yayin/yeni-tasarim/home-base.js
yayin/yeni-tasarim/home-media.js
yayin/yeni-tasarim/home-v3-kategori-media.js
yayin/yeni-tasarim/index.html
yayin/yeni-tasarim/ld-links.js
yayin/yeni-tasarim/ld-source.js
yayin/yeni-tasarim/liste-v2.css
yayin/yeni-tasarim/liste-v2.html
yayin/yeni-tasarim/liste-v2.js
yayin/yeni-tasarim/ortak-menu.css
yayin/yeni-tasarim/ortak-menu.js
yayin/yeni-tasarim/robots.txt
yayin/yeni-tasarim/set15-data.js
yayin/yeni-tasarim/set15-home.css
yayin/yeni-tasarim/set15-sections.css
yayin/yeni-tasarim/set15-sections.js
yayin/yeni-tasarim/set2-common.js
yayin/yeni-tasarim/set2-core.js
yayin/yeni-tasarim/set2-data.js
yayin/yeni-tasarim/set2-finish.js
yayin/yeni-tasarim/set2-heroes.css
yayin/yeni-tasarim/set2-x6.js
yayin/yeni-tasarim/six-gallery-start.js
yayin/yeni-tasarim/six-heroes.css
yayin/yeni-tasarim/six-heroes.js
yayin/yeni-tasarim/six-home.css
yayin/yeni-tasarim/six-home.js
yayin/yeni-tasarim/six-media.js
yayin/yeni-tasarim/sunum.css
yayin/yeni-tasarim/sunum.js
yayin/yeni-tasarim/tokens.css
yayin/yeni-tasarim/yayin-baglantilar.js
```

Canlı adres: https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim/
