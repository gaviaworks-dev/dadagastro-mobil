from pathlib import Path
import json,re,urllib.request,html
root=Path('v3-app'); source=Path('/Users/gaviaworks/Developer/Backend Projects/dadagastro/reference/sefler/sefler-v1.html').read_text()
chefs=[]
for chunk in re.findall(r'<article class="sef-card".*?</article>',source,re.S)[:4]:
 def txt(cls):
  m=re.search(r'class="'+cls+r'"[^>]*>(.*?)</div>',chunk,re.S);return re.sub('<[^>]+>','',m[1]).strip() if m else ''
 url=html.unescape(re.search(r"background-image:url\('([^']+)'",chunk)[1]);name=txt('sef-name');spec=txt('sef-spec');i=len(chefs)
 urllib.request.urlretrieve(url,root/f'assets/chefs/chef-{i}.jpg')
 chefs.append(dict(name=name,specialty=spec,image=f'assets/chefs/chef-{i}.jpg',source=url))
base=(root/'home-base.js').read_text();data=json.loads(base.split('const DATA = ',1)[1].split(';\n',1)[0]);web=json.loads(base.split('const WEB = ',1)[1].split(';\n',1)[0]);home=json.loads((root/'home-media.js').read_text().split('=',1)[1].rstrip(';\n'))
images={r['slug']:r['image'] for r in home['recipes']}
recipes=[dict(title=r['title'].split('|')[0].strip(),slug=r['slug'],image=images.get(r['slug'],r['image']),minutes=r['minutes'],category=r['category'],author=r['author']) for r in data['recipes']]
(root/'discovery-data.js').write_text('window.DISCOVERY_DATA='+json.dumps(dict(recipes=recipes,chefs=chefs,videos=web['videos'],tips=home['tips']),ensure_ascii=False)+';\n')
