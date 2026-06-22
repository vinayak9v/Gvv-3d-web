import { chromium } from 'playwright';
const out = process.argv[2] || 'cap';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => console.log('PAGEERR>', e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(7000);
const canvas = await page.$('canvas');
const box = await canvas.boundingBox();
await page.screenshot({ path: `${out}-full.png` });
// bottom of island (where downward flames show in any orientation)
await page.screenshot({ path: `${out}-bot.png`, clip: {
  x: box.x + box.width * 0.20, y: box.y + box.height * 0.55,
  width: box.width * 0.60, height: box.height * 0.43,
}});
await browser.close();
console.log('DONE');
