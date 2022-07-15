import { interceptChangeEmail, interceptSignIn } from 'cypress/utils/Auth';

describe('Account', () => {
  describe('Account settings', () => {
    beforeEach(() => {
      // Start from the index page
      cy.visit('/');

      // Go to login page
      cy.findByText('Login').click();

      // Intercept AWS Cognito request when signing in
      interceptSignIn(cy);

      // Fill the login form
      cy.get('#email').type('random@email.com');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Sign in' }).click();

      // Click on the avatar menu
      // In E2E testing environment the email is mocked and the mocked email is from `NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL`
      // This is why the avatar text is `TE`, the two first letter.
      cy.findByRole('button', { name: 'te' }).click();

      // Click on the sign out button in the avatar menu
      cy.findByRole('menu').findByRole('menuitem', { name: 'Account' }).click();
    });

    it('should simulate the email change workflow', () => {
      // Intercept AWS Cognito request for email change
      interceptChangeEmail(cy);

      // Open the email change dialog
      cy.findAllByTestId('setting-line')
        .filter(':contains("Email address")')
        .within(() => {
          // It should display correctly the email address
          cy.findByText('test@example.com').should('exist');

          // Show the change email address dialog
          cy.findByRole('button', { name: 'Change' }).click();
        });

      // Fill the form
      cy.findByRole('dialog').get('#email').type('random@email.com');
      cy.findByRole('button', { name: 'Save' }).click();

      // Intercept AWS Cognito request
      cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        statusCode: 200,
      });

      // Verify the new email address
      cy.findByRole('dialog')
        .get('#verificationCode')
        .type('RANDOM_VERIFICATION_CODE');
      cy.findByRole('button', { name: 'Save' }).click();

      // Wait for dialog to be closed
      cy.findByRole('dialog').should('not.exist');

      // Verify if it has redirected back to account settings
      cy.location('pathname').should('eq', '/dashboard/account/');
      cy.findAllByTestId('setting-line')
        .findByText('Email address')
        .should('exist');
    });

    it('should simulate the password change workflow', () => {
      // Intercept AWS Cognito request
      cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        statusCode: 200,
      });

      // Open the password change dialog
      cy.findAllByTestId('setting-line')
        .filter(':contains("Password")')
        .findByRole('button', { name: 'Change' })
        .click();

      // Fill the password change dialog
      cy.findByRole('dialog').within(() => {
        cy.get('#oldPassword').type('RANDOM_OLD_PASSWORD');

        cy.get('#newPassword').type('RANDOM_NEW_PASSWORD');

        cy.findByRole('button', { name: 'Save' }).click();
      });

      // Verify if it displays the success message
      cy.findByText('Your password has been updated');
      cy.findByText('Go back to Dashboard').click();

      // Verify if it has redirected to the dashboard
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });
  });
});
