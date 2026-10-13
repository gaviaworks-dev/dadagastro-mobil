// Kök ekran referansı ve görsel fark denetimi (docs/53 §1.4 adım 0 ve §1.5 kapı 3).
// Kullanım (proje kökünden):
//   node v3-app/ortak/denetim/referans.mjs once            → referansı dondurur (ortak/denetim/referans/once/)
//   node v3-app/ortak/denetim/referans.mjs sonra           → aynı seti yeniden çeker ve once ile karşılaştırır
//   node v3-app/ortak/denetim/referans.mjs <ad> --karsi <ref>  → <ad> setini <ref> setiyle karşılaştırır
// Kararlılık: azaltılmış hareket (otomatik geçiş kapalı), deviceScaleFactor 1, tembel görseller kaydırılarak yüklenir.
// Yalnız okur: proje dosyası yazmaz; çıktısı ortak/denetim/referans/<ad>/ altındadır.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
import path from 'node:path';

// --kok <url>: aynı seti başka bir kökten (ör. yayındaki yeni-tasarim-v3) çeker.
const argv = process.argv.slice(2);
const ROOT = argv.includes('--kok') ? argv[argv.indexOf('--kok') + 1].replace(/\/?$/, '/') : 'http://127.0.0.1:8765/v3-app/';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const [mode = 'once', ...rest] = process.argv.slice(2);
const against = rest.includes('--karsi') ? rest[rest.indexOf('--karsi') + 1] : (mode === 'once' ? null : 'once');
const OUT = path.join(HERE, 'referans', mode);
fs.mkdirSync(OUT, {recursive: true});

const PAGES = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html'];
const WIDTHS = [360, 390, 430];
const ENGINES = {chromium, webkit};
// Durumlar yalnız 390'da: [ekran, ad, eylem]
const STATES = [
  ['ana-v3.html', 'menu', p => p.evaluate(() => window.openSiteDrawer && window.openSiteDrawer())],
  ['ana-v3.html', 'tarif-bul', p => p.locator('nav.bottom-nav .fab').first().click()],
  ['liste-v2.html', 'filtre', p => p.locator('#openFilters').click()],
  ['liste-v2.html', 'siralama', p => p.locator('.lv2-sort-button').first().click()],
  ['detay-v2.html', 'hazirlanis', p => p.locator('[role=tab]:has-text("Hazırlanış")').click()],
  ['detay-v2.html', 'paylas', p => p.locator('#shareRecipe').click()],
];

const STYLE_PROPS = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'borderTopColor', 'borderTopWidth', 'borderRadius', 'boxShadow', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'gap', 'opacity'];
function snapshot(props) {
  const rows = [];
  const desc = el => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; const c = [...el.classList].slice(0, 3); if (c.length) s += '.' + c.join('.'); return s; };
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    // backgroundImage: veri URL'lerini kısalt (yalnız tür).
    rows.push([desc(el), Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height), ...props.map(p => p === 'backgroundImage' ? cs[p].slice(0, 200) : cs[p])]);
  }
  return rows;
}

async function settle(p) {
  await p.evaluate(() => document.fonts.ready);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 300) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(80); }
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForLoadState('networkidle').catch(() => {});
  // Tembel arka plan görsellerinin yüklenmesini bekle (data-photo-src → background-image).
  await p.waitForFunction(() => [...document.querySelectorAll('[data-photo-src]')].every(el => el.style.backgroundImage || el.classList.contains('image-failed') || !el.getBoundingClientRect().width), null, {timeout: 15000}).catch(() => {});
  // Görünür bütün görseller çözülene kadar bekle (img + CSS arka planı); ekran görüntüsü yarım görsel yakalamasın.
  await p.evaluate(async () => {
    const urls = new Set();
    for (const el of document.querySelectorAll('body *')) {
      const bg = getComputedStyle(el).backgroundImage;
      for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) if (!m[1].startsWith('data:')) urls.add(m[1]);
    }
    for (const img of document.images) if (img.currentSrc) urls.add(img.currentSrc);
    await Promise.all([...urls].map(u => { const i = new Image(); i.src = u; return i.decode().catch(() => {}); }));
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  await p.waitForTimeout(900);
}

