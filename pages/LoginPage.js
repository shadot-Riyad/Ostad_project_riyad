
import { Base } from './Base.js';

class LoginPage extends Base {
    constructor(page) {
        super(page);

        this.loginLink = page.locator('a:has-text("Log in")');
        this.emailInput = page.locator('#Email');
        this.passInput = page.locator('#Password:visible');
        this.checkRememberMe = page.locator('#RememberMe');
        this.loginButton = page.locator('input.button-1.login-button:visible');

        // Q1 verification
        this.errorMessage = page.locator('.validation-summary-errors');
        this.verifyLogin = page.locator('a[href="/logout"]');
    }

    async clickLoginLink() {
        await this.clickElement(this.loginLink);
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPass(pass) {
        await this.passInput.fill(pass);
    }

    async rememberMeCheck() {
        await this.checkRememberMe.check();
    }

    async clickLoginButton() {
        await this.clickElement(this.loginButton);
    }
}

export { LoginPage };
