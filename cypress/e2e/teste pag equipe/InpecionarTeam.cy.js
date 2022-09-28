/// <reference types="cypress" />

describe('teste Inspecionar', () => {
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
        
        //testando o inspecionar equipe
        cy.get('#link-pagina-prin-equipe').click()

        //teste do editar
        cy.wait(500)
        cy.get('#btn-edit-inspequi').click()
        cy.wait(500)
        cy.get('[data-cy="nome_equipe"]')
        .clear()
        .type('equipe 32')
        //cy.get('#btn-cadastrar').click() // btn cadastrar
        cy.get('#btn-cancelar').click() // btn cancelar

        //teste do seletor do inspecionar equipe(filtro de projeto(status))
        cy.get('#demo-simple-select').click()
        cy.get('[data-value="Em desenvolvimento"]').click() // status em desenvolvimento
        cy.get('#demo-simple-select').click()
        cy.get('[data-value="Concluído"]').click()  // status Concluído
        cy.get('#demo-simple-select').click()
        cy.get('[data-value="Em planejamento"]').click() // status em planejamento
        
        // testando o adcionar membro
        cy.get('[data-cy="btn-abrir-modal-addmembro"]').click()
        cy.wait(1000)
        cy.get('#input-add-membro-Nome')
        .click()
        .type('admin cypres')
        cy.get('#input-add-membro-Fucao')
        .click()
        .type('testador cypress')
        //cy.get('[data-cy="btn-cadastra-membro"]').click() // btn cadastrar
        cy.get('[data-cy="btn-cancelar-cadastro"]').click() // btn cancelar

        //testando o link de direcionamento para inspecionar projeto da page de equipe
        cy.get('[data-cy="btn-insp-goinsp-proje"]').click()
    })
   
})