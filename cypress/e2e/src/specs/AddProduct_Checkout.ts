import { productPage } from "../pages/ProductPage";
import * as credentials from "../../../fixtures/credentials.json";
import * as staticData from "../../../fixtures/data.json";
import { cartPage } from "../pages/Cart_Page";
import { checkOutPage } from "../pages/CheckoutPage";

describe("Search, Add product and checkout", () => {
  let brandNameProduct: string;
  let whole_price: string;

  beforeEach(() => {
    cy.log("Stubbing requests")
      .then(() => cy.stubCssRequests())
      .then(() => cy.stubVideoRequests())
      .then(() => cy.stubXHRRequests())
      .then(() => cy.stubNexusRequests())
      .then(() =>
        cy.loginWithSession(credentials.userName, credentials.passWord)
      )
      .then(() => productPage.navigate.visitApplication());
  });

  it("Verify product selected reflects same in cart", { retries: 1 }, () => {
    cartPage.navigate
      .visitApplication()
      .then(() => cartPage.actions.deleteCartItemsRecursively())
      .then(() => cy.stubImageRequests())
      .then(() => productPage.actions.searchProduct(staticData.searchKey))
      .then(() =>
        productPage.actions.selectRandomResult(
          productPage.actions.getRandomNumber()
        )
      )
      .then(() => {
        productPage.elements
          .brand_name()
          .should("be.visible")
          .invoke("text")
          .then((text: string) => {
            brandNameProduct = text.trim().split(" ")[0];
          });
        productPage.elements
          .whole_price()
          .should("be.visible")
          .invoke("text")
          .then((text: string) => {
            whole_price = text.trim();
          });
      })
      .then(() => productPage.actions.clickAddToCart())
      .then(() => cartPage.navigate.visitApplication())
      .then(() =>
        cartPage.elements
          .brandName()
          .first()
          .invoke("text")
          .then((text: any) => {
            const brandNameCart = text.trim().split(" ")[0];
            expect(brandNameCart).to.equal(brandNameProduct);
          })
      )
      .then(() =>
        cartPage.elements
          .productPrice()
          .first()
          .invoke("text")
          .then((text: string) => {
            const extractedPriceCart = text.replace(/[^\d.]+/g, "").trim();
            const priceStringCart = extractedPriceCart
              .split(".")[0]
              .replace(/\D/g, "");
            expect(priceStringCart).to.contain(whole_price);
          })
      )
      .then(() => cartPage.actions.clickProceedToBuy())
      .then(() => checkOutPage.actions.clickUseThisAddress())
      .then(() =>
        checkOutPage.elements
          .orderTotalPrice()
          .should("be.visible")
          .scrollIntoView()
          .invoke("text")
          .then((orderTotalPrice: string) => {
            const checkoutPriceCart = orderTotalPrice
              .replace(/[^\d.]+/g, "")
              .trim();
            const priceCheckoutCart = checkoutPriceCart
              .split(".")[0]
              .replace(/\D/g, "");
            expect(priceCheckoutCart).to.contain(whole_price);
          })
      );
  });

  /*
        The below test case can be considered as a functional issue where in price input tab,
        strings and alphanumeric keywords can be entered and no error is thrown
     */
  it("Verify min max price can be entered only in numeric", () => {
    productPage.actions
      .searchProduct(staticData.searchKey)
      .then(() => productPage.actions.expandAllFilter())
      .then(() => productPage.actions.enterMinPrice("abcd"))
      .then(() => productPage.actions.enterMaxPrice("-34abcd"))
      .then(() => productPage.actions.clickGoButton())
      .then(() => productPage.elements.errorMsg().should("be.visible"));
  });
});
