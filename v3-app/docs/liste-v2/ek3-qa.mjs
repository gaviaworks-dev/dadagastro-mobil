// EK 3 · Kart radius'u (a 16 / b 20), kontrollerin eski radius'a dönüşü, avatar baş harfi.
// Çalıştır (v3-app içinden): node docs/liste-v2/ek3-qa.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/ek3';
fs.mkdirSync(OUT, {recursive: true});
const out = {generated: new Date().toISOString(), baseline: {}, controls: [], cards: [], avatars: [], errors: []};
const radius = (page, sel, pseudo) => page.evaluate(([s, p]) => { const e = document.querySelector(s); return e ? getComputedStyle(e, p || null).borderTopLeftRadius : null; }, [sel, pseudo]);

async function open(browser, url, width = 390, scale = 1) {
  const page = await browser.newPage({viewport: {width, height: 844}, deviceScaleFactor: scale});
  page.on('pageerror', e => out.errors.push(url + ': ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) out.errors.push(url + ': ' + m.text()); });
  await page.goto(BASE + url);
  await page.waitForFunction(() => window.LIST_V2_READY || window.LD_READY, null, {timeout: 8000}).catch(() => {});
  await page.addStyleTag({content: 'html{scroll-behavior:auto!important}'});
  await page.waitForTimeout(900);
  return page;
}

const browser = await chromium.launch();
// 1 · "Önce" değerleri: aynı ortak kuralları kullanan, bu turda değişmeyen sayfalar + önceki kaynak token'ları.
{
  const l1 = await open(browser, 'liste-1.html');
  out.baseline.liste1 = {aramaKutusu: await radius(l1, '.list-tools .search-box'), gorunumKapsayici: await radius(l1, '.view-toggle'), gorunumDugmesi: await radius(l1, '.view-toggle button'), sayfalama: await radius(l1, '#pagination button'), chip: await radius(l1, '.list-tools .chip'), panel: await radius(l1, '.list-tools')};
  await l1.evaluate(() => document.querySelector('#openFilters').click()); await l1.waitForTimeout(400);
  out.baseline.liste1.sheet = await radius(l1, 'dialog#filters'); out.baseline.liste1.sheetDugmesi = await radius(l1, 'dialog#filters .button');
  await l1.close();
  const l5 = await open(browser, 'liste-5.html');
  out.baseline.liste5 = {sekmeKapsayici: await radius(l5, '.ld-scope'), sekmeDugmesi: await radius(l5, '.ld-scope button')};
  await l5.close();
  const tok = await open(browser, 'liste-v2.html');
  out.baseline.tokens = await tok.evaluate(() => Object.fromEntries(['--radius-control', '--radius-segment', '--radius-sheet', '--radius-choice', '--radius-card'].map(t => [t, getComputedStyle(document.documentElement).getPropertyValue(t).trim()])));
  await tok.close();
}
// 2 · Kontroller şimdi (radius=a ve b): seçenek kontrolleri etkilememeli.
const CONTROLS = [['Sekme kapsayıcı (Kategoriler/Dünya Mutfakları)', '.lv2-scope'], ['Sekme düğmesi', '.lv2-scope button'], ['Kategori çipi', '.lv2-rail .dg-chip'], ['Çip içi işaret', '.lv2-rail .dg-mark'], ['Tema çipi', '.lv2-theme-rail .dg-chip'], ['Arama kutusu', '.list-tools .search-box'], ['Arama içi filtre düğmesi', '#openFilters'], ['Sayı rozeti', '#filterBadge'], ['Sıralama grubu', '.lv2-sort-group'], ['Sıralama düğmesi', '.lv2-sort-button'], ['Görünüm kapsayıcı', '.lv2-status .view-toggle'], ['Görünüm düğmesi', '.lv2-status .view-toggle button'], ['Sayfalama', '#pagination .dg-page'], ['Panel (üst köşe)', '.list-tools'], ['Boş durum düğmesi', null]];
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = engineName === 'chromium' ? browser : await engine.launch();
  for (const v of ['a', 'b']) {
    const p = await open(b, `liste-v2.html?radius=${v}`);
    const row = {engine: engineName, radius: v};
    for (const [label, sel] of CONTROLS) if (sel) row[label] = await radius(p, sel);
    await p.evaluate(() => document.querySelector('#openFilters').click()); await p.waitForTimeout(400);
    Object.assign(row, {'Sheet (üst köşe)': await radius(p, '#lv2Filters'), 'Sheet düğmesi': await radius(p, '#lv2Filters .button'), 'Sheet çipi/ipucu satırı': await radius(p, '#lv2Filters .dg-sheet__chips'), 'Sheet kapat': await radius(p, '#lv2Filters .icon-button', '::before'), 'Seçim kutusu': await radius(p, '#lv2Filters .choice-shell>input')});
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    await p.evaluate(() => { document.querySelector('#search').value = 'zzzz'; document.querySelector('#search').dispatchEvent(new Event('input', {bubbles: true})); }); await p.waitForTimeout(700);
    row['Boş durum düğmesi'] = await radius(p, '.lv2-empty .button');
    out.controls.push(row);
    // Kartlar ve iç öğeler.
    await p.goto(`${BASE}liste-v2.html?radius=${v}`); await p.waitForTimeout(900);
    const card = await p.evaluate(() => { const g = s => document.querySelector(s); const r = (s, ps) => g(s) ? getComputedStyle(g(s), ps || null).borderTopLeftRadius : null; return {kart: r('.lv2-grid .dg-card__media'), oneCikan: r('.dg-feature__media'), slider: r('.dg-slider__track'), rozet: r('.lv2-grid .dg-meta'), kaydet: r('.lv2-grid .dg-save', '::before'), oneCikanRozet: r('.dg-feature .dg-meta'), oneCikanKaydet: r('.dg-feature .dg-save', '::before'), nokta: r('.dg-pager-dots i'), avatar: r('.dg-avatar')}; });
    await p.goto(`${BASE}liste-v2.html?radius=${v}&gosterge=b`); await p.waitForTimeout(900);
    card.sayac = await radius(p, '.dg-pager-count');
    await p.goto(`${BASE}liste-v2.html?radius=${v}&gorunum=liste`); await p.waitForTimeout(900);
    Object.assign(card, await p.evaluate(() => { const g = s => document.querySelector(s); const r = (s, ps) => g(s) ? getComputedStyle(g(s), ps || null).borderTopLeftRadius : null; return {satirKaresi: r('.lv2-rows .dg-card__media'), satirRozet: r('.lv2-rows .dg-meta'), satirKaydet: r('.lv2-rows .dg-save', '::before')}; }));
    out.cards.push({engine: engineName, radius: v, ...card});
    await p.close();
  }
  if (b !== browser) await b.close();
}
// 3 · Avatar baş harfi: bütün kart türleri ve slider; İ ile başlayan yazarlar dahil.
{
  for (const url of ['liste-v2.html', 'liste-v2.html?sayfa=2', 'liste-v2.html?sayfa=3', 'liste-v2.html?sayfa=4', 'liste-v2.html?gorunum=liste', 'liste-v2.html?kategori[]=tatli']) {
    const p = await open(browser, url);
    out.avatars.push(...await p.evaluate(url => [...document.querySelectorAll('.dg-avatar')].map(a => { const name = a.parentElement.querySelector('.dg-author__name').textContent.replace('Tarifi ekleyen: ', ''); return {url, in: a.closest('.dg-slide') ? 'slider' : a.closest('.dg-feature') ? 'öne çıkan' : a.closest('.dg-card--row') ? 'satır' : 'kart', name, text: a.textContent, expected: name.trim().slice(0, 1).toLocaleUpperCase('tr'), transform: getComputedStyle(a).textTransform, code: a.textContent.codePointAt(0).toString(16)}; }), url));
    await p.close();
  }
  const p = await open(browser, 'liste-v2.html?kategori[]=tatli', 390, 4);
  const el = p.locator('.dg-avatar', {hasText: 'İ'}).first();
  if (await el.count()) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300); await el.screenshot({path: `${OUT}/avatar-I-4x.png`}); }
  await p.close();
}
// 4 · Karşılaştırma (390): önceki (kart 24, iç öğe 12) · a (16) · b (20) — ızgara, öne çıkan, satır.
const PREV = ':root{--dg-card-r:var(--radius-card)!important;--dg-pair-r:var(--radius-control)!important;--dg-pager-r:var(--radius-control)!important}';
const shots = {};
for (const [key, query, style] of [['once', '', PREV], ['a', '?radius=a', ''], ['b', '?radius=b', '']]) {
  for (const [view, extra, sel] of [['izgara', '', '.lv2-grid'], ['one-cikan', '', '.dg-slider'], ['satir', (query ? '&' : '?') + 'gorunum=liste', '.lv2-rows']]) {
    const p = await open(browser, 'liste-v2.html' + query + extra, 390, 2);
    await p.addStyleTag({content: '.nav-dock,.topbar{visibility:hidden!important}.list-tools{position:relative!important}' + style});
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
    await p.evaluate(sel => { const e = document.querySelector(sel); scrollTo(0, e.getBoundingClientRect().top + scrollY - 16); }, sel);
    await p.waitForTimeout(1200);
    const file = `${key}-${view}.png`;
    await p.screenshot({path: `${OUT}/${file}`, clip: {x: 0, y: 0, width: 390, height: view === 'one-cikan' ? 300 : 520}});
    shots[`${key}-${view}`] = file;
    await p.close();
  }
}
const cols = [['once', 'Önce · kart 24, rozet/kaydet 12'], ['a', 'radius=a · kart 16, rozet/kaydet 8'], ['b', 'radius=b · kart 20, rozet/kaydet 12']];
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#F9F9F9;font:15px/1.3 system-ui;color:#111}h1{font-size:18px;margin:0 0 16px}.g{display:grid;grid-template-columns:repeat(3,390px);gap:24px;align-items:start}b{display:block;margin:0 0 8px}img{width:390px;display:block;border:1px solid #ddd}.row{margin-top:20px}</style><h1>Tarif kartı radius'u · 390 · önce / a / b</h1>${['izgara', 'one-cikan', 'satir'].map(v => `<div class="g row">${cols.map(([k, t]) => `<div><b>${t} — ${v === 'izgara' ? 'kart ızgarası' : v === 'one-cikan' ? 'öne çıkan (slider)' : 'satır görünümü'}</b><img src="${shots[k + '-' + v]}"></div>`).join('')}</div>`).join('')}`;
fs.writeFileSync(`${OUT}/karsilastirma.html`, html);
const g = await browser.newPage({viewport: {width: 3 * 390 + 2 * 24 + 48, height: 800}});
await g.goto(`${BASE}${OUT}/karsilastirma.html`); await g.waitForTimeout(800);
await g.screenshot({path: `${OUT}/karsilastirma-once-a-b.png`, fullPage: true});
await g.close();
await browser.close();
fs.writeFileSync('docs/liste-v2/ek3-qa.json', JSON.stringify(out, null, 1));
console.log('baseline', JSON.stringify(out.baseline));
for (const c of out.controls) console.log('controls', JSON.stringify(c));
for (const c of out.cards) console.log('cards', JSON.stringify(c));
const bad = out.avatars.filter(a => a.text !== a.expected || a.transform !== 'none');
console.log('avatars', out.avatars.length, 'bad', bad.length, JSON.stringify([...new Set(out.avatars.filter(a => /^[İIiı]/.test(a.name)).map(a => a.in + ':' + a.name + '→' + a.text + '(' + a.code + ')'))]));
console.log('errors', JSON.stringify(out.errors));
