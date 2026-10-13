// Her yerel tarifte alternatif (shuffle + sheet) ve Alerjen kartı canlı veriyle tutarlı mı? yazar/not parametrelerinden bağımsız.
// Kaynak: docs/detay-v2-veri.json (detay-v2-veri-topla.mjs). Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-veri-dogrula.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const rows=JSON.parse(fs.readFileSync('v3-app/docs/detay-v2-veri.json','utf8'));
const B='http://127.0.0.1:8765/v3-app/detay-v2.html';const out='v3-app/docs/screenshots/detay-v2/veri';fs.mkdirSync(out,{recursive:true});
const res={rows:[],failures:[]};const check=(ok,m)=>{if(!ok)res.failures.push(m);return ok;};
const probe=p=>p.evaluate(()=>({slug:recipe.slug,swaps:[...document.querySelectorAll('.ingredient-row')].map(r=>!!r.querySelector('[data-swap]')),allergen:!!document.querySelector('.dv2-info-alerjen'),allergenText:document.querySelector('.dv2-info-alerjen .dv2-card-body')?.textContent.replace(/\s+/g,' ').trim()||null,cards:[...document.querySelectorAll('.dv2-info-card .dv2-card-title')].map(e=>e.textContent.trim())}));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errors=[];p.on('pageerror',e=>errors.push(e.message));
for(const r of rows){
 await p.goto(`${B}?tarif=${r.slug}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);
 const m=await probe(p);const liveRows=r.liveIngredients.map(i=>i.substitutes.length>0);// Mobil kural: alerjen cümlesi "Alerjen:" ile sonraki "Önemli:/Dikkat:" arasıdır (sonrası Hatırlatma'da kalır); ilk harf gösterimde büyük.
 const liveAl=(r.liveNotes||[]).map(n=>(n.body.match(/Alerjen:\s*([\s\S]*?)(?=\s+(?:Önemli|Dikkat):|\n|$)/)||[])[1]).find(Boolean)?.trim()||null;
 const ok=check(m.slug===r.slug&&JSON.stringify(m.swaps)===JSON.stringify(liveRows),`${r.slug}: alternatif satırları ${m.swaps.map(Number).join('')} ≠ canlı ${liveRows.map(Number).join('')}`)&&check(m.allergen===!!liveAl&&(!liveAl||m.allergenText.toLocaleLowerCase('tr')===liveAl.replace(/\s+/g,' ').toLocaleLowerCase('tr')),`${r.slug}: alerjen ${m.allergen}/${m.allergenText} ≠ canlı ${liveAl}`);
 // Alternatifli tarifte ilk sheet açılır ve canlı metni gösterir
 let sheetOk=null;if(liveRows.some(Boolean)){await p.evaluate(()=>{const s=document.querySelector('.ingredient-row [data-swap]');scrollTo({top:s.getBoundingClientRect().top+scrollY-300,behavior:'instant'})});await p.locator('.ingredient-row [data-swap]').first().click();await p.waitForTimeout(350);const first=r.liveIngredients.find(i=>i.substitutes.length).substitutes[0].split(' — ')[0];sheetOk=await p.evaluate(f=>{const d=document.querySelector('dialog[open]');return !!d&&d.querySelector('h2')?.textContent.trim()==='Yerine ne kullanabilirim?'&&d.querySelector('.dv2-alt-name')?.textContent.trim()===f},first);check(sheetOk,`${r.slug}: sheet`);await p.keyboard.press('Escape');await p.waitForTimeout(250);}
 res.rows.push({slug:r.slug,title:r.title,alt:liveRows.filter(Boolean).length,allergen:!!liveAl,mobileAlt:m.swaps.filter(Boolean).length,mobileAllergen:m.allergen,cards:m.cards,sheetOk,ok});
}
// Parametre bağımsızlığı: varsayılan (Mercimekli Yaprak Sarma) her yazar/not bileşiminde aynı iki bileşen
for(const q of ['','?yazar=a','?yazar=b','?yazar=c','?yazar=d','?yazar=a&not=a','?yazar=b&not=b','?not=a','?not=b','?yazar=c&not=a']){
 for(const [eng,type] of [['chromium',null],['webkit',webkit]]){const bb=type?await type.launch():b;const pp=type?await bb.newPage({viewport:{width:390,height:844}}):p;
  await pp.goto(B+q,{waitUntil:'networkidle'});await pp.waitForFunction(()=>window.DV2_READY===true);const m=await probe(pp);const exp=rows.find(x=>x.slug===m.slug);check(m.slug==='mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli'&&m.swaps.filter(Boolean).length===exp.liveIngredients.filter(i=>i.substitutes.length).length&&m.allergen&&m.cards.join()==='Hatırlatma,Alerjen',`${eng} ${q||'parametresiz'}: ${JSON.stringify(m)}`);(res.params||=[]).push({q,eng,alt:m.swaps.filter(Boolean).length,allergen:m.allergen});
  if(type)await bb.close();}
}
// Örnek görüntüler (390): alternatif + alerjen, yalnız alerjen, yalnız alternatif
const ex=[['guvecte','alternatif + alerjen'],['sardalya','yalnız alerjen'],['patates-mucveri','yalnız alternatif']];
const shots=[];
for(const [key,label] of ex){const r=rows.find(x=>x.slug.startsWith(key));await p.goto(`${B}?tarif=${r.slug}`,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(300);
 await p.evaluate(()=>{const s=document.querySelector('.dv2-info');scrollTo({top:s.getBoundingClientRect().top+scrollY-84,behavior:'instant'})});await p.waitForTimeout(250);const s1=(await p.screenshot({clip:{x:0,y:68,width:390,height:330}})).toString('base64');
 if(await p.$('.dv2-info-alerjen')){await p.evaluate(()=>{const c=document.querySelector('.dv2-info-alerjen'),rl=c.parentElement;rl.scrollLeft=c.offsetLeft-parseFloat(getComputedStyle(rl).paddingLeft)});await p.waitForTimeout(250);}const s1b=(await p.screenshot({clip:{x:0,y:68,width:390,height:330}})).toString('base64');
 await p.evaluate(()=>{const s=document.querySelector('.ingredients');scrollTo({top:s.getBoundingClientRect().top+scrollY-170,behavior:'instant'})});await p.waitForTimeout(250);const s2=(await p.screenshot({clip:{x:0,y:68,width:390,height:520}})).toString('base64');
 await p.screenshot({path:`${out}/chromium-390-${key}.png`});shots.push([r.title,label,s1,s1b,s2]);}
const cp=await b.newPage({viewport:{width:3*390+96,height:400}});
await cp.setContent(`<body style="margin:0;background:#ECECEC;font:600 14px system-ui"><div style="display:flex;gap:24px;padding:16px">${shots.map(([t,l,a,a2,c])=>`<div style="width:390px"><div style="margin-bottom:8px">${t} · ${l}</div><img src="data:image/png;base64,${a}" style="width:390px;display:block;margin-bottom:8px"><img src="data:image/png;base64,${a2}" style="width:390px;display:block;margin-bottom:8px"><img src="data:image/png;base64,${c}" style="width:390px;display:block"></div>`).join('')}</div></body>`);
await cp.screenshot({path:`${out}/uc-ornek-yanyana.png`,fullPage:true});
await b.close();
check(!errors.length,`konsol ${errors}`);
fs.writeFileSync('v3-app/docs/detay-v2-veri-dogrula.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');
console.log('tarif\talt\talerjen\tmobilAlt\tmobilAlerjen');for(const r of res.rows)console.log(`${r.title.slice(0,34)}\t${r.alt}\t${r.allergen}\t${r.mobileAlt}\t${r.mobileAllergen}`);
