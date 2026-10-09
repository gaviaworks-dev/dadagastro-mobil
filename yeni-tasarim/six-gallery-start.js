/* Gallery startup only: never pin scrolling during normal interaction. */
(() => {
  if (window === window.top || new URLSearchParams(location.search).get('gallery') !== '1') return;
  history.scrollRestoration = 'manual';
  let interacted = false;
  for (const event of ['pointerdown', 'wheel', 'touchstart', 'keydown']) {
    window.addEventListener(event, () => { interacted = true; }, {passive:true});
  }
  const top = () => {
    if (interacted) return;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo({top:0, left:0, behavior:'instant'});
  };
  window.addEventListener('pageshow', () => { interacted = false; top(); requestAnimationFrame(top); });
  window.addEventListener('load', () => { top(); document.fonts.ready.then(top); });
})();
