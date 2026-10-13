// 46 · Birleştirme öncesi/sonrası envanter: başlıklar, bağlantılar, header rengi, 404'ler, avatar ve kart sınıfları.
// Proje kökünden: node v3-app/docs/46/envanter.mjs <etiket>
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';

const tag = process.argv[2] || 'once';
const B = 'http://127.0.0.1:8765/v3-app/';
const PAGES = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html'];
const out = {tarih: new Date().toISOString(), sayfalar: {}};
const browser = await chromium.launch();
for (const pg of PAGES) {
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
  const p = await ctx.newPage(); await stableLocal(p);
  const bad = [], errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  ctx.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.goto(B + pg, {waitUntil: 'networkidle'});
  await p.evaluate(() => document.fonts.ready);
  // Scroll the whole page so lazy photos load.
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(800);
  const info = await p.evaluate(() => {
    const cs = el => getComputedStyle(el);
    const heads = [...document.querySelectorAll('main h2, .v3-content h2, .lv2-panel h2, .detail-main h2, section h2')].filter((h, i, a) => a.indexOf(h) === i && h.offsetParent).map(h => {
      const s = cs(h), row = h.closest('.section-heading-row,.dv2-sim-head,.dv2-heading,.method-heading,.lv2-themes__inner,div');
      const eyebrow = row?.querySelector('.eyebrow,.dv2-sim-eyebrow,[class*=eyebrow]');
      const link = row?.querySelector('a.six-see,a.dv2-see-all,a[class*=see]');
      return {text: h.textContent.trim().replace(/\s+/g, ' '), cls: h.className, parent: h.parentElement.className, size: s.fontSize, weight: s.fontWeight, family: s.fontFamily.split(',')[0], color: s.color, line: s.lineHeight, ls: s.letterSpacing, eyebrow: eyebrow?.textContent.trim() || '', link: link ? link.textContent.trim() + ' → ' + link.getAttribute('href') : ''};
    });
    const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => h && !/^(https?:|#|mailto)/.test(h));
    const patterns = {}; links.forEach(h => { const k = h.split('?')[0]; patterns[k] = (patterns[k] || 0) + 1; });
    const cardLinks = [...document.querySelectorAll('.recipe-card a, .dg-card a, .dg-feature a, .v3-hero-recipe')].map(a => a.getAttribute('href').split('?')[0]);
    const tumu = [...document.querySelectorAll('a')].filter(a => /Tümü|Tamamını/.test(a.textContent)).map(a => a.textContent.trim().replace(/\s+/g, ' ') + ' → ' + a.getAttribute('href'));
    const avatars = [...document.querySelectorAll('.dg-avatar,.avatar')].slice(0, 6).map(a => ({cls: a.className, w: a.getBoundingClientRect().width, fs: cs(a).fontSize, ff: cs(a).fontFamily.split(',')[0], t: a.textContent}));
    const grey = [...document.querySelectorAll('[data-photo-src], .photo, .card-photo, .dg-photo')].filter(e => e.getBoundingClientRect().width > 20 && (cs(e).backgroundImage === 'none' || e.classList.contains('image-failed'))).map(e => (e.dataset.photoSrc || e.className).slice(0, 120));
    return {heads, patterns, cardLinks: [...new Set(cardLinks)], tumu, avatars, grey, cards: {dg: document.querySelectorAll('.dg-card').length, recipe: document.querySelectorAll('.recipe-card').length, feature: document.querySelectorAll('.dg-feature').length}};
  });
  // Header solid colour: scroll far.
  await p.evaluate(() => scrollTo(0, 1500)); await p.waitForTimeout(400);
  info.header = await p.evaluate(() => { const h = document.querySelector('.topbar,.detail-header'); return {cls: h.className, bg: getComputedStyle(h).backgroundColor, alpha: h.dataset.alpha}; });
  info.bad = [...new Set(bad)]; info.errors = errors;
  out.sayfalar[pg] = info;
  await ctx.close();
}
await browser.close();
fs.mkdirSync('v3-app/docs/46', {recursive: true});
fs.writeFileSync(`v3-app/docs/46/envanter-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
