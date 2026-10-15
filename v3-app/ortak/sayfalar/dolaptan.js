/* Dolaptan Tarife (Beyar V4 madde D, docs/57 §1) — dolabının fotoğrafından yapay zekâ ile sana özel YENİ tarif.
   İskelet Tabaktan Tarif ile aynı: tanıtım / deneme / misafir sheet'leri, çek → tanı (düzelt) → tercih → üretiliyor → sonuç (+ alternatifler)
   → kaydet / paylaş · geçmiş. Ad, ikon ve Pro bilgisi tek sabitten (DGTOKENS.modules.fridgeToRecipe).
   Örnek veri: gerçek dolap fotoğrafı yok → fotoğraflar gerçek malzeme görselleridir (assets/malzeme, canlı siteden; ad → yol eşlemesi
   ortak/veri/malzeme-gorsel.json ile birebir aynı kural: Türkçe harfler sadeleşir, boşluk tire). Tanınan malzemeler DGVERI.dolapKatalog
   adlarıdır; üretilen tarif DGVERI'deki gerçek bir tarifin içeriğinden örnek yapay zekâ çıktısıdır ve detayı tabaktan-taslak.html
   (?kaynak=dolaptan) üzerinde detay-v2 diliyle açılır. Akış durumu bu sekmede (sessionStorage dg-dolaptan); kayıt Tariflerim'e
   (dg-tariflerim), geçmiş bu cihazda (dg-dolaptan-gecmis).
   Kamera (Beyar 15 Ekim, tek kamera akışı): giriş tek dokunuş — kapı (tanıtım / deneme / misafir sheet'i) varsa önce o, altında doğrudan
   ortak tam ekran kamera (DG.kamera; Tabaktan Tarif kamerasıyla aynı). Her çekimden sonra fotoğraf sayfası (?durum=fotolar: “Bir raf
   daha çek” + Malzemeleri tanı); fotoğraf yokken bu sayfa gösterilmez. Hiç çekmeden kapatılırsa modülden çıkılır. İzin reddedildi:
   kameranın içinde (?durum=kamera&izin=red; eski ?durum=izin de buraya gelir). */
