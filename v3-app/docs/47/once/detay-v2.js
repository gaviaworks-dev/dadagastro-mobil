/* Tarif detay v2. Kaynak runtime (ld-source.js) ve detay-1 değişmez.
   Kaynak düğümler taşınır (işleyicileri korunur); yalnız görünüm bloğu olan yerler
   aynı veriyle yeniden çizilir. Veri yoksa ilgili blok hiç çizilmez. */
(()=>{
if(page!=='tarif-detay'||!recipe)return;
const q=(s,root=document)=>root.querySelector(s),qa=(s,root=document)=>[...root.querySelectorAll(s)];
const r=recipe,w=recipeInfo(r),slug=s=>String(s||'').toLocaleLowerCase('tr');
const fa=(name,cls='')=>`<i class="icon fa-solid fa-${name}${cls?' '+cls:''}" aria-hidden="true"></i>`;
const brand=name=>`<i class="icon fa-brands fa-${name}" aria-hidden="true"></i>`;
const html=s=>{const t=document.createElement('template');t.innerHTML=s.trim();return t.content.firstElementChild;};
const tokenPx=name=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))||0;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const main=q('.detail-editorial'),hero=q('.detail-hero'),panel=q('.detail-main'),header=q('.detail-header');
document.body.classList.add('dv2');

