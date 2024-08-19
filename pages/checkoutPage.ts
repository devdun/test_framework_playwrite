import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
    }

    async finishCheckout() {
        await this.page.click('.btn_action');
    }
}
