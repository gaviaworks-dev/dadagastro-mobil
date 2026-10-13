/* Açılış ve tanıtım (docs/52 G7, docs/54 §1–3, docs/57). Beyar kararı 5: tek ekran karşılama + isteğe bağlı, atlanabilir tercihler.
   Gerçek akış (Revize V2 C1, 13 Ekim): acilis.html (Kolaj) → karsilama.html (Perde/vitrin) → tercihler.html (Profil vitrini) → ../ana-v3.html.
   Seçilmeyen alternatifler (Sahne, Hikâye, Bento, Adım adım, Koyu) V1 yedeğinde: eski/v3-app-v1-yedek-20261013/ortak/sayfalar/acilis.js.
   Görseller yalnız DGVERI'den (tarif, kategori, püf görselleri, bayraklar); metinler gerçek özelliklerden; sayaçlar DGVERI.istatistik.
   Tercihler yalnız bu cihazda: DG.store('tercih') {mutfak[], diyet[], alerjen[], seviye, kategori[]}; bitince store ilk = 'tamam'.
   Adres parametreleri: ?kal=1 açılışta otomatik geçişi durdurur (test/galeri); galeri çerçevesinde açılış son karede kalır.
   ?donus= (kayıt sonrası “Mutfak Profilim”den gelen) tercihler bitince ya da atlanınca o adrese döner.
   İzin istemleri (bildirim, kamera) bu dosyanın sonunda. */
