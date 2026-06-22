import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:412,height:915}, deviceScaleFactor:3, isMobile:true, hasTouch:true });
let crashed=false; const log=[];
p.on('crash', ()=>{ crashed=true; log.push('PAGE CRASHED'); });
p.on('pageerror', e=>log.push('PAGEERR> '+e.message));
p.on('console', m=>{ if(['error','warning'].includes(m.type()) && /video|decode|webgl|context|memory|GL_|out of/i.test(m.text())) log.push('['+m.type()+'] '+m.text().slice(0,120)); });
await p.addInitScript(()=>{ window.__lost=0; const o=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(...a){const c=o.apply(this,a); if(String(a[0]).includes('webgl')) this.addEventListener('webglcontextlost',()=>window.__lost++); return c;};});
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(6000);
// find robot video section and scroll through it slowly (like a user)
const vy = await p.evaluate(()=>{ const v=document.querySelector('video'); return v? v.getBoundingClientRect().top+window.scrollY : null; });
log.push('videoTop='+vy);
try{
  for (let y=Math.max(0,vy-800); y<=vy+2600; y+=120){
    await p.evaluate(yy=>window.scrollTo(0,yy), y);
    await p.waitForTimeout(120);
    if (crashed) break;
  }
}catch(e){ log.push('SCROLL ERR '+e.message); }
await p.waitForTimeout(1000);
const lost = await p.evaluate(()=>window.__lost).catch(()=>'(page gone)');
console.log(log.join('\n'));
console.log('contextLostCount=',lost,'crashed=',crashed);
await b.close(); console.log('DONE');
