import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/academic';
const prefix = process.argv[3] || 'mob';
const browser = await chromium.launch({ channel: 'msedge' });
// iPhone-ish portrait viewport
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const msgs = [];
page.on('pageerror', (e) => msgs.push('PAGEERR> ' + e.message));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(7000);
await page.screenshot({ path: `${prefix}-top.png` });
// scroll to middle of scene
await page.evaluate(() => { const m = document.body.scrollHeight - window.innerHeight; window.scrollTo(0, m * 0.5); });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${prefix}-mid.png` });
console.log('URL:', url);
console.log(msgs.join('\n') || 'no page errors');
await browser.close();
console.log('DONE');
