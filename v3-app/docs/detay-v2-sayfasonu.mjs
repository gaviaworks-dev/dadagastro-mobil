// Sayfa sonu boşluğu (10 Ekim): en altta son bölümün alt kenarı ile sabit alt çubuğun üst kenarı arası = --space-24.
// 62 tarif × 3 sekme (Chromium 390) + Mercimekli Malzemeler/Yorumlar ve Shami (Chromium + WebKit × 360/390/430, görüntü 390).
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-sayfasonu.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const B='http://127.0.0.1:8765/v3-app/detay-v2.html';const out='v3-app/docs/screenshots/detay-v2/sayfasonu';fs.mkdirSync(out,{recursive:true});
const res={all:[],cases:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m);return ok};
const measure=p=>p.evaluate(()=>{scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});const tail=document.querySelector('.dv2-tail'),last=tail.lastElementChild,dock=document.querySelector('.cook-bar');const lb=last.getBoundingClientRect().bottom,dt=dock.getBoundingClientRect().top;return {gap:Math.round((dt-lb)*10)/10,last:last.className.split(' ')[0],space24:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-24')),atBottom:Math.abs(scrollY+innerHeight-document.documentElement.scrollHeight)<2,docH:document.documentElement.scrollHeight}});
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(B,{waitUntil:'networkidle'});const slugs=await p.evaluate(()=>DATA.recipes.map(r=>r.slug));
 for(const slug of slugs)for(const t of ['malzemeler','hazirlanis','yorumlar']){await p.goto(`${B}?yazar=a&tarif=${slug}&sekme=${t}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(80);const m=await measure(p);await p.waitForTimeout(80);const m2=await measure(p);res.all.push({slug,t,...m2});check(Math.abs(m2.gap-m2.space24)<=1&&m2.atBottom,`${slug} ${t}: boşluk ${m2.gap}`);}
 await b.close();}
const C=[['mercimekli-malzemeler','?yazar=a'],['mercimekli-yorumlar','?yazar=a&sekme=yorumlar'],['shami','?yazar=a&tarif=shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte']];
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){const b=await type.launch();
 for(const width of [360,390,430]){const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});
  for(const [k,q] of C){await p.goto(B+q,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await measure(p);await p.waitForTimeout(400);const m=await measure(p);await p.waitForTimeout(200);res.cases.push({engine,width,k,...m});check(Math.abs(m.gap-m.space24)<=1,`${engine}-${width}-${k}: ${m.gap}`);if(width===390)await p.screenshot({path:`${out}/${engine}-390-${k}.png`});}
  await p.close();}
 await b.close();}
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});const im=f=>`<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:390px;display:block">`;
 const m=k=>res.cases.find(c=>c.engine==='chromium'&&c.width===390&&c.k===k).gap;
 await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 14px system-ui"><div style="display:flex;gap:24px;padding:16px">${C.map(([k])=>`<div><div style="margin-bottom:8px">${k} · son kart → alt çubuk ${m(k)} px</div>${im(`${out}/chromium-390-${k}.png`)}</div>`).join('')}</div></body>`);await p.screenshot({path:`${out}/sayfasonu-yanyana.png`,fullPage:true});await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-sayfasonu.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.slice(0,15).join('\n'):'Tüm kontroller geçti');
console.log('62×3 ölçüm:',res.all.length,'boşluk değerleri',[...new Set(res.all.map(r=>r.gap))].join(', '));for(const c of res.cases)console.log(c.engine,c.width,c.k,c.gap+' px');
