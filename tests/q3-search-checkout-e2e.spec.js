
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { SearchPage } from '../pages/SearchPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OrderPage } from '../pages/OrderPage.js';
import { generateUser, products, billingAddress } from '../utils/testData.js';

test('Q3 - Search to Order Confirm (E2E)', async ({ page }) => {

    const user = generateUser();
    const qty = 3;

    const register = new RegisterPage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const order = new OrderPage(page);

    // Q3 independent rakhar jonno nijei notun user register kore nicchi (register er por auto login hoy)
    await register.pageOpen();
    await register.clickRegisterLink();
    await register.selectGender();
    await register.enterFirstName(user.firstName);
    await register.enterLastName(user.lastName);
    await register.enterEmail(user.email);
    await register.enterPass(user.password);
    await register.clickRegisterButton();
    await expect(register.resultMessage).toContainText('Your registration completed');
    await register.clickContinue();

    // search
    await search.searchProduct(products.searchTerm);
    const names = await search.getResultNames();
    expect(names).toContain(products.name);
    await search.attachShot('Q3 - search result');

    // product open, quantity barai, cart e add
    await search.openProduct(products.name);
    await expect(product.productName).toHaveText(products.name);
    await product.setQuantity(qty);
    await product.clickAddToCart();

    // cart check, terms e tick, checkout
    await product.openCart();
    expect(await cart.getProductNames()).toEqual([products.name]);
    expect(await cart.getFirstQuantity()).toBe(qty);
    await cart.agreeTerms();
    await expect(cart.termsCheckbox).toBeChecked();
    await cart.attachShot('Q3 - cart with terms agreed');
    await cart.clickCheckout();

    // checkout steps
    await checkout.fillBillingAddress(billingAddress);
    await checkout.continueShippingAddress();
    await checkout.continueShippingMethod();
    await checkout.continuePaymentMethod();
    await checkout.continuePaymentInfo();
    await expect(checkout.confirmButton).toBeVisible();
    await checkout.attachShot('Q3 - confirm order page');
    await checkout.confirmOrder();

    // order confirm
    await expect(order.successTitle).toHaveText('Your order has been successfully processed!');
    const orderNo = await order.getConfirmOrderNumber();
    expect(orderNo).not.toBe('');
    await order.attachShot('Q3 - order confirmed');

    // order details dekhi
    await order.clickOrderDetails();
    await expect(order.detailsTitle).toContainText('Order information');
    expect(await order.getDetailsOrderNumber()).toBe(orderNo);

    const row = order.productRow(products.name);
    await expect(row).toBeVisible();
    await expect(order.quantityCell(row, qty)).toBeVisible();
    await order.attachShot('Q3 - order details');

});
