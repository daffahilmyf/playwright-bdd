import { expect, Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import enterLoginCredentials from '@utils/enterLoginCredentials';

const { Given, When, Then } = createBdd();


Given('I open the login page', async ({ page }) => {
  await page.goto('/');
});

When('I fill in the login form with valid {string} and {string}', async ({ page }, username: string, password: string) => {
    await enterLoginCredentials(page, username, password);
});

When('I fill in the login form with invalid {string} and {string}', async ({ page }, username: string, password: string) => {
    await enterLoginCredentials(page, username, password);  
});


When('I submit the login form', async ({ page }) => {
  const loginButton = page.locator('#login-button');
  await expect(loginButton).toBeVisible();

  await loginButton.click();
});

Then('I should see the welcome page', async ({ page }) => {
  const pageURI = page.url();
  expect(pageURI).toContain('/inventory.html');
});

Then('I should see the error message: {string}', async ({ page }, error_message: string) => {
    const errorText = page.getByTestId('error');
    const errorBox = page.locator('.error-message-container.error');

    await expect(errorBox).toBeVisible();
    await expect(errorBox).toHaveCSS('background-color', 'rgb(226, 35, 26)');


    await expect(errorText).toBeVisible();
    await expect(errorText).toHaveText(error_message);
});