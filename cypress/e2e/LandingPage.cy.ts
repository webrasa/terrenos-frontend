describe('Landing page', () => {
  describe('Render', () => {
    it('should render the landing page correctly', () => {
      // Start from the index page
      cy.visit('/');

      cy.findByRole('link', { name: 'Login' })
        .should('exist')
        .invoke('attr', 'href')
        .should('include', '/login');

      cy.findByRole('link', { name: 'Start Free Trial' })
        .should('exist')
        .invoke('attr', 'href')
        .should('include', '/signup');

      cy.findByText(/© Copyright.*All Rights Reserved./).should('exist');
    });
  });
});
