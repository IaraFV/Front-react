/// <reference types="cypress" />

it('teste Cadastro e filtro', () => {
    cy.visit('http://localhost:3000/');
    //login
    cy.get('#email').type('admin');
    cy.get('#input-senha-login').type('admin123');
    cy.get('#btn-Login').click();

    //Entrada no menu e seleção da pagina de pessoas
    cy.get('.navbar-toggler-icon').click();
    cy.get('[data-cy="Projetos-Menu"]').click();
    cy.get('.fade').click();

    //cadastro de projeto
    cy.get('.botao-page-projeto').click()
    cy.get('[data-cy="add-projeto-nome"]')
    .click()
    .type('projeto teste cypress')
    cy.get('#mui-component-select-equipe_id').click()
    cy.get('[data-value="2"]').click()
    cy.get('[data-cy="add-projeto-descricao"]')
    .click()
    .type('teste projeto cypress')
    //cy.get('[data-cy="btn-projeto-cadastrar"]').click() // btn cadastrar
    cy.get('[data-cy="btn-projeto-cancelar"]').click() // btn cancelar

    //filtro
    cy.get('#input').click()
    cy.wait(500)
    cy.get('#input').type('projeto teste cypress')
    
})