import { chromium } from 'playwright';
const tag=process.argv[2]||'now';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:760}, deviceScaleFactor:2 });
await p.goto('http://localhost:3000/',{waitUntil:'load'}); await p.waitForTimeout(5500);
await p.screenshot({ path:`tools/_hero_${tag}.png`, clip:{x:120,y:90,width:1040,height:620} });
console.log('shot', tag);
await b.close();
