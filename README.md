# Shell_Assignment_Cypress

This Assignments consists of UI cases of searching product from amazon, adding , verifying and checkout process
and API cases of URL - 'https://reqres.in/api/register'

Here is a brief overview for the framework made in Cypress:

**1.** **cypress:** This is the main folder containing all the Cypress-related files and directories.
   **e2e/src:** This directory contains the source files for end-to-end (e2e) tests.
     **pages:** This directory contains page object model (POM) files, which represent different pages of the web application under test.
        **Cart_Page.ts:** Represents the cart page.
        **CheckoutPage.ts:** Represents the checkout page.
        **Home_Page.ts:** Represents the home page.
        **Login_Page.ts:** Represents the login page.
        **pom.interface.ts:** Interface for defining page objects.

   ** specs:** This directory contains test specification files.
        **APITests.ts:** Contains tests related to API testing.
        **AddProduct_Checkout.ts:** Contains tests related to adding products to the cart and checkout process.
    **fixtures:** This directory contains fixtures, such as mock data or test data, used in the tests.
    **support:** This directory contains custom commands or utilities, used in the tests.
   
**2.** **node_modules**: This directory contains all the installed dependencies for the project, managed by npm (Node Package Manager).
**3.** **browserstack.json:** This file contains  configuration settings for running tests on BrowserStack, a cloud-based testing platform. I am currently running on one browser only and it can be configured for parallel testing as well
**4.** **cypress.config.ts:** This file contains configuration settings for Cypress, such as defaultcommand timeout, spec pattern, etc.
**5.** ***package.json:** This file contains metadata about the project and dependencies.
**6.** **tsconfig.json:** This file contains TypeScript compiler options and project settings.


The project is set up for end-to-end testing using Cypress, with separate folders for page objects, test specifications, fixtures, and support files. Additionally, there are configuration files for Cypress, npm, and TypeScript.


