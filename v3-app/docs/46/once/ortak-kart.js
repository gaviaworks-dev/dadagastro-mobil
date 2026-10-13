/* Ortak tarif kartı ailesi (docs/41 · R2/R3/R4/R7). Şimdilik yalnız liste-v2 bağlı.
   Bağımlılık: ld-source.js genelleri (esc, photo, saveButton, shortTitle, link, motion).
   Seçenekler adres parametresiyle seçilir ve <html> üzerine yazılır:
   ?radius=a|b · ?rozet=a|b · ?gosterge=a|b (her birinde varsayılan a). */
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

  window.DGCard = {
    configure(next = {}) { Object.assign(cfg, next); return window.DGCard; },
    avatar, meta, card, feature, slider, wireSliders,
    options: () => ({radius: root.dataset.dgRadius, rozet: root.dataset.dgRozet, gosterge: root.dataset.dgGosterge})
  };
})();
