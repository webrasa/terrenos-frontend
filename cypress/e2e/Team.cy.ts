import { nanoid } from 'nanoid';

describe('Todo', () => {
  describe('CRUD operation', () => {
    it('should', () => {
      const teamName = nanoid();

      cy.visit('/dashboard');

      // Display team selection and choose "create new team" option
      cy.findByTestId('team-selection').click();
      cy.findByText('Create new team').click();

      // Create a new team with random name
      cy.get('#displayName').type(teamName);
      cy.findByRole('button', { name: 'Create' }).click();

      cy.url().should('include', '/dashboard');

      // Verify the created team appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('exist');

      // Go to the settings page
      cy.findByRole('link', { name: 'Settings' }).click();
      // In the settings, it should display correctly the team name
      cy.findAllByTestId('setting-line').findByText(teamName).should('exist');
    });
  });
});
