// Bilgi şeridi + Besin Değerleri paritesi (10 Ekim). Canlı karşılıklarla yan yana görüntü (390) ve kontroller
// (Chromium + WebKit × 360/390/430). Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-bilgi.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base='http://127.0.0.1:8765/v3-app/detay-v2.html';
const R={shami:'shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte',misir:'misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole',curry:'tavuk-curry-hindistan-cevizli-hint-usulu'};
const out='v3-app/docs/screenshots/detay-v2/bilgi';fs.mkdirSync(out,{recursive:true});
const res={live:{},runs:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m);return ok;};
const DIET=/glutensiz|laktozsuz|süt içermez|vegan|vejetaryen|yumurta içermez|şeker ilavesiz/i;

// 1) Canlı: not-duo / nut-card içeriği ve kırpımları (salt okuma)
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 for(const [k,slug] of Object.entries(R)){
  await p.goto('https://dadagastro.com/tarif/'+slug,{waitUntil:'networkidle',timeout:90000});
  await p.addStyleTag({content:'[class*=cookie],.feedback-tab,.to-top,#toTop{display:none!important}'});await p.waitForTimeout(500);
  res.live[k]=await p.evaluate(()=>{const T=e=>(e?.textContent||'').replace(/­/g,'').replace(/\s+/g,' ').trim();return {notes:[...document.querySelectorAll('.note-duo>div')].map(d=>({cls:d.className,title:T(d.querySelector('h4')),body:T(d.querySelector('p'))})),nut:[...document.querySelectorAll('.nut-cell')].map(c=>T(c.querySelector('span'))+'='+T(c.querySelector('b'))),macros:[...document.querySelectorAll('.nut-legend span')].map(T),notice:T(document.querySelector('.nut-head>span'))}});
  for(const [sel,name] of [['.note-duo','not'],['.nut-card','besin']]){const el=await p.$(sel);if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(250);await el.screenshot({path:`${out}/canli-${k}-${name}.png`});}}
 }
 await b.close();}

