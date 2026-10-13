from pathlib import Path
import json
p=Path('v3-app');old=(p/'eski/set2-reddedilen/36-ana-sayfa-setleri.md').read_text();cfg=json.loads((p/'verification/set2-nine/concepts.json').read_text())
research=old[old.index('## Araştırma yöntemi'):old.index('## Mevcut altı')]
mapping={'NYT Cooking':'SET1: 1/9; yeni X9: fotoğraf + kısa editoryal hiyerarşi.','Samsung Food':'SET1: 2/8; X7: öğün bağlamı; X8: kullanıcı seçimi.','Tasty':'X5: pişirme bağlamındaki büyük video kapağı.','Kitchen Stories':'SET1: 1/3/6; X5: görsel öğrenme ve ayrı video rafı.','Mob':'SET1: 6; X9: editoryal tipografi ve fotoğraf.','Cookpad':'SET1: 5; tüm yeni X: bağımsız malzeme aracı.','Pestle':'SET1: 4; X6: kapaktan işe geçiş.','Crouton':'SET1: 5; yeni X: seçim/sonuç/eylem yakınlığı.','SideChef':'SET1: 7; X3: somut yemek fikrinden malzemeye geçiş.','HelloFresh':'SET1: 7; X3: görsel karar; bölünmüş hero bizim uyarlamamız.','Too Good To Go':'Niyetin içerik seçimini yönlendirmesi; X7/X8. Harita veya alışveriş özelliği alınmadı.','Spotify':'X6: büyük sahneden içerik rafına geçiş. Küçülme/paralaks bizim uyarlamamız; mağaza karesinden davranış kanıtı çıkarılmadı.','Netflix':'X1: güçlü kapak ve raf ilişkisi. Yatay kapak geçişi özgün uyarlama.','Airbnb':'SET1: 8; X4: görsel keşif; X8: niyet seçimi. Dönen dairesel pencere bizim yorumumuz.','Pinterest':'X4: farklı boy fotoğraflarla kolaj; X2: kapak karşılaştırması.','Duolingo':'Tek belirgin eylem ilkesi; yeni bir oyun/ilerleme özelliği alınmadı.','Headspace':'SET1: 2; X7: ihtiyaca/ana göre başlangıç.','Apple Music':'X2: kapak nesnesinin odağı; üst üste deste bizim uyarlamamız. X6: geniş görsel sahne.','Apple TV':'X1: güçlü kapak, sayfa göstergesi ve raf.','YouTube':'Video kapağı/başlık/süre yakınlığı; X5.','Uber Eats':'Kompakt kategori erişimi; yeni X setinin kategori şeritleri.','Getir':'Kompakt kategori erişimi; teslimat/konum özelliği eklenmedi.','Yemeksepeti':'Kompakt kategori erişimi; yeni X setinin şeritleri.'}
lines=[]
for line in research.splitlines():
 if line.startswith('| ['):
  parts=line.split('|')
  for name,value in mapping.items():
   if name in parts[1]:parts[-2]=' '+value+' ';break
  line='|'.join(parts)
 lines.append(line)
