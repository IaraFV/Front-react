/// <reference types="cypress" />

describe('teste login', () => {
    it('login', () => {
        cy.visit('http://localhost:3000/');
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

        //Entrada no menu e seleção da pagina de pessoas
        /*
        cy.get('.navbar-toggler-icon').click();
        cy.get('[data-cy=Pessoas-Menu]').click();
        cy.get('.fade').click();
        */

        //teste do cadastro 
        /*
        cy.get('.btn-adicionarp').click();
        cy.get('[data-cy=cadpeople-nome]').type('admin');
        cy.get('[data-cy=cadpeople-fucao]').type('admin');
        cy.get('#mui-component-select-equipe_id').click();
        cy.get('.Mui-focusVisible').click();
        cy.get('#butaoC').click(); //Botao de cancelar
        //cy.get('.btn-post').click(); Botao de cadastrar

        // teste do filtro
        cy.get('#filtro-p').click();
        cy.get('#filtro-p').type("leila");
        */
        //teste do inspecionar
        //cy.get("#card-pessoa-page").click();

        // teste favoritar 
        //cy.get('.star').click();

        //teste do editar
        /*cy.get('.btn-editar > a > button').click();
        cy.get('[data-cy="nome_pessoa"]').type('leila macedo');
        cy.get('[data-cy="funcao_pessoa"]').type('leila');
        cy.get('.btn-edit').click();*/
        //cy.get('.btn-cancelar').click() btn cancelar

        // entrando na pagina de equipe
        cy.get('.navbar-toggler-icon').click();
        cy.get('[data-cy="Equipes-Menu"]').click();
        cy.get('.fade').click();

        //testando o inspecionar equipe
        cy.get('#link-pagina-prin-equipe').click()
        // testando o adcionar membro (ERRRO)
        //cy.get('#corr').click()
        //cy.get('.btn-put-coment > :nth-child(2)').click()
        //cy.get('#input-add-membro-Nome').type('teste admin')

        //testando o adicionar
        cy.get('#btn-edit-inspequi').click()
        cy.get('.inputgeral').type('equipe de teste 32');
        cy.get('#btn-cancelar').click()
    })
   
})

