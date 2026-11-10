import { expect, test } from '@playwright/test';

const exercisePath = '/oefeningen/imago-authenticiteit/';

test('de oefening is vanaf de startpagina te openen en uitleg kan worden getoond', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Imago, zelfbeeld, authenticiteit en kritiek' }).click();
  await expect(page).toHaveURL(new RegExp(exercisePath + '$'));

  const reveal = page.getByRole('button', { name: 'Controleer je vier antwoorden' });
  const explanation = page.getByText('Hoe jij jezelf ziet en beoordeelt.', { exact: true });
  await expect(explanation).toBeHidden();
  await reveal.press('Enter');
  await expect(explanation).toBeVisible();
  await page.getByRole('button', { name: 'Verberg de uitleg' }).press('Enter');
  await expect(explanation).toBeHidden();

  await page.getByRole('button', { name: /Ga naar de twee manieren/ }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Wie probeert het imago te sturen?' })).toBeFocused();
});

test('een onvolledige poging toont voortgang en waarschuwt voor open vragen', async ({ page }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);

  await page.getByRole('button', { name: /Drie situaties/ }).click();
  const first = page.locator('[data-question]').first();
  await first.getByRole('button', { name: /Identiteit: verlegen\. Werkelijk imago: arrogant\./ }).click();
  await expect(first.getByRole('status')).toContainText('Juist!');
  await expect(first.getByRole('button').first()).toBeDisabled();
  await expect(page.getByText('1 / 12 vragen', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: /Eindcontrole/ }).click();
  await page.getByRole('button', { name: 'Bekijk mijn gecontroleerde vragen' }).click();
  await expect(page.getByText('1 / 12', { exact: true })).toBeVisible();
  await expect(page.getByText(/Je hebt nog niet alle vragen gecontroleerd/)).toBeVisible();
});

test('op een smal scherm klopt de eindscore en kan de leerling opnieuw beginnen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await page.goto(exercisePath);
  await page.getByRole('button', { name: /Drie situaties/ }).click();

  const situations = page.locator('#situaties [data-question]');
  await situations.nth(0).getByRole('button').nth(0).press('Enter');
  await expect(situations.nth(0).getByRole('status')).toContainText('Niet juist. Het juiste antwoord is C.');
  await expect(situations.nth(0).getByRole('status')).toContainText('Waarom het juiste antwoord klopt');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);

  for (const [index, answer] of [0, 3, 1, 2, 1, 3, 0, 2].entries()) {
    await situations.nth(index + 1).getByRole('button').nth(answer).click();
  }
  await page.getByRole('button', { name: /Naar Augustinus/ }).click();
  const augustinus = page.locator('#augustinus [data-question]');
  for (const [index, answer] of [3, 1, 2].entries()) {
    await augustinus.nth(index).getByRole('button').nth(answer).click();
  }
  await page.getByRole('button', { name: /Naar de eindcontrole/ }).click();
  await page.getByRole('button', { name: 'Bekijk mijn gecontroleerde vragen' }).click();
  await expect(page.getByText('11 / 12', { exact: true })).toBeVisible();
  await expect(page.getByText(/Lees de feedback bij fouten opnieuw/)).toBeVisible();
  await page.getByRole('button', { name: 'Start opnieuw' }).click();
  await expect(page.getByText('0 / 12 vragen', { exact: true })).toBeVisible();
});
