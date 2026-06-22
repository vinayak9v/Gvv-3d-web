import { chromium } from 'playwright';
const W = parseInt(process.argv[2]||'1280'), H = parseInt(process.argv[3]||'900');
const pre = process.argv[4]||'drag';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:W,height:H} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(5000);
// center of model area (hero). Drag from center.
const cx = W*0.5, cy = H*0.42;
const drag = async (dx, dy, tag) => {
  await p.mouse.move(cx, cy); await p.mouse.down();
  const steps=20; for(let i=1;i<=steps;i++){ await p.mouse.move(cx+dx*i/steps, cy+dy*i/steps); await p.waitForTimeout(12);} 
  await p.mouse.up(); await p.waitForTimeout(900);
  await p.screenshot({ path:`${pre}-${tag}.png` });
  await p.waitForTimeout(100);
};
await p.screenshot({ path:`${pre}-rest.png` });
await drag(0, -260, 'up');     // tilt up -> toward clouds?
await drag(0, 520, 'down');    // tilt down
await drag(700, 0, 'right');   // spin horizontally a lot
await drag(700, 0, 'right2');  // spin more (unclamped)
await b.close();
console.log('DONE');
