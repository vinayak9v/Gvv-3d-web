import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1400,height:1000} });
p.on('pageerror', e => console.log('PAGEERR>', e.message));
await p.goto('http://localhost:3000/', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(9000);
const info = await p.evaluate(() => {
  const c = document.querySelector('canvas');
  const img = document.querySelector('img[alt*="floating school"]');
  const r = c ? c.getBoundingClientRect() : null;
  return {
    hasCanvas: !!c,
    canvasY: r ? Math.round(r.y) : null,
    canvasH: r ? Math.round(r.height) : null,
    hasPoster: !!img,
    isDesktopMM: window.matchMedia('(min-width: 768px)').matches,
    bodyH: document.body.scrollHeight,
  };
});
console.log('INFO ' + JSON.stringify(info));
// scroll the banner into view and shoot
await p.evaluate(()=>window.scrollTo(0, 500));
await p.waitForTimeout(1500);
await p.screenshot({ path:'desk-banner.png' });
await b.close();
console.log('DONE');
