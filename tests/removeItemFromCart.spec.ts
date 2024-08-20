import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import users from '../data/users.json';
import products from '../data/products.json';
import { environment } from '../utils/env';

test.describe('Cart Management Tests', () => {
    test('Remove item from cart and ensure cart is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        // Navigate to the login page and login
        await loginPage.navigateTo(environment.baseURL);
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        
        // Add item to cart
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        
        // Remove item from cart
        await cartPage.removeItemFromCart('Sauce Labs Backpack');
        
        // Verify cart is empty
        const cartItems = page.locator('.cart_item');
        const itemCount = await cartItems.count();
        expect(itemCount).toBe(0);
    });

    test('Add Multiple Items, Verify Cart Contents, and Remove One Item', async ({ page }) => {
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

        // Remove one item from the cart
        const itemToRemove = 'Sauce Labs Backpack'; // Example item to remove
        await cartPage.removeItemFromCart(itemToRemove);
        
        // Verify the item is removed
        const removedItem = page.locator(`.cart_item:has-text("${itemToRemove}")`);
        await expect(removedItem).toHaveCount(0);

        // Verify remaining items in the cart
        const remainingItems = products.filter(item => item.name !== itemToRemove);
        for (const item of remainingItems) {
            const cartItem = page.locator(`.cart_item:has-text("${item.name}")`);
            await expect(cartItem).toBeVisible();
        }
    });
});
