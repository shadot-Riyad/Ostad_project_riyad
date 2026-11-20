
import { Base } from './Base.js';

class CheckoutPage extends Base {
    constructor(page) {
        super(page);

        // billing address
        this.country = page.locator('#BillingNewAddress_CountryId');
        this.state = page.locator('#BillingNewAddress_StateProvinceId');
        this.city = page.locator('#BillingNewAddress_City');
        this.address1 = page.locator('#BillingNewAddress_Address1');
        this.zip = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phone = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingContinue = page.locator('#billing-buttons-container input.new-address-next-step-button');

        // shipping address (kokhono kokhono ei step ashe)
        this.shippingAddressContinue = page.locator('#shipping-buttons-container input.new-address-next-step-button');

        this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
        this.paymentMethodContinue = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
        this.paymentInfoContinue = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
        this.confirmButton = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');
    }

    async fillBillingAddress(a) {
        await this.country.selectOption({ label: a.country });
        await this.state.selectOption({ label: a.state });   // country dile state list load hoy
        await this.fillElement(this.city, a.city);
        await this.fillElement(this.address1, a.address);
        await this.fillElement(this.zip, a.zip);
        await this.fillElement(this.phone, a.phone);
        await this.clickElement(this.billingContinue);
    }

    // billing er por shipping address step ashle continue dibo, na ashle skip
    async continueShippingAddress() {
        await this.shippingAddressContinue.or(this.shippingMethodContinue).first().waitFor({ state: 'visible' });
        if (await this.shippingAddressContinue.isVisible()) {
            await this.clickElement(this.shippingAddressContinue);
        }
    }

    async continueShippingMethod() {
        await this.clickElement(this.shippingMethodContinue);
    }

    async continuePaymentMethod() {
        await this.clickElement(this.paymentMethodContinue);
    }

    async continuePaymentInfo() {
        await this.clickElement(this.paymentInfoContinue);
    }

    async confirmOrder() {
        await this.clickElement(this.confirmButton);
    }
}

export { CheckoutPage };
