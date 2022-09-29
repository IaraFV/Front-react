/// <reference types='cypress' />

describe('home', () => {
    it('teste', () => {
        cy.visit('http://localhost:3000/')
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

        //Link de direcionamento para a pag de pessoa 
        //( ver mais (card de pessoas de home))
        cy.get(':nth-child(1) > #org-lista > :nth-child(2) > #link-pessoa-page-pessoa > #btn-ver-usuario-projeto').click()
    })
})