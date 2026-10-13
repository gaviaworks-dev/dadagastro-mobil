// docs/46 · Eski iki yayın adresi değişmeden açılıyor mu: canlı dosyalar main'deki (önceki commit) kopyayla aynı, sayfa hatasız.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const BASE = 'https://gaviaworks-dev.github.io/dadagastro-mobil/';
const out = {};
for (const dir of ['yeni-tasarim', 'ana-sayfa-alternatifleri']) {
  const files = ['index.html', 'ana-v3.html', 'ana-v3.js', 'ortak-kart.css'.replace('ortak-kart.css', 'ortak-menu.js')].filter(f => fs.existsSync(`yayin/${dir}/${f}`));
  const same = {};
  for (const f of files) { const live = Buffer.from(await (await fetch(BASE + dir + '/' + f + '?k=' + Date.now())).arrayBuffer()); same[f] = crypto.createHash('sha256').update(live).digest('hex') === crypto.createHash('sha256').update(fs.readFileSync(`yayin/${dir}/${f}`)).digest('hex'); }
  const b = await chromium.launch(), p = await b.newPage({viewport: {width: 1440, height: 1000}}), err = [], bad = [];
  p.on('pageerror', e => err.push(e.message)); p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.goto(BASE + dir + '/', {waitUntil: 'networkidle'});
  out[dir] = {baslik: await p.title(), ayni: same, cerceve: await p.locator('iframe').count(), hata: err, ag: bad};
  await p.screenshot({path: `v3-app/docs/screenshots/yeni-tasarim-v2/canli/eski-${dir}.png`});
  await b.close();
}
fs.writeFileSync('v3-app/verification/yeni-tasarim-v2/eski-yayinlar.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
