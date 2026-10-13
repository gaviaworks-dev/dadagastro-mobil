// Varsayılan tarif (Mercimekli Yaprak Sarma; önce Shami Kebap) + ?v= önbellek kırıcı doğrulaması (10 Ekim). Chromium + WebKit × 360/390/430.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-varsayilan.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const B='http://127.0.0.1:8765/v3-app/',DEF='mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli',SHAMI='shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte',CURRY='tavuk-curry-hindistan-cevizli-hint-usulu';
const out='v3-app/docs/screenshots/detay-v2/varsayilan';fs.mkdirSync(out,{recursive:true});
const res={runs:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m);return ok;};
const state=p=>p.evaluate(()=>({def:window.DV2_DEFAULT_RECIPE,expSwaps:(recipeInfo(recipe).ingredients||[]).filter(i=>!i.group&&i.substitutes?.length).length,firstAlt:((recipeInfo(recipe).ingredients||[]).find(i=>!i.group&&i.substitutes?.length)?.substitutes[0]||'').split(' — ')[0],slug:recipe.slug,title:document.title,swaps:document.querySelectorAll('.ingredient-row [data-swap]').length,allergen:!!document.querySelector('.dv2-info-alerjen'),cards:[...document.querySelectorAll('.dv2-info-card .dv2-card-title')].map(e=>e.textContent.trim()),nutrition:!!document.querySelector('.dv2-nutrition'),yazar:document.body.dataset.dv2Yazar,not:document.body.dataset.dv2Not,url:location.pathname+location.search,assets:[...document.querySelectorAll('link[rel=stylesheet][href],script[src]')].map(e=>e.getAttribute('href')||e.getAttribute('src')).filter(u=>!/^https?:/.test(u))}));
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch();
 for(const width of [360,390,430]){
  const ctx=await b.newContext({viewport:{width,height:844},deviceScaleFactor:2});const p=await ctx.newPage();
  const errors=[];p.on('pageerror',e=>errors.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  for(const [label,q] of [['parametresiz',''],['a','?yazar=a&not=a'],['b','?yazar=b&not=b']]){
   const tag=`${engine}-${width}-${label}`;
   await p.goto(B+'detay-v2.html'+q,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(300);
   const s=await state(p);res.runs.push({engine,width,label,...s});
   check(s.def===DEF&&s.slug===DEF&&s.swaps===s.expSwaps&&s.swaps>0&&s.allergen&&s.cards.join()==='Hatırlatma,Alerjen'&&s.nutrition,`${tag}: varsayılan ${JSON.stringify({...s,assets:undefined})}`);
   check(s.url==='/v3-app/detay-v2.html'+q,`${tag}: adres değişti ${s.url}`);
   check(s.assets.every(u=>/\?v=[0-9a-f]{10}$/.test(u)),`${tag}: ?v= eksik ${s.assets.filter(u=>!/\?v=/.test(u))}`);
   // Alternatif sheet'i
   await p.evaluate(()=>{const s=document.querySelector('.ingredient-row [data-swap]');scrollTo({top:s.getBoundingClientRect().top+scrollY-360,behavior:'instant'})});await p.waitForTimeout(250);
   const btn=await p.evaluate(()=>{const r=document.querySelector('.ingredient-row [data-swap]').getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height)}});check(btn.w>=44&&btn.h>=44,`${tag}: shuffle hedefi ${JSON.stringify(btn)}`);
   await p.locator('.ingredient-row [data-swap]').first().click();await p.waitForTimeout(450);
   const sh=await p.evaluate(()=>{const d=document.querySelector('dialog[open]');return d&&{title:d.querySelector('h2')?.textContent.trim(),base:d.querySelector('.dv2-alt-base p')?.textContent.replace(/\s+/g,' ').trim(),alt:d.querySelector('.dv2-alt-name')?.textContent.trim()}});
   check(sh?.title==='Yerine ne kullanabilirim?'&&sh.alt===s.firstAlt,`${tag}: sheet ${JSON.stringify(sh)} ≠ ${s.firstAlt}`);
   if(width===390&&label!=='parametresiz')await p.screenshot({path:`${out}/${engine}-390-${label}-alternatif-acik.png`});
   await p.keyboard.press('Escape');await p.waitForTimeout(300);
  }
  // ?tarif= ile Shami Kebap açılır kalır
  await p.goto(B+'detay-v2.html?tarif='+SHAMI,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const sh2=await state(p);check(sh2.slug===SHAMI&&sh2.swaps===5&&sh2.allergen,`${engine}-${width}: ?tarif=shami ${JSON.stringify({...sh2,assets:undefined})}`);
  // ?tarif= ile Curry açılır kalır
  await p.goto(B+'detay-v2.html?tarif='+CURRY,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const c=await state(p);check(c.slug===CURRY&&c.swaps===0&&!c.allergen,`${engine}-${width}: ?tarif=curry ${JSON.stringify(c)}`);
  if(errors.length)check(false,`${engine}-${width}: konsol/ağ ${errors}`);
  await ctx.close();
 }
 // Galeri: detay-v2 iframe'i referansla aynı tarifi (Curry) gösterir
 {const p=await b.newPage({viewport:{width:1280,height:1000}});await p.goto(B+'detay-sayfa-v2.html',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  const frames=p.frames().filter(f=>/detay-(v2|1)\.html/.test(f.url()));const slugs={};for(const f of frames){try{slugs[f.url().includes('detay-v2')?'v2':'d1']=await f.evaluate(()=>typeof recipe!=='undefined'&&recipe?recipe.slug:null);}catch{}}
  res.gallery=slugs;check(slugs.v2===CURRY&&slugs.d1===CURRY,`${engine}: galeri ${JSON.stringify(slugs)}`);if(engine==='chromium')await p.screenshot({path:`${out}/galeri.png`});await p.close();}
 // Liste/ana sayfadan gelen ?tarif= bağlantıları: liste-v2 ve ana-v3 şu an detay-c.html'e bağlanıyor (bizim dosyamız değil);
 // aynı sorgu (?tarif=…&donus=…) detay-v2.html'de doğru tarifi açmalı (varsayılan tarif sorguyu ezmemeli).
 {const p=await b.newPage({viewport:{width:390,height:844}});const links=[];
  for(const src of ['liste-v2.html','ana-v3.html']){await p.goto(B+src,{waitUntil:'networkidle'});await p.waitForTimeout(600);links.push(...(await p.evaluate(()=>[...new Set([...document.querySelectorAll('a[href*="tarif="]')].map(a=>a.getAttribute('href')))].slice(0,3))).map(h=>[src,h]));}
  res.listLinks=links;check(links.length>0,`${engine}: liste/ana sayfada tarif bağlantısı yok`);
  for(const [src,h] of links){const query=h.slice(h.indexOf('?'));await p.goto(B+'detay-v2.html'+query,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);const slug=await p.evaluate(()=>recipe.slug);check(query.includes('tarif='+slug),`${engine}: ${src} bağlantısı ${query} → ${slug}`);}
  await p.close();}
 await b.close();
}
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:400}});const img=f=>`<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:390px;display:block">`;
 await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 15px system-ui"><div style="display:flex;gap:24px;padding:16px"><figure style="margin:0"><figcaption style="margin-bottom:8px">?yazar=a&amp;not=a · alternatif sheet'i</figcaption>${img(`${out}/chromium-390-a-alternatif-acik.png`)}</figure><figure style="margin:0"><figcaption style="margin-bottom:8px">?yazar=b&amp;not=b · alternatif sheet'i</figcaption>${img(`${out}/chromium-390-b-alternatif-acik.png`)}</figure></div></body>`);
 await p.screenshot({path:`${out}/a-b-alternatif-yanyana.png`,fullPage:true});await b.close();}
