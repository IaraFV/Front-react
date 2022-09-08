const url = "http://localhost:3000"


describe('Gerenciador de Projetos', () => {
  it('Login', () => {
    cy.visit(url);
    cy.get('#email').type("admin")
    cy.get('#input-senha-login').type("admin123");
    cy.get('#btn-Login').click();
  })
})

describe('Pagina Home', () => {
  it('Menu', () => {
    cy.get('#menu-a').click();
    cy.get('#Pessoas-Menu').click()

  })

})

describe('Pagina pessoas', () => {

  it('Todos usuarios', () => {
    cy.get('#Pessoas-Menu').click();
    cy.get('.btn-close').click();

  })

  it('Cadastro', () => {
    /*cy.get('.btn-adicionarp').click();
    cy.get('input[name="nome_pessoa"]').type('Teste cy')
    cy.get('input[name="funcao_pessoa"]').type('Teste cy')
    cy.get('.ant-select-selector').type('Os Vingadores')
    cy.get('.btn-post').click()*/


  })

  it('Card', () => {
    cy.get('#card-pessoa-page').click()
  })

  it('Favoritar', () => {
    cy.get('.star').click()
  })

  it('Editar', () => {
    cy.get('.btn-editar').click()
    cy.get('.btn-cancelar').click()
  })


})