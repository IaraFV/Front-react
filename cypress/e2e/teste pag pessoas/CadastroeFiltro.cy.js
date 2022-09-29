/// <reference types="cypress" />

describe('teste Cadastro e filtro', () => {
    it('Cadastro e filtro', () => {
        cy.visit('http://localhost:3000/');
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

        //Entrada no menu e seleção da pagina de pessoas
        cy.get('.navbar-toggler-icon').click();
        cy.get('[data-cy=Pessoas-Menu]').click();
        cy.get('.fade').click();

        //teste do cadastro 
        cy.get('.btn-adicionarp').click();
        cy.get('[data-cy=cadpeople-nome]').type('admin');
        cy.get('[data-cy=cadpeople-fucao]').type('admin');
        cy.get('#mui-component-select-equipe_id').click();
        cy.get('.Mui-focusVisible').click();
        cy.get('#butaoC').click(); //Botao de cancelar
        //cy.get('.btn-post').click(); Botao de cadastrar

        // teste do filtro
        cy.get('#filtro-p').click();
        cy.wait(500)
        cy.get('#filtro-p').type("lei");
    })
})