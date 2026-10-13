/* Tabaktan Tarif · “Senin tarifin (taslak)” — veri hazırlığı (K22, Beyar 12 Ekim; docs/55 §2n).
   Taslak ayrı bir tarif sayfası değildir: kök tarif detayı (detay-v2) aynen çizilir. Bu dosya detay-v2-tarifler.js'ten sonra,
   ld-source.js'ten önce yüklenir ve kaynak runtime'ın ilk adres okumasında (URLSearchParams.get) kaynak tarifi yapay zekâ taslağına çevirir:
   kapak = kullanıcının fotoğrafı (?foto=), yayın sonrası alanlar (yorum, puan, galeri, “ben de yaptım”, tarih, video, benzerler) boş.
   Kaynak veri dosyaları değişmez; yalnız bu sayfanın belleği. Adres: tabaktan-taslak.html?tarif=<kaynak slug>&foto=<görsel>&uye=pro */
(() => {
  const VARSAYILAN = 'patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver';
  const get = URLSearchParams.prototype.get; let hazir = false;
  const own = sp => sp.toString() === new URLSearchParams(location.search).toString();
  URLSearchParams.prototype.get = function (key) {
    const v = get.call(this, key);
    if (!hazir && typeof DATA !== 'undefined' && typeof PARITY !== 'undefined') {
      hazir = true;
      try {
        const qs = new URLSearchParams(location.search), slug = (qs.has('tarif') && get.call(qs, 'tarif')) || VARSAYILAN;
        const r = DATA.recipes.find(x => x.slug === slug);
        if (r) {
          const foto = get.call(qs, 'foto'); if (foto && /^(https:\/\/dadagastro\.com\/|assets\/|\.\.\/assets\/)/.test(foto)) r.image = foto;
          const P = PARITY.recipes[slug];
          if (P) Object.assign(P, {gallery: [], reviews: [], madePhotos: [], similar: [], related: [], badges: [], dates: [], made: 0, madeCount: 0, clapCount: 0, altReviewCount: 0, commentsEnabled: false, video: '', audio: '',
            steps: (P.steps || []).map(s => ({...s, images: []}))});
          window.TT_TASLAK = {slug, kaynak: r};
        }
      } catch { /* kaynak çizim aynen sürer */ }
    }
    if (key === 'tarif' && own(this) && !this.has('tarif')) return VARSAYILAN;
    return v;
  };
})();
