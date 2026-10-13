// R1–R4 kanıtı (10 Ekim): gerçek sekme yapısı, yazar/not seçenekleri, alternatif malzeme sheet'i.
// Chromium + WebKit × 360/390/430. Ölçümler docs/detay-v2-tabs.json, görüntüler screenshots/detay-v2/r1…r4.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-tabs.mjs
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base='http://127.0.0.1:8765/v3-app/detay-v2.html';
const MISIR='tarif=misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole';
const out='v3-app/docs/screenshots/detay-v2';for(const d of ['r1','r2','r3','r4'])fs.mkdirSync(`${out}/${d}`,{recursive:true});
const res={runs:[],failures:[]};const fail=m=>res.failures.push(m);const check=(ok,m)=>{if(!ok)fail(m);return ok;};
async function open(p,q=''){await p.goto(base+(q?'?'+q:''),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(300);}
const toTop=(p,sel)=>p.evaluate(sel=>{const s=document.querySelector(sel);scrollTo({top:s.getBoundingClientRect().top+scrollY-100,behavior:'instant'})},sel).then(()=>p.waitForTimeout(200));
const jump=async(p,y)=>{await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(150);};
const st=p=>p.evaluate(()=>{const h=document.querySelector('.detail-header'),t=document.querySelector('.dv2-tabs-bar'),hb=h.getBoundingClientRect().bottom,sel=document.querySelector('.dv2-tabs [aria-selected=true]').dataset.dv2Tab,pane=document.getElementById('dv2-pane-'+sel),dock=document.querySelector('.cook-bar').getBoundingClientRect();return {y:Math.round(scrollY*10)/10,docH:document.documentElement.scrollHeight,sel,tabsGap:Math.round((t.getBoundingClientRect().top-hb)*10)/10,tabsStuck:t.classList.contains('is-stuck'),paneTopMinusTabs:Math.round((pane.getBoundingClientRect().top-t.getBoundingClientRect().bottom)*10)/10,anchor:Math.ceil(document.querySelector('.dv2-tabs-anchor').getBoundingClientRect().top+scrollY-h.getBoundingClientRect().height),dockBottom:Math.round(dock.bottom),overflowX:document.documentElement.scrollWidth>innerWidth}});

for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch();
 for(const width of [360,390,430]){
  const ctx=await b.newContext({viewport:{width,height:844},deviceScaleFactor:2});const p=await ctx.newPage();
  const errors=[];p.on('pageerror',e=>errors.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('console '+m.text())});p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  const tag=`${engine}-${width}`,run={engine,width};res.runs.push(run);
  await open(p);
  // Yerleşim sırası: ortak bilgiler çubuğun üstünde, paneller + kuyruk altında.
  run.order=await p.evaluate(()=>{const m=document.querySelector('.detail-main');return {kids:[...m.children].map(e=>e.className.split(' ')[0]),head:[...document.querySelector('.dv2-head').children].map(e=>e.className.split(' ')[0]),content:[...document.querySelector('.dv2-content').children].filter(e=>!e.hidden||e.classList.contains('dv2-pane')).map(e=>e.id||e.className.split(' ')[0])}});
  check(run.order.kids.join()==='dv2-head,dv2-tabs-anchor,dv2-tabs-bar,dv2-content',`${tag}: panel sırası ${run.order.kids}`);
  check(['dv2-facts','dv2-features','dv2-chef','description-wrap','dv2-info'].every((c,i,a)=>run.order.head.indexOf(c)>=0&&(i===0||run.order.head.indexOf(c)>run.order.head.indexOf(a[i-1]))),`${tag}: ortak bilgi sırası ${run.order.head}`);
  // ARIA
  run.aria=await p.evaluate(()=>{const tl=document.querySelector('.dv2-tabs');return {tablist:tl.getAttribute('role'),tabs:[...tl.querySelectorAll('[role=tab]')].map(t=>({sel:t.getAttribute('aria-selected'),ctl:t.getAttribute('aria-controls'),pane:document.getElementById(t.getAttribute('aria-controls'))?.getAttribute('role'),tabindex:t.tabIndex,h:Math.round(t.getBoundingClientRect().height)}))}});
  check(run.aria.tablist==='tablist'&&run.aria.tabs.length===3&&run.aria.tabs.every(t=>t.pane==='tabpanel'&&t.h>=44),`${tag}: ARIA/hedef ${JSON.stringify(run.aria)}`);
  // 1) Yapışık DEĞİLKEN sekme değişimi: kaydırma konumu aynı kalmalı.
  const s0=await st(p);const free=Math.max(0,s0.anchor-300);run.free=[];
  for(const id of ['hazirlanis','yorumlar','malzemeler']){await jump(p,free);const before=await st(p);await p.click(`[data-dv2-tab="${id}"]`);await p.waitForTimeout(350);const after=await st(p);run.free.push({id,before:before.y,after:after.y,docBefore:before.docH,docAfter:after.docH,stuck:after.tabsStuck});check(Math.abs(after.y-before.y)<1&&!after.tabsStuck&&after.sel===id,`${tag}: serbest ${id} kaydı ${before.y}→${after.y}`);}
  // 2) Yapışıkken: yeni panel çubuğun hemen altından başlamalı (y = çapa), çubuk header'a 0 px.
  run.stuck=[];
  for(const id of ['hazirlanis','yorumlar','malzemeler']){await jump(p,s0.anchor+700);const before=await st(p);const ys=[];await p.click(`[data-dv2-tab="${id}"]`);for(let i=0;i<6;i++){ys.push(Math.round(await p.evaluate(()=>scrollY)));await p.waitForTimeout(40);}const after=await st(p);run.stuck.push({id,before:before.y,after:after.y,anchor:s0.anchor,frames:ys,gap:after.tabsGap,paneTop:after.paneTopMinusTabs,docAfter:after.docH,dockBottom:after.dockBottom});
   check(before.tabsStuck&&Math.abs(after.y-s0.anchor)<1&&after.tabsStuck&&after.tabsGap===0&&Math.abs(after.paneTopMinusTabs)<=1&&ys.every(y=>Math.abs(y-s0.anchor)<1),`${tag}: yapışık ${id} ${JSON.stringify(run.stuck.at(-1))}`);
   check(after.docH>=s0.anchor+844-1,`${tag}: ${id} sayfa altı çöktü (docH ${after.docH})`);check(after.dockBottom<=844,`${tag}: alt çubuk taşıyor`);check(!after.overflowX,`${tag}: yatay taşma ${id}`);
   if(width===390)await p.screenshot({path:`${out}/r1/${engine}-390-sekme-${id}-yapisik.png`});}
  // Sayfa sonu (Yorumlar kısa sekme): en alta kaydır, alt çubuk + boşluk.
  await p.click('[data-dv2-tab="yorumlar"]');await jump(p,1e6);run.yorumlarEnd=await st(p);if(width===390)await p.screenshot({path:`${out}/r1/${engine}-390-yorumlar-sayfa-sonu.png`});
  run.yorumlarEnd.lastGap=await p.evaluate(()=>{const tail=document.querySelector('.dv2-tail'),dock=document.querySelector('.cook-bar');return Math.round(dock.getBoundingClientRect().top-tail.getBoundingClientRect().bottom)});check(run.yorumlarEnd.lastGap>=16,`${tag}: Yorumlar sonu alt boşluk ${run.yorumlarEnd.lastGap}`);
  // 3) Klavye: ok tuşları sekme değiştirir; yapışık değilken kaydırma aynı.
  await p.click('[data-dv2-tab="malzemeler"]');await jump(p,free);await p.focus('[data-dv2-tab="malzemeler"]');const kb0=await st(p);await p.keyboard.press('ArrowRight');await p.waitForTimeout(200);const kb1=await st(p);await p.keyboard.press('End');await p.waitForTimeout(200);const kb2=await st(p);await p.keyboard.press('ArrowRight');await p.waitForTimeout(200);const kb3=await st(p);
  run.keyboard={seq:[kb0.sel,kb1.sel,kb2.sel,kb3.sel],ys:[kb0.y,kb1.y,kb2.y,kb3.y],focus:await p.evaluate(()=>document.activeElement.dataset.dv2Tab)};
  check(run.keyboard.seq.join()==='malzemeler,hazirlanis,yorumlar,malzemeler'&&run.keyboard.focus==='malzemeler'&&new Set(run.keyboard.ys.map(Math.round)).size===1,`${tag}: klavye ${JSON.stringify(run.keyboard)}`);
  // 4) Pişirmeye Başla
  await p.click('#startCooking');await p.waitForTimeout(400);run.cook=await p.evaluate(()=>!!document.querySelector('dialog.cm2[open]'));await p.click('[data-cm2-close]');await p.waitForTimeout(300);check(run.cook,`${tag}: pişirme modu açılmadı`);
  // 5) Derin bağlantılar: #adimlar (tek adım, animasyonsuz), #yorumlar, ?sekme=
  for(const [q,id] of [['#adimlar','hazirlanis'],['#yorumlar','yorumlar']]){const ys=[];await p.goto('about:blank');await p.goto(base+q,{waitUntil:'domcontentloaded'});for(let i=0;i<30;i++){ys.push(Math.round(await p.evaluate(()=>scrollY)));await p.waitForTimeout(50);}await p.waitForFunction(()=>window.DV2_READY===true);await p.waitForTimeout(400);const s=await st(p);const distinct=[...new Set(ys)];run['hash'+id]={ys:distinct,final:s.y,anchor:s.anchor,sel:s.sel,gap:s.tabsGap,url:await p.evaluate(()=>location.search+location.hash)};
   check(s.sel===id&&Math.abs(s.y-s.anchor)<1&&s.tabsGap===0&&distinct.length<=2,`${tag}: ${q} açılışı ${JSON.stringify(run['hash'+id])}`);if(width===390)await p.screenshot({path:`${out}/r1/${engine}-390-hash-${id}.png`});}
  for(const id of ['hazirlanis','yorumlar']){await open(p,'sekme='+id);const s=await st(p);run['param'+id]={sel:s.sel,y:s.y};check(s.sel===id&&s.y===0,`${tag}: ?sekme=${id}`);}
  // 6) Şeffaf/yapışma ilk ekran görüntüleri ve 3 sekme serbest hâlde (390)
  if(width===390){await open(p);await p.screenshot({path:`${out}/r1/${engine}-390-ilk-ekran.png`});const a=(await st(p)).anchor;for(const id of ['malzemeler','hazirlanis','yorumlar']){await jump(p,a-260);await p.click(`[data-dv2-tab="${id}"]`);await p.waitForTimeout(300);await p.screenshot({path:`${out}/r1/${engine}-390-sekme-${id}-serbest.png`});}}
  // R2/R3: seçenekler — hedefler, kontrast, görüntüler
  for(const v of ['a','b','c','d']){
   await open(p,`yazar=${v}&not=${v==='a'?'a':'b'}&${MISIR}`);
   const m=await p.evaluate(()=>{const rgb=c=>{const m=c.match(/[\d.]+/g).map(Number);return /^color\(srgb/.test(c)?m.slice(0,3).map(x=>x*255).concat(m.slice(3)):m};const lum=c=>{const m=rgb(c);const f=x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4};return .2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2])};const bgOf=e=>{for(let n=e;n;n=n.parentElement){const c=getComputedStyle(n).backgroundColor;if(c==='transparent')continue;const a=rgb(c);if(a.length&&(a.length<4||+a[3]>.95))return c;}return 'rgb(255,255,255)'};const ratio=e=>{const a=lum(getComputedStyle(e).color),b=lum(bgOf(e));return Math.round(((Math.max(a,b)+.05)/(Math.min(a,b)+.05))*100)/100};
    const items=[...document.querySelectorAll('.dv2-chef-badge span,.dv2-chef-name,.dv2-stat,.dv2-x-counts dd,.dv2-x-counts dt,.dv2-x-state[data-on=true] span,.dv2-follow span,.dv2-subscribe span,.dv2-info-card .dv2-card-title,.dv2-info-card .dv2-card-text,.dv2-card-more')].filter(e=>e.offsetParent).map(e=>({cls:e.className||e.parentElement.className,txt:e.textContent.trim().slice(0,24),size:parseFloat(getComputedStyle(e).fontSize),ratio:ratio(e)}));
    const targets=[...document.querySelectorAll('.dv2-chef-a .dv2-chef-id,.dv2-chef-x,.dv2-follow,.dv2-subscribe,.dv2-info-card')].map(e=>({cls:e.className.split(' ')[0],h:Math.round(e.getBoundingClientRect().height),w:Math.round(e.getBoundingClientRect().width)}));
    const chef=document.querySelector('.dv2-chef'),facts=document.querySelector('.dv2-facts');return {items,targets,chefCount:document.querySelectorAll('.dv2-chef').length,chefBorder:getComputedStyle(chef).borderTopWidth,chefRadius:getComputedStyle(chef).borderTopLeftRadius,factsBorder:getComputedStyle(facts).borderTopWidth,avatar:(()=>{const a=chef.querySelector('.dv2-avatar');const c=getComputedStyle(a);return [c.width,c.height,c.minWidth,c.minHeight,c.borderRadius]})(),overflowX:document.documentElement.scrollWidth>innerWidth}});
   run['secenek'+v]=m;check(m.items.every(i=>i.ratio>=4.5),`${tag}: ${v} kontrast ${JSON.stringify(m.items.filter(i=>i.ratio<4.5))}`);check(m.targets.filter(t=>t.cls!=='dv2-info-card').every(t=>t.h>=44),`${tag}: ${v} hedef ${JSON.stringify(m.targets)}`);check(m.chefCount===1&&!m.overflowX,`${tag}: ${v} tek yazar/taşma`);check(m.avatar.slice(0,4).every(x=>x==='56px'),`${tag}: avatar ${m.avatar}`);
   await toTop(p,'.dv2-chef');await p.locator('.dv2-chef').screenshot({path:`${out}/r2/${engine}-${width}-yazar-${v}.png`});
   await p.evaluate(()=>{const s=document.querySelector('.dv2-chef');scrollTo({top:s.getBoundingClientRect().top+scrollY-140,behavior:'instant'})});await p.waitForTimeout(250);if(width===390)await p.screenshot({path:`${out}/r2/${engine}-390-yazar-${v}-baglam.png`});
   if(v==='a'){await toTop(p,'.dv2-info');await p.locator('.dv2-info').screenshot({path:`${out}/r3/${engine}-${width}-bilgi-karti.png`});}
  }
  // Yazar b/c/d: en uzun gerçek ad (Şahnur Poyrazoğlu, sagdana) + yapay çok uzun ad/unvan stres testi (yalnız test DOM'unda).
  // Veride hiçbir şefin fotoğrafı yok: tüm testler fotoğrafsız (baş harf) durumdur.
  run.yazarX={};
  for(const v of ['b','c','d']){
   await open(p,`yazar=${v}&tarif=sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi`);
   const geo=()=>p.evaluate(()=>{const c=document.querySelector('.dv2-chef-x'),n=c.querySelector('.dv2-chef-name>span')||c.querySelector('.dv2-chef-name'),lh=parseFloat(getComputedStyle(n).lineHeight);const kids=[...c.querySelectorAll('.dv2-avatar,.dv2-chef-name,.dv2-chef-badge,.dv2-chef-stats,.dv2-x-counts,.dv2-follow,.dv2-subscribe')].map(e=>e.getBoundingClientRect());let overlap=0;for(let i=0;i<kids.length;i++)for(let j=i+1;j<kids.length;j++){const a=kids[i],b=kids[j];if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1)overlap++;}const cr=c.getBoundingClientRect();const clipped=[...c.querySelectorAll('.dv2-x-counts dd,.dv2-x-counts dt,.dv2-chef-badge span,.dv2-x-state span,.dv2-chef-stats .dv2-stat')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+1).length;return {nameLines:Math.round(n.getBoundingClientRect().height/lh),ellipsis:n.scrollWidth>n.clientWidth+1,clipped,overlap,outside:kids.filter(k=>k.left<cr.left-.5||k.right>cr.right+.5).length,h:Math.round(cr.height),photo:getComputedStyle(c.querySelector('.dv2-avatar')).backgroundImage}});
   const real=await geo();check(real.nameLines===1&&!real.overlap&&!real.outside&&real.photo==='none',`${tag}: yazar ${v} gerçek uzun ad ${JSON.stringify(real)}`);
   await toTop(p,'.dv2-chef');await p.locator('.dv2-chef').screenshot({path:`${out}/r2/${engine}-${width}-yazar-${v}-uzun-ad.png`});
   await p.evaluate(()=>{const c=document.querySelector('.dv2-chef-x');(c.querySelector('.dv2-chef-name>span')||c.querySelector('.dv2-chef-name')).textContent='Ayşegül Nilüfer Karamustafaoğlu-Büyükyıldırım';c.querySelectorAll('.dv2-x-counts dd').forEach((d,i)=>{if(i<2)d.textContent=['12.450','128.300'][i];});c.querySelectorAll('.dv2-chef-stats .dv2-stat b').forEach((d,i)=>{if(i<2)d.textContent=['12.450','128.300'][i];});const bd=c.querySelector('.dv2-chef-badge span');if(bd)bd.textContent='Kıdemli Kısım Şefi Yardımcısı';});await p.waitForTimeout(100);
   const stres=await geo();check((v==='b'?stres.nameLines===1&&stres.ellipsis:stres.nameLines<=2)&&!stres.overlap&&!stres.outside&&(v!=='b'||!stres.clipped),`${tag}: yazar ${v} stres (uzun ad + 12.450 / 128.300) ${JSON.stringify(stres)}`);
   await toTop(p,'.dv2-chef');await p.locator('.dv2-chef').screenshot({path:`${out}/r2/${engine}-${width}-yazar-${v}-stres.png`});
   // b: sekme=hazirlanis / sekme=yorumlar'da kart aynı (boyut + stil imzası)
   if(v==='b'){const sig=()=>p.evaluate(()=>{const c=document.querySelector('.dv2-chef-b'),cs=getComputedStyle(c);return JSON.stringify({w:Math.round(c.getBoundingClientRect().width),h:Math.round(c.getBoundingClientRect().height),bg:cs.backgroundColor,b:cs.borderTopWidth,r:cs.borderTopLeftRadius,kids:[...c.querySelectorAll('.dv2-avatar,.dv2-chef-name,.dv2-x-counts,.dv2-follow,.dv2-subscribe')].map(e=>{const r=e.getBoundingClientRect(),cr=c.getBoundingClientRect();return [Math.round(r.left-cr.left),Math.round(r.top-cr.top),Math.round(r.width),Math.round(r.height)]})})});const sigs={};for(const t of ['','&sekme=hazirlanis','&sekme=yorumlar']){await open(p,`yazar=b&tarif=sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi${t}`);sigs[t||'malzemeler']=await sig();}run.yazarBSekme=sigs;check(new Set(Object.values(sigs)).size===1,`${tag}: yazar b sekmeye göre değişti ${JSON.stringify(sigs)}`);}
   // Takip durumu (üye önizlemesi): "Takip ediliyor", kart yüksekliği ve düğme genişliği değişmez.
   await p.evaluate(()=>sessionStorage.setItem('dadagastro-member-preview','1'));await open(p,`yazar=${v}`);
   const before=await p.evaluate(()=>{const c=document.querySelector('.dv2-chef-x'),f=c.querySelector('[data-dv2-follow]');return {h:c.getBoundingClientRect().height,w:f.getBoundingClientRect().width,label:[...f.querySelectorAll('.dv2-x-state')].find(x=>x.dataset.on==='true').textContent.trim()}});
   await toTop(p,'.dv2-chef');await p.click('.dv2-chef-x [data-dv2-follow]');await p.waitForTimeout(300);
   const after=await p.evaluate(()=>{const c=document.querySelector('.dv2-chef-x'),f=c.querySelector('[data-dv2-follow]');return {h:c.getBoundingClientRect().height,w:f.getBoundingClientRect().width,label:[...f.querySelectorAll('.dv2-x-state')].find(x=>x.dataset.on==='true').textContent.trim(),pressed:f.getAttribute('aria-pressed'),toast:document.querySelector('.toast')?.textContent||''}});
   if(width===390)await p.locator('.dv2-chef').screenshot({path:`${out}/r2/${engine}-390-yazar-${v}-takipte.png`});
   check(before.label==='Takip et'&&after.label==='Takip ediliyor'&&after.pressed==='true'&&Math.abs(after.h-before.h)<.5&&Math.abs(after.w-before.w)<.5&&!/profili yakında/.test(after.toast),`${tag}: yazar ${v} takip durumu ${JSON.stringify({before,after})}`);
   // Kartın boş alanına dokununca profil bildirimi (bütün kart profile gider)
   const box=await p.locator('.dv2-chef-x').boundingBox();await p.mouse.click(box.x+box.width-12,box.y+box.height-8);await p.waitForTimeout(250);
   const t=await p.evaluate(()=>document.querySelector('.toast')?.textContent||'');check(/profili yakında/.test(t),`${tag}: yazar ${v} kart geneli profil (${t})`);
   await p.evaluate(()=>sessionStorage.removeItem('dadagastro-member-preview'));
   run.yazarX[v]={real,stres,before,after};
  }
  // Profil bağlantısı: sahte sayfa açılmaz, bildirim verir.
  await open(p);const url0=p.url();await p.click('.dv2-chef-id');await p.waitForTimeout(300);run.profile={sameUrl:p.url()===url0,toast:await p.evaluate(()=>document.querySelector('.toast')?.textContent||'')};check(run.profile.sameUrl&&/profili yakında/.test(run.profile.toast),`${tag}: profil bağlantısı ${JSON.stringify(run.profile)}`);
  // R4: alternatif — mısır koçanı (var) ve Tavuk Curry (yok)
  await open(p,MISIR);
  run.alt=await p.evaluate(()=>[...document.querySelectorAll('.ingredient-row')].map(r=>{const name=r.querySelector('.ingredient-name').textContent.trim().replace(/\s+/g,' ');const btn=[...r.querySelectorAll('.ingredient-actions .icon-button')].map(b=>{const x=b.getBoundingClientRect();return {k:b.matches('[data-swap]')?'swap':'cart',l:Math.round(x.left),r:Math.round(x.right),w:Math.round(x.width),h:Math.round(x.height),icon:b.querySelector('.icon')?.className}});const info=r.querySelector('.amount .icon')?'ölçü-i':'';return {name,btn,info}}));
  for(const row of run.alt){const sw=row.btn.find(b=>b.k==='swap'),cart=row.btn.find(b=>b.k==='cart');if(sw)check(sw.w>=44&&sw.h>=44&&cart&&sw.l>=cart.r&&/fa-shuffle/.test(sw.icon),`${tag}: shuffle hedef/çakışma ${JSON.stringify(row)}`);}
  check(run.alt.filter(r=>r.btn.some(b=>b.k==='swap')).map(r=>r.name.split(' ').slice(-2).join(' ')).join('|')==='limon suyu|toz pektin|toz şeker',`${tag}: alternatifli satırlar ${run.alt.map(r=>r.name+':'+r.btn.length)}`);
  await p.evaluate(()=>{const s=document.querySelector('.ingredient-row [data-swap]');scrollTo({top:s.getBoundingClientRect().top+scrollY-360,behavior:'instant'})});await p.waitForTimeout(250);
  if(width===390)await p.screenshot({path:`${out}/r4/${engine}-390-alternatif-kapali.png`});
  for(let k=0;k<3;k++){await p.locator('.ingredient-row [data-swap]').nth(k).click();await p.waitForTimeout(450);const sh=await p.evaluate(()=>{const d=document.querySelector('dialog[open]');return d&&{title:d.querySelector('h2')?.textContent.trim(),base:d.querySelector('.dv2-alt-base p')?.textContent.replace(/\s+/g,' ').trim(),alts:[...d.querySelectorAll('.dv2-alt-item')].map(i=>({name:i.querySelector('.dv2-alt-name').textContent.trim(),ratio:i.querySelector('.dv2-alt-ratio')?.textContent.replace(/\s+/g,' ').trim()||null,note:i.querySelector('.dv2-alt-note')?.textContent.trim()})),grip:!!d.querySelector('.handle'),overflowX:d.scrollWidth>d.clientWidth}});(run.altSheets||=[]).push(sh);check(sh&&sh.title==='Yerine ne kullanabilirim?'&&sh.grip&&sh.alts.length>=1&&!sh.overflowX,`${tag}: alternatif sheet ${k} ${JSON.stringify(sh)}`);if(width===390)await p.screenshot({path:`${out}/r4/${engine}-390-alternatif-acik-${k+1}.png`});await p.keyboard.press('Escape');await p.waitForTimeout(350);}
  // Ölçü bilgi (i) davranışı korunur
  const hasInfo=await p.locator('.ingredient-row .amount [data-measure],.ingredient-row .amount button').count();run.measureButtons=hasInfo;
  await open(p,'tarif=tavuk-curry-hindistan-cevizli-hint-usulu');run.noAlt=await p.evaluate(()=>({swaps:document.querySelectorAll('[data-swap],.dv2-swap').length,hasSwapsClass:document.querySelector('.ingredient-section').classList.contains('dv2-has-swaps'),actions:[...document.querySelectorAll('.ingredient-row .ingredient-actions')].map(a=>Math.round(a.getBoundingClientRect().width))}));
  check(run.noAlt.swaps===0&&!run.noAlt.hasSwapsClass&&run.noAlt.actions.every(w=>w===44),`${tag}: alternatifsiz tarifte değişiklik ${JSON.stringify(run.noAlt)}`);
  if(width===390){await p.evaluate(()=>{const s=document.querySelector('.ingredients');scrollTo({top:s.getBoundingClientRect().top+scrollY-260,behavior:'instant'})});await p.waitForTimeout(250);await p.screenshot({path:`${out}/r4/${engine}-390-alternatifsiz-curry.png`});}
  run.errors=errors;check(!errors.length,`${tag}: konsol/ağ ${errors}`);
  await ctx.close();
 }
 await b.close();
}
// Yan yana karşılaştırmalar (Chromium 390): yazar a|b, not a|b, sekmeler.
{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:400}});
 const pair=async(files,labels,dest)=>{const imgs=files.map(f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64'));await p.setContent(`<body style="margin:0;background:#ECECEC;font:600 15px system-ui"><div style="display:flex;gap:24px;padding:16px;align-items:flex-start">${imgs.map((s,i)=>`<figure style="margin:0;background:#fff;padding:12px"><figcaption style="margin-bottom:8px">${labels[i]}</figcaption><img src="${s}" style="width:${files.length>2?300:390}px;display:block"></figure>`).join('')}</div></body>`);await p.screenshot({path:dest,fullPage:true});};
 await pair([`${out}/r2/chromium-390-yazar-a-baglam.png`,`${out}/r2/chromium-390-yazar-b-baglam.png`],['?yazar=a · kimlik kartı','?yazar=b · A\'nın zengin sürümü'],`${out}/r2/yazar-a-b-yanyana.png`);
 await pair(['a','b','c','d'].map(v=>`${out}/r2/chromium-390-yazar-${v}-baglam.png`),['?yazar=a · kimlik kartı (referans)','?yazar=b · A\'nın zengin sürümü','?yazar=c · istatistik odaklı kart','?yazar=d · ortalı tanıtım kartı'],`${out}/r2/yazar-a-b-c-d-yanyana.png`);
 await pair(['b','c','d'].map(v=>`${out}/r2/chromium-360-yazar-${v}-stres.png`),['b · 360 stres','c · 360 stres','d · 360 stres'],`${out}/r2/yazar-bcd-stres-360.png`);
 await pair(['b','c','d'].map(v=>`${out}/r2/chromium-390-yazar-${v}-takipte.png`),['b · Takip ediliyor','c · Takip ediliyor','d · Takip ediliyor'],`${out}/r2/yazar-bcd-takipte.png`);
 await pair([`${out}/r2/chromium-390-yazar-a.png`,`${out}/r2/chromium-390-yazar-b.png`],['?yazar=a (yakın)','?yazar=b (yakın)'],`${out}/r2/yazar-a-b-yakin.png`);
 // Bilgi kartı tek tasarım (10 Ekim): not=a|b karşılaştırması kaldırıldı; bkz. docs/detay-v2-not.mjs.
 await pair(['malzemeler','hazirlanis','yorumlar'].map(id=>`${out}/r1/chromium-390-sekme-${id}-yapisik.png`),['Malzemeler','Hazırlanış','Yorumlar'],`${out}/r1/uc-sekme-yapisik.png`);
 await pair(['malzemeler','hazirlanis','yorumlar'].map(id=>`${out}/r1/chromium-390-sekme-${id}-serbest.png`),['Malzemeler (serbest)','Hazırlanış (serbest)','Yorumlar (serbest)'],`${out}/r1/uc-sekme-serbest.png`);
 await pair([`${out}/r4/chromium-390-alternatif-kapali.png`,`${out}/r4/chromium-390-alternatif-acik-1.png`,`${out}/r4/chromium-390-alternatifsiz-curry.png`],['Mısır koçanı · kapalı','Sheet açık (limon suyu)','Tavuk Curry · alternatif yok'],`${out}/r4/alternatif-yanyana.png`);
 await b.close();}
fs.writeFileSync('v3-app/docs/detay-v2-tabs.json',JSON.stringify(res,null,1));
console.log(res.failures.length?'BAŞARISIZ:\n'+res.failures.join('\n'):'Tüm kontroller geçti');
for(const r of res.runs)console.log(r.engine,r.width,'serbest',r.free.map(f=>`${f.id}:${f.before}→${f.after}`).join(' '),'| yapışık',r.stuck.map(s=>`${s.id}:${s.before}→${s.after} (çapa ${s.anchor}, gap ${s.gap})`).join(' '),'| #adimlar',JSON.stringify(r.hashhazirlanis?.ys));
