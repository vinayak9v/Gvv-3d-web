import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1920,height:1080} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(5000);
const info = await p.evaluate(()=>{
  const c=document.querySelector('canvas');
  const r=c.getBoundingClientRect();
  return { canvasTop:Math.round(r.top), canvasH:Math.round(r.height), vh:window.innerHeight };
});
console.log(JSON.stringify(info));
await p.evaluate(()=>window.scrollTo(0, 250));
await p.waitForTimeout(800);
await p.screenshot({ path:'big-scrolled.png' });
await b.close(); console.log('DONE');
