# Header geçiş eşiği — ölçüm raporu

390 × 844 CSS piksel, Chromium, normal hareket; 0–400px arası 20px adım. Renk doğrudan `getComputedStyle(header).backgroundColor` üzerinden okundu. Metinlerin Range sınır kutuları header sınır kutusuyla karşılaştırıldı; header’ın kendi metni, kapalı dialoglar ve alt menü hariç tutuldu.

## Bulgu ve düzeltme

| Bulgu | Ekran | Önce | Sonra |
|---|---|---|---|
| Geç solid geçiş | Üç ekran | Görsel sonuna bağlı eşik metnin header altına girmesine izin veriyordu | İlk metnin konumundan hesaplanan güvenli eşik; 8px ön pay |
| İlk açılışta metin kesişimi | Ana Sayfa | Hero üst padding’i 48px, header 68px: etiket baştan header alanındaydı | Üst padding = header yüksekliği + 48px geçiş mesafesi + 8px ön pay |
| Değişen yerleşimde eşik | Üç ekran | İlk ölçüme bağımlılık riski | Scroll, resize, font hazır ve ResizeObserver ile yeniden ölçüm |
| Hareket tercihi | Üç ekran | Tercih değişikliği ayrıca izlenmiyordu | reduced-motion değişimi dinleniyor; güvenli eşikte kademesiz geçiş |

Normal harekette alfa = scroll / min(48px, güvenli eşik), 0–1 aralığına sınırlandırılır. Güvenli eşik = ilk metnin belge koordinatı − header yüksekliği − 8px. Eşik sıfır veya negatifse güvenlik için doğrudan solid olur. Renk tokenı değişmedi: **#E14827 / rgb(225, 72, 39)**.

## 20px adımlı ölçüm

Hücreler **alfa / header ile geometrik olarak kesişen metin sayısı** gösterir. Solid header arkasına kaymış içerik geometrik kesişim sayılır ama görünmez; hata kriteri alfa < 1 iken kesişim olmasıdır.

| Scroll | Ana Sayfa | Tarif Listesi | Tarif Detay | Şeffafken metin kesişimi |
|---:|---:|---:|---:|---|
| 0 | 0.000 / 0 | 0.000 / 0 | 0.000 / 0 | Yok |
| 20 | 0.416 / 0 | 0.480 / 0 | 0.455 / 0 | Yok |
| 40 | 0.830 / 0 | 0.957 / 0 | 0.906 / 0 | Yok |
| 60 | 1.000 / 0 | 1.000 / 1 | 1.000 / 1 | Yok |
| 80 | 1.000 / 1 | 1.000 / 1 | 1.000 / 2 | Yok |
| 100 | 1.000 / 2 | 1.000 / 7 | 1.000 / 2 | Yok |
| 120 | 1.000 / 2 | 1.000 / 7 | 1.000 / 2 | Yok |
| 140 | 1.000 / 3 | 1.000 / 7 | 1.000 / 2 | Yok |
| 160 | 1.000 / 2 | 1.000 / 6 | 1.000 / 2 | Yok |
| 180 | 1.000 / 2 | 1.000 / 0 | 1.000 / 4 | Yok |
| 200 | 1.000 / 2 | 1.000 / 0 | 1.000 / 4 | Yok |
| 220 | 1.000 / 2 | 1.000 / 0 | 1.000 / 3 | Yok |
| 240 | 1.000 / 2 | 1.000 / 0 | 1.000 / 6 | Yok |
| 260 | 1.000 / 2 | 1.000 / 0 | 1.000 / 8 | Yok |
| 280 | 1.000 / 1 | 1.000 / 1 | 1.000 / 9 | Yok |
| 300 | 1.000 / 1 | 1.000 / 1 | 1.000 / 9 | Yok |
| 320 | 1.000 / 4 | 1.000 / 7 | 1.000 / 10 | Yok |
| 340 | 1.000 / 4 | 1.000 / 12 | 1.000 / 6 | Yok |
| 360 | 1.000 / 3 | 1.000 / 11 | 1.000 / 5 | Yok |
| 380 | 1.000 / 3 | 1.000 / 14 | 1.000 / 5 | Yok |
| 400 | 1.000 / 0 | 1.000 / 11 | 1.000 / 2 | Yok |

63 örnek / **0 ihlal**. İlk metinden hesaplanan güvenli eşikler: Ana Sayfa 56px, Tarif Listesi 41,81px, Tarif Detay 44,11px. Bu nedenle tam opaklık sırasıyla 48px, 41,81px ve 44,11px içinde sağlanır. Üç ekranın yukarı dönüş rengi `rgba(225, 72, 39, 0)`; 60px ve sonrasında `rgb(225, 72, 39)`.

