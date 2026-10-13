from pathlib import Path
p=Path('v3-app')
core=(p/'set2-core.js').read_text().replace("q('.x-first')","q('.y-first')").replace('X_SCROLL','Y_SCROLL')
(p/'set3-core.js').write_text(core)
names=['Sofra kubbesi','Sofranın yayı','Sofrayı aç','Dalga sofrası','Keskin karar','Kararın merkezi','Bir tabak fikir','Masadaki kart','Mutfağa pencere']
photos=[14,1,9,17,15,24,12,7,19]
layouts=['lead-list','covers','mosaic','pair','split','numbered','grid','tabs','stories']
videos=['feature','cinema','playlist','portraits','duo','rows','feature','cinema','portraits']
refs=['Headspace · Apple HIG','Material 3 · Headspace','Apple HIG Sheets','Tide Guide · Material 3','Apple HIG · Material 3','Crouton · Material 3','Moonlitt · Material 3','Nibbly · CapWords','Yazio · Apple HIG']
ideas=['Geniş kemerden malzemelerine geç, sofrana bir fikir bul.','Yemeği tek büyük yay içinde gör, elindekilerle karar ver.','Sofrayı yukarı çek, fotoğrafın önünde pişirme fikrini kur.','Dalgayı izleyerek yemekten malzemelerine geç.','Çapraz kesim seni fotoğraftan bir sonraki adıma taşır.','Biçimin merkezindeki Ne Pişirsem eylemiyle başla.','Bir tabak gibi açılan yüzeyden sofrana fikir seç.','Masadaki fotoğraf kartından yola çık, malzemelerinle sınamaya geç.','Kemerli pencereden bak, bugün pişireceğin fikri bul.']
import json
configs={f'y{i+1}':dict(name=n,idea=ideas[i],refs=refs[i],photo=photos[i],recipes=layouts[i],video=videos[i],separator='videos' if i%2==0 else 'chefs') for i,n in enumerate(names)}
(p/'set3-data.js').write_text('Object.assign(HOME_SETS,'+json.dumps(configs,ensure_ascii=False)+');')
(p/'verification/set3/concepts.json').write_text(json.dumps(configs,ensure_ascii=False,indent=2))
base=(p/'ana-x1.html').read_text()
for i,n in enumerate(names,1):
 html=base.replace('Kapak sineması',n).replace('set2-data.js','set3-data.js').replace('set2-core.js','set3-core.js').replace('set2-heroes.css','set3-shapes.css').replace('set2-common.js','set3-common.js').replace('set2-x1.js',f'set3-y{i}.js').replace('set2-finish.js','set3-finish.js').replace('data-edition="x1"',f'data-edition="y{i}"')
 # Last stylesheet for isolated shape rules, after common section CSS.
 html=html.replace('<script src="set3-finish.js"','<link rel="stylesheet" href="set3-surfaces.css"><script src="set3-finish.js"')
 (p/f'ana-y{i}.html').write_text(html)
