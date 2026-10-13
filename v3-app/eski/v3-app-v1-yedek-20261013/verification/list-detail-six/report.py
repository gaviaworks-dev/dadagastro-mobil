from pathlib import Path
import json
p=Path('v3-app/docs/38-liste-detay-arastirmasi.md');s=p.read_text().split('\n## Doğrulanan özellik paritesi')[0]
s=s.replace('başlıklı yatay raflarda keşfet','iki sıralı yatay rafta keşfet')
s+='''
## Doğrulanan özellik paritesi

V: Tavuk Curry ekranında mevcut; ilgili eylem tarayıcıda sınandı (statik bilgi satırları kaynak DOM/veri ile karşılaştırıldı).
K: Tavuk Curry kaynağında yok; ortak özellik korunuyor ve gerçek Sagdana verisiyle altı alternatifte sınandı.
K0: Tavuk Curry verisinde yok; kaynak koşullu dalı korunuyor, bu tur o içerikle çalıştırılmadı. Başarı diye sayılmaz.
Z: docs/08'de zaten ZAYIF olan, örnek veri bulunmayan dal; gerçek içerikle doğrulanmadı.
Üye eylemleri yerel önizlemedir. Sunucu kaydı, gerçek yorum gönderimi veya sosyal paylaşım yapılmadı.

| docs/08 özelliği | D1 | D2 | D3 | D4 | D5 | D6 |
|---|---|---|---|---|---|---|
'''
ks=['Alternatif göstergesi','Alternatif kaynak notları','Alternatifle değiştir','Değişikliği geri al','Bilinen alternatif miktarını ölçekle','Porsiyon başına besin değerleri','Sekiz besin alanı','Makro oranları','Tahmin açıklaması','Puan filtreleri','Yorum beğen','Yorum yanıtla','Yorum bildir','Kendi yorumunu düzenle','Kendi yorumunu sil']
for line in Path('docs/08-ozellik-paritesi.md').read_text().splitlines():
 if not line.startswith('| Tarif Detay |'):continue
 cols=[c.strip() for c in line.split('|')];feature=cols[2]
 status='Z' if cols[-2]=='ZAYIF' else 'K' if feature in ks else 'K0' if feature in ['Fırın sıcaklığı (veri varsa)','Püf noktası'] else 'V'
 s+='| '+feature+' | '+' | '.join([status]*6)+' |\n'
