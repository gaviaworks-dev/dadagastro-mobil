# Veri ve mobil API ihtiyacı — üç ekran

Kaynak repo salt okunur incelendi, PHP uygulaması/DB başlatılmadı. Route kayıtları statik kod kanıtıdır; canlı API testi değildir. İnceleme 7 Ekim 2026.

## Ana Sayfa

| Veri | Mevcut kaynak |
|---|---|
| Kategori id/slug/ad/görsel/yayınlı tarif sayısı | `app/Domain/Gastro/Models/Taxonomy.php`; `app/Http/Controllers/Web/HomeController.php::__invoke`; `homeCategoryCounts`, `catstrip` |
| Günün tarifi | `app/Domain/Gastro/Services/DailyRecipeService.php`; HomeController bağımlılığı |
| Öne çıkan tarif kimliği/slug/başlık/kapak/süre/zorluk/porsiyon/puan/yazar | `app/Domain/Gastro/Models/Recipe.php`, `RecipeImage.php`; HomeController sorguları; `resources/views/tarifler/_card.blade.php` |
| Püf kartı başlık/kategori/görsel/okunma | `app/Domain/Gastro/Services/TipShowcaseService.php`; `Models/Tip.php`, `Models/Content.php`; HomeController |
| Şef kimliği/ad/görsel/istatistik | `app/Domain/Identity/Models/User.php`, `app/Domain/Gastro/Models/ChefProfile.php`; HomeController |

Route `GET /` → HomeController (`routes/web.php:136`), çıktı Blade. Blok sıralaması ve günün tarifi seçimini mobilde ayrı rastgele algoritma ile üretmek yerine mevcut servis kullanmalı.

## Tarif Listesi

Veri: id, slug, tam başlık, kategori, kapak URL/alternatif metni, hazırlık+pişirme toplamı, difficulty, rating_avg/rating_count, porsiyon, yazar, kullanıcıya ait kaydedildi durumu; toplam/sayfa/sonraki sayfa; seçili filtreler ve facet sayaçları.

`GET /tarifler` → `app/Http/Controllers/Web/RecipeController.php::index`; `GET /tarifler/kategori/{taxonomy:slug}` → `category` (`routes/web.php:161-164`). Modeller `app/Domain/Gastro/Models/Recipe.php`, `Taxonomy.php`, `RecipeImage.php`; görsel ilişkisi Media domain'i.

Filtre motoru `app/Domain/Gastro/Services/RecipeFacetService.php`: kategori, mutfak, beslenme, yemek_modu, ogun, alt_kategori; sure, zorluk, butce, icerik_turu. Grup içi OR, gruplar arası AND; facet adedi kendi grubu hariç diğer filtrelere göre. Süre hazırlık + pişirmedir. Web sayfalama 30; sıralama `onerilen`, `en_yeni`, `en_cok_puanlanan`, `en_hizli`. Mobil prototip yalnız mevcut anlık görüntü kümesini yerel filtreler, bütün web havuzunu temsil etmez.

## Tarif Detay

`GET /tarif/{recipe:slug}` → `RecipeController::show` (`routes/web.php:162`).

| Veri | Model / katman |
|---|---|
| Başlık, açıklama, kategori, süreler, servings/serving_unit, difficulty, puan | `app/Domain/Gastro/Models/Recipe.php` |
| Kapak/galeri/adım görselleri, sıralama | `app/Domain/Gastro/Models/RecipeImage.php`; Media ilişkisi |
| Yazar adı/avatarı | `app/Domain/Identity/Models/User.php`; `Recipe.author` |
| Malzeme id/ingredient_id/free_name/group_name/position/amount/unit/note | `app/Domain/Gastro/Models/RecipeIngredient.php`; `Ingredient.php`; `displayName()` |
| Sıralı adım id/title/body/duration_min/is_passive | `app/Domain/Gastro/Models/RecipeStep.php`; `images()` |
| Yorum metni/yazar/puan/tarih/yanıt/fotoğraf ve dağılım | `app/Domain/Gastro/Models/Review.php`; `app/Domain/Gastro/Services/ReviewSummaryService.php`; RecipeController::show |
| Kaydet durumu/koleksiyon | `app/Domain/Gastro/Models/SavedRecipe.php`, `RecipeCollection.php`; `app/Http/Controllers/Web/RecipeInteractionController.php::toggleSave`; `app/Domain/Gastro/Actions/Recipe/ToggleSavedRecipe.php` |

Web kaydet `POST /tarif/{recipe:slug}/kaydet`, auth + verified.action + throttle; yorum rotaları `routes/web.php` içinde `tarif/{recipe:slug}/yorumlar` grubu. HTML/session/CSRF akışı native token API ile eşdeğer değildir. Porsiyon hesapları `resources/js/ui.js::bindPortionScaler` içinde istemci tarafında; mevcut recipe amount ve servings kaynak alınmalı.

## Mobil API için eksikler

`routes/api/v1.php` auth/account uçları ve Sanctum zemini içeriyor. Ancak `routes/api/v1/public_recipes.php`, `public_content.php`, `authed.php` içerik/etkileşim route'ları olmayan iskeletler. “Mobil API hazır” olarak kabul edilmemeli.

Üç ekran için gereken yeni sözleşmeler (öneri; mevcut endpoint değildir):

1. Ana sayfa bloklarını ve günün seçimini döndüren JSON; kategori/şef/püf kartları dahil, bölüm bazında boş durum.
2. Tarif liste/arama/kategori/facet JSON; pagination, stabil sıralama, görsel varyantları, toplam sayım ve query sözleşmesi.
3. Slug veya id ile tarif detay JSON; sayısal miktar ve ayrı birim, null miktar, porsiyon birimi, sıralı adımlar, süre, görseller, yorum özet/sayfalama.
4. Sanctum ile kaydet/kaldır JSON; sahiplik/doğrulama/yayın görünürlüğü kontrolleri ve istemci retry davranışı. Tekrarlanan toggle yerine istenen son durumu alan idempotent sözleşme değerlendirilmeli.
5. Yorumlar için okuma/sayfalama; yorum gönderimi bu üç ekran prototipinde uygulanmaz.
6. Ortak hata zarfı (401/403/404/422/429/5xx), locale, nullability, caching, görsel erişimi; `docs/api-v1-contract.md` ve gerçek route'lar birlikte yeniden uzlaştırılmalı. V1 açıklaması kırıcı değişikliği yasaklıyor, yeni opsiyonel alan/uç eklemeye izin veriyor.

## Canlı / repo farkı

Canlı Tavuk Curry HTML'inde kaydet hedefi `/hesabim/mutfak-defterim/kayit/toggle`; yerel repo route'u `/tarif/{recipe:slug}/kaydet`. Canlı malzeme eylemi de farklı hedef taşıyor. Verilen repo ile canlı aynı sürüm varsayılmadı. Prototype canlıya POST göndermez; içerik yalnız public GET ile alınır. Flutter öncesi hedef backend sürümü kesinleştirilmeli.

## Prototip veri sınırı

Gerçek başlık/kategori/görsel/malzeme/adım/puan verisi public sayfalardan anlık alınır ve `app.js` içinde sabitlenir. Kaydet localStorage, ölçek/işaretleme yerel durum. Kategori sonuç sayısı bu yerel örnek kümesine aittir. Sayfa ve içerik kaynakları `04-acik-sorular.md` içinde listelenir.
