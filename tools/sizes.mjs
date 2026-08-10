import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
async function measure(url){
  const p = await b.newPage({ viewport:{width:1366,height:768} });
  const items=[]; let total=0;
  p.on('response', async r=>{
    try{ const h=r.headers(); const len=+(h['content-length']||0);
      const u=r.url().replace('http://localhost:3000','');
      if(len>20000) items.push([len,u]); total+=len;
    }catch{}
  });
  await p.goto(url,{waitUntil:'load'}); await p.waitForTimeout(6000);
  items.sort((a,b)=>b[0]-a[0]);
  console.log('\n### '+url+'  total~'+(total/1048576).toFixed(1)+'MB');
  items.slice(0,12).forEach(([l,u])=>console.log('  '+(l/1048576).toFixed(2)+'MB  '+u.slice(0,80)));
  await p.close();
}
await measure('http://localhost:3000/');
await measure('http://localhost:3000/robotics');
await b.close();
