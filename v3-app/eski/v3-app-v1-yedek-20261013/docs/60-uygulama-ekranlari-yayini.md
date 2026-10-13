# 60 — Uygulama ekranları galerisinin yayını

12 Ekim 2026, Beyar'ın şartlı “yayınla” onayıyla. Adres: https://gaviaworks-dev.github.io/dadagastro-mobil/uygulama-ekranlari/

- Kopya: `node v3-app/verification/uygulama-ekranlari/tara.mjs && python3 v3-app/verification/uygulama-ekranlari/build.py` → `yayin/uygulama-ekranlari/` (552 dosya, 19,1 MB). Kök index = patron galerisi (“DadaGastro Mobil Uygulama Ekranları”); `uygulama/index.html` tıklanabilir uygulama. Bütün html'de noindex + Cache-Control; css/js/svg bağlantılarında içerik özeti `?v=`; klasöre özel robots.txt.
- Yayın eşlemesi `yayin-baglantilar.js` (yalnız yayında, kök ekranlara eklenir): kök runtime'ın `index.html` / `ana-1.html` → `ana-v3.html`, `liste.html` → `liste-v2.html`, `detay-c.html` → `detay-v2.html`, `arama.html` → `uygulama/arama.html`. Yayında kök index galeri olduğu için “Ana Sayfa” bağlantıları buna göre ana sayfaya gider.
- Denetim (`qa.mjs`, yerel kopya): 274 ekran/hal, ölü ya da klasör dışı bağlantı 0, JS hatası 0; “Ana Sayfa” bağlantıları 85 + çekmece 4, hepsi `ana-v3.html`. Tek kayıt: canlı dadagastro.com hero görselinin slayt değişiminde tarayıcının iptal ettiği istek (görsel 200).
- `yayin/yeni-tasarim-v3/` bu oturumda bir kez üzerine üretilmişti (hedef değişmeden önce); aynı oturumda git'teki hâline geri alındı (190 dosya, fark 0). Yayında değişmedi.
- gh-pages: geçici index ile `origin/gh-pages` ağacına yalnız `uygulama-ekranlari/` eklendi (552 A, başka değişiklik yok); commit `1423035` (ebeveyn `873659d`), fast-forward push, force yok. main'e commit yapılmadı. Pages dağıtımı run 38268997957 başarılı.
- Canlı kontrol (Chromium + WebKit): galeri 200, başlık ve noindex doğru, 15 grup / 72 kart, çerçeveler yükleniyor; ana-v3, liste-v2, detay-v2, püf, profil, Tabaktan taslağı, uygulama girişi 200 ve JS hatasız; alt menü Ana Sayfa → ana-v3.

**Bu yayından sonra git ve yayın yasağı yeniden geçerli.**
