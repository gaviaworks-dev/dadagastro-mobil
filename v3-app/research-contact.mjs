import { chromium } from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('docs/screenshots/v3-hero-ref/manifest.json'));
const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:1600,height:1000}});
for(let start=0;start<data.length;start+=4){let rows=data.slice(start,start+4);await page.setContent(`<style>body{margin:0;background:#ddd;font:16px Arial}.row{display:flex;height:340px}.row img{height:310px;max-width:360px;object-fit:contain}b{width:120px}figure{margin:4px}figcaption{font-size:12px}</style>`+rows.map(r=>`<div class=row><b>${r.name}</b>${(r.images||[]).map((i,n)=>`<figure><img src="data:image/png;base64,${fs.readFileSync(i.path).toString('base64')}"><figcaption>${n}</figcaption></figure>`).join('')}</div>`).join(''));await page.screenshot({path:`docs/screenshots/v3-hero-ref/contact-${start}.png`,fullPage:true});}await browser.close();
