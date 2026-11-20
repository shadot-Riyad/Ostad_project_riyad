
import { Base } from './Base.js';

class CartPage extends Base {
    constructor(page) {
        super(page);

        this.cartRows = page.locator('table.cart tr.cart-item-row');
        this.productNames = page.locator('table.cart td.product a.product-name');
        this.quantityInputs = page.locator('table.cart input.qty-input');

        // Q3 e lagbe
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
    }

    async getProductNames() {
        const names = await this.productNames.allInnerTexts();
        return names.map(n => n.trim());
    }

    // prothom item er quantity, number e convert kore
    async getFirstQuantity() {
        const q = await this.quantityInputs.first().inputValue();
        return Number(q);
    }

    async agreeTerms() {
        await this.termsCheckbox.check();
    }

    async clickCheckout() {
        await this.clickElement(this.checkoutButton);
    }
}

export { CartPage };
