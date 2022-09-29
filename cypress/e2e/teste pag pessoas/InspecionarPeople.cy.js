/// <reference types="cypress" />

describe('teste Inspecionar', () => {
    it('Inspecionar', () => {
        cy.visit('http://localhost:3000/');
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

        //Entrada no menu e seleção da pagina de pessoas
        cy.get('.navbar-toggler-icon').click();
        cy.get('[data-cy=Pessoas-Menu]').click();
        cy.get('.fade').click();

        //teste do inspecionar
        cy.get("#card-pessoa-page").click();

        // teste favoritar 
        //cy.get('.star').click();

        //teste do editar
        cy.get('.btn-editar > a > button').click();
        cy.get('[data-cy="nome_pessoa"]').type('leila macedo');
        cy.get('[data-cy="funcao_pessoa"]').type('leila');
        //cy.get('.btn-edit').click(); //btn cadastrar
        cy.get('.btn-cancelar').click() //btn cancelar
        //seta de voltar uma pagina
        cy.get('#voltar-insp').click()

    })
})