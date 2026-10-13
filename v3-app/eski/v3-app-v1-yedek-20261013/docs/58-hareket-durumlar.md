# 58 — Yükleme durumları ve hareket sistemi (12 Ekim 2026)

Beyar: “Önce rapor ver (tablo) … sonra animasyon sistemini en güncel en iyi uygulamalara göre (Material 3 Expressive motion, Apple HIG, iOS spring animasyonları) kur ve eksikleri tamamla.”

## 1. Rapor — öncesi (12 Ekim, kurulumdan önce)

| Grup | İskelet | Gerçek yerleşimi taklit | Aşağı çekip yenile | Sonsuz kaydırma alt göstergesi | Boş / hata / çevrimdışı | Görsel yer tutucu + geçiş | Düğmede işlem sürüyor |
|---|---|---|---|---|---|---|---|
| Kök (ana, liste, detay) | liste: var (runtime) | liste kartı: evet | yok | liste: var (sonsuz + iskelet kart) | liste: var | gri zemin, geçiş yok | yok |
| Hesap | kapalı (form) | — | — | — | ortak kabuk | — | yok |
| Profilim | ortak, 2 kalıp, nabız | kısmen | yok | yok (“daha fazla”) | var | gri zemin, geçiş yok | yok |
| Tarif bulma | ortak | kısmen | yok | yok | var | gri zemin, geçiş yok | yok |
| İçerik | ortak | kısmen | yok | yok | var | gri zemin, geçiş yok | yok |
| Arama / Ayarlar | ortak | kısmen | yok | yok | var | gri zemin, geçiş yok | yok |
| Yasal / Sistem | kapalı / ortak | — | yok | — | var | — | yok |

Ortak kabuk durumları: `?durum=yukleniyor | hata | zaman-asimi | baglanti-yok` (DG.baslat). Hareket: süre token'ları + tek easing; sheet girişi, sürükleyip kapatma, snackbar vardı. Sayfa geçişi, ortak eleman, kayan gösterge, dolma, sayaç, sıralı belirme yoktu.

## 2. Kurulan sistem (ortak katman)

| Parça | Web (ortak) | Token | Flutter karşılığı |
|---|---|---|---|
| Hareket token'ları | `tokens.json` motion: süreler (press 100, fast 150, base 200, sheet 250, page 300, pageExit 200, stagger 40, counter 600, reveal 450…), `easing` (standard, emphasizedDecel, emphasizedAccel, decelerate, accelerate), `spring` (varsayilan 380/30, yaylanma 420/22, yumusak 200/26; CSS `linear()` örneklemesi) → `--dg-motion-*` | tek kaynak | `DgMotion` (Duration, `Cubic`, `SpringDescription`) — `flutter/dg_tokens.g.dart` |
| İskelet (shimmer) | `DG.iskelet(n, 'kart'|'satir'|'liste'|'izgara'|'detay'|'profil')` | skeleton | `Shimmer` (`ShaderMask` + `LinearGradient` + `AnimationController.repeat`); kalıplar gerçek widget ölçüleriyle |
| Görsel yer tutucu + geçiş | yüklenene kadar nötr zemin, yüklenince opaklık (önbellekte anında) | sheet + standard | `FadeInImage` / `Image.frameBuilder` + `AnimatedOpacity` |
| Basınca küçülme | `.dgu-btn, .dgu-chip, .dgu-ibtn, .dgu-eylem, kartlar :active scale(.97)` | press + standard | `AnimatedScale` (GestureDetector onTapDown/Up) |
| Kaydet / beğen / takip dolma | `[aria-pressed=true] .icon` yay ile | spring yaylanma | `TweenAnimationBuilder<double>` + `SpringSimulation` |
| Kayan sekme göstergesi | `.dgu-seg.has-gosterge` (JS konum/genişlik) | spring varsayilan | `TabBar` özel `indicator` / `AnimatedPositioned` |
| Çip / seçim geçişi | renk/kenar geçişi; onay rozeti yayla | fast + spring | `AnimatedContainer`, `AnimatedScale` |
| Sayaç artışı | görünür olunca 0 → değer (`.dgu-istatistik dd`, `.dgu-stats b`, `[data-sayac-anim]`) | counter + decelerate | `TweenAnimationBuilder<int>` + `VisibilityDetector` |
| Sheet, diyalog, snackbar | sheet vurgulu giriş / hızlanarak çıkış, perde soluklaşır; diyalog yayla; snackbar yay | page, pageExit, spring | `showModalBottomSheet` (`AnimationStyle`), `showDialog` + `ScaleTransition`, `SnackBar` |
| Sheet sürükleyip kapatma | tutamaktan aşağı (mevcut) | — | `DraggableScrollableSheet` / `enableDrag` |
| Liste sıralı belirme | ilk açılışta en çok 12 öğe, 40 ms arayla 8px yukarı + opaklık | page + emphasizedDecel + stagger | `flutter_staggered_animations` benzeri `AnimationLimiter` (ya da `Interval` ile kendi) |
| Sayfa geçişleri | ileri sağdan, geri soldan (`DG.geri`/geçmiş), tam ekran aşağıdan | page + emphasizedDecel | `PageRouteBuilder` (`SlideTransition`), `CupertinoPageRoute`, `fullscreenDialog: true` |
| Ortak eleman (tarif kartı → detay) | belgeler arası View Transitions: tıklanan kart görseline ve detay fotoğrafına `view-transition-name: dg-tarif-foto` | page + emphasizedDecel | `Hero(tag: 'tarif-<slug>')` |
| Aşağı çekip yenileme | sekme/banner sayfalarında dokunmatik; eşik 48; dönen gösterge; `s.yenile()` ya da yeniden yükleme | spring | `RefreshIndicator` / `CupertinoSliverRefreshControl` |
| Sonsuz kaydırma | `DG.sonsuz(kap, yukle)` — alt göstergede üç nokta | reveal | `ListView.builder` + `ScrollController` sonu / `infinite_scroll_pagination` |
| Düğmede işlem sürüyor | `DG.mesgul(btn, ms|Promise)`; form gönderiminde kısa meşgul; genişlik korunur | skeleton | `FilledButton` içinde `CircularProgressIndicator` (sabit genişlik) |
| Hareketi azalt | bütün geçişler anlık, döngüler durur, View Transitions kapalı | — | `MediaQuery.disableAnimations` |

Vitrin: bileşen kataloğunun (`uygulama/bilesenler.html`) “İskeletler · Mikro etkileşimler · Sheet, diyalog, snackbar · Liste · Geçişler” bölümleri (12 Ekim: galeride ayrı sayfa yok, docs/55 §2p).

## 3. Kalan / bilinçli sınırlar

- Uygulama listelerinin çoğu “Daha fazla göster” kullanıyor; `DG.sonsuz` hazır, sayfalara geçiş grup işidir (vitrinde çalışıyor).
- Belgeler arası ortak eleman geçişi Chrome 126+ ve Safari 18.2+ sürümlerinde görünür; desteklemeyen tarayıcıda normal geçiş.
- Kök ekranlar (ana, liste, detay) yalnız ortak eleman geçişine bağlandı; başka hareketleri değişmez (docs/55 §2h).
- Test tarayıcısında (navigator.webdriver) sayfa geçişi, sıralı belirme, sayaç ve View Transitions kapalıdır; denetim görüntüleri kararlı kalır.
