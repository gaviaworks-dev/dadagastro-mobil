// EK 4 · Rozet a (yumuşak koyu cam) — kontrast ve karşılaştırma. Çalıştır (v3-app içinden): node docs/liste-v2/ek4-qa.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {luminanceRange, cssLuminance, ratio} from './contrast-lib.mjs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/ek4';
fs.mkdirSync(OUT, {recursive: true});
// EK 3'e kadarki "a" (düz beyaz) yalnız karşılaştırma için CSS ile canlandırılır.
const OLD_WHITE = ':root{--dg-pair-bg:color-mix(in srgb,var(--paper) 92%,transparent)!important;--dg-pair-fg:color-mix(in srgb,black 87%,white)!important;--dg-pair-line:color-mix(in srgb,black 10%,transparent)!important;--dg-pair-filter:blur(12px)!important}';
const out = {generated: new Date().toISOString(), contrast: [], material: {}, fallback: {}, errors: []};

async function open(browser, url, scale = 2, style = '') {
  const page = await browser.newPage({viewport: {width: 390, height: 844}, deviceScaleFactor: scale});
  page.on('pageerror', e => out.errors.push(e.message));
  await page.goto(BASE + url);
  await page.waitForFunction(() => window.LIST_V2_READY);
  await page.addStyleTag({content: 'html{scroll-behavior:auto!important}' + style});
  await page.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(1200);
  return page;
}
// Her rozet: kendi slaytına/görünüme kaydır, köşe radius'u kadar içeriden kırp, metni gizle, en açık piksel.
async function measureAll(page, label, engine) {
  const n = await page.evaluate(() => document.querySelectorAll('#results .dg-meta').length);
  for (let i = 0; i < n; i++) {
    await page.evaluate(i => { const m = document.querySelectorAll('#results .dg-meta')[i], slide = m.closest('.dg-slide'); if (slide) slide.parentElement.scrollTo({left: slide.offsetLeft - slide.parentElement.offsetLeft, behavior: 'instant'}); m.scrollIntoView({block: 'center', inline: 'nearest'}); document.querySelectorAll('#results .dg-meta').forEach((x, k) => x.toggleAttribute('data-probe', k === i)); }, i);
    await page.waitForTimeout(250);
    const info = await page.evaluate(() => { const m = document.querySelector('[data-probe]'), r = m.getBoundingClientRect(), k = parseFloat(getComputedStyle(m).borderTopLeftRadius) + 2; return {rect: {x: r.x + k, y: r.y + k, width: r.width - 2 * k, height: r.height - 2 * k}, fg: getComputedStyle(m).color, text: m.textContent, kind: m.closest('.dg-slide') ? 'slider' : m.closest('.dg-card--row') ? 'satır' : 'kart'}; });
    const range = await luminanceRange(page, info.rect, '[data-probe]>span');
    const Lt = cssLuminance(info.fg);
    out.contrast.push({engine, label, kind: info.kind, text: info.text, brightestL: +range.maxL.toFixed(4), contrast: +ratio(Lt, range.maxL).toFixed(2), worst: +Math.min(ratio(Lt, range.maxL), ratio(Lt, range.minL)).toFixed(2)});
  }
}
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await engine.launch();
  for (const [label, url] of [['a-kart', 'liste-v2.html?rozet=a'], ['a-satir', 'liste-v2.html?rozet=a&gorunum=liste'], ['a-acik-zemin', 'liste-v2.html?rozet=a&kategori[]=tatli'], ['b-kart', 'liste-v2.html?rozet=b']]) {
    const p = await open(b, url, 1);
    await measureAll(p, label, engineName);
    if (label === 'a-kart') out.material[engineName] = await p.evaluate(() => { const m = document.querySelector('.dg-meta'), s = document.querySelector('.dg-save'), mb = getComputedStyle(m), sb = getComputedStyle(s, '::before'); return {metaBg: mb.backgroundColor, saveBg: sb.backgroundColor, metaFilter: mb.backdropFilter || mb.webkitBackdropFilter, saveFilter: sb.backdropFilter || sb.webkitBackdropFilter, metaLine: mb.boxShadow, saveLine: sb.boxShadow, metaH: Math.round(m.getBoundingClientRect().height), saveH: Math.round(s.getBoundingClientRect().height - 2 * parseFloat(sb.top)), metaR: mb.borderTopLeftRadius, saveR: sb.borderTopLeftRadius, fg: mb.color, star: getComputedStyle(m.querySelector('.fa-star')).color, regular: document.querySelectorAll('.fa-regular').length}; });
    await p.close();
  }
  await b.close();
}
// Kaydedilmiş hâl: zemin aynı, ikon primary (üye önizlemesi açık).
{
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
  await p.goto(BASE + 'liste-v2.html'); await p.evaluate(() => { sessionStorage.setItem('dadagastro-member-preview', '1'); localStorage.removeItem('dadagastro-prototype-saved'); });
  await p.goto(BASE + 'liste-v2.html?rozet=a'); await p.waitForFunction(() => window.LIST_V2_READY); await p.waitForTimeout(900);
  const before = await p.evaluate(() => { const s = document.querySelector('.lv2-grid .dg-save'); return {bg: getComputedStyle(s, '::before').backgroundColor, color: getComputedStyle(s).color, pressed: s.getAttribute('aria-pressed'), icon: s.querySelector('i').className}; });
  await p.click('.lv2-grid .dg-save'); await p.waitForTimeout(400);
  const after = await p.evaluate(() => { const s = document.querySelector('.lv2-grid .dg-save'); return {bg: getComputedStyle(s, '::before').backgroundColor, color: getComputedStyle(s).color, pressed: s.getAttribute('aria-pressed'), icon: s.querySelector('i').className}; });
  out.saved = {before, after};
  await p.evaluate(() => document.querySelector('.lv2-grid .dg-card').scrollIntoView({block: 'center'})); await p.waitForTimeout(500);
  await p.locator('.lv2-grid .dg-card__media').first().screenshot({path: `${OUT}/kaydedildi-a.png`});
  // backdrop-filter yoksa: yedek zemin + en açık zemin (beyaz) üstünde metin kontrastı, renkten hesap.
  out.fallback = await p.evaluate(() => { const probe = document.createElement('div'); document.body.append(probe); const res = {}; for (const v of ['a', 'b']) { document.documentElement.dataset.dgRozet = v; probe.style.background = 'var(--dg-pair-fallback)'; res[v] = getComputedStyle(probe).backgroundColor; } document.documentElement.dataset.dgRozet = 'a'; probe.remove(); return res; });
  await p.evaluate(() => { localStorage.removeItem('dadagastro-prototype-saved'); sessionStorage.removeItem('dadagastro-member-preview'); });
  await b.close();
}
for (const [v, color] of Object.entries(out.fallback)) out.fallback[v] = {color, contrastWhite: +ratio(1, cssLuminance(color)).toFixed(2)};

