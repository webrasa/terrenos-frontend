import { nanoid } from 'nanoid';

import { MemberRole } from '@/types/IMember';
import { SubscriptionPlan } from '@/types/SubscriptionPlan';

describe('Billing', () => {
  describe('Simulated endpoint', () => {
    beforeEach(() => {
      cy.visit('/dashboard');

      // Display team selection and choose "create new team" option
      cy.findByTestId('team-selection').click();
      cy.findByText('Create new team').click();

      // Create a new team with random name
      cy.get('#displayName').type(nanoid());
      cy.findByRole('button', { name: 'Create' }).click();

      // Wait until the team has been created
      cy.location('pathname').should('eq', '/dashboard/');

      // Go to the settings page
      cy.findByRole('link', { name: 'Settings' }).click();
    });

    it('should call the API endpoint for creating a Stripe checkout session', () => {
      // Go to the upgrade page
      cy.findByRole('link', { name: 'Upgrade Plan' }).click();

      // Intercept backend call to avoid Stripe call
      const createCheckoutSpy = cy.spy().as('create-checkout-spy');
      cy.intercept(
        'POST',
        `${Cypress.env('API_URL')}/*/billing/create-checkout-session`,
        (req) => {
          req.continue((res) => {
            createCheckoutSpy();

            res.send({ statusCode: 200, body: {} });
          });
        },
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

    it('should simulate a redirection to the Stripe customer portal to manage subscription', () => {
      // Intercept backend call to avoid Stripe call
      cy.intercept('GET', `${Cypress.env('API_URL')}/team/*/settings`, {
        statusCode: 200,
        body: {
          hasStripeCustomerId: true,
          planId: SubscriptionPlan.PRO,
          planName: 'Pro',
          role: MemberRole.OWNER,
        },
      });
      cy.intercept(
        'POST',
        `${Cypress.env('API_URL')}/*/billing/customer-portal`,
        {
          statusCode: 200,
          body: {
            url: 'RANDOM_REDIRECT_URL',
          },
        },
      );

      // Verify upgrade button is hidden for non-FREE user
      cy.findByRole('link', { name: 'Upgrade Plan' }).should('not.exist');

      // Open Stripe customer portal
      cy.findByText('Manage Plan').click();

      // Verify if it has successfully redirected
      // Only in testing environment, it redirects to a random url
      cy.location('pathname').should(
        'eq',
        '/dashboard/settings/RANDOM_REDIRECT_URL/',
      );
    });
  });
});
