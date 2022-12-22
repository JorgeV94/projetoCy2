describe('alertas', () => {
    it('valida o alerta de credencial inválida', { tags: ['alerta', '@smoke']}, () => {
       
        cy.clock() // espiona o tempo no servidor

        cy.visit('/login')

        // preenche o campo email
        cy.getElement('login-email')
            .type('pedro@jorge.com')

        // preenche o campo senha
        cy.getElement('login-password')
            .type('123456')

        // clica no botão login
        cy.getElement('login-submit')
            .click()

        // valida o alerta de credencial inválida
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')

        cy.tick(10000) // adianta o tempo 10s no servidor

        // valida se o alerta desapareceu
        cy.getElement('alerta', { timeout: 11000})
            .should('not.exist')

    })
})