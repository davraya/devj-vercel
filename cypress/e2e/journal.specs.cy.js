describe('User journal actions', () => {
  // Before each test, visit the home page
  beforeEach(() => {
    cy.intercept('PATCH', '**/api/journal/**/add-entry**').as('addEntry')

    cy.visit('http://localhost:3000');
    cy.get('[data-cy=guest-login-button]').click(); 
    cy.get('[data-cy=add-entry-button]').click(); 
    cy.wait('@addEntry')

  });

  it('edit a journal entry\'s title and content', () => {
    cy.intercept('PATCH', '**/api/journal/**/edit-entry**').as('saveEntry')

    cy.get('[data-cy=journal-list-content]').children().first().click();
    cy.get('[data-cy=journal-title-input]').type('{selectall}{backspace}').type('First Test Entry');

    cy.wait('@saveEntry')
    cy.get('[data-cy=journal-title-input').should('have.value', 'First Test Entry');

    cy.get('[data-cy=journal-content-textarea]').type('{selectall}{backspace}').type('Test entry content.');

    cy.wait('@saveEntry')
    cy.get('[data-cy=journal-content-textarea]').should('have.value', 'Test entry content.');
  });

  it('delete a journal entry', () => {
    cy.intercept('DELETE', '**/api/journal/**/delete-entry**').as('deleteEntry')

    cy.get('[data-cy=journal-list-content]').children().first().click();
    cy.get('[data-cy=journal-three-dots]').click();
    cy.get('[data-cy=delete-entry-button]').click();

    cy.wait('@deleteEntry');
    
    cy.get('[data-cy=journal-list-content]').children().should('not.contain', "Untitled");  

  });

 
});