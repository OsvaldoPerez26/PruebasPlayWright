import { test, expect } from '@playwright/test';

test.use({headless:false});
test('test2', async ({ page }) => {
  await page.goto('https://www.geelymexico.com/');
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.locator('#q-portal--dialog--2').getByRole('button').click();
  await page.getByText('Vehículos', { exact: true }).click();
  await page.getByRole('link', { name: 'CITYRAY Desde: $548,990.00', exact: true }).click();
  
});