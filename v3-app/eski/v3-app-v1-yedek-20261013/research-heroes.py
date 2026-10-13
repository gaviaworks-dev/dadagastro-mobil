from pathlib import Path
import urllib.request,re,json,concurrent.futures
out=Path('docs/screenshots/v3-hero-ref')
apps=[('airbnb','com.airbnb.android'),('alltrails','com.alltrails.alltrails'),('spotify','com.spotify.music'),('uber-eats','com.ubercab.eats'),('nike-training','com.nike.ntc'),('headspace','com.getsomeheadspace.android'),('netflix','com.netflix.mediaclient'),('disney','com.disney.disneyplus'),('sidechef','com.sidechef.sidechef'),('samsung-food','com.foodient.whisk')]
def fetch(pair):
 name,pkg=pair; url='https://play.google.com/store/apps/details?id='+pkg+'&hl=en'; result={'name':name,'source':url}
 try:
  h=urllib.request.urlopen(url,timeout=25).read().decode(); urls=list(dict.fromkeys(re.findall(r'https://play-lh\.googleusercontent\.com/[^"\s<>\\]+',h))); shots=[u for u in urls if '=w526-h296' in u]; shots=list(dict.fromkeys([u.split('=')[0] for u in shots])); result['title']=name;result['images']=[]
  for i,u in enumerate(shots[:4]):
   dst=out/f'{name}-{i}.png';dst.write_bytes(urllib.request.urlopen(u+'=w390',timeout=25).read()); result['images'].append({'path':str(dst),'url':u+'=w390'})
 except Exception as e:result['error']=str(e)
 return result
rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=5).map(fetch,apps))
url='https://www.apple.com/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/'
h=urllib.request.urlopen(url).read().decode()
for name,key in [('crouton','Crouton'),('gentler-streak','Gentler')]:
 urls=re.findall(r'(?:src|data-src)="([^"]+)"',h); matches=[u for u in urls if key.lower() in u.lower()]; row={'name':name,'source':url,'images':[]}
 for u in list(dict.fromkeys(matches))[:2]:
  if u.startswith('/'):u='https://www.apple.com'+u
  try:
   p=out/f'{name}-{len(row["images"])}.jpg';p.write_bytes(urllib.request.urlopen(u).read());row['images'].append({'path':str(p),'url':u})
  except Exception as e: row['error']=str(e)
 rows.append(row)
Path(out/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print(json.dumps([{**r,'images':len(r.get('images',[]))} for r in rows],ensure_ascii=False,indent=2))
