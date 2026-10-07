from pathlib import Path
import json,re,shutil,hashlib,urllib.request
root=Path('.');out=root/'yayin';out.mkdir(exist_ok=True)
for folder in ['fonts','fontawesome','marka','bolumler']:
 shutil.copytree(root/'assets'/folder,out/'assets'/folder,dirs_exist_ok=True)
media=json.loads(Path('docs/yayin-medya-envanteri.json').read_text())['mapping']; downloaded=[]
js=Path('app.js').read_text()
css=Path('app.css').read_text()
tokens=Path('tokens.css').read_text()
files={'app.js':js,'app.css':css,'tokens.css':tokens}
for name,s in list(files.items()):
 urls=set(re.findall(r'''(?:https://dadagastro\.com)?/varliklar/[^\s'"\)<>]+?\.(?:webp|avif|jpg|jpeg|png|mp3)(?:\?[^\s'"\)<>]*)?''',s))
 for u in sorted(urls,key=len,reverse=True):
  full=u if u.startswith('https:') else 'https://dadagastro.com'+u
  target=media.get(u) or media.get(full) or media.get(full.removeprefix('https://dadagastro.com'))
  if not target:
   target='assets/media/'+hashlib.sha256(full.encode()).hexdigest()[:20]+'.'+u.split('?')[0].rsplit('.',1)[1]; dest=out/target;dest.parent.mkdir(parents=True,exist_ok=True)
   urllib.request.urlretrieve(full,dest);media[u]=target;downloaded.append(u)
  if not (out/target).exists():raise RuntimeError('Missing media '+target)
  s=s.replace(u,target)
 files[name]=s
versions={}
def version_asset(match):
 from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
 tag,attr,url=match.group(1),match.group(2),match.group(3)
 parts=urlsplit(url)
 if parts.scheme or parts.netloc or not parts.path.endswith(('.css','.js')):return match.group(0)
 path=parts.path.removeprefix('./')
 content=files[path].encode() if path in files else (out/path).read_bytes()
 digest=hashlib.sha256(content).hexdigest()[:12];versions[path]=digest
 query=[(k,v) for k,v in parse_qsl(parts.query) if k!='v']+[('v',digest)]
 return tag+attr+'="'+urlunsplit(('', '', parts.path, urlencode(query), parts.fragment))+'"'
for name in ['index.html','tarifler.html','tarif-detay.html','tabaktan-tarif.html']:
 s=Path(name).read_text().replace('<body ', '<body data-demo-pro="true" ');s=re.sub('<title>.*?</title>','<title>DadaGastro</title>',s);s=s.replace('content="#F9F9F9"','content="#E14827"');s=s.replace('</head>','<meta name="robots" content="noindex,nofollow"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="icon" href="assets/marka/dadagastro-amblem.svg"><link rel="apple-touch-icon" href="assets/marka/dadagastro-amblem.svg"></head>');s=s.replace('</head>','<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"></head>');s=re.sub(r'(<(?:link|script)\b[^>]*?)(href|src)="([^"]+)"',version_asset,s);files[name]=s
for name,s in files.items(): (out/name).write_text(s)
(out/'robots.txt').write_text('User-agent: *\nDisallow: /\n');(out/'.nojekyll').touch()
assert (out/'tabaktan-tarif.html').exists()
assert not (out/'onizleme.html').exists()
Path('docs/release-build.json').write_text(json.dumps({'versions':versions,'files':list(files),'additional_media':downloaded,'mapping':media},ensure_ascii=False,indent=2))
print('Release generated:',list(files),'additional media',len(downloaded))
