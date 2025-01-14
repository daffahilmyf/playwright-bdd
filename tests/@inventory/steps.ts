import { expect } from '@playwright/test';
import { createBdd, DataTable } from 'playwright-bdd';

import {
    enterLoginCredentials,
    getCookies,
    setCookies,
    pickRandom,
    getLocalStorage
} from '@utils/index';

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

When('I add multiple items to the cart', async ({ page }) => {
    const buttons = await page
        .locator('[data-test="inventory-item"]  button')
        .all();

    for (const button of buttons) {
        expect(button).toBeDefined();
        expect(button).toContainText('add to cart', {ignoreCase: true});

        await button.click();
        expect(button).toContainText('remove', {ignoreCase: true});
    }
});

Then('the cart should display 1 item', async ({page}) => {
    const shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    const contents =  await getLocalStorage(page, 'cart-contents');

    // Checking the visual
    await expect(shoppingCartBadge).toContainText('1');
    // Checking the stored data
    expect(JSON.parse(contents as string)).toHaveLength(1);

    
})

Then('the cart should display multiple items', async ({page}) => {
    const shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    const contents =  await getLocalStorage(page, 'cart-contents');

    // Checking the visual
    await expect(shoppingCartBadge).toContainText('6');
    // Checking the stored data
    expect(JSON.parse(contents as string)).toHaveLength(6);

});

Then('I should be redirected to the inventory page more than {string} miliseconds', async ({ page }, timeout: number) => {
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

Then('I should see a list of items', async ({ page }, data: DataTable) => {
    const inventoryList = page.getByTestId('inventory-list');
    const inventoryItems = page.getByTestId('inventory-item').all();

    await expect(inventoryList).toBeVisible();

    const expectedData = data.hashes()
    const actualData = [];
    for await (const item of await inventoryItems){
        const title = item.locator('[data-test="inventory-item-name"]');
        const price = item.locator('[data-test="inventory-item-price"]');

        actualData.push({
            item_name: await title.textContent(), 
            price: await price.textContent()
        });

        await expect(item).toBeVisible();
    }

    expect(actualData).toEqual(expectedData);
    expect((await inventoryItems).length).toEqual(6);
})