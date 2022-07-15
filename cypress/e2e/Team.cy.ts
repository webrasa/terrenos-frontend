import { nanoid } from 'nanoid';

import type { IMemberList } from '@/pages/dashboard/members';
import type { Team, UserProfile } from '@/types/Auth';
import type { IMember } from '@/types/IMember';

describe('Team', () => {
  let teamName: string;

  beforeEach(() => {
    teamName = nanoid();

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
        .findByText(editTeamName)
        .should('exist');

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

    it('should create 3 invitation and delete 2, simulating a complex workflow', () => {
      // Go to the team members list
      cy.findByRole('link', { name: 'Members' }).click();

      // Invite 1st user
      cy.findByText('Invite member').click();
      cy.findByRole('dialog').get('#email').type('random1@email.com');
      cy.findByRole('button', { name: 'Send' }).click();

      // Invite 2nd user
      cy.findByText('Invite member').click();
      cy.findByRole('dialog').get('#email').type('random2@email.com');
      cy.findByRole('button', { name: 'Send' }).click();

      // Remove the 2nd invitation
      cy.findByText('random2@email.com').should('exist');
      cy.findAllByRole('row')
        .filter(':contains("random2@email.com")')
        .findByRole('button', { name: 'Remove' })
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Remove' }).click();

      // Verify the invitation is now removed
      cy.findByText('random2@email.com').should('not.exist');

      // Invite 3rd user
      cy.findByText('Invite member').click();
      cy.findByRole('dialog').get('#email').type('random3@email.com');
      cy.findByRole('button', { name: 'Send' }).click();

      // Remove the 1st invitation
      cy.findByText('random1@email.com').should('exist');
      cy.findAllByRole('row')
        .filter(':contains("random1@email.com")')
        .findByRole('button', { name: 'Remove' })
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Remove' }).click();

      // Verify the 1st invitation is removed
      cy.findByText('random1@email.com').should('not.exist');

      // Verify the end result and the last invitation is still in the list
      cy.findByText('random3@email.com').should('exist');
    });

    it('should go to the invitation page and display the sender email along with team display name', () => {
      // Go to the team members list
      cy.findByRole('link', { name: 'Members' }).click();

      // Invite new user
      cy.findByText('Invite member').click();
      cy.findByRole('dialog').get('#email').type('random@email.com');
      cy.findByRole('button', { name: 'Send' }).click();

      // Verify the new team member appears in the list
      cy.findByText('random@email.com').should('exist');

      // Get team ID
      cy.request(
        'GET',
        `${Cypress.env('API_URL')}/user/profile?email=test@example.com`
      )
        .then((response: Cypress.Response<UserProfile>) => {
          const teamList = response.body.teamList.filter(
            (elt) => elt.displayName === teamName
          );

          expect(teamList).to.have.length(1);

          return teamList[0];
        })
        .as('team');

      // Get the new user from team member list
      cy.get<Team>('@team')
        .then((team) => {
          cy.request(
            'GET',
            `${Cypress.env('API_URL')}/team/${team.id}/list-members`
          ).then((response: Cypress.Response<IMemberList>) => {
            const memberList = response.body.list.filter(
              (elt) => elt.email === 'random@email.com'
            );

            expect(memberList).to.have.length(1);

            return {
              newMember: memberList[0],
              teamId: team.id,
            };
          });
        })
        .as('member');

      // Go to join page to accept the invitation
      cy.get<{
        newMember: IMember;
        teamId: string;
      }>('@member').then((member) => {
        cy.visit(
          `/join?teamId=${member.teamId}&verificationCode=${member.newMember.memberId}`
        );
      });

      // Verify the join is correctly rendered by display useful information
      cy.findByText('test@example.com').should('exist');
      cy.findByText(teamName).should('exist');

      // Accept the invitation
      cy.findByRole('button', { name: 'Accept invite' }).click();

      // After accepting the invitation, it should display "the user is already a team member".
      // In development and testing environment with the default configuration, the authentication is bypassed.
      // So, we can't change user and the error is expected.
      // If the errors is displayed, it means the API endpoint has been called and reached.
      // With a real authentication, the errors won't be displayed and the user will join the team.
      cy.findByText("You're already a member of the team").should('exist');
    });
  });
});
