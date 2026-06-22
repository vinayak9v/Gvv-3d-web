import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:900} });
p.on('pageerror', (e)=>console.log('PAGEERR>', e.message));
p.on('console', (m)=>{ if(m.type()==='error') console.log('CONSOLE>', m.text()); });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
// scroll cards into view & let entrance reveal finish
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight*0.18));
await p.waitForTimeout(1500);
const card1 = p.locator('.card-1');
await card1.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
await p.screenshot({ path:'cards-rest.png' });

// hover -> glitch burst; capture a couple frames during the 0.4s burst
await card1.hover();
await p.waitForTimeout(90);
console.log('hover class:', await card1.getAttribute('class'));
await p.screenshot({ path:'cards-hover1.png' });
await p.waitForTimeout(140);
await p.screenshot({ path:'cards-hover2.png' });
await p.waitForTimeout(600);
await p.screenshot({ path:'cards-hover-settled.png' });

// move away, then click card-2 -> teleport out + navigate
await p.mouse.move(20,20);
await p.waitForTimeout(300);
const card2 = p.locator('.card-2');
await card2.hover();
await card2.click();
await p.waitForTimeout(180);
console.log('teleport class:', await card2.getAttribute('class').catch(()=>'(gone)'));
await p.screenshot({ path:'cards-teleport.png' });
await p.waitForTimeout(2000);
console.log('after click URL:', p.url());
await p.screenshot({ path:'cards-after.png' });
await b.close();
console.log('DONE');
