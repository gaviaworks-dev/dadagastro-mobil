from pathlib import Path
import json,re,hashlib,shutil,posixpath
from urllib.parse import urlsplit,urlunsplit,parse_qsl,urlencode
src=Path('yayin/secenekler');out=Path('yayin/secenekler-v2');ev=Path('v3-app/verification/v2-release');out.mkdir(exist_ok=True)
rows=json.loads((ev/'inventory.json').read_text());expected=[f'ana-{c}{n}.html' for c in ['','x','y'] for n in range(1,10)];assert [r['src'] for r in rows]==expected
selected=['ana-1.html','ana-4.html','ana-x1.html','ana-x6.html','ana-y3.html','ana-y8.html'];keep=[r for r in rows if r['src'] in selected]
# Protect every pre-existing published file.
if not (ev/'before.json').exists():(ev/'before.json').write_text(json.dumps({str(p.relative_to('yayin')):hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file() and 'secenekler-v2' not in p.parts}))
articles=[]
for r in keep:
 s=r['html'];setn=1 if not re.search(r'ana-[xy]',r['src']) else (2 if '-x' in r['src'] else 3)
 s=s.replace('<article class="option">',f'<article class="option"><h2 class="set-label">SET {setn}</h2>',1)
 articles.append(s)
gallery='''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>DadaGastro · Ana sayfa v2</title><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="six-presentation.css"><script src="six-presentation.js" defer></script><style>.set-label{font-family:GilroyBd,var(--font);font-size:var(--role-page-size);margin:0;padding:var(--space-16) var(--space-20);color:var(--tomato-dark)}.caption{min-height:236px}</style></head><body><header class="intro"><a class="brand" href="index.html"><img src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro"></a><p class="eyebrow">ANA SAYFA · v2</p><h1>Altı fikir kaldı.</h1><p class="intro-copy">Seçilen ana sayfalar, ilk galerideki adları ve numaralarıyla.</p></header><main class="alternatives">'''+''.join(articles)+'</main></body></html>'
# Local gallery only; alternatives and original gallery remain intact.
Path('v3-app/ana-sayfa-v2.html').write_text(gallery.replace('href="index.html"','href="ana-sayfa-v2.html"'))
entry=(src/'index.html').read_text().replace('Tasarım seçenekleri</title>','Tasarım seçenekleri v2</title>').replace('Birlikte seçelim.','Birlikte seçelim. · v2').replace('TASARIM SEÇENEKLERİ','TASARIM SEÇENEKLERİ · v2').replace('ana-sayfa-alti.html','ana-sayfa-v2.html').replace('<strong>27</strong>','<strong>6</strong>').replace('Üç farklı tasarım ailesi','Üç setten seçilen altı ana sayfa').replace('href="liste-alti.html"','href="../secenekler/liste-alti.html"').replace('href="detay-alti.html"','href="../secenekler/detay-alti.html"').replace('<strong>12</strong>','').replace('İki yapı, on iki keşif yolu','Revize hazırlanıyor').replace('İki yapı, on iki yaklaşım','Revize hazırlanıyor')
files={'ana-sayfa-v2.html':gallery,'index.html':entry};pending=selected+['arama.html','tabaktan-tarif.html','secenekler.css'];copied=set();asset_re=r'assets/[A-Za-z0-9_./% -]+\.(?:webp|avif|jpg|jpeg|svg|woff2?|ttf|otf|json|mp3)'
def add(n):
 n=posixpath.normpath(n.split('?')[0]);assert not n.startswith(('../','/')),n
 if n not in files and n not in copied and n not in pending:pending.append(n)
def scan(n,s):
 for a in set(re.findall(asset_re,s)):add(a)
 if n.endswith('.html'):
  for a in re.findall(r'(?:src|href)="([^"?#]+\.(?:js|css))',s):add(a)
 if n.endswith('.css'):
  for a in re.findall(r'url\([\'\"]?([^\)\'\"?#]+)',s):
   if not a.startswith(('http','data:')):add(posixpath.join(posixpath.dirname(n),a))
for n,s in files.items():scan(n,s)
while pending:
 n=pending.pop(0)
 if n in files or n in copied:continue
 p=src/n;assert p.is_file(),n
 if p.suffix in ['.html','.css','.js','.json']:
  s=p.read_text();scan(n,s);files[n]=s
 else:
  assert p.suffix not in ['.png','.mjs','.py','.env'];d=out/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,d);copied.add(n)
# Keep unselected navigation working through v1, without copying its screens.
htmlknown={p.name for p in src.glob('*.html')};own={n for n in files if n.endswith('.html')}
for n,s in list(files.items()):
 if n.endswith(('.html','.js')):
  for target in sorted(htmlknown-own,key=len,reverse=True):
   replacement='ana-sayfa-v2.html' if target=='ana-sayfa-alti.html' else '../secenekler/'+target
   s=re.sub(r'(?<![\w/.-])'+re.escape(target)+r'(?=[?\'"`#<]|$)',replacement,s)
 if n.endswith('.html') and 'Cache-Control' not in s:s=s.replace('</head>','<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"></head>')
 files[n]=s
# Re-stamp all copied runtime references after publication-only link rewrites.
done=set()
def digest(n):return hashlib.sha256(files[n].encode() if n in files else (out/n).read_bytes()).hexdigest()[:12]
def ver(u,owner,frame=False):
 x=urlsplit(u)
 if x.scheme or x.netloc or not x.path:return u
 target=posixpath.normpath(posixpath.join(posixpath.dirname(owner),x.path))
 if target not in files and target not in copied:return u
 if target.endswith('.html') and not frame:return u
 q=[(k,v) for k,v in parse_qsl(x.query) if k!='v']+[('v',digest(target))];return urlunsplit(('','',x.path,urlencode(q),x.fragment))
def finish(n):
 if n in done:return
 s=files[n];deps=set(re.findall(asset_re,s))
 if n.endswith('.html'):deps.update(u.split('?')[0] for u in re.findall(r'(?:src|href)="([^"#]+\.(?:js|css)(?:\?[^"#]*)?)',s))
 for d in deps:
  if d in files:finish(d)
 if n.endswith('.css'):s=re.sub(r'url\(([\'\"]?)([^\)\'\"]+)([\'\"]?)\)',lambda m:'url('+m[1]+ver(m[2],n)+m[3]+')',s)
 if n.endswith(('.js','.json')):s=re.sub(asset_re+r'(?:\?v=[a-f0-9]+)?',lambda m:ver(m[0],n),s)
 if n.endswith('.html'):s=re.sub(r'((?:src|href)=")([^"]+)(")',lambda m:m[1]+ver(m[2],n)+m[3],s)
 files[n]=s;done.add(n)
for n in files:finish(n)
files['ana-sayfa-v2.html']=re.sub(r'(<iframe[^>]*src=")([^"]+)(")',lambda m:m[1]+ver(m[2],'ana-sayfa-v2.html',True)+m[3],files['ana-sayfa-v2.html'])
for n,s in files.items():
 (out/n).parent.mkdir(parents=True,exist_ok=True);(out/n).write_text(s)
(out/'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/secenekler-v2/\n')
allfiles=[p for p in out.rglob('*') if p.is_file()];assert sorted(p.name for p in out.glob('ana-*.html') if p.name!='ana-sayfa-v2.html')==sorted(selected)
report={'count':len(allfiles),'bytes':sum(p.stat().st_size for p in allfiles),'largest':sorted([(str(p.relative_to(out)),p.stat().st_size) for p in allfiles],key=lambda x:-x[1])[:5],'selected':[{k:v for k,v in r.items() if k!='html'} for r in keep]};(ev/'build.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
