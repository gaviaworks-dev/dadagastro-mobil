# Galeri yayını V4 (Beyar, 13 Ekim — V1 kopyasının betiği; V1 klasörü ve diğer yayın klasörleri değişmez, sonda doğrulanır): yeni ayrı adres yayin/uygulama-ekranlari-v4/ (…/dadagastro-mobil/uygulama-ekranlari-v4/). yeni-tasarim-v3 olduğu gibi kalır.
# Adres açılınca galeri (ekranlar-v4.html → index.html) gelir; galeriden bütün ekranlar ve tıklanabilir uygulama (uygulama/index.html)
# gezilir. Yöntem docs/48 ile aynı: bağımlılık taraması (tara.mjs istekleri + statik tarama), göreli yollar, noindex + Cache-Control
# meta, içerik özeti (sha256 ilk 12) ile ?v= damgası, klasöre özel robots. yayin/ altındaki diğer klasörlere dokunulmaz (before.json).
# Proje kökünden: node v3-app/verification/uygulama-ekranlari-v4/tara.mjs && python3 v3-app/verification/uygulama-ekranlari-v4/build.py
from pathlib import Path
import json, re, hashlib, shutil, posixpath

src = Path('v3-app'); out = Path('yayin/uygulama-ekranlari-v4'); ev = Path('v3-app/verification/uygulama-ekranlari-v4')
sha = lambda b: hashlib.sha256(b).hexdigest()

# Diğer yayın klasörlerinin özeti (değişmediği build sonunda doğrulanır).
diger = lambda: {str(p.relative_to('yayin')): sha(p.read_bytes()) for p in Path('yayin').rglob('*') if p.is_file() and p.parts[1] != 'uygulama-ekranlari-v4'}
once = diger()
eski = {str(p.relative_to(out)): sha(p.read_bytes()) for p in out.rglob('*') if p.is_file()} if out.exists() else {}

YASAK_DIZIN = ('docs/', 'verification/', 'eski/', 'ortak/denetim/', 'ortak/uret/', 'ortak/flutter/', 'node_modules/', 'scratch')
YASAK_UZANTI = ('.mjs', '.py', '.md', '.env', '.map', '.log')
METIN = ('.html', '.css', '.js', '.json', '.webmanifest', '.svg', '.txt')
ext = r'(?:webp|avif|jpg|jpeg|png|svg|gif|woff2?|ttf|otf|json|mp3|mp4|webmanifest|css|js|html)'
yol_re = re.compile(r'(?<![\w/.-])((?:\.\./|\./)?(?:assets|ortak|uygulama)/[A-Za-z0-9_./%-]+\.' + ext + r')(?![\w])')
html_re = re.compile(r'(?<![\w/.-])((?:\.\./)?[a-z0-9][a-z0-9-]*\.html)(?![\w-])')
attr_re = re.compile(r'(?:src|href|data-src)="([^"#?:]+\.(?:webp|avif|jpg|jpeg|png|svg|gif|woff2?|ttf|otf|json|mp3|mp4|webmanifest|css|js))"')   # html bağlantıları ayrı (KOK süzgeci)
url_re = re.compile(r'url\([\'"]?([^\)\'"?#]+)')

GALERI = json.loads(Path(ev / 'istekler.json').read_text())
files, kuyruk, eksik, yayinda_degil = {}, [], set(), set()
def norm(n, owner=''):
    n = n.split('?')[0].split('#')[0]
    return posixpath.normpath(posixpath.join(posixpath.dirname(owner), n)) if owner else posixpath.normpath(n)
def ekle(n):
    if n.startswith('..') or n.startswith('/'): return
    if any(n.startswith(d) for d in YASAK_DIZIN) or n.endswith(YASAK_UZANTI): yayinda_degil.add(n); return
    if n not in files and n not in kuyruk: kuyruk.append(n)

# Tohumlar: galerinin istediği her dosya + bütün uygulama sayfaları + açılış/manifest + çalışma anında adı kurulan klasörler.
for n in GALERI['dosya']: ekle(n)
for p in sorted((src / 'uygulama').rglob('*')):
    if p.is_file(): ekle(str(p.relative_to(src)))
for d in ['assets/flags', 'assets/marka', 'assets/malzeme', 'ortak']:   # V4: malzeme görselleri ve ortak dosyalar JS'te adla yüklenir
    for p in sorted((src / d).rglob('*')):
        if p.is_file(): ekle(str(p.relative_to(src)))
