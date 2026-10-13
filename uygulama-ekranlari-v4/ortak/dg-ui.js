/* DadaGastro uygulama çekirdeği (docs/51 bileşenleri, docs/53 §3 kabuk). Yeni sayfalar (v3-app/uygulama/) bunu yükler.
   Bağımlılık: ortak/dg-tokens.js (DGTOKENS), ortak/veri/veri.js (DGVERI). Sonra ortak-kart.js (DGCard) ve ortak-menu.js yüklenir.
   Prototip: oturum, kayıtlar, liste ve tercihler yalnız bu cihazda (localStorage) tutulur; gerçek işlem yapılmaz.
   Galeri ve test için adres parametreleri: ?oturum=misafir|uye|pro (kalıcı değil), ?durum=yukleniyor|bos|hata|baglanti-yok|… */
(() => {
  const V = window.DGVERI, TK = window.DGTOKENS;
  const qs = new URLSearchParams(location.search);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const ic = (n, cls = '') => `<i class="icon fa-solid fa-${n}${cls ? ' ' + cls : ''}" aria-hidden="true"></i>`;
  const I = k => TK.icons[k] || k;

  // ---------- Kalıcı durum (yalnız bu cihaz) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('dg-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('dg-' + k, JSON.stringify(v)); } catch { /* özel pencere: oturum içi */ } return v; },
    del(k) { try { localStorage.removeItem('dg-' + k); } catch { /* yok */ } }
  };
  // Kayıtlı tarifler kök runtime ile aynı anahtarda (dadagastro-prototype-saved): iki taraf aynı listeyi görür.
  const kayitli = {al() { try { const v = JSON.parse(localStorage.getItem('dadagastro-prototype-saved') || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } }, yaz(v) { try { localStorage.setItem('dadagastro-prototype-saved', JSON.stringify(v)); } catch { /* yok */ } return v; }};
  const rol = () => { const r = qs.get('oturum') || store.get('oturum', {rol: 'misafir'}).rol; return r === 'misafir' && qs.get('giris') === '1' ? 'uye' : r; };
  const uye = () => rol() !== 'misafir';
  const pro = () => rol() === 'pro';
  // Kök ekranlar (ortak-menu, runtime) üye önizlemesini ?giris=1 ve sessionStorage ile okur; aynı durum oraya da taşınır.
  if (uye()) { try { sessionStorage.setItem('dadagastro-member-preview', '1'); } catch { /* yok */ } if (!qs.has('giris')) { const u = new URL(location.href); u.searchParams.set('giris', '1'); history.replaceState(history.state, '', u); } }
  else { try { sessionStorage.removeItem('dadagastro-member-preview'); } catch { /* yok */ } }

  // ---------- Adresler ----------
  const here = () => 'uygulama/' + location.pathname.split('/').pop() + location.search.replace(/[?&]giris=1/, '').replace(/^&/, '?');
  const KOK = {ana: '../ana-v3.html', liste: '../liste-v2.html', detay: '../detay-v2.html', tabaktan: '../tabaktan-tarif.html'};
  const tarifLink = t => `${KOK.detay}?tarif=${encodeURIComponent(t.slug || t)}&donus=${encodeURIComponent(here())}`;
  const listeLink = (p = {}) => KOK.liste + '?' + new URLSearchParams(p).toString();
  const tarif = slug => V.tarifler.find(t => t.slug === slug);
  const sef = k => V.sefler.find(s => s.kullanici === k || s.ad === k);
  const sefLink = s => `sef.html?kullanici=${encodeURIComponent(s.kullanici)}`;
  const sayi = n => Number(n || 0).toLocaleString('tr');

  // ---------- ortak-kart (DGCard) köprüsü: kök ekranlarla aynı kart bileşeni ----------
  window.esc = esc;
  window.motion = matchMedia('(prefers-reduced-motion: reduce)');
  window.photo = (src, cls) => `<span class="${cls} photo" role="img" aria-hidden="true" style="background-image:url('../${esc(src)}')"></span>`;
  window.shortTitle = r => r.kisa || String(r.title || '').split('|')[0].trim();
  window.link = r => tarifLink(r.slug);
  window.saveButton = (r, cls) => { const on = kayitli.al().includes(r.slug); return `<button class="save ${cls}" type="button" data-kaydet="${esc(r.slug)}" aria-pressed="${on}" aria-label="${on ? 'Kaydedildi' : 'Tarifi kaydet'}">${ic('bookmark')}</button>`; };
  const kartVeri = t => ({...t, title: t.baslik, image: t.gorsel, category: t.kategori, minutes: t.dakika, views: t.goruntulenme, author: t.yazar});
  const kart = (t, tur = 'card') => window.DGCard ? (tur === 'tile' ? DGCard.tile(kartVeri(t)) : tur === 'feature' ? DGCard.feature(kartVeri(t)) : DGCard.card(kartVeri(t), tur === 'row' ? 'row' : '')) : '';

  // ---------- Küçük bileşenler ----------
  const avatar = (ad, boy = 40) => `<span class="dgu-avatar s${boy}" aria-hidden="true">${esc(String(ad || '?').trim().slice(0, 1).toLocaleUpperCase('tr'))}</span>`;
  const btn = (metin, {tur = '', href, ikon, attrs = '', tam, boy} = {}) => { const c = `dgu-btn${tur ? ' dgu-btn--' + tur : ''}${boy ? ' dgu-btn--' + boy : ''}${tam ? ' dgu-btn--tam' : ''}`; const i = ikon ? ic(ikon) : ''; return href != null ? `<a class="${c}" href="${esc(href)}" ${attrs}>${i}<span>${esc(metin)}</span></a>` : `<button class="${c}"${/\btype=/.test(attrs) ? '' : ' type="button"'} ${attrs}>${i}<span>${esc(metin)}</span></button>`; };
  // Bölüm başlığı: eylem = bağlantı {href, metin, aria} ya da {html} (düğme gibi hazır eylem, 2. sütunda).
  const bas = (baslik, eylem) => `<div class="dg-head"><h2>${esc(baslik)}</h2>${eylem?.html ? eylem.html : eylem ? `<a class="dg-head__link section-heading-action" href="${esc(eylem.href)}" aria-label="${esc(eylem.aria || baslik + ' tümü')}">${esc(eylem.metin || 'Tümü')} ${ic('arrow-right')}</a>` : ''}</div>`;
  // seg: [[anahtar, metin, sayı, ikon?]] — ikon isteğe bağlı (web sekmelerinde ikon var)
  const seg = (ad, secenekler, secili) => `<div class="dgu-seg" role="tablist" aria-label="${esc(ad)}">${secenekler.map(([k, m, n, ikon]) => `<button type="button" role="tab" data-seg="${esc(k)}" aria-selected="${k === secili}">${ikon ? ic(ikon) : ''}${esc(m)}${n != null ? ` <span class="dgu-seg-sayi">${esc(n)}</span>` : ''}</button>`).join('')}</div>`;
  const alan = ({ad, etiket, tur = 'text', yer = '', ikon, deger = '', hata, yardim, oto, zorunlu, cok}) => `<div class="dgu-alan${hata ? ' is-hata' : ''}"><label for="f-${ad}">${esc(etiket)}${zorunlu ? ' *' : ''}</label><div class="dgu-girdi">${ikon ? ic(ikon) : ''}${cok ? `<textarea id="f-${ad}" name="${ad}" placeholder="${esc(yer)}" ${zorunlu ? 'required' : ''}>${esc(deger)}</textarea>` : `<input id="f-${ad}" name="${ad}" type="${tur}" placeholder="${esc(yer)}" value="${esc(deger)}" ${oto ? `autocomplete="${oto}"` : ''} ${zorunlu ? 'required' : ''}>`}${tur === 'password' ? `<button class="dgu-ibtn" type="button" data-sifre-goster aria-label="Şifreyi göster">${ic(I('showPassword'))}</button>` : ''}</div>${hata ? `<p class="dgu-hata">${ic(I('error'))}${esc(hata)}</p>` : ''}${yardim ? `<p class="dgu-yardim">${esc(yardim)}</p>` : ''}</div>`;
  const secim = (ad, metin, {tur = 'checkbox', deger = '1', secili, zorunlu} = {}) => `<label class="dgu-secim"><input type="${tur}" name="${ad}" value="${esc(deger)}" ${secili ? 'checked' : ''} ${zorunlu ? 'required' : ''}><span>${metin}</span></label>`;
  // Bayrak seçimi (ortak/dg-bayrak.css · docs/51 DgCuisinePicker): mutfaklar [{slug, ad, sayi, bayrak}] → 4'lü ızgara, form uyumlu checkbox.
  // ad: input adı · secili: [slug] · ilk: görünen öğe sayısı (kalanı “N mutfak daha” ile açılır) · koyu: fotoğraflı yüzey.
  const bayrakSecim = (liste, {ad = 'mutfak', secili = [], ilk = 8, koyu = false, kisalt = true} = {}) => {
    const kisa = t => kisalt ? String(t).replace(/\s+Mutfağı$/, '') : t;
    const oge = (m, i) => `<label class="dgu-bayrak-oge"${i >= ilk ? ' data-bayrak-ek hidden' : ''}><input type="checkbox" name="${esc(ad)}" value="${esc(m.slug)}"${secili.includes(m.slug) ? ' checked' : ''}><span class="dgu-bayrak-gorsel">${m.bayrak ? `<img class="dgu-bayrak" src="../${esc(m.bayrak)}" alt="" width="56" height="42" loading="${i < 28 ? 'eager' : 'lazy'}">` : `<span class="dgu-bayrak-yok">${ic('earth-europe')}</span>`}</span><span class="dgu-bayrak-metin"><b>${esc(kisa(m.ad))}</b>${m.sayi ? `<small>${sayi(m.sayi)} tarif</small>` : ''}</span><span class="dgu-bayrak-kutu" aria-hidden="true"><span class="choice-mark">${ic('check')}</span></span></label>`;
    const ek = liste.length - ilk;
    return `<div class="dgu-bayrak-secim" data-sigdir data-ad="${esc(ad)}"><div class="dgu-bayrak-izgara${koyu ? ' is-koyu' : ''}" role="group">${liste.map(oge).join('')}</div>${ek > 0 ? `<button type="button" class="dgu-bayrak-daha" data-bayrak-daha="${ek} mutfak daha" aria-expanded="false"><span>${ek} mutfak daha</span>${ic('chevron-down')}</button>` : ''}</div>`;
  };
  // İçerik bileşenleri (dg-bilesen.css “İçerik ve topluluk bileşenleri”). Görsel yolları v3-app köküne göredir (../).
  const videoLink = i => `video.html?no=${i}`;
  const video = (v, i, {buyuk = false} = {}) => `<a class="dgu-video${buyuk ? ' is-buyuk' : ''}" href="${videoLink(i)}" aria-label="${esc(v.baslik)} videosunu aç${v.sure ? ', ' + esc(v.sure) : ''}"><span class="dgu-video-kapak dg-veil-top dg-veil-bottom"><span class="photo" style="background-image:url('../${esc(v.gorsel)}')"></span><span class="dgu-video-golge"></span>${v.sure ? `<span class="dg-meta"><span>${ic('clock')}${esc(v.sure)}</span></span>` : ''}<span class="dg-play" aria-hidden="true">${ic('play')}</span><span class="dgu-video-metin" data-dg-veil-from><strong>${esc(v.baslik)}</strong>${v.izlenme ? `<span>${ic(I('views'))}${esc(v.izlenme)} izlenme</span>` : ''}</span></span></a>`;
  const pufLink = slug => `puf.html?slug=${encodeURIComponent(slug)}`;
  const puf = (p, {kategori} = {}) => { const k = kategori || window.DGICERIK?.puf?.[p.slug]?.kategori; return `<a class="dgu-puf" href="${pufLink(p.slug)}"><span class="dgu-puf-foto" style="background-image:url('../${esc(p.gorsel)}')"></span><span class="dgu-puf-metin">${k ? `<small>${esc(k)}</small>` : ''}<b>${esc(p.baslik)}</b>${p.okunma ? `<span>${ic(I('views'))}${sayi(p.okunma)} okunma</span>` : ''}</span></a>`; };
  // Profil başı: {ad, alt, kapak (görsel yolu, isteğe bağlı), eylem (html), sayaclar: [[değer, kısa etiket, tam ad?]]} — etiket tek satır; uzun ad kısa karşılıkla, tam adı erişilebilir adda.
  const profilBas = ({ad, alt, kapak, eylem = '', sayaclar = []}) => `<header class="dgu-profil-bas"><div class="dgu-profil-kapak dgu-gulucuk"${kapak ? ` style="background-image:url('../${esc(kapak)}')"` : ''}></div><div class="dgu-profil-kimlik">${avatar(ad, 96)}<div class="dgu-profil-ad"><h1 class="t-page">${esc(ad)}</h1>${alt ? `<small>${esc(alt)}</small>` : ''}${eylem}</div></div>${sayaclar.length ? `<div class="dgu-ic"><dl class="dgu-istatistik" data-sutun="${sayaclar.length}">${sayaclar.map(([d, e, tam]) => `<div${tam ? ` aria-label="${esc(d)} ${esc(tam)}" role="group"` : ''}><dt${tam ? ` title="${esc(tam)}"` : ''}>${esc(e)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl></div>` : ''}</header>`;
  const yorum = ({ad, metin, meta}) => `<div class="dgu-yorum">${ad ? avatar(ad, 40) : ''}<div class="dgu-yorum-metin">${ad ? `<b>${esc(ad)}</b>` : ''}<p>${esc(metin)}</p>${meta ? `<small>${esc(meta)}</small>` : ''}</div></div>`;
  const kucukFoto = (src, ikon = 'image') => src ? `<span class="dgu-kucuk-foto" style="background-image:url('${/^(https?:|data:)/.test(src) ? '' : '../'}${esc(src)}')" aria-hidden="true"></span>` : `<span class="dgu-kucuk-foto" aria-hidden="true">${ic(ikon)}</span>`;
  // Puan girişi: canlı Görüş Bildir etiketleri. Seçim değişince etiket güncellenir (aşağıdaki change dinleyicisi).
  const PUAN = ['Çok kötü', 'Kötü', 'İdare eder', 'İyi', 'Harika'];
  const puan = (ad, deger = 0, etiket = 'Puanın') => `<fieldset class="dgu-puan"><legend class="dgu-sr">${esc(etiket)}</legend><div class="dgu-puan-yildizlar">${[5, 4, 3, 2, 1].map(n => `<input type="radio" id="${esc(ad)}-${n}" name="${esc(ad)}" value="${n}"${+deger === n ? ' checked' : ''}><label for="${esc(ad)}-${n}" title="${PUAN[n - 1]}">${ic('star')}<span class="dgu-sr">${n} — ${PUAN[n - 1]}</span></label>`).join('')}</div><span class="dgu-puan-etiket" aria-live="polite">${deger ? PUAN[deger - 1] : ''}</span></fieldset>`;
  // “Veri yok” notu: örnek/dolu görünümde kaynağında verisi olmayan bölüm (uydurma sayı yerine).
  // docs/55 §2c: “veri yok” notu ekranda çizilmez (verisi olmayan bölüm hiç çizilmez; giriş yapılmış hâl örnek üye verisiyle dolar).
  const veriYok = () => '';
  // Giriş sonrası dönüş adresi: test parametreleri (oturum, giris, ornek) atılır, sayfa parametreleri korunur.
  const donusAdres = () => { const u = new URLSearchParams(location.search); ['oturum', 'giris', 'ornek'].forEach(k => u.delete(k)); const q = u.toString(); return encodeURIComponent('uygulama/' + location.pathname.split('/').pop() + (q ? '?' + q : '') + location.hash); };
  // Giriş duvarı (docs/55 §2b): ne sunduğu + Üye Ol / Giriş Yap (?donus=) + isteğe bağlı “Giriş yapınca” bilgi kartları [[ikon, başlık, açıklama]].
  // MADDE LİSTESİ (izin istemi maddeleri; Beyar V4: misafir duvarı özellikleri de aynı dil): [[ikon, başlık, açıklama]] → 44 ikon kutusu + kalın başlık + açıklama.
  const maddeler = (liste, {aria = ''} = {}) => `<ul class="dgu-izin-maddeler"${aria ? ` aria-label="${esc(aria)}"` : ''}>${liste.map(([i, t, a]) => `<li><span class="dgu-izin-madde-ikon" aria-hidden="true">${ic(i)}</span><span><b>${esc(t)}</b>${a ? `<small>${esc(a)}</small>` : ''}</span></li>`).join('')}</ul>`;
  const girisDuvari = ({ikon = I('login'), baslik, metin, sunar = [], ek = ''}) => `<div class="dgu-duvar">${durum({ikon, baslik, metin, eylem: `<div class="dgu-ikili">${btn('Üye Ol', {tur: 'ikincil', href: 'kayit.html?donus=' + donusAdres()})}${btn('Giriş Yap', {href: 'giris.html?donus=' + donusAdres()})}</div>`})}${sunar.length ? `<section class="dgu-ic dgu-yigin-12" aria-label="Giriş yapınca"><h2 class="t-label c-muted">Giriş yapınca</h2>${maddeler(sunar)}</section>` : ''}${ek}</div>`;
  // Seçim alanı (docs/51 DgSelectSheet): yerel açılır liste yok; dokununca radyo listeli sheet açılır. Gizli input name=ad, seçimde change olayı.
  const secAlan = ({ad, etiket, secenekler = [], deger = '', yer = 'Seç', zorunlu, hata, yardim}) => { const sec = secenekler.find(([d]) => String(d) === String(deger)); return `<div class="dgu-alan${hata ? ' is-hata' : ''}"><label id="l-${esc(ad)}" for="f-${esc(ad)}">${esc(etiket)}${zorunlu ? ' *' : ''}</label><div class="dgu-girdi dgu-secici"><button type="button" id="f-${esc(ad)}" class="dgu-secici-dugme" data-sec-alan="${esc(ad)}" data-yer="${esc(yer)}" data-secenekler="${esc(JSON.stringify(secenekler))}" aria-haspopup="dialog" aria-labelledby="l-${esc(ad)} f-${esc(ad)}"><span${sec ? '' : ' class="is-yer"'}>${esc(sec ? sec[1] : yer)}</span></button><span class="dgu-secici-ok" aria-hidden="true">${ic(I('expand'))}</span><input type="hidden" name="${esc(ad)}" value="${esc(sec ? sec[0] : '')}"${zorunlu ? ' data-zorunlu' : ''}></div>${hata ? `<p class="dgu-hata">${ic(I('error'))}${esc(hata)}</p>` : ''}${yardim ? `<p class="dgu-yardim">${esc(yardim)}</p>` : ''}</div>`; };
  // Seçim kartı (docs/51 DgChoiceCard, dg-bilesen.css .dgu-secim-*): metin / ikon / ölçek / fotoğraf; çoklu aria-pressed, tekli role=radio.
  // Kapsayıcı: .dgu-secim-izgara (is-tek tek sütun, is-uc üç sütun, is-koyu koyu yüzey). Bayrak için DG.bayrakSecim kullanılır.
  // bayrak: fotoğraflı kartta sol üst köşe bayrağı (mutfak + gerçek yemek fotoğrafı; yalnız gorsel ile).
  const secimKart = ({grup, k, ad, alt, ikon, olcek, gorsel, bayrak, secili, tek}) => {
    const on = ikon ? `<span class="dgu-secim-on dgu-secim-ikon" aria-hidden="true">${ic(ikon)}</span>` : olcek ? `<span class="dgu-secim-on dgu-secim-olcek" aria-hidden="true">${[1, 2, 3, 4, 5].map(x => `<i class="${x <= olcek ? 'is-on' : ''}"></i>`).join('')}</span>` : '';
    const cls = gorsel ? ' is-foto' : on ? '' : ' is-metin';
    return `<button type="button" class="dgu-secim-kart${cls}" data-grup="${esc(grup)}" data-k="${esc(k)}" ${tek ? `role="radio" aria-checked="${!!secili}"` : `aria-pressed="${!!secili}"`}>${gorsel ? `<span class="dgu-secim-foto" style="background-image:url('../${esc(gorsel)}')" aria-hidden="true"></span>${bayrak ? `<img class="dgu-secim-kosebayrak" src="../${esc(bayrak)}" alt="" width="24" height="18" loading="lazy">` : ''}` : on}<span class="dgu-secim-metin"><b>${esc(ad)}</b>${alt ? `<small>${esc(alt)}</small>` : ''}</span><span class="dgu-secim-kutu" aria-hidden="true"><span class="choice-mark">${ic('check')}</span></span></button>`;
  };
  // Telefon alanı (docs/51 DgPhoneField; web g-hesabim/register “alan-telefon” birebir): solda bayraklı ülke kodu (varsayılan TR +90),
  // sağda numara (TR: 5__ ___ __ __, 10 hane). Ülkeye dokununca sheet: “Ülke veya kod ara” + bayrak · ad · kod listesi (DGULKE, 199).
  // Gizli alanlar: name=ad (yalnız rakam), name=<ulkeAd> (ISO). Doğrulama: DG.telefonHata(kok) → '' ya da web mesajı.
  const ULKE = () => window.DGULKE || [{iso: 'TR', kod: '+90', ad: 'Türkiye'}];
  const bayrakSrc = iso => `../assets/flags/${String(iso).toLowerCase()}.svg`;
  const telefonBicim = (rakam, iso) => iso === 'TR' ? [rakam.slice(0, 3), rakam.slice(3, 6), rakam.slice(6, 8), rakam.slice(8, 10)].filter(Boolean).join(' ') : rakam;
  const telefon = ({ad = 'telefon', ulkeAd = 'telefon_ulke', etiket = 'Telefon', deger = '', ulke = 'TR', zorunlu, opsiyonel, hata, yardim} = {}) => {
    const u = ULKE().find(x => x.iso === ulke) || ULKE()[0], rakam = String(deger).replace(/\D/g, '');
    return `<div class="dgu-alan${hata ? ' is-hata' : ''}" data-telefon="${esc(ad)}"><label for="f-${esc(ad)}">${esc(etiket)}${zorunlu ? ' *' : ''}${opsiyonel ? ' <span class="dgu-ops">(opsiyonel)</span>' : ''}</label><div class="dgu-girdi dgu-telefon"><button type="button" class="dgu-telefon-ulke" data-telefon-ulke aria-haspopup="dialog" aria-label="Ülke kodu — şu an ${esc(u.ad)} ${esc(u.kod)}"><img class="dgu-telefon-bayrak" src="${bayrakSrc(u.iso)}" alt="" width="24" height="18"><span>${esc(u.kod)}</span>${ic(I('expand'))}</button><input id="f-${esc(ad)}" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="${u.iso === 'TR' ? '5__ ___ __ __' : ''}" value="${esc(telefonBicim(rakam, u.iso))}"${zorunlu ? ' required' : ''}><input type="hidden" name="${esc(ad)}" value="${esc(rakam)}"><input type="hidden" name="${esc(ulkeAd)}" value="${esc(u.iso)}"></div>${hata ? `<p class="dgu-hata">${ic(I('error'))}${esc(hata)}</p>` : ''}${yardim ? `<p class="dgu-yardim">${esc(yardim)}</p>` : ''}</div>`;
  };
  // Web mesajı: “Geçerli bir telefon numarası gir (10 hane).” (TR); diğer ülkeler 6–15 hane. Boş + zorunlu değilse geçerli.
  const telefonHata = kok => { const k = kok.closest?.('[data-telefon]') || kok.querySelector('[data-telefon]'); if (!k) return ''; const r = k.querySelector('input[type=hidden]').value, iso = k.querySelectorAll('input[type=hidden]')[1].value, zor = k.querySelector('input[type=tel]').required; if (!r) return zor ? 'Bu alan zorunlu.' : ''; if (iso === 'TR' ? r.length !== 10 : (r.length < 6 || r.length > 15)) return iso === 'TR' ? 'Geçerli bir telefon numarası gir (10 hane).' : 'Geçerli bir telefon numarası gir.'; return ''; };
  const trKucuk = t => String(t).toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  function telefonSec(k) {
    const btn = k.querySelector('[data-telefon-ulke]'), gizli = k.querySelectorAll('input[type=hidden]'), tel = k.querySelector('input[type=tel]');
    const sat = u => `<li><button type="button" class="dgu-ulke-satir" data-iso="${u.iso}" aria-pressed="${u.iso === gizli[1].value}"><img src="${bayrakSrc(u.iso)}" alt="" width="28" height="21" loading="lazy"><span class="dgu-ulke-ad">${esc(u.ad)}</span><span class="dgu-ulke-kod">${esc(u.kod)}</span>${ic('check')}</button></li>`;
    const d = sheet({baslik: 'Ülke seç', sinif: 'dgu-ulke-sheet', govde: `<div class="dgu-girdi dgu-ulke-ara">${ic(I('search'))}<input type="search" placeholder="Ülke veya kod ara" aria-label="Ülke veya kod ara" autocomplete="off"></div><ul class="dgu-ulke-liste" aria-label="Ülkeler">${ULKE().map(sat).join('')}</ul><p class="dgu-ulke-bos" hidden>Eşleşen ülke yok.</p>`});
    const ara = d.querySelector('.dgu-ulke-ara input');
    ara.addEventListener('input', () => { const q = trKucuk(ara.value.trim()).replace(/^\+/, ''); let n = 0; d.querySelectorAll('.dgu-ulke-liste li').forEach(li => { const b = li.firstElementChild, u = ULKE().find(x => x.iso === b.dataset.iso), ok = !q || trKucuk(u.ad).includes(q) || u.kod.replace('+', '').startsWith(q) || u.iso.toLowerCase() === q; li.hidden = !ok; n += ok; }); d.querySelector('.dgu-ulke-bos').hidden = n > 0; });
    d.addEventListener('click', e => { const b = e.target.closest('.dgu-ulke-satir'); if (!b) return; const u = ULKE().find(x => x.iso === b.dataset.iso); gizli[1].value = u.iso; btn.querySelector('img').src = bayrakSrc(u.iso); btn.querySelector('span').textContent = u.kod; btn.setAttribute('aria-label', `Ülke kodu — şu an ${u.ad} ${u.kod}`); tel.placeholder = u.iso === 'TR' ? '5__ ___ __ __' : ''; tel.value = telefonBicim(gizli[0].value, u.iso); gizli[1].dispatchEvent(new Event('change', {bubbles: true})); d.kapat(); setTimeout(() => tel.focus(), motion.matches ? 0 : TK.motion.sheet); });
    d.querySelector('.dgu-ulke-satir[aria-pressed=true]')?.scrollIntoView({block: 'center'});
  }
  // İlerleme çubuğu (docs/51 DgProgressBar): native <progress> + isteğe bağlı başlık satırı [etiket, “n / hedef”].
  const ilerleme = (n, hedef, {etiket, deger} = {}) => { const bar = `<progress class="dgu-ilerleme" max="${+hedef || 1}" value="${Math.min(+n || 0, +hedef || 1)}" aria-label="${esc(etiket || 'İlerleme')}: ${sayi(n)} / ${sayi(hedef)}"></progress>`; return etiket ? `<div class="dgu-ilerleme-satir"><div class="dgu-ilerleme-bas"><span>${esc(etiket)}</span><b>${esc(deger || sayi(n) + ' / ' + sayi(hedef))}</b></div>${bar}</div>` : bar; };
  // Rozet hücresi (DgBadgeTile): r = DGROZET.rozetler kaydı; durum = {kazanildi, tarih, n} (n: hedefli rozette ilerleme).
  // MADALYA (rozet ikonu; Beyar V4 C6 + 13 Ekim düzeltmesi — küçük, minimal, yumuşak; tek ortak görünüm): boy 'kucuk' (40, liste/bildirim satırı)
  // · varsayılan (44, rozet ızgarası) · 'buyuk' (64, rozet detay sheet'i). Hâl: kazanıldı = açık domates zemin + derin domates ikon; ilerliyor =
  // beyaz zemin + ince açık domates çizgi + domates ikon; kilitli = nötr zemin + ince çizgi + soluk ikon + köşede kilit. Sayfada madalya stili yazılmaz.
  const madalya = (r, kilitli, boy, ilerliyor) => { boy = boy === true ? 'buyuk' : boy; const hal = kilitli ? (ilerliyor ? ' is-ilerliyor' : ' is-kilitli') : ''; return `<span class="dgu-madalya${hal}${boy ? ' is-' + boy : ''}" aria-hidden="true">${ic(r.ikon || 'medal')}${kilitli && !ilerliyor ? `<span class="dgu-madalya-kilit">${ic('lock')}</span>` : ''}</span>`; };
  // d.ilerleme = [şimdiki, hedef] (DGORNEK.ilerleme) ya da d.n + r.hedef
  const rozet = (r, d = {}) => { const [n, h] = d.ilerleme || [d.n, r.hedef]; const k = !d.kazanildi, ilr = k && h && n > 0; d = {...d, n}; r = {...r, hedef: h}; return `<button type="button" class="dgu-rozet-hucre${k ? ' is-kilitli' : ''}" data-rozet="${esc(r.slug)}" aria-label="${esc(r.ad)} — ${k ? (ilr ? `ilerleme ${sayi(d.n)} / ${sayi(r.hedef)}` : 'kazanılmadı') : 'kazanıldı'}">${madalya(r, k, '', ilr)}<span class="dgu-rozet-ad">${esc(r.ad)}</span>${ilr ? ilerleme(d.n, r.hedef) : `<span class="dgu-rozet-alt">${k ? `+${r.puan} puan` : `+${r.puan} puan`}</span>`}</button>`; };
  // Rozet detay sheet'i (DgBadgeSheet): büyük madalya, tam ad, aile, açıklama, nasıl kazanılır, kazanma tarihi ya da ilerleme.
  const tarihTR = t => t ? new Date(t + 'T12:00:00').toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'}) : '';
  function rozetSheet(r, d = {}) {
    if (d.ilerleme) { r = {...r, hedef: d.ilerleme[1]}; d = {...d, n: d.ilerleme[0]}; }
    const aile = (window.DGROZET?.aileler || []).find(a => a.kod === r.aile), k = !d.kazanildi;
    const durumHtml = k ? (r.hedef ? ilerleme(d.n || 0, r.hedef, {etiket: 'İlerlemen'}) : `<p>Henüz kazanılmadı.</p>`) : `<p>${ic('circle-check')} ${esc(tarihTR(d.tarih))} tarihinde kazandın.</p>`;
    return sheet({baslik: 'Rozet', govde: `<div class="dgu-rozet-detay">${madalya(r, k, 'buyuk', k && (d.n || 0) > 0)}<h3>${esc(r.ad)}</h3><span class="dgu-rozet-alt">${aile ? esc(aile.ad) + ' · ' : ''}+${r.puan} puan${r.kademe ? ' · ' + esc(r.kademe) : ''}</span><div class="dgu-rozet-bilgi"><div><h4>Açıklama</h4><p>${esc(r.aciklama)}</p></div>${aile ? `<div><h4>Nasıl kazanılır</h4><p>${esc(aile.olcu)}${r.hedef ? ` Hedef: <b>${sayi(r.hedef)}</b>.` : ''}</p></div>` : ''}<div><h4>${k ? 'Durum' : 'Kazanıldı'}</h4>${durumHtml}</div></div></div>`});
  }
  // Şef kartı (docs/51 DgChefCard) — ana-v3 “Şefler & Yazarlar · Tarifin ustaları” kartı birebir: 96 avatar (beyaz halka + gölge),
  // ad kart rolü 2 satır, tarif sayısı meta, “+ Takip Et / Takiptesin” (canlı metin; [data-takip] ortak işleyici). Izgara 2 sütun, şeritte 146.
  const sefKart = s => { const on = store.get('takip', []).includes(s.kullanici); return `<article class="dgu-sef-kart"><a class="dgu-sef-kisi" href="${sefLink(s)}" aria-label="${esc(s.ad)} profili${s.tarif ? `, ${sayi(s.tarif)} tarif` : ''}">${avatar(s.ad, 96)}<b>${esc(s.ad)}</b>${s.unvan ? `<span class="dgu-sef-unvan">${esc(s.unvan)}</span>` : ''}${s.tarif ? `<span class="dgu-sef-sayi">${sayi(s.tarif)} tarif</span>` : ''}</a><button type="button" class="dgu-sef-takip" data-takip="${esc(s.kullanici)}" aria-pressed="${on}" aria-label="${esc(s.ad)} takip et">${ic(on ? 'check' : 'plus')}<span>${on ? 'Takiptesin' : 'Takip Et'}</span></button></article>`; };
  // “Sen de Şef Ol” kesik çizgili kart (ana-v3 .v3-chef-cta)
  const sefOlKart = (href = 'tarif-ekle.html') => `<a class="dgu-sef-ol" href="${href}">${ic('circle-plus')}<b>Sen de Şef Ol</b><span>Tarifini paylaş, rozetini kazan</span></a>`;
  // Paylaş sheet'i (docs/51 DgShareSheet) — canlı püf/tarif “Paylaş” menüsü birebir: X, WhatsApp, E-posta, Bağlantıyı kopyala
  // (+ cihaz paylaşımı varsa “Diğer uygulamalar”). Eylem kartı satırları; bağlantılar canlı dadagastro.com adresine.
  // Paylaş sheet'i (Beyar, 12 Ekim K21): kanallar ve düzen kök tarif detayının paylaş sheet'iyle aynı (detay-v2 .dv2-share-grid) —
  // Facebook, X, WhatsApp, Telegram, Pinterest, E-posta (web blok paylaş rayı) 3 sütun marka ikonlu ızgara + tek satır “Kopyala”.
  function paylas({baslik = document.title, url = location.href, alt} = {}) {
    const u = encodeURIComponent(url), t = encodeURIComponent(baslik), fab = n => `<i class="icon fa-brands fa-${n}" aria-hidden="true"></i>`;
    const K = [['Facebook', fab('facebook-f'), 'facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`], ['X', fab('x-twitter'), 'x', `https://twitter.com/intent/tweet?url=${u}&text=${t}`], ['WhatsApp', fab('whatsapp'), 'whatsapp', `https://wa.me/?text=${t}%20${u}`],
      ['Telegram', fab('telegram'), 'telegram', `https://t.me/share/url?url=${u}&text=${t}`], ['Pinterest', fab('pinterest-p'), 'pinterest', `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`], ['E-posta', ic('envelope'), 'eposta', `mailto:?subject=${t}&body=${u}`]];
    const d = sheet({baslik: 'Paylaş', govde: `${alt ? `<p class="dgu-paylas-ne">${esc(alt)}</p>` : ''}<ul class="dgu-paylas-izgara" aria-label="Paylaşım kanalları">${K.map(([a, i, m, h]) => `<li><a class="dgu-paylas-oge" data-marka="${m}" href="${h}" target="_blank" rel="noopener" aria-label="${a} ile paylaş"><span class="dgu-paylas-ikon">${i}</span><span class="dgu-paylas-ad">${a}</span></a></li>`).join('')}</ul><div class="dgu-paylas-kopya"><label class="dgu-girdi">${ic('link')}<input type="text" readonly value="${esc(url)}" aria-label="Paylaşım bağlantısı"></label>${btn('Kopyala', {tur: 'ikincil', ikon: 'copy', attrs: 'data-kopyala aria-label="Bağlantıyı kopyala"'})}</div>${navigator.share ? `<div class="dgu-paylas-yerel">${btn('Diğer uygulamalar', {tur: 'metin', ikon: 'share-from-square', attrs: 'data-yerel'})}</div>` : ''}`});
    d.addEventListener('click', e => {
      const k = e.target.closest('[data-kopyala]');
      if (k) { e.preventDefault(); (navigator.clipboard?.writeText(url) || Promise.reject()).then(() => { k.innerHTML = `${ic('check')}<span>Kopyalandı</span>`; k.dataset.kopyalandi = ''; bildir('Bağlantı kopyalandı'); }, () => { const i = d.querySelector('.dgu-paylas-kopya input'); i.focus(); i.select(); bildir('Bağlantıyı seçip kopyalayabilirsin'); }); }
      else if (e.target.closest('[data-yerel]')) { e.preventDefault(); navigator.share({title: baslik, url}).catch(() => {}); d.kapat(); }
      else if (e.target.closest('.dgu-paylas-oge')) setTimeout(() => d.kapat(), 0);
    });
    return d;
  }
  // İçerik bloğu (docs/51 DgContentBlock; Beyar revize D6: sıra Başlık → Görsel → Açıklama, bloklar arası ince ayırıcı) — püf noktası ve benzeri içerik detayları: numara + başlık (zorunlu) + paylaş; altında metin
  // (HTML, kaynaktaki <strong> korunur; .dgu-metin iki yana yaslı) ve/veya görsel (16 radius, figcaption) ya da video. Paylaş → DG.paylas.
  const icerikBlok = ({no, baslik, html = '', gorsel, aciklama, video, id, paylasUrl}) => `<section class="dgu-blok"${id ? ` id="${esc(id)}"` : ''}><header class="dgu-blok-bas">${no != null ? `<span class="dgu-blok-no" aria-hidden="true">${esc(no)}</span>` : ''}<h2>${esc(baslik)}</h2><button type="button" class="dgu-ibtn" data-blok-paylas="${esc(paylasUrl || (location.href.split('#')[0] + (id ? '#' + id : '')))}" data-blok-baslik="${esc(baslik)}" aria-label="“${esc(baslik)}” bölümünü paylaş">${ic(I('share'))}</button></header>${gorsel ? `<figure class="dgu-blok-gorsel"><span class="dgu-blok-foto" role="img" aria-label="${esc(aciklama || baslik)}" style="background-image:url('../${esc(gorsel)}')"></span>${aciklama ? `<figcaption>${esc(aciklama)}</figcaption>` : ''}</figure>` : ''}${html ? `<div class="dgu-metin">${html}</div>` : ''}${video ? `<div class="dgu-oynatici dgu-blok-video" style="background-image:url('../${esc(video.poster || '')}')"><button class="dgu-oynatici-dugme" type="button" aria-label="Videoyu oynat">${ic('play')}</button></div>` : ''}</section>`;
  // Parçalı gri buton listesi (docs/51 DgGroupedActionList; Beyar revize B6). ogeler: [{ikon, baslik, alt, href | attrs, ana, yikici, bilgi}].
  // Bağlantı → <a>, eylem → <button>, bilgi maddesi → <div> (oksuz). CSS ortak/dg-parcali.css (Tabaktan runtime de yükler).
  // kutu: 'yatay' (tek satır kare adımlar) | 'izgara' (2×2) — ikon üstte, başlık altta, açıklamasız (dg-parcali.css). o.rozet: kutu üstü küçük rozet (Pro).
  const parcali = (ogeler, {aria, kutu} = {}) => `<ul class="dgu-parcali${kutu ? ' is-' + kutu : ''}"${aria ? ` aria-label="${esc(aria)}"` : ''}>${ogeler.map(o => { const ic2 = `${o.rozet ? `<span class="dgu-rozet dgu-parcali-rozet">${ic(I('pro'))}${esc(o.rozet)}</span>` : ''}<span class="dgu-parcali-ikon" aria-hidden="true">${ic(o.ikon || I('rowNext'))}</span><span class="dgu-parcali-metin"><b>${esc(o.baslik)}</b>${o.alt && !kutu ? `<small>${esc(o.alt)}</small>` : ''}</span>${o.bilgi ? '' : `<i class="icon fa-solid fa-${I('rowNext')} dgu-parcali-ok" aria-hidden="true"></i>`}`, c = `dgu-parcali-oge${o.ana ? ' is-ana' : ''}${o.yikici ? ' is-yikici' : ''}${o.bilgi ? ' is-bilgi' : ''}`;
    return `<li>${o.bilgi ? `<div class="${c}">${ic2}</div>` : o.href != null ? `<a class="${c}" href="${esc(o.href)}" ${o.attrs || ''}>${ic2}</a>` : `<button class="${c}" type="button" ${o.attrs || ''}>${ic2}</button>`}</li>`; }).join('')}</ul>`;
  // Zengin metin editörü (docs/51 DgRichTextField; Beyar revize D4/D5): webdeki tarif/püf ekle editörünün araçları — geri, ileri, kalın,
  // italik, madde listesi, numaralı liste, bağlantı. İçerik HTML olarak gizli textarea'ya (name=ad) yazılır; form ve kirli izleme oradan.
  // Bağlantı ekleme ortak sheet ile (adres alanı). Yer tutucu boşken görünür. Odak halkası .dgu-girdi kalıbıyla.
  const ZENGIN = [['undo', 'rotate-left', 'Geri al'], ['redo', 'rotate-right', 'İleri al'], null, ['bold', 'bold', 'Kalın'], ['italic', 'italic', 'İtalik'], null, ['insertUnorderedList', 'list-ul', 'Madde listesi'], ['insertOrderedList', 'list-ol', 'Numaralı liste'], null, ['link', 'link', 'Bağlantı ekle']];
  const zengin = ({ad, etiket, deger = '', yer = '', zorunlu, yardim, sinir}) => `<div class="dgu-alan dgu-zengin" data-zengin="${esc(ad)}"><label id="l-${esc(ad)}">${esc(etiket)}${zorunlu ? ' *' : ''}</label><div class="dgu-zengin-kutu"><div class="dgu-zengin-arac" role="toolbar" aria-label="${esc(etiket)} biçimlendirme">${ZENGIN.map(x => x ? `<button type="button" class="dgu-zengin-btn" data-zengin-komut="${x[0]}" aria-label="${x[2]}" title="${x[2]}"${['bold', 'italic', 'insertUnorderedList', 'insertOrderedList'].includes(x[0]) ? ' aria-pressed="false"' : ''}>${ic(x[1])}</button>` : '<span class="dgu-zengin-ayrac" aria-hidden="true"></span>').join('')}</div><div class="dgu-zengin-alan dgu-metin" id="f-${esc(ad)}" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="l-${esc(ad)}"${zorunlu ? ' aria-required="true"' : ''} data-yer="${esc(yer)}"${sinir ? ` data-sinir="${sinir}"` : ''}>${deger}</div></div><textarea name="${esc(ad)}" hidden>${esc(deger)}</textarea>${yardim ? `<p class="dgu-yardim">${esc(yardim)}</p>` : ''}</div>`;
  const zenginTemiz = h => { const t = document.createElement('div'); t.innerHTML = h; t.querySelectorAll('*').forEach(x => { [...x.attributes].forEach(at => { if (!(x.tagName === 'A' && ['href', 'target', 'rel'].includes(at.name))) x.removeAttribute(at.name); }); }); t.querySelectorAll('p:empty').forEach(x => x.remove()); return t.innerHTML; };
  const zenginEsitle = el => { const k = el.closest('[data-zengin]'); if (!k) return; const a = k.querySelector('.dgu-zengin-alan'), t = k.querySelector('textarea'); if (!a.textContent.trim() && !a.querySelector('img')) a.innerHTML = ''; t.value = zenginTemiz(a.innerHTML); k.classList.toggle('is-bos', !a.textContent.trim()); t.dispatchEvent(new Event('input', {bubbles: true})); };
  const zenginDurum = () => { const a = document.activeElement?.closest?.('.dgu-zengin-alan'); if (!a) return; a.closest('[data-zengin]').querySelectorAll('[data-zengin-komut][aria-pressed]').forEach(b => { try { b.setAttribute('aria-pressed', document.queryCommandState(b.dataset.zenginKomut)); } catch { /* yok */ } }); };
  document.addEventListener('selectionchange', zenginDurum);
  document.addEventListener('input', e => { if (e.target.closest?.('.dgu-zengin-alan')) { zenginEsitle(e.target); zenginDurum(); } });
  document.addEventListener('paste', e => { if (!e.target.closest?.('.dgu-zengin-alan')) return; e.preventDefault(); const t = (e.clipboardData || window.clipboardData).getData('text/plain'); document.execCommand('insertText', false, t); });
  document.addEventListener('mousedown', e => { if (e.target.closest('[data-zengin-komut]')) e.preventDefault(); });   // seçim alanda kalsın
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-zengin-komut]'); if (!b) return; e.preventDefault();
    const k = b.closest('[data-zengin]'), a = k.querySelector('.dgu-zengin-alan'), cmd = b.dataset.zenginKomut;
    if (cmd === 'link') {
      const sel = getSelection(), aralik = sel.rangeCount && a.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null;
      const d = sheet({baslik: 'Bağlantı ekle', govde: `<form class="dgu-yigin" data-zengin-link>${alan({ad: 'zengin-url', etiket: 'Bağlantı adresi', tur: 'url', yer: 'https://', zorunlu: true})}${aralik && !aralik.collapsed ? '' : alan({ad: 'zengin-metin', etiket: 'Görünen metin', yer: 'Bağlantının metni'})}</form>`, ayak: `<div class="dgu-ikili">${btn('Vazgeç', {tur: 'ikincil', attrs: 'data-kapat'})}${btn('Ekle', {attrs: 'data-zengin-ekle'})}</div>`});
      d.querySelector('input')?.focus();
      const ekle = () => { const u = d.querySelector('[name=zengin-url]').value.trim(); if (!/^https?:\/\/\S+\.\S+/.test(u)) { d.querySelector('.dgu-alan').classList.add('is-hata'); return; } const m = d.querySelector('[name=zengin-metin]')?.value.trim();
        // Modal açıkken alan odak alamaz: sheet kapandıktan sonra seçim geri yüklenir ve bağlantı yazılır.
        d.addEventListener('close', () => { a.focus(); const s2 = getSelection(); s2.removeAllRanges(); if (aralik) s2.addRange(aralik); else { const r = document.createRange(); r.selectNodeContents(a); r.collapse(false); s2.addRange(r); } if (m || !aralik || aralik.collapsed) document.execCommand('insertHTML', false, `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(m || u)}</a>`); else { document.execCommand('createLink', false, u); a.querySelectorAll('a[href]:not([target])').forEach(x => { x.target = '_blank'; x.rel = 'noopener'; }); } zenginEsitle(a); }, {once: true}); d.kapat(); };
      d.addEventListener('click', ev => { if (ev.target.closest('[data-zengin-ekle]')) ekle(); });
      d.querySelector('[data-zengin-link]').addEventListener('submit', ev => { ev.preventDefault(); ekle(); });
      return;
    }
    a.focus(); document.execCommand(cmd, false, null); zenginEsitle(a); zenginDurum();
  });
  // Şef / yazar kartı (docs/51 DgChefCard; Beyar EK 13 Ekim): TEK ORTAK BİLEŞEN ortak/dg-sef-karti.js (kök tarif detayı da aynı dosyayı
  // kullanır). Sayaçlar (Tarif · Püf noktası · Takipçi) ve üyelik yılı tek kaynaktan; takip/abonelik ortak yerel listede, misafirde giriş kapısı.
  const SK = window.DGSefKarti;
  const sefSayac = s => SK.sayac(s), yilDan = y => SK.yilDan(y), sefKarti = o => SK.html(o), sefKartTam = (s, o) => SK.kart(s, o);
  // Kısa video (Dada Akış) — dikey kart + tam ekran dikey oynatıcı (docs/51 DgReels; Beyar revize D10). Kart 9:16, ortak alt perde,
  // süre ve başlık; dokununca tam ekran: dikey kaydırmalı sayfalar (scroll-snap), üstte kapat + “1 / N”, sağda eylem sütunu
  // (Beğen, Kaydet, Paylaş), altta başlık + izlenme. Canlıda oynatma kaynağı yok: oynat düğmesi canlı metni (“Video kaynağı henüz
  // eklenmedi”) gösterir. Beğen/kaydet yalnız bu cihazda; misafirde giriş kapısı. v: {no, baslik, gorsel, sure, izlenme}.
  const kok = s => /^(https?:|data:)/.test(s || '') ? s : '../' + (s || '');
  const akisKart = (v, i = 0) => `<button type="button" class="dgu-akis-kart" data-akis-ac="${i}" aria-label="${esc(v.baslik)} — kısa videoyu aç"><span class="dgu-akis-foto" style="background-image:url('${esc(kok(v.gorsel))}')"></span><span class="dgu-akis-sure">${ic('play')}<span>${esc(v.sure)}</span></span><b class="dgu-akis-ad">${esc(v.baslik)}</b></button>`;
  function akisAc(liste, bas = 0) {
    const d = document.createElement('dialog'); d.className = 'dgu-akis'; d.setAttribute('aria-label', 'Dada Akış');
    const bv = store.get('akis-begeni', []), kv = store.get('akis-kayit', []);
    d.innerHTML = `<div class="dgu-akis-ust"><button class="dgu-hbtn" type="button" data-akis-kapat aria-label="Kapat">${ic(I('close'))}</button><b>Dada Akış</b><span class="dgu-akis-sira" aria-live="polite">${bas + 1} / ${liste.length}</span></div><div class="dgu-akis-sayfalar">${liste.map((v, i) => `<section class="dgu-akis-sayfa" data-i="${i}" aria-label="${i + 1}. video: ${esc(v.baslik)}"><span class="dgu-akis-poster" style="background-image:url('${esc(kok(v.gorsel))}')"></span><button type="button" class="dgu-akis-oynat" data-akis-oynat aria-label="Oynat">${ic('play')}</button><p class="dgu-akis-durum" hidden role="status">Video kaynağı henüz eklenmedi</p><div class="dgu-akis-eylem">${[['heart', 'Beğen', 'begeni', bv.includes(v.no)], [I('save'), 'Kaydet', 'kayit', kv.includes(v.no)], [I('share'), 'Paylaş', 'paylas', null]].map(([ik, ad, k, on]) => `<button type="button" class="dgu-akis-btn" data-akis="${k}" data-no="${v.no}"${on == null ? '' : ` aria-pressed="${on}"`} aria-label="${ad}">${ic(ik)}<small>${ad}</small></button>`).join('')}</div><div class="dgu-akis-alt"><b>${esc(v.baslik)}</b><small>${ic(I('views'))} ${esc(v.izlenme)} izlenme · ${esc(v.sure)}</small></div></section>`).join('')}</div>`;
    document.body.append(d); d.showModal(); document.body.classList.add('dgu-kilit');
    const kap = d.querySelector('.dgu-akis-sayfalar'); requestAnimationFrame(() => { kap.scrollTop = kap.clientHeight * bas; });
    const sira = d.querySelector('.dgu-akis-sira');
    kap.addEventListener('scroll', () => { sira.textContent = `${Math.round(kap.scrollTop / kap.clientHeight) + 1} / ${liste.length}`; }, {passive: true});
    const kapat = () => { d.close(); d.remove(); document.body.classList.remove('dgu-kilit'); };
    d.addEventListener('cancel', e => { e.preventDefault(); kapat(); });
    d.addEventListener('click', e => {
      if (e.target.closest('[data-akis-kapat]')) return kapat();
      const o = e.target.closest('[data-akis-oynat]'); if (o) { const p = o.parentElement.querySelector('.dgu-akis-durum'); p.hidden = false; bildir('Video kaynağı henüz eklenmedi'); return; }
      const b = e.target.closest('[data-akis]'); if (!b) return; const k = b.dataset.akis, no = +b.dataset.no;
      if (k === 'paylas') return paylas({baslik: liste.find(v => v.no === no)?.baslik, url: 'https://dadagastro.com/video-mutfagi'});
      if (!uye()) return kapi(k === 'kayit' ? 'kaydet' : 'alkis', (k === 'kayit' ? 'akiskayit:' : 'akisbegeni:') + no);
      const anahtar = 'akis-' + k, l = store.get(anahtar, []), on = !l.includes(no); store.set(anahtar, on ? [...l, no] : l.filter(x => x !== no)); b.setAttribute('aria-pressed', on); bildir(k === 'kayit' ? (on ? 'Kaydedildi' : 'Kayıt kaldırıldı') : (on ? 'Beğendin' : 'Beğeni geri alındı'));
    });
    return d;
  }
  // Kademe rozeti: topluluk kademesi (ortak/veri/rozetler.js kademeler) ikonuyla; bilinmeyen ad genel rozet ikonuyla.
  const kademeRozet = ad => { if (!ad) return ''; const k = window.DGROZET?.kademeler?.find(x => x.ad === ad); return `<span class="dgu-rozet">${ic(k?.ikon || I('badge'))}<span>${esc(ad)}</span></span>`; };
  // Kısa tarih: '04 Ağustos 2026' → '4 Ağu 2026' (yil:false → '4 Ağu'). Meta satırlarında tek satıra sığmak için; tarih değişmez.
  const kisaTarih = (t, {yil = true} = {}) => { const m = /^0?(\d{1,2})\s+(\S+)\s+(\d{4})$/.exec(String(t || '').trim()); if (!m) return t || ''; const ay = m[2].toLocaleLowerCase('tr') === 'mayıs' ? 'May' : m[2].slice(0, 3); return `${m[1]} ${ay}${yil ? ' ' + m[3] : ''}`; };
  // Okuma süresi: metindeki sözcük sayısından (dakikada 200 sözcük), en az 1 dk. Veri uydurmaz, içerikten hesaplanır.
  const okumaSure = html => `${Math.max(1, Math.round(String(html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200))} dk okuma`;
  // Yazar satırı (docs/51 DgAuthorRow; Beyar K21): avatar 40 + ad + kademe rozeti, altında tek meta satırı (yayın · güncelleme · okuma),
  // sağda Takip Et ([data-takip] ortak işleyici). Püf noktası ve yazarı olan bütün içerik detayları aynı satırı kullanır.
  const yazarSatir = ({ad, kullanici, kademe, meta = [], href}) => { const on = !!kullanici && store.get('takip', []).includes(kullanici);
    const kim = `${avatar(ad, 40)}<span class="dgu-yazar-metin"><span class="dgu-yazar-ad"><b>${esc(ad)}</b>${kademeRozet(kademe)}</span>${meta.filter(Boolean).length ? `<small>${meta.filter(Boolean).map(esc).join(' · ')}</small>` : ''}</span>`;
    return `<div class="dgu-yazar">${href ? `<a class="dgu-yazar-kim" href="${esc(href)}" aria-label="${esc(ad)} profili">${kim}</a>` : `<div class="dgu-yazar-kim">${kim}</div>`}${kullanici ? `<button type="button" class="dgu-btn dgu-btn--${on ? 'ikincil' : 'tonlu'} dgu-btn--sm dgu-yazar-takip" data-takip="${esc(kullanici)}" aria-pressed="${on}" aria-label="${esc(ad)} takip et">${ic(on ? 'check' : 'plus')}<span>${on ? 'Takiptesin' : 'Takip Et'}</span></button>` : ''}</div>`; };
  // Kaydırınca beliren alt eylem çubuğu (docs/51 DgScrollActionBar; Beyar K21): küçük görsel + başlık, sağda ikon eylemler (sayı isteğe bağlı).
  // Sayfa s.kayanBar = {gorsel, baslik, eylemler: [{ikon, ad, attrs, sayi, basili}]} verir; kabuk banner geçilince gösterir, başa dönünce gizler.
  const eylemCubugu = ({gorsel, baslik, eylemler = []}) => `<div class="dgu-kayan-kim">${gorsel ? `<span class="dgu-kayan-foto" style="background-image:url('${/^(https?:|data:)/.test(gorsel) ? '' : '../'}${esc(gorsel)}')" aria-hidden="true"></span>` : ''}<b class="dgu-kayan-baslik">${esc(baslik)}</b></div><div class="dgu-kayan-eylem">${eylemler.map(x => `<button type="button" class="dgu-kayan-btn" ${x.attrs || ''}${x.basili != null ? ` aria-pressed="${!!x.basili}"` : ''} aria-label="${esc(x.ad)}${x.sayi != null ? ` (${esc(x.sayi)})` : ''}">${ic(x.ikon)}${x.sayi != null ? `<small>${esc(x.sayi)}</small>` : ''}</button>`).join('')}</div>`;
  // Uyarı/ipucu kutusu (canlı .art-tip “Okuyucunun Dikkatine”): bilgi kartı, ikon + başlık + metin.
  // html: güvenilir, sayfanın kendi kurduğu satır içi işaretleme (bağlantı, kalın) — metin yerine kullanılır.
  const ipucu = ({ikon = 'triangle-exclamation', baslik, metin, html}) => `<aside class="dgu-ipucu"><span class="dgu-ipucu-ikon" aria-hidden="true">${ic(ikon)}</span><div>${baslik ? `<h4>${esc(baslik)}</h4>` : ''}<p>${html != null ? html : esc(metin)}</p></div></aside>`;
  // Durum rozeti (docs/51 DgStatusBadge) — tek satır, solid ikon + metin yan yana, küçük rozet köşesi; ton token'dan (notr/uyari/basari/hata).
  // Durum adları web: Mutfak Defterim (Taslak, İncelemede, Yayında, Reddedildi) + PanelDurumlari (Onay bekliyor, Planlandı, Arşivlendi…).
  const DURUM = {taslak: ['Taslak', 'notr', 'pen'], inceleniyor: ['İncelemede', 'uyari', 'hourglass-half'], incelemede: ['İncelemede', 'uyari', 'hourglass-half'], onay_bekliyor: ['Onay bekliyor', 'uyari', 'hourglass-half'], yayinda: ['Yayında', 'basari', 'circle-check'], reddedildi: ['Reddedildi', 'hata', 'circle-xmark'], planlandi: ['Planlandı', 'uyari', 'clock'], arsiv: ['Arşivlendi', 'notr', 'box-archive'], gizli: ['Gizlendi', 'notr', 'eye-slash'], durduruldu: ['Durduruldu', 'uyari', 'pause'], tamamlandi: ['Tamamlandı', 'basari', 'flag-checkered'], acik: ['Açık', 'uyari', 'circle-dot'], cozuldu: ['Çözüldü', 'basari', 'circle-check'], kapali: ['Kapalı', 'notr', 'lock'], aktif: ['Aktif', 'basari', 'circle-check'], iptal: ['İptal edildi', 'notr', 'ban'], basarisiz: ['Başarısız', 'hata', 'circle-xmark'], okunmadi: ['Yeni', 'hata', 'circle']};
  const durumRozet = (kod, {ad, ton, ikon} = {}) => { const [a, t, i] = DURUM[kod] || [kod, 'notr', 'circle-info']; return `<span class="dgu-durum-rozet is-${esc(ton || t)}">${ic(ikon || i)}<span>${esc(ad || a)}</span></span>`; };
  // Mod kartı (docs/51 DgModeCard) — Dünya Mutfakları/kategori kartlarıyla aynı dil: fotoğraflı kart radius'u (16), ortak kart overlay'i
  // (ortak-kart.js veils, alttan), solid ikon + ad; seçili = primary çerçeve + sağ üst onay rozeti (canlı .mode-chip.active + .mc-chk).
  // Şerit: yatay kaydırma, ilk kart gutter, scroll-snap. m = DGMOD kaydı. Tek seçim: role=tab, aria-selected.
  const modKart = (m, {secili} = {}) => `<button type="button" class="dgu-mod dg-veil-bottom" data-mod="${esc(m.slug)}" role="tab" aria-selected="${!!secili}"><span class="dgu-mod-foto" style="background-image:url('../${esc(m.gorsel)}')"></span><span class="dgu-mod-golge" aria-hidden="true"></span><span class="dgu-mod-onay" aria-hidden="true">${ic('check')}</span><span class="dgu-mod-ad" data-dg-veil-from>${ic(m.ikon)}<span>${esc(m.ad)}</span></span></button>`;
  const modSerit = (liste, secili, etiket = 'Yemek modları') => `<div class="dgu-mod-serit" role="tablist" aria-label="${esc(etiket)}">${liste.map(m => modKart(m, {secili: m.slug === secili})).join('')}</div>`;
  // Seçili modun açıklama kartı (canlı .mode-desc): ikon + başlık + açıklama (iki yana yaslı).
  const modAciklama = m => m ? `<div class="dgu-mod-aciklama" aria-live="polite"><div class="dgu-mod-aciklama-bas"><span class="dgu-mod-aciklama-ikon" aria-hidden="true">${ic(m.ikon)}</span><h3>${esc(m.ad)}</h3></div><p>${esc(m.aciklama)}</p></div>` : '';
  // Yorum bölümü (docs/51 DgCommentSection) — kaynak detay-v2 yorumları birebir (aynı sınıflar, ortak/dg-yorum.css) + web püf yorum
  // alanları. o = {id, tur:'tarif'|'puf', baslik, sayi, ozet:{puan, sayi, dagilim:[[yildiz, adet]], oneri, sessiz}, yorumlar:[{id, yazar,
  // unvan, sahip, puan, metin, tarih, begeni, foto:[], durum, yanitlar:[…]}], bos, sayfa:5}. Misafir: giriş kutusu (püf) / giriş kapısı (tarif).
  const yildizSatir = (v, cls = '') => `<span class="dv2-stars ${cls}" aria-hidden="true">${[1, 2, 3, 4, 5].map(n => `<i class="icon fa-solid fa-star${n <= Math.round(v) ? ' on' : ''}"></i>`).join('')}</span>`;
  const yorumKart = (y, o, yanit = false) => `<article class="${yanit ? 'reply' : 'review'}" data-yorum="${esc(y.id || '')}" data-stars="${y.puan || ''}" data-has-photo="${!!(y.foto && y.foto.length)}"><div class="review-head"><span class="avatar" aria-hidden="true">${esc(String(y.yazar || '?').slice(0, 1).toLocaleUpperCase('tr'))}</span><div class="dv2-review-who">${y.kullanici ? `<a href="sef.html?kullanici=${encodeURIComponent(y.kullanici)}"><b>${esc(y.yazar)}</b></a>` : `<span class="dv2-review-ad"><b>${esc(y.yazar)}</b></span>`}<span class="dv2-review-meta">${[y.unvan && `<span class="dgu-yrm-unvan">${ic('award')}${esc(y.unvan)}</span>`, y.sahip && `<span class="dgu-yrm-sahip">${ic(o.tur === 'puf' ? 'pen-nib' : 'utensils')}${o.tur === 'puf' ? 'Püf Sahibi' : 'Tarif Sahibi'}</span>`, y.tarih && esc(y.tarih)].filter(Boolean).join('<span class="dv2-dot" aria-hidden="true">·</span>')}</span></div>${y.puan ? `${yildizSatir(y.puan, 'dv2-review-stars')}<span class="dv2-sr">${y.puan} yıldız</span>` : ''}</div>${y.durum === 'onay_bekliyor' ? `<span class="dgu-yrm-denetim">${ic('hourglass-half')}Denetimde — yalnız sen görebilirsin</span>` : ''}<p>${esc(y.metin)}</p>${y.foto?.length ? `<div class="dv2-review-photos">${y.foto.map(f => `<span class="review-photo photo" style="background-image:url('../${esc(f)}')"></span>`).join('')}</div>` : ''}${yanit || y.durum === 'onay_bekliyor' ? '' : `<div class="review-actions">${o.tur === 'puf' ? '' : `<button type="button" data-yrm-begen aria-pressed="false">${ic('thumbs-up')}<span>Beğen</span> <b>${sayi(y.begeni || 0)}</b></button>`}<button type="button" data-yrm-bildir>${ic('flag')}<span>Bildir</span></button><button type="button" data-yrm-yanitla>${ic('comment')}<span>Yanıtla</span></button></div>`}${(y.yanitlar || []).map(r => yorumKart(r, o, true)).join('')}</article>`;
  // Yorum giriş kutusu ve eylemleri: girişten dönüşte yorum bölümüne (?devam=yorumlar; ajan2 isteği, revize B7).
  const yorumDonus = () => { const d = decodeURIComponent(donusAdres()).replace(/#.*$/, ''); return encodeURIComponent(d + (d.includes('?') ? '&' : '?') + 'devam=yorumlar'); };
  function yorumBolumu(o) {
    const Y = o.yorumlar || [], n = o.sayfa || 5, puanli = o.tur !== 'puf', id = o.id || 'yorumlar';
    const oz = o.ozet && o.ozet.puan && o.ozet.sayi ? (() => { const max = Math.max(1, ...o.ozet.dagilim.map(d => d[1])); return `<div class="dv2-rating" aria-label="Puan özeti"><div class="dv2-rating-score"><b>${o.ozet.puan.toFixed(1).replace('.', ',')}</b>${yildizSatir(o.ozet.puan)}<span class="dv2-sr">5 üzerinden ${o.ozet.puan.toFixed(1).replace('.', ',')}</span><small>${o.ozet.sayi} değerlendirme</small>${o.ozet.oneri ? `<small class="dv2-recommend">${ic('thumbs-up')}${esc(o.ozet.oneri)}</small>` : ''}${o.ozet.sessiz ? `<small class="dv2-silent">${o.ozet.sessiz} kişi yorum yazmadan puan verdi</small>` : ''}</div><ul class="dv2-rating-bars">${o.ozet.dagilim.map(([st, c]) => `<li><span class="dv2-bar-label">${st}${ic('star')}</span><span class="dv2-bar-track"><i style="width:${c / Math.max(o.ozet.sayi, max) * 100}%"></i></span><span class="dv2-bar-count">${c}</span></li>`).join('')}</ul></div>`; })() : '';
    const sayac = {all: Y.length, photo: Y.filter(v => v.foto?.length).length, 5: Y.filter(v => v.puan == 5).length, 4: Y.filter(v => v.puan == 4).length, low: Y.filter(v => v.puan && v.puan <= 3).length, null: Y.filter(v => !v.puan).length};
    // Filtreler: tarif (detay-v2) Tümü/Fotoğraflı/5/4/3 ve altı/Puansız; püf (canlı #revFilter) Tümü/5/4/3 ve altı.
    const filtre = Y.length ? `<div class="review-filters" role="group" aria-label="Yorumları süz">${(puanli ? [['all', 'Tümü'], ['photo', 'Fotoğraflı'], ['5', '5 yıldız'], ['4', '4 yıldız'], ['low', '3 ve altı'], ...(sayac.null ? [['null', 'Puansız']] : [])] : [['all', 'Tümü'], ['5', '5 yıldız'], ['4', '4 yıldız'], ['low', '3 ve altı']]).map(([v, t]) => `<button class="chip" type="button" data-review-filter="${v}" aria-pressed="${v === 'all'}">${t} <span class="dv2-chip-count">${sayac[v]}</span></button>`).join('')}</div>` : '';
    const yaz = uye() ? (puanli ? `<button class="button dv2-rate" type="button" data-yrm-yaz>${ic('star')}<span>Tarifi değerlendir</span></button>` : `<form class="dgu-yrm-form" data-yrm-form novalidate>${alan({ad: id + '-metin', etiket: 'Yorumun', cok: true, yer: 'Deneyimini, püf noktanı ya da sorunu yaz…', zorunlu: true, yardim: '0/2000'})}${btn('Yorumu Gönder', {attrs: 'type="submit"'})}<p class="dgu-yardim">Yorumun incelendikten sonra yayımlanır.</p></form>`) : (puanli ? `<button class="button dv2-rate" type="button" data-yrm-yaz>${ic('star')}<span>Tarifi değerlendir</span></button>` : `<div class="dgu-yrm-giris"><span class="dv2-box-icon">${ic('lock')}</span><div><b>Yorum yapmak için giriş yap</b><p>Bu püfü değerlendirmek, puanlamak ve yorumlara katılmak için DadaGastro hesabına giriş yapman gerekiyor. Yorumları okumak serbest.</p><div class="dgu-ikili">${btn('Giriş Yap', {ikon: 'user', href: 'giris.html?eylem=yorum&donus=' + yorumDonus()})}${btn('Üye Ol', {tur: 'ikincil', href: 'kayit.html?eylem=yorum&donus=' + yorumDonus()})}</div></div></div>`);
    const liste = Y.length ? `<div class="dgu-yrm-liste" data-yrm-liste>${Y.map((y, i) => yorumKart(y, o).replace('<article class="review"', `<article class="review"${i >= n ? ' hidden data-yrm-ek' : ''}`)).join('')}</div>${Y.length > n ? `<button type="button" class="dgu-btn dgu-btn--ikincil dgu-yrm-daha" data-yrm-daha>${ic(I('expand'))}<span>Daha fazla yorum göster (${Y.length - n})</span></button>` : ''}<p class="dgu-yardim" data-yrm-filtre-bos hidden>Bu filtreye uyan yorum ilk sayfada yok.</p>` : `<div class="review-empty"><span class="dv2-box-icon">${ic('comment-dots')}</span><p>${esc(o.bos || (puanli ? 'Bu tarife henüz yorum yapılmamış. İlk yorumu sen yaz.' : 'Bu püf noktasına henüz yorum yapılmamış. İlk yorumu sen yaz.'))}</p></div>`;
    return `<section class="dgu-yrm" id="${esc(id)}" data-yrm-tur="${puanli ? 'tarif' : 'puf'}"><div class="dgu-yrm-bas"><span class="t-label">${ic('comments')} Yorumlar</span><h2 class="t-section">${esc(o.baslik || 'Yorumlar')} (${sayi(o.sayi ?? Y.length)})</h2></div>${oz}${yaz}${filtre}${liste}</section>`;
  }
  function yorumSheet(sec) {
    const d = sheet({baslik: 'Tarifi değerlendir', govde: `<form class="dgu-yrm-form" data-yrm-form novalidate>${puan('yrm-puan', 0, 'Puanın')}${alan({ad: 'yrm-metin', etiket: 'Yorumun', cok: true, yer: 'Tarifi denedin mi? Deneyimini yaz…', yardim: '0/2000'})}${btn('Yorumu Gönder', {attrs: 'type="submit"', tam: true})}<p class="dgu-yardim">Yorumun incelendikten sonra yayımlanır.</p></form>`});
    d.querySelector('form').addEventListener('submit', e => { e.preventDefault(); const f = e.target, v = f.querySelector('textarea').value.trim(), p = f.querySelector('input[name="yrm-puan"]:checked')?.value; if (!p && !v) { bildir('Puan ver ya da yorum yaz.'); return; } yorumEkle(sec, {yazar: 'Sen', metin: v || '—', puan: +p || null, tarih: 'Az önce', durum: 'onay_bekliyor'}); d.kapat(); });
  }
  function yorumEkle(sec, y) { const L = sec.querySelector('[data-yrm-liste]') || (() => { sec.querySelector('.review-empty')?.remove(); const l = document.createElement('div'); l.className = 'dgu-yrm-liste'; l.dataset.yrmListe = ''; sec.append(l); return l; })(); L.insertAdjacentHTML('afterbegin', yorumKart(y, {tur: sec.dataset.yrmTur})); bildir('Yorumun alındı; incelendikten sonra yayımlanır.'); }
  // Bölüm başlığı (docs/51 DgSectionHeader) — liste öğesi dili: solda 44 tint kare (kontrol radius'u) içinde solid ikon, ortada başlık
  // (alt başlık rolü) + tek satır açıklama, sağda ilerleme “7/8” ve chevron; isteğe bağlı ince ilerleme çubuğu. b = {ikon, baslik, alt, ilerleme:[n,h], sag}
  const bolumBasIc = b => `<span class="dgu-bolum-ikon" aria-hidden="true">${ic(b.ikon || 'layer-group')}</span><span class="dgu-bolum-metin"><b>${esc(b.baslik)}</b>${b.alt ? `<small>${esc(b.alt)}</small>` : ''}${b.ilerleme && b.cubuk !== false ? `<progress class="dgu-ilerleme" max="${b.ilerleme[1] || 1}" value="${b.ilerleme[0]}" aria-hidden="true"></progress>` : ''}</span><span class="dgu-bolum-sag">${b.ilerleme ? `<span class="dgu-bolum-sayi">${sayi(b.ilerleme[0])}/${sayi(b.ilerleme[1])}</span>` : b.sag || ''}${ic(I('expand'))}</span>`;
  const bolumBaslik = (b, {href} = {}) => href ? `<a class="dgu-bolum-bas is-bag" href="${esc(href)}">${bolumBasIc(b).replace(ic(I('expand')), ic(I('rowNext')))}</a>` : `<div class="dgu-bolum-bas is-sabit">${bolumBasIc(b).replace(ic(I('expand')), '')}</div>`;
  // Akordiyon (docs/51 DgAccordion) — aynı anda en çok BİR bölüm açık; varsayılan acik (sıra) ya da ilk. Başlık DG bölüm başlığı;
  // gövde grid-rows 0fr→1fr (hareket token'ı), chevron döner; aria-expanded/aria-controls, kapalı gövde inert; klavye: native düğme.
  const akordiyon = (bolumler, {ad = 'ak', acik = 0} = {}) => `<div class="dgu-akordiyon" data-akordiyon>${bolumler.map((b, i) => { const on = i === acik; return `<section class="dgu-ak-bolum${on ? ' is-acik' : ''}"${b.id ? ` id="${esc(b.id)}"` : ''}><h3 class="dgu-ak-h"><button type="button" class="dgu-bolum-bas" id="${ad}-b${i}" aria-expanded="${on}" aria-controls="${ad}-g${i}">${bolumBasIc(b)}</button></h3><div class="dgu-ak-panel" id="${ad}-g${i}" role="region" aria-labelledby="${ad}-b${i}"${on ? '' : ' inert'}><div class="dgu-ak-ic">${b.icerik || ''}</div></div></section>`; }).join('')}</div>`;
  // Bayrak ızgarası ekranı doldurur (Beyar, 12 Ekim): kapalıyken görünen öğe sayısı sabit değil — ızgaranın üstünden alttaki sabit
  // katmana (alt eylem çubuğu, dock) kadar sığan TAM satır kadar; “N mutfak daha” ızgaranın hemen altında. Açıksa dokunulmaz.
  function bayrakSigdir(root = document) {
    root.querySelectorAll('.dgu-bayrak-secim[data-sigdir]').forEach(k => {
      const d = k.querySelector('.dgu-bayrak-daha'); if (d && d.getAttribute('aria-expanded') === 'true') return;
      const ogeler = [...k.querySelectorAll('.dgu-bayrak-oge')]; if (!ogeler.length || !k.getClientRects().length) return;
      const iz = k.querySelector('.dgu-bayrak-izgara'); iz.style.rowGap = '';   // önceki dağıtımı sıfırla, sonra ölç
      const cs = getComputedStyle(iz), sutun = cs.gridTemplateColumns.split(' ').length, ara = parseFloat(cs.rowGap) || 8;
      // Önce yalnız ilk satır: alttaki öğeler (akıştaki ya da sabit düğme alanı) ızgara büyümeden önceki yerinde ölçülür.
      ogeler.forEach((o, i) => { o.hidden = i >= sutun; }); if (d) d.hidden = false;
      const yuk = ogeler[0].getBoundingClientRect().height, irect = iz.getBoundingClientRect();
      // Alt sınır: ekranın dibine dayanan sabit/yapışkan çubuk ya da akıştaki alt eylem alanı (data-alt-sabit). Izgaranın altındaki diğer içerik (akordiyon başlıkları vb.) sınır sayılmaz.
      let alt = innerHeight; document.querySelectorAll('body *').forEach(e => { if (e.contains(iz) || k.contains(e) || !e.getClientRects().length) return; const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (e.hasAttribute('data-alt-sabit')) { alt = Math.min(alt, innerHeight - r.height); return; } if (!(cs.position === 'fixed' || cs.position === 'sticky')) return; if (r.height < 24 || r.top < irect.bottom || r.top < innerHeight / 2 || r.bottom < innerHeight - 2) return; if (r.top < alt) alt = r.top; });
      const ust = irect.top, dahaH = d ? d.offsetHeight + (parseFloat(getComputedStyle(d).marginTop) || 0) : 0;
      const satir = Math.max(1, Math.floor((alt - ust - dahaH + ara) / (yuk + ara)));
      let n = Math.min(ogeler.length, satir * sutun);
      const uygula = () => ogeler.forEach((o, i) => { o.hidden = i >= n; if (i >= n) o.setAttribute('data-bayrak-ek', ''); else o.removeAttribute('data-bayrak-ek'); });
      uygula();
      // İki satırlık adlar satırı uzatabilir: düğme alt sınırı aşıyorsa bir satır geri al.
      while (n > sutun && (d ? d.getBoundingClientRect().bottom : iz.getBoundingClientRect().bottom) > alt) { n -= sutun; uygula(); }
      if (d) { const kalan = ogeler.length - n; d.hidden = kalan <= 0; d.dataset.bayrakDaha = `${kalan} mutfak daha`; d.querySelector('span').textContent = d.dataset.bayrakDaha; }
      // Boş bant kalmasın: son tam satırdan sonra kalan yükseklik satır aralarına dağıtılır (satır başına en çok 16 ek).
      const satirN = Math.ceil(n / sutun), kalanY = alt - (d && !d.hidden ? d.getBoundingClientRect().bottom : iz.getBoundingClientRect().bottom);
      if (satirN > 1 && kalanY > 0) iz.style.rowGap = `${ara + Math.min(16, kalanY / (satirN - 1))}px`;
    });
  }
  addEventListener('load', () => bayrakSigdir()); addEventListener('resize', () => bayrakSigdir()); document.fonts?.ready.then(() => bayrakSigdir());
  new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && (n.matches?.('.dgu-bayrak-secim') || n.querySelector?.('.dgu-bayrak-secim[data-sigdir]'))))) requestAnimationFrame(() => requestAnimationFrame(() => bayrakSigdir())); }).observe(document.documentElement, {childList: true, subtree: true});
  // GÜLÜCÜK KAPAK (docs/51 DgSmileCover; Beyar düzeltmesi 13 Ekim — “izin ekranları giriş hero'sunun ortak gülücük bileşenini aynen kullansın”):
  // kenardan kenara gerçek fotoğraf + ortak koyu geçiş (.dg-veil-top/.dg-veil-bottom, metin varsa konumundan --dg-veil) + primary ışık (screen),
  // alt kenarda aynı eğri ve turuncu çizgi (.dgu-gulucuk). icerik: kapak üstü metin (ör. giriş başlığı); rozet: eğrinin TAM ORTASINA oturan ikon
  // rozeti (izin istemleri); red: rozet nötr. Kullananlar: Giriş Yap / Kayıt Ol hero'su, bildirim ve kamera izni, izin reddedildi.
  const gulucuk = ({gorsel, icerik = '', rozet, red, sinif = ''} = {}) => `<div class="dgu-gkap${rozet ? ' has-rozet' : ''}${sinif ? ' ' + sinif : ''}"><section class="dgu-gulucuk dgu-gkapak dg-veil-top dg-veil-bottom"${gorsel ? ` style="background-image:url('../${esc(gorsel)}')"` : ''}><span class="dgu-gkapak-golge" aria-hidden="true"></span><span class="dgu-gkapak-isik" aria-hidden="true"></span>${icerik}</section>${rozet ? `<span class="dgu-gkapak-rozet${red ? ' is-red' : ''}" aria-hidden="true">${ic(rozet)}</span>` : ''}</div>`;
  // İzin istemi (docs/51 DgPermissionPrompt) — izin öncesi ekran: üstte gerçek görselli büyük alan (gülücük) + ortada ikon rozeti,
  // başlık + kısa gerekçe, neden izin istendiğini anlatan solid ikonlu maddeler, altta sabit düğmeler (bar). Reddedildi: aynı iskelet,
  // “Ayarları aç” + alternatif. Dönen {html, bar} doğrudan DG.sayfa'ya verilir (tur: 'tam').
  // o = {ikon, gorsel, baslik, metin, maddeler: [[ikon, başlık, açıklama]], izin: 'İzin ver', alternatif: [metin, href], reddedildi: {baslik, metin}, red}
  const izinIstemi = o => { const r = !!o.red, b = r ? o.reddedildi : o;
    const html = `<div class="dgu-izin${r ? ' is-red' : ''}">${gulucuk({gorsel: o.gorsel, rozet: r ? 'lock' : o.ikon, red: r})}<div class="dgu-ic dgu-izin-govde"><h1 class="t-page">${esc(b.baslik)}</h1><p class="dgu-izin-metin">${esc(b.metin)}</p>${!r && o.maddeler?.length ? maddeler(o.maddeler) : ''}</div></div>`;
    const bar = r ? `${o.alternatif ? btn(o.alternatif[0], {tur: 'ikincil', href: o.alternatif[1]}) : btn('Şimdi değil', {tur: 'ikincil', attrs: 'data-geri'})}${btn('Ayarları aç', {ikon: 'gear', attrs: 'data-izin-ayar'})}` : `${o.alternatif ? btn(o.alternatif[0], {tur: 'ikincil', href: o.alternatif[1]}) : btn('Şimdi değil', {tur: 'ikincil', attrs: 'data-geri'})}${btn(o.izin || 'İzin ver', {attrs: 'data-izin-ver'})}`;
    return {html, bar}; };
  const anahtar = (ad, acik, aria) => `<label class="dgu-anahtar"><input type="checkbox" name="${ad}" ${acik ? 'checked' : ''} aria-label="${esc(aria)}"><i></i></label>`;
  const satir = ({ikon, baslik, alt, href, sag = I('rowNext'), attrs = '', sinif = ''}) => { const ic1 = ikon ? `<span class="dgu-satir-ikon">${ic(ikon)}</span>` : ''; const inner = `${ic1}<span class="dgu-satir-metin"><span>${esc(baslik)}</span>${alt ? `<small>${esc(alt)}</small>` : ''}</span>${sag ? ic(sag) : ''}`; return href != null ? `<a class="dgu-satir ${sinif}" href="${esc(href)}" ${attrs}>${inner}</a>` : `<button class="dgu-satir ${sinif}" type="button" ${attrs}>${inner}</button>`; };
  const durum = ({ikon, baslik, metin, eylem, tam}) => `<div class="dgu-durum${tam ? ' is-tam' : ''}"><span class="dgu-durum-ikon">${ic(ikon)}</span><h2 class="t-section">${esc(baslik)}</h2>${metin ? `<p>${esc(metin)}</p>` : ''}${eylem || ''}</div>`;
  const HATA = {
    sunucu: {ikon: I('error'), baslik: 'Bir şeyler ters gitti', metin: 'Beklenmedik bir hata oluştu. Biraz sonra tekrar dene.'},
    zaman: {ikon: 'hourglass-half', baslik: 'Yanıt gecikti', metin: 'Sunucu zamanında yanıt vermedi. Tekrar dene.'},
    'baglanti-yok': {ikon: I('offline'), baslik: 'Bağlantı yok', metin: 'İnternet bağlantını kontrol edip tekrar dene.'}
  };
  // Durum sahnesi (docs/51 DgStateScene) — hata/boş/kenar durumlarının kaliteli ortak kalıbı (Beyar, 12 Ekim; Tabaktan Tarif dili):
  // üstte görsel alan (koyu sahne: kullanıcının fotoğrafı tarama çerçevesi köşeleriyle + durum işareti; açık: büyük ikon rozeti),
  // başlık + kısa açıklama (HTML, bold), tek ana eylem + ikincil seçenekler, isteğe bağlı satır içi arama (“Adını yaz”), ipuçları
  // (ikonlu 3 kart) ya da yatay öneriler (ortak tarif kartı), güvence notu. o = {tema:'koyu'|'acik', gorsel, isaret:'soru'|'bulanik'|
  // 'baglanti'|'yemek'|'uyari'|ikon-adı, baslik, metin, not, ana:{metin, ikon, href|attrs}, ikinciller:[{metin, ikon, href|attrs}],
  // ara:{yer, ad}, ipuclari:[[ikon, başlık, açıklama]], oneriler:[tarif], onerilerBaslik}
  const ISARET = {soru: 'question', bulanik: 'droplet-slash', baglanti: 'wifi', yemek: 'utensils', uyari: 'triangle-exclamation', hata: 'circle-exclamation'};
  const eylemBtn = (e, tur) => e ? btn(e.metin, {tur, ikon: e.ikon, href: e.href, attrs: e.attrs || '', tam: true}) : '';
  // KAMERA VİZÖRÜ (Beyar V4; durum sahnesinin üst parçasından türetildi — Dolaptan kamera/üretiliyor, Dolabım barkod sheet'i, durum sahnesi):
  // koyu zemin + primary ışık, fotoğraf çerçevesi + dört tarama köşesi, ortada işaret, altında yönerge; tarama: hareketli tarama çizgisi
  // (hareketi azalt'ta durur); kompakt: sheet içinde (kubbe bindirme payı yok, kart radius'u). ek: altına eklenecek HTML (ör. foto şeridi).
  const vizor = ({foto, isaret, yonerge, tarama, bulanik, kompakt, ek = '', sinif = ''} = {}) => `<div class="dgu-sahne-ust is-koyu dgu-vizor${kompakt ? ' is-kompakt' : ''}${sinif ? ' ' + sinif : ''}"><div class="dgu-sahne-cerceve${bulanik ? ' is-bulanik' : ''}"><span class="dgu-sahne-foto"${foto ? ` style="background-image:url('${esc(foto)}')"` : ''}></span><i class="dgu-kose is-ust-sol"></i><i class="dgu-kose is-ust-sag"></i><i class="dgu-kose is-alt-sol"></i><i class="dgu-kose is-alt-sag"></i>${tarama ? '<i class="dgu-vizor-tarama" aria-hidden="true"></i>' : ''}${isaret ? `<span class="dgu-sahne-isaret" aria-hidden="true">${ic(ISARET[isaret] || isaret)}</span>` : ''}</div>${yonerge ? `<p class="dgu-sahne-not">${ic(yonerge.ikon || 'shield-halved')}<span>${esc(yonerge.metin ?? yonerge)}</span></p>` : ''}${ek}</div>`;
  // FOTO ŞERİDİ (küçük foto + kart kaydet eyleminin dilinde kaldır düğmesi; Dolaptan kamera/tanıma/sonuç, tarif ekle, Dolabım):
  // ogeler [{src, ad, silAttrs, aria}] · {aria, sil = true}: yatay kayar (.dgu-serit), 56 foto, sağ üstte 44 hedefli kaldır (görünür 24, koyu
  // yarı saydam + bulanık yüzey, 12 beyaz ikon — kart kaydet eylemiyle aynı dil), isteğe bağlı alt ad (meta, tek satır).
  const fotoSerit = (ogeler, {aria = 'Fotoğraflar', sil = true} = {}) => `<ul class="dgu-serit dgu-foto-serit" aria-label="${esc(aria)}">${ogeler.map((o, i) => `<li class="dgu-foto-oge">${kucukFoto(o.src)}${sil && o.silAttrs ? `<button type="button" class="dgu-foto-sil" ${o.silAttrs} aria-label="${esc(o.aria || `${i + 1}. fotoğrafı kaldır`)}">${ic('xmark')}</button>` : ''}${o.ad ? `<small class="dgu-foto-ad">${esc(o.ad)}</small>` : ''}</li>`).join('')}</ul>`;
  // ADIMLAYICI (porsiyon / adet; tarif detayının porsiyon sayacından türetildi — kökte detay-v2 aynı işaretlemeye bağlanır): − / + 44 hedef,
  // değer ortada tek satır (sayı kalın + birim meta); orta alan sabit genişlik = en geniş değer (en az iki hane, ekranlar arası aynı) + birim (görünmez iz, aynı ızgara hücresi) →
  // değer değişince düğmeler kaymaz. Sınırda düğme devre dışı; gizli input (form uyumlu), change + dg-adim olayı.
  // {ad, deger, min = 1, max = 99, adim = 1, birim = '', aria, azalt = 'Azalt', artir = 'Artır'}. CSS: ortak/dg-sayac.css.
  const adimDeger = (v, birim) => `<b>${esc(v)}</b>${birim ? `<span>${esc(birim)}</span>` : ''}`;
  const adimlayici = ({ad, deger = 1, min = 1, max = 99, adim = 1, birim = '', aria = '', azalt = 'Azalt', artir = 'Artır'} = {}) => `<div class="dgu-adimlayici" role="group" aria-label="${esc(aria || ad)}" data-adimlayici data-min="${min}" data-max="${max}" data-adim="${adim}" data-birim="${esc(birim)}"><button type="button" data-adim-yon="-1" aria-label="${esc(azalt)}"${+deger <= min ? ' disabled' : ''}>${ic('minus')}</button><span class="dgu-adim-deger"><output aria-live="polite">${adimDeger(deger, birim)}</output><span class="dgu-adim-iz" aria-hidden="true">${adimDeger('0'.repeat(Math.max(2, String(max).length)), birim)}</span></span><input type="hidden" name="${esc(ad)}" value="${esc(deger)}"><button type="button" data-adim-yon="1" aria-label="${esc(artir)}"${+deger >= max ? ' disabled' : ''}>${ic('plus')}</button></div>`;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-adim-yon]'); if (!b) return; const k = b.closest('[data-adimlayici]'), i = k.querySelector('input'), d = k.dataset;
    const v = Math.min(+d.max, Math.max(+d.min, +i.value + +b.dataset.adimYon * +d.adim)); if (v === +i.value) return;
    i.value = v; k.querySelector('output').innerHTML = adimDeger(v, d.birim); k.querySelector('[data-adim-yon="-1"]').disabled = v <= +d.min; k.querySelector('[data-adim-yon="1"]').disabled = v >= +d.max;
    i.dispatchEvent(new Event('change', {bubbles: true})); k.dispatchEvent(new CustomEvent('dg-adim', {bubbles: true, detail: v}));
  });
  function durumSahne(o) {
    const koyu = o.tema === 'koyu', ik = ISARET[o.isaret] || o.isaret || 'circle-info';
    const gorsel = koyu ? vizor({foto: o.gorsel, isaret: ik, bulanik: o.isaret === 'bulanik', yonerge: o.not ? {ikon: 'shield-halved', metin: o.not} : ''}) : `<div class="dgu-sahne-ust"><span class="dgu-sahne-rozet" aria-hidden="true">${ic(ik)}</span></div>`;
    const ara = o.ara ? `<details class="dgu-sahne-ara"><summary class="dgu-btn dgu-btn--metin">${ic(I('search'))}<span>${esc(o.ara.etiket || 'Yemeğin adını yaz')}</span></summary><form class="dgu-girdi" role="search" data-sahne-ara>${ic(I('search'))}<input type="search" name="${esc(o.ara.ad || 'q')}" placeholder="${esc(o.ara.yer || 'Örn. mercimek çorbası')}" aria-label="${esc(o.ara.etiket || 'Yemeğin adını yaz')}" enterkeyhint="search"></form></details>` : '';
    const ipuc = o.ipuclari?.length ? `<section class="dgu-sahne-ek" aria-label="İpuçları"><h2 class="t-sub">${esc(o.ipucuBaslik || 'Daha iyi bir fotoğraf için')}</h2><ul class="dgu-sahne-ipuclari">${o.ipuclari.map(([i, b, a]) => `<li><span class="dgu-sahne-ipucu-ikon" aria-hidden="true">${ic(i)}</span><span><b>${esc(b)}</b>${a ? `<small>${esc(a)}</small>` : ''}</span></li>`).join('')}</ul></section>` : '';
    const oner = o.oneriler?.length ? `<section class="dgu-sahne-ek" aria-label="${esc(o.onerilerBaslik || 'Belki bunlardan biri?')}"><h2 class="t-sub">${esc(o.onerilerBaslik || 'Belki bunlardan biri?')}</h2><div class="dgu-serit dgu-sahne-oneriler">${o.oneriler.map(t => kart(t, 'tile')).join('')}</div></section>` : '';
    return `<div class="dgu-sahne${koyu ? ' is-koyu' : ''}">${gorsel}<div class="dgu-sahne-panel"><div class="dgu-sahne-metin"><h1 class="t-page">${esc(o.baslik)}</h1>${o.metin ? `<p>${o.metin}</p>` : ''}</div><div class="dgu-sahne-eylem">${eylemBtn(o.ana)}${(o.ikinciller || []).map(e => eylemBtn(e, 'ikincil')).join('')}${ara}</div>${ipuc}${oner}</div></div>`;
  }
  // Ortak hata durumları sahne kalıbıyla (tam ekran): ana eylem Tekrar dene, ikincil Ana sayfa; bağlantıda ipuçları.
  const HATA_EK = {'baglanti-yok': {ipucuBaslik: 'Kontrol edebileceklerin', ipuclari: [['wifi', 'Wi-Fi ya da mobil veri', 'Bağlantının açık olduğundan emin ol.'], ['plane', 'Uçak modu', 'Açıksa kapat.'], ['rotate-right', 'Yeniden dene', 'Bağlantı gelince sayfa kaldığı yerden açılır.']]}};
  const hata = (tur = 'sunucu', tam) => tam ? durumSahne({isaret: HATA[tur].ikon, baslik: HATA[tur].baslik, metin: esc(HATA[tur].metin), ana: {metin: 'Tekrar dene', ikon: I('update'), attrs: 'data-tekrar'}, ikinciller: [{metin: 'Ana sayfaya dön', ikon: 'house', href: KOK.ana}], ...(HATA_EK[tur] || {})}) : durum({...HATA[tur], eylem: btn('Tekrar dene', {ikon: I('update'), attrs: 'data-tekrar'})});
  // İskelet (docs/51 DgSkeleton) — gerçek yerleşimi taklit eden shimmer kalıplar; inert + aria-busy. tur:
  // kart (2 sütun tarif kartı: 4:5 görsel + kategori + 2 satır başlık + yazar) · satir (56 küçük foto + 2 satır) · liste (kart satırı)
  // · detay (fotoğraf + başlık + meta + paragraf) · profil (kapak + 96 avatar + ad + sayaç + sekme) · izgara (3 sütun kare).
  const isk = (cls, ek = '') => `<span class="dgu-iskelet ${cls}"${ek}></span>`;
  const ISK = {
    bayrak: () => `<span class="dgu-isk-bayrak">${isk('is-bayrak')}${isk('is-satir is-kisa')}${isk('is-etiket')}</span>`,
    kart: () => `<div class="dgu-isk-kart">${isk('is-kart')}${isk('is-etiket')}${isk('is-satir')}${isk('is-satir is-kisa')}<span class="dgu-isk-yazar">${isk('is-avatar20')}${isk('is-satir is-ad')}</span></div>`,
    satir: () => `<div class="dgu-isk-satir">${isk('is-kucuk')}<span class="dgu-isk-metin">${isk('is-satir')}${isk('is-satir is-kisa')}</span></div>`,
    liste: () => `<div class="dgu-isk-satir is-kart">${isk('is-liste-foto')}<span class="dgu-isk-metin">${isk('is-etiket')}${isk('is-satir')}${isk('is-satir is-kisa')}</span></div>`,
    izgara: () => `${isk('is-kare')}`
  };
  const iskelet = (n = 4, tur = 'kart') => {
    if (tur === 'detay') return `<div class="dgu-isk-detay" aria-busy="true" inert>${isk('is-kapak')}<div class="dgu-ic dgu-yigin-12">${isk('is-baslik')}${isk('is-satir is-kisa')}<span class="dgu-isk-cipler">${isk('is-cip')}${isk('is-cip')}${isk('is-cip')}</span>${Array.from({length: n}, (_, i) => isk('is-satir' + (i % 3 === 2 ? ' is-kisa' : ''))).join('')}</div></div>`;
    if (tur === 'profil') return `<div class="dgu-isk-profil" aria-busy="true" inert>${isk('is-kapak is-kisa-kapak')}<span class="dgu-isk-avatar">${isk('is-avatar96')}</span><div class="dgu-ic dgu-yigin-12">${isk('is-baslik is-orta')}${isk('is-satir is-orta is-kisa')}<span class="dgu-isk-sayac">${isk('is-sayi')}${isk('is-sayi')}${isk('is-sayi')}${isk('is-sayi')}</span>${isk('is-sekme')}</div><div class="dgu-ic">${iskelet(n, 'kart')}</div></div>`;
    const kap = tur === 'satir' ? 'dgu-yigin' : tur === 'liste' ? 'dgu-yigin-12' : tur === 'izgara' ? 'dgu-izgara-3' : tur === 'bayrak' ? 'dgu-bayrak-izgara' : 'dgu-izgara';
    return `<div class="${kap}" aria-busy="true" inert>${Array.from({length: n}, () => (ISK[tur] || ISK.kart)()).join('')}</div>`;
  };
  // docs/55 §2c (Beyar): prototipi anlatan not ekranda çizilmez; açıklama galeri satırının `aciklama` alanındadır. Çağrılar uyumluluk için kalır.
  const onizleme = () => '';

  // ---------- Snackbar ----------
  let snackEl, snackT;
  function bildir(mesaj, {eylem, ikon, sure} = {}) {
    if (!snackEl) { snackEl = document.createElement('div'); snackEl.className = 'dgu-snack'; snackEl.setAttribute('role', 'status'); snackEl.setAttribute('aria-live', 'polite'); document.body.append(snackEl); }
    snackEl.innerHTML = `${ikon ? ic(ikon) : ''}<span>${esc(mesaj)}</span>${eylem ? (eylem.href ? `<a href="${esc(eylem.href)}">${esc(eylem.ad)}</a>` : `<button type="button">${esc(eylem.ad)}</button>`) : ''}`;
    if (eylem?.fn) snackEl.querySelector('button').onclick = () => { snackEl.classList.remove('is-on'); eylem.fn(); };
    requestAnimationFrame(() => snackEl.classList.add('is-on'));
    clearTimeout(snackT);
    snackT = setTimeout(() => snackEl.classList.remove('is-on'), sure || (eylem ? TK.motion.toastAction : TK.motion.toast));
  }
  window.toast = m => bildir(m);

  // ---------- Sheet ----------
  function sheet({baslik, govde, ayak = '', sinif = ''}) {
    const d = document.createElement('dialog');
    d.className = 'dgu-sheet ' + sinif;
    d.setAttribute('aria-label', baslik);
    d.innerHTML = `<div class="dgu-tutamak" aria-hidden="true"></div><div class="dgu-sheet-bas"><h2 class="t-sheet">${esc(baslik)}</h2><button class="dgu-ibtn" type="button" data-kapat aria-label="Kapat">${ic(I('close'))}</button></div><div class="dgu-sheet-govde">${govde}</div>${ayak ? `<div class="dgu-sheet-ayak">${ayak}</div>` : ''}`;
    document.body.append(d);
    const kapat = () => { if (!d.open) return; d.classList.add('is-cikis'); document.body.classList.remove('dgu-kilit'); setTimeout(() => { d.close(); d.remove(); }, motion.matches ? 0 : TK.motion.base); };
    d.kapat = kapat;
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-kapat]')) kapat(); });
    d.addEventListener('cancel', e => { e.preventDefault(); kapat(); });
    // Tutma çubuğundan aşağı sürükle → kapat (yarı yükseklik ya da hızlı fırlatma)
    let y0 = null, t0 = 0;
    const tut = d.querySelector('.dgu-tutamak');
    tut.addEventListener('pointerdown', e => { y0 = e.clientY; t0 = performance.now(); tut.setPointerCapture(e.pointerId); });
    tut.addEventListener('pointermove', e => { if (y0 != null) d.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`; });
    tut.addEventListener('pointerup', e => { if (y0 == null) return; const dy = e.clientY - y0, v = dy / Math.max(1, performance.now() - t0); y0 = null; d.style.transform = ''; if (dy > d.offsetHeight / 2 || v > 0.7) kapat(); });
    d.showModal(); document.body.classList.add('dgu-kilit');
    return d;
  }
  function onay({baslik, metin, evet, hayir = 'İptal'}) {
    return new Promise(res => {
      const d = document.createElement('dialog');
      d.className = 'dgu-diyalog';
      d.setAttribute('aria-label', baslik);
      d.innerHTML = `<h2 class="t-sheet">${esc(baslik)}</h2>${metin ? `<p>${esc(metin)}</p>` : ''}<div class="dgu-ikili">${btn(hayir, {tur: 'ikincil', attrs: 'data-h'})}${btn(evet, {attrs: 'data-e'})}</div>`;
      document.body.append(d);
      const bit = v => { d.close(); d.remove(); res(v); };
      d.querySelector('[data-h]').onclick = () => bit(false);
      d.querySelector('[data-e]').onclick = () => bit(true);
      d.addEventListener('cancel', e => { e.preventDefault(); bit(false); });
      d.showModal();
    });
  }

  // ---------- Giriş kapısı (canlı metinler) ----------
  const KAPI = {kaydet: 'Kaydetmek için giriş yap', takip: 'Takip etmek için giriş yap', alkis: 'Alkışlamak için giriş yap', yaptim: 'Bu tarifi yaptığını paylaşmak için giriş yap', menu: 'Menüye eklemek için giriş yap', menuAc: 'Menüyü açmak için giriş yap', liste: 'Alışveriş listesine eklemek için giriş yap', yorum: 'Yorum yapmak için giriş yap', tarifEkle: 'Tarif eklemek için giriş yap', puf: 'Püf noktası eklemek için giriş yap', faydali: 'Faydalı bulmak için giriş yap'};
  // kapi(tur, bekleyen, {devam}): devam = dönüşte gidilecek yer — '#yorumlar' gibi çapa ya da 'yorumlar' (?devam=yorumlar olarak eklenir).
  function kapi(tur = 'kaydet', bekleyen = '', {devam = ''} = {}) {
    // Dönüş adresi test parametrelerinden (oturum, giris, ornek) arınmış: galeriden misafir hâlinde giriş yapınca dönüş giriş yapılmış açılır.
    let don = decodeURIComponent(donusAdres()).replace(/#.*$/, '');
    if (devam) don = devam.startsWith('#') ? don + devam : don + (don.includes('?') ? '&' : '?') + 'devam=' + encodeURIComponent(devam);
    const p = new URLSearchParams({donus: don}); if (bekleyen) p.set('eylem', bekleyen);
    sheet({baslik: KAPI[tur] || 'Bu işlem için giriş yap', govde: `<p class="c-muted">Kaydetmek, yorum yapmak ve takip etmek için DadaGastro hesabına giriş yapman gerekiyor.</p>`, ayak: `<div class="dgu-ikili">${btn('Üye Ol', {tur: 'ikincil', href: 'kayit.html?' + p})}${btn('Giriş Yap', {href: 'giris.html?' + p})}</div>`});
  }
  function proKapi() {
    sheet({baslik: 'Bu içerik Pro\'da', govde: `<div class="dgu-yigin-12"><p class="c-muted">Şef tarifleri ve adım adım video mutfağı DadaGastro Pro üyeliğinle açılır.</p>${['Reklamsız deneyim', 'Pro tarifler', 'Haftalık menü & video mutfağı'].map(x => `<p class="dgu-satir" style="min-height:auto">${ic('check', 'c-deep')}<span class="dgu-satir-metin">${esc(x)}</span></p>`).join('')}</div>`, ayak: `<div class="dgu-ikili">${btn('Pro\'yu İncele', {tur: 'ikincil', href: 'pro.html'})}${btn('Pro\'ya Geç', {href: 'pro.html#planlar'})}</div>`});
  }
  // Bekleyen eylemi tamamla (girişten dönüşte): kaydet:slug · takip:kullanici · liste:slug
  function eylemiTamamla(e) {
    if (!e) return null;
    const [tur, deger] = e.split(':');
    if (tur === 'kaydet') { const s = kayitli.al(); if (!s.includes(deger)) kayitli.yaz([deger, ...s]); return 'Mutfak Defterim\'e kaydedildi'; }
    if (tur === 'takip') { const s = store.get('takip', []); if (!s.includes(deger)) store.set('takip', [...s, deger]); return 'Takip etmeye başladın.'; }
    if (tur === 'liste') { tumunuListeyeEkle(deger); return 'Malzemeler alışveriş listene eklendi'; }
    // Revize B7 (13 Ekim): giriş duvarlı her eylemin giriş sonrası devamı — eylem dönüşte tamamlanır, sayfa kaldığı yerden açılır.
    if (tur === 'faydali') { const s = store.get('puf-faydali', []); if (!s.includes(deger)) store.set('puf-faydali', [...s, deger]); return 'Faydalı buldun'; }
    if (tur === 'pufkaydet') { const s = store.get('puf-kayit', []); if (!s.includes(deger)) store.set('puf-kayit', [...s, deger]); return 'Kaydedildi'; }
    if (tur === 'menu') { const m = store.get('menu-tepsi', []); if (!m.includes(deger)) store.set('menu-tepsi', [...m, deger]); return 'Menü tepsine eklendi'; }
    if (tur === 'yorum') return 'Giriş yaptın · yorumunu yazabilirsin';
    if (tur === 'akisbegeni' || tur === 'akiskayit') { const k = tur === 'akisbegeni' ? 'akis-begeni' : 'akis-kayit', l = store.get(k, []), no = +deger; if (!l.includes(no)) store.set(k, [...l, no]); return tur === 'akisbegeni' ? 'Beğendin' : 'Kaydedildi'; }
    if (tur === 'devam') return 'Giriş yaptın · kaldığın yerden devam et';
    return null;
  }

  // ---------- Kaydet / takip / alışveriş (yerel önizleme) ----------
  function kaydetDegis(slug, btnEl) {
    if (!uye()) return kapi('kaydet', 'kaydet:' + slug);
    const s = kayitli.al(); const on = !s.includes(slug);
    kayitli.yaz(on ? [slug, ...s] : s.filter(x => x !== slug));
    document.querySelectorAll(`[data-kaydet="${CSS.escape(slug)}"]`).forEach(b => { b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Kaydedildi' : 'Tarifi kaydet'); });
    if (on) bildir('Mutfak Defterim\'e kaydedildi', {eylem: {ad: 'Gör', href: 'kaydettiklerim.html'}});
    else bildir('Kayıt kaldırıldı', {eylem: {ad: 'Geri al', fn: () => kaydetDegis(slug)}});
  }
  function tumunuListeyeEkle(slug) {
    const t = tarif(slug); if (!t) return;
    const l = store.get('alisveris', []);
    for (const m of t.malzemeler) if (m.ad && !l.some(x => x.ad === m.ad && x.tarif === slug)) l.push({id: Math.random().toString(36).slice(2, 9), ad: m.ad, miktar: [m.miktar, m.birim].filter(Boolean).join(' '), tarif: slug, isaretli: false});
    store.set('alisveris', l);
  }
  // Telefon numarası: yalnız rakam, TR'de 3-3-2-2 biçim, gizli alana aynalanır (web kaTelDegeri deseni).
  document.addEventListener('input', e => { const t = e.target; if (t.type !== 'tel') return; const k = t.closest('[data-telefon]'); if (!k) return; const g = k.querySelectorAll('input[type=hidden]'), iso = g[1].value; let r = t.value.replace(/\D/g, ''); if (iso === 'TR') r = r.replace(/^0/, '').slice(0, 10); else r = r.slice(0, 15); g[0].value = r; t.value = telefonBicim(r, iso); k.classList.remove('is-hata'); });
  document.addEventListener('change', e => { const r = e.target.closest?.('.dgu-puan input'); if (r) { const l = r.closest('.dgu-puan').querySelector('.dgu-puan-etiket'); if (l) l.textContent = PUAN[r.value - 1] || ''; } });
  // Yorum formları (püf satır içi, yanıt, tarif değerlendir sheet'i)
  document.addEventListener('submit', e => { const ys = e.target.closest('.dgu-yrm'); if (!ys) return; e.preventDefault(); const f = e.target, ta = f.querySelector('textarea'), v = ta.value.trim();
    if (f.classList.contains('dgu-yrm-yanit-form')) { if (!v) { ta.focus(); return; } f.insertAdjacentHTML('afterend', yorumKart({yazar: 'Sen', metin: v, tarih: 'Az önce', durum: 'onay_bekliyor'}, {tur: ys.dataset.yrmTur}, true)); f.remove(); bildir('Yanıtın alındı; incelendikten sonra yayımlanır.'); return; }
    if (f.matches('[data-yrm-form]')) { const k = f.querySelector('.dgu-alan'); if (!v) { k?.classList.add('is-hata'); ta.focus(); return; } yorumEkle(ys, {yazar: 'Sen', metin: v, tarih: 'Az önce', durum: 'onay_bekliyor'}); ta.value = ''; } });
  document.addEventListener('input', e => { const t = e.target; if (t.tagName !== 'TEXTAREA' || !t.closest('.dgu-yrm, .dgu-yrm-form')) return; t.closest('.dgu-alan')?.classList.remove('is-hata'); const y = t.closest('.dgu-alan')?.querySelector('.dgu-yardim'); if (y && /\/2000$/.test(y.textContent)) y.textContent = `${t.value.length}/2000`; });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-izin-ver]')) { bildir('İzin verildi'); setTimeout(geri, TK.motion.reveal * 2); return; }
    if (e.target.closest('[data-izin-ayar]')) { bildir('Cihaz ayarları yakında'); return; }
    const akb = e.target.closest('.dgu-akordiyon .dgu-bolum-bas');
    if (akb) { const kap = akb.closest('.dgu-akordiyon'), bol = akb.closest('.dgu-ak-bolum'), ac = akb.getAttribute('aria-expanded') !== 'true';
      kap.querySelectorAll(':scope > .dgu-ak-bolum').forEach(x => { const on = ac && x === bol; x.classList.toggle('is-acik', on); x.querySelector('.dgu-bolum-bas').setAttribute('aria-expanded', on); const pn = x.querySelector('.dgu-ak-panel'); if (on) pn.removeAttribute('inert'); else pn.setAttribute('inert', ''); });
      if (ac) setTimeout(() => { const r = bol.getBoundingClientRect(), h = document.querySelector('.dgu-header')?.offsetHeight || 0; if (r.top < h) scrollTo({top: scrollY + r.top - h - 8, behavior: motion.matches ? 'auto' : 'smooth'}); }, motion.matches ? 0 : TK.motion.base);
      return; }
    const ys = e.target.closest('.dgu-yrm');
    if (ys) {
      if (e.target.closest('[data-yrm-yaz]')) { if (!uye()) return kapi('yorum', 'yorum', {devam: 'yorumlar'}); return yorumSheet(ys); }
      const bg = e.target.closest('[data-yrm-begen]'); if (bg) { if (!uye()) return kapi('yorum', 'yorum', {devam: 'yorumlar'}); const on = bg.getAttribute('aria-pressed') !== 'true', b = bg.querySelector('b'); bg.setAttribute('aria-pressed', on); b.textContent = sayi(+b.textContent.replace(/\D/g, '') + (on ? 1 : -1)); return; }
      if (e.target.closest('[data-yrm-bildir]')) { if (!uye()) return kapi('yorum', 'yorum', {devam: 'yorumlar'}); onay({baslik: 'Yorumu bildir', metin: 'Bu yorum topluluk kurallarına aykırı mı? Bildirimin ekibimize iletilir.', evet: 'Bildir'}).then(ok => ok && bildir('Bildirimin alındı, teşekkürler.')); return; }
      const yt = e.target.closest('[data-yrm-yanitla]'); if (yt) { if (!uye()) return kapi('yorum', 'yorum', {devam: 'yorumlar'}); const art = yt.closest('article'); if (art.querySelector('.dgu-yrm-yanit-form')) return; yt.closest('.review-actions').insertAdjacentHTML('afterend', `<form class="dgu-yrm-yanit-form" novalidate><div class="dgu-girdi"><textarea aria-label="Yanıtın" maxlength="2000" required></textarea></div>${btn('Yanıtı Gönder', {boy: 'sm', attrs: 'type="submit"'})}</form>`); art.querySelector('.dgu-yrm-yanit-form textarea').focus(); return; }
      if (e.target.closest('[data-yrm-daha]')) { ys.querySelectorAll('[data-yrm-ek]').forEach(a => { a.hidden = false; a.removeAttribute('data-yrm-ek'); }); e.target.closest('[data-yrm-daha]').remove(); return; }
      const fl = e.target.closest('[data-review-filter]'); if (fl) { ys.querySelectorAll('[data-review-filter]').forEach(b => b.setAttribute('aria-pressed', b === fl)); const v = fl.dataset.reviewFilter; let n = 0; ys.querySelectorAll('[data-yrm-liste] > .review').forEach(a => { const st = +a.dataset.stars || 0, ok = v === 'all' || (v === 'photo' ? a.dataset.hasPhoto === 'true' : v === 'low' ? st && st <= 3 : v === 'null' ? !st : st === +v); a.hidden = !ok; n += ok; }); ys.querySelector('[data-yrm-daha]')?.remove(); const bos = ys.querySelector('[data-yrm-filtre-bos]'); if (bos) bos.hidden = n > 0; return; }
    }
    const mk = e.target.closest('.dgu-mod[data-mod]');
    if (mk) { const r = mk.closest('.dgu-mod-serit'); r?.querySelectorAll('.dgu-mod').forEach(b => b.setAttribute('aria-selected', b === mk)); const m = (window.DGMOD || []).find(x => x.slug === mk.dataset.mod); const kap = r?.parentElement?.querySelector('.dgu-mod-aciklama'); if (kap && m) kap.outerHTML = modAciklama(m); mk.dispatchEvent(new CustomEvent('dg-mod', {bubbles: true, detail: m})); }
    const bp = e.target.closest('[data-blok-paylas]');
    if (bp) { paylas({baslik: bp.dataset.blokBaslik, url: bp.dataset.blokPaylas, alt: bp.dataset.blokBaslik}); return; }
    const tu = e.target.closest('[data-telefon-ulke]');
    if (tu) { telefonSec(tu.closest('[data-telefon]')); return; }
    const sa = e.target.closest('[data-sec-alan]');
    if (sa) { const gizli = sa.parentElement.querySelector('input[type=hidden]'), ops = JSON.parse(sa.dataset.secenekler || '[]'), etiket = document.getElementById('l-' + sa.dataset.secAlan)?.textContent.replace(/ \*$/, '') || '';
      const d = sheet({baslik: etiket, govde: `<div class="dgu-satirlar" role="radiogroup" aria-label="${esc(etiket)}">${ops.map(([v, m]) => secim('sec-' + sa.dataset.secAlan, esc(m), {tur: 'radio', deger: v, secili: String(v) === gizli.value})).join('')}</div>`});
      d.addEventListener('change', ev => { const r = ev.target; if (r.type !== 'radio') return; const o = ops.find(([v]) => String(v) === r.value); gizli.value = o[0]; const sp = sa.querySelector('span'); sp.textContent = o[1]; sp.classList.remove('is-yer'); sa.closest('.dgu-alan')?.classList.remove('is-hata'); gizli.dispatchEvent(new Event('change', {bubbles: true})); setTimeout(() => { d.kapat(); sa.focus(); }, motion.matches ? 0 : TK.motion.fast || 150); });
      return; }
    const bd = e.target.closest('[data-bayrak-daha]');
    if (bd) { const acik = bd.getAttribute('aria-expanded') !== 'true'; bd.setAttribute('aria-expanded', acik); bd.closest('.dgu-bayrak-secim').querySelectorAll('[data-bayrak-ek]').forEach(o => { o.hidden = !acik; }); bd.querySelector('span').textContent = acik ? 'Daha az göster' : bd.dataset.bayrakDaha; return; }
    const k = e.target.closest('[data-kaydet]'); if (k) { e.preventDefault(); kaydetDegis(k.dataset.kaydet, k); return; }
    const t = e.target.closest('[data-takip]');
    if (t) { e.preventDefault(); const u = t.dataset.takip; if (!uye()) return kapi('takip', 'takip:' + u); const s = store.get('takip', []); const on = !s.includes(u); store.set('takip', on ? [...s, u] : s.filter(x => x !== u)); t.setAttribute('aria-pressed', on); const sp = t.querySelector('span'); if (sp) sp.textContent = on ? 'Takiptesin' : 'Takip Et'; const ik = t.querySelector('.icon'); if (ik) ik.className = 'icon fa-solid fa-' + (on ? 'check' : 'plus'); if (t.classList.contains('dgu-btn')) { t.classList.toggle('dgu-btn--tonlu', !on); t.classList.toggle('dgu-btn--ikincil', on); } bildir(on ? 'Takip etmeye başladın.' : 'Takibi bıraktın.'); return; }
    const sg = e.target.closest('[data-sifre-goster]'); if (sg) { const i = sg.parentElement.querySelector('input'); const g = i.type === 'password'; i.type = g ? 'text' : 'password'; sg.setAttribute('aria-label', g ? 'Şifreyi gizle' : 'Şifreyi göster'); sg.querySelector('.icon').className = 'icon fa-solid fa-' + I(g ? 'hidePassword' : 'showPassword'); return; }
    if (e.target.closest('[data-tekrar]')) { const u = new URL(location.href); u.searchParams.delete('durum'); location.href = u.href; return; }
    if (e.target.closest('[data-tarif-bul]')) { e.preventDefault(); tarifBul(); return; }
    if (e.target.closest('[data-menu]')) { e.preventDefault(); window.OrtakMenu?.open(); return; }
    if (e.target.closest('[data-geri]')) { e.preventDefault(); geri(); return; }
    if (e.target.closest('[data-pro-kapi]')) { e.preventDefault(); proKapi(); return; }
    const kp = e.target.closest('[data-kapi]'); if (kp) { e.preventDefault(); kapi(kp.dataset.kapi, kp.dataset.bekleyen || ''); return; }
    const da = e.target.closest('[data-drawer-auth]'); if (da) { e.preventDefault(); location.href = (/Üye/.test(da.textContent) ? 'kayit.html?' : 'giris.html?') + new URLSearchParams({donus: here()}); return; }
    const lo = e.target.closest('[data-om-id=logout]'); if (lo) { store.set('oturum', {rol: 'misafir'}); }
  }, true);

  // ---------- Geri ----------
  function geri() {
    try { sessionStorage.setItem('dg-gecis', 'geri'); } catch { /* yok */ }
    const d = qs.get('donus');
    if (d) { location.href = (d.startsWith('uygulama/') ? d.slice(9) : '../' + d); return; }
    if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) { history.back(); return; }
    location.href = KOK.ana;
  }

  // ---------- Tarif bul (orta düğme) ----------
  // Ne Pişirsem (orta düğme) paneli (Beyar V4, 13 Ekim): 2×2 kutu — Dolapta Ne Var, Dolaptan Tarife, Tabaktan Tarif, Dolabım; ikon üstte,
  // başlık altta, açıklama yok. Ad/ikon/hedef tek sabitten (tokens.json modules); kök ekranlar aynı işaretlemeyi dg-baglanti.js ile açar.
  function tarifBul() {
    const M = TK.modules || {};
    const oge = (k, href) => ({baslik: M[k].ad, ikon: M[k].ikon, href, rozet: M[k].pro ? 'Pro' : ''});
    sheet({baslik: 'Tarif bul', govde: parcali([oge('pantryFinder', 'dolapta-ne-var.html'), oge('fridgeToRecipe', 'dolaptan-tarife.html'), oge('plateToRecipe', KOK.tabaktan + '?donus=' + encodeURIComponent(here())), oge('myFridge', 'dolabim.html')], {kutu: 'izgara', aria: 'Tarif bulma yöntemleri'})});
  }


  // ---------- Header, alt menü ----------
  const bildirimSayac = () => uye() ? V.bildirimOrnek?.length || 0 : 0;
  function header(s) {
    const menu = `<button class="dgu-hbtn" type="button" data-menu aria-label="Menü">${ic(I('menu'))}</button>`;
    const zil = `<a class="dgu-hbtn" href="bildirimler.html" aria-label="Bildirimler">${ic(I('notifications'))}</a>`;
    const ara = `<a class="dgu-hbtn dgu-hara" href="arama.html" aria-label="Ara">${ic(I('search'))}</a>`;
    const logo = `<a class="dgu-logo" href="${KOK.ana}" aria-label="DadaGastro ana sayfa"><img src="../assets/marka/dadagastro-beyaz.svg" alt="DadaGastro"></a>`;
    const foto = s.tur === 'banner' ? ' is-photo' : '';
    if (s.tur === 'sekme' || (s.tur === 'banner' && !s.geri)) return `<header class="dgu-header${foto}">${logo}<span class="dgu-hbosluk"></span>${s.ara === false ? '' : ara}${zil}${menu}</header>`;
    return `<header class="dgu-header${foto}"><button class="dgu-hbtn" type="button" data-geri aria-label="Geri">${ic(I('back'))}</button><span class="dgu-htitle clamp-1">${esc(s.baslikHeader ?? s.baslik ?? '')}</span>${s.headerEylem || ''}${menu}</header>`;
  }
  function nav(aktif) {
    const H = {home: KOK.ana, recipes: KOK.liste, videos: 'videolar.html', profile: 'profil.html'};   // Beyar V4 düzeltmesi: 4. Videolar, 5. Profil; Püf alt menüde yok
    return `<div class="dgu-dock"><nav class="dgu-nav" aria-label="Alt menü">${TK.nav.map(it => it.center
      ? `<button type="button" data-tarif-bul aria-label="${esc(it.label)}"><span class="dgu-fab">${ic(it.icon)}</span><span>${esc(it.label)}</span></button>`
      : `<a href="${H[it.id]}"${aktif === it.id ? ' aria-current="page"' : ''}>${ic(it.icon)}<span>${esc(it.label)}</span></a>`).join('')}</nav></div>`;
  }
  // Banner: {baslik, alt, gorsel, sayaclar, perde, oynat: {ad, attrs, ikon}} (ikon: ör. Pro kilidinde 'lock') — oynat verilirse metnin başında yuvarlatılmış kare oynat düğmesi (video detayı).
  function banner(b) {
    const say = b.sayaclar && b.sayaclar.length ? `<p class="dgu-stats${b.sayaclar.length === 1 ? ' is-tek' : ''}">${b.sayaclar.map(([v, l]) => `<span><b>${esc(v)}</b> ${esc(l)}</span>`).join('<span class="dgu-stats-ayrac" aria-hidden="true"></span>')}</p>` : '';
    // Perde: liste banner'ı (kubbe) liste-v2 eğrisi; detay üst görseli (perde:'kart', geri'li banner varsayılanı) tarif kartı/ana-v3 öne çıkan kart
    // overlay'i birebir — ortak-kart.js veils (üst %35 → 0, alt metnin 40 üstünden %60'a smootherstep), ayrı overlay yazılmaz.
    const kart = b.perde === 'kart';
    return `<section class="dgu-banner${kart ? ' is-kart dg-veil-bottom' : ''}"><div class="dgu-banner-foto" style="background-image:url('../${esc(b.gorsel)}')"></div>${kart ? '<span class="dgu-banner-ust" aria-hidden="true"></span><span class="dgu-banner-golge" aria-hidden="true"></span>' : ''}<div class="dgu-banner-metin"${kart ? ' data-dg-veil-from' : ''}>${b.oynat ? `<button type="button" class="dgu-banner-oynat" ${b.oynat.attrs || 'data-oynat'} aria-label="${esc(b.oynat.ad || 'Videoyu oynat')}">${ic(b.oynat.ikon || I('play'))}</button>` : ''}<h1 class="t-page">${esc(b.baslik)}</h1>${b.alt ? `<p>${esc(b.alt)}</p>` : ''}${say}</div></section>`;
  }
  // KUBBE perdesi: liste-v2.js paintBanner eğrisi birebir (smoothstep, 49 durak; metnin 24 üstünde %80, sonda %90; header arkası %76 → 96px'te söner).
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  function kubbeBoya(banner = document.querySelector('.dgu-banner')) {
    if (banner?.classList.contains('is-kart')) { window.DGCard?.veils?.(document); return; }
    const title = banner?.querySelector('h1'), header = document.querySelector('.dgu-header');
    if (!title || !title.offsetParent) return;
    const px = n => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-' + n)) || n;
    const h = banner.offsetHeight, textTop = title.getBoundingClientRect().top - banner.getBoundingClientRect().top;
    const at = Math.max(0, textTop - px(24)), start = Math.max(0, at - px(48) * 2), full = .8, end = .9;
    const lower = y => y <= at ? full * smooth((y - start) / Math.max(1, at - start)) : full + (end - full) * smooth((y - at) / Math.max(1, h - at));
    const H = header ? header.offsetHeight : 0, upper = y => .76 * (1 - smooth((y - H) / (px(48) * 2)));
    const a = y => 1 - (1 - upper(y)) * (1 - lower(y));
    banner.style.setProperty('--dgu-veil', `linear-gradient(180deg,${Array.from({length: 49}, (_, i) => `color-mix(in srgb,var(--overlay) ${(a(h * i / 48) * 100).toFixed(2)}%,transparent) ${(i * 100 / 48).toFixed(3)}%`).join(',')})`);
  }
  // KUBBE: panel header altına gelince köşeler düzleşir (liste-v2 .is-stuck karşılığı).
  function kubbeYapis() {
    const panel = document.querySelector('.dgu-panel'), header = document.querySelector('.dgu-header'); if (!panel) return;
    const sync = () => panel.classList.toggle('is-yapisik', panel.getBoundingClientRect().top <= (header ? header.offsetHeight : 0) + 1);
    addEventListener('scroll', sync, {passive: true}); sync();
  }

  // ---------- Ortak menü bağlantıları ----------
  function menuBagla(aktif) {
    if (!window.OrtakMenu) return;
    const go = h => () => { location.href = h; };
    OrtakMenu.configure({active: aktif || '', links: {home: KOK.ana, recipes: KOK.liste, categories: 'kategoriler.html', cuisines: 'kategoriler.html?sekme=mutfak', videos: 'videolar.html', ask: 'ne-pisirsem.html', pantry: 'dolapta-ne-var.html', tips: 'puf-noktalari.html', plate: KOK.tabaktan + '?donus=' + encodeURIComponent(here()), feedback: 'gorus-bildir.html'},
      actions: {profile: go('profil.html'), saved: go('kaydettiklerim.html'), mine: go('tariflerim.html'), notifications: go('bildirimler.html'), notebook: go('kaydettiklerim.html'), menus: go('menulerim.html'), community: go('rozetlerim.html#topluluk'), chef: go('tariflerim.html'), badges: go('rozetlerim.html'), packages: go('pro.html'), payments: go('pro.html#odemeler'), settings: go('ayarlar.html'), help: go('destek.html'), about: go('hakkimizda.html'), privacy: go('yasal-metin.html?slug=gizlilik')}});
  }

  // ---------- Sayfa iskeleti ----------
  const SAYFALAR = {};
  // Başarı bildirimi cümleleri (eylem tamamlandıktan sonra; sayfa s.basari vermezse).
  const BASARI = {giris: 'Giriş yaptın — hoş geldin', 'iki-adim': 'Doğrulama tamamlandı, giriş yaptın', 'profil-duzenle': 'Profil bilgilerin güncellendi', ayarlar: 'Ayarların kaydedildi', 'gorus-bildir': 'Görüşün iletildi — teşekkürler', iletisim: 'Mesajın iletildi', 'puf-ekle': 'Püf noktan incelemeye gönderildi', 'tarif-ekle': 'Tarifin onaya gönderildi'};
  function sayfa(id, fn) { SAYFALAR[id] = fn; }
  function baslat() {
    const id = document.body.dataset.sayfa, fn = SAYFALAR[id];
    const ctx = {id, qs, durum: qs.get('durum') || '', uye: uye(), pro: pro(), rol: rol(), veri: V, store};
    const s = fn ? fn(ctx) : {tur: 'alt', baslik: 'Sayfa', html: hata('sunucu', true)};
    const root = document.getElementById('dgu');
    let govde = s.html || '';
    if (ctx.durum === 'hata') govde = hata('sunucu', true);
    else if (ctx.durum === 'zaman-asimi') govde = hata('zaman', true);
    else if (ctx.durum === 'yukleniyor' && s.iskelet !== false) govde = (s.ustIcerik || '') + `<div class="dgu-bolum">${s.iskelet || iskelet(4)}</div>`;
    // Boş hâl (Beyar V4 F): sayfa s.bos ({ikon, baslik, metin, eylem}) verirse ?durum=bos ortak durum sahnesiyle çizilir.
    else if (ctx.durum === 'bos' && s.bos) govde = (s.ustIcerik || '') + durum({tam: true, ...s.bos});
    const offline = ctx.durum === 'baglanti-yok' ? `<div class="dgu-cevrimdisi" role="status">${ic(I('offline'))}<span>Çevrimdışısın · kayıtlı içerik gösteriliyor</span></div>` : '';
    if (ctx.durum === 'baglanti-yok' && s.offlineIcerik === false) govde = hata('baglanti-yok', true);
    const cls = ['dgu-app', s.nav ? 'has-nav' : '', s.bar || s.kayanBar ? 'has-bar' : '', s.tur === 'tam' ? 'no-header' : '', s.tur === 'banner' ? 'has-banner' : ''].filter(Boolean).join(' ');
    root.outerHTML = `<div class="${cls}" id="dgu">${s.tur === 'tam' ? '' : header(s)}${s.tur === 'banner' ? banner({perde: s.geri ? 'kart' : 'kubbe', ...s.banner}) + `<div class="dgu-panel">${offline}${govde}</div>` : offline + govde}</div>${s.nav ? nav(s.nav) : ''}${s.bar ? `<div class="dgu-bar"><div class="dgu-bar-ic">${s.bar}</div></div>` : ''}${s.kayanBar ? `<div class="dgu-bar dgu-kayan" data-kayan-bar inert><div class="dgu-bar-ic">${eylemCubugu(s.kayanBar)}</div></div>` : ''}`;
    document.title = (s.baslik ? s.baslik + ' · ' : '') + 'DadaGastro';
    menuBagla(s.menuAktif);
    if (s.tur !== 'banner' && s.tur !== 'tam') kapakHeader();
    if (s.tur === 'banner') { bannerHeader(); kubbeYapis(); kubbeBoya(); document.fonts?.ready.then(() => kubbeBoya()); addEventListener('resize', () => kubbeBoya()); }
    document.querySelectorAll('.dg-pairs').forEach(() => DGCard.wirePairs?.());
    if (window.DGCard) { DGCard.wireSliders?.(); document.fonts?.ready.then(() => DGCard.veils?.()); }
    const tamam = eylemiTamamla(qs.get('tamamla'));
    if (tamam) { bildir(tamam); const u = new URL(location.href); u.searchParams.delete('tamamla'); history.replaceState(null, '', u); }
    // Gövde ortak hâlle (hata / yükleniyor / boş / çevrimdışı sahnesi) değiştiyse sayfanın kendi bağlayıcısı çalışmaz — aradığı öğeler yok.
    if (govde === (s.html || '')) s.sonra?.(document.getElementById('dgu'), ctx);
    hareketBaslat(s);
    kayanKur();
  }

  // ---------- Hareket ve durumlar (docs/58; CSS ortak/dg-hareket.css; süre/eğri tokens.json motion) ----------
  const TEST = navigator.webdriver === true;
  const GORSEL_SEC = '.photo,.dgu-puf-foto,.dgu-mod-foto,.dgu-kucuk-foto,.dgu-blok-foto,.dgu-banner-foto,.dgu-secim-foto';
  // Görsel yer tutucu: yüklenene kadar nötr zemin (opaklık 0), yüklenince yumuşak belirir; önbellekteyse anında.
  function gorselHazirla(kok = document) {
    kok.querySelectorAll?.(GORSEL_SEC).forEach(el => {
      if (el.dataset.gorsel) return; const m = /url\(['"]?([^'")]+)['"]?\)/.exec(el.style.backgroundImage || ''); if (!m) return;
      el.dataset.gorsel = '1'; const im = new Image(); im.src = m[1]; if (im.complete) return;
      el.classList.add('is-gorsel-bekliyor'); const bitti = () => el.classList.remove('is-gorsel-bekliyor'); im.onload = bitti; im.onerror = bitti;
    });
  }
  // Sekme/segment kayan gösterge (yay hareketi)
  function segGosterge(kok = document) {
    kok.querySelectorAll?.('.dgu-seg:not(.is-kaydir)').forEach(sg => {
      const b = sg.querySelector('button[aria-selected=true],button[aria-pressed=true]'); if (!b || !sg.offsetWidth) return;
      const ilk = !sg.classList.contains('has-gosterge'); sg.classList.add('has-gosterge'); if (ilk) sg.classList.add('is-ilk');
      sg.style.setProperty('--dgu-seg-x', b.offsetLeft + 'px'); sg.style.setProperty('--dgu-seg-w', b.offsetWidth + 'px');
      if (ilk) requestAnimationFrame(() => requestAnimationFrame(() => sg.classList.remove('is-ilk')));
    });
  }
  // Sayaç artışı: görünür olunca 0 → değer (motion.counter, yavaşlayarak); yalnız saf sayılar (1.380, 248).
  const sayacGozcu = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; sayacGozcu.unobserve(e.target);
    const el = e.target, hedef = +el.dataset.sayacHedef, t0 = performance.now(), sure = TK.motion.counter || 600;
    const adim = t => { const k = Math.min(1, (t - t0) / sure), v = Math.round(hedef * (1 - Math.pow(1 - k, 3))); el.textContent = v.toLocaleString('tr'); if (k < 1) requestAnimationFrame(adim); };
    requestAnimationFrame(adim);
  }), {threshold: .6}) : null;
  function sayacHazirla(kok = document) {
    if (!sayacGozcu || motion.matches || TEST) return;
    kok.querySelectorAll?.('.dgu-istatistik dd, .dgu-stats b, [data-sayac-anim]').forEach(el => {
      if (el.dataset.sayacHedef) return; const t = el.textContent.trim(); if (!/^\d{1,3}(\.\d{3})*$/.test(t)) return;
      const v = +t.replace(/\./g, ''); if (v < 2) return; el.dataset.sayacHedef = v; sayacGozcu.observe(el);
    });
  }
  // Liste öğeleri: ilk açılışta sırayla hafif belirme (en çok 12 öğe / kapsayıcı, yalnız ilk ekrana yakın olanlar)
  function siraliBelir(kok = document) {
    if (motion.matches || TEST) return;
    kok.querySelectorAll?.('.dgu-izgara, .dgu-izgara-3, .dgu-sef-izgara, .dgu-rozet-izgara, .dgu-satirlar').forEach(k => {
      if (k.dataset.belirdi || k.closest('[inert]')) return; k.dataset.belirdi = '1';
      [...k.children].slice(0, 12).forEach((c, i) => { if (c.getBoundingClientRect().top > innerHeight * 1.2) return; c.style.setProperty('--dgu-i', i); c.classList.add('dgu-sira-belir'); c.addEventListener('animationend', () => c.classList.remove('dgu-sira-belir'), {once: true}); });
    });
  }
  // Kayan alt eylem çubuğu: üst görsel (banner) header'ın altına geçince yumuşakça belirir, başa dönünce gizlenir; gizliyken inert.
  function kayanKur() {
    const bar = document.querySelector('[data-kayan-bar]'); if (!bar) return;
    // Eşik: panelin (banner yapışkan olduğundan onun yerine) akıştaki üst kenarı header'a gelince.
    const esik = () => { const p = document.querySelector('.dgu-panel'), h = document.querySelector('.dgu-header')?.offsetHeight || 64; return p ? p.offsetTop - h : 240; };
    let bekle = false;
    const guncelle = () => { bekle = false; const on = scrollY > esik(); bar.classList.toggle('is-gorunur', on); bar.inert = !on; };
    addEventListener('scroll', () => { if (!bekle) { bekle = true; requestAnimationFrame(guncelle); } }, {passive: true}); addEventListener('resize', guncelle); guncelle();
  }
  function hareketBaslat(s) {
    // Sayfa geçişi: geri (geçmiş/geri düğmesi) soldan, modal/tam ekran aşağıdan, diğerleri sağdan
    if (!motion.matches && !TEST) {
      let yon = 'ileri'; try { if (sessionStorage.getItem('dg-gecis') === 'geri') yon = 'geri'; sessionStorage.removeItem('dg-gecis'); } catch { /* yok */ }
      if (performance.getEntriesByType?.('navigation')[0]?.type === 'back_forward') yon = 'geri';
      if (yon === 'ileri' && (s.tur === 'tam' || s.sunum === 'modal')) yon = 'modal';
      document.body.classList.add('dgu-gecis-' + yon); setTimeout(() => document.body.classList.remove('dgu-gecis-' + yon), (TK.motion.page || 300) + 50);
    }
    gorselHazirla(); segGosterge(); sayacHazirla(); siraliBelir(); listeHalleri(s); yenileKur(s);
    // Başarı bildirimi hâli (Beyar V4 F): ?durum=basari → sayfanın kendi başarı cümlesi (s.basari) ortak bildirimle (toast) gösterilir.
    if (qs.get('durum') === 'basari') setTimeout(() => bildir(s.basari || BASARI[document.body.dataset.sayfa] || 'Değişikliklerin kaydedildi'), 300);
    document.fonts?.ready.then(() => segGosterge());
  }
  // Sonradan çizilen içerik (sekme değişimi, yeniden çizim) için aynı hazırlık
  new MutationObserver(ms => { if (!ms.some(m => m.addedNodes.length)) return; requestAnimationFrame(() => { gorselHazirla(); sayacHazirla(); siraliBelir(); segGosterge(); }); }).observe(document.documentElement, {childList: true, subtree: true});
  addEventListener('resize', () => segGosterge());
  document.addEventListener('click', e => { if (e.target.closest('.dgu-seg')) requestAnimationFrame(() => requestAnimationFrame(() => segGosterge())); });
  // Ortak eleman geçişi: tarif kartı görseli → detay fotoğrafı (belgeler arası View Transitions; desteklenmiyorsa normal geçiş)
  if (!TEST && !motion.matches && 'CSSViewTransitionRule' in window) { const st = document.createElement('style'); st.textContent = '@view-transition{navigation:auto}'; document.head.append(st); }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="detay-v2.html"]'); if (!a) return;
    const f = a.querySelector('.photo, .dg-photo') || a.closest('article, .dg-card, .dg-tile, .dg-feature')?.querySelector('.photo, .dg-photo');
    document.querySelectorAll('[style*="view-transition-name"]').forEach(x => { x.style.viewTransitionName = ''; });
    if (f) f.style.viewTransitionName = 'dg-tarif-foto';
  }, true);
  // Liste hâlleri (Beyar V4 F, kapsam): sayfanın ana listesi (s.liste seçicisi ya da ilk bulunan .dgu-izgara/.dgu-sef-liste/.dgu-liste/[data-liste])
  // altında ?sayfa=yukleniyor (alt yükleniyor göstergesi) · son (liste sonu notu) · hata (Daha fazlası yüklenemedi + Tekrar dene).
  // ?yenile=1: aşağı çekip yenile göstergesi dönerken. Liste olan sayfada aşağı çekip yenileme kendiliğinden açık.
  const listeBul = s => { const k = document.getElementById('dgu'); if (!k) return null; if (s.liste) return k.querySelector(s.liste); const L = [...k.querySelectorAll('.dgu-izgara, .dgu-sef-liste, .dgu-liste, [data-liste]')].filter(x => !x.closest('dialog,[hidden]') && x.children.length > 1); return L.sort((a, b) => b.children.length - a.children.length)[0] || null; };
  function listeHalleri(s) {
    const kap = listeBul(s); if (kap && s.yenile === undefined) s.yenile = true;
    const h = qs.get('sayfa'); if (!kap || !h) return;
    const n = kap.children.length;
    if (h === 'yukleniyor') kap.insertAdjacentHTML('afterend', '<div class="dgu-alt-yukleniyor" role="status" aria-label="Daha fazla yükleniyor"><i></i><i></i><i></i></div>');
    if (h === 'son') kap.insertAdjacentHTML('afterend', `<p class="dgu-liste-son" role="status">${ic('circle-check')}<span>Hepsi bu kadar — ${sayi(n)} sonuç gösterildi</span></p>`);
    if (h === 'hata') { kap.insertAdjacentHTML('afterend', `<div class="dgu-liste-hata" role="alert">${ic(I('error'))}<span>Daha fazlası yüklenemedi</span>${btn('Tekrar dene', {tur: 'metin', ikon: 'rotate-right', attrs: 'data-liste-tekrar'})}</div>`); const x = kap.nextElementSibling; x.querySelector('[data-liste-tekrar]').addEventListener('click', () => { x.outerHTML = '<div class="dgu-alt-yukleniyor" role="status" aria-label="Daha fazla yükleniyor"><i></i><i></i><i></i></div>'; const y = kap.nextElementSibling; setTimeout(() => { y.outerHTML = `<p class="dgu-liste-son" role="status">${ic('circle-check')}<span>Hepsi bu kadar — ${sayi(n)} sonuç gösterildi</span></p>`; }, motion.matches ? 0 : 900); }); }
  }
  // Aşağı çekip yenileme: sekme/banner sayfalarında (s.yenile !== false), dokunmatik; çekme yarıya bölünür, eşik 48px; bırakınca döner ve tazelenir.
  function yenileKur(s) {
    if (s.yenile === false || !(s.tur === 'sekme' || s.tur === 'banner' || s.yenile)) return;
    const g = document.createElement('div'); g.className = 'dgu-yenile'; g.setAttribute('role', 'status'); g.setAttribute('aria-label', 'Yenileniyor'); g.innerHTML = ic('rotate-right'); document.body.append(g);
    if (qs.get('yenile') === '1') { g.classList.add('is-gorunur', 'is-donuyor'); g.style.setProperty('--dgu-cek', '64px'); }   // galeri hâli: yenileniyor
    let y0 = null, d = 0;
    addEventListener('touchstart', e => { if (scrollY > 0 || document.querySelector('dialog[open]')) return; y0 = e.touches[0].clientY; d = 0; g.classList.remove('is-birak'); }, {passive: true});
    addEventListener('touchmove', e => { if (y0 == null) return; d = Math.max(0, e.touches[0].clientY - y0); if (!d) return; g.classList.add('is-gorunur'); g.style.setProperty('--dgu-cek', Math.min(96, d / 2) + 'px'); }, {passive: true});
    addEventListener('touchend', () => {
      if (y0 == null) return; y0 = null; g.classList.add('is-birak');
      if (d / 2 >= 48) { g.style.setProperty('--dgu-cek', '64px'); g.classList.add('is-donuyor'); setTimeout(() => { if (typeof s.yenile === 'function') { s.yenile(); g.classList.remove('is-donuyor', 'is-gorunur'); g.style.setProperty('--dgu-cek', '0px'); bildir('Güncellendi'); } else location.reload(); }, TK.motion.reveal * 2); }
      else { g.style.setProperty('--dgu-cek', '0px'); g.classList.remove('is-gorunur'); }
    });
  }
  // Sonsuz kaydırma: kap içine sayfa sayfa ekler; alt göstergede üç nokta. yukle(n) → HTML ya da '' (bitti).
  function sonsuz(kap, yukle, {bas = 2} = {}) {
    let n = bas, bekle = false; const son = document.createElement('div'); son.className = 'dgu-sonsuz-son'; kap.after(son);
    const gosterge = document.createElement('div'); gosterge.className = 'dgu-alt-yukleniyor'; gosterge.setAttribute('role', 'status'); gosterge.setAttribute('aria-label', 'Yükleniyor'); gosterge.innerHTML = '<i></i><i></i><i></i>'; gosterge.hidden = true; son.before(gosterge);
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting || bekle) return; bekle = true; gosterge.hidden = false;
      setTimeout(() => { const h = yukle(n++); gosterge.hidden = true; bekle = false; if (!h) { io.disconnect(); son.remove(); gosterge.remove(); return; } kap.insertAdjacentHTML('beforeend', h); }, motion.matches ? 0 : TK.motion.reveal);
    }, {rootMargin: '200px'});
    io.observe(son); return io;
  }
  // Düğmede “işlem sürüyor”: genişlik korunur, dönen halka; süre (ms) ya da Promise bitince eski hâline döner.
  function mesgul(b, is = TK.motion.reveal * 2) {
    if (!b) return Promise.resolve(); b.setAttribute('aria-busy', 'true'); b.disabled = true;
    const bit = () => { b.removeAttribute('aria-busy'); b.disabled = false; };
    return (is && is.then ? is : new Promise(r => setTimeout(r, is))).then(v => { bit(); return v; });
  }
  // Form gönderiminde gönder düğmesi kısa süre meşgul görünür (geri bildirim); sayfanın kendi işleyicisi aynen çalışır.
  document.addEventListener('submit', e => { const b = e.submitter; if (b?.classList.contains('dgu-btn') && !b.hasAttribute('aria-busy') && e.target.checkValidity?.() !== false) { b.setAttribute('aria-busy', 'true'); setTimeout(() => b.removeAttribute('aria-busy'), TK.motion.reveal); } }, true);
  // Banner sayfalarında header: şeffaf → solid (ilk metin konumuna göre, en çok 48px)
  // Fotoğraflı üst alan + şeffaf header: eşik ilk metin/kapak altından; en çok 48px kaydırmada opaklaşır (AGENTS header eşiği).
  function bannerHeader(esikEl = document.querySelector('.dgu-banner-metin'), alt = false) {
    const h = document.querySelector('.dgu-header'); if (!h || !esikEl) return;
    const esik = () => { const r = esikEl.getBoundingClientRect(); return Math.max(1, Math.min(48, (alt ? r.bottom : r.top) + scrollY - h.offsetHeight - (alt ? 0 : 8))); };
    // Arama ikonu (kök ana-v3 kuralı): şeffaf header'da yok, header solid olunca gelir.
    const sync = () => { const a = motion.matches ? (scrollY > 0 ? 1 : 0) : Math.min(1, scrollY / esik()); h.style.setProperty('--dgu-alfa', a.toFixed(3)); h.classList.toggle('is-saydam', a < 1); };
    addEventListener('scroll', sync, {passive: true}); sync();
  }
  // Gülücüklü üst alan (profil kapağı, Pro hero…) sayfanın en üstündeyse: alan header'ın arkasına uzanır, header fotoğraf modunda.
  function kapakHeader() {
    const k = document.querySelector('#dgu .dgu-gulucuk'), h = document.querySelector('.dgu-header'), app = document.getElementById('dgu');
    if (!k || !h || !app) return;
    if (k.getBoundingClientRect().top + scrollY > h.offsetHeight + 1) return;
    app.classList.add('has-kapak'); k.classList.add('is-ust'); h.classList.add('is-photo');
    bannerHeader(k, true);
  }

  // Ortak şef kartının kancaları: uygulama oturumu, giriş kapısı (B7 dönüş: yazar kartı) ve bildirim.
  Object.assign(SK, {uyeMi: uye, kapi: u => kapi('takip', 'takip:' + u, {devam: 'yazar'}), bildir: m => bildir(m)});
  window.DG = {kayitli, esc, ic, I, store, rol, uye, pro, here, KOK, tarifLink, listeLink, tarif, sef, sefLink, sayi, kart, avatar, btn, bas, seg, alan, secim, secimKart, durumSahne, parcali, zengin, gulucuk, vizor, fotoSerit, adimlayici, maddeler, madalya, sefKarti, sefKartTam, sefSayac, yilDan, akisKart, akisAc, kademeRozet, kisaTarih, okumaSure, yazarSatir, eylemCubugu, sonsuz, mesgul, gorselHazirla, izinIstemi, bayrakSigdir, bolumBaslik, akordiyon, yorumBolumu, yorumKart, modKart, modSerit, modAciklama, durumRozet, DURUM, paylas, icerikBlok, ipucu, sefKart, sefOlKart, ilerleme, rozet, rozetSheet, telefon, telefonHata, kubbeBoya, secAlan, veriYok, donusAdres, girisDuvari, bayrakSecim, video, videoLink, puf, pufLink, profilBas, yorum, kucukFoto, puan, anahtar, satir, durum, hata, iskelet, onizleme, bildir, sheet, onay, kapi, proKapi, kaydetDegis, tumunuListeyeEkle, geri, tarifBul, sayfa, baslat, eylemiTamamla};
})();
