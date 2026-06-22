import { chromium } from 'playwright';
const W = parseInt(process.argv[2]||'1280'), H = parseInt(process.argv[3]||'900');
const pre = process.argv[4]||'dh';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:W,height:H} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(5000);
const handle = p.locator('.drag-handle');
await handle.scrollIntoViewIfNeeded();
const box = await handle.boundingBox();
const hx = box.x + box.width/2, hy = box.y + box.height/2;
const drag = async (dx, dy, tag) => {
  await p.mouse.move(hx, hy); await p.mouse.down();
  const steps=24; for(let i=1;i<=steps;i++){ await p.mouse.move(hx+dx*i/steps, hy+dy*i/steps); await p.waitForTimeout(10);}
  await p.mouse.up(); await p.waitForTimeout(1000);
  // scroll back to top so the model is in view for the shot
  await p.evaluate(()=>window.scrollTo(0,0));
  await p.waitForTimeout(300);
  await p.screenshot({ path:`${pre}-${tag}.png` });
};
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(300);
await p.screenshot({ path:`${pre}-rest.png` });
await drag(0, -400, 'up');      // tilt toward clouds (rot_x toward MAX -0.15)
await drag(0, 800, 'down');     // tilt down (rot_x toward MIN -0.85)
await drag(-800, 0, 'left');    // yaw left (rot_y toward MIN)
await drag(1600, 0, 'right');   // yaw right hard (rot_y toward MAX)
await b.close();
console.log('DONE');
