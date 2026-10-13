from pathlib import Path
import re,json,hashlib
out=Path('v3-app/verification/v2-simple');out.joinpath('before.json').write_text(json.dumps({str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in Path('yayin').rglob('*') if p.is_file()}))
names=['Sinematik seçim','Açılan sofra','Kapak sineması','Açılan sahne','Sofrayı aç','Masadaki kart']
ideas=['Elindeki malzemelerden yola çıkarak ne pişireceğine karar ver.','Yemek önerisinden başla, aşağı kaydırarak sana uygun tarifi bul.','Yemek fotoğraflarını yana kaydır, canının çektiği tarifi seç.','Yemek önerisini incele, aşağı kaydırarak elindekilerle neler yapabileceğini gör.','Malzemelerini görmek için alt bölümü yukarı çek, pişireceğin yemeği seç.','Yemek önerisini incele, elindeki malzemelerle sana uygun olup olmadığına bak.']
for path in ['v3-app/ana-sayfa-v2.html','yayin/secenekler-v2/ana-sayfa-v2.html']:
 p=Path(path);s=p.read_text();s=re.sub(r'<title>.*?</title>','<title>DadaGastro · Ana sayfa seçenekleri</title>',s);s=re.sub(r'<p class="eyebrow">.*?</p>','',s);s=re.sub(r'<h1>.*?</h1>','<h1>Ana sayfa seçenekleri</h1>',s);s=re.sub(r'<p class="intro-copy">.*?</p>','<p class="intro-copy">Beğendiğiniz seçeneğin numarasını yazmanız yeterli.</p>',s);s=re.sub(r'<h2 class="set-label">.*?</h2>','',s);s=re.sub(r'\.set-label\{[^}]+\}','',s);s=s.replace('.caption{min-height:236px}', '.caption{min-height:0}.caption a{margin-top:var(--space-16)}')
 i=[0]
 def card(m):
  n=i[0];i[0]+=1;a=m[0];a=re.sub(r'title="[^"]+"',f'title="{n+1} · {names[n]}"',a)
  start=a.index('<div class="caption">');href=re.search(r'<a href="([^"]+)"',a[start:])[1]
  return a[:start]+f'<div class="caption"><span class="letter">{n+1}</span><div><h2>{names[n]}</h2><p>{ideas[n]}</p><a href="{href}" target="_blank" rel="noopener">Tek başına aç <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div></div></article>'
 s=re.sub(r'<article class="option">.*?</article>',card,s);assert i[0]==6;p.write_text(s)
p=Path('yayin/secenekler-v2/index.html');s=p.read_text().replace('Tasarım seçenekleri v2','Tasarım seçenekleri').replace(' · v2','').replace('Üç setten seçilen altı ana sayfa','Altı farklı ana sayfa');p.write_text(s)
