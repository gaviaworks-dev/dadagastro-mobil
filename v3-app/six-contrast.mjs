import { chromium } from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:8765/v3-app/';
const out = 'docs/screenshots/v3-six-contrast';
const prefix = process.env.SIX_CONTRAST_PREFIX || '';
const filePrefix = prefix ? `${prefix}-` : '';
fs.mkdirSync(out, { recursive: true });
const modes = ['a','b','c','d','e','f'];
const widths = [360,390,430];
const browser = await chromium.launch();
const results = [];
const spacingFiles = ['v3-app/six-home.css','v3-app/six-heroes.css'];
const spacingFindings = [];
for (const file of spacingFiles) {
  const css=fs.readFileSync(file,'utf8');
  for (const [i,line] of css.split('\n').entries()) {
    for (const m of line.matchAll(/(?:^|[;{])\s*(margin(?:-[\w-]+)?|padding(?:-[\w-]+)?|gap|row-gap|column-gap)\s*:\s*([^;}]+)/g)) if (!m[2].includes('var(') && /\d+(?:\.\d+)?px/.test(m[2])) spacingFindings.push({file,line:i+1,property:m[1],value:m[2].trim()});
  }
}
for (const width of widths) for (const mode of modes) {
  const page=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}ana-${mode}.html`,{waitUntil:'networkidle'}); await page.evaluate(()=>document.fonts.ready);
  const layout=await page.evaluate(()=>{
    const rect=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};
    const cs=s=>{const e=document.querySelector(s);return e?getComputedStyle(e):null};
    const styles=['.six-hero','.six-content','.six-category','.six-video-card','.six-fridge','.six-chef','.topbar','.nav-dock'];
    return {width:innerWidth,docWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,rects:Object.fromEntries(['.topbar .brand-logo','.top-actions','.six-hero','.six-content','.six-category-rail','.six-video-rail','.six-fridge','.six-chefs','.nav-dock'].map(s=>[s,rect(s)])),radii:Object.fromEntries(styles.map(s=>[s,cs(s)?.borderRadius||null])),photoCount:document.querySelectorAll('.six-hero .photo,.six-video-picture .photo').length,heroPhotoUrls:[...new Set([...document.querySelectorAll('.six-hero .photo')].map(e=>getComputedStyle(e).backgroundImage).filter(x=>x&&x!=='none'))],iconSizes:[...new Set([...document.querySelectorAll('.six-home .icon')].map(e=>getComputedStyle(e).fontSize))]};
  });
  let contrast=null;
  if(width===390){
    const normalPng=await page.screenshot({type:'png'});fs.writeFileSync(path.join(out,`${filePrefix}ana-${mode}-390-visual.png`),normalPng);
    const textTargets=await page.evaluate(()=>{
      const sels=['.six-cinema-copy','.six-video-copy','.six-day-copy','.six-discovery-copy','.six-story-copy'];
      const els=[...document.querySelectorAll(sels.join(','))];
      const texts=[];
      for(const el of els){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(!n.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(n);for(const r of range.getClientRects())if(r.width&&r.height){const parent=n.parentElement;const fs=parseFloat(getComputedStyle(parent).fontSize);texts.push({text:n.textContent.trim(),rect:{x:r.x,y:r.y,w:r.width,h:r.height},small:fs<=13});}}}
      const logo=document.querySelector('.topbar .brand-logo img');if(logo){const r=logo.getBoundingClientRect();texts.push({text:'Header logo background',rect:{x:r.x,y:r.y,w:r.width,h:r.height},small:false});}
      const style=document.createElement('style');style.textContent=`${sels.join(',')} * {color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}.topbar .brand-logo{visibility:hidden!important}`;document.head.append(style);
      return texts;
    });
    const png=await page.screenshot({type:'png'});
    const png64=png.toString('base64');
    contrast=await page.evaluate(async({png64,textTargets})=>{
      const im=new Image();im.src='data:image/png;base64,'+png64;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);const rows=[];
      for(const t of textTargets){const l=Math.max(0,Math.floor(t.rect.x)),top=Math.max(0,Math.floor(t.rect.y)),r=Math.min(c.width,Math.ceil(t.rect.x+t.rect.w)),b=Math.min(c.height,Math.ceil(t.rect.y+t.rect.h));if(r<=l||b<=top)continue;const d=x.getImageData(l,top,r-l,b-top).data;let max=0;for(let i=0;i<d.length;i+=4){const f=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4};const lum=.2126*f(d[i])+.7152*f(d[i+1])+.0722*f(d[i+2]);if(lum>max)max=lum;}const cr=1.05/(max+.05);rows.push({text:t.text,role:t.small?'small':'large',brightestLuminance:+max.toFixed(4),whiteContrast:+cr.toFixed(2),pass:cr>=(t.small?4.5:3)});}
      return rows;
    },{png64,textTargets});
    fs.writeFileSync(path.join(out,`${filePrefix}ana-${mode}-390-measure.png`),png);
  }
  results.push({mode,width,layout,contrast,errors}); await page.close();
}
await browser.close();
const report={generatedAt:new Date().toISOString(),method:'Chromium viewport screenshot; target hero text temporarily made transparent; screenshot PNG decoded in-page with canvas; maximum relative luminance sampled over each text Range rectangle; white-text contrast computed as 1.05/(Lmax+0.05).',spacingFindings,results};
fs.writeFileSync(path.join(out,`${filePrefix}report.json`),JSON.stringify(report,null,2));
console.log(JSON.stringify({screenshots:results.filter(r=>r.width===390).map(r=>`${filePrefix}ana-${r.mode}-390-visual.png`),measurements:results.filter(r=>r.width===390).map(r=>`${filePrefix}ana-${r.mode}-390-measure.png`),spacingFindings,overflow:results.filter(r=>r.layout.docWidth>r.width).map(r=>({mode:r.mode,width:r.width,docWidth:r.layout.docWidth})),contrastFailures:results.filter(r=>r.width===390).flatMap(r=>(r.contrast||[]).filter(x=>!x.pass).map(x=>({mode:r.mode,...x}))),report:path.join(out,`${filePrefix}report.json`)},null,2));
