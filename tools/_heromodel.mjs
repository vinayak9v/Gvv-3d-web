import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(20000);
await p.screenshot({ path:'m-hero2.png' });
const lost = await p.evaluate(()=>{ const c=document.querySelector('canvas'); const g=c?.getContext('webgl2')||c?.getContext('webgl'); return g? g.isContextLost(): 'no-gl'; });
// journey cards centered
const jy = await p.evaluate(()=>{ const h=[...document.querySelectorAll('h2')].find(e=>/Our Journey/i.test(e.textContent)); return h? h.getBoundingClientRect().top+window.scrollY : null; });
await p.evaluate(y=>window.scrollTo(0,y-250), jy); await p.waitForTimeout(1500);
await p.screenshot({ path:'m-cards.png' });
console.log('contextLost=',lost);
await b.close(); console.log('DONE');
