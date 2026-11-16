
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('Q1 - Invalid Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.pageOpen();
    await login.clickLoginLink();

    await login.enterEmail('Invalid@tesssst.com');
    await login.enterPass('wrongPass123');

    await login.clickLoginButton();

    await expect(login.errorMessage).toBeVisible();
    await expect(login.verifyLogin).not.toBeVisible();

});
