// 47 · EK ölçümü: bütün yerel tarifler × bütün görsel üstü kart türleri.
// (a) Görselin dikey ortasındaki bant (%45–55): geçişler açıkken ortalama parlaklık, geçişler kapalıyken (orijinal) olana göre
//     en fazla ~%10 düşmeli. (b) Üst (süre/görüntülenme) ve alt (kategori, başlık, yazar) metinler: metin + gölge saydam,
//     kutunun arkasındaki EN AÇIK piksele karşı beyaz ≥ 4,5:1 (büyük başlıklar ≥ 3:1). Kart türleri gerçek bileşenle
//     (DGCard) ve gerçek fotoğraflarla sayfanın kendi bağlamında bir test alanına çizilir; video ve hero'lar gerçek hâliyle.
// Kullanım (proje kökünden): node v3-app/docs/47/ek-olcum.mjs chromium|webkit [etiket]
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const eng = process.argv[2] || 'chromium', label = process.argv[3] || 'sonra', ONCE = label === 'once';
const HERE = new URL('.', import.meta.url).pathname, ROOT = 'http://127.0.0.1:8765/v3-app/';
const b = await (eng === 'webkit' ? webkit : chromium).launch();
const ctx = await b.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 1});
const decoder = await ctx.newPage();
const lum = ([r, g, bb]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(bb); };
async function stats(buf) { return decoder.evaluate(async b64 => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let best = [0, 0, 0], bl = -1, sum = 0; for (let i = 0; i < d.length; i += 4) { const l = .2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]; sum += l; if (l > bl) { bl = l; best = [d[i], d[i + 1], d[i + 2]]; } } return {best, mean: sum / (d.length / 4)}; }, buf.toString('base64')); }
const HIDE = `:is(.dg-meta,.dg-meta *,.dg-card__category,.dg-card__title,.dg-author,.dg-author *,.v3-video-text,.v3-video-text *,.v3-hero-copy,.v3-hero-copy *,.v3-hero-top h1,.detail-cover-copy,.detail-cover-copy *,.dg-save,.dg-save *,.dg-play,.dg-play *,.dg-slider__pager,.dg-avatar){color:transparent!important;text-shadow:none!important;background-color:transparent!important;box-shadow:none!important;border-color:transparent!important}.dg-pager-dots,.v3-pager{visibility:hidden!important}`;
const NOVEIL = `:is(.dg-card__media,.dg-feature__media,.dg-tile__media,.dg-veil-top)::after{display:none!important}.dg-tile__veil,.dg-feature__veil,.v3-video-shade,.x-scene-shade{background:none!important}.detail-hero:before,.detail-hero:after,.detail-hero .detail-cover:before{opacity:0!important}`;
const rows = [], bands = [];
async function page(url) { const p = await ctx.newPage(); await stableLocal(p); if (ONCE) await p.route(/\/v3-app\/(ana-v3|liste-v2|detay-v2|ortak-kart)\.(html|js|css)(\?.*)?$/, async r => { const f = new URL(r.request().url()).pathname.split('/').pop(); await r.fulfill({body: fs.readFileSync(HERE + 'ek-once/' + f), contentType: f.endsWith('.css') ? 'text/css' : f.endsWith('.js') ? 'text/javascript' : 'text/html'}); }); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); await p.goto(ROOT + url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400); return p; }
async function settle(p, h) { await h.evaluate(e => e.scrollIntoView({block: 'center', behavior: 'instant'})); for (let k = 0, last = ''; k < 15; k++) { await p.waitForTimeout(60); const now = await h.evaluate(e => JSON.stringify(e.getBoundingClientRect())); if (now === last) break; last = now; } }
async function shot(p, r) { if (!(r.width > 0 && r.height > 0)) return null; const y = Math.max(0, r.y), y2 = Math.min(844, r.y + r.height); if (y2 - y < 1) return null; return stats(await p.screenshot({clip: {x: Math.max(0, r.x), y, width: Math.min(390, r.x + r.width) - Math.max(0, r.x), height: y2 - y}})); }
// Bir kartı ölç: metinler (b) ve orta bant (a). media: görsel kutusu; texts: [seçici, rol, eşik].
async function measureCard(p, kind, card, mediaSel, texts, {fixed = false} = {}) {
  const media = mediaSel ? await card.$(mediaSel) : card; if (!media) return;
  if (fixed) await p.waitForTimeout(250); else await settle(p, media);
  const name = await card.evaluate(e => (e.querySelector('[title]')?.getAttribute('title') || e.textContent).trim().slice(0, 48));
  // (b) metinler: gizleme stili zaten açık
  for (const [sel, role, min] of texts) for (const t of await card.$$(sel)) {
    const r = await t.evaluate(e => { const x = e.getBoundingClientRect(); return {x: x.x, y: x.y, width: x.width, height: x.height}; });
    const s = await shot(p, r); if (!s) continue;
    const ratio = 1.05 / (lum(s.best) + .05);
    rows.push({kind, name, role, min, brightest: s.best, ratio: +ratio.toFixed(2), ok: ratio >= min});
  }
  // (a) orta bant, geçişler açık / kapalı
  const band = await media.evaluate(e => { const x = e.getBoundingClientRect(); return {x: x.x, y: x.y + x.height * .45, width: x.width, height: x.height * .1}; });
  const on = await shot(p, band); await p.addStyleTag({content: NOVEIL}).then(h => h.evaluate(e => e.id = 'qa-noveil')); await p.waitForTimeout(30);
  const off = await shot(p, band); await p.evaluate(() => document.getElementById('qa-noveil')?.remove());
  if (on && off) bands.push({kind, name, on: +on.mean.toFixed(1), off: +off.mean.toFixed(1), drop: +((1 - on.mean / off.mean) * 100).toFixed(1)});
}
const TILE = [['.dg-meta>span', 'üst · süre/görüntülenme', 4.5], ['.dg-card__category', 'alt · kategori', 4.5], ['.dg-card__title', 'alt · başlık', 4.5], ['.dg-author__name', 'alt · yazar', 4.5]];
const TOP = [['.dg-meta>span', 'üst · süre/görüntülenme', 4.5]];
async function harnessUnused(p, html, setup = '') {
  await p.evaluate(async ([html, setup]) => {
    const host = document.querySelector(setup || 'body'); const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = html; host.prepend(box);
    const imgs = [...box.querySelectorAll('[data-photo-src]')]; await Promise.all(imgs.map(el => new Promise(res => { el.dataset.lazyBound = '1'; const im = new Image(); im.onload = im.onerror = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; res(); }; im.src = el.dataset.photoSrc; })));
    if (typeof applyTypeRoles === 'function') applyTypeRoles(box); DGCard.veils(box);
  }, [html, setup]);
  await p.addStyleTag({content: HIDE}); await p.waitForTimeout(300);
}
// ---------- Ana sayfa ----------
{ const p = await page('ana-v3.html');
  const R = await p.evaluate(() => DATA.recipes.filter(r => r.author).map(r => r.slug));
  await p.evaluate(slugs => { const R = slugs.map(s => DATA.recipes.find(r => r.slug === s)); const box = document.createElement('div'); box.id = 'qa-harness';
    box.innerHTML = `<div class="qa-pairs dg-pairs"><div class="dg-pairs__track" style="flex-wrap:wrap;overflow:visible;row-gap:12px">${R.map(r => `<div class="dg-pairs__item">${DGCard.tile(r)}</div>`).join('')}</div></div><div class="qa-feat" style="display:grid;gap:12px;margin:12px 0">${R.map(DGCard.feature).join('')}</div><div class="qa-dolap v3-dolap-rail" style="flex-wrap:wrap;overflow:visible;row-gap:12px;margin:0">${R.map(DGCard.tile).join('')}</div>`;
    document.querySelector('.v3-latest').prepend(box); }, R);
  await p.evaluate(async () => { const box = document.getElementById('qa-harness'); await Promise.all([...box.querySelectorAll('[data-photo-src]')].map(el => new Promise(res => { el.dataset.lazyBound = '1'; const im = new Image(); im.onload = im.onerror = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; res(); }; im.src = el.dataset.photoSrc; }))); applyTypeRoles(box); DGCard.veils(box); });
  await p.addStyleTag({content: HIDE}); await p.waitForTimeout(300);
  for (const c of await p.$$('#qa-harness .qa-pairs .dg-tile')) await measureCard(p, 'ana · küçük kart (2:3)', c, '.dg-tile__media', TILE);
  for (const c of await p.$$('#qa-harness .qa-feat .dg-feature')) await measureCard(p, 'ana · öne çıkan (4:3)', c, '.dg-feature__media', TILE);
  for (const c of await p.$$('#qa-harness .qa-dolap .dg-tile')) await measureCard(p, 'ana · Dolapta Ne Var sonucu (4:5)', c, '.dg-tile__media', TILE);
  await p.evaluate(() => document.getElementById('qa-harness').remove()); await p.waitForTimeout(200);
  for (const c of await p.$$('.v3-videos .v3-video')) { await p.evaluate(e => { const r = e.closest('.v3-video-rail'); if (r) r.scrollLeft = e.offsetLeft - 20; }, c); await measureCard(p, 'ana · video', c, '.v3-video-cover', [['.dg-meta>span', 'üst · süre', 4.5], ['.v3-video-text strong', 'alt · başlık', 4.5], ['.v3-video-text>span', 'alt · izlenme', 4.5]]); }
  // Hero: beş slayt (döngü durdurulur), başlık büyük metin (3:1).
  const hero = await p.$('.x-hero'); await p.evaluate(() => { scrollTo({top: 0, behavior: 'instant'}); document.querySelector('.v3-hero-track').dispatchEvent(new Event('pointerdown')); });
  for (let i = 0; i < 5; i++) { await p.evaluate(i => { scrollTo({top: 0, behavior: 'instant'}); const t = document.querySelector('.v3-hero-track'); t.scrollLeft = i * t.clientWidth; }, i); await p.waitForTimeout(500);
    const slide = (await p.$$('.v3-hero-slide:not([data-clone])'))[i];
    await measureCard(p, 'ana · hero slider', slide, '.v3-hero-photo', [['.v3-hero-copy small', 'alt · öneri etiketi', 4.5], ['.v3-hero-copy strong', 'alt · tarif adı (büyük)', 3], ['.v3-author-name', 'alt · yazar', 4.5]], {fixed: true});
    if (i === 0) for (const t of await p.$$('.v3-hero-top h1')) { const r = await t.evaluate(e => { const x = e.getBoundingClientRect(); return {x: x.x, y: x.y, width: x.width, height: x.height}; }); const s = await shot(p, r); const ratio = 1.05 / (lum(s.best) + .05); rows.push({kind: 'ana · hero slider', name: 'Ne pişirsem?', role: 'üst · başlık (büyük)', min: 3, brightest: s.best, ratio: +ratio.toFixed(2), ok: ratio >= 3}); }
  }
  await p.close(); }
