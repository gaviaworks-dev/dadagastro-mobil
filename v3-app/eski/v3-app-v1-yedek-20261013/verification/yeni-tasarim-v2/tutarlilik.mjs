// docs/46 · Tutarlılık kanıtı: header rengi, bölüm başlığı tablosu, üç ekranın menüsü (misafir/üye), tarif kartları,
// video süre + oynat camı. Proje kökünden: node v3-app/verification/yeni-tasarim-v2/tutarlilik.mjs <taban-adres> <etiket>
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {stableLocal} from '../set3/http-queue.mjs';

const [base = 'http://127.0.0.1:8765/yayin/yeni-tasarim-v2/', tag = 'yerel'] = process.argv.slice(2);
const dir = path.resolve(`v3-app/docs/screenshots/yeni-tasarim-v2/tutarlilik`); fs.mkdirSync(dir, {recursive: true});
const local = base.startsWith('http://127.0.0.1');
const SCREENS = [['ana-v3.html', 'Ana Sayfa'], ['liste-v2.html', 'Tarif Listesi'], ['detay-v2.html', 'Tarif Detay']];
const wait = ms => new Promise(r => setTimeout(r, ms));
const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + .05) / (y + .05)).toFixed(2); };
const rgb = s => { const m = s.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)/); if (m) return [1, 2, 3].map(i => Math.round(m[i] * 255)); return s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number); };
const hex = a => '#' + a.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
const out = {base, tarih: new Date().toISOString()};

