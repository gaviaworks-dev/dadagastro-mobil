/* G5 · Arama ve bildirimler (docs/52 S1, S2). Kaynak metinler: canlı /ara ve /hesabim/bildirimler (backend g-arama, g-bildirimler).
   Arama: DGVERI üzerinde yerel arama (tarif: ad, kategori, şef, malzeme, özellik · şef · püf noktası · video · kategori).
   Sekmeler yalnız sonucu olan türler için çizilir. Son aramalar yalnız üyede, bu cihazda (dg-arama, en çok 10).
   Bildirimler: prototipte bildirim üretilmez → üyede dürüst boş durum. ?ornek=1: gerçek tarif/şef verisinden kurulmuş,
   cihaza YAZILMAYAN ve “Örnek görünüm” etiketli dolu hal. */
(() => {
  const {ic, I, btn, esc, store, kart, avatar, durum, onizleme} = DG;
  const V = window.DGVERI, TK = window.DGTOKENS;
  const qs = new URLSearchParams(location.search);
  const ORNEK = qs.has('ornek');
  const donus = () => DG.donusAdres();
  const fotoStil = g => g ? ` style="background-image:url('../${esc(g)}')"` : '';

  // ============ S1 · Arama ============
  // Türkçe katlama: büyük/küçük, aksan ve ı/i farkı yok sayılır (“corba” → Çorba).
  const katla = s => String(s || '').toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const TURLER = [
    ['tarif', 'Tarifler', I('recipes')],
    ['puf', 'Püf Noktaları', I('tips')],
    ['sef', 'Şefler', I('chef')],
    ['video', 'Videolar', I('video')],
    ['kategori', 'Kategoriler', I('category')]
  ];
  const TUMU_SINIR = {tarif: 4, puf: 3, sef: 3, video: 3, kategori: 3};
  const YER = 'Tarif, şef, video ara';
  const SON_SINIR = 10;

  // Dizin: her kayıt için katlanmış başlık ve geniş metin; başlık eşleşmesi önce gelir.
  const DIZIN = {
    tarif: V.tarifler.map(t => ({t, bas: katla(t.baslik), metin: katla([t.baslik, t.kategori, t.yazar, ...(t.ozellikler || []), ...t.malzemeler.map(m => m.ad)].join(' '))})),
    puf: V.puflar.map(p => ({p, bas: katla(p.baslik), metin: katla(p.baslik)})),
    sef: V.sefler.map(s => ({s, bas: katla(s.ad), metin: katla([s.ad, s.kullanici, s.unvan].join(' '))})),
    video: V.videolar.map((v, i) => ({v, i, bas: katla(v.baslik), metin: katla(v.baslik)})),
    kategori: V.kategoriler.filter(k => k.sayi > 0).map(k => ({k, bas: katla(k.ad), metin: katla(k.ad)}))
  };
  function ara(q) {
    const parca = katla(q).split(/\s+/).filter(Boolean);
    const sonuc = {};
    for (const [tur] of TURLER) {
      sonuc[tur] = parca.length ? DIZIN[tur].filter(x => parca.every(p => x.metin.includes(p)))
        .map(x => ({...x, skor: parca.every(p => x.bas.includes(p)) ? (x.bas.startsWith(parca[0]) ? 0 : 1) : 2}))
        .sort((a, b) => a.skor - b.skor) : [];
    }
    return sonuc;
  }
  // “Şunu mu demek istedin”: sözlükte (tarif adı, kategori, şef, popüler arama) en yakın tek terim; uzaklık eşiği uzunluğun üçte biri.
  const SOZLUK = [...new Set([...V.tarifler.map(t => t.kisa), ...V.tarifler.flatMap(t => t.malzemeler.map(m => m.ad)), ...V.kategoriler.filter(k => k.sayi > 0).map(k => k.ad), ...V.sefler.map(s => s.ad), ...(V.populer || [])].filter(Boolean))];
  function uzaklik(a, b) {
    const d = Array.from({length: b.length + 1}, (_, j) => j);
    for (let i = 1; i <= a.length; i++) { let onceki = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const g = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, onceki + (a[i - 1] === b[j - 1] ? 0 : 1)); onceki = g; } }
    return d[b.length];
  }
  function oneri(q) {
    const k = katla(q).trim(); if (k.length < 3) return '';
    let en = '', enD = Infinity;
    for (const terim of SOZLUK) {
      const adaylar = [katla(terim), ...katla(terim).split(/\s+/)];
      for (const a of adaylar) { const d = uzaklik(k, a); if (d < enD) { enD = d; en = terim; } }
    }
    return enD > 0 && enD <= Math.max(1, Math.floor(k.length / 3)) ? en : '';
  }

  const sonAl = () => (store.get('arama', []) || []).filter(x => typeof x === 'string').slice(0, SON_SINIR);
  const sonYaz = v => store.set('arama', v.slice(0, SON_SINIR));

  // Sonuç parçaları (ortak bileşenler: DGCard, şef satırı, liste satırı, kategori öğesi)
  const sefSatir = s => `<a class="dgu-sef-satir" href="${esc(DG.sefLink(s))}">${avatar(s.ad, 40)}<span class="dgu-satir-metin"><b class="clamp-1">${esc(s.ad)}</b><small class="clamp-1">${esc([s.unvan, `${DG.sayi(s.tarif)} tarif`].filter(Boolean).join(' · '))}</small></span>${ic(I('rowNext'))}</a>`;
  const medyaSatir = (href, gorsel, baslik, alt, ikon) => `<a class="dgu-satir" href="${esc(href)}">${DG.kucukFoto(gorsel, ikon)}<span class="dgu-satir-metin"><span class="clamp-2 ar-sonuc-baslik">${esc(baslik)}</span>${alt ? `<small>${esc(alt)}</small>` : ''}</span>${ic(I('rowNext'))}</a>`;
  const pufSatir = p => medyaSatir(DG.pufLink(p.slug), p.gorsel, p.baslik, p.okunma ? `${DG.sayi(p.okunma)} okunma` : '', I('tips'));
  const videoSatir = (v, i) => medyaSatir(DG.videoLink(i), v.gorsel, v.baslik, [v.sure, v.izlenme ? `${v.izlenme} izlenme` : ''].filter(Boolean).join(' · '), I('video'));
  const katOge = k => `<a class="dgu-kat" href="${esc(DG.listeLink({'kategori[]': k.slug}))}"><span class="dgu-kat-foto"${fotoStil(k.gorsel)}></span><b class="clamp-2">${esc(k.ad)}</b><small>${DG.sayi(k.sayi)} tarif</small></a>`;
  function liste(tur, kayitlar) {
    if (tur === 'tarif') return `<div class="dgu-izgara">${kayitlar.map(x => kart(x.t)).join('')}</div>`;
    if (tur === 'kategori') return `<div class="dgu-izgara-3">${kayitlar.map(x => katOge(x.k)).join('')}</div>`;
    const fn = {puf: x => pufSatir(x.p), sef: x => sefSatir(x.s), video: x => videoSatir(x.v, x.i)}[tur];
    return `<div class="dgu-satirlar">${kayitlar.map(fn).join('')}</div>`;
  }

  DG.sayfa('arama', ctx => {
    const q0 = (ctx.qs.get('q') || '').trim();
    const html = `<div class="ar-ust"><form class="ar-form" role="search" data-form novalidate>
        <div class="dgu-girdi${q0 ? ' has-text' : ''}">${ic(I('search'))}<input id="f-q" name="q" type="search" placeholder="${YER}" aria-label="Genel arama" value="${esc(q0)}" autocomplete="off" enterkeyhint="search"><button class="dgu-ibtn dgu-temizle" type="button" data-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div>
      </form><div class="ar-sekme" data-sekmeler></div></div>
      <div class="ar-govde" data-govde></div>`;
    const ust = html.slice(0, html.indexOf('<div class="ar-govde"'));
    return {tur: 'alt', baslik: 'Arama', baslikHeader: 'DadaGastro\'da ara', html, ustIcerik: ust, iskelet: DG.iskelet(4), sonra(root) {
      const inp = root.querySelector('#f-q'), kutu = inp?.closest('.dgu-girdi'), govde = root.querySelector('[data-govde]'), sekmeEl = root.querySelector('[data-sekmeler]');
      if (!govde) return; // ?durum=yukleniyor/hata: kabuk iskeleti gösterir
      let tur = TURLER.some(([k]) => k === ctx.qs.get('tur')) ? ctx.qs.get('tur') : 'tumu';
      let zaman;

      const adres = () => { const u = new URL(location.href); const v = inp.value.trim(); v ? u.searchParams.set('q', v) : u.searchParams.delete('q'); tur !== 'tumu' && v ? u.searchParams.set('tur', tur) : u.searchParams.delete('tur'); history.replaceState(history.state, '', u); };
      const kaydet = v => { v = (v || inp.value).trim(); if (!ctx.uye || v.length < 2) return; sonYaz([v, ...sonAl().filter(x => katla(x) !== katla(v))]); };
      const populer = () => (V.populer || []).length ? `<section class="dgu-yigin-12"><h2 class="t-sub">Popüler aramalar</h2><div class="u-yatay">${V.populer.map(p => `<button class="dgu-chip" type="button" data-terim="${esc(p)}">${esc(p)}</button>`).join('')}</div></section>` : '';

      function bos() {
        sekmeEl.innerHTML = '';
        const son = sonAl();
        const sonBolum = !ctx.uye
          ? `<section class="dgu-yigin-8"><h2 class="t-sub">Son aramaların</h2><p class="t-meta c-muted">Son aramalarını görmek için <a class="ar-link" href="giris.html?donus=${donus()}">giriş yap</a>.</p></section>`
          : son.length ? `<section class="dgu-yigin-8"><div class="u-ara"><h2 class="t-sub">Son aramaların</h2>${btn('Temizle', {tur: 'metin', attrs: 'data-son-temizle'})}</div><div class="dgu-satirlar">${son.map(s => `<div class="dgu-satir-kap"><button class="dgu-satir" type="button" data-terim="${esc(s)}"><span class="dgu-satir-ikon">${ic(I('history'))}</span><span class="dgu-satir-metin"><span class="clamp-1">${esc(s)}</span></span></button><button class="dgu-ibtn" type="button" data-son-sil="${esc(s)}" aria-label="${esc(`“${s}” aramasını sil`)}">${ic(I('close'))}</button></div>`).join('')}</div></section>`
          : `<section class="dgu-yigin-8"><h2 class="t-sub">Son aramaların</h2><p class="t-meta c-muted">Henüz arama yapmadın.</p></section>`;
        govde.innerHTML = `<div class="dgu-ic dgu-yigin ar-bos"><p class="c-muted">Tarif, püf noktası ya da şef — aramak için yukarıya yaz.</p>${sonBolum}${populer()}</div>`;
      }

      function ciz() {
        const v = inp.value.trim();
        kutu.classList.toggle('has-text', !!inp.value);
        adres();
        if (!v) return bos();
        const S = ara(v), toplam = TURLER.reduce((n, [k]) => n + S[k].length, 0);
        if (!toplam) {
          sekmeEl.innerHTML = '';
          const o = oneri(v);
          govde.innerHTML = `<p class="dgu-sr" role="status">0 sonuç</p>${durum({ikon: I('search'), baslik: `“${v}” için sonuç yok`, metin: 'Farklı bir kelime dene — tarif adı, malzeme, püf noktası ya da şef.', eylem: btn('Aramayı temizle', {tur: 'ikincil', ikon: I('close'), attrs: 'data-temizle'})})}
            <div class="dgu-ic dgu-yigin ar-yok">${o ? `<p class="ar-oneri">Şunu mu demek istedin: <button class="ar-link" type="button" data-terim="${esc(o)}">${esc(o)}</button></p>` : ''}${populer()}</div>`;
          return;
        }
        const var_ = TURLER.filter(([k]) => S[k].length);
        if (tur !== 'tumu' && !S[tur].length) tur = 'tumu';
        sekmeEl.innerHTML = DG.seg('Sonuç türü', [['tumu', 'Tümü', toplam], ...var_.map(([k, m]) => [k, m, S[k].length])], tur).replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"');
        sekmeEl.querySelector('[aria-selected=true]')?.scrollIntoView({block: 'nearest', inline: 'nearest'});
        const sayac = `<p class="t-meta c-muted ar-sayac" role="status"><b class="t-bold">${DG.sayi(tur === 'tumu' ? toplam : S[tur].length)} sonuç</b> bulundu · “${esc(v)}” için.</p>`;
        const bolumler = tur === 'tumu'
          ? var_.map(([k, m]) => { const n = S[k].length, sinir = TUMU_SINIR[k]; const bas = DG.bas(m, n > sinir ? {href: `arama.html?${new URLSearchParams({q: v, tur: k})}`, metin: 'Tamamını Gör', aria: `${m}: ${n} sonucun tamamını gör`} : null).replace('</h2>', ` <span class="t-meta c-muted ar-tur-sayi">${DG.sayi(n)}</span></h2>`); return `<section class="dgu-yigin-12">${bas}${liste(k, S[k].slice(0, sinir))}</section>`; }).join('')
          : `<section class="dgu-yigin-12">${liste(tur, S[tur])}</section>`;
        govde.innerHTML = `<div class="dgu-ic dgu-yigin ar-sonuc">${sayac}${bolumler}</div>`;
        window.DGCard?.veils?.();
      }

      inp.addEventListener('input', () => { kutu.classList.toggle('has-text', !!inp.value); clearTimeout(zaman); zaman = setTimeout(ciz, TK.motion.base); });
      root.querySelector('[data-form]').addEventListener('submit', e => { e.preventDefault(); clearTimeout(zaman); kaydet(); ciz(); inp.blur(); });
      root.addEventListener('click', e => {
        const t = e.target.closest('[data-terim]');
        if (t) { inp.value = t.dataset.terim; tur = 'tumu'; kaydet(); ciz(); window.scrollTo({top: 0}); return; }
        if (e.target.closest('[data-temizle]')) { inp.value = ''; tur = 'tumu'; ciz(); inp.focus(); return; }
        const sg = e.target.closest('[data-seg]');
        if (sg) { tur = sg.dataset.seg; ciz(); window.scrollTo({top: 0}); return; }
        const tg = e.target.closest('.ar-sonuc .dg-head__link');
        if (tg) { e.preventDefault(); tur = new URL(tg.href).searchParams.get('tur'); ciz(); window.scrollTo({top: 0}); sekmeEl.querySelector('[aria-selected=true]')?.focus(); return; }
        const ss = e.target.closest('[data-son-sil]');
        if (ss) { const k = ss.dataset.sonSil, once = sonAl(); sonYaz(once.filter(x => x !== k)); ciz(); DG.bildir('Arama silindi', {eylem: {ad: 'Geri al', fn: () => { sonYaz(once); ciz(); }}}); return; }
        if (e.target.closest('[data-son-temizle]')) { const once = sonAl(); sonYaz([]); ciz(); DG.bildir('Son aramaların temizlendi', {eylem: {ad: 'Geri al', fn: () => { sonYaz(once); ciz(); }}}); return; }
        // Sonuca gidiş: aranan terim son aramalara eklenir.
        if (e.target.closest('.ar-sonuc a:not(.dg-head__link)')) kaydet();
      });
      ciz();
      if (!q0) requestAnimationFrame(() => inp.focus({preventScroll: true}));
    }};
  });

  // ============ S2 · Bildirimler ============
  // Canlı süzgeç türleri ve ikonları (g-bildirimler: $ikonHaritasi, $turHaritasi).
  const BTUR = {tarif: ['Tarif', 'utensils'], menu: ['Menü', 'list-check'], topluluk: ['Topluluk', I('community')], sef: ['Şef', I('following')], sistem: ['Sistem', I('info')]};
  const SAAT = 3600e3, GUN = 24 * SAAT;
  const goreli = ts => { const d = Date.now() - ts; if (d < SAAT) return `${Math.max(1, Math.round(d / 60e3))} dakika önce`; if (d < GUN) return `${Math.round(d / SAAT)} saat önce`; const g = Math.round(d / GUN); return g < 7 ? `${g} gün önce` : `${Math.round(g / 7)} hafta önce`; };
  const gunEtiket = ts => { const b = new Date(); b.setHours(0, 0, 0, 0); return ts >= b.getTime() ? 'Bugün' : ts >= b.getTime() - GUN ? 'Dün' : 'Daha Eski'; };
  // Örnek görünüm: türler docs/52 S2 (tarif onay/red, favori, yorum, yanıt, abonelik bitti, püf onay, takip); metinlerdeki ad ve tarifler gerçek veriden.
  function ornekBildirimler() {
    const s = V.sefler, T = V.tarifler, P = V.puflar;
    const sefTarif = s.map(x => [x, T.find(t => t.yazar === x.ad)]).filter(([, t]) => t);
    const [a, b, c] = [sefTarif[0], sefTarif[1] || sefTarif[0], sefTarif[2] || sefTarif[0]];
    const simdi = Date.now(), gece = new Date().setHours(0, 0, 0, 0), saatOnce = h => Math.max(gece + 60e3, simdi - h * SAAT);
    return [
      {id: 'o1', tur: 'tarif', baslik: 'Tarifin yayında', govde: `“${T[3].kisa}” incelemeden geçti ve yayımlandı.`, href: DG.tarifLink(T[3]), ts: saatOnce(1), okundu: false},
      {id: 'o2', tur: 'topluluk', baslik: `${a[0].ad} tarifine yorum yaptı`, govde: `“${T[3].kisa}”`, href: DG.tarifLink(T[3]), ts: saatOnce(2), okundu: false},
      {id: 'o3', tur: 'sef', baslik: `${b[0].ad} yeni tarif yayımladı`, govde: `“${b[1].kisa}”`, href: DG.tarifLink(b[1]), ts: saatOnce(3), okundu: false},
      {id: 'o4', tur: 'topluluk', baslik: `${c[0].ad} seni takip etmeye başladı`, govde: [c[0].unvan, `${DG.sayi(c[0].tarif)} tarif`].filter(Boolean).join(' · '), href: DG.sefLink(c[0]), ts: gece - 3 * SAAT, okundu: true},
      {id: 'o5', tur: 'menu', baslik: 'Haftalık menü hatırlatması', govde: `Bugün menünde: “${T[5].kisa}”`, href: 'menulerim.html?sekme=haftalik', ts: gece - 9 * SAAT, okundu: false},
      {id: 'o6', tur: 'topluluk', baslik: `${a[0].ad} tarifini kaydetti`, govde: `“${T[7].kisa}”`, href: DG.tarifLink(T[7]), ts: gece - 2 * GUN, okundu: true},
      {id: 'o7', tur: 'tarif', baslik: 'Püf noktan yayında', govde: `“${P[0].baslik}”`, href: DG.pufLink(P[0].slug), ts: gece - 3 * GUN, okundu: true},
      {id: 'o8', tur: 'tarif', baslik: 'Tarifin için düzeltme istendi', govde: `“${T[9].kisa}” — inceleme notunu Tariflerim'de görebilirsin.`, href: 'tariflerim.html', ts: gece - 5 * GUN, okundu: true},
      {id: 'o9', tur: 'topluluk', baslik: `${b[0].ad} yorumuna yanıt verdi`, govde: `“${T[11].kisa}”`, href: DG.tarifLink(T[11]), ts: gece - 8 * GUN, okundu: true},
      {id: 'o10', tur: 'sistem', baslik: 'DadaGastro Pro aboneliğinin süresi doldu', govde: 'Pro içerikleri yeniden açmak için planları inceleyebilirsin.', href: 'pro.html', ts: gece - 12 * GUN, okundu: true}
    ];
  }
  const TARIH = [['tum', 'Tüm zamanlar', Infinity], ['bugun', 'Bugün', 0], ['hafta', 'Son 7 gün', 7], ['ay', 'Son 30 gün', 30]];

  DG.sayfa('bildirimler', ctx => {
    const ortak = {tur: 'alt', baslik: 'Bildirimler', menuAktif: 'notifications', iskelet: DG.iskelet(5, 'satir'), headerEylem: `<a class="dgu-hbtn" href="ayarlar.html?bolum=bildirim" aria-label="Bildirim ayarları">${ic(I('settings'))}</a>`};
    if (!ctx.uye) return {...ortak, headerEylem: '', html: DG.girisDuvari({ikon: I('notifications'), baslik: 'Bildirimlerini görmek için giriş yap', metin: 'Tarif, menü, topluluk ve şef bildirimlerinin hepsi tek akışta.', sunar: [['utensils', 'Tarif', 'Tarifin yayımlandığında ya da düzeltme istendiğinde'], [I('community'), 'Topluluk', 'Tarifine yorum geldiğinde, seni takip ettiklerinde'], [I('following'), 'Şef', 'Takip ettiğin şef yeni içerik yayımladığında']]})};
    // Yerel kaynak: bu prototipte bildirim üreten bir süreç yok; dg-bildirim boş kalır. Örnek görünüm yalnız bellekte.
    let B = ORNEK ? ornekBildirimler() : (ctx.durum === 'bos' ? [] : store.get('bildirim', []));
    const yaz = v => { B = v; if (!ORNEK && ctx.durum !== 'bos') store.set('bildirim', v); };
    const kapali = () => ORNEK ? kapaliOrnek : (store.get('ayar', {}).kapaliTur || []);
    let kapaliOrnek = [];
    const kapaliYaz = v => { if (ORNEK) { kapaliOrnek = v; return; } const a = store.get('ayar', {}); store.set('ayar', {...a, kapaliTur: v}); };
    const bosHtml = durum({ikon: I('notifications'), baslik: 'Henüz bildirimin yok', metin: 'Bir tarif paylaş, haftalık menünü kur ve şefleri takip et — mutfağın işledikçe burası dolacak.', eylem: btn('Tarifleri Keşfet', {href: DG.KOK.liste})})
      + `<div class="dgu-ic dgu-yigin-12"><p class="t-meta c-muted">Bildirim tercihlerini <a class="ar-link" href="ayarlar.html?bolum=bildirim">Hesap Ayarları → Bildirimler</a>'den yönetebilirsin.</p></div>`;
    if (!B.length && !ORNEK) return {...ortak, html: bosHtml};
    let suz = Object.keys(BTUR).includes(ctx.qs.get('tur')) ? ctx.qs.get('tur') : 'all', tarih = TARIH.some(([k]) => k === ctx.qs.get('tarih')) ? ctx.qs.get('tarih') : 'tum';
    const html = `
      <div class="dgu-ic dgu-yigin-12 ar-bil-bas"><div class="u-ara"><p class="t-sub" data-okunmamis role="status"></p>${btn('Tümünü Okundu İşaretle', {tur: 'metin', ikon: I('check'), attrs: 'data-tumu-okundu'})}</div><p class="t-meta c-muted">Tarif, menü, topluluk ve şef bildirimlerinin hepsi tek akışta.</p>
      <div class="dgu-serit" role="group" aria-label="Bildirim tipi filtresi" data-cipler></div></div>
      <div class="dgu-ic ar-bil-liste" data-liste></div>`;
    return {...ortak, html, sonra(root) {
      const liste = root.querySelector('[data-liste]'), cipler = root.querySelector('[data-cipler]'), okEl = root.querySelector('[data-okunmamis]');
      const adres = () => { const u = new URL(location.href); suz === 'all' ? u.searchParams.delete('tur') : u.searchParams.set('tur', suz); tarih === 'tum' ? u.searchParams.delete('tarih') : u.searchParams.set('tarih', tarih); history.replaceState(history.state, '', u); };
      const gorunen = () => { const sinir = TARIH.find(([k]) => k === tarih)[2], gece = new Date().setHours(0, 0, 0, 0); return B.filter(b => !kapali().includes(b.tur) && (suz === 'all' || b.tur === suz) && (sinir === Infinity || b.ts >= gece - sinir * GUN)); };
      function ciz() {
        adres();
        const ac = B.filter(b => !kapali().includes(b.tur)), okunmamis = ac.filter(b => !b.okundu).length;
        okEl.textContent = okunmamis ? `${okunmamis} okunmamış` : 'Hepsi okundu';
        root.querySelector('[data-tumu-okundu]').hidden = !okunmamis;
        const tarihAd = TARIH.find(([k]) => k === tarih)[1];
        cipler.innerHTML = `<button class="dgu-chip" type="button" data-f="all" aria-pressed="${suz === 'all'}">Tümü <span class="dgu-chip-sayi">${ac.length}</span></button>`
          + Object.entries(BTUR).filter(([k]) => !kapali().includes(k)).map(([k, [m, i]]) => `<button class="dgu-chip" type="button" data-f="${k}" aria-pressed="${suz === k}">${ic(i)}${m}</button>`).join('')
          + `<button class="dgu-chip" type="button" data-tarih aria-haspopup="dialog" aria-pressed="${tarih !== 'tum'}">${ic('calendar-days')}${esc(tarihAd)}</button>`;
        const G = gorunen();
        if (!G.length) { liste.innerHTML = durum({ikon: I('filter'), baslik: 'Bu süzgeçte bildirim yok', metin: 'Seçtiğin tür ya da tarih aralığında bildirim bulunmuyor.', eylem: btn('Süzgeci sıfırla', {tur: 'ikincil', attrs: 'data-sifirla'})}); return; }
        const gruplar = ['Bugün', 'Dün', 'Daha Eski'].map(g => [g, G.filter(b => gunEtiket(b.ts) === g)]).filter(([, l]) => l.length);
        liste.innerHTML = gruplar.map(([g, l]) => `<section class="ar-bil-grup"><h2 class="t-label c-muted">${g}</h2><div class="dgu-satirlar">${l.map(b => {
          const [m, i] = BTUR[b.tur] || BTUR.sistem;
          return `<div class="dgu-satir-kap" data-id="${b.id}"><a class="dgu-bildirim${b.okundu ? '' : ' is-okunmadi'}" href="${esc(b.href)}" data-git="${b.id}"><span class="dgu-bildirim-ikon">${ic(i)}</span><span class="dgu-bildirim-metin"><b>${esc(b.baslik)}</b><p>${esc(b.govde)}</p><small class="ar-bil-meta">${b.okundu ? '' : DG.durumRozet('okunmadi')}<span>${esc(m)} · ${goreli(b.ts)}</span></small></span></a><button class="dgu-ibtn" type="button" data-daha="${b.id}" aria-label="Bildirim seçenekleri">${ic(I('more'))}</button></div>`;
        }).join('')}</div></section>`).join('');
      }
      const okundu = (id, v = true) => yaz(B.map(b => b.id === id ? {...b, okundu: v} : b));
      function sil(id) { const once = B; yaz(B.filter(b => b.id !== id)); ciz(); DG.bildir('Bildirim silindi', {eylem: {ad: 'Geri al', fn: () => { yaz(once); ciz(); }}}); }
      function turKapat(tur) { const once = kapali(); kapaliYaz([...once, tur]); if (suz === tur) suz = 'all'; ciz(); DG.bildir(`${BTUR[tur][0]} bildirimleri kapatıldı`, {eylem: {ad: 'Geri al', fn: () => { kapaliYaz(once); ciz(); }}}); }
      function secenekler(id) {
        const b = B.find(x => x.id === id); if (!b) return;
        const [m] = BTUR[b.tur] || BTUR.sistem;
        const d = DG.sheet({baslik: 'Bildirim', govde: `<div class="dgu-satirlar">${DG.satir({ikon: I('seeAll'), baslik: 'İlgili sayfaya git', href: b.href, attrs: `data-git="${b.id}"`})}${DG.satir({ikon: I('check'), baslik: b.okundu ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle', attrs: 'data-s="okundu"', sag: ''})}${DG.satir({ikon: I('exclude'), baslik: `${m} bildirimlerini kapat`, alt: 'Bu türü akıştan gizler; Bildirim tercihlerinden yeniden açabilirsin.', attrs: 'data-s="kapat"', sag: ''})}${DG.satir({ikon: I('delete'), baslik: 'Bildirimi sil', sinif: 'is-yikici', attrs: 'data-s="sil"', sag: ''})}</div>`});
        d.addEventListener('click', e => {
          const s = e.target.closest('[data-s]')?.dataset.s; if (!s) return;
          d.kapat();
          if (s === 'okundu') { okundu(id, !b.okundu); ciz(); DG.bildir(b.okundu ? 'Okunmadı olarak işaretlendi' : 'Okundu olarak işaretlendi'); }
          if (s === 'kapat') turKapat(b.tur);
          if (s === 'sil') sil(id);
        });
      }
      function tarihSec() {
        const d = DG.sheet({baslik: 'Tarih', govde: `<div class="dgu-yigin-8" role="radiogroup" aria-label="Tarih aralığı">${TARIH.map(([k, m]) => DG.secim('tarih', esc(m), {tur: 'radio', deger: k, secili: k === tarih})).join('')}</div>`, ayak: `<div class="dgu-ikili">${btn('Vazgeç', {tur: 'ikincil', attrs: 'data-kapat'})}${btn('Uygula', {attrs: 'data-uygula'})}</div>`});
        d.querySelector('[data-uygula]').addEventListener('click', () => { tarih = d.querySelector('input[name=tarih]:checked')?.value || 'tum'; d.kapat(); ciz(); });
      }
      // Dokunma hedefe gider ve okundu sayılır (canlı: “İlgili sayfaya git”). Sheet içindeki bağlantı da aynı.
      document.addEventListener('click', e => { const g = e.target.closest('[data-git]'); if (g) okundu(g.dataset.git); });
      root.addEventListener('click', e => {
        const f = e.target.closest('[data-f]'); if (f) { suz = f.dataset.f; ciz(); return; }
        if (e.target.closest('[data-tarih]')) { tarihSec(); return; }
        if (e.target.closest('[data-sifirla]')) { suz = 'all'; tarih = 'tum'; ciz(); return; }
        const dh = e.target.closest('[data-daha]'); if (dh) { secenekler(dh.dataset.daha); return; }
        if (e.target.closest('[data-tumu-okundu]')) { const once = B; yaz(B.map(b => ({...b, okundu: true}))); ciz(); DG.bildir('Tümü okundu olarak işaretlendi', {eylem: {ad: 'Geri al', fn: () => { yaz(once); ciz(); }}}); }
      });
      ciz();
    }};
  });
})();
