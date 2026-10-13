/* Independent v3 compositions; working source interactions remain in runtime.js. */
(()=>{
const v=document.body.dataset.variant,isList=page==='tarifler',initialState=params.get('durum');
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
function links(root=document){qa('a[href]',root).forEach(a=>{let h=a.getAttribute('href');if(/^tarif-detay\.html/.test(h))a.href=h.replace('tarif-detay.html',`detay-${v}.html`);else if(/^tarifler\.html/.test(h))a.href=h.replace('tarifler.html',`liste-${v}.html`);else if(/^index\.html/.test(h))a.href=h.replace('index.html',`hero-${v}.html`);else if(/^tabaktan-tarif\.html/.test(h))a.href='../'+h;});}
function fresh(root=document){links(root);hydratePhotos(root);applyProse(root);}
const originalHeader=syncHeader;removeEventListener('scroll',originalHeader);removeEventListener('resize',originalHeader);document.removeEventListener('scroll',originalHeader,true);headerGeometryObserver.disconnect();motion.removeEventListener('change',originalHeader);
syncHeader=function(){originalHeader();const h=q('.topbar');if(!h)return;h.style.setProperty('background-color',isList?'var(--paper)':scrollY>80?'var(--paper)':'transparent','important');h.classList.toggle('study-scrolled',scrollY>80);qa('.header-occluded').forEach(e=>e.classList.remove('header-occluded'));};
addEventListener('scroll',syncHeader,{passive:true});addEventListener('resize',syncHeader);document.fonts.ready.then(syncHeader);
if(isList){
const header=q('.topbar');header.innerHTML=`<a href="hero-${v}.html" class="icon-button" aria-label="Ana sayfa">${icon('back')}</a><h1>Tarifler</h1><button class="icon-button" data-profile-menu aria-label="Profil ve Mutfak Defterim">${icon('user')}</button>`;
const tools=q('.list-tools'),content=q('.list-content');q('.search-box').insertAdjacentHTML('beforeend',`<a class="search-camera icon-button" href="../tabaktan-tarif.html" aria-label="Tabaktan Tarif">${icon('camera')}</a>`);
q('.list-fridge-link').classList.add('study-related');
// Preserve all source filters; move only their trigger and category rail.
const resultbar=q('.result-bar');tools.append(resultbar);tools.append(q('#activeFacets'));tools.append(q('#pantryFilter'));
if(v==='b'){const dock=document.createElement('div');dock.className='thumb-filters';dock.append(q('.chips'),resultbar);document.body.append(dock);}
if(v==='d'){const rail=document.createElement('aside');rail.className='category-index';rail.setAttribute('aria-label','Kategoriler');rail.append(q('.chips'));content.prepend(rail);}
let manual=false;document.addEventListener('click',e=>{if(e.target.closest('[data-view]'))manual=true;},true);
const originalRender=renderResults;
renderResults=function(){originalRender();const target=q('#results');if(!target.querySelector('.recipe-card'))return;
const featured=q('.list-feature',target);if(featured){const url=new URL(q('a',featured).href),r=DATA.recipes.find(r=>r.slug===url.searchParams.get('tarif'));if(r)featured.outerHTML=card(r);}
const cards=qa('.recipe-card',target);cards.forEach(c=>target.append(c));q('.results-grid',target)?.remove();target.classList.toggle('study-manual',manual);target.dataset.layout=manual?listView:v;
if(v==='c'&&!manual&&!query&&!category&&!Object.values(facetState).flat().length){
 target.innerHTML='';const source=filteredRecipes();const groups=[{name:'15–30 dakika',items:source.filter(r=>r.minutes>=15&&r.minutes<30),duration:'15-30'},...['Tavuk Tarifleri','Balık ve Deniz Ürünleri','Et Yemekleri','Sebze Yemekleri'].map(name=>({name,items:source.filter(r=>r.category===name),category:name}))].filter(g=>g.items.length);
 if(groups.length<3){for(const name of [...new Set(source.map(r=>r.category))])if(!groups.some(g=>g.name===name))groups.push({name,items:source.filter(r=>r.category===name),category:name});}
 for(const g of groups){const shelf=document.createElement('section');shelf.className='recipe-shelf';shelf.innerHTML=`<div class="section-heading-row"><h2>${esc(g.name)}</h2><button class="text-link" data-shelf-category="${esc(g.category||'')}" data-shelf-duration="${g.duration||''}" aria-label="${esc(g.name)} tüm tarifler">Tümü ${icon('arrow')}</button></div><div class="shelf-rail">${g.items.map(card).join('')}</div>`;target.append(shelf);}
 q('#pagination').hidden=true;
}else q('#pagination').hidden=false;
fresh(target);};
renderResults();
document.addEventListener('click',e=>{const b=e.target.closest('[data-shelf-category]');if(b){category=b.dataset.shelfCategory;duration=b.dataset.shelfDuration;resultPage=1;renderResults();scrollTo({top:0,behavior:motion.matches?'instant':'smooth'});}});
// Same DOM during loading: no geometry change when photos arrive.
if(initialState==='yukleniyor')loading();if(initialState==='bos'||initialState==='sonuc-yok'){query='eşleşmeyen arama';q('#search').value=query;renderResults();}
let startY=0;addEventListener('touchstart',e=>{startY=scrollY===0?e.touches[0].clientY:0;},{passive:true});addEventListener('touchend',e=>{if(startY&&e.changedTouches[0].clientY-startY>80){loading();setTimeout(()=>{renderResults();toast('Tarifler yenilendi.');},650);}startY=0;},{passive:true});
let hold,held=false;document.addEventListener('pointerdown',e=>{const c=e.target.closest('.recipe-card');if(!c||e.target.closest('button'))return;held=false;hold=setTimeout(()=>{held=true;const a=q('.card-copy',c),slug=new URL(a.href).searchParams.get('tarif');sheet(q('h3',c).textContent,`<div class="action-list"><a href="${esc(a.href)}">${icon('utensils')} Tarife git</a><button data-save="${esc(slug)}">${icon('book')} Kaydet</button><button data-study-share="${esc(a.href)}">${icon('share')} Paylaş</button></div>`);fresh(genericDialog);},500);});['pointerup','pointercancel','pointermove'].forEach(ev=>document.addEventListener(ev,()=>clearTimeout(hold)));document.addEventListener('click',e=>{if(held&&e.target.closest('.recipe-card')){e.preventDefault();held=false;}},true);
}else if(recipe){
const hero=q('.detail-hero'),body=q('#recipeBody'),copy=q('.detail-cover-copy'),facts=q('.recipe-facts'),author=q('.author-row'),desc=q('.description-wrap');
body.insertBefore(copy,facts);copy.classList.add('paper-title');if(!recipe.rating)q('.detail-cover-meta>a',copy)?.remove();
const gallery=q('.hero-gallery-open');gallery.insertAdjacentHTML('beforeend',`<span class="photo-expand">${icon('gallery')} Fotoğraflar</span>`);
const common=[copy,facts,author,desc,q('.sheet-grip')],children=[...body.children].filter(n=>!common.includes(n));
const tabs=document.createElement('div');tabs.className='detail-tabs segmented';tabs.setAttribute('role','tablist');tabs.innerHTML=['Malzemeler','Yapılışı','Yorumlar'].map((t,i)=>`<button role="tab" aria-selected="${i===0}" data-detail-tab="${i}">${t}</button>`).join('');
let panes=[];
if(v==='b'){
const overview=document.createElement('div');overview.className='detail-overview';hero.after(overview);overview.append(copy,facts);body.prepend(tabs);new ResizeObserver(()=>document.body.style.setProperty('--overview-height',overview.getBoundingClientRect().height+'px')).observe(overview);for(let i=0;i<3;i++){const p=document.createElement('section');p.className='detail-pane';p.id='detail-pane-'+i;p.setAttribute('role','tabpanel');p.hidden=i!==0;body.append(p);panes.push(p);}
panes[0].append(author,desc);children.forEach(n=>panes[n.matches('.method-section,.recipe-note,.recipe-engagement-block')?1:n.matches('.review-section,.similar-section,.detail-chef')?2:0].append(n));q('.recipe-metadata').append(author,desc);
}else if(v==='c'||v==='d'){
const ingredient=q('.ingredient-section'),method=q('.method-section');
function fold(node,label,open=false){const d=document.createElement('details');d.className='study-fold';d.open=open;d.innerHTML=`<summary>${label}${icon('down')}</summary>`;node.before(d);d.append(node);return d;}
if(v==='c'){fold(ingredient,`Malzemeler <span>${recipe.ingredients.length}</span>`);method.classList.add('flow-method');desc.after(q('.study-fold'));q('.study-fold').after(method);const information=q('.recipe-metadata');information.append(author,desc);}
else{
const control=document.createElement('div');control.className='recipe-console';control.innerHTML=`<button data-jump="ingredients">${icon('fridge')}<b>Malzemeler</b><small>${recipe.ingredients.length} malzeme</small></button><button data-jump="steps">${icon('play')}<b>Yapılışı</b><small>${recipe.steps.length} adım</small></button><button data-jump="reviews">${icon('star')}<b>Yorumlar</b><small>${recipe.ratingCount||0} değerlendirme</small></button>`;facts.after(control);fold(ingredient,'Malzemeler');fold(method,'Nasıl yapılır?');fold(q('#yorumlar'),'Yorumlar');}
}
if(v==='a'){q('.compact-title').insertAdjacentHTML('beforebegin',`<span class="compact-photo" style="background-image:url('${esc(recipe.image)}')"></span>`);let y;const grip=q('.sheet-grip');grip.setAttribute('role','button');grip.tabIndex=0;grip.setAttribute('aria-label','Tarif içeriğini aç');const expand=()=>body.scrollIntoView({behavior:motion.matches?'instant':'smooth'});grip.onclick=expand;grip.onkeydown=e=>{if(e.key==='Enter')expand();};body.addEventListener('touchstart',e=>y=e.touches[0].clientY,{passive:true});body.addEventListener('touchend',e=>{if(y-e.changedTouches[0].clientY>60&&scrollY<180)expand();},{passive:true});}
function selectTab(i){if(v!=='b')return;panes.forEach((p,n)=>p.hidden=n!==i);qa('[data-detail-tab]').forEach(b=>b.setAttribute('aria-selected',Number(b.dataset.detailTab)===i));fresh(panes[i]);}
document.addEventListener('click',e=>{const t=e.target.closest('[data-detail-tab]');if(t)selectTab(Number(t.dataset.detailTab));const go=e.target.closest('[data-goto-reviews],a[href="#yorumlar"]');if(go){selectTab(2);q('#yorumlar').closest('.study-fold')?.setAttribute('open','');}const jump=e.target.closest('[data-jump]');if(jump){const target=q({ingredients:'.ingredient-section',steps:'#adimlar',reviews:'#yorumlar'}[jump.dataset.jump]);target.closest('.study-fold')?.setAttribute('open','');target.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'start'});}},true);
if(v==='b'){let x=0,y=0;body.addEventListener('touchstart',e=>{x=e.touches[0].clientX;y=e.touches[0].clientY;},{passive:true});body.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x,dy=e.changedTouches[0].clientY-y;if(Math.abs(dx)>70&&Math.abs(dy)<50){const current=panes.findIndex(p=>!p.hidden);selectTab(Math.max(0,Math.min(2,current+(dx<0?1:-1))));}},{passive:true});}
addEventListener('scroll',()=>{document.body.style.setProperty('--cover-shift',Math.min(scrollY*.18,80)+'px');document.body.style.setProperty('--cover-scale',String(1.12-Math.min(scrollY/1600,.12)));},{passive:true});
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-study-share]');if(b){navigator.clipboard?.writeText(b.dataset.studyShare).then(()=>toast('Bağlantı kopyalandı.')).catch(()=>toast('Bağlantı kopyalanamadı.'));}});
fresh();syncHeader();
new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)links(n);}).observe(document.body,{childList:true,subtree:true});
})();
