import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {stableLocal} from '../verification/set3/http-queue.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='v3-app/docs/screenshots/home-v3-redesign',results=[];
const url='http://127.0.0.1:8765/v3-app/ana-v3.html';
const jump=async(p,y)=>{await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(80)};
for(const [engine,browserType] of [['chromium',chromium],['webkit',webkit]]){
 const browser=await browserType.launch();
 for(const width of [360,390,430]){
  const p=await browser.newPage({viewport:{width,height:844}});await stableLocal(p);const errors=[],bad=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)bad.push(r.url())});
  await p.goto(url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  assert(await p.evaluate(()=>window.HOME_V3_READY));
  const initial=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,heading:getComputedStyle(document.querySelector('h1')).visibility,sections:[...document.querySelectorAll('.six-content>section')].map(e=>e.querySelector('h2').textContent),dates:document.querySelector('.collection-block').dataset.order.split(',').map(slug=>recipeDate(DATA.recipes.find(r=>r.slug===slug))),unwanted:document.querySelectorAll('.recipe-card :is(.card-subtitle,.card-secondary,.card-badges,.card-footer)').length,cards:[...document.querySelectorAll('.recipe-card')].map(e=>{const title=e.querySelector('h3'),category=e.querySelector('.card-category'),c=getComputedStyle(title);return{width:e.offsetWidth,clamp:c.webkitLineClamp,titleHeight:title.offsetHeight,lineHeight:parseFloat(c.lineHeight),categoryWeight:getComputedStyle(category).fontWeight,radius:getComputedStyle(e.querySelector('.card-visual')).borderRadius}}),avatars:[...document.querySelectorAll('.a-chef-avatar')].map(e=>({w:e.offsetWidth,h:e.offsetHeight})),gutter:document.querySelector('.six-categories').getBoundingClientRect().left}));
  assert(initial.avatars.length===6);assert(initial.avatars.every(a=>a.w===40&&a.h===40));assert.equal(initial.overflow,false);assert.equal(initial.heading,'visible');assert.equal(initial.unwanted,0);assert.deepEqual(initial.sections,['Elinde ne var?','Kategoriler','En son eklenen tarifler','Şefler','Tarifini paylaş']);assert(initial.dates.every((d,i,a)=>!i||a[i-1]>=d));assert(initial.cards.every(c=>c.clamp==='2'&&c.titleHeight<=c.lineHeight*2+1&&Number(c.categoryWeight)>=700));
  const touch=await p.evaluate(()=>[...document.querySelectorAll('main a,main button')].filter(e=>e.getBoundingClientRect().height>0&&(e.getBoundingClientRect().height<44||e.getBoundingClientRect().width<44)).map(e=>e.textContent));assert.deepEqual(touch,[]);
  const scroll=[];
  for(let y=0;y<=400;y+=20){await jump(p,y);const row=await p.evaluate(()=>{const h=document.querySelector('.topbar'),b=h.getBoundingClientRect();return{y:scrollY,alpha:Number(h.dataset.alpha),color:getComputedStyle(h).backgroundColor,collision:[...document.querySelectorAll('.six-hero-group')].some(g=>getComputedStyle(g).visibility!=='hidden'&&g.getBoundingClientRect().top<b.bottom)}});assert(!row.collision);scroll.push(row)}
  for(const y of [0,60,120,300]){await jump(p,y);if(width===390&&engine==='chromium')await p.screenshot({path:`${dir}/scroll-${y}-390.png`})}
  await jump(p,0);assert.equal(await p.locator('h1').evaluate(e=>getComputedStyle(e).visibility),'visible');
  await p.locator('[data-site-menu]').click();await p.waitForTimeout(300);assert.equal(await p.locator('dialog[open] .v3-drawer-logo img').getAttribute('src'),'assets/marka/dadagastro-renkli.svg');assert(await p.locator('dialog[open] .v3-drawer-logo img').evaluate(e=>e.complete&&e.naturalWidth>0));if(width===390&&engine==='chromium')await p.screenshot({path:`dir/menu-390.png`.replace('dir',dir)});await p.locator('[data-drawer-close]').click();
  await p.locator('[data-six-category-toggle]').click();assert.equal(await p.locator('.six-categories h2').innerText(),'Dünya Mutfakları');await p.locator('[data-six-category-toggle]').click();assert.equal(await p.locator('.six-categories h2').innerText(),'Kategoriler');
  await p.locator('[data-set-ingredient="Patates"]').click();await p.waitForTimeout(80);assert.equal(await p.locator('[data-set-ingredient="Patates"]').getAttribute('aria-pressed'),'true');assert((await p.locator('[data-set-submit]').getAttribute('href')).includes('Patates'));assert(await p.locator('[data-set-preview] .recipe-card').count()>0);await p.screenshot({path:`${dir}/${engine}-${width}-ingredient-selected.png`,fullPage:true});await p.locator('[data-set-reset]').click();assert.equal(await p.locator('[data-set-preview]').isVisible(),false);
  await p.locator('[data-six-share]').click();assert(await p.locator('dialog[open]').count()>0);await p.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));
  // Reload after interaction tests: capture the initial state, then load visible lazy images.
  await p.reload({waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const height=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=500)await jump(p,y);
  await jump(p,0);await p.waitForTimeout(150);
  await p.screenshot({path:`${dir}/${engine}-${width}-full.png`,fullPage:true});
  await p.emulateMedia({reducedMotion:'reduce'});await jump(p,60);assert.equal(await p.locator('.topbar').getAttribute('data-alpha'),'1.000');await jump(p,0);
  assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);results.push({engine,width,initial,touch,scroll,errors,bad,interactions:'menu logo, category switch, ingredient match/reset, share gate, reduced motion passed'});await p.close();
 }
 await browser.close();
}
fs.writeFileSync('v3-app/docs/home-v3-redesign-qa.json',JSON.stringify(results,null,2));console.log('PASS: 6 viewport/engine combinations; 126 header samples.');

