/* Profilim grubu (docs/52 H7–H16, N3): profil, profili düzenle, kaydettiklerim (+ koleksiyonlar), tariflerim, tarif ekle (4 adım),
   alışveriş listesi (P1), menülerim (+ menü düzenle ?menu=, Haftalık Menü Pro), rozetlerim (#topluluk, sezon sıralaması), Pro (paywall).
   Kurallar: üye verisi uydurulmaz — sayılar bu cihazdaki yerel durumdan ya da 0. “Örnek Üye” açıkça önizlemedir. Ödeme akışı yok.
   ?ornek=1: gerçek tariflerle doldurulmuş, cihaza YAZILMAYAN dolu hal; açıklaması yalnız galeride (sayfalar.js aciklama), ekranda not yok (docs/55 §2c).
   Yerel anahtarlar: dg-profil, dg-koleksiyon [{id,ad,tarifler}], dg-alisveris, dg-alisveris-gecmis [{id,ad,tarih,kalemler}],
   dg-tariflerim [{id,durum,guncel,adim,ad,kategori,…}], dg-menuler [{id,ad,tarifler}], dg-haftalik {gün: {öğün: slug}}. */
(() => {
  const {ic, I, btn, esc, store, kart, avatar, satir, durum, alan, seg, anahtar} = DG;
  const V = window.DGVERI, TK = window.DGTOKENS;
  const qs = new URLSearchParams(location.search);
  const ORNEK = qs.has('ornek');
  const yeniId = () => Math.random().toString(36).slice(2, 9);
  const saat = () => new Date().toLocaleTimeString('tr', {hour: '2-digit', minute: '2-digit'});
  const tarihYaz = ts => new Date(ts).toLocaleDateString('tr', {day: 'numeric', month: 'long', year: 'numeric'});
  const KADEME = 'Mutfak Meraklısı';
  const MENU_IKON = 'clipboard-list', HAFTA_IKON = 'calendar-week', GORSEL_IKON = 'image', KOL_IKON = 'folder';

  // Grup içi bağlantılar: galeri test parametreleri (?oturum, ?ornek) sayfalar arasında korunur.
  const tasi = h => { const p = new URLSearchParams(); if (qs.get('oturum')) p.set('oturum', qs.get('oturum')); if (ORNEK) p.set('ornek', '1'); const s = p.toString(); return s ? h + (h.includes('?') ? '&' : '?') + s : h; };

  // Yerel kaynak: normalde dg-<k>; ?ornek=1 ise yalnız bellek (cihaza yazılmaz).
  // ?durum=bos da yalnız bellek kullanır: boş hal gösterimi gerçek listeyi silmez.
  const BOS = qs.get('durum') === 'bos';
  function kaynak(k, ornekFn, bos = []) {
    const bel = ORNEK || BOS; let bellek = ORNEK ? ornekFn() : BOS ? JSON.parse(JSON.stringify(bos)) : null;
    return {get: () => bel ? bellek : store.get(k, bos), set: v => { if (bel) bellek = v; else store.set(k, v); return v; }};
  }
  const bul = on => V.tarifler.find(t => t.slug.startsWith(on))?.slug;
  // ---- Örnek üye: tek kaynak window.DGORNEK (ortak/veri/ornek-uye.js) — kişi, sayaçlar, kademe, rozetler, tarifler, kayıtlar, menüler, liste. ----
  const OR = window.DGORNEK || {};
  const ORNEK_KAYIT = (OR.kaydedilenler || []).filter(s => DG.tarif(s));
  const ORNEK_KAPAK = OR.uye?.kapak || DG.tarif(V.gununTarifi)?.gorsel;
  // Taslağın tamamlanan adımı gerçek tarif kaydından okunur: bilgi (ad+kategori+açıklama) · görsel · künye+malzeme · hazırlanış (veride adım yok).
  const tamamlik = t => [t.baslik && t.kategori && t.aciklama, t.gorsel, t.porsiyon && t.malzemeler?.length].filter(Boolean).length;
  const malzKalem = (slug, isaretli = []) => (DG.tarif(slug)?.malzemeler || []).filter(m => m.ad).map((m, i) => ({id: slug.slice(0, 12) + '-' + i, ad: m.ad, miktar: [m.miktar, m.birim].filter(Boolean).join(' '), tarif: slug, isaretli: isaretli.includes(i)}));
  const ORN = {
    tarifler: () => (OR.tariflerim || []).filter(x => DG.tarif(x.slug)).map(x => { const t = DG.tarif(x.slug); return {id: x.slug, slug: x.slug, durum: x.durum, ad: t.kisa, kategori: t.kategori, adim: x.durum === 'taslak' ? tamamlik(t) : 4, guncel: Date.parse(x.tarih) || Date.now(), kaynak: 'ornek'}; }),
    menuler: () => (OR.menuler || []).map(m => ({...m, tarifler: m.tarifler.filter(s => DG.tarif(s))})),
    takip: () => (OR.takipEdilen || []).slice(),
    koleksiyon: () => (OR.koleksiyonlar || []).map(k => ({...k, tarifler: k.tarifler.filter(s => DG.tarif(s))})),
    liste: () => (OR.alisveris || []).flatMap(x => malzKalem(x.tarif, x.isaretli)),
    gecmis: () => [],
    // Haftalık plan: DGORNEK.haftalik (7 gün × kahvaltı/öğle/akşam, gerçek tarifler).
    hafta: () => Object.fromEntries((OR.haftalik || []).map((g, i) => [i, Object.fromEntries(['kahvalti', 'ogle', 'aksam'].filter(k => DG.tarif(g[k] || '')).map(k => [k, g[k]]))])),
    // Tarif ekle dolu hali: Tavuk Curry'nin canlı verisi (kök ld-source.js · DATA.recipes; adımlar ve hatırlatma oradan aynen).
    tarifFormu: () => { const t = DG.tarif(bul('tavuk-curry')); return {id: 'ornek-f', durum: 'taslak', ad: t.kisa, kategoriler: [t.kategori], mutfaklar: ['Hint Mutfağı'], aciklama: t.aciklama, saklama: 'Önemli: Curry baharatını yağda kısa süre kavurmadan doğrudan sıvıya eklerseniz ham tat kalabilir, önce yağda birkaç saniye çevirin. Dikkat: Hindistan cevizi sütünü kaynatırken kesilmemesi için ateşi orta-kısıkta tutup sürekli karıştırın.', alerjen: '', video: '', porsiyon: String(t.porsiyon), birim: t.birim, derece: '', gorunurluk: 'herkes',
      malzemeler: t.malzemeler.map(m => ({tur: 'malzeme', miktar: String(m.miktar ?? '').replace('.', ','), birim: m.birim || '', ad: m.ad, alternatif: ''})),
      adimlar: [['Soğan ve sarımsağı kavurun', 'Sıvı yağda ince kıyılmış soğanı şeffaflaşana kadar kavurup sarımsak ve zencefili ekleyin.', '8'], ['Baharatı kavurun', 'Curry baharatını ekleyip yağda birkaç saniye çevirerek ham tadının gitmesini sağlayın.', ''], ['Tavuğu ekleyin', 'Kuşbaşı tavuk göğsünü ve rendelenmiş domatesi ilave edip tavuğun dış yüzeyi rengini alana kadar karıştırın.', '8'], ['Hindistan cevizi sütüyle pişirin', 'Hindistan cevizi sütünü ve tuzu ekleyip kısık ateşte sos koyulaşıp tavuk yumuşayana kadar pişirin.', '17']].map(([baslik, metin, sure]) => ({tur: 'adim', baslik, metin, sure}))}; }
  };
  // Örnek görünümde kart kaydet düğmesi gerçek listeyi değiştirmez.
  if (ORNEK) addEventListener('click', e => { const k = e.target.closest?.('[data-kaydet]'); if (!k) return; e.preventDefault(); e.stopImmediatePropagation(); const on = k.getAttribute('aria-pressed') !== 'true'; k.setAttribute('aria-pressed', on); DG.bildir(on ? 'Mutfak Defterim\'e kaydedildi' : 'Kayıt kaldırıldı'); }, true);

  // Misafir: giriş çağrısı (canlıda bu adresler misafire 302 → /giris).
  // Misafir duvarı: ortak DG.girisDuvari (ne sunduğu + Giriş Yap / Üye Ol, dönüş DG.donusAdres ile bu sayfaya).
  const girisCagri = DG.girisDuvari;

  // Form hatası: alan altında meta metin + ikon (E-form); ilk hatalı alana odak çağıran tarafta.
  function alanHata(alanEl, msg) {
    if (!alanEl) return;
    alanEl.classList.toggle('is-hata', !!msg);
    alanEl.querySelector('input,select,textarea')?.setAttribute('aria-invalid', msg ? 'true' : 'false');
    let p = alanEl.querySelector(':scope > .dgu-hata');
    if (!msg) { p?.remove(); return; }
    if (!p) { p = document.createElement('p'); p.className = 'dgu-hata'; p.setAttribute('role', 'alert'); (alanEl.querySelector(':scope > .dgu-girdi, :scope > [data-hata-sonra]') || alanEl.lastElementChild).after(p); }
    p.innerHTML = ic(I('error')) + esc(msg);
  }
  const secAlan = (ad, etiket, ops, deger, zorunlu) => DG.secAlan({ad, etiket, secenekler: ops.map(o => [o, o]), deger, zorunlu});
  const kucukFoto = t => DG.kucukFoto(t.gorsel);

  // Tarif seçici sheet'i (koleksiyona ekle, menüye kap ekle, yeni menü, haftalık hücre).
  function tarifSec({baslik, slugs, secili = [], tek = false, ust = '', evet = 'Ekle', bos = '', tamam}) {
    const liste = slugs.map(DG.tarif).filter(Boolean);
    const ara = liste.length > 6 ? `<div class="dgu-girdi">${ic(I('search'))}<input type="search" data-tsec-ara placeholder="Tarif ara" aria-label="Tarif ara"></div>` : '';
    const govde = `<div class="dgu-yigin">${ust}${liste.length ? ara + `<div class="dgu-satirlar" role="group" aria-label="${esc(baslik)}">${liste.map(t => `<label class="dgu-secim pf-tsec" data-ara-metin="${esc((t.kisa + ' ' + t.kategori).toLocaleLowerCase('tr'))}"><input type="${tek ? 'radio' : 'checkbox'}" name="tsec" value="${esc(t.slug)}" ${secili.includes(t.slug) ? 'checked' : ''}>${kucukFoto(t)}<span class="dgu-satir-metin"><span class="clamp-1">${esc(t.kisa)}</span><small>${esc(t.kategori)} · ${t.dakika} dk</small></span></label>`).join('')}</div>` : bos}</div>`;
    const d = DG.sheet({baslik, govde, ayak: liste.length ? `<div class="dgu-ikili">${btn('Vazgeç', {tur: 'ikincil', attrs: 'data-kapat'})}${btn(evet, {attrs: 'data-tsec-tamam'})}</div>` : ''});
    d.querySelector('[data-tsec-ara]')?.addEventListener('input', e => { const q = e.target.value.trim().toLocaleLowerCase('tr'); d.querySelectorAll('[data-ara-metin]').forEach(l => { l.hidden = !!q && !l.dataset.araMetin.includes(q); }); });
    d.querySelector('[data-tsec-tamam]')?.addEventListener('click', () => { const v = [...d.querySelectorAll('input[name=tsec]:checked')].map(i => i.value); if (tamam(v, d) !== false) d.kapat(); });
    return d;
  }
  // Ad soran sheet (koleksiyon/menü/arşiv): boş, uzun ve aynı ad denetimi.
  function adSor({baslik, etiket, deger = '', evet, sinir = 60, mevcut = [], ust = '', bosMesaj = 'Bir ad yaz.', tamam}) {
    const d = DG.sheet({baslik, govde: `<div class="dgu-yigin">${ust}${alan({ad: 'ad-sor', etiket, deger, zorunlu: true})}</div>`, ayak: `<div class="dgu-ikili">${btn('Vazgeç', {tur: 'ikincil', attrs: 'data-kapat'})}${btn(evet, {attrs: 'data-ad-tamam'})}</div>`});
    const inp = d.querySelector('#f-ad-sor'); inp.maxLength = sinir;
    const bitir = () => {
      const v = inp.value.trim(), al = inp.closest('.dgu-alan');
      const m = !v ? bosMesaj : v.length > sinir ? `En çok ${sinir} karakter.` : mevcut.some(x => x.toLocaleLowerCase('tr') === v.toLocaleLowerCase('tr')) ? 'Bu adı zaten kullanıyorsun.' : '';
      alanHata(al, m); if (m) { inp.focus(); return; }
      if (tamam(v, d) !== false) d.kapat();
    };
    d.querySelector('[data-ad-tamam]').onclick = bitir;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); bitir(); } });
    setTimeout(() => inp.focus(), TK.motion.sheet);
    return d;
  }

  const profil = () => store.get('profil', {});
  // Üye kimliği: yerel profil düzenlemesi varsa o, yoksa örnek üye (DGORNEK.uye). Kademe DGORNEK.kademe.
  const adSoyad = () => { const p = ORNEK ? {} : profil(); return [p.ad, p.soyad].filter(Boolean).join(' ') || OR.uye?.adSoyad || ''; };
  const KADEME_ROZET = () => `<span class="dgu-rozet">${ic(OR.kademe?.ikon || 'leaf')}${esc(OR.kademe?.ad || KADEME)}</span>`;
  const kayitlar = () => (ORNEK ? ORNEK_KAYIT : DG.kayitli.al()).filter(s => DG.tarif(s));

  // ============ H7 · Profilim (kendi profil = şef profilinin sahip görünümü) ============
  DG.sayfa('profil', ctx => {
    const ortak = {tur: 'sekme', nav: 'profile', baslik: 'Profil', menuAktif: 'profile'};
    if (!ctx.uye) return {...ortak, html: girisCagri({ikon: I('profile'), baslik: 'Mutfak profilini görmek için giriş yap', metin: 'Tariflerin, kaydettiklerin, menülerin ve rozetlerin tek yerde toplanır.',
      sunar: [[I('save'), 'Kaydettiklerin ve koleksiyonların', 'Beğendiğin tarifleri kaydet, klasörlere ayır.'], [I('shoppingList'), 'Alışveriş listen ve menülerin', 'Malzemeleri listene ekle, menünü tek dokunuşla pişir.'], [I('badge'), 'Rozetlerin ve şef merdivenin', 'Paylaştıkça kademe atla, rozet topla.']]})
      + `<section class="dgu-bolum"><div class="dgu-satirlar">${satir({ikon: I('pro'), baslik: 'DadaGastro Pro', alt: 'Planları incele', href: 'pro.html'})}${satir({ikon: I('settings'), baslik: 'Ayarlar', href: 'ayarlar.html'})}${satir({ikon: 'circle-question', baslik: 'Çözüm Merkezi', href: 'destek.html'})}</div></section>`};
    // Profil = örnek üyenin hesabı (DGORNEK): kişi, sayaçlar, kademe ve listeler her iki üye halinde aynı kaynaktan.
    const ad = adSoyad(), S = OR.sayac || {}, tarifler = ORN.tarifler(), yayinda = tarifler.filter(t => t.durum === 'yayinda');
    const takip = ORN.takip(), liste = ORN.liste(), menuler = ORN.menuler(), kay = ORNEK_KAYIT, puflar = (OR.pufNoktalarim || []).map(s => V.puflar.find(p => p.slug === s)).filter(Boolean);
    const sek = ['tarifler', 'puf', 'kayit', 'menu'].includes(ctx.qs.get('sekme')) ? ctx.qs.get('sekme') : 'tarifler';
    const sayac = [[DG.sayi(S.tarif), 'Tarif'], [DG.sayi(S.takipci), 'Takipçi'], [DG.sayi(S.takip), 'Takip'], [DG.sayi(S.puan ?? OR.puan), 'Puan', 'Topluluk Puanı']];
    const bas = DG.profilBas({ad, kapak: ORNEK_KAPAK, eylem: KADEME_ROZET(), sayaclar: sayac})
      + `<div class="dgu-ic dgu-yigin">${btn('Profili düzenle', {tur: 'ikincil', boy: 'sm', ikon: 'pen', href: tasi('profil-duzenle.html'), tam: true})}</div>`;
    const panel = (k, ic2) => `<div role="tabpanel" data-panel="${k}" ${k === sek ? '' : 'hidden'}>${ic2}</div>`;
    const tumu = (n, href, m) => btn(`${m} (${n})`, {tur: 'ikincil', href: tasi(href), tam: true});
    const panTarif = `<div class="dgu-yigin"><div class="dgu-izgara">${yayinda.slice(0, 4).map(t => kart(DG.tarif(t.slug)).replace(/<div class="dg-author">[\s\S]*?<\/div>/, '')).join('')}</div>${tumu(tarifler.length, 'tariflerim.html', 'Tariflerim')}</div>`;
    const panPuf = `<div class="dgu-yigin-12">${puflar.map(p => DG.puf(p)).join('')}</div>`;
    const panKayit = `<div class="dgu-yigin"><div class="dgu-izgara">${kay.slice(0, 4).map(s => kart(DG.tarif(s))).join('')}</div>${tumu(kay.length, 'kaydettiklerim.html', 'Tümünü gör')}</div>`;
    const panMenu = `<div class="dgu-yigin-12">${menuler.map(m => { const t = DG.tarif(m.tarifler[0]); return `<a class="dgu-kart pf-menu" href="${esc(tasi(`menulerim.html?menu=${encodeURIComponent(m.id)}`))}">${t ? DG.kucukFoto(t.gorsel) : DG.kucukFoto('', MENU_IKON)}<span class="dgu-satir-metin"><b class="t-card clamp-1">${esc(m.ad)}</b><small>${esc([m.mod, menuBilgi(m)].filter(Boolean).join(' · '))}</small></span>${ic(I('rowNext'))}</a>`; }).join('')}</div>`;
    const sekmeler = `<section class="dgu-ic dgu-yigin">${seg('Profil sekmeleri', [['tarifler', 'Tarifleri'], ['puf', 'Püf Noktaları'], ['kayit', 'Kaydedilenler'], ['menu', 'Menüleri']], sek).replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')}${panel('tarifler', panTarif)}${panel('puf', panPuf)}${panel('kayit', panKayit)}${panel('menu', panMenu)}</section>`;
    const grup = (baslik, satirlar) => `<section class="dgu-bolum pf-grup"><h2 class="t-label c-muted">${baslik}</h2><div class="dgu-satirlar">${satirlar.join('')}</div></section>`;
    const taslak = tarifler.filter(t => t.durum === 'taslak').length;
    const html = bas + sekmeler
      + grup('Mutfağım', [satir({ikon: I('save'), baslik: 'Kaydettiklerim', alt: `${kay.length} tarif`, href: tasi('kaydettiklerim.html')}), satir({ikon: I('recipes'), baslik: 'Tariflerim', alt: `${yayinda.length} yayında · ${tarifler.filter(t => t.durum === 'inceleniyor').length} incelemede · ${taslak} taslak`, href: tasi('tariflerim.html')}), satir({ikon: I('shoppingList'), baslik: 'Alışveriş listem', alt: `${liste.length} kalem`, href: tasi('alisveris-listesi.html')}), satir({ikon: MENU_IKON, baslik: 'Menülerim', alt: `${menuler.length} menü`, href: tasi('menulerim.html')})])
      + grup('Gelişimim', [satir({ikon: I('badge'), baslik: 'Rozetlerim', alt: `${OR.kademe?.ad || KADEME} · ${(OR.kazanilan || []).length} rozet`, href: tasi('rozetlerim.html')}), satir({ikon: I('community'), baslik: 'Topluluğum', alt: `${takip.length} takip`, href: tasi('rozetlerim.html#topluluk')})])
      + grup('Hesabım', [satir({ikon: I('pro'), baslik: 'Pro ve Üyeliğim', alt: ctx.pro ? 'Pro' : 'Ücretsiz plan', href: tasi('pro.html')}), satir({ikon: I('notifications'), baslik: 'Bildirimler', href: 'bildirimler.html'}), satir({ikon: I('settings'), baslik: 'Ayarlar', href: 'ayarlar.html'}), satir({ikon: 'circle-question', baslik: 'Çözüm Merkezi', href: 'destek.html'})])
      + grup('Oturum', [satir({ikon: I('logout'), baslik: 'Çıkış', sag: '', sinif: 'is-yikici', attrs: 'data-cikis'})]);
    return {...ortak, html, sonra(root) {
      root.querySelector('[data-seg][aria-selected=true]')?.scrollIntoView({block: 'nearest', inline: 'nearest'});
      root.addEventListener('click', async e => {
        const s = e.target.closest('[data-seg]');
        if (s) { root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); root.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== s.dataset.seg; }); s.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: motion.matches ? 'auto' : 'smooth'}); const u = new URL(location.href); u.searchParams.set('sekme', s.dataset.seg); history.replaceState(null, '', u); return; }
        if (e.target.closest('[data-cikis]')) {
          if (!await DG.onay({baslik: 'Çıkış yapılsın mı?', metin: 'Hesabından çıkış yapılacak.', evet: 'Çıkış yap'})) return;
          store.set('oturum', {rol: 'misafir'}); try { sessionStorage.removeItem('dadagastro-member-preview'); } catch { /* yok */ }
          DG.bildir('Çıkış yapıldı'); setTimeout(() => location.replace('profil.html'), TK.motion.reveal);
        }
      });
    }};
  });

  // ============ H8 · Profili düzenle ============
  DG.sayfa('profil-duzenle', ctx => {
    const baslik = 'Profili düzenle';
    if (!ctx.uye) return {tur: 'alt', baslik, html: girisCagri({ikon: I('profile'), baslik: 'Profilini düzenlemek için giriş yap', metin: 'Adını, kullanıcı adını ve profil fotoğrafını giriş yaptıktan sonra düzenleyebilirsin.',
      sunar: [[GORSEL_IKON, 'Profil fotoğrafı ve kapak', 'Mutfak profilini kendi görselinle kişiselleştir.'], ['at', 'Kullanıcı adı ve hakkımda', 'Seni topluluğa tanıtan kısa bir not yaz.'], [I('privacy'), 'İletişim bilgilerin', 'E-posta ve telefonun yalnız hesabında durur.']]})};
    // Web kaynağı: g-hesabim.blade.php #profil “Profil Bilgilerim” (+ ProfilGuncelleIstegi mesajları). Cinsiyet webde yok → çıkarıldı.
    const hataF = ctx.durum === 'hata-form';
    const u = OR.uye || {};
    const p = {ad: u.ad || '', soyad: u.soyad || '', kullanici: u.kullanici || '', eposta: u.eposta || '', telefon: u.telefon || '', telefonUlke: u.telefonUlke || 'TR', uzmanlik: 'Belirtmek istemiyorum', hakkinda: u.hakkinda || '', ...(ORNEK ? {} : profil()), ...(hataF ? {kullanici: '', telefon: '55512'} : {})};
    const UZMANLIK = ['Belirtmek istemiyorum', 'Hamur işi ve pastacılık', 'Ev mutfağı ve günlük yemekler', 'Zeytinyağlılar ve mezeler', 'Et, mangal ve sakatat', 'Dünya mutfakları'];
    const ops = (h, m = '(opsiyonel)') => h.replace('</label>', ` <span class="dgu-ops">${m}</span></label>`);
    const yardimHtml = (ikon, h) => `<p class="dgu-yardim pf-yardim">${ic(ikon)}<span>${h}</span></p>`;
    const kAdres = k => `Herkese açık şef profilinin adresi: <b data-k-adres>/sef/${esc(k)}</b> — <a class="c-deep" href="sefler.html">profilim başkalarına nasıl görünüyor?</a>`;
    const html = `<form class="dgu-yigin" novalidate data-form>
      <div class="pf-gorsel"><div class="dgu-profil-kapak dgu-gulucuk" data-kapak-onizle aria-hidden="true" ${ORNEK_KAPAK ? `style="background-image:url('../${esc(ORNEK_KAPAK)}')"` : ''}></div><label class="dgu-btn dgu-btn--ikincil dgu-btn--sm pf-dosya pf-kapak-btn" title="JPG veya PNG, en az 1176×240 px, en çok 5 MB. Şerit olarak kırpılır.">${ic('camera')}<span>Kapağı Değiştir</span><input type="file" accept="image/jpeg,image/png" class="dgu-sr" data-gorsel="kapak"></label>
        <div class="pf-avatar-sec">${avatar(adSoyad(), 96)}<label class="dgu-btn dgu-btn--metin pf-dosya" title="JPG veya PNG, en az 400×400 px. Kare kırpılır.">${ic('camera')}<span>Profil fotoğrafını değiştir</span><input type="file" accept="image/jpeg,image/png" class="dgu-sr" data-gorsel="avatar"></label></div></div>
      <div class="dgu-ic dgu-yigin"><div class="dgu-yigin-8"><h1 class="t-section">${ic('id-card')} Profil Bilgilerim</h1><p class="t-meta c-muted">Adın ve fotoğrafın yayımladığın tariflerde, yorumlarında ve herkese açık şef profilinde görünür.</p></div>
      ${yardimHtml(I('info'), 'Fotoğrafını kartın üstündeki düğmelerden değiştirebilirsin — JPG veya PNG, en çok 5 MB. Profil fotoğrafı en az 400×400 px (kare kırpılır), kapak en az 1176×240 px (şerit kırpılır).')}
      <div class="pf-ikili-alan">${alan({ad: 'ad', etiket: 'Ad', deger: p.ad, oto: 'given-name', zorunlu: true})}${alan({ad: 'soyad', etiket: 'Soyad', deger: p.soyad, oto: 'family-name', zorunlu: true})}</div>
      ${alan({ad: 'kullanici', etiket: 'Kullanıcı adı', deger: p.kullanici, oto: 'username', zorunlu: true, hata: hataF ? 'Kullanıcı adı zorunludur.' : ''}).replace(/<\/div>$/, yardimHtml('link', kAdres(p.kullanici)) + '</div>')}
      ${alan({ad: 'eposta', etiket: 'E-posta', tur: 'email', deger: p.eposta, oto: 'email', zorunlu: true}).replace(/<\/div>$/, yardimHtml(I('info'), 'Giriş adresin. E-posta değişikliği henüz açık değil; doğrulama akışı bağlanana kadar bu alan salt okunur.') + '</div>')}
      ${DG.telefon({ad: 'telefon', ulkeAd: 'telefonUlke', etiket: 'Telefon', opsiyonel: true, deger: p.telefon, ulke: p.telefonUlke, hata: hataF ? 'Geçerli bir telefon numarası gir (10 hane).' : ''})}
      ${ops(alan({ad: 'dogum', etiket: 'Doğum tarihi', yer: 'gg.aa.yyyy', ikon: 'calendar', oto: 'bday'})).replace(/<\/div>$/, yardimHtml(I('info'), 'Doğum tarihi henüz saklanmıyor; alan bağlanana kadar kapalı.') + '</div>')}
      ${ops(DG.secAlan({ad: 'uzmanlik', etiket: 'Uzmanlık alanım', secenekler: UZMANLIK.map(x => [x, x]), deger: p.uzmanlik}))}
      ${alan({ad: 'hakkinda', etiket: 'Hakkımda', cok: true, deger: p.hakkinda}).replace('</label>', ` <span class="dgu-ops">(opsiyonel)</span> <span class="dgu-ops" data-bio-sayac aria-live="polite">${p.hakkinda.length} / 160</span></label>`)}
      <p class="t-meta c-muted">Son güncelleme: ${p.guncel ? esc(new Date(p.guncel).toLocaleDateString('tr', {day: 'numeric', month: 'long'})) : 'hiç'}</p></div></form>`;
    return {tur: 'alt', baslik, html, bar: btn('Değişiklikleri Kaydet', {ikon: 'floppy-disk', attrs: 'data-profil-kaydet'}), sonra(root) {
      const f = root.querySelector('[data-form]'), hak = f.querySelector('#f-hakkinda');
      hak.maxLength = 160; f.querySelector('#f-ad').maxLength = 120; f.querySelector('#f-soyad').maxLength = 120; f.querySelector('#f-kullanici').maxLength = 60;
      const ep = f.querySelector('#f-eposta'); ep.readOnly = true; ep.setAttribute('aria-readonly', 'true');
      const dg = f.querySelector('#f-dogum'); dg.disabled = true; dg.setAttribute('inputmode', 'numeric');
      hak.addEventListener('input', () => { f.querySelector('[data-bio-sayac]').textContent = `${hak.value.length} / 160`; });
      f.querySelector('#f-kullanici').addEventListener('input', e => { f.querySelector('[data-k-adres]').textContent = '/sef/' + e.target.value.trim(); });
      f.addEventListener('input', e => { const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, ''); });
      if (hataF) f.querySelector('.is-hata input:not([type=hidden])')?.focus();
      f.addEventListener('change', e => {
        const g = e.target.dataset.gorsel; if (!g || !e.target.files[0]) return;
        const url = URL.createObjectURL(e.target.files[0]);
        const el = g === 'kapak' ? f.querySelector('[data-kapak-onizle]') : f.querySelector('.dgu-avatar');
        el.style.backgroundImage = `url('${url}')`; if (g === 'avatar') el.textContent = '';
      });
      document.querySelector('[data-profil-kaydet]').addEventListener('click', () => {
        const v = Object.fromEntries(new FormData(f)), ilk = [];
        const kural = {ad: x => x.trim() ? '' : 'Ad zorunludur.', soyad: x => x.trim() ? '' : 'Soyad zorunludur.', kullanici: x => !x.trim() ? 'Kullanıcı adı zorunludur.' : /^[a-z0-9_.]+$/.test(x.trim()) ? '' : 'Kullanıcı adı yalnız küçük harf, rakam, nokta ve alt çizgi taşıyabilir.'};
        for (const [k, fn] of Object.entries(kural)) { const m = fn(v[k] || ''); alanHata(f.querySelector('#f-' + k).closest('.dgu-alan'), m); if (m) ilk.push(f.querySelector('#f-' + k)); }
        const tk = f.querySelector('[data-telefon]'), tm = DG.telefonHata(tk); alanHata(tk, tm); if (tm) ilk.push(tk.querySelector('input[type=tel]'));
        if (ilk.length) { ilk[0].focus(); return; }
        if (!ORNEK) store.set('profil', {ad: v.ad.trim(), soyad: v.soyad.trim(), kullanici: v.kullanici.trim(), eposta: p.eposta, telefon: v.telefon, telefonUlke: v.telefonUlke, uzmanlik: v.uzmanlik, hakkinda: v.hakkinda, guncel: Date.now()});
        DG.bildir('Kaydedildi', {ikon: 'circle-check'});
        if (!ORNEK) setTimeout(() => { location.href = tasi('profil.html'); }, TK.motion.reveal * 2);
      });
    }};
  });

  // ============ H9 · Kaydettiklerim (+ koleksiyonlar; otomatik sonsuz kaydırma + iskelet, karar 7) ============
  DG.sayfa('kaydettiklerim', ctx => {
    const ortak = {tur: 'sekme', nav: 'saved', baslik: 'Kaydettiklerim', menuAktif: 'saved'};
    const bas = n => `<div class="dgu-baslik"><h1 class="t-page">Kaydettiklerim <span class="dgu-ops" data-ozet>${n}</span></h1></div>`;
    if (!ctx.uye) return {...ortak, iskelet: false, html: girisCagri({ikon: I('save'), baslik: 'Kaydettiklerini görmek için giriş yap', metin: 'Beğendiğin tarifleri kaydet, koleksiyonlara ayır; hepsi burada toplanır.',
      sunar: [[I('save'), 'Tek dokunuşla kaydet', 'Tarif kartındaki kaydet düğmesiyle Mutfak Defterine ekle.'], [KOL_IKON, 'Koleksiyonlar', 'Kaydettiklerini klasörlere ayır, adlandır, düzenle.'], [MENU_IKON, 'Menüye ve haftaya taşı', 'Kaydettiklerinden menü kur, haftalık planına ekle.']]})};
    const slugs = ctx.durum === 'bos' ? [] : kayitlar();
    const K = kaynak('koleksiyon', ORN.koleksiyon);
    const bosHal = durum({ikon: I('save'), baslik: 'Henüz tarif kaydetmedin', metin: 'Beğendiğin tarifleri kaydet, burada topla.', eylem: btn('Tariflere göz at', {href: DG.KOK.liste})});
    const html = bas(`${slugs.length} tarif`) + (slugs.length ? `<div class="dgu-ic dgu-yigin"><div data-kol></div><div class="dgu-izgara" data-izgara></div><div data-yukle hidden>${DG.iskelet(2)}</div></div>` : bosHal);
    return {...ortak, html, ustIcerik: bas('Yükleniyor…'), iskelet: DG.iskelet(4), sonra(root) {
      if (!slugs.length) return;
      let aktif = '', gosterilen = 0, liste = slugs, gozlem;
      const izgara = root.querySelector('[data-izgara]'), yukle = root.querySelector('[data-yukle]'), kolEl = root.querySelector('[data-kol]');
      const SAYFA = 6;
      const kolCiz = () => {
        const kol = K.get(), k = kol.find(x => x.id === aktif);
        kolEl.innerHTML = `<div class="dgu-serit" role="group" aria-label="Koleksiyonlar"><button class="dgu-chip" type="button" data-kol-sec="" aria-pressed="${!aktif}">Tümü <span class="dgu-chip-sayi">${slugs.length}</span></button>${kol.map(x => `<button class="dgu-chip" type="button" data-kol-sec="${esc(x.id)}" aria-pressed="${x.id === aktif}">${ic(KOL_IKON)}${esc(x.ad)} <span class="dgu-chip-sayi">${x.tarifler.filter(s => slugs.includes(s)).length}</span></button>`).join('')}<button class="dgu-chip" type="button" data-kol-yeni>${ic(I('add'))}Yeni koleksiyon</button></div>`
          + (k ? `<div class="u-ara pf-kol-bas"><h2 class="t-sub clamp-1">${esc(k.ad)}</h2><span class="u-yatay">${btn('Tarif ekle', {tur: 'metin', ikon: I('add'), attrs: 'data-kol-ekle'})}<button class="dgu-ibtn" type="button" data-kol-diger aria-label="Koleksiyon seçenekleri">${ic(I('more'))}</button></span></div>` : '');
      };
      const parti = () => {
        const yeni = liste.slice(gosterilen, gosterilen + SAYFA); gosterilen += yeni.length;
        izgara.insertAdjacentHTML('beforeend', yeni.map(s => kart(DG.tarif(s))).join(''));
        if (ORNEK) izgara.querySelectorAll('[data-kaydet]').forEach(b => b.setAttribute('aria-pressed', 'true'));
        yukle.hidden = gosterilen >= liste.length;
      };
      const listeCiz = () => {
        const k = K.get().find(x => x.id === aktif);
        liste = k ? k.tarifler.filter(s => slugs.includes(s)) : slugs; gosterilen = 0; izgara.innerHTML = '';
        root.querySelector('[data-kol-bos]')?.remove();
        if (k && !liste.length) { izgara.insertAdjacentHTML('afterend', `<div data-kol-bos>${durum({ikon: 'folder-open', baslik: 'Bu koleksiyon boş', metin: 'Kaydettiğin tariflerden bu koleksiyona ekle.', eylem: btn('Tarif ekle', {ikon: I('add'), attrs: 'data-kol-ekle'})})}</div>`); yukle.hidden = true; return; }
        parti();
      };
      // Otomatik sonsuz kaydırma: iskelet görünür olunca sonraki parti (yapay gecikme yalnız iskeleti göstermek için kısa).
      gozlem = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting) && !yukle.hidden) setTimeout(parti, TK.motion.reveal); }, {rootMargin: '0px 0px 200px 0px'});
      gozlem.observe(yukle);
      kolCiz(); listeCiz();
      root.addEventListener('click', async e => {
        const sec = e.target.closest('[data-kol-sec]');
        if (sec) { aktif = sec.dataset.kolSec; kolCiz(); listeCiz(); return; }
        if (e.target.closest('[data-kol-yeni]')) return adSor({baslik: 'Yeni koleksiyon', etiket: 'Koleksiyon adı', evet: 'Oluştur', mevcut: K.get().map(x => x.ad), tamam: ad => { const x = {id: yeniId(), ad, tarifler: []}; K.set([...K.get(), x]); aktif = x.id; kolCiz(); listeCiz(); DG.bildir('Koleksiyon oluşturuldu'); }});
        const k = K.get().find(x => x.id === aktif);
        if (k && e.target.closest('[data-kol-ekle]')) return tarifSec({baslik: `${k.ad} · tarif ekle`, slugs, secili: k.tarifler, evet: 'Kaydet', tamam: v => { K.set(K.get().map(x => x.id === k.id ? {...x, tarifler: v} : x)); kolCiz(); listeCiz(); DG.bildir('Koleksiyon güncellendi'); }});
        if (k && e.target.closest('[data-kol-diger]')) {
          const d = DG.sheet({baslik: k.ad, govde: `<div class="dgu-satirlar">${satir({ikon: 'pen', baslik: 'Yeniden adlandır', attrs: 'data-k-ad'})}${satir({ikon: I('delete'), baslik: 'Koleksiyonu sil', sinif: 'is-yikici', sag: '', attrs: 'data-k-sil'})}</div>`});
          d.querySelector('[data-k-ad]').onclick = () => { d.kapat(); adSor({baslik: 'Yeniden adlandır', etiket: 'Koleksiyon adı', deger: k.ad, evet: 'Kaydet', mevcut: K.get().filter(x => x.id !== k.id).map(x => x.ad), tamam: ad => { K.set(K.get().map(x => x.id === k.id ? {...x, ad} : x)); kolCiz(); DG.bildir('Koleksiyon adı değişti'); }}); };
          d.querySelector('[data-k-sil]').onclick = async () => {
            d.kapat();
            if (!await DG.onay({baslik: 'Koleksiyon silinsin mi?', metin: 'Koleksiyon kaldırılır; içindeki tarifler Kaydettiklerim’de kalır.', evet: 'Sil'})) return;
            const once = K.get(); K.set(once.filter(x => x.id !== k.id)); aktif = ''; kolCiz(); listeCiz();
            DG.bildir('Koleksiyon silindi', {eylem: {ad: 'Geri al', fn: () => { K.set(once); aktif = k.id; kolCiz(); listeCiz(); }}});
          };
        }
      });
    }};
  });

  // ============ H12 · Alışveriş listesi (P1) — web g-menulerim #alisveris + dm-p5-l.js (çok liste) birebir metinlerle ============
  // “Listem” = dg-alisveris (tarif detayı buraya yazar); diğer listeler dg-alisveris-listeler [{id, ad, kalemler}]. Arşiv/geçmiş (repo) korunur.
  const REYONLAR = [['manav', 'Manav'], ['kasap', 'Kasap & Şarküteri'], ['sut', 'Süt & Kahvaltılık'], ['firin', 'Fırın & Ekmek'], ['bakliyat', 'Bakliyat & Makarna'], ['baharat', 'Baharat & Sos'], ['icecek', 'İçecekler'], ['atistirmalik', 'Atıştırmalık'], ['donuk', 'Donuk Ürünler'], ['bakkal', 'Bakkaliye'], ['temizlik', 'Temizlik & Ev']];
  DG.sayfa('alisveris-listesi', ctx => {
    const baslik = 'Alışveriş listesi';
    if (!ctx.uye) return {tur: 'alt', baslik, html: girisCagri({ikon: I('shoppingList'), baslik: 'Alışveriş listeni görmek için giriş yap', metin: 'Tariflerdeki malzemeleri listene ekle, markette işaretleyerek ilerle.',
      sunar: [[I('addToList'), 'Tariften listeye', 'Tek malzemeyi ya da “Tümünü Listeye Ekle” ile hepsini ekle.'], [I('check'), 'Markette işaretle', 'Reyon reyon düzenli listen; aldıklarını işaretle, bitince temizle.'], ['list-check', 'Birden çok liste', 'Haftalık market, misafir sofrası, kahvaltılık… her liste ayrı.']]})};
    const L = kaynak('alisveris', ORN.liste), G = kaynak('alisveris-gecmis', ORN.gecmis), Y = kaynak('alisveris-listeler', () => []);
    let etkin = 'listem';
    const kalemler = () => etkin === 'listem' ? L.get() : (Y.get().find(x => x.id === etkin)?.kalemler || []);
    const kalemYaz = v => { if (etkin === 'listem') L.set(v); else Y.set(Y.get().map(x => x.id === etkin ? {...x, kalemler: v} : x)); };
    const listeAdi = () => etkin === 'listem' ? 'Listem' : Y.get().find(x => x.id === etkin)?.ad || 'Listem';
    const html = `<div class="dgu-ic dgu-yigin-8"><div class="u-ara"><h1 class="t-page"><span data-liste-ad>Alışveriş listen</span> <span class="dgu-ops" data-say></span></h1><button class="dgu-ibtn" type="button" data-liste-islem aria-label="Liste işlemleri">${ic(I('more'))}</button></div><p class="t-meta c-muted">Reyon reyon düzenli listen — markette işaretle. Bir tarifin malzeme satırındaki sepet ikonu ya da menülerinin "Alışveriş listesi oluştur" düğmesi buraya yazar.</p></div>
      <section class="dgu-ic" aria-label="Alışveriş listelerin" data-listeler></section>
      <div class="dgu-ic"><div class="dgu-kart is-gri" data-ekle><div class="pf-ekle-alanlar">${alan({ad: 'kalem', etiket: 'Kalem adı', yer: 'Kalem ekle — örn. Tahin'})}${alan({ad: 'miktar', etiket: 'Miktar', yer: 'Miktar'})}</div>${DG.secAlan({ad: 'reyon', etiket: 'Reyon', secenekler: REYONLAR, deger: 'manav'})}${btn('Ekle', {ikon: I('add'), attrs: 'data-kalem-ekle', tam: true})}</div></div>
      <div class="dgu-ic dgu-yigin" data-liste></div><div class="dgu-ic" data-ozet-kart></div>`;
    return {tur: 'alt', baslik, html, iskelet: DG.iskelet(5, 'satir'),
      headerEylem: `<button class="dgu-hbtn" type="button" data-paylas aria-label="Paylaş">${ic(I('share'))}</button><button class="dgu-hbtn" type="button" data-gecmis aria-label="Geçmiş listeler">${ic(I('history'))}</button>`,
      bar: btn('Listeyi arşivle', {ikon: 'box-archive', attrs: 'data-arsivle'}), sonra(root) {
      const kutu = root.querySelector('[data-liste]'), bar = document.querySelector('.dgu-bar'), app = document.getElementById('dgu');
      const listelerCiz = () => {
        const tum = [{id: 'listem', ad: 'Listem', kalemler: L.get()}, ...Y.get()];
        root.querySelector('[data-listeler]').innerHTML = `<div class="dgu-serit" role="group" aria-label="Alışveriş listelerin">${tum.map(x => `<button class="dgu-chip" type="button" data-liste-sec="${esc(x.id)}" aria-pressed="${x.id === etkin}">${ic(I('shoppingList'))}${esc(x.ad)} <span class="dgu-chip-sayi">${x.kalemler.length}</span></button>`).join('')}<button class="dgu-chip" type="button" data-yeni-liste>${ic(I('add'))}Yeni liste</button></div>`;
        root.querySelector('[data-liste-ad]').textContent = tum.length > 1 ? listeAdi() : 'Alışveriş listen';
        root.querySelector('[data-liste-islem]').setAttribute('aria-label', `${listeAdi()} — liste işlemleri`);
      };
      const ciz = () => {
        listelerCiz();
        const l = kalemler(), al = l.filter(x => x.isaretli).length, reyonlar = new Set(l.filter(x => x.reyon).map(x => x.reyon));
        root.querySelector('[data-say]').textContent = `${l.length} kalem`;
        bar.hidden = !l.length; app.classList.toggle('has-bar', !!l.length);
        if (!l.length) { kutu.innerHTML = durum({ikon: I('shoppingList'), baslik: 'Listen boş', metin: 'Bir tarifin malzeme satırındaki sepet ikonuna dokun — malzeme reyonuyla birlikte buraya düşer. Menülerinden toplu aktarmak için menü çubuğundaki "Alışveriş listesi oluştur" düğmesini kullan.'}); root.querySelector('[data-ozet-kart]').innerHTML = ''; return; }
        // Gruplar: önce reyonlar (web sırası), sonra reyonu bilinmeyen tarif malzemeleri tarif adıyla.
        const gruplar = [...REYONLAR.filter(([k]) => reyonlar.has(k)).map(([k, ad]) => ({ad, ks: l.filter(x => x.reyon === k)})),
          ...[...new Set(l.filter(x => !x.reyon).map(x => x.tarif || ''))].map(g => ({ad: (g && DG.tarif(g)?.kisa) || 'Elle eklenenler', t: g && DG.tarif(g), ks: l.filter(x => !x.reyon && (x.tarif || '') === g)}))];
        kutu.innerHTML = gruplar.map(g => `<section class="pf-grup-kart" aria-label="${esc(g.ad)}"><div class="u-ara pf-grup-bas"><h2 class="t-sub clamp-1">${esc(g.ad)}</h2>${g.t ? `<a class="dgu-btn dgu-btn--metin dgu-btn--sm" href="${esc(DG.tarifLink(g.t.slug))}">Tarife git</a>` : `<span class="t-meta c-muted">${g.ks.length} kalem</span>`}</div>
          <ul class="dgu-satirlar">${g.ks.map(x => `<li class="pf-kalem${x.isaretli ? ' is-alindi' : ''}"><label class="dgu-secim"><input type="checkbox" data-isaret="${esc(x.id)}" ${x.isaretli ? 'checked' : ''}><span class="pf-kalem-metin"><span class="pf-kalem-ad">${esc(x.ad)}${x.reyon && x.tarif && DG.tarif(x.tarif) ? `<small class="pf-kalem-miktar">${esc(DG.tarif(x.tarif).kisa)}</small>` : ''}</span>${x.miktar ? `<small class="pf-kalem-miktar">${esc(x.miktar)}</small>` : ''}</span></label><button class="dgu-ibtn" type="button" data-sil="${esc(x.id)}" aria-label="${esc(x.ad)} kalemini sil">${ic(I('delete'))}</button></li>`).join('')}</ul></section>`).join('');
        const yuzde = Math.round(al / l.length * 100);
        root.querySelector('[data-ozet-kart]').innerHTML = `<aside class="dgu-kart" aria-label="Liste özeti"><div class="pf-kimlik-satir"><span class="dgu-eylem-ikon">${ic('list-check')}</span><span class="dgu-satir-metin"><b class="t-sub">Liste Özeti</b><small class="t-meta c-muted">${l.length} kalem${reyonlar.size ? ` · ${reyonlar.size} reyon` : ''}</small></span></div>
          <div class="dgu-ozet pf-ozet-2"><div><b class="t-stat">${l.length}</b><small>toplam kalem</small></div><div><b class="t-stat">${al}</b><small>tamamlandı</small></div></div>${DG.ilerleme(al, l.length, {})}<p class="t-meta c-muted">%${yuzde} tamamlandı</p>
          <div class="dgu-yigin-8">${btn('Yazdır / PDF İndir', {tur: 'ikincil', boy: 'sm', ikon: 'print', attrs: 'data-yazdir', tam: true})}${btn('İşaretlileri Temizle', {tur: 'ikincil', boy: 'sm', ikon: I('delete'), attrs: `data-temizle ${al ? '' : 'disabled'}`, tam: true})}</div></aside>`;
      };
      ciz();
      const listeMetni = () => `DadaGastro · Alışveriş Listesi — ${listeAdi()}\n` + kalemler().map(x => `${x.isaretli ? '✓' : '•'} ${x.ad}${x.miktar ? ' — ' + x.miktar : ''}`).join('\n');
      const ekle = () => {
        const a = root.querySelector('#f-kalem'), m = root.querySelector('#f-miktar'), r = root.querySelector('input[name=reyon]').value, v = a.value.trim();
        if (!v) { a.focus(); return; }
        kalemYaz([...kalemler(), {id: yeniId(), ad: v, miktar: m.value.trim(), reyon: r, tarif: '', isaretli: false}]); a.value = ''; m.value = ''; a.focus(); ciz(); DG.bildir('Listeye eklendi');
      };
      root.querySelector('#f-kalem').maxLength = 120;
      root.querySelector('[data-kalem-ekle]').onclick = ekle;
      root.querySelector('[data-ekle]').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('input')) { e.preventDefault(); ekle(); } });
      root.addEventListener('change', e => { const id = e.target.dataset.isaret; if (!id) return; kalemYaz(kalemler().map(x => x.id === id ? {...x, isaretli: e.target.checked} : x)); ciz(); root.querySelector(`[data-isaret="${CSS.escape(id)}"]`)?.focus(); });
      const listeIslem = () => {
        const d = DG.sheet({baslik: listeAdi(), govde: `<div class="dgu-satirlar">${satir({ikon: 'pen', baslik: 'Yeniden adlandır', attrs: 'data-l-ad', sag: ''})}${satir({ikon: I('copy'), baslik: 'Kopyala', attrs: 'data-l-kopya', sag: ''})}${etkin === 'listem' ? '' : satir({ikon: I('delete'), baslik: 'Sil', sinif: 'is-yikici', sag: '', attrs: 'data-l-sil'})}</div>`});
        d.querySelector('[data-l-ad]').onclick = () => { d.kapat(); if (etkin === 'listem') return DG.bildir('Listem varsayılan listedir'); adSor({baslik: 'Listeyi yeniden adlandır', ust: '<p class="dgu-yardim">Yeni adı yaz.</p>', etiket: 'Liste adı', deger: listeAdi(), evet: 'Kaydet', bosMesaj: 'Liste adı boş olamaz.', tamam: ad => { Y.set(Y.get().map(x => x.id === etkin ? {...x, ad} : x)); ciz(); DG.bildir('Liste adı değişti'); }}); };
        d.querySelector('[data-l-kopya]').onclick = () => { d.kapat(); const x = {id: yeniId(), ad: listeAdi() + ' (kopya)', kalemler: kalemler().map(k => ({...k, id: yeniId()}))}; Y.set([...Y.get(), x]); ciz(); DG.bildir(`Liste kopyalandı · ${x.ad} · ${x.kalemler.length} kalem`); };
        d.querySelector('[data-l-sil]')?.addEventListener('click', async () => { d.kapat(); if (!await DG.onay({baslik: 'Liste silinsin mi?', metin: `${listeAdi()} ve içindeki kalemler kaldırılır.`, evet: 'Sil'})) return; const ad = listeAdi(); Y.set(Y.get().filter(x => x.id !== etkin)); etkin = 'listem'; ciz(); DG.bildir(`Liste silindi · ${ad}`); });
      };
      const gecmisAc = () => {
        const g = G.get();
        const govde = g.length ? `<div class="dgu-akordeon">${g.slice().reverse().map(a => `<details><summary><span class="dgu-satir-metin"><span>${esc(a.ad)}</span><small>${a.kalemler.length} kalem · ${tarihYaz(a.tarih)}</small></span>${ic(I('expand'))}</summary><div class="dgu-ak-govde dgu-yigin-12"><ul class="dgu-yigin-8">${a.kalemler.map(k => `<li class="pf-gecmis-kalem${k.isaretli ? ' is-alindi' : ''}">${ic(k.isaretli ? I('check') : 'minus')}<span class="pf-kalem-ad">${esc(k.ad)}</span>${k.miktar ? `<small class="pf-kalem-miktar">${esc(k.miktar)}</small>` : ''}</li>`).join('')}</ul>${btn('Listeye geri ekle', {tur: 'ikincil', boy: 'sm', ikon: I('addToList'), attrs: `data-geri-yukle="${esc(a.id)}"`})}</div></details>`).join('')}</div>`
          : durum({ikon: I('history'), baslik: 'Henüz arşivlenmiş liste yok', metin: 'Alışverişin bitince listeyi arşivle; geçmişte burada durur.'});
        const d = DG.sheet({baslik: 'Geçmiş listeler', govde});
        d.addEventListener('toggle', e => { if (e.target.open) d.querySelectorAll('details[open]').forEach(x => { if (x !== e.target) x.open = false; }); }, true);
        d.addEventListener('click', e => { const b = e.target.closest('[data-geri-yukle]'); if (!b) return; const a = G.get().find(x => x.id === b.dataset.geriYukle); kalemYaz([...kalemler(), ...a.kalemler.map(k => ({...k, id: yeniId(), isaretli: false}))]); d.kapat(); ciz(); DG.bildir(`${a.kalemler.length} kalem listeye eklendi`); });
      };
      document.addEventListener('click', async e => {
        const t = e.target;
        const ls = t.closest('[data-liste-sec]'); if (ls) { etkin = ls.dataset.listeSec; ciz(); return; }
        if (t.closest('[data-liste-islem]')) return listeIslem();
        if (t.closest('[data-yeni-liste]')) return adSor({baslik: 'Yeni liste', ust: '<p class="dgu-yardim">Listene bir ad ver — örneğin “Haftalık Market”.</p>', etiket: 'Liste adı', evet: 'Oluştur', bosMesaj: 'Liste adı boş olamaz.', tamam: ad => { const x = {id: yeniId(), ad, kalemler: []}; Y.set([...Y.get(), x]); etkin = x.id; ciz(); DG.bildir(`Liste oluşturuldu · ${ad}`); }});
        const s = t.closest('[data-sil]');
        if (s) { const once = kalemler(), x = once.find(y => y.id === s.dataset.sil); kalemYaz(once.filter(y => y.id !== x.id)); ciz(); DG.bildir(`${x.ad} silindi`, {eylem: {ad: 'Geri al', fn: () => { kalemYaz(once); ciz(); }}}); return; }
        if (t.closest('[data-gecmis]')) return gecmisAc();
        if (t.closest('[data-yazdir]')) return print();
        if (t.closest('[data-paylas]')) {
          const d = DG.sheet({baslik: 'Paylaş', govde: `<div class="dgu-satirlar">${satir({ikon: I('link'), baslik: 'Listeyi Kopyala', attrs: 'data-p-kopya', sag: ''})}${satir({ikon: 'comment', baslik: 'WhatsApp\'ta Paylaş', href: 'https://wa.me/?text=' + encodeURIComponent(listeMetni()), attrs: 'target="_blank" rel="noopener"', sag: ''})}${satir({ikon: 'file-pdf', baslik: 'PDF olarak kaydet', attrs: 'data-p-pdf', sag: ''})}</div>`});
          d.querySelector('[data-p-kopya]').onclick = async () => { try { await navigator.clipboard.writeText(listeMetni()); DG.bildir('Liste kopyalandı'); } catch { DG.bildir('Kopyalanamadı'); } d.kapat(); };
          d.querySelector('[data-p-pdf]').onclick = () => { d.kapat(); setTimeout(print, TK.motion.sheet); };
          return;
        }
        if (t.closest('[data-temizle]')) {
          const l = kalemler(), n = l.filter(x => x.isaretli).length; if (!n) return;
          if (!await DG.onay({baslik: 'İşaretliler temizlensin mi?', metin: `${n} işaretli kalem listeden kaldırılacak.`, evet: 'Temizle'})) return;
          kalemYaz(l.filter(x => !x.isaretli)); ciz(); DG.bildir('İşaretliler temizlendi', {eylem: {ad: 'Geri al', fn: () => { kalemYaz(l); ciz(); }}});
        }
        if (t.closest('[data-arsivle]')) adSor({baslik: 'Listeyi arşivle', etiket: 'Liste adı', deger: listeAdi(), evet: 'Arşivle', ust: `<p class="dgu-yardim">Liste geçmişe taşınır ve yeni, boş bir liste başlar.</p>`, bosMesaj: 'Liste adı boş olamaz.', tamam: ad => { G.set([...G.get(), {id: yeniId(), ad, tarih: Date.now(), kalemler: kalemler()}]); kalemYaz([]); ciz(); DG.bildir('Liste arşivlendi', {eylem: {ad: 'Geçmiş', fn: gecmisAc}}); }});
      });
    }};
  });

  // ============ H10 · Tariflerim — web Mutfak Defterim “Tariflerim” sekmesi (g-mutfak-defterim.blade.php) ============
  // Satır tarif kartı: ortak DG.kart(t,'row') (kaydet ve yazar satırı yerine durum rozeti + tarih). Durum adları web: Taslak · İncelemede · Yayında · Reddedildi.
  const DURUM_KOD = {onay: 'inceleniyor', incelemede: 'inceleniyor'};
  const reEsc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  DG.sayfa('tariflerim', ctx => {
    const baslik = 'Tariflerim';
    if (!ctx.uye) return {tur: 'alt', baslik, html: girisCagri({ikon: I('recipes'), baslik: 'Tariflerini görmek için giriş yap', metin: 'Yayımladığın, taslakta bekleyen ve incelemedeki bütün tariflerin burada.',
      sunar: [['pen', 'Taslakta bekleyenler', 'Taslak yalnız sana görünür; kaldığın yerden düzenle.'], ['hourglass-half', 'İncelemede bekleyenler', 'Gönderdiğin içerik editör kuyruğuna girer.'], [I('shareRecipe'), 'Yeni tarif', 'Dört kısa adımda tarifini yaz ve editöre gönder.']]})};
    // Üye: örnek üyenin tarifleri (DGORNEK.tariflerim) + bu cihazda yazılan taslaklar; ?ornek=1 yalnız bellek.
    const yerel = kaynak('tariflerim', () => []), gizli = kaynak('tariflerim-gizli', () => []);
    const tumu = () => [...yerel.get().map(t => ({...t, durum: DURUM_KOD[t.durum] || t.durum, kaynak: 'yerel'})), ...ORN.tarifler().filter(t => !gizli.get().includes(t.id))];
    const html = `<div class="dgu-ic dgu-yigin-12"><div class="dgu-yigin-8"><h1 class="t-page">Tariflerin tek listede</h1><p class="t-meta c-muted">Yayımladığın, taslakta bekleyen ve incelemedeki bütün tariflerin burada. Bir tarifin durumu değişince satırı yerinde güncellenir; ikinci bir liste tutulmaz.</p></div><div data-ozet></div></div><div class="dgu-ic dgu-yigin" data-kutu></div>`;
    return {tur: 'alt', baslik, html, headerEylem: `<a class="dgu-hbtn" href="${tasi('tarif-ekle.html')}" aria-label="Yeni Tarif Ekle">${ic(I('add'))}</a>`, iskelet: DG.iskelet(3, 'satir'), sonra(root) {
      let filtre = '', kategori = '';
      const kutu = root.querySelector('[data-kutu]');
      const durumSatir = t => `<div class="pf-durum-satir">${DG.durumRozet(t.durum)}${t.guncel ? `<small class="t-meta c-muted">${tarihYaz(t.guncel)}</small>` : ''}</div>`;
      const satirKart = t => {
        const r = t.slug && DG.tarif(t.slug), href = t.durum === 'yayinda' && r ? DG.tarifLink(r.slug) : tasi(r ? `tarif-ekle.html?duzenle=${encodeURIComponent(r.slug)}` : `tarif-ekle.html?taslak=${encodeURIComponent(t.id)}`);
        let kartH = r ? kart(r, 'row').replace(/<button class="save[\s\S]*?<\/button>/, '').replace(/<div class="dg-author">[\s\S]*?<\/div>/, durumSatir(t)).replace(new RegExp(reEsc(DG.tarifLink(r.slug)), 'g'), esc(href))
          : `<a class="pf-tarif-yerel" href="${esc(href)}">${DG.kucukFoto(t.kapak || '', I('recipes'))}<span class="dgu-satir-metin"><small class="dg-card__category">${esc(t.kategori || 'Kategorisiz')}</small><b class="t-card clamp-2">${esc(t.ad || 'Adsız taslak')}</b>${durumSatir(t)}</span></a>`;
        const ek = t.durum === 'taslak' ? DG.ilerleme(t.adim || 1, 4, {etiket: 'Tamamlanan adım', deger: `${t.adim || 1}/4 adım`})
          : t.durum === 'inceleniyor' ? `<p class="dgu-yardim pf-yardim">${ic('hourglass-half')}<span>İnceleme bitene kadar yayında görünmez. Editör incelemesi ortalama <b>24–48 saat</b> sürer; sonuç bildirimle gelir.</span></p>`
          : t.durum === 'reddedildi' && t.not ? `<p class="dgu-yardim pf-yardim">${ic('circle-xmark')}<span><b>Editör notu:</b> ${esc(t.not)}</span></p>` : '';
        return `<article class="pf-tarif-kart">${kartH}${ek}<div class="dgu-ikili">${btn('Düzenle', {tur: 'ikincil', boy: 'sm', ikon: 'pen', href: tasi(r ? `tarif-ekle.html?duzenle=${encodeURIComponent(r.slug)}` : `tarif-ekle.html?taslak=${encodeURIComponent(t.id)}`)})}${btn('Sil', {tur: 'ikincil', boy: 'sm', ikon: I('delete'), attrs: `data-tsil="${esc(t.id)}" data-kaynak="${t.kaynak}"`})}</div></article>`;
      };
      const ciz = () => {
        const l = tumu().sort((a, b) => (b.guncel || 0) - (a.guncel || 0)), say = k => l.filter(t => t.durum === k).length;
        const yay = l.filter(t => t.durum === 'yayinda').map(t => DG.tarif(t.slug)).filter(Boolean), puanli = yay.filter(t => t.puan);
        const ort = puanli.length ? (puanli.reduce((a, t) => a + t.puan, 0) / puanli.length).toLocaleString('tr', {minimumFractionDigits: 1, maximumFractionDigits: 1}) : null;
        const enOkunan = yay.slice().sort((a, b) => (b.goruntulenme || 0) - (a.goruntulenme || 0))[0], enPuan = puanli.slice().sort((a, b) => b.puan - a.puan || (b.puanSayisi || 0) - (a.puanSayisi || 0))[0];
        root.querySelector('[data-ozet]').innerHTML = `<div class="dgu-serit" role="list" aria-label="Özet">${[[say('yayinda'), 'yayında'], [say('inceleniyor'), 'incelemede'], [say('taslak'), 'taslak'], ...(ort ? [[ort, 'ortalama puan']] : [])].map(([n, m]) => `<span class="dgu-chip pf-sayac-cip" role="listitem"><b>${n}</b> ${m}</span>`).join('')}</div>`
          + (yay.length ? `<p class="t-meta c-muted" data-mt12>Yayındaki ${yay.length} tarifin toplam <b>${DG.sayi(yay.reduce((a, t) => a + (t.goruntulenme || 0), 0))} kez görüntülendi</b>, <b>${DG.sayi(yay.reduce((a, t) => a + (t.puanSayisi || 0), 0))} değerlendirme</b> aldı.${enOkunan ? ` En çok okunan tarifin <b>${esc(enOkunan.kisa)}</b>.` : ''}${enPuan ? ` En yüksek puanlı tarifin <b>${esc(enPuan.kisa)}</b>.` : ''}</p>` : `<p class="t-meta c-muted" data-mt12>Henüz yayında bir tarifin yok.</p>`);
        if (!l.length) { kutu.innerHTML = durum({ikon: 'utensils', baslik: 'Henüz bir tarif yazmadın', metin: 'Yeni Tarif Ekle düğmesiyle ilk tarifini yazabilirsin.', eylem: btn('İlk tarifini yaz', {ikon: I('add'), href: tasi('tarif-ekle.html')})}); return; }
        const kats = [...new Set(l.map(t => t.kategori || 'Kategorisiz'))];
        const gor = l.filter(t => (!filtre || t.durum === filtre) && (!kategori || (t.kategori || 'Kategorisiz') === kategori));
        kutu.innerHTML = seg('Duruma göre', [['', 'Tümü', l.length], ['yayinda', 'Yayında', say('yayinda')], ['inceleniyor', 'İncelemede', say('inceleniyor')], ['taslak', 'Taslak', say('taslak')], ...(say('reddedildi') ? [['reddedildi', 'Reddedildi', say('reddedildi')]] : [])], filtre).replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')
          + (kats.length > 1 ? `<div class="dgu-serit" role="group" aria-label="Kategoriye göre"><button class="dgu-chip" type="button" data-kat="" aria-pressed="${!kategori}">Tümü <span class="dgu-chip-sayi">${l.length}</span></button>${kats.map(k => `<button class="dgu-chip" type="button" data-kat="${esc(k)}" aria-pressed="${k === kategori}">${esc(k)} <span class="dgu-chip-sayi">${l.filter(t => (t.kategori || 'Kategorisiz') === k).length}</span></button>`).join('')}</div>` : '')
          + (gor.length ? `<div class="dgu-yigin">${gor.map(satirKart).join('')}</div><p class="dgu-yardim pf-yardim">${ic(I('info'))}<span>Yayından kaldırdığın bir tarif silinmez; taslaklarına geri düşer ve bağlantısı kapanır.</span></p>`
            : durum({ikon: 'filter-circle-xmark', baslik: 'Bu süzgeçle kayıt yok', metin: 'Arama ya da süzgeç seçimini değiştir.', eylem: btn('Süzgeci temizle', {tur: 'ikincil', attrs: 'data-sifirla'})}));
      };
      ciz();
      root.addEventListener('click', async e => {
        const f = e.target.closest('[data-seg]'); if (f) { filtre = f.dataset.seg; ciz(); return; }
        const k = e.target.closest('[data-kat]'); if (k) { kategori = k.dataset.kat; ciz(); return; }
        if (e.target.closest('[data-sifirla]')) { filtre = ''; kategori = ''; ciz(); return; }
        const s = e.target.closest('[data-tsil]'); if (!s) return;
        const t = tumu().find(x => x.id === s.dataset.tsil);
        if (!await DG.onay({baslik: `${t.ad || 'Taslak'} silinsin mi?`, metin: 'Taslak defterinden kalkar; çöp kutusu yok, kendin geri alamazsın. Yazdığın metin de gider.', evet: 'Sil'})) return;
        const oY = yerel.get(), oG = gizli.get();
        if (s.dataset.kaynak === 'yerel') yerel.set(oY.filter(x => x.id !== t.id)); else gizli.set([...oG, t.id]);
        ciz(); DG.bildir('Tarif silindi', {eylem: {ad: 'Geri al', fn: () => { yerel.set(oY); gizli.set(oG); ciz(); }}});
      });
    }};
  });

  // ============ H11 · Tarif ekle / düzenle — canlı dadagastro.com/tarif-ekle birebir (form, ekle.js, coklu-secim.js metinleri) ============
  const ADIMLAR = [['Bilgi', 'Tarifin adı, kategorisi ve seni bu tarife getiren hikâye.'], ['Görseller', 'İştah açan bir kapak, süreci gösteren birkaç kare ve dilersen bir video.'], ['Künye ve malzemeler', 'Tarif sayfasındaki künye şeridini dolduran bilgiler.'], ['Hazırlanış', 'Her blok tek bir işlemi anlatsın. Bloklar burada hangi sıradaysa tarifte de o sırada çizilir.']];
  const PORSIYON_BIRIM = ['kişilik', 'porsiyon', 'porsiyonluk', 'adet', 'dilim', 'parça', 'kâse', 'bardak', 'fincan', 'çömlek'];
  const MALZ_BIRIM = ['su bardağı', 'çay bardağı', 'yemek kaşığı', 'kahve fincanı', 'tatlı kaşığı', 'çay kaşığı', 'g', 'kg', 'ml', 'l', 'adet', 'paket', 'dilim', 'tutam', 'diş', 'demet'];
  const GORSEL_SINIR = 'JPG, PNG, WebP, AVIF, HEIC/HEIF veya GIF · en çok 10 MB ve 16 MP · WebP olarak saklanır; GIF’in ilk karesi alınır.';
  const VIDEO_RE = /^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/|(player\.)?vimeo\.com\/)\S+$/i;
  // Eski taslak biçimi (tek kategori/mutfak, adım {metin,sure}) yeni biçime taşınır.
  const formuTasi = x => ({gorunurluk: 'herkes', birim: 'kişilik', derece: '', video: '', saklama: '', alerjen: '', ...x,
    kategoriler: x.kategoriler || (x.kategori ? [x.kategori] : []), mutfaklar: x.mutfaklar || (x.mutfak ? [x.mutfak] : []),
    malzemeler: (x.malzemeler || []).filter(m => m.tur === 'grup' || m.ad || m.miktar).map(m => ({birim: '', alternatif: '', ...m})),
    adimlar: (x.adimlar || []).filter(a => a.tur === 'gorsel' || a.metin || a.baslik).map(a => a.tur ? a : {tur: 'adim', baslik: '', sure: a.sure || '', metin: a.metin})});
  DG.sayfa('tarif-ekle', ctx => {
    if (ctx.durum === 'tamam') return {tur: 'alt', baslik: 'Tarif ekle', html: durum({ikon: 'circle-check', baslik: 'Tarifin incelemeye gönderildi', metin: 'Editör ekibi tarifini inceliyor. Sonuç ortalama 24–48 saat içinde bildirimle gelir; bu sürede tarif düzenlenemez.', tam: true,
      eylem: `<p class="t-meta c-muted">Görünürlük seçimin: <b>Herkese açık</b>.</p><div class="dgu-yigin-12 pf-genis">${btn('Yeni tarif ekle', {ikon: I('add'), href: tasi('tarif-ekle.html'), tam: true})}${btn('Mutfak defterime dön', {tur: 'ikincil', href: tasi('tariflerim.html'), tam: true})}</div>`})};
    if (!ctx.uye) return {tur: 'alt', baslik: 'Tarif ekle', html: girisCagri({ikon: I('shareRecipe'), baslik: 'Tarif eklemek için giriş yap', metin: 'Tarifini dört kısa adımda hazırla, taslak olarak sakla ve editör onayına gönder.',
      sunar: [[I('recipes'), 'Bilgi ve görseller', 'Tarif adı, kategori, mutfak, hikâye, kapak ve galeri.'], [I('servings'), 'Künye ve malzemeler', 'Porsiyon, pişirme derecesi; her malzemeye alternatif.'], [I('time'), 'Hazırlanış ve yayın', 'Adım adım anlatım, süre ve görseller; editör incelemesi ortalama 24–48 saat.']]})};
    const tid = ctx.qs.get('taslak'), mevcut = tid && store.get('tariflerim', []).find(x => x.id === tid), dz = DG.tarif(ctx.qs.get('duzenle') || '');
    // ?duzenle=<slug>: gerçek tarif kaydından (DGVERI) açılır; Tavuk Curry'nin adımları canlıdan (ORN.tarifFormu).
    const gercek = t => t.slug === bul('tavuk-curry') ? {...ORN.tarifFormu(), id: t.slug} : {id: t.slug, durum: 'taslak', ad: t.kisa, kategoriler: [t.kategori], mutfaklar: [], aciklama: t.aciklama || '', porsiyon: String(t.porsiyon || ''), birim: t.birim || 'kişilik',
      malzemeler: (t.malzemeler || []).map(m => ({tur: 'malzeme', miktar: String(m.miktar ?? '').replace('.', ','), birim: m.birim || '', ad: m.ad, alternatif: ''})), adimlar: []};
    // ?taslak=tabaktan-<slug>: Tabaktan Tarif taslağı (tabaktan-taslak.html “Düzenle”) bu cihazda yoksa kaynak tariften açılır; kapak = taslak fotoğrafı.
    const tt = !mevcut && /^tabaktan-/.test(tid || '') && DG.tarif(tid.slice(9));
    const F = formuTasi(mevcut ? JSON.parse(JSON.stringify(mevcut)) : tt ? {...gercek(tt), id: tid, kaynak: 'tabaktan', kapak: tt.gorsel} : dz ? gercek(dz) : ORNEK ? ORN.tarifFormu() : {id: yeniId(), durum: 'taslak', ad: '', aciklama: '', porsiyon: ''});
    let adim = Math.min(4, Math.max(1, Number(ctx.qs.get('adim')) || 1)), dirty = false;
    const baslik = mevcut || dz || tt ? 'Tarifi düzenle' : 'Tarif ekle';
    const gorseller = [], adimGorsel = {};   // {url} — kapak = gorseller[0] (yıldız öne alır); adım görseli blok kimliğine bağlı
    if (F.kapak) gorseller.push({url: /^(https?:|blob:|data:)/.test(F.kapak) ? F.kapak : '../' + F.kapak});   // kapak kökten göreli saklanır
    F.adimlar.forEach(a => { a.id = a.id || yeniId(); });
    const ops = (h, m = '(isteğe bağlı)') => h.replace('</label>', ` <span class="dgu-ops">${m}</span></label>`);
    const yardim = (h, ikon) => `<p class="dgu-yardim${ikon ? ' pf-yardim' : ''}">${ikon ? ic(ikon) : ''}<span>${h}</span></p>`;
    const alanEk = (h, ek) => h.replace(/<\/div>$/, ek + '</div>');
    const ibtn = (ikon, aria, attrs) => `<button class="dgu-ibtn" type="button" aria-label="${esc(aria)}" title="${esc(aria)}" ${attrs}>${ic(ikon)}</button>`;
    const sira = (liste, i, n, [y, a, s, sIkon = I('delete')]) => `${ibtn('chevron-up', y, `data-tasi="${liste}" data-i="${i}" data-yon="-1" ${i === 0 ? 'disabled' : ''}`)}${ibtn('chevron-down', a, `data-tasi="${liste}" data-i="${i}" data-yon="1" ${i === n - 1 ? 'disabled' : ''}`)}${ibtn(sIkon, s, `data-cikar="${liste}" data-i="${i}"`)}`;
    const girdi = (liste, i, k, {yer, aria, tur = 'text', ek = ''}) => `<div class="dgu-girdi"><input type="${tur}" ${ek} data-liste="${liste}" data-i="${i}" data-k="${k}" value="${esc(F[liste][i][k] ?? '')}" placeholder="${esc(yer)}" aria-label="${esc(aria)}"></div>`;
    // Çoklu seçim (canlı coklu-secim.js): kategori sıralı, en çok 3 (ilk = ana); mutfak sınırsız. Ortak bileşen istendi (rapor).
    const cokluHtml = (ad, etiket, ops2, {max, sirali, yer, zorunlu}) => { const sec = F[ad];
      const ipucu = sirali ? 'İlk kategori ana kategoridir · ok ile öne al' : 'Birden çok mutfak seçebilirsin';
      return `<div class="dgu-alan" data-coklu="${ad}"><label id="l-${ad}" for="f-${ad}">${esc(etiket)}${zorunlu ? ' *' : ''}</label>${zorunlu ? '' : ''}
        <div class="dgu-girdi dgu-secici"><button type="button" id="f-${ad}" class="dgu-secici-dugme" data-coklu-ac="${ad}" aria-haspopup="dialog" aria-labelledby="l-${ad} f-${ad}"><span class="is-yer">${esc(yer)}</span></button><span class="dgu-secici-ok" aria-hidden="true">${ic(I('search'))}</span></div>
        ${sec.length ? `<ul class="u-yatay pf-coklu" aria-label="${esc(etiket)} seçimleri">${sec.map((v, i) => `<li class="dgu-chip is-on">${sirali && i === 0 ? `<span class="dgu-rozet">Ana</span>` : ''}<span>${esc(v)}</span>${sirali && i ? `<button type="button" class="pf-chip-btn" data-coklu-one="${ad}" data-v="${esc(v)}" aria-label="${esc(v)}, ${i + 1}. kategori. Ana kategori yap">${ic('arrow-up')}</button>` : ''}<button type="button" class="pf-chip-btn" data-coklu-sil="${ad}" data-v="${esc(v)}" aria-label="${esc(v)} — Kaldır">${ic(I('close'))}</button></li>`).join('')}</ul>` : ''}
        <p class="dgu-yardim">${sec.length} seçim${max && sec.length >= max ? ` · En çok ${max}` : ''} · ${ipucu}</p></div>`; };
    const KATEGORILER = V.facetler.find(f => f.key === 'kategori')?.options.map(o => o.label) || V.kategoriler.map(k => k.ad);
    const COKLU = {kategoriler: {etiket: 'Kategori', ops: KATEGORILER, max: 3, sirali: true, yer: 'Kategori ara', zorunlu: true}, mutfaklar: {etiket: 'Mutfak', ops: V.mutfaklar.map(m => m.ad), max: 0, yer: 'Mutfak ara'}};
    const coklu = ad => { const c = COKLU[ad], h = cokluHtml(ad, c.etiket, c.ops, c); return c.zorunlu ? h : ops(h); };
    const malzHtml = () => F.malzemeler.length ? F.malzemeler.map((m, i) => { const n = F.malzemeler.length;
      return m.tur === 'grup'
        ? `<div class="pf-satir-kart is-grup"><div class="pf-sira">${girdi('malzemeler', i, 'ad', {yer: 'Grup adı — örneğin Hamur', aria: 'Malzeme grubu adı'})}<span class="u-yatay pf-sik">${sira('malzemeler', i, n, ['Grubu yukarı taşı', 'Grubu aşağı taşı', 'Grubu kaldır', I('close')])}</span></div></div>`
        : `<div class="pf-satir-kart"><div class="pf-malz">${girdi('malzemeler', i, 'miktar', {yer: 'Miktar', aria: 'Miktar'})}${DG.secAlan({ad: `mbirim-${i}`, etiket: 'Birim', yer: 'Birim', secenekler: MALZ_BIRIM.map(x => [x, x]), deger: m.birim})}</div>${girdi('malzemeler', i, 'ad', {yer: 'Malzeme adı', aria: 'Malzeme adı'})}<div class="pf-sira">${girdi('malzemeler', i, 'alternatif', {yer: 'Alternatifi — boşsa tarifte gösterilmez', aria: 'Malzemenin alternatifi'})}<span class="u-yatay pf-sik">${sira('malzemeler', i, n, ['Malzemeyi yukarı taşı', 'Malzemeyi aşağı taşı', 'Malzeme satırını sil'])}</span></div></div>`; }).join('')
      : `<p class="pf-bos-not"><b>Malzeme listesi boş</b> Aşağıdan ilk satırı ekle. Grupla çalışmak istersen önce grup başlığı ekle.</p>`;
    const adimNo = i => F.adimlar.slice(0, i + 1).filter(a => a.tur === 'adim').length;
    const galeriHtml = () => gorseller.map((g, i) => `<div class="pf-galeri-oge${i === 0 ? ' is-kapak' : ''}" style="background-image:url('${g.url}')"><button class="dgu-ibtn pf-gorsel-btn is-sol" type="button" data-kapak-yap="${i}" aria-pressed="${i === 0}" aria-label="Kapak görseli yap" title="Kapak yap">${ic('star')}</button><button class="dgu-ibtn pf-gorsel-btn" type="button" data-galeri-sil="${i}" aria-label="Görseli kaldır" title="Görseli kaldır">${ic(I('delete'))}</button></div>`).join('');
    const adimHtml = () => F.adimlar.length ? F.adimlar.map((a, i) => { const n = F.adimlar.length, sr = sira('adimlar', i, n, ['Bloğu yukarı taşı', 'Bloğu aşağı taşı', 'Bloğu sil']);
      if (a.tur === 'gorsel') { const no = adimNo(i), g = adimGorsel[a.id];
        return `<div class="pf-satir-kart" data-blok="${a.id}"><div class="u-ara"><span class="t-label c-muted">${no ? `${no}. adımın görseli` : 'Görsel'}</span><span class="u-yatay pf-sik">${sr}</span></div>${no ? '' : `<p class="dgu-hata">${ic(I('error'))}Görselden önce bir hazırlanış adımı ekle</p>`}
          <label class="pf-yukle is-kucuk${g ? ' is-dolu' : ''}" ${g ? `style="background-image:url('${g}')"` : ''}>${ic(GORSEL_IKON)}<b>Tek görsel seç · yeni seçim öncekinin yerini alır</b><small class="t-meta">${GORSEL_SINIR}</small><input type="file" accept="image/*" class="dgu-sr" data-adim-gorsel="${a.id}" aria-label="Blok görseli seç"></label>
          ${girdi('adimlar', i, 'aciklama', {yer: 'Görsel açıklaması (isteğe bağlı)', aria: 'Görsel açıklaması'})}</div>`; }
      return `<div class="pf-satir-kart" data-blok="${a.id}"><div class="u-ara"><span class="t-label c-muted">${adimNo(i)}. adım</span><span class="u-yatay pf-sik">${sr}</span></div>
        <div class="pf-adim-ust"><div class="dgu-alan"><label for="ab-${a.id}">Adım başlığı (isteğe bağlı)</label><div class="dgu-girdi"><input id="ab-${a.id}" type="text" maxlength="500" data-liste="adimlar" data-i="${i}" data-k="baslik" value="${esc(a.baslik)}" placeholder="Adım başlığı (isteğe bağlı)" aria-label="Adım başlığı"></div></div><div class="dgu-alan"><label for="as-${a.id}">Süre (dk)</label><div class="dgu-girdi"><input id="as-${a.id}" type="number" min="0" max="10080" step="1" inputmode="numeric" data-liste="adimlar" data-i="${i}" data-k="sure" value="${esc(a.sure)}" placeholder="dk" aria-label="Adım süresi, dakika (isteğe bağlı)"></div></div></div>
        <div class="dgu-girdi"><textarea data-liste="adimlar" data-i="${i}" data-k="metin" placeholder="Bu hazırlık adımını anlat — ne yapılacağını sırayla yaz." aria-label="Adım açıklaması">${esc(a.metin)}</textarea></div></div>`; }).join('')
      : `<p class="pf-bos-not"><b>Henüz adım yok</b> İlk adımı aşağıdan ekle; istersen aynı adıma görsel de koyabilirsin.</p>`;
    const sayac = (k, n, m) => `<span class="dgu-chip pf-sayac-cip" data-sayac="${k}">${n} ${m}</span>`;
    const s1 = `${alanEk(alan({ad: 'ad', etiket: 'Tarif adı', deger: F.ad, zorunlu: true, yer: 'Örnek: Kayseri Usulü Mantı'}).replace('</label>', ` <span class="dgu-ops" data-ad-sayac>${F.ad.length}/80</span></label>`), yardim('Yöreyi ya da tekniği başlığa taşı: “Fırında”, “Kayseri usulü”, “Pratik” gibi ekler aramada öne çıkarır.'))}
      ${coklu('kategoriler')}${coklu('mutfaklar')}
      ${alanEk(alan({ad: 'aciklama', etiket: 'Açıklama ve hikâye', cok: true, zorunlu: true, deger: F.aciklama, yer: 'Bu tarif sana nereden geliyor? Okuyana neden denemesi gerektiğini anlat.'}), yardim('İlk iki cümle tarif kartında önizleme olarak görünür — en güçlü cümlenle başla.'))}
      ${alanEk(ops(alan({ad: 'saklama', etiket: 'Saklama ve hatırlatma', cok: true, deger: F.saklama, yer: 'Saklama koşulunu veya servis öncesi hatırlanacak bir ayrıntıyı yaz.'})), yardim('Tarif detayındaki hatırlatma kutusunda görünür.'))}
      ${alanEk(ops(alan({ad: 'alerjen', etiket: 'Alerjen notu', cok: true, deger: F.alerjen, yer: 'Örn. Süt, yumurta ve buğday içerir.'})), yardim('Tarif detayında ayrı bir alerjen notu olarak görünür.'))}`;
    const s2 = `<div class="dgu-alan"><span class="dgu-etiket">Kapak görseli ve galeri <span class="dgu-ops">(isteğe bağlı)</span> <span class="dgu-ops" data-gorsel-say>0 görsel</span></span>
        <label class="pf-yukle">${ic(GORSEL_IKON)}<b class="t-sub">Görselleri sürükle ya da seçmek için tıkla</b><small class="t-meta">JPG, PNG, WebP, AVIF, HEIC/HEIF veya GIF · kapak en az 800px genişlik · en çok 10 MB ve 16 MP · WebP olarak saklanır; GIF’in ilk karesi alınır.</small><input type="file" accept=".jpg,.jpeg,.png,.webp,.avif,.heic,.heif,.gif,image/*" multiple class="dgu-sr" data-dosya="galeri"></label>
        <div class="pf-galeri" data-galeri></div>${yardim('Yıldıza basarak kapak görselini değiştirebilirsin. Bulanık ya da karanlık görseller incelemede elenir.')}</div>
      ${alanEk(ops(alan({ad: 'video', etiket: 'Tarif videosu', tur: 'url', deger: F.video, yer: 'https://www.youtube.com/watch?v=…', ikon: 'video'})), yardim('Tek YouTube veya Vimeo HTTPS bağlantısı (en çok 2000 karakter). Yeni bağlantı öncekinin yerini alır. Dosya yüklenmez; video süresi ve dosya boyutu sağlayıcının sınırlarına bağlıdır.'))}`;
    const s3 = `<div class="pf-ikili-alan">${alan({ad: 'porsiyon', etiket: `Porsiyon (${F.birim})`, tur: 'number', deger: F.porsiyon, zorunlu: true, yer: '4'})}${DG.secAlan({ad: 'birim', etiket: 'Porsiyon birimi', secenekler: PORSIYON_BIRIM.map(x => [x, x]), deger: F.birim})}</div>
      ${ops(alan({ad: 'derece', etiket: 'Pişirme derecesi (°C)', tur: 'number', deger: F.derece, yer: '180', ikon: 'temperature-half'}))}
      ${yardim('Süre, hazırlanış adımlarına yazdığın sürelerin toplamıdır; zorluk da bu toplama göre belirlenir.', 'lightbulb')}
      <section class="dgu-yigin-12"><div class="u-ara"><h2 class="t-sub">${ic(I('servings'))} Malzemeler</h2>${sayac('malzeme', 0, 'malzeme')}</div><p class="t-meta c-muted">Kullanım sırasına göre yaz. “Hamur”, “İç harç” gibi gruplara ayırabilir, her malzemeye bir alternatif verebilirsin.</p>
        <div class="dgu-yigin-12" data-malzemeler>${malzHtml()}</div>
        <div class="u-yatay">${btn('Satır ekle', {tur: 'ikincil', boy: 'sm', ikon: I('add'), attrs: 'data-m-ekle'})}${btn('Grup ekle', {tur: 'metin', boy: 'sm', ikon: 'layer-group', attrs: 'data-g-ekle'})}</div>
        <p class="dgu-yardim pf-yardim">${ic(I('substitute'))}<span>“Alternatifi” alanına yazdığın karşılık, tarif sayfasında o malzemenin yanındaki <b>ikame düğmesinde</b> görünür. Boş bıraktığın malzemelerde düğme hiç çıkmaz — <b data-alt-say>0</b> malzemeye alternatif yazdın.</span></p></section>`;
    const s4 = `<section class="dgu-yigin-12"><div class="u-ara"><h2 class="t-sub">${ic('list-ol')} Hazırlanış adımları</h2>${sayac('blok', 0, 'blok')}</div>
        <div class="dgu-yigin-12" data-adimlar>${adimHtml()}</div>
        <div class="u-yatay">${btn('Adım ekle', {tur: 'ikincil', boy: 'sm', ikon: I('add'), attrs: 'data-a-ekle'})}${btn('Adım görseli ekle', {tur: 'metin', boy: 'sm', ikon: GORSEL_IKON, attrs: 'data-ag-ekle'})}</div></section>`;
    const yayin = `<section class="dgu-kart pf-yayin" aria-labelledby="yayin-b"><div class="u-ara"><h2 class="t-sub" id="yayin-b">${ic('paper-plane')} Yayın</h2><span class="dgu-rozet">Herkese açık</span></div>
        <fieldset class="dgu-alan pf-fieldset"><legend class="dgu-etiket">Görünürlük</legend>${DG.secim('gorunurluk', '<span class="dgu-satir-metin"><span>Herkese açık</span><small>Tarifler listesinde ve aramada herkes görebilir.</small></span>', {tur: 'radio', deger: 'herkes', secili: true})}</fieldset>
        <p class="dgu-yardim pf-yardim" role="status">${ic('globe')}<span>Herkese açık yayımlanır. Yayına alındığında arama sonuçlarında ve listelerde herkes görebilir.</span></p>
        <div class="u-yatay">${sayac('gorsel', 0, 'görsel')}${sayac('malzeme', 0, 'malzeme')}${sayac('adim', 0, 'adım')}${sayac('kategori', 0, 'kategori')}${sayac('mutfak', 0, 'mutfak')}<span class="dgu-chip pf-sayac-cip" data-sayac="video">video yok</span></div>
        <p class="dgu-hata" data-ozet role="alert" hidden></p>
        <div class="dgu-yigin-8">${btn('Taslağı önizle', {tur: 'ikincil', ikon: I('views'), attrs: 'data-onizle', tam: true})}${btn('Onaya gönder', {ikon: 'paper-plane', attrs: 'data-gonder', tam: true})}${btn('Taslak kaydet', {tur: 'ikincil', ikon: 'floppy-disk', attrs: 'data-taslak', tam: true})}</div>
        <p class="t-meta c-muted" data-oto role="status" hidden></p><p class="t-meta c-muted">Editör incelemesi ortalama 24–48 saat sürer; sonuç bildirimle gelir.</p></section>
      <section class="dgu-kart is-gri"><div class="dgu-yigin-8"><h3 class="t-sub">${ic(I('tips'))} İyi tarif yazmanın sırları</h3><small class="t-meta c-muted">Editör ekibinden</small></div>
        <ul class="dgu-yigin-8 pf-sirlar">${[['Başlık net olsun.', '“Mantı” yerine “Kayseri usulü mantı” — yöre ve teknik güven verir.'], ['Hikâyeni kısa tut.', 'İki üç cümle yeter; ilk cümle iştah açsın.'], ['Miktarları standart ölçüyle ver.', '“Biraz” yerine “1 çay kaşığı”.'], ['Alternatif yaz.', 'Bulunması zor bir malzemeye karşılık verirsen tarif çok daha fazla denenir.']].map(([b, m]) => `<li>${ic(I('check'))}<span><b>${b}</b> ${m}</span></li>`).join('')}</ul>
        <p class="dgu-yardim pf-yardim">${ic('copyright')}<span>Gönderdiğin tarif ve görseller kendi çalışman olmalı. Başkasına ait içerikler incelemede elenir.</span></p></section>`;
    const html = `<div class="dgu-ic dgu-yigin-8"><h1 class="t-page">${baslik}</h1><p class="t-meta c-muted">Tarifini dört kısa adımda hazırla. Adımlar arasında ileri geri gidebilirsin; alttaki yayın kartı hangi adımda olursan ol yerinde durur.</p>
        <ol class="pf-adimlar" data-gosterge aria-label="Adımlar">${ADIMLAR.map(([a], k) => `<li class="${k + 1 <= adim ? 'is-on' : ''}" ${k + 1 === adim ? 'aria-current="step"' : ''}><button type="button" data-adim-git="${k + 1}"><span>${k + 1}</span><b>${a.replace(' ve ', ' ve<br>')}</b></button></li>`).join('')}</ol></div>
      <form class="dgu-ic" novalidate data-form>${[s1, s2, s3, s4].map((s, i) => `<section class="dgu-yigin" data-adim="${i + 1}" ${i + 1 === adim ? '' : 'hidden'}><div class="dgu-yigin-8"><p class="t-label c-muted">Adım ${i + 1} / 4</p><p class="t-meta c-muted">${ADIMLAR[i][1]}</p></div>${s}</section>`).join('')}</form>
      <div class="dgu-ic dgu-yigin">${yayin}</div>`;
    return {tur: 'alt', baslik, html, iskelet: false, headerEylem: `<button class="dgu-hbtn" type="button" data-taslak aria-label="Taslak kaydet">${ic('floppy-disk')}</button>`,
      bar: `${btn('Önceki adım', {tur: 'ikincil', ikon: 'chevron-left', attrs: `data-onceki ${adim === 1 ? 'hidden' : ''}`})}${btn(adim === 4 ? 'Onaya gönder' : 'Sonraki adım', {attrs: 'data-sonraki'})}`, sonra(root) {
      const f = root.querySelector('[data-form]');
      const ad = f.querySelector('#f-ad'); ad.maxLength = 80;
      f.querySelector('#f-saklama').maxLength = 5000; f.querySelector('#f-alerjen').maxLength = 5000; f.querySelector('#f-video').maxLength = 2000;
      const pr = f.querySelector('#f-porsiyon'); pr.min = '1'; pr.setAttribute('inputmode', 'numeric'); f.querySelector('#f-derece').min = '0';
      const oto = root.querySelector('[data-oto]'), ozet = root.querySelector('[data-ozet]');
      const sayacYaz = () => {
        const ys = (k, v) => root.querySelectorAll(`[data-sayac="${k}"]`).forEach(e => { e.textContent = v; });
        const nm = F.malzemeler.filter(m => m.tur !== 'grup' && m.ad.trim()).length;
        ys('gorsel', `${gorseller.length + Object.keys(adimGorsel).length} görsel`); ys('malzeme', `${nm} malzeme`); ys('adim', `${F.adimlar.filter(a => a.tur === 'adim').length} adım`); ys('blok', `${F.adimlar.length} blok`);
        ys('kategori', `${F.kategoriler.length} kategori`); ys('mutfak', `${F.mutfaklar.length} mutfak`); ys('video', `video ${F.video.trim() ? 'var' : 'yok'}`);
        root.querySelector('[data-alt-say]').textContent = F.malzemeler.filter(m => m.tur !== 'grup' && m.alternatif.trim()).length;
        root.querySelector('[data-gorsel-say]').textContent = `${gorseller.length} görsel`;
      };
      const goster = n => {
        adim = n;
        root.querySelectorAll('[data-adim]').forEach(s => { s.hidden = +s.dataset.adim !== n; });
        root.querySelectorAll('[data-gosterge] li').forEach((li, k) => { li.classList.toggle('is-on', k < n); if (k + 1 === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
        document.querySelector('[data-onceki]').hidden = n === 1;
        document.querySelector('[data-sonraki] span').textContent = n === 4 ? 'Onaya gönder' : 'Sonraki adım';
        const u = new URL(location.href); u.searchParams.set('adim', n); history.replaceState(null, '', u);
        scrollTo({top: 0, behavior: motion.matches ? 'auto' : 'smooth'});
      };
      const grup = k => root.querySelector(`[data-coklu="${k}"]`);
      const zorunlu = (k, msg) => { const el = f.querySelector('#f-' + k), b = !String(F[k] ?? '').trim(); alanHata(el.closest('.dgu-alan'), b ? msg : ''); return b ? el : null; };
      const dogrula = n => {
        const h = [];
        if (n === 1) { h.push(zorunlu('ad', 'Tarif adı zorunlu — tarifine bir isim ver.')); const k = !F.kategoriler.length; alanHata(grup('kategoriler'), k ? 'Bir kategori seç — tarifin doğru rafta görünsün.' : ''); if (k) h.push(f.querySelector('#f-kategoriler')); h.push(zorunlu('aciklama', 'Kısa bir hikâye yaz — tarif kartının önizlemesi buradan çıkar.')); }
        if (n === 2) { const v = F.video.trim(), kot = v && !VIDEO_RE.test(v); alanHata(f.querySelector('#f-video').closest('.dgu-alan'), kot ? 'Bağlantıyı tanıyamadım. YouTube ya da Vimeo adresi yapıştır.' : ''); if (kot) h.push(f.querySelector('#f-video')); }
        if (n === 3) { const b = !(Number(F.porsiyon) >= 1); alanHata(f.querySelector('#f-porsiyon').closest('.dgu-alan'), b ? 'Tarifin kaç birim çıktığını yaz.' : ''); if (b) h.push(f.querySelector('#f-porsiyon')); }
        if (n === 4) { const i = F.adimlar.findIndex((a, j) => a.tur === 'gorsel' && !adimNo(j)); if (i >= 0) h.push(root.querySelector(`[data-blok="${F.adimlar[i].id}"] input[type=file]`)); }
        return h.filter(Boolean);
      };
      const kaydet = (d = F.durum === 'reddedildi' ? 'reddedildi' : 'taslak') => {
        dirty = false; if (ORNEK) return;
        const l = store.get('tariflerim', []), x = {...F, kapak: /^blob:/.test(gorseller[0]?.url || '') ? F.kapak || '' : (gorseller[0]?.url || '').replace(/^\.\.\//, ''), kategori: F.kategoriler[0] || '', durum: d, adim, guncel: Date.now()};
        store.set('tariflerim', l.some(t => t.id === F.id) ? l.map(t => t.id === F.id ? x : t) : [x, ...l]);
      };
      const taslakKaydet = sessiz => { kaydet(); oto.hidden = false; oto.textContent = `Taslak hesabına kaydedildi · ${saat()}`; if (!sessiz) DG.bildir('Taslak kaydedildi', {eylem: {ad: 'Tariflerim', href: tasi('tariflerim.html')}}); };
      setInterval(() => { if (dirty) taslakKaydet(true); }, 35000);
      const geriIste = async () => { if (dirty && !await DG.onay({baslik: 'Değişiklikler kaydedilmesin mi?', metin: 'Kaydetmediğin değişiklikler silinir.', evet: 'Değişiklikleri at', hayir: 'Düzenlemeye dön'})) return; dirty = false; DG.geri(); };
      addEventListener('click', e => { if (!dirty || !e.target.closest?.('.dgu-header [data-geri]')) return; e.preventDefault(); e.stopImmediatePropagation(); geriIste(); }, true);
      addEventListener('beforeunload', e => { if (dirty) e.preventDefault(); });
      const yenile = liste => { root.querySelector(liste === 'malzemeler' ? '[data-malzemeler]' : '[data-adimlar]').innerHTML = liste === 'malzemeler' ? malzHtml() : adimHtml(); dirty = true; sayacYaz(); };
      const cokluYenile = k => { grup(k).outerHTML = coklu(k); dirty = true; sayacYaz(); };
      const galeriCiz = () => { root.querySelector('[data-galeri]').innerHTML = galeriHtml(); sayacYaz(); };
      if (gorseller.length) galeriCiz();   // taslaktan gelen kapak (Tabaktan Tarif)
      f.addEventListener('input', e => {
        const el = e.target; dirty = true;
        if (el.dataset.liste) F[el.dataset.liste][+el.dataset.i][el.dataset.k] = el.value;
        else if (el.name && el.name in F) F[el.name] = el.value;
        if (el.name === 'ad') root.querySelector('[data-ad-sayac]').textContent = `${el.value.length}/80`;
        const a = el.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) alanHata(a, '');
        sayacYaz();
      });
      f.addEventListener('change', e => {
        const el = e.target;
        if (el.type === 'hidden') { const m = el.name.match(/^mbirim-(\d+)$/); if (m) F.malzemeler[+m[1]].birim = el.value; else if (el.name in F) F[el.name] = el.value; if (el.name === 'birim') f.querySelector('label[for="f-porsiyon"]').firstChild.textContent = `Porsiyon (${el.value})`; dirty = true; return; }
        const fs = [...(el.files || [])]; if (!fs.length) return;
        if (el.dataset.dosya === 'galeri') { const yer = 11 - gorseller.length; if (fs.length > yer) DG.bildir('Bir kapak ve en fazla 10 galeri görseli ekleyebilirsin. Fazla görselleri kaldırıp yeniden dene.'); fs.slice(0, yer).forEach(x => gorseller.push({url: URL.createObjectURL(x)})); galeriCiz(); }
        if (el.dataset.adimGorsel) { adimGorsel[el.dataset.adimGorsel] = URL.createObjectURL(fs[0]); yenile('adimlar'); }
        el.value = ''; dirty = true;
      });
      root.addEventListener('click', e => {
        const t = e.target;
        const ag = t.closest('[data-adim-git]'); if (ag) { const n = +ag.dataset.adimGit; if (n > adim) { for (let k = adim; k < n; k++) { const h = dogrula(k); if (h.length) { goster(k); h[0].focus(); return; } } } goster(n); return; }
        const ca = t.closest('[data-coklu-ac]');
        if (ca) { const k = ca.dataset.cokluAc, c = COKLU[k];
          const d = DG.sheet({baslik: c.etiket, govde: `<div class="dgu-yigin"><div class="dgu-girdi">${ic(I('search'))}<input type="search" data-coklu-ara placeholder="${esc(c.yer)}" aria-label="${esc(c.yer)}"></div><p class="dgu-yardim" data-coklu-durum></p><div class="dgu-satirlar" role="group" aria-label="${esc(c.etiket)}">${c.ops.map(o => `<label class="dgu-secim" data-ara-metin="${esc(o.toLocaleLowerCase('tr'))}"><input type="checkbox" value="${esc(o)}" ${F[k].includes(o) ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div><p class="dgu-yardim" data-coklu-yok hidden>Bulunamadı</p></div>`, ayak: btn('Tamam', {attrs: 'data-kapat', tam: true})});
          const durumYaz = () => { const n = F[k].length, dolu = c.max && n >= c.max; d.querySelector('[data-coklu-durum]').textContent = `${n} seçim${dolu ? ` · En çok ${c.max}` : ''}`; d.querySelectorAll('input[type=checkbox]').forEach(i => { i.disabled = dolu && !i.checked; }); };
          durumYaz();
          d.addEventListener('change', ev => { const i = ev.target; if (i.type !== 'checkbox') return; F[k] = i.checked ? [...F[k], i.value] : F[k].filter(v => v !== i.value); durumYaz(); cokluYenile(k); });
          d.querySelector('[data-coklu-ara]').addEventListener('input', ev => { const q = ev.target.value.trim().toLocaleLowerCase('tr'); let say = 0; d.querySelectorAll('[data-ara-metin]').forEach(l => { l.hidden = !!q && !l.dataset.araMetin.includes(q); if (!l.hidden) say++; }); d.querySelector('[data-coklu-yok]').hidden = say > 0; });
          return; }
        const cs = t.closest('[data-coklu-sil]'); if (cs) { const k = cs.dataset.cokluSil; F[k] = F[k].filter(v => v !== cs.dataset.v); cokluYenile(k); grup(k).querySelector('[data-coklu-ac]').focus(); return; }
        const co = t.closest('[data-coklu-one]'); if (co) { const k = co.dataset.cokluOne; F[k] = [co.dataset.v, ...F[k].filter(v => v !== co.dataset.v)]; cokluYenile(k); return; }
        if (t.closest('[data-m-ekle]')) { F.malzemeler.push({tur: 'malzeme', miktar: '', birim: '', ad: '', alternatif: ''}); yenile('malzemeler'); const m = root.querySelectorAll('[data-liste=malzemeler][data-k=miktar]'); m[m.length - 1]?.focus(); return; }
        if (t.closest('[data-g-ekle]')) { F.malzemeler.push({tur: 'grup', ad: ''}); yenile('malzemeler'); const g = root.querySelectorAll('.is-grup input'); g[g.length - 1]?.focus(); return; }
        if (t.closest('[data-a-ekle]')) { F.adimlar.push({id: yeniId(), tur: 'adim', baslik: '', sure: '', metin: ''}); yenile('adimlar'); const a = root.querySelectorAll('[data-liste=adimlar][data-k=metin]'); a[a.length - 1]?.focus(); return; }
        if (t.closest('[data-ag-ekle]')) { if (!F.adimlar.some(a => a.tur === 'adim')) return DG.bildir('Görselden önce bir hazırlanış adımı ekle. Görsel kendinden önceki adıma bağlanır.'); F.adimlar.push({id: yeniId(), tur: 'gorsel', aciklama: ''}); yenile('adimlar'); return; }
        const ts = t.closest('[data-tasi]');
        if (ts) { const l = F[ts.dataset.tasi], i = +ts.dataset.i, j = i + +ts.dataset.yon; [l[i], l[j]] = [l[j], l[i]]; yenile(ts.dataset.tasi); root.querySelector(`[data-tasi="${ts.dataset.tasi}"][data-i="${j}"][data-yon="${ts.dataset.yon}"]:not([disabled])`)?.focus(); return; }
        const c = t.closest('[data-cikar]');
        if (c) { const k = c.dataset.cikar, once = F[k].slice(); F[k].splice(+c.dataset.i, 1); yenile(k); DG.bildir(k === 'adimlar' ? 'Blok silindi' : 'Satır silindi', {eylem: {ad: 'Geri al', fn: () => { F[k] = once; yenile(k); }}}); return; }
        const ky = t.closest('[data-kapak-yap]'); if (ky) { const [g] = gorseller.splice(+ky.dataset.kapakYap, 1); gorseller.unshift(g); galeriCiz(); return; }
        const gs = t.closest('[data-galeri-sil]'); if (gs) { gorseller.splice(+gs.dataset.galeriSil, 1); galeriCiz(); return; }
      });
      const onizle = () => {
        const dk = F.adimlar.reduce((a, b) => a + (Number(b.sure) || 0), 0), oz = (ikon, d, e2) => `<div>${ic(ikon)}<b class="t-stat">${esc(d)}</b><small>${esc(e2)}</small></div>`;
        DG.sheet({baslik: 'Taslağı önizle', govde: `<div class="dgu-yigin">${gorseller[0] ? `<div class="pf-onizle-kapak" style="background-image:url('${gorseller[0].url}')"></div>` : ''}<div class="dgu-yigin-8"><p class="t-label c-deep">${esc(F.kategoriler[0] || 'Kategori seçilmedi')}</p><h3 class="t-section">${esc(F.ad || 'Başlığın burada görünecek')}</h3></div>
          <div class="dgu-kart is-gri"><div class="dgu-ozet">${oz(I('time'), dk || '—', 'dk')}${oz(I('servings'), F.porsiyon || '—', F.birim)}${oz('temperature-half', F.derece || '—', '°C')}</div></div>${F.aciklama ? `<p>${esc(F.aciklama)}</p>` : ''}
          <h4 class="t-sub">Malzemeler</h4><ul class="dgu-satirlar">${F.malzemeler.filter(m => m.ad.trim()).map(m => m.tur === 'grup' ? `<li class="pf-onizle-grup t-label c-muted">${esc(m.ad)}</li>` : `<li class="pf-onizle-malz"><b>${esc([m.miktar, m.birim].filter(Boolean).join(' '))}</b><span>${esc(m.ad)}${m.alternatif ? `<small class="t-meta c-muted">Alternatifi: ${esc(m.alternatif)}</small>` : ''}</span></li>`).join('') || '<li class="t-meta c-muted">İçerik yok</li>'}</ul>
          <h4 class="t-sub">Hazırlanış</h4><ol class="dgu-yigin-12">${F.adimlar.filter(a => a.tur === 'adim' && (a.metin.trim() || a.baslik.trim())).map((a, i) => `<li class="pf-onizle-adim"><span class="pf-basamak">${i + 1}</span><span>${a.baslik ? `<b>${esc(a.baslik)}</b>` : ''}${esc(a.metin)}${a.sure ? `<small class="t-meta c-muted">${ic(I('time'))} ${esc(a.sure)} dk</small>` : ''}</span></li>`).join('') || '<li class="t-meta c-muted">İçerik yok</li>'}</ol>
          ${F.saklama ? `<div class="dgu-bilgi"><p class="t-label">${ic(I('reminder'))}Hatırlatma</p><p class="t-meta">${esc(F.saklama)}</p></div>` : ''}${F.alerjen ? `<div class="dgu-bilgi"><p class="t-label">${ic(I('allergen'))}Alerjen</p><p class="t-meta">${esc(F.alerjen)}</p></div>` : ''}</div>`});
      };
      const gonder = () => {
        const hepsi = [1, 2, 3, 4].flatMap(n => dogrula(n).map(el => [n, el]));
        if (hepsi.length) { ozet.hidden = false; ozet.innerHTML = ic(I('error')) + `${hepsi.length} zorunlu alan boş. Kırmızı işaretli alanları doldur, sonra yeniden gönder.`; goster(hepsi[0][0]); setTimeout(() => hepsi[0][1].focus(), TK.motion.base); return; }
        ozet.hidden = true; kaydet('onay'); location.href = tasi('tarif-ekle.html?durum=tamam');
      };
      document.addEventListener('click', e => {
        if (e.target.closest('[data-taslak]')) return taslakKaydet(false);
        if (e.target.closest('[data-onizle]')) return onizle();
        if (e.target.closest('[data-gonder]')) return gonder();
        if (e.target.closest('[data-onceki]')) return goster(adim - 1);
        if (!e.target.closest('[data-sonraki]')) return;
        if (adim < 4) { const h = dogrula(adim); if (h.length) { h[0].focus(); return; } goster(adim + 1); return; }
        gonder();
      });
      sayacYaz();
    }};
  });

  // ============ H14 · Menülerim + N3 · Menü düzenle (?menu=) + H15 · Haftalık Menü (Pro) ============
  const GUNLER = [['Pzt', 'Pazartesi'], ['Sal', 'Salı'], ['Çar', 'Çarşamba'], ['Per', 'Perşembe'], ['Cum', 'Cuma'], ['Cmt', 'Cumartesi'], ['Paz', 'Pazar']];
  const OGUNLER = [['kahvalti', 'Kahvaltı'], ['ara1', 'Ara öğün'], ['ogle', 'Öğle'], ['ara2', 'Ara öğün'], ['aksam', 'Akşam']];
  const menuBilgi = m => { const ts = m.tarifler.map(DG.tarif).filter(Boolean); return `${ts.length} kap · toplam ${ts.reduce((a, t) => a + (t.dakika || 0), 0)} dk`; };
  DG.sayfa('menulerim', ctx => {
    const baslik = 'Menülerim';
    if (!ctx.uye) return {tur: 'alt', baslik, html: girisCagri({ikon: MENU_IKON, baslik: 'Menüyü açmak için giriş yap', metin: 'Tariflerden menü kur, haftanı planla ve menünü tek dokunuşla pişir.',
      sunar: [[MENU_IKON, 'Menülerin', 'Kaplarını seç, menünü düzenle, malzemeleri listene ekle.'], [I('madeIt'), 'Menüyü pişir', 'Bütün kapları tek akışta sırayla pişir.'], [HAFTA_IKON, 'Haftalık Menü · Pro', '7 gün × öğünler; haftanın alışveriş listesi tek dokunuşta.']]})};
    const M = kaynak('menuler', ORN.menuler);
    const kayitliVeTum = (haric = []) => { const k = kayitlar(); return [...k, ...V.tarifler.map(t => t.slug).filter(s => !k.includes(s))].filter(s => !haric.includes(s)); };

    // --- Menü detayı / düzenle (N3) ---
    const mid = ctx.qs.get('menu');
    if (mid) {
      const m = M.get().find(x => x.id === mid);
      if (!m) return {tur: 'alt', baslik: 'Menü', html: durum({ikon: MENU_IKON, baslik: 'Menü bulunamadı', metin: 'Bu menü silinmiş olabilir.', tam: true, eylem: btn('Menülerime dön', {href: tasi('menulerim.html')})})};
      return {tur: 'alt', baslik: m.ad, headerEylem: `<button class="dgu-hbtn" type="button" data-menu-diger aria-label="Menü seçenekleri">${ic(I('more'))}</button>`,
        html: `<div class="dgu-baslik"><h1 class="t-page" data-menu-ad>${esc(m.ad)}</h1><p data-menu-bilgi>${menuBilgi(m)}</p></div><div class="dgu-ic dgu-yigin"><div class="dgu-yigin" data-kaplar></div>${btn('Kap ekle', {tur: 'ikincil', ikon: I('add'), tam: true, attrs: 'data-kap-ekle'})}${btn('Alışveriş listesi oluştur', {tur: 'ikincil', ikon: I('addToList'), tam: true, attrs: 'data-menu-liste'})}</div>`,
        bar: `${btn('Menüyü pişir', {ikon: I('madeIt'), href: tasi(`menuyu-pisir.html?menu=${encodeURIComponent(m.id)}`)})}`, sonra(root) {
        const al = () => M.get().find(x => x.id === mid), yaz = fn => M.set(M.get().map(x => x.id === mid ? fn(x) : x));
        const ciz = () => { const x = al(); root.querySelector('[data-menu-bilgi]').textContent = menuBilgi(x); root.querySelector('[data-kaplar]').innerHTML = x.tarifler.map(DG.tarif).filter(Boolean).map(t => `<div class="pf-kap">${kart(t, 'row')}<button class="dgu-ibtn" type="button" data-kap-cikar="${esc(t.slug)}" aria-label="${esc(t.kisa)} menüden çıkar">${ic(I('close'))}</button></div>`).join(''); };
        ciz();
        document.addEventListener('click', async e => {
          const c = e.target.closest('[data-kap-cikar]');
          if (c) { const x = al(); if (x.tarifler.length <= 1) return DG.bildir('Menüde en az bir kap kalmalı.'); const once = x.tarifler; yaz(y => ({...y, tarifler: y.tarifler.filter(s => s !== c.dataset.kapCikar)})); ciz(); DG.bildir('Kap menüden çıkarıldı', {eylem: {ad: 'Geri al', fn: () => { yaz(y => ({...y, tarifler: once})); ciz(); }}}); return; }
          if (e.target.closest('[data-kap-ekle]')) return tarifSec({baslik: 'Kap ekle', slugs: kayitliVeTum(al().tarifler), ust: `<p class="dgu-yardim">Önce kaydettiklerin, sonra bütün tarifler.</p>`, tamam: v => { if (!v.length) { DG.bildir('Bir tarif seç'); return false; } yaz(y => ({...y, tarifler: [...y.tarifler, ...v]})); ciz(); DG.bildir(`${v.length} kap eklendi`); }});
          if (e.target.closest('[data-menu-liste]')) { if (!ORNEK) al().tarifler.forEach(DG.tumunuListeyeEkle); return DG.bildir('Malzemeler alışveriş listene eklendi', {eylem: {ad: 'Listeyi gör', href: tasi('alisveris-listesi.html')}}); }
          if (e.target.closest('[data-menu-diger]')) {
            const d = DG.sheet({baslik: al().ad, govde: `<div class="dgu-satirlar">${satir({ikon: 'pen', baslik: 'Yeniden adlandır', attrs: 'data-m-ad'})}${satir({ikon: I('delete'), baslik: 'Menüyü sil', sinif: 'is-yikici', sag: '', attrs: 'data-m-sil'})}</div>`});
            d.querySelector('[data-m-ad]').onclick = () => { d.kapat(); adSor({baslik: 'Yeniden adlandır', etiket: 'Menü adı', sinir: 48, deger: al().ad, evet: 'Kaydet', mevcut: M.get().filter(x => x.id !== mid).map(x => x.ad), tamam: ad => { yaz(y => ({...y, ad})); root.querySelector('[data-menu-ad]').textContent = ad; document.querySelector('.dgu-htitle').textContent = ad; document.title = ad + ' · DadaGastro'; DG.bildir('Menü adı değişti'); }}); };
            d.querySelector('[data-m-sil]').onclick = async () => { d.kapat(); if (!await DG.onay({baslik: 'Menü silinsin mi?', metin: 'Menü kaldırılır; tarifler silinmez.', evet: 'Sil'})) return; M.set(M.get().filter(x => x.id !== mid)); DG.bildir('Menü silindi'); setTimeout(() => { location.href = tasi('menulerim.html'); }, TK.motion.reveal); };
          }
        });
      }};
    }

    // --- Liste + Haftalık Menü sekmesi ---
    const sek = ctx.qs.get('sekme') === 'haftalik' ? 'haftalik' : 'menuler';
    const W = kaynak('haftalik', ORN.hafta, {});
    const html = `<div class="dgu-baslik"><h1 class="t-page">${baslik}</h1></div><div class="dgu-ic dgu-yigin">${seg('Menü sekmeleri', [['menuler', 'Menülerim'], ['haftalik', 'Haftalık Menü']], sek)}<div data-panel="menuler" ${sek === 'menuler' ? '' : 'hidden'}></div><div data-panel="haftalik" ${sek === 'haftalik' ? '' : 'hidden'}></div></div>`;
    return {tur: 'alt', baslik, html, iskelet: DG.iskelet(3, 'satir'), sonra(root) {
      const pM = root.querySelector('[data-panel=menuler]'), pW = root.querySelector('[data-panel=haftalik]');
      let gun = (new Date().getDay() + 6) % 7;
      const menuCiz = () => {
        const l = M.get();
        pM.innerHTML = `<div class="u-ara"><p class="t-meta c-muted">${l.length} menü</p>${btn('Yeni menü', {tur: 'tonlu', boy: 'sm', ikon: I('add'), attrs: 'data-yeni-menu'})}</div>`
          + (l.length ? `<div class="dgu-yigin-12" data-mt12>${l.map(m => { const t = DG.tarif(m.tarifler[0]); return `<a class="dgu-kart pf-menu" href="${esc(tasi(`menulerim.html?menu=${encodeURIComponent(m.id)}`))}">${t ? kucukFoto(t) : DG.kucukFoto('', MENU_IKON)}<span class="dgu-satir-metin"><b class="t-card clamp-1">${esc(m.ad)}</b><small>${menuBilgi(m)}</small></span>${ic(I('rowNext'))}</a>`; }).join('')}</div>`
            : durum({ikon: MENU_IKON, baslik: 'Henüz menün yok', metin: 'Tariflerden bir menü kur; alışveriş listene ekle ve tek dokunuşla pişirmeye başla.', eylem: btn('Yeni menü', {ikon: I('add'), attrs: 'data-yeni-menu'})}));
      };
      const haftaCiz = () => {
        const w = W.get(), g = w[gun] || {}, kilit = !ctx.pro;
        const hucre = ([k, ad]) => { const t = g[k] && DG.tarif(g[k]);
          return `<div class="pf-hucre"><span class="pf-hucre-ad t-meta">${ad}</span>${t ? `<a class="pf-hucre-tarif" href="${esc(DG.tarifLink(t.slug))}">${kucukFoto(t)}<span class="clamp-2">${esc(t.kisa)}</span></a>${kilit ? '<span></span>' : `<button class="dgu-ibtn" type="button" data-hucre-sil="${k}" aria-label="${ad} öğününden kaldır">${ic(I('close'))}</button>`}`
            : `<button class="pf-hucre-bos" type="button" data-hucre-ekle="${k}" ${kilit ? 'aria-disabled="true"' : ''} aria-label="${GUNLER[gun][1]} ${ad} için tarif ekle">${ic(kilit ? 'lock' : I('add'))}<span>${kilit ? 'Pro ile planla' : 'Tarif ekle'}</span></button><span></span>`}</div>`; };
        pW.innerHTML = (kilit ? `<div class="dgu-bilgi"><p class="t-label">${ic(I('pro'))}Pro</p><p class="t-meta">Haftalık menü planlayıcı Pro üyeliğinle açılır. Şimdilik yalnız görüntüleyebilirsin.</p>${btn('Pro’yu incele', {tur: 'tonlu', boy: 'sm', ikon: I('pro'), attrs: 'data-pro-kapi', tam: true})}</div>` : '')
          + `<div class="dgu-yigin-12" data-mt>${seg('Gün', GUNLER.map(([k], i) => [String(i), k]), String(gun)).replace('data-seg=', 'data-gun=').replaceAll('data-seg=', 'data-gun=')}<h2 class="t-sub">${GUNLER[gun][1]}</h2><div class="dgu-satirlar">${OGUNLER.map(hucre).join('')}</div>
            <div class="dgu-ikili">${btn('Otomatik oluştur', {tur: 'ikincil', boy: 'sm', attrs: 'data-oto-olustur'})}${btn('Listeye ekle', {tur: 'ikincil', boy: 'sm', attrs: 'data-hafta-liste'})}</div>
            <p class="dgu-yardim">Hücreye kaydettiğin tariflerden seçersin. Günlük kalori toplamı, tariflerde besin verisi olduğunda gösterilir.</p></div>`;
      };
      menuCiz(); haftaCiz();
      root.addEventListener('click', async e => {
        const s = e.target.closest('[data-seg]');
        if (s) { root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); root.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== s.dataset.seg; }); const u = new URL(location.href); if (s.dataset.seg === 'haftalik') u.searchParams.set('sekme', 'haftalik'); else u.searchParams.delete('sekme'); history.replaceState(null, '', u); return; }
        const gb = e.target.closest('[data-gun]'); if (gb) { gun = +gb.dataset.gun; haftaCiz(); pW.querySelector(`[data-gun="${gun}"]`)?.focus(); return; }
        if (e.target.closest('[data-yeni-menu]')) {
          const k = kayitlar();
          return adSor({baslik: 'Yeni menü', etiket: 'Menü adı', sinir: 48, evet: 'Devam', mevcut: M.get().map(x => x.ad), tamam: ad => {
            setTimeout(() => tarifSec({baslik: `${ad} · kap seç`, slugs: kayitliVeTum(), ust: `<p class="dgu-yardim">${k.length ? 'Önce kaydettiklerin, sonra bütün tarifler.' : 'Menüye en az bir kap ekle.'}</p>`, evet: 'Menüyü oluştur', tamam: v => { if (!v.length) { DG.bildir('Menüye en az bir kap ekle.'); return false; } const x = {id: yeniId(), ad, tarifler: v}; M.set([...M.get(), x]); menuCiz(); DG.bildir('Menü oluşturuldu', {eylem: {ad: 'Aç', href: tasi(`menulerim.html?menu=${x.id}`)}}); }}), TK.motion.sheet);
          }});
        }
        // Haftalık: Pro değilse salt okunur + Pro kapısı.
        const pro = e.target.closest('[data-hucre-ekle],[data-hucre-sil],[data-oto-olustur],[data-hafta-liste]');
        if (!pro) return;
        if (!ctx.pro) return DG.proKapi();
        const w = W.get(), g = {...(w[gun] || {})}, yaz = () => { W.set({...W.get(), [gun]: g}); haftaCiz(); };
        if (pro.dataset.hucreSil) { delete g[pro.dataset.hucreSil]; yaz(); return DG.bildir('Öğünden kaldırıldı'); }
        if (pro.dataset.hucreEkle) { const k = pro.dataset.hucreEkle, ad = OGUNLER.find(o => o[0] === k)[1];
          return tarifSec({baslik: `${GUNLER[gun][1]} · ${ad}`, slugs: kayitlar(), tek: true, evet: 'Ekle', bos: durum({ikon: I('save'), baslik: 'Önce tarif kaydet', metin: 'Haftalık menü hücrelerine kaydettiğin tariflerden eklersin.', eylem: btn('Tariflere göz at', {href: DG.KOK.liste})}), tamam: v => { if (!v[0]) { DG.bildir('Bir tarif seç'); return false; } g[k] = v[0]; yaz(); DG.bildir('Öğüne eklendi'); }}); }
        if (pro.hasAttribute('data-oto-olustur')) {
          const havuz = kat => V.tarifler.filter(t => kat(t.kategori)).map(t => t.slug), sec = (l, n) => l[(gun * 5 + n) % l.length];
          const kah = havuz(k => /Kahvalt|Yumurta/.test(k)), tat = havuz(k => /Tatlı|Kek/.test(k)), ana = havuz(k => !/Kahvalt|Yumurta|Tatlı|Kek|Bebek/.test(k));
          let n = 0; for (const [k] of OGUNLER) if (!g[k]) { g[k] = sec(k === 'kahvalti' ? kah : k.startsWith('ara') ? tat : ana, n++); }
          yaz(); return DG.bildir('Boş öğünler tariflerle dolduruldu');
        }
        if (pro.hasAttribute('data-hafta-liste')) { const sl = [...new Set(Object.values(W.get()).flatMap(x => Object.values(x || {})))].filter(DG.tarif); if (!sl.length) return DG.bildir('Haftada henüz tarif yok'); if (!ORNEK) sl.forEach(DG.tumunuListeyeEkle); DG.bildir('Haftanın malzemeleri listene eklendi', {eylem: {ad: 'Listeyi gör', href: tasi('alisveris-listesi.html')}}); }
      });
    }};
  });

  // ============ H13 · Rozetlerim — web g-rozetlerim.blade.php birebir (Koleksiyon · Kademem · Puan Defteri · Liderlik) ============
  // Veri: DGROZET (8 kademe, 9 aile, 50 rozet, web metinleri) + DGORNEK (kazanılan, ilerleme, puan, kademe, ölçüler). Bileşen: DG.rozet / rozetSheet / ilerleme / seg / durumRozet.
  DG.sayfa('rozetlerim', ctx => {
    const baslik = 'Rozetlerim', RZ = window.DGROZET || {kademeler: [], aileler: [], rozetler: []};
    if (!ctx.uye) return {tur: 'alt', baslik, html: girisCagri({ikon: I('badge'), baslik: 'Rozetlerini görmek için giriş yap', metin: 'Kazandığın rozetler, topladığın puan, mutfak merdivenindeki kademen ve liderlik tablosundaki sıran.',
      sunar: [['stairs', 'Sekiz kademe', `${RZ.kademeler[0]?.ad || ''}’ndan ${RZ.kademeler[RZ.kademeler.length - 1]?.ad || ''}’e; puan ve mutfak günüyle yükselir.`], [I('badge'), `${RZ.rozetler.length} rozet, ${RZ.aileler.length} aile`, RZ.aileler.slice(0, 3).map(a => a.ad).join(', ') + ' ve dahası.'], ['ranking-star', 'Puan Defteri ve Liderlik', 'Ne zaman ne kazandın, çevrende kim var.']]})};
    const O = OR.olcu || {}, kaz = new Map(OR.kazanilan || []), ilr = OR.ilerleme || {}, puan = OR.puan ?? 0, kd = OR.kademe || RZ.kademeler[0], sn = OR.sonraki;
    const durumu = r => ({kazanildi: kaz.has(r.slug), tarih: kaz.get(r.slug), ilerleme: ilr[r.slug]});
    const aileAd = k => RZ.aileler.find(a => a.kod === k)?.ad || '';
    const aileOzet = RZ.aileler.map(a => { const rs = RZ.rozetler.filter(r => r.aile === a.kod); return {...a, rs, k: rs.filter(r => kaz.has(r.slug)).length, t: rs.length, kp: rs.filter(r => kaz.has(r.slug)).reduce((x, r) => x + r.puan, 0), tavan: rs.reduce((x, r) => x + r.puan, 0)}; });
    const nK = kaz.size, nT = RZ.rozetler.length, yolda = RZ.rozetler.filter(r => !kaz.has(r.slug) && ilr[r.slug]).length, tavan = RZ.rozetler.reduce((x, r) => x + r.puan, 0);
    const sek = ['koleksiyon', 'kademe', 'puan', 'liderlik'].includes(ctx.qs.get('sekme')) ? ctx.qs.get('sekme') : 'koleksiyon';
    const bolumBas = (ust, ikon, h, lead) => `<div class="dgu-yigin-8"><p class="t-label c-muted pf-ust">${ic(ikon)}${ust}</p><h2 class="t-section">${h}</h2>${lead ? `<p class="t-meta c-muted">${lead}</p>` : ''}</div>`;
    const tutuldu = puan >= kd.puan && (O.mutfakGunu || 0) >= kd.gun;
    const ozetCumle = `${esc(kd.ad)} kademesi <b>${DG.sayi(kd.puan)} puan</b> ve <b>${kd.gun} mutfak günü</b> istiyor; ${tutuldu ? 'ikisini de geçtin' : 'henüz ikisini de karşılamıyorsun'}.${sn ? ` Sıradaki kademe <b>${esc(sn.ad)}</b>: ${DG.sayi(sn.puan)} puan ve ${sn.gun} mutfak günü — ${DG.sayi(Math.max(0, sn.puan - puan))} puan ve ${Math.max(0, sn.gun - (O.mutfakGunu || 0))} gün kaldı.` : ' Merdivenin son basamağındasın.'}`;
    // Üst özet: kazanılan/toplam, kademe, sonraki kademeye iki ölçüt (puan VE mutfak günü)
    const ust = `<section class="dgu-ic"><div class="dgu-kart pf-rz-ozet"><div class="pf-kimlik-satir"><span class="dgu-eylem-ikon pf-rz-kademe">${ic(kd.ikon || 'medal')}</span><span class="dgu-satir-metin"><b class="t-sub">${esc(kd.ad)}</b><small>${kd.sira}. kademe · ${nK}/${nT} rozet</small></span></div>
      ${sn ? `${DG.ilerleme(puan, sn.puan, {etiket: `${sn.ad} için puan`, deger: `${DG.sayi(puan)} / ${DG.sayi(sn.puan)}`})}${DG.ilerleme(O.mutfakGunu || 0, sn.gun, {etiket: `${sn.ad} için mutfak günü`, deger: `${O.mutfakGunu || 0} / ${sn.gun}`})}` : ''}<p class="t-meta c-muted">${ozetCumle}</p></div></section>`;
    // Koleksiyon
    const izgara = rs => `<ul class="dgu-rozet-izgara">${rs.map(r => `<li>${DG.rozet(r, durumu(r))}</li>`).join('')}</ul>`;
    const koleksiyon = `<section class="dgu-yigin">${bolumBas('Kazandıkların', 'medal', 'Rozet koleksiyonun', 'Her rozet tek bir ölçülebilir kayıttan doğar: yayına aldığın tarif, paylaştığın püf noktası, tamamladığın menü, mutfağa girdiğin gün. <b>Kazandığın rozet geri alınmaz.</b>')}
      <div class="dgu-serit" role="list" aria-label="Koleksiyon özeti">${[['circle-check', nK, 'kazanıldı'], ['hourglass-half', yolda, 'yolda'], ['circle-minus', nT - nK - yolda, 'ölçü bekliyor'], ['coins', DG.sayi(puan), 'puan']].map(([i, n, m]) => `<span class="dgu-chip pf-sayac-cip" role="listitem">${ic(i)}<b>${n}</b> ${m}</span>`).join('')}</div>
      <p class="t-meta c-muted">Sayılar mutfak defterinden okundu: <b>${O.yayindakiTarif ?? 0}</b> yayındaki tarif, <b>${O.pufNoktasi ?? 0}</b> püf noktası, <b>${O.mutfakGunu ?? 0}</b> mutfak günü, <b>${DG.sayi(O.dakika)} dk</b> kayıtlı pişirme süresi.${nT - nK - yolda ? ` <b>${nT - nK - yolda}</b> rozetin ölçüsü henüz tanımlı değil; kazandıkça bu sayı düşer.` : ''}</p>
      ${bolumBas('Süzgeç', 'filter', 'Aileye ve kademeye göre', 'Bir aileyi seç ya da Kademem sekmesinden bir kademeye dokun; galeri ona süzülür.')}
      <div class="dgu-serit" role="group" aria-label="Aileye git" data-aileler></div><div data-galeri></div></section>`;
    // Kademem
    const sira = RZ.kademeler.findIndex(k => k.kod === kd.kod);
    const kademe = `<section class="dgu-yigin">${bolumBas('Kademen', 'ranking-star', 'Merdivende neredesin?', 'Kademe iki ölçütle atlanır: <b>puan</b> ve <b>mutfak günü</b>. Puan hızlı toplanır, gün toplanmaz — bu yüzden kademe "çok rozet açtım" ile değil, sürdürmekle yükselir. <b>Kademe satın alınmaz, kazanılır</b>; Pro paketin ayrı bir şeydir ve yanında durur.')}
      <div class="dgu-kart is-gri"><div class="u-ara"><b class="t-sub">${ic(kd.ikon || 'medal')} ${esc(kd.ad)}</b>${DG.durumRozet('aktif', {ad: `${nK} rozet`, ikon: 'medal'})}</div><b class="t-page">${kd.sira}. kademe</b><p class="t-meta c-muted">${ozetCumle}</p><div class="u-yatay">${[['Toplam puan', DG.sayi(puan)], ['Mutfak günü', O.mutfakGunu ?? 0], ['En uzun seri', `${O.enUzunSeri ?? 0} gün`]].map(([m, n]) => `<span class="dgu-chip pf-sayac-cip">${m}: <b>${n}</b></span>`).join('')}</div></div>
      ${bolumBas('Sekiz kademe', 'stairs', `${esc(RZ.kademeler[0]?.ad)}'ndan ${esc(RZ.kademeler[RZ.kademeler.length - 1]?.ad)}'e`, 'Her kademenin bir puan eşiği ve bir mutfak günü barajı var; ikisini birlikte geçtiğin en yüksek kademedesin. Bir kademeye dokun — orada açılan rozetleri koleksiyonda süzülmüş gör.')}
      <ol class="pf-merdiven" aria-label="Mutfak yolculuğu basamakları">${RZ.kademeler.map((k, i) => { const d = i < sira ? 'tamam' : i === sira ? 'simdiki' : 'kilitli', rs = RZ.rozetler.filter(r => r.kademe === k.ad);
        return `<li><button type="button" class="pf-basamak-dugme is-${d}" data-basamak="${esc(k.ad)}" ${i === sira ? 'aria-current="step"' : ''}><span class="dgu-eylem-ikon">${ic(k.ikon || 'medal')}</span><span class="dgu-satir-metin"><b>${esc(k.ad)}</b><small>${DG.sayi(k.puan)} puan · ${k.gun} gün · ${rs.filter(r => kaz.has(r.slug)).length} / ${rs.length} rozet</small></span>${ic(d === 'tamam' ? 'check' : d === 'simdiki' ? 'location-dot' : 'lock')}</button></li>`; }).join('')}</ol>
      ${bolumBas('Ölçüler', 'ruler', 'Kademeyi besleyen sayılar', 'Aşağıdaki her sayı mutfak defterinden ve topluluk kayıtlarından okundu.')}
      <div class="dgu-izgara">${[['calendar-check', 'Mutfak günü', O.mutfakGunu, 'kademenin ikinci ölçütü'], ['fire', 'En uzun seri', O.enUzunSeri, 'gün üst üste'], ['clock', 'Toplam pişirme süresi', `${DG.sayi(O.dakika)} dk`, 'kayıtlı tarif süresi'], ['shuffle', 'Farklı kategori', O.kategori, 'on dört kategoriden'], ['book-open', 'Yayındaki tarif', O.yayindakiTarif, 'incelemeden geçip yayına çıkan'], [I('tips'), 'Püf noktası', O.pufNoktasi, 'paylaştığın mutfak sırrı'], ['trophy', 'Tamamlanan menü', O.tamamlananMenu, 'sonuna kadar götürdüğün menü'], ['heart', 'Toplam beğeni', O.begeni, 'tariflerine ve püf noktalarına']].map(([i, m, n, a]) => `<div class="dgu-kart is-gri pf-olcu-kart"><span class="t-meta c-muted">${ic(i)} ${m}</span><b class="t-stat">${typeof n === 'number' ? DG.sayi(n) : esc(n)}</b><small class="t-label">${a}</small></div>`).join('')}</div></section>`;
    // Puan Defteri
    const defter = [...kaz].sort((a, b) => b[1].localeCompare(a[1])), rozetBy = s => RZ.rozetler.find(r => r.slug === s);
    const puanP = `<section class="dgu-yigin">${bolumBas('Puan', 'coins', 'Puanın nereden geliyor?', 'Puan ayrı bir sayaç değil: kazandığın rozetlerin puanlarının toplamı. Bir rozeti kazandığın an puanın artar, başka hiçbir yoldan değişmez.')}
      <div class="dgu-kart is-gri"><div class="u-ara"><b class="t-sub">${ic('coins')} Toplam puanın</b>${DG.durumRozet('aktif', {ad: `${nK} rozet`, ikon: 'medal'})}</div><b class="t-page">${DG.sayi(puan)}</b><p class="t-meta c-muted">Elli rozetin ${nK}'i sende. Kalan ${nT - nK} rozeti kazandıkça puanın burada birikir.</p><div class="u-yatay"><span class="dgu-chip pf-sayac-cip">Kademe: <b>${esc(kd.ad)}</b></span><span class="dgu-chip pf-sayac-cip">Açık puan: <b>${DG.sayi(tavan - puan)}</b></span></div></div>
      ${bolumBas('Ailelere göre', 'layer-group', 'Hangi aileden ne kadar', `Her ailenin kendi puan tavanı var; çubuk o ailenin ne kadarını topladığını gösterir. Dokuz ailenin tamamı ${DG.sayi(tavan)} puan eder.`)}
      <div class="dgu-yigin-12">${aileOzet.map(a => `<div class="dgu-kart pf-aile-puan">${DG.ilerleme(a.kp, a.tavan, {etiket: a.ad, deger: `${DG.sayi(a.kp)} puan`})}<small class="t-meta c-muted">${a.k} / ${a.t} rozet · ailenin tamamı ${DG.sayi(a.tavan)} puan</small></div>`).join('')}</div>
      ${bolumBas('Kazanım defteri', 'clock-rotate-left', 'Ne zaman ne kazandın', `En yeni üstte. Tarih, rozetin mühürlendiği andır. Toplam ${nK} kazanımının en yeni ${Math.min(12, nK)} tanesi burada.`)}
      <ul class="dgu-satirlar" aria-label="Kazanım defteri">${defter.slice(0, 12).map(([s, t]) => { const r = rozetBy(s); return `<li class="pf-defter"><span class="dgu-satir-metin"><b>${esc(r.ad)}</b><small>${esc(tarihYaz(t))} · ${esc(aileAd(r.aile))}</small></span><b class="t-sub c-deep">+${r.puan}</b></li>`; }).join('')}</ul></section>`;
    // Liderlik: rozet puanı sıralaması sunucuda; uydurma puan yok. Çevren gerçek tarif sayılarıyla (DGVERI.sefler) + senin satırın (DGORNEK).
    const ben = {ad: OR.uye?.adSoyad || adSoyad(), kullanici: OR.uye?.kullanici, tarif: OR.sayac?.tarif || 0, ben: true};
    const tablo = [...V.sefler.filter(s => s.tarif), ben].sort((a, b) => b.tarif - a.tarif || (a.ben ? 1 : 0) - (b.ben ? 1 : 0)), bi = tablo.indexOf(ben), cevre = tablo.slice(Math.max(0, bi - 5), bi + 3);
    const liderlik = `<section class="dgu-yigin">${bolumBas('Liderlik', 'ranking-star', 'Tek tablo, herkes aynı yerde', `Rozetlerinin profilinde görünüp görünmeyeceğine <a class="c-deep" href="ayarlar.html?bolum=gizlilik">Hesap Ayarları</a>'ndan sen karar verirsin.`)}
      <p class="dgu-yardim pf-yardim">${ic(I('info'))}<span><b>Tablo topluluğun tamamını değil, çevreni gösterir:</b> senin üstünde beş, altında iki sıra. Tam sıralamayı <a class="c-deep" href="sefler.html">Şefler dizininden</a>, sezon kapanışlarını <a class="c-deep" href="onur-listesi.html">Onur Listesi'nden</a> görürsün.</span></p>
      <div class="u-ara"><h3 class="t-sub">Yayındaki tarif sayısına göre</h3><span class="t-meta c-muted">sayı = tarif</span></div>
      <ol class="dgu-satirlar" aria-label="Liderlik çevren">${cevre.map(s => { const n = tablo.indexOf(s) + 1; return `<li class="pf-sira-satir${s.ben ? ' is-ben' : ''}" ${s.ben ? 'aria-current="true"' : ''}><span class="pf-sira-no">${n}</span>${avatar(s.ad, 40)}<span class="dgu-satir-metin"><b>${esc(s.ad)}${s.ben ? ` ${DG.durumRozet('aktif', {ad: 'Sen', ikon: 'user'})}` : ''}</b><small>${s.kullanici ? '@' + esc(s.kullanici) : ''}${s.ben ? ` · ${nK} rozet · ${DG.sayi(puan)} puan` : s.unvan ? ` · ${esc(s.unvan)}` : ''}</small></span><span class="pf-sira-sayi"><b>${DG.sayi(s.tarif)}</b><small>tarif</small></span></li>`; }).join('')}</ol></section>`;
    const html = `<div class="dgu-ic dgu-yigin-8"><h1 class="t-page">${baslik}</h1><p class="t-meta c-muted">Kazandığın rozetler, topladığın puan, mutfak merdivenindeki kademen ve liderlik tablosundaki sıran.</p></div>${ust}
      <div class="dgu-ic dgu-yigin">${seg('Rozetlerim bölümleri', [['koleksiyon', 'Koleksiyon'], ['kademe', 'Kademem'], ['puan', 'Puan Defteri'], ['liderlik', 'Liderlik']], sek).replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')}
      ${[['koleksiyon', koleksiyon], ['kademe', kademe], ['puan', puanP], ['liderlik', liderlik]].map(([k, h]) => `<div role="tabpanel" data-panel="${k}" ${k === sek ? '' : 'hidden'} ${k === 'liderlik' ? 'id="topluluk"' : ''}>${h}</div>`).join('')}</div>`;
    return {tur: 'alt', baslik, html, sonra(root) {
      let kademeSuz = '';
      // Akordiyon: her aile bir bölüm (web sırası); varsayılan açık = bitmemiş aileler içinde tamamlanmaya en yakın, yoksa ilki.
      // Aile seçimi = bölüm başlığı (ayrı aile çipi yok); ?aile=<kod> o bölümü açar. Kademe basamağı (Kademem) galeriyi o kademenin rozetlerine süzer.
      const galeriCiz = (acikKod) => {
        const gruplar = aileOzet.map(a => ({...a, rs: a.rs.filter(r => !kademeSuz || r.kademe === kademeSuz)})).filter(a => a.rs.length);
        const say = a => a.rs.filter(r => kaz.has(r.slug)).length;
        const aday = gruplar.map((a, i) => [i, say(a) / a.rs.length]).filter(([, o]) => o < 1).sort((x, y) => y[1] - x[1])[0];
        const acik = acikKod ? Math.max(0, gruplar.findIndex(a => a.kod === acikKod)) : aday ? aday[0] : 0;
        root.querySelector('[data-aileler]').innerHTML = `${kademeSuz ? `<button class="dgu-chip is-on" type="button" data-kademe-temizle aria-label="${esc(kademeSuz)} süzgecini temizle">${ic('stairs')}${esc(kademeSuz)} ${ic(I('close'))}</button>` : ''}`;
        root.querySelector('[data-aileler]').hidden = !kademeSuz;
        root.querySelector('[data-galeri]').innerHTML = gruplar.length ? DG.akordiyon(gruplar.map(a => ({id: 'aile-' + a.kod, ikon: a.ikon, baslik: a.ad, alt: a.olcu, ilerleme: [say(a), a.rs.length], icerik: izgara(a.rs)})), {ad: 'rozet-ak', acik})
          : durum({ikon: 'filter-circle-xmark', baslik: 'Bu süzgeçle rozet yok', metin: 'Başka bir kademe seç.', eylem: btn('Süzgeci temizle', {tur: 'ikincil', attrs: 'data-kademe-temizle'})});
      };
      const aileAc = kod => { const b = root.querySelector(`#aile-${kod}`); if (!b) return; const d = b.querySelector('.dgu-bolum-bas'); if (d.getAttribute('aria-expanded') !== 'true') d.click(); setTimeout(() => b.scrollIntoView({block: 'start', behavior: motion.matches ? 'auto' : 'smooth'}), motion.matches ? 0 : TK.motion.base); };
      const sekmeAc = k => { root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b.dataset.seg === k)); root.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== k; }); const u = new URL(location.href); u.searchParams.set('sekme', k); history.replaceState(null, '', u); };
      galeriCiz(ctx.qs.get('aile') || '');
      root.addEventListener('click', e => {
        const s = e.target.closest('[data-seg]'); if (s) { sekmeAc(s.dataset.seg); s.scrollIntoView({block: 'nearest', inline: 'nearest'}); return; }
        const a = e.target.closest('[data-aile-git]'); if (a) { aileAc(a.dataset.aileGit); return; }
        if (e.target.closest('[data-kademe-temizle]')) { kademeSuz = ''; galeriCiz(); return; }
        const b = e.target.closest('[data-basamak]'); if (b) { kademeSuz = b.dataset.basamak; galeriCiz(); sekmeAc('koleksiyon'); root.querySelector('[data-aileler]').scrollIntoView({block: 'center'}); return; }
        const r = e.target.closest('[data-rozet]'); if (r) { const x = rozetBy(r.dataset.rozet); if (x) DG.rozetSheet(x, durumu(x)); }
      });
      if (location.hash === '#topluluk') { sekmeAc('liderlik'); requestAnimationFrame(() => root.querySelector('#topluluk').scrollIntoView()); }
    }};
  });

  // ============ H16 · Pro ve Üyeliğim (paywall; ödeme akışı YOK; canlı /pro metinleri) ============
  const ORTAK_OZ = ['Reklamsız deneyim', 'Pro içerik ve tarifler', 'Haftalık menü planlayıcı', 'Video mutfağı — sınırsız erişim', 'Mutfağa Giriş — orta/ileri seviye dersler', 'Mutfağa Giriş — kişisel öğrenme rotası', 'Yapay zekâ destekli kişiselleştirme'];
  const PLANLAR = [
    {ad: 'Ücretsiz', aciklama: 'Hesap aç, topluluğa katıl — temel erişim herkese açık.', fiyat: '₺0', donem: '/ her zaman', oz: [['Sınırsız tarif kaydetme ve favoriler', 1], ['Yorum, "Ben de Yaptım" ve profil', 1], ['Reklamsız deneyim', 0], ['Pro içerik ve tarifler', 0]], ucretsiz: true},
    {ad: 'Pro', rozet: 'Öne çıkan', aciklama: 'Reklamsız deneyim, Pro tarifler, haftalık menü planlayıcı ve sınırsız video mutfağı — tek üyelikte.', fiyat: '₺49', donem: '/ ay', oz: [...ORTAK_OZ.map(x => [x, 1]), ['1 içerik üretici kotası', 1]], one: true},
    {ad: 'Pro Max AI', aciklama: 'Pro’nun tamamı, üstüne sınırsız içerik üretici takibi ve şeflere özel içeriklerin hepsi. Satışa açılmadı.', oz: [...ORTAK_OZ.map(x => [x, 1]), ['Sınırsız içerik üretici kotası', 1]]}
  ];
  DG.sayfa('pro', ctx => {
    const var_ = (v, ek = '') => v === 1 ? `${ic(I('check'), 'c-deep')}<span class="dgu-sr">Var</span>` : v === 0 ? `${ic(I('close'), 'c-muted')}<span class="dgu-sr">Yok</span>` : `<span class="${ek}">${esc(v)}</span>`;
    const plan = p => {
      const mevcut = ctx.uye && ((p.ucretsiz && !ctx.pro) || (p.one && ctx.pro));
      const eylem = mevcut ? `<span class="dgu-rozet is-notr pf-mevcut">${ic(I('check'))}Mevcut planın</span>` : p.ucretsiz ? (ctx.uye ? '' : btn('Ücretsiz Kayıt Ol', {tur: 'ikincil', href: 'kayit.html?donus=' + DG.donusAdres(), tam: true})) : btn('Satışa Açılmadı', {attrs: 'aria-disabled="true" disabled', tam: true});
      return `<article class="dgu-kart pf-plan${p.one ? ' is-one' : ''}"><div class="u-ara"><h3 class="t-section">${p.ad}</h3>${p.rozet ? `<span class="dgu-rozet">${p.rozet}</span>` : ''}</div><p class="t-meta c-muted">${esc(p.aciklama)}</p>${p.fiyat ? `<p class="pf-fiyat"><b class="t-page">${p.fiyat}</b> <span class="t-meta c-muted">${p.donem}</span></p>` : ''}
        <ul class="pf-ozellik">${p.oz.map(([x, v]) => `<li class="${v ? '' : 'is-yok'}">${ic(v ? I('check') : I('close'))}<span>${esc(x)}${v ? '' : '<span class="dgu-sr"> (dahil değil)</span>'}</span></li>`).join('')}</ul>${eylem}</article>`;
    };
    const tablo = [...ORTAK_OZ.map(x => [x, 0, 1, 1]), ['İçerik üretici kotası', '0', '1', 'Sınırsız'], ['Aylık fiyat', '₺0', '₺49', '—']];
    const sss = [['Tek üyelikle her şey mi açılıyor?', `Evet. Pro, site geneli tek üyeliktir. Reklamsız deneyim, Pro içerik ve haftalık menü planlayıcı seçtiğin planın kapsamına göre açılır. Kademeleri yan yana görmek için <a class="c-deep" href="#karsilastirma">Paketlerim</a>’deki karşılaştırma tablosuna ya da <a class="c-deep" href="#planlar">DadaGastro Pro</a> sayfasına bakabilirsin.`],
      ['Kart bilgilerim güvende mi?', `Kart bilgilerin iyzico tarafından PCI-DSS standardında saklanır; DadaGastro sunucularında tutulmaz. Kayıtlı kartlarında yalnız marka, son dört hane ve son kullanma tarihi görünür — <a class="c-deep" href="#odemeler">Ödemelerim › Kayıtlı Kartlar</a>. Verinin nasıl işlendiği <a class="c-deep" href="yasal-metin.html?slug=gizlilik">Gizlilik Politikası</a>’nda.`],
      ['Pro üyeliğimi istediğim zaman iptal edebilir miyim?', `Evet. Aboneliğini istediğin an iptal edebilirsin; iptalde Pro avantajların dönem sonuna kadar sürer. İptal ve dondurma işlemi <a class="c-deep" href="#odemeler">Ödemelerim › Abonelik Ödemeleri</a> sekmesinde; iade talebini aynı ekranın <a class="c-deep" href="#odemeler">İade Talepleri</a> sekmesinden açarsın.`]];
    const odeme = [['abonelik', 'Abonelik Ödemeleri', 'Henüz abonelik ödemen yok.'], ['kart', 'Kayıtlı Kartlar', 'Kayıtlı kartın yok.'], ['iade', 'İade Talepleri', 'İade talebin yok.']];
    const html = `<section class="pf-pro-hero dgu-gulucuk">${ctx.pro ? `<span class="dgu-rozet">${ic(I('pro'))}Pro üyesin</span>` : ''}<p class="t-label">${ic(I('pro'))} DadaGastro Pro</p><h1 class="t-page">Pro, mutfağının tamamını açar</h1><p>Reklamsız deneyim, Pro tarifler, haftalık menü planlayıcı ve sınırsız video mutfağı — tek üyelikte.</p><p class="t-meta">DadaGastro Pro, sitenin en iyi içeriğine sınırsız erişim sağlayan tek üyeliktir. Pro’da reklamlar kalkar, Pro tarifler ve haftalık menü planlayıcı açılır.</p><p class="pf-pro-durum t-meta">${ic(I('info'))}<span>Pro planları henüz satışa açılmadı; sitede bugün ödeme alınmıyor.</span></p></section>
      <section class="dgu-bolum"><ul class="dgu-yigin-12">${[['rectangle-ad', 'Reklamsız deneyim', 'Tüm Pro planlarda reklam yok — sayfalar daha hızlı, dikkat dağıtan banner yok.'], [I('pro'), 'Pro tarifler', 'Pro’ya özel tarifler ve koleksiyonlar — yeni içerik düzenli eklenir.'], [HAFTA_IKON, 'Haftalık menü & video mutfağı', 'Haftalık menü planlayıcı ve video mutfağına sınırsız erişim.']].map(([i, b, a]) => `<li class="dgu-eylem is-bilgi"><span class="dgu-eylem-ikon">${ic(i)}</span><span class="dgu-eylem-metin"><b>${b}</b><small>${a}</small></span><span></span></li>`).join('')}</ul></section>
      <section class="dgu-bolum" id="planlar">${DG.bas('Sana uygun Pro’yu seç')}<p class="t-meta c-muted pf-alt">Kademelerin kapsamı ve fiyatı aşağıda.</p><div class="dgu-yigin" data-mt>${PLANLAR.map(plan).join('')}</div></section>
      <section class="dgu-bolum" id="karsilastirma">${DG.bas('Planları yan yana gör')}<div class="pf-tablo-kap"><table class="pf-tablo"><thead><tr><th scope="col">Özellik</th>${PLANLAR.map(p => `<th scope="col">${p.ad}</th>`).join('')}</tr></thead><tbody>${tablo.map(([x, ...v]) => `<tr><th scope="row">${esc(x)}</th>${v.map(y => `<td>${var_(y)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>
      <section class="dgu-bolum">${DG.bas('İki ayrı katman: ücretsiz takip ↔ ücretli Pro')}<p class="t-meta c-muted pf-alt">Bir creator’a ücretsiz abone olmak içeriği açmaz — yalnızca bildirim ve feed eklemesidir. Premium içeriği yalnız Pro açar. İkisi karıştırılmaz.</p><div class="dgu-yigin-12" data-mt>
        <div class="dgu-kart is-gri"><span class="dgu-rozet is-notr">${ic(I('subscribe'))}Ücretsiz · Takip</span><h3 class="t-sub">Abone Ol</h3><p class="t-meta c-muted">YouTube’da abone olmak / Instagram’da takip etmek gibi: para yok, kilit yok. Sadece yeni içerikte haberdar olursun.</p></div>
        <div class="dgu-kart is-gri"><span class="dgu-rozet">${ic('lock')}Ücretli · Pro kilidi</span><h3 class="t-sub">Pro Gate</h3><p class="t-meta c-muted">Premium bir seri/bölüm kilitlidir. Tıklayınca Pro’ya yükseltme kapısı açılır — abone olmak bunu açmaz, yalnız Pro açar.</p>${btn('Pro kapısını gör', {tur: 'ikincil', boy: 'sm', ikon: 'lock', attrs: 'data-pro-kapi', tam: true})}</div></div></section>
      <section class="dgu-bolum">${DG.bas('Sık sorulanlar')}<div class="dgu-akordeon" data-sss>${sss.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary><span>${q}</span>${ic(I('expand'))}</summary><div class="dgu-ak-govde t-meta">${a}</div></details>`).join('')}</div></section>
      <section class="dgu-bolum" id="odemeler">${DG.bas('Ödemelerim')}${ctx.uye ? `<div class="dgu-kart"><div class="u-ara"><span class="dgu-satir-metin"><span>Üyeliğin</span><small>${ctx.pro ? 'Pro' : 'Ücretsiz plan'}</small></span><span class="dgu-rozet${ctx.pro ? '' : ' is-notr'}">${ctx.pro ? ic(I('pro')) + 'Pro' : 'Ücretsiz'}</span></div></div>
        <div class="dgu-yigin-12" data-mt>${seg('Ödemelerim', odeme.map(([k, m]) => [k, m]), 'abonelik').replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')}${odeme.map(([k, l, m], i) => `<div data-odeme="${k}" ${i ? 'hidden' : ''}>${durum({ikon: k === 'kart' ? 'credit-card' : k === 'iade' ? 'rotate-left' : 'receipt', baslik: m, metin: 'Fatura ve ödeme kayıtların burada görünür.'})}</div>`).join('')}</div>`
        : `<div class="dgu-kart is-gri"><p class="t-meta c-muted">Ödemelerini ve faturalarını görmek için giriş yap.</p><div class="dgu-ikili">${btn('Üye Ol', {tur: 'ikincil', boy: 'sm', href: 'kayit.html?donus=' + DG.donusAdres()})}${btn('Giriş Yap', {boy: 'sm', href: 'giris.html?donus=' + DG.donusAdres()})}</div></div>`}</section>
      <section class="dgu-bolum"><div class="dgu-kart is-gri pf-son"><h2 class="t-section">DadaGastro Pro henüz satışa açılmadı</h2><p class="t-meta c-muted">Reklamsız deneyim, Pro tarifler ve haftalık menü planlayıcı Pro planlarında yer alır.</p>${btn('Satışa Açılmadı', {attrs: 'aria-disabled="true" disabled', tam: true})}</div></section>`;
    return {tur: 'alt', baslik: 'DadaGastro Pro', baslikHeader: 'Pro ve Üyeliğim', html, menuAktif: 'packages', sonra(root) {
      const sssEl = root.querySelector('[data-sss]');
      sssEl.addEventListener('toggle', e => { if (e.target.open) sssEl.querySelectorAll('details[open]').forEach(d => { if (d !== e.target) d.open = false; }); }, true);
      root.addEventListener('click', e => {
        const s = e.target.closest('[data-seg]'); if (!s) return;
        root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); root.querySelectorAll('[data-odeme]').forEach(p => { p.hidden = p.dataset.odeme !== s.dataset.seg; });
      });
      if (location.hash) requestAnimationFrame(() => root.querySelector(location.hash)?.scrollIntoView());
    }};
  });
})();
