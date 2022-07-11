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
  });

  describe('CRUD operation', () => {
    it('should create, read, edit and delete todo', () => {
      // Add a new todo
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .click();
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
      cy.findByRole('dialog').findByRole('button', { name: 'Delete' }).click();

      // When there is no todo, it should display the message state.
      cy.findByTestId('message-state').should('exist');
    });

    it('should create 5 todos, edit 2 and delete 2, simulating a complex workflow', () => {
      // Add the 1st todos
      cy.findByTestId('message-state')
        .findByRole('link', { name: 'Add Todo' })
        .click();
      cy.get('#title').type('New random todo title 1');
      cy.findByRole('button', { name: 'Save' }).click();

      // Add the 2nd todo
      cy.findByRole('link', { name: 'New Todo' }).click();
      cy.get('#title').type('New random todo title 2');
      cy.findByRole('button', { name: 'Save' }).click();

      // Add the 3rd todo
      cy.findByRole('link', { name: 'New Todo' }).click();
      cy.get('#title').type('New random todo title 3');
      cy.findByRole('button', { name: 'Save' }).click();

      // Edit the 2nd todo by changing the title
      cy.findAllByRole('link', { name: 'Edit' })
        .should('have.length', 3)
        .eq(1)
        .click();
      cy.get('#title').clear().type('New random todo edited 2');
      cy.findByRole('button', { name: 'Save' }).click();

      // Verify the 2nd todo is correctly edited
      cy.findByText('New random todo edited 2');

      // Add the 4th todo
      cy.findByRole('link', { name: 'New Todo' }).click();
      cy.get('#title').type('New random todo title 4');
      cy.findByRole('button', { name: 'Save' }).click();

      // Delete the 3rd todo
      cy.findByText('New random todo title 3').should('exist');
      cy.findAllByRole('button', { name: 'Delete' })
        .should('have.length', 4)
        .eq(2)
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Delete' }).click();
      cy.findByText('New random todo title 3').should('not.exist');

      // Add the 5th todo
      cy.findByRole('link', { name: 'New Todo' }).click();
      cy.get('#title').type('New random todo title 5');
      cy.findByRole('button', { name: 'Save' }).click();

      // Edit the newly created todo
      cy.findAllByRole('link', { name: 'Edit' })
        .should('have.length', 4)
        .eq(3)
        .click();
      cy.get('#title').clear().type('New random todo edited 5');
      cy.findByRole('button', { name: 'Save' }).click();

      // Verify the newly created is correctly edited
      cy.findByText('New random todo edited 5');

      // Delete the newly created
      cy.findByText('New random todo edited 5').should('exist');
      cy.findAllByRole('button', { name: 'Delete' })
        .should('have.length', 4)
        .eq(3)
        .click();
      cy.findByRole('dialog').findByRole('button', { name: 'Delete' }).click();
      cy.findByText('New random todo edited 5').should('not.exist');

      // Verify the end result
      cy.findByText('New random todo title 1').should('exist');
      cy.findByText('New random todo title 2').should('not.exist');
      cy.findByText('New random todo edited 2').should('exist');
      cy.findByText('New random todo title 3').should('not.exist');
      cy.findByText('New random todo title 4').should('exist');
      cy.findByText('New random todo title 5').should('not.exist');
    });
  });
});
