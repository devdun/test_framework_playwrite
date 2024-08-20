import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
    async addItemToCart(itemName: string) {
        // Log the page URL for debugging
        console.log(`Current URL: ${this.page.url()}`);
        
        // Wait for the item to be visible
        const itemLocator = this.page.locator(`text=${itemName}`);
        await expect(itemLocator).toBeVisible();
        
        // Ensure the item is visible before interacting with it
        const itemVisible = await itemLocator.isVisible();
        if (!itemVisible) {
            throw new Error(`Item "${itemName}" is not visible on the page.`);
        }
        
        // Click the item and then the add-to-cart button
        await itemLocator.click();
        await this.page.click('.btn_inventory');
    }

    async goToCart() {
        // Click on the cart icon or button
        await this.page.click('.shopping_cart_link');
    }
}
