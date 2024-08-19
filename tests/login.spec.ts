import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import users from '../data/users.json';
import { environment } from '../utils/env';

test.describe('Login Tests', () => {
    test('Standard User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo(environment.baseURL);
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await expect(page).toHaveURL(environment.baseURL + '/inventory.html');
    });

    test('Locked Out User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo(environment.baseURL);
        await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
        await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});
