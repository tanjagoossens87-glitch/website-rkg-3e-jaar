import { expect, test } from '@playwright/test';

test('de startpagina opent met de juiste titel', async ({ page }) => {
  const response = await page.goto('/');
  const title = 'Godsdienst voor het derde middelbaar';

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(title);
  await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
});
