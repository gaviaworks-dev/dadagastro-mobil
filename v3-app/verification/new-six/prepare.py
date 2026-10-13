from pathlib import Path
import shutil,hashlib,json
p=Path('v3-app');old=p/'eski'/'onceki-altili';old.mkdir(parents=True,exist_ok=True)
files=['ana-b.html','ana-c.html','ana-d.html','ana-e.html','ana-f.html','ana-a-uzun.html','ana-a-orta.html','ana-a-kisa.html','ana-1.html','ana-2.html','ana-3.html']
for f in files:
 if (p/f).exists():
  shutil.move(str(p/f),str(old/f));s=(old/f).read_text();s=s.replace('<head>','<head><base href="../../">');(old/f).write_text(s)
shutil.copy2(p/'ana-sayfa-alti.html',old/'ana-sayfa-alti.html');s=(old/'ana-sayfa-alti.html').read_text().replace('<head>','<head><base href="../../">');(old/'ana-sayfa-alti.html').write_text(s)
base=(p/'ana-a.html').read_text();(p/'ana-1.html').write_text(base)
names={2:'Öğününe göre',3:'Fikir destesi',4:'Açılan sofra',5:'Malzemeden sofraya',6:'Bugünün mutfağı'}
for n,name in names.items():
 s=base.replace('Sinematik seçim',name).replace('data-six="a"','data-six="a" data-concept="'+str(n)+'"').replace('</head>','<link rel="stylesheet" href="family-home.css?v=1"><script src="family-home.js?v=1" defer></script></head>');(p/f'ana-{n}.html').write_text(s)
(p/'verification/new-six/reference-sha.json').write_text(json.dumps({'ana-a.html':hashlib.sha256((p/'ana-a.html').read_bytes()).hexdigest()}))
