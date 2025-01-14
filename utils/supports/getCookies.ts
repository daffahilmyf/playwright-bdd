import { Cookie, Page } from '@playwright/test';

/**
 * Get a cookie from the browser context
 * @param page The page object
 * @param key The key of the cookie
 * @returns The cookie object
 * 
 * @example
 * ```typescript
 * const sessionCookie = await getCookie(page, 'session-username');
 * ```
 *  */

export default async function(page: Page, key: string): Promise<Cookie | undefined> {
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((cookie) => cookie.name === key);
    return sessionCookie;    
}