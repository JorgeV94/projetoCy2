describe('cabeçalho da página home', () => {

    context('não logado', () => {
        
        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o cabeçalho', () => {
            // conexão QA
            cy.getElement('navbar-conexaoQA') // os colchetes não são array e sim um atributo
                .should('have.attr','href','/')
                .and('not.have.attr','target','_blank')

            // QAs
            cy.getElement('navbar-QAs')
                .should('have.attr','href','/perfis')
                .and('not.have.attr','target','_blank')
            
            // Sobre
            cy.getElement('navbar-about')
                .should('have.attr','href','/sobre')
                .and('not.have.attr','target','_blank')

            // Cadastrar
            cy.getElement('navbar-register')
                .should('have.attr','href','/cadastrar')
                .and('not.have.attr','target','_blank')

            // Login
            cy.getElement('navbar-login')
                .should('have.attr','href','/login')
                .and('not.have.attr','target','_blank')
        })

        it('valida o cabeçalho utilizando object', () => {

            // codigo acima mais enxuto e sem repetição de codigo
            const menus = [
                { seletor: 'navbar-conexaoQA', link: '/'},
                { seletor: 'navbar-QAs', link: '/perfis'},
                { seletor: 'navbar-about', link: '/sobre'},
                { seletor: 'navbar-register', link: '/cadastrar'},
                { seletor: 'navbar-login', link: '/login'}             
            ]

            menus.forEach(({ seletor, link }) => {

                cy.getElement(seletor)
                    .should('have.attr','href', link)
                    .and('not.have.attr','target','_blank')
            })
            
        })

        // testes dinamicos que não dependendem um do outro.Esse é o jeito mais correto 
        ;[
            { seletor: 'navbar-conexaoQA', link: '/', menu: 'Conexão QA'},
            { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs'},
            { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre'},
            { seletor: 'navbar-register', link: '/cadastrar', menu: 'Cadastrar'},
            { seletor: 'navbar-login', link: '/login', menu: 'Login'}             
        ].forEach(( { seletor, link, menu }) => {
            it(`valida o menu ${menu} - Teste Dinâmico`, () => {
                cy.getElement(seletor)
                    .should('have.attr','href', link)
                    .and('not.have.attr','target','_blank')
            })
        })


    })

    context('logado', () => {
        
        // construindo meu estado
        before(() => {
            cy.login(Cypress.env('email'), Cypress.env('password'))
        })

        beforeEach(() => {
            cy.visit('/')
        })

        after(() => {

            Cypress.Cookies.defaults({ // não está mais sendo usado na versao 12
                preserve: []
            })
        })

        it('teste', () => {
            cy.log('teste')
        })
    })
    
})