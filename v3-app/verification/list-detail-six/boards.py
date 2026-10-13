from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
p=Path('v3-app/verification/list-detail-six')
f=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',18)
def board(files,cols,name,width=280):
 imgs=[Image.open(p/file).convert('RGB') for _,file in files]; heights=[round(i.height*(width-12)/i.width)+40 for i in imgs]; rows=(len(imgs)+cols-1)//cols; rh=[max(heights[r*cols:(r+1)*cols]) for r in range(rows)]; out=Image.new('RGB',(cols*width,sum(rh)), 'white');d=ImageDraw.Draw(out);y=0
 for r in range(rows):
  for c in range(cols):
   n=r*cols+c
   if n>=len(imgs):break
   d.text((c*width+6,y+8),files[n][0],font=f,fill='#211e16');im=imgs[n].resize((width-12,heights[n]-40));out.paste(im,(c*width+6,y+36))
  y+=rh[r]
 out.save(p/name)
for kind in ['liste','detay']:
 for n in range(1,7):board([(f'{kind}-{n} / {w}',f'{kind}-{n}-{w}-full.png') for w in [360,390,430]],3,f'review-{kind}-{n}.png',300)
 tops=[(f'{kind}-{n}',f'{kind}-{n}-390-top.png') for n in range(1,7)]
 board(tops,6,f'{kind}-six-strip.png',300);board(tops,3,f'{kind}-six-grid.png',320)
 board([('Canli referans',f'{kind}-live-top.png')]+tops,7,f'{kind}-reference-six.png',280)