async function open(browser, file, q = '') {
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2});
  const p = await ctx.newPage(); if (local) await stableLocal(p);
  await p.goto(base + file + q, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await wait(500);
  return {p, ctx};
}

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  const r = out[engine] = {header: {}, basliklar: [], menu: {}, kart: {}, video: null};
  for (const [file, name] of SCREENS) {
    const {p, ctx} = await open(browser, file);
    // 1 · Header solid colour (scrolled), white logo/icon contrast.
    await p.evaluate(() => scrollTo(0, 1600)); await wait(500);
    const h = await p.evaluate(() => { const el = document.querySelector('.topbar'); const icon = el.querySelector('.icon-button .icon, [data-site-menu] .icon'); return {bg: getComputedStyle(el).backgroundColor, alpha: el.dataset.alpha, icon: icon ? getComputedStyle(icon).color : '', token: getComputedStyle(document.documentElement).getPropertyValue('--dg-header-solid').trim()}; });
    const bg = rgb(h.bg); r.header[name] = {renk: hex(bg), alfa: h.alpha, token: h.token, ikon: hex(rgb(h.icon)), kontrast_beyaz: ratio(bg, [255, 255, 255])};
    if (engine === 'chromium') await p.screenshot({path: `${dir}/header-${file.replace('.html', '')}.png`, clip: {x: 0, y: 0, width: 390, height: 120}});
    // 2 · Section headings: every visible one (detail tabs opened in turn).
    const heads = async () => p.evaluate(() => [...document.querySelectorAll('.dg-head')].filter(x => x.offsetParent).map(row => { const h2 = row.querySelector('h2'), s = getComputedStyle(h2), rs = getComputedStyle(row), a = row.querySelector('.dg-head__link'), as = a && getComputedStyle(a); return {baslik: h2.textContent.trim(), boyut: s.fontSize, agirlik: s.fontWeight, yazi: s.fontFamily.split(',')[0], renk: s.color, satir: s.lineHeight, aralik: s.letterSpacing, alt_bosluk: rs.marginBottom, ust_etiket: row.querySelectorAll('.eyebrow,[class*=eyebrow]').length, baglanti: a ? {metin: a.textContent.trim(), boyut: as.fontSize, agirlik: as.fontWeight, renk: as.color, hedef: a.getAttribute('href')} : null}; }));
    let list = await heads();
    if (file === 'detay-v2.html') for (const t of ['hazirlanis', 'yorumlar']) { await p.evaluate(() => scrollTo(0, 0)); await p.click(`[data-dv2-tab=${t}]`); await wait(300); list = list.concat(await heads()); }
    for (const x of list) if (!r.basliklar.some(y => y.ekran === name && y.baslik === x.baslik)) r.basliklar.push({ekran: name, ...x});
    await ctx.close();
    // 3 · Side menu, guest and member.
    for (const q of ['', '?giris=1']) {
      const {p, ctx} = await open(browser, file, q);
      await p.locator('[data-site-menu]').first().click(); await wait(500);
      const sig = await p.evaluate(() => { const d = document.querySelector('dialog.om'), dr = d.getBoundingClientRect(); return {w: Math.round(dr.width), rows: [...d.querySelectorAll('.om-row,.om-auth .button,.om-short,.om-profile')].filter(x => x.offsetParent).map(x => { const s = getComputedStyle(x), rr = x.getBoundingClientRect(); return [x.textContent.trim().replace(/\s+/g, ' '), Math.round(rr.height), s.fontSize, x.querySelector('.icon')?.className.replace(/\s+/g, ' ') || '', x.classList.contains('is-active')]; }), logo: d.querySelector('.om-logo img')?.getAttribute('src').split('?')[0]}; });
      r.menu[(q ? 'uye' : 'misafir') + ' · ' + name] = sig;
      if (engine === 'chromium') await p.screenshot({path: `${dir}/menu-${q ? 'uye' : 'misafir'}-${file.replace('.html', '')}.png`});
      await ctx.close();
    }
  }
  // Menus identical except the active row (the screen you are on).
  for (const mode of ['misafir', 'uye']) {
    const sigs = SCREENS.map(([, n]) => r.menu[`${mode} · ${n}`]);
    const strip = s => ({...s, rows: s.rows.map(x => x.slice(0, 4))});
    assert.deepEqual(strip(sigs[1]), strip(sigs[0]), mode + ' liste ≠ ana sayfa');
    assert.deepEqual(strip(sigs[2]), strip(sigs[0]), mode + ' detay ≠ ana sayfa');
  }
  // 4 · Recipe cards: home pair tile, list card, detail similar tile; and the video glass pair.
  for (const [file, sel, label] of [['ana-v3.html', '.dg-pairs .dg-tile', 'Ana sayfa · en son eklenenler'], ['liste-v2.html', '.lv2-grid .dg-card', 'Liste · kart'], ['detay-v2.html', '.dv2-similar .dg-tile', 'Detay · benzer tarifler']]) {
    for (const q of ['?radius=a&rozet=a', '?radius=b&rozet=b']) {
      const {p, ctx} = await open(browser, file, q);
      const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await wait(700);
      r.kart[label + ' ' + q] = await el.evaluate(c => { const cs = (e, pe) => getComputedStyle(e, pe); const media = c.querySelector('.dg-tile__media,.dg-card__media'), m = c.querySelector('.dg-meta'), s = c.querySelector('.dg-save'), av = c.querySelector('.dg-avatar'); return {radius: cs(media).borderTopLeftRadius, rozet: {bg: cs(m).backgroundColor, r: cs(m).borderTopLeftRadius, h: m.getBoundingClientRect().height}, kaydet: {bg: cs(s, '::before').backgroundColor, r: cs(s, '::before').borderTopLeftRadius, hedef: s.getBoundingClientRect().width, gorunur: s.getBoundingClientRect().width - 2 * parseFloat(cs(s, '::before').top), golge: cs(s).boxShadow}, avatar: {harf: av.textContent, boyut: cs(av).fontSize, yazi: cs(av).fontFamily.split(',')[0], agirlik: cs(av).fontWeight, w: av.getBoundingClientRect().width}, bilesen: c.className}; });
      if (engine === 'chromium' && q.includes('=a')) await el.screenshot({path: `${dir}/kart-${file.replace('.html', '')}.png`});
      await ctx.close();
    }
  }
  {
    const {p, ctx} = await open(browser, 'ana-v3.html');
    const v = p.locator('#video .v3-video').nth(1); await v.scrollIntoViewIfNeeded(); await wait(500);
    r.video = await v.evaluate(c => { const m = c.querySelector('.dg-meta'), pl = c.querySelector('.dg-play'), a = getComputedStyle(m), b = getComputedStyle(pl, '::before'); return {sure: {bg: a.backgroundColor, filtre: a.backdropFilter || a.webkitBackdropFilter, r: a.borderTopLeftRadius, h: m.getBoundingClientRect().height}, oynat: {bg: b.backgroundColor, filtre: b.backdropFilter || b.webkitBackdropFilter, r: b.borderTopLeftRadius, h: pl.getBoundingClientRect().height - 2 * parseFloat(b.top)}}; });
    assert.equal(r.video.sure.bg, r.video.oynat.bg); assert.equal(r.video.sure.r, r.video.oynat.r); assert.equal(r.video.sure.h, r.video.oynat.h);
    if (engine === 'chromium') await v.screenshot({path: `${dir}/video-kart.png`});
    await ctx.close();
  }
  // Same values on the three screens.
  const hs = Object.values(r.header); assert(hs.every(x => x.renk === '#DC3D17'), JSON.stringify(r.header));
  const keyOf = x => [x.boyut, x.agirlik, x.yazi, x.renk, x.satir, x.aralik, x.alt_bosluk, x.ust_etiket].join('|');
  assert.equal(new Set(r.basliklar.map(keyOf)).size, 1, JSON.stringify(r.basliklar));
  const links = r.basliklar.filter(x => x.baglanti?.metin.startsWith('Tümü')).map(x => [x.baglanti.boyut, x.baglanti.agirlik, x.baglanti.renk].join('|'));
  assert.equal(new Set(links).size, 1, JSON.stringify(links));
  assert(!r.basliklar.some(x => /Tamamını/.test(x.baglanti?.metin || '')));
  for (const q of ['?radius=a&rozet=a', '?radius=b&rozet=b']) {
    const cards = Object.entries(r.kart).filter(([k]) => k.endsWith(q)).map(([, v]) => v);
    for (const f of ['radius']) assert.equal(new Set(cards.map(c => c[f])).size, 1, q + f);
    assert.equal(new Set(cards.map(c => JSON.stringify(c.rozet))).size, 1, q + ' rozet');
    assert.equal(new Set(cards.map(c => JSON.stringify(c.kaydet))).size, 1, q + ' kaydet');
    assert(cards.every(c => c.avatar.boyut === '13px' && c.avatar.yazi === 'GilroyBd' && c.avatar.w === 20), q + ' avatar');
  }
  await browser.close();
}

