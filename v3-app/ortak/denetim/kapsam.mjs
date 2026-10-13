// Kapsam matrisi (Beyar V4, madde F): bütün ekranlar × hâller → docs/58-kapsam.md. Kaynak: ortak/veri/sayfalar.js (galeri hâl çipleri) +
// ortak mekanizmalar (DG.sayfa: ?durum=yukleniyor|hata|baglanti-yok her uygulama sayfasında; DG.sonsuz + ?sayfa=yukleniyor|son|hata
// listelerde; aşağı çekip yenile: sekme/banner/liste sayfaları; genel ekranlar: oturum-doldu, guncelleme, bakim) + sayfa türü kuralları.
// Hücre: ✓ = galeride hâl çipi var · G = genel ekran / ortak mekanizma (her ekranda aynı, ayrı ekranı var) · — = gerekmez (gerekçe sütunda) ·
// ✗ = EKSİK. Kullanım (proje kökünden): node v3-app/ortak/denetim/kapsam.mjs
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
// Sayfa türü: liste (sayfalı veri), yliste (yerel liste, sayfasız), detay, form, statik (metin içerik), sistem (hata/genel ekran), akis (adımlı
// modül akışı), acilis (tanıtım), kok (onaylı kök ekran — runtime). Giriş gerektiren: uye.
const TUR = {ana: 'kok', liste: 'kok-liste', detay: 'kok', bilesenler: 'katalog', acilis: 'acilis', karsilama: 'acilis', tercihler: 'acilis', 'izin-bildirim': 'acilis', 'izin-kamera': 'acilis',
  giris: 'form', kayit: 'form', 'sifremi-unuttum': 'form', 'yeni-sifre': 'form', 'eposta-dogrula': 'durumsal', 'iki-adim': 'form', kategoriler: 'liste-tek',
  profil: 'detay', 'profil-duzenle': 'form', kaydettiklerim: 'liste', tariflerim: 'liste', 'tarif-ekle': 'form', 'alisveris-listesi': 'yliste', menulerim: 'yliste', rozetlerim: 'detay', pro: 'detay',
  'ne-pisirsem': 'akis', 'menuyu-pisir': 'akis', 'dolapta-ne-var': 'akis', tabaktan: 'kok-akis', videolar: 'liste', video: 'detay', 'puf-noktalari': 'liste', puf: 'detay', 'puf-ekle': 'form',
  sefler: 'liste', sef: 'detay', 'onur-listesi': 'liste', arama: 'liste', bildirimler: 'liste', ayarlar: 'form', destek: 'statik', 'gorus-bildir': 'form', yasal: 'statik', 'yasal-metin': 'statik',
  hakkimizda: 'statik', iletisim: 'form', kunye: 'statik', bulunamadi: 'sistem', 'yetki-yok': 'sistem', 'oturum-doldu': 'sistem', hata: 'sistem', bakim: 'sistem', 'baglanti-yok': 'sistem', guncelleme: 'sistem',
  'dolaptan-tarife': 'akis', dolabim: 'yliste'};
