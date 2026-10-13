import { chromium, webkit } from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const phase = process.argv[2] || 'before';
const base = process.argv[3] || 'http://127.0.0.1:8765/v3-app/';
const outDir = 'docs/screenshots/v3-six';
fs.mkdirSync(outDir, { recursive: true });
const modes = ['a', 'b', 'c', 'd', 'e', 'f'];
const widths = [360, 390, 430];
const activeModes = (process.argv[4] || 'abcdef').split('').filter(m => modes.includes(m));
const activeWidths = (process.argv[5] || '360,390,430').split(',').map(Number).filter(w => widths.includes(w));
const activeEngines = (process.argv[6] || 'chromium,webkit').split(',').filter(e => ['chromium', 'webkit'].includes(e));
const failures = [];
const reports = [];
const note = (row, test, value) => { row[test] = value; if (value === false || (Array.isArray(value) && value.length)) failures.push({ mode: row.mode, engine: row.engine, width: row.width, test, value }); };

if (phase === 'header-audit') {
  const browser = await chromium.launch(), rows = [];
  for (const mode of modes) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded' });
    await page.locator('.topbar .brand-logo img').waitFor({ state: 'visible', timeout: 6000 });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; });
    const points = [];
    for (let y = 0; y <= 400; y += 20) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(10);
      points.push(await page.evaluate(() => {
        const header = document.querySelector('.topbar').getBoundingClientRect();
        const groups = [...document.querySelectorAll('.six-hero-group')].map(e => { const r = e.getBoundingClientRect(); return { text: e.innerText.trim().slice(0, 48), top: Math.round(r.top), bottom: Math.round(r.bottom), visible: getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none', intersectsHeader: r.top < header.bottom && r.bottom > header.top && getComputedStyle(e).visibility !== 'hidden' }; });
        return { y: scrollY, alpha: Number(document.querySelector('.topbar').dataset.alpha || 0), headerBottom: Math.round(header.bottom), groups };
      }));
    }
    const alphas = points.map(x => x.alpha), overlaps = points.flatMap(p => p.groups.filter(g => g.intersectsHeader).map(g => ({ y: p.y, text: g.text, top: g.top })));
    rows.push({ mode, errors, points, monotonicAlpha: alphas.every((x, i) => i === 0 || x >= alphas[i - 1]), fullAlphaBy60: points.find(x => x.y === 60)?.alpha === 1, noTextOverlap: overlaps.length === 0, overlaps });
    await page.close();
  }
  await browser.close();
  const result = { phase, rows, failures: rows.filter(x => x.errors.length || !x.monotonicAlpha || !x.fullAlphaBy60 || !x.noTextOverlap).map(({ mode, errors, monotonicAlpha, fullAlphaBy60, overlaps }) => ({ mode, errors, monotonicAlpha, fullAlphaBy60, overlaps })) };
  fs.writeFileSync(`${outDir}/sixqa-header-audit.json`, JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2)); process.exit(result.failures.length ? 1 : 0);
}

if (phase === 'crops' || phase === 'polish-crops') {
  const targetDir = phase === 'polish-crops' ? 'docs/screenshots/polish' : outDir;
  fs.mkdirSync(targetDir, { recursive: true });
  const browser = await chromium.launch();
  for (const mode of modes) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, timezoneId: 'Europe/Istanbul' });
    await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(250);
    const upscale = async (source, cropHeight = 0) => page.evaluate(async ({ source, cropHeight }) => {
      const img = new Image(); img.src = `data:image/png;base64,${source}`; await img.decode();
      const height = cropHeight ? Math.min(cropHeight, img.naturalHeight) : img.naturalHeight;
      const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth * 3; canvas.height = height * 3;
      const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, 0, 0, img.naturalWidth, height, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png').split(',')[1];
    }, { source, cropHeight });
    const beforePath = `docs/screenshots/v3-six/before-${mode}-390.png`;
    if (fs.existsSync(beforePath)) {
      const enlarged = await upscale(fs.readFileSync(beforePath).toString('base64'), 390);
      fs.writeFileSync(`${targetDir}/six-home-before-${mode}-hero-3x.png`, Buffer.from(enlarged, 'base64'));
    }
    for (const [key, selector] of [['hero', '.six-hero'], ['categories', '.six-categories'], ['videos', '.six-videos'], ['chefs', '.six-chefs']]) {
      const raw = await page.locator(selector).screenshot({ type: 'png' });
      const enlarged = await upscale(raw.toString('base64'));
      fs.writeFileSync(`${targetDir}/six-home-after-${mode}-${key}-3x.png`, Buffer.from(enlarged, 'base64'));
    }
    await page.close();
  }
  await browser.close();
  console.log(`3x crop evidence written to ${targetDir} for before/after heroes and final shared category, video, chef blocks.`);
  process.exit(0);
}

