/* DOLABIM ÇEKİRDEĞİ (yalnız ana ajan yazar; Beyar V4 madde E, docs/57 §2): Dolabım verisinin TEK kaynağı — Dolabım sayfası
   (ortak/sayfalar/dolabim.js) ve ana sayfa “Yakında bitecekler” bloğu (kök, dg-baglanti.js) aynı fonksiyonları kullanır. DG gerektirmez.
   localStorage `dg-dolabim` = {urunler: [{id, ad, katalog, miktar, birim, yer, takip, skt, acildi, acilis, acikRaf, eklenme, tazelik, not}],
   gecmis: [{ad, sonuc, tarih}], bildirim: {gun, saat, acik}}.
   İki takip türü (Beyar, 13 Ekim — “taze ürünün paket SKT'si olmaz”):
   · takip 'paket' → son gün = min(SKT, açılış + açık raf ömrü);
   · takip 'taze' (sebze, meyve, yeşillik, taze et/balık) → son gün = eklenme + tazelik (önerilen tüketim süresi, gün); etiket “X gün içinde tüket”.
   Eski kayıt (takip yok) = 'paket'. Durum: taze/yeterli (basari) / yaklaşıyor ≤ bildirim günü (uyari) / bugün (bugun) / geçti (gecti) — ortak durum
   rozeti tonları. Sıralama (sirala): süresi geçmemişler kalan güne göre, geçenler sonda (liste ilk satırı “geçti” olmaz). Örnek dolap: gerçek katalog
   ürünleri, tarihler bugüne göre. Görsel: canlı sitenin gerçek malzeme görseli (assets/malzeme/<slug>.webp). */
