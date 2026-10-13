// liste-v2 ve detay-v2: aynı kaydırma konumları (0, panel header'a 40px kala, tam yapışma, +200), 390, Chromium + WebKit.
// Header altındaki ilk 4px satır ve panel üst köşeleri piksel düzeyinde taranır (beyaz dışı piksel = sızıntı).
// R1 (10 Ekim): detayda sekme çubuğu artık panelin ilk çocuğu değil. Panel yapışması (header'a değme anı, köşe 24→0,
// header altı sızıntı) panelin kendisinde ölçülür; sekme çubuğunun header'a 0 px yapışması ayrı aşamalarda ölçülür.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-scroll-compare.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import bundle from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright-core/lib/utilsBundle.js';
import fs from 'node:fs';
const {PNG}=bundle;const dir='v3-app/docs/screenshots/detay-v2/kaydirma';fs.mkdirSync(dir,{recursive:true});
const pages=[['liste-v2','http://127.0.0.1:8765/v3-app/liste-v2.html','.lv2-panel','.list-tools'],['detay-v2','http://127.0.0.1:8765/v3-app/detay-v2.html','.detail-main','.detail-main']];
const rows=[];
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch();
 for(const [name,url,panelSel,stickSel] of pages){
  const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  await p.goto(url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
  const g=await p.evaluate(s=>({panel:document.querySelector(s).getBoundingClientRect().top+scrollY,header:document.querySelector('.topbar').getBoundingClientRect().height}),panelSel);
  const stops={'0':0,'40-kala':Math.round(g.panel-g.header-40),'yapisma':Math.ceil(g.panel-g.header),'yapisma+200':Math.ceil(g.panel-g.header)+200};
  // Detay: sekme çubuğunun normal akıştaki yeri (sentinel .dv2-tabs-anchor) — kala 40, yapışma, +200, +600.
  if(name==='detay-v2'){const a=await p.evaluate(()=>Math.ceil(document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top+scrollY-document.querySelector('.topbar').getBoundingClientRect().height));Object.assign(stops,{'sekme-40-kala':a-40,'sekme-yapisma':a,'sekme+200':a+200,'sekme+600':a+600});}
  for(const [stage,y] of Object.entries(stops)){
   await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(450);
   const m=await p.evaluate(([ps,ss])=>{const h=document.querySelector('.topbar'),hb=h.getBoundingClientRect().bottom,pn=document.querySelector(ps),st=document.querySelector(ss);return {headerBottom:hb,alpha:Number(h.dataset.alpha),panelTop:pn.getBoundingClientRect().top,stickyTop:st.getBoundingClientRect().top,stickyLeft:st.getBoundingClientRect().left,stickyWidth:st.getBoundingClientRect().width,radius:getComputedStyle(st).borderTopLeftRadius,stuck:st.classList.contains('is-stuck'),compact:h.classList.contains('is-compact'),title:getComputedStyle(h.querySelector('.compact-title')||h).visibility,...(document.querySelector('.dv2-tabs-bar')?{tabsTop:document.querySelector('.dv2-tabs-bar').getBoundingClientRect().top,tabsGap:document.querySelector('.dv2-tabs-bar').getBoundingClientRect().top-hb,tabsStuck:document.querySelector('.dv2-tabs-bar').classList.contains('is-stuck')}:{})}},[panelSel,stickSel]);
   const shot=await p.screenshot();await p.screenshot({path:`${dir}/${engine}-${name}-${stage}.png`});
   // Header altı 4px şerit, 8x büyütülmüş kanıt görüntüsü
   await p.screenshot({path:`${dir}/${engine}-${name}-${stage}-header-alti-4px.png`,clip:{x:0,y:Math.round(m.headerBottom),width:390,height:4},scale:'device'});
   const png=PNG.sync.read(shot);let leak=0,leakCorner=0,dark=0;const y0=Math.round(m.headerBottom);
   for(let y=y0;y<y0+4;y++)for(let x=0;x<390;x++){const i=(y*png.width+x)*4;const [r,gg,bb]=[png.data[i],png.data[i+1],png.data[i+2]];const nonWhite=r<245||gg<245||bb<245;if(nonWhite){leak++;if(x<24||x>=366)leakCorner++;}if(Math.max(r,gg,bb)<200)dark++;}
   rows.push({engine,page:name,stage,y,...Object.fromEntries(Object.entries(m).map(([k,v])=>[k,typeof v==='number'?Math.round(v*10)/10:v])),nonWhiteUnderHeader:leak,nonWhiteCorners:leakCorner,darkUnderHeader:dark});
  }
  // Yapışma çevresi: -6..+6px, her adımda header altı koyu piksel sayısı + 3x büyütülmüş kırpım
  const base=Math.ceil(g.panel-g.header);
  for(let d=-6;d<=6;d+=1){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),base+d);await p.waitForTimeout(260);const hb=await p.evaluate(()=>document.querySelector('.topbar').getBoundingClientRect().bottom);const png=PNG.sync.read(await p.screenshot());let dark=0;for(let y=Math.round(hb);y<Math.round(hb)+4;y++)for(let x=0;x<390;x++){const i=(y*png.width+x)*4;if(Math.max(png.data[i],png.data[i+1],png.data[i+2])<200)dark++;}rows.push({engine,page:name,stage:'sweep'+(d>=0?'+':'')+d,y:base+d,darkUnderHeader:dark});}
  await p.close();
 }
 await b.close();
}
fs.writeFileSync('v3-app/docs/detay-v2-scroll-compare.json',JSON.stringify(rows,null,1));
console.table(rows.filter(r=>!String(r.stage).startsWith('sweep')).map(r=>({e:r.engine.slice(0,2),page:r.page,stage:r.stage,alpha:r.alpha,panelTop:r.panelTop,hb:r.headerBottom,stickyTop:r.stickyTop,w:r.stickyWidth,radius:r.radius,stuck:r.stuck,tabsGap:r.tabsGap,tabsStuck:r.tabsStuck,dark:r.darkUnderHeader,corner:r.nonWhiteCorners})));

console.table(rows.filter(r=>String(r.stage).startsWith('sweep')).map(r=>({e:r.engine.slice(0,2),page:r.page,stage:r.stage,dark:r.darkUnderHeader})));
