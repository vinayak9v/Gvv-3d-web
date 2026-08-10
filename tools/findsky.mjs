import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1100,height:700} });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(2000);
const els = await p.evaluate(()=>{
  const out=[];
  for(const el of document.querySelectorAll('*')){
    const s=getComputedStyle(el);
    const bi=s.backgroundImage;
    if(bi && bi!=='none' && !bi.startsWith('linear') === false ? false : (bi.includes('url') )){
      const r=el.getBoundingClientRect();
      if(r.width>300 && r.height>200) out.push({tag:el.tagName, cls:(el.className||'').toString().slice(0,40), bi:bi.slice(0,70), w:Math.round(r.width), h:Math.round(r.height)});
    }
  }
  // also any img with large size
  for(const img of document.querySelectorAll('img')){
    const r=img.getBoundingClientRect();
    if(r.width>400) out.push({tag:'IMG', src:img.currentSrc.split('/').pop(), w:Math.round(r.width), h:Math.round(r.height)});
  }
  return out;
});
els.forEach(e=>console.log(JSON.stringify(e)));
await b.close();
