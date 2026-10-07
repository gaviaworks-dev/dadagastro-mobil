from pathlib import Path
import json,re,shutil,hashlib,urllib.request
root=Path('.');out=root/'yayin';out.mkdir(exist_ok=True)
for folder in ['fonts','fontawesome','marka','bolumler']:
 shutil.copytree(root/'assets'/folder,out/'assets'/folder,dirs_exist_ok=True)
media=json.loads(Path('docs/yayin-medya-envanteri.json').read_text())['mapping']; downloaded=[]
js=Path('app.js').read_text().split('// Approved local-only mobile extra:')[0]
js='\n'.join(line for line in js.splitlines() if "const entry=e.target.closest('[data-photo-entry]')" not in line)+'\n'
js=js.replace("page==='tabaktan-tarif'?'<main id=photoApp></main>':",'').replace("${n===2?'data-photo-entry':''}",'')
css=Path('app.css').read_text();a=css.index('/* Tabaktan Tarif uses');b=css.index('/* Shared section heading:');css=css[:a]+css[b:]
tokens=Path('tokens.css').read_text();tokens=re.sub(r':root\{--camera-shutter-size:.*?\}\n?', '',tokens)
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
for name in ['index.html','tarifler.html','tarif-detay.html']:
 s=Path(name).read_text();s=re.sub('<title>.*?</title>','<title>DadaGastro</title>',s);s=s.replace('content="#F9F9F9"','content="#E14827"');s=s.replace('</head>','<meta name="robots" content="noindex,nofollow"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="icon" href="assets/marka/dadagastro-amblem.svg"><link rel="apple-touch-icon" href="assets/marka/dadagastro-amblem.svg"></head>');files[name]=s
for name,s in files.items(): (out/name).write_text(s)
(out/'robots.txt').write_text('User-agent: *\nDisallow: /\n');(out/'.nojekyll').touch()
assert not any(out.glob('*tabaktan*'))
assert 'Tabaktan Tarif' not in files['app.js']
Path('docs/release-build.json').write_text(json.dumps({'files':list(files),'additional_media':downloaded,'mapping':media},ensure_ascii=False,indent=2))
print('Release generated:',list(files),'additional media',len(downloaded))
