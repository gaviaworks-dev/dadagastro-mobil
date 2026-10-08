(()=>{const H=SET_HOME,q=s=>document.querySelector(s),key=document.body.dataset.edition,cfg=HOME_SETS[key];document.body.classList.add('set3-shapes');const banner=q('.new-banner');banner.className='purpose-banner new-banner y-hero';banner.innerHTML='';
const image=(r,c='')=>`<div class="y-photo ${c}" style="background-image:url('${r.image}')" role="img" aria-label="${esc(H.short(r))}"></div>`;
const search=()=>`<a class="y-search" href="arama.html?donus=${location.pathname.split('/').pop()}">${H.fa('magnifying-glass')}<span>Tarif, şef, video ara</span>${H.fa('arrow-right')}</a>`;
const heading=(label,title)=>`<div class="y-heading"><div class="six-hero-group"><p class="y-first">${label}</p><h1>${title}</h1></div></div>`;
const recipe=(r,label='Sofrana bir öneri')=>`<a class="y-recipe" href="${H.detail(r)}"><span><small>${label} · ${r.minutes} dk</small><strong>${esc(H.short(r))}</strong></span><span class="y-arrow">${H.fa('arrow-right')}</span></a>`;
const scene=(r)=>`<div class="y-surface">${image(r)}<div class="y-shade"></div><div class="y-light"></div></div>`;
window.Y={...H,q,key,cfg,banner,image,search,heading,recipe,scene};})();
