// 47 · P4 · Görsel üstü süre/puan (13px beyaz) kontrastı: metin ve gölgesi saydam yapılır, metin kutusunun arkasındaki
// EN AÇIK piksele karşı beyazın kontrastı (WCAG). Yüzeyler: ana sayfa (öne çıkan, küçük kart, video), liste (öne çıkan,
// ızgara, satır; 4 sayfa → 32 tarif), detay benzer tarifler (3 tarif). Kullanım: node kontrast.mjs [kenarOpaklığı] [motor]
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const A = process.argv[2] || '', eng = process.argv[3] || 'chromium';
const b = await (eng === 'webkit' ? webkit : chromium).launch();
const ctx = await b.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const decoder = await ctx.newPage();
async function brightest(buf) {
  return decoder.evaluate(async b64 => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let best = [0, 0, 0], bl = -1, sum = 0; for (let i = 0; i < d.length; i += 4) { const l = .2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]; sum += l; if (l > bl) { bl = l; best = [d[i], d[i + 1], d[i + 2]]; } } return {best, mean: sum / (d.length / 4)}; }, buf.toString('base64'));
}
const HIDE = `.dg-meta,.dg-meta *{color:transparent!important;text-shadow:none!important}.dg-meta__rating .icon{color:transparent!important}${A ? `:root{--dg-top-veil-a:${A}!important}` : ''}`;
const rows = [];
async function measure(p, where, scope = 'body') {
  await p.addStyleTag({content: HIDE});
  const metas = await p.$$(`${scope} .dg-meta`);
  for (const m of metas) {
    const visible = await m.evaluate(e => { const r = e.getBoundingClientRect(); return r.width > 0 && !e.closest('[inert],[hidden],.is-loading'); });
    if (!visible) continue;
    await m.evaluate(e => e.scrollIntoView({block: 'center', inline: 'nearest', behavior: 'instant'}));
    // Konum sabitlenene kadar bekle (sayfalamanın yumuşak kaydırması sürerken kırpım kaymasın).
    for (let k = 0, last = ''; k < 20; k++) { await p.waitForTimeout(100); const now = await m.evaluate(e => { const r = e.getBoundingClientRect(); return r.top.toFixed(1) + ',' + r.left.toFixed(1) + ',' + scrollY; }); if (now === last) break; last = now; }
    const info = await m.evaluate(e => { const card = e.closest('.dg-card,.dg-feature,.dg-tile,.v3-video'); const t = card?.querySelector('.dg-card__title,strong')?.getAttribute('title') || card?.querySelector('.dg-card__title,strong')?.textContent || ''; const spans = [...e.children].map(s => { const r = s.getBoundingClientRect(); return {x: r.left, y: r.top, w: r.width, h: r.height}; }); const sc = e.closest('.dg-pairs__track,.dg-slider__track,.v3-video-rail'); const vis = sc ? sc.getBoundingClientRect() : {left: 0, right: innerWidth}; return {t: t.trim(), spans, inView: spans.every(s => s.x >= vis.left - .5 && s.x + s.w <= vis.right + .5 && s.x >= 0 && s.x + s.w <= innerWidth)}; });
    if (!info.inView) continue;
    for (const s of info.spans) {
      if (!(s.w > 0 && s.h > 0 && s.y >= 0 && s.y + s.h <= 844)) continue;
      const buf = await p.screenshot({clip: {x: s.x, y: s.y, width: s.w, height: s.h}});
      const {best, mean} = await brightest(buf);
      const L = lum(best), ratio = (1.05) / (L + .05);
      rows.push({where, title: info.t.slice(0, 40), brightest: best, meanLuma: +mean.toFixed(0), ratio: +ratio.toFixed(2)});
    }
  }
}
async function open(url) { const p = await ctx.newPage(); await stableLocal(p); await p.goto('http://127.0.0.1:8765/v3-app/' + url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); return p; }
// Ana sayfa: öne çıkan slider (3 slayt), ikişerli kartlar (4 sayfa), videolar.
{ const p = await open('ana-v3.html');
  for (let i = 0; i < 3; i++) { await p.evaluate(i => { const t = document.querySelector('.v3-latest .dg-slider__track'); t.scrollLeft = i * (t.firstElementChild.getBoundingClientRect().width + 12); }, i); await p.waitForTimeout(300); await measure(p, 'ana · öne çıkan', '.v3-latest .dg-slider'); }
  for (let i = 0; i < 4; i++) { await p.evaluate(i => { const t = document.querySelector('.v3-latest .dg-pairs__track'); t.scrollLeft = i * (t.clientWidth + 12); }, i); await p.waitForTimeout(300); await measure(p, 'ana · küçük kart', '.v3-latest .dg-pairs'); }
  await measure(p, 'ana · video', '.v3-videos');
  await p.evaluate(() => { const r = document.querySelector('.v3-video-rail'); r.scrollLeft = r.scrollWidth; }); await p.waitForTimeout(300); await measure(p, 'ana · video', '.v3-video-rail');
  await p.close(); }
// Liste: 4 sayfa ızgara + satır; öne çıkan slider 4 slayt.
for (const view of ['', 'gorunum=liste&']) for (let pg = 1; pg <= 4; pg++) {
  const p = await open(`liste-v2.html?${view}sayfa=${pg}`);
  await p.evaluate(pg => document.querySelector(`[data-page-number="${pg}"]`)?.click(), pg); await p.waitForTimeout(1200);
  if (pg === 1) for (let i = 0; i < 4; i++) { await p.evaluate(i => { const t = document.querySelector('.dg-slider__track'); if (t) t.scrollLeft = i * (t.firstElementChild.getBoundingClientRect().width + 12); }, i); await p.waitForTimeout(300); await measure(p, 'liste · öne çıkan', '.dg-slider'); }
  await measure(p, view ? 'liste · satır' : 'liste · ızgara', view ? '.lv2-rows' : '.lv2-grid');
  await p.close(); }
// Detay: benzer tarifler (2 sayfa) üç tarifte.
for (const t of ['', '?tarif=shami-kebap', '?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole']) {
  const p = await open('detay-v2.html' + t);
  for (let i = 0; i < 2; i++) { await p.evaluate(i => { const tr = document.querySelector('.dv2-similar .dg-pairs__track'); if (tr) tr.scrollLeft = i * (tr.clientWidth + 12); }, i); await p.waitForTimeout(300); await measure(p, 'detay · benzer', '.dv2-similar'); }
  await p.close(); }
await b.close();
// Aynı tarif/yüzey tekrarlarını tekilleştir (en düşük oran kalır).
const uniq = {}; for (const r of rows) { const k = r.where + '|' + r.title; if (!uniq[k] || uniq[k].ratio > r.ratio) uniq[k] = r; }
const list = Object.values(uniq).sort((a, b) => a.ratio - b.ratio);
const out = {engine: eng, edgeAlpha: A || 'css', measured: rows.length, min: list[0], below45: list.filter(r => r.ratio < 4.5).length, rows: list};
fs.writeFileSync(new URL(`kontrast-${eng}-${A || 'css'}.json`, import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify({engine: eng, A: A || 'css', measured: rows.length, unique: list.length, below45: out.below45, worst: list.slice(0, 6), bestLight: list.filter(r => r.meanLuma > 150).slice(0, 3)}, null, 1));
