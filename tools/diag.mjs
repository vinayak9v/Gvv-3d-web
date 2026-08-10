import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1366,height:768} });
const errs=[], reqs=[];
p.on('pageerror',e=>errs.push('PAGEERR> '+e.message));
p.on('console',m=>{ if(m.type()==='error') errs.push('CONSOLE> '+m.text()); });
p.on('requestfailed',r=>reqs.push('REQFAIL> '+r.url()+' '+(r.failure()?.errorText||'')));
const t0=Date.now();
await p.goto('http://localhost:3000/robotics',{waitUntil:'load'});
console.log('LOAD_EVENT_ms', Date.now()-t0);
await p.waitForTimeout(1500);
// is the document tall / scrollable?
const m = await p.evaluate(()=>({ docH:document.documentElement.scrollHeight, winH:window.innerHeight, bodyOverflow:getComputedStyle(document.body).overflow, htmlOverflow:getComputedStyle(document.documentElement).overflow }));
console.log('GEO', JSON.stringify(m));
// try to scroll
await p.evaluate(()=>window.scrollTo(0,1200)); await p.waitForTimeout(300);
const y1=await p.evaluate(()=>window.scrollY);
await p.mouse.wheel(0,1500); await p.waitForTimeout(400);
const y2=await p.evaluate(()=>window.scrollY);
console.log('SCROLL scrollTo->',y1,' wheel->',y2);
const v=await p.evaluate(()=>{const v=document.querySelector('video');return v?{src:v.currentSrc,ready:v.readyState,net:v.networkState,err:v.error&&v.error.code,dur:v.duration}:null;});
console.log('VIDEO', JSON.stringify(v));
console.log('ERRS', errs.slice(0,8).join(' || ')||'none');
console.log('REQFAILS', reqs.slice(0,5).join(' || ')||'none');
await b.close();
