
import { Base } from './Base.js';

class RegisterPage extends Base {
    constructor(page) {
        super(page);

        this.registerLink = page.locator('a.ico-register');
        this.genderMale = page.locator('#gender-male');
        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passInput = page.locator('#Password');
        this.confirmPass = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');

        this.resultMessage = page.locator('div.result');
        this.continueButton = page.locator('input.register-continue-button');
    }

    async clickRegisterLink() {
        await this.clickElement(this.registerLink);
    }

    async selectGender() {
        await this.genderMale.check();
    }

    async enterFirstName(name) {
        await this.fillElement(this.firstName, name);
    }

    async enterLastName(name) {
        await this.fillElement(this.lastName, name);
    }

    async enterEmail(email) {
        await this.fillElement(this.emailInput, email);
    }

    async enterPass(pass) {
        await this.fillElement(this.passInput, pass);
        await this.fillElement(this.confirmPass, pass);
    }

    async clickRegisterButton() {
        await this.clickElement(this.registerButton);
    }

    async clickContinue() {
        await this.clickElement(this.continueButton);
    }
}

export { RegisterPage };
