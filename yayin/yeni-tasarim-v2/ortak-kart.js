/* Ortak tarif kartı ailesi (docs/41 · R2/R3/R4/R7; docs/46 birleştirme). Üç ekran bağlı: ana sayfa, liste, detay.
   Bağımlılık: ld-source.js / home-base.js genelleri (esc, photo, saveButton, shortTitle, link, motion).
   Seçenekler adres parametresiyle seçilir ve <html> üzerine yazılır:
   ?radius=a|b · ?rozet=a|b · ?gosterge=a|b (her birinde varsayılan a).
   docs/46: fotoğraf üstü küçük kart (tile) + ikişerli slider (pairs) tek bileşen; ekranlar arası gezinmede seçenek
   parametreleri korunur (carry). */
(() => {
  // Seçenekler ilk gezinme adresinden de okunur: ortak ld-source.js ilk çizimde adresi yeniden yazar.
  const firstUrl = (() => { try { return new URL(performance.getEntriesByType('navigation')[0]?.name || location.href); } catch { return new URL(location.href); } })();
  const sources = [firstUrl.searchParams, new URLSearchParams(location.search)], root = document.documentElement;
  const pick = key => (sources.some(p => p.get(key) === 'b') ? 'b' : 'a');
  root.dataset.dgRadius = pick('radius');
  root.dataset.dgRozet = pick('rozet');
  root.dataset.dgGosterge = pick('gosterge');

  const cfg = {href: r => link(r)};
  const fa = name => `<i class="icon fa-solid fa-${name}" aria-hidden="true"></i>`;
  const score = r => Number(r.rating).toFixed(1).replace('.', ',');

  // R7: fotoğraf varsa kapak; yoksa baş harf (TR büyük harf), detaydaki dairenin aynısı.
  function avatar(name, photoUrl = '') {
    const initial = esc(String(name || '').trim().slice(0, 1).toLocaleUpperCase('tr'));
    return photoUrl
      ? `<span class="dg-avatar has-photo" style="background-image:url('${esc(photoUrl)}')" aria-hidden="true">${initial}</span>`
      : `<span class="dg-avatar" aria-hidden="true">${initial}</span>`;
  }
  // Yazar bilgisi bağlantı değil: prototipte şef profili ekranı yok (ana sayfa V3 ile aynı karar).
  const author = r => `<div class="dg-author">${avatar(r.author, r.authorPhoto)}<span class="dg-author__name" title="${esc(r.author)}"><span class="dg-sr">Tarifi ekleyen: </span>${esc(r.author)}</span></div>`;
  // R4: süre (ikonsuz, "dk" birimiyle) + puan (yıldız). Puan yoksa yalnız süre.
  const meta = r => `<span class="dg-meta" role="img" aria-label="${r.minutes} dakika${r.rating ? `, puan ${score(r)}` : ''}"><span class="dg-meta__time">${r.minutes} dk</span>${r.rating ? `<span class="dg-meta__rating">${fa('star')}${score(r)}</span>` : ''}</span>`;
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
  // Metin fotoğraf üstünde: kaynak koyu (--overlay) ilk metnin 24px üstünde %80'e 48px'lik smoothstep ile çıkar,
  // metin boyunca %90'a iner (kanon "Fotoğraf üstü okunurluk"; ana sayfa cardVeils eğrisi). Her çizimden sonra ölçülür.
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function veils(scope = document) {
    const px = name => parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
    for (const box of scope.querySelectorAll('.dg-tile__media')) {
      const info = box.querySelector('.dg-tile__info'), b = box.getBoundingClientRect();
      if (!info || !b.height) continue;
      const end = Math.max(0, info.getBoundingClientRect().top - b.top - px('--space-24')), start = Math.max(0, end - px('--space-48'));
      const stops = Array.from({length: 9}, (_, i) => `color-mix(in srgb,var(--overlay) ${(ease(i / 8) * 80).toFixed(1)}%,transparent) ${(start + (end - start) * i / 8).toFixed(1)}px`);
      box.style.setProperty('--dg-veil', `linear-gradient(180deg,transparent 0,${stops.join(',')},color-mix(in srgb,var(--overlay) 90%,transparent) 100%)`);
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

  // R2: öne çıkan slider. Tek tarifte slider ve gösterge yok; gösterge kartın içinde, sağ altta.
  function slider(rs) {
    if (rs.length === 1) return feature(rs[0]);
    const pager = root.dataset.dgGosterge === 'b'
      ? `<span class="dg-pager-count"><span data-dg-current>1</span> / ${rs.length}</span>`
      : `<span class="dg-pager-dots">${rs.map((_, i) => `<i${i ? '' : ' class="is-on"'}></i>`).join('')}</span>`;
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
        const c = pager.querySelector('[data-dg-current]'); if (c) c.textContent = i + 1;
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
  }

  /* docs/46 · Seçenekler ekranlar arasında korunur: ana sayfa, liste ve detay birbirine giderken (kart → detay, Tümü →
     liste, geri, menü) o görünümün seçenek parametreleri (gösterge, radius, rozet, sıralama, yazar, üye önizlemesi)
     hedef adreste yoksa eklenir. Tıklama anında yazılır; sayfaların kendi bağlantı kurgusu değişmez. */
  const CARRY = ['gosterge', 'radius', 'rozet', 'siralama', 'yazar', 'giris'];
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
    avatar, meta, card, feature, slider, wireSliders, tile, pairs, wirePairs, veils, carry,
    options: () => ({radius: root.dataset.dgRadius, rozet: root.dataset.dgRozet, gosterge: root.dataset.dgGosterge})
  };
})();
