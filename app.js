const DATA = {"captured": "2026-10-07", "categories": [{"name": "Atıştırmalık", "slug": "atistirmalik", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Bakliyat", "slug": "bakliyat", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1515543904379-3d757afe72e4.avif"}, {"name": "Balık ve Deniz Ürünleri", "slug": "balik-ve-deniz-urunleri", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1559737558-2f5a35f4523b.avif"}, {"name": "Bebek Tarifleri", "slug": "bebek-tarifleri", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1604909052743-94e838986d24.avif"}, {"name": "Çocuk Tarifleri", "slug": "cocuk-tarifleri", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1474979266404-7eaacbcd87c5.avif"}, {"name": "Çorba", "slug": "corba", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1547592180-85f173990554.avif"}, {"name": "Dolma ve Sarma", "slug": "dolma-ve-sarma", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Dondurma ve Soğuk Tatlılar", "slug": "dondurma-ve-soguk-tatlilar", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565958011703-44f9829ba187.avif"}, {"name": "Ekmek", "slug": "ekmek", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "Hamur İşi", "slug": "hamur-isi", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "İçecek", "slug": "icecek", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1544145945-f90425340c7e.avif"}, {"name": "Kahvaltılık", "slug": "kahvaltilik", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1533089860892-a7c6f0a88666.avif"}, {"name": "Kek ve Pasta", "slug": "kek-ve-pasta", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1455619452474-d2be8b1e70cd.avif"}, {"name": "Kırmızı Et", "slug": "kirmizi-et", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Köfte ve Kebap", "slug": "kofte-ve-kebap", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Kurabiye", "slug": "kurabiye", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1509440159596-0249088772ff.avif"}, {"name": "Makarna", "slug": "makarna", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1473093295043-cdd812d0e601.avif"}, {"name": "Mantı ve Dolgulu Hamurlar", "slug": "manti-ve-dolgulu-hamurlar", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "Meyve Tarifleri", "slug": "meyve-tarifleri", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1540420773420-3366772f4999.avif"}, {"name": "Meze", "slug": "meze", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Pilav", "slug": "pilav", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1516684732162-798a0062be99.avif"}, {"name": "Pizza ve Pide", "slug": "pizza-ve-pide", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565299624946-b28f40a0ae38.avif"}, {"name": "Reçel", "slug": "recel", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1515543904379-3d757afe72e4.avif"}, {"name": "Sakatat", "slug": "sakatat", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Salata", "slug": "salata", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1540420773420-3366772f4999.avif"}, {"name": "Sandviç, Burger ve Dürüm", "slug": "sandvic-burger-ve-durum", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Sebze", "slug": "sebze", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1476718406336-bb5a9690ee2a.avif"}, {"name": "Sos", "slug": "sos", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Tatlı", "slug": "tatli", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565958011703-44f9829ba187.avif"}, {"name": "Tavuk ve Hindi", "slug": "tavuk-ve-hindi", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1604909052743-94e838986d24.avif"}, {"name": "Turşu ve Konserve", "slug": "tursu-ve-konserve", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Yumurta Tarifleri", "slug": "yumurta-tarifleri", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1533089860892-a7c6f0a88666.avif"}, {"name": "Zeytinyağlılar", "slug": "zeytinyaglilar", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Ana Yemek", "slug": "ana-yemek", "image": ""}], "tips": [{"title": "Çilek Bozulduğu (Küflendiği) Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/7732.webp", "category": "Bozulduğu Nasıl Anlaşılır?", "url": "https://dadagastro.com/puf-noktalari/cilek-bozuldugu-kuflendigi-nasil-anlasilir"}, {"title": "Yumurta Bozuk mu Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/2905.webp", "category": "Bozulduğu Nasıl Anlaşılır?", "url": "https://dadagastro.com/puf-noktalari/yumurta-bozuk-mu-nasil-anlasilir"}, {"title": "Ayran Bozulduğu Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/7658.webp", "category": "Bozulduğu Nasıl Anlaşılır?", "url": "https://dadagastro.com/puf-noktalari/ayran-bozuldugu-nasil-anlasilir"}], "recipes": [{"title": "Tavuk Curry | Hindistan Cevizli Hint Usulü", "url": "https://dadagastro.com/tarif/tavuk-curry-hindistan-cevizli-hint-usulu", "image": "https://dadagastro.com/varliklar/media/2578.webp", "category": "Tavuk ve Hindi", "difficulty": "Orta", "rating": "4", "slug": "tavuk-curry-hindistan-cevizli-hint-usulu", "description": "Hindistan cevizi sütlü tavuk curry nasıl yapılır? Hint mutfağından esinlenen bu aromatik tavuk yemeğinin tarifi ve püf noktaları.", "author": "Doruk Solmaz", "servings": 4, "unit": "kişilik", "minutes": 55, "ratingCount": 2, "ingredients": [{"name": "Tavuk göğsü kuşbaşı", "amount": 500, "unit": "g"}, {"name": "kuru soğan ince kıyılmış", "amount": 1, "unit": "adet"}, {"name": "Sarımsak", "amount": 2, "unit": "diş"}, {"name": "zencefil rendelenmiş", "amount": 1, "unit": "tatlı kaşığı"}, {"name": "curry baharatı", "amount": 1.5, "unit": "yemek kaşığı"}, {"name": "Hindistan cevizi sütü", "amount": 1, "unit": "su bardağı"}, {"name": "Domates rendelenmiş", "amount": 1, "unit": "adet"}, {"name": "Sıvı yağ", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "tatlı kaşığı"}], "steps": [{"title": "Soğan ve sarımsağı kavurun", "body": "Sıvı yağda ince kıyılmış soğanı şeffaflaşana kadar kavurup sarımsak ve zencefili ekleyin.", "time": "8 dk"}, {"title": "Baharatı kavurun", "body": "Curry baharatını ekleyip yağda birkaç saniye çevirerek ham tadının gitmesini sağlayın.", "time": ""}, {"title": "Tavuğu ekleyin", "body": "Kuşbaşı tavuk göğsünü ve rendelenmiş domatesi ilave edip tavuğun dış yüzeyi rengini alana kadar karıştırın.", "time": "8 dk"}, {"title": "Hindistan cevizi sütüyle pişirin", "body": "Hindistan cevizi sütünü ve tuzu ekleyip kısık ateşte sos koyulaşıp tavuk yumuşayana kadar pişirin.", "time": "17 dk"}], "reviews": [], "cost": 2, "views": 172, "web": {"notes": [{"title": "Hatırlatma", "body": "Önemli: Curry baharatını yağda kısa süre kavurmadan doğrudan sıvıya eklerseniz ham tat kalabilir, önce yağda birkaç saniye çevirin. Dikkat: Hindistan cevizi sütünü kaynatırken kesilmemesi için ateşi orta-kısıkta tutup sürekli karıştırın."}], "tags": ["#tavuk", "#baharatlı", "#tavuklu", "#misafir yemeği"], "features": ["Tavuk ve Hindi", "Hint Mutfağı", "Glutensiz", "Laktozsuz", "Süt İçermez", "Orta Bütçe (₺₺)"], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 35 dk", "ZorlukOrta"], "similar": []}}, {"title": "Yunan Usulü Limonlu Karides Sote | Zeytinyağlı Hızlı Deniz Ürünü Tarifi", "url": "https://dadagastro.com/tarif/yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi", "image": "https://dadagastro.com/varliklar/media/6685.webp", "category": "Balık ve Deniz Ürünleri", "difficulty": "Kolay", "rating": "4.5", "slug": "yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi", "description": "Limonlu karides sote nasıl yapılır? Sarımsağın kavrulması, karidesin doğru sürede pişirilmesi ve limonla tazelenmesiyle hızlı Yunan usulü tarif.", "author": "Ceren Tosun", "servings": 3, "unit": "kişilik", "minutes": 15, "ratingCount": 4, "ingredients": [{"name": "Karides ayıklanmış", "amount": 500, "unit": "g"}, {"name": "Zeytinyağı", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Sarımsak ince doğranmış", "amount": 3, "unit": "diş"}, {"name": "Limon", "amount": 1, "unit": "adet"}, {"name": "Maydanoz doğranmış", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Pul biber", "amount": 0.5, "unit": "çay kaşığı"}, {"name": "Tuz", "amount": 0.25, "unit": "çay kaşığı"}], "steps": [{"title": "Karidesleri hazırlayın", "body": "Karidesleri kağıt havluyla kurulayıp tuzla harmanlayın.", "time": "3 dk"}, {"title": "Sarımsağı kavurun", "body": "Zeytinyağını tavada kızdırıp sarımsak ve pul biberi ekleyip 1-2 dakika kokusu çıkana kadar kavurun.", "time": "2 dk"}, {"title": "Karidesi soteleyin", "body": "Karidesleri ekleyip yüksek ateşte her yüzü pembeleşene kadar 5 dakika çevirin.", "time": "5 dk"}, {"title": "Limonla servis edin", "body": "Ocaktan alıp limonun yarısını sıkın, maydanozla karıştırıp kalan limonu dilimleyerek yanında servis edin.", "time": "2 dk"}], "reviews": [{"author": "Orhan Turan", "body": "Karidesi tarifte yazdığı gibi 5 dakikadan fazla çevirmemeli miyim, biraz daha uzun tutup 7-8 dakika pişirirsem gerçekten lastik gibi mi olur, yoksa bu biraz abartılı bir uyarı mı, merak ettim doğrusu.", "rating": 5, "date": "3 ay önce"}], "cost": 3, "views": 156, "web": {"notes": [{"title": "Hatırlatma", "body": "Karidesi yüksek ateşte 5 dakikadan fazla çevirmeyin, uzun pişirme lastik gibi sertleştirir. Alerjen: kabuklu deniz ürünü (karides) içerir."}], "tags": [], "features": ["Balık ve Deniz Ürünleri", "Yunan Mutfağı", "Düşük Karbonhidratlı", "Glutensiz", "Premium (₺₺₺)"], "facts": ["Porsiyon3 kişilik", "Hazırlık + Pişirme 5 dk + 10 dk", "ZorlukKolay"], "similar": []}}, {"title": "Düdüklüde Balkan Usulü Lahana Sarması | Kalabalık Sofraların Hızlı Pişen Sarması", "url": "https://dadagastro.com/tarif/duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi", "image": "https://dadagastro.com/varliklar/media/7937.webp", "category": "Dolma ve Sarma", "difficulty": "Kolay", "rating": "5", "slug": "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi", "description": "Balkan usulü lahana sarması nasıl yapılır? Lahana yapraklarının haşlanması, iç harcın hazırlanması, sarılması ve düdüklü tencerede pişirilmesi aşamalarıyla…", "author": "Şahnur Ilıcalı", "servings": 6, "unit": "kişilik", "minutes": 60, "ratingCount": 2, "ingredients": [{"name": "Lahana yaprakları ayrılmış", "amount": 1, "unit": "adet"}, {"name": "Pirinç yıkanmış", "amount": 1, "unit": "su bardağı"}, {"name": "Kıyma", "amount": 300, "unit": "g"}, {"name": "Soğan rendelenmiş", "amount": 1, "unit": "adet"}, {"name": "Domates salçası", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Pul biber", "amount": 1, "unit": "çay kaşığı"}, {"name": "Nane", "amount": 1, "unit": "çay kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}, {"name": "Karabiber", "amount": 0.5, "unit": "çay kaşığı"}, {"name": "Zeytinyağı", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Su", "amount": 2, "unit": "su bardağı"}], "steps": [{"title": "Lahana yapraklarını haşlayın", "body": "Ayrılmış lahana yapraklarını kaynayan suda 10 dakika, yumuşayıp sarılabilir hâle gelene kadar haşlayıp süzün.", "time": "10 dk"}, {"title": "İç harcı hazırlayın", "body": "Pirinci, kıymayı, rendelenmiş soğanı, domates salçasını, pul biberi, naneyi, tuzu ve karabiberi bir kapta yoğurarak karıştırın.", "time": "10 dk"}, {"title": "Sarmaları sarın", "body": "Her yaprağın orta damarını hafifçe düzleştirip bir tatlı kaşığı harcı yerleştirin, kenarlarını içe katlayarak sıkıca sarın.", "time": "10 dk"}, {"title": "Düdüklüde pişirin", "body": "Sarmaları düdüklü tencereye sıkıca dizip zeytinyağı ve suyu ekleyin, kapağı kapatıp düdük ötünce ateşi kısarak 20 dakika pişirin, ardından buharın kendiliğinden çıkmasını 10 dakika bekleyin.", "time": "20 dk"}], "reviews": [], "cost": 2, "views": 154, "web": {"notes": [{"title": "Hatırlatma", "body": "Sarmaları düdüklü tencereye dizerken sıkı yerleştirin, gevşek dizilirse pişerken açılabilir. Tencerenin dibine birkaç lahana yaprağı sermeniz sarmaların yapışmasını önler."}], "tags": [], "features": ["Dolma ve Sarma", "Balkan Mutfağı", "Glutensiz", "Laktozsuz", "Süt İçermez", "Yumurta İçermez", "Şeker İlavesiz", "Acılı", "Kuruyemiş İçermez", "Orta Bütçe (₺₺)"], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 30 dk + 30 dk", "ZorlukKolay"], "similar": []}}, {"title": "Kırmızı Fasulye Yahnisi | Jamaika Usulü Kahvaltılık Stew Peas", "url": "https://dadagastro.com/tarif/kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas", "image": "https://dadagastro.com/varliklar/media/8069.webp", "category": "Bakliyat", "difficulty": "Kolay", "rating": "3.5", "slug": "kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas", "description": "Jamaika usulü kırmızı fasulye yahnisi (stew peas) nasıl yapılır? Fasulyenin hindistan cevizi sütüyle kaynatılması ve un toplarıyla koyulaştırılması adım adım…", "author": "Göktürk Dizdar", "servings": 4, "unit": "kişilik", "minutes": 45, "ratingCount": 6, "ingredients": [{"name": "kırmızı fasulye haşlanmış ya da konserve, süzülmüş", "amount": 2, "unit": "su bardağı"}, {"name": "Hindistan cevizi sütü", "amount": 1.5, "unit": "su bardağı"}, {"name": "Soğan doğranmış", "amount": 1, "unit": "adet"}, {"name": "Sarımsak", "amount": 2, "unit": "diş"}, {"name": "zencefil rendelenmiş", "amount": 1, "unit": "çay kaşığı"}, {"name": "Kekik", "amount": 1, "unit": "çay kaşığı"}, {"name": "Pul biber", "amount": 1, "unit": "çay kaşığı"}, {"name": "Un un topları için", "amount": 0.5, "unit": "su bardağı"}, {"name": "Su un topları için", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}], "steps": [{"title": "Sebzeleri hazırlayın", "body": "Soğan, sarımsak dişlerini ve zencefili doğrayın.", "time": "10 dk"}, {"title": "Kavurup pişirin", "body": "Soğan, sarımsak ve zencefili kavurup kekik ve pul biberi ekleyin. Fasulyeyi ve hindistan cevizi sütünü katıp 15 dakika kaynatın.", "time": "15 dk"}, {"title": "Koyulaştırın", "body": "Un ve suyu yoğurup küçük toplar hâline getirin, kaynayan yahniye tek tek bırakıp 10 dakika daha pişirin, tuzu ekleyin.", "time": "10 dk"}, {"title": "Servis edin", "body": "Sıcak yahniyi pirinçle birlikte servis edin.", "time": "5 dk"}], "reviews": [{"author": "Ali Sarıkaya", "body": "Hazırlık toplamda söylenenden çok daha uzun sürdü, kuru fasulyeyi bir gece önceden ıslatmam gerektiğini tarif net belirtmemiş. Sabah kahvaltısı için baştan hazırlamak isteyenlere bu uyarı eksik kalmış.", "rating": 2, "date": "2 ay önce"}, {"author": "Derya Tekin", "body": "Un toplarını hepsini aynı anda kaynayan yahniye döktüm, tarifte uyarıldığı gibi birbirine yapışıp tek bir kütle oluşturdular. Parçalamaya çalışırken yahni biraz dağıldı ama tadı yine de fena değildi.", "rating": 3, "date": "2 ay önce"}, {"author": "Emine Aygün", "body": "Hindistan cevizi sütü bulamadığım için yerine normal süt ve birkaç damla hindistan cevizi özütü kullandım, kıvamı biraz daha ince oldu ama tat yakındı. Zencefili de biraz fazla kaçırdım, hafif keskin bir tat bıraktı.", "rating": 4, "date": "2 ay önce"}, {"author": "Seda Aslantaş", "body": "Un toplarının kıvamı harika oldu, pirinçle birlikte kahvaltıda ailece çok beğendik, kahvaltıya bu kadar doyurucu bir tabak beklemiyordum.", "rating": 5, "date": "2 ay önce"}, {"author": "Aysun Şimşek", "body": "Tarifte belirtilen 15 dakikalık ilk kaynatmadan sonra fasulyeler benim tencerede hâlâ biraz sertti, 10 dakika daha eklemem gerekti. Un toplarını eklediğim son 10 dakikada kıvam gerçekten güzel koyulaştı.", "rating": 3, "date": "2 ay önce"}], "cost": 1, "views": 154, "web": {"notes": [{"title": "Hatırlatma", "body": "Un toplarını eklerken kaynayan yahniye tek tek bırakın, hepsini bir anda dökerseniz birbirine yapışıp tek bir kütle oluşturur. Alerjen: buğday (gluten) içerir."}], "tags": [], "features": ["Bakliyat", "Jamaika Mutfağı", "Vegan", "Vejetaryen", "Laktozsuz", "Süt İçermez", "Yumurta İçermez", "Şeker İlavesiz", "Acılı", "Pesketaryen", "Kuruyemiş İçermez", "Ekonomik (₺)"], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 15 dk + 30 dk", "ZorlukKolay"], "similar": []}}, {"title": "Patates Mücveri | Çiğ Rendelenmiş Patatesle Tavada Kızaran Kahvaltılık Mücver", "url": "https://dadagastro.com/tarif/patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver", "image": "https://dadagastro.com/varliklar/media/yayilim/t-patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver-kapak.webp", "category": "Kahvaltılık", "difficulty": "Kolay", "rating": "4.2", "slug": "patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver", "description": "Patates mücveri neden dağılır? Çiğ patatesin suyunu sıkıp dibe çöken nişastayı harca geri katan, tavada kaşık kaşık kızaran kahvaltılık patates mücveri tarifi.", "author": "Ebru Bolatlı", "servings": 4, "unit": "kişilik", "minutes": 45, "ratingCount": 5, "ingredients": [{"name": "patates", "amount": 700, "unit": "g"}, {"name": "kuru soğan", "amount": 80, "unit": "g"}, {"name": "yumurta", "amount": 2, "unit": "adet"}, {"name": "un", "amount": 60, "unit": "g"}, {"name": "dereotu", "amount": 20, "unit": "g"}, {"name": "beyaz peynir", "amount": 80, "unit": "g"}, {"name": "tuz", "amount": 5, "unit": "g"}, {"name": "karabiber", "amount": 1, "unit": "g"}, {"name": "ayçiçek yağı (kızartmak için)", "amount": 120, "unit": "ml"}, {"name": "süzme yoğurt", "amount": 200, "unit": "g"}], "steps": [{"title": "Patatesi rendele", "body": "Patatesleri soyup rendenin iri gözünden geçirin, soğanı da aynı rendeden geçirip patatese katın.", "time": "10 dk"}, {"title": "Suyunu sık, nişastayı ayır", "body": "Rendeyi temiz bir mutfak bezine alıp bir kâsenin üstünde sıkabildiğiniz kadar sıkın. Kâsedeki suyu birkaç dakika dinlendirin, üstteki suyu yavaşça döküp dipte kalan beyaz nişastayı ayırın.", "time": "5 dk"}, {"title": "Harcı karıştır", "body": "Sıkılmış patatese ayırdığınız nişastayı, yumurtaları, unu, kıyılmış dereotunu, ufalanmış peyniri, tuzu ve karabiberi katıp çatalla karıştırın. Harç kaşıkta şeklini tutmalı; tutmuyorsa bir yemek kaşığı daha un ekleyin.", "time": "5 dk"}, {"title": "Kaşık kaşık kızart", "body": "Geniş bir tavada yağı orta ateşte ısıtın. Harçtan yemek kaşığıyla alıp tavaya bırakın ve kaşığın sırtıyla 1 santim kalınlığa bastırın. Her yüzü altın rengi olup kenarları çıtırlaşana kadar 3–4 dakika kızartın; tavayı doldurmadan üç partide pişirin, patates içte de pişecek.", "time": "22 dk"}, {"title": "Süz ve servis et", "body": "Mücverleri kâğıt havlu serili tabağa alıp yağını süzdürün. Sıcak servis edin, yanına süzme yoğurt koyun.", "time": "3 dk"}], "reviews": [], "cost": 1, "views": 3, "web": {"notes": [{"title": "Hatırlatma", "body": "Rendelenmiş patatesin suyunu bezle iyice sıkın ve harcı bekletmeden kızartın; ıslak harç tavada dağılır, bekleyen patates kararır."}], "tags": [], "features": ["Kahvaltılık", "Türk Mutfağı", "Vejetaryen", "Ekonomik (₺)"], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 25 dk", "ZorlukKolay"], "similar": []}}, {"title": "Sagdana | Suudi Arabistan Hicaz Usulü Kakuleli Sagu İncili Süt Tatlısı", "url": "https://dadagastro.com/tarif/sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "image": "https://dadagastro.com/varliklar/media/yayilim/t-sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi-kapak.webp", "category": "Tatlı", "difficulty": "Kolay", "rating": "5", "slug": "sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "description": "Sagdana nasıl yapılır? Suda şeffaflaşan sagu incilerinin sütte kakule, safran ve gül suyuyla koyulaştırıldığı, soğuk yenen Hicaz Ramazan tatlısı.", "author": "Şahnur Poyrazoğlu", "servings": 6, "unit": "kişilik", "minutes": 45, "ratingCount": 1, "ingredients": [{"name": "sagu incisi", "amount": 120, "unit": "g"}, {"name": "su", "amount": 500, "unit": "ml"}, {"name": "tam yağlı süt", "amount": 800, "unit": "ml"}, {"name": "toz şeker", "amount": 100, "unit": "g"}, {"name": "toz kakule", "amount": 2, "unit": "g"}, {"name": "safran", "amount": 0.2, "unit": "g"}, {"name": "gül suyu", "amount": 10, "unit": "ml"}, {"name": "sade yağ", "amount": 10, "unit": "g"}, {"name": "iç antep fıstığı", "amount": 20, "unit": "g"}], "steps": [{"title": "Saguyu yıka", "body": "Suda beklettiğiniz saguyu süzgece alıp soğuk suyun altında, yüzeydeki nişasta gidene kadar yıkayın. Safranı iki yemek kaşığı ılık sütte bekletin.", "time": "3 dk"}, {"title": "Suda şeffaflaştır", "body": "500 ml suyu kaynatın, saguyu ekleyin ve orta ateşte sık sık karıştırarak 10–12 dakika pişirin. İnciler şeffaflaşmalı, ortalarında yalnız toplu iğne başı kadar beyaz bir nokta kalmalı.", "time": "12 dk"}, {"title": "Sütte koyulaştır", "body": "Sütü ve şekeri ekleyip kısık ateşte, dibi tutmasın diye sürekli karıştırarak 12–15 dakika pişirin. Tatlı kaşığın arkasını ince bir tabakayla kaplayınca ocaktan alın; bu noktada hâlâ akışkandır.", "time": "15 dk"}, {"title": "Kokulandır", "body": "Kakuleyi, safranı sütüyle birlikte, sade yağı ve gül suyunu ekleyip karıştırın; gül suyu ocaktan alındıktan sonra girer, kaynarsa kokusu uçar.", "time": "3 dk"}, {"title": "Kaselere dök", "body": "Tatlıyı altı kaseye paylaştırın, üstlerine ince kıyılmış antep fıstığı serpin. Oda sıcaklığına gelince üstünü kapatıp buzdolabına koyun.", "time": "3 dk"}], "reviews": [{"author": "İlker Yalçınkaya", "body": "Sagu incilerini kaynar suya azar azar atmak gerekiyor, bir seferde dökünce dibe çöküp birbirine yapıştı ve topak hâlinde pişti. Safranı da gül suyundan önce katın, ikisini birlikte ekleyince renk tam oturmadan koku baskın geliyor.", "rating": null, "date": "2 hafta önce"}], "cost": 2, "views": 3, "web": {"notes": [{"title": "Hatırlatma", "body": "Sagu pişirmeden önce 30 dakika soğuk suda bekletilir, kaseler de buzdolabında en az 2 saat soğutulur; ocakta sulu görünen tatlı soğudukça koyulaşır, ocakta fazla koyulaştırılırsa soğuyunca sertleşir.\nAlerjen: Malzeme listesine göre süt ve süt ürünleri, sert kabuklu yemiş içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "features": ["Tatlı", "Suudi Arabistan Mutfağı", "Vejetaryen", "Glutensiz", "Orta Bütçe (₺₺)"], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 15 dk + 30 dk", "ZorlukKolay"], "similar": []}}, {"title": "Pastéis de Feijão | Portekiz Torres Vedras Usulü Bademli Fasulyeli Mini Tart", "url": "https://dadagastro.com/tarif/pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart", "image": "https://dadagastro.com/varliklar/media/yayilim/t-pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart-kapak.webp", "category": "Tatlı", "difficulty": "Orta", "rating": null, "slug": "pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart", "description": "Pastéis de feijão nasıl yapılır? Beyaz fasulye püresi, badem, yumurta sarısı ve şeker şurubundan kurulan dolgunun ince hamurda fırınlandığı Portekiz tartı.", "author": "Atakan Erçetin", "servings": 24, "unit": "adet", "minutes": 80, "ratingCount": 0, "ingredients": [{"name": "buğday unu", "amount": 250, "unit": "g"}, {"name": "margarin", "amount": 50, "unit": "g"}, {"name": "soğuk su", "amount": 120, "unit": "ml"}, {"name": "tuz", "amount": 3, "unit": "g"}, {"name": "haşlanmış beyaz fasulye (süzülmüş)", "amount": 220, "unit": "g"}, {"name": "toz şeker", "amount": 360, "unit": "g"}, {"name": "su", "amount": 120, "unit": "ml"}, {"name": "öğütülmüş badem", "amount": 60, "unit": "g"}, {"name": "tereyağı", "amount": 25, "unit": "g"}, {"name": "buğday unu", "amount": 12, "unit": "g"}, {"name": "yumurta sarısı", "amount": 4, "unit": "adet"}, {"name": "yumurta akı", "amount": 1, "unit": "adet"}, {"name": "buğday unu", "amount": 5, "unit": "g"}, {"name": "pudra şekeri", "amount": 20, "unit": "g"}], "steps": [{"title": "Hamuru yoğur", "body": "Unu ve tuzu karıştırın, soğuk margarini parmak uçlarınızla una ovarak kum gibi dağıtın. Soğuk suyu azar azar ekleyip hamur pürüzsüz ve esnek olana kadar 4 dakika yoğurun. Streç filme sarıp dinlendirin.", "time": "8 dk"}, {"title": "Fasulyeyi püre yap", "body": "Fasulyeyi ve tereyağını mutfak robotunda tamamen pürüzsüz bir püreye çevirin; kabuk parçası kalırsa püreyi süzgeçten bastırarak geçirin. Öğütülmüş bademi ve 12 g unu katıp karıştırın.", "time": "5 dk"}, {"title": "Şurubu kaynat", "body": "Şekeri ve suyu kalın tabanlı küçük bir tencereye alın ve karıştırmadan kaynatın. 8–10 dakika sonra şeker termometresi 115 °C'yi gösterdiğinde ocaktan alın; termometre yoksa bir damlası soğuk suda yumuşak bir top oluşturmalı.", "time": "10 dk"}, {"title": "Dolguyu bağla", "body": "Sıcak şurubu fasulyeli karışımın üstüne ince bir akışla dökerken durmadan karıştırın. Karışım 5 dakika ılıdıktan sonra yumurta sarılarını ve hafifçe çırpılmış akı ekleyip pürüzsüz olana kadar karıştırın.", "time": "5 dk"}, {"title": "Kalıpları kapla", "body": "Fırını 220 °C'ye ısıtın. Hamuru unlanmış tezgâhta 1–2 mm inceliğinde açın ve 9 cm'lik daireler kesin. 24 küçük tart ya da muffin kalıbını yağlayıp daireleri tabana ve kenarlara bastırarak yerleştirin, taşan kenarları kesin.", "time": "15 dk"}, {"title": "Doldur", "body": "Her kalıbı dörtte üçüne kadar, 35 g dolguyla doldurun. Üstüne önce 5 g unu, sonra pudra şekerini ince bir süzgeçten serpin; un ve şeker fırında çatlak kabuğu oluşturur.", "time": "5 dk"}, {"title": "Fırınla", "body": "Kalıpları fırının alt-orta rafına koyup 22–25 dakika pişirin. Yüzey altın kahveye dönüp çatlamış ve dolgu ortada sallanmıyorsa hazırdır. Kalıplarda 10 dakika ılıtıp çıkarın ve tel ızgarada soğutun.", "time": "25 dk"}], "reviews": [], "cost": 2, "views": 3, "web": {"notes": [{"title": "Hatırlatma", "body": "Hamur açılmadan önce 30 dakika dinlenir ve dolgu kalıplara ılıdıktan sonra dökülür; sıcak dolgu ince hamuru yumuşatıp yırtar. Şurup 115 °C'de ocaktan alınır, daha koyu pişen şurup dolguyu sert ve kumlu yapar."}], "tags": [], "features": ["Tatlı", "Portekiz Mutfağı", "Vejetaryen", "Orta Bütçe (₺₺)"], "facts": ["Porsiyon24 adet", "Hazırlık + Pişirme 45 dk + 35 dk", "ZorlukOrta", "Pişirme Derecesi220°C fırın"], "similar": []}}, {"title": "Tarte de Amêndoa | Portekiz Algarve Usulü Karamelize Bademli Tart", "url": "https://dadagastro.com/tarif/tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart", "image": "https://dadagastro.com/varliklar/media/yayilim/t-tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart-kapak.webp", "category": "Tatlı", "difficulty": "Kolay", "rating": null, "slug": "tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart", "description": "Tarte de amêndoa nasıl yapılır? Önceden fırınlanan yumuşak tabanın üstüne tereyağı, şeker ve sütle kaynatılan badem dökülüp karamelize edildiği Algarve tartı.", "author": "İrem Akşit", "servings": 10, "unit": "dilim", "minutes": 55, "ratingCount": 0, "ingredients": [{"name": "tereyağı (oda sıcaklığında)", "amount": 100, "unit": "g"}, {"name": "toz şeker", "amount": 100, "unit": "g"}, {"name": "yumurta", "amount": 1, "unit": "adet"}, {"name": "süt", "amount": 45, "unit": "ml"}, {"name": "buğday unu", "amount": 150, "unit": "g"}, {"name": "kabartma tozu", "amount": 5, "unit": "g"}, {"name": "dilimlenmiş badem", "amount": 150, "unit": "g"}, {"name": "toz şeker", "amount": 100, "unit": "g"}, {"name": "tereyağı", "amount": 125, "unit": "g"}, {"name": "süt", "amount": 45, "unit": "ml"}, {"name": "tuz", "amount": 1, "unit": "g"}], "steps": [{"title": "Fırını ve kalıbı hazırla", "body": "Fırını 180 °C'ye ısıtın. 26 cm'lik tabanı çıkan tart kalıbını tereyağıyla yağlayıp unlayın, fazla unu silkeleyin.", "time": "5 dk"}, {"title": "Taban hamurunu karıştır", "body": "Oda sıcaklığındaki tereyağını, şekeri ve yumurtayı pürüzsüz olana kadar karıştırın. Sütü ekleyin, unu kabartma tozuyla birlikte eleyip katın ve çırpmadan, yalnızca birleşene kadar karıştırın. Hamur yumuşak ve yapışkandır.", "time": "7 dk"}, {"title": "Tabanı pişir", "body": "Hamuru kalıba alıp ıslak bir spatulayla tabana ve kenarlara eşit yayın. 15 dakika, yüzey sertleşip açık altın rengi alana kadar pişirin.", "time": "15 dk"}, {"title": "Bademi kaynat", "body": "Taban fırındayken badem katının bütün malzemelerini bir tencereye alın ve orta ateşte karıştırarak kaynamaya getirin. Kaynadıktan sonra 5 dakika, tereyağı şekerle birleşip karışım köpüklü ve koyu kabarcıklarla fokurdayana kadar karıştırmaya devam edin.", "time": "6 dk"}, {"title": "Döküp karamelize et", "body": "Badem karışımını fırından yeni çıkmış sıcak tabanın üstüne döküp spatulayla kenarlara kadar eşit yayın. Tartı fırına geri koyun ve 15 dakika, üstü koyu altın rengi ve parlak bir karamel olana kadar pişirin.", "time": "15 dk"}, {"title": "Kalıptan çıkar ve kes", "body": "Tartı fırından alın; karamel ılıyınca bıçağı kalıbın kenarında dolaştırın ve tabanı itip tartı çıkarın. Keskin, ıslak bir bıçakla 10 dilim kesin.", "time": "3 dk"}], "reviews": [{"author": "Koray Ertürk", "body": "Karamelize olurken fırının başından ayrılmayın, iki dakikada renk dönüyor.", "rating": null, "date": "2 hafta önce"}, {"author": "İpek Cebeci", "body": "Bademi kaynatıp dökerken taban henüz sıcakken çalışmak gerekiyor, soğumuş tabanda karışım yayılmıyor ve kalıp kenarlarına ulaşmıyor.", "rating": null, "date": "2 hafta önce"}], "cost": 3, "views": 3, "web": {"notes": [{"title": "Hatırlatma", "body": "Tart fırından çıktıktan 20 dakika sonra, karamel ılıkken kalıptan çıkarılır ve kenarı hemen bıçakla dolaşılır; tamamen soğuyan karamel kalıba yapışır ve tabanı kırar."}], "tags": [], "features": ["Tatlı", "Portekiz Mutfağı", "Vejetaryen", "Premium (₺₺₺)"], "facts": ["Porsiyon10 dilim", "Hazırlık + Pişirme 20 dk + 35 dk", "ZorlukKolay", "Pişirme Derecesi180°C fırın"], "similar": []}}, {"url": "https://dadagastro.com/tarif/sardalya-izgara-limon-kekikli", "title": "Sardalya Izgara | Limon Kekikli", "slug": "sardalya-izgara-limon-kekikli", "image": "https://dadagastro.com/varliklar/media/2793.webp", "description": "Sardalyaların zeytinyağı, limon ve kekikle marine edilip ızgarada pişirildiği ekonomik tarif; marinasyon ve pişirme püf noktalarıyla adım adım anlatım.", "author": "Cem Erez", "category": "Balık ve Deniz Ürünleri", "servings": 4, "unit": "kişilik", "minutes": 28, "difficulty": "Çok Kolay", "rating": null, "ratingCount": 0, "ingredients": [{"name": "Sardalya temizlenmiş", "amount": 12, "unit": "adet"}, {"name": "Zeytinyağı", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Limon suyu", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Kekik", "amount": 1, "unit": "çay kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}, {"name": "Karabiber", "amount": 0.5, "unit": "çay kaşığı"}, {"name": "Limon dilimlenmiş", "amount": 1, "unit": "adet"}], "steps": [{"title": "Marine edin", "body": "Temizlenmiş sardalyaları zeytinyağı, limon suyu, kekik, tuz ve karabiberle harmanlayıp 15 dakika dinlendirin.", "time": "15 dk"}, {"title": "Izgarada pişirin", "body": "Kızgın ızgarada sardalyaları her iki tarafı 2-3 dakika olacak şekilde pişirin.", "time": "6 dk"}, {"title": "Servis edin", "body": "Limon dilimleriyle sıcak servis edin.", "time": "2 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Önemli: Sardalyalar küçük ve ince yapılı olduğundan ızgarada 2-3 dakikadan fazla tutulmamalı, aksi halde kuruyabilir. Alerjen: yalnızca balık içerir. Dikkat: ızgara teli iyice ısınmadan balıkları koymayın, aksi halde deriler ızgaraya yapışıp parçalanabilir."}], "tags": ["#sardalya", "#ızgara", "#zeytinyağlı", "#deniz ürünleri", "#pesketaryen"], "features": ["Balık ve Deniz Ürünleri", "Türk Mutfağı", "Pesketaryen", "Glutensiz", "Protein Ağırlıklı", "Az Yağlı", "Laktozsuz", "Süt İçermez", "Ekonomik (₺)"], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 8 dk", "ZorlukÇok Kolay"], "similar": []}, "cost": 1}, {"url": "https://dadagastro.com/tarif/guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci", "slug": "guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci", "title": "Güveçte Ayvalı Tavuk | Mayhoş Ayvayla Kış Güveci", "image": "", "description": "Derisi alınmış kemikli tavuk butlarının soğan ve tarçınla toprak güveçte pişirildiği, iri dilimlenmiş ayvanın pişirmenin ikinci yarısında pekmezli tereyağıyla üste dizildiği bir kış güvecidir. Ayva sosun içinde uzun kalırsa dağılır; bu yüzden iri kesilir, pişirmenin ikinci yarısında girer ve sosa gömülmeden butların üstüne dizilir. Ayvanın mayhoş tadı tuzlu sosa geçer, üstteki dilimler hafifçe karamelleşir.", "author": "Cem Aydan", "category": "Tavuk ve Hindi", "servings": 6, "unit": "kişilik", "minutes": 110, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 0, "cost": 1, "ingredients": [{"name": "tavuk but (kemikli, derisi alınmış)", "amount": 1400, "unit": "g"}, {"name": "tereyağı", "amount": 40, "unit": "g"}, {"name": "kuru soğan", "amount": 250, "unit": "g"}, {"name": "domates salçası", "amount": 15, "unit": "g"}, {"name": "tarçın çubuğu", "amount": 1, "unit": "adet"}, {"name": "tuz", "amount": 10, "unit": "g"}, {"name": "karabiber", "amount": 2, "unit": "g"}, {"name": "su", "amount": 300, "unit": "ml"}, {"name": "ayva g (2 iri boy)", "amount": 700, "unit": "g"}, {"name": "su (ayvayı bekletmek için)", "amount": 750, "unit": "ml"}, {"name": "limon suyu", "amount": 30, "unit": "ml"}, {"name": "üzüm pekmezi", "amount": 20, "unit": "g"}], "steps": [{"title": "Tavuğu hazırla", "body": "Butların derisini çekerek soyun, fazla yağlarını makasla kesin. Mutfak kâğıdıyla kurulayıp tuzun 7 gramı ve karabiberle ovun.", "time": "10 dk"}, {"title": "Tavuğu mühürle", "body": "Tereyağının 25 gramını geniş bir tavada eritip butları her yüzü açık altın rengi olana kadar 8–10 dakika çevirin ve güvece dizin; bu aşamada tavuk pişmiş değildir.", "time": "12 dk"}, {"title": "Soğanlı sosu kur", "body": "Aynı tavada yarım ay doğranmış soğanı yumuşayana kadar çevirin, salçayı katıp ham kokusu geçene kadar karıştırın. Tarçın çubuğunu, kalan tuzu ve suyu ekleyip tavanın dibini kazıyarak kaynatın ve sosu butların üstüne dökün.", "time": "8 dk"}, {"title": "Güveçte ilk pişirme", "body": "Kapağı kapatıp güveci soğuk fırının orta rafına koyun, fırını 190 °C'ye ayarlayın ve 30 dakika pişirin; toprak kap fırınla birlikte ısınmalıdır.", "time": "30 dk"}, {"title": "Ayvayı hazırla", "body": "Tavuk fırındayken ayva suyunu bir kâseye doldurup limon suyunu ekleyin. Ayvaları soyup dörde bölün, çekirdek yataklarını bıçakla çıkarın ve her çeyreği ikiye kesip hemen limonlu suya atın. Kalan tereyağını eritip pekmezle çırpın.", "time": "10 dk"}, {"title": "Ayvayı diz ve bitir", "body": "Güveci fırından alıp ayva dilimlerini süzün ve butların üstüne tek kat dizin; pekmezli tereyağını ayvaların üstüne fırçayla sürün. Kapağı kapatıp 20 dakika, kapağı açıp 15 dakika daha pişirin. Ayva çatala dirençsiz girip kenarları koyulaştığında termometreyi en kalın butun kemiğe değmeyen yerine batırın; 74 °C'yi göstermeden çıkarmayın.", "time": "35 dk"}, {"title": "Servis et", "body": "Tarçın çubuğunu çıkarıp güveci kuru bir tahta altlığa alın. Her tabağa bir but ve iki ayva dilimi gelecek şekilde paylaştırıp sosunu gezdirin.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Ayvayı soyup çekirdek yatağını çıkardığınız anda limonlu suya atın; havada bekleyen ayva kısa sürede kahverengileşir ve güveçte de o renkte kalır.\nAlerjen: Malzeme listesine göre süt ve süt ürünleri içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 40 dk + 70 dk", "ZorlukKolay", "Pişirme Derecesi190°C fırın"]}}, {"url": "https://dadagastro.com/tarif/ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "slug": "ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "title": "Ördek Dolması | Fırında İç Pilavlı Bütün Ördek", "image": "", "description": "Ördeğin derisiyle eti arasında kalın bir yağ tabakası vardır; bu tabaka erimeden deri kızarmaz, bu yüzden deri çizilir ve pişirme düşük sıcaklıkta başlar. Karnına konan kuş üzümlü, cevizli iç pilav eriyen yağın bir kısmını çeker ve ördeğin ağır tadını dengeler. Son bölümde sıcaklık yükseltilerek deri çıtırlatılır.", "author": "İrem Egeli", "category": "Dolma ve Sarma", "servings": 6, "unit": "kişilik", "minutes": 160, "difficulty": "Zor", "rating": 5, "ratingCount": 1, "views": 1, "cost": 3, "ingredients": [{"name": "ördek g (1 adet, temizlenmiş)", "amount": 2200, "unit": "g"}, {"name": "tuz", "amount": 16, "unit": "g"}, {"name": "karabiber", "amount": 4, "unit": "g"}, {"name": "kekik", "amount": 3, "unit": "g"}, {"name": "limon suyu", "amount": 30, "unit": "ml"}, {"name": "pirinç", "amount": 250, "unit": "g"}, {"name": "kuru soğan g (1,5 orta boy)", "amount": 165, "unit": "g"}, {"name": "tereyağı", "amount": 50, "unit": "g"}, {"name": "kuş üzümü", "amount": 40, "unit": "g"}, {"name": "ceviz içi", "amount": 50, "unit": "g"}, {"name": "tarçın", "amount": 2, "unit": "g"}, {"name": "yenibahar", "amount": 2, "unit": "g"}, {"name": "su", "amount": 400, "unit": "ml"}, {"name": "tuz", "amount": 6, "unit": "g"}], "steps": [{"title": "Ördeği hazırla ve derisini çiz", "body": "Ördeği içi dışı yıkayıp mutfak kâğıdıyla kurulayın, göğüs boşluğundaki gevşek yağ parçalarını kesip ayırın. Göğüs ve bud derisini bıçağın ucuyla, parmak genişliğinde aralıklarla çapraz çizin; bıçak deriden geçip yağ tabakasında durmalı, ete girmemelidir. Limon suyunu deriye sürüp tuz, karabiber ve kekiği içine ve dışına ovun.", "time": "16 dk"}, {"title": "İç pilavı yarıya kadar pişir", "body": "Tereyağını tavada eritip ince doğranmış soğanı saydamlaşana kadar çevirin. İri kıyılmış ceviz içini ekleyip kokusu çıkana kadar bir iki dakika kavurun. Yıkanmış pirinci, kuş üzümünü, tarçını, yenibaharı ve tuzu katın, suyu ekleyip pirinç suyunu yarısına kadar çekene dek pişirin ve tepsiye yayarak ılıtın.", "time": "18 dk"}, {"title": "Doldur ve fırına ver", "body": "Ilıyan iç pilavı ördeğin karnına üçte iki oranında doldurun; pirinç fırında şişer. Deri kenarlarını kürdanla tutturup budları mutfak ipiyle bağlayın. Fırını 180 °C'ye ısıtıp ördeği ızgara telin üstüne göğsü yukarı bakacak şekilde koyun, altına derin bir tepsi yerleştirin.", "time": "12 dk"}, {"title": "Pişir ve yağını boşalt", "body": "Ördeği 180 °C'de bir buçuk saat pişirin. Her kırk dakikada bir tepside biriken yağı kepçeyle alın; biriken yağ tepsinin dibini kaplamayı geçerse alttaki deri kızarmaz. Aldığınız yağın birkaç kaşığını ördeğin üstüne gezdirin, kalanını süzüp buzdolabında saklayın.", "time": "45 dk"}, {"title": "Deriyi çıtırlat ve iç sıcaklığı ölç", "body": "Fırını 200 °C'ye çıkarıp son yarım saat, deri koyu altın rengine dönüp gerilene kadar pişirin. Termometreyi bud ile gövdenin birleştiği kalın ete, kemiğe değdirmeden batırın; ölçüm 74 °C'ye ulaşmadan fırından almayın, kanatlının güvenli iç sıcaklığı budur. Aynı ölçümü karındaki iç pilavda da tekrarlayın.", "time": "22 dk"}, {"title": "Dinlendir ve parçala", "body": "Ördeği fırından alıp gevşek folyo altında 15 dakika dinlendirin; bu sırada etin suyu lif aralarına geri dağılır. İpleri çözüp iç pilavı bir kaba boşaltın. Göğsü kemiğin iki yanından bıçakla ayırıp dilimleyin, budları eklem yerinden çıkarın ve pilavın üstünde servis edin.", "time": "8 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Deriyi çizerken bıçağı eti göreceğiniz kadar bastırmayın; ete ulaşan kesik pişerken suyu dışarı salar ve göğüs kurur."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 40 dk + 120 dk", "ZorlukZor", "Pişirme Derecesi180°C fırın"]}}, {"url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu", "slug": "tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu", "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu", "image": "", "description": "Bebek mamalarının çoğu \"haşlama suyuyla açın\" der ama o suyun nasıl kurulduğunu anlatmaz; bu tarif tam olarak onu yapıyor. Tuz, bulyon ve hazır et suyu tozu girmez, çünkü hazır ürünlerin tamamı sodyum üzerine kuruludur. Süzülen su pürelerde musluk suyunun yerini alır ve tencerede kalan et atılmaz, didiklenip pürelere karışır.", "author": "Ege Bakırcıoğlu", "category": "Bebek Tarifleri", "servings": 6, "unit": "kişilik", "minutes": 107, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 0, "cost": 1, "ingredients": [{"name": "tavuk but (derisiz, kemikli)", "amount": 500, "unit": "g"}, {"name": "havuç", "amount": 100, "unit": "g"}, {"name": "kuru soğan", "amount": 60, "unit": "g"}, {"name": "kereviz sapı", "amount": 40, "unit": "g"}, {"name": "içme suyu", "amount": 2000, "unit": "ml"}], "steps": [{"title": "Tavuğu hazırla", "body": "Butların derisini tamamen soyup atın ve görünen sarı yağ parçalarını kesin. Deri suya yoğun yağ bırakır ve bebeğin suyunun üstünde kalın bir tabaka oluşturur. Etleri soğuk suda durulayın.", "time": "8 dk"}, {"title": "Soğuk suyla başlat", "body": "Tavuğu 2 litre soğuk suya koyup orta ateşe alın. Sıcak suyla başlarsanız yüzeydeki proteinler bir anda pıhtılaşıp suya dağılır ve süzseniz bile berrak bir su elde edemezsiniz. Kapağı kapatmayın.", "time": "6 dk"}, {"title": "Köpüğü al", "body": "Su kaynamaya yaklaşırken yüzeyde gri renkli bir köpük toplanır; bunu delikli kaşıkla alıp atın ve yüzey temizlenene kadar sürdürün. Köpük alınmazsa kaynamayla birlikte suya karışır ve tadı ağırlaştırır.", "time": "8 dk"}, {"title": "Kısık ateşte kaynat", "body": "Ateşi yüzeyde ancak tek tük kabarcık çıkacak kadar kısın, kapağı aralık bırakıp yetmiş dakika pişirin. Doğranmış havuç, soğan ve kereviz sapını son otuz dakikada ekleyin; baştan atılan sebze tamamen dağılıp suyu bulandırır. Tuz, bulyon ve hazır et suyu tozu kullanılmaz.", "time": "70 dk"}, {"title": "Etin iç sıcaklığını ölç", "body": "Tencereden bir but alın ve etin en kalın yerine, kemiğe değdirmeden, daldırma termometre sokun: iç sıcaklık 74 °C olmalı. Termometreniz yoksa eti kemikten ayırın; kemiğe bitişik kısımda pembe iz ve kanlı sıvı kalmamalı, lifler çatalla kolayca ayrılmalı.", "time": "5 dk"}, {"title": "Süz ve eti ayır", "body": "İnce gözlü süzgecin üstüne tülbent serip suyu süzün. Süzgeçte kalan tavuk etini atmayın: kemiklerinden ayırıp didikleyin ve bebek pürelerine karıştırmak üzere ayrı bir kapta saklayın. Kemikleri ve sebze posasını atın.", "time": "8 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Süzdüğünüz suyu buzdolabında bir gece bekletin; üstte katılaşan yağ tabakası kaşıkla tek parça hâlinde kaldırılır, sıcakken sıyırmaya çalışırsanız yağın çoğu suda kalır."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 15 dk + 92 dk", "ZorlukKolay"]}}, {"url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav", "slug": "arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav", "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav", "image": "", "description": "Arroz con pato, kuzey Peru'nun Chiclayo kentiyle anılan pilavıdır: ördek butları kendi yağında kızartılır, kişniş ezmesi ve aji amarillo ile pişirilir, pirinç aynı yeşil suda demlenir. Ördeğin derisinden çıkan yağ pilava geçer; bu yüzden ayrıca yağ eklenmez. Klasik tarifte kullanılan mayalı içecek bu tarifte yok; sıvının tamamı ördek suyu ve portakal suyudur.", "author": "Burcu Yıldırım", "category": "Pilav", "servings": 6, "unit": "kişilik", "minutes": 120, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 0, "cost": 3, "ingredients": [{"name": "ördek but", "amount": 6, "unit": "adet"}, {"name": "tuz", "amount": 2.5, "unit": "çay kaşığı"}, {"name": "karabiber", "amount": 1, "unit": "çay kaşığı"}, {"name": "kimyon", "amount": 1, "unit": "çay kaşığı"}, {"name": "taze kişniş", "amount": 120, "unit": "g"}, {"name": "ıspanak", "amount": 30, "unit": "g"}, {"name": "kuru soğan", "amount": 2, "unit": "adet"}, {"name": "sarımsak", "amount": 5, "unit": "diş"}, {"name": "aji amarillo ezmesi", "amount": 2, "unit": "yemek kaşığı"}, {"name": "et suyu", "amount": 900, "unit": "ml"}, {"name": "portakal suyu", "amount": 150, "unit": "ml"}, {"name": "pirinç", "amount": 500, "unit": "g"}, {"name": "bezelye", "amount": 150, "unit": "g"}, {"name": "kırmızı dolma biber", "amount": 1, "unit": "adet"}, {"name": "havuç", "amount": 1, "unit": "adet"}], "steps": [{"title": "Ördeği kızart", "body": "Ördek butlarını kurulayıp tuz, karabiber ve kimyonla ovun. Geniş ve kalın dipli bir tencereyi yağsız ısıtıp butları derili yüzü alta gelecek şekilde dizin ve kısık-orta ateşte 12 dakika, deri altın kahverengi olup yağını bırakana kadar pişirin. Çevirip 5 dakika daha kızartın ve tabağa alın; tencerede kalan yağın 3 yemek kaşığı dışındakini alın.", "time": "18 dk"}, {"title": "Sofritoyu kavur", "body": "Kalan ördek yağında ince doğranmış soğanı 5 dakika kavurun, sarımsağı ve aji amarillo ezmesini ekleyip 4 dakika çevirin.", "time": "10 dk"}, {"title": "Kişniş ezmesini çek", "body": "Kişnişi, ıspanağı ve et suyunun 200 ml'sini blenderda koyu yeşil bir ezme olana kadar çekin.", "time": "6 dk"}, {"title": "Ördeği pişir", "body": "Butları tencereye geri koyun, kişniş ezmesini, kalan et suyunu ve portakal suyunu ekleyip kaynatın. Kapağı kapatıp kısık ateşte 50 dakika pişirin. Termometreyi butun en kalın yerine, kemiğe değdirmeden batırın: ördek de kanatlıdır, iç sıcaklık 74 °C olmalıdır. Butları çıkarıp sıcak tutun ve tencerede 1 litre sıvı bırakın, fazlasını alın.", "time": "55 dk"}, {"title": "Pilavı demle", "body": "Yıkanmış pirinci, bezelyeyi, şerit doğranmış biberi ve küçük doğranmış havucu yeşil suya ekleyin. Kaynayınca ateşi en kısığa indirip kapağı sıkıca kapatın ve 18 dakika, su çekilene kadar karıştırmadan pişirin.", "time": "20 dk"}, {"title": "Servis et", "body": "Demlenen pilavı çatalla havalandırıp tabaklara alın, ördek butlarını üstüne yerleştirin; yanında kırmızı soğan salatası verilir.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Pilav piştikten sonra ocaktan alıp kapağı kapalı 10 dakika demlendirin; hemen karıştırılan pilav ezilir ve taneler birbirine yapışır."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 25 dk + 95 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "slug": "asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "title": "Asam Pedas | Malezya Usulü Demirhindili Ekşi Acı Balık Yahnisi", "image": "", "description": "Asam pedas, adını iki tadından alır: 'asam' ekşi, 'pedas' acı. Melaka ve Johor sofralarının bu yemeği, Malezya mutfağının hindistan cevizi sütüyle özdeşleşmiş kollarının tam tersidir — burada süt hiç yoktur, sos berrak kırmızı kalır ve ekşilik demirhindi suyundan gelir. Balık sosa en sonda girer ve mümkün olduğunca az karıştırılır; balık eti bir kez daldıktan sonra kaşıkla itilirse dağılır ve yemek bulanır.", "author": "Ece Sarıoğlu", "category": "Balık ve Deniz Ürünleri", "servings": 4, "unit": "kişilik", "minutes": 60, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 0, "cost": 2, "ingredients": [{"name": "kurutulmuş kırmızı acı biber", "amount": 25, "unit": "g"}, {"name": "arpacık soğan", "amount": 120, "unit": "g"}, {"name": "sarımsak", "amount": 5, "unit": "diş"}, {"name": "havlıcan (galangal)", "amount": 20, "unit": "g"}, {"name": "limon otu sap", "amount": 2, "unit": ""}, {"name": "karides ezmesi (belacan)", "amount": 10, "unit": "g"}, {"name": "uskumru (temizlenmiş, kalın dilim)", "amount": 700, "unit": "g"}, {"name": "demirhindi ezmesi", "amount": 60, "unit": "g"}, {"name": "sıvı yağ", "amount": 60, "unit": "ml"}, {"name": "bamya", "amount": 200, "unit": "g"}, {"name": "patlıcan", "amount": 200, "unit": "g"}, {"name": "domates", "amount": 150, "unit": "g"}, {"name": "su", "amount": 800, "unit": "ml"}, {"name": "tuz", "amount": 8, "unit": "g"}, {"name": "hindistan cevizi şekeri", "amount": 12, "unit": "g"}, {"name": "nane ve taze kişniş", "amount": 20, "unit": "g"}], "steps": [{"title": "Demirhindi suyunu ve ezmeyi hazırla", "body": "Demirhindi ezmesini 400 ml ılık suda parmaklarınızla ezerek dağıtın ve ince tülbentten süzün; çekirdek ve lif süzgeçte kalmalı. Kuru biberlerin sap ve çekirdeklerini ayıklayıp sıcak suda yumuşatın, sonra arpacık soğan, sarımsak, havlıcan, limon otunun beyaz alt kısmı ve karides ezmesiyle birlikte robotta pürüzsüz ezme hâline getirin.", "time": "14 dk"}, {"title": "Ezmeyi kavur", "body": "Yağı geniş ve sığ bir tencerede ısıtın, ezmeyi orta-kısık ateşte karıştırarak kavurun. Ezmenin hacmi azalıp koyulaştığında ve kenarlarından berrak kırmızı yağ ayrıldığında hazırdır; bu ayrışma olmadan ekleyeceğiniz su ezmenin çiğ tadını sosa taşır.", "time": "8 dk"}, {"title": "Sosu kur", "body": "Süzülmüş demirhindi suyunu ve kalan 400 ml suyu ekleyin, tuzu ve hindistan cevizi şekerini koyup kaynatın. Ateşi kısıp 8 dakika açık pişirin; sos hafifçe koyulaşmalı ve tadı ilk andaki keskin ekşilikten çıkıp yuvarlanmalı.", "time": "12 dk"}, {"title": "Sebzeleri at", "body": "Bamyaların yalnızca sap ucunu kesin, iç kısmı açılmasın. Patlıcanı kalın dilimler hâlinde doğrayın. İkisini de sosa ekleyip 6–7 dakika pişirin; patlıcan sosu emip rengini koyulaştırdığında bir sonraki adıma geçin.", "time": "8 dk"}, {"title": "Balığı ekle", "body": "Balık dilimlerini sosun içine tek kat hâlinde yerleştirin ve tencereyi bir daha karıştırmayın — gerekiyorsa tencereyi tutup hafifçe sallayın. Kapağı kapatıp kısık ateşte pişirin; en kalın dilimin orta yerine çatal batırdığınızda et kolayca pul pul ayrılıyorsa hazırdır. Dörde böldüğünüz domatesleri son 3 dakikada ekleyin.", "time": "12 dk"}, {"title": "Otlarla bitir", "body": "Ocağı kapatın, limon otu saplarını çıkarın ve taze nane ile kişnişi üzerine serpin. Yemek 5 dakika dinlendikten sonra, sıcak pilavla servis edilir.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Demirhindi suyu süzülmeden kullanılmaz: ezmenin içinde sert çekirdek ve lif kalır, bunlar sosta kum gibi durur ve yenmez."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 25 dk + 35 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "slug": "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "title": "Jiao Yan Karides | Çin Usulü Tuz ve Biberli Çıtır Karides", "image": "", "description": "Jiao yan \"biber ve tuz\" demektir ve yemeğin bütün lezzeti o iki kelimede saklıdır: kavrulup dövülmüş Sichuan biberiyle tuzun karışımı, kızarmış karideslerin üzerine son otuz saniyede atılır. Sos yoktur, kaplama incecik bir nişasta katmanından ibarettir. Karidesler kabuklarıyla kızartılır — kabuk çıtırlaşır ve tabakta olduğu gibi yenir; kabuğu soyulmuş karides aynı yemeği vermez.", "author": "Burcu Akyüz", "category": "Balık ve Deniz Ürünleri", "servings": 4, "unit": "kişilik", "minutes": 40, "difficulty": "Orta", "rating": 5, "ratingCount": 2, "views": 0, "cost": 3, "ingredients": [{"name": "iri karides (kabuklu)", "amount": 700, "unit": "g"}, {"name": "mısır nişastası", "amount": 60, "unit": "g"}, {"name": "pirinç unu", "amount": 30, "unit": "g"}, {"name": "tuz", "amount": 1, "unit": "g"}, {"name": "beyaz biber", "amount": 2, "unit": "g"}, {"name": "yumurta akı", "amount": 1, "unit": "adet"}, {"name": "ayçiçek yağı (kızartmak için)", "amount": 700, "unit": "ml"}, {"name": "tuz", "amount": 4, "unit": "g"}, {"name": "Sichuan biberi", "amount": 3, "unit": "g"}, {"name": "beyaz biber", "amount": 2, "unit": "g"}, {"name": "pul biber", "amount": 2, "unit": "g"}, {"name": "toz şeker", "amount": 2, "unit": "g"}, {"name": "sarımsak", "amount": 20, "unit": "g"}, {"name": "yeşil soğan", "amount": 40, "unit": "g"}, {"name": "kırmızı ve yeşil sivri biber", "amount": 80, "unit": "g"}, {"name": "ayçiçek yağı", "amount": 15, "unit": "ml"}], "steps": [{"title": "Karidesleri hazırla", "body": "Karideslerin bıyıklarını ve keskin burun dikenini makasla kesin, sırtlarını makasla yarıp koyu bağırsak şeridini çıkarın; kabuğu çıkarmayın. Soğuk suyla durulayıp kâğıt havluyla çok iyi kurulayın. Yumurta akı, tuz ve beyaz biberle ovup kenara alın.", "time": "12 dk"}, {"title": "Tuz-biber karışımını yap", "body": "Sichuan biberini yağsız bir tavada orta ateşte 40–50 saniye, kokusu keskinleşip hafif duman çıkana kadar kavurun ve havanda ince toz hâline getirin. Elekten geçirip kabuk parçalarını ayırın. Tuzu, beyaz biberi, pul biberi ve şekeri ekleyip karıştırın, küçük bir kâsede ocağın yanında tutun.", "time": "5 dk"}, {"title": "Kaplamaya bula", "body": "Nişasta ile pirinç ununu geniş bir tabakta karıştırın. Karidesleri partiler hâlinde bu karışıma yatırıp fazlasını silkeleyin — kaplama gözle görülmeyecek kadar ince olmalı, kalın kat kızartmada dökülür. Bulanmış karidesleri tek kat hâlinde dizin, üst üste yığmayın.", "time": "5 dk"}, {"title": "180 °C yağda kızart", "body": "Yağı 180 °C'ye ısıtın; termometreniz yoksa bir tutam nişasta attığınızda hemen ama şiddetli olmayan bir cızırtıyla kabarmalı. Karidesleri üçer dörder atıp 90 saniye kızartın, kabuk kırmızılaşıp kaplama sertleştiğinde delikli kepçeyle alın ve ızgara teline koyun. Kâğıt havluya yığarsanız kendi buharlarında yumuşarlar.", "time": "10 dk"}, {"title": "Wok'ta sebzeleri çevir", "body": "Woku yüksek ateşte ısıtıp 15 ml yağı dökün, kıyılmış sarımsağı 15 saniye çevirin. Halka kesilmiş sivri biberleri ve yeşil soğanın beyaz kısımlarını ekleyip 1 dakika kavurun. Sarımsağın rengi altın sarısını geçmesin.", "time": "4 dk"}, {"title": "Karidesleri ve karışımı at", "body": "Kızarmış karidesleri woka alın, tuz-biber karışımını üzerlerine serpin ve woku sallayarak 30–40 saniye harmanlayın. Spatulayla bastırmayın, kaplama kırılır. Yeşil soğanın yeşil kısmını atıp ocaktan alın ve hemen servis edin; beklerse çıtırlık gider.", "time": "2 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Tuz-biber karışımını kızartma sırasında değil, karidesler wok'a döndükten sonra atın. Yağa giren tuz karideslerin suyunu çeker ve kaplama yumuşar."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 20 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "slug": "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "title": "İran Usulü Baharatlı Acılı Balık Kebabı | Gece Atıştırmalığından Brunch'a Uzanan Şiş", "image": "", "description": "Balık filetonun zerdeçal, acı biber ezmesi ve limonla marine edilip şişe dizilerek ızgarada pişirilmesiyle hazırlanan bu kebap, İran mutfağının baharat cömertliğini balığa taşır. Düşük kalorili ve balık dostu yapısıyla hem gece atıştırmalığı hem brunch tabağı olarak sofraya gelir.", "author": "Şahnur Ilıcalı", "category": "Balık ve Deniz Ürünleri", "servings": 4, "unit": "kişilik", "minutes": 50, "difficulty": "Orta", "rating": 5, "ratingCount": 4, "views": 118, "cost": 2, "ingredients": [{"name": "levrek fileto küp doğranmış", "amount": 600, "unit": "g"}, {"name": "acı kırmızı biber ezmesi", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Zerdeçal", "amount": 1, "unit": "çay kaşığı"}, {"name": "Sarımsak", "amount": 2, "unit": "diş"}, {"name": "Limon suyu", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Zeytinyağı", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}, {"name": "taze kişniş ince kıyılmış", "amount": 1, "unit": "demet"}], "steps": [{"title": "Balığı marine edin", "body": "Balık küplerini acı biber ezmesi, zerdeçal, sarımsak, limon suyu, zeytinyağı ve tuzla karıştırıp 15 dakika marine edin.", "time": "15 dk"}, {"title": "Şişe dizin", "body": "Marine edilmiş balık küplerini şişlere dizin.", "time": "10 dk"}, {"title": "Izgarada pişirin", "body": "Şişleri orta-yüksek ateşteki ızgarada her tarafını çevirerek 20 dakika, balık pişip hafif kararana kadar pişirin.", "time": "20 dk"}, {"title": "Servis edin", "body": "Şişleri taze kişniş serperek sıcak servis edin.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Balığı şişe dizerken parçaları çok sıkı bastırmayın, aksi halde pişerken dağılabilir. Metal şiş kullanıyorsanız pişirmeden önce hafifçe yağlayın, balık yapışmasın.\nAlerjen: Malzeme listesine göre balık içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 30 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik", "slug": "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik", "title": "Karabuğday Kaplamalı Levrek | Fırında Tam Tahıllı Kabuklu Balık", "image": "", "description": "Levrek fileto, yumurta akına batırılıp karabuğday unuyla kaplandıktan sonra fırında pişirilir; kızartmaya göre çok daha az yağ kullanılır. Karabuğdayın kabuklu tam tahıl yapısı hem çıtır bir kaplama verir hem de tabağı tam tahıllı hale getirir.", "author": "Emel Aksu", "category": "Balık ve Deniz Ürünleri", "servings": 4, "unit": "kişilik", "minutes": 30, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 102, "cost": 3, "ingredients": [{"name": "kılçıksız levrek fileto", "amount": 4, "unit": "adet"}, {"name": "Karabuğday unu", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Yumurta Akı", "amount": 2, "unit": "adet"}, {"name": "Limon suyu", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Zeytinyağı", "amount": 1, "unit": "yemek kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}, {"name": "Karabiber", "amount": 0.5, "unit": "çay kaşığı"}, {"name": "Maydanoz ince kıyılmış, servis için", "amount": 1, "unit": "demet"}], "steps": [{"title": "Kaplamayı hazırlayın", "body": "Karabuğday ununu tuz ve karabiberle geniş bir tabakta karıştırın, fırın tepsisine yağlı kağıt serin.", "time": "5 dk"}, {"title": "Fileto kaplayın", "body": "Levrek filetoları önce yumurta akına batırın, ardından karabuğday karışımına bastırarak her iki yüzünü kaplayın.", "time": "5 dk"}, {"title": "Fırında pişirin", "body": "Filetoları tepsiye dizip önceden 200 dereceye ısıtılmış fırında kaplama altın rengi alıp balık çatalla kolayca ayrılana kadar 18 dakika pişirin.", "time": "18 dk"}, {"title": "Servise hazırlayın", "body": "Fırından çıkan filetoların üzerine zeytinyağı ve limon suyu gezdirin, maydanoz serperek servis edin.", "time": "2 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Kaplamayı yaptıktan hemen sonra fileto pişirilmezse karabuğday unu nemlenip fırında çıtırlığını kaybeder; kaplamayı bekletmeden fırına verin. Alerjen: balık, yumurta içerir."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 10 dk + 20 dk", "ZorlukOrta", "Pişirme Derecesi200°C fırın"]}}, {"url": "https://dadagastro.com/tarif/mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "slug": "mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "title": "Mercimekli Yaprak Sarma | Adıyaman Usulü Kırmızı Mercimekli", "image": "", "description": "Kırmızı mercimek pişerken dağılıp koyu bir lapa hâline geldiği için yaprağa çiğ katılamaz; harç önce ince bulgurla birlikte pişirilir, sonra soğutulup öyle sarılır. Soğuyan harç bıçakla kesilecek kadar tutar ve yaprağın içinde dağılmaz. Salçalı ve naneli bu sarma zeytinyağıyla pişirilir, ılık servis edilir.", "author": "Mert Taşlı", "category": "Dolma ve Sarma", "servings": 6, "unit": "kişilik", "minutes": 85, "difficulty": "Zor", "rating": 5, "ratingCount": 1, "views": 1, "cost": 1, "ingredients": [{"name": "kırmızı mercimek", "amount": 200, "unit": "g"}, {"name": "ince bulgur", "amount": 150, "unit": "g"}, {"name": "kuru soğan g (2 orta boy)", "amount": 220, "unit": "g"}, {"name": "domates salçası", "amount": 35, "unit": "g"}, {"name": "zeytinyağı", "amount": 110, "unit": "ml"}, {"name": "kuru nane", "amount": 5, "unit": "g"}, {"name": "pul biber", "amount": 4, "unit": "g"}, {"name": "kimyon", "amount": 2, "unit": "g"}, {"name": "tuz", "amount": 9, "unit": "g"}, {"name": "su", "amount": 500, "unit": "ml"}, {"name": "asma yaprağı g (yaklaşık 45 yaprak)", "amount": 280, "unit": "g"}, {"name": "su", "amount": 200, "unit": "ml"}, {"name": "nar ekşisi", "amount": 30, "unit": "ml"}], "steps": [{"title": "Yaprakları hazırla", "body": "Taze yaprak kullanıyorsanız saplarını kesip kaynar suda, rengi koyulaşana kadar yarım dakika tutup süzün. Hazır salamura yaprak kullanıyorsanız akan suda yıkayıp ılık suda bekletin ve suyu iki kez değiştirerek tuzunu alın. Bir yaprağın ucunu tadarak tuzluluğunu denetleyin.", "time": "10 dk"}, {"title": "Harcı pişir", "body": "Zeytinyağının yarısını tencerede ısıtıp ince doğranmış soğanı saydamlaşana kadar çevirin, salçayı ekleyip ham kokusu geçene kadar karıştırın. Yıkanmış kırmızı mercimeği ve suyu ekleyip kaynatın, ateşi kısıp mercimek tamamen dağılana kadar pişirin. İnce bulguru, naneyi, pul biberi, kimyonu ve tuzu katıp karıştırın ve ocaktan alın.", "time": "16 dk"}, {"title": "Harcı soğut", "body": "Harcı geniş bir tepsiye ince tabaka hâlinde yayın; kalın yığılan lapa içeriden sıcak kalır. Bulgur bu sırada kalan buharı çeker ve harç koyulaşır. Elinizin üstüne bir parça koyduğunuzda ılık hissettiğinde ve kaşıkla kestiğinizde kesik yeri kapanmıyorsa sarmaya hazırdır.", "time": "4 dk"}, {"title": "Sar", "body": "Yaprağı damarlı yüzü yukarı açıp dibine bir tatlı kaşığı harç koyun ve harcı parmağınızla yayarak şerit hâline getirin. İki yanı katlayıp dipten uca doğru sıkıca sarın; bu harç pişerken şişmediği için diğer sarmaların aksine gevşek sarılmaz. Yırtık yaprakları tencerenin dibine serip sarmaları sıra sıra dizin.", "time": "22 dk"}, {"title": "Pişir", "body": "Kalan zeytinyağını, nar ekşisini ve 200 ml sıcak suyu karıştırıp sarmaların üzerine gezdirin; harç zaten pişmiş olduğu için bol suya gerek yoktur. Ters bir tabak kapatıp kapağı kapatın ve kısık ateşte 35 dakika pişirin. Yaprak koyulaşıp çatalla kolayca ayrıldığında hazırdır; ocaktan alıp dinlendirin ve ılık servis edin.", "time": "26 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Harcı sıcakken sarmaya kalkışmayın: sıcak mercimek lapası yaprağı içeriden buharlar, yaprak gevşer ve sarma tencerede açılır.\nAlerjen: Malzeme listesine göre buğday (gluten) içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 40 dk + 45 dk", "ZorlukZor"]}}, {"url": "https://dadagastro.com/tarif/lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "slug": "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "title": "Lor Dolması | Bayburt Usulü Lorlu Yaprak Sarma", "image": "", "description": "Bayburt'un yaprak sarması pirinçle değil lor peyniriyle doldurulur; sarma bu yüzden hem daha hafif hem çok daha kısa sürede pişer. Lor pişerken su salar, o yüzden harca yumurta katılır ve yaprak sıkı sarılır. Sıcak yenir, zeytinyağlı sarmalar gibi soğutulmaz.", "author": "Dağhan Fahri", "category": "Dolma ve Sarma", "servings": 6, "unit": "kişilik", "minutes": 75, "difficulty": "Orta", "rating": 5, "ratingCount": 2, "views": 0, "cost": 2, "ingredients": [{"name": "lor peyniri", "amount": 300, "unit": "g"}, {"name": "asma yaprağı (salamura)", "amount": 150, "unit": "g"}, {"name": "yumurta", "amount": 2, "unit": "adet"}, {"name": "dereotu", "amount": 1, "unit": "demet"}, {"name": "tereyağı", "amount": 60, "unit": "g"}, {"name": "su", "amount": 400, "unit": "ml"}, {"name": "karabiber", "amount": 2, "unit": "g"}], "steps": [{"title": "Yaprakları hazırla", "body": "Salamura yaprakları kaynar suda 5 dakika bekletip soğuk suda durulayın ve süzün. Saplarını makasla kesin; kalan sap sarmanın içinde batar.", "time": "10 dk"}, {"title": "Harcı hazırla", "body": "Loru çatalla ezip yumurtaları, ince kıyılmış dereotunu ve karabiberi ekleyip karıştırın. Harç kaşıkla alındığında akmayan, top olan bir kıvamda olmalı; sulu geldiyse bir tülbentte 15 dakika süzün. Tuz eklemeyin.", "time": "8 dk"}, {"title": "Sar", "body": "Yaprağın damarlı yüzü yukarı bakacak şekilde açın, dip tarafına bir tatlı kaşığı harç koyun. Önce alt kenarı harcın üzerine kapatın, sonra iki yanı içeri katlayıp sıkıca rulo yapın. Gevşek sarılan dolma pişerken lorunu suya bırakır.", "time": "25 dk"}, {"title": "Tencereye diz", "body": "Tencerenin dibine birkaç yaprak serin, sarmaları birbirine dayanacak şekilde sıkışık dizin. Üzerine tereyağını parçalar hâlinde dağıtın ve suyu kenardan dökün; su sarmaların yalnız üstünü örtsün.", "time": "6 dk"}, {"title": "Kısık ateşte pişir", "body": "Sarmaların üzerine ters bir tabak kapatıp kapağı kapatın ve kısık ateşte pişirin. Yaprak koyu zeytin yeşiline dönüp çatalla kolayca kesildiğinde ve tencerede yalnız yağ ile az miktarda su kaldığında dolma olmuştur. Sıcak servis edin.", "time": "25 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Salamura yaprak kullanıyorsanız kaynar suda 5 dakika bekletip durulayın ve harca hiç tuz eklemeyin; yaprağın tuzu harcın tuzuyla birleşince sarma yenmez olur.\nAlerjen: Malzeme listesine göre süt ve süt ürünleri, yumurta içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 45 dk + 30 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek", "slug": "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek", "title": "Chelsea Bun | Yeni Zelanda Usulü Tarçınlı Kuru Üzümlü Rulo Çörek", "image": "", "description": "Chelsea Bun, tarçınlı kuru üzüm harcıyla doldurulan mayalı hamurun sıkıca rulo yapılıp dilimlenerek airfryer'da pişirilmesiyle hazırlanan Yeni Zelanda fırınlarının sevilen bir kahvaltı çöreğidir. Hamurun ince ve eşit açılması, dilimlerin pişerken düzgün bir spiral görünüm kazanmasını sağlar. Sıcak servis edilen bu çörekler kalabalık bir brunch masasında hızla tükenir.", "author": "Göktürk Dizdar", "category": "Dolma ve Sarma", "servings": 6, "unit": "kişilik", "minutes": 55, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 98, "cost": 2, "ingredients": [{"name": "Un", "amount": 3, "unit": "su bardağı"}, {"name": "maya kuru", "amount": 1, "unit": "tatlı kaşığı"}, {"name": "Süt ılık", "amount": 1, "unit": "su bardağı"}, {"name": "Toz şeker", "amount": 2, "unit": "yemek kaşığı"}, {"name": "Tereyağı eritilmiş", "amount": 80, "unit": "g"}, {"name": "Tuz", "amount": 0.5, "unit": "çay kaşığı"}, {"name": "esmer şeker", "amount": 0.5, "unit": "su bardağı"}, {"name": "Tarçın toz", "amount": 1, "unit": "tatlı kaşığı"}, {"name": "kuru üzüm", "amount": 0.75, "unit": "su bardağı"}, {"name": "Pudra şekeri kaplama için", "amount": 3, "unit": "yemek kaşığı"}], "steps": [{"title": "Hamuru yoğurup mayalayın", "body": "Unu maya, toz şeker ve tuzla karıştırıp ılık süt ve eritilmiş tereyağının yarısını ekleyin, pürüzsüz bir hamur elde edene kadar yoğurup üzerini örterek 45 dakika mayalanmaya bırakın.", "time": "45 dk"}, {"title": "Harcı hazırlayın", "body": "Esmer şekeri tarçınla karıştırıp kuru üzümü ekleyin.", "time": "5 dk"}, {"title": "Doldurup sarın", "body": "Hamuru dikdörtgen şeklinde açıp kalan eritilmiş tereyağını sürün, harcı eşit şekilde serpiştirip sıkıca rulo yapın, 2 santimetre kalınlığında dilimleyip airfryer'a uygun bir kalıba yerleştirin.", "time": "20 dk"}, {"title": "Airfryer'da pişirin", "body": "Kalıbı airfryer sepetine yerleştirip ruloların üzeri altın rengi alana kadar 18 dakika pişirin.", "time": "18 dk"}, {"title": "Şekerle kaplayıp servis edin", "body": "Pudra şekerini birkaç damla su ile karıştırıp ılık rulolara gezdirin, sıcak servis edin.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Hamuru şekillendirirken çok sıkı sarmayın, gevşek sarılan rulo pişerken katmanlarını daha iyi korur. Alerjen: gluten (un), süt ve süt ürünleri (süt, tereyağı) içerir."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 25 dk + 30 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/moin-moin-nijerya-usulu-buharda-borulce-pudingi", "slug": "moin-moin-nijerya-usulu-buharda-borulce-pudingi", "title": "Moin Moin | Nijerya Usulü Buharda Börülce Pudingi", "image": "", "description": "Moin moin akarayla aynı hamurdan çıkar ama kızartılmaz, buharda pişirilir; sonuç köfte değil, kesilebilen yumuşak bir puding olur. Kızartmadan gelen kabuk olmadığı için hamurun kıvamı burada daha akışkandır. Kaplara doldururken üstte boşluk bırakılır, çünkü buharda hamur belirgin şekilde kabarır.", "author": "Atakan Atan", "category": "Bakliyat", "servings": 8, "unit": "porsiyonluk", "minutes": 100, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 0, "cost": 1, "ingredients": [{"name": "kuru börülce", "amount": 400, "unit": "g"}, {"name": "kuru soğan", "amount": 150, "unit": "g"}, {"name": "kırmızı kapya biber", "amount": 200, "unit": "g"}, {"name": "acı kırmızı biber", "amount": 1, "unit": "adet"}, {"name": "ayçiçek yağı", "amount": 60, "unit": "ml"}, {"name": "su", "amount": 200, "unit": "ml"}, {"name": "haşlanmış yumurta", "amount": 2, "unit": "adet"}, {"name": "tuz", "amount": 8, "unit": "g"}], "steps": [{"title": "Kabuğunu soy", "body": "Islatılmış börülceyi avuç içlerinizde ovarak kabuklarından ayırın, suyla yüzdürüp kabukları dökün ve kabuk kalmayana kadar tekrarlayın.", "time": "20 dk"}, {"title": "Çek", "body": "Soyulmuş börülceyi, soğanı, kapya biberi ve acı biberi 200 ml suyla birlikte pürüzsüz olana kadar blenderdan geçirin.", "time": "12 dk"}, {"title": "Harcı çırp", "body": "Yağı ve tuzu ekleyip 4 dakika çırpın. Harç kaşıktan kesintisiz akan, krep hamurundan biraz koyu bir kıvamda olmalı.", "time": "10 dk"}, {"title": "Kaplara doldur", "body": "Isıya dayanıklı küçük kapları yağlayın, her birine bir dilim haşlanmış yumurta koyup harcı kabın dörtte üçüne kadar doldurun. Üstte boşluk bırakmazsanız harç taşar.", "time": "8 dk"}, {"title": "Buharda pişir", "body": "Kapları buhar tenceresine dizip ağzını kapatın ve 45 dakika pişirin. Ortasına batırdığınız bıçak temiz çıktığında ve puding kaba dokunduğunuzda sıkı hissedildiğinde hazırdır.", "time": "45 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Börülceyi 2 saat ılık suda bekletip kabuğunu ovarak çıkarın. Buhar tenceresinin suyu bitmesin; pişme boyunca en az iki kez kontrol edip sıcak su ekleyin, kuruyan tencere kapları yakar."}], "tags": [], "facts": ["Porsiyon8 porsiyonluk", "Hazırlık + Pişirme 50 dk + 50 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "slug": "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "title": "Waakye | Gana Usulü Sorgum Yapraklı Pirinçli Fasulye", "image": "", "description": "Waakye Gana'nın sokak kahvaltısıdır ve rengini boya ya da baharattan değil, kurutulmuş sorgum yapraklarından alır. Yapraklar börülceyle birlikte kaynar, suya kırmızımsı kahve bir renk bırakır ve sonra çıkarılır. Pirinç o renkli suda pişer; bu yüzden waakye'nin rengi tanelerin içine işler, yüzeyde kalmaz.", "author": "Hüseyin Koç", "category": "Bakliyat", "servings": 6, "unit": "kişilik", "minutes": 90, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 0, "cost": 1, "ingredients": [{"name": "kuru börülce", "amount": 250, "unit": "g"}, {"name": "pirinç", "amount": 400, "unit": "g"}, {"name": "kurutulmuş sorgum yaprağı", "amount": 6, "unit": "adet"}, {"name": "su", "amount": 1500, "unit": "ml"}, {"name": "tuz", "amount": 10, "unit": "g"}], "steps": [{"title": "Börülceyi yaprakla kaynat", "body": "Islatma suyunu döküp börülceyi 1500 ml temiz su ve sorgum yapraklarıyla kaynatın, köpüğünü alıp 40 dakika pişirin. Su kırmızımsı kahverengiye döner ve tane parmakla ezilebilir hâle gelir.", "time": "45 dk"}, {"title": "Yaprakları çıkar", "body": "Yaprakları maşayla tek tek çıkarıp atın. Suyun seviyesini ölçün; pirinç için 800 mililitre kalmalı, eksikse sıcak su tamamlayın.", "time": "5 dk"}, {"title": "Pirinci ekle", "body": "Yıkanmış pirinci ve tuzu ekleyip kaynatın, sonra ateşi en kısığa alıp kapağı kapatın ve 20 dakika karıştırmadan pişirin. Kapağı açtığınızda su tamamen çekilmiş, yüzeyde küçük delikler oluşmuş olmalı.", "time": "25 dk"}, {"title": "Demlendir", "body": "Kapağı kapalı olarak 10 dakika dinlendirin, sonra çatalla alttan üste kabartarak servis edin.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Börülceyi 6–8 saat soğuk suda bekletip suyunu dökün. Sorgum yapraklarını pirinci eklemeden önce mutlaka çıkarın; tencerede kalan yaprak pişme sonunda acımsı bir tat bırakır."}], "tags": [], "facts": ["Porsiyon6 kişilik", "Hazırlık + Pişirme 20 dk + 70 dk", "ZorlukKolay"]}}, {"url": "https://dadagastro.com/tarif/enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "slug": "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "title": "Enfrijoladas | Meksika Usulü Fasulye Sosuna Batırılmış Tortilla", "image": "", "description": "Enfrijoladas, enchilada'nın fasulyeli kardeşidir: tortilla acı biber sosuna değil, ezilmiş siyah fasulye sosuna batırılır. Sos akışkan olmalı, yoğun bir ezme değil; tortillayı kaplayacak ama üzerinde durmayacak kıvamdadır. Batırılan tortilla hemen katlanır, beklerse yumuşayıp yırtılır.", "author": "Erhan Yıldırım", "category": "Bakliyat", "servings": 4, "unit": "kişilik", "minutes": 85, "difficulty": "Orta", "rating": 5, "ratingCount": 2, "views": 1, "cost": 2, "ingredients": [{"name": "kuru siyah fasulye", "amount": 150, "unit": "g"}, {"name": "kuru ancho biberi", "amount": 2, "unit": "adet"}, {"name": "kuru soğan", "amount": 120, "unit": "g"}, {"name": "sarımsak", "amount": 3, "unit": "diş"}, {"name": "ayçiçek yağı", "amount": 60, "unit": "ml"}, {"name": "su", "amount": 500, "unit": "ml"}, {"name": "kimyon", "amount": 3, "unit": "g"}, {"name": "tuz", "amount": 5, "unit": "g"}, {"name": "mısır tortillası", "amount": 8, "unit": "adet"}, {"name": "beyaz peynir", "amount": 100, "unit": "g"}, {"name": "taze kişniş", "amount": 0.5, "unit": "demet"}], "steps": [{"title": "Fasulyeyi kaynat", "body": "Islatma suyunu döküp fasulyeyi temiz suyla kaynatın ve en az 10 dakika fokur fokur kaynatın, köpüğünü alın.", "time": "15 dk"}, {"title": "Haşla", "body": "Ateşi kısıp 30 dakika, tane ezilebilene kadar pişirin. Süzün ama haşlama suyunu saklayın.", "time": "35 dk"}, {"title": "Sosu çek", "body": "Süzülmüş fasulyeyi, ıslatılmış ancho biberini, kavrulmuş soğan ve sarımsağı, kimyonu ve 300 ml haşlama suyunu blenderdan geçirin. Sos kaşıktan ağır ağır akmalı; koyu kalırsa haşlama suyundan ekleyin.", "time": "12 dk"}, {"title": "Sosu kavur", "body": "Yağı geniş bir tavada ısıtıp çekilmiş sosu dökün ve 8 dakika, koyulaşıp yağı yüzeye çıkana kadar karıştırarak pişirin. Tuzu bu aşamada ekleyin.", "time": "10 dk"}, {"title": "Tortillaları batır ve katla", "body": "Tortillaları tek tek sıcak sosa iki saniye batırıp çıkarın ve hemen üçgen katlayarak tabağa dizin. Üzerlerine kalan sosu gezdirin, ufalanmış beyaz peyniri ve kıyılmış kişnişi serpin.", "time": "12 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Siyah fasulyeyi bir gece ıslatıp suyunu dökün ve ilk kaynamayı en az 10 dakika fokur fokur yapın. Kuru ancho biberini ılık suda 20 dakika bekletip süzün; ıslatılmamış kuru biber blenderda pürüzlü kalır."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 20 dk + 65 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/frijoles-refritos-meksika-usulu-ezme-fasulye", "slug": "frijoles-refritos-meksika-usulu-ezme-fasulye", "title": "Frijoles Refritos | Meksika Usulü Ezme Fasulye", "image": "", "description": "Meksika mutfağının kahvaltı ve atıştırmalık sofralarının vazgeçilmezi frijoles refritos, haşlanmış kuru fasulyenin tereyağında kavrulup ezilmesiyle hazırlanır. Kremamsı dokusu ve dumanlı acı biber aromasıyla hem huevos rancheros'un yanında hem de tek başına atıştırmalık olarak servis edilir.", "author": "Aşkın Akay", "category": "Bakliyat", "servings": 4, "unit": "kişilik", "minutes": 40, "difficulty": "Orta", "rating": 5, "ratingCount": 1, "views": 93, "cost": 2, "ingredients": [{"name": "Kuru fasulye haşlanmış", "amount": 500, "unit": "g"}, {"name": "Tereyağı", "amount": 3, "unit": "yemek kaşığı"}, {"name": "Soğan ince doğranmış", "amount": 1, "unit": "adet"}, {"name": "Sarımsak", "amount": 2, "unit": "diş"}, {"name": "Kimyon", "amount": 1, "unit": "çay kaşığı"}, {"name": "dumanlı pul biber", "amount": 1, "unit": "tatlı kaşığı"}, {"name": "Tuz", "amount": 1, "unit": "çay kaşığı"}, {"name": "Kaşar peyniri rendelenmiş, üzerine", "amount": 0.5, "unit": "su bardağı"}, {"name": "Kişniş taze, kıyılmış", "amount": 2, "unit": "tutam"}], "steps": [{"title": "Soğanı kavurun", "body": "Tereyağını eritip ince doğranmış soğanı pembeleşene kadar kavurun, ezilmiş sarımsak ekleyip birkaç saniye daha kavurun.", "time": "8 dk"}, {"title": "Baharatları ekleyin", "body": "Kimyon ve dumanlı pul biberi ekleyip 30 saniye kavurduktan sonra haşlanmış fasulyeyi suyuyla birlikte tencereye aktarın.", "time": "5 dk"}, {"title": "Ezerek pişirin", "body": "Fasulyeyi kısık ateşte bir püre ezici ile ezerek kıvam alana kadar 15 dakika pişirin, kıvamı çok koyulaşırsa bir kaşık haşlama suyu ekleyin.", "time": "15 dk"}, {"title": "Servis edin", "body": "Tuzunu ayarlayıp üzerine rendelenmiş kaşar peyniri ve taze kişniş serpiştirerek sıcak servis edin.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Fasulyeyi ezerken ocağı çok kısık tutun, aksi halde dibi tutar. Alerjen: süt ve süt ürünleri içerir."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 10 dk + 30 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "slug": "semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta", "image": "", "description": "Semizotunun sapları ve yapraklarının ayrı sürelerde soğanla kavrulup üstüne yumurta kırıldığı yazlık bir tava kahvaltısıdır. Domates girmez; semizotunun hafif ekşimsi tadı yalnız soğanın tatlılığıyla dengelenir. Sap yapraktan geç yumuşadığı için önce girer, yaprak yalnız sönene kadar çevrilir.", "author": "Esra Yıldırım", "category": "Yumurta Tarifleri", "servings": 4, "unit": "kişilik", "minutes": 25, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 2, "cost": 1, "ingredients": [{"name": "semizotu (ayıklanmış)", "amount": 400, "unit": "g"}, {"name": "kuru soğan g (1 orta boy)", "amount": 110, "unit": "g"}, {"name": "zeytinyağı", "amount": 30, "unit": "ml"}, {"name": "tuz", "amount": 4, "unit": "g"}, {"name": "karabiber", "amount": 1, "unit": "g"}, {"name": "pul biber", "amount": 2, "unit": "g"}, {"name": "yumurta", "amount": 5, "unit": "adet"}], "steps": [{"title": "Semizotunu ayıkla", "body": "Kalın ve sertleşmiş sapları kesip atın. İnce sapları yapraklardan ayırıp 2 santimlik parçalara kesin, yaprakları bütün bırakın. İkisini ayrı kaplarda yıkayıp süzün.", "time": "8 dk"}, {"title": "Soğanı kavur", "body": "Geniş bir tavada zeytinyağını ısıtıp ince doğranmış soğanı orta ateşte yumuşayıp saydamlaşana kadar çevirin.", "time": "5 dk"}, {"title": "Önce sapları, sonra yaprakları çevir", "body": "Sapları ekleyip 3 dakika çevirin; parlak yeşile dönüp hafifçe yumuşamalılar. Yaprakları katıp yalnız sönene kadar, 2 dakika karıştırın ve tuzu, karabiberi, pul biberi serpin. Tavaya kapak kapatmayın; semizotunun saldığı su buharlaşmalıdır.", "time": "5 dk"}, {"title": "Yumurtaları kır", "body": "Tahta kaşıkla semizotunun içinde beş çukur açıp yumurtaları birer birer kırın. Kapağı kapatıp kısık ateşte 4–5 dakika, ak tamamen beyazlayana ve sarısı katılaşana kadar pişirin; sarısı akışkan kalsın isterseniz pastörize yumurta kullanın.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Semizotunun yapraklarını saplarla birlikte tavaya atmayın; sap yumuşayana kadar yaprak lapaya döner ve tavanın dibine su bırakır."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 10 dk + 15 dk", "ZorlukKolay"]}}, {"url": "https://dadagastro.com/tarif/masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki", "slug": "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki", "title": "Masabeeb | Suudi Arabistan Usulü Tam Buğday Unlu Kalın Tava Pankeki", "image": "", "description": "Masabeeb, Suudi Arabistan'ın orta bölgesinin ve Hicaz'ın kahvaltı pankekidir; yöreden yöreye marasee' ya da marahif diye de anılır. Tam buğday unlu, mayalı akışkan hamur kızgın tavaya kepçeyle dökülür ve yalnız tek yüzü pişirilir: alt yüz kızarırken üst yüz baştan sona küçük deliklerle dolar ve kurur. Sıcakken üstüne sade yağ ve bal gezdirilir, delikler ikisini de içine çeker.", "author": "Esma Çevik", "category": "Kahvaltılık", "servings": 4, "unit": "kişilik", "minutes": 45, "difficulty": "Kolay", "rating": 5, "ratingCount": 3, "views": 0, "cost": 1, "ingredients": [{"name": "tam buğday unu", "amount": 200, "unit": "g"}, {"name": "buğday unu", "amount": 100, "unit": "g"}, {"name": "instant kuru maya", "amount": 5, "unit": "g"}, {"name": "toz şeker", "amount": 10, "unit": "g"}, {"name": "tuz", "amount": 3, "unit": "g"}, {"name": "ılık su", "amount": 420, "unit": "ml"}, {"name": "ayçiçek yağı (tava için)", "amount": 5, "unit": "ml"}, {"name": "sade yağ", "amount": 40, "unit": "g"}, {"name": "bal", "amount": 80, "unit": "g"}], "steps": [{"title": "Hamuru çırp", "body": "İki unu, mayayı, şekeri ve tuzu geniş bir kapta karıştırın. Ilık suyu azar azar ekleyip çırpma teliyle topak kalmayana kadar çırpın; hamur kepçeden kalın bir şerit hâlinde akmalı. Üstünü kapatıp ılık bir yerde mayalanmaya bırakın.", "time": "5 dk"}, {"title": "Tavayı ısıt", "body": "Yapışmaz ya da döküm bir tavayı orta ateşte 3 dakika ısıtın ve yağa batırdığınız kâğıt havluyla yüzeyini ince bir tabaka hâlinde silin; tavada yağ birikintisi kalmamalı.", "time": "3 dk"}, {"title": "Tek yüzünü pişir", "body": "Mayalanan hamuru karıştırmadan, kepçeyle 45 ml alıp tavaya dökün; 11 cm'lik bir daire oluşur. Çevirmeden 2–3 dakika pişirin: üst yüz baştan sona deliklerle dolup mat ve kuru görününce, altı da altın rengine dönünce spatulayla alın. Tavaya ikişer ikişer dökerek 16 masabeeb pişirin; tava fazla ısınırsa ateşi kısın, yoksa alt yüz üst yüz kurumadan yanar.", "time": "28 dk"}, {"title": "Servis et", "body": "Masabeebleri delikli yüzleri üstte kalacak şekilde tabağa dizin. Sade yağı eritip üstlerine gezdirin, ardından balı dökün ve sıcak servis edin.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Hamur pişirilmeden önce ılık bir yerde 45 dakika, yüzeyi baştan sona kabarcıkla kaplanıp hacmi iki katına çıkana kadar bekler; kabarmamış hamur tavada delik açmaz ve masabeeb hamur gibi yoğun kalır."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 15 dk + 30 dk", "ZorlukKolay"]}}, {"url": "https://dadagastro.com/tarif/irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor", "slug": "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor", "title": "İrimşik | Kazak Usulü Kızarana Kadar Pişen Tatlımsı Kurutulmuş Lor", "image": "", "description": "İrimşik, Kazak bozkırının kışa saklanan süt yiyeceğidir: süt ekşimiş ayranla kesilir ama peynir suyu dökülmez, lorla birlikte saatlerce kaynatılarak buharlaştırılır. Suyun içindeki süt şekeri lorda kalır ve uzun pişirmede karamelleşir; irimşiği tatlımsı ve kahverengi yapan budur. Kurutulan parçalar çayın yanında çerez gibi yenir.", "author": "İrem Akgül", "category": "Kahvaltılık", "servings": 15, "unit": "porsiyon", "minutes": 215, "difficulty": "Orta", "rating": 5, "ratingCount": 2, "views": 0, "cost": 1, "ingredients": [{"name": "tam yağlı inek sütü", "amount": 3, "unit": "l"}, {"name": "ekşimiş tuzsuz ayran", "amount": 500, "unit": "ml"}, {"name": "limon suyu (süt kesilmezse)", "amount": 2, "unit": "yemek kaşığı"}, {"name": "tereyağı (tepsi için)", "amount": 10, "unit": "g"}], "steps": [{"title": "Sütü ısıt", "body": "Sütü kalın dipli, geniş bir tencerede orta ateşte, dibi tutmasın diye ara ara karıştırarak ısıtın. Yüzey titreyip kenarlarda ilk kabarcıklar belirdiğinde, taşmadan hemen önce ateşi kısın.", "time": "15 dk"}, {"title": "Sütü kes", "body": "Ekşimiş ayranı ince bir akıntıyla dökerken kaşıkla yavaşça karıştırın. 2–3 dakika içinde süt beyaz lor topaklarına ve sarı-yeşil, berrak bir peynir suyuna ayrılmalıdır; ayrılmıyorsa limon suyunu ekleyin.", "time": "5 dk"}, {"title": "Suyu buharlaştır", "body": "Peynir suyunu dökmeden, kısık ateşte ve kapaksız pişirmeye devam edin. İlk iki saat 10 dakikada bir, su azaldıkça daha sık karıştırın; lor önce krem rengine, sonra açık kahveye döner ve tencereden kopan koyu, yapışkan bir kütle olur. Son yarım saatte kaşığı elinizden bırakmayın.", "time": "170 dk"}, {"title": "Ufala", "body": "Ilıyan kütleyi elinizle 1–2 cm'lik parçalara koparın ya da ceviz büyüklüğünde toplar yapın. Parçalar ele yapışmayacak kadar kuru, içleri hafif nemli olmalı.", "time": "15 dk"}, {"title": "Kurumaya ser", "body": "Parçaları tereyağı sürülmüş bir tepsiye ya da temiz bir beze tek kat hâlinde ve birbirine değmeden yayın. Üzerini tülle örtüp havadar ve gölge bir yere koyun.", "time": "5 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Son yarım saatte tencerenin başından ayrılmayın; peynir suyu bitip şeker karamelleşmeye başladığında lor bir dakikada kahverengiden yanığa geçer. Parçalar gölgede 2–3 gün, kırıldığında içi nemsiz görünene kadar kurutulur.\nAlerjen: Malzeme listesine göre süt ve süt ürünleri içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."}], "tags": [], "facts": ["Porsiyon15 porsiyon", "Hazırlık + Pişirme 10 dk + 205 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/mamounia-halep-usulu-tereyagli-irmik-kahvaltisi", "slug": "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi", "title": "Mamounia | Halep Usulü Tereyağlı İrmik Kahvaltısı", "image": "", "description": "Halep'te kış sabahlarında sıcak yenen bir irmik tabağı; tatlı olmasına rağmen kahvaltıdır ve yanında taze beyaz peynirle gelir. Sırrı irmiğin tereyağında gerçekten kavrulmasında: on iki dakika sonra irmik altın rengine döner ve fındıksı kokar, işte bu koku tabağın tamamıdır. Şurup sıcak irmiğe sıcak dökülür; soğuk şurup irmiği topaklar.", "author": "Barlas Egeli", "category": "Kahvaltılık", "servings": 4, "unit": "kişilik", "minutes": 40, "difficulty": "Kolay", "rating": 5, "ratingCount": 2, "views": 0, "cost": 1, "ingredients": [{"name": "iri irmik", "amount": 200, "unit": "g"}, {"name": "tereyağı", "amount": 90, "unit": "g"}, {"name": "su", "amount": 500, "unit": "ml"}, {"name": "toz şeker", "amount": 120, "unit": "g"}, {"name": "limon suyu", "amount": 5, "unit": "ml"}, {"name": "taze beyaz peynir", "amount": 150, "unit": "g"}, {"name": "tarçın", "amount": 3, "unit": "g"}, {"name": "antep fıstığı", "amount": 20, "unit": "g"}], "steps": [{"title": "Şurubu kaynat", "body": "Suyu, toz şekeri ve limon suyunu bir tencerede kaynatın ve şeker tamamen eriyene kadar karıştırın, sonra 3 dakika daha kaynatın. Limon suyu şekerin kristalleşmesini önler. Şurubu ocakta sıcak tutun, soğutmayın.", "time": "8 dk"}, {"title": "İrmiği tereyağında kavur", "body": "Geniş ve kalın tabanlı bir tencerede tereyağını eritin ve irmiği ekleyip orta-kısık ateşte sürekli karıştırarak kavurun. İrmik önce yağı içine çekecek, sonra rengi kum sarısından altın kahveye dönecek ve belirgin bir fındık kokusu çıkacak. Bu on iki dakika kısaltılamaz; kavrulmamış irmik hamur tadında kalır.", "time": "12 dk"}, {"title": "Şurubu dök", "body": "Tencereyi ocaktan alın ve sıcak şurubu, yüzünüzü uzak tutarak irmiğin üzerine dökün; karışım şiddetle fokurdayacak. Hemen tahta kaşıkla karıştırın, irmik şurubu anında içine çekip koyulaşacak. Tencereyi ocağa geri koyun.", "time": "5 dk"}, {"title": "Suyunu çektir", "body": "En kısık ateşte, arada dibini sıyırarak pişirin. Karışım kaşığın arkasını kaplayan, kaşıkla ortadan ayrıldığında yolu bir an açık kalan bir lapa kıvamına gelmeli. Ocaktan alıp kapağı kapalı 10 dakika dinlendirin, bu sürede biraz daha koyulaşacak.", "time": "10 dk"}, {"title": "Peynir ve tarçınla servis et", "body": "Sıcak mamounia'yı kâselere paylaştırın, üzerine elle ufalanmış taze beyaz peyniri ve tarçını serpin, kabaca dövülmüş antep fıstığını gezdirin. Sıcak servis edin; soğuyan mamounia sertleşir ve peynirle arasındaki tuzlu-tatlı zıtlık kaybolur.", "time": "4 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Şurubu irmiğin üzerine dökerken tencereyi ocaktan alın ve yüzünüzü uzak tutun; sıcak irmik sıcak şurupla buluştuğunda şiddetle fokurdayıp sıçrar."}], "tags": [], "facts": ["Porsiyon4 kişilik", "Hazırlık + Pişirme 10 dk + 30 dk", "ZorlukKolay"]}}, {"url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "slug": "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta", "image": "", "description": "Kiev pastası, 1950'lerde Kiev'deki bir şekerleme fabrikasında doğup şehrin simgesi olmuş bir beze pastasıdır: iki kat fındıklı bezenin arasına pişmiş sütlü şerbetle çırpılan tereyağı kreması sürülür. Beze dışta çıtır, içte hafif çiğnenir; krema tereyağı olduğu hâlde ağır değildir, çünkü şerbet onu havalandırır. Fırın süresi uzun, işçiliği azdır.", "author": "İlker Bozkurt", "category": "Kek ve Pasta", "servings": 12, "unit": "dilim", "minutes": 200, "difficulty": "Zor", "rating": 5, "ratingCount": 1, "views": 0, "cost": 3, "ingredients": [{"name": "yumurta akı (oda sıcaklığında)", "amount": 6, "unit": "adet"}, {"name": "toz şeker", "amount": 250, "unit": "g"}, {"name": "fındık", "amount": 150, "unit": "g"}, {"name": "un", "amount": 30, "unit": "g"}, {"name": "vanilin", "amount": 1, "unit": "paket"}, {"name": "tereyağı (oda sıcaklığında)", "amount": 250, "unit": "g"}, {"name": "süt", "amount": 120, "unit": "ml"}, {"name": "yumurta", "amount": 1, "unit": "adet"}, {"name": "toz şeker", "amount": 200, "unit": "g"}, {"name": "kakao", "amount": 1, "unit": "yemek kaşığı"}, {"name": "vanilin", "amount": 1, "unit": "paket"}, {"name": "fındık (kenar için)", "amount": 40, "unit": "g"}, {"name": "pudra şekeri", "amount": 1, "unit": "yemek kaşığı"}], "steps": [{"title": "Fındığı kavur", "body": "Fındığı 160 °C fırında 10 dakika, zarı çatlayıp içi açık kahveye dönene kadar kavurun. Sıcakken bir havluya alıp ovarak zarlarını ayırın; 150 g'ını robotta iri, kenar için ayırdığınız 40 g'ı bıçakla daha iri kırın.", "time": "12 dk"}, {"title": "Bezeyi çırp", "body": "Yağsız, kuru bir kapta yumurta aklarını orta hızda yumuşak tepe verene kadar çırpın. Şekeri birer yemek kaşığı ekleyerek yüksek hızda 8–10 dakika, beze parlayıp çırpıcıdan sarkmayan sert bir tepe verene kadar çırpmaya devam edin; parmaklar arasında şeker tanesi hissedilmemeli.", "time": "15 dk"}, {"title": "Fındığı katla", "body": "İri çekilmiş fındığı, unu ve vanilini karıştırıp bezeye üç seferde, spatulayla alttan üste katlayarak ekleyin. Karıştırmayın, katlayın; sönen beze fırında yayılır.", "time": "5 dk"}, {"title": "Diskleri şekillendir", "body": "Yağlı kâğıda iki adet 22 cm'lik daire çizip kâğıdı ters çevirin. Bezeyi iki daireye eşit bölüp spatulayla 1,5 cm kalınlıkta düzleyin.", "time": "5 dk"}, {"title": "Bezeyi kurut", "body": "Bu tarifte fırın 150 °C'dir: bezenin rengi kararmadan içinin kuruması gerekir, daha yüksek ısıda şeker karamelleşir ve beze kahverengileşir. Diskleri 150 °C'de 2 saat pişirin; yüzey krem rengini almalı ve parmakla vurunca boş ses vermeli. Kâğıttan sıcakken ayırmaya çalışmayın.", "time": "120 dk"}, {"title": "Kremayı yap", "body": "Sütü, yumurtayı ve şekeri küçük bir tencerede çırpın ve kısık ateşte sürekli karıştırarak 7–8 dakika, karışım koyulaşıp kaşığın arkasını kaplayana kadar (82–84 °C) pişirin; kaynatmayın, yumurta topaklanır. Tamamen soğuyan şerbeti, 5 dakika çırpılıp beyazlaşmış tereyağına kaşık kaşık ekleyerek pürüzsüz ve parlak bir krema elde edin. Kremanın dörtte birini ayırıp kakaoyla ve vanilinle karıştırın.", "time": "18 dk"}, {"title": "Pastayı kur", "body": "Bezelerin kâğıdını ters çevirip nazikçe soyun, kenarlarını tırtıklı bıçakla düzeltin ve kırıntıları saklayın. Birinci bezenin üstüne beyaz kremanın yarısını sürüp ikinci bezeyi kapatın, kalan beyaz kremayı yüzeye ve kenarlara ince sürün. Kenarlara kırılmış fındığı ve beze kırıntılarını yapıştırın, üstü kakaolu kremayla sıkma torbasından süsleyip pudra şekeri serpin.", "time": "20 dk"}, {"title": "Dilimle", "body": "Dinlenen pastayı sıcak suya batırılıp kurulanmış tırtıklı bıçakla, testere hareketiyle kesin. Bastırarak kesilen beze çatlar.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Bezeyi fırının kapağını aralayıp içinde 1 saat soğutun, sıcak beze dışarıda çatlar; kremalanan pasta buzdolabında en az 3 saat dinlenmeden kesilmez, katlar kayar."}], "tags": [], "facts": ["Porsiyon12 dilim", "Hazırlık + Pişirme 70 dk + 130 dk", "ZorlukZor", "Pişirme Derecesi150°C fırın"]}}, {"url": "https://dadagastro.com/tarif/tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "slug": "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "title": "Tamriyeh | Şam Usulü İrmik Kremalı Hurmalı Kızartma", "image": "", "description": "Ramazan akşamlarında Şam'ın Hamidiye Çarşısı'nda tezgâh üstünde yapılıp satılan bir tatlı: kâğıt inceliğinde açılmış hamurun içine soğutulmuş irmik kreması konur, kare katlanıp kızartılır ve pudra şekerine bulanır. Sıcakken kesildiğinde içindeki krema akar. Kremanın tamamen soğumuş olması şart — ılık krema hamurdan sızar ve yağa dökülür.", "author": "Ece Ekici", "category": "Tatlı", "servings": 10, "unit": "adet", "minutes": 70, "difficulty": "Orta", "rating": 5, "ratingCount": 2, "views": 1, "cost": 1, "ingredients": [{"name": "buğday unu", "amount": 250, "unit": "g"}, {"name": "su", "amount": 150, "unit": "ml"}, {"name": "tuz", "amount": 4, "unit": "g"}, {"name": "zeytinyağı", "amount": 20, "unit": "ml"}, {"name": "ince irmik", "amount": 80, "unit": "g"}, {"name": "süt", "amount": 400, "unit": "ml"}, {"name": "toz şeker", "amount": 60, "unit": "g"}, {"name": "gül suyu", "amount": 10, "unit": "ml"}, {"name": "ayçiçek yağı (kızartmak için)", "amount": 600, "unit": "ml"}, {"name": "pudra şekeri", "amount": 40, "unit": "g"}], "steps": [{"title": "Hamuru yoğur", "body": "Unu ve tuzu bir kaba alıp suyu azar azar ekleyerek toparlayın, zeytinyağını katıp pürüzsüz ve esnek olana kadar 8 dakika yoğurun. Hamur kulak memesi yumuşaklığında olmalı; sertse 10 ml daha su ekleyin. Yağlı bir bezle örtüp dinlendirin.", "time": "10 dk"}, {"title": "İrmik kremasını pişir", "body": "Sütü, toz şekeri ve irmiği soğuk hâldeyken tencerede çırpın, sonra orta ateşte sürekli karıştırarak kaynatın. Karışım kaşığın arkasını kaplayıp koyu bir muhallebi kıvamına gelene kadar 6–7 dakika pişirin. Ocaktan alıp gül suyunu katın ve geniş bir kaba yayarak soğumaya bırakın.", "time": "12 dk"}, {"title": "Hamuru kâğıt inceliğinde aç", "body": "Hamuru 10 eşit bezeye bölün. Her bezeyi unlanmış tezgâhta merdaneyle, altındaki yazıyı seçebileceğiniz incelikte 15 cm'lik kareler hâlinde açın. Açtıklarınızın arasına un serpip üst üste koyun, yapışmasınlar.", "time": "15 dk"}, {"title": "Kremayı koy ve kare katla", "body": "Her karenin ortasına bir yemek kaşığı soğumuş krema koyun ve önce iki karşılıklı kenarı, sonra diğer ikisini içe katlayarak zarf yapın. Birleşme yerlerini parmakla bastırıp kapatın; açık kalan tek nokta kremanın tamamının yağa akması demektir. Katlanan yüzü aşağı gelecek şekilde dizin.", "time": "12 dk"}, {"title": "180 °C yağda kızart", "body": "Yağı 180 °C'ye ısıtın; bir hamur kırpığı attığınızda 3 saniyede kabararak yüzmeli. Tamriyeleri katlama yüzü aşağı gelecek şekilde, ikişer üçer yağa alın ve her yüzünü 60–90 saniye, altın rengi ve kabarcıklı olana kadar kızartın. Delikli kepçeyle alıp ızgara teline koyun.", "time": "14 dk"}, {"title": "Pudra şekerine bula", "body": "Hafifçe ılıdıklarında üzerlerine bol pudra şekeri eleyin ya da bir tabakta çevirerek bulayın. Sıcakken pudra şekeri erir, tamamen soğursa yapışmaz; doğru an elinizi yakmayacak kadar ılık olduklarıdır. Hemen servis edin, içi akışkan tamriyeh dakikalar içinde sıkılaşır.", "time": "3 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Hamuru yoğurduktan sonra 1 saat dinlendirin ve irmik kremasını en az 2 saat buzdolabında soğutun. İki bekleme de kısaltılamaz: dinlenmemiş hamur ince açılmaz, soğumamış krema kızartmada dışarı akar."}], "tags": [], "facts": ["Porsiyon10 adet", "Hazırlık + Pişirme 30 dk + 40 dk", "ZorlukOrta"]}}, {"url": "https://dadagastro.com/tarif/tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi", "slug": "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi", "title": "Tepsi Kadayıfı | Cevizli Tel Kadayıflı Şerbetli Fırın Tatlısı", "image": "", "description": "Tepsi kadayıfı, tel kadayıfın tepsiye iki kat serilip arasına ceviz konarak fırınlandığı tatlıdır. Tek tek sarılan kadayıf dolmasından farkı, bütün tepsinin tek parça pişip sonradan dilimlenmesidir; bu yüzden alt kat üstteki kadar kızarmaz ve bastırma adımı kritik hâle gelir. Kadayıfı tepsiye koymadan önce her teline yağ değdirmek şarttır.", "author": "Ahmet Örge", "category": "Tatlı", "servings": 20, "unit": "dilim", "minutes": 90, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 0, "cost": 2, "ingredients": [{"name": "tel kadayıf", "amount": 500, "unit": "g"}, {"name": "iri dövülmüş ceviz içi", "amount": 250, "unit": "g"}, {"name": "tereyağı", "amount": 250, "unit": "g"}, {"name": "toz şeker", "amount": 650, "unit": "g"}, {"name": "su", "amount": 550, "unit": "ml"}, {"name": "limon suyu", "amount": 5, "unit": "ml"}], "steps": [{"title": "Şerbeti kur ve soğut", "body": "Şeker ve suyu kaynatıp 12 dakika kısık ateşte tutun, ocaktan almadan limon suyunu ekleyin. Şerbeti geniş bir kaba boşaltıp tamamen soğutun.", "time": "15 dk"}, {"title": "Kadayıfı yağla ve ovala", "body": "Kadayıfı geniş bir tepsiye boşaltıp topaklarını parmak uçlarıyla açın ve makasla bir santimlik parçalara kesin. Tereyağını eritip 3 dakika bekletin, berrak kısmını kadayıfın üzerine gezdirin ve avuçlarınızla ovarak her tele yağ değdirin. Bir tutamı sıkıp bıraktığınızda dağılmadan duruyorsa yağ yeterlidir.", "time": "12 dk"}, {"title": "Katla ve cevizle", "body": "Yağlanmış tepsinin dibine kadayıfın yarısını eşit kalınlıkta serin. Cevizi kenarlardan bir parmak içeride kalacak şekilde yayın; kenara gelen ceviz fırında kararır. Kalan kadayıfı üste serip yüzeyi düzleyin.", "time": "10 dk"}, {"title": "Bastır", "body": "Tepsinin tamamını avuç içiyle, özellikle kenarlardan bastırarak sıkıştırın; iki kat tek parça hâline gelmeli. Bastırılmayan kadayıfta alt kat fırın tabanına tam oturmaz ve o kısım açık renkte, çiğ dokuda kalır. Tepsiyi sallayın, kadayıf tek parça olarak hareket etmeli.", "time": "5 dk"}, {"title": "Fırınla ve şerbetle", "body": "Önceden 180 °C'ye ısıtılmış fırının alt rafında 30 dakika, orta rafta 15 dakika pişirin. Bir spatulayla kenardan kaldırıp alt yüzeye bakın: üst yüzeyle aynı altın renginde olmalı. Fırından çıkar çıkmaz soğumuş şerbeti kepçeyle kenarlardan ortaya doğru gezdirin ve cızırtı kesilene kadar bekleyin.", "time": "45 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Şerbet soğuk, tepsi fırından yeni çıkmış olmalı. Tepsi kadayıfında alt kat şerbeti son çeker; tepsiyi şerbetledikten sonra 15 dakika beklemeden kesmeyin."}], "tags": [], "facts": ["Porsiyon20 dilim", "Hazırlık + Pişirme 45 dk + 45 dk", "ZorlukKolay", "Pişirme Derecesi180°C fırın"]}}, {"url": "https://dadagastro.com/tarif/muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi", "slug": "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi", "title": "Muska Tatlısı | Üçgen Katlanmış Cevizli Şerbetli Yufka Tatlısı", "image": "", "description": "Muska tatlısı, yufka şeritlerinin ceviz konarak üçgen muska biçiminde katlandığı ve kızartıldıktan sonra şerbetlendiği tatlıdır. Aynı adı taşıyan peynirli börekle katlama tekniği aynıdır, dolgusu ve sonrası farklıdır. Katlarken her çevirmede şeridin açısını korumak gerekir; açı kayarsa muska üçgen değil yamuk çıkar ve uçları yağda açılır.", "author": "Ece Örge", "category": "Tatlı", "servings": 24, "unit": "adet", "minutes": 65, "difficulty": "Kolay", "rating": 5, "ratingCount": 1, "views": 0, "cost": 2, "ingredients": [{"name": "yufka", "amount": 400, "unit": "g"}, {"name": "iri dövülmüş ceviz içi", "amount": 250, "unit": "g"}, {"name": "toz şeker (iç için)", "amount": 40, "unit": "g"}, {"name": "toz tarçın", "amount": 3, "unit": "g"}, {"name": "ayçiçek yağı (kızartmak için)", "amount": 500, "unit": "ml"}, {"name": "toz şeker", "amount": 600, "unit": "g"}, {"name": "su", "amount": 550, "unit": "ml"}, {"name": "limon suyu", "amount": 5, "unit": "ml"}], "steps": [{"title": "Şerbeti kur ve soğut", "body": "Şeker ve suyu kaynatıp 12 dakika kısık ateşte tutun, ocaktan almadan limon suyunu ekleyin. Şerbeti geniş bir kaba boşaltıp tamamen soğutun.", "time": "15 dk"}, {"title": "Cevizi hazırla", "body": "Cevizi bıçakla iri dövüp şeker ve tarçınla karıştırın. Toz hâline getirmeyin; iri parçalar kızartma sırasında yerinde durur, toz ceviz şeritten sızar.", "time": "5 dk"}, {"title": "Şeritle, doldur, katla", "body": "Yufkaları 8 santim eninde uzun şeritler hâlinde kesin ve üzerlerini nemli bezle örtün. Bir şeridin alt ucuna bir tatlı kaşığı ceviz koyup şeridin köşesini çapraz katlayarak üçgen yapın, sonra üçgeni kendi üzerine, şerit bitene kadar çevirerek katlamaya devam edin. Her çevirmede kenarın şeridin kenarına paralel indiğinden emin olun; açı kayarsa muska kapanmaz. Uç kısmı suyla nemlendirip bastırın.", "time": "25 dk"}, {"title": "Kızart ve şerbetle", "body": "Yağı 170 °C'ye getirin; atılan küçük bir yufka parçası 3 saniyede yüzeye çıkıyorsa sıcaklık doğrudur. Muskaları birleşim yerleri alta gelecek şekilde atıp iki yüzü de açık altın rengi olana kadar çevirerek kızartın. Kâğıt havluda fazla yağını aldıktan sonra sıcakken soğuk şerbete 1 dakika daldırıp süzgece alın.", "time": "20 dk"}], "reviews": [], "web": {"notes": [{"title": "Hatırlatma", "body": "Yufka şeritleri kesildikten sonra üzerini nemli bezle örtün. Açıkta bekleyen yufka kurur, katlarken çatlar ve kızartma sırasında ceviz dışarı dökülür."}], "tags": [], "facts": ["Porsiyon24 adet", "Hazırlık + Pişirme 40 dk + 25 dk", "ZorlukKolay"]}}], "day": ["https://dadagastro.com/tarif/sardalya-izgara-limon-kekikli"], "daySlug": "sardalya-izgara-limon-kekikli"};
const WEB = {"hero": "https://dadagastro.com/varliklar/storage/pagedef/anasayfa/hero/5JfoMeFbRNs8MvkEIzIbY3rOtln0ZIp0WFQpJzBa.webp", "description": "Evdeki malzemeyi yaz, sana ne pişirebileceğini söyleyelim. Binlerce denenmiş, puanlanmış, yorumlanmış tarif arasından seç.", "stats": [{"value": "6.112+", "label": "Denenmiş tarif"}, {"value": "2.163+", "label": "Püf noktası"}, {"value": "1.055", "label": "Topluluk üyesi"}, {"value": "8.160", "label": "Üye yorumu"}], "categories": [{"name": "Atıştırmalık", "count": "245 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Bakliyat", "count": "210 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1515543904379-3d757afe72e4.avif"}, {"name": "Balık ve Deniz Ürünleri", "count": "260 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1559737558-2f5a35f4523b.avif"}, {"name": "Bebek Tarifleri", "count": "196 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1604909052743-94e838986d24.avif"}, {"name": "Çocuk Tarifleri", "count": "197 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1474979266404-7eaacbcd87c5.avif"}, {"name": "Çorba", "count": "271 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1547592180-85f173990554.avif"}, {"name": "Dolma ve Sarma", "count": "195 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Dondurma ve Soğuk Tatlılar", "count": "197 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565958011703-44f9829ba187.avif"}, {"name": "Ekmek", "count": "198 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "Hamur İşi", "count": "248 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "İçecek", "count": "208 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1544145945-f90425340c7e.avif"}, {"name": "Kahvaltılık", "count": "245 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1533089860892-a7c6f0a88666.avif"}, {"name": "Kek ve Pasta", "count": "203 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1455619452474-d2be8b1e70cd.avif"}, {"name": "Kırmızı Et", "count": "299 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Köfte ve Kebap", "count": "228 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Kurabiye", "count": "194 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1509440159596-0249088772ff.avif"}, {"name": "Makarna", "count": "185 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1473093295043-cdd812d0e601.avif"}, {"name": "Mantı ve Dolgulu Hamurlar", "count": "196 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1563245372-f21724e3856d.avif"}, {"name": "Meyve Tarifleri", "count": "208 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1540420773420-3366772f4999.avif"}, {"name": "Meze", "count": "254 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Pilav", "count": "232 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1516684732162-798a0062be99.avif"}, {"name": "Pizza ve Pide", "count": "190 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565299624946-b28f40a0ae38.avif"}, {"name": "Reçel", "count": "189 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1515543904379-3d757afe72e4.avif"}, {"name": "Sakatat", "count": "201 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1432139555190-58524dae6a55.avif"}, {"name": "Salata", "count": "194 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1540420773420-3366772f4999.avif"}, {"name": "Sandviç, Burger ve Dürüm", "count": "191 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1541529086526-db283c563270.avif"}, {"name": "Sebze", "count": "345 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1476718406336-bb5a9690ee2a.avif"}, {"name": "Sos", "count": "207 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Tatlı", "count": "285 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1565958011703-44f9829ba187.avif"}, {"name": "Tavuk ve Hindi", "count": "237 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1604909052743-94e838986d24.avif"}, {"name": "Turşu ve Konserve", "count": "203 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Yumurta Tarifleri", "count": "199 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1533089860892-a7c6f0a88666.avif"}, {"name": "Zeytinyağlılar", "count": "200 tarif", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1505253716362-afaea1d3d1af.avif"}, {"name": "Ana Yemek", "count": "0 tarif", "image": ""}], "lessons": [{"title": "Temel Pişirme Yöntemleri", "info": "5 bölüm", "url": "/mutfaga-giris/temel-pisirme-yontemleri"}, {"title": "Isı ve Süre Kontrolü", "info": "5 bölüm", "url": "/mutfaga-giris/isi-ve-sure-kontrolu"}, {"title": "Tencerede Pişirme Teknikleri", "info": "5 bölüm", "url": "/mutfaga-giris/tencerede-pisirme-teknikleri"}, {"title": "Haşlama: Sudan Fazlası", "info": "8 bölüm", "url": "/mutfaga-giris/haslama-sudan-fazlasi"}, {"title": "Tavada Pişirme Teknikleri", "info": "4 bölüm", "url": "/mutfaga-giris/tavada-pisirme-teknikleri"}, {"title": "Fırında Pişirme Teknikleri", "info": "4 bölüm", "url": "/mutfaga-giris/firinda-pisirme-teknikleri"}], "tips": [{"title": "Çilek Bozulduğu (Küflendiği) Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/7732.webp", "reads": "284 okunma", "url": "/puf-noktalari/cilek-bozuldugu-kuflendigi-nasil-anlasilir"}, {"title": "Yumurta Bozuk mu Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/2905.webp", "reads": "171 okunma", "url": "/puf-noktalari/yumurta-bozuk-mu-nasil-anlasilir"}, {"title": "Ayran Bozulduğu Nasıl Anlaşılır?", "image": "https://dadagastro.com/varliklar/media/7658.webp", "reads": "138 okunma", "url": "/puf-noktalari/ayran-bozuldugu-nasil-anlasilir"}, {"title": "Karides, Midye ve Diğer Kabuklu Deniz Ürünleri Nasıl Saklanır?", "image": "https://dadagastro.com/varliklar/media/6029.webp", "reads": "130 okunma", "url": "/puf-noktalari/karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir"}, {"title": "Mozzarella Peynir Kaç Derecede Erir (Pizza İçin)?", "image": "https://dadagastro.com/varliklar/media/6151.webp", "reads": "126 okunma", "url": "/puf-noktalari/mozzarella-peynir-kac-derecede-erir-pizza"}, {"title": "Bir Dilim Çavdar Ekmeği Kaç Kalori?", "image": "https://dadagastro.com/varliklar/media/7682.webp", "reads": "125 okunma", "url": "/puf-noktalari/bir-dilim-cavdar-ekmegi-kac-kalori"}], "videos": [{"title": "Tam Kıvamında Karnıyarık — Şefin Bütün Sırlarıyla", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1556910103-1c02745aae4d.avif", "time": "12:48", "views": "1,2 Mn"}, {"title": "Soğan Doğrarken Ağlamamanın Yolu", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1518977956812-cd3dbadaaf31.avif", "time": "00:31", "views": "524 B"}, {"title": "Meal Prep: 1 Saatte Haftalık Sebze Hazırlığı", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1466978913421-dad2ebd01d17.avif", "time": "00:38", "views": "412 B"}, {"title": "Gaziantep Baklavası — Ustadan İzle", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1519996529931-28324d5a630e.avif", "time": "18:08", "views": "356 B"}, {"title": "Pratik Kahvaltı Tabağı — 5 Dakika", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1525351484163-7529414344d8.avif", "time": "00:42", "views": "341 B"}, {"title": "Bıçak Tutuşu ve Julyen Doğrama", "image": "https://dadagastro.com/varliklar/_dis/images.unsplash.com/photo-1466978913421-dad2ebd01d17.avif", "time": "11:05", "views": "312 B"}], "chefs": [{"name": "Şahnur Ilıcalı", "count": "171 tarif"}, {"name": "Göktürk Dizdar", "count": "171 tarif"}, {"name": "Şahnur Sezek", "count": "171 tarif"}, {"name": "Canan Yücel", "count": "140 tarif"}, {"name": "Emel Aksu", "count": "137 tarif"}, {"name": "Ece Özdenak", "count": "97 tarif"}], "sections": [{"class": "hero-v ss-mode px-band", "title": ""}, {"class": "catstrip", "title": "Kategoriler & Dünya Mutfakları"}, {"class": "findbar-sec", "title": ""}, {"class": "sec feat-sec", "title": "Bu hafta öne çıkanlar"}, {"class": "sec guide px-band", "title": "Mutfağa Giriş & Püf Noktaları"}, {"class": "proband-sec", "title": ""}, {"class": "sec vids-sec", "title": "En lezzetli videolar"}, {"class": "dayband px-band", "title": ""}, {"class": "sec chefs", "title": "Tarifin ustaları"}, {"class": "appband px-band", "title": ""}, {"class": "sec community", "title": "Senin de bir tarifin var"}]};
const PARITY = {
  "list": {
    "groups": [
      {
        "key": "kategori",
        "label": "Kategori",
        "options": [
          {
            "name": "kategori[]",
            "value": "atistirmalik",
            "label": "Atıştırmalık 245",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "bakliyat",
            "label": "Bakliyat 210",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "balik-ve-deniz-urunleri",
            "label": "Balık ve Deniz Ürünleri 260",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "bebek-tarifleri",
            "label": "Bebek Tarifleri 196",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "cocuk-tarifleri",
            "label": "Çocuk Tarifleri 197",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "corba",
            "label": "Çorba 271",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "dolma-ve-sarma",
            "label": "Dolma ve Sarma 195",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "dondurma-ve-soguk-tatlilar",
            "label": "Dondurma ve Soğuk Tatlılar 197",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "ekmek",
            "label": "Ekmek 198",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "hamur-isi",
            "label": "Hamur İşi 248",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "icecek",
            "label": "İçecek 208",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "kahvaltilik",
            "label": "Kahvaltılık 245",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "kek-ve-pasta",
            "label": "Kek ve Pasta 203",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "kirmizi-et",
            "label": "Kırmızı Et 299",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "kofte-ve-kebap",
            "label": "Köfte ve Kebap 228",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "kurabiye",
            "label": "Kurabiye 194",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "makarna",
            "label": "Makarna 185",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "manti-ve-dolgulu-hamurlar",
            "label": "Mantı ve Dolgulu Hamurlar 196",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "meyve-tarifleri",
            "label": "Meyve Tarifleri 208",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "meze",
            "label": "Meze 254",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "pilav",
            "label": "Pilav 232",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "pizza-ve-pide",
            "label": "Pizza ve Pide 190",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "recel",
            "label": "Reçel 189",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "sakatat",
            "label": "Sakatat 201",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "salata",
            "label": "Salata 194",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "sandvic-burger-ve-durum",
            "label": "Sandviç, Burger ve Dürüm 191",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "sebze",
            "label": "Sebze 345",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "sos",
            "label": "Sos 207",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "tatli",
            "label": "Tatlı 285",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "tavuk-ve-hindi",
            "label": "Tavuk ve Hindi 237",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "tursu-ve-konserve",
            "label": "Turşu ve Konserve 203",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "yumurta-tarifleri",
            "label": "Yumurta Tarifleri 199",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "zeytinyaglilar",
            "label": "Zeytinyağlılar 200",
            "disabled": false
          },
          {
            "name": "kategori[]",
            "value": "ana-yemek",
            "label": "Ana Yemek 0",
            "disabled": false
          }
        ]
      },
      {
        "key": "mutfak",
        "label": "Mutfak",
        "options": [
          {
            "name": "mutfak[]",
            "value": "turk-mutfagi",
            "label": "Türk Mutfağı 2.803",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "italyan-mutfagi",
            "label": "İtalyan Mutfağı 123",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "fransiz-mutfagi",
            "label": "Fransız Mutfağı 105",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "ispanyol-mutfagi",
            "label": "İspanyol Mutfağı 56",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "portekiz-mutfagi",
            "label": "Portekiz Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "alman-mutfagi",
            "label": "Alman Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "avusturya-mutfagi",
            "label": "Avusturya Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "ingiliz-mutfagi",
            "label": "İngiliz Mutfağı 104",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "irlanda-mutfagi",
            "label": "İrlanda Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "yunan-mutfagi",
            "label": "Yunan Mutfağı 98",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "balkan-mutfagi",
            "label": "Balkan Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "rus-mutfagi",
            "label": "Rus Mutfağı 56",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "ukrayna-mutfagi",
            "label": "Ukrayna Mutfağı 51",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "gurcu-mutfagi",
            "label": "Gürcü Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "azerbaycan-mutfagi",
            "label": "Azerbaycan Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "ermeni-mutfagi",
            "label": "Ermeni Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "kazak-mutfagi",
            "label": "Kazak Mutfağı 54",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "ozbek-mutfagi",
            "label": "Özbek Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "iran-mutfagi",
            "label": "İran Mutfağı 54",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "irak-mutfagi",
            "label": "Irak Mutfağı 99",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "suriye-mutfagi",
            "label": "Suriye Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "lubnan-mutfagi",
            "label": "Lübnan Mutfağı 94",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "urdun-mutfagi",
            "label": "Ürdün Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "suudi-arabistan-mutfagi",
            "label": "Suudi Arabistan Mutfağı 51",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "misir-mutfagi",
            "label": "Mısır Mutfağı 50",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "fas-mutfagi",
            "label": "Fas Mutfağı 54",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "tunus-mutfagi",
            "label": "Tunus Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "etiyopya-mutfagi",
            "label": "Etiyopya Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "guney-afrika-mutfagi",
            "label": "Güney Afrika Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "hint-mutfagi",
            "label": "Hint Mutfağı 106",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "pakistan-mutfagi",
            "label": "Pakistan Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "cin-mutfagi",
            "label": "Çin Mutfağı 99",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "japon-mutfagi",
            "label": "Japon Mutfağı 102",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "kore-mutfagi",
            "label": "Kore Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "tayland-mutfagi",
            "label": "Tayland Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "vietnam-mutfagi",
            "label": "Vietnam Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "malezya-mutfagi",
            "label": "Malezya Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "endonezya-mutfagi",
            "label": "Endonezya Mutfağı 57",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "filipin-mutfagi",
            "label": "Filipin Mutfağı 54",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "amerikan-mutfagi",
            "label": "Amerikan Mutfağı 116",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "kanada-mutfagi",
            "label": "Kanada Mutfağı 52",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "meksika-mutfagi",
            "label": "Meksika Mutfağı 95",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "brezilya-mutfagi",
            "label": "Brezilya Mutfağı 54",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "arjantin-mutfagi",
            "label": "Arjantin Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "peru-mutfagi",
            "label": "Peru Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "kolombiya-mutfagi",
            "label": "Kolombiya Mutfağı 55",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "kuba-mutfagi",
            "label": "Küba Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "jamaika-mutfagi",
            "label": "Jamaika Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "avustralya-mutfagi",
            "label": "Avustralya Mutfağı 53",
            "disabled": false
          },
          {
            "name": "mutfak[]",
            "value": "yeni-zelanda-mutfagi",
            "label": "Yeni Zelanda Mutfağı 55",
            "disabled": false
          }
        ]
      },
      {
        "key": "yemek_modu",
        "label": "Yemek Modu",
        "options": [
          {
            "name": "yemek_modu[]",
            "value": "gunluk-pratik",
            "label": "Günlük Pratik 810",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "hizli-ve-kolay",
            "label": "Hızlı ve Kolay 604",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "misafir-sofrasi",
            "label": "Misafir Sofrası 1.129",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "kalabalik-sofralar",
            "label": "Kalabalık Sofralar 536",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "tek-tencere",
            "label": "Tek Tencere 372",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "firin-yemekleri",
            "label": "Fırın Yemekleri 636",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "tava-yemekleri",
            "label": "Tava Yemekleri 276",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "airfryer-tarifleri",
            "label": "Airfryer Tarifleri 327",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "duduklu-tencere",
            "label": "Düdüklü Tencere 326",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "izgara-ve-barbeku",
            "label": "Izgara ve Barbekü 306",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "pismeyen-tarifler",
            "label": "Pişmeyen Tarifler 245",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "ekonomik-tarifler",
            "label": "Ekonomik Tarifler 580",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "az-malzemeli-tarifler",
            "label": "Az Malzemeli Tarifler 408",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "onceden-hazirlananlar",
            "label": "Önceden Hazırlananlar 971",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "dondurucuya-uygun",
            "label": "Dondurucuya Uygun 399",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "artan-yemekleri-degerlendirme",
            "label": "Artan Yemekleri Değerlendirme 332",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "piknik-ve-acik-hava",
            "label": "Piknik ve Açık Hava 375",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "parti-ve-kutlama",
            "label": "Parti ve Kutlama 378",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "cocuklarin-sevecegi-tarifler",
            "label": "Çocukların Seveceği Tarifler 228",
            "disabled": false
          },
          {
            "name": "yemek_modu[]",
            "value": "ozel-gun-tarifleri",
            "label": "Özel Gün Tarifleri 357",
            "disabled": false
          }
        ]
      },
      {
        "key": "ogun",
        "label": "Öğün",
        "options": [
          {
            "name": "ogun[]",
            "value": "kahvalti",
            "label": "Kahvaltı 1.145",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "brunch",
            "label": "Brunch 647",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "ogle-yemegi",
            "label": "Öğle Yemeği 1.968",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "aksam-yemegi",
            "label": "Akşam Yemeği 2.566",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "ara-ogun",
            "label": "Ara Öğün 1.010",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "ikindi-ve-cay-saati",
            "label": "İkindi ve Çay Saati 1.146",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "gece-atistirmasi",
            "label": "Gece Atıştırması 663",
            "disabled": false
          },
          {
            "name": "ogun[]",
            "value": "beslenme-cantasi",
            "label": "Beslenme Çantası 593",
            "disabled": false
          }
        ]
      },
      {
        "key": "sure",
        "label": "Süre",
        "options": [
          {
            "name": "sure[]",
            "value": "15",
            "label": "15 dakikadan az 191",
            "disabled": false
          },
          {
            "name": "sure[]",
            "value": "15-30",
            "label": "15–30 dakika 1.418",
            "disabled": false
          },
          {
            "name": "sure[]",
            "value": "30-45",
            "label": "30–45 dakika 1.606",
            "disabled": false
          },
          {
            "name": "sure[]",
            "value": "45-60",
            "label": "45–60 dakika 1.127",
            "disabled": false
          },
          {
            "name": "sure[]",
            "value": "60-120",
            "label": "1–2 saat 1.455",
            "disabled": false
          },
          {
            "name": "sure[]",
            "value": "120",
            "label": "2 saatten uzun 315",
            "disabled": false
          }
        ]
      },
      {
        "key": "zorluk",
        "label": "Zorluk",
        "options": [
          {
            "name": "zorluk[]",
            "value": "cok_kolay",
            "label": "Çok Kolay 586",
            "disabled": false
          },
          {
            "name": "zorluk[]",
            "value": "kolay",
            "label": "Kolay 2.263",
            "disabled": false
          },
          {
            "name": "zorluk[]",
            "value": "orta",
            "label": "Orta 2.276",
            "disabled": false
          },
          {
            "name": "zorluk[]",
            "value": "zor",
            "label": "Zor 795",
            "disabled": false
          },
          {
            "name": "zorluk[]",
            "value": "ustalik",
            "label": "Ustalık Gerektirir 192",
            "disabled": false
          }
        ]
      },
      {
        "key": "beslenme",
        "label": "Beslenme / Tip",
        "options": [
          {
            "name": "beslenme[]",
            "value": "vegan",
            "label": "Vegan 1.280",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "vejetaryen",
            "label": "Vejetaryen 2.693",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "glutensiz",
            "label": "Glutensiz 1.997",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "protein-agirlikli",
            "label": "Protein Ağırlıklı 848",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "az-yagli",
            "label": "Az Yağlı 189",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "glutenli",
            "label": "Glutenli 0",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "laktozsuz",
            "label": "Laktozsuz 1.042",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "sut-icermez",
            "label": "Süt İçermez 1.336",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "yumurta-icermez",
            "label": "Yumurta İçermez 1.415",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "seker-ilavesiz",
            "label": "Şeker İlavesiz 1.178",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "yuksek-lifli",
            "label": "Yüksek Lifli 372",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "tam-tahilli",
            "label": "Tam Tahıllı 312",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "acili",
            "label": "Acılı 461",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "baharatli",
            "label": "Baharatlı 247",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "diyabete-uygun",
            "label": "Diyabete Uygun 244",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "kalp-dostu",
            "label": "Kalp Dostu 249",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "dusuk-kalorili",
            "label": "Düşük Kalorili 319",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "pesketaryen",
            "label": "Pesketaryen 1.241",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "kuruyemis-icermez",
            "label": "Kuruyemiş İçermez 1.559",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "dusuk-karbonhidratli",
            "label": "Düşük Karbonhidratlı 316",
            "disabled": false
          },
          {
            "name": "beslenme[]",
            "value": "ketojenik",
            "label": "Ketojenik 225",
            "disabled": false
          }
        ]
      },
      {
        "key": "icerik_turu",
        "label": "İçerik Türü",
        "options": [
          {
            "name": "icerik_turu[]",
            "value": "video",
            "label": "Videolu Anlatım 0",
            "disabled": false
          },
          {
            "name": "icerik_turu[]",
            "value": "sesli",
            "label": "Sesli Anlatım 0",
            "disabled": false
          },
          {
            "name": "icerik_turu[]",
            "value": "fotografli",
            "label": "Fotoğraflı Adımlar 711",
            "disabled": false
          }
        ]
      },
      {
        "key": "butce",
        "label": "Bütçe",
        "options": [
          {
            "name": "butce[]",
            "value": "1",
            "label": "Ekonomik 2.316",
            "disabled": false
          },
          {
            "name": "butce[]",
            "value": "2",
            "label": "Orta Bütçe 2.620",
            "disabled": false
          },
          {
            "name": "butce[]",
            "value": "3",
            "label": "Premium 1.176",
            "disabled": false
          }
        ]
      }
    ],
    "themes": [
      {
        "label": "Tümü",
        "count": "6112 tarif",
        "href": "https://dadagastro.com/tarifler?q="
      },
      {
        "label": "Günlük Pratik",
        "count": "810 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&yemek_modu%5B0%5D=gunluk-pratik"
      },
      {
        "label": "Glutensiz",
        "count": "1.997 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&beslenme%5B0%5D=glutensiz"
      },
      {
        "label": "Tek Tencere",
        "count": "372 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&yemek_modu%5B0%5D=tek-tencere"
      },
      {
        "label": "Fırın Yemekleri",
        "count": "636 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&yemek_modu%5B0%5D=firin-yemekleri"
      },
      {
        "label": "Airfryer Tarifleri",
        "count": "327 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&yemek_modu%5B0%5D=airfryer-tarifleri"
      },
      {
        "label": "Diyabete Uygun",
        "count": "244 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&beslenme%5B0%5D=diyabete-uygun"
      },
      {
        "label": "Kalp Dostu",
        "count": "249 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&beslenme%5B0%5D=kalp-dostu"
      },
      {
        "label": "Düşük Kalorili",
        "count": "319 tarif",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&beslenme%5B0%5D=dusuk-kalorili"
      }
    ],
    "stats": [
      {
        "value": "6.112",
        "label": "Denenmiş tarif"
      },
      {
        "value": "34",
        "label": "Kategori"
      },
      {
        "value": "50",
        "label": "Dünya mutfağı"
      }
    ],
    "popular": [
      {
        "label": "Çorba",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&kategori%5B0%5D=corba"
      },
      {
        "label": "Kırmızı Et",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&kategori%5B0%5D=kirmizi-et"
      },
      {
        "label": "Kahvaltılık",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&kategori%5B0%5D=kahvaltilik"
      },
      {
        "label": "Hamur İşi",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&kategori%5B0%5D=hamur-isi"
      },
      {
        "label": "Vegan",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&beslenme%5B0%5D=vegan"
      },
      {
        "label": "Tatlı",
        "href": "https://dadagastro.com/tarifler?q=&sirala=onerilen&kategori%5B0%5D=tatli"
      }
    ]
  },
  "recipes": {
    "tavuk-curry-hindistan-cevizli-hint-usulu": {
      "ingredients": [
        {
          "group": "Curry için"
        },
        {
          "name": "Tavuk göğsü kuşbaşı",
          "note": "kuşbaşı",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru soğan ince kıyılmış",
          "note": "ince kıyılmış",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sarımsak",
          "note": "",
          "quantity": "2 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "zencefil rendelenmiş",
          "note": "rendelenmiş",
          "quantity": "1 tatlı kaşığı",
          "unit": "tatli-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "curry baharatı",
          "note": "",
          "quantity": "1½ yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Hindistan cevizi sütü",
          "note": "",
          "quantity": "1 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Domates rendelenmiş",
          "note": "rendelenmiş",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sıvı yağ",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 tatlı kaşığı",
          "unit": "tatli-kasigi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/2578.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "0",
      "chef": {
        "info": "Doruk Solmaz\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif7",
          "Takipçi7"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "22 Temmuz 2026",
        "Son güncelleme: 08 Eylül 2026"
      ],
      "features": [
        {
          "label": "Tavuk ve Hindi",
          "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
        },
        {
          "label": "Hint Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=hint-mutfagi"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Laktozsuz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Güveçte Ayvalı Tavuk | Mayhoş Ayvayla Kış Güveci",
          "url": "https://dadagastro.com/tarif/guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci",
          "image": "/varliklar/media/yayilim/t-guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci-kapak.webp",
          "facts": "110 dk Kolay 6 kişilik ₺ ₺ ₺",
          "author": "Cem Aydan",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Ördek Dolması | Fırında İç Pilavlı Bütün Ördek",
          "url": "https://dadagastro.com/tarif/ordek-dolmasi-firinda-ic-pilavli-butun-ordek",
          "image": "/varliklar/media/yayilim/t-ordek-dolmasi-firinda-ic-pilavli-butun-ordek-kapak.webp",
          "facts": "160 dk Zor 6 kişilik ₺ ₺ ₺",
          "author": "İrem Egeli",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
          "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
          "image": "/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
          "facts": "107 dk Kolay 6 kişilik ₺ ₺ ₺",
          "author": "Ege Bakırcıoğlu",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
          "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
          "image": "/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
          "facts": "120 dk Orta 6 kişilik ₺ ₺ ₺",
          "author": "Burcu Yıldırım",
          "rating": "5.0",
          "views": "0"
        }
      ],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "0"
          },
          {
            "star": "4",
            "count": "2"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "tavuk-ve-hindi"
        ],
        "mutfak": [
          "hint-mutfagi"
        ],
        "yemek_modu": [
          "misafir-sofrasi"
        ],
        "ogun": [
          "ogle-yemegi",
          "aksam-yemegi"
        ],
        "sure": [
          "45-60"
        ],
        "zorluk": [
          "orta"
        ],
        "beslenme": [
          "glutensiz",
          "laktozsuz",
          "sut-icermez"
        ],
        "icerik_turu": [],
        "butce": [
          "2"
        ]
      }
    },
    "yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi": {
      "ingredients": [
        {
          "name": "Karides ayıklanmış",
          "note": "ayıklanmış",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zeytinyağı",
          "note": "",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sarımsak ince doğranmış",
          "note": "ince doğranmış",
          "quantity": "3 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Limon",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Maydanoz doğranmış",
          "note": "doğranmış",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Pul biber",
          "note": "",
          "quantity": "½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "¼ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/6685.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "7",
      "clapCount": "2",
      "chef": {
        "info": "Ceren Tosun\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif35",
          "Takipçi8"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "10 Mayıs 2026",
        "Son güncelleme: 11 Eylül 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "Yunan Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=yunan-mutfagi"
        },
        {
          "label": "Düşük Karbonhidratlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-karbonhidratli"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Asam Pedas | Malezya Usulü Demirhindili Ekşi Acı Balık Yahnisi",
          "url": "https://dadagastro.com/tarif/asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi",
          "image": "/varliklar/media/yayilim/t-asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi-kapak.webp",
          "facts": "60 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Ece Sarıoğlu",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Jiao Yan Karides | Çin Usulü Tuz ve Biberli Çıtır Karides",
          "url": "https://dadagastro.com/tarif/jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides",
          "image": "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-kapak.webp",
          "facts": "40 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Burcu Akyüz",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "İran Usulü Baharatlı Acılı Balık Kebabı | Gece Atıştırmalığından Brunch'a Uzanan Şiş",
          "url": "https://dadagastro.com/tarif/iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis",
          "image": "/varliklar/media/8444.webp",
          "facts": "50 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Şahnur Ilıcalı",
          "rating": "5.0",
          "views": "118"
        },
        {
          "title": "Karabuğday Kaplamalı Levrek | Fırında Tam Tahıllı Kabuklu Balık",
          "url": "https://dadagastro.com/tarif/karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik",
          "image": "/varliklar/media/8551.webp",
          "facts": "30 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Emel Aksu",
          "rating": "5.0",
          "views": "102"
        }
      ],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "2"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Orhan Turan",
          "rating": 5,
          "body": "Karidesi tarifte yazdığı gibi 5 dakikadan fazla çevirmemeli miyim, biraz daha uzun tutup 7-8 dakika pişirirsem gerçekten lastik gibi mi olur, yoksa bu biraz abartılı bir uyarı mı, merak ettim doğrusu.",
          "date": "3 ay önce",
          "badge": "Kıdemli Yamak",
          "likes": "1",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "balik-ve-deniz-urunleri"
        ],
        "mutfak": [
          "yunan-mutfagi"
        ],
        "yemek_modu": [
          "hizli-ve-kolay",
          "az-malzemeli-tarifler"
        ],
        "ogun": [
          "ogle-yemegi",
          "aksam-yemegi"
        ],
        "sure": [
          "15-30"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "glutensiz",
          "dusuk-karbonhidratli"
        ],
        "icerik_turu": [],
        "butce": [
          "3"
        ]
      }
    },
    "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi": {
      "ingredients": [
        {
          "name": "Lahana yaprakları ayrılmış",
          "note": "yaprakları ayrılmış",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Pirinç yıkanmış",
          "note": "yıkanmış",
          "quantity": "1 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kıyma",
          "note": "",
          "quantity": "300 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Soğan rendelenmiş",
          "note": "rendelenmiş",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Domates salçası",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Pul biber",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Nane",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Karabiber",
          "note": "",
          "quantity": "½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zeytinyağı",
          "note": "",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Su",
          "note": "",
          "quantity": "2 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/7937.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "5",
      "chef": {
        "info": "Şahnur Ilıcalı\n                                                     Kısım Şefi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif171",
          "Takipçi24"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "16 Temmuz 2026",
        "Son güncelleme: 12 Eylül 2026"
      ],
      "features": [
        {
          "label": "Dolma ve Sarma",
          "href": "https://dadagastro.com/tarifler/kategori/dolma-ve-sarma"
        },
        {
          "label": "Balkan Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=balkan-mutfagi"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Laktozsuz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Yumurta İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
        },
        {
          "label": "Şeker İlavesiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
        },
        {
          "label": "Acılı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
        },
        {
          "label": "Kuruyemiş İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Mercimekli Yaprak Sarma | Adıyaman Usulü Kırmızı Mercimekli",
          "url": "https://dadagastro.com/tarif/mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli",
          "image": "/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-kapak.webp",
          "facts": "85 dk Zor 6 kişilik ₺ ₺ ₺",
          "author": "Mert Taşlı",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Ördek Dolması | Fırında İç Pilavlı Bütün Ördek",
          "url": "https://dadagastro.com/tarif/ordek-dolmasi-firinda-ic-pilavli-butun-ordek",
          "image": "/varliklar/media/yayilim/t-ordek-dolmasi-firinda-ic-pilavli-butun-ordek-kapak.webp",
          "facts": "160 dk Zor 6 kişilik ₺ ₺ ₺",
          "author": "İrem Egeli",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Lor Dolması | Bayburt Usulü Lorlu Yaprak Sarma",
          "url": "https://dadagastro.com/tarif/lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma",
          "image": "/varliklar/media/yayilim/t-lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma-kapak.webp",
          "facts": "75 dk Orta 6 kişilik ₺ ₺ ₺",
          "author": "Dağhan Fahri",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Chelsea Bun | Yeni Zelanda Usulü Tarçınlı Kuru Üzümlü Rulo Çörek",
          "url": "https://dadagastro.com/tarif/chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek",
          "image": "/varliklar/media/7868.webp",
          "facts": "55 dk Orta 6 kişilik ₺ ₺ ₺",
          "author": "Göktürk Dizdar",
          "rating": "5.0",
          "views": "98"
        }
      ],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "dolma-ve-sarma"
        ],
        "mutfak": [
          "balkan-mutfagi"
        ],
        "yemek_modu": [
          "duduklu-tencere",
          "parti-ve-kutlama"
        ],
        "ogun": [
          "gece-atistirmasi"
        ],
        "sure": [
          "45-60"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "glutensiz",
          "laktozsuz",
          "sut-icermez",
          "yumurta-icermez",
          "seker-ilavesiz",
          "acili",
          "kuruyemis-icermez"
        ],
        "icerik_turu": [],
        "butce": [
          "2"
        ]
      }
    },
    "kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas": {
      "ingredients": [
        {
          "name": "kırmızı fasulye haşlanmış ya da konserve, süzülmüş",
          "note": "haşlanmış ya da konserve, süzülmüş",
          "quantity": "2 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Hindistan cevizi sütü",
          "note": "",
          "quantity": "1½ su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Soğan doğranmış",
          "note": "doğranmış",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sarımsak",
          "note": "",
          "quantity": "2 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "zencefil rendelenmiş",
          "note": "rendelenmiş",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kekik",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Pul biber",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Un un topları için",
          "note": "un topları için",
          "quantity": "½ su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Su un topları için",
          "note": "un topları için",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/8069.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "11",
      "clapCount": "2",
      "chef": {
        "info": "Göktürk Dizdar\n                                                     Kısım Şefi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif171",
          "Takipçi26"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "03 Ağustos 2026",
        "Son güncelleme: 11 Eylül 2026"
      ],
      "features": [
        {
          "label": "Bakliyat",
          "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
        },
        {
          "label": "Jamaika Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=jamaika-mutfagi"
        },
        {
          "label": "Vegan",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Laktozsuz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Yumurta İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
        },
        {
          "label": "Şeker İlavesiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
        },
        {
          "label": "Acılı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Kuruyemiş İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Moin Moin | Nijerya Usulü Buharda Börülce Pudingi",
          "url": "https://dadagastro.com/tarif/moin-moin-nijerya-usulu-buharda-borulce-pudingi",
          "image": "/varliklar/media/yayilim/t-moin-moin-nijerya-usulu-buharda-borulce-pudingi-kapak.webp",
          "facts": "100 dk Orta 8 porsiyonluk ₺ ₺ ₺",
          "author": "Atakan Atan",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Waakye | Gana Usulü Sorgum Yapraklı Pirinçli Fasulye",
          "url": "https://dadagastro.com/tarif/waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye",
          "image": "/varliklar/media/yayilim/t-waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye-kapak.webp",
          "facts": "90 dk Kolay 6 kişilik ₺ ₺ ₺",
          "author": "Hüseyin Koç",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Enfrijoladas | Meksika Usulü Fasulye Sosuna Batırılmış Tortilla",
          "url": "https://dadagastro.com/tarif/enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla",
          "image": "/varliklar/media/yayilim/t-enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla-kapak.webp",
          "facts": "85 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Erhan Yıldırım",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Frijoles Refritos | Meksika Usulü Ezme Fasulye",
          "url": "https://dadagastro.com/tarif/frijoles-refritos-meksika-usulu-ezme-fasulye",
          "image": "/varliklar/media/6936.webp",
          "facts": "40 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Aşkın Akay",
          "rating": "5.0",
          "views": "93"
        }
      ],
      "reviewSummary": {
        "recommend": "%50'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "2"
          },
          {
            "star": "3",
            "count": "2"
          },
          {
            "star": "2",
            "count": "1"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Ali Sarıkaya",
          "rating": 2,
          "body": "Hazırlık toplamda söylenenden çok daha uzun sürdü, kuru fasulyeyi bir gece önceden ıslatmam gerektiğini tarif net belirtmemiş. Sabah kahvaltısı için baştan hazırlamak isteyenlere bu uyarı eksik kalmış.",
          "date": "2 ay önce",
          "badge": "Mutfak Meraklısı",
          "likes": "1",
          "photos": [],
          "replies": []
        },
        {
          "author": "Derya Tekin",
          "rating": 3,
          "body": "Un toplarını hepsini aynı anda kaynayan yahniye döktüm, tarifte uyarıldığı gibi birbirine yapışıp tek bir kütle oluşturdular. Parçalamaya çalışırken yahni biraz dağıldı ama tadı yine de fena değildi.",
          "date": "2 ay önce",
          "badge": "Komi",
          "likes": "1",
          "photos": [],
          "replies": []
        },
        {
          "author": "Emine Aygün",
          "rating": 4,
          "body": "Hindistan cevizi sütü bulamadığım için yerine normal süt ve birkaç damla hindistan cevizi özütü kullandım, kıvamı biraz daha ince oldu ama tat yakındı. Zencefili de biraz fazla kaçırdım, hafif keskin bir tat bıraktı.",
          "date": "2 ay önce",
          "badge": "Komi",
          "likes": "0",
          "photos": [],
          "replies": [
            {
              "author": "Göktürk",
              "body": "Süt ve hindistan cevizi özütü karışımı akıllıca bir çözüm, kıvamı biraz krema ekleyerek de yoğunlaştırabilirsiniz. Zencefili bir dahaki sefere yarım ölçüyle başlayıp tadına göre artırmanızı öneririm.",
              "date": "2 ay önce"
            }
          ]
        },
        {
          "author": "Seda Aslantaş",
          "rating": 5,
          "body": "Un toplarının kıvamı harika oldu, pirinçle birlikte kahvaltıda ailece çok beğendik, kahvaltıya bu kadar doyurucu bir tabak beklemiyordum.",
          "date": "2 ay önce",
          "badge": "Çömez Aşçı",
          "likes": "0",
          "photos": [],
          "replies": []
        },
        {
          "author": "Aysun Şimşek",
          "rating": 3,
          "body": "Tarifte belirtilen 15 dakikalık ilk kaynatmadan sonra fasulyeler benim tencerede hâlâ biraz sertti, 10 dakika daha eklemem gerekti. Un toplarını eklediğim son 10 dakikada kıvam gerçekten güzel koyulaştı.",
          "date": "2 ay önce",
          "badge": "Mutfak Meraklısı",
          "likes": "4",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "bakliyat"
        ],
        "mutfak": [
          "jamaika-mutfagi"
        ],
        "yemek_modu": [],
        "ogun": [
          "kahvalti"
        ],
        "sure": [
          "30-45"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "vegan",
          "vejetaryen",
          "laktozsuz",
          "sut-icermez",
          "yumurta-icermez",
          "seker-ilavesiz",
          "acili",
          "pesketaryen",
          "kuruyemis-icermez"
        ],
        "icerik_turu": [],
        "butce": [
          "1"
        ]
      }
    },
    "patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver": {
      "ingredients": [
        {
          "group": "Mücver için"
        },
        {
          "name": "patates",
          "note": "",
          "quantity": "700 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yumurta",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "un",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [
            "mısır nişastası — aynı miktarda kullanılır, kabuk daha çıtır olur"
          ],
          "sponsor": ""
        },
        {
          "name": "dereotu",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "maydanoz — daha düz bir tat verir, aynı miktarda"
          ],
          "sponsor": ""
        },
        {
          "name": "beyaz peynir",
          "note": "",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [
            "kaşar peyniri — rendelenir, tavada daha çok uzar ve kızarır"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "1 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı (kızartmak için)",
          "note": "",
          "quantity": "120 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Yanına"
        },
        {
          "name": "süzme yoğurt",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [
            "yoğurt — daha sulu olur ve tabakta yayılır"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "5",
      "chef": {
        "info": "Ebru Bolatlı\n                                                     Hat Aşçısı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif55",
          "Takipçi42"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "15 Eylül 2026",
        "Son güncelleme: 15 Eylül 2026"
      ],
      "features": [
        {
          "label": "Kahvaltılık",
          "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "414 kcal",
            "label": "Kalori"
          },
          {
            "value": "15.7 g",
            "label": "Protein"
          },
          {
            "value": "44.8 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "19.5 g",
            "label": "Yağ"
          },
          {
            "value": "4.4 g",
            "label": "Lif"
          },
          {
            "value": "5.1 g",
            "label": "Şeker"
          },
          {
            "value": "774 mg",
            "label": "Sodyum"
          },
          {
            "value": "6 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %15",
          "Karbonhidrat %43",
          "Yağ %42"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
          "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
          "image": "/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
          "facts": "25 dk Kolay 4 kişilik ₺ ₺ ₺",
          "author": "Esra Yıldırım",
          "rating": "5.0",
          "views": "2"
        },
        {
          "title": "Masabeeb | Suudi Arabistan Usulü Tam Buğday Unlu Kalın Tava Pankeki",
          "url": "https://dadagastro.com/tarif/masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki",
          "image": "/varliklar/media/yayilim/t-masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki-kapak.webp",
          "facts": "45 dk Kolay 4 kişilik ₺ ₺ ₺",
          "author": "Esma Çevik",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "İrimşik | Kazak Usulü Kızarana Kadar Pişen Tatlımsı Kurutulmuş Lor",
          "url": "https://dadagastro.com/tarif/irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor",
          "image": "/varliklar/media/yayilim/t-irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor-kapak.webp",
          "facts": "215 dk Orta 15 porsiyon ₺ ₺ ₺",
          "author": "İrem Akgül",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Mamounia | Halep Usulü Tereyağlı İrmik Kahvaltısı",
          "url": "https://dadagastro.com/tarif/mamounia-halep-usulu-tereyagli-irmik-kahvaltisi",
          "image": "/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-kapak.webp",
          "facts": "40 dk Kolay 4 kişilik ₺ ₺ ₺",
          "author": "Barlas Egeli",
          "rating": "5.0",
          "views": "0"
        }
      ],
      "reviewSummary": {
        "recommend": "%80'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "2"
          },
          {
            "star": "3",
            "count": "1"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "kahvaltilik"
        ],
        "mutfak": [
          "turk-mutfagi"
        ],
        "yemek_modu": [
          "tava-yemekleri"
        ],
        "ogun": [
          "kahvalti",
          "brunch"
        ],
        "sure": [
          "30-45"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "vejetaryen"
        ],
        "icerik_turu": [],
        "butce": [
          "1"
        ]
      }
    },
    "sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi": {
      "ingredients": [
        {
          "group": "Tatlı için"
        },
        {
          "name": "sagu incisi",
          "note": "",
          "quantity": "120 g",
          "unit": "gram",
          "substitutes": [
            "tapyoka incisi — aynı biçimde ve aynı sürede şeffaflaşır, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tam yağlı süt",
          "note": "",
          "quantity": "800 ml",
          "unit": "ml",
          "substitutes": [
            "laktozsuz süt — aynı miktarda kullanılır, fark edilmez"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz kakule",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "safran",
          "note": "",
          "quantity": "0,2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "gül suyu",
          "note": "",
          "quantity": "10 ml",
          "unit": "ml",
          "substitutes": [
            "portakal çiçeği suyu — daha narenciyemsi kokar, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "sade yağ",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Üzeri için"
        },
        {
          "name": "iç antep fıstığı",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "çiğ badem — dilimlenerek kullanılır, yeşil renk vermez; aynı miktar"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "2",
      "chef": {
        "info": "Şahnur Poyrazoğlu\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif11",
          "Takipçi13"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "15 Eylül 2026",
        "Son güncelleme: 15 Eylül 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Suudi Arabistan Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suudi-arabistan-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "255 kcal",
            "label": "Kalori"
          },
          {
            "value": "4.9 g",
            "label": "Protein"
          },
          {
            "value": "41.9 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "7.5 g",
            "label": "Yağ"
          },
          {
            "value": "0.6 g",
            "label": "Lif"
          },
          {
            "value": "24.3 g",
            "label": "Şeker"
          },
          {
            "value": "58 mg",
            "label": "Sodyum"
          },
          {
            "value": "3.7 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %8",
          "Karbonhidrat %66",
          "Yağ %27"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
          "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
          "image": "/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
          "facts": "200 dk Zor 12 dilim ₺ ₺ ₺",
          "author": "İlker Bozkurt",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Tamriyeh | Şam Usulü İrmik Kremalı Hurmalı Kızartma",
          "url": "https://dadagastro.com/tarif/tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma",
          "image": "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-kapak.webp",
          "facts": "70 dk Orta 10 adet ₺ ₺ ₺",
          "author": "Ece Ekici",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Tepsi Kadayıfı | Cevizli Tel Kadayıflı Şerbetli Fırın Tatlısı",
          "url": "https://dadagastro.com/tarif/tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi",
          "image": "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-kapak.webp",
          "facts": "90 dk Kolay 20 dilim ₺ ₺ ₺",
          "author": "Ahmet Örge",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Muska Tatlısı | Üçgen Katlanmış Cevizli Şerbetli Yufka Tatlısı",
          "url": "https://dadagastro.com/tarif/muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi",
          "image": "/varliklar/media/yayilim/t-muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi-kapak.webp",
          "facts": "65 dk Kolay 24 adet ₺ ₺ ₺",
          "author": "Ece Örge",
          "rating": "5.0",
          "views": "0"
        }
      ],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "İlker Yalçınkaya",
          "rating": null,
          "body": "Sagu incilerini kaynar suya azar azar atmak gerekiyor, bir seferde dökünce dibe çöküp birbirine yapıştı ve topak hâlinde pişti. Safranı da gül suyundan önce katın, ikisini birlikte ekleyince renk tam oturmadan koku baskın geliyor.",
          "date": "2 hafta önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "tatli"
        ],
        "mutfak": [
          "suudi-arabistan-mutfagi"
        ],
        "yemek_modu": [
          "onceden-hazirlananlar",
          "ozel-gun-tarifleri"
        ],
        "ogun": [
          "ikindi-ve-cay-saati"
        ],
        "sure": [
          "30-45"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "vejetaryen",
          "glutensiz"
        ],
        "icerik_turu": [],
        "butce": [
          "2"
        ]
      }
    },
    "pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart": {
      "ingredients": [
        {
          "group": "Hamur için"
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "margarin",
          "note": "",
          "quantity": "50 g",
          "unit": "gram",
          "substitutes": [
            "tereyağı — hamur daha kokulu ve biraz daha kırılgan olur, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "soğuk su",
          "note": "",
          "quantity": "120 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Dolgu için"
        },
        {
          "name": "haşlanmış beyaz fasulye (süzülmüş)",
          "note": "",
          "quantity": "220 g",
          "unit": "gram",
          "substitutes": [
            "kuru beyaz fasulye — 90 g alınır, bir gece ıslatılıp 60 dakika haşlanır; konserve tuzu olmadığı için dolgu daha temiz tatlanır"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "360 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "120 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "öğütülmüş badem",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [
            "öğütülmüş fındık — dolgu daha koyu renkli ve fındık kokulu olur, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "25 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "12 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yumurta sarısı",
          "note": "",
          "quantity": "4 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yumurta akı",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Üzeri için"
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pudra şekeri",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "0",
      "chef": {
        "info": "Atakan Erçetin\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif8",
          "Takipçi14"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "15 Eylül 2026",
        "Son güncelleme: 15 Eylül 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Portekiz Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=portekiz-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "164 kcal",
            "label": "Kalori"
          },
          {
            "value": "3.2 g",
            "label": "Protein"
          },
          {
            "value": "27.3 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "4.7 g",
            "label": "Yağ"
          },
          {
            "value": "1.2 g",
            "label": "Lif"
          },
          {
            "value": "16 g",
            "label": "Şeker"
          },
          {
            "value": "86 mg",
            "label": "Sodyum"
          },
          {
            "value": "1.2 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %8",
          "Karbonhidrat %66",
          "Yağ %26"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Sagdana | Suudi Arabistan Hicaz Usulü Kakuleli Sagu İncili Süt Tatlısı",
          "url": "https://dadagastro.com/tarif/sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi",
          "image": "/varliklar/media/yayilim/t-sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi-kapak.webp",
          "facts": "45 dk Kolay 6 kişilik ₺ ₺ ₺",
          "author": "Şahnur Poyrazoğlu",
          "rating": "5.0",
          "views": "3"
        },
        {
          "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
          "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
          "image": "/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
          "facts": "200 dk Zor 12 dilim ₺ ₺ ₺",
          "author": "İlker Bozkurt",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Tamriyeh | Şam Usulü İrmik Kremalı Hurmalı Kızartma",
          "url": "https://dadagastro.com/tarif/tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma",
          "image": "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-kapak.webp",
          "facts": "70 dk Orta 10 adet ₺ ₺ ₺",
          "author": "Ece Ekici",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Tepsi Kadayıfı | Cevizli Tel Kadayıflı Şerbetli Fırın Tatlısı",
          "url": "https://dadagastro.com/tarif/tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi",
          "image": "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-kapak.webp",
          "facts": "90 dk Kolay 20 dilim ₺ ₺ ₺",
          "author": "Ahmet Örge",
          "rating": "5.0",
          "views": "0"
        }
      ],
      "reviewSummary": {
        "recommend": "%0'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "0"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "tatli"
        ],
        "mutfak": [
          "portekiz-mutfagi"
        ],
        "yemek_modu": [
          "firin-yemekleri",
          "onceden-hazirlananlar"
        ],
        "ogun": [
          "ikindi-ve-cay-saati"
        ],
        "sure": [
          "60-120"
        ],
        "zorluk": [
          "orta"
        ],
        "beslenme": [
          "vejetaryen"
        ],
        "icerik_turu": [],
        "butce": [
          "2"
        ]
      }
    },
    "tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart": {
      "ingredients": [
        {
          "group": "Taban için"
        },
        {
          "name": "tereyağı (oda sıcaklığında)",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [
            "margarin — daha ekonomiktir ancak taban tereyağı kokusu vermez, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yumurta",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "süt",
          "note": "",
          "quantity": "45 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kabartma tozu",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Badem katı için"
        },
        {
          "name": "dilimlenmiş badem",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [
            "esmer şeker — karamel daha koyu ve daha derin tatlı olur, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "125 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "süt",
          "note": "",
          "quantity": "45 ml",
          "unit": "ml",
          "substitutes": [
            "krema — karamel daha yumuşak ve daha az yapışkan olur, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "1 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "3",
      "chef": {
        "info": "İrem Akşit\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif39",
          "Takipçi18"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "15 Eylül 2026",
        "Son güncelleme: 15 Eylül 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Portekiz Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=portekiz-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "405 kcal",
            "label": "Kalori"
          },
          {
            "value": "5.8 g",
            "label": "Protein"
          },
          {
            "value": "35.3 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "26.7 g",
            "label": "Yağ"
          },
          {
            "value": "2.3 g",
            "label": "Lif"
          },
          {
            "value": "21.1 g",
            "label": "Şeker"
          },
          {
            "value": "106 mg",
            "label": "Sodyum"
          },
          {
            "value": "12.5 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %6",
          "Karbonhidrat %35",
          "Yağ %59"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Sagdana | Suudi Arabistan Hicaz Usulü Kakuleli Sagu İncili Süt Tatlısı",
          "url": "https://dadagastro.com/tarif/sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi",
          "image": "/varliklar/media/yayilim/t-sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi-kapak.webp",
          "facts": "45 dk Kolay 6 kişilik ₺ ₺ ₺",
          "author": "Şahnur Poyrazoğlu",
          "rating": "5.0",
          "views": "3"
        },
        {
          "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
          "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
          "image": "/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
          "facts": "200 dk Zor 12 dilim ₺ ₺ ₺",
          "author": "İlker Bozkurt",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Tamriyeh | Şam Usulü İrmik Kremalı Hurmalı Kızartma",
          "url": "https://dadagastro.com/tarif/tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma",
          "image": "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-kapak.webp",
          "facts": "70 dk Orta 10 adet ₺ ₺ ₺",
          "author": "Ece Ekici",
          "rating": "5.0",
          "views": "1"
        },
        {
          "title": "Tepsi Kadayıfı | Cevizli Tel Kadayıflı Şerbetli Fırın Tatlısı",
          "url": "https://dadagastro.com/tarif/tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi",
          "image": "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-kapak.webp",
          "facts": "90 dk Kolay 20 dilim ₺ ₺ ₺",
          "author": "Ahmet Örge",
          "rating": "5.0",
          "views": "0"
        }
      ],
      "reviewSummary": {
        "recommend": "%0'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "0"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Koray Ertürk",
          "rating": null,
          "body": "Karamelize olurken fırının başından ayrılmayın, iki dakikada renk dönüyor.",
          "date": "2 hafta önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        },
        {
          "author": "İpek Cebeci",
          "rating": null,
          "body": "Bademi kaynatıp dökerken taban henüz sıcakken çalışmak gerekiyor, soğumuş tabanda karışım yayılmıyor ve kalıp kenarlarına ulaşmıyor.",
          "date": "2 hafta önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "tatli"
        ],
        "mutfak": [
          "portekiz-mutfagi"
        ],
        "yemek_modu": [
          "misafir-sofrasi",
          "firin-yemekleri"
        ],
        "ogun": [
          "ikindi-ve-cay-saati"
        ],
        "sure": [
          "45-60"
        ],
        "zorluk": [
          "kolay"
        ],
        "beslenme": [
          "vejetaryen"
        ],
        "icerik_turu": [],
        "butce": [
          "3"
        ]
      }
    },
    "sardalya-izgara-limon-kekikli": {
      "ingredients": [
        {
          "group": "Balık için"
        },
        {
          "name": "Sardalya temizlenmiş",
          "note": "temizlenmiş",
          "quantity": "12 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zeytinyağı",
          "note": "",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Limon suyu",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kekik",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Karabiber",
          "note": "",
          "quantity": "½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Servis için"
        },
        {
          "name": "Limon dilimlenmiş",
          "note": "dilimlenmiş",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/2793.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "5",
      "chef": {
        "info": "Cem Erez\n                                                     Çömez Aşçı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif7",
          "Takipçi13"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "18 Temmuz 2026",
        "Son güncelleme: 12 Eylül 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Protein Ağırlıklı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
        },
        {
          "label": "Az Yağlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
        },
        {
          "label": "Laktozsuz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [
        {
          "title": "Asam Pedas | Malezya Usulü Demirhindili Ekşi Acı Balık Yahnisi",
          "url": "https://dadagastro.com/tarif/asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi",
          "image": "/varliklar/media/yayilim/t-asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi-kapak.webp",
          "facts": "60 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Ece Sarıoğlu",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "Jiao Yan Karides | Çin Usulü Tuz ve Biberli Çıtır Karides",
          "url": "https://dadagastro.com/tarif/jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides",
          "image": "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-kapak.webp",
          "facts": "40 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Burcu Akyüz",
          "rating": "5.0",
          "views": "0"
        },
        {
          "title": "İran Usulü Baharatlı Acılı Balık Kebabı | Gece Atıştırmalığından Brunch'a Uzanan Şiş",
          "url": "https://dadagastro.com/tarif/iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis",
          "image": "/varliklar/media/8444.webp",
          "facts": "50 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Şahnur Ilıcalı",
          "rating": "5.0",
          "views": "118"
        },
        {
          "title": "Karabuğday Kaplamalı Levrek | Fırında Tam Tahıllı Kabuklu Balık",
          "url": "https://dadagastro.com/tarif/karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik",
          "image": "/varliklar/media/8551.webp",
          "facts": "30 dk Orta 4 kişilik ₺ ₺ ₺",
          "author": "Emel Aksu",
          "rating": "5.0",
          "views": "102"
        }
      ],
      "reviewSummary": {
        "recommend": "%0'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "0"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": "",
      "facets": {
        "kategori": [
          "balik-ve-deniz-urunleri"
        ],
        "mutfak": [
          "turk-mutfagi"
        ],
        "yemek_modu": [
          "izgara-ve-barbeku",
          "ekonomik-tarifler"
        ],
        "ogun": [
          "ogle-yemegi",
          "aksam-yemegi"
        ],
        "sure": [
          "15-30"
        ],
        "zorluk": [
          "cok_kolay"
        ],
        "beslenme": [
          "glutensiz",
          "protein-agirlikli",
          "az-yagli",
          "laktozsuz",
          "sut-icermez",
          "pesketaryen"
        ],
        "icerik_turu": [],
        "butce": [
          "1"
        ]
      }
    },
    "guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci": {
      "ingredients": [
        {
          "group": "Tavuk için"
        },
        {
          "name": "tavuk but (kemikli, derisi alınmış)",
          "note": "",
          "quantity": "1400 g",
          "unit": "gram",
          "substitutes": [
            "kemiksiz tavuk but — kemik payı olmadığı için 1 kg yeter ve daha çabuk pişer, 74 °C'yi ayvayı dizerken ölçün"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [
            "sadeyağ — daha yüksek ısıya dayanır ve kokusu belirginleşir"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "domates salçası",
          "note": "",
          "quantity": "15 g",
          "unit": "gram",
          "substitutes": [
            "biber salçası — daha kırmızı bir renk ve hafif acı verir"
          ],
          "sponsor": ""
        },
        {
          "name": "tarçın çubuğu",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [
            "toz tarçın — bir tutam yeter, sosu hafifçe bulandırır"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "300 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Ayva için"
        },
        {
          "name": "ayva g (2 iri boy)",
          "note": "g (2 iri boy)",
          "quantity": "700 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su (ayvayı bekletmek için)",
          "note": "",
          "quantity": "750 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "limon suyu",
          "note": "",
          "quantity": "30 ml",
          "unit": "ml",
          "substitutes": [
            "elma sirkesi — aynı miktarda kullanılır, kokusu daha keskin kalır"
          ],
          "sponsor": ""
        },
        {
          "name": "üzüm pekmezi",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "bal — aynı miktarda kullanılır, daha açık renkli bir parlaklık verir"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "3",
      "chef": {
        "info": "Cem Aydan\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif37",
          "Takipçi14"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "13 Eylül 2026",
        "Son güncelleme: 13 Eylül 2026"
      ],
      "features": [
        {
          "label": "Tavuk ve Hindi",
          "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Protein Ağırlıklı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "331 kcal",
            "label": "Kalori"
          },
          {
            "value": "34.6 g",
            "label": "Protein"
          },
          {
            "value": "21.2 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "12.6 g",
            "label": "Yağ"
          },
          {
            "value": "2.7 g",
            "label": "Lif"
          },
          {
            "value": "15.4 g",
            "label": "Şeker"
          },
          {
            "value": "837 mg",
            "label": "Sodyum"
          },
          {
            "value": "5.3 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %41",
          "Karbonhidrat %25",
          "Yağ %34"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Lale Kazancı",
          "rating": null,
          "body": "Ayvayı bekletme suyuna limon koymazsanız kararıyor, ben unutmuşum ve güveçte kahverengi dilimler durdu. Tadı etkilenmedi ama görüntüsü bozuldu.",
          "date": "2 hafta önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "ordek-dolmasi-firinda-ic-pilavli-butun-ordek": {
      "ingredients": [
        {
          "group": "Ördek için"
        },
        {
          "name": "ördek g (1 adet, temizlenmiş)",
          "note": "g (1 adet, temizlenmiş)",
          "quantity": "2200 g",
          "unit": "gram",
          "substitutes": [
            "kaz — neredeyse iki katı ağırlıktadır, fırın süresini bir katına çıkarın"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "16 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "4 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kekik",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "limon suyu",
          "note": "",
          "quantity": "30 ml",
          "unit": "ml",
          "substitutes": [
            "elma sirkesi — üçte iki miktarı yeter, keskinliği daha düzdür"
          ],
          "sponsor": ""
        },
        {
          "group": "İç pilav için"
        },
        {
          "name": "pirinç",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [
            "bulgur — aynı miktarda, iç daha sıkı olur ve dağılmaz"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan g (1,5 orta boy)",
          "note": "g (1,5 orta boy)",
          "quantity": "165 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "50 g",
          "unit": "gram",
          "substitutes": [
            "sadeyağ — daha yüksek ısıya dayanır ve kokusu belirginleşir"
          ],
          "sponsor": ""
        },
        {
          "name": "kuş üzümü",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [
            "kuru kızılcık — daha ekşidir, bir tutam şeker ekleyin"
          ],
          "sponsor": ""
        },
        {
          "name": "ceviz içi",
          "note": "",
          "quantity": "50 g",
          "unit": "gram",
          "substitutes": [
            "çam fıstığı — daha yumuşak bir doku verir",
            "kabak çekirdeği içi — kuruyemiş alerjisinde kullanılır, dokusu daha sert kalır"
          ],
          "sponsor": ""
        },
        {
          "name": "tarçın",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yenibahar",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "400 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "6 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-ordek-dolmasi-firinda-ic-pilavli-butun-ordek-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "5",
      "clapCount": "3",
      "chef": {
        "info": "İrem Egeli\n                                                     Aşçı Yamağı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif18",
          "Takipçi23"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "11 Eylül 2026",
        "Son güncelleme: 11 Eylül 2026"
      ],
      "features": [
        {
          "label": "Dolma ve Sarma",
          "href": "https://dadagastro.com/tarifler/kategori/dolma-ve-sarma"
        },
        {
          "label": "Tavuk ve Hindi",
          "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Protein Ağırlıklı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "639 kcal",
            "label": "Kalori"
          },
          {
            "value": "35.6 g",
            "label": "Protein"
          },
          {
            "value": "42.5 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "36.3 g",
            "label": "Yağ"
          },
          {
            "value": "2.3 g",
            "label": "Lif"
          },
          {
            "value": "5.5 g",
            "label": "Şeker"
          },
          {
            "value": "933 mg",
            "label": "Sodyum"
          },
          {
            "value": "14.5 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %22",
          "Karbonhidrat %27",
          "Yağ %51"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu": {
      "ingredients": [
        {
          "group": "Su için"
        },
        {
          "name": "tavuk but (derisiz, kemikli)",
          "note": "",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [
            "hindi kanat ve boyun — daha koyu renkli ve daha dolgun bir su verir, pişirme süresi yirmi dakika uzar",
            "tavuk göğsü kemiği ve karkas — daha berrak ama daha zayıf bir su verir"
          ],
          "sponsor": ""
        },
        {
          "name": "havuç",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [
            "şalgam — daha keskin bir tat verir, aynı sürede pişer"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [
            "pırasanın beyaz kısmı — daha yumuşak bir tat verir, aynı sürede pişer"
          ],
          "sponsor": ""
        },
        {
          "name": "kereviz sapı",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [
            "rezene sapı — daha tatlımsı bir koku verir, aynı miktarda kullanılır"
          ],
          "sponsor": ""
        },
        {
          "name": "içme suyu",
          "note": "",
          "quantity": "2000 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "2",
      "chef": {
        "info": "Ege Bakırcıoğlu\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif30",
          "Takipçi19"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "08 Eylül 2026",
        "Son güncelleme: 08 Eylül 2026"
      ],
      "features": [
        {
          "label": "Bebek Tarifleri",
          "href": "https://dadagastro.com/tarifler/kategori/bebek-tarifleri"
        },
        {
          "label": "Tavuk ve Hindi",
          "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Şeker İlavesiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Az Yağlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Yumurta İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "15 kcal",
            "label": "Kalori"
          },
          {
            "value": "2 g",
            "label": "Protein"
          },
          {
            "value": "0.8 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "0.4 g",
            "label": "Yağ"
          },
          {
            "value": "0.1 g",
            "label": "Lif"
          },
          {
            "value": "0.3 g",
            "label": "Şeker"
          },
          {
            "value": "25 mg",
            "label": "Sodyum"
          },
          {
            "value": "0.1 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %54",
          "Karbonhidrat %22",
          "Yağ %24"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav": {
      "ingredients": [
        {
          "group": "Ördek için"
        },
        {
          "name": "ördek but",
          "note": "",
          "quantity": "6 adet",
          "unit": "adet",
          "substitutes": [
            "kemikli tavuk but — 1,2 kg kullanılır, daha az yağlıdır ve pişme süresi 20 dakika kısalır"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "2½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kimyon",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Yeşil su için"
        },
        {
          "name": "taze kişniş",
          "note": "",
          "quantity": "120 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ıspanak",
          "note": "",
          "quantity": "30 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "sarımsak",
          "note": "",
          "quantity": "5 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "aji amarillo ezmesi",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [
            "közlenmiş kırmızı biber ezmesi ve 1 tutam acı toz biber — rengi ve tatlılığı yakındır, ama aji amarillonun meyvemsi kokusunu vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "et suyu",
          "note": "",
          "quantity": "900 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "portakal suyu",
          "note": "",
          "quantity": "150 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Pilav için"
        },
        {
          "name": "pirinç",
          "note": "",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "bezelye",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kırmızı dolma biber",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "havuç",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "1",
      "chef": {
        "info": "Burcu Yıldırım\n                                                     Aşçı Yamağı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif20",
          "Takipçi38"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "03 Eylül 2026",
        "Son güncelleme: 03 Eylül 2026"
      ],
      "features": [
        {
          "label": "Pilav",
          "href": "https://dadagastro.com/tarifler/kategori/pilav"
        },
        {
          "label": "Tavuk ve Hindi",
          "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
        },
        {
          "label": "Peru Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=peru-mutfagi"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Protein Ağırlıklı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "634 kcal",
            "label": "Kalori"
          },
          {
            "value": "44 g",
            "label": "Protein"
          },
          {
            "value": "82 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "12 g",
            "label": "Yağ"
          },
          {
            "value": "5 g",
            "label": "Lif"
          },
          {
            "value": "8 g",
            "label": "Şeker"
          },
          {
            "value": "1060 mg",
            "label": "Sodyum"
          },
          {
            "value": "5 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %29",
          "Karbonhidrat %54",
          "Yağ %18"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi": {
      "ingredients": [
        {
          "group": "Taban ezme için"
        },
        {
          "name": "kurutulmuş kırmızı acı biber",
          "note": "",
          "quantity": "25 g",
          "unit": "gram",
          "substitutes": [
            "2 yemek kaşığı acı biber salçası — rengi aynı olur ancak kuru biberin dumanlı alt tadını vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "arpacık soğan",
          "note": "",
          "quantity": "120 g",
          "unit": "gram",
          "substitutes": [
            "kuru soğan — aynı miktarda kullanılır, ezme daha sulu olur ve kavrulması uzar"
          ],
          "sponsor": ""
        },
        {
          "name": "sarımsak",
          "note": "",
          "quantity": "5 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "havlıcan (galangal)",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "taze zencefil — yarısı kadar kullanılır, keskinliği daha öne çıkar ve havlıcanın çam benzeri kokusunu vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "limon otu sap",
          "note": "sap",
          "quantity": "2",
          "unit": "",
          "substitutes": [
            "1 çay kaşığı rendelenmiş limon kabuğu — kokunun taze kısmını verir, odunsu alt tadı eksik kalır"
          ],
          "sponsor": ""
        },
        {
          "name": "karides ezmesi (belacan)",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [
            "2 çay kaşığı balık sosu — benzer tuzlu derinliği verir, sosun rengini koyulaştırmaz"
          ],
          "sponsor": ""
        },
        {
          "group": "Yemek için"
        },
        {
          "name": "uskumru (temizlenmiş, kalın dilim)",
          "note": "",
          "quantity": "700 g",
          "unit": "gram",
          "substitutes": [
            "levrek dilimi — daha az yağlıdır ve 2 dakika daha kısa pişer",
            "beyaz etli fileto — kılçıksız seçenektir, tadı daha yalın kalır"
          ],
          "sponsor": ""
        },
        {
          "name": "demirhindi ezmesi",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [
            "50 ml nar ekşisi — benzer koyu ekşilik verir, sosun rengi daha koyu kırmızı olur"
          ],
          "sponsor": ""
        },
        {
          "name": "sıvı yağ",
          "note": "",
          "quantity": "60 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "bamya",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [
            "taze yeşil fasulye — aynı sürede pişer, bamyanın sosu bağlayan yapışkanlığını vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "patlıcan",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "domates",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "800 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "8 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "hindistan cevizi şekeri",
          "note": "",
          "quantity": "12 g",
          "unit": "gram",
          "substitutes": [
            "esmer şeker — aynı miktarda kullanılır, ekşiliği aynı biçimde yuvarlar"
          ],
          "sponsor": ""
        },
        {
          "name": "nane ve taze kişniş",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "taze reyhan — özgün daun kesum yaprağına en yakın kokudur, tadı biraz daha tatlımsı olur"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "2",
      "chef": {
        "info": "Ece Sarıoğlu\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif13",
          "Takipçi11"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "08 Eylül 2026",
        "Son güncelleme: 08 Eylül 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "Malezya Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=malezya-mutfagi"
        },
        {
          "label": "Acılı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Süt İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "646 kcal",
            "label": "Kalori"
          },
          {
            "value": "38 g",
            "label": "Protein"
          },
          {
            "value": "32.4 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "40.5 g",
            "label": "Yağ"
          },
          {
            "value": "7.3 g",
            "label": "Lif"
          },
          {
            "value": "17.9 g",
            "label": "Şeker"
          },
          {
            "value": "1153 mg",
            "label": "Sodyum"
          },
          {
            "value": "7.4 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %24",
          "Karbonhidrat %20",
          "Yağ %56"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides": {
      "ingredients": [
        {
          "group": "Karidesler için"
        },
        {
          "name": "iri karides (kabuklu)",
          "note": "",
          "quantity": "700 g",
          "unit": "gram",
          "substitutes": [
            "kabuğu soyulmuş karides — daha kolay yenir ancak kabuğun çıtırlığı ve tadı kaybolur, kızartma süresi 2 dakika kısalır"
          ],
          "sponsor": ""
        },
        {
          "name": "mısır nişastası",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pirinç unu",
          "note": "",
          "quantity": "30 g",
          "unit": "gram",
          "substitutes": [
            "aynı miktarda mısır nişastası — kaplama biraz daha kırılgan olur, çıtırlık aynı kalır"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "1 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "beyaz biber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [
            "karabiber — daha keskin ve odunsu, beyaz biberin toprağımsı sıcaklığını vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "yumurta akı",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı (kızartmak için)",
          "note": "",
          "quantity": "700 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Tuz-biber karışımı için"
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "4 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sichuan biberi",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [
            "yarım çay kaşığı karabiber ve bir tutam kişniş tozu — Sichuan biberinin dilde uyuşturan etkisini vermez, yalnız keskinliği karşılar"
          ],
          "sponsor": ""
        },
        {
          "name": "beyaz biber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pul biber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Wok için"
        },
        {
          "name": "sarımsak",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yeşil soğan",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kırmızı ve yeşil sivri biber",
          "note": "",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [
            "renkli kapya biber — hiç acı olmaz ve daha tatlıdır, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı",
          "note": "",
          "quantity": "15 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "5",
      "chef": {
        "info": "Burcu Akyüz\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif11",
          "Takipçi18"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "12 Ağustos 2026",
        "Son güncelleme: 12 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "Çin Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=cin-mutfagi"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Baharatlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=baharatli"
        },
        {
          "label": "Protein Ağırlıklı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "353 kcal",
            "label": "Kalori"
          },
          {
            "value": "28 g",
            "label": "Protein"
          },
          {
            "value": "18 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "19 g",
            "label": "Yağ"
          },
          {
            "value": "1 g",
            "label": "Lif"
          },
          {
            "value": "2 g",
            "label": "Şeker"
          },
          {
            "value": "617 mg",
            "label": "Sodyum"
          },
          {
            "value": "2 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %32",
          "Karbonhidrat %20",
          "Yağ %48"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": [
            "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-adim1.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-adim2.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-adim4.webp"
          ]
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-adim6.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis": {
      "ingredients": [
        {
          "name": "levrek fileto küp doğranmış",
          "note": "küp doğranmış",
          "quantity": "600 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "acı kırmızı biber ezmesi",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zerdeçal",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sarımsak",
          "note": "",
          "quantity": "2 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Limon suyu",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zeytinyağı",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "taze kişniş ince kıyılmış",
          "note": "ince kıyılmış",
          "quantity": "1 demet",
          "unit": "demet",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/8444.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "5",
      "clapCount": "2",
      "chef": {
        "info": "Şahnur Ilıcalı\n                                                     Kısım Şefi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif171",
          "Takipçi24"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "22 Temmuz 2026",
        "Son güncelleme: 11 Eylül 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "İran Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=iran-mutfagi"
        },
        {
          "label": "Acılı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Düşük Kalorili",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-kalorili"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "4"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Dilek Yücel",
          "rating": 5,
          "body": "Levrek yerine somon kullansam marine süresini kısaltmam gerekir mi, yoksa 15 dakika her ikisi için de yeterli mi? Izgara süresini de balığın kalınlığına göre ayarlamak mantıklı olur mu diye merak ediyorum.",
          "date": "2 ay önce",
          "badge": "Mutfak Meraklısı",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik": {
      "ingredients": [
        {
          "name": "kılçıksız levrek fileto",
          "note": "",
          "quantity": "4 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Karabuğday unu",
          "note": "",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Yumurta Akı",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Limon suyu",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Zeytinyağı",
          "note": "",
          "quantity": "1 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Karabiber",
          "note": "",
          "quantity": "½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Maydanoz ince kıyılmış, servis için",
          "note": "ince kıyılmış, servis için",
          "quantity": "1 demet",
          "unit": "demet",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/8551.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "6",
      "clapCount": "2",
      "chef": {
        "info": "Emel Aksu\n                                                     Kıdemli Aşçı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif137",
          "Takipçi25"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "17 Haziran 2026",
        "Son güncelleme: 10 Eylül 2026"
      ],
      "features": [
        {
          "label": "Balık ve Deniz Ürünleri",
          "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Tam Tahıllı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=tam-tahilli"
        },
        {
          "label": "Düşük Kalorili",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-kalorili"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "280 kcal",
            "label": "Kalori"
          },
          {
            "value": "32 g",
            "label": "Protein"
          },
          {
            "value": "14 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "9 g",
            "label": "Yağ"
          },
          {
            "value": "2 g",
            "label": "Lif"
          },
          {
            "value": "1 g",
            "label": "Şeker"
          },
          {
            "value": "380 mg",
            "label": "Sodyum"
          },
          {
            "value": "2 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %48",
          "Karbonhidrat %21",
          "Yağ %31"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli": {
      "ingredients": [
        {
          "group": "Harç için"
        },
        {
          "name": "kırmızı mercimek",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [
            "sarı mercimek — daha geç dağılır, pişirme süresini 10 dakika uzatın"
          ],
          "sponsor": ""
        },
        {
          "name": "ince bulgur",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [
            "irmik — üçte iki miktarı yeter, harç daha çabuk tutar ancak tane dokusu olmaz"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan g (2 orta boy)",
          "note": "g (2 orta boy)",
          "quantity": "220 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "domates salçası",
          "note": "",
          "quantity": "35 g",
          "unit": "gram",
          "substitutes": [
            "biber salçası — daha kırmızı bir renk ve hafif acı verir"
          ],
          "sponsor": ""
        },
        {
          "name": "zeytinyağı",
          "note": "",
          "quantity": "110 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru nane",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [
            "taze nane — üç katı miktar gerekir, kokusu daha uçucudur"
          ],
          "sponsor": ""
        },
        {
          "name": "pul biber",
          "note": "",
          "quantity": "4 g",
          "unit": "gram",
          "substitutes": [
            "isot — daha koyu renk ve dumanlı bir tat verir, aynı miktarda"
          ],
          "sponsor": ""
        },
        {
          "name": "kimyon",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "9 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Sarma ve pişirme için"
        },
        {
          "name": "asma yaprağı g (yaklaşık 45 yaprak)",
          "note": "g (yaklaşık 45 yaprak)",
          "quantity": "280 g",
          "unit": "gram",
          "substitutes": [
            "pazı yaprağı — daha büyüktür, ikiye bölerek kullanın ve haşlamayın",
            "kabak yaprağı — orta damarı kalındır, kesip almanız gerekir"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "200 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "nar ekşisi",
          "note": "",
          "quantity": "30 ml",
          "unit": "ml",
          "substitutes": [
            "limon suyu — iki katı miktar gerekir, tatlılığı olmaz"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "0",
      "chef": {
        "info": "Mert Taşlı\n                                                     Aşçı Yamağı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif22",
          "Takipçi12"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "11 Eylül 2026",
        "Son güncelleme: 11 Eylül 2026"
      ],
      "features": [
        {
          "label": "Dolma ve Sarma",
          "href": "https://dadagastro.com/tarifler/kategori/dolma-ve-sarma"
        },
        {
          "label": "Zeytinyağlılar",
          "href": "https://dadagastro.com/tarifler/kategori/zeytinyaglilar"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vegan",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Yüksek Lifli",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yuksek-lifli"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "459 kcal",
            "label": "Kalori"
          },
          {
            "value": "13.9 g",
            "label": "Protein"
          },
          {
            "value": "55.5 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "20.2 g",
            "label": "Yağ"
          },
          {
            "value": "13.3 g",
            "label": "Lif"
          },
          {
            "value": "8.6 g",
            "label": "Şeker"
          },
          {
            "value": "693 mg",
            "label": "Sodyum"
          },
          {
            "value": "2.9 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %12",
          "Karbonhidrat %48",
          "Yağ %40"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": [
            "/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-adim1.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-adim2.webp"
          ]
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-adim4.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma": {
      "ingredients": [
        {
          "group": "Dolma için"
        },
        {
          "name": "lor peyniri",
          "note": "",
          "quantity": "300 g",
          "unit": "gram",
          "substitutes": [
            "çökelek — daha kuru ve daha tuzludur, harca 2 yemek kaşığı süt ekleyin",
            "minci peyniri — Rize'nin yağsız taze peyniridir, daha ekşi bir tat verir"
          ],
          "sponsor": ""
        },
        {
          "name": "asma yaprağı (salamura)",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [
            "karalahana yaprağı — daha kalın ve daha iri sarmalar olur, haşlama süresini 5 dakika artırın"
          ],
          "sponsor": ""
        },
        {
          "name": "yumurta",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "dereotu",
          "note": "",
          "quantity": "1 demet",
          "unit": "demet",
          "substitutes": [
            "taze nane — daha ferah ve daha keskin kokar, yarım demet yeterlidir"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [
            "margarin — daha ekonomiktir ancak tereyağının kokusunu vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "400 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "2",
      "clapCount": "2",
      "chef": {
        "info": "Dağhan Fahri\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif14",
          "Takipçi16"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "12 Ağustos 2026",
        "Son güncelleme: 12 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Dolma ve Sarma",
          "href": "https://dadagastro.com/tarifler/kategori/dolma-ve-sarma"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Düşük Karbonhidratlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-karbonhidratli"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "166 kcal",
            "label": "Kalori"
          },
          {
            "value": "10.5 g",
            "label": "Protein"
          },
          {
            "value": "4 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "12 g",
            "label": "Yağ"
          },
          {
            "value": "1.8 g",
            "label": "Lif"
          },
          {
            "value": "1.5 g",
            "label": "Şeker"
          },
          {
            "value": "700 mg",
            "label": "Sodyum"
          },
          {
            "value": "6 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %25",
          "Karbonhidrat %10",
          "Yağ %65"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma-adim3.webp"
          ]
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek": {
      "ingredients": [
        {
          "name": "Un",
          "note": "",
          "quantity": "3 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "maya kuru",
          "note": "kuru",
          "quantity": "1 tatlı kaşığı",
          "unit": "tatli-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Süt ılık",
          "note": "ılık",
          "quantity": "1 su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Toz şeker",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tereyağı eritilmiş",
          "note": "eritilmiş",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "½ çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "esmer şeker",
          "note": "",
          "quantity": "½ su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tarçın toz",
          "note": "toz",
          "quantity": "1 tatlı kaşığı",
          "unit": "tatli-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru üzüm",
          "note": "",
          "quantity": "¾ su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Pudra şekeri kaplama için",
          "note": "kaplama için",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/7868.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "1",
      "chef": {
        "info": "Göktürk Dizdar\n                                                     Kısım Şefi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif171",
          "Takipçi26"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "11 Mayıs 2026",
        "Son güncelleme: 12 Eylül 2026"
      ],
      "features": [
        {
          "label": "Dolma ve Sarma",
          "href": "https://dadagastro.com/tarifler/kategori/dolma-ve-sarma"
        },
        {
          "label": "Yeni Zelanda Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=yeni-zelanda-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Yumurta İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Kuruyemiş İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "moin-moin-nijerya-usulu-buharda-borulce-pudingi": {
      "ingredients": [
        {
          "group": "Puding için"
        },
        {
          "name": "kuru börülce",
          "note": "",
          "quantity": "400 g",
          "unit": "gram",
          "substitutes": [
            "kabuğu soyulmuş hazır börülce unu — soyma ve çekme adımları düşer, 380 g kullanılır ve 400 ml suyla açılır"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kırmızı kapya biber",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "acı kırmızı biber",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [
            "pul biber — daha eşit dağılır ama tazenin canlılığını vermez, 3 gram yeterlidir"
          ],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı",
          "note": "",
          "quantity": "60 ml",
          "unit": "ml",
          "substitutes": [
            "zeytinyağı — daha belirgin bir tat verir, aynı miktarda kullanılır"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "200 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "haşlanmış yumurta",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [
            "haşlanmış havuç dilimleri — pudingi tamamen bitkisel yapar, aynı şekilde kaplara yerleştirilir"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "8 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-moin-moin-nijerya-usulu-buharda-borulce-pudingi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "1",
      "chef": {
        "info": "Atakan Atan\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif10",
          "Takipçi14"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "29 Ağustos 2026",
        "Son güncelleme: 29 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Bakliyat",
          "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Yüksek Lifli",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yuksek-lifli"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "242 kcal",
            "label": "Kalori"
          },
          {
            "value": "12.5 g",
            "label": "Protein"
          },
          {
            "value": "30 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "8 g",
            "label": "Yağ"
          },
          {
            "value": "10 g",
            "label": "Lif"
          },
          {
            "value": "2 g",
            "label": "Şeker"
          },
          {
            "value": "400 mg",
            "label": "Sodyum"
          },
          {
            "value": "1.5 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %21",
          "Karbonhidrat %50",
          "Yağ %30"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Khaled Mansour",
          "rating": null,
          "body": "Börülcenin kabuğunu soymak en zahmetli kısmı, ıslatıp avuç içinde ovarak yaptım. Kaplara doldururken üstte yer bırakın, buharda kabarıyor. Kapları yağlamak da gerekiyor, yağsız kaptan buharda pişen puding çıkmıyor ve kaşıkla kazımak zorunda kalıyorsunuz.",
          "date": "3 hafta önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-moin-moin-nijerya-usulu-buharda-borulce-pudingi-adim4.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-moin-moin-nijerya-usulu-buharda-borulce-pudingi-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye": {
      "ingredients": [
        {
          "group": "Yemek için"
        },
        {
          "name": "kuru börülce",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [
            "konserve börülce — süzülüp yıkanarak kullanılır, haşlama düşer ve pirinç için 900 ml sıcak su gerekir, 550 g kullanılır"
          ],
          "sponsor": ""
        },
        {
          "name": "pirinç",
          "note": "",
          "quantity": "400 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kurutulmuş sorgum yaprağı",
          "note": "",
          "quantity": "6 adet",
          "unit": "adet",
          "substitutes": [
            "bir tutam karbonat ve 1 tatlı kaşığı tatlı toz biber — yaprağın kırmızımsı rengini yaklaşık verir ama kendine özgü toprak kokusunu vermez"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "1500 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "2",
      "chef": {
        "info": "Hüseyin Koç\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif36",
          "Takipçi8"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "29 Ağustos 2026",
        "Son güncelleme: 29 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Bakliyat",
          "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
        },
        {
          "label": "Vegan",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Yüksek Lifli",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yuksek-lifli"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "374 kcal",
            "label": "Kalori"
          },
          {
            "value": "14 g",
            "label": "Protein"
          },
          {
            "value": "76 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "1.5 g",
            "label": "Yağ"
          },
          {
            "value": "8.5 g",
            "label": "Lif"
          },
          {
            "value": "2 g",
            "label": "Şeker"
          },
          {
            "value": "670 mg",
            "label": "Sodyum"
          },
          {
            "value": "0.3 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %15",
          "Karbonhidrat %81",
          "Yağ %4"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye-adim4.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla": {
      "ingredients": [
        {
          "group": "Fasulye sosu için"
        },
        {
          "name": "kuru siyah fasulye",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [
            "konserve siyah fasulye — süzülüp yıkanarak kullanılır, haşlama düşer, 350 g gerekir"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru ancho biberi",
          "note": "",
          "quantity": "2 adet",
          "unit": "adet",
          "substitutes": [
            "tatlı toz biber ve bir tutam isot — ancho'nun kuru meyvemsi tadını tam vermez, 10 g toz biber yeterlidir"
          ],
          "sponsor": ""
        },
        {
          "name": "kuru soğan",
          "note": "",
          "quantity": "120 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "sarımsak",
          "note": "",
          "quantity": "3 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı",
          "note": "",
          "quantity": "60 ml",
          "unit": "ml",
          "substitutes": [
            "zeytinyağı — daha belirgin bir tat verir, aynı miktarda kullanılır"
          ],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kimyon",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Üzeri ve içi için"
        },
        {
          "name": "mısır tortillası",
          "note": "",
          "quantity": "8 adet",
          "unit": "adet",
          "substitutes": [
            "lavaş — daha ince ve daha yumuşaktır, sosta yırtılmaması için yalnız bir saniye batırın"
          ],
          "sponsor": ""
        },
        {
          "name": "beyaz peynir",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [
            "lor peyniri — daha yumuşak ve az tuzludur, üzerine bir tutam tuz serpin"
          ],
          "sponsor": ""
        },
        {
          "name": "taze kişniş",
          "note": "",
          "quantity": "½ demet",
          "unit": "demet",
          "substitutes": [
            "maydanoz — kişnişin sabunsu kokusunu sevmeyenler için, aynı miktarda kullanılır"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "0",
      "chef": {
        "info": "Erhan Yıldırım\n                                                     Çömez Aşçı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif5",
          "Takipçi4"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "28 Ağustos 2026",
        "Son güncelleme: 28 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Bakliyat",
          "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
        },
        {
          "label": "Meksika Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=meksika-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Yüksek Lifli",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yuksek-lifli"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "447 kcal",
            "label": "Kalori"
          },
          {
            "value": "16 g",
            "label": "Protein"
          },
          {
            "value": "53 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "19 g",
            "label": "Yağ"
          },
          {
            "value": "12.5 g",
            "label": "Lif"
          },
          {
            "value": "3 g",
            "label": "Şeker"
          },
          {
            "value": "600 mg",
            "label": "Sodyum"
          },
          {
            "value": "4 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %14",
          "Karbonhidrat %47",
          "Yağ %38"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "frijoles-refritos-meksika-usulu-ezme-fasulye": {
      "ingredients": [
        {
          "name": "Kuru fasulye haşlanmış",
          "note": "haşlanmış",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tereyağı",
          "note": "",
          "quantity": "3 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Soğan ince doğranmış",
          "note": "ince doğranmış",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Sarımsak",
          "note": "",
          "quantity": "2 diş",
          "unit": "dis",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kimyon",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "dumanlı pul biber",
          "note": "",
          "quantity": "1 tatlı kaşığı",
          "unit": "tatli-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Tuz",
          "note": "",
          "quantity": "1 çay kaşığı",
          "unit": "cay-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kaşar peyniri rendelenmiş, üzerine",
          "note": "rendelenmiş, üzerine",
          "quantity": "½ su bardağı",
          "unit": "su-bardagi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "Kişniş taze, kıyılmış",
          "note": "taze, kıyılmış",
          "quantity": "2 tutam",
          "unit": "tutam",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/6936.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "5",
      "chef": {
        "info": "Aşkın Akay\n                                                     Hat Aşçısı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif60",
          "Takipçi74"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "23 Mayıs 2026",
        "Son güncelleme: 12 Eylül 2026"
      ],
      "features": [
        {
          "label": "Bakliyat",
          "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
        },
        {
          "label": "Meksika Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=meksika-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Yumurta İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
        },
        {
          "label": "Şeker İlavesiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
        },
        {
          "label": "Acılı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
        },
        {
          "label": "Pesketaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
        },
        {
          "label": "Kuruyemiş İçermez",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": null,
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta": {
      "ingredients": [
        {
          "group": "Tava için"
        },
        {
          "name": "semizotu (ayıklanmış)",
          "note": "",
          "quantity": "400 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kuru soğan g (1 orta boy)",
          "note": "g (1 orta boy)",
          "quantity": "110 g",
          "unit": "gram",
          "substitutes": [
            "taze soğan — 4 dal kullanılır, daha hafif ve yeşil bir tat verir"
          ],
          "sponsor": ""
        },
        {
          "name": "zeytinyağı",
          "note": "",
          "quantity": "30 ml",
          "unit": "ml",
          "substitutes": [
            "tereyağı — 30 g kullanılır, semizotunun ekşimsi tadını yuvarlar"
          ],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "4 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "karabiber",
          "note": "",
          "quantity": "1 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pul biber",
          "note": "",
          "quantity": "2 g",
          "unit": "gram",
          "substitutes": [
            "isot — daha koyu renk ve is kokusu verir, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "name": "yumurta",
          "note": "",
          "quantity": "5 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "3",
      "chef": {
        "info": "Esra Yıldırım\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif14",
          "Takipçi4"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "15 Eylül 2026",
        "Son güncelleme: 15 Eylül 2026"
      ],
      "features": [
        {
          "label": "Yumurta Tarifleri",
          "href": "https://dadagastro.com/tarifler/kategori/yumurta-tarifleri"
        },
        {
          "label": "Kahvaltılık",
          "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Düşük Karbonhidratlı",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-karbonhidratli"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "184 kcal",
            "label": "Kalori"
          },
          {
            "value": "10.3 g",
            "label": "Protein"
          },
          {
            "value": "6.8 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "13.5 g",
            "label": "Yağ"
          },
          {
            "value": "0.7 g",
            "label": "Lif"
          },
          {
            "value": "1.5 g",
            "label": "Şeker"
          },
          {
            "value": "523 mg",
            "label": "Sodyum"
          },
          {
            "value": "3 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %22",
          "Karbonhidrat %14",
          "Yağ %64"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki": {
      "ingredients": [
        {
          "group": "Hamur için"
        },
        {
          "name": "tam buğday unu",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "100 g",
          "unit": "gram",
          "substitutes": [
            "tam buğday unu — masabeeb daha koyu ve daha yoğun olur, suyu 20 ml artırın"
          ],
          "sponsor": ""
        },
        {
          "name": "instant kuru maya",
          "note": "",
          "quantity": "5 g",
          "unit": "gram",
          "substitutes": [
            "yaş maya — 15 g kullanılır ve önce ılık suyun içinde eritilir"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ılık su",
          "note": "",
          "quantity": "420 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı (tava için)",
          "note": "",
          "quantity": "5 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Servis için"
        },
        {
          "name": "sade yağ",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [
            "tereyağı — eritilip aynı miktarda gezdirilir, süt kokusu verir"
          ],
          "sponsor": ""
        },
        {
          "name": "bal",
          "note": "",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [
            "hurma pekmezi — Suudi sofrasında en çok bununla yenir, daha koyu ve daha az tatlıdır; aynı miktar"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "0",
      "chef": {
        "info": "Esma Çevik\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif14",
          "Takipçi17"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "14 Eylül 2026",
        "Son güncelleme: 14 Eylül 2026"
      ],
      "features": [
        {
          "label": "Kahvaltılık",
          "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
        },
        {
          "label": "Suudi Arabistan Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suudi-arabistan-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "453 kcal",
            "label": "Kalori"
          },
          {
            "value": "9.8 g",
            "label": "Protein"
          },
          {
            "value": "74.6 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "12.8 g",
            "label": "Yağ"
          },
          {
            "value": "6.4 g",
            "label": "Lif"
          },
          {
            "value": "19.2 g",
            "label": "Şeker"
          },
          {
            "value": "294 mg",
            "label": "Sodyum"
          },
          {
            "value": "6.6 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %9",
          "Karbonhidrat %66",
          "Yağ %25"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "3"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor": {
      "ingredients": [
        {
          "group": "İrimşik için"
        },
        {
          "name": "tam yağlı inek sütü",
          "note": "",
          "quantity": "3 l",
          "unit": "l",
          "substitutes": [
            "koyun sütü — bozkırda asıl kullanılan süttür, daha yağlı olur ve verim artar"
          ],
          "sponsor": ""
        },
        {
          "name": "ekşimiş tuzsuz ayran",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [
            "yoğurt — 300 g, 200 ml suyla açılır ve sütü aynı şekilde keser"
          ],
          "sponsor": ""
        },
        {
          "name": "limon suyu (süt kesilmezse)",
          "note": "",
          "quantity": "2 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tereyağı (tepsi için)",
          "note": "",
          "quantity": "10 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "6",
      "clapCount": "2",
      "chef": {
        "info": "İrem Akgül\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif12",
          "Takipçi18"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "30 Ağustos 2026",
        "Son güncelleme: 30 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Kahvaltılık",
          "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
        },
        {
          "label": "Atıştırmalık",
          "href": "https://dadagastro.com/tarifler/kategori/atistirmalik"
        },
        {
          "label": "Kazak Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=kazak-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Glutensiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
        },
        {
          "label": "Şeker İlavesiz",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "137 kcal",
            "label": "Kalori"
          },
          {
            "value": "7 g",
            "label": "Protein"
          },
          {
            "value": "11 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "7 g",
            "label": "Yağ"
          },
          {
            "value": "0 g",
            "label": "Lif"
          },
          {
            "value": "10 g",
            "label": "Şeker"
          },
          {
            "value": "100 mg",
            "label": "Sodyum"
          },
          {
            "value": "4 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %21",
          "Karbonhidrat %33",
          "Yağ %47"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Demir Yenice",
          "rating": null,
          "body": "Sütü keserken ekşi ayranı azar azar katmak gerekiyor, hepsini birden dökünce pıhtı iri ve sert oldu. Tepside kızartırken de sürekli karıştırmak lazım, dibi tutuyor. Tepsiyi tereyağıyla iyice yağlamak da gerekiyor, yağsız tepside lor dibe yapışıp kazımak zorunda kaldım.",
          "date": "1 ay önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi": {
      "ingredients": [
        {
          "group": "İrmik için"
        },
        {
          "name": "iri irmik",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [
            "ince irmik — daha pürüzsüz ve lapa gibi olur, kavurma süresini 3 dakika kısaltın"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "90 g",
          "unit": "gram",
          "substitutes": [
            "sadeyağ — daha yüksek sıcaklığa dayanır ve daha yoğun fındıksı kokar, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "group": "Şurup için"
        },
        {
          "name": "su",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "120 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "limon suyu",
          "note": "",
          "quantity": "5 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Üzeri için"
        },
        {
          "name": "taze beyaz peynir",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [
            "lor peyniri — daha yumuşak ve az tuzludur, aynı miktar",
            "süzme peynir — daha taneli ve nötrdür, üzerine bir tutam tuz serpin"
          ],
          "sponsor": ""
        },
        {
          "name": "tarçın",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "antep fıstığı",
          "note": "",
          "quantity": "20 g",
          "unit": "gram",
          "substitutes": [
            "ceviz içi — çok daha ekonomiktir, kabaca dövülerek serpilir"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "0",
      "chef": {
        "info": "Barlas Egeli\n                                                     Komi\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif10",
          "Takipçi4"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "21 Ağustos 2026",
        "Son güncelleme: 21 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Kahvaltılık",
          "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
        },
        {
          "label": "Suriye Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suriye-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "588 kcal",
            "label": "Kalori"
          },
          {
            "value": "14 g",
            "label": "Protein"
          },
          {
            "value": "68 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "29 g",
            "label": "Yağ"
          },
          {
            "value": "2 g",
            "label": "Lif"
          },
          {
            "value": "31 g",
            "label": "Şeker"
          },
          {
            "value": "419 mg",
            "label": "Sodyum"
          },
          {
            "value": "17 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %10",
          "Karbonhidrat %46",
          "Yağ %44"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [
        {
          "author": "Handan Turgutlu",
          "rating": null,
          "body": "İrmiği tereyağında kavururken renk açık kahve olmalı, erken şurup dökünce irmik çiğ kaldı. Şurubu sıcak irmiğe dökmek de gerekiyor, soğuk şurupla irmik şurubu içine çekmiyor ve tabakta ikisi ayrı duruyor.",
          "date": "1 ay önce",
          "badge": "",
          "likes": "0",
          "photos": [],
          "replies": []
        }
      ],
      "steps": [
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-adim2.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-adim4.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta": {
      "ingredients": [
        {
          "group": "Beze için"
        },
        {
          "name": "yumurta akı (oda sıcaklığında)",
          "note": "",
          "quantity": "6 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "fındık",
          "note": "",
          "quantity": "150 g",
          "unit": "gram",
          "substitutes": [
            "kaju — Kiev pastasının ilk tariflerindeki kuruyemiştir, daha yumuşak ve tatlıdır",
            "badem — daha kuru ve sert bir beze verir, kabuğu soyulmuş kullanın"
          ],
          "sponsor": ""
        },
        {
          "name": "un",
          "note": "",
          "quantity": "30 g",
          "unit": "gram",
          "substitutes": [
            "mısır nişastası — pasta glutensiz olur, beze biraz daha kırılgan çıkar"
          ],
          "sponsor": ""
        },
        {
          "name": "vanilin",
          "note": "",
          "quantity": "1 paket",
          "unit": "paket",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Krema için"
        },
        {
          "name": "tereyağı (oda sıcaklığında)",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "süt",
          "note": "",
          "quantity": "120 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "yumurta",
          "note": "",
          "quantity": "1 adet",
          "unit": "adet",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "200 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "kakao",
          "note": "",
          "quantity": "1 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [
            "eritilmiş bitter çikolata — 30 g, kremayı daha koyu ve yoğun yapar"
          ],
          "sponsor": ""
        },
        {
          "name": "vanilin",
          "note": "",
          "quantity": "1 paket",
          "unit": "paket",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "group": "Üzeri için"
        },
        {
          "name": "fındık (kenar için)",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pudra şekeri",
          "note": "",
          "quantity": "1 yemek kaşığı",
          "unit": "yemek-kasigi",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "2",
      "clapCount": "5",
      "chef": {
        "info": "İlker Bozkurt\n                                                     Mutfak Meraklısı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif2",
          "Takipçi4"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "30 Ağustos 2026",
        "Son güncelleme: 30 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Kek ve Pasta",
          "href": "https://dadagastro.com/tarifler/kategori/kek-ve-pasta"
        },
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Ukrayna Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=ukrayna-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Premium (₺₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "428 kcal",
            "label": "Kalori"
          },
          {
            "value": "6 g",
            "label": "Protein"
          },
          {
            "value": "44 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "27 g",
            "label": "Yağ"
          },
          {
            "value": "2 g",
            "label": "Lif"
          },
          {
            "value": "40 g",
            "label": "Şeker"
          },
          {
            "value": "40 mg",
            "label": "Sodyum"
          },
          {
            "value": "12 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %5",
          "Karbonhidrat %40",
          "Yağ %55"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": []
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma": {
      "ingredients": [
        {
          "group": "Hamur için"
        },
        {
          "name": "buğday unu",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "150 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "tuz",
          "note": "",
          "quantity": "4 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "zeytinyağı",
          "note": "",
          "quantity": "20 ml",
          "unit": "ml",
          "substitutes": [
            "ayçiçek yağı — daha nötr kalır, hamurun kokusu yalnız undan gelir"
          ],
          "sponsor": ""
        },
        {
          "group": "İrmik kreması için"
        },
        {
          "name": "ince irmik",
          "note": "",
          "quantity": "80 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "süt",
          "note": "",
          "quantity": "400 ml",
          "unit": "ml",
          "substitutes": [
            "badem sütü — laktozsuz olur, krema biraz daha az kremamsı çıkar"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "60 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "gül suyu",
          "note": "",
          "quantity": "10 ml",
          "unit": "ml",
          "substitutes": [
            "portakal çiçeği suyu — daha narenciyeli ve az çiçeksidir, aynı miktar"
          ],
          "sponsor": ""
        },
        {
          "group": "Kızartma ve üzeri için"
        },
        {
          "name": "ayçiçek yağı (kızartmak için)",
          "note": "",
          "quantity": "600 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "pudra şekeri",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "1",
      "clapCount": "0",
      "chef": {
        "info": "Ece Ekici\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif44",
          "Takipçi27"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "22 Ağustos 2026",
        "Son güncelleme: 22 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Suriye Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suriye-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Ekonomik (₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "262 kcal",
            "label": "Kalori"
          },
          {
            "value": "5 g",
            "label": "Protein"
          },
          {
            "value": "37 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "10 g",
            "label": "Yağ"
          },
          {
            "value": "1 g",
            "label": "Lif"
          },
          {
            "value": "12 g",
            "label": "Şeker"
          },
          {
            "value": "177 mg",
            "label": "Sodyum"
          },
          {
            "value": "2 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %8",
          "Karbonhidrat %57",
          "Yağ %35"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "2"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim1.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim2.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim4.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim5.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma-adim6.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi": {
      "ingredients": [
        {
          "group": "Tatlı için"
        },
        {
          "name": "tel kadayıf",
          "note": "",
          "quantity": "500 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "iri dövülmüş ceviz içi",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [
            "Antep fıstığı içi — rengi ve tadı canlanır, maliyeti artar",
            "iç fındık — kavrulup zarı alınarak kullanılır, daha tatlı durur"
          ],
          "sponsor": ""
        },
        {
          "name": "tereyağı",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [
            "sadeyağ — teller daha çıtır olur ve alt kat daha iyi kızarır",
            "margarin — daha ekonomiktir ancak tereyağının kokusunu vermez"
          ],
          "sponsor": ""
        },
        {
          "group": "Şerbet için"
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "650 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "550 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "limon suyu",
          "note": "",
          "quantity": "5 ml",
          "unit": "ml",
          "substitutes": [
            "elma sirkesi — aynı miktarda kullanılır, şerbetin şekerlenmesini aynı şekilde engeller"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "4",
      "clapCount": "1",
      "chef": {
        "info": "Ahmet Örge\n                                                     Hat Aşçısı\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif66",
          "Takipçi22"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "14 Ağustos 2026",
        "Son güncelleme: 14 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "371 kcal",
            "label": "Kalori"
          },
          {
            "value": "4 g",
            "label": "Protein"
          },
          {
            "value": "46 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "19 g",
            "label": "Yağ"
          },
          {
            "value": "2 g",
            "label": "Lif"
          },
          {
            "value": "28 g",
            "label": "Şeker"
          },
          {
            "value": "60 mg",
            "label": "Sodyum"
          },
          {
            "value": "7 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %4",
          "Karbonhidrat %50",
          "Yağ %46"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-adim2.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-adim4.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi-adim5.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    },
    "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi": {
      "ingredients": [
        {
          "group": "Tatlı için"
        },
        {
          "name": "yufka",
          "note": "",
          "quantity": "400 g",
          "unit": "gram",
          "substitutes": [
            "baklavalık yufka — daha ince olduğu için iki kat kullanın, sonuç daha çıtır olur"
          ],
          "sponsor": ""
        },
        {
          "name": "iri dövülmüş ceviz içi",
          "note": "",
          "quantity": "250 g",
          "unit": "gram",
          "substitutes": [
            "iç fındık — kavrulup zarı alınarak kullanılır, daha tatlı durur",
            "Antep fıstığı içi — rengi ve tadı canlandırır, maliyeti yükselir"
          ],
          "sponsor": ""
        },
        {
          "name": "toz şeker (iç için)",
          "note": "",
          "quantity": "40 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "toz tarçın",
          "note": "",
          "quantity": "3 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "ayçiçek yağı (kızartmak için)",
          "note": "",
          "quantity": "500 ml",
          "unit": "ml",
          "substitutes": [
            "mısırözü yağı — aynı sıcaklığa dayanır, tadı daha nötrdür"
          ],
          "sponsor": ""
        },
        {
          "group": "Şerbet için"
        },
        {
          "name": "toz şeker",
          "note": "",
          "quantity": "600 g",
          "unit": "gram",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "su",
          "note": "",
          "quantity": "550 ml",
          "unit": "ml",
          "substitutes": [],
          "sponsor": ""
        },
        {
          "name": "limon suyu",
          "note": "",
          "quantity": "5 ml",
          "unit": "ml",
          "substitutes": [
            "elma sirkesi — aynı miktarda kullanılır, şerbetin şekerlenmesini aynı şekilde engeller"
          ],
          "sponsor": ""
        }
      ],
      "gallery": [
        "https://dadagastro.com/varliklar/media/yayilim/t-muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi-kapak.webp"
      ],
      "badges": [],
      "made": "",
      "madeCount": "3",
      "clapCount": "1",
      "chef": {
        "info": "Ece Örge\n                                                     Kıdemli Yamak\n                                                    2026'dan beri üye",
        "meta": [
          "Tarif40",
          "Takipçi21"
        ],
        "bio": "",
        "subscription": false
      },
      "dates": [
        "13 Ağustos 2026",
        "Son güncelleme: 13 Ağustos 2026"
      ],
      "features": [
        {
          "label": "Tatlı",
          "href": "https://dadagastro.com/tarifler/kategori/tatli"
        },
        {
          "label": "Türk Mutfağı",
          "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
        },
        {
          "label": "Vejetaryen",
          "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
        },
        {
          "label": "Orta Bütçe (₺₺)",
          "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
        }
      ],
      "nutrition": {
        "notice": "Değerler tahminidir",
        "cells": [
          {
            "value": "255 kcal",
            "label": "Kalori"
          },
          {
            "value": "3 g",
            "label": "Protein"
          },
          {
            "value": "36 g",
            "label": "Karbonhidrat"
          },
          {
            "value": "11 g",
            "label": "Yağ"
          },
          {
            "value": "1 g",
            "label": "Lif"
          },
          {
            "value": "22 g",
            "label": "Şeker"
          },
          {
            "value": "65 mg",
            "label": "Sodyum"
          },
          {
            "value": "1 g",
            "label": "Doymuş Yağ"
          }
        ],
        "macros": [
          "Protein %5",
          "Karbonhidrat %56",
          "Yağ %39"
        ]
      },
      "skills": [],
      "related": [],
      "similar": [],
      "reviewSummary": {
        "recommend": "%100'si tavsiye ediyor",
        "distribution": [
          {
            "star": "5",
            "count": "1"
          },
          {
            "star": "4",
            "count": "0"
          },
          {
            "star": "3",
            "count": "0"
          },
          {
            "star": "2",
            "count": "0"
          },
          {
            "star": "1",
            "count": "0"
          }
        ]
      },
      "reviews": [],
      "steps": [
        {
          "images": []
        },
        {
          "images": []
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi-adim3.webp"
          ]
        },
        {
          "images": [
            "/varliklar/media/yayilim/t-muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi-adim4.webp"
          ]
        }
      ],
      "video": "",
      "audio": "",
      "madePhotos": [],
      "commentsEnabled": true,
      "altReviewCount": ""
    }
  }
};
// Reuse the web's related-card photograph when the detail snapshot has no hero URL.
for(const w of Object.values(PARITY.recipes))for(const related of w.similar||[]){const r=DATA.recipes.find(r=>related.url.includes(r.slug));if(r&&!r.image)r.image=absoluteMedia(related.image);}
const UNIT_MAP = {"su-bardagi":["1 su bardağı ≈ 200 ml","Un ile ≈ 130 g","Sıvı ile ≈ 200 g"],"cay-bardagi":["1 çay bardağı ≈ 100 ml"],"cay-kasigi":["1 çay kaşığı ≈ 5 ml","Tuz ile ≈ 6 g"],"tatli-kasigi":["1 tatlı kaşığı ≈ 10 ml","Toz baharat ile ≈ 7 g"],"yemek-kasigi":["1 yemek kaşığı ≈ 15 ml"]};
const $ = (s, root = document) => root.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS = {"home": "house", "bowl": "bowl-food", "wand": "wand-magic-sparkles", "book": "bookmark", "user": "user", "search": "magnifying-glass", "bell": "bell", "arrow": "arrow-right", "back": "arrow-left", "clock": "clock", "star": "star", "gauge": "gauge-simple", "fridge": "basket-shopping", "filter": "sliders", "close": "xmark", "plus": "plus", "minus": "minus", "fire": "fire-burner", "check": "check", "utensils": "utensils", "leaf": "book-open", "grid": "table-cells-large", "list": "list", "share": "share-nodes", "pause": "pause", "play": "play", "reset": "rotate-left", "more": "ellipsis", "cart": "cart-plus", "swap": "shuffle", "info": "circle-info", "down": "chevron-down", "eye": "eye", "like": "thumbs-up", "print": "print", "menu": "bars", "mic": "microphone", "flag": "flag", "clap": "hands-clapping", "camera": "camera", "lock": "lock", "up": "arrow-up", "wallet": "wallet"};
function icon(name){return `<i class="icon fa-solid fa-${ICONS[name]||ICONS.bowl}" aria-hidden="true"></i>`;}
const photo = (url, extra='') => `<div class="photo ${extra}" data-photo-src="${esc(absoluteMedia(url))}" role="img" aria-label="Yemek fotoğrafı"></div>`;
const params = new URLSearchParams(location.search);
const page = document.body.dataset.page;
const link = r => `tarif-detay.html?tarif=${encodeURIComponent(r.slug)}&donus=${encodeURIComponent(location.pathname.split('/').pop()+location.search)}`;
let saved; try{saved=JSON.parse(localStorage.getItem('dadagastro-prototype-saved')||'[]');if(!Array.isArray(saved))saved=[];}catch{saved=[];}
function saveButton(r,extra=''){return `<button type="button" class="save ${extra}" data-save="${esc(r.slug)}" aria-label="${saved.includes(r.slug)?'Kaydı kaldır':'Tarifi kaydet'}" aria-pressed="${saved.includes(r.slug)}">${icon('book',!saved.includes(r.slug))}</button>`;}
function rating(r){return r.rating?`<span class="rating">${icon('star')} ${Number(r.rating).toFixed(1).replace('.',',')}</span>`:'';}

function nav(){return `<div class="nav-dock"><nav class="bottom-nav" aria-label="Alt menü">${[['home','Ana Sayfa','index.html',page==='index'],['bowl','Tarifler','tarifler.html',page!=='index'],['wand','Ne Pişirsem','',false],['leaf','Mutfak Sırları','',false],['user','Profil','',false]].map(([i,t,url,active],n)=>`<a href="${url}" class="nav-item ${active?'active':''} ${n===2?'center':''}" ${active?'aria-current="page"':''} ${t==='Profil'?'data-profile-menu':''}>${n===2?`<span class="fab">${icon(i)}</span>`:icon(i)}<span>${t}</span></a>`).join('')}</nav></div>`;}
function renderTop(title){return `<header class="topbar"><a class="brand-logo" href="index.html" aria-label="DadaGastro ana sayfa"><img src="assets/marka/dadagastro-${'beyaz'}.svg" alt="DadaGastro"></a>${title?`<span class="top-title">${title}</span>`:''}<div class="top-actions"><a class="icon-button" href="" aria-label="Bildirimler">${icon('bell')}</a><button class="icon-button" data-site-menu aria-label="Menü">${icon('menu')}</button></div></header>`;}
function search(value='',id='search'){return `<form class="search-box" role="search" action="tarifler.html">${icon('search')}<input type="search" id="${id}" name="q" aria-label="Tarif ara" placeholder="Tarif adı ara… (ör. mercimek çorbası)" inputmode="search" value="${esc(value)}" autocomplete="off"><button type="button" class="search-clear" aria-label="Aramayı temizle" data-search-clear>${icon('close')}</button></form>`;}
function sectionHead(title,href='',label='Tümünü gör'){return `<div class="section-head"><h2>${title}</h2><a href="${href}">${label} ${icon('arrow')}</a></div>`;}
function shortTitle(r){return r.title.split('|')[0].trim();}
function cost(r){return r.cost?`<span class="cost" aria-label="Maliyet ${r.cost} / 3">${[1,2,3].map(n=>`<span class="${n<=r.cost?'on':'off'}">₺</span>`).join('')}</span>`:'';}
function card(r){const w=recipeInfo(r),subtitle=r.title.includes('|')?r.title.split('|').slice(1).join('|').trim():'';return `<article class="recipe-card"><div class="card-media"><a class="card-visual" href="${link(r)}" aria-label="${esc(r.title)}">${photo(r.image,'card-photo')}<span class="card-image-shade"></span><div class="photo-meta">${photoMeta(r)}</div></a>${saveButton(r,'card-save')}</div><div class="card-body"><a class="card-copy" href="${link(r)}"><span class="card-category" title="${esc(r.category)}">${esc(r.category)}</span><h3 title="${esc(shortTitle(r))}">${esc(shortTitle(r))}</h3><span class="card-subtitle" title="${esc(subtitle)}">${esc(subtitle)}</span></a><div class="card-secondary"><span>${esc(r.difficulty||'—')}</span><span>${r.servings} ${esc(r.unit)}</span>${cost(r)}</div>${w.badges?.length?`<div class="card-badges">${w.badges.map(esc).join(' · ')}</div>`:''}<div class="card-footer"><a href="" class="card-author-row"><span class="avatar avatar-card">${esc(r.author[0])}</span><span title="${esc(r.author)}">${esc(r.author)}</span></a>${r.views!=null?`<span class="card-views" aria-label="${r.views} görüntülenme">${icon('eye')} ${r.views}</span>`:''}</div></div></article>`;}
function photoMeta(r){return `<span>${icon('clock')} ${r.minutes} dk</span>${r.rating?`<span>${icon('star')} ${Number(r.rating).toFixed(1).replace('.',',')}</span>`:''}`;}
function recipeMeta(r){return `<div class="recipe-meta"><span>${icon('clock')} ${r.minutes} dk</span>${rating(r)}${cost(r)}</div>`;}
function editorialHero(r,label='',extra=''){return `<article class="editorial-hero ${extra}"><a href="${link(r)}" class="hero-link" aria-label="${esc(r.title)}">${photo(r.image,'editorial-photo')}<div class="hero-shade"></div></a>${label?`<span class="hero-kicker">${esc(label)}</span>`:''}<div class="hero-copy"><span class="eyebrow">${esc(r.category)}</span><h2><a href="${link(r)}">${esc(shortTitle(r))}</a></h2>${r.title.includes('|')?`<span class="card-subtitle">${esc(r.title.split('|')[1].trim())}</span>`:''}<div class="photo-meta">${photoMeta(r)}</div><div class="card-detail-meta"><span>${esc(r.difficulty||'—')}</span><span>${r.servings} ${esc(r.unit)}</span>${cost(r)}${r.views!=null?`<span>${icon('eye')} ${r.views}</span>`:''}</div><a href="" class="card-author-row"><span class="avatar avatar-card">${esc(r.author[0])}</span><span>${esc(r.author)}</span></a></div>${saveButton(r,'card-save')}</article>`;}
function home(){const day=DATA.recipes.find(r=>r.slug===DATA.daySlug)||DATA.recipes[0];return `${renderTop()}<main class="home-editorial home-v3">
<section class="signature-hero" style="--hero-photo:url('${WEB.hero}')"><div class="signature-content"><span class="eyebrow">HERKESİN BİR TABAĞI VAR</span><h1>Ne <em>pişirsem?</em></h1><p>${esc(WEB.description)}</p><div class="hero-search-card"><div class="hero-tabs segmented" role="tablist" aria-label="Tarif bul"><button role="tab" data-search-mode="tarif" aria-selected="true">Tarif Ara</button><button role="tab" data-search-mode="malzeme" aria-selected="false">Malzemeye Göre</button><button role="tab" data-search-mode="oner" aria-selected="false">Ne Pişirsem</button></div><form id="homeSearch" action="tarifler.html" class="hero-search-row"><input name="q" aria-label="Tarif adı ara" placeholder="Tarif adı ara… (ör. mercimek çorbası)" type="search" inputmode="search" autocomplete="off"><button type="button" class="search-clear" aria-label="Aramayı temizle" data-search-clear hidden>${icon('close')}</button><button type="button" class="voice-input icon-button" aria-label="Sesli arama" data-voice="homeSearch">${icon('mic')}</button><button class="icon-button" aria-label="Ara">${icon('arrow')}</button></form></div></div><div class="popular-rail"><span>Popüler</span>${['zeytinyağlı','kahvaltılık','vegan','fırın','misafir yemeği'].map(t=>`<a href="tarifler.html?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</div><div class="signature-stats">${WEB.stats.map(s=>`<div><b>${s.value}</b><span>${s.label}</span></div>`).join('')}</div></section>
<div class="content-panel home-content-panel"><section class="home-block categories-block reveal"><div class="block-heading"><div><span class="eyebrow">Kategoriler</span><h2>Kategoriler & Dünya Mutfakları</h2></div><a href="tarifler.html" class="see-all" aria-label="Tüm tarifler">Tamamını Gör ${icon('arrow')}</a></div><div class="edge-rail category-rail">${WEB.categories.map(c=>`<a class="category-tile" href="tarifler.html?kategori=${encodeURIComponent(c.name)}">${c.image?photo(c.image):`<div class="photo category-placeholder">${icon('utensils')}</div>`}<b>${esc(c.name)}</b><small>${esc(c.count)}</small></a>`).join('')}</div></section>
<section class="home-block featured-block reveal"><div class="block-heading"><div><span class="eyebrow">Tariflerimiz</span><h2>Bu hafta öne çıkanlar</h2></div><a href="tarifler.html" class="see-all" aria-label="Tüm tarifler">Tamamını Gör ${icon('arrow')}</a></div><div class="edge-rail hero-track">${DATA.recipes.slice(0,8).map(r=>editorialHero(r,'','weekly-card')).join('')}</div></section>
<section class="home-block fridge-block reveal"><span class="eyebrow">Dolapta Ne Var?</span><h2>Tarif bul —<br>elindekiyle</h2><p>Malzemelerini seç, sana uygun tarifleri saniyeler içinde bulalım.</p><div class="fridge-chips"><span>Tuz</span><span>Zeytinyağı</span><span>Su</span><span>+1777 malzeme</span></div><a class="text-link" href="">Dolapta Ne Var? ${icon('arrow')}</a></section>
<section class="home-block day-block reveal"><div class="block-heading"><div><span class="eyebrow">Günün Tarifi</span><h2>${esc(shortTitle(day))}</h2></div></div>${editorialHero(day,'','day-feature')}</section>
<section class="home-block knowledge-block reveal"><span class="eyebrow">Mutfak Sırları</span><h2>Mutfağa Giriş & Püf Noktaları</h2><div class="knowledge-tabs segmented segmented-dark" role="tablist" aria-label="Mutfak Sırları"><button data-knowledge="lessons" role="tab" aria-selected="true">Mutfağa Giriş</button><button data-knowledge="tips" role="tab" aria-selected="false">Püf Noktaları</button></div><div id="lessons" role="tabpanel">${WEB.lessons.map((l,i)=>`<a href="" class="lesson"><span>${String(i+1).padStart(2,'0')}</span><div><h3>${esc(l.title)}</h3><small>${esc(l.info)}</small></div>${icon('arrow')}</a>`).join('')}</div><div id="tips" role="tabpanel" hidden><div class="edge-rail tip-rail">${WEB.tips.map(t=>`<a href="" class="web-tip">${photo(t.image)}<h3>${esc(t.title)}</h3><small>${esc(t.reads)}</small></a>`).join('')}</div></div><a href="" class="text-link">Tamamını Gör ${icon('arrow')}</a></section>
<section class="home-block pro-block reveal"><span class="eyebrow">Pro</span><h2>Haftanı tek<br>ekranda planla</h2><p>Öğünlerini hafta görünümünde kur; alışveriş listen menünden tek tıkla çıksın.</p><a class="text-link" href="">Menünü Planla ${icon('arrow')}</a></section>
<section class="home-block video-block reveal"><div class="block-heading"><div><span class="eyebrow">İzle & Pişir</span><h2>En lezzetli videolar</h2></div><a href="" class="see-all" aria-label="Tüm videolar">Tamamını Gör ${icon('arrow')}</a></div><div class="edge-rail video-rail">${WEB.videos.map(v=>`<a href="" class="web-video"><div class="video-picture">${photo(v.image)}<span class="video-play">${icon('play')}</span><span class="video-duration">${esc(v.time)}</span></div><h3>${esc(v.title)}</h3><small>${esc(v.views)} izlenme</small></a>`).join('')}</div></section>
<section class="home-block authors-block reveal"><div class="block-heading"><div><span class="eyebrow">Şefler & Yazarlar</span><h2>Şefler & Yazarlar</h2></div><a href="" class="see-all" aria-label="Tüm şefler">Tamamını Gör ${icon('arrow')}</a></div><div class="edge-rail authors-rail">${WEB.chefs.map(c=>`<article class="web-chef"><a href=""><div class="avatar">${esc(c.name[0])}</div><h3>${esc(c.name)}</h3><small>${esc(c.count)}</small></a><a href="" data-auth="Şefi takip et" class="follow-link">${icon('plus')} Takip Et</a></article>`).join('')}<a href="" class="chef-join">${icon('plus')}<b>Sen de Şef Ol</b><small>Tarifini paylaş, rozetini kazan</small></a></div></section>
<section class="home-block community-block reveal"><span class="eyebrow">Topluluğa Katıl</span><h2>Senin de<br>bir tarifin var</h2><p>Tariflerini paylaş, denendikçe puan topla, mutfak defterini herkesle buluştur.</p><a href="" class="button">${icon('plus')} Tarifini Paylaş</a></section></div></main>${nav()}`;}

let query=params.get('q')||'',category=params.get('kategori')||'',difficulty=params.get('zorluk')||'',duration=params.get('sure')||'',sort=params.get('sirala')||'onerilen';
let listView=params.get('gorunum')==='liste'?'liste':'grid';
let pantryIngredients=(params.get('malzeme')||'').split(',').filter(Boolean);
let facetState=Object.fromEntries(PARITY.list.groups.map(g=>[g.key,[...params.entries()].filter(([k])=>k.startsWith(g.key+'[')).map(([,v])=>v)])),resultPage=Number(params.get('sayfa'))||1;
function facetLabel(key,value){return PARITY.list.groups.find(g=>g.key===key)?.options.find(o=>o.value===value)?.label.replace(/\s+[\d.]+$/,'')||value;}
function facetSheet(){return `<form id="filterForm"><label for="sort">Sıralama</label><select id="sort"><option value="onerilen">Önerilen</option><option value="en_yeni">En Yeni</option><option value="en_cok_puanlanan">En Çok Puanlanan</option><option value="en_hizli">En Hızlı</option></select><div hidden><select id="duration"><option value=""></option></select><select id="difficulty"><option value=""></option></select></div>${PARITY.list.groups.map((g,i)=>`<details class="facet-group" ${i===0?'open':''}><summary>${esc(g.label)}<span>${icon('down')}</span></summary><div class="facet-options">${g.options.map((o,n)=>`<label ${n>=8?'class="facet-extra" hidden':''}><input type="checkbox" name="${esc(g.key)}" value="${esc(o.value)}"><span>${esc(o.label.replace(/\s+[\d.]+$/,''))}</span><small title="Webdeki tarif sayısı">${esc(o.label.match(/[\d.]+$/)?.[0]||'')}</small></label>`).join('')}${g.options.length>8?`<button type="button" class="text-link" data-facet-more>${g.options.length-8} seçenek daha ${icon('down')}</button>`:''}</div></details>`).join('')}<div class="sheet-actions facet-footer"><button type="button" class="button secondary" id="resetFilters">Temizle</button><button class="button">Tarifleri göster</button></div></form>`;}
function list(){return `${renderTop()}<main class="list-editorial">${listBanner()}<div class="list-tools content-panel">${search(query)}<div class="chips" aria-label="Kategoriler">${['',...WEB.categories.map(c=>c.name)].map(c=>`<button class="chip ${category===c?'active':''}" data-category="${esc(c)}" aria-pressed="${category===c}">${esc(c||'Tümü')}</button>`).join('')}</div></div><div class="list-content"><details class="theme-expander"><summary>Tema & pişirme tipi ${icon('down')}</summary><div class="metadata-chips">${PARITY.list.themes.map((t,i)=>`<button class="chip" data-theme="${i}">${esc(t.label)} <small>${esc(t.count)}</small></button>`).join('')}</div></details><div class="result-bar"><div><p id="resultCount" role="status"></p><button class="filter-button" id="openFilters">${icon('filter')} Filtrele / Sırala <span id="filterBadge"></span></button></div><div class="view-toggle segmented" role="group" aria-label="Görünüm"><button data-view="grid" aria-label="Izgara görünümü" aria-pressed="${listView==='grid'}">${icon('grid')}</button><button data-view="liste" aria-label="Liste görünümü" aria-pressed="${listView==='liste'}">${icon('list')}</button></div></div><div id="activeFacets" class="active-facets"></div><div id="pantryFilter"></div><div class="recipe-list" id="results"></div><nav id="pagination" aria-label="Tarif sayfaları"></nav><a href="" class="list-fridge-link"><b>Ne pişireceğine karar veremedin mi?</b><span>Dolabındaki malzemeleri seç, sana uygun tarifleri bulalım.</span><strong>Dolapta Ne Var? ${icon('arrow')}</strong></a></div></main>${nav()}<dialog class="sheet" id="filters" aria-labelledby="filterTitle"><div class="handle"></div><div class="sheet-head"><h2 id="filterTitle">Filtreler</h2><button class="icon-button" id="closeFilters" aria-label="Filtreleri kapat">${icon('close')}</button></div>${facetSheet()}</dialog>`;}
function syncQuery(){const p=new URLSearchParams();for(const [key,value] of Object.entries({q:query,kategori:category,zorluk:difficulty,sure:duration,sirala:sort==='onerilen'?'':sort,gorunum:listView==='liste'?'liste':'',malzeme:pantryIngredients.join(','),sayfa:resultPage>1?resultPage:''}))if(value)p.set(key,value);for(const [k,vs] of Object.entries(facetState))for(const v of vs)p.append(k+'[]',v);history.replaceState(null,'','tarifler.html'+(p.size?'?'+p:''));}
function matchesFacet(r,key,values){if(!values.length)return true;const w=recipeInfo(r);if(w.facets?.[key])return values.some(v=>w.facets[key].includes(v));if(key==='butce')return values.includes(String(r.cost));if(key==='zorluk')return values.some(v=>facetLabel(key,v)===r.difficulty);if(key==='sure'){return values.some(v=>{const ranges={'15':[0,15],'15-30':[15,30],'30-45':[30,45],'45-60':[45,60],'60-120':[60,120],'120':[120,Infinity]},range=ranges[v];return range&&r.minutes>=range[0]&&r.minutes<range[1]})}if(key==='kategori')return values.some(v=>facetLabel(key,v)===r.category);return w.features?.some(f=>{const q=new URL(f.href,'https://dadagastro.com').searchParams;return [...q].some(([k,v])=>k.startsWith(key)&&values.includes(v))})||false;}
function filteredRecipes(facets=facetState,selectedCategory=category,selectedDifficulty=difficulty,selectedDuration=duration){return DATA.recipes.filter(r=>(!query||r.title.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))||r.web?.tags?.some(t=>t.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))))&&(!selectedCategory||r.category===selectedCategory)&&(!selectedDifficulty||r.difficulty===selectedDifficulty)&&(!selectedDuration||r.minutes<=Number(selectedDuration))&&pantryIngredients.every(s=>r.ingredients.some(i=>i.name.toLocaleLowerCase('tr').includes(s.toLocaleLowerCase('tr'))))&&Object.entries(facets).every(([k,v])=>matchesFacet(r,k,v)));}
function renderResults(){let rs=filteredRecipes();if(sort==='en_hizli')rs.sort((a,b)=>a.minutes-b.minutes);if(sort==='en_cok_puanlanan'||sort==='puan')rs.sort((a,b)=>Number(b.rating)-Number(a.rating));if(sort==='en_yeni')rs.sort((a,b)=>recipeDate(b)-recipeDate(a));const total=rs.length,pages=Math.ceil(total/8);resultPage=Math.max(1,Math.min(resultPage,pages||1));rs=rs.slice((resultPage-1)*8,resultPage*8);$('#resultCount').innerHTML=`<b>${total} tarif</b> bulundu`;const results=$('#results');results.inert=false;results.removeAttribute('aria-busy');results.className='recipe-list '+(listView==='liste'?'is-list':'is-grid');results.innerHTML=rs.length?editorialHero(rs[0],'','list-feature')+`<div class="results-grid">${rs.slice(1).map(card).join('')}</div>`:`<div class="empty">${icon('search')}<h2>Tarif bulunamadı</h2><p>Bu arama ve filtrelere uygun tarif yok. Seçimlerini temizleyip yeniden keşfet.</p><button class="button" data-clear>Tümünü Temizle</button></div>`;$('#pantryFilter').innerHTML=pantryIngredients.length?`<button class="pantry-filter" data-clear-pantry>${icon('fridge')} ${esc(pantryIngredients.join(' + '))} ${icon('close')}</button>`:'';document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category)});document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===listView));$('#activeFacets').innerHTML=Object.entries(facetState).flatMap(([k,vs])=>vs.map(v=>`<button class="chip" data-remove-facet="${esc(k)}" data-value="${esc(v)}">${esc(facetLabel(k,v))} ${icon('close')}</button>`)).join('');const count=Object.values(facetState).flat().length;$('#filterBadge').textContent=count||'';$('#pagination').innerHTML=pages>1?Array.from({length:pages},(_,i)=>`<button data-page-number="${i+1}" class="chip" ${resultPage===i+1?'aria-current="page"':''}>${i+1}</button>`).join(''):'';syncQuery();prepareInputFrames();queueMicrotask(()=>{applyProse(results);updateListBanner();});}
function recipeDate(r){const months=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];const t=recipeInfo(r).dates?.[0]?.split(' ');return t?new Date(Number(t[2]),months.indexOf(t[1]),Number(t[0])).getTime():0;}

function loading(){const results=$('#results');$('#resultCount').textContent='Tarifler yükleniyor';if(!results.querySelector('.recipe-card')){const samples=DATA.recipes.slice(0,8);results.className='recipe-list '+(listView==='liste'?'is-list':'is-grid');results.innerHTML=editorialHero(samples[0],'','list-feature')+`<div class="results-grid">${samples.slice(1).map(card).join('')}</div>`;}results.classList.add('is-loading');results.setAttribute('aria-busy','true');results.inert=true;}

let recipe,scale=1;
function authButton(label,action=label,extra=''){return `<button type="button" class="${extra}" data-auth="${esc(action)}">${label}</button>`;}
function recipeInfo(r){return PARITY.recipes[r.slug]||{};}
function featureLink(f){const u=new URL(f.href,'https://dadagastro.com');const q=new URLSearchParams(u.search);if(u.pathname.includes('/kategori/')){const name=WEB.categories.find(c=>c.name===f.label)?.name||f.label;return 'tarifler.html?kategori='+encodeURIComponent(name)}return 'tarifler.html?'+q;}
function detail(){recipe=DATA.recipes.find(r=>r.slug===(params.get('tarif')||DATA.recipes[0].slug));if(!recipe)return `${renderTop('Tarif bulunamadı')}<main class="section"><div class="empty"><h2>Tarif bulunamadı</h2><a href="tarifler.html" class="button">Tariflere dön</a></div></main>`;const r=recipe,w=recipeInfo(r),ret=params.get('donus'),back=ret&&/^(index|tarifler)\.html(?:\?|$)/.test(ret)?ret:'tarifler.html';document.title=r.title+' · DadaGastro';let ingredientIndex=0;return `<header class="topbar detail-header"><a href="${esc(back)}" class="icon-button" aria-label="Geri dön">${icon('back')}</a><span class="compact-title">${esc(shortTitle(r))}</span><div class="detail-header-actions">${saveButton(r,'header-save')}<button class="icon-button" id="shareRecipe" aria-label="Paylaş">${icon('share')}</button><button class="icon-button" data-recipe-more aria-label="Diğer tarif işlemleri">${icon('more')}</button></div></header>
<main class="detail-editorial"><section class="detail-hero"><button class="hero-gallery-open" data-gallery="cover" aria-label="Tarif fotoğraflarını büyüt">${photo(r.image,'parallax-photo')}</button><div class="detail-shade"></div><div class="detail-cover-copy"><a href="tarifler.html?kategori=${encodeURIComponent(r.category)}" class="eyebrow">${esc(r.category)}</a><h1>${esc(shortTitle(r))}</h1>${r.title.includes('|')?`<p>${esc(r.title.split('|')[1].trim())}</p>`:''}<div class="detail-cover-meta"><a href="#yorumlar">${rating(r)} · ${r.ratingCount} değerlendirme</a>${cost(r)}${w.badges?.map(t=>`<span>${esc(t)}</span>`).join('')||''}</div></div></section>
<div class="detail-main content-panel" id="recipeBody"><div class="sheet-grip"></div><div class="recipe-facts"><div><span>${icon('clock')} Toplam süre</span><b>${r.minutes}<small> dk</small></b><small>${esc(r.web?.facts?.find(x=>x.startsWith('Hazırlık'))?.replace('Hazırlık + Pişirme','')||'')}</small></div><div><span>${icon('gauge')} Zorluk</span><b>${esc(r.difficulty)}</b><small aria-hidden="true"></small></div><div><span>${icon('utensils')} Porsiyon</span><b><span data-portions>${r.servings}</span> <small>${esc(r.unit)}</small></b><small aria-hidden="true"></small></div></div>
<div class="author-row"><a href="" class="avatar-link" aria-label="Şef profili"><span class="avatar">${esc(r.author[0])}</span></a><a href="" class="author-name">${esc(r.author)}</a>${authButton(icon('plus')+' Takip Et','Şefi takip et','follow-link')}${r.views!=null?`<span class="detail-views">${icon('eye')} ${r.views}</span>`:''}</div><div class="description-wrap"><p class="subtitle" id="recipeDescription">${esc(r.description)}</p><button class="read-more" aria-expanded="false" data-description>Daha fazla ${icon('down')}</button></div>
<section class="detail-block ingredient-section"><div class="ingredient-heading"><h2>Malzemeler</h2>${authButton(icon('cart'),'Tüm malzemeleri alışveriş listeme ekle','icon-button')}</div><div class="portion-panel"><div><b>Porsiyon</b><span><span id="scaleLabel">1×</span> · ${r.ingredients.length} malzeme</span></div><div class="stepper" aria-label="Porsiyon ayarı"><button id="less" aria-label="Porsiyonu azalt">${icon('minus')}</button><output id="portions" aria-live="polite">${r.servings}</output><button id="more" aria-label="Porsiyonu artır">${icon('plus')}</button></div></div><div class="ingredient-progress"><div><span><span data-portions>${r.servings}</span> ${esc(r.unit)} için</span><output id="ingredientStatus" aria-live="polite">0 / ${r.ingredients.length} hazır</output></div><progress id="ingredientProgress" max="${r.ingredients.length}" value="0" aria-label="Hazır malzemeler"></progress></div><ul class="ingredients">${(w.ingredients?.length?w.ingredients:r.ingredients).map(i=>{if(i.group)return `<li class="ingredient-group">${esc(i.group)}</li>`;const n=ingredientIndex++,ing=r.ingredients[n]||i,displayName=i.note&&ing.name.endsWith(i.note)?ing.name.slice(0,-i.note.length).trim():ing.name;return `<li class="ingredient-row"><label class="ingredient"><input type="checkbox" aria-label="${esc(ing.name)} hazır"><span class="ingredient-name">${esc(displayName)}${i.note?`<small>${esc(i.note)}</small>`:''}</span></label><div class="ingredient-right"><button class="amount" data-unit="${esc(i.unit||'')}" aria-label="${esc(ing.name)} ölçüsü"><span data-amount="${n}">${ing.amount===null?'':Number(ing.amount).toLocaleString('tr')}</span> ${esc(ing.unit)} ${UNIT_MAP[i.unit]?icon('info'):''}</button><div class="ingredient-actions">${i.substitutes?.length?`<button class="icon-button" data-swap="${n}" aria-label="${esc(ing.name)} alternatifleri">${icon('swap')}</button>`:''}${authButton(icon('cart'),ing.name+' alışveriş listeme ekle','icon-button')}</div></div>${i.sponsor?`<small class="sponsor-note">Sponsorlu Öneri · ${esc(i.sponsor)}</small>`:''}</li>`;}).join('')}</ul>${authButton(icon('cart')+' Tümünü Listeye Ekle','Tüm malzemeleri alışveriş listeme ekle','button secondary shopping-all')}<p class="portion-note">Miktarlar porsiyona göre otomatik güncellenir</p></section>
<details class="recipe-metadata"><summary>Tarif bilgileri ${icon('down')}</summary><div class="metadata-body">${w.dates?.map(t=>`<p>${esc(t)}</p>`).join('')||''}<div class="metadata-chips">${w.features?.map(f=>`<a class="chip" href="${featureLink(f)}">${esc(f.label)}</a>`).join('')||''}</div>${w.made?`<p>${esc(w.made)}</p>`:''}${r.web?.facts?.filter(x=>x.includes('°')).map(x=>`<p>${esc(x)}</p>`).join('')||''}<p>${esc(w.chef?.info||r.author).replace(/\s+/g,' ')}</p></div></details>
${w.skills?.length?`<section class="detail-block"><h2>Bu tarifte gereken beceriler</h2><div class="metadata-chips">${w.skills.map(s=>`<a href="" class="chip">${esc(s)}</a>`).join('')}</div></section>`:''}
<section class="detail-block method-section" id="adimlar"><div class="ingredient-heading"><div><span class="eyebrow">Adım Adım</span><h2>Nasıl yapılır?</h2></div><div class="font-controls"><button data-font="-1" aria-label="Yazıyı küçült">A−</button><button data-font="1" aria-label="Yazıyı büyüt">A+</button></div></div>${w.audio?`<audio controls src="${esc(w.audio)}"></audio><button data-audio-skip="-15">15 saniye geri</button><button data-audio-rate>1×</button><button data-audio-skip="15">15 saniye ileri</button>`:''}<ol class="steps">${r.steps.map((step,i)=>`<li class="step"><button class="step-index" data-step-done="${i}" aria-pressed="false" aria-label="${i+1}. adımı tamamla">${String(i+1).padStart(2,'0')}</button><div><h3>${esc(step.title)}</h3><p>${esc(step.body)}</p>${step.time?`<button class="timer-chip" data-timer="${i}" data-minutes="${parseInt(step.time)||0}" aria-label="${esc(step.time)} zamanlayıcıyı başlat">${icon('clock')} <span>${esc(step.time)}</span> ${icon('play')}</button>`:''}${w.steps?.[i]?.images?.map((im,n)=>`<button class="step-photo" data-step-gallery="${i}" data-image-index="${n}" aria-label="Adım fotoğrafını büyüt">${photo(im)}</button>`).join('')||''}</div></li>`).join('')}</ol></section>
${r.web?.notes?.map(n=>`<section class="detail-block recipe-note"><h2>${esc(n.title)}</h2><p>${esc(n.body)}</p></section>`).join('')||''}
${w.nutrition?`<details class="recipe-metadata nutrition"><summary>Besin Değerleri · 1 porsiyon ${icon('down')}</summary><p>${esc(w.nutrition.notice)}</p><div class="nutrition-grid">${w.nutrition.cells.map(n=>`<div><b>${esc(n.value)}</b><span>${esc(n.label)}</span></div>`).join('')}</div><p>${w.nutrition.macros.map(esc).join(' · ')}</p></details>`:''}
<div class="metadata-chips recipe-tags">${r.web?.tags?.map(t=>`<span class="chip">${esc(t)}</span>`).join('')||''}</div>
${w.madePhotos?.length?`<section class="detail-block"><h2>Onlar yaptı, böyle görünüyor</h2>${authButton('Fotoğrafını Yükle','Fotoğraf yükle','text-link')}<div class="edge-rail">${w.madePhotos.map((m,i)=>`<button class="made-photo" data-made-gallery="${i}" aria-label="${esc(m.caption)}">${photo(m.image)}<small>${esc(m.caption)}</small></button>`).join('')}</div></section>`:''}
<section class="detail-block review-section" id="yorumlar"><span class="eyebrow">Değerlendirmeler</span><h2>Yorumlar (${w.reviews?.length||0})</h2><div class="review-summary"><div>${rating(r)}<p>${r.ratingCount} değerlendirme</p><small>${esc(w.reviewSummary?.recommend||'')}</small></div><div>${w.reviewSummary?.distribution.map(d=>`<div class="rating-distribution"><span>${esc(d.star)} ${icon('star')}</span><progress max="${Math.max(r.ratingCount,1)}" value="${Number(d.count)||0}"></progress><span>${esc(d.count)}</span></div>`).join('')||''}</div></div>${w.commentsEnabled?authButton('Tarifi değerlendir / Yorum yaz','Yorum yaz','button secondary'):''}${w.reviews?.length?`<div class="review-filters chips">${[['all','Tümü'],['photo','Fotoğraflı'],['5','5 yıldız'],['4','4 yıldız'],['low','3 ve altı']].map(([v,t])=>`<button class="chip" data-review-filter="${v}" aria-pressed="${v==='all'}">${t}</button>`).join('')}</div><div id="reviewItems">${w.reviews.map((v,i)=>`<article class="review" data-review-item="${i}" data-stars="${v.rating}" data-has-photo="${!!v.photos.length}"><div class="review-head"><span class="avatar">${esc(v.author[0])}</span><a href=""><b>${esc(v.author)}</b></a><span class="rating">${icon('star')} ${v.rating}</span></div>${v.badge?`<small>${esc(v.badge)}</small>`:''}<p>${esc(v.body)}</p><small class="muted">${esc(v.date)}</small>${v.photos.map((im,n)=>`<button class="review-photo" data-review-gallery="${i}" data-image-index="${n}" aria-label="Yorum fotoğrafı">${photo(im)}</button>`).join('')}<div class="review-actions">${authButton(icon('like')+' Beğen '+esc(v.likes),'Yorumu beğen')}${authButton('Bildir','Yorumu bildir')}${authButton('Yanıtla','Yorum yanıtla')}</div>${v.replies.map(rep=>`<div class="reply"><b>${esc(rep.author)} · Tarif Sahibi</b><p>${esc(rep.body)}</p><small>${esc(rep.date)}</small></div>`).join('')}</article>`).join('')}</div><p id="reviewEmpty" hidden>Bu filtreye uyan yorum ilk sayfada yok.</p>`:`<div class="review-empty">Bu tarife henüz yorum yapılmamış. İlk yorumu sen yaz.</div>`}</section>
<section class="detail-block detail-chef"><h2>${esc(r.author)}</h2><p>${esc(w.chef?.info||'').replace(/\s+/g,' ')}</p>${w.chef?.bio?`<p>${esc(w.chef.bio)}</p>`:''}<div class="chef-metrics">${w.chef?.meta?.map(m=>`<span>${esc(m).replace(/([A-Za-zÇĞİÖŞÜçğıöşü])(\d)/g,'$1 $2')}</span>`).join('')||''}</div>${authButton(icon('plus')+' Takip Et','Şefi takip et','button secondary')}${w.chef?.subscription?'<a href="" class="button secondary">Abone Ol</a>':''}</section>
${w.related?.length?`<section class="detail-block"><h2>Alternatif Tarifler</h2>${w.related.map(r=>`<a class="text-link" href="${localRecipeLink(r.url)}">${esc(r.title)} ${icon('arrow')}</a>`).join('')}</section>`:''}
${w.similar?.length?`<section class="detail-block similar-section"><div class="ingredient-heading"><h2>Benzer Tarifler</h2><a href="tarifler.html" class="see-all" aria-label="Tüm tarifler">Tamamını Gör ${icon('arrow')}</a></div><div class="edge-rail card-rail">${w.similar.map(s=>DATA.recipes.find(r=>s.url.includes(r.slug))).filter(Boolean).map(card).join('')}</div></section>`:''}</div></main>
<div class="cook-bar"><button class="button" id="startCooking"><span>${icon('fire')} Pişirmeye Başla</span><small>${r.steps.length} adım ${icon('arrow')}</small></button></div>
<dialog class="sheet" id="shareSheet" aria-labelledby="shareTitle"><div class="handle"></div><div class="sheet-head"><h2 id="shareTitle">Paylaş</h2><button class="icon-button" data-close-share aria-label="Kapat">${icon('close')}</button></div><p class="share-label">${esc(r.title)}</p><div class="share-channels">${['Facebook','X','WhatsApp','Telegram','Pinterest','E-posta'].map(t=>`<button type="button" data-share-channel="${t}" class="chip">${t}</button>`).join('')}</div><input class="share-url" readonly aria-label="Tarif bağlantısı" value="${esc(r.url)}"><button class="button" id="copyLink">Bağlantıyı kopyala</button></dialog>
<div class="timer-dock" hidden role="status"><span id="timerDockLabel"></span><button class="icon-button" id="timerDockPause" aria-label="Zamanlayıcıyı duraklat">${icon('pause')}</button><button class="icon-button" id="timerDockClose" aria-label="Zamanlayıcıyı sıfırla">${icon('close')}</button></div>`;}
function absoluteMedia(u){return u?.startsWith('/')?'https://dadagastro.com'+u:u;}
function localRecipeLink(u){const slug=(u||'').split('/').pop();return DATA.recipes.some(r=>r.slug===slug)?'tarif-detay.html?tarif='+encodeURIComponent(slug):'';}

$('#app').innerHTML=`<div class="app-shell ${page==='tarif-detay'?'detail-shell':''}">${page==='index'?home():page==='tarifler'?list():detail()}</div><div class="toast" role="status" hidden></div>`;
let toastTimer;function toast(message){const el=$('.toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2800);}
document.addEventListener('click',e=>{const btn=e.target.closest('[data-save]');if(btn){const id=btn.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];let persisted=true;try{localStorage.setItem('dadagastro-prototype-saved',JSON.stringify(saved));}catch{persisted=false;}document.querySelectorAll('[data-save]').forEach(b=>{const on=saved.includes(b.dataset.save);b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Kaydı kaldır':'Tarifi kaydet');b.innerHTML=icon('book',!on);});toast(persisted?(saved.includes(id)?'Bu cihazda kaydedildi':'Kayıt kaldırıldı'):'Kayıt yalnız bu oturumda tutuluyor');}const emptyLink=e.target.closest('a[href=""]');if(emptyLink){e.preventDefault();if(!emptyLink.matches('[data-auth],[data-profile-menu]'))toast('Yakında');}if(e.target.closest('[data-clear]')){query=category=difficulty=duration='';pantryIngredients=[];facetState={};resultPage=1;sort='onerilen';$('#search').value='';renderResults();}});
if(page==='tarifler'){if(params.get('durum')==='yukleniyor')loading();else renderResults();let debounce;$('#search').addEventListener('input',e=>{query=e.target.value;loading();clearTimeout(debounce);debounce=setTimeout(renderResults,220);});$('.search-box').addEventListener('submit',e=>{e.preventDefault();clearTimeout(debounce);renderResults();$('#search').blur();});document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;renderResults();}));const dialog=$('#filters');$('#openFilters').onclick=()=>{$('#duration').value=duration;$('#difficulty').value=difficulty;$('#sort').value=sort;dialog.showModal();document.body.style.overflow='hidden';};const close=()=>{dialog.close();document.body.style.overflow='';};$('#closeFilters').onclick=close;dialog.addEventListener('close',()=>document.body.style.overflow='');dialog.addEventListener('click',e=>{if(e.target===dialog&&e.clientY<dialog.getBoundingClientRect().top)close();});$('#filterForm').onsubmit=e=>{e.preventDefault();duration=$('#duration').value;difficulty=$('#difficulty').value;sort=$('#sort').value;renderResults();close();};$('#resetFilters').onclick=()=>{$('#duration').value=$('#difficulty').value='';$('#sort').value='onerilen';};}
if(page==='tarif-detay'&&recipe){function updateScale(){const portions=Math.round(recipe.servings*scale);$('#portions').textContent=portions;document.querySelectorAll('[data-portions]').forEach(e=>e.textContent=portions);$('#scaleLabel').textContent=scale.toLocaleString('tr')+'×';document.querySelectorAll('[data-amount]').forEach(e=>{const amount=recipe.ingredients[Number(e.dataset.amount)].amount;e.textContent=amount===null?'':(amount*scale).toLocaleString('tr',{maximumFractionDigits:2});});$('#less').disabled=scale===.5;$('#more').disabled=scale===1.5;}$('#less').onclick=()=>{scale=Math.max(.5,scale-.5);updateScale();};$('#more').onclick=()=>{scale=Math.min(1.5,scale+.5);updateScale();};$('#startCooking').onclick=()=>{$('#adimlar').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});const heading=$('#adimlar h2');heading.tabIndex=-1;heading.focus({preventScroll:true});};updateScale();}

// Gentle, scroll-linked movement; disabled completely for reduced motion.
const motion=matchMedia('(prefers-reduced-motion: reduce)');
function setupMotion(){const header=$('.topbar');let ticking=false;const update=()=>{ticking=false;header?.classList.toggle('is-scrolled',scrollY>56);document.body.classList.toggle('scrolled',scrollY>80);if(!motion.matches){document.querySelectorAll('.hero-track .editorial-photo,.detail-hero .parallax-photo').forEach(el=>{const box=el.parentElement.getBoundingClientRect();const offset=Math.max(-18,Math.min(18,-box.top*.035));el.style.transform=`translateY(${offset}px) scale(${el.classList.contains('parallax-photo')?1.14:1.06})`;});}};addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});motion.addEventListener('change',()=>{document.querySelectorAll('.editorial-photo,.parallax-photo').forEach(el=>el.style.transform='');update();});update();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
setupMotion();
if(page==='index'){
 let searchMode='tarif';const form=$('#homeSearch');document.querySelectorAll('[data-search-mode]').forEach(b=>b.onclick=()=>{searchMode=b.dataset.searchMode;document.querySelectorAll('[data-search-mode]').forEach(t=>t.setAttribute('aria-selected',t===b));const input=$('input',form);input.placeholder=searchMode==='tarif'?'Tarif adı ara… (ör. mercimek çorbası)':searchMode==='malzeme'?'Elindeki malzemeleri yaz… (ör. tavuk, patates)':'Canın ne çekiyor? (ör. pratik akşam yemeği)';input.setAttribute('aria-label',input.placeholder);input.focus();});form.onsubmit=e=>{if(searchMode!=='tarif'){e.preventDefault();toast(searchMode==='malzeme'?'Dolapta Ne Var? ekranı sonraki aşamada.':'Ne Pişirsem ekranı sonraki aşamada.');}};
 document.querySelectorAll('[data-knowledge]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-knowledge]').forEach(t=>t.setAttribute('aria-selected',t===b));$('#lessons').hidden=b.dataset.knowledge!=='lessons';$('#tips').hidden=b.dataset.knowledge!=='tips';});
}

document.addEventListener('click',e=>{const b=e.target.closest('[data-save]');if(b&&!motion.matches){b.classList.remove('saved-pop');void b.offsetWidth;b.classList.add('saved-pop');}});

if(page==='tarifler')document.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b){listView=b.dataset.view;renderResults();}if(e.target.closest('[data-clear-pantry]')){pantryIngredients=[];renderResults();}});

if(page==='tarif-detay'&&recipe){
 const header=$('.detail-header'),title=$('.detail-cover-copy h1');const compact=()=>header.classList.toggle('is-compact',title.getBoundingClientRect().bottom<80);addEventListener('scroll',compact,{passive:true});compact();
 document.querySelectorAll('.ingredient input').forEach(input=>input.addEventListener('change',()=>{const n=document.querySelectorAll('.ingredient input:checked').length;$('#ingredientProgress').value=n;$('#ingredientStatus').textContent=n===recipe.ingredients.length?'Hepsi hazır. Hadi pişirelim!':`${n} / ${recipe.ingredients.length} hazır`;}));
 const share=$('#shareSheet');$('#shareRecipe').onclick=()=>share.showModal();$('[data-close-share]').onclick=()=>share.close();$('#copyLink').onclick=async()=>{try{await navigator.clipboard.writeText(recipe.url);toast('Tarif bağlantısı kopyalandı.');share.close();}catch{$('.share-url').focus();$('.share-url').select();toast('Bağlantıyı seçip kopyalayabilirsin.');}};
 // One explicit timer; the deadline keeps correct time when the tab is suspended.
 let activeTimer=null,remaining=0,deadline=0,running=false,timerTick;
 const fmt=sec=>`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
 function drawTimer(){if(activeTimer===null)return;const b=document.querySelector(`[data-timer="${activeTimer}"]`);b.classList.add('active');b.innerHTML=icon('clock')+' <span>'+fmt(remaining)+'</span> '+icon(running?'pause':'play');b.setAttribute('aria-label',fmt(remaining)+(running?' duraklat':' devam et'));$('#timerDockLabel').textContent=`Adım ${Number(activeTimer)+1} · ${fmt(remaining)}`;$('#timerDockPause').innerHTML=icon(running?'pause':'play');$('#timerDockPause').setAttribute('aria-label',running?'Zamanlayıcıyı duraklat':'Zamanlayıcıya devam et');$('.timer-dock').hidden=false;}
 function resetTimer(){clearInterval(timerTick);if(activeTimer!==null){const b=document.querySelector(`[data-timer="${activeTimer}"]`);b.classList.remove('active');b.innerHTML=icon('clock')+' <span>'+b.dataset.minutes+' dk</span> '+icon('play');b.setAttribute('aria-label',b.dataset.minutes+' dakika zamanlayıcıyı başlat');}activeTimer=null;running=false;$('.timer-dock').hidden=true;}
 function toggleTimer(){if(activeTimer===null)return;if(running){remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));running=false;clearInterval(timerTick);}else{if(remaining===0)remaining=Number(document.querySelector(`[data-timer="${activeTimer}"]`).dataset.minutes)*60;deadline=Date.now()+remaining*1000;running=true;timerTick=setInterval(()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));if(remaining===0){running=false;clearInterval(timerTick);toast('Süre doldu. Adımını kontrol et.');}drawTimer();},250);}drawTimer();}
 document.querySelectorAll('[data-timer]').forEach(b=>b.onclick=()=>{if(activeTimer!==null&&activeTimer!==b.dataset.timer){toast('Önce çalışan zamanlayıcıyı kapat.');return;}if(activeTimer===null){activeTimer=b.dataset.timer;remaining=Number(b.dataset.minutes)*60;}toggleTimer();});$('#timerDockPause').onclick=toggleTimer;$('#timerDockClose').onclick=resetTimer;addEventListener('pagehide',()=>clearInterval(timerTick));
}

// Shared overlays preserve the web's guest gate. No production writes are made.
const memberPreview=()=>sessionStorage.getItem('dadagastro-member-preview')==='1';
const genericDialog=document.createElement('dialog');genericDialog.className='sheet action-sheet';genericDialog.id='actionSheet';document.body.append(genericDialog);
function sheet(title,body){genericDialog._closing?.cancel();genericDialog._closing=null;genericDialog.innerHTML=`<div class="handle"></div><div class="sheet-head"><h2 id="actionTitle">${esc(title)}</h2><button class="icon-button" data-sheet-close aria-label="Kapat">${icon('close')}</button></div><div class="sheet-body-content">${body}</div>`;genericDialog.setAttribute('aria-labelledby','actionTitle');if(!genericDialog.open)genericDialog.showModal();applyProse(genericDialog);}
function gate(action){sheet('Bu işlem için giriş yap',`<p class="prose">${esc(action)} için DadaGastro hesabına giriş yapman gerekiyor.</p><div class="sheet-actions"><a href="" class="button">Giriş Yap</a><a href="" class="button secondary">Üye Ol</a></div>`);}
function applyProse(root=document){requestAnimationFrame(()=>syncParagraphAlignment(root));hydratePhotos(root);prepareInputFrames(root);syncPhotoReadability(root);root.querySelectorAll('p').forEach(p=>{if(p.closest('.review-summary,.metadata-body,.chef-metrics,.similar-card,.list-stat-line')||p.matches('.hero-deck,.loading-label,.portion-note,.review-count,.share-label,#resultCount,.preview-header p'))return;if(p.textContent.trim().split(/\s+/).length<6)return;p.classList.add('prose');if(p.dataset.emphasized)return;const rx=/(\d+(?:[.,]\d+)?\s*(?:°\s*C|dakika|dk|gram|ml|g)\b|kısık ateşte|orta-kısıkta|önce yağda|Hindistan cevizi sütü|curry baharatı|zeytinyağı|sarımsak|tereyağı|orta-kısık ateşte)/gi;let count=0;const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())if(!walker.currentNode.parentElement.closest('strong,b'))nodes.push(walker.currentNode);for(const node of nodes){const str=node.textContent;let last=0,match,frag=document.createDocumentFragment();rx.lastIndex=0;while((match=rx.exec(str))&&count<3){frag.append(document.createTextNode(str.slice(last,match.index)));const strong=document.createElement('strong');strong.textContent=match[0];frag.append(strong);last=match.index+match[0].length;count++;}if(last){frag.append(document.createTextNode(str.slice(last)));node.replaceWith(frag);}}p.dataset.emphasized='1';});}
applyProse();
function syncHeader(){
 const header=$('.topbar');if(!header)return;
 const first=$('.signature-content>.eyebrow,.list-banner-copy h1,.detail-cover-copy>.eyebrow');
 const h=header.getBoundingClientRect().height;
 const breathingRoom=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-8'))||8;
 const firstDocumentTop=first?first.getBoundingClientRect().top+scrollY:0;
 const safeThreshold=Math.max(0,firstDocumentTop-h-breathingRoom);
 const fadeDistance=Math.min(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-48'))||48,safeThreshold);
 const alpha=!first||safeThreshold<=0?1:motion.matches?(scrollY>=safeThreshold?1:0):Math.min(1,Math.max(0,scrollY/Math.max(1,fadeDistance)));
 const hex=getComputedStyle(document.documentElement).getPropertyValue('--tomato').trim().replace('#','');
 const rgb=[0,2,4].map(n=>parseInt(hex.slice(n,n+2),16));
 header.style.setProperty('background-color',`rgba(${rgb.join(',')},${alpha})`,'important');
 header.dataset.alpha=alpha.toFixed(3);header.dataset.threshold=safeThreshold.toFixed(2);
 header.classList.toggle('is-solid',alpha>=.999);const headerBottom=header.getBoundingClientRect().bottom;for(const el of document.querySelectorAll('.signature-content>.eyebrow,.signature-content>h1,.signature-content>p,.list-banner-copy>h1,.list-banner-copy>.list-stat-line,.detail-cover-copy>.eyebrow,.detail-cover-copy>h1,.detail-cover-copy>p,.detail-cover-copy>.detail-cover-meta'))el.classList.toggle('header-occluded',alpha>=.999&&el.getBoundingClientRect().top<headerBottom+breathingRoom);if(page==='tarif-detay')header.classList.toggle('is-compact',alpha>=.999);
 let meta=$('meta[name="theme-color"]');if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.append(meta)}meta.content=alpha>=.999?'#'+hex:getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
}
addEventListener('scroll',syncHeader,{passive:true});addEventListener('resize',syncHeader);document.addEventListener('scroll',syncHeader,{passive:true,capture:true});motion.addEventListener('change',syncHeader);document.fonts.ready.then(syncHeader);const headerGeometryObserver=new ResizeObserver(syncHeader);for(const element of document.querySelectorAll('.topbar,.signature-content,.list-banner-copy,.detail-cover-copy'))headerGeometryObserver.observe(element);syncHeader();
document.addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save&&!memberPreview()){e.preventDefault();e.stopImmediatePropagation();gate('Tarifi kaydetmek');}},true);
document.addEventListener('click',e=>{
 if(e.target.closest('[data-sheet-close]'))genericDialog.close();
 const description=e.target.closest('[data-description]');if(description){const wrap=description.closest('.description-wrap'),expanded=wrap.classList.toggle('expanded');description.setAttribute('aria-expanded',expanded);description.innerHTML=(expanded?'Daha az':'Daha fazla')+' '+icon('down');}
 const auth=e.target.closest('[data-auth]');if(auth){const action=auth.dataset.auth;if(!memberPreview()){gate(action);return}if(action==='Tarifi kaydet'){genericDialog.close();document.querySelector('[data-save]')?.click();return}if(/Yorum yaz/.test(action)){if(sessionStorage.getItem('dadagastro-preview-role')==='unverified'){sheet('Yorum yapmak için e-postanı doğrula','<p>Bu tarifi puanlamak ve yorum yazmak için önce e-posta adresini doğrulaman gerekiyor.</p><button class="button" data-preview-action>Doğrulama Bağlantısını Yeniden Gönder</button>');}else openReviewForm();return}if(/yanıtla/i.test(action)){sheet('Yanıtla','<form data-preview-form><label>Yanıtın<textarea required></textarea></label><button class="button">Gönder</button></form>');return}if(/bildir/i.test(action)){sheet('Yorumu bildir','<p>Bu yorumu bildirmek istiyor musun?</p><button class="button" data-preview-action>Bildir</button>');return}const on=auth.getAttribute('aria-pressed')!=='true';auth.setAttribute('aria-pressed',on);if(action.includes('alışveriş')){auth.classList.toggle('added',on);auth.setAttribute('aria-label',on?'Alışveriş listesinden çıkar':'Alışveriş listesine ekle');toast(on?'Önizleme: alışveriş listesine eklendi.':'Önizleme: listeden çıkarıldı.')}else if(action.includes('takip')){auth.innerHTML=icon(on?'check':'plus')+' '+(on?'Takiptesin':'Takip Et');toast('Önizleme: takip durumu bu oturumda değişti.')}else toast('Önizleme: işlem bu oturumda gösterildi.');}
 if(e.target.closest('[data-preview-action]')){toast('Önizleme: sunucuya gönderilmedi.');genericDialog.close();}
 const unit=e.target.closest('[data-unit]');if(unit&&UNIT_MAP[unit.dataset.unit]){sheet('Ölçü karşılığı',UNIT_MAP[unit.dataset.unit].map(t=>`<p>${esc(t)}</p>`).join('')+'<small>Kaynak: DadaGastro Ölçü Birimleri rehberi</small>');}
 const swap=e.target.closest('[data-swap]');if(swap){const i=recipeInfo(recipe).ingredients.filter(i=>!i.group)[Number(swap.dataset.swap)];sheet('Yerine ne kullanabilirim?',i.substitutes.map(t=>`<p class="substitute-option">${esc(t)}</p>`).join(''));}
 const done=e.target.closest('[data-step-done]');if(done)done.setAttribute('aria-pressed',done.getAttribute('aria-pressed')!=='true');
 const font=e.target.closest('[data-font]');if(font){const area=$('.method-section');const size=Number(area.dataset.fontStep||1);const next=Math.max(0,Math.min(3,size+Number(font.dataset.font)));area.dataset.fontStep=next;area.style.setProperty('--step-font',['var(--type-meta)','var(--type-body)','var(--type-card)','var(--type-section)'][next]);}
 if(e.target.closest('[data-print]')){genericDialog.close();window.print();}
 if(e.target.closest('[data-recipe-more]')){const w=recipeInfo(recipe);sheet('Tarif işlemleri',`<div class="action-list">${authButton(icon('book')+' Kaydet','Tarifi kaydet')}${authButton(icon('utensils')+' Ben de Yaptım · '+esc(w.madeCount||'0'),'Ben de Yaptım')}${authButton(icon('clap')+' Eline Sağlık · '+esc(w.clapCount||'0'),'Alkışla')}<button data-goto-reviews>${icon('star')} Puan ver / Yorumlar</button><button data-print>${icon('print')} Yazdır</button>${w.video?'<button data-video>'+icon('play')+' Videolu Anlatım</button>':''}<a href="">${icon('book')} Mutfak Defterim</a></div>`);}
 if(e.target.closest('[data-goto-reviews]')){genericDialog.close();$('#yorumlar').scrollIntoView();}
 const filter=e.target.closest('[data-review-filter]');if(filter){const v=filter.dataset.reviewFilter;document.querySelectorAll('[data-review-filter]').forEach(b=>b.setAttribute('aria-pressed',b===filter));let count=0;document.querySelectorAll('[data-review-item]').forEach(r=>{const yes=v==='all'||v==='photo'&&r.dataset.hasPhoto==='true'||v==='low'&&Number(r.dataset.stars)<=3||r.dataset.stars===v;r.hidden=!yes;if(yes)count++});$('#reviewEmpty').hidden=!!count;}
 const gallery=e.target.closest('[data-gallery],[data-step-gallery],[data-review-gallery],[data-made-gallery]');if(gallery){const w=recipeInfo(recipe);let imgs=w.gallery||[recipe.image],index=Number(gallery.dataset.imageIndex)||0;if(gallery.hasAttribute('data-step-gallery'))imgs=w.steps[Number(gallery.dataset.stepGallery)].images;if(gallery.hasAttribute('data-review-gallery'))imgs=w.reviews[Number(gallery.dataset.reviewGallery)].photos;if(gallery.hasAttribute('data-made-gallery')){imgs=w.madePhotos.map(m=>m.image);index=Number(gallery.dataset.madeGallery)}openGallery(imgs,index);}
 if(e.target.closest('[data-profile-menu]'))sheet('Profil',`<div class="action-list"><a href="" data-auth="Mutfak Defterim">${icon('book')} Mutfak Defterim</a><a href="">Profil / Ayarlar</a><a href="">Alışveriş Listem</a><a href="">Giriş Yap</a></div>`);
 if(e.target.closest('[data-site-menu]'))sheet('Menü',`<div class="action-list"><a href="index.html">${icon('home')} Ana Sayfa</a><a href="tarifler.html">${icon('bowl')} Tarifler</a>${['Ne Pişirsem','Dolapta Ne Var?','Mutfak Sırları','Mutfağa Giriş','Püf Noktaları','Video Mutfağı','Şefler & Yazarlar','Tarif Ekle','Mutfak Defterim','Profil'].map(t=>`<a href="">${t}</a>`).join('')}</div>`);
 const voice=e.target.closest('[data-voice]');if(voice){const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition){toast('Bu tarayıcı sesli girişi desteklemiyor.');return}const rec=new Recognition();rec.lang='tr-TR';rec.onresult=ev=>{const input=$('#'+voice.dataset.voice+' input');input.value=ev.results[0][0].transcript;input.dispatchEvent(new Event('input',{bubbles:true}));};rec.onerror=()=>toast('Sesli giriş kullanılamadı.');rec.start();}
 const channel=e.target.closest('[data-share-channel]');if(channel){e.preventDefault();e.stopPropagation();const u=encodeURIComponent(recipe.url),t=encodeURIComponent(recipe.title);const targets={'Facebook':'https://www.facebook.com/sharer/sharer.php?u='+u,'X':'https://twitter.com/intent/tweet?url='+u+'&text='+t,'WhatsApp':'https://wa.me/?text='+t+'%20'+u,'Telegram':'https://t.me/share/url?url='+u+'&text='+t,'Pinterest':'https://pinterest.com/pin/create/button/?url='+u+'&description='+t,'E-posta':'mailto:?subject='+t+'&body='+u};window.open(targets[channel.dataset.shareChannel],'_blank','noopener,noreferrer');}
});
document.addEventListener('submit',e=>{if(e.target.matches('[data-preview-form]')){e.preventDefault();toast('Önizleme: sunucuya gönderilmedi.');genericDialog.close();}});
function openReviewForm(){sheet('Tarifi değerlendir',`<form data-preview-form class="review-form"><div class="star-picker" role="radiogroup" aria-label="Yıldız puanı">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="rating" value="${n}" required>${icon('star')}<span>${n}</span></label>`).join('')}</div><label>Yorumun<textarea name="body" placeholder="Bu tarifi denedin mi? Deneyimini, küçük dokunuşlarını yaz..."></textarea></label><label class="upload-label">${icon('camera')} Fotoğraf Ekle · en fazla 3<input type="file" accept="image/*" multiple id="reviewPhotos"></label><div id="photoDrafts"></div><p>Yorumlar denetim sonrası yayınlanır.</p><button class="button">Yorumu Paylaş</button></form>`);$('#reviewPhotos').onchange=e=>{const files=[...e.target.files];if(files.length>3){toast('En fazla 3 fotoğraf ekleyebilirsin.');e.target.value='';return}$('#photoDrafts').innerHTML=files.map((f,i)=>`<button type="button" class="chip" data-remove-photo="${i}">${esc(f.name)} ${icon('close')}</button>`).join('');$('#photoDrafts').onclick=ev=>{const b=ev.target.closest('[data-remove-photo]');if(b){b.remove();e.target.value='';}};};}
function openGallery(images,index=0){const dialog=document.createElement('dialog');dialog.className='gallery-dialog';dialog.innerHTML=`<div class="gallery-head"><span></span><button class="icon-button" aria-label="Kapat">${icon('close')}</button></div><div class="gallery-image photo" role="img" aria-label="Tarif fotoğrafı"></div><div class="gallery-controls"><button class="icon-button" aria-label="Önceki görsel">${icon('back')}</button><button class="icon-button" aria-label="Sonraki görsel">${icon('arrow')}</button></div>`;const draw=()=>{$('.gallery-image',dialog).style.backgroundImage=`url('${images[index]}')`;$('.gallery-head span',dialog).textContent=`${index+1} / ${images.length}`};document.body.append(dialog);draw();dialog.showModal();$('.gallery-head button',dialog).onclick=()=>dialog.close();const buttons=dialog.querySelectorAll('.gallery-controls button');buttons[0].onclick=()=>{index=(index-1+images.length)%images.length;draw()};buttons[1].onclick=()=>{index=(index+1)%images.length;draw()};dialog.onclose=()=>dialog.remove();dialog.onkeydown=e=>{if(e.key==='ArrowLeft')buttons[0].click();if(e.key==='ArrowRight')buttons[1].click()};}
if(page==='tarifler'){
 $('#openFilters').onclick=()=>{document.querySelectorAll('#filterForm input[type=checkbox]').forEach(i=>i.checked=(facetState[i.name]||[]).includes(i.value));$('#sort').value=sort;$('#filters').showModal();document.body.style.overflow='hidden';};
 $('#filterForm').onsubmit=e=>{e.preventDefault();facetState={};document.querySelectorAll('#filterForm input:checked').forEach(i=>(facetState[i.name]??=[]).push(i.value));sort=$('#sort').value;category=difficulty=duration='';resultPage=1;renderResults();$('#filters').close();document.body.style.overflow='';};
 $('#resetFilters').onclick=()=>{document.querySelectorAll('#filterForm input:checked').forEach(i=>i.checked=false);$('#sort').value='onerilen';};
 document.addEventListener('click',e=>{const more=e.target.closest('[data-facet-more]');if(more){const group=more.closest('.facet-options');const expanded=more.getAttribute('aria-expanded')!=='true';more.setAttribute('aria-expanded',expanded);group.querySelectorAll('.facet-extra').forEach(i=>i.hidden=!expanded);more.innerHTML=(expanded?'Daha az göster':'Daha fazla seçenek')+' '+icon('down');}const remove=e.target.closest('[data-remove-facet]');if(remove){facetState[remove.dataset.removeFacet]=facetState[remove.dataset.removeFacet].filter(v=>v!==remove.dataset.value);resultPage=1;renderResults();}const theme=e.target.closest('[data-theme]');if(theme){facetState={};const q=new URL(PARITY.list.themes[Number(theme.dataset.theme)].href).searchParams;for(const[k,v]of q)if(k.includes('['))(facetState[k.split('[')[0]]??=[]).push(v);category='';resultPage=1;renderResults();}const pager=e.target.closest('[data-page-number]');if(pager){resultPage=Number(pager.dataset.pageNumber);renderResults();$('.result-bar').scrollIntoView({block:'start'});}});
}
if(page==='tarif-detay'&&recipe){
 $('#startCooking').onclick=()=>openCooking();
 const audio=$('audio');if(audio){document.querySelectorAll('[data-audio-skip]').forEach(b=>b.onclick=()=>audio.currentTime=Math.max(0,audio.currentTime+Number(b.dataset.audioSkip)));$('[data-audio-rate]').onclick=e=>{audio.playbackRate=audio.playbackRate>=2?1:audio.playbackRate+.25;e.currentTarget.textContent=audio.playbackRate+'×';};}
}
function openCooking(){if(!recipe.steps.length)return;$('#timerDockClose')?.click();const dialog=document.createElement('dialog');dialog.className='cooking-dialog';let step=0,seconds=0,deadline=0,running=false,tick,auto=false;document.body.append(dialog);const fmt=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');function draw(){clearInterval(tick);running=false;const s=recipe.steps[step];seconds=(parseInt(s?.time)||0)*60;dialog.innerHTML=`<header><span>${esc(shortTitle(recipe))}</span><button class="icon-button" data-cook-close aria-label="Pişirme modundan çık">${icon('close')}</button></header><div class="cook-progress"><span>${step<recipe.steps.length?'Adım '+(step+1)+' / '+recipe.steps.length:'Tamamlandı'}</span><progress max="${recipe.steps.length}" value="${step+1}"></progress></div><div class="cook-stage">${s?`<span class="cook-number">${String(step+1).padStart(2,'0')}</span><h2>${esc(s.title)}</h2><p>${esc(s.body)}</p>`:'<h2>Afiyet olsun, tarifiniz hazır!</h2>'}</div><div class="cook-controls">${s?`<div class="cook-dots">${recipe.steps.map((_,i)=>`<button data-cook-step="${i}" aria-label="${i+1}. adıma geç" aria-pressed="${i===step}">${i+1}</button>`).join('')}</div><div class="cook-timer"><button class="icon-button" data-cook-timer aria-label="Sayacı başlat / durdur">${icon('play')}</button><output>${fmt(seconds)}</output><button class="icon-button" data-cook-reset aria-label="Sayacı sıfırla">${icon('reset')}</button></div><label class="cook-auto"><input type="checkbox" ${auto?'checked':''}> Bitince otomatik geç</label><div class="sheet-actions"><button class="button secondary" data-cook-prev ${step===0?'disabled':''}>Önceki</button><button class="button" data-cook-next>${step===recipe.steps.length-1?'Tarifi Bitir':'Sonraki Adım'}</button></div>`:'<button class="button" data-cook-restart>Baştan Başla</button>'}</div>`;const stage=dialog.querySelector('.cook-stage');for(const el of dialog.querySelectorAll('.cook-timer,.cook-auto'))stage.append(el);applyProse(dialog)}draw();dialog.showModal();if(document.body.dataset.inputMode!=='keyboard')dialog.querySelector('[data-cook-close]')?.blur();dialog.addEventListener('click',e=>{if(e.target.closest('[data-cook-close]'))dialog.close();if(e.target.closest('[data-cook-prev]')){step--;draw()}if(e.target.closest('[data-cook-next]')){step++;draw()}if(e.target.closest('[data-cook-restart]')){step=0;draw()}const jump=e.target.closest('[data-cook-step]');if(jump){step=Number(jump.dataset.cookStep);draw()}if(e.target.closest('[data-cook-reset]'))draw();const btn=e.target.closest('[data-cook-timer]');if(btn){if(!seconds){toast('Bu adım için süre belirtilmemiş.');return}running=!running;btn.innerHTML=icon(running?'pause':'play');clearInterval(tick);if(running){deadline=Date.now()+seconds*1000;tick=setInterval(()=>{seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('output',dialog).textContent=fmt(seconds);if(!seconds){clearInterval(tick);running=false;btn.innerHTML=icon('play');if(auto&&step<recipe.steps.length-1){step++;draw()}}},250)}}});dialog.addEventListener('change',e=>{if(e.target.matches('.cook-auto input'))auto=e.target.checked});dialog.onclose=()=>{clearInterval(tick);dialog.remove()};}

function listBanner(title='Tarifler',subline=null,image='https://dadagastro.com/varliklar/storage/pagedef/tarifler/hero/lHsbux1DtK4qGj3Uk2I2ccvNZXjepXHfQvr1ieQO.webp'){return `<section class="list-banner" style="background-image:url('${esc(image)}')"><div class="list-banner-copy"><h1>${esc(title)}</h1><div class="list-stat-line">${subline?`<span>${esc(subline)}</span>`:PARITY.list.stats.map(s=>`<span><b>${esc(s.value)}</b> ${esc(s.label)}</span>`).join('')}</div></div></section>`;}
function updateListBanner(){if(page!=='tarifler')return;const chosen=category||(facetState.kategori?.length===1?facetLabel('kategori',facetState.kategori[0]):'');const c=WEB.categories.find(c=>c.name===chosen);const old=$('.list-banner');if(old)old.outerHTML=c?listBanner(c.name,c.count,c.image||undefined):listBanner();syncHeader();syncPhotoReadability();}
// Owner-only web controls are inspectable from the explicit preview-role selector.
if(page==='tarif-detay'&&sessionStorage.getItem('dadagastro-preview-role')==='owner'){
 document.querySelectorAll('[data-review-item]').forEach((el,i)=>{const actions=$('.review-actions',el);actions.insertAdjacentHTML('beforeend',`<button data-review-edit="${i}">${icon('more')} Düzenle</button><button data-review-delete="${i}">Sil</button>`);});
 document.addEventListener('click',e=>{const edit=e.target.closest('[data-review-edit]');if(edit){const v=recipeInfo(recipe).reviews[Number(edit.dataset.reviewEdit)];openReviewForm();$('textarea',genericDialog).value=v.body;const rating=$(`input[value="${v.rating}"]`,genericDialog);if(rating)rating.checked=true;}if(e.target.closest('[data-review-delete]'))sheet('Yorumu sil','<p>Bu yorumu silmek istiyor musun?</p><button class="button" data-preview-action>Sil</button>');});
}
document.addEventListener('click',e=>{if(e.target.closest('[data-video]')&&recipeInfo(recipe).video){sheet('Videolu Anlatım',`<video controls playsinline src="${esc(recipeInfo(recipe).video)}" poster="${esc(recipe.image)}"></video>`);}});
genericDialog.addEventListener('close',()=>genericDialog.querySelectorAll('video,audio').forEach(m=>m.pause()));
function hydratePhotos(root=document){root.querySelectorAll('[data-photo-src]').forEach(el=>{if(el.dataset.lazyBound)return;el.dataset.lazyBound='1';const observer=new IntersectionObserver(entries=>{for(const item of entries)if(item.isIntersecting){const img=new Image();img.onload=()=>el.style.backgroundImage=`url('${el.dataset.photoSrc}')`;img.onerror=()=>{el.classList.add('image-failed');el.innerHTML=icon('utensils');el.setAttribute('aria-label','Görsel yüklenemedi')};img.src=el.dataset.photoSrc;observer.disconnect();}},{rootMargin:'200px'});observer.observe(el);});}
hydratePhotos();
document.addEventListener('click',e=>{if(e.target.closest('[data-search-clear]')){const input=e.target.closest('[data-search-clear]').closest('form').querySelector('input');input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();}});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));

function prepareInputFrames(root=document){prepareChoices(root);
 for(const input of root.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden]),textarea,select')){
  if(!input.closest('.search-box,.hero-search-row,.input-frame')){const frame=document.createElement('div');frame.className='input-frame';input.before(frame);frame.append(input);}
 }
 root.querySelectorAll('[data-search-clear]').forEach(button=>{button.hidden=!button.closest('form').querySelector('input').value;});
}
document.addEventListener('input',event=>{const form=event.target.closest('.search-box,.hero-search-row');if(form){const clear=form.querySelector('[data-search-clear]');if(clear)clear.hidden=!event.target.value;}});
prepareInputFrames();

function syncPhotoReadability(root=document){
 for(const [selector,textSelector] of [['.signature-hero','.signature-content>.eyebrow'],['.list-banner','.list-banner-copy h1'],['.detail-hero','.detail-cover-copy>.eyebrow'],['.editorial-hero','.hero-copy>.eyebrow'],['.card-media','.photo-meta'],['.video-picture','.video-duration']]){
  for(const surface of root.querySelectorAll(selector)){const text=surface.querySelector(textSelector);if(!text)continue;const r=surface.getBoundingClientRect();const photoHeight=r.height;const start=Math.max(photoHeight*.55,text.getBoundingClientRect().top-r.top-24);const clean=photoHeight*(surface.matches('.detail-hero')?.55:.5);surface.style.setProperty('--shade-solid-start',start+'px');surface.style.setProperty('--shade-fade-start',clean+'px');surface.style.setProperty('--shade-middle',((start+clean)/2)+'px');}
 }
}
document.fonts.ready.then(()=>syncPhotoReadability());addEventListener('resize',()=>syncPhotoReadability());

function prepareChoices(root=document){for(const input of root.querySelectorAll('input[type=checkbox],input[type=radio]')){if(input.parentElement.classList.contains('choice-shell'))continue;const shell=document.createElement('span');shell.className='choice-shell'+(input.type==='radio'?' choice-radio':'');input.before(shell);shell.append(input);const mark=document.createElement('span');mark.className='choice-mark';mark.innerHTML=icon('check');shell.append(mark);}}
function updateFacetDraft(){if(page!=='tarifler')return;const draft={};for(const i of document.querySelectorAll('#filterForm input[type=checkbox]:checked'))(draft[i.name]??=[]).push(i.value);for(const g of document.querySelectorAll('.facet-group')){let count=g.querySelector('[data-facet-count]');if(!count){count=document.createElement('small');count.dataset.facetCount='';g.querySelector('summary').insertBefore(count,g.querySelector('summary>span'));}const n=g.querySelectorAll('input:checked').length;count.textContent=n?'· '+n:'';count.hidden=!n;}document.querySelector('.facet-footer button:not([type=button])').textContent=filteredRecipes(draft,'','','').length+' tarifi göster';}
if(page==='tarifler'){
 const form=$('#filterForm'),footer=$('.facet-footer'),scroller=document.createElement('div');scroller.className='facet-scroll';for(const child of [...form.children])if(child!==footer)scroller.append(child);form.prepend(scroller);
 const openFilters=$('#openFilters').onclick;$('#openFilters').onclick=()=>{openFilters();document.querySelectorAll('.facet-group').forEach((g,i)=>g.open=i===0);scroller.scrollTop=0;updateFacetDraft();};
 form.addEventListener('change',updateFacetDraft);$('#resetFilters').addEventListener('click',updateFacetDraft);
 form.addEventListener('click',e=>{const summary=e.target.closest('.facet-group>summary');if(!summary)return;e.preventDefault();const group=summary.parentElement,body=group.querySelector('.facet-options');const duration=motion.matches?0:200;if(group.open){body.getAnimations().forEach(a=>a.cancel());const a=body.animate([{height:body.offsetHeight+'px',opacity:1},{height:'0px',opacity:0}],{duration,easing:'ease-out'});a.onfinish=()=>{group.open=false;};}else{document.querySelectorAll('.facet-group').forEach(g=>{if(g!==group){g.querySelector('.facet-options').getAnimations().forEach(a=>a.cancel());g.open=false;}});group.open=true;body.animate([{height:'0px',opacity:0},{height:body.offsetHeight+'px',opacity:1}],{duration,easing:'ease-out'});summary.scrollIntoView({block:'nearest',behavior:motion.matches?'instant':'smooth'});}});
 updateFacetDraft();
}

// Common sheet lifecycle: backdrop, drag handle, focus-preserving native dialog.
for(const dialog of document.querySelectorAll('dialog.sheet')){
 let startY=null;
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('pointerdown',e=>{if(e.target.closest('.handle,.sheet-head'))startY=e.clientY;});
 dialog.addEventListener('pointerup',e=>{if(startY!==null&&e.clientY-startY>60)dialog.close();startY=null;});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';});
}
// Nutrition keeps the existing information and now uses the same sheet presentation.
const nutritionPanel=document.querySelector('details.nutrition');
if(nutritionPanel)nutritionPanel.querySelector('summary').addEventListener('click',e=>{e.preventDefault();sheet('Besin Değerleri · 1 porsiyon',[...nutritionPanel.children].filter(x=>x.tagName!=='SUMMARY').map(x=>x.outerHTML).join(''));});
for(const d of document.querySelectorAll('dialog.sheet')){
 const close=d.close.bind(d);
 d.close=function(value){if(!d.open)return;if(matchMedia('(prefers-reduced-motion:reduce)').matches){close(value);return}d._closing?.cancel();const a=d.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(32px)',opacity:0}],{duration:250,easing:'cubic-bezier(.22,.61,.36,1)'});d._closing=a;a.onfinish=()=>{close(value);d._closing=null;};};
}
for(const button of document.querySelectorAll('.ingredient-actions [data-swap]')){button.className='ingredient-alternative';button.innerHTML=icon('swap')+' Alternatif';button.closest('.ingredient-row').append(button);}

// Fluid viewport and paragraph rules; no device-width constants.
function syncParagraphAlignment(root=document){for(const p of root.querySelectorAll('p.prose')){const range=document.createRange();range.selectNodeContents(p);const ys=[];for(const r of range.getClientRects())if(r.width&&r.height&&!ys.some(y=>Math.abs(y-r.top)<3))ys.push(r.top);p.classList.toggle('prose-long',ys.length>=4&&!p.closest('.cooking-dialog'));}}
let fluidResizeFrame;function updateFluidLayout(){cancelAnimationFrame(fluidResizeFrame);fluidResizeFrame=requestAnimationFrame(()=>{syncHeader();syncParagraphAlignment();});}
addEventListener('resize',updateFluidLayout);visualViewport?.addEventListener('resize',updateFluidLayout);visualViewport?.addEventListener('scroll',syncHeader);document.fonts.ready.then(updateFluidLayout);
document.body.dataset.inputMode='pointer';document.addEventListener('pointerdown',()=>document.body.dataset.inputMode='pointer',true);document.addEventListener('keydown',e=>{if(e.key==='Tab')document.body.dataset.inputMode='keyboard';},true);
