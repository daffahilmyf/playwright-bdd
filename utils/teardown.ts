import { Page } from '@playwright/test';

/**
 * Clears cookies, localStorage, sessionStorage, and IndexedDB for the given page.
 * 
 * @param page - The Playwright Page instance.
 */
export default async function clearBrowserData(page: Page): Promise<void> {
  // Question: Why seperate evaluate calls for each storage type?
  // Answer: Depends on style preference. I prefer to separate them for clarity and ease-to-debug.
  
  await page.context().clearCookies();
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.evaluate(async () => {
    const databases = await indexedDB.databases();
    for (const db of databases) {
      if (db.name) {
        indexedDB.deleteDatabase(db.name);
      }
    }
  });
}