// ---------- Liste ----------
{ const p = await page('liste-v2.html');
  await p.evaluate(() => { const R = DATA.recipes; const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = `<div class="lv2-grid qa-grid">${R.map(r => DGCard.card(r)).join('')}</div><div class="lv2-rows qa-rows" style="margin:24px 0">${R.map(r => DGCard.card(r, 'row')).join('')}</div><div class="qa-feat" style="display:grid;gap:12px">${R.map(DGCard.feature).join('')}</div>`; document.querySelector('.list-content').prepend(box); });
  await p.evaluate(async () => { const box = document.getElementById('qa-harness'); await Promise.all([...box.querySelectorAll('[data-photo-src]')].map(el => new Promise(res => { el.dataset.lazyBound = '1'; const im = new Image(); im.onload = im.onerror = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; res(); }; im.src = el.dataset.photoSrc; }))); applyTypeRoles(box); DGCard.veils(box); });
  await p.addStyleTag({content: HIDE}); await p.waitForTimeout(300);
  for (const c of await p.$$('#qa-harness .qa-grid .dg-card')) await measureCard(p, 'liste · ızgara (4:5)', c, '.dg-card__media', TOP);
  for (const c of await p.$$('#qa-harness .qa-rows .dg-card')) await measureCard(p, 'liste · satır (kare)', c, '.dg-card__media', TOP);
  for (const c of await p.$$('#qa-harness .qa-feat .dg-feature')) await measureCard(p, 'liste · öne çıkan (4:3)', c, '.dg-feature__media', TILE);
  await p.close(); }