// Karşılaştırma: açık zeminli kart (Sagdana) ve koyu zeminli kart (öne çıkan Tavuk Curry) × eski beyaz / yeni a / b.
{
  const b = await chromium.launch();
  const variants = [['eski-beyaz', 'liste-v2.html?rozet=a', OLD_WHITE, 'a (eski · düz beyaz)'], ['a-soft', 'liste-v2.html?rozet=a', '', 'a (yeni · yumuşak koyu cam)'], ['b', 'liste-v2.html?rozet=b', '', 'b (nötr koyu cam)']];
  for (const [key, url, style] of variants) {
    const p = await open(b, url, 2, '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}' + style);
    const light = p.locator('.lv2-grid .dg-card', {hasText: 'Sagdana'}).first();
    await light.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await light.locator('.dg-card__media').screenshot({path: `${OUT}/${key}-acik.png`});
    const dark = p.locator('.dg-slide .dg-feature').first();
    await dark.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await dark.screenshot({path: `${OUT}/${key}-koyu.png`});
    await p.close();
  }
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#F9F9F9;font:15px/1.3 system-ui;color:#111}h1{font-size:18px;margin:0 0 16px}.g{display:grid;grid-template-columns:repeat(3,350px);gap:24px;align-items:start;margin-bottom:24px}b{display:block;margin:0 0 8px}img{display:block;max-width:350px;height:auto}</style><h1>Süre/puan rozeti + kaydet · 390 · açık ve koyu zemin</h1><div class="g">${variants.map(([k, , , t]) => `<div><b>${t} · açık zemin</b><img src="${k}-acik.png" style="width:169px"></div>`).join('')}</div><div class="g">${variants.map(([k, , , t]) => `<div><b>${t} · koyu zemin</b><img src="${k}-koyu.png" style="width:350px"></div>`).join('')}</div>`;
  fs.writeFileSync(`${OUT}/karsilastirma.html`, html);
  const g = await b.newPage({viewport: {width: 3 * 350 + 2 * 24 + 48, height: 600}});
  await g.goto(`${BASE}${OUT}/karsilastirma.html`); await g.waitForTimeout(800);
  await g.screenshot({path: `${OUT}/karsilastirma-eski-yeni-b.png`, fullPage: true});
  await g.close();
  await b.close();
}
fs.writeFileSync('docs/liste-v2/ek4-qa.json', JSON.stringify(out, null, 1));
const sum = {};
for (const c of out.contrast) { const k = c.engine + ' ' + c.label; (sum[k] ??= []).push(c.contrast); }
for (const [k, v] of Object.entries(sum)) console.log(k, 'n', v.length, 'min', Math.min(...v), 'max', Math.max(...v));
console.log('material', JSON.stringify(out.material));
console.log('saved', JSON.stringify(out.saved));
console.log('fallback', JSON.stringify(out.fallback));
console.log('lightest', JSON.stringify(out.contrast.filter(c => c.label.startsWith('a')).sort((a, b) => b.brightestL - a.brightestL).slice(0, 3)));
console.log('errors', JSON.stringify(out.errors));
