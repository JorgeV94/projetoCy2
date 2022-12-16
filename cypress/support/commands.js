import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

// loga na aplicação via API
Cypress.Commands.add('login',(email,password) => {

    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            email,      // no javascript basta colocar dessa forma, pois tem o mesmo nome as variaves de parametro e as que estão no codigo
            password
        }
}).then(() => {
        Cypress.Cookies.defaults({ // não está mais sendo usado na versao 12
            preserve: 'jwt'
        })
    })
})

// executa teste de Contrato em uma API
Cypress.Commands.add('testeContrato',(schema, resposta) => {
    
    // função que mostra os erros
    const getSchemaError = ajvErros => {
        return cy.wrap(
            `Campo:${ajvErros[0]['instancePath']} é invalido. Erro: ${ajvErros[0]['message']}`
        )
    }

    // iniciar o AJV
    // o parametro schema é criado em outro arquivo chamado schemaDefinitions que é a resposta esperada (dados da API)
    // principalmente para datas que são diferentes no mundo inteiro
    const ajv = new Ajv() // instanciando o obejto
    const validacao = ajv.addSchema(definitionHelper).compile(schema) // variavel recebe todas as infos da API regras, como os tipos string..o que é obrigatorio ter
    const valido = validacao(resposta)

    // verificar se o schema passou ou falhou
    if (!valido) {
        getSchemaError(validacao.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else 
        expect(valido,'Validação de contrato').to.be.true  
})

// seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', (seletor) => {
    return cy.get(`[data-test=${seletor}]`)
})