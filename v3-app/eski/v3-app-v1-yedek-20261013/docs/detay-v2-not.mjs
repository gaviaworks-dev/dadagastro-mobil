// Bilgi kartı tek tasarım (eski ?not=b) doğrulaması (10 Ekim). Eski ?not=a|b linkleri aynı tasarımı göstermeli; yazar seçenekleri etkilenmez.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-not.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const B='http://127.0.0.1:8765/v3-app/detay-v2.html',MISIR='tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole';
const out='v3-app/docs/screenshots/detay-v2/r3';fs.mkdirSync(out,{recursive:true});const res={runs:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m)};
const look=p=>p.evaluate(()=>[...document.querySelectorAll('.dv2-info-card')].map(c=>{const cs=getComputedStyle(c),be=getComputedStyle(c,'::before'),t=getComputedStyle(c.querySelector('.dv2-card-title'));return {title:c.querySelector('.dv2-card-title').textContent.trim(),bg:cs.backgroundColor,border:cs.borderTopWidth,stripe:be.content!=='none'&&be.backgroundColor,titleUpper:t.textTransform,more:getComputedStyle(c.querySelector('.dv2-card-more')).visibility,yazar:document.body.dataset.dv2Yazar}}));
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){const b=await type.launch();
 for(const width of [360,390,430]){const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  let ref=null;
  for(const q of ['yazar=a','yazar=a&not=a','yazar=a&not=b','not=a','yazar=b&not=a','yazar=c','yazar=d&not=b',`yazar=a&${MISIR}`,`yazar=a&not=a&${MISIR}`]){
   await p.goto(`${B}?${q}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const m=await look(p);res.runs.push({engine,width,q,m});
   const sig=JSON.stringify(m.map(({bg,border,stripe,titleUpper})=>({bg,border,stripe,titleUpper})));if(!q.includes(MISIR)){ref??=sig;check(sig===ref,`${engine}-${width} ${q}: tasarım farklı ${sig}`);}
   check(m.length&&m.every(c=>c.border==='0px'&&c.stripe&&c.titleUpper==='uppercase'),`${engine}-${width} ${q}: b tasarımı değil ${JSON.stringify(m)}`);
   const y=(q.match(/yazar=(\w)/)||[])[1]||'a';check(m[0].yazar===y,`${engine}-${width} ${q}: yazar seçeneği bozuldu`);
   if(width===390&&engine==='chromium'&&(q==='yazar=a'||q===`yazar=a&${MISIR}`)){await p.evaluate(()=>{const s=document.querySelector('.dv2-info');scrollTo({top:s.getBoundingClientRect().top+scrollY-84,behavior:'instant'})});await p.waitForTimeout(300);await p.screenshot({path:`${out}/chromium-390-yazar-a-${q.includes(MISIR)?'misir':'varsayilan'}-serit.png`,clip:{x:0,y:68,width:390,height:320}});
    if(await p.$('.dv2-info-alerjen')){await p.evaluate(()=>{const c=document.querySelector('.dv2-info-alerjen'),r=c.parentElement;r.scrollLeft=c.offsetLeft-parseFloat(getComputedStyle(r).paddingLeft)});await p.waitForTimeout(300);await p.screenshot({path:`${out}/chromium-390-yazar-a-varsayilan-serit-alerjen.png`,clip:{x:0,y:68,width:390,height:320}});}}
  }
  check(!errors.length,`${engine}-${width}: konsol ${errors}`);await p.close();}
 await b.close();}
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:400}});const img=f=>`<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:390px;display:block;margin-bottom:8px">`;
 await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 14px system-ui"><div style="display:flex;gap:24px;padding:16px"><div><div style="margin-bottom:8px">Varsayılan: Mercimekli Yaprak Sarma · ?yazar=a (Hatırlatma → Alerjen)</div>${img(`${out}/chromium-390-yazar-a-varsayilan-serit.png`)}${img(`${out}/chromium-390-yazar-a-varsayilan-serit-alerjen.png`)}</div><div><div style="margin-bottom:8px">Mısır Koçanı Jölesi · ?yazar=a (tek kart)</div>${img(`${out}/chromium-390-yazar-a-misir-serit.png`)}</div></div></body>`);
 await p.screenshot({path:`${out}/bilgi-karti-tek-tasarim.png`,fullPage:true});await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-not.json',JSON.stringify(res,null,1));console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');