s+='''
Tavuk Curry: 9 malzeme, 4 adım, 55 dakika, 4 kişilik; porsiyon artırınca6 kişi ve ilk malzeme750g. Kaynaktaki Hatırlatma bölümü korunur; ayrıca Püf Noktası başlıklı metin uydurulmaz. Besin tablosu, alternatif malzemeler ve mevcut yorum satırları bu tarifte yok. Sagdana'da gerçek alternatif120g→180g ölçeklendi, geri alma çalıştı;8 besin alanı, makrolar, tahmin açıklaması, yorum filtresi/yanıt/bildirim ve sahip düzenle/sil yerel durumları doğrulandı. Her altı galeri ekranı yine Tavuk Curry açar.

D3: Malzemeler, Yapılış, Hakkında panelleri aynı kaynak düğümlerini taşır; saklanan bilgi silinmez. Yorumlar, şef ve benzer tarifler sekmelerin altında ortaktır. Klavyede sağ/sol/Home/End çalışır. D4:4 adımlı yatay rafta önceki/sonraki ve kaydırma; her adımın kendi zamanlayıcısı ve tamamla eylemi korunur. Tam ekran pişirme modu ayrıca erişilebilir.

## Tarayıcı kanıtı ve sınırlar
- `verification/list-detail-six/qa.json`:12 ekran ×360/390/430 =36 tam boy görüntü;756 header ölçümü (0–400px/20). JS hatası ve yatay sayfa taşması yok; ham null/undefined/NaN görünmedi. L5'in yatay rafında viewport dışında kalan görseller lazy-load olduğu için ilk ölçümde boş görülebilir; görünen kartlar ve kaydırma ayrı sınandı.
- `interactions.json`: arama/temizle/boş durum, kategori,150 filtre seçeneği, sıralama, görünüm, son sayfa; detay açıklama/porsiyon/malzeme/ölçü/alışveriş/timer/pişirme/galeri/paylaş/yazdır/kaydet/takip/yorum formu. İlk L5 mutfak kontrolünde test seçicisi yanlış yazılmıştı; `supplemental.json` doğru görünür düğme ile tekrar: Türk Mutfağı11 sonuç, temizlenince32.
- `supplemental.json`: altı listede süre sırası gerçekten artan;12 ekranda WebKit390 genişlik ve JS kontrolü; alternatif içi bağlantılar eski dosyalara kaçmıyor. Reduced-motion kaynakta metin eşiğinde tek adımda solid olur; normal harekette48px içinde kademeli. `final-interactions.json`: detayların600px reduced-motion alfa1, gerçek tarayıcı panosuna tarif URL'si kopyalandı, yorum fotoğrafı seçme/çıkarma yerel formda çalıştı.
- `conditional.json`:6 detayda gerçek Sagdana ile koşullu özellikler. Sosyal kanallar yalnız görünürlük/bağlantı kontrolü; dışarı gönderim yapılmadı. Yazdır testinde sistem yazdırması yakalandı, kağıt çıktısı üretilmedi.
- Liste1: banner top0 ve başlık koordinatı0/120/300/600 kaydırmada sabit. Panel yukarı ilerliyor;300px'de sticky araçların üstü68px header altıyla aynı, radius0; başlangıç24px.360/390/430 ölçüldü. Flutter karşılığı SliverAppBar ve üstüne binen içerik/sliver yüzeyi.
- Sayfalar tam ve aynı gerçek32 tarifle çalışır. L1 sayfada1 büyük+8 küçük; son sayfa1+4. Diğerleri8 kart; tek filtre sonucu oluşursa kart tam satıra yayılır. Kart eksiltilmez/çoğaltılmaz. L5 yatay iki sıralı raf kendi içinde kayar.
- `gallery.json`: iki galeride12 iframe390×844 ve scroll0.1440px3 sütun,1000px2,600px1; taşma yok.1440 tam boy galeri görüntüleri görüldü.
- `protected-result.json`: başlangıç dosyalarından yalnız eski iki galeri yönlendirmesi ve ana galeriye istenen iki bağlantı değişti. Ana sayfa27 kaynakları, kök, yayin, Laravel değişmedi. Git add/commit/push yok. Önceden kirli olan kök/docs dosyaları korunur.
- Kontrast için yeni bütün piksel/renk kombinasyonlarına kapsamlı başarı iddiası yok; kaynak renk ve overlay ailesi korunup verilen genişliklerde görüntüler incelendi.

## Görüntüye bakarak ikinci tur
- L1: referans korunuyor; sabit kapak üstünde panelin köşesi yapışınca düzleşti.9 kartın1+8 kompozisyonu yetim satırı giderdi.
- L2:360'da kategori fotoğrafı ve yazısı aynı44px dokunma ailesinde; iki kart ilk ekranda görülebiliyor. En dengeli keşif yoğunluğu.
- L3: fotoğraf güçlü, fakat sekiz tarif için daha çok dikey kaydırma gerekiyor; kart başlığı büyük fotoğrafa göre güçlendirildi.
- L4:120px fotoğraflı satırda süre/puan tek dikey meta ve metin alanı ayrıldı;360'da uzun başlıklar iki satırda kesiliyor, meta korunuyor.
- L5: ilk rafın bir sonraki kolonu görünür; tek dikey akış isteyenler için görünüm düğmesi var. Boş filtre nesnesi sonrasında mutfak seçeneklerinin güvenli çalışması düzeltildi.
- L6: büyük+ikili ritim korunuyor; son tek kart tam genişlikte. Süre seçiminin boş filtre durumu düzeltildi.
- D1: referans görseli aynen; kaynak dar ekranda gövde metni satır sayısına göre justify davranışını koruyor.
- D2: fotoğraf iştah açıcı ve bütün, başlık beyaz zeminde net. Taşınan puan/maliyet metninin beyaz rengi ve text-shadow'u düzeltildi.
- D3: kapak ve tek işe odaklanan içerik sekmeleri ayrışıyor; varsayılan tam boy görüntü yalnız Malzemeler'i gösterir. Diğer iki durum da ayrı görüntülendi.
- D4: ilk denemede kapak referansa fazla benziyordu; başlık sol üstte iki satıra, fotoğraf sağdaki sahneye taşındı. Uzun alt başlık360'da sarılıyor. Adım kartları sırayla okunuyor.
- D5: porsiyon eksi/artı ikonları açık zeminde soluk kalmıştı, primary koyu renk düzeltildi. Fotoğraf kartı ile açık hazırlık yüzeyi aynı kart ailesinde.
- D6: ilk denemede üstteki yazı yüzünden yemek kararıyordu; başlık beyaz panele, üçlü özet fotoğrafın altına taşındı. Adımlar ilk içerik oldu; malzemelere yapışkan kısayol var.
- D2/4/5/6 özel maske katmanlarında kaynak detay primary ışığı (%25 /65 sönüm/screen) tekrar eklendi; son görüntüler yenilendi.

## Öneri ve sıralama
Liste: **L2 > L1 > L6 > L4 > L3 > L5**. L2 fotoğraf, sonuç yoğunluğu ve kategori erişimini dengeler; L1 onaylı referansın en düşük değişiklikli devamıdır. L6 daha editoryal, L4 karşılaştırma odaklı; L3 uzun akış, L5 yatay iki sıra nedeniyle daha fazla keşif hareketi ister.

Detay: **D2 > D1 > D6 > D5 > D3 > D4**. D2 tabağı net bırakıp başlığı ve bölüm erişimini rahatlatır. D1 kanıtlanmış referanstır. D6 pişirmeye geçmek isteyen için, D5 hazırlık ve alışveriş için iyi; D3 sekmeli odağı, D4 adım rafı ise daha belirgin bir etkileşim tercihi gerektirir.

Önerilen çift: **Liste2 + Detay2**. Nihai seçimi kullanıcı yapar; kök/canlıya yerleştirme bu turda yapılmadı.

## Sunum dosyaları
- [Liste galerisi](../liste-alti.html) · [Detay galerisi](../detay-alti.html)
- [Liste: canlı + altı ilk ekran](../verification/list-detail-six/liste-reference-six.png)
- [Detay: canlı + altı ilk ekran](../verification/list-detail-six/detay-reference-six.png)
- [Liste altı ekran](../verification/list-detail-six/liste-six-strip.png) · [Detay altı ekran](../verification/list-detail-six/detay-six-strip.png)
- `review-liste-N.png` ve `review-detay-N.png`:her alternatifin360/390/430 tam boy görüntüsü yan yana.
- Eski iki galeri `eski/liste-detay-onceki/` içinde; eski URL'ler yeni galeriye yönlenir.
'''
p.write_text(s)
