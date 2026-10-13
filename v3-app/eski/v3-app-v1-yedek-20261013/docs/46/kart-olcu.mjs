// 46 · İkişerli küçük kartın ölçüleri (ana sayfa + detay benzer tarifler), birleştirme öncesi/sonrası karşılaştırma için.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const tag=process.argv[2]||'once';const out={};
const b=await chromium.launch();
for(const [pg,sel] of [['ana-v3.html','.v3-pairs-track>.recipe-card, .dg-pairs .dg-tile'],['detay-v2.html','.dv2-pairs .recipe-card, .dg-pairs .dg-tile']]){
 for(const q of ['','?radius=b&rozet=b']){
 const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:8765/v3-app/'+pg+q,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 out[pg+q]=await p.evaluate(sel=>{const c=document.querySelector(sel);c.scrollIntoView({block:'center'});const R=e=>e.getBoundingClientRect();const cs=e=>getComputedStyle(e);const card=R(c);
  const media=c.querySelector('.card-media,.dg-tile__media'),cat=c.querySelector('.card-category,.dg-card__category'),h=c.querySelector('h3'),au=c.querySelector('.card-author-row,.dg-author'),av=c.querySelector('.dg-avatar'),me=c.querySelector('.dg-meta'),sv=c.querySelector('.dg-save');
  const rel=e=>{const r=R(e);return {x:+(r.left-card.left).toFixed(1),y:+(r.top-card.top).toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};
  const font=e=>{const s=cs(e);return [s.fontFamily.split(',')[0],s.fontSize,s.fontWeight,s.lineHeight,s.letterSpacing,s.color].join(' ')};
  return {card:{w:card.width,h:card.height},mediaR:cs(media).borderTopLeftRadius,cat:[rel(cat),font(cat)],title:[rel(h),font(h)],author:[rel(au),font(au)],avatar:[rel(av),font(av),cs(av).backgroundColor],meta:[rel(me),cs(me).backgroundColor,cs(me).borderTopLeftRadius,font(me)],save:[rel(sv),cs(sv,'::before').backgroundColor]};},sel);
 await p.close();}}
await b.close();fs.writeFileSync(`v3-app/docs/46/kart-olcu-${tag}.json`,JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1));
