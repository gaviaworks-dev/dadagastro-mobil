// 47 · EK 3 ölçümü (yumuşak geçiş + gölge + kaydet halesi). Bütün yerel tarifler × görsel üstü kart türleri + video + iki hero.
// Her kart için 4 çekim (2×): MAG (metin/ikon magenta, gölge yok) → glif maskesi; HIDE (metin ve gölge saydam);
// SHADOW (metin saydam, gölge görünür); NOVEIL (HIDE + geçişler kapalı).
//  · Katı kontrast: HIDE'da metin kutusundaki en açık piksele karşı beyaz (önceki turların yöntemi; gölge sayılmaz).
//  · Gölgeli kontrast: SHADOW'da glifin 0,5–1,5 css px çevresindeki (gölge halkası) en açık piksele karşı beyaz.
//  · Orta bant: %45–55 ortalama parlaklık, NOVEIL'e göre düşüş.
//  · Kaydet (kaydedilmiş, turuncu): ikon saydam, hale görünür; ikonun 0,5–2 css px çevresindeki her piksele karşı turuncu
//    (#E14827) kontrastının en kötüsü. A = yalnız hale; B = hale + 1px beyaz kontur (turuncu↔beyaz).
// Kullanım (proje kökünden): node v3-app/docs/47/ek3-olcum.mjs chromium|webkit
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const eng = process.argv[2] || 'chromium', HERE = new URL('.', import.meta.url).pathname, ROOT = 'http://127.0.0.1:8765/v3-app/', DPR = 2;
const LIMIT = Number(process.env.LIMIT) || 999;
const b = await (eng === 'webkit' ? webkit : chromium).launch();
const ctx = await b.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: DPR});
const decoder = await ctx.newPage();
const TXT = '.dg-meta,.dg-meta *,.dg-card__category,.dg-card__title,.dg-author__name,.dg-author__name *,.v3-video-text,.v3-video-text *,.v3-hero-copy small,.v3-hero-copy strong,.v3-author-name,.v3-author-name *,.v3-hero-top h1,.detail-cover-copy>.eyebrow,.detail-cover-copy h1,.detail-cover-copy>p,.dv2-cap,.dv2-cap *';
const ICON = '.dg-save .icon,.dg-play .icon';
const OTHER = '.dg-avatar,.dg-slider__pager,.v3-pager,.dg-pager-dots,.detail-header,.topbar,.six-search,.v3-hero-hit';
const CSS = {
  MAG: `:is(${TXT}){color:#FF00FF!important;text-shadow:none!important;-webkit-text-fill-color:#FF00FF!important}:is(${ICON}){color:#FF00FF!important;text-shadow:none!important;-webkit-text-stroke:0!important}:is(${OTHER}){visibility:hidden!important}`,
  HIDE: `:is(${TXT}){color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}:is(${ICON}){color:transparent!important;text-shadow:none!important;-webkit-text-stroke-color:transparent!important}:is(${OTHER}){visibility:hidden!important}`,
  SHADOW: `:is(${TXT}){color:transparent!important;-webkit-text-fill-color:transparent!important}:is(${ICON}){color:transparent!important;-webkit-text-stroke-color:transparent!important}:is(${OTHER}){visibility:hidden!important}`,
  NOVEIL: `:is(.dg-card__media,.dg-feature__media,.dg-tile__media,.dg-veil-top)::after{display:none!important}.dg-tile__veil,.dg-feature__veil,.v3-video-shade,.x-scene-shade{background:none!important}.detail-hero:before,.detail-hero:after{opacity:0!important}`,
};
async function setState(p, st) { await p.evaluate(([st, css]) => { document.getElementById('qa-state')?.remove(); const s = document.createElement('style'); s.id = 'qa-state'; s.textContent = css; document.head.append(s); }, [st, '*,*::before,*::after{transition:none!important}' + (st === 'NOVEIL' ? CSS.HIDE + CSS.NOVEIL : CSS[st])]); await p.waitForTimeout(40); }
async function analyse(shots, rects, icons) {
  return decoder.evaluate(async ([shots, rects, icons, DPR]) => {
    const load = async b64 => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return {w: c.width, h: c.height, d: x.getImageData(0, 0, c.width, c.height).data}; };
    const S = {}; for (const k of ['MAG', 'HIDE', 'SHADOW', 'NOVEIL']) S[k] = await load(shots[k]);
    const {w, h} = S.MAG, lin = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; };
    const L = (d, i) => .2126 * lin(d[i]) + .7152 * lin(d[i + 1]) + .0722 * lin(d[i + 2]);
    const core = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) { const r = S.MAG.d[i * 4], g = S.MAG.d[i * 4 + 1], bb = S.MAG.d[i * 4 + 2]; core[i] = r > 180 && bb > 180 && g < 110 ? 1 : 0; }
    // Uzaklık dönüşümü (Chebyshev, cihaz pikseli) yalnız kutular içinde.
    const ringOf = (rx, ry, rw, rh, lo, hi) => { const x0 = Math.max(0, Math.floor(rx * DPR) - hi), y0 = Math.max(0, Math.floor(ry * DPR) - hi), x1 = Math.min(w, Math.ceil((rx + rw) * DPR) + hi), y1 = Math.min(h, Math.ceil((ry + rh) * DPR) + hi); const out = []; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { if (core[y * w + x]) continue; let dmin = 99; for (let dy = -hi; dy <= hi && dmin > lo; dy++) for (let dx = -hi; dx <= hi; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; if (core[yy * w + xx]) { const dd = Math.max(Math.abs(dx), Math.abs(dy)); if (dd < dmin) dmin = dd; } } if (dmin >= lo && dmin <= hi) out.push((y * w + x) * 4); } return out; };
    const brightest = (img, idx) => idx.reduce((m, i) => Math.max(m, L(img.d, i)), 0);
    const box = (rx, ry, rw, rh) => { const out = []; for (let y = Math.max(0, Math.floor(ry * DPR)); y < Math.min(h, Math.ceil((ry + rh) * DPR)); y++) for (let x = Math.max(0, Math.floor(rx * DPR)); x < Math.min(w, Math.ceil((rx + rw) * DPR)); x++) out.push((y * w + x) * 4); return out; };
    const texts = rects.map(r => { const bx = box(r.x, r.y, r.w, r.h), ring = ringOf(r.x, r.y, r.w, r.h, 1, 3); const strictL = brightest(S.HIDE, bx), shadowL = ring.length ? brightest(S.SHADOW, ring) : strictL; return {...r, strict: +(1.05 / (strictL + .05)).toFixed(2), shadow: +(1.05 / (shadowL + .05)).toFixed(2), ring: ring.length}; });
    const O = .2126 * lin(225) + .7152 * lin(72) + .0722 * lin(39), cr = (a, c) => (Math.max(a, c) + .05) / (Math.min(a, c) + .05);
    const iconRes = icons.map(r => { let cc = 0; for (let y = Math.floor(r.y * DPR); y < Math.ceil((r.y + r.h) * DPR); y++) for (let x = Math.floor(r.x * DPR); x < Math.ceil((r.x + r.w) * DPR); x++) if (y >= 0 && x >= 0 && y < h && x < w && core[y * w + x]) cc++; const ring = ringOf(r.x, r.y, r.w, r.h, 1, 4); const worstA = ring.length ? Math.min(...ring.map(i => cr(O, L(S.SHADOW.d, i)))) : 0; return {...r, haleA: +worstA.toFixed(2), konturB: +cr(O, 1).toFixed(2), ring: ring.length, core: cc}; });
    let band = null; if (S.NOVEIL) { const bx = box(0, shots.bandY, w / DPR, shots.bandH); const m = (img) => bx.reduce((s, i) => s + .2126 * img.d[i] + .7152 * img.d[i + 1] + .0722 * img.d[i + 2], 0) / Math.max(1, bx.length); band = {on: m(S.HIDE), off: m(S.NOVEIL)}; band.drop = +((1 - band.on / band.off) * 100).toFixed(1); }
    return {texts, icons: iconRes, band};
  }, [shots, rects, icons, DPR]);
}
const rows = [], bands = [], icons = [];
async function measure(p, kind, el, texts, {fixed = false, media = null} = {}) {
  const m = media ? await el.$(media) : el; if (!m) return;
  if (!fixed) { await m.evaluate(e => e.scrollIntoView({block: 'center', behavior: 'instant'})); for (let k = 0, last = ''; k < 15; k++) { await p.waitForTimeout(60); const now = await m.evaluate(e => JSON.stringify(e.getBoundingClientRect())); if (now === last) break; last = now; } }
  const clip = await m.evaluate(e => { const r = e.getBoundingClientRect(); return {x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(innerWidth, r.right) - Math.max(0, r.x), height: Math.min(innerHeight, r.bottom) - Math.max(0, r.y), top: r.y, hh: r.height}; });
  if (clip.width < 10 || clip.height < 10) return;
  const name = await el.evaluate(e => (e.querySelector('.dg-card__title,strong,h1')?.getAttribute('title') || e.querySelector('.dg-card__title,strong,h1')?.textContent || '').trim().slice(0, 40));
  const rects = []; for (const [sel, role, min] of texts) for (const t of await el.$$(sel)) { const r = await t.evaluate(e => { const x = e.getBoundingClientRect(); return {x: x.x, y: x.y, w: x.width, h: x.height}; }); if (r.w && r.h) rects.push({role, min, x: r.x - clip.x, y: r.y - clip.y, w: r.w, h: r.h}); }
  const ic = []; for (const t of await el.$$('.dg-save .icon')) { const r = await t.evaluate(e => { e.closest('.dg-save').setAttribute('aria-pressed', 'true'); const x = e.getBoundingClientRect(); return {x: x.x, y: x.y, w: x.width, h: x.height}; }); ic.push({x: r.x - clip.x, y: r.y - clip.y, w: r.w, h: r.h}); }
  const shots = {}; for (const st of ['MAG', 'HIDE', 'SHADOW', 'NOVEIL']) { await setState(p, st); shots[st] = (await p.screenshot({clip: {x: clip.x, y: clip.y, width: clip.width, height: clip.height}})).toString('base64'); }
  shots.bandY = clip.top + clip.hh * .45 - clip.y; shots.bandH = clip.hh * .1;
  const res = await analyse(shots, rects, ic);
  for (const t of res.texts) rows.push({kind, name, role: t.role, min: t.min, strict: t.strict, shadow: t.shadow, ok: t.shadow >= t.min, strictOk: t.strict >= t.min});
  for (const i of res.icons) icons.push({kind, name, haleA: i.haleA, konturB: i.konturB, ring: i.ring, core: i.core, r: [i.x, i.y, i.w, i.h]});
  if (res.band && shots.bandY >= 0 && shots.bandY + shots.bandH <= clip.height) bands.push({kind, name, ...res.band});
}
const loadImgs = async p => p.evaluate(async () => { const box = document.getElementById('qa-harness'); await Promise.all([...box.querySelectorAll('[data-photo-src]')].map(el => new Promise(res => { el.dataset.lazyBound = '1'; const im = new Image(); im.onload = im.onerror = () => { el.style.backgroundImage = `url('${el.dataset.photoSrc}')`; res(); }; im.src = el.dataset.photoSrc; }))); applyTypeRoles(box); DGCard.veils(box); });
async function page(url) { const p = await ctx.newPage(); await p.addInitScript(l => { window.LIM = l; }, LIMIT); await stableLocal(p); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); await p.goto(ROOT + url, {waitUntil: 'networkidle'}); if (process.env.CSSX) { await p.addStyleTag({content: process.env.CSSX}); await p.evaluate(() => window.DGCard?.veils()); } await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400); return p; }
const TILE = [['.dg-meta>span', 'üst · süre/görüntülenme', 4.5], ['.dg-card__category', 'alt · kategori', 4.5], ['.dg-card__title', 'alt · başlık', 4.5], ['.dg-author__name', 'alt · yazar', 4.5]];
const TOP = [['.dg-meta>span', 'üst · süre/görüntülenme', 4.5]];
{ const p = await page('ana-v3.html');
  await p.evaluate(() => { const R = DATA.recipes.filter(r => r.author).slice(0, LIM); const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = `<div class="qa-pairs dg-pairs"><div class="dg-pairs__track" style="flex-wrap:wrap;overflow:visible;row-gap:12px">${R.map(r => `<div class="dg-pairs__item">${DGCard.tile(r)}</div>`).join('')}</div></div><div class="qa-feat" style="display:grid;gap:12px;margin:12px 0">${R.map(DGCard.feature).join('')}</div><div class="qa-dolap v3-dolap-rail" style="flex-wrap:wrap;overflow:visible;row-gap:12px;margin:0">${R.map(DGCard.tile).join('')}</div>`; document.querySelector('.v3-latest').prepend(box); });
  await loadImgs(p);
  for (const c of await p.$$('#qa-harness .qa-pairs .dg-tile')) await measure(p, 'ana · küçük kart (2:3)', c, TILE, {media: '.dg-tile__media'});
  for (const c of await p.$$('#qa-harness .qa-feat .dg-feature')) await measure(p, 'ana · öne çıkan (4:3)', c, TILE, {media: '.dg-feature__media'});
  for (const c of await p.$$('#qa-harness .qa-dolap .dg-tile')) await measure(p, 'ana · Dolapta Ne Var sonucu (4:5)', c, TILE, {media: '.dg-tile__media'});
  await p.evaluate(() => document.getElementById('qa-harness').remove()); await p.waitForTimeout(200);
  for (const c of await p.$$('.v3-videos .v3-video')) { await p.evaluate(e => { const r = e.closest('.v3-video-rail'); if (r) r.scrollLeft = e.offsetLeft - 20; }, c); await measure(p, 'ana · video', c, [['.dg-meta>span', 'üst · süre', 4.5], ['.v3-video-text strong', 'alt · başlık', 4.5], ['.v3-video-text>span', 'alt · izlenme', 4.5]], {media: '.v3-video-cover'}); }
  for (let i = 0; i < 5; i++) { await p.evaluate(i => { scrollTo({top: 0, behavior: 'instant'}); document.querySelector('.v3-hero-track').dispatchEvent(new Event('pointerdown')); const t = document.querySelector('.v3-hero-track'); t.scrollLeft = i * t.clientWidth; }, i); await p.waitForTimeout(500);
    const hero = await p.$('.x-hero'); const slide = (await p.$$('.v3-hero-slide:not([data-clone])'))[i];
    await measure(p, 'ana · hero slider', hero, [[`.v3-hero-slide:nth-child(${i + 1}) .v3-hero-copy small`, 'alt · öneri etiketi', 4.5], [`.v3-hero-slide:nth-child(${i + 1}) .v3-hero-copy strong`, 'alt · tarif adı (büyük)', 3], [`.v3-hero-slide:nth-child(${i + 1}) .v3-author-name`, 'alt · yazar', 4.5], ...(i ? [] : [['.v3-hero-top h1', 'üst · başlık (büyük)', 3]])], {fixed: true}); }
  await p.close(); }
{ const p = await page('liste-v2.html');
  await p.evaluate(() => { const R = DATA.recipes.slice(0, LIM); const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = `<div class="lv2-grid qa-grid">${R.map(r => DGCard.card(r)).join('')}</div><div class="lv2-rows qa-rows" style="margin:24px 0">${R.map(r => DGCard.card(r, 'row')).join('')}</div><div class="qa-feat" style="display:grid;gap:12px">${R.map(DGCard.feature).join('')}</div>`; document.querySelector('.list-content').prepend(box); });
  await loadImgs(p);
  for (const c of await p.$$('#qa-harness .qa-grid .dg-card')) await measure(p, 'liste · ızgara (4:5)', c, TOP, {media: '.dg-card__media'});
  for (const c of await p.$$('#qa-harness .qa-rows .dg-card')) await measure(p, 'liste · satır (kare)', c, TOP, {media: '.dg-card__media'});
  for (const c of await p.$$('#qa-harness .qa-feat .dg-feature')) await measure(p, 'liste · öne çıkan (4:3)', c, TILE, {media: '.dg-feature__media'});
  await p.close(); }
