## DEĞİŞMEZ KURAL — ORTAK BİLEŞEN VE KANON

- Yeni ekran ya da parça yazmadan önce `ortak/` bileşen kataloğunu (docs/51, galeri “Ortak bileşenler”) ve `ortak/tokens.json`'u oku.
- Ortakta karşılığı olan hiçbir parça (buton, sheet, sekme/segment, liste satırı, ikon kutusu, kart, input, takvim, hero/gülücük, kubbe, sayaç, boş/hata/yükleniyor hâlleri) sayfada yeniden yazılamaz; ortak bileşen kullanılır.
- Renk, boşluk, radius, font ve gölge yalnız token'dan gelir. Sabit px, hex ya da tek seferlik sınıf yasak.
- Ortakta karşılığı yoksa önce `ortak/`'a bileşen olarak eklenir, galeride gösterilir, sonra kullanılır.
- Buton etiketleri tek satır olur. Justify kuralı istisnasız geçerlidir.
- Ortak bileşen/token denetimi 0 ihlal vermeden iş “bitti” sayılmaz.
- Ortakta karşılığı olmayan bir parça çıkarsa bu, ortak bileşen kütüphanesinin eksiğidir; sayfada geçici çözüm yazılmaz. Eksik bileşen `ortak/`'da üretilir ve mevcut bileşenlerle aynı dili konuşur: aynı token'lar, aynı radius kademesi, aynı boşluk ritmi, aynı tipografi, aynı ikon dili, aynı hâl seti (varsayılan, basılı, seçili, devre dışı, yükleniyor, hata). Yeni bileşen, ailesindeki en yakın bileşenden türetilir; ondan ayrı görünmemelidir.
- Yeni bileşen galeride “Ortak bileşenler” bölümüne eklenir ve en yakın kardeş bileşenleriyle yan yana gösterilir. docs'a hangi bileşenden türetildiği ve neden gerektiği tek satırla yazılır.
- Bu kural Flutter widget kütüphanesi için de aynen geçerlidir.
- FLUTTER İÇİN DE AYNEN GEÇERLİ: Geliştirmede bütün ekranlar ortak widget kütüphanesinden ve tokens.json'dan üretilen tema sabitlerinden kurulur. Ekrana özel stil, sabit renk/ölçü ya da kopyalanmış widget yasak. Bu bölüm Flutter repo'sunun CLAUDE.md'sine aynen taşınacak.

Bu klasörün diğer çalışma kuralları proje kökündeki CLAUDE.md ve AGENTS.md'dedir; çalışma kılavuzu v3-app/docs/55-calisma.md.
