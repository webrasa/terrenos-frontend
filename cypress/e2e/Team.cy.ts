import { nanoid } from 'nanoid';

describe('Team', () => {
  const teamName = nanoid();

  beforeEach(() => {
    cy.visit('/dashboard');

    // Display team selection and choose "create new team" option
    cy.findByTestId('team-selection').click();
    cy.findByText('Create new team').click();

    // Create a new team with random name
    cy.get('#displayName').type(teamName);
    cy.findByRole('button', { name: 'Create' }).click();

    // In team, we also verify if it redirects to dashboard index
    cy.location('pathname').should('eq', '/dashboard/');
  });

  describe('Team settings', () => {
    it('should edit team display name', () => {
      const editTeamName = `${teamName}EDITED`;

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

    it('should delete the newly created team', () => {
      // Go to the settings page
      cy.findByRole('link', { name: 'Settings' }).click();

      // Verify the created team appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('exist');

      // Open the delete team dialog and confirm the deletion
      cy.findAllByTestId('setting-line')
        .filter(':contains("Delete team")')
        .findByRole('button', { name: 'Delete' })
        .click();
      cy.findByRole('button', { name: 'Delete forever' }).click();

      // Verify the edited team display name not appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('not.exist');
    });
  });

  describe('Team members', () => {
    it('should remove the default user from the team', () => {
      // Go to the team members list
      cy.findByRole('link', { name: 'Members' }).click();

      // Verify the created team appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('exist');

      // `test@example.com` is the default user for development environment
      // Remove himself from the team
      cy.findAllByRole('row')
        .filter(':contains("test@example.com")')
        .findByRole('button', { name: 'Remove' })
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Remove' }).click();

      // After leaving the team, the team display name shouldn't appears in the team selection
      cy.findByTestId('team-selection').click();
      cy.findByRole('listbox').findByText(teamName).should('not.exist');
    });

    it('should invite and delete user', () => {
      // Go to the team members list
      cy.findByRole('link', { name: 'Members' }).click();

      // Invite new user
      cy.findByText('Invite member').click();
      cy.findByRole('dialog').get('#email').type('random@email.com');
      cy.findByRole('button', { name: 'Send' }).click();

      // Verify the new team member appears in the list
      cy.findByText('random@email.com').should('exist');
      cy.findAllByRole('row')
        .filter(':contains("random@email.com")')
        .findByText('PENDING')
        .should('exist');

      // Remove the invitation
      cy.findAllByRole('row')
        .filter(':contains("random@email.com")')
        .findByRole('button', { name: 'Remove' })
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Remove' }).click();

      // Verify the invitation is now removed
      cy.findByText('random@email.com').should('not.exist');
    });
  });
});
