/* Six distinctly composed, data-led home hero directions for the v3 study. */
(() => {
  const text = (ctx, value) => (ctx.esc || (v => String(v ?? '')))(value);
  const ico = (ctx, name) => (ctx.icon || (() => ''))(name);
  const photo = (ctx, url, cls = '') => (ctx.photo || (() => ''))(url || '', cls);
  const title = r => String(r?.title || '').split('|')[0].trim();
  const recipeHref = (ctx, r) => r ? (ctx.detail || (() => '#'))(r) : '#';
  const safeList = ctx => Array.isArray(ctx.recipes) ? ctx.recipes.filter(r => r && r.title && r.image) : [];
  const search = ctx => ctx.searchHTML ? `<div class="six-hero-search">${ctx.searchHTML}</div>` : '';
  const recipeLink = (ctx, r, cls = '') => `<a class="${cls}" href="${text(ctx, recipeHref(ctx, r))}" aria-label="${text(ctx, title(r))} tarifini aç">${photo(ctx, r.image, 'six-photo')}</a>`;
  const meta = (ctx, r) => `<span>${ico(ctx, 'clock')} ${text(ctx, r.minutes ? `${r.minutes} dk` : 'Tarif')}</span>${r.rating ? `<span>${ico(ctx, 'star')} ${text(ctx, String(r.rating).replace('.', ','))}</span>` : ''}`;
  const heroPhoto = (ctx, r, cls = '') => photo(ctx, r?.image, `six-photo ${cls}`);
  const recipesFor = ctx => safeList(ctx);
  const getDay = ctx => {
    if (ctx.day && typeof ctx.day === 'object' && ctx.day.title) return ctx.day;
    return recipesFor(ctx)[0] || null;
  };
  const mealNow = () => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 11 ? 'kahvaltı' : hour < 17 ? 'öğle' : 'akşam';
  };
  const mealNames = value => (Array.isArray(value) ? value : [value]).filter(Boolean).map(v => String(v).toLocaleLowerCase('tr-TR'));
  const mealKey=s=>String(s).toLocaleLowerCase('tr-TR').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ç','c').replaceAll('ö','o').replaceAll('ü','u');
  const fitsMeal = (ctx,r,meal) => mealNames(ctx.mealFor?.(r)).some(v => mealKey(v).includes(mealKey(meal)));
  const ingredientChoices = ['Tavuk', 'Patates', 'Yumurta', 'Limon'];

  function cinema(ctx) {
    const r = getDay(ctx), recs = recipesFor(ctx);
    const scene = r ? `<a class="six-cinema-image" data-six-cinema-link href="${text(ctx, recipeHref(ctx, r))}" aria-label="${text(ctx, title(r))} tarifini aç">${heroPhoto(ctx, r, 'six-photo--cinema')}<span class="six-image-scrim"></span><span class="six-cinema-copy six-hero-group"><span class="six-overline" data-six-cinema-label>Günün Tarifi</span><strong data-six-cinema-title>${text(ctx, title(r))}</strong><span class="six-cinema-meta" data-six-cinema-meta>${meta(ctx, r)}</span><span class="six-round-arrow" aria-hidden="true">${ico(ctx, 'arrow')}</span></span></a>` : '';
    return `<div class="six-hero-inner six-cinema">${scene}<div class="six-cinema-tool six-hero-group"><div><span class="six-overline">Malzemeden başla</span><h1>Ne pişirsem?</h1></div><div class="six-ingredient-row" role="group" aria-label="Malzeme seç">${ingredientChoices.map(n => `<button class="six-ingredient" type="button" data-six-ingredient="${text(ctx,n)}" aria-pressed="false">${ico(ctx, 'plus')}<span>${text(ctx,n)}</span></button>`).join('')}</div><div class="six-match" aria-live="polite"><span>Bir malzeme seç, eşleşen tarifleri gör</span>${recs.length ? `<a href="${text(ctx, recipeHref(ctx,r || recs[0]))}" data-six-match-link aria-label="Günün tarifini aç">${ico(ctx,'arrow')}</a>` : ''}</div>${search(ctx)}</div></div>`;
  }

  function videoFirst(ctx) {
    const v = (ctx.videos || [])[0], r = getDay(ctx);
    if (!v) return `<div class="six-hero-inner six-video-first">${r ? recipeLink(ctx,r,'six-video-fallback') : ''}<p class="six-overline">Tarifler</p><h1>Ne pişirsem?</h1>${search(ctx)}</div>`;
    return `<div class="six-hero-inner six-video-first"><button class="six-video-feature" type="button" data-six-video="0" aria-label="${text(ctx, `Videoyu oynat: ${v.title}`)}">${heroPhoto(ctx, {image:v.image}, 'six-photo--video')}<span class="six-video-shade"></span><span class="six-video-play">${ico(ctx,'play')}</span><span class="six-video-time">${text(ctx,v.time || '')}</span><span class="six-video-copy six-hero-group"><span class="six-overline">Video Mutfağı</span><strong>${text(ctx,v.title)}</strong><small>${text(ctx,v.views || '')} izlenme</small></span></button>${search(ctx)}</div>`;
  }

  function dayDeck(ctx) {
    const list = recipesFor(ctx), meal = mealNow();
    const candidates = list.filter(r=>fitsMeal(ctx,r,meal));
    const current = candidates[0] || null;
    const deck = [...candidates, ...list.filter(r => !candidates.includes(r))].slice(0, 5);
    return `<div class="six-hero-inner six-day-deck"><div class="six-day-intro six-hero-group"><span class="six-overline">${text(ctx, new Intl.DateTimeFormat('tr-TR',{weekday:'long'}).format(new Date()))} · Şimdi</span><h1>Bugün sofrada</h1><p>${current ? `${text(ctx,meal[0].toLocaleUpperCase('tr-TR')+meal.slice(1))} için uygun tarifler` : 'Tarif kapaklarında yana kaydır.'}</p></div><div class="six-day-rail" data-six-day-rail>${deck.map((r,i)=>`<a class="six-day-card ${i===0?'is-current':''}" href="${text(ctx,recipeHref(ctx,r))}" aria-label="${text(ctx,title(r))} tarifini aç"><span class="six-day-photo">${heroPhoto(ctx,r,'six-photo--day')}</span><span class="six-day-copy six-hero-group"><span class="six-day-label">${i===0&&current?`${text(ctx,meal[0].toLocaleUpperCase('tr-TR')+meal.slice(1))} için`:text(ctx,r.category || 'Tarif')}</span><strong>${text(ctx,title(r))}</strong><span class="six-day-meta">${meta(ctx,r)}</span></span></a>`).join('')}</div><div class="six-day-foot"><span>Kaydırarak keşfet</span><span class="six-day-progress" aria-hidden="true"><i></i></span></div>${search(ctx)}</div>`;
  }

  function discovery(ctx) {
    const list = recipesFor(ctx), categories = [...new Set(list.map(r=>r.category).filter(Boolean))].slice(0,4);
    const selected = categories[0] || '';
    const picks = list.filter(r=>r.category===selected).slice(0,3);
    return `<div class="six-hero-inner six-discovery"><div class="six-discovery-head six-hero-group"><span class="six-overline">Tarif keşfi</span><h1>Canın ne çekiyor?</h1><div class="six-discovery-categories" role="group" aria-label="Tarif kategorisi">${categories.map((c,i)=>`<button class="six-discovery-category" type="button" data-six-category="${text(ctx,c)}" aria-pressed="${i===0}">${text(ctx,c)}</button>`).join('')}</div></div><div class="six-discovery-board is-count-${picks.length}" data-six-discovery-board>${discoveryTiles(ctx,picks)}</div><div class="six-discovery-note"><span>${ico(ctx,'hand-pointer')} Kategori seç, kapaklar değişsin</span></div>${search(ctx)}</div>`;
  }

  function discoveryTiles(ctx,picks){
    return picks.length ? picks.map((r,i)=>`<a class="six-discovery-tile six-discovery-tile--${i+1}" href="${text(ctx,recipeHref(ctx,r))}" aria-label="${text(ctx,title(r))} tarifini aç">${heroPhoto(ctx,r,'six-photo--tile')}<span class="six-discovery-shade"></span><span class="six-discovery-copy six-hero-group"><span class="six-discovery-tag">${text(ctx,r.category || 'Tarif')}</span><strong>${text(ctx,title(r))}</strong></span></a>`).join('') : `<div class="six-discovery-empty">Bu kategoride gösterilecek tarif yok.</div>`;
  }

  function stories(ctx) {
    const list = recipesFor(ctx).slice(0, 4);
    return `<div class="six-hero-inner six-stories"><div class="six-stories-head six-hero-group"><div><span class="six-overline">Bugün için seçtik</span><h1>Bir kapağı aç</h1></div><span class="six-story-count">${text(ctx, list.length)} tarif</span></div><div class="six-story-rail">${list.map((r,i)=>`<article class="six-story" data-six-story-card><button class="six-story-cover" type="button" data-six-story="${i}" aria-expanded="false" aria-label="${text(ctx,title(r))} hikayesini aç">${heroPhoto(ctx,r,'six-photo--story')}<span class="six-story-index">0${i+1}</span><span class="six-story-open">${ico(ctx,'plus')}</span><span class="six-story-copy six-hero-group"><strong>${text(ctx,r.category || 'Tarif')}</strong></span></button><div class="six-story-reveal" hidden><h2>${text(ctx,title(r))}</h2><div class="six-story-meta">${meta(ctx,r)}</div><a href="${text(ctx,recipeHref(ctx,r))}">Tarifi aç ${ico(ctx,'arrow')}</a></div></article>`).join('')}</div><p class="six-story-hint">Kapaklara dokun, tarif ayrıntılarını gör.</p>${search(ctx)}</div>`;
  }

  function decisionTable(ctx) {
    const list = recipesFor(ctx);
    const first = list[0] || null;
    return `<div class="six-hero-inner six-decision"><div class="six-decision-controls six-hero-group"><div class="six-decision-top"><span class="six-overline">Ne Pişirsem</span><span class="six-decision-mark">${ico(ctx,'sliders')}</span></div><h1>Ne kadar vaktin var?</h1><p>Bir süre seç; tarifler gerçek pişirme süresine göre daralır.</p><div class="six-time-choices" role="group" aria-label="Pişirme süresi filtresi"><button class="six-time-choice" type="button" data-six-time="15" aria-pressed="false">15 dk</button><button class="six-time-choice" type="button" data-six-time="30" aria-pressed="false">30 dk</button><button class="six-time-choice" type="button" data-six-time="all" aria-pressed="true">Fark etmez</button></div></div><div class="six-decision-result" data-six-result aria-live="polite">${first ? `<a class="six-decision-recipe" href="${text(ctx,recipeHref(ctx,first))}"><span class="six-decision-photo">${heroPhoto(ctx,first,'six-photo--decision')}</span><span class="six-decision-recipe-copy"><span class="six-overline">${text(ctx,first.minutes ? `${first.minutes} dk · ${first.category || 'Tarif'}` : 'Tarif önerisi')}</span><strong>${text(ctx,title(first))}</strong><span>Tarifi aç ${ico(ctx,'arrow')}</span></span></a>` : `<p>Bu seçimde gösterilecek tarif yok.</p>`}</div>${search(ctx)}</div>`;
  }

  const renderers = { a: cinema, b: videoFirst, c: dayDeck, d: discovery, e: stories, f: decisionTable };
  function backdropFor(mode, ctx) {
    const list=recipesFor(ctx), meal=mealNow();
    const r = mode==='a' ? getDay(ctx) : mode==='c' ? (list.find(x=>fitsMeal(ctx,x,meal))||list[0]) : mode==='d' ? list.find(x=>x.category===list.find(y=>y.category)?.category) : list[0];
    const url = mode === 'b' ? (ctx.videos || [])[0]?.image : r?.image;
    return url ? `<div class="six-hero-backdrop" aria-hidden="true">${photo(ctx,url,'six-photo six-photo--backdrop')}<span></span></div>` : '';
  }

  function bind(mode, ctx) {
    const root = document.querySelector(`.six-hero.hero-${mode}`);
    if (!root) return;
    const recipes = recipesFor(ctx);
    const normalize = s => String(s || '').toLocaleLowerCase('tr-TR');
    const detail = r => text(ctx, recipeHref(ctx,r));
    const layoutChanged = () => window.dispatchEvent(new Event('six:layout'));
    if (mode === 'a') {
      const chosen = new Set();
      const dayRecipe = getDay(ctx);
      const paint = () => {
        const matches = chosen.size ? recipes.filter(r => [...chosen].every(term => (r.ingredients || []).some(i => normalize(i.name).includes(normalize(term))))) : recipes;
        const current = chosen.size ? matches[0] || null : dayRecipe;
        root.querySelectorAll('[data-six-ingredient]').forEach(b => {
          const active = chosen.has(b.dataset.sixIngredient);
          b.setAttribute('aria-pressed', String(active));
          const icon = b.querySelector('.icon'); if (icon) icon.className = `icon fa-solid fa-${active ? 'check' : 'plus'}`;
        });
        const note = root.querySelector('.six-match > span');
        if (note) note.textContent = chosen.size ? `${matches.length} eşleşme · örnek veri` : 'Bir malzeme seç, eşleşen tarifleri gör';
        const scene=root.querySelector('[data-six-cinema-link]');
        const image=scene?.querySelector('.six-photo');
        const sceneTitle=root.querySelector('[data-six-cinema-title]');
        const sceneLabel=root.querySelector('[data-six-cinema-label]');
        const sceneMeta=root.querySelector('[data-six-cinema-meta]');
        if (scene && image && sceneTitle && sceneLabel && sceneMeta) {
          scene.classList.toggle('is-empty',!current);
          image.style.backgroundImage=current?`url("${current.image}")`:'none';
          image.setAttribute('aria-label',current?title(current):'Seçilen malzemelerle eşleşme bulunamadı');
          if(current) image.removeAttribute('aria-hidden'); else image.setAttribute('aria-hidden','true');
          sceneTitle.textContent=current?title(current):'Bu malzemelerle tarif bulunamadı';
          sceneLabel.textContent=chosen.size?'Bu malzemelerle':'Günün Tarifi';
          sceneMeta.innerHTML=current?meta(ctx,current):'';
          scene.href=current?detail(current):'#';
          scene.setAttribute('aria-label',current?`${title(current)} tarifini aç`:'Bu malzemelerle tarif bulunamadı');
          scene.style.pointerEvents=current?'':'none';
          scene.tabIndex=current?0:-1;
        }
        const backdrop=root.querySelector('.six-hero-backdrop .photo');
        if(backdrop) backdrop.style.backgroundImage=current?`url("${current.image}")`:'none';
        const link = root.querySelector('[data-six-match-link]');
        if (link) { link.hidden = !current; if (current) { link.href = detail(current); link.setAttribute('aria-label', `${title(current)} tarifini aç`); } }
        layoutChanged();
      };
      root.addEventListener('click', e => { const b=e.target.closest('[data-six-ingredient]'); if (!b) return; const n=b.dataset.sixIngredient; chosen.has(n)?chosen.delete(n):chosen.add(n); paint(); });
    }
    if (mode === 'b') root.addEventListener('click', e => { const b=e.target.closest('[data-six-video]'); if(b) ctx.openVideo?.(Number(b.dataset.sixVideo)); });
    if (mode === 'c') {
      const rail=root.querySelector('[data-six-day-rail]'), marker=root.querySelector('.six-day-progress i');
      if (rail && marker) rail.addEventListener('scroll',()=>{
        const max=rail.scrollWidth-rail.clientWidth, pct=max>0?Math.min(1,Math.max(0,rail.scrollLeft/max)):0;
        marker.style.transform=`translateX(${pct*316.6667}%)`;
      },{passive:true});
    }
    if (mode === 'd') root.addEventListener('click',e=>{
      const b=e.target.closest('[data-six-category]'); if(!b) return;
      const category=b.dataset.sixCategory;
      root.querySelectorAll('[data-six-category]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const board=root.querySelector('[data-six-discovery-board]');
      if(!board) return;
      const picks=recipes.filter(r=>r.category===category).slice(0,3);
      board.innerHTML=discoveryTiles(ctx,picks);
      board.className=`six-discovery-board is-focused is-count-${picks.length}`;
      const backdrop=root.querySelector('.six-hero-backdrop .photo'); if(backdrop&&picks[0]) backdrop.style.backgroundImage=`url("${picks[0].image}")`;
      layoutChanged();
    });
    if (mode === 'e') root.addEventListener('click', e => {
      const b=e.target.closest('[data-six-story]'); if (!b) return;
      const card=b.closest('[data-six-story-card]'), reveal=card.querySelector('.six-story-reveal'), was=b.getAttribute('aria-expanded')==='true';
      root.querySelectorAll('[data-six-story]').forEach(x=>{x.setAttribute('aria-expanded','false');x.closest('[data-six-story-card]').querySelector('.six-story-reveal').hidden=true;});
      if (!was) { b.setAttribute('aria-expanded','true'); reveal.hidden=false; }
      const storyRecipe=recipes[Number(b.dataset.sixStory)];
      const backdrop=root.querySelector('.six-hero-backdrop .photo');
      if(backdrop&&storyRecipe) backdrop.style.backgroundImage=`url("${(was?recipes[0]:storyRecipe).image}")`;
      layoutChanged();
    });
    if (mode === 'f') root.addEventListener('click', e => {
      const b=e.target.closest('[data-six-time]'); if(!b) return;
      const limit=b.dataset.sixTime==='all'?Infinity:Number(b.dataset.sixTime);
      root.querySelectorAll('[data-six-time]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const match=recipes.filter(r=>limit===Infinity || (Number.isFinite(Number(r.minutes)) && Number(r.minutes)<=limit));
      const target=root.querySelector('[data-six-result]');
      if (!target) return;
      target.innerHTML=match[0]?`<a class="six-decision-recipe" href="${detail(match[0])}"><span class="six-decision-photo">${photo(ctx,match[0].image,'six-photo six-photo--decision')}</span><span class="six-decision-recipe-copy"><span class="six-overline">${text(ctx,match[0].minutes ? `${match[0].minutes} dk · ${match[0].category || 'Tarif'}` : 'Tarif önerisi')}</span><strong>${text(ctx,title(match[0]))}</strong><span>${match.length} tarif · örnek veri ${ico(ctx,'arrow')}</span></span></a>`:`<div class="six-decision-empty"><strong>Bu sürede tarif bulunamadı.</strong><span>Daha uzun bir süre seç.</span></div>`;
      const backdrop=root.querySelector('.six-hero-backdrop .photo'); if(backdrop&&match[0]) backdrop.style.backgroundImage=`url("${match[0].image}")`;
      layoutChanged();
    });
  }

  window.SIX_HERO = {
    render(mode, ctx) { const fn=renderers[mode]; return fn ? `${backdropFor(mode,ctx)}${fn(ctx)}` : ''; },
    bind(mode, ctx) { if (renderers[mode]) bind(mode, ctx); }
  };
})();
