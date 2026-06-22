import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:900} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(4000);
// scroll to absolute bottom in steps to let ScrollTrigger settle
for (let i=0;i<6;i++){ await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(500); }
await p.screenshot({ path:'home-bottom.png' });
// also capture ~85%
await p.evaluate(()=>{ const m=document.body.scrollHeight-window.innerHeight; window.scrollTo(0,m*0.9);});
await p.waitForTimeout(800);
await p.screenshot({ path:'home-90.png' });
const info = await p.evaluate(()=>{
  const find=(t)=>[...document.querySelectorAll('h2,h3')].find(h=>h.textContent.trim().toLowerCase().includes(t));
  const j=find('our journey'); const f=document.querySelector('footer');
  const vis=(el)=>{ if(!el) return 'MISSING'; const r=el.getBoundingClientRect(); return JSON.stringify({top:Math.round(r.top),h:Math.round(r.height),vis:r.height>0}); };
  return { journey:vis(j), footer:vis(f), bodyH:document.body.scrollHeight };
});
console.log(JSON.stringify(info,null,2));
await b.close();
console.log('DONE');
