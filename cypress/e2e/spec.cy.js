
describe('empty spec', () => {
  it('Login', () => {
    cy.visit("http://localhost:3000")
    cy.get('#email').type("admin")
    cy.get('#input-senha-login').type("admin123");
    cy.get('#btn-login').click();
  })
})