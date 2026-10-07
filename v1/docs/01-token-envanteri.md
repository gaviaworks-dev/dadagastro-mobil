# DadaGastro — kaynak token envanteri

İnceleme: 7 Ekim 2026. Kaynak kökü: `/Users/gaviaworks/Developer/Backend Projects/dadagastro` (salt okunur). Aşağıdaki değerler CSS bildirimlerinin birebir aktarımıdır; tasarım önerisi değildir. Canlı içerik kaynağı: https://dadagastro.com/ .

## Kanonik değişkenler

| Token | Kaynaktaki değer | Kaynak |
|---|---|---|
| `--tomato` | `#E14827` | `resources/css/tokens.css:72` |
| `--tomato-dark` | `#C43D20` | `resources/css/tokens.css:73` |
| `--tomato-deep` | `#A8331A` | `resources/css/tokens.css:74` |
| `--tomato-tint` | `#FBE9E3` | `resources/css/tokens.css:75` |
| `--slate` | `#211E16` | `resources/css/tokens.css:76` |
| `--ink` | `#211E16` | `resources/css/tokens.css:77` |
| `--slate-2` | `#56514A` | `resources/css/tokens.css:78` |
| `--muted` | `#6F6F6F` | `resources/css/tokens.css:88` |
| `--line` | `#ECECEC` | `resources/css/tokens.css:89` |
| `--cream` | `#EFE5D3` | `resources/css/tokens.css:90` |
| `--cream-2` | `#F7F1E6` | `resources/css/tokens.css:91` |
| `--green` | `#3BB77E` | `resources/css/tokens.css:92` |
| `--green-deep` | `#2C9963` | `resources/css/tokens.css:93` |
| `--yellow` | `#FAC045` | `resources/css/tokens.css:94` |
| `--paper` | `#FFFFFF` | `resources/css/tokens.css:95` |
| `--bg` | `#F9F9F9` | `resources/css/tokens.css:96` |
| `--bg-cream` | `#F9F9F9` | `resources/css/tokens.css:97` |
| `--bg-white` | `#FFFFFF` | `resources/css/tokens.css:98` |
| `--danger` | `#C43D20` | `resources/css/tokens.css:101` |
| `--font` | `"Gilroy", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | `resources/css/tokens.css:104` |
| `--lh-body` | `1.55` | `resources/css/tokens.css:105` |
| `--lh-head` | `1.12` | `resources/css/tokens.css:106` |
| `--ls-head` | `-0.02em` | `resources/css/tokens.css:107` |
| `--radius-sm` | `8px` | `resources/css/tokens.css:110` |
| `--radius-md` | `12px` | `resources/css/tokens.css:111` |
| `--radius-lg` | `16px` | `resources/css/tokens.css:112` |
| `--radius-xl` | `24px` | `resources/css/tokens.css:113` |
| `--radius-circle` | `50%` | `resources/css/tokens.css:114` |
| `--radius-pill` | `999px` | `resources/css/tokens.css:115` |
| `--sh-sm` | `0 1px 2px rgba(33,30,22,.04), 0 2px 6px rgba(33,30,22,.05)` | `resources/css/tokens.css:118` |
| `--sh-md` | `0 6px 22px rgba(33,30,22,.09)` | `resources/css/tokens.css:119` |
| `--sh-lg` | `0 18px 50px rgba(33,30,22,.16)` | `resources/css/tokens.css:120` |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | `resources/css/tokens.css:123` |
| `--wrap` | `1240px` | `resources/css/tokens.css:124` |
| `--header-offset` | `112px` | `resources/css/tokens.css:127` |
| `--sp-1` | `4px` | `resources/css/tokens.css:130` |
| `--sp-2` | `8px` | `resources/css/tokens.css:130` |
| `--sp-3` | `12px` | `resources/css/tokens.css:130` |
| `--sp-4` | `16px` | `resources/css/tokens.css:130` |
| `--sp-5` | `24px` | `resources/css/tokens.css:131` |
| `--sp-6` | `32px` | `resources/css/tokens.css:131` |
| `--sp-7` | `48px` | `resources/css/tokens.css:131` |
| `--sp-8` | `64px` | `resources/css/tokens.css:131` |
| `--ctl-h` | `48px` | `resources/css/tokens.css:134` |
| `--scroll-size` | `6px` | `resources/css/tokens.css:138` |
| `--scroll-thumb` | `color-mix(in srgb, var(--slate-2) 26%, transparent)` | `resources/css/tokens.css:139` |
| `--scroll-thumb-hover` | `color-mix(in srgb, var(--slate-2) 45%, transparent)` | `resources/css/tokens.css:140` |

## Tipografi ve gerçek yüzler

| Rol | Birebir bildirim / varlık | Kaynak |
|---|---|---|
| Gövde | `"Gilroy"`, weight `500`; `/fonts/gilroy/Gilroy-Medium.ttf` | `resources/css/tokens.css:14` |
| Vurgu strong/b | `"GilroyBd", "Gilroy", system-ui, sans-serif`, `700`; ExtraBold.otf | `resources/css/tokens.css:51`, `:274` |
| Marka kalın | `"GilroyXB"`, `800`; ExtraBold.otf | `resources/css/tokens.css:56` |
| Marka ince | `"GilroyLt"`, `300`; Light.otf | `resources/css/tokens.css:61` |
| h1 | `clamp(1.85rem, 1.3rem + 2.2vw, 2.6rem)` | `resources/css/tokens.css:266` |
| h2 | `clamp(1.45rem, 1.1rem + 1.4vw, 1.9rem)` | `resources/css/tokens.css:267` |
| h3 | `clamp(1.2rem, 1rem + 0.8vw, 1.45rem)` | `resources/css/tokens.css:268` |
| h4 | `1.1rem` | `resources/css/tokens.css:269` |
| Başlık ağırlığı | `700`; Gilroy Medium üzerinden sentetik bold, GilroyBd ile aynı değil | `resources/css/tokens.css:265` |
| Mobil ana hero | `33px`; alt metin `15px`; eyebrow `11px` | `resources/css/portal.css`, `@media (max-width:640px)` |
| Kart başlığı | `18px`; mobil liste `14.5px` | `resources/css/portal.css:541`; `public/reference/tarif-liste/tarif-liste.css:381` |
| Mobil kart meta | `11.5px`; puan `12px` | `public/reference/tarif-liste/tarif-liste.css:382-389` |
| Alt menü etiketi | `9.5px`, `700`, line-height `1.15`, letter-spacing `.01em` | `resources/css/portal.css:1576` |

## Bileşen değerleri ve varyantlar

- Birincil buton: `.btn-primary` background `var(--tomato-dark)`, color `#fff`; hover `var(--tomato-deep)`. Marka rengi ile buton zemini aynı değer değildir. Kaynak: `resources/css/portal.css:168-169`.
- İkincil buton: `.btn-ghost` background `var(--paper)`, color `var(--slate)`, border `1px solid var(--line)`. Ortak buton: font `14.5px`/`700`, padding `14px 26px`, radius `var(--radius-md)`, gap `10px`. Kaynak: `resources/css/portal.css:140-171`.
- Form: `.fk-input,.fk-select,.fk-textarea` ortak kit; hover/focus/invalid ayrı kurallar. Kaynak: `resources/css/tokens.css:447-470`. Dokunma yüksekliği token'ı `48px`.
- Tarif kartı: beyaz zemin, `1px solid var(--line)`, `var(--radius-lg)`. Kaynak: `resources/css/portal.css:518`, `public/reference/tarif-liste/tarif-liste.css:226`.
- Standart dikey kart + öne çıkan büyük görsel kart + yatay kompakt kart mevcut. Mobil liste tek sütun; görsel alanı `%38`, min-height `128px`, gövde padding `12px 14px`, liste gap `13px`. Kaynak: `public/reference/tarif-liste/tarif-liste.css:376-389`.
- Kart başlığı kesilme düzeltmesi `min-height:2lh; max-height:2lh` (fallback `calc(2 * 1.12em)`). Kaynak: `resources/css/kart.css:60-74`. Tek başına eski portal kuralı kopyalanmamalı.
- Hero sonrası panel: margin-top `-22px`, radius `22px 22px 0 0`, shadow `0 -12px 32px rgba(20, 16, 10, .18)`. Kaynak: `resources/css/tokens.css:200-208`. Bunlar radius token ölçeğinin dışında mevcut bileşen değerleridir.
- Alt menü: left/right `16px`, bottom `calc(14px + env(safe-area-inset-bottom,0px))`, padding `6px 8px`, radius `var(--radius-lg)`, background `rgba(255,255,255,.55)`, blur `30px` + saturate `190%`; gölge `0 10px 30px rgba(33,30,22,.16),0 2px 8px rgba(33,30,22,.07),inset 0 1px 0 rgba(255,255,255,.6)`. Kaynak: `resources/css/portal.css:1550-1562`.
- Menü hedefi min `44px × 44px`; aktif zemin `rgba(225,72,39,.15)`; orta düğme `52px × 52px`, margin-top `-26px`, tomato zemin, shadow `0 8px 20px rgba(225,72,39,.5)`. Kaynak: `resources/css/portal.css:1570-1596`.
- Mobil yatay kenar boşluğu `16px`; header `62px`; logo `32px`; section padding `44px 0`. Kaynak: `resources/css/portal.css:1867` sonrası mobil blok.
- İkon seti Font Awesome 6 Free (solid/regular; Brands da yükleniyor), `public/fontawesome/css/all.min.css`; layout bağlantısı `resources/views/layouts/app.blade.php:65`. Menü ikonları house, bowl-food, wand-magic-sparkles, bookmark, user: `resources/views/partials/bottom-nav.blade.php`.

