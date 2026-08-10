import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const routes=['/','/robotics','/academic','/about/introduction','/admission','/contact','/co-curricular'];
for(const r of routes){
  const p=await b.newPage({viewport:{width:1366,height:768}});
  let total=0, ext=0, biggest=[];
  p.on('response',resp=>{const h=resp.headers();const len=+(h['content-length']||0);total+=len; if(!resp.url().includes('localhost'))ext+=len; if(len>300000)biggest.push([len,resp.url().replace('http://localhost:3000','').slice(0,40)]);});
  try{ await p.goto('http://localhost:3000'+r,{waitUntil:'load',timeout:25000}); }catch{}
  await p.waitForTimeout(2500);
  biggest.sort((a,b)=>b[0]-a[0]);
  console.log(`${r.padEnd(22)} total=${(total/1048576).toFixed(1)}MB ext=${(ext/1048576).toFixed(1)}MB  top:${biggest.slice(0,3).map(x=>(x[0]/1048576).toFixed(1)+'M '+x[1]).join(' | ')}`);
  await p.close();
}
await b.close();
