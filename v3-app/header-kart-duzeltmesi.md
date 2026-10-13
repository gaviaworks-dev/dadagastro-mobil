# Ana sayfa alternatifleri — header ve kart düzeltmesi

Bu son revizyon, docs/33'teki ilk teslimin küçük yatay kart ve küçülen başlık kararlarının yerine geçer. Kök uygulama, yayin ve canlı değişmedi. AGENTS.md'deki açıkça istenen kural güncellemesi dışında kod/kanıt bu klasördedir.

- Üç alternatif + hero-hibrit: beyaz resmi logo her scroll durumunda görünür. Header şeffaf → primary; arama + bildirim aynı. Hero başlığı üst bara taşınmaz.
- Malzeme şeridi sticky olmaz. Başlık, input ve chip şeridi üst bara değmeden kendi satırı bütünüyle gizlenir, yukarı dönünce geri görünür. Geometri ölçümü kullanılır; sabit scroll eşiği yok.
- **En sade:** kök render'ın `.featured-block` ve sekiz `.weekly-card` düğümü taşındı; yeniden kart HTML'i üretilmedi. Yalnız bölüm başlığı `Tarifler` + ok oldu. Fotoğraflar aynı tarifin yerel kopyasına bağlandı. Scroll-snap, gutter, tüm meta ve kaydet korunur. Blok sırası hâlâ hibrit → Dolap → Tarifler → Püf.
- **Modül kapıları:** küçük yatay tarif önizlemesi bilinçli korundu. Beş kapıyı daha da uzatmamak ve alternatifleri tekleştirmemek için bu tur değiştirilmedi. Bu kurgu seçilirse küçük kart yerine iki sütunlu ortak kart kapısı önerilir; büyük carousel ile aynı görünüm tekrarlanmaz.
- **İçerik akışı:** mevcut büyük dikey ortak kart rafı korundu; değişiklik gerekmedi.
- Bütün alt menülerde, karşılaştırma kopyası dahil, `Püf Noktaları` + `fa-lightbulb` kullanılır. Dock'un yan/alt boşlukları opak beyaz; gereksiz 32px üst boşluğu 12px'e indi. Kök karşılaştırma sayfasının içerik düzeni değişmedi.

## Kaynak kartla eşitlik

| Görünüm | Kaynak ve yeni kart genişliği | Yükseklik | Radius | Başlık |
|---|---:|---:|---:|---|
|360|304,55px|480px|24px|20px / 700 / 24px satır|
|390|329,94px|480px|24px|20px / 700 / 24px satır|
|430|363,77px|480px|24px|20px / 700 / 24px satır|

Doğrudan taşınan DOM çocukları da aynı: hero-link, hero-copy, card-save. Kartlar arası12px, ilk kart x20, kaynak scroll-snap korunur. `screenshots/header-cards/card-equivalence.json` ve `source-card-comparison.png`.

## Kontrol

Chromium + WebKit × 360/390/430 × ana-1/2/3/hero-hibrit × scroll0/100/200/400: **96 durum**. Logo görünmezliği0, yatay sayfa taşması0, header sınırında yarım görünen araç satırı0, JS hatası0. Üç genişlikte carousel kaydırması iki motorda çalıştı. Scroll0 şeffaf, diğer istenen konumlarda primary. Tam boy görüntüler de alındı ve görsel kontrol yapıldı.

- `screenshots/header-cards/{1,2,3,hibrit}-{360,390,430}-{0,100,200,400}.png`
- `screenshots/header-cards/{1,2,3,hibrit}-{360,390,430}-full.png`
- `screenshots/header-cards/measurements.json`
- `screenshots/header-cards/source-card-comparison.png`

İlk incelemede opak dock'un gereksiz yüksek beyaz üst payı fark edildi; 12px'e düşürülüp yeniden görüntülendi. Kart yakın planı, alt menü tarafından örtülmeyecek scroll konumunda yeniden alındı. Geçmiş ilk tur ekran görüntüleri karşılaştırma amacıyla korunur; güncel durum bu klasördedir.
