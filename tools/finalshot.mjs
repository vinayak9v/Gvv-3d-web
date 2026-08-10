import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
for(const [name,url] of [['about','http://localhost:3000/about/introduction'],['home','http://localhost:3000/']]){
  const p=await b.newPage({viewport:{width:1280,height:800}});
  await p.goto(url,{waitUntil:'load'}); await p.waitForTimeout(4500);
  await p.screenshot({path:`tools/_final_${name}.png`});
  await p.close();
}
console.log('done');
await b.close();