// Composite images (side by side) from the chromium captures.
const browser = await chromium.launch();
async function board(name, cols, title) {
  const p = await browser.newPage({viewport: {width: 300 * cols.length + 80, height: 400}, deviceScaleFactor: 1});
  const cells = cols.map(([img, cap]) => `<figure><figcaption>${cap}</figcaption><img src="data:image/png;base64,${fs.readFileSync(`${dir}/${img}`).toString('base64')}"></figure>`).join('');
  await p.setContent(`<html><body style="margin:0;padding:24px;background:#F4F4F4;font:600 16px system-ui"><h1 style="font-size:20px;margin:0 0 16px">${title}</h1><div style="display:flex;gap:24px;align-items:flex-start">${cells}</div><style>figure{margin:0;width:${cols.length > 3 ? 300 : 390}px}img{width:100%;display:block;border-radius:12px;box-shadow:0 2px 8px #0002}figcaption{margin-bottom:8px}</style></body></html>`);
  await p.waitForLoadState('load'); await p.setViewportSize({width: (cols.length > 3 ? 324 : 414) * cols.length + 48, height: 400});
  await p.screenshot({path: `${dir}/${name}.png`, fullPage: true}); await p.close();
}
await board('menu-uc-ekran-misafir', SCREENS.map(([f, n]) => [`menu-misafir-${f.replace('.html', '')}.png`, n]), 'Sağ menü — misafir');
await board('menu-uc-ekran-uye', SCREENS.map(([f, n]) => [`menu-uye-${f.replace('.html', '')}.png`, n]), 'Sağ menü — üye önizlemesi');
await board('kartlar-uc-ekran', [['kart-ana-v3.png', 'Ana sayfa · en son eklenenler'], ['kart-liste-v2.png', 'Liste · kart'], ['kart-detay-v2.png', 'Detay · benzer tarifler']], 'Tarif kartları — aynı rozet, kaydet, köşe ve avatar');
await board('header-uc-ekran', SCREENS.map(([f, n]) => [`header-${f.replace('.html', '')}.png`, n]), 'Header (kaydırılmış, solid)');
await browser.close();
fs.writeFileSync(`v3-app/verification/yeni-tasarim-v2/tutarlilik-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({header: out.chromium.header, basliklar: out.chromium.basliklar.map(x => `${x.ekran}: ${x.baslik} ${x.boyut}/${x.agirlik} ${x.yazi} ${x.renk} alt ${x.alt_bosluk}`), video: out.chromium.video}, null, 1));