ekle('ekranlar-v4.html')
# Galeride ve uygulamada gezilebilen kök sayfalar (yayında yalnız bunlar; eski deneme sayfaları yok).
KOK = {'ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html', 'tabaktan-taslak.html', 'tarifler.html', 'tarif-detay.html', 'ekranlar-v4.html'}
for n in KOK: ekle(n)

while kuyruk:
    n = kuyruk.pop(0)
    if n in files: continue
    p = src / n
    if not p.is_file():
        if n.startswith('assets/fontawesome/webfonts/'): continue   # Font Awesome CSS'inin listelediği, projede hiç olmayan yedek yazı tipleri
        if not re.search(r'[$`{]', n) and not n.endswith('.html'): eksik.add(n)
        continue
    b = p.read_bytes(); files[n] = b
    if p.suffix not in METIN: continue
    s = b.decode('utf-8', 'ignore')
    sahip = n
    for m in yol_re.findall(s):
        # Uygulama sayfaları ve ortak JS '../assets/…' yazar; kök JS 'assets/…'. İkisi de v3-app köküne göre çözülür.
        ekle(norm(m, sahip) if m.startswith(('../', './')) else norm(m))
    for m in attr_re.findall(s): ekle(norm(m, sahip))
    if n.endswith('.css'):
        for m in url_re.findall(s):
            if not m.startswith(('http', 'data:')): ekle(norm(m, sahip))
    for m in html_re.findall(s):
        h = norm(m, sahip) if m.startswith('../') else norm(posixpath.join(posixpath.dirname(sahip), m))
        if h in KOK or h.startswith('uygulama/'): ekle(h)
        elif (src / h).is_file(): yayinda_degil.add(h)

# Kök runtime'ın “index.html” bağlantıları v3-app'te uygulama girişine gider; yayında kök index galeridir: ana sayfaya bağlanır (ESKI eşlemesi).
BAG = 'yayin-baglantilar.js'
files[BAG] = """/* Yayın kopyası: kök ekranların "index.html" (ana sayfa) bağlantıları ana-v3.html'e gider; yayında kök index galeridir. */
(() => {
  // Ana Sayfa (logo, alt menü, yan menü) → ana-v3; kök runtime'ın eski adları yayındaki karşılıklarına.
  const ESKI = {'index.html': 'ana-v3.html', 'ana-1.html': 'ana-v3.html', 'liste.html': 'liste-v2.html', 'detay-c.html': 'detay-v2.html', 'arama.html': 'uygulama/arama.html'};
  const map = h => { const m = /^(?:\\.\\/)?([a-z0-9-]+\\.html)([?#].*)?$/.exec(h || ''); return m && ESKI[m[1]] ? ESKI[m[1]] + (m[2] || '') : null; };
  const fix = r => r.querySelectorAll?.('a[href]').forEach(a => { const n = map(a.getAttribute('href')); if (n) a.setAttribute('href', n); });
  fix(document);
  new MutationObserver(l => { for (const m of l) for (const n of m.addedNodes) if (n.nodeType === 1) { fix(n); if (n.matches?.('a[href]')) fix(n.parentNode || document); } }).observe(document.documentElement, {childList: true, subtree: true});
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n) a.setAttribute('href', n); } }, true);
})();
""".encode()
for n in ['ana-v3.html', 'liste-v2.html', 'detay-v2.html', 'tabaktan-tarif.html', 'tabaktan-taslak.html']:
    s = files[n].decode(); assert s.count('</head>') == 1, n
    files[n] = s.replace('</head>', f'<script src="{BAG}" defer></script></head>', 1).encode()
# v3-app kökündeki index.html uygulama girişine yönlendirir; yayında kök index = galeri (patron sürümü).
files['index.html'] = files.pop('ekranlar-v4.html')
# Yayın başlığı (Beyar, YAYINLA V4): “DadaGastro Mobil Uygulama Ekranları” (yerel galeri adındaki “— V2” yayında yok).
files['index.html'] = files['index.html'].decode().replace('DadaGastro Mobil Uygulama Ekranları — V2', 'DadaGastro Mobil Uygulama Ekranları').encode()
s = files['uygulama/index.html'].decode()
# Uygulama içi bağlantılar: galeri adresi index.html'e taşındı (ekranlar-v4.html yayında yok).
for n in list(files):
    if n.endswith(('.html', '.js')):
        s = files[n].decode('utf-8', 'ignore')
        if 'ekranlar-v4.html' in s and n != 'index.html': files[n] = s.replace('ekranlar-v4.html', 'index.html').encode()

