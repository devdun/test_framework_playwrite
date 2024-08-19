import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
    async addItemToCart(itemName: string) {
        await this.page.click(`text=${itemName}`);
        await this.page.click('.btn_inventory');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }
}
