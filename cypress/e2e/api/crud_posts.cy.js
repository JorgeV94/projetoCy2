describe('CRUD - Posts', () => {

    let postId =''
    let mensagem = 'Este post foi feito pelo Cypress'
   
    //11.1.0

    before(() => { //pode usar beforEach para fazer login a cada teste

        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email: Cypress.env('email'),
                password: Cypress.env('password').toString()
            }
         }).then(() => {
            Cypress.Cookies.defaults({ //não está mais sendo usado na versao 12
                preserve: 'jwt'
            })
        })
    })

    it('cria um post', () => {
       
        cy.request({
            method: 'POST',
            url: '/api/posts',
            body: {
                text: 'Este post foi feito pelo Cypress'
            }

        }).then(({ status, body }) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(mensagem) //pode ser feita outras validações basta ver a informação no cypress e fazer os expects aqui
            postId = body._id
        })
    })

    it('lê o post', () => { //toda vez que um teste é feito ao fim dele o cypress limpa todas as informações dele (navegador)
        
        cy.request({
            method: 'GET',
            url: `/api/posts/${postId}`
        }).then(({ status, body})=>{
            expect(status).to.eq(200)
            expect(body.text).to.eq(mensagem)
            expect(body.likes).to.have.lengthOf(0)
        })
    })

    it('atualiza o post', () => {
        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postId}`
        }).then(({ status }) => {
            expect(status).to.eq(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`
            }).then(({ body })=>{
                expect(body.likes).to.have.lengthOf(1)
            })
        })
        
    })

    it('deleta o post', () => {
        cy.request({
            method: 'DELETE',
            url: `/api/posts/${postId}`
        }).then(({ status, body })=>{
            expect(status).to.eq(200)
            expect(body.msg).to.eq('Post removido')

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                failOnStatusCode: false
            }).then(({ status })=>{
                expect(status).to.eq(404)
            })
        })
    })


})