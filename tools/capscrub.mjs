import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/co-curricular';
const prefix = process.argv[3] || 'scrub';
const browser = await chromium.launch({ channel: 'msedge' });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const msgs = [];
page.on('console', (m) => msgs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => msgs.push('PAGEERR> ' + e.message));
await page.goto(url, { waitUntil: 'domcontentloaded' });
// Do NOT wait for full buffering — scroll almost immediately to mimic a cold first-load.
await page.waitForTimeout(1200);
let shot = 0;
const cap = async (tag) => { await page.screenshot({ path: `${prefix}-${String(shot++).padStart(2,'0')}-${tag}.png` }); };
// scroll DOWN incrementally
for (let i = 0; i < 8; i++) {
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(450);
  await cap(`down${i}`);
}
// scroll UP incrementally (tests #4)
for (let i = 0; i < 8; i++) {
  await page.mouse.wheel(0, -700);
  await page.waitForTimeout(450);
  await cap(`up${i}`);
}
console.log('URL:', url);
console.log(msgs.slice(-20).join('\n'));
await browser.close();
console.log('DONE');
