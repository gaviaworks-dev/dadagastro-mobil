/* Ortak tarif kartı ailesi (docs/41 · R2/R3/R4/R7; docs/46 birleştirme; docs/47 patron seçimleri). Üç ekran bağlı: ana sayfa,
   liste, detay. Bağımlılık: ld-source.js / home-base.js genelleri (esc, photo, saveButton, shortTitle, link, motion).
   docs/47: seçilen tasarım tek ve varsayılandır (gösterge noktalar, kart köşesi 16, rozet a); ?gosterge, ?radius, ?rozet
   seçenek kodu kaldırıldı, eski linklerdeki bu parametreler yok sayılır. Süre/puan ve kaydet zeminsizdir: görselin üstündeki
   yumuşak koyu geçişin (ortak-kart.css) üstünde beyaz durur. Fotoğraf üstü küçük kart (tile) + ikişerli slider (pairs) tek
   bileşen; ekranlar arası gezinmede üye önizlemesi (giris) korunur (carry). */
(() => {
  // İlk gezinme adresi de okunur: ortak ld-source.js ilk çizimde adresi yeniden yazar.
  const firstUrl = (() => { try { return new URL(performance.getEntriesByType('navigation')[0]?.name || location.href); } catch { return new URL(location.href); } })();
  const sources = [firstUrl.searchParams, new URLSearchParams(location.search)], root = document.documentElement;

  const cfg = {href: r => link(r)};
  const fa = name => `<i class="icon fa-solid fa-${name}" aria-hidden="true"></i>`;
  // docs/47 EK · Görüntülenme Türkçe kısaltmayla: 950 · 1,2 B · 3,4 Mn. Veride yoksa ya da 0 ise çizilmez (uydurma sayı yok).
  const views = r => {
    const n = Number(r.views);
    if (!Number.isFinite(n) || n <= 0) return '';
    const short = (v, unit) => `${(Math.floor(v * 10) / 10).toLocaleString('tr', {maximumFractionDigits: 1})} ${unit}`;
    return n >= 1e6 ? short(n / 1e6, 'Mn') : n >= 1e3 ? short(n / 1e3, 'B') : n.toLocaleString('tr');
  };

  // R7: fotoğraf varsa kapak; yoksa baş harf (TR büyük harf), detaydaki dairenin aynısı.
  function avatar(name, photoUrl = '') {
    const initial = esc(String(name || '').trim().slice(0, 1).toLocaleUpperCase('tr'));
    return photoUrl
      ? `<span class="dg-avatar has-photo" style="background-image:url('${esc(photoUrl)}')" aria-hidden="true">${initial}</span>`
      : `<span class="dg-avatar" aria-hidden="true">${initial}</span>`;
  }
  // Yazar bilgisi bağlantı değil: prototipte şef profili ekranı yok (ana sayfa V3 ile aynı karar).
  const author = r => `<div class="dg-author">${avatar(r.author, r.authorPhoto)}<span class="dg-author__name" title="${esc(r.author)}"><span class="dg-sr">Tarifi ekleyen: </span>${esc(r.author)}</span></div>`;
  // docs/47 EK · Görsel üstü bilgi yalnız süre (saat) + görüntülenme (göz); yıldız ve puan kartlarda yok (detayda durur).
  const meta = r => { const v = views(r); return `<span class="dg-meta" role="img" aria-label="${r.minutes} dakika${v ? `, ${Number(r.views).toLocaleString('tr')} görüntülenme` : ''}"><span class="dg-meta__time">${fa('clock')}${r.minutes} dk</span>${v ? `<span class="dg-meta__views">${fa('eye')}${v}</span>` : ''}</span>`; };
  const text = r => `<a class="dg-card__text" href="${cfg.href(r)}"><span class="dg-card__category" title="${esc(r.category)}">${esc(r.category)}</span><h3 class="dg-card__title" title="${esc(r.title)}">${esc(shortTitle(r))}</h3></a>`;
  const visual = (r, cls) => `<a class="${cls}" href="${cfg.href(r)}" aria-label="${esc(shortTitle(r))}" tabindex="-1">${photo(r.image, 'dg-photo')}</a>`;
  const save = r => saveButton(r, 'dg-save');

  function card(r, variant = '') {
    return `<article class="dg-card${variant ? ' dg-card--' + variant : ''}"><div class="dg-card__media">${visual(r, 'dg-card__visual')}${meta(r)}${save(r)}</div><div class="dg-card__body">${text(r)}${author(r)}</div></article>`;
  }
  function feature(r) {
    return `<article class="dg-feature"><div class="dg-feature__media">${visual(r, 'dg-feature__visual')}<span class="dg-feature__veil" aria-hidden="true"></span>${meta(r)}${save(r)}<div class="dg-feature__info">${text(r)}${author(r)}</div></div></article>`;
  }
  // docs/46 · Fotoğraf üstü küçük kart: ana sayfa "En son eklenen tarifler", Dolapta Ne Var sonuçları ve detay
  // "Benzer Tarifler" aynı kartı kullanır. Süre/puan rozeti ve kaydet çifti, kalın kategori, en çok 2 satır başlık,
  // yazar avatarı + adı fotoğrafın alt kısmında; koyu geçiş metnin konumundan hesaplanır (veils).
  function tile(r) {
    return `<article class="dg-tile"><div class="dg-tile__media">${visual(r, 'dg-tile__visual')}<span class="dg-tile__veil" aria-hidden="true"></span>${meta(r)}${save(r)}<div class="dg-tile__info">${text(r)}${author(r)}</div></div></article>`;
  }
  // docs/46 · İkişerli slider: ekranda tam 2 kart, kenarda yarım kart yok, sayfa sayfa snap. Sayfa göstergesi yok
  // (Beyar, 10 Ekim); ←/→ bir sayfa kaydırır.
  function pairs(rs, label) {
    return `<section class="dg-pairs" aria-roledescription="carousel" aria-label="${esc(label)}"><div class="dg-pairs__track" tabindex="0" aria-label="${esc(label)}, ikişer ikişer kaydır">${rs.map((r, i) => `<div class="dg-pairs__item" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${rs.length}">${tile(r)}</div>`).join('')}</div></section>`;
  }
  // Yatayda ekran dışındaki kartların fotoğrafları hemen yüklenir (kaydırınca boş kart görünmez).
  function eager(scope) {
    for (const el of scope.querySelectorAll('[data-photo-src]')) {
      // Sayfanın tembel yükleyicisi (hydratePhotos) daha önce bağlamış olsa da yatay kırpılan kart hiç kesişmez: burada yüklenir.
      if (el.dataset.dgEager || el.style.backgroundImage) continue;
      el.dataset.dgEager = el.dataset.lazyBound = '1';
      const im = new Image();
      im.onload = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; };
      im.onerror = () => { el.classList.add('image-failed'); };
      im.src = el.dataset.photoSrc;
    }
  }
  function wirePairs(scope = document) {
    for (const box of scope.querySelectorAll('.dg-pairs')) {
      if (box.dataset.wired) continue;
      box.dataset.wired = '1';
      const track = box.querySelector('.dg-pairs__track');
      const step = () => track.clientWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
      const pages = () => Math.ceil(track.children.length / 2);
      const pos = () => Math.round(track.scrollLeft / Math.max(1, step()));
      track.addEventListener('scroll', () => { box.dataset.index = Math.min(pos(), pages() - 1); }, {passive: true});
      track.addEventListener('keydown', e => {
        if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        e.preventDefault();
        const i = Math.max(0, Math.min(pages() - 1, pos() + (e.key === 'ArrowRight' ? 1 : -1)));
        track.scrollTo({left: i * step(), behavior: motion?.matches ? 'auto' : 'smooth'});
      });
      box.dataset.index = 0;
      eager(box);
    }
    veils(scope);
  }
  /* docs/47 EK · Alt geçiş (görsel üstü metni olan kartlar): tek yerde, bütün kartlar buradan alır. Kaynak koyu (--overlay),
     metin bloğunun üst kenarından --dg-veil-ramp (24px) yukarıda 0'dan başlar, smoothstep ile metin üstünde
     --dg-veil-text-a'ya çıkar, en altta --dg-veil-end-a (en çok %70). Üstündeki görsel temiz kalır. Her çizimden sonra ölçülür.
     Çiftler: küçük kart, öne çıkan kart ve metin işaretli serbest kapak (.dg-veil-bottom + [data-dg-veil-from], ör. video). */
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  const VEIL = [['.dg-tile__media', '.dg-tile__info'], ['.dg-feature__media', '.dg-feature__info'], ['.dg-veil-bottom', '[data-dg-veil-from]']];
  function veilCurve(h, textTop) {
    const cs = getComputedStyle(root), n = name => parseFloat(cs.getPropertyValue(name));
    const A = n('--dg-veil-text-a'), E = n('--dg-veil-end-a'), ramp = n('--dg-veil-ramp') || 24;
    const start = Math.max(0, textTop - ramp), mix = a => `color-mix(in srgb,var(--overlay) ${(a * 100).toFixed(1)}%,transparent)`;
    const stops = Array.from({length: 9}, (_, i) => `${mix(ease(i / 8) * A)} ${(start + (textTop - start) * i / 8).toFixed(1)}px`);
    return `linear-gradient(180deg,transparent 0,${stops.join(',')},${mix(E)} ${Math.max(h, textTop + 1).toFixed(1)}px)`;
  }
  // İlk metin satırının üstü (kapsayıcının iç boşluğu ya da 44px dokunma alanı değil): metin aralığının en üst satır kutusu.
  function textTop(el) {
    const range = document.createRange(); range.selectNodeContents(el);
    const tops = [...range.getClientRects()].filter(r => r.width && r.height).map(r => r.top);
    return tops.length ? Math.min(...tops) : el.getBoundingClientRect().top;
  }
  function veils(scope = document) {
    for (const [mSel, tSel] of VEIL) for (const box of scope.querySelectorAll(mSel)) {
      const text = box.querySelector(tSel), b = box.getBoundingClientRect();
      if (!text || !b.height) continue;
      box.style.setProperty('--dg-veil', veilCurve(b.height, textTop(text) - b.top));
    }
  }
  // Tipografi rolü: paylaşılan applyTypeRoles bütün h3'lere "subheading" verir; küçük kartın başlığı kart rolündedir
  // (listedeki dg-card başlığıyla aynı 16/500). Sayfa betikleri bu sarmalayıcının üstüne kendi rollerini ekler.
  if (typeof applyTypeRoles === 'function') {
    const baseRoles = applyTypeRoles;
    applyTypeRoles = function (scope = document) {
      baseRoles(scope);
      for (const h of document.querySelectorAll('.dg-tile .dg-card__title')) if (h.dataset.typeRole !== 'card') h.dataset.typeRole = 'card';
    };
  }
  addEventListener('resize', () => veils());
  document.fonts?.ready.then(() => veils());

  // R2: öne çıkan slider. Tek tarifte slider ve gösterge yok; gösterge kartın içinde, sağ altta: noktalar, etkin nokta uzun
  // ve primary (docs/47: tek gösterge; "2 / 5" sayacı seçilmedi, kaldırıldı).
  function slider(rs) {
    if (rs.length === 1) return feature(rs[0]);
    const pager = `<span class="dg-pager-dots">${rs.map((_, i) => `<i${i ? '' : ' class="is-on"'}></i>`).join('')}</span>`;
    return `<section class="dg-slider" data-count="${rs.length}" aria-roledescription="carousel" aria-label="Öne çıkan tarifler"><div class="dg-slider__track" tabindex="0" aria-label="Öne çıkan tarifler, yatay kaydır">${rs.map((r, i) => `<div class="dg-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${rs.length}">${feature(r)}</div>`).join('')}</div><div class="dg-slider__pager" aria-hidden="true">${pager}</div></section>`;
  }
  // Göstergeyi kaydırmaya bağlar; yazar satırı göstergenin altına girmesin diye bilgi alanına pay bırakır.
  function wireSliders(scope = document) {
    for (const s of scope.querySelectorAll('.dg-slider')) {
      if (s.dataset.wired) continue;
      s.dataset.wired = '1';
      const track = s.querySelector('.dg-slider__track'), pager = s.querySelector('.dg-slider__pager');
      const room = () => s.style.setProperty('--dg-pager-room', `calc(${pager.getBoundingClientRect().width}px + var(--space-12))`);
      let current = -1;
      const update = () => {
        const step = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 1;
        const i = Math.max(0, Math.min(track.children.length - 1, Math.round(track.scrollLeft / step)));
        if (i === current) return;
        current = i;
        pager.querySelectorAll('.dg-pager-dots i').forEach((dot, n) => dot.classList.toggle('is-on', n === i));
        s.dataset.index = i;
      };
      track.addEventListener('scroll', () => requestAnimationFrame(update), {passive: true});
      // Klavye: odaktaki şeritte ok tuşları bir slayt kaydırır.
      track.addEventListener('keydown', e => {
        if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        e.preventDefault();
        const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
        track.scrollBy({left: e.key === 'ArrowRight' ? step : -step, behavior: motion?.matches ? 'auto' : 'smooth'});
      });
      room(); update();
    }
    veils(scope);
  }

  /* docs/46 · Üye önizlemesi ekranlar arasında korunur: ana sayfa, liste ve detay birbirine giderken (kart → detay, Tümü →
     liste, geri, menü) ?giris hedef adreste yoksa eklenir. Tıklama anında yazılır; sayfaların kendi bağlantı kurgusu
     değişmez. docs/47: tasarım seçenekleri (gösterge, radius, rozet, sıralama, yazar) kalktı, taşınmaz. */
  const CARRY = ['giris'];
  const SCREENS = /^(ana-v3|liste-v2|detay-v2)\.html$/;
  function carried() {
    const out = new URLSearchParams();
    for (const p of sources) for (const k of CARRY) if (p.get(k)) out.set(k, p.get(k));
    return out;
  }
  function carry(href) {
    if (!href || /^(?:[a-z]+:|\/\/|#)/i.test(href)) return href;
    const u = new URL(href, location.href), here = new URL(location.href);
    if (u.origin !== here.origin || u.pathname.replace(/[^/]*$/, '') !== here.pathname.replace(/[^/]*$/, '')) return href;
    if (!SCREENS.test(u.pathname.split('/').pop())) return href;
    let changed = false;
    for (const [k, v] of carried()) if (!u.searchParams.has(k)) { u.searchParams.set(k, v); changed = true; }
    return changed ? u.pathname.split('/').pop() + u.search + u.hash : href;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const next = carry(a.getAttribute('href'));
    if (next !== a.getAttribute('href')) a.setAttribute('href', next);
  }, true);

  window.DGCard = {
    configure(next = {}) { Object.assign(cfg, next); return window.DGCard; },
    avatar, meta, card, feature, slider, wireSliders, tile, pairs, wirePairs, veils, veilCurve, textTop, carry, views
  };
})();
