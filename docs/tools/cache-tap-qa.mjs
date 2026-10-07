import {webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:8765/yayin/';const tag=process.argv[3]||'local';
fs.mkdirSync('docs/screenshots/cache',{recursive:true});const browser=await webkit.launch();const results=[];
for(const width of [390,430]){
 const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 for(const pos of ['left','center','right']){
 await page.goto(base);await page.locator('[data-photo-entry]').tap();const row=page.locator('.photo-entry-options a').filter({hasText:'Tabaktan Tarif'});await row.waitFor();await page.waitForTimeout(300);
 const box=await row.boundingBox();const point={x:pos==='left'?8:pos==='right'?box.width-8:box.width/2,y:box.height/2};
 const hit=await row.evaluate((a,p)=>document.elementFromPoint(a.getBoundingClientRect().x+p.x,a.getBoundingClientRect().y+p.y)?.closest('a')===a,point);
 const href=await row.getAttribute('href');if(!hit||!href.startsWith('tabaktan-tarif.html?donus='))throw Error('row not native/touchable');
 if(pos==='center')await page.screenshot({path:`docs/screenshots/cache/${tag}-${width}-panel.png`});
 await row.tap({position:point});await page.waitForURL('**/tabaktan-tarif.html?*');await page.locator('.photo-camera').waitFor();
 results.push({width,pos,hit,href,url:page.url()});
 }
 await page.screenshot({path:`docs/screenshots/cache/${tag}-${width}-camera.png`});
 const assets=await page.locator('link[rel=stylesheet],script[src]').evaluateAll(es=>es.map(e=>e.getAttribute('href')||e.getAttribute('src')));if(assets.some(x=>!/[?&]v=[a-f0-9]{12}/.test(x)))throw Error('unversioned asset');
 results.push({width,assets,errors});if(errors.length)throw Error(JSON.stringify(errors));await context.close();
}
// Native navigation independently of JavaScript, using exactly the production href.
const ctx=await browser.newContext({javaScriptEnabled:false,hasTouch:true});const p=await ctx.newPage();await p.goto(base);await p.setContent(`<base href="${base}"><a href="tabaktan-tarif.html?donus=index.html" style="display:block;padding:24px">Tabaktan Tarif</a>`);await p.locator('a').tap();await p.waitForURL('**/tabaktan-tarif.html?*');results.push({javascriptDisabled:true,url:p.url()});
await browser.close();fs.writeFileSync(`docs/cache-${tag}-qa.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
