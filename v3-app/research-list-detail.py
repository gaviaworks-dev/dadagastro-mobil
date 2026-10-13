from pathlib import Path
import urllib.request,re,json,concurrent.futures
out=Path('docs/screenshots/v3-liste-ref');out.mkdir(exist_ok=True);Path('docs/screenshots/v3-detay-ref').mkdir(exist_ok=True)
apps=[('airbnb','com.airbnb.android'),('alltrails','com.alltrails.alltrails'),('spotify','com.spotify.music'),('uber-eats','com.ubercab.eats'),('nike-training','com.nike.ntc'),('headspace','com.getsomeheadspace.android'),('netflix','com.netflix.mediaclient'),('disney','com.disney.disneyplus'),('sidechef','com.sidechef.sidechef'),('samsung-food','com.foodient.whisk'),('etsy','com.etsy.android'),('booking','com.booking'),('amazon','com.amazon.mShop.android.shopping')]
def fetch(pair):
 name,pkg=pair;url='https://play.google.com/store/apps/details?id='+pkg+'&hl=en';r={'name':name,'source':url,'images':[]}
 try:
  h=urllib.request.urlopen(url,timeout=25).read().decode();us=list(dict.fromkeys([u.split('=')[0] for u in re.findall(r'https://play-lh\.googleusercontent\.com/[^"\s<>\\]+',h) if '=w526-h296' in u]));
  for i,u in enumerate(us[:8]):
   p=out/f'{name}-{i}.png';p.write_bytes(urllib.request.urlopen(u+'=w390',timeout=25).read());r['images'].append({'path':str(p),'url':u+'=w390'})
 except Exception as e:r['error']=str(e)
 return r
rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=5).map(fetch,apps));(out/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print([(r['name'],len(r['images']),r.get('error')) for r in rows])
