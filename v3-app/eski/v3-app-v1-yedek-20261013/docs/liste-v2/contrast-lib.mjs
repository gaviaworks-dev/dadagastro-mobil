// Ortak ölçüm yardımcıları: ekran görüntüsünden en açık piksel ve WCAG kontrastı.
export async function brightest(page, rect, hideSelector) {
  await page.evaluate(s => document.querySelectorAll(s).forEach(e => e.style.setProperty('visibility', 'hidden', 'important')), hideSelector);
  await page.waitForTimeout(80);
  const buf = await page.screenshot({clip: rect});
  await page.evaluate(s => document.querySelectorAll(s).forEach(e => e.style.removeProperty('visibility')), hideSelector);
  return page.evaluate(async b64 => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    let max = 0, sum = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { const L = .2126 * lin(d[i]) + .7152 * lin(d[i + 1]) + .0722 * lin(d[i + 2]); if (L > max) max = L; sum += L; n++; }
    return {maxL: max, meanL: sum / n, contrastWhite: 1.05 / (max + .05)};
  }, buf.toString('base64'));
}

// Arka plan aralığı: metin gizlenerek bölgedeki en koyu ve en açık piksel (bağıl parlaklık).
export async function luminanceRange(page, rect, hideSelector) {
  await page.evaluate(s => document.querySelectorAll(s).forEach(e => e.style.setProperty('visibility', 'hidden', 'important')), hideSelector);
  await page.waitForTimeout(80);
  const buf = await page.screenshot({clip: rect});
  await page.evaluate(s => document.querySelectorAll(s).forEach(e => e.style.removeProperty('visibility')), hideSelector);
  return page.evaluate(async b64 => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    let min = 1, max = 0;
    for (let i = 0; i < d.length; i += 4) { const L = .2126 * lin(d[i]) + .7152 * lin(d[i + 1]) + .0722 * lin(d[i + 2]); if (L > max) max = L; if (L < min) min = L; }
    return {minL: min, maxL: max};
  }, buf.toString('base64'));
}
// CSS renginden bağıl parlaklık (rgb()/color(srgb …) biçimleri).
export function cssLuminance(color) {
  const n = color.match(/[\d.]+/g).map(Number);
  const [r, g, b] = color.startsWith('color(') ? n.slice(0, 3).map(v => v * 255) : n.slice(0, 3);
  const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
}
export const ratio = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
