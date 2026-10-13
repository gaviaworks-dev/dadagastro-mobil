/* ŞEF KARTI — TEK ORTAK BİLEŞEN (yalnız ana ajan yazar; Beyar EK, 13 Ekim: “şef kartı her yerde tarif detayındakiyle BİREBİR aynı,
   tam hâlde: avatar, ad, kademe rozeti, ‘…'dan beri üye’, sayaçlar Tarif · Püf noktası · Takipçi (üçü de dolu), Takip et + Abone ol;
   sayfaya göre sayaç azaltma yok; tek veri kaynağı”).
   Kullananlar: uygulama sayfaları (DG.sefKarti → bu dosya), kök tarif detayı ve Tabaktan taslağı (dg-baglanti.js kökün kendi kartını bu
   çıktıyla değiştirir). Görünüm ortak/dg-sef-karti.css (detay-v2.css şef kartı kurallarının kopyası); sayaçlar ortak sayaç bandı (ortak/dg-sayac.css, .is-yalin). Veri: DGVERI.sefler (gerçek) +
   ortak/veri/ornek-sef.js (gerçekte boş/sıfır olan sayaçların örneği). Takip / abonelik ortak yerel listede (dg-takip, dg-abone);
   misafirde giriş kapısına gider ve girişten sonra yazar kartına döner (B7). Kancalar: uyeMi, kapi, bildir (dg-ui kendi işlevlerini bağlar). */
