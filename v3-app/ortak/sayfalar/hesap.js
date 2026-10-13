/* G1 · Hesap (docs/52 §3.1 H1–H6): giriş, kayıt, şifremi unuttum, yeni şifre, e-posta doğrulama, iki adımlı doğrulama.
   Kaynak (docs/55 §2d, 12 Ekim alan alan karşılaştırma; tablo docs/52 §10):
   - canlı GET https://dadagastro.com/giris (giriş + #auPaneSifre + #auPaneYeniSifre panelleri) ve /kayit;
   - canlıda giriş isteyen /eposta/dogrula (302 → /giris) için backend deposu
     resources/views/kimlik/dogrulama-panosu.blade.php + EpostaDogrulamaDenetleyicisi + config/auth.php (60 dk);
   - doğrulama/hata cümleleri lang/tr/kimlik.php, lang/tr/validation.php, Istekler/*; canlı ile depo farklıysa canlı esas
     (kayıt alan hataları canlıda “Adınızı girin.” biçiminde; depoda “Adını gir.”).
   - İki adımlı doğrulama: canlıda giriş adımı yok (/two-factor-challenge 404; ayarlarda yalnız açık/kapalı bayrağı).
     Metinler emekli depo resources/views/auth/two-factor-challenge.blade.php + Api/V1/AuthController'dan.
   Telefon alanı canlı /kayit'ta gizli (config kimlik.telefon_yuzeyi_gorunur) → çizilmez. Kullanıcı/Şef seçicisi de canlıda yok.
   Gerçek hesap yok: oturum yalnız bu cihazda (dg-oturum); ekranda bunu anlatan not yok (docs/55 §2c), açıklama galeri satırında.
   Prototip kolaylıkları (ekranda yazılmaz): e-postada “pro” geçerse rol 'pro'; “2fa” geçerse iki adımlı doğrulama ekranı açılır.
   Görünüm (Revize V2 D1, 13 Ekim; Beyar EK: hero YALNIZ Giriş Yap ve Kayıt Ol'da, diğer hesap ekranları V1 düz hâli): üstte gülücük kapak (gerçek tarif fotoğrafı + ortak koyu geçiş .dg-veil-top/.dg-veil-bottom +
   primary ışık + alt kavis ve turuncu çizgi; fotoğrafın alt bölümünde resmi beyaz logo, sayfa başlığı ve açıklaması). Header kapağın
   üstünde şeffaf (ortak kapakHeader), kaydırınca solid; başlığı yalnız solidken görünür. Altta beyaz alan: sekme, sosyal, form. */
