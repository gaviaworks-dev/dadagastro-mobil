// Benzer Tarifler doğrulaması (10 Ekim). Bütün yerel tarifler: bölüm görünür, ≥4 kart, kart görselleri yüklenir (naturalWidth > 0),
// kartlar yerel tarife ve detay-v2.html?tarif=… adresine gider, parametreler (yazar, radius, rozet…) korunur. Slider: 360/390/430
// Chromium + WebKit; tam 2 kart, yarım kart 0, sayfa sayfa snap, gösterge. Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-benzer.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const B='http://127.0.0.1:8765/v3-app/detay-v2.html';const out='v3-app/docs/screenshots/detay-v2/benzer';fs.mkdirSync(out,{recursive:true});
const R={varsayilan:'mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli',shami:'shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte',misir:'misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole'};
const live=JSON.parse(fs.readFileSync('v3-app/docs/detay-v2-benzer.json','utf8')).map;
const res={all:[],slider:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m);return ok};
const state=p=>p.evaluate(async()=>{const s=document.querySelector('.dv2-similar');if(!s)return {section:false};const cards=[...s.querySelectorAll('.dv2-pairs .recipe-card')];
 const loads=await Promise.all(cards.map(c=>new Promise(res=>{const src=c.querySelector('[data-photo-src]')?.dataset.photoSrc;const im=new Image();im.onload=()=>res(im.naturalWidth);im.onerror=()=>res(0);im.src=src;})));
 const tail=[...document.querySelector('.dv2-tail').children].map(e=>e.className.split(' ')[0]);
 return {section:true,eyebrow:s.querySelector('.dv2-sim-eyebrow').textContent,title:s.querySelector('h2').textContent,more:s.querySelector('.dv2-see-all').textContent.trim(),cards:cards.length,slugs:cards.map(c=>new URLSearchParams(c.querySelector('.card-copy').getAttribute('href').split('?')[1]).get('tarif')),hrefs:cards.map(c=>c.querySelector('.card-copy').getAttribute('href')),local:cards.every(c=>DATA.recipes.some(r=>r.slug===new URLSearchParams(c.querySelector('.card-copy').getAttribute('href').split('?')[1]).get('tarif'))),authors:cards.map(c=>c.querySelector('.dv2-author-name')?.textContent.replace('Tarifi ekleyen: ','')),loads,component:{similar:document.querySelectorAll('.dv2-similar').length,head:!!s.querySelector('.dv2-sim-head .dv2-sim-eyebrow')&&!!s.querySelector('.dv2-sim-head h2')&&!!s.querySelector('.dv2-sim-head .dv2-see-all'),track:!!s.querySelector('.dv2-pairs>.dv2-pairs-track'),old:document.querySelectorAll('.similar-section,.dv2-rail,.dv2-heading>#dv2-similar-title').length,pager:s.querySelectorAll('.dv2-pager,.dv2-pager-dots,.v3-pager,.dg-slider__pager,[class*=pager]').length,tamamini:[...s.querySelectorAll('a')].some(x=>/Tamamını Gör/.test(x.textContent))},avatars:cards.map(c=>{const a=c.querySelector('.dg-avatar'),n=c.querySelector('.dv2-author-name')?.textContent.replace('Tarifi ekleyen: ','').trim()||'';const cs=getComputedStyle(a);return {t:a.textContent,ok:a.textContent===n.slice(0,1).toLocaleUpperCase('tr'),ff:cs.fontFamily.split(',')[0].replace(/"/g,''),fs:cs.fontSize}}),last:tail.at(-1)==='dv2-similar'};});
// 1) Bütün yerel tarifler (Chromium 390)
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(B,{waitUntil:'networkidle'});const slugs=await p.evaluate(()=>DATA.recipes.map(r=>r.slug));
 for(const slug of slugs){await p.goto(`${B}?tarif=${slug}&yazar=b&radius=b&rozet=b&sekme=hazirlanis`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);
  const m=await state(p);const title=await p.evaluate(()=>recipe.title.split('|')[0].trim());res.all.push({slug,title,...m});
  if(m.section){check(m.component.similar===1&&m.component.head&&m.component.track&&!m.component.old&&!m.component.pager&&!m.component.tamamini,`${slug}: bileşen ${JSON.stringify(m.component)}`);check(m.avatars.every(x=>x.ok&&x.ff==='GilroyBd'&&x.fs==='13px'),`${slug}: avatar ${JSON.stringify(m.avatars)}`);}
  check(m.section&&m.cards>=4&&m.local&&m.loads.every(n=>n>0)&&m.last,`${slug}: ${JSON.stringify({section:m.section,cards:m.cards,local:m.local,loads:m.loads,last:m.last})}`);
  if(m.section){check(m.hrefs.every(h=>/^detay-v2\.html\?/.test(h)&&/yazar=b/.test(h)&&/radius=b/.test(h)&&/rozet=b/.test(h)&&!/sekme=/.test(h)),`${slug}: parametreler ${m.hrefs[0]}`);
   if(live[slug])check(JSON.stringify(m.slugs)===JSON.stringify(live[slug].filter(s=>s!==slug).slice(0,8)),`${slug}: canlı liste farklı ${m.slugs} ≠ ${live[slug]}`);
   check(m.eyebrow==='Benzer Tarifler'&&m.title==='Bunları da seveceksin'&&/^Tümü/.test(m.more),`${slug}: başlık`);}
 }
 // Sekme bağımsızlığı
 for(const t of ['malzemeler','hazirlanis','yorumlar']){await p.goto(`${B}?sekme=${t}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const m=await state(p);check(m.section&&m.last&&m.cards>=4,`sekme ${t}: bölüm yok`);}
 // Kart tıklaması doğru tarifi açar, parametreler korunur
 await p.goto(`${B}?yazar=c&radius=b`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const first=await p.evaluate(()=>{const a=document.querySelector('.dv2-pairs .card-copy');a.scrollIntoView();return a.getAttribute('href')});await p.click('.dv2-pairs .card-copy');await p.waitForFunction(()=>window.DV2_READY===true);const after=await p.evaluate(()=>({slug:recipe.slug,search:location.search,yazar:document.body.dataset.dv2Yazar,radius:document.documentElement.dataset.dgRadius}));res.click={first,after};check(first.includes('tarif='+after.slug)&&after.yazar==='c'&&after.radius==='b',`tıklama ${JSON.stringify(res.click)}`);
 check(!errors.length,`konsol ${errors}`);await b.close();}
// 2) Slider davranışı + görüntüler
const vis=p=>p.evaluate(()=>{const t=document.querySelector('.dv2-pairs-track'),tr=t.getBoundingClientRect();const cs=[...t.children];return {full:cs.filter(c=>{const r=c.getBoundingClientRect();return r.left>=tr.left-1&&r.right<=tr.right+1}).length,partial:cs.filter(c=>{const r=c.getBoundingClientRect();return r.right>tr.left+1&&r.left<tr.right-1&&!(r.left>=tr.left-1&&r.right<=tr.right+1)}).length,dots:document.querySelectorAll('.dv2-similar [class*=pager]').length,snap:getComputedStyle(t).scrollSnapType}});
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){const b=await type.launch();
 for(const width of [360,390,430]){const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  for(const [k,slug] of Object.entries(R)){await p.goto(`${B}?yazar=a&tarif=${slug}${k==='shami'?'&sekme=hazirlanis':''}${k==='misir'?'&donus=liste-v2.html':''}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);
   await p.evaluate(()=>{const s=document.querySelector('.dv2-similar');scrollTo({top:s.getBoundingClientRect().top+scrollY-180,behavior:'instant'})});await p.waitForTimeout(900);
   const a=await vis(p);if(width===390)await p.screenshot({path:`${out}/${engine}-390-${k}.png`});
   await p.evaluate(()=>{const t=document.querySelector('.dv2-pairs-track');t.scrollTo({left:t.clientWidth+12,behavior:'instant'})});await p.waitForTimeout(500);const b2=await vis(p);
   if(width===390)await p.screenshot({path:`${out}/${engine}-390-${k}-sayfa2.png`});
   // Yarım sayfa kaydırma bırakılınca snap bir sayfaya oturur
   await p.evaluate(()=>{const t=document.querySelector('.dv2-pairs-track');t.scrollTo({left:t.clientWidth*0.3,behavior:'instant'})});await p.waitForTimeout(700);const c3=await vis(p);
   res.slider.push({engine,width,k,a,b2,c3});
   check(a.full===2&&a.partial===0&&a.dots===0&&/x/.test(a.snap)&&b2.full===2&&b2.partial===0&&c3.partial===0,`${engine}-${width}-${k}: slider ${JSON.stringify({a,b2,c3})}`);}
  check(!errors.length,`${engine}-${width}: konsol/ağ ${errors.slice(0,2)}`);await p.close();}
 await b.close();}
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});const im=f=>`<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:390px;display:block">`;
 await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 14px system-ui"><div style="display:flex;gap:24px;padding:16px">${[['varsayilan','Mercimekli Yaprak Sarma'],['shami','Shami Kebap · sekme=hazirlanis'],['misir','Mısır Koçanı Jölesi · donus=liste-v2.html']].map(([k,l])=>`<div><div style="margin-bottom:8px">${l}</div>${im(`${out}/chromium-390-${k}.png`)}</div>`).join('')}</div></body>`);await p.screenshot({path:`${out}/benzer-yanyana.png`,fullPage:true});await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-benzer-dogrula.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.slice(0,20).join('\n'):'Tüm kontroller geçti');
console.log('yerel tarif',res.all.length,'bölümlü',res.all.filter(r=>r.section).length,'≥4 kart',res.all.filter(r=>r.cards>=4).length);
