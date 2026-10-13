// liste-v2 ↔ detay-v2 kaydırma kanıtı: aynı göreli konumlarda kare kare görüntü, tek görselde yan yana (sol liste, sağ detay),
// header altı 4 px şerit büyütmesi ve baştan sona kaydırma videoları. Chromium, 390×844.
// R1 (10 Ekim): detayda panel yapışması panelin kendisinde (köşe 24→0) ölçülür; sekme çubuğu ayrıca header'a 0 px yapışır
// (tabsGap alanı). Sekme kareleri: docs/detay-v2-tabs.mjs.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-scroll-frames.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import bundle from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright-core/lib/utilsBundle.js';
import fs from 'node:fs';
const {PNG}=bundle;
const dir='v3-app/docs/screenshots/detay-v2/kaydirma';fs.mkdirSync(dir+'/video',{recursive:true});
const base='http://127.0.0.1:8765/v3-app/';
const pages={liste:{url:base+'liste-v2.html',panel:'.lv2-panel',sticky:'.list-tools'},detay:{url:base+'detay-v2.html',panel:'.detail-main',sticky:'.detail-main'},detayHash:{url:base+'detay-v2.html#adimlar',panel:'.detail-main',sticky:'.detail-main'}};
const b=await chromium.launch();
async function openPage(key,video){
 const ctx=await b.newContext({viewport:{width:390,height:844},...(video?{recordVideo:{dir:dir+'/video',size:{width:390,height:844}}}:{})});
 const p=await ctx.newPage();await p.goto(pages[key].url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
 return {ctx,p};
}
const darkUnderHeader=png=>{let n=0;for(let y=68;y<72;y++)for(let x=0;x<390;x++){const i=(y*png.width+x)*4;if(Math.max(png.data[i],png.data[i+1],png.data[i+2])<200)n++;}return n;};
const state=(p,key)=>p.evaluate(([ps,ss])=>{const h=document.querySelector('.topbar'),st=document.querySelector(ss),pn=document.querySelector(ps),hb=h.getBoundingClientRect().bottom,photo=document.querySelector('.list-banner,.detail-hero .photo');return {scrollY:Math.round(scrollY),alpha:Number(h.dataset.alpha),panelTop:Math.round(pn.getBoundingClientRect().top*10)/10,stickyTop:Math.round(st.getBoundingClientRect().top*10)/10,gap:Math.round((st.getBoundingClientRect().top-hb)*10)/10,radius:getComputedStyle(st).borderTopLeftRadius,width:Math.round(st.getBoundingClientRect().width),stuck:st.classList.contains('is-stuck'),photoTop:Math.round(photo.getBoundingClientRect().top),photoTf:getComputedStyle(photo).transform,...(document.querySelector('.dv2-tabs-bar')?{tabsGap:Math.round((document.querySelector('.dv2-tabs-bar').getBoundingClientRect().top-hb)*10)/10,tabsStuck:document.querySelector('.dv2-tabs-bar').classList.contains('is-stuck')}:{})}},[pages[key].panel,pages[key].sticky]);
const results={};
for(const [label,keys] of [['hashsiz',['liste','detay']],['hashli',['liste','detayHash']]]){
 const opened={};for(const k of keys)opened[k]=await openPage(k,false);
 const stick={};for(const k of keys)stick[k]=await opened[k].p.evaluate(([ps])=>Math.ceil(document.querySelector(ps).getBoundingClientRect().top+scrollY-document.querySelector('.topbar').getBoundingClientRect().height),[pages[k].panel]);
 results[label]={loadScroll:{},frames:[]};
 for(const k of keys)results[label].loadScroll[k]=await opened[k].p.evaluate(()=>Math.round(scrollY));
 const stops=[['01-baslangic',()=>0],['02-yapismadan-100-once',s=>s-100],['03-yapisma-1-once',s=>s-1],['04-yapisma-ani',s=>s],['05-yapisma-1-sonra',s=>s+1],['06-yapisma-200-sonra',s=>s+200],['07-yapisma-600-sonra',s=>s+600],['08-uste-donus',()=>0]];
 for(const [name,fn] of stops){
  const shots={},meta={};
  for(const k of keys){const {p}=opened[k];await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),fn(stick[k]));await p.waitForTimeout(450);const buf=await p.screenshot();shots[k]=buf;meta[k]={...(await state(p,k)),darkUnderHeader:darkUnderHeader(PNG.sync.read(buf))};}
  results[label].frames.push({name,...meta});
  // Tek görsel: sol liste, sağ detay
  const [L,R]=keys.map(k=>'data:image/png;base64,'+shots[k].toString('base64'));
  const cp=await b.newPage({viewport:{width:390*2+48,height:844+56}});
  await cp.setContent(`<body style="margin:0;background:#ECECEC;font:13px system-ui"><div style="display:flex;gap:16px;padding:8px 16px"><div><div style="height:24px">liste-v2 · y=${meta[keys[0]].scrollY} · alfa ${meta[keys[0]].alpha} · ${meta[keys[0]].stuck?'yapışık':'serbest'} · r ${meta[keys[0]].radius}</div><img src="${L}" width="390" height="844"></div><div><div style="height:24px">${keys[1]==='detayHash'?'detay-v2#adimlar':'detay-v2'} · y=${meta[keys[1]].scrollY} · alfa ${meta[keys[1]].alpha} · ${meta[keys[1]].stuck?'yapışık':'serbest'} · r ${meta[keys[1]].radius}</div><img src="${R}" width="390" height="844"></div></div></body>`);
  await cp.screenshot({path:`${dir}/yanyana-${label}-${name}.png`});
  // Header altı ilk 4 px, 8× büyütme (iki sayfa üst üste)
  await cp.setContent(`<body style="margin:0;background:#fff"><img src="${L}" style="display:block;width:${390*8}px;height:${844*8}px;margin-top:-${68*8}px;clip-path:inset(${68*8}px 0 ${(844-72)*8}px 0)"></body>`);
  await cp.close();
 }
 for(const k of keys)await opened[k].ctx.close();
}
// Header altı 4px şerit: iki sayfa, yapışma anı ve +1, 8× büyütülmüş tek görsel
{
 const strips=[];
 for(const k of ['liste','detay']){const {ctx,p}=await openPage(k,false);const s=await p.evaluate(([ps])=>Math.ceil(document.querySelector(ps).getBoundingClientRect().top+scrollY-68),[pages[k].panel]);for(const d of [-1,0,1,200]){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),s+d);await p.waitForTimeout(450);strips.push([k,d,(await p.screenshot({clip:{x:0,y:64,width:390,height:12}})).toString('base64')]);}await ctx.close();}
 const cp=await b.newPage({viewport:{width:390*3+40,height:strips.length*(12*3+28)+16}});
 await cp.setContent(`<body style="margin:8px;font:12px system-ui">${strips.map(([k,d,src])=>`<div style="height:22px">${k}-v2 · yapışma ${d>=0?'+':''}${d}px · y 64–76 (header alt kenarı 68) · 3×</div><img src="data:image/png;base64,${src}" style="width:${390*3}px;height:${12*3}px;image-rendering:pixelated;display:block;margin-bottom:6px">`).join('')}</body>`);
 await cp.screenshot({path:`${dir}/header-alti-serit-3x.png`});await cp.close();
}
// Videolar: baştan sona tekerlekle kaydırma ve geri dönüş
for(const k of ['liste','detay']){
 const {ctx,p}=await openPage(k,true);
 for(let i=0;i<40;i++){await p.mouse.wheel(0,40);await p.waitForTimeout(60);}
 await p.waitForTimeout(400);
 for(let i=0;i<40;i++){await p.mouse.wheel(0,-40);await p.waitForTimeout(60);}
 await p.waitForTimeout(500);const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${dir}/video/${k}-v2-kaydirma.webm`);
}
await b.close();
fs.writeFileSync('v3-app/docs/detay-v2-scroll-frames.json',JSON.stringify(results,null,1));
for(const [label,r] of Object.entries(results)){console.log('==',label,'yükleme scrollY',JSON.stringify(r.loadScroll));for(const f of r.frames){const ks=Object.keys(f).filter(x=>x!=='name');console.log(f.name.padEnd(26),ks.map(k=>`${k}: y${f[k].scrollY} a${f[k].alpha} gap${f[k].gap} r${f[k].radius} w${f[k].width} ${f[k].stuck?'S':'-'} koyu${f[k].darkUnderHeader} foto${f[k].photoTop}${f[k].tabsGap!=null?` sekmeGap${f[k].tabsGap}${f[k].tabsStuck?'S':''}`:''}`).join(' | '));}}
