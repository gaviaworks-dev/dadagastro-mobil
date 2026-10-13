# Alt hero birleşimi — kaynak transferi

Düzeltilenler: ana-x1…ana-x9. SET1 kaynaklarında değişiklik yok.

Kaynak: `six-heroes.css:69`, ortak `.hero-a .purpose-banner` bileşeni. Gerçek kaynak CSS `border-radius:0 0 var(--radius-card) var(--radius-card); box-shadow:0 var(--space-4) 0 var(--tomato); margin-bottom:var(--space-4)` kullanıyor. SET2 ek `border-bottom:4px` ile ikinci çizgi çiziyordu. Bu tekrar, kendi radius ve margin override'ı kaldırıldı. Tüm18 aynı kaynak kuralını kullanıyor. İç fotoğraf overflow:hidden/24px ile kırpılıyor; çizgi dış gölge olduğundan fotoğrafın üzerine binmiyor.

Geometri açıklığı: kaynak ayrı bir28px dış-radius yüzeyi tanımlamıyor; 24px yüzeyin4px aşağı ötelenmiş dış gölgesini kullanıyor. Kaynağa birebir sadakat ve doğru SET1'i değiştirmeme sınırı korundu. Bu yüzden matematiksel olarak ayrı bir24/28 eşmerkezli halka üretildiği iddia edilmez; görsel birleşim kaynakla aynıdır.

54 ekran (18×360/390/430),108 köşe yakalandı. Bütün ekranlarda24px radius,0px ek border,4px dış primary gölge,hidden kırpım doğrulandı.3× büyütmelerde sivri turuncu parça ve köşe sızıntısı görülmedi. `corners-18-all-widths.png` bütün genişlikler; `corners-18-source-compare.png` kaynak/hedef yan yana. Galeri iframe sorgusu güncellendi.
