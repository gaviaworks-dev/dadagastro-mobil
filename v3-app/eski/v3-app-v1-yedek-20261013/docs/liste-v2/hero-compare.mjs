// Öne çıkan kart adaylarını kısa/uzun başlıkla tek görüntüde karşılaştırır. node docs/liste-v2/hero-compare.mjs [genişlikler]
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/adaylar';
fs.mkdirSync(OUT, {recursive: true});
const widths = process.argv.slice(2).map(Number).filter(Boolean).length ? process.argv.slice(2).map(Number) : [360, 390, 430];
const heroes = ['overlay', 'panel', 'glass'], titles = [['kisa', 'Sagdana'], ['uzun', 'İran']];
const b = await chromium.launch(), report = {};
for (const w of widths) {
  const cells = [];
  for (const [tk, qv] of titles) for (const h of heroes) {
    const p = await b.newPage({viewport: {width: w, height: 844}, deviceScaleFactor: 2});
    await p.goto(`${BASE}liste-v2.html?hero=${h}&q=${encodeURIComponent(qv)}`);
    await p.waitForTimeout(1200);
    await p.addStyleTag({content: '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}'});
    await p.evaluate(() => document.querySelector('.dg-feature').scrollIntoView({block: 'center'}));
    await p.waitForTimeout(1600);
    const el = p.locator('.dg-feature');
    const file = `${OUT}/${h}-${tk}-${w}.png`;
    await el.screenshot({path: file});
    report[`${h}-${tk}-${w}`] = await el.evaluate(e => { const t = e.querySelector('.dg-card__title'), r = e.getBoundingClientRect(), lh = parseFloat(getComputedStyle(t).lineHeight); return {height: Math.round(r.height), titleLines: Math.round(t.scrollHeight / lh), titleBox: Math.round(t.getBoundingClientRect().height), clamp: getComputedStyle(t).webkitLineClamp, title: t.textContent, author: e.querySelector('.dg-author__name').textContent, meta: !!e.querySelector('.dg-meta'), save: !!e.querySelector('.dg-save')}; });
    cells.push({h, tk, src: `${h}-${tk}-${w}.png`});
    await p.close();
  }
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#F9F9F9;font:14px/1.3 system-ui;color:#211E16}h1{font-size:18px;margin:0 0 16px}.g{display:grid;grid-template-columns:repeat(3,${w}px);gap:24px;align-items:start}.c b{display:block;margin:0 0 8px}img{width:${w - 40}px;display:block}</style><h1>Öne çıkan kart adayları · ${w}px · üst sıra kısa başlık, alt sıra uzun başlık</h1><div class="g">${cells.map(c => `<div class="c"><b>${c.h === 'overlay' ? 'A · Overlay (ana sayfa gibi)' : c.h === 'panel' ? 'B · Hizalı bindirme panel' : 'C · Cam bilgi kutusu'} — ${c.tk === 'kisa' ? 'kısa' : 'uzun'}</b><img src="${c.src}"></div>`).join('')}</div>`;
  fs.writeFileSync(`${OUT}/karsilastirma-${w}.html`, html);
  const g = await b.newPage({viewport: {width: 3 * w + 2 * 24 + 48, height: 600}});
  await g.goto(BASE + `${OUT}/karsilastirma-${w}.html`); await g.waitForTimeout(800);
  await g.screenshot({path: `${OUT}/karsilastirma-${w}.png`, fullPage: true});
  await g.close();
}
fs.writeFileSync('docs/liste-v2/hero-compare.json', JSON.stringify(report, null, 1));
console.log(Object.entries(report).map(([k, v]) => `${k}: h${v.height} lines${v.titleLines} box${v.titleBox}`).join('\n'));
await b.close();
