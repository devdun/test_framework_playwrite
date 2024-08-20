import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
    // Remove item from cart based on item name
    async removeItemFromCart(itemName: string) {
        // Locate the cart item and click the remove button
        const itemLocator = this.page.locator(`.cart_item:has-text("${itemName}")`);
        const removeButton = itemLocator.locator('.cart_button');
        await removeButton.click();
    }

    // Proceed to checkout
    async proceedToCheckout() {
        await this.page.click('.checkout_button');
    }

        // Verify that cart is empty
        async verifyCartIsEmpty() {
            const cartItems = this.page.locator('.cart_item');
            const itemCount = await cartItems.count();
            return itemCount === 0;
        }
        
}
