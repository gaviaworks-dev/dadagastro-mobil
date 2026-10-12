/* Ekran galerisi: ortak/veri/sayfalar.js listesinden. <body data-mod="patron|ic">. Patron sürümünde iç kod/teknik etiket yok;
   iç sürüm hazır/yapılıyor rozetini gösterir. Çerçeveler sırayla yüklenir (yerel sunucu yükü). */
(() => {
  const mod = document.body.dataset.mod || 'patron';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const G = window.DGSAYFALAR.filter(g => mod === 'ic' || g.hazir);
  const url = (s, q) => s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '');
  const hallerHtml = s => s.haller.length ? `<div class="gl-haller" role="group" aria-label="${esc(s.ad)} halleri"><button type="button" aria-pressed="true" data-q="${esc(s.ikili ? s.ikili[1] : '')}">${s.ikili ? 'Giriş yapılmış' : 'Varsayılan'}</button>${s.haller.map(([a, q]) => `<button type="button" aria-pressed="false" data-q="${esc(q)}">${esc(a)}</button>`).join('')}</div>` : '';
  // Giriş gerektiren sayfa (docs/55 §2b): misafir (giriş duvarı) ve giriş yapılmış dolu hâl yan yana. Hal seçici sağ (üye) çerçeveyi değiştirir.
  const ikiliKart = s => `<figure class="gl-kart is-ikili" data-dosya="${esc(s.dosya)}"><div class="gl-cift"><div class="gl-yan"><span class="gl-etiket">Misafir</span><div class="gl-tel"><iframe title="${esc(s.ad)} — misafir" data-src="${esc(url(s, s.ikili[0]))}" loading="lazy"></iframe></div></div><div class="gl-yan"><span class="gl-etiket">Giriş yapılmış</span><div class="gl-tel" data-hedef><iframe title="${esc(s.ad)} — giriş yapılmış" data-src="${esc(url(s, s.ikili[1]))}" loading="lazy"></iframe></div></div></div><figcaption class="gl-yigin"><div class="gl-ad"><b>${esc(s.ad)}</b><a href="${esc(url(s, s.ikili[1]))}" target="_blank" rel="noopener" data-tek>Tek başına aç</a></div>${hallerHtml(s)}</figcaption></figure>`;
  const kart = s => `<figure class="gl-kart" data-dosya="${esc(s.dosya)}"><div class="gl-tel"><iframe title="${esc(s.ad)}" data-src="${esc(url(s, ''))}" loading="lazy"></iframe></div><figcaption class="gl-yigin"><div class="gl-ad"><b>${esc(s.ad)}</b><a href="${esc(url(s, ''))}" target="_blank" rel="noopener" data-tek>Tek başına aç</a></div>${s.haller.length ? `<div class="gl-haller" role="group" aria-label="${esc(s.ad)} halleri"><button type="button" aria-pressed="true" data-q="">Varsayılan</button>${s.haller.map(([a, q]) => `<button type="button" aria-pressed="false" data-q="${esc(q)}">${esc(a)}</button>`).join('')}</div>` : ''}</figcaption></figure>`;
  document.getElementById('gl').innerHTML = `<nav class="gl-bas gl-icindekiler" aria-label="Gruplar">${G.map((g, i) => `<a href="#g${i}">${esc(g.ad)}</a>`).join('')}</nav>` + G.map((g, i) => `<section class="gl-grup" id="g${i}"><h2>${esc(g.ad)}${mod === 'ic' ? ` <span class="gl-durum ${g.hazir ? 'is-hazir' : 'is-yapiliyor'}">${g.hazir ? 'Hazır' : 'Yapılıyor'}</span>` : ''}</h2><div class="gl-satir">${g.sayfalar.map(s => s.ikili ? ikiliKart(s) : kart(s)).join('')}</div></section>`).join('');
  // Sıralı yükleme: görünür alana yaklaşan çerçeveler kuyrukla, birer birer.
  const kuyruk = []; let aktif = false;
  const sonraki = () => { if (aktif || !kuyruk.length) return; const f = kuyruk.shift(); aktif = true; const bit = () => { aktif = false; setTimeout(sonraki, 120); }; f.addEventListener('load', bit, {once: true}); setTimeout(bit, 8000); f.src = f.dataset.src; };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); kuyruk.push(e.target); sonraki(); } }), {rootMargin: '600px'});
  document.querySelectorAll('iframe[data-src]').forEach(f => io.observe(f));
  document.addEventListener('click', e => {
    const b = e.target.closest('.gl-haller button'); if (!b) return;
    const k = b.closest('.gl-kart'), f = k.querySelector('[data-hedef] iframe') || k.querySelector('iframe'), dosya = k.dataset.dosya, q = b.dataset.q;
    k.querySelectorAll('.gl-haller button').forEach(x => x.setAttribute('aria-pressed', x === b));
    const u = dosya + (q ? (dosya.includes('?') ? '&' : '?') + q : '');
    f.dataset.src = u; f.src = u; k.querySelector('[data-tek]').href = u;
  });
})();
