import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const routes=['/','/about/introduction','/about/affiliation','/about/management','/academic/books','/fees','/process','/uniform'];
for(const r of routes){
  const p=await b.newPage({viewport:{width:1366,height:768}});
  const bad=[];
  p.on('response',resp=>{ if(resp.status()>=400 && /\.(webp|mp4|png)/.test(resp.url())) bad.push(resp.status()+' '+resp.url().replace('http://localhost:3000','')); });
  try{ await p.goto('http://localhost:3000'+r,{waitUntil:'load',timeout:20000}); }catch{}
  await p.waitForTimeout(1500);
  console.log(r.padEnd(22), bad.length? 'BAD: '+bad.slice(0,3).join(' | ') : 'ok');
  await p.close();
}
await b.close();
