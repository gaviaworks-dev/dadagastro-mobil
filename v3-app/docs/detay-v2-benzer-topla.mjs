// Canlı "Benzer Tarifler / Bunları da seveceksin" (.simrec) listesi — detay-v2'nin bütün yerel tarifleri (salt okuma).
// Çıktı: docs/detay-v2-benzer.json {slug: [benzerSlug…]} + yerelde olmayan slug listesi. Çalıştırma: node v3-app/docs/detay-v2-benzer-topla.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://127.0.0.1:8765/v3-app/detay-v2.html',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);
const local=await p.evaluate(()=>DATA.recipes.map(r=>r.slug));const map={},head={};
for(const slug of local){await p.goto('https://dadagastro.com/tarif/'+slug,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForSelector('.simrec',{timeout:15000}).catch(()=>{});
 const r=await p.evaluate(()=>{const s=document.querySelector('.simrec');if(!s)return null;const T=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();const urls=[...new Set([...s.querySelectorAll('a[href*="/tarif/"]')].map(a=>new URL(a.href).pathname.split('/tarif/')[1]).filter(Boolean))];const all=[...s.querySelectorAll('a')].map(a=>({t:T(a),h:a.getAttribute('href')})).filter(a=>!a.h?.includes('/tarif/'));return {urls,eyebrow:T(s.querySelector('.eyebrow,.sec-eyebrow,small,.kicker')),title:T(s.querySelector('h2,h3')),more:all.slice(0,3)};});
 map[slug]=r?.urls||[];if(!Object.keys(head).length&&r)Object.assign(head,{eyebrow:r.eyebrow,title:r.title,more:r.more});process.stdout.write(`${map[slug].length} ${slug.slice(0,48)}\n`);}
await b.close();
const missing=[...new Set(Object.values(map).flat())].filter(s=>!local.includes(s));
fs.writeFileSync('v3-app/docs/detay-v2-benzer.json',JSON.stringify({captured:new Date().toISOString().slice(0,10),head,map,missing},null,1));
console.log('başlık',JSON.stringify(head),'\nyerelde olmayan',missing.length,'\n'+missing.join('\n'));
