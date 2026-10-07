# Yayın önbelleği

Dört yayın HTML sayfasındaki tokens.css, app.css, app.js ve yerel Font Awesome CSS adreslerine son çıktı dosyasının SHA-256 ilk 12 karakteri eklenir. Değişmeyen dosya aynı adresi korur; değişen içerik yeni adres alır. HTML no-cache/no-store/must-revalidate, Pragma ve Expires meta içerir. Bunlar sunucu başlığı değildir; esas çözüm sürümlü varlıklardır.

Tabaktan Tarif eylem kartı zaten gerçek göreli href içeriyordu; JavaScript navigasyonuna çevrilmedi. Ana menü, logo, tarif kartları, detay geri ve kamera kapat bağlantıları da href kullanıyor. JS yalnız boş/kapsam dışı href'leri Yakında ile durduruyor.

WebKit 390 ve 430: satırın sol/orta/sağ noktalarına tap ile 6/6 başarılı kamera geçişi. elementFromPoint doğrudan aynı bağlantıyı gösteriyor; engelleyici katman yok. JavaScript kapalı bağımsız bağlantı testi de hedef URL'ye geçti. Konsol/HTTP hatası sıfır. Kanıt: cache-local-qa.json ve screenshots/cache.
