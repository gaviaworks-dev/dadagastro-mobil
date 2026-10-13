/* DOLABIM ÇEKİRDEĞİ (yalnız ana ajan yazar; Beyar V4 madde E, docs/57 §2): Dolabım verisinin TEK kaynağı — Dolabım sayfası
   (ortak/sayfalar/dolabim.js) ve ana sayfa “Yakında bitecekler” bloğu (kök, dg-baglanti.js) aynı fonksiyonları kullanır. DG gerektirmez.
   localStorage `dg-dolabim` = {urunler: [{id, ad, katalog, miktar, birim, yer, skt, acildi, acilis, acikRaf, not}], gecmis: [{ad, sonuc, tarih}],
   bildirim: {gun, saat, acik}}. Kalan gün = min(SKT, açılış + açık raf ömrü) − bugün. Durum: taze (basari) / yaklaşıyor ≤ bildirim günü
   (uyari) / bugün (bugun = primary) / geçti (gecti = koyu domates) — ortak durum rozeti tonları (dg-not.css). Örnek dolap: gerçek katalog
   ürünleri, tarihler bugüne göre. Görsel: canlı sitenin gerçek malzeme görseli (assets/malzeme/<slug>.webp). */
(() => {
  if (window.DGDolabim) return;
  const iki = n => String(n).padStart(2, '0');
  const iso = (d = new Date()) => `${d.getFullYear()}-${iki(d.getMonth() + 1)}-${iki(d.getDate())}`;
  const gunEkle = (t, n) => { const d = new Date(t + 'T12:00:00'); d.setDate(d.getDate() + Number(n)); return iso(d); };
  const fark = (a, b) => Math.round((Date.parse(a + 'T12:00:00') - Date.parse(b + 'T12:00:00')) / 864e5);
  const sonGun = u => [u.skt, u.acildi && u.acilis && u.acikRaf ? gunEkle(u.acilis, u.acikRaf) : ''].filter(Boolean).sort()[0] || '';
  const kalanGun = (u, bugun = iso()) => { const s = sonGun(u); return s ? fark(s, bugun) : null; };
  const oku = () => { try { const d = JSON.parse(localStorage.getItem('dg-dolabim')); return {urunler: [], gecmis: [], bildirim: {gun: 2, saat: '09:00', acik: true}, ...(d || {})}; } catch { return {urunler: [], gecmis: [], bildirim: {gun: 2, saat: '09:00', acik: true}}; } };
  // Kalan günü eşik (gün) ve altında olan ilk n ürün (geçmiş olanlar dahil), en acil önce.
  const yakindakiler = (n = 3, esik = 3, d = oku(), bugun = iso()) => (d.urunler || []).map(u => ({...u, kalan: kalanGun(u, bugun)})).filter(u => u.kalan != null && u.kalan <= esik).sort((a, b) => a.kalan - b.kalan).slice(0, n);
  // Durum (rozet tonu + kısa metin + ikon); ikonlar FA solid.
  const durum = (u, esik = 2, bugun = iso()) => { const k = kalanGun(u, bugun); if (k == null) return {k, ton: 'notr', ad: 'Tarih yok', ikon: 'calendar'};
    if (k < 0) return {k, ton: 'gecti', ad: `${-k} gün geçti`, ikon: 'circle-exclamation'};
    if (k === 0) return {k, ton: 'bugun', ad: 'Bugün', ikon: 'bell'};
    if (k <= esik) return {k, ton: 'uyari', ad: `${k} gün kaldı`, ikon: 'hourglass-half'};
    return {k, ton: 'basari', ad: `${k} gün`, ikon: 'circle-check'}; };
  // Malzeme görseli (katalog adından; Dolapta Ne Var ile aynı dosya adı kuralı).
  const TRK = {'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'};
  const gorsel = (u, kok = '') => u.katalog ? `${kok}assets/malzeme/${String(u.katalog).replace(/[çğıöşüâîûÇĞİIÖŞÜ]/g, c => TRK[c]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.webp` : '';
  const ornekVeri = (bugun = iso()) => { const gun = n => gunEkle(bugun, n); return ({bildirim: {gun: 2, saat: '09:00', acik: true}, urunler: [
    {id: 'sut', ad: 'Süt', katalog: 'Süt', miktar: '1', birim: 'L', yer: 'buzdolabi', skt: gun(6), acildi: true, acilis: gun(-3), acikRaf: 5, not: 'Kahvaltı ve sütlaç için'},
    {id: 'yogurt', ad: 'Yoğurt', katalog: 'Yoğurt', miktar: '1', birim: 'kg', yer: 'buzdolabi', skt: gun(1), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'beyaz-peynir', ad: 'Beyaz Peynir', katalog: 'Beyaz Peynir', miktar: '500', birim: 'g', yer: 'buzdolabi', skt: gun(40), acildi: true, acilis: gun(-4), acikRaf: 7, not: 'Salamurasında saklanıyor'},
    {id: 'tavuk-gogsu', ad: 'Tavuk Göğsü', katalog: 'Tavuk Göğsü', miktar: '600', birim: 'g', yer: 'buzdolabi', skt: gun(0), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'ispanak', ad: 'Ispanak', katalog: 'Ispanak', miktar: '1', birim: 'demet', yer: 'buzdolabi', skt: gun(-1), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'domates', ad: 'Domates', katalog: 'Domates', miktar: '1', birim: 'kg', yer: 'buzdolabi', skt: gun(5), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'yumurta', ad: 'Yumurta', katalog: 'Tavuk Yumurtası', miktar: '10', birim: 'adet', yer: 'buzdolabi', skt: gun(18), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'tereyagi', ad: 'Tereyağı', katalog: 'Tereyağı', miktar: '250', birim: 'g', yer: 'buzdolabi', skt: gun(60), acildi: true, acilis: gun(-10), acikRaf: 30, not: ''},
    {id: 'kiyma', ad: 'Kıyma', katalog: 'Kıyma', miktar: '500', birim: 'g', yer: 'dondurucu', skt: gun(75), acildi: false, acilis: null, acikRaf: null, not: 'Köfte için porsiyonlandı'},
    {id: 'bezelye', ad: 'Dondurulmuş bezelye', katalog: 'Bezelye', miktar: '450', birim: 'g', yer: 'dondurucu', skt: gun(120), acildi: false, acilis: null, acikRaf: null, not: ''},
    {id: 'mercimek', ad: 'Kırmızı mercimek', katalog: 'Mercimek', miktar: '1', birim: 'kg', yer: 'kiler', skt: gun(210), acildi: true, acilis: gun(-20), acikRaf: 180, not: ''},
    {id: 'makarna', ad: 'Makarna', katalog: 'Makarna', miktar: '500', birim: 'g', yer: 'kiler', skt: gun(300), acildi: false, acilis: null, acikRaf: null, not: ''}],
    gecmis: (() => { const ay = bugun.slice(0, 8) + '01', t = n => (gun(-n) < ay ? ay : gun(-n));
      return [['Kaşar Peyniri', 'tuketildi', 1], ['Süt', 'tuketildi', 2], ['Yoğurt', 'tuketildi', 3], ['Maydanoz', 'atildi', 4], ['Tavuk But', 'tuketildi', 5], ['Kefir', 'tuketildi', 7], ['Lor Peyniri', 'atildi', 8], ['Domates', 'tuketildi', 9]].map(([ad, sonuc, n]) => ({ad, sonuc, tarih: t(n)})); })()}); };
  window.DGDolabim = {oku, kalanGun, sonGun, yakindakiler, durum, gorsel, ornekVeri, iso, gunEkle};
})();
