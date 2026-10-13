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
