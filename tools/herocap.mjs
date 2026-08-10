import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1440,height:820}, deviceScaleFactor:2 });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(6500);
await p.evaluate(()=>{ document.querySelectorAll('.school-cloud,.drag-handle,.drag-text').forEach(e=>e.style.visibility='hidden'); });
// fixed clip over the hero/model band; transparent areas show the page gradient
await p.screenshot({ path:'tools/_island_full.png', clip:{x:0,y:150,width:1440,height:640} });
console.log('captured');
await b.close();
