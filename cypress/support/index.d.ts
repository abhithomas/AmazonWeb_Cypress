declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginWithSession(email: any, password: any): void

        stubVideoRequests(): void

        stubXHRRequests(): void

        stubNexusRequests(): void

        stubCssRequests(): void

        stubImageRequests(): void
    }
}
