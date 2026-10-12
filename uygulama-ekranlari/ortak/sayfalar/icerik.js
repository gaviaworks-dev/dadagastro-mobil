/* G4 · İçerik ve topluluk (docs/52 §3.4 V1–V4, P1–P3, C1–C4): Video Mutfağı, video oynatıcı, Püf Noktaları, püf detayı,
   püf ekle, Şefler, şef profili, Onur Listesi.
   Veri: DGVERI.videolar (6), DGVERI.puflar (6) + DGICERIK.puf (canlı kategori, metin, yorumlar), DGVERI.sefler (33), DGVERI.tarifler.
   Banner sayaçları, kategori adları, püf künyesi (yazar, tarih, etiket) canlı sayfalardan (12 Ekim, GET): /video-mutfagi,
   /puf-noktalari, /puf-noktalari/<slug>, /sefler, /sefler/<kullanici>, /onur-listesi, /puf-noktasi-ekle (+ ekle.js metinleri).
   docs/55 §2c: ekranda iç not yok; verisi olmayan bölüm çizilmez (seri, Haftanın Videosu, video türü/şefi, “Bunlar da işine yarar”,
   “Bu püfün geçtiği tarifler” — canlıdaki bu altı püfte de yok). Açıklamalar ortak/veri/sayfalar.js `aciklama` alanında.
   Yerel anahtarlar: dg-takip [kullanici] (ortak), dg-puf-kayit [slug], dg-puf-faydali [slug], dg-puf-taslak {…}. */
