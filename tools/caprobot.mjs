import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const msgs = [];
page.on('pageerror', (e) => msgs.push('PAGEERR> ' + e.message));
page.on('requestfailed', (r) => msgs.push('REQFAIL> ' + r.url()));
await page.goto('http://localhost:3000/robotics', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
// Scrub through the pinned robot section: should go assembled -> exploded -> reassembled.
const depths = [1.4, 2.0, 2.6, 3.2, 3.8];
let i = 1;
for (const d of depths) {
  await page.evaluate((mm) => window.scrollTo(0, mm * window.innerHeight), d);
  await page.waitForTimeout(900);
  const t = await page.evaluate(() => { const v = document.querySelector('.robot-section video'); return v ? +v.currentTime.toFixed(2) : null; });
  await page.screenshot({ path: `verify-robot-${i}.png` });
  console.log(`depth ${d} -> currentTime=${t}`);
  i++;
}
console.log(msgs.join('\n') || 'no errors');
await browser.close();
console.log('DONE');
