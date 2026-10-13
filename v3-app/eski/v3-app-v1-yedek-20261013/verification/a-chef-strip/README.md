# Şefler — gerçek veriyle avatar şeridi

A, A uzun, A orta ve A kısa aynı a-chefs.js / a-chefs.css bileşenini kullanır. Başka ana sayfa bölümü ve B–F değiştirilmedi.

Veri: mevcut WEB.chefs ana sayfa veri seti ve kullanıcı tarafından verilen altı kayıt: Şahnur Ilıcalı 171, Göktürk Dizdar 171, Şahnur Sezek 171, Canan Yücel 140, Emel Aksu 137, Ece Özdenak 97. Salt okunur Laravel resources/views/home.blade.php:578–619 incelendi: avatarUrl yoksa ilk harf, tarif sayısı, takip eylemi ve Sen de Şef Ol çağrısı. Bu altı kaydın doğrulanmış gerçek avatarı mevcut kaynakta bulunmadığından stok fotoğraf yerine baş harf kullanıldı.

Önceki demo şefler aktif discovery-data.js verisinden çıkarıldı; dört stok portre dosyası silindi. Genel aramanın Şefler verisi de artık aynı altı kayıttır. Önceki doğrulama görüntüleri yalnız tarihsel kanıttır; güncel sunumdaki Şefler seçenekleri yeni görsellerle değiştirildi.

Koyu ve açık zemin: ana-a.html / ana-a.html?sef-zemin=acik. Önerilen ve varsayılan koyu: sayfada ayırıcı karakter daha belirgin, açık primary avatarlar daha iyi ayrışıyor. İki kurgu dark-light.png içinde yan yana.

Ölçüler: avatar 72×72, radius %50; kart kontrol radius'u mevcut token, takip hedefi44px. Şerit yaklaşık3,5 öğe gösterir. Davet kartı diğer öğelerle eşit194,19px. İnce primary halka ve primary açık zemin kullanılır.

15 görünüm doğrulandı: 4 A varyasyonu × 360/390/430 koyu, ayrıca A × 360/390/430 açık. İsim ve sayılar birebir kontrol edildi; avatar geometrisi doğru; ad ve sayfa taşması0; gerçek scrollLeft değişimiyle kaydırma doğrulandı. Üç genişlikte ilk/son şerit görüntülerine bakıldı. Varyasyonlarda isimler, sayılar ve ölçüler aynı; PNG dosyaları piksel düzeyinde birebir eşit değil. Üç varyasyonun 390px görüntüleri ayrıca görsel olarak incelendi; final.json.

Takip ve Sen de Şef Ol yerel önizleme/giriş açıklaması açar; gerçek işlem yapılmaz. Galeri güncellendi,9 çerçeve390×844/scroll0. Git add/commit/push yapılmadı. Yalnız v3-app yazıldı.
