# 60 — Uygulama ekranları galerisinin yayını

12 Ekim 2026, Beyar'ın şartlı “yayınla” onayıyla. Adres: https://gaviaworks-dev.github.io/dadagastro-mobil/uygulama-ekranlari/

- Kopya: `node v3-app/verification/uygulama-ekranlari/tara.mjs && python3 v3-app/verification/uygulama-ekranlari/build.py` → `yayin/uygulama-ekranlari/` (552 dosya, 19,1 MB). Kök index = patron galerisi (“DadaGastro Mobil Uygulama Ekranları”); `uygulama/index.html` tıklanabilir uygulama. Bütün html'de noindex + Cache-Control; css/js/svg bağlantılarında içerik özeti `?v=`; klasöre özel robots.txt.
- Yayın eşlemesi `yayin-baglantilar.js` (yalnız yayında, kök ekranlara eklenir): kök runtime'ın `index.html` / `ana-1.html` → `ana-v3.html`, `liste.html` → `liste-v2.html`, `detay-c.html` → `detay-v2.html`, `arama.html` → `uygulama/arama.html`. Yayında kök index galeri olduğu için “Ana Sayfa” bağlantıları buna göre ana sayfaya gider.
- Denetim (`qa.mjs`, yerel kopya): 274 ekran/hal, ölü ya da klasör dışı bağlantı 0, JS hatası 0; “Ana Sayfa” bağlantıları 85 + çekmece 4, hepsi `ana-v3.html`. Tek kayıt: canlı dadagastro.com hero görselinin slayt değişiminde tarayıcının iptal ettiği istek (görsel 200).
- `yayin/yeni-tasarim-v3/` bu oturumda bir kez üzerine üretilmişti (hedef değişmeden önce); aynı oturumda git'teki hâline geri alındı (190 dosya, fark 0). Yayında değişmedi.
- gh-pages: geçici index ile `origin/gh-pages` ağacına yalnız `uygulama-ekranlari/` eklendi (552 A, başka değişiklik yok); commit `1423035` (ebeveyn `873659d`), fast-forward push, force yok. main'e commit yapılmadı. Pages dağıtımı run 38268997957 başarılı.
- Canlı kontrol (Chromium + WebKit): galeri 200, başlık ve noindex doğru, 15 grup / 72 kart, çerçeveler yükleniyor; ana-v3, liste-v2, detay-v2, püf, profil, Tabaktan taslağı, uygulama girişi 200 ve JS hatasız; alt menü Ana Sayfa → ana-v3.

**Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## V2 yayını — 13 Ekim 2026 (Beyar “YAYINLA V2”, şartlı onay)
Adres: https://gaviaworks-dev.github.io/dadagastro-mobil/uygulama-ekranlari-v2/ (galeri `ekranlar-v2.html` → `index.html`, başlık “DadaGastro Mobil Uygulama Ekranları”).
- Yerel şartlar: bağlantı 248 sayfa×hâl ölü 0 / JS 0; justify (Chromium 390 + 360, WebKit 390; 263 sayfa×hâl) justify olmayan 0, kenara dayanmayan satır 0, daraltılmış kutu 0; stilsiz 0; yakınlık 0; radius 1 (izinli avatar); iç not 0 (tek eşleşme web tarif-ekle formunun kendi yardım metni).
- Kopya: `yayin/uygulama-ekranlari-v2` — 556 dosya, 19.249.218 bayt; betikler `verification/uygulama-ekranlari-v2/` (tara → build → qa). noindex/nofollow + Cache-Control meta + içerik özeti `?v=` damgası, klasöre özel robots. V1 klasörü ve diğer yayın klasörleri değişmedi (build doğrulaması).
- qa (yerel kopya): 263 sayfa×hâl, sorun 0; “Ana Sayfa” bağlantıları 37/37 → ana-v3.html.
- gh-pages: geçici index ile `1423035` ağacına yalnız `uygulama-ekranlari-v2/` eklendi (556 A, kapsam dışı 0; .env/ekran görüntüsü/denetim çıktısı/node_modules yok). Commit `e62b4e3` (ebeveyn `1423035`), fast-forward push, force yok; main'e commit yok.
- Canlı doğrulama (Chromium + WebKit): galeri, ana-v3, liste-v2, detay-v2, Dolapta Ne Var, püf detayı, şefler, Tabaktan tanıtım — JS hatası 0, başarısız istek 0.
- Karar bekleyen (yayına engel değil): büyük başlık boşlukları (Chromium 390'da 9 benzersiz başlık; ör. “Çilek Bozulduğu (Küflendiği) Nasıl Anlaşılır?”) — izin verilen ayarlarla kapanmıyor.

**Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## V4 yayını — 13 Ekim 2026 (Beyar “YAYINLA V4 — HEMEN”, onaylı; denetim turu yok)
Adres: https://gaviaworks-dev.github.io/dadagastro-mobil/uygulama-ekranlari-v4/ (galeri `ekranlar-v4.html` → `index.html`, başlık “DadaGastro Mobil Uygulama Ekranları”).
- Beyar talimatıyla kapanış denetim turu durduruldu (yalnız bağlantı tamamlanmıştı: 382 sayfa×hâl, ölü 0 / JS 0; justify 390: kenara dayanmayan satır 0, daraltılmış kutu 0, 2px'le kapanmayan büyük başlık 3 benzersiz). Diğer denetimler bu yayında çalıştırılmadı.
- Kopya: `yayin/uygulama-ekranlari-v4` — 753 dosya, 19.826.527 bayt; betikler `verification/uygulama-ekranlari-v4/` (tara 397 sayfa×hâl / 530 dosya / hata 0 → build). V2 betiğinden farkı: `assets/malzeme` ve `ortak/` tohum (JS'te adla yüklenen dosyalar), `ortak/flutter/` hariç. noindex/nofollow + Cache-Control meta + içerik özeti `?v=` damgası, klasöre özel robots. V1, V2, yeni-tasarim-v3 ve diğer yayın klasörleri değişmedi (build doğrulaması). Eksik kaynak kaydı V2 ile aynı (tarama yolu: ortak/assets/marka/*.svg; dosyalar assets/marka'da mevcut).
- Yerel duman testi (yayın kopyası, 12 sayfa: galeri, ana-v3, liste-v2, detay-v2, Dolabım takvim, Dolaptan tercih, Rozetlerim, bileşenler, Dolapta Ne Var, Tabaktan taslağı, bildirimler tarih aralığı, uygulama girişi): sorun 0.
- gh-pages: geçici index ile `e62b4e3` ağacına yalnız `uygulama-ekranlari-v4/` eklendi (753 A, kapsam dışı 0; .env / ekran görüntüsü / denetim çıktısı / node_modules yok). Commit `e54dc9f` (ebeveyn `e62b4e3`), fast-forward push, force yok; main'e commit yok. Pages dağıtımı run 38395494432 başarılı.
- Canlı doğrulama (Chromium, aynı 12 sayfa): 200, JS hatası 0, başarısız istek 0; başlık ve noindex doğru.

**Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## V4 güncelleme — 13 Ekim 2026 (Beyar onayı: aynı V4 klasörüne yeniden yayın) — Dolabım iki takip türü
Patron geri bildirimi: “Ispanağın tarihinin geçmesi saçma.” Veri modeli: paketli (SKT + açık raf ömrü) / taze (eklenme + tazelik süresi, “X gün içinde tüket”); ortak çekirdek `ortak/dg-dolabim.js` (takip, sirala, takipOner, neden), sayfa `ortak/sayfalar/dolabim.js` (ajan 2; takip türü segmenti, taze alanları ortak takvim alanı + adımlayıcı). Örnek veri: Tavuk Göğsü (paketli) Bugün ilk satır, Ispanak taze “2 gün içinde tüket”, tek geçti ürün Krema en sonda. Model notu docs/57 §2.
- Kopya aynı betikle (`verification/uygulama-ekranlari-v4/build.py`): 753 dosya, 19.833.646 bayt; değişen 9, eklenen/silinen 0.
- gh-pages: yalnız `uygulama-ekranlari-v4/` altında 9 M (kapsam dışı 0). Commit `9837b86` (ebeveyn `e54dc9f`), fast-forward push, force yok; main'e commit yok. Pages run 38399107775 başarılı.
- Canlı doğrulama (Chromium 390): Dolabım liste (ilk satır Bugün, son satır Krema “1 gün geçti”, Ispanak “2 gün içinde tüket”), Ispanak detayı, takvim, ana sayfa “Yakında bitecekler” — JS hatası 0, başarısız istek 0.
- Ek güncelleme (Beyar onayı): liste satırında taze ürün açıklaması kısaldı — “12 Ekim'de eklendi” (bulunma eki aya göre, `DGDolabim.neden(u, yaz, {kisa: true})`); tam metin (“Taze ürün · 12 Ekim eklendi · 3 gün tazelik”) detayda ve erişilebilir adda kalır. Aynı betikle yeniden üretim (753 dosya, değişen 9); gh-pages commit `98e2fe6` (ebeveyn `9837b86`), fast-forward, force yok; Pages run 38399879310 başarılı. Canlı: taze satırları tek satır, Ispanak detayı tam metin, JS 0 / başarısız istek 0.

**Bu yayından sonra git ve yayın yasağı yeniden geçerli.**

## V4 güncelleme — 15 Ekim 2026 (Beyar: "V4'ü düzeltip GitHub Pages'e push et") — Hakkımızda "Sayılarla" boşluğu
Kök neden ortak bileşende: `[data-mt]{margin-top:var(--space-16)}` (dg-bilesen.css) ile `.dgu-istatistik{margin:0}` (dg-sayac.css, `<dl>` varsayılan boşluğunu sıfırlamak için) aynı özgüllükte; sonra yüklenen dg-sayac kazanıyor → başlık ile bant çizgisi arası 0. Düzeltme dg-sayac.css: sıfırlama `:where(.dgu-istatistik){margin:0}` (özgüllük 0), `[data-mt]` 16 uygulanır. Ekrana özel stil yok.
- Tarama (Chromium 390, bütün uygulama sayfaları): `[data-mt*]` boşluğu tutmayan öğe önce 1 (Hakkımızda `dl.dgu-istatistik` 0 px), sonra 0. Sayaç bandının diğer kullanımları (bileşenler, giriş, kayıt, püf, şef, şefler, detay-v2) kutu kutu aynı.
- Kopya aynı betikle (`verification/uygulama-ekranlari-v4/build.py`, temiz worktree'de): 753 dosya; değişen 55 (dg-sayac.css + 54 html'de yalnız `dg-sayac.css?v=` damgası), eklenen/silinen 0.
