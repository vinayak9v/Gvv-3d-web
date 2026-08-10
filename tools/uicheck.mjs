import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
// home desktop — drag button visible w/o scroll + model glow
let p = await b.newPage({ viewport:{width:1366,height:768} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(5500);
const btn = await p.evaluate(()=>{ const el=document.querySelector('.drag-handle'); if(!el) return null; const r=el.getBoundingClientRect(); return {top:Math.round(r.top), inView: r.top>=0 && r.bottom<=innerHeight, vh:innerHeight}; });
console.log('DRAG_BTN_desktop', JSON.stringify(btn));
await p.screenshot({ path:'tools/_ui_home_desk.png' });
await p.close();
// home mobile
p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(5500);
const btnm = await p.evaluate(()=>{ const el=document.querySelector('.drag-handle'); if(!el) return null; const r=el.getBoundingClientRect(); return {top:Math.round(r.top), inView: r.top>=0 && r.bottom<=innerHeight}; });
console.log('DRAG_BTN_mobile', JSON.stringify(btnm));
await p.screenshot({ path:'tools/_ui_home_mob.png' });
await p.close();
console.log('ERRS', errs.slice(0,3).join('|')||'none');
await b.close();
