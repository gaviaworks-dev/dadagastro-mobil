/* Ortak yan menü — sağdan açılan çekmece (docs/40 · Menü).
   Kurulduğu sayfa: ana-v3.html. Liste ve detay sonra aynı iki dosyayı (ortak-menu.css/js) bağlayacak.
   Yapı canlı dadagastro.com mobil çekmecesinden: Tarifler · Ne Pişirsem? · Dolapta Ne Var? · Püf Noktaları ·
   Mutfak Sırları (+ üye hesap bloğu, dil); prototipin onaylı eklemeleri: Ana Sayfa, Tabaktan Tarif (Pro), Görüş Bildir.
   Gösterim kontrolü: adres ?giris=1 → giriş yapmış örnek üye görünümü (önizleme; gerçek oturum yok).
   Sayfa entegrasyonu: OrtakMenu.configure({active, links, actions}). actions[id]() true dönerse sayfa işi üstlenir;
   yoksa bağlantıya gidilir, bağlantı yoksa "Yakında" bildirilir. */
(() => {
  // Brand glyphs skip the shared .icon class: it pins the Solid family.
  const fa = (n, set = 'solid') => `<i class="${set === 'brands' ? 'om-brand' : 'icon'} fa-${set} fa-${n}" aria-hidden="true"></i>`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const page = location.pathname.split('/').pop() || 'index.html';
  const cfg = {active: 'home', links: {}, actions: {}};
  // Read the display control from the original navigation URL too: some screens rewrite their query on load.
  const firstUrl = (() => { try { return new URL(performance.getEntriesByType('navigation')[0]?.name || location.href); } catch { return new URL(location.href); } })();
  const member = [firstUrl.searchParams, new URLSearchParams(location.search)].some(p => p.get('giris') === '1');
  const LANGS = [['tr', 'Türkçe'], ['en', 'English'], ['es', 'Español'], ['ru', 'Русский'], ['de', 'Deutsch']];
  let lang = 'tr';
  try { lang = localStorage.getItem('dadagastro-dil') || 'tr'; } catch { /* per-viewer convenience only */ }
  const note = msg => (typeof window.toast === 'function' ? window.toast(msg) : console.info(msg));

  // id, label, icon, link key, children | action. Live labels and order; links resolve through cfg.links.
  const ITEMS = [
    {id: 'home', label: 'Ana Sayfa', icon: 'house', link: 'home'},
    {id: 'recipes', label: 'Tarifler', icon: 'book-open', children: [
      {id: 'all', label: 'Tüm Tarifler', icon: 'book-open', link: 'recipes'},
      {id: 'categories', label: 'Kategoriler', icon: 'layer-group', link: 'categories'},
      {id: 'cuisines', label: 'Dünya Mutfakları', icon: 'earth-europe', link: 'cuisines'}]},
    {id: 'ask', label: 'Ne Pişirsem?', icon: 'utensils', link: 'ask'},
    {id: 'pantry', label: 'Dolapta Ne Var?', icon: 'basket-shopping', link: 'pantry'},
    {id: 'tips', label: 'Püf Noktaları', icon: 'lightbulb', link: 'tips'},
    {id: 'plate', label: 'Tabaktan Tarif', icon: 'camera', link: 'plate', badge: 'Pro'},
    {id: 'secrets', label: 'Mutfak Sırları', icon: 'mortar-pestle', children: [
      {id: 'intro', label: 'Mutfağa Giriş', icon: 'graduation-cap', link: 'intro'},
      {id: 'encyclopedia', label: 'Mutfak Ansiklopedisi', icon: 'seedling', link: 'encyclopedia'},
      {id: 'glossary', label: 'Sözlük', icon: 'book-open', link: 'glossary'},
      {id: 'units', label: 'Ölçü Birimleri', icon: 'scale-balanced', link: 'units'},
      {id: 'table', label: 'Sofra Düzeni', icon: 'utensils', link: 'table'}]},
    // Live member block (Modüllerim · Gelişimim · Hesabım), shown only in the member preview.
    {id: 'account', label: 'Hesabım', icon: 'user', member: true, children: [
      {id: 'notebook', label: 'Mutfak Defterim', icon: 'book'}, {id: 'menus', label: 'Menülerim', icon: 'list-check'},
      {id: 'community', label: 'Topluluğum', icon: 'users'}, {id: 'chef', label: 'Şef Panelim', icon: 'user-tie'},
      {id: 'badges', label: 'Rozetlerim', icon: 'medal'}, {id: 'packages', label: 'Paketlerim', icon: 'crown'},
      {id: 'payments', label: 'Ödemelerim', icon: 'receipt'}, {id: 'settings', label: 'Hesap Ayarları', icon: 'sliders'},
      {id: 'help', label: 'Çözüm Merkezi', icon: 'headset'}, {id: 'logout', label: 'Çıkış', icon: 'right-from-bracket'}]},
    {id: 'feedback', label: 'Görüş Bildir', icon: 'comment-dots', link: 'feedback'}
  ];

  const dialog = document.createElement('dialog');
  dialog.className = 'om';
  dialog.setAttribute('aria-label', 'Menü');

  const href = item => (item.link && cfg.links[item.link]) || '';
  const current = () => (typeof cfg.active === 'function' ? cfg.active() : cfg.active);
  const row = (item, sub = false) => {
    const active = item.id === current();
    return `<a class="om-row${sub ? ' om-subrow' : ''}${active ? ' is-active' : ''}" href="${esc(href(item))}" data-om-id="${item.id}"${active ? ' aria-current="page"' : ''}><span class="om-ic">${fa(item.icon)}</span><span class="om-label">${esc(item.label)}</span>${item.badge ? `<span class="om-badge">${fa('crown')}${esc(item.badge)}</span>` : ''}</a>`;
  };
  const group = item => {
    const open = item.children.some(c => c.id === current());
    return `<div class="om-item om-group${open ? ' is-open' : ''}"><button class="om-row om-toggle" type="button" aria-expanded="${open}" aria-controls="om-sub-${item.id}"><span class="om-ic">${fa(item.icon)}</span><span class="om-label">${esc(item.label)}</span><span class="om-chev">${fa('chevron-down')}</span></button><div class="om-sub" id="om-sub-${item.id}"${open ? '' : ' inert'}><div class="om-sub-in">${item.children.map(c => row(c, true)).join('')}</div></div></div>`;
  };
  const user = () => member
    ? `<a class="om-profile" href="" data-om-id="profile"><span class="om-avatar" aria-hidden="true">Ö</span><span class="om-who"><b>Örnek Üye</b><small>${fa('leaf')} Mutfak Meraklısı</small></span><span class="om-go">Profilim ${fa('chevron-right')}</span></a>
       <div class="om-shortcuts">${[['saved', 'bookmark', 'Kaydettiklerim'], ['mine', 'book-open', 'Tariflerim'], ['notifications', 'bell', 'Bildirimler']].map(([id, ic, t]) => `<a class="om-short" href="" data-om-id="${id}">${fa(ic)}<span>${t}</span></a>`).join('')}</div>
       <p class="om-preview">${fa('circle-info')}<span>Önizleme: örnek üye görünümü, gerçek oturum yok.</span></p>`
    : `<p class="om-hello"><b>Merhaba</b><span>Tariflerini kaydetmek ve paylaşmak için giriş yap.</span></p>
       <div class="om-auth"><button class="button" type="button" data-drawer-auth>Giriş Yap</button><button class="button secondary" type="button" data-drawer-auth>Üye Ol</button></div>`;
  const langName = () => (LANGS.find(([k]) => k === lang) || LANGS[0])[1];

  function render() {
    dialog.innerHTML = `<div class="om-panel">
      <header class="om-head"><a class="om-logo" href="${esc(cfg.links.home || page)}" aria-label="DadaGastro ana sayfa"><img src="assets/marka/dadagastro-renkli.svg?v=c0693b997d27" alt="DadaGastro"></a><button class="om-close" type="button" aria-label="Menüyü kapat">${fa('xmark')}</button></header>
      <div class="om-scroll">
        <section class="om-user" aria-label="Hesap">${user()}</section>
        <nav class="om-nav" aria-label="Ana menü">${ITEMS.filter(i => !i.member || member).map(i => i.children ? group(i) : `<div class="om-item">${row(i)}</div>`).join('')}</nav>
      <footer class="om-foot">
        <div class="om-item om-group om-lang"><button class="om-row om-toggle" type="button" aria-expanded="false" aria-controls="om-sub-lang"><span class="om-ic">${fa('globe')}</span><span class="om-label">Dil: <b>${esc(langName())}</b></span><span class="om-chev">${fa('chevron-down')}</span></button><div class="om-sub" id="om-sub-lang" inert><div class="om-sub-in" role="radiogroup" aria-label="Dil">${LANGS.map(([k, t]) => `<button class="om-row om-subrow om-lang-opt" type="button" role="radio" aria-checked="${k === lang}" data-om-lang="${k}"><span class="om-ic">${k === lang ? fa('check') : ''}</span><span class="om-label">${esc(t)}</span></button>`).join('')}</div></div></div>
        <div class="om-meta"><div class="om-social">${[['instagram', 'https://www.instagram.com/dada.gastro/', 'Instagram'], ['facebook', 'https://www.facebook.com/dadagastrocom', 'Facebook'], ['x-twitter', 'https://x.com/dadagastrocom', 'X']].map(([ic, u, n]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="DadaGastro ${n}">${fa(ic, 'brands')}</a>`).join('')}</div><div class="om-legal"><a href="" data-om-id="about">Hakkımızda</a><a href="" data-om-id="privacy">Gizlilik Politikası</a></div></div>
      </footer>
      </div>
    </div>`;
  }

  function setOpen(groupEl, open) {
    groupEl.classList.toggle('is-open', open);
    q(groupEl, '.om-toggle').setAttribute('aria-expanded', open);
    q(groupEl, '.om-sub').toggleAttribute('inert', !open);
  }
  const q = (root, s) => root.querySelector(s);

  dialog.addEventListener('click', e => {
    if (e.target === dialog || e.target.closest('.om-close')) return close();
    if (e.target.closest('[data-drawer-auth]')) { close(); return; } // the site's own login gate opens next
    const toggle = e.target.closest('.om-toggle');
    if (toggle) {
      const g = toggle.closest('.om-group'), open = !g.classList.contains('is-open');
      // One open group at a time inside the same list (nav and footer are separate lists).
      g.parentElement.querySelectorAll(':scope>.om-group.is-open').forEach(o => o !== g && setOpen(o, false));
      setOpen(g, open);
      if (open && g.classList.contains('om-lang')) setTimeout(() => g.scrollIntoView({block: 'end', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}), 210);
      return;
    }
    const opt = e.target.closest('[data-om-lang]');
    if (opt) {
      lang = opt.dataset.omLang;
      try { localStorage.setItem('dadagastro-dil', lang); } catch { /* session only */ }
      render();
      setOpen(q(dialog, '.om-lang'), true);
      note(`Önizleme: dil tercihi ${langName()} olarak kaydedildi. Çeviriler bu prototipte yok.`);
      return;
    }
    const link = e.target.closest('a[data-om-id]');
    if (!link) return;
    const id = link.dataset.omId;
    if (id === 'logout') { e.preventDefault(); const u = new URL(location.href); u.searchParams.delete('giris'); location.href = u.href; return; }
    const action = cfg.actions[id];
    if (action) { e.preventDefault(); close(); if (action() !== false) return; }
    if (!link.getAttribute('href')) { e.preventDefault(); close(); note('Yakında'); }
  });
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });

  function open() {
    if (dialog.open) return;
    render();
    if (!dialog.isConnected) document.body.append(dialog);
    dialog.showModal();
    document.documentElement.classList.add('om-locked');
    requestAnimationFrame(() => dialog.classList.add('is-in'));
  }
  function close() {
    if (!dialog.open) return;
    dialog.classList.remove('is-in');
    document.documentElement.classList.remove('om-locked');
    const done = () => { if (!dialog.classList.contains('is-in')) dialog.close(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done(); else setTimeout(done, 250);
  }

  window.OrtakMenu = {
    open, close, member,
    configure(next = {}) {
      Object.assign(cfg, next, {links: {...cfg.links, ...(next.links || {})}, actions: {...cfg.actions, ...(next.actions || {})}});
      return window.OrtakMenu;
    }
  };
  // The header's menu button calls the global openSiteDrawer(); this component takes it over.
  window.openSiteDrawer = open;
  addEventListener('DOMContentLoaded', () => { window.openSiteDrawer = open; });
})();
