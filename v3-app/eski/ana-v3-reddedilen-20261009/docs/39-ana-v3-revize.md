# Ana sayfa V3 — 9 Ekim 2026

## Kapsam ve girişler

- Uygulama: `../ana-v3.html`.
- Sunum: `../ana-sayfa-v3.html`; yeni tasarımın 390×844 çerçevesi ve yanında daha küçük önceki tasarım, her ikisinde Tek başına aç.
- V2 galerisi okunarak doğrulandı: 1 → ana-1 (Sinematik seçim), 4 → ana-x6 (Açılan sahne).
- Ortak kaynaklar ve V2 değiştirilmedi. Yalnız yeni V3 dosyaları eklendi. Kök, yayin, Laravel, marka klasörü ve canlı değiştirilmedi. Git add/commit/push yapılmadı.

## Uygulanan revize

Ana-x6 fotoğrafı, küçülen sahne davranışı, primary ışığı, hilal birleşimi, header, alt menü ve orta düğme korunur. Hero üstündeki Sofrana bir başlangıç etiketi kaldırıldı; ana-1'in Ne pişirsem? ve Tarif, şef, video ara yapısı/konumu alındı. Yinelenen alt arama alanı kaldırıldı.

Bölüm sırası: Kategoriler → En son eklenen tarifler → Şefler → Elinde ne var? → Tarifini paylaş.

Kart, ana-1'in kullandığı ortak `card()` üretiminden gelir: görsel üstünde kaynak süre ve mevcutsa puan, kalın kategori, en çok iki satırlı başlık. Açıklama/alt başlık, zorluk/porsiyon/maliyet, rozet, şef/görüntülenme alt bilgileri çıkarıldı. Elinde ne var içindeki eşleşmeler de aynı kartı kullanır; malzeme seçme, gerçek eşleşme hesabı, temizleme ve listeye aktarım korunur.

En son eklenen tarifler, mevcut 32 tariflik yerel veri kümesinde `recipeInfo(r).dates[0]` değerini okuyan mevcut `recipeDate()` ile yeniden eskiye sıralanır; ilk altı gösterilir. Aynı tarihli kayıtlar kaynak sırasını korur. Bütün canlı kataloğun güncel son altı tarifi olduğu iddia edilmez. Tümü bağlantısı `sirala=en_yeni` taşır.

Şefler gerçek WEB.chefs kayıtlarıdır: Şahnur Ilıcalı, Göktürk Dizdar, Şahnur Sezek, Canan Yücel, Emel Aksu, Ece Özdenak. Doğrulanmış portre olmadığı için 40px nötr baş harf avatarı kullanılır; isim ve tarif sayıları kaynaktan gelir.

Menü logosu: mevcut `v3-app/assets/marka/dadagastro-renkli.svg`. Dosya değiştirilmeden kullanıldı, yer tutucu veya yeni logo üretilmedi. Header mevcut beyaz varyantı korur.

## Kaldırılanlar

- Ana sayfa akışındaki Dolapta Ne Var bölümü.
- Ana sayfa akışındaki Video Mutfağı bölümü.
- Önceki bağımsız Topluluğa Katıl içeriği, istenen kısa Tarifini paylaş CTA'sına dönüştürüldü.
- Hero etiketi, eski ikincil başlık ve kaydırma yönlendirmesi; yinelenen yapışkan arama alanı.

Orta menüdeki mevcut yöntemler ve diğer menü erişimleri korunur; bölümlerin bu sayfadan çıkarılması uygulama modüllerinin silinmesi değildir.

## Kontroller ve sınırlar

- Chromium + WebKit × 360/390/430: altı birleşim; JS/HTTP hatası ve yatay sayfa taşması yok.
- Header: 0–400px/20px, 126 ölçüm; görünür hero grubu/header kesişimi yok. Yukarı dönünce başlık geri gelir, reduced-motion kontrolü geçti.
- Menü aç/kapat, resmi logonun yüklenmesi, kategori/dünya mutfakları geçişi, Patates seçimi/gerçek eşleşme/temizle, CTA misafir kapısı doğrulandı. Gerçek hesap işlemi yapılmadı.
- Kart başlığı iki satır yüksekliği, kategori kalınlığı, kartta istenmeyen alanların yokluğu, şef avatarlarının 40×40 olması ölçüldü.
- Galeri 1440 ve390 genişlikte taşmıyor; iki iframe390×844, başlangıç scroll0. Kullanıcıya görünen açıklamalarda iç dosya/SET kodu yok.
- Uzun başlık kanıtında aynı tarifin gerçek tam kaynak başlığı yalnız test tarayıcısında karta yerleştirildi; veri veya uygulama başlığı değiştirilmedi. Görünür40px, içerik daha uzun; iki satır+ellipsis doğrulandı. Bu kontrollü stres örneğidir.
- İlk incelemede başlık grubunun padding kutusundan ölçülüp gizlenmesi düzeltildi. Kartların iki bölümde farklı boyutlara düşmesi ortak ölçüye alındı; miras kalan dekoratif çizgi kaldırıldı. Menü kanıtı250ms açılış hareketi tamamlandıktan sonra alındı.
- Tam boy ekran görüntülerindeki fixed alt menü ilk viewport konumunda kalır; uzun görüntüde alttaki başlığın bir kısmını örtmesi tarayıcının full-page yakalama davranışıdır. Sayfa kaydırıldığında bölüm okunur; galeri gerçek telefon görünümünü gösterir.
- Bütün fotoğraf/renk kombinasyonları için yeni bir piksel kontrast sertifikası veya tüm uygulama özelliklerinde kapsamlı parite iddiası yok.

Kanıtlar: `home-v3-qa.json`, `home-v3-gallery-qa.json`, `screenshots/home-v3/`, `screenshots/polish/home-v3/`.

## Yeni dosyalar

- `v3-app/ana-v3.html`
- `v3-app/ana-sayfa-v3.html`
- `v3-app/ana-sayfa-v3.css`
- `v3-app/ana-sayfa-v3.js`
- `v3-app/ana-v3-gallery.css`
- Bu rapor, `home-v3-qa.mjs`, iki JSON ölçüm raporu, koruma/dosya envanteri ve yukarıdaki ekran kanıtları.

V3 bu çalışma alanındaki mevcut ortak kaynakları kullanır; tek başına bağımsız dağıtım paketi değildir. Yayın üretilmedi. Revize sonunda duruldu.
