# Yeni tasarım 2. sürüm yayını (docs/46): v3-app'teki üç ekranın birleştirilmiş hâlinin çalışan kopyasını
# yayin/yeni-tasarim-v2 altına üretir. Yöntem docs/43 ve docs/45 ile aynı (v3-app/verification/yeni-tasarim/build.py):
# bağımlılık taraması, göreli yollar, yayına özel bağlantılar, Cache-Control meta, içerik özeti (sha256 ilk 12) ile ?v=
# damgası (iframe adresleri dahil), klasöre özel robots. yayin/ altındaki diğer bütün dosyalar korunur (before.json).
# Proje kökünden çalıştır: python3 v3-app/verification/yeni-tasarim-v2/build.py
from pathlib import Path
import json, re, hashlib, shutil, posixpath
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

src = Path('v3-app'); out = Path('yayin/yeni-tasarim-v2'); ev = Path('v3-app/verification/yeni-tasarim-v2')
assert not out.exists() or (ev / 'build.json').exists(), 'yayin/yeni-tasarim-v2 beklenmedik biçimde var'
SCREENS = ['ana-v3.html', 'liste-v2.html', 'detay-v2.html']

# Protect every pre-existing published file (outside this folder).
if not (ev / 'before.json').exists():
    (ev / 'before.json').write_text(json.dumps({str(p.relative_to('yayin')): hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file() and 'yeni-tasarim-v2' not in p.parts}))
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