(() => {
  const {ic, I, btn, esc, store} = DG;
  const V = DGVERI, TK = DGTOKENS.motion;
  const azalt = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cerceve = (() => { try { return window.top !== window; } catch { return true; } })();
  const LOGO = '../assets/marka/dadagastro-beyaz.svg';
  const url = g => `../${esc(g)}`;
  const foto = (g, cls = '') => `<div class="ac-foto ${cls}" style="background-image:url('${url(g)}')" aria-hidden="true"></div>`;
  const isik = '<div class="ac-isik" aria-hidden="true"></div>';
  const tarif = on => V.tarifler.find(t => t.slug.startsWith(on)) || V.tarifler[0];
  const st = Object.fromEntries(V.istatistik.map(s => [s.label, s.value]));
  const dolapSayi = V.dolapKatalog.reduce((n, g) => n + g.malzemeler.length, 0);
  const koyuGovde = () => { document.body.classList.add('ac-koyu-govde'); document.getElementById('dgu')?.classList.add('ac-app'); };
  // Dönüş adresi (giriş/kayıt ile aynı biçim): uygulama/… aynı klasör, değilse kök ekran.
  const donusHedef = qs => { const d = qs.get('donus'); return d ? (d.startsWith('uygulama/') ? d.slice(9) : '../' + d) : DG.KOK.ana; };
  const bitir = (hedef = DG.KOK.ana) => { store.set('ilk', 'tamam'); location.replace(hedef); };

  // ---------- Smootherstep perde: metin konumundan (docs/50 §1.2; AGENTS “Otonom tur — overlay”) ----------
  // Düğümler [y, alfa]; aralarda s(t)=6t⁵−15t⁴+10t³; 4px'te bir durak. Renk yalnız --overlay.
  const ss = t => { t = Math.max(0, Math.min(1, t)); return t * t * t * (t * (6 * t - 15) + 10); };
  function egri(h, dugum) {
    const d = dugum.map(([y, a]) => [Math.max(0, Math.min(h, y)), a]).sort((x, y) => x[0] - y[0]);
    const a = y => { if (y <= d[0][0]) return d[0][1]; for (let i = 1; i < d.length; i++) { const [y0, a0] = d[i - 1], [y1, a1] = d[i]; if (y <= y1) return a0 + (a1 - a0) * ss((y - y0) / Math.max(1, y1 - y0)); } return d.at(-1)[1]; };
    const ys = []; for (let y = 0; y < h; y += 4) ys.push(y); ys.push(h);
    return `linear-gradient(180deg,${ys.map(y => `color-mix(in srgb,var(--overlay) ${(a(y) * 100).toFixed(1)}%,transparent) ${y}px`).join(',')})`;
  }
  // Kanon: üst kenar %35 → max(%32, 64px) içinde 0; metin bloğunun 48px üstünde %64 (yumuşama 48×3 boyunca), metin altında %86.
  function perde(perdeEl, metinEl, {son = .86} = {}) {
    const ciz = () => {
      if (!perdeEl.isConnected) return;
      const r = perdeEl.getBoundingClientRect(), h = Math.round(r.height); if (!h) return;
      const ustBoy = Math.max(h * .32, 64), d = [[0, .35], [ustBoy, 0]];
      if (metinEl) { const T = Math.round(metinEl.getBoundingClientRect().top - r.top); const b = Math.max(T - 48 - 48 * 3, ustBoy + 8); d.push([b, 0], [T - 48, .64], [T + 48, son], [h, son]); }
      perdeEl.style.backgroundImage = egri(h, d.sort((x, y) => x[0] - y[0]));
    };
    ciz(); document.fonts?.ready.then(ciz); addEventListener('resize', ciz);
    return ciz;
  }

  // ---------- Beş ana modül: gerçek ad, gerçek açıklama (canlı “Tarif bul” paneli ve menü metinleri), gerçek görsel ----------
  const R = {tarifler: tarif('tavuk-curry'), ne: tarif('jiao-yan'), dolap: tarif('semizotlu'), tabak: tarif('tepsi-kadayifi')};
  const puf = V.puflar.find(p => /Yumurta/.test(p.baslik)) || V.puflar[0];
  const yapan = t => `${t.kisa || String(t.baslik).split('|')[0].trim()} · ${t.yazar}`;
  const MOD = [
    {id: 'tarifler', ad: 'Tarifler', ikon: I('recipes'), gorsel: R.tarifler.gorsel, kisa: 'Kategoriye, mutfağa, süreye ve beslenme tercihine göre bul.', kanit: [I('recipes'), `${st['Denenmiş tarif']} denenmiş tarif · ${st['Dünya mutfağı']} dünya mutfağı`]},
    {id: 'ne', ad: 'Ne Pişirsem', ikon: I('whatToCook'), gorsel: R.ne.gorsel, kisa: 'Öğün, süre ve zorluğu seç; sana uygun tarifleri sıralayalım.', kanit: ['utensils', yapan(R.ne)]},
    {id: 'dolap', ad: 'Dolapta Ne Var', ikon: I('pantry'), gorsel: R.dolap.gorsel, kisa: 'Malzemelerini seç, sana uygun tarifleri bulalım.', kanit: [I('pantry'), `${V.dolapKatalog.length} grupta ${dolapSayi} malzeme`]},
    {id: 'puf', ad: 'Püf Noktaları', ikon: I('tips'), gorsel: puf.gorsel, kisa: 'Püf noktaları ve rehber yazıları.', kanit: [I('tips'), puf.baslik]},
    {id: 'tabak', ad: 'Tabaktan Tarif', pro: true, ikon: I('plateToRecipe'), gorsel: R.tabak.gorsel, kisa: 'Yemeğin fotoğrafını çek, tarifini çıkaralım.', kanit: ['utensils', yapan(R.tabak)]}
  ];
  const proRozet = `<span class="dgu-rozet">${ic(I('pro'))}Pro</span>`;
  const modMetin = m => `<div class="ac-metin ac-gir" aria-live="polite"><div class="ac-bas"><span class="ac-mikon">${ic(m.ikon)}</span>${m.pro ? proRozet : ''}</div><h1 class="t-display">${esc(m.ad)}</h1><p class="t-body">${esc(m.kisa)}</p><p class="ac-kanit">${ic(m.kanit[0])}<span>${esc(m.kanit[1])}</span></p></div>`;

  // ===== Açılış · Kolaj =====
  // Eğik üç sütunda gerçek tarif fotoğrafları ters yönlerde akar; çıkışta kolaj düzleşip dağılır. Bitince karşılamaya (ilk kez)
  // ya da ana sayfaya; dokununca hemen geçer. Galeri çerçevesinde ve ?kal=1 ile son karede kalır.
  const KOLAJ = V.tarifler.filter((t, i) => i % 2 === 0).slice(0, 15).map(t => t.gorsel);
  DG.sayfa('acilis', ctx => {
    const sutun = k => `<div class="ac-sutun">${KOLAJ.filter((_, i) => i % 3 === k).map(g => `<div class="ac-karo" style="background-image:url('${url(g)}')"></div>`).join('')}</div>`;
    const html = `<div class="ac-ekran ac-s2" role="img" aria-label="DadaGastro açılıyor"><div class="ac-kolaj" aria-hidden="true">${sutun(0)}${sutun(1)}${sutun(2)}</div><div class="ac-perde" data-perde></div>${isik}<div class="ac-orta"><img class="ac-logo" src="${LOGO}" alt="DadaGastro" data-logo></div><span class="ac-hilal" aria-hidden="true"></span><button class="ac-dokun" type="button" data-gec aria-label="Geç"></button></div>`;
    return {tur: 'tam', baslik: 'Açılış', html, sonra(root) {
      koyuGovde();
      const ekran = root.querySelector('.ac-s2');
      root.querySelectorAll('.ac-karo').forEach((k, i) => k.style.setProperty('--i', i % 5));
      // Perdenin alt bölgesi: metin yok; logo çevresi ve hilal alanına doğru koyulaşır.
      const p = root.querySelector('[data-perde]'), l = root.querySelector('[data-logo]');
      const boya = () => { const h = p.offsetHeight, r = l.getBoundingClientRect(); p.style.backgroundImage = egri(h, [[0, .35], [Math.max(h * .32, 64), .3], [r.top - 48, .55], [r.bottom + 48, .55], [h - 96, .8], [h, .9]]); };
      boya(); addEventListener('resize', boya);
      const hedef = store.get('ilk') === 'tamam' && !cerceve ? DG.KOK.ana : 'karsilama.html';
      let gitti = false;
      const git = () => { if (gitti) return; gitti = true; const ilerle = () => location.replace(hedef); if (azalt()) ilerle(); else { ekran.classList.add('is-cikis'); setTimeout(ilerle, TK.base); } };
      root.querySelector('[data-gec]').addEventListener('click', () => { if (!ctx.qs.has('kal') && !cerceve) git(); });
      if (ctx.qs.has('kal') || cerceve) return;
      setTimeout(git, azalt() ? TK.reveal : TK.reveal * 5);
    }};
  });

  // ===== Karşılama · Perde/vitrin =====
  // Ana sayfa hero'su (fotoğraf, alt köşe 24 + hilal, sol üst ışık); altta beş modül seçicisi (yalnız ikon; ad görselin üstünde,
  // erişilebilir ad düğmede). Otomatik geçiş dokununca durur. Atla → ana sayfa; Tercihlerimi seç → tercihler; Giriş yap → giriş.
  DG.sayfa('karsilama', ctx => {
    let i = Math.max(0, Math.min(MOD.length - 1, (Number(ctx.qs.get('modul')) || 1) - 1));
    const html = `<div class="ac-ekran ac-k3"><section class="ac-sahne">${MOD.map((m, k) => foto(m.gorsel, k === i ? 'is-on' : '')).join('')}<div class="ac-perde" data-perde></div>${isik}<div data-metin></div></section>
      <div class="ac-ust"><img class="ac-logo" src="${LOGO}" alt="DadaGastro"><span class="ac-bosluk"></span><button class="ac-atla" type="button" data-atla>Atla</button></div>
      <div class="ac-k3-alt"><div class="ac-secici" role="group" aria-label="Modüller">${MOD.map((m, k) => `<button type="button" data-mod="${k}" aria-pressed="${k === i}" aria-label="${esc(m.ad)}"><span class="ac-mikon">${ic(m.ikon)}</span></button>`).join('')}</div>
      <div class="ac-cta"><div class="dgu-ikili">${btn('Atla', {tur: 'ikincil', attrs: 'data-atla'})}${btn('Tercihlerimi seç', {href: 'tercihler.html?ilk=1'})}</div><p class="ac-yardim">Hesabın var mı? <a href="giris.html?donus=ana-v3.html" data-giris>Giriş yap</a></p></div></div></div>`;
    return {tur: 'tam', baslik: 'Karşılama', html, sonra(root) {
      koyuGovde();
      root.querySelectorAll('[data-atla]').forEach(b => { b.onclick = () => bitir(); });
      root.querySelector('[data-giris]').onclick = () => store.set('ilk', 'tamam');
      const sahne = root.querySelector('.ac-sahne'), fotolar = [...sahne.querySelectorAll('.ac-foto')], metin = sahne.querySelector('[data-metin]'), dugme = [...root.querySelectorAll('[data-mod]')];
      let zaman, dur = azalt() || ctx.qs.has('kal');
      const yeniden = perde(sahne.querySelector('[data-perde]'), metin);
      const goster = k => {
        i = (k + MOD.length) % MOD.length;
        fotolar.forEach((f, j) => f.classList.toggle('is-on', j === i)); dugme.forEach((b, j) => b.setAttribute('aria-pressed', j === i));
        metin.innerHTML = modMetin(MOD[i]); yeniden();
        clearTimeout(zaman); if (!dur) zaman = setTimeout(() => goster(i + 1), TK.heroAutoplay);
      };
      dugme.forEach(b => b.addEventListener('click', () => { dur = true; goster(Number(b.dataset.mod)); }));
      goster(i);
    }};
  });

  // ======================== TERCİHLER · Profil vitrini ========================
  // Soru başına bir ekran. Üst alan (kubbe): seçilen seçeneğin gerçek fotoğrafı (yoksa adımın fotoğrafı) + fotoğraftaki tarifin
  // adı · yazarı; ilerleme çubuğu (DG.ilerleme). Beyaz panel (kubbe) adımlar arasında yatay kayar.
  // Seçenekler: mutfak = DGVERI.mutfaklar (yalnız bayrak, tarif sayısına göre; DG.bayrakSecim ekranı doldurur + “N mutfak daha”);
  // beslenme ve alerjen = web onboarding kümeleri (docs/52 O3); seviye = webdeki zorluk kümesi; kategori = DGVERI.kategoriler.
  const MUTFAK_LISTE = [...V.mutfaklar].sort((a, b) => b.sayi - a.sayi);
  const DIYET = ['Kısıtlamam Yok', 'Vejetaryen', 'Vegan', 'Glutensiz', 'Laktozsuz', 'Düşük Kalori', 'Ketojenik', 'Akdeniz'];
  const ALERJEN = ['Gluten', 'Laktoz/Süt', 'Yumurta', 'Yer Fıstığı', 'Kabuklu Yemiş', 'Deniz Ürünleri', 'Soya', 'Susam', 'Hardal', 'Kereviz'];
  const SEVIYE = (V.facetler.find(f => f.key === 'zorluk')?.options || []).map(o => o.label);
  const KATEGORI = V.kategoriler.filter(k => k.gorsel);
  const ACIKLAMA = {mutfak: `${MUTFAK_LISTE.length} dünya mutfağından istediğin kadarını seç.`, diyet: 'Beslenme tarzını ve uzak durduklarını seç.', seviye: 'Bir seviye seç; istediğin zaman değiştirebilirsin.', kategori: `${KATEGORI.length} kategoriden ilgilendiklerini seç.`};
  const ADIM = [
    {ad: 'mutfak', baslik: 'Hangi mutfakları seviyorsun?', kisa: 'Damak zevkin', gorsel: tarif('asam-pedas').gorsel},
    {ad: 'diyet', baslik: 'Beslenme tarzın nasıl?', kisa: 'Beslenme', gorsel: tarif('semizotlu').gorsel},
    {ad: 'seviye', baslik: 'Mutfakta ne kadar deneyimlisin?', kisa: 'Beceri seviyen', gorsel: tarif('kiev-pastasi').gorsel},
    {ad: 'kategori', baslik: 'En çok neleri pişirmek istersin?', kisa: 'İlgi alanların', gorsel: tarif('tavuk-curry').gorsel}
  ];
  const yukle = () => { const t = store.get('tercih', {}) || {}; const a = v => Array.isArray(v) ? v : []; return {mutfak: a(t.mutfak), diyet: a(t.diyet), alerjen: a(t.alerjen), seviye: typeof t.seviye === 'string' ? t.seviye : '', kategori: a(t.kategori)}; };
  const chip = (grup, k, ad, on) => `<button class="dgu-chip" type="button" data-grup="${grup}" data-k="${esc(k)}" aria-pressed="${on}">${on ? ic('check') : ''}${esc(ad)}</button>`;
  const ZSAYI = Object.fromEntries((V.facetler.find(f => f.key === 'zorluk')?.options || []).map(o => [o.label, o.count]));
  const BSAYI = Object.fromEntries((V.facetler.find(f => f.key === 'beslenme')?.options || []).map(o => [o.label, o.count]));
  // Web onboarding etiketi → listedeki Beslenme/Tip karşılığı (yalnız birebir karşılığı olanlarda tarif sayısı gösterilir).
  // Kısıtlamam Yok = bütün denenmiş tarifler; Düşük Kalori = “Düşük Kalorili”. Akdeniz'in listede karşılığı yok → sayı yok.
  const DIYET_SAYI = d => d === DIYET[0] ? st['Denenmiş tarif'] : BSAYI[d] != null ? DG.sayi(BSAYI[d]) : BSAYI[d + 'li'] != null ? DG.sayi(BSAYI[d + 'li']) : '';
  // Beslenme fotoğrafı: o tarzı taşıyan gerçek tarif (DGVERI.tarifler); her tarza ayrı fotoğraf.
  //   Vejetaryen, Vegan, Glutensiz, Laktozsuz → tarifin Beslenme/Tip etiketi; Kısıtlamam Yok → hiçbir beslenme etiketi olmayan tarif;
  //   Düşük Kalori → açıklamasında “Düşük kalorili” yazan tarif; Ketojenik → “Düşük Karbonhidratlı” etiketli tarif (verideki 32 tarifte
  //   Ketojenik etiketi yok); Akdeniz → Ege/Akdeniz balığı ızgarası (verideki tariflerde Akdeniz etiketi yok).
  const etiketli = d => t => (t.ozellikler || []).includes(d);
  const DIYET_FOTO = {
    'Kısıtlamam Yok': tarif('ordek-dolmasi'), 'Vejetaryen': tarif('patates-mucveri'), 'Vegan': V.tarifler.find(etiketli('Vegan')),
    'Glutensiz': tarif('duduklude-balkan'), 'Laktozsuz': tarif('tavuk-curry'), 'Düşük Kalori': V.tarifler.find(t => /düşük kalorili/i.test(t.aciklama || '')),
    'Ketojenik': V.tarifler.find(etiketli('Düşük Karbonhidratlı')), 'Akdeniz': tarif('sardalya-izgara')
  };
  // Seçim kartı: ortak DG.secimKart (dg-bilesen.css .dgu-secim-*); bayrak ortak DG.bayrakSecim.
  const izgara = (cls, aria, ic2, rol = 'group') => `<div class="dgu-secim-izgara${cls ? ' ' + cls : ''}" role="${rol}" aria-label="${esc(aria)}">${ic2}</div>`;
  const mutfakTarif = m => { const ad = m.ad.replace(/ Mutfağı$/, '').toLocaleLowerCase('tr'); return V.tarifler.find(t => (t.ozellikler || []).includes(m.ad)) || V.tarifler.find(t => t.baslik.toLocaleLowerCase('tr').includes(ad + ' usul')); };
  const seviyeTarif = z => V.tarifler.find(t => t.zorluk === z);
  // Adım gövdesi: bölümler (.dgu-yigin) arası 32; açıklama → seçenekler ortak yığın kuralıyla. Bölüm başlığı ortak DG.bas (ikonsuz),
  // bilgi notu ortak DG.ipucu.
  const t2Sayfa = (A, S) => {
    const ac = `<p class="c-muted">${esc(ACIKLAMA[A.ad])}</p>`;
    if (A.ad === 'mutfak') return `<div class="dgu-yigin">${ac}${DG.bayrakSecim(MUTFAK_LISTE, {ad: 'mutfak', secili: S.mutfak, ilk: 20})}</div>`;
    if (A.ad === 'diyet') return `<div class="dgu-yigin">${ac}${izgara('', 'Beslenme tarzı', DIYET.map(d => { const n = DIYET_SAYI(d); return DG.secimKart({grup: 'diyet', k: d, ad: d, alt: n ? `${n} tarif` : '', gorsel: DIYET_FOTO[d]?.gorsel, secili: S.diyet.includes(d)}); }).join(''))}</div>
      <section class="dgu-yigin" aria-labelledby="ac-alerjen">${DG.bas('Uzak durduğun bir şey var mı?').replace('<h2>', '<h2 id="ac-alerjen">')}<div class="ac-chipler" role="group" aria-label="Uzak durduklarım">${ALERJEN.map(d => chip('alerjen', d, d, S.alerjen.includes(d))).join('')}</div>${DG.ipucu({ikon: I('allergen'), baslik: 'Sağlık notu', metin: 'Bu liste tıbbi tavsiye değildir.'})}</section>`;
    if (A.ad === 'seviye') return `<div class="dgu-yigin ac-t2-dolgu">${ac}${izgara('is-tek ac-t2-dolu', 'Beceri seviyesi', SEVIYE.map((z, k) => DG.secimKart({grup: 'seviye', k: z, ad: z, alt: ZSAYI[z] != null ? `${DG.sayi(ZSAYI[z])} tarif` : '', olcek: k + 1, secili: S.seviye === z, tek: true})).join(''), 'radiogroup')}</div>`;
    return `<div class="dgu-yigin">${ac}${izgara('is-uc', 'Kategoriler', KATEGORI.map(k => DG.secimKart({grup: 'kategori', k: k.slug, ad: k.ad, alt: `${DG.sayi(k.sayi)} tarif`, gorsel: k.gorsel, secili: S.kategori.includes(k.slug)})).join(''))}</div>`;
  };
  // Seçilen seçeneğin fotoğrafı ve künyesi (üst alan)
  const secimFoto = (grup, k) => {
    if (grup === 'mutfak') { const m = MUTFAK_LISTE.find(x => x.slug === k), t = m && mutfakTarif(m); return t && {g: t.gorsel, k: yapan(t)}; }
    if (grup === 'diyet') { const t = DIYET_FOTO[k]; return t && {g: t.gorsel, k: yapan(t)}; }
    if (grup === 'seviye') { const t = seviyeTarif(k); return t && {g: t.gorsel, k: `${yapan(t)} · ${k}`}; }
    if (grup === 'kategori') { const c = KATEGORI.find(x => x.slug === k); return c && {g: c.gorsel, k: `${c.ad} · ${DG.sayi(c.sayi)} tarif`}; }
  };
  // Seçim değişimi (tek tanım): Kısıtlamam Yok tekil; seviye tek seçim (yeniden dokununca kalkar).
  function degis(S, grup, k) {
    if (grup === 'seviye') { S.seviye = S.seviye === k ? '' : k; return; }
    const l = S[grup], on = !l.includes(k);
    if (!on) { S[grup] = l.filter(x => x !== k); return; }
    if (grup === 'diyet') { S.diyet = k === DIYET[0] ? [k] : [...l.filter(x => x !== DIYET[0]), k]; return; }
    S[grup] = [...l, k];
  }
  // Düğmeleri yeniden çizmeden durumu yansıt (odak kaybolmaz)
  function yansit(root, S) {
    root.querySelectorAll('[data-grup]').forEach(b => {
      const g = b.dataset.grup, k = b.dataset.k, on = g === 'seviye' ? S.seviye === k : (S[g] || []).includes(k);
      if (b.getAttribute('role') === 'radio') b.setAttribute('aria-checked', on); else b.setAttribute('aria-pressed', on);
      if (b.classList.contains('dgu-chip')) { const c = b.querySelector('.fa-check'); if (on && !c) b.insertAdjacentHTML('afterbegin', ic('check')); if (!on && c) c.remove(); }
    });
  }
  const kaydet = S => store.set('tercih', {...store.get('tercih', {}), ...S});

  DG.sayfa('tercihler', ctx => {
    let n = Math.min(ADIM.length, Math.max(1, Number(ctx.qs.get('adim')) || 1)); const S = yukle();
    // İlk kurulum (?ilk=1) bitince/atlanınca ana sayfaya ya da ?donus= adresine; ayarlardan açıldıysa Ayarlar'a döner.
    const cik = () => (ctx.qs.has('ilk') || ctx.qs.has('donus') ? bitir(donusHedef(ctx.qs)) : DG.geri());
    const tamamla = () => { kaydet(S); DG.bildir('Tercihlerin kaydedildi'); setTimeout(() => (ctx.qs.has('ilk') || ctx.qs.has('donus') ? bitir(donusHedef(ctx.qs)) : location.replace('ayarlar.html')), TK.reveal + TK.fast); };
    const html = `<div class="ac-t2"><section class="dgu-kubbe-ust ac-t2-ust ac-ekran">${foto(ADIM[n - 1].gorsel, 'is-on')}${foto(ADIM[n - 1].gorsel)}<div class="ac-perde" data-perde></div>${isik}
      <div class="ac-ust"><button class="ac-ibtn" type="button" data-onceki aria-label="Geri">${ic(I('back'))}</button><div class="ac-t2-ilerle" data-ilerle></div><button class="ac-atla" type="button" data-hepsi>Atla</button></div>
      <div class="ac-t2-soru" data-soru></div></section><div class="dgu-kubbe-panel ac-t2-panel"><div class="ac-t2-sahne" data-sahne></div></div></div>`;
    return {tur: 'tam', baslik: 'Tercihler', html, bar: `${btn('Bu adımı atla', {tur: 'ikincil', attrs: 'data-adim-atla'})}${btn('Devam', {attrs: 'data-devam'})}`, sonra(root) {
      root.classList.add('ac-app');
      const ust = root.querySelector('.ac-t2-ust'), fotolar = [...ust.querySelectorAll('.ac-foto')], soru = root.querySelector('[data-soru]'), sahne = root.querySelector('[data-sahne]');
      const devam = document.querySelector('[data-devam] span'), atla = document.querySelector('[data-adim-atla] span');
      const yeniden = perde(ust.querySelector('[data-perde]'), soru, {son: .82});
      let on = 0;
      const ustFoto = (g, kunye) => { const f = fotolar[1 - on]; if (f.style.backgroundImage.includes(g) && f.classList.contains('is-on')) return; f.style.backgroundImage = `url('${url(g)}')`; fotolar[on].classList.remove('is-on'); f.classList.add('is-on'); on = 1 - on; const kn = soru.querySelector('[data-kunye]'); if (kn) { kn.hidden = !kunye; kn.querySelector('span').textContent = kunye || ''; } };
      const secildi = (grup, k, sec) => { const f = sec && secimFoto(grup, k); if (f) ustFoto(f.g, f.k); else if (!sec) ustFoto(ADIM[n - 1].gorsel, ''); };
      const ciz = (yon = 0) => {
        const A = ADIM[n - 1]; const u = new URL(location.href); u.searchParams.set('adim', n); history.replaceState(history.state, '', u);
        root.querySelector('[data-ilerle]').innerHTML = DG.ilerleme(n, ADIM.length, {});
        soru.innerHTML = `<p class="t-label">${n} / ${ADIM.length} · ${esc(A.kisa)}</p><h1 class="t-page">${esc(A.baslik)}</h1><p class="ac-kanit" data-kunye hidden>${ic('utensils')}<span></span></p>`;
        ustFoto(A.gorsel, '');
        const yeni = document.createElement('div'); yeni.className = 'ac-t2-sayfa'; yeni.innerHTML = t2Sayfa(A, S);
        const eski = sahne.firstElementChild;
        if (eski && yon && !azalt()) { eski.classList.add('is-cik', yon > 0 ? 'is-sol' : 'is-sag'); yeni.classList.add('is-gir', yon > 0 ? 'is-sag' : 'is-sol'); sahne.append(yeni); eski.addEventListener('animationend', () => eski.remove(), {once: true}); yeni.addEventListener('animationend', () => yeni.classList.remove('is-gir', 'is-sag', 'is-sol'), {once: true}); }
        else sahne.replaceChildren(yeni);
        devam.textContent = n === ADIM.length ? 'Tamamla' : 'Devam'; atla.textContent = n === ADIM.length ? 'Şimdilik atla' : 'Bu adımı atla';
        yeniden(); scrollTo({top: 0});
      };
      root.addEventListener('click', e => { const b = e.target.closest('[data-grup]'); if (!b) return; degis(S, b.dataset.grup, b.dataset.k); yansit(root, S); secildi(b.dataset.grup, b.dataset.k, b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-checked') === 'true'); });
      // Bayrak seçimi kendi onay kutularını taşır: seçim 'change' ile okunur.
      root.addEventListener('change', e => { if (e.target.name !== 'mutfak') return; S.mutfak = [...root.querySelectorAll('input[name=mutfak]:checked')].map(x => x.value); secildi('mutfak', e.target.value, e.target.checked); });
      const git = d => { kaydet(S); if (n + d > ADIM.length) return tamamla(); if (n + d < 1) return DG.geri(); n += d; ciz(d); };
      root.querySelector('[data-onceki]').onclick = () => git(-1);
      root.querySelector('[data-hepsi]').onclick = cik;
      document.querySelector('[data-devam]').onclick = () => git(1);
      document.querySelector('[data-adim-atla]').onclick = () => (n === ADIM.length ? cik() : git(1));
      ciz();
    }};
  });

  // İzin istemleri (docs/54 §3): ortak DG.izinIstemi — üstte gerçek görsel, neden izin istendiğini anlatan üç madde, altta sabit düğmeler.
  // Görseller: kamera = tabakta servis edilmiş tarif; bildirim = uzun pişen güveç tarifi. ?durum=reddedildi hali korunur.
  const izin = (id, o) => DG.sayfa(id, ctx => ({tur: 'tam', baslik: o.baslik, ...DG.izinIstemi({...o, red: ctx.durum === 'reddedildi'})}));
  izin('izin-bildirim', {ikon: I('notifications'), gorsel: tarif('guvecte-ayvali').gorsel, baslik: 'Süre dolunca haber verelim', metin: 'Zamanlayıcı bitince haber vermek için bildirim izni istiyoruz.', izin: 'Bildirimleri aç',
    maddeler: [[I('time'), 'Zamanlayıcı bitince haber', 'Ocağın başında beklemene gerek kalmaz.'], ['lock', 'Ekran kilitliyken de', 'Telefon cebindeyken de süre dolunca uyarırız.'], ['bell-slash', 'İstediğin an kapatırsın', 'Cihaz ayarlarından bildirimleri kapatabilirsin.']],
    reddedildi: {baslik: 'Bildirimler kapalı', metin: 'Süre dolunca yalnız uygulama açıkken uyarırız. İstersen cihaz ayarlarından açabilirsin.'}});
  izin('izin-kamera', {ikon: I('plateToRecipe'), gorsel: R.tabak.gorsel, baslik: 'Tabağının fotoğrafını çek', metin: 'Yemeğin fotoğrafından benzer tarifleri bulmak için kamerayı kullanırız.', izin: 'Kamerayı aç', alternatif: ['Galeriden seç', DG.KOK.tabaktan],
    maddeler: [[I('plateToRecipe'), 'Tabağını çek, tanıyalım', 'Fotoğraftaki yemeği tanımaya çalışırız.'], [I('recipes'), 'Benzer denenmiş tarifler', 'Tanınan yemeğe benzeyen denenmiş tarifleri gösteririz.'], [I('privacy'), 'Fotoğraf yalnız tanıma için', 'Çektiğin fotoğraf yalnız yemeği tanımak için kullanılır.']],
    reddedildi: {baslik: 'Kamera izni gerekli', metin: 'Yemeğin fotoğrafını çekmek için kamera izni gerekir. Galeriden de seçebilirsin.'}});
})();
