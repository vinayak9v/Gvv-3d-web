import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:412,height:915}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
const errs=[];
p.on('pageerror', e=>errs.push('PAGEERR> '+e.message));
p.on('crash', ()=>errs.push('PAGE CRASHED'));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(6000);
const c0 = await p.evaluate(()=>document.querySelectorAll('canvas').length);
// scroll down to robot video, scrubbing through it
const vy = await p.evaluate(()=>{ const v=document.querySelector('video'); return v? v.getBoundingClientRect().top+window.scrollY : 0; });
for (let y=0; y<=vy+1500; y+=200){ await p.evaluate(yy=>window.scrollTo(0,yy), y); await p.waitForTimeout(120); }
await p.waitForTimeout(800);
const cAtVideo = await p.evaluate(()=>document.querySelectorAll('canvas').length);
const ctAtVideo = await p.evaluate(()=>document.querySelector('video')?.currentTime?.toFixed(2));
// scroll back up to hero -> canvas should remount
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(4000);
const cBack = await p.evaluate(()=>document.querySelectorAll('canvas').length);
await p.screenshot({ path:'herofree-back.png' });
console.log('canvasCount: initial='+c0+' atVideo='+cAtVideo+' (0 = hero unmounted/freed) backAtTop='+cBack);
console.log('robot currentTime while scrolling near video:', ctAtVideo);
console.log(errs.join('\n')||'(no errors/crash)');
await b.close(); console.log('DONE');
