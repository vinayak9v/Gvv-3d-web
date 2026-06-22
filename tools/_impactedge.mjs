import { chromium } from 'playwright';
const b = await chromium.launch({ channel:'msedge' });
const p = await b.newPage({ viewport:{width:1280,height:950} });
await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
// find the Garima Impact section (the Group 9 bg section: h2 "Garima Impact")
const h = p.getByRole('heading', { name: 'Garima Impact' });
await h.scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
// scroll up a little so we see the boundary between VisionCards and the impact bg
await p.evaluate(()=>window.scrollBy(0, -380));
await p.waitForTimeout(600);
await p.screenshot({ path:'impact-edge.png' });
// also a full shot at the impact heading
await h.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
await p.screenshot({ path:'impact-mid.png' });
await b.close();
console.log('DONE');
