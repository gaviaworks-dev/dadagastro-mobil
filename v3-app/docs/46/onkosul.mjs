// 46 · Ön koşul kontrolü (kod yazmadan önce): alternatifler hatasız, detay varsayılan tarif, galeri, ?radius/?rozet, menüde Videolar.
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import {stableLocal} from '../../verification/set3/http-queue.mjs';
const B='http://127.0.0.1:8765/v3-app/';const out={};
const b=await chromium.launch();
async function open(path){const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();await stableLocal(p);const err=[],bad=[];p.on('pageerror',e=>err.push(e.message));p.on('console',m=>{if(m.type()==='error')err.push(m.text())});ctx.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});await p.goto(B+path,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);return {p,ctx,err,bad};}
for(const f of ['ana-v3-alt1.html','ana-v3-alt2.html','ana-v3-alt3.html']){const {p,ctx,err,bad}=await open(f);out[f]={hata:err,ag404:bad};await ctx.close();}
{const {p,ctx,err,bad}=await open('detay-v2.html');
 out.detay={baslik:await p.evaluate(()=>document.querySelector('.detail-cover-copy h1')?.textContent.trim()),sekme:await p.evaluate(()=>[...document.querySelectorAll('[data-dv2-tab]')].map(b=>b.textContent.trim())),bilgi:await p.evaluate(()=>[...document.querySelectorAll('.dv2-info-card .dv2-card-title')].map(x=>x.textContent)),besinAlt:await p.evaluate(()=>document.querySelectorAll('.dv2-nut-rest>div').length),shuffle:await p.evaluate(()=>document.querySelectorAll('.ingredient-row [data-swap]').length),benzer:await p.evaluate(()=>({kart:document.querySelectorAll('.dv2-pairs .recipe-card').length,gosterge:document.querySelectorAll('.dv2-similar [class*=pager],.dv2-similar [class*=dots]').length}))};
 await p.click('.detail-hero [data-gallery], [data-gallery]');await p.waitForTimeout(700);
 out.detay.galeri=await p.evaluate(()=>{const d=document.querySelector('dialog.dv2-lb');const im=d?.querySelector('img');return {acik:!!d?.open,nw:im?.naturalWidth||0,sayac:d?.querySelector('.dv2-lb-count')?.textContent}});
 out.detay.hata=err;out.detay.ag404=bad;await ctx.close();}
for(const v of ['a','b','c','d']){const {p,ctx}=await open('detay-v2.html?yazar='+v);out['yazar-'+v]=await p.evaluate(()=>document.body.dataset.dv2Yazar+' '+document.querySelector('.dv2-chef').className);await ctx.close();}
for(const f of ['ana-v3.html','liste-v2.html','detay-v2.html']){const {p,ctx}=await open(f+'?radius=b&rozet=b');out['secenek-'+f]=await p.evaluate(()=>({radius:document.documentElement.dataset.dgRadius,rozet:document.documentElement.dataset.dgRozet,kartR:getComputedStyle(document.querySelector('.dg-card__media,.card-media,.dg-feature__media')).borderTopLeftRadius,rozetBg:getComputedStyle(document.querySelector('.dg-meta')).backgroundColor}));
 await p.evaluate(()=>window.openSiteDrawer());await p.waitForTimeout(400);out['menu-'+f]=await p.evaluate(()=>[...document.querySelectorAll('.om-nav>.om-item>.om-row,.om-nav>.om-group>.om-toggle')].map(r=>r.textContent.trim()));await ctx.close();}
await b.close();fs.writeFileSync('v3-app/docs/46/onkosul.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1));
