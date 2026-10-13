// D2 · liste-v2.html'deki bütün yerel CSS/JS bağlantılarına içerik özeti (SHA-256, ilk 10 hane) ?v= ekler.
// Dosya değişince özet değişir, tarayıcı eski CSS/JS'i önbellekten getirmez. Ortak dosyalar (tokens, app,
// ortak-menu…) başka ekranlarda değişirse betik yeniden çalıştırılır.
// Çalıştır (v3-app içinden): node docs/liste-v2/cache-bust.mjs [sayfa.html …]
// docs/46: sayfa adları verilirse her biri için çalışır (ör. ana-v3.html liste-v2.html detay-v2.html); verilmezse liste-v2.html.
import fs from 'node:fs';
import crypto from 'node:crypto';
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : ['liste-v2.html'];
for (const PAGE of PAGES) {
const html = fs.readFileSync(PAGE, 'utf8');
const out = [];
const next = html.replace(/(<(?:link|script)\b[^>]*?\b(?:href|src)=")([^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")/g, (all, head, file, tail) => {
  if (/^[a-z]+:|^\/\//i.test(file)) return all;
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10);
  out.push([file, hash]);
  return `${head}${file}?v=${hash}${tail}`;
});
fs.writeFileSync(PAGE, next);
console.log(PAGE, JSON.stringify(out));
}