research='\n'.join(lines).replace('X2/X5','X5')
text='''# 36 — İki aile, on sekiz ana sayfa

8 Ekim 2026. SET1 (ana-1…9) korunur. Reddedilen altı SET2 `../eski/set2-reddedilen` içinde arşivlendi; yeni SET2 ana-x1…9 olarak kuruldu. Yalnız v3-app. Liste, detay, kök, yayin ve canlı değiştirilmedi. Git add/commit/push yok.

## Ret ve yeni tasarım kararı

Eski X ekranları aynı beyaz başlık/arama başlangıcına dayanıyordu. `../verification/set15/x1-390-top.png` ve arşivlenen akış kodunda bu açık. Yeni sette her hero 844px ekranın yarısından büyük; dokuz ayrı siluet/etkileşim vardır. Kodlamadan önceki plan `../verification/set2-nine/plan.md`.

## Primary ve sabitler

SET1'in `hero-light.css` değişkenleri aynen kullanılır: primary %25, radyal0→65, screen; sol üstte kaynak koyu tabanın üstünde. Kaynak kök app.css detail-shade292/324 önceki turda doğrulanmıştı; bu tur kök değiştirilmedi. Üstte transparan header, logo/bildirim/burger; ilk metin geometrisine göre ilk48px içinde solid primary. Genel arama arama.html, malzeme araması ayrı. Kamera orta panelde. Gilroy, FA solid, kart, nav, radius ve spacing aileleri ortak.

'''+research+'\n\n## Dokuz fikir ve başrol\n\n'
reasons=['kapaklar aynı pişirme sorusunun değişen gerçek cevaplarıdır','eldeki seçenekleri birer birer karşılaştırmak karar yükünü azaltır','fotoğraf bir yemek cevabı, malzeme eylemi bu cevabı sınama yoludur','kullanıcı önce iştahını uyandıran yemeği seçebilir','video önerisi kahvaltıda ne pişirileceğine hizmet eder','sahne geri çekildikçe arama ve malzeme aracı öne gelir','öğün seçimi hem fotoğrafı hem gerçek önerileri değiştirir','mutfak tercihi fotoğrafı ve tarif rafını birlikte daraltır','tatlı yapma niyeti belirli bir tarif fikrine bağlanır']
for i,(k,c) in enumerate(cfg.items()):text+=f"- **{k.upper()} · {c['name']}:** Bu alternatifin fikri {c['idea'][0].lower()+c['idea'][1:]} Başrol ne pişireceğine karar vermektir, çünkü {reasons[i]}. Hero kalıbı: {c['pattern']}. İlham: {c['refs']}.\n"
text+='''
## Bölüm kompozisyonları

| Alternatif | Tarifler | Şefler | Videolar |
|---|---|---|---|
| X1 | Büyük yatay fotoğraf rafı | Mutfak fotoğraflı şerit | Büyük video + kısa liste |
| X2 | Tek büyük tarif + kısa liste | Açık şerit | Görselli sinema rafı |
| X3 | Şaşırtmalı ikili grid | Fotoğraflı şerit | İkili video panosu |
| X4 | Bir büyük + dört küçük mozaik | Açık şerit | Görselli dikey kapak rafı |
| X5 | Tümü / 30dk / Kahvaltı rafı | Fotoğraflı şerit | Öne çıkan video + küçük grid |
| X6 | Pişirme süresine göre numaralı liste | Açık şerit | Görselli video listesi |
| X7 | Öğüne göre büyük öneri + ikili kartlar | Fotoğraflı şerit | Büyük video + kısa liste |
| X8 | Seçilen mutfağın tek büyük tarifi veya grid | Açık şerit | Görselli ikili video panosu |
| X9 | Dikey editoryal kapaklar | Fotoğraflı şerit | Dikey video rafı |

Her sayfada malzeme, kategori/dünya mutfakları, tarif, dolap, video, şef, topluluk vardır. Sıra kullanıcı niyetine göre farklıdır. Şefler aynı altı gerçek isim/sayıdır; fotoğraf doğrulanmadığı için baş harfli avatar korunur. Fotoğraf zeminindeki kişiler bu şefler diye sunulmaz.

## Veri ve video sınırı

Video kaynağında oynatılabilir URL yok. X5 gerçek web kapağı + oynat göstergesi + gerçek süreyle kuruldu; dokununca video bilgi paneli kaynak bulunmadığını açıklar. Sessiz döngü/oynatıcı taklidi yapılmadı. Bazı tariflerin yerel facet bilgisi yok; seçilen gerçek öneri korunur, rafın diğer üyeleri yalnız doğrulanmış facetlerden gelir. Boş sonuç uydurma tariflerle doldurulmaz.

## Öz eleştiri ve düzeltmeler

- Her X ayrı bitirildi; 390 ilk ekranına bakılıp sonraki kalıba geçildi.
- X1 başlık kapsayıcısının padding'i yanlış header gizlemesi yapıyordu; gerçek metin grubu ölçülüyor.
- X6'nın küçük etiketi açık fotoğrafta zayıftı; kaynak koyu cam zemini eklendi, arama sonrası boşluk azaltıldı.
- X8 fotoğrafı ilk denemede öneri/tercih satırını sıkıştırıyordu; çap260px sınırına alındı.
- X3/X4 önizleme genişlikleri grid sütununu aşıyordu; gerçek yatay şeride dönüştürüldü.
- X7/X8 eksik facet yüzünden seçili öneriyi kaybediyordu; seçilen gerçek tarif rafta korunuyor. X7 az kayıtla boş ikinci sütun bırakmayan büyük+ikili kompozisyona geçti.
- Dokuz ilk ekran tek görüntüde karşılaştırıldı: deste, çapraz, kolaj, video, alt başlıklı sahne, öğün, dairesel pencere ve editoryal kapak ayırt ediliyor. X1 tam görsel yüzey bakımından SET1'e en yakın olanıdır; farkı kapak değişimi/etiket/sayfa göstergesidir.
- Web ile aynı kalanlar marka ve veridir; web sayaçları/pazarlama şeritleri/footer yok.

## Tercih sıram

**X7 > X2 > X3 > X4 > X1 > X9 > X8 > X6 > X5.** X7 amaç ve iştahı birlikte en net kuruyor; X2 seçim hareketi ve fotoğraf odağıyla uygulama hissi veriyor; X3 en ayırt edici marka silueti. X4 keşifte güçlü fakat daha yoğun. X1 sinematik ve anlaşılır, SET1'e daha yakın. X9 şık ama tatlı odağı dar. X8 belirgin, yerel mutfak verisi sınırlı. X6 etkileyici ama kaydırma davranışı daha karmaşık. X5 gerçek video kaynağı olmadan son sırada.

## Kanıtlar

`../verification/set2-nine/`: dokuz ilk ekran (`first-nine-grid.png`, `first-nine-strip.png`), 27 tam boy görüntü, üç genişlikli dokuz inceleme panosu, qa.json, interactions.json, gallery-1440.png/gallery.json. Tam boy görüntülerde fixed alt menü ilk844px konumunda görünür; bu uzun ekran yakalamanın doğal davranışıdır. Normal viewport kontrolleri ayrıca saklanır.
'''
(p/'docs/36-ana-sayfa-setleri.md').write_text(text)
