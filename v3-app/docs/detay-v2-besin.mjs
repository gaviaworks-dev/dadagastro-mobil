// Besin Değerleri bölümü ölçümü ve görüntüleri. Kullanım (proje kökünden): node v3-app/docs/detay-v2-besin.mjs <etiket: once|sonra>
// Chromium + WebKit × 360/390/430; Shami Kebap ve Mısır Koçanı Jölesi. Çıktı: docs/detay-v2-besin-<etiket>.json + screenshots/detay-v2/besin/.
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const label=process.argv[2]||'sonra';const B='http://127.0.0.1:8765/v3-app/detay-v2.html';
const R={varsayilan:'mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli',shami:'shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte',misir:'misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole'};
const out='v3-app/docs/screenshots/detay-v2/besin';fs.mkdirSync(out,{recursive:true});const res={label,runs:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m)};
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){const b=await type.launch();
 for(const width of [360,390,430]){const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  for(const [k,slug] of Object.entries(R)){
   await p.goto(`${B}?yazar=a&sekme=hazirlanis&tarif=${slug}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(300);
   await p.evaluate(()=>{const s=document.querySelector('.dv2-nutrition');const h=document.querySelector('.detail-header').getBoundingClientRect().height+document.querySelector('.dv2-tabs-bar').offsetHeight;scrollTo({top:s.getBoundingClientRect().top+scrollY-h-16,behavior:'instant'})});await p.waitForTimeout(300);
   const m=await p.evaluate(()=>{const s=document.querySelector('.dv2-nutrition');const rail=s.querySelector('.dv2-nut-rail');const boxes=rail?[...rail.children]:[];const rr=rail?.getBoundingClientRect();
    const texts=[...s.querySelectorAll('dt,dd,b,small,span,p')].filter(e=>e.offsetParent&&!e.children.length);
    return {h:Math.round(s.getBoundingClientRect().height*10)/10,values:[...s.querySelectorAll('[data-nut]')].map(e=>e.dataset.nut+'='+e.textContent.replace(/\s+/g,' ').trim()),
     rail:rail?{h:Math.round(rr.height),w:Math.round(rr.width),boxes:boxes.length,visible:boxes.filter(x=>{const r=x.getBoundingClientRect();return r.left>=rr.left-1&&r.right<=rr.right+1}).length,partial:boxes.filter(x=>{const r=x.getBoundingClientRect();return r.right>rr.left+1&&r.left<rr.right-1&&!(r.left>=rr.left-1&&r.right<=rr.right+1)}).length,snap:getComputedStyle(rail).scrollSnapType,scrolls:rail.scrollWidth>rail.clientWidth+1}:null,
     rest:(()=>{const d=s.querySelector('.dv2-nut-rest');if(!d)return null;const cols=[...d.children];const lh=e=>parseFloat(getComputedStyle(e).lineHeight);return {cols:cols.length,labels:cols.map(c=>c.dataset.nut),heights:[...new Set(cols.map(c=>Math.round(c.getBoundingClientRect().height)))],widths:[...new Set(cols.map(c=>Math.round(c.getBoundingClientRect().width+ (c.previousElementSibling?0:8))))],numLines:cols.map(c=>{const b=c.querySelector('dd');return Math.round(b.getBoundingClientRect().height/lh(b.querySelector('b')))}),labelLines:cols.map(c=>{const t=c.querySelector('dt');return Math.round(t.getBoundingClientRect().height/lh(t))}),ddBottom:[...new Set(cols.map(c=>Math.round(c.querySelector('dd').getBoundingClientRect().bottom)))],bg:getComputedStyle(cols[0]).backgroundColor,divider:cols.slice(1).every(c=>getComputedStyle(c).borderLeftWidth!=='0px')}})(),
     noteLines:(()=>{const n=s.querySelector('.dv2-nut-note');if(!n)return null;const t=n.querySelector('span')||n;return Math.round(t.getBoundingClientRect().height/parseFloat(getComputedStyle(t).lineHeight))})(),
     clipped:texts.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.trim()),overflowX:document.documentElement.scrollWidth>innerWidth}});
   res.runs.push({engine,width,k,...m});
   if(width===390)await p.locator('.dv2-nutrition').screenshot({path:`${out}/${label}-${engine}-390-${k}.png`});
   if(label==='sonra'){
    const restData=await p.evaluate(()=>(recipeInfo(recipe).nutrition?.cells||[]).filter(c=>c.value&&!['Kalori','Protein','Karbonhidrat','Yağ'].includes(c.label)).map(c=>c.label));
    check(!m.rail&&m.rest&&m.rest.cols===restData.length&&m.rest.labels.join()===restData.join(),`${engine}-${width}-${k}: alt satır sütunları ${JSON.stringify(m.rest)} ≠ veri ${restData}`);
    check(m.rest&&m.rest.heights.length===1&&m.rest.ddBottom.length===1&&m.rest.numLines.every(n=>n===1)&&m.rest.bg==='rgba(0, 0, 0, 0)'&&m.rest.divider,`${engine}-${width}-${k}: alt satır kalıbı ${JSON.stringify(m.rest)}`);
    check(m.noteLines===1,`${engine}-${width}-${k}: not ${m.noteLines} satır`);check(!m.clipped.length&&!m.overflowX,`${engine}-${width}-${k}: kesilen ${m.clipped}`);
   }
  }
  check(!errors.length,`${engine}-${width}: konsol ${errors}`);await p.close();}
 await b.close();}
fs.writeFileSync(`v3-app/docs/detay-v2-besin-${label}.json`,JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');
for(const r of res.runs)console.log(r.engine,r.width,r.k,'yükseklik',r.h,r.rail?`şerit ${r.rail.visible}/${r.rail.boxes} yarım ${r.rail.partial}`:'',r.rest?`alt satır ${r.rest.cols} sütun, etiket satırları ${r.rest.labelLines.join('/')}, yükseklik ${r.rest.heights}`:'');
