import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const dir='v3-app/verification/a-smile-join',rows=JSON.parse(fs.readFileSync(`${dir}/after.json`));
const b=await chromium.launch(),p=await b.newPage({viewport:{width:780,height:880}});
const uri=(phase,n,w)=>'data:image/png;base64,'+fs.readFileSync(`${dir}/${phase}-${n}-${w}.png`).toString('base64');
await p.setContent(`<body style="margin:0;display:flex;font:18px sans-serif"><div>Önce<img style="display:block" src="${uri('before','a',390)}"></div><div>Sonra<img style="display:block" src="${uri('after','a',390)}"></div></body>`);await p.screenshot({path:`${dir}/before-after.png`,fullPage:true});
await p.setViewportSize({width:1290,height:900});await p.setContent(`<body style="margin:0;background:#ddd;font:18px sans-serif;display:grid;grid-template-columns:repeat(3,430px)">${rows.filter(x=>x.name?.startsWith('a')).map(x=>`<div>${x.name} · ${x.width}<div style="height:190px;overflow:hidden"><img style="display:block;transform:translateY(-${x.bannerBottom-90}px)" src="${uri('after',x.name,x.width)}"></div></div>`).join('')}</body>`);await p.screenshot({path:`${dir}/all-joins.png`,fullPage:true});await b.close();
console.log(JSON.stringify(rows.filter(x=>x.name?.startsWith('a')).map(r=>({name:r.name,width:r.width,heroRadius:r.bannerRadius,panelRadius:r.panelRadius,panelBorder:r.panelBorder,outsideStrip:-r.overlap,answerGap:r.answerGap,overflow:r.overflow,headerOverlaps:r.scrollChecks.filter(x=>x.overlaps).length})),null,2));
console.log('B-F PNG equality',Object.fromEntries(['b','c','d','e','f'].map(n=>[n,fs.readFileSync(`${dir}/before-${n}-390.png`).equals(fs.readFileSync(`${dir}/after-${n}-390.png`))])));
