/* Açılış ve tanıtım (docs/52 G7, docs/54 §1–3, docs/57). Beyar kararı 5: tek ekran karşılama + isteğe bağlı, atlanabilir tercihler.
   Üç alternatif, her biri tam akış (açılış → karşılama → tercihler → ../ana-v3.html):
     1 · Sahne  — acilis.html → karsilama.html → tercihler.html        (uygulama girişi index.html → acilis.html bunu kullanır)
     2 · Kolaj  — acilis-2.html → karsilama-2.html → tercihler-2.html
     3 · Perde  — acilis-3.html → karsilama-3.html → tercihler-3.html
   Görseller yalnız DGVERI'den (tarif, kategori, püf görselleri, bayraklar); metinler gerçek özelliklerden; sayaçlar DGVERI.istatistik.
   Tercihler yalnız bu cihazda: DG.store('tercih') {mutfak[], diyet[], alerjen[], seviye, kategori[]}; bitince store ilk = 'tamam'.
   Adres parametreleri: ?kal=1 açılışta otomatik geçişi durdurur (test/galeri); galeri çerçevesinde açılış kendini tekrarlar.
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
  const sayilar = () => `<p class="ac-sayilar">${V.istatistik.map(s => `<span><b>${esc(s.value)}</b> ${esc(s.label)}</span>`).join('')}</p>`;
  const dolapSayi = V.dolapKatalog.reduce((n, g) => n + g.malzemeler.length, 0);
  const koyuGovde = () => { document.body.classList.add('ac-koyu-govde'); document.getElementById('dgu')?.classList.add('ac-app'); };
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
  function perde(perdeEl, metinEl, {ust = true, son = .86, ortaUst, ortaAlt, kart} = {}) {
    const ciz = () => {
      if (!perdeEl.isConnected) return;
      const r = perdeEl.getBoundingClientRect(), h = Math.round(r.height); if (!h) return;
      const d = [];
      const ustBoy = Math.max(h * .32, 64);
      if (ust) d.push([0, .35], [ustBoy, 0]); else d.push([0, 0]);
      if (ortaUst != null) { d.push([ortaUst - 48 * 3, ust ? 0 : 0], [ortaUst - 48, .55], [ortaAlt + 48, .55], [ortaAlt + 48 * 3, .2]); }
      if (metinEl && kart) { const T = Math.round(metinEl.getBoundingClientRect().top - r.top); d.push([T - 40, 0], [T + 32, .72], [h, .72]); }
      else if (metinEl) { const T = Math.round(metinEl.getBoundingClientRect().top - r.top); const b = Math.max(T - 48 - 48 * 3, (ust ? ustBoy : 0) + 8); d.push([b, 0], [T - 48, .64], [T + 48, son], [h, son]); }
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
    {id: 'tarifler', ad: 'Tarifler', ikon: I('recipes'), gorsel: R.tarifler.gorsel, kisa: 'Kategoriye, mutfağa, süreye ve beslenme tercihine göre bul.',
      uzun: 'Kategoriye, mutfağa, süreye ve beslenme tercihine göre bul.', kanit: [I('recipes'), `${st['Denenmiş tarif']} denenmiş tarif · ${st['Dünya mutfağı']} dünya mutfağı`]},
    {id: 'ne', ad: 'Ne Pişirsem', ikon: I('whatToCook'), gorsel: R.ne.gorsel, kisa: 'Öğün, süre ve zorluğu seç; sana uygun tarifleri sıralayalım.',
      uzun: 'İstersen tek tek seçerek sana uygun tarifi bul, istersen bir yemek modu seçip hazır menüye göz at ya da sıfırdan kendi menünü kur.', kanit: ['utensils', yapan(R.ne)]},
    {id: 'dolap', ad: 'Dolapta Ne Var', ikon: I('pantry'), gorsel: R.dolap.gorsel, kisa: 'Malzemelerini seç, sana uygun tarifleri bulalım.',
      uzun: 'Malzemelerini seç, sana uygun tarifleri saniyeler içinde bulalım.', kanit: [I('pantry'), `${V.dolapKatalog.length} grupta ${dolapSayi} malzeme`]},
    {id: 'puf', ad: 'Püf Noktaları', ikon: I('tips'), gorsel: puf.gorsel, kisa: 'Püf noktaları ve rehber yazıları.',
      uzun: 'Püf noktaları ve rehber yazıları: saklama, bozulma, pişirme derecesi gibi mutfak sorularına cevaplar.', kanit: [I('tips'), puf.baslik]},
    {id: 'tabak', ad: 'Tabaktan Tarif', pro: true, ikon: I('plateToRecipe'), gorsel: R.tabak.gorsel, kisa: 'Yemeğin fotoğrafını çek, tarifini çıkaralım.',
      uzun: 'Yemeğin fotoğrafını çek, tarifini çıkaralım. Benzer denenmiş tarifleri de gösterelim.', kanit: ['utensils', yapan(R.tabak)]}
  ];
  const proRozet = `<span class="dgu-rozet">${ic(I('pro'))}Pro</span>`;
  const modMetin = (m, {uzun = true} = {}) => `<div class="ac-metin ac-gir" aria-live="polite"><div class="ac-bas"><span class="ac-mikon">${ic(m.ikon)}</span>${m.pro ? proRozet : ''}</div><h1 class="t-display">${esc(m.ad)}</h1><p class="t-body">${esc(uzun ? m.uzun : m.kisa)}</p><p class="ac-kanit">${ic(m.kanit[0])}<span>${esc(m.kanit[1])}</span></p></div>`;
  const cta = n => `<div class="ac-cta"><div class="dgu-ikili">${btn('Atla', {tur: 'ikincil', attrs: 'data-atla'})}${btn('Tercihlerimi seç', {href: `${n === 1 ? 'tercihler' : 'tercihler-' + n}.html?ilk=1`, attrs: 'data-tercih'})}</div><p class="ac-yardim">Hesabın var mı? <a href="giris.html?donus=ana-v3.html" data-giris>Giriş yap</a></p></div>`;
  const ctaBagla = root => { root.querySelector('[data-atla]').onclick = () => bitir(); root.querySelector('[data-giris]').onclick = () => store.set('ilk', 'tamam'); };

  // ---------- Açılış ortak davranışı: sahne bitince karşılamaya (ilk kez) ya da ana sayfaya; dokununca hemen geç ----------
  function acilisAkisi(ctx, n, sure, cikis) {
    const hedef = store.get('ilk') === 'tamam' && !cerceve ? DG.KOK.ana : (n === 1 ? 'karsilama.html' : `karsilama-${n}.html`);
    let gitti = false;
    const git = () => { if (gitti) return; gitti = true; const ilerle = () => location.replace(hedef); if (cikis && !azalt()) { cikis(); setTimeout(ilerle, TK.base); } else ilerle(); };
    document.querySelector('[data-gec]')?.addEventListener('click', () => { if (!ctx.qs.has('kal') && !cerceve) git(); });
    if (ctx.qs.has('kal')) return;
    // Galeri çerçevesinde açılış sabit kalır (son karede durur); “Tek başına aç” ve uygulama akışında geçiş sürer.
    if (cerceve) return;
    setTimeout(git, azalt() ? TK.reveal : sure);
  }
  const acilisKabuk = (cls, ic2) => `<div class="ac-ekran ${cls}" role="img" aria-label="DadaGastro açılıyor">${ic2}<button class="ac-dokun" type="button" data-gec aria-label="Geç"></button></div>`;

  // ===== Açılış 1 · Sahne =====
  // Koyu perde kalkar; iki gerçek tarif fotoğrafı yavaş yakınlaşarak birbirine geçer; ışık açılır; logo belirir; hilal dolar.
  const acilis1 = ctx => ({tur: 'tam', baslik: 'Açılış 1', html: acilisKabuk('ac-s1', `${foto(tarif('sardalya').gorsel, 'is-a')}${foto(MOD[0].gorsel, 'is-b')}<div class="ac-perde" data-perde></div>${isik}<div class="ac-ortu" aria-hidden="true"></div><div class="ac-orta"><img class="ac-logo" src="${LOGO}" alt="DadaGastro" data-logo></div><span class="ac-hilal" aria-hidden="true"></span>`),
    sonra(root) { koyuGovde(); hedefPerde(root, .7); acilisAkisi(ctx, 1, TK.reveal * 5, () => root.querySelector('.ac-s1').classList.add('is-cikis')); }});
  // Açılış perdesinin alt bölgesi: metin yok; hilal alanına doğru koyulaşır.
  function hedefPerde(root, son) { const p = root.querySelector('[data-perde]'), l = root.querySelector('[data-logo]'); const ciz = () => { const h = p.offsetHeight, t = l.getBoundingClientRect().top, b = l.getBoundingClientRect().bottom; p.style.backgroundImage = egri(h, [[0, .35], [Math.max(h * .32, 64), .3], [t - 48, .55], [b + 48, .55], [h - 96, son], [h, son + .1]]); }; ciz(); addEventListener('resize', ciz); }

  // ===== Açılış 2 · Kolaj =====
  // Eğik üç sütunda gerçek tarif fotoğrafları ters yönlerde akar; çıkışta kolaj düzleşip dağılır, karşılamadaki karolar yerine oturur.
  const KOLAJ = V.tarifler.filter((t, i) => i % 2 === 0).slice(0, 15).map(t => t.gorsel);
  const acilis2 = ctx => {
    const sutun = k => `<div class="ac-sutun">${KOLAJ.filter((_, i) => i % 3 === k).map((g, i) => `<div class="ac-karo" style="background-image:url('${url(g)}')" data-i="${i}"></div>`).join('')}</div>`;
    return {tur: 'tam', baslik: 'Açılış 2', html: acilisKabuk('ac-s2', `<div class="ac-kolaj" aria-hidden="true">${sutun(0)}${sutun(1)}${sutun(2)}</div><div class="ac-perde" data-perde></div>${isik}<div class="ac-orta"><img class="ac-logo" src="${LOGO}" alt="DadaGastro" data-logo></div><span class="ac-hilal" aria-hidden="true"></span>`),
      sonra(root) { koyuGovde(); root.querySelectorAll('.ac-karo').forEach((k, i) => k.style.setProperty('--i', i % 5)); hedefPerde(root, .8); acilisAkisi(ctx, 2, TK.reveal * 5, () => root.querySelector('.ac-s2').classList.add('is-cikis')); }};
  };

  // ===== Açılış 3 · Perde =====
  // Koyu ekranda logo; sahne ortadan açılır (ana sayfa hero biçimi: alt köşe 24 + hilal), logo sahnenin altındaki alana iner.
  // Alt alan: kaynak slogan (canlı /hakkimizda başlığı = DGICERIK.sayfa.hakkimizda.baslik; bu sayfa icerik.js yüklemez, metin
  // oradan birebir alındı), DGVERI.istatistik sayacı (0'dan sayarak), en altta ince yükleme çubuğu.
  const SLOGAN = window.DGICERIK?.sayfa?.hakkimizda?.baslik || 'Yaşasın Yemek Yemek!';
  const acilis3 = ctx => {
    const ana = V.istatistik[0] || {value: '', label: ''};
    return {tur: 'tam', baslik: 'Açılış 3', html: acilisKabuk('ac-s3', `<section class="ac-sahne">${foto(MOD[0].gorsel)}<div class="ac-perde" data-perde></div>${isik}</section>
      <div class="ac-s3-alt"><img class="ac-logo" src="${LOGO}" alt="DadaGastro" data-logo><div class="ac-s3-metin"><p class="t-section">${esc(SLOGAN)}</p><p class="ac-s3-sayac">${ic(I('recipes'))}<span><b data-sayac="${esc(ana.value)}">${esc(ana.value)}</b> ${esc(ana.label.toLocaleLowerCase('tr'))}</span></p></div></div>
      <span class="ac-s3-yukle" aria-hidden="true"><i></i></span>`),
    sonra(root) {
      koyuGovde();
      const l = root.querySelector('[data-logo]'), s = root.querySelector('.ac-ekran');
      // Logo ekran ortasından başlar; yerleşik konumu offset ile (dönüşümden bağımsız) ölçülür.
      const yer = () => { const alt = l.offsetParent.getBoundingClientRect(); s.style.setProperty('--ac-dy', `${innerHeight / 2 - (alt.top + l.offsetTop + l.offsetHeight / 2)}px`); };
      yer(); addEventListener('resize', yer);
      perde(root.querySelector('[data-perde]'), null, {son: .5});
      // Sayaç: perde açılırken 0'dan gerçek değere (yalnız gösterim; reduced-motion'da doğrudan değer)
      const b = root.querySelector('[data-sayac]'), hedef = Number(String(b.dataset.sayac).replace(/\D/g, ''));
      if (hedef && !azalt()) { const t0 = performance.now() + TK.reveal * 2, sure = TK.reveal * 2; const adim = t => { const k = Math.max(0, Math.min(1, (t - t0) / sure)); b.textContent = DG.sayi(Math.round(hedef * ss(k))); if (k < 1) requestAnimationFrame(adim); }; b.textContent = '0'; requestAnimationFrame(adim); }
      acilisAkisi(ctx, 3, TK.reveal * 5, () => s.classList.add('is-cikis'));
    }};
  };

  // ===== Karşılama 1 · Hikâye =====
  // Tam ekran; beş modül sırayla (hero otomatik geçiş süresi), fotoğraf ve metin birlikte; sol yarı geri, sağ yarı ileri; duraklat.
  const karsilama1 = ctx => {
    let i = Math.max(0, Math.min(4, (Number(ctx.qs.get('modul')) || 1) - 1));
    const html = `<div class="ac-ekran ac-k1" data-k1>${MOD.map((m, k) => foto(m.gorsel, `${k === i ? 'is-on' : ''} `)).join('')}<div class="ac-perde" data-perde></div>${isik}
      <div class="ac-ust"><img class="ac-logo" src="${LOGO}" alt="DadaGastro"><span class="ac-bosluk"></span><button class="ac-ibtn" type="button" data-dur aria-label="Duraklat">${ic('pause')}</button></div>
      <div class="ac-cubuklar" aria-hidden="true">${MOD.map(() => '<span class="ac-dolum"><i></i></span>').join('')}</div>
      <button class="ac-bolge is-geri" type="button" data-yon="-1" aria-label="Önceki modül"></button><button class="ac-bolge is-ileri" type="button" data-yon="1" aria-label="Sonraki modül"></button>
      <div class="ac-alt"><div data-metin></div>${cta(1)}</div></div>`;
    return {tur: 'tam', baslik: 'Karşılama 1', html, sonra(root) {
      koyuGovde(); ctaBagla(root);
      const ek = root.querySelector('[data-k1]'), fotolar = [...ek.querySelectorAll('.ac-foto')], dolum = [...ek.querySelectorAll('.ac-dolum')], metin = ek.querySelector('[data-metin]'), durBtn = ek.querySelector('[data-dur]');
      let zaman, dur = azalt(), elle = false;
      const yeniden = perde(ek.querySelector('[data-perde]'), metin);
      const goster = (k, yon = 1) => {
        i = (k + MOD.length) % MOD.length;
        fotolar.forEach((f, j) => { f.classList.toggle('is-on', j === i); if (j === i) { f.style.animation = 'none'; void f.offsetWidth; f.style.animation = ''; } });
        dolum.forEach((d, j) => { d.classList.toggle('is-gecti', j < i); d.classList.toggle('is-on', j === i); d.classList.toggle('is-elle', j === i && dur); const x = d.firstElementChild; x.style.animation = 'none'; void x.offsetWidth; x.style.animation = ''; });
        metin.innerHTML = modMetin(MOD[i]); yeniden();
        clearTimeout(zaman); if (!dur) zaman = setTimeout(() => goster(i + 1), TK.heroAutoplay);
      };
      const durdur = d => { dur = d; ek.classList.toggle('is-dur', d); durBtn.setAttribute('aria-label', d ? 'Oynat' : 'Duraklat'); durBtn.innerHTML = ic(d ? 'play' : 'pause'); if (d) clearTimeout(zaman); else goster(i); };
      ek.querySelectorAll('[data-yon]').forEach(b => b.addEventListener('click', () => { elle = true; goster(i + Number(b.dataset.yon)); }));
      durBtn.onclick = () => durdur(!dur);
      ek.addEventListener('keydown', e => { if (e.key === 'ArrowRight') goster(i + 1); if (e.key === 'ArrowLeft') goster(i - 1); });
      // Basılı tutunca durur (hikâye kalıbı); bırakınca sürer.
      let bas; ek.querySelectorAll('.ac-bolge').forEach(b => { b.addEventListener('pointerdown', () => { bas = setTimeout(() => { ek.classList.add('is-dur'); clearTimeout(zaman); }, TK.reveal); }); b.addEventListener('pointerup', () => { clearTimeout(bas); if (ek.classList.contains('is-dur') && !dur) { ek.classList.remove('is-dur'); zaman = setTimeout(() => goster(i + 1), TK.heroAutoplay / 2); } }); });
      if (dur) { durBtn.setAttribute('aria-label', 'Oynat'); durBtn.innerHTML = ic('play'); ek.classList.add('is-dur'); }
      if (ctx.qs.has('kal')) dur = true;
      goster(i); void elle;
    }};
  };

  // ===== Karşılama 2 · Kolaj (bento) =====
  const karsilama2 = () => {
    const karo = (m, k) => `<article class="ac-karo-m" data-i="${k}">${foto(m.gorsel)}<div class="ac-perde" data-perde></div><span class="ac-mikon">${ic(m.ikon)}</span><h2>${esc(m.ad)}${m.pro ? proRozet : ''}</h2><p>${esc(m.kisa)}</p></article>`;
    const html = `<div class="ac-ekran ac-k2">${isik}<div class="ac-ust"><img class="ac-logo" src="${LOGO}" alt="DadaGastro"></div>
      <header class="ac-k2-bas ac-gir"><h1 class="t-display">Hoş geldin</h1>${sayilar()}</header>
      <div class="ac-bento" aria-label="DadaGastro'da neler var">${MOD.map(karo).join('')}</div>${cta(2)}</div>`;
    return {tur: 'tam', baslik: 'Karşılama 2', html, sonra(root) {
      koyuGovde(); ctaBagla(root);
      root.querySelectorAll('.ac-karo-m').forEach((k, i) => { k.style.setProperty('--i', i); perde(k.querySelector('[data-perde]'), k.querySelector('h2'), {ust: false, kart: true}); });
    }};
  };

  // ===== Karşılama 3 · Perde/vitrin =====
  // Ana sayfa hero'su (tam boy fotoğraf, alt köşe 24 + hilal, sol üst ışık); altta beş modül seçicisi. Otomatik geçiş dokununca durur.
  const karsilama3 = ctx => {
    let i = Math.max(0, Math.min(4, (Number(ctx.qs.get('modul')) || 1) - 1));
    const html = `<div class="ac-ekran ac-k3"><section class="ac-sahne">${MOD.map((m, k) => foto(m.gorsel, `${k === i ? 'is-on' : ''} `)).join('')}<div class="ac-perde" data-perde></div>${isik}<div data-metin></div></section>
      <div class="ac-ust"><img class="ac-logo" src="${LOGO}" alt="DadaGastro"><span class="ac-bosluk"></span><button class="ac-atla" type="button" data-atla2>Atla</button></div>
      <div class="ac-k3-alt"><div class="ac-secici" role="group" aria-label="Modüller">${MOD.map((m, k) => `<button type="button" data-mod="${k}" aria-pressed="${k === i}"><span class="ac-mikon">${ic(m.ikon)}</span><span>${esc(m.ad)}</span></button>`).join('')}</div>${cta(3)}</div></div>`;
    return {tur: 'tam', baslik: 'Karşılama 3', html, sonra(root) {
      koyuGovde(); ctaBagla(root); root.querySelector('[data-atla2]').onclick = () => bitir();
      const sahne = root.querySelector('.ac-sahne'), fotolar = [...sahne.querySelectorAll('.ac-foto')], metin = sahne.querySelector('[data-metin]'), dugme = [...root.querySelectorAll('[data-mod]')];
      let zaman, dur = azalt() || ctx.qs.has('kal');
      const yeniden = perde(sahne.querySelector('[data-perde]'), metin);
      const goster = k => {
        i = (k + MOD.length) % MOD.length;
        fotolar.forEach((f, j) => f.classList.toggle('is-on', j === i)); dugme.forEach((b, j) => b.setAttribute('aria-pressed', j === i));
        metin.innerHTML = modMetin(MOD[i], {uzun: false}); yeniden();
        clearTimeout(zaman); if (!dur) zaman = setTimeout(() => goster(i + 1), TK.heroAutoplay);
      };
      dugme.forEach(b => b.addEventListener('click', () => { dur = true; goster(Number(b.dataset.mod)); }));
      goster(i);
    }};
  };

  // ======================== TERCİHLER ========================
  // Seçenekler: mutfak = DGVERI.mutfaklar (bayraklı, tarif sayısına göre); diyet ve alerjen = web onboarding kümeleri (docs/52 O3);
  // seviye = webdeki zorluk kümesi (DGVERI.facetler zorluk); kategori = DGVERI.kategoriler (görseli olanlar).
  const MUTFAK_LISTE = [...V.mutfaklar].sort((a, b) => b.sayi - a.sayi), MUTFAK = MUTFAK_LISTE;
  const DIYET = ['Kısıtlamam Yok', 'Vejetaryen', 'Vegan', 'Glutensiz', 'Laktozsuz', 'Düşük Kalori', 'Ketojenik', 'Akdeniz'];
  const ALERJEN = ['Gluten', 'Laktoz/Süt', 'Yumurta', 'Yer Fıstığı', 'Kabuklu Yemiş', 'Deniz Ürünleri', 'Soya', 'Susam', 'Hardal', 'Kereviz'];
  const SEVIYE = (V.facetler.find(f => f.key === 'zorluk')?.options || []).map(o => o.label);
  const KATEGORI = V.kategoriler.filter(k => k.gorsel);
  const ILK_MUTFAK = 12;
  const ACIKLAMA = {mutfak: `${MUTFAK.length} dünya mutfağından istediğin kadarını seç.`, diyet: 'Beslenme tarzını ve uzak durduklarını seç.', seviye: 'Bir seviye seç; istediğin zaman değiştirebilirsin.', kategori: `${KATEGORI.length} kategoriden ilgilendiklerini seç.`};
  const ADIM = [
    {ad: 'mutfak', baslik: 'Hangi mutfakları seviyorsun?', kisa: 'Damak zevkin', ikon: I('cuisine'), gorsel: tarif('asam-pedas').gorsel},
    {ad: 'diyet', baslik: 'Beslenme tarzın nasıl?', kisa: 'Beslenme', ikon: 'leaf', gorsel: tarif('semizotlu').gorsel},
    {ad: 'seviye', baslik: 'Mutfakta ne kadar deneyimlisin?', kisa: 'Beceri seviyen', ikon: I('difficulty'), gorsel: tarif('kiev-pastasi').gorsel},
    {ad: 'kategori', baslik: 'En çok neleri pişirmek istersin?', kisa: 'İlgi alanların', ikon: I('category'), gorsel: tarif('tavuk-curry').gorsel}
  ];
  const yukle = () => { const t = store.get('tercih', {}) || {}; const a = v => Array.isArray(v) ? v : []; return {mutfak: a(t.mutfak), diyet: a(t.diyet), alerjen: a(t.alerjen), seviye: typeof t.seviye === 'string' ? t.seviye : '', kategori: a(t.kategori)}; };
  const sayiMetni = (S, ad) => { const n = ad === 'seviye' ? (S.seviye ? 1 : 0) : ad === 'diyet' ? S.diyet.length + S.alerjen.length : S[ad].length; return n; };
  const ozet = (S, ad) => { const n = sayiMetni(S, ad); if (ad === 'seviye') return S.seviye || 'Seçilmedi'; return n ? `${n} seçim` : 'Seçilmedi'; };

  const chip = (grup, k, ad, on, bayrak) => `<button class="dgu-chip" type="button" data-grup="${grup}" data-k="${esc(k)}" aria-pressed="${on}">${on ? ic('check') : ''}${bayrak ? `<img src="${url(bayrak)}" alt="" loading="lazy">` : ''}${esc(ad)}</button>`;
  const ZSAYI = Object.fromEntries((V.facetler.find(f => f.key === 'zorluk')?.options || []).map(o => [o.label, o.count]));
  const BSAYI = Object.fromEntries((V.facetler.find(f => f.key === 'beslenme')?.options || []).map(o => [o.label, o.count]));
  // Web onboarding etiketi → listedeki Beslenme/Tip karşılığı (yalnız birebir karşılığı olanlarda tarif sayısı gösterilir)
  const DIYET_SAYI = d => d === DIYET[0] ? st['Denenmiş tarif'] : BSAYI[d] != null ? DG.sayi(BSAYI[d]) : BSAYI[d + 'li'] != null ? DG.sayi(BSAYI[d + 'li']) : '';
  // Seçim kartı: ortak DG.secimKart (dg-bilesen.css .dgu-secim-*); bayrak ayrı ortak bileşende (DG.bayrakSecim).
  const secimKart = o => DG.secimKart(o);
  const izgara = (koyu, cls, aria, ic2, rol = 'group') => `<div class="dgu-secim-izgara${cls ? ' ' + cls : ''}${koyu ? ' is-koyu' : ''}" role="${rol}" aria-label="${esc(aria)}">${ic2}</div>`;
  // Mutfak: ortak bayrak seçimi (ortak/dg-bayrak.css + DG.bayrakSecim; ana-v3 Dünya Mutfakları dili, Tarifler filtresiyle aynı).
  const mutfakHtml = (S, koyu) => DG.bayrakSecim(MUTFAK_LISTE, {ad: 'mutfak', secili: S.mutfak, ilk: ILK_MUTFAK, koyu: !!koyu});
  const diyetHtml = (S, koyu) => izgara(koyu, '', 'Beslenme tarzı', DIYET.map(d => { const n = DIYET_SAYI(d); return secimKart({grup: 'diyet', k: d, ad: d, alt: n ? `${n} tarif` : '', secili: S.diyet.includes(d)}); }).join(''))
    + `<h2 class="ac-alt-bas">${ic(I('allergen'))}Uzak durduğun bir şey var mı?</h2><div class="ac-chipler" role="group" aria-label="Uzak durduklarım">${ALERJEN.map(d => chip('alerjen', d, d, S.alerjen.includes(d))).join('')}</div><p class="ac-yardim ac-not">Bu liste tıbbi tavsiye değildir.</p>`;
  const seviyeHtml = (S, koyu) => izgara(koyu, 'is-tek', 'Beceri seviyesi', SEVIYE.map((z, k) => secimKart({grup: 'seviye', k: z, ad: z, alt: ZSAYI[z] != null ? `${DG.sayi(ZSAYI[z])} tarif` : '', olcek: k + 1, secili: S.seviye === z, tek: true})).join(''), 'radiogroup') + `<p class="ac-yardim ac-not">Seviyen, Ne Pişirsem önerilerinde zorluk seçimine başlangıç olur.</p>`;
  const kategoriHtml = (S, koyu) => izgara(koyu, 'is-uc', 'Kategoriler', KATEGORI.map(k => secimKart({grup: 'kategori', k: k.slug, ad: k.ad, alt: `${DG.sayi(k.sayi)} tarif`, gorsel: k.gorsel, secili: S.kategori.includes(k.slug)})).join(''));

  // Seçim değişimi (tek tanım): Kısıtlamam Yok tekil; seviye tek seçim (yeniden dokununca kalkar).
  function degis(S, grup, k) {
    if (grup === 'seviye') { S.seviye = S.seviye === k ? '' : k; return; }
    const l = S[grup], on = !l.includes(k);
    if (!on) { S[grup] = l.filter(x => x !== k); return; }
    if (grup === 'diyet') { if (k === DIYET[0]) S.diyet = [k]; else S.diyet = [...l.filter(x => x !== DIYET[0]), k]; return; }
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
  // Bayrak seçimi kendi onay kutularını taşır: seçim 'change' ile okunur.
  const bayrakDinle = (root, S, sonra) => root.addEventListener('change', e => { if (e.target.name !== 'mutfak') return; S.mutfak = [...root.querySelectorAll('input[name=mutfak]:checked')].map(x => x.value); sonra?.(); });
  const kaydet = S => store.set('tercih', {...store.get('tercih', {}), ...S});
  const tamamla = (ctx, S) => { kaydet(S); DG.bildir('Tercihlerin kaydedildi'); setTimeout(() => ctx.qs.has('ilk') ? bitir() : location.replace('ayarlar.html'), TK.reveal + TK.fast); };
  const tumuAtla = ctx => () => (ctx.qs.has('ilk') ? bitir() : DG.geri());
  const adimNo = ctx => Math.min(4, Math.max(1, Number(ctx.qs.get('adim')) || 1));
  const adimAdres = n => { const u = new URL(location.href); u.searchParams.set('adim', n); history.replaceState(history.state, '', u); };
  const aciklama = A => `<p class="ac-yardim ac-aciklama">${esc(ACIKLAMA[A.ad])}</p>`;
  const govde = (A, S, koyu) => A.ad === 'mutfak' ? mutfakHtml(S, koyu) : A.ad === 'diyet' ? diyetHtml(S, koyu) : A.ad === 'seviye' ? seviyeHtml(S, koyu) : kategoriHtml(S, koyu);
  const not = '<p class="ac-yardim ac-not">Seçimlerini istediğin zaman Profil › Ayarlar\'dan değiştirebilirsin.</p>';

  // ===== Tercihler 1 · Adım adım (fotoğraflı başlık + beyaz panel) =====
  const tercihler1 = ctx => {
    let n = adimNo(ctx); const S = yukle();
    const html = `<div><section class="ac-t1-bas ac-ekran">${ADIM.map((a, k) => foto(a.gorsel, k === n - 1 ? 'is-on' : '')).join('')}<div class="ac-perde" data-perde></div>${isik}
      <div class="ac-ust"><button class="ac-ibtn" type="button" data-onceki aria-label="Geri">${ic(I('back'))}</button><div class="ac-ilerle" data-ilerle aria-hidden="true">${ADIM.map(() => '<i></i>').join('')}</div><button class="ac-atla" type="button" data-hepsi>Atla</button></div>
      <div class="ac-baslik" data-baslik></div></section><div class="ac-panel" data-panel></div></div>`;
    return {tur: 'tam', baslik: 'Tercihler 1', html, bar: `${btn('Bu adımı atla', {tur: 'ikincil', attrs: 'data-adim-atla'})}${btn('Devam', {attrs: 'data-devam'})}`, sonra(root) {
      root.classList.add('ac-app');
      const bas = root.querySelector('.ac-t1-bas'), panel = root.querySelector('[data-panel]'), fotolar = [...bas.querySelectorAll('.ac-foto')], devam = document.querySelector('[data-devam] span'), atla = document.querySelector('[data-adim-atla] span');
      const yeniden = perde(bas.querySelector('[data-perde]'), bas.querySelector('[data-baslik]'), {son: .8});
      const ciz = (yon = 1) => {
        const A = ADIM[n - 1]; adimAdres(n);
        fotolar.forEach((f, j) => f.classList.toggle('is-on', j === n - 1));
        bas.querySelectorAll('[data-ilerle] i').forEach((x, j) => x.classList.toggle('is-on', j < n));
        bas.querySelector('[data-baslik]').innerHTML = `<p class="t-label">${n} / 4 · ${esc(A.kisa)}</p><h1 class="t-page">${esc(A.baslik)}</h1>`;
        panel.innerHTML = `<div class="ac-adim-ic${yon < 0 ? ' is-geri' : ''}">${aciklama(A)}${govde(A, S)}${n === 4 ? not : ''}</div>`;
        devam.textContent = n === 4 ? 'Tamamla' : 'Devam'; atla.textContent = n === 4 ? 'Şimdilik atla' : 'Bu adımı atla';
        yeniden(); scrollTo({top: 0});
      };
      const ileri = () => { kaydet(S); if (n === 4) tamamla(ctx, S); else { n++; ciz(1); } };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-grup]'); if (b) { degis(S, b.dataset.grup, b.dataset.k); yansit(root, S); return; }
      });
      bayrakDinle(root, S);
      root.querySelector('[data-onceki]').onclick = () => { if (n > 1) { n--; ciz(-1); } else DG.geri(); };
      root.querySelector('[data-hepsi]').onclick = tumuAtla(ctx);
      document.querySelector('[data-devam]').onclick = ileri;
      document.querySelector('[data-adim-atla]').onclick = () => { if (n === 4) tumuAtla(ctx)(); else { n++; ciz(1); } };
      ciz();
    }};
  };

  // ===== Tercihler 2 · Profil vitrini — soru başına bir ekran, fotoğraflı seçim kartları =====
  // Üst alan (kubbe): seçilen seçeneğin gerçek fotoğrafı (yoksa adımın fotoğrafı) + fotoğraftaki tarifin adı · yazarı; ilerleme
  // çubuğu (DG.ilerleme). Beyaz panel (kubbe) adımlar arasında yatay kayar. Seçenekler webdeki kümeler (Tercihler 1 ile aynı veri).
  // Fotoğraf eşleşmesi yalnız gerçek veriden: mutfak = tarifin mutfak etiketi (ozellikler) ya da başlıkta açık “<Ülke> Usulü”;
  // beslenme = tarifin beslenme etiketi; seviye = o zorluktaki ilk tarif; kategori = kategori görseli. Eşleşme yoksa fotoğraf yok.
  const kucuk = s => s.toLocaleLowerCase('tr');
  const mutfakTarif = m => { const ad = kucuk(m.ad.replace(/ Mutfağı$/, '')); return V.tarifler.find(t => (t.ozellikler || []).includes(m.ad)) || V.tarifler.find(t => kucuk(t.baslik).includes(ad + ' usul')); };
  const FOTO_MUTFAK = MUTFAK_LISTE.map(m => ({m, t: mutfakTarif(m)})).filter(x => x.t);
  const DIGER_MUTFAK = MUTFAK_LISTE.filter(m => !FOTO_MUTFAK.some(x => x.m.slug === m.slug));
  // Az eşleşeni olan önce seçer: her tarza ayrı ve doğru etiketli bir fotoğraf.
  const DIYET_FOTO = (() => { const kul = new Set(), o = {}; const aday = d => V.tarifler.filter(x => (x.ozellikler || []).includes(d)); for (const d of DIYET.slice(1).filter(d => aday(d).length).sort((a, b) => aday(a).length - aday(b).length)) { const t = aday(d).find(x => !kul.has(x.slug)); if (t) { kul.add(t.slug); o[d] = t; } } return o; })();
  const seviyeTarif = z => V.tarifler.find(t => t.zorluk === z);
  const t2Sayfa = (A, S) => {
    const ac = `<p class="ac-yardim ac-aciklama">${esc(ACIKLAMA[A.ad])}</p>`;
    if (A.ad === 'mutfak') return ac + izgara(false, 'is-uc', 'Mutfaklar', FOTO_MUTFAK.map(({m}) => secimKart({grup: 'mutfak', k: m.slug, ad: m.ad.replace(/ Mutfağı$/, ''), alt: `${DG.sayi(m.sayi)} tarif`, gorsel: mutfakTarif(m).gorsel, bayrak: m.bayrak, secili: S.mutfak.includes(m.slug)})).join(''))
      + `<h2 class="ac-alt-bas">${ic(I('cuisine'))}Diğer dünya mutfakları</h2>${DG.bayrakSecim(DIGER_MUTFAK, {ad: 'mutfak', secili: S.mutfak, ilk: 8})}`;
    if (A.ad === 'diyet') { const foto = DIYET.filter(d => DIYET_FOTO[d]), duz = DIYET.filter(d => !DIYET_FOTO[d]); const kart = d => { const n = DIYET_SAYI(d); return secimKart({grup: 'diyet', k: d, ad: d, alt: n ? `${n} tarif` : '', gorsel: DIYET_FOTO[d]?.gorsel, secili: S.diyet.includes(d)}); };
      return ac + izgara(false, '', 'Beslenme tarzı', foto.map(kart).join('')) + izgara(false, 'ac-t2-ek', 'Diğer beslenme tarzları', duz.map(kart).join(''))
        + `<h2 class="ac-alt-bas">${ic(I('allergen'))}Uzak durduğun bir şey var mı?</h2><div class="ac-chipler" role="group" aria-label="Uzak durduklarım">${ALERJEN.map(d => chip('alerjen', d, d, S.alerjen.includes(d))).join('')}</div><p class="ac-yardim ac-not">Bu liste tıbbi tavsiye değildir.</p>`; }
    if (A.ad === 'seviye') return ac + izgara(false, 'is-tek ac-t2-dolu', 'Beceri seviyesi', SEVIYE.map((z, k) => secimKart({grup: 'seviye', k: z, ad: z, alt: ZSAYI[z] != null ? `${DG.sayi(ZSAYI[z])} tarif` : '', olcek: k + 1, secili: S.seviye === z, tek: true})).join(''), 'radiogroup');
    return ac + kategoriHtml(S, false);
  };
  // Seçilen seçeneğin fotoğrafı ve künyesi (üst alan)
  const secimFoto = (grup, k) => {
    if (grup === 'mutfak') { const m = MUTFAK_LISTE.find(x => x.slug === k), t = m && mutfakTarif(m); return t && {g: t.gorsel, k: yapan(t)}; }
    if (grup === 'diyet') { const t = DIYET_FOTO[k]; return t && {g: t.gorsel, k: yapan(t)}; }
    if (grup === 'seviye') { const t = seviyeTarif(k); return t && {g: t.gorsel, k: `${yapan(t)} · ${k}`}; }
    if (grup === 'kategori') { const c = KATEGORI.find(x => x.slug === k); return c && {g: c.gorsel, k: `${c.ad} · ${DG.sayi(c.sayi)} tarif`}; }
  };
  const tercihler2 = ctx => {
    let n = adimNo(ctx); const S = yukle();
    const html = `<div class="ac-t2"><section class="dgu-kubbe-ust ac-t2-ust ac-ekran">${foto(ADIM[n - 1].gorsel, 'is-on')}${foto(ADIM[n - 1].gorsel)}<div class="ac-perde" data-perde></div>${isik}
      <div class="ac-ust"><button class="ac-ibtn" type="button" data-onceki aria-label="Geri">${ic(I('back'))}</button><div class="ac-t2-ilerle" data-ilerle></div><button class="ac-atla" type="button" data-hepsi>Atla</button></div>
      <div class="ac-t2-soru" data-soru></div></section><div class="dgu-kubbe-panel ac-t2-panel"><div class="ac-t2-sahne" data-sahne></div></div></div>`;
    return {tur: 'tam', baslik: 'Tercihler 2', html, bar: `${btn('Bu adımı atla', {tur: 'ikincil', attrs: 'data-adim-atla'})}${btn('Devam', {attrs: 'data-devam'})}`, sonra(root) {
      root.classList.add('ac-app');
      const ust = root.querySelector('.ac-t2-ust'), fotolar = [...ust.querySelectorAll('.ac-foto')], soru = root.querySelector('[data-soru]'), sahne = root.querySelector('[data-sahne]');
      const devam = document.querySelector('[data-devam] span'), atla = document.querySelector('[data-adim-atla] span');
      const yeniden = perde(ust.querySelector('[data-perde]'), soru, {son: .82});
      let on = 0;
      const ustFoto = (g, kunye) => { const f = fotolar[1 - on]; if (f.style.backgroundImage.includes(g) && f.classList.contains('is-on')) return; f.style.backgroundImage = `url('${url(g)}')`; fotolar[on].classList.remove('is-on'); f.classList.add('is-on'); on = 1 - on; const kn = soru.querySelector('[data-kunye]'); if (kn) { kn.hidden = !kunye; kn.querySelector('span').textContent = kunye || ''; } };
      const ciz = (yon = 0) => {
        const A = ADIM[n - 1]; adimAdres(n);
        root.querySelector('[data-ilerle]').innerHTML = DG.ilerleme(n, ADIM.length, {});
        soru.innerHTML = `<p class="t-label">${n} / ${ADIM.length} · ${esc(A.kisa)}</p><h1 class="t-page">${esc(A.baslik)}</h1><p class="ac-kanit" data-kunye hidden>${ic('utensils')}<span></span></p>`;
        ustFoto(A.gorsel, '');
        const yeni = document.createElement('div'); yeni.className = 'ac-t2-sayfa'; yeni.innerHTML = t2Sayfa(A, S);
        const eski = sahne.firstElementChild;
        if (eski && yon && !azalt()) { eski.classList.add('is-cik', yon > 0 ? 'is-sol' : 'is-sag'); yeni.classList.add('is-gir', yon > 0 ? 'is-sag' : 'is-sol'); sahne.append(yeni); eski.addEventListener('animationend', () => eski.remove(), {once: true}); yeni.addEventListener('animationend', () => yeni.classList.remove('is-gir', 'is-sag', 'is-sol'), {once: true}); }
        else { sahne.replaceChildren(yeni); }
        devam.textContent = n === ADIM.length ? 'Tamamla' : 'Devam'; atla.textContent = n === ADIM.length ? 'Şimdilik atla' : 'Bu adımı atla';
        yeniden(); scrollTo({top: 0});
      };
      root.addEventListener('click', e => { const b = e.target.closest('[data-grup]'); if (!b) return; degis(S, b.dataset.grup, b.dataset.k); yansit(root, S); const sec = b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-checked') === 'true'; const f = sec && secimFoto(b.dataset.grup, b.dataset.k); if (f) ustFoto(f.g, f.k); else if (!sec) ustFoto(ADIM[n - 1].gorsel, ''); });
      // Fotoğraflı mutfak kartları ve bayrak seçimi aynı listeyi doldurur.
      root.addEventListener('change', e => { if (e.target.name !== 'mutfak') return; const foto = new Set(FOTO_MUTFAK.map(x => x.m.slug)); S.mutfak = [...S.mutfak.filter(k => foto.has(k)), ...[...root.querySelectorAll('input[name=mutfak]:checked')].map(x => x.value)]; });
      const git = d => { kaydet(S); if (n + d > ADIM.length) return tamamla(ctx, S); if (n + d < 1) return DG.geri(); n += d; ciz(d); };
      root.querySelector('[data-onceki]').onclick = () => git(-1);
      root.querySelector('[data-hepsi]').onclick = tumuAtla(ctx);
      document.querySelector('[data-devam]').onclick = () => git(1);
      document.querySelector('[data-adim-atla]').onclick = () => (n === ADIM.length ? tumuAtla(ctx)() : git(1));
      ciz();
    }};
  };

  // ===== Tercihler 3 · Koyu, soru başına bir ekran (büyük bayrak ve fotoğraf karoları, seviye çubukları) =====
  const tercihler3 = ctx => {
    let n = adimNo(ctx); const S = yukle();
    const html = `<div class="ac-ekran ac-t3">${isik}<div class="ac-ust"><button class="ac-ibtn" type="button" data-onceki aria-label="Geri">${ic(I('back'))}</button><div class="ac-ilerle" data-ilerle aria-hidden="true">${ADIM.map(() => '<i></i>').join('')}</div><button class="ac-atla" type="button" data-hepsi>Atla</button></div>
      <div class="ac-t3-govde" data-govde></div><div class="ac-t3-ayak" data-alt-sabit>${btn('Devam', {attrs: 'data-devam', tam: true})}${btn('Bu adımı atla', {tur: 'metin', attrs: 'data-adim-atla', tam: true})}</div></div>`;
    return {tur: 'tam', baslik: 'Tercihler 3', html, sonra(root) {
      koyuGovde();
      const g = root.querySelector('[data-govde]'), devam = root.querySelector('[data-devam] span'), atla = root.querySelector('[data-adim-atla] span');
      const ciz = (yon = 1) => {
        const A = ADIM[n - 1]; adimAdres(n);
        root.querySelectorAll('[data-ilerle] i').forEach((x, j) => x.classList.toggle('is-on', j < n));
        g.innerHTML = `<div class="ac-adim-ic${yon < 0 ? ' is-geri' : ''}"><div class="ac-soru"><p class="t-label">${n} / 4 · ${esc(A.kisa)}</p><h1 class="t-page">${esc(A.baslik)}</h1>${aciklama(A)}</div>${govde(A, S, true)}${n === 4 ? not : ''}</div>`;
        devam.textContent = n === 4 ? 'Tamamla' : 'Devam'; atla.textContent = n === 4 ? 'Şimdilik atla' : 'Bu adımı atla'; g.scrollTop = 0;
      };
      root.addEventListener('click', e => { const b = e.target.closest('[data-grup]'); if (b) { degis(S, b.dataset.grup, b.dataset.k); yansit(root, S); } }); bayrakDinle(root, S);
      root.querySelector('[data-onceki]').onclick = () => { if (n > 1) { n--; ciz(-1); } else DG.geri(); };
      root.querySelector('[data-hepsi]').onclick = tumuAtla(ctx);
      root.querySelector('[data-devam]').onclick = () => { kaydet(S); if (n === 4) tamamla(ctx, S); else { n++; ciz(1); } };
      root.querySelector('[data-adim-atla]').onclick = () => { if (n === 4) tumuAtla(ctx)(); else { n++; ciz(1); } };
      ciz();
    }};
  };

  // Kayıt: alternatif 1 mevcut adresleri taşır (uygulama girişi ve diğer sayfaların bağlantıları için).
  DG.sayfa('acilis', acilis1); DG.sayfa('karsilama', karsilama1); DG.sayfa('tercihler', tercihler1);
  DG.sayfa('acilis-2', acilis2); DG.sayfa('karsilama-2', karsilama2); DG.sayfa('tercihler-2', tercihler2);
  DG.sayfa('acilis-3', acilis3); DG.sayfa('karsilama-3', karsilama3); DG.sayfa('tercihler-3', tercihler3);

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
