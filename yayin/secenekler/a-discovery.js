/* A-only refinements; the other five compositions keep their original runtime. */
(()=>{
if(document.body.dataset.six!=='a')return;
const q=s=>document.querySelector(s), fa=n=>`<i class="icon fa-solid fa-${n}" aria-hidden="true"></i>`;
const back=location.pathname.split('/').pop(), searchURL=`arama.html?donus=${encodeURIComponent(back)}`;
const params=new URLSearchParams(location.search);document.body.dataset.kitchenLayout=params.get('kurgu')==='kart'?'card':'rail';
q('.kitchen-paths')?.remove();q('.kitchen-mark')?.remove();q('.kitchen-search-panel')?.remove();q('.kitchen-data-note')?.remove();
const heroSearch=document.createElement('a');heroSearch.href=searchURL;heroSearch.className='six-search a-global-search six-hero-group';heroSearch.setAttribute('aria-label','Genel aramayı aç');heroSearch.innerHTML=fa('magnifying-glass')+'<span>Tarif, şef, video ara</span>';q('.purpose-title').append(heroSearch);
const topSearch=document.createElement('a');topSearch.href=searchURL;topSearch.className='icon-button a-header-search';topSearch.setAttribute('aria-label','Genel aramayı aç');topSearch.innerHTML=fa('magnifying-glass');topSearch.hidden=true;q('.top-actions').prepend(topSearch);
function headerSearch(){topSearch.hidden=!(q('.topbar').classList.contains('is-solid')&&q('.purpose-banner').getBoundingClientRect().bottom<=q('.topbar').getBoundingClientRect().bottom);}
addEventListener('scroll',headerSearch,{passive:true});addEventListener('resize',headerSearch);
const oldDrawer=openSiteDrawer;openSiteDrawer=function(){oldDrawer();q('.drawer-top').insertAdjacentHTML('afterend',`<a class="drawer-row a-drawer-search" href="${searchURL}">${fa('magnifying-glass')}<span>Tarif, şef, video ara</span></a>`)};
function invitation(){const count=q('[data-kitchen-count]');if(!q('[data-kitchen-ingredient][aria-pressed=true]'))count.textContent='Bir malzeme seç, birlikte başlayalım';headerSearch();}
addEventListener('six:layout',invitation);invitation();
A_CHEFS.mount(q('.six-chefs'),{back,theme:params.get('sef-zemin')==='acik'?'light':'dark'});
window.dispatchEvent(new Event('six:layout'));
})();