(() => {
  const {ic, I, esc, btn, bas, seg, alan, satir, durum, avatar, kart, store} = DG;
  const V = window.DGVERI, C = window.DGICERIK || {puf: {}};
  const qs = new URLSearchParams(location.search);
  const UP = 'A-ZÇĞİÖŞÜ';
  const CANLI = 'https://dadagastro.com';

  // Grup içi bağlantılar galeri test parametresini (?oturum) korur.
  const tasi = h => { const o = qs.get('oturum'); return o ? h + (h.includes('?') ? '&' : '?') + 'oturum=' + o : h; };
  const saniye = s => String(s).split(':').reduce((a, n) => a * 60 + Number(n), 0);
  const foto = g => `background-image:url('../${esc(g)}')`;
  const daha = (kalan, ad) => kalan > 0 ? `<div data-mt>${btn(`${ad} (${DG.sayi(kalan)})`, {tur: 'ikincil', tam: true, attrs: 'data-daha'})}</div>` : '';
  // Bölüm başlığı satırı: başlık solda, küçük öğe (sayı, çipler) sağda — tek küçük öğe kendi satırını kaplamaz (docs/55 §2i).
  const basSatir = (baslik, sag, id) => `<div class="dg-head"><h2${id ? ` id="${id}"` : ''}>${esc(baslik)}</h2>${sag || ''}</div>`;
  const saat = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + '.' + String(d.getMinutes()).padStart(2, '0'); };

  // =====================================================================
  // VİDEO (V1–V4)
  // =====================================================================
  // DGVERI.videolar = canlı “Sıradaki” (3) + “Dada Akış” kısa videoları (3). Kısa = 1 dakikadan kısa (canlı Dada Akış).
  const VID = V.videolar.map((v, no) => ({...v, no, kisa: saniye(v.sure) <= 60}));
  const videoKart = (v, buyuk) => DG.video(v, v.no, {buyuk}).replace(`href="${DG.videoLink(v.no)}"`, `href="${tasi(DG.videoLink(v.no))}"`);
  // Arşiv süzgeci: canlıda Tümü · Tarif · Teknik · Seri · Kısa. Türü veride olan yalnız Tümü ve Kısa çizilir.
  const ARSIV = [['tumu', 'Tümü', () => VID], ['kisa', 'Kısa', () => VID.filter(v => v.kisa)]];

  DG.sayfa('videolar', ctx => {
    const uzun = VID.filter(v => !v.kisa), kisa = VID.filter(v => v.kisa);
    let tur = ARSIV.some(([k]) => k === ctx.qs.get('tur')) ? ctx.qs.get('tur') : 'tumu', goster = 24;
    const liste = () => ARSIV.find(([k]) => k === tur)[2]();
    const arsivCiz = () => { const l = liste(); return `<div class="dgu-izgara">${l.slice(0, goster).map(v => videoKart(v)).join('')}</div>${daha(l.length - goster, 'Daha Fazla Video')}`; };
    const cips = `<div class="u-yatay" role="group" aria-label="Video türü">${ARSIV.map(([k, m, f]) => `<button class="dgu-chip" type="button" data-tur-sec="${k}" aria-pressed="${k === tur}">${esc(m)} <span class="dgu-chip-sayi">${f().length}</span></button>`).join('')}</div>`;
    const html = `
      <section class="dgu-bolum" aria-labelledby="ic-sira">${basSatir('Sıradaki', '', 'ic-sira')}<div class="dgu-yigin-12">${uzun[0] ? videoKart(uzun[0], true) : ''}<div class="dgu-serit" aria-label="Sıradaki diğer videolar">${uzun.slice(1).map(v => videoKart(v)).join('')}</div></div></section>
      ${kisa.length ? `<section class="dgu-bolum" aria-labelledby="ic-akis"><div class="dgu-yigin-12">${basSatir('Dada Akış', '<span class="t-meta c-muted">30 saniyede bir fikir</span>', 'ic-akis')}<div class="dgu-serit" aria-label="Kısa videolar">${kisa.map(v => videoKart(v)).join('')}</div></div></section>` : ''}
      <section class="dgu-bolum" aria-labelledby="ic-arsiv"><div class="dgu-yigin-12">${basSatir('Tüm videolar', cips, 'ic-arsiv')}<p class="c-muted">Tarif, teknik ve seri bölümleri — hepsi tek yerde.</p><div data-arsiv aria-live="polite">${arsivCiz()}</div></div></section>`;
    return {tur: 'banner', baslik: 'Video Mutfağı', menuAktif: 'videos', nav: 'none',
      banner: {baslik: 'Video Mutfağı', alt: 'Adım adım tarif videoları, şef teknikleri ve 30 saniyelik pratik fikirler — mutfakta hiç yalnız kalma.', gorsel: VID[0].gorsel, sayaclar: [['33', 'Video'], ['4', 'Seri'], ['6,3 Mn', 'İzlenme']]},
      html, sonra(root) {
        const kap = root.querySelector('[data-arsiv]'); if (!kap) return;
        root.addEventListener('click', e => {
          const s = e.target.closest('[data-tur-sec]');
          if (s) {
            tur = s.dataset.turSec; goster = 24;
            root.querySelectorAll('[data-tur-sec]').forEach(b => b.setAttribute('aria-pressed', b.dataset.turSec === tur));
            kap.innerHTML = arsivCiz(); window.DGCard?.veils?.(kap);
            const u = new URL(location.href); if (tur === 'tumu') u.searchParams.delete('tur'); else u.searchParams.set('tur', tur); history.replaceState(null, '', u);
            return;
          }
          if (e.target.closest('[data-daha]')) { goster += 24; kap.innerHTML = arsivCiz(); window.DGCard?.veils?.(kap); }
        });
      }};
  });

  // ---------- V2 · Video oynatıcı (web'de modal; kaynak yok → canlı metin “Video kaynağı henüz eklenmedi”) ----------
  DG.sayfa('video', ctx => {
    const no = ctx.qs.get('no'), v = no == null ? VID[0] : /^\d+$/.test(no) && VID[Number(no)] ? VID[Number(no)] : null;
    if (!v) return {tur: 'alt', baslik: 'Video', html: durum({ikon: I('video'), baslik: 'Video bulunamadı', metin: 'Bu video kaldırılmış ya da adresi değişmiş olabilir.', tam: true, eylem: btn('Video Mutfağı', {href: tasi('videolar.html')})})};
    const kilit = ctx.qs.get('ornek') === 'pro' && !ctx.pro;
    const digerleri = [...VID.filter(x => x !== v && x.kisa === v.kisa), ...VID.filter(x => x !== v && x.kisa !== v.kisa)];
    const html = `
      <div class="dgu-oynatici dgu-gulucuk" style="${foto(v.gorsel)}" role="group" aria-label="${esc(v.baslik)} oynatıcı">
        <button class="dgu-oynatici-dugme" type="button" data-oynat aria-label="${kilit ? 'Pro içerik: kilidi aç' : 'Videoyu oynat'}">${ic(kilit ? 'lock' : I('play'))}</button>
        ${kilit ? `<span class="dgu-rozet ic-oynatici-rozet">${ic(I('pro'))}Pro</span>` : ''}
        <p class="dgu-oynatici-durum" data-durum role="status" hidden>Video kaynağı henüz eklenmedi</p></div>
      <section class="dgu-ic dgu-yigin-12">
        <h1 class="t-section">${esc(v.baslik)}</h1>
        <div class="u-ara"><p class="u-yatay t-meta c-muted ic-video-bilgi"><span class="ic-meta">${ic(I('time'))}<span>${esc(v.sure)}</span></span><span class="ic-meta">${ic(I('views'))}<span>${esc(v.izlenme)} izlenme</span></span>${v.kisa ? `<span class="ic-meta">${ic(I('video'))}<span>Dada Akış</span></span>` : ''}</p>${btn('Paylaş', {tur: 'ikincil', boy: 'sm', ikon: I('share'), attrs: 'data-paylas'})}</div>
      </section>
      <section class="dgu-bolum">${bas(v.kisa ? 'Dada Akış’ta sıradaki' : 'Sıradaki', {href: tasi('videolar.html'), metin: 'Tümü', aria: 'Video Mutfağı — tüm videolar'})}<div class="dgu-serit">${digerleri.map(x => videoKart(x)).join('')}</div></section>`;
    return {tur: 'alt', baslik: v.baslik, baslikHeader: 'Video Mutfağı', menuAktif: 'videos', iskelet: false, html, sonra(root) {
      root.querySelector('[data-oynat]')?.addEventListener('click', () => {
        if (kilit) return DG.sheet({baslik: 'Bu içerik Pro üyelere özel', govde: `<p class="c-muted">${esc(v.baslik)} içeriğini izlemek için DadaGastro Pro'ya yükselt. Abone olmak bu içeriği açmaz — yalnız Pro açar.</p>`, ayak: `<div class="dgu-ikili">${btn('Belki sonra', {tur: 'ikincil', attrs: 'data-kapat'})}${btn('Pro\'ya Yükselt', {href: tasi('pro.html'), ikon: I('pro')})}</div>`});
        root.querySelector('[data-durum]').hidden = false; DG.bildir('Video kaynağı henüz eklenmedi', {ikon: I('info')});
      });
      root.querySelector('[data-paylas]')?.addEventListener('click', () => DG.paylas({baslik: v.baslik, url: CANLI + '/video-mutfagi'}));
    }};
  });

  // =====================================================================
  // PÜF NOKTALARI (P1–P3)
  // =====================================================================
  const PUF_KAT = ['Pişirme Püf Noktaları', 'Neden Olur?', 'Nasıl Düzeltilir?', 'Nasıl Saklanır?', 'Bozulduğu Nasıl Anlaşılır?', 'Yerine Ne Kullanılır?', 'Kaç Dakikada / Kaç Derecede Pişer?', 'Nasıl Seçilir ve Hazırlanır?', 'Yanına Ne Gider?', 'Kaç Kalori?', 'Malzeme Rehberi'];
  const PUF = V.puflar.map((p, sira) => ({...p, sira, kategori: C.puf[p.slug]?.kategori || ''}));
  const pufKart = p => DG.puf(p, {kategori: p.kategori}).replace(`href="${DG.pufLink(p.slug)}"`, `href="${tasi(DG.pufLink(p.slug))}"`);
  // Canlı püf künyesi (12 Ekim GET /puf-noktalari/<slug>: .art-hauthor, .art-hstat, .ptr etiketleri). DGICERIK.puf yazarı yalnız baş harf taşıyor.
  const PUF_KUNYE = {
    'cilek-bozuldugu-kuflendigi-nasil-anlasilir': {yazar: ['Erhan Koç', 'erhan.koc', 'Mutfak Meraklısı'], tarih: '04 Ağustos 2026', guncel: '12 Eylül 2026', etiket: ['çilek', 'meyve bozulması', 'küflenme', 'çilek saklama']},
    'yumurta-bozuk-mu-nasil-anlasilir': {yazar: ['Göktürk Adal', 'gokturk.adal', 'Komi'], tarih: '19 Temmuz 2026', guncel: '12 Eylül 2026', etiket: ['yumurta', 'gıda güvenliği', 'tazelik testi']},
    'ayran-bozuldugu-nasil-anlasilir': {yazar: ['Selim Çetin', 'selim.cetin', 'Mutfak Meraklısı'], tarih: '03 Ağustos 2026', guncel: '09 Eylül 2026', etiket: ['ayran', 'yoğurt bazlı içecek', 'gıda bozulması', 'süt ürünü saklama']},
    'karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir': {yazar: ['Ece Gürmen', 'ece.gurmen', 'Komi'], tarih: '26 Mart 2026', guncel: '12 Eylül 2026', etiket: ['karides', 'midye', 'deniz ürünleri', 'saklama', 'gıda güvenliği']},
    'mozzarella-peynir-kac-derecede-erir-pizza': {yazar: ['Ege Köylüoğlu', 'ege.koyluoglu', 'Aşçı Yamağı'], tarih: '13 Şubat 2026', guncel: '12 Eylül 2026', etiket: ['mozzarella', 'peynir eritme', 'pizza', 'fırın sıcaklığı']},
    'bir-dilim-cavdar-ekmegi-kac-kalori': {yazar: ['Merve Aktepe', 'merve.aktepe', 'Mutfak Meraklısı'], tarih: '18 Mayıs 2026', guncel: '10 Eylül 2026', etiket: ['çavdar ekmeği', 'tam tahıl', 'lif', 'kalori']}
  };
  // Canlı yorumlar (12 Ekim GET /puf-noktalari/<slug>: .rev-summary + .c-item; yazar, ünvan, puan, tarih, beğeni, Püf Sahibi yanıtları).
  const PUF_YORUM = {
    'ayran-bozuldugu-nasil-anlasilir': {"ozet":{"puan":4.0,"sayi":3,"oneri":"%67 faydalı buldu","dagilim":[[5,1],[4,1],[3,1],[2,0],[1,0]]},"yorumlar":[{"yazar":"Hülya Tunç","kullanici":"hulya.tunc","metin":"Şişenin şişip şişmediğine bakmayı hiç düşünmemiştim, bir keresinde fark edince gerçekten bozuk çıktı. Basit ama işe yarayan bir kontrol yöntemiymiş.","tarih":"2 ay önce","unvan":"Çömez Aşçı","begeni":1,"id":"4","puan":4},{"yazar":"Volkan Özdemir","kullanici":"volkan.ozdemir","metin":"Şişeden içip buzdolabına geri koyma alışkanlığım vardı, ayranın normalden çok daha hızlı, iki gün içinde ekşidiğini fark ettim. Bardağa boşaltmaya başlayınca süre gerçekten uzadı.","tarih":"2 ay önce","unvan":"Komi","id":"3","puan":3},{"yazar":"Mehmet Karakaya","kullanici":"mehmet.karakaya","metin":"Ev yapımı ayranı 2-3 gün diyorsunuz ama tuzu biraz fazla kaçırırsam bu süre uzar mı, yoksa tuz miktarının bozulmaya bir etkisi yok mu diye merak ediyorum.","tarih":"2 ay önce","unvan":"Mutfak Meraklısı","begeni":2,"id":"5","puan":5,"yanitlar":[{"yazar":"Selim","kullanici":"selim.cetin","metin":"Fazla tuz bozulmayı bir miktar yavaşlatabilir ama süreyi belirgin şekilde uzatacak kadar güvenilir bir yöntem değildir. Yine de 3-4 gün gibi biraz daha uzun bir süre deneyebilirsiniz, ama kokusunu ve kıvamını kontrol etmeden içmeyin.","tarih":"2 ay önce","sahip":true,"begeni":0,"id":"6185"}]}]},
    'bir-dilim-cavdar-ekmegi-kac-kalori': {"ozet":{"puan":3.7,"sayi":3,"oneri":"%67 faydalı buldu","dagilim":[[5,1],[4,1],[3,0],[2,1],[1,0]]},"yorumlar":[{"yazar":"Sinan Uysal","kullanici":"sinan.uysal","metin":"Çavdar ekmeği yerine bir süre tam buğday ekmeği denedim, tadı bana daha tanıdık geldi ama lif açısından çavdara göre biraz eksik kaldığını hissediyorum, kararsızım.","tarih":"3 ay önce","unvan":"Mutfak Meraklısı","id":"2","puan":2}]},
    'cilek-bozuldugu-kuflendigi-nasil-anlasilir': {"ozet":{"puan":4.0,"sayi":1,"oneri":"%100 faydalı buldu","dagilim":[[5,0],[4,1],[3,0],[2,0],[1,0]]},"yorumlar":[{"yazar":"İbrahim Yıldız","kullanici":"ibrahim.yildiz","metin":"Sirkeli suda yıkayıp iyice kuruttuktan sonra kâğıt havlulu kutuda sakladım, gerçekten bir hafta boyunca hiç küflenmedi. Öncesinde iki üç günde küf başlıyordu, fark çok net oldu.","tarih":"2 ay önce","unvan":"Çömez Aşçı","begeni":3,"id":"4","puan":4}]},
    'karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir': {"ozet":{"puan":4.0,"sayi":11,"oneri":"%91 faydalı buldu","dagilim":[[5,1],[4,9],[3,1],[2,0],[1,0]]},"yorumlar":[{"yazar":"Belgin Aydın","kullanici":"belgin.aydin","metin":"Karides yerine kalamar halkası kullanarak aynı soğuk su yöntemiyle çözdürdüm, süre neredeyse aynı çıktı ama kalamar biraz daha çabuk hazır oldu. Dondurucudan çıkarınca hemen pişirdim, güzel oldu.","tarih":"5 ay önce","unvan":"Çömez Aşçı","begeni":2,"id":"4","puan":4},{"yazar":"Barış Karaca","kullanici":"baris.karaca","metin":"Taze midye bulamadığım için önceden haşlanmış donmuş midyeyle denedim, buzdolabında bir gece bekletip çözdürdüm ve sonuç oldukça iyiydi. Pişmiş hâliyle iki gün saklama kuralı bu ürün için de geçerli mi?","tarih":"5 ay önce","unvan":"Çömez Aşçı","begeni":1,"id":"4","puan":4,"yanitlar":[{"yazar":"Ece","kullanici":"ece.gurmen","metin":"Evet, önceden haşlanmış donmuş midyeyi çözdürdükten sonra da aynı iki günlük süre geçerli; hatta zaten bir kez pişirilmiş olduğu için tazesine göre biraz daha toleranslı davranabilirsiniz.","tarih":"5 ay önce","sahip":true,"begeni":0,"id":"5996"}]},{"yazar":"Orhan Turan","kullanici":"orhan.turan1","metin":"Karidesi soğuk suda çözdürürken tarifte yazan 20-30 dakika yerine 40 dakikaya yakın sürdü, muhtemelen poşeti tam batırmamışımdır. Yine de doku gayet iyi çıktı, lastiksi bir his yoktu.","tarih":"6 ay önce","unvan":"Mutfak Meraklısı","id":"4","puan":4},{"yazar":"Selin Doğan","kullanici":"selin.dogan","metin":"Karides yerine kalamar halkası kullanarak aynı soğuk su yöntemiyle çözdürdüm, süre neredeyse aynı çıktı ama kalamar biraz daha çabuk hazır oldu. Dondurucudan çıkarınca hemen pişirdim, güzel oldu.","tarih":"5 ay önce","unvan":"Çömez Aşçı","begeni":2,"id":"4","puan":4},{"yazar":"Recep Acar","kullanici":"recep.acar","metin":"Taze midye bulamadığım için önceden haşlanmış donmuş midyeyle denedim, buzdolabında bir gece bekletip çözdürdüm ve sonuç oldukça iyiydi. Pişmiş hâliyle iki gün saklama kuralı bu ürün için de geçerli mi?","tarih":"5 ay önce","unvan":"Mutfak Meraklısı","begeni":2,"id":"4","puan":4,"yanitlar":[{"yazar":"Ece","kullanici":"ece.gurmen","metin":"Evet, önceden haşlanmış donmuş midyeyi çözdürdükten sonra da aynı iki günlük süre geçerli; hatta zaten bir kez pişirilmiş olduğu için tazesine göre biraz daha toleranslı davranabilirsiniz.","tarih":"5 ay önce","sahip":true,"begeni":0,"id":"5930"}]},{"yazar":"Levent Yaman","kullanici":"levent.yaman","metin":"Karidesi soğuk suda çözdürürken tarifte yazan 20-30 dakika yerine 40 dakikaya yakın sürdü, muhtemelen poşeti tam batırmamışımdır. Yine de doku gayet iyi çıktı, lastiksi bir his yoktu.","tarih":"5 ay önce","unvan":"Çömez Aşçı","begeni":4,"id":"4","puan":4},{"yazar":"Sinem Çamdalı","kullanici":"sinem.camdali","metin":"Karides yerine kalamar halkası kullanarak aynı soğuk su yöntemiyle çözdürdüm, süre neredeyse aynı çıktı ama kalamar biraz daha çabuk hazır oldu. Dondurucudan çıkarınca hemen pişirdim, güzel oldu.","tarih":"6 ay önce","unvan":"Komi","begeni":1,"id":"4","puan":4},{"yazar":"Emel Karaduman","kullanici":"emel.karaduman","metin":"Taze midye bulamadığım için önceden haşlanmış donmuş midyeyle denedim, buzdolabında bir gece bekletip çözdürdüm ve sonuç oldukça iyiydi. Pişmiş hâliyle iki gün saklama kuralı bu ürün için de geçerli mi?","tarih":"5 ay önce","unvan":"Aşçı Yamağı","begeni":2,"id":"4","puan":4,"yanitlar":[{"yazar":"Ece","kullanici":"ece.gurmen","metin":"Evet, önceden haşlanmış donmuş midyeyi çözdürdükten sonra da aynı iki günlük süre geçerli; hatta zaten bir kez pişirilmiş olduğu için tazesine göre biraz daha toleranslı davranabilirsiniz.","tarih":"5 ay önce","sahip":true,"begeni":0,"id":"5876"}]},{"yazar":"Sarp Bakırcıoğlu","kullanici":"sarp.bakircioglu","metin":"Karidesi soğuk suda çözdürürken tarifte yazan 20-30 dakika yerine 40 dakikaya yakın sürdü, muhtemelen poşeti tam batırmamışımdır. Yine de doku gayet iyi çıktı, lastiksi bir his yoktu.","tarih":"2 ay önce","unvan":"Komi","begeni":1,"id":"4","puan":4}]},
    'mozzarella-peynir-kac-derecede-erir-pizza': {"ozet":{"puan":4.3,"sayi":6,"oneri":"%100 faydalı buldu","dagilim":[[5,2],[4,4],[3,0],[2,0],[1,0]]},"yorumlar":[{"yazar":"Sevil Aslantaş","kullanici":"sevil.aslantas","metin":"Evde pizza taşı kullanmaya başladıktan sonra 250 derecede 8 dakika yeterli oldu, önceden fırın tepsisiyle aynı derecede 12 dakika gerekiyordu ve kenarlar kuruyordu. Taş, ısıyı çok daha eşit dağıtıyor.","tarih":"7 ay önce","unvan":"Komi","id":"4","puan":4},{"yazar":"Selim Yıldız","kullanici":"selim.yildiz","metin":"Evde pizza taşı kullanmaya başladıktan sonra 250 derecede 8 dakika yeterli oldu, önceden fırın tepsisiyle aynı derecede 12 dakika gerekiyordu ve kenarlar kuruyordu. Taş, ısıyı çok daha eşit dağıtıyor.","tarih":"6 ay önce","unvan":"Mutfak Meraklısı","id":"4","puan":4},{"yazar":"Şahnur Elmastaşoğlu","kullanici":"sahnur.elmastasoglu","metin":"Evde pizza taşı kullanmaya başladıktan sonra 250 derecede 8 dakika yeterli oldu, önceden fırın tepsisiyle aynı derecede 12 dakika gerekiyordu ve kenarlar kuruyordu. Taş, ısıyı çok daha eşit dağıtıyor.","tarih":"6 ay önce","unvan":"Komi","id":"4","puan":4}]},
    'yumurta-bozuk-mu-nasil-anlasilir': {"ozet":{"puan":4.0,"sayi":2,"oneri":"%100 faydalı buldu","dagilim":[[5,0],[4,2],[3,0],[2,0],[1,0]]},"yorumlar":[]}
  };
  // Anlamlı vurgular (AGENTS.md: malzeme, miktar, süre, sıcaklık, ayırt edici ifade). Metin değişmez; ilk geçişi kalın olur.
  // Sayı + birim (gün, ay, dakika, gram, kalori, °C) ayrıca otomatik kalın.
  const VURGU = {
    'cilek-bozuldugu-kuflendigi-nasil-anlasilir': ['beyaz veya gri tüylü küf lekeleri', 'küf sporları hızla yayılır', 'ekşimsi, mayalı veya alkole yakın bir koku', 'sapı yıkanana ve kullanılana kadar üzerinde bırakılmalıdır', 'kâğıt havlu serili bir kapta', 'alt kısımların da kontrol edilmesi'],
    'yumurta-bozuk-mu-nasil-anlasilir': ['su testiyle', 'dibe yatarak batıyorsa tazedir', 'keskin, kükürtsü veya çürük bir koku', 'sivri ucu aşağı gelecek şekilde', 'buzdolabı kapısında değil iç raflarda', 'kükürt içeren bileşikler', 'son kullanma tarihine bakıp'],
    'ayran-bozuldugu-nasil-anlasilir': ['ayrışma, aşırı ekşime, köpüklenme ve keskin bir koku', 'çalkalamayla düzelmemesi', 'beklenmedik bir köpüklenme veya gazlanma', 'amonyağa yakın', 'Ambalajın şişmiş olması', 'bardağa boşaltarak tüketmek', 'koruyucu madde içermediği'],
    'karides-midye-ve-diger-kabuklu-deniz-urunleri-nasil-saklanir': ['buzun üzerinde ya da buzdolabının en soğuk bölgesinde', 'aynı gün pişirilmelidir', 'file torbada', 'vurulunca kapanmayan midyeler', 'buz kaplaması', 'buzdolabına alıp bir gece bekletmektir', 'Oda sıcaklığında bekletilerek çözdürme ise önerilmez'],
    'mozzarella-peynir-kac-derecede-erir-pizza': ['altın benekler', 'kapaklı bir tavada', 'yağ ve su ayrışır', 'tam yağlı tazesi', 'Rendelenmiş mozzarella', 'Parmesan gibi sert ve düşük nemli peynirler', 'pizza taşı ya da önceden ısıtılmış tepsi'],
    'bir-dilim-cavdar-ekmegi-kac-kalori': ['lif ve tahıl bileşiminde', 'sindirim hızındadır', 'lif oranındaki artış', 'dilimi tartmak', 'tereyağı, reçel veya peynir', 'Glisemik indeksi', 'Ekşi mayayla']
  };
  const BIRIM = /\d+(?:[.,]\d+)?(?:-\d+(?:[.,]\d+)?)?\s?(?:°C|gün|ay|dakika|gram|kalori)[a-zçğıöşü]*/g;
  function vurgula(metin, ifadeler) {
    let h = esc(metin);
    for (const f of ifadeler) { const e = esc(f), i = h.indexOf(e); if (i > -1 && !/<b>[^<]*$/.test(h.slice(0, i))) { h = h.slice(0, i) + `<b>${e}</b>` + h.slice(i + e.length); ifadeler.splice(ifadeler.indexOf(f), 1); break; } }
    return h.split(/(<b>.*?<\/b>)/).map(p => p.startsWith('<b>') ? p : p.replace(BIRIM, m => `<b>${m}</b>`)).join('');
  }
  const cumleler = x => x.split(new RegExp(`(?<=\\?)\\s*(?=[${UP}])|(?<=[.!…])\\s+(?=[${UP}"“(0-9])`));
  // Canlı .art-intro tek <p>: soru cümleleri (ara başlıklar) metne bitişik. Soru cümlesi → blok başlığı, ardındaki cümleler → blok metni.
  function pufYapi(slug) {
    const bl = C.puf[slug].bloklar, yorumBas = bl.findIndex(([t, x]) => t === 'h2' && /^Yorumlar/.test(x));
    const icerik = yorumBas < 0 ? bl : bl.slice(0, yorumBas), yorum = yorumBas < 0 ? [] : bl.slice(yorumBas + 1);
    const giris = [], bloklar = []; let uyari = null;
    icerik.forEach(([t, x], i) => {
      if (t !== 'p') { bloklar.push({baslik: x, cumle: []}); return; }
      if (i > 0 && /tıbbi tavsiye/.test(x)) { uyari = x; return; }
      cumleler(x).forEach(c => {
        const ozet = c.match(/^(Kısa özet)\s+(.+)$/);
        if (ozet) { bloklar.push({baslik: ozet[1], cumle: [ozet[2]]}); return; }
        if (/\?$/.test(c) && c.length <= 120 && (giris.length || bloklar.length)) { bloklar.push({baslik: c, cumle: []}); return; }
        (bloklar.length ? bloklar[bloklar.length - 1].cumle : giris).push(c);
      });
    });
    const vur = [...(VURGU[slug] || [])];
    // Her paragrafa en çok bir ifade vurgusu; sayı + birim her yerde.
    const paragraf = cs => `<p>${vurgula(cs.join(' '), vur)}</p>`;
    const sayi = yorumBas < 0 ? 0 : Number((bl[yorumBas][1].match(/\d+/) || [0])[0]);
    const bosMetin = yorum.map(([, x]) => x).find(x => /henüz yorum yapılmamış/.test(x));
    return {giris: giris.length ? paragraf(giris) : '', bloklar: bloklar.filter(b => b.cumle.length).map(b => ({baslik: b.baslik, html: paragraf(b.cumle)})), uyari, sayi, bosMetin};
  }

  DG.sayfa('puf-noktalari', ctx => {
    let kat = PUF_KAT.includes(ctx.qs.get('kategori')) ? ctx.qs.get('kategori') : '';
    let sira = ctx.qs.get('sira') === 'okunan' ? 'okunan' : 'yeni', goster = 12;
    const bosHal = ctx.durum === 'bos';
    const liste = () => { if (bosHal) return []; const l = PUF.filter(p => !kat || p.kategori === kat); return sira === 'okunan' ? [...l].sort((a, b) => b.okunma - a.okunma) : [...l].sort((a, b) => a.sira - b.sira); };
    const sayilar = k => PUF.filter(p => p.kategori === k).length;
    const sonuc = () => {
      const l = liste();
      if (!l.length) return durum({ikon: I('tips'), baslik: 'Bu kategoride püf noktası bulunamadı', eylem: btn('Filtreyi Temizle', {tur: 'ikincil', attrs: 'data-kat=""'})});
      return `<div class="dgu-izgara">${l.slice(0, goster).map(pufKart).join('')}</div>${daha(l.length - goster, 'Daha fazla püf noktası')}`;
    };
    const baslikMetin = () => basSatir(kat || 'Tüm Püf Noktaları', `<span class="t-meta c-muted" aria-live="polite">${liste().length} püf noktası</span>`);
    const cips = () => [['', 'Tümü', bosHal ? 0 : PUF.length], ...PUF_KAT.map(k => [k, k, sayilar(k)])].map(([k, m, n]) => `<button class="dgu-chip" type="button" data-kat="${esc(k)}" aria-pressed="${k === kat}">${esc(m)} <span class="dgu-chip-sayi">${n}</span></button>`).join('');
    const html = `<section class="dgu-ic dgu-yigin">
        <p class="c-muted">Pilav neden tane tane olur, hamur neden kabarmaz, et neden sertleşir? Şeflerden ve toplulukta denenmiş <b>2163 püf noktası</b> — kategorilere ayrılmış, tek tek açıklanmış.</p>
        <div class="dgu-serit" role="group" aria-label="Kategori">${cips()}</div>
        ${seg('Sıralama', [['yeni', 'En Yeni'], ['okunan', 'En Çok Okunan']], sira)}
      </section>
      <section class="dgu-bolum ic-ust-sifir"><div class="dgu-yigin-12"><div data-baslik>${baslikMetin()}</div><div data-sonuc>${sonuc()}</div>
        <div data-mt>${btn('Püf noktası ekle', {tur: 'tonlu', ikon: I('add'), href: tasi('puf-ekle.html'), tam: true})}</div></div></section>`;
    return {tur: 'banner', baslik: 'Püf Noktaları', menuAktif: 'tips', nav: 'none',
      banner: {baslik: 'Püf Noktaları', alt: 'Ustaların küçük sırları', gorsel: PUF[1]?.gorsel || PUF[0].gorsel, sayaclar: [['2.163', 'Püf noktası'], ['11', 'Kategori'], ['85.089', 'Toplam okunma']]},
      html, sonra(root) {
        const s = root.querySelector('[data-sonuc]'), b = root.querySelector('[data-baslik]'); if (!s) return;
        const yenile = () => { s.innerHTML = sonuc(); b.innerHTML = baslikMetin(); const u = new URL(location.href); kat ? u.searchParams.set('kategori', kat) : u.searchParams.delete('kategori'); sira === 'okunan' ? u.searchParams.set('sira', 'okunan') : u.searchParams.delete('sira'); history.replaceState(null, '', u); };
        root.addEventListener('click', e => {
          const k = e.target.closest('[data-kat]');
          if (k) { kat = k.dataset.kat; goster = 12; root.querySelectorAll('.dgu-chip[data-kat]').forEach(x => x.setAttribute('aria-pressed', x.dataset.kat === kat)); yenile(); root.querySelector(`.dgu-chip[data-kat="${CSS.escape(kat)}"]`)?.scrollIntoView({block: 'nearest', inline: 'nearest'}); return; }
          const sg = e.target.closest('[data-seg]');
          if (sg) { sira = sg.dataset.seg; root.querySelectorAll('[data-seg]').forEach(x => x.setAttribute('aria-selected', x === sg)); yenile(); return; }
          if (e.target.closest('[data-daha]')) { goster += 12; s.innerHTML = sonuc(); }
        });
        root.querySelector('.dgu-chip[aria-pressed=true]')?.scrollIntoView({block: 'nearest', inline: 'nearest'});
      }};
  });

  // ---------- P2 · Püf detayı: canlı yapı (kırıntı/kategori · h1 · yazar · tarih · okunma · yorum · giriş · bloklar · uyarı · etiketler · paylaş · yorumlar) ----------
  DG.sayfa('puf', ctx => {
    const p = PUF.find(x => x.slug === ctx.qs.get('slug')) || (ctx.qs.get('slug') ? null : PUF[0]);
    if (!p || !C.puf[p.slug]) return {tur: 'alt', baslik: 'Püf noktası', html: durum({ikon: I('tips'), baslik: 'Püf noktası bulunamadı', metin: 'Bu püf noktası kaldırılmış ya da adresi değişmiş olabilir.', tam: true, eylem: btn('Püf Noktaları', {href: tasi('puf-noktalari.html')})})};
    const g = pufYapi(p.slug), k = PUF_KUNYE[p.slug], url = `${CANLI}/puf-noktalari/${p.slug}`;
    const kayit = store.get('puf-kayit', []).includes(p.slug), faydali = store.get('puf-faydali', []).includes(p.slug);
    // Yorumlar: ortak yorum bölümü (DG.yorumBolumu, tur 'puf'); canlı yazar/puan/yanıtlar PUF_YORUM'dan.
    const cy = PUF_YORUM[p.slug] || {};
    const yorumlar = DG.yorumBolumu({id: 'yorumlar', tur: 'puf', baslik: 'Yorumlar', sayi: g.sayi, ozet: cy.ozet, yorumlar: (cy.yorumlar || []).map(y => ({...y, yanitlar: y.yanitlar || []})), bos: g.bosMetin});
    // Yazar: ortak kompakt yazar satırı (DG.yazarSatir; K21) — canlı künye: ad, kademe, yayın ve güncelleme tarihi; okuma süresi metinden.
    const yazar = k ? (() => { const [ad, kul, unvan] = k.yazar, s = DG.sef(kul); return DG.yazarSatir({ad, kullanici: kul, kademe: unvan, href: s ? tasi(DG.sefLink(s)) : '', meta: [DG.kisaTarih(k.tarih), 'Güncellendi ' + DG.kisaTarih(k.guncel, {yil: k.guncel.slice(-4) !== k.tarih.slice(-4)}), DG.okumaSure(g.giris + g.bloklar.map(b => b.html).join(' '))]}); })() : '';
    // İçerik görünümü (?gorunum=; Beyar K21 — galeride durum çipi): liste = açıklama + numaralı blok listesi (varsayılan), duz = tek düz metin,
    // gorsel = başlık + görsel bloğu, tam = başlık + açıklama + görsel. Canlıda blok görseli olan püf yok (12 Ekim, 48 sayfa tarandı): görselli
    // blok yalnız ilk blokta, püfün kendi canlı kapak fotoğrafıyla; ekranda varyasyon adı yazmaz (yalnız galeri çipinde).
    const gor = ctx.qs.get('gorunum');
    const govdeHtml = gor === 'duz' ? `<div class="dgu-metin">${g.giris}${g.bloklar.map(b => b.html).join('')}</div>`
      : `${g.giris && gor !== 'gorsel' ? `<div class="dgu-metin">${g.giris}</div>` : ''}${g.bloklar.map((b, i) => DG.icerikBlok({no: i + 1, baslik: b.baslik, html: gor === 'gorsel' && !i ? '' : b.html, gorsel: (gor === 'gorsel' || gor === 'tam') && !i ? p.gorsel : '', aciklama: (gor === 'gorsel' || gor === 'tam') && !i ? p.baslik : '', id: 'b' + (i + 1), paylasUrl: `${url}#b${i + 1}`})).join('')}`;
    const html = `
      <section class="dgu-ic dgu-yigin">
        ${yazar}
        ${govdeHtml}
        ${g.uyari ? DG.ipucu({baslik: 'Okuyucunun Dikkatine', metin: g.uyari}) : ''}
        ${k?.etiket?.length ? `<div class="dgu-serit" aria-label="Etiketler"><span class="t-label c-muted ic-etiket-bas">${ic('tags')}Etiketler</span>${k.etiket.map(t => `<span class="dgu-chip">#${esc(t)}</span>`).join('')}</div>` : ''}
      </section>
      <div class="dgu-bolum">${yorumlar}</div>`;
    // Alt eylem çubuğu: kaydırınca belirir (ortak s.kayanBar; K21) — canlı yapışkan çubuğun eylemleri: Kaydet, Faydalı Buldum, Yorumlar, Paylaş.
    const kayanBar = {gorsel: p.gorsel, baslik: p.baslik, eylemler: [{ikon: I('save'), ad: kayit ? 'Kaydedildi' : 'Kaydet', attrs: 'data-puf-kaydet', basili: kayit}, {ikon: I('recommend'), ad: faydali ? 'Faydalı buldun' : 'Faydalı Buldum', attrs: 'data-faydali', basili: faydali}, {ikon: I('comments'), ad: 'Yorumlar', attrs: 'data-git-yorum', sayi: g.sayi}, {ikon: I('share'), ad: 'Paylaş', attrs: 'data-paylas'}]};
    return {tur: 'banner', geri: true, baslik: p.baslik, baslikHeader: '', menuAktif: 'tips', kayanBar, iskelet: false,
      banner: {baslik: p.baslik, alt: 'Mutfak Sırrı · ' + p.kategori, gorsel: p.gorsel, sayaclar: [[DG.sayi(p.okunma), 'okunma'], [String(g.sayi), 'yorum']]},
      html, sonra(root) {
        const toggle = (anahtar, el) => { const s = store.get(anahtar, []); const yeni = !s.includes(p.slug); store.set(anahtar, yeni ? [...s, p.slug] : s.filter(x => x !== p.slug)); el.setAttribute('aria-pressed', yeni); return yeni; };
        document.addEventListener('click', e => {
          if (e.target.closest('[data-git-yorum]')) { document.getElementById('yorumlar').scrollIntoView({behavior: motion.matches ? 'auto' : 'smooth'}); return; }
          if (e.target.closest('.dgu-bar [data-paylas]')) { DG.paylas({baslik: p.baslik, url}); return; }
          const kb = e.target.closest('[data-puf-kaydet]');
          if (kb) { if (!DG.uye()) return DG.kapi('kaydet'); const on = toggle('puf-kayit', kb); kb.setAttribute('aria-label', on ? 'Kaydedildi' : 'Kaydet'); DG.bildir(on ? 'Kaydedildi' : 'Kayıt kaldırıldı'); return; }
          const f = e.target.closest('[data-faydali]');
          if (f) { if (!DG.uye()) return DG.kapi('faydali'); const on = toggle('puf-faydali', f); f.setAttribute('aria-label', on ? 'Faydalı buldun' : 'Faydalı Buldum'); DG.bildir(on ? 'Faydalı buldun' : 'Geri alındı'); }
        });
      }};
  });

  // ---------- P3 · Püf ekle (canlı /puf-noktasi-ekle + ekle.js alan alan; docs/52 §10 parite tablosu) ----------
  DG.sayfa('puf-ekle', ctx => {
    const baslik = 'Püf noktası ekle';
    const tamam = () => `<div class="dgu-ic">${durum({ikon: 'circle-check', baslik: 'Püf noktan incelemeye gönderildi', metin: 'Editör ekibi püf noktanı okuyor. Sonuç ortalama 24–48 saat içinde bildirimle gelir; bu sürede içerik düzenlenemez. Görünürlük seçimin: Herkese açık.',
      eylem: `<div class="dgu-yigin-12 ic-genis">${DG.durumRozet('incelemede').replace('dgu-durum-rozet', 'dgu-durum-rozet ic-ortala')}${btn('Yeni püf noktası ekle', {href: tasi('puf-ekle.html'), ikon: I('add'), tam: true})}${btn('Püf noktalarıma dön', {tur: 'ikincil', ikon: 'folder-open', href: tasi('profil.html?sekme=puf'), tam: true})}</div>`})}</div>`;
    if (ctx.durum === 'tamam') return {tur: 'alt', baslik, html: tamam(), iskelet: false};
    // Misafir: giriş duvarı (canlı form misafire açık, gönderim girişe bağlı; docs/55 §2b).
    if (!ctx.uye) return {tur: 'alt', baslik, menuAktif: 'tips', iskelet: false, html: DG.girisDuvari({ikon: I('tips'), baslik: 'Püf noktası eklemek için giriş yap', metin: 'Mutfakta işe yarayan bir sırrı tek sayfada anlat. Editör incelemesi ortalama 24–48 saat sürer; sonuç bildirimle gelir.',
      sunar: [['lightbulb', 'Püf noktası künyesi', 'Başlık, konu ve kapak — püf noktanın listede görünen yüzü.'], ['align-left', 'İçerik', 'Püf noktasını başlık, paragraf ve görsel bloklarıyla anlat.'], ['paper-plane', 'Yayın', 'Editör incelemesi ortalama 24–48 saat sürer; sonuç bildirimle gelir.']]})};
    // ?ornek=1: gerçek bir püf noktasından (DGVERI + DGICERIK) doldurulmuş, cihaza yazılmayan dolu hal (açıklama galeri satırında).
    const ORNEK = ctx.qs.has('ornek'), op = PUF[0];
    const ornekTaslak = () => { const y = pufYapi(op.slug), duz = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'); return {baslik: op.baslik, kategori: op.kategori, metin: duz(y.giris), bloklar: y.bloklar.slice(0, 1).flatMap(b => [{tur: 'baslik', metin: b.baslik}, {tur: 'paragraf', metin: duz(b.html)}])}; };
    const taslak = ORNEK ? ornekTaslak() : store.get('puf-taslak', null) || {};
    const BLOK = {baslik: ['Başlık', 'heading'], paragraf: ['Paragraf', 'align-left'], gorsel: ['Görsel', 'image']};
    const SPEC = 'JPG, PNG, WebP, AVIF, HEIC/HEIF veya GIF · en çok 10 MB ve 16 MP · WebP olarak saklanır; GIF’in ilk karesi alınır.';
    const kartBas = (ikon, h, p, sag, id) => `<div class="dgu-yigin-8"><div class="u-ara"><h2 class="t-sub ic-etiket-bas" id="${id}">${ic(ikon)}${esc(h)}</h2>${sag || ''}</div>${p ? `<p class="t-meta c-muted">${esc(p)}</p>` : ''}</div>`;
    const html = `<form class="dgu-ic dgu-yigin ic-form" data-puf-form novalidate>
      <div class="dgu-yigin-8"><div class="u-ara"><p class="t-label c-deep ic-etiket-bas">${ic('lightbulb')}Şeflerden küçük sırlar</p><a class="dg-head__link" href="${tasi('profil.html?sekme=puf')}">Püf noktalarım ${ic(I('seeAll'))}</a></div><h1 class="t-page">Püf noktası ekle</h1><p class="c-muted">Mutfakta işe yarayan bir sırrı tek sayfada anlat. Başlığı yaz, blokları sırayla diz, kapak görselini ekle.</p></div>
      <section class="dgu-kart" aria-labelledby="ic-kunye">${kartBas('lightbulb', 'Püf noktası künyesi', 'Başlık, konu ve kapak — püf noktanın listede görünen yüzü.', '', 'ic-kunye')}
        ${alan({ad: 'baslik', etiket: 'Başlık', yer: 'Örnek: Pilavın taneleri nasıl ayrı ayrı olur?', deger: taslak.baslik || '', zorunlu: true, yardim: 'Soru ya da sonuç olarak yaz: “…nasıl olur?”, “…için şu işe yarar”. Aramada öne çıkar.'}).replace('<input ', '<input maxlength="80" ').replace(/<label[^>]*>.*?<\/label>/, m => `<div class="u-ara ic-etiket-satir">${m}<span class="dgu-yardim" data-sayac="baslik" aria-live="polite">${(taslak.baslik || '').length}/80</span></div>`)}
        ${DG.secAlan({ad: 'kategori', etiket: 'Kategori', yer: 'Kategori seç', secenekler: PUF_KAT.map(k => [k, k]), deger: taslak.kategori || '', zorunlu: true})}
        <div class="dgu-alan"><div class="u-ara ic-etiket-satir"><span class="dgu-etiket">Kapak görseli <span class="c-muted">(isteğe bağlı)</span></span><span class="dgu-yardim" data-gorsel-sayi>0 görsel</span></div>
          <label class="ic-yukle">${ic('cloud-arrow-up')}<b class="t-body">Kapak görselini seçmek için dokun</b><small class="t-meta">JPG, PNG, WebP, AVIF, HEIC/HEIF veya GIF · kapak en az 800px genişlik · en çok 10 MB ve 16 MP · WebP olarak saklanır; GIF’in ilk karesi alınır.</small><input class="dgu-sr" type="file" name="kapak" aria-label="Kapak görseli seç" accept=".jpg,.jpeg,.png,.webp,.avif,.heic,.heif,.gif,image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif,image/gif"></label>
          <div class="ic-galeri" data-galeri></div><p class="dgu-hata" data-kapak-not role="status" hidden></p><p class="dgu-yardim">Kapak, püf noktaları listesinde kartın görselidir. Birden çok görsel yüklersen yıldıza basarak kapağı değiştirebilirsin.</p></div>
      </section>
      <section class="dgu-kart" aria-labelledby="ic-metin-bas">${kartBas('pen-nib', 'Metin', 'Püf noktasını düz yazıyla anlatmak istersen buraya yaz. Blok listesine girmeyen uzun anlatım burada yaşar; ikisi birlikte yayımlanır.', '<span class="t-meta c-muted" data-kelime>0 kelime</span>', 'ic-metin-bas')}
        ${alan({ad: 'metin', etiket: 'Püf noktasının metni (metin veya içerik bloğu yeterli)', yer: 'Sırrı akıcı bir yazıyla anlat: neyi, neden, ne zaman yapıyorsun?', deger: taslak.metin || '', cok: true})}
      </section>
      <section class="dgu-kart" aria-labelledby="ic-blok-bas">${kartBas('align-left', 'İçerik', 'Püf noktasını başlık, paragraf ve görsel bloklarıyla anlat. Bloklar burada hangi sırayla duruyorsa sayfada da o sırayla çizilir.', '<span class="t-meta c-muted" data-blok-sayi>0 blok</span>', 'ic-blok-bas')}
        <div class="dgu-yigin-12" data-bloklar></div>
        <div class="ic-blok-ekle">${Object.entries(BLOK).map(([k, [m, i]]) => btn(m + ' ekle', {tur: 'ikincil', boy: 'sm', ikon: i, attrs: `data-blok-ekle="${k}"`})).join('')}</div>
      </section>
      <section class="dgu-kart is-gri" aria-labelledby="ic-hazir-bas">${kartBas('paper-plane', 'Paylaşıma hazır', 'Onaya göndermeden önce püf noktanın listede nasıl görüneceğine bak. Eksik satıra tıklarsan seni ilgili alana götürür.', '<span class="dgu-rozet is-notr" data-hazir-sayi>0/3 hazır</span>', 'ic-hazir-bas')}
        <div class="ic-onizle" data-onizle></div>
        <ul class="dgu-satirlar" data-kontrol></ul>
        <p class="dgu-yardim ic-madde">${ic('shield-halved')}<span>Kapak görseli zorunlu değil; yoksa listede kategori rengiyle çizilir.</span></p>
      </section>
      <section class="dgu-kart" aria-labelledby="ic-yayin-bas">${kartBas('paper-plane', 'Yayın', '', DG.durumRozet('yayinda', {ad: 'Herkese açık', ikon: 'globe'}), 'ic-yayin-bas')}
        <fieldset class="dgu-yigin-8 ic-alan-grubu"><legend class="dgu-yardim">Görünürlük</legend>${DG.secim('gorunurluk', '<b>Herkese açık</b><br><small class="t-meta c-muted">Püf noktaları listesinde ve aramada herkes görebilir.</small>', {tur: 'radio', deger: 'herkes', secili: true})}</fieldset>
        <p class="t-meta ic-madde" role="status">${ic('globe')}<span>Herkese açık yayımlanır. Yayına alındığında arama sonuçlarında ve listelerde herkes görebilir.</span></p>
        <p class="u-yatay t-meta c-muted"><span class="ic-meta">${ic('layer-group')}<span data-yayin-blok>0 blok</span></span><span class="ic-meta">${ic('image')}<span data-yayin-gorsel>0 görsel</span></span></p>
        <p class="dgu-hata" data-ozet role="alert" hidden></p>
        <div class="dgu-ikili">${btn('Taslak kaydet', {tur: 'ikincil', ikon: 'floppy-disk', attrs: 'data-taslak'})}<button class="dgu-btn" type="submit">${ic('paper-plane')}<span>Onaya gönder</span></button></div>
        <p class="dgu-yardim" data-taslak-not role="status" hidden></p>
        <p class="dgu-yardim">Editör incelemesi ortalama 24–48 saat sürer; sonuç bildirimle gelir.</p>
      </section>
      <section class="dgu-bilgi" aria-labelledby="ic-iyi"><p class="t-label" id="ic-iyi">${ic('wand-magic-sparkles')}İyi bir püf noktası · Editör ekibinden</p><ul class="dgu-yigin-8 t-meta">${[['Tek bir fikir.', 'Bir püf = bir sır; tarifin tamamını değil, o küçük dokunuşu anlat.'], ['Başlık somut olsun.', '“Pilav sırrı” yerine “Pilavın taneleri nasıl ayrı ayrı olur?”.'], ['Nedenini söyle.', 'İşe yarayan püfler neden işe yaradığını da açıklar.'], ['Bir kare yeter.', 'Sonucu gösteren tek aydınlık görsel, on cümleden iyidir.']].map(([b, x]) => `<li class="ic-madde">${ic('circle-check')}<span><b>${esc(b)}</b> ${esc(x)}</span></li>`).join('')}</ul>
        <p class="t-meta ic-madde">${ic('shield-halved')}<span>Paylaştığın metin ve görseller kendi çalışman olmalı. Başkasına ait içerikler incelemede elenir.</span></p></section>
    </form>`;
    return {tur: 'alt', baslik, menuAktif: 'tips', iskelet: false, html, sonra(root) {
      const f = root.querySelector('[data-puf-form]'); if (!f) return;
      let bloklar = (taslak.bloklar || []).map(b => ({...b, id: Math.random().toString(36).slice(2, 8)}));
      let gorseller = ORNEK ? ['../' + op.gorsel] : [], kapak = 0, kirli = false;
      const blokKap = f.querySelector('[data-bloklar]');
      const blokCiz = () => {
        blokKap.innerHTML = bloklar.length ? bloklar.map((b, i) => `<div class="ic-blok" data-blok="${b.id}" data-tur="${b.tur}"><div class="u-ara"><span class="ic-etiket-bas"><span class="dgu-blok-no" aria-hidden="true">${i + 1}</span><span class="t-label c-muted ic-etiket-bas">${ic(BLOK[b.tur][1])}${BLOK[b.tur][0]}</span></span><span class="ic-blok-eylem"><button class="dgu-ibtn" type="button" data-tasi="-1" title="Yukarı taşı" aria-label="Bloğu yukarı taşı" ${i ? '' : 'disabled'}>${ic('chevron-up')}</button><button class="dgu-ibtn" type="button" data-tasi="1" title="Aşağı taşı" aria-label="Bloğu aşağı taşı" ${i < bloklar.length - 1 ? '' : 'disabled'}>${ic('chevron-down')}</button><button class="dgu-ibtn" type="button" data-sil title="Bloğu sil" aria-label="Bloğu sil">${ic(I('delete'))}</button></span></div>
          ${b.tur === 'gorsel' ? `<label class="ic-yukle is-kucuk"${b.url ? ` style="background-image:url('${esc(b.url)}')"` : ''}>${b.url ? '' : `${ic('cloud-arrow-up')}<b class="t-meta">Tek görsel seç · yeni seçim öncekinin yerini alır</b><small class="t-meta">${SPEC}</small>`}<input class="dgu-sr" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif,image/gif" data-blok-dosya aria-label="Blok görseli seç"></label><div class="dgu-girdi"><input type="text" data-blok-aciklama value="${esc(b.aciklama || '')}" placeholder="Görsel açıklaması (isteğe bağlı)" aria-label="Görsel açıklaması"></div>`
            : b.tur === 'baslik' ? `<div class="dgu-alan${b.hata ? ' is-hata' : ''}"><div class="dgu-girdi"><input type="text" maxlength="80" data-blok-metin value="${esc(b.metin || '')}" placeholder="Ara başlık — okuyucu göz gezdirirken buradan yakalar" aria-label="Ara başlık metni"${b.hata ? ' aria-invalid="true"' : ''}></div>${b.hata ? `<p class="dgu-hata">${ic(I('error'))}Ara başlığı yaz ya da bloğu sil.</p>` : ''}</div>`
            : `<div class="dgu-girdi"><textarea data-blok-metin placeholder="Püf noktasını anlat — tek bir fikir, net cümlelerle." aria-label="Paragraf metni">${esc(b.metin || '')}</textarea></div>`}</div>`).join('')
          : `<div class="dgu-kart is-gri ic-blok-bos"><b class="t-body">Henüz blok yok</b><p class="t-meta c-muted">İlk bloğu aşağıdan ekle. Paragrafla başlamak en iyisi: bir püf = bir fikir.</p></div>`;
        hazir();
      };
      const kontrol = () => { const b = f.baslik.value.trim(), k = f.kategori.value, m = f.metin.value.trim() || bloklar.some(x => x.tur === 'gorsel' ? x.url : (x.metin || '').trim()); return [['baslik', 'Başlık yazıldı', 'Listede kartın adı bu olur', !!b], ['kategori', 'Kategori seçildi', 'Püf noktan doğru rafta görünür', !!k], ['metin', 'Metin veya içerik bloğu var', 'Boş püf noktası incelemeden geçmez', !!m]]; };
      const hazir = () => {
        const k = kontrol(), n = k.filter(x => x[3]).length, nb = bloklar.length, ng = gorseller.length + bloklar.filter(b => b.tur === 'gorsel' && b.url).length;
        k.forEach(([ad, , , ok]) => { if (ok && f.querySelector(`[name="${ad}"]`).closest('.is-hata')) hataYaz(ad, ''); });
        const r = f.querySelector('[data-hazir-sayi]'); r.textContent = `${n}/3 hazır`; r.classList.toggle('is-notr', n < 3);
        f.querySelector('[data-kontrol]').innerHTML = k.map(([ad, m, alt, ok]) => `<li>${satir({ikon: ok ? 'circle-check' : 'circle', baslik: m, alt, sag: ok ? '' : I('rowNext'), attrs: `data-git="${ad}"`, sinif: ok ? 'ic-ok' : ''})}</li>`).join('');
        const g = gorseller[kapak];
        f.querySelector('[data-onizle]').innerHTML = `<div class="dgu-puf"><span class="dgu-puf-foto${g ? '' : ' ic-onizle-bos'}"${g ? ` style="background-image:url('${esc(g)}')"` : ''}>${g ? '' : `${ic('image')}<small>Kapak görseli yok</small>`}</span><span class="dgu-puf-metin"><small>${esc(f.kategori.value || 'Kategori seçilmedi')}</small><b>${esc(f.baslik.value.trim() || 'Başlığın burada görünecek')}</b><span>${nb} blok · Herkese açık</span></span></div>`;
        f.querySelector('[data-sayac="baslik"]').textContent = `${f.baslik.value.length}/80`;
        f.querySelector('[data-kelime]').textContent = f.metin.value.trim().split(/\s+/).filter(Boolean).length + ' kelime';
        f.querySelector('[data-blok-sayi]').textContent = nb + ' blok'; f.querySelector('[data-yayin-blok]').textContent = nb + ' blok'; f.querySelector('[data-yayin-gorsel]').textContent = ng + ' görsel';
      };
      const kapakOlc = () => { const not = f.querySelector('[data-kapak-not]'), g = gorseller[kapak]; not.hidden = true; if (!g) return; const im = new Image(); im.onload = () => { if (im.naturalWidth < 800) { not.innerHTML = `${ic(I('error'))}Kapak için en az 800px gerekli (${im.naturalWidth}px)`; not.hidden = false; } }; im.src = g; };
      const galeriCiz = () => {
        f.querySelector('[data-galeri]').innerHTML = gorseller.map((u, i) => `<span class="ic-galeri-oge" style="background-image:url('${esc(u)}')"><button class="dgu-ibtn" type="button" data-kapak="${i}" aria-pressed="${i === kapak}" aria-label="${i + 1}. görseli kapak yap">${ic('star')}</button><button class="dgu-ibtn" type="button" data-gorsel-sil="${i}" aria-label="${i + 1}. görseli kaldır">${ic(I('close'))}</button></span>`).join('');
        f.querySelector('[data-gorsel-sayi]').textContent = gorseller.length + ' görsel'; kapakOlc(); hazir();
      };
      const odak = ad => ad === 'kategori' ? f.querySelector('#f-kategori') : f.elements[ad];
      const hataYaz = (ad, msg) => { const a = f.querySelector(`[name="${ad}"]`).closest('.dgu-alan'); a.classList.toggle('is-hata', !!msg); a.querySelector(':scope > .dgu-hata')?.remove(); a.querySelector('input,select,textarea').setAttribute('aria-invalid', !!msg); if (msg) a.querySelector('.dgu-girdi').insertAdjacentHTML('afterend', `<p class="dgu-hata" role="alert">${ic(I('error'))}${esc(msg)}</p>`); };
      const veri = () => ({baslik: f.baslik.value.trim(), kategori: f.kategori.value, metin: f.metin.value.trim(), bloklar: bloklar.filter(b => b.tur !== 'gorsel').map(({tur, metin}) => ({tur, metin}))});
      const ozet = f.querySelector('[data-ozet]');
      const taslakKaydet = () => { if (!ORNEK) store.set('puf-taslak', veri()); kirli = false; const n = f.querySelector('[data-taslak-not]'); n.textContent = 'Taslak hesabına kaydedildi · ' + saat(); n.hidden = false; DG.bildir('Taslak kaydedildi', {ikon: I('check')}); };
      f.addEventListener('input', e => {
        kirli = true;
        const bm = e.target.closest('[data-blok-metin]'); if (bm) { const b = bloklar.find(x => x.id === bm.closest('[data-blok]').dataset.blok); b.metin = bm.value; if (b.hata && bm.value.trim()) { b.hata = false; const a = bm.closest('.dgu-alan'); a.classList.remove('is-hata'); a.querySelector('.dgu-hata')?.remove(); bm.removeAttribute('aria-invalid'); } }
        const ba = e.target.closest('[data-blok-aciklama]'); if (ba) bloklar.find(x => x.id === ba.closest('[data-blok]').dataset.blok).aciklama = ba.value;
        if (e.target.name && f.querySelector(`[name="${e.target.name}"]`)?.closest('.is-hata') && e.target.value.trim()) hataYaz(e.target.name, '');
        hazir();
      });
      f.addEventListener('change', e => {
        kirli = true;
        if (e.target.name === 'kapak') { const x = e.target.files[0]; if (x && x.type.startsWith('image/')) { if (gorseller.length >= 6) DG.bildir('En çok 6 görsel eklenebilir'); else { gorseller.push(URL.createObjectURL(x)); DG.bildir(`${x.name} · ${(x.size / 1048576).toFixed(1).replace('.', ',')} MB seçildi`); } } e.target.value = ''; galeriCiz(); return; }
        const bd = e.target.closest('[data-blok-dosya]'); if (bd && bd.files[0]) { bloklar.find(b => b.id === bd.closest('[data-blok]').dataset.blok).url = URL.createObjectURL(bd.files[0]); blokCiz(); return; }
        if (e.target.name === 'kategori' && e.target.value) hataYaz('kategori', '');
        hazir();
      });
      f.addEventListener('click', async e => {
        const be = e.target.closest('[data-blok-ekle]');
        if (be) { kirli = true; bloklar.push({tur: be.dataset.blokEkle, metin: '', id: Math.random().toString(36).slice(2, 8)}); blokCiz(); blokKap.lastElementChild.querySelector('input,textarea')?.focus(); return; }
        const kutu = e.target.closest('[data-blok]'), i = kutu ? bloklar.findIndex(b => b.id === kutu.dataset.blok) : -1;
        const ts = e.target.closest('[data-tasi]'); if (ts && i > -1) { const j = i + Number(ts.dataset.tasi); [bloklar[i], bloklar[j]] = [bloklar[j], bloklar[i]]; blokCiz(); blokKap.children[j]?.querySelector(`[data-tasi="${ts.dataset.tasi}"]:not(:disabled), [data-sil]`)?.focus(); return; }
        if (e.target.closest('[data-sil]') && i > -1) { if (!await DG.onay({baslik: 'Blok silinsin mi?', metin: 'Bu blok püf noktasından kaldırılır.', evet: 'Sil'})) return; bloklar.splice(i, 1); blokCiz(); return; }
        const kp = e.target.closest('[data-kapak]'); if (kp) { kapak = Number(kp.dataset.kapak); galeriCiz(); DG.bildir('Kapak görseli değişti'); return; }
        const gs = e.target.closest('[data-gorsel-sil]'); if (gs) { gorseller.splice(Number(gs.dataset.gorselSil), 1); kapak = Math.min(kapak, Math.max(0, gorseller.length - 1)); galeriCiz(); return; }
        const git = e.target.closest('[data-git]'); if (git) { const el = odak(git.dataset.git); el.focus(); el.scrollIntoView({block: 'center', behavior: motion.matches ? 'auto' : 'smooth'}); return; }
        if (e.target.closest('[data-taslak]')) taslakKaydet();
      });
      f.addEventListener('submit', e => {
        e.preventDefault();
        const k = kontrol();
        hataYaz('baslik', k[0][3] ? '' : 'Başlık zorunlu — püf noktana kısa ve net bir başlık ver.');
        hataYaz('kategori', k[1][3] ? '' : 'Bir kategori seç — püf noktan doğru rafta görünsün.');
        hataYaz('metin', k[2][3] ? '' : 'Boş püf noktası incelemeden geçmez.');
        const eksik = k.filter(x => !x[3]);
        if (eksik.length) { ozet.textContent = `${eksik.length} zorunlu alan boş. Kırmızı işaretli alanları doldur, sonra yeniden gönder.`; ozet.hidden = false; odak(eksik[0][0]).focus(); return; }
        const bos = bloklar.filter(b => b.tur === 'baslik' && !(b.metin || '').trim());
        if (bos.length) { bloklar.forEach(b => { b.hata = bos.includes(b); }); blokCiz(); ozet.textContent = bos.length === 1 ? 'Bir ara başlık boş. Ara başlığı yaz ya da bloğu sil.' : `${bos.length} ara başlık boş. Ara başlıkları yaz ya da blokları sil.`; ozet.hidden = false; blokKap.querySelector('[aria-invalid=true]')?.focus(); return; }
        ozet.hidden = true;
        if (!ORNEK) store.del('puf-taslak');
        kirli = false;
        const kap = root.querySelector('[data-puf-form]'); kap.outerHTML = tamam(); scrollTo(0, 0);
        DG.bildir('Püf noktan incelemeye gönderildi.', {ikon: I('check')});
        root.querySelector('.dgu-durum h2')?.setAttribute('tabindex', '-1'); root.querySelector('.dgu-durum h2')?.focus();
      });
      // Kaydedilmemiş değişiklik (canlı kaydedilmemis.js): geri dönerken sor.
      addEventListener('click', e => {
        if (!kirli || !e.target.closest('[data-geri]')) return;
        e.preventDefault(); e.stopImmediatePropagation();
        const d = DG.sheet({baslik: 'Değişikliklerin kaydedilmedi', govde: '<p class="c-muted">Çıkarsan bu formdaki değişiklikler kaybolacak.</p>', ayak: `<div class="dgu-ikili">${btn('Kaydetmeden çık', {tur: 'ikincil', attrs: 'data-cik'})}${btn('Taslak olarak kaydet ve çık', {attrs: 'data-kaydet-cik'})}</div>`});
        d.addEventListener('click', ev => { if (ev.target.closest('[data-cik]')) { kirli = false; d.kapat(); DG.geri(); } else if (ev.target.closest('[data-kaydet-cik]')) { taslakKaydet(); d.kapat(); DG.geri(); } });
      }, true);
      blokCiz(); galeriCiz();
      if (ctx.durum === 'hata-form') f.requestSubmit(); // E-form gösterimi: boş formda alan hataları
    }};
  });

  // =====================================================================
  // ŞEFLER (C1, C2, C4)
  // =====================================================================
  const SEF = [...V.sefler].sort((a, b) => (b.takipci || 0) - (a.takipci || 0) || (b.tarif || 0) - (a.tarif || 0));
  const takipte = k => DG.uye() && store.get('takip', []).includes(k);

  DG.sayfa('sefler', ctx => {
    let q = ctx.qs.get('q') || '', goster = 24;
    const bul = () => { const k = q.trim().toLocaleLowerCase('tr'); return k ? SEF.filter(s => s.ad.toLocaleLowerCase('tr').includes(k) || s.kullanici.includes(k)) : SEF; };
    const kartlar = l => l.slice(0, goster).map(s => DG.sefKart(s).replace(`href="${DG.sefLink(s)}"`, `href="${tasi(DG.sefLink(s))}"`)).join('');
    const sonuc = () => {
      const l = bul();
      if (!l.length) return durum({ikon: I('search'), baslik: `“${q}” için şef bulunamadı`, metin: 'Yazımı kontrol et ya da daha kısa bir ad dene.', eylem: btn('Aramayı temizle', {tur: 'ikincil', attrs: 'data-temizle'})});
      return `<div class="dgu-sef-izgara">${kartlar(l)}${!q && goster >= l.length ? DG.sefOlKart(tasi('tarif-ekle.html')) : ''}</div>${daha(l.length - goster, 'Daha fazla şef')}`;
    };
    const sayiMetin = () => q ? `${bul().length} şef bulundu` : `${SEF.length} şef`;
    const html = `<header class="dgu-ic dgu-yigin-8 ic-sayfa-ust"><p class="t-label c-deep">Topluluk Şefleri</p><h1 class="t-page">Tarifin ustalarını keşfet</h1><p>Mutfağına yön veren şefleri ve yazarları tek yerde bul. Uzmanlık alanına göre keşfet, takip et, mutfak defterlerini gez.</p><p class="dgu-sayaclar"><span><b>1.055</b> Topluluk üyesi</span><span><b>6.112</b> Paylaşılan tarif</span></p></header>
      <section class="dgu-bolum ic-ust-16"><div class="dgu-yigin">
        <div class="dgu-yigin-8">${basSatir('Topluluğun şefleri', `<span class="t-meta c-muted" data-sayi aria-live="polite">${sayiMetin()}</span>`)}<p class="t-meta c-muted">İsme göre ara; bir üyeye dokun, mutfak defterini ve tariflerini keşfet.</p></div>
        <div class="dgu-alan"><label class="dgu-sr" for="f-q">Şef ara</label><div class="dgu-girdi${q ? ' has-text' : ''}">${ic(I('search'))}<input id="f-q" name="q" type="search" placeholder="İsme göre ara..." value="${esc(q)}" autocomplete="off" enterkeyhint="search"><button class="dgu-ibtn dgu-temizle" type="button" data-temizle aria-label="Aramayı temizle">${ic(I('close'))}</button></div></div>
        <div data-sonuc>${sonuc()}</div>
      </div></section>`;
    return {tur: 'alt', baslik: 'Şefler', iskelet: DG.iskelet(6, 'satir'), html, sonra(root) {
      const kap = root.querySelector('[data-sonuc]'); if (!kap) return;
      const inp = root.querySelector('#f-q'), girdi = inp.closest('.dgu-girdi');
      const yenile = () => { kap.innerHTML = sonuc(); root.querySelector('[data-sayi]').textContent = sayiMetin(); girdi.classList.toggle('has-text', !!q); const u = new URL(location.href); q ? u.searchParams.set('q', q) : u.searchParams.delete('q'); history.replaceState(null, '', u); };
      inp.addEventListener('input', () => { q = inp.value; goster = 24; yenile(); });
      root.addEventListener('click', e => {
        if (e.target.closest('[data-temizle]')) { q = ''; inp.value = ''; yenile(); inp.focus(); return; }
        if (e.target.closest('[data-daha]')) { const n = goster; goster += 24; kap.innerHTML = sonuc(); kap.querySelectorAll('.dgu-sef-kart')[n]?.querySelector('a')?.focus(); }
      });
    }};
  });

  // ---------- C2 · Şef profili (H7'nin ziyaretçi görünümü). ?kullanici= ya da ?ad= (detaydaki şef kartı) ----------
  DG.sayfa('sef', ctx => {
    const k = ctx.qs.get('kullanici'), ad = ctx.qs.get('ad');
    let s = k ? DG.sef(k) : ad ? V.sefler.find(x => x.ad.toLocaleLowerCase('tr') === ad.trim().toLocaleLowerCase('tr')) : SEF[0];
    // Şef listesinde olmayan ama tarif yazarı olan ad: yalnız ad ve tarifleriyle.
    if (!s && ad && V.tarifler.some(t => t.yazar === ad.trim())) s = {ad: ad.trim(), kullanici: ''};
    if (!s) return {tur: 'alt', baslik: 'Şef profili', html: durum({ikon: I('chef'), baslik: 'Şef bulunamadı', metin: 'Bu profil kaldırılmış ya da adresi değişmiş olabilir.', tam: true, eylem: btn('Şeflere göz at', {href: tasi('sefler.html')})})};
    const tarifler = V.tarifler.filter(t => t.yazar === s.ad);
    const sayaclar = [...(s.tarif != null ? [[DG.sayi(s.tarif), 'Tarif']] : []), ...(s.takipci != null ? [[DG.sayi(s.takipci), 'Takipçi']] : []), ...(s.uyelikYili ? [[s.uyelikYili, 'Üyelik yılı']] : [])];
    const on = takipte(s.kullanici);
    const takip = s.kullanici ? `<button class="dgu-btn dgu-btn--sm ${on ? 'dgu-btn--ikincil' : 'dgu-btn--tonlu'}" type="button" data-takip="${esc(s.kullanici)}" aria-pressed="${on}" aria-label="${esc(s.ad)} takip et">${ic(on ? 'check' : 'plus')}<span>${on ? 'Takiptesin' : 'Takip Et'}</span></button>` : '';
    const paylasBtn = btn('Paylaş', {tur: 'ikincil', boy: 'sm', ikon: I('share'), attrs: 'data-paylas'});
    const eylem = takip ? `<div class="dgu-ikili ic-profil-eylem">${takip}${paylasBtn}</div>` : `<div class="ic-profil-eylem">${paylasBtn}</div>`;
    const html = DG.profilBas({ad: s.ad, alt: s.unvan || '', kapak: tarifler[0]?.gorsel || '', eylem, sayaclar})
      + (tarifler.length ? `<section class="dgu-bolum">${basSatir('Tarifleri', `<span class="t-meta c-muted">${DG.sayi(tarifler.length)} tarif</span>`)}<div class="dgu-izgara" data-mt12>${tarifler.map(t => kart(t)).join('')}</div></section>` : '');
    return {tur: 'alt', baslik: s.ad, iskelet: false, html, sonra(root) {
      root.querySelector('[data-paylas]')?.addEventListener('click', () => DG.paylas({baslik: `${s.ad} · DadaGastro`, url: s.kullanici ? `${CANLI}/sefler/${s.kullanici}` : `${CANLI}/sefler`}));
    }};
  });

  // ---------- C4 · Onur Listesi (canlı 200, boş) ----------
  DG.sayfa('onur-listesi', () => ({tur: 'alt', baslik: 'Onur Listesi', iskelet: DG.iskelet(4, 'satir'), html: `<header class="dgu-ic dgu-yigin-8 ic-sayfa-ust"><p class="t-label c-deep">Hall of Fame</p><h1 class="t-page">Onur Listesi</h1><p>Yıl yıl <b>“Yılın Şefi”</b> ve <b>sezon ilk 10'u</b> — topluluğun kalıcı onur kaydı.</p></header>
    <div class="dgu-ic">${durum({ikon: 'trophy', baslik: 'Henüz kapanmış bir sezon yok', metin: 'İlk “Yılın Şefi” bu sezonun sonunda belli olacak.', eylem: `<div class="dgu-yigin-12 ic-genis">${btn('Rozetlerim ve sezon sıralaması', {href: tasi('rozetlerim.html'), ikon: I('badge'), tam: true})}${btn('Şeflere göz at', {tur: 'ikincil', href: tasi('sefler.html'), tam: true})}</div>`})}</div>`}));
})();
