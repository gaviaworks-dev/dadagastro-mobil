/* G3 · Tarif türevleri — Kategoriler ve Dünya Mutfakları dizini (uygulama/kategoriler.html).
   Canlı karşılık (yalnız GET, 12 Ekim): ayrı dizin sayfası yok (/kategoriler 404). Kaynaklar:
   - Ana sayfa “catstrip”: etiket “Kategoriler”, başlık “Kategoriler & Dünya Mutfakları”, lead “Yöresel mutfaklardan dünya
     lezzetlerine — aradığın kategori burada.”, 34 kategori kartı (fotoğraf + ad + “N tarif”, /tarifler/kategori/<slug>), “Tamamını Gör” → /tarifler.
   - /tarifler hero sayaçları: 34 Kategori · 50 Dünya mutfağı; süzgeç “Mutfak” grubu: 50 mutfak (bayrak + ad + sayı, canlı sıra).
   Kategoriler ortak .dgu-kat (kare fotoğraf), mutfaklar ortak bayrak dili (.dgu-bayrak-izgara; seçim yerine bağlantı).
   Her öğe liste ekranına (DG.listeLink) gider. Dizinde arama/süzgeç canlıda yok → eklenmedi. */
(() => {
  const {esc, ic} = DG;
  const KAT = DGVERI.kategoriler, MUT = DGVERI.mutfaklar;
  const SEKME = [['kategori', 'Kategoriler', null, 'bowl-food'], ['mutfak', 'Dünya Mutfakları', null, 'earth-europe']];
  const kisa = ad => String(ad).replace(/\s+Mutfağı$/, '');
  const tarifSay = n => `${DG.sayi(n)} tarif`;

  // Kategori: kare gerçek fotoğraf + ad (en çok 2 satır) + “N tarif”. Görseli olmayan (canlıda da boş: Ana Yemek) nötr zemin + ikon.
  const katOge = k => `<a class="dgu-kat" href="${esc(DG.listeLink({'kategori[]': k.slug}))}" aria-label="${esc(`${k.ad}, ${tarifSay(k.sayi)}`)}">${k.gorsel
    ? `<span class="dgu-kat-foto" style="background-image:url('../${esc(k.gorsel)}')" aria-hidden="true"></span>`
    : `<span class="dgu-kat-foto tf-kat-bos" aria-hidden="true">${ic('utensils')}</span>`}<b class="clamp-2">${esc(k.ad)}</b><small>${tarifSay(k.sayi)}</small></a>`;
  // Mutfak: ortak bayrak seçimi ızgarasının işaretlemesi (DG.bayrakSecim) bağlantı olarak; giriş/onay kutusu yok.
  const mutOge = m => `<a class="dgu-bayrak-oge" href="${esc(DG.listeLink({'mutfak[]': m.slug}))}" aria-label="${esc(`${m.ad}, ${tarifSay(m.sayi)}`)}"><span class="dgu-bayrak-gorsel">${m.bayrak
    ? `<img class="dgu-bayrak" src="../${esc(m.bayrak)}" alt="" width="56" height="42" loading="lazy">`
    : `<span class="dgu-bayrak-yok">${ic('globe')}</span>`}</span><span class="dgu-bayrak-metin"><b>${esc(kisa(m.ad))}</b>${m.sayi ? `<small>${tarifSay(m.sayi)}</small>` : ''}</span></a>`;

  const panel = (k, ic2) => `<div class="tf-panel" id="tf-${k}" role="tabpanel" aria-labelledby="tf-sekme-${k}"${k === ic2 ? '' : ' hidden'}>`;
  // Yükleniyor: etkin sekmenin gerçek yerleşimi, ortak iskelet parçalarıyla (kategori: kare + ad + sayı; mutfak: bayrak ızgarası hücreleri).
  const katIskelet = n => `<div class="dgu-izgara-3" aria-busy="true" inert>${Array.from({length: n}, () => `<span class="dgu-kat"><span class="dgu-iskelet is-kare"></span><span class="dgu-iskelet is-satir"></span><span class="dgu-iskelet is-satir is-kisa"></span></span>`).join('')}</div>`;
  const mutIskelet = n => `<div class="dgu-bayrak-izgara" aria-busy="true" inert>${Array.from({length: n}, () => `<span class="dgu-bayrak-oge"><span class="dgu-bayrak-gorsel"><span class="dgu-iskelet tf-isk-bayrak"></span></span><span class="dgu-bayrak-metin"><span class="dgu-iskelet is-satir"></span><span class="dgu-iskelet is-satir is-kisa tf-isk-orta"></span></span></span>`).join('')}</div>`;

  DG.sayfa('kategoriler', ctx => {
    let sekme = ctx.qs.get('sekme') === 'mutfak' ? 'mutfak' : 'kategori';
    const ust = `<div class="dgu-ic tf-ust">${DG.seg('Kategori türü', SEKME, sekme)}</div>`;
    // Yükleniyor: iskelet gerçek içerikle aynı kapta ve konumda (kabuğun ayrı bölüm boşluğu kullanılmaz).
    const yuk = ctx.durum === 'yukleniyor';
    const html = `${ust}
      <div class="dgu-ic tf-govde">${yuk ? (sekme === 'mutfak' ? mutIskelet(16) : katIskelet(9)) : `
        ${panel('kategori', sekme)}<div class="dgu-izgara-3">${KAT.map(katOge).join('')}</div></div>
        ${panel('mutfak', sekme)}<div class="dgu-bayrak-izgara">${MUT.map(mutOge).join('')}</div></div>`}
      </div>`;
    return {tur: 'banner', baslik: 'Kategoriler ve Dünya Mutfakları', nav: 'recipes', menuAktif: sekme === 'mutfak' ? 'cuisines' : 'categories',
      banner: {baslik: 'Kategoriler & Dünya Mutfakları', alt: 'Yöresel mutfaklardan dünya lezzetlerine — aradığın kategori burada.', gorsel: KAT.find(k => k.slug === 'meze')?.gorsel || KAT[0].gorsel,
        sayaclar: (DGVERI.istatistik || []).map(s => [s.value, s.label])},  // canlı /tarifler hero: 6.112 Denenmiş tarif · 34 Kategori · 50 Dünya mutfağı
      iskelet: false,
      html, sonra(root) {
        const sekmeler = [...root.querySelectorAll('.dgu-seg [data-seg]')];
        sekmeler.forEach(b => { b.id = 'tf-sekme-' + b.dataset.seg; b.setAttribute('aria-controls', 'tf-' + b.dataset.seg); b.tabIndex = b.dataset.seg === sekme ? 0 : -1; });
        if (!root.querySelector('.tf-panel')) return; // kabuk hali (yükleniyor, hata): yalnız sekme ve iskelet
        const sec = (k, odak) => {
          sekme = k;
          sekmeler.forEach(b => { const on = b.dataset.seg === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && odak) b.focus(); });
          root.querySelectorAll('.tf-panel').forEach(p => { p.hidden = p.id !== 'tf-' + k; });
          const u = new URL(location.href); k === 'mutfak' ? u.searchParams.set('sekme', 'mutfak') : u.searchParams.delete('sekme'); history.replaceState(null, '', u);
          window.OrtakMenu?.configure?.({active: k === 'mutfak' ? 'cuisines' : 'categories'});
        };
        root.addEventListener('click', e => { const b = e.target.closest('.dgu-seg [data-seg]'); if (b) sec(b.dataset.seg); });
        root.querySelector('.dgu-seg').addEventListener('keydown', e => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
          e.preventDefault(); sec(e.key === 'Home' ? 'kategori' : e.key === 'End' ? 'mutfak' : sekme === 'kategori' ? 'mutfak' : 'kategori', true);
        });
      }};
  });
})();
