# 54 — Mobile özgü desenler

12 Ekim 2026 · Faz 1 araştırması.

- **Durum:** Öneri. Kanona Beyar onayıyla girer; yeni token önerileri `ortak/tokens.json`'a henüz yazılmadı.
- **Kapsam:** Webde karşılığı olmayan mobil ekranlar ve davranışlar.
- **Bağlı dokümanlar:** docs/50 (kanon), docs/51 (bileşenler), docs/52 (sayfa ve durum matrisi), docs/53 (plan).
- **Yöntem:** Kaynaklara WebSearch/WebFetch ile erişildi. Erişilemeyenler (b) bölümünde listelidir. Ekran görüntüsü alınmadı; görsel kaynaklar bağlantı olarak verildi.

## Okuma notu

- **Yöntem:** Her konuda üç başlık var: "Bu uygulamalar nasıl yapıyor" (gözlem ve kaynak), "DadaGastro önerisi" (kanon token'ı ve bileşen adıyla) ve "Flutter karşılığı". Doğrudan erişip okuduğum sayfalara **[okundu]**, yalnız arama sonucu özetinden ya da ikincil yazıdan gelen bilgiye **[ikincil]**, kaynakta bulamadığım ayrıntıya **doğrulanamadı** yazdım.
- **Apple HIG:** Sayfalar JS ile çiziliyor. İçeriği `developer.apple.com/tutorials/data/design/human-interface-guidelines/<sayfa>.json` uç noktasından okudum. Bağlantılar insan okuyucu için normal HIG adresleridir.
- **Material 3 (m3.material.io):** Site JS ile çiziliyor ve metni okunamadı. M3 değerleri bu yüzden resmi `material-components-android` belgelerinden (GitHub) ve Flutter kaynak kodundan alındı.
- **Yerel kaynaklar:** Laravel deposu (`/Users/gaviaworks/Developer/Backend Projects/dadagastro`) ve canlı dadagastro.com yalnız OKUNDU. Bu iki kaynakta bulunan gerçek veri ve işlev aşağıda **[repo]** ve **[canlı]** diye işaretli. Kopya yok: her desenin ilkesi alındı ve DadaGastro diline çevrildi.

---

## 0. Tek kök: önerilerin hepsi buradan türer

**Hareket kökü.** Bütün geçişler tek easing'i kullanır: `standard cubic-bezier(.22,.61,.36,1)`. Süreler üç sınıfa ayrılır:

| Sınıf | Token | Kullanım |
|---|---|---|
| Mikro | `fast 150` / `quick 180` | Renk ve durum değişimi, chip seçimi, basma geri bildirimi |
| Yüzey | `base 200` / `sheet 250` / `drawer 250` | Sheet, çekmece, sayfa itme, paylaşılan öğe |
| Vurgu | `reveal 450` / `savePop 450` | İçerik ilk görünümü, kaydet onayı |

- **Kural:** Bir yüzey hangi süreyle açılıyorsa paylaşılan öğe de aynı süreyle uçar. Sayfa, sheet ve Hero aynı 250ms içinde biter. Kapanış bir basamak kısadır (200ms; bkz. §c-2).
- **Reduced-motion:** Bütün süreler 0 olur, `heroAutoplay` kapanır, `skeleton` nefesi durur ve iskelet sabit gri kalır.
- **Ret:** Apple, sık yapılan etkileşimlere hareket eklemeyi önermiyor ve kullanıcıyı animasyonun bitmesini beklemeye zorlamamayı istiyor ([HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion) [okundu]). Liste öğesi kademeli girişi (stagger), sürekli parıltı ve tekrar eden zıplama bu nedenle önerilmez.

**Geri bildirim merdiveni.** Önem arttıkça kesinti artar. Apple bunu "bilginin önemini sunuluş biçimiyle eşleştir" diye anlatıyor ([HIG Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback) [okundu]).

1. Satır içi durum: alan altı hata, kaydet ikonunun rengi, sayaç.
2. `DgSnackbar`: geri alınabilir sonuç.
3. `DgBottomSheet` aileleri: `DgResultState`, `DgPermissionPrompt`, `DgAuthGate`.
4. Onay diyaloğu: yalnız geri alınamayan ve seyrek yapılan yıkıcı eylem.
5. Tam ekran: yalnız zorunlu güncelleme.

---

## 1. Splash ve uygulama açılışı

### Bu uygulamalar nasıl yapıyor

**Apple** ([HIG Launching](https://developer.apple.com/design/human-interface-guidelines/launching) [okundu]):
- Launch ekranı splash değildir ve "sanatsal ifade fırsatı değildir".
- İlk ekranla "neredeyse aynı" olmalıdır. Metin ve reklam içermez.
- Logo yalnız ilk ekranın sabit bir parçasıysa bulunabilir.
- İlk ekran düz renkse launch ekranı yalnız o rengi gösterir.
- Splash gerekiyorsa onboarding'in başında gösterilir.
- Uygulama yeniden açıldığında önceki durum geri yüklenir: kaydırma konumu dahil.

**Android 12+** ([SplashScreen API](https://developer.android.com/develop/ui/views/launch/splash-screen) [okundu]):
- Sistem soğuk ve ılık açılışta her zaman bir splash çizer. Splash tek opak zemin üstünde ortalanmış uygulama ikonudur.
- Hareketli ikon telefonda "1.000 ms'yi geçmemeli". Gecikmeli başlangıç en çok 166 ms olabilir.
- Alttaki marka görseli "önerilmez".
- Splash, arayüz görsel olarak kararlı hale gelince kapatılmalıdır. Yarım arayüz ya da ek spinner gösterilmez.
- Örnek çıkış animasyonu 200 ms'dir.

**Yemek uygulamaları:**
- Crouton tek dokunuşla yaklaşık 2 saniyede ana ekrana iner. Zorunlu kayıt ve tanıtım turu yoktur ([ScreensDesign · Crouton](https://screensdesign.com/showcase/crouton-recipe-manager) [ikincil, video incelemesi]).
- Tasty'de ATT izni splash'ten hemen sonra geliyor ([ScreensDesign · Tasty](https://screensdesign.com/showcase/tasty-recipes-cooking-videos) [ikincil]). Bu iddia arama özetinde vardı, sayfanın kendisinde **doğrulanamadı**.

### DadaGastro önerisi

1. **Ayrı bir splash ekranı ya da logo animasyonu yok.**
   - iOS launch ekranı ana sayfa hero'sunun fotoğraf yüklenmeden önceki halidir: düz koyu taban (ink `#211E16`; web hero'nun kaynak koyu tonu kullanılacaksa o değer).
   - Resmi beyaz logo, ana sayfa header'ındaki konumunda ve boyutunda durur. Logo ilk ekranın sabit parçası olduğu için Apple kuralına uyar.
   - Ortaya büyük logo konmaz. Logo yeniden çizilmez ve renklendirilmez.
2. **Android 12+:** `windowSplashScreenBackground` aynı koyu tabandır. İkon resmi uygulama ikonudur. Hareketli ikon ve marka görseli kullanılmaz.
   - Çıkış: `base 200` + `standard` ile solma. Reduced-motion'da anında kapanır.
3. **Splash'i tutma süresi:**
   - Splash yalnız ilk kare çizilene kadar tutulur: yerel oturum ve önbellek okununcaya kadar.
   - Ağ beklenmez. Ağdan gelen içerik `DgSkeleton` ile gelir.
   - Hero fotoğrafı yüklenince `reveal 450` ile açılır.
4. **Durum geri yükleme:** Uygulama arka plandayken öldürüldüyse son ekran ve kaydırma konumu geri gelir. Pişirme modu açıksa aynı adım ve kalan zamanlayıcılar geri gelir (bkz. §8).
5. **HTML prototip (Faz 3, tıklanabilir prototip):** Açılış ekranı aynı ilkeyle kurulur: koyu taban + header konumunda resmi beyaz logo. Yalnız ilk kare ve yerel durum okunana kadar görünür; yapay bekleme süresi yoktur. Logo animasyonu yoktur. Çıkış `base 200` solma. Bu, Beyar'ın “açılış → tanıtım → ana sayfa” giriş noktası talebiyle uyumludur.
6. **Marka bağı:** Splash ve uygulama ikonu için resmi varlık eksik (docs/50 §11.4). `dadagastro-beyaz.svg` yalnız onayla kullanılır.

### Flutter karşılığı

- **Splash:** `flutter_native_splash` 2.4.8 ([pub.dev](https://pub.dev/packages/flutter_native_splash) [okundu]) iOS launch storyboard'unu ve Android 12 `android_12` bölümünü üretir: `color`, `image`, `icon_background_color` ve `branding` (branding kullanılmayacak).
- **Tutma ve kaldırma:** `FlutterNativeSplash.preserve()` ve `remove()` ile yalnız yerel hazırlık süresince tutulur.
- **Koyu tema:** `color_dark` ile verilir. Paket, splash'in uygulama içi tema ayarını izleyemeyeceğini belirtiyor.
- **Özel çıkış animasyonu:** Android'de `setOnExitAnimationListener` için yerel Kotlin gerekir. Paketin bunu sağlayıp sağlamadığı **doğrulanamadı**.
- **Durum geri yükleme:** `MaterialApp.restorationScopeId` + `RestorationMixin`.

---

## 2. Onboarding ve tercih toplama

### Bu uygulamalar nasıl yapıyor

**Apple** ([HIG Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) [okundu]):
- Onboarding "hızlı, eğlenceli ve isteğe bağlı" olmalıdır.
- Atlanan tur sonraki açılışlarda tekrar gösterilmez ama ayarlardan bulunabilir.
- Zorunlu olmayan kurulum ve özelleştirme ertelenir. Makul varsayılanlar verilir.
- Tek bir uzun akış yerine bağlama özgü ipuçları önerilir.

**Tercih ve kayıt örnekleri:**
- **Duolingo** kaydı ilk başarıdan sonraya erteledi. Bu değişikliğe yaklaşık %20 günlük aktif kullanıcı artışı atfediliyor ([Taplytics](https://taplytics.com/blog/duolingo-ab-test-onboarding) [ikincil; rakam bağımsız doğrulanamadı]).
- **Tasty** görsel ızgaradan en az üç tarif seçtiriyor, sonra pişirme tarzı soruyor ([ScreensDesign · Tasty](https://screensdesign.com/showcase/tasty-recipes-cooking-videos) [ikincil]). Erken zorunlu kayıt aynı incelemede sürtünme diye eleştiriliyor (00:27).
- **Kitchen Stories** öneriyi vegan, vejetaryen ve glutensiz gibi diyet tercihlerine göre kişiselleştiriyor ([App Store](https://apps.apple.com/us/app/kitchen-stories-recipes/id771068291) [okundu]).
- **Mealime** klasik, fleksiteryen, pesketaryen, düşük karbonhidrat, paleo ve keto seçenekleri sunuyor ([App Store](https://apps.apple.com/us/app/mealime-meal-plans-recipes/id1079999103) [okundu]).
- **Samsung Food** onboarding'de diyet, alerji, hedef ve mutfak soruyor ([arama özeti](https://www.androidcentral.com/apps-software/samsung-food-app-launch) [ikincil, doğrulanamadı]).

**DadaGastro'da zaten var [repo]:** `OnboardingController` kayıttan sonra 4 adımlı, atlanabilir bir tercih sihirbazı çalıştırıyor. Seçimler `user_preferences`'a yazılıyor. `onboarded_at` doluysa sihirbaz tekrar gösterilmiyor. Aynı seçenekler `/hesabim/beslenme` ucundan değiştirilebiliyor. Seçenek listeleri:

| Grup | Seçenekler |
|---|---|
| Beslenme | Kısıtlamam Yok, Vejetaryen, Vegan, Glutensiz, Laktozsuz, Düşük Kalori, Ketojenik, Akdeniz |
| Mutfak (12) | Türk, İtalyan, Meksika, Japon, Hint, Fransız, Çin, Yunan, Kore, Orta Doğu, Tayland, İspanyol |
| Alerjen (10) | Gluten, Laktoz/Süt, Yumurta, Yer Fıstığı, Kabuklu Yemiş, Deniz Ürünleri, Soya, Susam, Hardal, Kereviz |
| Bildirim (3) | Haftalık Menü (E-posta), Takip & Yorum (Push), Kampanya (E-posta) |

Yorumdaki not: "push bildirim altyapısı projede hiç yok". Bu ekranlar canlıda giriş duvarının arkasında. Repo ile canlının aynı olduğu **doğrulanamadı**.

### DadaGastro önerisi

1. **Tanıtım: karar gerekiyor.** Araştırma bulgusu (Apple HIG; Duolingo/Crouton örnekleri) tanıtım karuselini önermiyor. Değer önerisi içeriğin kendisidir ve zorunlu olmayan kurulum ertelenmelidir. Beyar'ın prototip talebi ise “açılış → tanıtım → ana sayfa”. İki seçenek:
   - **A (araştırma önerisi):** Tanıtım karuseli yok. İlk açılış doğrudan Ana Sayfa'ya iner. Tercih sihirbazı kayıttan sonra açılır.
   - **B (talebe uyan, sade):** Tek ekranlık karşılama (logo + uygulamanın gerçek modülleri: Tarifler, Ne Pişirsem, Dolapta Ne Var, Tabaktan Tarif; uydurma slogan ve sayaç yok) + “Tercihlerini seç (isteğe bağlı)” / “Atla”. Misafirin seçimi cihazda tutulur, kayıt olunca hesaba aktarılır. Kaynakta misafir tercihi yoktur; bu bir prototip/mobil eki olarak etiketlenir.
   - Her iki seçenekte de “Atla” her ekranda vardır ve ekran bir daha gösterilmez.
2. **Tercih sihirbazı webdeki gibi kayıttan sonra açılır.** `DgAuthGate` → kayıt tamam → tercihler → kullanıcının geldiği yere dönüş. Misafire tercih sorulmaz, çünkü kaynakta misafir tercihi yok.
   - **Adım sayısı ve sırası webdeki 4 adımla aynı:** beslenme → mutfak → alerjen → bildirim.
   - Bildirim adımı yalnız gerçek karşılığı olan e-posta seçeneklerini gösterir. "Push" seçeneği, push altyapısı kurulana kadar ya gösterilmez ya da "Yakında" ile bildirilir (**karar bekliyor**).
3. **Ekran düzeni:**
   - Üstte ilerleme göstergesi (4 bölme), sağda "Atla", solda geri.
   - Seçenekler çoklu seçimli `DgChip` (44 yükseklik, radius 12, aralık 8).
   - "Kısıtlamam Yok" diğer beslenme seçimlerini temizleyen tekil seçenektir. Bu davranış webde de aynıysa uygulanır; **repo davranışı doğrulanmalı**.
   - Altta sabit birincil düğme: "Devam" ya da son adımda "Bitir".
4. **Atlama:**
   - "Atla" bütün sihirbazı geçer: web `onboarding.skip` ucu bütün akışı atlıyor.
   - Atlama ve tamamlama ikisi de kalıcıdır. Sihirbaz bir daha açılmaz. Tercihler Profil → Ayarlar → "Beslenme ve mutfak tercihleri" satırındadır (`DgListTile`).
5. **Hareket:**
   - Adımlar arası yatay itme `sheet 250` + `standard` ile olur: sayfa itmeyle aynı aile.
   - Chip seçiminde renk değişimi `fast 150`, haptik `selection` (bkz. §5).
   - Reduced-motion'da adımlar anında değişir.
6. **Alerjen notu:** Alerjen adımında kaynakta bir uyarı metni varsa aynen kullanılır. Yoksa metin uydurulmaz. "Tarifleri bu alerjenlere göre süzme garantisi" gibi bir vaat yazılmaz.
7. **Bağlamsal ipucu:** Ayrı bir tanıtım yerine, Ne Pişirsem sheet'i ilk açıldığında üç yöntemin kısa açıklaması zaten `.action-card` alt satırlarında durur. Ek ipucu katmanı eklenmez.

### Flutter karşılığı

- **Sihirbaz:** `PageView` (`physics: NeverScrollableScrollPhysics`) ve `PageController.animateToPage(duration: 250ms, curve: Cubic(.22,.61,.36,1))`.
- **Seçim:** `FilterChip`, ya da kanon görünümü için özel `DgChip`.
- **Kalıcılık:** Sunucuya yazılır. `onboarded_at` sunucudan okunur.
- **Ayarlar dönüşü:** Aynı form, ayarlardan `DgPageRoute` ile açılır.

---

## 3. İzin istemleri (bildirim, kamera)

### Bu uygulamalar nasıl yapıyor

**Apple izin kuralları** ([HIG Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy) [okundu]):
- İzin ancak özellik kullanılınca istenir. Uygulama açılışında istenmez, özellik çalışmak için gerekmedikçe.
- İzin öncesi özel ekran yalnız bağlam yetmiyorsa kullanılır. Bu ekranda **tek düğme** ("Devam" ya da "İleri") bulunur ve düğme sistem uyarısını açar.
- Bu ekranda İptal ya da Kapat **bulunmaz**.
- Amaç cümlesi etken çatılı, somut ve noktalıdır. Apple'ın kötü örneği: "daha iyi deneyim için gerekli".

**Apple bildirim izni** ([Asking permission to use notifications](https://developer.apple.com/documentation/usernotifications/asking-permission-to-use-notifications) [okundu]):
- İzin bağlamda istenir. Apple'ın örneği: ilk görev planlandıktan sonra.
- İlk istekten sonra sistem bir daha sormaz.
- "Provisional" izin bildirimleri sessizce yalnız Bildirim Merkezi'ne düşürür.

**Apple pazarlama bildirimleri** ([HIG Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications) [okundu]):
- Pazarlama bildirimi açık onay olmadan gönderilmez.
- Kullanıcı bildirim tercihini uygulama içinden yönetebilmelidir.
- "Time Sensitive" yalnız şu an olan ya da bir saat içinde olacak olaylar içindir.

**App Store 5.1.1(iv)** ([Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) [okundu]): Mümkünse izin vermeyene alternatif yol sunulur. Örnek: konum yerine elle adres girme.

**Android 13 POST_NOTIFICATIONS** ([notification-permission](https://developer.android.com/develop/ui/views/notifications/notification-permission) [okundu]):
- API 33'ü hedefleyen uygulamada izin diyaloğunun ne zaman çıkacağı tamamen uygulamaya bağlıdır. Yeni kurulumda bildirim kapalı başlar.
- Önerilen tetikler bağlamsaldır. Örnek: zil düğmesine dokunma.
- 12L ve altını hedefleyen uygulamada ilk kanal açılınca, yani çoğunlukla açılışta, sistem kendisi sorar.

**Android genel izin kuralları** ([requesting permissions](https://developer.android.com/training/permissions/requesting) [okundu]):
- Gerekçe ekranı yalnız `shouldShowRequestPermissionRationale()` true dönerse gösterilir ve içinde "hayır, teşekkürler" bulunur.
- Kullanıcı engellenmez. Ret durumunda özellik zarifçe kısıtlanır.
- Aynı izin birden çok kez reddedilince sistem diyaloğu bir daha çıkmaz.
- "Kararını değiştirmeye ikna etmek için sistem ayarlarına bağlantı verme."

**Gözlenen uygulamalar:** Crouton incelemesinin ilk dakikalarında işletim sistemi izin istemi görülmüyor; yalnız puanlama istemi var ([ScreensDesign](https://screensdesign.com/showcase/crouton-recipe-manager) [ikincil]).

**Platform farkı (dikkat):**
- Apple: ön ekranda tek düğme, iptal yok.
- Android: gerekçe ekranında iptal zorunlu.
- İkisini de karşılamanın en güvenli yolu, gerekçeyi ayrı ekran yerine **özelliği tetikleyen düğmenin yanında satır içi** vermektir.

### DadaGastro önerisi

**Bildirim izni (yerel zamanlayıcı bildirimi):**
1. **Tetik:** Kullanıcı pişirme modunda ilk kez bir zamanlayıcı başlatır.
2. **Gerekçe satır içidir.** Zamanlayıcı satırının altında meta rolünde tek bir cümle durur: "Ekran kilitliyken de süre dolunca haber vermek için bildirim izni isteyeceğiz." Ardından doğrudan sistem diyaloğu açılır. Ayrı bir ön ekran yoktur.
3. **Bildirim için amaç metni yok:** iOS bildirim uyarısının metnini sistem yazar; kamera için olduğu gibi bir "usage description" anahtarı yoktur. Gerekçe bu yüzden yalnız 2. maddedeki satır içi cümleyle verilir.
4. **Ret durumunda:** Zamanlayıcı yine çalışır. Uygulama açıkken 3× bip, alarm ve haptik verilir, ekran açık kalır. Zamanlayıcı şeridinde kalıcı not durur: "Bildirimler kapalı · süre dolunca yalnız uygulama açıkken uyarırız." Snackbar ya da diyalog çıkmaz.
5. **Ayarlara yönlendirme:**
   - Yalnız kullanıcı aynı özelliği tekrar açmaya çalıştığında ve izin kalıcı olarak reddedilmişse yapılır.
   - Bu durumda `DgPermissionPrompt` sheet'i açılır. İçerik: başlık (sheet18), tek cümle, ikili eşit düğme ("Şimdi değil" · "Ayarları aç").
   - Uygulama açılışında ya da rastgele anlarda ayarlara yönlendirilmez (Android kuralı).
6. **İçerik bildirimleri** (takip, yorum, beğeni) ayrı bir izindir.
   - [repo]'da push gönderici yok. Bu bildirimler için mobilde sistem izni **istenmez**.
   - Uygulama içi bildirim merkezi çalışır (bkz. §7). Push altyapısı gelince tetik, bildirim merkezindeki boş durumdaki "Bildirimleri aç" eylemi olur.
   - Pazarlama (Kampanya) yalnız webdeki e-posta tercihi olarak kalır.
7. **Provisional izin kullanılmaz.** Zamanlayıcıya ses gerekir; provisional bildirim sessizdir.

**Kamera izni (Tabaktan Tarif):**
1. **Tetik:** "Fotoğraf çek" düğmesine dokunmak.
2. **Gerekçe:** Düğmenin altında satır içi tek cümle.
3. **Alternatif yol:** Kamera düğmesinin yanında eşit ağırlıkta "Galeriden seç" eylemi bulunur.
   - Android fotoğraf seçici yalnız seçilen görsellere erişim verir ([photopicker](https://developer.android.com/training/data-storage/shared/photopicker) [okundu]).
   - iOS PHPicker'ın izin istemediği genel bilgi; resmi sayfada **doğrulanamadı**.
4. **Ret durumunda:** Kamera alanı `DgErrorState` olur ("Kamera izni kapalı" + "Galeriden seç" + "Ayarları aç"). Akış kilitlenmez.
5. **Amaç cümlesi (`NSCameraUsageDescription`):** "Tabağının fotoğrafından benzer tarifleri bulmak için kamerayı kullanır."
6. **Canlı demo kuralı:** Canlı demoda kamera, örnek fotoğrafla yapılan bir simülasyondur ve `getUserMedia` çağrılmaz (AGENTS). Bu desen Flutter içindir.

**Kesin zamanlayıcı ve alarm kısıtı (Flutter'da çözülmeli):**
- **Android 14:** `SCHEDULE_EXACT_ALARM`, API 33+ hedefleyen yeni kurulumlarda varsayılan olarak verilmiyor. `USE_EXACT_ALARM` yalnız alarm saati ve takvim uygulamaları içindir ([schedule-exact-alarms](https://developer.android.com/about/versions/14/changes/schedule-exact-alarms) [okundu]). Yemek uygulamasının bu sınıfa girip girmediği **doğrulanamadı** (Play politikası).
  - Öneri: zamanlayıcı çalışırken süreli ve geri sayan "ongoing" bir bildirim gösterilir. Bitiş için kesin alarm izni varsa kullanılır; yoksa ret yolu (madde 4) geçerlidir.
- **iOS:** Zamanlayıcı bitişi için "Time Sensitive" seviyeli yerel bildirim uygundur, çünkü olay bir saat içindedir.
  - iOS 26 **AlarmKit** alarm ve geri sayım zamanlayıcıları planlar ([AlarmKit](https://developer.apple.com/documentation/alarmkit) [okundu: özet]). Ayrı yetki gerektirir. Sessiz modu ve Odak'ı delip delmediği sayfada yazmıyor, **doğrulanamadı**. Değerlendirme listesine alınmalı.

### Flutter karşılığı

- **İzin akışı:** `permission_handler` 13.0.2 ([pub.dev](https://pub.dev/packages/permission_handler) [okundu]) şunları sağlar: `Permission.camera.request()`, `status`, `isPermanentlyDenied`, `shouldShowRequestRationale` (yalnız Android) ve `openAppSettings()`.
  - Android'de `status` kalıcı reddi `denied` olarak döndürür. Kalıcı ret ancak `request()` sonucuyla anlaşılır.
- **Bildirimler:** `flutter_local_notifications` 22.3.1 [repo kaynak kodu okundu]:
  - `InterruptionLevel.timeSensitive` (Xcode yetkisi gerekir).
  - Android ayrıntıları: `usesChronometer` + `chronometerCountDown` + `ongoing`.
  - `AndroidScheduleMode.exactAllowWhileIdle` / `inexactAllowWhileIdle` / `alarmClock`.
  - Android 16 için `requestPromotedOngoing` (Live Update).
- **Galeri:** `image_picker`, sistem fotoğraf seçicisini kullanır.

---

## 4. Giriş ve kayıt mobil akışı

### Bu uygulamalar nasıl yapıyor

**App Store 4.8 (güncel metin)** ([Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) [okundu]):
- Birincil hesap için üçüncü taraf ya da sosyal giriş (Google, Facebook vb.) kullanan uygulama, eşdeğer bir seçenek daha sunmak zorundadır. Bu seçenek yalnız ad ve e-posta toplar, e-postayı gizli tutma imkanı verir ve onaysız reklam takibi yapmaz.
- Güncel metin "Apple ile Giriş" adını zorunlu olarak anmıyor. Apple ile Giriş bu üç koşulu karşılayan bilinen seçenektir.
- **İstisna:** Uygulama "yalnız şirketin kendi hesap kurulumunu" kullanıyorsa ek giriş servisi gerekmez.

**App Store 5.1.1(v)** (aynı kaynak):
- Önemli hesap özelliği yoksa uygulama girişsiz kullanılabilmelidir.
- Hesap açma varsa **uygulama içinden hesap silme** zorunludur ([Offering account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) [okundu]):
  - Kolay bulunur, genellikle hesap ayarlarındadır.
  - Yalnız dondurma yetmez.
  - Web'de tamamlanacaksa doğrudan sayfaya bağlantı verilir.
  - Onay adımı olabilir ama "gereksiz zor" olamaz.
  - Süre alacaksa kullanıcıya söylenir.
  - Apple ile Giriş belirteçleri REST API ile iptal edilir.

**HIG Sign in with Apple** ([HIG](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple) [okundu]):
- Giriş yalnız değer karşılığı istenir ve "mümkün olduğunca geç" sorulur.
- Apple düğmesi diğer giriş düğmelerinden küçük olamaz ve kaydırmadan görünür. En küçük boyut 140×30 pt'dir.

**Duolingo ve Tasty:** Duolingo kaydı ertelemeyi başarıyla kullanıyor [ikincil]. Tasty'nin erken kaydı sürtünme diye eleştiriliyor [ikincil]. Kaynaklar §2'de.

**Apple metin alanları** ([HIG Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) [okundu]):
- Şifre için güvenli alan kullanılır.
- Yer tutucu yazmaya başlayınca kaybolduğu için ayrı bir etiket önerilir.
- Uygun klavye türü seçilir. Alanın sonunda temizle düğmesi bulunur.

**DadaGastro webi [repo]** (`resources/views/auth/index.blade.php`):
- Giriş e-posta ve şifreyledir (Laravel Fortify).
- "Beni Hatırla" ve "Şifremi unuttum" var. Kayıtta "Şifre (Tekrar)" alanı var.
- Google ve Facebook düğmeleri `disabled` + "Yakında". Not: "Telefon ile giriş + sosyal login backend'i yok".
- Dönüş `?return=` + `SafeRedirect` ile yapılıyor.
- Şifre alanlarında `autocomplete="current-password"` ve `new-password` var.

### DadaGastro önerisi

1. **4.8 sonucu:** Sosyal giriş backend'i olmadığı sürece mobil de yalnız kendi e-posta hesabını sunar. Bu 4.8 istisnasına girer ve ek giriş servisi gerekmez.
   - Google ya da Facebook açılırsa Apple ile Giriş **aynı sürümde** ve eşit boyda eklenmelidir.
   - O zamana kadar sosyal düğmeler webdeki gibi "Yakında" bildirir ve gerçek işlem varmış gibi gösterilmez.
2. **Misafir devam:** Göz atma, arama, tarif detayı ve pişirme modu girişsizdir.
3. **`DgAuthGate`'i açan üye eylemleri:** kaydet, Ben de Yaptım, Eline Sağlık, yorum, takip, son aramalar, Tabaktan Tarif kotası.
   - Sheet: tutma çubuğu, başlık (sheet18) eylem bağlamıyla yazılır, örneğin "Tarifi kaydetmek için giriş yap".
   - Altında tek satır fayda cümlesi bulunur. Webde benzer metin varsa o kullanılır: arama sayfasında "Son aramalarını görmek ve kaydetmek için DadaGastro hesabına giriş yapman gerekiyor." [repo].
   - Düğmeler: "Giriş yap" (birincil) · "Kayıt ol" (ikincil), eşit iki sütun, 12 aralık, 52 yükseklik.
   - Sheet backdrop ve sürükleme ile kapanır. Kapanınca hiçbir şey olmaz.
4. **Kaldığı yere dönüş (bekleyen eylem):**
   - Kapı, eylemi ve hedefi saklar. Örnek: `{eylem: kaydet, tarif: id}`.
   - Giriş başarılı olunca giriş ekranı kapanır, kullanıcı aynı ekrana ve aynı kaydırma konumuna döner.
   - Eylem otomatik tamamlanır. Kaydet ikonu `savePop 450` ile primary olur. `DgSnackbar` "Mutfak Defterim'e kaydedildi" mesajını "Gör" eylemiyle verir.
   - Bu, webdeki `?return=` ilkesinin mobil karşılığıdır.
5. **Giriş ve kayıt ekranı:**
   - Tam sayfa `DgPageRoute` olarak açılır. Sheet değildir, çünkü uzun form ve klavye var.
   - "Giriş · Kayıt" geçişi `DgSegmented` ile yapılır.
   - Alanlar: e-posta (e-posta klavyesi, otomatik büyük harf kapalı) ve şifre.
6. **Şifre göster/gizle:**
   - Alanın sonunda 44 hedefli, 18 ikonlu bir düğme: `fa-eye` / `fa-eye-slash`.
   - `aria-label` "Şifreyi göster" / "Şifreyi gizle" olarak değişir.
   - Durum değişimi `fast 150`. Gönderimden sonra gizliye döner.
7. **Otomatik doldurma:** E-posta `email`/`username`, giriş şifresi `current-password`, kayıt şifresi `new-password` ipucunu alır. Giriş başarılı olunca platformun şifre kaydetme istemi tetiklenir.
8. **Hatalar:** Hata alan altında satır içi gösterilir (webdeki `fk-err` ilkesi). Diyalog açılmaz. Gönderim başarısızsa haptik `error` verilir. Odak ilk hatalı alana gider.
9. **Hesap silme:** Profil → Ayarlar → Hesap → "Hesabı sil" (bkz. §7).

### Flutter karşılığı

- **Otomatik doldurma:** `AutofillGroup` + `TextField(autofillHints: [AutofillHints.email])`, şifrede `AutofillHints.password` / `newPassword`. Başarıda `TextInput.finishAutofillContext(shouldSave: true)` çağrılır ([AutofillGroup](https://api.flutter.dev/flutter/widgets/AutofillGroup-class.html) [okundu]).
- **Şifre ve kapı:** Şifre `obscureText` + `suffixIcon` ile yapılır. Kapı `showModalBottomSheet(showDragHandle: true)` ile açılır.
- **Bekleyen eylem:** Router `redirect` + `extra` ile taşınır.
- **İleride sosyal giriş:** `sign_in_with_apple` 8.2.0 (`SignInWithAppleButton`; Android web akışı ek kurulum ister) [okundu] ve `google_sign_in`.

---

## 5. Geçişler ve hareket

### Bu uygulamalar nasıl yapıyor

**Platform süreleri** (Flutter kaynak kodundan [okundu]):
- `CupertinoPageRoute` 500 ms. Eğriler: giren `fastEaseInToSlowEaseOut`, alttaki `linearToEaseOut`.
- Android varsayılanı `PredictiveBackPageTransitionsBuilder`. Commit 100 ms. FadeForwards 450 ms.
- Temel `PageTransitionsBuilder` 300 ms.
- Modal bottom sheet giriş 250 ms, çıkış 200 ms. Kapanma eşiği 0.5, fırlatma hızı 700.
- Snackbar geçişi 250 ms, görünme süresi 4000 ms.
- Kaynaklar: [page_transitions_theme.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/material/page_transitions_theme.dart), [cupertino/route.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/route.dart), [bottom_sheet.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/material/bottom_sheet.dart), [snack_bar.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/material/snack_bar.dart).

**M3 token'ları** ([MDC-Android Motion](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md) [okundu]):
- Standard `cubic-bezier(.2,0,0,1)`. Emphasized decelerate `(.05,.7,.1,1)`.
- Süreler: short 50–200, medium 250–400, long 450–600, extra-long 700–1000 ms.
- DadaGastro'nun `base 200` = short4, `sheet 250` = medium1, `reveal 450` = long1. Kanon M3 ölçeğiyle zaten örtüşüyor.

**Paylaşılan öğe:**
- Flutter `Hero`: aynı `tag`'li iki öğe rota geçişi sırasında uçar. Yeni sayfada ilk karede bulunmalıdır. `flightShuttleBuilder` ve `createRectTween` ile özelleşir ([Hero](https://api.flutter.dev/flutter/widgets/Hero-class.html) [okundu]).
- Airbnb'nin bildirimsel geçiş çerçevesi (Medium "Motion Engineering at Scale") **erişilemedi (403)**. Yalnız topluluk yeniden yapımı görüldü ([GitHub](https://github.com/bmarkowitz/declarative-uikit-transitions) [ikincil]).

**Sheet** ([HIG Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets) [okundu]; [MDC BottomSheet](https://github.com/material-components/material-components-android/blob/master/docs/components/BottomSheet.md) [okundu]):
- Apple: orta ve büyük yükseklik, yeniden boyutlanan sheet'te tutma çubuğu, aşağı kaydırarak kapatma.
- Kaydedilmemiş değişiklik varsa kapatmadan önce onay alınır.
- Ana arayüzden tek seferde tek sheet açılır.
- Android: scrim'e dokunma kapatır, tutma çubuğu 48 dp ve erişilebilirlik komutu alır, en geniş 640 dp.

**Haptik** ([HIG Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics) [okundu]):
- Tutarlı kullanılır, görselle birlikte çalışır, aşırı kullanılmaz ve kapatılabilir olmalıdır.
- iOS tipleri:
  - notification (success / warning / error): görevin sonucu.
  - impact (light / medium / heavy / rigid / soft): fiziksel çarpışma metaforu.
  - selection: değer değişirken.
- Flutter `HapticFeedback`: `lightImpact`, `mediumImpact`, `heavyImpact`, `selectionClick`, `vibrate`, `successNotification`, `warningNotification`, `errorNotification` ([HapticFeedback](https://api.flutter.dev/flutter/services/HapticFeedback-class.html) [okundu]).

**Instagram çift dokunuş beğeni:** Resmi mühendislik kaynağı bulunamadı. Haptik davranış **doğrulanamadı**.

**Pull-to-refresh:**
- Apple: yenileme kontrolüne başlık eklemek çoğunlukla gereksizdir. Otomatik yenileme de yapılmalıdır; her güncelleme kullanıcıya bırakılmaz ([HIG Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators) [okundu]).
- Flutter `RefreshIndicator`: varsayılan `displacement` 40, `.adaptive` kurucusu iOS'ta platforma uyar ([RefreshIndicator](https://api.flutter.dev/flutter/material/RefreshIndicator-class.html) [okundu]).

**İskelet** ([NN/g Skeleton screens](https://www.nngroup.com/articles/skeleton-screens/) [okundu]):
- 1 saniyenin altındaki yüklemede iskelet gerekmez. 10 saniyenin altında iskelet uygundur.
- Yalnız çerçeve gösteren iskelet kullanılmaz; gerçek yapı gösterilir.
- Hareketli iskelet dikkat dağıtabilir ve erişilebilirlik sorunu yaratabilir.
- Nabız ile parıltı arasında tercih belirtilmiyor.

**Sonsuz kaydırma** ([NN/g Infinite scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/) [okundu]):
- Akış ve keşif içerikleri için uygundur. Belirli bir şeyi arama ve karşılaştırma gibi hedefli işlerde önerilmez.
- Detaydan dönüşte liste konumu korunmalıdır.
- "Daha fazla yükle" sonu ve ilerlemeyi açık eder.

### DadaGastro önerisi

**1. Sayfa geçişi (`DgPageRoute`)**
- Sağdan itme `sheet 250` + `standard`. Geri dönüş `base 200` (yeni token önerisi `motion.exit`).
- iOS'ta kenardan kaydırarak geri dönüş korunur. Bunun için Cupertino rotası alt sınıflanır ve yalnız süre değiştirilir.
- **Karar bekliyor:** Android'de kanon 250ms itme mi, yoksa sistemin öngörülü geri hareketi (predictive back) mi? Android 15+'ta öngörülü geri varsayılan açık ([predictive back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) [okundu]).
- Tek kök önerisi: iki platformda aynı 250ms itme. Android'de geri hareketi boyunca sayfa parmağı izler.

**2. Paylaşılan öğe (kart → detay)**
- Tarif kartının görseli detay hero'suna uçar: `Hero(tag: 'tarif-gorsel-<id>')`. Uçuş, rota ile aynı 250ms'de biter.
- Uçuş sırasında köşe yarıçapı medya radius'undan (16; kart görseli kanonda 24 ise 24) hero'nun 0'ına iner. Bu `flightShuttleBuilder` ile yapılır.
- Kart üstündeki süre ve puan kapsülü ile kaydet düğmesi uçmaz. Bunlar `fast 150` ile solar, detayda header eylemleri `fast 150` ile belirir.
- Tarif başlığı uçmaz, çünkü satır kırılımı değişir ve metin bozulur.
- Reduced-motion'da Hero kapatılır (`HeroMode(enabled: false)`) ve geçiş anında olur.
- Yalnız tek görsel uçar. Birden çok öğenin uçuşu önerilmez.

**3. Sheet (`DgBottomSheet`)**
- Açılış `sheet 250`, kapanış `base 200` (öneri), scrim %50.
- Sürükleme yüksekliğin yarısını geçerse ya da hızlı aşağı fırlatılırsa sheet kapanır (Flutter varsayılanları 0.5 / 700).
- İçinde yazılmış ama gönderilmemiş metin varsa (yorum) sürükleyerek kapatmadan önce onay alınır: "Taslak silinsin mi?" · "Vazgeç" / "Sil".
- Sheet'ten sheet açılmaz. Önce ilki kapanır, sonra yenisi açılır (HIG).

**4. Yapışan başlık**
- Mevcut kanon geçerli: metin geometrisine göre ilk 48px içinde alfa 0→1.
- Bölüm başlıklarının ayrıca yapışması önerilmez. İstisna liste paneli; o da kanonda var.
- Detayda tarif adı header ortasına `fast 150` solmayla gelir.

**5. Kaydet ve beğeni mikro etkileşimi**
- Kaydet: ikon rengi primary olur ve tek bir ölçek vuruşu yapar (1 → 1.15 → 1, `savePop 450`, `standard`).
- Haptik `impactLight`. Toast yalnız ilk kayıtta "Mutfak Defterim'e kaydedildi · Gör" der. Sonraki kayıtlarda yalnız ikon değişir; tekrar eden toast gürültüdür.
- Kayıt kaldırılınca toast "Kayıt kaldırıldı · Geri al" der (bkz. §6).
- Eline Sağlık ve Ben de Yaptım aynı `savePop` ve `impactLight` kullanır.
- Çift dokunuşla beğeni **önerilmez**. Kaynakta karşılığı yok ve fotoğrafa dokunma zaten detaya gider.

**6. Haptik haritası (tek tablo, başka yerde haptik yok)**

| Durum | Tür | Örnekler |
|---|---|---|
| Değer değişimi | `selection` | Chip ya da segment seçimi, porsiyon artı/eksi, pişirme modunda adım değişimi, zamanlayıcı sürekleme |
| Durum değişimi | `impactLight` | Kaydet ya da kaldır, Eline Sağlık, Ben de Yaptım, alışveriş listesine ekle |
| Görev başarılı | `success` | Giriş tamamlandı, yorum gönderildi, son adımda "Afiyet olsun" |
| Uyarı | `warning` | Yıkıcı onay diyaloğunun açılışı |
| Hata | `error` | Form doğrulama, ağ hatası |
| Zamanlayıcı bitti | `alarm` | 3 bip ile eşzamanlı 3 kez `impactHeavy`, ardından alarm deseni |

- Haptik kapatılabilir: Ayarlar'da "Titreşim" anahtarı (`DgSwitch`), varsayılan açık.
- HTML prototip haptik vermez. Haptik yalnız belgede ve Flutter'dadır.

**7. Pull-to-refresh**
- Yalnız akış ekranlarında: Ana Sayfa, Tarif Listesi, Bildirimler. Detayda yoktur.
- Göstergenin yerleşme mesafesi 40, spacing `40` ile aynıdır.
- Başlık metni ve ayrı haptik yok (platform varsayılanı).
- Yenileme bitince içerik `reveal 450` ile değil anında değişir. Yeni öğe varsa liste başına eklenir.
- Uygulama ön plana dönünce, son yenilemeden belli bir süre geçtiyse otomatik yenilenir (HIG). Eşik **karar bekliyor**.

**8. İskelet (`DgSkeleton`)**
- Shimmer değil, kanondaki **nefes** kullanılır: 1000ms, opaklık 1↔.65.
- Gerekçe: NN/g bu ikisi arasında tercih belirtmiyor ama harekete karşı dikkat çekiyor. Nefes, parıltıya göre daha az hareketli ve reduced-motion'da sabit griye iner.
- Yükleme 450ms'yi geçmezse iskelet hiç gösterilmez (yeni token önerisi `motion.skeletonDelay = reveal 450`). Bu, kısa yüklemedeki göz kırpma etkisini önler.
- İskelet gerçek yerleşimle aynı DOM ve ölçülerdedir, `aria-busy` taşır (kanon).

**9. Sonsuz kaydırma mı, sayfalama mı (tek karar)**
- **Ana Sayfa:** Sınırlı ve küratörlü modüllerdir. Sonsuz akış yoktur.
- **Tarif Listesi ve Bildirimler:** Hedefli işlerdir, bu yüzden **"Daha fazla göster" düğmeli sayfalama**.
  - Sayfa boyutu webdeki gibidir. Bildirimlerde [repo] `paginate(20)`. Tarif listesinde web sayfa boyutu **doğrulanmalı**.
  - Toplam sayı görünür, örneğin "2.693 tarif".
  - Düğmeye basınca altına 2 iskelet kart gelir. Hata olursa aynı yerde `DgErrorState` satırı ve "Tekrar dene" çıkar.
  - Detaydan dönüşte kaydırma konumu ve yüklenmiş sayfalar korunur.
- Gerekçe NN/g: sonuç sayısı ve hedefli arama için sonsuz kaydırma yerine sonu belirgin yükleme.

### Flutter karşılığı

- **Rota:** `class DgPageRoute<T> extends CupertinoPageRoute<T> { @override Duration get transitionDuration => const Duration(milliseconds: 250); }`. Ters süre için `reverseTransitionDuration` override edilir.
  - Cupertino eğrisi sabittir. Kanon eğrisi isteniyorsa `buildTransitions` özelleştirilir; geri kaydırma hareketi `CupertinoRouteTransitionMixin`'den gelir.
- **Paylaşılan öğe:** `Hero` + `flightShuttleBuilder` (`ClipRRect` radius interpolasyonu) ve `HeroMode`.
- **Sheet:** `showModalBottomSheet(showDragHandle: true, isScrollControlled: true, sheetAnimationStyle: AnimationStyle(duration: 250ms, reverseDuration: 200ms, curve: ...))`, en yüksek 0.85 ekran.
- **Yapışan header:** `SliverAppBar(pinned: true)`, ya da kanondaki alfa hesabı için `ScrollController` dinleyicisi ve `SliverPersistentHeader`.
- **Haptik:** `HapticFeedback.*` bir `DgHaptics` sarmalayıcıdan çağrılır; kullanıcı anahtarını bu sarmalayıcı okur.
- **Yenileme:** `RefreshIndicator.adaptive`.
- **İskelet:** `AnimationController(duration: 1000ms)..repeat(reverse: true)` + `FadeTransition(1→.65)`. Reduced-motion kontrolü `MediaQuery.disableAnimationsOf(context)`.
- **Sayfalama:** `PageStorageKey` ile konum korunur.

---

## 6. Geri bildirim

### Bu uygulamalar nasıl yapıyor

**Snackbar:**
- Material snackbar 4 ile 10 saniye arasında görünür, aynı anda tek snackbar bulunur ve kalıcı alt gezinmenin üstünde durur ([material.io snackbars](https://material.io/components/snackbars) [ikincil: arama özeti; sayfa JS ile çizildiği için doğrudan okunamadı]).
- MDC belgesi [okundu]:
  - Yeni snackbar eskisini kapatır.
  - `setAnchorView` ile alt gezinmenin üstüne yerleşir.
  - Eyleme basılınca kapanır.
  - Metni ekran okuyucuya otomatik iletilir.
- Flutter `SnackBar` varsayılanı 4.0 s. TalkBack ya da VoiceOver açıkken eylemli snackbar zaman aşımına uğramaz (`accessibleNavigation`) ([SnackBar](https://api.flutter.dev/flutter/material/SnackBar-class.html) [okundu]).

**Uyarılar** ([HIG Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts) [okundu]):
- Seyrek kullanılır.
- Yaygın ve geri alınabilen eylemler için uyarı gösterilmez, yıkıcı olsalar bile.
- Seyrek ve geri alınamayan yıkıcı eylemde uyarı gösterilir.
- Düğme adı sonucu anlatan fiildir. "Tamam", "Evet" ve "Hayır" kullanılmaz. İptal her zaman "İptal"dir ve varsayılan düğme olamaz.
- Kullanıcının bilerek seçtiği yıkıcı eylemin düğmesi yıkıcı stil almaz.

**Hata** ([HIG Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback) [okundu]): Komut yerine getirilemiyorsa nedeni anlatılır.

**Güncelleme** ([Play in-app updates](https://developer.android.com/guide/playcore/in-app-updates) [okundu]):
- "Flexible": arka planda indirilir, kullanıcı uygulamayı kullanmaya devam eder.
- "Immediate": tam ekran ve engelleyicidir; yalnız temel işlevi bozan kritik güncellemelerde kullanılır.
- iOS'ta buna denk sistem API'si yok. App Store sürüm kontrolü uygulama tarafından yapılır (genel bilgi, Apple kaynağında **doğrulanamadı**).

**Offline:** YouTube ve Netflix'in çevrimdışı şerit metinleri için resmi kaynak bulunamadı (**doğrulanamadı**).

### DadaGastro önerisi

**1. `DgSnackbar` (toast)**
- **Konum:** Alt menünün üstünde 8 boşlukla durur. Alt menü 64 + alt dış 8 + aralık 8 = **80 + safe-area**; kanondaki sayfa sonu boşluğuyla aynı değer.
- Detayda CTA çubuğunun üst kenarından 8 yukarıda durur. Yatay dış boşluk 16, radius 12.
- Zemin ink `#211E16`, metin beyaz, eylem metni tint `#FBE9E3`. Eylem metninin kontrastı ölçülmeli.
- **Süre:**
  - Eylemsiz bilgi: `toast 2800`.
  - Eylemli ("Geri al", "Gör"): **4000ms** (yeni token önerisi `motion.toastAction`; M3 alt sınırı ve Flutter varsayılanı).
  - Ekran okuyucu açıkken eylemli toast kendiliğinden kapanmaz.
- **Hareket:** Giriş `quick 180` (aşağıdan 8 + solma), çıkış `fast 150`.
- Tek seferde tek toast. Yenisi eskisini kapatır. Aşağı kaydırarak kapatılabilir.
- **Geri al kapsamı:** Kayıt kaldırma, son aramayı silme, son aramaları temizleme, bildirimi silme, alışveriş listesinden çıkarma. Bunlar diyalog açmaz (HIG).

**2. Onay diyaloğu**
- Yalnız geri alınamayan ve seyrek eylemlerde: hesap silme, oturumu kapatma (isteğe bağlı), yazılmış yorumu atma.
- **Düğmeler:** Sağda ya da üstte sonucu anlatan fiil ("Sil", "Çıkış yap"). Solda ya da altta "İptal".
- Kullanıcının bilerek seçtiği "Hesabı sil" düğmesi yıkıcı renk almaz (HIG). Kazara tetiklenebilecek ikincil yıkıcı eylemler yıkıcı renk alır. Yıkıcı renk token'ı yok (**karar bekliyor**); primary ile karıştırılmamalı.
- Haptik `warning`.
- **Form:** Kısa olduğu için ortada uyarı (`AlertDialog.adaptive`) kullanılır, sheet değil. HIG ve Material ikisi de onayı diyalogla yapıyor.

**3. Boş durum (`DgEmptyState`)**
- Yapı: tek FA solid ikon (22), başlık (bölüm20), tek cümle açıklama (gövde15) ve en fazla bir birincil çıkış.
- Örnekler:
  - Mutfak Defterim boş: "Tariflere göz at" → Tarifler.
  - Bildirim yok: kaynak metin kullanılır (bkz. §7).
- Görsel ve illüstrasyon uydurulmaz.

**4. Hata (`DgErrorState`)**
- Nedeni söyler ("Bağlantı kurulamadı", "Sunucu yanıt vermedi") ve tek çıkış verir: "Tekrar dene".
- Tam sayfa hata yalnız ilk yükleme başarısızsa gösterilir. Kısmi hata ilgili bölümün yerinde satır olarak çıkar.

**5. Offline şeridi (kalıcı)**
- Header'ın hemen altında, içerik panelinin üstünde durur. Yükseklik **32** (yeni bileşen token önerisi).
- Ink zemin, beyaz meta13 metin "Çevrimdışısın · kayıtlı içerik gösteriliyor", `fa-wifi` 14. Yerel FA'da `wifi-slash` yok; `fa-wifi` var [repo kontrolü].
- **Hareket:** Bağlantı kesilince `quick 180` ile kayarak iner. Geri gelince 2800ms "Yeniden çevrimiçisin" der ve kalkar.
- **Etkileşim:** Şerit dokunulamaz; bilgi amaçlıdır.
- Çevrimdışıyken üye eylemleri devre dışı değildir. Eylem kuyruğa alınır ve snackbar "Bağlantı gelince gönderilecek" der. Kuyruk desteği **karar bekliyor**. Desteklenmeyecekse eylem `DgErrorState` toast'ı verir.

**6. Güncelleme gerekli**
- **İsteğe bağlı:** Bir kez gösterilen `DgBottomSheet`: başlık "Yeni sürüm hazır", tek cümle, "Şimdi değil" · "Güncelle".
  - Android'de Play "flexible" akışı kullanılır. İndirme bitince snackbar "Güncelleme hazır · Yeniden başlat" der.
- **Zorunlu:** Yalnız sunucu en düşük sürümü yükseltmişse ve eski sürüm çalışamıyorsa gösterilir.
  - Tam ekran `DgResultState`: ikon, başlık, tek cümle, tek düğme "Güncelle". Geri ve kapat yok.
  - Android'de "immediate" akış, iOS'ta App Store bağlantısı kullanılır.
  - Zorunluluk eşiği sunucu yapılandırmasından okunmalıdır. [repo]'da böyle bir uç **bulunmadı**.

### Flutter karşılığı

- **Snackbar:** `ScaffoldMessenger.showSnackBar(SnackBar(behavior: SnackBarBehavior.floating, margin: EdgeInsets.fromLTRB(16,0,16,80+safe), duration: 2800/4000ms, action: SnackBarAction(...)))`.
- **Diyalog ve sheet:** `AlertDialog.adaptive` + `showAdaptiveDialog`.
- **Bağlantı:** `connectivity_plus` 7.3.2. Bağlantı tipi gerçek erişim demek değildir; ilk başarısız istekle teyit edilir.
- **Güncelleme:** `in_app_update` 5.0.0 (Android) ve `upgrader` 13.7.0 (iOS mağaza sürüm kontrolü). Paket sürümleri pub.dev API'sinden okundu; işlev ayrıntıları **doğrulanmadı**.

---

## 7. Arama, bildirim merkezi, ayarlar

### 7a. Arama

#### Bu uygulamalar nasıl yapıyor

**Apple ve Material:**
- Apple: yazmadan önce son aramalar, yazarken öneri. Arama geçmişi silinebilir olmalı. Aramanın kapsamı açıkça gösterilir. Arama önemliyse birincil konumda durur ([HIG Searching](https://developer.apple.com/design/human-interface-guidelines/searching) [okundu]).
- MDC `SearchView`: tam ekran modal, ilk açılışta geçmiş, yazarken öneri. `SearchBar` ile eşleşince genişleme ve daralma animasyonu kendiliğinden gelir ([MDC Search](https://github.com/material-components/material-components-android/blob/master/docs/components/Search.md) [okundu]).

**Diğer uygulamalar:**
- NYT Cooking diyet, mutfak ve öğün türüyle arıyor, gruplanmış filtreler kullanıyor ([App Store](https://apps.apple.com/us/app/nyt-cooking-recipes-tips/id911422904) [okundu]).
- Cookpad ücretli "Premium Search" ile en çok pişirilenleri öne alıyor. 2018 incelemesinde "son bir saatin en çok aranan 10'u" vardı ([Cookpad FAQ](https://cookpad.com/us/faq); [Econsultancy](https://econsultancy.com/how-ux-makes-cookpad-s-app-the-best-antidote-to-instagram-for-foodies/) [ikincil, eski]).
- Spotify'da son aramaların temizlenebildiği topluluk forumunda anlatılıyor ([Spotify Community](https://community.spotify.com/t5/Social-Random/How-do-you-clear-suggested-search-history/td-p/6027593) [ikincil]).

**DadaGastro'nun kendi verisi: repo ile canlı farklı**

| Alan | Repo (`arama/index.blade.php`, `SearchLogService`) | Canlı (dadagastro.com/ara, 12 Ekim) |
|---|---|---|
| Sekmeler | Tümü / Tarifler / Videolar / Şefler / Yazılar + "Ürünler" pasif | Tümü / Tarifler / Püf Noktaları / Mutfak Rehberi / Şefler |
| Popüler aramalar | Gerçek arama günlüğünden, 1 saat önbellek, en çok 12 | "Popüler aramalar" çipleri (menemn, yayla, mercimek, tavuk…) |
| Son aramalar | Kullanıcıya bağlı, en çok 10, "temizle" var; misafirde giriş kapısı ("Arama geçmişin için giriş yap") | Misafir görünümünde görülmedi |
| Sıfır sonuç | "için sonuç bulamadık" + "Şunu mu demek istedin" + popüler çipler | "“zzqxw” için sonuç yok", "0 sonuç — yazımı kontrol et ya da önerilere göz at." + popüler aramalar |
| Öneri ucu (`/ara/oneriler`) | En az 2 karakter; Tarifler / Videolar / Şefler, her grupta 5 | Tarifler / Şefler / Püf Noktaları, her grupta 5 |

Mobil, canlıyı esas almalı. Fark docs/07–08 parite tablosuna yazılmalı.

#### DadaGastro önerisi

1. **Giriş noktaları:** Hero'daki "Tarif, şef, video ara" alanı ve solid header'daki arama ikonu. İkisi de aynı tam ekran arama rotasını açar.
   - Alan, `Hero(tag: 'arama-alani')` ile yerinden üste uçar (`sheet 250`). Klavye hemen açılır.
   - Reduced-motion'da rota anında açılır.
2. **Boş alan:**
   - Üyede "Son aramaların" (kaynak sınırı 10). Her satırda 44 hedefli `fa-xmark` sil düğmesi var. "Temizle" düğmesi diyalog açmaz; toast "Geri al" verir.
   - Misafirde bu bölümün yerinde webdeki metinle `DgAuthGate` tetikleyicisi durur.
   - Altında "Popüler aramalar" `DgChip` satırları: kaynak günlükten gelir, uydurulmaz.
3. **Yazarken:**
   - En az 2 karakterden sonra kaynak öneri ucu çağrılır. Gecikme 250ms (yeni token önerisi `input.debounce`).
   - Gruplar canlıdaki gibidir (Tarifler / Şefler / Püf Noktaları), her grupta en çok 5. Eşleşen kısım kalın gösterilir; Gilroy 700, renksiz.
   - Klavyedeki "Ara" sonuç sayfasına gider.
4. **Sonuç:**
   - Sekmeler `DgSegmented` ya da kaydırılabilir sekme. 5 sekme dar ekrana sığmazsa yatay kaydırılır; gutter 20, sağa taşar.
   - Her sekmede sonuç sayısı görünür. Temizle düğmesi kanondaki gibi çalışır.
   - Kaydırma klavyeyi kapatır.
5. **Sıfır sonuç:** `DgEmptyState` canlı metni aynen kullanır. Altında popüler aramalar ve tek çıkış "Ne Pişirsem ile malzemeden bul" bulunur. Bu çıkış uygulama içi bağlantıdır, yeni özellik değildir.

#### Flutter karşılığı

- **Arama alanı:** `SearchAnchor`/`SearchBar` (M3), ya da kanon görünümü için özel rota + `Hero`.
- **Klavye:** `TextField(textInputAction: TextInputAction.search)` ve `ScrollViewKeyboardDismissBehavior.onDrag`.
- **Gecikme:** `Timer` tabanlı debounce, 250ms.

### 7b. Bildirim merkezi

#### Bu uygulamalar nasıl yapıyor

**Apple** ([HIG Notifications](https://developer.apple.com/design/human-interface-guidelines/notifications) [okundu]):
- Rozet yalnız okunmamış bildirim sayısı içindir ve güncel tutulur.
- Aynı şey için birden çok bildirim gönderilmez.
- Yalnız uygulamayı açan bir eylem eklenmez.
- Hassas bilgi yazılmaz.

**Apple sekme çubuğu** ([HIG Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) [okundu]): Rozet yalnız kritik bilgi için kullanılır.

**Instagram:** Tür filtresi olduğu düşük kaliteli kaynaklarda geçiyor. Gün gruplaması **doğrulanamadı**.

**DadaGastro [repo]** (`NotificationController`, `/bildirimler`):
- Gruplama: Bugün / Dün / Daha Eski.
- 20'li sayfa.
- Eylemler: "Tümünü okundu işaretle", tekil okundu, sil, tarih aralığı süzgeci.
- Tür kapat/aç: yalnız `takip`, `yorum`, `begeni`. "Sistem" bilerek yok.
- Okunmamış sayısı tutuluyor.
- Canlıda giriş arkasında; **doğrulanamadı**.

#### DadaGastro önerisi

1. **Giriş:** Header'daki zil (V3 kararı). Okunmamış varsa zil üstünde sayı rozeti görünür: primary zemin, beyaz etiket11.
   - Bu kanonda yeni bir öğe; rozet token'ı **karar bekliyor**.
   - Alt menüye rozet konmaz.
2. **Ekran:** `DgPageRoute` ile açılır. Üstte "Tümü · Takip · Yorum · Beğeni" süzgeci (`DgSegmented`; kaynaktaki üç tür + Tümü).
3. **Liste:** Bugün / Dün / Daha Eski bölüm başlıkları (bölüm20). Satırlar `DgListTile`: 40 avatar, metin, meta13 zaman.
   - Okunmamış satır tint `#FBE9E3` zemin alır, sol kenarda nokta yoktur. Zemin farkı kontrastla ölçülmeli.
   - Dokununca satır okundu olur ve hedefe gider (web `bildirimler.git`).
4. **Eylemler:**
   - Sola kaydırarak "Sil" (toast "Geri al"). Aynı eylem uzun basma menüsünde de bulunur, çünkü kaydırma tek yol olamaz.
   - Header'da "Tümünü okundu" metin eylemi.
   - Tarih aralığı süzgeci "daha fazla" menüsünde `DgBottomSheet` olarak açılır.
5. **Sayfalama:** 20'li sayfa + "Daha fazla göster" (§5-9).
6. **Boş durum:** Kaynakta boş metin varsa o kullanılır (**repo görünümü okunmalı**). Push yokken izin istemi gösterilmez.
7. **Tür kapatma:** Satır menüsündeki "Bu tür bildirimleri kapat" eylemi webdeki `bildirimler.tur` ile aynı tercihi yazar.

#### Flutter karşılığı

- **Liste:** `CustomScrollView` + `SliverList`, gün grupları için `SliverPersistentHeader` (yapışmasız).
- **Silme:** `Dismissible` + `SnackBarAction`.

### 7c. Ayarlar

#### Bu uygulamalar nasıl yapıyor

**Apple** ([HIG Settings](https://developer.apple.com/design/human-interface-guidelines/settings) [okundu]):
- Ayar sayısı az tutulur, iyi varsayılan verilir.
- Göreve özgü ayar görevin içinde durur.
- Sistem ayarlarının kopyası yapılmaz: koyu tema ve yazı boyutu sistemden gelir.

**Apple hesap silme** ([Offering account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) [okundu]): Silme genellikle hesap ayarlarında durur. Kurallar §4'te.

**DadaGastro [repo]:**
- `/hesabim` sekmeleri gizlilik, bildirim (olay × kanal matrisi), beslenme tercihleri ve güvenlik: açık oturumlar, cihaz geçmişi, 2FA.
- "Hesabı dondur" var.
- **Silme akışı:** Neden (isteğe bağlı) → onay kutusu → "HESABIMI SİL" metnini yazma → e-posta onay bağlantısı → 30 gün içinde iptal edilebilir.

#### DadaGastro önerisi

1. **Profil → Ayarlar, `DgListTile` grupları** (bölüm başlıkları etiket11):
   - **Hesap:** Profil bilgileri, E-posta, Şifre, Güvenlik.
   - **Tercihler:** Beslenme ve mutfak, Bildirimler. Bildirimler webdeki matrisin aynısıdır ve push sütunu altyapı gelene kadar "Yakında" der.
   - **Uygulama:** Titreşim (`DgSwitch`), Pişirme modunda ekranı açık tut (`DgSwitch`, varsayılan açık), Önbelleği temizle.
   - **Gizlilik:** Gizlilik ayarları, KVKK ve yasal metinler. Yasal metinler kaynaktaki bağlantılarla verilir.
   - **Hesap işlemleri:** Çıkış yap, Hesabı dondur, Hesabı sil.
2. **Hesabı sil:** En altta, normal metin renginde, ayrı grupta durur.
   - Kendi sayfası webdeki adımları taşır. Ek olarak "30 gün içinde iptal edebilirsin" ve "e-postana onay bağlantısı gönderilecek" açıkça yazılır (Apple: süre alacaksa söyle).
   - **Risk:** Yazarak onay + e-posta bağlantısı + 30 gün birlikte Apple'ın "gereksiz zor" ölçütüne yakın olabilir. App Review riski **karar bekliyor**. Apple e-posta koduyla onayı örnek olarak kabul ediyor.
3. **Sistem ayarı kopyası yok:** Tema ve yazı boyutu sistemden gelir. Uygulama içi koyu tema anahtarı önerilmez. Kanonda koyu tema desteği ayrıca karar konusudur.

#### Flutter karşılığı

- **Anahtar ve satır:** `SwitchListTile.adaptive`, `ListTile`.
- **Gruplu liste:** `CupertinoListSection.insetGrouped` görünüm referansı olabilir ama kanon `DgListTile` kullanılır.

---

## 8. Pişirme modu ve zamanlayıcı

### Bu uygulamalar nasıl yapıyor

**Paprika** ([paprikaapp.com](https://paprikaapp.com/) [okundu]):
- Tarif açıldığında ekran açık kalır.
- Yönergelerdeki süreler otomatik algılanır; dokununca zamanlayıcı başlar.
- Biten malzemenin üstü çizilir, o anki adım vurgulanır, porsiyon otomatik ölçeklenir.
- Çoklu zamanlayıcıların yan listede durduğu ikincil incelemede geçiyor; 99 saat sınırı sürüm notunda ([arama özeti](https://apps.apple.com/sa/app/id1303222868) [ikincil]).

**Crouton** ([App Store](https://apps.apple.com/app/id1461650987) [okundu]):
- Adım adım modda tek adım görünür. Adımdaki malzemeye dokununca miktarı görünür.
- "Eller serbest" modunda cihaza dokunmadan adım değişir. 2026.4 notu: başparmağı sağa ya da sola göstererek.
- Adımlardaki süreden zamanlayıcı başlatılır. Bir "heads-up" göstergesi zamanlayıcıları uygulamanın başka yerlerinde de görünür tutar.
- Apple Watch'ta Live Activity var.
- İnceleme: adımdaki malzemeler vurgulanıyor. Başlamış zamanlayıcıyı düzenlemek uzun basma istiyor ve bu keşfedilmesi zor bulunmuş ([ScreensDesign](https://screensdesign.com/showcase/crouton-recipe-manager) [ikincil]).

**NYT Cooking:**
- 4.158.0 sürüm notunda "Cook Mode" eklendi ([App Store](https://apps.apple.com/us/app/nyt-cooking-recipes-tips/id911422904) [okundu]).
- "Kararmayan ekran" ifadesi bir ülke mağazasının arama özetinde var ama ABD sayfasında görülmedi. **Doğrulanamadı.**

**Diğerleri:**
- SideChef: adımları sesli okur, "next" ve "back" komutları var ([SideChef about](https://www.sidechef.com/about-us/) [ikincil]; komut ayrıntısı eski incelemelerden).
- Mealime: her yönergede malzeme miktarı yazılı (App Store kullanıcı yorumu [okundu, kullanıcı yorumu]).
- HelloFresh: tarif zamanlayıcıları ve adım rehberi [ikincil].
- Samsung Food: adım adım rehberli pişirme, zamanlayıcı, cihaza ayar gönderme ([Samsung Newsroom](https://news.samsung.com/ca/samsung-announces-global-launch-of-samsung-food-an-ai-powered-personalized-food-and-recipe-service) [ikincil]).

**Platform:**
- `wakelock_plus` 1.8.1: yalnız ekran kilidini tutar, izin gerektirmez. Yalnız ilgili arayüz açıkken etkinleştirilmeli ([pub.dev](https://pub.dev/packages/wakelock_plus) [okundu]).
- Web Screen Wake Lock API: sayfa gizlenince kilit düşer, `visibilitychange` ile yeniden alınmalı. Yalnız HTTPS'te çalışır, Baseline 2025 ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) [okundu]).
- Android 16 Live Update: kullanıcının başlattığı, başı ve sonu belli, süren etkinlikler içindir. Zamanlayıcı örnek listede yok ([Live updates](https://developer.android.com/develop/ui/views/notifications/live-update) [okundu]). Uygunluğu **doğrulanamadı**.

### DadaGastro önerisi

Mevcut kanon geçerli: tam ekran, 100dvh, opak; üstte tarif/çıkış ve ilerleme; ortada adım; zamanlayıcı metnin altında; altta adım seçimi ve önceki/sonraki; adım metni sola yaslı. Ek öneriler:

1. **Giriş ve çıkış:**
   - "Pişirmeye Başla" ekranı aşağıdan yukarı tam ekran açar (`sheet 250`). Çıkış `base 200`.
   - Girişte ekran kilidi alınır ve çıkışta bırakılır. Uygulama arka plana geçince kilit bırakılır, ön plana dönünce yeniden alınır.
   - Ayarlar'daki anahtar kapalıysa kilit alınmaz.
   - Çıkışta etkin zamanlayıcı varsa onay sorulur: "Zamanlayıcılar çalışmaya devam etsin mi?" · "Durdur" / "Devam etsin". Bu yıkıcı değildir; zamanlayıcılar heads-up şeridine taşınır.
2. **Adım geçişi:**
   - Yatay kaydırma (kanon) ve büyük önceki/sonraki düğmeleri. Düğmeler en az 52 yüksekliktedir (CTA ile aynı).
   - Ek olarak ekranın sol ve sağ üçte birine dokunma önceki ve sonraki adıma geçer. Eller kirliyken bilek ya da parmak eklemiyle büyük hedef sağlar.
   - Geçiş `base 200`, haptik `selection`. Reduced-motion'da anındadır.
3. **Okunur yazı:**
   - Adım metni kanonda "adım16/500". Kol mesafesinden okuma için pişirme moduna özel **sayfa24/700** rolü önerilir (yeni rol önerisi, mevcut değerden türetilmiş; **karar bekliyor**).
   - Sistem yazı ölçeğine uyar. Uzun adım kendi alanında kayar (kanon).
4. **Adım malzemeleri:**
   - Adım metninin altında, o adımda geçen malzemeler meta13 `DgChip` olarak porsiyona göre ölçeklenmiş miktarla durur (Crouton ve Mealime ilkesi).
   - **Koşul:** Kaynak veride adım–malzeme eşleşmesi varsa gösterilir. Yoksa metin içi eşleştirme yapılmaz (uydurma riski). Onun yerine üst çubuktaki "Malzemeler" düğmesi bütün listeyi `DgBottomSheet`'te açar. Listedeki işaretleme durumu detaydaki malzeme işaretleriyle ortaktır.
5. **Zamanlayıcı:**
   - Adım metninde süre ifadesi ("10 dakika", "1 saat") algılanırsa metnin altında "10 dk zamanlayıcı" `DgChip`'i belirir (Paprika ve Crouton ilkesi). Dokununca başlar.
   - Süre ayarı `DgStepper` ile yapılır (±1 dk, 44 hedef). Uzun basma gerektiren gizli düzenleme yoktur (Crouton eleştirisi).
   - **Çoklu zamanlayıcı:** Her zamanlayıcı kendi adımına bağlıdır. Başka adıma geçince çalışan zamanlayıcılar alt kontrollerin üstündeki ince **zamanlayıcı şeridinde** görünür ("Adım 3 · 04:12"). Dokununca o adıma gider.
   - Pişirme modu kapatılsa da şerit tarif detayının alt çubuğunun üstünde kalır (Crouton heads-up ilkesi).
6. **Bitiş:**
   - Uygulama açıkken: kanondaki 3× bip ile eşzamanlı 3× `impactHeavy`, ardından alarm.
   - Tam ekran üstünde `DgResultState` kartı: "Süre doldu · Adım 3", "Durdur". "+1 dk" eylemi isteğe bağlıdır (**karar bekliyor**).
   - Arka planda ya da ekran kilitliyken: §3'teki yerel bildirim. iOS'ta Time Sensitive; Android'de geri sayan, süren bildirim ve bitiş uyarısı. İzin yoksa ret yolu geçerlidir.
7. **Eller serbest (ses ve kamera):**
   - Bu sürümde **önerilmez**. Ses komutu mikrofon ve konuşma tanıma izni ister. Kamera hareketi (Crouton) kamera izni ister ve pil tüketir.
   - Kenar dokunma bölgeleri ve büyük düğmeler aynı ihtiyacın izinsiz karşılığıdır. Ses komutu ileride ayrı bir karar olur.
8. **Durum geri yükleme:**
   - Zamanlayıcılar bitiş zaman damgasıyla saklanır, kalan süre değil.
   - Uygulama öldürülüp açılırsa aynı adım ve doğru kalan süreler geri gelir. Süresi o arada dolan zamanlayıcı "Süre doldu" olarak gösterilir.
9. **HTML prototip:** Screen Wake Lock API kullanılır ve `visibilitychange` ile yeniden alınır. Desteklenmezse sessizce geçilir. İzin ve bildirim akışları yalnız önizleme olarak etiketlenir (AGENTS).

### Flutter karşılığı

- **Ekran kilidi:** `WakelockPlus.enable()` `initState`'te, `disable()` `dispose`'da. `AppLifecycleListener` ile arka plana geçişte bırakılır.
- **Adımlar ve dokunma bölgeleri:** `PageView` (`onPageChanged` → `HapticFeedback.selectionClick`). Kenar bölgeleri `Row` içinde iki `Expanded` + `GestureDetector`, `Semantics` etiketli.
- **Zamanlayıcı ve bildirim:** `flutter_local_notifications` 22.3.1: `zonedSchedule`, `InterruptionLevel.timeSensitive`, `usesChronometer` + `chronometerCountDown` + `ongoing`.
- **Uyarı:** Bitiş haptiği `HapticFeedback.heavyImpact` ×3. Ses çalma paketi seçimi açık.
- **Yazı ölçeği:** `MediaQuery.textScalerOf`.
- **Geri yükleme:** `RestorationMixin` + bitiş zaman damgaları.
- **İleride:** iOS Live Activity (ActivityKit; `live_activities` 2.6.0 paketi, yalnız sürüm okundu) ve AlarmKit değerlendirmesi.

---

## (a) Özet tablo

| Konu | Öneri | Token | Bileşen | Flutter |
|---|---|---|---|---|
| Splash | Ayrı splash yok; koyu taban + header konumunda beyaz logo; ilk kare çizilince kapanır | `base 200` çıkış, `reveal 450` hero | — | `flutter_native_splash`, `preserve/remove` |
| Durum geri yükleme | Son ekran, kaydırma, pişirme adımı | — | — | `RestorationMixin` |
| Onboarding | Tanıtım karuseli yok; kayıttan sonra webdeki 4 adımlı atlanabilir tercih sihirbazı | `sheet 250` adım, `fast 150` chip | `DgChip`, ilerleme, `DgListTile` (ayar dönüşü) | `PageView`, `FilterChip` |
| Bildirim izni | İlk zamanlayıcı başlatılınca; satır içi gerekçe; ret = uygulama içi uyarı | — | `DgPermissionPrompt` (yalnız kalıcı ret sonrası) | `permission_handler`, `flutter_local_notifications` |
| Kamera izni | "Fotoğraf çek"e dokununca; eşit "Galeriden seç" | — | `DgErrorState` | `permission_handler`, `image_picker` |
| Giriş kapısı | Üye eyleminde sheet; bekleyen eylem dönüşte tamamlanır | `sheet 250`, `savePop 450` | `DgAuthGate`, `DgSnackbar` | `showModalBottomSheet`, router `extra` |
| Giriş formu | Yalnız e-posta (4.8 istisnası); göster/gizle; otomatik doldurma | `fast 150` | `DgSegmented` | `AutofillGroup`, `finishAutofillContext` |
| Sayfa geçişi | Sağdan itme, iOS kenar geri | `sheet 250` / `base 200` geri | `DgPageRoute` | `CupertinoPageRoute` alt sınıfı |
| Paylaşılan öğe | Yalnız kart görseli → detay hero | Rota ile aynı 250 | Tarif kartı, detay hero | `Hero`, `flightShuttleBuilder`, `HeroMode` |
| Sheet | Tutma çubuğu, %50 eşik, tek sheet | `sheet 250` / `base 200` | `DgBottomSheet` | `showModalBottomSheet(sheetAnimationStyle)` |
| Kaydet | Renk + tek ölçek vuruşu; ilk kayıtta toast | `savePop 450` | Kart kaydet, `DgSnackbar` | `ScaleTransition`, `HapticFeedback.lightImpact` |
| Haptik | 6 türlü tek harita; kapatılabilir | `haptic.*` (yeni) | `DgSwitch` (Titreşim) | `HapticFeedback.*` |
| Pull-to-refresh | Yalnız akış ekranları | Yerleşme 40 | — | `RefreshIndicator.adaptive` |
| İskelet | Nefes; 450ms'den kısa yüklemede yok | `skeleton 1000`, `skeletonDelay 450` (yeni) | `DgSkeleton` | `FadeTransition` + `repeat(reverse)` |
| Liste yükleme | "Daha fazla göster" + toplam sayı + konum koruma | — | `DgErrorState` satırı | `PageStorageKey` |
| Toast | Alt menünün 8 üstü; eylemli 4000ms | `toast 2800`, `toastAction 4000` (yeni), `quick 180` / `fast 150` | `DgSnackbar` | `SnackBar(floating)` |
| Onay | Yalnız geri alınamaz ve seyrek eylem; fiil düğme | `haptic.warning` | Uyarı diyaloğu | `AlertDialog.adaptive` |
| Boş / hata | İkon + başlık + cümle + tek çıkış | — | `DgEmptyState`, `DgErrorState` | — |
| Offline | Header altında 32 yükseklikli kalıcı şerit | `quick 180` | Şerit (yeni) | `connectivity_plus` |
| Güncelleme | İsteğe bağlı sheet / zorunlu tam ekran | — | `DgBottomSheet`, `DgResultState` | `in_app_update`, `upgrader` |
| Arama | Tam ekran; son 10 / popüler 12; ≥2 karakter öneri; canlı sekmeler | `sheet 250`, `debounce 250` (yeni) | `DgChip`, `DgSegmented`, `DgEmptyState` | `SearchAnchor` ya da özel rota + `Hero` |
| Bildirim merkezi | Zil rozeti; Bugün/Dün/Daha Eski; tür süzgeci; kaydırarak sil + geri al | — | `DgListTile`, `DgSegmented`, `DgSnackbar` | `Dismissible`, slivers |
| Ayarlar | 5 grup; hesap silme en altta | — | `DgListTile`, `DgSwitch` | `SwitchListTile.adaptive` |
| Pişirme modu | Ekran kilidi; kenar dokunma; adım malzemesi (veri varsa); çoklu zamanlayıcı şeridi; arka plan bildirimi | `sheet 250` giriş / `base 200` çıkış ve adım, `haptic.alarm` | `DgStepper`, `DgChip`, `DgResultState`, `DgBottomSheet` | `wakelock_plus`, `PageView`, `flutter_local_notifications` |

---

## (b) Erişilemeyen ya da doğrulanamayan kaynaklar

**Okunamayanlar:**
- **m3.material.io:** Bütün sayfalar (motion, snackbar, bottom sheets, dialogs, search, navigation, progress, pull-to-refresh) JS ile çiziliyor ve içerik okunamadı. Yerine MDC-Android GitHub belgeleri ve Flutter kaynağı kullanıldı. M3 snackbar "4–10 sn" bilgisi yalnız arama özetinden geldi.
- **m2.material.io / material.io snackbars:** İçerik okunamadı.
- **developer.apple.com HIG HTML sayfaları:** JS. İçerik JSON uç noktasından okundu; bu bir erişim yöntemi, içerik aynı.
- **Mobbin:** 403, giriş duvarı. Page Flows denenmedi; arama sonuçlarında çıkmadı.
- **Medium · Airbnb "Motion Engineering at Scale":** 403.
- **Samsung Food App Store sayfası:** 404 (denenen kimlik yanlış olabilir). Bilgiler basın bülteni ve ikincil kaynaklardan.
- **Yummly:** Aralık 2024'te kapandı ([Plan to Eat](https://www.plantoeat.com/blog/2024/12/yummly-is-closing-discover-the-best-meal-planning-alternative) [ikincil]); canlı inceleme mümkün değil.
- **Instagram, YouTube, Netflix, Spotify, Headspace:** Resmi tasarım ya da mühendislik kaynağı bulunamadı. Bulunanlar topluluk forumu ya da düşük kaliteli SEO sayfasıydı; önerilerde dayanak yapılmadı.
- **Google Play Best of:** 2023 ve 2025'te yemek uygulaması bulunamadı. 2024 "Everyday Useful" MacroFactor oldu; tarif değil, beslenme takibi ([Gigazine](https://gigazine.net/gsc_news/en/20241119-google-play-best-app-2024) [ikincil]). Apple Design Awards'ta Kitchen Stories 2017 kazananı ([TidBITS](https://tidbits.com/2017/06/08/apple-announces-2017-apple-design-award-winners/) [ikincil]; App Store sayfası da "Apple Design Award winner" diyor [okundu]).

**Doğrulanamayan ayrıntılar:**
- Tasty'de ATT izninin splash'ten hemen sonra gelmesi.
- NYT Cooking'de ekranın kararmaması.
- SideChef'in güncel ses komutları.
- HelloFresh "cook mode" adı.
- Samsung Food onboarding ekranları.
- iOS PHPicker'ın izinsiz çalışması.
- AlarmKit'in sessiz modu delmesi.
- Android Live Update'in zamanlayıcıya uygunluğu.
- `USE_EXACT_ALARM` politikası.
- `flutter_native_splash` ile özel çıkış animasyonu.
- Flutter `MaterialPageRoute` yedek süresi: kaynakta `Duration(microseconds: 300)` yazıyor; muhtemelen bir hata ama pratikte platform kurucusunun süresi kullanılıyor.
- Repo onboarding, bildirim ve hesap ekranlarının canlıyla aynı olup olmadığı (giriş duvarı).

---

## (c) Kanona eklenmesi önerilen yeni token'lar

Yeni token'lar mevcut değerlerden türetildi; hiçbiri yeni bir sayı uydurmuyor.

| # | Token | Değer | Türetildiği yer | Gerekçe |
|---|---|---|---|---|
| 1 | `motion.page` | 250ms | `sheet` / `drawer` 250 | `DgPageRoute` süresi zaten 250. Bileşen içinde değil token'da durmalı. Sayfa, sheet ve çekmece tek "yüzey" süresini paylaşır. M3 medium1 = 250, Flutter sheet girişi 250. |
| 2 | `motion.exit` | 200ms | `base` 200 | Kapanış ve geri dönüş açılıştan bir basamak kısa. Flutter modal sheet çıkışı 200; M3 short4 200. Sayfa geri, sheet ve çekmece kapanışı bunu kullanır. |
| 3 | `motion.shared` | = `motion.page` (takma ad) | 250 | Hero uçuşu rota animasyonuyla yürür. Ayrı değer verilirse görsel ile sayfa ayrışır. Takma ad niyeti belgelemek içindir. |
| 4 | `motion.toastAction` | 4000ms | Flutter `SnackBar` varsayılanı; M3 alt sınırı | "Geri al" okunup basılmak için 2800'den uzun süre ister. Bilgi toast'ı 2800'de kalır. Ekran okuyucu açıkken eylemli toast kendiliğinden kapanmaz. |
| 5 | `motion.skeletonDelay` | 450ms | `reveal` 450 | NN/g: 1 sn altında iskelet gereksiz. 450ms altındaki yüklemede iskelet hiç çizilmez; göz kırpma etkisi önlenir. Yükleme bu sınırı geçerse iskelet en az bir nefes yarısı görünür. |
| 6 | `input.debounce` | 250ms | `sheet` 250 | Arama önerisi isteği için. Kaynak uç en az 2 karakter istiyor. Yeni bir 300ms yerine mevcut basamak kullanılır. |
| 7 | `haptic.selection` / `haptic.light` / `haptic.success` / `haptic.warning` / `haptic.error` / `haptic.alarm` | Flutter `HapticFeedback` eşlemesi: `selectionClick` / `lightImpact` / `successNotification` / `warningNotification` / `errorNotification` / 3× `heavyImpact` | Apple HIG haptik sınıfları | Aynı anlama aynı haptik (HIG tutarlılık). §5-6 haritası dışında kullanılmaz. `haptic.enabled` kullanıcı ayarıyla kapanır. |
| 8 | `layout.toastBottom` | 80 + safe-area (alt menülü ekran); CTA üstü + 8 (detay) | Alt menü 64 + alt 8 + aralık 8; kanon "sayfa sonu 80+safe-area" | Toast ile sayfa sonu boşluğu aynı tabandan türer. Detayda CTA çubuğuna göre hesaplanır. |
| 9 | `offlineBar.height` | 32 | Spacing 32 | Kalıcı şerit tek satır meta13 + 14 ikon taşır. Dokunma hedefi değildir, bu yüzden 44 gerekmez. |
| 10 | `type.cookStep` | = sayfa rolü 24/700 | Tipografi kanonu "sayfa24/700" | Kol mesafesinden okuma. Yeni ölçek değil, mevcut rolün pişirme modunda kullanımı. **Karar bekliyor** (kanonda adım16/500 var). |
| 11 | `badge.*` | Zemin primary, etiket11/500 beyaz, yükseklik 16 (spacing 16) | Etiket rolü + spacing | Header zili okunmamış sayısı için. Kanonda rozet yok. **Karar bekliyor.** |

---

## Karar bekleyen çelişkiler (özet)

1. **Alt menü orta düğmesi bir eylem açıyor.** Apple sekme çubuğunu "eylem için değil, gezinme için" tanımlıyor ([HIG Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) [okundu]). Orta "Ne Pişirsem" sheet açıyor. Kanon kararı geçerli ama App Review ya da HIG riski not edilmeli.
2. **Android'de sayfa geçişi:** Kanondaki 250ms itme mi, platformun öngörülü geri hareketi mi?
3. **İzin ön ekranı:** Apple tek düğme ve iptalsiz istiyor; Android iptal istiyor. Öneri: ön ekran yerine satır içi gerekçe. `DgPermissionPrompt` yalnız kalıcı ret sonrası kullanılır.
4. **Toast süresi:** Kanondaki 2800 eylemli toast için kısa. Öneri `toastAction 4000`.
5. **Hesap silme:** Repo akışı (yazarak onay + e-posta + 30 gün) Apple'ın "gereksiz zor" ölçütüne yakın olabilir.
6. **Push altyapısı yok [repo]:** Onboarding'deki "Takip & Yorum (Push)" seçeneği mobilde karşılıksız kalır.
7. **Repo ile canlı arama farkı:** Sekmeler, öneri grupları ve sıfır sonuç metni farklı. docs/07–08'e işlenmeli.
8. **Pişirme modu adım yazısı:** 16/500 mi, 24/700 mü?
9. **Adım–malzeme eşleşmesi:** Kaynak veride yoksa gösterilmez.
