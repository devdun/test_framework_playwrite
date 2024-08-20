import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import users from '../data/users.json';
import products from '../data/products.json'; 
import { environment } from '../utils/env';

test.describe('Add Item to Cart and Verify Cart Contents', () => {
    test('Add Multiple Items and Verify Cart Contents', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        // Navigate to the login page and login
        await loginPage.navigateTo(environment.baseURL);
        await loginPage.login(users.standardUser.username, users.standardUser.password);

        // Add items to cart and verify 'Add to Cart' button changes to 'Remove'
        for (const item of products) {
            await page.click(`#${item.addToCartId}`);
            const button = page.locator(`#${item.removeId}`);
            await expect(button).toBeVisible();
        }

        // Navigate to the cart page
        await inventoryPage.goToCart();
        
        // Verify all items are in the cart
        for (const item of products) {
            const cartItem = page.locator(`.cart_item:has-text("${item.name}")`);
            await expect(cartItem).toBeVisible();
        }
    });
});
