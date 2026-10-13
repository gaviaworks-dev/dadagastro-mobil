# 46 — Yeni tasarım 2. sürüm: birleştirme + yayın

11 Ekim 2026. Beyar'ın açık "canlıya al" izniyle; yayın izni yalnız `yayin/yeni-tasarim-v2/` içindi. `yayin/yeni-tasarim/` ve `yayin/ana-sayfa-alternatifleri/` değişmedi (git farkı yok, canlı dosyalar birebir aynı). `tokens.css`, `app.css` ve `AGENTS.md`'ye dokunulmadı. `v3-app/` izlenmeyen olarak kaldı, stage edilmedi. Force push yapılmadı. **Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## 0 · Ön koşul sonucu — hepsi sağlandı, durmaya gerek olmadı

Kod ve tarayıcı ölçümüyle doğrulandı ([docs/46/onkosul.json](46/onkosul.json), betik `docs/46/onkosul.mjs`):

| Ekran | Koşul | Sonuç |
|---|---|---|
| Ana sayfa | Hero slider 5 slayt, otomatik (6 sn) | ✓ |
| | Öne çıkan kart slider'ı (3 slayt) | ✓ |
| | En son eklenenlerde ikişerli küçük kartlar (tam 2, yarım kart yok) | ✓ |
| | Dolapta Ne Var (Dolaptakiler / Hariç tuttuklarım) | ✓ |
| | Sıra: en son → kategoriler/dünya → Dolapta Ne Var → video → şefler → topluluk | ✓ |
| | `ortak-kart.css` bağlı; `?radius` ve `?rozet` çalışıyor (b: kart 20px, siyah %56 cam) | ✓ |
| | Kart bağlantıları `detay-v2` (28/28) | ✓ |
| | `ana-v3-alt1/2/3` yerelde hatasız, 404 yok | ✓ (birleştirmeden sonra da) |
| Liste | Arama içi filtre, sonuç satırında sıralama, öne çıkan slider | ✓ |
| | Tema şeridi (Dünya Mutfakları'nda gizli), panel köşesi 24, avatar baş harfi 13px | ✓ |
| Detay | Gerçek sekmeler; Hatırlatma + Alerjen (tek tasarım); Besin Değerleri ayrı bölüm, alt satır 4 sütun | ✓ |
| | Alternatif malzeme (7 shuffle); varsayılan Mercimekli Yaprak Sarma; yazar a/b/c/d | ✓ |
| | Galeri açılıyor (1 / 5, 1600px); benzer tarifler ikişerli, göstergesiz; sayfa sonu boşluğu | ✓ |
| Ortak menü | "Videolar" satırı | ✓ (üç ekranda) |

Değiştirilen dosyaların başlangıç kopyası: `v3-app/docs/46/once/`.

## 1 · Birleştirmede değişen dosyalar (v3-app, kalıcı)

| Dosya | Ne değişti |
|---|---|
| `ortak-menu.css` | `--dg-header-solid: #DC3D17` token'ı (a) |
| `ortak-kart.js` | Fotoğraf üstü küçük kart `DGCard.tile`, ikişerli slider `DGCard.pairs` + `wirePairs` (göstergesiz, sayfa sayfa snap, yatayda kırpılan kartların fotoğrafları hemen yüklenir), metin konumlu koyu geçiş `DGCard.veils`; küçük kart başlığına kart tipografi rolü; ekranlar arası seçenek taşıma `carry` (f) |
| `ortak-kart.css` | `.dg-tile`, `.dg-pairs`, video oynat işareti `.dg-play` (süre rozetiyle aynı cam); kaydet karesinin 44px alanına app.css'ten sızan gölge/zemin sıfırlandı (açık fotoğrafta kaydet çevresinde açık hale görünüyordu) |
| `ortak-baslik.css` (yeni) | Ortak bölüm başlığı `.dg-head` + "Tümü →" `.dg-head__link` (e) |
| `ana-v3.html/js/css` | Header solid → token; bölüm başlıkları ortak kalıp, üst etiket yok ("Şefler & Yazarlar" başlık oldu); küçük kartlar ve Dolapta Ne Var sonuçları `DGCard.tile`; ikişerli slider `DGCard.pairs` (gösterge kaldırıldı); video oynat `.dg-play`; bütün liste bağlantıları `liste-v2.html` (Tümü, kategori, mutfak, malzeme, menü, alt menü); veri görsel yolu düzeltmesi |
| `liste-v2.html/js/css` | Kart bağlantıları `detay-v2.html` (önce `detay-c.html`); header solid → token (önce `--tomato-dark` #C43D20); "Tema & pişirme tipi" ortak başlık; adres yeniden yazılırken `yazar` ve `giris` de korunur; veri görsel yolu düzeltmesi |
| `detay-v2.html/js/css` | Header solid → token (önce `--tomato` #E14827); Benzer Tarifler `DGCard.pairs` + `DGCard.tile` (sayfaya özel kart/slider CSS'i silindi), başlık "Benzer Tarifler · Tümü →"; "Nasıl yapılır?", "Yorumlar", "Besin Değerleri" ortak başlık, üst etiketler kaldırıldı; geri düğmesi tarifin açıldığı ekrana döner (ana sayfa ya da liste) |
| `docs/liste-v2/cache-bust.mjs` | Sayfa adlarını argüman olarak alır; üç ekran için çalıştırıldı (h) |

`ortak-menu.js` değişmedi.

**Kararlar / yorumlar (raporlanıyor):**
- **Üst etiket:** ana sayfada bölümlerin çoğunda üst etiket yoktu → "hiçbirinde" uygulandı. Üst etiketli üç başlıkta görünür başlık modül adı oldu: "Tarifin ustaları" → **Şefler & Yazarlar**, "Bunları da seveceksin" → **Benzer Tarifler**; "Adım Adım" ve "Değerlendirmeler" etiketleri kalktı (başlıklar "Nasıl yapılır?", "Yorumlar (0)"). Tek istisna: sayfa sonundaki **Topluluğa Katıl** çağrı kartı; bölüm başlığı satırı değil, metni AGENTS'ta kaynak metin olarak sabit ("Topluluğa Katıl / Senin de bir tarifin var").
- **"Tümü":** ekranlar arası giden bütün "Tümü"ler `liste-v2`'ye gider. Ana sayfada Kategoriler ve Video Mutfağı "Tümü"sü sayfa içi tam listeyi (sheet) açmaya devam ediyor; video için liste ekranının karşılığı yok. Şefler "Tümü" de kurala göre listeye gidiyor (şef listesi ekranı yok).
- **Menü:** üç ekranda birebir aynı; tek fark bulunulan sayfayı gösteren etkin satır (ana sayfada "Ana Sayfa", listede "Tüm Tarifler" açık, detayda yok). Bu önceki yayında da bilinçli fark olarak kabul edilmişti; kaldırılmadı.
- **Küçük kart yazar adı** 15px → 13px oldu: eski satır `<p>` olduğu için ortak gövde rolünü (15px) alıyordu; şimdi listedeki kartla ve kanondaki fotoğraf üstü küçük metinle aynı (13px). Kart ölçüsü değişmedi (169 × 253.5, köşe, rozet, kaydet, avatar aynı; [önce](46/kart-olcu-once.json) / [sonra](46/kart-olcu-sonra.json)).
- **Seçenek taşıma:** satırın bütün seçenekleri korunsun diye patron sayfasındaki her telefon adresine o satırın diğer ekran seçenekleri de eklendi (ör. ana sayfa `?gosterge=b&radius=b&rozet=b&siralama=b&yazar=b`). Görünümü değiştirmez; karttan detaya geçince `yazar=b`, Tümü'den listeye geçince `siralama=b` gelir.

## 2 · Header renk ölçümü

Kaydırılmış (solid) header, computed `background-color` ([tutarlilik-canli.json](../verification/yeni-tasarim-v2/tutarlilik-canli.json); yerelde de aynı):

| Ekran | Önce | Şimdi (Chromium / WebKit) | Token | Beyaz logo/ikon kontrastı |
|---|---|---|---|---|
| Ana Sayfa | #E14827 | #DC3D17 / #DC3D17 | `--dg-header-solid` | 4.45:1 |
| Tarif Listesi | #C43D20 | #DC3D17 / #DC3D17 | `--dg-header-solid` | 4.45:1 |
| Tarif Detay | #E14827 | #DC3D17 / #DC3D17 | `--dg-header-solid` | 4.45:1 |

Değerlendirme: logo ve ikonlar grafik öğe (WCAG 3:1 eşiği) → geçer. Detayda kaydırınca header'a gelen tarif adı metindir (16px); 4.45:1, küçük metin için 4.5:1 eşiğinin 0.05 altında. Bu Beyar'ın renk kararının bilinen sonucu (docs/42 R0'da da 4.45 ölçülmüştü); değiştirilmedi.

## 3 · Bölüm başlığı tablosu

Üç ekrandaki bütün bölüm başlıkları (detayda Hazırlanış ve Yorumlar sekmeleri açılarak), Chromium; WebKit değerleri aynı. Akordeon başlıkları ("Tarif bilgileri") kendi kalıbında kaldı.

| Ekran | Bölüm başlığı | Boyut | Ağırlık | Yazı | Renk | Satır | Harf aralığı | Alt boşluk | Üst etiket | Sağdaki bağlantı |
|---|---|---|---|---|---|---|---|---|---|---|
| Ana Sayfa | En son eklenen tarifler | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | Tümü → liste (en yeni) |
| Ana Sayfa | Kategoriler & Dünya Mutfakları | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | Tümü → sayfa içi tam liste |
| Ana Sayfa | Dolapta Ne Var? | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | — |
| Ana Sayfa | Video Mutfağı | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | Tümü → sayfa içi tam liste |
| Ana Sayfa | Şefler & Yazarlar | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | Tümü → liste |
| Tarif Listesi | Tema & pişirme tipi | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | — |
| Tarif Detay | Nasıl yapılır? | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | (A− / A+ kontrolleri) |
| Tarif Detay | Yorumlar (0) | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | — |
| Tarif Detay | Besin Değerleri | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | — |
| Tarif Detay | Benzer Tarifler | 20px | 700 | GilroyBd | #211E16 | 24px | −0.4px | 16px | yok | Tümü → liste |

Bütün "Tümü" bağlantıları: 13px, 500, #A8331A (domates koyu), ok ikonu 14px, 44px dokunma alanı. "Tamamını Gör" kalmadı.

## 4 · Düzeltilen görsel yolu sayısı

- Ana sayfa ve listenin yüklediği ortak veride (`PARITY.recipes` adım görselleri ve benzer tarif görselleri) **56 göreli `/varliklar/…` yolu** vardı; yerelde hepsi 404. Detaydaki yöntemle (veri belleğe alınırken canlı köke çevirme) `ana-v3.js` ve `liste-v2.js` içinde düzeltildi; ortak veri dosyası değişmedi. İki ekranda aynı 56 yol.
- Tarama: ana sayfa 182, liste 149, detay 150 görsel adresi sayfanın kendi çözümlemesiyle istendi; **göreli yol 0, hatalı 0** ([önce](46/gorsel-once.json) / [sonra](46/gorsel-sonra.json), betik `docs/46/gorsel-tara.mjs`).
- Not: bu 56 yol varsayılan görünümde ekrana gelmiyordu (önce de ağda 404 görülmüyordu); veri düzeyinde temizlendi. İkişerli slider'da yatayda kırpılan kartların fotoğrafı artık hemen yükleniyor (önce detayda tembel yükleyici yüzünden kaydırınca gri kalabiliyordu).

## 5 · Tutarlılık görselleri

`v3-app/docs/screenshots/yeni-tasarim-v2/tutarlilik/` (canlıdan alındı; betik `verification/yeni-tasarim-v2/tutarlilik.mjs`, Chromium + WebKit'te assert'lerle):
- **Üç ekranın menüsü açık, yan yana:** `menu-uc-ekran-misafir.png`, `menu-uc-ekran-uye.png`
- **Tarif kartları yan yana (ana sayfa · liste · detay benzer tarifler):** `kartlar-uc-ekran.png` — `?radius=a/b` ve `?rozet=a/b`'de üç ekranda köşe 16/20, rozet 32px (8/12 köşe, aynı cam), kaydet 32 görünür / 44 hedef, gölgesiz; avatar 20px, 13px GilroyBd, Türkçe büyük harf ("İ").
- **Header yan yana:** `header-uc-ekran.png`
- Video kartı: `video-kart.png` — süre rozeti ve oynat aynı cam (renk, filtre, köşe 8, 32px).
- Birleştirme sırasındaki bölüm görüntüleri: `../birlestirme/`.

## 6 · Yerel kontrol (yayından önce)

`node v3-app/verification/yeni-tasarim-v2/qa.mjs http://127.0.0.1:8765/yayin/yeni-tasarim-v2/ yerel` → [qa-yerel.json](../verification/yeni-tasarim-v2/qa-yerel.json). Chromium + WebKit, 1440 ve 390:
- Ağda 404 yok (görseller ve iframe'ler dahil), konsol hatası yok.
- 10 iframe yükleniyor, içerik 390 genişlikte (masaüstünde 4 telefonluk satır 0.81 ölçekte; çerçeve küçülür, içerik değil). 1440'ta yatay taşma yok.
- Dar ekranda üç sekme ("Seçenek 1 / Seçenek 2 / Şef kartları"), seçilen sekmenin ekranları alt alta, taşma yok.
- Çerçeve içinde menü açılıp kapanıyor, ikişerli slider kayıyor, galeri açılıyor.
- Gezinme (20 adım, iki motor): kart → detay, liste kartı → detay, benzer tarif → detay, detay Tümü → liste, ana sayfa Tümü → liste; her adımda satırın bütün seçenekleri (gösterge, radius, rozet, sıralama, yazar) adreste ve ekranın gerçek durumunda doğru.
- Görünür metinde iç kod yok (sayfa ve menüler açıkken üç ekran).
- Ek regresyon: 360/430'da üç ekranda yatay taşma yok, ikişerli slider'da tam 2 kart.

## 7 · Yayın

`v3-app/verification/yeni-tasarim-v2/build.py` (docs/43/45 yöntemi): 192 dosya, 8.0 MB; göreli yollar, klasör dışına ve `v3-app`'e yol referansı yok (canlı dadagastro.com görselleri hariç); noindex + Cache-Control meta; CSS/JS/varlık ve iframe adreslerinde içerik SHA-256 ilk 12 hane `?v=`; klasöre özel `robots.txt`. Yayında olmayan sayfalar: arama → liste, Tabaktan Tarif → "Yakında". Öncesinde diğer 959 yayın dosyasının özeti değişmemiş doğrulandı; stage alanı boştu. Gizli anahtar taraması temiz (eşleşmeler tasarım "token" adları).

**Commit'ler** (hepsi fast-forward, force yok; gh-pages her seferinde önceki gh-pages'in devamı, ağacı main'deki `yayin/`):

| | main | gh-pages | Fark |
|---|---|---|---|
| 1 · yayın | `b6ba2ae79b46654b643ec9cdb1b1ac5f7e71133d` (önceki `879dd84`) | `b7856a7c9b87e8972515980df78582182929d47a` (ebeveyn `98ac7ae`) | 192 eklenen `yeni-tasarim-v2/` dosyası |
| 2 · düzeltme | `a082b938df55e6afbc99b07feacaa4c3c1ad946a` | `c2305496e99e6cb0be81ffcebd8b03de5fa459f5` | `index.html`, `sunum.js` |
| 3 · düzeltme | `0d282e193129529c038511fe92a165186996c412` | `c1a57e15d082ebca4ec57f92bc470c6f1bdd5be4` | `index.html`, `sunum.js` |

Neden iki düzeltme: canlı kontrol, WebKit'te şef kartı satırının ölçeğinin sayfa yerleşimi oturmadan hesaplanıp 1440'ta yatay taşma bıraktığını yakaladı (yerelde ilk koşuda zamanlama tutmuştu). Ölçek ResizeObserver ile yeniden hesaplanır oldu; bunun ilk hâli canlıda bir "ResizeObserver loop" konsol uyarısı üretti, üçüncü commit yalnız genişlik değişince ve bir sonraki karede hesaplayacak şekilde düzeltti. İkisi de yalnız bu klasörün iki dosyası. gh-pages gönderiminin ilk denemesi iki kez reddedildi, hemen ardından aynı commit fast-forward olarak kabul edildi.

Pages dağıtımları başarılı: run 38089044338, 38089357577, 38089622307 (`verification/yeni-tasarim-v2/pages.log`).

**Canlı kontrol** (`qa.mjs … canli` → [qa-canli.json](../verification/yeni-tasarim-v2/qa-canli.json)): sayfa, üç ekran ve robots.txt 200; yerel kontrollerin hepsi canlıda Chromium + WebKit, 1440 ve 390'da geçti (404 yok, konsol hatası yok, 10 iframe, menü, slider, galeri, 20 gezinme adımında seçenekler korunuyor, iç kod yok). Canlı tutarlılık ölçümü de geçti.

**Eski iki yayın:** `yeni-tasarim/` ve `ana-sayfa-alternatifleri/` canlıda hatasız ve 404'süz açılıyor; denetlenen dosyalar depodaki kopyayla birebir aynı; git'te bu iki klasörde fark yok ([eski-yayinlar.json](../verification/yeni-tasarim-v2/eski-yayinlar.json)).

## 8 · Canlı ekran görüntüleri

`v3-app/docs/screenshots/yeni-tasarim-v2/canli/`
- Masaüstü: `chromium-1440.png`, `webkit-1440.png`, `chromium-1440-menu.png`, `webkit-1440-menu.png`
- Telefon: `chromium-390.png`, `webkit-390.png`, `chromium-390-menu.png`, `webkit-390-menu.png`
- Eski yayınlar: `eski-yeni-tasarim.png`, `eski-ana-sayfa-alternatifleri.png`

Yerel görüntüler: `v3-app/docs/screenshots/yeni-tasarim-v2/yerel/`.

## 9 · Stage listesi

İlk commit öncesi `git diff --cached --name-only` (192 dosya, hepsi `yayin/yeni-tasarim-v2/` altında; başka dosya yok). Düzeltme commit'lerinde yalnız `yayin/yeni-tasarim-v2/index.html` ve `yayin/yeni-tasarim-v2/sunum.js` (`staged-duzeltme.txt`, `staged-duzeltme-2.txt`).

```
yayin/yeni-tasarim-v2/a-chefs.css
yayin/yeni-tasarim-v2/a-chefs.js
yayin/yeni-tasarim-v2/a-discovery.css
yayin/yeni-tasarim-v2/ana-v3.css
yayin/yeni-tasarim-v2/ana-v3.html
yayin/yeni-tasarim-v2/ana-v3.js
yayin/yeni-tasarim-v2/app.css
yayin/yeni-tasarim-v2/assets/bolumler/mutfak-sirlari.webp
yayin/yeni-tasarim-v2/assets/bolumler/pro-planlama.jpg
yayin/yeni-tasarim-v2/assets/flags/LICENSE
yayin/yeni-tasarim-v2/assets/flags/am.svg
yayin/yeni-tasarim-v2/assets/flags/ar.svg
yayin/yeni-tasarim-v2/assets/flags/at.svg
yayin/yeni-tasarim-v2/assets/flags/au.svg
yayin/yeni-tasarim-v2/assets/flags/az.svg
yayin/yeni-tasarim-v2/assets/flags/br.svg
yayin/yeni-tasarim-v2/assets/flags/ca.svg
yayin/yeni-tasarim-v2/assets/flags/cn.svg
yayin/yeni-tasarim-v2/assets/flags/co.svg
yayin/yeni-tasarim-v2/assets/flags/cu.svg
yayin/yeni-tasarim-v2/assets/flags/de.svg
yayin/yeni-tasarim-v2/assets/flags/eg.svg
yayin/yeni-tasarim-v2/assets/flags/es.svg
yayin/yeni-tasarim-v2/assets/flags/et.svg
yayin/yeni-tasarim-v2/assets/flags/fr.svg
yayin/yeni-tasarim-v2/assets/flags/gb.svg
yayin/yeni-tasarim-v2/assets/flags/ge.svg
yayin/yeni-tasarim-v2/assets/flags/gr.svg
yayin/yeni-tasarim-v2/assets/flags/id.svg
yayin/yeni-tasarim-v2/assets/flags/ie.svg
yayin/yeni-tasarim-v2/assets/flags/in.svg
yayin/yeni-tasarim-v2/assets/flags/iq.svg
yayin/yeni-tasarim-v2/assets/flags/ir.svg
yayin/yeni-tasarim-v2/assets/flags/it.svg
yayin/yeni-tasarim-v2/assets/flags/jm.svg
yayin/yeni-tasarim-v2/assets/flags/jo.svg
yayin/yeni-tasarim-v2/assets/flags/jp.svg
yayin/yeni-tasarim-v2/assets/flags/kr.svg
yayin/yeni-tasarim-v2/assets/flags/kz.svg
yayin/yeni-tasarim-v2/assets/flags/lb.svg
yayin/yeni-tasarim-v2/assets/flags/ma.svg
yayin/yeni-tasarim-v2/assets/flags/mx.svg
yayin/yeni-tasarim-v2/assets/flags/my.svg
yayin/yeni-tasarim-v2/assets/flags/nz.svg
yayin/yeni-tasarim-v2/assets/flags/pe.svg
yayin/yeni-tasarim-v2/assets/flags/ph.svg
yayin/yeni-tasarim-v2/assets/flags/pk.svg
yayin/yeni-tasarim-v2/assets/flags/pt.svg
yayin/yeni-tasarim-v2/assets/flags/ru.svg
yayin/yeni-tasarim-v2/assets/flags/sa.svg
yayin/yeni-tasarim-v2/assets/flags/sy.svg
yayin/yeni-tasarim-v2/assets/flags/th.svg
yayin/yeni-tasarim-v2/assets/flags/tn.svg
yayin/yeni-tasarim-v2/assets/flags/tr.svg
yayin/yeni-tasarim-v2/assets/flags/ua.svg
yayin/yeni-tasarim-v2/assets/flags/us.svg
yayin/yeni-tasarim-v2/assets/flags/uz.svg
yayin/yeni-tasarim-v2/assets/flags/vn.svg
yayin/yeni-tasarim-v2/assets/flags/za.svg
yayin/yeni-tasarim-v2/assets/fontawesome/css/all.min.css
yayin/yeni-tasarim-v2/assets/fontawesome/webfonts/fa-brands-400.woff2
yayin/yeni-tasarim-v2/assets/fontawesome/webfonts/fa-solid-900.woff2
yayin/yeni-tasarim-v2/assets/fonts/Gilroy-ExtraBold.otf
yayin/yeni-tasarim-v2/assets/fonts/Gilroy-Light.otf
yayin/yeni-tasarim-v2/assets/fonts/Gilroy-Medium.ttf
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-0.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-1.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-10.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-11.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-12.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-13.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-14.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-15.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-16.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-17.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-18.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-2.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-3.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-4.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-5.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-6.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-7.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-8.webp
yayin/yeni-tasarim-v2/assets/home-v3/kategori/kategori-9.webp
yayin/yeni-tasarim-v2/assets/marka/apple-touch-icon.png
yayin/yeni-tasarim-v2/assets/marka/dadagastro-amblem.svg
yayin/yeni-tasarim-v2/assets/marka/dadagastro-beyaz.svg
yayin/yeni-tasarim-v2/assets/marka/dadagastro-renkli.svg
yayin/yeni-tasarim-v2/assets/media/02a17618ce3eff18712f.webp
yayin/yeni-tasarim-v2/assets/media/11ddf89ac8ee9eba4a3e.webp
yayin/yeni-tasarim-v2/assets/media/12fb9dd8f45df0981314.webp
yayin/yeni-tasarim-v2/assets/media/19b6f8567ce0b6729e2f.webp
yayin/yeni-tasarim-v2/assets/media/1c4d04dbb6ed3e998b81.webp
yayin/yeni-tasarim-v2/assets/media/1d801e3a3e473bbdb6f2.webp
yayin/yeni-tasarim-v2/assets/media/351af65503c6210161c9.webp
yayin/yeni-tasarim-v2/assets/media/359317b2f0b0ffe4b5c8.webp
yayin/yeni-tasarim-v2/assets/media/3945975b2568e95beae6.webp
yayin/yeni-tasarim-v2/assets/media/3a272ac11fce7e46710c.webp
yayin/yeni-tasarim-v2/assets/media/421b9077b5dc37414bb5.webp
yayin/yeni-tasarim-v2/assets/media/435b15d290f445f219e8.webp
yayin/yeni-tasarim-v2/assets/media/4674366e2bd9b4fe9021.webp
yayin/yeni-tasarim-v2/assets/media/47527b662d4474261055.webp
yayin/yeni-tasarim-v2/assets/media/48e4350bc69dd627d680.webp
yayin/yeni-tasarim-v2/assets/media/4e6803b296341097b2de.webp
yayin/yeni-tasarim-v2/assets/media/58e609d7e9d91b1bbddc.webp
yayin/yeni-tasarim-v2/assets/media/66242c1d8a4c9947c49e.webp
yayin/yeni-tasarim-v2/assets/media/68a715cb7fe110db76dd.webp
yayin/yeni-tasarim-v2/assets/media/68a80875c862ebfaa533.webp
yayin/yeni-tasarim-v2/assets/media/74804f5ff7ee7f8dcb5d.webp
yayin/yeni-tasarim-v2/assets/media/7b0b7f92e7370c7da46f.webp
yayin/yeni-tasarim-v2/assets/media/7f26acce6c174b1a9986.webp
yayin/yeni-tasarim-v2/assets/media/998b9a80b30fbd69d249.webp
yayin/yeni-tasarim-v2/assets/media/9f84aed604309b60d45f.webp
yayin/yeni-tasarim-v2/assets/media/a4934d027b5982188735.webp
yayin/yeni-tasarim-v2/assets/media/a7c08852130f4904dd11.webp
yayin/yeni-tasarim-v2/assets/media/afeae45d26e58b22b7af.webp
yayin/yeni-tasarim-v2/assets/media/b5dd58b238265660c718.webp
yayin/yeni-tasarim-v2/assets/media/bdefe54acbede935824f.webp
yayin/yeni-tasarim-v2/assets/media/d145ce5fb7afe0e1eeeb.webp
yayin/yeni-tasarim-v2/assets/media/dfc7c04502f4a89a93a8.webp
yayin/yeni-tasarim-v2/assets/media/ec7594a47498e121f9f0.webp
yayin/yeni-tasarim-v2/assets/media/ef324f5edd5569fae982.webp
yayin/yeni-tasarim-v2/assets/media/f3076cccd34c0805539b.webp
yayin/yeni-tasarim-v2/assets/media/f551a71ef07d7b2cb668.webp
yayin/yeni-tasarim-v2/assets/media/f5d28e5bd90a319af6cc.webp
yayin/yeni-tasarim-v2/assets/media/fc12f85e29b823724c77.webp
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1432139555190-58524dae6a55.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1455619452474-d2be8b1e70cd.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1473093295043-cdd812d0e601.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1474979266404-7eaacbcd87c5.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1476718406336-bb5a9690ee2a.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1505253716362-afaea1d3d1af.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1509440159596-0249088772ff.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1515543904379-3d757afe72e4.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1516684732162-798a0062be99.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1533089860892-a7c6f0a88666.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1540420773420-3366772f4999.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1541529086526-db283c563270.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1544145945-f90425340c7e.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1547592180-85f173990554.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1559737558-2f5a35f4523b.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1563245372-f21724e3856d.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1565299624946-b28f40a0ae38.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1565958011703-44f9829ba187.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/category-photo-1604909052743-94e838986d24.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/video-photo-1466978913421-dad2ebd01d17.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/video-photo-1518977956812-cd3dbadaaf31.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/video-photo-1519996529931-28324d5a630e.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/video-photo-1525351484163-7529414344d8.avif.avif
yayin/yeni-tasarim-v2/assets/six-media/video-photo-1556910103-1c02745aae4d.avif.avif
yayin/yeni-tasarim-v2/detay-v2-aciklama.js
yayin/yeni-tasarim-v2/detay-v2-tarifler.js
yayin/yeni-tasarim-v2/detay-v2.css
yayin/yeni-tasarim-v2/detay-v2.html
yayin/yeni-tasarim-v2/detay-v2.js
yayin/yeni-tasarim-v2/discovery-data.js
yayin/yeni-tasarim-v2/hero-light.css
yayin/yeni-tasarim-v2/home-base.js
yayin/yeni-tasarim-v2/home-media.js
yayin/yeni-tasarim-v2/home-v3-kategori-media.js
yayin/yeni-tasarim-v2/index.html
yayin/yeni-tasarim-v2/ld-links.js
yayin/yeni-tasarim-v2/ld-source.js
yayin/yeni-tasarim-v2/liste-v2.css
yayin/yeni-tasarim-v2/liste-v2.html
yayin/yeni-tasarim-v2/liste-v2.js
yayin/yeni-tasarim-v2/ortak-baslik.css
yayin/yeni-tasarim-v2/ortak-kart.css
yayin/yeni-tasarim-v2/ortak-kart.js
yayin/yeni-tasarim-v2/ortak-menu.css
yayin/yeni-tasarim-v2/ortak-menu.js
yayin/yeni-tasarim-v2/robots.txt
yayin/yeni-tasarim-v2/set15-data.js
yayin/yeni-tasarim-v2/set15-home.css
yayin/yeni-tasarim-v2/set15-sections.css
yayin/yeni-tasarim-v2/set15-sections.js
yayin/yeni-tasarim-v2/set2-common.js
yayin/yeni-tasarim-v2/set2-core.js
yayin/yeni-tasarim-v2/set2-data.js
yayin/yeni-tasarim-v2/set2-finish.js
yayin/yeni-tasarim-v2/set2-heroes.css
yayin/yeni-tasarim-v2/set2-x6.js
yayin/yeni-tasarim-v2/six-gallery-start.js
yayin/yeni-tasarim-v2/six-heroes.css
yayin/yeni-tasarim-v2/six-heroes.js
yayin/yeni-tasarim-v2/six-home.css
yayin/yeni-tasarim-v2/six-home.js
yayin/yeni-tasarim-v2/six-media.js
yayin/yeni-tasarim-v2/sunum.css
yayin/yeni-tasarim-v2/sunum.js
yayin/yeni-tasarim-v2/tokens.css
yayin/yeni-tasarim-v2/yayin-baglantilar.js
```

## Açık konular

1. Detay header'ındaki tarif adı #DC3D17 üzerinde 4.45:1 (küçük metin eşiğinin hemen altı); renk kararı Beyar'ın.
2. Topluluğa Katıl kartındaki üst etiket bilinçli istisna olarak kaldı (yukarıda); kaldırılması istenirse tek satır.
3. Menüdeki etkin satır farkı (bulunulan sayfa) korunuyor.
4. Şefler "Tümü" listeye gidiyor; şef listesi ekranı yok.

Bu yayından sonra git ve yayın yasağı yeniden geçerli.

Canlı adres: https://gaviaworks-dev.github.io/dadagastro-mobil/yeni-tasarim-v2/
