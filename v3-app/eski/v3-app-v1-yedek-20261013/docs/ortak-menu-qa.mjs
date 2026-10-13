// Ortak yan menü doğrulaması (ana-v3 üzerinde). Çalıştır: node v3-app/docs/ortak-menu-qa.mjs (proje kökünden; 8765 açık).
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {stableLocal} from '../verification/set3/http-queue.mjs';

const base = 'http://127.0.0.1:8765/v3-app/ana-v3.html';
const dir = 'v3-app/docs/screenshots/ortak-menu';
fs.mkdirSync(dir, {recursive: true});
const NAV = ['Ana Sayfa', 'Tarifler', 'Ne Pişirsem?', 'Dolapta Ne Var?', 'Püf Noktaları', 'Tabaktan Tarif', 'Mutfak Sırları', 'Görüş Bildir'];
const out = {tarih: new Date().toISOString(), gorunumler: []};

async function openMenu(p, q = '') {
  await p.goto(base + q, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready); await p.waitForFunction(() => window.HOME_V3_READY);
  await p.locator('[data-site-menu]').click(); await p.waitForTimeout(400);
}
const metrics = p => p.evaluate(() => {
  const d = document.querySelector('dialog.om[open]'), r = e => e.getBoundingClientRect();
  const rows = [...d.querySelectorAll('.om-nav>.om-item>.om-row, .om-nav>.om-item>.om-toggle')];
  const lum = c => { const [R, G, B] = c.match(/[\d.]+/g).map(Number).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * R + .7152 * G + .0722 * B; };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return Number(((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2)); };
  const active = d.querySelector('.om-row.is-active');
  return {
    width: Math.round(r(d).width), right: Math.round(innerWidth - r(d).right), overflow: d.querySelector('.om-scroll').scrollWidth > d.querySelector('.om-scroll').clientWidth,
    labels: rows.map(e => e.querySelector('.om-label').textContent.trim()),
    rowHeights: [...new Set(rows.map(e => Math.round(r(e).height)))],
    iconSize: [...new Set(rows.map(e => getComputedStyle(e.querySelector('.om-ic .icon')).fontSize))],
    textSize: [...new Set(rows.map(e => getComputedStyle(e).fontSize))],
    logo: Math.round(r(d.querySelector('.om-logo img')).width), logoSrc: d.querySelector('.om-logo img').getAttribute('src'),
    dividers: [...d.querySelectorAll('.om-nav>.om-item')].filter(e => getComputedStyle(e, '::before').content !== 'none').length, items: d.querySelectorAll('.om-nav>.om-item').length,
    small: [...d.querySelectorAll('a,button')].filter(e => !e.closest('[inert]') && r(e).height > 0 && (r(e).height < 44 || r(e).width < 44)).map(e => e.className + ':' + e.textContent.trim().slice(0, 20)),
    activeContrast: ratio(getComputedStyle(active).color, getComputedStyle(active).backgroundColor), rowContrast: ratio(getComputedStyle(rows[2]).color, 'rgb(255, 255, 255)'),
    open: d.querySelectorAll('.om-nav>.om-group.is-open').length
  };
});

