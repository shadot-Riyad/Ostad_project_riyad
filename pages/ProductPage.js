
import { Base } from './Base.js';

class ProductPage extends Base {
    constructor(page) {
        super(page);

        this.productName = page.locator('.product-name h1');
        this.quantityInput = page.locator('.product-essential input.qty-input');
        this.addToCartButton = page.locator('.product-essential input.add-to-cart-button');
        this.successBar = page.locator('#bar-notification .content');
    }

    // fill korle age er value muche jay
    async setQuantity(qty) {
        await this.fillElement(this.quantityInput, String(qty));
    }

    async clickAddToCart() {
        await this.clickElement(this.addToCartButton);
        await this.successBar.waitFor();   // success msg ashar por e agabo
    }
}

export { ProductPage };
