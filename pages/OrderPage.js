
import { Base } from './Base.js';

class OrderPage extends Base {
    constructor(page) {
        super(page);

        // order confirm page
        this.successTitle = page.locator('.order-completed .title strong');
        this.orderNumberText = page.locator('.order-completed .details li').first();
        this.detailsLink = page.locator('.order-completed .details a');

        // order details page
        this.detailsTitle = page.locator('.page-title h1');
        this.detailsOrderNumber = page.locator('.order-number strong');
        this.detailsRows = page.locator('.order-details-page table.data-table tbody tr');
    }

    async clickOrderDetails() {
        await this.clickElement(this.detailsLink);
    }

    // "Order number: 123456" theke shudhu number
    async getConfirmOrderNumber() {
        const text = await this.orderNumberText.innerText();
        return text.replace(/\D/g, '');
    }

    // "Order #123456" theke shudhu number
    async getDetailsOrderNumber() {
        const text = await this.detailsOrderNumber.innerText();
        return text.replace(/\D/g, '');
    }

    productRow(productName) {
        return this.detailsRows.filter({ hasText: productName }).first();
    }

    quantityCell(row, qty) {
        return row.getByRole('cell', { name: String(qty), exact: true });
    }
}

export { OrderPage };
