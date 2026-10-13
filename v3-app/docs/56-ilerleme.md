# 56 — İlerleme

docs/52'deki 72 satır. Durum: **bekliyor / yapılıyor / bitti / kapsam dışı / kök** (kök = tasarım kökü, bağlantılar `ortak/dg-baglanti.js` ile kuruldu).
Dosyalar `v3-app/` altına göredir. Her sayfa bitince ajan kendi satırını günceller (yalnız kendi satırlarını, tek tek). Gruplar ve çizim dosyaları: `ortak/veri/sayfalar.js`.

## Ortak katman

| Parça | Durum | Dosya |
|---|---|---|
| Tek kök (tokens.json + üretici: CSS, köprü, JS, Dart) | bitti | `ortak/tokens.json`, `ortak/uret/uret.mjs` |
| Kök ekranlar token'lara bağlı + çelişki düzeltmeleri | bitti | `ortak/dg-kopru.css`, `ortak/dg-duzeltme.css` |
| Bileşen kütüphanesi + çekirdek | bitti | `ortak/dg-bilesen.css`, `ortak/dg-ui.js` |
| Bileşen kataloğu | bitti | `uygulama/bilesenler.html` (`ortak/sayfalar/temel.js`) |
| Kök ekran bağlantıları (alt menü, arama, giriş kapısı, alışveriş, menü) | bitti | `ortak/dg-baglanti.js` |
| Galeri (patron + iç) | bitti | `ekranlar.html`, `ekranlar-ic.html` |
| Veri ve canlı metinler | bitti | `ortak/veri/veri.js`, `ortak/veri/icerik.js` |
| Uygulama girişi, sıfırlama, manifest, ikon yer tutucusu | bitti (açılış zemini koyu taban #211E16, primary parlaması yok) | `uygulama/index.html`, `sifirla.html`, `manifest.webmanifest`, `ikon/` |
| Bayrak seçimi ortak bileşeni (Beyar: tercihler + liste filtresi aynı bileşen; ana-v3 Dünya Mutfakları dili) | bitti | `ortak/dg-bayrak.css`, `DG.bayrakSecim`; `liste-v2.js` Mutfak grubu; `acilis.js` tercihler |
| Ortak bileşen eklemeleri (§2a — yalnız yönetici yazar): video, püf, profil başı, makale, yorum, oynatıcı, eylemli satır, bildirim, puan, küçük foto, kanal tablosu, giriş duvarı, veri yok, seçim alanı (sheet), seçim kartı, sosyal giriş logoları | bitti | `ortak/dg-bilesen.css`, `ortak/dg-ui.js`, katalog `temel.js`, docs/51 |
| Galeri: giriş gerektiren sayfalar misafir + giriş yapılmış yan yana (§2b, `ikili`) | bitti | `ortak/galeri/galeri.js` |

## Kök ekranlar

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| R1 | Ana Sayfa | kök | `ana-v3.html` |
| R2 | Tarif Listesi | kök | `liste-v2.html` |
| R3 | Tarif Detay (+ pişirme modu, paylaş, alternatif) | kök | `detay-v2.html` |

## G7 · Açılış ve tanıtım — js: `acilis`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| O1 | Açılış (splash) · 3 alternatif (docs/57) | bitti (yeniden yapıldı, seçim bekliyor) | `uygulama/acilis.html` (1 · Sahne; uygulama girişi), `acilis-2.html` (2 · Kolaj), `acilis-3.html` (3 · Perde) |
| O2 | Karşılama (tek ekran) · 3 alternatif | bitti (yeniden yapıldı, seçim bekliyor) | `uygulama/karsilama.html` (1 · hikâye), `karsilama-2.html` (2 · bento), `karsilama-3.html` (3 · hero + modül seçici) |
| O3 | Tercihler (mutfak, beslenme + alerjen, beceri, kategori) · 3 alternatif | bitti (yeniden yapıldı, seçim bekliyor) | `uygulama/tercihler.html` (1 · adım adım), `tercihler-2.html` (2 · tek sayfa akordeon), `tercihler-3.html` (3 · koyu, soru başına ekran) |
| O4 | İzinler (bildirim, kamera) | bitti | `uygulama/izin-bildirim.html`, `uygulama/izin-kamera.html` |
| O5 | Giriş/kayıt mobil akışı | bitti (karşılama → tercihler; giriş G1) | `uygulama/karsilama.html` |

## G1 · Hesap — js: `hesap`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| H1 | Giriş | bitti | `uygulama/giris.html` |
| H2 | Kayıt | bitti | `uygulama/kayit.html` |
| H3 | Şifremi unuttum | bitti | `uygulama/sifremi-unuttum.html` |
| H4 | Yeni şifre | bitti | `uygulama/yeni-sifre.html` |
| H5 | E-posta doğrulama (+ E7) | bitti | `uygulama/eposta-dogrula.html` |
| H6 | İki adımlı doğrulama | bitti | `uygulama/iki-adim.html` |

## G1b · Profilim — js: `profil`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| H7 | Profilim | bitti | `uygulama/profil.html` |
| H8 | Profili düzenle | bitti | `uygulama/profil-duzenle.html` |
| H9 | Kaydettiklerim (+ koleksiyonlar) | bitti | `uygulama/kaydettiklerim.html` |
| H10 | Tariflerim | bitti (Tabaktan özel taslakları listelenmez: kökte ortak kayıt anahtarı yok) | `uygulama/tariflerim.html` |
| H11 | Tarif ekle / düzenle (4 adım) | bitti (görseller kaydedilmez; “AI ile İyileştir” yalnız repoda, eklenmedi) | `uygulama/tarif-ekle.html` |
| H12 | Alışveriş listesi (P1) | bitti (tarife göre gruplu; reyon verisi yok) | `uygulama/alisveris-listesi.html` |
| H13 | Rozetlerim (+ topluluk, sezon sıralaması) | bitti (kazanım/puan verisi yok → 0, “kazanılmadı”) | `uygulama/rozetlerim.html` |
| H14 | Menülerim | bitti | `uygulama/menulerim.html` |
| H15 | Haftalık Menü (Pro) | bitti (günlük kalori: veride kalori yok → gösterilmez) | `uygulama/menulerim.html?sekme=haftalik` |
| H16 | Pro ve Üyeliğim (paywall; ödeme yok) | bitti (#odemeler boş hal; duraklat/iptal karar bekliyor) | `uygulama/pro.html` |
| H17 | Şef abonelikleri | bitti (Şef üyelikleri: veri yok → canlı boş hal “Etkin şef üyeliğin yok”; takip edilen şefler `dg-takip`, çan `dg-ayar.zil`, takibi bırak + Geri al; `?ornek=1` gerçek şeflerle) | `uygulama/ayarlar.html?bolum=abonelikler` (G5) |

## G2 · Tarif bulma — js: `bul`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| N1 | Ne Pişirsem · sihirbaz + sonuç | bitti (4 adım canlı metinler, 220 ms otomatik ilerleme, `?adim=1..4\|sonuc`; “%X uygun” = öğün şart + süre 30 + zorluk 30 + öğün 40 + damak 10/tercih, yerel 32 tarif) | `uygulama/ne-pisirsem.html` (`ortak/sayfalar/bul.js`, `bul.css`) |
| N2 | Ne Pişirsem · Yemek Modu (Sıfırdan Kur, Hazır Menüler) | bitti (20 canlı mod; Sıfırdan Kur havuzu = yerel 32 tarif, 24/sayfa, Menü Tepsisi sheet'i ad ≤48 → `dg-menuler`; misafir → giriş kapısı; Hazır Menüler: veri yok, dürüst boş durum — doğrulanmadı) | `uygulama/ne-pisirsem.html?sekme=mod` |
| N3 | Menü düzenle | bitti (G1b) | `uygulama/menulerim.html?menu=…` (G1b ile) |
| N4 | Menüyü pişir | bitti (tam ekran; servis sırası, plan/adım/bitti, yukarı/aşağı taşı + sıfırla, kap başına sayaç, ekran açık; `?menu=<id>`, `?ornek=1` etiketli örnek, `?faz=`; menü yoksa boş durum) | `uygulama/menuyu-pisir.html` |
| D1 | Dolapta Ne Var (tam) | bitti (Dolaptakiler/Hariç; 8 akordeon 185 malzeme; Sevmiyorum/Tüketmiyorum (5 hızlı)/Alerjim Var (11)/Hassasiyetim Var (11, gösterme/uyar); süre+zorluk süzgeci çalışır, kalori/protein “veri yok”; sonuç “Tam eşleşme / N eksik”, sonuçta arama; `dg-dolap` cihazda; sesli giriş yalnız bildirim; Çiğ ürün, Histamin, Fruktoz eşleşmesi veri yok) | `uygulama/dolapta-ne-var.html` |
| T1 | Tabaktan Tarif (kökten taşındı; kanon uyarlaması) | bitti (görsel dil: header, kamera düğmeleri, kart 16 + alt başlık/meta gizli, chip, sekme 12/4/44, alt çubuk, Pro rozeti, hata başlığı, ok çifti; akış aynen. Kalan §4.2: kamera gradyanı eğrisi, taslak → detay-v2 yerleşimi, cm2, sheet iskeleti, `donus` regex — runtime'a dokunmadan yapılamaz) | `tabaktan-tarif.html` (+ `ortak/sayfalar/tabaktan.css`) |

## G3 · Tarif türevleri — js: `tarifler`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| G3-0 | Kategoriler ve dünya mutfakları dizini | bitti (canlıda ayrı sayfa yok, /kategoriler 404: ana sayfa catstrip etiket/başlık/lead + /tarifler sayaçları 6.112/34/50 → KUBBE banner; `DG.seg` Kategoriler/Dünya Mutfakları `?sekme=mutfak`; 34 kategori `.dgu-kat` gerçek fotoğraf + “N tarif” (Ana Yemek canlıda da görselsiz/0 → nötr zemin + ikon), 50 mutfak ortak bayrak ızgarası bağlantı olarak, canlı sıra; her öğe `liste-v2.html?kategori[]=`/`mutfak[]=`; dizinde arama canlıda yok → eklenmedi; iskelet gerçek yerleşimle) | `uygulama/kategoriler.html` (`ortak/sayfalar/tarifler.js`, `tarifler.css`) |
| G3-1 | Kategori | kök | `liste-v2.html?kategori[]=<slug>` |
| G3-2 | Dünya mutfağı | kök | `liste-v2.html?mutfak[]=<slug>` |
| G3-3 | Tema | kök | `liste-v2.html` (tema şeridi) |
| G3-4 | Koleksiyon | kapsam dışı (karar 10) | — |
| G3-5 | Günün Menüsü | kapsam dışı (karar 10) | — |
| G3-6 | Sezon | kapsam dışı (karar 10) | — |
| G3-7 | Derleme (SEO) | kapsam dışı (karar 10) | — |
| G3-8 | Günün Tarifi / öne çıkanlar | kök | `ana-v3.html` hero |

## G4 · İçerik ve topluluk — js: `icerik`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| V1 | Video Mutfağı | bitti (banner canlı sayaçları 33/4/6,3 Mn; Sıradaki = büyük + şerit `DG.video`; Dada Akış; Tüm videolar Tümü/Tarif/Teknik/Seri/Kısa süzgeci, 24/sayfa — tür verisi yok: Tarif/Teknik/Seri dürüst boş durum, Kısa = 1 dk altı; Haftanın Videosu ve Video Mutfağı Şefleri veri yok notu) | `uygulama/videolar.html` (`ortak/sayfalar/icerik.js`, `icerik.css`) |
| V2 | Video oynatıcı | bitti (`?no=`; `.dgu-oynatici`, oynat → canlı “Video kaynağı henüz eklenmedi”; süre, izlenme, paylaş sheet'i; sıradaki şeridi; Pro kilidi `?ornek=pro` etiketli örnek, canlı metin “Bu içerik Pro üyelere özel” + Belki sonra / Pro'ya Yükselt; şef/ilgili tarif/izlenme kaydı veri yok) | `uygulama/video.html` |
| V3 | Seriler / seri detayı | bitti — veri yok (prototip verisinde seri yok → bölüm çizilmez, §2c; canlıda 4 seri) | `uygulama/videolar.html` |
| V4 | Kısa video akışı | bitti — kısmi veri (Dada Akış şeridi verideki 3 kısa videoyla; dikey akış/beğeni verisi yok, çizilmez) | `uygulama/videolar.html` |
| P1 | Püf Noktaları | bitti (canlı sayaçlar 2.163/11/85.089 + 11 kategori çipi (yerel sayılar), En Yeni/En Çok Okunan `?sira=`, `?kategori=`, 12/sayfa, boş “Bu kategoride püf noktası bulunamadı” + Filtreyi Temizle; En Yeni: tarih verisi yok → kaynak sırası) | `uygulama/puf-noktalari.html` |
| P2 | Püf noktası detayı | bitti (kubbe banner “Mutfak Sırrı · kategori”; canlı künye: yazar/ünvan/tarih/Son güncelleme; canlıda tek paragraf olan metin soru cümlelerinden numaralı `DG.icerikBlok`'lara ayrıldı, blok başına paylaş, anlamlı kalın vurgular; “Okuyucunun Dikkatine” `DG.ipucu`; canlı etiketler; yorumlar ortak `DG.yorumBolumu` (canlı yazar, puan özeti, Püf Sahibi yanıtları); alt çubuk Yorumlar · Kaydet · Paylaş · Faydalı Buldum; “Bu püfün geçtiği tarifler”/“Bunlar da işine yarar” canlıda bu altı püfte yok → çizilmez) | `uygulama/puf.html` |
| P3 | Püf noktası ekle | bitti (misafir giriş duvarı + `?ornek=1` gerçek püfle dolu; Başlık 80 + sayaç, Kategori `DG.secAlan` (11), kapak ≤6 + yıldızla kapak, metin + kelime sayısı, blok ekle/taşı/sil, “Paylaşıma hazır” 3 kontrol + kart önizlemesi, Taslak kaydet `dg-puf-taslak`, Onaya gönder → “Püf noktan incelemeye gönderildi”; `?durum=hata-form`) | `uygulama/puf-ekle.html` |
| C1 | Şefler | bitti (canlı sayaçlar 1.055/6.112; isme göre ara + temizle, takipçiye göre sıra, 24/sayfa + Daha fazla; ortak `DG.sefKart` + `DG.sefOlKart` `.dgu-sef-izgara`; “+ Takip Et / Takiptesin” `dg-takip`, misafir → kapı) | `uygulama/sefler.html` |
| C2 | Şef profili | bitti (`?kullanici=` ya da `?ad=`; gülücük `DG.profilBas`, kapak = şefin ilk tarif fotoğrafı; Takip Et + Paylaş (canlı /sefler/<kullanici>) tek satır; sayaçlar Tarif/Takipçi/Üyelik yılı; Tarifleri; püf/takip/rozet/Topluluk Puanı verisi yok → çizilmez) | `uygulama/sef.html` |
| C3 | Liderlik | kapsam dışı (canlı 404; Rozetlerim içinde sezon sıralaması) | — |
| C4 | Onur Listesi | bitti (canlı metinler; canlıda boş → “Henüz kapanmış bir sezon yok” + Rozetlerim / Şefler) | `uygulama/onur-listesi.html` |

## G5 · Arama, bildirimler, ayarlar — js: `arama`, `ayarlar`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| S1 | Arama | bitti (tek alan + temizle + sonuç sayısı; DGVERI tarif/püf/şef/video/kategori, sekmeler yalnız sonucu olan türler; aksansız eşleşme; “Şunu mu demek istedin” (tarif/kategori/şef/malzeme sözlüğü); son aramalar yalnız üyede `dg-arama` ≤10 + sil/Temizle/Geri al; popüler `DGVERI.populer`; 200 ms gecikme. Canlıdaki “Mutfak Rehberi” sekmesi kapsam dışı; Videolar/Kategoriler sekmesi prototip arama kökünden) | `uygulama/arama.html` (`ortak/sayfalar/arama.js`, `arama.css`) |
| S2 | Bildirimler | bitti (canlı süzgeç Tümü/Tarif/Menü/Topluluk/Şef/Sistem + tarih sheet'i; Bugün/Dün/Daha Eski; tümünü okundu, tek okundu, tür kapat, sil + Geri al; misafir giriş duvarı; üyede bildirim verisi yok → canlı boş hal; `?ornek=1` gerçek tarif/şeflerle) | `uygulama/bildirimler.html` |
| S3 | Ayarlar (hesap ve ayarlar) | bitti (bölümler: bildirim 7×2 + kategoriler, görünürlük, güvenlik (şifre, 2FA kurulum sheet'i, oturumlar), dil ve bölge + birimler, verilerim (yerel JSON indir), dondur, sil (HESABIMI SİL); `dg-ayar`; canlı “Bağlı Uygulamalar” sekmesi yapılmadı — karar bekliyor) | `uygulama/ayarlar.html` (`ortak/sayfalar/ayarlar.js`, `ayarlar.css`) |
| S4 | Uygulama ayarları (dil, bildirim, titreşim, sıfırla) | bitti (dil `dadagastro-dil` kök menüyle ortak, titreşim, bildirim izni → izin-bildirim, push kategori anahtarları, önbellek, Uygulamayı sıfırla → sifirla.html, sürüm) | `uygulama/ayarlar.html?bolum=uygulama` |
| S5 | Çözüm Merkezi (destek + SSS) | bitti (SSS: canlı tohum 6 konu/24 soru, arama + konu çipleri + tek açık akordeon; Taleplerim 5 durum süzgeci, detay sheet'i, yanıt/kapat/yeniden aç; Yeni talep 8 konu, 3–160 / 10–5000 + sayaç, ödeme referansı koşullu, ek dosya; Öneri ve Şikâyet formu (telefon `data-telefon-bekliyor`); talepler `dg-destek`; “Konuya göre hızlı çözümler” bloğu yapılmadı) | `uygulama/destek.html` |
| S6 | Görüş bildir | bitti (5 konu, konuya göre alan seti birebir canlı panel, KVKK onayı, doğrulama, “Görüşün bize ulaştı”; emoji puan → yıldız `DG.puan`) | `uygulama/gorus-bildir.html` |

## G6 · Yasal, kurumsal, sistem — js: `yasal`, `sistem`

| # | Sayfa | Durum | Dosya |
|---|---|---|---|
| Y1 | Yasal metinler dizini | bitti (canlı 4 grup + gruplanmamış 3 metin “Diğer metinler”; başlıkta arama; KUBBE) | `uygulama/yasal.html` |
| Y2 | Yasal metin (26 metin, tek şablon) | bitti (sürüm + son güncelleme, ≥3 başlıkta İçindekiler + çapalar, önceki/sonraki dizin sırasıyla; yer tutucu satırlar gizli; Üyelik Sözleşmesi canlıda da yer tutucu; bilinmeyen slug → bulunamadı) | `uygulama/yasal-metin.html?slug=…` |
| Y3 | Hakkımızda | bitti (canlı metin, sayılar, değerler, yasal, köprü; editör ekibi/şirket bölümü canlıda yok → çizilmedi; KUBBE) | `uygulama/hakkimizda.html` |
| Y4 | SSS | G5'te (destek.html) | `uygulama/destek.html` (G5) |
| Y5 | İletişim | bitti (canlı alanlar birebir: 8 konu, DG.telefon, sayaç 0/1000, KVKK onayı, hata özeti; `?konu=`, `?talep=veri-silme`; gönderilmez) | `uygulama/iletisim.html` |
| Y6 | Künye | bitti (canlıda yalnız Unvan, Adres, E-posta dolu) | `uygulama/kunye.html` |
| Y7 | Marka iş birlikleri / Sponsorlar | kapsam dışı (reklam turu) | — |
| E1 | Sayfa bulunamadı | bitti (canlı 404 metinleri + arama) | `uygulama/bulunamadi.html` |
| E2 | Erişim yok | bitti (canlı /403) | `uygulama/yetki-yok.html` |
| E3 | Oturum süresi doldu | bitti (canlı /oturum-suresi-doldu) | `uygulama/oturum-doldu.html` |
| E4 | Beklenmedik hata | bitti (canlı /500) | `uygulama/hata.html` |
| E5 | Bakım | bitti (canlı /bakim; doldurulmamış “Bakım penceresi” satırı çizilmez) | `uygulama/bakim.html` |
| E6 | Bağlantı başka hesaba ait | bitti (repo link-wrong-account metinleri, 3 kip `&mod=verify\|sifre\|delete`) | `uygulama/yetki-yok.html?tur=baska-hesap` |
| E7 | E-posta doğrulaması gerekli | G1'de (eposta-dogrula.html) | `uygulama/eposta-dogrula.html` (G1) |
| M1 | Bağlantı yok | bitti (canlı /cevrimdisi; gerçek navigator.onLine rozeti; şerit hali kabukta `?durum=baglanti-yok`) | `uygulama/baglanti-yok.html` |
| M2 | Güncelleme gerekli | bitti (tam ekran, kapatılamaz; `?tur=istege-bagli`; mağaza bağlantısı “Yakında”) | `uygulama/guncelleme.html` |

## Son kontroller

| İş | Durum |
|---|---|
| Bağlantı denetimi (ölü link / bağlanmamış düğme = 0) | bitti (259 adres, ölü bağlantı + JS hatası 0; yayın kopyası 274 adres 0) |
| Galeri: bütün gruplar `hazir` | bitti (15 grup; yayın docs/60) |
| docs/50–53 güncel (kararlar, çözülen tutarsızlıklar) | kısmen (docs/51, 52 §10, 55 güncel; docs/50 ve 53'ün son tarama satırları açık) |

## Kullanıcı EK kuyruğu (12 Ekim, geliş sırası — her biri bitince tek satır haber + docs güncel)

| # | EK | Durum | Not |
|---|---|---|---|
| K1 | Banner birleşimi (gülücük/kubbe) + keskin geçiş genel kuralı | bitti | docs/55 §2e–2f |
| K2 | Form paritesi + telefon bileşeni + iç not yok | bitti (hesap, profil, yasal, ayarlar, içerik/püf-ekle; tablolar docs/52 §10) | docs/52 §10 |
| K3 | Rozetlerim yeniden (özet + kademe ilerlemesi + 3 sütun ızgara + aile çipleri + rozet sheet; web 4 sekme: Koleksiyon/Kademem/Puan/Liderlik) | bitti (profil ajanı) | |
| K4 | Şef kartı (gülücük kapak gerçek görsel, avatar kavis üstü, sayaçlar; şefler listesi kartları), metin justify + bold, bloklu içerik (blok başına paylaş), örnek üye verisi dolu, iç notlar | bitti (şef profili, şefler, püf blokları + paylaş, justify + bold, örnek üye DGORNEK) | |
| K5 | Püf noktası/kart overlay: tarif kartı + ana-v3 öne çıkan overlay'i tek ortak bileşen; detay üst görseli kubbe | bitti (ortak-kart veils; detay banner `perde:'kart'`; püf kartında görsel üstü metin yok) | |
| K6 | Yemek Modu seçici (ortak `DG.modSerit/modKart/modAciklama`, `DGMOD` bitti; sayfa: bul ajanı yapıyor): mod kartı ortak (128×88, overlay, ikon, ad, 20 mod), seçili primary çerçeve + onay; ipucu satırı + açıklama kartı; Hazır Menüler sayacı; Sıfırdan Kur kategori çip ikonları; canlı bugun-ne-pisirsem paritesi | bitti (bul ajanı; hazır menü görselleri yerel assets/hazir-menu) | |
| K7 | Justify ortak kural (istisnasız; başlık/düğme/etiket gerilmez) | bitti | `ortak/dg-metin.css`, `denetim/metin.mjs` |
| K8 | Açılış 3 alt alan (logo, slogan, sayaç, yükleme çubuğu) | bitti | |
| K9 | Durum rozeti ortak (Taslak/Onay Bekliyor/Yayında/Reddedildi…, tonlar token), Tariflerim kartı (satır kartı dili), stilsiz sınıf taraması (`ortak/denetim`, grup bitince 0) | bitti: `DG.durumRozet`, Tariflerim kartı; stilsiz tarama `denetim/stilsiz.mjs` (uygulama 2 → açılış ajanı kapatıyor) | |
| K10 | Tercihler bayrak ızgarası ekranı doldursun (sığan tam satır kadar; “X mutfak daha” ızgaranın hemen altında) — ortak bayrak bileşeninde | bitti (ortak `DG.bayrakSecim` sığdırma: 390’da 5 satır/20; “daha” ızgaranın altında) | |
| K11 | Kök ekran bozulması + ana sayfa yönlendirmesi (öncelikli) | bitti | docs/55 §2h |
| K12 | Yorum bölümü ortak bileşen (kaynak detay-v2 yorumları; püf/video/detay aynı bileşen; web püf yorum farkları) | bitti (`DG.yorumBolumu`; püf detayı ve katalog kullanıyor; detay-v2 aynı CSS; video sayfasında canlı yorum yok) | |
| K13 | Tabaktan Tarif akışının bütün ekran/durumları galeride + gerçek hedefler; izin istemi ortak bileşeni (görsel alan, maddeler, sabit düğmeler) | bitti (galeri “Tabaktan Tarif akışı” 12 çerçeve; Pro’ya geç → Pro; analiz galeride durur; iç notlar/bildirimler temiz; `DG.izinIstemi` ile kamera/bildirim izin ekranları) | T1 “bitti” sayılmıştı, eksik |
| K14 | Küçük çip/rozet köşesi orantılı (32–36 → 8, 20–24 → 5–6), başka köşe değişmez; boş satır yasağı (tek küçük öğe satır kaplamaz) — tarama + docs/55 | bitti (küçük çip/rozet köşesi token; boş satır birleştirmeleri bütün gruplarda; docs/55 §2i) | |
| K15 | Radius denetimi — yalnız rapor + kalıcı betik `ortak/denetim` | bitti (rapor: 1 elle radius `a-chefs.css:9` 50% → `--radius-avatar`; `denetim/radius.mjs`) | |
| K16 | Yükleme durumları raporu (tablo) + animasyon sistemi (tokens, geçişler, shared element, mikro etkileşim, sheet/snackbar, sıralı belirme, reduced-motion, Flutter karşılıkları) + bileşen kataloğunda “Hareket ve durumlar” | bitti (rapor + sistem: docs/58; galeri “Hareket ve durumlar”) | önce rapor |
| K17 | Rozetlerim akordiyon + ortak bölüm başlığı; uzun bölümlü sayfaları (Ayarlar, SSS, yasal) aynı akordiyona bağla | bitti (Rozetlerim, SSS, Ayarlar bildirim/güvenlik/dil, yasal dizin + uzun yasal metinler) | |
| K18 | Tercihler 2 yeniden (akordiyonsuz, fotoğraflı kart adımları) + akordiyon sınırı (docs/55 §2k) | bitti (Tercihler 2 fotoğraflı kart adımları, akordiyonsuz; docs/55 §2k) | |
| K19 | Metin–düğme boşluğu: ortak dikey yığın kuralı (başlık→açıklama küçük, açıklama→düğme/etkileşim ≥16–20, düğmeler 12, bölümler büyük), bütün sayfaları tara + kalıcı yakınlık denetimi, docs/50/55 | bitti (70 yer; `denetim/yakinlik.mjs` 0) | |
| K20 | Tabaktan Tarif hata/kenar durumları kalite turu (tanınamadı/bulanık/yemek yok/oluşturulamadı/çevrimdışı: fotoğraf + tarama çerçevesi + ipucu görseli, hiyerarşik eylemler, “Adını yaz” arama, benzer öneriler ya da 3 ipucu, header solda); ortak hata/boş durum bileşeni yükseltilir | bitti (`ortak/dg-sahne.css` + `DG.durumSahne`; Tabaktan 6 durum runtime fallback() sahneye geçti, header solda, “Adını yaz” satır içi arama + bulunamadı bildirimi, ipuçları/öneri şeridi; açık sahne sayfa içi aralık düzeltildi; docs/55 §2o) | |
| K21 | Püf detayı: kompakt ortak yazar satırı (avatar+ad+kademe; tek meta satırı; Takip et; tarif/video aynı dil), içerik bloğu düzeltmesi (divider yok, numara rozeti, 3 varyasyon + 2 içerik türü galeride, blok paylaş = web kanalları FB/X/WhatsApp/Telegram/Pinterest/E-posta + kopyala, bold + satır içi bağlantı), kaydırınca beliren ortak alt eylem çubuğu (görsel+başlık, Kaydet, Faydalı, Yorumlar, Paylaş), püf liste banner'ı = liste-v2 banner birebir, galeride en başta “Ana ekranlar” (yayındaki kök klasörün bütün sayfaları); ilke docs/55 §2m. Referans dadamutfak-view yalnız blok yapısı için | bitti (`DG.yazarSatir`, `DG.paylas` 6 kanal + kopyala, blok çizgisi kaldırıldı, `s.kayanBar`, 3 varyasyon + 2 tür püf detayının galeri çipleri (ayrı vitrin sayfası kaldırıldı, docs/55 §2p), püf liste banner liste-v2 ile ölçüde aynı (320, başlık 24/700, panel 296), banner header arama ikonu solid olunca; galeri “Ana ekranlar” ilk grup, üç ekran aynı telefon çerçevesinde; sunum kartı Beyar kararıyla kaldırıldı) | |
| K22 | Tabaktan Tarif “Sonuç · senin tarifin (taslak)” = detay-v2 birebir (kullanıcı fotoğrafı hero, başlık, sayaçlar, sekmeler, porsiyon, adımlar, kubbe); farklar: Taslak rozeti + bilgi notu, alt sabit Düzenle / Kaydet·Editöre gönder / Yeniden çek, yorum/puan/takip gizli; kural docs/55 §2n | bitti (`tabaktan-taslak.html` = detay-v2 + taslak farkları; Kaydet → Editöre gönder → Tariflerim akışı, Düzenle → Tarif ekle (kapak + malzemeler + adımlar), Yeniden çek → kamera; galeride 3 hâl; 320–430 taşma 0) | |

## Revize turu V2 (Beyar, 13 Ekim) — galeri `ekranlar-v2.html`; V1 yedeği `eski/v3-app-v1-yedek-20261013/`, V1 yayını dokunulmadı

| # | Madde | Durum | Not |
|---|---|---|---|
| A | Alt menü 4. öğe Püf Noktaları (kökteki gibi); Kaydettiklerim alt menüde yok, profil + yan menüden | bitti | tokens.json nav, dg-ui nav, dg-baglanti; önceki karar iptal |
| B1 | Bütün metinler justify, istisna yok; boşluk heceleme ve aralıkla (13 Ekim son karar) | bitti (`ortak/dg-metin.js` Türkçe heceleme — yumuşak tire; justify-dışı istisna kaldırıldı; `denetim/metin.mjs` istisnasız) | ortak |
| B2 | Kart başlıkları en fazla 2 satır + … (bütün kart tipleri) | bitti (kart başlığı kuralı; 360 taramasında yalnız tarif ekle adım kartı kaldı → D4) | ortak |
| B3 | Sheet, akordiyon, ayarlar ve arama bölüm başlıkları bold | bitti (sheet/akordiyon/akordeon/h2-h3 .t-sub bold; ayarlar ve arama başlıkları D11–D12) | ortak |
| B4 | Switch iOS oranında ince | bitti (40×24 iOS oranı) | ortak |
| B5 | Dropdown/select hover/seçili kesik görünüm | bitti (içten halka, :focus-visible, select oku) | ortak |
| B6 | Parçalı gri buton listesi (ikon + başlık + açıklama + ok) | bitti (`DG.parcali`, `ortak/dg-parcali.css`; sayfalara uygulama D15/D16) | ortak |
| B7 | Giriş duvarı olan her eylemin giriş yapılmış devamı | bitti (üç grubun giriş duvarı listeleri ajan raporlarında; bekleyen eylemler: kaydet, takip, liste, faydali, pufkaydet, menu, yorum, akisbegeni, akiskayit, devam; kapi {devam}) | tarama + liste |
| B8 | Çevrimdışı göstergesi primary | bitti | ortak |
| B9 | İzin istemi kavisi kesintisiz, ikon kavis üstünde | bitti | ortak |
| B10 | Bayrak hücresi kompakt (ana sayfa sekmesi dahil) | bitti (ana sayfa sekmesi dg-duzeltme D11; ortak bayrak bileşeni zaten kompakt) | ortak |
| C1 | Açılış 2 · Karşılama 3 · Tercihler 2 gerçek akış; diğerleri eski/ | bitti (acilis → karsilama → tercihler → ana-v3; Chromium + WebKit akış testi) | |
| C2 | Karşılama 3 modül düğmeleri yalnız ikon | bitti (yalnız ikon, aria-label, 52px hedef) | |
| C3 | Tercihler 2 Beslenme hepsi görselli kart | bitti (8 seçenek fotoğraflı DG.secimKart; Akdeniz sayısı veride yok — gösterilmiyor) | |
| C4 | Tercihler 2 Mutfaklar yalnız bayrak ızgarası, tek ızgara + “X mutfak daha” | bitti (tek DG.bayrakSecim ızgarası; 390'da 6 satır, EK3) | |
| D1 | Giriş / Kayıt (+ şifremi unuttum, yeni şifre, e-posta doğrula) gülücüklü yeni tasarım | bitti (gülücük yalnız giriş/kayıt; ana sayfa hero değerleri; DG.seg sekme; sosyal düğmeler; yardımcı hesap ekranları V1 düz hâlinde + “E-posta gelmediyse” DG.parcali) | |
| D2 | Dolapta Ne Var (ana sayfa bloğu + sayfa) yeniden, web alan alan | bitti (ortak `ortak/dg-dolap.js` + `.css`: aynı mod seçici, malzeme alanı + gerçek sesli giriş, çipler, seçim paneli, eşleştirme; ana sayfa bloğu dg-baglanti ile bu bileşene bağlı; sayfa `ortak/sayfalar/dolap.js` yeniden; canlıdan eksik olan Besin değeri süzgeci eklendi — veri-cikar kalori/protein, 24 tarifte; seçim ana sayfa ↔ sayfa ortak) | |
| D3 | Tarif detayı header “…” kaldır | bitti (header “…” kaldırıldı; içindekilerden yalnız “Tarifi yazdır / PDF” başka yerde yok — raporlandı) | |
| D4 | Tarif ekle sihirbazı + zengin metin editörü | bitti (4 adımlı sihirbaz, adım kartları, malzeme satırı + düzenleme sheet'i, DG.zengin, yayın kartı; alan kaybı yok) | |
| D5 | Püf ekle zengin metin editörü | bitti (DG.zengin) | |
| D6 | Püf detayı: şef kartı detay-v2 birebir, ince ayırıcı, etiket yok, Başlık → Görsel → Açıklama | bitti (DG.sefKarti, tek meta satırı, etiket yok, ayırıcı + Başlık → Görsel → Açıklama ortakta) | |
| D7 | Rozetlerim üst kısım sade | bitti (tek özet kartı, iki ilerleme çubuğu, 4 sekme 320'ye sığar) | |
| D8 | Ne Pişirsem ızgara seçenekleri ortalı | bitti (DG.secimKart + .is-orta, 4. adım yatay) | |
| D9 | Menüyü pişir sıralama düğmeleri | bitti (44×44 ikincil kare oklar, net devre dışı) | |
| D10 | Videolar: kısa videolar şeridi + tam ekran dikey oynatıcı; video detayı kubbe | bitti (DG.akisKart/akisAc, ?akis= derin bağlantı, video detayı kubbe + oynat) | |
| D11 | Arama: başlıklar bold, ızgara/liste görünümü | bitti (DG.bas başlıklar; ızgara/liste seçici DG.seg, ?gorunum=liste) | |
| D12 | Ayarlar: başlıklar bold, ince ayırıcılar | bitti (DG.bas; ortak satır ayırıcı) | |
| D13 | Çözüm Merkezi akordiyon başlıkları bold | bitti (ortak akordeon başlığı bold, doğrulandı) | |
| D14 | Görüş bildir: 3'lü ikonlu kare seçim kartları | bitti (.is-uc.is-orta 3'lü ikonlu kare kartlar) | |
| D15 | Tabaktan Tarif sheet seçenekleri + izin reddedildi maddeleri B6 | bitti (Tabaktan sheet seçenekleri ve izin maddeleri parçalı gri liste) | |
| D16 | Sistem/hata “Buradan devam edebilirsin” satırları B6 | bitti (7 sistem sayfasında DG.parcali) | |
| EK1 | Girdi ortak bileşen (tek çerçeve, ikon + mikrofon içerde, hover yalnız fareli cihazda) + bütün sayfalarda tarama | bitti (ortak `ortak/dg-kontrol.css`: .dgu-girdi/.dgu-seg/.dgu-ibtn kökte de; iç alan kök odak halkasını taşımaz; tarama: kendi girdisini çizen 2 yer — liste-v2 arama (kök bileşen, tek çerçeve, değişmedi) ve Tabaktan “Yemeğin adını yaz” (ajan 3'e verildi)) | |
| EK2 | Dolapta Ne Var sekmeli: ortak segment “Dolaptakiler n / Hariç Tuttuklarım n”, hariç çipleri koyu + çarpı | bitti (ana sayfa bloğu + sayfa aynı `DGDolap` parçaları) | |
| EK3 | Bayrak ızgarası ekranı doldurur (ölçüm; tercihlerde 390'da 6 satır) | bitti (hücre 72px, satır ölçümü alt sabit çubuğa kadar, kalan yükseklik satır aralarına dağıtılır; 360: 4, 375: 4, 430: 7 satır) | |
| EK4 | Bayrak çerçevesi 1px nötr + küçük köşe; bayraksız bölge ikonu | bitti (ortak bayrak, ana sayfa şeridi, liste filtresi çipleri; bayraksız tek mutfak: Balkan → earth-europe; canlıda da görsel yok) | |
| EK5 | Bütün metinler justify, istisna yok; boşluk heceleme ve aralıkla | bitti (Türkçe heceleme `ortak/dg-metin.js` + otomatik genişlik ayarı; 20px ve üstü başlık hecelenmez; istisnasız denetim: justify olmayan 0, boşluk adayı 238 → 5) | Karar bekliyor: “Yaş Sınırı ve Küçüklerin Korunması” sayfa başlığı (24px) justify + tiresiz hâlde 2,69em boşluk bırakıyor; genişlik ayarıyla çözülmüyor. |
| EK6 | Webden içerik, stil değil — başlık/ikon/not ortak bileşenden (docs/55 §2r) | bitti (üç grup; listeler ajan raporlarında) | |
| EK7 | Giriş/Kayıt cila + hero yalnız giriş/kayıtta | bitti | |

## Revize eki (Beyar, 13 Ekim — V2 kontrolünden)
| # | Madde | Durum | Not |
|---|---|---|---|
| R0 | Justify — denetim ekrandaki satırlara bakar | bitti | Neden: `dg-metin.js` “genişlik ayarı” blokları daraltıyordu (sütunun sağ kenarına ulaşmıyor → sola dayalı görünüm) + kök ekranlarda eski `dg-metin` önbellek damgası. Daraltma kaldırıldı; damga üreticide otomatik. Denetim (`ortak/denetim/metin.mjs`) yeniden yazıldı: her metin bloğu (div/span/li/small/… hepsi), 2+ satırda son satır dışındaki her satır iki kenara dayanır; ortalı/kart içi istisna yok. Önce: daraltılmış kutu 324 + kenara dayanmayan 1 → sonra 0 (Chromium/WebKit/360 sonuçları raporda). |
| R1 | Dolapta Ne Var — sayfa ve ana sayfa bloğu TEK seçici | bitti | `DGDolap.seciciHtml/seciciBagla` (ortak/dg-dolap.js): seçim paneli, sekme, hariç türleri + açıklama + hızlı seçim/alerjen/“Kesinlikle gösterme · Uyararak göster”, alan + ses, malzemeler. Blok kompakt (katalog yerine popüler malzemeler; süzgeçler sayfada). Seçili hariç türü ve hassasiyet seçimi primary (tint). |
| R1b | Ana sayfa blokları ↔ sayfa karşılıkları | bağlandı (eylemler) | Video → video.html?no, şef → sef.html, Takip Et → ortak takip listesi / giriş, Sen de Şef Ol + Tarifini Paylaş → tarif-ekle, Şefler Tümü → sefler.html (dg-baglanti.js). Görsel bileşen farkları (video/şef/kategori kartı kök tasarımda ayrı kopya) ve ana sayfada düşmüş “Elinde ne var” bloğu karar bekliyor. |
| R2 | Püf detay — üst satırda yazar yok | bitti | Meta: tarih · güncellendi · okuma süresi; yazar yalnız şef kartında. |
| R3 | Şef kartı — sıfır sayaç yok, “2026'dan beri üye” | bitti | `DG.sefSayac` (gerçek > 0, yoksa `ortak/veri/ornek-sef.js`), `DG.yilDan`; şef kartı, şef profili, katalog. |
| R4 | Tabaktan sonuç sekmeleri alt çizgili sekme | bitti (ajan 3) | `DG.seg(…, 'sekme')` / `.dgu-seg--sekme` (dg-kontrol.css). Diğer iki seçenekli segmentler listelendi, değiştirilmedi (karar Beyar'da). |
| R5 | Tabaktan tanıtım sheet'leri | bitti (ajan 3) | Yan yana 3 kare adım (ikon + başlık, açıklamasız, ince ayırıcı); Pro'ya geç + Şimdilik değil yan yana; denemede not + tam genişlik düğme; giriş kapısı parçalı liste kaldı. |
| E1 | Dolapta Ne Var — kaynak SAYFA; ana sayfa bloğu onun aynısı (Beyar düzeltmesi) | bitti | Sayfa revize öncesi hâline döndü (siyah seçili hariç türü, ilk grubu açık 8 kategori, sıra ve yerleşim aynı; oturum kaydından geri kuruldu). Çizim tek fonksiyon: `DGDolap.icerik` (sayfa yalnız dış başlığı verir); ana sayfa bloğu aynı fonksiyonu çağırır, uygulama bileşen stilleri kökte `@scope (.dgd-ana)` ile yalnız bloğa yüklenir (dg-baglanti.js), kök rol stillerine karşı kalkan dg-dolap.css'te. Doğrulama 360/390/430 × boş/seçili × iki sekme: yeni sayfa = eski sayfa 12/12 fark 0 (toleranssız); ana sayfa bloğu = sayfa 12/12 fark 0 (±1px kenar yumuşatma toleransı; kök iç kaydırma kabının piksel altı konumu). Siyah seçili durum yalnız bu bileşende. |
| E2 | Şef kartı tam hâl — TEK ortak bileşen | bitti | `ortak/dg-sef-karti.js` (`DGSefKarti`): avatar, ad, kademe, “2026'dan beri üye”, Tarif · Püf noktası · Takipçi (gerçek > 0, yoksa `ornek-sef.js` — 39 şefin hepsinde üçü dolu), Takip et + Abone ol. Kullananlar: tarif detayı (kök kartı dg-baglanti ile değiştirilir), püf detayı, şef listesi (eski küçük kart yerine), bileşen kataloğu. Video detayında yazar verisi yok (DGVERI.videolar: başlık, görsel, süre, izlenme) → kart çizilmez. Ana sayfa şef şeridi Beyar'ın onayladığı web kart yapısında kaldı (eylemleri bağlı). |
| E3 | Büyük başlık boşluğu | kısmen — karar bekliyor | 20px+ başlıklar hecelenir (en az 6 harf, parçalar 3/3; `hyphenate-limit-chars: 6 3 3`) ve her başlıkta heceli/hecesiz × sözcük aralığı (0…−0,08em) × harf aralığı (0…−0,01em) ölçülüp en iyisi uygulanır. Kalan: “Çilek Bozulduğu (Küflendiği) Nasıl Anlaşılır?”, “Yaş Sınırı ve Küçüklerin Korunması”, “Tam Kıvamında Karnıyarık — Şefin Bütün Sırlarıyla” vb. — sonraki sözcük satıra sığmadığı için izin verilen ayarla kapanmıyor; metin, yazı boyutu ya da justify değişmedi (kural: karar Beyar'da). |

## V4 revize + iki yeni modül + kapsam denetimi (Beyar, 13 Ekim) — galeri `ekranlar-v4.html`; V2 yayını donduruldu (yayin/uygulama-ekranlari-v2, gh-pages dokunulmaz); git/yayın yok
| # | Madde | Durum | Not |
|---|---|---|---|
| A1 | Hero şef adı: örnek veride üç isimli şef; ad tek satır + ellipsis (Flutter sınırı docs'ta); carousel noktaları şef satırının sağında aynı hizada | bitti | Noktalar şef satırının sağında aynı tabanda (bir satır kazanıldı); şef adı tek satır + “…” (gösterge genişliği + 12 kadar boşluk). Gerçek veride üç isimli şef yok → varsayılan gerçek veri; galeri hâli “Uzun şef adı” (?ornek=uzun-sef, Ayşe Nur Karaoğlu). Flutter sınırı docs/50 ve 55 (maxLines 1, ellipsis). |
| A2 | Kategoriler & Dünya Mutfakları: iki sekmede üst/alt iç boşluk eşit, yükseklik içeriğe göre; bayrak kartı oranı ve dikey ritim | bitti | Pasif sekme akıştan çıkar → blok yüksekliği açık sekmenin içeriğine uyar (kategoriler 347, mutfaklar 291px; 390). İki sekmede sekme→öğe 20, öğe→bölüm sonu 36. |
| A3 | Mutfak adları her yerde yalnız millet adı (“Türk”, “İtalyan”…); bu kısa etiketlerde heceleme yok, tek satır + ellipsis; justify denetimi yanlış alarm vermez, muaf da değil | bitti | Kök: “… Mutfağı” eki atılır (ana sayfa şeridi, detay çipi, erişilebilir ad; dg-baglanti). Uygulama: ortak bayrak bileşeni zaten kısa. Bütün bayraklı mutfak etiketleri hecesiz, tek satır + “…” (dg-metin MUTFAK seçicisi + dg-metin.css). |
| B4 | Dolapta Ne Var: her grup tek satır yatay slider (sonda kısmi öğe); ana sayfa metin çipi, sayfa gerçek görselli kart (canlı siteden; yoksa listele); tek render fonksiyonu (görselli/görselsiz parametre); siyah seçili tür kartı aynen | bitti | DGDolap.icerik tek fonksiyon: her grup tek satır yatay şerit (.dgd-ciplar.is-serit, sonda kısmi öğe); sayfa gorselli:true → gerçek görselli kart (.dgd-mkart), ana sayfa metin çipi. 185 katalog malzemesinin 185'inin canlı görseli var (assets/malzeme, 96px; 39,5 MB → 752 KB). Siyah seçili tür kartı aynen. |
| C5 | Tercihler: “Balkan” kaldırılır; ülke olmayan diğer bölge maddeleri kaldırılmaz, listelenir | bitti | Balkan kaldırıldı (“49 dünya mutfağından”). Ülke olmayan başka bölge maddesi veride YOK (50 maddeden yalnız Balkan). |
| C6 | Rozetlerim: ikonlar daha küçük, minimal, tatlı; aile renkleri ve kanon korunur | bitti | Madalya 44px, köşe 12, ikon 22; kazanılan açık domates zemin + derin domates ikon, kazanılmayan nötr + kilit (ajan 1; ölçü şimdilik profil.css .dgu-rozet-izgara kapsamında). |
| C7 | Ayarlar: üstteki profil kartı soft gri zeminli kart (parçalı gri buton ailesinin zemini) | bitti | Profil kartı ortak parçalı gri liste (DG.parcali işaretlemesi; ikon kutusu yerine 56px avatar). |
| C8 | Görüş bildir: konu seçenekleri ve ilgi alanı etiketleri ayrı ayrı tek satır yatay slider | bitti | Konu kartları ve ilgi alanı çipleri ayrı ayrı ortak .dgu-serit tek satır şerit (sonda kısmi öğe, scroll-snap). |
| C9 | Açılış/tanıtım: koyu Karşılama açık temaya; diğer tanıtım ekranlarıyla aynı zemin, tipografi, yerleşim | bitti | Karşılama açık temada: üstte fotoğraflı gülücük sahne, altta ikonlu modül seçici + Giriş yap, eylem çubuğu Atla · Tercihlerimi seç; koyu tema stilleri silindi. |
| C10 | Alt menü son öğe “Videolar” (video listesi; video sayfalarında aktif); Profil yan menünün en üstündeki kullanıcı kartından (misafir → giriş); Profil bağlantıları taranır, yetim sayfa yok | bitti (düzeltilmiş) | Beyar düzeltmesiyle: alt menü Ana Sayfa · Tarifler · Ne Pişirsem · Videolar · Profil (bkz. D-alt). Videolar sayfalarında aktif Videolar; arşiv süzgeci canlı Tümü · Tarif · Teknik · Seri · Kısa (türler canlı /video-mutfagi'den); boş hâl. Yetim sayfa: yalnız sistem durum sayfaları (durumla açılır) ve bileşen kataloğu. |
| D | Yeni modül 1 — Dolaptan Tarife (fotoğraftan yeni tarif; Tabaktan iskeleti): tanıtım, çek/yükle, tanıma (düzenlenebilir çipler, düşük güven), tercih, üretiliyor, sonuç (detay-v2 dili + alternatifler, sekme), kaydet/paylaş, geçmiş, hata hâlleri; Ne Pişirsem paneli 2×2 (Dolapta Ne Var, Dolaptan Tarife, Tabaktan Tarif, Dolabım) | bitti | Dolaptan Tarife (ajan 3; docs/57 §1): 18 hâl + taslak detayı (tabaktan-taslak.html?kaynak=dolaptan, detay-v2 dili). Tanıtım = Tabaktan iskeleti (DG.parcali kutu yatay Çek·Düzelt·Tarifin hazır, ikili Pro'ya geç / Şimdilik değil), tanıma (gerçek malzeme görselli satırlar, düşük güven rozeti, miktar sheet'i, ekle/kaldır), tercih, üretiliyor, sonuç sekmeleri (Senin tarifin / Alternatifler), kaydet/paylaş, geçmiş (dolu/boş), hatalar (bulanık, bulunamadı, az, izin, çevrimdışı, limit, misafir). Ne Pişirsem paneli 2×2. |
| E | Yeni modül 2 — Dolabım (ad tek sabitte, “envanter” yok): liste (kalan güne göre, durum renkleri, yer sekmeleri, arama), ürün ekle (katalog, barkod, fotoğraftan toplu), detay/düzenle, tüketildi/atıldı/alışveriş listesi, “Bunları değerlendir”, bildirim ayarları, örnek bildirimler, aylık özet, hâller; ana sayfada ürün varsa “Yakında bitecekler”; alışveriş listesine bağlantı | bitti | Dolabım (ajan 2; docs/57 §2): liste (kalan güne göre, durum rozetleri, yer sekmeleri, arama, aylık özet ortak sayaç bandı), ürün ekle (katalog, barkod örneği, fotoğraftan toplu → Dolaptan Tarife), detay/düzenle (otomatik kayıt), tüketildi/atıldı/alışveriş listesi (dg-alisveris), Bunları değerlendir (+ Dolapta Ne Var'a seçili gönder), bildirim ayarları + örnek bildirimler, boş/misafir/izin/çevrimdışı. Çekirdek ortak/dg-dolabim.js; ana sayfa Yakında bitecekler (E-ana). |
| F | Kapsam denetimi: bütün ekranlar × hâller matrisi docs/58-kapsam.md; eksik hücreler tasarlanır; gerekirse ortak bileşen | bitti | docs/58: 56 ekran × 17 hâl, eksik 0 (kapsam.mjs). Eklenen ortak mekanizmalar: liste ?sayfa=yukleniyor|son|hata, ?yenile=1 + liste sayfalarında aşağı çekip yenile, ?durum=bos (s.bos), ?durum=basari (toast); kök ekran hâlleri (kok-durum.js + @scope köprüsü); ortak hâlde sayfa bağlayıcısı çalışmaz (null öğe hatası kalmadı).
| G | ekranlar-v4.html (V2 yapısı, başlık “DadaGastro Mobil Uygulama Ekranları”, yeni modül bölümleri, hâl çipleri) + tam denetim (bağlantı+JS, justify Chromium 390/360 + WebKit 390, stilsiz, yakınlık, radius, iç not) | sürüyor | ekranlar-v4.html kuruldu (V2 yapısı, başlık “DadaGastro Mobil Uygulama Ekranları”, yeni modül bölümleri ve hâl çipleri ortak/veri/sayfalar.js'ten); tam denetim kapanışta. |
| EK-a | Büyük başlık: justify kalır; heceleme açıkken 0,35em'i aşan başlıkta yazı boyutu 1px adımlarla en çok 2px küçülür (yalnız o başlık, tek ortak yardımcı); yetmezse listelenir; Flutter notu docs'ta; kapanışta yeniden denetim | bitti | dg-metin.js baslikAyar: 0,35em'i aşan başlıkta 1px adımlarla en çok 2px küçültme (yalnız o başlık). Çilek / Yaş Sınırı / video başlığı 1px ile kapandı; 2px de yetmeyen “İki ayrı katman: ücretsiz takip ↔ ücretli Pro” (pro.html) listede (DGMetin.acik). Flutter notu docs/50 ve 55. |
| D-alt | Alt menü düzeltmesi (Beyar): Ana Sayfa · Tarifler · Ne Pişirsem · Videolar · Profil | bitti (ortak) | tokens.json nav + DG nav + kök dg-baglanti; Püf alt menüde yok (yan menüde var; ana sayfada püf bloğu YOK — V3 modül listesinde değil, yeni blok açılmadı), püf sayfalarında aktif öğe yok; video sayfalarında aktif Videolar; yan menü misafir kartı değişikliği geri alındı; üye kartındaki “Önizleme …” iç notu kaldırıldı. |
| D-sayaç | Sayaç bandı dikeyde ortalı — tek ortak bileşen | bitti | ortak/dg-sayac.css (.dgu-istatistik): iç boşluk hücrede (üst = alt), kartın son öğesinde kartın alt boşluğunu bant taşır (16/16), bağımsız 12/12, şef kartı .is-yalin; hücre ayırıcı bandın tam yüksekliğinde, çok satırda satır başı ayırıcısı yok + yatay ayırıcı. Şef kartının ayrı sayaç kopyası (dv2-x-counts) ortağa bağlandı; hesap.css tek seferlik geçersiz kılma silindi. Ölçüm (Chromium + WebKit): giriş, kayıt, profil, şef profili, Hakkımızda, püf/şefler/detay şef kartı — üst/alt eşit. |
| D-gülücük | İzin ekranları giriş hero'suyla aynı ortak gülücük | bitti | DG.gulucuk (dg-ui.js + dg-bilesen.css): giriş/kayıt hero'su ve DG.izinIstemi (bildirim, kamera, reddedildi) aynı bileşen; rozet eğrinin tam ortasında; eski .hs-kapak* ve .dgu-izin-gorsel kuralları kaldırıldı. |
| E-ana | Ana sayfa “Yakında bitecekler” | bitti (ortak) | ortak/dg-dolabim.js (Dolabım çekirdeği, tek kaynak) + dg-baglanti.js; yalnız Dolabım'da süresi yaklaşan/geçen ürün varsa; galeri hâli ana-v3.html?dolabim=ornek. |
| D-sekme | İki seçenekli geçişler tarif detayı segment bileşeniyle (Beyar düzeltmesi) | bitti | Alt çizgili sekme (.dgu-seg--sekme, DG.seg 'sekme') tamamen kaldırıldı; Tabaktan sonucu (runtime.js, “Benzer tarifler” sayı rozetiyle), Dolaptan Tarife sonucu (“Alternatifler” sayı rozetiyle) ortak .dgu-seg; Tabaktan/Dolaptan taslak detayı detay-v2'nin kendi segmenti (Malzemeler / Hazırlanış, sayılarıyla). Dolabım yer sekmeleri zaten segment. R4 satırındaki alt çizgi kararı geçersiz. |
| D-takvim | V4 EK 6 — ORTAK TAKVİM: tek bileşen (Gilroy, token, kanon radius, Türkçe ay/gün, Pazartesi başlangıç, table_calendar eşlemesi); ay/hafta, ay geçişi, bugün/seçili, durum noktaları, aralık, devre dışı, sheet tarih seçici + hızlı çipler (3 gün / 1 hafta / 1 ay); galeride bütün hâller; tarih seçilen her yer bu bileşen (Dolabım, profil düzenle, haftalık menü, süzgeçler), date input kalmaz; Dolabım “Takvim” görünümü; docs/57 Flutter notu | sürüyor | ortak/dg-takvim.js + .css (DGTakvim.html/kur/sec/alan; ay/hafta, ay-yıl paneli, bugün, seçili, noktalar, aralık, devre dışı, sabit hafta, yükleniyor, hızlı çipler — geçmişe dönük aralık sıralı); üretici bütün sayfalara yükler; galeri “Takvim” (4 takvim + 3 alan + sheet); docs/51 satırı + docs/57 §3 table_calendar eşlemesi. Bağlanan: bildirimler tarih aralığı (ajan 3; galeri hâli). Kalan (ajan 2): Dolabım SKT + açılış tarihi, Dolabım Takvim görünümü (galeri hâlleri eklendi), profil düzenle doğum tarihi, haftalık menü sabit hafta. |
| D-ihlal | Yeni modüllerde ortak bileşen ihlali (Beyar): barkod sheet'i ortak sheet + ikili düğme + spacing + ortak kamera vizörü; düğme etiketleri tek satır; Dolaptan Tarife ve Dolabım taraması, token dışı değer kalmaz | sürüyor | Ortak eklendi: DG.vizor (kamera vizörü; durumSahne de kullanır), DG.fotoSerit, DG.sayac. Dolaptan token 0 (ajan 3). Dolabım barkod sheet'i + temizlik ajan 2'de. Düğme taşmaları: Tabaktan “Bu malzemelerle Dolapta Ne Var’da ara”, “Tariflerim'de”, püf ekle “Taslak kaydet” / “Onaya gönder”. |
| D-denetim | Kalıcı denetim; 0 olmadan bitti denmez | bitti (kuruldu) — sonuç kapanışta | ortak/denetim/token.mjs (token dışı renk/ölçü/font + sayfaya özel görsel stil + satır içi stil), ortak/denetim/dugme.mjs (düğme tek satır, kesik uyarısı). |
| D-kural | CLAUDE.md DEĞİŞMEZ KURAL — ORTAK BİLEŞEN VE KANON + “eksik bileşen ortakta aynı dilde, aynı hâl setiyle üretilir; galeride kardeşleriyle; docs'a tek satır; Flutter aynen” | bitti | Kök CLAUDE.md en üstü + v3-app/CLAUDE.md + docs/55 paragrafı. |
| D-iskelet | Yükleniyor iskeletleri + 4+ seçenekli segment | bekliyor | Bu maddenin talimat metni oturuma ulaşmadı (yalnız kontrol listesinde başlığı var); ayrıntısı gelince başlanır. |
| D-porsiyon | Porsiyon sayacı (Beyar): Dolaptan Tercih'teki sayaç kaymış; tarif detayının ortak porsiyon sayacı (− 6 kişilik +) aynen; değer ortada, eksi/artı simetrik, değer tek satır, “kişilik” etiketiyle sabit genişlik; porsiyon sayacı kullanan her ekran (Tabaktan, üretilen tarif, haftalık menü vb.) aynı ortak bileşen | bitti | Ortak `DG.adimlayici` (ortak/dg-sayac.css `.dgu-adimlayici`; detay sayacından türetildi; `.dgu-sayac` bildirim rozetiyle ad çakışması nedeniyle ayrı ad). Değer ortada tek satır, orta alan en geniş değerin (≥2 hane) görünmez iziyle sabit genişlik. Bağlananlar: tarif detayı (kök detay-v2.js; eski .stepper geçersiz kılmaları silindi), Tabaktan/Dolaptan taslak detayı (detay-v2), Dolaptan Tercih (ajan 3; .dt-sayac silindi). Haftalık menü ve Tabaktan'da porsiyon sayacı yok. Ölçüm Chromium + WebKit, 360/390/430: değer merkezi − kutu merkezi 0; değer değişince − / + x'leri sabit; detay 150, Dolaptan 151 px (1px kök yazı bağlamı). |
| D-takvim-gorunum | Ortak takvim görünümü yeniden (Beyar): iOS / Material 3 sadeliği; gün 40 daire / 44 hedef, sıkı satır; seçili primary dolu + beyaz kalın; bugün primary kalın + ince halka (seçili baskın); aralık uçları primary daire + arası çok açık primary kesintisiz hap bandı (satır sonunda yuvarlak); seçilemeyen soluk gri (çizgisiz); ay dışı daha soluk; hover/zemin artığı yok; noktalar 4px en çok 3 (geçti danger, bugün/yaklaşıyor uyarı, taze başarı); gün adları orta gri; segment + başlık kalır | bitti (ortak) | dg-takvim.css yeniden; tokens.json: radius.day 50% + dayBand (daire istisnası avatar/anahtar/takvim günü), size.calendarDay 40, calendarDot 4, color.status _indicatorNote (danger / accent.yellow / accent.green). Noktalar dairenin içinde rakamın altında. Sheet takvim başlığı ay adı (sheet başlığıyla çakışma giderildi). Galeri 390 Chromium + WebKit: ay (noktalı), hafta, aralık (satır sonu yuvarlak kapanış), devre dışı, ay paneli, sheet (hızlı çip, geçmişe dönük aralık) görüntülendi; JS hatası 0, taşma 0. Dolabım/profil ekranları aynı CSS'i otomatik alır (bağlama ajan 2'de). |
| D-rozet | Rozet ikonları geri dönmüş (Beyar): neden + ortak rozet bileşeni küçük/minimal (kilitli, ilerlemeli dahil), sayfada rozet stili yok, rozet kullanan her yer bağlı; ortak/'a yalnız ana ajan yazar | bitti (ortak) | Neden: C6'nın küçük stili sayfa dosyasındaydı (profil.css `.dgu-rozet-izgara .dgu-madalya`, ajan 1, 10:00); ajan 2'nin 11:29 token temizliği bunu “ortak bileşenin sayfada yeniden stillenmesi” diye sildi → ortak varsayılan (64 dolu turuncu) geri geldi. Kök hata: C6'yı ortağa taşımamam. Düzeltme: `.dgu-madalya` ortakta 44 / köşe 12 / ikon 22, açık domates zemin + derin domates ikon, gölge yok; `.is-ilerliyor` beyaz + ince açık domates çizgi; `.is-kilitli` nötr + ince çizgi + 20 kilit; `.is-kucuk` 40, `.is-buyuk` 64 (detay sheet'i). `DG.madalya` dışa açıldı; Rozetlerim ızgarası, rozet detay sheet'i, galeri, kazanım defteri (küçük madalya) bağlı. Bildirimlerdeki “Rozet kazandın” örneği rozet verisinde birebir adla eşleşmediği için bağlanmadı. Beyar'ın yayın talimatıyla madde 4 (diğer görsel düzeltmelerin geri dönüş kontrolü) yapılmadı. |
| D-genel | Uygulama geneli ortak bileşen / token temizliği (V4 sonrası, ayrı tur) | iptal (Beyar, 13 Ekim) — liste olduğu gibi korunur; Flutter ortak widget kütüphanesi kurulurken girdi | token.mjs bütün sayfa dosyaları: 446 ihlal (bul 91, acilis 62, yasal 54, profil 51, hesap 47, tabaktan 40, icerik 36, ayarlar 32, sistem 13, arama 9, dolap 9, tarifler 2). Ajan 2'nin bildirdiği sayfa CSS'indeki .dgu-* geçersiz kılmalar (karar ana ajanda): profil.css 4–5, 9, 17, 21–22, 37, 57–58, 102, 106, 118, 128, 136, 146; icerik.css 24, 39–40, 44 (artık gereksiz), 47–48, 50–53, 61. Ajan 3'ün bildirdikleri — görsel: bul.css 20, 33–34 (.dgu-chip[aria-current] / :disabled kapsamsız), 40, 46; ayarlar.css 17; sistem.css 10; tabaktan.css 45–46, 49; arama.css 6 · yerleşim: ayarlar.css 11, 16, 18, 32, 38, 46, 53, 58, 60–63; sistem.css 3, 11, 16; arama.css 7, 23, 25; bul.css 25, 52, 68, 70, 76, 83; dolaptan.css 11 (kart içi foto şeridi hâli ortakta yok); tabaktan.css 43, 44, 47. Ajan 1'in bildirdikleri: acilis.css (.dgu-app.ac-app/.has-bar zemin + çubuk payı, .ac-ekran/.ac-kapak .dgu-rozet primary dolgu, .ac-k3 .dgu-gkapak yerleşim); hesap.css (.dgu-header.is-saydam .dgu-htitle gizleme, .dgu-gkap.hs-kapak + .hs-govde, .hs-satir/.hs-onaylar .dgu-secim + .dgu-hata, .hs-govde .dgu-durum/.dgu-btn, .hs-ad > .dgu-alan); ayarlar.css (aynı satırlar ajan 3 listesinde). Ortağa aday (ajan 1): seçim kartı şeridi varyantı (Görüş bildir), kapaklı sayfada şeffaf header başlığı gizleme, onay kutusu satırı hizası (hs-onaylar = ay-onay). Eksik ortak bileşenler: yükleme alanı, galeri karesi (kapak), dosya seç, işaretli kalem, boş yuva, adım çubuğu, Pro parçaları. Ayrıca: rozet ezilmesinin benzeri var mı kontrolü (segment, gülücük, sayaç, porsiyon, takvim) yapılmadı. |