(() => {
  if (window.DGSefKarti) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const fa = (n, c = '') => `<i class="icon fa-solid fa-${n}${c ? ' ' + c : ''}" aria-hidden="true"></i>`;
  const sayi = n => Number(n).toLocaleString('tr-TR');
  const oku = k => { try { return JSON.parse(localStorage.getItem('dg-' + k) || '[]'); } catch { return []; } };
  const yaz = (k, v) => { try { localStorage.setItem('dg-' + k, JSON.stringify(v)); } catch { /* özel pencere */ } };
  const norm = s => String(s || '').replace(/­/g, '').trim().toLocaleLowerCase('tr');
  // Şef kaydı: kullanıcı adı ya da görünen ad ile.
  const sef = x => (window.DGVERI?.sefler || []).find(s => s.kullanici === x || norm(s.ad) === norm(x)) || null;
  // Sayaçlar: Tarif · Püf noktası · Takipçi — gerçek değer > 0, yoksa örnek; sıfır/boş sayaç çizilmez.
  const sayac = s => { const o = (window.DGORNEKSEF || {})[s?.kullanici] || {}; return [['tarif', 'Tarif'], ['puf', 'Püf noktası'], ['takipci', 'Takipçi']].map(([k, l]) => [+(s?.[k]) > 0 ? +s[k] : +o[k] > 0 ? +o[k] : 0, l]).filter(([n]) => n > 0).map(([n, l]) => [sayi(n), l]); };
  // Yıl için Türkçe çıkma eki: “2026'dan”, “2021'den”, “2024'ten” (sayının okunuşunun son sesine göre).
  const yilDan = y => { const n = +y % 100, b = n % 10, o = Math.floor(n / 10), EK = ['den', 'den', 'den', 'ten', 'ten', 'ten', 'dan', 'den', 'den', 'dan'], ON = ['den', 'dan', 'den', 'dan', 'tan', 'den', 'tan', 'ten', 'den', 'dan']; return `${y}'${b ? EK[b] : o ? ON[o] : 'den'}`; };
  // o: {ad, kullanici, kademe, uyelik, sayaclar, bio, href, abone = true, etiket}. Eski çağrıların “Üyelik” sayacı ad altı satırına taşınır.
  function html({ad, kullanici, kademe, uyelik, sayaclar = [], bio, href = '', abone = true, etiket = 'Yazar'}) {
    sayaclar = sayaclar.filter(([n, l]) => { if (l === 'Üyelik') { uyelik = uyelik || n; return false; } return n != null && n !== '' && !/^0+$/.test(String(n).replace(/\D/g, '') || '0'); });
    const on = !!kullanici && oku('takip').includes(kullanici), ab = !!kullanici && oku('abone').includes(kullanici);
    const durum = (a, i1, m1, i2, m2) => `<span class="dv2-x-state" data-on="${!a}">${fa(i1)}<span>${m1}</span></span><span class="dv2-x-state" data-on="${a}">${fa(i2)}<span>${m2}</span></span>`;
    return `<section class="dv2-chef dv2-chef-x dv2-chef-b dgu-skart" aria-label="${esc(etiket)}"><div class="dv2-b-top"><span class="dv2-avatar dv2-avatar-lg dv2-x-avatar" aria-hidden="true">${esc(String(ad || '?').slice(0, 1).toLocaleUpperCase('tr'))}</span><div class="dv2-b-id"><a class="dv2-chef-id dv2-chef-link" href="${esc(href)}" aria-label="${esc(ad)}${kademe ? ', ' + esc(kademe) : ''}; profilini gör"><span class="dv2-chef-name">${esc(ad)}</span></a>${kademe ? `<span class="dv2-chef-badge">${fa('award')}<span>${esc(kademe)}</span></span>` : ''}${uyelik ? `<span class="dgu-skart-uyelik">${esc(yilDan(uyelik))} beri üye</span>` : ''}</div>${fa('chevron-right', 'dv2-chef-go')}</div>${sayaclar.length ? `<dl class="dgu-istatistik is-yalin" data-sutun="${sayaclar.length}">${sayaclar.map(([n, l]) => `<div><dd>${esc(n)}</dd><dt>${esc(l)}</dt></div>`).join('')}</dl>` : ''}${bio ? `<p class="dv2-chef-bio">${esc(bio)}</p>` : ''}${kullanici ? `<div class="dv2-b-actions"${abone ? '' : ' style="grid-template-columns:1fr"'}><button type="button" class="dv2-follow dv2-b-follow" data-skart-takip="${esc(kullanici)}" data-ad="${esc(ad)}" aria-pressed="${on}" aria-label="${esc(ad)} ${on ? 'takip ediliyor; takipten çıkmak için dokun' : 'takip et'}">${durum(on, 'user-plus', 'Takip et', 'user-check', 'Takip ediliyor')}</button>${abone ? `<button type="button" class="dv2-subscribe dv2-b-sub" data-skart-abone="${esc(kullanici)}" data-ad="${esc(ad)}" aria-pressed="${ab}" aria-label="${esc(ad)} ${ab ? 'aboneliğini yönet' : 'şefine abone ol (Üretici Üyeliği)'}">${durum(ab, 'bell', 'Abone ol', 'circle-check', 'Abonesin')}</button>` : ''}</div>` : ''}</section>`;
  }
  // Şef kaydından tam kart: sayaçlar ve üyelik yılı tek kaynaktan; kademe/bio/href çağırandan gelebilir.
  const kart = (s, {kademe, bio, href, abone, etiket} = {}) => html({ad: s.ad, kullanici: s.kullanici, kademe: kademe || s.unvan, uyelik: s.uyelikYili, sayaclar: sayac(s), bio, href, abone, etiket});
  const K = {
    uyeMi: () => { try { const q = new URLSearchParams(location.search); return (q.get('oturum') || JSON.parse(localStorage.getItem('dg-oturum') || '{"rol":"misafir"}').rol) !== 'misafir' || q.get('giris') === '1'; } catch { return false; } },
    kapi: u => { const kok = /\/uygulama\//.test(location.pathname) ? '' : 'uygulama/', d = location.pathname.split('/v3-app/')[1] || ''; location.href = `${kok}giris.html?eylem=takip&donus=${encodeURIComponent(d + location.search)}&devam=yazar`; },
    bildir: m => (typeof window.toast === 'function' ? window.toast(m) : null)
  };
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-skart-takip],[data-skart-abone]'); if (!t) return; e.preventDefault(); e.stopImmediatePropagation();
    const u = t.dataset.skartTakip || t.dataset.skartAbone, abone = !!t.dataset.skartAbone, k = abone ? 'abone' : 'takip';
    if (!K.uyeMi()) return K.kapi(u);
    const s = oku(k), on = !s.includes(u); yaz(k, on ? [...s, u] : s.filter(x => x !== u));
    t.setAttribute('aria-pressed', on); t.querySelectorAll('.dv2-x-state').forEach((x, i) => { x.dataset.on = String(i ? on : !on); });
    t.setAttribute('aria-label', `${t.dataset.ad} ${abone ? (on ? 'aboneliğini yönet' : 'şefine abone ol (Üretici Üyeliği)') : (on ? 'takip ediliyor; takipten çıkmak için dokun' : 'takip et')}`);
    K.bildir(abone ? (on ? 'Abone oldun' : 'Abonelikten çıktın') : (on ? 'Takip etmeye başladın.' : 'Takibi bıraktın.'));
  }, true);
  window.DGSefKarti = Object.assign(K, {sef, sayac, yilDan, html, kart});
})();