// Yeni varsayılan ve Mısır (390, Chromium): besin bölümü, bilgi şeridi (Alerjen kartı dahil), alternatif sheet'i — tek görselde.
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});const cols=[];
 const top=sel=>p.evaluate(sel=>{const s=document.querySelector(sel);const h=document.querySelector('.detail-header').getBoundingClientRect().height;const below=s.getBoundingClientRect().top+scrollY>document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top+scrollY;scrollTo({top:s.getBoundingClientRect().top+scrollY-h-(below?document.querySelector('.dv2-tabs-bar').offsetHeight:0)-16,behavior:'instant'})},sel).then(()=>p.waitForTimeout(300));
 for(const [k,q] of [['varsayilan',''],['misir','?tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole']]){
  await p.goto(B+'detay-v2.html'+(q||'?')+'&yazar=a',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(400);const title=await p.evaluate(()=>recipe.title.split('|')[0].trim());
  const shots={};await top('.dv2-info');shots.serit=await p.locator('.dv2-info').screenshot({path:`${out}/${k}-serit.png`});
  if(await p.$('.dv2-info-alerjen')){await p.evaluate(()=>{const c=document.querySelector('.dv2-info-alerjen'),r=c.parentElement;r.scrollLeft=c.offsetLeft-parseFloat(getComputedStyle(r).paddingLeft)});await p.waitForTimeout(300);shots.alerjen=await p.locator('.dv2-info').screenshot({path:`${out}/${k}-serit-alerjen.png`});}
  await top('.dv2-nutrition');shots.besin=await p.locator('.dv2-nutrition').screenshot({path:`${out}/${k}-besin.png`});
  await p.evaluate(()=>{const s=document.querySelector('.ingredient-row [data-swap]');scrollTo({top:s.getBoundingClientRect().top+scrollY-360,behavior:'instant'})});await p.waitForTimeout(250);await p.locator('.ingredient-row [data-swap]').first().click();await p.waitForTimeout(500);shots.sheet=await p.screenshot({path:`${out}/${k}-alternatif-sheet.png`});await p.keyboard.press('Escape');await p.waitForTimeout(300);
  cols.push([title,shots]);}
 const c=await b.newPage({viewport:{width:900,height:600}});const im=buf=>buf?`<img src="data:image/png;base64,${buf.toString('base64')}" style="width:390px;display:block;margin-bottom:8px">`:'';
 await c.setContent(`<body style="margin:0;background:#ECECEC;font:600 14px system-ui"><div style="display:flex;gap:24px;padding:16px;align-items:flex-start">${cols.map(([t,s])=>`<div><div style="margin-bottom:8px">${t}</div>${im(s.serit)}${im(s.alerjen)}${im(s.besin)}${im(s.sheet)}</div>`).join('')}</div></body>`);
 await c.screenshot({path:`${out}/varsayilan-misir-yanyana.png`,fullPage:true});await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-varsayilan.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');console.log('galeri',JSON.stringify(res.gallery),'liste',JSON.stringify(res.listLinks));
