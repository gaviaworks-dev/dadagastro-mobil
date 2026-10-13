# Ana sayfa seçenekleri yayını: v3-app'teki dört ana sayfanın ve karşılaştırma sayfasının çalışan kopyasını
# yayin/ana-sayfa-alternatifleri altına üretir (docs/43'teki yeni-tasarim yayınıyla aynı yöntem).
# Önceki yayın (v3-app/verification/v2-release/build.py) ile aynı yöntem: bağımlılık taraması, göreli yollar,
# yayına özel bağlantılar, Cache-Control meta, içerik özeti (sha256 ilk 12) ile ?v= damgası, klasöre özel robots.
# Proje kökünden çalıştır: python3 v3-app/verification/alternatifler-yayini/build.py
from pathlib import Path
import json, re, hashlib, shutil, posixpath
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

src = Path('v3-app'); out = Path('yayin/ana-sayfa-alternatifleri'); ev = Path('v3-app/verification/alternatifler-yayini')
assert not out.exists() or (ev / 'build.json').exists(), 'yayin/ana-sayfa-alternatifleri beklenmedik biçimde var'
SCREENS = ['ana-v3.html', 'ana-v3-alt1.html', 'ana-v3-alt2.html', 'ana-v3-alt3.html']
LIST, DETAIL = '../yeni-tasarim/liste-v2.html', '../yeni-tasarim/detay-v2.html'

# Protect every pre-existing published file (outside this folder).
if not (ev / 'before.json').exists():
    (ev / 'before.json').write_text(json.dumps({str(p.relative_to('yayin')): hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file() and 'ana-sayfa-alternatifleri' not in p.parts}))
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
sub('home-base.js', "location.href='tarifler.html?", "location.href='../yeni-tasarim/liste-v2.html?", 2)
sub('home-base.js', "location.href='index.html'", "location.href=(location.pathname.split('/').pop()||'index.html')", 1)
sub('six-home.js', "location.href='liste.html?", "location.href='../yeni-tasarim/liste-v2.html?", 1)

# Publication-only link map: the three screens link to each other, never to unpublished pages.
files['yayin-baglantilar.js'] = r"""/* Yayın kopyası bağlantıları: tarif kartları canlıdaki yeni tasarımın detayına, "Tümü", kategori ve
   arama bağlantıları listesine gider; yayında olmayan sayfalara bağlantı kalmaz. */
(() => {
  const page = location.pathname.split('/').pop() || 'ana-v3.html';
  const LIST = '../yeni-tasarim/liste-v2.html', DETAIL = '../yeni-tasarim/detay-v2.html';
  const keep = (q, names) => { const p = new URLSearchParams(q), o = new URLSearchParams(); for (const [k, v] of p) if (names.some(n => k === n || k.startsWith(n + '['))) o.append(k, v); const s = o.toString(); return s ? '?' + s : ''; };
  function map(h) {
    if (!h || /^(https?:|mailto:|tel:|#|data:|javascript:|\.\.\/yeni-tasarim\/)/.test(h)) return null;
    const [path, query = ''] = h.split('#')[0].split('?'), hash = h.includes('#') ? '#' + h.split('#')[1] : '';
    if (/^(detay-c|tarif-detay|detay-v2)\.html$/.test(path)) return DETAIL + keep(query, ['tarif']);
    if (/^(liste|tarifler|liste-v2)\.html$/.test(path)) return LIST + keep(query, ['kategori', 'sirala', 'malzeme', 'mutfak', 'q', 'sayfa']);
    if (path === 'arama.html') return LIST;
    if (path === 'index.html') return page + hash;
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
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n !== null) a.setAttribute('href', n); } }, true);
})();
"""
for n in SCREENS:
    sub(n, '</head>', '<script src="yayin-baglantilar.js" defer></script></head>', 1)

# The comparison page: v3-app/ana-sayfa-alternatifler.html with the publication title and line.
cmp = (src / 'ana-sayfa-alternatifler.html').read_text(encoding='utf-8')
for a, b in [('<title>DadaGastro · Ana sayfa seçenekleri</title>', '<title>DadaGastro Mobil Uygulama — Ana Sayfa Seçenekleri</title>'),
             ('<h1>Ana sayfa seçenekleri</h1>', '<h1>DadaGastro Mobil Uygulama — Ana Sayfa Seçenekleri</h1>'),
             ('<p>Ekranların içinde kaydırabilir, menüyü açabilir, sekmelere dokunabilirsiniz.</p>', '<p>Dört ana sayfa seçeneği. Ekranların içinde kaydırabilir, menüyü açabilirsiniz.</p>'),
             ('<meta name="robots" content="noindex,nofollow">', '<meta name="robots" content="noindex,nofollow"><link rel="icon" href="assets/marka/dadagastro-renkli.svg">')]:
    assert cmp.count(a) == 1, a; cmp = cmp.replace(a, b)
files['index.html'] = cmp
for n in ['ana-sayfa-alternatifler.css', 'ana-sayfa-alternatifler.js']: files[n] = (src / n).read_text(encoding='utf-8')
for n in ['index.html', 'ana-sayfa-alternatifler.css']: scan(n, files[n])
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
files['index.html'] = re.sub(r'(<iframe[^>]*src=")([^"]+)(")', lambda m: m[1] + ver(m[2], 'index.html', True) + m[3], files['index.html'])
for n, s in files.items():
    (out / n).parent.mkdir(parents=True, exist_ok=True); (out / n).write_text(s, encoding='utf-8')
(out / 'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/ana-sayfa-alternatifleri/\n')

allfiles = [p for p in out.rglob('*') if p.is_file()]
bad = [str(p) for p in allfiles if p.suffix in ('.mjs', '.py', '.env', '.md') or p.name.startswith('.')]
assert not bad, bad
refs_outside = []
for n, s in files.items():
    for ref in re.findall(r'(?:src="|href="|url\([\'"]?)(\.\.?/[^"\'\)\s]+)', s):
        target = posixpath.normpath(posixpath.join(posixpath.dirname(n), ref.split('?')[0]))
        if target.startswith('..') and not re.fullmatch(r'\.\./yeni-tasarim/(liste|detay)-v2\.html', target): refs_outside.append((n, ref))
assert not refs_outside, refs_outside
report = {'count': len(allfiles), 'bytes': sum(p.stat().st_size for p in allfiles), 'screens': SCREENS, 'skipped_missing_fallback_fonts': skipped,
          'largest': sorted([(str(p.relative_to(out)), p.stat().st_size) for p in allfiles], key=lambda x: -x[1])[:5]}
(ev / 'build.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)); print(json.dumps(report, ensure_ascii=False, indent=2))
