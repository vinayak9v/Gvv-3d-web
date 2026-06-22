import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1400,height:900}, deviceScaleFactor:1 });
const errs=[];
p.on('pageerror', e=>errs.push('PAGEERR> '+e.message));
p.on('console', m=>{ const t=m.text(); if(/animations available|ERR|fail/i.test(t)) errs.push('['+m.type()+'] '+t); });
await p.goto('http://localhost:3000/academic', { waitUntil:'networkidle' });
await p.waitForTimeout(7000);
await p.screenshot({ path:'academic-0.png' });
// scroll a bit to pass opening gate
for (let i=1;i<=3;i++){ await p.evaluate(y=>window.scrollTo(0,y), i*600); await p.waitForTimeout(1500); await p.screenshot({ path:`academic-${i}.png` }); }
console.log(errs.slice(-20).join('\n')||'(no notable logs)');
await b.close(); console.log('DONE');
