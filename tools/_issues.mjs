import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:412,height:915}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
const all=[];
p.on('console', m=>all.push(`[${m.type()}] ${m.text()}`));
p.on('pageerror', e=>all.push('PAGEERR> '+e.message+(e.stack?('\n   '+e.stack.split('\n').slice(0,3).join('\n   ')):'')));
p.on('requestfailed', r=>all.push('REQFAIL> '+r.url().slice(0,90)+' :: '+(r.failure()?.errorText||'')));
// capture webgl context loss
await p.addInitScript(()=>{
  window.__gl=[];
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(...a){
    const ctx = orig.apply(this,a);
    if(a[0]&&a[0].includes('webgl')){ this.addEventListener('webglcontextlost', e=>{window.__gl.push('CONTEXT_LOST'); }); }
    return ctx;
  };
});
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(12000);
const glLost = await p.evaluate(()=>window.__gl||[]);
const canvasInfo = await p.evaluate(()=>{ const c=document.querySelector('canvas'); if(!c) return 'NO CANVAS'; const g=c.getContext('webgl2')||c.getContext('webgl'); return {w:c.width,h:c.height, lost: g?g.isContextLost():'no-gl'}; });
console.log('=== CONSOLE / ERRORS ===');
console.log(all.join('\n'));
console.log('=== GL context lost events:', JSON.stringify(glLost));
console.log('=== canvas:', JSON.stringify(canvasInfo));
await b.close(); console.log('DONE');
