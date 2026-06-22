import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
// iPhone-ish viewport
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const reqs = [];
p.on('request', r => { if (r.url().includes('.glb')) reqs.push(r.url()); });
p.on('pageerror', e => console.log('PAGEERR>', e.message));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(5000);
await p.screenshot({ path:'mobile-hero.png' });
console.log('GLB requests on mobile:', reqs.length, reqs);
// scroll to the cards and tap one to see the teleport on touch
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight*0.16));
await p.waitForTimeout(1200);
const card = p.locator('.card-1');
await card.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
await p.screenshot({ path:'mobile-cards.png' });
await b.close();
console.log('DONE');
