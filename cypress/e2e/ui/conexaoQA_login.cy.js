describe('página de login', () => {
    
    beforeEach(() => {
        cy.visit('/login')
    })

    it('faz o login válido', () => {

        cy.intercept('GET','/api/profile/me')
            .as('apiLogin')

        // preenche o email
        cy.getElement('login-email')
            .type(Cypress.env('email'),{ log: false, delay: 50}) // ocultou os comandos na linha de comando e delay ao digitar as palavras no campo

        
        // preenche a senha
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        // clicar no login
        cy.getElement('login-submit')
            .click()
            .wait('@apiLogin')
            .then(({ response }) => {
                expect(response.body.company).to.eq('GFT') // validação da API atraves da observação que o Cypress fez
            
            })

        // valida se o usuario está logado
        cy.getElement('dashboard-welcome')
            .should('contain','Pedro Guerra')

    })
})