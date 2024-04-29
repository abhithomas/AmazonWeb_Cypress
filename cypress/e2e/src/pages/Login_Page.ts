import { Pom } from "./pom.interface";

const elements = {
  emailTab: () => cy.get('input#ap_email'),
  continueButton: () => cy.get('input#continue'),
  passwordTab: () => cy.get('input#ap_password'),
  signInTab: () => cy.get('input#signInSubmit'),
  welcomeUserMessage: () => cy.get('#nav-link-accountList-nav-line-1'),
  amazonLogo: () => cy.get('[aria-label=\'Amazon.in\']')
}

const actions = {

  enterUserName(emailId: string){
    return elements.emailTab().should("be.visible").type(emailId)
  },

  enterPassword(password: string){
    return elements.passwordTab().should("be.visible").type(password)
  },

  clickContinueButton(){
    return elements.continueButton().should("be.visible").click({force: true})
  },

  clickSignInButton(){
    return elements.signInTab().should("be.visible").click({force: true})
  },
}

const navigate = {
  visitApplication() {
   cy.visit('https://www.amazon.in/')
  }
}

type LoginPagePom = Pom<typeof elements, typeof actions, typeof navigate>

export const LoginPage: LoginPagePom = {
  elements,
  actions,
  navigate,
};
