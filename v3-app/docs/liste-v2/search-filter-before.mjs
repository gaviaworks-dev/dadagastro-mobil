// Önce ölçümü: kaldırılacak Filtrele/Önerilen satırı, sonuçların başlangıcı ve yapışma eşiği.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const rows = [];
for (const [n, e] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await e.launch();
  for (const w of [360, 390, 430]) {
    const p = await b.newPage({viewport: {width: w, height: 844}});
    await p.goto('http://127.0.0.1:8765/v3-app/liste-v2.html'); await p.waitForTimeout(1500);
    const m = await p.evaluate(() => { const r = s => document.querySelector(s)?.getBoundingClientRect(); const bar = r('.lv2-toolbar'), st = r('.lv2-status'), th = r('.lv2-theme-rail'), res = r('#results'); return {toolbarH: bar && Math.round(bar.height), toolbarTop: bar && Math.round(bar.top + scrollY), statusTop: Math.round(st.top + scrollY), themesBottom: Math.round(th.bottom + scrollY), resultsTop: Math.round(res.top + scrollY), docH: document.documentElement.scrollHeight, toolsH: Math.round(document.querySelector('.list-tools').getBoundingClientRect().height), searchH: Math.round(r('.search-box').height)}; });
    let stuckAt = null; for (let y = 180; y <= 300; y++) { await p.evaluate(y => scrollTo(0, y), y); const s = await p.evaluate(async () => { await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); return document.querySelector('.list-tools').classList.contains('is-stuck'); }); if (s) { stuckAt = y; break; } }
    m.stuckAt = stuckAt;
    if (n === 'chromium' && w === 390) { await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.screenshot({path: 'docs/screenshots/liste-v2/arama-filtre/once-390.png'}); }
    rows.push({engine: n, w, ...m}); await p.close();
  }
  await b.close();
}
fs.writeFileSync('docs/liste-v2/search-filter-before.json', JSON.stringify(rows, null, 1));
console.log(rows.map(r => JSON.stringify(r)).join('\n'));