## Önizleme ve görsel kontrol

Ana Sayfa onizleme.html iframe içinde 0 → 60 → 120 → 300 → 0 hareketinde aynı renkleri verdi. Reduced-motion kontrolünde ara opaklık oluşmadı.

- [0px](screenshots/header-index-0.png)
- [60px](screenshots/header-index-60.png)
- [120px](screenshots/header-index-120.png)
- [300px](screenshots/header-index-300.png)

İlk ekran görüntüsündeki etiket/header kesişimi görüldü; üst boşluk iyileştirildikten sonra dört görüntü tekrar alınıp incelendi. Logo ve eylemler artık fotoğraf ya da solid marka zemini üzerinde; hero metni şeffaf header arkasında kalmıyor.

Ham ölçüm: [header-esik-olcumleri.json](header-esik-olcumleri.json). Bu rapor son header düzeltmesinin doğrulamasıdır; önceki geniş kapsamlı parite/spacing denetiminin tamamlandığı anlamına gelmez.

## Liste arama paneli: son düzeltme

| Bulgu | Ekran | Önce | Sonra |
|---|---|---|---|
| Panel içi sıkışma | Tarif Listesi | Üst padding 0, chip aralığı 8, alt padding 12px | 16 / 12 / 16px; tamamı spacing tokenı |
| İç içe focus çerçevesi | Arama alanları | Genel input focus kuralı içeride ikinci outline oluşturuyordu | Dış kapsayıcıda focus-within 2px primary halka; input outline/border yok |
| Boşken temizle kontrolü | Arama alanları | Boş alanda düğme yer ayırıyordu | Boşken display:none; yazınca 44px hedef görünür; temizleyince tekrar gizlenir |
| Placeholder kaynak tutarlılığı | Arama alanları | Kısaltılmış farklı metinler | Webdeki “Tarif adı ara… (ör. mercimek çorbası)”; focus/blur ile değişmez |
| Diğer metin alanlarında focus | Formlar ve sheet'ler | Odak doğrudan iç kontrolde | Ortak input-frame; dış kapsayıcı focus halkası, checkbox/radio mevcut odaklarını korur |

### Spacing ölçümü — 390 × 844

- Banner son satırı → panel üst kenarı: **24px**.
- Panel üstü → arama kutusu: **16px**.
- Arama kutusu → chip şeridi: **12px**.
- Chip şeridi → panel sonu: **16px**.
- Panel üst köşeleri: **24px**, `--radius-sheet`; detay sheet’iyle aynı aile.
- İlk tarif kartı üstü: **473,59px**; ilk ekran içinde görünür.
- Odak çerçevesinin kapsayıcı kutusu: **x20 / y202 / 350 × 50px**; 2px halka dış sınırı x18–372 / y200–254.
- Büyüteç: x33–47; input: x55–305; temizle: x313–357. Üçü de x20–370 / y202–252 kapsayıcı sınırlarının içinde.
- Input computed outline-style: **none**. Dış halka: **2px solid rgb(225,72,39)**.
- Boş ve temizlenmiş inputta temizleme düğmesi: **display:none**.
- Çalışma zamanı JS hatası: **0**.

Kaynak placeholder: `resources/views/gastro/partials/hero.blade.php:111`; mod metinleri aynı dosya 104–106. Tarif listesi Blade’inde ayrı inline arama placeholder’ı bulunmadığından mobil liste aramasında da webin tarif arama metni kullanıldı. Focus metni değiştirmiyor; yalnız sekme değiştirme webdeki mod placeholder’ını değiştiriyor.

Görsel kontrolün ikinci turunda renkli 1px sınır + 2px halkadan oluşan kalın kenar kaldırıldı; focus'ta alt kenarlık şeffaf, görünen halka tek 2px.

- [Liste normal](screenshots/liste-panel-normal.png)
- [Liste odaklı](screenshots/liste-panel-odakli.png)
- [Ana Sayfa odaklı](screenshots/ana-sayfa-arama-odakli.png)
- [Arama ölçümleri](arama-paneli-olcumleri.json)

Header kontrolü bu değişikliklerden sonra yeniden çalıştırıldı. Normal hareket için 63 metin-kesişim örneğinde ihlal yok. Normal + reduced-motion toplam 126 örnekte görünür kontrol/şeffaf header çakışması yok; fotoğrafın tamamını açan, ayrı görünür kontrol içermeyen galeri tıklama yüzeyi fotoğraf olarak ele alındı. Reduced-motion ara alfa sayısı 0.
