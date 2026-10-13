# Yeni tasarım yayını: v3-app'teki üç ekranın çalışan kopyasını yayin/yeni-tasarim altına üretir.
# Önceki yayın (v3-app/verification/v2-release/build.py) ile aynı yöntem: bağımlılık taraması, göreli yollar,
# yayına özel bağlantılar, Cache-Control meta, içerik özeti (sha256 ilk 12) ile ?v= damgası, klasöre özel robots.
# Proje kökünden çalıştır: python3 v3-app/verification/yeni-tasarim/build.py
from pathlib import Path
import json, re, hashlib, shutil, posixpath
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

src = Path('v3-app'); out = Path('yayin/yeni-tasarim'); ev = Path('v3-app/verification/yeni-tasarim')
assert not out.exists() or (ev / 'build.json').exists(), 'yayin/yeni-tasarim beklenmedik biçimde var'
SCREENS = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']

# Protect every pre-existing published file (outside this folder).
if not (ev / 'before.json').exists():
    (ev / 'before.json').write_text(json.dumps({str(p.relative_to('yayin')): hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file() and 'yeni-tasarim' not in p.parts}))
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

# Publication-only link map: the three screens link to each other, never to unpublished pages.
files['yayin-baglantilar.js'] = r"""/* Yayın kopyası bağlantıları: üç ekran birbirine bağlı; yayında olmayan sayfalara bağlantı kalmaz. */
(() => {
  const page = location.pathname.split('/').pop() || 'ana-v3.html', home = page === 'ana-v3.html';
  const keep = (q, names) => { const p = new URLSearchParams(q), o = new URLSearchParams(); for (const [k, v] of p) if (names.some(n => k === n || k.startsWith(n + '['))) o.append(k, v); const s = o.toString(); return s ? '?' + s : ''; };
  function map(h) {
    if (!h || /^(https?:|mailto:|tel:|#|data:|javascript:)/.test(h)) return null;
    const [path, query = ''] = h.split('#')[0].split('?'), hash = h.includes('#') ? '#' + h.split('#')[1] : '';
    if (/^(detay-c|tarif-detay|detay-v2)\.html$/.test(path)) return home ? 'liste-v2.html' : 'detay-v2.html' + keep(query, ['tarif']) + hash;
    if (/^(liste|tarifler|liste-v2)\.html$/.test(path)) return path === 'liste-v2.html' ? null : 'liste-v2.html' + keep(query, ['kategori', 'sirala', 'malzeme', 'mutfak', 'q', 'sayfa']) + hash;
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
  // Menu rows and links whose target changes at click time.
  addEventListener('click', e => { const a = e.target.closest?.('a[href]'); if (a) { const n = map(a.getAttribute('href')); if (n !== null) a.setAttribute('href', n); } }, true);
})();
"""
for n in SCREENS:
    sub(n, '</head>', '<script src="yayin-baglantilar.js" defer></script></head>', 1)

