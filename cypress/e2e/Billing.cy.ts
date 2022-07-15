describe('Billing', () => {
  describe('Simulated endpoint', () => {
    it('should call the API endpoint for creating a Stripe checkout session', () => {
      cy.visit('/dashboard');

      // Go to the settings page
      cy.findByRole('link', { name: 'Settings' }).click();

      // Go to the upgrade page
      cy.findByRole('link', { name: 'Upgrade Plan' }).click();

      // Intercept backend call to avoid Stripe call
      const createCheckoutSpy = cy.spy().as('create-checkout-spy');
      cy.intercept(
        'POST',
        `${Cypress.env('API_URL')}/**/billing/create-checkout-session`,
        (req) => {
          req.continue((res) => {
            createCheckoutSpy();

            res.send({ statusCode: 200, body: {} });
          });
        }
      );

      // Select the PRO plan
      cy.findAllByTestId('pricing-card')
        .filter(':contains("PRO")')
        .findByText('Choose This Plan')
        .click();

      // Verify the endpoint has been called
      cy.get('@create-checkout-spy').should('be.called');

      // The session returned by the mocked backend is empty, the redirection won't work
      cy.location('pathname').should('eq', '/dashboard/upgrade/');
      cy.findAllByTestId('pricing-card')
        .filter(':contains("PRO")')
        .findByText('Choose This Plan')
        .should('not.be.disabled');
    });
  });
});
