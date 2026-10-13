# A — genel arama, malzeme ve şef revizyonu

## Uygulanan
- Yalnız A / uzun / orta / kısa: tekrar eden üç giriş kartı, değnek ve koleksiyon notu kaldırıldı.
- Onaylı Patates Mücveri hero'su ve dış alt kavis korunuyor: 24px alt radius, 4px primary dış çizgi. Arama için orta alt sınır 360px, kısa alt sınır 320px; uzun 60svh. Galeri artık yanıltıcı yüzde etiketleri kullanmıyor.
- Hero genel araması, hero kaybolduğunda görünen header araması ve drawer'ın üst arama satırı aynı arama.html ekranına gider.
- Arama: yerel içerik setinde tarif, şef, video ve püf noktası; tür sekmeleri, temizleme, yerel son aramalar, sonuç sayısı, sonuçsuz durum. Tarife geçiş mevcut detaya gider. Video oynatma / tam püf metni mevcut veri setinde bulunmadığı için ayrıntı önizlemesi bunu açıkça belirtir; gerçek servis varmış gibi gösterilmez.
- Malzeme alanında boş sayaç yerine davet; seçimde gerçek yerel eşleşme sayısı ve tarifler. Varsayılan kayan sonuç rafı, alternatif ?kurgu=kart.
- Fotoğraflı şef portre rafı varsayılan, alternatif ?sef=odak. Takip eylemi gerçek takip yapmaz; yerel önizleme açıklaması gösterir.
- Liste: ilk büyük kartı korumak için sayfada 1 büyük + 8 ızgara kartı; son sayfada 1 + 4. Filtrelenmiş çift sonuç grupları tümüyle çift kolon ızgarasında gösterilir. Veri silinmez/çoğaltılmaz. Izgaralar 8/8/8/4. Sayfalama sonrası sticky banner offset'inin header eşiğini kaydırması da yalnız liste-fixed.js içinde giderildi.

## Karşılaştırma ve öneri
- Malzeme: `kitchen-pair.png`. Seç ve keşfet önerilir: daha büyük tarif fotoğrafları ve yana kaydırma; kapalı kart seçeneği daha sıkışık.
- Şefler: `chefs-pair.png`. Portre rafı önerilir: fotoğraf öncelikli, takip eylemi küçük, bölüm daha kısa. Avatar + büyük odak daha fazla dikey alan tüketir.
- Arama: `search-three.png` (boş / sonuç / sonuçsuz).
- Çalışan sunum: ../../ana-a-kurgular.html. Ana galeri: ../../ana-sayfa-alti.html.

## İçerik kaynağı ve sınır
- Tarif, video, püf noktası ve mevcut fotoğrafsız şefler: mevcut home-base.js / home-media.js veri seti. Fotoğrafsız mevcut şefler aramadan kaldırılmadı.
- Fotoğraflı şefler: salt okunur Laravel `reference/sefler/sefler-v1.html` ilk dört kaydı. İsim, uzmanlık ve fotoğraf eşlemesi aynen korundu. İlgili `database/seeders/SeflerDemoSeeder.php` bu portrelerin demo kaynağı olduğunu açıklıyor. Bunlar doğrulanmış canlı şef profil fotoğrafları değildir; mevcut canlı şeflere rastgele fotoğraf atanmadı. Fotoğraflar en büyük kullanım olan 350px için indirildi, retina çarpanı yok.
- Canlı /sefler ilk dizin sayfasında baş harfler var; yerel database.sqlite içinde dolu şef havuzu yok. Kaynak veri farkı budur.
- Popüler aramalar: https://dadagastro.com/ara boş ekranının fsPopChips içeriği. Kaynaktaki yazımlar (menemn, manti, balik dahil) değiştirilmedi. Gerçek arama istatistiği uydurulmadı.
- Şef fotoğrafı talebinin doğrulanmış gerçek profil fotoğrafı kısmı kaynakta sağlanamadı; kaynak demo portreleriyle tasarım tamamlandı.

## Kontrol / öz eleştiri
- 12 A ekranında (4 varyasyon × 360/390/430) tam boy ve ilk ekran görüntüleri alındı, yan yana incelendi. Taşma 0, ilk header araması gizli, aşağıda görünür; tekrar kutuları 0.
- Arama–öneri boşluğu orta 77px, kısa 45px, uzun 224px. Alt kavis değiştirilmedi.
- İlk turda arama sekmelerinin etiketleri sıkışıyordu ve boş durumda sekmeler CSS tarafından görünür tutuluyordu. Gizleme özgüllüğü ve yatay kayan sekme düzeni düzeltildi; yeniden görüntülendi.
- Şef odak seçeneğinde portre büyüdüğünde 240px kaynak yetersizdi; 350px kaynak alındı. Ana sayfada daha dengeli portre rafı seçildi.
- Chromium + WebKit, 360/390/430: malzeme seç/reset; drawer araması; odak; dört sonuç türü; sonuç yok/temizle; gerçek yerel son arama; dört liste sayfası. Hepsi geçti (interactions.json).
- Galeri 1440: 9 iframe 390×844, scroll 0, yatay taşma 0. Orta düğmede Tabaktan Tarif bağlantısı mevcut.
- Liste son header'ı opak rgb(225,72,39). Kırık içerik görseli bulunmadı.
- B–F sayfa dosyaları ve ortak six-home/six-heroes kodu değiştirilmedi. Yeni A ek dosyaları yalnız dört A sayfasına bağlandı.
- Kök/yayin/canlı/backend dosyası yazılmadı. Git add/commit/push yapılmadı.
