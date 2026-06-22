import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/academic';
const prefix = process.argv[3] || 'scroll';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
const msgs = [];
page.on('console', (m) => msgs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => msgs.push('PAGEERR> ' + e.message));
page.on('requestfailed', (r) => msgs.push('REQFAIL> ' + r.url() + ' :: ' + (r.failure()?.errorText||'')));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(7000); // let opening sequence finish + models load
const steps = [0, 0.25, 0.5, 0.75, 1.0];
for (const s of steps) {
  await page.evaluate((frac) => {
    const max = document.body.scrollHeight - window.innerHeight;
    window.scrollTo(0, max * frac);
  }, s);
  await page.waitForTimeout(1500);
  const name = `${prefix}-${Math.round(s*100)}.png`;
  await page.screenshot({ path: name });
  console.log('captured', name);
}
console.log('URL:', url);
console.log(msgs.slice(-30).join('\n'));
await browser.close();
console.log('DONE');