// ---------- Detay: benzer tarif kartı (62 tarif) + hero (62 tarif) ----------
let slugs;
{ const p = await page('detay-v2.html');
  slugs = await p.evaluate(() => DATA.recipes.map(r => r.slug));
  await p.evaluate(() => { const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = `<div class="dg-pairs"><div class="dg-pairs__track" style="flex-wrap:wrap;overflow:visible;row-gap:12px">${DATA.recipes.filter(r => r.author).map(r => `<div class="dg-pairs__item">${DGCard.tile(r)}</div>`).join('')}</div></div>`; document.querySelector('.dv2-tail').prepend(box); });
  await p.evaluate(async () => { const box = document.getElementById('qa-harness'); await Promise.all([...box.querySelectorAll('[data-photo-src]')].map(el => new Promise(res => { el.dataset.lazyBound = '1'; const im = new Image(); im.onload = im.onerror = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; res(); }; im.src = el.dataset.photoSrc; }))); applyTypeRoles(box); DGCard.veils(box); });
  await p.addStyleTag({content: HIDE}); await p.waitForTimeout(300);
  for (const c of await p.$$('#qa-harness .dg-tile')) await measureCard(p, 'detay · benzer (2:3)', c, '.dg-tile__media', TILE);
  await p.close(); }
for (const s of slugs) { const p = await page('detay-v2.html?tarif=' + encodeURIComponent(s)); await p.addStyleTag({content: HIDE}); await p.waitForTimeout(150);
  const hero = await p.$('.detail-hero'); await p.evaluate(() => scrollTo(0, 0));
  await measureCard(p, 'detay · hero', hero, null, [['.detail-cover-copy>.eyebrow', 'alt · kategori', 4.5], ['.detail-cover-copy h1', 'alt · başlık (büyük)', 3], ['.detail-cover-copy>p', 'alt · alt başlık', 4.5], ['.dv2-cap', 'alt · bilgi hapı', 4.5]], {fixed: true});
  if (p.errs.length) rows.push({kind: 'detay · hero', name: s, role: 'hata', min: 0, ratio: 0, ok: false, errs: p.errs});
  await p.close(); }
