from pathlib import Path
import re,json,hashlib,shutil,urllib.request,posixpath
from urllib.parse import urlsplit,urlunsplit,parse_qsl,urlencode
src=Path('v3-app');out=Path('yayin/secenekler');ev=src/'verification/gallery-release';out.mkdir(parents=True,exist_ok=True)
roots=json.loads((ev/'roots.json').read_text()); pending=list(roots); files={}; copied=set(); mapping=json.loads(Path('docs/release-build.json').read_text())['mapping']; downloads=[]
alias={'index.html':'ana-1.html','tarifler.html':'liste-1.html','tarif-detay.html':'detay-1.html','liste.html':'liste-1.html','detay-c.html':'detay-1.html','ana-a.html':'ana-1.html','ana-a-uzun.html':'ana-1.html','ana-a-orta.html':'ana-1.html','ana-a-kisa.html':'ana-1.html'}
asset_re=r'''assets/[A-Za-z0-9_./% -]+\.(?:webp|avif|jpg|jpeg|png|svg|woff2?|ttf|otf|json|mp3)'''
remote_re=r'''(?:https://dadagastro\.com)?/varliklar/[^\s'"\)<>]+?\.(?:webp|avif|jpg|jpeg|png|mp3)(?:\?[^\s'"\)<>]*)?'''
def add(name):
 name=posixpath.normpath(name)
 if name in files or name in copied or name in pending:return
 if name.startswith(('../','/')):raise RuntimeError('Outside '+name)
 if any(x in name.split('/') for x in ['verification','docs','eski']) or name.endswith('.png'):raise RuntimeError('Excluded dependency '+name)
 pending.append(name)
def media(u):
 full=u if u.startswith('https:') else 'https://dadagastro.com'+u
 target=mapping.get(u) or mapping.get(full) or mapping.get(full.removeprefix('https://dadagastro.com'))
 if target and ((src/target).exists() or (Path('yayin')/target).exists()):add(target);return target
 target='assets/media/'+hashlib.sha256(full.encode()).hexdigest()[:20]+'.'+urlsplit(full).path.rsplit('.',1)[1];dest=out/target
 if not dest.exists():dest.parent.mkdir(parents=True,exist_ok=True);urllib.request.urlretrieve(full,dest);downloads.append(full)
 copied.add(target);return target
while pending:
 name=pending.pop(0)
 if name in files or name in copied:continue
 path=src/name
 if not path.exists():path=Path('yayin')/name
 if not path.exists() and name.startswith('assets/fontawesome/'):path=Path('/Users/gaviaworks/Developer/Backend Projects/dadagastro/public')/name.removeprefix('assets/')
 if not path.exists():raise RuntimeError('Missing '+name)
 if path.suffix not in ['.html','.css','.js','.json']:
  dest=out/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(path,dest);copied.add(name);continue
 s=path.read_text()
 if name.endswith('.css'):s=re.sub(r',url\([^)]*\.ttf[^)]*\) format\([^)]+\)', '', s)
 if name=='ana-sayfa-alti.html':s=re.sub(r'<img src="assets/six-current-home.png"[^>]*>','',s)
 # Rewrite only publication copies. Keep all data-page names and source files intact.
 for a,b in sorted(alias.items(),key=lambda kv:len(kv[0]),reverse=True):s=re.sub(r'(?<![\w/-])'+re.escape(a)+r'(?=[?\'"`#<]|$)',b,s)
 if name=='ld-links.js':s=s.replace(r'tarifler\.html',r'liste-1\.html').replace(r'tarif-detay\.html',r'detay-1\.html').replace(r'index\.html',r'ana-1\.html')
 for u in sorted(set(re.findall(remote_re,s)),key=len,reverse=True):s=s.replace(u,media(u))
 for a in set(re.findall(asset_re,s)):add(a)
 if path.suffix=='.html':
  for a in re.findall(r'(?:src|href)="([^"?#]+\.(?:js|css))',s):add(a)
  s=re.sub(r'<meta\s+name="robots"[^>]*>','',s)
  s=s.replace('</head>','<meta name="robots" content="noindex,nofollow"><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"></head>')
 if path.suffix=='.css':
  for a in re.findall(r'url\([\'\"]?([^\)\'\"?#]+)',s):
   if not a.startswith(('data:','http')):add(posixpath.join(posixpath.dirname(name),a))
 files[name]=s
