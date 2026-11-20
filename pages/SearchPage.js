
import { Base } from './Base.js';

class SearchPage extends Base {
    constructor(page) {
        super(page);

        this.resultTitles = page.locator('.search-results .product-item .product-title a');
    }

    // result e jotogulo product ase tader nam
    async getResultNames() {
        await this.resultTitles.first().waitFor();
        const names = await this.resultTitles.allInnerTexts();
        return names.map(n => n.trim());
    }

    async openProduct(productName) {
        await this.clickElement(this.resultTitles.filter({ hasText: productName }).first());
    }
}

export { SearchPage };