# Publication-only link map. docs/46: the three screens already link to each other in v3-app (cards → detay-v2,
# "Tümü" → liste-v2). Here only targets that are not published are mapped: search → list, Tabaktan Tarif → "Yakında"
# (empty href, the shared toast), and any leftover old page names. Option parameters are carried by ortak-kart.js.
files['yayin-baglantilar.js'] = r"""/* Yayın kopyası bağlantıları: üç ekran birbirine bağlı; yayında olmayan sayfalara bağlantı kalmaz. */
(() => {
  const keep = (q, names) => { const p = new URLSearchParams(q), o = new URLSearchParams(); for (const [k, v] of p) if (names.some(n => k === n || k.startsWith(n + '['))) o.append(k, v); const s = o.toString(); return s ? '?' + s : ''; };
  function map(h) {
    if (!h || /^(https?:|mailto:|tel:|#|data:|javascript:)/.test(h)) return null;
    const [path, query = ''] = h.split('#')[0].split('?'), hash = h.includes('#') ? '#' + h.split('#')[1] : '';
    if (/^(detay-c|tarif-detay)\.html$/.test(path)) return 'detay-v2.html' + (query ? '?' + query : '') + hash;
    if (/^(liste|tarifler)\.html$/.test(path)) return 'liste-v2.html' + keep(query, ['kategori', 'sirala', 'malzeme', 'mutfak', 'q', 'sayfa', 'gosterge', 'radius', 'rozet', 'siralama', 'yazar', 'giris']) + hash;
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

# The page for the boss: two option rows × three screens, then the four chef card options. Every phone is a 390×844
# iframe; on desktop the frame is scaled to fit while its content stays 390 wide. Narrow screens: three tabs, screens stacked.
SCREEN_NAMES = [('ana-v3.html', '1. Ana Sayfa'), ('liste-v2.html', '2. Tarif Listesi'), ('detay-v2.html', '3. Tarif Detay')]
def row_params(o):
    # Listed per screen first; the row's other screen options follow so a link inside the phone keeps the whole row.
    return {'ana-v3.html': f'gosterge={o}&radius={o}&rozet={o}&siralama={o}&yazar={o}',
            'liste-v2.html': f'siralama={o}&gosterge={o}&radius={o}&rozet={o}&yazar={o}',
            'detay-v2.html': f'yazar={o}&radius={o}&rozet={o}&gosterge={o}&siralama={o}'}
GROUPS = [
    ('sn-g1', 'Seçenek 1', 'Seçenek 1', [(f, t, f'{f}?{row_params("a")[f]}') for f, t in SCREEN_NAMES]),
    ('sn-g2', 'Seçenek 2', 'Seçenek 2', [(f, t, f'{f}?{row_params("b")[f]}') for f, t in SCREEN_NAMES]),
    ('sn-g3', 'Şef kartları', 'Tarif detay: şef kartı seçenekleri', [('detay-v2.html', f'Şef kartı {i}', f'detay-v2.html?yazar={v}') for i, v in enumerate('abcd', 1)]),
]
def phone(gid, title, url, label, eager):
    frame = url + '&gallery=1'
    return (f'<figure class="sn-screen"><figcaption>{title}</figcaption><div class="sn-phone"><iframe src="{frame}" title="{label} · {title}" width="390" height="844" loading="{"eager" if eager else "lazy"}"></iframe></div>'
            f'<a class="sn-open" href="{url}" target="_blank" rel="noopener">Tam ekran aç <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></figure>')
files['index.html'] = ('<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#F9F9F9"><title>DadaGastro Mobil Uygulama — Yeni Tasarım (2. sürüm)</title><link rel="icon" href="assets/marka/dadagastro-renkli.svg"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="assets/fontawesome/css/all.min.css"><link rel="stylesheet" href="sunum.css"><script src="sunum.js" defer></script></head><body>\n'
    '<header class="sn-head"><img class="sn-logo" src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro" width="96" height="60"><h1>DadaGastro Mobil Uygulama — Yeni Tasarım (2. sürüm)</h1><p>İki seçenek alt alta. Ekranların içinde kaydırabilir, menüyü açabilir, sekmelere dokunabilirsiniz.</p></header>\n'
    '<nav class="sn-tabs" role="tablist" aria-label="Seçenekler">' + ''.join(f'<button role="tab" id="{g}-tab" aria-controls="{g}" aria-selected="{str(i == 0).lower()}" data-sn-tab="{g}"{"" if i == 0 else " tabindex=-1"}>{tab}</button>' for i, (g, tab, _, _) in enumerate(GROUPS)) + '</nav>\n'
    '<main class="sn-groups">' + ''.join(
        f'<section class="sn-group{" is-active" if gi == 0 else ""}" id="{g}" role="tabpanel" aria-labelledby="{g}-tab"><h2>{heading}</h2><div class="sn-row" data-cols="{len(items)}">'
        + ''.join(phone(g, t, url, tab, gi == 0) for f, t, url in items) + '</div></section>'
        for gi, (g, tab, heading, items) in enumerate(GROUPS)) + '</main>\n</body></html>')
files['sunum.css'] = """/* Sunum sayfası: tokenlar tokens.css'ten; Gilroy, açık nötr zemin, Font Awesome solid. Kahverengi yok. */
/* Telefon: talimattaki 390×844 cihaz ölçüsü. Masaüstünde çerçeve --sn-s ile ölçeklenir, içerik 390 genişlikte kalır. */
:root{--sn-phone-w:390px;--sn-phone-h:844px;--sn-gap:var(--space-32)}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font);-webkit-font-smoothing:antialiased}
.sn-head,.sn-groups{max-width:calc(4 * var(--sn-phone-w) + 3 * var(--sn-gap) + 2 * var(--space-40));margin:0 auto;padding-inline:var(--space-40)}
.sn-head{padding-top:var(--space-40);padding-bottom:var(--space-16)}
.sn-logo{display:block;width:calc(var(--space-48) + var(--space-16));height:auto;margin-bottom:var(--space-16)}
.sn-head h1{margin:0 0 var(--space-8);font-family:GilroyBd,var(--font);font-size:var(--role-page-size);line-height:var(--role-page-line);letter-spacing:var(--role-page-tracking)}
.sn-head p{margin:0;font-size:var(--role-body-size);line-height:var(--role-body-line);color:var(--slate-2)}
.sn-tabs{display:none}
.sn-groups{display:grid;gap:var(--space-48);padding-top:var(--space-24);padding-bottom:var(--space-48)}
.sn-group h2{margin:0 0 var(--space-16);font-family:GilroyBd,var(--font);font-size:var(--role-section-size);font-weight:var(--role-section-weight);line-height:var(--role-section-line);letter-spacing:var(--role-section-tracking)}
.sn-group+.sn-group{padding-top:var(--space-48);border-top:var(--border-width) solid var(--line)}
.sn-group{min-width:0}
.sn-row{--sn-s:1;min-width:0;display:flex;justify-content:flex-start;align-items:flex-start;gap:var(--sn-gap)}
.sn-screen{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-12);margin:0}
.sn-screen figcaption{font-family:GilroyBd,var(--font);font-size:var(--role-subheading-size);line-height:var(--role-subheading-line);color:var(--ink)}
.sn-phone{width:calc(var(--sn-phone-w) * var(--sn-s));height:calc(var(--sn-phone-h) * var(--sn-s));overflow:hidden;border-radius:var(--radius-card);background:var(--paper);box-shadow:var(--sh-md);outline:var(--border-width) solid var(--line)}
.sn-phone iframe{display:block;width:var(--sn-phone-w);height:var(--sn-phone-h);border:0;transform:scale(var(--sn-s));transform-origin:0 0}
.sn-open{display:inline-flex;align-items:center;gap:var(--space-8);min-height:var(--touch-target);color:var(--tomato-deep);font-size:var(--role-meta-size);text-decoration:none}
.sn-open .fa-solid{font-size:var(--icon-sm)}
.sn-open:focus-visible,.sn-tabs button:focus-visible{outline:2px solid var(--tomato);outline-offset:2px}
/* Narrow screens: three tabs (Seçenek 1 / Seçenek 2 / Şef kartları), the screens of the chosen tab stacked. */
@media (max-width:900px){
  .sn-head,.sn-groups{padding-inline:var(--gutter)}
  .sn-head{padding-top:var(--space-24)}
  .sn-tabs{position:sticky;top:0;z-index:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-4);max-width:calc(var(--sn-phone-w) + 2 * var(--gutter));margin:0 auto;padding:var(--space-4);border-radius:var(--radius-segment);background:var(--line)}
  .sn-tabs button{min-height:var(--touch-target);padding:0 var(--space-4);border:0;border-radius:var(--radius-control);background:transparent;color:var(--slate-2);font-family:var(--font);font-size:var(--role-meta-size);cursor:pointer}
  .sn-tabs button[aria-selected=true]{background:var(--paper);color:var(--tomato-deep);font-family:GilroyBd,var(--font);box-shadow:var(--sh-sm)}
  .sn-groups{display:block;padding-top:var(--space-16)}
  .sn-group{display:none}
  .sn-group.is-active{display:block}
  .sn-group+.sn-group{padding-top:0;border-top:0}
  .sn-row{flex-direction:column;align-items:center;gap:var(--space-32)}
  .sn-screen{align-items:center}
}
@media (max-width:600px){
  .sn-tabs{margin-inline:var(--gutter)}
}
"""
files['sunum.js'] = """/* Telefon ölçeği: satırdaki telefonlar sığacak kadar küçülür (en çok 1); içerik 390 genişlikte kalır.
   Dar ekranda üç sekme; seçilen sekmenin ekranları alt alta. */
