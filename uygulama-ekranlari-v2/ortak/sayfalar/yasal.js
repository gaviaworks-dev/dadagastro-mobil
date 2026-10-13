/* G6 · Yasal ve kurumsal (docs/52 §3.6 Y1–Y6): yasal metinler dizini, yasal metin (tek şablon, 26 metin), hakkımızda, iletişim, künye.
   Veri: DGICERIK (ortak/uret/icerik-cek.mjs — canlı dadagastro.com yalnız GET ile okundu, metin değiştirilmez).
   Kaynak satır içi vurguları (strong/em) korunur; bağlantılar uygulama sayfalarına eşlenir, karşılığı olmayan (Mutfak Sırları) “Yakında” der.
   Doldurulmamış yer tutucu satırlar (“MERSİS no: [MERSİS no]”, “Yürürlük tarihi: [yürürlük tarihi]”) çizilmez: verisi yok.
   Fotoğraflı üst alanlar ortak KUBBE kalıbıyla (tur: 'banner', docs/55 §2e); görseller canlıdaki sayfa görselleri (assets/kurumsal). */
(() => {
  const {ic, I, esc, btn, bas, alan, secim, secAlan, durum, satir} = DG;
  const C = window.DGICERIK || {yasal: {}, sayfa: {}, yasalDizin: {gruplar: [], menu: []}};
  const DZ = C.yasalDizin;
  const SLUG = Object.keys(C.yasal);
  const yakinda = 'data-yakinda';

  // ---------- Bağlantı eşleme (canlı adres → uygulama sayfası) ----------
  const EK = {'/': '../ana-v3.html', '/tarifler': '../liste-v2.html', '/sefler': 'sefler.html', '/pro': 'pro.html', '/giris': 'giris.html', '/kayit': 'kayit.html', '/ara': 'arama.html',
    '/puf-noktalari': 'puf-noktalari.html', '/hakkimizda': 'hakkimizda.html', '/kunye': 'kunye.html', '/iletisim': 'iletisim.html', '/yasal': 'yasal.html',
    '/video-mutfagi': 'videolar.html', '/hesabim/cozum-merkezi': 'destek.html', '/hesabim/ayarlar': 'ayarlar.html', '/hesabim/mutfak-defterim': 'kaydettiklerim.html'};
  const esle = href => {
    if (!href) return null;
    if (/^mailto:/i.test(href)) return href;
    let u; try { u = new URL(href, 'https://dadagastro.com/'); } catch { return null; }
    const proto = /^yasal__([a-z0-9-]+)\.html$/.exec(href); // canlı metinlerdeki eski prototip bağlantıları (kırık)
    if (proto) return SLUG.includes(proto[1]) ? `yasal-metin.html?slug=${proto[1]}` : 'yasal.html';
    if (u.hostname !== 'dadagastro.com') return u.href;
    const p = u.pathname.replace(/\/$/, '') || '/';
    const y = /^\/yasal\/([a-z0-9-]+)$/.exec(p);
    if (y) return SLUG.includes(y[1]) ? `yasal-metin.html?slug=${y[1]}` : 'yasal.html';
    const s = /^\/sefler\/([^/]+)$/.exec(p);
    if (s) return `sef.html?kullanici=${encodeURIComponent(s[1])}`;
    return EK[p] ? EK[p] + u.search + u.hash : null;
  };
  // Zengin metin: yalnız strong/em/code/br ve eşlenmiş bağlantılar; geri kalan her şey düz metin (kaynak güvenilse de yeniden süzülür).
  const zengin = html => {
    const t = document.createElement('template'); t.innerHTML = html || '';
    const yaz = n => [...n.childNodes].map(c => {
      if (c.nodeType === 3) return esc(c.textContent);
      if (c.nodeType !== 1) return '';
      const ad = c.tagName.toLowerCase(), ic2 = yaz(c);
      if (ad === 'br') return '<br>';
      if (['strong', 'em', 'code'].includes(ad)) return `<${ad}>${ic2}</${ad}>`;
      if (ad === 'a') { const h = esle(c.getAttribute('href')); if (!h) return `<button type="button" class="ys-link" ${yakinda}>${ic2}</button>`; const dis = /^https?:/.test(h); return `<a href="${esc(h)}"${dis ? ' target="_blank" rel="noopener"' : ''}>${ic2}</a>`; }
      return ic2;
    }).join('');
    return yaz(t.content);
  };
  const duz = html => { const t = document.createElement('template'); t.innerHTML = html || ''; return t.content.textContent.replace(/\s+/g, ' ').trim(); };
  // Kaynak yer tutucu cümleler (canlı “[Üyelik Sözleşmesi] metni yakında eklenecek. Bu bir yer tutucudur.”) da çizilmez (Beyar K21: ekranda yer tutucu metin yok).
  const yerTutucu = x => /yer tutucudur|metni yakında eklenecek/i.test(duz(x)) || /^[^:\[]{1,60}:\s*\[[^\]]+\]\s*$/.test(duz(x)) || (/^Sürüm\b/.test(duz(x)) && /\[[^\]]*tarihi\]/.test(duz(x)));
  const yakindaBagla = root => root.addEventListener('click', e => { if (e.target.closest('[data-yakinda]')) { e.preventDefault(); DG.bildir('Yakında'); } });
  // Bilgi satırı (dgu-eylem is-bilgi): etiket üstte, değer altta; bağlantılıysa eylem kartı.
  const bilgi = ({ikon, etiket, deger, alt, href}) => {
    const ic1 = `<span class="dgu-eylem-ikon">${ic(ikon || I('info'))}</span>`, m = `<span class="dgu-eylem-metin ys-bilgi"><small>${esc(etiket)}</small><b>${esc(deger)}</b>${alt ? `<small>${esc(alt)}</small>` : ''}</span>`;
    return href ? `<a class="dgu-eylem ys-bilgi-kart" href="${esc(href)}">${ic1}${m}${ic(I('rowNext'))}</a>` : `<div class="dgu-eylem is-bilgi ys-bilgi-kart">${ic1}${m}<span></span></div>`;
  };
  const metinAlt = txt => /@/.test(txt) && !/\s/.test(txt.trim()) ? 'mailto:' + txt.trim() : null;

  // ---------- Y1 · Yasal metinler dizini ----------
  const slugOf = href => (/\/yasal\/([a-z0-9-]+)/.exec(href || '') || [])[1];
  const GRUP_IKON = {A: 'file-signature', B: 'copyright', C: 'shield-halved', D: 'scale-balanced'};
  const kalemHref = k => { const s = slugOf(k.href); return s ? `yasal-metin.html?slug=${s}` : esle(k.href) || 'yasal.html'; };
  DG.sayfa('yasal', ctx => {
    const grupta = new Set(DZ.gruplar.flatMap(g => g.kalemler.map(k => slugOf(k.href) || 'kunye-sayfa')));
    const diger = DZ.menu.filter(k => !grupta.has(slugOf(k.href)) && !(slugOf(k.href) === 'kunye'));
    const gruplar = [...DZ.gruplar, ...(diger.length ? [{baslik: 'Diğer metinler', ikon: 'folder-open', kalemler: diger}] : [])];
    const q0 = ctx.qs.get('q') || '';
    const html = `<section class="dgu-ic dgu-yigin">
        <p class="c-muted">${zengin(DZ.giris)}</p>
        <div class="dgu-girdi${q0 ? ' has-text' : ''}">${ic(I('search'))}<input id="f-yasal-ara" type="search" placeholder="Metin ara" aria-label="Yasal metinlerde ara" value="${esc(q0)}" autocomplete="off"><button class="dgu-ibtn dgu-temizle" type="button" data-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div>
      </section>
      <div class="dgu-ic ys-gruplar" data-gruplar>${DG.akordiyon(gruplar.map(g => ({ikon: GRUP_IKON[(/^([A-Z])\./.exec(g.baslik) || [])[1]] || 'folder-open', baslik: g.baslik, alt: `${g.kalemler.length} metin`, icerik: `<div class="dgu-satirlar">${g.kalemler.map(k => satir({ikon: k.ikon || 'file-lines', baslik: k.ad, href: kalemHref(k)})).join('')}</div>`})), {ad: 'yg', acik: 0})}</div>
      <section class="dgu-ic ys-sonuc" data-sonuc hidden aria-live="polite"><h2 class="t-label c-muted dgu-grup-baslik" data-sayi></h2><div class="dgu-satirlar">${gruplar.flatMap(g => g.kalemler.map(k => satir({ikon: k.ikon || 'file-lines', baslik: k.ad, alt: g.baslik, href: kalemHref(k), attrs: `data-ad="${esc(k.ad.toLocaleLowerCase('tr'))}"`}))).join('')}</div></section>
      <div class="dgu-ic" data-bos hidden>${durum({ikon: I('search'), baslik: 'Eşleşen metin yok', metin: 'Başka bir kelimeyle dene ya da aramayı temizle.', eylem: btn('Aramayı temizle', {tur: 'ikincil', attrs: 'data-temizle'})})}</div>
      <p class="dgu-ic t-meta c-muted ys-ayak">${esc(DZ.ayak)}</p>`;
    return {tur: 'banner', geri: true, baslik: 'Yasal Metinler', baslikHeader: '', menuAktif: 'privacy', iskelet: DG.iskelet(6, 'satir'),
      banner: {baslik: DZ.baslik, alt: DZ.alt, gorsel: 'assets/kurumsal/yasal.avif'}, html, sonra(root) {
        const inp = root.querySelector('#f-yasal-ara'); if (!inp) return;
        const sayi = root.querySelector('[data-sayi]'), bos = root.querySelector('[data-bos]'), sonuc = root.querySelector('[data-sonuc]'), gr = root.querySelector('[data-gruplar]');
        // Arama yokken gruplar ortak akordiyonda (tek grup açık); aramada bütün eşleşmeler tek düz listede, grup adı alt satırda.
        const suz = () => {
          const q = inp.value.trim().toLocaleLowerCase('tr'); let n = 0;
          inp.parentElement.classList.toggle('has-text', !!q);
          sonuc.querySelectorAll('[data-ad]').forEach(a => { const on = !!q && a.dataset.ad.includes(q); a.hidden = !on; if (on) n++; });
          gr.hidden = !!q; sonuc.hidden = !q || !n; bos.hidden = !q || n > 0; sayi.textContent = `${n} metin bulundu`;
          const u = new URL(location.href); q ? u.searchParams.set('q', inp.value.trim()) : u.searchParams.delete('q'); history.replaceState(null, '', u);
        };
        inp.addEventListener('input', suz);
        root.addEventListener('click', e => { if (e.target.closest('[data-temizle]')) { inp.value = ''; suz(); inp.focus(); } });
        suz();
      }};
  });

  // ---------- Y2 · Yasal metin (tek şablon) ----------
  const numarasiz = s => s.replace(/^\d+(\.\d+)*\.?\s+/, '');
  DG.sayfa('yasal-metin', ctx => {
    const slug = ctx.qs.get('slug') || 'kullanim-kosullari', Y = C.yasal[slug];
    if (!Y || Y.durum >= 400) return {tur: 'alt', baslik: 'Yasal metin', iskelet: false, html: durum({ikon: 'file-circle-question', baslik: 'Bu metni bulamadık', metin: 'Adres değişmiş ya da bağlantı eskimiş olabilir. Bütün metinler Yasal Metinler sayfasında.', tam: true, eylem: btn('Yasal Metinler', {href: 'yasal.html', ikon: 'scale-balanced'})})};
    const bl = Y.bloklar.filter(([t, x]) => !(t === 'p' && yerTutucu(x))).map(([t, x]) => (t === 'ul' || t === 'ol') ? [t, x.filter(li => !yerTutucu(li))] : [t, x]).filter(([t, x]) => !Array.isArray(x) || x.length);
    // Metnin kendisi kaynakta henüz yoksa (yalnız yer tutucu): ortak boş durum, Yasal Metinler'e dönüş.
    if (!bl.some(([t]) => !/^h[1-4]$/.test(t))) return {tur: 'alt', baslik: Y.baslik || 'Yasal metin', iskelet: false, html: durum({ikon: 'file-lines', baslik: `${Y.baslik || 'Bu metin'} henüz yayımlanmadı`, metin: 'Metin yayımlandığında burada okunabilecek. Diğer bütün metinler Yasal Metinler sayfasında.', tam: true, eylem: btn('Yasal Metinler', {href: 'yasal.html', ikon: 'scale-balanced'})})};
    const bTur = bl.some(([t]) => t === 'h2') ? 'h2' : 'h3';
    const blok = ([t, x]) => {
      if (/^h[2-4]$/.test(t)) return `<h3 class="ys-bas">${zengin(x)}</h3>`;
      if (t === 'ul' || t === 'ol') return `<${t}>${x.map(li => `<li>${zengin(li)}</li>`).join('')}</${t}>`;
      if (t === 'bq') return `<blockquote class="dgu-bilgi"><p>${zengin(x)}</p></blockquote>`;
      if (t === 'tablo') return `<div class="ys-tablo" role="region" aria-label="Tablo" tabindex="0"><table>${x.map((r, i) => `<tr>${r.map(c => i ? `<td>${zengin(c)}</td>` : `<th scope="col">${zengin(c)}</th>`).join('')}</tr>`).join('')}</table></div>`;
      return `<p>${zengin(x)}</p>`;
    };
    // Bölümlere ayır: ilk ana başlıktan önceki giriş + [başlık, bloklar] bölümleri.
    const giris = [], bolumler = [];
    bl.forEach(x => { if (x[0] === bTur) bolumler.push({baslik: x[1], bloklar: []}); else (bolumler.length ? bolumler[bolumler.length - 1].bloklar : giris).push(x); });
    const toc = bolumler.map((b, k) => ['b' + (k + 1), numarasiz(duz(b.baslik))]);
    // Uzun metin (6+ bölüm): bölümler ortak akordiyonda, en çok bir bölüm açık; kısa metin düz okunur.
    const UZUN = bolumler.length >= 6;
    const hashNo = (/^#b(\d+)$/.exec(location.hash) || [])[1];
    const ilk = UZUN ? (hashNo ? Math.min(bolumler.length, +hashNo) - 1 : 0) : 0;
    const ozet = b => { const p = b.bloklar.find(([t]) => t === 'p' || t === 'ul' || t === 'ol'); return p ? duz(Array.isArray(p[1]) ? p[1][0] : p[1]) : ''; };
    const govde = (giris.length ? `<div class="dgu-metin ys-giris">${giris.map(blok).join('')}</div>` : '') + (UZUN
      ? DG.akordiyon(bolumler.map((b, k) => ({id: toc[k][0], ikon: Y.ikon || 'file-lines', baslik: toc[k][1], alt: ozet(b), icerik: `<div class="dgu-metin">${b.bloklar.map(blok).join('')}</div>`})), {ad: 'ys', acik: ilk})
      : `<div class="dgu-metin">${bolumler.map((b, k) => `<h2 id="${toc[k][0]}" class="ys-bas" tabindex="-1">${zengin(b.baslik)}</h2>${b.bloklar.map(blok).join('')}`).join('')}</div>`);
    const surum = (/Sürüm:?\s*([\d.]+)/.exec(Y.surum) || [])[1];
    const meta = [surum ? `Sürüm ${surum}` : '', Y.guncelleme ? `Son güncelleme: ${Y.guncelleme}` : ''].filter(Boolean).join(' · ');
    const sira = DZ.menu.map(k => slugOf(k.href)).filter(s => C.yasal[s]), i = sira.indexOf(slug);
    const komsu = [[sira[i - 1], 'Önceki metin', I('back')], [sira[i + 1], 'Sonraki metin', I('seeAll')]].filter(([s]) => s);
    const html = `<header class="dgu-baslik ys-bas-alan"><p class="t-label c-deep ys-etiket">${ic(Y.ikon || 'scale-balanced')}${esc(Y.etiket || 'Yasal Metinler')}</p><h1 class="t-page">${esc(Y.baslik)}</h1>${meta ? `<p class="t-meta c-muted">${esc(meta)}</p>` : ''}</header>
      ${toc.length >= 3 ? `<nav class="dgu-ic ys-icindekiler-kap" aria-label="İçindekiler">${DG.akordiyon([{ikon: 'list-ol', baslik: 'İçindekiler', alt: `${toc.length} başlık`, icerik: `<ol class="ys-icindekiler">${toc.map(([id, m], k) => `<li><a href="#${id}"><span class="ys-no">${k + 1}</span><span>${esc(m)}</span></a></li>`).join('')}</ol>`}], {ad: 'toc', acik: ctx.qs.get('icindekiler') === 'acik' ? 0 : -1})}</nav>` : ''}
      <article class="dgu-ic ys-metin${UZUN ? ' is-bolumlu' : ''}">${govde}</article>
      <footer class="dgu-ic dgu-yigin-12 ys-son">
        ${Y.ayak ? `<p class="t-meta c-muted">${esc(Y.ayak)}</p>` : ''}
        ${komsu.length ? `<div class="dgu-satirlar ys-komsu">${komsu.map(([s, e, ik]) => satir({ikon: ik, baslik: C.yasal[s].baslik, alt: e, href: `yasal-metin.html?slug=${s}`})).join('')}</div>` : ''}
        ${btn('Tüm yasal metinler', {tur: 'ikincil', href: 'yasal.html', ikon: 'list', tam: true})}
      </footer>`;
    return {tur: 'alt', baslik: Y.baslik, menuAktif: 'privacy', iskelet: false, html, sonra(root) {
      yakindaBagla(root);
      // İçindekiler → bölüm: akordiyondaysa önce açılır (ortak düğme), açılış hareketi bitince başına kaydırılır.
      const git = (id, kaydir = true) => {
        const h = document.getElementById(id); if (!h) return;
        const bas = h.matches('.dgu-ak-bolum') ? h.querySelector('.dgu-bolum-bas') : h;
        if (h.matches('.dgu-ak-bolum') && !h.classList.contains('is-acik')) bas.click();
        const son = () => { h.scrollIntoView({behavior: kaydir && !motion.matches ? 'smooth' : 'auto', block: 'start'}); bas.focus({preventScroll: true}); };
        setTimeout(son, h.matches('.dgu-ak-bolum') && !motion.matches ? DGTOKENS.motion.base + 20 : 0);
        history.replaceState(null, '', '#' + id);
      };
      root.querySelectorAll('.ys-icindekiler a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); git(a.getAttribute('href').slice(1)); }));
      if (location.hash && document.getElementById(location.hash.slice(1))) requestAnimationFrame(() => document.getElementById(location.hash.slice(1)).scrollIntoView({block: 'start'}));
    }};
  });

  // ---------- Y3 · Hakkımızda ----------
  DG.sayfa('hakkimizda', ctx => {
    const H = C.sayfa.hakkimizda;
    if (!H) return {tur: 'alt', baslik: 'Hakkımızda', html: DG.hata('sunucu', true)};
    const hik = H.hikaye.bloklar.map(([t, x]) => t === 'bq' ? `<blockquote class="dgu-bilgi ys-alinti"><p>${zengin(x)}</p></blockquote>` : t === 'p' ? `<p>${zengin(x)}</p>` : `<${t === 'h2' ? 'h2' : 'h3'}>${zengin(x)}</${t === 'h2' ? 'h2' : 'h3'}>`).join('');
    const bolumHedef = {'#hikaye': '#hikaye', '#degerler': '#degerler', '#kunye': '#yasal'};
    const html = `<nav class="dgu-ic" aria-label="Sayfa bölümleri"><div class="dgu-serit">${H.bolumler.map(([h, m]) => `<a class="dgu-chip" href="${bolumHedef[h] || '#hikaye'}">${esc(m)}</a>`).join('')}</div></nav>
      <section class="dgu-ic dgu-yigin ys-cizgi" id="hikaye" tabindex="-1">
        <p class="t-label c-deep">${esc(H.hikaye.etiket)}</p>
        <div class="dgu-metin">${hik}</div>
        ${H.rozet.baslik ? `<div class="dgu-eylem is-bilgi"><span class="dgu-eylem-ikon">${ic(H.rozet.ikon || I('community'))}</span><span class="dgu-eylem-metin"><b>${esc(H.rozet.baslik)}</b><small>${esc(H.rozet.metin)}</small></span><span></span></div>` : ''}
      </section>
      <section class="dgu-bolum" id="degerler" tabindex="-1" aria-labelledby="ys-deg">
        <div class="dgu-yigin-8"><p class="t-label c-deep">${esc(H.degerler.etiket)}</p><h2 class="t-section" id="ys-deg">${esc(H.degerler.baslik)}</h2><p class="c-muted">${esc(H.degerler.alt)}</p></div>
        <ul class="dgu-yigin-12" data-mt>${H.degerler.kartlar.map(k => `<li class="dgu-kart ys-deger"><span class="dgu-eylem-ikon" aria-hidden="true">${ic(k.ikon)}</span><h3 class="t-sub">${esc(k.baslik)}</h3><p class="c-muted">${esc(k.metin)}</p></li>`).join('')}</ul>
      </section>
      ${H.bant.sayilar.length ? `<section class="dgu-bolum" aria-labelledby="ys-say"><div class="dgu-yigin-8"><p class="t-label c-deep">${esc(H.bant.etiket)}</p><h2 class="t-section" id="ys-say">${esc(H.bant.baslik)}</h2></div><dl class="dgu-istatistik" data-sutun="${H.bant.sayilar.length === 4 ? 2 : H.bant.sayilar.length}" data-mt>${H.bant.sayilar.map(([d, e]) => `<div><dt>${esc(e)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl></section>` : ''}
      <section class="dgu-bolum" id="yasal" tabindex="-1" aria-labelledby="ys-yasal">
        <div class="dgu-yigin-8"><h2 class="t-section" id="ys-yasal">${esc(H.yasal.baslik)}</h2><p class="c-muted">${esc(H.yasal.metin)}</p></div>
        <div class="dgu-satirlar" data-mt>${satir({ikon: 'scale-balanced', baslik: 'Yasal Metinler', alt: `${SLUG.length} metin`, href: 'yasal.html'})}${satir({ikon: 'stamp', baslik: 'Künye', alt: C.sayfa.kunye?.alt || '', href: 'kunye.html'})}</div>
        ${H.yasal.not ? `<p class="t-meta c-muted ys-not" data-mt>${ic(I('info'))}<span>${zengin(H.yasal.not)}</span></p>` : ''}
      </section>
      ${H.kopru.kartlar.length ? `<section class="dgu-bolum" aria-labelledby="ys-kopru"><div class="dgu-yigin-8"><p class="t-label c-deep">${esc(H.kopru.etiket)}</p><h2 class="t-section" id="ys-kopru">${esc(H.kopru.baslik)}</h2></div><div class="dgu-yigin-12" data-mt>${H.kopru.kartlar.map(k => `<a class="dgu-eylem" href="${esc(esle(k.href) || 'sefler.html')}"><span class="dgu-eylem-ikon">${ic(k.ikon)}</span><span class="dgu-eylem-metin"><b>${esc(k.baslik)}</b><small>${esc(k.metin)}</small></span>${ic(I('rowNext'))}</a>`).join('')}</div></section>` : ''}`;
    return {tur: 'banner', geri: true, baslik: 'Hakkımızda', baslikHeader: '', menuAktif: 'about', iskelet: false,
      banner: {baslik: H.baslik, alt: H.giris, gorsel: 'assets/kurumsal/hakkimizda-ust.webp', sayaclar: H.sayilar}, html, sonra(root) {
        yakindaBagla(root);
        root.querySelectorAll('.dgu-serit a[href^="#"]').forEach(a => a.addEventListener('click', e => { const h = document.querySelector(a.getAttribute('href')); if (!h) return; e.preventDefault(); h.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'start'}); h.focus({preventScroll: true}); }));
      }};
  });

  // ---------- Y5 · İletişim (canlı /iletisim form alanları birebir; gönderim yalnız bu cihazda) ----------
  const EPOSTA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MAX = {ad: 80, soyad: 80, eposta: 190, mesaj: 1000}; // canlı doğrulama kuralları (KurumsalDenetleyicisi::iletisimGonder)
  DG.sayfa('iletisim', ctx => {
    const L = C.sayfa.iletisim;
    if (!L) return {tur: 'alt', baslik: 'İletişim', html: DG.hata('sunucu', true)};
    const A = L.alanlar, konuVar = k => L.konular.some(([v]) => v === k);
    const veriSilme = ctx.qs.get('talep') === 'veri-silme';
    const ilk = {konu: veriSilme ? 'genel' : konuVar(ctx.qs.get('konu')) ? ctx.qs.get('konu') : '', mesaj: veriSilme ? 'Veri silme talebi\nDadaGastro hesabımdaki e-posta:\nSilinmesini istediğim veriler:' : ''};
    const dogrula = (d, telHata = '') => {
      const h = {};
      if (!d.ad) h.ad = 'Ad zorunlu.'; else if (d.ad.length > MAX.ad) h.ad = `Ad en çok ${MAX.ad} karakter olabilir.`;
      if (!d.soyad) h.soyad = 'Soyad zorunlu.'; else if (d.soyad.length > MAX.soyad) h.soyad = `Soyad en çok ${MAX.soyad} karakter olabilir.`;
      if (!d.eposta) h.eposta = 'E-posta zorunlu.'; else if (!EPOSTA.test(d.eposta)) h.eposta = 'Geçerli bir e-posta adresi gir.';
      if (telHata) h.telefon = telHata;
      if (!d.konu) h.konu = 'Konu zorunlu.'; else if (!konuVar(d.konu)) h.konu = 'Seçilen konu geçersiz.';
      if (!d.mesaj) h.mesaj = 'Mesaj zorunlu.'; else if (d.mesaj.length > MAX.mesaj) h.mesaj = `Mesaj en çok ${MAX.mesaj} karakter olabilir.`;
      if (!d.kvkk_onay) h.kvkk_onay = 'KVKK Metni onaylanmalı.';
      return h;
    };
    const ciz = (d = {}, h = {}) => {
      const hatalar = Object.values(h);
      return `${hatalar.length ? `<div class="ys-uyari" role="alert" tabindex="-1" data-ozet><p>${ic(I('error'))}<span>Mesaj gönderilemedi. Lütfen aşağıdaki alanları kontrol et:</span></p><ul>${hatalar.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
        <div class="dgu-ikili ys-ikili">${alan({ad: 'ad', etiket: A.ad.etiket, deger: d.ad, hata: h.ad, oto: 'given-name', zorunlu: A.ad.zorunlu})}${alan({ad: 'soyad', etiket: A.soyad.etiket, deger: d.soyad, hata: h.soyad, oto: 'family-name', zorunlu: A.soyad.zorunlu})}</div>
        ${alan({ad: 'eposta', etiket: A.eposta.etiket, tur: 'email', deger: d.eposta, hata: h.eposta, oto: 'email', zorunlu: A.eposta.zorunlu})}
        ${DG.telefon({ad: 'telefon', ulkeAd: 'telefon_ulke', etiket: A.telefon.etiket, deger: d.telefon || '', ulke: d.telefon_ulke || 'TR', zorunlu: A.telefon.zorunlu, hata: h.telefon})}
        ${secAlan({ad: 'konu', etiket: A.konu.etiket, secenekler: L.konular, deger: d.konu || '', yer: L.konuYer, zorunlu: A.konu.zorunlu, hata: h.konu, yardim: A.konu.yardim})}
        ${alan({ad: 'mesaj', etiket: A.mesaj.etiket, cok: true, deger: d.mesaj, hata: h.mesaj, zorunlu: A.mesaj.zorunlu, yardim: `${(d.mesaj || '').length}/${A.mesaj.max || MAX.mesaj}`})}
        <div class="ys-onay${h.kvkk_onay ? ' is-hata' : ''}">${secim('kvkk_onay', zengin(L.onay), {secili: d.kvkk_onay, zorunlu: true})}${h.kvkk_onay ? `<p class="dgu-hata">${ic(I('error'))}${esc(h.kvkk_onay)}</p>` : ''}</div>
        <p class="t-meta c-muted ys-not">${ic(I('privacy'))}<span>${esc(L.koruma)}</span></p>
        <div class="dgu-yigin-12"><p class="t-meta c-muted">${zengin(L.gonderNot)}</p><button class="dgu-btn dgu-btn--tam" type="submit">${ic('paper-plane')}<span>${esc(L.gonder)}</span></button></div>`;
    };
    const basari = () => durum({ikon: 'circle-check', baslik: 'Başvurun kaydedildi', metin: 'Mesajın alındı.', eylem: `<div class="dgu-yigin-12 ys-eylemler"><p class="t-meta c-muted">${zengin(L.gonderNot)}</p>${btn('Ana sayfa', {href: DG.KOK.ana, ikon: I('home'), tam: true})}${btn('Yeni mesaj yaz', {tur: 'ikincil', href: 'iletisim.html', tam: true})}</div>`});
    const hataOrnek = {ad: '', soyad: 'Yılmaz', eposta: 'ornek@eposta', konu: '', mesaj: ''};
    const form = ctx.durum === 'tamam' ? `<section class="dgu-ic ys-form-kap">${basari()}</section>` : `<section class="dgu-ic dgu-yigin ys-form-kap" aria-labelledby="ys-form">
        <div class="dgu-yigin-8"><h2 class="t-section" id="ys-form">${esc(L.formBaslik)}</h2><p class="c-muted">${esc(L.formAlt)}</p></div>
        <form class="dgu-yigin" data-form novalidate>${ctx.durum === 'hata-form' ? ciz(hataOrnek, dogrula(hataOrnek)) : ciz(ilk)}</form>
      </section>`;
    const html = `${form}
      <section class="dgu-bolum" aria-labelledby="ys-bilgi"><h2 class="t-section" id="ys-bilgi">${esc(L.bilgiBaslik)}</h2><div class="dgu-yigin-12" data-mt>${L.bilgiler.map(b => bilgi({...b, href: metinAlt(b.deger)})).join('')}</div></section>
      <section class="dgu-bolum" aria-labelledby="ys-adim"><h2 class="t-section" id="ys-adim">${esc(L.adimBaslik)}</h2><ol class="ys-adimlar" data-mt>${L.adimlar.map((a, i) => `<li><span class="ys-no" aria-hidden="true">${i + 1}</span><span class="dgu-satir-metin"><b>${esc(a.baslik)}</b><small>${esc(a.metin)}</small></span></li>`).join('')}</ol></section>`;
    return {tur: 'banner', geri: true, baslik: 'İletişim', baslikHeader: '', iskelet: false,
      banner: {baslik: L.baslik, alt: L.baslikEk, gorsel: 'assets/kurumsal/iletisim.avif'}, html, sonra(root) {
        yakindaBagla(root);
        const kap = root.querySelector('[data-form]'); if (!kap) return;
        // Sayaç etiketle aynı satırda (docs/55 §2i: tek küçük öğe kendi satırını kaplamaz).
        const tel = () => { Object.entries(MAX).forEach(([k, m]) => kap.querySelector(`input[name="${k}"]:not([type=hidden]), textarea[name="${k}"]`)?.setAttribute('maxlength', m)); kap.querySelector('#f-mesaj')?.closest('.dgu-alan').classList.add('ys-mesaj'); };
        const say = () => { const ta = kap.querySelector('#f-mesaj'), y = ta?.closest('.dgu-alan').querySelector('.dgu-yardim'); if (y) { y.textContent = `${ta.value.length}/${MAX.mesaj}`; y.setAttribute('aria-live', 'polite'); } };
        tel(); say();
        kap.addEventListener('input', e => { if (e.target.name === 'mesaj') say(); const a = e.target.closest('.dgu-alan'); if (a?.classList.contains('is-hata')) { a.classList.remove('is-hata'); a.querySelector('.dgu-hata')?.remove(); } });
        kap.addEventListener('change', e => { if (e.target.name === 'kvkk_onay' && e.target.checked) { const o = e.target.closest('.ys-onay'); o.classList.remove('is-hata'); o.querySelector('.dgu-hata')?.remove(); } });
        kap.addEventListener('submit', e => {
          e.preventDefault();
          const f = e.target, d = {}; [...f.elements].forEach(el => { if (el.name) d[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim(); });
          const h = dogrula(d, DG.telefonHata(f));
          if (Object.keys(h).length) { kap.innerHTML = ciz(d, h); tel(); say(); const oz = kap.querySelector('[data-ozet]'); oz.scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth', block: 'center'}); oz.focus({preventScroll: true}); return; }
          const g = kap.closest('section'); g.removeAttribute('aria-labelledby'); g.innerHTML = basari(); g.querySelector('h2')?.setAttribute('tabindex', '-1'); g.querySelector('h2')?.focus(); scrollTo({top: 0});
        });
      }};
  });

  // ---------- Y6 · Künye ----------
  DG.sayfa('kunye', ctx => {
    const K = C.sayfa.kunye;
    if (!K) return {tur: 'alt', baslik: 'Künye', html: DG.hata('sunucu', true)};
    const html = `<section class="dgu-ic dgu-yigin">
        <p class="t-label c-deep ys-etiket">${ic('stamp')}${esc(K.etiket)}</p>
        <div class="dgu-yigin-12">${K.satirlar.map(s => bilgi({...s, href: metinAlt(s.deger)})).join('')}</div>
        ${K.not ? `<p class="t-meta c-muted ys-not">${ic(I('info'))}<span>${zengin(K.not)}</span></p>` : ''}
      </section>
      <section class="dgu-bolum" aria-label="İlgili metinler"><div class="dgu-satirlar">${C.yasal.kunye ? satir({ikon: 'file-lines', baslik: C.yasal.kunye.baslik, alt: 'Yasal metin', href: 'yasal-metin.html?slug=kunye'}) : ''}${satir({ikon: 'scale-balanced', baslik: 'Yasal Metinler', alt: `${SLUG.length} metin`, href: 'yasal.html'})}${satir({ikon: 'envelope', baslik: 'İletişim', href: 'iletisim.html'})}</div></section>`;
    return {tur: 'banner', geri: true, baslik: 'Künye', baslikHeader: '', iskelet: false, banner: {baslik: K.baslik, alt: K.alt, gorsel: 'assets/kurumsal/yasal.avif'}, html, sonra: yakindaBagla};
  });
})();
