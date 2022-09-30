/// <reference types="cypress" />

it('teste Inspecionar projeto', () => {
    cy.visit('http://localhost:3000/');
    //login
    cy.get('#email').type('admin');
    cy.get('#input-senha-login').type('admin123');
    cy.get('#btn-Login').click();

    //Entrada no menu e seleção da pagina de projetos
    cy.get('.navbar-toggler-icon').click();
    cy.get('[data-cy="Projetos-Menu"]').click();
    cy.get('.fade').click();

    //Entrando no inspecionar
    cy.get(':nth-child(1) > [data-cy="projeto-inspecionar"] > #div-card-projeto > .card-body').click()
    cy.wait(500)

    //Editar projeto
    cy.get('[data-cy="btn-inspecionar-proje"]').click()
    cy.wait(500)
    cy.get('[data-cy="input-edite-proje-nome"]')
    .click()
    .clear()
    .type('projeto cypress teste')
    cy.get('[data-cy="input-edite-proje-descricao"]')
    .click()
    .clear()
    .type('projeto cypress teste')

    //cy.get('.btn-edit').click() // btn editar/cadastrar
    cy.get('.btn-cancelar').click()
    cy.wait(1000)

    //Add nova Task
    cy.get('#icon-add-task').click()
    cy.get('[data-cy="casdastro-task-projet"]')
    .click()
    .type('teste cypress task')
    cy.get('#mui-component-select-nivel').click()
    cy.get('[data-value="medio"]').click()
    cy.get('#mui-component-select-projeto_id').click()
    cy.get('.MuiMenuItem-root').click()
    cy.get('#mui-component-select-pessoa_id').click()
    cy.get('[data-value="81"]').click()
    //cy.get('.btn-post').click() // btn cadastrar task
    cy.get('#butaoC').click() // btn cancelar cadastro task
    
})