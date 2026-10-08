/* Shared A chef strip. Records are the existing web home chef dataset. */
window.A_CHEFS={mount(block,{back,theme='dark'}){
 const chefs=WEB.chefs,fa=n=>`<i class="icon fa-solid fa-${n}" aria-hidden="true"></i>`;
 const avatar=c=>`<span class="a-chef-avatar" aria-hidden="true">${esc(c.name.slice(0,1).toLocaleUpperCase('tr'))}</span>`;
 block.classList.add('a-chefs');block.dataset.chefTheme=theme;
 block.innerHTML=`<div class="section-heading-row six-heading"><h2>Şefler</h2><a class="six-see" href="arama.html?tur=sef&donus=${encodeURIComponent(back)}">Tümü ${fa('arrow-right')}</a></div><p class="six-chef-intro">Tariflerinin arkasındaki isimler.</p><div class="a-chef-strip" aria-label="Şefler" tabindex="0">${chefs.map((c,i)=>`<article class="a-chef-item"><button class="a-chef-person" data-a-chef="${i}" aria-label="${esc(c.name)} profili">${avatar(c)}<strong>${esc(c.name)}</strong></button><span class="a-chef-count">${esc(c.count)}</span><button class="a-chef-follow" data-a-chef-follow="${i}" aria-label="${esc(c.name)} takip et">${fa('plus')} Takip Et</button></article>`).join('')}<button class="a-chef-join" data-a-chef-join><span class="a-chef-avatar">${fa('plus')}</span><strong>Sen de Şef Ol</strong><span>Tarifini paylaş,<br>rozetini kazan</span></button></div>`;
 block.addEventListener('click',ev=>{const t=ev.target.closest('[data-a-chef],[data-a-chef-follow],[data-a-chef-join]');if(!t)return;
 if(t.hasAttribute('data-a-chef')){const c=chefs[Number(t.dataset.aChef)];sheet(c.name,`<p>${esc(c.count)}</p><p class="prose">Şef profili önizlemesi.</p><button class="button" data-sheet-close>Kapat</button>`)}
 else if(t.hasAttribute('data-a-chef-follow'))sheet('Şefi takip et','<p class="prose">Takip etmek için giriş yapmalısın. Bu yerel önizlemede gerçek takip işlemi yapılmaz.</p><button class="button" data-sheet-close>Tamam</button>');
 else sheet('Sen de Şef Ol','<p class="prose">Tarifini paylaş, rozetini kazan.</p><p class="prose">Tarif paylaşmak için giriş yapmalısın. Bu bir yerel önizlemedir.</p><button class="button" data-sheet-close>Tamam</button>');
 });
}};
