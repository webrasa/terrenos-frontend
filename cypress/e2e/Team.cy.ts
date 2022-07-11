import { nanoid } from 'nanoid';

describe('Todo', () => {
  const teamName = nanoid();

  beforeEach(() => {
    cy.visit('/dashboard');

    // Display team selection and choose "create new team" option
    cy.findByTestId('team-selection').click();
    cy.findByText('Create new team').click();

    // Create a new team with random name
    cy.get('#displayName').type(teamName);
    cy.findByRole('button', { name: 'Create' }).click();

    // In team, we also verify if it redirects to index dashboard
    cy.url().should('include', '/dashboard');
  });

  describe('CRUD operation', () => {
    it('should edit team display name', () => {
      const editTeamName = `${teamName}EDITED`;

      // Verify the created team appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('exist');

      // Go to the settings page
      cy.findByRole('link', { name: 'Settings' }).click();
      cy.findAllByTestId('setting-line')
        .filter(':contains("Display name")')
        .within(() => {
          // In the settings, it should display correctly the team name
          cy.findByText(teamName).should('exist');

          // Show the change team name dialog
          cy.findByRole('button', { name: 'Change' }).click();
        });
      cy.findByRole('dialog').get('#displayName').type(editTeamName);
      cy.findByRole('button', { name: 'Save' }).click();

      // Wait for dialog to be closed
      cy.findByRole('dialog').should('not.exist');
      // Verify the team display name is correctly edited
      cy.findAllByTestId('setting-line')
        .filter(':contains("Display name")')
        .within(() => {
          cy.findByText(editTeamName).should('exist');
        });

      // Verify the edited team display name appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(editTeamName).should('exist');
    });
  });
});
