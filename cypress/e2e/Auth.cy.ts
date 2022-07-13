describe('Auth', () => {
  describe('Basic authentication', () => {
    it('should sign up a new user using email', () => {
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

      // Verify it has successfully redirected to `confirm-signup`
      cy.location('pathname').should('eq', '/confirm-signup/');

      // Fill the confirm-sign form
      cy.get('#verificationCode').type('RANDOM_VERIFICATION_CODE');
      cy.findByRole('button', { name: 'Confirm' }).click();

      // Display the success page for email confirmation
      cy.findByText('Your email has been verified');
      cy.findByText('Go to login').click();

      // Verify the url after clicking the 'Go to login' link
      cy.location('pathname').should('eq', '/login/');
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

      // Verify it has successfully redirected
      cy.location('pathname').should('eq', '/confirm-forgot-password/');

      // Fill the form
      cy.get('#verificationCode').type('RANDOM_VERIFICATION_CODE');
      cy.get('#password').type('RANDOM_PASSWORD_TEST');
      cy.findByRole('button', { name: 'Reset password' }).click();
    });
  });
});
