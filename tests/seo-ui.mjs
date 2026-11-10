// Local-only visual and navigation checks. Analytics and form requests are blocked.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const base = process.env.FORMA_TEST_BASE_URL || 'http://127.0.0.1:3101';
const origin = new URL(base).origin;
if (!['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw new Error('Local checks only');
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const errors = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin || url.pathname === '/api/consultation') return route.abort();
      return route.continue();
    });
    for (const path of ['/', '/services/kitchen-remodeling', '/services/bathroom-remodeling', '/services', '/service-areas']) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${width} overflow ${path}`);
      assert.ok(await page.locator('h1').isVisible());
      for (const script of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(script);
      const label = path === '/' ? 'home' : path.split('/').pop();
      if (width !== 768) await page.screenshot({ path: `outputs/${label}-${width}.png`, fullPage: true });
      if (path.includes('remodeling')) {
        await page.locator('.service-contents').getByRole('link', { name: 'Planning options' }).click();
        await page.waitForTimeout(150);
        assert.ok(page.url().endsWith('#planning-options'));
        assert.ok(await page.locator('#planning-options').isVisible());
      }
    }
    if (width === 390) {
      await page.goto(base);
      const menu = page.locator('.mobile-menu');
      await menu.locator('summary').click();
      await menu.getByRole('link', { name: 'Services', exact: true }).click();
      await page.waitForURL('**/services');
      assert.equal(await menu.getAttribute('open'), null);
      await page.goBack();
      await page.waitForURL(base + '/');
      await menu.locator('summary').click();
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('open'), null);
    }
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: 15 page/viewport checks, rendered JSON-LD, no horizontal overflow, planning anchors, mobile navigation and Escape/Back; no runtime errors.');
} finally { await browser.close(); }