# The comparison page for the boss: three phones side by side; tabs on narrow screens.
frames = [('ana-v3.html', '1. Ana Sayfa'), ('liste-v2.html', '2. Tarif Listesi'), ('detay-v2.html', '3. Tarif Detay')]
files['index.html'] = """<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#F9F9F9"><title>DadaGastro Mobil Uygulama — Yeni Tasarım</title><link rel="icon" href="assets/marka/dadagastro-renkli.svg"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="assets/fontawesome/css/all.min.css"><link rel="stylesheet" href="sunum.css"><script src="sunum.js" defer></script></head><body>
<header class="sn-head"><img class="sn-logo" src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro" width="96" height="60"><h1>DadaGastro Mobil Uygulama — Yeni Tasarım</h1><p>Ekranların içinde kaydırabilir, menüyü açabilir, sekmelere dokunabilirsiniz.</p></header>
<nav class="sn-tabs" role="tablist" aria-label="Ekranlar">""" + ''.join(f'<button role="tab" id="sn-tab-{i}" aria-controls="sn-ekran-{i}" aria-selected="{str(i == 1).lower()}" data-sn-tab="{i}"{"" if i == 1 else " tabindex=\"-1\""}>{t}</button>' for i, (_, t) in enumerate(frames, 1)) + """</nav>
<main class="sn-screens">""" + ''.join(f'<section class="sn-screen{" is-active" if i == 1 else ""}" id="sn-ekran-{i}" role="tabpanel" aria-labelledby="sn-tab-{i}"><h2>{t}</h2><div class="sn-phone"><iframe src="{f}?gallery=1" title="{t[3:]}" width="390" height="844" loading="{"eager" if i == 1 else "lazy"}"></iframe></div><a class="sn-open" href="{f}" target="_blank" rel="noopener">Tam ekran aç <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></section>' for i, (f, t) in enumerate(frames, 1)) + """</main>
</body></html>"""
files['sunum.css'] = """/* Sunum sayfası: tokenlar tokens.css'ten; Gilroy, açık nötr zemin, Font Awesome solid. */
/* Telefon çerçevesi: talimattaki 390×844 cihaz ölçüsü; tek yerde adlandırıldı. */\n:root{--sn-phone-w:390px;--sn-phone-h:844px;--sn-phone-min:560px}\n*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font);-webkit-font-smoothing:antialiased}
.sn-head{max-width:calc(3 * var(--sn-phone-w) + 2 * var(--space-48));margin:0 auto;padding:var(--space-40) var(--gutter) var(--space-24)}
.sn-logo{display:block;width:calc(var(--space-48) + var(--space-16));height:auto;margin-bottom:var(--space-16)}
.sn-head h1{margin:0 0 var(--space-8);font-family:GilroyBd,var(--font);font-size:var(--role-page-size);line-height:var(--role-page-line);letter-spacing:var(--role-page-tracking)}
.sn-head p{margin:0;font-size:var(--role-body-size);line-height:var(--role-body-line);color:var(--slate-2)}
.sn-tabs{display:none}
.sn-screens{display:flex;justify-content:center;align-items:flex-start;gap:var(--space-48);padding:var(--space-16) var(--gutter) var(--space-48)}
.sn-screen{display:flex;flex-direction:column;align-items:center;gap:var(--space-16)}
.sn-screen h2{align-self:stretch;margin:0;font-family:GilroyBd,var(--font);font-size:var(--role-section-size);line-height:var(--role-section-line)}
.sn-phone{width:var(--sn-phone-w);height:var(--sn-phone-h);overflow:hidden;border-radius:var(--radius-card);background:var(--paper);box-shadow:var(--sh-md);outline:var(--border-width) solid var(--line)}
.sn-phone iframe{display:block;width:var(--sn-phone-w);height:var(--sn-phone-h);border:0}
.sn-open{display:inline-flex;align-items:center;gap:var(--space-8);min-height:var(--touch-target);color:var(--tomato-deep);font-size:var(--role-meta-size);text-decoration:none}
.sn-open .fa-solid{font-size:var(--icon-sm)}
.sn-open:focus-visible,.sn-tabs button:focus-visible{outline:2px solid var(--tomato);outline-offset:2px}
/* Narrow screens: three tabs, one screen at a time. */
@media (max-width:1320px){
  .sn-head{padding:var(--space-24) var(--gutter) var(--space-16)}
  .sn-tabs{position:sticky;top:0;z-index:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-4);max-width:calc(var(--sn-phone-w) + 2 * var(--gutter));margin:0 auto;padding:var(--space-4);border-radius:var(--radius-segment);background:var(--line)}
  .sn-tabs button{min-height:var(--touch-target);padding:0 var(--space-4);border:0;border-radius:var(--radius-control);background:transparent;color:var(--slate-2);font-family:var(--font);font-size:var(--role-meta-size);cursor:pointer}
  .sn-tabs button[aria-selected=true]{background:var(--paper);color:var(--tomato-deep);font-family:GilroyBd,var(--font);box-shadow:var(--sh-sm)}
  .sn-screens{display:block;padding:var(--space-16) var(--gutter) var(--space-32)}
  .sn-screen{display:none}
  .sn-screen.is-active{display:flex}
  .sn-screen h2{display:none}
}
@media (max-width:600px){
  .sn-head,.sn-tabs{margin-inline:var(--gutter)}
  .sn-screens{padding:var(--space-12) 0 var(--space-24)}
  .sn-phone{width:100%;height:calc(100dvh - var(--space-48) - var(--space-24));min-height:var(--sn-phone-min);border-radius:0;box-shadow:none;outline:0}
  .sn-phone iframe{width:100%;height:100%}
}
"""
files['sunum.js'] = """/* Dar ekranda üç sekme, tek ekran. */
(() => {
  const tabs = [...document.querySelectorAll('[data-sn-tab]')];
  const pick = (i, focus) => tabs.forEach(t => { const on = t.dataset.snTab === String(i); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on); const f = document.querySelector('#' + t.getAttribute('aria-controls') + ' iframe'); if (on && f) f.loading = 'eager'; if (on && focus) t.focus(); });
  tabs.forEach(t => t.addEventListener('click', () => pick(t.dataset.snTab)));
  document.querySelector('.sn-tabs').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); pick(((i + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3) + 1, true); });
})();
"""
for n in ['index.html', 'sunum.css']: scan(n, files[n])
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
(out / 'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/yeni-tasarim/\n')

allfiles = [p for p in out.rglob('*') if p.is_file()]
bad = [str(p) for p in allfiles if p.suffix in ('.mjs', '.py', '.env', '.md') or p.name.startswith('.')]
assert not bad, bad
refs_outside = []
for n, s in files.items():
    for ref in re.findall(r'(?:src="|href="|url\([\'"]?)(\.\.?/[^"\'\)\s]+)', s):
        if posixpath.normpath(posixpath.join(posixpath.dirname(n), ref.split('?')[0])).startswith('..'): refs_outside.append((n, ref))
assert not refs_outside, refs_outside
report = {'count': len(allfiles), 'bytes': sum(p.stat().st_size for p in allfiles), 'screens': SCREENS, 'skipped_missing_fallback_fonts': skipped,
          'largest': sorted([(str(p.relative_to(out)), p.stat().st_size) for p in allfiles], key=lambda x: -x[1])[:5]}
(ev / 'build.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)); print(json.dumps(report, ensure_ascii=False, indent=2))
