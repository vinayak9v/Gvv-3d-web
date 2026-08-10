import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(2500);
// scroll to robot section, screenshot BEFORE it would normally load (poster should show, not black)
const top=await p.evaluate(()=>{const v=document.querySelector('video');return v?v.closest('section').offsetTop:0;});
await p.evaluate(t=>window.scrollTo(0,t-200),top); await p.waitForTimeout(300);
await p.screenshot({path:'tools/_robotsection.png'});
const bg=await p.evaluate(()=>{const v=document.querySelector('video');const s=v.closest('section');return {bg:getComputedStyle(s).backgroundImage.slice(0,40), poster:v.getAttribute('poster')};});
console.log('SECTION', JSON.stringify(bg));
await b.close();
