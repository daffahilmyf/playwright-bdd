import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import getCookies from '@utils/getCookies';
import setCookies from '@utils/setCookies';
import pickRandom from '@utils/pickRandom';
import enterLoginCredentials from '@utils/enterLoginCredentials';



const { Given, When, Then } = createBdd();

Given('I open the login page', async ({ page }) => {
    await page.goto('/');
});

Given('I am on the inventory page', async ({ page }) => {
    await page.goto('/')
    await setCookies(page, 'session-username', 'standard_user');
    await page.goto('/inventory.html');
});

When('I login with glitch {string} and {string}', async ({ page }, username: string, password: string) => {
    await enterLoginCredentials(page, username, password);
});

When('I view the inventory page', async ({ page }) => {
    const sessionUsername = await getCookies(page, 'session-username');

    expect(page.url()).toContain('/inventory.html');
    expect(sessionUsername).toBeDefined();
    expect(sessionUsername?.value).toBe('standard_user');
});

When('I add an item to the cart', async ({ page }) => {
    const buttons = page.locator('[data-test="inventory-item"]  button');

    const button = await pickRandom(buttons);

    expect(button).toBeDefined();
    expect(button).toContainText('add to cart', {ignoreCase: true});

    await button.click();

    expect(button).toContainText('remove', {ignoreCase: true});
});

Then('the cart should display 1 item', async ({page}) => {
    const shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    await expect(shoppingCartBadge).toContainText('1');
})

Then('I should be redirected to the inventory page more than {string} seconds', async ({ page }, timeout: number) => {
    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();

    const startTime = Date.now();
    await loginButton.click();
    await page.waitForURL('**/inventory.html');
    const endTime = Date.now();

    const duration = endTime - startTime;
    expect(duration).toBeGreaterThanOrEqual(Number(timeout));
    
    expect(page.url()).toContain('/inventory.html');

    const sessionCookie = await getCookies(page, 'session-username');
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.value).toBe('performance_glitch_user');


})

Then('I should see a list of items', async ({ page }) => {
    const inventoryList = page.getByTestId('inventory-list');
    const inventoryItems = page.getByTestId('inventory-item').all();

    await expect(inventoryList).toBeVisible();
    (await inventoryItems).forEach(async (item) => {
        await expect(item).toBeVisible();
    })
    expect((await inventoryItems).length).toEqual(6);
})