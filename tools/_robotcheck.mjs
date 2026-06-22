import { chromium } from 'playwright';
const W = parseInt(process.argv[2]||'390'), H = parseInt(process.argv[3]||'844');
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:W,height:H}, deviceScaleFactor:2, isMobile: W<700, hasTouch: W<700 });
p.on('pageerror', e => console.log('PAGEERR>', e.message));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);
// step-scroll down to find the robot video and let the pin engage
for (let y = 0; y <= 4; y++) {
  await p.evaluate((f)=>window.scrollTo(0, document.body.scrollHeight*f), y*0.18 + 0.25);
  await p.waitForTimeout(700);
}
const info = await p.evaluate(() => {
  const v = document.querySelector('video');
  if (!v) return { found:false };
  const r = v.getBoundingClientRect();
  return {
    found:true, src:v.currentSrc, readyState:v.readyState, networkState:v.networkState,
    duration:v.duration, currentTime:v.currentTime, videoW:v.videoWidth, videoH:v.videoHeight,
    rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
    error: v.error ? v.error.code : null,
  };
});
console.log('VIDEO:', JSON.stringify(info, null, 2));
await p.screenshot({ path:'robot-mobile.png' });
await b.close();
console.log('DONE');
