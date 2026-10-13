// Canlı tarif sayfasından (salt okuma) prototip veri şemasına (DATA.recipes + PARITY.recipes) çıkarım.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-extract.mjs <slug> [<slug> ...]
// Çıktı: v3-app/detay-v2-tarifler.js (yalnız detay-v2.html yükler; ortak veri dosyalarına dokunulmaz).
// Birleştirme (10 Ekim): dosyadaki mevcut tarifler korunur; verilen slug'lar eklenir ya da yenilenir.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const slugs=process.argv.slice(2);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
const out=[];
const target='v3-app/detay-v2-tarifler.js';
const existingSimilar=(()=>{try{const m=fs.readFileSync(target,'utf8').match(/window\.DV2_SIMILAR=(\{.*?\});\n/);return m?m[1]:'{}';}catch{return '{}';}})();
const existing=(()=>{try{const m=fs.readFileSync(target,'utf8').match(/window\.DV2_EXTRA=(\[[\s\S]*?\n\]);\n/);return m?JSON.parse(m[1]):[];}catch{return [];}})();
for(const slug of slugs){
 const url='https://dadagastro.com/tarif/'+slug;
 await p.goto(url,{waitUntil:'networkidle',timeout:90000});
 const item=await p.evaluate(({slug,url})=>{
  const T=e=>(e?.textContent||'').replace(/­/g,'').replace(/\s+/g,' ').trim();
  const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const abs=u=>u&&u.startsWith('/')?'https://dadagastro.com'+u:u;const bg=e=>{const m=(e?.style.backgroundImage||'').match(/url\(["']?(.*?)["']?\)/);return m?abs(m[1]):'';};
  const num=s=>{const m=String(s||'').replace(/\./g,'').replace(',','.').match(/[\d.]+/);return m?Number(m[0]):null;};
  const title=T(q('.rd-stage-info h1'));
  const rdf=Object.fromEntries(qa('.kc-card .rdf').map(r=>[T(q('span',r)),T(q('b',r))]));
  const split=(rdf['Hazırlık + Pişirme']||'').match(/(\d+)\s*dk\s*\+\s*(\d+)\s*dk/);
  const servingsText=rdf['Porsiyon']||'';const servings=num(servingsText);const unit=servingsText.replace(/^[\d.,]+\s*/,'');
  const features=qa('.kc-chips a.chip').map(a=>({label:T(a),href:a.href}));
  const costChip=features.find(f=>/butce/.test(f.href));
  const ingredients=[],dataIngredients=[];
  for(const li of qa('#ingList>li')){
   if(li.matches('.ing-group')){ingredients.push({group:T(li)});continue;}
   const amountEl=q('[data-amount]',li),iq=q('.iq',li),inEl=q('.in',li),note=T(q('.in small',li));
   const nameOnly=T(inEl).replace(note,'').trim();
   const amount=amountEl?Number(amountEl.dataset.baseAmount):null;
   const unitLabel=iq?T(iq).replace(T(amountEl),'').trim():'';
   const subs=qa('.ing-pop .ip-row span',li).map(s=>{const b=T(q('b',s)),sm=T(q('small',s)).replace(/^—\s*/,'');return sm?`${b} — ${sm}`:b;});
   ingredients.push({name:note?`${nameOnly} ${note}`:nameOnly,note,quantity:iq?T(iq):'',unit:iq?.dataset.u||'',substitutes:subs,sponsor:T(q('.ing-sponsor .sp-info b',li))});
   dataIngredients.push({name:note?`${nameOnly} ${note}`:nameOnly,amount,unit:unitLabel});
  }
  const stepCards=qa('.steps-flow .step-card');
  const steps=stepCards.map(c=>({title:T(q('h3',c)),body:T(q('.step-card__body p',c)),time:T(q('.step-time',c))}));
  const stepImages=stepCards.map(c=>({images:qa('.step-img',c).map(bg).filter(Boolean)}));
  const notes=[...qa('.remind-box').map(n=>({title:T(q('h4',n)),body:T(q('p',n))})),...qa('.editor-box').map(n=>({title:T(q('h4',n)).replace(/\s+/g,' '),body:T(q('p',n))}))];
  const nut=q('.nut-card');
  const reviews=qa('.rev-list>.c-item').map(c=>{const stars=q('.c-stars',c);const full=stars?qa('.fa-solid.fa-star',stars).length+(qa('.fa-star-half-stroke',stars).length?.5:0):null;
   return {author:T(q('.c-who b',c)),rating:stars?full:null,body:T(q(':scope>.c-main>.c-text',c)),date:T(q('.c-date',c)),badge:T(q(':scope>.c-main>.c-head .c-deg',c)),likes:T(q('.c-like b',c))||'0',photos:qa('.c-ph',c).map(bg),replies:qa('.c-replies .c-item',c).map(r=>({author:T(q('.c-who b',r)),body:T(q('.c-text',r)),date:T(q('.c-date',r))}))};});
  const sc=q('.side-chef');
  const chefInfo=[T(q('.sc-id h3',sc)),T(q('.sc-deg',sc)),T(q('.sc-since',sc))].filter(Boolean).join('\n');
  const chefMeta=qa('.sc-meta .scs',sc).map(s=>T(q('span',s))+T(q('b',s)));
  const similar=qa('.simrec .r-card,.simrec article').map(a=>({title:T(q('h3,h4',a)),url:q('a[href*="/tarif/"]',a)?.href||'',image:bg(q('[style*="background-image"]',a)),author:'',rating:'',views:''})).filter(s=>s.url);
  const facets={beslenme:features.filter(f=>/beslenme/.test(f.href)).map(f=>new URL(f.href).searchParams.get('beslenme[0]')||new URL(f.href).searchParams.get('beslenme')),mutfak:features.filter(f=>/mutfak/.test(f.href)).map(f=>new URL(f.href).searchParams.get('mutfak[0]')||new URL(f.href).searchParams.get('mutfak')),butce:costChip?[new URL(costChip.href).searchParams.get('butce[0]')||new URL(costChip.href).searchParams.get('butce')]:[]};
  const gallery=JSON.parse(q('#rdStage')?.dataset.gallery||'[]').map(abs);
  const recipe={title,url,image:bg(q('#rdStage'))||gallery[0]||'',category:T(q('.rd-stage .r-chip')),difficulty:rdf['Zorluk']||'',rating:T(q('.rd-stars b')),slug,description:q('meta[name=description]')?.content||'',author:T(q('.art-hauthor b')),servings,unit,minutes:split?Number(split[1])+Number(split[2]):null,ratingCount:num(T(q('.rd-stars a'))),ingredients:dataIngredients,steps,reviews:[],cost:costChip?Number(facets.butce[0]):null,views:num(T(q('.r-views'))),
   web:{notes,tags:qa('.ts-tags .chip').map(T),features:features.map(f=>f.label),facts:[`Porsiyon${servingsText}`,split?`Hazırlık + Pişirme ${split[1]} dk + ${split[2]} dk`:'',`Zorluk${rdf['Zorluk']||''}`,rdf['Pişirme Derecesi']?`Pişirme Derecesi${rdf['Pişirme Derecesi']}`:''].filter(Boolean),similar:[]}};
  const parity={ingredients,gallery,badges:qa('.rd-badges .tbadge').map(T),made:'',madeCount:T(q('#madeCount'))||'0',clapCount:T(q('#clapCount'))||'0',
   chef:{info:chefInfo,meta:chefMeta,bio:T(q('.sc-bio',sc)),subscription:!!q('.sc-actions a',sc)},
   dates:qa('.art-hmeta .art-hstat').map(T),features,
   nutrition:nut?{notice:T(q('.nut-head>span',nut)),cells:qa('.nut-cell',nut).map(c=>({value:T(q('b',c)),label:T(q('span',c))})),macros:qa('.nut-legend span',nut).map(T)}:null,
   skills:qa('.rs-skills .rs-chips>*').map(T),related:qa('.alt-links a').map(a=>({title:T(a),url:a.href})),similar,
   reviewSummary:{recommend:T(q('.rs-rec')),distribution:qa('.rs-bar').map(r=>({star:T(q('.lbl',r)),count:T(q('.cnt',r))}))},
   reviews,steps:stepImages,video:'',audio:'',madePhotos:[],commentsEnabled:!!q('#revForm,#revLogin,.rev-login'),altReviewCount:'',facets,fullDescription:T(q('.rd-sub'))};
  return {recipe,parity,captured:new Date().toISOString().slice(0,10)};
 },{slug,url});
 out.push(item);console.log(slug,'malzeme',item.recipe.ingredients.length,'alternatifli',item.parity.ingredients.filter(i=>i.substitutes?.length).length,'adım',item.recipe.steps.length,'görselli adım',item.parity.steps.filter(s=>s.images.length).length,'yorum',item.parity.reviews.length);
}
await b.close();
const header=`/* Ek tarif verisi (yalnız detay-v2): canlı https://dadagastro.com/tarif/{slug} sayfasından salt okuma ile çıkarıldı
   (docs/detay-v2-extract.mjs). Şema ld-source.js DATA.recipes + PARITY.recipes ile aynıdır. Ortak veri dosyası değişmez:
   kayıtlar kaynak runtime'ın ilk "tarif" parametresi okumasından hemen önce belleğe eklenir. */
// Gelen #adimlar/#yorumlar: tarayıcının yükleme sonrası (smooth) çapa kaydırması engellenir; sekme detay-v2.js'te anında açılır.
if(/^#(adimlar|yorumlar)$/.test(location.hash)){window.DV2_INITIAL_HASH=location.hash;history.replaceState(history.state,'',location.pathname+location.search);}
window.DV2_EXTRA=${JSON.stringify([...existing.filter(x=>!out.some(o=>o.recipe.slug===x.recipe.slug)),...out],null,1)};
/* Canlı benzer tarif listeleri (slug → 4 benzer slug), docs/detay-v2-benzer-topla.mjs. */
window.DV2_SIMILAR=${existingSimilar};
/* Varsayılan tarif (10 Ekim, Türk mutfağı): adreste ?tarif= yoksa Mercimekli Yaprak Sarma açılır — 7 alternatif malzeme,
   alerjen kartı, 8 alanlı besin değerleri, 4 adım fotoğrafı, eksiksiz yazar. Yalnız sayfanın kendi adres parametreleri için
   geçerlidir; ?tarif= verilen bağlantılar (Shami Kebap dahil) aynen çalışır. */
window.DV2_DEFAULT_RECIPE='mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli';
(()=>{const get=URLSearchParams.prototype.get;let done=false;
 const own=sp=>sp.toString()===new URLSearchParams(location.search).toString();
 URLSearchParams.prototype.get=function(key){
  if(!done){try{if(typeof DATA!=='undefined'&&typeof PARITY!=='undefined'){done=true;for(const x of window.DV2_EXTRA){if(!DATA.recipes.some(r=>r.slug===x.recipe.slug))DATA.recipes.push(x.recipe);PARITY.recipes[x.recipe.slug]=x.parity;}
   /* Görsel yolları (10 Ekim): ortak veride 68 adım/galeri görseli göreli '/varliklar/…' — yerel sunucuda 404 ve boş galeri.
      Canlı kökle (https://dadagastro.com) mutlaklaştırılır; ortak dosya değişmez. */
   const abs=v=>typeof v==='string'&&v.startsWith('/varliklar/')?'https://dadagastro.com'+v:v;const walk=o=>{if(Array.isArray(o)){o.forEach((v,i)=>{o[i]=abs(v);if(v&&typeof v==='object')walk(v);});}else if(o&&typeof o==='object'){for(const k of Object.keys(o)){o[k]=abs(o[k]);if(o[k]&&typeof o[k]==='object')walk(o[k]);}}};walk(PARITY.recipes);DATA.recipes.forEach(walk);
   /* Benzer tarifler (10 Ekim): canlı .simrec listesi (docs/detay-v2-benzer-topla.mjs); ortak veride 23 tarifte similar boştu. */
   for(const [s,l] of Object.entries(window.DV2_SIMILAR||{})){const P=PARITY.recipes[s];if(P&&l.length)P.similar=l.map(x=>({url:'https://dadagastro.com/tarif/'+x,title:'',image:'',author:'',rating:'',views:''}));}}}catch{}}
  const v=get.call(this,key);
  if(key==='tarif'&&v===null&&own(this))return window.DV2_DEFAULT_RECIPE;
  return v;
 };})();
`;
fs.writeFileSync(target,header);
