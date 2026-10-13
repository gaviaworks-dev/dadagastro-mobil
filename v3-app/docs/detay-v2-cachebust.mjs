// detay-v2.html'deki yerel CSS/JS bağlantılarına içerik SHA-256 kısa özeti ile ?v= ekler/yeniler (AGENTS yayın önbelleği kuralı).
// Yalnız detay-v2.html yazılır. Her CSS/JS değişikliğinden sonra çalıştırılır: node v3-app/docs/detay-v2-cachebust.mjs
import fs from 'node:fs';import crypto from 'node:crypto';import path from 'node:path';
const dir='v3-app',file=path.join(dir,'detay-v2.html');let html=fs.readFileSync(file,'utf8');const done=[];
html=html.replace(/(href|src)="([^"?#:]+\.(?:css|js))(?:\?v=[0-9a-f]+)?"/g,(m,attr,rel)=>{const f=path.join(dir,rel);if(!fs.existsSync(f))return m;const v=crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,10);done.push(`${rel}?v=${v}`);return `${attr}="${rel}?v=${v}"`;});
fs.writeFileSync(file,html);console.log(done.join('\n'));
