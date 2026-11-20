import { test } from '@playwright/test';

class Base {
    constructor(page){
        this.page = page;
        this.pageUrl = 'https://demowebshop.tricentis.com/';

        // header er common locator (Q2 theke lagbe)
        this.logoutLink = page.locator('a.ico-logout');
        this.accountLink = page.locator('.header-links a.account');
        this.cartLink = page.locator('#topcartlink a.ico-cart');
        this.searchBox = page.locator('#small-searchterms');
        this.searchButton = page.locator('input.search-box-button');
    }

    async pageOpen(){
        await this.page.goto(this.pageUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

    }
    async clickElement(data){
        await data.click();
    }

    async fillElement(data, value){
        await data.fill(value);
    }

    async clickLogout(){
        await this.clickElement(this.logoutLink);
    }

    async openCart(){
        await this.clickElement(this.cartLink);
    }

    // top menu theke category e jabo (jemon Books)
    async openCategory(name){
        await this.page.locator('ul.top-menu > li > a', { hasText: name }).first().click();
    }

    async searchProduct(text){
        await this.fillElement(this.searchBox, text);
        await this.clickElement(this.searchButton);
    }

    // screenshot niye report e attach kore dibe
    async attachShot(name){
        const shot = await this.page.screenshot({ fullPage: true });
        await test.info().attach(name, { body: shot, contentType: 'image/png' });
    }
}

export { Base };