for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  for (const width of [360, 390, 430]) {
    const ctx = await browser.newContext({viewport: {width, height: 844}, deviceScaleFactor: engine === 'chromium' && width === 390 ? 2 : 1});
    const p = await ctx.newPage(); await stableLocal(p);
    const errors = []; p.on('pageerror', e => errors.push(e.message));
    const row = {engine, width};
    const shot = async n => { if (engine === 'chromium') await p.screenshot({path: `${dir}/${n}-${width}.png`}); };

    // Guest
    await openMenu(p);
    const g = await metrics(p);
    assert.deepEqual(g.labels, NAV); assert.deepEqual(g.rowHeights, [48]); assert.deepEqual(g.iconSize, ['18px']); assert.deepEqual(g.textSize, ['15px']);
    assert.equal(g.logo, 64); assert.equal(g.logoSrc, 'assets/marka/dadagastro-renkli.svg'); assert.equal(g.overflow, false); assert.equal(g.right, 0);
    assert.equal(g.dividers, g.items - 1); assert.deepEqual(g.small, []); assert(g.activeContrast >= 4.5 && g.rowContrast >= 4.5);
    assert.equal(await p.locator('dialog.om [data-drawer-auth]').count(), 2);
    row.misafir = g; await shot('misafir');

    // Accordion: one open at a time, sub rows reachable only when open.
    await p.locator('.om-toggle', {hasText: 'Tarifler'}).click(); await p.waitForTimeout(300);
    assert.deepEqual(await p.locator('#om-sub-recipes .om-row').allInnerTexts(), ['Tüm Tarifler', 'Kategoriler', 'Dünya Mutfakları']);
    await shot('tarifler-acik');
    await p.locator('.om-toggle', {hasText: 'Mutfak Sırları'}).click(); await p.waitForTimeout(300);
    assert.equal((await metrics(p)).open, 1);
    assert.deepEqual(await p.locator('#om-sub-secrets .om-row').allInnerTexts(), ['Mutfağa Giriş', 'Mutfak Ansiklopedisi', 'Sözlük', 'Ölçü Birimleri', 'Sofra Düzeni']);
    assert.equal(await p.locator('#om-sub-recipes').getAttribute('inert'), '');
    await shot('mutfak-sirlari-acik');

    // Language: five languages, choice persists (per-viewer convenience).
    await p.locator('.om-lang .om-toggle').click(); await p.waitForTimeout(500);
    assert.deepEqual(await p.locator('[data-om-lang]').allInnerTexts(), ['Türkçe', 'English', 'Español', 'Русский', 'Deutsch']);
    await shot('dil-acik');
    await p.locator('[data-om-lang="de"]').click(); await p.waitForTimeout(300);
    assert.equal(await p.locator('[data-om-lang="de"]').getAttribute('aria-checked'), 'true');
    assert((await p.locator('.om-lang .om-toggle .om-label').innerText()).includes('Deutsch'));
    await p.evaluate(() => localStorage.removeItem('dadagastro-dil'));

    // Close: Escape, then backdrop.
    await p.keyboard.press('Escape'); await p.waitForTimeout(350); assert.equal(await p.locator('dialog.om[open]').count(), 0);
    await p.locator('[data-site-menu]').click(); await p.waitForTimeout(400); await p.mouse.click(8, 400); await p.waitForTimeout(350);
    assert.equal(await p.locator('dialog.om[open]').count(), 0);

    // Page actions: rows open this page's own modules.
    const act = async (label, check) => { await p.locator('[data-site-menu]').click(); await p.waitForTimeout(400); const t = p.locator('.om-toggle', {hasText: 'Tarifler'}); if (['Kategoriler', 'Dünya Mutfakları'].includes(label)) { await t.click(); await p.waitForTimeout(250); } await p.locator('dialog.om .om-row', {hasText: label}).first().click(); await p.waitForTimeout(700); return p.evaluate(check); };
    assert.equal(await act('Dolapta Ne Var?', () => document.querySelector('.v3-finder').dataset.tab), 'pantry');
    assert.equal(await act('Dünya Mutfakları', () => document.querySelector('[data-v3-cat="cuisine"]').getAttribute('aria-selected')), 'true');
    assert.equal(await act('Kategoriler', () => document.querySelector('[data-v3-cat="cat"]').getAttribute('aria-selected')), 'true');
    assert((await act('Ne Pişirsem?', () => document.querySelector('dialog[open]:not(.om) h2')?.textContent || '')).length > 0);
    await p.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));
    assert((await act('Püf Noktaları', () => document.querySelector('dialog[open]:not(.om)')?.textContent || '')).includes('Püf'));
    await p.evaluate(() => document.querySelectorAll('dialog[open]').forEach(d => d.close()));
    await p.locator('[data-site-menu]').click(); await p.waitForTimeout(400);
    assert.equal(await p.locator('dialog.om .om-row', {hasText: 'Tabaktan Tarif'}).getAttribute('href'), 'tabaktan-tarif.html?donus=ana-v3.html');
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    row.eylemler = 'Dolapta Ne Var → kayıtlı dolap; Kategoriler/Dünya Mutfakları → kategori modülü sekmesi; Ne Pişirsem → Tarif bul paneli; Püf Noktaları → püf sheet; Tabaktan Tarif → tabaktan-tarif.html';

    // Member preview (?giris=1).
    await openMenu(p, '?giris=1');
    const m = await metrics(p);
    assert.deepEqual(m.labels, [...NAV.slice(0, 7), 'Hesabım', 'Görüş Bildir']); assert.deepEqual(m.small, []);
    assert.equal(await p.locator('.om-profile .om-who b').innerText(), 'Örnek Üye');
    assert.deepEqual(await p.locator('.om-short').allInnerTexts(), ['Kaydettiklerim', 'Tariflerim', 'Bildirimler']);
    await shot('uye');
    await p.locator('.om-toggle', {hasText: 'Hesabım'}).click(); await p.waitForTimeout(300);
    assert.equal(await p.locator('#om-sub-account .om-row').count(), 10);
    await shot('uye-hesabim-acik');
    row.uye = {etiketler: m.labels, kisayollar: 3, hesap_satirlari: 10};
    assert.deepEqual(errors, []);
    out.gorunumler.push(row);
    await ctx.close();
  }
  await browser.close();
}
fs.writeFileSync('v3-app/docs/ortak-menu-qa.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.gorunumler.map(r => ({e: r.engine, w: r.width, genislik: r.misafir.width, aktif: r.misafir.activeContrast, satir: r.misafir.rowContrast}))));
