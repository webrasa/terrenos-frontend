import { nanoid } from 'nanoid';

describe('Todo', () => {
  beforeEach(() => {
    cy.visit('/dashboard');

    // Display team selection and choose "create new team" option
    cy.findByTestId('team-selection').click();
    cy.findByText('Create new team').click();

    // Create a new team with random name
    cy.get('#displayName').type(nanoid());
    cy.findByRole('button', { name: 'Create' }).click();

    cy.url().should('include', '/dashboard');
  });

  describe('CRUD operation', () => {
    it('should create, read, edit and delete todo', () => {
      // Add a new todo
      cy.findByTestId('message-state').within(() => {
        cy.findByRole('link', { name: 'Add Todo' }).click();
      });
      cy.get('#title').type('New random todo title');
      cy.findByRole('button', { name: 'Save' }).click();

      // Verify the new todo is correctly created
      cy.url().should('include', '/dashboard');
      cy.findByText('New random todo title');

      // Edit the newly created todo
      cy.findByRole('link', { name: 'Edit' }).click();
      cy.get('#title').clear().type('New random todo edited');
      cy.findByRole('button', { name: 'Save' }).click();

      // Verify the todo is correctly edited
      cy.url().should('include', '/dashboard');
      cy.findByText('New random todo edited');

      // Delete the newly created todo
      cy.findByRole('button', { name: 'Delete' }).click();
      cy.findByRole('dialog').within(() => {
        cy.findByRole('button', { name: 'Delete' }).click();
      });

      // When there is no todo, it should display the message state.
      cy.findByTestId('message-state').should('exist');
    });
  });
});