# Small entry uses the same brand tokens; no screenshots or project documentation.
files['index.html']='''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><title>DadaGastro · Tasarım seçenekleri</title><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="secenekler.css"></head><body><main><img class="logo" src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro"><p class="eyebrow">TASARIM SEÇENEKLERİ</p><h1>Birlikte seçelim.</h1><p class="intro">Ana sayfa, tarif listesi ve tarif detay tasarımlarını karşılaştır.</p><nav aria-label="Tasarım galerileri"><a href="ana-sayfa-alti.html"><span>Ana sayfa</span><strong>27</strong><small>Üç farklı tasarım ailesi</small></a><a href="liste-alti.html"><span>Tarif listesi</span><strong>6</strong><small>Keşfetmenin altı yolu</small></a><a href="detay-alti.html"><span>Tarif detay</span><strong>6</strong><small>Aynı tarif, altı yaklaşım</small></a></nav></main></body></html>'''
files['secenekler.css']='''*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font);font-size:var(--type-body)}main{max-width:900px;margin:auto;padding:var(--space-48) var(--space-20)}.logo{width:144px;height:auto}.eyebrow{margin:var(--space-48) 0 var(--space-8);color:var(--tomato-dark);font-size:var(--type-label)}h1{font-family:GilroyBd;font-size:var(--type-display);line-height:1.1;margin:0}.intro{color:var(--slate-2);line-height:1.55;margin:var(--space-16) 0 var(--space-32)}nav{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-16)}a{position:relative;display:grid;gap:var(--space-20);padding:var(--space-24);min-height:200px;background:var(--paper);color:inherit;text-decoration:none;border:1px solid var(--line);border-top:4px solid var(--tomato);border-radius:var(--radius-card);box-shadow:var(--sh-sm)}a span{font-family:GilroyBd;font-size:var(--type-section)}a strong{font-size:var(--type-display);color:var(--tomato-dark)}a small{font-size:var(--type-meta);color:var(--muted)}a:hover{border-color:var(--tomato)}a:focus-visible{outline:2px solid var(--tomato);outline-offset:4px}@media(max-width:650px){main{padding-top:var(--space-32)}nav{grid-template-columns:1fr}a{grid-template-columns:1fr auto;min-height:140px}a small{grid-column:1/-1}a strong{grid-column:2;grid-row:1}.eyebrow{margin-top:var(--space-32)}}'''
# Close explicit same-directory HTML references; aliases provide safe legacy return targets.
for a,b in alias.items():
 if a=='index.html':continue
 files[a]=f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>DadaGastro</title><script>location.replace("{b}"+location.search+location.hash)</script></head><body><a href="{b}">Ekranı aç</a></body></html>'
# Version leaves first, then CSS (including font URLs), JS asset strings and HTML last.
def digest(name):return hashlib.sha256((files[name].encode() if name in files else (out/name).read_bytes())).hexdigest()[:12]
def version(url,owner):
 parts=urlsplit(url)
 if parts.scheme or parts.netloc or not parts.path or parts.path.startswith('#'):return url
 target=posixpath.normpath(posixpath.join(posixpath.dirname(owner),parts.path))
 if target not in files and target not in copied:return url
 if target.endswith('.html'):return url
 query=[(k,v) for k,v in parse_qsl(parts.query) if k!='v']+[('v',digest(target))]
 return urlunsplit(('','',parts.path,urlencode(query),parts.fragment))
done=set();busy=set()
def finish(name):
 if name in done or name in busy:return
 busy.add(name)
 s=files[name]
 deps=set(re.findall(asset_re,s))
 if name.endswith('.css'):
  deps.update(posixpath.normpath(posixpath.join(posixpath.dirname(name),u.split('?')[0])) for u in re.findall(r'url\([\'\"]?([^\)\'\"]+)',s))
 if name.endswith('.html'):
  deps.update(u.split('?')[0] for u in re.findall(r'(?:src|href)="([^"#]+)',s) if not u.split('?')[0].endswith('.html'))
 for d in deps:
  if d in files:finish(d)
 if name.endswith('.css'):s=re.sub(r'url\(([\'\"]?)([^\)\'\"]+)([\'\"]?)\)',lambda m:'url('+m[1]+version(m[2],name)+m[3]+')',s)
 if name.endswith(('.js','.json')):s=re.sub(asset_re,lambda m:version(m[0],name),s)
 if name.endswith('.html'):s=re.sub(r'((?:src|href)=")([^"]+)(")',lambda m:m[1]+version(m[2],name)+m[3],s)
 files[name]=s;busy.remove(name);done.add(name)
for name in list(files):finish(name)
# Frame versions are hashes of the final screen HTML, not hand-written release labels.
for name in roots[:3]:
 def frame_version(m):
  u=urlsplit(m[2]);q=[(k,v) for k,v in parse_qsl(u.query) if k!='v']+[('v',digest(u.path))]
  return m[1]+urlunsplit(('','',u.path,urlencode(q),u.fragment))+m[3]
 files[name]=re.sub(r'(<iframe[^>]*src=")([^"]+)(")',frame_version,files[name])
for name,s in files.items():dest=out/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(s)
(out/'robots.txt').write_text('User-agent: *\nDisallow: /dadagastro-mobil/secenekler/\n')
allfiles=[p for p in out.rglob('*') if p.is_file()];report={'count':len(allfiles),'bytes':sum(p.stat().st_size for p in allfiles),'largest':sorted([(str(p.relative_to(out)),p.stat().st_size) for p in allfiles],key=lambda x:-x[1])[:12],'downloaded':downloads,'files':sorted(str(p.relative_to(out)) for p in allfiles)};(ev/'build.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='files'},ensure_ascii=False,indent=2))
