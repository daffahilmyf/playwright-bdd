import { Page } from '@playwright/test';

export default async function (page: Page, key: string, value: string): Promise<void> {
    await page.context().addCookies([
        { name: key, value, url: page.url() }
    ]);
}