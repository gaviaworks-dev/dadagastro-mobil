/* G6 · Sistem ve hata ekranları (docs/52 §3.6 E1–E6, M1–M2): bulunamadı, erişim yok (+ bağlantı başka hesaba ait), oturum doldu,
   beklenmedik hata, bakım, bağlantı yok, güncelleme gerekli.
   Metinler canlıdan (12 Ekim, yalnız GET): /404 (olmayan adres), /403, /oturum-suresi-doldu, /500, /bakim, /cevrimdisi; ikonlar aynı.
   “Bağlantı başka hesaba ait” canlıda adresli değil → repo errors/link-wrong-account.blade.php metinleri (üç kip: verify, sifre, delete).
   Güncelleme gerekli mobile özel: canlı karşılığı yok, sade ifade; mağaza bağlantısı yok → “Yakında”.
   Web'e özgü notlar çizilmez: /cevrimdisi'deki geliştirici kutusu, /bakim'deki doldurulmamış “Bakım penceresi” satırı.
   Hiçbir ekran oturumu ya da cihaz kaydını değiştirmez; yalnız “Çıkış yap ve devam et” kullanıcı dokununca çıkış yapar. */
(() => {
  const {ic, I, esc, btn, durum} = DG;
  const qs = new URLSearchParams(location.search);
  const donus = () => qs.get('donus') || '';
  const donusHref = () => { const d = donus(); return d ? (d.startsWith('uygulama/') ? d.slice(9) : '../' + d) : ''; };
  const girisHref = () => 'giris.html' + (donus() ? '?donus=' + encodeURIComponent(donus()) : '');
  const ANA = DG.KOK.ana;
  // Çıkış satırı: [ikon, başlık, açıklama, href | null (Yakında)]
  // Revize B6/D16: çıkışlar parçalı gri buton listesi (DG.parcali); ilk çıkış ana eylem tonunda değil — sayfanın ana eylemi üstteki düğmedir.
  // EK (tutarlılık): bölüm başlıkları ortak DG.bas (.dg-head h2, section rolü), açıklama ortak p.
  const cikis = (baslik, satirlar) => `<section class="dgu-ic sy-cikis" aria-label="${esc(baslik)}">${DG.bas(baslik)}${DG.parcali(satirlar.map(([ikon, b, a, href]) => href ? {ikon, baslik: b, alt: a, href} : {ikon, baslik: b, alt: a, attrs: 'data-yakinda'}))}</section>`;
  const aciklama = (baslik, paragraflar, ek = '') => `<section class="dgu-ic sy-aciklama">${DG.bas(baslik)}<div class="dgu-yigin-8">${paragraflar.map(p => `<p>${esc(p)}</p>`).join('')}${ek}</div></section>`;
  const kur = ({baslik, ikon, h, metin, eylem = '', govde = ''}) => ({tur: 'alt', baslik, iskelet: false, offlineIcerik: true,
    html: `<div class="sy-govde">${durum({ikon, baslik: h, metin, eylem})}${govde}</div>`,
    sonra(root) {
      root.addEventListener('click', e => {
        if (e.target.closest('[data-yakinda]')) { e.preventDefault(); DG.bildir('Yakında'); return; }
        if (e.target.closest('[data-yenile]')) { e.preventDefault(); const d = donusHref(); if (d) location.href = d; else location.reload(); }
      });
    }});

  // ---------- E1 · Sayfa bulunamadı (canlı 404) ----------
  DG.sayfa('bulunamadi', () => {
    const s = kur({baslik: 'Sayfa bulunamadı', ikon: 'compass', h: 'Aradığın sayfayı bulamadık', metin: 'Adres değişmiş, bağlantı eskimiş ya da yazarken bir harf kaymış olabilir. Buradan devam edebilirsin.',
      govde: `${aciklama('Aradığını yaz, devam edelim', ["DadaGastro'da tarifler, püf noktaları, şefler ve mutfak terimleri aranabilir. Aklındaki kelimeyi yazman yeterli."],
          `<form class="sy-ara" action="arama.html" method="get" role="search"><div class="dgu-girdi">${ic(I('search'))}<label class="dgu-sr" for="sy-q">DadaGastro içinde ara</label><input id="sy-q" name="q" type="search" placeholder="Örneğin: kuru fasulye, mercimek çorbası, 30 dakika…" autocomplete="off" enterkeyhint="search"></div><button class="dgu-btn" type="submit">${ic(I('search'))}<span>Ara</span></button></form>`)}
        ${cikis('Ya da buralardan birine geç', [[I('home'), 'Ana sayfa', "DadaGastro'nun başlangıç noktası: tarifler, püf noktaları ve bugün ne pişireceğin.", ANA], ['utensils', 'DadaGastro Tarifleri', '6.112 denenmiş tarif — kategori kategori süzülebilir.', DG.KOK.liste], ['headset', 'Çözüm Merkezi', 'Sık sorulanlar ve destek talebi. Kırık bağlantıyı buradan bildirebilirsin.', 'destek.html']])}
        <section class="dgu-ic sy-cikis" aria-label="Sık gidilen sayfalar">${DG.bas('Sık gidilen sayfalar')}<div class="u-yatay">${[[I('tips'), 'Püf Noktaları', 'puf-noktalari.html'], ['calendar-week', 'Haftalık Menü', 'menulerim.html?sekme=haftalik'], [I('chef'), 'Şef bul', 'sefler.html'], ['graduation-cap', 'Mutfağa Giriş'], ['spell-check', 'Mutfak Sözlüğü'], ['scale-balanced', 'Ölçü Birimleri']].map(([i, m, h]) => h ? `<a class="dgu-chip" href="${h}">${ic(i)}${esc(m)}</a>` : `<button class="dgu-chip" type="button" data-yakinda>${ic(i)}${esc(m)}</button>`).join('')}</div></section>`});
    const sonra = s.sonra;
    s.sonra = root => { sonra(root); root.querySelector('.sy-ara')?.addEventListener('submit', e => { const q = e.target.q.value.trim(); if (!q) { e.preventDefault(); e.target.q.focus(); } }); };
    return s;
  });

  // ---------- E2 · Erişim yok (canlı /403) · E6 · Bağlantı başka hesaba ait (?tur=baska-hesap&mod=verify|sifre|delete) ----------
  const KIP = {
    verify: {metin: 'Doğrulama bağlantısını açtın, ama şu an farklı bir hesapla giriş yapmış durumdasın. Doğrulama bu yüzden tamamlanmadı.', devam: 'eposta-dogrula.html'},
    sifre: {metin: 'Şifre sıfırlama bağlantısını açtın, ama şu an farklı bir hesapla giriş yapmış durumdasın. Yeni şifre ekranı bu yüzden açılmadı.', devam: 'yeni-sifre.html'},
    delete: {metin: 'Hesap silme onay bağlantısını açtın, ama şu an farklı bir hesapla giriş yapmış durumdasın. Bağlantının ait olduğu hesabın silme talebi onaylandı — SENİN hesabına dokunulmadı.', devam: ''}
  };
  DG.sayfa('yetki-yok', ctx => {
    if (ctx.qs.get('tur') === 'baska-hesap') {
      const kip = KIP[ctx.qs.get('mod')] ? ctx.qs.get('mod') : 'verify', K = KIP[kip];
      const p = ctx.store.get('profil', {}) || {}, simdi = p.eposta || [p.ad, p.soyad].filter(Boolean).join(' ') || 'Bu cihazdaki hesap';
      const hedef = ctx.qs.get('eposta') || 'e-postandaki hesap';
      const hesap = (ikon, etiket, deger, cls = '') => `<div class="dgu-eylem is-bilgi sy-hesap${cls}"><span class="dgu-eylem-ikon">${ic(ikon)}</span><span class="dgu-eylem-metin"><small>${esc(etiket)}</small><b>${esc(deger)}</b></span><span></span></div>`;
      const s = kur({baslik: 'Başka hesaba ait bağlantı', ikon: 'arrow-right-arrow-left', h: 'Bu bağlantı başka bir hesaba ait', metin: K.metin,
        govde: `<section class="dgu-ic dgu-yigin-8" aria-label="Hesaplar">${hesap(I('profile'), 'Şu an giriş yapmış olduğun hesap', simdi)}<p class="t-meta c-muted sy-ayrac">bağlantı bu hesaba ait değil</p>${hesap('envelope', 'Bağlantının ait olduğu hesap', hedef, ' is-hedef')}</section>
          <section class="dgu-ic dgu-yigin-12">${btn('Çıkış yap ve devam et', {ikon: I('logout'), attrs: 'data-cikis-devam', tam: true})}${btn('Bu hesapta kal', {tur: 'ikincil', ikon: I('home'), href: ANA, tam: true})}<p class="t-meta c-muted">Çıkış yaptığında seni doğrudan bu bağlantıya geri getiririz; e-postana dönmen gerekmez.</p></section>`});
      const sonra = s.sonra;
      s.sonra = root => { sonra(root); root.querySelector('[data-cikis-devam]')?.addEventListener('click', () => {
        ctx.store.set('oturum', {rol: 'misafir'}); DG.bildir('Çıkış yapıldı.');
        const hedefSayfa = K.devam ? 'giris.html?donus=' + encodeURIComponent('uygulama/' + K.devam) : ANA;
        setTimeout(() => location.replace(hedefSayfa), DGTOKENS.motion.reveal * 2);
      }); };
      return s;
    }
    return kur({baslik: 'Erişim izni yok', ikon: 'user-lock', h: 'Bu sayfa sana kapalı', metin: 'Bu içerik ya belirli üyeler için ayrılmış ya da oturumun bu alana yetkili değil. Yanlış hesapla girmiş olabilirsin.',
      govde: `${aciklama('Muhtemel sebepler', ['Oturumun kapanmış olabilir; içerik yalnız Pro üyelere ya da bir şefin abonelerine açık olabilir; ya da bağlantıyı sana başka bir hesabın erişebildiği bir yerden birisi göndermiş olabilir.', 'Doğru hesapla giriş yaptığında bu sayfa açılır. Açılmıyorsa erişim gerçekten tanımlı değildir.'])}
        ${cikis('Buradan devam edebilirsin', [[I('login'), 'Giriş yap', 'Doğru hesapla giriş yap; erişimin varsa sayfa açılır.', girisHref()], [I('home'), 'Ana sayfa', 'Herkese açık bölümlere dön: tarifler, püf noktaları, rehberler.', ANA], ['headset', 'Destek Merkezi', 'Erişimin olması gerekiyorsa bize yaz, bakalım.', 'destek.html?sekme=yeni']])}`});
  });

  // ---------- E3 · Oturum süresi doldu (canlı /oturum-suresi-doldu) ----------
  DG.sayfa('oturum-doldu', () => kur({baslik: 'Oturum süresi doldu', ikon: 'hourglass-end', h: 'Güvenliğin için oturumunu kapattık', metin: 'Bir süredir işlem yapılmadığı için oturumun sona erdi. Tekrar giriş yaptığında kaldığın yerden devam edersin.',
    eylem: btn('Tekrar giriş yap', {href: girisHref(), ikon: I('login')}),
    govde: `${aciklama('Verilerin duruyor', ['Otomatik çıkış, hesabını ortak kullanılan cihazlarda korur. Mutfak defterindeki tariflerin, menülerin ve kişisel notların hesabında duruyor; oturumun kapanması yalnız bu cihazdaki girişi sonlandırır — hiçbir şey silinmez.', 'Yarıda kalan bir tarif taslağın varsa, tekrar giriş yaptıktan sonra baştan doldurman gerekebilir.'])}
      ${cikis('Buradan devam edebilirsin', [[I('login'), 'Tekrar giriş yap', 'Kaldığın yerden devam et; defterin ve menülerin yerinde.', girisHref()], [I('home'), 'Ana sayfa', 'Girmeden gezmek istersen herkese açık bölümler burada.', ANA], ['headset', 'Destek Merkezi', 'Giriş yapamıyorsan bize yaz.', 'destek.html?sekme=yeni']])}`}));

  // ---------- E4 · Beklenmedik hata (canlı /500) ----------
  DG.sayfa('hata', () => kur({baslik: 'Bir şeyler ters gitti', ikon: I('error'), h: 'Bir şeyler ters gitti — ve bu sende değil, bizde', metin: 'İsteğini karşılarken bir sorun çıktı. Yaptığın hiçbir şey bunu tetiklemedi ve kaydettiklerin duruyor.',
    eylem: btn('Sayfayı yenile', {ikon: 'rotate-right', attrs: 'data-yenile'}),
    govde: `${aciklama('İkinci deneme çoğu zaman yeter', ["Bu tür kesintiler genelde kısa sürer. Sayfayı yenilemeyi dene; sorun sürerse Çözüm Merkezi'nden bize haber ver, ne olduğuna bakalım."])}
      ${cikis('Buradan devam edebilirsin', [[I('home'), 'Ana sayfa', 'Baştan başla; hesabındaki paket ve kayıtlar yerinde duruyor.', ANA], [I('search'), 'Arama', 'Aradığın şeye doğrudan git: tarif, püf noktası, menü, şef.', 'arama.html'], ['headset', 'Destek Merkezi', 'Sorun devam ediyorsa yeni bir destek talebi aç.', 'destek.html?sekme=yeni']])}`}));

  // ---------- E5 · Bakım (canlı /bakim) ----------
  DG.sayfa('bakim', () => kur({baslik: 'Bakım', ikon: I('maintenance'), h: 'Kısa bir bakım yapıyoruz', metin: 'DadaGastro birazdan geri dönecek. Tariflerin, menülerin ve kaydettiklerin olduğu gibi duruyor.',
    govde: `${aciklama('Ne oluyor?', ["DadaGastro'yu daha hızlı ve daha kararlı hâle getirmek için kısa süreli bir güncelleme yapıyoruz. Bakım bitince aynı adresten kaldığın yerden devam edebilirsin."])}
      ${cikis('Bu sırada', [[I('home'), 'Ana sayfayı dene', 'Bakım bittiyse site normal açılır; birkaç dakika sonra tekrar bak.', ANA], ['circle-question', 'Çözüm Merkezi', 'Sık sorulanlar ve bilinen durumlar burada.', 'destek.html'], ['envelope', 'İletişim', 'Acil bir durum varsa doğrudan bize ulaş.', 'iletisim.html']])}`}));

  // ---------- M1 · Bağlantı yok (canlı /cevrimdisi; cihazın gerçek bağlantı durumu navigator.onLine ile canlı) ----------
  DG.sayfa('baglanti-yok', () => {
    const s = kur({baslik: 'Bağlantı yok', ikon: I('offline'), h: 'Bağlantın kopmuş görünüyor', metin: "DadaGastro'ya ulaşamıyoruz. Wi-Fi ya da mobil verinin açık olduğundan emin ol; bağlantı gelince haber vereceğiz.",
      eylem: btn('Yeniden dene', {ikon: 'rotate-right', attrs: 'data-yeniden'}),
      govde: `${aciklama('Cihazının bağlantı durumu', ['Aşağıdaki rozet, cihazının ağ bağlantısını canlı gösterir. Bağlantı geri geldiğinde yeşile döner — sayfayı yenilemene gerek kalmaz.'], '<p class="sy-ag" role="status" aria-live="polite" data-ag></p>')}
        ${cikis('Bağlantı gelince buradan devam et', [[I('home'), 'Ana sayfa', 'Bağlantı geri geldiğinde DadaGastro normal açılır.', ANA], ['book', 'Mutfak Defterim', 'Tariflerin, taslakların ve kişisel notların seni bekliyor.', 'kaydettiklerim.html'], ['circle-question', 'Çözüm Merkezi', 'Bağlantı düzeldiği hâlde açılmıyorsa buradan bize yaz.', 'destek.html']])}`});
    const sonra = s.sonra;
    s.sonra = root => {
      sonra(root);
      const ag = root.querySelector('[data-ag]');
      const yaz = () => { const on = navigator.onLine; ag.classList.toggle('is-acik', on); ag.innerHTML = `${ic(on ? 'circle-check' : I('offline'))}<span>${on ? 'Ağ bağlantısı var — DadaGastro’ya dönebilirsin' : 'Ağ bağlantısı yok — cihazın çevrimdışı'}</span>`; };
      addEventListener('online', yaz); addEventListener('offline', yaz); yaz();
      root.querySelector('[data-yeniden]')?.addEventListener('click', () => { if (!navigator.onLine) { DG.bildir('Ağ bağlantısı kesildi. Bağlantını kontrol edip yeniden dene.'); return; } location.href = donusHref() || ANA; });
    };
    return s;
  });

  // ---------- M2 · Güncelleme gerekli (mobile özel; kapatılamaz) · ?tur=istege-bagli ----------
  DG.sayfa('guncelleme', ctx => {
    const istege = ctx.qs.get('tur') === 'istege-bagli';
    const eylem = `<div class="dgu-yigin-12 sy-eylemler">${btn('Güncelle', {ikon: I('update'), attrs: 'data-yakinda', tam: true})}${istege ? btn('Şimdi değil', {tur: 'ikincil', attrs: 'data-geri', tam: true}) : ''}</div>`;
    return {tur: 'tam', baslik: 'Güncelleme gerekli', iskelet: false,
      html: `<div class="sy-tam"><img class="sy-logo" src="../assets/marka/dadagastro-renkli.svg" alt="DadaGastro">${durum({ikon: I('update'), baslik: istege ? 'Yeni sürüm hazır' : 'Uygulamayı güncellemen gerekiyor', metin: istege ? "DadaGastro'nun yeni sürümünü yükleyebilirsin." : "DadaGastro'yu kullanmaya devam etmek için uygulamanın yeni sürümünü yükle.", eylem})}</div>`,
      sonra(root) { root.addEventListener('click', e => { if (e.target.closest('[data-yakinda]')) DG.bildir('Yakında'); }); }};
  });
})();
