import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(3000);
const docH = await p.evaluate(()=>document.documentElement.scrollHeight);
// scroll through page; at each step sample the average luminance of the viewport
const samples=[];
for(let y=0;y<docH-844;y+=300){
  await p.evaluate(yy=>window.scrollTo(0,yy), y);
  await p.waitForTimeout(250);
  // detect near-black full-viewport via screenshot byte size proxy + check video states
  const vids = await p.evaluate(()=>[...document.querySelectorAll('video')].map(v=>({src:(v.getAttribute('src')||'none').split('/').pop(),rs:v.readyState,seeking:v.seeking,paused:v.paused,ct:+v.currentTime.toFixed(1)})));
  samples.push({y, vids});
}
samples.forEach(s=>console.log('y='+s.y, JSON.stringify(s.vids)));
await b.close();