let slugs;
{ const p = await page('detay-v2.html'); slugs = (await p.evaluate(() => DATA.recipes.map(r => r.slug))).slice(0, LIMIT);
  await p.evaluate(() => { const box = document.createElement('div'); box.id = 'qa-harness'; box.innerHTML = `<div class="dg-pairs"><div class="dg-pairs__track" style="flex-wrap:wrap;overflow:visible;row-gap:12px">${DATA.recipes.filter(r => r.author).slice(0, LIM).map(r => `<div class="dg-pairs__item">${DGCard.tile(r)}</div>`).join('')}</div></div>`; document.querySelector('.dv2-tail').prepend(box); });
  await loadImgs(p);
  for (const c of await p.$$('#qa-harness .dg-tile')) await measure(p, 'detay · benzer (2:3)', c, TILE, {media: '.dg-tile__media'});
  await p.close(); }
for (const s of slugs) { const p = await page('detay-v2.html?tarif=' + encodeURIComponent(s)); await p.evaluate(() => scrollTo(0, 0));
  const hero = await p.$('.detail-hero'); await measure(p, 'detay · hero', hero, [['.detail-cover-copy>.eyebrow', 'alt · kategori', 4.5], ['.detail-cover-copy h1', 'alt · başlık (büyük)', 3], ['.detail-cover-copy>p', 'alt · alt başlık', 4.5], ['.dv2-cap', 'alt · bilgi hapı', 4.5]], {fixed: true});
  if (p.errs.length) rows.push({kind: 'hata', name: s, errs: p.errs, ok: false}); await p.close(); }