(() => {
  const narrow = matchMedia('(max-width:900px)');
  function fit() {
    for (const row of document.querySelectorAll('.sn-row')) {
      const n = narrow.matches ? 1 : Number(row.dataset.cols) || 1, gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      // The group's content box (not the row: its children could widen it before the first fit).
      const g = row.parentElement, cs = getComputedStyle(g), room = g.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      row.style.setProperty('--sn-s', Math.min(1, (room - gap * (n - 1)) / (n * 390)).toFixed(4));
    }
  }
  const tabs = [...document.querySelectorAll('[data-sn-tab]')];
  const pick = (id, focus) => { tabs.forEach(t => { const on = t.dataset.snTab === id; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on); if (on && focus) t.focus(); }); fit(); };
  tabs.forEach(t => t.addEventListener('click', () => pick(t.dataset.snTab)));
  document.querySelector('.sn-tabs').addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); pick(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].dataset.snTab, true); });
  addEventListener('resize', fit); addEventListener('load', fit); narrow.addEventListener?.('change', fit);
  // Re-fit whenever the page's width settles or changes (WebKit can lay out after the first call).
  // Only a width change re-fits, on the next frame: the fit changes heights, never the observed width (no observer loop).
  let lastW = -1, frame = 0;
  new ResizeObserver(([e]) => { const w = Math.round(e.contentRect.width); if (w === lastW) return; lastW = w; cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); }).observe(document.querySelector('.sn-groups')); fit();
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
(out / 'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/yeni-tasarim-v2/\n')

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
