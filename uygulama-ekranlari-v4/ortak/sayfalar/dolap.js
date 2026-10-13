/* Dolapta Ne Var (docs/52 D1; Beyar revize D2, 13 Ekim). Parçalar ve eşleştirme ortak bileşenden (ortak/dg-dolap.js, DGDolap):
   ana sayfa bloğuyla aynı mod seçici, malzeme alanı (+ sesli giriş), çipler, seçim paneli, besin ve vakit süzgeçleri; seçim tek yerde
   (dg-dolap). Canlı dadagastro.com/dolapta-ne-var alan alan: başlık + giriş metinleri, Dolaptakiler / Hariç Tuttuklarım, hariç türleri
   (Sevmiyorum · Tüketmiyorum + hızlı seçim + tek tek malzeme · Alerjim Var + Diğer · Hassasiyetim Var: Kesinlikle gösterme / Uyararak
   göster), 8 kategori, Besin değeri (porsiyon kalorisi, protein), Vakit & zorluk, Filtreleri sıfırla, sonuç özeti, Tam eşleşme / n eksik,
   sonuçlarda ara, boş durumlar. Eşleştirme prototipin gerçek tariflerinde; backend havuzu varmış gibi gösterilmez. */
(() => {
  const {ic, I, esc, btn, durum} = DG;
  const D = window.DGDolap;
  const kartEk = (t, tur, ust = '', alt = '') => DG.kart(t, tur).replace('<div class="dg-card__body">', `<div class="dg-card__body">${ust}`).replace(/<\/div><\/article>$/, `${alt}</div></article>`);

  DG.sayfa('dolapta-ne-var', ctx => {
    const ornek = ctx.qs.has('ornek');
    const st = ornek ? Object.assign(D.bos(), {have: ['Soğan', 'Sarımsak', 'Domates', 'Pirinç', 'Tereyağı', 'Limon'], sev: ['Kişniş']}) : D.oku();
    const kaydet = () => { if (!ornek) D.yaz(st); };
    // Tabaktan Tarif “Bu malzemelerle Dolapta Ne Var’da ara” → ?malzeme=a,b: seçilenler dolaba eklenir, sonuçlar açılır.
    const gelen = (ctx.qs.get('malzeme') || '').split(',').map(x => x.trim()).filter(Boolean);
    if (gelen.length) { gelen.forEach(m => { if (D.nerede(st, m) !== 'have') D.sec(st, m, 'have'); }); kaydet(); }
    // Seçici görünüm durumu (ortak DGDolap.seciciHtml/seciciBagla — ana sayfa bloğuyla aynı fonksiyon).
    const u = {sekme: ctx.qs.get('sekme') === 'haric' ? 'haric' : 'have', hmod: D.HMOD.some(h => h[0] === ctx.qs.get('hmod')) ? ctx.qs.get('hmod') : 'sev', ara: ''};
    let sonucAcik = ctx.qs.has('sonuc') || gelen.length > 0, sonucAra = '';
    return {tur: 'alt', baslik: 'Dolapta Ne Var?', nav: 'find', menuAktif: 'pantry', iskelet: DG.iskelet(4, 'satir'), html: `<div data-dolap></div>`,
      sonra(root) {
        const el = root.querySelector('[data-dolap]'); if (!el) return;
        // Seçim görünümü: ortak TEK İÇERİK (DGDolap.icerik — ana sayfa bloğuyla aynı fonksiyon); sayfaya özgü yalnız dış başlık.
        const UST = '<div class="dgu-yigin-8"><h1 class="t-page">Dolabındaki malzemeyle pişir</h1><p class="dgu-yardim"><b>Daha az israf:</b> elindekini değerlendir, bozulmadan sofraya gelsin.</p></div>';
        function secimCiz() { el.innerHTML = D.icerik(st, u, {ust: UST, hedef: 'dolapta-ne-var.html', gorselli: true, kok: '../'}); }   // sayfa: gerçek görselli malzeme kartları (Beyar V4 B4)
        function sonucCiz(odak = true) {
          const {liste, tam} = D.sonuc(st), h = st.have.length, x = D.haricSayi(st);
          const q = D.norm(sonucAra.trim()), L = q ? liste.filter(r => D.norm(r.t.baslik).includes(q)) : liste;
          const enYakin = h && !tam && liste.length;
          let govde;
          if (D.bosMu(st)) govde = durum({ikon: I('pantry'), baslik: 'Dolabın boş görünüyor', metin: 'Dolaptakiler\'den birkaç malzeme işaretle — sana onlarla pişirebileceğin denenmiş tarifleri getirelim.', eylem: btn('Malzeme seç', {attrs: 'data-sonuc-kapat'})});
          else if (!liste.length) govde = durum({ikon: I('search'), baslik: D.suzgecSayi(st) ? 'Bu süzgeçlerle uyan tarif yok' : 'Bu malzemelerle tarif yok', metin: D.suzgecSayi(st) ? 'Süzgeçleri gevşet ya da sıfırla.' : 'Bir hariç tutmayı kaldır ya da başka bir malzeme ekle.', eylem: btn(D.suzgecSayi(st) ? 'Süzgeçleri sıfırla' : 'Seçimi düzenle', {attrs: D.suzgecSayi(st) ? 'data-suzgec-sifirla data-sonuc-kal' : 'data-sonuc-kapat'})});
          else if (!L.length) govde = durum({ikon: I('search'), baslik: 'Aramanla eşleşen tarif çıkmadı — farklı bir tarif adı dene.'});
          else govde = `<div class="dgu-yigin">${L.map(r => { const k = !h ? '' : `<span class="dgu-rozet${r.eksik.length ? ' is-notr' : ''}">${r.eksik.length ? `${r.eksik.length} eksik` : 'Tam eşleşme'}</span>`;
            const satirlar = [h && r.varOlan.length ? `<p class="dl-eslesme"><b>Elinde:</b> ${esc(r.varOlan.join(', '))}</p>` : '', h && r.eksik.length ? `<p class="dl-eslesme"><b>Eksik:</b> ${esc(r.eksik.slice(0, 3).join(', '))}${r.eksik.length > 3 ? ` +${r.eksik.length - 3}` : ''}</p>` : '', r.uyari.length ? `<p class="dl-eslesme is-uyari">${ic(I('error'))}Uyarı: ${esc(r.uyari.join(', '))}</p>` : '', r.sev.length ? `<p class="dl-eslesme">${ic(I('info'))}Sevmediğin: ${esc(r.sev.join(', '))} — çıkarabilirsin</p>` : ''].join('');
            return kartEk(r.t, 'row', k, satirlar ? `<div class="dl-eslesmeler">${satirlar}</div>` : ''); }).join('')}</div>`;
          el.innerHTML = `<div class="dgu-ic dgu-yigin">
            ${D.bosMu(st) ? '' : `<div class="dgu-yigin-8"><div class="u-ara"><h1 class="t-section" tabindex="-1" data-odak><b>${DG.sayi(liste.length)}</b> tarif bulundu</h1>${btn('Seçimi düzenle', {tur: 'metin', ikon: 'pen', attrs: 'data-sonuc-kapat'})}</div><p class="dgu-yardim">elindeki ${h} malzemeyle${x ? ` · ${x} hariç` : ''}${D.suzgecSayi(st) ? ` · ${D.suzgecSayi(st)} süzgeç` : ''}</p>${enYakin ? `<p class="dgu-yardim">${ic('arrows-to-circle')} Tam eşleşme yok — elindekilere en yakın tarifler gösteriliyor.</p>` : h && tam ? `<p class="dgu-yardim">${ic('circle-check')} ${tam} tam eşleşme; kalanlar elindekilere en yakın tarifler.</p>` : ''}</div>`}
            ${liste.length ? `<div class="dgu-alan"><label class="dgu-sr" for="f-sonuc-ara">Sonuçlarda ara</label><div class="dgu-girdi${sonucAra ? ' has-text' : ''}">${ic(I('search'))}<input id="f-sonuc-ara" type="search" placeholder="Sonuçlarda ara — tarif adı…" value="${esc(sonucAra)}" autocomplete="off">${sonucAra ? `<button class="dgu-ibtn" type="button" data-sonuc-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button>` : ''}</div></div>` : ''}
            <div data-sonuc-liste>${govde}</div>
          </div>`;
          if (odak) el.querySelector('[data-odak]')?.focus({preventScroll: true});
        }
        const ciz = odak => { const a = new URL(location.href); sonucAcik ? a.searchParams.set('sonuc', '1') : a.searchParams.delete('sonuc'); u.sekme === 'haric' ? a.searchParams.set('sekme', 'haric') : a.searchParams.delete('sekme'); history.replaceState(null, '', a); sonucAcik ? sonucCiz(odak !== false) : secimCiz(); };
        el.addEventListener('click', e => {
          if (e.target.closest('[data-goster]')) { e.preventDefault(); e.stopPropagation(); sonucAcik = true; sonucAra = ''; ciz(); scrollTo({top: 0}); return; }
          if (e.target.closest('[data-suzgec-sifirla][data-sonuc-kal]')) { e.stopPropagation(); st.sure = ''; st.zorluk = []; st.kalori = [0, D.KALORI_UST]; st.protein = 0; kaydet(); sonucCiz(); DG.bildir('Filtreler sıfırlandı'); return; }
          if (e.target.closest('[data-sonuc-kapat]')) { e.stopPropagation(); sonucAcik = false; ciz(); scrollTo({top: 0}); return; }
          if (e.target.closest('[data-sonuc-temizle]')) { e.stopPropagation(); sonucAra = ''; sonucCiz(); el.querySelector('#f-sonuc-ara')?.focus(); }
        }, true);
        el.addEventListener('input', e => {
          if (e.target.id === 'f-sonuc-ara') { sonucAra = e.target.value; const p = e.target.selectionStart; sonucCiz(false); const i = el.querySelector('#f-sonuc-ara'); i.focus(); i.setSelectionRange(p, p); }
        });
        D.seciciBagla(el, st, u, {kaydet, yeniden: odak => { const a = new URL(location.href); u.sekme === 'haric' ? a.searchParams.set('sekme', 'haric') : a.searchParams.delete('sekme'); history.replaceState(null, '', a); secimCiz(); }, bildir: (m, geriAl) => DG.bildir(m, geriAl ? {eylem: {ad: 'Geri al', fn: geriAl}} : undefined)});
        ciz(false);
      }};
  });
})();
