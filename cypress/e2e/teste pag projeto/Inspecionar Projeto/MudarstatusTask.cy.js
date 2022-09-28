/// <reference types="cypress" />

import { type } from "@testing-library/user-event/dist/type";

it('teste Inspecionar projeto', () => {
    cy.visit('http://localhost:3000/');
    //login
    cy.get('#email').type('admin');
    cy.get('#input-senha-login').type('admin123');
    cy.get('#btn-Login').click();

    //Entrada no menu e seleção da pagina de pessoas
    cy.get('.navbar-toggler-icon').click();
    cy.get('[data-cy="Projetos-Menu"]').click();
    cy.get('.fade').click();

    //Entrando no inspecionar
    cy.get(':nth-child(1) > [data-cy="projeto-inspecionar"] > #div-card-projeto > .card-body').click()
    cy.wait(500)

    //mudar status de task
    cy.get(':nth-child(2) > #card-desenvolvimento-t > :nth-child(1) > .menu-dos-filtros-statusTask > .stilo-btn').click()
    cy.get('[data-cy="select-status-task"] > .MuiOutlinedInput-root > .MuiSelect-select').click()
    cy.get('.MuiList-root > [tabindex="0"]').click()
    //cy.get('#btn-tarefas-status > :nth-child(2)').click() // btn put do status task(cadastra)
    cy.get('#btn-tarefas-status > :nth-child(1)').click() // btn cancelar put

    //comentario
    cy.get(':nth-child(2) > #card-desenvolvimento-t > .card-body > :nth-child(3) > .btn-style-generic').click()
    cy.get('#input-coment')
    .click()
    .type('comentario cypress teste')
    //cy.get('#btn-put-coment-post').click() // btn comentar
    cy.get('#btn-put-coment-cancel').click() // cancelar comentario
})