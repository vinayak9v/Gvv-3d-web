import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(13000);
const box = await p.evaluate(()=>{ const c=document.querySelector('canvas'); const r=c.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
await p.screenshot({ path:'mdrag-before.png' });
// horizontal swipe across the model (touch)
const cy = box.y + box.h/2, x0 = box.x + box.w*0.2, x1 = box.x + box.w*0.85;
await p.touchscreen.tap(x0, cy).catch(()=>{});
// use pointer drag sequence
await p.mouse.move(x0, cy); await p.mouse.down();
for (let i=1;i<=10;i++){ await p.mouse.move(x0+(x1-x0)*i/10, cy); await p.waitForTimeout(20); }
await p.mouse.up();
await p.waitForTimeout(1200);
await p.screenshot({ path:'mdrag-after.png' });
await b.close();
console.log('DONE box='+JSON.stringify(box));
