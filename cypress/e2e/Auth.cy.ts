import {
  interceptMfaSignIn,
  interceptSignIn,
  interceptSuccessfullySignIn,
} from '../utils/Auth';

describe('Auth', () => {
  describe('Basic authentication', () => {
    it('should sign up a new user using email and automatically redirect to dashboard', () => {
      // Start from the index page
      cy.visit('/');

      // Go to signup page
      cy.findByText('Start Free Trial').click();

      // Intercept AWS Cognito request
      cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        statusCode: 200,
      });

      // Fill the signup form
      cy.get('#email').type('random@email.com');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Sign up' })
        .click()
        .should(() => {
          // Verify the session storage is correctly set
          expect(sessionStorage.getItem('confirm-signup-email')).to.eq(
            'random@email.com'
          );
        });

      // Verify if it has successfully redirected to `confirm-signup` page
      cy.location('pathname').should('eq', '/confirm-signup/');

      // Intercept AWS Cognito request when signing in
      // We automatically sign in the user when he has successfully confirm the email after signing up
      interceptSignIn(cy);
      interceptSuccessfullySignIn(cy);

      // Fill the confirm-sign form
      cy.get('#verificationCode').type('RANDOM_VERIFICATION_CODE');
      cy.findByRole('button', { name: 'Confirm' }).click();

      // Display the success page for email confirmation
      cy.findByText('Your email has been verified');

      // Verify the url after clicking the link
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });

    it('should sign up a new user using email and manually redirect to dashboard', () => {
      // Start from the index page
      cy.visit('/');

      // Go to signup page
      cy.findByText('Start Free Trial').click();

      // Intercept AWS Cognito request
      cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        statusCode: 200,
      });

      // Fill the signup form
      cy.get('#email').type('random@email.com');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Sign up' })
        .click()
        .should(() => {
          // Verify the session storage is correctly set
          expect(sessionStorage.getItem('confirm-signup-email')).to.eq(
            'random@email.com'
          );
        });

      // Verify if it has successfully redirected to `confirm-signup` page
      cy.location('pathname').should('eq', '/confirm-signup/');

      // Fill the confirm-sign form
      cy.get('#verificationCode').type('RANDOM_VERIFICATION_CODE');
      cy.findByRole('button', { name: 'Confirm' }).click();

      // Display the success page for email confirmation
      cy.findByText('Your email has been verified');
      cy.findByText('Go to dashboard').click();

      // Verify the url after clicking the link
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });

    it('should reset a new password when the user forget his password', () => {
      // Start with the password recovery page
      cy.visit('/forgot-password/');

      // Intercept AWS Cognito request
      cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        statusCode: 200,
      });

      // Fill the password recovery form
      cy.get('#email').type('random@email.com');
      cy.findByRole('button', { name: 'Send email' })
        .click()
        .should(() => {
          // Verify the session storage is correctly set
          expect(sessionStorage.getItem('confirm-forgot-password-email')).to.eq(
            'random@email.com'
          );
        });

      // Verify if it has successfully redirected
      cy.location('pathname').should('eq', '/confirm-forgot-password/');

      // Intercept AWS Cognito request when signing in
      // We automatically sign in the user when he has successfully changed his password
      interceptSignIn(cy);
      interceptSuccessfullySignIn(cy);

      // Fill the form
      cy.get('#verificationCode').type('RANDOM_VERIFICATION_CODE');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Reset password' }).click();

      // Verify if it has redirected to the dashboard
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });

    it('should login with email and password', () => {
      // Start from the index page
      cy.visit('/');

      // Go to login page
      cy.findByText('Login').click();

      // Intercept AWS Cognito request when signing in
      interceptSignIn(cy);
      interceptSuccessfullySignIn(cy);

      // Fill the login form
      cy.get('#email').type('random@email.com');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Sign in' }).click();

      // Verify if it has redirected to the dashboard
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });

    it('should login with email and password with multi-factor authentication', () => {
      // Start from the index page
      cy.visit('/');

      // Go to login page
      cy.findByText('Login').click();

      // Intercept AWS Cognito request when signing in
      interceptSignIn(cy);
      interceptMfaSignIn(cy);

      // Fill the login form
      cy.get('#email').type('random@email.com');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Sign in' }).click();

      cy.findByText('Two-Factor Authentication').should('exist');

      interceptSuccessfullySignIn(cy);

      // Fill the MFA form
      cy.get('#mfaCode').type('123123');
      cy.findByRole('button', { name: 'Verify' }).click();

      // Verify if it has redirected to the dashboard
      cy.location('pathname').should('eq', '/dashboard/');
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .should('exist');
    });

    it('should sign out using link in the sidebar', () => {
      cy.visit('/dashboard');

      // Click on the sign out button
      cy.findByRole('link', { name: 'Sign Out' }).click();

      // Verify if it has redirected to the landing page
      cy.location('pathname').should('eq', '/');
      cy.findByRole('link', { name: 'Login' }).should('exist');
    });

    it('should sign out using link in the avatar menu', () => {
      cy.visit('/dashboard');

      // Click on the avatar menu
      // In E2E testing environment the email is mocked and the mocked email is from `NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL`
      // This is why the avatar text is `TE`, the two first letter.
      cy.findByRole('button', { name: 'te' }).click();

      // Click on the sign out button in the avatar menu
      cy.findByRole('menu')
        .findByRole('menuitem', { name: 'Sign Out' })
        .click();

      // Verify if it has redirected to the landing page
      cy.location('pathname').should('eq', '/');
      cy.findByRole('link', { name: 'Login' }).should('exist');
    });
  });
});
