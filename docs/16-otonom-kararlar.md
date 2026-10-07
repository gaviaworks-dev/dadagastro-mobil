# Otonom kararlar

## Çalışma sınırı
Beş iş sırayla; Git ve yayin değişmez. Her iş öncesi v6–v10 kaynak/asset/Markdown yedeği alınır; geçmiş ekran görüntüleri zaten docs altında korunur.

## 1 — Overlay
- Aynı sekiz duraklı eğri, metnin konumuna uyarlanır. Bütün fotoğraflara aynı piksel eşiği uygulanmaz: okunurluk için koyu bölge ilk metinden önce tamamlanır. Başlangıç hedefi %35; ana sayfada metin daha yukarıdaysa geçiş alanı yukarı genişletilir. Kaynak koyu renk korunur.
- Ham fotoğraf parlaklığı doku nedeniyle doğal sıçrar; bu yüzden gerçek piksel sütunuyla birlikte düz beyaz test zemininde yalnız overlay etkisi de ölçülür. Fotoğraf dokusunun değişimi gradient bandı diye raporlanmaz.

## 1a — Ana hero geri dönüş düzeltmesi
Ana sayfa için ortak metin başlangıcı parametresi ve uzun üst geçiş kullanıldı; etiket öncesi64%, etiket hizasında94% kaynak koyu taban. Detay/liste doğru bulunan eğrisi değiştirilmedi. Vurgulu kelimenin kontrastı için yüksek opaklık yalnız metin bölgesinde; üst fotoğraf temiz.

## 2 — Koyu bölüm kaynakları
- Topluluğa Katıl için kullanıcının fotoğraf varsayımı kaynakla uyuşmuyor: home.blade.php:622–635 ve canlı .community beyaz; arka plan fotoğrafı yok. Yeni görsel uydurmak yerine beyaz zemine dönüldü.
- Guide ve Pro görselleri kendi kaynaklarından alındı; source overlay renk/durakları birebir korundu. Ek ışımaya ihtiyaç yok, kaynak görüntü dokusu yeterli.
- Başlıktaki br etiketi metin kopyasında debir birleşmesine yol açıyordu; boşluklu doğal başlığa çevrildi.

## 3 — Özellik paritesi
- docs/08 mevcut ağaçta yoktu; tablo sıfırdan kuruldu.
- Porsiyon 0.5/1/1.5 sınırı resources/js/ui.js:358–392 ile aynı; ilk şüphe kaynakla çürütüldü, sınır korunuyor.
- Alternatif değiştir/geri al kullanıcı tarafından açıkça onaylandı. Kaynak düz metin; yalnız “aynı miktar”/1:1 açık yazılıysa sayısal eşdeğer gösterilir. Bilinmeyen oran uydurulmaz; ölçü kontrol uyarısı ve kaynak notu korunur.
- Menüye ekle/tarifin kendisini bildir eylemi incelenen web detayında yok; yorum bildir ayrı var. Bu eylemler normal tarife eklenmedi.
- Yorum sahibinin Düzenle/Sil akışı ?rol=yorum-sahibi ile açık önizleme durumudur; canlı üyelik taklit edilerek veri yazılmaz.
- Backend isteyen eylemler giriş kapısı/form/yerel geri bildirimle tasarlanır; gerçek sunucu kaydı tamamlandı iddiası yok.

## 3a — Sticky panel
Normal akış ankrajı ile yapışma hesaplandı; üst köşeler yalnız yapışınca 0 olur. 360/390/430 genişlikte 0/200/400/800 konumları: yapışmış panel-header boşluğu 0px, zemin opak beyaz, taşma 0. Önceki CSS top değerine eklenen 8px ve sahte üst şerit kaldırıldı. Kanıt: docs/sticky-sonra.json ve polish/sticky-sonra-* kırpımları.

## 3b — Dolapta Ne Var / chip
Kaynak home.blade.php:64–84 ve tarif-bulucu/index.blade.php: gerçek malzeme seçim mantığı korunur. Widget seçimi mevcut 32 tarifin yerel filtresine bağlandı. +1777 web sayacı korunur; açılan panel bütün backend havuzunu taklit etmez, mevcut veri seti malzemelerini açıkça belirtir. Tam1780 malzeme entegrasyonu backend bağlantısında tamamlanacaktır. Chip12px/44px/padding12px/gap8px. Üç genişlik kanıtı docs/chip-sonra.json.

## 3c — Tarif etkileşim çubuğu
Kaynak _actbar.blade.php ve resources/js/ui.js: tek POST toggle, ek fotoğraf/not adımı yok. Yerel önizleme aynı durumu tüm kısayollara dağıtır; sayılar kaynak madeCount/clapCount. Yorumlara erişim webdeki gibi misafire de açık, veri yazan iki eylem giriş gerektirir. Pişirme kapanışında kullanıcı tarafından ayrıca istenen Ben de Yaptım bulunur. 360–430 taşma0; dokunma44, sayaçlar eşzamanlı.

## 3d — Ana menü
Canlı #drawer ile yerel mobile-drawer.blade.php üye menüleri farklı. Son kontrol canlı HTMLde Modüllerim/Gelişimim/Hesabım gruplarını doğruladı; canlı kazandı. Görüş Bildir webde var; eski yüzen sekme yasağı korunur, yalnız menü satırı vardır. Canlıda Dada dünyaları/sosyal bağlantı yok; eklenmedi. Sabit alt dilTR/EN, 48px satır, düz sol kenar seçildi. Gerçek üye adı yerine açık Üye önizlemesi kullanılır.

## 4 — Tipografi kanonu
12 rol için boyut/ağırlık/satır/tracking tokenları eklendi. Kaynakta Regular/Semibold dosyası yok (Medium ve ExtraBold var); Medium500, başlıklarda mevcut bold700 kullanıldı. Yeni font ya da sahte semibold dosyası üretilmedi. 390 görünür rol ölçümlerinde her rol tek boyut/ağırlıkta: docs/type-sonra.json. Bir ekran içindeki tüm semantik roller korunur; dört boyut hedefi için bilgi alanı gizlenmez.

## 5 — Tabaktan Tarif (Pro)
- Kaynak Pro gate rozeti domates/tint; altın renkli pazarlama rozeti yerine bu gerçek kaynak seçildi. Radius mobil kontrol tokenına uyar.
- Örnek taslak Patates Mücveri: gerçek veri, alternatif ve besin içerdiği için bütün akış gösterilebilir. Yapay zekâ yeni tarif metni üretmez; fotoğraf/tanıma/çıktı simülasyon.
- Gerçek kullanıcı adı bilinmediğinden “Üye önizlemesi”; sahte kişi yaratılmaz. Kaydet yerel cihaz kaydıdır; başvuru backend'e gönderilmez.
- Kaynak formun ID taxonomy seçicileri yerine prototipte adlar kullanılır. Püf noktası/etiket talimatta var ancak collectPayload içinde bağımsız alan yok; backend eşleştirmesi karar bekliyor.
- Özel taslakta abonelere-özel yayın anahtarı gösterilmez: taslak zaten yalnız sahibine özeldir. Yayın görünürlüğü editör sürecinde netleştirilmeli.
- Pro deneme3 hakkı kullanıcı talimatındaki örnek senaryodur; gerçek paket kotası/fiyatı çıkarılmadı.
- İlk görsel kontrolden sonra kaynak hazırlık/pişirme ayrımı ve çoklu kategori korunacak şekilde düzenleme formu iyileştirildi; yanlış varsayılan0/45 yerine kaynak20/25 kullanıldı.
