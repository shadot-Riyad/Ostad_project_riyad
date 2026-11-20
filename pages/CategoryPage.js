
import { Base } from './Base.js';

class CategoryPage extends Base {
    constructor(page) {
        super(page);

        this.pageTitle = page.locator('.page-title h1');
        this.productTitles = page.locator('.product-item .product-title a');
    }

    // nam diye product khuje open
    async openProduct(productName) {
        await this.clickElement(this.productTitles.filter({ hasText: productName }).first());
    }
}

export { CategoryPage };
