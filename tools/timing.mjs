import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1100,height:700} });
await p.goto('http://localhost:3000/',{waitUntil:'load'});
for(const ms of [1200, 6000]){
  await p.waitForTimeout(ms - (ms===1200?0:1200));
  await p.screenshot({ path:`tools/_t_${ms}.png` });
}
// also read canvas + scene clues
const info = await p.evaluate(()=>{
  const c=document.querySelector('canvas');
  return { canvasBg: c?getComputedStyle(c).backgroundColor:'no', mainBg: getComputedStyle(document.querySelector('main')).backgroundColor };
});
console.log('INFO', JSON.stringify(info));
await b.close();
