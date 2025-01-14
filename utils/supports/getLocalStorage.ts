import { Page } from '@playwright/test';

/**
 * Get a value from the localStorage
 * @param page The page object
 * @param key The key of the localStorage value
 * @returns The localStorage value
 * 
 * @example
 * ```typescript
 * const localStorageValue = await getLocalStorage(page, 'session-username');
 * ```
 */

export default async function (page: Page, key: string): Promise<string | null> {
    const localStorageValue = await page.evaluate((key) => {
        return window.localStorage.getItem(key);
    }, key);
    return localStorageValue;
}
