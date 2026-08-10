import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
async function shot(name, vp){
  const p = await b.newPage({ viewport:vp, deviceScaleFactor:2, isMobile: vp.width<500 });
  const errs=[];
  p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://localhost:3000/academic',{waitUntil:'load'});
  await p.waitForTimeout(6000); // models load + opening anim
  await p.screenshot({ path:`tools/_academic_${name}.png` });
  console.log(name, 'errs', errs.slice(0,2).join('|')||'none');
  await p.close();
}
await shot('iphone', {width:390,height:844});
await shot('desktop', {width:1366,height:768});
await b.close();
