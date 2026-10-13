import {chromium} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const b=await chromium.launch({headless:true});const p=await b.newPage();
await p.goto('http://127.0.0.1:8765/v3-app/liste-a.html');
const data=await p.evaluate(()=>({recipes:DATA.recipes.map(r=>({slug:r.slug,image:r.image})),tips:WEB.tips,daySlug:DATA.daySlug}));
fs.writeFileSync('v3-app/home-media.js','const HOME_MEDIA='+JSON.stringify(data)+';\n');await b.close();
