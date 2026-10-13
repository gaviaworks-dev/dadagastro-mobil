# Altı yeni ana sayfa — teslim kanıtı

## Dosyalar
- Referans: `ana-a.html`; galeride aynı dosya içeriğinin `ana-1.html` kopyası.
- Yeni ekranlar: `ana-2.html` … `ana-6.html`; yalnız bu ekranlara yüklenen `family-home.js/css`.
- Altılı galeri: `ana-sayfa-alti.html`; 390×844 iç viewport, dış kabuk gerektiğinde ölçeklenir.
- Ortak ışık: `hero-light.css`; A'ya eklenen tek şey bu CSS bağlantısı. Bağlantı çıkarılınca A'nın başlangıç SHA256 özetiyle birebir eşitliği doğrulandı.
- Eski alternatifler ve yükseklikler: `eski/onceki-altili`; render kaynakları için base eklendi. Kök/yayın/Laravel değiştirilmedi.
- Araştırma: `docs/35-ana-sayfa-referanslari.md`;16 uygulama,80 yayıncı mağaza görseli; Yummly güncel ana ekranı erişilebilir referans olarak doğrulanamadı.

## Kontroller
- Chromium:6 ekran×360/390/430,844 yükseklik.18 tam boy ekran,18 ilk görünüm, seçili malzeme görüntüleri. `qa.json`, `final-measure.json`.
-18 ekranda sayfa yatay taşması0; JS hatası0; Patates seçimi gerçek veriyle1 malzeme/1 tarif; arama ekranı açılışı doğrulandı. Öğün değişimi ve destenin2/3 fikre ilerlemesi çalışıyor.
- Ek Chromium ve WebKit390 kontrolleri: reduced-motion, çekmece genel araması, dünya mutfakları geçişi, şef takip giriş/önizleme mesajı, eşleşmesiz malzeme ve temizleme. `extra.json`.
- Header son ölçümü `headers-final.json`; A'dan aktarılan logo ve metin geometrisi korunur. Arama ikonu ilk görünümde gizli; solid header + hero dışarıda olduğunda görünür.4'te hareket azaltma açıksa hero daralmaz.
- Şefler6 gerçek kişi ve onaylı sayılar. Bütün sayfalarda sekiz mantıksal bölüm; A'nın malzeme bölümü hero içinde mevcut, ayrı data-six-block etiketi yok.
- Galeri:1440px'de3×2,1000px'de2×3,600/360px'de tek sütun.6 iframe390×844,scroll0,taşma0. `gallery-1440.png`.
- A ışık:24% ilk denemeden16%'ya inceltildi. Kaynak radial/screen, yeni renk yok. `live-before-after.png`,360/390/430 before/after, `light-check.json`. Tabak bölgesinde değişen kanal0; ölçülen hero metinlerinde minimum7,68:1.

## Görsel inceleme / iyileştirme
Altı full-review görselinin üç genişliği ve galerinin1440 çıktısı gözle incelendi.2/6 listelerindeki miras rail çakışması düzeltildi;4'te sert fotoğraf sınırı maskeyle yumuşatıldı;3'ün ileri kontrolüne alt boşluk kazandırıldı;4 malzeme alanı açık2×4 seçim tahtası yapılarak A'dan ayrıldı;2'de ikinci büyük fotoğraf izi azaltılıp tek temiz yemek penceresi bırakıldı. Webden kalan marka/veri/ortak modüller bilinçli; web tanıtım blokları taşınmadı.

Tam boy tarayıcı görüntülerinde fixed alt menü,844px viewport'un altındaki doğal konumunda görünür; içerik kaydırılarak arkasından geçer. İlk görünüm görüntüleri telefonun gerçek görünümüdür. Mevcut video prototipi bilgi paneli açar; oynatılabilir medya kaynağı varmış gibi gösterilmez.

Git add/commit/push/deploy yapılmadı. Yazılan tüm dosyalar v3-app altında.

Son tekrar:984 header ölçümünde görünür metin/header kesişimi0;800px sonunda24 ekran/tarayıcı durumunun tamamında solid header ve görünür arama ikonu. Chromium360/390/430 + WebKit390; ölçüm aralığı0–800px/20px. İlk ölçümdeki tek WebKit teması scroll anındaki eşzamanlı güncellemeyle giderildi. Galeri HTTP200; Chrome'da açıldı.
