/* Örnek üye (giriş yapılmış hâl) — TEK KAYNAK (Beyar, 12 Ekim: “örnek üye verisi tek bir ortak dosyada; bütün sayfalar oradan okusun,
   her yerde aynı kişi ve aynı sayılar”). Kişi temsilîdir; içerik (tarif, şef, kategori, püf noktası) DGVERI'deki gerçek kayıtlardır.
   Kurallar: puan = kazanılan rozetlerin puan toplamı (web g-rozetlerim kuralı); kademe = puan ve mutfak günü eşiklerinin ikisini birlikte
   geçtiği en yüksek kademe (DGROZET.kademeler). Sayılar birbirini tutar: 12 yayındaki tarif → tarif-10 kazanıldı, tarif-25 12/25 …
   Cihaza yazılmaz; sayfalar ?oturum=uye&ornek=1 hâlinde buradan okur. Yalnız yönetici değiştirir. */
window.DGORNEK = (() => {
  const uye = {
    ad: 'Elif', soyad: 'Demir', adSoyad: 'Elif Demir', kullanici: 'elifdemir', eposta: 'elif.demir@ornekposta.com',
    telefon: '5321234567', telefonUlke: 'TR', dogum: '1992-04-18', cinsiyet: 'kadin', sehir: 'İzmir',
    hakkinda: 'Ege mutfağını ve zeytinyağlıları seviyorum; hafta sonları ekşi mayalı ekmek deniyorum.',
    uyelik: '2025-11-03', avatar: null,
    // Kapak: kendi yayındaki tarifinin gerçek görseli (Güveçte Ayvalı Tavuk)
    kapak: ((window.DGVERI && window.DGVERI.tarifler.find(t => t.slug === 'guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci')) || {}).gorsel || null,
    pro: false
  };
  // Mutfak defteri ölçüleri (web “Kademeyi besleyen sayılar”)
  const olcu = {mutfakGunu: 132, enUzunSeri: 16, guncelSeri: 4, dakika: 2140, yayindakiTarif: 12, pufNoktasi: 11, tamamlananMenu: 4, kategori: 11, begeni: 64, kaydedilme: 73, menuPaylasim: 3, haftalikMenu: 2, sozluk: 1, girisRota: 4, kategoriMeze: 10, kategoriTatli: 6, pufFaydali: 18};
  const sayac = {tarif: 12, takipci: 248, takip: 87, puf: 11, menu: 3};
  // Kazanılan rozetler: [slug, tarih] — sıra kazanım sırası
  const kazanilan = [
    ['ilk-yorum', '2025-11-05'], ['seri-3', '2025-11-07'], ['ilk-tarif', '2025-11-09'], ['tarif-ilk-yayin', '2025-11-10'], ['gun-7', '2025-11-12'],
    ['ikinci-tarif', '2025-11-18'], ['dk-60', '2025-11-20'], ['seri-5', '2025-11-22'], ['ilk-puf', '2025-11-25'], ['kat-5', '2025-12-02'],
    ['ilk-menu', '2025-12-06'], ['menu-tamam', '2025-12-06'], ['puf-3', '2025-12-14'], ['gun-20', '2025-12-19'], ['takipci-10', '2025-12-28'],
    ['dk-600', '2026-01-09'], ['haftalik-ilk', '2026-01-18'], ['seri-14', '2026-01-31'], ['gun-45', '2026-02-11'], ['ansiklopedi-ilk', '2026-02-20'],
    ['kat-10', '2026-03-07'], ['menu-3', '2026-03-22'], ['tarif-10', '2026-04-15'], ['puf-10', '2026-05-03'], ['dk-1800', '2026-05-30'],
    ['takipci-100', '2026-06-21'], ['kat-meze', '2026-07-12'], ['gun-90', '2026-08-02'], ['alisveris-paylas', '2026-09-14']
  ];
  // Hedefli ama kazanılmamış rozetlerde ilerleme (olcu ile aynı sayılar)
  // Kazanılmamış rozetlerde ilerleme: slug → [şimdiki, hedef] (hedef web rozet koşulundan; olcu ile aynı sayılar)
  const ilerleme = {'tarif-25': [12, 25], 'tarif-50': [12, 50], 'tarif-begeni-100': [64, 100], 'gun-180': [132, 180], 'dk-6000': [2140, 6000], 'haftalik-4': [2, 4], 'kat-14': [11, 14], 'kat-tatli': [6, 10], 'takipci-500': [248, 500], 'kaydedildi-100': [73, 100], 'puf-25': [11, 25], 'puf-usta': [18, 50], 'menu-paylasim-10': [3, 10], 'sezon-menusu': [1, 4], 'sozluk-3': [1, 3], 'giris-rota': [4, 12]};
  const R = (window.DGROZET && window.DGROZET.rozetler) || [];
  const puan = kazanilan.reduce((t, [s]) => t + ((R.find(r => r.slug === s) || {}).puan || 0), 0);
  const K = (window.DGROZET && window.DGROZET.kademeler) || [];
  const kademe = K.filter(k => puan >= k.puan && olcu.mutfakGunu >= k.gun).pop() || K[0];
  const sonraki = K.find(k => k.sira === (kademe ? kademe.sira + 1 : 0)) || null;
  // Kişisel listeler — gerçek tarif/şef/püf kayıtlarından
  const tariflerim = [
    ['guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci', 'yayinda', '2026-09-28'], ['semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta', 'yayinda', '2026-08-30'],
    ['mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli', 'yayinda', '2026-08-02'], ['patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver', 'yayinda', '2026-07-11'],
    ['sardalya-izgara-limon-kekikli', 'yayinda', '2026-06-20'], ['lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma', 'yayinda', '2026-05-29'],
    ['muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi', 'yayinda', '2026-05-03'], ['karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik', 'yayinda', '2026-04-15'],
    ['mamounia-halep-usulu-tereyagli-irmik-kahvaltisi', 'yayinda', '2026-03-22'], ['frijoles-refritos-meksika-usulu-ezme-fasulye', 'yayinda', '2026-02-11'],
    ['yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi', 'yayinda', '2025-12-19'], ['tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi', 'yayinda', '2025-11-10'],
    ['tavuk-curry-hindistan-cevizli-hint-usulu', 'inceleniyor', '2026-10-09'], ['kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta', 'taslak', '2026-10-11']
  ].map(([slug, durum, tarih]) => ({slug, durum, tarih}));
  const kaydedilenler = ['tavuk-curry-hindistan-cevizli-hint-usulu', 'jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides', 'duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi', 'arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav', 'tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma', 'asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi', 'masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki', 'moin-moin-nijerya-usulu-buharda-borulce-pudingi', 'ordek-dolmasi-firinda-ic-pilavli-butun-ordek', 'kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas', 'sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi', 'iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis'];
  const koleksiyonlar = [
    {id: 'k-deniz', ad: 'Deniz ürünleri akşamı', tarifler: ['jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides', 'asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi', 'iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis']},
    {id: 'k-kahvalti', ad: 'Pazar kahvaltısı', tarifler: ['masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki', 'kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas', 'tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma']},
    {id: 'k-davet', ad: 'Misafir sofrası', tarifler: ['ordek-dolmasi-firinda-ic-pilavli-butun-ordek', 'duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi', 'sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi']}
  ];
  const pufNoktalarim = ['cilek-bozuldugu-kuflendigi-nasil-anlasilir', 'yumurta-bozuk-mu-nasil-anlasilir', 'karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir'];
  const takipEdilen = ['sahnur.ilicali', 'emel.aksu', 'ahmet.orge', 'canan.yucel', 'ece.ozdenak', 'askin.akay', 'cem.aydan'];
  const menuler = [
    {id: 'm-pazar', ad: 'Pazar sofrası', mod: 'Misafir', tarifler: ['duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi', 'guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci', 'muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi'], tamamlandi: '2026-09-21'},
    {id: 'm-deniz', ad: 'Ege akşamı', mod: 'Akşam yemeği', tarifler: ['yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi', 'sardalya-izgara-limon-kekikli', 'tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi'], tamamlandi: '2026-08-17'},
    {id: 'm-kahvalti', ad: 'Hafta sonu kahvaltısı', mod: 'Kahvaltı', tarifler: ['patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver', 'semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta', 'mamounia-halep-usulu-tereyagli-irmik-kahvaltisi'], tamamlandi: null}
  ];
  // Alışveriş listesi: gerçek tarif malzemelerinden (veri.js malzemeler) — sayfa ad/miktar çözer; işaretli olanlar alınmış.
  const alisveris = [
    {tarif: 'guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci', isaretli: [0, 2]},
    {tarif: 'sardalya-izgara-limon-kekikli', isaretli: []},
    {tarif: 'tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi', isaretli: [1]}
  ];
  // Bildirimler: türler web g-bildirimler; metinlerdeki tarif/şef adları gerçek kayıtlardan
  const bildirimler = [
    {tur: 'tarif', baslik: 'Tarifin yayında', govde: 'Güveçte Ayvalı Tavuk tarifin onaylandı ve yayına alındı.', zaman: '2 sa önce', okunmadi: true, tarif: 'guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci'},
    {tur: 'topluluk', baslik: 'Yeni yorum', govde: 'Emel Aksu, Sardalya Izgara tarifine yorum yaptı.', zaman: '5 sa önce', okunmadi: true, tarif: 'sardalya-izgara-limon-kekikli'},
    {tur: 'sef', baslik: 'Takip ettiğin şeften yeni tarif', govde: 'Şahnur Ilıcalı yeni bir tarif paylaştı: Düdüklüde Balkan Usulü Lahana Sarması.', zaman: 'Dün', okunmadi: true, tarif: 'duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi'},
    {tur: 'topluluk', baslik: 'Rozet kazandın', govde: '“Alışveriş Listesi Paylaşımı” rozetini kazandın: +100 puan.', zaman: '3 gün önce', okunmadi: false},
    {tur: 'menu', baslik: 'Menün tamamlandı', govde: 'Pazar sofrası menüsünü tamamladın. Afiyet olsun!', zaman: '3 hafta önce', okunmadi: false},
    {tur: 'sistem', baslik: 'Püf noktan öne çıkanlarda', govde: 'Çilek Bozulduğu Nasıl Anlaşılır? püf noktan bu hafta en çok okunanlar arasında.', zaman: '1 ay önce', okunmadi: false}
  ];
  // Haftalık menü planı (7 gün × kahvaltı/öğle/akşam) — gerçek tarif kayıtlarından; boş öğün yok.
  const haftalik = [
    ['Pazartesi', 'patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver', 'mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli', 'tavuk-curry-hindistan-cevizli-hint-usulu'],
    ['Salı', 'semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta', 'frijoles-refritos-meksika-usulu-ezme-fasulye', 'sardalya-izgara-limon-kekikli'],
    ['Çarşamba', 'masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki', 'kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas', 'guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci'],
    ['Perşembe', 'mamounia-halep-usulu-tereyagli-irmik-kahvaltisi', 'lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma', 'karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik'],
    ['Cuma', 'irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor', 'enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla', 'yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi'],
    ['Cumartesi', 'patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver', 'arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav', 'duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi'],
    ['Pazar', 'masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki', 'ordek-dolmasi-firinda-ic-pilavli-butun-ordek', 'asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi']
  ].map(([gun, kahvalti, ogle, aksam]) => ({gun, kahvalti, ogle, aksam}));
  return {haftalik, uye, olcu, sayac: {...sayac, puan}, puan, kademe, sonraki, kazanilan, ilerleme, tariflerim, kaydedilenler, koleksiyonlar, pufNoktalarim, takipEdilen, menuler, alisveris, bildirimler};
})();
