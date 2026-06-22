import { chromium } from 'playwright';
// Capture the school model from the live canvas as a transparent PNG, to use as
// a lightweight mobile poster (so phones don't mount the heavy WebGL Canvas).
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
// wait for the GLB to actually render (spinner gone), then settle
await p.waitForFunction(() => !document.querySelector('.animate-spin'), { timeout: 30000 }).catch(()=>{});
await p.waitForTimeout(6000);
// strip every page background so the transparent canvas captures ONLY the model
await p.addStyleTag({ content: `
  html, body, main, section { background: transparent !important; background-image: none !important; }
  .school-cloud, .wave-divider, nav, header { display: none !important; }
` });
await p.waitForTimeout(800);
const canvas = await p.$('canvas');
const box = await canvas.boundingBox();
// tight-ish crop around the model (it sits in the lower-centre of the canvas)
await p.screenshot({
  path: 'public/school-poster.png',
  omitBackground: true,
  clip: {
    x: box.x + box.width * 0.04,
    y: box.y + box.height * 0.07,
    width: box.width * 0.92,
    height: box.height * 0.84,
  },
});
console.log('poster written, canvas box:', box);
await b.close();
console.log('DONE');