(() => {
  if (window.DGDolabim) return;
  const iki = n => String(n).padStart(2, '0');
  const iso = (d = new Date()) => `${d.getFullYear()}-${iki(d.getMonth() + 1)}-${iki(d.getDate())}`;
  const gunEkle = (t, n) => { const d = new Date(t + 'T12:00:00'); d.setDate(d.getDate() + Number(n)); return iso(d); };
  const fark = (a, b) => Math.round((Date.parse(a + 'T12:00:00') - Date.parse(b + 'T12:00:00')) / 864e5);
  const tazeMi = u => u.takip === 'taze';
  const sonGun = u => tazeMi(u) ? (u.eklenme && u.tazelik ? gunEkle(u.eklenme, u.tazelik) : '') : [u.skt, u.acildi && u.acilis && u.acikRaf ? gunEkle(u.acilis, u.acikRaf) : ''].filter(Boolean).sort()[0] || '';
  const kalanGun = (u, bugun = iso()) => { const s = sonGun(u); return s ? fark(s, bugun) : null; };
  const oku = () => { try { const d = JSON.parse(localStorage.getItem('dg-dolabim')); return {urunler: [], gecmis: [], bildirim: {gun: 2, saat: '09:00', acik: true}, ...(d || {})}; } catch { return {urunler: [], gecmis: [], bildirim: {gun: 2, saat: '09:00', acik: true}}; } };
  // Kalan günü eşik (gün) ve altında olan ilk n ürün (geçmiş olanlar dahil), en acil önce.
  // Sıralama: süresi geçmemişler kalan güne göre (en acil önce), süresi geçenler sonda (en yeni geçen önce), tarihsizler en sonda.
  const sira = k => k == null ? [2, 0] : k < 0 ? [1, -k] : [0, k];
  const sirala = (urunler, bugun = iso()) => [...urunler].sort((a, b) => { const x = sira(kalanGun(a, bugun)), y = sira(kalanGun(b, bugun)); return x[0] - y[0] || x[1] - y[1]; });
  // Kalan günü eşik (gün) ve altında olan ilk n ürün (geçenler sonda), en acil önce.
  const yakindakiler = (n = 3, esik = 3, d = oku(), bugun = iso()) => sirala((d.urunler || []).filter(u => { const k = kalanGun(u, bugun); return k != null && k <= esik; }), bugun).slice(0, n).map(u => ({...u, kalan: kalanGun(u, bugun)}));
  // Durum (rozet tonu + kısa metin + ikon); ikonlar FA solid.
  // Taze üründe metin “X gün içinde tüket” / “Bugün tüket” / “Tazeliği geçti”; paketli üründe “X gün kaldı” / “Bugün” / “X gün geçti”.
  const durum = (u, esik = 2, bugun = iso()) => { const k = kalanGun(u, bugun), t = tazeMi(u); if (k == null) return {k, ton: 'notr', ad: 'Tarih yok', ikon: 'calendar'};
    if (k < 0) return {k, ton: 'gecti', ad: t ? 'Tazeliği geçti' : `${-k} gün geçti`, ikon: 'circle-exclamation'};
    if (k === 0) return {k, ton: 'bugun', ad: t ? 'Bugün tüket' : 'Bugün', ikon: 'bell'};
    if (k <= esik) return {k, ton: 'uyari', ad: t ? `${k} gün içinde tüket` : `${k} gün kaldı`, ikon: 'hourglass-half'};
    return {k, ton: 'basari', ad: t ? `${k} gün içinde tüket` : `${k} gün`, ikon: t ? 'leaf' : 'circle-check'}; };
  // Takip önerisi (ürün ekle): katalog grubundan tür + önerilen tazelik süresi (gün). Kullanıcı değiştirebilir; paketli et “paket” seçilebilir.
  const YESIL = new Set(['Ispanak', 'Roka', 'Maydanoz', 'Dereotu', 'Nane', 'Taze Nane', 'Taze Soğan', 'Kişniş', 'Fesleğen', 'Taze Kekik', 'Frenk Soğanı', 'Biberiye', 'Pırasa', 'Lahana', 'Mantar']);
  const DAYANIKLI = new Set(['Patates', 'Soğan', 'Sarımsak', 'Havuç', 'Pancar', 'Kereviz', 'Turp', 'Elma', 'Armut', 'Limon', 'Portakal', 'Mandalina', 'Greyfurt', 'Nar', 'Karpuz', 'Kavun', 'Ananas', 'Hindistan Cevizi']);
  const TAZE_GRUP = {'Sebzeler': 5, 'Meyveler': 5, 'Kırmızı Et': 3, 'Tavuk ve Kümes Ürünleri': 2, 'Balık ve Deniz Ürünleri': 1};
  const takipOner = katalog => { const K = window.DGVERI?.dolapKatalog || [], g = K.find(x => (x.malzemeler || []).some(m => (m.ad || m) === katalog))?.grup;
    if (YESIL.has(katalog)) return {takip: 'taze', tazelik: 3};
    if (g && g in TAZE_GRUP && !/Yumurta|Sucuk|Pastırma|Kavurma/.test(katalog)) return {takip: 'taze', tazelik: DAYANIKLI.has(katalog) ? 14 : TAZE_GRUP[g]};
    return {takip: 'paket', tazelik: null}; };
  // Etiket satırı (ürün detayı/satır alt metni): neden bu son gün.
  const neden = (u, yaz = x => x) => { if (tazeMi(u)) return u.eklenme && u.tazelik ? `Taze ürün · ${yaz(u.eklenme)} eklendi · ${u.tazelik} gün tazelik` : 'Taze ürün';
    const s = sonGun(u); return u.acildi && u.acilis && u.acikRaf && s !== u.skt ? `Açıldıktan sonra ${u.acikRaf} gün · son gün ${yaz(s)}` : u.skt ? `Son kullanma ${yaz(u.skt)}` : ''; };
  // Malzeme görseli (katalog adından; Dolapta Ne Var ile aynı dosya adı kuralı).
  const TRK = {'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'};
  const gorsel = (u, kok = '') => u.katalog ? `${kok}assets/malzeme/${String(u.katalog).replace(/[çğıöşüâîûÇĞİIÖŞÜ]/g, c => TRK[c]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.webp` : '';
  const ornekVeri = (bugun = iso()) => { const gun = n => gunEkle(bugun, n); const P = {takip: 'paket', eklenme: null, tazelik: null}, T = (ekl, taz) => ({takip: 'taze', skt: null, acildi: false, acilis: null, acikRaf: null, eklenme: gun(ekl), tazelik: taz});
    return ({bildirim: {gun: 2, saat: '09:00', acik: true}, urunler: [
    {id: 'tavuk-gogsu', ad: 'Tavuk Göğsü (paketli)', katalog: 'Tavuk Göğsü', miktar: '600', birim: 'g', yer: 'buzdolabi', ...P, skt: gun(0), acildi: false, acilis: null, acikRaf: null, not: 'Market paketi; bugün pişir ya da dondur'},
    {id: 'yogurt', ad: 'Yoğurt', katalog: 'Yoğurt', miktar: '1', birim: 'kg', yer: 'buzdolabi', ...P, skt: gun(1), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'sut', ad: 'Süt', katalog: 'Süt', miktar: '1', birim: 'L', yer: 'buzdolabi', ...P, skt: gun(6), acildi: true, acilis: gun(-3), acikRaf: 5, not: 'Kahvaltı ve sütlaç için'},
    {id: 'ispanak', ad: 'Ispanak', katalog: 'Ispanak', miktar: '1', birim: 'demet', yer: 'buzdolabi', ...T(-1, 3), not: 'Pazardan'},
    {id: 'domates', ad: 'Domates', katalog: 'Domates', miktar: '1', birim: 'kg', yer: 'buzdolabi', ...T(-2, 7), not: ''},
    {id: 'maydanoz', ad: 'Maydanoz', katalog: 'Maydanoz', miktar: '1', birim: 'demet', yer: 'buzdolabi', ...T(0, 3), not: ''},
    {id: 'beyaz-peynir', ad: 'Beyaz Peynir', katalog: 'Beyaz Peynir', miktar: '500', birim: 'g', yer: 'buzdolabi', ...P, skt: gun(40), acildi: true, acilis: gun(-4), acikRaf: 7, not: 'Salamurasında saklanıyor'},
    {id: 'elma', ad: 'Elma', katalog: 'Elma', miktar: '1', birim: 'kg', yer: 'buzdolabi', ...T(-4, 14), not: ''},
    {id: 'yumurta', ad: 'Yumurta', katalog: 'Tavuk Yumurtası', miktar: '10', birim: 'adet', yer: 'buzdolabi', ...P, skt: gun(18), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'tereyagi', ad: 'Tereyağı', katalog: 'Tereyağı', miktar: '250', birim: 'g', yer: 'buzdolabi', ...P, skt: gun(60), acildi: true, acilis: gun(-10), acikRaf: 30, not: ''},
    {id: 'kiyma', ad: 'Kıyma', katalog: 'Kıyma', miktar: '500', birim: 'g', yer: 'dondurucu', ...P, skt: gun(75), acildi: false, acilis: null, acikRaf: null, not: 'Köfte için porsiyonlandı'},
    {id: 'bezelye', ad: 'Dondurulmuş bezelye', katalog: 'Bezelye', miktar: '450', birim: 'g', yer: 'dondurucu', ...P, skt: gun(120), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'mercimek', ad: 'Kırmızı mercimek', katalog: 'Mercimek', miktar: '1', birim: 'kg', yer: 'kiler', ...P, skt: gun(210), acildi: true, acilis: gun(-20), acikRaf: 180, not: ''},
    {id: 'makarna', ad: 'Makarna', katalog: 'Makarna', miktar: '500', birim: 'g', yer: 'kiler', ...P, skt: gun(300), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'krema', ad: 'Krema', katalog: 'Krema', miktar: '200', birim: 'ml', yer: 'buzdolabi', ...P, skt: gun(-1), acildi: false, acilis: null, acikRaf: null, not: ''}],
    gecmis: (() => { const ay = bugun.slice(0, 8) + '01', t = n => (gun(-n) < ay ? ay : gun(-n));
      return [['Kaşar Peyniri', 'tuketildi', 1], ['Süt', 'tuketildi', 2], ['Yoğurt', 'tuketildi', 3], ['Maydanoz', 'atildi', 4], ['Tavuk But', 'tuketildi', 5], ['Kefir', 'tuketildi', 7], ['Lor Peyniri', 'atildi', 8], ['Domates', 'tuketildi', 9]].map(([ad, sonuc, n]) => ({ad, sonuc, tarih: t(n)})); })()}); };
  window.DGDolabim = {oku, kalanGun, sonGun, tazeMi, sirala, yakindakiler, durum, takipOner, neden, gorsel, ornekVeri, iso, gunEkle};
})();
