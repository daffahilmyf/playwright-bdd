import { Locator } from '@playwright/test';

/**
 * 
 * @param locator The locator to pick a random element from
 * @returns A random element from the locator
 * 
 * @example
 * ```typescript
 * const randomElement = await pickRandom(page.locator('.inventory_item'));
 * ```
 */
export default async function (locator: Locator): Promise<Locator> {
    const elements = await locator.all();
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    return randomElement;
}