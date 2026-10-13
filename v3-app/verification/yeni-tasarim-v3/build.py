# Yeni tasarım 3. sürüm yayını (docs/48): v3-app/onizleme-v3.html (üç ekran yan yana) ve bağlı üç ekranın çalışan kopyasını
# yayin/yeni-tasarim-v3 altına üretir. Yöntem docs/43, docs/45 ve docs/46 ile aynı (yeni-tasarim-v2/build.py):
# bağımlılık taraması, göreli yollar, yayına özel bağlantılar, Cache-Control meta, içerik özeti (sha256 ilk 12) ile ?v=
# damgası (iframe adresleri dahil), klasöre özel robots. yayin/ altındaki diğer bütün dosyalar korunur (before.json).
# Proje kökünden çalıştır: python3 v3-app/verification/yeni-tasarim-v3/build.py
from pathlib import Path
import json, re, hashlib, shutil, posixpath
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

src = Path('v3-app'); out = Path('yayin/yeni-tasarim-v3'); ev = Path('v3-app/verification/yeni-tasarim-v3')
assert not out.exists() or (ev / 'build.json').exists(), 'yayin/yeni-tasarim-v3 beklenmedik biçimde var'
SCREENS = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']

# Protect every pre-existing published file (outside this folder).
if not (ev / 'before.json').exists():
    (ev / 'before.json').write_text(json.dumps({str(p.relative_to('yayin')): hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file() and 'yeni-tasarim-v3' not in p.parts}))
if out.exists(): shutil.rmtree(out)
out.mkdir(parents=True)

asset_re = r'assets/[A-Za-z0-9_./% -]+\.(?:webp|avif|jpg|jpeg|png|svg|woff2?|ttf|otf|json|mp3|mp4|gif)'
files, copied, skipped = {}, set(), []
pending = list(SCREENS)
def add(n):
    n = posixpath.normpath(n.split('?')[0].split('#')[0])
    assert not n.startswith(('../', '/')), n
    if n not in files and n not in copied and n not in pending: pending.append(n)
def scan(n, s):
    for a in set(re.findall(asset_re, s)): add(a)
    if n.endswith('.html'):
        for a in re.findall(r'(?:src|href)="([^"?#:]+\.(?:js|css))', s): add(a)
    if n.endswith('.css'):
        for a in re.findall(r'url\([\'"]?([^\)\'"?#]+)', s):
            if not a.startswith(('http', 'data:')): add(posixpath.join(posixpath.dirname(n), a))
# Directories whose file names are built at runtime (template strings): copy whole.
for d in ['assets/flags', 'assets/marka']:
    for p in sorted((src / d).iterdir()):
        if p.is_file(): add(f'{d}/{p.name}')
while pending:
    n = pending.pop(0)
    if n in files or n in copied: continue
    p = src / n
    if not p.is_file():
        # Font Awesome CSS lists .ttf / regular / v4 fallbacks the project never shipped; browsers load the woff2 that exists.
        assert n.startswith('assets/fontawesome/webfonts/'), n; skipped.append(n); continue
    if p.suffix in ['.html', '.css', '.js', '.json']:
        s = p.read_text(encoding='utf-8'); scan(n, s); files[n] = s
    else:
        assert p.suffix not in ['.mjs', '.py', '.env'], n
        d = out / n; d.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(p, d); copied.add(n)

# Publication-only scripted navigations to pages that are not published.
def sub(name, a, b, count):
    assert files[name].count(a) == count, (name, a, files[name].count(a)); files[name] = files[name].replace(a, b)
sub('home-base.js', "location.href='tarifler.html?", "location.href='liste-v2.html?", 2)
sub('home-base.js', "location.href='index.html'", "location.href='ana-v3.html'", 1)
sub('ld-source.js', "location.href='tarifler.html?", "location.href='liste-v2.html?", 2)
sub('ld-source.js', "location.href='index.html'", "location.href='ana-v3.html'", 1)
sub('six-home.js', "location.href='liste.html?", "location.href='liste-v2.html?", 1)

# Publication-only link map. The three screens already link to each other in v3-app (cards → detay-v2, "Tümü" → liste-v2).
# Here only targets that are not published are mapped: search → list, Tabaktan Tarif → "Yakında" (empty href, the shared
# toast), and any leftover old page names. docs/47: design option parameters are gone; only functional ones are kept.
files['yayin-baglantilar.js'] = r"""/* Yayın kopyası bağlantıları: üç ekran birbirine bağlı; yayında olmayan sayfalara bağlantı kalmaz. */
(() => {
  const keep = (q, names) => { const p = new URLSearchParams(q), o = new URLSearchParams(); for (const [k, v] of p) if (names.some(n => k === n || k.startsWith(n + '['))) o.append(k, v); const s = o.toString(); return s ? '?' + s : ''; };
  function map(h) {
    if (!h || /^(https?:|mailto:|tel:|#|data:|javascript:)/.test(h)) return null;
    const [path, query = ''] = h.split('#')[0].split('?'), hash = h.includes('#') ? '#' + h.split('#')[1] : '';
    if (/^(detay-c|tarif-detay)\.html$/.test(path)) return 'detay-v2.html' + (query ? '?' + query : '') + hash;
    if (/^(liste|tarifler)\.html$/.test(path)) return 'liste-v2.html' + keep(query, ['kategori', 'sirala', 'malzeme', 'mutfak', 'q', 'sayfa', 'gorunum', 'giris']) + hash;
    if (path === 'arama.html') return 'liste-v2.html';
    if (path === 'index.html') return 'ana-v3.html' + hash;
    if (path === 'tabaktan-tarif.html') return '';
    return null;
  }
  function fix(root) {
    root.querySelectorAll?.('a[href],form[action]').forEach(el => {
      const attr = el.tagName === 'FORM' ? 'action' : 'href', h = el.getAttribute(attr), n = map(h);
      if (n !== null && n !== h) el.setAttribute(attr, n);
    });
  }
  fix(document);
  new MutationObserver(list => { for (const m of list) for (const n of m.addedNodes) if (n.nodeType === 1) { fix(n); if (n.matches?.('a[href],form[action]')) fix(n.parentNode || document); } }).observe(document.documentElement, {childList: true, subtree: true});
  // Menu rows and links whose target changes at click time (window capture runs before the pages' own handlers).
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n !== null) a.setAttribute('href', n); } }, true);
})();
"""
for n in SCREENS:
    sub(n, '</head>', '<script src="yayin-baglantilar.js" defer></script></head>', 1)