const UYE = new Set(['profil', 'profil-duzenle', 'kaydettiklerim', 'tariflerim', 'tarif-ekle', 'alisveris-listesi', 'menulerim', 'rozetlerim', 'puf-ekle', 'bildirimler', 'dolabim', 'dolaptan-tarife', 'tabaktan', 'ayarlar']);
const KAMERA = new Set(['tabaktan', 'dolaptan-tarife', 'dolabim', 'izin-kamera']), BILDIRIM = new Set(['izin-bildirim', 'ayarlar', 'dolabim']);
const SUT = ['Yükleniyor', 'Boş', 'Hata', 'Çevrimdışı', 'Daha fazla yükleniyor', 'Liste sonu', 'Yükleme hatası', 'Aşağı çek', 'Misafir', 'Oturum doldu', 'İzin: kamera', 'İzin: bildirim', 'İzin: konum', 'Form hatası', 'Başarı (toast)', 'Zorunlu güncelleme', 'Bakım'];
const satirlar = [], eksik = [];
for (const g of G) for (const s of g.sayfalar) {
  if (/^tt-/.test(s.id)) continue;   // Tabaktan akışının alt ekranları “tabaktan” satırında
  const ek = s.id === 'tabaktan' ? G.flatMap(x => x.sayfalar).filter(x => /^tt-/.test(x.id)).flatMap(x => [x.dosya, ...x.haller.map(h => h[1])]) : [];
  const q = [s.dosya, ...(s.ikili || []), ...s.haller.map(h => h[1]), ...ek].join('&');
  const var_ = re => re.test(q), tur = TUR[s.id] || '?', yerel = tur === 'yliste', liste = /liste/.test(tur) && !['liste-tek', 'yliste'].includes(tur), veri = !['form', 'statik', 'sistem', 'acilis', 'katalog', 'yliste', 'durumsal'].includes(tur) || ['profil-duzenle', 'ayarlar'].includes(s.id);
  const h = {}, neden = [];
  const koy = (k, deger, gerekce) => { h[k] = deger; if (deger === '—' && gerekce) neden.push(`${k}: ${gerekce}`); };
  // Yükleniyor / hata / çevrimdışı: veri getiren her ekran (DG.sayfa genel; kök ekranlar kendi iskeleti).
  koy('Yükleniyor', var_(/durum=yukleniyor|durum=uretiliyor|durum=analiz/) ? '✓' : veri ? '✗' : '—', yerel ? 'cihazdaki yerel liste, ağdan yüklenmez' : 'sabit içerik, ağdan veri yok');
  koy('Boş', var_(/durum=bos|bos=1|q=zzq|oturum=uye(?!&ornek)|durum=eslesme-yok|gecmis&uye=pro&bos/) ? '✓' : liste || tur === 'yliste' ? '✗' : '—', 'tek içerikli ekran (liste yok)');
  koy('Hata', var_(/durum=hata(?!-form)|durum=olusturulamadi|durum=bulanik/) ? '✓' : veri ? '✗' : tur === 'sistem' ? 'G' : '—', yerel ? 'yerel liste, ağ isteği yok' : 'ağ isteği yok');
  koy('Çevrimdışı', var_(/baglanti-yok|durum=baglanti/) ? '✓' : veri ? '✗' : 'G', '');
  const say = liste && !['kok-liste'].includes(tur) ? null : '—';   // kök liste kendi sayfalamasını kullanır (aşağıda)
  koy('Daha fazla yükleniyor', var_(/sayfa=yukleniyor/) ? '✓' : tur === 'kok-liste' ? '✗' : say || '✗', yerel ? 'yerel liste tamamı gösterilir' : 'sayfalı liste değil');
  koy('Liste sonu', var_(/sayfa=son/) ? '✓' : tur === 'kok-liste' ? '✗' : say || '✗', yerel ? 'yerel liste tamamı gösterilir' : 'sayfalı liste değil');
  koy('Yükleme hatası', var_(/sayfa=hata/) ? '✓' : tur === 'kok-liste' ? '✗' : say || '✗', yerel ? 'yerel liste tamamı gösterilir' : 'sayfalı liste değil');
  koy('Aşağı çek', var_(/yenile=1/) ? '✓' : liste || s.id === 'ana' || tur === 'kok-liste' ? '✗' : '—', yerel ? 'yerel liste, sunucudan tazelenmez' : 'akış/detay ekranı; yenilenecek akış yok');
  koy('Misafir', var_(/oturum=misafir|durum=misafir/) ? '✓' : UYE.has(s.id) ? '✗' : '—', 'herkese açık ekran, misafir ve üye aynı');
  koy('Oturum doldu', 'G', '');
  koy('İzin: kamera', var_(/izin=red|durum=izin/) || s.id === 'izin-kamera' ? '✓' : KAMERA.has(s.id) ? '✗' : '—', 'kamera kullanmıyor');
  koy('İzin: bildirim', var_(/izin=red|bildirim/) && BILDIRIM.has(s.id) || s.id === 'izin-bildirim' ? '✓' : BILDIRIM.has(s.id) ? '✗' : '—', 'bildirim izni istemiyor');
  koy('İzin: konum', '—', 'konum kullanan özellik yok (webde de yok)');
  koy('Form hatası', var_(/hata-form|durum=hata-form|durum=az|izin=red/) ? '✓' : tur === 'form' ? '✗' : '—', 'form yok');
  koy('Başarı (toast)', var_(/tamam|kayit=1|gonderildi|durum=basari/) ? '✓' : tur === 'form' ? '✗' : 'G', '');
  koy('Zorunlu güncelleme', 'G', ''); koy('Bakım', 'G', '');
  for (const k of SUT) if (h[k] === '✗') eksik.push(`${s.id} · ${k}`);
  satirlar.push(`| ${g.ad} › ${s.ad} (\`${s.id}\`, ${tur}) | ${SUT.map(k => h[k]).join(' | ')} | ${neden.join('; ')} |`);
}
const md = `# 58 · Kapsam matrisi — bütün ekranlar × hâller (Beyar V4, madde F)

Üretildi: \`node v3-app/ortak/denetim/kapsam.mjs\` (${new Date().toISOString().slice(0, 10)}). Kaynak: galeri hâl çipleri (ortak/veri/sayfalar.js) + ortak mekanizmalar.
✓ galeride hâl çipi var · G genel ekran / ortak mekanizma (oturum-doldu.html, guncelleme.html, bakim.html, baglanti-yok.html, hata.html; toast DG.bildir) ·
— gerekmez (gerekçe son sütunda) · ✗ eksik.

Ortak mekanizmalar: uygulama sayfalarında \`?durum=yukleniyor|hata|baglanti-yok\` DG.sayfa ile her sayfada çalışır (iskelet gerçek yerleşimi izler);
listelerde \`?sayfa=yukleniyor|son|hata\` (DG.sonsuz: alt yükleniyor göstergesi, liste sonu notu, yükleme hatası + Tekrar dene) ve \`?yenile=1\`
(aşağı çekip yenile göstergesi açık hâli).

| Ekran | ${SUT.join(' | ')} | Gerekmez gerekçesi |
|---|${SUT.map(() => '---').join('|')}|---|
${satirlar.join('\n')}

**Eksik hücre: ${eksik.length}**${eksik.length ? '\n\n' + eksik.map(x => '- ' + x).join('\n') : ''}
`;
fs.writeFileSync(path.join(V3, 'docs/58-kapsam.md'), md);
console.log('ekran', satirlar.length, '· eksik', eksik.length); if (eksik.length) console.log(eksik.join('\n'));
