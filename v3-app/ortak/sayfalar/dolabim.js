/* Dolabım (docs/57 §2; Beyar V4 madde E): aldığın ürünleri dolabına kaydet — son kullanma tarihi (SKT), açıldıysa açılış tarihi ve açık
   raf ömrü, miktar, yer (Buzdolabı / Dondurucu / Kiler); süresi yaklaşanlara hatırlatma ve tarif önerisi.
   Tek kaynak localStorage `dg-dolabim` = {urunler: [{id, ad, katalog, miktar, birim, yer, skt, acildi, acilis, acikRaf, not}],
   gecmis: [{ad, sonuc: 'tuketildi'|'atildi', tarih}], bildirim: {gun, saat, acik}}. Kalan gün = min(SKT, açılış + açık raf ömrü) − bugün.
   ?ornek=1: gerçekçi dolu dolap (tarihler bugüne göre); cihaza yazılmaz, oturum belleğinde (sessionStorage) tutulur.
   Hâller: ?ekle=1 (ürün ekle) · ?ekle=1&kamera=barkod (tam ekran barkod kamerası; Beyar 15 Ekim tek kamera akışı) · &izin=red (kamera izni
   reddedildi, kameranın içinde; eski ?ekle=1&izin=red de buraya gelir) · ?urun=<id> (detay/düzenle) · ?degerlendir=1 (bunları
   değerlendir) · ?bildirim=1 (bildirim ayarları) · ?bildirim=1&kartlar=1 (hatırlatmalar) · misafir giriş duvarı · ?durum=baglanti-yok. */