async function capture() {
  const log = [];
  for (const [ename, engine] of Object.entries(ENGINES)) {
    const browser = await engine.launch();
    for (const w of WIDTHS) for (const page of PAGES) {
      const ctx = await browser.newContext({viewport: {width: w, height: 844}, deviceScaleFactor: 1, reducedMotion: 'reduce'});
      const p = await ctx.newPage(); await stableLocal(p);
      const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('response', r => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
      await p.goto(ROOT + page, {waitUntil: 'networkidle'});
      await settle(p);
      const base = `${ename}-${w}-${page.replace('.html', '')}`;
      await p.screenshot({path: path.join(OUT, base + '-ilk.png')});
      await p.screenshot({path: path.join(OUT, base + '-tam.png'), fullPage: true});
      fs.writeFileSync(path.join(OUT, `stil-${base}.json`), JSON.stringify(await p.evaluate(snapshot, STYLE_PROPS)));
      if (w === 390) for (const [sp, name, act] of STATES) if (sp === page) {
        await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
        try { await act(p); await p.waitForTimeout(700); await p.screenshot({path: path.join(OUT, `${base}-${name}.png`)}); } catch (e) { errs.push('durum ' + name + ': ' + e.message.split('\n')[0]); }
        await p.keyboard.press('Escape').catch(() => {}); await p.waitForTimeout(400);
        await p.goto(ROOT + page, {waitUntil: 'networkidle'}); await settle(p);
      }
      log.push({base, errs});
      await ctx.close();
    }
    await browser.close();
  }
  fs.writeFileSync(path.join(OUT, 'kayit.json'), JSON.stringify({mode, tarih: new Date().toISOString(), log}, null, 1));
  return log;
}

// Piksel karşılaştırması tarayıcı canvas'ında (bağımlılık yok).
async function compare(refDir) {
  const browser = await chromium.launch();
  const p = await browser.newPage();
  const files = fs.readdirSync(OUT).filter(f => (f.endsWith('.png') && !f.startsWith('fark-')) || f.startsWith('stil-'));
  const result = [];
  for (const f of files) {
    const a = path.join(refDir, f), b = path.join(OUT, f);
    if (!fs.existsSync(a)) { result.push({f, durum: 'referans yok'}); continue; }
    if (f.endsWith('.json')) {
      // Normalleştirme: kökün alan adı ve önbellek parametresi (?v=) karşılaştırmaya girmez; ölçüm zamanlamasına bağlı
      // iki yaslama sınıfı (dv2-justify / prose-long) aynı görünümü üretir, sınıf adı yok sayılır (docs/55 gürültü notu).
      const nz = rows => JSON.parse(JSON.stringify(rows).replace(/https?:\/\/[^/"\\]+\/(?:dadagastro-mobil\/yeni-tasarim-v3|v3-app)\//g, '/').replace(/\?v=[0-9a-f]{8,12}/g, '').replace(/\.(?:dv2-justify|prose-long)/g, ''));
      const A = nz(JSON.parse(fs.readFileSync(a))), B = nz(JSON.parse(fs.readFileSync(b)));
      let diff = 0; const ornek = [];
      const n = Math.max(A.length, B.length);
      for (let i = 0; i < n; i++) if (JSON.stringify(A[i]) !== JSON.stringify(B[i])) { diff++; if (ornek.length < 3) ornek.push({once: A[i], sonra: B[i]}); }
      result.push({f, tur: 'stil', oge: n, farkli: diff, ornek});
      continue;
    }
    const ba = fs.readFileSync(a), bb = fs.readFileSync(b);
    if (ba.equals(bb)) { result.push({f, tur: 'piksel', farkliPiksel: 0, ayniBayt: true}); continue; }
    const r = await p.evaluate(async ([da, db]) => {
      const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.src = src; });
      const [ia, ib] = await Promise.all([load(da), load(db)]);
      if (ia.width !== ib.width || ia.height !== ib.height) return {boyut: [ia.width, ia.height, ib.width, ib.height]};
      const c = document.createElement('canvas'); c.width = ia.width; c.height = ia.height;
      const x = c.getContext('2d', {willReadFrequently: true});
      x.drawImage(ia, 0, 0); const A = x.getImageData(0, 0, c.width, c.height).data;
      x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const B = x.getImageData(0, 0, c.width, c.height).data;
      let d = 0, maxd = 0, y0 = -1, y1 = -1;
      for (let i = 0; i < A.length; i += 4) {
        const m = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]));
        if (m) { d++; maxd = Math.max(maxd, m); const y = Math.floor(i / 4 / c.width); if (y0 < 0) y0 = y; y1 = y; }
      }
      let gorsel = null;
      if (d) { const o = x.createImageData(c.width, c.height); for (let i = 0; i < A.length; i += 4) { const m = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2])); o.data[i] = m ? 255 : B[i] * .3; o.data[i + 1] = m ? 0 : B[i + 1] * .3; o.data[i + 2] = m ? 0 : B[i + 2] * .3; o.data[i + 3] = 255; } x.putImageData(o, 0, 0); gorsel = c.toDataURL('image/png'); }
      return {farkliPiksel: d, enBuyukKanalFarki: maxd, satirAraligi: d ? [y0, y1] : null, gorsel};
    }, ['data:image/png;base64,' + ba.toString('base64'), 'data:image/png;base64,' + bb.toString('base64')]);
    if (r.gorsel) { fs.writeFileSync(path.join(OUT, 'fark-' + f), Buffer.from(r.gorsel.split(',')[1], 'base64')); delete r.gorsel; }
    result.push({f, tur: 'piksel', ...r});
  }
  await browser.close();
  return result;
}

const log = argv.includes('--yalniz-karsilastir') ? [] : await capture();
console.log('çekildi:', log.length, 'görünüm; hata:', log.filter(l => l.errs.length).map(l => l.base + ' ' + l.errs.join(' | ')).join('\n') || 'yok');
if (against) {
  const res = await compare(path.join(HERE, 'referans', against));
  fs.writeFileSync(path.join(OUT, `fark-${against}.json`), JSON.stringify(res, null, 1));
  const px = res.filter(r => r.tur === 'piksel'), st = res.filter(r => r.tur === 'stil');
  const badPx = px.filter(r => r.farkliPiksel || r.boyut), badSt = st.filter(r => r.farkli);
  console.log(`piksel: ${px.length} görüntü, farklı ${badPx.length}`);
  badPx.forEach(r => console.log('  ', r.f, JSON.stringify(r)));
  console.log(`stil: ${st.length} anlık görüntü, farklı ${badSt.length}`);
  badSt.forEach(r => console.log('  ', r.f, r.farkli, 'öğe', JSON.stringify(r.ornek[0]).slice(0, 400)));
}
