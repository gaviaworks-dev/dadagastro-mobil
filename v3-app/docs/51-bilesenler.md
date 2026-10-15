# 51 — Ortak bileşen envanteri

12 Ekim 2026 · Faz 1. Kaynak: üç kök ekranın kodu ve hesaplanan stilleri (docs/50). Token adları `ortak/tokens.json` ile aynıdır.

Her bileşen için verilenler:
- **Bugün:** kodda nerede tanımlı, hangi ekranda kullanılıyor.
- **Anatomi, durumlar, ölçüler.**
- **Flutter:** önerilen widget adı, parametreler, web'e özgü davranışın karşılığı.

“Eksik” işaretli bileşenler kök ekranlarda yoktur; diğer sayfalar için kanondan yeni tanımlanır.

Durum sütunu:
- **✓** tek tanım, üç ekranda aynı;
- **≈** var ama varyantlar ayrışmış (docs/50 §10'a bağlı);
- **✗** eksik.

Toplam **50 bileşen**: tablodaki 42'nin 38'i kök ekranlarda var (✓ 24, ≈ 14), 4'ü eksik; ayrıca 8 eksik bileşen sonda listelidir. Eksik toplam 12.

---

## A. Kabuk ve gezinme

| # | Bileşen | Durum | Bugün | Anatomi · ölçü | Durumlar | Flutter |
|---|---|---|---|---|---|---|
| 1 | **Header (app bar)** | ≈ | app.css `.topbar`; ekran JS'leri `syncHeader` | 68 + safe-area; padding 20; hedef 44/görünür 40, aralık 8. Varyantlar: **home** (logo · [arama] · bildirim · menü), **page** (logo · bildirim · menü), **detail** (geri · kaydet · paylaş · daha fazla · menü; kaydırınca başlık). | şeffaf, ara alfa, solid (#DC3D17), fotoğraf üstü ikon (koyu %56 + blur 18), solid üstü ikon (zeminsiz beyaz), odak | `DgAppBar(variant, title, actions, scrollController, firstTextKey)`. Alfa hesabı `ScrollController` dinleyicisinde; `SliverAppBar(pinned)` + özel `flexibleSpace`. Blur: `BackdropFilter(ImageFilter.blur)` + `ClipRRect`. |
| 2 | **Sağ çekmece (sidebar menü)** | ✓ | `ortak-menu.css/js` (`dialog.om`), üç ekranda bağlı | %86 / en çok 360; 64px logo satırı + kapat 44; kullanıcı alanı (misafir: Merhaba + Giriş Yap/Üye Ol; üye: 40 avatar + ad + kademe + 3 kısayol); 48px satırlar (24 ikon sütunu + 12 boşluk, ikon 18, body); tek açık akordeon; dil (5 dil); sosyal (brands) + yasal | misafir, üye, etkin satır (tint + tomato-deep), grup açık/kapalı, dil listesi açık | `DgDrawer` = `Scaffold.endDrawer` + özel genişlik. Akordeon `DgAccordionGroup(singleOpen: true)`. |
| 3 | **Alt menü + orta düğme** | ✓ | app.css `.nav-dock`, `.bottom-nav`, `.nav-item`, `.fab` | Opak dock 104; bar 64, radius 24, `sh-md`, blur 24; 5 eşit sütun, ikon 22 + etiket nav 10, ikon–etiket 4; etkin: tomatoDark + üstte 16×2 gösterge; orta düğme 48 kare, kontrol radius'u, primary, ikon 20, en çok 14 taşma | etkin / pasif, basılı, odak | `DgBottomNav(current, onTap)` + `DgCenterAction`. `NavigationBar` değil, özel `Row`. Blur: `BackdropFilter`. **Sınıf adı `.fab`, Font Awesome ile çakışıyor (T13).** |
| 4 | **Tarif bul paneli (orta düğme sheet'i)** | ✓ | `ld-source.js` `sheet()` + action-card | Bottom sheet (#14) içinde 3 action-card: Ne Pişirsem / Dolapta Ne Var / Tabaktan Tarif (Pro rozeti) | misafir, üye, Pro, Pro değil | `DgFindRecipeSheet` → `DgBottomSheet` + `DgActionCard` × 3 |
| 5 | **Detay alt eylem çubuğu** | ✓ | app.css `.cook-bar.engagement-dock` | Yüzen bar: 16 dış / 8 alt + safe-area, iç 8, radius 24, `sh-md`, blur 16. Solda 3 sayaçlı ikon (44×52): Ben de Yaptım, Eline Sağlık, Yorumlar. Sağda CTA 52 (tomatoDark). | misafir (→ giriş kapısı), üye işaretli (sayaç +1, ikon primary), basılı | `DgActionBar(items, primary)`; `Scaffold.bottomNavigationBar` yerine `Stack` + `Positioned` (detayda alt menü yok) |
| 6 | **Sayfa banner'ı (sabit) + kayan panel** | ≈ | liste-v2.js “Panel/Header” blokları, detay-v2.js aynısı; `.list-banner`, `.lv2-panel`, `.detail-hero`, `.detail-main` | Banner sticky (liste 320 / detay 434) + overlay + sol üst ışık. Metin: liste başlık + sayaçlar; detay etiket + display + alt başlık + haplar. Panel −24 bindirme, üst köşe 24, ilk içerik 16; panel başı sticky (yapışınca köşe 0 + 1px çizgi, 180ms). | serbest, yapışık, gizlenen metin bloğu (150ms) | `DgPageScaffold(banner: DgPhotoBanner(...), stickyHead: ..., body: ...)`. **Flutter:** `CustomScrollView` + `SliverPersistentHeader(pinned)` (yapışan baş) + banner için `SliverToBoxAdapter` ve `Transform.translate(-scroll)` yerine `Stack`'te sabit katman + kaydırma ofseti; köşe animasyonu `AnimatedContainer`. Web'deki `position:sticky` kullanılmaz. |
| 7 | **Ana sayfa hero (sinematik)** | ✓ (yalnız ana) | ana-v3.js, six-heroes/set2-x6 katmanları | Tam boy fotoğraf, “Ne pişirsem?” display + genel arama (52); altta 5 slaytlık öneri (6 sn otomatik), nokta gösterge; hilal; açılan sahne | otomatik geçiş açık/durdu, reduced-motion, ekran dışında beklemede | `DgHomeHero` → `PageView` + `Timer`; açılan sahne `ScrollController` ölçeğiyle `Transform.scale`. Ana sayfaya özgü. |

## B. Kontroller

| # | Bileşen | Durum | Bugün | Anatomi · ölçü | Durumlar | Flutter |
|---|---|---|---|---|---|---|
| 8 | **Arama kutusu** | ≈ | `a.six-search` (ana, bağlantı), `form.search-box` (liste), `.input-frame` (dolap) | Çerçeve 50–52, radius 12, 1px line, paper (liste %78 + blur). Sıra: arama ikonu · input · temizle (yalnız metin varken) · [filtre 44 + sayaç rozeti]. Odak `focus-within` 2px primary halka; iç input kenarlıksız. | boş, yazılı, odak, filtre etkin (ikon primary + rozet), placeholder sığmazsa kısa metin | `DgSearchField(placeholder, shortPlaceholder, onFilter, filterCount, readOnlyLink)`. Kısa placeholder seçimi `TextPainter` ile ölçülür. |
| 9 | **Segment / sekme** | ≈ | `.segmented` (ana `.v3-tabs`, detay `.dv2-tabs`, liste görünüm ve sıralama grubu) | Kanon: dış 16, iç 4, düğme 12, eşit bölme, 44 hedef, etkin paper + `sh-sm` + tomatoDark. Sayaç rozeti isteğe bağlı. | etkin, pasif, odak, (detay) yapışık | `DgSegmented<T>(options, value, counts)`. **T3:** üç ekranda dış radius/iç boşluk/yazı boyutu farklı; tek ölçüye inecek. |
| 10 | **Chip** | ≈ | `.chip` (dolap), `.dg-chip` (liste, fotoğraf/bayrak işaretli), `.dv2-feature` (detay özellik) | 44 yükseklik, yatay 12 (işaretliyse sol 8), aralık 8, radius 12, 1px line, meta 13. İşaret 28 (fotoğraf/bayrak/ikon, radius 4). | normal, seçili (tint + tomatoDark kenar + tomatoDeep metin), dolapta (onay), hariç (nötr + eksi), kaldırılabilir (x 44) | `DgChip(label, leading, selected, onRemove, variant: filter/include/exclude/feature)` |
| 11 | **Düğmeler** | ≈ | `.button`, `.button.secondary`, `.icon-button`, metin bağlantıları | **Birincil:** tomatoDark zemin, beyaz, button rolü, radius 12, yatay 24. **İkincil:** paper + 1px line + ink. **Metin:** tomatoDeep, meta. **İkon:** 44 kare, radius 12. Yükseklik `sm` 44 / `lg` 52 (T4). İkon + metin 8. | normal, basılı, odak (2px primary), devre dışı, yükleniyor | `DgButton(variant: primary/secondary/text, size: sm/lg, icon, loading)`, `DgIconButton(icon, onPhoto: bool)` |
| 12 | **“Tümünü gör” + bölüm başlığı** | ✓ | `ortak-baslik.css` `.dg-head` | Başlık section rolü (en çok 2 dengeli satır) + sağda “Tümü →” (meta, tomatoDeep, ok 14, görünmez 44 alan, ilk satırın taban çizgisinde); arada 12, altta 16 | uzun başlık (2 satır), 360 altında yalnız ok | `DgSectionHeader(title, actionLabel, onAction)`; taban çizgisi hizası `Row(crossAxisAlignment: baseline)` |
| 13 | **Akordeon** | ✓ | menü `.om-group`, filtre `.dg-facet`, detay “Tarif bilgileri” | Başlık 48 (subheading), chevron-down 14 döner; yükseklik `0fr→1fr` 200–250ms; tek açık; kapalı içerik `inert`; başlıkta seçili sayı | açık, kapalı, sayaçlı | `DgAccordion(items, singleOpen)` → `AnimatedSize` + `ExpansionPanel` yerine özel |
| 14 | **Seçim kutusu / radyo / anahtar** | ≈ | `.choice-shell` + `input[type=checkbox]` + `.choice-mark .fa-check` | Kutu 22, radius 4, 1,5px choiceBorder; seçili primary dolgu + 12px onay; satır 44. Radyo: daire (izinli istisna). **Anahtar (toggle): eksik.** | boş, seçili, odak, devre dışı | `DgCheckbox`, `DgRadio`, **`DgSwitch` (yeni; ayarlar için)** |
| 15 | **Açılır seçici (dropdown)** | ✗ | Yok; web sıralaması mobilde sheet'e çevrildi | Kanon: açılır menü yerine **seçim sheet'i** (#18 iskeleti, radyo listesi) | | `DgSelectSheet<T>` |
| 16 | **Form alanları** | ≈ | `.input-frame` (dolap, paylaş), yorum formu `textarea`, yıldız seçici | Çerçeve 52, radius 12, line; etiket meta üstte; yardım/hata metni meta (hata tomatoDeep + `triangle-exclamation`); odak 2px primary; textarea en az 3 satır | boş, odak, dolu, hata, devre dışı, salt okunur | `DgTextField`, `DgTextArea`, `DgPasswordField` (göster/gizle), `DgRatingInput` — giriş/kayıt/profil/tarif ekle için genişletilecek |
| 17 | **Sayfalama / sonsuz kaydırma** | ≈ | liste `.dg-page` (1–4, 44 kare) | Bugün numaralı sayfa (web paritesi). Mobil kanon önerisi: sonsuz kaydırma + altta “Daha fazla yükle” yedeği; numaralı sayfa web paritesi için korunur. | yükleniyor (alt iskelet), son sayfa, hata (yeniden dene) | `DgPagedList` (`infinite_scroll_pagination` benzeri) — **karar sorusu** |

## C. İçerik kartları

| # | Bileşen | Durum | Bugün | Anatomi · ölçü | Durumlar | Flutter |
|---|---|---|---|---|---|---|
| 18 | **Tarif kartı · dikey** | ✓ | `DGCard.card` (`.dg-card`) — liste ızgarası | 4:5 görsel (radius media 16, line zemin); sol üst `dg-meta` (süre + görüntülenme, photoMeta, beyaz, gölge); sağ üst kaydet (32/44/14, 8 kenar); altta kategori (cardCategory, tomatoDeep) → başlık (card, sabit 2 satır yuvası) → yazar (20 avatar + ad, meta, slate2); iç boşluk 12/4 | kaydedilmiş, yükleniyor (aynı DOM), görsel yok/hata, görüntülenme yok (çizilmez), uzun başlık, yazar fotoğraflı | `DgRecipeCard(recipe, variant: vertical)` |
| 19 | **Tarif kartı · fotoğraf üstü (tile)** | ✓ | `DGCard.tile` — ana En son eklenenler, Dolapta Ne Var sonuçları, detay Benzer Tarifler | 2:3 (ikili şeritte (içerik−12)/2); metin fotoğraf üstünde, metin konumundan hesaplanan alt geçiş; kategori beyaz | aynı + kaydedilmiş | `DgRecipeCard(variant: tile)`; geçiş `ShaderMask`/`DecoratedBox(gradient)` + `TextPainter` ile ilk satır konumu |
| 20 | **Tarif kartı · öne çıkan** | ✓ | `DGCard.feature` / `DGCard.slider` | 4:3, featured rolü başlık, gösterge noktaları sağ alt (8, etkin 24 primary), metin göstergeye 12 pay bırakır | tek (gösterge yok), slider | `DgFeatureCard`, `DgFeatureCarousel` (`PageView`, snap) |
| 21 | **Tarif kartı · satır** | ✓ | `DGCard.card(r,'row')` | 152 kare görsel + sağda bilgi; aynı rozet/kaydet | aynı | `DgRecipeCard(variant: row)` |
| 22 | **İkili şerit (pairs)** | ✓ | `DGCard.pairs` | Tam 2 kart, sayfa sayfa snap, yarım kart yok, ← → | | `DgPairCarousel` → `PageView(viewportFraction: 1)` içinde 2'li `Row` |
| 23 | **Video kartı** | ≈ | ana-v3.js `.v3-video` | 3:2 (büyük) / kare 230 (raf); sol üst süre, sağ üst oynat (44); altta başlık (card/featured) + izlenme (eye); yazar yok | oynatma kaynağı yok → bilgi sheet'i | `DgVideoCard(video, size)`; **T8:** başlık rolü |
| 24 | **Şef kartı (dikey)** | ≈ | ana-v3.js `.v3-chef-card` | 146 genişlik, surface 24, avatar **96** (kanon dışı), ad, “N tarif”, “+ Takip Et”; sonda kesik çizgili “Sen de Şef Ol” | takip / takipte, misafir → giriş | `DgChefCard` — **T5/T6** |
| 25 | **Şef kartı (detay, yatay)** | ✓ | detay-v2.js `.dv2-b-*` (eski `?yazar=b`) | Surface 24 + line, 16 iç; 56 avatar + halka, ad featured, unvan rozeti (award, label, primary), ok; 3 sayaç (Tarif · Takipçi · Üyelik yılı; stat + meta); Takip et (tint) + Abone ol (ikincil, bell) 44 | takip/takipte (genişlik sabit), abone, misafir, uzun ad | `DgChefProfileCard` (profil sayfası başı da buradan türer) |
| 26 | **Şef satırı (liste/arama/yorum)** | ✗ (yorum satırında 40 avatar var) | — | 40 avatar + ad + unvan · N tarif + sağda takip; 56 yükseklik | | `DgChefTile` |
| 27 | **Kategori öğesi** | ≈ | ana `.v3-cat-*` (112 kare fotoğraf), liste chip (fotoğraflı) | Görsel + ad (en çok 2 satır) + “N tarif” (label, slate2) | seçili | `DgCategoryTile`; **T2** radius |
| 28 | **Mutfak öğesi (bayrak)** | ✓ | ana `.v3-cuisine`, liste chip, filtre satırı | Bayrak 4:3 (64 / chip'te 20), radius 4, çerçevesiz; bayraksız (Balkan) için nötr dünya ikonu | seçili | `DgCuisineTile(flagAsset)` — bayraklar `assets/flags/*.svg` (`flutter_svg`) |
| 29 | **Action-card (eylem kartı)** | ✓ | app.css `.action-card` | 80 yükseklik, surface 24, 16 iç, 44 ikon kutusu (tint, radius 12), başlık subheading + açıklama tek satır “…”, 14 ok; Pro rozeti taban çizgisinde | Pro kilitli | `DgActionCard(icon, title, subtitle, badge)` — paylaş, daha fazla, giriş seçenekleri, fotoğraf hatası da bunu kullanır |
| 30 | **Bilgi kartı şeridi** | ✓ | detay `.dv2-info-card` | bg zemin, radius 12 (T2), solda içeride 2px primary şerit, label başlık + FA ikon, metin meta 4 satır + “Devamını oku” → sheet; tek kartta tam genişlik | tek / çok, uzun metin | `DgInfoCard`, `DgInfoStrip` |
| 31 | **Özet şeridi** | ✓ | detay `.dv2-summary` | 3 sütun: ikon + etiket / değer (stat) / birim; ≤88 | porsiyonla canlı | `DgStatRow` |
| 32 | **Malzeme satırı** | ✓ | ld-source + detay-v2 | Seçim kutusu · miktar (sabit sütun, tomatoDark, tek satır, sağa hizalı) · ad + not · sepet 44 · [alternatif 44] · [ölçü ⓘ]; grup başlığı label | işaretli (gri + çizgi), alternatif seçili, porsiyon değişti | `DgIngredientRow` |
| 33 | **Adım kartı** | ✓ | detay `.step-card` | Görsel(ler) üstte (media 16) → numara rozeti (dokun = tamamla) + başlık + süre çipi (dokun = zamanlayıcı) → metin | tamamlandı, zamanlayıcı çalışıyor | `DgStepCard` |
| 34 | **Yorum kartı + puan özeti** | ✓ | detay yorumlar | 40 avatar, ad, unvan · tarih, yıldız, metin, foto, Beğen/Yanıtla/Bildir, tarif sahibi yanıtı; özet: ortalama + dağılım + %tavsiye + sessiz puan | puansız, fotoğraflı, yanıtlı, boş | `DgReviewCard`, `DgRatingSummary` |
| 35 | **Besin değerleri** | ✓ | detay `.dv2-nutrition` | Kalori kutusu (tint) + P/K/Y 3 sütun + 4px makro çubuğu + 4 sütun alt satır + not | eksik alan (sütun azalır), veri yok (bölüm yok) | `DgNutritionPanel` |

## D. Katmanlar, geri bildirim, durumlar

| # | Bileşen | Durum | Bugün | Anatomi · ölçü | Durumlar | Flutter |
|---|---|---|---|---|---|---|
| 36 | **Bottom sheet (tek iskelet)** | ✓ | `dialog.sheet` (ld-source `sheet()`, filtre `.dg-sheet`, sıralama, paylaş, alternatif, besin, giriş kapısı, Tarif bul) | Üst radius 24, paper, padding 12/20/16 + safe-area; tutma çubuğu 40×4; başlık satırı 44 (sheet rolü + kapat 44); içerik kaydırılır; sabit alt eylem (52 düğmeler, ikili eşit + 12); scrim %55; en çok %85 yükseklik; `sh-lg`; giriş 250ms | açık, kapanıyor, aşağı sürükle kapat (96px eşik), backdrop ile kapat, iç kaydırma | `DgBottomSheet(title, body, footer)` → `showModalBottomSheet(isScrollControlled, useSafeArea)` + `DraggableScrollableSheet(maxChildSize: .85)` |
| 37 | **Giriş kapısı sheet'i** | ✓ | ld-source `guestGate` + `data-auth` | Başlık “Bu işlem için giriş yap”, eyleme özel açıklama, Giriş Yap (birincil) + Üye Ol (ikincil) | kaydet, takip et, yorum, Ben de Yaptım, Eline Sağlık, tarif ekle, Tabaktan Tarif | `DgAuthGate.show(context, reason)` → girişten sonra bekleyen eylemi sürdürür |
| 38 | **Snackbar / toast** | ≈ | `.toast` (`toast()`), 2.800ms | Kabuk genişliği − 2×gutter; ink zemin, paper metin, radius 12, body, `sh-lg`; alt boşluk + 16 | bilgi, başarı, hata (ikonlu), eylemli (“Geri al”) — **ikon/eylem varyantı eksik** | `DgSnackbar.show(kind, message, action)` (`ScaffoldMessenger`) |
| 39 | **Diyalog / onay** | ✗ | Yok | Ortada değil, **sheet iskeletinde onay**: başlık + açıklama + iki eşit düğme (yıkıcı eylem tomatoDark + `trash-can`) | silme, çıkış, hesap silme, taslağı at | `DgConfirmSheet` |
| 40 | **Boş durum** | ≈ | liste `.lv2-empty`, app.css `.empty`, detay yorum boş | Ortalı: ikon kutusu (lg 22), başlık section, açıklama body (muted), tek eylem düğmesi; üst 32 | ilk kez / filtre sonucu boş / arama sonucu yok / içerik yok | `DgEmptyState(icon, title, message, action)` |
| 41 | **Yükleniyor / iskelet** | ✓ | `.is-loading` (aynı DOM, `aria-busy`, `inert`, line kutular, `skeleton-breathe` 1s) | Gerçek yerleşimin aynısı; metin satırları line zeminli radius 4 | | `DgSkeleton` = gerçek widget + `Shimmer` yerine opaklık nefesi; `ExcludeSemantics` |
| 42 | **Hata durumu** | ✗ | Yalnız görsel yüklenemedi (“Görsel yüklenemedi” + `image`) ve Tabaktan Tarif fotoğraf hatası | Boş durum iskeleti + `triangle-exclamation` + “Yeniden dene”; satır içi hata (alt kısım) | sunucu, zaman aşımı, offline (`wifi`), oturum doldu (→ giriş) | `DgErrorState(kind, onRetry)` |

### Eksik olup ayrıca eklenecekler (kök ekranlarda yok; kanondan türetilecek)

| Bileşen | Kullanılacağı yer | Flutter |
|---|---|---|
| Avatar (tek bileşen) | Her yer. Bugün `DGCard.avatar` (20), `.om-avatar` (40), `.dv2-avatar` (40/56), `.v3-chef-av` (96) **dört ayrı tanım**. | `DgAvatar(size: card/row/chef, name, photoUrl)` |
| Rozet | Pro, unvan/kademe, sayı rozeti (filtre, sekme), “Yeni” | `DgBadge(kind)` |
| Yazar satırı | Püf noktası detayı ve yazarı/tarihi olan içerik | `DgAuthorRow(avatar, name, rankBadge, meta, followButton)` — `ListTile` benzeri; 1. satır ad + kademe `Chip` (sığmazsa `Wrap` ile alta), 2. satır tek meta; sağda `FilledButton.tonal` Takip Et (44). Web: `DG.yazarSatir(o)` |
| Paylaş sheet'i | Tarif, püf, içerik bloğu, video | `DgShareSheet(url, title)` — 3 sütun `GridView` (Facebook, X, WhatsApp, Telegram, Pinterest, E-posta; marka ikonu, basınca marka rengi) + bağlantı alanı + Kopyala; `share_plus` diğer uygulamalar. Web: `DG.paylas(o)` |
| Kayan alt eylem çubuğu | Püf noktası detayı | `DgScrollActionBar(thumb, title, actions)` — `AnimatedSlide` + `AnimatedOpacity`, `ScrollController` eşiği (panel üst kenarı header'da); ikon eylemleri 44, basılı primary. Web: `s.kayanBar`, `DG.eylemCubugu(o)` |
| Taslak tarif detayı | Tabaktan Tarif “Senin tarifin”, tarif ekleme önizlemesi | Ayrı sayfa yok: `RecipeDetailScreen(recipe, mode: draft)` — aynı hero/özet/sekme/malzeme/adım; draft modunda `DgStatusBadge`, `DgInfoNote`, alt çubuk `[Düzenle, Yeniden çek] + FilledButton(Kaydet→Editöre gönder)`; yorum/puan/şef/benzer bölümleri çizilmez. Web: `tabaktan-taslak.html` |
| Dolapta Ne Var | Ana sayfa bloğu + Dolapta Ne Var sayfası | `DgPantryPicker` — mod `SegmentedButton` (Dolaba ekle / Hariç tut), malzeme `SearchBar` + `speech_to_text`, `FilterChip`'ler (eklenmemiş / dolapta / hariç), seçim paneli, besin `RangeSlider` + protein çipleri; eşleştirme servis katmanında. Web: `DGDolap` (`ortak/dg-dolap.js`, `.css`) |
| Şef / yazar kartı | Tarif detayı, püf noktası detayı | `DgChefCard` (tarif detayındaki kart): halkalı avatar 56, ad + kademe, sayaç sütunları, Takip et + Abone ol. Web: `DG.sefKarti`, `ortak/dg-sef-karti.css` |
| Kısa video (Dada Akış) | Videolar | `DgReelCard` 9:16 + `DgReelPlayer` (`PageView` dikey, sağda eylem sütunu). Web: `DG.akisKart`, `DG.akisAc` |
| Ortalı seçim kartı | Ne Pişirsem sihirbazı, Görüş bildir | `DgChoiceCard(centered: true)`. Web: `.dgu-secim-izgara.is-orta` |
| Parçalı gri buton listesi | Sistem/hata “Buradan devam edebilirsin”, izin reddedildi maddeleri, Tabaktan sheet seçenekleri | `DgGroupedActionList(items)` — gri zeminli parçalar, 2px ayırıcı, dış köşe 12 iç 4; her parça `ListTile(leading: tint ikon 40, title bold, subtitle 2 satır, trailing chevron)`, min 64. Web: `DG.parcali(o)`, CSS `ortak/dg-parcali.css` |
| Zengin metin editörü | Tarif ekle hazırlanış/açıklama, püf ekle metni | `DgRichTextField` — `flutter_quill` benzeri: araç çubuğu (geri, ileri, kalın, italik, madde, numaralı, bağlantı) + düzenleme alanı min 160; HTML/Delta çıkışı. Web: `DG.zengin(o)` |
| Anahtar | Ayarlar, bildirimler, tercihler | `CupertinoSwitch` oranı 40×24, primary aktif renk. Web: `DG.anahtar` |
| Durum sahnesi | Hata, boş ve kenar durumları (Tabaktan tanınamadı/bulanık/yemek yok/izin/bağlantı/oluşturulamadı; sayfa hata, zaman aşımı, bağlantı yok) | `DgStateScene(dark, photo, mark, note, title, body, primary, secondaries, searchField, tips \| suggestions)` — koyu: `Stack` fotoğraf + 4 köşe `CustomPainter` + blur işaret; beyaz panel üst radius 24 ile biner; ipuçları `ListTile` kartları, öneriler yatay `ListView`. Web: `DG.durumSahne(o)`, CSS `ortak/dg-sahne.css` |
| İzin istemi | Bildirim, kamera (önce uygulama içi açıklama sheet'i, sonra sistem istemi; reddedilince ayarlara yönlendirme) | `DgPermissionPrompt` + `permission_handler` |
| Pull-to-refresh | Liste, bildirimler, kaydettiklerim | `RefreshIndicator` (renk primary). HTML prototipte gösterim amaçlı simülasyon. |
| Seçim kartı | Tercihler (diyet, beceri, kategori), sihirbazlar | `DgChoiceCard(title, subtitle, leading: icon|scale|photo, selected, single)` — bilgi kartı radius 12, iç 12/16, seçili tint + tomato-deep kenar + 22/r4 kutu (FA check 12); tekli = radyo dairesi; fotoğraflı = kare 16, alt scrim. Web: `DG.secimKart({grup, k, ad, alt, ikon, olcek, gorsel, secili, tek})` + `.dgu-secim-izgara(.is-tek/.is-uc/.is-koyu)`; bayrak için kullanılmaz |
| İlerleme çubuğu | Rozet ilerlemesi, kademe ilerlemesi, sihirbaz | `LinearProgressIndicator(minHeight 4, radius 2, track line, value tomato)` + isteğe bağlı başlık satırı. Web: `DG.ilerleme(n, hedef, {etiket, deger})` (`progress.dgu-ilerleme`) |
| Rozet hücresi | Rozetlerim ızgarası (3 sütun) | `DgBadgeTile(badge, earned, progress)` — 64 madalya (kart radius'lu kare; kazanılmış primary + beyaz ikon + tint halka, kilitli nötr + soluk ikon + kilit), ad en çok 2 satır, ilerleme ya da +puan. Web: `DG.rozet(r, {kazanildi, tarih, n})`, `.dgu-rozet-izgara` |
| Rozet detay sheet'i | Rozete dokununca | `DgBadgeSheet` — 96 madalya, tam ad, aile · puan · kademe, Açıklama, Nasıl kazanılır (aile ölçüsü + hedef), kazanma tarihi ya da ilerleme. Web: `DG.rozetSheet(r, durum)`; veri `ortak/veri/rozetler.js` (DGROZET: 8 kademe, 9 aile, 50 rozet) |
| Örnek üye verisi | Bütün giriş yapılmış hâller | Tek kaynak `ortak/veri/ornek-uye.js` (DGORNEK): kişi, sayaçlar, kademe, rozet kazanımları/ilerlemesi, tariflerim, kaydedilenler, koleksiyonlar, takip, menüler, alışveriş, bildirimler — içerik kimlikleri gerçek kayıtlar |
| Durum rozeti | Tariflerim, destek talepleri, yorum onayı, bildirim, üyelik/ödeme | `DgStatusBadge(status)` — 24 yükseklik, radius 6, solid ikon + metin tek satır; ton `DgColors.status*` (notr/uyari/basari/hata, kontrast ≥4.5). Web: `DG.durumRozet(kod, {ad, ton, ikon})` |
| Paylaş sheet'i | Tarif, püf, şef, blok paylaşımı | `DgShareSheet` → `showModalBottomSheet` + eylem kartları (WhatsApp, X, E-posta, Bağlantıyı kopyala; cihazda `Share.share`). Web: `DG.paylas({baslik, url, alt})` |
| İçerik bloğu | Püf noktası ve içerik detayları | `DgContentBlock(no, title, body, image, video, onShare)` — numara kutusu 32 r12 + başlık alt başlık rolü + paylaş ikonu; gövde iki yana yaslı, kaynak bold korunur; görsel 4:3 r16 + açıklama. Web: `DG.icerikBlok({no, baslik, html, gorsel, aciklama, video, id})` |
| Uyarı kutusu | “Okuyucunun Dikkatine” | `DgNoticeBox(icon, title, text)` — tint zemin r12. Web: `DG.ipucu({ikon, baslik, metin})` |
| Şef kartı | Şefler listesi, ana sayfa şeridi, öneriler | `DgChefCard(chef)` — ana-v3 kartı: 96 avatar halka+gölge, ad 2 satır, ünvan, tarif sayısı, “+ Takip Et / Takiptesin”; “Sen de Şef Ol” kesik çizgili kart. Web: `DG.sefKart(s)`, `DG.sefOlKart()` |
| Bölüm başlığı | Rozet aileleri, ayar grupları, SSS konuları, uzun bölümlü sayfalar | `DgSectionHeader(icon, title, subtitle, progress, trailing)` — 44 tint kare (radius 12) + solid ikon, alt başlık rolü + tek satır meta, sağda “7/8” + chevron, isteğe bağlı `LinearProgressIndicator`. Web: `DG.bolumBaslik(b, {href})` (bağlantı/sabit), akordiyon içinde aynı iç yapı |
| Akordiyon (tek açık) | Rozetlerim aileleri, SSS, ayarlar, yasal metin bölümleri | `DgAccordion(sections, initiallyOpen)` — `ExpansionPanelList.radio` mantığı (aynı anda bir bölüm), `AnimatedSize` + `AnimatedRotation(chevron)` `DgMotion.base`/ease; `Semantics(expanded)`. Web: `DG.akordiyon([{id, ikon, baslik, alt, ilerleme, icerik}], {ad, acik})`; açılan bölüm header altına kaydırılır |
| İzin istemi | Kamera izni (Tabaktan Tarif), bildirim izni (zamanlayıcı/pişirme modu) — bütün izin ekranları | `DgPermissionPrompt(image, icon, title, reason, bullets, primary, secondary, denied)` — üstte gerçek görsel + gülücük + 72 primary rozet, ortalı başlık ve gerekçe, solid ikonlu madde kartları, altta sabit iki düğme (`BottomAppBar`); reddedildi: kilit rozeti + “Ayarları aç” (`openAppSettings`). Web: `DG.izinIstemi(o)` → `{html, bar}` (`tur:'tam'`) |
| Mod kartı | Yemek Modu (Ne Pişirsem) | `DgModeCard(mode, selected)` 128×88 r16, ortak alt perde, ikon + ad; seçili primary çerçeve + 22 onay rozeti; `ListView.horizontal` + açıklama kartı. Web: `DG.modSerit(DGMOD, slug)`, `DG.modAciklama(m)`; veri `ortak/veri/modlar.js` (20 canlı mod) |
| Yorum bölümü | Tarif detayı, püf detayı, (yorum olan her sayfa) | `DgCommentSection(type, summary, comments)` — detay-v2 yorum görünümü birebir: puan özeti + dağılım, “Tarifi değerlendir” sheet'i, filtre çipleri, yorum kartı (avatar, ad, ünvan, Tarif/Püf Sahibi, tarih, yıldız, metin, fotoğraf, Beğen/Bildir/Yanıtla), iç içe yanıt, “Daha fazla yorum göster”, boş durum; püf: misafir giriş kutusu, satır içi form (2000), “Denetimde — yalnız sen görebilirsin”. Web: `DG.yorumBolumu(o)`, `ortak/dg-yorum.css` (detay-v2 de bu sınıfla bağlı) |
| Hareket ve durumlar (iskelet shimmer, görsel geçişi, basma, dolma, kayan gösterge, sayaç, sheet/diyalog/snackbar, sıralı belirme, sayfa ve ortak eleman geçişi, aşağı çekip yenile, sonsuz kaydırma, düğmede işlem sürüyor) | Bütün uygulama sayfaları | Bileşen bileşen Flutter karşılıkları: **docs/58 §2** (`Shimmer`, `FadeInImage`, `AnimatedScale`, `SpringSimulation`, `Hero`, `PageRouteBuilder`, `RefreshIndicator`, `infinite_scroll_pagination`, `MediaQuery.disableAnimations`). Web: `ortak/dg-hareket.css`, `DG.iskelet`, `DG.sonsuz`, `DG.mesgul`; token `motion.easing/spring` |
| Gülücük (hero birleşimi) | Ana hero, profil/şef kapağı, Pro alanı, oynatıcı | `DgHeroJoin` — `ClipRRect(bottom radius 24)` + altında 4px tomato şerit (`Container` + `BorderRadius.vertical(bottom: 24)` gölge yerine ikinci katman) + 4 boşluk; en üstteyse header arkasına uzanır (`SliverAppBar` şeffaf → primary). Web: `.dgu-gulucuk` (kaynak `six-heroes.css:69`) |
| Kubbe (liste birleşimi) | Banner'lı listeler, içerik detayları, koyu üst alanlar | `DgDomeScaffold` — `SliverPersistentHeader` sabit banner (320, sayaç `DgStatsStrip`) + üst radius 24 beyaz `SliverToBoxAdapter` 24 bindirme; yapışınca radius 0. Web: `tur: 'banner'` (`.dgu-banner` + `.dgu-panel`, `DG.kubbeBoya` perdesi) ya da `.dgu-kubbe-ust` + `.dgu-kubbe-panel` |
| Bayrak seçimi (Dünya Mutfakları) | Tercihler “Hangi mutfakları seviyorsun?”, Tarifler filtre sheet'i Mutfak grubu | `DgCuisinePicker(items, selected, initialCount)` → `GridView` 4 sütun (≤359: 3), 8 aralık; öğe `InkWell` + `Container(radius 12, border 1.5 transparent→tomatoDeep, color →tint)`; bayrak `ClipRRect(radius 4)` + `SvgPicture` 56×42 (çıplak, çerçevesiz; ana-v3 Dünya Mutfakları dili); ad GilroyBd meta 2 satır + sayı etiket soluk; seçili rozet 22/r4 primary + `Icons` yerine FA check 12. Web: `ortak/dg-bayrak.css`, `DG.bayrakSecim(liste, {ad, secili, ilk, koyu})`, liste-v2.js aynı işaretleme |
| Video kartı | Video Mutfağı, video detayı “Diğer videolar”, arama | `DgVideoCard(video, large)` — kare (öne çıkan 3:2), radius 16, süre+oynat cam çifti, alt scrim, başlık kart rolü 2 satır (öne çıkan featured), izlenme foto-meta. Web: `.dgu-video`, `DG.video(v, i, {buyuk})`, `DG.videoLink(i)` = `video.html?no=i`; şeritte 230 (`--dg-size-rail-card`) |
| Püf noktası kartı | Püf Noktaları, püf detayı, şef profili | `DgTipCard(tip)` — 4:3 fotoğraf 16, kategori etiket (GilroyBd, tomato-deep), başlık kart rolü 2 satır, okunma meta. Web: `.dgu-puf`, `DG.puf(p)`, `DG.pufLink(slug)` |
| Profil başı | Profilim (H7), şef profili (C2) | `DgProfileHeader(name, subtitle, cover, action, stats)` — koyu kapak + primary radyal ışık 25% (detay yoğunluğu), 96 avatar −24 bindirme, ad sayfa rolü, sayaç satırı (`DgStatRow`, ince ayraçlar). Web: `DG.profilBas({ad, alt, kapak, eylem, sayaclar})`, `.dgu-istatistik` |
| Makale metni | Püf detayı, yasal/kurumsal metinler | `DgArticleBody` — `Column` paragraf 12, alt başlık t-sub, liste 8, sola yaslı. Web: `.dgu-metin` |
| Yorum satırı | Püf detayı (yorumlar) | `DgCommentTile(author?, text, meta)` — yazar yoksa yalnız metin. Web: `DG.yorum({ad, metin, meta})` |
| Video oynatıcı kabuğu | Video detayı | `DgVideoPlayerShell` (16:9 koyu, poster, 56 oynat kontrol radius'lu cam, durum satırı). Web: `.dgu-oynatici` |
| Eylemli satır | Son aramalar, bildirimler, abonelikler, destek talepleri | `Row(Expanded(DgListTile), IconButton…)`. Web: `.dgu-satir-kap` > `.dgu-satir` + `.dgu-ibtn` |
| Bildirim satırı | Bildirimler | `DgNotificationTile(type, title, body, meta, unread)` — 44 tür ikonu kutusu (radius 12), gövde 2 satır; okunmamış = kalın başlık + tint kutu (nokta yok). Web: `.dgu-bildirim(.is-okunmadi)` |
| Puan girişi | Görüş Bildir, değerlendirme | `DgRatingInput(value, labels)` — 5 × 44 hedef, FA solid yıldız; etiketler canlıdan (Çok kötü…Harika). Web: `DG.puan(ad, deger)` |
| Küçük fotoğraf | Satır küçük resmi (arama, profil, bul) | `DgThumb(56, radius 12)`. Web: `DG.kucukFoto(src)` / `.dgu-kucuk-foto` |
| Bildirim kanalı tablosu | Ayarlar › Bildirimler | `DgChannelMatrixRow(title, desc, email, push)` + başlık satırı. Web: `.dgu-kanal(.is-bas)` |
| Giriş duvarı | Giriş gerektiren her sayfanın misafir hâli (docs/55 §2b) | `DgLoginWall(icon, title, text, benefits)` — durum iskeleti + Üye Ol/Giriş Yap eşit ikili + “Giriş yapınca” bilgi kartları; dönüşte test parametreleri atılır. Web: `DG.girisDuvari({…})`, `DG.donusAdres()` |
| Veri yok notu | Örnek/dolu görünümde kaynağında verisi olmayan bölüm | `DgNoDataNote(text)` — nötr bilgi kutusu (radius 12, info ikonu, meta). Web: `DG.veriYok(metin)` |
| Telefon alanı | Profili düzenle, Öneri ve Şikâyet, iletişim ve telefon geçen her form | `DgPhoneField(country, number)` — solda bayraklı ülke kodu (varsayılan TR +90), dokununca `showModalBottomSheet`: arama (“Ülke veya kod ara”), bayrak · ad · kod listesi (199, web sırası), boş: “Eşleşen ülke yok.”; numara TR 3-3-2-2 biçim, baştaki 0 atılır; mesaj “Geçerli bir telefon numarası gir (10 hane).” Web: `DG.telefon({ad, ulkeAd, etiket, deger, ulke, zorunlu, opsiyonel, hata, yardim})`, `DG.telefonHata(kok)`, veri `ortak/veri/ulkeler.js` |
| Seçim alanı (sheet) | Görüş Bildir, destek talebi, ayarlar (dil/bölge) | `DgSelectField` → `showModalBottomSheet` + `RadioListTile`; yerel açılır liste yok. Web: `DG.secAlan({ad, etiket, secenekler:[[değer, metin]], deger, yer, zorunlu, hata, yardim})` — gizli input + `change` |
| Adım göstergesi (wizard) | Ne Pişirsem sihirbazı, onboarding, kayıt | `DgStepper(current, total)` (segment çubuğu, 4px) |
| Liste satırı (ayar/bildirim) | Ayarlar, bildirimler, profil menüsü | `DgListTile(icon, title, subtitle, trailing)` — menü satırı (48, 24 ikon sütunu) ailesi |
| Sonuç / başarı ekranı | Kayıt tamamlandı, tarif gönderildi | `DgResultState` (boş durum iskeleti, primary ikon) |
| Sayfa geçişi | Bütün itmeler | `DgPageRoute` (sağdan 250ms `--ease`; sheet alttan) |

---

## Ortak kurallar (bütün bileşenler)

1. **Tek kanon:** Aynı rol aynı font/boyut. Aynı kavram aynı solid ikon. Aynı bileşen her yerde aynı ölçü ve davranış. Bileşen kendi değerini tanımlamaz; yalnız token okur.
2. **Spacing:**
   - Hiçbir bileşen alt alta ya da yan yana bitişik değildir; en az 8.
   - Bütün boşluklar 4/8/12/16/20/24/32/40/48 ölçeğinden.
   - Kart iç boşluğu 16, gutter 20.
3. **Alan verimi:**
   - Tek öğe için koca satır ya da sütun açılmaz. Gereksiz satır, sütun ve ayraç yoktur.
   - Ayraç yalnız iki öğenin arasında.
   - Durum değişimi yerleşimi zıplatmaz: sabit yuva, üst üste etiket.
4. **Erişilebilirlik:**
   - Dokunma hedefi ≥44; görünür odak (2px primary).
   - Erişilebilir ad verilir; kontrast küçük metinde ≥4,5:1, büyük metinde ≥3:1.
   - Reduced-motion'da anlık geçiş.
5. **Gerçek veri:**
   - Verisi olmayan alan çizilmez (puan yoksa yıldız yok; görüntülenme 0 ise yok; yazar yoksa kart öne çıkmaz).
   - İsim, sayı ve görsel uydurulmaz.
6. **Flutter uygulanabilirliği:**
   - Prototipte yalnız Flutter'da birebir kurulabilecek teknik kullanılır.
   - `position:sticky` → `SliverPersistentHeader`; `backdrop-filter` → `BackdropFilter`; `mix-blend-mode:screen` → `BlendMode.screen` (`ShaderMask`/`CustomPaint`); `clip-path` yok; `:has()`/`:nth-child` ile görünüm mantığı kurulmaz (zemin alternesi veriden: `index.isOdd`).
   - `text-wrap:balance` Flutter'da yoktur. Kanonda “en çok 2 satır + …” yeterlidir; dengeleme yalnız web'de kozmetiktir.
   - `hyphens:auto` Flutter'da TR için yoktur. Justify kuralı “≥4 satır” olarak kalır; tireleme olmadan boşluk kontrolü yapılır (açık risk, docs/53).

### Revize eki (13 Ekim)
| Bileşen | Kod | Not |
|---|---|---|
| Dolap seçici | `DGDolap.seciciHtml(st, u, {kompakt})` + `DGDolap.seciciBagla(el, st, u, {kaydet, yeniden, bildir})` | Sayfa ve ana sayfa bloğu aynı fonksiyon; kompakt yalnız malzeme listesini kısaltır. Flutter: `DgPantryPicker(compact:)`. |
| Şef kartı (tam) | `ortak/dg-sef-karti.js` → `DGSefKarti.kart(sef)` / `.html(o)`; uygulamada `DG.sefKartTam`, `DG.sefKarti`, `DG.sefSayac`, `DG.yilDan` | Tek bileşen, tek veri (DGVERI.sefler + `ortak/veri/ornek-sef.js`): Tarif · Püf noktası · Takipçi üçü dolu, “2026'dan beri üye”, Takip et + Abone ol. Kök tarif detayı aynı çıktıyı kullanır (dg-baglanti). Flutter: `DgChefCard(chef)`. |
| Dolap içeriği | `DGDolap.icerik(st, u, {kompakt, hedef})` | Sayfa ve ana sayfa bloğu birebir; dış başlık ve çerçeve dışarıda. |

### V4 ortak bileşenler (13 Ekim)
| Bileşen | Kod | Not |
|---|---|---|
| Gülücük kapak | `DG.gulucuk({gorsel, icerik, rozet, red})` (dg-ui.js, dg-bilesen.css .dgu-gkap/.dgu-gkapak) | Giriş/kayıt hero'su ve izin istemleri; rozet eğrinin ortasında. Flutter `DgSmileCover`. |
| Sayaç bandı | `.dgu-istatistik` (ortak/dg-sayac.css) | Hücre içi eşit üst/alt; kart son öğesi; .is-yalin (şef kartı); çok satır ayırıcıları. Flutter `DgStatBand`. |
| Parçalı kutu | `DG.parcali(…, {kutu: 'yatay' \| 'izgara'})` (dg-parcali.css .is-yatay/.is-izgara, .dgu-parcali-rozet) | Tanıtım adımları (Tabaktan, Dolaptan), Ne Pişirsem 2×2 paneli. |
| Modül sabitleri | `tokens.json modules` → `DGTOKENS.modules` | Dolapta Ne Var, Dolaptan Tarife, Tabaktan Tarif, Dolabım: ad/ikon/hedef/Pro. |
| Dolap malzeme şeridi + görselli kart | `DGDolap.icerik(st, u, {gorselli, kok})`, `.dgd-ciplar.is-serit`, `.dgd-mkart` | Gerçek malzeme görseli assets/malzeme (canlı). |
| Dolabım çekirdeği | `ortak/dg-dolabim.js` (`DGDolabim`) | oku, kalanGun, durum, yakindakiler, gorsel, ornekVeri. |
| Durum rozeti tonları | `.dgu-durum-rozet.is-bugun / .is-gecti` (dg-not.css) | Dolabım kalan gün. |
| Küçük fotoğraflı seçim | `.dgu-secim.is-foto` (dg-bilesen.css) | Dolabım katalog, tarif seçici. |
| Liste hâlleri | DG.sayfa `?sayfa=yukleniyor\|son\|hata`, `?yenile=1`, `s.bos`, `s.basari` | Kapsam matrisi (docs/58). |
| Kök hâller | `ortak/veri/kok-durum.js` (ortak/uret/kok-durum.mjs) + `window.DGKapsam` (@scope (.dgd-ana, .dgk-durum, .dgk-blok)) | Ana/liste/detay yükleniyor, hata, çevrimdışı, liste sayfalama, yenile; uygulama bileşen stilleri kökte yalnız bu kaplarda. |
| Büyük başlık ayarı | `DGMetin.baslikAyar()` (dg-metin.js) | 6/3/3 heceleme + dizgi seçimi + en çok 2px küçültme; `DGMetin.acik`. |

| Adımlayıcı (porsiyon / adet) | `DG.adimlayici({ad, deger, min, max, adim, birim, aria, azalt, artir})` (dg-ui.js, ortak/dg-sayac.css `.dgu-adimlayici`; kökte detay-v2.js aynı işaretleme) | Türetildiği: tarif detayının porsiyon sayacı (− 6 kişilik +). Neden: Dolaptan Tercih'te sayfaya özel sayaç kaymıştı; değer ortada tek satır, orta alan en geniş değerin (en az 2 hane) görünmez iziyle sabit genişlik → değer değişince düğmeler kaymaz. Hâller: varsayılan, basılı, sınırda devre dışı, `.is-yukleniyor`, `.is-hata`. Kullananlar: tarif detayı (kök), Tabaktan/Dolaptan taslak detayı (detay-v2), Dolaptan Tercih. Flutter `DgStepper`. |
| Kamera vizörü | `DG.vizor({foto, isaret, yonerge, tarama, bulanik, kompakt, ek})` (dg-ui.js, dg-sahne.css `.dgu-vizor`) | Türetildiği: durum sahnesinin koyu üst parçası (köşe işaretli çerçeve). Neden: Dolaptan kamera/üretiliyor ve Dolabım barkod sheet'i kendi vizörünü çiziyordu; `kompakt` sheet içi, `tarama` hareketli tarama çizgisi (hareketi azalt'ta durur). Flutter `DgViewfinder`. |
| Tam ekran kamera | `DG.kamera(o)` / `DG.kamera.ac(o)` / `DG.kamera.izinSahne(o)` (dg-ui.js, dg-sahne.css `.dgu-kamera`) | Türetildiği: Tabaktan Tarif kamerası (runtime.js `camera()`, app.css `.photo-camera`), aynı girdilerle piksel olarak aynı; izin reddedildi = durum sahnesi (`ipucuParcali`). Neden: tek kamera akışı (Beyar, 15 Ekim) — Dolaptan Tarife girişi ve Dolabım barkodu sheet/ara sayfa yerine doğrudan tam ekran kamera açar; mod `foto` \| `barkod` (barkod vizörü: genişlik aynı, yükseklik genişliğin yarısı — 390'da 350 × 175 — merkezi tabak vizörünün merkezinde), izin kameranın içinde. Flutter `DgFullScreenCamera`. |
| Foto şeridi | `DG.fotoSerit(ogeler, {aria, sil})` (dg-ui.js, dg-bilesen.css `.dgu-foto-serit`) | Türetildiği: küçük foto + kart kaydet eyleminin dili (koyu yarı saydam + bulanık kaldır düğmesi, 44 hedef). Neden: çoklu fotoğraf (Dolaptan kamera/tanıma/sonuç) sayfada ayrı yazılıyordu. Flutter `DgPhotoStrip`. |
| Takvim | `window.DGTakvim` — `html/kur(el, o)`, `sec(o)` (sheet tarih seçici, Promise), `alan(o)` (form alanı), `uzun/kisa/ekle` (ortak/dg-takvim.js + dg-takvim.css) | Türetildiği: segment (ay/hafta), ikon düğmesi (geçiş), çip (hızlı seçim), girdi kutusu (tarih alanı), sheet + ikili (Vazgeç/Seç), durum rozeti tonları (noktalar). Neden: tarayıcı date input'u ve sayfaya özel gün seçiciler yerine tek takvim (Beyar V4 EK 6). Hâller: ay/hafta, ay geçişi, ay-yıl paneli, bugün, seçili, noktalar (basari/uyari/bugun/gecti/notr), aralık, devre dışı gün, min/max, sabit hafta (`gecis:false`), yükleniyor, alan hata/devre dışı, hızlı çipler (geçmişe dönük negatif). Türkçe ay/gün, Pazartesi başlangıç. Flutter: table_calendar (docs/57 §3). |
| Madde listesi | `DG.maddeler(liste, {aria})` (dg-ui.js, dg-bilesen.css `.dgu-izin-maddeler`) | Türetildiği: izin istemi maddeleri. Neden: misafir duvarı “Giriş yapınca” özellikleri ayrı bir kart listesiyle çiziliyordu; artık `DG.girisDuvari` `sunar` ve `DG.izinIstemi` aynı fonksiyon (Dolabım misafir dahil bütün duvarlar). Flutter `DgFeatureList`. |
