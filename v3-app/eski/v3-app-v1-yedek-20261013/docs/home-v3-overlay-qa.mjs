import{chromium}from'/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import{stableLocal}from'../verification/set3/http-queue.mjs';
import fs from'node:fs';import assert from'node:assert/strict';
const dir='v3-app/docs/screenshots/home-v3-overlay',evidence=[];
const browser=await chromium.launch();
for(const width of [360,390,430]){
 const p=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:2});await stableLocal(p);let images=[];
 for(const file of ['ana-1','ana-v3']){
  await p.goto('http://127.0.0.1:8765/v3-app/'+file+'.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const height=Math.ceil(await p.locator('.purpose-banner').evaluate(e=>e.getBoundingClientRect().height));
  const png=await p.screenshot({path:`${dir}/${file}-${width}-hero-2x.png`,clip:{x:0,y:0,width,height}});images.push({file,src:'data:image/png;base64,'+png.toString('base64'),height});
  if(file==='ana-v3'){
   const state=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,photos:document.querySelectorAll('.x-scene-photo .x-photo').length,curve:getComputedStyle(document.querySelector('.x-scene-shade')).backgroundImage,lightHeight:getComputedStyle(document.querySelector('.x-hero'),':after').height,photoFilter:getComputedStyle(document.querySelector('.x-photo')).filter,photoMask:getComputedStyle(document.querySelector('.x-photo')).maskImage,boxes:['.topbar img','h1','.x-recipe small','.x-recipe strong'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return{s,x:r.x,y:r.y,w:r.width,h:r.height}})}));assert.equal(state.photos,1);assert.equal(state.overflow,false);assert.equal(state.photoFilter,'none');assert.equal(state.photoMask,'none');
   await p.addStyleTag({content:'.purpose-title,.x-scene-copy,.topbar{visibility:hidden!important}'});
   const bg=await p.screenshot({clip:{x:0,y:0,width,height}});
   const contrast=await p.evaluate(async({src,boxes})=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const ctx=c.getContext('2d');ctx.drawImage(i,0,0);return boxes.map(b=>{const pix=ctx.getImageData(Math.round(b.x*2),Math.round(b.y*2),Math.floor(b.w*2),Math.floor(b.h*2)).data;let maxL=0;for(let j=0;j<pix.length;j+=4){let rgb=[pix[j],pix[j+1],pix[j+2]].map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});maxL=Math.max(maxL,.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2])}return{selector:b.s,minWhiteContrast:1.05/(maxL+.05)}})},{src:'data:image/png;base64,'+bg.toString('base64'),boxes:state.boxes});
   // Isolate the curve from actual shelf/plate texture; inspect 2x raster row continuity.
   await p.addStyleTag({content:'.x-photo{background-image:none!important;background-color:white!important}'});
   const veil=await p.screenshot({path:`${dir}/curve-only-${width}-2x.png`,clip:{x:0,y:0,width,height:height-24}});
   const continuity=await p.evaluate(async src=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const ctx=c.getContext('2d');ctx.drawImage(i,0,0);const d=ctx.getImageData(Math.floor(i.width/2),0,1,i.height).data;let maxStep=0,at=0;for(let j=4;j<d.length;j+=4){for(let k=0;k<3;k++){const step=Math.abs(d[j+k]-d[j-4+k]);if(step>maxStep){maxStep=step;at=j/4/2}}}return{maxChannelStepPerHalfCssPixel:maxStep,atCssY:at}},'data:image/png;base64,'+veil.toString('base64'));
   evidence.push({width,state,contrast,continuity});assert(contrast.every(c=>c.minWhiteContrast>=4.5));assert(continuity.maxChannelStepPerHalfCssPixel<=3);
  }
 }
 await p.close();
 const compare=await browser.newPage({viewport:{width:width*2+48,height:650},deviceScaleFactor:2});await compare.setContent(`<html><body style="margin:0;background:#f4f4f4;font:16px Arial"><div style="display:flex;gap:16px;padding:16px">${images.map(i=>`<div><div style="height:28px">${i.file==='ana-1'?'V2 · Sinematik seçim':'V3 · Yeni hero'}</div><img width="${width}" src="${i.src}"></div>`).join('')}</div></body></html>`);await compare.screenshot({path:`${dir}/compare-${width}-2x.png`,fullPage:true});await compare.close();
}
fs.writeFileSync('v3-app/docs/home-v3-overlay-qa.json',JSON.stringify(evidence,null,2));console.log(evidence.map(({width,contrast,continuity})=>({width,contrast,continuity})));await browser.close();
