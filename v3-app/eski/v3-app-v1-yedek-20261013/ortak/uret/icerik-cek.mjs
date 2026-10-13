// Canlı dadagastro.com'dan (yalnız GET, istekler arası 1 sn; POST/giriş yok) yasal metinler, kurumsal sayfalar, Pro SSS ve
// püf noktası metinlerini okur; ortak/veri/icerik.js (window.DGICERIK) yazar. Metin değiştirilmez; yalnız HTML'den yapıya çevrilir.
// Yasal metinler ve kurumsal sayfalar (G6, 12 Ekim genişletmesi) DOM ile okunur: HTML ağsız, betiksiz bir Chromium sayfasına
// yüklenir (Playwright setContent, bütün istekler kesilir). Satır içi vurgu (strong/em) ve bağlantılar korunur; kalan etiketler atılır.
//   yasal[slug]: {durum, baslik, etiket, guncelleme, surum, ikon, bloklar: [[h2|h3|h4|p|bq, html] | [ul|ol, [html…]] | ['tablo', [[html…]…]]]}
//   yasalDizin: {etiket, baslik, alt, giris, gruplar: [{baslik, ikon, kalemler: [{href, ad, ikon}]}], not, ayak}
//   sayfa.kunye / iletisim / hakkimizda: yapılandırılmış alanlar (aşağıda); sayfa.pro: eski düz bloklar (G1b kullanır).
//   puf[slug]: {durum, kategori, yazar, yazarKullanici, yazarUnvan, tarih, bloklar: [[tag, metin]]} (bloklar biçimi G4 için aynı).
// Çalıştır (proje kökünden): node v3-app/ortak/uret/icerik-cek.mjs
import fs from 'node:fs';
import path from 'node:path';
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const bekle = ms => new Promise(r => setTimeout(r, ms));
const al = async u => { await bekle(1000); const r = await fetch('https://dadagastro.com' + u, {headers: {'User-Agent': UA}}); return {durum: r.status, html: await r.text()}; };
const dec = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&rsquo;/g, '’').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const metin = h => dec(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
// Düz blok çıkarıcı (püf noktaları ve Pro için; biçimi tüketiciler için korunur)
function bloklar(html, kapsayici) {
  let h = html.replace(/<(script|style|header|footer|nav|aside|form|noscript|svg)\b[\s\S]*?<\/\1>/gi, '');
  if (kapsayici) { const m = h.match(kapsayici); if (m) h = m[0]; }
  const out = [];
  for (const m of h.matchAll(/<(h1|h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)) { const t = metin(m[2]); if (t && t.length > 1) out.push([m[1].toLowerCase(), t]); }
  return out;
}

// ---------- DOM okuyucu (ağsız, betiksiz) ----------
const tarayici = await chromium.launch();
const ctx = await tarayici.newContext({javaScriptEnabled: false});
await ctx.route('**/*', r => r.abort());
const dom = await ctx.newPage();
const oku = async (html, fn, arg) => { await dom.setContent(html, {waitUntil: 'domcontentloaded'}); return dom.evaluate(fn, arg); };
// Sayfa içinde çalışan yardımcılar (evaluate gövdesine metin olarak eklenir)
const YARDIM = `
  const bosluk = s => String(s || '').replace(/\\s+/g, ' ').trim();
  const t = el => el ? bosluk(el.textContent) : '';
  const fa = el => { const i = el && (el.matches?.('i[class*="fa-"]') ? el : el.querySelector('i[class*="fa-"]')); const m = i && [...i.classList].find(c => /^fa-/.test(c) && !/^fa-(solid|regular|brands|fw)$/.test(c)); return m ? m.slice(3) : ''; };
  // Satır içi zengin metin: yalnız strong/em/a[href]/code/br kalır; ikonlar ve diğer etiketler atılır, metin korunur.
  const zengin = el => { const out = []; const yur = n => { for (const c of n.childNodes) { if (c.nodeType === 3) { out.push(c.textContent.replace(/[&<>]/g, x => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[x]))); continue; } if (c.nodeType !== 1) continue; const ad = c.tagName.toLowerCase(); if (ad === 'i' && /fa-/.test(c.className)) continue; if (ad === 'br') { out.push('<br>'); continue; } const tag = ad === 'b' ? 'strong' : ['strong', 'em', 'code'].includes(ad) ? ad : ad === 'a' && c.getAttribute('href') ? 'a' : ''; if (tag === 'a') out.push('<a href="' + c.getAttribute('href').replace(/"/g, '&quot;') + '">'); else if (tag) out.push('<' + tag + '>'); yur(c); if (tag) out.push('</' + tag + '>'); } }; yur(el); return out.join('').replace(/\\s+/g, ' ').replace(/\\s+([,.;:!?)])/g, (m, p, i, s) => p).trim(); };
`;
const ev = (govde) => new Function('arg', YARDIM + govde);

// ---------- Yasal metinler ----------
const yasalSluglar = ['kullanim-kosullari', 'topluluk-kurallari', 'yas-siniri', 'hesap-politikasi', 'icerik-telif', 'telif-ihlali-bildirimi', 'marka-bildirimi', 'itiraz', 'gizlilik', 'kvkk', 'cerez', 'veri-basvurusu', 'veri-imha', 'veri-ihlali', 'guvenlik-bildirimi', 'sorumluluk-reddi', 'on-bilgilendirme', 'mesafeli-satis', 'iade-kosullari', 'editoryal-politika', 'sponsorluk-politikasi', 'erisilebilirlik', 'aydinlatma', 'uyelik', 'kunye', 'veri-silme'];
const out = {kaynak: 'https://dadagastro.com', tarih: new Date().toISOString(), yasal: {}, sayfa: {}, puf: {}};

const dz = await al('/yasal');
out.yasalDizin = await oku(dz.html, ev(`
  const m = document.querySelector('main');
  const kalem = a => ({href: a.getAttribute('href'), ad: t(a), ikon: fa(a)});
  const ikonlar = {}; m.querySelectorAll('#lgMenu a').forEach(a => { ikonlar[a.getAttribute('href').replace(/^https?:\\/\\/[^/]+/, '')] = fa(a); });
  const gruplar = [...m.querySelectorAll('article h3')].map(h => ({baslik: t(h), ikon: fa(h), kalemler: [...(h.parentElement.querySelectorAll('a'))].map(kalem)}));
  const bas = m.querySelector('h1').parentElement;
  return {etiket: t(bas.querySelector('span')), baslik: t(m.querySelector('h1')), alt: t(bas.querySelector('span:last-of-type')), giris: zengin(m.querySelector('article p')), gruplar,
    menu: [...m.querySelectorAll('#lgMenu a')].map(kalem), ayak: t([...m.querySelectorAll('article span')].pop())};
`));
for (const s of yasalSluglar) {
  const r = await al('/yasal/' + s);
  out.yasal[s] = {durum: r.durum, ...(await oku(r.html, ev(`
    const m = document.querySelector('main'), bas = m.querySelector('.lg-head') || m;
    const g = bas.querySelector('.lg-update'), gb = g && g.querySelector('b');
    const govde = m.querySelector('.prose__body') || m.querySelector('.prose') || m.querySelector('article');
    const bl = [];
    const ekle = el => {
      const ad = el.tagName.toLowerCase();
      if (/^h[2-4]$/.test(ad)) { const x = zengin(el); if (x) bl.push([ad, x]); return; }
      if (ad === 'p') { const x = zengin(el); if (x) bl.push(['p', x]); return; }
      if (ad === 'ul' || ad === 'ol') { const li = [...el.children].filter(c => c.tagName === 'LI').map(zengin).filter(Boolean); if (li.length) bl.push([ad, li]); return; }
      if (ad === 'blockquote') { const x = zengin(el); if (x) bl.push(['bq', x]); return; }
      if (ad === 'table') { const sat = [...el.querySelectorAll('tr')].map(tr => [...tr.children].map(zengin)); if (sat.length) bl.push(['tablo', sat]); return; }
      if (el.children.length) [...el.children].forEach(ekle); else { const x = zengin(el); if (x) bl.push(['p', x]); }
    };
    if (govde) { if (!govde.children.length) { const x = zengin(govde); if (x) bl.push(['p', x]); } else [...govde.childNodes].forEach(c => { if (c.nodeType === 1) ekle(c); else if (c.nodeType === 3 && bosluk(c.textContent)) bl.push(['p', bosluk(c.textContent)]); }); }
    const aktif = m.querySelector('#lgMenu a.active');
    return {baslik: t(m.querySelector('h1')), etiket: t(bas.querySelector('.eyebrow')), guncelleme: gb ? t(gb) : '', guncellemeMetni: g ? t(g) : '', surum: t(m.querySelector('.prose__meta')), ikon: fa(aktif), ayak: t(m.querySelector('.lg-foot .muted')), onceki: (a => a ? {href: a.getAttribute('href'), ad: t(a)} : null)(m.querySelector('.lg-nav a:first-child:has(.fa-arrow-left)')), sonraki: (a => a ? {href: a.getAttribute('href'), ad: t(a)} : null)(m.querySelector('.lg-nav a:has(.fa-arrow-right)')), bloklar: bl};
  `)))};
  process.stdout.write('.');
}

// ---------- Künye ----------
{ const r = await al('/kunye');
  out.sayfa.kunye = {durum: r.durum, ...(await oku(r.html, ev(`
    const m = document.querySelector('main');
    return {etiket: t(m.querySelector('.eyebrow')), baslik: t(m.querySelector('h1')), alt: t(m.querySelector('.lg-update')),
      satirlar: [...m.querySelectorAll('.kunye-row')].map(r => ({ikon: fa(r), etiket: t(r.querySelector('.kl span')), deger: t(r.querySelector('.kl b'))})).filter(x => x.deger),
      not: zengin(m.querySelector('.kunye-note span') || document.createElement('span'))};
  `)))}; }

// ---------- İletişim ----------
{ const r = await al('/iletisim');
  out.sayfa.iletisim = {durum: r.durum, ...(await oku(r.html, ev(`
    const m = document.querySelector('main'), f = m.querySelector('form');
    const h1 = m.querySelector('h1'), ek = h1.querySelector('span');
    const etiket = id => { const l = f.querySelector('label[for="' + id + '"]'); return l ? bosluk([...l.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ')) : ''; };
    const yardim = id => t(f.querySelector('#' + id)?.closest('.fk-field')?.querySelector('.fk-help'));
    const sec = f.querySelector('select[name=konu]');
    return {etiket: t(m.querySelector('.eyebrow') || h1.parentElement.querySelector('span')), baslik: bosluk(h1.firstChild.textContent), baslikEk: t(ek),
      formBaslik: t(f.querySelector('h2')), formAlt: t(f.querySelector('h2')?.parentElement.querySelector('p')),
      alanlar: Object.fromEntries(['ad', 'soyad', 'eposta', 'telefon', 'konu', 'mesaj'].map(k => [k, {etiket: etiket(k), zorunlu: !!f.querySelector('[name=' + k + ']')?.required, yer: f.querySelector('[name=' + k + ']')?.getAttribute('placeholder') || '', yardim: yardim(k), max: +(f.querySelector('[name=' + k + ']')?.getAttribute('maxlength') || 0) || undefined}])),
      konuYer: t(sec.querySelector('option[value=""]')), konular: [...sec.querySelectorAll('option')].filter(o => o.value).map(o => [o.value, t(o)]),
      ulkeler: [...f.querySelectorAll('li[role=option]')].map(li => [li.dataset.iso, t(li.querySelectorAll('span')[1]), li.dataset.kod]),
      ulkeArama: f.querySelector('.alan-ulke-arama input')?.getAttribute('placeholder') || '', ulkeBos: t(f.querySelector('.alan-ulke-bos')),
      onay: zengin(f.querySelector('[name=kvkk_onay]').closest('label').querySelector('span')),
      koruma: t(f.querySelector('.captcha-note')), gonderNot: zengin(f.querySelector('.sub-note')), gonder: t(f.querySelector('button[type=submit]')),
      bilgiBaslik: t(m.querySelector('.ci-card .tips-head')), bilgiler: [...m.querySelectorAll('.ci-row')].map(r => ({ikon: fa(r), etiket: t(r.querySelector('.cl span')), deger: t(r.querySelector('.cl b')), alt: t(r.querySelector('.cl small'))})),
      adimBaslik: t(m.querySelector('.tips-card .tips-head')), adimlar: [...m.querySelectorAll('.tip-step')].map(s => ({baslik: t(s.querySelector('b')), metin: t(s.querySelector(':scope > div > span'))}))};
  `)))}; }

// ---------- Hakkımızda ----------
{ const r = await al('/hakkimizda');
  out.sayfa.hakkimizda = {durum: r.durum, ...(await oku(r.html, ev(`
    const m = document.querySelector('main');
    const say = kap => [...(kap?.querySelectorAll('.st') || [])].map(s => [t(s.querySelector('b')), t(s.querySelector('span'))]);
    const hk = m.querySelector('#hikaye'), dg = m.querySelector('#degerler'), sb = m.querySelector('.statband'), ys = m.querySelector('#kunye'), kp = m.querySelector('.bridge-sec');
    const prose = hk.querySelector('.seo-prose'), hik = [];
    [...prose.children].forEach(el => { const ad = el.tagName.toLowerCase(); if (ad === 'h2' || ad === 'h3') hik.push([ad, zengin(el)]); else if (ad === 'p') hik.push(['p', zengin(el)]); else if (el.classList.contains('art-quote')) hik.push(['bq', zengin(el)]); });
    return {etiket: t(m.querySelector('.lst-hero .eyebrow')), baslik: t(m.querySelector('h1')), giris: t(m.querySelector('.lst-hero .lead')),
      bolumler: [...m.querySelectorAll('.lh-chips a')].map(a => [a.getAttribute('href'), t(a)]), sayilar: say(m.querySelector('.lst-stats')),
      hikaye: {etiket: t(prose.querySelector('.eyebrow')), bloklar: hik}, rozet: {ikon: fa(hk.querySelector('.about-badge')), baslik: t(hk.querySelector('.about-badge b')), metin: t(hk.querySelector('.about-badge div span'))},
      degerler: {etiket: t(dg.querySelector('.eyebrow')), baslik: t(dg.querySelector('h2')), alt: t(dg.querySelector('.lead')), kartlar: [...dg.querySelectorAll('.val-card')].map(c => ({ikon: fa(c), baslik: t(c.querySelector('h3')), metin: t(c.querySelector('p'))}))},
      bant: {etiket: t(sb?.querySelector('.eyebrow')), baslik: t(sb?.querySelector('h2')), sayilar: say(sb)},
      yasal: {baslik: t(ys?.querySelector('h3')), metin: t(ys?.querySelector('.legal-head p')), not: zengin(ys?.querySelector('.legal-note span') || document.createElement('span'))},
      kopru: {etiket: t(kp?.querySelector('.eyebrow')), baslik: t(kp?.querySelector('h2')), kartlar: [...(kp?.querySelectorAll('.bridge-card') || [])].map(c => ({href: c.getAttribute('href'), ikon: fa(c), baslik: t(c.querySelector('h3')), metin: t(c.querySelector('p')), eylem: t(c.querySelector('.bgo'))}))}};
  `)))}; }

// ---------- Pro (G1b, eski düz biçim) ----------
{ const r = await al('/pro'); out.sayfa.pro = {durum: r.durum, bloklar: bloklar(r.html, /<main[\s\S]*<\/main>/i).slice(0, 300)}; }

// ---------- Püf noktaları (bloklar biçimi değişmez; yazar ve tarih eklendi) ----------
const V = fs.readFileSync(path.join(V3, 'ortak/veri/veri.js'), 'utf8');
const puflar = JSON.parse(V.slice(V.indexOf('=') + 1, V.lastIndexOf(';'))).puflar;
for (const p of puflar) {
  const r = await al('/puf-noktalari/' + p.slug);
  const h = r.html; const ar = h.match(/<article[\s\S]*?<\/article>/i)?.[0] || h.match(/<main[\s\S]*<\/main>/i)?.[0] || h;
  const y = await oku(h, ev(`const a = document.querySelector('.art-hauthor'); const st = document.querySelector('.art-hmeta .art-hstat'); return {yazar: t(a?.querySelector('.ah-id b')), yazarKullanici: (a?.getAttribute('href') || '').replace(/^.*\\/sefler\\//, ''), yazarUnvan: t(a?.querySelector('.ah-id span')), tarih: st && /calendar/.test(st.innerHTML) ? t(st) : ''};`));
  out.puf[p.slug] = {durum: r.durum, kategori: metin((h.match(/Mutfak Sırrı\s*·\s*([^<]+)</) || [])[1] || ''), ...y, bloklar: bloklar(ar).filter(([t]) => t !== 'h1').slice(0, 120)};
}
await tarayici.close();
fs.writeFileSync(path.join(V3, 'ortak/veri/icerik.js'), '/* Üretildi: ortak/uret/icerik-cek.mjs — canlı dadagastro.com metinleri (yalnız GET ile okundu). Elle değiştirmeyin. */\nwindow.DGICERIK=' + JSON.stringify(out) + ';\n');
console.log('\nyasal', Object.keys(out.yasal).length, 'puf', Object.keys(out.puf).length, (JSON.stringify(out).length / 1024).toFixed(0) + ' KB');