// Çekirdek (kalan gün, durum, görsel, örnek dolap) ortak/dg-dolabim.js'te (window.DGDolabim); üretici bu dosyadan önce yükler.
(() => {
  const {ic, I, esc, btn, alan, seg, satir, durum, anahtar, store} = DG;
  const V = window.DGVERI, TK = window.DGTOKENS, M = TK.modules.myFridge, DD = window.DGDolabim;
  const qs = new URLSearchParams(location.search);
  const ORNEK = qs.has('ornek');
  const AD = M.ad;
  const bugun = DD.iso(), gun = n => DD.gunEkle(bugun, n);
  const yeniId = () => Math.random().toString(36).slice(2, 9);
  const saat = () => new Date().toLocaleTimeString('tr', {hour: '2-digit', minute: '2-digit'});
  const tarihYaz = t => t ? new Date(t + 'T12:00:00').toLocaleDateString('tr', {day: 'numeric', month: 'long'}) : '';
  // Galeri test parametreleri (?oturum, ?ornek) aynı modül içinde korunur.
  const tasi = h => { const p = new URLSearchParams(); if (qs.get('oturum')) p.set('oturum', qs.get('oturum')); if (ORNEK) p.set('ornek', '1'); const s = p.toString(); return s ? h + (h.includes('?') ? '&' : '?') + s : h; };
  const YER = [['buzdolabi', 'Buzdolabı'], ['dondurucu', 'Dondurucu'], ['kiler', 'Kiler']];
  const yerAd = k => YER.find(y => y[0] === k)?.[1] || '';
  const BIRIM = ['adet', 'g', 'kg', 'ml', 'L', 'paket', 'demet', 'kavanoz', 'kutu'];
  // Katalog = Dolapta Ne Var ile aynı (DGVERI.dolapKatalog); görseller canlı sitenin malzeme görselleri (assets/malzeme/<slug>.webp).
  const KAT = V.dolapKatalog || [];
  const KATALOG = KAT.flatMap(g => g.malzemeler.map(ad => ({ad, grup: g.grup})));
  const norm = s => String(s || '').toLocaleLowerCase('tr');
  const gorsel = u => DD.gorsel(u.katalog ? u : {katalog: KATALOG.some(k => k.ad === u.ad) ? u.ad : ''});
  const foto = u => DG.kucukFoto(gorsel(u), M.ikon);
  const katalogAra = (q, n = 8) => window.DGDolap?.katalogAra ? window.DGDolap.katalogAra(q, n) : KATALOG.map(k => k.ad).filter(a => norm(a).includes(norm(q.trim()))).slice(0, n);
  // Alışveriş listesi reyonu (profil.js REYONLAR ile aynı anahtarlar), katalog grubundan.
  const REYON = {'Sebzeler': 'manav', 'Meyveler': 'manav', 'Kırmızı Et': 'kasap', 'Tavuk ve Kümes Ürünleri': 'kasap', 'Balık ve Deniz Ürünleri': 'kasap', 'Süt Ürünleri': 'sut', 'Tahıllar ve Bakliyatlar': 'bakliyat', 'Baharatlar, Otlar ve Soslar': 'baharat'};

  // Türkçe tamlayan eki (Sütün, Yoğurdun, Ispanağın, Tereyağının) — hatırlatma cümlesi için; ünlü uyumu + çok heceli sözcükte yumuşama.
  const UNLU = 'aeıioöuü';
  const tamlayan = ad => { const k = ad.trim().split(' '); let s = k.pop(); const l = norm(s), sesli = [...l].filter(c => UNLU.includes(c)), son = sesli[sesli.length - 1] || 'e';
    const ek = 'aı'.includes(son) ? 'ın' : 'ei'.includes(son) ? 'in' : 'ou'.includes(son) ? 'un' : 'ün';
    if (UNLU.includes(l.slice(-1))) s += 'n' + ek; else { const y = sesli.length > 1 && {p: 'b', ç: 'c', t: 'd', k: 'ğ'}[s.slice(-1)]; if (y) s = s.slice(0, -1) + y; s += ek; }
    return [...k, s].join(' '); };
  // Belirtme eki (Ispanağı, Maydanozu, Domatesi, Elmayı) — taze ürün hatırlatması için; aynı ünlü uyumu ve yumuşama.
  const belirtme = ad => { const k = ad.trim().split(' '); let s = k.pop(); const l = norm(s), sesli = [...l].filter(c => UNLU.includes(c)), son = sesli[sesli.length - 1] || 'e';
    const ek = 'aı'.includes(son) ? 'ı' : 'ei'.includes(son) ? 'i' : 'ou'.includes(son) ? 'u' : 'ü';
    if (UNLU.includes(l.slice(-1))) s += 'y' + ek; else { const y = sesli.length > 1 && {p: 'b', ç: 'c', t: 'd', k: 'ğ'}[s.slice(-1)]; if (y) s = s.slice(0, -1) + y; s += ek; }
    return [...k, s].join(' '); };

  // Kaynak: normalde dg-dolabim; ?ornek=1 oturum belleği (sessionStorage), cihaza yazılmaz.
  const OK = 'dg-dolabim-ornek-v2';   // sürümlü: iki takip türü (paketli / taze) örnek verisi
  const veri = () => { const bos = {urunler: [], gecmis: [], bildirim: {gun: 2, saat: '09:00', acik: true}};
    if (!ORNEK) return {...bos, ...store.get('dolabim', {})};
    try { const s = JSON.parse(sessionStorage.getItem(OK)); if (s) return s; } catch { /* yok */ }
    const o = DD.ornekVeri(bugun); try { sessionStorage.setItem(OK, JSON.stringify(o)); } catch { /* yok */ } return o; };
  const yaz = d => { if (ORNEK) { try { sessionStorage.setItem(OK, JSON.stringify(d)); } catch { /* yok */ } } else store.set('dolabim', d); return d; };

  // Kalan gün durumu: taze / yaklaşıyor (≤ bildirim günü) / bugün / geçti — durum rozeti tonları (tokens.json color.status + primary).
  // Kalan gün durumu (taze / yaklaşıyor / bugün / geçti) ortak çekirdekten; tonlar ortak durum rozetinde.
  const durumu = (u, esik) => DD.durum(u, esik, bugun);
  const rozet = d => DG.durumRozet(d.ton, {ad: d.ad, ton: d.ton, ikon: d.ikon});
  const miktarYaz = u => [u.miktar, u.birim].filter(Boolean).join(' ');
  const satirMeta = u => [miktarYaz(u), yerAd(u.yer), u.acildi && !DD.tazeMi(u) ? 'Açıldı' : ''].filter(Boolean).join(' · ');
  // Sıra ortak çekirdekten (DGDolabim.sirala): süresi geçmemişler kalan güne göre, geçenler sonda.
  const sirali = (l, esik) => DD.sirala(l, bugun).map(u => ({u, d: durumu(u, esik)}));
  const neden = u => DD.neden(u, tarihYaz);
  const kisaNeden = u => DD.neden(u, tarihYaz, {kisa: true});   // liste satırı: taze üründe “12 Ekim'de eklendi” (Beyar)
  const urunSatir = ({u, d}) => `<a class="dgu-satir" href="${esc(tasi(`dolabim.html?urun=${encodeURIComponent(u.id)}`))}" aria-label="${esc(u.ad)}, ${esc(satirMeta(u))}, ${esc(neden(u))}, ${esc(d.ad)}">${foto(u)}<span class="dgu-satir-metin"><span>${esc(u.ad)}</span><small>${esc(satirMeta(u))}</small><small>${esc(kisaNeden(u))}</small></span>${rozet(d)}</a>`;
  // Hatırlatma cümlesi (bildirim kartı, detay): paketli “Sütün tüketilmesi için 2 gün kaldı”; taze “Ispanağı 2 gün içinde tüket”.
  const cekirdek = ad => ad.replace(/\s*\(.*\)\s*$/, '');
  const hatirlatma = (u, d) => { const a = cekirdek(u.ad);
    if (DD.tazeMi(u)) return d.k < 0 ? `${tamlayan(a)} tazeliği ${-d.k} gün önce geçti` : d.k === 0 ? `${belirtme(a)} bugün tüket` : `${belirtme(a)} ${d.k} gün içinde tüket`;
    return d.k < 0 ? `${tamlayan(a)} son kullanma tarihi ${-d.k} gün önce geçti` : d.k === 0 ? `${tamlayan(a)} son kullanma tarihi bugün` : `${tamlayan(a)} tüketilmesi için ${d.k} gün kaldı`; };
  // Tarif eşleşmesi: süresi yaklaşan ürünlerin katalog adı tarifin malzemelerinde geçiyor mu (DGVERI gerçek tarifler).
  const kokSoz = s => norm(s).split(/[^a-zçğıöşü]+/).filter(x => x.length > 2);
  const kullanir = (t, ad) => { const w = kokSoz(ad); return (t.malzemeler || []).some(m => { const mw = kokSoz(m.ad); return w.every(x => mw.some(y => y.startsWith(x.slice(0, Math.max(3, x.length - 1))))); }); };

  // Misafir: ortak giriş duvarı (sunar → ortak DG.maddeler, izin istemleriyle aynı madde bileşeni).
  const misafir = () => DG.girisDuvari({ikon: M.ikon, baslik: `${AD} için giriş yap`, metin: 'Aldığın ürünleri kaydet; son kullanma tarihi yaklaşınca haber verelim, ellerindekiyle ne pişireceğini önerelim.',
    sunar: [['calendar-check', 'Son kullanma takibi', 'Kalan gün kendiliğinden hesaplanır; açtığın ürünün raf ömrü de hesaba katılır.'], [I('notifications'), 'Zamanında hatırlatma', '“Sütün tüketilmesi için 2 gün kaldı” gibi, seçtiğin saatte.'], [I('recipes'), 'Bunları değerlendir', 'Süresi yaklaşan ürünlerle yapılabilecek gerçek tarifler.']]});

  // Ürün formu (ekle ve düzenle ortak): takip türü (Paketli: SKT + açıldı/açılış/açık raf ömrü · Taze: eklendiği gün + tazelik süresi),
  // ad, miktar + birim, yer, not. Eski kayıt (takip yok) paketli.
  const TAKIP = [['paket', 'Paketli', null, 'box'], ['taze', 'Taze', null, 'leaf']];
  const tazelikHtml = n => DG.adimlayici({ad: 'tazelik', deger: n || 3, min: 1, max: 30, birim: 'gün', aria: 'Tazelik süresi', azalt: 'Bir gün azalt', artir: 'Bir gün artır'});
  const form = u => { const taze = DD.tazeMi(u); return `<form class="dgu-yigin" data-form novalidate>
      <div class="dgu-alan" data-takip-seg><span class="dgu-etiket">Takip türü</span>${seg('Takip türü', TAKIP, taze ? 'taze' : 'paket')}</div>
      ${alan({ad: 'ad', etiket: 'Ürün adı', deger: u.ad, zorunlu: true, yer: 'Örn. Süt'})}
      <div class="dgu-yigin" data-taze ${taze ? '' : 'hidden'}>${DGTakvim.alan({ad: 'eklenme', etiket: 'Eklendiği gün', deger: u.eklenme || bugun, zorunlu: true, max: bugun})}
        <div class="dgu-alan"><span class="dgu-etiket">Tazelik süresi *</span><div data-tazelik>${tazelikHtml(u.tazelik)}</div><p class="dgu-yardim">Eklendiği günden itibaren önerilen tüketim süresi.</p></div></div>
      <div class="dgu-yigin" data-paket ${taze ? 'hidden' : ''}>${DGTakvim.alan({ad: 'skt', etiket: 'Son kullanma tarihi', deger: u.skt || '', zorunlu: true, hizli: [['3 gün', 3], ['1 hafta', 7], ['1 ay', 30]], min: bugun})}</div>
      <div class="dl-ikili">${alan({ad: 'miktar', etiket: 'Miktar', tur: 'text', deger: u.miktar, yer: 'Örn. 1'})}${DG.secAlan({ad: 'birim', etiket: 'Birim', secenekler: BIRIM.map(x => [x, x]), deger: u.birim || 'adet'})}</div>
      <div class="dgu-alan" data-yer-seg><span class="dgu-etiket">Yer</span>${seg('Yer', YER.map(([k, m]) => [k, m]), u.yer || 'buzdolabi')}</div>
      <div class="dgu-satirlar" data-paket ${taze ? 'hidden' : ''}><label class="dgu-satir"><span class="dgu-satir-metin"><span>Açıldı</span><small>Açıldıktan sonra raf ömrü kısalır; kalan gün buna göre hesaplanır.</small></span>${anahtar('acildi', u.acildi, 'Ürün açıldı')}</label></div>
      <div class="dl-ikili" data-acik ${u.acildi && !taze ? '' : 'hidden'}>${DGTakvim.alan({ad: 'acilis', etiket: 'Açılış tarihi', deger: u.acilis || bugun, max: bugun})}${alan({ad: 'acikRaf', etiket: 'Açık raf ömrü (gün)', tur: 'number', deger: u.acikRaf ?? '', yer: 'Örn. 5'})}</div>
      ${alan({ad: 'not', etiket: 'Not (isteğe bağlı)', deger: u.not || '', yer: 'Örn. Kahvaltı için'})}</form>`; };
  const segDeger = (f, k, yok) => f.querySelector(`[data-${k}-seg] [data-seg][aria-selected=true]`)?.dataset.seg || yok;
  const formOku = (f, u) => { const v = Object.fromEntries(new FormData(f)), takip = segDeger(f, 'takip', 'paket'), ortak = {...u, takip, ad: (v.ad || '').trim(), miktar: (v.miktar || '').trim(), birim: v.birim || '', yer: segDeger(f, 'yer', 'buzdolabi'), not: (v.not || '').trim()};
    return takip === 'taze' ? {...ortak, eklenme: v.eklenme || bugun, tazelik: Math.max(1, Math.round(+v.tazelik || 0)) || null, skt: null, acildi: false, acilis: null, acikRaf: null}
      : {...ortak, eklenme: null, tazelik: null, skt: v.skt || '', acildi: !!v.acildi, acilis: v.acildi ? (v.acilis || bugun) : null, acikRaf: v.acildi && v.acikRaf ? Math.max(1, Math.round(+v.acikRaf)) : null}; };
  // Takip türü görünürlüğü: Paketli → SKT + açıldı alanları; Taze → eklendiği gün + tazelik süresi.
  const takipGoster = (f, t) => { f.querySelectorAll('[data-taze]').forEach(x => { x.hidden = t !== 'taze'; }); f.querySelectorAll('[data-paket]').forEach(x => { x.hidden = t === 'taze'; }); f.querySelector('[data-acik]').hidden = t === 'taze' || !f.querySelector('input[name=acildi]').checked; };
  const takipAyarla = (f, o) => { if (!o) return; f.querySelectorAll('[data-takip-seg] [data-seg]').forEach(b => b.setAttribute('aria-selected', b.dataset.seg === o.takip)); if (o.takip === 'taze' && o.tazelik) f.querySelector('[data-tazelik]').innerHTML = tazelikHtml(o.tazelik); takipGoster(f, o.takip); };
  const formBagla = f => {
    f.addEventListener('click', e => { const s = e.target.closest('[data-seg]'); if (!s) return; s.closest('.dgu-seg').querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); if (s.closest('[data-takip-seg]')) takipGoster(f, s.dataset.seg); f.dispatchEvent(new Event('change', {bubbles: true})); });
    f.addEventListener('change', e => { if (e.target.name === 'acildi') f.querySelector('[data-acik]').hidden = !e.target.checked; });
    f.querySelector('#f-ad').maxLength = 80; f.querySelector('#f-not').maxLength = 160; f.querySelector('#f-acikRaf').min = '1'; f.querySelector('#f-acikRaf').setAttribute('inputmode', 'numeric');
  };
  const hataYaz = (f, ad, msg) => { const a = f.querySelector('#f-' + ad).closest('.dgu-alan'); a.classList.toggle('is-hata', !!msg); a.querySelector(':scope > .dgu-hata')?.remove(); if (msg) a.querySelector('.dgu-girdi').insertAdjacentHTML('afterend', `<p class="dgu-hata" role="alert">${ic(I('error'))}${esc(msg)}</p>`); };
  // Doğrulama: ad her zaman; SKT yalnız paketlide; tazede eklendiği gün + tazelik süresi.
  const dogrula = (f, u) => { const h = [], taze = u.takip === 'taze', kur = (ad, kosul, msg) => { hataYaz(f, ad, kosul ? msg : ''); if (kosul) h.push(ad); };
    kur('ad', !u.ad, 'Ürünün adını yaz.'); kur('skt', !taze && !u.skt, 'Son kullanma tarihini seç.'); kur('eklenme', taze && !u.eklenme, 'Eklendiği günü seç.');
    if (h.length) f.querySelector('#f-' + h[0]).focus(); return !h.length; };

  DG.sayfa('dolabim', ctx => {
    const D = veri(), esik = D.bildirim?.gun ?? 2;
    if (!ctx.uye) return {tur: 'alt', baslik: AD, html: misafir(), iskelet: false};

    // ---------- Ürün ekle ----------
    if (ctx.qs.has('ekle')) {
      const SIK = ['Süt', 'Yoğurt', 'Tavuk Yumurtası', 'Beyaz Peynir', 'Domates', 'Tavuk Göğsü', 'Kıyma', 'Ispanak'];
      const yeni = {ad: '', katalog: '', miktar: '1', birim: 'adet', yer: 'buzdolabi', takip: 'paket', skt: gun(7), acildi: false, acilis: null, acikRaf: null, eklenme: bugun, tazelik: 3, not: ''};
      const html = `<div class="dgu-ic dgu-yigin">
        ${DG.parcali([{ikon: 'barcode', baslik: 'Barkod okut', alt: 'Ambalajın barkodunu kameraya göster', attrs: 'data-barkod'}, {ikon: TK.modules.fridgeToRecipe.ikon, baslik: 'Fotoğrafından toplu ekle', alt: `${TK.modules.fridgeToRecipe.ad} fotoğrafındaki malzemeleri dolabına ekle`, href: TK.modules.fridgeToRecipe.sayfa + '?donus=' + DG.donusAdres()}], {aria: 'Hızlı ekleme'})}
        <section class="dgu-kart" aria-label="Katalogdan seç"><div class="dgu-yigin-8">${DG.bas('Katalogdan seç')}<p class="dgu-yardim">Dolapta Ne Var ile aynı malzeme listesi; seçtiğin ürünün görseli ve adı gelir.</p></div>
          <div class="dgu-alan"><label class="dgu-sr" for="f-ara">Malzeme ara</label><div class="dgu-girdi">${ic(I('search'))}<input id="f-ara" type="search" placeholder="Malzeme ara — örn. süt" autocomplete="off" enterkeyhint="search"><button class="dgu-ibtn dgu-temizle" type="button" data-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div></div>
          <div data-katalog></div></section>
        <section class="dgu-kart" aria-label="Ürün bilgileri"><div class="dgu-yigin-8">${DG.bas('Ürün bilgileri')}<p class="dgu-yardim">Son kullanma tarihi ambalajın üstünde; açtıysan açılış tarihini de gir.</p></div>${form(yeni)}</section></div>`;
      return {tur: 'alt', baslik: 'Ürün ekle', html, iskelet: false, bar: btn(`${AD}'a ekle`, {ikon: I('add'), attrs: 'data-kaydet'}), sonra(root) {
        const f = root.querySelector('[data-form]'), ara = root.querySelector('#f-ara'), kap = root.querySelector('[data-katalog]'); formBagla(f);
        let secili = '';
        const katCiz = () => { const q = ara.value.trim(), l = q ? katalogAra(q, 8) : SIK; ara.closest('.dgu-girdi').classList.toggle('has-text', !!q);
          kap.innerHTML = l.length ? `<div class="dgu-yigin-8"><p class="t-label c-muted">${q ? 'Bulunanlar' : 'Sık eklenenler'}</p><div class="dgu-satirlar" role="radiogroup" aria-label="Katalog">${l.map(a => `<label class="dgu-secim is-foto">${DG.kucukFoto(gorsel({ad: a}), M.ikon)}<input type="radio" name="katalog" value="${esc(a)}" ${a === secili ? 'checked' : ''}><span>${esc(a)}</span></label>`).join('')}</div></div>`
            : `<p class="dgu-yardim">Katalogda “${esc(q)}” yok; adı aşağıya yazarak ekleyebilirsin.</p>`; };
        katCiz();
        ara.addEventListener('input', katCiz);
        kap.addEventListener('change', e => { if (e.target.name !== 'katalog') return; secili = e.target.value; const a = f.querySelector('#f-ad'); a.value = secili === 'Tavuk Yumurtası' ? 'Yumurta' : secili; hataYaz(f, 'ad', ''); takipAyarla(f, DD.takipOner(secili)); });
        const doldur = x => { secili = x.katalog; takipAyarla(f, {takip: 'paket'}); f.querySelector('#f-ad').value = x.ad; f.querySelector('#f-miktar').value = x.miktar; const b = f.querySelector('input[name=birim]'); b.value = x.birim; b.closest('.dgu-secici').querySelector('span').textContent = x.birim; katCiz(); };
        // Barkod okut → doğrudan tam ekran barkod kamerası (ortak DG.kamera; Beyar 15 Ekim): izin kameranın içinde, okununca kamera kapanır
        // ve form dolar; “Listeden seç” kamerayı kapatıp katalog aramasına götürür. Kamera adres parametresi (?kamera=barkod) kapanınca silinir.
        const parametreSil = () => { const u = new URL(location.href); if (!u.searchParams.has('kamera') && !u.searchParams.has('izin')) return; u.searchParams.delete('kamera'); u.searchParams.delete('izin'); history.replaceState(null, '', u); };
        const barkodAc = izin => DG.kamera.ac({mod: 'barkod', baslik: 'Barkod okut', izin,
          barkod: () => { k.kapat(); parametreSil(); doldur({ad: 'Süt', katalog: 'Süt', miktar: '1', birim: 'L'}); DG.bildir('Barkod tanındı · Süt'); },
          liste: () => { parametreSil(); ara.scrollIntoView({block: 'center'}); ara.focus({preventScroll: true}); },
          kapat: parametreSil});
        let k = null;
        if (ctx.qs.get('kamera') === 'barkod' || ctx.qs.get('izin') === 'red') k = barkodAc(ctx.qs.get('izin') === 'red' ? 'red' : '');
        root.addEventListener('click', e => {
          if (e.target.closest('[data-temizle]')) { ara.value = ''; katCiz(); ara.focus(); return; }
          if (e.target.closest('[data-barkod]')) k = barkodAc();
        });
        document.querySelector('[data-kaydet]').addEventListener('click', () => {
          const u = formOku(f, {id: yeniId(), katalog: secili || (KATALOG.some(k => k.ad === f.querySelector('#f-ad').value.trim()) ? f.querySelector('#f-ad').value.trim() : '')}); if (!dogrula(f, u)) return;
          const v = veri(); yaz({...v, urunler: [...v.urunler, u]}); DG.bildir(`${u.ad} ${AD}'a eklendi`, {ikon: I('check')});
          setTimeout(() => { location.href = tasi('dolabim.html'); }, TK.motion.reveal * 2);
        });
      }};
    }

    // ---------- Ürün detay / düzenle ----------
    if (ctx.qs.has('urun')) {
      const u = D.urunler.find(x => x.id === ctx.qs.get('urun'));
      if (!u) return {tur: 'alt', baslik: AD, html: durum({ikon: M.ikon, baslik: 'Ürün bulunamadı', metin: 'Bu ürün tüketildi, atıldı ya da silinmiş olabilir.', tam: true, eylem: btn(`${AD}'a dön`, {href: tasi('dolabim.html')})})};
      const d = durumu(u, esik);
      const html = `<div class="dgu-ic dgu-yigin">
        <div class="dl-bas">${foto(u)}<div class="dgu-yigin-8"><h1 class="t-page">${esc(u.ad)}</h1><div class="u-yatay">${rozet(d)}<span class="t-meta c-muted">${esc(neden(u))}</span></div></div></div>
        ${d.k != null && d.k <= esik ? DG.ipucu({ikon: I('notifications'), baslik: 'Hatırlatma', metin: hatirlatma(u, d) + '.'}) : ''}
        <section class="dgu-kart" aria-label="Ürün bilgileri"><div class="dgu-yigin-8">${DG.bas('Ürün bilgileri')}<p class="dgu-yardim" data-durum role="status">Değişiklikler kendiliğinden kaydedilir.</p></div>${form(u)}</section>
        ${DG.parcali([{ikon: I('addToList'), baslik: 'Alışveriş listesine ekle', alt: 'Bitmeden yenisini al', attrs: 'data-liste'}, {ikon: TK.modules.pantryFinder.ikon, baslik: 'Bununla tarif bul', alt: `${TK.modules.pantryFinder.ad}'da ${u.katalog || u.ad} seçili açılır`, href: `${TK.modules.pantryFinder.sayfa}?malzeme=${encodeURIComponent(u.katalog || u.ad)}`}], {aria: 'Ürün eylemleri'})}</div>`;
      return {tur: 'alt', baslik: u.ad, html, iskelet: false, headerEylem: `<button class="dgu-hbtn" type="button" data-sil aria-label="Ürünü sil">${ic(I('delete'))}</button>`,
        bar: `${btn('Atıldı', {tur: 'ikincil', ikon: 'dumpster', attrs: 'data-sonuc="atildi"'})}${btn('Tüketildi', {ikon: I('check'), attrs: 'data-sonuc="tuketildi"'})}`, sonra(root) {
        const f = root.querySelector('[data-form]'); formBagla(f);
        let zaman;
        f.addEventListener('change', () => { clearTimeout(zaman); zaman = setTimeout(() => { const x = formOku(f, u); if (!dogrula(f, x)) return; const v = veri(); yaz({...v, urunler: v.urunler.map(y => y.id === u.id ? x : y)}); Object.assign(u, x); root.querySelector('[data-durum]').textContent = `Kaydedildi · ${saat()}`; }, TK.motion.base); });
        f.addEventListener('submit', e => e.preventDefault());
        const bitir = (sonuc, mesaj) => { const v = veri(); yaz({...v, urunler: v.urunler.filter(y => y.id !== u.id), gecmis: sonuc ? [...(v.gecmis || []), {ad: u.ad, sonuc, tarih: bugun}] : v.gecmis}); DG.bildir(mesaj, {ikon: I('check')}); setTimeout(() => { location.href = tasi('dolabim.html'); }, TK.motion.reveal * 2); };
        document.addEventListener('click', async e => {
          const s = e.target.closest('[data-sonuc]'); if (s) return bitir(s.dataset.sonuc, s.dataset.sonuc === 'tuketildi' ? `${u.ad} tüketildi olarak işaretlendi` : `${u.ad} atıldı olarak işaretlendi`);
          if (e.target.closest('[data-sil]')) { if (await DG.onay({baslik: `${u.ad} silinsin mi?`, metin: `Ürün ${AD}'dan kaldırılır; aylık özete sayılmaz.`, evet: 'Sil'})) bitir('', 'Ürün silindi'); return; }
          if (e.target.closest('[data-liste]')) {
            // Alışveriş listesi (dg-alisveris) biçimi profil.js ile aynı: {id, ad, miktar, reyon, tarif, isaretli}.
            if (!ORNEK) { const l = store.get('alisveris', []); if (!l.some(x => norm(x.ad) === norm(u.ad) && !x.isaretli)) store.set('alisveris', [...l, {id: yeniId(), ad: u.ad, miktar: miktarYaz(u), reyon: REYON[KATALOG.find(k => k.ad === (u.katalog || u.ad))?.grup] || 'bakkal', tarif: '', isaretli: false}]); }
            DG.bildir('Alışveriş listene eklendi', {eylem: {ad: 'Listeyi gör', href: tasi('alisveris-listesi.html')}});
          }
        });
      }};
    }

    // ---------- Bunları değerlendir ----------
    if (ctx.qs.has('degerlendir')) {
      const yak = sirali(D.urunler, esik).filter(x => x.d.k != null && x.d.k <= esik);
      const adlar = [...new Set(yak.map(x => x.u.katalog || x.u.ad))];
      const tarifler = V.tarifler.map(t => ({t, n: adlar.filter(a => kullanir(t, a)).length})).filter(x => x.n).sort((a, b) => b.n - a.n || (b.t.puan || 0) - (a.t.puan || 0)).slice(0, 6).map(x => x.t);
      const html = yak.length ? `<div class="dgu-ic dgu-yigin"><div class="dgu-yigin-8"><h1 class="t-page">Bunları değerlendir</h1><p class="dgu-yardim">Süresi yaklaşan ${yak.length} ürünün var; bozulmadan önce bunlarla pişir.</p></div>
          <ul class="dgu-satirlar" aria-label="Süresi yaklaşanlar">${yak.map(x => `<li>${urunSatir(x)}</li>`).join('')}</ul>
          ${btn(`${TK.modules.pantryFinder.ad}'da bunlarla ara`, {ikon: TK.modules.pantryFinder.ikon, href: `${TK.modules.pantryFinder.sayfa}?malzeme=${adlar.map(encodeURIComponent).join(',')}`, tam: true})}</div>
        ${tarifler.length ? `<section class="dgu-bolum">${DG.bas('Bunlarla yapabileceklerin', {html: `<span class="t-meta c-muted">${tarifler.length} tarif</span>`})}<div class="dgu-izgara">${tarifler.map(t => DG.kart(t)).join('')}</div></section>` : ''}`
        : durum({ikon: 'circle-check', baslik: 'Süresi yaklaşan ürün yok', metin: `${AD}'daki ürünlerin hepsi taze; yaklaşınca burada görünür.`, tam: true, eylem: btn(`${AD}'a dön`, {href: tasi('dolabim.html')})});
      return {tur: 'alt', baslik: 'Bunları değerlendir', html, iskelet: DG.iskelet(4)};
    }

    // ---------- Bildirim ayarları + hatırlatmalar ----------
    if (ctx.qs.has('bildirim')) {
      const B = {gun: 2, saat: '09:00', acik: true, ...(D.bildirim || {})};
      const kartlar = ctx.qs.has('kartlar');
      const liste = sirali(D.urunler, B.gun).filter(x => x.d.k != null && x.d.k <= B.gun);
      const kart = ({u, d}) => `<a class="dgu-bildirim is-okunmadi" href="${esc(tasi(`dolabim.html?urun=${encodeURIComponent(u.id)}`))}"><span class="dgu-bildirim-ikon">${ic(M.ikon)}</span><span class="dgu-bildirim-metin"><b>${esc(hatirlatma(u, d))}</b><p>${esc([miktarYaz(u), yerAd(u.yer), neden(u)].filter(Boolean).join(' · '))}</p><small>${esc(AD)} · Bugün ${esc(B.saat)}</small></span></a>`;
      const kartHtml = liste.length ? `<div class="dgu-satirlar">${liste.map(kart).join('')}</div>` : `<p class="dgu-yardim">Şu an hatırlatılacak ürün yok; süresi ${B.gun} gün kalan ürünler burada görünür.</p>`;
      if (kartlar) return {tur: 'alt', baslik: 'Hatırlatmalar', iskelet: DG.iskelet(3, 'satir'), html: `<div class="dgu-ic dgu-yigin"><div class="dgu-yigin-8"><h1 class="t-page">Hatırlatmalar</h1><p class="dgu-yardim">Her gün saat <b>${esc(B.saat)}</b>'da, süresi <b>${B.gun} gün</b> ya da daha az kalan ürünler için.</p></div>${kartHtml}${btn('Bildirim ayarları', {tur: 'ikincil', ikon: I('settings'), href: tasi('dolabim.html?bildirim=1'), tam: true})}</div>`};
      const html = `<div class="dgu-ic dgu-yigin">
        <section class="dgu-kart" aria-label="Son kullanma hatırlatmaları"><div class="dgu-satirlar"><label class="dgu-satir"><span class="dgu-satir-metin"><span>Son kullanma hatırlatmaları</span><small>Süresi yaklaşan ürünler için bildirim gönder.</small></span>${anahtar('acik', B.acik, 'Son kullanma hatırlatmaları')}</label></div>
          <div class="dgu-yigin" data-ayar ${B.acik ? '' : 'hidden'}><div class="dgu-alan"><span class="dgu-etiket">Kaç gün kala</span>${seg('Kaç gün kala', [1, 2, 3, 5, 7].map(n => [String(n), `${n} gün`]), String(B.gun))}</div>
          ${alan({ad: 'saat', etiket: 'Bildirim saati', tur: 'time', deger: B.saat})}</div>
          <p class="dgu-yardim" data-durum role="status">Ayarlar bu cihazda saklanır.</p></section>
        <section class="dgu-yigin-12" aria-label="Önizleme"><div class="dgu-yigin-8">${DG.bas('Önizleme', liste.length > 1 ? {href: tasi('dolabim.html?bildirim=1&kartlar=1'), metin: 'Tümü', aria: 'Bütün hatırlatmalar'} : undefined)}<p class="dgu-yardim">Bildirimlerin böyle görünür.</p></div>${liste.length ? `<div class="dgu-satirlar">${kart(liste.find(x => x.d.k > 0) || liste[0])}</div>` : kartHtml}</section></div>`;
      return {tur: 'alt', baslik: 'Bildirim ayarları', html, iskelet: false, sonra(root) {
        const yazB = x => { const v = veri(); yaz({...v, bildirim: {...B, ...(v.bildirim || {}), ...x}}); root.querySelector('[data-durum]').textContent = `Kaydedildi · ${saat()}`; };
        root.addEventListener('change', e => { if (e.target.name === 'acik') { root.querySelector('[data-ayar]').hidden = !e.target.checked; yazB({acik: e.target.checked}); } if (e.target.name === 'saat' && e.target.value) yazB({saat: e.target.value}); });
        root.addEventListener('click', e => { const s = e.target.closest('[data-seg]'); if (!s) return; root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); yazB({gun: +s.dataset.seg}); });
      }};
    }

    // ---------- Liste ----------
    const urunler = D.urunler;
    const headerEylem = `<a class="dgu-hbtn" href="${esc(tasi('dolabim.html?bildirim=1'))}" aria-label="Bildirim ayarları">${ic(I('notifications'))}</a>`;
    const bar = btn('Ürün ekle', {ikon: I('add'), href: tasi('dolabim.html?ekle=1')});
    if (!urunler.length) return {tur: 'alt', baslik: AD, headerEylem, iskelet: false, html: DG.durumSahne({isaret: M.ikon, baslik: `${AD} boş`, metin: `Aldığın ürünleri ekle; <b>son kullanma tarihi</b> yaklaşınca haber verelim, ellerindekiyle ne pişireceğini önerelim.`, ana: {metin: 'Ürün ekle', ikon: I('add'), href: tasi('dolabim.html?ekle=1')}, ikinciller: [{metin: 'Barkod okut', ikon: 'barcode', href: tasi('dolabim.html?ekle=1&kamera=barkod')}], ipucuBaslik: 'Nasıl çalışır?', ipuclari: [['calendar-check', 'Tarihi gir', 'Ambalajdaki son kullanma tarihini yaz ya da barkodu okut.'], ['box-open', 'Açınca işaretle', 'Açık raf ömrü kalan günü kısaltır.'], [I('notifications'), 'Zamanında haber', 'Süresi yaklaşanlar için seçtiğin saatte hatırlatma.']]})};
    const ay = bugun.slice(0, 7), buAy = (D.gecmis || []).filter(g => String(g.tarih).startsWith(ay));
    const tuk = buAy.filter(g => g.sonuc === 'tuketildi').length, at = buAy.filter(g => g.sonuc === 'atildi').length;
    const yakin = sirali(urunler, esik).filter(x => x.d.k != null && x.d.k <= esik);
    // Görünüm: Liste / Takvim (ortak DG.seg; ?gorunum=takvim, seçili gün ?gun=YYYY-MM-DD).
    const gorunum = ctx.qs.get('gorunum') === 'takvim' ? 'takvim' : 'liste';
    const html = `<div class="dgu-ic dgu-yigin"><div data-gorunum-seg>${seg('Görünüm', [['liste', 'Liste', null, 'list'], ['takvim', 'Takvim', null, 'calendar']], gorunum)}</div>
      <div class="dgu-yigin" data-gorunum="takvim" ${gorunum === 'takvim' ? '' : 'hidden'}><div data-takvim></div><section class="dgu-yigin-8" aria-live="polite" data-gun-liste></section></div>
      <div class="dgu-yigin" data-gorunum="liste" ${gorunum === 'liste' ? '' : 'hidden'}>
      <section class="dgu-kart is-gri" aria-label="Bu ay"><div class="dgu-yigin-8">${DG.bas('Bu ay', {html: `<span class="t-meta c-muted">${new Date().toLocaleDateString('tr', {month: 'long'})}</span>`})}</div>
        <dl class="dgu-istatistik" data-sutun="3">${[[urunler.length, 'ürün dolapta'], [tuk, 'tüketildi'], [at, 'atıldı']].map(([n, m]) => `<div><dd>${n}</dd><dt>${m}</dt></div>`).join('')}</dl></section>
      ${yakin.length ? DG.parcali([{ikon: I('recipes'), baslik: 'Bunları değerlendir', alt: `${yakin.length} ürünün süresi yaklaşıyor`, href: tasi('dolabim.html?degerlendir=1'), ana: true}]) : ''}
      ${seg('Yer', [['', 'Tümü'], ...YER.map(([k, m]) => [k, m])], '').replace('class="dgu-seg"', 'class="dgu-seg is-kaydir"')}
      <div class="dgu-alan"><label class="dgu-sr" for="f-q">${AD}'da ara</label><div class="dgu-girdi">${ic(I('search'))}<input id="f-q" type="search" placeholder="Ürün ara" autocomplete="off" enterkeyhint="search"><button class="dgu-ibtn dgu-temizle" type="button" data-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div></div>
      <div data-liste aria-live="polite"></div></div></div>`;
    // Ortak hâller: ?durum=bos (boş liste) · ?durum=basari (ekleme sonrası toast).
    const ortakHal = {bos: {ikon: M.ikon, baslik: `${AD} boş`, metin: 'Aldığın ürünleri ekle; son kullanma tarihi yaklaşınca haber verelim.', eylem: btn('Ürün ekle', {ikon: I('add'), href: tasi('dolabim.html?ekle=1')})}, basari: `Ürün ${AD}'a eklendi`};
    return {tur: 'alt', baslik: AD, headerEylem, bar, html, ...ortakHal, iskelet: DG.iskelet(5, 'satir'), sonra(root) {
      let yer = '', q = '';
      const kap = root.querySelector('[data-liste]'), inp = root.querySelector('#f-q'); if (!kap) return;   // ?durum=bos: ortak boş hâl çizildi
      const ciz = () => { const l = sirali(urunler.filter(u => (!yer || u.yer === yer) && (!q || norm(u.ad).includes(norm(q)))), esik);
        inp.closest('.dgu-girdi').classList.toggle('has-text', !!q);
        kap.innerHTML = l.length ? `<div class="dgu-yigin-8"><p class="t-meta c-muted">${l.length} ürün · kalan güne göre</p><ul class="dgu-satirlar">${l.map(x => `<li>${urunSatir(x)}</li>`).join('')}</ul></div>`
          : durum({ikon: q ? I('search') : M.ikon, baslik: q ? `“${q}” bulunamadı` : `${yerAd(yer)} boş`, metin: q ? 'Yazımı kontrol et ya da başka bir yere bak.' : 'Bu yerde kayıtlı ürün yok.', eylem: q ? btn('Aramayı temizle', {tur: 'ikincil', attrs: 'data-temizle'}) : btn('Ürün ekle', {tur: 'ikincil', ikon: I('add'), href: tasi('dolabim.html?ekle=1')})}); };
      ciz();
      inp.addEventListener('input', () => { q = inp.value.trim(); ciz(); });
      // Takvim: ortak DGTakvim (ay / hafta); her ürünün son gününde (SKT ya da açık raf ömrü sonu) durum noktası — ton DGDolabim.durum ile aynı.
      const T = window.DGTakvim, noktalar = {};
      urunler.forEach(u => { const g = DD.sonGun(u); if (!g) return; const t = durumu(u, esik).ton; (noktalar[g] ||= []).includes(t) || noktalar[g].push(t); });
      let gun = /^\d{4}-\d{2}-\d{2}$/.test(ctx.qs.get('gun') || '') ? ctx.qs.get('gun') : bugun, takvim = null;
      const gunCiz = () => { const l = sirali(urunler.filter(u => DD.sonGun(u) === gun), esik);
        root.querySelector('[data-gun-liste]').innerHTML = `${DG.bas(T.uzun(gun), {html: `<span class="t-meta c-muted">${l.length ? `${l.length} ürün` : ''}</span>`})}${l.length ? `<ul class="dgu-satirlar">${l.map(x => `<li>${urunSatir(x)}</li>`).join('')}</ul>` : `<p class="dgu-yardim">Bu gün son günü gelen ürün yok.</p>`}`; };
      const takvimKur = () => { if (takvim) return; takvim = T.kur(root.querySelector('[data-takvim]'), {gorunum: 'ay', gorunumSec: true, bugun, secili: gun, odak: gun, noktalar}, {sec: v => { gun = v; gunCiz(); const u = new URL(location.href); u.searchParams.set('gun', v); history.replaceState(null, '', u); }}); gunCiz(); };
      const gorunumAc = g => { root.querySelectorAll('[data-gorunum]').forEach(p => { p.hidden = p.dataset.gorunum !== g; }); root.querySelectorAll('[data-gorunum-seg] [data-seg]').forEach(b => b.setAttribute('aria-selected', b.dataset.seg === g)); if (g === 'takvim') takvimKur(); const u = new URL(location.href); if (g === 'takvim') u.searchParams.set('gorunum', 'takvim'); else { u.searchParams.delete('gorunum'); u.searchParams.delete('gun'); } history.replaceState(null, '', u); };
      if (gorunum === 'takvim') takvimKur();
      root.addEventListener('click', e => {
        const gs = e.target.closest('[data-gorunum-seg] [data-seg]'); if (gs) { gorunumAc(gs.dataset.seg); return; }
        const s = e.target.closest('[data-gorunum="liste"] [data-seg]'); if (s) { yer = s.dataset.seg; root.querySelectorAll('[data-gorunum="liste"] [data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); ciz(); return; }
        if (e.target.closest('[data-temizle]')) { q = ''; inp.value = ''; ciz(); inp.focus(); }
      });
    }};
  });
})();
