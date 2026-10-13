// 47 · EK 3 yakın çekim (390, 3×): açık (Tarte de Amêndoa) ve koyu (Semizotlu Yumurta) kart; önce (EK 3 öncesi) / sonra;
// kaydedilmemiş / kaydedilmiş; kaydedilmişte A = yalnız hale, B = hale + 1px beyaz kontur (uygulanan). Kullanım: node … chromium|webkit
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const eng = process.argv[2] || 'chromium', HERE = new URL('.', import.meta.url).pathname, OUT = new URL('../screenshots/patron-secimleri/ek3/', import.meta.url).pathname;
fs.mkdirSync(OUT, {recursive: true});
const ONCE = fs.readdirSync(HERE + 'ek3-once');
const CARDS = [['Tarte de Amêndoa', 'açık'], ['Semizotlu Yumurta', 'koyu']];
const VARIANTS = [['once', false, 'Önce'], ['once', true, 'Önce · kaydedilmiş'], ['sonra', false, 'Sonra'], ['sonraA', true, 'Sonra · kaydedilmiş A (yalnız hale)'], ['sonra', true, 'Sonra · kaydedilmiş B (hale + kontur) ✓']];
const b = await (eng === 'webkit' ? webkit : chromium).launch(); const out = [];
for (const [title, tone] of CARDS) for (const [v, saved, label] of VARIANTS) {
  const p = await b.newPage({viewport: {width: 390, height: 844}, deviceScaleFactor: 3}); await stableLocal(p);
  if (v === 'once') await p.route(/\/v3-app\/(ana-v3|liste-v2|detay-v2|ortak-kart)\.(js|css)(\?.*)?$/, async r => { const f = new URL(r.request().url()).pathname.split('/').pop(); if (!ONCE.includes(f)) return r.fallback(); await r.fulfill({body: fs.readFileSync(HERE + 'ek3-once/' + f), contentType: f.endsWith('.css') ? 'text/css' : 'text/javascript'}); });
  await p.goto('http://127.0.0.1:8765/v3-app/ana-v3.html', {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
  if (v === 'sonraA') await p.addStyleTag({content: '.save.dg-save[aria-pressed=true] .icon{-webkit-text-stroke:0!important}'});
  const card = p.locator('.v3-latest .dg-pairs .dg-tile', {hasText: title}).first();
  await card.evaluate((e, saved) => { e.scrollIntoView({block: 'center', behavior: 'instant'}); const s = e.querySelector('.dg-save'); s.setAttribute('aria-pressed', String(saved)); }, saved);
  await p.waitForTimeout(900);
  const f = `${OUT}${eng}-${tone}-${v}-${saved ? 'kayitli' : 'bos'}.png`; await card.locator('.dg-tile__media').screenshot({path: f});
  const icon = `${OUT}${eng}-${tone}-${v}-${saved ? 'kayitli' : 'bos'}-ikon.png`; await card.locator('.dg-save').screenshot({path: icon});
  out.push({tone, label, f, icon}); await p.close();
}
const img = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
const p = await b.newPage({viewport: {width: 1600, height: 900}});
await p.setContent(`<style>body{margin:0;padding:24px;font:14px/1.35 system-ui;background:#F9F9F9;color:#211E16}h1{font-size:18px;margin:0 0 12px}.row{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:28px}figure{margin:0}figcaption{font-weight:600;margin-bottom:6px}.c{width:100%;display:block;border-radius:8px}.i{width:120px;display:block;margin-top:8px;background:#ccc;image-rendering:pixelated}</style><h1>EK 3 yakın çekim · ${eng} · 390 (3×) — üstte açık, altta koyu fotoğraf</h1>${CARDS.map(([, tone]) => `<div class="row">${out.filter(o => o.tone === tone).map(o => `<figure><figcaption>${o.label}</figcaption><img class="c" src="${img(o.f)}"><img class="i" src="${img(o.icon)}"></figure>`).join('')}</div>`).join('')}`);
await p.screenshot({path: `${OUT}../ek3-yakin-${eng}.png`, fullPage: true});
await b.close(); console.log('ok', eng);