const browser=await chromium.launch();
const gallery=await browser.newPage({viewport:{width:1440,height:1000}});await stableLocal(gallery);
await gallery.goto('http://127.0.0.1:8765/v3-app/ana-sayfa-v3.html',{waitUntil:'networkidle'});
const galleryEvidence=[];
for(const width of [1440,390]){await gallery.setViewportSize({width,height:1000});await gallery.waitForTimeout(100);const evidence=await gallery.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,frames:[...document.querySelectorAll('iframe')].map(f=>({src:f.getAttribute('src'),width:f.contentWindow.innerWidth,height:f.contentWindow.innerHeight,scroll:f.contentWindow.scrollY,renderWidth:f.getBoundingClientRect().width})),text:document.body.innerText}));assert(!evidence.overflow);assert(evidence.frames.every(f=>f.width===390&&f.height===844&&f.scroll===0));assert(!/SET|ana-x6|ana-v3/.test(evidence.text));galleryEvidence.push(evidence);await gallery.screenshot({path:`${dir}/gallery-${width}.png`,fullPage:true})}
const p=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:3});await stableLocal(p);
for(const [file,prefix] of [['ana-1.html','before'],['ana-v3.html','after']]){await p.goto('http://127.0.0.1:8765/v3-app/'+file,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.locator('.purpose-title').screenshot({path:`v3-app/docs/screenshots/polish/home-v3-redesign/${prefix}-hero-3x.png`});await p.locator('.collection-body .recipe-card').first().scrollIntoViewIfNeeded();await p.waitForTimeout(150);await p.locator('.collection-body .recipe-card').first().screenshot({path:`v3-app/docs/screenshots/polish/home-v3-redesign/${prefix}-card-3x.png`});}
// Stress the existing component with an unmodified, real full recipe title in this test page only.
const clamp=await p.evaluate(()=>{const slug=new URL(document.querySelector('.collection-body .card-visual').href).searchParams.get('tarif'),recipe=DATA.recipes.find(r=>r.slug===slug),h=document.querySelector('.collection-body h3');h.textContent=recipe.title;const c=getComputedStyle(h);return{text:recipe.title,clamp:c.webkitLineClamp,visibleHeight:h.clientHeight,contentHeight:h.scrollHeight,lineHeight:parseFloat(c.lineHeight)}});assert.equal(clamp.clamp,'2');assert(clamp.contentHeight>clamp.visibleHeight);assert(clamp.visibleHeight<=clamp.lineHeight*2+1);await p.locator('.collection-body .recipe-card').first().screenshot({path:`${dir}/long-title-3x.png`});
fs.writeFileSync('v3-app/docs/home-v3-redesign-gallery-qa.json',JSON.stringify({galleryEvidence,clamp,testNote:'Long title is the actual full source title, injected only in the test browser; recipe data and application output were not changed.'},null,2));
await browser.close();console.log('PASS: gallery 1440/390, preserved iframe viewport, source/after crops, two-line ellipsis stress case.');
