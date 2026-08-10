import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1366,height:768} });
const errs=[];
p.on('pageerror',e=>errs.push('PAGEERR> '+e.message));
await p.goto('http://localhost:3000/robotics',{waitUntil:'load'});
const top = await p.evaluate(()=>{ const v=document.querySelector('video[src="/lab.mp4"]'); const s=v.closest('section'); return s.getBoundingClientRect().top+window.scrollY; });
const vh=768; const span=vh*4; // pin end is +=300% => ~4*vh of scroll
let prev=-1, mono=true, maxT=0;
for(let i=0;i<=10;i++){
  const y=top + (i/10)*span;
  await p.evaluate(yy=>window.scrollTo(0,yy), y);
  await p.waitForTimeout(500);
  const info=await p.evaluate(()=>{const v=document.querySelector('video[src="/lab.mp4"]');return{t:+v.currentTime.toFixed(3),seek:v.seeking};});
  if(info.t+0.001<prev) mono=false;
  prev=info.t; maxT=Math.max(maxT,info.t);
  console.log('step',i,'progress',(i*10)+'%','currentTime',info.t,'seeking',info.seek);
  if(i===2) await p.screenshot({path:'tools/_verifylab/v_mid.png'});
  if(i===10) await p.screenshot({path:'tools/_verifylab/v_end.png'});
}
console.log('MAX_CURRENTTIME',maxT,'of 5.0 | monotonic',mono,'| errs',errs.join('|')||'none');
await b.close();
