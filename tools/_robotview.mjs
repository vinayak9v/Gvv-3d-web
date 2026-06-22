import { chromium } from 'playwright';
const W = parseInt(process.argv[2]||'390'), H = parseInt(process.argv[3]||'844');
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:W,height:H}, deviceScaleFactor:2, isMobile: W<700, hasTouch: W<700 });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);
// true page position of the video (before any pin transform)
const meta = await p.evaluate(() => {
  const v = document.querySelector('video');
  const r = v.getBoundingClientRect();
  return { absTop: Math.round(r.top + window.scrollY), scrollH: document.body.scrollHeight };
});
const t0 = meta.absTop;
const targets = [t0 + 30, t0 + H*1.0, t0 + H*2.0, t0 + H*2.9];
let i = 0;
for (const y of targets) {
  await p.evaluate((yy)=>window.scrollTo(0, yy), y);
  await p.waitForTimeout(900);
  const ct = await p.evaluate(()=>document.querySelector('video')?.currentTime);
  console.log(`scrollY=${Math.round(y)} currentTime=${ct?.toFixed?.(2)}`);
  await p.screenshot({ path:`robotview-${i}.png` });
  i++;
}
await b.close();
console.log('DONE meta='+JSON.stringify(meta));
