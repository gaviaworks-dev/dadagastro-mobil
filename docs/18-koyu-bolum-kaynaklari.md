# Koyu bölüm kaynak transferi

Kaynak kökü: `/Users/gaviaworks/Developer/Backend Projects/dadagastro/` (salt okunur). Canlı kontrol: https://dadagastro.com — 7 Ekim 2026.

| Mobil bölüm | Web / kaynak | Yerel görsel | Overlay |
|---|---|---|---|
| Mutfağa Giriş & Püf Noktaları | resources/views/home.blade.php:280–294; resources/css/portal.css:591–597; canlı .guide .px-media | assets/bolumler/mutfak-sirlari.webp | --guide-overlay, kaynaktaki iki gradient birebir |
| Haftanı tek ekranda planla | resources/views/home.blade.php:354–369; resources/css/portal.css:1107–1114 | assets/bolumler/pro-planlama.jpg, Unsplash photo-1547592180-85f173990554, w=480 | --pro-overlay, kaynak yatay gradient birebir |
| Topluluğa Katıl | resources/views/home.blade.php:622–635; resources/css/portal.css:769 | Yok: webde beyaz zemin, yalnız ayrı mobil uygulama tanıtım görseli var | Mobilde de beyaz; yasaklı uygulama tanıtımı eklenmedi |

Guide kaynak URL: https://dadagastro.com/varliklar/storage/pagedef/anasayfa/guide/b8EFwRz0HWo2GFkxOMSRUHOammiWZi7iGFnZRLkd.webp

Görseller IntersectionObserver ile yaklaşınca yüklenir; koyu yer tutucu, cover/center, tek fotoğraf alanı. Pro fotoğraf isteği480px (masaüstü kabuk üst sınırı), retina çarpanı yok. Guide kaynaktan aynen alınan dosyadır. Küçük porsiyon paneli bu bölüm kuralının dışında.

Karşılaştırmalar: screenshots/polish/web.guide.png, web.community.png; koyu-once-* ve koyu-sonra-*. Ana tam boy: ana-koyu-tam-boy.png. Canlı computed kaynaklar web-koyu-kaynak.json.

Solid header altında ek beyaz katman üreten pseudo-element yok; koyu bölüm header altına getirildiğinde hemen alt nokta aynı knowledge-block içinde. Topluluk başlığındaki zorunlu br kaldırıldı; “Senin de bir tarifin var” doğal boşlukla. Kısa açıklamalar önceki akışkan paragraf kuralıyla sola yaslı.
