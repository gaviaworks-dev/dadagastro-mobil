// D1–D3 ölçüm ve kanıt betiği. Çalıştır (v3-app içinden): node docs/liste-v2/d-qa.mjs
// D1: sekme/seçim başına tema şeridi + sekme değişiminde kayma. D2: panel köşesi. D3: avatar baş harfi.
// Konsol hatası, sayfa hatası ve 4xx/5xx yanıtları her sayfada toplanır.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const BASE = 'http://127.0.0.1:8765/v3-app/', SHOTS = 'docs/screenshots/liste-v2/d';
const URL = 'liste-v2.html?siralama=a&gosterge=a&radius=a&rozet=a';
fs.mkdirSync(SHOTS, {recursive: true});
const out = {generated: new Date().toISOString(), themes: [], jump: [], panel: [], avatar: [], overflow: [], errors: [], http: []};

async function open(browser, url, width, scale = 1) {
  const page = await browser.newPage({viewport: {width, height: 844}, deviceScaleFactor: scale});
  const tag = `${browser.browserType().name()}-${width} ${url}`;
  page.on('pageerror', e => out.errors.push(`${tag}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') out.errors.push(`${tag}: ${m.text()}`); });
  page.on('response', r => { if (r.status() >= 400) out.http.push(`${tag}: ${r.status()} ${r.url()}`); });
  page.on('requestfailed', r => { if (!/ERR_ABORTED|cancelled/i.test(r.failure()?.errorText || '')) out.http.push(`${tag}: başarısız ${r.url()} ${r.failure()?.errorText}`); });
  await page.goto(BASE + url);
  await page.waitForFunction(() => window.LIST_V2_READY, null, {timeout: 8000});
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({content: 'html{scroll-behavior:auto!important}'});
  await page.waitForTimeout(700);
  return page;
}
const settle = page => page.waitForTimeout(450);
const click = (page, sel) => page.evaluate(sel => document.querySelector(sel).click(), sel);
const themeState = page => page.evaluate(() => {
  const t = document.querySelector('.lv2-themes'), cs = getComputedStyle(t), s = document.querySelector('.lv2-status').getBoundingClientRect(), rail = document.querySelector('.lv2-rail').getBoundingClientRect();
  return {
    scope: document.querySelector('[data-ld-scope][aria-pressed=true]').textContent,
    selection: document.querySelector('.lv2-rail [aria-pressed=true] .dg-chip__label').textContent,
    shown: !t.classList.contains('is-collapsed') && cs.visibility === 'visible',
    height: Math.round(t.getBoundingClientRect().height), inert: t.inert,
    items: t.classList.contains('is-collapsed') ? [] : [...t.querySelectorAll('.dg-chip')].map(c => `${c.querySelector('.dg-chip__label').textContent} ${c.querySelector('.dg-chip__count')?.textContent || ''}`.trim()),
    railToStatus: Math.round(s.top - rail.bottom), result: document.querySelector('#resultCount').textContent
  };
});
const STATES = [
  ['kategori-tumu', []],
  ['kategori-tatli', ['[data-lv2-facet="kategori"][data-value="tatli"]']],
  ['kategori-balik', ['[data-lv2-facet="kategori"][data-value="balik-ve-deniz-urunleri"]']],
  ['mutfak-tumu', ['[data-ld-scope="mutfak"]']],
  ['mutfak-turk', ['[data-ld-scope="mutfak"]', '[data-lv2-facet="mutfak"][data-value="turk-mutfagi"]']],
  ['mutfak-meksika', ['[data-ld-scope="mutfak"]', '[data-lv2-facet="mutfak"][data-value="meksika-mutfagi"]']]
];

for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const width of [360, 390, 430]) {
    // D1 · durumlar (aynı sayfada sırayla; her durum taze sayfada)
    for (const [name, steps] of STATES) {
      const page = await open(browser, URL, width, width === 390 ? 2 : 1);
      for (const s of steps) { await click(page, s); await settle(page); }
      const st = await themeState(page);
      out.themes.push({engine: engineName, width, state: name, ...st});
      if (width === 390) {
        const top = await page.evaluate(() => document.querySelector('.list-tools').getBoundingClientRect().top);
        await page.screenshot({path: `${SHOTS}/tema-${name}-${engineName}.png`, clip: {x: 0, y: Math.max(0, top - 8), width, height: 470}});
      }
      out.overflow.push({engine: engineName, width, state: name, overflow: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)});
      await page.close();
    }
    // D1 · sekme değişiminde kayma: liste başında ve yapışık panelde, kare kare.
    for (const where of ['ust', 'yapisik']) {
      const page = await open(browser, URL, width);
      if (where === 'yapisik') {
        await page.evaluate(() => { const h = document.querySelector('.topbar').getBoundingClientRect().height, p = document.querySelector('.lv2-panel'); scrollTo(0, p.getBoundingClientRect().top + scrollY - h + 160); });
        await settle(page);
      }
      for (const target of ['mutfak', 'kategori']) {
        const trace = await page.evaluate(async target => {
          const tabs = document.querySelector('.lv2-scope'), status = document.querySelector('.lv2-status'), tools = document.querySelector('.list-tools');
          const r0 = {tabs: tabs.getBoundingClientRect().top, status: status.getBoundingClientRect().top, y: scrollY, stuck: tools.classList.contains('is-stuck')};
          const frames = [];
          document.querySelector(`[data-ld-scope="${target}"]`).click();
          const t0 = performance.now();
          await new Promise(res => { const f = () => { frames.push({t: Math.round(performance.now() - t0), tabs: tabs.getBoundingClientRect().top, status: status.getBoundingClientRect().top, y: scrollY}); if (performance.now() - t0 < 450) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
          const steps = frames.map((f, i) => Math.abs(f.status - (i ? frames[i - 1].status : r0.status)));
          return {target, before: r0, stuckAfter: tools.classList.contains('is-stuck'), tabsMaxMove: +Math.max(...frames.map(f => Math.abs(f.tabs - r0.tabs))).toFixed(2), statusFinalDrift: +(frames.at(-1).status - r0.status).toFixed(2), statusMaxFrameStep: +Math.max(...steps).toFixed(2), scrollDelta: Math.round(frames.at(-1).y - r0.y), frames: frames.length};
        }, target);
        out.jump.push({engine: engineName, width, where, ...trace});
        await settle(page);
      }
      await page.close();
    }
    // D2 · panel köşesi: yapışmadan önce / yapışık; radius=a ve b
    for (const r of ['a', 'b']) {
      const page = await open(browser, `liste-v2.html?siralama=a&gosterge=a&radius=${r}&rozet=a`, width);
      const read = () => page.evaluate(() => { const t = document.querySelector('.list-tools'), p = document.querySelector('.lv2-panel'); return {tools: getComputedStyle(t).borderTopLeftRadius + ' / ' + getComputedStyle(t).borderTopRightRadius, panel: getComputedStyle(p).borderTopLeftRadius, stuck: t.classList.contains('is-stuck'), top: Math.round(t.getBoundingClientRect().top), token: getComputedStyle(document.body).getPropertyValue('--lv2-panel-r').trim(), cardR: getComputedStyle(document.querySelector('.dg-card__media')).borderTopLeftRadius}; });
      const before = await read();
      await page.evaluate(() => scrollTo(0, 600)); await page.waitForTimeout(500);
      const stuck = await read();
      out.panel.push({engine: engineName, width, radius: r, before, stuck});
      if (width === 390 && r === 'a') {
        await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400);
        const y = before.top;
        await page.screenshot({path: `${SHOTS}/panel-kose-once-yapisma-${engineName}.png`, clip: {x: 0, y: y - 24, width: 140, height: 72}});
        await page.evaluate(() => scrollTo(0, 600)); await page.waitForTimeout(500);
        await page.screenshot({path: `${SHOTS}/panel-kose-yapisik-${engineName}.png`, clip: {x: 0, y: stuck.top - 24, width: 140, height: 72}});
      }
      await page.close();
    }
    const det = await open(browser, 'detay-v2.html', width).catch(() => null);
    if (det) { out.panel.push({engine: engineName, width, detay: await det.evaluate(() => getComputedStyle(document.querySelector('.detail-main')).borderTopLeftRadius)}); await det.close(); }
    // D3 · avatar: ızgara, satır, öne çıkan (slider) ve tekli öne çıkan kart
    for (const [kind, url] of [['izgara+slider', URL], ['satir', URL + '&gorunum=liste'], ['tek-one-cikan', URL + '&q=Sagdana']]) {
      const page = await open(browser, url, width);
      const av = await page.evaluate(() => [...document.querySelectorAll('#results .dg-avatar')].map(a => { const cs = getComputedStyle(a), r = a.getBoundingClientRect(); return {where: a.closest('.dg-slider') ? 'slider' : a.closest('.dg-feature') ? 'one-cikan' : a.closest('.dg-card--row') ? 'satir' : 'kart', letter: a.textContent, size: [r.width, r.height], font: cs.fontFamily.split(',')[0].replace(/"/g, ''), weight: cs.fontWeight, fontSize: cs.fontSize, loaded: document.fonts.check(`${cs.fontWeight} ${cs.fontSize} GilroyBd`)}; }));
      const kinds = [...new Set(av.map(a => a.where))];
      out.avatar.push({engine: engineName, width, page: kind, count: av.length, kinds, sizes: [...new Set(av.map(a => a.size.join('x')))], fontSizes: [...new Set(av.map(a => a.fontSize))], fonts: [...new Set(av.map(a => `${a.font} ${a.weight}`))], allLoaded: av.every(a => a.loaded), letters: [...new Set(av.map(a => a.letter))].join('')});
      await page.close();
    }
  }
  await browser.close();
}

// D3 · 4× kırpım: "İ" avatarı önce (11px) / sonra (13px); kart, satır, öne çıkan.
{
  const browser = await chromium.launch();
  const crops = [];
  for (const [kind, url] of [['kart', URL], ['satir', URL + '&gorunum=liste'], ['slider', URL]]) {
    for (const phase of ['once', 'sonra']) {
      const page = await open(browser, url, 390, 4);
      if (phase === 'once') await page.addStyleTag({content: '.dg-avatar{font-size:var(--role-label-size)!important}'});
      const box = await page.evaluate(kind => {
        const sel = kind === 'slider' ? '.dg-slider .dg-author' : kind === 'satir' ? '.dg-card--row .dg-author' : '.lv2-grid .dg-author';
        const a = [...document.querySelectorAll(sel)].find(x => x.querySelector('.dg-avatar').textContent === 'İ') || document.querySelector(sel);
        if (kind === 'slider') { const slide = a.closest('.dg-slide'), track = slide.parentElement; track.style.scrollSnapType = 'none'; track.scrollLeft = slide.offsetLeft; }
        a.scrollIntoView({block: 'center'});
        const r = a.getBoundingClientRect(); return {x: r.x - 4, y: r.y - 6, width: Math.min(150, r.width + 8), height: r.height + 12, letter: a.querySelector('.dg-avatar').textContent, name: a.querySelector('.dg-author__name').textContent};
      }, kind);
      await page.waitForTimeout(500);
      const path = `${SHOTS}/avatar-${kind}-${phase}.png`;
      await page.screenshot({path, clip: {x: box.x, y: box.y, width: box.width, height: box.height}});
      crops.push({kind, phase, path, letter: box.letter, name: box.name});
      await page.close();
    }
  }
  out.avatarCrops = crops;
  // Tek görselde birleştirme: D1 durumları ve D3 avatar önce/sonra.
  const page = await browser.newPage({viewport: {width: 1400, height: 900}});
  const img = p => `data:image/png;base64,${fs.readFileSync(p).toString('base64')}`;
  for (const engine of ['chromium', 'webkit']) {
    const cell = s => `<figure><img src="${img(`${SHOTS}/tema-${s}-${engine}.png`)}"><figcaption>${s.replace('-', ' · ')}</figcaption></figure>`;
    await page.setContent(`<style>body{margin:0;padding:16px;font:500 14px system-ui;background:#eee}h2{margin:8px 0}div{display:flex;gap:12px;margin-bottom:16px}figure{margin:0;background:#fff;padding:8px}img{width:300px;display:block}figcaption{padding-top:6px}</style>
      <h2>Kategoriler sekmesi (${engine}, 390)</h2><div>${['kategori-tumu', 'kategori-tatli', 'kategori-balik'].map(cell).join('')}</div>
      <h2>Dünya Mutfakları sekmesi: Tema &amp; pişirme tipi gizli</h2><div>${['mutfak-tumu', 'mutfak-turk', 'mutfak-meksika'].map(cell).join('')}</div>`);
    await page.screenshot({path: `${SHOTS}/tema-karsilastirma-${engine}.png`, fullPage: true});
  }
  await page.setContent(`<style>body{margin:0;padding:16px;font:500 14px system-ui;background:#fff}table{border-collapse:collapse}td{padding:8px;border:1px solid #ddd;vertical-align:middle}img{height:110px;display:block}</style><table><tr><td></td><td>Önce (11px)</td><td>Sonra (13px)</td></tr>${['kart', 'satir', 'slider'].map(k => `<tr><td>${k}</td><td><img src="${img(`${SHOTS}/avatar-${k}-once.png`)}"></td><td><img src="${img(`${SHOTS}/avatar-${k}-sonra.png`)}"></td></tr>`).join('')}</table>`);
  await page.screenshot({path: `${SHOTS}/avatar-once-sonra.png`, fullPage: true});
  await browser.close();
}

fs.writeFileSync('docs/liste-v2/d-qa.json', JSON.stringify(out, null, 1));
const t = out.themes.filter(x => x.width === 390 && x.engine === 'chromium').map(x => `${x.state}: ${x.shown ? x.items.join(', ') : 'GİZLİ'} (h ${x.height}, ray→durum ${x.railToStatus})`);
console.log(t.join('\n'));
console.log('jump', JSON.stringify(out.jump.map(j => [j.engine, j.width, j.where, j.target, j.tabsMaxMove, j.statusFinalDrift, j.statusMaxFrameStep, j.scrollDelta, j.before.stuck, j.stuckAfter])));
console.log('panel', JSON.stringify(out.panel.map(p => p.detay ? [p.engine, p.width, 'detay', p.detay] : [p.engine, p.width, p.radius, p.before.tools, p.before.panel, p.before.stuck, p.stuck.tools, p.stuck.stuck, p.before.cardR])));
console.log('avatar', JSON.stringify(out.avatar.map(a => [a.engine, a.width, a.page, a.count, a.kinds.join('+'), a.sizes.join(), a.fontSizes.join(), a.fonts.join(), a.allLoaded, a.letters])));
console.log('overflow max', Math.max(...out.overflow.map(o => o.overflow)), 'errors', out.errors.length, 'http', out.http.length);
if (out.errors.length) console.log(out.errors.slice(0, 10));
if (out.http.length) console.log(out.http.slice(0, 10));
