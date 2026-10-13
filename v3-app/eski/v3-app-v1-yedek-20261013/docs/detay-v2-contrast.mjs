// Üst başlık bloğu kontrastı: metin gizlenir, her metin kutusundaki EN AÇIK arka plan pikseli ölçülür.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-contrast.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import bundle from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright-core/lib/utilsBundle.js';
import fs from 'node:fs';
const {PNG}=bundle;
const slugs=['tavuk-curry-hindistan-cevizli-hint-usulu','iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis','sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi','kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas','duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi','tarte-de-amendoa-portekiz-algarve-usulu-karamelli-badem-tarti'];
const lum=([r,g,b])=>{const f=c=>{c/=255;return c<=.03928?c/12.92:((c+.055)/1.055)**2.4};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05)};
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
const rows=[];
for(const slug of slugs){
 const exists=await (async()=>{await p.goto('http://127.0.0.1:8765/v3-app/detay-v2.html?tarif='+slug,{waitUntil:'networkidle'});return p.evaluate(s=>DATA.recipes.some(r=>r.slug===s),slug)})();if(!exists)continue;
 await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>window.DV2_READY);await p.waitForTimeout(800);
 const items=await p.evaluate(()=>{const sel=[['kategori','.detail-cover-copy>.eyebrow',false],['başlık','.detail-cover-copy h1',true],['alt başlık','.detail-cover-copy>p',false],...[...document.querySelectorAll('.dv2-cap')].map((e,i)=>['kapsül '+(i+1),null,false,e])];return sel.map(([name,s,large,el])=>{const e=el||document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect(),c=getComputedStyle(e).color.match(/\d+/g).slice(0,3).map(Number);return {name,large,box:[r.left,r.top,r.width,r.height].map(Math.round),color:c}}).filter(Boolean)});
 // Metni ve ikonları gizle; arka plan (fotoğraf + overlay + kapsül zemini) kalır.
 await p.addStyleTag({content:'.detail-cover-copy,.detail-cover-copy *{color:transparent!important;text-shadow:none!important}.detail-cover-copy .icon{opacity:0!important}.dv2-cap-rating span{border-color:transparent!important}'});
 await p.waitForTimeout(100);
 const png=PNG.sync.read(await p.screenshot());
 for(const it of items){let max=null,maxL=-1;const [x0,y0,w,h]=it.box;for(let y=Math.max(0,y0);y<Math.min(png.height,y0+h);y++)for(let x=Math.max(0,x0);x<Math.min(png.width,x0+w);x++){const i=(y*png.width+x)*4,px=[png.data[i],png.data[i+1],png.data[i+2]],l=lum(px);if(l>maxL){maxL=l;max=px;}}
  const cr=ratio(it.color,max);rows.push({slug:slug.slice(0,40),text:it.name,textColor:'rgb('+it.color.join(',')+')',lightestBg:'rgb('+max.join(',')+')',contrast:Number(cr.toFixed(2)),required:it.large?3:4.5,pass:cr>=(it.large?3:4.5)});}
}
await b.close();
fs.writeFileSync('v3-app/docs/detay-v2-contrast.json',JSON.stringify(rows,null,1));
console.table(rows.map(r=>({tarif:r.slug.slice(0,22),metin:r.text,kontrast:r.contrast,gerekli:r.required,ok:r.pass})));
