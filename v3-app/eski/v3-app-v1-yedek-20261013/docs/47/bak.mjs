// 47 · Hızlı görsel bakış: verilen sayfa + seçici kırpımı (geliştirme sırasında).
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
const [,, url, sel, out, eng='chromium', w='390', act=''] = process.argv;
import {stableLocal} from '../../verification/set3/http-queue.mjs';
const b = await (eng==='webkit'?webkit:chromium).launch();
const p = await b.newPage({viewport:{width:+w,height:844}, deviceScaleFactor:2});
await stableLocal(p);
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.on('response',r=>{if(r.status()>=400)errs.push(r.status()+' '+r.url())});
await p.goto('http://127.0.0.1:8765/v3-app/'+url,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
if(act) await p.evaluate(act);
await p.waitForTimeout(600);
if(sel && sel!=='full'){const el=p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await el.screenshot({path:out});}
else await p.screenshot({path:out, fullPage: sel==='full'});
console.log(JSON.stringify(errs));
await b.close();
