# Akışkan cihaz matrisi — 7 Ekim 2026

## Kök neden ve değişiklik
Eski CSS'te 14 adet `390px` vardı: 12'si uygulama/fixed katman sınırı, ikisi yalnız geliştirici iframe'i. Yüksek özgüllüklü ana sayfa header seçicisi yayın CSS'indeki genel mobil kuralı eziyordu; native cooking dialog da aynı sabit sınırı taşıyordu. Uygulamadaki 12 sınır tek `--app-max:480px` değişkenine bağlandı. Önizleme iframe'leri değiştirilmedi. JS'teki 390/844 eşleşmeleri ekran geometrisi değil kaynak veri/görsel adlarıdır.

Tüm kabuk katmanları mobilde %100, masaüstünde aynı 480px sınırındadır. Carousel genişliği kabuk oranına bağlıdır. Tam ekran dialog 100dvh, opak beyaz ve scroll kilitlidir; safe-area korunur. Pişirme metni sola yaslı, zamanlayıcı 16px altında; dokunma odağı gizlenir, klavye odağı korunur. Kısa paragraflar sola, dört ve üzeri render satırı justify olur.

Header eşiği ilk metin geometrisinden hesaplanır. Solid header altında yarım satır kalmaması için metin header'a 8px kala bütün olarak gizlenir, geri kaydırınca görünür. İlk WebKit turundaki smooth-scroll gecikmesi ikinci turda bu güvenlik aralığıyla giderildi.

## Son ölçümler
Chromium ve WebKit motorları; fiziksel iPhone testi değildir. Safe-area gerçek çentik donanımında burada ölçülmedi. Yerel yayın paketi test edildi.

| Görünüm | Motorlar | Header / dock / CTA | Filtre / giriş genişliği | Pişirme genişlik × yükseklik | Yatay taşma | Şeffaf header altında metin |
|---|---|---|---|---|---|---|
| 320×667 | Chromium + WebKit | 320px | 320px | 320×667px | 0px | 0 |
| 360×740 | Chromium + WebKit | 360px | 360px | 360×740px | 0px | 0 |
| 375×812 | Chromium + WebKit | 375px | 375px | 375×812px | 0px | 0 |
| 390×844 | Chromium + WebKit | 390px | 390px | 390×844px | 0px | 0 |
| 393×852 | Chromium + WebKit | 393px | 393px | 393×852px | 0px | 0 |
| 412×915 | Chromium + WebKit | 412px | 412px | 412×915px | 0px | 0 |
| 430×932 | Chromium + WebKit | 430px | 430px | 430×932px | 0px | 0 |

21 ekran × 21 scroll konumu × 2 motor = **882 ölçüm**; 0–400px arası 20px adımlar. Hatalı görünür metin kesişimi 0, JavaScript hatası 0. Header üstte `rgba(225,72,39,0)`, aşağıda `rgb(225,72,39)`; bütün ekranlarda aynı. WebKit alt piksel yuvarlaması bazı dialog yüksekliklerinde 0.016px'dir.

Arama paneli ek testleri 320/360/390/430 ve 1440px: banner metni–panel arası **24px**, ikon/input/temizle dış odak çerçevesinin içinde. Masaüstü uygulama/header **480px**. Pişirme görünüm yüksekliği 932→740→667→932 değişimlerinde dialog aynı yüksekliğe uydu; arka sayfa overflow:hidden, metin sola, zamanlayıcı boşluğu16px.

## Görsel kontrol ve ikinci tur
320 ve 430 için her iki motorun üç ekranı, filtre, giriş ve pişirme görüntüleri incelendi. 320'de liste sayaçları sütun içinde kırılır; bilgi silinmez ve arama alanına değmez. Dar ekran kategori başlıkları dengeli kırılır. 430 pişirme modunda içerik ortalanır, zamanlayıcı metinden kopmaz, alt eylemler başparmak alanında kalır. Üç ekranın header/sheet kenarlarında arka sayfa şeridi yok.

- [320 WebKit ana sayfa](screenshots/cihaz-matrisi/webkit-320-index.html.png)
- [430 WebKit ana sayfa](screenshots/cihaz-matrisi/webkit-430-index.html.png)
- [320 pişirme](screenshots/cihaz-matrisi/webkit-320-pisirme.png)
- [430 pişirme](screenshots/cihaz-matrisi/webkit-430-pisirme.png)
- [Ham matris](cihaz-matrisi.json), [arama/yükseklik ek ölçümleri](cihaz-ek-kontroller.json).

## Kapsam sınırı
Fotoğraftan Tarif yerel taslağı korunur; bu commit ve yayında yoktur. Sonradan kuyruğa gelen overlay, koyu bölüm fotoğrafları, özellik paritesi ve tipografi revizyonları bu akışkanlık düzeltmesine karıştırılmadı. Bunlar tamamlandı diye raporlanmaz.
