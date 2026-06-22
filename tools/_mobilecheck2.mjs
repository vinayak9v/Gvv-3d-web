import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const errs=[];
p.on('pageerror', e=>errs.push('PAGEERR> '+e.message));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(14000);
await p.screenshot({ path:'m-hero.png' }); // model + drag button in first viewport
// Our Journey: scroll to it and screenshot immediately as it enters
const jy = await p.evaluate(()=>{ const h=[...document.querySelectorAll('h2')].find(e=>/Our Journey/i.test(e.textContent)); return h? h.getBoundingClientRect().top+window.scrollY : null; });
if(jy){ await p.evaluate(y=>window.scrollTo(0,y-700), jy); await p.waitForTimeout(400); await p.screenshot({ path:'m-journey-enter.png' }); await p.waitForTimeout(1200); await p.screenshot({ path:'m-journey-settled.png' }); }
// Footer
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1200);
await p.screenshot({ path:'m-footer.png' });
console.log('journeyTop=',jy, errs.join('\n')||'(no page errors)');
await b.close(); console.log('DONE');