(() => {
  const {ic, I, esc, btn, store} = DG;
  const V = DGVERI, M = DGTOKENS.modules?.fridgeToRecipe || {ad: 'Dolaptan Tarife', ikon: 'camera-retro', pro: true};
  const T = V.tarifler.filter(t => t.yazar);
  const KATALOG = V.dolapKatalog.flatMap(g => g.malzemeler.map(ad => ({ad, grup: g.grup})));
  const BAHARAT = 'Baharatlar, Otlar ve Soslar';
  const norm = s => String(s || '').toLocaleLowerCase('tr-TR');
  const words = s => norm(s).split(/[^a-zçğıöşüâîû]+/).filter(Boolean);
  // Dolapta Ne Var ile aynı eşleşme kuralı: kelime düzeyi, Türkçe eke toleranslı.
  const wordHit = (w, v) => v.startsWith(w) || (w.length > 4 && w.startsWith(v) && w.length - v.length <= 2);
  const esler = (ad, isim) => { const want = words(isim), have = words(ad); return want.length > 0 && want.every(w => have.some(v => wordHit(w, v))); };
  const slugla = s => norm(s).replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[âà]/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const gorsel = ad => `assets/malzeme/${slugla(ad)}.webp`;
  const katalogda = ad => KATALOG.some(k => k.ad === ad);

  // ---------- Örnek AI çıktısının kaynağı ----------
  // Dolapta duran (baharat dışı) malzemelerle en çok örtüşen gerçek tarif. Varsayılan dolap: Balkan usulü lahana sarmasının malzemeleri.
  const VARSAYILAN = T.find(t => t.slug.startsWith('duduklude-balkan-usulu-lahana-sarmasi')) || T[0];
  // Dolapta duran malzeme: en uzun katalog eşleşmesi (“Domates salçası” → Domates Salçası); kuru baharat (tuz, pul biber…) dolapta sayılmaz,
  // taze ot ve sos/salça sayılır. Su, yağ gibi temel malzemeler eksik listesine de girmez.
  const DOLAPTA_OT = /salça|sos|taze|nane|maydanoz|dereotu|fesleğen|kişniş|limon/i;
  const TEMEL = ['tuz', 'su', 'içme suyu', 'soğuk su', 'ılık su', 'sıcak su', 'karabiber', 'zeytinyağı', 'sıvı yağ', 'ayçiçek yağı', 'buz'];
  const temel = ad => TEMEL.some(x => norm(ad) === x || norm(ad).startsWith(x + ' '));
  const enIyi = ad => KATALOG.filter(x => esler(ad, x.ad)).sort((a, b) => b.ad.length - a.ad.length)[0];
  const kuruBaharat = ad => { const k = enIyi(ad); return !!k && k.grup === BAHARAT && !DOLAPTA_OT.test(k.ad); };
  const tespit = t => { const L = []; for (const m of t.malzemeler) { const k = enIyi(m.ad); if (!k || kuruBaharat(m.ad) || temel(m.ad)) continue; if (!L.some(x => x.ad === k.ad)) L.push({ad: k.ad, miktar: [m.miktar, m.birim].filter(Boolean).join(' ').replace('.', ',')}); } return L; };
  const ORNEK_MALZEME = () => { const L = tespit(VARSAYILAN).slice(0, 6); if (L.length > 1) L[L.length - 1].guven = 'dusuk'; return L; };
  const ORNEK_FOTO = () => ORNEK_MALZEME().slice(0, 3).map(m => m.ad);
  const ortak = (t, L) => L.filter(m => t.malzemeler.some(x => esler(x.ad, m.ad))).length;
  const sirala = L => T.map(t => ({t, n: ortak(t, L)})).filter(x => x.n > 0).sort((a, b) => b.n - a.n || (a.t === VARSAYILAN ? -1 : b.t === VARSAYILAN ? 1 : 0));
  const kaynakTarif = L => { const s = sirala(L); return s[0]?.n >= 3 ? s[0].t : VARSAYILAN; };

  // ---------- Akış durumu (bu sekmede) ----------
  const ss = {get(k, d) { try { const v = sessionStorage.getItem('dg-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } }, set(k, v) { try { sessionStorage.setItem('dg-' + k, JSON.stringify(v)); } catch { /* özel pencere */ } }};
  const SURE = (V.facetler.find(f => f.key === 'sure')?.options || []).map(o => o.label);
  const BESLENME = (V.facetler.find(f => f.key === 'beslenme')?.options || []).map(o => o.label).filter(x => x !== 'Glutenli').slice(0, 8);
  // Dolapta Ne Var “Alerjim Var” hızlı seçimi ile aynı ürün grupları (ortak/dg-dolap.js ALERJEN).
  const HARIC = ['Süt', 'Yumurta', 'Gluten', 'Yer fıstığı', 'Sert kabuklu yemişler', 'Soya', 'Balık', 'Kabuklu deniz ürünleri'];
  const bos = () => ({fotolar: ORNEK_FOTO(), malzemeler: ORNEK_MALZEME(), tercih: {porsiyon: VARSAYILAN.porsiyon || 4, sure: '', beslenme: [], haric: (store.get('dolap', {})?.alrH || []).filter(x => HARIC.includes(x))}});
  const durumAl = () => { const d = ss.get('dolaptan', null); return d && Array.isArray(d.malzemeler) ? d : bos(); };
  const durumYaz = d => ss.set('dolaptan', d);
  const DENEME = 3;
  const kalan = () => Math.max(0, Number(ss.get('dolaptan-deneme', DENEME)));

  // ---------- Geçmiş (bu cihaz; boşsa gerçek tariflerden kurulmuş örnek) ----------
  const GUN = 864e5;
  const ornekGecmis = () => [VARSAYILAN, ...T.filter(t => t !== VARSAYILAN && tespit(t).length >= 4).slice(0, 3)].map((t, i) => ({slug: t.slug, malzeme: tespit(t).length, ts: Date.now() - [0.2, 2, 5, 9][i] * GUN}));
  const tarihYaz = ts => new Date(ts).toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'});

  DG.sayfa('dolaptan-tarife', ctx => {
    const qs = ctx.qs, hal = qs.get('durum') === 'izin' ? 'kamera' : qs.get('durum') || 'kamera';
    const izinRed = qs.get('durum') === 'izin' || qs.get('izin') === 'red';
    const erisim = ['pro', 'uye', 'misafir'].includes(qs.get('uye')) ? qs.get('uye') : ctx.pro ? 'pro' : ctx.uye ? 'uye' : 'misafir';
    // Deneme onayı oturum boyu (dg-dolaptan-hak; Beyar kararı B, 15 Ekim); misafirde sayılmaz, hesap değişince dg-ui.js store.set siler.
    const hak = () => erisim === 'pro' || (erisim !== 'misafir' && ss.get('dolaptan-hak', false));
    // Galeri hâlleri: uye · deneme · misafir · limit tanıtım/kapı; diğerleri akış ekranları.
    const kapi = {uye: 'uye', deneme: 'deneme', misafir: 'misafir'}[hal] || (hal === 'kamera' && !hak() ? (erisim === 'misafir' ? 'misafir' : 'deneme') : '');
    const ekran = kapi ? 'kamera' : hal;
    const git = (d, ek = {}) => { const u = new URL(location.href); [...u.searchParams.keys()].filter(k => !['uye', 'oturum', 'donus'].includes(k)).forEach(k => u.searchParams.delete(k)); u.searchParams.set('durum', d); Object.entries(ek).forEach(([k, v]) => u.searchParams.set(k, v)); return u.pathname.split('/').pop() + u.search; };
    const S = durumAl();
    const gecmisBtn = `<a class="dgu-hbtn" href="${esc(git('gecmis'))}" aria-label="${esc(M.ad)} geçmişi">${ic('clock-rotate-left')}</a>`;
    const ortakAlan = {tur: 'alt', baslik: M.ad, iskelet: false, offlineIcerik: false, headerEylem: hal === 'gecmis' ? '' : gecmisBtn, menuAktif: 'find'};
    // Ortak foto şeridi (DG.fotoSerit) ve kamera vizörü (DG.vizor).
    const fotoSerit = (fotolar, silinir) => fotolar.length ? DG.fotoSerit(fotolar.map((ad, i) => ({src: gorsel(ad), silAttrs: `data-dt-foto-sil="${i}"`})), {aria: 'Çektiğin fotoğraflar', sil: silinir}) : '';

    // ===== Hata ve kenar hâlleri: ortak durum sahnesi =====
    const FOTO_IPUCU = [['sun', 'İyi ışıkta çek', 'Buzdolabının ışığı yeterli değilse oda ışığını aç.'], ['table-cells', 'Rafları ayrı çek', 'Her raf bir fotoğraf; birden çok fotoğraf ekleyebilirsin.'], ['tag', 'Etiketler görünsün', 'Paket ve kavanozları önü sana dönük diz.']];
    const SAHNE = {
      bulanik: {tema: 'koyu', gorsel: '../' + gorsel(S.fotolar[0] || 'Lahana'), isaret: 'bulanik', baslik: 'Fotoğraf biraz bulanık', metin: 'Kamerayı <b>sabit tutup</b> yeniden çek; malzemeleri net görünce tanırız.', not: 'Fotoğrafların bu cihazda duruyor',
        ana: {metin: 'Yeniden çek', ikon: 'camera', href: git('kamera')}, ipucuBaslik: 'Net bir fotoğraf için', ipuclari: FOTO_IPUCU},
      bulunamadi: {tema: 'koyu', isaret: 'soru', baslik: 'Malzeme bulamadık', metin: 'Fotoğrafta tanıyabildiğimiz bir malzeme yok. <b>Yeniden çek</b> ya da malzemeleri <b>elle ekle</b>.',
        ana: {metin: 'Yeniden çek', ikon: 'camera', href: git('kamera')}, ikinciller: [{metin: 'Malzemeleri elle ekle', ikon: I('add'), attrs: 'data-dt-elle'}], ipucuBaslik: 'Daha iyi bir fotoğraf için', ipuclari: FOTO_IPUCU},
      az: {tema: 'acik', isaret: 'uyari', baslik: 'Biraz daha malzeme gerekli', metin: `Şu an <b>${Math.min(2, S.malzemeler.length)} malzeme</b> var. Bir tarif için <b>en az 3 malzeme</b> ekle.`,
        ana: {metin: 'Malzeme ekle', ikon: I('add'), href: git('tanima', {ekle: 1})}, ikinciller: [{metin: 'Yeniden çek', ikon: 'camera', href: git('kamera')}]},
      limit: {tema: 'acik', isaret: 'hourglass-end', baslik: 'Bugünkü hakkını kullandın', metin: erisim === 'pro' ? 'Günlük üretim sınırına ulaştın. <b>Yeni hakkın yarın</b> açılır; o zamana kadar geçmişindeki tariflere bakabilirsin.' : 'Ücretsiz deneme hakların bitti. <b>Pro</b> ile her gün dolabından yeni tarifler üretebilirsin.',
        ana: erisim === 'pro' ? {metin: 'Geçmişime git', ikon: 'clock-rotate-left', href: git('gecmis')} : {metin: "Pro'ya geç", ikon: I('pro'), href: 'pro.html?donus=' + DG.donusAdres()},
        ikinciller: [{metin: 'Dolapta Ne Var ile ara', ikon: I('pantry'), href: 'dolapta-ne-var.html'}]}
    };
    if (SAHNE[ekran]) return {...ortakAlan, html: DG.durumSahne(SAHNE[ekran]), sonra: baglaOrtak};
    if (ekran === 'baglanti') return {...ortakAlan, html: DG.hata('baglanti-yok', true), sonra: baglaOrtak};

    // ===== Geçmiş =====
    if (ekran === 'gecmis') {
      const L = qs.has('bos') ? [] : (store.get('dolaptan-gecmis', []).length ? store.get('dolaptan-gecmis', []) : ornekGecmis()).filter(x => DG.tarif(x.slug));
      if (!L.length) return {...ortakAlan, baslik: 'Geçmiş', html: DG.durum({ikon: 'clock-rotate-left', baslik: 'Henüz tarif üretmedin', metin: 'Dolabının fotoğrafını çek; ürettiğin tarifler burada birikir.', eylem: btn('Dolabını çek', {ikon: 'camera', href: git('kamera')}), tam: true})};
      return {...ortakAlan, baslik: 'Geçmiş', html: `<div class="dgu-ic dgu-yigin dt-govde">${DG.bas('Ürettiğin tarifler')}<div class="dgu-satirlar">${L.map(x => { const t = DG.tarif(x.slug); return `<a class="dgu-satir" href="${esc(taslakAdres(t, erisim))}">${DG.kucukFoto(t.gorsel)}<span class="dgu-satir-metin"><span class="clamp-2">${esc(t.kisa)}</span><small>${x.malzeme} malzemeden · ${esc(tarihYaz(x.ts))}</small></span>${ic(I('rowNext'))}</a>`; }).join('')}</div>${btn('Yeni tarif üret', {ikon: M.ikon, href: git('kamera'), tam: true})}</div>`};
    }

    // ===== Tanıma: algılanan malzemeler (düzenlenebilir) =====
    if (ekran === 'tanima') {
      const satir = (m, i) => `<div class="dgu-satir-kap" data-dt-satir="${i}"><div class="dgu-satir">${DG.kucukFoto(katalogda(m.ad) ? gorsel(m.ad) : '', 'basket-shopping')}<span class="dgu-satir-metin"><span>${esc(m.ad)}</span><small class="dt-meta">${m.miktar ? esc(m.miktar) : 'Miktar yok'}${m.guven === 'dusuk' ? DG.durumRozet('dusuk', {ad: 'Emin değiliz', ton: 'uyari', ikon: 'circle-question'}) : ''}</small></span></div><button class="dgu-ibtn" type="button" data-dt-miktar="${i}" aria-label="${esc(m.ad)} miktarını düzenle">${ic('pen')}</button><button class="dgu-ibtn" type="button" data-dt-sil="${i}" aria-label="${esc(m.ad)} kaldır">${ic(I('close'))}</button></div>`;
      const html = `<div class="dgu-ic dgu-yigin dt-govde">
        <div>${DG.bas('Dolabında bunları gördük')}<p class="dgu-yardim">Yanlışsa düzelt: kaldır, ekle ya da miktarı değiştir. Emin olmadıklarımızı işaretledik.</p></div>
        ${fotoSerit(S.fotolar, false)}
        <section aria-label="Tanınan malzemeler">${DG.bas('Malzemeler', {html: `<span class="dgu-yardim" data-dt-sayi>${S.malzemeler.length} malzeme</span>`})}<div class="dgu-satirlar" data-dt-liste>${S.malzemeler.map(satir).join('')}</div></section>
        <form class="dgu-girdi" data-dt-ekle role="search">${ic(I('add'))}<input type="search" name="ad" list="dt-katalog" placeholder="Malzeme ekle: örn. yoğurt" aria-label="Malzeme ekle" autocomplete="off" enterkeyhint="done"><button class="dgu-ibtn" type="submit" aria-label="Ekle">${ic(I('check'))}</button></form>
        <datalist id="dt-katalog">${KATALOG.map(k => `<option value="${esc(k.ad)}">`).join('')}</datalist>
      </div>`;
      return {...ortakAlan, html, bar: btn('Devam', {ikon: 'arrow-right', attrs: 'data-dt-devam'}), sonra(root) {
        const liste = root.querySelector('[data-dt-liste]'), sayi = root.querySelector('[data-dt-sayi]');
        const ciz = () => { liste.innerHTML = S.malzemeler.map(satir).join(''); sayi.textContent = `${S.malzemeler.length} malzeme`; durumYaz(S); };
        if (qs.has('ekle')) requestAnimationFrame(() => root.querySelector('[data-dt-ekle] input')?.focus());
        root.querySelector('[data-dt-ekle]').addEventListener('submit', e => {
          e.preventDefault(); const inp = e.target.ad, v = inp.value.trim(); if (!v) { inp.focus(); return; }
          const ad = KATALOG.find(k => norm(k.ad) === norm(v))?.ad || v.charAt(0).toLocaleUpperCase('tr-TR') + v.slice(1);
          if (S.malzemeler.some(m => norm(m.ad) === norm(ad))) { DG.bildir(`${ad} zaten listede`); return; }
          S.malzemeler.push({ad, miktar: ''}); inp.value = ''; ciz(); DG.bildir(`${ad} eklendi`);
        });
        // Alt çubuk (.dgu-bar) sayfa kökünün dışındadır: olaylar belgeden dinlenir.
        document.addEventListener('click', e => {
          const s = e.target.closest('[data-dt-sil]');
          if (s) { const i = +s.dataset.dtSil, once = [...S.malzemeler], ad = S.malzemeler[i].ad; S.malzemeler.splice(i, 1); ciz(); DG.bildir(`${ad} kaldırıldı`, {eylem: {ad: 'Geri al', fn: () => { S.malzemeler = once; ciz(); }}}); return; }
          const m = e.target.closest('[data-dt-miktar]');
          if (m) { const i = +m.dataset.dtMiktar, x = S.malzemeler[i];
            const d = DG.sheet({baslik: x.ad, govde: DG.alan({ad: 'dt-miktar', etiket: 'Miktar', yer: 'Örn. 300 g, 2 adet', deger: x.miktar || ''}), ayak: `<div class="dgu-ikili">${btn('Vazgeç', {tur: 'ikincil', attrs: 'data-kapat'})}${btn('Kaydet', {attrs: 'data-dt-miktar-kaydet'})}</div>`});
            d.querySelector('[data-dt-miktar-kaydet]').addEventListener('click', () => { x.miktar = d.querySelector('#f-dt-miktar').value.trim(); delete x.guven; d.kapat(); ciz(); DG.bildir('Miktar güncellendi'); });
            return; }
          if (e.target.closest('[data-dt-devam]')) location.href = git(S.malzemeler.length < 3 ? 'az' : 'tercih');
        });
      }};
    }

    // ===== Tercih: porsiyon, süre, beslenme, hariç tutulanlar =====
    if (ekran === 'tercih') {
      const P = S.tercih;
      const cip = (grup, deger, ad, secili, ikon = '') => `<button class="dgu-chip" type="button" data-dt-cip="${grup}" data-deger="${esc(deger)}" aria-pressed="${secili}">${ikon ? ic(ikon) : ''}${esc(ad)}</button>`;
      const html = `<div class="dgu-ic dgu-yigin dt-govde">
        <div>${DG.bas('Tarifin nasıl olsun?')}<p class="dgu-yardim">Seçimlerin tarife uygulanır; istersen boş bırak.</p></div>
        <section aria-label="Porsiyon">${DG.bas('Porsiyon')}${DG.adimlayici({ad: 'porsiyon', deger: P.porsiyon, min: 1, max: 12, birim: 'kişilik', aria: 'Porsiyon', azalt: 'Porsiyonu azalt', artir: 'Porsiyonu artır'})}</section>
        <section aria-label="Süre">${DG.bas('Süre')}<div class="u-yatay" role="radiogroup" aria-label="Süre">${[['', 'Fark etmez'], ...SURE.map(s => [s, s])].map(([k, m]) => cip('sure', k, m, P.sure === k)).join('')}</div></section>
        <section aria-label="Beslenme tercihi">${DG.bas('Beslenme tercihi')}<div class="u-yatay">${BESLENME.map(b => cip('beslenme', b, b, P.beslenme.includes(b))).join('')}</div></section>
        <section aria-label="Hariç tutulanlar"><div>${DG.bas('Hariç tutulanlar')}<p class="dgu-yardim">Dolapta Ne Var'da işaretlediğin alerjenler burada da seçili gelir.</p></div><div class="u-yatay">${HARIC.map(h => cip('haric', h, h, P.haric.includes(h), 'ban')).join('')}</div></section>
      </div>`;
      return {...ortakAlan, html, bar: btn('Tarifimi oluştur', {ikon: 'wand-magic-sparkles', attrs: 'data-dt-uret'}), sonra(root) {
        root.addEventListener('dg-adim', e => { P.porsiyon = e.detail; durumYaz(S); });
        document.addEventListener('click', e => {
          const c = e.target.closest('[data-dt-cip]');
          if (c) { const g = c.dataset.dtCip, v = c.dataset.deger;
            if (g === 'sure') { P.sure = v; root.querySelectorAll('[data-dt-cip=sure]').forEach(b => b.setAttribute('aria-pressed', b === c)); }
            else { P[g] = P[g].includes(v) ? P[g].filter(x => x !== v) : [...P[g], v]; c.setAttribute('aria-pressed', P[g].includes(v)); }
            durumYaz(S); return; }
          if (e.target.closest('[data-dt-uret]')) { durumYaz(S); location.href = git('uretiliyor'); }
        });
      }};
    }

    // ===== Üretiliyor =====
    if (ekran === 'uretiliyor') {
      const ADIM = ['Malzemelerin eşleştiriliyor…', 'Tercihlerin uygulanıyor…', 'Tarifin yazılıyor…'];
      const html = `<div class="dgu-sahne is-koyu">${DG.vizor({foto: '../' + gorsel(S.fotolar[0] || S.malzemeler[0]?.ad || 'Lahana'), isaret: 'wand-magic-sparkles', tarama: true, ek: fotoSerit(S.fotolar, false)})}
        <div class="dgu-sahne-panel"><div class="dgu-sahne-metin"><h1 class="t-page">Tarifin hazırlanıyor</h1><p data-dt-adim role="status">${ADIM[0]}</p></div>${DG.ilerleme(1, 3, {etiket: `${S.malzemeler.length} malzeme · ${S.tercih.porsiyon} kişilik`, deger: '1 / 3'})}${btn('İptal', {tur: 'ikincil', href: git('tercih'), tam: true})}</div></div>`;
      return {...ortakAlan, html, sonra(root) {
        const p = root.querySelector('[data-dt-adim]'), bar = root.querySelector('progress'), deger = root.querySelector('.dgu-ilerleme-bas b');
        const sabit = navigator.webdriver || window.top !== window || qs.has('kal');
        ADIM.forEach((m, i) => i && setTimeout(() => { if (sabit) return; p.textContent = m; bar.value = i + 1; if (deger) deger.textContent = `${i + 1} / 3`; }, i * 1100));
        if (!sabit) setTimeout(() => { kaydetGecmis(kaynakTarif(S.malzemeler), S.malzemeler.length); location.replace(git('sonuc')); }, ADIM.length * 1100);
      }};
    }

    // ===== Sonuç: Senin tarifin / Alternatifler =====
    if (ekran === 'sonuc') {
      const t = kaynakTarif(S.malzemeler), alt = sirala(S.malzemeler).filter(x => x.t !== t).slice(0, 6).map(x => x.t);
      const sekme = qs.get('sekme') === 'alternatif' ? 'alternatif' : 'tarif';
      const kayitli = qs.has('kayit') || store.get('tariflerim', []).some(x => x.id === 'dolaptan-' + t.slug);
      const kullanilan = S.malzemeler.filter(m => t.malzemeler.some(x => esler(x.ad, m.ad)));
      const eksik = t.malzemeler.filter(x => !S.malzemeler.some(m => esler(x.ad, m.ad)) && !temel(x.ad)).map(x => x.ad).filter((x, i, a) => a.indexOf(x) === i).slice(0, 6);
      const meta = [`${t.dakika} dk`, t.zorluk, `${S.tercih.porsiyon} kişilik`].filter(Boolean);
      const tarifPanel = `<div class="dgu-yigin">
        ${DG.ipucu({ikon: 'wand-magic-sparkles', baslik: 'Yapay zekâ ile oluşturuldu', metin: `Dolabındaki ${S.malzemeler.length} malzemeden yalnız sana özel hazırlandı. Ölçüler tahmini; pişirmeden önce kontrol et.`})}
        <article class="dgu-kart dt-tarif"><a class="dgu-medya dt-tarif-foto" href="${esc(taslakAdres(t, erisim))}" style="background-image:url('../${esc(t.gorsel)}')" aria-label="${esc(t.kisa)} tarifini aç"></a>
          <div class="dgu-yigin-8"><h2 class="t-sub clamp-2">${esc(t.kisa)}</h2><p class="dgu-sayaclar">${meta.map(x => `<span>${esc(x)}</span>`).join('')}</p></div>
          <section aria-label="Kullandığın malzemeler"><p class="dgu-yardim"><b>${kullanilan.length} malzemen</b> kullanıldı</p>${DG.fotoSerit(kullanilan.map(m => ({src: gorsel(m.ad), ad: m.ad})), {aria: 'Kullandığın malzemeler', sil: false})}</section>
          ${eksik.length ? `<section aria-label="Eksik olabilir"><p class="dgu-yardim">Evde yoksa alışveriş listene ekleyebilirsin:</p><div class="u-yatay">${eksik.map(x => `<button class="dgu-chip" type="button" data-dt-liste="${esc(x)}" aria-pressed="${store.get('alisveris', []).some(a => a.ad === x && a.tarif === t.slug)}">${ic('cart-plus')}${esc(x)}</button>`).join('')}</div></section>` : ''}
          ${btn('Tarifi aç', {ikon: I('recipes'), href: taslakAdres(t, erisim), tam: true})}
        </article>
        <div class="dgu-ikili">${kayitli ? btn('Kaydedildi', {tur: 'tonlu', ikon: I('check'), href: 'tariflerim.html', attrs: `aria-label="Kaydedildi · Tariflerim'de aç"`}) : btn('Kaydet', {tur: 'ikincil', ikon: I('save'), attrs: 'data-dt-kaydet'})}${btn('Paylaş', {tur: 'ikincil', ikon: I('share'), attrs: 'data-dt-paylas'})}</div>
        ${kayitli ? DG.ipucu({ikon: I('check'), baslik: "Tariflerim'e kaydedildi", metin: 'Taslağın yalnız sende; dilediğinde düzenleyip editöre gönderebilirsin.'}) : ''}
        ${btn('Yeniden oluştur', {tur: 'metin', ikon: 'rotate-right', href: git('tercih')})}
      </div>`;
      const altPanel = alt.length ? `<div class="dgu-yigin"><div>${DG.bas('Dolabındaki malzemelerle')}<p class="dgu-yardim">DadaGastro'daki denenmiş tarifler; en çok ortak malzemesi olan önce.</p></div><div class="dgu-izgara">${alt.map(x => DG.kart(x)).join('')}</div></div>` : DG.durum({ikon: I('search'), baslik: 'Alternatif tarif bulunamadı', metin: 'Malzeme ekleyince DadaGastro\'daki tariflerden öneriler çıkar.'});
      const html = `<div class="dgu-ic dgu-yigin dt-govde">${DG.seg('Sonuç', [['tarif', 'Senin tarifin'], ['alternatif', 'Alternatifler', alt.length]], sekme)}<div data-dt-panel="tarif"${sekme === 'tarif' ? '' : ' hidden'}>${tarifPanel}</div><div data-dt-panel="alternatif"${sekme === 'alternatif' ? '' : ' hidden'}>${altPanel}</div></div>`;
      return {...ortakAlan, html, sonra(root) {
        root.addEventListener('click', e => {
          const s = e.target.closest('[data-seg]');
          if (s) { root.querySelectorAll('[data-seg]').forEach(b => b.setAttribute('aria-selected', b === s)); root.querySelectorAll('[data-dt-panel]').forEach(p => { p.hidden = p.dataset.dtPanel !== s.dataset.seg; }); const u = new URL(location.href); s.dataset.seg === 'alternatif' ? u.searchParams.set('sekme', 'alternatif') : u.searchParams.delete('sekme'); history.replaceState(null, '', u); window.DGCard?.veils?.(); return; }
          if (e.target.closest('[data-dt-kaydet]')) {
            if (erisim === 'misafir') return DG.kapi('kaydet', 'devam');
            const l = store.get('tariflerim', []).filter(x => x.id !== 'dolaptan-' + t.slug);
            store.set('tariflerim', [{id: 'dolaptan-' + t.slug, durum: 'taslak', kaynak: 'dolaptan', kapak: t.gorsel, ad: t.kisa, kategori: t.kategori, kategoriler: [t.kategori], aciklama: t.aciklama || '', porsiyon: String(S.tercih.porsiyon), birim: t.birim || 'kişilik', malzemeler: t.malzemeler.map(m => ({tur: 'malzeme', miktar: String(m.miktar ?? ''), birim: m.birim || '', ad: m.ad})), adimlar: [], adim: 2, guncel: Date.now()}, ...l]);
            DG.bildir("Taslak Tariflerim'e kaydedildi", {eylem: {ad: 'Gör', href: 'tariflerim.html'}});
            location.replace(git('sonuc', {kayit: 1})); return;
          }
          const al = e.target.closest('[data-dt-liste]');
          if (al) { if (erisim === 'misafir') return DG.kapi('liste', 'devam'); const ad = al.dataset.dtListe, l = store.get('alisveris', []); if (l.some(a => a.ad === ad && a.tarif === t.slug)) { DG.bildir(`${ad} zaten alışveriş listende`); return; }
            const m = t.malzemeler.find(x => x.ad === ad) || {}; store.set('alisveris', [...l, {id: Math.random().toString(36).slice(2, 9), ad, miktar: [m.miktar, m.birim].filter(Boolean).join(' '), tarif: t.slug, isaretli: false}]); al.setAttribute('aria-pressed', 'true');
            DG.bildir(`${ad} alışveriş listene eklendi`, {eylem: {ad: 'Listeyi aç', href: 'alisveris-listesi.html'}}); return; }
          if (e.target.closest('[data-dt-paylas]')) DG.paylas({baslik: `${t.kisa} · ${M.ad}`, url: new URL(taslakAdres(t, erisim), location.href).href});
        });
      }};
    }

    // ===== Kamera (giriş) ve fotoğraflar (“Bir raf daha çek”) + tanıtım, deneme, misafir sheet'leri =====
    // Kamera girişi yeni bir çekim başlatır (fotoğraflar boşalır); ilk çekimden sonra fotoğraf sayfası açılır (geçmişe kayıt düşmez).
    const engel = () => { if (hak()) return false; erisim === 'misafir' ? girisKapi() : tanitim(kalan() ? 'deneme' : 'bitti'); return true; };
    const ekle = n => { const havuz = ORNEK_MALZEME().map(m => m.ad).filter(a => !S.fotolar.includes(a)); for (let i = 0; i < n && havuz[i]; i++) S.fotolar.push(havuz[i]); if (!havuz.length) DG.bildir('En çok 6 fotoğraf ekleyebilirsin'); durumYaz(S); };
    // Canlı görüntü yerine örnek: raflı mutfak fotoğrafı (hazır menü görseli); galeri düğmesinde son fotoğraf (Tabaktan gibi gerçek tarif görseli).
    const kameraAc = ({izin, cekti, kapat}) => DG.kamera.ac({mod: 'foto', baslik: M.ad, rozet: M.pro && erisim === 'pro' ? 'Pro' : '', izin, onizleme: '../assets/hazir-menu/1282.webp', galeriFoto: '../' + T[0].gorsel,
      yonerge: 'Dolabını ya da tezgâhını çerçeveye al', izinMetin: 'Dolabının fotoğrafını çekmek için <b>kamera izni</b> gerekir. <b>Galeriden de</b> seçebilirsin.', izinDonus: `${M.ad} kamerası açılır.`,
      cek: () => { if (engel()) return; ekle(1); cekti('Fotoğraf eklendi'); }, galeri: () => { if (engel()) return; ekle(2); cekti('Galeriden 2 fotoğraf eklendi'); }, kapat});
    // Kapı sheet'lerinin düğmeleri (kamera ve fotoğraf sayfasında ortak).
    const kapiBagla = () => document.addEventListener('click', e => {
      if (e.target.closest('[data-dt-deneme]')) { const k = kalan(); if (!k) { tanitim('bitti'); return; } ss.set('dolaptan-deneme', k - 1); ss.set('dolaptan-hak', true); e.target.closest('dialog')?.kapat?.(); DG.bildir(`Deneme hakkın kullanıldı · ${k - 1} hakkın kaldı`); return; }
      if (e.target.closest('[data-dt-simdilik]')) { e.target.closest('dialog')?.kapat?.(); DG.geri(); }
    });
    if (ekran === 'kamera') {
      S.fotolar = []; durumYaz(S);
      return {tur: 'tam', baslik: M.ad, iskelet: false, offlineIcerik: false, html: '', sonra() {
        kapiBagla();
        kameraAc({izin: izinRed ? 'red' : '', cekti: () => location.replace(git('fotolar')), kapat: () => DG.geri()});
        if (kapi === 'misafir') girisKapi(); else if (kapi === 'uye') tanitim('uye'); else if (kapi === 'deneme') tanitim(kalan() ? 'deneme' : 'bitti');
      }};
    }
    if (!S.fotolar.length) { location.replace(git('kamera')); return {tur: 'tam', baslik: M.ad, iskelet: false, html: ''}; }
    const html = `<div class="dgu-sahne is-koyu">${DG.vizor({isaret: M.ikon, yonerge: {ikon: 'table-cells', metin: 'Dolabını ya da tezgâhını çerçeveye al'}})}
      <div class="dgu-sahne-panel"><div class="dgu-sahne-metin"><h1 class="t-page">Dolabının fotoğrafını çek</h1><p>Rafları ayrı ayrı çekebilirsin; <b>bütün fotoğraflardaki malzemeleri</b> birlikte tanırız.</p></div>
        <section class="dgu-yigin-12" aria-label="Fotoğraflar" data-dt-fotolar>${fotoBolum(S.fotolar)}</section>
        <div class="dgu-sahne-eylem">${btn('Bir raf daha çek', {tur: 'tonlu', ikon: 'camera', attrs: 'data-dt-cek', tam: true})}${btn('Galeriden seç', {tur: 'ikincil', ikon: 'images', attrs: 'data-dt-galeri', tam: true})}</div></div></div>`;
    return {...ortakAlan, html, bar: btn('Malzemeleri tanı', {ikon: 'arrow-right', attrs: 'data-dt-tani'}), sonra(root) {
      const fEl = root.querySelector('[data-dt-fotolar]');
      const yenile = () => { if (!S.fotolar.length) { location.replace(git('kamera')); return; } fEl.innerHTML = fotoBolum(S.fotolar); durumYaz(S); };
      kapiBagla();
      document.addEventListener('click', e => {
        if (e.target.closest('[data-dt-cek]')) { if (!engel()) { const k = kameraAc({cekti: m => { k.kapat(); yenile(); DG.bildir(m); }}); } return; }
        if (e.target.closest('[data-dt-galeri]')) { if (!engel()) { ekle(2); yenile(); DG.bildir('Galeriden 2 fotoğraf eklendi'); } return; }
        const s = e.target.closest('[data-dt-foto-sil]'); if (s) { S.fotolar.splice(+s.dataset.dtFotoSil, 1); durumYaz(S); yenile(); return; }
        if (e.target.closest('[data-dt-tani]')) { if (engel()) return; location.href = git('tanima'); }
      });
    }};

    function fotoBolum(fotolar) {
      return `${DG.bas('Fotoğrafların', {html: `<span class="dgu-yardim">${fotolar.length} / 6</span>`})}${fotoSerit(fotolar, true)}`;
    }
    // Tanıtım · Pro kapısı ve ücretsiz deneme (Tabaktan ile aynı sheet): fark cümlesi, yan yana 3 adım, deneme notu + tam genişlik düğme, ikili eylem.
    function tanitim(mod) {
      const bitti = mod === 'bitti', deneme = mod === 'deneme';
      DG.sheet({baslik: M.ad + (bitti ? ' · Deneme hakların bitti' : ''), govde: `<div class="dgu-yigin">${M.pro ? `<span class="dgu-rozet dt-pro">${ic(I('pro'))}Pro</span>` : ''}<p>Dolapta Ne Var elle seçtiğin malzemelerle sitedeki mevcut tarifleri bulur; <b>${esc(M.ad)}</b> dolabının fotoğrafından sana özel <b>yeni bir tarif</b> üretir.</p>${DG.parcali([{ikon: 'camera', baslik: 'Çek', bilgi: true}, {ikon: 'pen', baslik: 'Düzelt', bilgi: true}, {ikon: 'utensils', baslik: 'Tarifin hazır', bilgi: true}], {kutu: 'yatay', aria: `${M.ad} nasıl çalışır`})}${deneme ? `<p>${kalan()} ücretsiz deneme hakkın kaldı.</p>${btn(`${DENEME} ücretsiz denemenden 1'ini kullan`, {attrs: 'data-dt-deneme', tam: true})}` : ''}</div>`,
        ayak: `<div class="dgu-ikili">${btn('Şimdilik değil', {tur: 'ikincil', attrs: 'data-dt-simdilik'})}${btn("Pro'ya geç", {href: 'pro.html?donus=' + DG.donusAdres()})}</div>`});
    }
    // Misafir: giriş kapısı parçalı liste; giriş/kayıttan dönüşte akış kaldığı yerden sürer (B7).
    function girisKapi() {
      const p = `donus=${DG.donusAdres()}&eylem=devam`;
      DG.sheet({baslik: 'Bu işlem için giriş yap', govde: `<div class="dgu-yigin"><p>${esc(M.ad)} ile devam etmek ve tarifini kaydetmek için giriş yap.</p>${DG.parcali([{ikon: I('login'), baslik: 'Giriş Yap', alt: `Hesabınla gir, ${M.ad}'ye geri dön.`, href: 'giris.html?' + p, ana: true}, {ikon: 'user-plus', baslik: 'Üye Ol', alt: 'Ücretsiz hesap aç, devam et.', href: 'kayit.html?' + p}, {ikon: I('close'), baslik: 'Şimdilik değil', attrs: 'data-dt-simdilik'}], {aria: 'Giriş seçenekleri'})}</div>`});
    }
    function baglaOrtak(root) {
      root.addEventListener('click', e => { if (e.target.closest('[data-dt-elle]')) { S.malzemeler = []; durumYaz(S); location.href = git('tanima', {ekle: 1}); } });
    }
  });

  // Detay: tabaktan-taslak.html (detay-v2 + taslak farkları) kaynak=dolaptan ile; kapak gerçek tarif görseli.
  function taslakAdres(t, erisim) { return `../tabaktan-taslak.html?kaynak=dolaptan&tarif=${encodeURIComponent(t.slug)}&uye=${encodeURIComponent(erisim === 'misafir' ? 'uye' : erisim)}`; }
  function kaydetGecmis(t, n) { const l = store.get('dolaptan-gecmis', []).filter(x => x.slug !== t.slug); store.set('dolaptan-gecmis', [{slug: t.slug, malzeme: n, ts: Date.now()}, ...l].slice(0, 20)); }
})();
