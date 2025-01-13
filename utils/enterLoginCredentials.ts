import { expect, Page } from "@playwright/test";

export default async function (page: Page, username: string, password: string) {
    const usernameInput = page.getByTestId('username');
    const passwordInput = page.getByTestId('password');
    
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    await usernameInput.fill(username, { force: true });
    await passwordInput.fill(password, { force: true });
    
    await expect(usernameInput).toHaveValue(username);
    await expect(passwordInput).toHaveValue(password);
}