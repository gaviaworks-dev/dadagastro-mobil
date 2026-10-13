from pathlib import Path
import re,hashlib,json,posixpath
from urllib.parse import urlsplit,urlunsplit,parse_qsl,urlencode
src=Path('v3-app');out=Path('yayin/secenekler');ev=src/'verification/set2-release'
names=['ld-set2.css','ld-set2-common.js','liste-set2.js','detay-set2.js','karar-masasi.css','karar-masasi.js']+[f'{k}-x{n}.html' for k in ['liste','detay'] for n in range(1,7)]+['liste-alti.html','detay-alti.html']
files={n:(src/n).read_text() for n in names}
files['ld-set2-common.js']=files['ld-set2-common.js'].replace(r'tarifler\.html',r'(?:tarifler|liste-1)\.html').replace("u.replace('tarifler.html',", "u.replace(/^(?:tarifler|liste-1)\\.html/,").replace(r'tarif-detay\.html',r'(?:tarif-detay|detay-1)\.html').replace("u.replace('tarif-detay.html',", "u.replace(/^(?:tarif-detay|detay-1)\\.html/,").replace(r'index\.html',r'(?:index|ana-1)\.html').replace("u.replace('index.html',", "u.replace(/^(?:index|ana-1)\\.html/,")
files['index.html']=(out/'index.html').read_text().replace('<strong>6</strong>','<strong>12</strong>').replace('Keşfetmenin altı yolu','İki yapı, on iki keşif yolu').replace('Aynı tarif, altı yaklaşım','İki yapı, on iki yaklaşım')
def digest(n):return hashlib.sha256(files[n].encode() if n in files else (out/n).read_bytes()).hexdigest()[:12]
def ver(u,owner,html=False):
 x=urlsplit(u)
 if x.scheme or x.netloc or not x.path or x.path.startswith('/'):return u
 target=posixpath.normpath(posixpath.join(posixpath.dirname(owner),x.path))
 if not (out/target).is_file() and target not in files:raise ValueError('Missing '+target+' in '+owner)
 if target.endswith('.html') and not html:return u
 q=[(k,v) for k,v in parse_qsl(x.query) if k!='v']
 if target=='liste-x6.html' and html and not any(k=='gallery' for k,v in q):q.append(('gallery','1'))
 q.append(('v',digest(target)))
 return urlunsplit(('','',x.path,urlencode(q),x.fragment))
for n in names:
 if n.endswith('.css'):files[n]=re.sub(r'url\(([\'\"]?)([^\)\'\"]+)([\'\"]?)\)',lambda m:'url('+m[1]+ver(m[2],n)+m[3]+')',files[n])
for n in list(files):
 if not n.endswith('.html'):continue
 s=files[n]
 if 'Cache-Control' not in s:s=s.replace('</head>','<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"></head>')
 assert 'noindex' in s
 s=re.sub(r'((?:src|href)=")([^"#]+)(")',lambda m:m[1]+ver(m[2],n)+m[3],s)
 files[n]=s
for n in ['liste-alti.html','detay-alti.html']:
 files[n]=re.sub(r'(<iframe[^>]*src=")([^"]+)(")',lambda m:m[1]+ver(m[2],n,True)+m[3],files[n])
for n,s in files.items():(out/n).write_text(s)
before=json.loads((ev/'before.json').read_text());changed=[]
for p in Path('yayin').rglob('*'):
 if p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()!=before.get(str(p.relative_to('yayin'))):changed.append(str(p.relative_to('yayin')))
assert set(changed)=={'secenekler/'+n for n in files},changed
report={'changed':changed,'count':len(changed),'bytes':sum((Path('yayin')/n).stat().st_size for n in changed),'package_count':sum(p.is_file() for p in out.rglob('*')),'package_bytes':sum(p.stat().st_size for p in out.rglob('*') if p.is_file())}
(ev/'build.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
