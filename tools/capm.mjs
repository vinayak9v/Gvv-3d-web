import { chromium } from 'playwright';
const out = process.argv[2] || 'capm';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => console.log('PAGEERR>', e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(7000);
const canvas = await page.$('canvas');
const box = await canvas.boundingBox();
// crop the underside + flames (lower-center of the canvas)
await page.screenshot({ path: `${out}.png`, clip: {
  x: box.x + box.width * 0.24, y: box.y + box.height * 0.40,
  width: box.width * 0.54, height: box.height * 0.45,
}});
await browser.close();
console.log('DONE');