await b.close();
const kinds = [...new Set(rows.map(r => r.kind))];
const table = kinds.map(k => { const rs = rows.filter(r => r.kind === k), bs = bands.filter(r => r.kind === k), is = icons.filter(r => r.kind === k); const mn = (a, f) => a.length ? Math.min(...a.map(f)) : null;
  return {tur: k, metin: rs.length, ustKati: mn(rs.filter(r => r.role?.startsWith('üst')), r => r.strict), ustGolge: mn(rs.filter(r => r.role?.startsWith('üst')), r => r.shadow), altKati: mn(rs.filter(r => r.role?.startsWith('alt')), r => r.strict), altGolge: mn(rs.filter(r => r.role?.startsWith('alt')), r => r.shadow), gecmeyenGolge: rs.filter(r => !r.ok).length, gecmeyenKati: rs.filter(r => !r.strictOk).length, bantMaks: bs.length ? Math.max(...bs.map(r => r.drop)) : null, bantAsan: bs.filter(r => r.drop > 10).length, haleA: mn(is, r => r.haleA), konturB: mn(is, r => r.konturB)}; });
fs.writeFileSync(`${HERE}ek3-olcum-${eng}.json`, JSON.stringify({engine: eng, table, failing: rows.filter(r => !r.ok), bandOver: bands.filter(r => r.drop > 10), rows, bands, icons}, null, 1));
console.table(table);
