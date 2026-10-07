# Açık sorular ve doğrulama sınırı

Bu sorular prototipi engellemez; belirsiz davranışlar gerçek backend desteği varmış gibi sunulmaz.

1. **Hedef backend sürümü:** verilen Laravel repo ile canlı kaydet route'ları farklı. Flutter hangi dal/sürümün sözleşmesine bağlanacak?
2. **Günün tarifi:** mobil seçim mevcut DailyRecipeService ile mi birebir paylaşılacak? Prototipte canlı `.dayband` bağlantısından doğrulanan **Sardalya Izgara | Limon Kekikli** kullanıldı; 7 Ekim anlık görüntüsüdür, kendiliğinden günlük güncellenmez.
3. **Kaydet/giriş:** gerçek uygulamada misafir kaydetme sonrası giriş ve niyete dönüş akışı nasıl olacak? Prototip kaydı yalnız bu tarayıcıda.
4. **Puan/sıralama:** yerel örnek veride eksik puan “henüz puan yok” olur; yeni/en çok puanlanan sırası için gerçek yayın tarihi ve puan sayısı API'ye taşınmalı.
5. **Porsiyon:** web 0.5×/1×/1.5× kullanıyor; tek sayılı porsiyonlarda gösterilen yuvarlamanın mobilde nasıl korunacağı ve adet/dilim birimleri onaylanmalı. Prototip katsayıyı ayrıca gösterir.
6. **Görsel/font:** prototip kaynak sitedeki varlıkları kullanır; offline destek ve Flutter font lisansı/paketleme koşulları bu tur doğrulanmadı.
7. **Sticky CTA:** üç ekran kapsamı gereği Pişirmeye Başla adımlara götürür. Ayrı tam ekran akış “sonra”.

## Tasarım kararı

Görsel dil aynen kaynak aileden: tomato `#E14827`, primary `#C43D20`, ink `#211E16`, muted `#6F6F6F`, paper `#FFFFFF`, bg `#F9F9F9`; Gilroy Medium + kaynakta kullanılan GilroyBd/XB/Lt. Yeni font/renk yok. İmza: fotoğraf ağırlıklı tarif kartı ve yükseltilmiş Ne Pişirsem düğmesi. Webin uzun üst alanı mobilde kısa arama + hızlı girişler ile daraltılır.

```text
Ana:     marka → arama → 2 hızlı giriş → kategori rayı → günün tarifi → keşif
Liste:   başlık → sticky arama → chip rayı → sonuç/filtre → yatay tarif kartları
Detay:   geri/kaydet → hero → kimlik/özet → malzemeler → adımlar → yorumlar
```

Kaynakta sentetik başlık bold'u ile gerçek vurgu bold'u farklıdır; prototipte bu ayrım korunur. Araştırma belleğindeki eski DadaMentor yolları bu yeni repo için veri kaynağı olarak kullanılmadı; tüm uygulama bulguları verilen repo ve public site üzerinden doğrulandı.

## Kontrol kaydı

- Public canlı site yalnız okunarak incelendi: https://dadagastro.com/ ve https://dadagastro.com/tarif/tavuk-curry-hindistan-cevizli-hint-usulu .
- Laravel'de dosya yazımı, artisan, DB veya üretim eylemi yapılmadı.
- Referans canlı tarif detayında 390px viewport için document scrollWidth 390 ölçüldü; bu tek ölçüm sitenin bütün ekranlarına ilişkin kusursuzluk iddiası değildir.
- Yerel prototip: Chromium, 390×844, DPR 1. Üç ekranda document scrollWidth **390**, kayıtlı Gilroy yüzü yüklenmiş, görünür a/button hedeflerinde 44px altı **0**.
- Ana sayfa 15 farklı görsel URL'si: **15/15** yükleniyor. Yerel listede 9 gerçek tarif var; tüm kartlar kendi detay verisine gider.
- 30 dakika filtresi: **2** sonuç; eşleşmeyen arama: boş durum; temizle: **9** sonuç. Kaydet → yeniden yükle: `aria-pressed=true`.
- Tavuk Curry 4→6 porsiyon: ilk malzeme **500→750 g**; checkbox işaretleniyor. CTA adımlar bölümüne kaydırıyor (sticky üst alanın altında).
- Karides tarifinde **1** gerçek yorum; Tavuk Curry'de **0** yorum. Puan sayısı yorum sayısı yerine kullanılmıyor.
- Sheet Escape ile kapanıyor; geri linki listeye dönüyor; yükleme inceleme durumunda **4** iskelet. JS konsolunda çalışma hatası **0**. `node --check app.js` geçti.
- Önizlemedeki üç iframe'in her biri ölçülmüş **390×844**. 320px ek kontrolde liste scrollWidth **320**.
- Görsel kanıtlar: `index-390.png`, `tarifler-390.png`, `tarif-detay-390.png`, `filtre-390.png`, `onizleme-1440.png` (bu docs klasöründe).
- Safe-area CSS ile ayrıldı; fiziksel iPhone/Android cihaz testi yapılmadı. Görseller public canlı URL'lere bağımlı; çevrimdışı görsel paketi yok.

## İçerik kanıtı

Bütün tarif kaynak URL'leri, tam başlıklar, adımlar, gerçek miktarlar ve yorumlar `app.js` içindeki DATA anlık görüntüsündedir. Günün tarifi: https://dadagastro.com/tarif/sardalya-izgara-limon-kekikli . Örnek yorumlu tarif: https://dadagastro.com/tarif/yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi . Püf kartları ve kategori görselleri ana sayfadan alındı. Kaynak sitede değişiklik olursa bu statik içerik otomatik yenilenmez.

## Çalıştırma

Proje kökünde `python3 -m http.server 8765 --bind 127.0.0.1`; ardından `http://127.0.0.1:8765/onizleme.html`. Bağımlılık kurulumu veya build gerekmez. Uygulama kodu yalnız HTML/CSS/vanilla JS; browser kontrolünde kullanılan Playwright uygulama bağımlılığı değildir.

