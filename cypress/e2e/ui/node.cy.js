const fs = require('fs')

describe('Testes do cypress.config.js', () => {
    
    it('contaa o total de arquivos da pasta API', () => {
        cy.task('lerPasta','cypress/e2e/api')
            .then((totalArquivos) => {
                expect(totalArquivos).to.eq(2)
            })
    })

    // erro porque o browser não consegue executar FS
    it.skip('conta o total de arquivos da pasta UI', () => {
        cy.log(fs.readdirSync(cypress/e2e/api).length)
    })

    it('valida a conexão com o mongo', () => {
        cy.task('conectarMongo')
        
    })
})