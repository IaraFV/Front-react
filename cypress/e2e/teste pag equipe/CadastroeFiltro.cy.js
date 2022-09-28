/// <reference types="cypress" />

describe('teste Cadastro e Filtro', () => {
    it('login', () => {
        cy.visit('http://localhost:3000/');
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

        // entrando na pagina de equipe
        cy.get('.navbar-toggler-icon').click()
        cy.get('[data-cy="Equipes-Menu"]').click();
        cy.get('.fade').click();

        //teste cadastro
        cy.get('.btn-adicionarequipe').click()
        cy.get('.inputgeral').type('equipe teste');
        //cy.get('.btn-post-equipe > button').click() // btn cadastrar
        cy.get('#btn-cancelarE').click() // btn cancelar

        //testando o filtro
        cy.get('#filtro-equipe').click()
        cy.wait(600)
        cy.get('#filtro-equipe').type('equipe teste')

    })
   
})

