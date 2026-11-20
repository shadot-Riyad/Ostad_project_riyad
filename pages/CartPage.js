
import { Base } from './Base.js';

class CartPage extends Base {
    constructor(page) {
        super(page);

        this.cartRows = page.locator('table.cart tr.cart-item-row');
        this.productNames = page.locator('table.cart td.product a.product-name');
        this.quantityInputs = page.locator('table.cart input.qty-input');
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
}

export { CartPage };