// Yapışık sekme çubuğu + header altında kalmasın: hedefin üstü header + çubuk + 16 px aşağıda.
const toTop=(p,sel)=>p.evaluate(sel=>{const s=document.querySelector(sel);if(!s)return;const t=document.querySelector('.dv2-tabs-bar'),h=document.querySelector('.detail-header').getBoundingClientRect().height;const y=s.getBoundingClientRect().top+scrollY;const stuckBelow=y>document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top+scrollY;scrollTo({top:y-h-(stuckBelow?t.offsetHeight:0)-16,behavior:'instant'})},sel).then(()=>p.waitForTimeout(300));
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch();
 for(const width of [360,390,430]){
  const ctx=await b.newContext({viewport:{width,height:844},deviceScaleFactor:2});const p=await ctx.newPage();
  const errors=[];p.on('pageerror',e=>errors.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  for(const [k,slug] of Object.entries(R)){
   const tag=`${engine}-${width}-${k}`;
   await p.goto(`${base}?tarif=${slug}&yazar=b&not=b`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(300);
   const m=await p.evaluate(()=>{const rail=document.querySelector('.dv2-info-rail');const cards=[...document.querySelectorAll('.dv2-info-card')];const nut=document.querySelector('.dv2-nutrition');const tail=document.querySelector('.dv2-tail');const kids=tail?[...tail.children].map(e=>e.className.split(' ')[0]):[];
    return {titles:cards.map(c=>c.querySelector('.dv2-card-title').textContent.trim()),icons:cards.map(c=>c.querySelector('.dv2-box-icon .icon').className.match(/fa-[a-z-]+$/)?.[0]),allergen:document.querySelector('.dv2-info-alerjen')?.textContent.replace(/\s+/g,' ').trim()||null,allergenTags:[...document.querySelectorAll('.dv2-info-alerjen .dv2-allergen-tag')].map(e=>e.textContent),
     single:document.querySelector('.dv2-info')?.classList.contains('is-single')??null,railScrolls:rail?rail.scrollWidth>rail.clientWidth+1:null,cardFull:cards.length===1?Math.round(cards[0].getBoundingClientRect().width)===Math.round(rail.clientWidth-parseFloat(getComputedStyle(rail).paddingLeft)-parseFloat(getComputedStyle(rail).paddingRight)):null,
     nut:nut?[...nut.querySelectorAll('[data-nut]')].map(d=>{const v=(d.querySelector('dd')||d.querySelector('b')||d).cloneNode(true);v.querySelector('.dv2-nut-pct')?.remove();v.querySelectorAll('span:not(.dv2-nut-pct)').forEach(x=>{if(!x.closest('b,dd'))x.remove()});return d.dataset.nut+'='+(d.classList.contains('dv2-nut-kcal')?[...d.querySelectorAll('b,small')].map(x=>x.textContent).join(' '):v.textContent).replace(/\s+/g,' ').trim()}):null,macros:nut?[...nut.querySelectorAll('.dv2-nut-trio:not(.dv2-nut-rest)>div')].map(l=>l.dataset.nut+' '+(l.querySelector('.dv2-nut-pct')?.textContent||'')):null,bar:nut?[...nut.querySelectorAll('.dv2-macro-bar i')].map(i=>i.style.width):null,note:nut?.querySelector('.dv2-nut-note')?.textContent.trim()||null,
     tail:kids,inPane:!!nut?.closest('.dv2-pane'),infoInStrip:!!document.querySelector('.dv2-info-besin'),overflowX:document.documentElement.scrollWidth>innerWidth,
     nutCellMinH:nut?Math.min(...[...nut.querySelectorAll('.dv2-nut-kcal,.dv2-nut-box')].map(d=>d.getBoundingClientRect().height)):null,clipped:nut?[...nut.querySelectorAll('dt,dd,.dv2-nut-box span,.dv2-nut-box b,.dv2-nut-note span')].filter(d=>d.scrollWidth>d.clientWidth+1).length:0}});
   const L=res.live[k];const run={engine,width,k,...m};res.runs.push(run);
   // Şerit: webdeki not-duo sırası — Hatırlatma, (Alerjen: Hatırlatma'nın içindeki cümle), Editör Notu.
   const exp=[];for(const n of L.notes){if(/remind/.test(n.cls)){if(n.body.replace(/Alerjen:.*$/,'').trim())exp.push('Hatırlatma');if(/Alerjen:/.test(n.body))exp.push('Alerjen');}else exp.push(n.title);}
   check(m.titles.join('|')===exp.join('|'),`${tag}: şerit sırası ${m.titles} ≠ web ${exp}`);
   check(!m.infoInStrip,`${tag}: Besin şeritte`);
   if(m.allergen){check(!DIET.test(m.allergenTags.join(' '))&&m.icons[m.titles.indexOf('Alerjen')]==='fa-hand-dots',`${tag}: alerjen kartı ${m.allergen}`);const webAl=(L.notes.map(n=>n.body.match(/Alerjen:\s*(.*)$/)?.[1]).find(Boolean)||'').trim();check(m.allergen.includes(webAl),`${tag}: alerjen metni webden farklı`);}
   else check(!L.notes.some(n=>/Alerjen:/.test(n.body)),`${tag}: webde alerjen var, mobilde yok`);
   if(m.titles.length===1)check(m.single&&!m.railScrolls&&m.cardFull,`${tag}: tek kart tam genişlik değil ${JSON.stringify(m)}`);
   // Besin: webdeki 8 alan eksiksiz, aynı değer; makro lejantı; not; konum (sekmelerin altında, Tarif bilgileri ve Benzer'den önce).
   if(L.nut.length){
    const web=L.nut.map(x=>x.replace(/\s+/g,' '));check(m.nut&&m.nut.length===web.length&&m.nut.every((x,i)=>x.replace(/\s+/g,'')===web[i].replace(/\s+/g,'')),`${tag}: besin alanları ${m.nut} ≠ web ${web}`);
    check(m.macros.map(x=>x.replace(/\s+/g,'')).join()===L.macros.map(x=>x.replace(/\s+/g,'')).join(),`${tag}: makro ${m.macros} ≠ ${L.macros}`);
    check(m.note==='Tahmini değerler · 1 porsiyon'&&/tahmin/i.test(L.notice),`${tag}: besin notu ${m.note}`);
    check(!m.inPane&&m.tail[0]==='dv2-nutrition'&&m.tail.indexOf('dv2-nutrition')<m.tail.indexOf('dv2-similar')&&m.tail.indexOf('dv2-nutrition')<m.tail.indexOf('recipe-metadata'),`${tag}: besin konumu ${m.tail}`);
    check(!m.clipped&&m.nutCellMinH>=44,`${tag}: besin hücre kırpma/yükseklik`);
    // Porsiyon değişince değerler sabit
    await p.click('[data-dv2-tab="malzemeler"]');const before=await p.evaluate(()=>JSON.stringify([...document.querySelectorAll('.dv2-nutrition [data-nut]')].map(d=>d.dataset.nut+'='+d.textContent.replace(/\s+/g,' ').trim())));await p.click('#more');await p.waitForTimeout(200);const after=await p.evaluate(()=>JSON.stringify([...document.querySelectorAll('.dv2-nutrition [data-nut]')].map(d=>d.dataset.nut+'='+d.textContent.replace(/\s+/g,' ').trim())));check(before===after,`${tag}: porsiyonla besin değişti`);
   }else check(m.nut===null,`${tag}: webde besin yok, mobilde var`);
   check(!m.overflowX,`${tag}: yatay taşma`);
   // Shami: alternatifler çalışır
   if(k==='shami'){const alts=await p.evaluate(()=>[...document.querySelectorAll('.ingredient-row [data-swap]')].map(b=>b.getAttribute('aria-label')));run.alts=alts;check(alts.length===5,`${tag}: Shami alternatif sayısı ${alts.length}`);
    await p.evaluate(()=>{const s=document.querySelector('.ingredient-row [data-swap]');scrollTo({top:s.getBoundingClientRect().top+scrollY-360,behavior:'instant'})});await p.waitForTimeout(200);await p.locator('.ingredient-row [data-swap]').first().click();await p.waitForTimeout(450);
    run.altSheet=await p.evaluate(()=>{const d=document.querySelector('dialog[open]');return d&&{title:d.querySelector('h2')?.textContent.trim(),base:d.querySelector('.dv2-alt-base p')?.textContent.replace(/\s+/g,' ').trim(),alt:d.querySelector('.dv2-alt-item')?.textContent.replace(/\s+/g,' ').trim()}});check(run.altSheet?.title==='Yerine ne kullanabilirim?'&&/kuzu kuşbaşı/.test(run.altSheet.alt),`${tag}: Shami alternatif sheet ${JSON.stringify(run.altSheet)}`);
    if(width===390)await p.screenshot({path:`${out}/${engine}-390-shami-alternatif.png`});await p.keyboard.press('Escape');await p.waitForTimeout(300);}
   if(width===390){await toTop(p,'.dv2-info');await p.locator('.dv2-info').screenshot({path:`${out}/${engine}-390-${k}-serit.png`}).catch(()=>{});
    if(await p.$('.dv2-info-alerjen')){await p.evaluate(()=>{const c=document.querySelector('.dv2-info-alerjen'),r=c.parentElement;r.scrollLeft=c.offsetLeft-parseFloat(getComputedStyle(r).paddingLeft);});await p.waitForTimeout(250);await p.locator('.dv2-info-alerjen').screenshot({path:`${out}/${engine}-390-${k}-alerjen.png`});await p.evaluate(()=>document.querySelector('.dv2-info-rail').scrollLeft=0);}
    if(await p.$('.dv2-nutrition')){await toTop(p,'.dv2-nutrition');await p.locator('.dv2-nutrition').screenshot({path:`${out}/${engine}-390-${k}-besin.png`});}
    await toTop(p,'.dv2-info');await p.screenshot({path:`${out}/${engine}-390-${k}-baglam.png`});}
  }
  if(errors.length)check(false,`${engine}-${width}: konsol/ağ ${errors}`);
  await ctx.close();
 }
 await b.close();
}
// Yan yana: mobil (sol) ↔ web (sağ), her tarif için şerit ve besin
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:400}});
 const img=f=>fs.existsSync(f)?`<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:390px;display:block">`:`<div style="width:390px;padding:24px;background:#fff;color:#56514A">Webde bu blok yok</div>`;
 for(const k of Object.keys(R)){
  await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 15px system-ui"><div style="padding:16px"><div style="margin-bottom:8px">${k} · bilgi şeridi + besin değerleri · sol mobil (detay-v2, 390) · sağ canlı web (390)</div><div style="display:grid;grid-template-columns:390px 390px;gap:24px;align-items:start"><div style="display:grid;gap:12px">${img(`${out}/chromium-390-${k}-serit.png`)}${fs.existsSync(`${out}/chromium-390-${k}-alerjen.png`)?img(`${out}/chromium-390-${k}-alerjen.png`):''}${img(`${out}/chromium-390-${k}-besin.png`)}</div><div style="display:grid;gap:12px">${img(`${out}/canli-${k}-not.png`)}${img(`${out}/canli-${k}-besin.png`)}</div></div></div></body>`);
  await p.screenshot({path:`${out}/yanyana-${k}.png`,fullPage:true});}
 await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-bilgi.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');
for(const r of res.runs.filter(r=>r.width===390&&r.engine==='chromium'))console.log(r.k,'şerit',r.titles.join(' · '),'| alerjen',r.allergenTags.join(','),'| tek',r.single,'| besin',r.nut?r.nut.length+' alan':'yok','| kuyruk',r.tail.join(' > '));
