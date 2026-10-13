/* G5 · Ayarlar ve destek (docs/52 S3–S6, H17). Kaynak metinler: canlı backend (DadaGastro) g-hesabim, g-cozum-merkezi,
   g-odemelerim ve Görüş Bildir paneli; SSS ve destek konuları tohum verisinden (aşağıda kaynak notu).
   Sayfalar: ayarlar (?bolum= bildirim · gizlilik · guvenlik · dil · veri · dondur · sil · uygulama · abonelikler), destek, gorus-bildir.
   Kurallar: hesap işlemleri (şifre, 2FA, oturum kapatma, dondurma, silme, talep, görüş) gerçek değildir → “Önizleme”.
   Ayarlar yalnız bu cihazda: dg-ayar {bildirim, ilgi, gizlilik, bolge, titresim, ikiAdim, zil, kapaliTur}; dil kök menüyle ortak
   (dadagastro-dil); takip dg-takip; destek talepleri dg-destek. ?ornek=1 (abonelikler): gerçek şeflerle, cihaza YAZILMAYAN örnek. */
(() => {
  const {ic, I, btn, esc, store, avatar, satir, durum, alan, seg, onizleme, anahtar} = DG;
  const V = window.DGVERI, TK = window.DGTOKENS;
  const qs = new URLSearchParams(location.search);
  const ORNEK = qs.has('ornek');
  const donus = () => DG.donusAdres();
  // Grup içi bağlantılar galeri test parametresini (?oturum) korur; bölüm sayfaları geri için ayarlar'a döner.
  const tasi = h => { const o = qs.get('oturum'); return o ? h + (h.includes('?') ? '&' : '?') + 'oturum=' + o : h; };
  const bolumLink = b => tasi(`ayarlar.html?bolum=${b}&donus=${encodeURIComponent('uygulama/' + tasi('ayarlar.html'))}`);
  const girisCagri = ({ikon, baslik, metin, sunar}) => DG.girisDuvari({ikon, baslik, metin, sunar});
  // Revize D12: grup başlığı ortak bölüm başlığı (etiket rolü değil); satırlar .dgu-satirlar ince ayırıcısıyla.
  // EK (tutarlılık): bölüm başlığı ortak DG.bas (.dg-head h2, section rolü); düğme eylemi başlık satırının ikinci sütununa.
  const bas = (b, eylem = '') => DG.bas(b, eylem ? {html: eylem} : undefined);
  // Ortak bilgi notu (DG.ipucu); kaynaktaki metin içi bağlantı (html) ve not eylemi (ek) korunur.
  const not = ({ikon, baslik, metin, html, ek, rol}) => { let h = DG.ipucu({ikon, baslik, metin}); if (html) h = h.replace(`<p>${esc(metin)}</p>`, `<p>${html}</p>`); if (ek) h = h.replace(/<\/p><\/div><\/aside>$/, `</p>${ek}</div></aside>`); if (rol) h = h.replace('<aside class="dgu-ipucu"', `<aside class="dgu-ipucu" role="${rol}"`); return h; };
  // Başlıklı seçim grubu: görünür başlık ortak bölüm başlığı; grup adı radyo grubunun erişilebilir adı.
  const secimBolum = (baslik, ic2, {aciklama = '', sinif = ''} = {}) => `<section class="ay-bolum${sinif ? ' ' + sinif : ''}">${bas(baslik)}${aciklama ? `<p class="dgu-yardim">${esc(aciklama)}</p>` : ''}${ic2.replace('role="radiogroup"', `role="radiogroup" aria-label="${esc(baslik)}"`)}</section>`;
  const grup = (baslik, satirlar) => `<section class="ay-grup">${bas(baslik)}<div class="dgu-satirlar">${satirlar.join('')}</div></section>`;
  const ayar = () => store.get('ayar', {}) || {};
  const ayarYaz = (k, v) => store.set('ayar', {...ayar(), [k]: v});
  const kaydedildi = () => DG.bildir('Kaydedildi', {ikon: I('check')});
  const dilAl = () => { try { return localStorage.getItem('dadagastro-dil') || 'tr'; } catch { return 'tr'; } };
  const DILLER = [['tr', 'Türkçe'], ['en', 'English'], ['es', 'Español'], ['ru', 'Русский'], ['de', 'Deutsch']];

  // Form hatası: alan altında meta metin + ikon (E-form); ilk hatalı alana odak çağıran tarafta.
  function alanHata(alanEl, msg) {
    if (!alanEl) return;
    alanEl.classList.toggle('is-hata', !!msg);
    alanEl.querySelector('input:not([type=hidden]),textarea,button')?.setAttribute('aria-invalid', msg ? 'true' : 'false');
    let p = alanEl.querySelector(':scope > .dgu-hata');
    if (!msg) { p?.remove(); return; }
    if (!p) { p = document.createElement('p'); p.className = 'dgu-hata'; p.setAttribute('role', 'alert'); (alanEl.querySelector(':scope > .dgu-girdi, :scope > [data-hata-sonra]') || alanEl.lastElementChild).after(p); }
    p.innerHTML = ic(I('error')) + esc(msg);
  }
  const odakla = el => { el?.focus(); el?.scrollIntoView({block: 'center', behavior: motion.matches ? 'auto' : 'smooth'}); };

  const secAlan = DG.secAlan;

  // ============ S3 · Ayarlar (Hesap ve Ayarlar) ============
  const BOLUM = {};
  const profilAd = () => { const p = store.get('profil', {}) || {}; return [p.ad, p.soyad].filter(Boolean).join(' ') || window.DGORNEK?.uye?.adSoyad || ''; };
  const tercih = () => { const t = store.get('tercih', {}) || {}; const a = v => Array.isArray(v) ? v : []; return {mutfak: a(t.mutfak), diyet: a(t.diyet), alerjen: a(t.alerjen), seviye: typeof t.seviye === 'string' ? t.seviye : '', kategori: a(t.kategori)}; };
  const secimSayi = n => n ? `${n} seçim` : 'Seçilmedi';

  DG.sayfa('ayarlar', ctx => {
    const b = ctx.qs.get('bolum');
    if (b && BOLUM[b]) return BOLUM[b](ctx);
    const ortak = {tur: 'alt', baslik: 'Ayarlar', menuAktif: 'settings'};
    const uygulamaGrup = grup('Uygulama', [satir({ikon: 'mobile-screen', baslik: 'Uygulama ayarları', alt: 'Dil, bildirim izni, titreşim, sıfırlama', href: bolumLink('uygulama')})]);
    const yardimGrup = grup('Yardım ve yasal', [satir({ikon: 'headset', baslik: 'Çözüm Merkezi', alt: 'Sık sorulanlar ve destek taleplerin', href: tasi('destek.html')}), satir({ikon: 'comment-dots', baslik: 'Görüş Bildir', href: tasi('gorus-bildir.html')}), satir({ikon: 'envelope', baslik: 'İletişim', href: 'iletisim.html'}), satir({ikon: 'scale-balanced', baslik: 'Yasal metinler', href: 'yasal.html'})]);
    if (!ctx.uye) return {...ortak, html: girisCagri({ikon: I('settings'), baslik: 'Hesap ayarların için giriş yap', metin: 'Profilin, bildirim tercihlerin, güvenlik ve ölçü birimi tercihlerin burada; hesabını dondurma ve silme de.', sunar: [[I('notifications'), 'Bildirim tercihleri', 'Bildirimlerini kanal kanal seç'], [I('privacy'), 'Profil görünürlüğü', 'Profilinin ve mutfak geçmişinin kimlere göründüğü'], [I('password'), 'Güvenlik', 'Şifre, iki adımlı doğrulama, açık oturumlar']]}) + `<div class="dgu-ic ay-gruplar">${uygulamaGrup}${yardimGrup}</div>`};
    const t = tercih(), a = ayar(), dil = DILLER.find(([k]) => k === dilAl())?.[1] || 'Türkçe', bolge = a.bolge || {};
    const takip = store.get('takip', []).length;
    // Beyar V4 C7: üstteki profil kartı ortak parçalı gri buton ailesiyle (aynı zemin, köşe, dokunma, ok); ikon kutusu yerine avatar 56.
    const html = `<div class="dgu-ic ay-gruplar">
      <ul class="dgu-parcali" aria-label="Profil"><li><a class="dgu-parcali-oge" href="${tasi('profil-duzenle.html')}">${avatar(profilAd(), 56)}<span class="dgu-parcali-metin"><b class="clamp-1">${esc(profilAd())}</b><small>${ctx.pro ? 'DadaGastro Pro' : 'Ücretsiz'} · Profil bilgilerim</small></span><i class="icon fa-solid fa-${I('rowNext')} dgu-parcali-ok" aria-hidden="true"></i></a></li></ul>
      ${grup('Hesap', [satir({ikon: I('profile'), baslik: 'Profil bilgilerim', alt: 'Ad, kullanıcı adı, e-posta, telefon', href: tasi('profil-duzenle.html')}), satir({ikon: I('privacy'), baslik: 'Profil görünürlüğü', alt: (a.gizlilik?.acik ?? true) ? 'Profilin herkese açık' : 'Profilin yalnız takip ilişkine açık', href: bolumLink('gizlilik')}), satir({ikon: I('notifications'), baslik: 'Bildirim tercihleri', href: bolumLink('bildirim')}), satir({ikon: I('password'), baslik: 'Güvenlik', alt: 'Şifre, iki adımlı doğrulama, açık oturumlar', href: bolumLink('guvenlik')})])}
      ${grup('Mutfak tercihlerim', [satir({ikon: I('cuisine'), baslik: 'Damak zevkin', alt: secimSayi(t.mutfak.length), href: 'tercihler.html?adim=1'}), satir({ikon: 'leaf', baslik: 'Beslenme ve uzak durduklarım', alt: secimSayi(t.diyet.length + t.alerjen.length), href: 'tercihler.html?adim=2'}), satir({ikon: I('difficulty'), baslik: 'Beceri seviyen', alt: t.seviye || 'Seçilmedi', href: 'tercihler.html?adim=3'}), satir({ikon: I('category'), baslik: 'İlgi alanların', alt: secimSayi(t.kategori.length), href: 'tercihler.html?adim=4'})])}
      ${grup('Dil ve bölge', [satir({ikon: I('language'), baslik: 'Dil, bölge ve birimler', alt: [dil, bolge.bolge || 'Türkiye', (bolge.agirlik || 'Gram / kilogram (g, kg)').split(' (')[0]].join(' · '), href: bolumLink('dil')})])}
      ${grup('Üyelik ve abonelikler', [satir({ikon: I('pro'), baslik: 'Pro ve Üyeliğim', alt: ctx.pro ? 'DadaGastro Pro' : 'Ücretsiz plan', href: tasi('pro.html')}), satir({ikon: I('subscribe'), baslik: 'Aboneliklerim', alt: `Şef üyelikleri · ${takip} takip`, href: bolumLink('abonelikler')}), satir({ikon: 'receipt', baslik: 'Ödemelerim', href: tasi('pro.html#odemeler')})])}
      ${uygulamaGrup}
      ${grup('Veri ve hesap yönetimi', [satir({ikon: 'database', baslik: 'Verilerim', alt: 'Gör, indir, sil', href: bolumLink('veri')}), satir({ikon: 'snowflake', baslik: 'Hesabı dondur', href: bolumLink('dondur')}), satir({ikon: I('delete'), baslik: 'Hesabımı sil', sinif: 'is-yikici', href: bolumLink('sil')})])}
      ${yardimGrup}
      ${grup('Oturum', [satir({ikon: I('logout'), baslik: 'Çıkış', sag: '', sinif: 'is-yikici', attrs: 'data-cikis'})])}
      </div>`;
    return {...ortak, html, sonra(root) {
      root.querySelector('[data-cikis]')?.addEventListener('click', async () => { // ?durum=yukleniyor/hata: kabuk iskelet/hata çizer
        if (!await DG.onay({baslik: 'Çıkış yapılsın mı?', metin: 'Bu cihazdaki oturumun kapanır; kayıtların cihazda kalır.', evet: 'Çıkış yap'})) return;
        store.set('oturum', {rol: 'misafir'}); try { sessionStorage.removeItem('dadagastro-member-preview'); } catch { /* yok */ }
        DG.bildir('Çıkış yapıldı'); setTimeout(() => location.replace('ayarlar.html'), TK.motion.reveal);
      });
    }};
  });

  // Bölüm sayfası kabuğu: misafir → giriş çağrısı (canlıda /hesabim/ayarlar misafire 302 → /giris).
  const bolum = (id, baslik, {uyeGerek = true, ikon = I('settings'), girisMetin} = {}, fn) => { BOLUM[id] = ctx => {
    const ortak = {tur: 'alt', baslik, menuAktif: 'settings'};
    if (uyeGerek && !ctx.uye) return {...ortak, html: girisCagri({ikon, baslik: `${baslik} için giriş yap`, metin: girisMetin || 'Bu ayar hesabına bağlıdır; giriş yaptıktan sonra değiştirebilirsin.'})};
    return {...ortak, ...fn(ctx)};
  }; };

  // ----- Bildirim tercihleri (canlı: 7 olay × e-posta/push + kapatılamaz güvenlik uyarıları; kayıt yoksa açık) -----
  const OLAY = [
    ['yorum', 'Tarifime yorum ve puan', 'Yayımladığın bir tarife yorum geldiğinde ya da puan verildiğinde.'],
    ['sef', 'Abone olduğum şeften yeni içerik', 'Takip ettiğin ya da abone olduğun şef yeni tarif, menü veya video yayımladığında.'],
    ['menu', 'Haftalık menü hatırlatması', 'Menündeki günün yemeği ve alışveriş listenin eksikleri.'],
    ['onay', 'Tarif ve püf noktası onayı', 'Gönderdiğin içerik incelemeden geçtiğinde, yayımlandığında ya da düzeltme istendiğinde.'],
    ['ozet', 'Haftalık mutfak özetim', 'Pazar akşamı: denediğin tarifler, gelen yorumlar, okunma sayın ve topluluk puanın.'],
    ['yeni', 'Yeni tarif ve tarifle bağlı video', 'İlgilendiğin kategoriye yeni tarif veya o tarifle gerçekten bağlı video eklendiğinde.'],
    ['pro', 'Kampanya ve DadaGastro Pro fırsatları', 'Paket indirimleri, bayram menüsü seçkileri ve özel dönem kampanyaları.']
  ];
  const kanalAcik = (olay, kanal) => ayar().bildirim?.[olay]?.[kanal] ?? true;
  const kanalYaz = (olay, kanal, v) => { const b = ayar().bildirim || {}; ayarYaz('bildirim', {...b, [olay]: {...(b[olay] || {}), [kanal]: v}}); };
  bolum('bildirim', 'Bildirim tercihleri', {ikon: I('notifications')}, ctx => {
    const red = ctx.qs.get('izin') === 'red';
    const ilgi = ayar().ilgi || [];
    const kat = V.kategoriler.filter(k => k.sayi > 0);
    const html = `<div class="dgu-ic dgu-yigin ay-govde">
      <p class="c-muted">Hangi bildirimi hangi kanaldan alacağını seç. Menü hatırlatmaları haftalık menündeki güne ve saate göre gönderilir.</p>
      ${red ? not({ikon: I('notifications'), baslik: 'Bildirimler kapalı', metin: 'Cihaz ayarlarında DadaGastro bildirimlerine izin verilmemiş; push bildirimleri gelmez. E-posta tercihlerin geçerli kalır.', ek: btn('Ayarlara git', {tur: 'metin', attrs: 'data-cihaz-ayar'}), rol: 'status'}) : ''}
      ${DG.akordiyon([{ikon: I('notifications'), baslik: 'Kanal ayarları', alt: 'Olay başına e-posta ve push', icerik: `<div class="dgu-satirlar" role="group" aria-label="Bildirim kanalları"><div class="dgu-kanal is-bas" aria-hidden="true"><span>Bildirim</span><span>E-posta</span><span>Push</span></div>
        ${OLAY.map(([k, m, a]) => `<div class="dgu-kanal"><span class="dgu-kanal-metin"><b>${esc(m)}</b><small>${esc(a)}</small></span>${anahtar(`${k}-eposta`, kanalAcik(k, 'eposta'), `${m} — e-posta`)}${anahtar(`${k}-push`, kanalAcik(k, 'push'), `${m} — push`)}</div>`).join('')}
        <div class="dgu-kanal"><span class="dgu-kanal-metin"><b>Güvenlik uyarıları</b><small>Yeni cihazdan giriş, şifre değişikliği ve iki adımlı doğrulama işlemleri her zaman e-posta ile bildirilir. Bu bildirim kapatılamaz.</small></span><span class="dgu-kanal-kilit" role="img" aria-label="E-posta: her zaman açık">${ic('lock')}</span><span class="dgu-kanal-kilit" role="img" aria-label="Push: yok">—</span></div></div>`},
        {ikon: I('category'), baslik: 'İlgilendiğim kategoriler', alt: 'Yalnız açıkça seçtiğin kategorilerden yeni tarif ve tarifle bağlı video bildirimi alırsın.', sag: `<span class="dgu-bolum-sayi" data-ilgi-sayi>${ilgi.length}/${kat.length}</span>`, icerik: `<div class="u-yatay" role="group" aria-label="İlgilendiğim kategoriler">${kat.map(k => `<button class="dgu-chip" type="button" data-ilgi="${esc(k.slug)}" aria-pressed="${ilgi.includes(k.slug)}">${ilgi.includes(k.slug) ? ic(I('check')) : ''}${esc(k.ad)}</button>`).join('')}</div>`}], {ad: 'bil', acik: 0})}
      <p class="dgu-yardim">Gelen bildirimlerini görmek için <a class="ay-link" href="${tasi('bildirimler.html')}">bildirim akışına git</a>. Bu tercihler yalnız DadaGastro bildirimlerini kapsar.</p>
      </div>`;
    return {html, sonra(root) {
      root.addEventListener('change', e => { const m = e.target.name?.match(/^(\w+)-(eposta|push)$/); if (!m) return; kanalYaz(m[1], m[2], e.target.checked); kaydedildi(); });
      root.addEventListener('click', e => {
        const c = e.target.closest('[data-ilgi]');
        if (c) { const s = c.dataset.ilgi, l = ayar().ilgi || [], on = !l.includes(s); const yeni = on ? [...l, s] : l.filter(x => x !== s); ayarYaz('ilgi', yeni); c.setAttribute('aria-pressed', on); const sy = root.querySelector('[data-ilgi-sayi]'); if (sy) sy.textContent = `${yeni.length}/${kat.length}`; const i = c.querySelector('.icon'); if (on && !i) c.insertAdjacentHTML('afterbegin', ic(I('check'))); if (!on) i?.remove(); kaydedildi(); return; }
        if (e.target.closest('[data-cihaz-ayar]')) DG.bildir('Cihazının Ayarlar › Bildirimler bölümünden DadaGastro\'ya izin verebilirsin');
      });
    }};
  });

  // ----- Profil görünürlüğü (canlı “Profil Görünürlüğü”) -----
  const GIZ = {acik: true, gecmis: 'herkes', rozet: true, siralama: true, arama: true};
  bolum('gizlilik', 'Profil görünürlüğü', {ikon: I('privacy')}, () => {
    const g = {...GIZ, ...(ayar().gizlilik || {})};
    const sw = (k, m, a) => `<label class="dgu-satir ay-anahtar-satir"><span class="dgu-satir-metin"><span>${esc(m)}</span><small>${esc(a)}</small></span>${anahtar('g-' + k, g[k], m)}</label>`;
    const html = `<div class="dgu-ic dgu-yigin ay-govde"><p class="c-muted">Profilinin ve mutfak geçmişinin kimlere göründüğünü buradan seç. Tarif ve menü verinin dışa aktarımı, saklanması ve silinmesi <a class="ay-link" href="${bolumLink('veri')}">Verilerim</a>'de yönetilir.</p>
      <div class="dgu-satirlar">${sw('acik', 'Profilim herkese açık', 'Kapatırsan profilini yalnız takip ettiğin ve seni takip edenler görür.')}</div>
      ${secimBolum('Mutfak geçmişimi kimler görebilir?', `<div class="dgu-yigin-8" role="radiogroup">${[['herkes', 'Herkes'], ['takipci', 'Takipçilerim'], ['ben', 'Sadece ben']].map(([k, m]) => DG.secim('g-gecmis', m, {tur: 'radio', deger: k, secili: g.gecmis === k})).join('')}</div>`, {aciklama: 'Denediğin tarifler, yazdığın yorumlar ve oluşturduğun koleksiyonlar.'})}
      <div class="dgu-satirlar">${sw('rozet', 'Rozetlerim ve topluluk puanım profilimde görünsün', 'Kapatırsan rozetleri yalnız sen görürsün; Rozetlerim sayfası etkilenmez.')}${sw('siralama', 'Topluluk sıralamalarında adım görünsün', 'Kapatırsan sıralamada “anonim üye” olarak yer alırsın.')}${sw('arama', 'Arama motorlarında görün', 'Kapalıyken herkese açık profilin ve yayındaki tariflerin arama motorlarına dizinlenmez.')}</div>
      ${satir({ikon: 'download', baslik: 'KVKK kapsamında verilerimi indir', href: bolumLink('veri')})}
      </div>`;
    return {html, sonra(root) {
      root.addEventListener('change', e => { const k = e.target.name?.replace(/^g-/, ''); if (!(k in GIZ)) return; const yeni = {...GIZ, ...(ayar().gizlilik || {}), [k]: e.target.type === 'radio' ? e.target.value : e.target.checked}; ayarYaz('gizlilik', yeni); kaydedildi(); });
    }};
  });

  // ----- Güvenlik (canlı “Şifreni değiştir, iki adımlı doğrulamayı yönet, açık oturumlarını gör.”) -----
  const SIFRE_KURAL = [[s => s.length >= 8, 'En az 8 karakter'], [s => /[A-ZÇĞİÖŞÜ]/.test(s), 'Büyük harf'], [s => /[a-zçğıöşü]/.test(s), 'Küçük harf'], [s => /\d/.test(s), 'Rakam'], [s => /[^A-Za-z0-9ÇĞİÖŞÜçğıöşü]/.test(s), 'Özel karakter (!, @, #, $ vb.)']];
  bolum('guvenlik', 'Güvenlik', {ikon: I('password')}, ctx => {
    const hataF = ctx.durum === 'hata-form';
    const iki = ayar().ikiAdim || '';
    const html = `<div class="dgu-ic dgu-yigin ay-govde"><p class="c-muted">Şifreni değiştir, iki adımlı doğrulamayı yönet, açık oturumlarını gör.</p>
      ${DG.akordiyon([{ikon: I('password'), baslik: 'Şifre', alt: 'Şifreni değiştir', icerik: `<form class="dgu-yigin" novalidate data-sifre>
        ${alan({ad: 'mevcut', etiket: 'Mevcut şifren', tur: 'password', oto: 'current-password', zorunlu: true, hata: hataF ? 'Bu alan zorunlu.' : ''})}
        ${alan({ad: 'yeni', etiket: 'Yeni şifre', tur: 'password', oto: 'new-password', yer: 'En az 8 karakter', zorunlu: true, yardim: 'En az 8 karakter; büyük harf, küçük harf, rakam ve özel karakter (!, @, #, $ vb.) içermeli. Başka sitede kullandığın şifreyi tekrar etme.'})}
        ${alan({ad: 'tekrar', etiket: 'Yeni şifre (tekrar)', tur: 'password', oto: 'new-password', yer: 'Tekrar yaz', zorunlu: true, hata: hataF ? 'Şifreler eşleşmiyor.' : ''})}
        ${btn('Şifreyi Güncelle', {attrs: 'type="submit"', tam: true}).replace('type="button" type="submit"', 'type="submit"')}</form>`},
        {ikon: 'shield-halved', baslik: 'İki Adımlı Doğrulama ve Giriş Yöntemleri', alt: 'Hesabına giriş yollarını ve ek doğrulama katmanını yönet.', sag: DG.durumRozet(iki ? 'aktif' : 'kapali', {ad: iki ? 'Açık' : 'Kapalı'}), icerik: `<div class="dgu-satirlar"><button class="dgu-satir" type="button" data-iki-adim><span class="dgu-satir-ikon">${ic('shield-halved')}</span><span class="dgu-satir-metin"><span>İki adımlı doğrulama</span><small>${iki ? (iki === 'sms' ? 'SMS ile kod' : 'Doğrulayıcı uygulama') : 'Hesabına ikinci bir kilit ekler.'}</small></span>${DG.durumRozet(iki ? 'aktif' : 'kapali', {ad: iki ? 'Açık' : 'Kapalı'})}${ic(I('rowNext'))}</button>
          <div class="dgu-satir ay-durum-satir"><span class="dgu-satir-ikon">${ic('envelope')}</span><span class="dgu-satir-metin"><span>E-posta ile giriş</span><small>Birincil giriş yöntemin.</small></span>${DG.durumRozet('aktif')}</div></div>`},
        {ikon: 'mobile-screen', baslik: 'Açık Oturumlarım', alt: 'Hesabına giriş yapılmış cihazlar. Tanımadığın bir cihaz varsa oturumu kapat ve şifreni değiştir.', sag: '<span class="dgu-bolum-sayi">1</span>', icerik: `<div class="dgu-satirlar"><div class="dgu-satir ay-durum-satir"><span class="dgu-satir-ikon">${ic('mobile-screen')}</span><span class="dgu-satir-metin"><span>Bu cihaz</span><small>Bu uygulama</small></span>${DG.durumRozet('aktif', {ad: 'Şu anda aktif'})}</div></div>
        <p class="dgu-yardim">Bu cihaz dışındaki tüm oturumlar kapatılır; yeniden giriş yapman gerekir.</p>${btn('Diğer Tüm Oturumları Kapat', {tur: 'ikincil', ikon: I('logout'), attrs: 'data-oturum-kapat', tam: true})}`}], {ad: 'gv', acik: 0})}
      </div>`;
    return {html, sonra(root) {
      const f = root.querySelector('[data-sifre]');
      if (hataF) f.querySelector('.is-hata input')?.focus();
      f.addEventListener('input', e => { const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, ''); });
      f.addEventListener('submit', e => {
        e.preventDefault();
        const v = Object.fromEntries(new FormData(f)), H = {};
        if (!v.mevcut) H.mevcut = 'Bu alan zorunlu.';
        const eksik = SIFRE_KURAL.filter(([fn]) => !fn(v.yeni || '')).map(([, m]) => m);
        if (!v.yeni) H.yeni = 'Bu alan zorunlu.'; else if (eksik.length) H.yeni = `Eksik: ${eksik.join(', ').toLocaleLowerCase('tr')}.`; else if (v.yeni === v.mevcut) H.yeni = 'Yeni şifren mevcut şifrenden farklı olmalı.';
        if (!v.tekrar) H.tekrar = 'Bu alan zorunlu.'; else if (v.tekrar !== v.yeni) H.tekrar = 'Şifreler eşleşmiyor.';
        ['mevcut', 'yeni', 'tekrar'].forEach(k => alanHata(f.querySelector('#f-' + k).closest('.dgu-alan'), H[k]));
        const ilk = ['mevcut', 'yeni', 'tekrar'].find(k => H[k]); if (ilk) { odakla(f.querySelector('#f-' + ilk)); return; }
        f.reset(); DG.bildir('Şifren güncellendi', {ikon: I('check')});
      });
      root.querySelector('[data-oturum-kapat]').addEventListener('click', async () => { if (await DG.onay({baslik: 'Diğer oturumlar kapatılsın mı?', metin: 'Bu cihaz dışındaki tüm oturumlar kapatılır; yeniden giriş yapman gerekir.', evet: 'Oturumları kapat'})) DG.bildir('Bu cihaz dışında açık oturum yok'); });
      root.querySelector('[data-iki-adim]').addEventListener('click', () => ikiAdimKur());
    }};
  });
  // İki adımlı doğrulama kurulumu (canlı: Yöntem → Doğrulama → Kurtarma; maket kod). Kurtarma kodu üretilmez.
  function ikiAdimKur() {
    const mevcut = ayar().ikiAdim;
    if (mevcut) {
      DG.onay({baslik: 'İki adımlı doğrulama kapatılsın mı?', metin: 'Girişte yalnız şifren istenir.', evet: 'Kapat'}).then(ok => { if (ok) { ayarYaz('ikiAdim', ''); DG.bildir('İki adımlı doğrulama kapatıldı'); setTimeout(() => location.reload(), TK.motion.reveal); } });
      return;
    }
    let adim = 1, yontem = 'sms';
    // Kurulum anahtarı ve kurtarma kodları bu cihazda rastgele üretilir (yalnız bu kurulum için).
    const rast = (n, abc) => Array.from(crypto.getRandomValues(new Uint8Array(n)), x => abc[x % abc.length]).join('');
    const anahtarMetni = rast(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567').match(/.{4}/g).join(' ');
    const kodlar = Array.from({length: 10}, () => rast(8, '23456789ABCDEFGHJKLMNPQRSTUVWXYZ').replace(/(.{4})/, '$1-'));
    const d = DG.sheet({baslik: 'İki Adımlı Doğrulama', govde: '<div data-iki></div>', ayak: `<div class="dgu-ikili">${btn('Geri', {tur: 'ikincil', attrs: 'data-iki-geri'})}${btn('Devam', {attrs: 'data-iki-devam'})}</div>`});
    const kap = d.querySelector('[data-iki]'), geriB = d.querySelector('[data-iki-geri]'), devamB = d.querySelector('[data-iki-devam] span');
    const ciz = () => {
      geriB.querySelector('span').textContent = adim === 1 ? 'Vazgeç' : 'Geri';
      devamB.textContent = adim === 3 ? 'Bitir' : 'Devam';
      kap.innerHTML = `<div class="dgu-yigin"><p class="t-label c-muted">Adım ${adim} / 3 · ${['Yöntem', 'Doğrulama', 'Kurtarma'][adim - 1]}</p>${adim === 1
        ? `<p class="c-muted">Hesabına ikinci bir kilit ekler. Üç adımda kurulur.</p><div class="dgu-yigin-8" role="radiogroup" aria-label="Yöntem">${DG.secim('iki', '<b>SMS ile kod</b><br><small class="c-muted">Kayıtlı telefonuna 6 haneli kod gönderilir.</small>', {tur: 'radio', deger: 'sms', secili: yontem === 'sms'})}${DG.secim('iki', '<b>Doğrulayıcı uygulama</b><br><small class="c-muted">Telefonundaki uygulama 30 saniyede bir yeni kod üretir; şebeke gerekmez.</small>', {tur: 'radio', deger: 'uygulama', secili: yontem === 'uygulama'})}</div>`
        : adim === 2 ? `${yontem === 'uygulama' ? `<div class="dgu-kart is-gri ay-anahtar"><p class="t-meta c-muted">Kurulum anahtarın</p><p class="t-bold ay-kod">${anahtarMetni}</p><p class="t-meta c-muted">Uygulamana bu anahtarı gir; ardından ürettiği kodu aşağıya yaz.</p></div>` : ''}${alan({ad: 'kod', etiket: 'Doğrulama kodu', tur: 'text', yer: '6 haneli kod', oto: 'one-time-code', zorunlu: true, yardim: yontem === 'sms' ? 'Telefonuna gelen 6 haneli kodu yaz.' : 'Uygulamanın ürettiği 6 haneli kodu yaz.'})}`
          : `<p class="dgu-yardim">Bu kodları güvenli bir yere kaydet. Telefonuna erişemezsen hesabına yalnız bunlarla girebilirsin; her kod bir kez kullanılır.</p><section class="ay-bolum">${bas('Kurtarma kodların', btn('Kopyala', {tur: 'metin', ikon: I('copy'), attrs: 'data-kod-kopyala'}))}<ol class="ay-kodlar">${kodlar.map(k => `<li class="ay-kod">${k}</li>`).join('')}</ol></section>${DG.secim('kayit', 'Kurtarma kodlarımı güvenli bir yere kaydettim.')}`}</div>`;
      kap.querySelector('[data-kod-kopyala]')?.addEventListener('click', () => { navigator.clipboard?.writeText(kodlar.join('\n')).then(() => DG.bildir('Kodlar kopyalandı'), () => DG.bildir('Kodlar kopyalanamadı')); });
      const k = kap.querySelector('#f-kod'); if (k) { k.inputMode = 'numeric'; k.maxLength = 6; setTimeout(() => k.focus(), TK.motion.sheet); }
    };
    d.addEventListener('change', e => { if (e.target.name === 'iki') yontem = e.target.value; });
    geriB.addEventListener('click', () => { if (adim === 1) d.kapat(); else { adim--; ciz(); } });
    d.querySelector('[data-iki-devam]').addEventListener('click', () => {
      if (adim === 2) { const k = kap.querySelector('#f-kod'); const ok = /^\d{6}$/.test(k.value.trim()); alanHata(k.closest('.dgu-alan'), ok ? '' : 'Altı haneli kodu yaz.'); if (!ok) { k.focus(); return; } }
      if (adim === 3) { const c = kap.querySelector('input[name=kayit]'); if (!c.checked) { DG.bildir('Önce kurtarma kodlarını kaydettiğini işaretle'); c.focus(); return; } ayarYaz('ikiAdim', yontem); d.kapat(); DG.bildir('İki adımlı doğrulama açıldı', {ikon: I('check')}); setTimeout(() => location.reload(), TK.motion.reveal); return; }
      adim++; ciz();
    });
    ciz();
  }

  // ----- Dil ve bölge (canlı “Dil ve Bölge” + birim tercihleri; S4 dil seçeneği 5 dil, çeviri yok) -----
  const BOLGE = [
    ['bolge', 'Bölge', ['Türkiye', 'Almanya', 'Birleşik Krallık', 'Amerika Birleşik Devletleri']],
    ['saat', 'Saat dilimi', ['(GMT+03:00) İstanbul', '(GMT+01:00) Berlin', '(GMT+00:00) Londra']],
    ['hafta', 'Haftanın ilk günü', ['Pazartesi', 'Pazar']],
    ['agirlik', 'Ağırlık birimi', ['Gram / kilogram (g, kg)', 'Ons / pound (oz, lb)']],
    ['sivi', 'Sıvı ölçüsü', ['Mililitre / litre (ml, L)', 'Fincan / sıvı ons (cup, fl oz)']],
    ['olcu', 'Tarif ölçü sistemi', ['Bardak ve kaşık (su bardağı, yemek kaşığı)', 'Gram ve mililitre']],
    ['sicaklik', 'Fırın sıcaklığı', ['Celsius (°C)', 'Fahrenheit (°F)']],
    ['enerji', 'Kalori birimi', ['Kilokalori (kcal)', 'Kilojul (kJ)']],
    ['tarih', 'Tarih biçimi', ['14.03.2026 (gg.aa.yyyy)', '2026-03-14 (yyyy-aa-gg)']]
  ];
  bolum('dil', 'Dil ve bölge', {uyeGerek: false}, ctx => {
    const B = ayar().bolge || {};
    const html = `<form class="dgu-ic dgu-yigin ay-govde" data-bolge novalidate><p class="c-muted">Arayüz dili, bölge ve ölçü birimleri. Birim tercihin tarif malzemelerinde, ölçü dönüştürücüsünde ve alışveriş listelerinde geçerli olur.</p>
      ${(() => {
        const dilHtml = `<div class="dgu-yigin-8" role="radiogroup" aria-label="Arayüz dili">${DILLER.map(([k, m]) => DG.secim('dil', m, {tur: 'radio', deger: k, secili: dilAl() === k})).join('')}</div>`;
        if (!ctx.uye) return secimBolum('Arayüz dili', dilHtml);
        const deger = k => B[k] || BOLGE.find(([x]) => x === k)[2][0], kisa = k => deger(k).split(' (')[0];
        const alanlar = l => BOLGE.slice(...l).map(([k, m, ops]) => secAlan({ad: k, etiket: m, secenekler: ops.map(o => [o, o]), deger: deger(k), yardim: k === 'enerji' ? 'Tarif kartlarındaki yaklaşık kalori değerinin gösterim birimi.' : k === 'tarih' ? 'Menü takvimi, taslak ve kayıt listelerinde kullanılır.' : ''})).join('');
        return DG.akordiyon([
          {ikon: I('language'), baslik: 'Arayüz dili', alt: DILLER.find(([k]) => k === dilAl())?.[1] || 'Türkçe', icerik: dilHtml},
          {ikon: 'clock', baslik: 'Bölge ve saat', alt: [kisa('bolge'), kisa('saat'), kisa('hafta')].join(' · '), icerik: `<div class="dgu-yigin">${alanlar([0, 3])}</div>`},
          {ikon: 'scale-balanced', baslik: 'Ölçü birimleri', alt: [kisa('agirlik'), kisa('sivi'), kisa('sicaklik')].join(' · '), icerik: `<div class="dgu-yigin">${alanlar([3])}<label class="dgu-satir ay-anahtar-satir"><span class="dgu-satir-metin"><span>Kalori değerlerini gizle</span><small>Açıkken tarif kartlarında kalori satırı gösterilmez; süre, porsiyon ve zorluk kalır.</small></span>${anahtar('kaloriGizle', !!B.kaloriGizle, 'Kalori değerlerini gizle')}</label><p class="t-meta c-muted">Birim değişikliği geçmiş kayıtlarını silmez, yalnız gösterimi çevirir.</p></div>`}
        ], {ad: 'dil', acik: 0});
      })()}
      ${ctx.uye ? ''
        : `<div class="dgu-kart is-gri"><p class="dgu-yardim">Bölge, saat dilimi ve ölçü birimleri hesabına bağlıdır.</p>${btn('Giriş Yap', {tur: 'ikincil', boy: 'sm', href: 'giris.html?donus=' + donus()})}</div>`}
      </form>`;
    return {html, sonra(root) {
      root.addEventListener('change', e => {
        const n = e.target.name;
        if (n === 'dil') { try { localStorage.setItem('dadagastro-dil', e.target.value); } catch { /* yok */ } DG.bildir(`Dil tercihin ${DILLER.find(([k]) => k === e.target.value)[1]} olarak kaydedildi`); return; }
        if (BOLGE.some(([k]) => k === n) || n === 'kaloriGizle') { ayarYaz('bolge', {...(ayar().bolge || {}), [n]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}); kaydedildi(); }
      });
    }};
  });

  // ----- Verilerim (canlı “Veri ve Hesap Yönetimi”: verini gör, indir, sil) -----
  const VERI_GRUP = [['Kaydettiğin tarifler', () => DG.kayitli.al().length], ['Tariflerin ve taslakların', () => store.get('tariflerim', []).length], ['Menülerin', () => store.get('menuler', []).length], ['Alışveriş listen', () => store.get('alisveris', []).length], ['Takip ettiğin şefler', () => store.get('takip', []).length], ['Son aramaların', () => store.get('arama', []).length], ['Destek taleplerin', () => store.get('destek', []).length]];
  bolum('veri', 'Verilerim', {ikon: 'database'}, () => {
    const html = `<div class="dgu-ic dgu-yigin ay-govde"><p class="c-muted">Verini gör, indir, sil.</p>
      <section class="ay-bolum">${bas('Tuttuğumuz veriler')}<p class="dgu-yardim">Profil, tarifler, püf noktaları, menüler, yorumlar ve mesajlar. Hesabında tutulan veri grupları:</p>
        <dl class="dgu-satirlar ay-veri">${VERI_GRUP.map(([m, n]) => `<div><dt>${esc(m)}</dt><dd class="t-bold">${DG.sayi(n())}</dd></div>`).join('')}</dl>
        <p class="dgu-yardim">Hesabını silersen bu grupların tamamı 30 gün içinde silinir ve yayındaki tariflerin yayından kaldırılır; faturalar yasal saklama süresince muhasebe kaydında kalır.</p></section>
      <div class="dgu-satirlar">${satir({ikon: 'download', baslik: 'Veriyi indir', alt: 'Tariflerin, menülerin ve listelerin makine okunur dosya olarak, tek seferde', attrs: 'data-indir', sag: ''})}${satir({ikon: 'pen', baslik: 'Kaydı düzelt', alt: 'Yanlış girdiğin tarif, ölçü ya da menü kaydını düzeltebilirsin', href: tasi('tariflerim.html')})}${satir({ikon: I('delete'), baslik: 'Veriyi sil', alt: 'Yalnız mutfak verisi ya da tüm hesap — ikisi ayrı seçenektir', href: bolumLink('sil'), sinif: 'is-yikici'})}</div>
      ${not({ikon: I('privacy'), baslik: 'Yasal metin', metin: 'Verinin amacı ve saklanması KVKK Aydınlatma Metni\'nde yazılı.', html: 'Verinin amacı ve saklanması <a class="ay-link" href="yasal-metin.html?slug=kvkk">KVKK Aydınlatma Metni</a>\'nde yazılı.'})}
      </div>`;
    return {html, sonra(root) {
      root.querySelector('[data-indir]').addEventListener('click', () => {
        const veri = {};
        try { Object.keys(localStorage).filter(k => k.startsWith('dg-') || k.startsWith('dadagastro-')).sort().forEach(k => { try { veri[k] = JSON.parse(localStorage.getItem(k)); } catch { veri[k] = localStorage.getItem(k); } }); } catch { /* yok */ }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify({kaynak: 'DadaGastro · verilerim', tarih: new Date().toISOString(), veri}, null, 2)], {type: 'application/json'}));
        a.download = 'dadagastro-verilerim.json'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), TK.motion.toast);
        DG.bildir('Veri dosyan indirildi', {ikon: I('check')});
      });
    }};
  });

  // ----- Hesabı dondur (canlı metinler; düğme devre dışı değil, hata alanın altında: E-form) -----
  const SURE = ['1 hafta', '2 hafta', '1 ay', '3 ay', 'Ben yeniden aktifleştirene kadar'];
  bolum('dondur', 'Hesabı dondur', {ikon: 'snowflake'}, ctx => {
    const hataF = ctx.durum === 'hata-form';
    const html = `<form class="dgu-ic dgu-yigin ay-govde" data-dondur novalidate><p class="c-muted">Bir süre mutfağa ara vermek istersen hesabını kapatmadan dondurabilirsin.</p>
      ${not({ikon: I('error'), baslik: 'Uyarı', metin: 'Dondurma süresince profilin ve yayındaki tariflerin gizlenir, topluluk puanın dondurulur ve abonelerinden tahsilat durdurulur. Verilerin silinmez.'})}
      <ul class="ay-maddeler"><li>${ic(I('check'))}<span>Tariflerin, menülerin, koleksiyonların ve rozetlerin korunur; geri döndüğünde yerinde durur. Yayındaki tarifler yalnız gizlenir, silinmez.</span></li><li>${ic(I('check'))}<span>Bildirimler ve hatırlatmalar durur.</span></li><li>${ic(I('info'))}<span>DadaGastro Pro üyeliği otomatik durmaz. Tahsilatın da durmasını istiyorsan önce otomatik yenilemeyi kapat (<a class="ay-link" href="${tasi('pro.html#odemeler')}">Ödemelerim › Abonelik</a>).</span></li><li>${ic(I('info'))}<span>Giriş yapmak dondurmayı kaldırmaz. Seçtiğin süre dolunca veya “Hesabımı Yeniden Aktifleştir” düğmesine bastığında hesabın aktifleşir.</span></li></ul>
      ${secimBolum('Dondurma süresi', `<div class="dgu-yigin-8" role="radiogroup" data-hata-sonra>${SURE.map((m, i) => DG.secim('sure', m, {tur: 'radio', deger: String(i), secili: i === 0})).join('')}</div>`, {sinif: 'dgu-alan'})}
      <div class="dgu-alan ay-onay${hataF ? ' is-hata' : ''}">${DG.secim('onay', 'Dondurma sırasında profilimin ve yayındaki tariflerimin gizleneceğini, abonelerimden tahsilatın duracağını ve Pro tahsilatımın kendiliğinden durmayacağını anladım.')}${hataF ? `<p class="dgu-hata" role="alert">${ic(I('error'))}Dondurmak için önce onay kutusunu işaretle.</p>` : ''}</div>
      ${btn('Hesabı Dondur', {attrs: 'data-gonder', tam: true})}
      </form>`;
    return {html, sonra(root) {
      const f = root.querySelector('[data-dondur]'), onay = f.querySelector('input[name=onay]');
      if (hataF) onay.focus();
      onay.addEventListener('change', () => { if (onay.checked) alanHata(onay.closest('.dgu-alan'), ''); });
      f.querySelector('[data-gonder]').addEventListener('click', async () => {
        if (!onay.checked) { alanHata(onay.closest('.dgu-alan'), 'Dondurmak için önce onay kutusunu işaretle.'); odakla(onay); return; }
        const sure = SURE[Number(f.querySelector('input[name=sure]:checked')?.value || 0)];
        if (!await DG.onay({baslik: 'Hesabın dondurulsun mu?', metin: `Süre: ${sure}. Profilin ve yayındaki tariflerin gizlenir.`, evet: 'Hesabı Dondur'})) return;
        DG.bildir('Dondurma talebin alındı');
      });
    }};
  });

  // ----- Hesabımı sil (canlı: neden, onay kutusu, “HESABIMI SİL” yazma; 30 gün) -----
  const NEDEN = ['Belirtmek istemiyorum', 'Siteyi kullanmıyorum', 'Başka bir tarif sitesine geçtim', 'Çok fazla bildirim alıyorum', 'Gizlilik kaygısı', 'Ücretli paket bana uygun değil'];
  bolum('sil', 'Hesabımı sil', {ikon: I('delete')}, ctx => {
    const hataF = ctx.durum === 'hata-form';
    const html = `<form class="dgu-ic dgu-yigin ay-govde" data-sil novalidate><p class="c-muted">Hesabını kalıcı olarak kapatır. Ara vermek istiyorsan <a class="ay-link" href="${bolumLink('dondur')}">dondurma</a> geri alınabilir bir seçenektir.</p>
      ${not({ikon: I('error'), baslik: 'Uyarı — bu işlem geri alınamaz', metin: 'Yayındaki tariflerin ve püf noktaların talebin anında yayından kaldırılır; 30 gün sonunda tariflerin, menülerin, koleksiyonların, rozetlerin ve topluluk yazışmaların kalıcı olarak silinir.'})}
      <ul class="ay-maddeler"><li>${ic(I('info'))}<span>İlk 30 gün içinde giriş yaparsan silme iptal edilir ve hesabın geri gelir.</span></li><li>${ic(I('info'))}<span>Aktif DadaGastro Pro üyeliğin ve şef aboneliklerin silme talebiyle birlikte iptal edilir; kalan dönem için ücret iadesi yapılmaz. Sana abone olanların ödemesi de aynı anda durur.</span></li><li>${ic(I('info'))}<span>Faturaların yasal saklama süresi boyunca muhasebe kaydında kalır (silinemez), fakat profiline bağlı kalmaz.</span></li><li>${ic('download')}<span>Silmeden önce <a class="ay-link" href="${bolumLink('veri')}">tariflerinin ve menülerinin bir kopyasını indirebilirsin</a>.</span></li></ul>
      ${secAlan({ad: 'neden', etiket: 'Ayrılma nedenin', secenekler: NEDEN.map(n => [n, n]), deger: NEDEN[0]})}
      <div class="dgu-alan ay-onay${hataF ? ' is-hata' : ''}">${DG.secim('onay', 'Hesabımın ve tüm mutfak verilerimin 30 gün sonunda geri alınamaz şekilde silineceğini, yayındaki tariflerimin kaldırılacağını, aktif üyeliğimin iptal edileceğini ve ücret iadesi yapılmayacağını anladım.')}${hataF ? `<p class="dgu-hata" role="alert">${ic(I('error'))}Silme için onay kutusunu işaretle.</p>` : ''}</div>
      ${alan({ad: 'ifade', etiket: 'Onaylamak için HESABIMI SİL yaz', yer: 'HESABIMI SİL', zorunlu: true, hata: hataF ? 'HESABIMI SİL ifadesini birebir yaz.' : ''})}
      ${btn('Hesabımı Kalıcı Olarak Sil', {ikon: I('delete'), attrs: 'data-gonder', tam: true})}
      <p class="dgu-yardim">Kararsızsan silmek yerine <a class="ay-link" href="${bolumLink('bildirim')}">bildirimleri kapatabilir</a>, <a class="ay-link" href="${bolumLink('dondur')}">hesabını dondurabilir</a> ya da <a class="ay-link" href="${tasi('destek.html?sekme=yeni')}">bize yazabilirsin</a>.</p>
      </form>`;
    return {html, sonra(root) {
      const f = root.querySelector('[data-sil]'), onay = f.querySelector('input[name=onay]'), ifade = f.querySelector('#f-ifade');
      ifade.autocapitalize = 'characters'; ifade.autocomplete = 'off';
      if (hataF) onay.focus();
      onay.addEventListener('change', () => { if (onay.checked) alanHata(onay.closest('.dgu-alan'), ''); });
      ifade.addEventListener('input', () => { if (ifade.closest('.dgu-alan').classList.contains('is-hata')) alanHata(ifade.closest('.dgu-alan'), ''); });
      f.querySelector('[data-gonder]').addEventListener('click', async () => {
        const H1 = onay.checked ? '' : 'Silme için onay kutusunu işaretle.', H2 = ifade.value.trim() === 'HESABIMI SİL' ? '' : 'HESABIMI SİL ifadesini birebir yaz.';
        alanHata(onay.closest('.dgu-alan'), H1); alanHata(ifade.closest('.dgu-alan'), H2);
        if (H1 || H2) { odakla(H1 ? onay : ifade); return; }
        if (!await DG.onay({baslik: 'Hesabın kalıcı olarak silinsin mi?', metin: '30 gün içinde giriş yaparsan silme iptal edilir.', evet: 'Sil'})) return;
        DG.bildir('Silme talebin alındı. 30 gün içinde giriş yaparsan iptal edilir.');
      });
    }};
  });

  // ----- S4 · Uygulama ayarları (mobile özel; misafire de açık) -----
  const KATEGORI_BILDIRIM = [['yorum', 'Tarif yorumu ve puanı', 'Yayımladığın tariflere gelen yorum ve puan', I('comments')], ['menu', 'Haftalık menü günü', 'Gün başında tek bildirim', 'list-check'], ['sef', 'Şef aboneliği', 'Abone olduğun şeften yeni içerik geldiğinde', I('chef')]];
  bolum('uygulama', 'Uygulama ayarları', {uyeGerek: false}, ctx => {
    const a = ayar(), dil = DILLER.find(([k]) => k === dilAl())?.[1] || 'Türkçe';
    const sw = (ad, m, alt, acik, ikon) => `<label class="dgu-satir ay-anahtar-satir"><span class="dgu-satir-ikon">${ic(ikon)}</span><span class="dgu-satir-metin"><span>${esc(m)}</span>${alt ? `<small>${esc(alt)}</small>` : ''}</span>${anahtar(ad, acik, m)}</label>`;
    const html = `<div class="dgu-ic ay-gruplar">
      ${grup('Genel', [satir({ikon: I('language'), baslik: 'Dil', alt: dil, href: bolumLink('dil')}), sw('titresim', 'Titreşim', 'Zamanlayıcı bitince ve onaylarda kısa titreşim', a.titresim ?? true, 'mobile-screen-button')])}
      ${grup('Bildirimler', [satir({ikon: I('notifications'), baslik: 'Bildirim izni', alt: 'Cihazının ayarlarından yönetilir', href: `izin-bildirim.html?donus=${donus()}`}),
        ...(ctx.uye ? [...KATEGORI_BILDIRIM.map(([k, m, al, i]) => sw(`kat-${k}`, m, al, kanalAcik(k, 'push'), i)), `<div class="dgu-satir ay-durum-satir"><span class="dgu-satir-ikon">${ic('receipt')}</span><span class="dgu-satir-metin"><span>Ödeme başarısız</span><small>Tahsilat alınamadığında her zaman bildirilir. Bu bildirim kapatılamaz.</small></span>${DG.durumRozet('aktif', {ad: 'Her zaman açık', ikon: 'lock'})}</div>`, satir({ikon: I('settings'), baslik: 'Kanal ayarları', alt: 'Olay başına e-posta ve push', href: bolumLink('bildirim')})] : [satir({ikon: I('settings'), baslik: 'Bildirim kategorileri', alt: 'Giriş yaptıktan sonra hesabına bağlı', href: 'giris.html?donus=' + donus()})])])}
      ${grup('Depolama', [satir({ikon: 'broom', baslik: 'Önbelleği temizle', alt: 'Görseller yeniden yüklenir; kayıtların silinmez', attrs: 'data-onbellek', sag: ''}), satir({ikon: I('resetTimer'), baslik: 'Uygulamayı sıfırla', alt: 'Bu cihazdaki oturum, kayıtlar ve ayarlar silinir', attrs: 'data-sifirla', sag: '', sinif: 'is-yikici'})])}
      ${grup('Hakkında', [`<div class="dgu-satir ay-durum-satir"><span class="dgu-satir-ikon">${ic(I('info'))}</span><span class="dgu-satir-metin"><span>Sürüm</span><small>v3</small></span></div>`, satir({ikon: 'scale-balanced', baslik: 'Yasal metinler', href: 'yasal.html'})])}
      </div>`;
    return {html, sonra(root) {
      root.addEventListener('change', e => {
        const n = e.target.name;
        if (n === 'titresim') { ayarYaz('titresim', e.target.checked); if (e.target.checked) navigator.vibrate?.(TK.motion.fast / 3); kaydedildi(); }
        const m = n?.match(/^kat-(\w+)$/); if (m) { kanalYaz(m[1], 'push', e.target.checked); kaydedildi(); }
      });
      root.querySelector('[data-onbellek]').addEventListener('click', async () => { if (await DG.onay({baslik: 'Önbellek temizlensin mi?', metin: 'Görseller yeniden yüklenir; kayıtların ve ayarların silinmez.', evet: 'Temizle'})) DG.bildir('Önbellek temizlendi'); });
      root.querySelector('[data-sifirla]').addEventListener('click', async () => { if (await DG.onay({baslik: 'Uygulama sıfırlansın mı?', metin: 'Bu cihazdaki oturum, kayıtlar, listeler ve ayarlar silinir; açılış ekranından başlarsın.', evet: 'Sıfırla'})) location.href = 'sifirla.html'; });
    }};
  });

  // ----- H17 · Aboneliklerim: şef üyelikleri (ücretli Üretici Üyeliği; veri yok) + takip ettiğin şefler (dg-takip) -----
  bolum('abonelikler', 'Aboneliklerim', {ikon: I('subscribe'), girisMetin: 'Şef üyeliklerin ve takip ettiğin şefler burada toplanır.'}, () => {
    let takip = ORNEK ? V.sefler.slice(0, 3).map(s => s.kullanici) : store.get('takip', []).filter(k => DG.sef(k));
    let zil = ORNEK ? {} : (ayar().zil || {});
    const yazTakip = v => { takip = v; if (!ORNEK) store.set('takip', v); };
    const yazZil = v => { zil = v; if (!ORNEK) ayarYaz('zil', v); };
    const html = `<div class="dgu-ic dgu-yigin ay-govde">
      <section class="ay-bolum">${bas('Şef üyelikleri')}<p class="dgu-yardim">Dönemlik alınan Üretici Üyelikleri — 3 aylık ve 6 aylık dönemler. DadaGastro Pro aboneliğine dâhil değildir ve ayrı tahsil edilir.</p>
        <div class="dgu-kart is-gri ay-bos-kart">${durum({ikon: I('chef'), baslik: 'Etkin şef üyeliğin yok', metin: 'Bir şefin Üretici Üyeliğini aldığında dönem, tutar ve kalan süre burada görünür.', eylem: btn('Şef Dizinine Bak', {tur: 'ikincil', href: 'sefler.html'})})}</div></section>
      <section class="ay-bolum">${bas('Takip ettiğin şefler')}<p class="dgu-yardim">Takip ücretsizdir ve yalnızca yeni içerikten haberdar olmanı sağlar. Çan açıkken yeni tarif, menü veya video yayımladıklarında bildirim alırsın.</p><div data-takip></div></section>
      </div>`;
    return {html, sonra(root) {
      const kap = root.querySelector('[data-takip]');
      const ciz = () => {
        if (!takip.length) { kap.innerHTML = `<div class="dgu-kart is-gri ay-bos-kart">${durum({ikon: I('follow'), baslik: 'Henüz kimseyi takip etmiyorsun', metin: 'Sevdiğin şefleri takip et; yeni tariflerinden haberdar ol.', eylem: btn('Şefleri keşfet', {href: 'sefler.html'})})}</div>`; return; }
        kap.innerHTML = `<div class="dgu-satirlar">${takip.map(k => { const s = DG.sef(k), z = zil[k] ?? true; return `<div class="dgu-satir-kap"><a class="dgu-satir" href="${esc(DG.sefLink(s))}">${avatar(s.ad, 40)}<span class="dgu-satir-metin"><b class="clamp-1">${esc(s.ad)}</b><small class="clamp-1">${esc([s.unvan, `${DG.sayi(s.tarif)} tarif`].filter(Boolean).join(' · '))}</small></span></a><button class="dgu-ibtn" type="button" data-zil="${esc(k)}" aria-pressed="${z}" aria-label="${esc(`${s.ad} yeni içerik bildirimi`)}">${ic(z ? I('subscribe') : 'bell-slash')}</button><button class="dgu-ibtn" type="button" data-birak="${esc(k)}" aria-label="${esc(`${s.ad} takibini bırak`)}">${ic(I('following'))}</button></div>`; }).join('')}</div>`;
      };
      root.addEventListener('click', e => {
        const z = e.target.closest('[data-zil]');
        if (z) { const k = z.dataset.zil, on = !(zil[k] ?? true); yazZil({...zil, [k]: on}); ciz(); root.querySelector(`[data-zil="${CSS.escape(k)}"]`)?.focus(); DG.bildir(on ? 'Yeni içerik bildirimi açıldı' : 'Yeni içerik bildirimi kapatıldı'); return; }
        const b = e.target.closest('[data-birak]');
        if (b) { const k = b.dataset.birak, once = takip; yazTakip(takip.filter(x => x !== k)); ciz(); DG.bildir('Takibi bıraktın.', {eylem: {ad: 'Geri al', fn: () => { yazTakip(once); ciz(); }}}); }
      });
      ciz();
    }};
  });

  // ============ S5 · Çözüm Merkezi (SSS + destek talepleri) ============
  // Kaynak: canlı backend tohumu (DadaGastro) database/tohum-verisi/sistem-sss-konulari.json + sistem-sss-sorulari.json — g-cozum-merkezi; 6 konu, 24 soru, metin aynen.
  // Bağlantılar uygulama sayfalarına eşlendi; Mutfak Sırları hedefleri (kapsam dışı) “Yakında” bildirir.
  const SSS_KONU = [["uyelik", "Üyelik & Hesap", "user"], ["tarif", "Tarifler & İçerik", "utensils"], ["menu", "Menüler & Mutfak Bilgisi", "calendar-week"], ["sef", "Şefler & Üretici Üyeliği", "user-tie"], ["pro", "Pro & Ödeme", "crown"], ["diger", "Topluluk, Veri & Diğer", "shield-halved"]];
  const SSS = [
    ["uyelik", "DadaGastro'ya üye olmak ücretli mi?", "Hayır — üyelik tamamen ücretsiz. Tarif arama, <a href=\"kaydettiklerim.html\">mutfak defteri</a>, koleksiyonlar ve topluluk özelliklerinin tamamını ücretsiz kullanırsın. Yalnızca <a href=\"pro.html\">DadaGastro Pro</a> planı ve Üretici Üyeliği ücretlidir."],
    ["uyelik", "Şifremi unuttum, ne yapmalıyım?", "<a href=\"giris.html\">Giriş sayfasındaki</a> \"Şifremi Unuttum\" bağlantısına tıkla, kayıtlı e-posta adresini gir. Sıfırlama bağlantısı birkaç dakika içinde gelir; gelmezse spam klasörünü kontrol et. Bağlantı güvenlik için 30 dakika geçerlidir. Giriş yaptıktan sonra şifreni <a href=\"ayarlar.html\">Hesap Ayarları</a> &gt; Güvenlik sekmesinden de değiştirebilirsin."],
    ["uyelik", "Profil bilgilerimi nasıl değiştiririm?", "<a href=\"ayarlar.html\">Hesap Ayarları</a> sayfasından ad, kullanıcı adı, biyografi ve avatar bilgilerini güncelleyebilirsin. Bildirim ve gizlilik tercihlerin aynı ekranda, kanal kanal ayarı ise <a href=\"bildirimler.html\">Bildirimler</a> sayfasında; kullanıcı adı 30 günde bir kez değiştirilebilir."],
    ["uyelik", "Hesabımı nasıl silebilirim, tariflerime ne olur?", "<a href=\"ayarlar.html\">Hesap Ayarları</a> &gt; Hesabı Dondurma / Silme adımından kalıcı silme talebi oluşturabilirsin; talep sonrası 14 günlük geri dönüş süresi tanınır. Silmeden önce tariflerini, menülerini ve <a href=\"rozetlerim.html\">rozetlerini</a> dışa aktarabilirsin. Kişisel verilerin KVKK kapsamında tamamen kaldırılır — ayrıntılar <a href=\"yasal.html\">KVKK Aydınlatma Metni</a>'nde."],
    ["tarif", "Beğendiğim tarifleri nasıl kaydederim?", "Tarif kartındaki kaydet simgesiyle tarifi mutfak defterine eklersin; <a href=\"kaydettiklerim.html\">defterinde</a> tarifleri koleksiyonlara ayırabilir, \"Denedim\" olarak işaretleyebilirsin. Tüm tarifleri <a href=\"../liste-v2.html\">Tarifler</a> sayfasından kategori kategori süzebilirsin."],
    ["tarif", "\"Denedim\" işaretlemesi ne işe yarar?", "Bir tarifi mutfakta denediğini işaretlediğinde <a href=\"kaydettiklerim.html\">Mutfak Defterim</a>'de ayrı bir sekmede birikir ve topluluk puanına — yani <a href=\"rozetlerim.html\">rozet ve kademe ilerlemene</a> — katkı sağlar."],
    ["tarif", "Tariflere nasıl yorum ve puan bırakırım?", "Tarif detay sayfasındaki yorum alanından puan ve deneyimini paylaşabilirsin. Yorumlar yayınlanmadan önce moderasyon kuyruğundan geçer; genellikle kısa sürede sonuçlanır. Yazdığın ve aldığın yorumları <a href=\"rozetlerim.html#topluluk\">Topluluğum</a>'da görürsün; ölçüt <a href=\"yasal.html\">Topluluk Kuralları</a>'nda yazılı."],
    ["tarif", "Rozet ve kademe sistemi nasıl çalışır?", "Tarif deneme, yorum ve topluluk katkılarınla puan kazanırsın; puan eşiklerini geçtikçe Çırak'tan Efsane Şef'e kadar uzanan kademe merdiveninde yükselirsin. İlerlemeni <a href=\"rozetlerim.html\">Rozetlerim</a> sayfasından takip eder, topluluğun en çok katkı verenlerini <a href=\"onur-listesi.html\">Onur Listesi</a>'nde görürsün."],
    ["tarif", "Eklediğim tarif neden hâlâ incelemede?", "Yayımlanmadan önce her tarif moderasyon kuyruğundan geçer: malzeme listesi, adım sıralaması ve görsel telifi kontrol edilir. Kuyruktaki içeriklerini <a href=\"kaydettiklerim.html\">Mutfak Defterim</a> &gt; İncelemede Olanlar sekmesinde görürsün. Üç günden uzun sürerse <a href=\"destek.html?sekme=yeni\">yeni bir destek talebi</a> açıp <strong>Tarif ve püf noktası yayını</strong> konusunu seçebilirsin."],
    ["menu", "Haftalık menü planlayıcı nasıl çalışır?", "Planlayıcı kaydettiğin tariflerden yedi günlük bir akış kurar; her güne kahvaltı, ana yemek ve tatlı yerleştirebilir, günleri sürükleyerek sırasını değiştirebilirsin. Kurduğun menüler <a href=\"menulerim.html\">Menülerim</a>'de durur. Hazır bir örnek için <a href=\"menulerim.html?sekme=haftalik\">Haftalık Menü</a> sayfasına bakabilirsin; planlayıcı <a href=\"pro.html\">DadaGastro Pro</a>'ya dâhildir."],
    ["menu", "Alışveriş listemi menüden nasıl oluştururum?", "Bir menünün sayfasındaki \"Alışveriş listesi oluştur\" işlemi menüdeki bütün tariflerin malzemelerini toplar, aynı malzemeyi birleştirir ve listeyi <a href=\"menulerim.html\">Menülerim &gt; Alışveriş Listem</a> sekmesine yazar. Listeyi bağlantıyla paylaşabilir, market reyonuna göre sıralayabilirsin; hazır bir örnek <a href=\"alisveris-listesi.html\">Alışveriş Listesi</a> sayfasında."],
    ["menu", "Sözlük ve Mutfak Ansiklopedisi ne işe yarar?", "<button type=\"button\" class=\"ay-link\" data-yakinda>Sözlük</button> mutfak terimlerini A-Z açıklar; <button type=\"button\" class=\"ay-link\" data-yakinda>Mutfak Ansiklopedisi</button> ise malzeme ve teknikleri derinlemesine anlatan rehber içeriklerdir — ikisi de ücretsiz."],
    ["menu", "Bardak ve kaşık ölçülerini grama nasıl çeviririm?", "<button type=\"button\" class=\"ay-link\" data-yakinda>Ölçü Birimleri</button> sayfası su bardağı, çay bardağı, yemek kaşığı ve tatlı kaşığı karşılıklarını malzeme malzeme verir — un ile şekerin aynı bardakta farklı gram tuttuğunu orada görürsün. <a href=\"../liste-v2.html\">Tarif sayfalarındaki</a> porsiyon seçicisi de miktarları kendiliğinden ölçekler."],
    ["sef", "Üretici Üyeliği nedir?", "İçerik üreten şeflerin kendi takipçilerine özel, ücretli bir plan sunmasını sağlayan üyelik türüdür — kendi fiyatını ve içerik avantajlarını sen belirlersin. Üyelik açan şefleri <a href=\"sefler.html\">Şefler</a> dizininde bulur, katıldığın üyelikleri <a href=\"ayarlar.html?bolum=abonelikler\">Ödemelerim &gt; Hizmet / Uzman Ödemeleri</a> sekmesinde görürsün."],
    ["sef", "Üretici Üyeliği planımı nasıl oluştururum?", "<a href=\"tariflerim.html\">Şef Panelim</a> &gt; Abonelik Planlarım ekranından plan adını, aylık ya da dönemlik ücretini ve üyelik avantajlarını belirleyip başvurunu gönderirsin. İlk yayın admin onayından geçer; henüz şef değilsen <a href=\"kayit.html\">Şef Ol</a> adımından başlarsın."],
    ["sef", "Şef profili doğrulaması nasıl işler?", "Doğrulama rozeti admin ekibi tarafından verilir; profilinin ve içeriklerinin tutarlılığı değerlendirilir. Doğrulanmış şefler <a href=\"sefler.html\">şef dizininde</a> öne çıkar; başvurunun durumunu <a href=\"tariflerim.html\">Şef Panelim</a> ekranından izlersin."],
    ["sef", "Bir şefi takip etmekle üyeliğine katılmak aynı şey mi?", "Değil. Takip ücretsizdir ve yalnızca yeni içerikten haberdar olmanı sağlar — kilitli bir içeriği açmaz. Üretici Üyeliği ise ücretlidir ve şefin abonelere özel içeriğini açar. Takip ettiklerini <a href=\"rozetlerim.html#topluluk\">Topluluğum</a>'da, ücretli üyeliklerini <a href=\"ayarlar.html?bolum=abonelikler\">Ödemelerim</a>'de bulursun."],
    ["pro", "Tek üyelikle her şey mi açılıyor?", "Evet. Pro, site geneli tek üyeliktir. Reklamsız deneyim, Pro içerik ve haftalık menü planlayıcı seçtiğin planın kapsamına göre açılır. Kademeleri yan yana görmek için <a href=\"pro.html\">Paketlerim</a>'deki karşılaştırma tablosuna ya da <a href=\"pro.html\">DadaGastro Pro</a> sayfasına bakabilirsin."],
    ["pro", "Kart bilgilerim güvende mi?", "Kart bilgilerin iyzico tarafından PCI-DSS standardında saklanır; DadaGastro sunucularında tutulmaz. Kayıtlı kartlarında yalnız marka, son dört hane ve son kullanma tarihi görünür — <a href=\"pro.html#odemeler\">Ödemelerim &gt; Kayıtlı Kartlar</a>. Verinin nasıl işlendiği <a href=\"yasal.html\">Gizlilik Politikası</a>'nda."],
    ["pro", "Pro üyeliğimi istediğim zaman iptal edebilir miyim?", "Evet. Aboneliğini istediğin an iptal edebilirsin; iptalde Pro avantajların dönem sonuna kadar sürer. İptal ve dondurma işlemi <a href=\"pro.html#odemeler\">Ödemelerim &gt; Abonelik Ödemeleri</a> sekmesinde; iade talebini aynı ekranın <a href=\"pro.html#odemeler\">İade Talepleri</a> sekmesinden açarsın."],
    ["diger", "Yorumum neden hâlâ yayında değil?", "Her yorum yayına alınmadan önce moderasyon ekibinden geçer — spam ve uygunsuz içerik böyle engellenir. Onaylanan yorumlar kısa sürede görünür olur; yazdıklarının tamamını <a href=\"rozetlerim.html#topluluk\">Topluluğum &gt; Yaptığım Yorumlar</a> sekmesinde görürsün."],
    ["diger", "Uygunsuz bir içeriği nasıl bildiririm?", "Sayfanın sağ kenarındaki \"Görüş Bildir\" penceresinden <strong>İhlal bildirimi</strong> konusunu seçip bağlantıyı iletebilirsin; <a href=\"iletisim.html\">İletişim</a> sayfasındaki formdan da bildirebilirsin. Ekibimiz <a href=\"yasal.html\">İçerik ve Telif Politikası</a> ölçütleriyle kısa sürede inceler."],
    ["diger", "Rozet ve kademe ilerlemem nerede görünür?", "<a href=\"rozetlerim.html\">Rozetlerim</a> sayfasında kazandığın rozetleri, ilerleme durumunu ve mevcut kademeni görebilirsin; puan kayıtların aynı ekranın Puan Defteri sekmesinde tarih tarih listelenir. Topluluğun en çok katkı verenleri <a href=\"onur-listesi.html\">Onur Listesi</a>'nde."],
    ["diger", "Video Mutfağı nedir?", "Tarif videoları, teknik anlatımlar ve video serilerinden oluşan içerik kütüphanemizdir; bazı videolar <a href=\"pro.html\">Pro</a> üyeliğe özeldir. Tamamı <a href=\"videolar.html\">Video Mutfağı</a> sayfasında."],
  ];
  const KONU_DESTEK = ['DadaGastro Pro ve ödeme', 'Üyelik ve fatura', 'Tarif ve püf noktası yayını', 'Menülerim ve alışveriş listem', 'Şef üyeliği ve içerik', 'Hesap ve giriş', 'Uygulama hatası', 'Diğer']; // tohum: sistem-destek-konulari.json
  const ODEME_KONU = ['DadaGastro Pro ve ödeme', 'Üyelik ve fatura'];
  const TDURUM = {acik: 'Açık talep', bekleyen: 'Yanıt bekleyen', cozulen: 'Çözülen', kapali: 'Kapatılan'};
  // Talep durumu → ortak durum rozeti (canlı sekme adları: Açık talep · Yanıt bekleyen · Çözülen · Kapatılan)
  const tRozet = d => DG.durumRozet({acik: 'acik', bekleyen: 'onay_bekliyor', cozulen: 'cozuldu', kapali: 'kapali'}[d], {ad: {acik: 'Açık', bekleyen: 'Yanıt bekleyen', cozulen: 'Çözüldü', kapali: 'Kapalı'}[d], ikon: d === 'bekleyen' ? 'reply' : undefined});
  const tarihYaz = ts => new Date(ts).toLocaleDateString('tr', {day: 'numeric', month: 'long', year: 'numeric'});
  const sssMetin = x => katla(x[1] + ' ' + x[2].replace(/<[^>]+>/g, ' '));
  const katla = s => String(s || '').toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Karakter sayacı (canlı: etiketin yanında “0/5000”) ve tek dosya eki (JPG, PNG, WebP, PDF · en çok 5 MB).
  function sayacBagla(el, sinir) {
    const lab = el.closest('.dgu-alan').querySelector('label'); lab.classList.add('ay-sayacli');
    lab.insertAdjacentHTML('beforeend', `<span class="ay-sayac" aria-live="polite">${el.value.length}/${sinir}</span>`);
    const s = lab.querySelector('.ay-sayac'); el.addEventListener('input', () => { s.textContent = `${el.value.length}/${sinir}`; });
  }
  const dosyaAlan = ad => `<div class="dgu-alan"><span class="ay-etiket">Ek dosya <span class="c-muted">(isteğe bağlı)</span></span><label class="dgu-btn dgu-btn--ikincil dgu-btn--tam ay-dosya">${ic('paperclip')}<span data-dosya-ad>Dosya seç</span><input class="dgu-sr" type="file" name="${ad}" accept="image/jpeg,image/png,image/webp,application/pdf"></label><p class="dgu-yardim">Ekran görüntüsü ya da belge: JPG, PNG, WebP veya PDF · en çok 5 MB · mesaj başına tek dosya.</p></div>`;
  const dosyaBagla = kok => kok.addEventListener('change', e => { if (e.target.type !== 'file') return; const d = e.target.files[0], buyuk = d && d.size > 5 * 1024 * 1024; e.target.closest('.ay-dosya').querySelector('[data-dosya-ad]').textContent = d && !buyuk ? d.name : 'Dosya seç'; if (buyuk) { e.target.value = ''; DG.bildir('Dosya en çok 5 MB olabilir'); } });

  DG.sayfa('destek', ctx => {
    const sek = ['sss', 'talepler', 'yeni', 'oneri'].includes(ctx.qs.get('sekme')) ? ctx.qs.get('sekme') : 'sss';
    const q0 = ctx.qs.get('q') || '';
    const html = `<div class="dgu-baslik ay-bas"><h1 class="t-page">Çözüm Merkezi</h1><p>Taleplerin, yeni talep açma, sık sorulanlar ve öneri kutusu tek adreste.</p></div>
      <div class="dgu-ic ay-sekme">${seg('Çözüm Merkezi bölümleri', [['sss', 'Sık Sorulanlar'], ['talepler', 'Taleplerim'], ['yeni', 'Yeni Talep'], ['oneri', 'Öneri ve Şikâyet']], sek).replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')}</div>
      <div data-panel="sss" ${sek === 'sss' ? '' : 'hidden'}>
        <div class="dgu-ic dgu-yigin-12"><div class="dgu-girdi${q0 ? ' has-text' : ''}">${ic(I('search'))}<input id="f-sss" type="search" placeholder="Soru ara: örn. tarif, şef, menü, Pro…" aria-label="Soru ara" value="${esc(q0)}" autocomplete="off"><button class="dgu-ibtn dgu-temizle" type="button" data-sss-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div>
          <div class="dgu-serit" role="group" aria-label="Soru kategorileri" data-konular></div><p class="dgu-sr" role="status" data-sss-sayi></p></div>
        <div class="dgu-ic ay-sss" data-sss></div>
        <div class="dgu-ic dgu-yigin">${not({ikon: I('info'), baslik: 'Sağlıkla ilgili sorular', metin: 'Destek ekibi tıbbi teşhis, beslenme tedavisi ya da diyet önerisi vermez; bu soruları bir sağlık uzmanına ilet. Ayrıntı: Sorumluluk Reddi', html: 'Destek ekibi tıbbi teşhis, beslenme tedavisi ya da diyet önerisi vermez; bu soruları bir sağlık uzmanına ilet. Ayrıntı: <a class="ay-link" href="yasal-metin.html?slug=sorumluluk-reddi">Sorumluluk Reddi</a>'})}
          <div class="dgu-kart is-gri ay-cevap"><h2 class="t-sub">Cevap bulamadın mı?</h2><p class="dgu-yardim">Ekibimiz hafta içi 09:00–18:00 arasında yanında. Soru, öneri ya da sorun — hangisi olursa olsun bize yaz.</p><div class="dgu-ikili">${btn('Görüş Bildir', {tur: 'ikincil', boy: 'sm', href: tasi('gorus-bildir.html')})}${btn('İletişime Geç', {boy: 'sm', href: 'iletisim.html'})}</div></div></div>
      </div>
      <div data-panel="talepler" ${sek === 'talepler' ? '' : 'hidden'}></div>
      <div data-panel="yeni" ${sek === 'yeni' ? '' : 'hidden'}></div>
      <div data-panel="oneri" ${sek === 'oneri' ? '' : 'hidden'}></div>`;
    return {tur: 'alt', baslik: 'Çözüm Merkezi', menuAktif: 'help', html, iskelet: DG.iskelet(5, 'satir'), sonra(root) {
      // --- SSS ---
      const inp = root.querySelector('#f-sss'), kutu = inp.closest('.dgu-girdi'), sssEl = root.querySelector('[data-sss]'), konuEl = root.querySelector('[data-konular]'), sayiEl = root.querySelector('[data-sss-sayi]');
      let konu = SSS_KONU.some(([k]) => k === ctx.qs.get('konu')) ? ctx.qs.get('konu') : 'tumu', zaman;
      const adres = () => { const u = new URL(location.href); inp.value.trim() ? u.searchParams.set('q', inp.value.trim()) : u.searchParams.delete('q'); konu === 'tumu' ? u.searchParams.delete('konu') : u.searchParams.set('konu', konu); history.replaceState(history.state, '', u); };
      function sssCiz() {
        adres(); kutu.classList.toggle('has-text', !!inp.value);
        const parca = katla(inp.value).split(/\s+/).filter(Boolean);
        const uyan = SSS.map((x, i) => [x, i]).filter(([x]) => parca.every(p => sssMetin(x).includes(p)));
        konuEl.innerHTML = [['tumu', 'Tümü', ''], ...SSS_KONU].map(([k, m, i]) => { const n = k === 'tumu' ? uyan.length : uyan.filter(([x]) => x[0] === k).length; return `<button class="dgu-chip" type="button" data-konu="${k}" aria-pressed="${konu === k}">${i ? ic(i) : ''}${esc(m)} <span class="dgu-chip-sayi">${n}</span></button>`; }).join('');
        const gor = uyan.filter(([x]) => konu === 'tumu' || x[0] === konu);
        sayiEl.textContent = parca.length ? `${gor.length} soru bulundu` : `${gor.length} soru`;
        if (!gor.length) { sssEl.innerHTML = durum({ikon: I('search'), baslik: 'Bu aramayla eşleşen soru yok', metin: 'Farklı bir kelime dene — ya da sorunu doğrudan bize ilet, cevabı SSS\'ye de ekleyelim.', eylem: btn('Soru Sor', {attrs: 'data-git-yeni'})}); return; }
        const konular = SSS_KONU.filter(([k]) => gor.some(([x]) => x[0] === k));
        sssEl.innerHTML = DG.akordiyon(konular.map(([k, m, i]) => { const l = gor.filter(([x]) => x[0] === k); return {id: 'sss-' + k, ikon: i, baslik: m, alt: l.map(([x]) => x[1]).join(' · '), sag: `<span class="dgu-bolum-sayi">${l.length}</span>`, icerik: `<div class="dgu-akordeon">${l.map(([x, n]) => `<details data-soru="${n}"${parca.length && l.length === 1 ? ' open' : ''}><summary><span>${esc(x[1])}</span>${ic(I('expand'))}</summary><div class="dgu-ak-govde ay-cevap-metin">${x[2]}</div></details>`).join('')}</div>`}; }), {ad: 'sss', acik: 0});
      }
      // Akordeonda tek açık (docs/51 #13)
      // Konu içinde tek soru açık (docs/51 #13); konular ortak akordiyonda tek açık.
      sssEl.addEventListener('toggle', e => { if (e.target.open) sssEl.querySelectorAll('details[open]').forEach(d => { if (d !== e.target) d.open = false; }); }, true);
      inp.addEventListener('input', () => { kutu.classList.toggle('has-text', !!inp.value); clearTimeout(zaman); zaman = setTimeout(sssCiz, TK.motion.base); });
      sssCiz();

      // --- Sekmeler ---
      const sekmeAc = k => { root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b.dataset.seg === k)); root.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== k; }); const u = new URL(location.href); k === 'sss' ? u.searchParams.delete('sekme') : u.searchParams.set('sekme', k); history.replaceState(history.state, '', u); if (k === 'talepler') talepCiz(); if (k === 'yeni') yeniCiz(); if (k === 'oneri') oneriCiz(); root.querySelector('[data-seg][aria-selected=true]')?.scrollIntoView({block: 'nearest', inline: 'nearest'}); };

      // --- Destek talepleri (yerel; dg-destek) ---
      // ?ornek=1: SSS'deki gerçek soru ve cevaplardan kurulmuş örnek talepler (yalnız bellek).
      const duz = h => h.replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      const gun = n => Date.now() - n * 864e5;
      let ornekT = ORNEK ? [[16, 'Şef üyeliği ve içerik', 'acik', 1], [8, 'Tarif ve püf noktası yayını', 'bekleyen', 3], [1, 'Hesap ve giriş', 'cozulen', 9]].map(([n, konu, durumK, g], i) => ({id: 'ornek-' + (i + 1), konu, baslik: SSS[n][1], durum: durumK, guncel: gun(g), mesajlar: [{sen: true, metin: SSS[n][1], ts: gun(g + 1)}, ...(durumK === 'acik' ? [] : [{sen: false, metin: duz(SSS[n][2]), ts: gun(g)}])]})) : null;
      const talepler = () => ornekT || store.get('destek', []) || [];
      const talepYaz = v => { if (ornekT) ornekT = v; else store.set('destek', v); };
      let tsuz = 'tumu';
      const tPanel = root.querySelector('[data-panel=talepler]'), yPanel = root.querySelector('[data-panel=yeni]');
      const giris = metin => girisCagri({ikon: 'headset', baslik: 'Destek taleplerin için giriş yap', metin, tam: false});
      function talepCiz() {
        if (!ctx.uye) { tPanel.innerHTML = giris('Taleplerin, yeni talep açma ve yazışmaların hesabına bağlıdır.'); return; }
        const T = talepler();
        if (!T.length) { tPanel.innerHTML = durum({ikon: 'headset', baslik: 'Henüz destek talebin yok', metin: 'Bir sorun yaşarsan ya da bir şey sormak istersen ilk talebini buradan açabilirsin.', eylem: btn('Yeni destek talebi', {ikon: I('add'), attrs: 'data-git-yeni'})}); return; }
        const say = k => k === 'tumu' ? T.length : T.filter(t => t.durum === k).length;
        const G = T.filter(t => tsuz === 'tumu' || t.durum === tsuz);
        tPanel.innerHTML = `<div class="dgu-ic dgu-yigin-12"><div class="dgu-serit" role="group" aria-label="Talep durumu süzgeci">${[['tumu', 'Tümü'], ...Object.entries(TDURUM)].map(([k, m]) => `<button class="dgu-chip" type="button" data-tsuz="${k}" aria-pressed="${tsuz === k}">${esc(m)} <span class="dgu-chip-sayi">${say(k)}</span></button>`).join('')}</div>
          ${G.length ? `<div class="dgu-satirlar">${G.map(t => `<button class="dgu-satir" type="button" data-talep="${esc(t.id)}"><span class="dgu-satir-ikon">${ic('headset')}</span><span class="dgu-satir-metin"><span class="clamp-2 ay-talep-baslik">${esc(t.baslik)}</span><small>${esc(t.konu)} · ${tarihYaz(t.guncel)}</small></span>${tRozet(t.durum)}${ic(I('rowNext'))}</button>`).join('')}</div>`
            : durum({ikon: I('filter'), baslik: 'Bu durumda talebin yok', metin: 'Seçtiğin durumda görüntülenecek bir talep bulunmuyor. Başka bir duruma bakabilirsin.', eylem: btn('Tüm talepleri göster', {tur: 'ikincil', attrs: 'data-tsuz="tumu"'})})}
          </div>`;
      }
      function talepAc(id) {
        const t = talepler().find(x => x.id === id); if (!t) { DG.bildir('Bu talep bulunamadı'); return; }
        const d = DG.sheet({baslik: t.baslik, govde: `<div class="dgu-yigin"><p class="u-yatay">${tRozet(t.durum)}<span class="t-meta c-muted">${esc(t.konu)} · ${tarihYaz(t.guncel)}</span></p>
          <div class="dgu-yigin-12">${t.mesajlar.map(m => `<div class="dgu-kart is-gri ay-mesaj"><p class="t-meta c-muted">${m.sen ? 'Sen' : 'Destek ekibi'} · ${tarihYaz(m.ts)}</p><p>${esc(m.metin)}</p>${m.ek ? `<p class="t-meta c-muted">${ic('paperclip')} ${esc(m.ek)}</p>` : ''}</div>`).join('')}</div>
          ${alan({ad: 'yanit', etiket: 'Yanıtın', cok: true, zorunlu: true, yer: t.durum === 'kapali' ? 'Yazarsan bu talep yeniden açılır.' : 'Destek ekibine yazmak istediğin şeyi buraya yaz.'})}${dosyaAlan('yanit-ek')}<p class="dgu-yardim">Yanıtın destek ekibinin kuyruğuna düşer; cevap geldiğinde bildirim alırsın.</p>${btn('Yanıtı gönder', {ikon: 'paper-plane', attrs: 'data-yanit', tam: true})}</div>`,
          ayak: `<div class="dgu-ikili">${btn('Taleplerime dön', {tur: 'ikincil', attrs: 'data-kapat'})}${t.durum === 'kapali' ? btn('Yeniden aç', {attrs: 'data-durum="acik"'}) : btn('Talebi kapat', {tur: 'ikincil', attrs: 'data-durum="kapali"'})}</div>`});
        const guncelle = fn => { talepYaz(talepler().map(x => x.id === id ? fn({...x, guncel: Date.now()}) : x)); talepCiz(); };
        const y = d.querySelector('#f-yanit'); y.maxLength = 5000; sayacBagla(y, 5000); dosyaBagla(d);
        d.querySelector('[data-yanit]').addEventListener('click', () => { const v = y.value.trim(), m = !v ? 'Yanıtını yaz.' : v.length < 10 ? 'Yanıtın en az 10 karakter olsun.' : ''; alanHata(y.closest('.dgu-alan'), m); if (m) { y.focus(); return; } const ek = d.querySelector('input[name="yanit-ek"]').files[0]?.name || ''; guncelle(x => ({...x, durum: 'acik', mesajlar: [...x.mesajlar, {sen: true, metin: v, ts: Date.now(), ek}]})); d.kapat(); DG.bildir(t.durum === 'kapali' ? 'Yanıtın gönderildi, talep yeniden açıldı' : 'Yanıtın gönderildi'); });
        d.querySelector('[data-durum]').addEventListener('click', e => { const v = e.currentTarget.dataset.durum; guncelle(x => ({...x, durum: v})); d.kapat(); DG.bildir(v === 'kapali' ? 'Talep kapatıldı' : 'Talep yeniden açıldı'); });
      }
      // --- Öneri ve Şikâyet (canlı Çözüm Merkezi formu; misafire de açık) ---
      const oPanel = root.querySelector('[data-panel=oneri]');
      function oneriCiz() {
        if (oPanel.firstChild) return;
        const hataF = ctx.durum === 'hata-form';
        const OH = hataF ? {ad: 'Adını yaz.', soyad: 'Soyadını yaz.', eposta: 'E-posta adresini yaz — cevabı buraya gönderiyoruz.', tur: 'Öneri mi şikâyet mi — birini seç.', alan: 'Hangi alanla ilgili — seç ki doğru ekibe düşsün.', mesaj: 'Mesaj alanı boş — ne olduğunu birkaç cümleyle anlat.'} : {};
        oPanel.innerHTML = `<form class="dgu-ic dgu-yigin" data-oneri-form novalidate><div class="ay-bolum">${bas('Öneri ve Şikâyet')}<p class="dgu-yardim">Yıldız (*) ile işaretli alanlar zorunludur. Cevabımız e-posta adresine gelir.</p></div>
          <div class="ay-ikili-alan">${alan({ad: 'o-ad', etiket: 'Ad', yer: 'Adın', oto: 'given-name', zorunlu: true, hata: OH.ad})}${alan({ad: 'o-soyad', etiket: 'Soyad', yer: 'Soyadın', oto: 'family-name', zorunlu: true, hata: OH.soyad})}</div>
          ${alan({ad: 'o-eposta', etiket: 'E-posta', tur: 'email', yer: 'ornek@eposta.com', oto: 'email', zorunlu: true, hata: OH.eposta})}
          ${DG.telefon({ad: 'telefon', ulkeAd: 'telefon_ulke', etiket: 'Telefon', opsiyonel: true})}
          ${secAlan({ad: 'o-tur', etiket: 'Türü', secenekler: [['Öneri', 'Öneri'], ['Şikâyet', 'Şikâyet']], yer: 'Seç', zorunlu: true, hata: OH.tur})}
          ${secAlan({ad: 'o-alan', etiket: 'İlgili alan', secenekler: ['Tarifler', 'Menüler', 'Püf Noktaları', 'Şefler', 'Alışveriş Listem', 'Diğer'].map(x => [x, x]), yer: 'Seç', zorunlu: true, hata: OH.alan, yardim: 'Alan seçimi mesajı ilgili ekibe yönlendirir.'})}
          ${alan({ad: 'o-mesaj', etiket: 'Mesajın', cok: true, yer: 'Önerini ya da şikâyetini buraya yazabilirsin', zorunlu: true, hata: OH.mesaj})}
          <div class="dgu-alan ay-onay${hataF ? ' is-hata' : ''}">${DG.secim('o-kvkk', `<a class="ay-link" href="yasal-metin.html?slug=kvkk">KVKK Metni</a>'ni ve <a class="ay-link" href="yasal-metin.html?slug=aydinlatma">Aydınlatma Metni</a>'ni okudum, onaylıyorum.`, {zorunlu: true})}${hataF ? `<p class="dgu-hata" role="alert">${ic(I('error'))}Devam etmek için KVKK ve Aydınlatma Metni onayı gerekiyor.</p>` : ''}</div>
          <p class="dgu-yardim">Bu form reCAPTCHA ile korunmaktadır — Google <a class="ay-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener">Gizlilik</a> ve <a class="ay-link" href="https://policies.google.com/terms" target="_blank" rel="noopener">Şartlar</a> metinleri geçerlidir.</p>
          <p class="dgu-yardim">Mesajlara genellikle <b class="t-bold">1 iş günü</b> içinde dönüyoruz.</p>
          ${btn('Gönder', {ikon: 'paper-plane', attrs: 'type="submit"', tam: true}).replace('type="button" type="submit"', 'type="submit"')}</form>`;
        const f = oPanel.querySelector('form'), msj = f.querySelector('#f-o-mesaj');
        msj.maxLength = 1000; sayacBagla(msj, 1000);
        if (hataF) f.querySelector('.is-hata :is(input,textarea,button)')?.focus();
        f.addEventListener('input', e => { const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, ''); });
        f.addEventListener('change', e => { if (e.target.type === 'hidden' || (e.target.name === 'o-kvkk' && e.target.checked)) alanHata(e.target.closest('.dgu-alan'), ''); });
        f.addEventListener('submit', e => {
          e.preventDefault();
          const v = Object.fromEntries(new FormData(f)), ep = (v['o-eposta'] || '').trim();
          const H = {'o-ad': (v['o-ad'] || '').trim() ? '' : 'Adını yaz.', 'o-soyad': (v['o-soyad'] || '').trim() ? '' : 'Soyadını yaz.', 'o-eposta': !ep ? 'E-posta adresini yaz — cevabı buraya gönderiyoruz.' : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ep) ? '' : 'E-posta adresi eksik görünüyor: “ad@site.com” biçiminde yaz.', 'o-tur': v['o-tur'] ? '' : 'Öneri mi şikâyet mi — birini seç.', 'o-alan': v['o-alan'] ? '' : 'Hangi alanla ilgili — seç ki doğru ekibe düşsün.', 'o-mesaj': (v['o-mesaj'] || '').trim() ? '' : 'Mesaj alanı boş — ne olduğunu birkaç cümleyle anlat.'};
          Object.entries(H).forEach(([k, m]) => alanHata(f.querySelector('#f-' + k).closest('.dgu-alan'), m));
          const th = DG.telefonHata(f); alanHata(f.querySelector('[data-telefon]'), th);
          const kv = f.querySelector('input[name="o-kvkk"]'); alanHata(kv.closest('.dgu-alan'), kv.checked ? '' : 'Devam etmek için KVKK ve Aydınlatma Metni onayı gerekiyor.');
          const ilk = Object.keys(H).find(k => H[k]); if (ilk) { odakla(f.querySelector('#f-' + ilk)); return; } if (th) { odakla(f.querySelector('#f-telefon')); return; } if (!kv.checked) { odakla(kv); return; }
          oPanel.innerHTML = durum({ikon: I('check'), baslik: 'Mesajın bize ulaştı', metin: 'Mesajlara genellikle 1 iş günü içinde dönüyoruz; cevabımız e-posta adresine gelir.', eylem: btn('Forma dön', {tur: 'ikincil', attrs: 'data-oneri-yeni'})});
          window.scrollTo({top: 0});
        });
      }

      // --- Yeni talep ---
      function yeniCiz() {
        if (!ctx.uye) { yPanel.innerHTML = giris('Yeni destek talebi açmak için hesabına giriş yapmalısın. Hızlı bir öneri için Görüş Bildir\'i kullanabilirsin.'); return; }
        if (yPanel.firstChild) return;
        const hataF = ctx.durum === 'hata-form';
        yPanel.innerHTML = `<form class="dgu-ic dgu-yigin" data-talep-form novalidate><p class="dgu-yardim">Yıldız (*) ile işaretli alanlar zorunludur. Gönderince talebin Taleplerim'in en üstüne, “Açık talep” durumuyla düşer.</p>
          ${secAlan({ad: 'konu', etiket: 'Talebin konusu', secenekler: KONU_DESTEK.map(k => [k, k]), yer: 'Konu seç', zorunlu: true, hata: hataF ? 'Bir konu seç — talebin doğru ekibe düşsün.' : '', yardim: 'Konu seçimi talebi yönlendirir; yanlış seçersen destek ekibi taşır.'})}
          <div data-odeme hidden>${alan({ad: 'referans', etiket: 'İlgili ödeme referansı', yer: 'Fatura numarası', yardim: 'Ödemelerim\'deki fatura kayıtlarından seçebilir ya da elindeki referansı yazabilirsin.'})}</div>
          ${alan({ad: 'baslik', etiket: 'Başlık', yer: 'Sorunu tek cümlede özetle', zorunlu: true, hata: hataF ? 'Talebin için bir başlık yaz.' : ''})}
          ${alan({ad: 'metin', etiket: 'Talebin', cok: true, yer: 'Ne olduğunu, ne zaman olduğunu ve hangi tarif ya da ekranda gördüğünü yazabilirsin.', zorunlu: true, hata: hataF ? 'Ne olduğunu birkaç cümleyle anlat.' : '', yardim: 'Hangi tarifi, hangi ekranı ve hangi cihazı kullandığını yazarsan talep daha hızlı çözülür.'})}
          ${dosyaAlan('ek')}<p class="dgu-yardim">Talebini gönderdikten sonra yazışmayı talebin detayından sürdürebilir, çözüldüyse talebi kapatabilirsin.</p>
          ${btn('Talebi gönder', {ikon: 'paper-plane', attrs: 'type="submit"', tam: true}).replace('type="button" type="submit"', 'type="submit"')}
          </form>`;
        const f = yPanel.querySelector('form');
        f.querySelector('#f-baslik').maxLength = 160; f.querySelector('#f-referans').maxLength = 64; f.querySelector('#f-metin').maxLength = 5000; sayacBagla(f.querySelector('#f-metin'), 5000); dosyaBagla(f);
        if (hataF) f.querySelector('.is-hata button, .is-hata input, .is-hata textarea')?.focus();
        f.addEventListener('input', e => { const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, ''); });
        f.addEventListener('change', e => {
          if (e.target.name === 'konu') { f.querySelector('[data-odeme]').hidden = !ODEME_KONU.includes(e.target.value); alanHata(e.target.closest('.dgu-alan'), ''); }
        });
        f.addEventListener('submit', e => {
          e.preventDefault();
          const v = Object.fromEntries(new FormData(f)), b = v.baslik.trim(), m = v.metin.trim();
          const H = {konu: v.konu ? '' : 'Bir konu seç — talebin doğru ekibe düşsün.', baslik: !b ? 'Talebin için bir başlık yaz.' : b.length < 3 ? 'Başlık en az 3 karakter olsun — listede bu satırı sen tanıyacaksın.' : '', metin: !m ? 'Ne olduğunu birkaç cümleyle anlat.' : m.length < 10 ? 'Talebin en az 10 karakter olsun' : ''};
          Object.entries(H).forEach(([k, m]) => alanHata(f.querySelector('#f-' + k).closest('.dgu-alan'), m));
          const ilk = Object.keys(H).find(k => H[k]); if (ilk) { odakla(f.querySelector('#f-' + ilk)); return; }
          const ek = f.querySelector('input[name=ek]').files[0]?.name || '';
          const t = {id: Math.random().toString(36).slice(2, 9), konu: v.konu, baslik: v.baslik.trim(), durum: 'acik', guncel: Date.now(), referans: v.referans?.trim() || '', mesajlar: [{sen: true, metin: v.metin.trim(), ts: Date.now(), ek}]};
          talepYaz([t, ...talepler()]);
          yPanel.innerHTML = ''; tsuz = 'tumu'; sekmeAc('talepler'); window.scrollTo({top: 0});
          DG.bildir('Talebin alındı', {ikon: I('check')});
        });
      }

      root.addEventListener('click', e => {
        const sg = e.target.closest('[data-seg]'); if (sg) { sekmeAc(sg.dataset.seg); return; }
        const kn = e.target.closest('[data-konu]'); if (kn) { konu = kn.dataset.konu; sssCiz(); return; }
        if (e.target.closest('[data-sss-temizle]')) { inp.value = ''; sssCiz(); inp.focus(); return; }
        if (e.target.closest('[data-git-yeni]')) { sekmeAc('yeni'); root.querySelector('[data-seg=yeni]').focus(); return; }
        if (e.target.closest('[data-yakinda]')) { DG.bildir('Yakında'); return; }
        if (e.target.closest('[data-oneri-yeni]')) { oPanel.innerHTML = ''; oneriCiz(); return; }
        const ts = e.target.closest('[data-tsuz]'); if (ts) { tsuz = ts.dataset.tsuz; talepCiz(); return; }
        const tl = e.target.closest('[data-talep]'); if (tl) talepAc(tl.dataset.talep);
      });
      if (sek !== 'sss') sekmeAc(sek);
    }};
  });

  // ============ S6 · Görüş Bildir (canlı panel: konu → alanlar; KVKK onayı; “Görüşün bize ulaştı”) ============
  const GKONU = [['oneri', 'Önerim var', 'lightbulb'], ['soru', 'Bir sorum var', 'circle-question'], ['teknik', 'Teknik sorun', 'bug'], ['ihlal', 'İhlal bildirimi', 'shield-halved'], ['puan', 'Puan ver', 'face-smile']];
  const GALAN = ['Tarifler', 'Mutfak Sırları', 'Püf Noktaları', 'Şefler', 'Menülerim', 'Topluluk', 'Diğer'];
  DG.sayfa('gorus-bildir', ctx => {
    const ortak = {tur: 'alt', baslik: 'Görüş Bildir', menuAktif: 'feedback'};
    if (ctx.durum === 'tamam') return {...ortak, html: durum({ikon: I('check'), baslik: 'Görüşün bize ulaştı', metin: 'Yazdıkların kaydedildi. Ekibimiz okuyacak; bir e-posta adresi bıraktıysan gerektiğinde oradan döneriz.', tam: true, eylem: `<div class="dgu-yigin-12">${btn('Forma dön', {href: tasi('gorus-bildir.html'), tam: true})}</div>`})};
    const hataF = ctx.durum === 'hata-form';
    const k0 = GKONU.some(([k]) => k === ctx.qs.get('konu')) ? ctx.qs.get('konu') : 'oneri';
    const H = hataF ? 'Bu alan zorunlu.' : '';
    const alanlar = {
      oneri: `<fieldset class="ay-fieldset"><legend class="dgu-etiket ay-etiket">İlgili alan</legend><div class="dgu-serit" role="radiogroup" aria-label="İlgili alan">${GALAN.map((a, i) => `<button class="dgu-chip" type="button" role="radio" data-galan="${esc(a)}" aria-checked="${i === 0}" aria-pressed="${i === 0}">${esc(a)}</button>`).join('')}</div></fieldset>
        ${alan({ad: 'oneri-metin', etiket: 'Önerini anlat', cok: true, zorunlu: true, hata: H})}${alan({ad: 'oneri-eposta', etiket: 'E-posta adresin (opsiyonel)', tur: 'email', oto: 'email'})}`,
      soru: `${secAlan({ad: 'soru-konu', etiket: 'Sorunun konusu', secenekler: ['Üyelik & Hesap', 'Tarif & Menü', 'Şef içeriği', 'DadaGastro Pro & Ödeme', 'Diğer'].map(x => [x, x]), yer: 'Seç', zorunlu: true, hata: H})}${alan({ad: 'soru-metin', etiket: 'Sorunu yaz', cok: true, zorunlu: true, hata: H})}${alan({ad: 'soru-eposta', etiket: 'E-posta adresin (cevap için)', tur: 'email', oto: 'email', zorunlu: true, hata: H})}`,
      teknik: `${secAlan({ad: 'teknik-yer', etiket: 'Sorunu nerede yaşadın?', secenekler: ['Ana sayfa', 'Tarif / Püf noktası sayfası', 'Arama', 'Üyelik & Giriş', 'Mutfak Defterim / Menülerim', 'Topluluğum / Şef Panelim'].map(x => [x, x]), yer: 'Seç', zorunlu: true, hata: H})}${alan({ad: 'teknik-metin', etiket: 'Sorunu kısaca anlat — ne yaptın, ne oldu?', cok: true, zorunlu: true, hata: H})}
        <div class="dgu-alan"><label class="dgu-btn dgu-btn--ikincil dgu-btn--tam ay-dosya">${ic('image')}<span data-dosya-ad>Ekran görüntüsü ekle (opsiyonel)</span><input class="dgu-sr" type="file" name="teknik-ek" accept="image/*"></label></div>${alan({ad: 'teknik-eposta', etiket: 'E-posta adresin (opsiyonel)', tur: 'email', oto: 'email'})}`,
      ihlal: `${alan({ad: 'ihlal-link', etiket: 'İhlal içeren sayfanın linki', tur: 'url', zorunlu: true, hata: H})}${secAlan({ad: 'ihlal-tur', etiket: 'İhlal türü', secenekler: ['Telif hakkı', 'Uygunsuz içerik', 'Spam / yanıltıcı içerik', 'Diğer'].map(x => [x, x]), yer: 'Seç', zorunlu: true, hata: H})}${alan({ad: 'ihlal-metin', etiket: 'Açıklama', cok: true, zorunlu: true, hata: H})}${alan({ad: 'ihlal-eposta', etiket: 'E-posta adresin', tur: 'email', oto: 'email', zorunlu: true, hata: H})}`,
      puan: `<div class="dgu-alan${hataF ? ' is-hata' : ''}"><span class="dgu-etiket ay-etiket" id="puan-etiket">DadaGastro deneyimini nasıl puanlarsın? *</span><div data-hata-sonra>${DG.puan('puan', 0, 'DadaGastro deneyimini nasıl puanlarsın?')}</div>${hataF ? `<p class="dgu-hata" role="alert">${ic(I('error'))}Bir puan seç.</p>` : ''}</div>${alan({ad: 'puan-metin', etiket: 'Eklemek istediğin bir şey var mı? (opsiyonel)', cok: true})}${alan({ad: 'puan-eposta', etiket: 'E-posta adresin (opsiyonel)', tur: 'email', oto: 'email'})}`
    };
    const html = `<form class="dgu-ic dgu-yigin ay-govde" data-gorus novalidate><p class="c-muted">Önerin, şikayetin veya sorun — hepsine kulak veriyoruz.</p>
      ${secimBolum('Konu seç', `<div class="dgu-secim-izgara is-uc is-orta dgu-serit ay-serit-kart" role="radiogroup">${GKONU.map(([k, m, i]) => DG.secimKart({grup: 'gkonu', k, ad: m, ikon: i, secili: k === k0, tek: true})).join('')}</div>`)}
      ${GKONU.map(([k]) => `<div class="dgu-yigin" data-gpanel="${k}" ${k === k0 ? '' : 'hidden'}>${alanlar[k]}</div>`).join('')}
      <div class="dgu-alan ay-onay${hataF ? ' is-hata' : ''}">${DG.secim('kvkk', `<a class="ay-link" href="yasal-metin.html?slug=aydinlatma">Aydınlatma Metni</a>'ni ve <a class="ay-link" href="yasal-metin.html?slug=kvkk">KVKK Metni</a>'ni okudum, onaylıyorum.`, {zorunlu: true})}${hataF ? `<p class="dgu-hata" role="alert">${ic(I('error'))}Göndermek için onay kutusunu işaretle.</p>` : ''}</div>
      ${btn('Gönder', {ikon: 'paper-plane', attrs: 'type="submit"', tam: true}).replace('type="button" type="submit"', 'type="submit"')}
      </form>`;
    return {...ortak, html, sonra(root) {
      const f = root.querySelector('[data-gorus]');
      let konu = k0;
      const panel = () => f.querySelector(`[data-gpanel="${konu}"]`);
      if (hataF) f.querySelector('.is-hata :is(input,textarea,button)')?.focus();
      f.addEventListener('input', e => { const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, ''); });
      f.addEventListener('change', e => {
        if (e.target.name === 'puan') { alanHata(e.target.closest('.dgu-alan'), ''); }
        if (e.target.name === 'kvkk' && e.target.checked) alanHata(e.target.closest('.dgu-alan'), '');
        if (e.target.type === 'hidden') alanHata(e.target.closest('.dgu-alan'), '');
        if (e.target.name === 'teknik-ek') { const d = e.target.files[0]; f.querySelector('[data-gpanel=teknik] [data-dosya-ad]').textContent = d ? d.name : 'Ekran görüntüsü ekle (opsiyonel)'; }
      });
      // Beyar V4 C8: konu kartları ve ilgili alan çipleri tek satır yatay şerit (ortak .dgu-serit); seçili öğe şeritte görünür başlar.
      f.querySelectorAll('.dgu-serit').forEach(sr => { const on = sr.querySelector('[aria-checked=true]'); if (on) sr.scrollLeft = Math.max(0, on.offsetLeft - sr.offsetLeft - parseFloat(getComputedStyle(sr).paddingLeft)); });
      const radyoSec = (sel, b) => f.querySelectorAll(sel).forEach(x => { const on = x === b; x.setAttribute('aria-checked', on); x.setAttribute('aria-pressed', on); });
      f.addEventListener('click', e => {
        const k = e.target.closest('[data-grup=gkonu]');
        if (k) { konu = k.dataset.k; f.querySelectorAll('[data-grup=gkonu]').forEach(x => x.setAttribute('aria-checked', x === k)); f.querySelectorAll('[data-gpanel]').forEach(p => { p.hidden = p.dataset.gpanel !== konu; }); const u = new URL(location.href); u.searchParams.set('konu', konu); history.replaceState(history.state, '', u); return; }
        const a = e.target.closest('[data-galan]'); if (a) radyoSec('[data-galan]', a);
      });
      // Radyo grubu ok tuşlarıyla gezilir (chip radyoları).
      f.addEventListener('keydown', e => { const b = e.target.closest('[role=radio]:is(.dgu-chip,.dgu-secim-kart)'); if (!b || !['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return; e.preventDefault(); const l = [...b.parentElement.children], i = l.indexOf(b), n = l[(i + (/Right|Down/.test(e.key) ? 1 : l.length - 1)) % l.length]; n.focus(); n.click(); });
      f.addEventListener('submit', e => {
        e.preventDefault();
        const p = panel(), hatalar = [];
        const zorunlu = {oneri: ['oneri-metin'], soru: ['soru-konu', 'soru-metin', 'soru-eposta'], teknik: ['teknik-yer', 'teknik-metin'], ihlal: ['ihlal-link', 'ihlal-tur', 'ihlal-metin', 'ihlal-eposta'], puan: []}[konu];
        p.querySelectorAll('.dgu-alan').forEach(a => alanHata(a, ''));
        for (const ad of zorunlu) {
          const el = p.querySelector(`[name="${ad}"]`), v = (el.value || '').trim();
          let m = v ? '' : (el.type === 'hidden' ? 'Bir seçenek seç.' : 'Bu alan zorunlu.');
          if (!m && el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) m = 'Geçerli bir e-posta adresi yaz.';
          if (!m && el.type === 'url' && !/^https?:\/\/\S+\.\S+/.test(v)) m = 'Geçerli bir bağlantı yaz (https:// ile).';
          if (m) { alanHata(el.closest('.dgu-alan'), m); hatalar.push(p.querySelector('#f-' + ad)); }
        }
        // İsteğe bağlı e-posta doluysa biçimi denetlenir.
        p.querySelectorAll('input[type=email]:not([required])').forEach(el => { const v = el.value.trim(); if (v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { alanHata(el.closest('.dgu-alan'), 'Geçerli bir e-posta adresi yaz.'); hatalar.push(el); } });
        if (konu === 'puan' && !p.querySelector('input[name=puan]:checked')) { alanHata(p.querySelector('.dgu-puan').closest('.dgu-alan'), 'Bir puan seç.'); hatalar.push(p.querySelector('input[name=puan]')); }
        const kv = f.querySelector('input[name=kvkk]');
        if (!kv.checked) { alanHata(kv.closest('.dgu-alan'), 'Göndermek için onay kutusunu işaretle.'); hatalar.push(kv); }
        if (hatalar.length) { odakla(hatalar[0]); return; }
        const u = new URL(location.href); u.searchParams.set('durum', 'tamam'); u.searchParams.delete('konu'); location.href = u.href;
      });
    }};
  });
})();