(() => {
  const {ic, I, esc, btn, alan, secim, seg, durum, store} = DG;
  const EPOSTA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // Canlı yeni şifre panelinin beş kuralı — düzenli ifadeler canlıdakiyle birebir (Laravel Password::mixedCase/numbers/symbols).
  const KURALLAR = [['En az 8 karakter', s => Array.from(s).length >= 8], ['Bir büyük harf', s => /\p{Lu}/u.test(s)], ['Bir küçük harf', s => /\p{Ll}/u.test(s)], ['Bir rakam', s => /\p{N}/u.test(s)], ['Bir özel karakter (!, @, #, $ vb.)', s => /\p{Z}|\p{S}|\p{P}/u.test(s)]];
  const kurallarTamam = s => KURALLAR.every(([, f]) => f(s));
  const qs = () => new URLSearchParams(location.search);
  // Sayfalar arasında yalnız dönüş adresi ve bekleyen eylem taşınır (durum/oturum test parametreleri taşınmaz).
  const devam = (ek = {}) => { const q = qs(), p = new URLSearchParams(); ['donus', 'eylem'].forEach(k => q.get(k) && p.set(k, q.get(k))); Object.entries(ek).forEach(([k, v]) => p.set(k, v)); const s = p.toString(); return s ? '?' + s : ''; };
  const donusAdresi = () => { const d = qs().get('donus'); return d ? (d.startsWith('uygulama/') ? d.slice(9) : '../' + d) : DG.KOK.ana; };
  const yasal = (slug, ad) => `<a class="hs-link" href="yasal-metin.html?slug=${slug}&amp;donus=${encodeURIComponent(DG.here())}">${esc(ad)}</a>`;
  const zorunlu = '<b class="hs-yildiz" aria-hidden="true">*</b><span class="dgu-sr">(zorunlu)</span>';
  // Sosyal giriş: canlı gibi iki eşit düğme (görünen ad + ekran okuyucuya “ile devam et / ile kayıt ol”), resmi renkli logolar.
  const brand = (ad, ek) => `<button class="dgu-btn dgu-btn--ikincil hs-sosyal-btn" type="button" data-sosyal="${ad}"><img class="hs-sosyal-logo" src="../assets/marka/sosyal/${ad}.svg" alt="" width="20" height="20"><span>${ad === 'google' ? 'Google' : 'Facebook'}<span class="dgu-sr"> ${esc(ek)}</span></span></button>`;
  const sosyal = ek => `<div class="hs-sosyal">${brand('google', ek)}${brand('facebook', ek)}</div><p class="hs-ayrac">veya e-posta ile</p>`;
  const gonder = (metin, ikon, attrs = '') => `<button class="dgu-btn dgu-btn--tam" type="submit" ${attrs}>${ic(ikon)}<span>${esc(metin)}</span></button>`;
  const hataP = (id, metin) => `<p class="dgu-hata" id="${id}" role="alert"${metin ? '' : ' hidden'}>${ic(I('error'))}<span>${esc(metin || '')}</span></p>`;
  // Bilgi notları ve hata şeritleri ortak bilgi notundan (DG.ipucu: ikon + kısa başlık + metin); canlı cümle metinde aynen durur.
  const not = (ikon, baslik, metin, rol) => DG.ipucu({ikon, baslik, metin}).replace('<aside class="dgu-ipucu"', `<aside class="dgu-ipucu"${rol ? ` role="${rol}"` : ''}`);
  // Canlı: “Bu form istismara karşı hız sınırlamasıyla korunur.” — bilgi notunda kısaltıldı (başlık + tek satır; dar sütunda boşluk açmaz).
  const hizNotu = () => not('shield-halved', 'Hız sınırlaması', 'Bu form istismara karşı korunur.');
  const serit = (baslik, metin, ikon = I('error')) => not(ikon, baslik, metin, 'alert');
  const kurallar = (s = '') => `<ul class="hs-kurallar" id="hs-kurallar" aria-label="Şifre kuralları">${KURALLAR.map(([m, f]) => { const ok = f(s); return `<li class="${ok ? 'is-ok' : ''}">${ic(ok ? 'circle-check' : 'circle')}<span>${esc(m)}</span><span class="dgu-sr">${ok ? 'karşılandı' : 'karşılanmadı'}</span></li>`; }).join('')}</ul>`;
  // Gülücük kapak (ana sayfa hero'su ile aynı katmanlar): gerçek tarif fotoğrafı (DGVERI), ortak koyu geçiş — üst .dg-veil-top, alt metnin
  // konumundan DGCard.veils → --dg-veil (ana sayfa hero kaydırıcısıyla aynı eğri ve yoğunluk) —, ayrı primary ışık katmanı (screen),
  // resmi beyaz logo; başlık display rolünde (yalnız hero başlıkları).
  const foto = on => (DGVERI.tarifler.find(t => t.slug.startsWith(on)) || DGVERI.tarifler[0]).gorsel;
  const KAPAK = foto('tavuk-curry'); // yalnız Giriş Yap ve Kayıt Ol (aynı fotoğraf: sekme geçişinde sahne değişmez)
  const kapak = (g, h1, p, ham) => DG.gulucuk({gorsel: g, sinif: 'hs-kapak', icerik: `<header class="hs-kapak-metin" data-dg-veil-from><img class="hs-logo" src="../assets/marka/dadagastro-beyaz.svg" alt="DadaGastro"><h1 class="t-display">${esc(h1)}</h1>${p ? `<p>${ham ? p : esc(p)}</p>` : ''}</header>`});   // ortak gülücük kapak (DG.gulucuk)
  const sayfa = (k, govde) => `${k}<div class="dgu-ic dgu-yigin hs-govde">${govde}</div>`;
  // Düz hâl (V1): yardımcı hesap ekranlarında görsel hero yok; primary header (geri + başlık + menü), sayfa başlığı ve açıklaması beyaz alanda.
  const bas = (h1, p, ham) => `<header class="hs-bas"><h1 class="t-page">${esc(h1)}</h1>${p ? `<p>${ham ? p : esc(p)}</p>` : ''}</header>`;
  const duz = govde => `<div class="dgu-ic dgu-yigin hs-govde is-duz">${govde}</div>`;
  const basari = (ikon, baslik, metin = '', eylem = '') => durum({ikon, baslik, metin, eylem: eylem ? `<div class="dgu-yigin-12 hs-eylemler">${eylem}</div>` : ''});

  // Form çizici: alanlar + hatalar yeniden çizilir, değerler korunur, ilk hatalı alana odak (docs/52 E-form).
  function formBagla(root, {ciz, dogrula, basari: ok, girdi}) {
    const kap = root.querySelector('[data-form]');
    if (!kap) return () => {}; // kabuk genel hali (hata, zaman aşımı) içeriği değiştirdiyse form yok
    const yenile = (d, h) => { kap.innerHTML = ciz(d, h); girdi?.(kap); const ilk = Object.keys(h)[0]; if (ilk) (kap.querySelector(`[name="${ilk}"]`) || kap.querySelector('input:not([type=hidden])'))?.focus(); };
    const oku = () => { const d = {}; [...kap.elements].forEach(el => { if (!el.name) return; d[el.name] = el.type === 'checkbox' ? el.checked : el.type === 'password' || el.dataset.ham != null ? el.value : el.value.trim(); }); return d; };
    kap.addEventListener('submit', e => {
      e.preventDefault();
      const d = oku(), h = dogrula(d);
      if (Object.keys(h).length) { yenile(d, h); return; }
      ok(d, kap);
    });
    kap.addEventListener('input', () => girdi?.(kap));
    girdi?.(kap);
    return yenile;
  }

  // Oturum aç → bekleyen eylemi tamamla → dön
  function oturumAc(eposta, mesaj) {
    store.set('oturum', {rol: /pro/i.test(eposta) ? 'pro' : 'uye'});
    const e = qs().get('eylem');
    const m = (e && DG.eylemiTamamla(e)) || mesaj;
    DG.bildir(m, {ikon: I('check')});
    return m;
  }
  const don = () => setTimeout(() => location.replace(donusAdresi()), DGTOKENS.motion.reveal * 2);

  // Üyelik paneli (canlı /giris ve /kayit sol panosu): etiket, başlık, metin, 4 avantaj, 3 site sayacı (canlı değerler, 12 Ekim).
  const avantajlar = () => `<section class="dgu-kart is-gri dgu-yigin-12" aria-labelledby="hs-av-baslik"><p class="t-label c-deep">DadaGastro Üyeliği</p>${DG.bas('Mutfağın sana göre şekillensin').replace('<h2>', '<h2 id="hs-av-baslik">')}<p class="c-muted">Tariflerini sakla, denediklerini işaretle, kendi mutfak defterini oluştur — hepsi ücretsiz.</p><ul class="dgu-yigin-8">${['Sınırsız tarif kaydet, koleksiyon oluştur', 'Kendi tariflerini yayınla, şef rozetleri kazan', 'Sana özel “Bugün Ne Pişirsem” önerileri', 'Haftalık menünü kur, alışveriş listeni çıkar'].map(x => `<li class="hs-madde">${ic('check')}<span>${esc(x)}</span></li>`).join('')}</ul><dl class="dgu-istatistik" data-sutun="3">${[['6.112', 'tarif'], ['1.055', 'üye'], ['2.163', 'püf noktası']].map(([d, e]) => `<div><dt>${e}</dt><dd>${d}</dd></div>`).join('')}</dl></section>`;
  const sekme = secili => seg('Üyelik sekmeleri', [['giris', 'Giriş Yap'], ['kayit', 'Kayıt Ol']], secili);
  const sekmeBagla = root => root.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('click', () => { if (b.getAttribute('aria-selected') !== 'true') location.replace(b.dataset.seg + '.html' + devam()); }));

  // ---------- H1 · Giriş ----------
  // Canlı #loginErr: “Giriş yapılamadı” + sunucu cümlesi (kimlik.giris_hatali); doğrulama bağlantısından gelen misafire ayrı cümle.
  const DOGRULA_GIRIS = 'E-posta doğrulaması henüz tamamlanmadı. Bağlantının ait olduğu hesapla giriş yap; Facebook ile kaydolduysan Facebook düğmesini kullan. Girişten sonra doğrulama bağlantına otomatik döneceksin. Bağlantının süresi dolmuşsa Tekrar gönder ile yenisini isteyebilirsin.';
  DG.sayfa('giris', ctx => {
    const hataHal = ctx.durum === 'hata-form', dogrulaHal = ctx.durum === 'dogrula-giris';
    const ciz = (d = {}, h = {}) => `${alan({ad: 'eposta', etiket: 'E-posta', tur: 'email', yer: 'ornek@eposta.com', ikon: 'envelope', deger: d.eposta, hata: h.eposta, oto: 'username', zorunlu: true})}
      <div class="dgu-yigin-8">${alan({ad: 'sifre', etiket: 'Şifre', tur: 'password', yer: 'Şifren', ikon: I('password'), deger: d.sifre, hata: h.sifre, oto: 'current-password', zorunlu: true})}
      <div class="u-ara hs-satir">${secim('beni_hatirla', 'Beni hatırla', {secili: d.beni_hatirla})}<a class="dgu-btn dgu-btn--metin" href="sifremi-unuttum.html${devam()}">Şifremi unuttum</a></div></div>
      ${gonder('Giriş Yap', 'right-to-bracket')}`;
    const html = sayfa(kapak(KAPAK, 'Tekrar hoş geldin', 'Kaldığın yerden devam et — defterin seni bekliyor.'), `${sekme('giris')}
      ${hataHal ? serit('Giriş yapılamadı', 'E-posta ya da şifre hatalı.') : ''}${dogrulaHal ? serit('E-postanı doğrulamak için giriş yap', DOGRULA_GIRIS) : ''}
      ${sosyal('ile devam et')}
      <form class="dgu-yigin" data-form novalidate>${ciz(hataHal ? {eposta: 'ornek@eposta.com'} : {})}</form>
      <p class="hs-alt">Hesabın yok mu? <a class="hs-link" href="kayit.html${devam()}">Hemen Kayıt Ol</a></p>
      ${avantajlar()}`);
    return {tur: 'alt', baslik: 'Giriş Yap', html, iskelet: false, sonra(root) {
      sekmeBagla(root);
      root.querySelectorAll('[data-sosyal]').forEach(b => b.addEventListener('click', () => { oturumAc('', 'Giriş yaptın.'); don(); }));
      if (hataHal) root.querySelector('#f-sifre')?.focus();
      root.querySelector('[data-form]')?.addEventListener('submit', () => root.querySelectorAll('.dgu-ipucu[role=alert]').forEach(x => x.remove()));
      formBagla(root, {ciz,
        dogrula: d => { const h = {}; if (!EPOSTA.test(d.eposta)) h.eposta = 'Geçerli bir e-posta adresi gir.'; if (!d.sifre) h.sifre = 'Şifreni gir.'; return h; },
        basari: d => { if (/2fa/i.test(d.eposta)) { store.set('iki-adim', {eposta: d.eposta}); location.href = 'iki-adim.html' + devam(); return; } oturumAc(d.eposta, 'Giriş yaptın.'); don(); }});
    }};
  });

  // ---------- H2 · Kayıt ----------
  // Canlı #kayitOk (başarı bloğu) metni birebir; düğme canlıda /hesabim/ayarlar#profil, mobilde ilk kurulum tercihleri (docs/52 H2 → G7).
  // Bir eylemin ortasında kayıt olunduysa (?donus=) tercihler bitince/atlanınca oraya dönülür; “Şimdilik atla” doğrudan döner.
  const kayitTamam = () => { const d = qs().get('donus'), tercih = 'tercihler.html?ilk=1' + (d ? '&donus=' + encodeURIComponent(d) : '');
    return basari('check', 'Hesabın hazır, hoş geldin!', 'Doğrulama bağlantısını e-postana gönderdik. Şimdi mutfak profilini dolduralım — tarif ve menü önerilerin buna göre gelsin.',
      `${btn('Mutfak Profilim', {href: tercih, ikon: 'clipboard-list', tam: true})}${d ? btn('Şimdilik atla', {tur: 'ikincil', href: donusAdresi(), tam: true}) : ''}<p class="dgu-yardim">Bu adımı sonra Hesabım'dan da yapabilirsin.</p>`) + avantajlar(); };
  const ONAY_HATA = 'Hesap açmak için Üyelik Sözleşmesi ve Aydınlatma Metni\'ni onaylamanız gerekiyor.'; // canlı data-sosyal-onay-uyari
  DG.sayfa('kayit', ctx => {
    const hataHal = ctx.durum === 'hata-form';
    const ciz = (d = {}, h = {}) => `<div class="dgu-ikili hs-ad">${alan({ad: 'ad', etiket: 'Ad', yer: 'Adın', deger: d.ad, hata: h.ad, oto: 'given-name', zorunlu: true})}${alan({ad: 'soyad', etiket: 'Soyad', yer: 'Soyadın', deger: d.soyad, hata: h.soyad, oto: 'family-name', zorunlu: true})}</div>
      ${alan({ad: 'eposta', etiket: 'E-posta', tur: 'email', yer: 'ornek@eposta.com', ikon: 'envelope', deger: d.eposta, hata: h.eposta, oto: 'email', zorunlu: true})}
      ${alan({ad: 'sifre', etiket: 'Şifre', tur: 'password', yer: 'En az 8 karakter', ikon: I('password'), deger: d.sifre, hata: h.sifre, oto: 'new-password', zorunlu: true, yardim: 'En az 8 karakter; büyük/küçük harf, rakam ve özel karakter içermeli.'})}
      <div class="hs-onaylar">${secim('sozlesme', `<span>${yasal('uyelik', 'Üyelik Sözleşmesi')}'ni okudum, kabul ediyorum. ${zorunlu}</span>`, {secili: d.sozlesme, zorunlu: true})}
      ${secim('aydinlatma', `<span>${yasal('aydinlatma', 'Aydınlatma Metni')}'ni ve ${yasal('kvkk', 'KVKK Metni')}'ni okudum, onaylıyorum. ${zorunlu}</span>`, {secili: d.aydinlatma, zorunlu: true})}</div>
      ${hataP('e-onay', h.onay)}
      ${gonder('Hesabımı Oluştur', 'user-plus')}${hizNotu()}`;
    // Alan cümleleri canlı /kayit giris-hata satırlarından; şifre kuralı sunucuda yalnız min:8 (KayitIstegi).
    const dogrula = d => { const h = {}; if (!d.ad) h.ad = 'Adınızı girin.'; if (!d.soyad) h.soyad = 'Soyadınızı girin.'; if (!EPOSTA.test(d.eposta || '')) h.eposta = 'Geçerli bir e-posta adresi girin.'; if (Array.from(d.sifre || '').length < 8) h.sifre = 'Şifreniz en az 8 karakter olmalı.'; if (!d.sozlesme || !d.aydinlatma) h.onay = ONAY_HATA; return h; };
    const onayIsaretle = (kap, h) => kap.querySelectorAll('.hs-onaylar input').forEach(i => i.toggleAttribute('aria-invalid', !!h.onay && !i.checked));
    const ornek = {eposta: 'ornek@eposta', sifre: 'mutfak'};
    const govde = ctx.durum === 'tamam' ? kayitTamam() : `${sekme('kayit')}
      <form class="dgu-yigin" data-form novalidate>${sosyal('ile kayıt ol')}<div class="dgu-yigin" data-alanlar>${hataHal ? ciz(ornek, dogrula(ornek)) : ciz()}</div></form>
      <p class="hs-alt">Zaten üye misin? <a class="hs-link" href="giris.html${devam()}">Giriş Yap</a></p>
      ${avantajlar()}`;
    return {tur: 'alt', baslik: 'Kayıt Ol', iskelet: false, html: sayfa(kapak(KAPAK, 'Aramıza katıl', '1 dakikada hesabını oluştur, mutfak defterini açalım.'), govde), sonra(root) {
      if (ctx.durum === 'tamam') return;
      sekmeBagla(root);
      const form = root.querySelector('[data-form]'), alanlar = form.querySelector('[data-alanlar]');
      const yenile = (d, h) => { alanlar.innerHTML = ciz(d, h); onayIsaretle(alanlar, h); const ilk = Object.keys(h)[0]; if (ilk) (ilk === 'onay' ? alanlar.querySelector('.hs-onaylar input:not(:checked)') : alanlar.querySelector(`[name="${ilk}"]`))?.focus(); };
      const oku = () => { const d = {}; [...form.elements].forEach(el => { if (el.name) d[el.name] = el.type === 'checkbox' ? el.checked : el.type === 'password' ? el.value : el.value.trim(); }); return d; };
      const tamamla = eposta => { store.set('kayit-eposta', eposta || ''); oturumAc(eposta || '', 'Hesabın oluşturuldu.'); const g = root.querySelector('.hs-govde'); g.innerHTML = kayitTamam(); const h2 = g.querySelector('h2'); h2?.setAttribute('tabindex', '-1'); h2?.focus(); scrollTo(0, 0); };
      if (hataHal) { onayIsaretle(alanlar, {onay: 1}); root.querySelector('#f-ad')?.focus(); }
      form.addEventListener('submit', e => { e.preventDefault(); const d = oku(), h = dogrula(d); if (Object.keys(h).length) { yenile(d, h); return; } tamamla(d.eposta); });
      // Canlı sosyal-kayit-onayi.js: iki onay işaretlenmeden sağlayıcıya gidilmez; eksikse onay satırının altındaki cümle açılır, ilk boş kutu odaklanır.
      root.querySelectorAll('[data-sosyal]').forEach(b => b.addEventListener('click', () => {
        const eksik = [...alanlar.querySelectorAll('.hs-onaylar input')].filter(i => !i.checked);
        const p = alanlar.querySelector('#e-onay');
        if (eksik.length) { p.querySelector('span').textContent = ONAY_HATA; p.hidden = false; onayIsaretle(alanlar, {onay: 1}); eksik[0].focus({preventScroll: true}); p.scrollIntoView({block: 'center'}); return; }
        tamamla('');
      }));
      // Kutular tamamlanınca onay uyarısı düşer (canlı ile aynı).
      form.addEventListener('change', e => { if (!e.target.closest('.hs-onaylar')) return; const p = alanlar.querySelector('#e-onay'); if (![...alanlar.querySelectorAll('.hs-onaylar input')].some(i => !i.checked)) { p.hidden = true; onayIsaretle(alanlar, {}); } });
    }};
  });

  // ---------- H3 · Şifremi unuttum (canlı /giris #auPaneSifre) ----------
  const GONDERILDI = 'E-postana şifre sıfırlama bağlantısı gönderdik.'; // kimlik.sifre_baglanti_gonderildi (kayıtlı/kayıtsız adres için aynı)
  // “E-posta gelmediyse” (parçalı gri liste, DG.parcali): canlı cümlelerden — spam klasörü (doğrulama panosu), bağlantının 30 dk ve tek
  // kullanımlık olması (canlı yeni şifre paneli); hesabına erişemeyen için Çözüm Merkezi ve İletişim.
  const gelmediyse = () => `<section class="dgu-yigin-12" aria-labelledby="hs-gelmedi">${DG.bas('E-posta gelmediyse').replace('<h2>', '<h2 id="hs-gelmedi">')}${DG.parcali([
    {ikon: 'envelope-open-text', baslik: 'Spam klasörüne de bak', alt: 'Gelen kutunda göremiyorsan spam klasörünü kontrol et.', bilgi: true},
    {ikon: I('time'), baslik: 'Bağlantı 30 dakika geçerli', alt: 'Yalnız bir kez kullanılabilir; süresi dolarsa yenisini iste.', bilgi: true},
    {ikon: 'life-ring', baslik: 'Çözüm Merkezi', alt: 'Hesabına erişemiyorsan sık sorulan sorulara bak ya da talep oluştur.', href: 'destek.html'},
    {ikon: 'envelope', baslik: 'İletişim', alt: 'Bize doğrudan yaz.', href: 'iletisim.html'}], {aria: 'E-posta gelmediyse'})}</section>`;
  DG.sayfa('sifremi-unuttum', ctx => {
    const hataHal = ctx.durum === 'hata-form', tamam = ctx.durum === 'tamam';
    const ciz = (d = {}, h = {}) => `${alan({ad: 'eposta', etiket: 'Kayıtlı e-posta adresin', tur: 'email', yer: 'ornek@eposta.com', ikon: 'envelope', deger: d.eposta, hata: h.eposta, oto: 'email', zorunlu: true})}${gonder('Sıfırlama Bağlantısı Gönder', 'paper-plane')}${hizNotu()}`;
    const html = `<div data-kap>${tamam ? basari('envelope-circle-check', GONDERILDI) : `<form class="dgu-yigin" data-form novalidate>${ciz({}, hataHal ? {eposta: 'Geçerli bir e-posta adresi gir.'} : {})}</form>`}</div>
      ${gelmediyse()}`;
    return {tur: 'alt', baslik: 'Şifremi unuttum', iskelet: false, html: duz(`<a class="dgu-btn dgu-btn--metin hs-geri" href="giris.html${devam()}">${ic(I('back'))}<span>Girişe dön</span></a>
      ${bas('Şifreni mi unuttun?', 'Sorun değil. E-posta adresini yaz, sıfırlama bağlantısını gönderelim.')}${html}`), sonra(root) {
      if (tamam) return;
      if (hataHal) root.querySelector('#f-eposta')?.focus();
      formBagla(root, {ciz, dogrula: d => EPOSTA.test(d.eposta) ? {} : {eposta: 'Geçerli bir e-posta adresi gir.'},
        basari: d => { store.set('sifre-eposta', d.eposta); const k = root.querySelector('[data-kap]'); k.innerHTML = basari('envelope-circle-check', GONDERILDI); const h = k.querySelector('h2'); h?.setAttribute('tabindex', '-1'); h?.focus(); }});
    }};
  });

  // ---------- H4 · Yeni şifre (canlı /giris?tab=yeni-sifre … #auPaneYeniSifre; postadaki bağlantıdan) ----------
  // Adres canlıdaki gibi maskeli (ilk harf + * + @alan); adres yoksa canlı “hesabın” der, mobilde yalnız ikinci cümle.
  const maskele = a => { if (!a || !a.includes('@')) return ''; const [y, al] = a.split('@'); return Array.from(y)[0] + '*'.repeat(Math.max(1, Array.from(y).length - 1)) + '@' + al; };
  DG.sayfa('yeni-sifre', ctx => {
    const hataHal = ctx.durum === 'hata-form', m = maskele(ctx.qs.get('eposta') || store.get('sifre-eposta', ''));
    const ciz = (d = {}, h = {}) => `${alan({ad: 'sifre', etiket: 'Yeni şifren', tur: 'password', yer: 'En az 8 karakter', ikon: I('password'), deger: d.sifre, hata: h.sifre, oto: 'new-password', zorunlu: true})}${kurallar(d.sifre || '')}
      <div data-tekrar>${alan({ad: 'sifre_tekrar', etiket: 'Yeni şifren (tekrar)', tur: 'password', yer: 'Tekrar yaz', ikon: I('password'), deger: d.sifre_tekrar, hata: h.sifre_tekrar, oto: 'new-password', zorunlu: true})}</div>
      ${gonder('Şifremi Güncelle', I('password'), 'data-ys-gonder')}${not(I('time'), 'Bağlantı süresi', 'Bağlantı 30 dakika geçerlidir ve yalnız bir kez kullanılabilir.')}`;
    const dogrula = d => { const h = {}; if (!kurallarTamam(d.sifre)) h.sifre = 'Şifren beş kuralın hepsini karşılamalı.'; if (!d.sifre_tekrar || d.sifre_tekrar !== d.sifre) h.sifre_tekrar = 'İki şifre birbirini tutmuyor.'; return h; };
    const guncellendi = () => basari('circle-check', 'Şifren güncellendi. Artık yeni şifrenle giriş yapabilirsin.', '', btn('Girişe Dön', {href: 'giris.html' + devam(), ikon: 'arrow-right', tam: true}));
    const govde = ctx.durum === 'sure-doldu'
      ? `${serit('Bağlantı geçersiz', 'Bu bağlantı geçersiz ya da süresi dolmuş. Yeni bir sıfırlama bağlantısı iste.', 'link-slash')}${btn('Yeni bağlantı iste', {href: 'sifremi-unuttum.html' + devam(), ikon: 'paper-plane', tam: true})}`
      : ctx.durum === 'tamam' ? guncellendi()
      : `<form class="dgu-yigin" data-form novalidate>${hataHal ? ciz({sifre: 'mutfak1', sifre_tekrar: 'mutfak'}, dogrula({sifre: 'mutfak1', sifre_tekrar: 'mutfak'})) : ciz()}</form>`;
    const ust = bas('Yeni şifreni belirle', m ? `Bağlantı <b>${esc(m)}</b> hesabı için açıldı. Yeni şifreni iki kez yaz.` : 'Yeni şifreni iki kez yaz.', true);
    const html = `<div data-kap class="dgu-yigin">${govde}</div>`;
    // Canlı davranış: kurallar yazarken işaretlenir; tekrar alanı doluysa ve tutmuyorsa cümle anında görünür; düğme beş kural + eşleşme olunca açılır.
    const canli = kap => {
      const s = kap.querySelector('#f-sifre'), t = kap.querySelector('#f-sifre_tekrar'), g = kap.querySelector('[data-ys-gonder]'); if (!s || !t) return;
      const k = kap.querySelector('#hs-kurallar'); if (k) k.outerHTML = kurallar(s.value);
      const alanT = t.closest('.dgu-alan'), tutmuyor = t.value !== '' && t.value !== s.value;
      let p = alanT.querySelector('.dgu-hata');
      if (tutmuyor && !p) { alanT.querySelector('.dgu-girdi').insertAdjacentHTML('afterend', `<p class="dgu-hata">${ic(I('error'))}İki şifre birbirini tutmuyor.</p>`); }
      if (!tutmuyor && p) p.remove();
      alanT.classList.toggle('is-hata', tutmuyor);
      if (kurallarTamam(s.value)) { const a = s.closest('.dgu-alan'); a.classList.remove('is-hata'); a.querySelector('.dgu-hata')?.remove(); }
      t.toggleAttribute('aria-invalid', tutmuyor);
      g.disabled = !(kurallarTamam(s.value) && t.value !== '' && t.value === s.value);
    };
    return {tur: 'alt', baslik: 'Yeni şifre', iskelet: false, html: duz(ust + html), sonra(root) {
      if (!root.querySelector('[data-form]')) return;
      if (hataHal) { root.querySelector('#f-sifre')?.focus(); }
      formBagla(root, {ciz, dogrula, girdi: canli, basari: () => { const k = root.querySelector('[data-kap]'); k.innerHTML = guncellendi(); const h = k.querySelector('h2'); h?.setAttribute('tabindex', '-1'); h?.focus(); }});
    }};
  });

  // ---------- H5 · E-posta doğrulama (+ E7) — dogrulama-panosu.blade.php ----------
  // Haller: bekliyor (varsayılan) · tamam (yeni doğrulandı) · zaten · gecersiz (bağlantı doğrulanamadı).
  DG.sayfa('eposta-dogrula', ctx => {
    const s = ['tamam', 'zaten', 'gecersiz'].includes(ctx.durum) ? ctx.durum : 'bekliyor';
    const dogrulanmis = s === 'tamam' || s === 'zaten';
    const eposta = ctx.qs.get('eposta') || store.get('kayit-eposta', '');
    const baslik = {gecersiz: 'Bağlantı doğrulanamadı', zaten: 'Bu adres zaten doğrulanmış.', tamam: 'E-postan doğrulandı', bekliyor: 'E-postanı doğrula'}[s];
    // Canlı .giris-basari: zarf ikonu; bekliyorda “Gelen kutunu kontrol et” + adres cümlesi, yeni doğrulamada onay cümlesi, “zaten”de yalnız ikon.
    const kutuMetin = s === 'bekliyor'
      ? `<h2 class="t-section">Gelen kutunu kontrol et</h2><p>${eposta ? `<b>${esc(eposta)}</b> adresin` : 'Adresin'} için doğrulama bağlantısı gönderim sırasına alındı. Mail geldiğinde bağlantıyı aç; gelen kutunda göremiyorsan <b>spam klasörüne</b> de bak. Bağlantı <b>60 dakika</b> geçerli.</p>`
      : s === 'tamam' ? '<p>Adresin onaylandı. Artık içerik gönderebilir, yorum yapabilir ve paylaşabilirsin.</p>' : '';
    const html = `<div data-mesaj aria-live="polite">${s === 'gecersiz' ? serit('Bağlantı geçersiz', 'Bu doğrulama bağlantısı geçersiz ya da süresi dolmuş. Tekrar gönder düğmesiyle yeni bir bağlantı iste.', 'link-slash') : ''}</div>
      ${s !== 'gecersiz' ? `<div class="dgu-durum hs-dg-kutu"><span class="dgu-durum-ikon">${ic('envelope-circle-check')}</span>${kutuMetin}</div>` : ''}
      <div class="dgu-yigin-12">${dogrulanmis ? '' : btn('Tekrar gönder', {tur: 'ikincil', attrs: 'data-yeniden', tam: true})}${btn('Siteye devam et', {href: donusAdresi(), tam: true})}</div>
      ${dogrulanmis ? '' : `<div class="dgu-yigin-12"><p class="dgu-yardim">Adresi yanlış yazdıysan çıkış yapıp doğru adresinle yeniden kayıt olabilirsin. Zaten hesabın varsa giriş yap. Profil ekranından e-posta değişikliği şu anda yapılamıyor.</p>${btn('Çıkış yap', {tur: 'ikincil', ikon: I('logout'), attrs: 'data-cikis', tam: true})}</div>`}`;
    return {tur: 'alt', baslik: 'E-posta doğrulama', iskelet: false, html: duz(bas(baslik, 'Tarifleri keşfetmeye ve mutfak defterini kullanmaya devam edebilirsin.') + html), sonra(root) {
      // Canlı: gönderim sıraya alınır; 60 sn içinde yeniden istenirse “Yeni bağlantı istemek için N saniye bekle.” (RateLimiter, kayıtta da başlar).
      let son = 0; const kutuM = root.querySelector('[data-mesaj]');
      const yaz = t => { kutuM.innerHTML = not('envelope', 'Doğrulama bağlantısı', t, 'status'); };
      root.querySelector('[data-yeniden]')?.addEventListener('click', () => {
        const kalan = Math.ceil((son + 60000 - Date.now()) / 1000);
        if (son && kalan > 0) { yaz(`Yeni bağlantı istemek için ${kalan} saniye bekle.`); return; }
        son = Date.now(); yaz('Doğrulama bağlantın gönderilmek üzere sıraya alındı. Gelen kutunu ve spam klasörünü kontrol et.');
      });
      root.querySelector('[data-cikis]')?.addEventListener('click', () => { store.set('oturum', {rol: 'misafir'}); DG.bildir('Çıkış yapıldı.'); setTimeout(() => location.replace(DG.KOK.ana), DGTOKENS.motion.reveal * 2); });
    }};
  });

  // ---------- H6 · İki adımlı doğrulama — canlıda yok; emekli depo two-factor-challenge.blade.php ----------
  DG.sayfa('iki-adim', ctx => {
    const hataHal = ctx.durum === 'hata-form', kurtarmaAcik = ctx.qs.get('mod') === 'kurtarma';
    const H = {bos: 'İki adımlı doğrulama kodu gereklidir.', gecersiz: 'İki adımlı doğrulama kodu geçersiz.'};
    const kodAlan = (d = {}, h = {}) => alan({ad: 'code', etiket: 'Doğrulama Kodu', yer: '', ikon: 'shield-halved', deger: d.code, hata: h.code, oto: 'one-time-code'});
    const kurAlan = (d = {}, h = {}) => alan({ad: 'recovery_code', etiket: 'Kurtarma Kodu', yer: '', ikon: I('password'), deger: d.recovery_code, hata: h.recovery_code, oto: 'one-time-code'});
    const html = `<form class="dgu-yigin" data-iki="kod" novalidate><div data-alan>${kodAlan({}, hataHal && !kurtarmaAcik ? {code: H.gecersiz} : {})}</div>${gonder('Doğrula', 'shield-halved')}</form>
      <details class="hs-ac"${kurtarmaAcik ? ' open' : ''}><summary>${ic(I('expand'))}<span>Uygulamana erişemiyor musun? Kurtarma kodu kullan</span></summary>
        <form class="dgu-yigin" data-iki="kurtarma" novalidate><div data-alan>${kurAlan({}, hataHal && kurtarmaAcik ? {recovery_code: H.gecersiz} : {})}</div><button class="dgu-btn dgu-btn--ikincil dgu-btn--tam" type="submit">${ic(I('password'))}<span>Kurtarma Koduyla Doğrula</span></button></form></details>
      <p class="hs-alt"><button class="hs-link hs-link-btn" type="button" data-farkli>Farklı hesapla giriş yap</button></p>`;
    return {tur: 'alt', baslik: 'İki adımlı doğrulama', iskelet: false, html: duz(bas('İki Adımlı Doğrulama', 'Doğrulama uygulamandaki 6 haneli kodu gir.') + html), sonra(root) {
      const hazirla = () => { const i = root.querySelector('#f-code'); if (i) { i.inputMode = 'numeric'; i.maxLength = 6; } const r = root.querySelector('#f-recovery_code'); if (r) { r.autocapitalize = 'off'; r.spellcheck = false; } };
      hazirla();
      root.querySelectorAll('[data-iki]').forEach(f => f.addEventListener('submit', e => {
        e.preventDefault();
        const kod = f.dataset.iki === 'kod', ad = kod ? 'code' : 'recovery_code', v = (f.elements[ad]?.value || '').trim();
        const hata = !v ? H.bos : (kod ? !/^\d{6}$/.test(v) : v.length < 8) ? H.gecersiz : '';
        if (hata) { f.querySelector('[data-alan]').innerHTML = (kod ? kodAlan : kurAlan)({[ad]: v}, {[ad]: hata}); hazirla(); f.querySelector('input')?.focus(); return; }
        const ep = store.get('iki-adim', {}).eposta || ''; store.del('iki-adim'); oturumAc(ep, 'Giriş yaptın.'); don();
      }));
      root.querySelector('details')?.addEventListener('toggle', e => { if (e.target.open) e.target.querySelector('input')?.focus(); });
      root.querySelector('[data-farkli]')?.addEventListener('click', () => { store.del('iki-adim'); store.set('oturum', {rol: 'misafir'}); location.replace('giris.html' + devam()); });
      if (hataHal) root.querySelector(kurtarmaAcik ? '#f-recovery_code' : '#f-code')?.focus();
    }};
  });
})();
