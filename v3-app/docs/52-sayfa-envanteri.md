# 52 — Sayfa envanteri, durum matrisi ve veri sözleşmesi

12 Ekim 2026 · Faz 1.

**Kaynaklar**
- Canlı https://dadagastro.com (yalnız okuma; bkz. §8 canlı doğrulama). Çelişkide canlı geçerlidir.
- Laravel reposu (salt okunur; rota/blade/controller satır referansları ham envanterde).
- Prototip: kök `app.js`, `tabaktan-tarif.html`, v3-app ekranları.

**Kapsam**
- Hariç: Mutfak Sırları ve alt sayfaları (Mutfağa Giriş, Ansiklopedi, Sözlük, Ölçü Birimleri, Sofra Düzeni) ile reklam alanları. Menüde bu satırlar “Yakında” bildirir.

**Kısaltmalar**
- Kök ekranlar: **A** = ana-v3, **L** = liste-v2, **D** = detay-v2.
- Öncelik: **P1** uçtan uca gezinme için gerekli · **P2** web özelliği, ikinci dalga · **P3** kurumsal/ender.
- “Kökten taşınacak” = prototipte bugün çalışan ekran; akış ve animasyon aynen korunur, yalnız görsel dil kanona (docs/50–51) çevrilir.

---

## 1. Özet

| | Sayı |
|---|---|
| Canlıda misafirin açabildiği sayfa tipi (Mutfak Sırları hariç) | **27**, ayrıca giriş duvarı arkasında **13** URL tipi (`/hesabim/*`) |
| Repo'da tanımlı ama canlıda 404 | 17 adres (ör. `/sss`, `/liderlik`, `/gunun-menusu`, `/koleksiyon/*`, `/sezon/*`, `/onboarding`); bkz. §8 |
| Mobil sayfa satırı (bu envanter) | **72**: 3 kök + 55 canlıda karşılığı olan + 5 repo'da olup canlıda olmayan (karar) + 9 mobile özel |
| Prototipte bugün çalışan (kökten taşınacak) | 7 (ana, liste, detay + pişirme modu, Tabaktan Tarif, arama, Tarif bul paneli) |
| Sayfa olarak henüz yapılmamış | 62 satır |
| API v1'de karşılığı olan sayfa | 6 (yalnız kimlik, hesap, yasal metin); tarif/içerik/etkileşim API'si **yok** |

---

## 2. Durum matrisi (bütün sayfalar için ortak sözlük)

Sayfa tablolarındaki “Haller” sütunu bu kodlara atıf yapar.

### 2.1 Kullanıcı

