// Öne çıkan kart (overlay): kısa/uzun başlık, 360/390/430; metin arkası en açık piksele göre kontrast; önce/sonra.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {brightest} from './contrast-lib.mjs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/hero-overlay';
fs.mkdirSync(OUT, {recursive: true});
const titles = [['kisa', 'Sagdana'], ['uzun', 'İran'], ['varsayilan', '']];
const out = {generated: new Date().toISOString(), rows: []};
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await engine.launch();
  for (const w of [360, 390, 430]) for (const [tk, qv] of titles) for (const hero of ['overlay', 'panel']) {
    if (engineName === 'webkit' && hero === 'panel') continue;
    const p = await b.newPage({viewport: {width: w, height: 844}, deviceScaleFactor: 2});
    const errors = []; p.on('pageerror', e => errors.push(e.message));
    await p.goto(`${BASE}liste-v2.html?hero=${hero}${qv ? '&q=' + encodeURIComponent(qv) : ''}`);
    await p.waitForTimeout(1200);
    await p.addStyleTag({content: '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}'});
    await p.evaluate(() => document.querySelector('.dg-feature').scrollIntoView({block: 'center'}));
    await p.waitForTimeout(1500);
    const name = `${hero === 'overlay' ? 'sonra' : 'once'}-${tk}-${w}`;
    if (engineName === 'chromium') await p.locator('.dg-feature').screenshot({path: `${OUT}/${name}.png`});
    const row = {engine: engineName, w, title: tk, hero, errors};
    Object.assign(row, await p.evaluate(() => {
      const e = document.querySelector('.dg-feature'), t = e.querySelector('.dg-card__title'), lh = parseFloat(getComputedStyle(t).lineHeight), media = e.querySelector('.dg-feature__media').getBoundingClientRect(), info = e.querySelector('.dg-feature__info')?.getBoundingClientRect();
      const veil = e.querySelector('.dg-feature__media').style.getPropertyValue('--dg-veil'), a = [...veil.matchAll(/(\d+(?:\.\d+)?)%,transparent\)/g)].map(x => Number(x[1]));
      return {height: Math.round(e.getBoundingClientRect().height), mediaRatio: +(media.width / media.height).toFixed(3), titleLines: Math.round(t.scrollHeight / lh), clamp: getComputedStyle(t).webkitLineClamp, title: t.textContent, category: e.querySelector('.dg-card__category').textContent, author: e.querySelector('.dg-author__name').textContent, authorOneLine: Math.round(e.querySelector('.dg-author__name').getBoundingClientRect().height) <= Math.ceil(parseFloat(getComputedStyle(e.querySelector('.dg-author__name')).lineHeight)), meta: e.querySelector('.dg-meta')?.textContent.trim(), save: !!e.querySelector('.dg-save'), infoInside: info ? info.bottom <= media.bottom - 15.5 && info.left >= media.left + 15.5 : null, veilStops: a.length, veilMaxStep: a.length ? +Math.max(...a.slice(1).map((v, i) => Math.abs(v - a[i]))).toFixed(2) : null, categoryFont: getComputedStyle(e.querySelector('.dg-card__category')).fontFamily.split(',')[0]};
    }));
    if (hero === 'overlay') {
      const rect = sel => p.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return {x: r.x, y: r.y, width: r.width, height: r.height}; }, sel);
      row.contrast = {};
      for (const [k, sel] of [['kategori', '.dg-feature .dg-card__category'], ['baslik', '.dg-feature .dg-card__title'], ['yazar', '.dg-feature .dg-author__name']]) row.contrast[k] = +(await brightest(p, await rect(sel), sel)).contrastWhite.toFixed(2);
      row.contrast.rozet = +(await brightest(p, await rect('.dg-feature .dg-meta>span'), '.dg-feature .dg-meta>span')).contrastWhite.toFixed(2);
    }
    out.rows.push(row);
    await p.close();
  }
  await b.close();
}
// Önce/sonra tek görüntü: her genişlikte kısa ve uzun.
const b = await chromium.launch();
for (const w of [360, 390, 430]) {
  const cells = ['kisa', 'uzun'].flatMap(tk => [['once', tk], ['sonra', tk]]);
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#F9F9F9;font:14px/1.3 system-ui;color:#211E16}h1{font-size:18px;margin:0 0 16px}.g{display:grid;grid-template-columns:repeat(2,${w}px);gap:24px;align-items:start}b{display:block;margin:0 0 8px}img{width:${w - 40}px;display:block}</style><h1>Öne çıkan kart · ${w}px · solda önce (bindirme panel), sağda sonra (görsel üstü metin)</h1><div class="g">${cells.map(([s, tk]) => `<div><b>${s === 'once' ? 'Önce' : 'Sonra'} · ${tk === 'kisa' ? 'kısa başlık' : 'uzun başlık'}</b><img src="${s}-${tk}-${w}.png"></div>`).join('')}</div>`;
  fs.writeFileSync(`${OUT}/once-sonra-${w}.html`, html);
  const g = await b.newPage({viewport: {width: 2 * w + 24 + 48, height: 600}});
  await g.goto(`${BASE}${OUT}/once-sonra-${w}.html`); await g.waitForTimeout(800);
  await g.screenshot({path: `${OUT}/once-sonra-${w}.png`, fullPage: true});
  await g.close();
}
await b.close();
fs.writeFileSync('docs/liste-v2/hero-overlay-qa.json', JSON.stringify(out, null, 1));
for (const r of out.rows) console.log(r.engine, r.w, r.title, r.hero, 'err', r.errors.length, 'h', r.height, 'ratio', r.mediaRatio, 'lines', r.titleLines, 'author1', r.authorOneLine, 'meta', r.meta, 'save', r.save, 'inside', r.infoInside, 'veil', r.veilStops, r.veilMaxStep, 'cat', r.categoryFont, r.contrast ? JSON.stringify(r.contrast) : '');
