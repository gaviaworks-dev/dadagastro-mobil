from pathlib import Path
p=Path('v3-app');source=Path('app.js').read_text();source=source.replace("history.replaceState(null,'','tarifler.html'+(p.size?'?'+p:''))","history.replaceState(null,'',location.pathname.split('/').pop()+(p.size?'?'+p:''))")
(p/'ld-source.js').write_text(source)
for kind,root,page in [('liste','tarifler.html','tarifler'),('detay','tarif-detay.html','tarif-detay')]:
 for n in range(1,7):
  s=Path(root).read_text().replace('src="app.js"','src="ld-source.js"').replace('</head>',f'<meta name="robots" content="noindex,nofollow"><script src="six-gallery-start.js"></script><link rel="stylesheet" href="{kind}-six.css"><script src="ld-links.js" defer></script><script src="{kind}-six.js" defer></script></head>').replace('data-page=',f'data-study="{kind}" data-choice="{n}" data-page=')
  (p/f'{kind}-{n}.html').write_text(s)
