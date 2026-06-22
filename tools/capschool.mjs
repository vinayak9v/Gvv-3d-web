import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(7000);
const canvas = await page.$('canvas');
const box = await canvas.boundingBox();
await page.screenshot({ path: 'school-tex.png', clip: {
  x: box.x + box.width*0.28, y: box.y + box.height*0.12,
  width: box.width*0.5, height: box.height*0.32,
}});
await browser.close();
console.log('DONE');
