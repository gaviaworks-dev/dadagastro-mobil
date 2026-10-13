/* Kök ekranları (ana-v3, liste-v2, detay-v2, tabaktan-tarif) uygulama sayfalarına bağlayan katman (docs/55 §6).
   Kök ekranların tasarımına dokunmaz; yalnız hedefleri ve oturum durumunu bağlar. <head> içinde, runtime'dan ÖNCE yüklenir
   (dg-tokens.js'ten sonra). Beyar kararı 8: alt menü 4. öğe Kaydettiklerim (sıra tokens.json → DGTOKENS.nav). */
(() => {
  const U = 'uygulama/';
  const qs = new URLSearchParams(location.search);
  const sayfa = location.pathname.split('/').pop();
  const burasi = () => sayfa + location.search.replace(/[?&]giris=1/, '').replace(/^&/, '?');
  // Galeri çerçevesinde (ya da ?kal=1) Tabaktan analiz ekranı kendiliğinden sonuca geçmez: uzun zamanlayıcılar ertelenir; animasyon sürer.
  if (sayfa === 'tabaktan-tarif.html' && qs.get('durum') === 'analiz' && (window.top !== window || qs.has('kal'))) { const st = window.setTimeout; window.setTimeout = (f, ms, ...a) => (ms >= 1200 ? 0 : st(f, ms, ...a)); }
  // ---------- Oturum: uygulama oturumu (dg-oturum) → kök runtime üye önizlemesi ----------
  let rol = 'misafir';
  try { rol = qs.get('oturum') || JSON.parse(localStorage.getItem('dg-oturum') || '{"rol":"misafir"}').rol; } catch { /* yok */ }
  try { if (rol !== 'misafir') sessionStorage.setItem('dadagastro-member-preview', '1'); else if (!qs.has('giris')) sessionStorage.removeItem('dadagastro-member-preview'); } catch { /* yok */ }
  if (rol !== 'misafir' && !qs.has('giris')) { const u = new URL(location.href); u.searchParams.set('giris', '1'); history.replaceState(history.state, '', u); }
  const uye = () => rol !== 'misafir' || qs.get('giris') === '1';
  const git = h => { location.href = h; };
  const girisUrl = (sayfaAdi = 'giris') => `${U}${sayfaAdi}.html?donus=${encodeURIComponent(burasi())}`;

  // ---------- Ortak eleman geçişi (docs/58): tarif kartı görseli → detay fotoğrafı; belgeler arası View Transitions ----------
  // Test tarayıcısı ve “hareketi azalt”ta kapalı (normal geçiş). Kök görünümü değişmez: yalnız geçiş anında ad verilir.
  const vtAcik = !navigator.webdriver && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'CSSViewTransitionRule' in window;
  if (vtAcik) { const st = document.createElement('style'); st.textContent = '@view-transition{navigation:auto}::view-transition-group(dg-tarif-foto){animation-duration:var(--dg-motion-page);animation-timing-function:var(--dg-motion-easing-emphasized-decel)}'; document.head.append(st); }
  if (vtAcik && sayfa === 'detay-v2.html') addEventListener('pagereveal', () => { const f = document.querySelector('.detail-hero .photo'); if (f) { f.style.viewTransitionName = 'dg-tarif-foto'; setTimeout(() => { f.style.viewTransitionName = ''; }, 1000); } });
  document.addEventListener('click', e => { if (!vtAcik) return; const a = e.target.closest('a[href*="detay-v2.html"], a[href*="tarif-detay.html"]'); if (!a) return; const f = a.querySelector('.photo') || a.closest('article, .dg-card, .dg-tile, .dg-feature')?.querySelector('.photo'); document.querySelectorAll('.photo').forEach(x => { if (x.style.viewTransitionName === 'dg-tarif-foto') x.style.viewTransitionName = ''; }); if (f) f.style.viewTransitionName = 'dg-tarif-foto'; }, true);

  // ---------- Bağlantıları yeniden yaz (ilk çizim + sonradan eklenen düğümler) ----------
  // Görünen metin (hecelemenin yumuşak tireleri ayıklanır — bağlantıya ve depoya karışmasın)
  const yazi = x => (x?.textContent || '').replace(/\u00AD/g, '').trim();
  // Ortak şef kartı + verisi (kökte yüklü değil): bir kez yüklenir.
  const ORTAK = (document.currentScript?.src || 'ortak/dg-baglanti.js').replace(/dg-baglanti\.js.*$/, '');
  let sefYuk = null;
  const betik = src => new Promise((ok, red) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = red; document.head.append(s); });
  const sefKartHazir = () => sefYuk || (sefYuk = (async () => {
    if (!document.querySelector('link[href*="dg-sef-karti.css"]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = ORTAK + 'dg-sef-karti.css?v=' + METIN_V; document.head.append(l); }
    if (!window.DGVERI) await betik(ORTAK + 'veri/veri.js?v=' + METIN_V);
    if (!window.DGORNEKSEF) await betik(ORTAK + 'veri/ornek-sef.js?v=' + METIN_V);
    if (!window.DGSefKarti) await betik(ORTAK + 'dg-sef-karti.js?v=' + METIN_V);
  })());
  const ICON = n => `<i class="icon fa-solid fa-${n}" aria-hidden="true"></i>`;
  function yaz(root = document) {
    // Alt menü (Beyar revize 13 Ekim): Ana Sayfa · Tarifler · (orta) Ne Pişirsem · Püf Noktaları · Profil — kök tasarımdaki öğeler aynen; yalnız hedefler.
    // Detay yorum bölümü: ortak yorum bileşeninin sınıfı (ortak/dg-yorum.css tek kaynak; aynı değerler)
    root.querySelectorAll?.('#yorumlar.dv2-reviews:not(.dgu-yrm)').forEach(x => x.classList.add('dgu-yrm'));
    root.querySelectorAll?.('.bottom-nav').forEach(nav => {
      const a = nav.querySelectorAll('a.nav-item'); if (a.length !== 5) return;
      if (a[3].getAttribute('href') === U + 'puf-noktalari.html' && a[4].getAttribute('href') === U + 'profil.html') return;
      a[0].setAttribute('href', 'ana-v3.html');
      a[1].setAttribute('href', 'liste-v2.html');
      a[3].setAttribute('href', U + 'puf-noktalari.html');
      a[4].setAttribute('href', U + 'profil.html'); a[4].removeAttribute('data-profile-menu');
    });
    // Tarif detayı header'ındaki “…” (Diğer tarif işlemleri) kaldırıldı (Beyar revize D3, 13 Ekim): içindekiler başka yerde var
    // (Kaydet header'da; Ben de Yaptım / Eline Sağlık / Yorumlar alt çubukta; Mutfak Defterim ve Menü yan menüde). Yalnız “Tarifi yazdır / PDF” başka yerde yoktu (raporlandı).
    root.querySelectorAll?.('.detail-header [data-recipe-more], .detail-header-actions [aria-label="Diğer tarif işlemleri"]').forEach(x => x.remove());
    // Arama → uygulama araması
    root.querySelectorAll?.('a[href^="arama.html"]').forEach(x => x.setAttribute('href', U + 'arama.html' + (x.getAttribute('href').includes('tur=sef') ? '' : '')));
    root.querySelectorAll?.('a[href*="arama.html?tur=sef"]').forEach(x => x.setAttribute('href', U + 'sefler.html'));
    // Tarif bul paneli (orta düğme) eylem kartları → uygulama sayfaları
    root.querySelectorAll?.('a.action-card').forEach(c => {
      const t = c.textContent;
      if (/Ne Pişirsem/.test(t)) { c.setAttribute('href', U + 'ne-pisirsem.html'); c.removeAttribute('data-six-ask'); }
      else if (/Dolapta Ne Var/.test(t)) { c.setAttribute('href', U + 'dolapta-ne-var.html'); c.removeAttribute('data-six-fridge'); }
    });
    // Boş href kalmasın (bağlantı denetimi, Beyar 12 Ekim): tıklama yakalayıcısının gittiği hedef href'e de yazılır; görünüm ve davranış aynı.
    const sefAd = x => yazi(x.querySelector('span:last-child')) || yazi(x);
    root.querySelectorAll?.('a[href=""], a:not([href])').forEach(x => {
      if (x.matches('[aria-label="Bildirimler"], [data-six-notifications]')) x.setAttribute('href', U + 'bildirimler.html');
      else if (x.matches('[data-v3-cat-all]')) x.setAttribute('href', U + 'kategoriler.html');
      else if (x.matches('[aria-label*="tüm videolar" i], [data-six-videos]')) x.setAttribute('href', U + 'videolar.html');
      else if (x.matches('.nav-item.center, [data-photo-entry]')) x.setAttribute('href', U + 'ne-pisirsem.html');
      else if (x.matches('.card-author-row') && sefAd(x)) x.setAttribute('href', U + 'sef.html?ad=' + encodeURIComponent(sefAd(x)));
      else if (x.matches('.dv2-chef-link, .dv2-chef-id')) { const ad = yazi(document.querySelector('.dv2-chef-name, .dv2-b-name')); if (ad) x.setAttribute('href', U + 'sef.html?ad=' + encodeURIComponent(ad)); }
    });
    // Tarif detayı şef kartı (Beyar EK 13 Ekim): kökün kendi kartı yerine TEK ORTAK şef kartı (ortak/dg-sef-karti.js) — avatar, ad, kademe,
    // “…'dan beri üye”, Tarif · Püf noktası · Takipçi, Takip et + Abone ol; uygulama sayfalarıyla aynı fonksiyon ve veri.
    const kokSef = [...(root.querySelectorAll?.('.dv2-chef:not(.dgu-skart)') || [])];
    if (kokSef.length) sefKartHazir().then(() => kokSef.forEach(k => { if (!k.isConnected) return; const ad = yazi(k.querySelector('.dv2-chef-name')); if (!ad) return; const s = window.DGSefKarti.sef(ad) || {ad}; const t = document.createElement('template'); t.innerHTML = window.DGSefKarti.kart(s, {kademe: yazi(k.querySelector('.dv2-chef-badge span')) || undefined, bio: yazi(k.querySelector('.dv2-chef-bio')) || undefined, href: U + 'sef.html?ad=' + encodeURIComponent(ad), etiket: 'Tarifin yazarı'}); k.replaceWith(t.content); })).catch(() => {});
    // Ana sayfa “Şefler & Yazarlar · Tümü” → Şefler sayfası (sayfa karşılığı)
    root.querySelectorAll?.('.v3-chefs .six-heading a, .v3-chefs .section-heading-row a').forEach(x => { x.setAttribute('href', U + 'sefler.html'); x.setAttribute('aria-label', 'Şefler — tümü'); });
    takipCiz();
    // Giriş kapısı (runtime sheet'i): boş href'li Giriş Yap / Üye Ol → uygulama giriş/kayıt
    root.querySelectorAll?.('dialog a.button').forEach(x => { if (x.getAttribute('href')) return; if (/Giriş Yap/.test(x.textContent)) x.setAttribute('href', girisUrl('giris')); else if (/Üye Ol/.test(x.textContent)) x.setAttribute('href', girisUrl('kayit')); });
  }
  // Kök sayfa betikleri alt menü öğesini sonradan yeniden yazabilir (ana-v3.js, liste-v2.js navItems[3]); menü içindeki her değişiklikte menü yeniden bağlanır.
  let bekle = false;
  new MutationObserver(ms => { for (const m of ms) { if (m.target.closest?.('.bottom-nav')) { if (!bekle) { bekle = true; queueMicrotask(() => { bekle = false; yaz(document); }); } continue; } for (const n of m.addedNodes) if (n.nodeType === 1) yaz(n.parentElement || n); } }).observe(document.documentElement, {childList: true, subtree: true});

  // Ana sayfa şef şeridi: takip düğmesi ortak takip listesini gösterir (sayfadaki “Takiptesin” ile aynı durum).
  const takipYaz = (b, on) => { b.setAttribute('aria-pressed', String(on)); b.innerHTML = `${ICON(on ? 'check' : 'plus')} ${on ? 'Takiptesin' : 'Takip Et'}`; };
  const takipCiz = () => { if (sayfa !== 'ana-v3.html') return; let L = []; try { L = JSON.parse(localStorage.getItem('dg-takip') || '[]'); } catch { /* yok */ } document.querySelectorAll('[data-a-chef-follow]').forEach(b => { const ad = yazi(b.closest('.v3-chef-card')?.querySelector('b')), k = window.DGVERI?.sefler?.find(x => x.ad === ad)?.kullanici || ad; if (L.includes(k) !== (b.getAttribute('aria-pressed') === 'true')) takipYaz(b, L.includes(k)); }); };
  // ---------- Tıklama yakalayıcıları (runtime işleyicilerinden önce) ----------
  document.addEventListener('click', e => {
    const t = e.target;
    const stop = h => { e.preventDefault(); e.stopImmediatePropagation(); git(h); };
    if (t.closest('[data-six-notifications], header [aria-label="Bildirimler"]')) return stop(U + 'bildirimler.html');
    if (t.closest('[data-drawer-auth]')) return stop(girisUrl(/Üye/.test(t.closest('[data-drawer-auth]').textContent) ? 'kayit' : 'giris'));
    // Ana sayfa “Kategoriler & Dünya Mutfakları · Tümü” → uygulama dizini (açık sekmeye göre); görünüm değişmez, yalnız hedef.
    if (t.closest('[data-v3-cat-all]')) { const mutfak = document.querySelector('#v3-cuisine-tab[aria-selected="true"]'); return stop(U + 'kategoriler.html' + (mutfak ? '?sekme=mutfak' : '')); }
    const tumVideo = t.closest('a[aria-label*="tüm videolar" i], [data-six-videos]'); if (tumVideo) return stop(U + 'videolar.html');
    // Ana sayfa blokları → sayfa karşılıkları (Beyar revize eki 13 Ekim: “her blok sayfa karşılığıyla aynı yere bağlansın”).
    // Görünüm kök tasarımda kalır; eylemler önizleme sheet'i yerine uygulama sayfasına ve ortak yerel duruma gider.
    if (sayfa === 'ana-v3.html') {
      const vd = t.closest('[data-six-video]'); if (vd) return stop(U + 'video.html?no=' + Number(vd.dataset.sixVideo));
      const sk = t.closest('[data-a-chef]'); if (sk) { const ad = yazi(sk.querySelector('b')); if (ad) return stop(U + 'sef.html?ad=' + encodeURIComponent(ad)); }
      if (t.closest('[data-a-chef-join], .v3-chef-cta, [data-six-share]')) return stop(U + 'tarif-ekle.html');
      const tk = t.closest('[data-a-chef-follow]');
      if (tk) {
        e.preventDefault(); e.stopImmediatePropagation();
        const ad = yazi(tk.closest('.v3-chef-card')?.querySelector('b')), s = window.DGVERI?.sefler?.find(x => x.ad === ad), k = s?.kullanici || ad;
        if (!uye()) return git(`${U}giris.html?eylem=takip&donus=${encodeURIComponent(burasi())}`);
        // Takip listesi uygulama sayfalarıyla ortak (dg-takip — DG.store 'takip').
        let L = []; try { L = JSON.parse(localStorage.getItem('dg-takip') || '[]'); } catch { /* yok */ }
        const on = !L.includes(k); L = on ? [...L, k] : L.filter(x => x !== k); try { localStorage.setItem('dg-takip', JSON.stringify(L)); } catch { /* yok */ }
        takipYaz(tk, on); (window.toast || (() => {}))(on ? 'Takip etmeye başladın.' : 'Takibi bıraktın.');
        return;
      }
    }
    // Tarif kartı yazar satırı (kök runtime “Yakında” yerine) → şef profili
    const yz = t.closest('a.card-author-row[href*="sef.html"]'); if (yz) return stop(yz.getAttribute('href'));
    // Detay: şef kartı → şef profili
    const sef = t.closest('.dv2-chef-link, .dv2-b-top, .dv2-chef-id');
    if (sef && !t.closest('button')) { const ad = yazi(document.querySelector('.dv2-chef-name, .dv2-b-name')); if (ad) return stop(U + 'sef.html?ad=' + encodeURIComponent(ad)); }
    // Detay: geri → uygulama sayfasından gelindiyse oraya
    const d = qs.get('donus');
    if (d && d.startsWith(U) && t.closest('a[aria-label="Geri dön"], .detail-header a.icon-button:first-child')) return stop(d);
    // Tabaktan Tarif: Pro değilse “Pro’ya geç” → paywall (Pro ve Üyeliğim); runtime “Yakında” yerine gerçek hedef.
    if (t.closest('[data-plate="pro-gec"]')) return stop(U + 'pro.html?donus=' + encodeURIComponent(burasi()));
    // Tabaktan Tarif: “Bu malzemelerle Dolapta Ne Var’da ara” → uygulama Dolapta Ne Var (runtime eski tarifler.html?malzeme= hedefi yerine)
    const dolap = t.closest('[data-plate="dolap"]');
    if (dolap) { const sec = [...document.querySelectorAll('[data-plate-ingredient][aria-pressed="true"]')].map(b => b.dataset.plateIngredient); if (!sec.length) return; return stop(U + 'dolapta-ne-var.html?malzeme=' + encodeURIComponent(sec.join(','))); }
    // Detay: alışveriş listesine ekle (malzeme başına ve tümü) → uygulama alışveriş listesi (yerel önizleme)
    const tum = t.closest('.shopping-all'), tek = t.closest('.ingredient-actions .icon-button:not(.dv2-swap), [data-cart]');
    if (tum || tek) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (!uye()) { if (typeof window.sheet === 'function') window.sheet('Alışveriş listesine eklemek için giriş yap', `<p class="prose">Kaydetmek, yorum yapmak ve takip etmek için DadaGastro hesabına giriş yapman gerekiyor.</p><div class="sheet-actions login-options"><a href="${girisUrl('giris')}" class="button">Giriş Yap</a><a href="${girisUrl('kayit')}" class="button secondary">Üye Ol</a></div>`); else git(girisUrl('giris')); return; }
      const slug = qs.get('tarif') || '';
      let liste = []; try { liste = JSON.parse(localStorage.getItem('dg-alisveris') || '[]'); } catch { /* yok */ }
      const ekle = li => { const ad = (li.querySelector('.ingredient-name')?.childNodes[0]?.textContent || li.querySelector('.ingredient-name')?.textContent || '').replace(/\u00AD/g, '').trim(); const miktar = yazi(li.querySelector('.amount')); if (ad && !liste.some(x => x.ad === ad && x.tarif === slug)) liste.push({id: Math.random().toString(36).slice(2, 9), ad, miktar, tarif: slug, isaretli: false}); };
      if (tum) document.querySelectorAll('.ingredient-name').forEach(n => ekle(n.closest('li') || n.parentElement));
      else ekle(tek.closest('li'));
      try { localStorage.setItem('dg-alisveris', JSON.stringify(liste)); } catch { /* yok */ }
      (window.toast || alert)(tum ? 'Malzemeler alışveriş listene eklendi' : 'Alışveriş listene eklendi');
      return;
    }
  }, true);

  // ---------- Ortak menü hedefleri (sayfanın kendi ayarından sonra) ----------
  // Ekranda iç not yok (docs/55 §2c): kök runtime bildirimlerindeki prototip ibareleri ayıklanır.
  const TEMIZ = {'İncelemede durumu önizleniyor; sunucuya gönderilmedi': 'Onaya gönderildi; tarifin incelemede.', 'Önizleme: işlem bu oturumda gösterildi.': 'İşlem tamamlandı.', 'Önizleme: sunucuya gönderilmedi.': 'Gönderildi.', 'Önizleme: takip durumu bu oturumda değişti.': 'Takip durumun güncellendi.', 'Önizleme: yorum bu oturumda düzenlendi.': 'Yorumun güncellendi.', 'Önizleme: yorum kaldırıldı.': 'Yorum kaldırıldı.', 'Önizlemede alışveriş listesine eklendi': 'Alışveriş listene eklendi', 'Cihaz ayarları prototipte açılmaz; Galeriden seç ile devam edebilirsin.': 'Cihaz ayarları yakında; Galeriden seç ile devam edebilirsin.', 'Mutfak Defterim ekranı yakında; taslağın bu cihazda özel tutuluyor.': 'Taslağın sana özel olarak kaydedildi.'};
  const temizle = m => TEMIZ[m] || String(m).replace(/^Önizleme(de)?:?\s*/i, '').replace(/\s*·?\s*Simülasyon/i, '').replace(/;?\s*sunucuya gönderilmedi\.?/i, '').replace(/\s*bu (oturumda|cihazda)/i, '');
  addEventListener('load', () => { yaz(); setTimeout(yaz, 300); if (typeof window.toast === 'function' && !window.toast.dgTemiz) { const o = window.toast; window.toast = (m, ...r) => o(temizle(m), ...r); window.toast.dgTemiz = true; } });
  addEventListener('DOMContentLoaded', () => {
    yaz(); setTimeout(yaz, 0);
    if (!window.OrtakMenu) return;
    const go = h => () => git(h);
    OrtakMenu.configure({links: {home: 'ana-v3.html', recipes: 'liste-v2.html', categories: U + 'kategoriler.html', cuisines: U + 'kategoriler.html?sekme=mutfak', videos: U + 'videolar.html', ask: U + 'ne-pisirsem.html', pantry: U + 'dolapta-ne-var.html', tips: U + 'puf-noktalari.html', plate: 'tabaktan-tarif.html?donus=' + encodeURIComponent(burasi()), feedback: U + 'gorus-bildir.html'},
      actions: {ask: undefined, pantry: undefined, tips: undefined, categories: undefined, cuisines: undefined, videos: undefined, profile: go(U + 'profil.html'), saved: go(U + 'kaydettiklerim.html'), mine: go(U + 'tariflerim.html'), notifications: go(U + 'bildirimler.html'), notebook: go(U + 'kaydettiklerim.html'), menus: go(U + 'menulerim.html'), community: go(U + 'rozetlerim.html#topluluk'), chef: go(U + 'tariflerim.html'), badges: go(U + 'rozetlerim.html'), packages: go(U + 'pro.html'), payments: go(U + 'pro.html#odemeler'), settings: go(U + 'ayarlar.html'), help: go(U + 'destek.html'), about: go(U + 'hakkimizda.html'), privacy: go(U + 'yasal-metin.html?slug=gizlilik')}});
    document.addEventListener('click', e => { if (e.target.closest('[data-om-id=logout]')) try { localStorage.setItem('dg-oturum', '{"rol":"misafir"}'); } catch { /* yok */ } }, true);
  });
})();
// Metin kanonu ölçümü (B1): kök ekranlar da aynı dosyayı kullanır.
// Sonradan yüklenen ortak dosyaların (dg-metin, şef kartı, örnek şef verisi, veri) birleşik özeti — ortak/uret/sayfalar.mjs her üretimde günceller.
const METIN_V = '2d8ceb192b';
(() => { if (window.DGMetin || document.querySelector('script[src*="dg-metin.js"]')) return; const s = document.createElement('script'); s.src = (document.currentScript?.src || 'ortak/dg-baglanti.js').replace(/dg-baglanti\.js.*$/, 'dg-metin.js?v=' + METIN_V); s.defer = true; document.head.append(s); })();
// Ana sayfa “Dolapta Ne Var?” bloğu (Beyar revize D2, 13 Ekim): kök bloğun kartı ortak Dolapta Ne Var bileşeniyle (ortak/dg-dolap.js)
// yeniden çizilir — uygulama sayfasıyla aynı parçalar, aynı eşleştirme ve aynı seçim (dg-dolap). Bölüm başlığı kökteki gibi kalır.
(() => {
  const kur = () => {
    const kart = document.querySelector('.v3-dolap .v3-dolap-card'); if (!kart) return;
    const kok = (document.querySelector('script[src*="ortak/dg-baglanti.js"]')?.getAttribute('src') || 'ortak/dg-baglanti.js').replace(/ortak\/dg-baglanti\.js.*$/, '');
    // Stil sırası uygulama sayfasındakiyle aynı: dg-kontrol → uygulama bileşen stilleri (yalnız blok içinde) → dg-dolap.
    // Bileşen stilleri sayfadaki sırayla (dg-tokens, dg-kopru, dg-kontrol, dg-bilesen, dg-hareket, dg-dolap) @scope (.dgd-ana) ile yalnız bloğa
    // uygulanır (kapsam yakınlığı eşit kalsın diye hepsi aynı kapsamda) (Beyar düzeltmesi 13 Ekim:
    // ana sayfa bloğu sayfanın aynısı; kökün geri kalanına dokunmaz). :root/body → :scope; @keyframes kapsam dışında.
    const link = f => { if (document.querySelector(`link[href*="${f.split('/').pop()}"]`)) return; const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = kok + f + '?v=' + METIN_V; document.head.append(l); };
    link('ortak/dg-kontrol.css');
    if (!document.querySelector('style[data-dg-kapsam]')) {
      const disari = [], donustur = (t, taban) => t.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => /^(data:|https?:|\/|#)/.test(u) ? m : `url("${new URL(u, taban).href}")`)
        .replace(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, k => { disari.push(k); return ''; })
        .replace(/:root\b/g, ':scope').replace(/\bbody\.dgu\b/g, ':scope').replace(/(^|[\s,{}>])(html|body)(?=[\s,{.:\[>])/g, '$1:scope');
      const st = document.createElement('style'); st.dataset.dgKapsam = 'dgd-ana'; document.head.append(st);
      Promise.all(['dg-tokens.css', 'dg-kopru.css', 'dg-kontrol.css', 'dg-bilesen.css', 'dg-hareket.css', 'dg-dolap.css'].map(f => { const u = new URL(kok + 'ortak/' + f + '?v=' + METIN_V, location.href); return fetch(u).then(r => r.text()).then(t => donustur(t, u)); }))
        .then(L => { st.textContent = `@scope (.dgd-ana) {\n${L.join('\n')}\n}\n${disari.join('\n')}`; }).catch(() => {});
    }
    link('ortak/dg-dolap.css');
    const bas = () => { const yeni = document.createElement('div'); yeni.className = 'dgd-ana'; /* kart çerçevesi yok (Beyar EK 13 Ekim: sayfa ile görsel fark 0 — aynı genişlik, aynı kırılım) */ kart.replaceWith(yeni); window.DGDolap.blok(yeni, {hedef: kok + 'uygulama/dolapta-ne-var.html', kok, bildir: m => (typeof toast === 'function' ? toast(m) : null)}); };
    if (window.DGDolap) bas(); else { const s = document.createElement('script'); s.src = kok + 'ortak/dg-dolap.js?v=' + METIN_V; s.onload = bas; document.head.append(s); }
  };
  if (document.readyState === 'complete') kur(); else addEventListener('load', kur);
})();