/* ---------- Navigation: v2 screens link to each other (ld-links maps to liste-v2/detay-v2). ---------- */
function localLinks(root=document){for(const a of root.querySelectorAll('a[href]')){const h=a.getAttribute('href');if(/^ana-1\.html(?:[?#]|$)/.test(h))a.setAttribute('href',h.replace('ana-1.html','ana-v3.html'));}}
localLinks();new MutationObserver(rs=>rs.forEach(x=>x.addedNodes.forEach(n=>{if(n.nodeType===1)localLinks(n)}))).observe(document.body,{childList:true,subtree:true});
// docs/46: geri düğmesi tarifin açıldığı ekrana döner (ana sayfa ya da liste); bilinmeyen kaynakta liste (kaynak davranışı).
{const ret=new URLSearchParams(location.search).get('donus')||'',back=q('a.icon-button',header);if(back&&/^(ana-v3|liste-v2)\.html(?:[?#]|$)/.test(ret))back.setAttribute('href',ret);}
// docs/46: bölüm başlıkları ortak kalıpta (ortak-baslik.css): üst etiket yok, başlık + sağda eylem.
const dgHead=row=>{if(!row)return;row.classList.remove('has-eyebrow');row.classList.add('dg-head');q('.eyebrow',row)?.remove();const copy=q(':scope>.section-heading-copy',row);if(copy)copy.replaceWith(...copy.childNodes);};

/* ---------- 2. Özet: tek satır Toplam süre · Zorluk · Porsiyon. Hazırlık/pişirme ayrımı "Tarif bilgileri"nde. ---------- */
const facts=r.web?.facts||[];
const split=(facts.find(f=>f.startsWith('Hazırlık + Pişirme'))||'').match(/(\d+)\s*dk\s*\+\s*(\d+)\s*dk/);
const oven=(facts.find(f=>f.startsWith('Pişirme Derecesi'))||'').replace('Pişirme Derecesi','').trim();
const factsBox=html(`<section class="dv2-facts" aria-label="Tarif özeti">
 <dl class="dv2-facts-main">
  <div><dt>${fa('clock')}<span>Toplam süre</span></dt><dd>${r.minutes}<small>dk</small></dd></div>
  <div><dt>${fa('gauge-simple')}<span>Zorluk</span></dt><dd>${esc(r.difficulty)}</dd></div>
  <div><dt>${fa('utensils')}<span>Porsiyon</span></dt><dd><span data-portions>${r.servings}</span><small>${esc(r.unit)}</small></dd></div>
 </dl>
</section>`);
q('.recipe-facts')?.replaceWith(factsBox);
/* Özellikler (web künye .kc-chips): mutfak çipi bayrakla + "Özellikler" etiketi + beslenme etiketleri + bütçe. Kategori çipi
   webde başlık sahnesindedir, burada tekrar edilmez. İkonlar web _kunye.blade.php $dietFeatureIcons ile aynı. */
const DIET_ICON={'protein-agirlikli':'drumstick-bite',baharatli:'mortar-pestle',acili:'pepper-hot',glutenli:'wheat-awn','az-yagli':'droplet-slash',laktozsuz:'glass-water','sut-icermez':'ban','yumurta-icermez':'egg','seker-ilavesiz':'cube','yuksek-lifli':'seedling','tam-tahilli':'wheat-awn-circle-exclamation','diyabete-uygun':'syringe','kalp-dostu':'heart-pulse','dusuk-kalorili':'chart-line',vegan:'seedling',vejetaryen:'leaf',glutensiz:'wheat-awn-circle-exclamation'};
const FLAG={turk:'tr',italyan:'it',fransiz:'fr',ispanyol:'es',portekiz:'pt',alman:'de',avusturya:'at',ingiliz:'gb',irlanda:'ie',yunan:'gr',rus:'ru',ukrayna:'ua',gurcu:'ge',azerbaycan:'az',ermeni:'am',kazak:'kz',ozbek:'uz',iran:'ir',irak:'iq',suriye:'sy',lubnan:'lb',urdun:'jo','suudi-arabistan':'sa',misir:'eg',fas:'ma',tunus:'tn',etiyopya:'et','guney-afrika':'za',hint:'in',pakistan:'pk',cin:'cn',japon:'jp',kore:'kr',tayland:'th',vietnam:'vn',malezya:'my',endonezya:'id',filipin:'ph',amerikan:'us',kanada:'ca',meksika:'mx',brezilya:'br',arjantin:'ar',peru:'pe',kolombiya:'co',kuba:'cu',jamaika:'jm',avustralya:'au','yeni-zelanda':'nz',balkan:''};
const featureParam=f=>{const u=new URL(f.href,'https://dadagastro.com');for(const [k,v] of new URLSearchParams(u.search))return [k.replace('[0]',''),v];return [u.pathname.includes('/kategori/')?'kategori':'',''];};
const featureChips=(w.features||[]).map(f=>{const [kind,value]=featureParam(f);return {...f,kind,value}}).filter(f=>f.kind&&f.kind!=='kategori');
if(featureChips.length){
 const chipOf=f=>{const code=f.kind==='mutfak'?FLAG[f.value.replace(/-mutfagi$/,'')]:'';const mark=f.kind==='mutfak'?(code?`<img class="dv2-flag" src="assets/flags/${code}.svg" alt="" width="20" height="15">`:fa('earth-americas')):f.kind==='butce'?fa('wallet'):fa(DIET_ICON[f.value]||'circle-check');return `<a class="dv2-feature" href="${featureLink(f)}">${mark}<span>${esc(f.label)}</span></a>`;};
 const cuisine=featureChips.filter(f=>f.kind==='mutfak'),others=featureChips.filter(f=>f.kind!=='mutfak');
 factsBox.insertAdjacentHTML('afterend',`<section class="dv2-features" aria-label="Tarif özellikleri"><div class="dv2-feature-rail" tabindex="0">${cuisine.map(chipOf).join('')}${others.length?`<span class="dv2-feature-label">Özellikler</span>${others.map(chipOf).join('')}`:''}</div></section>`);
}
const metaBody=q('.recipe-metadata:not(.nutrition) .metadata-body');
if(metaBody&&(split||oven))metaBody.insertAdjacentHTML('afterbegin',`<ul class="dv2-meta-list">${split?`<li>${fa('hourglass-half')}<span>Hazırlık</span><b>${split[1]} dk</b></li><li>${fa('fire-burner')}<span>Pişirme</span><b>${split[2]} dk</b></li>`:''}${oven?`<li>${fa('temperature-three-quarters')}<span>Pişirme derecesi</span><b>${esc(oven)}</b></li>`:''}</ul>`);
if(featureChips.length)q('.metadata-chips',metaBody)?.remove();
// Kaynakta aynı derece cümlesi ayrı paragraf olarak da var; listede gösterildiği için tekrar edilmez.
if(oven)qa('p',metaBody).forEach(p=>{if(p.textContent.includes('°'))p.remove();});
/* ---------- Üst başlık bloğu: kategori · başlık (≤2 satır) · alt başlık (1 satır) · tek sıra meta kapsülleri.
   Puan yoksa yıldız/ham metin yok; görüntülenme webde puan satırındadır (rd-rateline r-views). ---------- */
const coverMeta=q('.detail-cover-meta');
if(coverMeta){
 const rv=Number(r.rating)||0,rc=Number(r.ratingCount)||0,costLabel=['','Ekonomik','Orta bütçe','Premium'][r.cost]||'';
 coverMeta.innerHTML=[
  rv&&rc?`<a class="dv2-cap dv2-cap-rating" href="#yorumlar" aria-label="Puan ${rv.toFixed(1).replace('.',',')}, ${rc} değerlendirme; yorumlara git">${fa('star')}<b>${rv.toFixed(1).replace('.',',')}</b><span>${rc} değerlendirme</span></a>`:'',
  r.cost?`<span class="dv2-cap dv2-cap-cost" aria-label="Maliyet: ${costLabel}">${cost(r)}</span>`:'',
  r.views!=null?`<span class="dv2-cap" aria-label="${Number(r.views).toLocaleString('tr')} görüntülenme">${fa('eye')}<span>${Number(r.views).toLocaleString('tr')}</span></span>`:'',
  ...(w.badges||[]).map(t=>`<span class="dv2-cap">${esc(t)}</span>`)
 ].filter(Boolean).join('');
 q('.detail-cover-copy h1')?.setAttribute('title',shortTitle(r));
}

/* ---------- 3. Şef satırı: tek yer, kompakt; Takip et (ikincil, küçük) + Abone ol (üçüncül metin eylemi). ---------- */
const infoLines=String(w.chef?.info||'').split('\n').map(s=>s.trim()).filter(Boolean);
const chefName=r.author,chefSince=infoLines.find(l=>/beri üye$/.test(l))||'',chefTier=infoLines.slice(1).find(l=>l!==chefSince&&l!==chefName)||'';
const chefMeta=Object.fromEntries((w.chef?.meta||[]).map(m=>{const x=String(m).match(/^(\D+?)\s*([\d.,]+\S*)$/);return x?[x[1].trim(),x[2]]:[m,'']}));
const chefState={follow:false,subscribe:false};
// Türkçe tamlayan eki: Solmaz'ın, Poyrazoğlu'nun, Egeli'nin.
const genitive=name=>{const v=[...name.toLocaleLowerCase('tr')].filter(c=>'aeıioöuü'.includes(c)).pop()||'e';const map={a:'ın',ı:'ın',e:'in',i:'in',o:'un',u:'un',ö:'ün',ü:'ün'};return name+"'"+(/[aeıioöuü]$/i.test(name)?'n':'')+map[v];};
/* Yazar kartı seçenekleri (?yazar=a|b|c|d). İçerik hepsinde aynı ve gerçek: baş harf (veride fotoğraf yok), ad, unvan
   rozeti, Tarif ve Takipçi sayısı, üyelik yılı. Şef düzeyinde Eline Sağlık / ortalama puan verisi yok, gösterilmez.
   Takip et ana eylem, Abone ol ikincil. Profil sayfası yok: dokununca "yakında" bildirimi, sahte sayfa açılmaz.
   a: kimlik kartı (referans, değişmedi).
   b: A'nın zengin sürümü (Beyar, 10 Ekim) — beyaz ince çizgili kart; halkalı avatar + ad + rozet + ok, 3 eşit sayaç sütunu,
      açık domates zeminli geniş Takip et + kompakt çerçeveli Abone ol.
   c: istatistik odaklı kart — avatarın yanında 3 sayaç sütunu, altında ad + rozet, iki eşit eylem.
   d: ortalı tanıtım kartı — nötr zemin, ortalı kimlik, satır içi sayılar, tam genişlik çerçeveli Takip et + metin Abone ol.
   b/c/d'de bütün kart profil bağlantısıdır (kartı kaplayan bağlantı; eylem düğmeleri üstte ayrı hedef). */
const AUTHOR_VARIANT=['b','c','d'].includes(new URLSearchParams(location.search).get('yazar'))?new URLSearchParams(location.search).get('yazar'):'a';
const chefInitial=esc(chefName.slice(0,1).toLocaleUpperCase('tr'));
const chefStats=[chefMeta.Tarif&&[chefMeta.Tarif,'tarif'],chefMeta['Takipçi']&&[chefMeta['Takipçi'],'takipçi']].filter(Boolean);
const statHTML=chefStats.map(([n,l])=>`<span class="dv2-stat"><b>${esc(n)}</b> ${l}</span>`).concat(chefSince?[`<span class="dv2-stat">${esc(chefSince)}</span>`]:[]).join('');
const badgeHTML=chefTier?`<span class="dv2-chef-badge">${fa('award')}<span>${esc(chefTier)}</span></span>`:'';
const chefYear=(chefSince.match(/\d{4}/)||[])[0];
const chefCounts=[chefMeta.Tarif&&[chefMeta.Tarif,'Tarif'],chefMeta['Takipçi']&&[chefMeta['Takipçi'],'Takipçi'],chefYear&&[chefYear,'Üyelik']].filter(Boolean);
const idLabel=`${esc(chefName)}${chefTier?`, ${esc(chefTier)}`:''}; profilini gör`;
const bioHTML=w.chef?.bio?`<p class="dv2-chef-bio">${esc(w.chef.bio)}</p>`:'';
const followBtn=cls=>`<button type="button" class="dv2-follow ${cls}" data-dv2-follow aria-pressed="false"></button>`;
const subBtn=cls=>`<button type="button" class="dv2-subscribe ${cls}" data-dv2-subscribe aria-pressed="false"></button>`;
const profileLink=(inner,cls='')=>`<a class="dv2-chef-id dv2-chef-link ${cls}" href="" data-dv2-profile aria-label="${idLabel}">${inner}</a>`;
const TEMPLATES={
 a:`<section class="dv2-chef dv2-chef-a" aria-label="Tarifin yazarı">
 <a class="dv2-chef-id" href="" data-dv2-profile aria-label="${idLabel}">
  <span class="dv2-avatar dv2-avatar-lg" aria-hidden="true">${chefInitial}</span>
  <span class="dv2-chef-copy">${badgeHTML}<span class="dv2-chef-name">${esc(chefName)}</span>${statHTML?`<span class="dv2-chef-stats">${statHTML}</span>`:''}</span>
  ${fa('chevron-right','dv2-chef-go')}
 </a>
 <div class="dv2-chef-actions"><button type="button" class="dv2-follow" data-dv2-follow aria-pressed="false"></button><button type="button" class="dv2-subscribe" data-dv2-subscribe aria-pressed="false"></button></div>
 ${bioHTML}
</section>`,
 b:`<section class="dv2-chef dv2-chef-x dv2-chef-b" aria-label="Tarifin yazarı">
 <div class="dv2-b-top">
  <span class="dv2-avatar dv2-avatar-lg dv2-x-avatar" aria-hidden="true">${chefInitial}</span>
  <div class="dv2-b-id">${profileLink(`<span class="dv2-chef-name">${esc(chefName)}</span>`)}${badgeHTML}</div>
  ${fa('chevron-right','dv2-chef-go')}
 </div>
 ${chefCounts.length?`<dl class="dv2-x-counts" style="--dv2-n:${chefCounts.length}">${chefCounts.map(([n,l])=>`<div><dd>${esc(n)}</dd><dt>${l}</dt></div>`).join('')}</dl>`:''}
 ${bioHTML}
 <div class="dv2-b-actions">${followBtn('dv2-b-follow')}${subBtn('dv2-b-sub')}</div>
</section>`,
 c:`<section class="dv2-chef dv2-chef-x dv2-chef-c" aria-label="Tarifin yazarı">
 <div class="dv2-x-head"><span class="dv2-avatar dv2-avatar-lg dv2-x-avatar" aria-hidden="true">${chefInitial}</span>${chefCounts.length?`<dl class="dv2-x-counts" style="--dv2-n:${chefCounts.length}">${chefCounts.map(([n,l])=>`<div><dd>${esc(n)}</dd><dt>${l}</dt></div>`).join('')}</dl>`:''}</div>
 ${profileLink(`<span class="dv2-chef-name"><span>${esc(chefName)}</span>${fa('chevron-right','dv2-chef-go')}</span>`)}
 ${badgeHTML}
 ${bioHTML}
 <div class="dv2-x-split">${followBtn('dv2-x-follow-tonal')}${subBtn('dv2-x-sub-neutral')}</div>
</section>`,
 d:`<section class="dv2-chef dv2-chef-x dv2-chef-d" aria-label="Tarifin yazarı">
 <span class="dv2-avatar dv2-avatar-lg dv2-x-avatar" aria-hidden="true">${chefInitial}</span>
 ${profileLink(`<span class="dv2-chef-name"><span>${esc(chefName)}</span>${fa('chevron-right','dv2-chef-go')}</span>`)}
 ${badgeHTML}
 ${statHTML?`<span class="dv2-chef-stats">${statHTML}</span>`:''}
 ${bioHTML}
 ${followBtn('dv2-x-follow-outline')}
 ${subBtn('dv2-x-sub-text')}
</section>`
};
const chef=html(TEMPLATES[AUTHOR_VARIANT]);
document.body.dataset.dv2Yazar=AUTHOR_VARIANT;
function paintChef(){
 const f=q('[data-dv2-follow]',chef),s=q('[data-dv2-subscribe]',chef);
 f.setAttribute('aria-pressed',chefState.follow);
 f.setAttribute('aria-label',chefState.follow?`${chefName} takip ediliyor; takipten çıkmak için dokun`:`${chefName} takip et`);
 s.setAttribute('aria-pressed',chefState.subscribe);
 s.setAttribute('aria-label',chefState.subscribe?`${chefName} aboneliğini yönet`:`${chefName} şefine abone ol (Üretici Üyeliği)`);
 if(AUTHOR_VARIANT==='a'){f.innerHTML=chefState.follow?`${fa('check')}<span>Takiptesin</span>`:`${fa('user-plus')}<span>Takip et</span>`;s.innerHTML=chefState.subscribe?`${fa('circle-check')}<span>Abonesin</span>`:`${fa('bell')}<span>Abone ol</span>`;return;}
 // b/c/d: iki durum aynı ızgara hücresinde üst üste; düğme genişliği büyük etikete sabit → durum değişince zıplama yok.
 f.innerHTML=`<span class="dv2-x-state" data-on="${!chefState.follow}">${fa('user-plus')}<span>Takip et</span></span><span class="dv2-x-state" data-on="${chefState.follow}">${fa('user-check')}<span>Takip ediliyor</span></span>`;
 s.innerHTML=s.classList.contains('dv2-x-bell')?fa('bell'):`<span class="dv2-x-state" data-on="${!chefState.subscribe}">${fa('bell')}<span>Abone ol</span></span><span class="dv2-x-state" data-on="${chefState.subscribe}">${fa('circle-check')}<span>Abonesin</span></span>`;
}
// b/c/d: kartın düğme dışındaki her noktası profil hedefi (kaplayan bağlantının yedeği; ortak :active basma efekti kutuyu küçültse de çalışır).
chef.addEventListener('click',e=>{if(e.target.closest('[data-dv2-profile]')||(chef.classList.contains('dv2-chef-x')&&!e.target.closest('button,a'))){e.preventDefault();e.stopPropagation();toast(`${chefName} profili yakında. Bu prototipte profil sayfası yok.`);}});
paintChef();
q('.author-row')?.replaceWith(chef);
q('.detail-chef')?.remove();
// "Tarif bilgileri" içindeki şef cümlesi şef kartının tekrarıdır; kart tek yerde kalır.
qa('.recipe-metadata:not(.nutrition) .metadata-body>p').forEach(p=>{if(p.textContent.replace(/\s+/g,' ').trim()===String(w.chef?.info||r.author).replace(/\s+/g,' ').trim())p.remove();});
const subscribeSheet=()=>{
 const plan=!!w.chef?.subscription;
 sheet('Üretici Üyeliği',`<div class="dv2-sub-sheet"><span class="dv2-sub-icon">${fa('star')}</span><p>${esc(genitive(chefName))} üyelere özel tarif ve püflerini görmek için üye olman gerekiyor.</p><div class="dv2-sub-note">${fa('circle-info')}<span>Bu, platform geneli Pro Aboneliği'nden ayrıdır — yalnızca ${esc(genitive(chefName))} üyelere özel içeriklerini kapsar. Aylık üyelik; istediğin an iptal edebilirsin.</span></div>${plan?'':`<div class="dv2-sub-note dv2-sub-missing">${fa('triangle-exclamation')}<span>Bu şefin üyelik planı (fiyat ve avantajlar) prototip verisinde yok. Webde düğme yalnız yayında planı olan şefte görünür; burada yer tutucu olarak gösteriliyor.</span></div>`}<div class="sheet-actions"><button type="button" class="button secondary" data-sheet-close>Vazgeç</button><button type="button" class="button" data-dv2-subscribe-confirm>${fa('bell')}<span>Abone ol</span></button></div></div>`);
};
const unsubscribeSheet=()=>sheet('Aboneliğin',`<div class="dv2-sub-sheet"><span class="dv2-sub-icon">${fa('circle-check')}</span><p>${esc(chefName)} şefinin üretici üyeliği bu oturumda açık görünüyor (önizleme; ödeme alınmadı).</p><div class="sheet-actions"><button type="button" class="button secondary" data-sheet-close>Kapat</button><button type="button" class="button secondary" data-dv2-unsubscribe>Abonelikten çık</button></div></div>`);
document.addEventListener('click',e=>{
 if(e.target.closest('[data-dv2-follow]')){if(!memberPreview()){gate('Şefi takip etmek');return}chefState.follow=!chefState.follow;paintChef();toast(chefState.follow?'Önizleme: şef takip edildi (bu oturumda).':'Önizleme: takipten çıkıldı.');return}
 if(e.target.closest('[data-dv2-subscribe]')){if(!memberPreview()){gate('Şefe abone olmak');return}chefState.subscribe?unsubscribeSheet():subscribeSheet();return}
 if(e.target.closest('[data-dv2-subscribe-confirm]')){chefState.subscribe=true;paintChef();genericDialog.close();toast('Önizleme: abonelik gösterildi; ödeme alınmadı.');return}
 if(e.target.closest('[data-dv2-unsubscribe]')){chefState.subscribe=false;paintChef();genericDialog.close();toast('Önizleme: abonelik kaldırıldı.');}
});

/* ---------- Açıklama: webdeki tam metin (detay-v2-aciklama.js); kapalıyken 3 satır + fade, gerekirse "Devamını oku". ---------- */
const descWrap=q('.description-wrap'),descText=q('#recipeDescription');
if(descWrap&&descText){
 const full=window.DV2_DESCRIPTIONS?.[r.slug]||w.fullDescription;if(full)descText.textContent=full;
 q('[data-description]',descWrap)?.remove();
 descWrap.classList.add('dv2-desc');
 descWrap.insertAdjacentHTML('beforeend',`<button type="button" class="dv2-more" aria-expanded="false" aria-controls="recipeDescription" hidden><span>Devamını oku</span>${fa('chevron-down')}</button>`);
}
const moreButton=q('.dv2-more');
function syncDescription(){
 if(!descText||!moreButton)return;
 const line=parseFloat(getComputedStyle(descText).lineHeight)||22,collapsed=line*3;
 descWrap.style.setProperty('--dv2-desc-collapsed',collapsed+'px');
 const needs=descText.scrollHeight>collapsed+2;
 moreButton.hidden=!needs;descWrap.classList.toggle('is-clamped',needs&&moreButton.getAttribute('aria-expanded')!=='true');
 if(!needs){descText.style.maxHeight='none';return}
 descText.style.maxHeight=moreButton.getAttribute('aria-expanded')==='true'?descText.scrollHeight+'px':collapsed+'px';
}
moreButton?.addEventListener('click',()=>{
 const open=moreButton.getAttribute('aria-expanded')!=='true';
 const collapsed=parseFloat(descWrap.style.getPropertyValue('--dv2-desc-collapsed'))||66;
 descText.style.maxHeight=(open?collapsed:descText.scrollHeight)+'px';descText.offsetHeight;
 moreButton.setAttribute('aria-expanded',open);q('span',moreButton).textContent=open?'Daha az göster':'Devamını oku';
 descWrap.classList.toggle('is-clamped',!open);descText.style.maxHeight=(open?descText.scrollHeight:collapsed)+'px';
 requestAnimationFrame(()=>syncJustify());
});
descText?.addEventListener('transitionend',()=>{if(moreButton?.getAttribute('aria-expanded')==='true')descText.style.maxHeight=descText.scrollHeight+'px';});

/* ---------- 4. Sekmeler: Malzemeler · Hazırlanış · Yorumlar (web: aside malzeme paneli, ana sütun adımlar, yorumlar). ---------- */
const ingredientSection=q('.ingredient-section'),methodSection=q('#adimlar'),reviewSection=q('#yorumlar');
const reviewCount=w.reviews?.length||0;
const tabsDef=[['malzemeler','Malzemeler',r.ingredients.length],['hazirlanis','Hazırlanış',r.steps.length],['yorumlar','Yorumlar',reviewCount]];
const tabsBar=html(`<div class="dv2-tabs-bar"><div class="segmented dv2-tabs" role="tablist" aria-label="Tarif içeriği">${tabsDef.map(([id,label,n],i)=>`<button type="button" role="tab" id="dv2-tab-${id}" aria-controls="dv2-pane-${id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-dv2-tab="${id}"><span>${label}</span><span class="dv2-tab-count">${n}</span></button>`).join('')}</div></div>`);
const panes=Object.fromEntries(tabsDef.map(([id],i)=>{const p=document.createElement('div');p.className='dv2-pane';p.id='dv2-pane-'+id;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','dv2-tab-'+id);p.tabIndex=-1;p.hidden=i!==0;return [id,p]}));
q('.description-wrap').after(tabsBar,...Object.values(panes));

/* Malzemeler: porsiyon, liste, alternatif tarifler. Alerjen yalnız kaynak "Alerjen:" cümlesinden (bilgi kartı şeridi). */
const allergenRx=/Alerjen:\s*([\s\S]*?)(?=\s+(?:Önemli|Dikkat):|\n|$)/;
panes.malzemeler.append(ingredientSection);
ingredientSection.classList.add('dv2-ingredients');
const ingHead=q('.ingredient-heading',ingredientSection);
if(ingHead){q('[data-auth]',ingHead)?.remove();ingHead.classList.add('dv2-sr-heading');}
// Porsiyon: hafif kart; sayaç birim etiketini taşır.
const portion=q('.portion-panel',ingredientSection);
q('#portions',portion)?.insertAdjacentHTML('afterend',`<span class="dv2-portion-unit">${esc(r.unit)}</span>`);
// Web malzeme başlığı: "N malzeme · X kişilik için" + porsiyon adımlayıcı. Çift bilgi yok: kişi sayısı yalnız adımlayıcıda.
const portionMeta=q(':scope>div:first-child>span',portion);if(portionMeta){const scaleLabel=q('#scaleLabel',portionMeta);scaleLabel?.classList.add('dv2-sr');scaleLabel?.setAttribute('aria-hidden','true');portionMeta.replaceChildren(scaleLabel||'',document.createTextNode(`${r.ingredients.length} malzeme`));}
q('.ingredient-progress>div>span',ingredientSection)?.remove();
// Malzeme satırı (web .ing-row): miktar primary ve solda, ad sağda; eylemler sonda: alışveriş + (varsa) "değiştir".
const swapIcon=b=>{b.className='icon-button dv2-swap';b.innerHTML=fa('shuffle');};
qa('.ingredient-row',ingredientSection).forEach(row=>{
 const alt=q('[data-swap]',row);if(!alt)return;
 const item=alternativeData(Number(alt.dataset.swap));
 swapIcon(alt);alt.setAttribute('aria-label',`${item?.name||'Malzeme'} yerine ne kullanabilirim?`);alt.setAttribute('aria-haspopup','dialog');
 q('.ingredient-actions',row).append(alt);
});
if(q('.ingredient-row [data-swap]',ingredientSection))ingredientSection.classList.add('dv2-has-swaps');
// Web .iq sütunu: miktarlar tek genişlikte, adlar aynı x'te başlar (en geniş miktar; liste genişliğinin %40'ı tavan).
function syncAmountColumn(){const list=q('.ingredients',ingredientSection);if(!list||!list.offsetParent)return;list.style.removeProperty('--dv2-amount-w');const widest=Math.max(...qa('.amount',list).map(a=>a.scrollWidth));list.style.setProperty('--dv2-amount-w',Math.ceil(Math.min(widest,list.clientWidth*.4))+'px');}
// Web .ing-pop: "Yerine ne kullanabilirim?" — ad kalın, açıklama yanında; mobil önizlemedeki "Bununla değiştir" korunur.
/* R4: web verisi (recipe_ingredient_substitutes.text) tek metindir: "ad — açıklama"; ayrı oran alanı yoktur.
   Oran satırı yalnız açıklamada açıkça geçiyorsa gösterilir ("60 ml limon suyu yerine 4 g" ya da "aynı miktar / 1:1");
   aksi hâlde oran uydurulmaz. Asıl miktar porsiyona göre güncel değerdir. */
const UNIT='(?:ml|g|kg|lt|l|adet|yemek kaşığı|tatlı kaşığı|çay kaşığı|su bardağı|çay bardağı|tutam|diş)';
const ratioOf=(note,altName)=>{const m=note.match(new RegExp(`([\\d.,½¼¾]+\\s*${UNIT})\\s+(.+?)\\s+yerine\\s+([\\d.,½¼¾]+\\s*${UNIT})`,'i'));if(m)return [`${m[1]} ${m[2]}`,`${m[3]} ${altName}`];return /aynı miktar|1\s*:\s*1/i.test(note)?['Aynı miktar (1:1)']:null;};
function substituteSheet(n){
 const item=alternativeData(n);if(!item?.substitutes?.length)return;
 const base=r.ingredients[n],amount=base?.amount!=null?`${(base.amount*scale).toLocaleString('tr',{maximumFractionDigits:2})} ${base.unit||''}`.trim():(item.quantity||'');
 const scaled=typeof scale==='number'&&Math.abs(scale-1)>.001;
 sheet('Yerine ne kullanabilirim?',`<div class="dv2-alt">
  <div class="dv2-alt-base"><span class="dv2-alt-label">Tarifteki malzeme</span><p><b>${esc(amount)}</b><span>${esc(item.name)}</span></p></div>
  <span class="dv2-alt-label">${item.substitutes.length>1?'Alternatifler':'Alternatif'}</span>
  <ul class="dv2-sub-list">${item.substitutes.map((text,k)=>{const [name,...rest]=text.split(' — '),note=rest.join(' — '),ratio=ratioOf(note,name);return `<li><div class="dv2-alt-item"><b class="dv2-alt-name">${fa('shuffle')}<span>${esc(name)}</span></b>${ratio?`<span class="dv2-alt-ratio">${fa('scale-balanced')}<span>Oran: ${ratio.map(esc).join(` ${fa('arrow-right','dv2-alt-to')} `)}${scaled?' (tarifin asıl porsiyonu)':''}</span></span>`:''}${note?`<p class="dv2-alt-note">${esc(note)}</p>`:''}<button type="button" class="dv2-sub-apply" data-apply-alternative="${n}" data-option="${k}">${fa('arrow-right-arrow-left')}<span>Bununla değiştir</span></button></div></li>`}).join('')}</ul>
  ${ingredientReplacements.has(n)?`<button type="button" class="button secondary dv2-alt-undo" data-undo-alternative="${n}">${fa('rotate-left')}<span>Orijinal malzemeye dön</span></button>`:''}
 </div>`);
}
addEventListener('click',e=>{
 const swap=e.target.closest('[data-swap]');if(swap){e.preventDefault();e.stopImmediatePropagation();substituteSheet(Number(swap.dataset.swap));return}
 if(e.target.closest('[data-apply-alternative],[data-undo-alternative],#more,#less'))setTimeout(()=>{qa('.ingredient-row [data-swap]').forEach(swapIcon);syncAmountColumn();},0);
},true);
const shopAll=q('.shopping-all',ingredientSection);if(shopAll){shopAll.innerHTML=`${fa('cart-plus')}<span>Tümünü Listeye Ekle</span>`;shopAll.classList.remove('secondary');}
qa('.detail-block',panel).filter(b=>/Alternatif Tarifler/.test(q('h2',b)?.textContent||'')).forEach(b=>{b.classList.add('dv2-related');panes.malzemeler.append(b)});

/* Hazırlanış: beceriler, adımlar (tamamlama + ilerleme), hatırlatma, besin, foto duvarı, etkileşim. */
qa('.detail-block',panel).filter(b=>/gereken beceriler/.test(q('h2',b)?.textContent||'')).forEach(b=>panes.hazirlanis.append(b));
panes.hazirlanis.append(methodSection);
dgHead(q(':scope>.section-heading-row',methodSection));
const steps=qa('.steps>.step',methodSection);
const stepProgress=html(`<div class="dv2-step-progress"><div><span id="dv2StepStatus" aria-live="polite">0 / ${steps.length} adım tamamlandı</span></div><progress id="dv2StepBar" max="${steps.length}" value="0" aria-label="Tamamlanan adımlar"></progress></div>`);
q('.steps',methodSection).before(stepProgress);
// Adım tamamlama numaradan (web .sc-num): rozete dokun → tamamlandı; tekrar dokun → geri al. Pişirme modu aynı kümeyi kullanır.
const stepDone=new Set();
let hintSeen=false;try{hintSeen=localStorage.getItem('dv2-step-hint')==='1';}catch{}
steps.forEach((li,i)=>{
 const badge=q('.step-index',li);badge.removeAttribute('data-step-done');badge.dataset.dv2Step=i;
 badge.innerHTML=`<span class="dv2-step-number">${i+1}</span>${fa('check','dv2-step-check')}`;
 const body=q(':scope>div',li);
  const h3=q('h3',body);if(h3){const head=html('<div class="dv2-step-title"><div class="dv2-step-title-row"></div></div>');h3.before(head);q('.dv2-step-title-row',head).append(h3);const timer=q('.timer-chip',body);if(timer)q('.dv2-step-title-row',head).append(timer);
  // Adım görselleri (web .sc-figs): mobilde metnin üstünde, oranlı.
  const photos=qa(':scope>.step-photo',body);if(photos.length){const figs=html('<div class="dv2-step-figures"></div>');figs.append(...photos);head.before(figs);li.classList.add('dv2-has-figures');}if(i===0&&!hintSeen)head.insertAdjacentHTML('beforeend',`<span class="dv2-step-hint">${fa('hand-pointer')}<span>Numaraya dokunarak adımı tamamla</span></span>`);}
});
function paintSteps(){
 steps.forEach((li,i)=>{const on=stepDone.has(i);li.classList.toggle('is-done',on);const badge=q('.step-index',li);badge.setAttribute('aria-pressed',on);badge.setAttribute('aria-label',on?`${i+1}. adım tamamlandı; geri almak için dokun`:`${i+1}. adımı tamamla`);});
 const done=stepDone.size;q('#dv2StepStatus').textContent=done===steps.length?'Bütün adımlar tamamlandı':`${done} / ${steps.length} adım tamamlandı`;q('#dv2StepBar').value=done;
}
function toggleStep(i){
 stepDone.has(i)?stepDone.delete(i):stepDone.add(i);paintSteps();
 if(!hintSeen){hintSeen=true;try{localStorage.setItem('dv2-step-hint','1');}catch{}q('.dv2-step-hint')?.remove();}
}
document.addEventListener('click',e=>{const b=e.target.closest('.step-index[data-dv2-step]');if(b)toggleStep(Number(b.dataset.dv2Step));});
paintSteps();
/* ---------- Bilgi kartı şeridi (sekmelerin üstünde): Alerjen · Hatırlatma · Besin Değerleri. Webde Hatırlatma
   ve Besin Değerleri adımlardan sonra gelir; alerjen cümlesi Hatırlatma'nın içindedir. Mobilde pişirmeye
   ve alışverişe başlamadan görülsün diye sekmelerden önce, yatay kaydırılır kart olarak. ---------- */
const infoCards=[];
/* Bilgi kartları tek tasarım (Beyar kararı, 10 Ekim: eski ?not=b). ?not parametresi artık okunmaz; eski ?not=a|b linkleri
   hata vermeden aynı tasarımı gösterir. Şeritteki bütün kartlar (Hatırlatma · Alerjen · Editör Notu) aynı kalıp. */
const noteHTML=t=>t.split('\n').map(line=>`<p class="dv2-card-text">${esc(line.trim()).replace(/(^|\s)(Önemli:|Dikkat:|Alerjen:)/g,'$1<b>$2</b>')}</p>`).join('');
/* Parite (10 Ekim, canlı Shami Kebap/Mısır/Curry DOM'u + Laravel _notes.blade.php): webde şerit karşılığı .note-duo —
   Hatırlatma (remind_text) ve Editör Notu (editor_note), bu sırayla. Alerjen ayrı alan değildir: Hatırlatma metninin sonundaki
   "Alerjen: …" cümlesidir; mobilde Hatırlatma'nın hemen ardından ayrı, net başlıklı kart olur. Beslenme özellikleri
   (Glutensiz, Laktozsuz…) alerjen değildir, özellik çiplerinde kalır. Besin Değerleri şeritten çıktı, kendi bölümünde. */
// Alerjen adları: "… göre X, Y içerir" ya da "X içerir". Yalnız parantez dışındaki virgülden bölünür ("süt ve süt ürünleri",
// "gluten (un)" tek kategori kalır); "yalnızca" öneki atılır. Metin değişmez, yalnız etiket için ayrıştırılır.
const allergenNames=t=>{const m=t.match(/göre\s+(.+?)\s+içerir/i)||t.match(/^(.+?)\s+içerir/i);if(!m)return [];const parts=[];let depth=0,cur='';for(const ch of m[1]){if(ch==='(')depth++;if(ch===')')depth=Math.max(0,depth-1);if(ch===','&&!depth){parts.push(cur);cur='';}else cur+=ch;}parts.push(cur);return parts.map(x=>x.trim().replace(/^yalnızca\s+/i,'')).filter(Boolean);};
(r.web?.notes||[]).forEach((n,k)=>{
 const editor=/^Editör Notu/i.test(n.title);
 const rest=n.body.replace(allergenRx,'').replace(/\s+\n/g,'\n').trim();
 if(rest)infoCards.push({id:(editor?'editor-':'not-')+k,icon:editor?'pen-nib':'bell',title:n.title,body:noteHTML(rest)});
 const al=(n.body.match(allergenRx)||[])[1];
 if(al){const names=allergenNames(al.trim());const bold=names.reduce((h,x)=>h.replace(new RegExp(`(^|\\s)(${x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})(?=\\s|,|$)`,'i'),'$1<b>$2</b>'),esc(al.trim()));const shown=bold.replace(/^(<b>)?(\p{Ll})/u,(m0,tag,ch)=>(tag||'')+ch.toLocaleUpperCase('tr'));
  infoCards.push({id:'alerjen',icon:'hand-dots',title:'Alerjen',lead:names.length?`<span class="dv2-allergen-list">${names.map(x=>`<span class="dv2-allergen-tag">${esc(x.charAt(0).toLocaleUpperCase('tr')+x.slice(1))}</span>`).join('')}</span>`:'',body:`<p class="dv2-card-text">${shown}</p>`});}
});
qa('.recipe-note',panel).forEach(n=>n.remove());
const nutrition=q('details.nutrition');
if(nutrition){nutrition.hidden=true;nutrition.classList.add('dv2-hidden-source');panel.append(nutrition);}
/* Besin Değerleri bölümü (web .nut-card / _nutrition.blade.php): 8 değer, makro oranı çubuğu + lejant, "Değerler tahminidir".
   Değerler 1 porsiyon içindir; porsiyon adımlayıcısı bunları değiştirmez. Veride olmayan hücre çizilmez. */
const nutData=w.nutrition&&(w.nutrition.cells||[]).filter(c=>c.value);
let nutSection=null;
if(nutData?.length){
 const split=v=>{const m=String(v).match(/^([\d.,]+)\s*(.*)$/);return m?[m[1],m[2]]:[v,''];};
 const kcal=nutData.find(c=>c.label==='Kalori'),cells=nutData.filter(c=>c!==kcal);
 const macros=(w.nutrition.macros||[]).map(t=>{const m=String(t).match(/^(.+?)\s*%\s*([\d.,]+)/);return m&&{label:m[1].trim(),n:Number(m[2].replace(',','.'))}}).filter(Boolean);
 const key={Protein:'p',Karbonhidrat:'c','Yağ':'f'};
 const byLabel=l=>cells.find(c=>c.label===l);
 const trio=['Protein','Karbonhidrat','Yağ'].map(l=>byLabel(l)).filter(Boolean),rest=cells.filter(c=>!trio.includes(c));
 const pct=l=>macros.find(m=>m.label===l)?.n;
 /* Kompakt (10 Ekim): Kalori öne çıkan tek kutu · Protein/Karbonhidrat/Yağ tek satır (renk işareti + yüzde = lejant) ·
    ince makro çubuğu · kalan değerler (Lif/Şeker/Sodyum/Doymuş Yağ) P/K/Y ile aynı kalıpta tek satır eşit sütunlar · tek satır not. */
 nutSection=html(`<section class="dv2-nutrition" aria-labelledby="dv2-nut-title">
  <div class="section-heading-row dg-head"><h2 id="dv2-nut-title">Besin Değerleri</h2></div>
  <div class="dv2-nut">
   ${kcal?`<div class="dv2-nut-kcal" data-nut="Kalori">${fa('fire-flame-curved')}<b>${esc(split(kcal.value)[0])}</b><small>${esc(split(kcal.value)[1])}</small><span>${esc(kcal.label)}</span></div>`:''}
   ${trio.length?`<dl class="dv2-nut-trio" style="--dv2-n:${trio.length}">${trio.map(c=>{const [n,u]=split(c.value),k=key[c.label]||'x',pc=pct(c.label);return `<div data-nut="${esc(c.label)}"><dt><i class="dv2-m-${k}" aria-hidden="true"></i>${esc(c.label)}</dt><dd><b>${esc(n)}</b>${u?`<small>${esc(u)}</small>`:''}${pc!=null?`<span class="dv2-nut-pct">%${pc}</span>`:''}</dd></div>`}).join('')}</dl>`:''}
   ${macros.length&&macros.some(m=>m.n>0)?`<div class="dv2-macro-bar" role="img" aria-label="Makro oranı: ${macros.map(m=>`${esc(m.label)} %${m.n}`).join(', ')}">${macros.map(m=>`<i class="dv2-m-${key[m.label]||'x'}" style="width:${m.n}%"></i>`).join('')}</div>`:''}
   ${rest.length?`<dl class="dv2-nut-trio dv2-nut-rest" style="--dv2-n:${rest.length}">${rest.map(c=>{const [n,u]=split(c.value);return `<div data-nut="${esc(c.label)}"><dt>${esc(c.label)}</dt><dd><b>${esc(n)}</b>${u?`<small>${esc(u)}</small>`:''}</dd></div>`}).join('')}</dl>`:''}
   <div class="dv2-nut-foot"><p class="dv2-nut-note">${fa('circle-info')}<span>${/tahmin/i.test(w.nutrition.notice||'Değerler tahminidir')?'Tahmini değerler':esc(w.nutrition.notice)} · 1 porsiyon</span></p></div>
  </div>
 </section>`);
}
if(infoCards.length){
 const strip=html(`<section class="dv2-info${infoCards.length===1?' is-single':''}" aria-label="Tarif notları"><div class="dv2-info-rail"${infoCards.length>1?' tabindex="0"':''}>${infoCards.map(c=>`<button type="button" class="dv2-info-card dv2-info-${c.id.replace(/-\d+$/,'')}" data-dv2-card="${c.id}" aria-haspopup="dialog"><span class="dv2-card-head"><span class="dv2-box-icon">${fa(c.icon)}</span><span class="dv2-card-title">${esc(c.title)}</span></span>${c.lead||''}<span class="dv2-card-body">${c.body}</span><span class="dv2-card-more">Devamını oku${fa('chevron-right')}</span></button>`).join('')}</div></section>`);
 q('.description-wrap').after(strip);
 strip.addEventListener('click',e=>{const b=e.target.closest('[data-dv2-card]');if(!b)return;const c=infoCards.find(x=>x.id===b.dataset.dv2Card);sheet(c.title,`<div class="dv2-card-sheet">${c.lead||''}${c.body.replace(/dv2-card-text/g,'dv2-card-text prose')}</div>`);});
}
function syncCards(){qa('.dv2-info-card').forEach(card=>{const body=q('.dv2-card-body',card);card.classList.toggle('is-truncated',body.scrollHeight>body.clientHeight+1);});}
qa('.detail-block',panel).filter(b=>/Onlar yaptı/.test(q('h2',b)?.textContent||'')).forEach(b=>panes.hazirlanis.append(b));
// Ben de Yaptım / Eline Sağlık alt etkileşim çubuğunda; içerikteki ikinci kopya kaldırılır.
q('.recipe-engagement-block')?.remove();

/* Yorumlar: özet + dağılım, değerlendir, filtre, kartlar, boş durum. */
panes.yorumlar.append(reviewSection);
dgHead(q(':scope>.section-heading-row',reviewSection));
reviewSection.classList.add('dv2-reviews');
const dist=w.reviewSummary?.distribution||[];const ratingValue=Number(r.rating)||0;
const starRow=(value,cls='')=>`<span class="dv2-stars ${cls}" aria-hidden="true">${[1,2,3,4,5].map(n=>`<i class="icon fa-solid fa-star${n<=Math.round(value)?' on':''}"></i>`).join('')}</span>`;
// Web .rev-summary: "N kişi yorum yazmadan puan verdi" = değerlendirme sayısı − puanlı yorum sayısı.
const silentRatings=Math.max(0,(Number(r.ratingCount)||0)-(w.reviews||[]).filter(v=>v.rating!=null).length);
const oldSummary=q('.review-summary',reviewSection);
if(oldSummary){
 if(ratingValue&&r.ratingCount){
  const max=Math.max(1,...dist.map(d=>Number(d.count)||0));
  oldSummary.replaceWith(html(`<div class="dv2-rating" aria-label="Puan özeti">
   <div class="dv2-rating-score"><b>${ratingValue.toFixed(1).replace('.',',')}</b>${starRow(ratingValue)}<span class="dv2-sr">5 üzerinden ${ratingValue.toFixed(1).replace('.',',')}</span><small>${r.ratingCount} değerlendirme</small>${w.reviewSummary?.recommend?`<small class="dv2-recommend">${fa('thumbs-up')}${esc(w.reviewSummary.recommend)}</small>`:''}${silentRatings?`<small class="dv2-silent">${silentRatings} kişi yorum yazmadan puan verdi</small>`:''}</div>
   <ul class="dv2-rating-bars">${dist.map(d=>`<li><span class="dv2-bar-label">${esc(d.star)}${fa('star')}</span><span class="dv2-bar-track"><i style="width:${(Number(d.count)||0)/Math.max(r.ratingCount,max)*100}%"></i></span><span class="dv2-bar-count">${esc(d.count)}</span></li>`).join('')}</ul>
  </div>`));
 }else oldSummary.remove();
}
const rateButton=q('[data-auth="Yorum yaz"]',reviewSection);
if(rateButton){rateButton.className='button dv2-rate';rateButton.innerHTML=`${fa('star')}<span>Tarifi değerlendir</span>`;rateButton.setAttribute('aria-label','Tarifi değerlendir ve yorum yaz');}
const filters=q('.review-filters',reviewSection);
if(filters){const reviews=w.reviews||[];
 // Web .rev-filter "Puansız (N)": yıldızsız yorumlar.
 if(reviews.some(v=>v.rating==null))filters.insertAdjacentHTML('beforeend','<button class="chip" data-review-filter="null" aria-pressed="false">Puansız</button>');
 const count={null:reviews.filter(v=>v.rating==null).length,all:reviews.length,photo:reviews.filter(v=>v.photos?.length).length,5:reviews.filter(v=>v.rating==5).length,4:reviews.filter(v=>v.rating==4).length,low:reviews.filter(v=>v.rating!=null&&v.rating<=3).length};qa('[data-review-filter]',filters).forEach(b=>{const n=count[b.dataset.reviewFilter];b.insertAdjacentHTML('beforeend',` <span class="dv2-chip-count">${n}</span>`);});filters.classList.add('dv2-filter-row');}
qa('.review',reviewSection).forEach(article=>{
 const head=q('.review-head',article),avatar=q('.avatar',head),name=q('a',head),stars=q('.rating',head),badge=q(':scope>small:not(.muted)',article),date=q(':scope>small.muted',article);
 const value=Number(article.dataset.stars);
 const who=html(`<div class="dv2-review-who"></div>`);who.append(name);
 const meta=[badge?.textContent.trim()&&`${fa('award')}${esc(badge.textContent.trim())}`,date&&esc(date.textContent.trim())].filter(Boolean);
 who.insertAdjacentHTML('beforeend',`<span class="dv2-review-meta">${meta.join('<span class="dv2-dot" aria-hidden="true">·</span>')}</span>`);
 stars?.remove();badge?.remove();date?.remove();
 avatar.classList.add('dv2-avatar');
 head.append(who);
 if(value)head.insertAdjacentHTML('beforeend',`${starRow(value,'dv2-review-stars')}<span class="dv2-sr">${value} yıldız</span>`);
 const photos=qa(':scope>.review-photo',article);if(photos.length){const row=html('<div class="dv2-review-photos"></div>');photos[0].before(row);row.append(...photos);}
 qa('.review-actions [data-auth]',article).forEach(b=>{const a=b.dataset.auth;if(/bildir/i.test(a))b.innerHTML=`${fa('flag')}<span>Bildir</span>`;else if(/yanıtla/i.test(a))b.innerHTML=`${fa('comment')}<span>Yanıtla</span>`;else if(/beğen/i.test(a))b.innerHTML=b.innerHTML.replace(/Beğen\s*(\S*)/,'<span>Beğen</span> <b>$1</b>');});
 qa('.reply',article).forEach(rep=>{const b=q('b',rep);if(b)b.innerHTML=b.innerHTML.replace(' · Tarif Sahibi',` <span class="dv2-owner">${fa('utensils')}Tarif Sahibi</span>`);});
});
const empty=q('.review-empty',reviewSection);
if(empty){empty.innerHTML=`<span class="dv2-box-icon">${fa('comment-dots')}</span><p>${esc(empty.textContent.trim())}</p>`;if(rateButton)empty.after(rateButton);}

/* Ortak kuyruk: tarif bilgileri ve etiketler sekmelerin altında. */
const tail=html('<div class="dv2-tail"></div>');
const meta=q('.recipe-metadata:not(.nutrition)',panel),tags=q('.recipe-tags',panel);meta?.classList.add('dv2-accordion');
if(nutSection)tail.append(nutSection);
if(meta)tail.append(meta);tags?.remove();
qa('.detail-block',panel).filter(b=>!b.closest('.dv2-pane')&&!b.classList.contains('similar-section')&&q('h2',b)).forEach(b=>tail.append(b));

/* ---------- 11. Benzer Tarifler: ortak bölüm başlığı (Benzer Tarifler · Tümü →) + ana sayfa "En son eklenen tarifler" ile
   aynı ortak bileşen (docs/46): DGCard.pairs + DGCard.tile (ortak-kart.js/css) — tam 2 kart, yarım kart yok, sayfa sayfa
   snap, gösterge yok. Veri: canlı benzer liste (DV2_SIMILAR). Kart bağlantıları mevcut parametreleri korur, sekme atılır. ---------- */
const keepParams=slug=>{const u=new URLSearchParams(location.search);u.set('tarif',slug);u.delete('sekme');return 'detay-v2.html?'+u.toString();};
if(window.DGCard)DGCard.configure({href:x=>keepParams(x.slug)});
const similarRecipes=(w.similar||[]).map(s=>DATA.recipes.find(x=>s.url.split('/tarif/')[1]===x.slug)).filter(x=>x&&x.slug!==r.slug).slice(0,8);
q('.similar-section',panel)?.remove();
if(similarRecipes.length&&window.DGCard){
 tail.append(html(`<section class="dv2-similar" aria-labelledby="dv2-similar-title"><div class="section-heading-row dg-head"><h2 id="dv2-similar-title">Benzer Tarifler</h2><a href="liste-v2.html" class="dg-head__link section-heading-action" aria-label="Tüm tarifler">Tümü ${fa('arrow-right')}</a></div>${DGCard.pairs(similarRecipes,'Benzer tarifler')}</section>`));
}
panel.append(tail);
window.DGCard?.wirePairs(panel);
hydratePhotos(panel);

/* ---------- Sekme seçimi: gerçek sekme. Dokununca yalnız çubuğun altındaki panel değişir; sayfa başka yere kaymaz.
   Çubuk yapışık değilse kaydırma konumu aynen kalır; yapışıksa yeni panel çubuğun hemen altından başlar (anında). ---------- */
const tabButtons=qa('[data-dv2-tab]',tabsBar);
const tabsAnchor=html('<div class="dv2-tabs-anchor" aria-hidden="true"></div>');
const headerH=()=>header.getBoundingClientRect().height;
// Çubuğun normal akıştaki yeri (sticky değilken): bu kaydırmada çubuk header'a tam oturur, panel hemen altından başlar.
const tabsDock=()=>Math.ceil(tabsAnchor.getBoundingClientRect().top+scrollY-headerH());
const tabsStuck=()=>tabsAnchor.getBoundingClientRect().top<=headerH()+.5;
function select(id,{focus=false,dock=false}={}){
 const stuck=tabsStuck(),y0=scrollY;
 tabButtons.forEach(b=>{const on=b.dataset.dv2Tab===id;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
 Object.entries(panes).forEach(([k,p])=>p.hidden=k!==id);
 applyProse(panes[id]);syncParagraphAlignment(panes[id]);if(id==='malzemeler')syncAmountColumn();requestAnimationFrame(()=>syncJustify(panes[id]));
 // dock: derin bağlantı (puan kapsülü, #adimlar, yorum kısayolu) — paneli çubuğun altına getirir.
 if(dock||stuck)scrollTo({top:tabsDock(),behavior:'instant'});else if(scrollY!==y0)scrollTo({top:y0,behavior:'instant'});
 if(focus)tabButtons.find(b=>b.dataset.dv2Tab===id).focus({preventScroll:true});
 // Sekme adreste ?sekme= ile tutulur; hash yazılmaz (yenilemede tarayıcının çapa kaydırması olmasın).
 const u=new URL(location.href);if(id==='malzemeler')u.searchParams.delete('sekme');else u.searchParams.set('sekme',id);history.replaceState(history.state,'',u.pathname+u.search);
 syncDetailHeader?.();
}
tabsBar.addEventListener('click',e=>{const b=e.target.closest('[data-dv2-tab]');if(b)select(b.dataset.dv2Tab);});
tabsBar.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const ids=tabsDef.map(t=>t[0]);let i=ids.indexOf(document.activeElement.dataset.dv2Tab);i=e.key==='Home'?0:e.key==='End'?ids.length-1:(i+(e.key==='ArrowRight'?1:ids.length-1))%ids.length;select(ids[i],{focus:true});});
const toReviews=()=>select('yorumlar',{dock:true});
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href="#yorumlar"]');if(a){e.preventDefault();toReviews();return}
 if(e.target.closest('[data-comments-shortcut],[data-goto-reviews]'))requestAnimationFrame(toReviews);
},true);
const initialHash=window.DV2_INITIAL_HASH||location.hash,initial=new URLSearchParams(location.search).get('sekme')||({'#adimlar':'hazirlanis','#yorumlar':'yorumlar'}[initialHash]);

/* ---------- 12. Paylaş sheet'i: marka ikonlu ızgara + tek satır kopyalama alanı. ---------- */
const share=q('#shareSheet');
const channels=[['Facebook','facebook-f',true],['X','x-twitter',true],['WhatsApp','whatsapp',true],['Telegram','telegram',true],['Pinterest','pinterest-p',true],['E-posta','envelope',false]];
const copyButton=q('#copyLink',share),urlInput=q('.share-url',share);
q('.share-channels',share)?.replaceWith(html(`<ul class="dv2-share-grid" aria-label="Paylaşım kanalları">${channels.map(([name,ic,isBrand])=>`<li><button type="button" class="dv2-share-item" data-share-channel="${name}" data-dv2-brand="${slug(name).replace(/[^a-z]/g,'')}" aria-label="${name} ile paylaş"><span class="dv2-share-icon">${isBrand?brand(ic):fa(ic)}</span><span class="dv2-share-name">${name}</span></button></li>`).join('')}</ul>`));
const copyRow=html(`<div class="dv2-copy-row"><label class="input-frame dv2-copy-field">${fa('link')}<span class="dv2-sr">Tarif bağlantısı</span></label></div>`);
const oldFrame=urlInput.closest('.input-frame');(oldFrame||urlInput).before(copyRow);q('.dv2-copy-field',copyRow).append(urlInput);copyRow.append(copyButton);oldFrame?.remove();
copyButton.className='button secondary dv2-copy';
const copyIdle=()=>{copyButton.innerHTML=`${fa('copy')}<span>Kopyala</span>`;copyButton.removeAttribute('data-copied');copyButton.setAttribute('aria-label','Bağlantıyı kopyala');};
copyIdle();let copyTimer;
copyButton.onclick=async()=>{
 clearTimeout(copyTimer);
 try{await navigator.clipboard.writeText(r.url);copyButton.innerHTML=`${fa('check')}<span>Kopyalandı</span>`;copyButton.dataset.copied='true';copyButton.setAttribute('aria-label','Bağlantı kopyalandı');toast('Tarif bağlantısı kopyalandı.');copyTimer=setTimeout(copyIdle,2400);}
 catch{urlInput.focus();urlInput.select();toast('Bağlantıyı seçip kopyalayabilirsin.');}
};
share.addEventListener('close',()=>{clearTimeout(copyTimer);copyIdle();});
q('.share-label',share)?.classList.add('dv2-share-title');

/* Yazdır (web .icon-btn print, "Tarifi yazdır"): mobilde "..." menüsünde. */
document.addEventListener('click',e=>{if(e.target.closest('[data-recipe-more]'))setTimeout(()=>{const t=q('#actionSheet [data-print] .action-card-title')||q('#actionSheet [data-print]');if(t)t.lastChild.textContent=' Tarifi yazdır / PDF';},0);},true);

/* ---------- Alt etkileşim çubuğu: etiketli sayaçlar. ---------- */
const dock=q('.cook-bar');
qa('.engagement-icon',dock).forEach(b=>b.classList.add('dv2-engage'));
const start=q('#startCooking');if(start)start.innerHTML=`${fa('fire-burner')}<span>Pişirmeye Başla</span>`;

/* ---------- 1. Sabit üst + kayan panel. Kaynak-transfer: liste-v2.js ("Panel" + "Header" blokları) ve liste-v2.css 17–24.
   DOM: .detail-hero (sticky, z0) · .detail-main = .lv2-panel (relative, z2, −overlap) > .dv2-tabs-bar = .list-tools
   (panelin ilk çocuğu, sticky top header, 180ms radius) + .dv2-content = .list-content. ---------- */
document.body.classList.add('dv2-fixed');
/* R1: ortak bilgiler (özet, özellikler, şef, açıklama, bilgi kutuları) çubuğun üstünde; paneller + ortak kuyruk altında.
   Yapışan çubuk artık panelin ilk çocuğu değil: panel header'a değince köşeleri düzleşir (liste ile aynı an/süre),
   çubuk kendi sırası gelince header'ın altına 0 px boşlukla yapışır. */
const kids=[...panel.children],cut=kids.indexOf(tabsBar);
const head=html('<div class="dv2-head"></div>');head.append(...kids.slice(0,cut));
const content=html('<div class="dv2-content"></div>');content.append(...kids.slice(cut+1));
panel.append(head,tabsAnchor,tabsBar,content);
// liste-v2: --lv2-tools-h → scroll-margin-top. Detayda sekme çubuğu yüksekliği; çapa hedefleri çubuğun altına iner.
new ResizeObserver(()=>document.body.style.setProperty('--dv2-tabs-h',tabsBar.offsetHeight+'px')).observe(tabsBar);document.body.style.setProperty('--dv2-tabs-h',tabsBar.offsetHeight+'px');
const title=q('.compact-title',header);if(title){title.textContent=shortTitle(r);title.title=shortTitle(r);}
const originalSync=window.syncHeader;
if(originalSync){removeEventListener('scroll',originalSync);removeEventListener('resize',originalSync);document.removeEventListener('scroll',originalSync,true);visualViewport?.removeEventListener('scroll',originalSync);motion.removeEventListener('change',originalSync);headerGeometryObserver.disconnect();}
/* Tek sürekli overlay (kaynak-transfer: liste-v2.js paintBanner): kaynak koyu renk, smoothstep, 49 durak.
   Üst kol header boyunca sabit .76 ve 96px'te yumuşar; alt kol ilk metnin 24px üstünde .8, metin boyunca .9. */
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const veil=(h,alpha)=>`linear-gradient(180deg,${Array.from({length:49},(_,i)=>`color-mix(in srgb,var(--overlay) ${(alpha(h*i/48)*100).toFixed(2)}%,transparent) ${(i*100/48).toFixed(3)}%`).join(',')})`;
function textCurve(h,textTop,ramp,full=.8,end=.9){const at=Math.max(0,textTop-tokenPx('--space-24')),start=Math.max(0,at-ramp);return y=>y<=at?full*smooth((y-start)/Math.max(1,at-start)):full+(end-full)*smooth((y-at)/Math.max(1,h-at));}
function paintHero(){
 const eyebrow=q('.detail-cover-copy>.eyebrow',hero);if(!eyebrow)return;
 const h=hero.offsetHeight,textTop=eyebrow.getBoundingClientRect().top-hero.getBoundingClientRect().top;
 const lower=textCurve(h,textTop,tokenPx('--space-48')*2),H=header.offsetHeight,upper=y=>.76*(1-smooth((y-H)/(tokenPx('--space-48')*2)));
 hero.style.setProperty('--dv2-veil',veil(h,y=>1-(1-upper(y))*(1-lower(y))));
}
/* Header: liste-v2 syncHeader birebir. Eşik sabit katmandaki ilk metinden (liste: banner h1; detay: kategori etiketi):
   eşik = metin − header − 8; alfa = scrollY / min(48, eşik). Yapışma: panel üstü ≤ header + .5. Başlık header'a yapışmayla gelir. */
let titleTop=0;
/* Sabit alan yüksekliği liste geometrisinden: liste-v2'de ilk metin header'ın 3×48+8 = 152px altındadır; detay başlık bloğu
   daha uzun olduğu için yükseklik bloktan hesaplanır (blok + alt boşluk + header + 152). Böylece aynı overlay eğrisi aynı
   fotoğraf penceresini açar; kısa blokta liste banner'ının 320px tabanı korunur. */
function sizeHero(){const copy=q('.detail-cover-copy',hero);if(!copy)return;const gap=tokenPx('--space-48')*3+tokenPx('--space-8'),below=tokenPx('--panel-overlap')+tokenPx('--space-24');hero.style.setProperty('--dv2-hero-h',Math.round(Math.max(320,copy.offsetHeight+below+header.getBoundingClientRect().height+gap))+'px');}
sizeHero();
function measure(){sizeHero();const first=q('.detail-cover-copy>.eyebrow',hero);if(first)titleTop=first.getBoundingClientRect().top-hero.getBoundingClientRect().top;paintHero();}
measure();
function syncDetailHeader(){
 const height=header.getBoundingClientRect().height,threshold=Math.max(1,titleTop-height-tokenPx('--space-8')),fade=Math.min(tokenPx('--space-48'),threshold);
 const a=motion.matches?Number(scrollY>=fade):Math.min(1,Math.max(0,scrollY/fade));
 header.style.setProperty('background-color',`color-mix(in srgb,var(--dg-header-solid) ${(a*100).toFixed(1)}%,transparent)`,'important');
 header.dataset.alpha=a.toFixed(3);header.dataset.threshold=fade.toFixed(2);header.classList.toggle('is-solid',a===1);
 const stuck=panel.getBoundingClientRect().top<=height+.5;
 panel.classList.toggle('is-stuck',stuck);header.classList.toggle('is-compact',stuck);
 tabsBar.classList.toggle('is-stuck',tabsAnchor.getBoundingClientRect().top<=height+.5);
 const meta=q('meta[name="theme-color"]');if(meta)meta.content=a===1?getComputedStyle(document.documentElement).getPropertyValue('--dg-header-solid').trim():getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
}
window.syncHeader=syncDetailHeader;
addEventListener('scroll',syncDetailHeader,{passive:true});addEventListener('resize',()=>{syncAmountColumn();syncDescription();measure();syncDetailHeader();syncJustify();});motion.addEventListener('change',syncDetailHeader);
// Kaynak "compact" dinleyicisi başlığın viewport konumuna bakar; sabit hero'da anlamsızdır, son söz bu eşiktir.
addEventListener('scroll',()=>requestAnimationFrame(syncDetailHeader),{passive:true});
document.fonts.ready.then(()=>{syncAmountColumn();syncDescription();syncCards();measure();syncDetailHeader();syncJustify();window.DGCard?.veils(panel);});
syncDetailHeader();

/* ---------- 9. Paragraflar: iki ve daha çok satırlı gövde metinleri iki yana yaslı; tek satır sola. ---------- */
function syncJustify(root=panel){
 for(const p of root.querySelectorAll('.description-wrap .subtitle,.step p,.dv2-note-text,.dv2-allergen-text,.dv2-reviews .review>p,.dv2-reviews .reply p,.dv2-chef-bio,.metadata-body>p')){
  if(!p.offsetParent)continue;const range=document.createRange();range.selectNodeContents(p);const ys=[];for(const rc of range.getClientRects())if(rc.width&&rc.height&&!ys.some(y=>Math.abs(y-rc.top)<3))ys.push(rc.top);
  p.classList.toggle('dv2-justify',ys.length>=2);
 }
}
/* ---------- Tam ekran galeri (10 Ekim). Kaynak openGallery (ld-source) kapak için recipeInfo().gallery'yi CSS arka planı
   olarak çiziyordu; galerideki göreli '/varliklar/…' yolları yerelde 404 → boş gri alan, hata da görünmüyordu.
   Yeni galeri: hero + galeri + adım görselleri tek dizide (yinelenenler atılır), <img> + object-fit:contain, koyu zemin;
   tek görselde sayaç/oklar gizli; swipe (scroll-snap) + oklar + sayaç; Kapat, Esc, aşağı sürükleyerek kapatma;
   arka plan kilitli, kapanınca aynı konum; yüklenemeyen görselde kısa hata durumu. ---------- */
const galleryItems=()=>{const out=[],seen=new Set();const add=(src,label)=>{if(src&&!seen.has(src)){seen.add(src);out.push({src,label});}};
 add(r.image,'Kapak');(w.gallery||[]).forEach(src=>add(src,'Kapak'));(w.steps||[]).forEach((st,i)=>(st.images||[]).forEach(src=>add(src,`${i+1}. adım${r.steps[i]?.title?' · '+r.steps[i].title:''}`)));return out;};
function openLightbox(items,start=0){
 if(!items.length)return;
 const y0=scrollY,multi=items.length>1;let idx=Math.max(0,Math.min(start,items.length-1));
 const dlg=document.createElement('dialog');dlg.className='dv2-lb'+(multi?' is-multi':'');dlg.setAttribute('aria-label','Tarif fotoğrafları');
 dlg.innerHTML=`<div class="dv2-lb-top"><span class="dv2-lb-count" aria-live="polite"></span><button type="button" class="dv2-lb-btn" data-lb-close aria-label="Galeriyi kapat">${fa('xmark')}</button></div>
  <div class="dv2-lb-track" tabindex="-1">${items.map((it,i)=>`<figure class="dv2-lb-slide" data-i="${i}"><img alt="${esc(shortTitle(r))} · ${esc(it.label)}" decoding="async" draggable="false" ${Math.abs(i-idx)<=1?`src="${esc(it.src)}"`:`data-src="${esc(it.src)}"`}><figcaption class="dv2-lb-error" hidden>${fa('image')}<span>Görsel yüklenemedi</span></figcaption></figure>`).join('')}</div>
  <p class="dv2-lb-caption"></p>
  <button type="button" class="dv2-lb-btn dv2-lb-prev" data-lb-prev aria-label="Önceki görsel">${fa('chevron-left')}</button><button type="button" class="dv2-lb-btn dv2-lb-next" data-lb-next aria-label="Sonraki görsel">${fa('chevron-right')}</button>`;
 document.body.append(dlg);
 const track=q('.dv2-lb-track',dlg),slides=qa('.dv2-lb-slide',dlg);
 const load=i=>{const im=slides[i]&&q('img',slides[i]);if(im&&!im.getAttribute('src')&&im.dataset.src)im.src=im.dataset.src;};
 slides.forEach(sl=>{const im=q('img',sl);const fail=()=>{sl.classList.add('is-error');q('.dv2-lb-error',sl).hidden=false;};im.addEventListener('error',fail);im.addEventListener('load',()=>{if(!im.naturalWidth)fail();else sl.classList.add('is-loaded');});});
 const paint=()=>{q('.dv2-lb-count',dlg).textContent=multi?`${idx+1} / ${items.length}`:'';q('.dv2-lb-caption',dlg).textContent=items[idx].label;q('[data-lb-prev]',dlg).disabled=idx===0;q('[data-lb-next]',dlg).disabled=idx===items.length-1;[idx-1,idx,idx+1].forEach(load);};
 const go=(i,instant)=>{idx=Math.max(0,Math.min(i,items.length-1));track.scrollTo({left:idx*track.clientWidth,behavior:instant||reduce.matches?'instant':'smooth'});paint();};
 let raf=0;track.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));if(i!==idx){idx=i;paint();}});},{passive:true});
 // Aşağı sürükleyerek kapatma (dikey hareket baskınsa); bırakınca eşik altında geri döner.
 let sy=null,sx=null,dy=0;
 track.addEventListener('pointerdown',e=>{sy=e.clientY;sx=e.clientX;dy=0;if(e.pointerType==='mouse'){e.preventDefault();try{track.setPointerCapture(e.pointerId);}catch{}}});
 track.addEventListener('pointermove',e=>{if(sy===null)return;const ddy=e.clientY-sy,ddx=e.clientX-sx;if(ddy>0&&ddy>Math.abs(ddx)*1.2){dy=ddy;dlg.style.setProperty('--dv2-lb-drag',dy+'px');dlg.classList.add('is-dragging');}});
 const end=()=>{if(sy===null)return;sy=null;dlg.classList.remove('is-dragging');if(dy>tokenPx('--space-48')*2)close();else dlg.style.setProperty('--dv2-lb-drag','0px');};
 track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);
 const close=()=>{if(dlg.open)dlg.close();};
 dlg.addEventListener('click',e=>{if(e.target.closest('[data-lb-close]'))close();else if(e.target.closest('[data-lb-prev]'))go(idx-1);else if(e.target.closest('[data-lb-next]'))go(idx+1);});
 dlg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(idx-1);}if(e.key==='ArrowRight'){e.preventDefault();go(idx+1);}});
 const prevOverflow=document.documentElement.style.overflow;
 dlg.addEventListener('close',()=>{document.documentElement.style.overflow=prevOverflow;document.body.style.overflow=q('dialog.cm2[open]')?'hidden':'';dlg.remove();if(Math.abs(scrollY-y0)>1)scrollTo({top:y0,behavior:'instant'});});
 paint();dlg.showModal();document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';track.scrollLeft=idx*track.clientWidth;
 requestAnimationFrame(()=>{go(idx,true);if(document.body.dataset.inputMode!=='keyboard')document.activeElement?.blur?.();});
 window.DV2_LB={dlg,get idx(){return idx},items};
}
// Kaynak galeri tetikleyicilerini (kapak, adım, yorum, foto duvarı) yakala; kaynak openGallery çalışmaz.
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-gallery],[data-step-gallery],[data-review-gallery],[data-made-gallery]');if(!t)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(t.hasAttribute('data-review-gallery')){const ph=(w.reviews?.[Number(t.dataset.reviewGallery)]?.photos||[]).map(src=>({src,label:'Yorum fotoğrafı'}));openLightbox(ph,Number(t.dataset.imageIndex)||0);return;}
 if(t.hasAttribute('data-made-gallery')){openLightbox((w.madePhotos||[]).map(m=>({src:m.image,label:'Ben de yaptım'})),Number(t.dataset.madeGallery)||0);return;}
 const items=galleryItems();let start=0;
 if(t.hasAttribute('data-step-gallery')){const src=w.steps?.[Number(t.dataset.stepGallery)]?.images?.[Number(t.dataset.imageIndex)||0];start=Math.max(0,items.findIndex(x=>x.src===src));}
 openLightbox(items,start);
},true);

