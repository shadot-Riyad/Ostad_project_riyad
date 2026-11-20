
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { CategoryPage } from '../pages/CategoryPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage} from '../pages/CartPage.js';
import { generateUser, products } from '../utils/testData.js';

test('Q2 - Register and Add Product to Cart', async ({ page }) => {

    const user = generateUser();
    const qty = 2;

    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const category = new CategoryPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    // 1. new customer register
    await register.pageOpen();
    await register.clickRegisterLink();

    await register.selectGender();
    await register.enterFirstName(user.firstName);
    await register.enterLastName(user.lastName);
    await register.enterEmail(user.email);
    await register.enterPass(user.password);
    await register.clickRegisterButton();

    await expect(register.resultMessage).toContainText('Your registration completed');
    await register.attachShot('Q2 - registration done');
    await register.clickContinue();

    // register korle site nijei login kore dey, tai logout kore abar login korbo
    await register.clickLogout();
    await login.clickLoginLink();
    await login.enterEmail(user.email);
    await login.enterPass(user.password);
    await login.clickLoginButton();

    await expect(login.accountLink).toHaveText(user.email);
    await login.attachShot('Q2 - login success');

    // 2. category -> product
    await category.openCategory(products.category);
    await expect(category.pageTitle).toContainText(products.category);
    await category.openProduct(products.name);
    await expect(product.productName).toHaveText(products.name);

    // 3. quantity set kore cart e add
    await product.setQuantity(qty);
    await product.clickAddToCart();
    await product.attachShot('Q2 - added to cart');

    // 4. cart e product ar quantity thik ache kina
    await product.openCart();
    await expect(cart.cartRows).toHaveCount(1);
    expect(await cart.getProductNames()).toEqual([products.name]);
    expect(await cart.getFirstQuantity()).toBe(qty);
    await cart.attachShot('Q2 -cart verified');

});
