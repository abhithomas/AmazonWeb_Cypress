import {Pom} from "./pom.interface";
import 'cypress-if';

const elements = {
    searchTextBox: () => cy.get('#twotabsearchtextbox'),
    searchSubmitButton: () => cy.get('#nav-search-submit-button'),
    searchResultsDropdown: () => cy.get('.left-pane-results-container div[role=\'button\']'),
    bannerHeader: () => cy.get('[cel_widget_id^=\'MAIN-TOP_BANNER_MESSAGE\'] .a-size-medium-plus'),
    resultLists: (widgetId: any) => cy.get(`div[class='s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_${widgetId}'] span[class='a-size-base-plus a-color-base a-text-normal']`),
    sixtyPercentDiscountLink: () => cy.contains('60% Off or more'),
    discountTitleHeader: () => cy.get('#p_n_pct-off-with-tax-title'),
    expandAllFilter: () => cy.get('.sf-collapsible-left-nav-expand-all'),
    addToCartButton: () => cy.get('#add-to-cart-button'),
    brand_name: () => cy.get('#title_feature_div #productTitle'),
    whole_price: () => cy.get(':nth-child(1) > [data-csa-c-slot-id="apex_dp_center_column"] > #corePriceDisplay_desktop_feature_div > .a-spacing-none > .a-price > [aria-hidden="true"] > .a-price-whole'),
    mrp_price: () => cy.get('#apex_desktop .a-price.a-text-price'),
    percentage_off: () => cy.get('#apex_desktop .savingsPercentage'),
    cartContainer: () => cy.get('#nav-cart-count-container'),
    minPriceInputTab: () => cy.get('#low-price'),
    maxPriceInputTab: () => cy.get('#high-price'),
    goSubmitButton: () => cy.get('.a-button.a-spacing-top-mini.a-button-base .a-button-inner > .a-button-input'),
    errorMsg: () => cy.contains('Error', {timeout: 6000})
}

const actions = {

    searchProduct(product: string) {
        return elements.searchTextBox().should("be.visible").type(product)
            .then(() => elements.searchSubmitButton().should('be.visible').click({force: true}))
            .then(() => elements.bannerHeader().contains('Results').should("be.visible"))
    },

    enterMinPrice(price: any) {
        return elements.minPriceInputTab().scrollIntoView().type(price)
    },

    enterMaxPrice(price: any) {
        return elements.maxPriceInputTab().scrollIntoView().type(price)
    },

    clickGoButton() {
        return elements.goSubmitButton().should("be.visible").click({force: true});
    },

    expandAllFilter() {
        return elements.expandAllFilter().if('visible').click({force: true});
    },

    clickSixtyPercentDiscountFilter() {
        return elements.sixtyPercentDiscountLink().scrollIntoView().should('be.visible').click({force: true});
    },

    getRandomNumber() {
        return Math.floor(Math.random()  * 4) + 5;
    },

    selectRandomResult(randomIndex: any) {
        return elements.resultLists(randomIndex).should('be.visible').parent().invoke('removeAttr', 'target').then(() => {
            elements.resultLists(randomIndex).click({force: true});
        })
    },

    clickAddToCart() {
        return elements.addToCartButton().should('be.visible').click({force: true});
    },

    goToCart() {
        return elements.cartContainer().should('be.visible').click({force: true});
    },
}

const navigate = {
    visitApplication() {
        cy.visit('https://www.amazon.in/')
    }
}

type HomePagePom = Pom<typeof elements, typeof actions, typeof navigate>

export const productPage: HomePagePom = {
    elements,
    actions,
    navigate,
};