| Kod | Hal | Davranış | Bileşen |
|---|---|---|---|
| **K-mi** | Misafir | Okuma serbest. Giriş isteyen eylem → giriş kapısı (E-gk). Çekmecede “Merhaba / Giriş Yap / Üye Ol”. | `DgAuthGate`, `DgDrawer` (misafir) |
| **K-üy** | Giriş yapmış üye | Kişisel eylemler açık. Çekmecede avatar + kademe + 3 kısayol. | `DgDrawer` (üye), `DgAvatar` |
| **K-yeni** | İlk kez açan | Açılış → tanıtım → (isteğe bağlı) tercihler → ana. Kişisel listelerde “ilk kez” boş durumu. | `DgEmptyState` (ilk kez) |
| **K-pro / K-pro0** | Pro / Pro değil | Pro özellik (Tabaktan Tarif, Haftalık Menü, Pro video, abonelere özel tarif): Pro değilse Pro kapısı sheet'i. Canlı metin: “Bu içerik Pro'da / Şef tarifleri ve adım adım video mutfağı DadaGastro Pro üyeliğinle açılır.” + 3 madde + [Pro'yu İncele] [Pro'ya Geç]; video varyantı “Bu içerik Pro üyelere özel” + [Pro'ya Yükselt] [Belki sonra]. Tabaktan'da deneme hakkı (“n ücretsiz deneme hakkın kaldı”). | `DgBottomSheet` + `DgActionCard` + `DgBadge(pro)` |
| **K-dog** | E-posta doğrulanmamış | Web `verified.action`: tarif/püf ekleme, yorum, abonelik kilitli → “E-posta adresini doğrulaman gerekiyor” sheet'i + “Doğrulama bağlantısını yeniden gönder”. | `DgBottomSheet` (*önerdiğim ek hal*) |
| **K-don** | Dondurulmuş / silme bekleyen hesap | Girişte “Hesabını aktifleştir” / “Silme işlemini iptal et” ekranı. | `DgResultState` (*önerdiğim ek hal*) |

### 2.2 Veri

| Kod | Hal | Davranış | Bileşen |
|---|---|---|---|
| **V-yük** | Yükleniyor | Gerçek yerleşimin iskeleti, aynı DOM, `aria-busy`, etkileşimsiz. Banner/header kalır. | `DgSkeleton` (her kartın kendi iskeleti) |
| **V-dolu** | Dolu | Normal. | — |
| **V-boş-ilk** | Boş (ilk kez) | Açıklama + tek yönlendirici eylem (ör. Kaydettiklerim: “Henüz tarif kaydetmedin” + “Tariflere göz at”). | `DgEmptyState` |
| **V-boş-filtre** | Filtre sonucu boş | “Tarif bulunamadı” + “Tümünü Temizle”. Filtreler görünür kalır. | `DgEmptyState` (L'de var) |
| **V-boş-ara** | Arama sonucu yok | ““q” için sonuç bulamadık” + “Şunu mu demek istedin:” + popüler aramalar. | `DgEmptyState` + `DgChip` |
| **V-kısmi** | Kısmi veri | Görseli olmayan kayıt: `line` zemin + FA `image`. Yazarı olmayan tarif öne çıkarılmaz. Puan yoksa yıldız yok; görüntülenme 0 ise çizilmez. Bayraksız mutfak: dünya ikonu. Avatar fotoğrafsız: baş harf. | `DgRecipeCard`, `DgAvatar`, `DgCuisineTile` |
| **V-uzun** | Çok uzun içerik | Başlık 2 satır + “…”, ad 1 satır + “…”, uzun liste sayfalama/sonsuz kaydırma, uzun paragraf “Devamını oku”. | Kart bileşenleri, `DgPagedList` |

### 2.3 Sistem

| Kod | Hal | Davranış | Bileşen |
|---|---|---|---|
| **S-500** | Sunucu hatası | Sayfa içinde “Bir şeyler ters gitti” + “Yeniden dene”. Tam sayfa hata yalnız sayfa hiç yüklenemezse. | `DgErrorState` |
| **S-zaman** | Zaman aşımı | Aynı iskelet, “Yanıt gecikti” + “Yeniden dene”. | `DgErrorState` |
| **S-off** | Bağlantı yok | Üstte kalıcı ince şerit “Bağlantı yok” + önbellekteki içerik. İçerik yoksa tam sayfa “Bağlantı yok” + “Yeniden dene”. | `DgErrorState(offline)` + `DgSnackbar` |
| **S-izin** | İzin reddedildi | Kamera: “Kamera izni gerekli” + “Ayarları aç” / “Galeriden seç” (Tabaktan'da var). Bildirim: Ayarlar'da kapalı durum + “Ayarlara git”. | `DgPermissionPrompt`, `DgActionCard` |
| **S-oturum** | Oturum süresi doldu | Web 419: “Oturumun zaman aşımına uğradı”. Mobilde token geçersiz (401) → giriş sayfası + `donus`. | `DgResultState` → giriş |
| **S-güncel** | Güncelleme gerekli | Tam ekran, kapatılamaz, “Güncelle” (mağaza). | `DgResultState` |
| **S-bakım** | Bakım | Web “Bakımdayız / Kısa bir bakım çalışması yürütüyoruz…”, düğme yok. Mobilde “Yeniden dene”. | `DgResultState` |
| **S-429** | Çok fazla istek | Web/API 429: “Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.” Snackbar. | `DgSnackbar` (*önerdiğim ek hal*) |

### 2.4 Etkileşim

| Kod | Hal | Davranış | Bileşen |
|---|---|---|---|
| **E-gk** | Misafirin giriş isteyen eyleme dokunması (kaydet, takip et, yorum, Ben de Yaptım, Eline Sağlık, tarif ekle, alışveriş listesi, dolap kaydı, Tabaktan Tarif) | Giriş kapısı sheet'i. Canlı metin: “Bu işlem için giriş yap” / “Kaydetmek, yorum yapmak ve takip etmek için DadaGastro hesabına giriş yapman gerekiyor.” + [Giriş Yap] [Üye Ol]. Eyleme özel başlıklar: “Kaydetmek için giriş yap”, “Takip etmek için giriş yap”, “Alkışlamak için giriş yap”, “Bu tarifi yaptığını paylaşmak için giriş yap”, “Menüye eklemek için giriş yap”, “Menüyü açmak için giriş yap”. Girişten sonra kaldığı yere dön ve eylemi tamamla. | `DgAuthGate` |
| **E-onay** | Onay | Silme (taslak, yorum, kalem, liste, koleksiyon), çıkış, hesap dondur/sil, değişiklikleri at. Sheet iskeletinde iki eşit düğme; yıkıcı eylem kırmızı + `trash-can`. | `DgConfirmSheet` |
| **E-başarı** | Başarı snackbar'ı | “Kaydedildi”, “Listeye eklendi”, “Takip etmeye başladın.” vb. Geri alınabilir eylemde “Geri al”. | `DgSnackbar(success)` |
| **E-hata** | Hata snackbar'ı | “Cihaz kaydı yapılamadı. Tekrar dene.” vb. | `DgSnackbar(error)` |
| **E-form** | Form doğrulama hatası | Alan altında meta metin + ikon; ilk hatalı alana odak; gönder düğmesi devre dışı değil. Sunucu 422 mesajları alanlara eşlenir. | `DgTextField(error)` |
| **E-moder** | Moderasyonda | Yorum/tarif/püf “denetim sonrası yayınlanacak”: kartta “İncelemede” rozeti. | `DgBadge` (*önerdiğim ek hal*) |

---

## 3. Sayfa envanteri

Sütunlar: **Mobil sayfa** · **Web adresi** · **Amaç ve web özellikleri** (hiçbiri eksilmez) · **Kök / bileşenler** · **Özel etkileşim** · **Haller** · **Öncelik**.

### 3.0 Kök ekranlar (var; Faz 2'de ortak katmana bağlanır)

| # | Mobil sayfa | Web | Özellikler | Kök / bileşenler | Özel etkileşim | Haller | Ö |
|---|---|---|---|---|---|---|---|
| R1 | Ana Sayfa | `/` | Hero (Ne pişirsem? + genel arama + 5 slaytlık öneri); En son eklenen tarifler; Kategoriler & Dünya Mutfakları; Dolapta Ne Var? (dolaptakiler/hariç tut, popüler malzemeler, “N tarif bul”); Video Mutfağı; Şefler & Yazarlar (+ Sen de Şef Ol); Topluluğa Katıl. **Web'de olup ana sayfada olmayanlar:** “Bu hafta öne çıkanlar” (Şefin Tercihi rozeti), Günün Tarifi, Pro bandı “Haftanı tek ekranda planla”, hero sayaçları ve popüler çipleri. Erişim yolları G3/G1'de; docs/33'te izlenir. | A · header(home), hero, `DgFeatureCarousel`, `DgPairCarousel`, `DgSegmented`, `DgChip`, `DgVideoCard`, `DgChefCard`, `DgBottomNav` | Hero otomatik geçiş, dolap modülü | K-mi/üy, V-yük/dolu/kısmi/uzun, S-off, E-gk | P1 |
| R2 | Tarif Listesi | `/tarifler` | Banner (Tarifler + 3 sayaç), arama, Kategoriler/Dünya Mutfakları sekmesi + şerit, Tema & pişirme tipi, sonuç sayısı, sıralama (4), kart/satır görünümü, öne çıkan slider, ızgara, sayfalama, filtre sheet'i (9 facet, tek açık akordeon, seçili çipler, Temizle, “N tarifi göster”). Canlıda Beslenme / Tip **21** seçenek (Pesketaryen, Kuruyemiş İçermez, Düşük Karbonhidratlı, Ketojenik dahil; repo seed'i 17); boş durum “Aramana uyan tarif bulunamadı / Yazımı kontrol et, daha kısa bir kelime dene veya filtreleri kaldır.” + [Aramayı ve filtreleri temizle]; sıralama parametresi canlıda tireli (`en-yeni`); “Ne pişireceğine karar veremedin mi?” liste içi kartı (v3'te kaldırıldı); numaralı sayfalama 30/sayfa | L | Yapışan panel; facet sayıları | K-mi/üy, V-yük/dolu/boş-filtre/kısmi/uzun, S-off/500, E-gk | P1 |
| R3 | Tarif Detay | `/tarif/{slug}` | Kapak + galeri, kategori, başlık, alt başlık, puan/değerlendirme/maliyet/görüntülenme; özet (süre, zorluk, porsiyon); mutfak + Özellikler çipleri; açıklama; sekmeler Malzemeler/Hazırlanış/Yorumlar; porsiyon; malzeme listesi (işaret, alışveriş, alternatif, ölçü karşılığı); Tümünü Listeye Ekle; adımlar (A−/A+, tamamla, zamanlayıcı); yorumlar (özet, filtre, kart, değerlendir); Besin Değerleri; şef kartı (takip, abone); Hatırlatma/Alerjen/Editör Notu; Tarif bilgileri; Benzer Tarifler; alt çubuk (Ben de Yaptım, Eline Sağlık, Yorumlar, Pişirmeye Başla); header (kaydet, paylaş, daha fazla); paylaş sheet'i; pişirme modu (tam ekran) | D | Yapışan sekme; pişirme modu; tam ekran galeri | K-mi/üy/pro0 (abonelere özel tarif → Pro kapısı), V-yük/dolu/kısmi (rozet/video/ses/beceri/foto duvarı verisi yok → doğrulanmadı), S-off, E-gk/onay/başarı/form | P1 |

**Detay için web'de olup mobilde eksik ya da doğrulanmamış:**
- “Bu tarifte gereken beceriler”, sesli tarif, video, Editör Onaylı/Diyetisyen rozetleri, “Ben de Yaptım” foto duvarı, Alternatif Tarifler: kod yolu var, veride yok.
- Yazdır (“…” menüsünde).
- Favori (web'de detayda da yok).
- Yorum “Daha fazla”, yanıt, bildir, beğen (önizleme).

### 3.1 G1 · Hesap ve giriş

| # | Mobil sayfa | Web | Amaç ve özellikler (web birebir) | Kök / bileşenler | Özel etkileşim | Haller | Ö |
|---|---|---|---|---|---|---|---|
| H1 | Giriş | `/giris` (canlı) | “Tekrar hoş geldin” / “Kaldığın yerden devam et — defterin seni bekliyor.”; [Google ile devam et] [Facebook ile devam et] (canlıda görünür; repo'da “Yakında”, işlevi doğrulanamadı) “veya e-posta ile”; E-posta*, Şifre* (göster/gizle), Beni hatırla, Şifremi unuttum, “Hesabın yok mu? Hemen Kayıt Ol”; hata “Giriş yapılamadı”; 2FA gerekirse H6. Üyelik avantajları (4 madde, canlı sol pano) tanıtım/giriş üstünde. | D (form sheet dili) · `DgTextField`, `DgPasswordField`, `DgCheckbox`, `DgButton`, `DgSegmented` (Giriş/Kayıt) | `donus` + bekleyen eylem; başarıda geri dön | K-mi, E-form (401 “E-posta adresi veya şifre hatalı.”), S-429 (5/dk), S-off | P1 |
| H2 | Kayıt | `/kayit` (canlı) | “Aramıza katıl” / “1 dakikada hesabını oluştur, mutfak defterini açalım.”; [Google ile kayıt ol] [Facebook ile kayıt ol]; Ad*, Soyad*, E-posta*, Şifre* (kural ipucu); Üyelik Sözleşmesi*, Aydınlatma ve KVKK*; “Hesabımı Oluştur”. Başarı: “Hesabın hazır, hoş geldin! / Doğrulama bağlantısını e-postana gönderdik…” + [Mutfak Profilim]. Repo'da ayrıca telefon + ülke kodu, şifre tekrar, kampanya onayı (canlı formda görülmedi → canlı esas). Sonrası tercihler (G7). | aynı | Şifre kuralı canlı göstergesi (min 8, büyük/küçük, rakam, sembol); yasal metinler sheet'te | K-mi, E-form, S-429 (3/dk) | P1 |
| H3 | Şifremi unuttum | `/giris` paneli (ayrı URL yok) | “Şifreni mi unuttun?” / “Sorun değil. E-posta adresini yaz, sıfırlama bağlantısını gönderelim.” → “Sıfırlama Bağlantısı Gönder”; “Bu form istismara karşı hız sınırlamasıyla korunur.”; Girişe dön; başarı durumu | aynı | — | E-form, E-başarı | P1 |
| H4 | Yeni şifre belirle | `/giris` yeni şifre paneli | “Yeni şifreni belirle”; yeni şifre + tekrar; 5 kural (8 karakter, büyük harf, küçük harf, rakam, özel karakter); “Şifremi Güncelle”; “Bağlantı 30 dakika geçerlidir ve yalnız bir kez kullanılabilir.” | aynı | Derin bağlantıdan açılır | süresi dolmuş bağlantı (*hal*), E-form | P2 |
| H5 | E-posta doğrula | `/email/verify` | “E-postanı doğrula”; kilitli işlemler listesi; “Doğrulama Bağlantısını Yeniden Gönder”; `/e-posta-dogrulandi` başarı | `DgResultState` | — | K-dog | P2 |
| H6 | İki adımlı doğrulama | `/two-factor-challenge` | Kod ya da kurtarma kodu | `DgTextField` (kod) | — | E-form | P3 |
| H7 | Profilim (kendi profil) | `/sefler/{username}` (sahip görünümü; canlıda “Mutfak Defteri”), `/hesabim/ayarlar#profil` (“Mutfak Profilim”) | Kapak/banner, avatar, ad, unvan/kademe, takipçi/takip, “Profili Düzenle”. Sekmeler: Tarifleri, Püf Noktaları, Üyelik, Kaydedilenler, Menüleri; yalnız sahibine Abonelerim, Kazançlarım, Denedikleri, Favorileri; Takipçi/Takip alt sekmeleri | D (şef kartı = profil başı), L (sekmeli ızgara) · `DgChefProfileCard`, `DgSegmented`, `DgRecipeCard` | Sekmeler kaydırılabilir şerit | K-üy (misafir → giriş), V-boş-ilk her sekmede | P1 |
| H8 | Profil düzenle | `/hesabim?tab=profil` | Ad*, Soyad*, Kullanıcı adı*, E-posta*, Telefon, Doğum tarihi, Cinsiyet, Hakkımda (160); avatar (≥200×200), banner (≥1200×400) | Form · `DgTextField`, `DgTextArea`, `DgSelectSheet`, görsel seçici | E-posta değişirse doğrulama sıfırlanır (uyarı) | E-form, E-başarı, S-izin (galeri) | P1 |
| H9 | Kaydettiklerim | `/hesabim/mutfak-defterim` (canlı alt menü 4. öğe; misafire 302 → /giris) | Kaydedilen tarifler + koleksiyonlar (klasör: oluştur/yeniden adlandır/sil, ad ≤60, aynı ad engelli); kaydederken koleksiyon seçimi | L (ızgara) · `DgRecipeCard`, `DgChip` (koleksiyon), `DgConfirmSheet` | Kaydet → koleksiyon seç sheet'i | K-üy, V-boş-ilk, E-onay (koleksiyon sil) | P1 |
| H10 | Tariflerim | `/hesabim/mutfak-defterim#tariflerim` (+ `#puf` püf noktalarım) | Tariflerim ve Paylaşımlarım: durum rozetleri Taslak / Onay Bekliyor / Yayında / Gizli / Reddedildi; düzenle (yalnız Taslak/Reddedildi); Tabaktan Tarif özel taslakları (etiketli, ayrı) | L · `DgRecipeCard(row)`, `DgBadge` | — | K-üy, V-boş-ilk, E-moder | P1 |
| H11 | Tarif ekle / düzenle | `/tarif-ekle` | 4 adım: (1) Bilgi: Tarif Adı* (80), Kategori* (34), Mutfak (50), Açıklama ve hikâye*, **Saklama ve hatırlatma**, **Alerjen notu** (canlı); “AI ile İyileştir” pasif (repo). (2) Görseller: kapak + ≤7 galeri, video bağlantısı. (3) Künye & Malzemeler: Porsiyon* + birim (kişilik/porsiyon/porsiyonluk/adet/dilim/parça/kâse/bardak/fincan/çömlek), Hazırlık*, Pişirme*, Zorluk*, Pişirme Derecesi; malzeme satırı/grup, **her malzemeye “Alternatifi”**. (4) Adımlar: adım metni, süre, ≤3 görsel; Abonelere Özel; yayın kartı (görünürlük, sayaçlar), **Taslağı önizle** / Onaya gönder / Taslak kaydet; “Editör incelemesi ortalama 24–48 saat sürer”; görseller JPG/PNG/WebP/AVIF/HEIC/GIF ≥800px ≤10 MB. Canlıda misafire açık (200), gönderim davranışı doğrulanamadı. Otomatik kayıt 35 sn. | Tabaktan “Düzenle” formu (kökten) + `DgStepper`, `DgTextField`, `DgChip` | Satır ekle/sil/taşı; otomatik kayıt göstergesi; çakışma (409) uyarısı | K-üy/dog, E-form/onay (değişiklikleri at)/başarı, S-off (yerel taslak) | P1 |
| H12 | Alışveriş listesi | canlı: `/hesabim/menulerim#alisveris` (ayrı sayfa yok; `/alisveris-listesi` 404, bkz. §9) | Reyona göre kalemler (menüler + haftalık menü + kalıcı kalemler, birleşen miktarlar); işaretle; elle kalem ekle (ad ≤120, miktar, birim); işaretlileri temizle; koleksiyondan ekle; arşivle (başlık); geçmiş + detay. Fiyat yok. | D (malzeme satırı) · `DgIngredientRow`, `DgAccordion` (reyon), `DgConfirmSheet` | Kaydırarak sil (Flutter `Dismissible`; HTML'de satır eylemi) | K-üy, V-boş-ilk, E-onay/başarı | P1 |
| H13 | Rozetlerim | `/hesabim/rozetlerim` | “Şef merdiveninde neredesin?” (kademe, puan, sonraki kademe); “Rozet koleksiyonun” (7 kategori, nadirlik); “Kademe geçmişin & yıllık ödüllerin”; “Topluluktaki yerin” (Takip Ettiklerim, Takipçilerim, Topluluk Hareketlerim, Onur Listesi) | L/D · `DgBadge`, ilerleme çubuğu, `DgSegmented` | — | K-üy, V-boş-ilk | P2 |
| H14 | Menülerim | `/hesabim/menulerim` | Menü listesi; menü detayı (kaplar); Menüyü Pişir (N4) | L · kart, `DgActionCard` | — | K-üy, V-boş-ilk, E-onay | P2 |
| H15 | Haftalık Menü (Pro) | canlı: `/hesabim/menulerim` içinde (ana sayfa Pro bandı “Menünü Planla”); `/haftalik-menu` 404 | 7 gün × Kahvaltı/Öğle/Akşam + 2 ara öğün; hücreye tarif (Kaydettikleri + Favorileri); satır adı; Otomatik oluştur; günlük kalori; reyonlu haftalık alışveriş listesi | Yeni ızgara · `DgSegmented` (gün), `DgRecipeCard(row)` | Pro değilse salt okunur + Pro kapısı | K-pro/pro0 | P2 |
| H16 | Pro ve Üyeliğim | `/pro` (canlı: “Pro planları henüz satışa açılmadı”; Ücretsiz ₺0 · Pro ₺49/ay “Satışa Açılmadı” · Pro Max AI), `/hesabim/paketlerim`, `/hesabim/odemelerim` | Plan karşılaştırma (Pro, aylık/yıllık), haklar; Üyeliğim: durum, Planı Değiştir, duraklat 1/2/3 ay, iptal/devam, fatura geçmişi | `DgActionCard`, `DgSegmented` (dönem) | **Ödeme mobilde mağaza içi satın alma kuralına tabidir; karar gerekir.** Fiyat uydurulmaz (veri: canlıdan). | K-pro/pro0 | P2 |
| H17 | Şef abonelikleri | `/hesabim?tab=abonelikler`, `/uretici/{plan}/odeme` | Abone olunan üreticiler, iptal; Üretici Üyeliği sayfası | `DgChefTile` | Plan verisi yoksa yer tutucu (detayda var) | K-üy | P3 |

### 3.2 G2 · Tarif bulma

| # | Mobil sayfa | Web | Amaç ve özellikler | Kök / bileşenler | Özel etkileşim | Haller | Ö |
|---|---|---|---|---|---|---|---|
| N1 | Ne Pişirsem · sihirbaz | `/bugun-ne-pisirsem` (sekme “Tarif Ara”) | 4 adım: (1) “Ne pişirmek istiyorsun?” tek seçim: Çorba / Başlangıç · Ana Yemek · Yan Lezzet · Kahvaltılık · Tatlı · İçecek (her biri alt cümleli). (2) “Ne kadar vaktin var?”: 15 dk · 30 dk · 1 saate kadar · Fark etmez. (3) “Hangi zorlukta olsun?”: Çok kolay · Kolay · Orta · Fark etmez. (4) “Canın ne çekiyor?” çoklu, boş geçilebilir: Hafif & Sağlıklı · Doyurucu · Pratik · Etsiz · Tatlı kaçamak · Geleneksel. Sonuç: seçim çipleri + “Seçimleri Düzenle”, “N tarif sana uygun / Eşleşme oranına göre sıralandı.”, kartta “%X uygun”, ≤30; boş: “Bu seçimlere uygun tarif bulamadık” + “Baştan dene” | `DgStepper`, seçim kartı (`DgActionCard` tekli seçim varyantı), L sonuç ızgarası | 1–3. adımda tek seçimde 220 ms sonra otomatik ilerle; geri adım; seçimsiz Devam kapalı | K-mi/üy, V-boş-filtre, S-off | P1 |
| N2 | Ne Pişirsem · Yemek Modu | aynı sayfa sekme “Yemek Modu” | 20 yemek modu; alt sekmeler “Sıfırdan Kur” (mod havuzu, kategori şeridi, 24/sayfa, Menü Tepsisi: ad ≤48, “Menüyü Kur”, “Tepsiyi temizle”) / “Hazır Menüler (n)” (başlık, lead, N tarif, 4 görsel, “Menüyü Aç”) | `DgSegmented`, `DgCategoryTile`, `DgRecipeCard(row)` | Tepsi alt sheet'i (sabit sayaçlı) | K-mi (Menüyü Kur → E-gk), V-boş | P2 |
| N3 | Menü düzenle | `bnp.menu.*` | Menü adı (≤60); kap ekle/değiştir/çıkar (son kap çıkarılamaz: “Menüde en az bir kap kalmalı.”); “Deftere Kaydet” (webde sunucuya gitmiyor); “Menülerim” | `DgRecipeCard(row)`, `DgConfirmSheet` | — | K-üy, E-form | P2 |
| N4 | Menüyü Pişir | `pisirme-oturumu` | Servis sırası (tatlı → ana → başlangıç → kahvaltı → içecek → yan); plan/adım/bitti fazları; kap sırası taşı/sıfırla (plan fazında); sayaç; “Menü tamamlandı, afiyet olsun!” + “Menülerime Git” | D pişirme modu (`cm2`) | Tam ekran, ekran açık | K-üy, E-onay (çık) | P2 |
| D1 | Dolapta Ne Var | `/dolapta-ne-var` | Sekmeler Dolaptakiler / Hariç Tuttuklarım. Hariç modları: Sevmiyorum · Tüketmiyorum (canlı hızlı seçim: Vegan · Vejetaryen · Pesketaryen · İlave şeker tüketmiyorum · Çiğ ürün tüketmiyorum; + tek tek; repo'daki “Et/Balık/Süt ürünü/Yumurta istemiyorum” canlıda yok) · Alerjim Var (11 hazır + tek tek) · Hassasiyetim Var (11; Kesinlikle gösterme / Uyararak göster). Malzeme arama “Elindeki malzeme — örn. yumurta, tavuk, peynir…” (8 akordeon grup, 185 malzeme: Sebzeler 21 · Meyveler 22 · Kırmızı Et 18 · Tavuk ve Kümes 13 · Balık ve Deniz 21 · Süt Ürünleri 18 · Tahıllar ve Bakliyatlar 34 · Baharatlar, Otlar ve Soslar 38) + sesli giriş; “Elinde N malzeme”, “Tümünü temizle”; boş “Dolabın boş görünüyor…”. Filtreler: Besin değeri (porsiyon kalorisi 0–1200, protein 15/25/35 g+) · Vakit & zorluk (6 süre, 5 zorluk). Sonuç: “N tarif bulundu / en yakın sonuç”, “elindeki N malzemeyle · N hariç”, sonuç içinde arama, kartta “Tam eşleşme / N eksik” + sahip/eksik çipleri | A dolap modülü (genişletilir) + L sonuç · `DgSearchField`, `DgChip` (dolapta/hariç), `DgSegmented`, `DgAccordion`, `DgRecipeCard` | Ana sayfa modülü ile aynı durum; “Daha fazla süzgeç” bu sayfaya gelir. Kayıtlı dolap web'de yok → yalnız cihaz içi, açıkça etiketli (karar). | K-mi/üy, V-boş-ilk/boş-filtre, S-off | P1 |
| T1 | Tabaktan Tarif | yok (mobil ekstra; web'de AI yok) | **Kökten taşınacak, kanona uyarlanacak** (§4) | Kök `tabaktan-tarif.html` + `app.js:9180–9313` | Kamera → 3 aşamalı analiz → sonuç (Benzer tarifler / Senin tarifin) → düzenle/kaydet/yayınla/sil | K-mi/üy/pro/pro0 (deneme 3, hak bitti, günlük limit), S-izin/off, 6 hata hâli, E-gk/onay/başarı | P1 |

### 3.3 G3 · Tarif türevleri

| # | Mobil sayfa | Web | Özellikler | Kök | Haller | Ö |
|---|---|---|---|---|---|---|
| G3-1 | Kategori | `/tarifler/kategori/{slug}` | Banner (Kategori + ad/açıklama), “Alt kategoriler” şeridi, kategori filtresi kilitli, alt kategori facet'i, tema şeridi ve bulucu köprüsü yok; Sponsorlu bant (reklam: bu tur hariç) | L (banner parametreli: başlık/alt satır/görsel) | L ile aynı | P1 |
| G3-2 | Dünya Mutfağı | `/tarifler?mutfak[]=` (ayrı sayfa yok) | Bayraklı banner varyantı + mutfak filtresi | L | aynı | P1 |
| G3-3 | Tema | `/tarifler?yemek_modu=`/`beslenme=` | Tema şeridi seçimi | L | aynı | P2 |
| G3-4 | Koleksiyon **(canlıda 404 → §9)** | `/koleksiyon/{slug}` | Derleyen, tarif sayısı, ~N dk; Deftere Ekle / Paylaş (web'de pasif “Yakında”); “Koleksiyondaki tarifler / Editör sıralaması — en pratikten başlar” (01/02 rozetli); Koleksiyonlar Dizini | L (sıralı satır kart) | V-boş | P2 |
| G3-5 | Günün Menüsü **(canlıda 404 → §9)** | `/gunun-menusu?tarih=` | 4 yuva Çorba · Ana Yemek · Yan Lezzet · Tatlı; Önceki/Sonraki gün; ~N dk, N malzeme; Menüyü Deftere Ekle / Alışveriş Listesi Çıkar (web'de yalnız giriş kapısı); Geçmiş Günler (7) | L + `DgRecipeCard(row)` | E-gk | P2 |
| G3-6 | Sezon **(canlıda 404 → §9)** | `/sezon/{season}` | “Sezon Mutfağı”, hızlı geçiş çipleri, “Bugünün Menüsü”, koleksiyonlar şeridi, “Menüyü Gör” | L | V-boş (“Bu sezon için koleksiyon eklenmedi”) | P3 |
| G3-7 | Derleme (SEO sayfası) **(canlıda 404 → §9)** | `/{slug}` | Kilitli taban filtre, kategori/süre/zorluk/beslenme facet'leri, 4 sıralama, “Kısa bilgiler”, “Sıkça Sorulanlar” akordeonu | L + `DgAccordion` | aynı | P3 |
| G3-8 | Günün Tarifi / Bu hafta öne çıkanlar | ana sayfa bölümleri (web) | Mobil ana sayfada yok → liste ön ayarı (`?sirala=one-cikan`) ya da ana sayfa kararı | L | — | P2 (karar) |

### 3.4 G4 · İçerik ve topluluk

| # | Mobil sayfa | Web | Özellikler | Kök / bileşenler | Haller | Ö |
|---|---|---|---|---|---|---|
| V1 | Videolar (Video Mutfağı) | `/video-mutfagi` | Banner sayaçları Video/Seri/İzlenme; Haftanın Videosu; Sıradaki (3); Video Serileri (≤6 + Tüm Seriler); Dada Akış (kısa videolar ≤12); Video Mutfağı Şefleri (Abone Ol = takip); Video Arşivi (Tümü/Tarif/Teknik/Seri/Kısa, 24/sayfa, Daha Fazla Video); Pro kilidi “Bu içerik Pro üyelere özel” + “Pro'ya Yükselt / Belki sonra”. Canlıda bütün kartlarda “Video kaynağı henüz eklenmedi”; video detay sayfası yok (oynatıcı modal); `/video-mutfagi/arsiv` 404 | A video modülü + L · `DgVideoCard`, `DgSegmented`, `DgChefTile` | K-pro0 (kilitli), V-yük/boş, S-off | P1 |
| V2 | Video oynatıcı | (web'de modal) | Oynatıcı, başlık, şef, süre, izlenme, ilgili tarif; izlenme kaydı; Pro kilidi | Tam ekran (`DgVideoPlayer`, yeni; Flutter `video_player`) | Oynatma kaynağı prototip verisinde yok → dürüst bilgi | P1 |
| V3 | Seriler / Seri detay | `/video-mutfagi/seriler`, `/seri/{slug}` | Fragman, N bölüm, N abone, N/T izlendi, İzlemeye Devam Et, Seriye Abone Ol, bölüm durumları (İzlendi/Devam Et/kilit), Diğer Seriler | L/D | K-üy (ilerleme) | P2 |
| V4 | Kısa video akışı | ana bölüm “Dada Akış” | Dikey akış; Takip/beğeni/Kaydet/Paylaş (web'de yalnız istemci) | Tam ekran dikey `PageView` | — | P3 |
| P1 | Püf Noktaları | `/puf-noktalari` | Banner sayaçları Püf noktası/Kategori/Toplam okunma; kategori filtresi (10 + Malzeme Rehberi, “Tümü” sayılı); sıralama En Yeni / En Çok Okunan (`?sira=yeni|okunan`); 12/sayfa (canlı 2.163 püf, 11 kategori); boş: “Bu kategoride püf noktası bulunamadı” + “Filtreyi Temizle” | L | V-boş-filtre | P1 |
| P2 | Püf detay | `/puf-noktalari/{slug}` | Görselli hero (“Mutfak Sırrı · {kategori}”, yazar, tarih, okunma, yorum sayısı); içerik blokları; etiketler; paylaş (X, WhatsApp, E-posta, kopyala); değerlendirme özeti (“%N faydalı buldu”); yapışkan çubuk **Faydalı Buldum (N) · Yorumlar · Kaydet · Paylaş**; aynı kategoriden 4 püf + 3 tarif; yorumlar (kullanıcı püflerinde) | D (metin + yorum) | E-gk | P1 |
| P3 | Püf ekle | `/puf-noktasi-ekle` | Başlık* (80), Kategori*, Etiket, Kapak ≤6, içerik blokları; Taslak Kaydet / Onaya Gönder; “Püf noktan incelemeye gönderildi.” | H11 form ailesi | K-dog, E-form/moder | P2 |
| C1 | Şefler | `/sefler` | Ada göre arama, takipçiye göre sıra, 24/sayfa; kart: Öne Çıkan, Onaylı Şef, uzmanlık, tarif sayısı / “Topluluk üyesi”, + Takip Et / Takiptesin; Sen de Şef Ol | L · `DgChefTile`/`DgChefCard` | E-gk | P1 |
| C2 | Şef profili | `/sefler/{username}` | H7'nin ziyaretçi görünümü; Takip Et/Takip Ediliyor; Üye Ol (üretici planı varsa); kilitli sekmede “Takip Et, Görmeye Başla” | D şef kartı + L | K-mi/üy, V-boş | P1 |
| C3 | Liderlik **(canlıda 404 → §9)** | `/liderlik` | Aktif sezon ilk 100, kendi sıran | L satır | — | P3 |
| C4 | Onur Listesi | `/onur-listesi` (canlı 200) | “Yıl yıl “Yılın Şefi” ve sezon ilk 10'u”; boş durum “Henüz kapanmış bir sezon yok…” | L | — | P3 |

### 3.5 G5 · Arama, bildirimler, ayarlar

| # | Mobil sayfa | Web | Özellikler | Kök / bileşenler | Haller | Ö |
|---|---|---|---|---|---|---|
| S1 | Arama | `/ara`, `/ara/oneriler` | Canlı: H1 “DadaGastro'da ara”, yer tutucu **“Tarif, malzeme veya şef ara…”** (prototipte “Tarif, şef, video ara”; repo “Tarif, video, şef ya da yazı ara...”); öneriler (≥2 karakter, gruplu); canlı sekmeler **Tümü · Tarifler · Püf Noktaları · Mutfak Rehberi · Şefler** (sayılı; Mutfak Rehberi = Mutfak Sırları içeriği → kapsam kararı; repo'daki Videolar/Yazılar sekmesi canlıda yok); “[Tarifleri filtrele →] / [Püf noktalarını filtrele →]”; “:n sonuç bulundu”; sıfır sonuç + “Şunu mu demek istedin:” + Popüler; Popüler Aramalar (≤12); Son Aramaların (üye, ≤10, sil) / misafire “Son aramalarını görmek için giriş yap.” | **Kökten taşınacak**: `v3-app/arama.html` (kanon dışı; geri ve sonuç hedefleri eski) · `DgSearchField`, `DgSegmented`, kartlar | K-mi/üy, V-boş-ara, V-boş-ilk (geçmiş yok) | P1 |
| S2 | Bildirimler | `/hesabim/bildirimler` (canlı; zil yalnız üyede) | Bugün/Dün/Eski grupları; çipler Tümü, Takip, Yorum, Beğeni, Sistem; tümünü okundu; tek okundu; sil; türü kapat/aç; tarih süzgeci; bildirime dokununca hedefe git. Türler: tarif onay/red, favori, yorum, yanıt, abonelik bitti, püf onay/red, takip | L satır · `DgListTile`, `DgChip` | K-üy (misafir → giriş), V-boş-ilk, E-onay (sil) | P1 |
| S3 | Ayarlar (Hesap ve Ayarlar) | `/hesabim/ayarlar` (canlı; alt menü Profil hedefi) | Bölümler: Profil (H8) · Beslenme Tercihlerim (diyet 8, mutfak, alerjen 10) · Mutfak Tercihlerim (ekipman 10, sevmediğim malzemeler, kişi 1–20, süre 5–480, zorluk) · Dil ve Bölge (arayüz dili, saat dilimi) · Birim Tercihleri (metrik/emperyal) · Şifre & Güvenlik (şifre değiştir, giriş yöntemleri, 2FA, diğer oturumları kapat, cihaz geçmişi) · Gizlilik (profil görünürlüğü 3, e-posta/telefon göster, denediklerim, takipçiler herkese açık, arama motoru) + Verilerimi İndir · Bildirimler (6 olay × e-posta/push) · Aboneliklerim · Üyeliğim · Kartlarım · Hesabı Dondur (5 süre) · Hesabımı Sil (neden, onay, “HESABIMI SİL” yazma; 30 gün) | `DgListTile`, `DgSwitch`, `DgSelectSheet`, `DgConfirmSheet` | E-onay/form/başarı, S-izin (bildirim) | P1 |
| S4 | Uygulama ayarları (mobile özel; S3 içinde bölüm) | — | Dil: Türkçe/English/Español/Русский/Deutsch (web yalnız TR/EN; çeviri yok, tercih saklanır); bildirim izni ve kategori anahtarları; önbelleği temizle; “Prototipi baştan başlat”; sürüm | `DgListTile`, `DgSwitch` | S-izin | P1 |
| S5 | Destek Merkezi | `/hesabim/destek*` | Talepler (Tümü / Açık / Yanıt bekleyen / Çözülen / Kapatılan), yeni talep (kategori 8, konu, metin, öncelik, ek), talep detayı + yanıt, kapat/yeniden aç; Çözüm Merkezi (SSS) | L/D + form | E-form | P3 |
| S6 | Görüş Bildir | sheet (`feedback.store`) | Konu: Önerim var · Bir sorum var · Teknik sorun · İhlal bildirimi · Puan ver; KVKK onayı | `DgBottomSheet` + form | E-form/başarı | P3 |

### 3.6 G6 · Yasal, kurumsal, sistem

| # | Mobil sayfa | Web | Özellikler | Kök / bileşenler | Ö |
|---|---|---|---|---|---|
| Y1 | Yasal Metinler (dizin) | `/yasal` | 4 grup, 23 kalem: (A) Kullanım Koşulları, Topluluk Kuralları, Yaş Sınırı, Hesap Politikası. (B) İçerik ve Telif, Telif İhlali Bildirimi, Marka Bildirimi, İtiraz. (C) Gizlilik, KVKK Aydınlatma, Çerez, Veri Sahibi Başvuru Formu, Veri İmha, Veri İhlali, Güvenlik Bildirimi. (D) Sorumluluk Reddi, Künye, Ön Bilgilendirme, Mesafeli Satış, İade Koşulları, Editoryal Politika, Sponsorluk Politikası, Erişilebilirlik. Ayrıca Üyelik Sözleşmesi, Aydınlatma. | `DgListTile` + `DgAccordion` | P2 |
| Y2 | Yasal metin (tek şablon) | `/yasal/{slug}` | Başlık, sürüm, metin; taslaksa “Durum: Taslak — hukuki inceleme bekliyor” | D (metin, `.prose`) · API `GET legal/{slug}` **var** | P2 |
| Y3 | Hakkımızda | `/hakkimizda` | Sayfa metni + istatistik + editör ekibi + şirket | D | P3 |
| Y4 | SSS / Çözüm Merkezi | `/sss` **canlıda 404**; canlıda SSS yalnız Pro sayfasında ve `/hesabim/cozum-merkezi` (üye) içinde → §9 | 5 kategori akordeonu | `DgAccordion` | P2 |
| Y5 | İletişim | `/iletisim` | Ad*, Soyad*, E-posta*, Telefon, Konu* (7), Mesaj* (1000), KVKK*; `?konu=` | Form | P2 |
| Y6 | Künye | `/kunye` | Ticari Ünvan … Yayın Yönetmeni (boşlar gizli) | D | P3 |
| Y7 | Marka İş Birlikleri / Sponsorlar | `/marka-is-birlikleri` (canlı; `/reklam-ver` 301), `/sponsorlar` 404 | Kurumsal (reklam turu hariç tutulduğu için kapsam kararı) | — | P3 (karar) |
| E1 | Bulunamadı (404) | 404 | Canlı: “Aradığın sayfayı bulamadık” / “Adres değişmiş, bağlantı eskimiş ya da yazarken bir harf kaymış olabilir. Buradan devam edebilirsin.”; arama (“Örneğin: kuru fasulye, mercimek çorbası, 30 dakika…”); Ana sayfa · DadaGastro Tarifleri · Çözüm Merkezi; “Sık gidilen sayfalar” (repo metni “Bu tarif menüde yok” canlıda değil) | `DgResultState` + kart | P1 |
| E2 | Yetki yok (403) | 403 | “Bu sayfaya erişim yetkin yok”; Ana Sayfa / Çıkış / Tariflere Göz At | `DgResultState` | P2 |
| E3 | Oturum doldu (419/401) | 419 | “Oturumun zaman aşımına uğradı”; Sayfayı Yenile / Ana Sayfa | `DgResultState` | P1 |
| E4 | Hata (500) | 500 | “Bir şeyler ters gitti” / “Beklenmedik bir hata oluştu…”; Ana sayfaya dön | `DgResultState` | P1 |
| E5 | Bakım | 503 | “Bakımdayız” / “Kısa bir bakım çalışması yürütüyoruz…” | `DgResultState` | P2 |
| E6 | Bağlantı başka hesaba ait | link-wrong-account | “Bu bağlantı başka bir hesaba ait”; Çıkış yap ve devam et / Bu hesapta kal | `DgResultState` | P3 |
| E7 | E-posta doğrulaması gerekli | verify-action | H5 ile birleşir | — | P2 |
| M1 | Bağlantı yok (mobile özel) | — | Tam sayfa + şerit; Yeniden dene | `DgErrorState(offline)` | P1 |
| M2 | Güncelleme gerekli (mobile özel) | — | Kapatılamaz; Güncelle | `DgResultState` | P2 |

### 3.7 G7 · Açılış, tanıtım, tercihler (mobile özel; web onboarding'i içerir)

| # | Mobil sayfa | Web karşılığı | Özellikler | Kök / bileşenler | Haller | Ö |
|---|---|---|---|---|---|---|
| O1 | Açılış (splash) | — | Primary zemin + resmi beyaz logo; ilk açılış kararı | Marka varlığı **kararı bekliyor** (docs/50 §11.4) | K-yeni | P1 |
| O2 | Tanıtım (onboarding) | — | **Karar (docs/54 §2):** A) karusel yok, doğrudan ana sayfa; B) tek ekranlık karşılama (gerçek modüller: Tarifler, Ne Pişirsem, Dolapta Ne Var, Tabaktan Tarif; uydurma slogan/sayaç yok) + isteğe bağlı tercihler / “Atla”. | A hero dili, `DgStepper` | K-yeni | P1 |
| O3 | Tercihler | repo `/onboarding` (4 adım; **canlıda 404**) | (1) “Beslenme tarzın nasıl?”: Kısıtlamam Yok, Vejetaryen, Vegan, Glutensiz, Laktozsuz, Düşük Kalori, Ketojenik, Akdeniz. (2) “Hangi mutfakları seviyorsun?”: 12 mutfak. (3) “Uzak durduğun bir şey var mı?”: 10 alerjen + “Bu liste tıbbi tavsiye değildir…”. (4) “Nelerden haberdar olmak istersin?”: Haftalık Menü (E-posta), Takip & Yorum (Push), Kampanya (E-posta). Düğmeler: Bu adımı atla, Alerjim yok atla, Şimdilik atla, Kurulumu Tamamla. **Seviye** web onboarding'inde yok; Mutfak Tercihlerim'deki “Tercih ettiğim zorluk” buraya alınabilir (karar). API `POST account/onboarding` **var**. | `DgStepper`, `DgChip` (çoklu), `DgButton` | K-yeni, E-form | P1 |
| O4 | İzinler | — | Bildirim izni (uygulama içi açıklama → sistem istemi); kamera izni Tabaktan Tarif'te ilk kullanımda | `DgPermissionPrompt` | S-izin | P1 |
| O5 | Giriş/kayıt mobil akışı | `/giris` | Tanıtım sonunda “Giriş yap / Üye ol / Misafir olarak devam et” | H1/H2 | K-mi | P1 |

---

## 4. Tabaktan Tarif: kökten taşınacak, kanona uyarlanacak

**Kaynak:** kök `tabaktan-tarif.html` (kabuk) + `app.js:9180` (giriş paneli) + `app.js:9237–9313` (akış); stiller `app.css:384–446`; docs/13, 24, 25, 26. v3-app kopyası `runtime.js` ile aynı koddur; v3'te hedef sayfalar (`index.html`, `tarifler.html`, `tarif-detay.html`) olmadığı için Kapat, “Tarife git”, “Şimdilik değil” ve Dolap araması bugün **404** veriyor (`runtime.js:9243` `donus` regex'i ana-v3/liste-v2/detay-v2'yi tanımıyor).

### 4.1 Aynen korunacak akış

1. **Giriş:** Orta düğme → Tarif bul paneli → “Tabaktan Tarif” (Pro rozeti) ya da çekmece satırı.
2. **Erişim:** Pro değilse misafire giriş kapısı, üyeye deneme tanıtımı (Çek · Tanı · Tarifin hazır; “{n} ücretsiz deneme hakkın kaldı.”). Hak bitti ve günlük limit sheet'leri.
3. **Kamera (simülasyon):**
   - Kapat; “Tabaktan Tarif” + Pro rozeti ya da “Örnek fotoğraf · Simülasyon”; Flaş.
   - Vizör köşeleri (`viewfinder-pulse` 1800ms).
   - “Yemeği çerçevenin içine al”; ipucu kartı “Daha iyi bir eşleşme için / İyi ışıkta, tek tabağı yakından çek.” (kapatılabilir).
   - Galeriden seç · Deklanşör · Kamerayı çevir.
4. **Analiz:**
   - Vizör `scale(.9)` 250ms; tarama çizgisi `plate-scan` 1150ms.
   - 3 aşama 1150/2300/3450 ms: “Fotoğraf inceleniyor…” → “Malzemeler belirleniyor…” → “Tarif hazırlanıyor…” (`analysis-type` 650ms daktilo), ilerleme 1/3–3/3.
   - İptal.
   - **Not:** Talimattaki “altta değişen sonuç/öneriler” bugünkü akışta **yok**. Analiz sırasında altta yalnız ilerleme çubuğu, değişen aşama başlığı ve İptal var. Eklenmesi istenirse yeni tasarım kararıdır.
5. **Sonuç · Benzer tarifler:**
   - Tanıma özeti (80px görsel, “Yüksek/Orta güven”, “Bu bir {ad} gibi görünüyor”).
   - “Bu değil mi?” 3 tahmin çipi + “Kendim yazayım” (elle arama).
   - “En yakın tarifler”: “Aynı yemek” büyük kart + 4 “Benzer malzemeler”.
   - “Tanınan malzemeler” (6 çip, 4 seçili) + “Bu malzemelerle Dolapta Ne Var'da ara”.
   - “Sonuçlar DadaGastro'daki denenmiş tariflerden gelir.”
   - Alt çubuk: Yeniden çek · Tarife git.
6. **Sonuç · Senin tarifin (AI taslağı):**
   - Durum satırı “Taslak · Yapay zekâ ile oluşturuldu”.
   - Uyarı “Yalnız sana özel. Ölçüler fotoğraftan tahmin edildi; pişirmeden önce kontrol et.”
   - Besin “Tahmini”; porsiyon 0,5×–1,5×; malzeme işaretleme; alternatif; zamanlayıcıdan pişirme modu.
   - Alt çubuk: Defterime kaydet · Pişirmeye Başla.
7. **Düzenle:** Tarif bilgileri, Künye, Malzemeler (ekle/sil/taşı), Hazırlanış Adımları, Notlar ve etiketler; Kaydet/İptal; doğrulama toast'u.
8. **Taslak işlemleri:** Düzenle · Alışveriş listeme ekle · Menüme ekle · Tarifi yayınla (“editör onayından sonra yayınlanır”, Onaya gönder → “İncelemede”) · Sil (onay).
9. **Hata halleri** (her biri action-card seçenekli): eşleşme yok · bulanık · yemek yok · kamera izni · bağlantı · taslak oluşturulamadı.
10. **Sheet animasyonları:** giriş 250ms, kapanış 250ms + 32px; sürükle-kapat. Reduced-motion davranışları aynen.

### 4.2 Kanona çevrilecek parçalar

| Parça | Bugün | Kanon |
|---|---|---|
| Sonuç/düzenle/hata header'ı | Solid #E14827 (`--tomato`), kök `syncHeader` | `DgAppBar(detail)`, `--dg-header-solid` |
| Kamera ikon düğmeleri | Overlay %45 | `--floating-icon-bg` %56 + blur 18 |
| Kamera alt gradyanı | 6 durak, doğrusal | Ortak smootherstep eğrisi (`DGCard.gradient`) |
| Sonuç kartları | Kök `.recipe-card` (24 radius, alt başlık, zorluk/porsiyon/maliyet, cam kapsül) + `editorialHero` (320px) | `DgRecipeCard` / `DgFeatureCard` (16, `dg-meta`, `dg-save`, yazar) |
| Taslak görünümü | Kök `detail()` | detay-v2 yerleşimi (sekmeler, özet, alt çubuk). **En büyük kalem.** |
| Pişirme modu | Eski `cooking-dialog` | `cm2` (detay-v2 `openCookingV2`) |
| Sheet'ler | Kök `genericDialog` | Tek `DgBottomSheet` iskeleti (sabit baş/gövde/ayak) |
| Chip'ler | Kök `.chip` (seçili: çerçeve + metin) | `DgChip` (seçili tint + tomatoDeep) |
| Sekmeler | `.segmented.plate-tabs` (dış 12, iç 0) | `DgSegmented` (16/4/12) |
| Bölüm başlıkları | `.section-heading-row` | `.dg-head` / `DgSectionHeader` |
| Alt çubuk düğmeleri | 13px | Button rolü 15/500, 52 |
| Pro rozeti | `.pro-badge` (Gilroy 700 = sentetik kalın riski, `.08em`) + ayrı `.om-badge` | Tek `DgBadge(pro)`: GilroyBd, label `.06em` |
| Hata başlığı | 24/700 **Gilroy** (sentetik) | page rolü GilroyBd |
| İkonlar | Yukarı `arrow-up`, aşağı `chevron-down` | `arrow-up` / `arrow-down` çifti |
| Tanıma küçük resmi, ipucu kartı | 24 radius | media 16 (karar T2) |
| Gezinme | `index.html`, `tarifler.html`, `tarif-detay.html` hedefleri | Uygulama sayfaları (`ana`, `tarifler`, `tarif`) + `donus` doğrulaması |

### 4.3 Aynı yaklaşımla kökten taşınacak diğer ekranlar

| Ekran | Bugünkü kaynak | Kanona çevrilecek |
|---|---|---|
| Arama (S1) | `v3-app/arama.html/js/css` | Geri ve sonuç hedefleri (ana-a, detay-c), seçili sekme düz dolgu, token dışı backdrop, `.sheet-handle`, elle 50% avatar |
| Tarif bul paneli | Kök `app.js:9180` | Liste ve detayda Ne Pişirsem/Dolapta Ne Var satırları bugün “Yakında” → gerçek hedefler |
| Ne Pişirsem sheet'i | `six-home.js:41` (yalnız ana) | N1 sihirbazına dönüşür; “Tarif Ara” hedefi `liste.html` (eski) |
| Profil sheet'i | Kök `app.js:9102` | Hedefleri boş → H7, H9, S3, H12 |
| Giriş kapısı | Kök `gate()` 9067 | `DgAuthGate`; “Üye Ol” bugün “Yakında” → H2 |
| Pişirme modu (cm2) | detay-v2 | N4 Menüyü Pişir ve Tabaktan taslağı da bunu kullanır |
| Dolapta Ne Var modülü | ana-v3 | D1 tam sayfaya genişler |
| Video modülü | ana-v3 | V1'in kartları |
| Kök sheet ailesi / `dg-sheet` | Kök + liste-v2 | Tek iskelette birleşir (açık karar) |

---

## 5. Veri sözleşmesi ve API (canlının backend'i)

**Kaynak (Beyar kararı 2; 12 Ekim salt okunur inceleme):** canlı dadagastro.com, `~/Developer/Revenge Projects/DadaMentor/DadaGastro` deposundan (remote `gaviaworks-dev/DadaMentor-DadaGastro`) çalışıyor.

**Kanıt:**
- Canlı dal `canli/altbilgi-rk-20261005` (`8593154e65`), canlıya alınan `acb760fff2` ile birebir; deploy kaydı `docs/HANDOFF.md` (`releases/20261005-altbilgi-rk-acb760fff2`).
- Canlı sayfadaki `altbilgi-perde.css?v=9f3c8afaf85e` / `.js?v=543f427b93db`, depodaki dosyaların SHA-256 ilk 12 hanesiyle aynı.
- `/hesabim/*`, `/kayit`, `/sifre/unuttum` (POST), `/marka-is-birlikleri`, `/yasal/veri-silme` rotaları bu depoda (`routes/uye/u1–u5`, `routes/site/p4-kurumsal.php`, `app/Kimlik/Http/rotalar-web.php`).
- Laravel 13.30.1, Sanctum 4.3.3, Socialite 5.31.0. Eski `Backend Projects/dadagastro` ve onun `/api/v1`'i emekli (canlıda 404).

**API durumu:**
- Yalnız kimlik API'si var: `app/Kimlik/Http/rotalar-api.php`, önek `api/kimlik`.
  - `POST kayit` (ad, soyad, eposta, sifre + 5 kural, telefon, sozlesme*, aydinlatma*) → 201 `{token, hesap}`.
  - `POST giris` (eposta, sifre, beni_hatirla) → `{token, uyelik_yeni_acildi, hesap}`.
  - `GET ben` → `{hesap}`; `POST cikis`. Bunlara ek olarak iskeletten kalma `GET /api/user`.
  - Sanctum Bearer jetonu süresiz; yenileme ucu yok. Belgelere göre bugüne kadar verilmiş jeton sayısı 0.
- **API altyapısı yok:**
  - `v1` öneki yok;
  - Resource sınıfı ve ortak zarf yok, sayfalama yok;
  - genel hız sınırı yok; dil başlığı yok (yanıtlar `tr`);
  - CORS `*`; hata biçimi Laravel standardı (401 / 422 `{message, errors}` / 429).
- Geri kalan her şey web uçlarında: oturum çerezi + CSRF + `auth:web`. Bearer jetonu bu uçlarda geçmez. Misafirin doğrudan kullanabileceği JSON yalnız `GET /ara/oneriler` ve `GET /bugun-ne-pisirsem/havuz`; havuz da kartları HTML parçası olarak döndürüyor.

**İşaret:** **API var** · **web-JSON** (JSON dönen web ucu var ama oturum ve CSRF istiyor; mobil doğrudan kullanamaz) · **API yok, backend işi**.

| Ekran | Gösterilen alanlar | Durum | Mevcut uç / kaynak | Gerekli uç (öneri, öncelik sırasıyla) |
|---|---|---|---|---|
| H1–H2 Giriş / Kayıt | eposta, şifre; ad, soyad, eposta, şifre, onaylar | **API var** | `POST /api/kimlik/giris`, `/kayit`, `GET /ben`, `POST /cikis` | `ben`e avatar, kademe, Pro/paket eklenmesi |
| H3–H5 Şifre sıfırlama, e-posta doğrulama | eposta; yeni şifre | **API yok, backend işi** | web `POST /sifre/unuttum`, `/sifre/yenile`, `/eposta/dogrula*` | `POST /api/v1/sifre/baglanti`, `/sifre/yenile`, `/eposta/yeniden-gonder` |
| H6 İki adım · sosyal giriş | kod | **API yok, backend işi** | web Socialite yönlendirmesi | id_token takası (Google, **Apple** — App Store 4.8) |
| R2 Tarif listesi + facet + sıralama | kart alanları, 9 facet, 4 sıralama, sayfalama | **API yok, backend işi** | `TarifDizinSorgusu` (eksenler, `sirala`, `q`, offset 36/30) | `GET /api/v1/tarifler` (+ facet sayıları) |
| R3 Tarif detay | malzeme (+ `alternatif`), adım, besin, `hatirlatma` + `alerjen_notu`, şef, puan dağılımı, yorumlar, benzerler, video | **API yok, backend işi** | tablolar hazır (`tarifler`, `tarif_malzemeleri`, `tarif_adimlari`, `tarif_besin_degerleri`, `tarif_benzerleri`) | `GET /api/v1/tarifler/{slug}` |
| R1 Ana sayfa · G3 kategori/mutfak | bloklar; eksen değerleri + sayı | **API yok, backend işi** | `eksenler`, `eksen_degerleri` | `GET /api/v1/anasayfa`, `GET /api/v1/eksenler` |
| S1 Arama | öneri grupları; sonuç sekmeleri | **web-JSON** (öneri, misafir GET) · sonuç **API yok** | `GET /ara/oneriler` (mutlak URL döner, ID/görsel yok); `AramaServisi` | `GET /api/v1/arama/oneriler`, `/arama` |
| H9 Kaydettiklerim | kayıtlı tarifler | **web-JSON** (yalnız yazma) | `POST /hesabim/mutfak-defterim/kayit/toggle` (`hedef_tur`, `hedef_id`) | `GET /api/v1/mutfak-defterim`, `POST /api/v1/kaydet` |
| H12 Alışveriş listesi | listeler, kalemler (reyon), işaret | **web-JSON** (yalnız yazma; okuma yok, toplu ekleme yok) | `POST /hesabim/menulerim/alisveris/taslak/kalemler` (tek kalem; "Tümünü ekle" JS ile sırayla), PATCH işaretle, DELETE, kaydet; `AlisverisServisi::depoJson()` | `GET /api/v1/alisveris/listeler`, **toplu** `POST …/taslak/kalemler`, PATCH, DELETE, `…/kaydet` |
| H14–H15 Menüler, haftalık menü | menü, kaplar, gün × öğün | **web-JSON** (yazma + tarif havuzu) | `/hesabim/menulerim/menu/*`, `tarif-havuzu?q=` | `GET /api/v1/menuler` + yazma eşleri |
| N1 Ne Pişirsem · N4 pişirme | sihirbaz seçenekleri, sonuç (`matchPercent`) | **web-JSON** (POST + CSRF) | `POST /bugun-ne-pisirsem/sonuclar`, `GET …/havuz` (HTML parça) | CSRF'siz `POST /api/v1/ne-pisirsem`, havuz JSON |
| D1 Dolapta Ne Var | malzeme havuzu, hariç tutma, sonuç (tam/eksik) | **web-JSON** (sonuç; POST + CSRF) · havuz **API yok** | `POST /dolapta-ne-var/sonuclar` (`have[]`, `exclude.*`); `dolap_malzeme_gruplari` HTML'e basılıyor | `GET /api/v1/dolap/malzemeler`, `POST /api/v1/dolap/ara`; üye dolabı `uye_dolap_secimleri` |
| T1 Tabaktan Tarif | fotoğraf, tanıma, benzerler, taslak | **API yok, backend işi** (AI yok) | — | tanıma + taslak uçları (ayrı proje) |
| Yorum / puan / Ben de Yaptım / Eline Sağlık / Faydalı | — | **web-JSON** (toggle'lar); yorum yazma form (redirect) | `/tarif/{slug}/denedim`, `/alkisla`, `/puf-noktalari/{slug}/faydali`, `POST /tarif/{slug}/yorumlar` | API eşleri + sayfalı yorum listesi |
| V1–V2 Videolar | liste, oynatma | **API yok** (liste) · oynatma ucu mp4 akışı | `…/videolar/{video}/oynat`, `POST …/izlendi` | `GET /api/v1/videolar` |
| P1–P3 Püf noktaları | liste, detay; ekle | **API yok** · ekle **web-JSON** | `POST /topluluk/icerik/puf` | `GET /api/v1/puf-noktalari(/{slug})` |
| C1–C2 Şefler · takip | liste, profil; takip | **API yok** · takip **web-JSON** | `POST /hesabim/toplulugum/takip-et/{kullanici}` | `GET /api/v1/sefler(/{kullanici})`, takip eşi |
| S2 Bildirimler | liste, okundu, sil | liste **API yok** · okundu/sil **web-JSON** · **push yok** | `bildirimler` tablosu | `GET /api/v1/bildirimler`, okundu, **push cihaz kaydı (yeni tablo)** |
| S3–S4 Ayarlar, hesap sil/dondur | tercihler, gizlilik, şifre, 2FA, veri indir | **web-JSON** (yazma; okuma HTML) | `/hesabim/ayarlar/*`, `hesap-sil`, `dondur`, `aktiflestir` | API eşleri (Apple 5.1.1(v): uygulama içinden silme) |
| H13 Rozetler · H16 Pro/paket/ödeme | rozet, kademe, puan; paket | **API yok, backend işi** (ödeme sağlayıcısı yok; kayıtlar "demo") | `rozetler`, `kademeler`, `puan_hareketleri` | okuma uçları; ödeme mobilde mağaza içi satın alma kararı |
| Y1–Y6 Yasal, kurumsal | metin | **API yok, backend işi** | `yasal_metinler` | `GET /api/v1/yasal(/{slug})` |
| O3 Tercihler (onboarding) | diyet, mutfak, alerjen, bildirim | **API yok, backend işi** | `uye_tercihleri`, `uye_kategori_ilgileri` | `GET/POST /api/v1/tercihler` |
| Sistem (sürüm, bakım) | min sürüm, bakım | **API yok, backend işi** | `/bakim` yalnız HTML | `GET /api/v1/uygulama` (min_surum, bakim) |

**Ön koşul (P0, backend işi):** `api/v1` öneki, Sanctum korumalı grup, ortak zarf (`data` / `meta.pagination` / `errors`), dil başlığı, genel hız sınırı, jeton süresi ve yenileme politikası. Yeniden kullanılabilir servisler: `TarifServisi`, `TarifDizinSorgusu`, `NePisirsemAramaServisi`, `DolapAramaServisi`, `AramaServisi`, `DefterServisi`, `AlisverisServisi::depoJson`, `TarifEtkilesimServisi`, ayar servisleri.

**Prototip veri katmanı:** Prototip `ortak/veri/veri.js` (kök ekranların gerçek veri kümeleri) ve `ortak/veri/icerik.js` (canlı metinler) üzerinde çalışır; üye işlemleri yalnız bu cihazda (localStorage) tutulur. Flutter fazında aynı alanlar yukarıdaki uçlardan gelir.

## 6. Eklenmesini önerdiklerim

Talimattaki listede olmayan, sitede ya da akışta bulunan sayfa ve haller:

1. **Menülerim, Haftalık Menü (Pro), Menüyü Pişir:** web'de üye modülü; Pro bandı ana sayfada var.
2. **Pro planları ve Üyeliğim** (+ fatura geçmişi, duraklatma); mobil satın alma kuralı kararı.
3. **Şef abonelikleri / Üretici Üyeliği**: detayda “Abone ol” yer tutucusunun hedefi.
4. **Koleksiyon, Günün Menüsü, Sezon, Derleme (SEO)**, Günün Tarifi ve “Bu hafta öne çıkanlar” (web ana sayfa bölümleri).
5. **Video serileri, seri detayı, kısa video akışı (Dada Akış).**
6. **Püf noktası ekle** + moderasyon durumu.
7. **Liderlik, Onur Listesi** (Rozetlerim'den erişim).
8. **Destek Merkezi** (talepler) ve **Görüş Bildir** sheet'i (menüde satırı var).
9. **E-posta doğrulama, 2FA, yeni şifre (derin bağlantı)**; hesap dondurma/aktifleştirme; Verilerimi İndir.
10. **Haller:** e-posta doğrulanmamış (K-dog), dondurulmuş/silme bekleyen hesap (K-don), çok fazla istek (S-429), moderasyonda (E-moder), abonelere özel tarifin Pro kilidi (web 404 veriyor; mobilde Pro kapısı önerisi), kayıt kapalı, süresi dolmuş sıfırlama bağlantısı, paylaşılan bağlantıdan (derin bağlantı) açılış, bağlantı başka hesaba ait (E6).
11. **Alt menü farkı:** canlı web mobil alt menüsü Ana Sayfa · Tarifler · Ne Pişirsem (orta) · **Kaydettiklerim** (bookmark) · Profil + ayrıca **Görüş Bildir**; prototip AGENTS kararıyla 4. öğe **Püf Noktaları**, Görüş Bildir çekmecede. Kaydettiklerim'e erişim Profil üzerinden. Bilinçli fark; onay gerekir.
12. **Canlı global katmanlar:** Görüş Bildir paneli (konu + alan çipleri Tarifler · Mutfak Sırları · Püf Noktaları · Şefler · Menülerim · Topluluk · Diğer, ekran görüntüsü, 5'li puan, “Görüşün bize ulaştı”), “Başa dön” düğmesi, profil paylaşımı (WhatsApp, Telegram, X, Facebook, LinkedIn, kopyala), takipçi/takip listesi modalı, şef profilinde Rozetler bandı ve Topluluk Puanı. Çerez bandı AGENTS gereği mobilde yok.
13. **Üye hesap modülleri (canlı çekmece):** Topluluğum, Şef Panelim (şef rolü), Paketlerim, Ödemelerim, Çözüm Merkezi. Giriş duvarı nedeniyle içerikleri doğrulanamadı; repo karşılıkları H13/H16/S5.

---

## 7. Parite izleme

Her sayfa tamamlandıkça bu dosyadaki satırlar “Var / Görünür / Çalışır / Doğrulandı (ölçüm dosyası)” sütunlarıyla güncellenir. Verisi olmayan koşullu dallar “doğrulanmadı” kalır.

---

## 8. Canlı doğrulama (12 Ekim 2026)

**Yöntem:**
- iPhone UA ile ~110 GET isteği (1–1,5 sn aralıkla).
- POST, form gönderimi ve giriş yapılmadı.
- Görünürlük HTML ve canlı CSS'ten çıkarıldı; JS çalıştırılmadı.

Ham envanter Faz 2'ye kadar scratchpad'de durur. Bu doküman canlı metinlerle güncellendi.

### 8.1 Canlıda misafirin açabildiği 27 sayfa tipi

Ana Sayfa · Tarif Listesi · Kategori · Tarif Detay · Ne Pişirsem · Dolapta Ne Var · Püf Listesi · Püf Detay · Video Mutfağı · Video Serileri · Video Seri Detay · Şefler · Şef Profili · Onur Listesi · Pro · Marka İş Birlikleri · Hakkımızda · İletişim · Künye · Yasal Dizin · Yasal Detay (26 metin; `veri-silme` dahil) · Arama (boş/sonuç/sonuç yok) · Giriş (+ şifremi unuttum / yeni şifre panelleri) · Kayıt · Tarif Ekle · Püf Ekle · 404.

**Giriş duvarı arkasında 13 URL tipi (misafire 302 → /giris):** `/hesabim`, `/hesabim/bildirimler`, `/hesabim/mutfak-defterim`, `/hesabim/menulerim` (`#alisveris`), `/hesabim/toplulugum`, `/hesabim/sef-panelim`, `/hesabim/rozetlerim`, `/hesabim/paketlerim`, `/hesabim/odemelerim`, `/hesabim/ayarlar`, `/hesabim/cozum-merkezi`, `/bugun-ne-pisirsem/menu/{id}`, `/pisirme-oturumu/{id}`.

**Dil:** TR + `/en` aynası (çevrilmiş slug'lar). Prototip menüsündeki ES/RU/DE canlıda yok; yalnız tercih saklanır (mevcut karar).

### 8.2 Canlı ↔ repo ↔ prototip farkları (bu dokümana işlendi)

| Konu | Canlı | Repo (HEAD) | Mobil karar |
|---|---|---|---|
| Hesap adresleri | `/hesabim/*` | `/mutfak-defterim`, `/alisveris-listesi`, `/bildirimler`, `/rozetlerim` | Canlı (adres yalnız referans; mobil kendi rotalarını kullanır) |
| Kayıt formu | Ad, Soyad, E-posta, Şifre + 2 onay; Google/Facebook ile kayıt | + telefon/ülke kodu, şifre tekrar, kampanya | Canlı |
| Sosyal giriş | Google / Facebook düğmeleri görünür | “Yakında” | Görünür; işlev doğrulanamadı (karar) |
| Tüketmiyorum hızlı seçim | Vegan · Vejetaryen · Pesketaryen · İlave şeker · Çiğ ürün | Et / Balık / Süt / Yumurta istemiyorum | Canlı |
| Beslenme / Tip | 21 seçenek | 17 (seed) | Canlı |
| Arama sekmeleri | Tümü · Tarifler · Püf Noktaları · Mutfak Rehberi · Şefler | + Videolar, Yazılar | Canlı; Mutfak Rehberi kapsam kararı |
| 404 metni | “Aradığın sayfayı bulamadık” | “Bu tarif menüde yok” | Canlı |
| Alt menü | … Kaydettiklerim · Profil · Görüş Bildir | aynı | Prototip: Püf Noktaları (AGENTS), onay gerekir |
| Video | Kaynak yok (“Video kaynağı henüz eklenmedi”), detay sayfası yok | oynatıcı modal | Dürüst bilgi (mevcut) |
| Pro | Satışa açılmadı; ₺49/ay yazılı | seed ₺49 | Canlı metin; satın alma yok |
| Tabaktan Tarif | Yok (404) | Yok | Mobil ekstra (onaylı) |

### 8.3 Canlıdaki kusurlar (mobilde taşınmaz, raporlanır)

- “Sen de Şef Ol” üç farklı hedefe gidiyor (`/tarif-ekle`, `/tarifler`, `/kayit`). Mobilde tek hedef olmalı: Tarif ekle (giriş kapısıyla).
- “Ana Yemek 0 tarif” kategorisi her yerde görünüyor. Mobil kuralı: sıfır tarifli kategori gizli.
- Sayı çelişkileri: 650 doğrulanmış şef ↔ 425 üye; 33 video ↔ 27 video.
- Pro SSS ve yasal metin iç bağlantıları prototip dosyalarına gidiyor (kırık); KVKK'da doldurulmamış yer tutucular ([MERSİS no], [KEP adresi], [yürürlük tarihi]).
- Arama: püf sonuçlarında makalenin tamamı basılıyor; “Popüler aramalar” ham ve yazım hatalı (“menemn”, “manti”).
- `/video-mutfagi/seriler` sayfasında H1 yok.
- Header'da sabit “3” bildirim rozeti markup'ı (CSS ile gizli).

### 8.4 Canlıda doğrulanamayanlar

- Hesap alanının içeriği.
- Ne Pişirsem ve Dolapta Ne Var sonuç ekranları (POST; sonuç alanları JS şablonundan).
- Üye yorum formu.
- Tarif detayında koşullu bölümler (video, ses, beceriler, foto duvarı, editör notu).
- 500 / 419 / 429 / 503 sayfaları.
- Sosyal girişin çalışıp çalışmadığı.

Mobilde bunlar repo metinleriyle kurulur ve “doğrulanmadı” olarak işaretlenir.

---

## 9. Canlıda 404 veren ama menüde ya da kodda geçen sayfalar

**Ana bulgu:**
- Verilen Laravel reposunun (`Backend Projects/dadagastro`) hiçbir dalında canlıya özgü adresler yok. 87 ref ve 1 etiket tarandı; `git log --all -S` ile bütün geçmiş de arandı. Bu adresler: `/hesabim/menulerim`, `/hesabim/mutfak-defterim`, `/hesabim/rozetlerim`, `/hesabim/bildirimler`, `/hesabim/toplulugum`, `/hesabim/sef-panelim`, `/hesabim/paketlerim`, `/hesabim/odemelerim`, `/hesabim/ayarlar`, `/hesabim/cozum-merkezi`, `/kayit`, `/sifre/unuttum`, `/marka-is-birlikleri`.
- Repodaki son canlı kaydı (`docs/goc-kesif-2026-09-11.md:3196-3208`) 11 Eylül'de canlının bu reponun `origin/main` (`1518b17d`) kodunu çalıştırdığını gösteriyor. Yerel HEAD (`fix/kayit-onboarding`, 14 Eylül) kod olarak bununla aynı; üstüne yalnız doküman commit'leri eklenmiş.
- Bugünkü canlı ise farklı adresler sunuyor. **12 Eylül'den sonra canlıya bu repoda bulunmayan bir kod yayınlanmış.**
- Repodaki göç dokümanları (`docs/goc-yurutme-raporu.md`, `docs/goc-sema-haritasi.md`) canlı verinin başka bir depoya (`~/Developer/Revenge Projects/DadaMentor/DadaGastro`, Laravel 13, Türkçe tablolar) taşındığını kaydediyor. Canlı `/hesabim/*` adresleri de `DadaGastro-profil.docx`'in önerdiği adreslerle birebir aynı. Bu repo o öneriyi 21 Ağustos'ta uygulamamıştı (`docs/icerik-bekleyen.md:15-45`).
- O depo görev kapsamı dışında olduğu için **açılmadı**. “Canlı o depodan” iddiası doğrulanmamış bir izdir.

**Okuma notu:** Repo HEAD'de giriş isteyen rotalar misafire 302 → /giris döndürür, 404 döndürmez. Bu yüzden canlıdaki 404 bu rotaların canlı router'da olmadığını gösterir. İstisna: koşullu 404 veren sayfalar (kayıt yoksa ya da satış kapalıysa). Bunlarda canlı 404 tek başına “sayfa yok” kanıtı değildir.

| Sayfa (repo adresi) | Laravel'de ne kadarı var (HEAD) | Canlıda neden yok (bulgu) | Mobilde gerekli mi? (öneri; karar Beyar'da) |
|---|---|---|---|
| **Alışveriş Listesi** `/alisveris-listesi` | Tam: rota `web.php:780` (+ kalem ekle/sil, işaretlileri temizle, koleksiyondan, arşivle, geçmiş, geçmiş detay `:783-794`); `AlisverisListesiController`; blade `alisveris-listesi/{show,gecmis,gecmis-detay}`; model `shopping_list_items` (11 Eylül'de canlıda 26 satır), `shopping_list_archives(+_items)` (0 satır). Detaydaki “Alışveriş listesine ekle” `POST /malzeme/{id}/listeye-ekle` (toggle) ve “Tümünü Listeye Ekle” `POST /tarif/{slug}/tumunu-listeye-ekle`; misafir 302 → /giris. | Rota canlı router'da yok (auth rotası 302 yerine 404). Canlıda liste `/hesabim/menulerim#alisveris` sekmesinde. Canlı detay HTML'inde “listeye ekle” formu `POST /hesabim/menulerim/alisveris/taslak/kalemler` adresine gidiyor; detayda “Listende 0 malzeme · Listeyi Gör →”. Bu uç ve sekme repoda yok. | **Evet, P1.** Canlıda yaşayan iki eylemin (malzeme başına + Tümünü Listeye Ekle) sonucunu gösterecek ekran yoksa eylem çıkmaz sokağa döner. Prototipte de bugün yalnız toast var. Öneri: ayrı ekran (H12), Profil ve detaydaki “Listeyi gör” ile erişim, ekleme sonrası snackbar “Listeye eklendi · Listeyi gör”. Web'de menülerle aynı sekmede durması mobilde ayrı ekran olmasına engel değil. Geçmiş/arşiv canlıda doğrulanamadı → P2. |
| **SSS** `/sss` | Rota `:363` (herkese açık), `FaqController:24` (`Page sss` yoksa 404), blade `sss/index`, `faqs` (25 satır), 5 kategori. Ayrıca Çözüm Merkezi `/hesabim/destek/cozum-merkezi` (üye) aynı kayıtları okuyor. | Canlı 404. Koşullu 404 olabilir (`Page` kaydı yoksa); canlı kodu görülmediği için kesin değil. Canlıda SSS Pro sayfasındaki akordeonda ve üye Çözüm Merkezi'nde. | **Evet, P2, ayrı sayfa olarak değil:** Ayarlar > Yardım (Çözüm Merkezi içinde SSS), misafire de açık. Pro ekranında Pro SSS'i. |
| **Liderlik** `/liderlik` | Rota `:342` (herkese açık), `LeaderboardController`, blade `liderlik/index`, `competition_seasons` (2), `season_points` (`ce51ec7b`) | Canlı 404 (rota yok). Repoda “`/hesabim/toplulugum` altına taşınacak mı?” açık sorusu (`icerik-bekleyen.md:153`). Onur Listesi canlıda 200 ve boş. | **İsteğe bağlı, P3:** Rozetlerim/Topluluğum içinde “Sezon sıralaması” bölümü. Ayrı ekran önermiyorum. |
| **Koleksiyon** `/koleksiyon/{slug}` | Rota `:174`, `CollectionController` (`curated_sets kind=koleksiyon`, 3 yayında), blade `koleksiyon/show` | Canlı 404 (denenen slug'ın geçerliliği bilinmiyor; koşullu olabilir). Yeni göç şemasında hedef tablo yok (`goc-sema:279-292`). Canlıda hiçbir menü bağlantısı görülmedi. | **Hayır (şimdilik).** Canlıda erişim yolu yok, yeni şemada karşılığı yok. |
| **Sezon** `/sezon/{slug}` | Rota `:177`, `SeasonController`, `seasons` (2) | Canlı 404; yeni şemada karşılığı yok (`goc-sema:431`) | **Hayır.** |
| **Günün Menüsü** `/gunun-menusu` | Rota `:225`, `DailyMenuController` (her zaman 200), blade; ayrı tablo yok | Canlı 404 → rota yok (repoda koşulsuz 200 olduğu için). Canlı ana sayfada “Günün Tarifi” bandı var. | **Hayır.** “Günün Tarifi”nin karşılığı ana sayfa hero'su (“Bugün deneyebilirsin”). |
| **Derleme (SEO)** `/{slug}` | Yakalayıcı rota `:1733`, `SeoLandingController` (`pages type=seo_landing`) | Canlı 404; slug yayında olmayabilir (koşullu) | **Hayır.** Web'e özgü SEO yüzeyi. |
| **Haftalık Menü** `/haftalik-menu` | Rota `:690` (+ yazma `:691-703`, Pro değilse 403), `WeeklyMenuController`, `weekly_menus` (0 satır) | Canlı 404 (auth rotası 404 → rota yok). Canlı ana sayfa Pro bandı “Menünü Planla” `/hesabim/menulerim`'e gidiyor. | **Evet, P2:** Menülerim'de Pro sekmesi (H15). Pro satışta değil; Pro kapısıyla. |
| **Bildirimler** `/bildirimler` | Rota `:670-684`, `NotificationController`, 8 bildirim | Canlıda `/hesabim/bildirimler` | **Evet, P1** (S2). |
| **Rozetlerim** `/rozetlerim` | Rota `:652`, `BadgeController`, `badges` (90), `user_badges` (5.924) | Canlıda `/hesabim/rozetlerim` | **Evet, P2** (H13). |
| **Mutfak Defterim** `/mutfak-defterim` | Rota `:709` → `/sefler/{me}` yönlendirmesi | Canlıda `/hesabim/mutfak-defterim` (Kaydettiklerim; alt menü 4. öğe) | **Evet, P1** (H9/H10). |
| **Onboarding** `/onboarding` | Rota `:546-548`, `OnboardingController`, 4 adım; API `POST account/onboarding` | Canlı 404 (auth rotası 404 → rota yok). Kayıt sonrası canlı “Mutfak Profilim”e gidiyor. | **Evet, P1** (O3, mobile özel tercih akışı). Kayıt sonrasına ve ilk açılışa bağlanır, atlanabilir. |
| **Pro ödeme** `/pro-odeme` | Rota `:156` + `sales.open` | **Bilerek 404:** satış kapalıyken `EnsureSalesOpen.php:27` 404 döner; canlı Pro sayfası “Satışa Açılmadı” diyor | **Hayır** (satış kapalı). Pro ekranı durumu gösterir. |
| **Sponsorlar** `/sponsorlar` | Rota `:387`, `sponsors` (0) | Canlıda `/reklam-ver` 301 → `/marka-is-birlikleri`; sponsorlar sayfası yok | **Hayır** (reklam turu hariç). |
| **Şifre değiştir** `/sifre-degistir` | Rota `:1026` (yalnız `must_change_password` bayraklı kullanıcı) | Canlı 404 | **Evet, ayrı sayfa değil:** Ayarlar > Şifre & Güvenlik. |
| **Tarif bulucu** `/tarif-bulucu` | 301 → `/dolapta-ne-var` | Canlı 404 → takma ad kalkmış | **Hayır** (takma ad). |
| **Video arşivi** `/video-mutfagi/arsiv` | Sayfa değil, JSON “daha fazla yükle” ucu | Canlı 404 | **Ayrı sayfa değil:** Videolar içindeki “Video Arşivi” bölümü (canlıda var). |
| **Hata önizleme** `/hata-onizleme` | Bilerek her zaman 404 (geliştirici) | — | **Hayır.** |

**Bu bulgunun plana etkisi** (karar soruları):
1. **Kaynak repo:** Canlı bu repodan yayında değilse canlının kodu başka bir depodadır. Mobil uygulamanın bağlanacağı backend (API) de büyük olasılıkla oradadır. Bu dokümandaki API envanteri (§5) verilen reponun HEAD'ine göre yazıldı; yeniden doğrulanması gerekir. O depoyu salt okunur kaynak olarak açmam için izin gerekiyor.
2. Yukarıdaki “Hayır” satırları (koleksiyon, sezon, günün menüsü, derleme, sponsorlar) için onay.

---

## §10 · Form alanı paritesi — web alanı → mobil karşılığı (12 Ekim 2026)

Kural: docs/55 §2d. Kaynak: canlı dadagastro.com (yalnız GET); giriş arkasındaki sayfalarda salt okunur backend deposu. Canlı ile depo farklıysa canlı esas.

### Giriş (`/giris` → `uygulama/giris.html`)
| Web alanı | Mobil karşılığı (durum) |
|---|---|
| Sekmeler Giriş Yap / Kayıt Ol | `DG.seg` (var) |
| “Tekrar hoş geldin” / “Kaldığın yerden devam et — defterin seni bekliyor.” | var |
| Hata şeridi “Giriş yapılamadı” + sunucu cümlesi | sosyal düğmelerin üstünde, “E-posta ya da şifre hatalı.” (`kimlik.giris_hatali`) — düzeltildi |
| “E-postanı doğrulamak için giriş yap” şeridi | `?durum=dogrula-giris` — eklendi |
| Google / Facebook (renkli, “ile devam et” erişilebilir ad) | var |
| E-posta * (ornek@eposta.com, autocomplete=username, “Geçerli bir e-posta adresi gir.”) | var |
| Şifre * (“Şifren”, göster/gizle, “Şifreni gir.”) | var |
| Beni hatırla · Şifremi unuttum · Giriş Yap · “Hesabın yok mu? Hemen Kayıt Ol” | var |
| Yan panel: “Mutfağın sana göre şekillensin” + 6.112 tarif / 1.055 üye / 2.163 püf noktası | başlık ve sayaçlar eklendi |

### Kayıt (`/kayit` → `uygulama/kayit.html`)
| Web alanı | Mobil karşılığı (durum) |
|---|---|
| “Aramıza katıl” / “1 dakikada hesabını oluştur, mutfak defterini açalım.” | var |
| Google / Facebook + sosyal kayıt onay kapısı (iki onay olmadan cümle açılır, ilk boş kutuya odak) | eklendi |
| Ad * “Adınızı girin.” · Soyad * “Soyadınızı girin.” · E-posta * “Geçerli bir e-posta adresi girin.” | canlı metinlerle düzeltildi |
| Şifre * “En az 8 karakter” + ipucu “En az 8 karakter; büyük/küçük harf, rakam ve özel karakter içermeli.” | ipucu eklendi; canlıda olmayan 5 kural listesi kaldırıldı (sunucu yalnız min:8) |
| Üyelik Sözleşmesi'ni okudum, kabul ediyorum. * · Aydınlatma Metni'ni ve KVKK Metni'ni okudum, onaylıyorum. * | yıldızlar eklendi |
| Form hatası “Hesap açmak için Üyelik Sözleşmesi ve Aydınlatma Metni'ni onaylamanız gerekiyor.” | canlı cümleyle değiştirildi |
| Hesabımı Oluştur · “Bu form istismara karşı hız sınırlamasıyla korunur.” · “Zaten üye misin? Giriş Yap” | güvenlik notu eklendi |
| Başarı: “Hesabın hazır, hoş geldin!” + Mutfak Profilim + “Bu adımı sonra Hesabım'dan da yapabilirsin.” | uydurma “Şimdilik atla” kaldırıldı |
| Telefon + ülke kodu | canlıda gizli (`telefon_yuzeyi_gorunur`) → çizilmez |

### Şifremi unuttum / Yeni şifre / E-posta doğrulama / İki adımlı doğrulama
| Web alanı | Mobil karşılığı (durum) |
|---|---|
| Şifremi unuttum: Girişe dön (üstte), “Şifreni mi unuttun?”, Kayıtlı e-posta adresin *, Sıfırlama Bağlantısı Gönder + not, başarı “E-postana şifre sıfırlama bağlantısı gönderdik.” | düzeltildi (uydurma metin ve önizleme düğmesi kaldırıldı) |
| Yeni şifre: maskeli adres, Yeni şifren * + 5 kural (canlı regex), tekrar * “İki şifre birbirini tutmuyor.” (yazarken), Şifremi Güncelle (kurallar tutana kadar kapalı), “Bağlantı 30 dakika geçerlidir…”, başarı, geçersiz bağlantı şeridi | eklendi/düzeltildi |
| E-posta doğrulama (depo `dogrulama-panosu`): 4 hal (doğrula / doğrulandı / zaten / geçersiz), “Bağlantı 60 dakika geçerli.”, Tekrar gönder durum kutusu + bekleme, Siteye devam et, Çıkış yap | düzeltildi (24 saat → 60 dakika) |
| İki adımlı: 6 haneli kod + Doğrula, “Kurtarma kodu kullan” açılımı, hata metinleri, “Farklı hesapla giriş yap” | düzeltildi (canlıda meydan okuma ekranı yok; eski depo görünümü) |
| Açık: yalnız sunucunun ürettiği mesajlar (giriş hatası cümlesi, hız sınırı) POST gerektirdiği için canlıda doğrulanamadı | — |

### İletişim (`/iletisim` → `uygulama/iletisim.html`)
| Web alanı | Mobil karşılığı (durum) |
|---|---|
| Ad * / Soyad * (max 80) · E-posta * (max 190) | var |
| Telefon (ülke seçici +90, “5__ ___ __ __”) | `DG.telefon` (199 ülke) |
| Konu * (“Konu seç”, 8 seçenek) + yardım metni | `DG.secAlan` |
| Mesajın * (1000, sayaç) · KVKK + Aydınlatma onayı * | var |
| “Yıldızlı alanlar zorunludur…”, koruma notu, “1 iş günü”, Gönder, hata özeti | var |
| Başarı “Başvurun kaydedildi … Başvuru numaran: DG-x” | başlık + “Mesajın alındı.”; numara uydurulmaz |

### Görüş Bildir, Destek, Öneri ve Şikâyet, Ayarlar
| Sayfa | Web alanı → mobil | Açık |
|---|---|---|
| Görüş Bildir | 5 konu; İlgili alan (7); konu başına alanlar, yer tutucular, yıldızlar; seçimlerde “Diğer”; ekran görüntüsü; 1–5 puan (canlı etiketler); KVKK; Gönder; başarı | Emoji puan mobilde yıldız |
| Yeni destek talebi | Talebin konusu * (8); Başlık * 3–160; Talebin * 10–5000 + sayaç; ödeme referansı (64, ödeme konularında); ek dosya (JPG/PNG/WebP/PDF, 5 MB) | “İlgili şef üyeliği” canlıda kapalı |
| Talep yanıtı | Yanıtın * 10–5000 + sayaç, iki canlı yer tutucu, ek dosya | — |
| Öneri ve Şikâyet | Ad *, Soyad *, E-posta *, Telefon (opsiyonel), Türü *, İlgili alan * (6), Mesajın * 0/1000, KVKK, reCAPTCHA satırı, “1 iş günü” | Telefon → `DG.telefon` |
| Şifre / Görünürlük / Bildirim tercihleri / Dil ve Bölge / Dondur / Sil | canlı alanlar ve seçenekler birebir | Görünürlükte web “Tercihleri Kaydet” yerine anında kayıt |

### Profili düzenle, tarif ekle, Profilim formları
Ajan raporu gelince eklenecek (telefon: `DG.telefon`, `telefonUlke`).
