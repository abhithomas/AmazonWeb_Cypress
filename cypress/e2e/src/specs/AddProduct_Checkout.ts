import {homePage} from "../pages/Home_Page";
import * as credentials from '../../../fixtures/credentials.json'
import * as staticData from '../../../fixtures/data.json'
import {cartPage} from "../pages/Cart_Page";
import {checkOutPage} from "../pages/CheckoutPage";

describe('Search, Add product and checkout', () => {
    let brandNameProduct: string;
    let whole_price1: string;

    beforeEach(() => {
        cy.stubCssRequests()
            .then(() => cy.stubVideoRequests())
            .then(() => cy.stubXHRRequests())
            .then(() => cy.stubNexusRequests())
            .then(() => cy.loginWithSession(credentials.userName, credentials.passWord))
            .then(() => homePage.navigate.visitApplication())
    })

    // @ts-ignore
    it('Verify product selected reflects same in cart', {retries: 1}, () => {
        cartPage.navigate.visitApplication()
            .then(() => cartPage.actions.deleteCartItemsRecursively())
            .then(() => cy.stubImageRequests())
            .then(() => homePage.actions.searchProduct(staticData.searchKey))
            .then(() => homePage.actions.selectRandomResult(homePage.actions.getRandomNumber()))
            .then(() => {
                homePage.elements.brand_name().should('be.visible').invoke("text").then((text: string) => {
                    brandNameProduct = text.trim().split(" ")[0];

                });
                homePage.elements.whole_price().should('be.visible').invoke("text").then((text: string) => {
                    whole_price1 = text.trim();
                });
            })
            .then(() => homePage.actions.clickAddToCart())
            .then(() => cartPage.navigate.visitApplication())
            .then(() => cartPage.elements.brandName().first().invoke('text').then((text: any) => {
                const brandNameCart = text.trim().split(" ")[0]; // Get the first word from the text
                expect(brandNameCart).to.equal(brandNameProduct);
            }))
            .then(() => cartPage.elements.productPrice().first().invoke('text').then((text: string) => {
                const extractedPriceCart = text.replace(/[^\d.]+/g, '').trim();
                const priceStringCart = extractedPriceCart.split('.')[0].replace(/\D/g, '');
                expect(priceStringCart).to.contain(whole_price1);
            }))
            .then(() => cartPage.actions.clickProceedToBuy())
            .then(() => checkOutPage.actions.clickUseThisAddress())
            .then(() => checkOutPage.elements.orderTotalPrice().should('be.visible').scrollIntoView().invoke('text').then((orderTotalPrice: string) => {
                const checkoutPriceCart = orderTotalPrice.replace(/[^\d.]+/g, '').trim();
                const priceCheckoutCart = checkoutPriceCart.split('.')[0].replace(/\D/g, '');
                expect(priceCheckoutCart).to.contain(whole_price1)
            }))
    })

    /*
        The below test case can be considered as a functional issue where in price input tab,
        strings and alphanumeric keywords can be entered and no error is thrown
     */
    it('Verify min max price can be entered only in numeric', () => {

        homePage.actions.searchProduct(staticData.searchKey)
            .then(() => homePage.actions.expandAllFilter())
            .then(() => homePage.actions.enterMinPrice('abcd'))
            .then(() => homePage.actions.enterMaxPrice('-34abcd'))
            .then(() => homePage.actions.clickGoButton())
            .then(() => homePage.elements.errorMsg().should('be.visible'))
    })
})



