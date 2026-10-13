/* Uygulamanın bütün sayfaları (docs/52) — tek liste. Galeri (ekranlar.html), HTML iskelet üreticisi (ortak/uret/sayfalar.mjs)
   ve bağlantı denetimi (ortak/denetim/baglanti.mjs) bunu okur.
   dosya: v3-app'e göre yol. js: sayfanın çizildiği dosya (ortak/sayfalar/<js>.js). haller: [görünen ad, adres parametresi].
   Galeri metinleri sade Türkçedir; iç kod göstermez. */
(function (root) {
  const M = [['Misafir', 'oturum=misafir'], ['Üye', 'oturum=uye']];
  const VERI = [['Yükleniyor', 'durum=yukleniyor'], ['Hata', 'durum=hata'], ['Bağlantı yok', 'durum=baglanti-yok']];
  const GRUPLAR = [
    {ad: 'Ana ekranlar', hazir: true, sayfalar: [
      {id: 'ana', ad: 'Ana sayfa', dosya: 'ana-v3.html', kok: true, aciklama: 'Onaylı ana sayfa (yayındaki yeni tasarım 3. sürüm).', haller: [['Üye', 'giris=1']]},
      {id: 'liste', ad: 'Tarifler', dosya: 'liste-v2.html', kok: true, aciklama: 'Onaylı tarif listesi (yayındaki yeni tasarım 3. sürüm).', haller: [['Yükleniyor', 'durum=yukleniyor'], ['Sonuç yok', 'q=zzqxv'], ['Kategori', 'kategori=tatli']]},
      {id: 'detay', ad: 'Tarif detayı', dosya: 'detay-v2.html', kok: true, aciklama: 'Onaylı tarif detayı (yayındaki yeni tasarım 3. sürüm).', haller: [['Hazırlanış', 'sekme=hazirlanis'], ['Yorumlar', 'sekme=yorumlar']]}
    ]},
    {ad: 'Ortak bileşenler', hazir: true, sayfalar: [
      {id: 'bilesenler', ad: 'Bileşen kataloğu', dosya: 'uygulama/bilesenler.html', js: 'temel', haller: []}
    ]},
    {ad: 'Açılış ve tanıtım', hazir: true, sayfalar: [
      {id: 'acilis', ad: 'Açılış 1', dosya: 'uygulama/acilis.html', js: 'acilis', haller: []},
      {id: 'karsilama', ad: 'Karşılama 1', dosya: 'uygulama/karsilama.html', js: 'acilis', haller: [['2. modül', 'modul=2'], ['5. modül', 'modul=5']]},
      {id: 'tercihler', ad: 'Tercihler 1', dosya: 'uygulama/tercihler.html', js: 'acilis', haller: [['2. adım', 'adim=2'], ['3. adım', 'adim=3'], ['4. adım', 'adim=4']]},
      {id: 'acilis-2', ad: 'Açılış 2', dosya: 'uygulama/acilis-2.html', js: 'acilis', haller: []},
      {id: 'karsilama-2', ad: 'Karşılama 2', dosya: 'uygulama/karsilama-2.html', js: 'acilis', haller: []},
      {id: 'tercihler-2', ad: 'Tercihler 2', dosya: 'uygulama/tercihler-2.html', js: 'acilis', haller: [['2. adım', 'adim=2'], ['3. adım', 'adim=3'], ['4. adım', 'adim=4']]},
      {id: 'acilis-3', ad: 'Açılış 3', dosya: 'uygulama/acilis-3.html', js: 'acilis', haller: []},
      {id: 'karsilama-3', ad: 'Karşılama 3', dosya: 'uygulama/karsilama-3.html', js: 'acilis', haller: [['2. modül', 'modul=2'], ['5. modül', 'modul=5']]},
      {id: 'tercihler-3', ad: 'Tercihler 3', dosya: 'uygulama/tercihler-3.html', js: 'acilis', haller: [['2. adım', 'adim=2'], ['3. adım', 'adim=3'], ['4. adım', 'adim=4']]},
      {id: 'izin-bildirim', ad: 'Bildirim izni', dosya: 'uygulama/izin-bildirim.html', js: 'acilis', haller: [['Reddedildi', 'durum=reddedildi']]},
      {id: 'izin-kamera', ad: 'Kamera izni', dosya: 'uygulama/izin-kamera.html', js: 'acilis', haller: [['Reddedildi', 'durum=reddedildi']]}
    ]},
    {ad: 'Hesap', hazir: true, sayfalar: [
      {id: 'giris', ad: 'Giriş', dosya: 'uygulama/giris.html', js: 'hesap', aciklama: 'Alanlar ve cümleler canlı /giris ile birebir; giriş yalnız bu cihazda oturum açar, Google/Facebook da aynı şekilde.', haller: [['Hatalı giriş', 'durum=hata-form'], ['Doğrulama bağlantısından gelen', 'durum=dogrula-giris']]},
      {id: 'kayit', ad: 'Kayıt', dosya: 'uygulama/kayit.html', js: 'hesap', aciklama: 'Alanlar, onaylar ve hata cümleleri canlı /kayit ile birebir (telefon canlıda kapalı); hesap gerçekten açılmaz, e-posta gönderilmez.', haller: [['Eksik alan', 'durum=hata-form'], ['Tamamlandı', 'durum=tamam']]},
      {id: 'sifremi-unuttum', ad: 'Şifremi unuttum', dosya: 'uygulama/sifremi-unuttum.html', js: 'hesap', aciklama: 'Canlı /giris şifre paneliyle birebir; e-posta gönderilmez, bağlantının açtığı ekran Yeni şifre satırındadır.', haller: [['Eksik alan', 'durum=hata-form'], ['Gönderildi', 'durum=tamam']]},
      {id: 'yeni-sifre', ad: 'Yeni şifre', dosya: 'uygulama/yeni-sifre.html', js: 'hesap', aciklama: 'E-postadaki bağlantının açtığı canlı panel: beş kural yazarken işaretlenir, düğme kurallar ve eşleşme tamamlanınca açılır; şifre gerçekten değişmez.', haller: [['Hatalı alan', 'durum=hata-form'], ['Bağlantı süresi doldu', 'durum=sure-doldu'], ['Güncellendi', 'durum=tamam']]},
      {id: 'eposta-dogrula', ad: 'E-posta doğrulama', dosya: 'uygulama/eposta-dogrula.html', js: 'hesap', aciklama: 'Canlıda giriş isteyen doğrulama ekranı (backend panosu metinleriyle); bağlantı gönderilmez.', haller: [['Doğrulandı', 'durum=tamam'], ['Zaten doğrulanmış', 'durum=zaten'], ['Bağlantı doğrulanamadı', 'durum=gecersiz']]},
      {id: 'iki-adim', ad: 'İki adımlı doğrulama', dosya: 'uygulama/iki-adim.html', js: 'hesap', aciklama: 'Canlı sitede girişte kod adımı yok (yalnız ayarlarda açma/kapama); metinler eski web ekranından, kod denetlenmez.', haller: [['Hatalı kod', 'durum=hata-form'], ['Kurtarma kodu', 'mod=kurtarma']]}
    ]},
    {ad: 'Tarifler ve kategoriler', hazir: true, sayfalar: [
      {id: 'kategoriler', ad: 'Kategoriler ve dünya mutfakları', dosya: 'uygulama/kategoriler.html', js: 'tarifler', aciklama: 'Canlıda ayrı dizin sayfası yok: 34 kategori ana sayfa kategori şeridinden, 50 mutfak /tarifler Mutfak süzgecinden (canlı sıra ve sayılar); her öğe Tarifler listesini o kategori ya da mutfakla açar.', haller: [['Dünya mutfakları', 'sekme=mutfak'], ['Dünya mutfakları · yükleniyor', 'sekme=mutfak&durum=yukleniyor'], ...VERI]}
    ]},
    {ad: 'Profilim', hazir: true, sayfalar: [
      {id: 'profil', ad: 'Profil', dosya: 'uygulama/profil.html', js: 'profil', aciklama: 'Dolu hâl gerçek DadaGastro tarif ve şefleriyle kurulmuş örnek üyedir, cihaza yazılmaz; takipçi ve topluluk puanı verisi olmadığı için “—”.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M]},
      {id: 'profil-duzenle', ad: 'Profili düzenle', dosya: 'uygulama/profil-duzenle.html', js: 'profil', aciklama: 'Alanlar webdeki Profil Bilgilerim formuyla birebir; kayıt yalnız bu cihazda tutulur, görseller saklanmaz.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [['Üye', 'oturum=uye'], ['Hatalı alan', 'oturum=uye&durum=hata-form']]},
      {id: 'kaydettiklerim', ad: 'Kaydettiklerim', dosya: 'uygulama/kaydettiklerim.html', js: 'profil', aciklama: 'Kayıtlar kök ekranlarla ortak yerel listeden gelir; dolu hâl gerçek tariflerle örnektir ve cihaza yazılmaz.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M, ['Dolu', 'oturum=uye&ornek=1'], ['Boş', 'oturum=uye&durum=bos'], ['Yükleniyor', 'oturum=uye&durum=yukleniyor'], ['Hata', 'oturum=uye&durum=hata'], ['Bağlantı yok', 'oturum=uye&ornek=1&durum=baglanti-yok']]},
      {id: 'tariflerim', ad: 'Tariflerim', dosya: 'uygulama/tariflerim.html', js: 'profil', aciklama: 'Taslaklar bu cihazda tutulur; dolu hâl gerçek tarif adlarıyla dört onay durumunu gösteren örnektir.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M, ['Dolu', 'oturum=uye&ornek=1'], ['Boş', 'oturum=uye&durum=bos']]},
      {id: 'tarif-ekle', ad: 'Tarif ekle', dosya: 'uygulama/tarif-ekle.html', js: 'profil', aciklama: 'Canlı tarif ekleme formu birebir; gönderim ve görsel yükleme gerçek değildir, taslak yalnız bu cihazda tutulur.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [['Üye (boş form)', 'oturum=uye'], ['2. adım', 'oturum=uye&ornek=1&adim=2'], ['3. adım', 'oturum=uye&ornek=1&adim=3'], ['4. adım', 'oturum=uye&ornek=1&adim=4'], ['Gönderildi', 'durum=tamam']]},
      {id: 'alisveris-listesi', ad: 'Alışveriş listesi', dosya: 'uygulama/alisveris-listesi.html', js: 'profil', aciklama: 'Tarif detayındaki sepet ve “Tümünü Listeye Ekle” bu listeye yazar; paylaşım ve yazdırma tarayıcının kendi işlevleridir.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M, ['Dolu', 'oturum=uye&ornek=1'], ['Boş', 'oturum=uye&durum=bos']]},
      {id: 'menulerim', ad: 'Menülerim', dosya: 'uygulama/menulerim.html', js: 'profil', aciklama: 'Menüler ve haftalık plan bu cihazda tutulur; haftalık menü Pro değilse salt okunurdur.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M, ['Dolu', 'oturum=uye&ornek=1'], ['Menü düzenle', 'oturum=uye&ornek=1&menu=m-pazar'], ['Menü düzenle · misafir', 'oturum=misafir&menu=m-pazar'], ['Haftalık menü', 'oturum=uye&ornek=1&sekme=haftalik'], ['Haftalık menü · Pro', 'oturum=pro&ornek=1&sekme=haftalik'], ['Boş', 'oturum=uye&durum=bos']]},
      {id: 'rozetlerim', ad: 'Rozetlerim', dosya: 'uygulama/rozetlerim.html', js: 'profil', aciklama: 'Rütbe ve rozet adları webden; puan ve kazanım verisi sunucuda hesaplandığı için gösterilmez.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [...M]},
      {id: 'pro', ad: 'Pro', dosya: 'uygulama/pro.html', js: 'profil', aciklama: 'Canlı /pro metinleri; Pro satışta değil, ödeme ve abonelik işlemleri yoktur.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [['Üye', 'oturum=uye'], ['Pro üye', 'oturum=pro']]}
    ]},
    {ad: 'Ne Pişirsem · Dolapta Ne Var · Tabaktan Tarif', hazir: true, sayfalar: [
      {id: 'ne-pisirsem', ad: 'Ne Pişirsem', dosya: 'uygulama/ne-pisirsem.html', js: 'bul', haller: [['2. adım', 'adim=2'], ['4. adım', 'adim=4'], ['Sonuç', 'adim=sonuc'], ['Sonuç yok', 'adim=sonuc&durum=bos'], ['Yemek modu', 'sekme=mod'], ['Hazır menüler', 'sekme=mod&alt=hazir']], aciklama: 'Uygunluk oranı prototipteki 32 tarifte öğün, süre, zorluk ve damak tercihinden hesaplanır; Sıfırdan Kur havuzu bu 32 tariftir, Hazır Menüler canlıdaki 94 menüdür (görseller canlıdan), üyede “Menüyü Aç” yakında.'},
      {id: 'menuyu-pisir', ad: 'Menüyü pişir', dosya: 'uygulama/menuyu-pisir.html', js: 'bul', haller: [['Dolu menü', 'ornek=1'], ['Adım', 'ornek=1&faz=adim'], ['Bitti', 'ornek=1&faz=bitti']], aciklama: 'Menüler yalnız bu cihazda tutulur (Ne Pişirsem › Yemek Modu ya da Menülerim); örnek menü gerçek tariflerden kurulur, cihaza yazılmaz.'},
      {id: 'dolapta-ne-var', ad: 'Dolapta Ne Var', dosya: 'uygulama/dolapta-ne-var.html', js: 'bul', haller: [['Seçim yapılmış', 'ornek=1'], ['Hariç tuttuklarım', 'sekme=haric'], ['Sonuç', 'ornek=1&sonuc=1']], aciklama: 'Dolap seçimi yalnız bu cihazda saklanır (webde kayıtlı dolap yok); eşleşme 32 tarifin malzeme adlarıyla yapılır, tuz/su/karabiber/sıvı yağ eksik sayılmaz; kalori-protein süzgeci, çiğ ürün, histamin ve fruktoz için veri yok, sesli giriş çalışmaz.'},
      {id: 'tabaktan', ad: 'Tabaktan Tarif', dosya: 'tabaktan-tarif.html?durum=kamera&uye=pro', kok: true, aciklama: 'Akışın bütün ekranları “Tabaktan Tarif akışı” grubunda ayrı ayrı.', haller: []}
    ]},
    {ad: 'Videolar', hazir: true, sayfalar: [
      {id: 'videolar', ad: 'Video Mutfağı', dosya: 'uygulama/videolar.html', js: 'icerik', aciklama: 'Canlı /video-mutfagi bölümleri; seriler, Haftanın Videosu ve video türü (Tarif/Teknik/Seri) prototip verisinde olmadığından çizilmez, arşiv süzgecinde yalnız Tümü ve Kısa var.', haller: [['Kısa videolar', 'tur=kisa'], ...VERI]},
      {id: 'video', ad: 'Video', dosya: 'uygulama/video.html', js: 'icerik', aciklama: 'Oynatma kaynağı canlıda da yok (“Video kaynağı henüz eklenmedi”); Pro kilidi hâli veride Pro bilgisi olmadığından ?ornek=pro ile gösterilir.', haller: [['Kısa video', 'no=1'], ['Pro kilidi', 'ornek=pro'], ['Bulunamadı', 'no=99']]}
    ]},
    {ad: 'Püf Noktaları', hazir: true, sayfalar: [
      {id: 'puf-noktalari', ad: 'Püf Noktaları', dosya: 'uygulama/puf-noktalari.html', js: 'icerik', aciklama: 'Canlı sayaçlar ve 11 kategori; listede prototip verisindeki 6 püf noktası var, “En Yeni” tarih verisi olmadığından kaynak sırasını kullanır.', haller: [['Kategori', 'kategori=Bozuldu%C4%9Fu%20Nas%C4%B1l%20Anla%C5%9F%C4%B1l%C4%B1r%3F'], ['En çok okunan', 'sira=okunan'], ['Sonuç yok', 'durum=bos'], ...VERI]},
      {id: 'puf', ad: 'Püf noktası', dosya: 'uygulama/puf.html', js: 'icerik', aciklama: 'Künye, etiket ve uyarı canlı sayfadan; canlıda tek paragraf olan metin soru cümlelerinden numaralı bloklara ayrıldı; kaydet/faydalı/yorum yalnız bu cihazda. İçerik görünümleri aynı detay sayfasıdır; canlıda blok görseli olan püf noktası bulunmadığından görselli blokta püfün kendi kapak fotoğrafı kullanılır.', haller: [['Açıklama + blok listesi', 'gorunum=liste'], ['Düz açıklama', 'gorunum=duz'], ['Başlık + görsel bloğu', 'gorunum=gorsel'], ['Başlık + açıklama + görsel', 'gorunum=tam'], ['Çok yorumlu', 'slug=karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir'], ['Yorumsuz', 'slug=yumurta-bozuk-mu-nasil-anlasilir'], ['Üye', 'oturum=uye']]},
      {id: 'puf-ekle', ad: 'Püf noktası ekle', dosya: 'uygulama/puf-ekle.html', js: 'icerik', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], aciklama: 'Alanlar canlı /puf-noktasi-ekle ile birebir; dolu hâl gerçek bir püf noktasıyla doldurulur, gönderim ve taslak gerçek değildir.', haller: [['Misafir', 'oturum=misafir'], ['Üye (boş form)', 'oturum=uye'], ['Dolu', 'oturum=uye&ornek=1'], ['Eksik alan', 'oturum=uye&durum=hata-form'], ['Gönderildi', 'durum=tamam']]}
    ]},
    {ad: 'Şefler', hazir: true, sayfalar: [
      {id: 'sefler', ad: 'Şefler', dosya: 'uygulama/sefler.html', js: 'icerik', aciklama: 'Prototip verisindeki 33 şef, takipçiye göre; takip yalnız bu cihazda tutulur.', haller: [['Üye', 'oturum=uye'], ['Arama sonucu yok', 'q=zzqx'], ...VERI]},
      {id: 'sef', ad: 'Şef profili', dosya: 'uygulama/sef.html', js: 'icerik', aciklama: 'Kapak şefin ilk tarif fotoğrafı; püf noktası, takip, rozet ve Topluluk Puanı sayaçları ile diğer sekmeler veride olmadığından çizilmez.', haller: [['Üye', 'oturum=uye'], ['Öne çıkan şef', 'kullanici=sahnur.sezek'], ['Detaydan (adla)', 'ad=Doruk%20Solmaz'], ['Bulunamadı', 'kullanici=yok']]},
      {id: 'onur-listesi', ad: 'Onur listesi', dosya: 'uygulama/onur-listesi.html', js: 'icerik', haller: [['Yükleniyor', 'durum=yukleniyor']]}
    ]},
    {ad: 'Arama ve bildirimler', hazir: true, sayfalar: [
      {id: 'arama', ad: 'Arama', dosya: 'uygulama/arama.html', js: 'arama', aciklama: 'Gerçek tarif, şef, püf noktası, video ve kategori verisinde arar; son aramalar yalnız üyede, bu cihazda tutulur.', haller: [['Sonuçlar', 'q=tavuk'], ['Şefler sekmesi', 'q=a&tur=sef'], ['Sonuç yok', 'q=zzqxv'], ['Şunu mu demek istedin', 'q=mercimk'], ['Üye', 'oturum=uye'], ['Yükleniyor', 'durum=yukleniyor']]},
      {id: 'bildirimler', ad: 'Bildirimler', dosya: 'uygulama/bildirimler.html', js: 'arama', aciklama: 'Prototipte bildirim üretilmez; dolu hal gerçek tarif ve şeflerden kurulmuş örnektir.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [['Üye · boş', 'oturum=uye&durum=bos'], ['Dolu · Topluluk süzgeci', 'oturum=uye&ornek=1&tur=topluluk'], ['Dolu · süzgeç boş', 'oturum=uye&ornek=1&tur=sistem&tarih=bugun'], ['Yükleniyor', 'oturum=uye&durum=yukleniyor']]}
    ]},
    {ad: 'Ayarlar ve destek', hazir: true, sayfalar: [
      {id: 'ayarlar', ad: 'Ayarlar', dosya: 'uygulama/ayarlar.html', js: 'ayarlar', aciklama: 'Ayarlar yalnız bu cihazda saklanır; şifre, dondurma ve silme gerçek hesaba uygulanmaz. Dil tercihi saklanır, çeviri yok.', ikili: ['oturum=misafir', 'oturum=uye&ornek=1'], haller: [['Bildirim tercihleri', 'oturum=uye&bolum=bildirim'], ['Bildirim izni reddedildi', 'oturum=uye&bolum=bildirim&izin=red'], ['Profil görünürlüğü', 'oturum=uye&bolum=gizlilik'], ['Güvenlik', 'oturum=uye&bolum=guvenlik'], ['Güvenlik · hatalı alan', 'oturum=uye&bolum=guvenlik&durum=hata-form'], ['Dil ve bölge', 'oturum=uye&bolum=dil'], ['Verilerim', 'oturum=uye&bolum=veri'], ['Hesabı dondur', 'oturum=uye&bolum=dondur'], ['Hesabı sil', 'oturum=uye&bolum=sil'], ['Hesabı sil · hatalı', 'oturum=uye&bolum=sil&durum=hata-form'], ['Uygulama ayarları', 'oturum=uye&bolum=uygulama'], ['Uygulama · misafir', 'oturum=misafir&bolum=uygulama'], ['Aboneliklerim · dolu', 'oturum=uye&ornek=1&bolum=abonelikler'], ['Aboneliklerim · boş', 'oturum=uye&bolum=abonelikler'], ['Aboneliklerim · misafir', 'oturum=misafir&bolum=abonelikler']]},
      {id: 'destek', ad: 'Çözüm Merkezi', dosya: 'uygulama/destek.html', js: 'ayarlar', aciklama: 'SSS canlı veritabanı tohumundan (24 soru); talepler bu cihazda tutulur, örnek talepler SSS soru-cevaplarından kurulur.', ikili: ['oturum=misafir&sekme=talepler', 'oturum=uye&ornek=1&sekme=talepler'], haller: [['Sık sorulanlar', 'oturum=uye'], ['SSS · arama', 'q=%C5%9Fifre'], ['SSS · sonuç yok', 'q=zzqx'], ['Taleplerim · boş', 'oturum=uye&sekme=talepler'], ['Yeni talep', 'oturum=uye&sekme=yeni'], ['Yeni talep · hatalı', 'oturum=uye&sekme=yeni&durum=hata-form'], ['Öneri ve Şikâyet', 'sekme=oneri'], ['Öneri ve Şikâyet · hatalı', 'sekme=oneri&durum=hata-form']]},
      {id: 'gorus-bildir', ad: 'Görüş bildir', dosya: 'uygulama/gorus-bildir.html', js: 'ayarlar', aciklama: 'Görüş gönderilmez; başarı ekranı yalnız akışı gösterir. Web\'deki emoji puanı mobilde yıldızla.', haller: [['Bir sorum var', 'konu=soru'], ['Teknik sorun', 'konu=teknik'], ['İhlal bildirimi', 'konu=ihlal'], ['Puan ver', 'konu=puan'], ['Eksik alan', 'durum=hata-form'], ['Gönderildi', 'durum=tamam']]}
    ]},
    {ad: 'Yasal ve kurumsal', hazir: true, sayfalar: [
      {id: 'yasal', ad: 'Yasal metinler', dosya: 'uygulama/yasal.html', js: 'yasal', aciklama: 'Canlı /yasal dizini: dört grup + gruplanmamış üç metin; arama yalnız başlıklarda.', haller: [['Arama', 'q=veri'], ['Arama · sonuç yok', 'q=zzqx'], ['Yükleniyor', 'durum=yukleniyor']]},
      {id: 'yasal-metin', ad: 'Yasal metin', dosya: 'uygulama/yasal-metin.html', js: 'yasal', aciklama: 'Canlıdaki 26 metin tek şablonla; doldurulmamış yer tutucu satırlar (MERSİS, KEP, yürürlük tarihi) çizilmez.', haller: [['İçindekiler açık', 'slug=kullanim-kosullari&icindekiler=acik'], ['KVKK', 'slug=kvkk'], ['Çerez', 'slug=cerez'], ['Kısa metin', 'slug=yas-siniri'], ['Veri silme', 'slug=veri-silme'], ['Metin henüz yok', 'slug=uyelik'], ['Bulunamadı', 'slug=yok']]},
      {id: 'hakkimizda', ad: 'Hakkımızda', dosya: 'uygulama/hakkimizda.html', js: 'yasal', aciklama: 'Canlı /hakkimizda metinleri ve sayıları; görseller canlı sayfanın kendi görselleri.', haller: []},
      {id: 'iletisim', ad: 'İletişim', dosya: 'uygulama/iletisim.html', js: 'yasal', aciklama: 'Canlı /iletisim formunun alanları birebir; mesaj gönderilmez.', haller: [['Eksik alan', 'durum=hata-form'], ['Gönderildi', 'durum=tamam'], ['Konu seçili gelir', 'konu=oneri'], ['Veri silme talebi', 'talep=veri-silme']]},
      {id: 'kunye', ad: 'Künye', dosya: 'uygulama/kunye.html', js: 'yasal', haller: []}
    ]},
    {ad: 'Sistem ve hata', hazir: true, sayfalar: [
      {id: 'bulunamadi', ad: 'Sayfa bulunamadı', dosya: 'uygulama/bulunamadi.html', js: 'sistem', aciklama: 'Canlı 404 metinleri; Mutfağa Giriş, Sözlük ve Ölçü Birimleri kapsam dışı.', haller: []},
      {id: 'yetki-yok', ad: 'Erişim yok', dosya: 'uygulama/yetki-yok.html', js: 'sistem', haller: [['Bağlantı başka hesaba ait', 'tur=baska-hesap'], ['Başka hesap · şifre sıfırlama', 'tur=baska-hesap&mod=sifre'], ['Başka hesap · hesap silme', 'tur=baska-hesap&mod=delete']]},
      {id: 'oturum-doldu', ad: 'Oturum süresi doldu', dosya: 'uygulama/oturum-doldu.html', js: 'sistem', haller: []},
      {id: 'hata', ad: 'Beklenmedik hata', dosya: 'uygulama/hata.html', js: 'sistem', haller: []},
      {id: 'bakim', ad: 'Bakım', dosya: 'uygulama/bakim.html', js: 'sistem', haller: []},
      {id: 'baglanti-yok', ad: 'Bağlantı yok', dosya: 'uygulama/baglanti-yok.html', js: 'sistem', aciklama: 'Bağlantı rozeti cihazın gerçek ağ durumunu canlı okur.', haller: []},
      {id: 'guncelleme', ad: 'Güncelleme gerekli', dosya: 'uygulama/guncelleme.html', js: 'sistem', aciklama: 'Webde karşılığı yok; mağaza bağlantısı yok.', haller: [['İsteğe bağlı', 'tur=istege-bagli']]}
    ]}
  ,
  {ad: 'Tabaktan Tarif akışı', hazir: true, sayfalar: [
      {id: 'tt-misafir', ad: 'Giriş kapısı (misafir)', dosya: 'tabaktan-tarif.html?durum=misafir', kok: true, haller: []},
      {id: 'tt-promo', ad: 'Tanıtım · Pro kapısı (üye)', dosya: 'tabaktan-tarif.html?durum=uye', kok: true, aciklama: 'Pro değilse tanıtım; “Pro’ya geç” paywall’a (Pro ve Üyeliğim) gider.', haller: []},
      {id: 'tt-deneme', ad: 'Ücretsiz deneme', dosya: 'tabaktan-tarif.html?durum=deneme', kok: true, haller: [['Deneme hakkı bitti', 'durum=deneme-bitti'], ['Günlük sınır', 'durum=limit']]},
      {id: 'tt-kamera', ad: 'Kamera (galeriden seç dahil)', dosya: 'tabaktan-tarif.html?durum=kamera&uye=pro', kok: true, haller: []},
      {id: 'tt-izin', ad: 'Kamera izni reddedildi', dosya: 'tabaktan-tarif.html?durum=izin&uye=pro', kok: true, aciklama: 'İzin öncesi ekran: Açılış ve tanıtım › Kamera izni.', haller: []},
      {id: 'tt-analiz', ad: 'Analiz (tarama)', dosya: 'tabaktan-tarif.html?durum=analiz&uye=pro', kok: true, haller: []},
      {id: 'tt-sonuc', ad: 'Sonuç · benzer tarifler', dosya: 'tabaktan-tarif.html?durum=sonuc&uye=pro', kok: true, haller: []},
      {id: 'tt-taslak', ad: 'Sonuç · senin tarifin (taslak)', dosya: 'tabaktan-taslak.html?uye=pro', kok: true, aciklama: 'Kök tarif detayı (detay-v2) aynen; farklar: Taslak rozeti, yapay zekâ bilgi notu, alt çubukta Düzenle · Yeniden çek · Kaydet → Editöre gönder; yorum, puan, takip ve benzerler gizli. Kayıt bu cihazda Tariflerim’e yazılır.', haller: [['Düşük güven (zayıf eşleşme)', 'eslesme=zayif'], ['Kaydedildi', 'durum=taslak'], ['Editöre gönderildi', 'durum=inceleniyor']]},
      {id: 'tt-duzenle', ad: 'Taslağı düzenle (Tarif ekle)', dosya: 'uygulama/tarif-ekle.html?oturum=pro&taslak=tabaktan-patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver', kok: true, aciklama: 'Taslaktaki “Düzenle” Tarif ekle akışını taslakla açar (kapak = taslak fotoğrafı).', haller: []},
      {id: 'tt-tanimadi', ad: 'Tanınamadı', dosya: 'tabaktan-tarif.html?durum=eslesme-yok&uye=pro', kok: true, haller: [['Fotoğraf bulanık', 'durum=bulanik&uye=pro'], ['Yemek yok', 'durum=yemek-yok&uye=pro']]},
      {id: 'tt-hata', ad: 'Hata · taslak oluşturulamadı', dosya: 'tabaktan-tarif.html?durum=olusturulamadi&uye=pro', kok: true, haller: []},
      {id: 'tt-cevrimdisi', ad: 'Çevrimdışı · bağlantı yok', dosya: 'tabaktan-tarif.html?durum=baglanti&uye=pro', kok: true, haller: []}
    ]}
];
  root.DGSAYFALAR = GRUPLAR;
  if (typeof module !== 'undefined') module.exports = GRUPLAR;
})(typeof window !== 'undefined' ? window : globalThis);
