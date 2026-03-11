describe('Guest User Flow', () => {
  // Before each test, visit the home page
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=guest-login-button]').click(); 
  });

  it('logs in as guest, adds a journal entry, and verifies it', () => {
      
    cy.get('[data-cy=journal-entry]').then(($entries) => {
    const initialCount = $entries.length;

    cy.get('[data-cy=add-entry-button]').click(); 

    cy.get('[data-cy=journal-entry]').should('have.length', initialCount + 1);
    });
  });

  it('logs in as guest, adds an applicationy, and verifies it', () => {
    cy.get('[data-cy=applications-link]').click();

    cy.get('[data-cy=interview-entry]').then(($entries) => {
    const initialCount = $entries.length;

    cy.get('[data-cy=add-application-button]').click(); 

    cy.get('[data-cy=interview-entry]').should('have.length', initialCount + 1);
    });
  });

 
});