for (const engineName of activeEngines) {
  const browser = await ({ chromium, webkit })[engineName].launch();
  for (const width of activeWidths) for (const mode of activeModes) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference', timezoneId: 'Europe/Istanbul' });
    const page = await context.newPage(); page.setDefaultTimeout(2500);
    const errors = [], badResponses = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`); });
    const row = { phase, engine: engineName, width, mode, errors, badResponses };
    try {
      await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded', timeout: 12000 });
      await page.locator('.topbar .brand-logo img').waitFor({ state: 'visible', timeout: 6000 });
      await Promise.race([page.evaluate(() => document.fonts.ready), page.waitForTimeout(2500)]);
      const blocks = await page.locator('[data-six-block]').evaluateAll(es => es.map(e => e.dataset.sixBlock));
      note(row, 'blockOrder', blocks.join(',') === 'hero,categories,recipes,fridge,videos,chefs,community');
      note(row, 'horizontalOverflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      note(row, 'headerLogo', await page.locator('.topbar .brand-logo img').getAttribute('src'));
      note(row, 'headerActions', await page.locator('.topbar [aria-label="Bildirimler"]').count() === 1 && await page.locator('.topbar [data-site-menu]').count() === 1);
      note(row, 'tipsLabel', (await page.locator('.bottom-nav [data-six-tips]').innerText()).trim() === 'Püf Noktaları');
      note(row, 'categoryCount', await page.locator('.six-category-rail .six-category').count() > 0);
      note(row, 'videoCount', await page.locator('.six-video-card').count() > 0);
      note(row, 'photoFailures', (await page.locator('.six-video-picture .photo').evaluateAll(es => es.filter(e => getComputedStyle(e).backgroundImage === 'none').length)) === 0);
      row.featuredHeading = await page.locator('.featured-block .block-heading h2').evaluate(e => ({ text: e.innerText, top: Math.round(e.getBoundingClientRect().top), visible: getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none' }));
      if (engineName === 'chromium' && ['final', 'final2'].includes(phase)) {
        await page.screenshot({ path: `${outDir}/sixqa-${phase}-${mode}-${width}-first.png` });
        await page.screenshot({ path: `${outDir}/sixqa-${phase}-${mode}-${width}-full.png`, fullPage: true });
        if (width === 390 && ['c', 'd', 'e', 'f'].includes(mode)) await page.locator('.six-hero').screenshot({ path: `${outDir}/sixqa-${phase}-${mode}-390-hero.png` });
      }
      if (engineName === 'chromium' && width === 390 && ['final', 'final2'].includes(phase)) {
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; });
        for (const y of [0, 60, 120, 300]) {
          await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(60);
          await page.screenshot({ path: `${outDir}/sixqa-${phase}-${mode}-390-scroll-${y}.png` });
          row[`header${y}`] = await page.locator('.topbar').evaluate(e => ({ alpha: e.dataset.alpha, bg: getComputedStyle(e).backgroundColor, logo: e.querySelector('img')?.getAttribute('src'), visibleHeroText: [...e.closest('.app-shell').querySelectorAll('.six-hero-group')].filter(x => getComputedStyle(x).visibility !== 'hidden').length }));
        }
      }
      // Check header color curve and hero text masking at 20px increments.
      let scrollRows = [];
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; });
      for (let y = 0; ['final', 'final2'].includes(phase) && y <= 400; y += 20) {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(10);
        scrollRows.push(await page.locator('.topbar').evaluate(e => ({ y: scrollY, alpha: Number(e.dataset.alpha || 0), logo: e.querySelector('img')?.getAttribute('src'), visibleHeroText: [...document.querySelectorAll('.six-hero-group')].filter(x => getComputedStyle(x).visibility !== 'hidden').length })));
      }
      row.headerCurve = scrollRows;
      // Burger must open the existing side drawer and close cleanly.
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator('.topbar [data-site-menu]').click();
      note(row, 'drawerOpened', await page.locator('dialog').evaluateAll(es => es.some(e => e.open && e.getBoundingClientRect().width > 0)));
      await page.locator('[data-drawer-close]').click();
      await page.waitForFunction(() => !document.querySelector('#siteDrawer')?.open, null, { timeout: 1200 });
      note(row, 'drawerClosed', await page.locator('#siteDrawer[open]').count() === 0);
      // Search input supports fill, clear, and submit to the recipe list.
      const search = page.locator('.six-search').first();
      await search.locator('input').fill('mercimek');
      await page.waitForTimeout(50);
      note(row, 'searchClearVisible', await search.locator('[data-six-clear]').isVisible());
      await search.locator('[data-six-clear]').click();
      note(row, 'searchCleared', await search.locator('input').inputValue() === '');
      await search.locator('input').fill('mercimek'); await search.locator('input').press('Enter');
      await page.waitForTimeout(100);
      note(row, 'searchSubmit', new URL(page.url()).pathname.endsWith('/liste.html') && new URL(page.url()).searchParams.get('q') === 'mercimek');
      await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded', timeout: 12000 }); await page.locator('.topbar .brand-logo img').waitFor({ state: 'visible', timeout: 6000 }); await Promise.race([page.evaluate(() => document.fonts.ready), page.waitForTimeout(2500)]);
      await page.locator('.nav-item.center').click();
      row.centerPanel = await page.locator('.photo-entry-options .action-card-title').allTextContents().catch(() => []);
      note(row, 'centerHasThreeRoutes', ['Ne Pişirsem', 'Dolapta Ne Var', 'Tabaktan Tarif'].every(x => row.centerPanel.some(y => y.trim().startsWith(x))));
      await page.keyboard.press('Escape');
      // Category strip switches to cuisine data; fridge updates selection/results; feature cards share save UI.
      await page.locator('[data-six-category-toggle]').click();
      note(row, 'cuisineRail', (await page.locator('.six-category-rail').getAttribute('aria-label')) === 'Dünya mutfakları');
      await page.locator('.six-fridge [data-widget-ingredient]').first().click();
      note(row, 'fridgeSelection', (await page.locator('#widgetCount').innerText()).includes('1 malzeme'));
      await page.locator('[data-six-fridge-find]').click(); await page.waitForTimeout(80);
      note(row, 'fridgeResultUrl', new URL(page.url()).pathname.endsWith('/liste.html') && new URL(page.url()).searchParams.has('malzeme'));
      await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded', timeout: 12000 }); await page.locator('.topbar .brand-logo img').waitFor({ state: 'visible', timeout: 6000 });
      const save = page.locator('.featured-block .save').first();
      if (await save.count()) { await save.click(); row.savedState = await save.getAttribute('aria-pressed') || await save.innerText(); }
      else row.savedState = false;
      if (await page.locator('#actionSheet[open]').count()) { await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.querySelector('#actionSheet')?.open, null, { timeout: 1200 }).catch(() => {}); }
      // Video is backed by source content and reports unavailable playback honestly.
      await page.locator('.six-video-card').first().click();
      row.videoFeedback = await page.locator('dialog[open]').innerText().catch(() => '');
      note(row, 'videoUnavailableFeedback', /henüz eklenmedi|kaynağı/i.test(row.videoFeedback));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#actionSheet')?.open, null, { timeout: 1200 }).catch(() => {});
      // Member actions must show a guest gate, not pretend to persist remotely.
      await page.locator('[data-six-follow]').first().click();
      row.followGate = await page.locator('dialog[open]').innerText().catch(() => '');
      note(row, 'followGuestGate', /giriş|üye|hesab/i.test(row.followGate));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#actionSheet')?.open, null, { timeout: 1200 }).catch(() => {});
      await page.locator('[data-six-share]').click();
      row.shareGate = await page.locator('dialog[open]').innerText().catch(() => '');
      note(row, 'shareGuestGate', /giriş|üye|hesab/i.test(row.shareGate));
      // Alternative-specific signature movement.
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#actionSheet')?.open, null, { timeout: 1200 }).catch(() => {});
      await page.evaluate(() => { sessionStorage.setItem('dadagastro-member-preview', '1'); window.scrollTo({ top: 0, behavior: 'instant' }); });
      await page.reload({ waitUntil: 'domcontentloaded' }); await page.locator('.topbar .brand-logo img').waitFor({ state: 'visible', timeout: 6000 });
      const memberSave = page.locator('.featured-block .save').first(); await memberSave.click(); await page.waitForTimeout(60);
      row.savedMemberState = { pressed: await memberSave.getAttribute('aria-pressed'), local: await page.evaluate(() => JSON.parse(localStorage.getItem('dadagastro-prototype-saved') || '[]').length > 0) };
      note(row, 'memberSavePersistsLocally', row.savedMemberState.pressed === 'true' && row.savedMemberState.local);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(40);
      if (mode === 'a') {
        const before = await page.locator('[data-six-cinema-link] .six-photo').evaluate(e => getComputedStyle(e).backgroundImage);
        await page.locator('[data-six-ingredient]').first().click();
        note(row, 'aIngredientMovesRecipe', await page.locator('[data-six-cinema-link] .six-photo').evaluate(e => getComputedStyle(e).backgroundImage) !== before);
      }
      if (mode === 'c') note(row, 'cDayDeck', await page.locator('[data-six-day-rail] .six-day-card').count() >= 3);
      if (mode === 'd') { const old = await page.locator('[data-six-discovery-board]').innerText(); await page.locator('[data-six-category]').nth(1).click(); note(row, 'dCategoryChangesBoard', await page.locator('[data-six-discovery-board]').innerText() !== old); }
      if (mode === 'e') { await page.locator('[data-six-story]').first().click(); note(row, 'eStoryOpens', await page.locator('.six-story-reveal').first().isVisible()); }
      if (mode === 'f') { const old = await page.locator('[data-six-result]').innerText(); await page.locator('[data-six-time="15"]').click(); note(row, 'fTimeFilter', await page.locator('[data-six-result]').innerText() !== old); }
      if (mode === 'c' && width === 390) {
        row.cTimeDeckObservations = [];
        for (const [utc, expected] of [['2026-10-07T05:00:00Z', 'Kahvaltı'], ['2026-10-07T10:00:00Z', 'Öğle'], ['2026-10-07T17:00:00Z', 'Akşam']]) {
          await page.clock.install({ time: new Date(utc) }); await page.reload({ waitUntil: 'domcontentloaded' });
          const label = (await page.locator('.six-day-label').first().innerText()).trim();
          const title = (await page.locator('.six-day-card strong').first().innerText()).trim();
          const recipeHref = await page.locator('.six-day-card').first().getAttribute('href');
          const matchedMeal = await page.evaluate(href => { const slug = new URL(href, location.href).searchParams.get('tarif'); const recipe = DATA.recipes.find(r => r.slug === slug); return recipe ? recipeInfo(recipe).facets?.ogun || [] : []; }, recipeHref);
          const normalizeMeal = value => String(value).toLocaleLowerCase('tr-TR').replaceAll('ı', 'i').replaceAll('ş', 's').replaceAll('ğ', 'g').replaceAll('ç', 'c').replaceAll('ö', 'o').replaceAll('ü', 'u');
          row.cTimeDeckObservations.push({ utc, label, title, matchedMeal, pass: normalizeMeal(label).includes(normalizeMeal(expected)) && matchedMeal.some(x => normalizeMeal(x).includes(normalizeMeal(expected))) });
        }
        note(row, 'cTimeDeck', row.cTimeDeckObservations.every(x => x.pass));
      }
      // Detail and camera return links retain the active ana-a..f route.
      const recipeHref = await page.locator('.featured-block .weekly-card a[href*="detay-c.html"]').first().getAttribute('href').catch(() => null);
      if (recipeHref) {
        const detailUrl = new URL(recipeHref, base); detailUrl.searchParams.set('donus', `ana-${mode}.html`);
        await page.goto(detailUrl.toString(), { waitUntil: 'domcontentloaded' });
        const back = await page.locator('[aria-label="Geri dön"]').getAttribute('href');
        note(row, 'detailReturnTarget', back === `ana-${mode}.html`);
        await page.locator('[aria-label="Geri dön"]').click(); await page.waitForURL(`**/ana-${mode}.html`);
      }
      await page.goto(`${base}tabaktan-tarif.html?donus=ana-${mode}.html`, { waitUntil: 'domcontentloaded' });
      const cameraClose = await page.locator('.photo-camera-header [aria-label="Kapat"], .photo-result-header [aria-label="Kapat"]').first().getAttribute('href').catch(() => '');
      note(row, 'cameraReturnHref', cameraClose === `ana-${mode}.html`);
      await page.goto(`${base}ana-${mode}.html`, { waitUntil: 'domcontentloaded' });
      // Reduced-motion mode is separately loaded and must render with transitions disabled/reduced.
      const reduced = await context.newPage(); await reduced.emulateMedia({ reducedMotion: 'reduce' });
      await reduced.goto(`${base}ana-${mode}.html`); row.reducedMotion = await reduced.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches); await reduced.close();
    } catch (e) { row.exception = String(e); failures.push({ mode, engine: engineName, width, test: 'exception', value: String(e) }); }
    row.errors = errors; row.badResponses = badResponses;
    if (errors.length || badResponses.length) failures.push({ mode, engine: engineName, width, test: 'browserErrors', value: { errors, badResponses } });
    reports.push(row); await context.close();
  }
  await browser.close();
}
const result = { phase, tested: reports.length, failures, reports };
fs.writeFileSync(`${outDir}/sixqa-${phase}-report.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
