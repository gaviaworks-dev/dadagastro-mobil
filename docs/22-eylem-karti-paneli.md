# Eylem kartlı panel

## Değişiklikler
- Tarif bul: ortak sheet içinde üç eşit eylem kartı. Seçenekler, açıklama ve Pro rozeti tek ızgarada; ayraç yerine12px boşluk.
- Aynı kart: paylaş kanalları, tarif/taslak işlemleri, giriş seçenekleri, Tabaktan Tarif hata seçenekleri. Mevcut eylem hedefleri korunur.
- Sepet kök nedeni: bölüm başlığı düzenleyicisi metinsiz ikon butonunu boş kapsayıcı sanıp siliyordu. Temizlik yalnız gerçekten boş div’lerle sınırlandı.
- Alt çubuk kök nedeni: opaklık yalnız yuvarlak kartın içindeydi; dış köşe ve yan boşluklar alttaki metni gösteriyordu. Opak yüzey ekranın iki kenarına ve safe-area sonuna uzatıldı.

## Kaynak metin
`resources/views/bugun-ne-pisirsem/index.blade.php:50` hero lead; `resources/views/home.blade.php:71` findbar description. Panel adı kaynak “Tarif bul — elindekiyle” başlığının kısaltması. Tabaktan açıklaması kullanıcı onaylı metindir.

## Ölçüm
360/390/430px; misafir/üye/Pro: üç kartın her biri80px, ikon44×44px. İkon sol x37px, metin x93px; üç satırda eşit. Kart iç boşluğu16px, satır arası12px. 72px yerine80px:44px ikon+32px iç boşluk+kenarlığın sıkışmadan sığması için.

Kök ekran/regresyon: üç genişlikte yatay taşma0, JavaScript hatası0; header davranışı korunuyor. Sepet tıklaması giriş sheet’ini açar. Alternatif, porsiyon ve fotoğraf taslağı eylemleri korunur. Önce/sonra3×: `screenshots/polish/action-panel-{once,sonra}-{360,390,430}-3x.png`; sepet `ingredient-heading-*`; alt çubuk `detail-dock-*`, `dock-opaque-*`.
