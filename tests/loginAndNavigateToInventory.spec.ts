import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import users from '../data/users.json';
import { environment } from '../utils/env';

test.describe('Login and Navigate to Inventory Page', () => {
    test('Login with valid credentials and navigate to Inventory Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // Navigate to the login page
        await loginPage.navigateTo(environment.baseURL);
        
        // Perform login
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        
        // Verify redirection to inventory page
        await expect(page).toHaveURL(environment.baseURL + '/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');

        // Verify presence of inventory items
        const inventoryItems = page.locator('.inventory_item');
        const itemCount = await inventoryItems.count();
        expect(itemCount).toBeGreaterThan(0);
    });
});
