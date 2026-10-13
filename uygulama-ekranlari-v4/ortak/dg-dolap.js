/* Dolapta Ne Var — ortak bileşen (Beyar revize D2, 13 Ekim; yalnız ana ajan yazar). Ana sayfa bloğu (kök ana-v3) ve
   uygulama sayfası (uygulama/dolapta-ne-var.html) AYNI parçaları ve aynı eşleştirmeyi kullanır; seçim tek yerde tutulur
   (localStorage dg-dolap): ana sayfada eklenen malzeme sayfada da seçili gelir.
   Canlı dadagastro.com/dolapta-ne-var alan alan: Dolaptakiler / Hariç tuttuklarım; hariç türleri Sevmiyorum · Tüketmiyorum
   (hızlı seçim) · Alerjim Var · Hassasiyetim Var (Kesinlikle gösterme / Uyararak göster); malzeme yazma + sesli giriş; 8 kategori,
   185 malzeme; Besin değeri (porsiyon kalorisi 0–1200+, protein 15/25/35 g+), Vakit & zorluk; “N tarif bulundu · elindeki N
   malzemeyle · N hariç”, Tam eşleşme / n eksik. Eşleştirme prototipin gerçek tariflerinde (DGVERI) yerel ve açıklanabilir.
   Bağımlılık yok (DG gerekmez); veri window.DGVERI'den, yoksa ortak/veri/veri.js yüklenir. CSS: ortak/dg-dolap.css. */
