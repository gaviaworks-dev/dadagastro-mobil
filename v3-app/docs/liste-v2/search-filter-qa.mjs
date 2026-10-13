// Arama içi filtre + sonuç satırında sıralama (A/B). Çalıştır (v3-app içinden): node docs/liste-v2/search-filter-qa.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const BASE = 'http://127.0.0.1:8765/v3-app/', OUT = 'docs/screenshots/liste-v2/arama-filtre';
fs.mkdirSync(OUT, {recursive: true});
const before = JSON.parse(fs.readFileSync('docs/liste-v2/search-filter-before.json', 'utf8'));
const out = {generated: new Date().toISOString(), rows: []};
const frames = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

// Arama kutusu ve sonuç satırı ölçümü (tarayıcı içinde).
const probe = () => {
  const r = e => e.getBoundingClientRect(), q = s => document.querySelector(s);
  const box = q('.list-tools .search-box'), input = q('#search'), clear = q('.list-tools .search-clear'), filter = q('#openFilters'), badge = q('#filterBadge');
  const sort = q('.lv2-sort-button'), group = q('.lv2-sort-group'), toggle = q('.lv2-status .view-toggle'), status = q('.lv2-status');
  const st = getComputedStyle(input), ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${st.fontWeight} ${st.fontSize} ${st.fontFamily}`;
  const clearShown = !clear.hidden && r(clear).width > 0;
  const textRight = r(input).right - parseFloat(st.paddingRight);
  const label = q('.lv2-sort-button__label');
  return {
    placeholder: input.placeholder, placeholderFits: ctx.measureText(input.placeholder).width <= input.clientWidth - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight),
    searchH: Math.round(r(box).height), toolsH: Math.round(r(q('.list-tools')).height), statusH: Math.round(r(status).height),
    filter: [Math.round(r(filter).width), Math.round(r(filter).height)], filterRadius: getComputedStyle(filter).borderRadius, filterColor: getComputedStyle(filter).color, filterActive: filter.classList.contains('is-active'),
    filterInsideBox: r(filter).right <= r(box).right && r(filter).left >= r(box).left && r(filter).top >= r(box).top - .5 && r(filter).bottom <= r(box).bottom + .5,
    badge: {text: badge.textContent, shown: getComputedStyle(badge).display !== 'none', bg: getComputedStyle(badge).backgroundColor, color: getComputedStyle(badge).color},
    clear: clearShown ? {size: [Math.round(r(clear).width), Math.round(r(clear).height)], leftOfFilter: r(clear).right <= r(filter).left + .5} : null,
    textClearOfIcons: textRight <= (clearShown ? r(clear).left : r(filter).left) + .5,
    sort: {size: [Math.round(r(sort).width), Math.round(r(sort).height)], label: sort.getAttribute('aria-label'), active: sort.classList.contains('is-active'), color: getComputedStyle(sort).color, text: label?.textContent || null, truncated: label ? label.scrollWidth > label.clientWidth + 1 : false},
    groupH: Math.round(r(group).height), toggleH: Math.round(r(toggle).height), sameHeight: Math.round(r(group).height) === Math.round(r(toggle).height),
    sortLeftOfToggle: r(group).right <= r(toggle).left,
    count: q('#resultCount').textContent, countOneLine: Math.round(r(q('#resultCount')).height) <= Math.ceil(parseFloat(getComputedStyle(q('#resultCount')).lineHeight)) + 1,
    toolbarGone: !q('.lv2-toolbar'), outlineIcons: document.querySelectorAll('.fa-regular').length,
    overflowX: document.documentElement.scrollWidth > innerWidth,
    themesBottom: Math.round(r(q('.lv2-theme-rail')).bottom + scrollY), statusTop: Math.round(r(status).top + scrollY), resultsTop: Math.round(r(q('#results')).top + scrollY)
  };
};

for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const ui of ['a', 'b']) for (const w of [360, 390, 430]) {
    const page = await browser.newPage({viewport: {width: w, height: 844}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${BASE}liste-v2.html?siralama=${ui}`);
    await page.waitForFunction(() => window.LIST_V2_READY); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(900);
    const row = {engine: engineName, ui, w, errors, states: {}};
    const shoot = async name => { await page.evaluate(() => { if (document.activeElement !== document.querySelector('#search')) document.activeElement?.blur(); document.querySelector('.lv2-status').scrollIntoView({block: 'center'}); }); await page.waitForTimeout(350); await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(250); await page.screenshot({path: `${OUT}/${ui}-${name}-${w}-${engineName}.png`}); };
    // 1 · Filtre yok
    row.states.yok = await page.evaluate(probe); await shoot('filtre-yok');
    // Sıralama düğmesi sıralama sheet'ini açar; satır yüksekliği sıralama değişince sabit kalır.
    await page.click('.lv2-sort-button'); await page.waitForTimeout(350);
    row.sortSheetOpens = await page.evaluate(() => !!document.querySelector('.lv2-sort-sheet[open]'));
    await page.click('[data-lv2-sort="en_cok_puanlanan"]'); await page.waitForTimeout(400);
    row.states.siralama = await page.evaluate(probe);
    // 2 · İki filtre (gerçek akış: arama içindeki filtre → sheet → iki seçim → uygula)
    await page.click('#openFilters'); await page.waitForTimeout(400);
    row.filterSheetOpens = await page.evaluate(() => !!document.querySelector('#lv2Filters[open]'));
    await page.evaluate(() => { document.querySelector('#lv2Filters input[value="tatli"]').click(); document.querySelector('#lv2Filters input[value="balik-ve-deniz-urunleri"]').click(); });
    await page.click('[data-filter-apply]'); await page.waitForTimeout(500);
    row.ringAfterSheet = await page.evaluate(() => ({focused: document.activeElement?.id || document.activeElement?.className, outline: getComputedStyle(document.querySelector('.list-tools .search-box')).outlineStyle}));
    row.states.ikiFiltre = await page.evaluate(probe); await shoot('iki-filtre');
    // 3 · Kutuda yazı (filtreler temizlenmiş, sıralama varsayılan)
    await page.evaluate(() => { facetState = {}; sort = 'onerilen'; renderResults(); });
    await page.fill('#search', 'tavuk'); await page.waitForTimeout(600);
    row.states.yazi = await page.evaluate(probe); await shoot('yazi-var');
    // Yapışma: eşik ve yapışık hâl görüntüsü
    await page.fill('#search', ''); await page.waitForTimeout(500);
    let stuckAt = null;
    for (let y = 180; y <= 300; y++) { await page.evaluate(y => scrollTo(0, y), y); if (await page.evaluate(async () => { await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); return document.querySelector('.list-tools').classList.contains('is-stuck'); })) { stuckAt = y; break; } }
    row.stuckAt = stuckAt;
    await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 420); }); await page.waitForTimeout(400);
    row.stuck = await page.evaluate(() => ({toolsTop: Math.round(document.querySelector('.list-tools').getBoundingClientRect().top), radius: getComputedStyle(document.querySelector('.list-tools')).borderTopLeftRadius, header: Math.round(document.querySelector('.topbar').getBoundingClientRect().bottom)}));
    await page.screenshot({path: `${OUT}/${ui}-yapisik-${w}-${engineName}.png`});
    const b = before.find(x => x.engine === engineName && x.w === w);
    const s0 = row.states.yok;
    row.gain = {themesToResultsBefore: b.resultsTop - b.themesBottom, themesToResultsAfter: s0.resultsTop - s0.themesBottom, gained: (b.resultsTop - b.themesBottom) - (s0.resultsTop - s0.themesBottom), stuckBefore: b.stuckAt, stuckAfter: stuckAt, toolsHBefore: b.toolsH, toolsHAfter: s0.toolsH};
    // Zıplama: filtre ve sıralama değişince arama kutusu, panel ve sonuç satırı yüksekliği aynı.
    const S = row.states;
    row.stable = ['searchH', 'toolsH', 'statusH', 'groupH', 'toggleH'].every(k => S.yok[k] === S.siralama[k] && S.yok[k] === S.ikiFiltre[k] && S.yok[k] === S.yazi[k]);
    out.rows.push(row);
    await page.close();
  }
  await browser.close();
}
fs.writeFileSync('docs/liste-v2/search-filter-qa.json', JSON.stringify(out, null, 1));
for (const r of out.rows) {
  const S = r.states;
  console.log([r.engine, r.ui, r.w, 'err', r.errors.length, 'ph', JSON.stringify(S.yok.placeholder), S.yok.placeholderFits, 'filter', S.yok.filter.join('x'), S.yok.filterRadius, 'inBox', S.yok.filterInsideBox,
    'badge0', S.yok.badge.shown, 'badge2', S.ikiFiltre.badge.text + '/' + S.ikiFiltre.badge.shown, 'active', S.ikiFiltre.filterActive, S.ikiFiltre.filterColor,
    'clear', S.yazi.clear && S.yazi.clear.size.join('x') + ' left:' + S.yazi.clear.leftOfFilter, 'textClear', S.yok.textClearOfIcons && S.yazi.textClearOfIcons,
    'sort', S.yok.sort.size.join('x'), JSON.stringify(S.siralama.sort.label), 'act', S.yok.sort.active + '>' + S.siralama.sort.active, 'lbl', S.siralama.sort.text, 'trunc', S.siralama.sort.truncated, 'sameH', S.yok.sameHeight, S.yok.groupH,
    'count1', S.yok.countOneLine && S.siralama.countOneLine, 'stable', r.stable, 'sheets', r.filterSheetOpens && r.sortSheetOpens, 'outline', S.yok.outlineIcons, 'ovf', S.yok.overflowX,
    'gain', r.gain.themesToResultsBefore + '→' + r.gain.themesToResultsAfter + '=' + r.gain.gained, 'stuck', r.gain.stuckBefore + '→' + r.gain.stuckAfter, 'tools', r.gain.toolsHBefore + '→' + r.gain.toolsHAfter, 'ring', r.ringAfterSheet.focused + ':' + r.ringAfterSheet.outline, 'stuckTop', r.stuck.toolsTop + '/' + r.stuck.header + ' r' + r.stuck.radius].join(' '));
}
