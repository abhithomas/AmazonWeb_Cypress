import * as apiData from "../../../fixtures/registrationUsersBody.json";
import * as createUserData from "../../../fixtures/createUsersBody.json";

describe("API Tests", () => {
  const baseUrl = "https://reqres.in/api";

  it("Verify successful users creation", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      body: createUserData,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(createUserData.name);
      expect(response.body.job).to.equal(createUserData.job);
    });
  });

  it("Verify incorrect email results in unsuccessful registration", () => {
    const modifiedData = JSON.parse(JSON.stringify(apiData));
    modifiedData.email = "abcd";

    cy.request({
      method: "POST",
      url: `${baseUrl}/register`,
      body: modifiedData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq(
        "Note: Only defined users succeed registration"
      );
    });
  });
});