# The page for the boss: v3-app/onizleme-v3.html as it is (three phones side by side, 390×844 iframes loaded one after
# another; narrow screens: three tabs), with the publication title.
TITLE = 'DadaGastro Mobil Uygulama — Yeni Tasarım'
page = (src / 'onizleme-v3.html').read_text(encoding='utf-8')
assert page.count('<title>DadaGastro Mobil · Önizleme</title>') == 1 and page.count('<h1>DadaGastro Mobil Uygulama — Önizleme</h1>') == 1
page = page.replace('<title>DadaGastro Mobil · Önizleme</title>', f'<title>{TITLE}</title>').replace('<h1>DadaGastro Mobil Uygulama — Önizleme</h1>', f'<h1>{TITLE}</h1>')
assert page.count('data-src="') == 3
files['index.html'] = page
scan('index.html', files['index.html'])
while pending:
    n = pending.pop(0)
    if n in files or n in copied: continue
    p = src / n; assert p.is_file(), n
    if p.suffix in ['.html', '.css', '.js', '.json']: s = p.read_text(encoding='utf-8'); scan(n, s); files[n] = s
    else: d = out / n; d.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(p, d); copied.add(n)

# Cache-Control meta on every published page.
for n, s in list(files.items()):
    if n.endswith('.html') and 'Cache-Control' not in s: files[n] = s.replace('</head>', '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"></head>', 1)

# Content-hash version stamps (same as the previous release).
done = set()
def digest(n): return hashlib.sha256(files[n].encode() if n in files else (out / n).read_bytes()).hexdigest()[:12]
def ver(u, owner, frame=False):
    x = urlsplit(u)
    if x.scheme or x.netloc or not x.path: return u
    target = posixpath.normpath(posixpath.join(posixpath.dirname(owner), x.path))
    if target not in files and target not in copied: return u
    if target.endswith('.html') and not frame: return u
    q = [(k, v) for k, v in parse_qsl(x.query) if k != 'v'] + [('v', digest(target))]
    return urlunsplit(('', '', x.path, urlencode(q), x.fragment))
def finish(n):
    if n in done: return
    s = files[n]; deps = set(re.findall(asset_re, s))
    if n.endswith('.html'): deps.update(u.split('?')[0] for u in re.findall(r'(?:src|href)="([^"#]+\.(?:js|css)(?:\?[^"#]*)?)', s))
    for d in deps:
        if d in files: finish(d)
    if n.endswith('.css'): s = re.sub(r'url\(([\'"]?)([^\)\'"]+)([\'"]?)\)', lambda m: 'url(' + m[1] + ver(m[2], n) + m[3] + ')', s)
    if n.endswith(('.js', '.json')): s = re.sub(asset_re + r'(?:\?v=[a-f0-9]+)?', lambda m: ver(m[0], n), s)
    if n.endswith('.html'): s = re.sub(r'((?:src|href)=")([^"]+)(")', lambda m: m[1] + ver(m[2], n) + m[3], s)
    files[n] = s; done.add(n)
for n in list(files): finish(n)
files['index.html'] = re.sub(r'(<iframe[^>]*data-src=")([^"]+)(")', lambda m: m[1] + ver(m[2], 'index.html', True) + m[3], files['index.html'])
assert files['index.html'].count('?v=') >= 3
for n, s in files.items():
    (out / n).parent.mkdir(parents=True, exist_ok=True); (out / n).write_text(s, encoding='utf-8')
(out / 'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/yeni-tasarim-v3/\n')

allfiles = [p for p in out.rglob('*') if p.is_file()]
bad = [str(p) for p in allfiles if p.suffix in ('.mjs', '.py', '.env', '.md') or p.name.startswith('.')]
assert not bad, bad
refs_outside = []
for n, s in files.items():
    for ref in re.findall(r'(?:src="|href="|url\([\'"]?)(\.\.?/[^"\'\)\s]+)', s):
        if posixpath.normpath(posixpath.join(posixpath.dirname(n), ref.split('?')[0])).startswith('..'): refs_outside.append((n, ref))
assert not refs_outside, refs_outside
leak = [n for n, s in files.items() if re.search(r'["\'(/]v3-app/', s)]  # path references only (a source comment may name the folder)
assert not leak, leak
report = {'count': len(allfiles), 'bytes': sum(p.stat().st_size for p in allfiles), 'screens': SCREENS, 'skipped_missing_fallback_fonts': skipped,
          'largest': sorted([(str(p.relative_to(out)), p.stat().st_size) for p in allfiles], key=lambda x: -x[1])[:5]}
(ev / 'build.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)); print(json.dumps(report, ensure_ascii=False, indent=2))
