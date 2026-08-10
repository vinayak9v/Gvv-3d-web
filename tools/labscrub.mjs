import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1366,height:768} });
await p.goto('http://localhost:3000/robotics',{waitUntil:'load'});
await p.waitForTimeout(1500);
const top = await p.evaluate(()=>{ const v=document.querySelector('video'); const s=v.closest('section'); return s.getBoundingClientRect().top+window.scrollY; });
let times=[], srcSeen='NONE';
for(let i=0;i<=10;i++){
  await p.evaluate(y=>window.scrollTo(0,y), top + (i/10)*768*4);
  await p.waitForTimeout(450);
  const r=await p.evaluate(()=>{const v=document.querySelector('video');return{t:v.currentTime?+v.currentTime.toFixed(2):0,src:v.getAttribute('src')||'NONE',seek:v.seeking};});
  if(r.src!=='NONE') srcSeen=r.src;
  times.push(r.t);
}
const max=Math.max(...times);
console.log('SRC_loaded_on_scroll', srcSeen);
console.log('CURRENTTIME_ramp', times.join(','));
console.log('MAX', max, 'reaches_end', max>=4.9);
await b.close();