(() => {
  if (window.DGDolap) return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const fa = (n, c = '') => `<i class="icon fa-solid fa-${n}${c ? ' ' + c : ''}" aria-hidden="true"></i>`;
  const norm = s => String(s || '').toLocaleLowerCase('tr-TR');
  const words = s => norm(s).split(/[^a-zçğıöşüâîû]+/).filter(Boolean);
  // Kelime düzeyi, Türkçe eke toleranslı ("Un" ~ "buğday unu"; "biber" ≠ "karabiber") — kök ana-v3 ile aynı kural.
  const wordHit = (w, v) => v.startsWith(w) || (w.length > 4 && w.startsWith(v) && w.length - v.length <= 2);
  const esler = (ad, isim) => { const want = words(isim), have = words(ad); return want.length > 0 && want.every(w => have.some(v => wordHit(w, v))); };

  let V = null, T = [], KAT = [];
  const GRUP_IKON = {'Sebzeler': 'carrot', 'Meyveler': 'apple-whole', 'Kırmızı Et': 'bacon', 'Tavuk ve Kümes Ürünleri': 'drumstick-bite', 'Balık ve Deniz Ürünleri': 'fish', 'Süt Ürünleri': 'cheese', 'Tahıllar ve Bakliyatlar': 'wheat-awn', 'Baharatlar, Otlar ve Soslar': 'mortar-pestle'};
  const kullanir = (t, isim, haric = []) => t.malzemeler.some(m => esler(m.ad, isim) && !haric.some(h => norm(m.ad).includes(h)));
  const herhangi = (t, liste, haric) => liste.some(n => kullanir(t, n, haric));
  const etiket = (t, ...e) => (t.ozellikler || []).some(x => e.includes(x));
  const kat = ad => KAT.find(g => g.grup === ad)?.malzemeler || [];
  let KABUKLU, KIRMIZI, KANATLI, BALIK, SUT, HIZLI, ALERJEN, HASSAS, BAHARAT, etli, sutlu, glutenli;
  const SUT_HARIC = ['hindistan', 'bitkisel'], GLUTEN = ['Un', 'Buğday', 'Bulgur', 'İrmik', 'Yufka', 'Kadayıf', 'Makarna', 'Şehriye', 'Erişte', 'Arpa', 'Çavdar', 'Ekmek'], GLUTEN_HARIC = ['pirinç', 'karabuğday', 'mısır'];
  const KURUYEMIS = ['Ceviz', 'Fındık', 'Badem', 'Antep Fıstığı', 'Kaju'], SEKER = ['Şeker', 'Pudra Şekeri'];
  const TEMEL = ['tuz', 'su', 'içme suyu', 'soğuk su', 'ılık su', 'sıcak su', 'karabiber', 'zeytinyağı', 'sıvı yağ', 'ayçiçek yağı', 'buz'];
  const temel = ad => TEMEL.some(x => norm(ad) === x || norm(ad).startsWith(x + ' '));
  // Canlı süzgeç seçenekleri (dolapta-ne-var: Besin değeri · Vakit & zorluk).
  const ZORLUK = ['Çok Kolay', 'Kolay', 'Orta', 'Zor', 'Ustalık Gerektirir'];
  const SURE = [['15', '15 dakikadan az', d => d < 15], ['15-30', '15–30 dakika', d => d >= 15 && d <= 30], ['30-45', '30–45 dakika', d => d > 30 && d <= 45], ['45-60', '45–60 dakika', d => d > 45 && d <= 60], ['60-120', '1–2 saat', d => d > 60 && d <= 120], ['120+', '2 saatten uzun', d => d > 120]];
  const PROTEIN = [[15, '15 g+'], [25, '25 g+'], [35, '35 g+ (yüksek)']];
  const KALORI_UST = 1200;
  const HMOD = [['sev', 'Sevmiyorum', 'Damak tadın nedeniyle görmek istemediğin malzemeleri seç — tarif kolayca çıkarılabiliyorsa yine gösterilir, seni bilgilendiririz.', 'face-frown'], ['tuk', 'Tüketmiyorum', 'Yaşam biçimin ya da beslenme tercihin nedeniyle tüketmediğin ürünleri seç — uyumsuz tarifler sonuçlarda gösterilmez.', 'ban'], ['alr', 'Alerjim Var', 'Sağlık açısından kesinlikle tüketmemen gereken malzemeleri seç — alerjen içeren tarifler sonuçlardan tamamen çıkarılır, önerilmez.', 'triangle-exclamation'], ['has', 'Hassasiyetim Var', 'Alerji olmasa da tüketmekte zorlandığın içerikler — her seçim için tarifi hiç gösterme ya da uyararak göster diyebilirsin.', 'hand']];
  const LISTE = ['have', 'sev', 'tuk', 'alr', 'has'];
  const bos = () => ({have: [], sev: [], tuk: [], alr: [], has: [], tukH: [], alrH: [], hasH: {}, sure: '', zorluk: [], kalori: [0, KALORI_UST], protein: 0});
  const haricSayi = st => st.sev.length + st.tuk.length + st.alr.length + st.has.length + st.tukH.length + st.alrH.length + Object.keys(st.hasH).length;
  const bosMu = st => !st.have.length && !haricSayi(st);

  function kur(veri) {
    V = veri; T = V.tarifler.filter(t => t.yazar);   // yazarı bilinmeyen tarif öne çıkarılmaz
    KAT = V.dolapKatalog.map(g => ({grup: g.grup, ikon: GRUP_IKON[g.grup] || 'basket-shopping', malzemeler: g.malzemeler}));
    KABUKLU = ['Karides', 'Midye', 'Istakoz', 'Yengeç', 'Kalamar', 'Ahtapot', 'Deniz Tarağı'];
    KIRMIZI = [...kat('Kırmızı Et'), 'Et Suyu', 'Kıyma'];
    KANATLI = [...kat('Tavuk ve Kümes Ürünleri').filter(x => !/Yumurtası/.test(x)), 'Tavuk', 'Ördek', 'Hindi'];
    BALIK = [...kat('Balık ve Deniz Ürünleri').filter(x => !KABUKLU.includes(x)), 'Balık', 'Levrek', 'Uskumru', 'Sardalya'];
    SUT = [...kat('Süt Ürünleri').filter(x => !/Bitkisel/.test(x)), 'Peynir', 'Sade Yağ'];
    BAHARAT = new Set(kat('Baharatlar, Otlar ve Soslar'));
    etli = t => herhangi(t, [...KIRMIZI, ...KANATLI, ...BALIK, ...KABUKLU]);
    sutlu = t => herhangi(t, SUT, SUT_HARIC);
    glutenli = t => !etiket(t, 'Glutensiz') && herhangi(t, GLUTEN, GLUTEN_HARIC);
    HIZLI = {'Vegan': t => !etiket(t, 'Vegan') && (etli(t) || sutlu(t) || herhangi(t, ['Yumurta', 'Bal'])), 'Vejetaryen': t => !etiket(t, 'Vegan', 'Vejetaryen') && etli(t), 'Pesketaryen': t => !etiket(t, 'Vegan', 'Vejetaryen', 'Pesketaryen') && herhangi(t, [...KIRMIZI, ...KANATLI]), 'İlave şeker tüketmiyorum': t => !etiket(t, 'Şeker İlavesiz') && herhangi(t, SEKER), 'Çiğ ürün tüketmiyorum': null};
    ALERJEN = {'Süt': t => !etiket(t, 'Süt İçermez') && sutlu(t), 'Yumurta': t => !etiket(t, 'Yumurta İçermez') && kullanir(t, 'Yumurta'), 'Gluten': glutenli, 'Yer fıstığı': t => kullanir(t, 'Yer Fıstığı'), 'Sert kabuklu yemişler': t => !etiket(t, 'Kuruyemiş İçermez') && herhangi(t, KURUYEMIS, ['hindistan']), 'Soya': t => kullanir(t, 'Soya'), 'Balık': t => herhangi(t, BALIK), 'Kabuklu deniz ürünleri': t => herhangi(t, KABUKLU), 'Susam': t => herhangi(t, ['Susam', 'Tahin']), 'Hardal': t => kullanir(t, 'Hardal'), 'Kereviz': t => kullanir(t, 'Kereviz')};
    HASSAS = {'Laktoz': t => !etiket(t, 'Laktozsuz', 'Süt İçermez') && sutlu(t), 'Gluten hassasiyeti': glutenli, 'Acı': t => etiket(t, 'Acılı') || herhangi(t, ['Pul Biber', 'Acı', 'İsot']), 'Sülfit': t => herhangi(t, ['Sirke', 'Şarap']), 'Kafein': t => herhangi(t, ['Kahve', 'Çay', 'Kakao', 'Çikolata']), 'Yüksek şeker': t => herhangi(t, [...SEKER, 'Pekmez', 'Bal', 'Şerbet']), 'Histamin': null, 'Fruktoz (FODMAP)': null, 'Patlıcangiller (domates·patates·biber)': t => herhangi(t, ['Domates', 'Patates', 'Biber', 'Patlıcan'], ['beyaz biber', 'sichuan', 'karabiber']), 'Maya': t => kullanir(t, 'Maya'), 'Yumurta hassasiyeti': t => kullanir(t, 'Yumurta')};
  }
  // Popüler malzemeler: gerçek tariflerde en çok geçen katalog malzemeleri (baharatlar yazarak eklenir) — kök ana-v3 ile aynı kural.
  const populer = (n = 8) => KAT.filter(g => g.grup !== 'Baharatlar, Otlar ve Soslar').flatMap(g => g.malzemeler.map(ad => ({ad, n: T.filter(t => kullanir(t, ad)).length}))).filter(x => x.n).sort((a, b) => b.n - a.n || a.ad.localeCompare(b.ad, 'tr')).slice(0, n);
  const tarifSayisi = ad => T.filter(t => kullanir(t, ad)).length;
  const katalogAra = (q, n = 24) => { q = norm(q.trim()); if (!q) return []; return KAT.flatMap(g => g.malzemeler).filter(a => norm(a).includes(q)).sort((a, b) => (norm(b).startsWith(q) - norm(a).startsWith(q)) || a.localeCompare(b, 'tr')).slice(0, n); };
  const tamAd = ad => KAT.flatMap(g => g.malzemeler).find(a => norm(a) === norm(ad.trim())) || (ad.trim().charAt(0).toLocaleUpperCase('tr') + ad.trim().slice(1));

  // ---------- Eşleştirme ----------
  function sonuc(st) {
    const kesin = t => st.tuk.some(n => kullanir(t, n)) || st.alr.some(n => kullanir(t, n)) || st.has.some(n => kullanir(t, n))
      || st.tukH.some(k => HIZLI[k]?.(t)) || st.alrH.some(k => ALERJEN[k]?.(t)) || Object.entries(st.hasH).some(([k, v]) => v === 'gizle' && HASSAS[k]?.(t))
      || st.sev.some(n => !BAHARAT.has(n) && kullanir(t, n));   // sevilmeyen baharat/ot/sos kolayca çıkarılır: tarif kalır, bilgi verilir
    let L = T.filter(t => !kesin(t));
    const sure = SURE.find(s => s[0] === st.sure); if (sure) L = L.filter(t => sure[2](t.dakika));
    if (st.zorluk.length) L = L.filter(t => st.zorluk.includes(t.zorluk));
    const [kmin, kmax] = st.kalori || [0, KALORI_UST];
    if (kmin > 0 || kmax < KALORI_UST) L = L.filter(t => t.kalori != null && t.kalori >= kmin && (kmax >= KALORI_UST || t.kalori <= kmax));
    if (st.protein) L = L.filter(t => t.protein != null && t.protein >= st.protein);
    const S = L.map(t => ({t, varOlan: st.have.filter(n => kullanir(t, n)), eksik: t.malzemeler.filter(m => !temel(m.ad) && !st.have.some(n => esler(m.ad, n))).map(m => m.ad),
      uyari: Object.entries(st.hasH).filter(([k, v]) => v === 'uyar' && HASSAS[k]?.(t)).map(([k]) => k), sev: st.sev.filter(n => BAHARAT.has(n) && kullanir(t, n))}))
      .filter(x => !st.have.length || x.varOlan.length)
      .sort((a, b) => a.eksik.length - b.eksik.length || b.varOlan.length - a.varOlan.length || a.sev.length - b.sev.length);
    return {liste: S, tam: S.filter(x => !x.eksik.length).length};
  }
  const suzgecSayi = st => (st.sure ? 1 : 0) + st.zorluk.length + ((st.kalori?.[0] > 0 || st.kalori?.[1] < KALORI_UST) ? 1 : 0) + (st.protein ? 1 : 0);

  // ---------- Durum (tek kaynak, localStorage dg-dolap; sayfa ve ana sayfa bloğu aynı) ----------
  const oku = () => { try { const v = JSON.parse(localStorage.getItem('dg-dolap') || 'null'); return Object.assign(bos(), v || {}); } catch { return bos(); } };
  const yaz = st => { try { localStorage.setItem('dg-dolap', JSON.stringify(st)); } catch { /* özel pencere */ } };
  // Bir malzeme yalnız bir listede durur: dolapta ya da bir hariç türünde.
  const nerede = (st, ad) => LISTE.find(k => st[k].includes(ad));
  function sec(st, ad, mod) { const once = nerede(st, ad); LISTE.forEach(k => { st[k] = st[k].filter(x => x !== ad); }); if (once !== mod) st[mod].push(ad); return st; }

  // ---------- Görünüm parçaları (HTML) ----------
  // Sekme (canlı “Dolaptakiler / Hariç Tuttuklarım”): ortak segment bileşeni (.dgu-seg, ortak/dg-kontrol.css); arama ve popüler
  // malzemeler seçili sekmeye göre dolaba ekler ya da hariç tutar.
  const modSecici = (mod, nHave, nHaric) => `<div class="dgu-seg dgd-sekme" role="tablist" aria-label="Malzeme listesi">${[['have', 'Dolaptakiler', nHave], ['haric', 'Hariç Tuttuklarım', nHaric]].map(([k, ad, n]) => `<button type="button" role="tab" data-dgd-mod="${k}" aria-selected="${mod === k}">${ad} <span class="dgu-seg-sayi">${n}</span></button>`).join('')}</div>`;
  // Malzeme alanı: ortak girdi kutusu (.dgu-girdi) — tek çerçeve; solda büyüteç, sağda temizle ve mikrofon, hepsi kutunun içinde.
  const araKutusu = (mod, deger = '') => `<div class="dgu-alan"><label class="dgd-sr" for="dgd-ara-${mod}">${mod === 'have' ? 'Elindeki malzeme' : 'Hariç tutmak istediğin malzeme'}</label><div class="dgu-girdi${deger ? ' has-text' : ''}" data-dgd-kutu>${fa('magnifying-glass')}<input id="dgd-ara-${mod}" type="search" data-dgd-ara value="${esc(deger)}" placeholder="${mod === 'have' ? 'Elindeki malzeme — örn. yumurta, tavuk, peynir…' : 'Hariç tutmak istediğin malzeme — örn. mantar, süt…'}" autocomplete="off" enterkeyhint="done"><button type="button" class="dgu-ibtn dgu-temizle" data-dgd-temizle aria-label="Aramayı temizle">${fa('xmark')}</button><button type="button" class="dgu-ibtn dgu-girdi-ses" data-dgd-ses aria-label="Sesli malzeme girişi" aria-pressed="false">${fa('microphone')}</button></div></div>`;
  // Malzeme çipi: eklenmemiş → artı; dolapta → tint + onay; hariç → koyu çizgili + yasak işareti.
  // Malzeme görseli: canlı sitenin gerçek görseli (assets/malzeme/<slug>.webp, 96px; Beyar V4 B4). Katalog dışı (elle eklenen) malzemenin
  // görseli yoktur → kartta nötr zemin + ikon (görsel uydurulmaz).
  const TRK = {'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'};
  const slug = s => String(s).replace(/[çğıöşüâîûÇĞİIÖŞÜ]/g, c => TRK[c]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const katalogda = ad => KAT.some(g => g.malzemeler.includes(ad));
  const gorsel = (ad, kok = '') => katalogda(ad) ? `${kok}assets/malzeme/${slug(ad)}.webp` : '';
  // Görselli malzeme kartı (sayfa): aynı düğme/olay/durum (data-dgd-mlz, aria-pressed); dolapta → primary çerçeve + onay, hariç → koyu örtü + çarpı.
  function kart(st, ad, mod, kok) {
    const nr = nerede(st, ad), on = mod === 'have' ? nr === 'have' : nr && nr !== 'have', durum = !nr ? 'yok' : nr === 'have' ? 'have' : 'haric';
    const etk = durum === 'yok' ? (mod === 'have' ? 'dolaba ekle' : 'hariç tut') : durum === 'have' ? 'dolapta, çıkarmak için dokun' : 'hariç, çıkarmak için dokun';
    const g = gorsel(ad, kok);
    return `<button type="button" class="dgd-mkart is-${durum}" data-dgd-mlz="${esc(ad)}" aria-pressed="${!!on}" aria-label="${esc(ad)}: ${etk}"><span class="dgd-mkart-foto${g ? '' : ' is-bos'}"${g ? ` style="background-image:url('${esc(g)}')"` : ''}>${g ? '' : fa('basket-shopping')}<span class="dgd-mkart-durum" aria-hidden="true">${fa(durum === 'have' ? 'check' : durum === 'haric' ? 'xmark' : 'plus')}</span></span><span class="dgd-mkart-ad">${esc(ad)}</span></button>`;
  }
  function cip(st, ad, mod, sayi) {
    const nr = nerede(st, ad), on = mod === 'have' ? nr === 'have' : nr && nr !== 'have', durum = !nr ? 'yok' : nr === 'have' ? 'have' : 'haric';
    const etk = durum === 'yok' ? (mod === 'have' ? 'dolaba ekle' : 'hariç tut') : durum === 'have' ? 'dolapta, çıkarmak için dokun' : 'hariç, çıkarmak için dokun';
    return `<button type="button" class="dgd-cip is-${durum}" data-dgd-mlz="${esc(ad)}" aria-pressed="${!!on}" aria-label="${esc(ad)}: ${etk}">${fa(durum === 'have' ? 'check' : durum === 'haric' ? 'xmark' : 'plus')}<span>${esc(ad)}</span>${sayi != null ? `<small>${sayi}</small>` : ''}</button>`;
  }
  // Seçim paneli: Dolabında / Hariç — her biri kaldırılabilir çipler; boşken canlı yönlendirme cümlesi.
  function secimPanel(st) {
    const etk = k => HMOD.find(h => h[0] === k)?.[1];
    const haric = [...['sev', 'tuk', 'alr', 'has'].flatMap(k => st[k].map(a => [k, a, etk(k)])), ...st.tukH.map(a => ['tukH', a, 'Tüketmiyorum']), ...st.alrH.map(a => ['alrH', a, 'Alerjim Var']), ...Object.entries(st.hasH).map(([a, v]) => ['hasH', a, v === 'gizle' ? 'Gösterme' : 'Uyararak'])];
    const kal = (k, a, t, cls, ik) => `<span class="dgd-secili ${cls}">${cls === 'is-have' ? fa(ik) : ''}<span>${esc(a)}${t ? ` <small>${esc(t)}</small>` : ''}</span><button type="button" data-dgd-kaldir="${k}|${esc(a)}" aria-label="${esc(a)} — kaldır">${fa('xmark')}</button></span>`;
    if (bosMu(st)) return `<div class="dgd-secim is-bos"><p>${fa('arrow-turn-down')}<span>Henüz seçim yok — Dolaptakiler'den malzeme işaretle ya da Hariç Tuttuklarım'ı doldur.</span></p></div>`;
    return `<div class="dgd-secim"><div class="dgd-secim-bas"><b>Elinde ${st.have.length} malzeme${haric.length ? ` · ${haric.length} hariç` : ''}</b><button type="button" class="dgd-metin-btn" data-dgd-hepsi>Tümünü temizle</button></div>${st.have.length ? `<div class="dgd-secim-satir" aria-label="Dolabında">${st.have.map(a => kal('have', a, '', 'is-have', 'check')).join('')}</div>` : ''}${haric.length ? `<div class="dgd-secim-satir" aria-label="Hariç tuttukların">${haric.map(([k, a, t]) => kal(k, a, t, 'is-haric', 'xmark')).join('')}</div>` : ''}</div>`;
  }
  // Besin değeri süzgeci: porsiyon kalorisi çift kaydırıcı (0–1200+ kcal, 50'lik adım) + protein eşiği. Veri tahminidir (detay besin kartı).
  function besinSuzgec(st) {
    const [a, b] = st.kalori || [0, KALORI_UST];
    return `<div class="dgd-besin"><div class="dgd-kalori" style="--dgd-a:${a / KALORI_UST * 100}%;--dgd-b:${b / KALORI_UST * 100}%"><div class="dgd-kalori-bas"><span>Porsiyon kalorisi</span><output data-dgd-kalori-deger>${a} – ${b >= KALORI_UST ? '1200+' : b} kcal</output></div><div class="dgd-kalori-ray"><input type="range" min="0" max="${KALORI_UST}" step="50" value="${a}" data-dgd-kalori="0" aria-label="Alt kalori"><input type="range" min="0" max="${KALORI_UST}" step="50" value="${b}" data-dgd-kalori="1" aria-label="Üst kalori"></div><div class="dgd-kalori-uc"><span>0</span><span>1200+ kcal</span></div></div><div class="dgd-grup"><span class="dgd-grup-ad">Porsiyon proteini</span><div class="dgd-ciplar">${PROTEIN.map(([g, ad]) => `<button type="button" class="dgd-cip is-filtre${st.protein === g ? ' is-have' : ''}" data-dgd-protein="${g}" aria-pressed="${st.protein === g}">${st.protein === g ? fa('check') : ''}<span>${ad}</span></button>`).join('')}</div></div></div>`;
  }
  const vakitSuzgec = st => `<div class="dgd-besin"><div class="dgd-grup"><span class="dgd-grup-ad">Hazırlık süresi</span><div class="dgd-ciplar">${SURE.map(([k, ad]) => `<button type="button" class="dgd-cip is-filtre${st.sure === k ? ' is-have' : ''}" data-dgd-sure="${k}" aria-pressed="${st.sure === k}">${st.sure === k ? fa('check') : ''}<span>${ad}</span></button>`).join('')}</div></div><div class="dgd-grup"><span class="dgd-grup-ad">Zorluk</span><div class="dgd-ciplar">${ZORLUK.map(z => `<button type="button" class="dgd-cip is-filtre${st.zorluk.includes(z) ? ' is-have' : ''}" data-dgd-zorluk="${esc(z)}" aria-pressed="${st.zorluk.includes(z)}">${st.zorluk.includes(z) ? fa('check') : ''}<span>${esc(z)}</span></button>`).join('')}</div></div></div>`;

  // ---------- Sesli giriş (tarayıcının konuşma tanıması; yoksa açıklayıcı bildirim) ----------
  function dinle(btn, input, bildir) {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) { bildir?.('Sesli giriş bu tarayıcıda desteklenmiyor; malzemeyi yazarak ekleyebilirsin.'); return; }
    const r = new R(); r.lang = 'tr-TR'; r.interimResults = false; r.maxAlternatives = 1;
    btn.setAttribute('aria-pressed', 'true'); btn.classList.add('is-dinliyor');   // .dgu-girdi-ses.is-dinliyor (dg-kontrol.css)
    r.onresult = e => { const t = e.results[0][0].transcript.replace(/[.!?]$/, ''); input.value = t; input.dispatchEvent(new Event('input', {bubbles: true})); };
    r.onerror = () => bildir?.('Sesini anlayamadık; tekrar dene ya da yazarak ekle.');
    r.onend = () => { btn.setAttribute('aria-pressed', 'false'); btn.classList.remove('is-dinliyor'); };
    try { r.start(); } catch { r.onend(); }
  }

  // ---------- Veri hazırlığı ----------
  let hazir = null;
  function yukle(kok = '') {
    if (V) return Promise.resolve();
    if (window.DGVERI) { kur(window.DGVERI); return Promise.resolve(); }
    return hazir || (hazir = new Promise((ok, red) => { const s = document.createElement('script'); s.src = kok + 'ortak/veri/veri.js'; s.onload = () => { kur(window.DGVERI); ok(); }; s.onerror = red; document.head.append(s); }));
  }
  if (window.DGVERI) kur(window.DGVERI);

  // ---------- TEK İÇERİK (Beyar düzeltmesi, 13 Ekim: “kaynak Dolapta Ne Var SAYFASI; ana sayfa bloğu onun AYNISI — aynı tek render
  // fonksiyonu; siyah seçili tür kartları, kategori grupları, sıra, not, sekme, arama, Tarif bul. Fark yalnız dış başlık ve kart çerçevesi”).
  // Çıktı, sayfanın revize öncesi işaretlemesinin birebir aynısıdır (uygulama sınıfları: dgu-ic, dgu-yigin-12, dgu-yardim, dgu-akordeon,
  // dgu-btn …); kökte bu sınıfların aynı değerleri ortak/dg-dolap.css'te .dgd-icerik altında tanımlıdır. Siyah seçili durum (.dl-htur,
  // hassasiyette “Kesinlikle gösterme”) yalnız bu bileşende. u: {sekme, hmod, ara}; ust: dış başlık (yalnız sayfa).
  const katMod = u => u.sekme === 'have' ? 'have' : u.hmod;
  const hSayi = (st, k) => k === 'tuk' ? st.tuk.length + st.tukH.length : k === 'alr' ? st.alr.length + st.alrH.length : k === 'has' ? st.has.length + Object.keys(st.hasH).length : st.sev.length;
  const dbtn = (metin, {tur = '', ikon, attrs = '', tam, href} = {}) => { const c = `dgu-btn${tur ? ' dgu-btn--' + tur : ''}${tam ? ' dgu-btn--tam' : ''}`, i = ikon ? fa(ikon) : ''; return href != null ? `<a class="${c}" href="${esc(href)}" ${attrs}>${i}<span>${esc(metin)}</span></a>` : `<button class="${c}" type="button" ${attrs}>${i}<span>${esc(metin)}</span></button>`; };
  function haricPanel(st, u) {
    const [, , aciklama] = HMOD.find(h => h[0] === u.hmod);
    let ek = '';
    if (u.hmod === 'tuk') ek = `<div class="dl-kutu"><p class="dl-kutu-bas">${fa('bolt')}<b>Hızlı seçim</b><small>tek dokunuşla ilgili ürün grubunu işaretler</small></p><div class="dgd-ciplar">${Object.keys(HIZLI).map(k => `<button type="button" class="dgd-cip ${st.tukH.includes(k) ? 'is-haric' : 'is-yok'}" data-hizli="tukH|${esc(k)}" aria-pressed="${st.tukH.includes(k)}">${fa(st.tukH.includes(k) ? 'ban' : 'plus')}<span>${esc(k)}</span></button>`).join('')}</div><p class="dl-kutu-bas">${fa('list-check')}<b>Ürün / grup bazlı</b><small>tüketmediğin ürün ya da grubu aşağıdan tek tek ekle</small></p></div>`;
    if (u.hmod === 'alr') ek = `<div class="dl-kutu"><div class="dgd-ciplar">${Object.keys(ALERJEN).map(k => `<button type="button" class="dgd-cip ${st.alrH.includes(k) ? 'is-haric' : 'is-yok'}" data-hizli="alrH|${esc(k)}" aria-pressed="${st.alrH.includes(k)}">${fa(st.alrH.includes(k) ? 'ban' : 'plus')}<span>${esc(k)}</span></button>`).join('')}</div><p class="dl-kutu-bas">${fa('list-check')}<b>Diğer</b><small>tek tek malzeme ekle</small></p></div>`;
    if (u.hmod === 'has') ek = `<div class="dl-kutu dgu-satirlar">${Object.keys(HASSAS).map(k => `<div class="dl-hassas" role="group" aria-label="${esc(k)}"><b>${esc(k)}</b><div class="dgd-ciplar">${[['gizle', 'Kesinlikle gösterme', 'eye-slash'], ['uyar', 'Uyararak göster', 'triangle-exclamation']].map(([v, m, i]) => `<button type="button" class="dgd-cip ${st.hasH[k] === v ? (v === 'gizle' ? 'is-haric' : 'is-have') : 'is-yok'}" data-hassas="${esc(k)}|${v}" aria-pressed="${st.hasH[k] === v}">${fa(i)}<span>${m}</span></button>`).join('')}</div></div>`).join('')}</div>`;
    return `<div class="dgu-yigin-12"><div class="dl-htur" role="tablist" aria-label="Hariç tutma türü">${HMOD.map(([k, m, , i]) => `<button type="button" role="tab" data-hmod="${k}" aria-selected="${k === u.hmod}">${fa(i)}<span>${m}</span>${hSayi(st, k) ? `<small>${hSayi(st, k)}</small>` : ''}</button>`).join('')}</div><p class="dgu-yardim">${esc(aciklama)}</p>${ek}</div>`;
  }
  // Malzemeler: aramada “Bulunanlar”, aksi hâlde 8 kategori grubu (tek açık akordeon, ilk grup açık; başlıkta seçili sayısı).
  // Beyar V4 B4: her grup tek satırlık yatay şerit (.dgd-ciplar.is-serit; sonda kısmi öğe görünür). u.gorselli: sayfa (gerçek görselli kart) /
  // ana sayfa (metin çipi) — aynı fonksiyon. u.kok: görsel yolu öneki.
  const oge = (st, u, a, cm, sayi) => u.gorselli ? kart(st, a, cm, u.kok || '') : cip(st, a, cm, sayi);
  function katalog(st, u) {
    const mod = katMod(u), cm = mod === 'have' ? 'have' : 'haric', q = (u.ara || '').trim(), sinif = 'dgd-ciplar is-serit' + (u.gorselli ? ' is-kart' : '');
    if (q) { const bulunan = katalogAra(q), tam = bulunan.some(a => norm(a) === norm(q)); return `<div class="dgd-grup"><span class="dgd-grup-ad">Bulunanlar</span><div class="${sinif}">${bulunan.map(a => oge(st, u, a, cm, tarifSayisi(a))).join('')}${tam ? '' : `<button type="button" class="dgd-cip is-yok" data-dgd-mlz="${esc(tamAd(q))}">${fa('plus')}<span>“${esc(tamAd(q))}” ekle</span></button>`}</div></div>`; }
    return `<div class="dgu-akordeon dl-katalog" data-tek-acik>${KAT.map((g, n) => { const k = g.malzemeler.filter(a => nerede(st, a) === mod).length; return `<details data-dgd-ak="kat-${n}"${n === 0 ? ' open' : ''}><summary><span class="dl-ak-ikon">${fa(g.ikon)}</span><span>${esc(g.grup)}<small class="dl-ak-alt">${g.malzemeler.length} malzeme</small></span>${k ? `<span class="dgu-sayac">${k}</span>` : ''}${fa('chevron-down')}</summary><div class="dgu-ak-govde"><div class="${sinif}">${g.malzemeler.map(a => oge(st, u, a, cm)).join('')}</div></div></details>`; }).join('')}</div>`;
  }
  function suzgecler(st) {
    const n = suzgecSayi(st), besin = (st.kalori?.[0] > 0 || st.kalori?.[1] < KALORI_UST ? 1 : 0) + (st.protein ? 1 : 0), vakit = (st.sure ? 1 : 0) + st.zorluk.length;
    return `<section class="dgu-yigin-12" aria-labelledby="dl-suzgec"><div class="u-ara"><h2 class="t-sub" id="dl-suzgec">Süzgeçler</h2>${n ? dbtn('Filtreleri sıfırla', {tur: 'metin', attrs: 'data-suzgec-sifirla'}) : ''}</div><div class="dgu-akordeon dl-suzgec" data-tek-acik>
            <details data-dgd-ak="besin"${besin ? ' open' : ''}><summary><span class="dl-ak-ikon">${fa('fire-flame-curved')}</span><span>Besin değeri<small class="dl-ak-alt">porsiyon başına · tahmini</small></span>${besin ? `<span class="dgu-sayac">${besin}</span>` : ''}${fa('chevron-down')}</summary><div class="dgu-ak-govde">${besinSuzgec(st)}</div></details>
            <details data-dgd-ak="vakit"${vakit ? ' open' : ''}><summary><span class="dl-ak-ikon">${fa('clock')}</span><span>Vakit &amp; zorluk</span>${vakit ? `<span class="dgu-sayac">${vakit}</span>` : ''}${fa('chevron-down')}</summary><div class="dgu-ak-govde">${vakitSuzgec(st)}</div></details></div></section>`;
  }
  const ctaMetin = st => bosMu(st) ? 'Tarif bul' : `${sonuc(st).liste.length.toLocaleString('tr-TR')} tarif göster`;
  const icerik = (st, u, {ust = '', hedef = 'dolapta-ne-var.html', gorselli = false, kok = ''} = {}) => (Object.assign(u, {gorselli, kok}), '') + `<div class="dgd-icerik"><div class="dgu-ic dgu-yigin">
            ${ust}
            <p class="dl-giris">Dolabındaki malzemeleri işaretle — sana yapabileceğin tarifleri anında listeleyelim. Eksik bir-iki malzemeyle çıkanları da gösterelim.</p>
            ${secimPanel(st)}
            <div class="dgu-yigin-12">${modSecici(u.sekme, st.have.length, haricSayi(st))}
            ${u.sekme === 'have' ? '<p class="dgu-yardim">Dolabında bulunan malzemeleri seç, sana uygun tarifleri gösterelim.</p>' : haricPanel(st, u)}</div>
            ${araKutusu(u.sekme, u.ara)}
            <div data-dgd-katalog>${katalog(st, u)}</div>
            ${suzgecler(st)}
          </div>
          <div class="bul-cta">${dbtn(ctaMetin(st), {ikon: 'magnifying-glass', tam: true, attrs: 'data-goster', href: hedef + (bosMu(st) ? '' : '?sonuc=1')})}</div></div>`;
  const seciciHtml = icerik;   // eski ad (geriye uyum)
  // Olaylar (sayfa ve blok aynı): seçim/süzgeç değişince kaydet() + yeniden(odak); açık akordeonlar ve kaydırma konumu korunur;
  // arama yazılırken yalnız malzeme listesi yenilenir (odak korunur). “Tarif bul” (data-goster) bağlantıdır; sayfa kendi sonucunu açar.
  function seciciBagla(el, st, u, {kompakt, kaydet, yeniden, bildir}) {
    const katalogCiz = () => { const k = el.querySelector('[data-dgd-katalog]'); if (k) k.innerHTML = katalog(st, u); };
    const ciz = odak => { const acik = [...el.querySelectorAll('details[data-dgd-ak]')].map(d => [d.dataset.dgdAk, d.open]), y = scrollY; yeniden(); acik.forEach(([id, o]) => { const d = el.querySelector(`details[data-dgd-ak="${id}"]`); if (d) d.open = o; }); scrollTo({top: y}); if (odak) el.querySelector(odak)?.focus({preventScroll: true}); };
    const degis = odak => { kaydet(); ciz(odak); };
    el.addEventListener('click', e => {
      const m = e.target.closest('[data-dgd-mlz]'); if (m) { const ad = m.dataset.dgdMlz; sec(st, ad, katMod(u)); const vardi = (u.ara || '').trim(); if (vardi) u.ara = ''; degis(vardi ? '[data-dgd-ara]' : `[data-dgd-mlz="${CSS.escape(ad)}"]`); return; }
      const md = e.target.closest('[data-dgd-mod]'); if (md) { u.sekme = md.dataset.dgdMod; u.ara = ''; ciz(`[data-dgd-mod="${u.sekme}"]`); return; }
      const hm = e.target.closest('[data-hmod]'); if (hm) { u.hmod = hm.dataset.hmod; ciz(`[data-hmod="${u.hmod}"]`); return; }
      const hz = e.target.closest('[data-hizli]'); if (hz) { const [k, ad] = hz.dataset.hizli.split('|'); st[k] = st[k].includes(ad) ? st[k].filter(x => x !== ad) : [...st[k], ad]; degis(`[data-hizli="${CSS.escape(hz.dataset.hizli)}"]`); return; }
      const hs = e.target.closest('[data-hassas]'); if (hs) { const [k, v] = hs.dataset.hassas.split('|'); if (st.hasH[k] === v) delete st.hasH[k]; else st.hasH[k] = v; degis(`[data-hassas="${CSS.escape(hs.dataset.hassas)}"]`); return; }
      const kl = e.target.closest('[data-dgd-kaldir]'); if (kl) { const [k, ad] = kl.dataset.dgdKaldir.split('|'); if (k === 'hasH') delete st.hasH[ad]; else st[k] = st[k].filter(x => x !== ad); degis(); return; }
      if (e.target.closest('[data-dgd-hepsi]')) { const yedek = JSON.stringify(st); Object.assign(st, bos(), {sure: st.sure, zorluk: st.zorluk, kalori: st.kalori, protein: st.protein}); degis(); bildir?.('Seçimin temizlendi', () => { Object.assign(st, JSON.parse(yedek)); degis(); }); return; }
      const su = e.target.closest('[data-dgd-sure]'); if (su) { st.sure = st.sure === su.dataset.dgdSure ? '' : su.dataset.dgdSure; degis(`[data-dgd-sure="${su.dataset.dgdSure}"]`); return; }
      const zo = e.target.closest('[data-dgd-zorluk]'); if (zo) { const z = zo.dataset.dgdZorluk; st.zorluk = st.zorluk.includes(z) ? st.zorluk.filter(x => x !== z) : [...st.zorluk, z]; degis(`[data-dgd-zorluk="${CSS.escape(z)}"]`); return; }
      const pr = e.target.closest('[data-dgd-protein]'); if (pr) { const g = +pr.dataset.dgdProtein; st.protein = st.protein === g ? 0 : g; degis(`[data-dgd-protein="${g}"]`); return; }
      if (e.target.closest('[data-suzgec-sifirla]')) { st.sure = ''; st.zorluk = []; st.kalori = [0, KALORI_UST]; st.protein = 0; degis(); bildir?.('Filtreler sıfırlandı'); return; }
      if (e.target.closest('[data-dgd-temizle]')) { u.ara = ''; katalogCiz(); const i = el.querySelector('[data-dgd-ara]'); i.value = ''; i.closest('.dgu-girdi').classList.remove('has-text'); i.focus(); return; }
      const ses = e.target.closest('[data-dgd-ses]'); if (ses) dinle(ses, el.querySelector('[data-dgd-ara]'), m2 => bildir?.(m2));
    });
    el.addEventListener('input', e => {
      if (e.target.matches('[data-dgd-ara]')) { u.ara = e.target.value; e.target.closest('.dgu-girdi').classList.toggle('has-text', Boolean(u.ara)); katalogCiz(); return; }
      if (e.target.matches('[data-dgd-kalori]')) { const r = [...el.querySelectorAll('[data-dgd-kalori]')].map(i => +i.value).sort((a, b) => a - b); st.kalori = r; kaydet(); const k = e.target.closest('.dgd-kalori'); k.style.setProperty('--dgd-a', r[0] / KALORI_UST * 100 + '%'); k.style.setProperty('--dgd-b', r[1] / KALORI_UST * 100 + '%'); k.querySelector('[data-dgd-kalori-deger]').textContent = `${r[0]} – ${r[1] >= KALORI_UST ? '1200+' : r[1]} kcal`; const c = el.querySelector('[data-goster] span'); if (c) c.textContent = ctaMetin(st); }
    });
    el.addEventListener('change', e => { if (e.target.matches('[data-dgd-kalori]')) ciz(); });
    el.addEventListener('keydown', e => { if (e.key !== 'Enter' || !e.target.matches('[data-dgd-ara]') || !e.target.value.trim()) return; e.preventDefault(); const q = e.target.value.trim(), ilk = katalogAra(q, 1)[0], ad = ilk && norm(ilk).startsWith(norm(q)) ? ilk : tamAd(q); sec(st, ad, katMod(u)); u.ara = ''; degis('[data-dgd-ara]'); });
    // Akordeonda tek grup açık (docs/55 kalite kuralı) — katalog grupları ve süzgeçler ayrı ayrı.
    el.addEventListener('toggle', e => { const d = e.target; if (d.tagName !== 'DETAILS' || !d.open || !d.matches('[data-dgd-ak]')) return; d.parentElement.querySelectorAll(':scope > details').forEach(x => { if (x !== d) x.open = false; }); }, true);
  }

  // ---------- Ana sayfa bloğu (kök ana-v3): sayfanın TEK İÇERİĞİ birebir (dış başlık ana sayfanın bölüm başlığı) ----------
  function blok(el, {hedef = 'uygulama/dolapta-ne-var.html', kok = '', bildir} = {}) {
    yukle(kok).then(() => {
      const st = oku(), u = {sekme: 'have', hmod: 'sev', ara: ''};
      const ciz = () => { el.innerHTML = icerik(st, u, {hedef}); };
      ciz();
      seciciBagla(el, st, u, {kaydet: () => yaz(st), yeniden: ciz, bildir: m => bildir?.(m)});
    });
  }

  window.DGDolap = {esc, fa, norm, esler, kullanir, temel, get T() { return T; }, get KAT() { return KAT; }, get HIZLI() { return HIZLI; }, get ALERJEN() { return ALERJEN; }, get HASSAS() { return HASSAS; },
    ZORLUK, SURE, PROTEIN, KALORI_UST, HMOD, LISTE, bos, haricSayi, bosMu, suzgecSayi, populer, tarifSayisi, katalogAra, tamAd, sonuc, oku, yaz, nerede, sec,
    modSecici, araKutusu, cip, secimPanel, besinSuzgec, vakitSuzgec, dinle, yukle, haricPanel, katalog, suzgecler, icerik, seciciHtml, seciciBagla, blok};
})();
