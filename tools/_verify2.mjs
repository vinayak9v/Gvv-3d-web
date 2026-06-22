import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:412,height:915}, deviceScaleFactor:2.6, isMobile:true, hasTouch:true });
const errs=[];
p.on('pageerror', e=>errs.push('PAGEERR> '+e.message));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(9000);
await p.screenshot({ path:'v-hero.png' });   // model quality
// Smoothly scroll down to Our Journey like a user, capture as we arrive
const jy = await p.evaluate(()=>{ const h=[...document.querySelectorAll('h2')].find(e=>/Our Journey/i.test(e.textContent)); return h? h.getBoundingClientRect().top+window.scrollY : null; });
// step scroll to mimic real scrolling
for (let y=0; y<=jy+200; y+=600){ await p.evaluate(yy=>window.scrollTo(0,yy), y); await p.waitForTimeout(180); }
await p.evaluate(yy=>window.scrollTo(0,yy), jy-150); await p.waitForTimeout(900);
await p.screenshot({ path:'v-journey.png' });
const cardOpacity = await p.evaluate(()=>{ const c=document.querySelector('.journey-card'); return c? getComputedStyle(c).opacity : 'no-card'; });
console.log('journeyTop=',jy,'firstCardOpacity=',cardOpacity);
console.log(errs.join('\n')||'(no page errors)');
await b.close(); console.log('DONE');
