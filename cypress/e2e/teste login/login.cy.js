/// <reference types="cypress" />

describe('teste login', () => {
    it('login', () => {
        cy.visit('http://localhost:3000/');
        //login
        cy.get('#email').type('admin');
        cy.get('#input-senha-login').type('admin123');
        cy.get('#btn-Login').click();

    })
   
})

