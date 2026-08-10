import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1366,height:768} });
await p.goto('http://localhost:3000/robotics',{waitUntil:'load'}); await p.waitForTimeout(1500);
const top = await p.evaluate(()=>{ const v=document.querySelector('video'); return v.closest('section').getBoundingClientRect().top+window.scrollY; });
await p.evaluate(y=>window.scrollTo(0,y+400), top); await p.waitForTimeout(1500);
await p.screenshot({ path:'tools/_ui_lab.png' });
console.log('LAB_SHOT done');
await b.close();
