import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import {
    pickRandom,
    saveFile,
    readFile,
    setCookies,
} from "@utils/index";
import { faker } from '@faker-js/faker';

const { Given, When, Then } = createBdd();

Given('I open the inventory page', async ({ page }) => {
    await page.goto('/');
    await setCookies(page, 'session-username', 'standard_user');

    await page.goto('/inventory.html');
    expect(page.url()).toContain('/inventory.html');
})

When('I navigate to the cart page', async ({ page }) => {
    const shoppingCartButton = page.getByTestId('shopping-cart-link');

    await expect(shoppingCartButton).toBeVisible();
    await shoppingCartButton.click();
});

Then('I should be on the cart page', async ({ page }) => {
    expect(page.url()).toContain('/cart.html');
});

When('I add an item to the cart', async ({ page }) =>{
    const inventoryItems = page.getByTestId('inventory-item');
    const shoppingCartButton = page.getByTestId('shopping-cart-link');

    const inventory = await pickRandom(inventoryItems);

    const title = inventory.locator('.inventory_item_name');
    const price = inventory.locator('.inventory_item_price');
    const description = inventory.locator('.inventory_item_desc');

    await expect(inventory).toBeVisible();
    await inventory.click();

    const temporaryData = {
        title: await title.innerText(),
        price: await price.innerText(),
        description: await description.innerText(),
    }

    await saveFile('/temp/temp-item.json', JSON.stringify([temporaryData]));
    await shoppingCartButton.click();

})

When('I checkout the cart', async ({ page }) => {
    const inventoryItem = page.getByTestId('inventory-item');
    const checkoutButton = page.getByTestId('checkout');

    const temporaryData = await readFile('/temp/temp-item.json');

    for (const item of await inventoryItem.all()){
        const title = item.locator('.inventory_item_name');
        const price = item.locator('.inventory_item_price');
        const description = item.locator('.inventory_item_desc');

        const itemData = {
            title: await title.innerText(),
            price: await price.innerText(),
            description: await description.innerText(),
        }

        expect([itemData]).toMatchObject(JSON.parse(temporaryData));
    }

    expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
})

Then('I fill in the checkout form', async ({page}) => {
    const firstNameInput = page.getByTestId('firstName');
    const lastNameInput = page.getByTestId('lastName');
    const postalCodeInput = page.getByTestId('postalCode');
    const continueButton = page.getByTestId('continue');

    expect(firstNameInput).toBeVisible();
    expect(lastNameInput).toBeVisible();
    expect(postalCodeInput).toBeVisible();
    expect(continueButton).toBeVisible();

    const temporaryData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
    }

    await firstNameInput.fill(temporaryData.firstName);
    await lastNameInput.fill(temporaryData.lastName);
    await postalCodeInput.fill(temporaryData.postalCode);

    expect(firstNameInput).toHaveValue(temporaryData.firstName);
    expect(lastNameInput).toHaveValue(temporaryData.lastName);
    expect(postalCodeInput).toHaveValue(temporaryData.postalCode);

    continueButton.click();
})

Then('the cart should display overviews of the items', async ({ page }) => {
    const inventoryItem = page.getByTestId('inventory-item');
    const temporaryData = await readFile('/temp/temp-item.json');

    for (const item of await inventoryItem.all()){
        const title = item.locator('.inventory_item_name');
        const price = item.locator('.inventory_item_price');
        const description = item.locator('.inventory_item_desc');

        const itemData = {
            title: await title.innerText(),
            price: await price.innerText(),
            description: await description.innerText(),
        }

        expect([itemData]).toMatchObject(JSON.parse(temporaryData));
    }

    const finishButton = page.getByTestId('finish');
    expect(finishButton).toBeVisible();

    await finishButton.click();
})

Then('I see the thank you page', async ({page})=>{
    const checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
    const headerText = page.getByTestId('complete-header');
    const completeText = page.getByTestId('complete-text');

    expect(checkoutCompleteContainer).toBeVisible();
    expect(headerText).toBeVisible();
    expect(completeText).toBeVisible();
})