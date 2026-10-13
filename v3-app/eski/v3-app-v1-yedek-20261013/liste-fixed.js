// Isolated v3 list composition: sticky banner behind a scrolling white panel.
(()=>{
  const main=document.querySelector('.list-editorial');
  const tools=main?.querySelector('.list-tools');
  const content=main?.querySelector('.list-content');
  if(!main||!tools||!content)return;
  const panel=document.createElement('div');
  panel.className='list-panel';
  tools.before(panel);
  panel.append(tools,content);
  document.body.classList.add('list-fixed-screen');

  function localLinks(root=document){
    root.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(/^tarif-detay\.html(?:[?#]|$)/.test(href))a.href=href.replace('tarif-detay.html','detay-b.html');
      else if(/^tarifler\.html(?:[?#]|$)/.test(href))a.href=href.replace('tarifler.html','liste.html');
      else if(/^index\.html(?:[?#]|$)/.test(href))a.href=href.replace('index.html','ana-1.html');
    });
    root.querySelectorAll('form[action="tarifler.html"]').forEach(form=>form.action='liste.html');
  }
  localLinks();

  // The source header uses the moving viewport rect to find the first text.
  // Because this banner is sticky, anchor its geometry to the banner's layout box once.
  const header=document.querySelector('.topbar');
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const originalSync=window.syncHeader;
  let currentBanner=main.querySelector('.list-banner');
  let stableTextTop=0;
  function measureTextTop(){
    const bannerNow=main.querySelector('.list-banner');
    const titleNow=bannerNow?.querySelector('.list-banner-copy h1');
    if(!bannerNow||!titleNow)return 0;
    const br=bannerNow.getBoundingClientRect(),tr=titleNow.getBoundingClientRect();
    return main.getBoundingClientRect().top+scrollY+(tr.top-br.top);
  }
  stableTextTop=measureTextTop();
  if(originalSync){removeEventListener('scroll',originalSync);removeEventListener('resize',originalSync);document.removeEventListener('scroll',originalSync,true);visualViewport?.removeEventListener('scroll',originalSync);motion.removeEventListener('change',originalSync);headerGeometryObserver.disconnect();}
  function syncFixedListHeader(){
    if(!header)return;
    const headerHeight=header.getBoundingClientRect().height;
    const breathing=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-8'))||8;
    const threshold=Math.max(0,stableTextTop-headerHeight-breathing);
    const fade=Math.max(1,Math.min(48,threshold));
    const alpha=threshold<=0?1:reduceMotion.matches?(scrollY>=threshold?1:0):Math.min(1,Math.max(0,scrollY/fade));
    const hex=getComputedStyle(document.documentElement).getPropertyValue('--tomato').trim().replace('#','');
    const rgb=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));
    header.style.setProperty('background-color',`rgba(${rgb.join(',')},${alpha})`,'important');
    header.dataset.alpha=alpha.toFixed(3);header.dataset.threshold=threshold.toFixed(2);header.classList.toggle('is-solid',alpha>=.999);
    const bottom=header.getBoundingClientRect().bottom;
    document.querySelectorAll('.list-banner-copy h1,.list-banner-copy .list-stat-line').forEach(el=>el.classList.toggle('header-occluded',alpha>=.999&&el.getBoundingClientRect().top<bottom+breathing));
    let meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=alpha>=.999?'#'+hex:getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  }
  window.syncHeader=syncFixedListHeader;
  addEventListener('scroll',syncFixedListHeader,{passive:true});addEventListener('resize',syncFixedListHeader);document.addEventListener('scroll',syncFixedListHeader,{passive:true,capture:true});reduceMotion.addEventListener('change',syncFixedListHeader);
  document.fonts.ready.then(()=>{stableTextTop=measureTextTop();syncFixedListHeader();});
  new ResizeObserver(()=>{stableTextTop=measureTextTop();syncFixedListHeader();}).observe(main);
  new MutationObserver(()=>{
    const nextBanner=main.querySelector('.list-banner');
    if(nextBanner!==currentBanner){currentBanner=nextBanner;stableTextTop=measureTextTop();syncFixedListHeader();}
  }).observe(main,{childList:true,subtree:true});
  syncFixedListHeader();
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)localLinks(node)}))).observe(document.body,{childList:true,subtree:true});
})();
