import { chromium } from 'playwright';
const W=parseInt(process.argv[2]||'390'), H=parseInt(process.argv[3]||'844');
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:W,height:H}, deviceScaleFactor:2, isMobile:W<700, hasTouch:W<700 });
const msgs=[];
p.on('console', m=>{ if(['error','warning'].includes(m.type())) msgs.push(`[${m.type()}] ${m.text()}`); });
p.on('pageerror', e=>msgs.push('PAGEERR> '+e.message));
p.on('requestfailed', r=>msgs.push('REQFAIL> '+r.url()+' :: '+(r.failure()?.errorText||'')));
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(6000);
const info = await p.evaluate(()=>{
  const c=document.querySelector('canvas');
  let gl=null, lost=null;
  if(c){ gl = c.getContext('webgl2')||c.getContext('webgl'); lost = gl? gl.isContextLost(): 'no-gl'; }
  return { hasCanvas: !!c, canvasW: c?.width, canvasH: c?.height, contextLost: lost };
});
await p.screenshot({ path:'mobile-model-top.png' });
console.log('INFO', JSON.stringify(info));
console.log(msgs.slice(-25).join('\n')||'(no errors)');
await b.close();
console.log('DONE');
