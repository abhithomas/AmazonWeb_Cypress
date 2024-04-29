import {Pom} from "./pom.interface";
import 'cypress-if';

const elements = {
    grandTotalPrice: () => cy.get('.grand-total-price'),
    useThisAddress: () => cy.get('[data-testid="Address_selectShipToThisAddress"]'),
    cashOnDeliveryRadioButton: () => cy.get('input[value*=\'Cash&isExpired\']'),
    useThisPaymentButton: () => cy.get('.a-button-inner input[name*=\'SetPaymentPlanSelectContinueEvent\']'),
    orderTotalPrice: () => cy.get('#subtotals-marketplace-table .grand-total-price'),
    placeYourOrderButton: () => cy.get('input[aria-labelledby=\'submitOrderButtonId-announce\']'),
    quantity:() => cy.get('[data-action="a-dropdown-button"] .a-dropdown-prompt')
}

const actions = {

    clickUseThisAddress() {
        return elements.useThisAddress().should('be.visible').click({force: true})
    },

    clickCashOnDeliveryRadio() {
        return elements.cashOnDeliveryRadioButton().should('be.visible').click()
    },

    clickUseThisPayment() {
        return elements.useThisPaymentButton().should('be.visible').click()
    },

    getQuantity(){
        elements.quantity().invoke('text').then((quantity: any) => {
             return parseInt(quantity, 10);
        })
    }
}

const navigate = {
    visitApplication() {
        return cy.visit('https://www.amazon.in/gp/buy/addressselect/handlers/display.html?_from=cheetah')
    }
}

type CheckOutPagePom = Pom<typeof elements, typeof actions, typeof navigate>

export const checkOutPage: CheckOutPagePom = {
    elements,
    actions,
    navigate,
};
