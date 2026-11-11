import { expect, test } from '@playwright/test';

test('de startpagina opent met de juiste titel', async ({ page }) => {
  const response = await page.goto('/');
  const title = 'Godsdienst voor het derde middelbaar';

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(title);
  await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
});

for (const width of [360, 1280]) {
  test(`het persoonlijke logo en de huisstijl zijn leesbaar op ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/oefeningen/imago-authenticiteit/']) {
      await page.goto(route);
      const logo = page.getByRole('img', { name: 'mevrouw Goossens', exact: true });
      await expect(logo).toBeVisible();
      expect(await logo.locator('svg').count()).toBe(2);
      expect(await page.locator('body').evaluate((body) => getComputedStyle(body).backgroundColor)).toBe('rgb(255, 252, 247)');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toHaveCSS('color', 'rgb(156, 72, 52)');
      await expect(focused).toHaveCSS('outline-style', 'solid');
      await expect(focused).toHaveCSS('outline-color', 'rgb(130, 67, 45)');
      await page.screenshot({ path: `.tmp/huisstijl-${width}-${route === '/' ? 'start' : 'oefening'}.png`, fullPage: true, style: 'astro-dev-toolbar { visibility: hidden; }' });
    }
  });
}
