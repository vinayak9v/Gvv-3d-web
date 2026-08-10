import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:800}, deviceScaleFactor:1 });
const t0=Date.now();
await p.goto('http://localhost:3000/',{waitUntil:'load'});
// poll: brightness of the hero canvas region (lower-centre) — the lit island
// raises it well above the near-black background once decoded+rendered.
let visibleAt=null;
for(let i=0;i<40;i++){
  const buf = await p.screenshot({ clip:{x:440,y:380,width:400,height:300} });
  // crude brightness: average byte value of PNG payload is unreliable; instead
  // use sharp-free heuristic via canvas in-page is hard, so use file size as proxy
  // for visual complexity (more content => larger PNG). Background flat => tiny.
  const score = buf.length;
  if(!visibleAt && score>9000){ visibleAt = Date.now()-t0; }
  if(visibleAt && Date.now()-t0>visibleAt+1500) break;
  await p.waitForTimeout(350);
}
console.log('MODEL_VISIBLE_ms', visibleAt ?? 'not within window');
await b.close();
