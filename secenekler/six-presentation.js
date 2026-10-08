/* Scale the complete device only; its browsing viewport stays 390 × 844. */
(() => {
  const resize = new ResizeObserver(entries => {
    for (const {target, contentRect} of entries) {
      target.style.setProperty('--phone-scale', Math.min(1, contentRect.width / 390));
    }
  });
  document.querySelectorAll('.phone-stage').forEach(stage => resize.observe(stage));
})();
