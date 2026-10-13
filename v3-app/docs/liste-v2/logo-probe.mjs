import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {brightest} from './contrast-lib.mjs';
const urls=process.argv.slice(2);const b=await chromium.launch();
for(const u of urls){const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:8765/v3-app/'+u);await p.waitForTimeout(2500);
for(const y of [0,24,48,120]){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250);const r=await p.evaluate(()=>{const x=document.querySelector('.brand-logo img').getBoundingClientRect();return {x:x.x,y:x.y,width:x.width,height:x.height}});const m=await brightest(p,r,'.brand-logo img');console.log(u,y,JSON.stringify({rect:r,maxL:+m.maxL.toFixed(4),contrast:+m.contrastWhite.toFixed(2)}));}
await p.close();}
await b.close();
