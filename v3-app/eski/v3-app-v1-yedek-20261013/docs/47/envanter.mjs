// 47 · Üç ekranın DOM envanteri (önce / sonra): seçenek kodu izleri, dışa açılan ok düğmeleri, rozet/kaydet zeminleri,
// sayaç metni, öne çıkan kart bağlantı yüksekliği, konsol/ağ hataları. Kullanım: node v3-app/docs/47/envanter.mjs once|sonra
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const tag = process.argv[2] || 'once', out = {};
const b = await chromium.launch();
for (const pg of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'detay-v2.html?yazar=c&radius=b&rozet=b&gosterge=b&siralama=b', 'liste-v2.html?siralama=b&gosterge=b&radius=b&rozet=b', 'ana-v3.html?gosterge=b&radius=b&rozet=b']) {
  const p = await b.newPage({viewport: {width: 390, height: 844}});
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
  p.on('response', r => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
  await p.goto('http://127.0.0.1:8765/v3-app/' + pg, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  out[pg] = await p.evaluate(() => {
    const cs = (e, ps) => getComputedStyle(e, ps);
    const vis = e => e.getClientRects().length > 0;
    const arrows = [...document.querySelectorAll('.fa-arrow-up-right-from-square, .x-arrow')].filter(vis).length;
    const meta = [...document.querySelectorAll('.dg-meta')].slice(0, 3).map(e => cs(e).backgroundColor);
    const save = [...document.querySelectorAll('.dg-save')].slice(0, 3).map(e => ({before: cs(e, '::before').content === 'none' ? 'yok' : cs(e, '::before').backgroundColor, bg: cs(e).backgroundColor, color: cs(e).color}));
    const text = document.body.innerText;
    const slashBug = (text.match(/\d\/ \d/g) || []).length;
    const featureText = [...document.querySelectorAll('.dg-feature .dg-card__text')].filter(vis).map(e => +e.getBoundingClientRect().height.toFixed(1));
    const html = document.documentElement.dataset;
    const chef = document.querySelector('.dv2-chef')?.className || '';
    const pager = document.querySelector('.dg-pager-count,.v3-pager-count') ? 'sayac' : document.querySelector('.dg-pager-dots,.v3-pager-dots') ? 'nokta' : '-';
    const sort = document.querySelector('.lv2-sort-button')?.className || '';
    const cardR = document.querySelector('.dg-card__media,.dg-tile__media,.dg-feature__media'); 
    return {arrows, meta, save, slashBug, featureText, dataset: {...html}, chef, pager, sort, cardR: cardR ? cs(cardR).borderTopLeftRadius : '', url: location.search};
  });
  out[pg].errors = errs;
  await p.close();
}
await b.close();
fs.writeFileSync(new URL(`envanter-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
