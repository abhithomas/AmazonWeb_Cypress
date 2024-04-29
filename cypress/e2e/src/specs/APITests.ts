import * as apiData from '../../../fixtures/registration_api_body.json'

describe('API Tests', () => {
    const baseUrl = 'https://reqres.in/api/register';

    it('Verify successful registration process', () => {
        cy.request('POST', baseUrl, apiData).then((response: Response) => {
            expect(response.status).to.eq(200);
            // @ts-ignore
            expect(response.body.id).to.be.greaterThan(1).lessThan(10);
            // @ts-ignore
            expect(response.body.token).to.match(/^[a-zA-Z0-9]+$/);
        })
    })

    it('Verify incorrect email results in unsuccessful registration', () => {
        const modifiedData = JSON.parse(JSON.stringify(apiData));
        modifiedData.email = 'abcd';

            cy.request({
                method: 'POST',
                url: baseUrl,
                body: modifiedData,
                failOnStatusCode: false
            }).then((response: Response) => {
                expect(response.status).to.eq(400);
                // @ts-ignore
                expect(response.body.error).to.eq('Note: Only defined users succeed registration');
            });
        });
    // });
})



