// docs/48 · Eski yayın adresleri değişmeden açılıyor mu: canlı dosyalar depodaki kopyayla aynı, sayfa hatasız; git'te fark yok.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const BASE = 'https://gaviaworks-dev.github.io/dadagastro-mobil/';
const out = {};
fs.mkdirSync('v3-app/docs/screenshots/yeni-tasarim-v3/canli', {recursive: true});
for (const dir of ['', 'yeni-tasarim', 'ana-sayfa-alternatifleri', 'yeni-tasarim-v2']) {
  const files = ['index.html', 'ana-v3.html', 'ana-v3.js', 'ortak-menu.js', 'ortak-kart.js', 'app.js', 'robots.txt'].filter(f => fs.existsSync(`yayin/${dir ? dir + '/' : ''}${f}`));
  const same = {};
  for (const f of files) { const live = Buffer.from(await (await fetch(BASE + (dir ? dir + '/' : '') + f + '?k=' + Date.now())).arrayBuffer()); same[f] = crypto.createHash('sha256').update(live).digest('hex') === crypto.createHash('sha256').update(fs.readFileSync(`yayin/${dir ? dir + '/' : ''}${f}`)).digest('hex'); }
  const b = await chromium.launch(), p = await b.newPage({viewport: {width: 1440, height: 1000}}), err = [], bad = [];
  p.on('pageerror', e => err.push(e.message)); p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.goto(BASE + dir + (dir ? '/' : ''), {waitUntil: 'networkidle'});
  out[dir || '(kök)'] = {baslik: await p.title(), ayni: same, cerceve: await p.locator('iframe').count(), hata: err, ag: bad};
  await p.screenshot({path: `v3-app/docs/screenshots/yeni-tasarim-v3/canli/eski-${dir || 'kok'}.png`});
  await b.close();
}
fs.writeFileSync('v3-app/verification/yeni-tasarim-v3/eski-yayinlar.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
