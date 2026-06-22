import { chromium } from 'playwright';
async function run(label, vp){
  const b = await chromium.launch({ channel:'msedge' });
  const p = await b.newPage(vp);
  await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
  await p.waitForTimeout(5000);
  const vy = await p.evaluate(()=>{ const v=document.querySelector('video'); return v? v.getBoundingClientRect().top+window.scrollY : null; });
  // scroll so the video is in view
  await p.evaluate(yy=>window.scrollTo(0,yy), vy);
  await p.waitForTimeout(500);
  const t1 = await p.evaluate(()=>document.querySelector('video')?.currentTime);
  // do NOT scroll — wait and see if currentTime advances on its own (autoplay) or stays (scrub)
  await p.waitForTimeout(2000);
  const t2 = await p.evaluate(()=>document.querySelector('video')?.currentTime);
  const paused = await p.evaluate(()=>document.querySelector('video')?.paused);
  const scrollH = await p.evaluate(()=>document.body.scrollHeight);
  console.log(`[${label}] videoTop=${Math.round(vy)} currentTime: ${t1?.toFixed(2)} -> ${t2?.toFixed(2)} (advancesWithoutScroll=${(t2-t1)>0.3}) paused=${paused} scrollHeight=${scrollH}`);
  await p.screenshot({ path:`vid-${label}.png` });
  await b.close();
}
await run('mobile', { viewport:{width:412,height:915}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
await run('desktop', { viewport:{width:1400,height:900}, deviceScaleFactor:1 });
console.log('DONE');
