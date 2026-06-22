import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:900} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(4000);
const probe = async (frac) => {
  await p.evaluate((f)=>{ const m=document.body.scrollHeight-window.innerHeight; window.scrollTo(0, f>=1? document.body.scrollHeight : m*f); }, frac);
  await p.waitForTimeout(700);
  return p.evaluate(()=>{
    const v=[...document.querySelectorAll('video')].find(v=>v.currentSrc.includes('robot_assembly'));
    const sec=v?.closest('section');
    const cs=sec?getComputedStyle(sec):null;
    const sp=sec?.parentElement; // pin-spacer
    const r=sec?.getBoundingClientRect();
    return {
      scrollY: Math.round(window.scrollY),
      maxScroll: document.body.scrollHeight-window.innerHeight,
      secPos: cs?.position, secZ: cs?.zIndex,
      secTop: r?Math.round(r.top):null, secH:r?Math.round(r.height):null,
      spacerClass: sp?.className?.slice(0,40), spacerPos: sp?getComputedStyle(sp).position:null,
    };
  });
};
for (const f of [0.5, 0.75, 0.95, 1]) { console.log('frac',f, JSON.stringify(await probe(f))); }
await b.close();
console.log('DONE');