## Cascade ve mobil farklar

`layouts/app.blade.php`: tokens → portal → kart → parallax → sayfa CSS. Sayfa CSS içindeki tekrarlar gerçek sonucu değiştirebilir. Örnek: portal mobil `.icon-btn` 44px iken tarif-detay CSS'inde 40px kopyası var. Prototipte son kullanıcı talimatı gereği tüm dokunma hedefleri en az 44px olacak.

Breakpoint'ler: mobil ≤640, tablet 641–1024, desktop ≥1025 (`resources/css/tokens.css` dosya başlığı). 390px'te topbar gizli, header tek kat, yatay kategori/keşif rayları kaydırılabilir. Token envanteri computed-style raporu değildir; sayfa özel değerler ayrıca kaydedilmiştir.

## Prototipe aktarılan ek bileşen token'ı

`--sheet-scrim: rgba(20,18,12,.5)` — kaynak `public/reference/tarif-liste/tarif-liste.css:313`, `.sheet-overlay`. `tokens.css` içindeki `--text-*`, `--nav-*`, `--fab-shadow`, `--panel-*` isimleri kaynaktaki yukarıda listelenen bildirimlere verilen yerel takma adlardır; değerler değiştirilmedi. Font dosyaları ve FA solid/regular WOFF2 dosyaları kaynak repodan salt okunarak `assets/fonts` içine kopyalandı. Font aileleri ağ bağlantısından bağımsız yüklenir.