# Meta: noindex + önbellek (bütün html).
for n in list(files):
    if not n.endswith('.html'): continue
    s = files[n].decode()
    if 'name="robots"' not in s: s = s.replace('<head>', '<head><meta name="robots" content="noindex,nofollow">', 1) if '<head>' in s else s.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex,nofollow">', 1)
    if 'Cache-Control' not in s: s = s.replace('</head>', '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"></head>', 1)
    assert 'noindex' in s, n
    files[n] = s.encode()

# ?v= içerik damgası: önce css (url), sonra html (src/href). Var olan eski damgalar atılır.
def damga(owner, u):
    yol, _, rest = u.partition('?'); hash_ = ''
    if '#' in u: hash_ = '#' + u.split('#', 1)[1]
    hedef = norm(yol, owner)
    if hedef not in files: return u
    q = '&'.join(x for x in rest.split('#')[0].split('&') if x and not x.startswith('v='))
    return yol + '?' + (q + '&' if q else '') + 'v=' + sha(files[hedef])[:12] + hash_
for n in [n for n in files if n.endswith('.css')]:
    s = files[n].decode()
    s = re.sub(r'url\(([\'"]?)([^\)\'"]+)([\'"]?)\)', lambda m: m[0] if m[2].startswith(('http', 'data:')) else 'url(' + m[1] + damga(n, m[2]) + m[3] + ')', s)
    files[n] = s.encode()
for n in [n for n in files if n.endswith('.html')]:
    s = files[n].decode()
    s = re.sub(r'((?:src|href)=")([^"]+\.(?:css|js|svg|webmanifest)(?:\?[^"]*)?)(")', lambda m: m[1] + (m[2] if re.match(r'^(https?:|data:|mailto:)', m[2]) else damga(n, m[2])) + m[3], s)
    files[n] = s.encode()

# Yaz: klasör baştan kurulur (eski 3 ekran sunumu galerinin içinde zaten var).
if out.exists(): shutil.rmtree(out)
for n, b in files.items():
    d = out / n; d.parent.mkdir(parents=True, exist_ok=True); d.write_bytes(b)
(out / 'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/uygulama-ekranlari-v4/\n')

# Denetimler
yeni = {str(p.relative_to(out)): sha(p.read_bytes()) for p in out.rglob('*') if p.is_file()}
kotu = [n for n in yeni if n.endswith(YASAK_UZANTI) or any(n.startswith(d) for d in YASAK_DIZIN) or '/.' in '/' + n or re.search(r'(screenshot|\.env|node_modules|rapor\.json|istekler\.json)', n)]
assert not kotu, kotu
disari = []
for n, b in files.items():
    if not n.endswith(('.html', '.css')): continue
    for ref in re.findall(r'(?:src="|href="|url\([\'"]?)(\.\./[^"\'\)\s]+)', b.decode('utf-8', 'ignore')):
        if norm(ref, n).startswith('..'): disari.append((n, ref))
assert not disari, disari[:10]
assert diger() == once, 'yayin/ altındaki başka bir klasör değişti'
gizli = [n for n, b in files.items() if n.endswith(METIN) and re.search(rb'(api[_-]?key|secret_key|BEGIN (RSA|PRIVATE)|password\s*=\s*["\'][^"\']{6,})', b, re.I)]
rapor = {'dosya': len(yeni), 'bayt': sum((out / n).stat().st_size for n in yeni),
         'eklenen': sorted(set(yeni) - set(eski)), 'degisen': sorted(n for n in yeni if n in eski and eski[n] != yeni[n]), 'silinen': sorted(set(eski) - set(yeni)),
         'eksik_kaynak': sorted(eksik), 'yayinda_olmayan_referans': sorted(yayinda_degil), 'gizli_aday': gizli,
         'en_buyuk': sorted([(n, (out / n).stat().st_size) for n in yeni], key=lambda x: -x[1])[:8]}
(ev / 'build.json').write_text(json.dumps(rapor, ensure_ascii=False, indent=1))
print(json.dumps({k: (len(v) if isinstance(v, list) and k in ('eklenen', 'degisen', 'silinen') else v) for k, v in rapor.items()}, ensure_ascii=False, indent=1))
