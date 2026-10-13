from pathlib import Path
import re
root=Path('v3-app'); doc=(root/'docs/38-liste-detay-arastirmasi.md').read_text()
refs={'liste':['DadaGastro','Paprika','NYT Cooking · Kitchen Stories','Paprika','Samsung Food','NYT Cooking · Samsung Food'],'detay':['DadaGastro','Crouton · Apple HIG','Pestle','SideChef · Pestle','Paprika · Kitchen Stories','Crouton']}
for kind,label in [('liste','Tarif listesi'),('detay','Tarif detay')]:
 rows=re.findall(r'\| '+('L' if kind=='liste' else 'D')+r'(\d) \| (.*?) \| (.*?) \|',doc)
 cards=''
 for (n,name,idea),ref in zip(rows,refs[kind]):
  cards+=f'<article class="option"><div class="phone-stage"><div class="phone"><iframe src="{kind}-{n}.html?gallery=1" width="390" height="844" title="{n} · {name}" loading="eager"></iframe></div></div><div class="caption"><span class="letter">{n}</span><div><h2>{name}</h2><p>{idea}</p><p class="refs"><small>İlham</small>{ref}</p><a href="{kind}-{n}.html" target="_blank" rel="noopener">Tek başına aç <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div></div></article>'
 html=f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{label} · Altı alternatif</title><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="six-presentation.css"><script src="six-presentation.js" defer></script></head><body><header class="intro"><a class="brand" href="ana-sayfa-alti.html"><img src="assets/marka/dadagastro-renkli.svg" alt="DadaGastro"></a><p class="eyebrow">{label.upper()} TASARIMLARI</p><h1>{label}, altı farklı yaklaşım.</h1><p class="intro-copy">Aynı tarifler, aynı işlevler; farklı keşif ve pişirme deneyimleri.</p><nav aria-label="Tasarım galerileri"><a class="comparison-link" href="ana-sayfa-alti.html">Ana sayfalar</a> <a class="comparison-link" href="{'detay' if kind=='liste' else 'liste'}-alti.html">{'Detay' if kind=='liste' else 'Liste'} alternatifleri</a></nav></header><main class="alternatives">{cards}</main></body></html>'''
 (root/f'{kind}-alti.html').write_text(html)
 archive=root/'eski/liste-detay-onceki';archive.mkdir(exist_ok=True,parents=True)
 old=root/f'{kind}-secenekleri.html'
 if not (archive/old.name).exists():
  content=old.read_text().replace('<head>','<head><base href="../../">',1);(archive/old.name).write_text(content)
 old.write_text(f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url={kind}-alti.html"><title>{label}</title></head><body><a href="{kind}-alti.html">Yeni {label.lower()} alternatifleri</a></body></html>')
p=root/'ana-sayfa-alti.html';s=p.read_text();needle='  </header>'
if 'href="liste-alti.html"' not in s:s=s.replace(needle,'<nav aria-label="Diğer ekranlar"><a class="comparison-link" href="liste-alti.html">Liste alternatifleri</a> <a class="comparison-link" href="detay-alti.html">Detay alternatifleri</a></nav>\n'+needle,1)
p.write_text(s)
