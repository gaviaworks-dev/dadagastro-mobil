# Liste ekranı: sabit banner ve kayan panel

`liste.html`, proje kökündeki `tarifler.html` sayfa kabuğundan türetildi. Liste çizimi ve veri, v3 uygulama kopyasındaki izole `liste-runtime.js` üzerinden çalışır; yeni kompozisyon ve header düzeltmeleri `liste-fixed.js/css` içindedir. Kök ve paylaşılan v3 kaynak dosyaları değiştirilmedi.

Banner 320px yüksekliğinde ve `position: sticky; top: 0` katmanıdır; fotoğraf, başlık ve üç sayaç aynı ekran koordinatında kalır. Beyaz `list-panel`, banner’ın son 24px’ine biner ve kaydırmada banner’ı örter. Arama, kategori çipleri ve filtre araçları header altına (68px) yapışır; radius 24px’ten 0px’e döner. Yapışma sırasında üst/alt padding ve satır yüksekliği değişmez; yalnız gölge ve köşe görünümü değişir. Header eşiği, banner başlığının ilk yüklemedeki yerleşim koordinatından hesaplanır. Böylece banner yapışkan olsa da reduced-motion modunda eşik scroll miktarıyla kaymaz.

Arama formu yerel `liste.html` adresine gider; arama alanına yeni bir kamera eylemi eklenmedi. Tabaktan Tarif mevcut orta Ne Pişirsem panelinden `tabaktan-tarif.html?donus=liste.html` adresiyle açılır. Tarif kartları `detay-b.html`’ye bağlanır.

## Ölçüm sonuçları

Chromium ve WebKit’te 360/390/430 genişliklerde scroll 0–400px, 20px adımla tarandı. Banner top tüm örneklerde 0px’te, sayaç koordinatı değişmeden kaldı. 400px’te araç satırı top 68px ve radius 0px. Yatay taşma ve yakalanan JavaScript hatası yok.

| Motor | Genişlik | Sayaç top | Header metin eşiği | 400px’te araç top / radius |
|---|---:|---:|---:|---:|
| Chromium | 360 | 232.8px | 121.22px | 68px / 0px |
| Chromium | 390 | 248.4px | 136.81px | 68px / 0px |
| Chromium | 430 | 248.4px | 136.81px | 68px / 0px |
| WebKit | 360 | 232.8px | 121.22px | 68px / 0px |
| WebKit | 390 | 247.5px | 135.94px | 68px / 0px |
| WebKit | 430 | 247.5px | 135.94px | 68px / 0px |

Normal hareket tercihi için header alfa, 0/20/48/60/300px kaydırmada `0 / 0.417 / 1 / 1 / 1` oldu. Reduced-motion’da `0 / 0 / 0 / 0 / 1`; son sıçrama metin eşiğinde gerçekleşti. Başlık eşikleri `header-alpha.json` içindedir. `Dondurma ve Soğuk Tatlılar` seçimi banner DOM’unu yeniler; yeni başlığın eşiği hem normal hem reduced-motion’da güncel banner’dan yeniden ölçüldü (`category-header-state.json`). Yeni ölçüm alfa eşiğiyle aynı değeri verdi. Orta paneldeki Tabaktan Tarif bağlantısı yerel v3 dosyasına ve `donus=liste.html` değerine yönelir; arama alanında kamera düğmesi yoktur.

Yapışma eşiği Chromium ve WebKit’te 1px adımla 210–250px aralığında aşağı ve yukarı tarandı. Her iki yönde 228px’te yapışık, 227px’te serbest durum ölçüldü. Eşik çevresinde toolbar yüksekliği 134px olarak sabit kaldı; içerik akışı konum değişimi scroll adımıyla aynı 1px ilerledi. Bu turda padding kaynaklı yeniden akış/jitter görülmedi. Ham taramalar `threshold-fine-chromium.json` ve `threshold-fine-webkit.json` dosyalarındadır.

## Flutter karşılığı

Fotoğraf/başlık/sayaç için `SliverAppBar(pinned: true, expandedHeight: 320)` ve `FlexibleSpaceBar` içinde arka plan kullan. İçerik panelini sonraki sliver olarak 24px bindir ve overlap’i layout padding’iyle dengele. Arama/çip satırı header altına sabit `SliverPersistentHeader(pinned: true)` olur. Pinned durumunda üst radius 0px’e iner; reduced-motion karşılığı anlık radius değişimidir.

## Görsel kanıtı

`docs/screenshots/v3-liste-fixed/` altında Chromium ve WebKit’te 360/390/430 üst ve 320px scroll ekranları, Chromium 390 bindirme görüntüsü, 0–400px ölçümleri, header alfa matrisi, kategori değişimi normal/reduced-motion kanıtı ve 1px eşik taramaları bulunur.
