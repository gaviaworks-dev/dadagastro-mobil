// 47 · Patron seçimleri revize QA. Chromium + WebKit × 360/390/430. Proje kökünden: node v3-app/docs/47/qa.mjs
// "önce" ölçümleri, değişen dosyaların bu tur öncesi kopyasına (docs/47/once) yönlendirilerek alınır.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
import fs from 'node:fs';
const ROOT = 'http://127.0.0.1:8765/v3-app/', HERE = new URL('.', import.meta.url).pathname;
const SHOTS = new URL('../screenshots/patron-secimleri/', import.meta.url).pathname;
fs.mkdirSync(SHOTS + 'tam', {recursive: true});
const ONCE = ['ana-v3.html', 'ana-v3.js', 'ana-v3.css', 'liste-v2.html', 'liste-v2.js', 'liste-v2.css', 'detay-v2.html', 'detay-v2.js', 'detay-v2.css', 'ortak-kart.css', 'ortak-kart.js'];
const results = {}, fails = [];
const check = (key, ok, detail) => { (results[key] ??= []).push({ok, detail}); if (!ok) fails.push(key + ' ' + JSON.stringify(detail)); };
async function page(browser, w, {once = false} = {}) {
  const ctx = await browser.newContext({viewport: {width: w, height: 844}, deviceScaleFactor: 1});
  const p = await ctx.newPage(); await stableLocal(p);
  if (once) await p.route(/\/v3-app\/(ana-v3|liste-v2|detay-v2|ortak-kart)\.(html|js|css)(\?.*)?$/, async r => { const f = new URL(r.request().url()).pathname.split('/').pop(); if (!ONCE.includes(f)) return r.fallback(); await r.fulfill({body: fs.readFileSync(HERE + 'once/' + f), contentType: f.endsWith('.css') ? 'text/css' : f.endsWith('.js') ? 'text/javascript' : 'text/html'}); });
  p.errs = []; p.on('pageerror', e => p.errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push('console ' + m.text()); });
  p.on('response', r => { if (r.status() >= 400) p.errs.push(r.status() + ' ' + r.url()); }); p.on('requestfailed', r => p.errs.push('failed ' + r.url() + ' ' + r.failure()?.errorText));
  return p;
}
async function go(p, url) { await p.goto(ROOT + url, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600); }
const measures = {};
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null, on = k => !ONLY || ONLY.includes(k);
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const w of (on('ekran') || on('menu') ? [360, 390, 430] : [])) {
    const tag = `${name}-${w}`;
    // ---------- Üç ekran: tam sayfa, hata, taşma, ikon, elle seçenek izi ----------
    for (const pg of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']) {
      const p = await page(browser, w); await go(p, pg);
      const st = await p.evaluate(() => ({overflow: document.documentElement.scrollWidth - innerWidth, regular: document.querySelectorAll('.fa-regular,.far').length, dgData: Object.keys(document.documentElement.dataset).filter(k => /^dg|^v3Gosterge/.test(k)), arrows: [...document.querySelectorAll('.fa-arrow-up-right-from-square,.x-arrow')].filter(e => e.getClientRects().length).length, internal: (document.body.innerText.match(/\?(gosterge|radius|rozet|siralama|yazar)=|data-dg|dg-[a-z]+|\.html/g) || []).length}));
      check(`${pg} hata yok`, !p.errs.length, {tag, errs: p.errs});
      check(`${pg} yatay taşma yok`, st.overflow <= 0, {tag, v: st.overflow});
      check(`${pg} outline ikon yok`, st.regular === 0, {tag, v: st.regular});
      check(`${pg} seçenek niteliği yok`, !st.dgData.length, {tag, v: st.dgData});
      check(`${pg} görünür metinde iç kod yok`, st.internal === 0, {tag, v: st.internal});
      if (pg === 'ana-v3.html') check('P2 ana sayfada dışa açılan ok düğmesi yok', st.arrows === 0, {tag, v: st.arrows});
      await p.screenshot({path: `${SHOTS}tam/${tag}-${pg.replace('.html', '')}.png`, fullPage: true});
      await p.context().close();
    }
    // ---------- P0 · eski linkler: hatasız, sabit tasarım ----------
    for (const [url, expect] of [['detay-v2.html?yazar=c&radius=b', 'detay'], ['detay-v2.html?yazar=d&radius=b&rozet=b&gosterge=b&siralama=b&not=a', 'detay'], ['liste-v2.html?siralama=b&gosterge=b&radius=b&rozet=b', 'liste'], ['ana-v3.html?gosterge=b&radius=b&rozet=b&yazar=b', 'ana']]) {
      const p = await page(browser, w); await go(p, url);
      const st = await p.evaluate(() => { const cs = (e, ps) => e && getComputedStyle(e, ps); const m = document.querySelector('.dg-card__media,.dg-tile__media,.dg-feature__media'); return {chef: document.querySelector('.dv2-chef')?.className || '', counter: document.querySelectorAll('.dg-pager-count,.v3-pager-count,[data-dg-current],[data-v3-current]').length, dots: document.querySelectorAll('.dg-pager-dots,.v3-pager-dots').length, sortLabel: document.querySelectorAll('.lv2-sort-button__label').length, sortW: document.querySelector('.lv2-sort-button')?.getBoundingClientRect().width, cardR: cs(m)?.borderTopLeftRadius, metaBg: cs(document.querySelector('.dg-meta'))?.backgroundColor, links: [...document.querySelectorAll('a[href*="detay-v2"],a[href*="liste-v2"]')].filter(a => /[?&](yazar|radius|rozet|gosterge|siralama)=/.test(a.getAttribute('href'))).length, url: location.search}; });
      check('P0 eski link hatasız', !p.errs.length, {tag, url, errs: p.errs});
      if (expect === 'detay') check('P0 detay şef kartı 2 (eski b)', /dv2-chef-b/.test(st.chef), {tag, url, v: st.chef});
      if (expect === 'liste') check('P0 liste sıralama yalnız ikon 44px', st.sortLabel === 0 && Math.round(st.sortW) === 44, {tag, v: st});
      if (expect !== 'detay') check('P0 gösterge noktalar, sayaç yok', st.counter === 0 && st.dots > 0, {tag, url, v: st});
      check('P0 kart köşesi 16, rozet zemini yok', st.cardR === '16px' && /rgba\(0, 0, 0, 0\)|transparent/.test(st.metaBg), {tag, url, v: st});
      check('P0 kaldırılan parametre yeni bağlantılara taşınmıyor', st.links === 0, {tag, url, v: st.links});
      await p.context().close();
    }
    // ---------- P1 · detay sırası, sekme yapışması ve kaydırma (önce / sonra) ----------
    for (const once of [true, false]) {
      const p = await page(browser, w, {once}); await go(p, 'detay-v2.html');
      const order = await p.evaluate(() => ({head: [...document.querySelector('.dv2-head').children].filter(e => e.getClientRects().length).map(e => e.className.split(' ')[0]), tail: [...document.querySelector('.dv2-tail').children].map(e => e.className.split(' ')[0] + (e.querySelector('h2')?.textContent ? ':' + e.querySelector('h2').textContent.trim() : ''))}));
      const m = {order};
      for (const tab of ['hazirlanis', 'yorumlar', 'malzemeler']) {
        // Serbest: çubuk yapışmamışken sekme değişince kaydırma aynı kalır.
        await p.evaluate(() => scrollTo({top: 0, behavior: 'instant'})); await p.waitForTimeout(150);
        const free = await p.evaluate(async tab => { const y0 = Math.max(0, document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top + scrollY - document.querySelector('.detail-header').getBoundingClientRect().height - 300); scrollTo({top: y0, behavior: 'instant'}); await new Promise(r => setTimeout(r, 150)); const before = scrollY; document.querySelector(`[data-dv2-tab="${tab}"]`).click(); await new Promise(r => setTimeout(r, 250)); return {before, after: scrollY}; }, tab);
        // Yapışık: çubuğun yerinden 700px aşağıda; sekme değişince yeni panel çubuğun hemen altından başlar.
        const stuck = await p.evaluate(async tab => { const H = () => document.querySelector('.detail-header').getBoundingClientRect(); const anchor = () => document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top + scrollY - H().height; scrollTo({top: anchor() + 700, behavior: 'instant'}); await new Promise(r => setTimeout(r, 200)); const bar = document.querySelector('.dv2-tabs-bar').getBoundingClientRect(); const gapStuck = bar.top - H().bottom; const before = scrollY; document.querySelector(`[data-dv2-tab="${tab}"]`).click(); await new Promise(r => setTimeout(r, 300)); const b2 = document.querySelector('.dv2-tabs-bar').getBoundingClientRect(), pane = document.querySelector('.dv2-pane:not([hidden])').getBoundingClientRect(); return {dock: Math.ceil(anchor()), before, after: scrollY, gapStuck: +gapStuck.toFixed(2), barToHeader: +(b2.top - H().bottom).toFixed(2), paneToBar: +(pane.top - b2.bottom).toFixed(2), stuckClass: document.querySelector('.dv2-tabs-bar').classList.contains('is-stuck')}; }, tab);
        m[tab] = {free, stuck};
        if (!once) {
          check('P1 serbest çubukta sekme geçişi kaydırmayı korur', Math.abs(free.after - free.before) <= 1, {tag, tab, free});
          check('P1 yapışık çubuk header altında 0px', Math.abs(stuck.gapStuck) <= 1 && Math.abs(stuck.barToHeader) <= 1 && stuck.stuckClass, {tag, tab, stuck});
          check('P1 yapışık geçişte panel çubuğun hemen altında, kaydırma = çapa', Math.abs(stuck.paneToBar) <= 1 && Math.abs(stuck.after - stuck.dock) <= 1, {tag, tab, stuck});
        }
      }
      if (!once) {
        const want = ['dv2-nutrition', 'dv2-chef', 'dv2-info', 'recipe-metadata', 'dv2-similar'];
        const seq = order.tail.map(x => x.split(':')[0]).filter(x => want.includes(x));
        check('P1 kuyruk sırası Besin → şef → Hatırlatma/Alerjen → Tarif bilgileri → Benzer', JSON.stringify(seq) === JSON.stringify(want), {tag, tail: order.tail});
        check('P1 çubuğun üstünde özet · özellikler · açıklama', JSON.stringify(order.head) === JSON.stringify(['dv2-facts', 'dv2-features', 'description-wrap']), {tag, head: order.head});
      }
      (measures[tag] ??= {})[once ? 'P1once' : 'P1sonra'] = m;
      await p.context().close();
    }
    // ---------- P2 · hero: slaydın tamamı tarife gider; erişilebilir ad ----------
    { const p = await page(browser, w); await go(p, 'ana-v3.html');
      const st = await p.evaluate(() => { const s = document.querySelector('.v3-hero-slide:not([data-clone])'), a = s.querySelector('.v3-hero-recipe'), hit = s.querySelector('.v3-hero-hit'), r = s.getBoundingClientRect(), h = hit.getBoundingClientRect(); const pt = document.elementFromPoint(r.left + r.width / 2, r.top + r.height * .55); return {name: a.innerText.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href'), hitHref: hit.getAttribute('href'), cover: [Math.round(h.width - r.width), Math.round(h.height - r.height)], photoTarget: pt?.closest('a')?.getAttribute('href') || '', infoRight: +(s.querySelector('.v3-hero-info').getBoundingClientRect().right - a.getBoundingClientRect().right).toFixed(1), searchTarget: document.elementFromPoint(document.querySelector('.a-global-search').getBoundingClientRect().left + 30, document.querySelector('.a-global-search').getBoundingClientRect().top + 20)?.closest('a')?.getAttribute('href')}; });
      check('P2 slaydın tamamı tarife gider', st.cover[0] === 0 && st.cover[1] === 0 && st.photoTarget === st.href && /detay-v2\.html\?tarif=/.test(st.href), {tag, st});
      check('P2 erişilebilir ad korunur', /Bugün deneyebilirsin/.test(st.name) && st.name.length > 20, {tag, name: st.name});
      check('P2 arama hedefi kendi bağlantısı', /arama\.html/.test(st.searchTarget || ''), {tag, st: st.searchTarget});
      check('P2 bilgi bağlantısı tam genişlik (ok boşluğu yok)', Math.abs(st.infoRight) <= 1, {tag, v: st.infoRight});
      // Kaldırılan düğme sheet'lerde de yok: Ne Pişirsem paneli ve Dolapta Ne Var sonuçları.
      await p.evaluate(() => document.querySelector('.bottom-nav [data-photo-entry]')?.click()); await p.waitForTimeout(400);
      const sheetArrows = await p.evaluate(() => [...document.querySelectorAll('.fa-arrow-up-right-from-square,.x-arrow')].filter(e => e.getClientRects().length).length);
      check('P2 Ne Pişirsem panelinde de ok düğmesi yok', sheetArrows === 0, {tag, v: sheetArrows});
      await p.context().close(); }
    // ---------- P3 · Dünya Mutfakları: çıplak bayrak, küçük sayı, eşit sekme yüksekliği ----------
    { const p = await page(browser, w); await go(p, 'ana-v3.html');
      const st = await p.evaluate(async () => { const sec = document.querySelector('.v3-cats'), next = sec.nextElementSibling; const h = () => ({cat: document.querySelector('[data-v3-panel=cat]').getBoundingClientRect().height, cui: document.querySelector('[data-v3-panel=cuisine]').getBoundingClientRect().height, sec: sec.getBoundingClientRect().height, next: next.getBoundingClientRect().top + scrollY}); const a = h(); document.querySelector('[data-v3-cat=cuisine]').click(); await new Promise(r => setTimeout(r, 200)); const b = h(); const it = document.querySelector('.v3-cuisine'), flag = it.querySelector('.v3-flag'), fr = it.querySelector('.v3-cuisine-flag'), cnt = it.querySelector('.v3-cuisine-count'), name = it.querySelector('b'); const cs = e => getComputedStyle(e); return {a, b, flag: {bg: cs(fr).backgroundColor, shadow: cs(flag).boxShadow, frShadow: cs(fr).boxShadow, border: cs(fr).borderTopWidth, r: cs(flag).borderTopLeftRadius, w: flag.getBoundingClientRect().width}, count: {size: cs(cnt).fontSize, color: cs(cnt).color, gap: +(cnt.getBoundingClientRect().top - name.getBoundingClientRect().bottom).toFixed(2)}, name: cs(name).fontSize}; });
      check('P3 ana sayfa iki sekme panel yüksekliği eşit (0px)', Math.abs(st.a.cat - st.a.cui) < .01 && Math.abs(st.b.sec - st.a.sec) < .01 && Math.abs(st.b.next - st.a.next) < .01, {tag, st: {a: st.a, b: st.b}});
      check('P3 ana sayfa bayrak çıplak', st.flag.bg === 'rgba(0, 0, 0, 0)' && st.flag.shadow === 'none' && st.flag.frShadow === 'none' && st.flag.border === '0px', {tag, flag: st.flag});
      check('P3 ana sayfa sayı etiket ölçeği, sönük', st.count.size === '11px' && st.count.color === 'rgb(86, 81, 74)', {tag, count: st.count});
      (measures[tag] ??= {}).P3ana = st;
      await go(p, 'liste-v2.html');
      const ls = await p.evaluate(async () => { const rail = document.querySelector('.lv2-rail'); const before = {rail: rail.getBoundingClientRect().height, status: document.querySelector('.lv2-status').getBoundingClientRect().top}; document.querySelector('[data-ld-scope=mutfak]').click(); await new Promise(r => setTimeout(r, 400)); const img = document.querySelector('.lv2-rail .dg-mark--flag img'), mk = img.parentElement; const cs = e => getComputedStyle(e); return {before, after: {rail: rail.getBoundingClientRect().height}, flag: {shadow: cs(img).boxShadow, markBg: cs(mk).backgroundColor, r: cs(img).borderTopLeftRadius}}; });
      check('P3 liste iki sekme şerit yüksekliği eşit (0px)', Math.abs(ls.before.rail - ls.after.rail) < .01, {tag, ls});
      check('P3 liste bayrak çıplak', ls.flag.shadow === 'none' && ls.flag.markBg === 'rgba(0, 0, 0, 0)', {tag, ls: ls.flag});
      (measures[tag] ??= {}).P3liste = ls;
      await p.context().close(); }
    // ---------- P4 · rozet zemini yok, üst geçiş, kaydet 44px zeminsiz; P5 · 44px bağlantı ----------
    for (const pg of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'liste-v2.html?gorunum=liste']) {
      const p = await page(browser, w); await go(p, pg);
      const st = await p.evaluate(() => { const cs = (e, ps) => getComputedStyle(e, ps); const metas = [...document.querySelectorAll('.dg-meta')]; const saves = [...document.querySelectorAll('.dg-save')]; const medias = [...document.querySelectorAll('.dg-card__media,.dg-feature__media,.dg-tile__media,.v3-video-cover')];
        return {metaBg: [...new Set(metas.map(m => cs(m).backgroundColor + '|' + cs(m).backdropFilter + '|' + cs(m).boxShadow))], saveBefore: [...new Set(saves.map(s => cs(s, '::before').content))], saveBg: [...new Set(saves.map(s => cs(s).backgroundColor + '|' + cs(s).boxShadow))], saveSize: [...new Set(saves.map(s => Math.round(s.getBoundingClientRect().width) + 'x' + Math.round(s.getBoundingClientRect().height)))], saveColor: [...new Set(saves.map(s => cs(s).color))], veils: medias.filter(m => cs(m, '::after').content !== 'none' && cs(m, '::after').backgroundImage.includes('gradient')).length, medias: medias.length, veilH: [...new Set(medias.slice(0, 6).map(m => (parseFloat(cs(m, '::after').height) / m.getBoundingClientRect().height * 100).toFixed(1) + '%'))], featureText: [...document.querySelectorAll('.dg-feature .dg-card__text')].filter(e => e.getClientRects().length).map(e => e.getBoundingClientRect().height), plays: [...new Set([...document.querySelectorAll('.dg-play')].map(s => cs(s, '::before').content + '|' + cs(s).backgroundColor))], inRecipeCard: document.querySelectorAll('.recipe-card .dg-save').length}; });
      check('P4 süre/puan rozet zemini yok', st.metaBg.every(x => x.startsWith('rgba(0, 0, 0, 0)|none|none')), {tag, pg, v: st.metaBg});
      check('P4 kaydet zeminsiz, 44×44, beyaz', st.saveBefore.every(x => x === 'none') && st.saveBg.every(x => x === 'rgba(0, 0, 0, 0)|none') && st.saveSize.every(x => x === '44x44') && st.saveColor.every(c => c === 'rgb(255, 255, 255)'), {tag, pg, v: st});
      check('P4 her görselde üst geçiş', st.veils === st.medias && st.medias > 0, {tag, pg, v: [st.veils, st.medias, st.veilH]});
      const ek = await p.evaluate(() => ({stars: document.querySelectorAll('.dg-meta .fa-star,.dg-meta__rating,.v3-video .fa-star').length, metas: [...document.querySelectorAll('.dg-meta')].map(m => ({w: getComputedStyle(m).fontWeight, f: getComputedStyle(m).fontFamily.split(',')[0], t: m.textContent.trim(), icons: [...m.querySelectorAll('.icon')].map(i => i.className.match(/fa-(clock|eye)/)?.[1]).join(',')})), boxed: document.querySelectorAll('.v3-cats .photo-meta,.v3-cat-count').length}));
      check('EK kartlarda yıldız/puan yok', ek.stars === 0, {tag, pg, v: ek.stars});
      check('EK süre/görüntülenme kalın, saat + göz ikonu', ek.metas.length > 0 && ek.metas.every(m => +m.w >= 700 && /GilroyBd/.test(m.f) && /^clock(,eye)?$/.test(m.icons) && /dk|:/.test(m.t)), {tag, pg, v: ek.metas.slice(0, 4)});
      check('EK kategori kartında kutulu sayı etiketi yok', ek.boxed === 0, {tag, pg, v: ek.boxed});
      if (st.featureText.length) check('P5 öne çıkan kart bağlantısı ≥ 44px', st.featureText.every(h => h >= 44), {tag, pg, v: st.featureText});
      // Kaydedince ikon primary (misafir önizlemesinde kaydet yerel durumdur).
      const saved = await p.evaluate(async () => { const s = [...document.querySelectorAll('.dg-save')].find(e => e.getClientRects().length && e.getAttribute('aria-pressed') === 'false'); if (!s) return null; s.click(); await new Promise(r => setTimeout(r, 400)); const t = document.querySelector(`.dg-save[data-save="${s.dataset.save}"]`); return {pressed: t.getAttribute('aria-pressed'), color: getComputedStyle(t).color, bg: getComputedStyle(t).backgroundColor, before: getComputedStyle(t, '::before').content, gate: !!document.querySelector('dialog[open]')}; });
      const vf = await p.evaluate(() => [...document.querySelectorAll('.dg-meta__views')].map(e => e.textContent.trim()));
      check('EK görüntülenme biçimi (0 ve yok çizilmez, Türkçe kısaltma)', vf.every(t => /^(\d{1,3}|\d{1,3}(,\d)? (B|Mn))$/.test(t) && t !== '0'), {tag, pg, v: vf.slice(0, 6)});
      if (saved) check('P4 kaydedilince ikon primary, zemin yok', saved.gate || (saved.pressed === 'true' && saved.color === 'rgb(225, 72, 39)' && saved.bg === 'rgba(0, 0, 0, 0)' && saved.before === 'none'), {tag, pg, saved});
      (measures[tag] ??= {})['P4 ' + pg] = {...st, saved};
      await p.context().close();
    }
    // ---------- Sağ menü üç ekranda aynı ----------
    if (on('menu') || on('ekran')) { const menus = {};
      for (const pg of ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']) { const p = await page(browser, w); await go(p, pg); await p.evaluate(() => document.querySelector('[data-site-menu]')?.click()); await p.waitForTimeout(500); menus[pg] = await p.evaluate(() => { const d = document.querySelector('.om-panel')?.closest('dialog,aside,div') || document.querySelector('.om-panel'); return [...(d?.querySelectorAll('.om-item, .om-nav a, .om-nav button, .om-foot a, .om-foot button') || [])].map(e => (e.textContent.replace(/\s+/g, ' ').trim()) + '→' + (e.getAttribute('href') || '').replace(/[?#].*$/, '')).filter(x => x.length > 1); }); await p.context().close(); }
      // Satır, sıra ve etiket aynı olmalı; hedef farkı bilinçli: ana sayfada Ne Pişirsem / Dolapta Ne Var / Püf Noktaları sayfa içi eylem.
      const labels = k => JSON.stringify(menus[k].map(x => x.split('→')[0]));
      check('Sağ menü üç ekranda aynı', labels('ana-v3.html') === labels('liste-v2.html') && labels('liste-v2.html') === labels('detay-v2.html') && menus['ana-v3.html'].length > 8, {tag, n: menus['ana-v3.html'].length, hedefFarki: menus['ana-v3.html'].map((x, i) => x !== menus['liste-v2.html'][i] ? [x, menus['liste-v2.html'][i]] : null).filter(Boolean)}); }
  }
  // ---------- P6 · önizleme: masaüstü 1440 ve dar 390; çerçeve içi gezinme ----------
  for (const w of (on('p6') ? [1440, 390] : [])) {
    const p = await page(browser, w); await p.goto(ROOT + 'onizleme-v3.html', {waitUntil: 'load'});
    await p.waitForFunction(() => [...document.querySelectorAll('iframe')].every(f => f.getAttribute('src')), null, {timeout: 60000}); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500);
    const st = await p.evaluate(() => ({frames: [...document.querySelectorAll('iframe')].map(f => [f.getAttribute('src'), f.getBoundingClientRect().width, f.offsetWidth, f.offsetHeight, f.contentWindow.innerWidth]), caps: [...document.querySelectorAll('figcaption')].map(e => e.textContent), open: [...document.querySelectorAll('.pv-open')].map(a => a.getAttribute('href')), overflow: document.documentElement.scrollWidth - innerWidth, tabs: getComputedStyle(document.querySelector('.pv-tabs')).display, visible: [...document.querySelectorAll('.pv-screen')].filter(s => getComputedStyle(s).visibility === 'visible').length, text: document.body.innerText}));
      check('P6 üç çerçeve parametresiz 390×844', JSON.stringify(st.frames.map(f => [f[0], f[2], f[3], f[4]])) === JSON.stringify([['ana-v3.html', 390, 844, 390], ['liste-v2.html', 390, 844, 390], ['detay-v2.html', 390, 844, 390]]), {name, w, v: st.frames});
      check('P6 başlıklar ve tam ekran bağlantıları', st.caps.join('|') === '1. Ana Sayfa|2. Tarif Listesi|3. Tarif Detay' && st.open.join('|') === 'ana-v3.html|liste-v2.html|detay-v2.html', {name, w, st: [st.caps, st.open]});
      check('P6 taşma yok, hata yok', st.overflow <= 0 && !p.errs.length, {name, w, overflow: st.overflow, errs: p.errs});
      check('P6 görünür metinde iç kod / seçenek yok', !/\.html|\?|Seçenek|seçenek/.test(st.text), {name, w});
      check(w === 1440 ? 'P6 masaüstünde üçü yan yana, sekme yok' : 'P6 dar ekranda sekmeli tek ekran', w === 1440 ? st.tabs === 'none' && st.visible === 3 : st.tabs === 'grid' && st.visible === 1, {name, w, st: [st.tabs, st.visible]});
      await p.screenshot({path: `${SHOTS}onizleme-${name}-${w}.png`});
      if (w === 1440) {
        // Çerçeve içinde gezinme: ana sayfa kartı → detay, ana sayfa Tümü → liste, liste kartı → detay.
        // Çerçevenin kendi bağlantısına dokunma (a.click: gerçek bağlantı gezinmesi, çerçeve içinde kalır).
        const frameAt = i => p.frames().filter(fr => fr.parentFrame())[i];
        const tap = async (i, sel) => { const f = frameAt(i); const href = await f.evaluate(sel => { const a = document.querySelector(sel); a.click(); return a.getAttribute('href'); }, sel); await p.waitForTimeout(3000); return {href, url: frameAt(i).url()}; };
        const n1 = await tap(0, '.v3-latest .dg-pairs .dg-card__text');
        check('P6 ana sayfa kartı → detay (çerçeve içinde)', /detay-v2\.html\?tarif=/.test(n1.url) && p.url().endsWith('onizleme-v3.html'), {name, n1});
        await frameAt(0).goto(ROOT + 'ana-v3.html', {waitUntil: 'networkidle'}).catch(() => {}); await p.waitForTimeout(1500);
        const n2 = await tap(0, '.dg-head__link[href*="liste-v2"]');
        check('P6 Tümü → liste (çerçeve içinde)', /liste-v2\.html/.test(n2.url), {name, n2});
        const n3 = await tap(1, '.lv2-grid .dg-card__text');
        check('P6 liste kartı → detay (çerçeve içinde)', /detay-v2\.html\?tarif=/.test(n3.url), {name, n3});
        const n4 = await tap(2, '.dv2-similar .dg-card__text');
        check('P6 benzer tarif → detay (çerçeve içinde)', /detay-v2\.html\?tarif=/.test(n4.url) && n4.url !== ROOT + 'detay-v2.html', {name, n4});
        check('P6 gezinmede hata yok', !p.errs.length, {name, errs: p.errs});
      }
      await p.context().close();
  }
  await browser.close();
}
const summary = Object.fromEntries(Object.entries(results).map(([k, v]) => [k, `${v.filter(x => x.ok).length}/${v.length}`]));
fs.writeFileSync(HERE + 'qa.json', JSON.stringify({tarih: new Date().toISOString(), summary, fails, measures, results}, null, 1));
console.log(JSON.stringify(summary, null, 1)); console.log('FAILS', fails.length); fails.slice(0, 30).forEach(f => console.log(' -', f.slice(0, 400)));
