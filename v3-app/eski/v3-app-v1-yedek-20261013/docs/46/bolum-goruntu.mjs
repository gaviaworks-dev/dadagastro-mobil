// 46 · Değişen bölümlerin 390 görüntüleri (inceleme için).
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
const dir='v3-app/docs/screenshots/yeni-tasarim-v2/birlestirme';fs.mkdirSync(dir,{recursive:true});
const B='http://127.0.0.1:8765/v3-app/';const q=process.argv[2]||'';
const b=await chromium.launch();
async function shot(pg,sel,name,prep){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await stableLocal(p);await p.goto(B+pg,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);if(prep)await prep(p);const el=p.locator(sel).first();await el.scrollIntoViewIfNeeded();await p.waitForTimeout(900);await el.screenshot({path:`${dir}/${name}.png`});await p.close();}
await shot('ana-v3.html'+q,'.v3-content>section:nth-child(1)','ana-en-son');
await shot('ana-v3.html'+q,'#video','ana-video');
await shot('ana-v3.html'+q,'.v3-chefs','ana-sefler');
await shot('ana-v3.html'+q,'.v3-cats','ana-kategoriler');
await shot('ana-v3.html'+q,'.v3-dolap','ana-dolap-sonuc',async p=>{await p.click('[data-v3-dolap-pop]');await p.click('[data-v3-dolap-find]');});
await shot('liste-v2.html'+q,'.lv2-panel','liste-panel');
await shot('detay-v2.html'+q,'.dv2-tail','detay-kuyruk');
await shot('detay-v2.html'+q,'#adimlar .section-heading-row','detay-adim-baslik',async p=>{await p.click('[data-dv2-tab=hazirlanis]');});
await shot('detay-v2.html'+q,'#yorumlar','detay-yorum',async p=>{await p.click('[data-dv2-tab=yorumlar]');});
await b.close();console.log('ok');
