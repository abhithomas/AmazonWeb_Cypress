import {Pom} from "./pom.interface";
import 'cypress-if';

const elements = {
    brandName: () => cy.get('.sc-list-item-content .a-truncate-cut'),
    productPrice: () => cy.get('.sc-list-item-content .sc-product-price'),
    mrp_price: () => cy.get('#apex_desktop .a-price.a-text-price'),
    percentage_off: () => cy.get('#apex_desktop .savingsPercentage'),
    deleteButton: () => cy.get('.a-row.sc-action-links .sc-action-quantity~[data-feature-id="delete"] input'),
    subTotalPrice: () => cy.get('.a-section.sc-buy-box-inner-box .currencyINR'),
    proceedToBuy: () => cy.get('[data-feature-id="proceed-to-checkout-action"]')
}

const actions = {

    deleteCartItemsRecursively() {
       return elements.deleteButton().if('visible').then(() => {
            elements.deleteButton().then(($buttons: { length: number; eq: (arg0: number) => any; }) => {
                if ($buttons.length > 0) {
                    $buttons.eq(0).click();
                    navigate.visitApplication()
                    actions.deleteCartItemsRecursively();
                }
            })
        });
    },

    clickProceedToBuy(){
        return elements.proceedToBuy().should('be.visible').click();
    }


}

const navigate = {
    visitApplication() {
       return cy.visit('https://www.amazon.in/gp/cart/view.html?ref_=nav_cart')
    }
}

type CartPagePom = Pom<typeof elements, typeof actions, typeof navigate>

export const cartPage: CartPagePom = {
    elements,
    actions,
    navigate,
};
