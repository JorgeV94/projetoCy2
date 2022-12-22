const { defineConfig } = require("cypress");
const fs = require('fs')
const mongoose = require ('mongoose')

module.exports = defineConfig({
    e2e: {
        viewportHeight: 1080,
        viewportWidth: 1920,
        baseUrl: 'http://localhost:3000',
        retries:{
            runMode: 2,
            openMode: 1

        },

        // baseUrl:'https:conexaoqa.herokuapp.com'

        // eslint-disable-next-line
    setupNodeEvents(on, config) {
        // implement node event listeners here
            on('task',{
                lerPasta(caminho) {
                    return fs.readdirSync(caminho).length
                },

                conectarMongo() {

                    try {
                        // faça o que está aqui e se der erro, faça o que está no catch
                        mongoose.connect(config.env.enderecoBanco,{
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useCreateIndex: true, 
                            useFindAndModify: false
                        })

                        console.log('Conexão estabelecida com o banco de dados')
                        console.log('teste de log no browser')

                    } catch (error) {
                        console.log(error)
                    }

                    return null 
                }
            })
        },
    },
});
