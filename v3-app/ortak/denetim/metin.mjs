// Metin kanonu denetimi — İSTİSNASIZ, EKRANDAKİ SATIRLARLA (Beyar, 13 Ekim revize eki: “HER metin bloğu justify; ortalı ve kart içi
// metinler istisna sayılmasın; denetim yalnız <p> değil, görünen metin içeren HER öğeye baksın”).
// Önceki sürüm yalnız hesaplanan text-align değerine bakıyordu; metne göre daraltılmış kutu (justify ama sütunun sağ kenarına ulaşmayan)
// ekranda sola dayalı göründüğü hâlde “0” veriyordu. Bu sürüm:
// 1) hiza   — görünen metni taşıyan her öğenin (div/span/li/small/blockquote/figcaption/düğme… hepsi) metin bloğunda hesaplanmış
//             text-align = justify. Satır içi öğede hizayı veren en yakın blok kapsayıcıdır.
// 2) satir  — 2+ satırlı her blokta (ortalı, kart içi dahil) son satır ve <br> ile biten satır dışındaki her satır, bloğun iç
//             kutusunun (padding içi) İKİ kenarına dayanmalı (tolerans 2px). Sözcükler tek tek ölçülür (Range), satırlar dikey
//             konumdan kurulur. Tek sözcüklü satır gerilemez → ayrı “tek sözcük” listesi (bilgi).
// 3) kutu   — metin bloğu kapsayıcısının içinden dar ve kapsayıcı kenarına dayanmıyorsa (yalnız satır içi stil max-width ile
//             daraltılmışsa) ihlal: metne göre daraltma justify görünümünü bozar.
// 4) lang   — <html lang="tr"> her sayfada.
// 5) bosluk — iki yana yaslı satırda sözcük arası (em, normal boşluk düşülmüş) > 0,5 olan bloklar aday olarak listelenir.
// 6) baslik — 20px ve üstü başlıklarda (hero, sayfa, bölüm) sözcük arası > 0,35em: açılmış boşluk (Beyar EK 13 Ekim) — 0 olmalı.
// Kullanım (proje kökünden): node v3-app/ortak/denetim/metin.mjs [--haller] [--webkit] [--genislik=390]  → ortak/denetim/metin-rapor.json
import {chromium, webkit} from '/Users/gaviaworks/Developer/Backend Projects/dadagastro/node_modules/playwright/index.mjs';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname), V3 = path.resolve(HERE, '../..');
const G = createRequire(import.meta.url)(path.join(V3, 'ortak/veri/sayfalar.js'));
const haller = process.argv.includes('--haller'), wk = process.argv.includes('--webkit');
const W = +(process.argv.find(a => a.startsWith('--genislik='))?.split('=')[1] || 390);
const hedef = new Set(['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html', 'tabaktan-taslak.html']);
for (const g of G) for (const s of g.sayfalar) { if (/(^|\/)index\.html|sifirla/.test(s.dosya)) continue; const a = q => hedef.add(s.dosya + (q ? (s.dosya.includes('?') ? '&' : '?') + q : '')); a(''); (s.ikili || []).forEach(a); if (haller) s.haller.forEach(([, q]) => a(q)); }
// --sayfa=a,b: yalnız adı bu parçaları içeren sayfa×hâller (etkilenen sayfalarda hızlı yeniden denetim).
{ const f = process.argv.find(a => a.startsWith('--sayfa='))?.slice(8).split(',').filter(Boolean); if (f?.length) for (const u of [...hedef]) if (!f.some(x => u.includes(x))) hedef.delete(u); }
const b = await (wk ? webkit : chromium).launch(); const ctx = await b.newContext({viewport: {width: W, height: 844}});
const rapor = {hiza: [], satir: [], kutu: [], tekSozcuk: [], bosluk: [], baslik: [], acik: [], lang: []};
for (const u of hedef) {
  const p = await ctx.newPage();
  try { await p.goto('http://127.0.0.1:8765/v3-app/' + u + (u.includes('?') ? '&' : '?') + 'kal=1', {waitUntil: 'networkidle', timeout: 20000}); await p.evaluate(() => document.fonts?.ready); await p.waitForTimeout(500); } catch { await p.close(); continue; }
  const r = await p.evaluate(() => {
    const ad = el => el.tagName.toLowerCase() + (el.classList[0] ? '.' + el.classList[0] : '');
    const temiz = s => s.replace(/­/g, '').replace(/\s+/g, ' ').trim();
    const out = {hiza: [], satir: [], kutu: [], tekSozcuk: [], bosluk: [], baslik: []};
    const bloklar = new Map();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode; if (!t.nodeValue.trim()) continue;
      const el = t.parentElement; if (!el || el.closest('script,style,svg,noscript,template,[hidden],[inert],dialog:not([open]),[aria-hidden="true"]:empty')) continue;
      // Kapalı <details> içi, görünmez (visibility/content-visibility) öğe ekranda değildir.
      { const d = el.closest('details'); if (d && !d.open && !el.closest('summary')) continue; if (el.checkVisibility && !el.checkVisibility({visibilityProperty: true, contentVisibilityAuto: true})) continue; }
      const r0 = document.createRange(); r0.selectNodeContents(t); const rs = [...r0.getClientRects()].filter(q => q.width > 0);
      if (!rs.length) continue;
      // Flex/grid öğesi (ör. düğme içindeki span) bloklaşır: tırmanma flex/grid kapsayıcıda durur.
      let blok = el; while (blok && /^(inline|contents)$/.test(getComputedStyle(blok).display) && blok.parentElement && !/flex|grid/.test(getComputedStyle(blok.parentElement).display)) blok = blok.parentElement;   // inline-block/flex/grid kendi satır kutusunu kurar: tırmanma orada durur
      if (!bloklar.has(blok)) bloklar.set(blok, []); bloklar.get(blok).push(t);
    }
    for (const [blok, metinler] of bloklar) {
      const cs = getComputedStyle(blok), k = ad(blok), ornek = temiz(blok.textContent).slice(0, 70);
      if (cs.textAlign !== 'justify') { out.hiza.push({k, ta: cs.textAlign, metin: ornek}); continue; }
      // Sözcük parçaları (satır kırılımında bölünen sözcük iki satırda iki parça verir)
      const fs = parseFloat(cs.fontSize) || 15, lh = parseFloat(cs.lineHeight) || fs * 1.3, parca = [];
      for (const t of metinler) {
        if (t.parentElement.closest('textarea,input,select')) continue;
        const re = /\S+/g; let m;
        while ((m = re.exec(t.nodeValue))) { const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length); for (const q of r.getClientRects()) if (q.width > 0) parca.push({q, t, i: m.index}); }
      }
      if (parca.length < 2) continue;
      const sat = [];
      for (const x of parca.sort((a, b) => a.q.top - b.q.top)) { const mid = (x.q.top + x.q.bottom) / 2; let s = sat.find(s => Math.abs(s.mid - mid) < lh * .45); if (!s) sat.push(s = {mid, sol: Infinity, sag: -Infinity, n: 0, ws: new Set(), xs: []}); s.sol = Math.min(s.sol, x.q.left); s.sag = Math.max(s.sag, x.q.right); s.ws.add(x.t); s.ws.add(x); s.xs.push(x); }
      // Satırdaki sözcük sayısı: aynı sözcüğün birden çok parçası (Range birden fazla dikdörtgen verebilir) bir sayılır.
      for (const s of sat) s.n = new Set(s.xs.map(x => x.i + '|' + metinler.indexOf(x.t))).size;
      // Satır içi ikon/görsel ve satır içi blok (düğme, rozet) satırın kenarını oluşturur: satır genişliğine katılır, sözcük sayılmaz.
      for (const ik of [...blok.querySelectorAll('i,img,svg,.icon'), ...[...blok.querySelectorAll('*')].filter(x => /^inline-(block|flex|grid)$/.test(getComputedStyle(x).display))]) { const q = ik.getBoundingClientRect(); if (!q.width || ik.closest('svg') !== null && ik.tagName.toLowerCase() !== 'svg') continue; const mid = (q.top + q.bottom) / 2, s = sat.find(s => Math.abs(s.mid - mid) < lh * .6); if (s) { s.sol = Math.min(s.sol, q.left); s.sag = Math.max(s.sag, q.right); } }
      if (sat.length < 2) continue;
      sat.sort((a, b) => a.mid - b.mid);
      // Satır kırpma (-webkit-line-clamp): yalnız görünen satırlar; son görünen satır “…” satırıdır, son satır gibi sayılır.
      { const kb = blok.getBoundingClientRect().bottom; if (getComputedStyle(blok).webkitLineClamp !== 'none' || getComputedStyle(blok).overflow !== 'visible') { const g = sat.filter(s => s.mid < kb); sat.length = 0; sat.push(...g); } }
      if (sat.length < 2) continue;
      // Flex/grid kapsayıcıdaki çıplak metin anonim kutudadır; kutu kenarı ölçülemez → yalnız hiza denetlenir.
      if (/flex|grid/.test(cs.display)) continue;
      const kr = blok.getBoundingClientRect(), icSol = kr.left + blok.clientLeft + parseFloat(cs.paddingLeft), icSag = kr.left + blok.clientLeft + blok.clientWidth - parseFloat(cs.paddingRight);
      // <br> ile biten satırlar son satır gibi davranır
      const brSatir = new Set();
      for (const br of blok.querySelectorAll('br')) { let once = null; for (const s of sat) for (const x of s.xs) if (x.t.compareDocumentPosition(br) & Node.DOCUMENT_POSITION_FOLLOWING) once = s; if (once) brSatir.add(once); }
      const tol = 2;
      let eksik = 0, tek = 0, enBosluk = 0;
      sat.slice(0, -1).forEach(s => {
        if (brSatir.has(s)) return;
        const kisa = Math.max(icSag - s.sag, s.sol - icSol);
        if (s.n < 2) { if (kisa > tol) tek++; return; }
        if (kisa > tol) eksik = Math.max(eksik, kisa);
        const xs = s.xs.sort((a, b) => a.q.left - b.q.left), bos = []; for (let i = 1; i < xs.length; i++) bos.push(xs[i].q.left - xs[i - 1].q.right);
        const ort = bos.length ? bos.reduce((a, b) => a + b, 0) / bos.length : 0; enBosluk = Math.max(enBosluk, ort / fs - .25);
      });
      if (eksik) out.satir.push({k, px: Math.round(eksik), satir: sat.length, metin: ornek});
      if (tek) out.tekSozcuk.push({k, n: tek, metin: ornek});
      if (enBosluk > .5) out.bosluk.push({k, em: +enBosluk.toFixed(2), fs, metin: ornek});
      if (fs >= 20 && enBosluk > .35) out.baslik.push({k, em: +enBosluk.toFixed(2), fs, metin: ornek});
      // Metne göre daraltılmış kutu (satır içi max-width)
      if (blok.style.maxWidth) { const ps = getComputedStyle(blok.parentElement), pr = blok.parentElement.getBoundingClientRect(), pSag = pr.left + blok.parentElement.clientLeft + blok.parentElement.clientWidth - parseFloat(ps.paddingRight); if (pSag - kr.right > tol) out.kutu.push({k, px: Math.round(pSag - kr.right), metin: ornek}); }
    }
    return {...out, lang: document.documentElement.lang, acik: window.DGMetin?.acik || []};
  });
  for (const t of ['hiza', 'satir', 'kutu', 'tekSozcuk', 'bosluk', 'baslik']) r[t].forEach(x => rapor[t].push({sayfa: u, ...x}));
  r.acik.forEach(a => rapor.acik.push({sayfa: u, ...a}));
  if (r.lang !== 'tr') rapor.lang.push(u + ' (' + (r.lang || 'yok') + ')');
  await p.close();
}
await b.close();
rapor.bosluk.sort((a, b) => b.em - a.em); rapor.baslik.sort((a, b) => b.em - a.em); rapor.satir.sort((a, b) => b.px - a.px);
fs.writeFileSync(path.join(HERE, 'metin-rapor.json'), JSON.stringify({tarih: new Date().toISOString(), motor: wk ? 'webkit' : 'chromium', genislik: W, sayfa: hedef.size, ...rapor}, null, 1));
const uniq = L => new Set(L.map(x => x.k + '|' + x.metin)).size;
console.log(`sayfa×hâl: ${hedef.size} · ${wk ? 'WebKit' : 'Chromium'} ${W}px`);
console.log(`justify olmayan blok (hiza): ${rapor.hiza.length} (benzersiz ${uniq(rapor.hiza)})`);
console.log(`kenara dayanmayan satır (satir): ${rapor.satir.length} (benzersiz ${uniq(rapor.satir)})`);
console.log(`metne göre daraltılmış kutu: ${rapor.kutu.length} · lang="tr" olmayan: ${rapor.lang.length}`);
console.log(`büyük başlık (20px+) sözcük arası >0,35em: ${rapor.baslik.length} (benzersiz ${uniq(rapor.baslik)})`);
console.log(`2px küçültmeyle de kapanmayan büyük başlık (DGMetin.acik): ${rapor.acik.length} (benzersiz ${new Set(rapor.acik.map(x => x.metin)).size})`);
for (const x of [...new Map(rapor.acik.map(x => [x.metin, x])).values()]) console.log(`  [acik] ${x.sayfa}  ${x.em}em  “${x.metin}”`);
console.log(`bilgi — tek sözcüklü satır: ${rapor.tekSozcuk.length} · sözcük arası >0,5em: ${rapor.bosluk.length}`);
for (const [t, L] of [['hiza', rapor.hiza], ['satir', rapor.satir], ['kutu', rapor.kutu], ['baslik', [...new Map(rapor.baslik.map(x => [x.k + x.metin, x])).values()]]]) for (const x of L.slice(0, 30)) console.log(`  [${t}] ${x.sayfa}  ${x.k}  ${x.ta || (x.px != null ? x.px + 'px' : x.em + 'em/' + x.fs + 'px')}  “${x.metin}”`);
