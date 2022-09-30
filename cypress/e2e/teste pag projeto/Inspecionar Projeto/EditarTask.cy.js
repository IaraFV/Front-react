/// <reference types='cypress' />

describe('Editar dados da task', () => {
    it('editar', () => {
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

        //entrando no modal de edição
        cy.get('#card-desenvolvimento > :nth-child(1) > .cor-menu-pontos').click()
        cy.get('.css-ahj2mt-MuiTypography-root > div > :nth-child(2)').click()
        cy.get('.inputgeral')
        .click()
        .type('descriçao')
        cy.get('#keep-mounted-modal-description > :nth-child(2) > .MuiBox-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiSelect-select').click()
        cy.get('[data-value="medio"]').click()
        //cy.get('.div-btn-modalEdit > :nth-child(2)').click() // btn cadastrar
        cy.get('.div-btn-modalEdit > :nth-child(1)').click()
    })
})