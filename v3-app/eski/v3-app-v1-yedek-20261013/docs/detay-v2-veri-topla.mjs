// detay-v2'nin kullandığı bütün yerel tarifler: prototip ↔ canlı alternatif malzeme ve alerjen (Hatırlatma "Alerjen:" cümlesi)
// karşılaştırması. Canlı salt okuma. Çıktı: docs/detay-v2-veri.json. Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-veri-topla.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://127.0.0.1:8765/v3-app/detay-v2.html',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.DV2_READY===true);
const proto=await p.evaluate(()=>DATA.recipes.map(r=>{const w=recipeInfo(r);const ings=(w.ingredients||[]).filter(i=>!i.group);return {slug:r.slug,title:r.title,url:r.url,notes:(r.web?.notes||[]).map(n=>({title:n.title,body:n.body})),ingredients:ings.map(i=>({name:i.name,substitutes:i.substitutes||[]}))};}));
const live={};
for(const r of proto){
 const url='https://dadagastro.com/tarif/'+r.slug;let status=0;
 try{const res=await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});status=res.status();await p.waitForSelector('#ingList',{timeout:15000}).catch(()=>{});}catch(e){status=-1;}
 live[r.slug]=status===200?await p.evaluate(()=>{const T=e=>(e?.textContent||'').replace(/­/g,'').replace(/\s+/g,' ').trim();const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const ingredients=qa('#ingList>li:not(.ing-group)').map(li=>{const note=T(q('.in small',li));const name=T(q('.in',li)).replace(note,'').trim();return {name:note?`${name} ${note}`:name,substitutes:qa('.ing-pop .ip-row span',li).map(s=>{const b=T(q('b',s)),sm=T(q('small',s)).replace(/^—\s*/,'');return sm?`${b} — ${sm}`:b;})};});
  const notes=[...qa('.note-duo .remind-box').map(n=>({title:T(q('h4',n)),body:T(q('p',n))})),...qa('.note-duo .editor-box').map(n=>({title:T(q('h4',n)),body:T(q('p',n))}))];
  return {ingredients,notes};}):null;
 if(live[r.slug])live[r.slug].status=status;else live[r.slug]={status};
 process.stdout.write(`${status} ${r.slug.slice(0,50)}\n`);
}
await b.close();
// Laravel (salt okuma): database/data/ic-recipes/*.json içinde başlıkla eşleşen kayıt
const repoDir='/Users/gaviaworks/Developer/Backend Projects/dadagastro/database/data/ic-recipes';const repo={};
for(const f of fs.readdirSync(repoDir).filter(f=>f.endsWith('.json'))){let d;try{d=JSON.parse(fs.readFileSync(`${repoDir}/${f}`,'utf8'));}catch{continue;}const items=Array.isArray(d)?d:(d.recipes||Object.values(d));for(const it of items){if(!it||typeof it!=='object'||!it.title)continue;const t=(it.title.tr||it.title).toString();repo[t.split('|')[0].trim().toLocaleLowerCase('tr')]={file:f,remind:it.remind_text?.tr||it.remind_text||'',subs:(it.ingredients||[]).filter(i=>i&&(i.substitutes?.length||i.alternatives?.length)).length,ingredients:(it.ingredients||[]).length};}}
const rows=proto.map(r=>{const L=live[r.slug];const key=r.title.split('|')[0].trim().toLocaleLowerCase('tr');const rp=repo[key]||null;
 const al=n=>n.some(x=>/Alerjen:/.test(x.body));
 return {slug:r.slug,title:r.title.split('|')[0].trim(),status:L.status,protoSubs:r.ingredients.filter(i=>i.substitutes.length).length,liveSubs:L.ingredients?L.ingredients.filter(i=>i.substitutes.length).length:null,protoAllergen:al(r.notes),liveAllergen:L.notes?al(L.notes):null,protoNotes:r.notes,liveNotes:L.notes||null,protoIngredients:r.ingredients,liveIngredients:L.ingredients||null,repo:rp};});
fs.writeFileSync('v3-app/docs/detay-v2-veri.json',JSON.stringify(rows,null,1));
console.table(rows.map(r=>({tarif:r.title.slice(0,28),http:r.status,protoAlt:r.protoSubs,canliAlt:r.liveSubs,protoAlerjen:r.protoAllergen,canliAlerjen:r.liveAllergen,repo:r.repo?`${r.repo.file}:${r.repo.subs}alt`:'-'})));
