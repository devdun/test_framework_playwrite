import { BasePage } from './basePage';

export class CartPage extends BasePage {
    async removeItemFromCart(itemName: string) {
        await this.page.click(`text=${itemName} .btn_inventory`);
    }

    async proceedToCheckout() {
        await this.page.click('.checkout_button');
    }
}
