/* Tabaktan Tarif · “Senin tarifin (taslak)” — detay-v2 üzerine yalnız taslak farkları (K22, Beyar 12 Ekim; docs/55 §2n).
   Hero, başlık, sayaçlar, sekmeler, malzemeler (porsiyon), adımlar ve kubbe panel detay-v2'nin kendisidir. Farklar:
   · “Taslak” durum rozeti (DG.durumRozet işaretlemesi, ortak/dg-not.css) + kısa bilgi notu (DG.ipucu işaretlemesi)
   · alt sabit eylem: Düzenle (Tarif ekle akışına taslak) · Yeniden çek · Kaydet → Editöre gönder (detay-v2 alt çubuğunun aynı yuvaları)
   · yayın sonrası alanlar gizli: puan/değerlendirme, görüntülenme, Yorumlar sekmesi, şef kartı (takip/abone), benzer tarifler,
     yayın tarihleri, paylaş/kaydet/daha fazla header eylemleri.
   Kayıt bu cihazda Mutfak Defterim › Tariflerim listesine (dg-tariflerim, tarif-ekle ile aynı biçim) yazılır; sunucuya gönderilmez. */
(() => {
  const T = window.TT_TASLAK; if (!T || typeof recipe === 'undefined' || !recipe) return;
  const q = (s, k = document) => k.querySelector(s), qa = (s, k = document) => [...k.querySelectorAll(s)];
  const fa = n => `<i class="icon fa-solid fa-${n}" aria-hidden="true"></i>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const qs = new URLSearchParams(location.search), uye = qs.get('uye') || 'pro';
  const r = recipe, w = recipeInfo(r), ID = 'tabaktan-' + T.slug;
  const geri = `tabaktan-tarif.html?durum=sonuc&sekme=benzer&uye=${encodeURIComponent(uye)}${qs.get('eslesme') ? '&eslesme=' + encodeURIComponent(qs.get('eslesme')) : ''}`;
  const yeniden = `tabaktan-tarif.html?durum=kamera&uye=${encodeURIComponent(uye)}`;
  const st = {get() { try { return JSON.parse(localStorage.getItem('dg-tariflerim') || '[]'); } catch { return []; } }, set(v) { try { localStorage.setItem('dg-tariflerim', JSON.stringify(v)); } catch { /* özel pencere */ } }};
  // ?durum=taslak|inceleniyor yalnız galeri görünümü içindir (kayıt yazmaz).
  const zorla = ['taslak', 'inceleniyor'].includes(qs.get('durum')) ? {durum: qs.get('durum')} : null;
  const kayit = () => st.get().find(x => x.id === ID) || zorla;
  // Durum rozeti ve bilgi notu: dg-ui.js DG.durumRozet / DG.ipucu ile aynı işaretleme (CSS ortak/dg-not.css).
  const ROZET = {taslak: ['Taslak', 'notr', 'pen'], inceleniyor: ['İncelemede', 'uyari', 'hourglass-half']};
  const rozet = d => { const [a, t, i] = ROZET[d] || ROZET.taslak; return `<span class="dgu-durum-rozet is-${t}" data-tt-rozet>${fa(i)}<span>${a}</span></span>`; };
  document.body.classList.add('tt-taslak');
  document.title = `Taslak · ${String(r.title).split('|')[0].trim()} · DadaGastro`;

  // 1. Header: geri Tabaktan sonucuna (Benzer tarifler); paylaş, kaydet ve daha fazla yok (özel taslak). Menü kalır.
  const back = q('.detail-header a.icon-button'); if (back) { back.setAttribute('href', geri); back.setAttribute('aria-label', 'Benzer tariflere dön'); }
  qa('.detail-header-actions > :is(.header-save,#shareRecipe,[aria-label="Diğer tarif işlemleri"])').forEach(e => e.remove());

  // 2. Hero: durum rozeti kategori etiketinin yanında; puan/değerlendirme ve görüntülenme yok (maliyet kalır).
  const copy = q('.detail-cover-copy'), eb = q('.eyebrow', copy);
  if (eb) { const sat = document.createElement('div'); sat.className = 'tt-ust'; eb.replaceWith(sat); sat.append(eb); sat.insertAdjacentHTML('beforeend', rozet(kayit()?.durum)); }
  qa('.detail-cover-meta .dv2-cap').forEach(c => { if (!c.classList.contains('dv2-cap-cost')) c.remove(); });

  // 3. Bilgi notu: panelin başında, özetten önce.
  q('.dv2-facts')?.insertAdjacentHTML('beforebegin', `<aside class="dgu-ipucu tt-not"><span class="dgu-ipucu-ikon" aria-hidden="true">${fa('wand-magic-sparkles')}</span><div><h4>Yapay zekâ ile oluşturuldu</h4><p>${qs.get('eslesme') === 'zayif' ? 'Fotoğraf bir tarifle tam eşleşmedi; taslak en yakın tariften hazırlandı. ' : ''}Yalnız sana özel. Ölçüler fotoğraftan tahmin edildi; pişirmeden önce kontrol et, dilediğin gibi düzenle.</p></div></aside>`);

  // 4. Yorumlar sekmesi ve paneli; şef kartı (takip/abone); benzer tarifler; yayın tarihleri.
  const yt = q('#dv2-tab-yorumlar'); if (yt) { if (yt.getAttribute('aria-selected') === 'true') q('#dv2-tab-malzemeler')?.click(); yt.remove(); }
  q('#dv2-pane-yorumlar')?.remove();
  // Revize 4: iki seçenekli geçiş (Malzemeler / Hazırlanış) kayan segment değil, ortak alt çizgili sekme (.dgu-seg--sekme, ortak/dg-kontrol.css).
  // Düğmeler aynı öğelerdir; detay-v2 sekme işleyicisi (.dv2-tabs-bar üzerinde) çalışmaya devam eder.
  const sekme = q('.dv2-tabs'); if (sekme) { sekme.className = 'dgu-seg dgu-seg--sekme'; qa('[data-dv2-tab]', sekme).forEach(b => { b.dataset.seg = b.dataset.dv2Tab; }); }
  qa('.dv2-chef, .dv2-similar, .review-section').forEach(e => e.remove());
  qa('.dv2-accordion .metadata-body > p').forEach(p => { if (/\d{4}/.test(p.textContent)) p.remove(); });

  // 5. Alt sabit eylem: aynı çubuk (.cook-bar), aynı yuvalar — solda Düzenle + Yeniden çek, sağda ana eylem Kaydet → Editöre gönder.
  // Pişirmeye Başla düğmesi aynı yerde, aynı sınıf ve kimlikle yeni bir düğmeyle değişir (detay-v2 pişirme işleyicisi bağlı kalmaz).
  const dock = q('.cook-bar'), ikonlar = q('.engagement-icons', dock), eskiAna = q('#startCooking', dock);
  if (ikonlar) ikonlar.innerHTML = `<button class="engagement-icon dv2-engage" type="button" data-tt="duzenle" aria-label="Taslağı düzenle">${fa('pen')}<small>Düzenle</small></button><a class="engagement-icon dv2-engage" href="${esc(yeniden)}" aria-label="Fotoğrafı yeniden çek">${fa('camera')}<small>Yeniden çek</small></a>`;
  const ana = eskiAna && Object.assign(document.createElement('button'), {className: eskiAna.className, type: 'button', id: 'startCooking'}); if (ana) eskiAna.replaceWith(ana);
  const anaCiz = () => { const d = kayit()?.durum;
    if (ana) { ana.dataset.tt = !d ? 'kaydet' : d === 'taslak' ? 'gonder' : 'defter';
      ana.innerHTML = !d ? `${fa('floppy-disk')}<span>Kaydet</span>` : d === 'taslak' ? `${fa('paper-plane')}<span>Editöre gönder</span>` : `${fa('book')}<span>Tariflerim</span>`; }
    const rz = q('[data-tt-rozet]'); if (rz) rz.outerHTML = rozet(d); };

  // Tarif ekle biçimi (ortak/sayfalar/profil.js formuTasi): malzemeler grup başlıklarıyla, adımlar başlık + süre + metin; kapak = kullanıcı fotoğrafı.
  const form = d => {
    const satir = (w.ingredients || []).filter(i => !i.group); let n = 0;
    const malzemeler = (w.ingredients?.length ? w.ingredients : r.ingredients.map(i => ({name: i.name}))).map(i => {
      if (i.group) return {tur: 'grup', ad: i.group};
      const k = r.ingredients[n] || {}, s = satir[n] || i; n++;
      return {tur: 'malzeme', miktar: k.amount == null ? '' : String(k.amount).replace('.', ','), birim: k.unit || '', ad: k.name || s.name || '', alternatif: (s.substitutes || []).map(x => x.name || x).join(', ')};
    });
    const adimlar = (r.steps || []).map(s => ({tur: 'adim', baslik: s.title || '', sure: String(s.time || '').replace(/\D+/g, ''), metin: s.body || s.text || ''}));
    return {id: ID, durum: d, kaynak: 'tabaktan', kapak: r.image, ad: String(r.title).split('|')[0].trim(), kategoriler: [r.category].filter(Boolean), kategori: r.category || '', mutfaklar: (r.web?.features || []).filter(x => /Mutfağı$/.test(x)),
      aciklama: r.description || '', porsiyon: String(r.servings || ''), birim: r.unit || 'kişilik', malzemeler, adimlar, adim: 4, guncel: Date.now()};
  };
  const yaz = d => { const l = st.get().filter(x => x.id !== ID); st.set([{...(st.get().find(x => x.id === ID) || form(d)), durum: d, guncel: Date.now()}, ...l]); };
  const bildir = m => (typeof toast === 'function' ? toast(m) : null);
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tt]'); if (!b) return; const a = b.dataset.tt;
    if (a === 'duzenle' && kayit()?.durum === 'inceleniyor') { bildir('İnceleme bitene kadar taslak düzenlenemez.'); return; }
    if (a === 'duzenle') { if (!st.get().some(x => x.id === ID)) yaz(kayit()?.durum || 'taslak'); location.href = `uygulama/tarif-ekle.html?taslak=${encodeURIComponent(ID)}&oturum=${encodeURIComponent(uye === 'misafir' ? 'uye' : uye)}`; return; }
    if (a === 'kaydet') { yaz('taslak'); anaCiz(); bildir('Taslak Tariflerim’e kaydedildi'); return; }
    if (a === 'gonder') { yaz('inceleniyor'); anaCiz(); bildir('Editöre gönderildi · İnceleme ortalama 24–48 saat sürer'); return; }
    if (a === 'defter') location.href = `uygulama/tariflerim.html?oturum=${encodeURIComponent(uye === 'misafir' ? 'uye' : uye)}`;
  });
  anaCiz();
})();
