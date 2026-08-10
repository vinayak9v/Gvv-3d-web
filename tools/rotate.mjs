import { chromium } from 'playwright';
const TAG = process.argv[2] || 'cur';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1100,height:760}, deviceScaleFactor:2 });
await p.goto('http://localhost:3000/',{waitUntil:'load'});
await p.waitForTimeout(4500); // let model decode + render
const box = await p.evaluate(()=>{ const h=document.querySelector('.school-cloud')?.parentElement; const r=(h||document.body).getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
const cx = 550, cy = 380;
await p.mouse.move(cx, cy);
await p.mouse.down();
for (let i=5;i<=6;i++){
  await p.mouse.move(cx + i*60, cy, { steps: 6 });
  await p.waitForTimeout(700);
  await p.screenshot({ path:`tools/_rot/${TAG}_${i}.png`, clip:{x:150,y:150,width:800,height:460} });
}
await p.mouse.up();
console.log('ROTATE_DONE', TAG);
await b.close();