await b.close();
const kinds = [...new Set([...rows.map(r => r.kind), ...bands.map(r => r.kind)])];
const table = kinds.map(k => { const rs = rows.filter(r => r.kind === k), bs = bands.filter(r => r.kind === k); const worst = [...rs].sort((a, c) => (a.ratio / a.min) - (c.ratio / c.min))[0]; const top = rs.filter(r => r.role.startsWith('üst')), bot = rs.filter(r => r.role.startsWith('alt'));
  return {tur: k, kart: bs.length, metin: rs.length, ustMin: top.length ? Math.min(...top.map(r => r.ratio)) : null, altMin: bot.length ? Math.min(...bot.map(r => r.ratio)) : null, gecmeyen: rs.filter(r => !r.ok).length, bantDususMaks: bs.length ? Math.max(...bs.map(r => r.drop)) : null, bantDususOrt: bs.length ? +(bs.reduce((a, r) => a + r.drop, 0) / bs.length).toFixed(1) : null, bantAsan: bs.filter(r => r.drop > 10).length, enKotu: worst && `${worst.name} · ${worst.role} ${worst.ratio}`}; });
const out = {engine: eng, label, table, failing: rows.filter(r => !r.ok), bandOver: bands.filter(r => r.drop > 10), rows, bands};
fs.writeFileSync(`${HERE}ek-olcum-${eng}-${label}.json`, JSON.stringify(out, null, 1));
console.table(table.map(t => ({...t, enKotu: (t.enKotu || '').slice(0, 60)})));
console.log('geçmeyen metin', out.failing.length, 'bant >10%', out.bandOver.length);
