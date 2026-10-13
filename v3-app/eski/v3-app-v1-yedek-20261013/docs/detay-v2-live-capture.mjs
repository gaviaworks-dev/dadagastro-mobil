// Canlı web tarif detayından (salt okuma) 390 bölüm kırpımları: mobil ile yan yana karşılaştırma için.
// Çalıştırma (proje kökünden): node v3-app/docs/detay-v2-live-capture.mjs
import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
const dir='v3-app/docs/screenshots/detay-v2/canli';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
for(const [slug,name] of [['misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole','misir'],['tavuk-curry-hindistan-cevizli-hint-usulu','curry'],['sebzeli-tavuk-sote-tavada-pratik','sote']]){
 await p.goto('https://dadagastro.com/tarif/'+slug,{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(1200);const reject=p.getByRole('button',{name:'Reddet'});if(await reject.count()&&await reject.first().isVisible()){await reject.first().click();await p.waitForTimeout(400);}
 await p.screenshot({path:`${dir}/${name}-tam-boy.png`,fullPage:true});
 for(const [sel,part] of [['.rd-stage','sahne'],['.kc-card','kunye'],['.rd-head','yazar-aciklama'],['.ing-panel','malzemeler'],['.steps-flow .step-card','adim-1'],['.note-duo','hatirlatma'],['.nut-card','besin'],['.rev-summary','yorum-ozeti'],['.rev-filter','yorum-filtresi']]){const l=p.locator(sel).first();if(await l.count()&&await l.isVisible()){await l.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await l.screenshot({path:`${dir}/${name}-${part}.png`});}}
 const swap=p.locator('.ing-swap').first();if(await swap.count()){await swap.scrollIntoViewIfNeeded();await swap.click();await p.waitForTimeout(400);await p.locator('.ing-row.swap-open').first().screenshot({path:`${dir}/${name}-alternatif-popover.png`});}
}
await b.close();console.log('ok');
