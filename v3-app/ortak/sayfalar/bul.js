/* G2 · Tarif bulma (docs/52 N1, N2, N4, D1): Ne Pişirsem (sihirbaz + Yemek Modu), Menüyü Pişir, Dolapta Ne Var.
   Metinler canlı dadagastro.com ve kaynak repo tohum verisiyle aynı (uye-sihirbaz-adimlari.json, dolapta-ne-var/bugun-ne-pisirsem
   şablonları). Eşleştirme prototipin 32 gerçek tarifi üzerinde yerel ve açıklanabilir kurallarla yapılır; backend havuzu varmış
   gibi gösterilmez. Dolap, menü tepsisi ve menüler yalnız bu cihazda (dg-dolap, dg-menu-tepsi, dg-menuler) tutulur.
   dg-menuler biçimi profil grubuyla ortak: [{id, ad, tarifler: [tarif slug], mod, olusturma}] (menuyu-pisir `kaplar` ve {slug} nesnelerini de okur). */
(() => {
  const {ic, I, esc, btn, seg, durum, store} = DG;
  const V = DGVERI, T = V.tarifler.filter(t => t.yazar); // yazarı bilinmeyen tarif öne çıkarılmaz (V-kısmi)
  const norm = s => String(s || '').toLocaleLowerCase('tr-TR');
  const words = s => norm(s).split(/[^a-zçğıöşüâîû]+/).filter(Boolean);
  // ana-v3 Dolapta Ne Var ile aynı: kelime düzeyi, Türkçe eke toleranslı ("Un" ~ "buğday unu"; "biber" ≠ "karabiber").
  const wordHit = (w, v) => v.startsWith(w) || (w.length > 4 && w.startsWith(v) && w.length - v.length <= 2);
  const esler = (ad, isim) => { const want = words(isim), have = words(ad); return want.length > 0 && want.every(w => have.some(v => wordHit(w, v))); };
  const kullanir = (t, isim, haric = []) => t.malzemeler.some(m => esler(m.ad, isim) && !haric.some(h => norm(m.ad).includes(h)));
  const herhangi = (t, liste, haric) => liste.some(n => kullanir(t, n, haric));
  const etiket = (t, ...e) => (t.ozellikler || []).some(x => e.includes(x));
  const ss = {get(k, d) { try { const v = sessionStorage.getItem('dg-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } }, set(k, v) { try { sessionStorage.setItem('dg-' + k, JSON.stringify(v)); } catch { /* yok */ } }};
  const fotoStil = t => `background-image:url('../${esc(t.gorsel)}')`;
  // EK (tutarlılık): bölüm başlıkları ortak DG.bas (.dg-head h2, section rolü); sağ sütunda sayaç ya da düğme; odak öznitelikleri h2'ye.
  const bas = (b, eylem = '', odak = '') => { const h = DG.bas(b, eylem ? {html: eylem} : undefined); return odak ? h.replace('<h2>', `<h2 ${odak}>`) : h; };
  // Karta küçük bir satır eklenir (kartın kendisi DGCard: kök ekranlarla aynı bileşen).
  const kartEk = (t, tur, ust = '', alt = '') => DG.kart(t, tur).replace('<div class="dg-card__body">', `<div class="dg-card__body">${ust}`).replace(/<\/div><\/article>$/, `${alt}</div></article>`);

  // ---------- Ortak sözlük: katalog grupları, kap türleri, et/süt/gluten… (yalnız malzeme adlarından) ----------
  const GRUP_IKON = {'Sebzeler': 'carrot', 'Meyveler': 'apple-whole', 'Kırmızı Et': 'bacon', 'Tavuk ve Kümes Ürünleri': 'drumstick-bite', 'Balık ve Deniz Ürünleri': 'fish', 'Süt Ürünleri': 'cheese', 'Tahıllar ve Bakliyatlar': 'wheat-awn', 'Baharatlar, Otlar ve Soslar': 'mortar-pestle'};
  const KAT = V.dolapKatalog.map(g => ({grup: g.grup, ikon: GRUP_IKON[g.grup] || I('pantry'), malzemeler: g.malzemeler}));
  const grubu = ad => KAT.find(g => g.malzemeler.includes(ad))?.grup || '';
  const kat = ad => KAT.find(g => g.grup === ad)?.malzemeler || [];
  const KABUKLU = ['Karides', 'Midye', 'Istakoz', 'Yengeç', 'Kalamar', 'Ahtapot', 'Deniz Tarağı'];
  const KIRMIZI = [...kat('Kırmızı Et'), 'Et Suyu', 'Kıyma'];
  const KANATLI = [...kat('Tavuk ve Kümes Ürünleri').filter(x => !/Yumurtası/.test(x)), 'Tavuk', 'Ördek', 'Hindi'];
  const BALIK = [...kat('Balık ve Deniz Ürünleri').filter(x => !KABUKLU.includes(x)), 'Balık', 'Levrek', 'Uskumru', 'Sardalya'];
  const SUT = [...kat('Süt Ürünleri').filter(x => !/Bitkisel/.test(x)), 'Peynir', 'Sade Yağ'];
  const SUT_HARIC = ['hindistan', 'bitkisel'];
  const GLUTEN = ['Un', 'Buğday', 'Bulgur', 'İrmik', 'Yufka', 'Kadayıf', 'Makarna', 'Şehriye', 'Erişte', 'Arpa', 'Çavdar', 'Ekmek'];
  const GLUTEN_HARIC = ['pirinç', 'karabuğday', 'mısır'];
  const KURUYEMIS = ['Ceviz', 'Fındık', 'Badem', 'Antep Fıstığı', 'Kaju'];
  const SEKER = ['Şeker', 'Pudra Şekeri'];
  const etli = t => herhangi(t, [...KIRMIZI, ...KANATLI, ...BALIK, ...KABUKLU]);
  const sutlu = t => herhangi(t, SUT, SUT_HARIC);
  const glutenli = t => !etiket(t, 'Glutensiz') && herhangi(t, GLUTEN, GLUTEN_HARIC);
  // Kap türü ↔ tarif kategorisi (sihirbaz 1. adım ve menü servis sırası).
  const KAP = {baslangic: ['Çorba', 'Meze', 'Atıştırmalık'], ana: ['Tavuk ve Hindi', 'Kırmızı Et', 'Balık ve Deniz Ürünleri', 'Dolma ve Sarma', 'Bakliyat', 'Köfte ve Kebap', 'Makarna', 'Sebze', 'Sakatat', 'Mantı ve Dolgulu Hamurlar', 'Pizza ve Pide', 'Sandviç, Burger ve Dürüm'], yan: ['Pilav', 'Salata', 'Zeytinyağlılar', 'Sos', 'Turşu ve Konserve', 'Ekmek'], kahvalti: ['Kahvaltılık', 'Yumurta Tarifleri', 'Hamur İşi'], tatli: ['Tatlı', 'Kek ve Pasta', 'Kurabiye', 'Dondurma ve Soğuk Tatlılar', 'Reçel'], icecek: ['İçecek']};
  const KAP_AD = {baslangic: 'Çorba / Başlangıç', ana: 'Ana Yemek', yan: 'Yan Lezzet', kahvalti: 'Kahvaltılık', tatli: 'Tatlı', icecek: 'İçecek'};
  const kapOf = t => Object.keys(KAP).find(k => KAP[k].includes(t.kategori)) || '';

  // =====================================================================================================
  // N1 · N2 — Ne Pişirsem
  // =====================================================================================================
  const ADIMLAR = [
    {kod: 'ogun', baslik: 'Ne pişirmek istiyorsun?', etiket: 'Öğün / Kap', not: 'Bir öğün/kap türü seç — buna uygun tarifleri eşleştirelim.', secenek: [['baslangic', 'Çorba / Başlangıç', 'Sıcacık bir giriş', 'mug-hot'], ['ana', 'Ana Yemek', 'Sofranın yıldızı', 'drumstick-bite'], ['yan', 'Yan Lezzet', 'Salata, meze, garnitür', 'leaf'], ['kahvalti', 'Kahvaltılık', 'Güne güzel başla', 'egg'], ['tatli', 'Tatlı', 'Tatlı bir kapanış', 'ice-cream'], ['icecek', 'İçecek', 'Yanına bir şeyler', 'mug-saucer']]},
    {kod: 'sure', baslik: 'Ne kadar vaktin var?', etiket: 'Süre', secenek: [['15', '15 dakika', 'Çok acelem var', 'bolt'], ['30', '30 dakika', 'Pratik olsun', 'clock'], ['60', '1 saate kadar', 'Vaktim var', 'hourglass-half'], ['999', 'Fark etmez', 'Acelem yok', 'infinity']]},
    {kod: 'zorluk', baslik: 'Hangi zorlukta olsun?', etiket: 'Zorluk', secenek: [['cokkolay', 'Çok kolay', 'Yeni başlıyorum', 'face-smile'], ['kolay', 'Kolay', 'İdare ederim', 'thumbs-up'], ['orta', 'Orta', 'Biraz uğraşırım', 'gauge-simple'], ['farketmez', 'Fark etmez', 'Her şeye varım', 'shuffle']]},
    {kod: 'damak', baslik: 'Canın ne çekiyor?', etiket: 'Damak', not: 'Birden fazla seçebilirsin — istersen boş bırak, hepsini tarayalım.', coklu: true, secenek: [['hafif', 'Hafif & Sağlıklı', '', 'feather'], ['doyurucu', 'Doyurucu', '', 'bowl-rice'], ['pratik', 'Pratik', '', 'bolt'], ['etsiz', 'Etsiz', '', 'seedling'], ['kacamak', 'Tatlı kaçamak', '', 'cookie-bite'], ['gelenek', 'Geleneksel', '', 'wheat-awn']]}
  ];
  const OTO_ILERLE = 220; // canlı: 1–3. adımda tek seçimden 220 ms sonra
  const ZORLUK = ['Çok Kolay', 'Kolay', 'Orta', 'Zor', 'Ustalık Gerektirir'];
  const SEC_ZORLUK = {cokkolay: 0, kolay: 1, orta: 2};
  // Damak tercihleri yalnız tarifte gerçekten olan alanlardan: etiketler, kategori, süre, malzemeler.
  const DAMAK = {
    hafif: t => etiket(t, 'Az Yağlı', 'Düşük Kalorili', 'Düşük Karbonhidratlı', 'Kalp Dostu', 'Diyabete Uygun'),
    doyurucu: t => ['Bakliyat', 'Kırmızı Et', 'Tavuk ve Hindi', 'Pilav', 'Dolma ve Sarma', 'Makarna', 'Köfte ve Kebap', 'Mantı ve Dolgulu Hamurlar'].includes(t.kategori),
    pratik: t => t.dakika <= 30 || t.zorluk === 'Çok Kolay',
    etsiz: t => !etli(t),
    kacamak: t => KAP.tatli.includes(t.kategori),
    gelenek: t => etiket(t, 'Türk Mutfağı')
  };
  // Puan: öğün türü şart (tutmazsa tarif elenir); süre 30, zorluk 30, öğün 40, her damak tercihi 10 puan. Uygunluk = alınan / olası.
  function puanla(t, s) {
    if (s.ogun && !KAP[s.ogun].includes(t.kategori)) return null;
    let al = 0, top = 0;
    if (s.ogun) { al += 40; top += 40; }
    if (s.sure && s.sure !== '999') { const l = Number(s.sure); top += 30; al += t.dakika <= l ? 30 : t.dakika <= l * 1.5 ? 15 : 0; }
    if (s.zorluk && s.zorluk !== 'farketmez') { const r = ZORLUK.indexOf(t.zorluk), h = SEC_ZORLUK[s.zorluk]; top += 30; al += r <= h ? 30 : r === h + 1 ? 15 : 0; }
    for (const d of s.damak || []) { top += 10; if (DAMAK[d]?.(t)) al += 10; }
    return top ? Math.round(al / top * 100) : 100;
  }
  const eslesenler = s => T.map(t => ({t, p: puanla(t, s)})).filter(x => x.p != null && x.p >= 50).sort((a, b) => b.p - a.p || a.t.dakika - b.t.dakika).slice(0, 30);
  const secimAdi = (kod, d) => ADIMLAR.find(a => a.kod === kod)?.secenek.find(o => o[0] === d);

  DG.sayfa('ne-pisirsem', ctx => {
    const sekme = ctx.qs.get('sekme') === 'mod' ? 'mod' : 'ara';
    const dt = V.istatistik.find(x => x.label === 'Denenmiş tarif')?.value;
    const ust = `<div class="dgu-ic dgu-yigin-12"><h1 class="t-section">Bugün ne pişireceğine birlikte karar verelim</h1><p>İstersen tek tek seçerek sana uygun tarifi bul, istersen bir yemek modu seçip hazır menüye göz at ya da sıfırdan kendi menünü kur.</p><p class="dgu-sayaclar bul-sayaclar">${dt ? `<span><b>${esc(dt)}</b> Denenmiş tarif</span>` : ''}<span><b>${(window.DGMOD || []).length}</b> Yemek modu</span></p>${seg('Ne Pişirsem', [['ara', 'Tarif Ara'], ['mod', 'Yemek Modu']], sekme)}</div>`;
    return {tur: 'alt', baslik: 'Ne Pişirsem?', nav: 'find', menuAktif: 'ask', iskelet: DG.iskelet(4), ustIcerik: ust,
      html: `${ust}<div data-np-govde></div>`,
      sonra(root) {
        const govde = root.querySelector('[data-np-govde]');
        if (!govde) return; // kabuk hali (yükleniyor, hata): içerik yerine iskelet/hata çizildi
        root.querySelector('.dgu-seg').addEventListener('click', e => {
          const b = e.target.closest('[data-seg]'); if (!b) return;
          const u = new URL(location.href); ['sekme', 'adim', 'alt', 'mod'].forEach(k => u.searchParams.delete(k));
          if (b.dataset.seg === 'mod') u.searchParams.set('sekme', 'mod');
          location.href = u.href;
        });
        if (sekme === 'mod') yemekModu(govde); else sihirbaz(govde, ctx);
      }};
  });

  // ---------- Sihirbaz ----------
  // Revize D8: 1–3. adım ortak ortalı ikonlu seçim kartı (DG.secimKart + .dgu-secim-izgara.is-orta, tekli radyo); 4. adım (çoklu) yatay kalır.
  function sihirbaz(govde, ctx) {
    const s = ss.get('nepisirsem', {ogun: '', sure: '', zorluk: '', damak: []});
    const adimAl = () => { const a = new URLSearchParams(location.search).get('adim'); return a === 'sonuc' ? 'sonuc' : Math.min(4, Math.max(1, Number(a) || 1)); };
    const git = (a, push = true) => {
      const u = new URL(location.href); u.searchParams.set('adim', a); u.searchParams.delete('durum');
      history[push ? 'pushState' : 'replaceState'](null, '', u); ciz(true);
    };
    let zaman;
    function ciz(odak) {
      clearTimeout(zaman);
      const a = adimAl();
      govde.innerHTML = a === 'sonuc' ? sonuc() : adim(a);
      if (odak) { govde.querySelector('[data-odak]')?.focus({preventScroll: true}); scrollTo({top: 0}); }
    }
    function adim(n) {
      const A = ADIMLAR[n - 1], deger = s[A.kod], secili = o => A.coklu ? deger.includes(o) : deger === o;
      const hazir = A.coklu || Boolean(deger);
      return `<section class="dgu-ic dgu-yigin bul-sihirbaz" aria-labelledby="np-baslik">
        <div class="dgu-yigin-8"><div class="dgu-adim" aria-hidden="true">${ADIMLAR.map((_, i) => `<i class="${i < n ? 'is-on' : ''}"></i>`).join('')}</div><p class="t-label c-muted">Adım ${n} / ${ADIMLAR.length} · ${esc(A.etiket)}</p></div>
        <div>${bas(A.baslik, '', 'id="np-baslik" tabindex="-1" data-odak')}${A.not ? `<p class="dgu-yardim">${esc(A.not)}</p>` : ''}</div>
        ${A.coklu
          ? `<div class="bul-secenekler" role="group" aria-labelledby="np-baslik">${A.secenek.map(([d, ad, , ikon]) => `<button class="bul-secenek is-kisa" type="button" data-np-sec="${esc(d)}" aria-pressed="${secili(d)}"><span class="dgu-eylem-ikon">${ic(ikon)}</span><span class="bul-secenek-metin"><b>${esc(ad)}</b></span><span class="bul-secenek-isaret">${ic(I('check'))}</span></button>`).join('')}</div>`
          : `<div class="dgu-secim-izgara is-orta" role="radiogroup" aria-labelledby="np-baslik">${A.secenek.map(([d, ad, alt, ikon]) => DG.secimKart({grup: 'np', k: d, ad, alt, ikon, secili: secili(d), tek: true})).join('')}</div>`}
        <p class="dgu-yardim">Seçimlerine göre tarifleri puanlayıp sıralarız.</p>
      </section><div class="bul-cta dgu-ikili">${btn('Geri', {tur: 'ikincil', ikon: I('back'), attrs: `data-np-geri ${n === 1 ? 'disabled' : ''}`})}${btn('Devam', {attrs: `data-np-devam ${hazir ? '' : 'disabled'}`})}</div>`;
    }
    function sonuc() {
      const bos = ctx.durum === 'bos';
      const L = bos ? [] : eslesenler(s);
      const cipler = [['ogun', s.ogun], ['sure', s.sure], ['zorluk', s.zorluk], ...s.damak.map(d => ['damak', d])].map(([k, d]) => secimAdi(k, d)).filter(Boolean)
        .map(([, ad, , ikon]) => `<span class="dgu-chip is-on">${ic(ikon)}${esc(ad)}</span>`).join('');
      const ust = `<div class="dgu-serit" aria-label="Seçimlerin"><button class="dgu-chip" type="button" data-np-duzenle>${ic('pen')}Seçimleri Düzenle</button>${cipler}</div>`;
      if (!L.length) return `<section class="dgu-ic dgu-yigin bul-sihirbaz">${ust}${durum({ikon: I('search'), baslik: 'Bu seçimlere uygun tarif bulamadık', metin: 'Filtreni biraz gevşet — süreyi uzat ya da zorluğu "Fark etmez" yap.', eylem: btn('Baştan dene', {ikon: 'rotate-left', attrs: 'data-np-bastan'})})}</section>`;
      return `<section class="dgu-ic dgu-yigin bul-sihirbaz">
        <div>${bas(`${DG.sayi(L.length)} tarif sana uygun`, '', 'tabindex="-1" data-odak')}<p class="dgu-yardim">Eşleşme oranına göre sıralandı.</p></div>${ust}
        <div class="dgu-izgara">${L.map(({t, p}) => kartEk(t, 'card', `<span class="bul-uyum">${ic(I('inPantry'))}%${p} uygun</span>`)).join('')}</div>
      </section>`;
    }
    govde.addEventListener('click', e => {
      const o = e.target.closest('[data-np-sec],[data-grup=np]');
      if (o) {
        const n = adimAl(), A = ADIMLAR[n - 1], d = o.dataset.npSec || o.dataset.k;
        if (A.coklu) { s.damak = s.damak.includes(d) ? s.damak.filter(x => x !== d) : [...s.damak, d]; o.setAttribute('aria-pressed', s.damak.includes(d)); ss.set('nepisirsem', s); return; }
        s[A.kod] = d; ss.set('nepisirsem', s);
        govde.querySelectorAll('[data-grup=np]').forEach(b => b.setAttribute('aria-checked', b.dataset.k === d));
        govde.querySelector('[data-np-devam]').disabled = false;
        clearTimeout(zaman); zaman = setTimeout(() => git(n + 1), motion.matches ? 0 : OTO_ILERLE);
        return;
      }
      if (e.target.closest('[data-np-geri]')) { const n = adimAl(); if (n > 1) git(n - 1); return; }
      if (e.target.closest('[data-np-devam]')) { const n = adimAl(); git(n === 4 ? 'sonuc' : n + 1); return; }
      if (e.target.closest('[data-np-duzenle]')) { git(1); return; }
      if (e.target.closest('[data-np-bastan]')) { Object.assign(s, {ogun: '', sure: '', zorluk: '', damak: []}); ss.set('nepisirsem', s); git(1); }
    });
    // Galeri/derin bağlantı: sonuç doğrudan açılırsa ve seçim yoksa canlıdaki ilk seçenekler örnek seçimdir (ekranda çip olarak görünür).
    if (adimAl() === 'sonuc' && !s.ogun) Object.assign(s, {ogun: 'ana', sure: '60', zorluk: 'farketmez'});
    addEventListener('popstate', () => ciz(true));
    ciz(false);
  }

  // ---------- Yemek Modu: Sıfırdan Kur · Hazır Menüler ----------
  // Canlı “Hazır Menüler” (dadagastro.com/bugun-ne-pisirsem, 12 Ekim 2026, GET): mod → [ad, açıklama, tarif sayısı, ~dk, etiket, görsel no].
  // Görseller canlı medya küçük resmidir (/varliklar/media/<no>/thumb.webp).
  const HAZIR = {"gunluk-pratik":[["Akşam Telaşına Yetişen Sofra","İşten eve dönüşte yarım saatte masaya gelen, yorulmadan hazırlanan günlük sofra.",4,280,"Bakliyat",[1296,1297,1302,1866]],["Kısa Süreli Ev Yemeği Seçkisi","Az malzemeyle, uzun uğraşsız; her gün tekrar edilebilecek pratik ev yemekleri.",6,210,"Sebze",[1303,1304,1305,1464]],["Ocak Başında On Beş Dakika","Ocağı uzun süre meşgul etmeden, gündelik telaşa uyan hafif sofra.",7,340,"Çorba",[1306,1307,1308,1485]],["Ev Sofrasının Değişmezi","Her gün tekrarlanabilecek, sade ama doyurucu günlük ev yemeği.",6,221,"Sandviç, Burger ve Dürüm",[1310,1320,1322,2499]]],"hizli-ve-kolay":[["Yirmi Dakikalık Sofra","Ocaktan sofraya yirmi dakikada gelen, uğraştırmayan garantili tarifler.",3,85,"Kahvaltılık",[1331,1341,1342]],["Tek Adımda Hazır Menü","Karmaşık hazırlığa gerek bırakmayan, tek seferde pişen kolay tarifler.",6,111,"Kahvaltılık",[1343,1344,1346,2546]],["Acil Karnım Aç Menüsü","Ani açlıkta imdada yetişen, malzemesi elde hazır pratik seçkiler.",5,89,"Kahvaltılık",[1347,1349,1361,1942]],["Uğraşsız Akşam Menüsü","Karmaşık adımlara girmeden, birkaç hareketle sofraya gelen tarifler.",6,135,"İçecek",[1363,1368,1369,2532]]],"misafir-sofrasi":[["Ani Misafir Kurtarıcısı","Habersiz gelen misafire dakikalar içinde şık bir sofra kurmanı sağlar.",7,452,"Dolma ve Sarma",[1292,1301,1302,1370]],["Kapıda Misafir Menüsü","Zili çaldığında hazırlıksız yakalanmaman için pratik ama gösterişli tarifler.",7,550,"Dolma ve Sarma",[1304,1312,1313,2058]],["Sohbet Sofrası Seçkisi","Uzun sohbetlere eşlik eden, paylaşılası ikramların bir araya geldiği menü.",6,369,"Hamur İşi",[1314,1315,1316,2239]],["Şık Ağırlama Menüsü","Misafirini gönlünce ağırlarken zahmete girmeden hazırlayabileceğin tarifler.",3,180,"Hamur İşi",[1317,1318,1321]],["Hafta Sonu Konuk Sofrası","Hafta sonu ziyaretlerine yakışan, sunumu iddialı bir seçki.",6,568,"Tatlı",[1322,1325,1326,1336]],["Zarif Ağırlama Menüsü","Görünüşü şık, hazırlaması kolay; misafiri etkileyen zarif tarifler.",5,270,"Dondurma ve Soğuk Tatlılar",[1327,1328,1330,2085]]],"kalabalik-sofralar":[["Cömert Paylaşım Sofrası","Kalabalık bir masayı doyurmak için bol porsiyonlu, paylaşmalık tarifler.",5,307,"Kahvaltılık",[1321,1359,1395,1645]],["Büyük Aile Buluşması Menüsü","Aile büyüdükçe sofra da büyüsün diye hazırlanmış geniş porsiyonlu seçki.",4,330,"Tavuk ve Hindi",[1484,1487,1491,1511]],["Toplu Davet Sofrası","Çok kişilik davetlerde herkese yetecek, doyurucu ve pratik tarifler.",3,240,"Dolma ve Sarma",[1509,1511,1513]],["Bayram Sofrası Klasikleri","Kalabalık bayram sofralarına yakışan geleneksel ve doyurucu tarifler.",3,205,"Sebze",[1516,1517,1519]],["Ortak Kazan Menüsü","Büyük tencerede pişip herkese yeten, dostlukla paylaşılan tarifler.",7,460,"Mantı ve Dolgulu Hamurlar",[1528,1534,1540,1541]],["Uzun Masa Menüsü","Uzayan masalarda herkese yetecek, bol porsiyonlu paylaşmalık tarifler.",7,605,"Dolma ve Sarma",[1541,1543,1545,2030]]],"tek-tencere":[["Tek Kapta Kolay Akşam","Tek tencerede pişen, bulaşık derdi olmayan pratik akşam yemekleri.",6,385,"Bakliyat",[1294,1295,1297,2772]],["Az Bulaşıklı Sofra","Tek kapta hazırlanıp az bulaşıkla temizlenen doyurucu tarifler.",6,425,"Bakliyat",[1303,1305,1306,1282]],["Kaynayan Tencere Menüsü","Malzemeleri tek tencerede buluşturan, kendi kendine pişen lezzetler.",6,380,"Kırmızı Et",[1307,1308,1324,1682]],["Ocak Başı Pratikliği","Ocaktan kalkmadan hazırlanan, tek kapta tamamlanan sofralık tarifler.",6,290,"Balık ve Deniz Ürünleri",[1442,1446,1484,1719]],["Hafif İşli Akşam Yemeği","Az uğraşla tek tencerede pişen, tadı ağır basan pratik tarifler.",3,335,"Sakatat",[1492,1494,1495]]],"firin-yemekleri":[["Fırından Sofraya Menü","Fırına verip beklerken diğer işlerine yetişebileceğin kendiliğinden pişen tarifler.",7,605,"Tatlı",[1288,1308,1309,1886]],["Üzeri Kızarmış Sofra","Fırında altın rengini alana dek pişen, göz alıcı fırın tarifleri.",3,330,"Hamur İşi",[1311,1312,1313]],["Tek Tepside Akşam Yemeği","Malzemeleri tek tepsiye dizip fırına verdiğin, az uğraşlı doyurucu menü.",4,297,"Hamur İşi",[1314,1317,1319,2386]],["Kendi Kendine Pişen Menü","Fırına verip unutabileceğin, kendi kendine pişen rahat tarifler.",5,260,"Tatlı",[1321,1325,1326,2359]],["Davetlik Fırın Seçkisi","Sunumu şık, fırında pişen; misafir sofrasına da yakışan tarifler.",3,170,"Tatlı",[1327,1329,1330]]],"tava-yemekleri":[["Ocak Üstü Hızlı Menü","Tek tavada kısa sürede pişen, ocak başında fazla oyalanmadan hazırlanan tarifler.",4,182,"Ekmek",[1310,1318,1341,2866]],["Kızgın Tava Sofrası","Kızgın tavada hızla pişen, dışı çıtır içi yumuşak tarifler.",7,192,"Kahvaltılık",[1342,1343,1344,2877]],["On Beş Dakikalık Tava Menüsü","Tavayı ısıtır ısıtmaz başlayıp kısa sürede sofraya gelen tarifler.",6,138,"Kahvaltılık",[1345,1348,1349,2790]],["Tek Tavada Doyuran Yemek","Ayrı tencere kirletmeden, tek tavada tamamlanan doyurucu tarifler.",7,260,"Kahvaltılık",[1350,1352,1353,1445]],["Akşamüstü Tava Keyfi","İşten dönüşte hızla hazırlanan, tavada pişen sıcak sofralık.",4,83,"Kahvaltılık",[1361,1362,1363,1850]],["Sahanda Sofra Seçkisi","Sahanda ya da tavada, kısa sürede sofraya gelen klasik lezzetler.",4,115,"Kahvaltılık",[1364,1382,1388,2027]]],"airfryer-tarifleri":[["Az Yağlı Çıtır Menü","Airfryer'da az yağla çıtırlaşan, hafif ama doyurucu tarifler.",5,215,"Atıştırmalık",[1923,2586,1413,1418]],["Hızlı Airfryer Sofrası","Fritözü ısıtır ısıtmaz kısa sürede pişen pratik tarifler.",4,175,"Atıştırmalık",[1418,1733,1923,2586]],["Hafif Atıştırmalık Menü","Airfryer'da yağ derdi olmadan hazırlanan hafif atıştırmalıklar.",4,175,"Atıştırmalık",[2586,1413,1418,1923]],["Kalori Dostu Çıtır Seçki","Az yağla, fazla kaloriden kaçınarak çıtırlık arayanlara menü.",3,135,"Atıştırmalık",[1733,1923,2586]],["Pratik Fritöz Menüsü","Airfryer'ın hızından faydalanan, bekletmeden sofraya gelen tarifler.",5,215,"Atıştırmalık",[1413,1418,1733,2586]],["Tek Sepette Akşam Yemeği","Airfryer sepetine dizip beklerken diğer işlerine bakabileceğin tarifler.",4,175,"Atıştırmalık",[1923,2586,1413,1418]]],"duduklu-tencere":[["Hızlı Yumuşayan Menü","Düdüklü tencerede kısa sürede yumuşayan, zamandan kazandıran tarifler.",4,252,"Bakliyat",[2722,1507,1802,2587]],["Zamana Karşı Sofra","Düdüklünün hızından yararlanıp dakikalar içinde sofraya gelen yemekler.",4,252,"Tavuk ve Hindi",[2587,2722,1507,1802]],["Kestirmeden Pişen Menü","Uzun pişme süresini düdüklüyle kısaltan pratik ve doyurucu tarifler.",3,142,"Pilav",[1802,2587,2722]]],"izgara-ve-barbeku":[["Mangal Keyfi Menüsü","Mangalın dumanlı lezzetiyle hazırlanan, açık havaya yakışan tarifler.",7,291,"Köfte ve Kebap",[1388,1389,1392,2215]],["Izgara Akşamı Seçkisi","Izgarada pişirilen, kömür kokusu sinmiş doyurucu tarifler.",6,217,"Sos",[1395,1430,1440,2565]],["Bahçe Daveti Barbekü Menüsü","Bahçe toplantılarına yakışan, ızgarada paylaşılan lezzetler.",3,85,"Meze",[1455,1458,1459]]],"pismeyen-tarifler":[["Ocak Yakmadan Sofra","Ocak açmadan, hızlıca hazırlanan serinletici tarifler.",7,435,"Bebek Tarifleri",[1300,1337,1368,1937]],["Sıcak Günlerin Menüsü","Mutfağı ısıtmadan, pişirmeden hazırlanan ferahlatıcı tarifler.",4,295,"İçecek",[1369,1370,1371,1337]],["Hazırla Buzdolabına At Menüsü","Pişirmeden hazırlayıp soğutarak servis edilen pratik tarifler.",4,122,"İçecek",[1372,1373,1374,1470]],["Beş Dakikada Sofra","Pişirme derdi olmadan birkaç adımda hazırlanan hızlı tarifler.",3,35,"İçecek",[1375,1376,1377]]],"ekonomik-tarifler":[["Bütçe Dostu Sofra","Uygun malzemelerle hazırlanan, cebini yormayan doyurucu tarifler.",7,424,"Turşu ve Konserve",[1294,1295,1296,1424]],["Hesaplı Akşam Yemeği","Az malzemeyle bütçeyi zorlamadan hazırlanan pratik tarifler.",7,340,"Bakliyat",[1297,1298,1299,2695]],["Kısıtlı Bütçe Menüsü","Ekonomik malzemelerle sofraya lezzet katan tarifler.",7,333,"Bakliyat",[1300,1305,1306,1340]],["Cüzdan Dostu Seçki","Pahalı malzemelere gerek kalmadan hazırlanan doyurucu tarifler.",6,605,"Ekmek",[1309,1310,1311,2393]]],"az-malzemeli-tarifler":[["Üç Malzemeli Sofra","Sayılı malzemeyle, sade ama lezzetli hazırlanan pratik tarifler.",3,48,"Kahvaltılık",[1346,1347,1348]],["Dolapta Ne Varsa Menüsü","Evde bulunan birkaç malzemeyle hazırlanan sade tarifler.",6,216,"Atıştırmalık",[1350,1353,1356,2233]],["Sade Mutfak Seçkisi","Az malzemeyle mutfağı yormadan hazırlanan doyurucu tarifler.",6,285,"Atıştırmalık",[1357,1358,1362,2342]],["Minimal Malzeme Menüsü","Uzun alışveriş listesi gerektirmeyen, sade tarifler.",3,95,"Atıştırmalık",[1363,1364,1366]],["Tek Rafın Yettiği Sofra","Kilerdeki birkaç malzemeyle tamamlanan pratik yemekler.",7,235,"Çorba",[1397,1403,1404,2833]],["Kısa Liste Sofrası","Alışveriş listesini uzatmayan, birkaç kalemle tamamlanan tarifler.",3,86,"Bebek Tarifleri",[1405,1406,1407]]],"onceden-hazirlananlar":[["Önceden Hazırla Rahat Ol Menüsü","Vaktin olduğunda hazırlayıp saklayabileceğin, ihtiyaç anında hazır tarifler.",7,648,"Turşu ve Konserve",[1296,1301,1302,2615]],["Hafta Sonu Hazırlık Sofrası","Hafta sonu ayırdığın vakitle hazırlayıp hafta içi tükettiğin tarifler.",5,415,"Zeytinyağlılar",[1303,1304,1309,2711]],["Buzdolabında Bekleyen Menü","Önceden pişirilip buzdolabında bekleyen, ısıtınca hazır sofralık.",6,320,"Hamur İşi",[1315,1316,1319,2572]],["Zaman Kazandıran Sofra","Yoğun günler için önceden hazırlanmış, vakit kazandıran tarifler.",5,255,"Kurabiye",[1328,1330,1332,2267]],["Misafir Öncesi Hazırlık Menüsü","Davet öncesi hazırlayıp saklayabileceğin, günü rahat geçirten tarifler.",5,955,"Dondurma ve Soğuk Tatlılar",[1333,1335,1336,2127]],["Toplu Hazırlık Seçkisi","Bir seferde çok porsiyon hazırlayıp gün boyu tükettiğin tarifler.",7,807,"Reçel",[1337,1338,1339,1526]]],"dondurucuya-uygun":[["Dondur Sakla Menüsü","Dondurup saklamaya uygun, ihtiyaç anında imdada yetişen tarifler.",3,45,"Dondurma ve Soğuk Tatlılar",[1386,1398,1399]],["Buzluk Stoku Seçkisi","Toplu hazırlayıp dondurarak sakladığın, aylarca dayanan tarifler.",6,825,"Hamur İşi",[1402,1537,1538,1618]],["Acil Durum Menüsü","Buzluktan çıkarıp kısa sürede sofraya getirdiğin pratik tarifler.",5,720,"Bakliyat",[1544,1561,1618,1957]],["Uzun Ömürlü Sofra","Dondurulunca lezzetinden ödün vermeyen, uzun süre saklanabilen tarifler.",7,883,"Bakliyat",[1853,1893,1957,1561]]],"artan-yemekleri-degerlendirme":[["Artanı Değerlendirme Menüsü","Buzdolabında kalan artıkları israf etmeden yeniden lezzete dönüştüren tarifler.",4,185,"Yumurta Tarifleri",[2490,2668,2675,1664]],["İkinci Gün Sofrası","Dünden kalanları yeni bir yemeğe dönüştüren pratik tarifler.",5,240,"Yumurta Tarifleri",[2680,1664,1907,2675]],["Dolap Temizliği Menüsü","Buzdolabındaki dağınık malzemeleri bir araya getiren tarifler.",6,340,"Sandviç, Burger ve Dürüm",[2476,2490,2668,2680]],["Yeniden Doğan Yemek Seçkisi","Artan malzemeleri farklı bir sunumla sofraya geri getiren tarifler.",7,365,"Yumurta Tarifleri",[2675,2680,1664,1907]]],"piknik-ve-acik-hava":[["Sepete Sığan Menü","Taşıması kolay, açık havada paylaşması keyifli piknik tarifleri.",4,235,"Bakliyat",[1300,1319,1332,2213]],["Açık Hava Sofrası","Battaniyenin üzerine serilen, paylaşımlı piknik tarifleri.",4,152,"Kahvaltılık",[1352,1354,1355,2082]],["Yolculuk Azığı Seçkisi","Uzun yolculuklarda yanına alabileceğin pratik piknik tarifleri.",4,145,"Atıştırmalık",[1357,1359,1360,2323]]],"parti-ve-kutlama":[["Kutlama Sofrası Seçkisi","Özel kutlamalara yakışan, göz dolduran paylaşmalık tarifler.",4,165,"Atıştırmalık",[1318,1325,1354,2379]],["Doğum Günü Partisi Menüsü","Parti sofralarını renklendiren, eğlenceli sunumlu tarifler.",4,169,"Meze",[1447,1452,1457,2656]],["Şenlikli Sofra Menüsü","Kutlama havasını sofraya taşıyan, renkli ve paylaşmalık tarifler.",5,180,"Meze",[1468,1483,1489,1766]]],"cocuklarin-sevecegi-tarifler":[["Küçüklerin Sofrası","Çocukların severek yiyeceği, eğlenceli sunumlu tarifler.",5,270,"Dondurma ve Soğuk Tatlılar",[1319,1321,1328,2098]],["Okul Çıkışı Menüsü","Okuldan gelen çocuğa hızlıca hazırlayabileceğin sevilen tarifler.",7,365,"Çocuk Tarifleri",[1329,1333,1336,1998]],["Renkli Tabak Seçkisi","Görünüşüyle çocuğun ilgisini çeken, besleyici tarifler.",4,110,"Kahvaltılık",[1349,1351,1355,1620]],["Eğlenceli Atıştırmalık Menüsü","Çocukların oyun arasında keyifle yiyeceği pratik tarifler.",7,405,"Atıştırmalık",[1360,1365,1367,1314]],["Sevilen Lezzetler Sofrası","Çocukların vazgeçilmezi olan, kolay hazırlanan tarifler.",3,160,"Meyve Tarifleri",[1378,1386,1387]],["Beslenme Çantası İlhamı","Okula giden çocuğun çantasına girebilecek pratik tarifler.",6,142,"Çocuk Tarifleri",[1388,1398,1399,2013]]],"ozel-gun-tarifleri":[["Özel Gün Sofrası","Özel günlere anlam katan, sofrayı şölene çeviren tarifler.",4,380,"Dolma ve Sarma",[1292,1327,1334,2229]],["Yıl Dönümü Menüsü","Anlamlı günleri kutlamaya yakışan zarif tarifler.",4,280,"İçecek",[1373,1384,1401,2054]],["Bayram Sofrası Seçkisi","Bayram sofralarına şıklık katan geleneksel ve özel tarifler.",3,235,"Tatlı",[1472,1481,1487]],["Kutlama Akşamı Menüsü","Özel bir akşamı unutulmaz kılan gösterişli tarifler.",7,1185,"Kırmızı Et",[1490,1491,1492,1582]],["Anma Günü Sofrası","Aile büyüklerinin anıldığı günlere yakışan zarif tarifler.",4,230,"Dolma ve Sarma",[1495,1499,1546,1903]],["Şölen Sofrası Seçkisi","Sofrayı bir şölene çeviren, özenle hazırlanmış tarifler.",7,520,"Kurabiye",[1549,1562,1568,2258]]]};
  // Hazır menü görselleri: canlı /varliklar/media/{no}/thumb.webp yerel kopyası (12 Ekim, GET) → assets/hazir-menu/{no}.webp
  const hmGorsel = n => `../assets/hazir-menu/${n}.webp`;
  // Canlı “Sıfırdan Kur” kap kategorileri (sıra + solid ikon birebir).
  const MOD_KAT = [['Sebze', 'carrot'], ['Çorba', 'bowl-food'], ['Kahvaltılık', 'egg'], ['Bakliyat', 'seedling'], ['Pilav', 'bowl-rice'], ['Zeytinyağlılar', 'bottle-droplet'], ['Kırmızı Et', 'cow'], ['Makarna', 'plate-wheat'], ['Ekmek', 'wheat-awn'], ['Meze', 'shrimp'], ['Salata', 'leaf'], ['Balık ve Deniz Ürünleri', 'fish'], ['İçecek', 'mug-hot'], ['Yumurta Tarifleri', 'egg'], ['Sos', 'mortar-pestle'], ['Tavuk ve Hindi', 'drumstick-bite'], ['Kek ve Pasta', 'stroopwafel'], ['Meyve Tarifleri', 'apple-whole'], ['Bebek Tarifleri', 'baby'], ['Köfte ve Kebap', 'fire-flame-curved'], ['Hamur İşi', 'bread-slice'], ['Sandviç, Burger ve Dürüm', 'burger'], ['Tatlı', 'ice-cream'], ['Atıştırmalık', 'cheese'], ['Sakatat', 'utensils'], ['Çocuk Tarifleri', 'child'], ['Dolma ve Sarma', 'pepper-hot'], ['Mantı ve Dolgulu Hamurlar', 'plate-wheat'], ['Pizza ve Pide', 'pizza-slice'], ['Dondurma ve Soğuk Tatlılar', 'snowflake']];
  function yemekModu(govde) {
    const MODLAR = window.DGMOD || [], SAYI = Object.fromEntries((V.facetler.find(f => f.key === 'yemek_modu')?.options || []).map(o => [o.value, o.count]));
    const qs = new URLSearchParams(location.search);
    let mod = MODLAR.find(m => m.slug === qs.get('mod')) || MODLAR[0], alt = qs.get('alt') === 'hazir' ? 'hazir' : 'sifir', kategori = '', sayfa = 1;
    const SAYFA = 24;
    const tepsi = () => store.get('menu-tepsi', []).filter(s => DG.tarif(s));
    const adresYaz = () => { const u = new URL(location.href); u.searchParams.set('sekme', 'mod'); mod === MODLAR[0] ? u.searchParams.delete('mod') : u.searchParams.set('mod', mod.slug); alt === 'hazir' ? u.searchParams.set('alt', 'hazir') : u.searchParams.delete('alt'); history.replaceState(null, '', u); };
    const havuzBtn = t => { const ic2 = tepsi().includes(t.slug); return `<button class="dgu-btn dgu-btn--sm ${ic2 ? 'dgu-btn--tonlu' : 'dgu-btn--ikincil'} bul-ekle" type="button" data-mod-ekle="${esc(t.slug)}" aria-pressed="${ic2}">${ic(ic2 ? I('check') : I('add'))}<span>${ic2 ? 'Menüde' : 'Menüye Ekle'}</span></button>`; };
    const havuz = () => { const L = T.filter(t => !kategori || t.kategori === kategori); return `${L.length ? `<div class="dgu-yigin">${L.slice(0, sayfa * SAYFA).map(t => kartEk(t, 'row', '', havuzBtn(t))).join('')}</div>` : durum({ikon: I('search'), baslik: 'Bu seçimde tarif bulunamadı.'})}${L.length > sayfa * SAYFA ? `<div data-mt>${btn('Daha fazla göster', {tur: 'ikincil', tam: true, attrs: 'data-mod-daha'})}</div>` : ''}`; };
    const menuler = () => HAZIR[mod.slug] || [];
    const hmKart = ([ad, aciklama, n, dk, etiket, g]) => `<article class="dgu-kart bul-hm"><div class="u-ara bul-hm-bas"><h3 class="t-sub">${esc(ad)}</h3><span class="dgu-rozet is-notr">${n} tarif</span></div><p class="bul-hm-aciklama">${esc(aciklama)}</p>
      <div class="bul-hm-gorseller" aria-hidden="true">${g.map(x => `<span class="bul-hm-gorsel" style="background-image:url('${hmGorsel(x)}')"></span>`).join('')}</div>
      <div class="u-ara"><p class="bul-hm-meta"><span>${ic(I('time'))}~${dk} dk</span>${etiket ? `<span>${ic('tag')}${esc(etiket)}</span>` : ''}</p><button class="dgu-btn dgu-btn--tonlu dgu-btn--sm" type="button" data-hm-ac aria-label="${esc(ad)} menüsünü aç"><span>Menüyü Aç</span>${ic('arrow-right')}</button></div></article>`;
    govde.innerHTML = `<section class="dgu-ic dgu-yigin bul-sihirbaz">
      <div class="bul-mod-kap">${DG.modSerit(MODLAR, mod.slug)}<p class="dgu-mod-ipucu">${ic('arrows-left-right')}<span>${MODLAR.length} yemek modu — kaydırarak hepsini gör</span></p>${DG.modAciklama(mod)}</div>
      <div data-mod-seg></div>
      <div data-mod-alt></div>
    </section><div class="bul-tepsi" data-mod-tepsi></div>`;
    const altEl = govde.querySelector('[data-mod-alt]'), segEl = govde.querySelector('[data-mod-seg]'), tepsiEl = govde.querySelector('[data-mod-tepsi]');
    function altCiz() {
      segEl.innerHTML = seg('Yemek modu içeriği', [['sifir', 'Sıfırdan Kur'], ['hazir', 'Hazır Menüler', menuler().length]], alt);
      tepsiEl.hidden = alt === 'hazir';
      if (alt === 'hazir') {
        const L = menuler();
        altEl.innerHTML = L.length ? `<div class="dgu-yigin"><div>${bas(mod.ad, `<span class="dgu-yardim">${L.length} menü</span>`)}</div>${L.map(hmKart).join('')}</div>`
          : durum({ikon: I('servings'), baslik: 'Hazır menüler yakında', metin: 'Sıfırdan Kur ile kendi menünü hemen kurabilirsin.', eylem: btn('Sıfırdan Kur', {attrs: 'data-alt-sifir'})});
        return;
      }
      altEl.innerHTML = `<div class="dgu-yigin"><div>${bas('Sıfırdan kendi menünü kur', SAYI[mod.slug] ? `<span class="dgu-yardim">${DG.sayi(SAYI[mod.slug])} tarif</span>` : '')}<p>Bu moda uygun tariflerden beğendiklerini menüne ekle — kendi sofranı sen kur.</p></div>
        <div class="dgu-serit" role="tablist" aria-label="Kap kategorisi">${[['Tümü', ''], ...MOD_KAT].map(([k, i]) => { const d = k === 'Tümü' ? '' : k; return `<button class="dgu-chip" type="button" role="tab" data-mod-kat="${esc(d)}" aria-selected="${d === kategori}" aria-pressed="${d === kategori}">${i ? ic(i) : ''}${esc(k)}</button>`; }).join('')}</div>
        <div data-mod-havuz>${havuz()}</div></div>`;
    }
    function tepsiCiz() {
      const n = tepsi().length;
      tepsiEl.innerHTML = `<button class="bul-tepsi-ac" type="button" data-mod-tepsi-ac aria-label="Menü tepsisini aç"><span class="dgu-eylem-ikon">${ic(I('servings'))}</span><span class="dgu-eylem-metin"><b>Menü Tepsisi</b><small>${n} tarif tepside</small></span>${ic('chevron-up')}</button>`;
      govde.querySelectorAll('[data-mod-ekle]').forEach(b => { b.outerHTML = havuzBtn(DG.tarif(b.dataset.modEkle)); });
    }
    function tepsiSheet() {
      const L = tepsi().map(DG.tarif);
      const d = DG.sheet({baslik: `Menü Tepsisi · ${L.length} tarif`, govde: `<div class="dgu-yigin">${L.length ? `<div class="dgu-satirlar">${L.map(t => `<div class="bul-tepsi-satir"><span class="dgu-medya bul-kucuk" style="${fotoStil(t)}" aria-hidden="true"></span><span class="dgu-satir-metin"><span class="clamp-2">${esc(t.kisa)}</span><small>${esc(t.kategori)} · ${t.dakika} dk</small></span><button class="dgu-ibtn" type="button" data-tepsi-cikar="${esc(t.slug)}" aria-label="${esc(t.kisa)} tepsiden çıkar">${ic(I('close'))}</button></div>`).join('')}</div>` : `<div class="bul-tepsi-bos">${ic(I('add'))}<p>Tariflerde <b>Menüye Ekle</b> dedikçe seçtiklerin burada birikir — menünü hep gör.</p></div>`}
        ${DG.alan({ad: 'menu-ad', etiket: 'Menü adı', yer: 'Menü adı', yardim: 'Bu menüyü defterinde bu adla bulacaksın.'})}</div>`,
        ayak: `<div class="dgu-ikili">${btn('Tepsiyi temizle', {tur: 'ikincil', attrs: `data-tepsi-temizle ${L.length ? '' : 'disabled'}`})}${btn('Menüyü Kur', {ikon: 'list-check', attrs: `data-tepsi-kur ${L.length ? '' : 'disabled'}`})}</div>`});
      d.querySelector('#f-menu-ad').maxLength = 48;
      d.addEventListener('click', async e => {
        const c = e.target.closest('[data-tepsi-cikar]');
        if (c) { store.set('menu-tepsi', tepsi().filter(x => x !== c.dataset.tepsiCikar)); c.closest('.bul-tepsi-satir').remove(); d.querySelector('.dgu-sheet-bas h2').textContent = `Menü Tepsisi · ${tepsi().length} tarif`; tepsiCiz(); if (!tepsi().length) d.kapat(); return; }
        if (e.target.closest('[data-tepsi-temizle]')) { if (await DG.onay({baslik: 'Tepsi temizlensin mi?', metin: 'Tepsideki bütün tarifler çıkarılacak.', evet: 'Temizle'})) { store.set('menu-tepsi', []); d.kapat(); tepsiCiz(); DG.bildir('Tepsi temizlendi'); } return; }
        if (e.target.closest('[data-tepsi-kur]')) {
          const ad = d.querySelector('#f-menu-ad').value.trim() || 'Menüm';
          const menu = {id: 'm' + Date.now().toString(36), ad, tarifler: tepsi(), mod: mod.ad, olusturma: Date.now()};
          store.set('menuler', [menu, ...store.get('menuler', [])]); store.set('menu-tepsi', []);
          d.kapat(); tepsiCiz();
          DG.bildir('Menün kuruldu', {eylem: {ad: 'Pişir', href: 'menuyu-pisir.html?menu=' + menu.id}});
        }
      });
    }
    govde.addEventListener('dg-mod', e => { mod = e.detail; kategori = ''; sayfa = 1; adresYaz(); altCiz(); });
    govde.addEventListener('click', e => {
      const sg = e.target.closest('[data-mod-seg] [data-seg]'); if (sg) { alt = sg.dataset.seg; adresYaz(); altCiz(); govde.querySelector(`[data-mod-seg] [data-seg="${alt}"]`)?.focus(); return; }
      if (e.target.closest('[data-alt-sifir]')) { alt = 'sifir'; adresYaz(); altCiz(); return; }
      const k = e.target.closest('[data-mod-kat]'); if (k) { kategori = k.dataset.modKat; sayfa = 1; govde.querySelectorAll('[data-mod-kat]').forEach(b => { b.setAttribute('aria-pressed', b === k); b.setAttribute('aria-selected', b === k); }); govde.querySelector('[data-mod-havuz]').innerHTML = havuz(); return; }
      if (e.target.closest('[data-mod-daha]')) { sayfa++; govde.querySelector('[data-mod-havuz]').innerHTML = havuz(); return; }
      if (e.target.closest('[data-hm-ac]')) { if (!DG.uye()) return DG.kapi('menuAc', 'devam'); DG.bildir('Yakında'); return; }
      const a = e.target.closest('[data-mod-ekle]');
      if (a) {
        if (!DG.uye()) return DG.kapi('menu', 'menu:' + a.dataset.modEkle); // B7: girişten dönüşte tarif tepsiye eklenmiş olur
        const s = a.dataset.modEkle, L = tepsi(), var_ = L.includes(s);
        store.set('menu-tepsi', var_ ? L.filter(x => x !== s) : [...L, s]); tepsiCiz();
        DG.bildir(var_ ? 'Tepsiden çıkarıldı' : 'Menü tepsisine eklendi'); return;
      }
      if (e.target.closest('[data-mod-tepsi-ac]')) { if (!DG.uye() && !tepsi().length) return DG.kapi('menu', 'devam'); tepsiSheet(); }
    });
    altCiz(); tepsiCiz();
    const serit = govde.querySelector('.dgu-mod-serit'), secili = serit?.querySelector('[aria-selected=true]');
    if (secili) serit.scrollLeft = secili.offsetLeft - serit.offsetLeft - (serit.clientWidth - secili.offsetWidth) / 2;
  }

  // =====================================================================================================
  // N4 — Menüyü Pişir (tam ekran: plan → adım → bitti)
  // =====================================================================================================
  const SERVIS = ['tatli', 'ana', 'baslangic', 'kahvalti', 'icecek', 'yan']; // canlı servis sırası
  const servisSira = L => [...L].sort((a, b) => ((SERVIS.indexOf(kapOf(a)) + 1) || 99) - ((SERVIS.indexOf(kapOf(b)) + 1) || 99));
  DG.sayfa('menuyu-pisir', ctx => {
    let menu = store.get('menuler', []).find(m => String(m.id) === ctx.qs.get('menu'));
    const ornek = !menu && ctx.qs.has('ornek');
    if (ornek) menu = {id: 'ornek', ad: window.DGORNEK?.menuler?.[0]?.ad || 'Menüm', tarifler: [T.find(t => kapOf(t) === 'ana'), T.find(t => kapOf(t) === 'yan'), T.find(t => kapOf(t) === 'tatli')].filter(Boolean).map(t => t.slug)};
    const kaplar = menu ? (menu.tarifler || menu.kaplar || []).map(k => DG.tarif(typeof k === 'string' ? k : k?.slug)).filter(Boolean) : [];
    if (!kaplar.length) return {tur: 'alt', baslik: 'Menüyü Pişir', html: durum({ikon: I('servings'), baslik: 'Pişirilecek menü bulunamadı', metin: 'Menülerinden birini seç ya da Ne Pişirsem › Yemek Modu\'nda sıfırdan bir menü kur.', tam: true, eylem: `<div class="dgu-yigin-12">${btn('Menülerime Git', {href: 'menulerim.html', tam: true})}${btn('Menü kur', {tur: 'ikincil', href: 'ne-pisirsem.html?sekme=mod', tam: true})}</div>`})};
    const varsayilan = servisSira(kaplar);
    let sira = [...varsayilan], faz = ['plan', 'adim', 'bitti'].includes(ctx.qs.get('faz')) ? ctx.qs.get('faz') : 'plan', i = 0, sn = 0, saat = null, kilit = null;
    return {tur: 'tam', baslik: 'Menüyü Pişir', html: `<div class="dgu-tamekran" data-pisir></div>`,
      sonra(root) {
        const el = root.querySelector('[data-pisir]');
        if (!el) return;
        const ss2 = n => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
        const durdur = () => { clearInterval(saat); saat = null; };
        const ust = alt => `<header class="bul-pisir-ust"><button class="dgu-ibtn" type="button" data-pisir-cik aria-label="Menüden çık">${ic(I('close'))}</button><div class="bul-pisir-baslik"><b class="clamp-1">${esc(menu.ad)}</b><small>${esc(alt)}</small></div></header>`;
        const meta = t => [KAP_AD[kapOf(t)], `${t.dakika} dk`, t.zorluk].filter(Boolean).map(esc).join(' · ');
        // Revize D9: sıralama düğmesi kanondaki küçük ikincil düğme (44 kare, kontrol radius'u, kenarlı); devre dışıyken gri zemin, kenarsız.
        const tasiBtn = (n, yon, aria, kapali) => `<button class="dgu-btn dgu-btn--ikincil dgu-btn--sm bul-tasi-btn" type="button" data-tasi="${n}" data-yon="${yon}" aria-label="${esc(aria)}" ${kapali ? 'disabled' : ''}>${ic(I(yon < 0 ? 'moveUp' : 'moveDown'))}</button>`;
        function ciz(odak = true) {
          if (faz === 'plan') {
            const top = sira.reduce((a, t) => a + (t.dakika || 0), 0);
            el.innerHTML = `${ust(`Menüyü Pişir · ${sira.length} kap`)}<div class="bul-pisir-govde dgu-yigin">
              <div>${bas('Servis sırası', btn('Sırayı sıfırla', {tur: 'metin', ikon: 'rotate-left', attrs: 'data-sifirla'}), 'tabindex="-1" data-odak')}<p class="dgu-yardim">Kaplar servis sırasına göre dizildi; istersen sırayı değiştir. Toplam ~${top} dk.</p></div>
              <ol class="dgu-satirlar">${sira.map((t, n) => `<li class="bul-sira-satir"><span class="bul-sira-no t-stat">${n + 1}</span><span class="dgu-medya bul-kucuk" style="${fotoStil(t)}" aria-hidden="true"></span><span class="dgu-satir-metin"><span class="clamp-2">${esc(t.kisa)}</span><small>${meta(t)}</small></span><span class="bul-tasi" role="group" aria-label="${esc(t.kisa)} sırasını değiştir">${tasiBtn(n, -1, `${t.kisa} yukarı taşı`, !n)}${tasiBtn(n, 1, `${t.kisa} aşağı taşı`, n === sira.length - 1)}</span></li>`).join('')}</ol>
            </div><div class="bul-pisir-alt">${btn('Pişirmeye Başla', {ikon: I('cookTime'), tam: true, attrs: 'data-basla'})}</div>`;
          } else if (faz === 'adim') {
            const t = sira[i];
            el.innerHTML = `${ust(`Yemek ${i + 1} / ${sira.length}`)}<div class="dgu-adim bul-pisir-ilerleme" aria-hidden="true">${sira.map((_, n) => `<i class="${n <= i ? 'is-on' : ''}"></i>`).join('')}</div>
              <div class="bul-pisir-govde dgu-yigin"><div class="dgu-medya bul-pisir-foto" style="${fotoStil(t)}" role="img" aria-label="${esc(t.kisa)}"></div>
              <div class="dgu-yigin-8"><p class="t-label c-deep">${esc(KAP_AD[kapOf(t)] || t.kategori)}</p><h1 class="t-page" tabindex="-1" data-odak>${esc(t.kisa)}</h1><p class="dgu-yardim">${[`${t.dakika} dk`, t.zorluk, `${t.malzemeler.length} malzeme`].filter(Boolean).map(esc).join(' · ')}</p></div>
              <div class="dgu-kart is-gri bul-sayac"><span class="t-label c-muted">Bu yemekte geçen süre</span><output class="bul-sayac-deger" aria-live="off">${ss2(sn)}</output><div class="u-yatay">${btn(saat ? 'Duraklat' : 'Başlat', {tur: 'ikincil', boy: 'sm', ikon: saat ? 'pause' : 'play', attrs: 'data-sayac'})}${btn('Sıfırla', {tur: 'metin', ikon: I('resetTimer'), attrs: 'data-sayac-sifir'})}</div></div>
              ${btn('Tarifi aç · adım adım pişir', {tur: 'tonlu', ikon: I('recipes'), href: DG.tarifLink(t), tam: true})}
              </div><div class="bul-pisir-alt dgu-ikili">${btn('Önceki', {tur: 'ikincil', ikon: I('back'), attrs: `data-onceki ${i ? '' : 'disabled'}`})}${btn(i < sira.length - 1 ? 'Sonraki' : 'Menüyü bitir', {ikon: i < sira.length - 1 ? 'arrow-right' : 'flag-checkered', attrs: 'data-sonraki'})}</div>`;
          } else {
            el.innerHTML = `${ust('Bitti')}<div class="bul-pisir-govde">${durum({ikon: 'flag-checkered', baslik: 'Menü tamamlandı, afiyet olsun!', metin: `${sira.length} kabın hepsi hazır.`, tam: true, eylem: `<div class="dgu-yigin-12">${btn('Menülerime Git', {href: 'menulerim.html', tam: true})}${btn('Kapat', {tur: 'ikincil', attrs: 'data-geri', tam: true})}</div>`})}</div>`;
          }
          if (odak) el.querySelector('[data-odak]')?.focus({preventScroll: true});
        }
        const ekranAcik = async on => { try { if (on && !kilit) kilit = await navigator.wakeLock?.request('screen'); else if (!on && kilit) { await kilit.release(); kilit = null; } } catch { /* desteklenmiyor */ } };
        el.addEventListener('click', async e => {
          const ta = e.target.closest('[data-tasi]');
          if (ta) { const n = Number(ta.dataset.tasi), m = n + Number(ta.dataset.yon); [sira[n], sira[m]] = [sira[m], sira[n]]; ciz(); (el.querySelector(`[data-tasi="${m}"][data-yon="${ta.dataset.yon}"]:not([disabled])`) || el.querySelector(`[data-tasi="${m}"]:not([disabled])`))?.focus(); return; }
          if (e.target.closest('[data-sifirla]')) { sira = [...varsayilan]; ciz(); DG.bildir('Servis sırası sıfırlandı'); return; }
          if (e.target.closest('[data-basla]')) { faz = 'adim'; i = 0; sn = 0; ekranAcik(true); ciz(); scrollTo({top: 0}); return; }
          if (e.target.closest('[data-sayac]')) { if (saat) durdur(); else saat = setInterval(() => { sn++; const o = el.querySelector('.bul-sayac-deger'); if (o) o.textContent = ss2(sn); }, 1000); ciz(); el.querySelector('[data-sayac]')?.focus(); return; }
          if (e.target.closest('[data-sayac-sifir]')) { durdur(); sn = 0; ciz(); return; }
          if (e.target.closest('[data-onceki]')) { durdur(); sn = 0; i = Math.max(0, i - 1); ciz(); scrollTo({top: 0}); return; }
          if (e.target.closest('[data-sonraki]')) { durdur(); sn = 0; if (i < sira.length - 1) i++; else { faz = 'bitti'; ekranAcik(false); } ciz(); scrollTo({top: 0}); return; }
          if (e.target.closest('[data-pisir-cik]')) {
            if (faz === 'adim' && !(await DG.onay({baslik: 'Menüden çıkılsın mı?', metin: 'Pişirme ilerlemen kaydedilmez.', evet: 'Çık'}))) return;
            durdur(); ekranAcik(false); DG.geri();
          }
        });
        if (faz === 'adim') ekranAcik(true);
        ciz(false);
      }};
  });

})();