/* ---------- Pişirme modu (yeniden): tam ekran, odaklı. Kaynak özellikler: web ui.js bindCookmode
   (adım n/N + çubuk, numara + süre, metin, adım görselleri, noktalar, zamanlayıcı + 3× bip + alarm,
   bitince otomatik geç 1,4 sn, sıfırla, önceki/sonraki, bitiş ekranı, ok tuşları/Escape).
   Mobil ek: kaydırma ile geçiş, ekran açık tutma (Wake Lock), adım metninde geçen malzemeler. ---------- */
const cookSteps=r.steps.map((st,i)=>({...st,secs:(parseInt(st.time)||0)*60,images:w.steps?.[i]?.images||[]}));
const ingredientItems=(w.ingredients?.length?w.ingredients:r.ingredients).filter(i=>!i.group).map((item,n)=>{const ing=r.ingredients[n]||item;const name=item.note&&ing.name.endsWith(item.note)?ing.name.slice(0,-item.note.length).trim():ing.name;return {n,name,ing};});
const trLower=t=>String(t).toLocaleLowerCase('tr');
function stepIngredients(text){
 const body=' '+trLower(text);
 return ingredientItems.filter(({name})=>{let stem=trLower(name).split(/\s+/)[0]||'';if(stem.length>4&&/[kptç]$/.test(stem))stem=stem.slice(0,-1);return stem.length>=2&&new RegExp(`[^a-zçğıöşü]${stem.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}`).test(body);});
}
const amountText=({n,ing})=>ing.amount==null?esc(ing.unit||''):`${(ing.amount*scale).toLocaleString('tr',{maximumFractionDigits:2})} ${esc(ing.unit)}`;
function openCookingV2(){
 if(!cookSteps.length)return;
 q('#timerDockClose')?.click();
 const dlg=document.createElement('dialog');dlg.className='cm2';dlg.setAttribute('aria-label','Pişirme modu');
 let idx=0,finished=false,left=0,deadline=0,running=false,tick=null,auto=false,wake=null,startX=null,startY=null;const done=stepDone;
 const fmt=sec=>`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
 dlg.innerHTML=`<header class="cm2-top"><span class="cm2-thumb" style="background-image:url('${esc(r.image)}')" aria-hidden="true"></span><div class="cm2-name" role="heading" aria-level="1">${esc(shortTitle(r))}</div><button type="button" class="cm2-icon" data-cm2-close aria-label="Pişirme modundan çık">${fa('xmark')}</button></header>
  <div class="cm2-progress"><div class="cm2-count"><span class="cm2-count-text" aria-live="polite"></span><span class="cm2-wake">${fa('sun')}<span>Ekran açık kalır</span></span></div><div class="cm2-segs" aria-hidden="true">${cookSteps.map(()=>'<i></i>').join('')}</div></div>
  <div class="cm2-stage" tabindex="-1"><div class="cm2-inner"></div></div>
  <footer class="cm2-bottom"><div class="cm2-dots" role="group" aria-label="Adım seç">${cookSteps.map((_,i)=>`<button type="button" data-cm2-go="${i}" aria-label="${i+1}. adıma geç">${i+1}</button>`).join('')}</div><div class="cm2-nav"><button type="button" class="button secondary" data-cm2-prev>${fa('chevron-left')}<span>Önceki</span></button><button type="button" class="button" data-cm2-next></button></div></footer>`;
 document.body.append(dlg);
 const inner=q('.cm2-inner',dlg),stage=q('.cm2-stage',dlg);
 function beep(){try{const ac=window._cmAC||(window._cmAC=new (window.AudioContext||window.webkitAudioContext)());[0,.35,.7].forEach(t=>{const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.setValueAtTime(.35,ac.currentTime+t);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+t+.28);o.start(ac.currentTime+t);o.stop(ac.currentTime+t+.3);});}catch{}navigator.vibrate?.([200,100,200]);}
 function paintTimer(){const box=q('.cm2-timer',dlg);if(!box)return;q('.cm2-time',box).textContent=fmt(Math.max(0,left));const play=q('[data-cm2-play]',box);play.innerHTML=fa(running?'pause':'play');play.setAttribute('aria-label',running?'Sayacı duraklat':'Sayacı başlat');box.classList.toggle('is-running',running);}
 function stopTimer(){running=false;clearInterval(tick);tick=null;paintTimer();}
 function loadTimer(){stopTimer();left=cookSteps[idx]?.secs||0;q('.cm2-timer',dlg)?.classList.remove('is-alarm');paintTimer();}
 function finishTimer(){stopTimer();beep();const box=q('.cm2-timer',dlg);box?.classList.add('is-alarm');q('.cm2-timer-state',dlg).textContent='Süre doldu';toast('Süre doldu. Adımını kontrol et.');if(auto&&idx<cookSteps.length-1){setTimeout(()=>{if(!dlg.open||finished)return;done.add(idx);paintSteps();idx++;render();},1400);}}
 function toggleTimer(){if(running){left=Math.max(0,Math.ceil((deadline-Date.now())/1000));stopTimer();q('.cm2-timer-state',dlg).textContent='Duraklatıldı';return}if(left<=0)left=cookSteps[idx].secs;if(left<=0)return;q('.cm2-timer',dlg).classList.remove('is-alarm');deadline=Date.now()+left*1000;running=true;q('.cm2-timer-state',dlg).textContent='Çalışıyor';tick=setInterval(()=>{left=Math.max(0,Math.ceil((deadline-Date.now())/1000));paintTimer();if(left<=0)finishTimer();},250);paintTimer();}
 function chrome(){
  const total=cookSteps.length;
  q('.cm2-count-text',dlg).innerHTML=finished?`<b>Tamamlandı</b><span>${total} adım</span>`:`<b>Adım ${idx+1}</b><span>/ ${total}</span>`;
  qa('.cm2-segs i',dlg).forEach((seg,i)=>{seg.className=finished||done.has(i)?'is-done':i===idx?'is-current':'';});
  qa('[data-cm2-go]',dlg).forEach((b,i)=>{const on=!finished&&i===idx;b.setAttribute('aria-current',on?'step':'false');b.classList.toggle('is-done',done.has(i)||finished);b.innerHTML=(done.has(i)||finished)&&!on?fa('check'):String(i+1);});
  const prev=q('[data-cm2-prev]',dlg),next=q('[data-cm2-next]',dlg);prev.disabled=!finished&&idx===0;next.hidden=finished;
  next.innerHTML=idx===total-1?`<span>Bitir</span>${fa('check')}`:`<span>Sonraki adım</span>${fa('chevron-right')}`;
  q('.cm2-dots',dlg).hidden=finished;
 }
 function render(){
  finished=false;const st=cookSteps[idx];const ings=stepIngredients(st.title+' '+st.body);
  inner.innerHTML=`${st.images.length?`<div class="cm2-figures">${st.images.map((im,k)=>`<button type="button" class="cm2-figure" data-step-gallery="${idx}" data-image-index="${k}" aria-label="Adım fotoğrafını büyüt" style="background-image:url('${esc(im)}')"></button>`).join('')}</div>`:''}
   <div class="cm2-step-head"><button type="button" class="cm2-num" data-cm2-done aria-pressed="${done.has(idx)}" aria-label="${done.has(idx)?`${idx+1}. adım tamamlandı; geri almak için dokun`:`${idx+1}. adımı tamamla`}">${done.has(idx)?fa('check'):idx+1}</button>${st.time?`<span class="cm2-step-time">${fa('clock')}${esc(st.time)}</span>`:''}</div>
   <div class="cm2-title" role="heading" aria-level="2">${esc(st.title)}</div>
   <div class="cm2-text">${esc(st.body)}</div>
   ${ings.length?`<div class="cm2-ings"><span class="cm2-ings-label">Bu adımda geçen malzemeler</span><ul>${ings.map(x=>`<li><b>${amountText(x)}</b><span>${esc(x.name)}</span></li>`).join('')}</ul></div>`:''}
   ${st.secs?`<section class="cm2-timer" aria-label="Adım zamanlayıcısı"><output class="cm2-time" aria-live="off">${fmt(st.secs)}</output><span class="cm2-timer-state" aria-live="polite">Hazır</span><div class="cm2-timer-ctrl"><button type="button" class="cm2-round" data-cm2-reset aria-label="Sayacı sıfırla">${fa('rotate-left')}</button><button type="button" class="cm2-play" data-cm2-play aria-label="Sayacı başlat">${fa('play')}</button><span class="cm2-round-spacer" aria-hidden="true"></span></div><label class="cm2-auto"><input type="checkbox" data-cm2-auto ${auto?'checked':''}><span>Bitince otomatik geç</span></label></section>`:''}`;
  prepareChoices(dlg);stage.scrollTop=0;chrome();loadTimer();
 }
 function renderDone(){
  finished=true;stopTimer();cookSteps.forEach((_,i)=>done.add(i));paintSteps();
  inner.innerHTML=`<div class="cm2-done"><span class="cm2-done-icon">${fa('champagne-glasses')}</span><div class="cm2-title" role="heading" aria-level="2">Afiyet olsun, tarifiniz hazır!</div><div class="cm2-text">${esc(r.title)} adım adım tamamlandı. Sofranı kur, keyfini çıkar.</div><div class="cm2-done-actions">${engagementButton('made',true)}<button type="button" class="button secondary" data-cm2-restart>${fa('rotate-left')}<span>Baştan Başla</span></button><button type="button" class="button secondary" data-cm2-close>${fa('xmark')}<span>Kapat</span></button></div></div>`;
  q('[data-recipe-engage]',inner)?.classList.add('button');stage.scrollTop=0;chrome();
 }
 const go=d=>{if(finished){if(d<0)render();return}if(d>0){done.add(idx);paintSteps();if(idx<cookSteps.length-1){idx++;render();}else renderDone();}else if(idx>0){idx--;render();}};
 const close=()=>{stopTimer();wake?.release?.().catch(()=>{});wake=null;dlg.close();};
 dlg.addEventListener('click',e=>{
  if(e.target.closest('[data-cm2-close]')){close();return}
  if(e.target.closest('[data-cm2-prev]'))go(-1);
  if(e.target.closest('[data-cm2-next]'))go(1);
  const jump=e.target.closest('[data-cm2-go]');if(jump){idx=Number(jump.dataset.cm2Go);render();}
  if(e.target.closest('[data-cm2-play]'))toggleTimer();
  if(e.target.closest('[data-cm2-reset]')){loadTimer();q('.cm2-timer-state',dlg).textContent='Hazır';}
  if(e.target.closest('[data-cm2-restart]')){idx=0;done.clear();paintSteps();render();}
  if(e.target.closest('[data-cm2-done]')){toggleStep(idx);const nb=q('.cm2-num',dlg),on=done.has(idx);nb.setAttribute('aria-pressed',on);nb.innerHTML=on?fa('check'):String(idx+1);nb.setAttribute('aria-label',on?`${idx+1}. adım tamamlandı; geri almak için dokun`:`${idx+1}. adımı tamamla`);chrome();}
 });
 dlg.addEventListener('change',e=>{if(e.target.matches('[data-cm2-auto]'))auto=e.target.checked;});
 dlg.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.key==='ArrowRight'){e.preventDefault();go(1);}if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}});
 stage.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;});
 stage.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX,dy=e.clientY-startY;startX=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(dx<0?1:-1);});
 dlg.addEventListener('close',()=>{stopTimer();wake?.release?.().catch(()=>{});document.body.style.overflow='';dlg.remove();q('#startCooking')?.focus({preventScroll:true});});
 render();dlg.showModal();document.body.style.overflow='hidden';
 if(document.body.dataset.inputMode!=='keyboard')document.activeElement?.blur?.();
 const wakeNote=q('.cm2-wake span',dlg);
 // Ekran açık tutma: Wake Lock destekleniyorsa istenir; sonuç kısa durum metniyle bildirilir.
 const wakeBox=q('.cm2-wake',dlg);
 if('wakeLock' in navigator){navigator.wakeLock.request('screen').then(l=>{wake=l;wakeNote.textContent='Ekran açık kalır';wakeBox.title='Wake Lock etkin';}).catch(()=>{wakeNote.textContent='Ekran kilidi açık tutulamadı';wakeBox.title='Tarayıcı Wake Lock iznini vermedi; cihaz ayarını kontrol et.';});}
 else{wakeNote.textContent='Ekran kilidi açık tutulamadı';wakeBox.title='Bu tarayıcı Wake Lock desteklemiyor; cihaz ayarını kontrol et.';}
 window.DV2_COOK={dlg,go,get idx(){return idx},set left(v){left=v;deadline=Date.now()+v*1000;}};
}
window.openCooking=openCookingV2;
const startButton=q('#startCooking');if(startButton)startButton.onclick=openCookingV2;
// Alt çubuğun ekrandan kapladığı alan (yükseklik + alt kenar + safe-area): sayfa sonu boşluğu bunun + --space-24'ü kadar.
const dockReach=()=>{const d=q('.cook-bar');if(!d||!d.getClientRects().length)return;document.body.style.setProperty('--dv2-dock-reach',Math.ceil(innerHeight-d.getBoundingClientRect().top)+'px');};
dockReach();addEventListener('resize',dockReach);document.fonts.ready.then(dockReach);if(q('.cook-bar'))new ResizeObserver(dockReach).observe(q('.cook-bar'));

syncAmountColumn();syncDescription();syncJustify();syncCards();
if(initial&&panes[initial]){if(/^#(adimlar|yorumlar)$/.test(initialHash)){select(initial);document.fonts.ready.then(()=>requestAnimationFrame(()=>{measure();select(initial,{dock:true});}));}else select(initial);}
requestAnimationFrame(()=>{applyTypeRoles();applyProse();syncPhotoReadability();syncDetailHeader();syncJustify();window.DV2_READY=true;});
})();

/* Side menu: the shared component (ortak-menu.css/js), identical on all three screens. The burger sits at the
   far right of the header, the same button and touch area as on the home and list screens. */
(()=>{
  const actions = document.querySelector('.detail-header-actions');
  if (actions && !actions.querySelector('[data-site-menu]')) actions.insertAdjacentHTML('beforeend', '<button class="icon-button" data-site-menu aria-label="Menü"><i class="icon fa-solid fa-bars" aria-hidden="true"></i></button>');
  addEventListener('DOMContentLoaded', () => window.OrtakMenu?.configure({
    active: '',
    links: {home: 'ana-v3.html', recipes: 'liste-v2.html', categories: 'liste-v2.html', cuisines: 'liste-v2.html', ask: 'ana-v3.html#ne-pisirsem', pantry: 'ana-v3.html#dolap', tips: 'ana-v3.html#puf', plate: 'tabaktan-tarif.html?donus=detay-v2.html'}
  }));
})();
