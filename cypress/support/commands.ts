import {LoginPage} from '../e2e/src/pages/Login_Page'
import {Request} from "cypress/types/net-stubbing";

Cypress.Commands.add('loginWithSession', (email: string, password: string) => {
    return cy.session('session', () => {
        cy.visit('https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0')
        LoginPage.actions.enterUserName(email)
        LoginPage.actions.clickContinueButton()
        LoginPage.actions.enterPassword(password)
        LoginPage.actions.clickSignInButton()
        LoginPage.elements.welcomeUserMessage().should('contain', 'Hello,')
    })
})

Cypress.Commands.add('stubVideoRequests', () => {

    return cy.intercept('GET', '*.mp4', (req: Request) => {
        req.reply('');
    });
})

Cypress.Commands.add('stubCssRequests', () => {

    return cy.intercept('GET', '*.css', (req: Request) => {
        req.reply('');
    });

})

Cypress.Commands.add('stubImageRequests', () => {

    cy.intercept('GET', 'https://m.media-amazon.com/images/*', (req: Request) => {
        req.reply('');
    });
    cy.intercept('HEAD', 'https://m.media-amazon.com/images/*', (req: Request) => {
        req.reply('');
    });
})

Cypress.Commands.add('stubXHRRequests', () => {
    cy.intercept('GET', '*.xhr', (req: Request) => {
        req.reply('');
    });
    cy.intercept('HEAD', 'https://completion.amazon.in/api/2017/*', (req: Request) => {
        req.reply('');
    });
    cy.intercept('GET', 'https://completion.amazon.in/api/2017/*', (req: Request) => {
        req.reply('');
    });
    cy.intercept('GET', '/af/feedback-link?*', (req: Request) => {
        req.reply('');
    });

})

Cypress.Commands.add('stubNexusRequests', () => {

    cy.intercept('POST', '*.nexus', (req: Request) => {
        req.reply('');
    });

    cy.intercept('POST', '*.prod', (req: Request) => {
        req.reply('');
    })

})


